'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
} from 'react-icons/si';
import { FaDatabase, FaBrain, FaCode, FaUsers, FaLightbulb, FaWaveSquare, FaNetworkWired, FaChartLine, FaLaptopCode } from 'react-icons/fa';
import SectionHeader from './SectionHeader';

interface BroadSkill {
  name: string;
  level: number;
  icon: React.ReactElement;
  caption: string;
}

interface Technology {
  name: string;
  icon: React.ReactElement;
}

const broadSkills: BroadSkill[] = [
  {
    name: 'ML & DL Research',
    level: 90,
    icon: <FaBrain className="text-purple-200" />,
    caption: 'Hypothesis-driven experiments with ablations, W&B tracking, and statistical validation.',
  },
  {
    name: 'Explainable AI (XAI)',
    level: 87,
    icon: <FaLightbulb className="text-yellow-200" />,
    caption: 'SHAP, Integrated Gradients, counterfactuals, and narrative dashboards for stakeholders.',
  },
  {
    name: 'Time-Series Forecasting',
    level: 88,
    icon: <FaWaveSquare className="text-teal-200" />,
    caption: 'Transformer + hybrid pipelines optimised for low-latency health and environmental telemetry.',
  },
  {
    name: 'Multimodal Learning',
    level: 84,
    icon: <FaNetworkWired className="text-sky-200" />,
    caption: 'Conformer encoders, graph reasoning, and SER datasets with human-in-the-loop evaluation.',
  },
  {
    name: 'Python Engineering',
    level: 92,
    icon: <FaCode className="text-slate-100" />,
    caption: 'Production-grade pipelines, typed APIs, and tooling that survive deployment constraints.',
  },
  {
    name: 'Research Leadership',
    level: 80,
    icon: <FaUsers className="text-pink-200" />,
    caption: 'SpeedyLabX rituals: peer reviews, demo days, reproducibility audits, and mentorship.',
  },
];

const technologies: Technology[] = [
  { name: 'Python', icon: <SiPython size={24} className="text-blue-400" /> },
  { name: 'SQL', icon: <FaDatabase size={24} className="text-teal-400" /> },
  { name: 'PyTorch', icon: <SiPytorch size={24} className="text-red-500" /> },
  { name: 'TensorFlow', icon: <SiTensorflow size={24} className="text-orange-500" /> },
  { name: 'Keras', icon: <SiKeras size={24} className="text-red-400" /> },
  { name: 'HuggingFace', icon: <SiHuggingface size={24} className="text-yellow-400" /> },
  { name: 'Scikit-learn', icon: <SiScikitlearn size={24} className="text-orange-400" /> },
  { name: 'OpenCV', icon: <SiOpencv size={24} className="text-green-400" /> },
  { name: 'Pandas', icon: <SiPandas size={24} className="text-indigo-400" /> },
  { name: 'NumPy', icon: <SiNumpy size={24} className="text-blue-500" /> },
  { name: 'Matplotlib', icon: <FaChartLine size={24} className="text-pink-300" /> },
  { name: 'Streamlit', icon: <SiStreamlit size={24} className="text-rose-400" /> },
  { name: 'REST API', icon: <FaNetworkWired size={24} className="text-sky-400" /> },
  { name: 'Weights & Biases', icon: <SiWeightsandbiases size={24} className="text-amber-500" /> },
  { name: 'Git', icon: <SiGit size={24} className="text-red-500" /> },
  { name: 'Linux', icon: <SiLinux size={24} className="text-yellow-400" /> },
  { name: 'Jupyter', icon: <SiJupyter size={24} className="text-orange-300" /> },
  { name: 'VS Code', icon: <FaLaptopCode size={24} className="text-blue-400" /> },
];

const technologyIconMap = technologies.reduce<Record<string, React.ReactElement>>((acc, tech) => {
  acc[tech.name] = tech.icon;
  return acc;
}, {});

const toolCategories = [
  {
    title: 'Modeling & Research',
    summary: 'Transformer stacks, graph reasoning, and speech encoders built for interpretability.',
    tools: ['Python', 'PyTorch', 'TensorFlow', 'Keras', 'HuggingFace', 'Scikit-learn'],
  },
  {
    title: 'Data & Experimentation',
    summary: 'Data wrangling, exploratory analysis, and telemetry that ground every experiment.',
    tools: ['Pandas', 'NumPy', 'Matplotlib', 'SQL', 'Jupyter', 'Weights & Biases'],
  },
  {
    title: 'Deployment & Ops',
    summary: 'Operator-ready demos, APIs, infrastructure scripts, and observability hooks.',
    tools: ['Streamlit', 'REST API', 'Git', 'Linux', 'OpenCV', 'VS Code'],
  },
];

