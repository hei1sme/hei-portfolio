import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectData, getProjectSlugs } from "../../../lib/projects";
import ProjectClientPage from "./ProjectClientPage";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return getProjectSlugs().map(slug => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectData((await params).slug);
  return project ? { title: project.frontmatter.title, description: project.frontmatter.summary, alternates: { canonical: `/projects/${(await params).slug}` } } : { title: "Project not found" };
}
export default async function ProjectPage({ params }: Props) {
  const project = await getProjectData((await params).slug);
  if (!project) notFound();
  return <ProjectClientPage frontmatter={project.frontmatter} record={project.record}>{project.renderedContent}</ProjectClientPage>;
}
