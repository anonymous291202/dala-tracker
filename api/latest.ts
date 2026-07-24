// api/latest.ts
//
// Single source of truth for "what's the latest release" -- both the
// website's Download button/version labels AND the desktop app's
// in-app update checker (core/updater.py) hit this same endpoint.
//
// Publishing a new GitHub Release is now the ONLY step that updates
// this -- no more manually editing a latest.json file and pushing it.
// GitHub's release list is cached briefly at the edge (see Cache-Control
// below) so this isn't hammering GitHub's API on every app launch and
// every site visit.
//
// Optional integrity check: if your release description contains a
// line like  SHA256: abc123...  this endpoint picks it up and passes
// it through as "sha256". If you skip that line, sha256 comes back as
// an empty string and the desktop app's updater simply skips
// verification for that release (still fine, just less strict --
// worth including the line if you want the extra safety net).

export const config = { runtime: "edge" };

const REPO = "anonymous291202/dala-tracker";
const GITHUB_API_URL = `https://api.github.com/repos/${REPO}/releases/latest`;

interface GithubAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

interface GithubRelease {
  tag_name: string;
  body: string | null;
  assets: GithubAsset[];
}

function extractSha256(body: string | null): string {
  if (!body) return "";
  const match = body.match(/sha256\s*[:=]\s*([a-fA-F0-9]{64})/i);
  return match ? match[1].toLowerCase() : "";
}

export default async function handler(req: Request) {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  let release: GithubRelease;
  try {
    const res = await fetch(GITHUB_API_URL, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "dala-tracker-site",
      },
    });
    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: `GitHub API returned ${res.status}` }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }
    release = await res.json();
  } catch {
    return new Response(JSON.stringify({ error: "Failed to reach GitHub" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Must specifically be the Inno Setup installer (filename containing
  // "setup"), not just any .exe -- if the raw PyInstaller build
  // (dist/DalaTracker/DalaTracker.exe) gets attached to a release by
  // mistake instead of the compiled installer_output/DalaTracker-Setup-*.exe,
  // the desktop app's silent /VERYSILENT install would previously do
  // nothing and fail invisibly. Reject it here instead, at the source.
  const exeAsset = release.assets.find(
    (a) => /setup/i.test(a.name) && a.name.toLowerCase().endsWith(".exe")
  );
  if (!exeAsset) {
    const anyExe = release.assets.find((a) => a.name.toLowerCase().endsWith(".exe"));
    return new Response(
      JSON.stringify({
        error: anyExe
          ? `Latest release has a .exe asset ("${anyExe.name}") but its name doesn't ` +
            `contain "setup" -- attach the Inno Setup installer output ` +
            `(e.g. DalaTracker-Setup-${release.tag_name.replace(/^v/i, "")}.exe), not the raw PyInstaller build.`
          : "Latest release has no .exe asset attached",
      }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  const version = release.tag_name.replace(/^v/i, "");

  const payload = {
    version,
    url: exeAsset.browser_download_url,
    sha256: extractSha256(release.body),
    notes: (release.body ?? "").trim(),
    sizeBytes: exeAsset.size,
  };

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      // Cached at the edge for 5 minutes, serve-stale-while-revalidate
      // for an hour -- releases are infrequent, so this keeps GitHub API
      // calls low without ever showing a user a truly stale version for
      // long.
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
    },
  });
}