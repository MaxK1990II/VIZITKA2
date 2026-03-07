import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Максим Каночкин | Инженер. Новатор. Лидер.",
  description:
    "Премиальная цифровая визитка Максима Каночкина: инженерия, инновации, робототехника, 3D, AI, проекты и быстрый контакт через vCard и QR.",
  keywords:
    "Максим Каночкин, инженер, инновации, робототехника, аддитивные технологии, 3D, автоматизация, компьютерное зрение, искусственный интеллект, цифровая визитка",
  metadataBase: new URL("https://kanochkinmm.ru"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className} style={{ cursor: "default" }}>{children}</body>
    </html>
  );
}
