'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaDownload, FaEnvelopeOpenText } from 'react-icons/fa';

const highlightCards = [
  {
    title: 'Current Focus',
    bullets: [
      'Explainable AI for time-series and multimodal audio',
      'SmokeNet - AJCAI 2025 accepted research on PM2.5 forecasting',
      'SpeedyLabX founder leading a six-member applied AI collective',
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

const About: React.FC = () => {
  return (
    <section id="about" className="relative py-28 text-white">
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.04] via-transparent to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col gap-4"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.35em] text-slate-200/80">
            About
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight max-w-3xl">
            Researcher focused on making deep learning systems transparent, resilient, and human-aligned.
          </h2>
        </motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="relative rounded-[30px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl shadow-[0_18px_60px_rgba(15,11,36,0.45)]"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="relative h-28 w-28 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  <Image src="/profile.png" alt="Le Nguyen Gia Hung" fill className="object-cover" />
                </div>
                <div className="space-y-2 text-left">
                  <p className="text-sm uppercase tracking-[0.4em] text-slate-300/70">Le Nguyen Gia Hung</p>
                  <h3 className="text-2xl font-semibold text-white">AI/ML Research Student - FPT University</h3>
                  <p className="text-sm text-slate-300/80">B.Eng Artificial Intelligence - Expected Dec 2027</p>
                </div>
              </div>

              <div className="space-y-4 text-base text-slate-200/85 leading-relaxed">
                <p>
                  I design neural architectures that institutions can trust. My recent work, SmokeNet, delivers
                  interpretable air-quality forecasts with measurable impact on public-health decision making.
                </p>
                <p>
                  Within SpeedyLabX, I mentor and collaborate with peers to translate research into deployable tools -
                  from multimodal speech interfaces to safety compliance monitoring.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                <a
                  href="/HungLNG_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-sky-400 px-5 py-2.5 text-sm font-semibold tracking-wide shadow-[0_0_30px_rgba(133,76,255,0.45)] transition-transform duration-300 hover:scale-105"
                >
                  <FaDownload />
                  Resume
                </a>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-semibold tracking-wide text-slate-100 transition-all duration-300 hover:bg-white/20"
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
            transition={{ delay: 0.2, duration: 0.7 }}
            className="grid gap-6"
          >
            {highlightCards.map((card) => (
              <div
                key={card.title}
                className="rounded-[26px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl shadow-[0_18px_45px_rgba(11,8,25,0.45)]"
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

            <div className="rounded-[26px] border border-teal-300/20 bg-gradient-to-br from-sky-500/20 via-purple-500/10 to-transparent p-6 backdrop-blur-xl shadow-[0_20px_60px_rgba(22,30,60,0.45)]">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-200/80">Contact Switches</p>
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
                  <p className="font-semibold">Research internships - Deep learning collaborations</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
