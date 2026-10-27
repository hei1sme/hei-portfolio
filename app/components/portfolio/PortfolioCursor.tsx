"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import DuckSprite from "./DuckSprite";
import { usePortfolioMotion } from "./PortfolioMotion";

// A damped, contextual companion to the ordinary pointer; never replaces it.
export default function PortfolioCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { paused } = usePortfolioMotion();
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const query = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const label = node.querySelector<HTMLElement>(".portfolio-cursor-label")!;
    let frame = 0, previous = 0, x = 0, y = 0, targetX = 0, targetY = 0;
    let lastMove = -Infinity, lastClientX: number | null = null, lastClientY = 0;
    let effort = 0, breathRemaining = 0;
    let magnetic: HTMLElement | null = null;
    const resetMagnet = () => { if (magnetic) magnetic.style.translate = "0px 0px"; magnetic = null; };
    const draw = () => { node.style.transform = `translate3d(${x}px,${y}px,0)`; };
    const tick = (time: number) => {
      frame = 0;
      const dt = previous ? Math.min((time - previous) / 1000, .05) : 1 / 60;
      previous = time;
      const damping = 1 - Math.exp(-25 * dt);
      x += (targetX - x) * damping; y += (targetY - y) * damping; draw();
      const distance = Math.abs(targetX - x) + Math.abs(targetY - y);
      const moving = distance > .8 || time - lastMove < 110;
      if (!moving) { effort = 0; breathRemaining = 0; }
      else if (breathRemaining > 0) breathRemaining = Math.max(0, breathRemaining - dt);
      else {
        if (moving) effort += dt;
        if (effort >= 4.8) { breathRemaining = 1.8; effort = 0; }
      }
      node.dataset.gait = !moving || breathRemaining > 0 ? "breathe" : "run";
      // Recovery changes the pose, never the pointer-following responsiveness.
      // Idle breathing is CSS-only; stop the position loop once caught up.
      if (distance > .15 || moving) frame = requestAnimationFrame(tick);
      else { previous = 0; effort = 0; x = targetX; y = targetY; draw(); }
    };
    const hide = () => { node.dataset.visible = "false"; node.dataset.pressed = "false"; node.dataset.gait = "idle"; lastClientX = null; effort = 0; breathRemaining = 0; cancelAnimationFrame(frame); frame = 0; previous = 0; resetMagnet(); };
    const move = (event: PointerEvent) => {
      if (paused || !query.matches || event.pointerType === "touch" || document.documentElement.dataset.portfolioIntro || document.querySelector("dialog[open]")) { hide(); return; }
      const target = event.target as Element;
      if (target.closest("input, textarea, select, [contenteditable=true], .garden-running-duck")) { hide(); return; }
      const nextMagnet = target.closest<HTMLElement>("[data-magnetic]");
      if (nextMagnet !== magnetic) resetMagnet();
      if (nextMagnet) {
        magnetic = nextMagnet;
        const bounds = magnetic.getBoundingClientRect();
        const mx = Math.max(-5, Math.min(5, (event.clientX - bounds.left - bounds.width / 2) * .1));
        const my = Math.max(-3, Math.min(3, (event.clientY - bounds.top - bounds.height / 2) * .1));
        magnetic.style.translate = `${mx}px ${my}px`;
      }
      const area = target.closest<HTMLElement>("[data-cursor]");
      const control = target.closest<HTMLElement>("a,button,summary");
      const disabled = control instanceof HTMLButtonElement && control.disabled;
      const hint = disabled ? "" : control ? (control.hasAttribute("data-cursor") ? control.dataset.cursor : control instanceof HTMLAnchorElement ? "Open" : "") : area?.dataset.cursor;
      label.textContent = hint || "";
      node.dataset.mode = hint ? "context" : "rest";
      node.dataset.tone = target.closest(".garden-work,.portfolio-motion-strip") ? "light" : "blue";
      if (lastClientX === null || Math.hypot(event.clientX - lastClientX, event.clientY - lastClientY) > .5) {
        if (lastClientX !== null && Math.abs(event.clientX - lastClientX) > 2) node.dataset.facing = event.clientX < lastClientX ? "left" : "right";
        lastMove = performance.now();
      }
      lastClientX = event.clientX; lastClientY = event.clientY;
      targetX = Math.max(42, Math.min(event.clientX + 34, innerWidth - 42));
      targetY = Math.max(42, Math.min(event.clientY + 34, innerHeight - 65));
      if (node.dataset.visible !== "true") { x = targetX; y = targetY; draw(); }
      node.dataset.visible = "true";
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const down = (event: PointerEvent) => { if (event.pointerType === "touch") hide(); else node.dataset.pressed = "true"; };
    const up = () => { node.dataset.pressed = "false"; };
    const keyboard = (event: KeyboardEvent) => { if (event.key === "Tab" || event.key.startsWith("Arrow")) hide(); };
    const visibility = () => { if (document.hidden) hide(); };
    const click = () => { if (document.querySelector("dialog[open]")) hide(); };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerdown", down, { passive: true });
    document.addEventListener("pointerup", up); document.addEventListener("pointercancel", up);
    document.addEventListener("keydown", keyboard); document.addEventListener("visibilitychange", visibility);
    document.addEventListener("click", click);
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide); window.addEventListener("scroll", hide, { passive: true });
    query.addEventListener("change", hide);
    return () => { hide(); document.removeEventListener("pointermove", move); document.removeEventListener("pointerdown", down); document.removeEventListener("pointerup", up); document.removeEventListener("pointercancel", up); document.removeEventListener("keydown", keyboard); document.removeEventListener("visibilitychange", visibility); document.removeEventListener("click", click); document.documentElement.removeEventListener("pointerleave", hide); window.removeEventListener("blur", hide); window.removeEventListener("scroll", hide); query.removeEventListener("change", hide); };
  }, [pathname, paused]);
  return <div className="portfolio-cursor" ref={ref} aria-hidden="true" data-visible="false" data-mode="rest" data-gait="idle" data-facing="right"><span className="portfolio-cursor-duck"><DuckSprite className="portfolio-cursor-sprite" /></span><span className="portfolio-cursor-label" /></div>;
}
