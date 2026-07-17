import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CATHEDRAL_PAIRS } from "../data/comparisons";
import { useReducedMotion } from "../lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * A single continuous cinematic sequence instead of a draggable slider:
 * three shaky clips travel toward the Dala Tracker engine, converge, and
 * emerge as three stabilized clips playing in sync.
 */
export default function CathedralComparison() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const laneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const afterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const coreRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const beforeVideos = useRef<(HTMLVideoElement | null)[]>([]);
  const afterVideos = useRef<(HTMLVideoElement | null)[]>([]);
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<"input" | "lock" | "merge" | "reveal">("input");

  useEffect(() => {
    if (reducedMotion) return;
    if (!wrapRef.current || !pinRef.current) return;

    const paths = pathRefs.current.filter(Boolean) as SVGPathElement[];
    paths.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "+=220%",
          scrub: 0.8,
          pin: pinRef.current,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.2) setPhase("input");
            else if (p < 0.45) setPhase("lock");
            else if (p < 0.7) setPhase("merge");
            else setPhase("reveal");
          },
        },
      });

      // Phase 1: before lanes settle in, slight stagger
      tl.from(laneRefs.current, { opacity: 0, x: -60, stagger: 0.08, duration: 0.5, ease: "power2.out" }, 0);

      // Phase 2: paths draw from lanes into the core
      tl.to(paths, { strokeDashoffset: 0, stagger: 0.08, duration: 0.6, ease: "power2.inOut" }, 0.35);
      tl.to(coreRef.current, { scale: 1.15, duration: 0.3, ease: "power2.out" }, 0.55);
      tl.to(coreRef.current, { scale: 1, duration: 0.25, ease: "power2.in" }, 0.8);

      // Phase 3: before lanes shrink toward center as they "feed" the engine
      tl.to(laneRefs.current, { scale: 0.9, opacity: 0.5, duration: 0.4, ease: "power2.inOut" }, 0.5);

      // Phase 4: after lanes emerge on the right
      tl.from(afterRefs.current, { opacity: 0, x: 60, stagger: 0.08, duration: 0.5, ease: "power2.out" }, 0.75);

      return () => {};
    }, wrapRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Sync + autoplay muted preview videos once mounted
  useEffect(() => {
    beforeVideos.current.forEach((v) => v?.play().catch(() => {}));
    afterVideos.current.forEach((v) => v?.play().catch(() => {}));
  }, []);

  if (reducedMotion) {
    return <StaticCathedralMobile />;
  }

  return (
    <div ref={wrapRef} className="relative" style={{ height: "320vh" }}>
      <div ref={pinRef} className="grain relative flex h-[100svh] flex-col items-center justify-center overflow-hidden" style={{ background: "var(--void)" }}>
        <div ref={labelRef} className="absolute top-24 z-20 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--violet-bright)" }}>
            Stabilization
          </p>
          <h2 className="font-display mt-2 text-3xl md:text-4xl">
            {phase === "input" && "Three unstable clips."}
            {phase === "lock" && "Locking onto every one."}
            {phase === "merge" && "Processing the batch."}
            {phase === "reveal" && "Three stabilized results."}
          </h2>
        </div>

        <div className="relative mt-10 flex w-full max-w-6xl items-center justify-between px-6 md:px-16">
          {/* Before lanes */}
          <div className="z-10 flex w-[30%] flex-col gap-5">
            {CATHEDRAL_PAIRS.map((pair, i) => (
              <div
                key={pair.id}
                ref={(el) => { laneRefs.current[i] = el; }}
                className="overflow-hidden rounded-lg border"
                style={{ borderColor: "rgba(255,90,90,0.35)" }}
              >
                <video
                  ref={(el) => { beforeVideos.current[i] = el; }}
                  src={pair.before}
                  className="aspect-video w-full object-cover"
                  muted
                  loop
                  playsInline
                />
                <div className="flex items-center justify-between px-2 py-1" style={{ background: "var(--graphite)" }}>
                  <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: "var(--mist-faint)" }}>
                    Before
                  </span>
                  <span className="font-mono text-[9px]" style={{ color: "var(--mist-faint)" }}>
                    {pair.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Connecting paths + core */}
          <svg className="absolute inset-0 z-0 h-full w-full" viewBox="0 0 800 400" preserveAspectRatio="none" aria-hidden="true">
            {[70, 200, 330].map((y, i) => (
              <path
                key={i}
                ref={(el) => { pathRefs.current[i] = el; }}
                d={`M 190 ${y} C 320 ${y}, 320 200, 400 200 C 480 200, 480 ${y}, 610 ${y}`}
                fill="none"
                stroke="var(--violet)"
                strokeWidth="1.5"
                opacity="0.7"
              />
            ))}
          </svg>

          <div
            ref={coreRef}
            className="glow-violet absolute left-1/2 top-1/2 z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border"
            style={{ background: "var(--void)", borderColor: "var(--violet-bright)" }}
          >
            <img src="/assets/logo.png" alt="" className="h-10 w-10 rounded-full" />
          </div>

          {/* After lanes */}
          <div className="z-10 flex w-[30%] flex-col gap-5">
            {CATHEDRAL_PAIRS.map((pair, i) => (
              <div
                key={pair.id}
                ref={(el) => { afterRefs.current[i] = el; }}
                className="overflow-hidden rounded-lg border"
                style={{ borderColor: "rgba(124,92,255,0.5)" }}
              >
                <video
                  ref={(el) => { afterVideos.current[i] = el; }}
                  src={pair.after}
                  className="aspect-video w-full object-cover"
                  muted
                  loop
                  playsInline
                />
                <div className="flex items-center justify-between px-2 py-1" style={{ background: "var(--graphite)" }}>
                  <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: "var(--violet-bright)" }}>
                    After
                  </span>
                  <span className="font-mono text-[9px]" style={{ color: "var(--mist-faint)" }}>
                    {pair.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="absolute bottom-10 font-mono text-[11px] uppercase tracking-wider" style={{ color: "var(--mist-faint)" }}>
          Scroll &middot; Dala Tracker processes each clip in the batch automatically
        </p>
      </div>
    </div>
  );
}

/** Reduced-motion / mobile fallback: the same three pairs, laid out
 * statically rather than as a pinned scroll sequence. */
export function StaticCathedralMobile() {
  return (
    <div className="grain relative py-24" style={{ background: "var(--void)" }}>
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--violet-bright)" }}>
          Stabilization
        </p>
        <h2 className="font-display mt-3 text-3xl md:text-4xl">Three real results.</h2>
      </div>
      <div className="mx-auto mt-12 grid max-w-5xl gap-8 px-6 md:grid-cols-3">
        {CATHEDRAL_PAIRS.map((pair) => (
          <div key={pair.id} className="flex flex-col gap-3">
            <div className="overflow-hidden rounded-lg border" style={{ borderColor: "rgba(255,90,90,0.35)" }}>
              <video src={pair.before} className="aspect-video w-full object-cover" muted loop playsInline autoPlay />
              <p className="px-2 py-1 font-mono text-[9px] uppercase tracking-wider" style={{ background: "var(--graphite)", color: "var(--mist-faint)" }}>
                Before &mdash; {pair.label}
              </p>
            </div>
            <div className="overflow-hidden rounded-lg border" style={{ borderColor: "rgba(124,92,255,0.5)" }}>
              <video src={pair.after} className="aspect-video w-full object-cover" muted loop playsInline autoPlay />
              <p className="px-2 py-1 font-mono text-[9px] uppercase tracking-wider" style={{ background: "var(--graphite)", color: "var(--violet-bright)" }}>
                After &mdash; {pair.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
