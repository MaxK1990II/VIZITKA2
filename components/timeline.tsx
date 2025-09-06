"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
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
    description: "Педагогический колледж и НГТУ им. Алексеева (Инженер, красный диплом).",
  },
  {
    icon: <Hammer className="h-6 w-6 text-cyan-400" />,
    title: "Начало карьеры на заводе 'ГАЗ'",
    description: "Путь от слесаря-ремонтника до глубокого понимания производственных процессов.",
  },
  {
    icon: <Briefcase className="h-6 w-6 text-cyan-400" />,
    title: "Начальник отдела",
    description: "Руководство отделом развития, инноваций и аддитивных технологий.",
  },
];

const TimelineItem = ({ data, isLast }: { data: typeof timelineData[0], isLast: boolean }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["center end", "start center"],
  });

  return (
    <div ref={ref} className="flex">
      <div className="flex flex-col items-center mr-4">
        <motion.div 
          className="w-12 h-12 rounded-full border-2 border-cyan-500 bg-neutral-800 flex items-center justify-center z-10"
          style={{ scale: scrollYProgress }}
        >
          {data.icon}
        </motion.div>
        {!isLast && <div className="w-0.5 grow bg-neutral-600"></div>}
      </div>
      <motion.div 
        className="pb-16"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="font-bold text-xl mb-1">{data.title}</h3>
        <p className="text-neutral-400">{data.description}</p>
      </motion.div>
    </div>
  );
};


export const Timeline = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"]
  });
  
  const scaleY = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
  });

  return (
    <section className="py-24 md:py-32 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Мой путь</h2>
        <div ref={ref} className="w-full max-w-3xl mx-auto relative">
           <motion.div style={{ scaleY }} className="absolute left-5 top-0 w-0.5 h-full bg-cyan-500 origin-top" />
           <div className="relative">
              {timelineData.map((item, index) => (
                <TimelineItem 
                  key={index} 
                  data={item} 
                  isLast={index === timelineData.length - 1} 
                />
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};
