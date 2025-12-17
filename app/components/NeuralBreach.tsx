'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShooterGame from './ShooterGame';

interface NeuralBreachProps {
    onClose: () => void;
    buttonPosition: { x: number; y: number };
}

// Captured DOM element for suction
interface CapturedElement {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    html: string;
    delay: number;
}

// Typewriter effect hook
const useTypewriter = (text: string, speed: number = 50, startDelay: number = 0) => {
    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        setDisplayText('');
        setIsComplete(false);

        const timeout = setTimeout(() => {
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    setDisplayText(text.slice(0, i + 1));
                    i++;
                } else {
                    clearInterval(timer);
                    setIsComplete(true);
                }
            }, speed);
            return () => clearInterval(timer);
        }, startDelay);

        return () => clearTimeout(timeout);
    }, [text, speed, startDelay]);

    return { displayText, isComplete };
};

// Storyline phases
const STORY_PHASES = [
    { text: "Oh no...", duration: 1500 },
    { text: "What have you done?", duration: 2000 },
    { text: "You weren't supposed to click that.", duration: 2500 },
    { text: "The neural network is... destabilizing.", duration: 3000 },
];

const CHAOS_MESSAGES = [
    "Loss function: EXPLODING",
    "Weights: CORRUPTED",
    "Reality buffer: OVERFLOWING",
    "Gradient: VANISHING",
    "Neurons: DYING",
    "Memory: LEAKING",
];

const MISSION_LINES = [
    "...",
    "System entering emergency mode.",
    "Neural recalibration required.",
    "You caused this. You fix it.",
];

// Element being sucked into singularity
const SuckedDOMElement: React.FC<{
    element: CapturedElement;
    targetX: number;
    targetY: number;
}> = ({ element, targetX, targetY }) => {
    const rotation = (Math.random() - 0.5) * 1440; // Multiple spins

    return (
        <motion.div
            className="fixed pointer-events-none"
            style={{
                left: element.x,
                top: element.y,
                width: element.width,
                height: element.height,
                zIndex: 9998,
            }}
            initial={{ scale: 1, opacity: 1, rotate: 0 }}
            animate={{
                x: targetX - element.x - element.width / 2,
                y: targetY - element.y - element.height / 2,
                scale: 0,
                opacity: 0,
                rotate: rotation,
            }}
            transition={{
                duration: 2 + Math.random() * 3,
                delay: element.delay,
                ease: [0.45, 0, 0.15, 1],
            }}
        >
            <div
                className="w-full h-full rounded-lg border border-white/30 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm shadow-lg"
                style={{ boxShadow: '0 0 20px rgba(168,85,247,0.3)' }}
            />
        </motion.div>
    );
};


