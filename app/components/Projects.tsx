'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaArrowRight, FaGithub } from 'react-icons/fa';
import SectionHeader from './SectionHeader';

interface ProjectItem {
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
}

const projects: ProjectItem[] = [
  {
    title: 'SmokeNet - Proactive Air Quality Forecasting',
    slug: 'smokenet-air-quality',
    description:
      'Transformer-based PM2.5 forecasting accepted at AJCAI 2025. Chronological CV, GPU training, and SHAP-driven health guidance for Melbourne.',
    technologies: ['PyTorch', 'Transformers', 'Time-Series', 'SHAP', 'Integrated Gradients'],
    image: '/images/project-placeholder.svg',
    githubUrl: 'https://github.com/hei1sme',
  },
  {
    title: 'Conformer-GAT Multimodal SER',
    slug: 'conformer-gat-ser',
    description:
      'Fusing Conformer encoders with graph attention to reason over audio-text emotion signals. Built with explainability at every layer.',
    technologies: ['Conformer', 'Graph Attention', 'XAI', 'IEMOCAP', 'RAVDESS'],
    image: '/images/project-placeholder.svg',
  },
  {
    title: 'PPE Detection & Safety Compliance',
    slug: 'ppe-detection-system',
    description:
      'Real-time Streamlit application powered by YOLOv8 to audit nine PPE classes and emit instant SAFE/UNSAFE compliance tags.',
    technologies: ['YOLOv8', 'Computer Vision', 'Streamlit', 'Python'],
    image: '/images/project-placeholder.svg',
    githubUrl: 'https://github.com/hei1sme',
  },
];

const Projects: React.FC = () => {
  const router = useRouter();

  return (
    <section id="projects" className="relative py-28 text-white">
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-purple-600/10 via-transparent to-transparent" />
      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <SectionHeader
          eyebrow="Projects"
          title="Research pipelines engineered for auditable, real-world deployment."
          description="Every build pairs rigorous experimentation with interactive layers so collaborators can trace model behaviour, surface failure modes, and iterate alongside the system."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.035] backdrop-blur-2xl shadow-[0_24px_70px_rgba(18,12,42,0.48)] transition-transform duration-300"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05010a] via-transparent to-transparent opacity-85" />
                <div className="absolute top-5 right-5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.4em] text-slate-200/80">
                  {index === 0 ? 'Featured' : 'Case Study'}
                </div>
              </div>

              <div className="relative flex h-full flex-col gap-6 p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-sky-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2">
                    <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-slate-200/80">
                      {project.slug.includes('smokenet') ? 'Publication' : 'Experiment'}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400/70">AI · XAI · Deployment</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-300/85">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-slate-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between pt-4">
                  <button
                    onClick={() => router.push(`/projects/${project.slug}`)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-100 transition-transform duration-300 group-hover:translate-x-1"
                    data-interactive
                  >
                    View Details
                    <FaArrowRight className="text-slate-200" />
                  </button>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-300/80 hover:text-white"
                      data-interactive
                    >
                      <FaGithub />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-12 rounded-[30px] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl shadow-[0_22px_65px_rgba(16,12,36,0.45)]"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-300/70">Want deeper dives?</p>
              <h3 className="text-lg font-semibold text-white">Request access to notebooks, ablations, and design docs.</h3>
              <p className="text-sm text-slate-300/80">
                I share reproducibility bundles (datasets, W&B runs, evaluation dashboards) for collaborators under NDA-friendly terms.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold tracking-wide text-slate-100 transition-all duration-300 hover:bg-white/18"
              data-interactive
            >
              Start a conversation
              <FaArrowRight className="text-slate-100" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
