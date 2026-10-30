import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { locales, translations, type Locale, type TranslationDictionary } from "./translations";

const STORAGE_KEY = "cookie-bytes:locale";
const DEFAULT_LOCALE: Locale = "zh";

function readStoredLocale(): Locale {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw && locales.includes(raw as Locale)) return raw as Locale;
  } catch {
    // localStorage unavailable (e.g. private browsing) — fall back to default.
  }
  return DEFAULT_LOCALE;
}

type DotPaths<T> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends string ? K : `${K}.${DotPaths<T[K]>}`;
    }[keyof T & string]
  : never;

export type TranslationKey = DotPaths<TranslationDictionary>;

function resolvePath(dict: TranslationDictionary, path: string): string {
  const value = path.split(".").reduce<unknown>((acc, segment) => {
    if (acc && typeof acc === "object" && segment in acc) {
      return (acc as Record<string, unknown>)[segment];
    }
    return undefined;
  }, dict);
  return typeof value === "string" ? value : path;
}

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Translates a dotted key (e.g. "nav.home") with optional `{param}` interpolation. */
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => readStoredLocale());

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage failures; the selection still applies for this session.
    }
  }, []);

  const t = useCallback<LocaleContextValue["t"]>(
    (key, params) => {
      const template = resolvePath(translations[locale], key);
      if (!params) return template;
      return Object.entries(params).reduce(
        (result, [name, value]) => result.replaceAll(`{${name}}`, String(value)),
        template
      );
    },
    [locale]
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within a LocaleProvider");
  return ctx;
}
