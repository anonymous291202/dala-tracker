import { Link } from "react-router-dom";
import { FOOTER_LINKS, LEGAL, LINKS, PRODUCT } from "../data/content";
import { useLatestRelease } from "../lib/useLatestRelease";

export default function Footer() {
  const release = useLatestRelease();
  return (
    <footer className="border-t" style={{ borderColor: "var(--graphite-3)" }}>
      <div className="mx-auto max-w-7xl px-6 py-20">
        <p className="font-display text-3xl leading-tight md:text-5xl">
          TRACK LESS.
          <br />
          <span style={{ color: "var(--violet-bright)" }}>CREATE MORE.</span>
        </p>

        <div className="mt-16 grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <img src="/assets/logo.png" alt="" className="h-7 w-7 rounded-md" />
              <span className="font-display text-xs tracking-wide">DALA TRACKER</span>
            </div>
            <p className="mt-4 max-w-xs text-sm" style={{ color: "var(--mist-dim)" }}>
              {PRODUCT.tagline}
            </p>
          </div>

          <FooterColumn title="Product" links={FOOTER_LINKS.product} />
          <FooterColumn title="Resources" links={FOOTER_LINKS.resources} />
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "var(--mist-faint)" }}>
              Community
            </p>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li>
                <a href={LINKS.discord} target="_blank" rel="noopener noreferrer" className="hover:text-white" style={{ color: "var(--mist-dim)" }}>
                  Discord
                </a>
              </li>
              <li>
                <a href={`mailto:${LINKS.email}`} className="hover:text-white" style={{ color: "var(--mist-dim)" }}>
                  Contact
                </a>
              </li>
              <li>
                <Link to="/donate" className="hover:text-white" style={{ color: "var(--mist-dim)" }}>
                  Donate
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-16 flex flex-col gap-4 border-t pt-8 font-mono text-[11px] uppercase tracking-wider md:flex-row md:items-center md:justify-between"
          style={{ borderColor: "var(--graphite-3)", color: "var(--mist-faint)" }}
        >
          <span>{LEGAL.copyright}</span>
          <span>Version {release.version} &middot; {PRODUCT.platform} &middot; {PRODUCT.price}</span>
          <div className="flex gap-6">
            {FOOTER_LINKS.legal.map((l) => (
              <Link key={l.to} to={l.to} className="hover:text-white">
                {l.label}
              </Link>
            ))}
            <Link to="/analytics" className="hover:text-white">
              Stats
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "var(--mist-faint)" }}>
        {title}
      </p>
      <ul className="mt-4 flex flex-col gap-3 text-sm">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="hover:text-white" style={{ color: "var(--mist-dim)" }}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}