"use client";

import { useEffect, useRef, type ReactNode } from "react";

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
  const panelRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    lastActiveRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const getFocusable = () => {
      if (!panelRef.current) {
        return [] as HTMLElement[];
      }
      return Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => !element.hasAttribute("disabled"));
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = getFocusable();
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      lastActiveRef.current?.focus();
    };
  }, [onClose, open]);

  return (
    <div className={`panel-layer ${open ? "is-open" : "is-closed"}`}>
      <button
        type="button"
        className="panel-backdrop"
        aria-label="Закрыть панель"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
      />
      <section
        ref={panelRef}
        className="panel-shell"
        role="dialog"
        aria-modal={open}
        aria-label={title}
      >
        <header className="panel-header">
          <div>
            <p className="panel-eyebrow">{eyebrow}</p>
            <h2 className="panel-title">{title}</h2>
            <p className="panel-description">{description}</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="panel-close panel-close-desktop"
            aria-label="Закрыть"
            onClick={onClose}
            data-hover
            tabIndex={open ? 0 : -1}
          >
            Закрыть
          </button>
        </header>
        <div className="panel-content">{children}</div>
        <div className="panel-mobile-actions">
          <button
            type="button"
            className="panel-close panel-close-mobile"
            aria-label="Закрыть"
            onClick={onClose}
            data-hover
            tabIndex={open ? 0 : -1}
          >
            Закрыть
          </button>
        </div>
      </section>
    </div>
  );
}
