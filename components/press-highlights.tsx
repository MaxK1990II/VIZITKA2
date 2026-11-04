import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { PortfolioDetailsCopy } from "@/lib/i18n/portfolio-details";
import { PRESS_ITEMS } from "@/lib/press";
import styles from "./portfolio-details.module.css";

const featured = [PRESS_ITEMS[0], PRESS_ITEMS[3], PRESS_ITEMS[4]];

export function PressHighlights({ copy }: { copy: PortfolioDetailsCopy["press"] }) {
  return <section id="publications" className={styles.press} aria-labelledby="publications-title" tabIndex={-1}>
    <div className={styles.pressHeader}>
      <div><p className={styles.eyebrow}>{copy.eyebrow}</p><h2 id="publications-title">{copy.title}</h2><p className={styles.description}>{copy.description}</p></div>
      <Link href="/press/" prefetch={false} className={styles.allPress} data-analytics-event="press_open">{copy.all}<ArrowUpRight size={18} aria-hidden="true" /></Link>
    </div>
    <div className={styles.pressGrid}>
      {featured.map(item => <article key={item.id} className={styles.pressItem}>
        <p className={styles.pressSource} lang="ru">{item.source} <span>{item.dateLabel}</span></p>
        <h3 lang="ru">{item.title}</h3>
        <a href={item.href} target="_blank" rel="noopener noreferrer" data-analytics-event="press_open">{copy.readArticle}<ArrowUpRight size={16} aria-hidden="true" /></a>
      </article>)}
    </div>
  </section>;
}
