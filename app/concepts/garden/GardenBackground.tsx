import Icon from "../../components/portfolio/Icon";
import Image from "next/image";
import { certificationRecords } from "../research/portfolioData";
import GardenToolkit from "./GardenToolkit";

// Server-rendered background: depth stays available without shipping another
// client-side data/UI bundle or turning the opening into a long biography.
export default function GardenBackground() {
  return (
    <div className="garden-background">
      <section id="garden-journey" className="garden-journey" aria-labelledby="garden-journey-title">
        <div className="garden-journey-heading"><h2 id="garden-journey-title">Research,<br />so far.</h2><p>SpeedyLabX, the first paper<br />and the work that followed.</p></div>
        <div className="garden-journey-spread">
          <figure className="garden-lab-art"><div className="garden-lab-image"><Image src="/images/experience/1_SpeedyLabX/1_1_slx.png" alt="SpeedyLabX wordmark" fill sizes="(max-width: 900px) 90vw, 50vw" /></div><figcaption>SpeedyLabX · FPT University</figcaption></figure>
          <ol className="garden-milestones">
            <li><span>January 2025</span><h3>Starting SpeedyLabX.</h3><p>Founded SpeedyLabX, a 10-member undergraduate research group. Weekly technical workshops, paper reading and shared submission workflows.</p></li>
            <li><span>December 2025 · AJCAI 2025</span><h3>The first paper.</h3><p>SmokeNet became the foundation for the environmental forecasting research that followed.</p><a href="#garden-published-paper">Publication & contribution <Icon name="external" /></a></li>
            <li><span>2026 · FCAJ program</span><h3>Learning cloud infrastructure.</h3><p>FCAJ Cloud Intern with Team NeuraX in the First Cloud AI Journey program at AWS Vietnam. I keep a journal of the workshops and project work.</p><a href="https://hei1sme.github.io/hei-FCAJ-intership-report/" target="_blank" rel="noreferrer">Read the cloud journal <Icon name="external" /></a></li>
            <li><span>2026 · Under review</span><h3>Environmental forecasting.</h3><p>Cyanobacterial bloom forecasting and health-centred air-quality alerts, submitted to AJCAI 2026.</p></li>
            <li><span>Under review · KDD 2027</span><h3>Anomaly detection and XAI.</h3><p>Co-authored work on multimodal anomaly detection, conformal calibration and counterfactual attribution.</p></li>
          </ol>
        </div>
        <p className="garden-research-context">Across SpeedyLabX: 3 research pilots and 4 manuscripts. <a href="https://github.com/SpeedyLabX" target="_blank" rel="noreferrer">Explore the lab on GitHub <Icon name="external" /></a></p>
      </section>
      <section className="garden-background-details" id="garden-background" aria-label="Education and technical background">
        <section className="garden-education" id="garden-education" aria-labelledby="garden-education-title">
          <h2 id="garden-education-title">Education</h2>
          <div className="garden-background-content">
            <div>
              <h3>FPT University</h3>
              <p>B.Eng. in Artificial Intelligence<br />Ho Chi Minh City, Vietnam<br />2023–2027 · Expected graduation: December 2027</p>
              <div className="garden-cv-links" aria-label="CV and resume downloads">
                <a className="garden-degree-cv" href="/HungLNG_Resume.pdf" target="_blank" rel="noreferrer">Research CV · 2 pages <Icon name="external" /></a>
                <a className="garden-degree-cv" href="/HungLNG_Resume_AI_ML.pdf" target="_blank" rel="noreferrer">AI/ML résumé · 1 page <Icon name="external" /></a>
              </div>
              <details className="garden-print-downloads">
                <summary>Print editions · A4 <Icon name="down" size={16} /></summary>
                <div className="garden-print-links">
                  <a className="garden-degree-cv" href="/HungLNG_Resume_Print.pdf" target="_blank" rel="noreferrer">Research CV · print <Icon name="external" size={18} /></a>
                  <a className="garden-degree-cv" href="/HungLNG_Resume_AI_ML_Print.pdf" target="_blank" rel="noreferrer">AI/ML résumé · print <Icon name="external" size={18} /></a>
                </div>
              </details>
            </div>
            <div>
              <p className="garden-education-result"><strong>8.62 / 10</strong> GPA<br />Certificate of Merit · Semesters 3, 4, 5 & 6</p>
              <details className="garden-certification-detail"><summary>{certificationRecords.length} specializations & certifications <span aria-hidden="true">+</span></summary><ul className="garden-certifications">{certificationRecords.map(([title, provider]) => <li key={title}><span>{title}</span><span>{provider}</span></li>)}</ul></details>
            </div>
          </div>
        </section>
      </section>
      <GardenToolkit />
    </div>
  );
}