const skillOrbitNodes = [
  { name: 'Python', top: '6%', left: '50%' },
  { name: 'PyTorch', top: '22%', left: '84%' },
  { name: 'TensorFlow', top: '58%', left: '88%' },
  { name: 'HuggingFace', top: '82%', left: '64%' },
  { name: 'Weights & Biases', top: '82%', left: '36%' },
  { name: 'Streamlit', top: '58%', left: '12%' },
  { name: 'OpenCV', top: '22%', left: '16%' },
  { name: 'Git', top: '6%', left: '26%' },
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="relative py-28 text-white">
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-sky-500/10 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Skills"
          title="A toolkit for rigorous experimentation, transparent storytelling, and deployable AI."
          description="From GPU-bound research sprints to production dashboards, I operate across the full loop — ideation, modelling, interpretability, deployment, and human feedback."
        />

        <div className="mt-14 grid gap-10 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="rounded-[34px] border border-white/12 bg-white/[0.05] p-8 backdrop-blur-2xl shadow-[0_25px_70px_rgba(16,12,40,0.5)]"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">Core Competencies</h3>
                <p className="mt-2 text-sm text-slate-300/80">
                  Research depth fused with engineering execution — every project moves from concept notes to reproducible artefacts.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1 text-[11px] uppercase tracking-[0.35em] text-slate-200/80">
                Sci + Ops Mindset
              </span>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {broadSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: index * 0.05, duration: 0.45 }}
                  whileHover={{ y: -4 }}
                  className="relative overflow-hidden rounded-3xl border border-white/12 bg-white/10 p-5 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-transparent to-sky-400/15 opacity-70" />
                  <div className="relative">
                    <div className="flex items-center justify-between gap-4 text-sm text-slate-200">
                      <span className="flex items-center gap-2 font-semibold">
                        <span className="grid h-9 w-9 place-items-center rounded-2xl border border-white/15 bg-white/10">
                          {skill.icon}
                        </span>
                        {skill.name}
                      </span>
                      <span className="text-xs uppercase tracking-[0.3em] text-slate-300/80">{skill.level}%</span>
                    </div>
                    <div className="mt-3 h-2.5 w-full rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-400 via-fuchsia-400 to-sky-300"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <p className="mt-3 text-xs text-slate-200/75 leading-relaxed">{skill.caption}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="flex h-full flex-col gap-6"
          >
            <div className="rounded-[32px] border border-white/12 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-7 backdrop-blur-2xl shadow-[0_24px_65px_rgba(18,15,40,0.48)]">
              <h3 className="text-xl font-semibold text-white">Toolchain I maintain</h3>
              <p className="mt-2 text-sm text-slate-300/80">
                Cohesive stacks for research, experimentation, and deployment — curated to keep velocity without trading off rigour.
              </p>
              <div className="mt-6 space-y-5">
                {toolCategories.map((category) => (
                  <div
                    key={category.title}
                    className="rounded-2xl border border-white/10 bg-white/10 p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/14"
                  >
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-300/70">{category.title}</p>
                    <p className="mt-2 text-sm text-slate-200/85 leading-relaxed">{category.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {category.tools.map((tool) => (
                        <span
                          key={tool}
                          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-slate-100"
                        >
                          {technologyIconMap[tool]}
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
        >
          <div className="relative overflow-hidden rounded-[34px] border border-white/12 bg-white/[0.05] p-6 backdrop-blur-2xl shadow-[0_22px_60px_rgba(13,11,35,0.45)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.12),transparent_70%)]" />
            <div className="relative flex flex-col gap-4">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-300/70">Skill Orbit</p>
              <p className="text-sm text-slate-300/80">
                Anchor tools that orbit my daily workflows — the more central, the more frequently they power the stack.
              </p>
              <div className="relative mx-auto mt-4 h-64 w-64">
                <div className="absolute inset-10 rounded-full border border-white/10" />
                <div className="absolute inset-0 rounded-full border border-white/20 opacity-70" />
                <div className="absolute inset-16 rounded-full border border-white/10 opacity-60" />
                <div className="absolute inset-24 rounded-full border border-white/10 opacity-40" />
                <div className="absolute inset-[88px] flex h-24 w-24 items-center justify-center rounded-full border border-white/15 bg-white/10 text-center text-xs uppercase tracking-[0.4em] text-slate-200">
                  Python Core
                </div>
                {skillOrbitNodes.map((node) => (
                  <motion.span
                    key={node.name}
                    className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-white/15 bg-white/12 px-3 py-1 text-[11px] text-slate-100 shadow-lg"
                    style={{ top: node.top, left: node.left }}
                    whileHover={{ scale: 1.08 }}
                  >
                    {technologyIconMap[node.name]}
                    {node.name}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[34px] border border-white/12 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-7 backdrop-blur-2xl shadow-[0_25px_70px_rgba(15,12,38,0.48)]">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-300/70">Signals & Outcomes</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {[
                {
                  label: 'Model reliability dashboards',
                  detail: 'SHAP & IG overlays + counterfactual probes for interpretable decision trails.',
                },
                {
                  label: 'Human feedback loops',
                  detail: 'Evaluation scripts and annotation flows to validate multimodal interfaces.',
                },
                {
                  label: 'Deployment playbooks',
                  detail: 'Containerised demos, CI pipelines, and SLO monitoring for live pilots.',
                },
                {
                  label: 'Community mentorship',
                  detail: 'Workshops, office hours, and lab reviews reaching 600+ learners so far.',
                },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                  <p className="mt-2 text-xs text-slate-300/80 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
