"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Image from "next/image";

export interface BotanicalSceneProps {
  points: boolean;
  paused: boolean;
  reduced: boolean;
  rotation: number;
  progress: { current: number };
  replay: number;
  onReady?: () => void;
  onUnavailable?: () => void;
}

// A procedural surface, not a plant scan or model attribution output. Both
// representations below share these exact vertices; no downloaded model needed.
function leafGeometry(length: number, width: number, phase: number) {
  const geometry = new THREE.BufferGeometry();
  const positions: number[] = [];
  const indices: number[] = [];
  const rows = 90;
  const columns = 42;
  for (let row = 0; row <= rows; row++) {
    const v = row / rows;
    const silhouette = Math.pow(Math.sin(Math.PI * v), 0.72);
    const notch = Math.pow(Math.max(0, Math.sin(v * Math.PI * 12 + phase)), 12);
    for (let column = 0; column <= columns; column++) {
      const u = column / columns * 2 - 1;
      const edge = 1 - 0.68 * notch * Math.pow(Math.abs(u), 1.1);
      positions.push(
        u * width * silhouette * edge,
        v * length,
        Math.sin(v * Math.PI) * 0.28 + Math.pow(Math.abs(u), 1.6) * 0.3 * silhouette - v * v * 0.38,
      );
      if (row < rows && column < columns) {
        const a = row * (columns + 1) + column;
        indices.push(a, a + 1, a + columns + 1, a + 1, a + columns + 2, a + columns + 1);
      }
    }
  }
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

export default function BotanicalScene(props: BotanicalSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const settings = useRef(props);
  settings.current = props;
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
    } catch {
      setFailed(true);
      settings.current.onUnavailable?.();
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 40);
    camera.position.set(0, 0.6, 10.4);
    camera.lookAt(0, 0.2, 0);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x6479b9, 3));
    const key = new THREE.DirectionalLight(0xffffff, 5);
    key.position.set(-3, 7, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -5;
    key.shadow.camera.right = 5;
    key.shadow.camera.top = 6;
    key.shadow.camera.bottom = -5;
    key.shadow.normalBias = 0.04;
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xb5dfff, 4);
    rim.position.set(4, 3, -2);
    scene.add(rim);

    const sculpture = new THREE.Group();
    sculpture.rotation.y = -0.3;
    scene.add(sculpture);
    const surfaces = new THREE.Group();
    const particles = new THREE.Group();
    sculpture.add(surfaces, particles);
    const leafMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1643e0, roughness: 0.31, metalness: 0.15,
      clearcoat: 0.4, clearcoatRoughness: 0.35, side: THREE.DoubleSide, transparent: true,
    });
    const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x335cf1, roughness: 0.38 });
    const dotMaterial = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false,
      uniforms: {
        uAssembly: { value: 0 }, uOpacity: { value: 1 },
        uSize: { value: 3.0 * renderer.getPixelRatio() },
        uColor: { value: new THREE.Color(0x214ce8) },
      },
      vertexShader: `
        attribute vec3 aStart;
        uniform float uAssembly;
        uniform float uSize;
        void main() {
          float t = uAssembly * uAssembly * (3.0 - 2.0 * uAssembly);
          vec3 assembled = mix(aStart, position, t);
          vec4 viewPosition = modelViewMatrix * vec4(assembled, 1.0);
          gl_Position = projectionMatrix * viewPosition;
          gl_PointSize = clamp(uSize * (6.0 / max(1.0, -viewPosition.z)), 1.0, 5.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uOpacity;
        void main() {
          float radius = length(gl_PointCoord - vec2(0.5));
          if (radius > 0.5) discard;
          gl_FragColor = vec4(uColor, uOpacity * (1.0 - smoothstep(0.3, 0.5, radius)));
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `,
    });

    // Length, half-width, attachment point, and spread of the individual leaves.
    const leaves = [
      { length: 2.65, width: 0.89, at: [-0.2, 0.55, 0], lean: -0.12, twist: -0.18 },
      { length: 2.3, width: 0.87, at: [-0.55, -0.05, 0.35], lean: 0.91, twist: 0.18 },
      { length: 2.5, width: 0.95, at: [0.38, 0.03, 0.1], lean: -0.82, twist: -0.14 },
      { length: 1.95, width: 0.8, at: [-0.25, -0.72, 0.72], lean: 1.32, twist: 0.45 },
      { length: 2.12, width: 0.8, at: [0.35, -0.77, 0.5], lean: -1.27, twist: -0.35 },
      { length: 1.85, width: 0.66, at: [0.16, -0.35, -0.5], lean: 0.42, twist: 2.45 },
    ];
    const geometries: THREE.BufferGeometry[] = [];
    leaves.forEach((leaf, index) => {
      const geometry = leafGeometry(leaf.length, leaf.width, index * 0.17);
      geometries.push(geometry);
      const mesh = new THREE.Mesh(geometry, leafMaterial);
      mesh.position.set(leaf.at[0], leaf.at[1], leaf.at[2]);
      mesh.rotation.set(-0.18, leaf.twist, leaf.lean);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      surfaces.add(mesh);
      const pointGeometry = new THREE.BufferGeometry();
      pointGeometry.setAttribute("position", geometry.getAttribute("position").clone());
      const startPositions = new Float32Array(geometry.getAttribute("position").count * 3);
      const hash = (n: number) => { const value = Math.sin(n * 127.1 + index * 311.7) * 43758.5453; return value - Math.floor(value); };
      for (let i = 0; i < startPositions.length / 3; i++) {
        startPositions[i * 3] = (hash(i * 3 + 1) - 0.5) * 3.8;
        startPositions[i * 3 + 1] = hash(i * 3 + 2) * 3.4 - 0.5;
        startPositions[i * 3 + 2] = (hash(i * 3 + 3) - 0.5) * 2.8;
      }
      pointGeometry.setAttribute("aStart", new THREE.BufferAttribute(startPositions, 3));
      geometries.push(pointGeometry);
      const points = new THREE.Points(pointGeometry, dotMaterial);
      points.frustumCulled = false;
      points.position.copy(mesh.position);
      points.rotation.copy(mesh.rotation);
      particles.add(points);
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -2.22, 0),
        new THREE.Vector3(leaf.at[0] * 0.3, -1.1, leaf.at[2] * 0.6),
        new THREE.Vector3(...leaf.at as [number, number, number]),
      ]);
      const stemGeometry = new THREE.TubeGeometry(curve, 30, 0.025, 6, false);
      geometries.push(stemGeometry);
      sculpture.add(new THREE.Mesh(stemGeometry, stemMaterial));
    });

    const potGeometry = new THREE.CylinderGeometry(0.66, 0.48, 0.82, 64);
    const potMaterial = new THREE.MeshStandardMaterial({ color: 0xe0e5f0, roughness: 0.64 });
    const pot = new THREE.Mesh(potGeometry, potMaterial);
    pot.position.set(0, -2.23, 0);
    pot.castShadow = true;
    pot.receiveShadow = true;
    sculpture.add(pot);
    const soilGeometry = new THREE.CircleGeometry(0.62, 48);
    const soilMaterial = new THREE.MeshStandardMaterial({ color: 0x122c72, roughness: 0.9 });
    const soil = new THREE.Mesh(soilGeometry, soilMaterial);
    soil.rotation.x = -Math.PI / 2;
    soil.position.set(0, -1.81, 0);
    sculpture.add(soil);
    const floorGeometry = new THREE.PlaneGeometry(200, 200);
    const floorMaterial = new THREE.ShadowMaterial({ opacity: 0.13 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.65;
    floor.receiveShadow = true;
    scene.add(floor);
    geometries.push(potGeometry, soilGeometry, floorGeometry);

    let visible = true;
    let hidden = document.hidden;
    let frame = 0;
    let lastFrame = -1000;
    let elapsed = 0;
    let dragAngle = 0;
    let dragStart = 0;
    let angleStart = 0;
    let dragging = false;
    let dirty = true;
    let previous = "";
    let targetX = 0;
    let targetY = 0;
    let lastProgress = -1;
    let openingTime = settings.current.reduced || settings.current.paused || settings.current.progress.current > 0.02 ? 2.4 : 0;
    let lastReplay = settings.current.replay;
    let notifiedReady = false;
    let cameraDistance = 10.4;
    const resize = new ResizeObserver(() => {
      const { width, height } = host.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(1, height);
      cameraDistance = camera.aspect < 0.9 ? 11.6 : 10.4;
      camera.position.z = cameraDistance;
      camera.updateProjectionMatrix();
      dirty = true;
    });
    resize.observe(host);
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (!visible) openingTime = 2.4; dirty = true; });
    visibility.observe(host);
    const onVisibility = () => { hidden = document.hidden; if (hidden) openingTime = 2.4; dirty = true; };
    document.addEventListener("visibilitychange", onVisibility);
    const down = (event: PointerEvent) => {
      if (event.pointerType === "touch") return; // Preserve vertical touch scrolling.
      openingTime = 2.4;
      dragging = true;
      dragStart = event.clientX;
      angleStart = dragAngle;
      canvas.setPointerCapture(event.pointerId);
    };
    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (dragging) dragAngle = angleStart + (event.clientX - dragStart) * 0.008;
      targetY = ((event.clientX - rect.left) / rect.width - 0.5) * 0.25;
      targetX = ((event.clientY - rect.top) / rect.height - 0.5) * 0.1;
      dirty = true;
    };
    const up = () => { dragging = false; };
    const leave = () => { targetX = 0; targetY = 0; dirty = true; };
    const contextLost = (event: Event) => { event.preventDefault(); cancelAnimationFrame(frame); setFailed(true); settings.current.onUnavailable?.(); };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);
    canvas.addEventListener("lostpointercapture", up);
    canvas.addEventListener("pointerleave", leave);
    canvas.addEventListener("webglcontextlost", contextLost);

    const tick = (time: number) => {
      frame = requestAnimationFrame(tick);
      if (!visible || hidden || time - lastFrame < 33) return;
      const s = settings.current;
      if (s.replay !== lastReplay) {
        openingTime = 0;
        dragAngle = 0; targetX = 0; targetY = 0;
        lastReplay = s.replay;
        dirty = true;
      }
      if (s.reduced || s.paused || s.progress.current > 0.02 || s.points || s.rotation !== 0) openingTime = 2.4;
      const key = `${s.points}|${s.paused}|${s.reduced}|${s.rotation}`;
      const scroll = s.reduced || s.paused ? 0 : s.progress.current;
      const animated = !s.paused && !s.reduced;
      if (key !== previous || Math.abs(scroll - lastProgress) > 0.001) dirty = true;
      if (!animated && !dirty) return;
      const delta = Math.min((time - lastFrame) / 1000, 0.05);
      lastFrame = time;
      if (animated) elapsed += delta;
      if (animated) openingTime = Math.min(2.4, openingTime + Math.min(delta, 0.1));
      const arrival = THREE.MathUtils.smoothstep(openingTime, 0, 2.15);
      const desired = -0.3 + s.rotation + dragAngle + (animated ? targetY + scroll * 0.55 + (1 - arrival) * 0.65 : 0);
      sculpture.rotation.y = s.reduced ? desired : THREE.MathUtils.damp(sculpture.rotation.y, desired, dragging ? 24 : 8, delta);
      sculpture.rotation.x = animated ? THREE.MathUtils.damp(sculpture.rotation.x, targetX * 0.35, 5, delta) : 0;
      sculpture.position.y = animated ? Math.sin(elapsed * 0.7) * 0.045 : 0;
      const openingDissolve = 1 - THREE.MathUtils.smoothstep(openingTime, 1.05, 2.15);
      const dissolve = s.points ? 1 : Math.max(openingDissolve, THREE.MathUtils.smoothstep(scroll, 0.12, 0.65));
      leafMaterial.opacity = 1 - dissolve;
      dotMaterial.uniforms.uOpacity.value = dissolve;
      dotMaterial.uniforms.uAssembly.value = THREE.MathUtils.smoothstep(openingTime, 0, 1.35);
      camera.position.z = cameraDistance + (1 - arrival) * 1.1;
      surfaces.visible = dissolve < 0.99;
      particles.visible = dissolve > 0.01;
      renderer.render(scene, camera);
      const settled = Math.abs(sculpture.rotation.y - desired) < 0.001;
      dirty = !settled;
      previous = key;
      lastProgress = scroll;
      canvas.dataset.ready = "true";
      canvas.dataset.representation = s.points ? "points" : "surface";
      canvas.dataset.dissolve = dissolve.toFixed(2);
      canvas.dataset.opening = openingTime < 1.35 ? "assembling" : openingTime < 2.15 ? "materializing" : "settled";
      if (!notifiedReady) { notifiedReady = true; settings.current.onReady?.(); }
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
      canvas.removeEventListener("lostpointercapture", up);
      canvas.removeEventListener("pointerleave", leave);
      canvas.removeEventListener("webglcontextlost", contextLost);
      geometries.forEach(geometry => geometry.dispose());
      [leafMaterial, stemMaterial, dotMaterial, potMaterial, soilMaterial, floorMaterial].forEach(material => material.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div className="garden-canvas-host" ref={hostRef}>
      {failed ? (
        <div className="garden-scene-poster garden-scene-fallback"><Image src="/images/personal/sculpture-poster.jpg" alt="The blue botanical sculpture, shown as a still image" fill sizes="(max-width: 900px) 100vw, 70vw" /><p>Still view · 3D is unavailable on this device.</p></div>
      ) : <canvas ref={canvasRef} aria-label="Procedural blue botanical sculpture. Rotate it or show its points from the Explore menu." role="img" />}
    </div>
  );
}
