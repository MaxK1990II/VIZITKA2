import type { Metadata } from "next";
import Link from "next/link";
import { SiteDocument } from "@/components/site-document";

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <SiteDocument>
    <div className="not-found">
      <div className="not-found-inner">
        <p className="not-found-code">404</p>
        <h1 className="not-found-title">Страница не найдена</h1>
        <Link href="/" className="not-found-link">
          На главную
        </Link>
      </div>
    </div>
    </SiteDocument>
  );
}
