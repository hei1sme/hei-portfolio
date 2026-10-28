"use client";

import { useEffect, useRef } from "react";
import { duckRhythm } from "../../components/portfolio/duckRhythm";
import BotanicalDrawing from "./BotanicalDrawing";

interface Props {
  paused: boolean;
  reduced: boolean;
  replay: number;
  progress: { current: number };
  onReady: () => void;
  Drawing?: typeof BotanicalDrawing;
  description?: string;
  route?: (t: number) => { x: number; y: number };
}

function courtyardRoute(t: number) {
  const a = 1 - t;
  return {
    x: a*a*a*150 + 3*a*a*t*320 + 3*a*t*t*635 + t*t*t*800,
    y: a*a*a*670 + 3*a*a*t*735 + 3*a*t*t*570 + t*t*t*630,
  };
}

export default function BotanicalIllustration({ paused, reduced, replay, progress, onReady, Drawing = BotanicalDrawing, route = courtyardRoute, description = "An illustrated cobalt courtyard: tropical plants, an arched window and my doodle duck running along a curved path." }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const duckRef = useRef<SVGGElement>(null);
  const clock = useRef(0);
  const travel = useRef(.32);
  const gait = useRef(1/6);
  const lastReplay = useRef(replay);

  useEffect(() => {
    const host = hostRef.current, world = worldRef.current, duck = duckRef.current;
    if (!host || !world || !duck) return;
    const layers = [...world.querySelectorAll<SVGGElement>("[data-botanical-layer]")];
    const actor = world.querySelector<SVGGElement>("[data-botanical-actor]");
    let frame = 0, previous = 0, lastPaint = 0, visible = false;
    let aimX = 0, aimY = 0, x = 0, y = 0;
    const pose = (t: number) => {
      const point = route(t);
      duck.style.setProperty("--botanical-duck-x", `${point.x}px`);
      duck.style.setProperty("--botanical-duck-y", `${point.y}px`);
      const frame = Math.floor(gait.current * 6) % 6;
      duck.style.setProperty("--botanical-frame-x", `${-(frame % 3) * 124}px`);
      duck.style.setProperty("--botanical-frame-y", `${-Math.floor(frame / 3) * 124}px`);
    };
    if (lastReplay.current !== replay) {
      clock.current = 0; travel.current = .32; gait.current = 1/6;
      lastReplay.current = replay;
    }
    if (reduced) {
      travel.current = .32; gait.current = 1/6;
      duck.dataset.duckState = "idle";
      duck.dataset.facing = "right";
      layers.forEach(layer => { layer.style.transform = ""; });
      if (actor) actor.style.transform = "";
    }
    const lap = travel.current % 2;
    pose(lap <= 1 ? lap : 2 - lap);
    let lastPoint = route(lap <= 1 ? lap : 2 - lap);
    const reveal = () => {
      world.dataset.entered = String(reduced || paused || document.documentElement.dataset.portfolioIntro !== "enter");
    };
    reveal();
    const intro = new MutationObserver(reveal);
    intro.observe(document.documentElement, { attributes: true, attributeFilter: ["data-portfolio-intro"] });
    const resize = new ResizeObserver(() => {
      const bounds = host.getBoundingClientRect();
      world.style.setProperty("--botanical-scale", String(Math.min(bounds.width / 900, bounds.height / 800)));
      world.dataset.ready = "true";
      onReady();
    });
    resize.observe(host);
    const stop = () => {
      cancelAnimationFrame(frame); frame = 0; previous = 0; lastPaint = 0;
      host.dataset.running = "false";
    };
    const tick = (time: number) => {
      frame = 0;
      if (!visible || document.hidden || paused || reduced) { stop(); return; }
      if (time - lastPaint < 32) { frame = requestAnimationFrame(tick); return; }
      lastPaint = time;
      host.dataset.running = "true";
      const dt = previous ? Math.min((time - previous) / 1000, .05) : 0;
      previous = time;
      if (world.dataset.entered === "true") {
        clock.current += dt;
        const rhythm = duckRhythm(clock.current);
        travel.current += dt * .044 * rhythm.pace;
        const lap = travel.current % 2;
        const t = lap <= 1 ? lap : 2 - lap;
        const point = route(t);
        gait.current = (gait.current + Math.hypot(point.x - lastPoint.x, point.y - lastPoint.y) / 22) % 1;
        lastPoint = point;
        pose(t);
        duck.dataset.duckState = rhythm.state;
        duck.dataset.facing = lap <= 1 ? "right" : "left";
        duck.style.setProperty("--botanical-duck-bob", `${Math.sin(gait.current * Math.PI * 2) * 1.5 * rhythm.pace}px`);
        x += (aimX - x) * (1 - Math.exp(-6 * dt));
        y += (aimY - y) * (1 - Math.exp(-6 * dt));
        const depths = [3, 7, 12], scrolls = [12, 31, 53];
        layers.forEach((layer, i) => {
          layer.style.transform = `translate(${(x * depths[i]).toFixed(2)}px, ${(y * depths[i] - progress.current * scrolls[i]).toFixed(2)}px)`;
        });
        if (actor) actor.style.transform = layers[1].style.transform;
      }
      frame = requestAnimationFrame(tick);
    };
    const wake = () => { if (!frame && visible && !document.hidden && !paused && !reduced) frame = requestAnimationFrame(tick); };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake(); else stop();
    });
    observer.observe(host);
    const visibility = () => { if (document.hidden) stop(); else wake(); };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const bounds = host.getBoundingClientRect();
      aimX = ((event.clientX - bounds.left) / bounds.width - .5) * 2;
      aimY = ((event.clientY - bounds.top) / bounds.height - .5) * 2;
    };
    const leave = () => { aimX = 0; aimY = 0; };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", visibility);
    if (paused || reduced) stop();
    return () => {
      stop(); resize.disconnect(); observer.disconnect(); intro.disconnect();
      host.removeEventListener("pointermove", move); host.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [paused, reduced, replay, progress, onReady, route]);

  return <div ref={hostRef} className="botanical-illustration" data-running="false" role="img" aria-label={description}>
    <div ref={worldRef} className="botanical-world" data-entered="false">
      <Drawing character={<g className="botanical-duck" ref={duckRef} data-duck-state="idle" data-facing="right" aria-hidden="true"><g className="botanical-duck-body"><g transform="translate(-62 -115.32)" clipPath="url(#botanical-duck-crop)"><image className="botanical-duck-run" href="/images/personal/running-duck-sprite-large-v2.webp" width="372" height="248" /><image className="botanical-duck-rest" href="/images/personal/running-duck-rest-v1.webp" width="124" height="124" /></g></g></g>} />
    </div>
  </div>;
}
