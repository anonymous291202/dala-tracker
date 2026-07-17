import { useEffect, useState } from "react";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { ANCHOR_POINTS, FEATURES } from "../data/content";

export default function ActWorkflow() {
  const [anchorIndex, setAnchorIndex] = useState(0);

  useEffect(() => {
    const cycle = setInterval(() => {
      setAnchorIndex((i) => (i + 1) % ANCHOR_POINTS.length);
    }, 2600);
    return () => clearInterval(cycle);
  }, []);

  const activeAnchor = ANCHOR_POINTS[anchorIndex];

  return (
    <section className="relative py-32" style={{ background: "var(--graphite)" }}>
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Lock On"
            title="One workflow, applied to every clip."
            subtitle="Import a batch, choose how it tracks, and configure it once. The same interface handles automatic face-landmark tracking or a manual point you place by hand."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <div
            className="overflow-hidden rounded-2xl border p-8"
            style={{ borderColor: "var(--graphite-3)", background: "var(--graphite-2)" }}
          >
            <p className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--mist-faint)" }}>
              Anchor Point
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {ANCHOR_POINTS.map((a) => (
                <span
                  key={a.id}
                  className="rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors"
                  style={{
                    borderColor: a.id === activeAnchor.id ? "var(--violet-bright)" : "var(--graphite-3)",
                    color: a.id === activeAnchor.id ? "var(--violet-bright)" : "var(--mist-faint)",
                    background: a.id === activeAnchor.id ? "rgba(124,92,255,0.1)" : "transparent",
                  }}
                >
                  {a.label}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed" style={{ color: "var(--mist-dim)" }}>
              {activeAnchor.description}
            </p>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.05}>
              <div
                className="h-full rounded-xl border p-6"
                style={{ borderColor: "var(--graphite-3)", background: "var(--graphite-2)" }}
              >
                <p className="font-display text-sm" style={{ color: "var(--mist)" }}>
                  {f.title}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed" style={{ color: "var(--mist-dim)" }}>
                  {f.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
