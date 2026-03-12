"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PROFILE } from "@/lib/site-content";
import { PortfolioRoles } from "@/components/portfolio-roles";

type IntroHeroProps = {
  onExplore: () => void;
  isReforming?: boolean;
};

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

export function IntroHero({ onExplore, isReforming = false }: IntroHeroProps) {
  return (
    <motion.main
      className="intro-hero"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={isReforming ? undefined : onExplore}
      style={isReforming ? { pointerEvents: "none" } : undefined}
    >
      <motion.p className="intro-label" variants={itemVariants}>
        Technology Portfolio Interface
      </motion.p>

      <motion.h1 className="intro-name" variants={itemVariants}>
        {PROFILE.name.split(" ").map((word, wi) => (
          <span key={wi} className="intro-word">
            {word.split("").map((letter, li) => (
              <span key={`${wi}-${li}`} className="intro-letter">
                {letter}
              </span>
            ))}
            {wi < PROFILE.name.split(" ").length - 1 && (
              <span className="intro-letter">{"\u00A0"}</span>
            )}
          </span>
        ))}
      </motion.h1>

      <motion.div className="intro-roles-wrap" variants={itemVariants}>
        <span className="intro-roles-line" aria-hidden="true" />
        <PortfolioRoles roles={PROFILE.roles} visibleCount={3} />
      </motion.div>

      <motion.div className="intro-bottom" variants={itemVariants}>
        <ChevronDown className="intro-chevron" size={24} />
        <p className="intro-hint">нажмите в любое место</p>
      </motion.div>
    </motion.main>
  );
}
