'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon: React.ReactNode;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  suffix = '',
  prefix = '',
  label,
  icon,
  duration = 2,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 via-transparent to-sky-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10 grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/10 text-xl">
        {icon}
      </div>
      
      <div className="relative z-10 text-center">
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-200 via-fuchsia-200 to-sky-200 bg-clip-text text-transparent">
          {prefix}{count}{suffix}
        </span>
        <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-slate-300/70">
          {label}
        </p>
      </div>
    </motion.div>
  );
};

export default AnimatedCounter;
