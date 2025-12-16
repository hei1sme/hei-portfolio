'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaGraduationCap } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="border-t border-white/10 bg-black py-8 text-white/50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Copyright */}
        <p className="text-sm">
          © {currentYear} Le Nguyen Gia Hung
        </p>

        {/* Center/Right: Social icons */}
        <div className="flex items-center gap-4">
          {[
            { href: 'https://linkedin.com/in/le-nguyen-gia-hung/', icon: <FaLinkedin size={18} /> },
            { href: 'https://github.com/hei1sme/', icon: <FaGithub size={18} /> },
            { href: 'https://scholar.google.com/citations?user=iGODAQYAAAAJ&hl=en', icon: <FaGraduationCap size={18} /> },
          ].map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
