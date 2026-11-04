"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import type { SiteCopy } from "@/lib/i18n/content";
import type { Locale } from "@/lib/i18n/locale";

type LocaleContextValue = {
  locale: Locale;
  copy: SiteCopy;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

/** The URL and server-rendered copy are authoritative, including on first load. */
export function LocaleProvider({
  children,
  locale,
  copy,
}: LocaleContextValue & { children: ReactNode }) {
  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      copy,
    }),
    [locale, copy],
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
