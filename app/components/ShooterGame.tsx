'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShooterGameProps {
    onComplete: () => void;
}

interface Bullet {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    isEnemy: boolean;
}

interface Enemy {
    id: number;
    x: number;
    y: number;
    health: number;
    maxHealth: number;
    type: 'virus' | 'worm' | 'trojan' | 'malware' | 'boss';
    lastShot: number;
    active: boolean;
}

const ENEMY_CONFIG = {
    virus: { health: 2, speed: 2.5, size: 28, points: 15, shootRate: 0, color: '#ef4444', damage: 15 },
    worm: { health: 1, speed: 4.5, size: 22, points: 20, shootRate: 0, color: '#eab308', damage: 10 },
    trojan: { health: 5, speed: 1.2, size: 38, points: 40, shootRate: 0, color: '#f97316', damage: 25 },
    malware: { health: 3, speed: 1.8, size: 32, points: 35, shootRate: 1200, color: '#a855f7', damage: 15 },
    boss: { health: 100, speed: 1, size: 100, points: 1000, shootRate: 400, color: '#dc2626', damage: 30 },
};

const STAGES = [
    { name: 'WAVE 1: System Breach', types: ['virus', 'virus', 'virus', 'worm', 'worm'] },
    { name: 'WAVE 2: Spreading', types: ['virus', 'worm', 'worm', 'worm', 'trojan', 'virus'] },
    { name: 'WAVE 3: Infiltration', types: ['trojan', 'malware', 'virus', 'worm', 'malware', 'virus'] },
    { name: 'WAVE 4: Critical', types: ['malware', 'malware', 'trojan', 'worm', 'worm', 'virus', 'malware'] },
    { name: 'WAVE 5: FINAL BOSS', types: ['boss'] },
];

