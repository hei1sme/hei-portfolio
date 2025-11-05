'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';
import SectionHeader from './SectionHeader';

const coursework = ['Data Structures & Algorithms', 'Linear Algebra', 'Introduction to AI'];

const Education: React.FC = () => {
  return (
    <section id="education" className="relative py-28 text-white">
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-teal-400/10 via-transparent to-transparent" />
      <div className="relative max-w-5xl mx-auto px-6 lg:px-10">
        <SectionHeader
          eyebrow="Education"
          title="Grounded in an AI-first curriculum with research and engineering fluency."
          description="FPT University’s B.Eng AI program gives me the scaffolding to explore theoretical depth while building production-ready systems."
        />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent p-10 backdrop-blur-2xl shadow-[0_20px_60px_rgba(15,18,40,0.45)]"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/15 bg-white/10">
                <FaGraduationCap className="text-2xl text-teal-200" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white">FPT University</h3>
                <p className="text-sm text-slate-300/85">Ho Chi Minh City, Vietnam</p>
              </div>
            </div>
            <div className="text-right md:text-left">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-300/70">Bachelor of Engineering</p>
              <p className="text-sm font-semibold text-slate-100/90">Artificial Intelligence - Expected Dec 2027</p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-300/70">Highlights</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-200/85">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-teal-300 to-sky-300" />
                  <span>Certificates of Merit - Honorable Student of Trimester (Semesters 3 & 4).</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-teal-300 to-sky-300" />
                  <span>AI research focus across environmental intelligence and multimodal communication.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-300/70">Core Coursework</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-200/85">
                {coursework.map((course) => (
                  <li key={course} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-teal-300 to-sky-300" />
                    <span>{course}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
