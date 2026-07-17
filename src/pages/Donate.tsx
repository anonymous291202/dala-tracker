import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { DONATION, LINKS } from "../data/content";

export default function Donate() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Support Dala Tracker."
        subtitle="Dala Tracker is free and always will be. If it's useful to you, supporting its development helps keep it going."
      />

      <section className="py-16" style={{ background: "var(--void)" }}>
        <div className="mx-auto max-w-2xl px-6">
          <Reveal>
            <div
              className="rounded-2xl border p-10 text-center"
              style={{ borderColor: "var(--graphite-3)", background: "var(--graphite-2)" }}
            >
              {DONATION.enabled ? (
                <a
                  href={DONATION.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glow-violet inline-block rounded-full px-8 py-4 font-mono text-sm font-medium uppercase tracking-wider transition-transform hover:scale-[1.03]"
                  style={{ background: "var(--violet)", color: "var(--void)" }}
                >
                  Donate
                </a>
              ) : (
                <>
                  <p className="font-display text-lg">Coming soon</p>
                  <p className="mt-3 text-sm" style={{ color: "var(--mist-dim)" }}>
                    {DONATION.note}
                  </p>
                </>
              )}
              <p className="mt-6 text-sm" style={{ color: "var(--mist-faint)" }}>
                In the meantime, the best way to support Dala Tracker is joining the{" "}
                <a href={LINKS.discord} target="_blank" rel="noopener noreferrer" className="underline">
                  Discord community
                </a>{" "}
                and sharing feedback.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
