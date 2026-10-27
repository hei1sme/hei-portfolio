"use client";

import { useEffect, useRef } from "react";
import { introSessionKey } from "../../../lib/intro";
import DuckSprite from "./DuckSprite";

export default function PortfolioIntro() {
  const ref = useRef<HTMLElement>(null);
  const initialWelcome = useRef(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const root = document.documentElement;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    if (root.dataset.portfolioIntro === "enter") initialWelcome.current = true;
    let timer: ReturnType<typeof setTimeout>, active = false;
    delete root.dataset.introBoot;

    const finish = (immediate = false) => {
      if (!active) return;
      active = false; clearTimeout(timer);
      initialWelcome.current = false;
      try { sessionStorage.setItem(introSessionKey, "seen"); } catch { /* Storage is optional. */ }
      if (node.contains(document.activeElement)) document.querySelector<HTMLElement>(".garden-brand")?.focus({ preventScroll: true });
      node.setAttribute("aria-hidden", "true"); node.inert = true;
      if (immediate) delete root.dataset.portfolioIntro;
      else {
        root.dataset.portfolioIntro = "exit";
        timer = setTimeout(() => { delete root.dataset.portfolioIntro; }, 550);
      }
    };
    const start = () => {
      if (location.pathname !== "/" || reduced.matches) return;
      clearTimeout(timer); active = true;
      root.dataset.portfolioIntro = "enter";
      node.inert = false; node.setAttribute("aria-hidden", "false");
      if (document.activeElement === document.body) node.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });
      timer = setTimeout(() => finish(), 2000);
    };
    const skip = () => finish(true);
    const scroll = () => { if (window.scrollY > 1) finish(true); };
    const key = (event: KeyboardEvent) => {
      if (!active) return;
      if (event.key === "Escape") { event.preventDefault(); finish(true); }
      if (event.key === "Tab") {
        event.preventDefault(); finish(true);
        document.querySelector<HTMLElement>(".garden-skip")?.focus({ preventScroll: true });
      }
    };
    const preference = () => { if (reduced.matches) finish(true); };
    const hash = () => { if (location.hash && location.hash !== "#garden-home") finish(true); };
    const button = node.querySelector("button")!;
    button.addEventListener("click", skip);
    window.addEventListener("portfolio:intro-replay", start);
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchmove", skip, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("hashchange", hash);
    document.addEventListener("keydown", key);
    reduced.addEventListener("change", preference);
    if (initialWelcome.current) start();
    else node.inert = true;
    return () => {
      clearTimeout(timer); delete root.dataset.portfolioIntro;
      button.removeEventListener("click", skip);
      window.removeEventListener("portfolio:intro-replay", start);
      window.removeEventListener("wheel", skip); window.removeEventListener("touchmove", skip);
      window.removeEventListener("scroll", scroll); window.removeEventListener("hashchange", hash);
      document.removeEventListener("keydown", key); reduced.removeEventListener("change", preference);
    };
  }, []);

  return <section className="portfolio-welcome" ref={ref} aria-labelledby="portfolio-welcome-title" aria-hidden="true">
    <div className="portfolio-welcome-top"><span>hei<span aria-hidden="true">✳</span></span><button type="button">Skip intro <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.7" /></svg></button></div>
    <div className="portfolio-welcome-stage">
      <p className="portfolio-welcome-name" id="portfolio-welcome-title"><span>Le Nguyen</span>{" "}<span>Gia Hung<span className="portfolio-welcome-dot">.</span></span></p>
      <p className="portfolio-welcome-description">Researcher. Runner. Always curious.</p>
      <div className="portfolio-welcome-lane" aria-hidden="true"><div className="portfolio-welcome-runner"><DuckSprite large /></div><span className="portfolio-welcome-ground" /></div>
      <p className="portfolio-welcome-caption">A quick warm-up. Then, the work.</p>
    </div>
    <div className="portfolio-welcome-bottom"><span>Keep asking.</span><span>Keep moving.</span></div>
  </section>;
}
