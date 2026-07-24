import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { useReleases } from "../lib/useReleases";

export default function Changelog() {
  const { entries } = useReleases();

  return (
    <>
      <PageHero eyebrow="Changelog" title="What's changed." />

      <section className="pb-24" style={{ background: "var(--void)" }}>
        <div className="mx-auto max-w-3xl px-6">
          <ol className="flex flex-col gap-14">
            {entries.map((entry, i) => (
              <Reveal key={entry.version} delay={i * 0.05}>
                <li className="relative border-l pl-8" style={{ borderColor: "var(--graphite-3)" }}>
                  <span
                    className="absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full border-2"
                    style={{ background: "var(--void)", borderColor: "var(--violet-bright)" }}
                  />
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h2 className="font-display text-2xl">v{entry.version}</h2>
                    <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "var(--mist-faint)" }}>
                      {entry.date}
                    </span>
                  </div>
                  <ul className="mt-4 flex flex-col gap-2">
                    {entry.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--mist-dim)" }}>
                        <span className="mt-2 h-1 w-1 flex-none rounded-full" style={{ background: "var(--violet-bright)" }} />
                        {h}
                      </li>
                    ))}
                  </ul>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}