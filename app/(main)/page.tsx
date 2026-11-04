import { PortfolioPage } from "@/components/portfolio-page";
import { buildHomeMetadata } from "@/lib/page-metadata";

export const metadata = buildHomeMetadata("ru");

export default function Home() {
  return <PortfolioPage locale="ru" />;
}
