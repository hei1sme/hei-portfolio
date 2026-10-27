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
        <div><p>Explainable AI, environmental forecasting<br />and multimodal learning.</p><a href="https://scholar.google.com/citations?user=iGODAQYAAAAJ&hl=en" target="_blank" rel="noreferrer">Google Scholar <Icon name="external" /></a></div>
      </div>
      <article className="garden-published-paper" id="garden-published-paper" aria-labelledby="garden-paper-title">
        <div className="garden-paper-content">
          <p className="garden-paper-venue"><span className="garden-published-status">Published</span>{published.venue}</p>
          <h3 id="garden-paper-title">{published.title}</h3>
          <p className="garden-paper-role">{published.role}</p>
          <p className="garden-paper-authors"><strong>{published.authors.split(", ")[0]}</strong>, {published.authors.split(", ").slice(1).join(", ")}</p>
          <p className="garden-paper-evaluation"><strong>2024 held-out evaluation:</strong> MAE 0.7470, R² 0.9545; 35.9% lower MAE than XGBoost on the reported Melbourne data.</p>
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
        <div className="garden-manuscripts-heading"><h3>Manuscripts under review</h3><p>3 submissions · Decisions pending</p></div>
        <ol>{manuscripts.map(paper => <li key={paper.id}>
          <div className="garden-manuscript-status"><span>Under review</span><p>{paper.venue}</p></div>
          <div><h4>{paper.title}</h4></div>
          <p className="garden-manuscript-role">{paper.role}</p>
        </li>)}</ol>
      </div>
    </section>
  );
}
