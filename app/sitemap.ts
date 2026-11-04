import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/site-url";
import { LOCALES, localePath } from "@/lib/i18n/locale";
import { languageAlternates } from "@/lib/page-metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...LOCALES.map((locale) => ({
      url: `${SITE_ORIGIN}${localePath(locale)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: locale === "ru" ? 1 : 0.8,
      alternates: { languages: languageAlternates() },
    })),
    {
      url: `${SITE_ORIGIN}/press/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
