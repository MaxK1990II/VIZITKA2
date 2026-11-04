import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { SITE_ORIGIN } from "@/lib/site-url";

describe("sitemap", () => {
  it("sitemap_listsHomeAndPress", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(`${SITE_ORIGIN}/`);
    expect(urls).toContain(`${SITE_ORIGIN}/press/`);
  });
});
