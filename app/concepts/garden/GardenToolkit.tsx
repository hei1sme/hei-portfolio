"use client";

import Icon from "../../components/portfolio/Icon";

import { useState } from "react";
import Link from "next/link";
import type { IconType } from "react-icons";
import { SiPython, SiPostgresql, SiPandas, SiNumpy, SiPytorch, SiTensorflow, SiHuggingface, SiScikitlearn, SiOpencv, SiFastapi, SiStreamlit, SiTypescript, SiReact, SiDocker, SiGit, SiLinux, SiJupyter, SiWeightsandbiases } from "react-icons/si";

function MethodMark({ kind = "model" }: { kind?: string }) {
  return <svg viewBox="0 0 32 32" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{kind === "data" ? <><path d="M5 25h23M7 21l5-8 6 4 8-11" /><circle cx="12" cy="13" r="2" /><circle cx="18" cy="17" r="2" /></> : kind === "inspect" ? <><circle cx="14" cy="14" r="8" /><path d="m20 20 8 8M10 14h8m-4-4v8" /></> : <><rect x="4" y="6" width="9" height="9" rx="2" /><rect x="19" y="17" width="9" height="9" rx="2" /><path d="M13 10h10v7M9 15v7h10" /></>}</g></svg>;
}

type Tool = { name: string; Icon?: IconType; kind?: string };
const stages: { name: string; description: string; tools: Tool[] }[] = [
  { name: "Read the data", description: "Prepare and explore", tools: [
    { name: "Python", Icon: SiPython }, { name: "SQL / PostgreSQL", Icon: SiPostgresql },
    { name: "Pandas", Icon: SiPandas }, { name: "NumPy", Icon: SiNumpy }, { name: "Matplotlib", kind: "data" },
  ] },
  { name: "Build the model", description: "Represent and learn", tools: [
    { name: "PyTorch", Icon: SiPytorch }, { name: "TensorFlow / Keras", Icon: SiTensorflow },
    { name: "Transformers" }, { name: "Hugging Face", Icon: SiHuggingface },
    { name: "Scikit-learn", Icon: SiScikitlearn }, { name: "OpenCV", Icon: SiOpencv }, { name: "Time series", kind: "data" },
    { name: "Amazon Bedrock" },
  ] },
  { name: "Inspect the decision", description: "Evaluate and explain", tools: [
    { name: "Explainable AI", kind: "inspect" }, { name: "SHAP", kind: "inspect" },
    { name: "Integrated Gradients", kind: "inspect" }, { name: "DiCE", kind: "inspect" },
  ] },
  { name: "Make it usable", description: "Interfaces and serving", tools: [
    { name: "FastAPI", Icon: SiFastapi }, { name: "Streamlit", Icon: SiStreamlit },
    { name: "TypeScript", Icon: SiTypescript }, { name: "React", Icon: SiReact }, { name: "Docker", Icon: SiDocker },
    { name: "AWS Lambda" }, { name: "DynamoDB", kind: "data" }, { name: "AppSync" },
  ] },
];
const labTools: Tool[] = [{ name: "Git", Icon: SiGit }, { name: "Linux", Icon: SiLinux }, { name: "Jupyter", Icon: SiJupyter }, { name: "Weights & Biases", Icon: SiWeightsandbiases }];

const workflows = [
  { id: "smokenet", name: "SmokeNet", tools: ["Python", "PyTorch", "Transformers", "Time series", "Explainable AI", "SHAP", "Integrated Gradients", "DiCE"], steps: ["OpenWeather time series", "Seasonal Transformer", "SHAP / IG / DiCE", "Interpretable health alerts"], href: "/projects/smokenet-air-quality" },
  { id: "merr", name: "MERR-GAT", tools: ["Python", "PyTorch", "Transformers", "Explainable AI", "SHAP", "Integrated Gradients"], steps: ["Audio + text", "WavLM + Conformer / RoBERTa → GAT", "Attribution research", "Emotion recognition · In progress"], href: "/projects/conformer-gat-ser" },
  { id: "asr", name: "Vietnamese ASR", tools: ["Python"], steps: ["Vietnamese speech corpus", "CNN + residual BiLSTM", "WER / CER evaluation", "CTC speech recognition"], href: "/projects/vietnamese-asr" },
  { id: "ppe", name: "PPE Detection", tools: ["Python", "OpenCV", "Streamlit"], steps: ["Webcam images", "YOLOv8", "PPE compliance logic", "Streamlit reports"], href: "/projects/ppe-detection-system" },
  { id: "nutritrack", name: "NutriTrack", tools: ["Amazon Bedrock", "AWS Lambda", "DynamoDB", "AppSync", "TypeScript"], steps: ["DynamoDB user context", "Bedrock + Lambda", "Structured JSON responses", "AppSync app features"], href: "/projects/nutritrack-ai-workflows" },
];

function ToolLabel({ tool, active = false }: { tool: Tool; active?: boolean }) {
  const Icon = tool.Icon;
  return <li className="garden-tool-label" data-highlighted={active}><span className="garden-tool-symbol">{Icon ? <Icon aria-hidden="true" /> : <MethodMark kind={tool.kind} />}</span><span>{tool.name}</span>{active ? <span className="garden-tool-match" role="img" aria-label="Documented in selected project" /> : null}</li>;
}

export default function GardenToolkit() {
  const [selected, setSelected] = useState(0);
  const workflow = workflows[selected];
  return <section className="garden-visual-toolkit" id="garden-toolkit" aria-labelledby="garden-toolkit-title">
    <div className="garden-toolkit-heading"><h2 id="garden-toolkit-title">Tools I use.</h2><p>Choose a project to see which tools I used.</p></div>
    <div className="garden-workflow-choices" role="group" aria-label="Trace a project workflow">{workflows.map((item, index) => <button type="button" key={item.id} aria-pressed={selected === index} onClick={() => setSelected(index)}>{item.name}</button>)}</div>
    <div className="garden-workflow-map">
      <svg className="garden-workflow-path" viewBox="0 0 1000 80" preserveAspectRatio="none" aria-hidden="true" key={workflow.id}><path d="M125 40H875" fill="none" stroke="currentColor" strokeWidth="2" />{[125, 375, 625, 875].map(x => <circle cx={x} cy="40" r="7" fill="currentColor" key={x} />)}</svg>
      <ol className="garden-tool-stages">{stages.map(stage => <li key={stage.name}><h3>{stage.name}</h3><p>{stage.description}</p><ul>{stage.tools.map(tool => <ToolLabel tool={tool} active={workflow.tools.includes(tool.name)} key={tool.name} />)}</ul></li>)}</ol>
    </div>
    <div className="garden-workflow-proof" aria-live="polite" aria-atomic="true"><h3>{workflow.name}</h3><ol>{workflow.steps.map(step => <li key={step}>{step}</li>)}</ol>{workflow.href ? <Link href={workflow.href}>Read the case study <Icon name="external" /></Link> : <a href="#garden-overview-asr">View the ASR project <Icon name="external" /></a>}</div>
    <div className="garden-lab-tools"><h3>Across the lab workflow</h3><ul>{labTools.map(tool => <ToolLabel tool={tool} key={tool.name} />)}</ul><p>Blue marks show tools used in the selected project. The rest are part of my broader toolkit.</p></div>
  </section>;
}
