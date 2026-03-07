import { FEATURED_PROJECTS } from "@/lib/site-content";

import { PanelShell } from "./panel-shell";

type ProjectsPanelProps = {
  open: boolean;
  onClose: () => void;
};

export function ProjectsPanel({ open, onClose }: ProjectsPanelProps) {
  return (
    <PanelShell
      open={open}
      onClose={onClose}
      eyebrow="Selected work"
      title="Фокусные направления"
      description="Не перегруженная витрина направлений, которые лучше всего передают мой инженерный профиль и технологический вектор."
    >
      <div className="projects-grid">
        {FEATURED_PROJECTS.map((project) => (
          <article key={project.id} className="project-card">
            <div className="project-card-top">
              <span className="project-category">{project.category}</span>
              <span className="project-role">{project.role}</span>
            </div>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-summary">{project.summary}</p>
            <div className="project-impact">
              <span className="project-impact-label">Эффект</span>
              <p className="project-impact-copy">{project.impact}</p>
            </div>
          </article>
        ))}
      </div>
    </PanelShell>
  );
}
