import Image from "next/image";
import Link from "next/link";
import Icon from "../../components/portfolio/Icon";
import { appliedProjects } from "../../../lib/applied-work";

export default function GardenExperience() {
  const cloud = appliedProjects[0];
  const builds = appliedProjects.slice(1);

  return <section id="garden-experience" className="portfolio-applied" aria-labelledby="portfolio-applied-title">
    <div className="portfolio-applied-heading"><h2 id="portfolio-applied-title">AI, in practice.</h2><p>Cloud workflows at FCAJ.<br />Projects made with a team.</p></div>

    <article className="portfolio-cloud-work">
      <figure className="portfolio-cloud-figure">
        <Link href={cloud.href} className="portfolio-cloud-image" aria-label="Explore NutriTrack AI workflows">
          <Image src={cloud.image} alt="NutriTrack workshop architecture linking AppSync, Lambda, Bedrock and DynamoDB" fill sizes="(max-width: 900px) 90vw, 46vw" />
          <span>Explore the architecture <Icon name="external" size={18} /></span>
        </Link>
        <figcaption>NutriTrack <span>Architecture from the internship workshop</span></figcaption>
      </figure>
      <div className="portfolio-cloud-copy">
        <p className="portfolio-work-context">First Cloud AI Journey · Jan–May 2026</p>
        <h3>NutriTrack.<br />Recipes & coaching.</h3>
        <p className="portfolio-work-role">FCAJ Cloud Intern · Team NeuraX</p>
        <p>I developed recipe-generation and coaching workflows for NutriTrack: user context goes in, structured responses come back to the app.</p>
        <ol className="portfolio-cloud-flow" aria-label="NutriTrack AI workflow"><li>DynamoDB<span>User context</span></li><li>Bedrock + Lambda<span>Generate & structure</span></li><li>AppSync<span>Back to the app</span></li></ol>
        <div className="portfolio-work-actions"><Link href={cloud.href}>My work & implementation <Icon name="external" /></Link><a href="https://hei1sme.github.io/hei-FCAJ-intership-report/" target="_blank" rel="noreferrer">Internship report <Icon name="external" size={18} /></a></div>
        <p className="portfolio-training-note">OJT at AWS Vietnam · Certified training period, January–May 2026.</p>
      </div>
    </article>

    <div className="portfolio-builds-heading"><h3>Built with a team.</h3><p>Acoustic monitoring and stellar light curves.</p></div>
    <div className="portfolio-builds">
      {builds.map(project => <article key={project.id} className={`portfolio-build portfolio-build-${project.id}`}>
        <Link href={project.href} className="portfolio-build-visual" aria-label={`Explore ${project.name}`}>
          <Image src={project.image} alt={project.visualCaption!} fill sizes="(max-width: 760px) 90vw, 46vw" />
          <span>{project.id === "biolisten" ? "Hackathon demo interface" : "Synthetic light-curve illustration"}<Icon name="external" size={18} /></span>
        </Link>
        <div className="portfolio-build-copy"><p className="portfolio-build-status">{project.status}</p><h4><Link href={project.href}>{project.name}</Link></h4><p className="portfolio-work-role">{project.role}</p><p>{project.description}</p><ul className="portfolio-build-tools" aria-label={`${project.name} tools`}>{project.stack.map(tool => <li key={tool}>{tool}</li>)}</ul><div className="portfolio-work-actions"><Link href={project.href}>Inside {project.name} <Icon name="external" /></Link><a href={project.source} target="_blank" rel="noreferrer">Code <Icon name="external" size={18} /></a></div></div>
      </article>)}
    </div>
    <div className="portfolio-more-competitions"><h3>Also on the starting line.</h3><dl><div><dt>FPT Hackathon 2025</dt><dd>Algorithmic programming competition · Participant</dd></div><div><dt>AI Hackathon · FPT University</dt><dd>TeamFinder · A website for finding course teammates</dd></div></dl></div>
  </section>;
}
