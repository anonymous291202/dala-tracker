import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { PRODUCT, SYSTEM_REQUIREMENTS_READY, SYSTEM_REQUIREMENTS } from "../data/content";
import { useLatestRelease } from "../lib/useLatestRelease";
import { recordDownloadClick, getGlobalDownloadStats } from "../lib/analytics";
import { useEffect, useState } from "react";

export default function Download() {
  const release = useLatestRelease();
  const [stats, setStats] = useState<Awaited<ReturnType<typeof getGlobalDownloadStats>> | null>(null);

  useEffect(() => {
    getGlobalDownloadStats().then(setStats);
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Download"
        title="Get Dala Tracker."
        subtitle="Free. No account. No login. Direct download."
      />

      <section className="py-16" style={{ background: "var(--void)" }}>
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <div
              className="rounded-2xl border p-8"
              style={{ borderColor: "var(--graphite-3)", background: "var(--graphite-2)" }}
            >
              <div className="flex items-center gap-3">
                <img src="/assets/logo.png" alt="" className="h-10 w-10 rounded-lg" />
                <div>
                  <p className="font-display text-lg">Dala Tracker</p>
                  <p className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "var(--mist-faint)" }}>
                    Version {release.version}
                  </p>
                </div>
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-y-4 border-t pt-6 text-sm sm:grid-cols-3" style={{ borderColor: "var(--graphite-3)" }}>
                <Field label="Price" value={PRODUCT.price} />
                <Field label="Platform" value={PRODUCT.platform} />
                <Field label="Approx. size" value={PRODUCT.downloadSizeApprox} />
                <Field label="GPU" value="Not required" />
                <Field label="Account required" value="No" />
                <Field label="Release date" value="Not yet finalized" />
              </dl>

              <a
                href={release.url}
            onClick={() => recordDownloadClick()}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-violet mt-8 block rounded-full px-8 py-4 text-center font-mono text-sm font-medium uppercase tracking-wider transition-transform hover:scale-[1.02]"
                style={{ background: "var(--violet)", color: "var(--void)" }}
              >
                Download Free
              </a>
              <p className="mt-4 text-center text-xs" style={{ color: "var(--mist-faint)" }}>
                Opens the latest release on GitHub -- always up to date, no account needed.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div
              className="mt-6 flex items-center justify-between rounded-xl border px-5 py-4 text-sm"
              style={{ borderColor: "var(--graphite-3)", background: "var(--graphite-2)" }}
            >
              <span style={{ color: "var(--mist-dim)" }}>
                {stats?.isGlobal ? "Total downloads" : "Downloads recorded from this browser"}
              </span>
              <span className="font-display text-lg" style={{ color: "var(--violet-bright)" }}>
                {stats?.total ?? 0}
              </span>
            </div>
            <p className="mt-2 text-xs" style={{ color: "var(--mist-faint)" }}>
              {stats?.isGlobal
                ? "Live, site-wide count."
                : "This is local, per-browser activity, not a global download count."}{" "}
              Full stats:{" "}
              <a href="/analytics" className="underline">
                /analytics
              </a>
              .
            </p>
          </Reveal>

          {SYSTEM_REQUIREMENTS_READY && (
            <Reveal delay={0.1}>
              <div className="mt-10">
                <h2 className="font-display text-xl">System requirements</h2>
                <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  {SYSTEM_REQUIREMENTS.map((r) => (
                    <div key={r.label}>
                      <dt className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--mist-faint)" }}>
                        {r.label}
                      </dt>
                      <dd style={{ color: "var(--mist)" }}>{r.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.15}>
            <div className="mt-10">
              <h2 className="font-display text-xl">Installation</h2>
              <ol className="mt-4 flex flex-col gap-2 text-sm" style={{ color: "var(--mist-dim)" }}>
                <li>1. Download the file from the link above.</li>
                <li>2. Extract it if it arrives as an archive.</li>
                <li>3. Run the Dala Tracker executable.</li>
                <li>4. No installation wizard, license key, or account is required to start using it.</li>
              </ol>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--mist-faint)" }}>
        {label}
      </dt>
      <dd className="mt-1" style={{ color: "var(--mist)" }}>
        {value}
      </dd>
    </div>
  );
}