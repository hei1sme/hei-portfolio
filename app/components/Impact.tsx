'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaUsers, FaFlask, FaFileAlt, FaChartLine } from 'react-icons/fa';

interface Stat {
    icon: React.ReactNode;
    value: number;
    suffix?: string;
    label: string;
    color: string;
}

const stats: Stat[] = [
    {
        icon: <FaUsers />,
        value: 10,
        label: 'SpeedyLabX Members',
        color: 'purple',
    },
    {
        icon: <FaFlask />,
        value: 3,
        label: 'Active Research Pilots',
        color: 'sky',
    },
    {
        icon: <FaFileAlt />,
        value: 1,
        label: 'Published Paper',
        color: 'green',
    },
    {
        icon: <FaChartLine />,
        value: 57.7,
        suffix: '%',
        label: 'MAE Improvement',
        color: 'amber',
    },
];

const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; glow: string }> = {
        purple: { bg: 'bg-purple-500/20', text: 'text-purple-300', border: 'border-purple-400/30', glow: '#a855f7' },
        sky: { bg: 'bg-sky-500/20', text: 'text-sky-300', border: 'border-sky-400/30', glow: '#0ea5e9' },
        green: { bg: 'bg-green-500/20', text: 'text-green-300', border: 'border-green-400/30', glow: '#22c55e' },
        amber: { bg: 'bg-amber-500/20', text: 'text-amber-300', border: 'border-amber-400/30', glow: '#f59e0b' },
    };
    return colors[color] || colors.purple;
};

// Animated counter hook
const useCounter = (end: number, duration: number = 2000, inView: boolean) => {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!inView || hasAnimated.current) return;
        hasAnimated.current = true;

        const startTime = Date.now();
        const isDecimal = end % 1 !== 0;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * end;

            setCount(isDecimal ? Math.round(current * 10) / 10 : Math.round(current));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [end, duration, inView]);

    return count;
};

const StatCard: React.FC<{ stat: Stat; index: number }> = ({ stat, index }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const count = useCounter(stat.value, 1500, isInView);
    const colors = getColorClasses(stat.color);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className={`p-6 rounded-2xl border ${colors.border} bg-white/5 backdrop-blur-xl transition-all`}
            style={{ boxShadow: `0 0 30px ${colors.glow}20` }}
        >
            <div
                className={`inline-flex p-3 rounded-xl ${colors.bg} mb-4`}
                style={{ boxShadow: `0 0 15px ${colors.glow}40` }}
            >
                <span className={`text-xl ${colors.text}`}>{stat.icon}</span>
            </div>
            <div
                className="text-4xl md:text-5xl font-bold text-white"
                style={{ textShadow: `0 0 20px ${colors.glow}50` }}
            >
                {count}
                {stat.suffix && <span className={colors.text}>{stat.suffix}</span>}
            </div>
            <p className="mt-2 text-sm text-white/60">{stat.label}</p>
        </motion.div>
    );
};

const Impact: React.FC = () => {
    return (
        <section id="impact" className="relative py-20 text-white">
            <div className="relative max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p
                        className="text-sm uppercase tracking-[0.3em] text-purple-400 mb-4"
                        style={{ textShadow: '0 0 20px #a855f780' }}
                    >
                        Impact
                    </p>
                    <h2
                        className="text-3xl md:text-4xl lg:text-5xl font-black"
                        style={{ letterSpacing: '-0.02em' }}
                    >
                        Numbers that{' '}
                        <span
                            className="bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent"
                            style={{ filter: 'drop-shadow(0 0 25px rgba(168,85,247,0.6))' }}
                        >
                            matter
                        </span>
                    </h2>
                </motion.div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <StatCard key={stat.label} stat={stat} index={index} />
                    ))}
                </div>
            </div>
        </section >
    );
};

export default Impact;
