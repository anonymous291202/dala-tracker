import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { LEGAL } from "../data/content";

export default function About() {
  return (
    <>
      <PageHero eyebrow="About" title="Why Dala Tracker exists." />

      <section className="py-16" style={{ background: "var(--void)" }}>
        <div className="mx-auto flex max-w-2xl flex-col gap-6 px-6 text-base leading-relaxed" style={{ color: "var(--mist-dim)" }}>
          <Reveal>
            <p>
              Head tracking and stabilization in a traditional editor is a workflow you repeat by
              hand, clip by clip: place a tracking point, configure stabilization, adjust scale,
              apply smoothing, and start over for the next one. That repetition is the entire
              reason Dala Tracker exists &mdash; to turn a manual, per-clip process into one batch
              workflow configured once.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p>{LEGAL.publisherStatement}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              Dala Tracker is under active development. The current release focuses entirely on
              batch head tracking and stabilization; further tooling is planned but not yet part
              of the app.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              to="/authors"
              className="inline-block rounded-full border px-6 py-3 font-mono text-[12px] uppercase tracking-wider transition-colors hover:border-[var(--violet-bright)]"
              style={{ borderColor: "var(--graphite-3)", color: "var(--mist)" }}
            >
              Meet the creators
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
