"use client";

import { useLayoutEffect, useRef } from "react";

export default function ProjectPicker({ items, selected, onSelect }: {
  items: { id: string; name: string }[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const group = root.current;
    if (!group) return;
    const measure = () => {
      const button = group.querySelector<HTMLButtonElement>('[aria-pressed="true"]');
      if (!button?.offsetWidth) return;
      const origin = group.getBoundingClientRect(), bounds = button.getBoundingClientRect();
      group.style.setProperty("--picker-x", `${bounds.left - origin.left}px`);
      group.style.setProperty("--picker-y", `${bounds.top - origin.top}px`);
      group.style.setProperty("--picker-width", `${bounds.width}px`);
      group.style.setProperty("--picker-height", `${bounds.height}px`);
      group.dataset.ready = "true";
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(group);
    group.querySelectorAll("button").forEach(button => observer.observe(button));
    return () => observer.disconnect();
  }, [selected]);
  return <div ref={root} className="portfolio-project-picker" role="group" aria-label="Choose a project">
    <span className="portfolio-picker-surface" aria-hidden="true" />
    {items.map(item => <button type="button" key={item.id} aria-pressed={selected === item.id} onClick={() => onSelect(item.id)}>{item.name}</button>)}
  </div>;
}
