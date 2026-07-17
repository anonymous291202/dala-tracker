import { ANCHOR_POINTS } from "../data/content";

type Props = {
  activeAnchor?: string;
  showLandmarks?: boolean;
  batchClips?: { name: string; status: "queued" | "processing" | "completed" }[];
  className?: string;
  /** When true, the three internal panels sit at different translateZ
   * depths -- only meaningful inside a `transform-style: preserve-3d`
   * ancestor (see Perspective3DPanel). */
  depth?: boolean;
};

/**
 * A faithful, simplified reconstruction of the real Batch Head Tracking
 * screen -- same panel order, same labels, same anchor point names as the
 * actual app. Used as a storytelling object across the site, not a literal
 * embed of the software.
 */
export default function InterfacePanel({
  activeAnchor = "between_eyebrows",
  showLandmarks = false,
  batchClips = [
    { name: "Clip_01.mp4", status: "completed" },
    { name: "Clip_02.mp4", status: "completed" },
    { name: "Clip_03.mp4", status: "processing" },
    { name: "Clip_04.mp4", status: "queued" },
  ],
  className = "",
  depth = false,
}: Props) {
  const layerStyle = (z: number) => (depth ? { transform: `translateZ(${z}px)` } : undefined);

  return (
    <div
      className={`overflow-hidden rounded-2xl border shadow-2xl ${className}`}
      style={{ borderColor: "var(--graphite-3)", background: "var(--graphite)" }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between border-b px-4 py-2.5"
        style={{ borderColor: "var(--graphite-3)", background: "var(--void)" }}
      >
        <div className="flex items-center gap-2">
          <img src="/assets/logo.png" alt="" className="h-4 w-4 rounded" />
          <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--mist-dim)" }}>
            Dala Tracker &mdash; Batch Head Tracking
          </span>
        </div>
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--graphite-3)" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--graphite-3)" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--graphite-3)" }} />
        </div>
      </div>

      <div
        className="grid grid-cols-1 gap-px md:grid-cols-[1fr_1.4fr_1fr]"
        style={{ background: "var(--graphite-3)", transformStyle: depth ? "preserve-3d" : undefined }}
      >
        {/* Import panel */}
        <div className="p-4" style={{ background: "var(--graphite)", ...layerStyle(10) }}>
          <p className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--mist-faint)" }}>
            1. Import Clips
          </p>
          <div
            className="mt-3 rounded-lg px-3 py-2 text-center font-mono text-[10px] uppercase tracking-wider"
            style={{ background: "var(--violet)", color: "var(--void)" }}
          >
            + Add Clips
          </div>
          <div
            className="mt-2 rounded-lg border px-3 py-2 text-center font-mono text-[10px] uppercase tracking-wider"
            style={{ borderColor: "var(--graphite-3)", color: "var(--mist-dim)" }}
          >
            Add Folder
          </div>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--mist-faint)" }}>
            Batch Progress
          </p>
          <div className="mt-2 flex flex-col gap-1.5">
            {batchClips.map((clip) => (
              <div
                key={clip.name}
                className="flex items-center justify-between rounded-md px-2 py-1.5 font-mono text-[10px]"
                style={{ background: "var(--graphite-2)" }}
              >
                <span style={{ color: "var(--mist-dim)" }}>{clip.name}</span>
                <span
                  style={{
                    color:
                      clip.status === "completed"
                        ? "var(--violet-bright)"
                        : clip.status === "processing"
                        ? "var(--mist)"
                        : "var(--mist-faint)",
                  }}
                >
                  {clip.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Preview panel */}
        <div className="relative flex min-h-[220px] items-center justify-center p-4" style={{ background: "var(--void)", ...layerStyle(40) }}>
          <p
            className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-wider"
            style={{ color: "var(--mist-faint)" }}
          >
            2. Tracking Preview
          </p>
          <FacePreview showLandmarks={showLandmarks} />
        </div>

        {/* Settings panel */}
        <div className="p-4" style={{ background: "var(--graphite)", ...layerStyle(10) }}>
          <p className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--mist-faint)" }}>
            3. Tracker Settings
          </p>

          <SettingRow label="Tracking Mode" value="Auto (face landmarks)" />

          <p className="mt-3 font-mono text-[9px] uppercase tracking-wider" style={{ color: "var(--mist-faint)" }}>
            Anchor Point
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {ANCHOR_POINTS.map((a) => (
              <span
                key={a.id}
                className="rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider"
                style={{
                  borderColor: a.id === activeAnchor ? "var(--violet-bright)" : "var(--graphite-3)",
                  color: a.id === activeAnchor ? "var(--violet-bright)" : "var(--mist-faint)",
                  background: a.id === activeAnchor ? "rgba(124,92,255,0.1)" : "transparent",
                }}
              >
                {a.label}
              </span>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-2.5">
            <SliderRow label="Smoothing Window" value={65} />
            <SliderRow label="Tracking Sensitivity" value={50} />
            <ToggleRow label="Motion Blur" on />
            <ToggleRow label="Frame Blending" on={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-2 flex items-center justify-between rounded-md px-2.5 py-2" style={{ background: "var(--graphite-2)" }}>
      <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: "var(--mist-faint)" }}>
        {label}
      </span>
      <span className="font-mono text-[10px]" style={{ color: "var(--mist)" }}>
        {value}
      </span>
    </div>
  );
}

function SliderRow({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between font-mono text-[9px] uppercase tracking-wider" style={{ color: "var(--mist-faint)" }}>
        <span>{label}</span>
      </div>
      <div className="mt-1.5 h-1 rounded-full" style={{ background: "var(--graphite-3)" }}>
        <div className="h-1 rounded-full" style={{ width: `${value}%`, background: "var(--violet)" }} />
      </div>
    </div>
  );
}

function ToggleRow({ label, on }: { label: string; on: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: "var(--mist-faint)" }}>
        {label}
      </span>
      <span
        className="flex h-4 w-8 items-center rounded-full px-0.5"
        style={{ background: on ? "var(--violet)" : "var(--graphite-3)", justifyContent: on ? "flex-end" : "flex-start" }}
      >
        <span className="h-3 w-3 rounded-full bg-white" />
      </span>
    </div>
  );
}

