import { afterEach, describe, expect, it, vi } from "vitest";
import { createAnalyticsEvent, parseMetrikaId } from "@/lib/analytics";

afterEach(() => {
  document.querySelectorAll('script[src="https://mc.yandex.ru/metrika/tag.js"]').forEach((script) => script.remove());
  delete window.ym;
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("analytics input boundaries", () => {
  it("requires a real positive integer counter ID", () => {
    for (const invalid of [undefined, "", "0", "-1", "1.5", "1e5", "YOUR_ID", "9007199254740992"]) {
      expect(parseMetrikaId(invalid)).toBeNull();
    }
    expect(parseMetrikaId(" 12345678 ")).toBe(12345678);
  });

  it("rejects unknown events, languages, channels and depth thresholds", () => {
    expect(createAnalyticsEvent("mailto:user@example.com", "ru")).toBeNull();
    expect(createAnalyticsEvent("demo_launch", "unknown")).toBeNull();
    expect(createAnalyticsEvent("contact_click", "ru", { channel: "mailto:user@example.com" })).toBeNull();
    expect(createAnalyticsEvent("contact_click", "ru")).toBeNull();
    expect(createAnalyticsEvent("scroll_depth", "ru", { threshold: "50" })).toBeNull();
    expect(createAnalyticsEvent("scroll_depth", "ru", { threshold: 60 })).toBeNull();
  });

  it("constructs payloads instead of forwarding arbitrary details", () => {
    const details = { channel: "telegram", threshold: 50, url: "https://example.com/?private=yes", name: "private" };
    expect(createAnalyticsEvent("contact_click", "ru", details)).toEqual({
      event: "contact_click", locale: "ru", channel: "telegram",
    });
    expect(createAnalyticsEvent("demo_launch", "en", details)).toEqual({ event: "demo_launch", locale: "en" });
    expect(createAnalyticsEvent("scroll_depth", "ru", details)).toEqual({ event: "scroll_depth", locale: "ru", threshold: 50 });
  });
});

describe("optional Metrika runtime", () => {
  it("does not create a script, queue or calls when the ID is absent or invalid", async () => {
    vi.resetModules();
    const { ensurePortfolioAnalytics, trackPortfolioEvent } = await import("@/lib/analytics");
    for (const value of ["", "not-a-counter", "0"]) {
      vi.stubEnv("NEXT_PUBLIC_YANDEX_METRIKA_ID", value);
      expect(ensurePortfolioAnalytics("ru")).toBe(false);
      trackPortfolioEvent("profile_open", "ru");
    }
    expect(window.ym).toBeUndefined();
    expect(document.querySelector('script[src*="metrika"]')).toBeNull();
  });

  it.each([{ doNotTrack: "1" }, { globalPrivacyControl: true }])("honors the browser privacy preference %j", async (preference) => {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_YANDEX_METRIKA_ID", "12345678");
    vi.stubGlobal("navigator", preference);
    const { ensurePortfolioAnalytics } = await import("@/lib/analytics");
    expect(ensurePortfolioAnalytics("ru")).toBe(false);
    expect(window.ym).toBeUndefined();
    expect(document.querySelector('script[src*="metrika"]')).toBeNull();
  });

  it("initializes once, sends canonical paths and deduplicates automatic events per page", async () => {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_YANDEX_METRIKA_ID", "12345678");
    const { ensurePortfolioAnalytics, trackPortfolioEvent } = await import("@/lib/analytics");
    window.history.replaceState(null, "", "/?private=secret#profile");
    document.title = "private title";
    ensurePortfolioAnalytics("ru");
    ensurePortfolioAnalytics("ru");
    trackPortfolioEvent("profile_open", "ru");
    trackPortfolioEvent("profile_open", "ru");
    trackPortfolioEvent("scroll_depth", "ru", { threshold: 50 });
    trackPortfolioEvent("scroll_depth", "ru", { threshold: 50 });
    const queued = window.ym!.a!;
    expect(document.querySelectorAll('script[src*="metrika"]')).toHaveLength(1);
    expect(queued.filter((call) => call[1] === "init")).toEqual([[12345678, "init", expect.objectContaining({
      defer: true, webvisor: false, clickmap: false, trackLinks: false, disableYtm: true, sendTitle: false,
    })]]);
    expect(queued.filter((call) => call[1] === "hit")).toEqual([
      [12345678, "hit", "/", { title: "Portfolio", referer: "", params: { locale: "ru" } }],
    ]);
    expect(queued.filter((call) => call[2] === "profile_open")).toHaveLength(1);
    expect(queued.filter((call) => call[2] === "scroll_depth")).toHaveLength(1);
    expect(JSON.stringify(queued)).not.toContain("private");

    ensurePortfolioAnalytics("en");
    trackPortfolioEvent("profile_open", "en");
    expect(queued.filter((call) => call[1] === "init")).toHaveLength(1);
    expect(queued.filter((call) => call[1] === "hit")).toHaveLength(2);
    expect(queued.filter((call) => call[2] === "profile_open")).toHaveLength(2);
    window.history.replaceState(null, "", "/");
  });

  it("does not let a failing third-party API break visitor actions", async () => {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_YANDEX_METRIKA_ID", "12345678");
    window.ym = () => { throw new Error("blocked"); };
    const { trackPortfolioEvent } = await import("@/lib/analytics");
    expect(() => trackPortfolioEvent("contact_click", "ru", { channel: "email" })).not.toThrow();
  });
});
