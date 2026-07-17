import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../lib/useReducedMotion";
import { WORKFLOW_COMPARISON } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

export default function ActRepetition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !wordsRef.current) return;
    const words = wordsRef.current.querySelectorAll("[data-again]");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.15, x: -6 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.12,
          duration: 0.3,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="relative py-32" style={{ background: "var(--void)" }}>
      <div className="mx-auto max-w-5xl px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--violet-bright)" }}>
          The Problem
        </p>

        <div ref={wordsRef} className="mt-6 font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
          <span data-again className="block" style={{ color: "var(--mist)" }}>
            Track.
          </span>
          <span data-again className="mt-1 block" style={{ color: "var(--mist-dim)" }}>
            Again.
          </span>
          <span data-again className="mt-1 block" style={{ color: "var(--mist-faint)" }}>
            And again.
          </span>
          <span data-again className="mt-1 block" style={{ color: "var(--mist-faint)" }}>
            And again.
          </span>
        </div>

        <p className="text-balance mt-10 max-w-2xl text-lg md:text-xl" style={{ color: "var(--mist-dim)" }}>
          A traditional per-clip tracking workflow means repeating the same sequence of steps for every
          single clip &mdash; open the tool, place a tracking region, choose an anchor, configure
          stabilization, adjust scale, apply smoothing. Then start over for the next one.
        </p>

        <ol className="mt-10 grid gap-3 sm:grid-cols-2">
          {WORKFLOW_COMPARISON.manual.map((step, i) => (
            <li
              key={step}
              className="flex items-start gap-3 rounded-lg border px-4 py-3 text-sm"
              style={{ borderColor: "var(--graphite-3)", color: "var(--mist-dim)" }}
            >
              <span className="font-mono text-[11px]" style={{ color: "var(--mist-faint)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
