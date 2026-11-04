import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { PortfolioDetailsCopy } from "@/lib/i18n/portfolio-details";
import { PRESS_ITEMS } from "@/lib/press";
import styles from "./press-highlights.module.css";

const featured = [
  { item: PRESS_ITEMS[0], image: "/images/press/cat-center.webp", credit: "Фото: журнал «Время машин»" },
  { item: PRESS_ITEMS[2], image: "/images/press/gaz-robots.webp", credit: "Фото: «Автозавод NN» / «За рулём»" },
  { item: PRESS_ITEMS[4], image: "/images/press/pravda-career.webp", credit: "Страница «Нижегородской правды»" },
];

export function PressHighlights({ copy }: { copy: PortfolioDetailsCopy["press"] }) {
  return <section id="publications" className={styles.press} aria-labelledby="publications-title" tabIndex={-1}>
    <div className={styles.pressHeader}>
      <div><p className={styles.eyebrow}>{copy.eyebrow}</p><h2 id="publications-title">{copy.title}</h2><p className={styles.description}>{copy.description}</p></div>
      <Link href="/press/" prefetch={false} className={styles.allPress} data-analytics-event="press_open">{copy.all}<ArrowUpRight size={18} aria-hidden="true" /></Link>
    </div>
    <div className={styles.feed} role="group" aria-labelledby="publications-title" tabIndex={0}>
      {featured.map(({ item, image, credit }) => <article key={item.id} className={styles.card}>
        <a href={item.href} className={styles.cardLink} target="_blank" rel="noopener noreferrer"
          data-analytics-event="press_open" aria-labelledby={`press-source-${item.id} press-title-${item.id}`}>
          {/* Local preview assets work on static hosting without an image service. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.preview} src={image} width={960} height={600} alt="" loading="lazy" decoding="async" />
          <span className={styles.credit} lang="ru" dir="auto">{credit}</span>
          <div className={styles.cardBody}>
            <p id={`press-source-${item.id}`} className={styles.source} lang="ru" dir="auto">
              {item.source}<span>{item.dateLabel}</span>
            </p>
            <h3 id={`press-title-${item.id}`} lang="ru" dir="auto">{item.title}</h3>
            <span className={styles.readArticle}>{copy.readArticle}<ArrowUpRight size={17} aria-hidden="true" /></span>
          </div>
        </a>
      </article>)}
    </div>
  </section>;
}
