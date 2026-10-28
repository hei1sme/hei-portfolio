"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { usePortfolioMotion } from "./PortfolioMotion";

type Expansion = { animation: Animation; target: boolean; children: [HTMLElement, boolean][] };
const ease = "cubic-bezier(.22,1,.36,1)";

// Native disclosures remain functional before hydration and with JS disabled.
// Only deliberate pointer actions get a transition; keyboard and anchors stay immediate.
export default function PortfolioInteractions() {
  const pathname = usePathname();
  const { paused, reduced } = usePortfolioMotion();
  const progress = useRef<HTMLDivElement>(null);
  const reading = pathname.startsWith("/projects/") || pathname.startsWith("/blog/");

  useEffect(() => {
    const site = document.querySelector<HTMLElement>(".portfolio-site");
    if (!site) return;
    const expansions = new Map<HTMLDetailsElement, Expansion>();
    const menuAnimations = new Set<Animation>();
    let keyboard = site.dataset.input === "keyboard";
    const enabled = () => !paused && !reduced && !keyboard && !document.hidden;
    const finish = (details: HTMLDetailsElement, commit: boolean) => {
      const current = expansions.get(details);
      if (!current) return;
      if (commit) details.open = current.target;
      current.animation.cancel();
      current.children.forEach(([child, inert]) => { child.inert = inert; });
      details.style.removeProperty("overflow");
      expansions.delete(details);
    };
    const settle = () => {
      [...expansions.keys()].forEach(details => finish(details, true));
      menuAnimations.forEach(animation => animation.cancel());
      menuAnimations.clear();
    };
    const pointer = () => { keyboard = false; site.dataset.input = "pointer"; };
    const key = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      keyboard = true; site.dataset.input = "keyboard"; settle();
    };
    const click = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const summary = event.target.closest("summary");
      const details = summary?.parentElement;
      if (!(details instanceof HTMLDetailsElement) || details.classList.contains("garden-explore")) return;
      if (event.defaultPrevented || event.detail === 0 || !enabled()) return;
      event.preventDefault();
      const before = details.getBoundingClientRect().height;
      const target = !(expansions.get(details)?.target ?? details.open);
      finish(details, false);
      details.open = true;
      const full = details.getBoundingClientRect().height;
      const children = [...details.children].filter((child): child is HTMLElement => child instanceof HTMLElement && child !== summary).map(child => [child, child.inert] as [HTMLElement, boolean]);
      if (!target) children.forEach(([child]) => { child.inert = true; });
      const border = parseFloat(getComputedStyle(details).borderTopWidth) + parseFloat(getComputedStyle(details).borderBottomWidth);
      const height = target ? full : summary!.getBoundingClientRect().height + border;
      details.style.overflow = "clip";
      const animation = details.animate([{ height: `${before}px` }, { height: `${height}px` }], { duration: 240, easing: ease, fill: "both" });
      expansions.set(details, { animation, target, children });
      animation.onfinish = () => finish(details, true);
    };
    const toggle = (event: Event) => {
      const details = event.target;
      if (!(details instanceof HTMLDetailsElement) || !details.classList.contains("garden-explore")) return;
      const menu = details.querySelector<HTMLElement>(".garden-menu-links");
      menu?.getAnimations().forEach(animation => { animation.cancel(); menuAnimations.delete(animation); });
      if (!menu || !details.open || !enabled()) return;
      const animation = menu.animate([
        { opacity: .4, transform: "translateY(-4px) scale(.985)" },
        { opacity: 1, transform: "translateY(0) scale(1)" },
      ], { duration: 180, easing: ease });
      menuAnimations.add(animation);
      animation.onfinish = () => { menuAnimations.delete(animation); };
    };
    const visibility = () => { if (document.hidden) settle(); };
    site.addEventListener("pointerdown", pointer, true);
    site.addEventListener("keydown", key, true);
    site.addEventListener("click", click);
    site.addEventListener("toggle", toggle, true);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      settle();
      site.removeEventListener("pointerdown", pointer, true);
      site.removeEventListener("keydown", key, true);
      site.removeEventListener("click", click);
      site.removeEventListener("toggle", toggle, true);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [pathname, paused, reduced]);

  useEffect(() => {
    const bar = progress.current;
    const article = document.querySelector<HTMLElement>(".portfolio-article, .portfolio-case");
    if (!bar || !article) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const top = article.getBoundingClientRect().top + window.scrollY;
      const length = Math.max(1, article.offsetHeight - window.innerHeight + 120);
      bar.style.setProperty("--reading-progress", String(Math.min(1, Math.max(0, (window.scrollY + 120 - top) / length))));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resize = new ResizeObserver(schedule);
    resize.observe(article);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => { cancelAnimationFrame(frame); resize.disconnect(); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, [pathname]);

  return reading ? <div ref={progress} className="portfolio-reading-progress" aria-hidden="true" /> : null;
}
