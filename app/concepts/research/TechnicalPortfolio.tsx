"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import NetworkStudy from "./NetworkStudy";
import {
  academicLinks,
  certificationRecords,
  projectRecords,
  publicationRecords,
  skillGroups,
  type ResearchProject,
} from "./portfolioData";
import "./technical.css";

const NeuralBreach = dynamic(() => import("../../components/NeuralBreach"), {
  ssr: false,
});
const Arrow = () => <span aria-hidden="true">↗</span>;
const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (notify: () => void) => {
  const query = matchMedia(reducedQuery);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};
const reducedSnapshot = () => matchMedia(reducedQuery).matches;
const reducedServerSnapshot = () => false;

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="r-section-title">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}

const flowStages = [
  {
    id: "input",
    name: "Read the world.",
    label: "Input",
    method: "PM₂.₅ + meteorological time series",
    copy: "Environmental signals arrive in time. Chronological splits keep future observations out of the training data.",
  },
  {
    id: "model",
    name: "Learn the pattern.",
    label: "Model",
    method: "Seasonal embeddings → Transformer encoder",
    copy: "SmokeNet models temporal relationships with a transformer-based architecture and a reconstruction objective.",
  },
  {
    id: "forecast",
    name: "Make a prediction.",
    label: "Forecast",
    method: "Next-day concentration → health-oriented alert",
    copy: "Forecasts connect predicted concentrations to understandable alerts. Evaluation is reported against baseline models.",
  },
  {
    id: "explain",
    name: "Make it inspectable.",
    label: "Explain",
    method: "SHAP · Integrated Gradients · DiCE",
    copy: "Attribution and counterfactual analysis help inspect the forecast. An explanation is something to interrogate—not a substitute for evaluation.",
  },
];

