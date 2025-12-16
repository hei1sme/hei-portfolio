'use client';

import React, { useMemo, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Hook to get mouse position in normalized device coordinates
const useMousePosition = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mouse;
};

const useParticlePositions = (count: number, radius: number) => {
  return useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius + Math.random() * 0.8;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      positions.set([x, y, z], i * 3);
    }
    return positions;
  }, [count, radius]);
};

interface MouseReactiveGroupProps {
  children: React.ReactNode;
  mouse: { x: number; y: number };
}

const MouseReactiveGroup: React.FC<MouseReactiveGroupProps> = ({ children, mouse }) => {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!groupRef.current) return;

    // Smooth follow mouse with gentle breathing
    targetRotation.current.x = mouse.y * 0.4;
    targetRotation.current.y = mouse.x * 0.4;

    groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.03;
    groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.03;

    // Subtle breathing effect
    const breathe = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    groupRef.current.scale.setScalar(1 + breathe);
  });

  return <group ref={groupRef}>{children}</group>;
};

// Glowing core sphere with pulsing effect
const GlowingCore: React.FC = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!coreRef.current || !outerRef.current) return;

    // Smooth rotation
    coreRef.current.rotation.y += delta * 0.3;
    coreRef.current.rotation.x += delta * 0.15;
    outerRef.current.rotation.y -= delta * 0.2;

    // Pulsing glow
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    coreRef.current.scale.setScalar(pulse);
    outerRef.current.scale.setScalar(pulse * 1.3);
  });

  return (
    <group>
      {/* Inner core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.8, 3]} />
        <meshStandardMaterial
          color="#ec4899"
          metalness={0.9}
          roughness={0.1}
          emissive="#9333ea"
          emissiveIntensity={1.2}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Outer glow shell */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.1, 2]} />
        <meshStandardMaterial
          color="#a855f7"
          metalness={0.8}
          roughness={0.2}
          emissive="#7c3aed"
          emissiveIntensity={0.6}
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>
    </group>
  );
};

// Orbital rings with gradient-like effect
interface RingProps {
  radius: number;
  speed: number;
  tilt: [number, number, number];
  color: string;
  thickness?: number;
}

const OrbitalRing: React.FC<RingProps> = ({ radius, speed, tilt, color, thickness = 0.015 }) => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z += delta * speed;
    // Subtle wobble
    ringRef.current.rotation.x = tilt[0] + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
  });

  return (
    <mesh ref={ringRef} rotation={tilt}>
      <torusGeometry args={[radius, thickness, 32, 128]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
};

// Floating particles with varied colors
const FloatingParticles: React.FC<{ color: string; count: number; radius: number; speed: number }> = ({
  color, count, radius, speed
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useParticlePositions(count, radius);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * speed;
    pointsRef.current.rotation.x += delta * speed * 0.3;

    // Pulsing size effect would require custom shader, so we pulse opacity
    const opacity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    (pointsRef.current.material as THREE.PointsMaterial).opacity = opacity;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        transparent
        opacity={0.6}
        color={color}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
};

// Energy beams connecting orbits
const EnergyBeams: React.FC = () => {
  const beamRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const vertices = [];
    const beamCount = 12;

    for (let i = 0; i < beamCount; i++) {
      const angle = (i / beamCount) * Math.PI * 2;
      const innerR = 0.9;
      const outerR = 2.2;

      vertices.push(
        innerR * Math.cos(angle),
        Math.sin(angle * 3) * 0.3,
        innerR * Math.sin(angle)
      );
      vertices.push(
        outerR * Math.cos(angle + 0.15),
        Math.cos(angle * 2) * 0.4,
        outerR * Math.sin(angle + 0.15)
      );
    }

    geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return geom;
  }, []);

  useFrame((state, delta) => {
    if (!beamRef.current) return;
    beamRef.current.rotation.y += delta * 0.15;
    beamRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
  });

  return (
    <lineSegments ref={beamRef} geometry={geometry}>
      <lineBasicMaterial color="#22d3ee" linewidth={2} transparent opacity={0.4} />
    </lineSegments>
  );
};

interface SceneProps {
  mouse: { x: number; y: number };
}

const Scene: React.FC<SceneProps> = ({ mouse }) => {
  return (
    <>
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.2} />

      {/* Purple accent light */}
      <pointLight position={[5, 3, 5]} intensity={100} color="#a855f7" />
      {/* Pink accent */}
      <pointLight position={[-4, -2, -4]} intensity={80} color="#ec4899" />
      {/* Cyan highlight */}
      <pointLight position={[0, -4, 3]} intensity={60} color="#22d3ee" />
      {/* Green accent */}
      <pointLight position={[-3, 4, -2]} intensity={50} color="#22c55e" />

      {/* Spotlight for drama */}
      <spotLight
        position={[0, 8, 0]}
        angle={0.4}
        penumbra={0.8}
        intensity={50}
        color="#ffffff"
      />

      <MouseReactiveGroup mouse={mouse}>
        {/* Particles in different colors */}
        <FloatingParticles color="#a855f7" count={600} radius={2.5} speed={0.04} />
        <FloatingParticles color="#ec4899" count={300} radius={3} speed={-0.03} />
        <FloatingParticles color="#22d3ee" count={200} radius={3.5} speed={0.02} />

        {/* Energy beams */}
        <EnergyBeams />

        {/* Orbital rings */}
        <OrbitalRing radius={1.4} speed={0.5} tilt={[Math.PI / 5, 0, 0]} color="#22d3ee" />
        <OrbitalRing radius={1.8} speed={-0.35} tilt={[-Math.PI / 4, Math.PI / 6, 0]} color="#a855f7" />
        <OrbitalRing radius={2.2} speed={0.25} tilt={[Math.PI / 3, -Math.PI / 8, 0]} color="#ec4899" />
        <OrbitalRing radius={2.6} speed={-0.18} tilt={[-Math.PI / 6, Math.PI / 4, 0]} color="#22c55e" thickness={0.01} />

        {/* Central core */}
        <GlowingCore />
      </MouseReactiveGroup>
    </>
  );
};

const HeroShape: React.FC = () => {
  const mouse = useMousePosition();

  return (
    <div className="absolute inset-0 z-0 opacity-70 md:opacity-80" style={{ pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }}>
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  );
};

export default HeroShape;
