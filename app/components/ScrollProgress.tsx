'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress: React.FC = () => {
    const { scrollYProgress } = useScroll();

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            style={{ scaleX }}
            className="fixed top-0 left-0 right-0 z-[100] h-[3px] origin-left bg-gradient-to-r from-purple-500 via-fuchsia-500 to-sky-400"
        />
    );
};

export default ScrollProgress;
