// api/releases.ts
//
// Powers the website changelog (src/pages/Changelog.tsx) with the full
// history of published GitHub Releases -- companion to api/latest.ts,
// which only ever returns the single newest one.
//
// Same "GitHub Releases are the only source of truth" contract: publish
// a release with a tag like v1.2.0 and a body full of bullet points, and
// it shows up here automatically. Nothing to hand-edit on the site.

export const config = { runtime: "edge" };

const REPO = "anonymous291202/dala-tracker";
const GITHUB_API_URL = `https://api.github.com/repos/${REPO}/releases?per_page=30`;

interface GithubRelease {
  tag_name: string;
  name: string | null;
  body: string | null;
  published_at: string | null;
  draft: boolean;
  prerelease: boolean;
}

// Turns a release body into short changelog bullets: keeps existing
// "- " / "* " list lines as-is, drops blank lines and the optional
// "SHA256: ..." integrity line (that's for the updater, not readers),
// and falls back to treating each remaining non-empty line as its own
// bullet if the release wasn't written as a list.
function extractHighlights(body: string | null): string[] {
  if (!body) return [];
  return body
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .filter((line) => !/^sha256\s*[:=]/i.test(line))
    .filter((line) => !/^#+\s/.test(line)) // skip markdown headings
    .map((line) => line.replace(/^[-*]\s+/, ""));
}

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function handler(req: Request) {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  let releases: GithubRelease[];
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
    releases = await res.json();
  } catch {
    return new Response(JSON.stringify({ error: "Failed to reach GitHub" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  const payload = releases
    .filter((r) => !r.draft && !r.prerelease)
    .map((r) => {
      const highlights = extractHighlights(r.body);
      return {
        version: r.tag_name.replace(/^v/i, ""),
        date: formatDate(r.published_at),
        // Every release still shows up even if its body only had the
        // SHA256 integrity line (or was empty) -- previously that
        // release just vanished from the changelog entirely, which
        // looked like the page wasn't updating.
        highlights: highlights.length > 0 ? highlights : ["No release notes provided for this version."],
      };
    });

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      // Same caching profile as api/latest.ts -- releases are infrequent.
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
    },
  });
}