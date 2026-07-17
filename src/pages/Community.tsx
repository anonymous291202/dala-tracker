import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { LINKS } from "../data/content";

export default function Community() {
  return (
    <>
      <PageHero eyebrow="Community" title="Join the Dala Tracker Discord." subtitle="Questions, feedback, and updates happen there first." />

      <section className="py-16" style={{ background: "var(--void)" }}>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <Reveal>
            <a
              href={LINKS.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-violet inline-block rounded-full px-8 py-4 font-mono text-sm font-medium uppercase tracking-wider transition-transform hover:scale-[1.03]"
              style={{ background: "var(--violet)", color: "var(--void)" }}
            >
              Join the Discord
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
