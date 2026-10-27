# Le Nguyen Gia Hung

AI undergraduate researcher | Explainable AI & multimodal learning

Research interests: time-series forecasting, transparency in AI and computer vision.

heiontheway@gmail.com | +84 394 262 651 | Ho Chi Minh City, Vietnam

[linkedin.com/in/le-nguyen-gia-hung](https://linkedin.com/in/le-nguyen-gia-hung) ·
[github.com/hei1sme](https://github.com/hei1sme) ·
[hei-portfolio.vercel.app](https://hei-portfolio.vercel.app) ·
[ORCID: 0009-0003-7120-8167](https://orcid.org/0009-0003-7120-8167) ·
[Google Scholar: iGODAQYAAAAJ](https://scholar.google.com/citations?user=iGODAQYAAAAJ)

## Education

**FPT University**, Ho Chi Minh City, Vietnam
B.Eng. in Artificial Intelligence | 2023–December 2027 (expected) | GPA: 8.62/10.0

- Certificate of Merit: Honorable Student of Trimester, semesters 3, 4, 5 and 6.

## Publications & manuscripts

### Peer-reviewed conference publication

- **Gia-Hung Nguyen Le**, Gia-Bao Pham Hoang, Tan-Phat Vo, Thu Le and Nhu Nguyen.
  “Proactive Air Quality Forecasting and
  Health Alert System for Melbourne.” AJCAI 2025, Springer LNAI.
  First and corresponding author.
  [DOI: 10.1007/978-981-95-4969-6_34](https://doi.org/10.1007/978-981-95-4969-6_34).

### Manuscripts under review

- “Stress-Testing Multi-Source Cyanobacterial Bloom Forecasting under Sparse
  Monitoring.” Under review, AJCAI 2026. First and corresponding author.
- “Warning Before the Evening Peak: Health-Centred Air Quality Alerts in New
  Zealand and Australia.” Under review, AJCAI 2026. Second author.
- “Trustworthy Multimodal Anomaly Detection in Time Series with Conformal
  Calibration and Counterfactual Attribution.” Under review, ACM SIGKDD 2027.
  Second author.

## Selected research experience

### SmokeNet: Air Quality Forecasting

Academic research | First & Corresponding Author | June–November 2025
Published at AJCAI 2025

- Designed a Transformer with seasonal embeddings and reconstruction loss to
  forecast Melbourne's PM2.5; built chronological evaluation on 4+ years of
  OpenWeather data.
- Reported MAE 0.7470, R² 0.9545 and 35.9% lower MAE than XGBoost on the 2024
  held-out evaluation.
- Evaluated the May 2024 smoke event separately: 57.7% lower MAE than the baseline
  in that backtest.
- Inspected forecasts with SHAP, Integrated Gradients and DiCE.

### Cyanobacterial Bloom Forecasting

Academic research | First & Corresponding Author | January 2026–Present
AJCAI 2026 under review

- Built a causal weekly benchmark across 7 New Zealand lakes: n=5,432, with an
  untouched 2023–2024 holdout (n=170).
- 7-day Chl-a history XGBoost reached weighted F1
  0.791 (+0.103 over full fusion, p=0.016); 14-day full fusion reached 0.703.
- Led manuscript writing and the 8-gate provenance audit: 22 apparent episode
  starts reduced to 3 eligible incidents.

### Health-Centred Air Quality Alerts (NZ & Australia)

Academic research | Second Author | January 2026–Present
AJCAI 2026 under review

- Evaluated exposure coverage across Canterbury's 10-year (n=620,057) and
  Melbourne's 4-year (n=823,009) hourly records.
- Reported that daily-mean triggers overstate exposure protection by 7.7–18.6
  points; 42% of exposure occurred on sub-threshold daily-mean days.
- Built an archived weather-forecast panel model: 1-day-ahead MAE 3.19 µg/m³,
  R² 0.54.

### Trustworthy Multimodal Anomaly Detection

Academic research | Second Author | January 2026–Present
ACM SIGKDD 2027 under review

- Audited look-ahead text leakage across 9 domains: a reported 4.52% error
  reduction from naive text fusion reversed under embargo (leakage fraction 1.50).
- Developed C-DLE with split-conformal calibration and Mondrian pools for
  false-alarm control under missing modalities.
- Designed cross-modal counterfactual attribution; reported 94.3% accuracy against
  ground-truth anomalies with a 10% coreset.

### MERR-GAT: Multimodal Emotion Recognition

Academic research | Second & Corresponding Author | October 2025–Present
In progress

- Develop emotion recognition from speech and text, using WavLM + Compact
  Conformer, BERT/RoBERTa and dual-channel graph-attention fusion.
- Inspect modality contributions with attention plots, SHAP and
  Integrated Gradients; attention alone is not a causal explanation.
- Evaluation is in progress on IEMOCAP, RAVDESS and MELD, using WA, UA and Macro-F1.

### Vietnamese Speech Recognition

Academic research | Co-Researcher & Co-Author | September 2025–Present
In progress

- Develop a 5.4M-parameter Vietnamese ASR model with a 4-layer CNN, 3-layer
  residual BiLSTM and CTC training on 745 hours of speech.
- Reported WER 33.09% and CER 15.28%; compare against PhoWhisper to study the
  trade-off between accuracy and model size.
  [Evaluation notes](https://hei-portfolio.vercel.app/projects/vietnamese-asr).

### PPE Detection (YOLOv8)

Course project | Developer

- Built 9-class detection, safe/unsafe compliance logic and a Streamlit webcam
  interface with violation reporting.

## Leadership & cloud learning

### SpeedyLabX Student Research Group, FPT University

Founder & Student Lead | January 2025–Present

- Lead a 10-member undergraduate group, with weekly technical workshops, paper
  reading and shared conference-submission workflows; research spans 3 pilots
  and 4 manuscripts.

### First Cloud AI Journey Program

FCAJ Cloud Intern, Team NeuraX | AWS Vietnam program | 2026

- Documented cloud learning, workshops and project work in the
  [program journal](https://hei1sme.github.io/hei-FCAJ-intership-report/).

## Skills

- Programming: Python, SQL/PostgreSQL; TypeScript, React, FastAPI.
- ML & evaluation: PyTorch, Transformers, TensorFlow/Keras, Scikit-learn, OpenCV;
  SHAP, Integrated Gradients, DiCE, chronological cross-validation.
- Data & tools: Pandas, NumPy, Matplotlib, Weights & Biases, Jupyter, Git, Docker,
  Linux, Streamlit. Technical writing: manuscripts, documentation and blog posts.

## Certifications

- Natural Language Processing — DeepLearning.AI.
- Gradient to Production: MLOps & Model Serving — Coursera.
- Full Stack Software Developer — IBM.
- Data Science Fundamentals with Python and SQL — IBM.
- Statistics for Data Science with Python — IBM.
- Introduction to Containers with Docker, Kubernetes & OpenShift — IBM.
- AI Engineer Professional — Packt.
