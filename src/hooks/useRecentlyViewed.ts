import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "cookie-bytes:recently-viewed";
const STORAGE_EVENT = "cookie-bytes:recently-viewed-changed";
const MAX_ENTRIES = 12;

export type RecentlyViewedKind = "situation" | "book" | "resource" | "activity";

export interface RecentlyViewedEntry {
  /** `${kind}:${id}`, e.g. "book:my-mouth-is-a-volcano". */
  key: string;
  kind: RecentlyViewedKind;
  id: string;
  viewedAt: string;
}

function readEntries(): RecentlyViewedEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RecentlyViewedEntry[]) : [];
  } catch {
    return [];
  }
}

function writeEntries(entries: RecentlyViewedEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  window.dispatchEvent(new Event(STORAGE_EVENT));
}

/**
 * Local-only "recently viewed" history for My Space. Like the saved-items and
 * reflections stores, this never leaves the browser — there is no backend
 * for this prototype. Detail pages call `recordView(kind, id)` once on
 * mount; My Space reads `entries` to render the list, most recent first.
 */
export function useRecentlyViewed() {
  const [entries, setEntries] = useState<RecentlyViewedEntry[]>(() => readEntries());

  useEffect(() => {
    const sync = () => setEntries(readEntries());
    window.addEventListener(STORAGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(STORAGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const recordView = useCallback((kind: RecentlyViewedKind, id: string) => {
    const key = `${kind}:${id}`;
    const current = readEntries().filter((e) => e.key !== key);
    const next = [{ key, kind, id, viewedAt: new Date().toISOString() }, ...current].slice(0, MAX_ENTRIES);
    writeEntries(next);
    setEntries(next);
  }, []);

  const clear = useCallback(() => {
    writeEntries([]);
    setEntries([]);
  }, []);

  return { entries, recordView, clear };
}
