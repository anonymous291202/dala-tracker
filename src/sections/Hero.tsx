import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { LINKS, PRODUCT } from "../data/content";
import { useReducedMotion } from "../lib/useReducedMotion";
import { recordDownloadClick } from "../lib/analytics";
import Perspective3DPanel from "../components/Perspective3DPanel";
import InterfacePanel from "../components/InterfacePanel";
import AmbientVideoBackground from "../components/AmbientVideoBackground";

export default function Hero() {
  const reticleRef = useRef<HTMLDivElement>(null);
  const bracketsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const coordRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const [locked, setLocked] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setLocked(true);
      return;
    }

    const tl = gsap.timeline({ delay: 0.3 });

    // Reticle searches across the dark field
    tl.set(reticleRef.current, { xPercent: -50, yPercent: -50 })
      .to(reticleRef.current, {
        left: "38%",
        top: "45%",
        duration: 0.5,
        ease: "power2.inOut",
      })
      .to(reticleRef.current, {
        left: "63%",
        top: "58%",
        duration: 0.4,
        ease: "power2.inOut",
      })
      .to(reticleRef.current, {
        left: "50%",
        top: "50%",
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          setLocked(true);
        },
      })
      .to(bracketsRef.current, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(3)" }, "-=0.1")
      .to(reticleRef.current, { scale: 0, opacity: 0, duration: 0.3 }, "-=0.1")
      .fromTo(
        contentRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.15"
      )
      .fromTo(
        panelRef.current,
        { opacity: 0, z: -220, rotateY: -8, scale: 0.92 },
        { opacity: 1, z: 0, rotateY: 0, scale: 1, duration: 0.9, ease: "power3.out" },
        "-=0.6"
      );

    // Ambient coordinate readout, purely decorative/technical flavor
    let coordInterval: number | undefined;
    if (coordRef.current) {
      coordInterval = window.setInterval(() => {
        const x = (Math.random() * 100).toFixed(2);
        const y = (Math.random() * 100).toFixed(2);
        if (coordRef.current) coordRef.current.textContent = `X:${x} Y:${y}`;
      }, 900);
    }

    return () => {
      tl.kill();
      if (coordInterval) window.clearInterval(coordInterval);
    };
  }, [reducedMotion]);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden" style={{ background: "var(--void)" }}>
      <AmbientVideoBackground opacity={0.5} />

      {/* Searching reticle */}
      {!reducedMotion && (
        <div
          ref={reticleRef}
          className="pointer-events-none absolute z-10 h-16 w-16"
          style={{ left: "20%", top: "30%" }}
          aria-hidden="true"
        >
          <div className="h-full w-full rounded-full border" style={{ borderColor: "rgba(124,92,255,0.5)" }} />
          <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "var(--violet-bright)" }} />
        </div>
      )}

      {/* Lock brackets */}
      <div
        ref={bracketsRef}
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-28 w-28 -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: reducedMotion ? 0 : 0, transform: "translate(-50%,-50%) scale(0.6)" }}
        aria-hidden="true"
      >
        <Corner className="left-0 top-0" />
        <Corner className="right-0 top-0 rotate-90" />
        <Corner className="bottom-0 right-0 rotate-180" />
        <Corner className="bottom-0 left-0 -rotate-90" />
      </div>

      {/* Technical readout */}
      <div
        className="pointer-events-none absolute right-6 top-24 hidden flex-col items-end gap-1 font-mono text-[10px] uppercase tracking-wider md:flex"
        style={{ color: "var(--mist-faint)" }}
      >
        <span ref={coordRef}>X:00.00 Y:00.00</span>
        <span>Status: {locked ? "Locked" : "Searching"}</span>
      </div>

      <div className="relative z-20 mx-auto grid w-full max-w-7xl items-center gap-10 px-6 pt-24 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div
          ref={contentRef}
          style={{ opacity: reducedMotion ? 1 : 0 }}
        >
          <p className="font-mono text-[12px] uppercase tracking-[0.25em]" style={{ color: "var(--violet-bright)" }}>
            Dala Tracker &mdash; Batch Head Tracking Suite
          </p>
          <h1 className="font-display text-balance mt-5 text-5xl leading-[1.02] sm:text-6xl md:text-7xl">
            TRACK LESS.
            <br />
            <span style={{ color: "var(--violet-bright)" }} className="text-glow">
              CREATE MORE.
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-base md:text-lg" style={{ color: "var(--mist-dim)" }}>
            {PRODUCT.tagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={LINKS.download}
              onClick={() => recordDownloadClick()}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-violet rounded-full px-7 py-3.5 font-mono text-[12px] font-medium uppercase tracking-wider transition-transform hover:scale-[1.03]"
              style={{ background: "var(--violet)", color: "var(--void)" }}
            >
              Download Free
            </a>
            <a
              href="#how-it-works"
              className="rounded-full border px-7 py-3.5 font-mono text-[12px] uppercase tracking-wider transition-colors hover:border-[var(--violet-bright)]"
              style={{ borderColor: "var(--graphite-3)", color: "var(--mist)" }}
            >
              Watch How It Works
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-wider" style={{ color: "var(--mist-faint)" }}>
            <span>{PRODUCT.price}</span>
            <span>Desktop application &middot; {PRODUCT.platform}</span>
            <span>Version {PRODUCT.version}</span>
            <span>{PRODUCT.gpuNote}</span>
          </div>
        </div>

        {/* The interface as a physical object in Z-space, not a flat image */}
        <div
          ref={panelRef}
          className="hidden lg:block"
          style={{ opacity: reducedMotion ? 1 : 0 }}
        >
          <Perspective3DPanel>
            <InterfacePanel depth showLandmarks className="shadow-2xl" />
          </Perspective3DPanel>
        </div>
      </div>
    </section>
  );
}

function Corner({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`absolute h-8 w-8 ${className}`}
      aria-hidden="true"
    >
      <path d="M2 2 L2 12 M2 2 L12 2" stroke="var(--violet-bright)" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
