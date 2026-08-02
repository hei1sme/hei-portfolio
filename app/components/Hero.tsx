'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import HeroShape from './HeroShape';
import MagneticButton from './MagneticButton';
import FloatingElements from './FloatingElements';
import { AnimatedText, GlowText } from './AnimationUtils';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const glowRef = useRef<HTMLDivElement>(null);

  // Parallax transforms based on scroll
  const contentY = useTransform(scrollY, [0, 500], [0, -80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Mouse follow effect (direct DOM update, zero React re-renders)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(147, 51, 234, 0.15), transparent 40%)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden"
    >
      {/* Mouse-follow glow */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed inset-0 z-0 opacity-50"
      />

      {/* Ambient background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(88,28,135,0.25)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(34,197,94,0.08)_0%,_transparent_50%)]" />

      {/* 3D Shape - More prominent */}
      <Parallax speed={-10} className="absolute inset-0">
        <HeroShape />
      </Parallax>

      {/* Draggable floating elements */}
      <FloatingElements />

      {/* Main Content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center"
      >
        {/* Giant Headline */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block text-white/90">
            <AnimatedText text="Building" delay={0.3} />
          </span>
          <motion.span
            className="block mt-2 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-green-400 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]"
            animate={{
              filter: [
                'drop-shadow(0 0 20px rgba(168,85,247,0.4))',
                'drop-shadow(0 0 40px rgba(168,85,247,0.6))',
                'drop-shadow(0 0 20px rgba(168,85,247,0.4))',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <AnimatedText text="Transparent AI" delay={0.5} glow={true} glowColor="#a855f7" />
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-8 text-lg sm:text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <GlowText color="#a855f7" intensity="low">
            AI Research Engineer · Time-Series & Multimodal XAI
          </GlowText>
          <br />
          <span className="text-white/40">Research · Development · Impact</span>
        </motion.p>

        {/* Single CTA */}
        <motion.div
          className="mt-12 flex justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <MagneticButton>
            <a
              href="/HungLNG_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition-all duration-300 hover:bg-white/90 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
              data-interactive
            >
              View Resume
              <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#projects"
              className="inline-flex items-center gap-3 rounded-full border border-white/20 px-8 py-4 text-base font-medium text-white/80 transition-all duration-300 hover:border-white/40 hover:text-white hover:bg-white/5"
              data-interactive
            >
              See Projects
            </a>
          </MagneticButton>
        </motion.div>

        {/* Minimal scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-2"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-white/50"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
