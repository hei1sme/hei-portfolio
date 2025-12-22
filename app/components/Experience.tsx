'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from 'framer-motion';
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
    month: 'January',
    year: '2025',
    title: 'SpeedyLabX',
    tagline: 'Founded a student research group',
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

// Animated marquee text
const MarqueeText: React.FC<{ text: string; speed?: number }> = ({ text, speed = 30 }) => {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-block"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
      >
        <span className="text-8xl md:text-[12rem] font-black text-white/[0.03] uppercase tracking-wider">
          {text}&nbsp;&nbsp;&nbsp;{text}&nbsp;&nbsp;&nbsp;
        </span>
      </motion.div>
    </div>
  );
};

// Animated counter
const Counter: React.FC<{ value: string; color: string; isActive: boolean }> = ({ value, color, isActive }) => {
  const [displayValue, setDisplayValue] = useState('0');
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isActive && !hasAnimated.current) {
      hasAnimated.current = true;
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
  }, [isActive, value]);

  return (
    <span
      className="text-4xl md:text-6xl font-black tabular-nums transition-all duration-500"
      style={{
        color,
        textShadow: isActive ? `0 0 30px ${color}80, 0 0 60px ${color}40` : 'none',
        opacity: isActive ? 1 : 0.5,
      }}
    >
      {displayValue}
    </span>
  );
};

