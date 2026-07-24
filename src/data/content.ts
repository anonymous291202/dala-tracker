// Single source of truth for every factual claim on the site.
// Nothing outside this file should hardcode a product fact, link, or number --
// keeps marketing copy honest and easy to update when real info changes.

export const PRODUCT = {
  name: "Dala Tracker",
  tagline: "Batch head tracking and stabilization for editors who value speed and precision.",
  // Fallback only -- the live version shown across the site comes from
  // GitHub Releases via /api/latest (see src/lib/useLatestRelease.ts).
  // This value is only ever seen briefly while that fetch is in flight,
  // or if it fails. Bump it occasionally so the fallback stays close to
  // reality, but you don't need to touch it every release anymore.
  version: "1.0.0",
  price: "Free",
  platform: "Windows",
  platformNote: "Windows only. macOS and Linux are not currently supported.",
  gpuNote: "No dedicated GPU required.",
  downloadSizeApprox: "Approximately 700 MB",
  releaseDateKnown: false,
};

export const LINKS = {
  // Fallback only, same reasoning as PRODUCT.version above -- the live
  // download link everywhere on the site comes from /api/latest. Kept
  // here so the site still has a working link if that endpoint or
  // GitHub itself is briefly unreachable.
  download: "https://github.com/anonymous291202/dala-tracker/releases/download/v1.0.0/DalaTracker-Setup-1.0.0.exe",
  discord: "https://discord.com/invite/6DncTrc5Qn",
  email: "dalaaep10@gmail.com",
};

// Set to true and fill in a real destination once payment integration is ready.
export const DONATION = {
  enabled: true,
  url: "https://buymeachai.ezee.li/dala_aep",
  note: "",
};

// System requirements haven't been formally benchmarked. Flip to true and
// fill in SYSTEM_REQUIREMENTS once real numbers exist -- until then, the
// section stays hidden rather than showing a placeholder.
export const SYSTEM_REQUIREMENTS_READY = false;
export const SYSTEM_REQUIREMENTS: { label: string; value: string }[] = [];

export const LEGAL = {
  brand: "Dala.aep",
  developer: "Independent developer (identity kept anonymous by choice)",
  country: "India",
  copyright: "\u00A9 2026 Dala.aep. All rights reserved.",
  publisherStatement:
    "Dala Tracker is independently developed and published under the creator brand Dala.aep. The developer chooses to remain publicly anonymous.",
};

// Anchor points -- verified against tracking/head_tracking.py + the app UI
export const ANCHOR_POINTS = [
  { id: "between_eyebrows", label: "Between Eyebrows", description: "The default anchor -- a stable point that holds through most dialogue and reaction shots." },
  { id: "nose", label: "Nose", description: "Tracks from the bridge of the nose. Useful when brow movement is heavy." },
  { id: "forehead", label: "Forehead", description: "A higher anchor for shots where the lower face is obscured." },
  { id: "mouth", label: "Mouth", description: "Anchors near the mouth for close, dialogue-heavy framing." },
];

export const MANUAL_TRACKING = {
  label: "Manual point",
  description:
    "Click any pixel on the first frame to place a tracker point by hand -- for shots where face landmarks aren't reliable: profile turns, the back of a head, fast reveals, or any visible feature at all (an ear, a hairline, a collar).",
};

// Verified features -- every line here is backed by something read in the source code,
// not the marketing brief. Sequential batch processing is stated as such, not "parallel."
export const FEATURES = [
  {
    title: "Batch import",
    detail: "Add individual clips or whole folders. Everything queues up and is processed one clip after another -- no re-opening a project per clip.",
  },
  {
    title: "Automatic face tracking",
    detail: "MediaPipe face-landmark detection finds the face and follows it frame to frame, holding the last known position if detection briefly drops rather than snapping back to center.",
  },
  {
    title: "Manual point tracking",
    detail: MANUAL_TRACKING.description,
  },
  {
    title: "Four anchor points",
    detail: "Between eyebrows, nose, forehead, or mouth -- chosen per clip, applied automatically once selected.",
  },
  {
    title: "Smoothing window",
    detail: "An adjustable window that controls how much the tracked motion is smoothed before it's applied.",
  },
  {
    title: "Tracking sensitivity",
    detail: "Low, Medium, or High presets that change how tightly the tracker follows sudden motion versus outliers.",
  },
  {
    title: "Motion blur",
    detail: "An optional render pass that adds directional blur based on the tracked motion, matching the blur a real camera move would produce.",
  },
  {
    title: "Frame blending",
    detail: "An optional blending pass across frames for smoother motion in the final render.",
  },
  {
    title: "Export controls",
    detail: "Choose codec (H.264 or H.265), container (MP4, MOV, or MKV), quality, and FPS -- encoded for real via ffmpeg, applied to the whole batch.",
  },
  {
    title: "Original audio preserved",
    detail: "The source clip's audio track is carried through to the stabilized output automatically.",
  },
  {
    title: "Destination folder & safe overwrite",
    detail: "Pick one destination folder for the batch. Each clip is saved as <name>_stabilized.<ext>; re-tracking a clip overwrites its own previous output, not anything else.",
  },
];

export const NOT_YET = [
  "Twixtor-style retiming, zoom curves, and full export/project tooling are planned for later stages of the app and are not part of the current release.",
];

export const WORKFLOW_COMPARISON = {
  manual: [
    "Open the tracker/stabilizer tool for one clip",
    "Place a tracking region on a stable facial point",
    "Choose the anchor location",
    "Configure tracking and stabilization properties",
    "Track the clip, apply stabilization",
    "Adjust scale so stabilized footage still fills the frame",
    "Apply smoothing, motion blur, or frame blending as needed",
    "Repeat the entire process for the next clip",
  ],
  dala: [
    "Import multiple clips (or a whole folder) at once",
    "Choose a tracking mode and anchor point",
    "Set smoothing, sensitivity, and motion options -- applied to the whole batch",
    "Start batch tracking",
    "Dala Tracker processes each clip in the queue automatically",
    "Export the stabilized results from your destination folder",
  ],
};

export const NAV_ITEMS = [
  { label: "Product", to: "/" },
  { label: "Features", to: "/features" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Download", to: "/download" },
  { label: "Docs", to: "/docs" },
  { label: "Creators", to: "/authors" },
  { label: "Community", to: "/community" },
];

export const FOOTER_LINKS = {
  product: [
    { label: "Features", to: "/features" },
    { label: "How It Works", to: "/how-it-works" },
    { label: "Download", to: "/download" },
    { label: "Changelog", to: "/changelog" },
  ],
  resources: [
    { label: "Documentation", to: "/docs" },
    { label: "About", to: "/about" },
    { label: "The Creators", to: "/authors" },
    { label: "Contact", to: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms of Service", to: "/terms" },
  ],
};