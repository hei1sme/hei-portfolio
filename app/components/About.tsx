'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaDownload, FaRocket } from 'react-icons/fa';
import { GlowText, GlowBox } from './AnimationUtils';

const About: React.FC = () => {
  const photoRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  // Continuous mouse tracking on entire window
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!photoRef.current) return;

      const rect = photoRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate rotation based on mouse position relative to photo center
      // Limit effect range to reasonable distance
      const maxDistance = 500;
      const distX = Math.max(-maxDistance, Math.min(maxDistance, e.clientX - centerX));
      const distY = Math.max(-maxDistance, Math.min(maxDistance, e.clientY - centerY));

      const rotateY = (distX / maxDistance) * 20; // Max 20deg
      const rotateX = -(distY / maxDistance) * 20; // Max 20deg

      setRotate({ x: rotateX, y: rotateY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="about" className="relative py-20 text-white">
      <div className="relative max-w-5xl mx-auto">
        {/* Main content - clean two-column layout */}
        <div className="grid gap-12 md:grid-cols-[380px_1fr] items-start">

          {/* Left: Photo with 3D tilt effect - follows mouse */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative md:sticky md:top-24"
          >
            <div
              ref={photoRef}
              className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5"
              style={{
                transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transition: 'transform 0.15s ease-out',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

              {/* Photo */}
              <Image
                src="/profile.jpg"
                alt="Le Nguyen Gia Hung"
                fill
                className="object-cover"
                priority
              />

              {/* Dynamic shine effect based on tilt */}
              <div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${50 + rotate.y * 1.5}% ${50 - rotate.x * 1.5}%, rgba(255,255,255,0.12) 0%, transparent 50%)`,
                }}
              />

              {/* Purple glow that follows tilt */}
              <div
                className="absolute inset-0 z-30 rounded-3xl pointer-events-none"
                style={{
                  boxShadow: `${rotate.y * 1.5}px ${-rotate.x * 1.5}px 50px rgba(147, 51, 234, 0.25)`,
                }}
              />
            </div>

            {/* Name below photo */}
            <div className="mt-4 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Known as</p>
              <p
                className="mt-1 text-2xl font-black text-white"
                style={{ textShadow: '0 0 20px rgba(168,85,247,0.4)' }}
              >
                hei
              </p>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Headline */}
            <div>
              <p
                className="text-sm uppercase tracking-[0.3em] text-purple-400 mb-4"
                style={{ textShadow: '0 0 20px #a855f780' }}
              >
                About
              </p>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight"
                style={{ letterSpacing: '-0.02em' }}
              >
                Building{' '}
                <GlowText color="#a855f7" intensity="medium">
                  <span className="bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
                    transparent AI
                  </span>
                </GlowText>
                <br />
                <span className="text-white/70">that respects human agency.</span>
              </h2>
            </div>

            {/* Bio */}
            <p className="text-lg text-white/70 leading-relaxed">
              I&apos;m an undergraduate AI researcher at FPT University, focused on Explainable AI (XAI) for high-stakes domains.
              My work spans time-series forecasting, multimodal emotion recognition, and building tools that make
              AI decisions interpretable and trustworthy for real-world applications.
            </p>

            {/* Stats Row - GPA, Honors, Publication */}
            <div className="flex flex-wrap gap-4">
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-purple-400/30 bg-purple-500/10"
                style={{ boxShadow: '0 0 20px #a855f730' }}
              >
                <span className="text-2xl font-black text-purple-300">8.62</span>
                <div className="text-left">
                  <p className="text-xs text-white/50 uppercase tracking-wider">GPA</p>
                  <p className="text-sm font-medium text-white/80">/ 10.0</p>
                </div>
              </div>
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-amber-400/30 bg-amber-500/10"
                style={{ boxShadow: '0 0 20px #f59e0b30' }}
              >
                <span className="text-2xl font-black text-amber-300">3×</span>
                <div className="text-left">
                  <p className="text-xs text-white/50 uppercase tracking-wider">Honor Student</p>
                  <p className="text-sm font-medium text-white/80">Semesters 3, 4, 5</p>
                </div>
              </div>
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-green-400/30 bg-green-500/10"
                style={{ boxShadow: '0 0 20px #22c55e30' }}
              >
                <span className="text-2xl font-black text-green-300">1</span>
                <div className="text-left">
                  <p className="text-xs text-white/50 uppercase tracking-wider">Q2 Publication</p>
                  <p className="text-sm font-medium text-white/80">AJCAI 2025</p>
                </div>
              </div>
            </div>

            {/* Research Interests */}
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">Research Interests</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Explainable AI (XAI)', color: '#a855f7' },
                  { label: 'Multimodal Learning', color: '#22c55e' },
                  { label: 'Time-Series Forecasting', color: '#0ea5e9' },
                  { label: 'Speech Emotion Recognition', color: '#ec4899' },
                  { label: 'Transformer Architectures', color: '#f59e0b' },
                ].map((interest) => (
                  <motion.span
                    key={interest.label}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-3 py-1.5 text-sm font-medium rounded-full border cursor-default transition-all"
                    style={{
                      borderColor: `${interest.color}40`,
                      backgroundColor: `${interest.color}15`,
                      color: interest.color,
                      boxShadow: `0 0 15px ${interest.color}20`,
                    }}
                  >
                    {interest.label}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* SpeedyLabX highlight */}
            <GlowBox
              color="#a855f7"
              intensity="low"
              className="flex items-start gap-4 p-4 rounded-2xl bg-white/5"
            >
              <div
                className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl border border-purple-400/30 bg-purple-500/20"
                style={{ boxShadow: '0 0 20px #a855f740' }}
              >
                <FaRocket className="text-xl text-purple-300" />
              </div>
              <div>
                <p className="font-semibold text-white">SpeedyLabX Founder</p>
                <p className="text-sm text-white/60 mt-1">
                  Leading a 10-member research collective accelerating student-led AI projects
                </p>
              </div>
            </GlowBox>

            {/* CTA */}
            <div className="flex gap-4">
              <a
                href="/HungLNG_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-white/90 hover:scale-105"
              >
                <FaDownload />
                Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/80 transition-all hover:bg-white/5 hover:border-white/30"
              >
                Get in touch
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
