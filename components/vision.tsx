"use client";

import React from "react";
import { motion } from "framer-motion";

export const Vision = () => {
  return (
    <section className="py-24 md:py-32 px-4">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Взгляд в будущее: Коллаборативная автоматизация
        </motion.h2>
        <motion.p
          className="max-w-3xl mx-auto text-neutral-300 mb-10 text-lg"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Я активно исследую рынок коллаборативных роботов и ищу надежных партнеров для реализации пилотных проектов. Моя цель — создать гибкие, безопасные и легко интегрируемые роботизированные системы.
        </motion.p>
        <motion.a
          href="#contact"
          className="inline-block bg-cyan-500 text-white font-bold py-4 px-10 rounded-lg hover:bg-cyan-600 transition-colors"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Связаться со мной
        </motion.a>
      </div>
    </section>
  );
};
