import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./concepts.css";

const figtree = Figtree({ subsets: ["latin"], display: "swap" });
export const metadata: Metadata = {
  title: "hei — Design explorations",
  description:
    "Three visual directions for Le Nguyen Gia Hung’s research portfolio.",
  robots: { index: false, follow: false },
};

export default function ConceptsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`concept-root ${figtree.className}`}>{children}</div>;
}
