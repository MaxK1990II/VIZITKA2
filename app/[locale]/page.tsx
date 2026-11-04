import { notFound } from "next/navigation";
import { PortfolioPage } from "@/components/portfolio-page";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n/locale";
import { buildHomeMetadata } from "@/lib/page-metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === DEFAULT_LOCALE) notFound();
  return buildHomeMetadata(locale);
}

export default async function LocalizedHome({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === DEFAULT_LOCALE) notFound();
  return <PortfolioPage locale={locale} />;
}
