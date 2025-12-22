'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaCode, FaTools, FaPython, FaReact, FaDocker, FaGitAlt, FaDatabase, FaLinux } from 'react-icons/fa';
import { SiPytorch, SiTypescript, SiFastapi, SiJupyter, SiStreamlit, SiTensorflow, SiOpencv, SiScikitlearn, SiPandas, SiNumpy } from 'react-icons/si';
import { SiHuggingface } from 'react-icons/si';

interface Skill {
  name: string;
  icon: React.ReactNode;
  color: string;
  category: 'ml' | 'dev' | 'tools';
}

const allSkills: Skill[] = [
  // ML
  { name: 'PyTorch', icon: <SiPytorch />, color: '#EE4C2C', category: 'ml' },
  { name: 'TensorFlow', icon: <SiTensorflow />, color: '#FF6F00', category: 'ml' },
  { name: 'Deep Learning', icon: <FaBrain />, color: '#a855f7', category: 'ml' },
  { name: 'Transformers', icon: <SiHuggingface />, color: '#FFD21E', category: 'ml' },
  { name: 'Explainable AI', icon: <FaBrain />, color: '#22c55e', category: 'ml' },
  { name: 'Computer Vision', icon: <SiOpencv />, color: '#5C3EE8', category: 'ml' },
  { name: 'Scikit-learn', icon: <SiScikitlearn />, color: '#F7931E', category: 'ml' },
  { name: 'Time-Series', icon: <FaBrain />, color: '#8b5cf6', category: 'ml' },
  // Dev
  { name: 'Python', icon: <FaPython />, color: '#3776AB', category: 'dev' },
  { name: 'SQL', icon: <FaDatabase />, color: '#336791', category: 'dev' },
  { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6', category: 'dev' },
  { name: 'React', icon: <FaReact />, color: '#61DAFB', category: 'dev' },
  { name: 'FastAPI', icon: <SiFastapi />, color: '#009688', category: 'dev' },
  { name: 'Streamlit', icon: <SiStreamlit />, color: '#FF4B4B', category: 'dev' },
  // Tools
  { name: 'Git', icon: <FaGitAlt />, color: '#F05032', category: 'tools' },
  { name: 'Docker', icon: <FaDocker />, color: '#2496ED', category: 'tools' },
  { name: 'Linux', icon: <FaLinux />, color: '#FCC624', category: 'tools' },
  { name: 'Pandas', icon: <SiPandas />, color: '#150458', category: 'tools' },
  { name: 'NumPy', icon: <SiNumpy />, color: '#013243', category: 'tools' },
  { name: 'W&B', icon: <FaTools />, color: '#FFBE00', category: 'tools' },
  { name: 'Jupyter', icon: <SiJupyter />, color: '#F37626', category: 'tools' },
];

// Skill pill component
const SkillPill: React.FC<{ skill: Skill; isHovered: boolean; onHover: () => void; onLeave: () => void }> = ({
  skill, isHovered, onHover, onLeave
}) => (
  <motion.div
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
    className="flex items-center gap-3 px-5 py-3 rounded-full border backdrop-blur-sm whitespace-nowrap cursor-default"
    style={{
      backgroundColor: isHovered ? `${skill.color}20` : 'rgba(255,255,255,0.05)',
      borderColor: isHovered ? skill.color : 'rgba(255,255,255,0.1)',
      boxShadow: isHovered ? `0 0 25px ${skill.color}40` : 'none',
    }}
    whileHover={{ scale: 1.05, y: -2 }}
    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
  >
    <span
      className="text-xl"
      style={{ color: skill.color }}
    >
      {skill.icon}
    </span>
    <span className="text-sm font-medium text-white/90">{skill.name}</span>
  </motion.div>
);

// Infinite marquee row
const MarqueeRow: React.FC<{ skills: Skill[]; direction: 'left' | 'right'; speed?: number }> = ({
  skills, direction, speed = 30
}) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate skills for seamless loop
  const duplicatedSkills = [...skills, ...skills, ...skills];

  return (
    <div
      className="relative overflow-hidden py-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-4"
        animate={{
          x: direction === 'left' ? ['0%', '-33.33%'] : ['-33.33%', '0%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
        style={{
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {duplicatedSkills.map((skill, i) => (
          <SkillPill
            key={`${skill.name}-${i}`}
            skill={skill}
            isHovered={hoveredSkill === `${skill.name}-${i}`}
            onHover={() => setHoveredSkill(`${skill.name}-${i}`)}
            onLeave={() => setHoveredSkill(null)}
          />
        ))}
      </motion.div>
    </div>
  );
};

const Skills: React.FC = () => {
  const mlSkills = allSkills.filter(s => s.category === 'ml');
  const devSkills = allSkills.filter(s => s.category === 'dev');
  const toolSkills = allSkills.filter(s => s.category === 'tools');

  return (
    <section id="skills" className="relative py-32 text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.08)_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 px-6"
        >
          <p
            className="text-sm uppercase tracking-[0.3em] text-purple-400 mb-4"
            style={{ textShadow: '0 0 20px #a855f780' }}
          >
            Skills
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-black"
            style={{ letterSpacing: '-0.02em' }}
          >
            Toolkit for{' '}
            <span
              className="bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent"
              style={{ filter: 'drop-shadow(0 0 25px rgba(168,85,247,0.6))' }}
            >
              rigorous AI
            </span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/40 max-w-xl mx-auto">
            Hover to highlight
          </p>
        </motion.div>

        {/* Marquee rows */}
        <div className="space-y-6">
          {/* Row 1: ML - left */}
          <div>
            <div className="flex items-center gap-3 px-6 mb-3">
              <FaBrain className="text-purple-400" />
              <span className="text-sm font-medium text-white/60">AI & Machine Learning</span>
            </div>
            <MarqueeRow skills={mlSkills} direction="left" speed={35} />
          </div>

          {/* Row 2: Dev - right */}
          <div>
            <div className="flex items-center gap-3 px-6 mb-3">
              <FaCode className="text-green-400" />
              <span className="text-sm font-medium text-white/60">Development</span>
            </div>
            <MarqueeRow skills={devSkills} direction="right" speed={40} />
          </div>

          {/* Row 3: Tools - left */}
          <div>
            <div className="flex items-center gap-3 px-6 mb-3">
              <FaTools className="text-sky-400" />
              <span className="text-sm font-medium text-white/60">Tools & Platforms</span>
            </div>
            <MarqueeRow skills={toolSkills} direction="left" speed={45} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
