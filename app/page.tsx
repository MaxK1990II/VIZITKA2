"use client";

import { ContactPanel } from "@/components/contact-panel";
import { CustomCursor } from "@/components/custom-cursor";
import { PortraitPanel } from "@/components/portrait-panel";
import { ProjectsPanel } from "@/components/projects-panel";
import { UniverseBackgroundThree } from "@/components/universe-background-three";
import {
  useState,
  useEffect,
  useCallback,
  type Dispatch,
  type SetStateAction,
} from "react";
import { HERO_ACTIONS, HERO_NAME, HERO_ROLES } from "@/lib/site-content";

type PanelId = "contacts" | "projects" | "portrait" | null;

export const dynamic = "force-dynamic";

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activePanel, setActivePanel] = useState<PanelId>(null);
  const [supportsFinePointer, setSupportsFinePointer] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateCapability = () => setSupportsFinePointer(media.matches);

    updateCapability();
    media.addEventListener("change", updateCapability);
    return () => media.removeEventListener("change", updateCapability);
  }, []);

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

  // Состояние для каждой из 3 надписей
  const [role1, setRole1] = useState(HERO_ROLES[0]);
  const [role2, setRole2] = useState(HERO_ROLES[1]);
  const [role3, setRole3] = useState(HERO_ROLES[2]);
  const [isAnimating1, setIsAnimating1] = useState(false);
  const [isAnimating2, setIsAnimating2] = useState(false);
  const [isAnimating3, setIsAnimating3] = useState(false);
  
  // Определяем количество ролей для показа в зависимости от размера экрана
  const [showRolesCount, setShowRolesCount] = useState(3);
  
  useEffect(() => {
    const updateRolesCount = () => {
      if (window.innerWidth < 480) {
        setShowRolesCount(1); // только одна роль на очень маленьких экранах
      } else if (window.innerWidth < 768) {
        setShowRolesCount(2); // две роли на мобильных
      } else {
        setShowRolesCount(3); // все три роли на больших экранах
      }
    };
    
    updateRolesCount();
    window.addEventListener('resize', updateRolesCount);
    return () => window.removeEventListener('resize', updateRolesCount);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activePanel ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [activePanel]);

  // Функция для случайного выбора новой роли
  const getRandomRole = useCallback((currentRole: string) => {
    const availableRoles = HERO_ROLES.filter(role => role !== currentRole);
    return availableRoles[Math.floor(Math.random() * availableRoles.length)];
  }, []);

  // Функция для анимации смены роли
  const animateRoleChange = useCallback((setRole: Dispatch<SetStateAction<string>>, setIsAnimating: (animating: boolean) => void) => {
    setIsAnimating(true);
    setTimeout(() => {
      setRole((currentRole) => getRandomRole(currentRole));
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }, 300);
  }, [getRandomRole]);

  // Автоматическая смена ролей с разными интервалами
  useEffect(() => {
    const interval1 = setInterval(() => animateRoleChange(setRole1, setIsAnimating1), 3000 + Math.random() * 2000);
    const interval2 = setInterval(() => animateRoleChange(setRole2, setIsAnimating2), 4000 + Math.random() * 3000);
    const interval3 = setInterval(() => animateRoleChange(setRole3, setIsAnimating3), 3500 + Math.random() * 2500);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  }, [animateRoleChange]);

  const getLetterStyle = (index: number, total: number, roleOffset: number) => {
    // На touch-устройствах отключаем cursor-based микроанимацию букв.
    if (!supportsFinePointer || typeof window === "undefined") {
      return {
        transform: "translate(0px, 0px) scale(1)",
        transition: "transform 0.1s ease-out",
      };
    }

    const elementCenterX = window.innerWidth / 2;
    const elementCenterY = window.innerHeight / 2;
    
    // Позиция буквы в одной линии (горизонтально)
    const letterOffset = (index - total / 2) * 8;
    const letterX = elementCenterX + roleOffset + letterOffset;
    const letterY = elementCenterY + 40; // все на одной высоте
    
    // Расстояние от курсора до буквы
    const dx = letterX - mousePos.x;
    const dy = letterY - mousePos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Адаптивный радиус притягивания для букв
    const getMaxDistance = () => {
      const width = window.innerWidth;
      if (width < 768) {
        return 100; // мобильные устройства
      } else if (width < 1024) {
        return 120; // планшеты
      } else {
        return 150; // десктопы
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

  const roleItems = [
    { value: role1, isAnimating: isAnimating1 },
    { value: role2, isAnimating: isAnimating2 },
    { value: role3, isAnimating: isAnimating3 },
  ].slice(0, showRolesCount);

  return (
    <>
      <UniverseBackgroundThree />
      {supportsFinePointer ? <CustomCursor /> : null}
      <main className="main-container hero-main">
        <section className="hero-shell">
          <p className="hero-kicker">Digital visiting card</p>
          <div className="name-container hero-copy">
            <h1 className="name-title hero-title">
              {HERO_NAME.split("").map((letter, index) => (
                <span
                  key={`${letter}-${index}`}
                  style={{
                    display: "inline-block",
                    color: index === 0 ? "#ff6b6b" : undefined,
                    textShadow:
                      index === 0
                        ? "0 0 14px rgba(255, 107, 107, 0.55)"
                        : undefined,
                    ...getLetterStyle(index, HERO_NAME.length, 0),
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </h1>

            <div className="hero-roles" aria-label="Ключевые роли">
              {roleItems.map((item, itemIndex) => (
                <div key={`${item.value}-${itemIndex}`} className="hero-role-block">
                  <div className="hero-role-track">
                    {item.value.split("").map((letter, letterIndex) => (
                      <span
                        key={`${item.value}-${letterIndex}`}
                        className="hero-role-letter"
                        style={{
                          transform: item.isAnimating
                            ? "translateY(-100%)"
                            : "translateY(0%)",
                          transition:
                            "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      >
                        {letter === " " ? "\u00A0" : letter}
                      </span>
                    ))}
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