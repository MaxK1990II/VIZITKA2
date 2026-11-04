import { SiteDocument } from "@/components/site-document";
import { BASE_METADATA } from "@/lib/page-metadata";

export const metadata = BASE_METADATA;

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <SiteDocument locale="ru">{children}</SiteDocument>;
}
