'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaRocket, FaFileAlt, FaBrain, FaShieldAlt } from 'react-icons/fa';
import SectionHeader from './SectionHeader';

interface ExperienceEntry {
  id: number;
  role: string;
  company: string;
  date: string;
  description: string[];
  icon: React.ReactNode;
  metrics?: { label: string; value: string; color: string }[];
  badge: string;
}

const experienceData: ExperienceEntry[] = [
  {
    id: 1,
    role: 'Founder & Lead Researcher',
    company: 'SpeedyLabX — FPT University',
    date: '2025 - Present',
    description: [
      'Launched a six-member applied AI collective accelerating student-led research',
      'Established cross-functional rituals: code reviews, reproducibility checks, demo days',
    ],
    icon: <FaRocket className="text-purple-300" />,
    metrics: [
      { label: 'Team', value: '6', color: 'bg-purple-500/20 text-purple-200' },
      { label: 'Pilots', value: '8', color: 'bg-sky-500/20 text-sky-200' },
    ],
    badge: 'Current',
  },
  {
    id: 2,
    role: 'AI Researcher — SmokeNet',
    company: 'AJCAI 2025 Accepted Paper',
    date: '2024 - 2025',
    description: [
      'Designed transformer achieving MAE 0.7470 and R² 0.9545 on PM₂.₅ forecasting',
      'Delivered interpretable health-alert workflow with SHAP, IG, and DiCE',
    ],
    icon: <FaFileAlt className="text-sky-300" />,
    metrics: [
      { label: 'MAE', value: '0.7470', color: 'bg-purple-500/20 text-purple-200' },
      { label: 'R²', value: '0.9545', color: 'bg-sky-500/20 text-sky-200' },
      { label: 'Gain', value: '57.7%', color: 'bg-teal-500/20 text-teal-200' },
    ],
    badge: 'Published',
  },
  {
    id: 3,
    role: 'Researcher — Conformer-GAT SER',
    company: 'Multimodal Speech Emotion Recognition',
    date: '2025',
    description: [
      'Prototyping Conformer-GAT fusion for audio-transcript emotion reasoning',
      'Building transparency-first dashboards for IEMOCAP and RAVDESS benchmarks',
    ],
    icon: <FaBrain className="text-teal-300" />,
    badge: 'Active',
  },
  {
    id: 4,
    role: 'Project Lead — PPE Detection',
    company: 'DPL302m Capstone',
    date: '2024',
    description: [
      'Trained YOLOv8 pipeline across nine PPE classes with real-time compliance engine',
      'Shipped Streamlit interface with webcam inference and audit exports',
    ],
    icon: <FaShieldAlt className="text-amber-300" />,
    metrics: [
      { label: 'Classes', value: '9', color: 'bg-amber-500/20 text-amber-200' },
    ],
    badge: 'Shipped',
  },
];

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className="relative py-28 text-white">
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <SectionHeader
          eyebrow="Experience"
          title="Leading research squads and shipping production prototypes."
          description="Every milestone blends academic rigor with applied constraints — interpretability, operator empathy, and measurable impact."
        />

        <div ref={containerRef} className="relative mt-14">
          {/* Animated Timeline Line */}
          <div className="absolute left-4 top-0 bottom-0 hidden md:block w-[3px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-purple-400 via-fuchsia-400 to-sky-300"
            />
          </div>

          <div className="space-y-8">
            {experienceData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative md:pl-16"
              >
                {/* Timeline Node with Icon */}
                <div className="absolute left-0 top-4 hidden md:flex h-8 w-8 -translate-x-[14px] items-center justify-center rounded-xl border border-white/20 bg-[#05010a] shadow-[0_0_25px_rgba(148,93,255,0.35)] z-10">
                  {item.icon}
                </div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="group rounded-[24px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl shadow-[0_18px_55px_rgba(12,10,32,0.45)] transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20"
                >
                  {/* Header */}
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.35em] text-slate-300/70">{item.date}</p>
                      <h3 className="mt-1.5 text-lg font-semibold text-white group-hover:text-purple-200 transition-colors">
                        {item.role}
                      </h3>
                      <p className="text-sm text-slate-300/80">{item.company}</p>
                    </div>
                    <span className={`inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.3em] ${item.badge === 'Current'
                      ? 'bg-gradient-to-r from-purple-500/20 to-sky-500/20 text-white'
                      : 'bg-white/10 text-slate-200/80'
                      }`}>
                      {item.badge}
                    </span>
                  </div>

                  {/* Metrics */}
                  {item.metrics && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.metrics.map((metric) => (
                        <span
                          key={metric.label}
                          className={`rounded-md px-2.5 py-1 text-[11px] font-semibold ${metric.color}`}
                        >
                          {metric.label}: {metric.value}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-200/85">
                    {item.description.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-purple-400 to-sky-300" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 rounded-[24px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">I thrive with mission-driven teams.</h3>
              <p className="mt-1 text-sm text-slate-300/80">
                Looking for research internships or applied AI collaborations.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-semibold text-slate-100 transition-all duration-300 hover:bg-white/18"
              data-interactive
            >
              Let&apos;s talk <span>↗</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