function FacePreview({ showLandmarks }: { showLandmarks: boolean }) {
  return (
    <svg viewBox="0 0 200 200" className="h-40 w-40" aria-hidden="true">
      <ellipse cx="100" cy="105" rx="55" ry="70" fill="none" stroke="var(--graphite-3)" strokeWidth="1.5" />
      {showLandmarks && (
        <g stroke="var(--violet-bright)" strokeWidth="1" fill="var(--violet-bright)">
          {[
            [80, 70], [100, 65], [120, 70], [70, 90], [130, 90],
            [100, 100], [85, 130], [115, 130], [100, 145], [90, 150], [110, 150],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2" />
          ))}
          <line x1="80" y1="70" x2="100" y2="65" strokeWidth="0.6" opacity="0.6" />
          <line x1="100" y1="65" x2="120" y2="70" strokeWidth="0.6" opacity="0.6" />
          <line x1="70" y1="90" x2="100" y2="100" strokeWidth="0.6" opacity="0.6" />
          <line x1="130" y1="90" x2="100" y2="100" strokeWidth="0.6" opacity="0.6" />
          <line x1="100" y1="100" x2="85" y2="130" strokeWidth="0.6" opacity="0.6" />
          <line x1="100" y1="100" x2="115" y2="130" strokeWidth="0.6" opacity="0.6" />
          <circle cx="100" cy="67" r="3.5" fill="none" stroke="var(--violet-bright)" strokeWidth="1.2" />
        </g>
      )}
    </svg>
  );
}
