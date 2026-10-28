"use client";

import PortfolioHeader from "../../components/portfolio/PortfolioHeader";
import Icon from "../../components/portfolio/Icon";

import dynamic from "next/dynamic";
import MethodDrawing from "../../components/portfolio/MethodDrawing";
import EmailCopy from "../../components/portfolio/EmailCopy";
import MotionStrip from "../../components/portfolio/MotionStrip";
import DuckSprite from "../../components/portfolio/DuckSprite";
import { useDuckRhythm } from "../../components/portfolio/useDuckRhythm";
import { usePortfolioMotion } from "../../components/portfolio/PortfolioMotion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { PostMetadata } from "../../../lib/posts";
import { academicLinks, projectRecords } from "../research/portfolioData";

const BotanicalScene = dynamic(() => import("./BotanicalScene"), {
  ssr: false,
  loading: () => <div className="garden-scene-poster" role="status"><Image src="/images/personal/sculpture-poster.jpg" alt="" fill sizes="(max-width: 900px) 100vw, 70vw" priority /><span className="sr-only">Loading the interactive sculpture</span></div>,
});
const LeafStudyScene = dynamic(() => import("./LeafStudyScene"), {
  ssr: false,
  loading: () => <div className="garden-scene-poster" role="status"><Image src="/images/personal/leaf-study-poster.svg" alt="" fill sizes="(max-width: 900px) 100vw, 70vw" priority /><span className="sr-only">Loading the two-leaf sculpture</span></div>,
});
const BotanicalIllustration = dynamic(() => import("./BotanicalIllustration"), {
  ssr: false,
  loading: () => <div className="garden-scene-poster" role="status"><Image src="/images/personal/botanical-courtyard-poster.svg" alt="" fill sizes="(max-width: 900px) 100vw, 57vw" priority /><span className="sr-only">Preparing the courtyard</span></div>,
});
const NeuralBreach = dynamic(() => import("../../components/NeuralBreach"), { ssr: false });

const projectEvidence = {
  smokenet: ["Next-day PM₂.₅ forecasts", "Published · AJCAI 2025 · Chronological evaluation"],
  merr: ["WavLM + Conformer → GAT", "In progress · No final accuracy claimed"],
  asr: ["33.09% WER · 5.4M parameters", "Reported result · 745-hour Vietnamese corpus"],
  ppe: ["9-class YOLOv8 pipeline", "Webcam input, compliance logic & reporting"],
};

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" className={diagonal ? "garden-arrow diagonal" : "garden-arrow"}><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}


