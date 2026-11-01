import { describe, expect, it } from "vitest";
import { PRESS_ITEMS } from "@/lib/press";

describe("press", () => {
  it("pressItems_useHttpsAndNameThePerson", () => {
    expect(PRESS_ITEMS.length).toBeGreaterThanOrEqual(3);
    for (const item of PRESS_ITEMS) {
      expect(item.href.startsWith("https://")).toBe(true);
      expect(item.quote.length).toBeGreaterThan(40);
    }
    expect(PRESS_ITEMS.some((item) => item.href.includes("up-pro.ru"))).toBe(
      true,
    );
    expect(PRESS_ITEMS.some((item) => item.href.includes("dzen.ru"))).toBe(true);
    expect(
      PRESS_ITEMS.some((item) => item.href.includes("autozavod.media")),
    ).toBe(false);
  });
});
