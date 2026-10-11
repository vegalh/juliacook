import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "cookie-bytes:saved-resources";
const STORAGE_EVENT = "cookie-bytes:saved-resources-changed";

function readSaved(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeSaved(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(STORAGE_EVENT));
}

export function useSavedResources() {
  const [savedIds, setSavedIds] = useState<string[]>(() => readSaved());

  useEffect(() => {
    const sync = () => setSavedIds(readSaved());
    window.addEventListener(STORAGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(STORAGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  const toggleSaved = useCallback((id: string) => {
    const current = readSaved();
    const next = current.includes(id)
      ? current.filter((savedId) => savedId !== id)
      : [...current, id];
    writeSaved(next);
    setSavedIds(next);
  }, []);

  return { savedIds, isSaved, toggleSaved };
}
