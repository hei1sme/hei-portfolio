"use client";

import { usePathname } from "next/navigation";
import PortfolioChrome from "./portfolio/PortfolioChrome";
import PortfolioCursor from "./portfolio/PortfolioCursor";
import PortfolioIntro from "./portfolio/PortfolioIntro";
import PortfolioMotion from "./portfolio/PortfolioMotion";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isConcept =
    pathname === "/concepts" || pathname.startsWith("/concepts/");
  if (isConcept) return children;
  return <PortfolioMotion>{pathname === "/" ? <><PortfolioIntro />{children}</> : <PortfolioChrome>{children}</PortfolioChrome>}<PortfolioCursor /></PortfolioMotion>;
}
