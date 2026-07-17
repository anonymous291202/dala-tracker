import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { LINKS } from "../data/content";

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Get in touch." />

      <section className="py-16" style={{ background: "var(--void)" }}>
        <div className="mx-auto max-w-2xl px-6">
          <Reveal>
            <div
              className="rounded-2xl border p-8 text-center"
              style={{ borderColor: "var(--graphite-3)", background: "var(--graphite-2)" }}
            >
              <p className="text-sm" style={{ color: "var(--mist-dim)" }}>
                For support, feedback, or anything else:
              </p>
              <a
                href={`mailto:${LINKS.email}`}
                className="mt-3 block font-display text-xl"
                style={{ color: "var(--violet-bright)" }}
              >
                {LINKS.email}
              </a>
              <p className="mt-6 text-sm" style={{ color: "var(--mist-faint)" }}>
                For faster answers to common questions, the{" "}
                <a href={LINKS.discord} target="_blank" rel="noopener noreferrer" className="underline">
                  Discord community
                </a>{" "}
                is usually quicker.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
