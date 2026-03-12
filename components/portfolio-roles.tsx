"use client";

import { useEffect, useMemo, useState } from "react";

type PortfolioRolesProps = {
  roles: readonly string[];
  visibleCount: 1 | 2 | 3;
  compact?: boolean;
};

type RoleState = {
  current: string;
  upcoming: string;
  phase: "idle" | "out" | "in";
};

const ROLE_OUT_MS = 220;
const ROLE_IN_MS = 240;

export function PortfolioRoles({
  roles,
  visibleCount,
  compact = false,
}: PortfolioRolesProps) {
  const [items, setItems] = useState<RoleState[]>(() => {
    const initial: string[] = [];
    for (let i = 0; i < 3; i++) {
      const candidates = roles.filter((r) => !initial.includes(r));
      initial.push(
        candidates[Math.floor(Math.random() * candidates.length)] ?? roles[i % roles.length]
      );
    }
    return initial.map((r) => ({ current: r, upcoming: r, phase: "idle" as const }));
  });

  useEffect(() => {
    const ranges = [
      { min: 3200, max: 5200 },
      { min: 3900, max: 6600 },
      { min: 3500, max: 6200 },
    ];

    const timers: number[] = [];

    const schedule = (index: number) => {
      const timeout = window.setTimeout(() => {
        setItems((prev) => {
          const othersVisible = prev
            .filter((_, i) => i !== index)
            .map((item) =>
              item.phase === "out" ? item.upcoming : item.current
            );
          const excluded = new Set([prev[index].current, ...othersVisible]);
          const candidates = roles.filter((r) => !excluded.has(r));
          const next =
            candidates[Math.floor(Math.random() * candidates.length)] ??
            roles.filter((r) => r !== prev[index].current)[
              Math.floor(
                Math.random() *
                  roles.filter((r) => r !== prev[index].current).length
              )
            ] ??
            prev[index].current;

          return prev.map((item, i) =>
            i === index
              ? { ...item, phase: "out" as const, upcoming: next }
              : item
          );
        });

        const outTimer = window.setTimeout(() => {
          setItems((prev) =>
            prev.map((item, itemIndex) =>
              itemIndex === index
                ? {
                    current: item.upcoming,
                    upcoming: item.upcoming,
                    phase: "in",
                  }
                : item
            )
          );

          const inTimer = window.setTimeout(() => {
            setItems((prev) =>
              prev.map((item, itemIndex) =>
                itemIndex === index ? { ...item, phase: "idle" } : item
              )
            );
            schedule(index);
          }, ROLE_IN_MS);

          timers.push(inTimer);
        }, ROLE_OUT_MS);

        timers.push(outTimer);
      }, ranges[index].min + Math.random() * (ranges[index].max - ranges[index].min));

      timers.push(timeout);
    };

    schedule(0);
    schedule(1);
    schedule(2);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [roles]);

  const visibleItems = useMemo(
    () => items.slice(0, visibleCount),
    [items, visibleCount]
  );

  return (
    <div className={`roles-row ${compact ? "is-compact" : ""}`}>
      {visibleItems.map((item, index) => (
        <div key={`${item.current}-${index}`} className="roles-chip">
          <div className="roles-track">
            <span
              className={`roles-word roles-word-current ${
                item.phase === "out" ? "is-out" : ""
              }`}
            >
              {item.current}
            </span>
            <span
              className={`roles-word roles-word-upcoming ${
                item.phase === "in" ? "is-in" : ""
              }`}
            >
              {item.upcoming}
            </span>
          </div>
          {index < visibleItems.length - 1 ? (
            <span className="roles-divider" aria-hidden="true" />
          ) : null}
        </div>
      ))}
    </div>
  );
}