// Single milestone card with scroll-triggered effects
const MilestoneCard: React.FC<{
  milestone: Milestone;
  index: number;
  isActive: boolean;
  mousePos: { x: number; y: number };
}> = ({ milestone, index, isActive, mousePos }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // 3D tilt effect based on global mouse (only when active)
  useEffect(() => {
    if (!imageRef.current || !isActive) {
      setTilt({ x: 0, y: 0 });
      return;
    }

    const rect = imageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = mousePos.x - centerX;
    const distY = mousePos.y - centerY;
    const maxDist = 500;
    const dist = Math.sqrt(distX * distX + distY * distY);
    const influence = Math.max(0, 1 - dist / maxDist);

    setTilt({
      x: -(distY / 300) * 20 * influence,
      y: (distX / 300) * 20 * influence,
    });
  }, [mousePos, isActive]);

  const springTiltX = useSpring(tilt.x, { stiffness: 100, damping: 20 });
  const springTiltY = useSpring(tilt.y, { stiffness: 100, damping: 20 });

  return (
    <motion.div
      ref={cardRef}
      className="relative py-16 md:py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center transition-all duration-700 ${isActive ? 'scale-100' : 'scale-90 opacity-60'}`}>

        {/* Content side */}
        <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
          {/* Date */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-baseline gap-3"
          >
            <span
              className="text-5xl md:text-6xl font-black transition-all duration-500"
              style={{
                color: milestone.color,
                textShadow: isActive ? `0 0 40px ${milestone.color}80` : 'none',
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {milestone.month}
            </span>
            <span className="text-3xl font-light text-white/30">{milestone.year}</span>
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white transition-all duration-500"
            style={{ transform: isActive ? 'translateX(0)' : 'translateX(-10px)' }}
          >
            {milestone.title}
          </motion.h3>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl text-white/60"
          >
            {milestone.tagline}
          </motion.p>

          {/* Stat */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-6 py-4 rounded-2xl border backdrop-blur-sm transition-all duration-500"
            style={{
              borderColor: isActive ? `${milestone.color}60` : `${milestone.color}30`,
              backgroundColor: `${milestone.color}10`,
              boxShadow: isActive ? `0 0 50px ${milestone.color}30` : 'none',
            }}
          >
            <Counter value={milestone.stat.value} color={milestone.color} isActive={isActive} />
            <p className="text-sm text-white/50 mt-1">{milestone.stat.label}</p>
          </motion.div>

          {/* Link */}
          {milestone.link && (
            <motion.a
              href={milestone.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-lg font-medium transition-all hover:gap-3"
              style={{ color: milestone.color }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span>Read the paper</span>
              <FaExternalLinkAlt className="text-sm" />
            </motion.a>
          )}
        </div>

        {/* Image side with 3D perspective */}
        <div
          ref={imageRef}
          className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}
          style={{ perspective: '1200px' }}
        >
          <motion.div
            className="relative aspect-[16/10] rounded-3xl overflow-hidden cursor-pointer group"
            style={{
              rotateX: springTiltX,
              rotateY: springTiltY,
              transformStyle: 'preserve-3d',
              boxShadow: isActive
                ? `0 30px 60px -15px rgba(0,0,0,0.6), 0 0 100px ${milestone.color}40, ${tilt.y}px ${-tilt.x}px 60px ${milestone.color}30`
                : `0 20px 40px -10px rgba(0,0,0,0.4)`,
              transition: 'box-shadow 0.5s ease-out',
            }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Animated border glow */}
            <motion.div
              className="absolute -inset-[2px] rounded-3xl"
              style={{
                background: `linear-gradient(45deg, ${milestone.color}, transparent 30%, transparent 70%, ${milestone.color})`,
                backgroundSize: '300% 300%',
                opacity: isActive ? 1 : 0.3,
                transition: 'opacity 0.5s',
              }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />

            {/* Image container */}
            <div className="absolute inset-[2px] rounded-3xl overflow-hidden bg-black">
              <Image
                src={milestone.image}
                alt={milestone.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${milestone.color}40 0%, transparent 50%, rgba(0,0,0,0.3) 100%)`,
                }}
              />

              {/* Dynamic shine */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at ${50 + tilt.y * 2}% ${50 - tilt.x * 2}%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
                  opacity: isActive ? 1 : 0,
                }}
              />
            </div>

            {/* Index badge */}
            <div
              className="absolute top-6 left-6 w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white z-10 transition-all duration-500"
              style={{
                backgroundColor: milestone.color,
                boxShadow: isActive ? `0 4px 30px ${milestone.color}80` : `0 4px 15px ${milestone.color}40`,
                transform: `translateZ(30px) scale(${isActive ? 1.1 : 1})`,
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </div>
          </motion.div>

          {/* Reflection */}
          <div
            className="mt-2 mx-4 h-16 rounded-3xl blur-lg transition-opacity duration-500"
            style={{
              background: `linear-gradient(to bottom, ${milestone.color}40, transparent)`,
              transform: 'scaleY(-0.3)',
              opacity: isActive ? 0.2 : 0.1,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(0);

  // Global mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll progress for timeline
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  });

  // Timeline dot position
  const dotProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const dotY = useTransform(dotProgress, [0, 1], ['0%', '100%']);

  // Determine active milestone based on scroll
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const newIndex = Math.min(
      milestones.length - 1,
      Math.floor(latest * milestones.length)
    );
    setActiveIndex(newIndex);
  });

  return (
    <section ref={sectionRef} id="experience" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background marquee text */}
      <div className="absolute inset-0 flex items-center opacity-50 pointer-events-none">
        <MarqueeText text="RESEARCH • INNOVATION • IMPACT" speed={40} />
      </div>

      {/* Vertical timeline line */}
      <div className="absolute left-8 md:left-16 top-0 bottom-0 hidden lg:block" ref={timelineRef}>
        {/* Background line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />

        {/* Animated progress line */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-gradient-to-b from-pink-500 via-purple-500 to-violet-500"
          style={{ height: dotY, originY: 0 }}
        />

        {/* Moving dot */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-4 border-black z-20"
          style={{
            top: dotY,
            backgroundColor: milestones[activeIndex]?.color || '#a855f7',
            boxShadow: `0 0 20px ${milestones[activeIndex]?.color || '#a855f7'}, 0 0 40px ${milestones[activeIndex]?.color || '#a855f7'}60`,
          }}
        >
          {/* Pulse effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: milestones[activeIndex]?.color || '#a855f7' }}
            animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Timeline milestone dots */}
        {milestones.map((m, i) => (
          <div
            key={m.id}
            className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-black transition-all duration-500"
            style={{
              top: `${(i + 0.5) * (100 / milestones.length)}%`,
              backgroundColor: i === activeIndex ? m.color : 'rgba(255,255,255,0.2)',
              boxShadow: i === activeIndex ? `0 0 15px ${m.color}` : 'none',
              transform: `translateX(-50%) scale(${i === activeIndex ? 1.5 : 1})`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 text-center px-6 mb-16 md:mb-24">
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.2em' }}
          whileInView={{ opacity: 1, letterSpacing: '0.4em' }}
          viewport={{ once: true }}
          className="text-sm uppercase text-pink-400 mb-6"
          style={{ textShadow: '0 0 20px #ec489980' }}
        >
          The Journey
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl lg:text-8xl font-black"
        >
          <span className="text-white">My </span>
          <span
            className="bg-gradient-to-r from-pink-400 via-purple-400 to-violet-400 bg-clip-text text-transparent"
            style={{ filter: 'drop-shadow(0 0 30px rgba(236,72,153,0.5))' }}
          >
            Timeline
          </span>
        </motion.h2>

        {/* Animated subtitle */}
        <motion.div
          className="mt-6 text-xl text-white/40 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            Key moments that shaped 2025
          </motion.span>
        </motion.div>
      </div>

      {/* Milestone cards */}
      <div className="relative lg:ml-24">
        {milestones.map((milestone, index) => (
          <MilestoneCard
            key={milestone.id}
            milestone={milestone}
            index={index}
            isActive={activeIndex === index}
            mousePos={mousePos}
          />
        ))}
      </div>

      {/* Ending */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-20 text-center"
      >
        <motion.span
          className="text-3xl md:text-4xl font-bold text-white/20 inline-block"
          style={{ textShadow: '0 0 40px rgba(168,85,247,0.2)' }}
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          2026 loading...
        </motion.span>
      </motion.div>
    </section>
  );
};

export default Experience;
