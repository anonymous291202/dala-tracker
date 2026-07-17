import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { ANCHOR_POINTS, FEATURES, MANUAL_TRACKING, NOT_YET } from "../data/content";

export default function Features() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title="What Dala Tracker actually does."
        subtitle="Every capability here is in the current release -- nothing planned or conceptual."
      />

      <section className="py-16" style={{ background: "var(--void)" }}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.05}>
                <div
                  className="h-full rounded-xl border p-6"
                  style={{ borderColor: "var(--graphite-3)", background: "var(--graphite-2)" }}
                >
                  <p className="font-display text-sm">{f.title}</p>
                  <p className="mt-2.5 text-sm leading-relaxed" style={{ color: "var(--mist-dim)" }}>
                    {f.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: "var(--graphite)" }}>
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl">Anchor points</h2>
            <p className="mt-3 max-w-2xl text-sm" style={{ color: "var(--mist-dim)" }}>
              Choose where the tracker anchors on the face for automatic tracking, or place a point
              by hand for anything else.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {ANCHOR_POINTS.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.05}>
                <div className="rounded-xl border p-5" style={{ borderColor: "var(--graphite-3)" }}>
                  <p className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "var(--violet-bright)" }}>
                    {a.label}
                  </p>
                  <p className="mt-2 text-sm" style={{ color: "var(--mist-dim)" }}>
                    {a.description}
                  </p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <div className="rounded-xl border p-5 sm:col-span-2" style={{ borderColor: "var(--graphite-3)" }}>
                <p className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "var(--violet-bright)" }}>
                  {MANUAL_TRACKING.label}
                </p>
                <p className="mt-2 text-sm" style={{ color: "var(--mist-dim)" }}>
                  {MANUAL_TRACKING.description}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: "var(--void)" }}>
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl">Not in this release yet</h2>
            <ul className="mt-5 flex flex-col gap-2">
              {NOT_YET.map((item) => (
                <li key={item} className="text-sm" style={{ color: "var(--mist-faint)" }}>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
