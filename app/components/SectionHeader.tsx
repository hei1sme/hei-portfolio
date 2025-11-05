'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}) => {
  const alignment =
    align === 'center'
      ? 'items-center text-center justify-center mx-auto'
      : 'items-start text-left';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6 }}
      className={`flex w-full max-w-4xl flex-col gap-4 ${alignment} ${className}`}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.35em] text-slate-200/70 shadow-[0_0_18px_rgba(168,85,247,0.25)]">
        {eyebrow}
      </span>
      <h2 className="text-balance text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-tight text-white">
        {title}
      </h2>
      {description && (
        <p className="max-w-3xl text-sm sm:text-base text-slate-200/80 leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
