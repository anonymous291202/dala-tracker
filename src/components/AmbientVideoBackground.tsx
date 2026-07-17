type Props = {
  /** 0-1, how visible the video is under the blur/dim treatment */
  opacity?: number;
  className?: string;
};

/**
 * The looping brand background clip (Comp_1.mp4), always treated the same
 * way everywhere it's used: blurred, dimmed, low opacity, and sitting under
 * a dark gradient so text stays readable on top of it.
 */
export default function AmbientVideoBackground({ opacity = 0.45, className = "" }: Props) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <video
        src="/assets/bg_loop.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
        style={{
          opacity,
          filter: "blur(2px) brightness(0.85) saturate(1.15)",
          transform: "scale(1.08)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, var(--void) 0%, transparent 30%, transparent 70%, var(--void) 100%)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 0%, var(--void) 85%)" }}
      />
    </div>
  );
}
