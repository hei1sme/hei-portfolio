'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import { FaFileAlt, FaRocket, FaExternalLinkAlt } from 'react-icons/fa';

interface Milestone {
  id: string;
  month: string;
  year: string;
  title: string;
  tagline: string;
  icon: React.ReactNode;
  color: string;
  image: string;
  stat: { value: string; label: string };
  link?: string;
}

const milestones: Milestone[] = [
  {
    id: 'speedylabx',
    month: 'June',
    year: '2025',
    title: 'SpeedyLabX',
    tagline: 'Built a research team from scratch',
    icon: <FaRocket />,
    color: '#ec4899',
    image: '/images/experience/1_SpeedyLabX/1_1_slx.png',
    stat: { value: '10', label: 'researchers united' },
  },
  {
    id: 'smokenet',
    month: 'December',
    year: '2025',
    title: 'First Publication',
    tagline: 'SmokeNet accepted at AJCAI 2025',
    icon: <FaFileAlt />,
    color: '#a855f7',
    image: '/images/experience/2_SmokeNet/2_1_SN.jpg',
    stat: { value: '57.7%', label: 'improvement achieved' },
    link: 'https://doi.org/10.1007/978-981-95-4969-6_34',
  },
];

// Animated counter with glow
const Counter: React.FC<{ value: string; color: string }> = ({ value, color }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (isInView) {
      const numericPart = parseFloat(value.replace(/[^0-9.]/g, ''));
      const suffix = value.replace(/[0-9.]/g, '');
      const duration = 2000;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = numericPart * eased;
        setDisplayValue(current.toFixed(value.includes('.') ? 1 : 0) + suffix);
        if (progress < 1) requestAnimationFrame(animate);
      };
      animate();
    }
  }, [isInView, value]);

  return (
    <span
      ref={ref}
      className="text-6xl md:text-8xl font-black tabular-nums"
      style={{
        color,
        textShadow: `0 0 30px ${color}80, 0 0 60px ${color}40`
      }}
    >
      {displayValue}
    </span>
  );
};

// Animated text that reveals letter by letter
const AnimatedText: React.FC<{
  text: string;
  className?: string;
  color?: string;
  delay?: number;
  glow?: boolean;
}> = ({ text, className = '', color, delay = 0, glow = false }) => {
  const letters = text.split('');

  return (
    <span className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.03,
            ease: 'easeOut'
          }}
          style={glow && color ? {
            color,
            textShadow: `0 0 20px ${color}60, 0 0 40px ${color}30`
          } : { color }}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  );
};

// Glowing text component
const GlowText: React.FC<{
  children: React.ReactNode;
  color: string;
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}> = ({ children, color, intensity = 'medium', className = '' }) => {
  const shadows = {
    low: `0 0 10px ${color}40`,
    medium: `0 0 20px ${color}60, 0 0 40px ${color}30`,
    high: `0 0 30px ${color}80, 0 0 60px ${color}50, 0 0 100px ${color}30`,
  };

  return (
    <span
      className={className}
      style={{ color, textShadow: shadows[intensity] }}
    >
      {children}
    </span>
  );
};

