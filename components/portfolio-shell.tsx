"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, useReducedMotion } from "framer-motion";

import { CustomCursor } from "@/components/custom-cursor";
import { IntroHero } from "@/components/intro-hero";
import { BentoProfileHub } from "@/components/bento-profile-hub";
import { UniverseBackgroundThree } from "@/components/universe-background-three";
import { useDeviceProfile } from "@/hooks/use-device-profile";
import { LocaleProvider } from "@/lib/i18n/locale-provider";
import type { ScenePhase } from "@/lib/site-content";
import type { Locale } from "@/lib/i18n/locale";
import type { SiteCopy } from "@/lib/i18n/content";
import { profileAnchor } from "@/lib/portfolio-navigation";
import { AnalyticsBootstrap } from "@/components/portfolio-analytics";

const IMPLODE_MS = 800;
const BURST_MS = 600;
const REFORM_MS = 1800;

function PortfolioShellInner() {
  const { isMobile, isCoarsePointer } = useDeviceProfile();
  const [phase, setPhase] = useState<ScenePhase>("intro");
  const reducedMotion = useReducedMotion();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const transitioning = useRef(false);

  useEffect(() => {
    // Profile and project links open the requested content directly.
    if (profileAnchor(window.location.hash)) setPhase("nebula");
    const pendingTimers = timers.current;
    return () => pendingTimers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase === "intro" || phase === "nebula") transitioning.current = false;
  }, [phase]);

  const handleExplore = useCallback(() => {
    if (phase !== "intro" || transitioning.current) return;
    transitioning.current = true;
    timers.current.forEach(clearTimeout);
    timers.current.length = 0;
    if (reducedMotion) {
      setPhase("nebula");
      return;
    }
    setPhase("implode");

    timers.current.push(
      setTimeout(() => setPhase("burst"), IMPLODE_MS),
      setTimeout(() => setPhase("nebula"), IMPLODE_MS + BURST_MS),
    );
  }, [phase, reducedMotion]);

  const handleReturn = useCallback(() => {
    if (phase !== "nebula" || transitioning.current) return;
    transitioning.current = true;
    timers.current.forEach(clearTimeout);
    timers.current.length = 0;
    if (reducedMotion) {
      setPhase("intro");
      return;
    }
    setPhase("reform");

    timers.current.push(setTimeout(() => setPhase("intro"), REFORM_MS));
  }, [phase, reducedMotion]);

  const showCursor = !isMobile && !isCoarsePointer;

  return (
    <>
      <UniverseBackgroundThree
        mode={isMobile ? "mobile" : "desktop"}
        phase={phase}
      />
      {showCursor && <CustomCursor />}

      <AnimatePresence mode="wait">
        {(phase === "intro" || phase === "reform") ? (
          <IntroHero
            key="intro"
            onExplore={handleExplore}
            isReforming={phase === "reform"}
          />
        ) : phase === "nebula" ? (
          <BentoProfileHub
            key="hub"
            isMobile={isMobile}
            onReturn={handleReturn}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

export function PortfolioShell({ locale, copy }: { locale: Locale; copy: SiteCopy }) {
  return (
    <LocaleProvider locale={locale} copy={copy}>
      <MotionConfig reducedMotion="user">
        <AnalyticsBootstrap locale={locale} />
        <PortfolioShellInner />
      </MotionConfig>
    </LocaleProvider>
  );
}
