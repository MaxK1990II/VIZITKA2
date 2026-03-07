"use client";

import { useEffect, type ReactNode } from "react";

type PanelShellProps = {
  open: boolean;
  eyebrow: string;
  title: string;
  description: string;
  onClose: () => void;
  children: ReactNode;
};

export function PanelShell({
  open,
  eyebrow,
  title,
  description,
  onClose,
  children,
}: PanelShellProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div className="panel-layer" aria-hidden={!open}>
      <button
        type="button"
        className="panel-backdrop"
        aria-label="Закрыть панель"
        onClick={onClose}
      />
      <section
        className="panel-shell"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <header className="panel-header">
          <div>
            <p className="panel-eyebrow">{eyebrow}</p>
            <h2 className="panel-title">{title}</h2>
            <p className="panel-description">{description}</p>
          </div>
          <button
            type="button"
            className="panel-close"
            aria-label="Закрыть"
            onClick={onClose}
            data-hover
          >
            Закрыть
          </button>
        </header>
        <div className="panel-content">{children}</div>
      </section>
    </div>
  );
}
