'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Animated text that reveals letter by letter
export const AnimatedText: React.FC<{
    text: string;
    className?: string;
    color?: string;
    delay?: number;
    glow?: boolean;
    glowColor?: string;
}> = ({ text, className = '', color, delay = 0, glow = false, glowColor }) => {
    const letters = text.split('');
    const finalGlowColor = glowColor || color || '#a855f7';

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
                    style={glow ? {
                        color: color || undefined,
                        textShadow: `0 0 20px ${finalGlowColor}60, 0 0 40px ${finalGlowColor}30`
                    } : { color: color || undefined }}
                    className="inline-block"
                >
                    {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
            ))}
        </span>
    );
};

// Animated word by word reveal
export const AnimatedWords: React.FC<{
    text: string;
    className?: string;
    delay?: number;
}> = ({ text, className = '', delay = 0 }) => {
    const words = text.split(' ');

    return (
        <span className={className}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.5,
                        delay: delay + i * 0.1,
                        ease: 'easeOut'
                    }}
                    className="inline-block mr-[0.25em]"
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
};

// Glowing text wrapper
export const GlowText: React.FC<{
    children: React.ReactNode;
    color?: string;
    intensity?: 'low' | 'medium' | 'high';
    className?: string;
    animate?: boolean;
}> = ({ children, color = '#a855f7', intensity = 'medium', className = '', animate = false }) => {
    const shadows = {
        low: `0 0 10px ${color}40`,
        medium: `0 0 20px ${color}60, 0 0 40px ${color}30`,
        high: `0 0 30px ${color}80, 0 0 60px ${color}50, 0 0 100px ${color}30`,
    };

    if (animate) {
        return (
            <motion.span
                className={className}
                style={{ color, textShadow: shadows[intensity] }}
                animate={{
                    textShadow: [
                        shadows[intensity],
                        `0 0 40px ${color}90, 0 0 80px ${color}60, 0 0 120px ${color}40`,
                        shadows[intensity],
                    ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
                {children}
            </motion.span>
        );
    }

    return (
        <span
            className={className}
            style={{ color, textShadow: shadows[intensity] }}
        >
            {children}
        </span>
    );
};

// Glowing box/card wrapper
export const GlowBox: React.FC<{
    children: React.ReactNode;
    color?: string;
    className?: string;
    intensity?: 'low' | 'medium' | 'high';
    animate?: boolean;
}> = ({ children, color = '#a855f7', className = '', intensity = 'medium', animate = false }) => {
    const shadows = {
        low: `0 0 20px ${color}20`,
        medium: `0 0 40px ${color}30, 0 0 80px ${color}15`,
        high: `0 0 60px ${color}40, 0 0 120px ${color}20`,
    };

    const baseStyle = {
        boxShadow: shadows[intensity],
        borderColor: `${color}40`,
    };

    if (animate) {
        return (
            <motion.div
                className={`border ${className}`}
                style={baseStyle}
                animate={{
                    boxShadow: [
                        shadows[intensity],
                        `0 0 60px ${color}50, 0 0 120px ${color}30`,
                        shadows[intensity],
                    ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <div className={`border ${className}`} style={baseStyle}>
            {children}
        </div>
    );
};

// Gradient glow background
export const GlowBackground: React.FC<{
    color?: string;
    position?: 'top' | 'center' | 'bottom';
    className?: string;
}> = ({ color = '#a855f7', position = 'center', className = '' }) => {
    const positions = {
        top: 'ellipse at top',
        center: 'ellipse at center',
        bottom: 'ellipse at bottom',
    };

    return (
        <div
            className={`absolute inset-0 pointer-events-none ${className}`}
            style={{
                background: `radial-gradient(${positions[position]}, ${color}15 0%, transparent 60%)`
            }}
        />
    );
};
