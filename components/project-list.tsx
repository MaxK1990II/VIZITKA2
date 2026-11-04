import type { SiteCopy } from "@/lib/i18n/content";
import styles from "./project-list.module.css";

export function ProjectList({ copy }: { copy: SiteCopy }) {
  const labels = copy.details.projectLabels;
  return <section id="projects" className={styles.projects} tabIndex={-1} aria-labelledby="projects-title">
    <h2 id="projects-title" className={styles.heading}>{copy.bentoProjectsTitle}</h2>
    <div className={styles.list}>
      {copy.projects.map(project => {
        const evidence = copy.details.projectEvidence[project.id as keyof typeof copy.details.projectEvidence];
        return <article key={project.id} className={styles.project}>
          <header>
            <p className={styles.category}>{project.category}</p>
            <h3>{project.title}</h3>
            <ul className={styles.technologies} aria-label={project.category}>
              {project.technologies.map(technology => <li key={technology}>{technology}</li>)}
            </ul>
          </header>
          <div className={styles.description}>
            <p>{project.summary}</p>
            <p className={styles.result}>{project.result}</p>
            {evidence.sourceUrl ? <a href={evidence.sourceUrl} target="_blank" rel="noopener noreferrer" data-analytics-event="project_source">{evidence.sourceLabel || labels.evidence} ↗</a> : null}
          </div>
          <dl className={styles.facts}>
            <div><dt>{labels.status}</dt><dd>{evidence.status}</dd></div>
            <div><dt>{labels.role}</dt><dd>{evidence.role}</dd></div>
            {evidence.period ? <div><dt>{labels.period}</dt><dd>{evidence.period}</dd></div> : null}
          </dl>
        </article>;
      })}
    </div>
  </section>;
}
