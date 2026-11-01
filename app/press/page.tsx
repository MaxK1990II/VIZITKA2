import type { Metadata } from "next";
import Link from "next/link";
import { PressJsonLd } from "@/components/press-json-ld";
import { PRESS_ITEMS } from "@/lib/press";
import { SITE_ORIGIN } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Пресса — Максим Каночкин, ЦАТ ГАЗ",
  description:
    "Публикации про Максима Каночкина, Центр аддитивных технологий ГАЗ, промышленный ИИ и роботизацию в цехе. Нижний Новгород.",
  alternates: {
    canonical: `${SITE_ORIGIN}/press`,
  },
  openGraph: {
    title: "Пресса — Максим Каночкин, ЦАТ ГАЗ",
    description:
      "Публикации про ЦАТ ГАЗ, аддитивные технологии и промышленный ИИ.",
    url: `${SITE_ORIGIN}/press`,
    locale: "ru_RU",
    type: "website",
  },
};

export default function PressPage() {
  return (
    <main className="press-page">
      <PressJsonLd />
      <p className="press-kicker">Максим Каночкин · ГАЗ · Нижний Новгород</p>
      <h1 className="press-title">Пресса</h1>
      <p className="press-lead">
        Материалы, где уже есть имя и завод. Сайт — точка входа к человеку,
        не замена этим публикациям.
      </p>

      <ol className="press-list">
        {PRESS_ITEMS.map((item) => (
          <li key={item.id} className="press-item">
            <p className="press-meta">
              {item.source}
              <span aria-hidden="true"> · </span>
              {item.dateLabel}
            </p>
            <h2 className="press-item-title">
              <a href={item.href} rel="noopener noreferrer">
                {item.title}
              </a>
            </h2>
            <blockquote className="press-quote">{item.quote}</blockquote>
          </li>
        ))}
      </ol>

      <p className="press-back">
        <Link href="/">На главную</Link>
      </p>
    </main>
  );
}
