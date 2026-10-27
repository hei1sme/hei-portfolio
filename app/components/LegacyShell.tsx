"use client";

import { ThemeProvider } from "../context/ThemeContext";
import { LabProvider } from "../context/LabContext";
import { ParallaxProvider } from "react-scroll-parallax";
import CustomCursor from "./CustomCursor";
import VerticalNavigation from "./VerticalNavigation";
import ScrollProgress from "./ScrollProgress";
import FloatingCTA from "./FloatingCTA";

export default function LegacyShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <LabProvider>
        <ParallaxProvider>
          <ScrollProgress />
          <CustomCursor />
          <FloatingCTA />
          <VerticalNavigation />
          <main className="pl-0 md:pl-20 w-full min-h-screen">{children}</main>
        </ParallaxProvider>
      </LabProvider>
    </ThemeProvider>
  );
}
