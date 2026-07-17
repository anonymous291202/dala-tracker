# Dala Tracker — Website

The official site for Dala Tracker, a free Windows desktop app for batch head
tracking and stabilization.

## Stack

- React 19 + TypeScript, built with Vite
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- React Router for the multi-page site
- GSAP + ScrollTrigger for scroll-driven storytelling (pinned sequences,
  scroll-scrubbed video, the cathedral comparison, the product walkthrough)
- Lenis for smooth scroll (disabled automatically under "reduce motion")
- No Three.js/WebGL — 3D depth (hero interface panel, cathedral tunnel) is
  done with CSS 3D transforms and SVG, kept deliberately lightweight

## Getting started

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

Static output in `dist/`. Deploy to any static host. If your host does
client-side routing (React Router), make sure it rewrites unknown paths to
`index.html` — Netlify/Vercel do this by default; for others you may need a
`_redirects` or rewrite rule.

## What's in this build

- **Home** — hero with a real 3D-perspective interface panel (mouse
  parallax, Z-depth layers, not a flat image), the repetition problem, a
  scroll-scrubbed cinematic walkthrough of the real screen recording, the
  live interface demo, the "cathedral" three-clip comparison sequence, the
  manual-vs-batch comparison, and the download CTA
- **Features / How It Works / Download / Docs** — accurate, sourced from
  `src/data/content.ts`
- **Authors** — cinematic editorial page for both creators
  (`src/data/creators.ts`)
- **Changelog** — starts at v1.0.0, structured so new versions are a one-line
  addition to `src/data/changelog.ts`
- **Donate** — page + a floating glass button fixed bottom-right on every
  page except itself. Payment integration isn't wired up yet — flip
  `DONATION.enabled` in `src/data/content.ts` once it is
- **Analytics** (`/analytics`, linked as "Stats" in the footer) — download
  click tracking. Honest about scope: without a backend, numbers reflect
  *this browser only* and the dashboard says so. See
  `src/lib/analytics.ts` — set `reportEndpoint` to a real backend to start
  collecting site-wide numbers
- **Favicons** — a real generated set (16 through 512px, plus `.ico` and
  Apple touch icon) built from the actual logo, wired into `index.html` and
  `site.webmanifest`

## Content you provided that needs a callout

- `favicon.png` and `vector_images.png` (from your uploads) are AI-generated
  *reference/preview* images — flattened PNGs showing what a favicon package
  or logo system could look like, not actual exportable icon or vector
  files. The real favicon package in `public/favicons/` was generated from
  your actual `logo.png` instead. If you get genuine `.svg`/`.ai`/`.eps`
  logo files later, drop them in and they're a straightforward swap.
- The "cathedral" comparison uses `before1–3.mp4` / `after1–3.mp4`. You also
  sent `4–6` — those are sitting in `public/assets/comparisons/` and
  registered in `src/data/comparisons.ts` as `ADDITIONAL_PAIRS`, unused for
  now but ready if you want a second comparison set somewhere (e.g. a
  gallery on the Features or Docs page).

## Latest round of changes

- **Product walkthrough** is now a straightforward video player (click to
  play, native controls) instead of a scroll-scrubbed sequence
- **Ambient background video** (`Comp_1.mp4`, re-encoded as
  `public/assets/bg_loop.mp4`) loops behind the hero, every page header, and
  the final download section — always blurred, dimmed, and under a gradient
  scrim (`src/components/AmbientVideoBackground.tsx`) so it never fights
  with text
- **Sound system removed entirely** — no toggle, no synthesized SFX, no
  `soundManager`
- **Creators** link added to the main nav, pointing at `/authors`
- **Creator portraits** were re-cropped to show only the person plus their
  quote/signature — the earlier crops had accidentally included bits of the
  neighboring stat panels
- **Donations** are live: the floating button and `/donate` page link out to
  the real Buy Me a Chai page, with a page in between rather than an instant
  redirect
- **Download counters** now show inline: a small line on the home page's
  final CTA and a dedicated card on `/download`, both honestly scoped to
  "this browser" (see the Analytics section above)
- Removed a duplicate: the interface panel graphic was appearing twice in a
  row on the home page (once in the hero, once further down) — the second
  instance is now a lighter anchor-selector strip instead of the same panel
  repeated



Product facts, links, and copy: `src/data/content.ts`
Creator bios: `src/data/creators.ts`
Changelog entries: `src/data/changelog.ts`
Comparison video pairs: `src/data/comparisons.ts`

## Known follow-ups

- Real backend for site-wide download analytics (currently per-browser only)
- Payment link for donations
- Real system requirements — the section on `/download` is hidden until
  `SYSTEM_REQUIREMENTS_READY` is flipped to `true` in `content.ts`
- Ambient sound bed — the sound system has a slot for one
  (`ambientSrc` in `src/lib/soundManager.ts`) but no file wired in yet
