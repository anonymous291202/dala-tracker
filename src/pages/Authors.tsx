import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../components/Reveal";
import { CREATORS, type Creator } from "../data/creators";
import { useReducedMotion } from "../lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function Authors() {
  return (
    <div style={{ background: "var(--void)" }}>
      <section className="grain relative flex min-h-[60svh] flex-col items-center justify-center px-6 pt-32 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em]" style={{ color: "var(--violet-bright)" }}>
          Dala Tracker &mdash; The Minds Behind The Magic
        </p>
        <h1 className="font-display text-balance mt-5 text-5xl leading-[1.05] md:text-7xl">
          THE CREATORS
        </h1>
      </section>

      {CREATORS.map((creator, i) => (
        <AuthorSection key={creator.slug} creator={creator} reversed={i % 2 === 1} />
      ))}
    </div>
  );
}

function AuthorSection({ creator, reversed }: { creator: Creator; reversed: boolean }) {
  const portraitRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !portraitRef.current || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        portraitRef.current,
        { y: -40 },
        {
          y: 40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="relative border-t py-24" style={{ borderColor: "var(--graphite-3)" }}>
      <div
        className={`mx-auto flex max-w-6xl flex-col gap-12 px-6 lg:flex-row lg:items-center ${
          reversed ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* Portrait */}
        <div className="relative mx-auto w-full max-w-sm flex-none lg:mx-0">
          <div className="absolute -inset-6 rounded-[2rem] opacity-40 blur-2xl" style={{ background: "radial-gradient(circle, var(--violet-dim), transparent 70%)" }} />
          <div ref={portraitRef} className="relative overflow-hidden rounded-[1.5rem] border" style={{ borderColor: "var(--graphite-3)" }}>
            <img src={creator.portrait} alt={`Portrait of ${creator.displayName}`} className="w-full object-cover" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--violet-bright)" }}>
              {creator.role}
            </p>
            <h2 className="font-display text-balance mt-3 text-4xl leading-[1.05] md:text-5xl">
              {creator.name}
            </h2>
            <p className="mt-4 max-w-lg text-lg" style={{ color: "var(--mist-dim)" }}>
              {creator.tagline}
            </p>
            <p className="mt-5 max-w-xl text-sm leading-relaxed" style={{ color: "var(--mist-dim)" }}>
              {creator.bio}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-8 flex flex-wrap gap-3">
              {creator.focus.map((f) => (
                <span
                  key={f}
                  className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider"
                  style={{ borderColor: "var(--violet-dim)", color: "var(--violet-bright)" }}
                >
                  {f}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {creator.stats.map((s) => (
                <div key={s.label} className="rounded-lg border p-3" style={{ borderColor: "var(--graphite-3)" }}>
                  <p className="font-display text-sm" style={{ color: "var(--mist)" }}>{s.value}</p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-wider" style={{ color: "var(--mist-faint)" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Timeline */}
      <Reveal delay={0.05} className="mx-auto mt-16 max-w-6xl px-6">
        <p className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "var(--mist-faint)" }}>
          Journey
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-5">
          {creator.timeline.map((t) => (
            <div key={t.year} className="rounded-lg border p-4" style={{ borderColor: "var(--graphite-3)" }}>
              <p className="font-mono text-[11px]" style={{ color: "var(--violet-bright)" }}>{t.year}</p>
              <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--mist-dim)" }}>{t.text}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Skills + contributions */}
      <div className="mx-auto mt-16 grid max-w-6xl gap-10 px-6 md:grid-cols-2">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "var(--mist-faint)" }}>
            Core skills
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {creator.skills.map((s) => (
              <span
                key={s}
                className="rounded-full border px-3 py-1.5 text-xs"
                style={{ borderColor: "var(--graphite-3)", color: "var(--mist-dim)" }}
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "var(--mist-faint)" }}>
            Contributions
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {creator.contributions.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--mist-dim)" }}>
                <span className="mt-1.5 h-1 w-1 flex-none rounded-full" style={{ background: "var(--violet-bright)" }} />
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Philosophy + socials */}
      <Reveal delay={0.1} className="mx-auto mt-16 max-w-3xl px-6 text-center">
        <p className="font-display text-balance text-2xl leading-snug" style={{ color: "var(--mist)" }}>
          {creator.philosophy}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {creator.socials.map((s) => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors hover:border-[var(--violet-bright)]"
              style={{ borderColor: "var(--graphite-3)", color: "var(--mist-dim)" }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
