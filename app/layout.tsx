import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { CustomCursor } from "@/components/custom-cursor";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Максим Каночкин | Инженер. Новатор. Лидер.",
  description: "Персональный сайт-визитка Максима Каночкина, начальника отдела развития, инноваций и аддитивных технологий на автомобильном заводе ГАЗ.",
  keywords: "Максим Каночкин, инженер, инновации, аддитивные технологии, ГАЗ, автоматизация, роботизация, коллаборативные роботы, компьютерное зрение, искусственный интеллект",
  metadataBase: new URL("https://kanochkinmm.ru"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <CustomCursor />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
