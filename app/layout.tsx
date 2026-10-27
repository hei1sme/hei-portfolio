import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import "./concepts/garden/garden.css";
import "./portfolio.css";
import "./components/portfolio/intro.css";
import SiteShell from "./components/SiteShell";
import { siteUrl } from "../lib/site";
import { introBootstrap } from "../lib/intro";

const manrope = Manrope({ subsets: ["latin", "vietnamese"], variable: "--garden-font", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Le Nguyen Gia Hung — AI research & things in motion", template: "%s — hei" },
  description: "AI undergraduate researcher at FPT University. Explainable AI, computer vision and time-series forecasting. Publications, projects and research by Le Nguyen Gia Hung.",
  authors: [{ name: "Le Nguyen Gia Hung" }],
  openGraph: { title: "hei — Seeing beyond the prediction", description: "Research, transparent AI systems and a curious person behind them.", type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head><script dangerouslySetInnerHTML={{ __html: introBootstrap }} /></head>
      <body className={`${manrope.variable} ${manrope.className}`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
