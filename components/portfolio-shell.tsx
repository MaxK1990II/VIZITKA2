"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { CustomCursor } from "@/components/custom-cursor";
import { IntroHero } from "@/components/intro-hero";
import { ProfileHub } from "@/components/profile-hub";
import { UniverseBackgroundThree } from "@/components/universe-background-three";
import { useDeviceProfile } from "@/hooks/use-device-profile";
import type { ScenePhase } from "@/lib/site-content";

const IMPLODE_MS = 800;
const BURST_MS = 600;
const REFORM_MS = 1400;

export function PortfolioShell() {
  const { isMobile, isCoarsePointer } = useDeviceProfile();
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<ScenePhase>("intro");

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) return null;

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
          <ProfileHub
            key="hub"
            isMobile={isMobile}
            onReturn={handleReturn}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