// Split screen milestone with glow effects
const SplitMilestone: React.FC<{ milestone: Milestone; index: number; isReversed: boolean }> = ({
  milestone, index, isReversed
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div ref={ref} className="min-h-[80vh] md:min-h-screen flex items-center py-12 md:py-20">
      <div className={`w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center`}>

        {/* Image side with glow border */}
        <motion.div
          style={{ y: imageY }}
          className={`relative ${isReversed ? 'md:order-2' : 'md:order-1'}`}
        >
          <div
            className="relative aspect-[4/3] rounded-3xl overflow-hidden group"
            style={{
              boxShadow: `0 0 60px ${milestone.color}30, 0 0 120px ${milestone.color}15`
            }}
          >
            {/* Animated border glow */}
            <motion.div
              className="absolute -inset-1 rounded-3xl opacity-50"
              style={{ background: `linear-gradient(45deg, ${milestone.color}, transparent, ${milestone.color})` }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            />

            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <Image
                src={milestone.image}
                alt={milestone.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(135deg, ${milestone.color}40 0%, transparent 50%)` }}
              />
            </div>

            {/* Index badge with glow */}
            <div
              className="absolute top-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-white z-10"
              style={{
                backgroundColor: milestone.color,
                boxShadow: `0 0 20px ${milestone.color}80`
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </div>
          </div>
        </motion.div>

        {/* Content side */}
        <motion.div
          style={{ y: contentY }}
          className={`space-y-6 ${isReversed ? 'md:order-1 md:text-right' : 'md:order-2'}`}
        >
          {/* Date with letter animation */}
          <div>
            <AnimatedText
              text={milestone.month}
              className="text-4xl sm:text-5xl md:text-6xl font-black"
              color={milestone.color}
              glow={true}
            />
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl font-light text-white/30 ml-2 md:ml-3"
            >
              {milestone.year}
            </motion.span>
          </div>

          {/* Title with glow */}
          <motion.h3
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
            style={{ textShadow: '0 0 30px rgba(255,255,255,0.1)' }}
          >
            {milestone.title}
          </motion.h3>

          {/* Tagline with shimmer */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-white/60 relative"
          >
            {milestone.tagline}
          </motion.p>

          {/* Stat with counter and intense glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`inline-block ${isReversed ? 'md:ml-auto' : ''}`}
          >
            <div
              className="px-8 py-5 rounded-2xl border backdrop-blur-sm relative overflow-hidden"
              style={{
                borderColor: `${milestone.color}50`,
                backgroundColor: `${milestone.color}15`,
                boxShadow: `0 0 40px ${milestone.color}25, inset 0 0 30px ${milestone.color}10`
              }}
            >
              {/* Inner glow effect */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${milestone.color}60 0%, transparent 70%)`
                }}
              />
              <div className="relative z-10">
                <Counter value={milestone.stat.value} color={milestone.color} />
                <p className="text-base text-white/50 mt-1">{milestone.stat.label}</p>
              </div>
            </div>
          </motion.div>

          {/* Link with glow hover */}
          {milestone.link && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <a
                href={milestone.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-lg font-medium hover:gap-3 transition-all group"
                style={{ color: milestone.color }}
              >
                <span className="group-hover:drop-shadow-[0_0_10px_var(--tw-shadow-color)]" style={{ '--tw-shadow-color': milestone.color } as React.CSSProperties}>
                  Read the paper
                </span>
                <FaExternalLinkAlt className="text-sm" />
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-20">
      {/* Header with dramatic animations */}
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center px-6"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.2em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.4em' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-sm uppercase text-pink-400 mb-6"
            style={{ textShadow: '0 0 20px #ec489980' }}
          >
            The Story
          </motion.p>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4">
            <AnimatedText text="Two " className="text-white" delay={0.2} />
            <br className="md:hidden" />
            <GlowText
              color="#ec4899"
              intensity="high"
              className="bg-gradient-to-r from-pink-400 via-purple-400 to-violet-400 bg-clip-text text-transparent"
            >
              <AnimatedText text="Milestones" delay={0.4} />
            </GlowText>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="text-xl text-white/40"
          >
            That defined 2025
          </motion.p>
        </motion.div>
      </div>

      {/* Milestones */}
      {milestones.map((milestone, index) => (
        <SplitMilestone
          key={milestone.id}
          milestone={milestone}
          index={index}
          isReversed={index % 2 === 1}
        />
      ))}

      {/* Closing with subtle glow */}
      <div className="py-32 flex items-center justify-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-2xl md:text-3xl font-bold text-white/20"
          style={{ textShadow: '0 0 40px rgba(168,85,247,0.2)' }}
        >
          2026 loading...
        </motion.p>
      </div>
    </section>
  );
};

export default Experience;
