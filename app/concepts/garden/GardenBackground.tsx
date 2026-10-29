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
            <li><span>January 2025</span><h3>Starting SpeedyLabX.</h3><p>Founded a 10-member undergraduate group for shared research, paper reading and technical workshops.</p></li>
            <li><span>December 2025 · AJCAI 2025</span><h3>The first paper.</h3><p>SmokeNet became the foundation for the environmental forecasting research that followed.</p><a href="#garden-published-paper">Publication & contribution <Icon name="external" /></a></li>
            <li><span>January–May 2026 · Certified OJT</span><h3>AI workflows at FCAJ.</h3><p>Took research into application workflows with Team NeuraX during certified OJT.</p><a href="#garden-experience">Experience & implementation <Icon name="external" /></a></li>
            <li><span>July 2026 · VAIC</span><h3>Listening to the forest.</h3><p>Built BioListen VN with Team NeuraX.ai; placed 6th in Round 1.</p></li>
            <li><span>Current research · Under review</span><h3>Questions of trust.</h3><p>Four manuscripts under review explore forecasting, device-held-out coverage and trustworthy anomaly detection.</p><a href="#garden-publications">Titles, authors & status <Icon name="external" /></a></li>
          </ol>
        </div>
        <p className="garden-research-context"><a href="https://github.com/SpeedyLabX" target="_blank" rel="noreferrer">More from SpeedyLabX on GitHub <Icon name="external" /></a></p>
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
