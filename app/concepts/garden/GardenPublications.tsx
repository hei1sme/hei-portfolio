import Icon from "../../components/portfolio/Icon";
import Image from "next/image";
import Link from "next/link";
import { publicationRecords } from "../research/portfolioData";

export default function GardenPublications() {
  const published = publicationRecords.find(paper => paper.id === "smokenet")!;
  const manuscripts = publicationRecords.filter(paper => paper.status === "Under review");

  return (
    <section className="garden-research" id="garden-publications" aria-labelledby="garden-research-title">
      <div className="garden-research-heading">
        <h2 id="garden-research-title">Research &<br />publications.</h2>
        <div><p>Forecasting, conformal calibration<br />and explanations we can inspect.</p><a href="https://scholar.google.com/citations?user=iGODAQYAAAAJ&hl=en" target="_blank" rel="noreferrer">Google Scholar <Icon name="external" /></a></div>
      </div>
      <article className="garden-published-paper" id="garden-published-paper" aria-labelledby="garden-paper-title">
        <div className="garden-paper-content">
          <p className="garden-paper-venue"><span className="garden-published-status">Published</span>{published.venue}</p>
          <h3 id="garden-paper-title">{published.title}</h3>
          <p className="garden-paper-role">{published.role}</p>
          <p className="garden-paper-authors"><strong>{published.authors.split(", ")[0]}</strong>, {published.authors.split(", ").slice(1).join(", ")}</p>
          <p className="garden-paper-evaluation"><strong>48 hours of history. A forecast for the next day.</strong> Melbourne PM₂.₅ modelling, chronological evaluation and explanations of individual predictions.</p>
          <div className="garden-paper-actions"><a href={published.href} target="_blank" rel="noreferrer">Read published paper <Icon name="external" /></a><Link href="/projects/smokenet-air-quality">Methods & results <Icon name="external" /></Link><a href="https://github.com/SpeedyLabX/melbourne-air-quality-forecast" target="_blank" rel="noreferrer">Research code <Icon name="external" /></a></div>
          <p className="garden-paper-contribution">I designed the model and chronological evaluation pipeline, then used attribution and counterfactual analysis to inspect its forecasts.</p>
          <p className="garden-paper-methods">PyTorch · Seasonal embeddings · SHAP · Integrated Gradients · DiCE</p>
        </div>
        <figure className="garden-paper-figure">
          <a href="/images/project/SmokeNet_architecture.jpeg" target="_blank" rel="noreferrer" aria-label="Open SmokeNet architecture figure at full size">
            <Image src="/images/project/SmokeNet_architecture.jpeg" alt="SmokeNet architecture: environmental data, preprocessing, transformer forecast and interpretable health alerts" width={4000} height={1896} sizes="(max-width: 900px) 90vw, 46vw" />
            <span>Inspect the architecture <Icon name="external" /></span>
          </a>
          <figcaption><strong>SmokeNet</strong><span>From environmental observations<br />to interpretable air-quality alerts.</span></figcaption>
        </figure>
      </article>
      <div className="garden-manuscripts">
        <div className="garden-manuscripts-heading"><h3>Manuscripts under review</h3><p>{manuscripts.length} manuscripts · Decisions pending</p></div>
        <ol>{manuscripts.map(paper => <li key={paper.id}>
          <div className="garden-manuscript-status"><span>Under review</span><p>{paper.venue}</p></div>
          <div><h4>{paper.title}</h4><p className="portfolio-manuscript-authors">{paper.authors.split(", ").map((author, i) => <span key={author}>{i ? ", " : ""}{author === "Gia-Hung Nguyen Le" || author === "Le Nguyen Gia Hung" ? <strong>{author}</strong> : author}</span>)}</p><p className="portfolio-manuscript-note">{paper.note}</p>{paper.source ? <a className="portfolio-manuscript-source" href={paper.source} target="_blank" rel="noreferrer">Benchmark code <Icon name="external" size={16} /></a> : null}</div>
          <p className="garden-manuscript-role">{paper.role}</p>
        </li>)}</ol>
      </div>
    </section>
  );
}
