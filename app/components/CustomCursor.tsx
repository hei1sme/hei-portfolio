'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  
  // Raw mouse position (updated instantly)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring-animated position for the main cursor dot (optional, can smooth it slightly)
  const smoothOptions = { damping: 25, stiffness: 300, mass: 0.6 };
  const cursorX = useSpring(mouseX, smoothOptions);
  const cursorY = useSpring(mouseY, smoothOptions);

  // Spring-animated position for the trailing dot (more damping/less stiffness for lag)
  const trailOptions = { damping: 30, stiffness: 150, mass: 0.8 };
  const trailX = useSpring(mouseX, trailOptions);
  const trailY = useSpring(mouseY, trailOptions);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // const handleMouseEnter = () => setIsHoveringInteractive(true);
    // const handleMouseLeave = () => setIsHoveringInteractive(false);

    window.addEventListener('mousemove', handleMouseMove);

    // Use event delegation on the body for better performance
    const handleInteraction = (event: MouseEvent) => {
        const target = event.target as Element;
        if (target.closest('a, button, input, textarea, [data-interactive]')) {
            setIsHoveringInteractive(true);
        } else {
            setIsHoveringInteractive(false);
        }
    };

    document.body.addEventListener('mouseover', handleInteraction);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseover', handleInteraction);
    };
    // Dependency array includes the motion values to ensure springs update correctly
  }, [mouseX, mouseY]);

  // Define sizes for normal and hover states
  const mainCursorSize = isHoveringInteractive ? 50 : 15; // Slightly smaller main dot
  const trailSize = isHoveringInteractive ? 20 : 30; // Trail shrinks slightly on hover
  const trailOpacity = isHoveringInteractive ? 0.3 : 0.4; // Trail slightly less opaque on hover

  return (
    <>
      {/* Trailing Dot - Uses useSpring for position */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full bg-purple-500/80 mix-blend-difference filter blur-sm" // Added blur for softer trail
        style={{
          translateX: trailX, // Use spring-animated value
          translateY: trailY,
          // Center the dot
          left: 0,
          top: 0,
          x: '-50%',
          y: '-50%',
        }}
        animate={{
          width: trailSize,
          height: trailSize,
          opacity: trailOpacity
        }}
        transition={{ // Transition for size/opacity changes
          type: "spring",
          damping: 15,
          stiffness: 200,
          mass: 0.5
        }}
      />
      
      {/* Main Cursor Dot - Uses useSpring for position */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full bg-white mix-blend-difference"
        style={{
          translateX: cursorX, // Use spring-animated value
          translateY: cursorY,
          // Center the dot
          left: 0,
          top: 0,
          x: '-50%',
          y: '-50%',
        }}
        animate={{ // Animate size changes
          width: mainCursorSize,
          height: mainCursorSize,
        }}
        transition={{ // Transition for size changes
          type: "spring",
          damping: 15,
          stiffness: 300,
          mass: 0.5
        }}
      />
    </>
  );
};

export default CustomCursor; 