// Main Neural Breach Component
const NeuralBreach: React.FC<NeuralBreachProps> = ({ onClose, buttonPosition }) => {
    const [phase, setPhase] = useState<'story' | 'sucking' | 'blackout' | 'mission' | 'game' | 'complete'>('story');
    const [storyIndex, setStoryIndex] = useState(0);
    const [chaosIndex, setChaosIndex] = useState(0);
    const [missionIndex, setMissionIndex] = useState(0);
    const [capturedElements, setCapturedElements] = useState<CapturedElement[]>([]);
    const [screenShake, setScreenShake] = useState(false);
    const [suckProgress, setSuckProgress] = useState(0);

    // Current story text
    const currentStory = STORY_PHASES[storyIndex];
    const { displayText, isComplete } = useTypewriter(
        phase === 'story' ? currentStory?.text || '' : '',
        40
    );

    // Progress through story
    useEffect(() => {
        if (phase === 'story' && isComplete) {
            const timer = setTimeout(() => {
                if (storyIndex < STORY_PHASES.length - 1) {
                    setStoryIndex(s => s + 1);
                } else {
                    // Capture DOM elements before sucking phase
                    capturePageElements();
                    setPhase('sucking');
                    setScreenShake(true);
                }
            }, currentStory.duration);
            return () => clearTimeout(timer);
        }
    }, [phase, isComplete, storyIndex, currentStory?.duration]);

    // Capture visible DOM elements
    const capturePageElements = () => {
        const selectors = 'h1, h2, h3, p, button, a, img, div[class*="card"], section > div';
        const elements = document.querySelectorAll(selectors);
        const captured: CapturedElement[] = [];

        elements.forEach((el, i) => {
            const rect = el.getBoundingClientRect();
            if (
                rect.width > 30 &&
                rect.height > 20 &&
                rect.top > 0 &&
                rect.bottom < window.innerHeight &&
                rect.left > 100 &&
                captured.length < 40
            ) {
                captured.push({
                    id: i,
                    x: rect.left,
                    y: rect.top,
                    width: Math.min(rect.width, 300),
                    height: Math.min(rect.height, 200),
                    html: el.tagName,
                    delay: Math.random() * 8, // Spread over 8 seconds
                });
            }
        });

        setCapturedElements(captured);
    };

    // Sucking phase with progress
    useEffect(() => {
        if (phase === 'sucking') {
            // Progress indicator
            const progressInterval = setInterval(() => {
                setSuckProgress(p => Math.min(p + 1, 100));
            }, 100);

            // Show chaos messages
            const messageInterval = setInterval(() => {
                setChaosIndex(i => (i + 1) % CHAOS_MESSAGES.length);
            }, 1500);

            // Transition after 10 seconds
            const timer = setTimeout(() => {
                setPhase('blackout');
                setScreenShake(false);
            }, 10000);

            return () => {
                clearInterval(progressInterval);
                clearInterval(messageInterval);
                clearTimeout(timer);
            };
        }
    }, [phase]);

    // Blackout to mission
    useEffect(() => {
        if (phase === 'blackout') {
            const timer = setTimeout(() => setPhase('mission'), 1500);
            return () => clearTimeout(timer);
        }
    }, [phase]);

    // Mission phase
    useEffect(() => {
        if (phase === 'mission') {
            const timer = setInterval(() => {
                setMissionIndex(i => {
                    if (i >= MISSION_LINES.length - 1) {
                        clearInterval(timer);
                        return i;
                    }
                    return i + 1;
                });
            }, 1500);
            return () => clearInterval(timer);
        }
    }, [phase]);

    const handleGameComplete = useCallback(() => {
        setPhase('complete');
        setTimeout(onClose, 3000);
    }, [onClose]);

    return (
        <motion.div
            className={`fixed inset-0 z-[9999] ${screenShake ? 'animate-shake' : ''}`}
            style={{ cursor: 'default' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* Background */}
            <motion.div
                className="absolute inset-0"
                initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
                animate={{
                    backgroundColor: phase === 'story' ? 'rgba(0,0,0,0.7)' :
                        phase === 'sucking' ? 'rgba(0,0,0,0.85)' :
                            'rgba(0,0,0,0.98)',
                }}
                transition={{ duration: 0.5 }}
            />

            {/* Singularity at button position */}
            {(phase === 'sucking' || phase === 'story') && (
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        left: buttonPosition.x - 80,
                        top: buttonPosition.y - 80,
                        width: 160,
                        height: 160,
                        background: 'radial-gradient(circle, #a855f7 0%, #7c3aed 20%, #1e1b4b 50%, black 100%)',
                        boxShadow: '0 0 150px #a855f7, 0 0 300px #7c3aed',
                    }}
                    initial={{ scale: 0 }}
                    animate={{
                        scale: phase === 'sucking' ? [1.2, 1.8, 1.5] : 0.5,
                        rotate: 360,
                    }}
                    transition={{
                        scale: { duration: 3, repeat: Infinity },
                        rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
                    }}
                />
            )}

            {/* Sucked DOM elements */}
            <AnimatePresence>
                {phase === 'sucking' && capturedElements.map((element) => (
                    <SuckedDOMElement
                        key={element.id}
                        element={element}
                        targetX={buttonPosition.x}
                        targetY={buttonPosition.y}
                    />
                ))}
            </AnimatePresence>

            {/* Story text */}
            {phase === 'story' && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.p
                        key={storyIndex}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-3xl md:text-5xl font-bold text-red-400 text-center px-8"
                        style={{ textShadow: '0 0 30px #ef4444' }}
                    >
                        {displayText}
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                        >
                            |
                        </motion.span>
                    </motion.p>
                </div>
            )}

            {/* Sucking phase - chaos messages + progress */}
            {phase === 'sucking' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.p
                        key={chaosIndex}
                        initial={{ opacity: 0, scale: 1.2 }}
                        animate={{ opacity: [1, 0.5, 1], scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-3xl md:text-5xl font-mono font-bold text-red-500 mb-8"
                        style={{ textShadow: '0 0 30px #ef4444' }}
                    >
                        {CHAOS_MESSAGES[chaosIndex]}
                    </motion.p>

                    {/* Progress bar */}
                    <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-red-500 via-purple-500 to-red-500"
                            style={{ width: `${suckProgress}%` }}
                        />
                    </div>
                    <p className="text-white/40 text-sm mt-2">Reality collapsing... {suckProgress}%</p>
                </div>
            )}

            {/* Blackout */}
            {phase === 'blackout' && (
                <div className="absolute inset-0 flex items-center justify-center cursor-default">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0, 1] }}
                        transition={{ duration: 1 }}
                        className="w-4 h-4 rounded-full bg-purple-500"
                    />
                </div>
            )}

            {/* Mission briefing */}
            {phase === 'mission' && (
                <div className="absolute inset-0 flex items-center justify-center cursor-pointer">
                    <div className="space-y-4 text-center max-w-xl">
                        {MISSION_LINES.slice(0, missionIndex + 1).map((line, i) => (
                            <motion.p
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`text-xl md:text-2xl font-medium ${i === missionIndex ? 'text-purple-300' : 'text-white/60'}`}
                            >
                                {line}
                            </motion.p>
                        ))}
                        {missionIndex === MISSION_LINES.length - 1 && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1 }}
                                onClick={() => setPhase('game')}
                                className="mt-8 px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg transition-colors cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                BEGIN RECALIBRATION
                            </motion.button>
                        )}
                    </div>
                </div>
            )}

            {/* Shooter Game */}
            {phase === 'game' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0"
                >
                    <ShooterGame onComplete={handleGameComplete} />
                </motion.div>
            )}

            {/* Complete */}
            {phase === 'complete' && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-4"
                    >
                        <p className="text-4xl md:text-6xl font-bold text-green-400">
                            System Restored
                        </p>
                        <p className="text-xl text-white/60">
                            Don&apos;t touch that button again. 😤
                        </p>
                    </motion.div>
                </div>
            )}

            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-50 cursor-pointer"
            >
                ✕
            </button>

            {/* Screen shake animation */}
            <style jsx global>{`
                @keyframes shake {
                    0%, 100% { transform: translate(0, 0) rotate(0); }
                    10% { transform: translate(-5px, -5px) rotate(-1deg); }
                    20% { transform: translate(5px, -5px) rotate(1deg); }
                    30% { transform: translate(-5px, 5px) rotate(0); }
                    40% { transform: translate(5px, 5px) rotate(1deg); }
                    50% { transform: translate(-5px, -5px) rotate(-1deg); }
                    60% { transform: translate(5px, -5px) rotate(0); }
                    70% { transform: translate(-5px, 5px) rotate(-1deg); }
                    80% { transform: translate(-5px, -5px) rotate(1deg); }
                    90% { transform: translate(5px, -5px) rotate(0); }
                }
                .animate-shake {
                    animation: shake 0.5s infinite;
                }
            `}</style>
        </motion.div>
    );
};

export default NeuralBreach;
