"use client";

import React from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Cpu, Rocket } from "lucide-react";

const competencies = [
  {
    name: "Инновации",
    icon: Rocket,
    description: "Внедрение передовых технологий и оптимизация производственных процессов.",
  },
  {
    name: "Автоматизация",
    icon: Cpu,
    description: "Программирование промышленных роботов и разработка роботизированных ячеек.",
  },
  {
    name: "Искусственный интеллект",
    icon: BrainCircuit,
    description: "Развитие в области компьютерного зрения и машинного обучения для промышленности.",
  },
];

const philosophyText = "Я убежден, что будущее промышленности — в синергии человеческого опыта и искусственного интеллекта. Моя цель — создавать интеллектуальные производственные системы, которые не просто автоматизируют рутину, а становятся надежными партнерами человека, повышая эффективность и открывая новые горизонты для творчества и инноваций.";

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.02,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const About = () => {
  return (
    <section className="py-24 md:py-32 px-4 overflow-hidden">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="w-64 h-64 md:w-80 md:h-80 bg-neutral-800 rounded-full flex items-center justify-center border-4 border-neutral-700">
            <span className="text-neutral-500 text-lg">Фото</span>
          </div>
        </motion.div>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center md:text-left">Моя философия</h2>
          <motion.p 
            className="text-neutral-300 mb-10 text-base md:text-lg leading-relaxed"
            variants={sentence}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {philosophyText.split(" ").map((word, index) => (
              <motion.span key={word + "-" + index} variants={letter}>
                {word}{" "}
              </motion.span>
            ))}
          </motion.p>
          <div className="space-y-8">
            {competencies.map((item, index) => {
              const Icon = item.icon;
              return (
              <motion.div
                key={item.name}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    delay: index * 0.3
                  }}
                >
                  <Icon className="h-10 w-10 text-cyan-400" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-xl">{item.name}</h3>
                  <p className="text-sm text-neutral-400">{item.description}</p>
                </div>
              </motion.div>
            )})}
          </div>
        </div>
      </div>
    </section>
  );
};