export default function GardenPortfolio({ posts, background, publications, experience, production = false }: { posts: PostMetadata[]; background: ReactNode; publications: ReactNode; experience?: ReactNode; production?: boolean }) {
  const { paused, reduced } = usePortfolioMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const personRef = useRef<HTMLElement>(null);
  const projectFocusRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const playgroundRef = useRef<HTMLDialogElement>(null);
  const aboutDuckRef = useDuckRhythm(paused, reduced);
  const [points, setPoints] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [entranceReplay, setEntranceReplay] = useState(0);
  const [sceneReady, setSceneReady] = useState(false);
  const [photographic, setPhotographic] = useState(false);
  const [leafStudy, setLeafStudy] = useState<boolean | null>(null);
  const [illustrated, setIllustrated] = useState<boolean | null>(null);
  const isIllustrated = illustrated !== false;
  const [projectId, setProjectId] = useState("smokenet");
  const [showMethod, setShowMethod] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(!production);
  const inspectorToggleRef = useRef<HTMLButtonElement>(null);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const [playground, setPlayground] = useState(false);
  const [playgroundOrigin, setPlaygroundOrigin] = useState({ x: 0, y: 0 });
  const project = projectRecords.find(record => record.id === projectId)!;
  const onSceneReady = useCallback(() => setSceneReady(true), []);
  const onSceneUnavailable = useCallback(() => setSceneReady(false), []);
  const replayWelcome = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    progress.current = 0; setPoints(false); setRotation(0);
    setEntranceReplay(value => value + 1);
    window.dispatchEvent(new Event("portfolio:intro-replay"));
  };

  const openPlayground = useCallback((origin?: { x: number; y: number }) => {
    if (playgroundRef.current?.open) return;
    setPlaygroundOrigin(origin || { x: window.innerWidth / 2, y: window.innerHeight / 2 });
    setPlayground(true);
    playgroundRef.current?.showModal();
  }, []);

  useEffect(() => {
    let sequence = "";
    const onKey = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey || document.querySelector("dialog[open]")) return;
      const target = event.target as HTMLElement;
      if (target?.closest("input, textarea, select, [contenteditable=true]")) return;
      if (event.key.length !== 1) { sequence = ""; return; }
      sequence = (sequence + event.key.toLowerCase()).slice(-5);
      if (sequence === "ailab") { sequence = ""; openPlayground(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openPlayground]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const photo = !production && query.get("view") === "photo";
    const leaves = query.get("sculpture") === "leaves";
    setIllustrated(!photo && (query.get("scene") === "botanical" || (!leaves && query.get("scene") !== "sculpture")));
    if (!production) setPhotographic(photo);
    setLeafStudy(leaves);
  }, [production]);

  useEffect(() => {
    const panel = projectFocusRef.current;
    if (!panel) return;
    const observer = new IntersectionObserver(([entry]) => {
      panel.dataset.entered = String(entry.isIntersecting);
    }, { threshold: 0.2 });
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const milestones = document.querySelectorAll(".garden-milestones > li");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { (entry.target as HTMLElement).dataset.active = String(entry.isIntersecting); });
    }, { rootMargin: "-15% 0px -35% 0px", threshold: 0.15 });
    milestones.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const height = heroRef.current?.offsetHeight || window.innerHeight;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const personBounds = !paused && !reduced ? personRef.current?.getBoundingClientRect() : null;
      progress.current = Math.min(1, Math.max(0, window.scrollY / height));
      rootRef.current?.style.setProperty("--garden-scroll", reduced || paused ? "0" : String(progress.current));
      rootRef.current?.style.setProperty("--garden-page-progress", String(scrollable > 0 ? window.scrollY / scrollable : 0));
      if (personBounds) personRef.current?.style.setProperty("--portrait-progress", String(Math.max(0, Math.min(1, (window.innerHeight - personBounds.top) / (window.innerHeight + personBounds.height)))));
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [paused, reduced]);

  const chooseOpening = (photo: boolean) => {
    setPhotographic(photo);
    setIllustrated(!photo);
    const url = new URL(window.location.href);
    if (photo) url.searchParams.set("view", "photo"); else url.searchParams.delete("view");
    window.history.replaceState(null, "", url);
  };
  const closePlayground = useCallback(() => { playgroundRef.current?.close(); setPlayground(false); }, []);

  const browseProject = (delta: number) => {
    const index = projectRecords.findIndex(item => item.id === projectId);
    setProjectId(projectRecords[(index + delta + projectRecords.length) % projectRecords.length].id);
    setShowMethod(false);
  };
  const inspectProject = (id: string) => {
    setInspectorOpen(true);
    setProjectId(id);
    setShowMethod(false);
    requestAnimationFrame(() => {
      projectFocusRef.current?.focus({ preventScroll: true });
      projectFocusRef.current?.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
    });
  };

  return (
    <div className={`garden-root${production ? " portfolio-home" : ""}`} ref={rootRef} data-reduced-motion={reduced} data-motion-paused={paused} data-scene-ready={sceneReady}>
      <div className="garden-page-progress" aria-hidden="true" />
      <a href="#garden-publications" className="garden-skip">Skip to research</a>
      <PortfolioHeader>
        <a href="#garden-home" aria-label="hei, home" className="garden-brand">hei<Icon name="spark" size={27} className="portfolio-brand-mark" /></a>
        <nav aria-label="Main navigation"><a href="#garden-publications">Research</a><a className="portfolio-experience-nav" href="#garden-experience">Experience</a><details className="garden-explore" onKeyDown={(event) => { if (event.key === "Escape") { event.currentTarget.open = false; event.currentTarget.querySelector("summary")?.focus(); } }}><summary>Explore <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg></summary><div className="garden-menu-links" onClick={(event) => { const anchor = (event.target as HTMLElement).closest("a"); if (!anchor) return; const href = anchor.getAttribute("href"); const target = href?.startsWith("#") ? document.getElementById(href.slice(1)) : null; if (target instanceof HTMLDetailsElement) target.open = true; event.currentTarget.parentElement?.removeAttribute("open"); }}><a href="#garden-publications">Publications & manuscripts</a><a href="#garden-work">Selected projects</a><a href="#garden-experience">Experience & builds</a><a href="#garden-person">About me</a><a href="#garden-journey">Research journey</a><a href="#garden-education">Education & certifications</a><a href="#garden-toolkit">Technical toolkit</a><a href="#garden-writing">Writing</a><a href="/HungLNG_Resume.pdf" target="_blank" rel="noreferrer">Download CV</a><p className="garden-menu-motion-title">Animation options</p><button type="button" disabled={reduced || paused} onClick={event => { replayWelcome(); event.currentTarget.closest("details")?.removeAttribute("open"); }}><Icon name="rotate" />Replay welcome</button>{!isIllustrated ? <><button type="button" disabled={!sceneReady} aria-pressed={points} onClick={() => setPoints(value => !value)}>Sculpture points</button><button type="button" disabled={!sceneReady} onClick={() => setRotation(value => value + Math.PI / 3)}><Icon name="rotate" />Rotate sculpture</button></> : null}</div></details><a href="/HungLNG_Resume.pdf" target="_blank" rel="noreferrer">CV <Arrow diagonal /></a></nav>
        <a href="mailto:heiontheway@gmail.com" data-magnetic className="garden-contact-link">Say hello <Icon name="external" /></a>
      </PortfolioHeader>

      <main>
        <section className={`garden-hero ${photographic ? "garden-photo-opening" : ""}${isIllustrated ? " garden-illustrated-opening" : ""}`} id="garden-home" ref={heroRef}>
          <div className="garden-intro">
            <p className="garden-identity">Le Nguyen Gia Hung<br /><span>AI undergraduate researcher · FPT University</span><span className="portfolio-hero-qualification">GPA 8.62/10 · Expected graduation: Dec 2027</span></p>
            <h1>Seeing beyond<br />the prediction.</h1>
            <p className="garden-intro-copy">I&apos;m Hưng. I work on time-series forecasting and computer vision, with a focus on explaining model predictions.</p>
            <p className="portfolio-hero-opportunities">Open to research internships and AI/ML engineering opportunities.</p>
            <div className="garden-hero-actions"><a href="#garden-publications" data-magnetic className="garden-primary-link">Explore research <Arrow /></a><a data-magnetic className="garden-hero-cv" href="/HungLNG_Resume.pdf" target="_blank" rel="noreferrer">CV <Arrow diagonal /></a></div>
            <a className="garden-hero-paper" href="#garden-published-paper"><strong>Published: SmokeNet · AJCAI 2025</strong><span>First & corresponding author <Arrow diagonal /></span></a>
          </div>
          <div className="garden-hero-art" data-scene={isIllustrated && !photographic ? "botanical" : undefined} data-sculpture={leafStudy && !photographic && !isIllustrated ? "leaves" : undefined} data-cursor={photographic || isIllustrated ? undefined : "Drag"}>
            {photographic ? <figure className="garden-hero-photo">
              <Image src="/images/experience/2_SmokeNet/2_1_SN.jpg" alt="SmokeNet paper title projected in the AJCAI 2025 conference room" fill sizes="(max-width: 760px) 100vw, 65vw" priority />
              <figcaption>The first paper. The beginning of more questions.<br /><span>SmokeNet · AJCAI 2025</span></figcaption>
            </figure> : illustrated === true ? <BotanicalIllustration paused={paused} reduced={reduced} replay={entranceReplay} progress={progress} onReady={onSceneReady} /> : leafStudy === null ? <div className="garden-scene-poster" role="status"><Image src="/images/personal/botanical-courtyard-poster.svg" alt="" fill sizes="(max-width: 900px) 100vw, 57vw" priority /><span className="sr-only">Preparing the courtyard</span></div> : leafStudy ? <LeafStudyScene points={points} paused={paused} reduced={reduced} rotation={rotation} progress={progress} replay={entranceReplay} onReady={onSceneReady} onUnavailable={onSceneUnavailable} /> : <BotanicalScene points={points} paused={paused} reduced={reduced} rotation={rotation} progress={progress} replay={entranceReplay} onReady={onSceneReady} onUnavailable={onSceneUnavailable} />}
          </div>
          <div className="garden-hero-bottom">
            <a href="#garden-publications" className="garden-scroll-link"><Icon name="down" /> Research, just below</a>
            {!photographic ? <p className="garden-scene-hint">{isIllustrated ? "Scroll to explore." : <><span className="portfolio-pointer-hint">Drag to turn. Scroll to explore.</span><span className="portfolio-touch-hint">More sculpture views in Explore.</span></>}</p> : null}
          </div>
        </section>

        {publications}
        <MotionStrip paused={paused} reduced={reduced} />

        <section className="garden-work" id="garden-work" aria-labelledby="garden-work-title">
          <div className="garden-work-heading"><h2 id="garden-work-title">Selected projects.</h2><p>Models, experiments<br />and the code behind them.</p></div>
          <div className="garden-project-index" role="group" aria-label="Project overview and detail selection">
            {projectRecords.map(record => <article key={record.id} data-selected={inspectorOpen && projectId === record.id} id={`garden-overview-${record.id}`}>
              <div className="garden-index-name"><div className="garden-index-thumb" aria-hidden="true">{record.image ? <Image src={record.image} alt="" fill sizes="140px" /> : <svg viewBox="0 0 160 96"><g fill="none" stroke="currentColor" strokeWidth="2">{record.id === "asr" ? <>{Array.from({ length: 8 }, (_, i) => { const halfHeight = 10 + Math.sin(i * 1.1) ** 2 * 18; return <path key={i} d={`M${17 + i * 7} ${(47 - halfHeight).toFixed(2)}v${(halfHeight * 2).toFixed(2)}`} />; })}<path d="M81 48h18m-6-6 6 6-6 6" /></> : <><rect x="15" y="16" width="56" height="60" rx="4" /><rect x="25" y="25" width="35" height="28" rx="3" /><path d="M81 48h18m-6-6 6 6-6 6" /></>}</g><text x="104" y="54" fill="currentColor" fontSize="17" fontWeight="600">{record.id === "asr" ? "CTC" : "PPE"}</text></svg>}{!record.image || record.id === "merr" ? <span>Schematic</span> : null}</div><div><h3>{record.name}</h3><p>{record.status}</p></div></div>
              <div className="garden-index-work"><p>{record.description}</p><span>{record.role}</span><small>{record.stack.join(" · ")}</small></div>
              <div className="garden-index-evidence"><strong>{projectEvidence[record.id][0]}</strong><span>{projectEvidence[record.id][1]}</span><div className="garden-index-actions"><button type="button" className="garden-index-action" aria-label={`Inspect ${record.name} project`} aria-controls="garden-project-focus" aria-pressed={inspectorOpen && projectId === record.id} onClick={() => inspectProject(record.id)}>Inspect project <Arrow /></button>{record.href ? <Link href={record.href} className="garden-index-case" aria-label={`${record.name} case study`}>Case study <Arrow diagonal /></Link> : null}{record.source ? <a href={record.source} target="_blank" rel="noreferrer" className="garden-index-case" aria-label={`${record.name} research repository`}>Code <Arrow diagonal /></a> : null}</div></div>
            </article>)}
          </div>
          <button className="portfolio-explorer-toggle" type="button" ref={inspectorToggleRef} aria-expanded={inspectorOpen} aria-controls="portfolio-project-explorer" onClick={() => setInspectorOpen(value => !value)}>{inspectorOpen ? "Close project explorer" : "Open the project explorer"} <span aria-hidden="true">{inspectorOpen ? "−" : "+"}</span></button>
          <div id="portfolio-project-explorer" hidden={!inspectorOpen}>
          <div className="portfolio-project-controls"><div role="group" aria-label="Choose a project">{projectRecords.map(item => <button type="button" key={item.id} aria-pressed={projectId === item.id} onClick={() => { setProjectId(item.id); setShowMethod(false); }}>{item.name}</button>)}</div><div><button type="button" aria-label="Previous project" onClick={() => browseProject(-1)}><Icon name="left" /></button><button type="button" aria-label="Next project" onClick={() => browseProject(1)}><Icon name="right" /></button></div></div>
          <div onKeyDown={event => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); browseProject(event.key === "ArrowRight" ? 1 : -1); } }} className={`garden-project-stage garden-project-${project.id}`} ref={projectFocusRef} tabIndex={-1} aria-label={`${project.name} project detail`} id="garden-project-focus">
            <div className="garden-project-visual" key={project.id} onPointerDown={event => { if (event.pointerType === "touch") swipeStart.current = { x: event.clientX, y: event.clientY }; }} onPointerCancel={() => { swipeStart.current = null; }} onPointerUp={event => { const start = swipeStart.current; swipeStart.current = null; if (!start) return; const dx = event.clientX - start.x, dy = event.clientY - start.y; if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) browseProject(dx < 0 ? 1 : -1); }}>
              {project.id === "smokenet" && !showMethod ? <Image src="/images/experience/2_SmokeNet/2_1_SN.jpg" alt="SmokeNet paper title projected in the AJCAI 2025 conference room" fill sizes="(max-width: 760px) 100vw, 65vw" /> : project.image ? <Image src={project.image} alt={`${project.name} ${project.id === "merr" ? "current architecture schematic" : "original architecture diagram"}`} fill sizes="(max-width: 760px) 100vw, 65vw" className="garden-architecture" /> : <MethodDrawing project={project.id} />}
              {project.id === "smokenet" ? <button className="garden-image-switch" type="button" aria-pressed={showMethod} onClick={() => setShowMethod(value => !value)}>{showMethod ? "Back to the story" : "See the architecture"}<Arrow /></button> : null}
              {!project.image ? <span className="garden-schematic-caption">Method schematic · not model output</span> : null}
            </div>
            <div className="garden-project-summary" aria-live="polite" aria-atomic="true">
              <p className="garden-project-status">{project.status}</p>
              <h3>{project.name}</h3>
              <p className="garden-project-question">{project.question}</p>
              <p className="garden-project-role">{project.role}</p>
              <p className="garden-project-result"><strong>{project.metrics[0].value}</strong><span>{project.metrics[0].label}</span></p>
              {project.href ? <Link href={project.href} className="garden-project-link">Inside the project <Arrow /></Link> : <button type="button" className="garden-project-link" onClick={() => { const detail = document.querySelector<HTMLDetailsElement>("#garden-project-depth"); if (detail) { detail.open = true; detail.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "center" }); } }}>Method & evaluation <Arrow /></button>}
              {project.paper ? <a href={project.paper} target="_blank" rel="noreferrer" className="garden-paper-link">Read the published paper <Arrow diagonal /></a> : null}
              <a href="#garden-work" className="garden-back-overview">Back to all projects</a>
            </div>
          </div>
          <details className="garden-project-depth" id="garden-project-depth" key={project.id} open>
            <summary>Contribution, methods & evaluation <span aria-hidden="true">+</span></summary>
            <div className="garden-depth-content"><div><h4>What I worked on</h4><ul>{project.contributions.map(text => <li key={text}>{text}</li>)}</ul></div><div><h4>Evaluation & limits</h4><p>{project.evaluation}</p><p>{project.limitation}</p><p>{project.metrics.map(metric => `${metric.value} ${metric.label}`).join("; ")}.</p></div></div>
          </details>
          <p className="portfolio-explorer-hint">Use the project buttons or arrow keys to explore. On touch, swipe the figure.</p>
          </div>
        </section>

        {experience}
        <section id="garden-person" className="garden-person" aria-labelledby="garden-person-title" ref={personRef}>
          <div className="garden-person-image"><Image src="/profile.jpg" alt="Le Nguyen Gia Hung" fill sizes="(max-width: 900px) 65vw, 30vw" /><button type="button" ref={aboutDuckRef} data-duck-state="idle" className="garden-running-duck" aria-label="Open the playground with my running duck" onClick={(event) => { const bounds = event.currentTarget.getBoundingClientRect(); openPlayground({ x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2 }); }}><span className="garden-duck-motion"><DuckSprite large /></span><span className="garden-duck-label">Play break?</span></button></div>
          <div className="garden-person-copy"><h2 id="garden-person-title">Researcher.<br />Runner.<br />Duck person.</h2><p>I founded SpeedyLabX at FPT University. Outside research, I run, train at the gym and take photos. I also have a soft spot for ducks.</p><div className="garden-person-links"><a href="#garden-journey">The journey <Arrow /></a><a href="/HungLNG_Resume.pdf" target="_blank" rel="noreferrer">My CV <Arrow diagonal /></a></div></div>
        </section>
        {background}
        {posts.length ? <section className="garden-writing" id="garden-writing" aria-labelledby="garden-writing-title"><div><h2 id="garden-writing-title">Thinking out loud.</h2><Link href="/blog">All writing <Arrow /></Link></div>{posts.map(post => <Link className="garden-writing-entry" data-cursor="Read" href={`/blog/${post.slug}`} key={post.slug}><div className="garden-writing-image">{post.imageUrl ? <Image src={post.imageUrl} alt="" fill sizes="(max-width: 900px) 90vw, 40vw" /> : null}</div><div><time dateTime={post.date}>{post.date}</time><h3>{post.title}</h3><p>{post.excerpt}</p><span>Read the story <Arrow /></span></div></Link>)}</section> : null}
        <section className="garden-outro" id="garden-contact">
          <p>For internships and research collaborations</p><a href="mailto:heiontheway@gmail.com">Let&apos;s talk.<Arrow diagonal /></a>
          <p className="portfolio-availability">I&apos;m looking for research internships and AI/ML engineering opportunities.</p>
          <EmailCopy />
          <div className="garden-socials"><a href="https://github.com/hei1sme/" target="_blank" rel="noreferrer">GitHub</a><a href="https://linkedin.com/in/le-nguyen-gia-hung/" target="_blank" rel="noreferrer">LinkedIn</a>{academicLinks.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer">{label}</a>)}</div>
        </section>
      </main>
      <nav className="garden-sitemap" aria-label="Portfolio sections"><a href="#garden-publications">Publications</a><a href="#garden-work">Projects</a><a href="#garden-experience">Experience</a><a href="#garden-journey">Journey</a><a href="#garden-education">Education</a><a href="#garden-toolkit">Toolkit</a><a href="#garden-writing">Writing</a><a href="#garden-contact">Contact</a></nav>
      <footer className="garden-footer"><p>Le Nguyen Gia Hung <span>Keep asking. Keep moving.</span></p><button type="button" className="garden-playground-link" onClick={(event) => { const bounds = event.currentTarget.getBoundingClientRect(); openPlayground({ x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2 }); }}>Something to play with <Icon name="spark" size={27} className="portfolio-brand-mark" /></button></footer>
      {!production ? <aside className="garden-comparison" aria-label="Compare design explorations"><span>Compare openings</span><button type="button" aria-pressed={!photographic} onClick={() => chooseOpening(false)}>Sculpture</button><button type="button" aria-pressed={photographic} onClick={() => chooseOpening(true)}>Photograph</button><Link href="/">Main website <Arrow diagonal /></Link></aside> : null}
      <dialog className="garden-playground" ref={playgroundRef} onCancel={() => setPlayground(false)} aria-label="NeuralBreach playground"><button type="button" className="garden-playground-close" onClick={closePlayground}>Close playground</button>{playground ? <NeuralBreach onClose={closePlayground} buttonPosition={playgroundOrigin} allowSkip /> : null}</dialog>
    </div>
  );
}
