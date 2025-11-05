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

interface BroadSkill {
  name: string;
  level: number;
  icon: React.ReactElement;
}

interface Technology {
  name: string;
  icon: React.ReactElement;
}

const broadSkills: BroadSkill[] = [
  { name: 'ML & DL Research', level: 90, icon: <FaBrain className="text-purple-200" /> },
  { name: 'Explainable AI (XAI)', level: 87, icon: <FaLightbulb className="text-yellow-200" /> },
  { name: 'Time-Series Forecasting', level: 88, icon: <FaWaveSquare className="text-teal-200" /> },
  { name: 'Multimodal Learning', level: 84, icon: <FaNetworkWired className="text-sky-200" /> },
  { name: 'Python Engineering', level: 92, icon: <FaCode className="text-slate-100" /> },
  { name: 'Research Leadership', level: 80, icon: <FaUsers className="text-pink-200" /> },
];

const technologies: Technology[] = [
  { name: 'Python', icon: <SiPython size={26} className="text-blue-400" /> },
  { name: 'SQL', icon: <FaDatabase size={26} className="text-teal-400" /> },
  { name: 'PyTorch', icon: <SiPytorch size={26} className="text-red-500" /> },
  { name: 'TensorFlow', icon: <SiTensorflow size={26} className="text-orange-500" /> },
  { name: 'Keras', icon: <SiKeras size={26} className="text-red-400" /> },
  { name: 'HuggingFace', icon: <SiHuggingface size={26} className="text-yellow-400" /> },
  { name: 'Scikit-learn', icon: <SiScikitlearn size={26} className="text-orange-400" /> },
  { name: 'OpenCV', icon: <SiOpencv size={26} className="text-green-400" /> },
  { name: 'Pandas', icon: <SiPandas size={26} className="text-indigo-400" /> },
  { name: 'NumPy', icon: <SiNumpy size={26} className="text-blue-500" /> },
  { name: 'Matplotlib', icon: <FaChartLine size={26} className="text-pink-300" /> },
  { name: 'Streamlit', icon: <SiStreamlit size={26} className="text-rose-400" /> },
  { name: 'REST API', icon: <FaNetworkWired size={26} className="text-sky-400" /> },
  { name: 'Weights & Biases', icon: <SiWeightsandbiases size={26} className="text-amber-500" /> },
  { name: 'Git', icon: <SiGit size={26} className="text-red-500" /> },
  { name: 'Linux', icon: <SiLinux size={26} className="text-yellow-400" /> },
  { name: 'Jupyter', icon: <SiJupyter size={26} className="text-orange-300" /> },
  { name: 'VS Code', icon: <FaLaptopCode size={26} className="text-blue-400" /> },
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="relative py-28 text-white">
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-sky-500/10 via-transparent to-transparent" />
      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col gap-4"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.35em] text-slate-200/80">
            Skills
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight max-w-3xl">
            A toolkit built for rigorous experimentation, transparent storytelling, and shipping resilient AI systems.
          </h2>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="rounded-[30px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl shadow-[0_18px_60px_rgba(15,11,36,0.45)]"
          >
            <h3 className="text-xl font-semibold text-white">Core Competencies</h3>
            <p className="mt-3 text-sm text-slate-300/80">
              A blend of research depth and engineering execution - from concept to reproducible notebooks and production-ready demos.
            </p>
            <div className="mt-8 space-y-6">
              {broadSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between text-sm text-slate-200">
                    <span className="flex items-center gap-2 font-semibold">
                      <span className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/10">{skill.icon}</span>
                      {skill.name}
                    </span>
                    <span className="text-xs uppercase tracking-[0.3em] text-slate-300/80">{skill.level}%</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-400 via-fuchsia-400 to-sky-300"
                      style={{ width: `${skill.level}%` }}
                    />
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
            className="rounded-[30px] border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent p-8 backdrop-blur-2xl shadow-[0_20px_60px_rgba(18,15,40,0.5)]"
          >
            <h3 className="text-xl font-semibold text-white">Tools I push daily</h3>
            <p className="mt-3 text-sm text-slate-300/80">
              Model training, experimentation, deployment, and feedback loops with a focus on clarity and reproducibility.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: index * 0.04, duration: 0.4 }}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-center transition-all duration-300 hover:border-white/20 hover:bg-white/15"
                >
                  {tech.icon}
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-200/80">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
