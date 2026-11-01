import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/site-url";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/portfolio-survey.html"],
    },
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: SITE_ORIGIN,
  };
}
