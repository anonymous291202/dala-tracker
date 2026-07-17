// Lightweight, privacy-friendly download tracking.
//
// IMPORTANT: a static site has nowhere to durably store a *global* download
// counter without some kind of backend. This module does two honest things:
//
// 1. Records real events in the visitor's own browser (localStorage), so the
//    dashboard has real (if only locally-scoped) numbers to show rather than
//    fabricated ones.
// 2. Exposes a single `reportEndpoint` you can point at a real backend (a
//    tiny serverless function, Cloudflare Worker, etc). If it's set, every
//    event is also POSTed there -- that's the wire-up point for real global
//    totals. Left blank, the dashboard clearly labels its numbers as
//    "this browser only."

export type DownloadEvent = { timestamp: number };

const STORAGE_KEY = "dala-download-events";

// Point this at a real endpoint when one exists. Left empty on purpose --
// no backend has been wired up yet.
const reportEndpoint = "";

function readEvents(): DownloadEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DownloadEvent[]) : [];
  } catch {
    return [];
  }
}

function writeEvents(events: DownloadEvent[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch {
    // localStorage unavailable -- fail silently, tracking is best-effort
  }
}

export function recordDownloadClick() {
  const events = readEvents();
  events.push({ timestamp: Date.now() });
  writeEvents(events);

  if (reportEndpoint) {
    fetch(reportEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timestamp: Date.now() }),
      keepalive: true,
    }).catch(() => {
      // Network errors shouldn't block the download itself
    });
  }
}

export function getDownloadStats() {
  const events = readEvents();
  const now = Date.now();
  const DAY = 86_400_000;

  const total = events.length;
  const today = events.filter((e) => now - e.timestamp < DAY).length;
  const week = events.filter((e) => now - e.timestamp < DAY * 7).length;
  const month = events.filter((e) => now - e.timestamp < DAY * 30).length;

  // Bucket the last 14 days for a simple trend view
  const days: { label: string; count: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const dayStart = now - i * DAY;
    const count = events.filter((e) => {
      const diff = dayStart - e.timestamp;
      return diff >= 0 && diff < DAY;
    }).length;
    const date = new Date(dayStart);
    days.push({
      label: date.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      count,
    });
  }

  return { total, today, week, month, days, hasBackend: Boolean(reportEndpoint) };
}
