"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Star, Hammer } from "lucide-react";

const timelineData = [
  {
    icon: <Star className="h-6 w-6 text-cyan-400" />,
    title: "Служба в ВДВ, г. Рязань",
    description: "Формирование дисциплины, стойкости и лидерских качеств.",
  },
  {
    icon: <GraduationCap className="h-6 w-6 text-cyan-400" />,
    title: "Образование",
    description: "Педагогический колледж (Техническое творчество) и НГТУ им. Алексеева (Инженер, красный диплом).",
  },
  {
    icon: <Hammer className="h-6 w-6 text-cyan-400" />,
    title: "Начало карьеры на заводе 'ГАЗ'",
    description: "Слесарь-ремонтник. Глубокое изучение производственных процессов с самого основания.",
  },
  {
    icon: <Briefcase className="h-6 w-6 text-cyan-400" />,
    title: "Начальник отдела",
    description: "Руководство отделом развития, инноваций и аддитивных технологий. Реализация прорывных проектов.",
  },
];

export const Timeline = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Мой путь</h2>
        <div className="relative">
           <div className="absolute left-4 md:left-1/2 -translate-x-1/2 h-full w-0.5 bg-neutral-700"></div>
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center w-full mb-8"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="hidden md:block w-5/12">
                {index % 2 === 0 && (
                  <div className="text-right pr-8">
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm text-neutral-400">{item.description}</p>
                  </div>
                )}
              </div>
              <div className="z-10 bg-neutral-800 border-2 border-cyan-400 rounded-full p-2 absolute left-4 md:left-1/2 -translate-x-1/2">
                {item.icon}
              </div>
              <div className="md:w-5/12 w-full pl-12 md:pl-0">
                <div className="md:hidden">
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-sm text-neutral-400">{item.description}</p>
                </div>
                <div className="hidden md:block">
                  {index % 2 !== 0 && (
                    <div className="text-left pl-8">
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="text-sm text-neutral-400">{item.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};



