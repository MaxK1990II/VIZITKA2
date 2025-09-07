"use client";

import React from "react";
import { motion, useMotionValue, useTransform, MotionValue } from "framer-motion";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

export const Hero = () => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX, clientY, currentTarget } = event;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    
    const newX = (clientX - left) / width;
    const newY = (clientY - top) / height;

    x.set(newX);
    y.set(newY);
  };
  
  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  }

  const parallaxYTitle = useParallax(y, 15);
  const parallaxXTitle = useParallax(x, 15);

  const parallaxYSubtitle = useParallax(y, 10);
  const parallaxXSubtitle = useParallax(x, 10);
  
  const parallaxYTagline = useParallax(y, 5);
  const parallaxXTagline = useParallax(x, 5);

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="animated-background" />
      <div className="relative z-10 text-center">
        <motion.h1
          style={{ x: parallaxXTitle, y: parallaxYTitle, textShadow: '0px 0px 8px rgba(255,255,255,0.2)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="js-hero-title text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50"
        >
          Максим Каночкин
        </motion.h1>
        <motion.p
          style={{ x: parallaxXSubtitle, y: parallaxYSubtitle }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="js-hero-subtitle mt-4 text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto"
        >
          Начальник отдела развития, инноваций и аддитивных технологий
        </motion.p>
        <motion.p
          style={{ x: parallaxXTagline, y: parallaxYTagline }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="js-hero-tagline mt-2 text-base text-neutral-400"
        >
          Инженер | Новатор | Лидер
        </motion.p>
      </div>
    </motion.div>
  );
};
