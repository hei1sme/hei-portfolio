'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaMedal } from 'react-icons/fa';

const Education: React.FC = () => {
  return (
    <section id="education" className="relative py-20 text-white">
      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p
            className="text-sm uppercase tracking-[0.3em] text-purple-400 mb-4"
            style={{ textShadow: '0 0 20px #a855f780' }}
          >
            Education
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-black"
            style={{ letterSpacing: '-0.02em' }}
          >
            Formal{' '}
            <span
              className="bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent"
              style={{ filter: 'drop-shadow(0 0 25px rgba(168,85,247,0.6))' }}
            >
              foundation
            </span>
          </h2>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Left: University info */}
            <div className="flex items-start gap-4">
              <div
                className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-2xl border border-teal-400/30 bg-teal-500/20"
                style={{ boxShadow: '0 0 25px #14b8a640' }}
              >
                <FaGraduationCap className="text-2xl text-teal-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">FPT University</h3>
                <p className="text-white/60">Ho Chi Minh City, Vietnam</p>
                <p className="mt-2 text-sm text-white/80">
                  B.Eng in <span className="text-purple-300 font-medium">Artificial Intelligence</span>
                </p>
              </div>
            </div>

            {/* Right: Date */}
            <div className="md:text-right">
              <p className="text-2xl font-bold text-white">2023 - 2027</p>
              <p className="text-sm text-white/50">Expected graduation</p>
            </div>
          </div>

          {/* Achievements & Certifications */}
          <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
            <div className="flex flex-wrap gap-3">
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/30 bg-amber-500/10"
                style={{ boxShadow: '0 0 15px #f59e0b30' }}
              >
                <FaMedal className="text-amber-300" />
                <span className="text-sm text-white/80">Certificate of Merit — Semesters 3, 4, 5 & 6</span>
              </div>
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-400/30 bg-purple-500/10"
                style={{ boxShadow: '0 0 15px #a855f730' }}
              >
                <span className="text-sm text-white/80">AI Research Focus</span>
              </div>
            </div>

            {/* Certifications badges */}
            <div className="pt-2">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">Specializations & Certifications</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { title: 'Natural Language Processing', provider: 'DeepLearning.AI', color: '#a855f7' },
                  { title: 'MLOps & Model Serving', provider: 'Coursera', color: '#0ea5e9' },
                  { title: 'Full Stack Software Developer', provider: 'IBM', color: '#3b82f6' },
                  { title: 'AI Engineer Professional', provider: 'Packt', color: '#ec4899' },
                  { title: 'Data Science & SQL', provider: 'IBM', color: '#22c55e' },
                  { title: 'Docker, Kubernetes & OpenShift', provider: 'IBM', color: '#f59e0b' },
                ].map((cert) => (
                  <span
                    key={cert.title}
                    className="px-3 py-1.5 text-xs rounded-xl border bg-white/5 backdrop-blur-sm"
                    style={{ borderColor: `${cert.color}40`, color: 'rgba(255,255,255,0.9)' }}
                  >
                    <span className="font-semibold text-white">{cert.title}</span>
                    <span className="text-white/40 ml-1.5">({cert.provider})</span>
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
