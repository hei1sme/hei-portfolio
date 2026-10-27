type IconName = "external" | "right" | "left" | "down" | "rotate" | "spark" | "pause" | "play";

export default function Icon({ name, size = 20, className = "" }: { name: IconName; size?: number; className?: string }) {
  const paths: Record<IconName, string> = {
    external: "M6 18 18 6M6 6h12v12",
    right: "M4 12h16m-6-6 6 6-6 6",
    left: "M20 12H4m6-6-6 6 6 6",
    down: "M12 4v16m-6-6 6 6 6-6",
    rotate: "M4 8a8 8 0 1 1 0 8M4 3v5h5",
    spark: "M12 2v20M2 12h20M5 5l14 14M5 19 19 5",
    pause: "M8 5v14M16 5v14",
    play: "m8 4 12 8-12 8Z",
  };
  return <svg className={`portfolio-icon ${className}`} viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={name === "spark" ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={paths[name]} /></svg>;
}
