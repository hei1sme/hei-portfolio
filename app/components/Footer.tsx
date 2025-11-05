'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'; // Using react-icons

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      className="mt-16 border-t border-white/10 bg-black/40 py-10 text-gray-400 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 text-center">
        <div className="flex justify-center space-x-6">
          <motion.a
            href="https://linkedin.com/in/le-nguyen-gia-hung/" // Replace with actual link
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/10 text-slate-200 transition-colors hover:border-white/25 hover:text-white"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaLinkedin size={24} />
          </motion.a>
          <motion.a
            href="https://github.com/hei1sme" // Replace with actual link
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/10 text-slate-200 transition-colors hover:border-white/25 hover:text-white"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaGithub size={24} />
          </motion.a>
          <motion.a
            href="https://www.instagram.com/hei.isme/" // Replace with actual link
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/10 text-slate-200 transition-colors hover:border-white/25 hover:text-white"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaInstagram size={24} />
          </motion.a>
        </div>
        <p className="text-sm font-mono text-slate-300/80">
          &copy; {currentYear} Le Nguyen Gia Hung (hei). All rights reserved.
        </p>
        <p className="text-xs text-slate-400/70">
          Built with Next.js, Tailwind CSS, Framer Motion, and a playful Neural Calibration Lab.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer; 
