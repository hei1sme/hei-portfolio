"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePortfolioMotion } from "./PortfolioMotion";

export default function PortfolioHeader({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const physics = useRef({ value: 0, velocity: 0, target: 0, compact: false });
  const { paused, reduced } = usePortfolioMotion();

  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    const state = physics.current;
    let animation = 0, scrollFrame = 0, previous = 0;
    const instant = paused || reduced;
    const render = () => {
      const value = Math.max(0, Math.min(1, state.value));
      header.style.setProperty("--nav-progress", value.toFixed(5));
      header.dataset.navShape = value < .0001 ? "expanded" : value > .9999 ? "pill" : "moving";
    };
    const stop = () => { cancelAnimationFrame(animation); animation = 0; previous = 0; };
    const settle = () => {
      stop(); state.value = state.target; state.velocity = 0; render();
    };
    const tick = (time: number) => {
      animation = 0;
      let remaining = previous ? Math.min((time - previous) / 1000, .05) : 1/60;
      previous = time;
      // Substeps keep this critically damped spring stable at low frame rates.
      // A new target retains both presentation value and velocity.
      while (remaining > 0) {
        const dt = Math.min(remaining, 1/120);
        state.velocity += ((state.target - state.value) * 400 - state.velocity * 40) * dt;
        state.value += state.velocity * dt;
        remaining -= dt;
      }
      if (Math.abs(state.target - state.value) < .0001 && Math.abs(state.velocity) < .002) {
        state.value = state.target; state.velocity = 0; previous = 0; render(); return;
      }
      render();
      animation = requestAnimationFrame(tick);
    };
    const update = (snap = false) => {
      const y = Math.max(0, window.scrollY);
      const compact = state.compact ? y > 40 : y > 96;
      const changed = compact !== state.compact;
      state.compact = compact; state.target = compact ? 1 : 0;
      header.dataset.floating = String(compact);
      if (snap || instant || document.hidden) { settle(); return; }
      if (changed && !animation) animation = requestAnimationFrame(tick);
    };
    const scroll = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(() => { scrollFrame = 0; update(); });
    };
    const visibility = () => { if (document.hidden) settle(); else update(true); };
    const closeMenus = (event: Event) => {
      if (event.target instanceof Node && !header.contains(event.target)) {
        header.querySelectorAll<HTMLDetailsElement>("details[open]").forEach(menu => { menu.open = false; });
      }
    };
    update(true);
    header.dataset.headerReady = "true";
    window.addEventListener("scroll", scroll, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    document.addEventListener("pointerdown", closeMenus);
    document.addEventListener("focusin", closeMenus);
    return () => {
      stop(); cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", scroll);
      document.removeEventListener("visibilitychange", visibility);
      document.removeEventListener("pointerdown", closeMenus);
      document.removeEventListener("focusin", closeMenus);
    };
  }, [paused, reduced]);

  return <div className="portfolio-header-slot"><header className="garden-nav" ref={ref} data-floating="false" data-nav-shape="expanded">{children}</header></div>;
}
