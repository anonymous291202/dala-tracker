// src/lib/useReleases.ts
//
// Fetches the full release history from /api/releases (see api/releases.ts,
// which reads straight from GitHub Releases) for the changelog page.
// Falls back to the static CHANGELOG in data/changelog.ts while the fetch
// is in flight, and permanently if it fails or GitHub has no releases yet
// -- the changelog page never renders empty.

import { useEffect, useState } from "react";
import { CHANGELOG, type ChangelogEntry } from "../data/changelog";

export interface ReleasesState {
  entries: ChangelogEntry[];
  loading: boolean;
  isLive: boolean; // true once real data from /api/releases has loaded
}

export function useReleases(): ReleasesState {
  const [state, setState] = useState<ReleasesState>({
    entries: CHANGELOG,
    loading: true,
    isLive: false,
  });

  useEffect(() => {
    let cancelled = false;

    fetch("/api/releases")
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: ChangelogEntry[]) => {
        if (cancelled || !Array.isArray(data) || data.length === 0) return;
        setState({ entries: data, loading: false, isLive: true });
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