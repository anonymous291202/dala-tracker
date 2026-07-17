import { kv } from "@vercel/kv";

export const config = { runtime: "edge" };

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default async function handler(req: Request) {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  const now = new Date();
  const dayKeys: string[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    dayKeys.push(isoDate(d));
  }

  const [total, ...dayCounts] = await Promise.all([
    kv.get<number>("downloads:total"),
    ...dayKeys.map((d) => kv.get<number>(`downloads:day:${d}`)),
  ]);

  const days = dayKeys.map((label, i) => ({
    label: new Date(label).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
    count: dayCounts[i] ?? 0,
  }));

  const today = days[days.length - 1]?.count ?? 0;
  const week = days.slice(-7).reduce((sum, d) => sum + d.count, 0);
  const month = days.reduce((sum, d) => sum + d.count, 0);

  return new Response(
    JSON.stringify({ total: total ?? 0, today, week, month, days }),
    { status: 200, headers: { "Content-Type": "application/json", "Cache-Control": "s-maxage=30" } }
  );
}