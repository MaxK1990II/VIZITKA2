"use client";

import { useEffect } from "react";
import { createTimeline, onScroll, stagger, animate, type Timeline } from "animejs";

declare global {
  interface Window {
    __mainTL?: Timeline;
  }
}

export const ScrollAnim = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let tlLocal: Timeline | null = null;
    try {
      animate([".js-hero-title", ".js-hero-subtitle", ".js-hero-tagline"], { opacity: 0, duration: 0 });
      animate([".js-about-photo", ".js-about-item"], { opacity: 0, duration: 0 });
      animate([".js-timeline-line"], { scaleY: 0, transformOrigin: "top center", duration: 0 });
      animate([".js-timeline-item", ".js-project-card", ".js-vision-title", ".js-vision-cta", ".js-globe-wrapper", ".js-contact-title", ".js-contact-cta"], { opacity: 0, duration: 0 });

      const tl: Timeline = createTimeline({
        autoplay: onScroll({ sync: true }),
        duration: 1500,
      });

      tl.add([".js-hero-title", ".js-hero-subtitle", ".js-hero-tagline"], {
        opacity: [0, 1],
        translateY: [-60, 0],
        ease: "outExpo",
        delay: stagger(160),
      }, 0);

      tl.add(".js-about-photo", {
        opacity: [0, 1],
        scale: [0.75, 1],
        rotate: [-4, 0],
        ease: "outBack(1.6)",
      }, ">+=200");

      tl.add(".js-about-item", {
        opacity: [0, 1],
        translateX: [-40, 0],
        delay: stagger(160),
        ease: "outCubic",
      }, ">-=100");

      tl.add(".js-timeline-line", {
        scaleY: [0, 1],
        transformOrigin: "top center",
        ease: "inOutQuart",
      }, ">+=200");

      tl.add(".js-timeline-item", {
        opacity: [0, 1],
        translateY: [40, 0],
        delay: stagger(180),
        ease: "outCubic",
      }, ">-=300");

      tl.add(".js-project-card", {
        opacity: [0, 1],
        scale: [0.85, 1],
        translateY: [30, 0],
        delay: stagger(180),
        ease: "outExpo",
      }, ">+=100");

      tl.add([".js-vision-title", ".js-vision-cta"], {
        opacity: [0, 1],
        translateY: [30, 0],
        delay: stagger(160),
        ease: "outCubic",
      }, ">+=200");

      tl.add(".js-globe-wrapper", {
        opacity: [0, 1],
        scale: [0.85, 1],
        ease: "outBack(1.5)",
      }, ">+=150");

      tl.add([".js-contact-title", ".js-contact-cta"], {
        opacity: [0, 1],
        translateY: [30, 0],
        delay: stagger(140),
      }, ">+=200");

      window.__mainTL = tl;
      tlLocal = tl;
    } catch {
      // no-op
    }

    return () => {
      try {
        tlLocal?.pause?.();
      } catch {}
    };
  }, []);

  return null;
};
