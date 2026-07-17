import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { WORKFLOW_COMPARISON } from "../data/content";

export default function ActBatchScale() {
  return (
    <section className="relative py-32" style={{ background: "var(--graphite)" }}>
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Batch, Not Chores"
            title="One clip becomes a queue, not a checklist."
            subtitle="The same manual process, however many times it needs repeating, versus one batch configured once."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Column
              label="Manual, per clip"
              accent={false}
              steps={WORKFLOW_COMPARISON.manual}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Column
              label="Dala Tracker, per batch"
              accent
              steps={WORKFLOW_COMPARISON.dala}
            />
          </Reveal>
        </div>

        <p className="mt-10 max-w-2xl font-mono text-[11px] uppercase tracking-wider" style={{ color: "var(--mist-faint)" }}>
          Batch clips are processed one after another, automatically &mdash; not simultaneously. The
          difference is you configure the workflow once instead of every time.
        </p>
      </div>
    </section>
  );
}

function Column({ label, steps, accent }: { label: string; steps: string[]; accent: boolean }) {
  return (
    <div
      className="h-full rounded-2xl border p-8"
      style={{
        borderColor: accent ? "var(--violet-dim)" : "var(--graphite-3)",
        background: accent ? "rgba(124,92,255,0.06)" : "var(--graphite-2)",
      }}
    >
      <p
        className="font-mono text-[11px] uppercase tracking-wider"
        style={{ color: accent ? "var(--violet-bright)" : "var(--mist-faint)" }}
      >
        {label}
      </p>
      <ol className="mt-6 flex flex-col gap-3">
        {steps.map((step, i) => (
          <li key={step} className="flex items-start gap-3 text-sm" style={{ color: "var(--mist-dim)" }}>
            <span
              className="mt-0.5 font-mono text-[11px]"
              style={{ color: accent ? "var(--violet-bright)" : "var(--mist-faint)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
