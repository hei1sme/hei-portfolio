'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaGraduationCap, FaIdBadge, FaSearch, FaGlobe } from 'react-icons/fa';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative py-40 text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(147,51,234,0.1)_0%,_transparent_70%)]" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Big bold statement */}
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-white">Let's build</span>
          <br />
          <span
            className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-green-400 bg-clip-text text-transparent"
            style={{ filter: 'drop-shadow(0 0 30px rgba(168,85,247,0.5))' }}
          >
            something amazing.
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="mt-8 text-lg md:text-xl text-white/60 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Open to research collaborations, internships, and AI community projects.
        </motion.p>

        {/* Social icons */}
        <motion.div
          className="mt-12 flex justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {[
            { href: 'mailto:heiontheway@gmail.com', icon: <FaEnvelope size={24} />, label: 'Email' },
            { href: 'https://linkedin.com/in/le-nguyen-gia-hung/', icon: <FaLinkedin size={24} />, label: 'LinkedIn' },
            { href: 'https://github.com/hei1sme/', icon: <FaGithub size={24} />, label: 'GitHub' },
            { href: 'https://scholar.google.com/citations?user=iGODAQYAAAAJ&hl=en', icon: <FaGraduationCap size={24} />, label: 'Scholar' },
            { href: 'https://orcid.org/0009-0003-7120-8167', icon: <FaIdBadge size={24} />, label: 'ORCID' },
            { href: 'https://www.scopus.com/authid/detail.uri?authorId=60219530700', icon: <FaSearch size={24} />, label: 'Scopus' },
            { href: 'https://www.webofscience.com/wos/author/record/PCR-6096-2025', icon: <FaGlobe size={24} />, label: 'WoS' },
          ].map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center gap-2"
              whileHover={{ y: -4, scale: 1.05 }}
            >
              <span
                className="grid h-14 w-14 place-items-center rounded-full border border-white/20 bg-white/5 text-white/70 transition-all duration-300 group-hover:bg-white/10 group-hover:text-white group-hover:border-purple-400/50"
                style={{ transitionProperty: 'all' }}
              >
                {link.icon}
              </span>
              {/* Glow effect on hover - rendered separately */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: '0 0 30px #a855f780, 0 0 60px #a855f740' }}
              />
              <span className="text-xs text-white/40 group-hover:text-white/70 transition-colors">
                {link.label}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Email CTA */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <a
            href="mailto:heiontheway@gmail.com"
            className="inline-flex items-center gap-3 text-white/50 hover:text-white transition-colors text-lg group"
          >
            <span
              className="font-mono group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all"
            >
              heiontheway@gmail.com
            </span>
            <span
              className="text-purple-400"
              style={{ textShadow: '0 0 15px #a855f780' }}
            >
              ↗
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
