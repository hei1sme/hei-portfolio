import { notFound } from "next/navigation";
import ConceptExperience, { type Concept } from "../ConceptExperience";
import TechnicalPortfolio from "../research/TechnicalPortfolio";

const concepts: Concept[] = ["courtyard", "lens", "trail"];
export async function generateMetadata({ params }: { params: Promise<{ concept: string }> }) {
  const { concept } = await params;
  return { title: concept === 'courtyard' ? 'Le Nguyen Gia Hung — AI Research & Engineering' : 'hei — Design explorations' };
}
export function generateStaticParams() {
  return concepts.map((concept) => ({ concept }));
}

export default async function ConceptPage({
  params,
}: {
  params: Promise<{ concept: string }>;
}) {
  const { concept } = await params;
  if (!concepts.includes(concept as Concept)) notFound();
  if (concept === "courtyard") return <TechnicalPortfolio />;
  return <ConceptExperience concept={concept as Concept} />;
}
