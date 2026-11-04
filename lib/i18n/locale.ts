export const LOCALES = [
  "ru",
  "en",
  "zh",
  "ko",
  "de",
  "fr",
  "hi",
  "ja",
  "es",
  "pt",
  "it",
  "tr",
  "ar",
] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ru";

export const LOCALE_META: Record<
  Locale,
  { label: string; htmlLang: string; nativeName: string }
> = {
  ru: { label: "ru", htmlLang: "ru", nativeName: "Русский" },
  en: { label: "en", htmlLang: "en", nativeName: "English" },
  zh: { label: "中文", htmlLang: "zh-CN", nativeName: "中文" },
  ko: { label: "한", htmlLang: "ko", nativeName: "한국어" },
  de: { label: "de", htmlLang: "de", nativeName: "Deutsch" },
  fr: { label: "fr", htmlLang: "fr", nativeName: "Français" },
  hi: { label: "हिं", htmlLang: "hi", nativeName: "हिन्दी" },
  ja: { label: "日", htmlLang: "ja", nativeName: "日本語" },
  es: { label: "es", htmlLang: "es", nativeName: "Español" },
  pt: { label: "pt", htmlLang: "pt-BR", nativeName: "Português" },
  it: { label: "it", htmlLang: "it", nativeName: "Italiano" },
  tr: { label: "tr", htmlLang: "tr", nativeName: "Türkçe" },
  ar: { label: "ع", htmlLang: "ar", nativeName: "العربية" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && LOCALES.includes(value as Locale);
}

/** Russian keeps the existing canonical home URL. */
export function localePath(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "/" : `/${locale}/`;
}
