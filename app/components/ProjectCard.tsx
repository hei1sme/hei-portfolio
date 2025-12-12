'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaArrowRight, FaGithub, FaExternalLinkAlt, FaFileAlt } from 'react-icons/fa';

interface MetricChip {
    label: string;
    value: string;
    color: 'purple' | 'sky' | 'teal' | 'amber';
}

interface ProjectCardProps {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    metrics?: MetricChip[];
    type: 'featured' | 'standard';
    badge?: string;
    githubUrl?: string;
    demoUrl?: string;
    paperUrl?: string;
    index?: number;
}

const metricColors = {
    purple: 'bg-purple-500/20 text-purple-200',
    sky: 'bg-sky-500/20 text-sky-200',
    teal: 'bg-teal-500/20 text-teal-200',
    amber: 'bg-amber-500/20 text-amber-200',
};

const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    description,
    image,
    technologies,
    metrics,
    type,
    badge,
    githubUrl,
    demoUrl,
    paperUrl,
    index = 0,
}) => {
    const isFeatured = type === 'featured';

    return (
        <motion.article
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ y: -6 }}
            className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] backdrop-blur-2xl shadow-[0_24px_70px_rgba(18,12,42,0.48)] transition-all duration-500 hover:shadow-[0_30px_90px_rgba(129,71,255,0.25)] hover:border-white/20 ${isFeatured ? 'md:col-span-2 md:row-span-2' : ''
                }`}
        >
            {/* Shine Effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-transform duration-1000 group-hover:translate-x-full z-20" />

            {/* Image Section */}
            <div className={`relative w-full overflow-hidden ${isFeatured ? 'h-56 md:h-72' : 'h-44'}`}>
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05010a] via-[#05010a]/60 to-transparent opacity-90" />

                {/* Badge */}
                {badge && (
                    <div className="absolute top-4 right-4 rounded-full border border-white/15 bg-gradient-to-r from-purple-500/30 to-sky-500/30 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white backdrop-blur-md shadow-lg">
                        {badge}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="relative flex flex-col gap-4 p-6">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-sky-400/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Title & Description */}
                <div className="relative z-10 space-y-2">
                    <h3 className={`font-semibold text-white group-hover:text-purple-200 transition-colors ${isFeatured ? 'text-xl md:text-2xl' : 'text-lg'}`}>
                        {title}
                    </h3>
                    <p className={`text-slate-300/85 leading-relaxed ${isFeatured ? 'text-sm md:text-base' : 'text-sm line-clamp-2'}`}>
                        {description}
                    </p>
                </div>

                {/* Metrics */}
                {metrics && metrics.length > 0 && (
                    <div className="relative z-10 flex flex-wrap gap-2">
                        {metrics.map((metric) => (
                            <span
                                key={metric.label}
                                className={`rounded-md px-2.5 py-1 text-[11px] font-semibold ${metricColors[metric.color]}`}
                            >
                                {metric.label}: {metric.value}
                            </span>
                        ))}
                    </div>
                )}

                {/* Technologies */}
                <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
                    {technologies.slice(0, isFeatured ? 5 : 3).map((tech) => (
                        <span
                            key={tech}
                            className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-slate-300"
                        >
                            {tech}
                        </span>
                    ))}
                    {technologies.length > (isFeatured ? 5 : 3) && (
                        <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-slate-300">
                            +{technologies.length - (isFeatured ? 5 : 3)}
                        </span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="relative z-10 flex flex-wrap items-center gap-3 pt-2 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    {githubUrl && (
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                        >
                            <FaGithub /> Code
                        </a>
                    )}
                    {demoUrl && (
                        <a
                            href={demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs font-medium text-purple-300 hover:text-purple-200 transition-colors"
                        >
                            <FaExternalLinkAlt /> Demo
                        </a>
                    )}
                    {paperUrl && (
                        <a
                            href={paperUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs font-medium text-sky-300 hover:text-sky-200 transition-colors"
                        >
                            <FaFileAlt /> Paper
                        </a>
                    )}
                    <span className="ml-auto flex items-center gap-2 text-sm font-semibold text-purple-300">
                        View Details <FaArrowRight className="text-xs" />
                    </span>
                </div>
            </div>
        </motion.article>
    );
};

export default ProjectCard;
