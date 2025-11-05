'use client';

import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const useParticlePositions = (count: number, radius: number) => {
  return useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius + Math.random() * 0.35;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      positions.set([x, y, z], i * 3);
    }
    return positions;
  }, [count, radius]);
};

const NeonCore: React.FC = () => {
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!coreRef.current) return;
    coreRef.current.rotation.y += delta * 0.6;
    const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    coreRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={coreRef}>
      <icosahedronGeometry args={[1.05, 1]} />
      <meshStandardMaterial
        color="#a855f7"
        metalness={0.9}
        roughness={0.1}
        emissive="#c084fc"
        emissiveIntensity={0.65}
        transparent
        opacity={0.95}
      />
    </mesh>
  );
};

interface HaloProps {
  radius: number;
  speed: number;
  tilt: number;
  color: string;
}

const NeuralHalo: React.FC<HaloProps> = ({ radius, speed, tilt, color }) => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.y += delta * speed;
  });

  return (
    <mesh ref={ringRef} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.035, 32, 256]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.2}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
};

const ParticleField: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useParticlePositions(650, 2.4);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.08;
    pointsRef.current.rotation.x += delta * 0.02;
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
        size={0.06}
        transparent
        opacity={0.65}
        color="#a855f7"
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
};

const NeuralLinks: React.FC = () => {
  const linkRef = useRef<THREE.LineSegments>(null);
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const vertices = [];
    const lineCount = 160;
    for (let i = 0; i < lineCount; i++) {
      const angle = (i / lineCount) * Math.PI * 2;
      const innerRadius = 1.6 + (Math.sin(i) * 0.2);
      const outerRadius = innerRadius + 0.25;
      vertices.push(
        innerRadius * Math.cos(angle),
        (Math.cos(angle * 3) * 0.3),
        innerRadius * Math.sin(angle)
      );
      vertices.push(
        outerRadius * Math.cos(angle + 0.12),
        (Math.sin(angle * 2) * 0.45),
        outerRadius * Math.sin(angle + 0.12)
      );
    }
    geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return geom;
  }, []);

  useFrame((_, delta) => {
    if (!linkRef.current) return;
    linkRef.current.rotation.z += delta * 0.12;
    linkRef.current.rotation.y -= delta * 0.09;
  });

  return (
    <lineSegments ref={linkRef} geometry={geometry}>
      <lineBasicMaterial color="#22d3ee" linewidth={1} transparent opacity={0.4} />
    </lineSegments>
  );
};

const HeroShape: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-30 md:opacity-40" style={{ pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.45} />
        <pointLight position={[4, 4, 6]} intensity={60} color="#c084fc" />
        <pointLight position={[-6, -2, -4]} intensity={40} color="#22d3ee" />
        <spotLight
          position={[0, 8, 2]}
          angle={0.6}
          penumbra={0.4}
          intensity={35}
          color="#ffffff"
        />

        <group>
          <ParticleField />
          <NeuralLinks />
          <NeuralHalo radius={1.7} speed={0.5} tilt={Math.PI / 6} color="#22d3ee" />
          <NeuralHalo radius={2.1} speed={-0.35} tilt={-Math.PI / 5} color="#a855f7" />
          <NeuralHalo radius={2.5} speed={0.25} tilt={Math.PI / 3.2} color="#38bdf8" />
          <NeonCore />
        </group>

        {/* Uncomment for debugging */}
        {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
      </Canvas>
    </div>
  );
};

export default HeroShape;
