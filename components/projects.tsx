"use client";

import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Layers, AppWindow } from "lucide-react";

const projectData = [
  {
    icon: <Layers className="h-10 w-10 text-cyan-400" />,
    title: "3D печать в промышленности",
    description: "Внедрение аддитивных технологий для прототипирования, создания оснастки и ускорения разработки.",
  },
  {
    icon: <AppWindow className="h-10 w-10 text-cyan-400" />,
    title: "Приложение для цеха окраски",
    description: "Разработка ПО для мониторинга и управления процессами, что привело к повышению качества.",
  },
];

const ProjectCard = ({ project }: { project: typeof projectData[0] }) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const top = useMotionTemplate`${mouseYSpring}px`;
    const left = useMotionTemplate`${mouseXSpring}px`;
    const rotateX = useMotionTemplate`rotateX(${useSpring(useMotionValue(0))}deg)`;
    const rotateY = useMotionTemplate`rotateY(${useSpring(useMotionValue(0))}deg)`;


    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return;

        const { left, top, width, height } = ref.current.getBoundingClientRect();
        
        const mouseX = e.clientX - left;
        const mouseY = e.clientY - top;
        
        const rotateXValue = (mouseY / height - 0.5) * -25;
        const rotateYValue = (mouseX / width - 0.5) * 25;

        rotateX.set(`rotateX(${rotateXValue}deg)`);
        rotateY.set(`rotateY(${rotateYValue}deg)`);

        x.set(mouseX);
        y.set(mouseY);
    }
    
    const handleMouseLeave = () => {
        rotateX.set(`rotateX(0deg)`);
        rotateY.set(`rotateY(0deg)`);
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                transform: "perspective(800px)",
            }}
            className="bg-neutral-800 p-8 rounded-xl border border-neutral-700 relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <motion.div 
                style={{
                    top,
                    left,
                    transform: "translate(-50%, -50%)",
                }}
                className="absolute w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"
            />
            <motion.div style={{ rotateX, rotateY }} className="relative z-10">
                <div className="mb-4">{project.icon}</div>
                <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                <p className="text-neutral-400">{project.description}</p>
            </motion.div>
        </motion.div>
    );
};


export const Projects = () => {
  return (
    <section className="py-24 md:py-32 px-4 bg-neutral-900">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Ключевые проекты</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projectData.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
