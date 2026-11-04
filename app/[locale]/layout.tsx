import { SiteDocument } from "@/components/site-document";
import { DEFAULT_LOCALE, LOCALES, isLocale } from "@/lib/i18n/locale";
import { BASE_METADATA } from "@/lib/page-metadata";

export const metadata = BASE_METADATA;
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.filter((locale) => locale !== DEFAULT_LOCALE).map((locale) => ({ locale }));
}

export default async function LocalizedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <SiteDocument locale={isLocale(locale) ? locale : DEFAULT_LOCALE}>{children}</SiteDocument>;
}
