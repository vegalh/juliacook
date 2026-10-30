import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "cookie-bytes:reflections";
const STORAGE_EVENT = "cookie-bytes:reflections-changed";

export interface Reflection {
  /** The parenting situation this reflection was written for. */
  topicSlug: string;
  /** Free-text note written by the parent. No child name or other PII is collected or required. */
  note: string;
  savedAt: string;
}

function readReflections(): Reflection[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Reflection[]) : [];
  } catch {
    return [];
  }
}

function writeReflections(reflections: Reflection[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reflections));
  window.dispatchEvent(new Event(STORAGE_EVENT));
}

/**
 * Local-only reflection journal. Everything is stored in the browser's
 * localStorage and never transmitted anywhere — there is no backend for this
 * prototype. Parents are not asked for (and the data model has no field for)
 * their child's name or any other identifying information.
 */
export function useReflections() {
  const [reflections, setReflections] = useState<Reflection[]>(() => readReflections());

  useEffect(() => {
    const sync = () => setReflections(readReflections());
    window.addEventListener(STORAGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(STORAGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const reflectionsForTopic = useCallback(
    (topicSlug: string) => reflections.filter((r) => r.topicSlug === topicSlug),
    [reflections]
  );

  const saveReflection = useCallback((topicSlug: string, note: string) => {
    const trimmed = note.trim();
    if (!trimmed) return;
    const next = [...readReflections(), { topicSlug, note: trimmed, savedAt: new Date().toISOString() }];
    writeReflections(next);
    setReflections(next);
  }, []);

  return { reflections, reflectionsForTopic, saveReflection };
}
