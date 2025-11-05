'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { FaTimes } from 'react-icons/fa';

interface AIMinigameOverlayProps {
  onClose: () => void;
}

type Bullet = { id: number; x: number; y: number; hit?: boolean };
type Enemy = { id: number; x: number; y: number; speed: number; radius: number };
type Upgrade = { id: number; x: number; y: number; speed: number };

interface UiState {
  score: number;
  hardwareLevel: number;
  integrity: number;
  wave: number;
  status: string;
  gameOver: boolean;
}

const MAX_LANE_X = 3.2;
const INITIAL_INTEGRITY = 3;
const INITIAL_STATUS = 'Navigate the training lane. A/D or ←/→ to dodge, space to pulse obstacles.';

const ParticleBackdrop: React.FC = () => {
  const particles = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 1200; i++) {
      positions.push((Math.random() - 0.5) * 22);
      positions.push((Math.random() - 0.5) * 22);
      positions.push((Math.random() - 0.5) * 22);
    }
    return new Float32Array(positions);
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.025;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#8b5cf6" size={0.05} sizeAttenuation transparent opacity={0.45} />
    </points>
  );
};

const PlayerShip: React.FC<{ shipXRef: React.MutableRefObject<number>; velocityRef: React.MutableRefObject<number> }> = ({
  shipXRef,
  velocityRef,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, shipXRef.current, 0.18);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -velocityRef.current * 0.12, 0.15);
  });

  return (
    <Float speed={1.4} floatIntensity={0.35} rotationIntensity={0.1}>
      <group ref={groupRef} position={[0, -3.2, 0]}>
        <mesh>
          <coneGeometry args={[0.42, 1.15, 12]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.65} roughness={0.25} metalness={0.8} />
        </mesh>
        <mesh position={[0, -0.78, 0]}>
          <cylinderGeometry args={[0.08, 0.18, 0.55, 8]} />
          <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.9} roughness={0.35} metalness={0.5} />
        </mesh>
      </group>
    </Float>
  );
};

interface SpaceShooterSceneProps {
  shipXRef: React.MutableRefObject<number>;
  shipVelocityRef: React.MutableRefObject<number>;
  keyStateRef: React.MutableRefObject<{ left: boolean; right: boolean }>;
  bulletsRef: React.MutableRefObject<Bullet[]>;
  enemiesRef: React.MutableRefObject<Enemy[]>;
  upgradesRef: React.MutableRefObject<Upgrade[]>;
  enemySpawnTimer: React.MutableRefObject<number>;
  upgradeSpawnTimer: React.MutableRefObject<number>;
  waveTimerRef: React.MutableRefObject<number>;
  scoreRef: React.MutableRefObject<number>;
  hardwareLevelRef: React.MutableRefObject<number>;
  integrityRef: React.MutableRefObject<number>;
  waveRef: React.MutableRefObject<number>;
  gameOverRef: React.MutableRefObject<boolean>;
  pendingStatusRef: React.MutableRefObject<string>;
  onStateChange: (state: UiState) => void;
}

