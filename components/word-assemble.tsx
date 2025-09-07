"use client";

import React from "react";
import { motion } from "framer-motion";

type WordAssembleProps = {
  text: string;
  className?: string;
  amplitude?: number; // амплитуда микродвижения (px)
  period?: number;    // длительность цикла (сек)
  stagger?: number;   // задержка между буквами
};

export const WordAssemble: React.FC<WordAssembleProps> = ({
  text,
  className,
  amplitude = 1.5,
  period = 3.2,
  stagger = 0.08,
}) => {
  const letters = React.useMemo(() => text.split("").map((ch) => (ch === " " ? "\u00A0" : ch)), [text]);

  return (
    <span className={className} aria-label={text}>
      {letters.map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          className="inline-block text-white will-change-transform"
          animate={{ y: [0, -amplitude, 0, amplitude, 0] }}
          transition={{ duration: period, repeat: Infinity, ease: "easeInOut", delay: i * stagger }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
};
