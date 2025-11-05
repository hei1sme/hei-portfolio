'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaDownload, FaEnvelopeOpenText } from 'react-icons/fa';
import SectionHeader from './SectionHeader';

const highlightCards = [
  {
    title: 'Current Focus',
    bullets: [
      'Explainable AI for time-series and multimodal audio',
      'SmokeNet – AJCAI 2025 accepted research on PM₂.₅ forecasting',
      'SpeedyLabX founder leading a six-member applied AI collective',
      'Built the Neural Calibration Lab experience to demystify model training',
    ],
  },
  {
    title: 'In-flight Experiments',
    bullets: [
      'Conformer-GAT fusion for transparent speech emotion recognition',
      'XAI toolkit with SHAP, Integrated Gradients, and counterfactuals',
      'Benchmarking on IEMOCAP and RAVDESS to validate generalisation',
    ],
  },
];

const speedyLabStats = [
  { label: 'Crew', value: '6 researchers', detail: 'Applied AI guild across CV, NLP, XAI, and robotics.' },
  { label: 'Cadence', value: 'Bi-weekly', detail: 'Demo days, peer reviews, and reproducibility audits.' },
  { label: 'Impact', value: '8 pilots', detail: 'From PPE compliance to multimodal SER prototypes.' },
];

const speedyLabPillars = [
  'Literature-to-lab pipelines with scoped ablations and benchmarks.',
  'Storytelling dashboards so domain partners can interrogate models.',
  'Community programs mentoring 150+ students through hands-on labs.',
];

const speedyLabProjects = [
  {
    title: 'Safety Compliance Vision Suite',
    description: 'YOLOv8-powered PPE detection with audit trails and real-time alerts for manufacturing floors.',
  },
  {
    title: 'Audio Emotion Copilot',
    description: 'Conformer-GAT fusion that surfaces turn-level empathy cues for conversational agents.',
  },
  {
    title: 'SmokeNet Public Health Pilot',
    description: 'Explainable PM₂.₅ forecasts with SHAP + counterfactual tooling for city officials.',
  },
];

