'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaLightbulb, FaWaveSquare, FaNetworkWired, FaCode, FaUsers } from 'react-icons/fa';
import SectionHeader from './SectionHeader';
import TechIconGrid from './TechIconGrid';

interface CoreSkill {
  name: string;
  icon: React.ReactElement;
  color: string;
}

const coreSkills: CoreSkill[] = [
  { name: 'ML & Deep Learning', icon: <FaBrain />, color: 'text-purple-300' },
  { name: 'Explainable AI', icon: <FaLightbulb />, color: 'text-amber-300' },
  { name: 'Time-Series', icon: <FaWaveSquare />, color: 'text-teal-300' },
  { name: 'Multimodal', icon: <FaNetworkWired />, color: 'text-sky-300' },
  { name: 'Python Eng.', icon: <FaCode />, color: 'text-slate-100' },
  { name: 'Research Lead', icon: <FaUsers />, color: 'text-pink-300' },
];

const outcomes = [
  { label: 'Model reliability dashboards', detail: 'SHAP & IG overlays' },
  { label: 'Human feedback loops', detail: 'Evaluation scripts' },
  { label: 'Deployment playbooks', detail: 'CI pipelines & monitoring' },
  { label: 'Community mentorship', detail: '600+ learners reached' },
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="relative py-28 text-white">
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-sky-500/10 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Skills"
          title="A toolkit for rigorous experimentation and deployable AI."
          description="From GPU-bound research sprints to production dashboards — ideation, modelling, interpretability, deployment."
        />

        {/* Core Competencies - Simplified Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {coreSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2.5 backdrop-blur-xl shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300 hover:bg-white/[0.1] hover:border-white/25"
            >
              <span className={`text-lg ${skill.color}`}>{skill.icon}</span>
              <span className="text-sm font-medium text-slate-100">{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack Grid */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-14 rounded-[32px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl shadow-[0_24px_70px_rgba(16,12,40,0.45)]"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-white">Tech Stack</h3>
            <p className="mt-2 text-sm text-slate-300/80">
              Click categories to filter. Hover for proficiency levels.
            </p>
          </div>

          <TechIconGrid />
        </motion.div>

        {/* Outcomes Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {outcomes.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.08, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.07] hover:border-white/20"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 via-transparent to-sky-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="text-sm font-semibold text-white relative z-10">{item.label}</p>
              <p className="mt-1.5 text-xs text-slate-300/70 relative z-10">{item.detail}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
