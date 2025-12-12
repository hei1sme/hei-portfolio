'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaArrowRight, FaGithub } from 'react-icons/fa';
import SectionHeader from './SectionHeader';

interface MetricChip {
  label: string;
  value: string;
  color: 'purple' | 'sky' | 'teal' | 'amber';
}

interface ProjectItem {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  metrics?: MetricChip[];
  badge?: string;
  githubUrl?: string;
  demoUrl?: string;
  paperUrl?: string;
}

const metricColors = {
  purple: 'bg-purple-500/20 text-purple-200',
  sky: 'bg-sky-500/20 text-sky-200',
  teal: 'bg-teal-500/20 text-teal-200',
  amber: 'bg-amber-500/20 text-amber-200',
};

const featuredProject: ProjectItem = {
  title: 'SmokeNet — Proactive Air Quality Forecasting',
  description:
    'Transformer-based PM₂.₅ forecasting accepted at AJCAI 2025. Features chronological cross-validation, GPU training pipelines, and SHAP-driven health guidance for Melbourne environmental agencies.',
  technologies: ['PyTorch', 'Transformers', 'Time-Series', 'SHAP', 'Integrated Gradients', 'DiCE'],
  image: '/images/project-placeholder.svg',
  badge: 'AJCAI 2025',
  metrics: [
    { label: 'MAE', value: '0.7470', color: 'purple' },
    { label: 'R²', value: '0.9545', color: 'sky' },
    { label: 'Improvement', value: '57.7%', color: 'teal' },
  ],
  githubUrl: 'https://github.com/hei1sme',
};

const otherProjects: ProjectItem[] = [
  {
    title: 'Conformer-GAT Multimodal SER',
    description: 'Fusing Conformer encoders with graph attention for transparent speech emotion recognition.',
    technologies: ['Conformer', 'Graph Attention', 'XAI', 'IEMOCAP', 'RAVDESS'],
    image: '/images/project-placeholder.svg',
    badge: 'In Progress',
    metrics: [{ label: 'Datasets', value: '2', color: 'sky' }],
  },
  {
    title: 'PPE Detection & Safety Compliance',
    description: 'Real-time YOLOv8 pipeline auditing nine PPE classes with instant compliance tags.',
    technologies: ['YOLOv8', 'Computer Vision', 'Streamlit', 'Python'],
    image: '/images/project-placeholder.svg',
    badge: 'Shipped',
    metrics: [{ label: 'Classes', value: '9', color: 'amber' }],
    githubUrl: 'https://github.com/hei1sme',
    demoUrl: '#',
  },
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative py-28 text-white">
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-purple-600/10 via-transparent to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <SectionHeader
          eyebrow="Projects"
          title="Research pipelines engineered for auditable, real-world deployment."
          description="Every build pairs rigorous experimentation with interactive layers so collaborators can trace model behaviour."
        />

        {/* Bento Grid Layout */}
        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {/* Featured Project - Takes 3 columns */}
          <motion.article
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] backdrop-blur-2xl shadow-[0_24px_70px_rgba(18,12,42,0.48)] transition-all duration-500 hover:shadow-[0_30px_90px_rgba(129,71,255,0.25)] hover:border-white/20 lg:col-span-3"
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-transform duration-1000 group-hover:translate-x-full z-20" />

            <div className="relative h-56 md:h-64 w-full overflow-hidden">
              <Image src={featuredProject.image} alt={featuredProject.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05010a] via-[#05010a]/60 to-transparent opacity-90" />
              <div className="absolute top-4 right-4 rounded-full border border-white/15 bg-gradient-to-r from-purple-500/40 to-sky-500/40 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-white backdrop-blur-md shadow-lg font-semibold">
                {featuredProject.badge}
              </div>
            </div>

            <div className="relative flex flex-col gap-4 p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-sky-400/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-purple-200 transition-colors">
                  {featuredProject.title}
                </h3>
                <p className="mt-2 text-sm md:text-base text-slate-300/85 leading-relaxed">
                  {featuredProject.description}
                </p>
              </div>

              {featuredProject.metrics && (
                <div className="relative z-10 flex flex-wrap gap-2">
                  {featuredProject.metrics.map((metric) => (
                    <span key={metric.label} className={`rounded-md px-3 py-1.5 text-xs font-semibold ${metricColors[metric.color as keyof typeof metricColors]}`}>
                      {metric.label}: {metric.value}
                    </span>
                  ))}
                </div>
              )}

              <div className="relative z-10 flex flex-wrap gap-2">
                {featuredProject.technologies.map((tech) => (
                  <span key={tech} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="relative z-10 flex items-center gap-4 pt-2">
                {featuredProject.githubUrl && (
                  <a href={featuredProject.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white transition-colors">
                    <FaGithub /> Code
                  </a>
                )}
                <span className="ml-auto flex items-center gap-2 text-sm font-semibold text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Case Study <FaArrowRight className="text-xs" />
                </span>
              </div>
            </div>
          </motion.article>

          {/* Other Projects - Takes 2 columns, stacked */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {otherProjects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.2 + index * 0.15, duration: 0.7, ease: 'easeOut' }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.035] backdrop-blur-2xl shadow-[0_20px_60px_rgba(18,12,42,0.45)] transition-all duration-500 hover:shadow-[0_25px_70px_rgba(129,71,255,0.2)] hover:border-white/20"
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-transform duration-1000 group-hover:translate-x-full z-20" />

                <div className="relative h-32 w-full overflow-hidden">
                  <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05010a] via-[#05010a]/60 to-transparent opacity-90" />
                  <div className="absolute top-3 right-3 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-white backdrop-blur-md">
                    {project.badge}
                  </div>
                </div>

                <div className="relative flex flex-col gap-3 p-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-sky-400/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <h3 className="relative z-10 text-base font-semibold text-white group-hover:text-purple-200 transition-colors">
                    {project.title}
                  </h3>

                  {project.metrics && (
                    <div className="relative z-10 flex flex-wrap gap-2">
                      {project.metrics.map((metric) => (
                        <span key={metric.label} className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${metricColors[metric.color as keyof typeof metricColors]}`}>
                          {metric.label}: {metric.value}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="relative z-10 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-medium text-slate-300">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-medium text-slate-300">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 rounded-[24px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Want deeper dives?</h3>
              <p className="mt-1 text-sm text-slate-300/80">Request access to notebooks, ablations, and design docs.</p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-semibold text-slate-100 transition-all duration-300 hover:bg-white/18"
              data-interactive
            >
              Start a conversation <FaArrowRight />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
