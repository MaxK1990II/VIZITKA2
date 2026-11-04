import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import type { CatCaseStudyCopy } from "@/lib/i18n/portfolio-details";
import styles from "./cat-case-study.module.css";

export function CatCaseStudy({ copy }: { copy: CatCaseStudyCopy }) {
  return (
    <section id="cat-case" tabIndex={-1} className={styles.caseStudy} aria-labelledby="cat-case-title">
      <div className={styles.overview}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h2 id="cat-case-title" className={styles.title}>{copy.title}</h2>
          <p className={styles.lead}>{copy.lead}</p>
        </header>
        <figure className={styles.photo}>
          <div className={styles.photoFrame}>
            <Image
              src="/images/press/cat-center.webp"
              alt={copy.imageAlt}
              fill
              sizes="(max-width: 800px) 100vw, 40vw"
              className={styles.photoImage}
            />
          </div>
          <figcaption><bdi>{copy.photoCredit}</bdi></figcaption>
        </figure>
      </div>

      <dl className={styles.metrics}>
        {copy.metrics.map((metric) => (
          <div key={metric.label}>
            <dt>{metric.label}</dt>
            <dd>{metric.value}</dd>
          </div>
        ))}
      </dl>

      <div className={styles.controls}>
        <details className={styles.details}>
          <summary className={styles.summary}>
            <span>{copy.detailsSummary}</span>
            <ChevronDown size={17} aria-hidden="true" />
          </summary>
          <div className={styles.story}>
            <ol className={styles.timeline}>
              {copy.timeline.map((step) => (
                <li key={step.year}>
                  <span className={styles.year}>{step.year}</span>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
            <div className={styles.chapters}>
              {copy.chapters.map((chapter, index) => (
                <article key={chapter.title} className={styles.chapter}>
                  <span className={styles.chapterNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{chapter.title}</h3>
                    <p>{chapter.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <p className={styles.sourceNote}>{copy.sourceNote}</p>
        </details>
        <footer className={styles.footer}>
          <a href={copy.sourceUrl} target="_blank" rel="noopener noreferrer" data-analytics-event="project_source">
            <span>{copy.sourceLabel}</span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </footer>
      </div>
    </section>
  );
}
