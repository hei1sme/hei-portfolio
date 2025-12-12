'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope } from 'react-icons/fa';

const FloatingCTA: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past 80% of viewport height
            setIsVisible(window.scrollY > window.innerHeight * 0.8);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="fixed bottom-8 right-8 z-[80]"
                >
                    <a
                        href="#contact"
                        className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-sky-400 px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_32px_rgba(129,71,255,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_40px_rgba(129,71,255,0.5)]"
                        data-interactive
                    >
                        <FaEnvelope className="text-base" />
                        <span>Let&apos;s Talk</span>
                        <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FloatingCTA;
