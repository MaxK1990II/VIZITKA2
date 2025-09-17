"use client";

import React, { useEffect } from 'react';
import Lenis from 'lenis';

export const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      // Cleanup on component unmount
      // You might need to add lenis.destroy() if the library provides it
    };
  }, []);

  return <>{children}</>;
};




