"use client";

import React from "react";

type Star = { x: number; y: number; z: number; speed: number; size: number; tw: number };

export const UniverseBackground2D: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const starsRef = React.useRef<Star[]>([]);
  const rafRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    // Init stars
    const numStars = Math.min(1200, Math.floor((width * height) / 2000));
    const stars: Star[] = new Array(numStars).fill(0).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 0.6 + 0.4, // brightness
      speed: Math.random() * 0.2 + 0.03,
      size: Math.random() * 1.2 + 0.3,
      tw: Math.random() * Math.PI * 2,
    }));
    starsRef.current = stars;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Background subtle vignette
      const g = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        Math.min(width, height) * 0.1,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.7
      );
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(1, "rgba(0,0,0,0.5)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      // Stars
      for (const s of starsRef.current) {
        s.tw += 0.03;
        const twinkle = 0.6 + Math.sin(s.tw) * 0.4; // 0.2..1.0
        ctx.globalAlpha = Math.min(1, s.z * twinkle);
        ctx.fillStyle = "#9ae6ff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * (0.7 + s.z * 0.6), 0, Math.PI * 2);
        ctx.fill();
        // drift
        s.x += s.speed;
        if (s.x > width + 5) s.x = -5;
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};



