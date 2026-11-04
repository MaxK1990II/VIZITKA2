import { CrawlableProfile } from "@/components/crawlable-profile";
import { PersonJsonLd } from "@/components/person-json-ld";
import { PortfolioShell } from "@/components/portfolio-shell";
import { getSiteCopy } from "@/lib/i18n/content";
import type { Locale } from "@/lib/i18n/locale";

export function PortfolioPage({ locale }: { locale: Locale }) {
  const copy = getSiteCopy(locale);
  return (
    <>
      <PersonJsonLd />
      <CrawlableProfile locale={locale} />
      <PortfolioShell locale={locale} copy={copy} />
    </>
  );
}