const About: React.FC = () => {
  const [isLabExpanded, setIsLabExpanded] = useState(false);

  return (
    <section id="about" className="relative py-28 text-white">
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.04] via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeader
          eyebrow="About"
          title="Researcher focused on building transparent, resilient, and human-aligned intelligence."
          description="Blending peer-reviewed experimentation with community-facing tooling. I translate complex models into experiences that mentors, operators, and policy stakeholders can interrogate."
        />

        <div className="mt-16 grid items-start gap-12 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="relative overflow-hidden rounded-[32px] border border-white/12 bg-white/[0.04] p-9 backdrop-blur-2xl shadow-[0_22px_65px_rgba(15,11,36,0.46)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/12 via-transparent to-sky-400/12 opacity-90" />
            <div className="relative flex flex-col gap-8">
              <div className="grid gap-6 md:grid-cols-[auto_minmax(0,1fr)] md:items-start">
                <div className="flex justify-center md:justify-start">
                  <div className="relative h-28 w-28 overflow-hidden rounded-[26px] border border-white/10 bg-white/5">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/25 via-transparent to-sky-300/25" />
                    <Image src="/profile.png" alt="Le Nguyen Gia Hung" fill className="object-cover" priority />
                  </div>
                </div>
                <div className="space-y-3 text-left">
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-300/70">Le Nguyen Gia Hung</p>
                  <h3 className="text-balance text-3xl font-semibold leading-tight text-white">
                    AI/ML Research Student · SpeedyLabX Founder
                  </h3>
                  <p className="text-sm text-slate-300/80">B.Eng Artificial Intelligence · FPT University · Expected Dec 2027</p>
                  <p className="text-sm text-slate-200/85 leading-relaxed">
                    I design neural architectures institutions can trust. <span className="text-purple-200">SmokeNet</span> delivers
                    interpretable air-quality forecasts with measurable public-health impact and AJCAI 2025 recognition.
                  </p>
                  <p className="text-sm text-slate-200/80 leading-relaxed">
                    My craft blends deep experimentation with narrative tooling so partners can interrogate and co-pilot AI decisions.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-300/70">North Star</p>
                  <p className="mt-2 text-sm text-slate-200/85 leading-relaxed">
                    Transparent, resilient AI systems that respect human agency in high-stakes environments.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-300/70">Currently Exploring</p>
                  <p className="mt-2 text-sm text-slate-200/85 leading-relaxed">
                    Multimodal graph reasoning, synthetic data curation, and ethical evaluation frameworks.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="/HungLNG_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-sky-400 px-5 py-2.5 text-sm font-semibold tracking-wide shadow-[0_0_32px_rgba(133,76,255,0.45)] transition-transform duration-300 hover:scale-105"
                  data-interactive
                >
                  <FaDownload />
                  Resume
                </a>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-semibold tracking-wide text-slate-100 transition-all duration-300 hover:bg-white/18"
                  data-interactive
                >
                  <FaEnvelopeOpenText />
                  Collaborate
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.18, duration: 0.7 }}
            className="grid gap-6"
          >
            {highlightCards.map((card) => (
              <div
                key={card.title}
                className="rounded-[28px] border border-white/12 bg-white/[0.035] p-6 backdrop-blur-xl shadow-[0_20px_55px_rgba(11,8,25,0.42)]"
              >
                <h4 className="text-lg font-semibold text-white">{card.title}</h4>
                <ul className="mt-4 space-y-3 text-sm text-slate-300/85 leading-relaxed">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-purple-400 to-sky-400" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="rounded-[28px] border border-teal-300/25 bg-gradient-to-br from-sky-500/18 via-purple-500/12 to-transparent p-6 backdrop-blur-xl shadow-[0_22px_60px_rgba(22,30,60,0.45)]">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-200/80">Contact Signal</p>
              <div className="mt-4 space-y-3 text-sm text-slate-100/85">
                <div>
                  <p className="text-slate-300/70">Email</p>
                  <p className="font-semibold">heiontheway@gmail.com</p>
                </div>
                <div>
                  <p className="text-slate-300/70">Location</p>
                  <p className="font-semibold">Ho Chi Minh City, Vietnam</p>
                </div>
                <div>
                  <p className="text-slate-300/70">Open To</p>
                  <p className="font-semibold">Research internships · Applied AI collaborations</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-16 rounded-[34px] border border-white/12 bg-white/[0.035] p-8 backdrop-blur-2xl shadow-[0_25px_70px_rgba(13,10,30,0.45)]"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-300/70">SpeedyLabX</p>
              <h3 className="text-xl font-semibold text-white">Applied AI collective I co-founded and lead.</h3>
              <p className="text-sm text-slate-300/80">
                We translate research discoveries into reproducible pilots. The lab mentors peers, audits experiments, and crafts
                demo experiences for industry partners.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <div className="flex flex-wrap justify-start gap-3 md:justify-end">
                {speedyLabStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-left md:text-right">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-slate-300/70">{stat.label}</p>
                    <p className="text-sm font-semibold text-white">{stat.value}</p>
                    <p className="text-[11px] text-slate-300/75">{stat.detail}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setIsLabExpanded((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-100 transition-all duration-300 hover:bg-white/18"
                data-interactive
                aria-expanded={isLabExpanded}
                aria-controls="speedylabx-panel"
              >
                {isLabExpanded ? 'Hide Details' : 'Explore Lab'}
                <span className="text-xs">{isLabExpanded ? '−' : '+'}</span>
              </button>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {isLabExpanded && (
              <motion.div
                id="speedylabx-panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                  <div className="space-y-4 rounded-2xl border border-white/10 bg-white/10 p-5">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-300/70">Operating Pillars</p>
                    <ul className="space-y-3 text-sm text-slate-200/80 leading-relaxed">
                      {speedyLabPillars.map((pillar) => (
                        <li key={pillar} className="flex gap-3">
                          <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-purple-400 to-sky-300" />
                          <span>{pillar}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4 rounded-2xl border border-white/10 bg-white/10 p-5">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-300/70">Recent Launches</p>
                    <div className="space-y-4">
                      {speedyLabProjects.map((project) => (
                        <div key={project.title} className="rounded-xl border border-white/10 bg-white/10 p-4">
                          <p className="text-sm font-semibold text-white">{project.title}</p>
                          <p className="mt-2 text-[13px] text-slate-300/80 leading-relaxed">{project.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="mt-12" />
      </div>
    </section>
  );
};

export default About;
