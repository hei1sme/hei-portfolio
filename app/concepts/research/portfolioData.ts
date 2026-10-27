// Content transcribed from the original portfolio components and MDX.
// Evaluation numbers retain their original scope; they are not live measurements.
export const publicationRecords = [
  {
    id: "smokenet",
    year: 2025,
    status: "Published",
    venue: "AJCAI 2025 · Springer LNAI",
    title:
      "Proactive Air Quality Forecasting and Health Alert System for Melbourne",
    role: "First & corresponding author",
    authors:
      "Gia-Hung Nguyen Le, Gia-Bao Pham Hoang, Tan-Phat Vo, Thu Le, Nhu Nguyen",
    href: "https://doi.org/10.1007/978-981-95-4969-6_34",
    note: "Transformer-based PM₂.₅ forecasting with interpretable health alerts.",
  },
  {
    id: "bloom",
    year: 2027,
    status: "Under review",
    venue: "ACIIDS 2027",
    title:
      "Auditing Multi-Source Cyanobacterial Bloom Forecasts under Sparse Environmental Telemetry",
    role: "First & corresponding author",
    authors: "Gia-Hung Nguyen Le, Quoc-Viet Huynh, Thu Le",
    href: "",
    note: "A seven-lake audit of forecast timing, calibration and warning burden; no reliable fusion gain after correction.",
  },
  {
    id: "device-coverage",
    year: 2027,
    status: "Under review",
    venue: "AISTATS 2027",
    title: "Distribution-Free Coverage of Attack Classes on Devices Absent from Training",
    role: "First author",
    authors: "Gia-Hung Nguyen Le, Thu Le, Huynh Quoc Viet",
    href: "",
    source: "https://github.com/SpeedyLabX/iot-diad-device-held-out",
    note: "Class-conditional conformal prediction evaluated on devices absent from model training.",
  },
  {
    id: "evening",
    year: 2026,
    status: "Under review",
    venue: "AJCAI 2026",
    title:
      "Warning Before the Evening Peak: Health-Centred Air Quality Alerts in New Zealand and Australia",
    role: "Second author",
    authors: "Thu Le, Gia-Hung Nguyen Le, Hoang Pham Gia Bao, Huynh Quoc Viet",
    href: "",
    note: "Air-quality forecasting connected to health-centred alerting.",
  },
  {
    id: "anomaly",
    year: 2027,
    status: "Under review",
    venue: "ACM SIGKDD 2027",
    title:
      "Trustworthy Multimodal Anomaly Detection in Time Series with Conformal Calibration and Counterfactual Attribution",
    role: "Second author",
    authors: "Thu Le, Le Nguyen Gia Hung, Huynh Quoc Viet, Nguyen Hoai My, Trieu Vuong Nguyen",
    href: "",
    note: "Calibrated anomaly detection and counterfactual attribution.",
  },
];

