'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
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

// Multi-wave Neural Recalibration Minigame
const NeuralMinigame: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [wave, setWave] = useState(1);
    const [nodes, setNodes] = useState<Array<{
        id: number;
        x: number;
        y: number;
        stable: boolean;
        speed: number;
        type: 'normal' | 'fast' | 'boss';
    }>>([]);
    const [score, setScore] = useState(0);
    const [combo, setCombo] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [message, setMessage] = useState("Wave 1: Click unstable nodes!");
    const [gameState, setGameState] = useState<'playing' | 'waveComplete' | 'victory'>('playing');
    const totalWaves = 3;
    const maxTime = 30;

    // Generate nodes for current wave
    const generateNodes = useCallback((waveNum: number) => {
        const nodeCount = 8 + waveNum * 4;
        const types: Array<'normal' | 'fast' | 'boss'> = waveNum >= 3 ? ['normal', 'fast', 'boss'] : waveNum >= 2 ? ['normal', 'fast'] : ['normal'];

        return Array.from({ length: nodeCount }, (_, i) => ({
            id: i,
            x: 80 + Math.random() * (window.innerWidth - 160),
            y: 120 + Math.random() * (window.innerHeight - 240),
            stable: Math.random() > 0.7, // 30% start unstable
            speed: waveNum * 0.5 + Math.random() * 0.5,
            type: types[Math.floor(Math.random() * types.length)],
        }));
    }, []);

    // Initialize wave
    useEffect(() => {
        if (gameState === 'playing') {
            setNodes(generateNodes(wave));
            setTimeLeft(maxTime - (wave - 1) * 5); // Less time each wave
            setMessage(`Wave ${wave}: ${wave === 1 ? 'Click unstable nodes!' : wave === 2 ? 'They\'re faster now!' : 'Final wave - BOSS NODES!'}`);
        }
    }, [wave, gameState, generateNodes]);

    // Timer
    useEffect(() => {
        if (gameState !== 'playing') return;

        const timer = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) {
                    // Time's up - check if passed
                    const unstableCount = nodes.filter(n => !n.stable).length;
                    if (unstableCount <= 2) {
                        handleWaveComplete();
                    } else {
                        setMessage("System overload! Retry wave...");
                        setTimeout(() => setNodes(generateNodes(wave)), 1500);
                    }
                    return maxTime - (wave - 1) * 5;
                }
                return t - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [gameState, wave, nodes, generateNodes]);

    // Destabilize nodes over time
    useEffect(() => {
        if (gameState !== 'playing') return;

        const interval = setInterval(() => {
            setNodes(prev => {
                const unstableCount = prev.filter(n => !n.stable).length;
                if (unstableCount >= Math.min(6 + wave, prev.length - 2)) return prev;

                const stableNodes = prev.filter(n => n.stable);
                if (stableNodes.length === 0) return prev;

                const randomNode = stableNodes[Math.floor(Math.random() * stableNodes.length)];
                return prev.map(n => n.id === randomNode.id ? { ...n, stable: false } : n);
            });
        }, Math.max(1500 - wave * 300, 500));

        return () => clearInterval(interval);
    }, [gameState, wave]);

    const handleWaveComplete = () => {
        if (wave >= totalWaves) {
            setGameState('victory');
            setMessage("NEURAL NETWORK FULLY CALIBRATED!");
            setTimeout(onComplete, 2500);
        } else {
            setGameState('waveComplete');
            setMessage(`Wave ${wave} Complete! +${wave * 50} bonus`);
            setScore(s => s + wave * 50);
            setTimeout(() => {
                setWave(w => w + 1);
                setGameState('playing');
            }, 2000);
        }
    };

    const handleNodeClick = (nodeId: number) => {
        if (gameState !== 'playing') return;

        setNodes(prev => prev.map(n => {
            if (n.id === nodeId && !n.stable) {
                const points = n.type === 'boss' ? 5 : n.type === 'fast' ? 3 : 1;
                const comboMultiplier = 1 + combo * 0.2;
                setScore(s => s + Math.round(points * comboMultiplier));
                setCombo(c => c + 1);
                setMessage(getRandomMessage(n.type, combo));

                // Check wave completion
                const newNodes = prev.map(node => node.id === nodeId ? { ...node, stable: true } : node);
                const unstableLeft = newNodes.filter(node => !node.stable).length;
                if (unstableLeft === 0) {
                    setTimeout(handleWaveComplete, 500);
                }

                return { ...n, stable: true };
            }
            return n;
        }));

        // Reset combo after delay
        setTimeout(() => setCombo(0), 2000);
    };

    const getRandomMessage = (type: string, currentCombo: number) => {
        if (currentCombo >= 5) return `🔥 ${currentCombo + 1}x COMBO!`;
        if (type === 'boss') return "BOSS NODE DEFEATED!";
        const messages = [
            "Weight optimized!",
            "Gradient normalized.",
            "Bias corrected.",
            "Activation stabilized!",
            "Backpropagation complete.",
            "Loss decreasing...",
            "Convergence detected!",
            "Tensor reshaped!",
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    };

    const getNodeColor = (type: string, stable: boolean) => {
        if (stable) return { bg: 'bg-green-500/30', border: 'border-green-400', glow: '#22c55e' };
        switch (type) {
            case 'boss': return { bg: 'bg-orange-500/30', border: 'border-orange-400', glow: '#f97316' };
            case 'fast': return { bg: 'bg-yellow-500/30', border: 'border-yellow-400', glow: '#eab308' };
            default: return { bg: 'bg-red-500/30', border: 'border-red-400', glow: '#ef4444' };
        }
    };

    return (
        <div className="relative w-full h-full cursor-pointer">
            {/* HUD */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-20">
                <div className="space-y-1">
                    <p className="text-xs text-white/40 uppercase tracking-wider">Wave</p>
                    <p className="text-3xl font-bold text-purple-400">{wave}/{totalWaves}</p>
                </div>
                <div className="text-center space-y-1">
                    <p className="text-xs text-white/40 uppercase tracking-wider">Time</p>
                    <p className={`text-3xl font-bold ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                        {timeLeft}s
                    </p>
                </div>
                <div className="text-right space-y-1">
                    <p className="text-xs text-white/40 uppercase tracking-wider">Score</p>
                    <p className="text-3xl font-bold text-green-400">{score}</p>
                </div>
            </div>

            {/* Combo indicator */}
            <AnimatePresence>
                {combo > 1 && (
                    <motion.div
                        initial={{ scale: 0, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute top-20 left-1/2 -translate-x-1/2 text-2xl font-bold text-yellow-400"
                        style={{ textShadow: '0 0 20px #eab308' }}
                    >
                        {combo}x COMBO!
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Message */}
            <motion.p
                key={message}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-28 left-1/2 -translate-x-1/2 text-lg text-purple-300 font-medium text-center px-4"
            >
                {message}
            </motion.p>

            {/* Wave complete overlay */}
            <AnimatePresence>
                {gameState === 'waveComplete' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/50 z-30"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-4xl font-bold text-green-400"
                            style={{ textShadow: '0 0 40px #22c55e' }}
                        >
                            WAVE {wave} COMPLETE!
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Victory overlay */}
            <AnimatePresence>
                {gameState === 'victory' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/70 z-30"
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="text-center space-y-4"
                        >
                            <p className="text-5xl font-bold text-green-400" style={{ textShadow: '0 0 40px #22c55e' }}>
                                VICTORY!
                            </p>
                            <p className="text-2xl text-white/80">Final Score: {score}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Nodes */}
            {nodes.map(node => {
                const colors = getNodeColor(node.type, node.stable);
                return (
                    <motion.button
                        key={node.id}
                        className={`absolute rounded-full border-2 cursor-pointer transition-colors ${colors.bg} ${colors.border}`}
                        style={{
                            left: node.x - (node.type === 'boss' ? 30 : 20),
                            top: node.y - (node.type === 'boss' ? 30 : 20),
                            width: node.type === 'boss' ? 60 : 40,
                            height: node.type === 'boss' ? 60 : 40,
                        }}
                        onClick={() => handleNodeClick(node.id)}
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.9 }}
                        animate={node.stable ? {} : {
                            scale: [1, 1.15, 1],
                            boxShadow: [`0 0 10px ${colors.glow}`, `0 0 30px ${colors.glow}`, `0 0 10px ${colors.glow}`],
                        }}
                        transition={node.stable ? {} : {
                            duration: node.type === 'fast' ? 0.4 : node.type === 'boss' ? 1.2 : 0.8,
                            repeat: Infinity,
                        }}
                    >
                        {node.stable && (
                            <motion.div
                                className="absolute inset-0 rounded-full bg-green-400"
                                initial={{ scale: 0 }}
                                animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                                transition={{ duration: 0.5 }}
                            />
                        )}
                        {node.type === 'boss' && !node.stable && (
                            <span className="absolute inset-0 flex items-center justify-center text-xl">💀</span>
                        )}
                    </motion.button>
                );
            })}

            {/* Legend */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-6 text-xs text-white/50">
                <span className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" /> Normal
                </span>
                {wave >= 2 && (
                    <span className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500" /> Fast
                    </span>
                )}
                {wave >= 3 && (
                    <span className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center text-[8px]">💀</div> Boss
                    </span>
                )}
            </div>
        </div>
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
