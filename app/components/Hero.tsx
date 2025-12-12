'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import Typewriter from 'typewriter-effect';
import { FaFileAlt, FaRocket, FaBrain, FaArrowRight } from 'react-icons/fa';
import HeroShape from './HeroShape';
import AchievementBadge from './AchievementBadge';
import StatsRow from './StatsRow';
import MagneticButton from './MagneticButton';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();

  // Parallax transforms based on scroll
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentY = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-[#05010a] text-white overflow-hidden"
    >
      {/* Background gradients with parallax */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(86,31,187,0.35)_0%,_rgba(5,1,10,0.95)_55%,_rgba(5,1,10,1)_100%)]"
      />
      <Parallax speed={-10} className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.15),transparent_45%)]" />
      </Parallax>
      <Parallax speed={-5} className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.18),transparent_40%)]" />
      </Parallax>

      {/* 3D Shape with parallax */}
      <Parallax speed={-15} className="absolute inset-0">
        <HeroShape />
      </Parallax>

      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 w-full px-5 md:px-8 lg:px-10 py-20"
      >
        <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-10">

          {/* Top section: Title + Achievements */}
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-start">

            {/* Left: Name & Title */}
            <div className="space-y-6">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-xs uppercase tracking-[0.4em] text-slate-200/85 shadow-[0_0_22px_rgba(129,71,255,0.25)]"
              >
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-400 via-fuchsia-500 to-sky-400 animate-pulse" />
                Applied AI Researcher
              </motion.div>

              {/* Main Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.7 }}
                className="space-y-4"
              >
                <h1 className="text-balance text-[2.75rem] sm:text-[3.1rem] lg:text-[3.5rem] font-semibold leading-[1.05] tracking-tight">
                  Building{' '}
                  <span className="animated-gradient-text">
                    transparent AI
                  </span>{' '}
                  for high-stakes decisions.
                </h1>

                {/* Typewriter roles */}
                <div className="text-base md:text-lg text-slate-200/90">
                  <Typewriter
                    options={{
                      strings: [
                        'SmokeNet Lead — AJCAI 2025',
                        'SpeedyLabX Founder',
                        'XAI Practitioner',
                        'Multimodal Researcher',
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 50,
                      deleteSpeed: 30,
                      wrapperClassName: 'inline-block bg-gradient-to-r from-purple-200 to-sky-200 bg-clip-text text-transparent font-medium',
                      cursorClassName: 'text-purple-200',
                    }}
                  />
                </div>
              </motion.div>

              {/* Achievement Badges - Visual Proof */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex flex-wrap gap-3"
              >
                <AchievementBadge
                  icon={<FaFileAlt className="text-purple-300" />}
                  title="AJCAI 2025"
                  detail="Peer-Reviewed Publication"
                  glowColor="purple"
                  delay={0.3}
                />
                <AchievementBadge
                  icon={<FaRocket className="text-sky-300" />}
                  title="SpeedyLabX"
                  detail="AI Research Collective"
                  glowColor="sky"
                  delay={0.4}
                />
                <AchievementBadge
                  icon={<FaBrain className="text-teal-300" />}
                  title="XAI Focus"
                  detail="Explainable AI Systems"
                  glowColor="teal"
                  delay={0.5}
                />
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap gap-3 pt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7 }}
              >
                <MagneticButton>
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
                </MagneticButton>
                <MagneticButton>
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold tracking-wide text-slate-100 transition-all duration-300 hover:bg-white/12"
                    data-interactive
                  >
                    Explore Projects
                    <FaArrowRight className="text-sm" />
                  </a>
                </MagneticButton>
              </motion.div>
            </div>

            {/* Right: Research Spotlight - Simplified */}
            <Parallax speed={5}>
              <div className="relative">
                <div className="absolute -inset-5 rounded-[28px] border border-white/5 bg-white/[0.015] backdrop-blur-3xl" />
                <motion.div
                  className="relative overflow-hidden rounded-[26px] border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent p-6 shadow-[0_22px_70px_rgba(24,10,39,0.5)]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.24, duration: 0.8 }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-xs uppercase tracking-[0.45em] text-slate-300/70">Research Focus</p>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-50">
                      2025
                    </span>
                  </div>

                  {/* Simplified Research Cards */}
                  <div className="space-y-3">
                    <div className="group rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20">
                      <div className="flex items-start gap-3">
                        <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl border border-purple-400/30 bg-purple-500/20 text-purple-300">
                          <FaFileAlt />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">SmokeNet</p>
                          <p className="text-xs text-slate-300/80 mt-1">
                            PM₂.₅ forecasting with SHAP + IG overlays
                          </p>
                          <div className="flex gap-2 mt-2">
                            <span className="rounded-md bg-purple-500/20 px-2 py-0.5 text-[10px] font-medium text-purple-200">MAE 0.7470</span>
                            <span className="rounded-md bg-sky-500/20 px-2 py-0.5 text-[10px] font-medium text-sky-200">R² 0.9545</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20">
                      <div className="flex items-start gap-3">
                        <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl border border-sky-400/30 bg-sky-500/20 text-sky-300">
                          <FaBrain />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">Conformer-GAT</p>
                          <p className="text-xs text-slate-300/80 mt-1">
                            Multimodal speech emotion recognition
                          </p>
                          <div className="flex gap-2 mt-2">
                            <span className="rounded-md bg-sky-500/20 px-2 py-0.5 text-[10px] font-medium text-sky-200">IEMOCAP</span>
                            <span className="rounded-md bg-teal-500/20 px-2 py-0.5 text-[10px] font-medium text-teal-200">RAVDESS</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Tags */}
                  <div className="mt-4 flex flex-wrap gap-2 text-[10px] text-slate-300/70">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                      Reproducible notebooks
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                      XAI dashboards
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                      SpeedyLabX workshops
                    </span>
                  </div>
                </motion.div>
              </div>
            </Parallax>
          </div>

          {/* Stats Row - Immediate Impact */}
          <StatsRow />

          {/* Scroll Indicator */}
          <motion.div
            className="relative flex flex-col items-center gap-4 rounded-[20px] border border-white/10 bg-white/[0.02] px-6 py-5 text-[11px] uppercase tracking-[0.5em] text-slate-300/65 backdrop-blur-3xl shadow-[0_14px_45px_rgba(20,12,40,0.4)] sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            <div className="flex items-center gap-3 text-[11px]">
              <motion.span
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-400 to-sky-400"
              />
              Scroll to explore
            </div>
            <span className="hidden sm:block h-px w-8 bg-gradient-to-r from-transparent via-slate-500/50 to-transparent" />
            <div className="flex items-center gap-3 text-[11px]">
              <span className="rounded-full border border-white/10 px-3 py-1">Projects</span>
              <span className="rounded-full border border-white/10 px-3 py-1">Skills</span>
              <span className="rounded-full border border-white/10 px-3 py-1">Experience</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
