import { useState } from "react";
import PageHero from "../components/PageHero";
import { ANCHOR_POINTS, MANUAL_TRACKING } from "../data/content";

const SECTIONS = [
  {
    id: "getting-started",
    title: "Getting Started",
    body: [
      "Download Dala Tracker, run the executable, and you're ready to import clips. There's no account to create and nothing to sign into.",
    ],
  },
  {
    id: "importing-clips",
    title: "Importing Clips",
    body: [
      "Use Add Clips to select one or more video files, or Add Folder to queue every clip inside a directory. Imported clips appear in the batch list with their name, duration, and resolution.",
    ],
  },
  {
    id: "auto-tracking",
    title: "Automatic Face Tracking",
    body: [
      "Auto mode uses face-landmark detection to follow the subject's face automatically -- no clicking required. Select a clip in the queue and its first frame appears in the preview.",
    ],
  },
  {
    id: "manual-tracking",
    title: "Manual Point Tracking",
    body: [MANUAL_TRACKING.description],
  },
  {
    id: "anchor-points",
    title: "Choosing an Anchor Point",
    body: ANCHOR_POINTS.map((a) => `${a.label}: ${a.description}`),
  },
  {
    id: "smoothing",
    title: "Smoothing",
    body: [
      "The smoothing window controls how much the tracked motion path is smoothed before being applied to the frame. A larger window produces gentler, more gradual correction.",
    ],
  },
  {
    id: "sensitivity",
    title: "Tracking Sensitivity",
    body: [
      "Low, Medium, or High. This changes how tightly the tracker follows sudden motion versus treating it as an outlier to smooth over.",
    ],
  },
  {
    id: "motion-blur",
    title: "Motion Blur",
    body: [
      "An optional render pass that adds directional blur based on the tracked motion, so the corrected footage keeps a natural sense of movement rather than looking artificially locked.",
    ],
  },
  {
    id: "frame-blending",
    title: "Frame Blending",
    body: [
      "An optional blending pass across neighboring frames for smoother apparent motion in the final render.",
    ],
  },
  {
    id: "batch-processing",
    title: "Batch Processing",
    body: [
      "Once settings are configured, Start Batch Tracking processes every queued clip in order, one at a time, updating per-clip status and progress as it goes.",
    ],
  },
  {
    id: "export-settings",
    title: "Export Settings",
    body: [
      "Choose a codec (H.264 or H.265), container (MP4, MOV, or MKV), quality, and FPS, then select a destination folder. Every clip in the batch uses the same export settings.",
      "Output files are named <clip>_stabilized.<ext> and saved directly into the destination folder. Re-tracking a clip overwrites its own previous output.",
    ],
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    body: [
      "If tracking loses the face briefly, Auto mode holds the last known position rather than snapping back to center. If a clip consistently tracks poorly in Auto mode, switching to a manual point often works better.",
      "For anything not covered here, the Discord community is the best place to ask.",
    ],
  },
];

export default function Docs() {
  const [active, setActive] = useState(SECTIONS[0].id);

  return (
    <>
      <PageHero eyebrow="Documentation" title="Reference for every feature in this release." />

      <section className="pb-24" style={{ background: "var(--void)" }}>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 lg:grid-cols-[220px_1fr]">
          <nav className="lg:sticky lg:top-28 lg:self-start" aria-label="Documentation sections">
            <ul className="flex flex-col gap-1">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setActive(s.id)}
                    className="block rounded-md px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors"
                    style={{
                      color: active === s.id ? "var(--violet-bright)" : "var(--mist-dim)",
                      background: active === s.id ? "rgba(124,92,255,0.08)" : "transparent",
                    }}
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-16">
            {SECTIONS.map((s) => (
              <div key={s.id} id={s.id} className="scroll-mt-28">
                <h2 className="font-display text-2xl">{s.title}</h2>
                <div className="mt-4 flex flex-col gap-3">
                  {s.body.map((p) => (
                    <p key={p} className="text-sm leading-relaxed" style={{ color: "var(--mist-dim)" }}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
