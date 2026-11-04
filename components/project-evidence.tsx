import type { PortfolioDetailsCopy } from "@/lib/i18n/portfolio-details";
import styles from "./portfolio-details.module.css";

export function ProjectEvidence({ evidence, labels }: {
  evidence: PortfolioDetailsCopy["projectEvidence"][keyof PortfolioDetailsCopy["projectEvidence"]];
  labels: PortfolioDetailsCopy["projectLabels"];
}) {
  return <div className={styles.evidence}>
    <dl>
      <div><dt>{labels.status}</dt><dd>{evidence.status}</dd></div>
      <div><dt>{labels.role}</dt><dd>{evidence.role}</dd></div>
      {evidence.period ? <div><dt>{labels.period}</dt><dd>{evidence.period}</dd></div> : null}
    </dl>
    {evidence.sourceUrl ? <a href={evidence.sourceUrl} target={evidence.sourceUrl.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" data-analytics-event="project_source">{evidence.sourceLabel || labels.evidence} ↗</a> : null}
  </div>;
}
