import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center px-6 text-center" style={{ background: "var(--void)" }}>
      <p className="font-mono text-[11px] uppercase tracking-[0.25em]" style={{ color: "var(--violet-bright)" }}>
        Lost Tracking
      </p>
      <h1 className="font-display mt-4 text-5xl">404</h1>
      <p className="mt-3 text-sm" style={{ color: "var(--mist-dim)" }}>
        This page couldn't be located.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full px-6 py-3 font-mono text-[12px] uppercase tracking-wider"
        style={{ background: "var(--violet)", color: "var(--void)" }}
      >
        Back Home
      </Link>
    </section>
  );
}
