"use client";

import { useState } from "react";
import type { PowerStackItem } from "@/lib/site-content";
import { TechStack } from "@/components/tech-stack";

type PowerStackSectionProps = {
  items: readonly PowerStackItem[];
};

export function PowerStackSection({ items }: PowerStackSectionProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="power-stack">
      {items.map((item) => {
        const isOpen = expanded === item.id;

        return (
          <button
            key={item.id}
            type="button"
            className={`power-item ${isOpen ? "is-open" : ""}`}
            onClick={() => setExpanded(isOpen ? null : item.id)}
            data-hover
          >
            <div className="power-header">
              <span className="power-category">{item.category}</span>
              <h3 className="power-title">{item.title}</h3>
              <span className="power-toggle">{isOpen ? "−" : "+"}</span>
            </div>

            {isOpen && (
              <div className="power-body">
                <p className="hub-text-sm">
                  <strong>Суть:</strong> {item.essence}
                </p>
                <p className="hub-text-sm">
                  <strong>Ключевое решение:</strong> {item.keySolution}
                </p>
                <p className="hub-text-sm power-result">
                  <strong>Результат:</strong> {item.result}
                </p>
                <TechStack technologies={item.stack} />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
