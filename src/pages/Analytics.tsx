import { useEffect, useState } from "react";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { getGlobalDownloadStats } from "../lib/analytics";

export default function Analytics() {
  const [stats, setStats] = useState<Awaited<ReturnType<typeof getGlobalDownloadStats>> | null>(null);

  useEffect(() => {
    getGlobalDownloadStats().then(setStats);
  }, []);

  const maxDay = stats ? Math.max(1, ...stats.days.map((d) => d.count)) : 1;

  return (
    <>
      <PageHero
        eyebrow="Internal"
        title="Download activity."
        subtitle="Lightweight and privacy-friendly: no third-party trackers, no cookies, no personal data collected."
      />

      <section className="py-10" style={{ background: "var(--void)" }}>
        <div className="mx-auto max-w-5xl px-6">
          {stats && !stats.isGlobal && (
            <Reveal>
              <div
                className="mb-10 rounded-xl border px-5 py-4 text-sm"
                style={{ borderColor: "var(--violet-dim)", background: "rgba(124,92,255,0.06)", color: "var(--mist-dim)" }}
              >
                No backend is connected yet, so these numbers reflect activity recorded in{" "}
                <strong style={{ color: "var(--mist)" }}>this browser only</strong> -- not a global
                total across all visitors. See <code className="font-mono">api/track.ts</code> and{" "}
                <code className="font-mono">api/stats.ts</code>, and connect Vercel KV to your
                project to start collecting site-wide numbers.
              </div>
            </Reveal>
          )}

          {stats && stats.isGlobal && (
            <Reveal>
              <div
                className="mb-10 rounded-xl border px-5 py-4 text-sm"
                style={{ borderColor: "var(--violet-dim)", background: "rgba(124,92,255,0.06)", color: "var(--mist-dim)" }}
              >
                Connected to the live backend -- these are real, site-wide numbers across all
                visitors.
              </div>
            </Reveal>
          )}

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard label="Total" value={stats?.total ?? 0} />
            <StatCard label="Today" value={stats?.today ?? 0} />
            <StatCard label="This Week" value={stats?.week ?? 0} />
            <StatCard label="This Month" value={stats?.month ?? 0} />
          </div>

          <Reveal delay={0.1} className="mt-14">
            <h2 className="font-display text-xl">Last 14 days</h2>
            <div
              className="mt-6 flex h-40 items-end gap-2 rounded-xl border p-4"
              style={{ borderColor: "var(--graphite-3)", background: "var(--graphite-2)" }}
            >
              {(stats?.days ?? []).map((d) => (
                <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t"
                    style={{
                      height: `${Math.max(4, (d.count / maxDay) * 100)}px`,
                      background: d.count > 0 ? "var(--violet)" : "var(--graphite-3)",
                    }}
                    title={`${d.label}: ${d.count}`}
                  />
                  <span className="font-mono text-[8px]" style={{ color: "var(--mist-faint)" }}>
                    {d.label.split(" ")[1]}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Reveal>
      <div className="rounded-xl border p-5" style={{ borderColor: "var(--graphite-3)", background: "var(--graphite-2)" }}>
        <p className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--mist-faint)" }}>
          {label}
        </p>
        <p className="font-display mt-2 text-3xl" style={{ color: "var(--violet-bright)" }}>
          {value}
        </p>
      </div>
    </Reveal>
  );
}