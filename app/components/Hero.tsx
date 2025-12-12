'use client'; // Mark as client component because of Typewriter

import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect'; // Import Typewriter
import HeroShape from './HeroShape'; // Import the 3D shape
// import { useLab } from '../context/LabContext';

const Hero: React.FC = () => {
  // const { openLab } = useLab();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-[#05010a] text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(86,31,187,0.35)_0%,_rgba(5,1,10,0.95)_55%,_rgba(5,1,10,1)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.15),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.18),transparent_40%)]" />

      <HeroShape />

      <div className="relative z-10 w-full px-5 md:px-8 lg:px-10 py-20">
        <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-start">
            <div className="space-y-9">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-xs uppercase tracking-[0.4em] text-slate-200/85 shadow-[0_0_22px_rgba(129,71,255,0.25)]"
              >
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-400 via-fuchsia-500 to-sky-400 animate-pulse" />
                Applied AI Researcher
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.7 }}
                className="space-y-6"
              >
                <h1 className="text-balance text-[2.75rem] sm:text-[3.1rem] lg:text-[3.35rem] font-semibold leading-[1.05] tracking-tight">
                  Designing <span className="bg-gradient-to-r from-purple-200 via-fuchsia-200 to-sky-200 bg-clip-text text-transparent">transparent AI systems</span> people can trust in high-stakes environments.
                </h1>

                <div className="text-base md:text-lg text-slate-200/90">
                  <Typewriter
                    options={{
                      strings: [
                        'SmokeNet lead author — AJCAI 2025, interpretable air-quality forecasts',
                        'Conformer-GAT explorer — multimodal speech emotion recognition',
                        'SpeedyLabX founder — orchestrating a six-member applied AI collective',
                        'XAI practitioner — SHAP, IG, DiCE, counterfactual tooling',
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 55,
                      deleteSpeed: 35,
                      wrapperClassName: 'inline-block bg-gradient-to-r from-purple-200 to-sky-200 bg-clip-text text-transparent',
                      cursorClassName: 'text-purple-200',
                    }}
                  />
                </div>
              </motion.div>

              <motion.p
                className="max-w-2xl text-base md:text-[1.05rem] text-slate-300/85 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.7 }}
              >
                I steward research that keeps humans in the loop — from <span className="text-purple-200">SmokeNet&apos;s</span> city-scale, auditable forecasts to playful interactive labs that expose optimisation trade-offs. My work blends rigorous experimentation with narrative tooling so stakeholders can see, probe, and trust model decisions.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                <a
                  href="/HungLNG_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-sky-400 px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_0_30px_rgba(129,71,255,0.4)] transition-transform duration-300 hover:scale-105"
                  data-interactive
                >
                  Download Resume
                  <span className="text-lg transition-transform group-hover:translate-x-1">↗</span>
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold tracking-wide text-slate-100 transition-all duration-300 hover:bg-white/12"
                  data-interactive
                >
                  Explore Projects
                  <span className="text-base">→</span>
                </a>
              </motion.div>

            </div>

            <div className="relative">
              <div className="absolute -inset-5 rounded-[28px] border border-white/5 bg-white/[0.015] backdrop-blur-3xl" />
              <motion.div
                className="relative overflow-hidden rounded-[26px] border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent p-5 shadow-[0_22px_70px_rgba(24,10,39,0.5)]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24, duration: 0.8 }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.45em] text-slate-300/70">Research Spotlight</p>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-50">
                    2025 Roadmap
                  </span>
                </div>

                <div className="mt-4 space-y-4 text-sm text-slate-200/90">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3.5">
                    <p className="text-xs uppercase tracking-[0.35em] text-purple-200/80">SmokeNet</p>
                    <p className="mt-1 text-sm font-semibold text-white">Explainable PM<sub>2.5</sub> forecasting for Melbourne</p>
                    <p className="mt-2 text-[13px] leading-relaxed text-slate-300/80">
                      Deploying interpretable dashboards with SHAP + IG overlays and alert automations for environmental agencies.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3.5">
                    <p className="text-xs uppercase tracking-[0.35em] text-sky-200/80">Conformer-GAT</p>
                    <p className="mt-1 text-sm font-semibold text-white">Multimodal speech emotion recognition tooling</p>
                    <p className="mt-2 text-[13px] leading-relaxed text-slate-300/80">
                      Building emotionally-aware dialogue assistants with graph reasoning and human-in-the-loop evaluation suites.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-300/70">Core Signals</p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3 text-[12px] text-slate-200/85">
                      <div className="rounded-xl border border-white/10 bg-white/10 p-3">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-slate-300/70">Peer-reviewed</p>
                        <p className="mt-1 text-sm font-semibold text-white">AJCAI 2025</p>
                        <p className="text-[11px] text-slate-300/75">SmokeNet accepted with interpretable PM2.5 forecasting</p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/10 p-3">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-slate-300/70">Applied Collective</p>
                        <p className="mt-1 text-sm font-semibold text-white">SpeedyLabX</p>
                        <p className="text-[11px] text-slate-300/75">Six-person research guild translating ideas to pilots</p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/10 p-3">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-slate-300/70">Focus Stack</p>
                        <p className="mt-1 text-sm font-semibold text-white">Explainable AI</p>
                        <p className="text-[11px] text-slate-300/75">Time-series + multimodal SER with transparent signals</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-slate-300/70">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1">
                    Weekly literature synthesis drops
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1">
                    Reproducible notebooks + dashboards
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1">
                    Applied AI workshops @ SpeedyLabX
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="relative flex flex-col items-center gap-4 rounded-[24px] border border-white/10 bg-white/[0.02] px-6 py-7 text-[11px] uppercase tracking-[0.5em] text-slate-300/65 backdrop-blur-3xl shadow-[0_14px_45px_rgba(20,12,40,0.4)] sm:flex-row sm:justify-between"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <span className="hidden sm:block h-px w-10 bg-gradient-to-r from-transparent via-slate-500/50 to-transparent" />
            <div className="flex items-center gap-3 text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-400 to-sky-400 animate-ping" />
              Scroll to explore the portfolio
            </div>
            <span className="hidden sm:block h-px w-10 bg-gradient-to-r from-transparent via-slate-500/50 to-transparent" />
            <div className="flex items-center gap-3 text-[11px]">
              <span className="rounded-full border border-white/10 px-3 py-1">Projects</span>
              <span className="rounded-full border border-white/10 px-3 py-1">Skills</span>
              <span className="rounded-full border border-white/10 px-3 py-1">Experience</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
