import type { ReactNode } from "react";
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
import { LOCALE_META, type Locale } from "@/lib/i18n/locale";
import "@/app/globals.css";

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
  preload: false,
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cjk",
  display: "swap",
});

const notoSansKr = Noto_Sans_KR({
  preload: false,
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-kr",
  display: "swap",
});

const notoSansDeva = Noto_Sans_Devanagari({
  preload: false,
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-deva",
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  preload: false,
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jp",
  display: "swap",
});

const notoSansAr = Noto_Sans_Arabic({
  preload: false,
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ar",
  display: "swap",
});

const languageFonts: Partial<Record<Locale, string>> = {
  zh: notoSansSc.variable,
  ko: notoSansKr.variable,
  hi: notoSansDeva.variable,
  ja: notoSansJp.variable,
  ar: notoSansAr.variable,
};

export function SiteDocument({
  children,
  locale = "ru",
}: Readonly<{ children: ReactNode; locale?: Locale }>) {
  return (
    <html
      lang={LOCALE_META[locale].htmlLang}
      dir={locale === "ar" ? "rtl" : "ltr"}
      data-locale={locale}
    >
      <body
        className={`${inter.variable} ${onest.variable} ${jetbrainsMono.variable} ${languageFonts[locale] ?? ""}`}
      >
        {children}
      </body>
    </html>
  );
}
