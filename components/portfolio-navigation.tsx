"use client";

import type { PortfolioDetailsCopy } from "@/lib/i18n/portfolio-details";
import styles from "./portfolio-details.module.css";

export function PortfolioNavigation({ copy }: { copy: PortfolioDetailsCopy["nav"] }) {
  return <nav className={styles.navigation} aria-label={copy.label}>
    {[["projects", copy.projects], ["cobot-demo", copy.demo], ["about", copy.about], ["contact", copy.contact]].map(([id, label]) => (
      <a key={id} href={`#${id}`} data-analytics-event="navigation_click">{label}</a>
    ))}
  </nav>;
}
