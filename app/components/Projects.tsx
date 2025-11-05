'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaArrowRight, FaGithub } from 'react-icons/fa';

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col gap-4"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.35em] text-slate-200/80">
            Projects
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight max-w-3xl">
            Research pipelines built to withstand real-world constraints and communicate their reasoning clearly.
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl shadow-[0_22px_70px_rgba(18,12,42,0.45)]"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05010a] via-transparent to-transparent opacity-80" />
              </div>

              <div className="relative flex h-full flex-col gap-6 p-6">
                <div className="space-y-3">
                  <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-slate-200/80">
                    Case Study
                  </span>
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
      </div>
    </section>
  );
};

export default Projects;
