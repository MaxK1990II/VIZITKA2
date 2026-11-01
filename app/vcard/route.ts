import { createVCardString } from "@/lib/vcard";

export const dynamic = "force-static";

/** QR / direct link → download contact as .vcf */
export function GET() {  const body = createVCardString();

  return new Response(body, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="maksim-kanochkin.vcf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
