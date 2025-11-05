'use client'; // Mark as client component because of Typewriter

import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect'; // Import Typewriter
import HeroShape from './HeroShape'; // Import the 3D shape

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-[#05010a] text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(86,31,187,0.35)_0%,_rgba(5,1,10,0.95)_55%,_rgba(5,1,10,1)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.15),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.18),transparent_40%)]" />

      <HeroShape />

      <div className="relative z-10 w-full px-6 md:px-10 lg:px-16 py-32">
        <div className="max-w-6xl mx-auto grid gap-16 lg:gap-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-center">
          <div className="space-y-10 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs uppercase tracking-[0.4em] text-slate-200/80"
            >
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-400 via-fuchsia-500 to-sky-400 animate-pulse" />
              AI / ML Research
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="space-y-6"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-[4.2rem] font-semibold leading-tight tracking-tight">
                Crafting interpretable intelligence for the next wave of human-centric AI.
              </h1>

              <div className="text-lg md:text-xl text-slate-200/90">
                <Typewriter
                  options={{
                    strings: [
                      'AI/ML Research Student | SmokeNet Lead Author',
                      'Explainable AI Specialist for Time-Series Forecasting',
                      'Multimodal Speech Emotion Recognition Explorer',
                      'Founder @ SpeedyLabX - Applied AI Collective',
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 65,
                    deleteSpeed: 40,
                    wrapperClassName: 'inline-block bg-gradient-to-r from-purple-200 to-sky-200 bg-clip-text text-transparent',
                    cursorClassName: 'text-purple-200',
                  }}
                />
              </div>
            </motion.div>

            <motion.p
              className="max-w-2xl text-base md:text-lg text-slate-300/85 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
            >
              I research neural architectures that can be trusted in high-impact environments. From <span className="text-purple-200">SmokeNet</span> (accepted at AJCAI 2025) to ongoing Conformer-GAT multimodal work, my focus is on transparency, resilience, and meaningful human feedback.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
            >
              <a
                href="/HungLNG_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-sky-400 px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_0_25px_rgba(129,71,255,0.45)] transition-transform duration-300 hover:scale-105"
              >
                Download Resume
                <span className="text-lg transition-transform group-hover:translate-x-1">↗</span>
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold tracking-wide text-slate-100 transition-all duration-300 hover:bg-white/10"
              >
                Explore Projects
                <span className="text-base">→</span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="grid w-full max-w-2xl grid-cols-2 sm:grid-cols-3 gap-4 pt-6"
            >
              {[
                { label: 'AJCAI 2025', value: 'SmokeNet Lead Author' },
                { label: 'SpeedyLabX', value: 'Founder & Lead' },
                { label: 'Focus', value: 'Explainable AI / SER' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 backdrop-blur-xl"
                >
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-300/70">{item.label}</p>
                  <p className="mt-2 text-sm font-semibold text-slate-50">{item.value}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[32px] border border-white/5 bg-white/[0.01] backdrop-blur-3xl" />
            <motion.div
              className="relative rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent p-6 shadow-[0_25px_70px_rgba(24,10,39,0.55)]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.45em] text-slate-300/70">Live Research Feed</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-500/40 to-sky-400/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-50">
                    Active
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  </span>
                </div>
                <div className="space-y-4 text-sm text-slate-200/90">
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-300/60">Now</p>
                    <p className="mt-2 font-semibold text-slate-100">Conformer-GAT fusion research sprint</p>
                    <p className="mt-1 text-slate-300/75">Blending Conformer time dynamics with graph attention to surface emotionally aware insights.</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-300/60">Recent</p>
                    <p className="mt-2 font-semibold text-slate-100">SmokeNet accepted to AJCAI 2025</p>
                    <p className="mt-1 text-slate-300/75">Transformer forecasts with MAE 0.7470 & R^2 0.9545 - interpretable health alerts for Melbourne.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-3 text-xs uppercase tracking-[0.6em] text-slate-300/60"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <span className="h-px w-10 bg-gradient-to-r from-transparent via-slate-500/60 to-transparent" />
        Scroll to dive deeper
        <span className="h-px w-10 bg-gradient-to-r from-transparent via-slate-500/60 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero; 