export const projectRecords = [
  {
    id: "smokenet",
    name: "SmokeNet",
    category: "Research",
    status: "Published · AJCAI 2025",
    role: "Lead researcher · First & corresponding author",
    question: "How do we forecast poor air quality and explain the warning?",
    description:
      "A transformer forecasting pipeline for Melbourne’s PM₂.₅, pairing temporal modelling with interpretable health alerts.",
    image: "/images/project/SmokeNet_architecture.jpeg",
    stack: ["PyTorch", "Transformers", "SHAP", "Integrated Gradients", "DiCE"],
    metrics: [
      { value: "48 h", label: "Input history" },
      { value: "Next day", label: "Mean PM₂.₅ forecast" },
      { value: "2024", label: "Held-out test year" },
    ],
    contributions: [
      "Designed and implemented the transformer architecture with seasonal embeddings and reconstruction loss.",
      "Built a chronological evaluation pipeline on 4+ years of OpenWeather data.",
      "Integrated SHAP, Integrated Gradients and counterfactual analysis for interpretable alerts.",
    ],
    evaluation:
      "Chronological training and validation precede a held-out 2024 test year. The May 2024 smoke-event backtest is a separate evaluation. Numerical results are reported in the published paper.",
    limitation:
      "The original evaluation logs are not linked here, and a baseline-table consistency check is pending. Published metrics should be read with their protocol, not treated as an independently reproduced benchmark or evidence of deployment.",
    href: "/projects/smokenet-air-quality",
    paper: "https://doi.org/10.1007/978-981-95-4969-6_34",
    source: "https://github.com/SpeedyLabX/melbourne-air-quality-forecast",
  },
  {
    id: "merr",
    name: "MERR-GAT",
    category: "Research",
    status: "In progress",
    role: "Second & corresponding author",
    question:
      "Can a multimodal model make its emotion predictions more interpretable?",
    description:
      "WavLM and Compact Conformer audio features fused with BERT/RoBERTa text through dual-channel graph attention.",
    image: "/images/project/merr-conformer-architecture.svg",
    stack: ["WavLM", "Compact Conformer", "BERT / RoBERTa", "GAT", "PyTorch"],
    metrics: [
      { value: "Audio + text", label: "Multimodal inputs" },
      { value: "Conformer + GAT", label: "Audio encoding and fusion" },
      { value: "WA / UA / F1", label: "Planned evaluation metrics" },
    ],
    contributions: [
      "Develop WavLM and Compact Conformer audio encoding with BERT/RoBERTa text representations.",
      "Fuse intra- and inter-modal representations through dual-channel graph attention.",
      "Inspect predictions using attention visualization, SHAP and Integrated Gradients.",
    ],
    evaluation:
      "Repository benchmarks: IEMOCAP, RAVDESS and MELD; evaluation tracks WA, UA and Macro-F1. Work remains in progress; no final accuracy is claimed here.",
    limitation:
      "Attention patterns can be inspected, but attention alone should not be interpreted as a causal explanation.",
    href: "/projects/conformer-gat-ser",
    paper: "",
    source: "https://github.com/SpeedyLabX/ser-conformer-gat-xai",
  },
  {
    id: "asr",
    name: "Vietnamese ASR",
    category: "Research",
    status: "In progress",
    role: "Co-researcher / co-author",
    question:
      "What can a compact speech model do with a large Vietnamese corpus?",
    description:
      "A parameter-efficient end-to-end speech recognition model with a CNN frontend and residual BiLSTM encoder.",
    image: "",
    stack: ["CNN", "Residual BiLSTM", "CTC", "Python"],
    metrics: [
      { value: "5.4M", label: "Parameters" },
      { value: "745 h", label: "Speech corpus" },
      { value: "33.09%", label: "Reported WER" },
    ],
    contributions: [
      "Build a 4-layer CNN frontend and 3-layer residual BiLSTM encoder.",
      "Train on a 745-hour Vietnamese speech corpus with CTC loss.",
      "Compare against PhoWhisper to investigate the efficiency–accuracy trade-off.",
    ],
    evaluation:
      "Reported in the original portfolio: WER 33.09%, CER 15.28%. Full benchmark protocol is not published in this portfolio.",
    limitation:
      "These values should not be compared across corpora without matching test data and evaluation protocols.",
    href: "/projects/vietnamese-asr",
    paper: "",
    source: "",
  },
  {
    id: "ppe",
    name: "PPE Detection",
    category: "Computer Vision",
    status: "Completed · Course project",
    role: "Developer",
    question: "How can object detections become actionable safety checks?",
    description:
      "A YOLOv8 detection pipeline, compliance logic and Streamlit interface for personal protective equipment auditing.",
    image: "",
    stack: ["YOLOv8", "OpenCV", "Streamlit", "Python"],
    metrics: [
      { value: "9", label: "PPE classes" },
      { value: "Webcam", label: "Live input support" },
      { value: "Safe / unsafe", label: "Compliance logic" },
    ],
    contributions: [
      "Implement YOLOv8 detection for 9 PPE classes.",
      "Translate detections into safe/unsafe compliance classifications.",
      "Build a Streamlit webcam interface with violation reporting.",
    ],
    evaluation:
      "The portfolio documents the implemented workflow. No measured FPS, mAP or deployment scale is claimed.",
    limitation:
      "Reliability depends on camera conditions and training data; this is a course project, not a certified safety system.",
    href: "/projects/ppe-detection-system",
    paper: "",
    source: "",
  },
];

export type ResearchProject = (typeof projectRecords)[number] & { visualCaption?: string };
export const skillGroups = [
  {
    title: "Models & methods",
    items: [
      "PyTorch",
      "TensorFlow / Keras",
      "Transformers",
      "Hugging Face",
      "Scikit-learn",
      "OpenCV",
      "Explainable AI",
      "Time series",
    ],
  },
  {
    title: "Building & serving",
    items: [
      "Python",
      "SQL / PostgreSQL",
      "TypeScript",
      "React",
      "FastAPI",
      "Streamlit",
    ],
  },
  {
    title: "Data & experiments",
    items: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Weights & Biases",
      "Jupyter",
      "Git",
      "Docker",
      "Linux",
    ],
  },
];
export const certificationRecords = [
  ["Natural Language Processing", "DeepLearning.AI"],
  ["MLOps & Model Serving", "Coursera"],
  ["Full Stack Software Developer", "IBM"],
  ["AI Engineer Professional", "Packt"],
  ["Data Science & SQL", "IBM"],
  ["Statistics for Data Science with Python", "IBM"],
  ["Docker, Kubernetes & OpenShift", "IBM"],
];
export const academicLinks = [
  [
    "Google Scholar",
    "https://scholar.google.com/citations?user=iGODAQYAAAAJ&hl=en",
  ],
  ["ORCID", "https://orcid.org/0009-0003-7120-8167"],
  ["Scopus", "https://www.scopus.com/authid/detail.uri?authorId=60219530700"],
  [
    "Web of Science",
    "https://www.webofscience.com/wos/author/record/PCR-6096-2025",
  ],
];
