"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PortfolioRoles } from "@/components/portfolio-roles";
import { useLocale } from "@/lib/i18n/locale-provider";

type IntroHeroProps = {
  onExplore: () => void;
  isReforming?: boolean;
};

const SWIPE_THRESHOLD_PX = 48;
const WHEEL_THRESHOLD = 24;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.25 },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] },
  },
};

function splitDisplayName(name: string): string[] {
  if (name.includes("·")) {
    return name.split("·").map((part) => part.trim()).filter(Boolean);
  }
  return name.split(" ").filter(Boolean);
}

export function IntroHero({ onExplore, isReforming = false }: IntroHeroProps) {
  const { copy, locale } = useLocale();
  const nameParts = splitDisplayName(copy.name);
  const joiner = locale === "zh" || locale === "ja" ? "·" : "\u00A0";
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const armed = !isReforming;

  const triggerExplore = useCallback(() => {
    if (!armed) return;
    onExplore();
  }, [armed, onExplore]);

  useEffect(() => {
    if (!armed) return;

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      touchStart.current = { x: touch.clientX, y: touch.clientY };
    };

    const onTouchEnd = (event: TouchEvent) => {
      const start = touchStart.current;
      touchStart.current = null;
      if (!start) return;
      const touch = event.changedTouches[0];
      if (!touch) return;
      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;
      if (Math.hypot(dx, dy) >= SWIPE_THRESHOLD_PX) {
        triggerExplore();
      }
    };

    const onTouchCancel = () => {
      touchStart.current = null;
    };

    const onWheel = (event: WheelEvent) => {
      if (
        Math.abs(event.deltaY) >= WHEEL_THRESHOLD ||
        Math.abs(event.deltaX) >= WHEEL_THRESHOLD
      ) {
        triggerExplore();
      }
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchCancel, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchCancel);
      window.removeEventListener("wheel", onWheel);
    };
  }, [armed, triggerExplore]);

  return (
    <motion.main
      className="intro-hero"
      variants={containerVariants}
      initial={false}
      animate="visible"
      exit="exit"
      onClick={armed ? triggerExplore : undefined}
      style={isReforming ? { pointerEvents: "none" } : undefined}
    >
      <motion.p className="intro-label" variants={itemVariants}>
        {copy.introLabel}
      </motion.p>

      <motion.h1 className="intro-name" variants={itemVariants}>
        {nameParts.map((word, wi) => (
          <span key={`${locale}-${wi}`} className="intro-word">
            {Array.from(word).map((letter, li) => (
              <span key={`${wi}-${li}`} className="intro-letter">
                {letter}
              </span>
            ))}
            {wi < nameParts.length - 1 && (
              <span className="intro-letter">{joiner}</span>
            )}
          </span>
        ))}
      </motion.h1>

      <motion.div className="intro-roles-wrap" variants={itemVariants}>
        <span className="intro-roles-line" aria-hidden="true" />
        <PortfolioRoles key={locale} roles={copy.roles} visibleCount={3} />
      </motion.div>

      <motion.div className="intro-bottom" variants={itemVariants}>
        <ChevronDown className="intro-chevron" size={24} />
        <p className="intro-hint">{copy.introHint}</p>
      </motion.div>
    </motion.main>
  );
}
