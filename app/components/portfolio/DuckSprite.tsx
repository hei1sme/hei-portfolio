// Both sizes use the same six-frame artwork; larger placements get retina detail.
export default function DuckSprite({ className = "", large = false }: { className?: string; large?: boolean }) {
  return <span className={`portfolio-duck-sprite ${className}`} data-resolution={large ? "large" : "small"} aria-hidden="true" />;
}
