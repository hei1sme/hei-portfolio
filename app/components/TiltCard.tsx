'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    tiltAmount?: number;
    glareEnabled?: boolean;
}

const TiltCard: React.FC<TiltCardProps> = ({
    children,
    className = '',
    tiltAmount = 10,
    glareEnabled = true,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const rotateXValue = (mouseY / (rect.height / 2)) * -tiltAmount;
        const rotateYValue = (mouseX / (rect.width / 2)) * tiltAmount;

        setRotateX(rotateXValue);
        setRotateY(rotateYValue);

        // Calculate glare position
        const glareX = ((e.clientX - rect.left) / rect.width) * 100;
        const glareY = ((e.clientY - rect.top) / rect.height) * 100;
        setGlarePosition({ x: glareX, y: glareY });
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setGlarePosition({ x: 50, y: 50 });
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
                rotateX,
                rotateY,
            }}
            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
            }}
            style={{
                transformStyle: 'preserve-3d',
                perspective: 1000,
            }}
            className={`relative ${className}`}
        >
            {children}

            {/* Glare overlay */}
            {glareEnabled && (
                <div
                    className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                        background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
                    }}
                />
            )}
        </motion.div>
    );
};

export default TiltCard;
