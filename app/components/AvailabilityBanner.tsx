'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaCircle } from 'react-icons/fa';

const AvailabilityBanner: React.FC = () => {
    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="fixed top-[3px] left-1/2 -translate-x-1/2 z-[90] hidden md:block"
        >
            <a
                href="#contact"
                className="group flex items-center gap-3 rounded-full border border-white/15 bg-[#0a0812]/90 px-5 py-2 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-white/25 hover:bg-[#0a0812]"
                data-interactive
            >
                <span className="relative flex items-center gap-2">
                    <FaCircle className="text-emerald-400 text-[8px] animate-pulse" />
                    <span className="text-xs font-medium text-slate-200">
                        Open to Research Internships & AI Roles
                    </span>
                </span>
                <span className="text-[10px] text-slate-400 group-hover:text-purple-300 transition-colors">
                    Let&apos;s talk →
                </span>
            </a>
        </motion.div>
    );
};

export default AvailabilityBanner;
