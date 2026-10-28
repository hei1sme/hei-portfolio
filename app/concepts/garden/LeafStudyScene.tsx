"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Image from "next/image";
import { createLeafGeometry, leafInterior, leafNormal, leafPoint, sampleLeafPoints } from "./leafStudyGeometry";
import type { BotanicalSceneProps } from "./BotanicalScene";

export default function LeafStudyScene(props: BotanicalSceneProps) {
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
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 40);
    camera.position.set(0, 0.6, 10.4);
    camera.lookAt(0, 0.2, 0);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x8190b3, .85));
    const key = new THREE.DirectionalLight(0xffffff, 2.7);
    key.position.set(-3, 7, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(512, 512);
    key.shadow.radius = 5;
    key.shadow.blurSamples = 8;
    key.shadow.camera.left = -5;
    key.shadow.camera.right = 5;
    key.shadow.camera.top = 6;
    key.shadow.camera.bottom = -5;
    key.shadow.normalBias = .02;
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xb5dfff, 1.2);
    rim.position.set(4, 3, -2);
    scene.add(rim);

    const sculpture = new THREE.Group();
    sculpture.rotation.y = -0.16;
    scene.add(sculpture);
    const surfaces = new THREE.Group();
    const particles = new THREE.Group();
    sculpture.add(surfaces, particles);
    const leafMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff, vertexColors: true, roughness: .5, metalness: 0,
      clearcoat: .025, clearcoatRoughness: .7,
      side: THREE.FrontSide, transparent: true,
    });
    const backMaterial = new THREE.MeshStandardMaterial({ color: 0x718bcd, roughness: .72, side: THREE.BackSide, transparent: true });
    const rimMaterial = new THREE.MeshStandardMaterial({ color: 0x4262b9, roughness: .65, side: THREE.DoubleSide, transparent: true });
    const veinMaterial = new THREE.MeshStandardMaterial({ color: 0x2852b1, roughness: .9, transparent: true });
    const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x2147bd, roughness: .9, transparent: true });
    const dotMaterial = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false,
      uniforms: {
        uAssembly: { value: 0 }, uOpacity: { value: 1 },
        uSize: { value: 2.8 * renderer.getPixelRatio() },
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

    const geometries: THREE.BufferGeometry[] = [];
    const layers: { surface: THREE.Group; points: THREE.Points; rest: THREE.Vector3 }[] = [];
    const leaves = [
      { length: 3.85, width: 3.0, at: [.16, -1.30, -.12], lean: -.29, twist: -.38 },
      { length: 2.9, width: 2.35, at: [-.18, -1.68, .52], lean: .68, twist: 1.1 },
    ];
    leaves.forEach((leaf, index) => {
      const { geometry, shape, back, rim } = createLeafGeometry(leaf.length, leaf.width, index);
      const surface = new THREE.Group();
      surface.position.set(...leaf.at as [number, number, number]);
      surface.rotation.set(-.08, leaf.twist, leaf.lean);
      surfaces.add(surface);
      const blade = new THREE.Mesh(geometry, leafMaterial);
      blade.castShadow = true; blade.receiveShadow = true;
      surface.add(blade);
      const underside = new THREE.Mesh(back, backMaterial);
      const edge = new THREE.Mesh(rim, rimMaterial);
      underside.castShadow = true; underside.receiveShadow = true;
      edge.castShadow = true;
      surface.add(underside, edge);
      geometries.push(geometry, back, rim);
      const inside = leafInterior(shape);
      const line = (coords: number[][], radius: number, material: THREE.Material) => {
        const route = new THREE.CatmullRomCurve3(coords.map(([x,y]) => new THREE.Vector3(x,y,0)));
        const routePoints: THREE.Vector3[] = [];
        for (let i = 0; i <= 48; i++) {
          const p = route.getPoint(i / 48);
          if (i > 0 && !inside(new THREE.Vector2(p.x, p.y))) break;
          const point = leafPoint(p.x, p.y, leaf.length, leaf.width, index);
          point.addScaledVector(leafNormal(p.x, p.y, leaf.length, leaf.width, index), .004);
          routePoints.push(point);
        }
        if (routePoints.length < 2) return;
        const path = new THREE.CatmullRomCurve3(routePoints);
        const tube = new THREE.TubeGeometry(path, 26, radius, 5, false);
        geometries.push(tube);
        surface.add(new THREE.Mesh(tube, material));
      };
      line([[0,0], [0,.25], [0,.55], [0,.8], [.012,1]], .008, veinMaterial);
      for (const [x, y, origin] of [
        [-.44,.16,.07], [-.45,.46,.29], [-.31,.70,.52], [-.16,.87,.72],
        [.44,.13,.05], [.44,.39,.25], [.33,.63,.46], [.19,.83,.67],
      ]) line([[0,origin], [x*.34,origin+(y-origin)*.7], [x,y]], .0035, veinMaterial);
      const pointGeometry = sampleLeafPoints(geometry, 4400, index + 1);
      geometries.push(pointGeometry);
      const points = new THREE.Points(pointGeometry, dotMaterial);
      points.frustumCulled = false;
      points.position.copy(surface.position); points.rotation.copy(surface.rotation);
      particles.add(points);
      layers.push({ surface, points, rest: surface.position.clone() });
      const stem = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -2.32, 0),
        new THREE.Vector3(leaf.at[0] * .4 - index * .13, -1.9, leaf.at[2] * .6),
        new THREE.Vector3(...leaf.at as [number,number,number]),
      ]);
      const stemGeometry = new THREE.TubeGeometry(stem, 32, .022 - index * .003, 7, false);
      geometries.push(stemGeometry);
      sculpture.add(new THREE.Mesh(stemGeometry, stemMaterial));
    });
    const baseGeometry = new THREE.CylinderGeometry(.64, .7, .13, 64);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0xd5dce8, roughness: .96 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(0, -2.38, 0);
    base.castShadow = true; base.receiveShadow = true;
    sculpture.add(base);
    geometries.push(baseGeometry);

    const duckMap = new THREE.TextureLoader().load('/images/personal/running-duck-sprite-large-v2.webp', () => { dirty = true; });
    duckMap.colorSpace = THREE.SRGBColorSpace;
    duckMap.repeat.set(1/3, 1/2); duckMap.offset.set(1/3, 1/2);
    const duckMaterial = new THREE.SpriteMaterial({ map: duckMap, transparent: true, depthWrite: false, toneMapped: false });
    const duck = new THREE.Sprite(duckMaterial);
    duck.position.set(.84, -2.15, .74); duck.scale.set(.66, .66, 1);
    sculpture.add(duck);
    let duckHover = false;
    const floorGeometry = new THREE.PlaneGeometry(200, 200);
    const floorMaterial = new THREE.ShadowMaterial({ opacity: .085 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.46;
    floor.receiveShadow = true;
    scene.add(floor);
    geometries.push(floorGeometry);

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
      const narrowDesktop = window.innerWidth > 900 && window.innerWidth <= 1100;
      cameraDistance = narrowDesktop ? Math.max(10.4, 13.2 - (window.innerWidth - 901) * .012)
        : camera.aspect > 2 ? 9.4 : camera.aspect < .9 ? 11.6 : 10.4;
      camera.position.z = cameraDistance;
      camera.lookAt(0, camera.aspect > 2 ? -.12 : .2, 0);
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
      const duckScreen = duck.getWorldPosition(new THREE.Vector3()).project(camera);
      const px = (event.clientX - rect.left) / rect.width * 2 - 1;
      const py = -(event.clientY - rect.top) / rect.height * 2 + 1;
      duckHover = Math.hypot(px - duckScreen.x, py - duckScreen.y) < .15;
      dirty = true;
    };
    const up = () => { dragging = false; };
    const leave = () => { targetX = 0; targetY = 0; duckHover = false; dirty = true; };
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
      if (animated && document.documentElement.dataset.portfolioIntro !== "enter") {
        openingTime = Math.min(2.4, openingTime + Math.min(delta, .1));
      }
      const arrival = THREE.MathUtils.smoothstep(openingTime, 0, 2.15);
      const desired = -0.16 + s.rotation + dragAngle + (animated ? targetY + scroll * 0.55 + (1 - arrival) * 0.65 : 0);
      sculpture.rotation.y = s.reduced ? desired : THREE.MathUtils.damp(sculpture.rotation.y, desired, dragging ? 24 : 8, delta);
      sculpture.rotation.x = animated ? THREE.MathUtils.damp(sculpture.rotation.x, targetX * 0.35, 5, delta) : 0;
      sculpture.position.y = animated ? Math.sin(elapsed * 0.7) * 0.045 : 0;
      const openingDissolve = 1 - THREE.MathUtils.smoothstep(openingTime, 1.05, 2.15);
      const dissolve = s.points ? 1 : Math.max(openingDissolve, THREE.MathUtils.smoothstep(scroll, 0.12, 0.65));
      leafMaterial.opacity = 1 - dissolve;
      backMaterial.opacity = 1 - dissolve;
      rimMaterial.opacity = 1 - dissolve;
      veinMaterial.opacity = (1 - dissolve) * .8;
      stemMaterial.opacity = 1 - dissolve * .7;
      const separation = s.reduced || s.paused ? 0 : THREE.MathUtils.smoothstep(scroll, .10, .65);
      layers.forEach((layer, index) => {
        const offset = index ? -.3 : .24;
        layer.surface.position.x = layer.rest.x + separation * offset;
        layer.surface.position.y = layer.rest.y + separation * (index ? -.1 : .12);
        layer.surface.position.z = layer.rest.z + separation * (index ? .4 : -.3);
        layer.points.position.copy(layer.surface.position);
      });
      const duckFrame = animated && duckHover ? Math.floor(elapsed * 10) % 6 : 1;
      duckMap.offset.set((duckFrame % 3) / 3, .5 - Math.floor(duckFrame / 3) * .5);
      const breath = animated && !duckHover ? Math.sin(elapsed * 2.8) * .018 : 0;
      duck.scale.set(.66, .66 + breath, 1);
      duck.position.y = -2.15 + (animated && duckHover ? Math.abs(Math.sin(elapsed * 13)) * .026 : breath * .25);
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
      canvas.dataset.sculpture = "leaf-study";
      canvas.dataset.duck = animated && duckHover ? "running" : "idle";
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
      [leafMaterial, backMaterial, rimMaterial, veinMaterial, stemMaterial, dotMaterial, baseMaterial, floorMaterial].forEach(material => material.dispose());
      duckMaterial.dispose(); duckMap.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="garden-canvas-host" ref={hostRef}>
      {failed ? (
        <div className="garden-scene-poster garden-scene-fallback"><Image src="/images/personal/leaf-study-poster.svg" alt="Two cobalt leaves with branching veins, shown as a still illustration" fill sizes="(max-width: 900px) 100vw, 70vw" /><p>Still view · 3D is unavailable on this device.</p></div>
      ) : <canvas ref={canvasRef} aria-label="Two procedural cobalt leaves with veins and a small running duck. Rotate them or show their points from the Explore menu." role="img" />}
    </div>
  );
}
