import Image from "next/image";
import { certificationRecords } from "../research/portfolioData";
import GardenToolkit from "./GardenToolkit";

// Server-rendered background: depth stays available without shipping another
// client-side data/UI bundle or turning the opening into a long biography.
export default function GardenBackground() {
  return (
    <div className="garden-background">
      <section id="garden-journey" className="garden-journey" aria-labelledby="garden-journey-title">
        <div className="garden-journey-heading"><h2 id="garden-journey-title">It started with<br />a good question.</h2><p>From a student research group<br />to the first paper, and beyond.</p></div>
        <div className="garden-journey-spread">
          <figure className="garden-lab-art"><div className="garden-lab-image"><Image src="/images/experience/1_SpeedyLabX/1_1_slx.png" alt="SpeedyLabX wordmark" fill sizes="(max-width: 900px) 90vw, 50vw" /></div><figcaption>SpeedyLabX · FPT University</figcaption></figure>
          <ol className="garden-milestones">
            <li><span>January 2025</span><h3>A place to research together.</h3><p>Founded SpeedyLabX, a 10-member undergraduate research group. Weekly technical workshops, paper reading and shared submission workflows.</p></li>
            <li><span>December 2025 · AJCAI 2025</span><h3>The first paper.</h3><p>SmokeNet became the foundation for the environmental forecasting research that followed.</p><a href="#garden-published-paper">Publication & contribution <span aria-hidden="true">↗</span></a></li>
            <li><span>2026 · FCAJ program</span><h3>Learning beyond the model.</h3><p>FCAJ Cloud Intern with Team NeuraX in the First Cloud AI Journey program at AWS Vietnam. A journal of cloud learning, technical workshops and project work.</p><a href="https://hei1sme.github.io/hei-FCAJ-intership-report/" target="_blank" rel="noreferrer">Read the cloud journal <span aria-hidden="true">↗</span></a></li>
            <li><span>2026 · Under review</span><h3>Questions that keep growing.</h3><p>Cyanobacterial bloom forecasting and health-centred air-quality alerts, submitted to AJCAI 2026.</p></li>
            <li><span>Under review · KDD 2027</span><h3>Making predictions inspectable.</h3><p>Co-authored work on multimodal anomaly detection, conformal calibration and counterfactual attribution.</p></li>
          </ol>
        </div>
        <p className="garden-research-context">Across SpeedyLabX: 3 research pilots and 4 manuscripts. <a href="https://github.com/SpeedyLabX" target="_blank" rel="noreferrer">Explore the lab on GitHub <span aria-hidden="true">↗</span></a></p>
      </section>
      <section className="garden-background-details" id="garden-background" aria-label="Education and technical background">
        <section className="garden-education" id="garden-education" aria-labelledby="garden-education-title">
          <h2 id="garden-education-title">Education</h2>
          <div className="garden-background-content"><div><h3>FPT University</h3><p>B.Eng. in Artificial Intelligence<br />Ho Chi Minh City, Vietnam<br />2023–2027 · Expected graduation: December 2027</p><a className="garden-degree-cv" href="/HungLNG_Resume.pdf" target="_blank" rel="noreferrer">View the full CV <span aria-hidden="true">↗</span></a></div><div><p className="garden-education-result"><strong>8.62 / 10</strong> GPA<br />Certificate of Merit · Semesters 3, 4, 5 & 6</p><details className="garden-certification-detail"><summary>6 specializations & certifications <span aria-hidden="true">+</span></summary><ul className="garden-certifications">{certificationRecords.map(([title, provider]) => <li key={title}><span>{title}</span><span>{provider}</span></li>)}</ul></details></div></div>
        </section>
      </section>
      <GardenToolkit />
    </div>
  );
}
