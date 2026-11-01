import type { Metadata } from "next";
import {
  Inter,
  JetBrains_Mono,
  Noto_Sans_Arabic,
  Noto_Sans_Devanagari,
  Noto_Sans_JP,
  Noto_Sans_KR,
  Noto_Sans_SC,
  Onest,
} from "next/font/google";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/seo";
import { SITE_CANONICAL, SITE_ORIGIN } from "@/lib/site-url";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});

const notoSansSc = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cjk",
  display: "swap",
});

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-kr",
  display: "swap",
});

const notoSansDeva = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-deva",
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jp",
  display: "swap",
});

const notoSansAr = Noto_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ar",
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_ORIGIN),
  alternates: {
    canonical: SITE_CANONICAL,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_CANONICAL,
    siteName: "Максим Каночкин",
    locale: "ru_RU",
    type: "profile",
    firstName: "Максим",
    lastName: "Каночкин",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    yandex: "eece29ed47f81791",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body
        className={`${inter.variable} ${onest.variable} ${jetbrainsMono.variable} ${notoSansSc.variable} ${notoSansKr.variable} ${notoSansDeva.variable} ${notoSansJp.variable} ${notoSansAr.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
