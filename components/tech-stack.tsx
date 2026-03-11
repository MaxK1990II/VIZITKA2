"use client";

import { useState } from "react";

type TechStackProps = {
  technologies: readonly string[];
};

export function TechStack({ technologies }: TechStackProps) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="tech-stack">
      {technologies.map((tech) => (
        <span
          key={tech}
          className={`tech-badge ${active && active !== tech ? "is-dimmed" : ""} ${active === tech ? "is-active" : ""}`}
          onMouseEnter={() => setActive(tech)}
          onMouseLeave={() => setActive(null)}
        >
          {tech}
        </span>
      ))}
    </div>
  );
}
