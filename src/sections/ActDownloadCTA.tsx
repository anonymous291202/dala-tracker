import { useEffect, useState } from "react";
import Reveal from "../components/Reveal";
import AmbientVideoBackground from "../components/AmbientVideoBackground";
import { LINKS, PRODUCT } from "../data/content";
import { recordDownloadClick, getGlobalDownloadStats } from "../lib/analytics";

export default function ActDownloadCTA() {
  const [stats, setStats] = useState<Awaited<ReturnType<typeof getGlobalDownloadStats>> | null>(null);

  useEffect(() => {
    getGlobalDownloadStats().then(setStats);
  }, []);

  return (
    <section className="relative py-40" style={{ background: "var(--void)" }}>
      <AmbientVideoBackground opacity={0.42} />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em]" style={{ color: "var(--violet-bright)" }}>
            Ready
          </p>
          <h2 className="font-display text-balance mt-5 text-5xl leading-[1.05] md:text-6xl">
            DALA TRACKER
          </h2>
          <p className="mt-6 text-lg" style={{ color: "var(--mist-dim)" }}>
            {PRODUCT.price}. No login. No signup. Just a direct download.
          </p>

          <a
            href={LINKS.download}
            onClick={() => recordDownloadClick()}
            target="_blank"
            rel="noopener noreferrer"
            className="glow-violet mt-10 inline-block rounded-full px-9 py-4 font-mono text-sm font-medium uppercase tracking-wider transition-transform hover:scale-[1.03]"
            style={{ background: "var(--violet)", color: "var(--void)" }}
          >
            Download Free
          </a>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-wider" style={{ color: "var(--mist-faint)" }}>
            <span>{PRODUCT.platform} only</span>
            <span>{PRODUCT.downloadSizeApprox}</span>
            <span>Version {PRODUCT.version}</span>
          </div>

          {stats && stats.total > 0 && (
            <p className="mt-6 font-mono text-[11px] uppercase tracking-wider" style={{ color: "var(--mist-faint)" }}>
              {stats.total} download{stats.total === 1 ? "" : "s"}
              {stats.isGlobal ? " and counting" : " from this browser so far"}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}