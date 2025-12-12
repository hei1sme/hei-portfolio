'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaDownload, FaEnvelopeOpenText, FaRocket, FaUsers, FaFlask, FaMapMarkerAlt } from 'react-icons/fa';
import SectionHeader from './SectionHeader';

const highlights = [
  'Explainable AI for time-series and multimodal audio',
  'SmokeNet — AJCAI 2025 accepted research',
  'SpeedyLabX founder leading applied AI collective',
];

const speedyLabStats = [
  { label: 'Crew', value: '10', icon: <FaUsers className="text-purple-300" /> },
  { label: 'Pilots', value: '8', icon: <FaFlask className="text-sky-300" /> },
  { label: 'Cadence', value: 'Bi-weekly', icon: <FaRocket className="text-teal-300" /> },
];

const About: React.FC = () => {
  const [isLabExpanded, setIsLabExpanded] = useState(false);

  return (
    <section id="about" className="relative py-28 text-white">
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.04] via-transparent to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="About"
          title="Building transparent, resilient, and human-aligned intelligence."
          description="Blending peer-reviewed experimentation with community-facing tooling."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-stretch">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="relative overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.04] p-8 backdrop-blur-2xl shadow-[0_22px_65px_rgba(15,11,36,0.46)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-sky-400/10 opacity-80" />

            <div className="relative flex flex-col gap-6">
              {/* Profile Image - Large and Centered */}
              <div className="flex flex-col items-center text-center gap-4">
                <div className="relative h-56 w-56 flex-shrink-0 overflow-hidden rounded-3xl border-2 border-purple-400/30 bg-white/5 shadow-[0_0_60px_rgba(168,85,247,0.3)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 via-transparent to-sky-400/40" />
                  <Image src="/profile.png" alt="Le Nguyen Gia Hung" fill className="object-cover" priority />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-slate-300/70">Le Nguyen Gia Hung</p>
                  <h3 className="mt-1 text-2xl font-bold text-white">AI/ML Research Student</h3>
                  <p className="text-sm text-slate-300/80 mt-1">B.Eng AI · FPT University · Dec 2027</p>
                </div>
              </div>

              {/* Focus Areas */}
              <div className="space-y-2">
                {highlights.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                    className="flex items-center gap-3 text-sm text-slate-200/85"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-400 to-sky-400" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="/HungLNG_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-sky-400 px-5 py-2.5 text-sm font-semibold tracking-wide shadow-[0_0_28px_rgba(133,76,255,0.4)] transition-transform duration-300 hover:scale-105"
                  data-interactive
                >
                  <FaDownload /> Resume
                </a>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-semibold text-slate-100 transition-all duration-300 hover:bg-white/18"
                  data-interactive
                >
                  <FaEnvelopeOpenText /> Collaborate
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.18, duration: 0.7 }}
            className="flex flex-col gap-5 h-full"
          >
            {/* Quick Info */}
            <div className="rounded-[24px] border border-white/12 bg-white/[0.035] p-6 backdrop-blur-xl">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/10 p-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-slate-300/70">North Star</p>
                  <p className="mt-2 text-sm text-slate-200/85">Transparent AI that respects human agency</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/10 p-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-slate-300/70">Exploring</p>
                  <p className="mt-2 text-sm text-slate-200/85">Multimodal graph reasoning & XAI tooling</p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="rounded-[24px] border border-teal-300/25 bg-gradient-to-br from-sky-500/15 via-purple-500/10 to-transparent p-6 backdrop-blur-xl">
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-200/80">Quick Contact</p>
              <div className="mt-3 space-y-2 text-sm text-slate-100/85">
                <div className="flex items-center gap-2">
                  <FaEnvelopeOpenText className="text-slate-400" />
                  <span>heiontheway@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-slate-400" />
                  <span>Ho Chi Minh City, Vietnam</span>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="flex-1 rounded-[24px] border border-white/12 bg-white/[0.035] p-6 backdrop-blur-xl">
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-300/70">Certifications</p>
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-200/85">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                  <span>Building RAG Agents with LLMs — NVIDIA</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-200/85">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  <span>IBM Full Stack Developer — IBM</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-200/85">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                  <span>Data Science Fundamentals — IBM</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* SpeedyLabX Section - Collapsed */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-10 rounded-[28px] border border-white/12 bg-white/[0.035] p-6 backdrop-blur-2xl"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl border border-purple-400/30 bg-purple-500/20 text-xl">
                <FaRocket className="text-purple-300" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">SpeedyLabX</h3>
                <p className="text-sm text-slate-300/80">Applied AI collective I founded and lead</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {speedyLabStats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2">
                  {stat.icon}
                  <div className="text-right">
                    <p className="text-xs font-semibold text-white">{stat.value}</p>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-slate-300/70">{stat.label}</p>
                  </div>
                </div>
              ))}

              <button
                onClick={() => setIsLabExpanded((prev) => !prev)}
                className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-100 transition-all hover:bg-white/18"
                data-interactive
              >
                {isLabExpanded ? '−' : '+'}
              </button>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {isLabExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-white/10 p-4">
                    <p className="text-xs font-semibold text-white">Safety Compliance Vision</p>
                    <p className="mt-1 text-[11px] text-slate-300/80">YOLOv8 PPE detection</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/10 p-4">
                    <p className="text-xs font-semibold text-white">Audio Emotion Copilot</p>
                    <p className="mt-1 text-[11px] text-slate-300/80">Conformer-GAT fusion</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/10 p-4">
                    <p className="text-xs font-semibold text-white">SmokeNet Pilot</p>
                    <p className="mt-1 text-[11px] text-slate-300/80">PM₂.₅ with XAI dashboards</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
