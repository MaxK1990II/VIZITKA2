"use client";

import React from "react";
import { motion } from "framer-motion";

export const Contact = () => {
  const email = "max.kanochkin@gmail.com";

  return (
    <footer id="contact" className="py-24 md:py-32 px-4">
      <div className="container mx-auto text-center">
        <motion.h2 
          className="js-contact-title text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Готов к сотрудничеству
        </motion.h2>
        <motion.p 
          className="text-neutral-400 mb-8 text-lg"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Если у вас есть интересные проекты или предложения, свяжитесь со мной.
        </motion.p>
        <motion.a
          href={`mailto:${email}`}
          className="js-contact-cta inline-block bg-cyan-500 text-white font-bold py-4 px-10 rounded-lg hover:bg-cyan-600 transition-colors"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Написать на почту
        </motion.a>
        <div className="mt-16 text-sm text-neutral-500 border-t border-neutral-800 pt-8">
          <p>&copy; {new Date().getFullYear()} Максим Каночкин. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};
