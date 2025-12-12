'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaFlask, FaCode, FaRocket } from 'react-icons/fa';

const values = [
    {
        icon: <FaFlask className="text-purple-300" />,
        title: 'Research Rigor',
        description: 'Peer-reviewed ML experimentation with statistical validation and reproducibility.',
    },
    {
        icon: <FaCode className="text-sky-300" />,
        title: 'Production Code',
        description: 'Type-safe pipelines, CI/CD workflows, and deployment-ready systems.',
    },
    {
        icon: <FaRocket className="text-teal-300" />,
        title: 'Real Impact',
        description: 'XAI dashboards, health-alert systems, and operator-friendly interfaces.',
    },
];

const ValueProps: React.FC = () => {
    return (
        <section className="relative py-16 text-white">
            <div className="max-w-5xl mx-auto px-6 lg:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-300/70 mb-3">
                        Why Work With Me
                    </p>
                    <h2 className="text-2xl md:text-3xl font-semibold">
                        Bridging <span className="animated-gradient-text">research</span> and <span className="animated-gradient-text">real-world deployment</span>
                    </h2>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-3">
                    {values.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            whileHover={{ y: -6 }}
                            className="group relative rounded-[24px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.07] hover:border-white/20 hover:shadow-[0_20px_50px_rgba(129,71,255,0.15)]"
                        >
                            <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-purple-500/10 via-transparent to-sky-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative z-10">
                                <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/15 bg-white/10 text-xl mb-4">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-300/80 leading-relaxed">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ValueProps;