const SpaceShooterScene: React.FC<SpaceShooterSceneProps> = ({
  shipXRef,
  shipVelocityRef,
  keyStateRef,
  bulletsRef,
  enemiesRef,
  upgradesRef,
  enemySpawnTimer,
  upgradeSpawnTimer,
  waveTimerRef,
  scoreRef,
  hardwareLevelRef,
  integrityRef,
  waveRef,
  gameOverRef,
  pendingStatusRef,
  onStateChange,
}) => {
  const lastReported = useRef({
    score: scoreRef.current,
    hardwareLevel: hardwareLevelRef.current,
    integrity: integrityRef.current,
    wave: waveRef.current,
    status: pendingStatusRef.current,
    gameOver: gameOverRef.current,
  });

  useFrame((_, delta) => {
    if (!gameOverRef.current) {
      const { left, right } = keyStateRef.current;
      const targetVelocity = right && !left ? 3.8 : left && !right ? -3.8 : 0;
      shipVelocityRef.current = THREE.MathUtils.lerp(shipVelocityRef.current, targetVelocity, 0.22);

      shipXRef.current += shipVelocityRef.current * delta * 2.2;
      shipXRef.current = THREE.MathUtils.clamp(shipXRef.current, -MAX_LANE_X, MAX_LANE_X);

      enemySpawnTimer.current += delta;
      const enemyInterval = Math.max(1.35 - hardwareLevelRef.current * 0.07 - waveRef.current * 0.05, 0.6);
      if (enemySpawnTimer.current >= enemyInterval) {
        enemySpawnTimer.current = 0;
        enemiesRef.current.push({
          id: performance.now() + Math.random(),
          x: (Math.random() * 2 - 1) * MAX_LANE_X,
          y: 3.2,
          speed: 1.15 + Math.random() * 0.45 + waveRef.current * 0.11,
          radius: 0.28 + Math.random() * 0.12,
        });
      }

      upgradeSpawnTimer.current += delta;
      const upgradeInterval = Math.max(7.5 - waveRef.current * 0.4, 3.8);
      if (upgradeSpawnTimer.current >= upgradeInterval) {
        upgradeSpawnTimer.current = 0;
        upgradesRef.current.push({
          id: performance.now() + Math.random(),
          x: (Math.random() * 2 - 1) * MAX_LANE_X * 0.82,
          y: 3.2,
          speed: 1.0,
        });
      }

      waveTimerRef.current += delta;
      if (waveTimerRef.current >= 22) {
        waveTimerRef.current = 0;
        waveRef.current += 1;
        pendingStatusRef.current = 'Training wave intensified. Obstacles accelerating.';
      }
    }

    const updatedBullets: Bullet[] = [];
    for (const bullet of bulletsRef.current) {
      if (bullet.hit) continue;
      bullet.y += delta * 6.4;
      if (bullet.y < 4) {
        updatedBullets.push(bullet);
      }
    }
    bulletsRef.current = updatedBullets;

    let gainedScore = 0;
    let lostIntegrity = 0;

    const remainingEnemies: Enemy[] = [];
    for (const enemy of enemiesRef.current) {
      if (!gameOverRef.current) {
        enemy.y -= delta * enemy.speed;
      }

      let destroyed = false;
      if (!gameOverRef.current) {
        for (const bullet of bulletsRef.current) {
          if (!bullet.hit && Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y) < enemy.radius + 0.3) {
            bullet.hit = true;
            gainedScore += 10;
            destroyed = true;
            break;
          }
        }
      }

      if (destroyed) {
        continue;
      }

      if (!gameOverRef.current && enemy.y <= -3.15) {
        lostIntegrity += 1;
        continue;
      }

      if (enemy.y > -5) {
        remainingEnemies.push(enemy);
      }
    }
    enemiesRef.current = remainingEnemies;

    let gainedHardware = 0;
    const remainingUpgrades: Upgrade[] = [];
    for (const upgrade of upgradesRef.current) {
      if (!gameOverRef.current) {
        upgrade.y -= delta * upgrade.speed;
      }
      const distance = Math.hypot(upgrade.x - shipXRef.current, upgrade.y + 3.2);
      if (!gameOverRef.current && distance < 0.52) {
        gainedHardware += 1;
        continue;
      }
      if (upgrade.y > -3.25) {
        remainingUpgrades.push(upgrade);
      }
    }
    upgradesRef.current = remainingUpgrades;

    if (gainedScore) {
      scoreRef.current += gainedScore;
      pendingStatusRef.current = 'Obstacle neutralized. Training data secured.';
    }

    if (gainedHardware) {
      hardwareLevelRef.current += gainedHardware;
      scoreRef.current += gainedHardware * 5;
      pendingStatusRef.current = 'Hardware upgrade acquired. Throughput increased.';
    }

    if (lostIntegrity) {
      integrityRef.current = Math.max(0, integrityRef.current - lostIntegrity);
      if (integrityRef.current <= 0 && !gameOverRef.current) {
        gameOverRef.current = true;
        pendingStatusRef.current = 'Simulation overloaded. Press R to restart or Esc to exit.';
      } else {
        pendingStatusRef.current = 'Systems taking fire. Stabilize the training run!';
      }
    }

    const nextState = {
      score: scoreRef.current,
      hardwareLevel: hardwareLevelRef.current,
      integrity: integrityRef.current,
      wave: waveRef.current,
      status: pendingStatusRef.current,
      gameOver: gameOverRef.current,
    };

    const prev = lastReported.current;
    if (
      prev.score !== nextState.score ||
      prev.hardwareLevel !== nextState.hardwareLevel ||
      prev.integrity !== nextState.integrity ||
      prev.wave !== nextState.wave ||
      prev.status !== nextState.status ||
      prev.gameOver !== nextState.gameOver
    ) {
      lastReported.current = { ...nextState };
      onStateChange(nextState);
    }
  });

  return (
    <>
      <ParticleBackdrop />
      <PlayerShip shipXRef={shipXRef} velocityRef={shipVelocityRef} />

      {bulletsRef.current.map((bullet) => (
        <mesh key={bullet.id} position={[bullet.x, bullet.y, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.55, 8]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.8} />
        </mesh>
      ))}

      {enemiesRef.current.map((enemy) => (
        <mesh key={enemy.id} position={[enemy.x, enemy.y, 0]}>
          <dodecahedronGeometry args={[enemy.radius, 0]} />
          <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.55} roughness={0.4} />
        </mesh>
      ))}

      {upgradesRef.current.map((upgrade) => (
        <mesh key={upgrade.id} position={[upgrade.x, upgrade.y, 0]}>
          <torusGeometry args={[0.26, 0.07, 12, 24]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.7} metalness={0.85} />
        </mesh>
      ))}
    </>
  );
};

