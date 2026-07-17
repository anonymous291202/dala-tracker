import PageHero from "../components/PageHero";
import { LEGAL, LINKS } from "../data/content";

export default function Privacy() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <section className="py-16" style={{ background: "var(--void)" }}>
        <div className="mx-auto flex max-w-2xl flex-col gap-6 px-6 text-sm leading-relaxed" style={{ color: "var(--mist-dim)" }}>
          <p>Last updated: 2026.</p>

          <p>
            This website does not require an account, login, or sign-up of any kind. There is no
            user database and no authentication system.
          </p>

          <div>
            <h2 className="font-display mb-2 text-base" style={{ color: "var(--mist)" }}>
              Information we collect
            </h2>
            <p>
              This site does not currently run analytics or tracking scripts. If that changes in
              the future, this page will be updated to reflect it before any tracking is added.
              If you contact us at {LINKS.email}, we receive whatever information you choose to
              include in that message.
            </p>
          </div>

          <div>
            <h2 className="font-display mb-2 text-base" style={{ color: "var(--mist)" }}>
              The Dala Tracker application
            </h2>
            <p>
              Dala Tracker is a desktop application that runs locally on your machine. It does not
              require an account and does not require you to sign in to use it.
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
              Contact
            </h2>
            <p>
              Questions about this policy can be sent to{" "}
              <a href={`mailto:${LINKS.email}`} className="underline">
                {LINKS.email}
              </a>
              .
            </p>
          </div>

          <p className="text-xs" style={{ color: "var(--mist-faint)" }}>
            This is a general policy statement and not a substitute for formal legal advice.
          </p>
        </div>
      </section>
    </>
  );
}
