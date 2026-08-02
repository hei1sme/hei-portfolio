'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaUsers, FaFlask, FaFileAlt, FaChartLine } from 'react-icons/fa';

interface Stat {
    icon: React.ReactNode;
    value: number;
    suffix?: string;
    label: string;
    color: string;
    description: string;
}

const stats: Stat[] = [
    {
        icon: <FaUsers />,
        value: 10,
        label: 'SpeedyLabX Members',
        color: 'purple',
        description: 'Undergraduate researchers united',
    },
    {
        icon: <FaFlask />,
        value: 3,
        label: 'Active Research Pilots',
        color: 'sky',
        description: 'Ongoing AI experiments',
    },
    {
        icon: <FaFileAlt />,
        value: 3,
        label: 'Research Manuscripts',
        color: 'green',
        description: 'KDD 2027, AJCAI 2026 & 2025',
    },
    {
        icon: <FaChartLine />,
        value: 57.7,
        suffix: '%',
        label: 'MAE Improvement',
        color: 'amber',
        description: 'Over baseline models',
    },
];

const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; glow: string; gradient: string }> = {
        purple: { bg: 'bg-purple-500/20', text: 'text-purple-300', border: 'border-purple-400/30', glow: '#a855f7', gradient: 'from-purple-500 to-pink-500' },
        sky: { bg: 'bg-sky-500/20', text: 'text-sky-300', border: 'border-sky-400/30', glow: '#0ea5e9', gradient: 'from-sky-500 to-cyan-500' },
        green: { bg: 'bg-green-500/20', text: 'text-green-300', border: 'border-green-400/30', glow: '#22c55e', gradient: 'from-green-500 to-emerald-500' },
        amber: { bg: 'bg-amber-500/20', text: 'text-amber-300', border: 'border-amber-400/30', glow: '#f59e0b', gradient: 'from-amber-500 to-orange-500' },
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

// Floating particles background
const FloatingParticles: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-purple-400/30"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.2, 0.6, 0.2],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
};

const StatCard: React.FC<{ stat: Stat; index: number }> = ({ stat, index }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const count = useCounter(stat.value, 1500, isInView);
    const colors = getColorClasses(stat.color);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-100, 100], [10, -10]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-10, 10]), { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative h-full"
            style={{ perspective: 1000 }}
        >
            <motion.div
                className={`relative h-full p-6 md:p-8 rounded-3xl border ${colors.border} bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl overflow-hidden cursor-default`}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                    boxShadow: `0 0 40px ${colors.glow}15, 0 20px 40px rgba(0,0,0,0.3)`,
                }}
                whileHover={{
                    boxShadow: `0 0 60px ${colors.glow}30, 0 30px 60px rgba(0,0,0,0.4)`,
                }}
            >
                {/* Animated gradient background */}
                <motion.div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${colors.gradient}`}
                    style={{ filter: 'blur(40px)' }}
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />

                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                    {/* Icon with pulse animation */}
                    <motion.div
                        className={`inline-flex p-4 rounded-2xl ${colors.bg} mb-5`}
                        style={{ boxShadow: `0 0 25px ${colors.glow}50` }}
                        animate={{
                            boxShadow: [
                                `0 0 25px ${colors.glow}50`,
                                `0 0 40px ${colors.glow}70`,
                                `0 0 25px ${colors.glow}50`,
                            ],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        <span className={`text-2xl ${colors.text}`}>{stat.icon}</span>
                    </motion.div>

                    {/* Number with glow */}
                    <motion.div
                        className="text-5xl md:text-6xl font-black text-white tabular-nums"
                        style={{
                            textShadow: `0 0 30px ${colors.glow}60, 0 0 60px ${colors.glow}30`,
                            transform: 'translateZ(20px)',
                        }}
                    >
                        {count}
                        {stat.suffix && (
                            <span className={`${colors.text} text-4xl`}>{stat.suffix}</span>
                        )}
                    </motion.div>

                    {/* Label */}
                    <p className="mt-3 text-base font-semibold text-white/90">{stat.label}</p>

                    {/* Description */}
                    <p className="mt-1 text-sm text-white/50">{stat.description}</p>
                </div>

                {/* Corner accent */}
                <div
                    className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${colors.gradient} opacity-20 rounded-bl-full`}
                />
            </motion.div>
        </motion.div>
    );
};

const Impact: React.FC = () => {
    return (
        <section id="impact" className="relative py-32 text-white overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.1)_0%,_transparent_70%)]" />
            <FloatingParticles />

            {/* Decorative circles */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />

            <div className="relative max-w-5xl mx-auto px-6">
                {/* Header with enhanced animation */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-20"
                >
                    <motion.p
                        className="text-sm uppercase tracking-[0.4em] text-purple-400 mb-6"
                        style={{ textShadow: '0 0 30px #a855f780' }}
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        Impact
                    </motion.p>
                    <h2
                        className="text-4xl md:text-5xl lg:text-6xl font-black"
                        style={{ letterSpacing: '-0.02em' }}
                    >
                        Numbers that{' '}
                        <motion.span
                            className="bg-gradient-to-r from-purple-400 via-pink-400 to-green-400 bg-clip-text text-transparent inline-block"
                            style={{
                                filter: 'drop-shadow(0 0 30px rgba(168,85,247,0.6))',
                                backgroundSize: '200% 100%',
                            }}
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                        >
                            matter
                        </motion.span>
                    </h2>
                    <motion.p
                        className="mt-6 text-lg text-white/50 max-w-xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        Quantifiable achievements from research and leadership
                    </motion.p>
                </motion.div>

                {/* Stats grid with staggered animation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard key={stat.label} stat={stat} index={index} />
                    ))}
                </div>

                {/* Bottom accent line */}
                <motion.div
                    className="mt-16 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
            </div>
        </section>
    );
};

export default Impact;
