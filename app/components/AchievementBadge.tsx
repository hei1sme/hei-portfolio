'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AchievementBadgeProps {
    icon: React.ReactNode;
    title: string;
    detail: string;
    glowColor?: 'purple' | 'sky' | 'teal' | 'amber';
    delay?: number;
}

const glowStyles = {
    purple: 'from-purple-500/20 to-fuchsia-500/20 shadow-[0_0_25px_rgba(168,85,247,0.3)]',
    sky: 'from-sky-500/20 to-cyan-500/20 shadow-[0_0_25px_rgba(56,189,248,0.3)]',
    teal: 'from-teal-500/20 to-emerald-500/20 shadow-[0_0_25px_rgba(20,184,166,0.3)]',
    amber: 'from-amber-500/20 to-orange-500/20 shadow-[0_0_25px_rgba(245,158,11,0.3)]',
};

const AchievementBadge: React.FC<AchievementBadgeProps> = ({
    icon,
    title,
    detail,
    glowColor = 'purple',
    delay = 0,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay, duration: 0.5, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.05, y: -4 }}
            className={`group relative flex items-center gap-3 rounded-full border border-white/15 bg-gradient-to-r ${glowStyles[glowColor]} px-4 py-2.5 backdrop-blur-xl transition-all duration-300 hover:border-white/25`}
        >
            {/* Animated glow ring */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 rounded-full animate-pulse bg-gradient-to-r from-purple-500/10 to-sky-500/10" />
            </div>

            {/* Icon */}
            <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm">
                {icon}
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col">
                <span className="text-sm font-semibold text-white">{title}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-300/70">{detail}</span>
            </div>

            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-[#0f1120]/95 border border-white/10 text-xs text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl">
                {detail}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#0f1120]/95" />
            </div>
        </motion.div>
    );
};

export default AchievementBadge;
