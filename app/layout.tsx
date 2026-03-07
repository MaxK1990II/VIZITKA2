import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Максим Каночкин | Инженер. Новатор. Лидер.",
  description:
    "Премиальная цифровая визитка Максима Каночкина: инженерия, инновации, робототехника, 3D, AI, проекты и быстрый контакт через vCard и QR.",
  keywords:
    "Максим Каночкин, инженер, инновации, робототехника, аддитивные технологии, 3D, автоматизация, компьютерное зрение, искусственный интеллект, цифровая визитка",
  metadataBase: new URL("https://kanochkinmm.ru"),
  openGraph: {
    title: "Максим Каночкин | Инженер. Новатор. Лидер.",
    description:
      "Премиальная цифровая визитка: портрет, проекты и быстрый контакт в одном интерфейсе.",
    url: "https://kanochkinmm.ru",
    siteName: "KanochkinMM Portfolio",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Максим Каночкин | Инженер. Новатор. Лидер.",
    description:
      "Премиальная цифровая визитка: проекты, инженерный портрет и каналы связи.",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${inter.className} ${inter.variable} ${instrumentSerif.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
