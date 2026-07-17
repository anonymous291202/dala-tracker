import { kv } from "@vercel/kv";

export const config = { runtime: "edge" };

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  await Promise.all([
    kv.incr("downloads:total"),
    kv.incr(`downloads:day:${today}`),
  ]);
  // Let daily buckets expire after 60 days so the key space doesn't grow forever
  await kv.expire(`downloads:day:${today}`, 60 * 24 * 60 * 60);

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}