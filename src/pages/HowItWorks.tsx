import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import InterfacePanel from "../components/InterfacePanel";
import { LINKS } from "../data/content";
import { recordDownloadClick } from "../lib/analytics";

const STEPS = [
  {
    title: "Import your clips",
    detail: "Use Add Clips to select individual files, or Add Folder to queue everything in a directory at once. Total duration and clip count update as you go.",
  },
  {
    title: "Choose a tracking mode",
    detail: "Auto mode uses face-landmark detection and needs no clicking. Manual mode lets you click a point on the first frame for anything a face tracker can't follow.",
  },
  {
    title: "Pick an anchor point",
    detail: "For auto mode: between eyebrows, nose, forehead, or mouth. The same anchor setting applies across the whole batch.",
  },
  {
    title: "Set smoothing, sensitivity, and motion options",
    detail: "Adjust the smoothing window and tracking sensitivity, and optionally enable motion blur or frame blending -- all applied to the entire batch, not per clip.",
  },
  {
    title: "Choose export settings and a destination folder",
    detail: "Set codec, container, quality, and FPS, then pick where the results are saved. Output files are named <clip>_stabilized.<ext>.",
  },
  {
    title: "Start batch tracking",
    detail: "Dala Tracker processes each clip in the queue in order, updating per-clip status and progress as it goes.",
  },
];

export default function HowItWorks() {
  return (
    <>
      <PageHero
        eyebrow="How It Works"
        title="Six steps. One pass through the whole batch."
        subtitle="This is the real workflow, in the order the interface presents it."
      />

      <section className="py-16" style={{ background: "var(--void)" }}>
        <div className="mx-auto max-w-4xl px-6">
          <ol className="flex flex-col gap-8">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.04}>
                <li className="flex gap-5">
                  <span
                    className="flex h-9 w-9 flex-none items-center justify-center rounded-full border font-mono text-xs"
                    style={{ borderColor: "var(--violet-dim)", color: "var(--violet-bright)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-display text-base">{step.title}</p>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--mist-dim)" }}>
                      {step.detail}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16" style={{ background: "var(--graphite)" }}>
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <InterfacePanel />
          </Reveal>
        </div>
      </section>

      <section className="py-24 text-center" style={{ background: "var(--void)" }}>
        <Reveal>
          <a
            href={LINKS.download}
            onClick={() => recordDownloadClick()}
            target="_blank"
            rel="noopener noreferrer"
            className="glow-violet inline-block rounded-full px-8 py-3.5 font-mono text-[12px] font-medium uppercase tracking-wider transition-transform hover:scale-[1.03]"
            style={{ background: "var(--violet)", color: "var(--void)" }}
          >
            Download Free
          </a>
        </Reveal>
      </section>
    </>
  );
}
