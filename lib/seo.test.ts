import { describe, expect, it } from "vitest";
import {
  buildPersonJsonLd,
  buildPressCollectionJsonLd,
  serializeJsonLd,
  SITE_DESCRIPTION,
  SITE_TITLE,
} from "@/lib/seo";
import { buildApexAbsoluteUrl, SITE_CANONICAL, SITE_ORIGIN } from "@/lib/site-url";

describe("seo", () => {
  it("siteOrigin_isApexHttps", () => {
    expect(SITE_ORIGIN).toBe("https://kanochkinmm.ru");
    expect(SITE_CANONICAL).toBe("https://kanochkinmm.ru/");
    expect(buildApexAbsoluteUrl("/")).toBe("https://kanochkinmm.ru/");
    expect(buildApexAbsoluteUrl("/press")).toBe("https://kanochkinmm.ru/press");
    expect(buildApexAbsoluteUrl("/press", "?q=1")).toBe(
      "https://kanochkinmm.ru/press?q=1",
    );
  });

  it("siteTitle_includesGazAndCity", () => {
    expect(SITE_TITLE).toContain("ГАЗ");
    expect(SITE_TITLE).toContain("Нижний Новгород");
    expect(SITE_TITLE.toLowerCase()).not.toContain("визитка");
    expect(SITE_TITLE.toLowerCase()).not.toContain("technology portfolio");
  });

  it("siteDescription_includesGazAndDoesNotSayVizitka", () => {
    expect(SITE_DESCRIPTION).toContain("ГАЗ");
    expect(SITE_DESCRIPTION.toLowerCase()).not.toContain("визитка");
  });

  it("buildPersonJsonLd_usesPersonalEmailAndApex", () => {
    const jsonLd = buildPersonJsonLd();
    expect(jsonLd["@type"]).toBe("Person");
    expect(jsonLd.name).toBe("Максим Каночкин");
    expect(jsonLd.worksFor.name).toContain("ГАЗ");
    expect(jsonLd.email).toBe("maxi.k@mail.ru");
    expect(jsonLd.url).toBe(SITE_CANONICAL);
    expect(jsonLd.sameAs).toContain("https://github.com/MaxK1990II");
    expect(jsonLd.sameAs).toContain("https://t.me/MaxSames");
    expect(jsonLd.subjectOf.some((item) => item.url.includes("up-pro.ru"))).toBe(
      true,
    );
  });

  it("buildPressCollectionJsonLd_pointsToPressUrl", () => {
    const jsonLd = buildPressCollectionJsonLd();
    expect(jsonLd["@type"]).toBe("CollectionPage");
    expect(jsonLd.url).toBe(`${SITE_ORIGIN}/press/`);
    expect(jsonLd.mainEntity.itemListElement.length).toBeGreaterThanOrEqual(3);
  });

  it("serializeJsonLd_escapesLessThan", () => {
    expect(serializeJsonLd({ note: "<script>" })).toBe(
      '{"note":"\\u003cscript>"}',
    );
  });
});
