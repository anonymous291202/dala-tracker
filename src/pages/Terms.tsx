import PageHero from "../components/PageHero";
import { LEGAL, LINKS, PRODUCT } from "../data/content";

export default function Terms() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" />
      <section className="py-16" style={{ background: "var(--void)" }}>
        <div className="mx-auto flex max-w-2xl flex-col gap-6 px-6 text-sm leading-relaxed" style={{ color: "var(--mist-dim)" }}>
          <p>Last updated: 2026.</p>

          <div>
            <h2 className="font-display mb-2 text-base" style={{ color: "var(--mist)" }}>
              The software
            </h2>
            <p>
              Dala Tracker is provided free of charge, {PRODUCT.platformNote} It is provided
              "as is," without warranty of any kind, express or implied. Use it at your own
              discretion.
            </p>
          </div>

          <div>
            <h2 className="font-display mb-2 text-base" style={{ color: "var(--mist)" }}>
              Acceptable use
            </h2>
            <p>
              Don't use Dala Tracker for anything unlawful, and don't redistribute it as your own
              work.
            </p>
          </div>

          <div>
            <h2 className="font-display mb-2 text-base" style={{ color: "var(--mist)" }}>
              Publisher
            </h2>
            <p>{LEGAL.publisherStatement}</p>
          </div>

          <div>
            <h2 className="font-display mb-2 text-base" style={{ color: "var(--mist)" }}>
              Changes
            </h2>
            <p>
              These terms may be updated as the software develops. Continued use of Dala Tracker
              after an update means you accept the revised terms.
            </p>
          </div>

          <div>
            <h2 className="font-display mb-2 text-base" style={{ color: "var(--mist)" }}>
              Contact
            </h2>
            <p>
              Questions about these terms can be sent to{" "}
              <a href={`mailto:${LINKS.email}`} className="underline">
                {LINKS.email}
              </a>
              , or through the{" "}
              <a href={LINKS.discord} target="_blank" rel="noopener noreferrer" className="underline">
                Discord community
              </a>
              .
            </p>
          </div>

          <p className="text-xs" style={{ color: "var(--mist-faint)" }}>
            This is a general terms statement and not a substitute for formal legal advice.
          </p>
        </div>
      </section>
    </>
  );
}
