import type { Metadata } from "next";
import { getSiteCopy } from "@/lib/i18n/content";
import { LOCALES, LOCALE_META, localePath, type Locale } from "@/lib/i18n/locale";
import { SITE_TITLE, SITE_DESCRIPTION } from "@/lib/seo";
import { buildApexAbsoluteUrl, SITE_ORIGIN } from "@/lib/site-url";

export const BASE_METADATA: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  robots: { index: true, follow: true },
  verification: { yandex: "eece29ed47f81791" },
};

const OG_LOCALES: Record<Locale, string> = {
  ru: "ru_RU", en: "en_US", zh: "zh_CN", ko: "ko_KR", de: "de_DE",
  fr: "fr_FR", hi: "hi_IN", ja: "ja_JP", es: "es_ES", pt: "pt_BR",
  it: "it_IT", tr: "tr_TR", ar: "ar_AR",
};

export function languageAlternates(): Record<string, string> {
  return Object.fromEntries([
    ...LOCALES.map((locale) => [
      LOCALE_META[locale].htmlLang,
      buildApexAbsoluteUrl(localePath(locale)),
    ]),
    ["x-default", buildApexAbsoluteUrl("/")],
  ]);
}

export function buildHomeMetadata(locale: Locale): Metadata {
  const copy = getSiteCopy(locale);
  const title = locale === "ru" ? SITE_TITLE : `${copy.name} — ${copy.heroHeadline}`;
  const description = locale === "ru"
    ? SITE_DESCRIPTION
    : `${copy.introRoleLine}. ${copy.heroTagline}`.replace(/\s+/g, " ").trim();
  const url = buildApexAbsoluteUrl(localePath(locale));

  return {
    ...BASE_METADATA,
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates() },
    openGraph: {
      title,
      description,
      url,
      siteName: copy.name,
      locale: OG_LOCALES[locale],
      alternateLocale: LOCALES.filter((code) => code !== locale).map((code) => OG_LOCALES[code]),
      type: "profile",
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: copy.name }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image.png"] },
  };
}
