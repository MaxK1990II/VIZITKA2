import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Максим Каночкин | Technology Portfolio",
  description:
    "Персональный сайт-визитка: Industrial AI, Robotics, Additive Manufacturing, Engineering Expertise.",
  keywords:
    "Максим Каночкин, инженер, инновации, аддитивные технологии, ГАЗ, роботизация, коботы, компьютерное зрение, ИИ",
  metadataBase: new URL("https://kanochkinmm.ru"),
  openGraph: {
    title: "Максим Каночкин | Technology Portfolio",
    description:
      "Industrial AI, Robotics, Additive Tech & Engineering Expertise в одной технологичной визитке.",
    url: "https://kanochkinmm.ru",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
