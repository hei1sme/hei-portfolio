"use client";

import { useEffect, useRef } from "react";
import { duckFrame, duckRhythm } from "./duckRhythm";

// Keep the clickable area still; only the character gets tired.
export function useDuckRhythm(paused: boolean, reduced: boolean) {
  const ref = useRef<HTMLButtonElement>(null);
  const clock = useRef(0);
  const gait = useRef(1 / 6);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const hover = matchMedia("(hover: hover) and (pointer: fine)");
    let visible = false, frame = 0, previous = 0;
    const engaged = () => node.matches(":focus-visible") || (hover.matches && node.matches(":hover"));
    const stop = () => { cancelAnimationFrame(frame); frame = 0; previous = 0; node.dataset.duckActive = "false"; };
    const tick = (time: number) => {
      frame = 0;
      if (!visible || document.hidden || paused || reduced || !engaged()) return;
      const dt = previous ? Math.min((time - previous) / 1000, .05) : 0;
      previous = time; clock.current += dt;
      node.dataset.duckActive = "true";
      const rhythm = duckRhythm(clock.current, true);
      node.dataset.duckState = rhythm.state;
      gait.current = (gait.current + dt * rhythm.pace / .55) % 1;
      node.style.setProperty("--about-duck-position", duckFrame(gait.current));
      node.style.setProperty("--duck-cycle", `${.8 / Math.max(.1, rhythm.pace)}s`);
      frame = requestAnimationFrame(tick);
    };
    const wake = () => { if (!frame && visible && !document.hidden && !paused && !reduced && engaged()) frame = requestAnimationFrame(tick); };
    const leave = () => {
      if (engaged()) return;
      stop(); clock.current = 0; gait.current = 1 / 6;
      node.dataset.duckState = "idle";
      node.style.setProperty("--about-duck-position", duckFrame(gait.current));
    };
    const visibility = () => { if (document.hidden) stop(); else wake(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) wake(); else stop(); });
    observer.observe(node);
    node.dataset.duckActive = "false";
    node.addEventListener("pointerenter", wake); node.addEventListener("pointerleave", leave);
    node.addEventListener("focus", wake); node.addEventListener("blur", leave);
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("blur", stop); window.addEventListener("focus", wake);
    if (reduced) node.dataset.duckState = "idle";
    return () => {
      stop(); observer.disconnect();
      node.removeEventListener("pointerenter", wake); node.removeEventListener("pointerleave", leave);
      node.removeEventListener("focus", wake); node.removeEventListener("blur", leave);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("blur", stop); window.removeEventListener("focus", wake);
    };
  }, [paused, reduced]);
  return ref;
}
