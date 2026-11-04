import { describe, expect, it } from "vitest";
import { LOCALES, LOCALE_META, localePath } from "@/lib/i18n/locale";
import { getSiteCopy } from "@/lib/i18n/content";
import { buildHomeMetadata, languageAlternates } from "@/lib/page-metadata";
import { PROFILE } from "@/lib/site-content";
import { PROFILE_FACTS } from "@/lib/profile-facts";
import { SITE_ORIGIN } from "@/lib/site-url";
import sitemap from "@/app/sitemap";

describe("static language URLs", () => {
  it("keeps the Russian home and exports every other locale with reciprocal alternates", () => {
    const alternates = languageAlternates();
    const entries = sitemap();
    expect(localePath("ru")).toBe("/");
    expect(alternates["x-default"]).toBe(`${SITE_ORIGIN}/`);
    for (const locale of LOCALES) {
      const url = `${SITE_ORIGIN}${localePath(locale)}`;
      const metadata = buildHomeMetadata(locale);
      expect(metadata.alternates?.canonical).toBe(url);
      expect(metadata.alternates?.languages).toEqual(alternates);
      expect(alternates[LOCALE_META[locale].htmlLang]).toBe(url);
      expect(entries.find((entry) => entry.url === url)?.alternates?.languages).toEqual(alternates);
      expect(metadata.title).toContain(getSiteCopy(locale).name);
    }
    expect(entries).toHaveLength(LOCALES.length + 1);
    expect(new Set(entries.map((entry) => entry.url)).size).toBe(entries.length);
  });

  it("uses translated descriptions instead of copying Russian metadata", () => {
    expect(buildHomeMetadata("en").description).toContain("Head of development");
    expect(buildHomeMetadata("en").description).not.toContain("Начальник");
    expect(buildHomeMetadata("ar").openGraph?.locale).toBe("ar_AR");
  });
});

describe("shared profile facts", () => {
  it("uses the canonical Russian objects and shared project technologies", () => {
    const ru = getSiteCopy("ru");
    expect(ru.projects).toBe(PROFILE.projects);
    expect(ru.bentoDomains).toBe(PROFILE.bentoDomains);
    expect(ru.impactMetrics).toBe(PROFILE.impactMetrics);
    for (const locale of LOCALES) {
      const copy = getSiteCopy(locale);
      expect(copy.impactMetrics[0].value).toBe(String(PROFILE_FACTS.yearsInIndustry));
      expect(copy.aboutShort).toContain(String(PROFILE_FACTS.careerStartYear));
      for (const project of copy.projects) {
        const canonical = PROFILE.projects.find((item) => item.id === project.id)!;
        expect(project.technologies).toBe(canonical.technologies);
        expect(project.powerLevel).toBe(canonical.powerLevel);
      }
    }
  });
});