const createInitialUiState = () => ({
  score: 0,
  hardwareLevel: 1,
  integrity: INITIAL_INTEGRITY,
  wave: 1,
  status: INITIAL_STATUS,
  gameOver: false,
});

const AIMinigameOverlay: React.FC<AIMinigameOverlayProps> = ({ onClose }) => {
  const [uiState, setUiState] = useState<UiState>(() => createInitialUiState());

  const shipXRef = useRef(0);
  const shipVelocityRef = useRef(0);
  const keyStateRef = useRef({ left: false, right: false });
  const bulletsRef = useRef<Bullet[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);
  const upgradesRef = useRef<Upgrade[]>([]);
  const lastShotRef = useRef(0);

  const enemySpawnTimer = useRef(0);
  const upgradeSpawnTimer = useRef(0);
  const waveTimerRef = useRef(0);

  const scoreRef = useRef(0);
  const hardwareLevelRef = useRef(1);
  const integrityRef = useRef(INITIAL_INTEGRITY);
  const waveRef = useRef(1);
  const gameOverRef = useRef(false);
  const pendingStatusRef = useRef(INITIAL_STATUS);

  const resetGame = useCallback(() => {
    bulletsRef.current = [];
    enemiesRef.current = [];
    upgradesRef.current = [];
    shipXRef.current = 0;
    shipVelocityRef.current = 0;
    keyStateRef.current = { left: false, right: false };
    lastShotRef.current = 0;
    enemySpawnTimer.current = 0;
    upgradeSpawnTimer.current = 0;
    waveTimerRef.current = 0;
    scoreRef.current = 0;
    hardwareLevelRef.current = 1;
    integrityRef.current = INITIAL_INTEGRITY;
    waveRef.current = 1;
    gameOverRef.current = false;
    const freshState = createInitialUiState();
    pendingStatusRef.current = freshState.status;
    setUiState(freshState);
  }, []);

  const handleStateChange = useCallback((nextState: UiState) => {
    setUiState((prev) => {
      if (
        prev.score === nextState.score &&
        prev.hardwareLevel === nextState.hardwareLevel &&
        prev.integrity === nextState.integrity &&
        prev.wave === nextState.wave &&
        prev.status === nextState.status &&
        prev.gameOver === nextState.gameOver
      ) {
        return prev;
      }
      return nextState;
    });
  }, []);

  const shoot = useCallback(() => {
    const now = performance.now();
    if (now - lastShotRef.current < 220 || gameOverRef.current) return;
    lastShotRef.current = now;
    bulletsRef.current.push({ id: now, x: shipXRef.current, y: -2.3 });
    if (bulletsRef.current.length > 24) {
      bulletsRef.current.splice(0, bulletsRef.current.length - 24);
    }
    pendingStatusRef.current = 'Pulse emitted. Keep the lane clear.';
    setUiState((prev) => ({ ...prev, status: pendingStatusRef.current }));
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (gameOverRef.current && event.key.toLowerCase() === 'r') {
        resetGame();
        return;
      }

      if (gameOverRef.current) return;

      const key = event.key.toLowerCase();
      if (key === 'arrowleft' || key === 'a') {
        keyStateRef.current.left = true;
      } else if (key === 'arrowright' || key === 'd') {
        keyStateRef.current.right = true;
      } else if (key === ' ' || key === 'spacebar') {
        event.preventDefault();
        shoot();
      }
    },
    [onClose, resetGame, shoot]
  );

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    if (key === 'arrowleft' || key === 'a') {
      keyStateRef.current.left = false;
    } else if (key === 'arrowright' || key === 'd') {
      keyStateRef.current.right = false;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const integrityDisplay = useMemo(() => {
    const filled = '#'.repeat(Math.max(0, uiState.integrity));
    const empty = '-'.repeat(Math.max(0, INITIAL_INTEGRITY - uiState.integrity));
    return filled + empty;
  }, [uiState.integrity]);

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#05010a]/95 backdrop-blur-3xl px-6 py-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.35),transparent_65%)] opacity-70 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.28),transparent_60%)] opacity-70 pointer-events-none" />

      <button
        onClick={onClose}
        className="absolute right-6 top-6 rounded-full border border-white/10 bg-white/10 p-3 text-white transition hover:bg-white/20"
        aria-label="Close AI Lab"
      >
        <FaTimes />
      </button>

      <div className="relative grid w-full max-w-5xl gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#090219]/80 shadow-[0_25px_80px_rgba(12,10,35,0.6)]">
          <Canvas camera={{ position: [0, 0, 7], fov: 55 }}>
            <color attach="background" args={['#05010a']} />
            <ambientLight intensity={0.55} />
            <pointLight position={[4, 4, 5]} intensity={60} color="#c084fc" />
            <pointLight position={[-5, -2, -4]} intensity={45} color="#22d3ee" />

            <SpaceShooterScene
              shipXRef={shipXRef}
              shipVelocityRef={shipVelocityRef}
              keyStateRef={keyStateRef}
              bulletsRef={bulletsRef}
              enemiesRef={enemiesRef}
              upgradesRef={upgradesRef}
              enemySpawnTimer={enemySpawnTimer}
              upgradeSpawnTimer={upgradeSpawnTimer}
              waveTimerRef={waveTimerRef}
              scoreRef={scoreRef}
              hardwareLevelRef={hardwareLevelRef}
              integrityRef={integrityRef}
              waveRef={waveRef}
              gameOverRef={gameOverRef}
              pendingStatusRef={pendingStatusRef}
              onStateChange={handleStateChange}
            />
          </Canvas>
        </div>

        <div className="glass-card relative flex flex-col gap-6 rounded-[32px] border border-white/10 bg-white/[0.05] p-8">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-300/70">AI Playground</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">Neural Calibration Lab</h3>
            <p className="mt-2 text-sm text-slate-300/85">
              Pilot the training craft, clear drifting obstacles, and collect hardware upgrades to accelerate the model.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-100/80">
            <p className="font-semibold text-white">Status</p>
            <p className="mt-1 text-slate-200/80">{uiState.status}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center text-sm text-slate-100/80">
            <div className="rounded-3xl border border-white/10 bg-white/5 px-3 py-4">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-300/70">Wave</p>
              <p className="mt-1 text-xl font-semibold text-white">{uiState.wave}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 px-3 py-4">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-300/70">Score</p>
              <p className="mt-1 text-xl font-semibold text-white">{uiState.score}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 px-3 py-4">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-300/70">Hardware</p>
              <p className="mt-1 text-xl font-semibold text-white">Lv {uiState.hardwareLevel}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 px-3 py-4">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-300/70">Integrity</p>
              <p className="mt-1 text-xl font-semibold text-white">{integrityDisplay}</p>
            </div>
          </div>

          {uiState.gameOver && (
            <button
              onClick={resetGame}
              className="w-full rounded-full border border-white/15 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-sky-400 px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_0_25px_rgba(133,76,255,0.4)] transition-transform duration-300 hover:scale-105"
            >
              Restart Simulation (R)
            </button>
          )}

          <div className="mt-auto flex flex-wrap gap-3 text-xs text-slate-300/70">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1">← → / A D to move</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1">Space to fire pulses</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1">Collect upgrades to boost hardware</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1">Esc to exit | R to reset</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMinigameOverlay;

