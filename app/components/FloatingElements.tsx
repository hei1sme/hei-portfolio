'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, PanInfo } from 'framer-motion';

// Word pools for each bubble - tech, emojis, and personal keywords
const wordPools = [
    ['PyTorch', 'TensorFlow', 'Keras', 'JAX', 'Deep Learning'],
    ['XAI', 'SHAP', 'Attention', 'Interpretable', 'Explainable'],
    ['Transformers', 'BERT', 'GPT', 'Conformer', 'LLMs'],
    ['🔬', '🧠', '💡', '🚀', '✨', '🎯', '⚡', '🔥'],
    ['GNN', 'GAT', 'GCN', 'Graph Neural'],
    ['Time-Series', 'Forecasting', 'Prediction', 'Sequence'],
    ['🇻🇳', 'Vietnam', 'HCMC', 'FPT Uni'],
    ['Researcher', 'AI/ML', 'Founder', 'Creator'],
    ['☕', '🎮', '🎵', '📚', '💻', '🌙'],
    ['SpeedyLabX', 'SmokeNet', 'MERR-GAT'],
];

interface FloatingElement {
    id: string;
    wordPoolIndex: number;
    color: string;
    size: 'sm' | 'md' | 'lg';
    x: number;
    y: number;
    delay: number;
}

const elements: FloatingElement[] = [
    { id: '1', wordPoolIndex: 0, color: 'purple', size: 'lg', x: 8, y: 15, delay: 0 },
    { id: '2', wordPoolIndex: 1, color: 'green', size: 'md', x: 85, y: 12, delay: 0.5 },
    { id: '3', wordPoolIndex: 2, color: 'sky', size: 'lg', x: 15, y: 75, delay: 1 },
    { id: '4', wordPoolIndex: 3, color: 'pink', size: 'md', x: 88, y: 65, delay: 1.5 },
    { id: '5', wordPoolIndex: 4, color: 'teal', size: 'md', x: 50, y: 88, delay: 2 },
    { id: '6', wordPoolIndex: 5, color: 'amber', size: 'sm', x: 70, y: 25, delay: 2.5 },
    { id: '7', wordPoolIndex: 6, color: 'pink', size: 'sm', x: 25, y: 45, delay: 3 },
    { id: '8', wordPoolIndex: 7, color: 'purple', size: 'md', x: 78, y: 78, delay: 3.5 },
    { id: '9', wordPoolIndex: 8, color: 'amber', size: 'sm', x: 92, y: 35, delay: 4 },
    { id: '10', wordPoolIndex: 9, color: 'teal', size: 'lg', x: 5, y: 55, delay: 4.5 },
];

const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
        purple: { bg: 'from-purple-500/30 to-purple-600/20', border: 'border-purple-400/50', text: 'text-purple-200', glow: '#a855f7' },
        green: { bg: 'from-green-500/30 to-green-600/20', border: 'border-green-400/50', text: 'text-green-200', glow: '#22c55e' },
        sky: { bg: 'from-sky-500/30 to-sky-600/20', border: 'border-sky-400/50', text: 'text-sky-200', glow: '#0ea5e9' },
        pink: { bg: 'from-pink-500/30 to-pink-600/20', border: 'border-pink-400/50', text: 'text-pink-200', glow: '#ec4899' },
        teal: { bg: 'from-teal-500/30 to-teal-600/20', border: 'border-teal-400/50', text: 'text-teal-200', glow: '#14b8a6' },
        amber: { bg: 'from-amber-500/30 to-amber-600/20', border: 'border-amber-400/50', text: 'text-amber-200', glow: '#f59e0b' },
    };
    return colors[color] || colors.purple;
};

const getSizeClasses = (size: string) => {
    switch (size) {
        case 'sm': return 'px-3 py-1.5 text-xs';
        case 'lg': return 'px-5 py-2.5 text-base';
        default: return 'px-4 py-2 text-sm';
    }
};

const DraggableBubble: React.FC<{ element: FloatingElement }> = ({ element }) => {
    const [currentWord, setCurrentWord] = useState(wordPools[element.wordPoolIndex][0]);
    const [isChanging, setIsChanging] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 50, damping: 10 });
    const springY = useSpring(y, { stiffness: 50, damping: 10 });
    const [isDragging, setIsDragging] = useState(false);

    const colors = getColorClasses(element.color);
    const sizes = getSizeClasses(element.size);

    // Word change effect
    useEffect(() => {
        const changeWord = () => {
            setIsChanging(true);
            setTimeout(() => {
                const pool = wordPools[element.wordPoolIndex];
                const newWord = pool[Math.floor(Math.random() * pool.length)];
                setCurrentWord(newWord);
                setIsChanging(false);
            }, 300);
        };

        // Random interval between 3-10 seconds
        const scheduleChange = () => {
            const delay = 3000 + Math.random() * 7000;
            return setTimeout(() => {
                changeWord();
                scheduleChange();
            }, delay);
        };

        const timeout = scheduleChange();
        return () => clearTimeout(timeout);
    }, [element.wordPoolIndex]);

    const handleDragEnd = () => {
        setIsDragging(false);
        setTimeout(() => {
            x.set(0);
            y.set(0);
        }, 500);
    };

    return (
        <motion.div
            drag
            dragMomentum={true}
            dragElastic={0.3}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            style={{ x: springX, y: springY }}
            className="absolute cursor-grab active:cursor-grabbing"
            initial={{
                left: `${element.x}%`,
                top: `${element.y}%`,
                opacity: 0,
                scale: 0,
            }}
            animate={{
                opacity: 1,
                scale: 1,
            }}
            transition={{
                delay: element.delay,
                type: 'spring',
                stiffness: 200,
            }}
        >
            {/* Floating animation wrapper */}
            <motion.div
                animate={{
                    y: [0, -15, 0, 10, 0],
                    x: [0, 8, 0, -8, 0],
                    rotate: [0, 3, 0, -3, 0],
                }}
                transition={{
                    duration: 8 + Math.random() * 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: element.delay,
                }}
            >
                <motion.div
                    whileDrag={{ scale: 1.2, zIndex: 100 }}
                    whileHover={{ scale: 1.1 }}
                    className={`
            relative rounded-full border backdrop-blur-md font-medium
            bg-gradient-to-br ${colors.bg} ${colors.border} ${colors.text} ${sizes}
            transition-all duration-300
            ${isDragging ? 'shadow-2xl' : 'shadow-lg'}
          `}
                    style={{
                        boxShadow: isDragging
                            ? `0 0 30px ${colors.glow}60, 0 0 60px ${colors.glow}30`
                            : `0 0 20px ${colors.glow}30`,
                    }}
                >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatDelay: 5,
                                ease: 'linear',
                            }}
                        />
                    </div>

                    {/* Word with fade transition */}
                    <motion.span
                        animate={{ opacity: isChanging ? 0 : 1, scale: isChanging ? 0.8 : 1 }}
                        transition={{ duration: 0.3 }}
                        className="relative z-10"
                    >
                        {currentWord}
                    </motion.span>

                    {/* Pulse ring on hover */}
                    <motion.div
                        className="absolute inset-0 rounded-full border"
                        style={{ borderColor: colors.glow }}
                        initial={{ scale: 1, opacity: 0.5 }}
                        whileHover={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5],
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

const FloatingElements: React.FC = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="relative w-full h-full pointer-events-auto">
                {elements.map((el) => (
                    <DraggableBubble key={el.id} element={el} />
                ))}
            </div>
        </div>
    );
};

export default FloatingElements;
