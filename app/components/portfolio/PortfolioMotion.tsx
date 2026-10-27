"use client";

import { createContext, useContext, useMemo, useState, useSyncExternalStore, type Dispatch, type ReactNode, type SetStateAction } from "react";
import Icon from "./Icon";

const preference = "(prefers-reduced-motion: reduce)";
const subscribe = (callback: () => void) => {
  const query = matchMedia(preference);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};
const snapshot = () => matchMedia(preference).matches;
const serverSnapshot = () => false;
const MotionContext = createContext<{ paused: boolean; setPaused: Dispatch<SetStateAction<boolean>>; reduced: boolean } | null>(null);

export function usePortfolioMotion() {
  const motion = useContext(MotionContext);
  if (!motion) throw new Error("Portfolio motion needs its provider");
  return motion;
}

export default function PortfolioMotion({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  const reduced = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const value = useMemo(() => ({ paused, setPaused, reduced }), [paused, reduced]);
  return <MotionContext.Provider value={value}>
    <div className="portfolio-site" data-motion-paused={paused || reduced}>
      {children}
      <button id="site-motion-control" className="portfolio-motion-control" type="button" disabled={reduced} aria-pressed={paused || reduced} aria-label={reduced ? "Animations follow your reduced motion preference" : paused ? "Resume animations across the site" : "Pause animations across the site"} onClick={() => setPaused(current => !current)}><Icon name={paused ? "play" : "pause"} size={16} /><span>{reduced ? "Motion reduced" : paused ? "Resume motion" : "Pause motion"}</span></button>
    </div>
  </MotionContext.Provider>;
}
