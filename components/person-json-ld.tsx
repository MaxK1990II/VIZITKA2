import { buildPersonJsonLd, serializeJsonLd } from "@/lib/seo";

export function PersonJsonLd() {
  const jsonLd = buildPersonJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
    />
  );
}
