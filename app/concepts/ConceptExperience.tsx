"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type Concept = "courtyard" | "lens" | "trail";
const directions: { id: Concept; name: string }[] = [
  { id: "courtyard", name: "Blue Courtyard" },
  { id: "lens", name: "Field of View" },
  { id: "trail", name: "Trail of Questions" },
];
const paperUrl =
  "https://link.springer.com/chapter/10.1007/978-981-95-4969-6_34";
const courtyard = "/images/concepts/blue-courtyard.webp";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
function Mark() {
  return (
    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <path
        d="M7 33V11M7 23c0-10 13-10 13 0v10M29 18v15M29 10v1"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="m36 12 2-3 2 3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function Sprout({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M61 111C66 76 58 42 31 18M60 81c20-37 39-44 51-49"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M50 53C16 60 3 38 8 17c26-6 44 6 42 36Zm14 25c-2-28 18-43 44-41 4 24-14 45-44 41Z"
        fill="currentColor"
      />
      <path d="M38 94C9 101-3 83 2 66c24-5 36 5 36 28Z" fill="currentColor" />
    </svg>
  );
}
function ConceptBar({ concept }: { concept: Concept }) {
  return (
    <aside className="concept-switcher" aria-label="Design explorations">
      <Link className="back-original" href="/">
        Original site <Arrow />
      </Link>
      <nav aria-label="Choose a concept">
        {directions.map((direction, index) => (
          <Link
            key={direction.id}
            href={`/concepts/${direction.id}`}
            aria-current={concept === direction.id ? "page" : undefined}
          >
            <span className="concept-number">0{index + 1}</span>{" "}
            {direction.name}
          </Link>
        ))}
      </nav>
      <span className="exploration-label">Design explorations</span>
    </aside>
  );
}
function Navigation() {
  return (
    <header className="concept-nav">
      <a href="#intro" className="hei-logo" aria-label="hei, back to top">
        <Mark />
        <span>Le Nguyen Gia Hung</span>
      </a>
      <nav aria-label="Portfolio">
        <a href="#research">Research</a>
        <a href="#outside">Outside the lab</a>
        <a className="nav-contact" href="mailto:heiontheway@gmail.com">
          Say hello <Arrow />
        </a>
      </nav>
    </header>
  );
}
function CourtyardHero() {
  return (
    <section
      className="courtyard-hero"
      id="intro"
      aria-labelledby="courtyard-heading"
    >
      <div className="courtyard-copy">
        <p className="intro-role">AI researcher. Curious human.</p>
        <h1 id="courtyard-heading">
          A clearer view
          <br />
          of intelligent
          <br />
          things.
        </h1>
        <div className="courtyard-bottom">
          <p>
            I’m Hung. I study how AI makes decisions, and how we can make them
            understandable.
          </p>
          <a
            className="round-link"
            href="#research"
            aria-label="Explore my research"
          >
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <figure className="courtyard-window">
        <div className="courtyard-image">
          <Image
            src={courtyard}
            alt="An imagined blue architectural courtyard opening onto tropical foliage"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 52vw"
          />
        </div>
        <div className="window-note">
          <span>Room for a little curiosity.</span>
          <Sprout />
        </div>
        <figcaption>Courtyard study · generated concept image</figcaption>
      </figure>
      <span className="hero-side-note">
        Research with a human point of view.
      </span>
    </section>
  );
}
function LensHero() {
  const [mode, setMode] = useState<"whole" | "closer">("whole");
  return (
    <section className="lens-hero" id="intro" aria-labelledby="lens-heading">
      <div className="lens-title">
        <p className="intro-role">Le Nguyen Gia Hung / AI researcher</p>
        <h1 id="lens-heading">
          Look closer.
          <br />
          Understand more.
        </h1>
      </div>
      <div className={`lens-scene ${mode === "closer" ? "lens-is-close" : ""}`}>
        <div className="lens-scene-photo">
          <Image
            src={courtyard}
            alt="Tropical leaves and blue architecture, an illustrative study in light and observation"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="lens-overlay" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <span>Observation begins here</span>
        </div>
        <div className="lens-scene-caption">
          <span>Light. Leaves. A different perspective.</span>
          <span>Generated image study</span>
        </div>
        <div className="lens-switch" role="group" aria-label="Image framing">
          <button
            type="button"
            aria-pressed={mode === "whole"}
            onClick={() => setMode("whole")}
          >
            The whole picture
          </button>
          <button
            type="button"
            aria-pressed={mode === "closer"}
            onClick={() => setMode("closer")}
          >
            A closer look <span aria-hidden="true">＋</span>
          </button>
        </div>
      </div>
      <div className="lens-intro">
        <span className="small-flower" aria-hidden="true">
          ✳
        </span>
        <p>
          From a photograph to a model’s prediction,
          <br />
          I’m interested in what we can learn by looking closer.
        </p>
        <a href="#research">
          Explore the research <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
function TrailHero() {
  return (
    <section className="trail-hero" id="intro" aria-labelledby="trail-heading">
      <div className="trail-title">
        <p className="intro-role">Curiosity rarely takes a straight line.</p>
        <h1 id="trail-heading">
          Follow the
          <br />
          next question.
        </h1>
        <p className="trail-description">
          I’m Hung, an AI researcher drawn to explainable
          <br className="desktop-break" /> systems, open questions, and the
          occasional trail.
        </p>
        <a className="solid-link" href="#research">
          Start exploring <span aria-hidden="true">↓</span>
        </a>
      </div>
      <div className="trail-collage">
        <figure className="trail-botanical">
          <Image
            src={courtyard}
            alt="Light and foliage in an imagined tropical courtyard"
            fill
            priority
            sizes="(max-width: 760px) 90vw, 43vw"
          />
          <figcaption>Always looking around.</figcaption>
        </figure>
        <figure className="trail-portrait">
          <Image
            src="/profile.jpg"
            alt="Le Nguyen Gia Hung"
            fill
            priority
            sizes="220px"
          />
          <figcaption>hi, I’m hei.</figcaption>
        </figure>
        <span className="trail-sticker">
          <Sprout />
          Stay curious.
        </span>
      </div>
      <svg
        className="trail-path"
        viewBox="0 0 1400 650"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M-40 570C160 360 260 680 485 520S610 100 835 240s300 370 610 160" />
      </svg>
      <span className="trail-photo-credit">
        Courtyard: generated concept image
      </span>
    </section>
  );
}
const explanations = [
  {
    label: "The question",
    title: "Can we see a bad air day coming?",
    copy: "SmokeNet investigates PM2.5 forecasting for Melbourne, connecting time-series modelling with health-oriented alerts.",
  },
  {
    label: "The system",
    title: "Forecast, then ask why.",
    copy: "A transformer-based forecasting pipeline pairs predictions with SHAP, Integrated Gradients and counterfactual analysis.",
  },
  {
    label: "The evidence",
    title: "Make the evaluation visible.",
    copy: "The case study reports a chronological evaluation and comparisons with baseline models. The paper contains the methods and results.",
  },
];
function ResearchSection() {
  const [selected, setSelected] = useState(0);
  return (
    <section
      className="research-section"
      id="research"
      aria-labelledby="research-heading"
    >
      <div className="section-heading">
        <p>Selected research</p>
        <span>Building systems we can question.</span>
      </div>
      <div className="research-layout">
        <div className="research-copy">
          <p className="publication-status">Published · AJCAI 2025</p>
          <h2 id="research-heading">
            A forecast is useful.
            <br />
            An explanation
            <br />
            goes further.
          </h2>
          <p className="research-summary">
            SmokeNet explores proactive air-quality forecasting and health
            alerts for Melbourne—with interpretability at the heart of the
            system.
          </p>
          <p className="authorship">
            First &amp; corresponding author
            <br />
            Le Nguyen Gia Hung
          </p>
          <div className="research-links">
            <Link className="solid-link" href="/projects/smokenet-air-quality">
              Explore SmokeNet <Arrow />
            </Link>
            <a href={paperUrl} target="_blank" rel="noopener noreferrer">
              Read the paper <Arrow />
            </a>
          </div>
        </div>
        <div className="research-artifact">
          <div className="artifact-heading">
            <span>Inside SmokeNet</span>
            <span>Model architecture</span>
          </div>
          <div className="architecture-image">
            <Image
              src="/images/project/SmokeNet_architecture.jpeg"
              alt="SmokeNet architecture diagram showing the forecasting pipeline"
              fill
              sizes="(max-width: 760px) 90vw, 45vw"
            />
          </div>
          <div
            className="research-tabs"
            role="tablist"
            aria-label="Explore SmokeNet"
          >
            {explanations.map((item, index) => (
              <button
                key={item.label}
                type="button"
                role="tab"
                id={`research-tab-${index}`}
                aria-controls={`research-panel-${index}`}
                aria-selected={selected === index}
                tabIndex={selected === index ? 0 : -1}
                onClick={() => setSelected(index)}
                onKeyDown={(event) => {
                  const next =
                    event.key === "ArrowRight"
                      ? (index + 1) % 3
                      : event.key === "ArrowLeft"
                        ? (index + 2) % 3
                        : event.key === "Home"
                          ? 0
                          : event.key === "End"
                            ? 2
                            : -1;
                  if (next >= 0) {
                    event.preventDefault();
                    setSelected(next);
                    document.getElementById(`research-tab-${next}`)?.focus();
                  }
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          {explanations.map((item, index) => (
            <div
              key={item.label}
              className="research-panel"
              id={`research-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`research-tab-${index}`}
              hidden={selected !== index}
              tabIndex={0}
            >
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="more-research">
        <span>Another question I’m exploring</span>
        <Link href="/projects/conformer-gat-ser">
          How can multimodal models explain emotion?
          <Arrow />
        </Link>
        <span>MERR-GAT · Research in progress</span>
      </div>
    </section>
  );
}
function OutsideSection() {
  return (
    <section
      className="outside-section"
      id="outside"
      aria-labelledby="outside-heading"
    >
      <div className="outside-portrait">
        <Image
          src="/profile.jpg"
          alt="Hung, also known as hei"
          fill
          sizes="(max-width: 760px) 80vw, 320px"
        />
        <span>Researcher, runner, curious human.</span>
      </div>
      <div className="outside-copy">
        <p>Outside the lab</p>
        <h2 id="outside-heading">
          Good questions
          <br />
          start with
          <br />
          looking around.
        </h2>
        <p>
          You’ll also find me running, in the gym, on a trail, or behind a
          camera. I like spaces with a little more green, and music that fits
          whatever I’m doing.
        </p>
        <div className="outside-interests">
          <span>Running &amp; trails</span>
          <span>Photography</span>
          <span>Urban tropical</span>
        </div>
        <Sprout className="outside-sprout" />
      </div>
    </section>
  );
}
export default function ConceptExperience({ concept }: { concept: Concept }) {
  const root = useRef<HTMLDivElement>(null);
  const [motionEnabled, setMotionEnabled] = useState(true);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const reset = () =>
      root.current?.style.setProperty("--scroll-shift", "0px");
    const update = () => {
      frame = 0;
      if (!media.matches && motionEnabled)
        root.current?.style.setProperty(
          "--scroll-shift",
          `${Math.min(window.scrollY * 0.09, 75)}px`,
        );
      else reset();
    };
    const onScroll = () => {
      if (!frame && !media.matches && motionEnabled)
        frame = requestAnimationFrame(update);
    };
    media.addEventListener("change", update);
    if (!media.matches && motionEnabled)
      window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      media.removeEventListener("change", update);
      cancelAnimationFrame(frame);
      reset();
    };
  }, [motionEnabled]);
  return (
    <div
      ref={root}
      className={`concept-page concept-${concept} ${motionEnabled ? "" : "motion-paused"}`}
    >
      <a className="concept-skip" href="#research">
        Skip to research
      </a>
      <ConceptBar concept={concept} />
      <Navigation />
      <main>
        {concept === "courtyard" ? (
          <CourtyardHero />
        ) : concept === "lens" ? (
          <LensHero />
        ) : (
          <TrailHero />
        )}
        <ResearchSection />
        <OutsideSection />
        <section className="contact-section" aria-labelledby="contact-heading">
          <Sprout />
          <p>Questions, ideas, or a good trail recommendation?</p>
          <h2 id="contact-heading">
            Let’s make
            <br />
            something clearer.
          </h2>
          <a className="contact-email" href="mailto:heiontheway@gmail.com">
            heiontheway@gmail.com <Arrow />
          </a>
          <div className="contact-links">
            <a
              href="/HungLNG_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV <Arrow />
            </a>
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
          </div>
        </section>
      </main>
      <footer className="concept-footer">
        <a href="#intro">
          hei <span aria-hidden="true">↑</span>
        </a>
        <span>Built around curiosity.</span>
        <button
          type="button"
          aria-pressed={!motionEnabled}
          onClick={() => setMotionEnabled((value) => !value)}
        >
          {motionEnabled ? "Pause motion" : "Enable motion"}
        </button>
      </footer>
    </div>
  );
}
