'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EntranceAnimationProps {
  onAnimationComplete: () => void;
}

const EntranceAnimation: React.FC<EntranceAnimationProps> = ({ onAnimationComplete }) => {
  const [phase, setPhase] = useState<'name' | 'reveal' | 'done'>('name');

  const firstName = "LE NGUYEN";
  const lastName = "GIA HUNG";

  useEffect(() => {
    // Phase 1: Name animation plays (2.5s)
    const nameTimer = setTimeout(() => {
      setPhase('reveal');
    }, 2500);

    // Phase 2: Reveal/exit animation (0.8s)
    const revealTimer = setTimeout(() => {
      setPhase('done');
      onAnimationComplete();
    }, 3300);

    return () => {
      clearTimeout(nameTimer);
      clearTimeout(revealTimer);
    };
  }, [onAnimationComplete]);

  // Letter animation variants
  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1], // Custom easing
      },
    }),
  };

  // Container animation for the reveal
  const containerVariants = {
    initial: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: 'blur(10px)',
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Gradient line animation
  const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        delay: 1.2,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
          variants={containerVariants}
          initial="initial"
          exit="exit"
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(147,51,234,0.15)_0%,_transparent_70%)]" />
          </div>

          {/* Name container */}
          <div className="relative z-10 text-center">
            {/* First name line */}
            <div className="overflow-hidden mb-2">
              <motion.div
                className="flex justify-center gap-[0.05em] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.2em] text-white/90"
                style={{ perspective: 1000 }}
              >
                {firstName.split('').map((char, i) => (
                  <motion.span
                    key={`first-${i}`}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className={char === ' ' ? 'w-[0.3em]' : ''}
                    style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Last name line - starts after first name */}
            <div className="overflow-hidden">
              <motion.div
                className="flex justify-center gap-[0.05em] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.15em]"
                style={{ perspective: 1000 }}
              >
                {lastName.split('').map((char, i) => (
                  <motion.span
                    key={`last-${i}`}
                    custom={i + firstName.length}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent"
                    style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Gradient line underneath */}
            <motion.div
              className="mt-6 h-[2px] w-32 mx-auto origin-center bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-500"
              variants={lineVariants}
              initial="hidden"
              animate="visible"
            />

            {/* Tagline */}
            <motion.p
              className="mt-6 text-sm sm:text-base tracking-[0.4em] uppercase text-white/50 font-light"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              Applied AI Researcher
            </motion.p>
          </div>

          {/* Floating particles (decorative) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-purple-400/30"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                  opacity: 0,
                }}
                animate={{
                  y: [null, -100],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  delay: 0.5 + i * 0.2,
                  duration: 2,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EntranceAnimation;