import { CrawlableProfile } from "@/components/crawlable-profile";
import { PersonJsonLd } from "@/components/person-json-ld";
import { PortfolioShell } from "@/components/portfolio-shell";

export default function Home() {
  return (
    <>
      <PersonJsonLd />
      <CrawlableProfile />
      <PortfolioShell />
    </>
  );
}
