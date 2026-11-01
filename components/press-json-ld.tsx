import { buildPressCollectionJsonLd, serializeJsonLd } from "@/lib/seo";

export function PressJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildPressCollectionJsonLd()) }}
    />
  );
}
