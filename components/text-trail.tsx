"use client";

import React from "react";
import { motion } from "framer-motion";

type TextTrailProps = {
  text: string;
  className?: string;
  delayStep?: number; // задержка между буквами
  amplitude?: number; // амплитуда смещения по Y
  duration?: number; // длительность одного цикла
};

export const TextTrail: React.FC<TextTrailProps> = ({
  text,
  className,
  delayStep = 0.055,
  amplitude = 10,
  duration = 1.4,
}) => {
  const letters = React.useMemo(() => text.split("").map((ch) => (ch === " " ? "\u00A0" : ch)), [text]);

  return (
    <span className={className} aria-label={text}>
      {letters.map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          className="inline-block will-change-transform"
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: [0, -amplitude, 0] }}
          transition={{ duration, delay: i * delayStep, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
};