function ModelFlow({ running }: { running: boolean }) {
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start center", "end end"],
  });
  const pathLength = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setStage(Number((entry.target as HTMLElement).dataset.stage));
      });
    }, { rootMargin: '-25% 0px -35% 0px', threshold: 0.1 });
    section.current?.querySelectorAll('[data-stage]').forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return (
    <section
      ref={section}
      className="r-flow r-section"
      id="method"
      aria-labelledby="method-title"
    >
      <div className="r-flow-intro">
        <p className="r-context">An approach, not a black box</p>
        <h2 id="method-title">
          A prediction is only
          <br />
          part of the answer.
        </h2>
        <p>
          Here’s how that idea takes shape in SmokeNet.
          <br />
          Scroll through the research pipeline.
        </p>
        <Link href="/projects/smokenet-air-quality">
          Read the full case study <Arrow />
        </Link>
      </div>
      <div className="r-flow-layout">
        <div className="r-flow-sticky">
          <div className="r-diagram-head">
            <span>SmokeNet / research pipeline</span>
            <span>{stage + 1} of 4</span>
          </div>
          <svg
            viewBox="0 0 520 410"
            className="r-pipeline-svg"
            role="img"
            aria-label="Time series enter the transformer, which produces a forecast; attribution and counterfactual methods support inspection."
          >
            <defs>
              <pattern
                id="technical-dot-grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1" cy="1" r=".8" fill="#7493b4" opacity=".3" />
              </pattern>
            </defs>
            <rect width="520" height="410" fill="url(#technical-dot-grid)" />
            <path
              d="M95 108H255V210H420V321H255H95V210"
              fill="none"
              stroke="#c9d8e9"
              strokeWidth="2"
            />
            <motion.path
              d="M95 108H255V210H420V321H255H95V210"
              fill="none"
              stroke="#245ae8"
              strokeWidth="2.5"
              style={{ pathLength: running ? pathLength : 1 }}
            />
            {[
              {
                x: 95,
                y: 108,
                t: "Time series",
                s: "Environmental observations",
              },
              {
                x: 255,
                y: 108,
                t: "Transformer",
                s: "Temporal representation",
              },
              { x: 420, y: 210, t: "Forecast", s: "PM₂.₅ / health alerts" },
              { x: 255, y: 321, t: "Explainability", s: "SHAP · IG · DiCE" },
            ].map((node, index) => (
              <g
                key={node.t}
                className={
                  stage === index
                    ? "r-diagram-node is-active"
                    : "r-diagram-node"
                }
              >
                <rect
                  x={node.x - 68}
                  y={node.y - 27}
                  width="136"
                  height="54"
                  rx="6"
                />
                <text x={node.x} y={node.y + 4} textAnchor="middle">
                  {node.t}
                </text>
                <text
                  className="r-node-description"
                  x={node.x}
                  y={node.y + 48}
                  textAnchor="middle"
                >
                  {node.s}
                </text>
              </g>
            ))}
          </svg>
          <div
            className="r-flow-controls"
            role="group"
            aria-label="Explore pipeline stages"
          >
            {flowStages.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={stage === index}
                onClick={() => {
                  setStage(index);
                  document.getElementById(`flow-${item.id}`)?.scrollIntoView({
                    behavior: running ? "smooth" : "auto",
                    block: "center",
                  });
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="r-diagram-note">
            Conceptual pipeline, not a live model run. Geometry does not
            represent model dimensions.
          </p>
        </div>
        <div className="r-flow-steps">
          {flowStages.map((item, index) => (
            <article
              key={item.id}
              id={`flow-${item.id}`}
              data-stage={index}
              className={
                stage === index ? "r-flow-step is-active" : "r-flow-step"
              }
            >
              <span className="r-step-number">
                0{index + 1} / {item.label}
              </span>
              <h3>{item.name}</h3>
              <code>{item.method}</code>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectDialog({
  project,
  onClose,
}: {
  project: ResearchProject;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const node = dialog.current;
    node?.showModal();
    return () => node?.close();
  }, []);
  return (
    <dialog
      ref={dialog}
      className="r-project-dialog"
      aria-labelledby="project-dialog-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="r-dialog-content">
        <button
          className="r-dialog-close"
          type="button"
          onClick={onClose}
          aria-label="Close project details"
        >
          ×
        </button>
        <p className="r-context">{project.status}</p>
        <h2 id="project-dialog-title">{project.name}</h2>
        <p className="r-project-role">{project.role}</p>
        <h3>{project.question}</h3>
        <p>{project.description}</p>
        {project.image && (
          <div className="r-dialog-image">
            <Image
              src={project.image}
              alt={`${project.name} architecture`}
              fill
              sizes="(max-width: 760px) 90vw, 720px"
            />
          </div>
        )}
        <h3>My contribution</h3>
        <ul>
          {project.contributions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="r-project-metrics">
          {project.metrics.map((item) => (
            <div key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <h3>Evaluation context</h3>
        <p>{project.evaluation}</p>
        <h3>Limits to keep in view</h3>
        <p>{project.limitation}</p>
        <div className="r-tags">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="r-actions">
          {project.href && (
            <Link className="r-button" href={project.href}>
              Full case study <Arrow />
            </Link>
          )}
          {project.paper && (
            <a
              className="r-text-link"
              href={project.paper}
              target="_blank"
              rel="noopener noreferrer"
            >
              Paper / DOI <Arrow />
            </a>
          )}
          {!project.href && (
            <a
              className="r-text-link"
              href="https://github.com/hei1sme/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub profile <Arrow />
            </a>
          )}
        </div>
      </div>
    </dialog>
  );
}

function ProjectCollection({ running }: { running: boolean }) {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<ResearchProject | null>(null);
  const visible = projectRecords.filter(
    (item) => filter === "All" || item.category === filter,
  );
  return (
    <section className="r-projects r-section" id="projects">
      <SectionTitle
        title="Systems I’ve built."
        subtitle="The methods, the implementation, and the evaluation behind the work."
      />
      <div className="r-filter" role="group" aria-label="Filter projects">
        {["All", "Research", "Computer Vision"].map((item) => (
          <button
            type="button"
            key={item}
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
          >
            {item}
            {item === "All" ? " / 4" : ""}
          </button>
        ))}
      </div>
      <motion.div layout={running} className="r-project-grid">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.article
              layout={running}
              key={project.id}
              initial={running ? { opacity: 0, y: 18 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: running ? 0.3 : 0 }}
              className="r-project-card"
            >
              <div className={`r-project-visual r-visual-${project.id}`}>
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.name} architecture`}
                    fill
                    sizes="(max-width:760px) 90vw, 44vw"
                  />
                ) : project.id === "asr" ? (
                  <div
                    className="r-waveform"
                    aria-label="Illustrative speech waveform, not an audio recording"
                  >
                    {Array.from({ length: 48 }, (_, i) => (
                      <i
                        key={i}
                        style={{
                          height: `${15 + Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.21)) * 72}%`,
                          animationDelay: `${i * -0.08}s`,
                        }}
                      />
                    ))}
                    <span>Audio → CNN → BiLSTM → CTC</span>
                  </div>
                ) : (
                  <div
                    className="r-detection"
                    aria-label="Illustration of a PPE detection interface, not a model prediction"
                  >
                    <div className="r-person">
                      <span />
                      <i />
                    </div>
                    <span className="r-bbox r-bbox-head">Hard hat</span>
                    <span className="r-bbox r-bbox-body">Safety vest</span>
                    <small>Detection interface study · illustrative</small>
                  </div>
                )}
                <span className="r-visual-status">{project.status}</span>
              </div>
              <div className="r-project-body">
                <div className="r-project-card-title">
                  <h3>{project.name}</h3>
                  <button
                    type="button"
                    onClick={() => setSelected(project)}
                    aria-label={`Explore ${project.name}`}
                  >
                    <Arrow />
                  </button>
                </div>
                <p className="r-project-role">{project.role}</p>
                <p>{project.description}</p>
                <div className="r-project-metrics">
                  {project.metrics.map((item) => (
                    <div key={item.label}>
                      <strong>{item.value}</strong>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
                <div className="r-tags">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <button
                  className="r-text-link"
                  type="button"
                  onClick={() => setSelected(project)}
                >
                  Methods, contribution &amp; limits{" "}
                  <span aria-hidden="true">＋</span>
                </button>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
      {selected && (
        <ProjectDialog project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

function ResearchJourney({ running }: { running: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  return (
    <section ref={ref} id="journey" className="r-journey r-section">
      <SectionTitle
        title="The questions keep growing."
        subtitle="From a student research group to the first paper—and the work it set in motion."
      />
      <div className="r-journey-grid">
        <div className="r-journey-line">
          <motion.div style={{ scaleY: running ? progress : 1 }} />
        </div>
        <article className="r-milestone">
          <span className="r-context">2025 / SpeedyLabX</span>
          <h3>Build a place to figure things out.</h3>
          <p>
            Founded and lead a 10-member undergraduate research group at FPT
            University. Weekly technical workshops, paper reading and shared
            submission workflows turn individual curiosity into collective work.
          </p>
          <div className="r-milestone-image">
            <Image
              src="/images/experience/1_SpeedyLabX/1_1_slx.png"
              alt="SpeedyLabX research group"
              fill
              sizes="(max-width:760px) 90vw, 42vw"
            />
          </div>
        </article>
        <article className="r-milestone">
          <span className="r-context">2025 / First publication</span>
          <h3>A first paper. A starting point.</h3>
          <p>
            SmokeNet became my first publication at AJCAI 2025. What stays with
            me is the question behind it: can people understand the model well
            enough to question its decisions?
          </p>
          <div className="r-milestone-image">
            <Image
              src="/images/experience/2_SmokeNet/2_1_SN.jpg"
              alt="Photo from the SmokeNet research journey"
              fill
              sizes="(max-width:760px) 90vw, 42vw"
            />
          </div>
          <a
            href={publicationRecords[0].href}
            className="r-text-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the published work <Arrow />
          </a>
        </article>
        <article className="r-milestone r-current">
          <span className="r-context">Continuing research</span>
          <h3>Keep the model open to questions.</h3>
          <p>
            Current directions include sparse environmental forecasting,
            multimodal anomaly detection, emotion recognition and efficient
            speech models. XAI remains the thread connecting the work.
          </p>
          <div className="r-lab-stat">
            <strong>10</strong>
            <span>student researchers</span>
            <strong>3</strong>
            <span>active research pilots</span>
          </div>
          <a href="#publications" className="r-text-link">
            See manuscripts and status <span aria-hidden="true">↑</span>
          </a>
        </article>
      </div>
    </section>
  );
}

function Playground({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    dialog.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="r-playground-dialog"
      aria-label="Neural Breach playground"
      onCancel={onClose}
    >
      <NeuralBreach onClose={onClose} buttonPosition={{ x: 120, y: 150 }} />
    </dialog>
  );
}

export default function TechnicalPortfolio() {
  const reduced = useSyncExternalStore(subscribeReduced, reducedSnapshot, reducedServerSnapshot);
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [playground, setPlayground] = useState(false);
  const [paperFilter, setPaperFilter] = useState("All");
  const running = motionEnabled && !reduced;
  const { scrollYProgress, scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 110]);
  const pageProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });
  const navItems = [
    ["Research", "publications"],
    ["Projects", "projects"],
    ["Journey", "journey"],
    ["Toolkit", "toolkit"],
    ["About", "about"],
  ];
  const [active, setActive] = useState("intro");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-10% 0px -65% 0px", threshold: 0 },
    );
    document
      .querySelectorAll(".research-portfolio section[id]")
      .forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return (
    <div
      className="research-portfolio"
      data-motion={running ? "running" : "paused"}
    >
      <a className="r-skip" href="#publications">
        Skip to research
      </a>
      <div className="r-reviewbar">
        <span>Research portfolio / revision 02</span>
        <div>
          <Link href="/">
            Original site <Arrow />
          </Link>
          <Link href="/concepts/lens">
            Previous studies <Arrow />
          </Link>
        </div>
      </div>
      <header className="r-header">
        <a href="#intro" className="r-brand" aria-label="hei, back to top">
          hei<span>Le Nguyen Gia Hung</span>
        </a>
        <nav aria-label="Portfolio sections">
          {navItems.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="r-header-actions">
          <button
            type="button"
            className="r-motion-toggle"
            aria-label={motionEnabled ? 'Pause motion' : 'Enable motion'}
            aria-pressed={!motionEnabled}
            onClick={() => setMotionEnabled((value) => !value)}
          >
            {running ? "Ⅱ" : "▷"}
            <span>
              {running
                ? "Pause motion"
                : reduced
                  ? "Reduced motion"
                  : "Motion off"}
            </span>
          </button>
          <a
            className="r-header-cv"
            href="/HungLNG_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            CV <Arrow />
          </a>
        </div>
        <motion.div
          className="r-page-progress"
          style={{ scaleX: pageProgress }}
        />
      </header>
      <main>
        <section className="r-hero r-section" id="intro">
          <div className="r-hero-copy">
            <p className="r-context">
              <span className="r-status-dot" />
              Undergraduate AI researcher / FPT University
            </p>
            <h1>
              Le Nguyen
              <br />
              Gia Hung<span className="r-name-period">.</span>
            </h1>
            <p className="r-hero-role">
              AI research. Engineering. Explainability.
            </p>
            <p className="r-hero-description">
              I build and study AI systems for time series, speech and computer
              vision—with a particular interest in making their decisions
              understandable.
            </p>
            <div className="r-actions">
              <a className="r-button" href="#projects">
                Explore the work <span aria-hidden="true">↓</span>
              </a>
              <a
                className="r-text-link"
                href="/HungLNG_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                View CV <Arrow />
              </a>
            </div>
            <div className="r-hero-interests">
              <span>Explainable AI</span>
              <span>Multimodal learning</span>
              <span>Computer vision</span>
            </div>
            <p className="r-location">
              Ho Chi Minh City, Vietnam · Open to research &amp; AI/ML
              opportunities
            </p>
          </div>
          <motion.div
            className="r-hero-study"
            style={{ y: running ? heroY : 0 }}
          >
            <NetworkStudy running={running} />
            <div className="r-code-fragment">
              <span>A research approach</span>
              <code>
                observations → representation → prediction
                <br />
                <b>inspect</b> / attribution + counterfactuals / <i>evaluate</i>
              </code>
            </div>
          </motion.div>
          <div className="r-hero-foot">
            <span>Scroll to unpack the work</span>
            <span className="r-scroll-line" aria-hidden="true" />
            <a href="#method">Input → model → explanation</a>
          </div>
        </section>
        <div className="r-research-summary">
          <a href="#publications">
            <strong>01</strong>
            <span>
              Published paper
              <br />
              <small>AJCAI 2025 / LNAI</small>
            </span>
          </a>
          <a href="#publications">
            <strong>03</strong>
            <span>
              Manuscripts under review
              <br />
              <small>Separate from published work</small>
            </span>
          </a>
          <a href="#projects">
            <strong>04</strong>
            <span>
              Technical projects
              <br />
              <small>Forecasting, speech &amp; vision</small>
            </span>
          </a>
          <a href="#journey">
            <strong>10</strong>
            <span>
              SpeedyLabX members
              <br />
              <small>Student research collective</small>
            </span>
          </a>
        </div>
        <ModelFlow running={running} />
        <section id="publications" className="r-publications r-section">
          <SectionTitle
            title="Research, with the details."
            subtitle="Authorship, publication status, and the questions each manuscript investigates."
          />
          <div
            className="r-filter"
            role="group"
            aria-label="Filter publications"
          >
            {["All", "Published", "Under review"].map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={paperFilter === item}
                onClick={() => setPaperFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="r-paper-list">
            {publicationRecords
              .filter(
                (item) => paperFilter === "All" || item.status === paperFilter,
              )
              .map((paper) => (
                <article key={paper.id} className="r-paper">
                  <div className="r-paper-meta">
                    <span
                      className={
                        paper.status === "Published"
                          ? "r-badge r-published"
                          : "r-badge"
                      }
                    >
                      {paper.status}
                    </span>
                    <span>{paper.venue}</span>
                  </div>
                  <div className="r-paper-content">
                    <h3>{paper.title}</h3>
                    <p className="r-paper-role">{paper.role}</p>
                    <p>{paper.note}</p>
                    <details>
                      <summary>Author information</summary>
                      <p>{paper.authors}</p>
                    </details>
                  </div>
                  <div className="r-paper-action">
                    <span>{paper.year}</span>
                    {paper.href ? (
                      <a
                        href={paper.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Read ${paper.title}`}
                      >
                        <Arrow />
                      </a>
                    ) : (
                      <span className="r-no-paper">Not public yet</span>
                    )}
                  </div>
                </article>
              ))}
          </div>
          <div className="r-academic-links">
            {academicLinks.map(([name, href]) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {name}
                <Arrow />
              </a>
            ))}
          </div>
        </section>
        <ProjectCollection running={running} />
        <ResearchJourney running={running} />
        <section id="toolkit" className="r-toolkit r-section">
          <SectionTitle
            title="From experiment to implementation."
            subtitle="The tools I use to build, evaluate and communicate the work."
          />
          <div className="r-toolkit-grid">
            {skillGroups.map((group, index) => (
              <div key={group.title} className="r-skill-group">
                <span className="r-tool-symbol" aria-hidden="true">
                  {["ƒ(x)", "</>", "[↗]"][index]}
                </span>
                <h3>{group.title}</h3>
                <div className="r-tags">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="r-education">
            <div>
              <span className="r-context">Education / 2023–2027</span>
              <h3>B.Eng. in Artificial Intelligence</h3>
              <p>
                FPT University · Ho Chi Minh City
                <br />
                Expected graduation: December 2027
              </p>
              <p>Certificate of Merit — Semesters 3, 4, 5 &amp; 6</p>
              <p className="r-coursework">
                Data structures &amp; algorithms · Linear algebra · Deep
                learning · Statistical analysis
              </p>
            </div>
            <div className="r-gpa">
              <strong>
                8.62<span>/10</span>
              </strong>
              <p>GPA</p>
            </div>
          </div>
          <details className="r-certifications">
            <summary>
              Specializations &amp; certifications{" "}
              <span>
                {certificationRecords.length} programs{" "}
                <span aria-hidden="true">＋</span>
              </span>
            </summary>
            <div>
              {certificationRecords.map(([title, provider]) => (
                <p key={title}>
                  <strong>{title}</strong>
                  <span>{provider}</span>
                </p>
              ))}
            </div>
          </details>
        </section>
        <section id="about" className="r-about r-section">
          <div className="r-about-image">
            <Image
              src="/profile.jpg"
              alt="Le Nguyen Gia Hung, also known as hei"
              fill
              sizes="(max-width:760px) 90vw, 35vw"
            />
            <span>hi, I’m hei.</span>
          </div>
          <div className="r-about-copy">
            <p className="r-context">A little context beyond the models</p>
            <h2>
              Curious by default.
              <br />
              Usually in motion.
            </h2>
            <p>
              I’m an undergraduate researcher interested in AI that people can
              understand and challenge. That’s what draws me to
              explainability—and to the problem-solving behind computer vision.
            </p>
            <p>
              Outside the lab: running, gym sessions, trail routes and
              photography. I like urban tropical spaces, a little greenery, and
              music that fits the task.
            </p>
            <div className="r-tags">
              <span>Running &amp; trails</span>
              <span>Photography</span>
              <span>Urban tropical</span>
            </div>
            <div className="r-canopy-strip">
              <Image
                src="/images/concepts/blue-courtyard.webp"
                alt="Generated study of a blue tropical courtyard"
                fill
                sizes="(max-width:760px) 85vw, 48vw"
              />
              <span>Blue canopy / generated atmosphere study</span>
            </div>
          </div>
        </section>
        <section className="r-writing r-section" id="writing">
          <div>
            <span className="r-context">Writing &amp; experiments</span>
            <h2>Learning out loud.</h2>
            <p>
              Notes from entering AI, figuring things out, and asking better
              questions.
            </p>
          </div>
          <div className="r-writing-links">
            <Link href="/blog/my-first-encounter-to-the-world-of-ai">
              My First Encounter with AI:
              <br />
              From Curiosity to Clarity <Arrow />
            </Link>
            <Link href="/blog">
              All writing <Arrow />
            </Link>
            <button type="button" onClick={() => setPlayground(true)}>
              A small detour: Neural Breach <span aria-hidden="true">↗</span>
              <small>Launch the original interactive playground</small>
            </button>
          </div>
        </section>
        <section className="r-contact r-section" id="contact">
          <p className="r-context">
            Research collaborations / internships / AI engineering
          </p>
          <h2>
            Have a question
            <br />
            worth working on?
          </h2>
          <a href="mailto:heiontheway@gmail.com" className="r-contact-email">
            heiontheway@gmail.com <Arrow />
          </a>
          <div className="r-contact-bottom">
            <span>
              Le Nguyen Gia Hung
              <br />
              <small>AI researcher &amp; engineer · Ho Chi Minh City</small>
            </span>
            <div>
              <a
                href="https://github.com/hei1sme/"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <Arrow />
              </a>
              <a
                href="https://linkedin.com/in/le-nguyen-gia-hung/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <Arrow />
              </a>
              <a
                href="/HungLNG_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                CV <Arrow />
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="r-footer">
        <span>hei / Always a work in progress.</span>
        <a href="#intro">Back to top ↑</a>
      </footer>
      {playground && <Playground onClose={() => setPlayground(false)} />}
    </div>
  );
}