export default function ShooterGame({ onComplete }: ShooterGameProps) {
    const gameRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<number>(0);

    // Use refs for real-time game state
    const playerRef = useRef({ x: 450, y: 350, rotation: 0, health: 100 });
    const bulletsRef = useRef<Bullet[]>([]);
    const enemiesRef = useRef<Enemy[]>([]);
    const keysRef = useRef(new Set<string>());
    const mouseRef = useRef({ x: 450, y: 300, down: false });
    const invincibleRef = useRef(false);
    const lastShotRef = useRef(0);
    const bulletIdRef = useRef(0);
    const enemyIdRef = useRef(0);

    // State for React rendering
    const [player, setPlayer] = useState({ x: 450, y: 350, rotation: 0, health: 100 });
    const [bullets, setBullets] = useState<Bullet[]>([]);
    const [enemies, setEnemies] = useState<Enemy[]>([]);
    const [stage, setStage] = useState(1);
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState<'playing' | 'stageComplete' | 'victory' | 'gameOver'>('playing');
    const [message, setMessage] = useState(STAGES[0].name);

    const gameWidth = typeof window !== 'undefined' ? Math.min(window.innerWidth - 80, 950) : 900;
    const gameHeight = typeof window !== 'undefined' ? Math.min(window.innerHeight - 160, 620) : 580;

    // Spawn enemies
    const spawnEnemies = useCallback(() => {
        const stageData = STAGES[stage - 1];
        const newEnemies: Enemy[] = [];

        stageData.types.forEach((type, i) => {
            const t = type as keyof typeof ENEMY_CONFIG;
            const config = ENEMY_CONFIG[t];

            // Spawn from edges
            const edge = i % 4;
            let x = 0, y = 0;
            if (edge === 0) { x = Math.random() * gameWidth; y = -config.size; }
            else if (edge === 1) { x = gameWidth + config.size; y = Math.random() * gameHeight; }
            else if (edge === 2) { x = Math.random() * gameWidth; y = gameHeight + config.size; }
            else { x = -config.size; y = Math.random() * gameHeight; }

            newEnemies.push({
                id: enemyIdRef.current++,
                x, y,
                health: config.health,
                maxHealth: config.health,
                type: t,
                lastShot: Date.now() + i * 500,
                active: true,
            });
        });

        enemiesRef.current = newEnemies;
        setEnemies(newEnemies);
        setMessage(stageData.name);
    }, [stage, gameWidth, gameHeight]);

    // Initialize stage
    useEffect(() => {
        if (gameState === 'playing') {
            playerRef.current = { x: gameWidth / 2, y: gameHeight / 2, rotation: 0, health: playerRef.current.health };
            bulletsRef.current = [];
            spawnEnemies();
        }
    }, [stage, gameState, spawnEnemies, gameWidth, gameHeight]);

    // Input handlers
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => { keysRef.current.add(e.key.toLowerCase()); if (e.key === ' ') e.preventDefault(); };
        const onKeyUp = (e: KeyboardEvent) => keysRef.current.delete(e.key.toLowerCase());
        const onMouseMove = (e: MouseEvent) => {
            if (gameRef.current) {
                const rect = gameRef.current.getBoundingClientRect();
                mouseRef.current.x = e.clientX - rect.left;
                mouseRef.current.y = e.clientY - rect.top;
            }
        };
        const onMouseDown = () => mouseRef.current.down = true;
        const onMouseUp = () => mouseRef.current.down = false;

        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    // MAIN GAME LOOP
    useEffect(() => {
        if (gameState !== 'playing') return;

        const loop = () => {
            const now = Date.now();
            const keys = keysRef.current;
            const mouse = mouseRef.current;
            const p = playerRef.current;

            // === PLAYER MOVEMENT ===
            const speed = 5;
            if (keys.has('w') || keys.has('arrowup')) p.y -= speed;
            if (keys.has('s') || keys.has('arrowdown')) p.y += speed;
            if (keys.has('a') || keys.has('arrowleft')) p.x -= speed;
            if (keys.has('d') || keys.has('arrowright')) p.x += speed;
            p.x = Math.max(20, Math.min(gameWidth - 20, p.x));
            p.y = Math.max(20, Math.min(gameHeight - 20, p.y));

            // Rotation toward mouse
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            p.rotation = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

            // === PLAYER SHOOTING ===
            if ((mouse.down || keys.has(' ')) && now - lastShotRef.current > 100) {
                lastShotRef.current = now;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                bulletsRef.current.push({
                    id: bulletIdRef.current++,
                    x: p.x, y: p.y,
                    vx: (dx / dist) * 16,
                    vy: (dy / dist) * 16,
                    isEnemy: false,
                });
            }

            // === UPDATE BULLETS ===
            bulletsRef.current = bulletsRef.current
                .map(b => ({ ...b, x: b.x + b.vx, y: b.y + b.vy }))
                .filter(b => b.x > -30 && b.x < gameWidth + 30 && b.y > -30 && b.y < gameHeight + 30);

            // === UPDATE ENEMIES ===
            const newEnemyBullets: Bullet[] = [];

            enemiesRef.current = enemiesRef.current.map(e => {
                if (!e.active || e.health <= 0) return e;

                const config = ENEMY_CONFIG[e.type];
                const edx = p.x - e.x;
                const edy = p.y - e.y;
                const dist = Math.sqrt(edx * edx + edy * edy) || 1;

                let nx = e.x, ny = e.y;

                // Movement patterns
                if (e.type === 'boss') {
                    nx = gameWidth / 2 + Math.sin(now / 700) * (gameWidth * 0.35);
                    ny = 90 + Math.sin(now / 1000) * 40;
                } else if (e.type === 'worm') {
                    const zig = Math.sin(now / 100 + e.id) * 3;
                    nx += (edx / dist) * config.speed + zig;
                    ny += (edy / dist) * config.speed;
                } else if (e.type === 'malware') {
                    if (dist > 180) {
                        nx += (edx / dist) * config.speed;
                        ny += (edy / dist) * config.speed;
                    } else if (dist < 120) {
                        nx -= (edx / dist) * config.speed * 0.5;
                        ny -= (edy / dist) * config.speed * 0.5;
                    }
                } else {
                    nx += (edx / dist) * config.speed;
                    ny += (edy / dist) * config.speed;
                }

                nx = Math.max(config.size / 2, Math.min(gameWidth - config.size / 2, nx));
                ny = Math.max(config.size / 2, Math.min(gameHeight - config.size / 2, ny));

                // Enemy shooting
                let newLastShot = e.lastShot;
                if (config.shootRate > 0 && now - e.lastShot > config.shootRate) {
                    newLastShot = now;
                    if (e.type === 'boss') {
                        for (let i = 0; i < 7; i++) {
                            const angle = Math.atan2(edy, edx) + (i - 3) * 0.25;
                            newEnemyBullets.push({
                                id: bulletIdRef.current++,
                                x: e.x, y: e.y + 40,
                                vx: Math.cos(angle) * 6,
                                vy: Math.sin(angle) * 6,
                                isEnemy: true,
                            });
                        }
                    } else {
                        newEnemyBullets.push({
                            id: bulletIdRef.current++,
                            x: e.x, y: e.y,
                            vx: (edx / dist) * 7,
                            vy: (edy / dist) * 7,
                            isEnemy: true,
                        });
                    }
                }

                return { ...e, x: nx, y: ny, lastShot: newLastShot };
            });

            bulletsRef.current.push(...newEnemyBullets);

            // === COLLISION: Player bullets -> Enemies ===
            const hitBulletIds = new Set<number>();
            let scoreGain = 0;

            enemiesRef.current = enemiesRef.current.map(e => {
                if (!e.active || e.health <= 0) return e;
                const config = ENEMY_CONFIG[e.type];
                let dmg = 0;

                bulletsRef.current.filter(b => !b.isEnemy).forEach(b => {
                    const d = Math.sqrt((b.x - e.x) ** 2 + (b.y - e.y) ** 2);
                    if (d < config.size / 2 + 10) {
                        dmg++;
                        hitBulletIds.add(b.id);
                    }
                });

                if (dmg > 0) {
                    const newHealth = e.health - dmg;
                    if (newHealth <= 0) {
                        scoreGain += config.points;
                        return { ...e, health: 0, active: false };
                    }
                    return { ...e, health: newHealth };
                }
                return e;
            });

            if (hitBulletIds.size > 0) {
                bulletsRef.current = bulletsRef.current.filter(b => !hitBulletIds.has(b.id));
            }

            // === COLLISION: Enemy bullets/touch -> Player ===
            if (!invincibleRef.current) {
                let tookDamage = 0;

                // Enemy bullets
                bulletsRef.current.filter(b => b.isEnemy).forEach(b => {
                    const d = Math.sqrt((b.x - p.x) ** 2 + (b.y - p.y) ** 2);
                    if (d < 25) {
                        tookDamage += 10;
                        bulletsRef.current = bulletsRef.current.filter(bb => bb.id !== b.id);
                    }
                });

                // Enemy touch
                enemiesRef.current.filter(e => e.active && e.health > 0).forEach(e => {
                    const config = ENEMY_CONFIG[e.type];
                    const d = Math.sqrt((e.x - p.x) ** 2 + (e.y - p.y) ** 2);
                    if (d < config.size / 2 + 22) {
                        tookDamage += config.damage;
                    }
                });

                if (tookDamage > 0) {
                    p.health -= tookDamage;
                    invincibleRef.current = true;
                    setTimeout(() => invincibleRef.current = false, 1000);
                }
            }

            // Update score
            if (scoreGain > 0) {
                setScore(s => s + scoreGain);
            }

            // === SYNC TO REACT STATE ===
            setPlayer({ ...p });
            setBullets([...bulletsRef.current]);
            setEnemies([...enemiesRef.current]);

            // === CHECK WIN/LOSE ===
            if (p.health <= 0) {
                setGameState('gameOver');
                return;
            }

            const aliveEnemies = enemiesRef.current.filter(e => e.active && e.health > 0);
            if (aliveEnemies.length === 0) {
                if (stage >= STAGES.length) {
                    setGameState('victory');
                    setTimeout(onComplete, 3500);
                } else {
                    setGameState('stageComplete');
                    setTimeout(() => {
                        setStage(s => s + 1);
                        playerRef.current.health = Math.min(playerRef.current.health + 25, 100);
                        setGameState('playing');
                    }, 2000);
                }
                return;
            }

            frameRef.current = requestAnimationFrame(loop);
        };

        frameRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(frameRef.current);
    }, [gameState, gameWidth, gameHeight, stage, onComplete]);

    const resetGame = () => {
        playerRef.current = { x: gameWidth / 2, y: gameHeight / 2, rotation: 0, health: 100 };
        bulletsRef.current = [];
        invincibleRef.current = false;
        setScore(0);
        setStage(1);
        setGameState('playing');
    };

    const aliveEnemies = enemies.filter(e => e.active && e.health > 0);
    const isInvincible = invincibleRef.current;

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center select-none">
            {/* HUD */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20 pointer-events-none">
                <div className="bg-black/70 px-4 py-2 rounded-lg border border-purple-500/40">
                    <p className="text-xs text-purple-400 font-bold">WAVE</p>
                    <p className="text-2xl font-bold text-white">{stage}/5</p>
                </div>
                <div className="bg-black/70 px-4 py-2 rounded-lg border border-white/20 text-center">
                    <p className="text-sm font-bold text-purple-300">{message}</p>
                    <p className="text-xs text-red-400">Enemies: {aliveEnemies.length}</p>
                </div>
                <div className="bg-black/70 px-4 py-2 rounded-lg border border-green-500/40 text-right">
                    <p className="text-xs text-green-400 font-bold">SCORE</p>
                    <p className="text-2xl font-bold text-white">{score}</p>
                </div>
            </div>

            {/* Health */}
            <div className="absolute top-[72px] left-1/2 -translate-x-1/2 w-72 z-20 pointer-events-none">
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-white/30">
                    <div
                        className="h-full bg-gradient-to-r from-red-600 to-orange-400 transition-all duration-200"
                        style={{ width: `${Math.max(0, player.health)}%` }}
                    />
                </div>
            </div>

            {/* Game area */}
            <div
                ref={gameRef}
                className="relative rounded-xl overflow-hidden cursor-crosshair"
                style={{
                    width: gameWidth,
                    height: gameHeight,
                    background: 'linear-gradient(135deg, #0a0018 0%, #15002a 100%)',
                    border: '2px solid rgba(168,85,247,0.5)',
                    boxShadow: '0 0 40px rgba(168,85,247,0.25)',
                }}
            >
                {/* Grid */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'linear-gradient(#a855f7 1px, transparent 1px), linear-gradient(90deg, #a855f7 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }} />

                {/* Player */}
                <div
                    className={`absolute transition-opacity ${isInvincible ? 'opacity-40' : ''}`}
                    style={{
                        left: player.x - 20,
                        top: player.y - 20,
                        width: 40,
                        height: 40,
                        transform: `rotate(${player.rotation}deg)`,
                    }}
                >
                    <svg viewBox="0 0 40 40" className="w-full h-full">
                        <defs>
                            <linearGradient id="sg" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#22d3ee" />
                                <stop offset="100%" stopColor="#0891b2" />
                            </linearGradient>
                        </defs>
                        <polygon points="20,2 36,38 20,30 4,38" fill="url(#sg)" stroke="#67e8f9" strokeWidth="1.5" />
                        <circle cx="20" cy="10" r="3" fill="#fff" />
                    </svg>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-3 bg-orange-400 rounded-full animate-pulse" style={{ boxShadow: '0 0 8px #f97316' }} />
                </div>

                {/* Bullets */}
                {bullets.map(b => (
                    <div
                        key={b.id}
                        className="absolute rounded-full"
                        style={{
                            left: b.x - 5,
                            top: b.y - 5,
                            width: 10,
                            height: 10,
                            background: b.isEnemy ? '#ef4444' : '#22d3ee',
                            boxShadow: `0 0 12px ${b.isEnemy ? '#ef4444' : '#22d3ee'}`,
                        }}
                    />
                ))}

                {/* Enemies */}
                {aliveEnemies.map(e => {
                    const config = ENEMY_CONFIG[e.type];
                    return (
                        <motion.div
                            key={e.id}
                            className="absolute"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            style={{
                                left: e.x - config.size / 2,
                                top: e.y - config.size / 2,
                                width: config.size,
                                height: config.size,
                            }}
                        >
                            <div
                                className={`w-full h-full ${e.type === 'boss' ? 'rounded-xl' : 'rounded-full'} flex items-center justify-center`}
                                style={{
                                    background: config.color,
                                    boxShadow: `0 0 20px ${config.color}`,
                                    border: `2px solid ${config.color}`,
                                }}
                            >
                                <span style={{ fontSize: config.size / 2.5 }}>
                                    {e.type === 'boss' ? '💀' : e.type === 'malware' ? '🔫' : e.type === 'trojan' ? '🛡️' : e.type === 'worm' ? '🐛' : '👾'}
                                </span>
                            </div>
                            {e.type === 'boss' && (
                                <div className="absolute -top-5 left-0 right-0 h-3 bg-gray-900 rounded border border-red-500/50">
                                    <div className="h-full bg-red-500 rounded" style={{ width: `${(e.health / e.maxHealth) * 100}%` }} />
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Controls */}
            <p className="absolute bottom-3 text-xs text-white/40">WASD = Move • Mouse = Aim • Click/Space = Shoot</p>

            {/* Overlays */}
            <AnimatePresence>
                {gameState === 'stageComplete' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/70 flex items-center justify-center z-30">
                        <p className="text-4xl font-bold text-green-400" style={{ textShadow: '0 0 30px #22c55e' }}>WAVE {stage} CLEARED!</p>
                    </motion.div>
                )}
                {gameState === 'victory' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/80 flex items-center justify-center z-30">
                        <div className="text-center">
                            <p className="text-5xl font-bold text-green-400 mb-4" style={{ textShadow: '0 0 40px #22c55e' }}>🎉 VICTORY! 🎉</p>
                            <p className="text-xl text-white">Neural Core Saved! Score: {score}</p>
                        </div>
                    </motion.div>
                )}
                {gameState === 'gameOver' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/80 flex items-center justify-center z-30">
                        <div className="text-center">
                            <p className="text-4xl font-bold text-red-500 mb-4" style={{ textShadow: '0 0 30px #ef4444' }}>SYSTEM COMPROMISED</p>
                            <p className="text-lg text-white/60 mb-4">Score: {score}</p>
                            <button onClick={resetGame} className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold cursor-pointer">TRY AGAIN</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
