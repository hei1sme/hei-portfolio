'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';

interface Project {
    title: string;
    description: string;
    longDescription: string;
    image: string;
    tags: string[];
    badge?: string;
    githubUrl?: string;
    demoUrl?: string;
    highlights?: string[];
    role?: string;
}

const projects: Project[] = [
    {
        title: 'SmokeNet',
        description: 'Transformer-based PM₂.₅ forecasting with SHAP + Integrated Gradients',
        longDescription: 'A novel Transformer-based architecture for time-series forecasting of PM₂.₅ air quality levels in Melbourne. The system integrates Explainable AI techniques (SHAP and Integrated Gradients) to provide interpretable health warnings for public safety dashboards.',
        image: '/images/project/SmokeNet_architecture.jpeg',
        tags: ['PyTorch', 'Transformers', 'XAI', 'Time-Series'],
        badge: 'AJCAI 2025',
        githubUrl: 'https://github.com/hei1sme',
        demoUrl: 'https://doi.org/10.1007/978-981-95-4969-6_34',
        highlights: ['MAE of 0.7470', 'R² of 0.9545', '57.7% improvement over baselines', '4+ years of data processed'],
        role: 'Lead Researcher & First Author',
    },
    {
        title: 'MERR-GAT',
        description: 'Explainable multimodal emotion recognition via GATv2 fusion',
        longDescription: 'Developing MERR-GAT, a novel hybrid framework that fuses Wav2Vec 2.0 (audio) and RoBERTa (text) through Graph Attention Networks (GATv2) for transparent multimodal emotion recognition with intrinsic explainability.',
        image: '/images/project/MERR-GAT.png',
        tags: ['Wav2Vec 2.0', 'RoBERTa', 'GATv2', 'XAI'],
        badge: 'In Progress',
        highlights: ['Dynamic conversational graph', 'Intrinsic XAI via attention', 'IEMOCAP, RAVDESS, MELD benchmarks'],
        role: 'Corresponding Author & Co-Lead',
    },
    {
        title: 'Vietnamese ASR',
        description: 'End-to-end speech recognition with CNN-BiLSTM architecture',
        longDescription: 'Building a parameter-efficient (5.4M) end-to-end ASR model using a 4-layer CNN frontend and 3-layer Residual BiLSTM encoder, trained on a massive 745-hour Vietnamese speech corpus.',
        image: '/images/project-placeholder.svg',
        tags: ['CNN', 'BiLSTM', 'CTC', 'Speech'],
        badge: 'In Progress',
        highlights: ['5.4M parameters', '745-hour corpus', 'WER 33.09%', 'CER 15.28%'],
        role: 'Co-Researcher',
    },
    {
        title: 'PPE Detection',
        description: 'Real-time YOLOv8 safety compliance auditing',
        longDescription: 'Built a real-time object detection system using YOLOv8 to identify 9 classes of personal protective equipment. Features a safety logic engine for automatic compliance classification and a Streamlit web interface.',
        image: '/images/project-placeholder.svg',
        tags: ['YOLOv8', 'Computer Vision', 'Streamlit'],
        badge: 'Completed',
        githubUrl: 'https://github.com/hei1sme',
        highlights: ['9 PPE classes', 'Real-time inference', 'Compliance engine', 'Violation reporting'],
        role: 'Developer',
    },
];

