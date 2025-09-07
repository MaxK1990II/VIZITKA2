"use client";

import React from "react";
import { WordAssemble } from "./word-assemble";

export const Hero3D = () => {
  return (
    <section className="relative h-screen w-full">
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
        <h1 className="js-hero-title text-5xl md:text-7xl font-bold">
          <WordAssemble text="Максим Каночкин" />
        </h1>
        <p className="js-hero-subtitle mt-4 text-lg md:text-xl text-neutral-300">
          Инженер • Новатор • Лидер
        </p>
      </div>
    </section>
  );
};
