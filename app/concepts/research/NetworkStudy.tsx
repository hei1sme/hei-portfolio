"use client";

import { useEffect, useRef, useState } from "react";

export default function NetworkStudy({ running }: { running: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [model, setModel] = useState<"smokenet" | "merr">("smokenet");
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    let width = 600;
    let height = 380;
    let frame = 0;
    let previous = 0;
    let phase = 0;
    let visible = true;
    let stopped = false;
    const layers = model === "smokenet" ? [6, 10, 10, 4] : [7, 7, 12, 4];
    const nodes = layers.flatMap((count, layer) =>
      Array.from({ length: count }, (_, index) => {
        const angle = (index / count) * Math.PI * 2;
        return {
          layer,
          index,
          x: (layer - 1.5) * 1.05,
          y: Math.cos(angle) * (layer === 3 ? 0.38 : 0.78),
          z: Math.sin(angle) * 0.72,
        };
      }),
    );
    const edges: [number, number][] = [];
    nodes.forEach((node, i) =>
      nodes.forEach((next, j) => {
        if (
          next.layer === node.layer + 1 &&
          (node.index + next.index) % 3 === 0
        )
          edges.push([i, j]);
      }),
    );

    const draw = () => {
      const ctx = context;
      ctx.clearRect(0, 0, width, height);
      const angle = phase * 0.11 + rotation + pointer.current.x * 0.2;
      const tilt = -0.1 + pointer.current.y * 0.12;
      const scale = Math.min(width / 4.4, height / 2.6);
      const projected = nodes.map((node) => {
        const y = node.y * Math.cos(angle) - node.z * Math.sin(angle);
        const z = node.y * Math.sin(angle) + node.z * Math.cos(angle);
        const x = node.x * Math.cos(tilt) + z * Math.sin(tilt);
        const depth = 3.7 / (3.7 + z * 0.3);
        return {
          x: width / 2 + x * scale * depth,
          y: height / 2 + y * scale * depth,
          z,
          layer: node.layer,
        };
      });
      ctx.lineWidth = 0.7;
      edges.forEach(([a, b], index) => {
        const from = projected[a];
        const to = projected[b];
        ctx.strokeStyle = "rgba(93,151,231,.27)";
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
        const t = (phase * 0.45 + index * 0.071) % 1;
        ctx.fillStyle = index % 4 === 0 ? "#b5d9a7" : "#82baff";
        ctx.beginPath();
        ctx.arc(
          from.x + (to.x - from.x) * t,
          from.y + (to.y - from.y) * t,
          1.8,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      });
      [...projected]
        .sort((a, b) => b.z - a.z)
        .forEach((node) => {
          const radius = 3.6 + (1 - node.z) * 0.9;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius + 4, 0, Math.PI * 2);
          ctx.fillStyle =
            node.layer === 3 ? "rgba(168,208,154,.09)" : "rgba(71,139,245,.09)";
          ctx.fill();
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
          ctx.fillStyle =
            node.layer === 3
              ? "#c1dfa9"
              : node.layer === 0
                ? "#e1edff"
                : "#649ff6";
          ctx.fill();
        });
    };
    const tick = (time: number) => {
      if (stopped) return;
      if (time - previous >= 32) {
        phase += Math.min((time - previous) / 1000, 0.05);
        previous = time;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (running && visible && !document.hidden && !stopped) {
        previous = performance.now();
        frame = requestAnimationFrame(tick);
      } else draw();
    };
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    });
    resize.observe(canvas);
    const visibility = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.05 },
    );
    visibility.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [model, running, rotation]);

  return (
    <div
      className="r-network"
      onPointerMove={(event) => {
        if (!running) return;
        const box = event.currentTarget.getBoundingClientRect();
        pointer.current = {
          x: (event.clientX - box.left) / box.width - 0.5,
          y: (event.clientY - box.top) / box.height - 0.5,
        };
      }}
      onPointerLeave={() => {
        pointer.current = { x: 0, y: 0 };
      }}
    >
      <div className="r-network-head">
        <span>
          <i className={running ? "r-active-dot" : ""} />
          Architecture explorer
        </span>
        <span>01 / {model === "smokenet" ? "Temporal" : "Multimodal"}</span>
      </div>
      <div
        className="r-model-switch"
        role="group"
        aria-label="Architecture model"
      >
        <button
          type="button"
          aria-pressed={model === "smokenet"}
          onClick={() => setModel("smokenet")}
        >
          SmokeNet
        </button>
        <button
          type="button"
          aria-pressed={model === "merr"}
          onClick={() => setModel("merr")}
        >
          MERR-GAT
        </button>
      </div>
      <canvas
        ref={canvasRef}
        aria-label={`${model === "smokenet" ? "SmokeNet" : "MERR-GAT"} abstract layered topology. A schematic visualization, not a trained model or live inference.`}
        role="img"
      />
      <div className="r-network-layers">
        {(model === "smokenet"
          ? ["Time series", "Embedding", "Transformer", "Forecast"]
          : ["Audio / text", "Encoders", "GATv2 fusion", "Emotion"]
        ).map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="r-network-foot">
        <span>Schematic topology · not live inference</span>
        <div>
          <button
            type="button"
            aria-label="Rotate topology left"
            onClick={() => setRotation((value) => value - 0.4)}
          >
            ↶
          </button>
          <button
            type="button"
            aria-label="Rotate topology right"
            onClick={() => setRotation((value) => value + 0.4)}
          >
            ↷
          </button>
        </div>
      </div>
    </div>
  );
}
