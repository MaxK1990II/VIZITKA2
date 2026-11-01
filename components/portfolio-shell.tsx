"use client";

import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { CustomCursor } from "@/components/custom-cursor";
import { IntroHero } from "@/components/intro-hero";
import { BentoProfileHub } from "@/components/bento-profile-hub";
import { UniverseBackgroundThree } from "@/components/universe-background-three";
import { useDeviceProfile } from "@/hooks/use-device-profile";
import { LocaleProvider } from "@/lib/i18n/locale-provider";
import type { ScenePhase } from "@/lib/site-content";

const IMPLODE_MS = 800;
const BURST_MS = 600;
const REFORM_MS = 1800;

function PortfolioShellInner() {
  const { isMobile, isCoarsePointer } = useDeviceProfile();
  const [phase, setPhase] = useState<ScenePhase>("intro");

  const handleExplore = useCallback(() => {
    if (phase !== "intro") return;
    setPhase("implode");

    setTimeout(() => {
      setPhase("burst");
      setTimeout(() => {
        setPhase("nebula");
      }, BURST_MS);
    }, IMPLODE_MS);
  }, [phase]);

  const handleReturn = useCallback(() => {
    if (phase !== "nebula") return;
    setPhase("reform");

    setTimeout(() => {
      setPhase("intro");
    }, REFORM_MS);
  }, [phase]);

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

export function PortfolioShell() {
  return (
    <LocaleProvider>
      <PortfolioShellInner />
    </LocaleProvider>
  );
}
