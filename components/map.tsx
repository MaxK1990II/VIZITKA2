"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { Globe } from "./globe";

const locations = [
  {
    name: "Германия",
    description: "Курсы по программированию роботов и технологиям окраски.",
  },
  {
    name: "Китай",
    description: "Изучение робототехники и приемка окрасочного комплекса.",
  },
];

export const Map = () => {
  return (
    <section className="py-24 md:py-32 px-4 bg-neutral-900">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Международный опыт</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="js-globe-wrapper relative w-full max-w-md mx-auto h-96">
                <Suspense fallback={<div className="text-white">Loading 3D...</div>}>
                    <Globe />
                </Suspense>
            </div>
            <div className="text-left space-y-8">
                {locations.map((loc, index) => (
                    <motion.div
                        key={loc.name}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="font-bold text-2xl mb-2 text-cyan-400">{loc.name}</h3>
                        <p className="text-neutral-300 text-lg">{loc.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};
