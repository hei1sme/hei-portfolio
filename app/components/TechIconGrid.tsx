'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    SiPython,
    SiTensorflow,
    SiPytorch,
    SiScikitlearn,
    SiPandas,
    SiNumpy,
    SiKeras,
    SiHuggingface,
    SiOpencv,
    SiStreamlit,
    SiWeightsandbiases,
    SiGit,
    SiLinux,
    SiJupyter,
    SiDocker,
} from 'react-icons/si';
import { FaDatabase, FaNetworkWired, FaLaptopCode, FaChartLine } from 'react-icons/fa';

interface TechItem {
    name: string;
    icon: React.ReactNode;
    category: 'ml' | 'data' | 'devops';
    proficiency: number; // 1-100
}

const technologies: TechItem[] = [
    // ML & Research
    { name: 'Python', icon: <SiPython size={28} />, category: 'ml', proficiency: 95 },
    { name: 'PyTorch', icon: <SiPytorch size={28} />, category: 'ml', proficiency: 90 },
    { name: 'TensorFlow', icon: <SiTensorflow size={28} />, category: 'ml', proficiency: 85 },
    { name: 'HuggingFace', icon: <SiHuggingface size={28} />, category: 'ml', proficiency: 88 },
    { name: 'Keras', icon: <SiKeras size={28} />, category: 'ml', proficiency: 85 },
    { name: 'Scikit-learn', icon: <SiScikitlearn size={28} />, category: 'ml', proficiency: 90 },
    { name: 'OpenCV', icon: <SiOpencv size={28} />, category: 'ml', proficiency: 80 },

    // Data & Analysis
    { name: 'Pandas', icon: <SiPandas size={28} />, category: 'data', proficiency: 92 },
    { name: 'NumPy', icon: <SiNumpy size={28} />, category: 'data', proficiency: 90 },
    { name: 'SQL', icon: <FaDatabase size={28} />, category: 'data', proficiency: 85 },
    { name: 'Jupyter', icon: <SiJupyter size={28} />, category: 'data', proficiency: 95 },
    { name: 'Matplotlib', icon: <FaChartLine size={28} />, category: 'data', proficiency: 88 },
    { name: 'W&B', icon: <SiWeightsandbiases size={28} />, category: 'data', proficiency: 85 },

    // DevOps & Tools
    { name: 'Streamlit', icon: <SiStreamlit size={28} />, category: 'devops', proficiency: 88 },
    { name: 'REST API', icon: <FaNetworkWired size={28} />, category: 'devops', proficiency: 82 },
    { name: 'Git', icon: <SiGit size={28} />, category: 'devops', proficiency: 90 },
    { name: 'Linux', icon: <SiLinux size={28} />, category: 'devops', proficiency: 80 },
    { name: 'Docker', icon: <SiDocker size={28} />, category: 'devops', proficiency: 75 },
    { name: 'VS Code', icon: <FaLaptopCode size={28} />, category: 'devops', proficiency: 95 },
];

const categories = [
    { id: 'all', label: 'All' },
    { id: 'ml', label: 'ML/DL' },
    { id: 'data', label: 'Data' },
    { id: 'devops', label: 'DevOps' },
];

const categoryColors = {
    ml: 'from-purple-500/30 to-fuchsia-500/30 border-purple-400/30 text-purple-200',
    data: 'from-sky-500/30 to-cyan-500/30 border-sky-400/30 text-sky-200',
    devops: 'from-teal-500/30 to-emerald-500/30 border-teal-400/30 text-teal-200',
};

const TechIconGrid: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>('all');

    const filteredTech = activeCategory === 'all'
        ? technologies
        : technologies.filter(t => t.category === activeCategory);

    return (
        <div className="space-y-6">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((cat) => (
                    <motion.button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 ${activeCategory === cat.id
                                ? 'bg-gradient-to-r from-purple-500/30 to-sky-500/30 border border-white/20 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                                : 'border border-white/10 bg-white/5 text-slate-300/80 hover:bg-white/10'
                            }`}
                    >
                        {cat.label}
                    </motion.button>
                ))}
            </div>

            {/* Tech Grid */}
            <motion.div
                layout
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4"
            >
                <AnimatePresence mode="popLayout">
                    {filteredTech.map((tech, index) => (
                        <motion.div
                            key={tech.name}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ delay: index * 0.03, duration: 0.3 }}
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="group relative"
                        >
                            <div className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border bg-gradient-to-br ${categoryColors[tech.category]} backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]`}>
                                {/* Proficiency Ring */}
                                <div className="relative">
                                    <svg className="w-14 h-14 -rotate-90" viewBox="0 0 44 44">
                                        <circle
                                            cx="22"
                                            cy="22"
                                            r="18"
                                            fill="none"
                                            stroke="rgba(255,255,255,0.1)"
                                            strokeWidth="3"
                                        />
                                        <circle
                                            cx="22"
                                            cy="22"
                                            r="18"
                                            fill="none"
                                            stroke="url(#gradient)"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeDasharray={`${(tech.proficiency / 100) * 113} 113`}
                                            className="transition-all duration-500"
                                        />
                                        <defs>
                                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#a855f7" />
                                                <stop offset="100%" stopColor="#38bdf8" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {tech.icon}
                                    </div>
                                </div>

                                <span className="text-[11px] font-medium text-center leading-tight">{tech.name}</span>
                            </div>

                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-[#0f1120]/95 border border-white/10 text-xs text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl z-20">
                                {tech.name} • {tech.proficiency}%
                                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#0f1120]/95" />
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default TechIconGrid;
