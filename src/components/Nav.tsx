import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAV_ITEMS, LINKS } from "../data/content";
import { recordDownloadClick } from "../lib/analytics";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300"
      style={{
        background: scrolled ? "rgba(5,5,10,0.82)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--graphite-3)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Dala Tracker home">
          <img src="/assets/logo.png" alt="" className="h-8 w-8 rounded-md" />
          <span className="font-display text-sm tracking-wide">
            DALA <span style={{ color: "var(--violet-bright)" }}>TRACKER</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="font-mono text-[12px] uppercase tracking-wider transition-colors hover:text-white"
                style={{
                  color:
                    location.pathname === item.to ? "var(--mist)" : "var(--mist-dim)",
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={LINKS.download}
            onClick={() => recordDownloadClick()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-5 py-2 font-mono text-[12px] font-medium uppercase tracking-wider transition-transform hover:scale-[1.03]"
            style={{ background: "var(--violet)", color: "var(--void)" }}
          >
            Download Free
          </a>
        </div>

        <button
          type="button"
          className="flex flex-col gap-1.5 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className="h-[1.5px] w-6 transition-transform"
            style={{
              background: "var(--mist)",
              transform: open ? "translateY(3.5px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="h-[1.5px] w-6 transition-transform"
            style={{
              background: "var(--mist)",
              transform: open ? "translateY(-3.5px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </nav>

      {open && (
        <div
          className="border-t px-6 py-6 lg:hidden"
          style={{ borderColor: "var(--graphite-3)", background: "var(--void)" }}
        >
          <ul className="flex flex-col gap-5">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="font-mono text-sm uppercase tracking-wider">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={LINKS.download}
            onClick={() => recordDownloadClick()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block rounded-full px-5 py-3 text-center font-mono text-[12px] font-medium uppercase tracking-wider"
            style={{ background: "var(--violet)", color: "var(--void)" }}
          >
            Download Free
          </a>
        </div>
      )}
    </header>
  );
}
