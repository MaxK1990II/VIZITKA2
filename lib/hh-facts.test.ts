import { describe, expect, it } from "vitest";
import { getSiteCopy } from "@/lib/i18n/content";
import { LOCALES } from "@/lib/i18n/locale";
import { PROFILE } from "@/lib/site-content";

describe("hhFacts_onSiteCopy", () => {
  it("allLocales_useThirteenYearsAndCareerStart2013", () => {
    for (const locale of LOCALES) {
      const copy = getSiteCopy(locale);
      expect(copy.impactMetrics[0].value, locale).toBe("13");
      expect(copy.aboutShort, locale).toContain("2013");
    }
  });

  it("russianCopy_keepsOfficialGazTitleAndCatNumbers", () => {
    const ru = getSiteCopy("ru");
    expect(ru.aboutShort).toContain(
      "начальника отдела развития, инноваций и аддитивных технологий",
    );
    expect(ru.projects.find((project) => project.id === "cat")?.result).toContain(
      "50+",
    );
    expect(ru.bentoDomains.find((domain) => domain.id === "robotics")?.description).toContain(
      "100+",
    );
  });

  it("profileFallback_matchesRussianCareerFacts", () => {
    expect(PROFILE.aboutShort).toContain("2013");
    expect(PROFILE.impactMetrics[0].value).toBe("13");
  });
});
