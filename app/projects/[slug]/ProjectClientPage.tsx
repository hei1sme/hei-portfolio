import Icon from "../../components/portfolio/Icon";
import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import type { ResearchProject } from "../../concepts/research/portfolioData";
import { projectRecords } from "../../concepts/research/portfolioData";
import MethodDrawing from "../../components/portfolio/MethodDrawing";

type Frontmatter = { title?: string; summary?: string; image?: string; tags?: string[]; technologies?: string[]; liveUrl?: string; repoUrl?: string };
export default function ProjectClientPage({ children, frontmatter, record }: { children: ReactNode; frontmatter: Frontmatter; record?: ResearchProject }) {
  const image = record?.image || (frontmatter.image?.includes("placeholder") ? undefined : frontmatter.image);
  const current = projectRecords.findIndex(project => project.id === record?.id);
  const next = projectRecords[(current + 1) % projectRecords.length];
  const overview = record?.category === "Hackathon" || record?.category === "Cloud AI" ? "/#garden-experience" : "/#garden-work";
  return <article className="portfolio-case">
    <nav className="portfolio-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href={overview}>All work</Link><span aria-hidden="true">/</span><span>{record?.name || "Project"}</span></nav>
    <header className="portfolio-case-heading"><div><h1>{frontmatter.title}</h1><p>{frontmatter.summary}</p></div><div className="portfolio-case-identity"><span className="portfolio-status">{record?.status}</span><p>{record?.role}</p>{record?.paper ? <a href={record.paper} target="_blank" rel="noreferrer">Read the published paper <Icon name="external" /></a> : null}{record?.source ? <a href={record.source} target="_blank" rel="noreferrer">Source code & documentation <Icon name="external" /></a> : null}</div></header>
    <figure className={`portfolio-case-figure portfolio-case-${record?.id}`}>
      {image ? <a href={image} target="_blank" rel="noreferrer" data-cursor="Enlarge" aria-label={`Open ${record?.name || "project"} figure at full size`}><Image src={image} alt={record?.visualCaption || `${record?.name || "Project"} architecture`} width={1600} height={950} sizes="(max-width: 900px) 100vw, 1200px" priority /></a> : <MethodDrawing project={record?.id || "ppe"} />}
      <figcaption>{record?.visualCaption || (record?.id === "merr" ? "Architecture schematic · WavLM + Compact Conformer research" : image ? "Original project architecture · Open to inspect" : "Method schematic · Not measured model output")}</figcaption>
    </figure>
    {record ? <dl className="portfolio-case-metrics">{record.metrics.map(metric => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}</dl> : null}
    <div className="portfolio-case-body"><div className="portfolio-prose">{children}</div><aside className="portfolio-case-sidebar" aria-label="Project evidence">
      {record ? <><section><h2>My contribution</h2><ul>{record.contributions.map(item => <li key={item}>{item}</li>)}</ul></section><section><h2>Evaluation scope</h2><p>{record.evaluation}</p></section><section><h2>Limitations</h2><p>{record.limitation}</p></section></> : null}
      <section><h2>Tools & methods</h2><ul className="portfolio-tag-list">{(frontmatter.technologies || []).map(tech => <li key={tech}>{tech}</li>)}</ul></section>
      {record?.source || frontmatter.repoUrl || frontmatter.liveUrl ? <section><h2>Explore the work</h2>{record?.source || frontmatter.repoUrl ? <a href={record?.source || frontmatter.repoUrl} target="_blank" rel="noreferrer">Research repository <Icon name="external" /></a> : null}{frontmatter.liveUrl ? <a href={frontmatter.liveUrl} target="_blank" rel="noreferrer">Project demo <Icon name="external" /></a> : null}</section> : null}
    </aside></div>
    <nav className="portfolio-next-project" aria-label="Continue exploring"><Link href={overview}><Icon name="left" /> All work</Link><Link href={next.href || "/#garden-work"}>Next: {next.name} <Icon name="external" /></Link></nav>
  </article>;
}