// Project detail modal
const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

            {/* Modal */}
            <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-black/90 backdrop-blur-xl"
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-colors hover:bg-white/20"
                >
                    <FaTimes className="text-white" />
                </button>

                {/* Header image */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    {/* Badge */}
                    {project.badge && (
                        <div className="absolute top-6 left-6">
                            <span className="px-4 py-2 rounded-full bg-purple-500/30 border border-purple-400/50 text-sm font-semibold text-white backdrop-blur-md">
                                {project.badge}
                            </span>
                        </div>
                    )}

                    {/* Title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <h2 className="text-4xl md:text-5xl font-bold text-white">{project.title}</h2>
                        {project.role && (
                            <p className="text-lg text-purple-300 mt-2">{project.role}</p>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">
                    {/* Description */}
                    <div>
                        <h3 className="text-sm uppercase tracking-wider text-white/50 mb-3">About</h3>
                        <p className="text-lg text-white/80 leading-relaxed">{project.longDescription}</p>
                    </div>

                    {/* Highlights */}
                    {project.highlights && (
                        <div>
                            <h3 className="text-sm uppercase tracking-wider text-white/50 mb-3">Key Results</h3>
                            <div className="flex flex-wrap gap-3">
                                {project.highlights.map((h, i) => (
                                    <span
                                        key={i}
                                        className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/80"
                                    >
                                        {h}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tags */}
                    <div>
                        <h3 className="text-sm uppercase tracking-wider text-white/50 mb-3">Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-sm text-purple-300"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-4 pt-4">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white font-medium transition-all hover:bg-white/20"
                            >
                                <FaGithub /> View Code
                            </a>
                        )}
                        {project.demoUrl && (
                            <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 rounded-full bg-purple-500 text-white font-medium transition-all hover:bg-purple-600"
                            >
                                <FaExternalLinkAlt /> View Publication
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const ProjectCard: React.FC<{ project: Project; index: number; onClick: () => void }> = ({ project, index, onClick }) => {
    return (
        <motion.div
            onClick={onClick}
            className="group relative flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[40vw] h-[70vh] max-h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-black/50 backdrop-blur-xl cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-50 transition-all duration-700 group-hover:opacity-70 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            </div>

            {/* Badge */}
            {project.badge && (
                <div className="absolute top-6 left-6 z-10">
                    <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                        {project.badge}
                    </span>
                </div>
            )}

            {/* Click hint */}
            <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="px-3 py-1.5 rounded-full bg-purple-500/30 text-xs text-purple-200">
                    Click for details
                </span>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 transition-transform duration-300 group-hover:-translate-y-2">
                    {project.title}
                </h3>
                <p className="text-lg text-white/70 mb-6 max-w-md transition-all duration-300 opacity-80 group-hover:opacity-100">
                    {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-sm text-white/80"
                        >
                            {tag}
                        </span>
                    ))}
                    {project.tags.length > 3 && (
                        <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-sm text-white/60">
                            +{project.tags.length - 3}
                        </span>
                    )}
                </div>
            </div>

            {/* Hover gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-transparent to-green-500/0 transition-all duration-500 group-hover:from-purple-500/10 group-hover:to-green-500/10 pointer-events-none" />
        </motion.div>
    );
};


const HorizontalScrollProjects: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(projects.length - 1) * 35}%`]);

    return (
        <>
            <section id="projects" className="relative bg-black">
                {/* Gradient fade to next section */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-black/0 z-10 pointer-events-none" />

                {/* Section Header */}
                <div className="px-6 pt-20 md:pt-32 pb-12 md:pb-16 max-w-4xl mx-auto text-center">
                    <motion.p
                        className="text-sm uppercase tracking-[0.3em] text-purple-400 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ textShadow: '0 0 20px #a855f780' }}
                    >
                        Projects
                    </motion.p>
                    <motion.h2
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Things I&apos;ve Built
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-white/40 mt-4 text-sm md:text-base"
                    >
                        {isMobile ? 'Tap any project for details' : 'Click any project for details'}
                    </motion.p>
                </div>

                {/* Mobile: Vertical scroll */}
                {isMobile ? (
                    <div className="px-6 pb-20 space-y-6">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.title}
                                project={project}
                                index={index}
                                onClick={() => setSelectedProject(project)}
                            />
                        ))}
                    </div>
                ) : (
                    /* Desktop: Horizontal scroll */
                    <div
                        ref={containerRef}
                        className="relative"
                        style={{ height: `${(projects.length + 1) * 80}vh` }}
                    >
                        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                            <motion.div
                                style={{ x }}
                                className="flex gap-8 pl-[10vw]"
                            >
                                {projects.map((project, index) => (
                                    <ProjectCard
                                        key={project.title}
                                        project={project}
                                        index={index}
                                        onClick={() => setSelectedProject(project)}
                                    />
                                ))}

                                {/* End spacer */}
                                <div className="flex-shrink-0 w-[60vw] h-[70vh] max-h-[600px] flex items-center justify-center">
                                    <div className="text-center">
                                        <p className="text-2xl md:text-3xl text-white/60 mb-6">
                                            Want to see more?
                                        </p>
                                        <a
                                            href="https://github.com/hei1sme"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-lg font-medium text-white transition-all hover:bg-white/10"
                                        >
                                            <FaGithub className="text-xl" />
                                            View GitHub
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </section>

            {/* Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default HorizontalScrollProjects;
