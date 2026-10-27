"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import DuckSprite from "./DuckSprite";
import { duckFrame, duckRhythm } from "./duckRhythm";

function StripFrames() {
  return <>
    <span className="portfolio-strip-type">Keep asking.</span>
    <div className="portfolio-strip-duck"><DuckSprite large /></div>
    <span className="portfolio-strip-type">Keep moving.</span>
    <figure className="portfolio-strip-frame portfolio-strip-paper"><Image src="/images/project/SmokeNet_architecture.jpeg" alt="" fill sizes="260px" draggable={false} /><figcaption>SmokeNet · AJCAI 2025</figcaption></figure>
    <span className="portfolio-strip-type portfolio-strip-outline">Stay curious.</span>
    <figure className="portfolio-strip-frame portfolio-strip-person"><Image src="/profile.jpg" alt="" fill sizes="180px" draggable={false} /><figcaption>The person, too.</figcaption></figure>
    <figure className="portfolio-strip-frame portfolio-strip-conference"><Image src="/images/experience/2_SmokeNet/2_1_SN.jpg" alt="" fill sizes="260px" draggable={false} /><figcaption>The first paper.</figcaption></figure>
  </>;
}

export default function MotionStrip({ paused, reduced, onToggle }: { paused: boolean; reduced: boolean; onToggle: () => void }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const gaitPhaseRef = useRef(1 / 6);
  const rhythmRef = useRef(0);

  useEffect(() => {
    const viewport = viewportRef.current, track = trackRef.current, group = groupRef.current;
    if (!viewport || !track || !group) return;
    let frame = 0, previous = 0, unit = group.offsetWidth;
    let visible = false, focused = viewport.matches(":focus-visible"), dragging = false;
    let inertia = 0, impulse = 0, lastY = window.scrollY;
    let lastX = 0, lastPointerTime = 0, pointerId: number | null = null;
    const draw = () => {
      if (!unit) return;
      const offset = ((offsetRef.current % unit) + unit) % unit;
      track.style.transform = `translate3d(${-offset}px,0,0)`;
    };
    const stride = (speed: number, dt: number) => {
      if (!visible || paused || reduced || Math.abs(speed) < 2) return;
      const duration = Math.max(.18, .55 * 34 / Math.abs(speed));
      gaitPhaseRef.current = (gaitPhaseRef.current + Math.min(dt, .05) / duration) % 1;
      const position = duckFrame(gaitPhaseRef.current);
      if (viewport.style.getPropertyValue("--strip-duck-position") !== position) viewport.style.setProperty("--strip-duck-position", position);
      viewport.dataset.duckFacing = speed > 0 ? "left" : "right";
      viewport.dataset.duckPace = duration.toFixed(3);
    };
    const canRun = () => visible && !document.hidden && !paused && !reduced && !focused && !dragging;
    const stop = () => { cancelAnimationFrame(frame); frame = 0; previous = 0; viewport.dataset.running = "false"; };
    const tick = (time: number) => {
      frame = 0;
      if (!canRun()) { stop(); return; }
      const dt = previous ? Math.min((time - previous) / 1000, .05) : 0;
      previous = time;
      rhythmRef.current += dt;
      const rhythm = duckRhythm(rhythmRef.current);
      viewport.dataset.duckState = rhythm.state;
      viewport.parentElement!.dataset.duckState = rhythm.state;
      const speed = (34 + impulse + inertia) * rhythm.pace;
      offsetRef.current += speed * dt;
      stride(speed, dt);
      impulse *= Math.exp(-5 * dt);
      inertia *= Math.exp(-3.5 * dt);
      draw();
      viewport.dataset.running = "true";
      frame = requestAnimationFrame(tick);
    };
    const wake = () => { if (canRun() && !frame) frame = requestAnimationFrame(tick); };
    const resize = new ResizeObserver(() => { unit = group.offsetWidth; draw(); });
    resize.observe(group);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) { viewport.querySelectorAll("img").forEach(image => { image.loading = "eager"; }); wake(); } else stop(); });
    intersection.observe(viewport);
    const scroll = () => { const y = window.scrollY; if (visible && !paused && !reduced) impulse = Math.max(-180, Math.min(180, impulse + (y - lastY) * 2)); lastY = y; wake(); };
    const focus = () => { focused = viewport.matches(":focus-visible"); if (focused) stop(); };
    const blur = () => { focused = false; wake(); };
    const down = (event: PointerEvent) => {
      if (event.button !== 0) return;
      if (event.pointerType === "mouse") event.preventDefault();
      focused = false;
      rhythmRef.current = 0;
      viewport.dataset.duckState = "run";
      viewport.parentElement!.dataset.duckState = "run";
      dragging = true; inertia = 0; stop();
      lastX = event.clientX; lastPointerTime = event.timeStamp; pointerId = event.pointerId;
      viewport.dataset.dragging = "true";
      viewport.setPointerCapture(event.pointerId);
    };
    const move = (event: PointerEvent) => {
      if (!dragging || event.pointerId !== pointerId) return;
      const dx = event.clientX - lastX;
      const dt = Math.max(8, event.timeStamp - lastPointerTime) / 1000;
      offsetRef.current -= dx;
      inertia = reduced ? 0 : Math.max(-1200, Math.min(1200, -dx / dt));
      stride(-dx / dt, dt);
      lastX = event.clientX; lastPointerTime = event.timeStamp; draw();
    };
    const finish = (event?: PointerEvent) => {
      if (!dragging) return;
      if (event?.type !== "pointerup") inertia = 0;
      dragging = false; viewport.dataset.dragging = "false";
      if (pointerId !== null && viewport.hasPointerCapture(pointerId)) viewport.releasePointerCapture(pointerId);
      pointerId = null; wake();
    };
    const key = (event: KeyboardEvent) => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); focused = true; stop(); inertia = 0; offsetRef.current += event.key === "ArrowRight" ? 180 : -180; draw(); } };
    const visibility = () => { if (document.hidden) { finish(); stop(); } else wake(); };
    const windowBlur = () => { finish(); stop(); };
    viewport.addEventListener("pointerdown", down);
    viewport.addEventListener("pointermove", move);
    viewport.addEventListener("pointerup", finish);
    viewport.addEventListener("pointercancel", finish);
    viewport.addEventListener("lostpointercapture", finish);
    viewport.addEventListener("focus", focus);
    viewport.addEventListener("blur", blur);
    viewport.addEventListener("keydown", key);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("blur", windowBlur);
    window.addEventListener("focus", wake);
    document.addEventListener("visibilitychange", visibility);
    draw();
    return () => {
      stop(); finish(); stop(); resize.disconnect(); intersection.disconnect();
      viewport.removeEventListener("pointerdown", down); viewport.removeEventListener("pointermove", move);
      viewport.removeEventListener("pointerup", finish); viewport.removeEventListener("pointercancel", finish); viewport.removeEventListener("lostpointercapture", finish);
      viewport.removeEventListener("focus", focus); viewport.removeEventListener("blur", blur); viewport.removeEventListener("keydown", key);
      window.removeEventListener("scroll", scroll); window.removeEventListener("blur", windowBlur); window.removeEventListener("focus", wake); document.removeEventListener("visibilitychange", visibility);
    };
  }, [paused, reduced]);

  return <section className="portfolio-motion-strip" id="in-motion" aria-labelledby="portfolio-motion-title" data-reduced={reduced}>
    <h2 id="portfolio-motion-title" className="sr-only">Research and life, in motion.</h2>
    <div className="portfolio-strip-viewport" ref={viewportRef} tabIndex={0} role="group" aria-label="Research and personal image strip. Use left and right arrow keys to move it." data-cursor="Drag" data-running="false">
      <div className="portfolio-strip-track" ref={trackRef} aria-hidden="true"><div className="portfolio-strip-group" ref={groupRef}><StripFrames /></div><div className="portfolio-strip-group"><StripFrames /></div></div>
    </div>
    <div className="portfolio-strip-caption"><p>Research, running, and the curiosity between them.<span className="portfolio-strip-breather" aria-hidden="true">Catching my breath…</span></p><button type="button" onClick={onToggle} disabled={reduced} aria-pressed={paused || reduced} aria-label={reduced ? "Ribbon motion reduced" : paused ? "Play ribbon motion" : "Pause ribbon motion"}>{reduced ? "Motion reduced" : paused ? "Play motion" : "Pause motion"}<svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true">{paused ? <path d="m6 3 10 7-10 7z" /> : <path d="M5 3h3v14H5zm7 0h3v14h-3z" />}</svg></button></div>
  </section>;
}
