'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EntranceAnimation from './components/EntranceAnimation';
import Hero from './components/Hero';
import About from './components/About';
import Publications from './components/Publications';
import Experience from './components/Experience';
import HorizontalScrollProjects from './components/HorizontalScrollProjects';
import Impact from './components/Impact';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Define metadata values
const pageTitle = 'Le Nguyen Gia Hung - Portfolio';
const pageDescription = 'Personal portfolio of Le Nguyen Gia Hung, an undergraduate AI researcher building transparent AI systems.';

export default function Home() {
  const [isEntranceComplete, setIsEntranceComplete] = useState(false);

  // Set metadata on component mount
  useEffect(() => {
    document.title = pageTitle;

    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.setAttribute('name', 'description');
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.setAttribute('content', pageDescription);
  }, []);

  return (
    <main className="relative bg-black">
      {/* Single unified ambient gradient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(88,28,135,0.2)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(34,197,94,0.05)_0%,_transparent_60%)]" />
      </div>

      <EntranceAnimation onAnimationComplete={() => setIsEntranceComplete(true)} />

      {/* Main content */}
      {isEntranceComplete && (
        <>
          {/* Hero - full viewport */}
          <Hero />

          {/* About + Research Interests */}
          <motion.section
            id="about"
            className="relative py-32"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-5xl mx-auto px-6">
              <About />
            </div>
          </motion.section>

          {/* Publications - Academic credentials (priority for research) */}
          <motion.section
            id="publications"
            className="relative py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-5xl mx-auto px-6">
              <Publications />
            </div>
          </motion.section>

          {/* Experience - Research journey */}
          <Experience />

          {/* Projects - Technical implementations */}
          <HorizontalScrollProjects />

          {/* Impact - Supporting metrics */}
          <motion.section
            id="impact"
            className="relative py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-5xl mx-auto px-6">
              <Impact />
            </div>
          </motion.section>

          {/* Skills - Technical capabilities */}
          <motion.section
            id="skills"
            className="relative py-32"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-5xl mx-auto px-6">
              <Skills />
            </div>
          </motion.section>

          {/* Education - Academic background */}
          <motion.section
            id="education"
            className="relative py-32"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-5xl mx-auto px-6">
              <Education />
            </div>
          </motion.section>

          {/* Contact */}
          <Contact />

          {/* Footer */}
          <Footer />
        </>
      )}
    </main>
  );
}
