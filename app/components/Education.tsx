'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaMedal, FaBook } from 'react-icons/fa';
import SectionHeader from './SectionHeader';

const highlights = [
  { icon: <FaMedal className="text-amber-300" />, text: 'Certificates of Merit — Semesters 3, 4 & 5' },
  { icon: <FaBook className="text-teal-300" />, text: 'AI research focus: environmental intelligence & multimodal' },
];

const coursework = ['Data Structures & Algorithms', 'Linear Algebra', 'Introduction to AI', 'Deep Learning', 'Statistical Analysis'];

const Education: React.FC = () => {
  return (
    <section id="education" className="relative py-28 text-white">
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-teal-400/10 via-transparent to-transparent" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-10">
        <SectionHeader
          eyebrow="Education"
          title="Grounded in an AI-first curriculum with research fluency."
          description="FPT University's B.Eng AI program with theoretical depth and production-ready systems."
        />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="mt-12 rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent p-8 backdrop-blur-2xl shadow-[0_20px_60px_rgba(15,18,40,0.45)]"
        >
          {/* Header */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl border border-teal-400/30 bg-teal-500/20">
                <FaGraduationCap className="text-2xl text-teal-200" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">FPT University</h3>
                <p className="text-sm text-slate-300/85">Ho Chi Minh City, Vietnam</p>
              </div>
            </div>
            <div className="sm:text-right">
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-300/70">Bachelor of Engineering</p>
              <p className="text-sm font-semibold text-slate-100/90">Artificial Intelligence — Dec 2027</p>
            </div>
          </div>

          {/* Content Grid */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {/* Highlights */}
            <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-300/70">Highlights</p>
              <ul className="mt-4 space-y-3">
                {highlights.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className="flex items-center gap-3 text-sm text-slate-200/85"
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Coursework */}
            <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-300/70">Core Coursework</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {coursework.map((course) => (
                  <span
                    key={course}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-slate-200/85"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
