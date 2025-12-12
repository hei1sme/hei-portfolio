'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EntranceAnimation from './components/EntranceAnimation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Define metadata values
const pageTitle = 'Le Nguyen Gia Hung - Portfolio';
const pageDescription = 'Personal portfolio of Le Nguyen Gia Hung, an undergraduate AI student.';

export default function Home() {
  const [isEntranceComplete, setIsEntranceComplete] = useState(false);

  // Set metadata on component mount
  useEffect(() => {
    document.title = pageTitle;
    
    // Set description meta tag
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.setAttribute('name', 'description');
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.setAttribute('content', pageDescription);

    // Cleanup function (optional but good practice)
    return () => {
      // Optionally reset title or description on unmount if needed
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // Restore simple scroll handler for nav links
  // const handleNavAction = (id: string) => {
  //   const element = document.getElementById(id);
  //   if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // };

  return (
    <main className="relative bg-black">
      <EntranceAnimation onAnimationComplete={() => setIsEntranceComplete(true)} />
      
      {/* Conditionally render main content */}
      {isEntranceComplete && (
        <>
          {/* Main content wrapper - Removed md:pl-20, keep pt for mobile nav offset */}
          <div className="pt-16 md:pt-0">
            {/* Section Order: Hero -> About -> Projects -> Skills -> Experience -> Education -> Contact */}
            
            {/* 1. Hero */}
            <motion.div
              id="home"
              className="pr-4" // Right padding
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Hero />
            </motion.div>

            {/* 2. About */}
            <motion.div
              id="about"
              className="mx-auto w-full max-w-6xl px-6 lg:px-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <About />
            </motion.div>
            
            {/* 3. Projects */}
            <motion.div
              id="projects"
              className="mx-auto w-full max-w-6xl px-6 lg:px-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Projects />
            </motion.div>

            {/* 4. Skills */}
            <motion.div
              id="skills"
              className="mx-auto w-full max-w-6xl px-6 lg:px-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Skills />
            </motion.div>

            {/* 5. Experience (New) */}
            <motion.div
              id="experience"
              className="mx-auto w-full max-w-6xl px-6 lg:px-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Experience />
            </motion.div>

            {/* 6. Education */}
            <motion.div
              id="education"
              className="mx-auto w-full max-w-6xl px-6 lg:px-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Education />
            </motion.div>

            {/* 7. Contact */}
            <motion.div
              id="contact"
              className="mx-auto w-full max-w-6xl px-6 lg:px-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Contact />
            </motion.div>
          </div> {/* End of the main content div */}

          {/* Render Footer OUTSIDE the padded content div */}
          <Footer /> 

        </>
      )}
    </main>
  );
} 
