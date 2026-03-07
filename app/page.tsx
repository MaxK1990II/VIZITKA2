"use client";

import { ContactPanel } from "@/components/contact-panel";
import { CustomCursor } from "@/components/custom-cursor";
import { PortraitPanel } from "@/components/portrait-panel";
import { ProjectsPanel } from "@/components/projects-panel";
import { UniverseBackgroundThree } from "@/components/universe-background-three";
import { usePointerCapability } from "@/hooks/use-pointer-capability";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { HERO_ACTIONS, HERO_NAME, HERO_ROLES } from "@/lib/site-content";

type PanelId = "contacts" | "projects" | "portrait" | null;
type RoleSlot = {
  current: string;
  upcoming: string;
  phase: "idle" | "out" | "in";
};
const ROLE_OUT_MS = 230;
const ROLE_IN_MS = 250;

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activePanel, setActivePanel] = useState<PanelId>(null);
  const supportsFinePointer = usePointerCapability();

  useEffect(() => {
    if (!supportsFinePointer) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [supportsFinePointer]);

  const [roleSlots, setRoleSlots] = useState<RoleSlot[]>(() => [
    { current: HERO_ROLES[0], upcoming: HERO_ROLES[0], phase: "idle" },
    { current: HERO_ROLES[1], upcoming: HERO_ROLES[1], phase: "idle" },
    { current: HERO_ROLES[2], upcoming: HERO_ROLES[2], phase: "idle" },
  ]);

  const [showRolesCount, setShowRolesCount] = useState(3);
  useEffect(() => {
    const updateRolesCount = () => {
      if (window.innerWidth < 480) {
        setShowRolesCount(1);
      } else if (window.innerWidth < 768) {
        setShowRolesCount(2);
      } else {
        setShowRolesCount(3);
      }
    };

    updateRolesCount();
    window.addEventListener("resize", updateRolesCount);
    return () => window.removeEventListener("resize", updateRolesCount);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activePanel ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [activePanel]);

  const getRandomRole = useCallback((currentRole: string) => {
    const availableRoles = HERO_ROLES.filter((role) => role !== currentRole);
    return availableRoles[Math.floor(Math.random() * availableRoles.length)];
  }, []);

  const setSlotPhase = useCallback((slotIndex: number, phase: RoleSlot["phase"]) => {
    setRoleSlots((prev) =>
      prev.map((slot, index) => (index === slotIndex ? { ...slot, phase } : slot))
    );
  }, []);

  useEffect(() => {
    const outTimers: number[] = [];
    const inTimers: number[] = [];
    const loopTimers: number[] = [];
    const ranges = [
      { min: 3200, max: 5200 },
      { min: 3800, max: 6800 },
      { min: 3500, max: 6100 },
    ];

    const runSlot = (slotIndex: number) => {
      const loop = window.setTimeout(
        () => {
          setRoleSlots((prev) =>
            prev.map((slot, index) =>
              index === slotIndex
                ? {
                    ...slot,
                    upcoming: getRandomRole(slot.current),
                    phase: "out",
                  }
                : slot
            )
          );

          const outTimer = window.setTimeout(() => {
            setRoleSlots((prev) =>
              prev.map((slot, index) =>
                index === slotIndex
                  ? {
                      current: slot.upcoming,
                      upcoming: slot.upcoming,
                      phase: "in",
                    }
                  : slot
              )
            );

            const inTimer = window.setTimeout(() => {
              setSlotPhase(slotIndex, "idle");
              runSlot(slotIndex);
            }, ROLE_IN_MS);

            inTimers.push(inTimer);
          }, ROLE_OUT_MS);

          outTimers.push(outTimer);
        },
        ranges[slotIndex].min +
          Math.random() * (ranges[slotIndex].max - ranges[slotIndex].min)
      );

      loopTimers.push(loop);
    };

    runSlot(0);
    runSlot(1);
    runSlot(2);

    return () => {
      outTimers.forEach((id) => window.clearTimeout(id));
      inTimers.forEach((id) => window.clearTimeout(id));
      loopTimers.forEach((id) => window.clearTimeout(id));
    };
  }, [getRandomRole, setSlotPhase]);

  const magneticFrame = useRef<number | null>(null);
  useEffect(() => {
    const clearMagnet = () => {
      const buttons = document.querySelectorAll<HTMLElement>(".hero-action[data-hover]");
      buttons.forEach((button) => {
        button.style.setProperty("--mag-x", "0px");
        button.style.setProperty("--mag-y", "0px");
      });
    };

    if (!supportsFinePointer) {
      clearMagnet();
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (magneticFrame.current) {
        cancelAnimationFrame(magneticFrame.current);
      }
      magneticFrame.current = requestAnimationFrame(() => {
        const buttons = document.querySelectorAll<HTMLElement>(".hero-action[data-hover]");
        buttons.forEach((button) => {
          const rect = button.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const dx = event.clientX - centerX;
          const dy = event.clientY - centerY;
          const distance = Math.hypot(dx, dy);
          const maxDistance = 96;

          if (distance < maxDistance) {
            const power = (1 - distance / maxDistance) * 6;
            const x = (dx / maxDistance) * power;
            const y = (dy / maxDistance) * power;
            button.style.setProperty("--mag-x", `${x.toFixed(2)}px`);
            button.style.setProperty("--mag-y", `${y.toFixed(2)}px`);
          } else {
            button.style.setProperty("--mag-x", "0px");
            button.style.setProperty("--mag-y", "0px");
          }
        });
      });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (magneticFrame.current) {
        cancelAnimationFrame(magneticFrame.current);
      }
      clearMagnet();
    };
  }, [supportsFinePointer]);

  const getLetterStyle = (index: number, total: number) => {
    if (!supportsFinePointer || typeof window === "undefined") {
      return {
        transform: "translate(0px, 0px) scale(1)",
        transition: "transform 0.1s ease-out",
      };
    }

    const elementCenterX = window.innerWidth / 2;
    const elementCenterY = window.innerHeight / 2;
    const letterOffset = (index - total / 2) * 8;
    const letterX = elementCenterX + letterOffset;
    const letterY = elementCenterY + 40;
    const dx = letterX - mousePos.x;
    const dy = letterY - mousePos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const getMaxDistance = () => {
      const width = window.innerWidth;
      if (width < 768) {
        return 100;
      } else if (width < 1024) {
        return 120;
      } else {
        return 150;
      }
    };

    const maxDistance = getMaxDistance();
    if (distance < maxDistance) {
      const force = (1 - distance / maxDistance) * 0.3;
      const angle = Math.atan2(dy, dx);

      const offsetX = -Math.cos(angle) * force * 8;
      const offsetY = -Math.sin(angle) * force * 8;

      return {
        transform: `translate(${offsetX}px, ${offsetY}px) scale(${1 + force * 0.1})`,
        transition: "transform 0.1s ease-out",
      };
    }

    return {
      transform: "translate(0px, 0px) scale(1)",
      transition: "transform 0.1s ease-out",
    };
  };

  const roleItems = useMemo(
    () => roleSlots.slice(0, showRolesCount),
    [roleSlots, showRolesCount]
  );

  return (
    <>
      <UniverseBackgroundThree />
      {supportsFinePointer ? <CustomCursor /> : null}
      <main className="main-container hero-main">
        <section className="hero-shell">
          <p className="hero-kicker">Цифровая визитка</p>
          <div className="name-container hero-copy">
            <h1 className="name-title hero-title">
              {HERO_NAME.split("").map((letter, index) => (
                <span
                  key={`${letter}-${index}`}
                  style={{
                    display: "inline-block",
                    color: index === 0 ? "var(--accent)" : undefined,
                    textShadow:
                      index === 0
                        ? "0 0 14px var(--accent-glow)"
                        : undefined,
                    ...getLetterStyle(index, HERO_NAME.length),
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </h1>

            <div className="hero-roles" aria-label="Ключевые роли">
              {roleItems.map((item, itemIndex) => (
                <div key={`${item.current}-${itemIndex}`} className="hero-role-block">
                  <div className="hero-role-track">
                    <span
                      className={`hero-role-word hero-role-word-current ${
                        item.phase === "out" ? "is-out" : ""
                      }`}
                    >
                      {item.current}
                    </span>
                    <span
                      className={`hero-role-word hero-role-word-upcoming ${
                        item.phase === "in" ? "is-in" : ""
                      }`}
                    >
                      {item.upcoming}
                    </span>
                  </div>
                  {itemIndex < roleItems.length - 1 ? (
                    <span className="hero-role-divider" aria-hidden="true" />
                  ) : null}
                </div>
              ))}
            </div>

            <div className="hero-actions" aria-label="Основные разделы">
              {HERO_ACTIONS.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  className="hero-action"
                  onClick={() => setActivePanel(action.id)}
                  data-hover
                >
                  <span className="hero-action-label">{action.label}</span>
                  <span className="hero-action-description">
                    {action.description}
                  </span>
                </button>
              ))}
            </div>

            <p className="hero-caption">
              Премиальная цифровая визитка: контактный профиль, портрет и
              избранные направления работы в одном минималистичном пространстве.
            </p>
          </div>
        </section>
      </main>

      <ContactPanel
        open={activePanel === "contacts"}
        onClose={() => setActivePanel(null)}
      />
      <ProjectsPanel
        open={activePanel === "projects"}
        onClose={() => setActivePanel(null)}
      />
      <PortraitPanel
        open={activePanel === "portrait"}
        onClose={() => setActivePanel(null)}
      />
    </>
  );
}