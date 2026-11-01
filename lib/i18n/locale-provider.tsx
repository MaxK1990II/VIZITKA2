"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getSiteCopy, type SiteCopy } from "@/lib/i18n/content";
import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_META,
  LOCALE_STORAGE_KEY,
  type Locale,
} from "@/lib/i18n/locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  copy: SiteCopy;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  try {
    const raw = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(raw)) return raw;
  } catch {
    // private mode / blocked storage
  }
  return DEFAULT_LOCALE;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLocaleState(readStoredLocale());
    setHydrated(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.lang = LOCALE_META[locale].htmlLang;
    document.documentElement.dataset.locale = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [hydrated, locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      copy: getSiteCopy(locale),
    }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
