// src/lib/useLatestRelease.ts
//
// Fetches the live "latest release" info from /api/latest (which itself
// reads straight from GitHub Releases -- see api/latest.ts). Every
// component that shows a download link or version number should use
// this instead of importing PRODUCT.version / LINKS.download directly,
// so publishing a new GitHub Release is the only thing that ever needs
// to happen to update the whole site.
//
// Falls back to the static values in data/content.ts while the fetch is
// in flight, and permanently if it fails -- the site never shows a
// broken link or blank version number, worst case it's briefly (or,
// if GitHub/the API route is down, indefinitely) showing the last
// hardcoded fallback instead of the true latest.

import { useEffect, useState } from "react";
import { PRODUCT, LINKS } from "../data/content";

export interface LatestRelease {
  version: string;
  url: string;
  notes: string;
  loading: boolean;
  isLive: boolean; // true once real data from /api/latest has loaded
}

const FALLBACK: LatestRelease = {
  version: PRODUCT.version,
  url: LINKS.download,
  notes: "",
  loading: true,
  isLive: false,
};

export function useLatestRelease(): LatestRelease {
  const [state, setState] = useState<LatestRelease>(FALLBACK);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/latest")
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { version?: string; url?: string; notes?: string }) => {
        if (cancelled || !data.version || !data.url) return;
        setState({
          version: data.version,
          url: data.url,
          notes: data.notes ?? "",
          loading: false,
          isLive: true,
        });
      })
      .catch(() => {
        // Leave the static fallback in place -- never show a broken state
        if (!cancelled) setState((s) => ({ ...s, loading: false }));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}