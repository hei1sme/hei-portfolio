'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ExperienceEntry {
  id: number;
  role: string;
  company: string;
  date: string;
  description: string[];
}

const experienceData: ExperienceEntry[] = [
  {
    id: 1,
    role: 'Founder & Lead Researcher',
    company: 'SpeedyLabX - FPT University',
    date: '2025 - Present',
    description: [
      'Launched and lead a six-member applied AI collective to accelerate student-led research.',
      'Established cross-functional research rituals with code reviews, reproducibility checks, and demo days.',
    ],
  },
  {
    id: 2,
    role: 'AI Researcher - SmokeNet',
    company: 'AJCAI 2025 Accepted Paper',
    date: '2024 - 2025',
    description: [
      'Designed a transformer architecture delivering MAE 0.7470 and R^2 0.9545 on PM2.5 forecasting.',
      'Back-tested the May 2024 smoke crisis, reducing MAE by 57.7% versus an XGBoost baseline.',
      'Delivered an interpretable health-alert workflow with SHAP, Integrated Gradients, and DiCE insights.',
    ],
  },
  {
    id: 3,
    role: 'Researcher - Conformer-GAT SER',
    company: 'Multimodal Speech Emotion Recognition',
    date: '2025',
    description: [
      'Prototyping Conformer-GAT fusion to reason over audio and transcript interactions.',
      'Building transparency-first evaluation dashboards for IEMOCAP and RAVDESS benchmarks.',
    ],
  },
  {
    id: 4,
    role: 'Project Lead - PPE Detection System',
    company: 'DPL302m Capstone',
    date: '2024',
    description: [
      'Trained a YOLOv8 pipeline across nine PPE classes with a real-time SAFE/UNSAFE compliance engine.',
      'Shipped a Streamlit interface supporting webcam inference, alerting, and audit exports.',
    ],
  },
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-28 text-white">
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent" />
      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col gap-4"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.35em] text-slate-200/80">
            Experience
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight max-w-3xl">
            Leading and shipping research that balances academic rigor with production constraints.
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 hidden md:block">
            <div className="h-full w-[3px] bg-gradient-to-b from-purple-400 via-fuchsia-400 to-sky-300 opacity-60" />
          </div>

          <div className="space-y-10">
            {experienceData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                className="relative md:pl-16"
              >
                <div className="absolute left-0 top-4 hidden md:flex h-3 w-3 -translate-x-[7px] items-center justify-center rounded-full border border-white/40 bg-gradient-to-br from-purple-400 via-fuchsia-400 to-sky-300 shadow-[0_0_25px_rgba(148,93,255,0.45)]" />

                <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-2xl shadow-[0_18px_55px_rgba(12,10,32,0.45)]">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-slate-300/70">{item.date}</p>
                      <h3 className="mt-2 text-xl font-semibold text-white">{item.role}</h3>
                      <p className="text-sm font-medium text-slate-300/90">{item.company}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-slate-200/80">
                      {index === 0 ? 'Current' : 'Milestone'}
                    </span>
                  </div>

                  <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-200/85">
                    {item.description.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-purple-400 to-sky-300" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
