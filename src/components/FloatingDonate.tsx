import { Link, useLocation } from "react-router-dom";

export default function FloatingDonate() {
  const { pathname } = useLocation();
  if (pathname === "/donate") return null;

  return (
    <Link
      to="/donate"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border px-5 py-3 font-mono text-[11px] uppercase tracking-wider shadow-2xl backdrop-blur-md transition-transform hover:scale-105"
      style={{
        borderColor: "rgba(124,92,255,0.4)",
        background: "rgba(20,20,30,0.65)",
        color: "var(--mist)",
      }}
      aria-label="Support Dala Tracker"
    >
      <span aria-hidden="true" style={{ color: "var(--violet-bright)" }}>
        &#9825;
      </span>
      Donate
    </Link>
  );
}
