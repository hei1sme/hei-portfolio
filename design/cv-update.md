# CV source import and portfolio alignment

2026-10-27. The owner supplied `resume_havard_ver.tex.txt` from Overleaf to update
the CV and portfolio. The attachment is valid LaTeX despite its `.txt` suffix.

## Local files and build

- Working source: `docs/cv/resume_havard_ver.tex`.
- Unmodified attachment: `docs/cv/original/resume_havard_ver.tex.txt`.
- Previous website PDF and Markdown: `docs/cv/original/`, with
  `HungLNG_Resume-before-update` filenames.
- Review export: `output/pdf/HungLNG_Resume.pdf`.
- Published assets: `public/HungLNG_Resume.pdf` and `public/HungLNG_Resume.md`.

`docs/` and `output/` stay ignored. The source is available on the owner's machine,
not in the public Git repository. The build helper is tracked so future source
imports can use the same workflow. It uses Tectonic with shell execution disabled;
the local Windows compiler download has a pinned release and SHA-256 checksum.

The CV keeps the supplied template's Charter typeface, letter paper, one-inch
margins and two-page format. T1 font encoding selects the actual Charter faces
under Tectonic rather than falling back to Latin Modern. The PDF includes
selectable text and clickable profile, DOI and project links. Humanizer was used
for concise technical wording; reported results retain their evaluation scope.

## Content reconciliation

The website's previous PDF was more current than the supplied LaTeX in several
areas. It was retained as a source rather than overwritten with the older text.

- SmokeNet is the first publication and first research entry. Its 2024 held-out
  MAE improvement and May 2024 smoke-event backtest remain separate claims.
- Three manuscripts and their research entries come from the previous PDF:
  cyanobacterial bloom forecasting, health-centred air-quality alerts and
  trustworthy multimodal anomaly detection. Each remains explicitly under review.
  Their reported figures are CV claims, not newly verified experiment artifacts.
- MERR-GAT now uses WavLM + Compact Conformer, following the owner's explicit
  correction and the current portfolio. Evaluation remains in progress.
- Education includes merit semesters 3–6, matching the current portfolio.
- The FCAJ program is listed as a program, with the documented year 2026 and
  journal link. No completion date or employment at AWS is inferred.
- Seven certification/specialization records combine the current portfolio with
  the owner's IBM Statistics credential in the imported source. The homepage
  summary now derives its count from the records rather than a hardcoded number.
- The outdated public Markdown resume now follows the updated PDF, including
  publication status, architectures and qualifications. No Q2 conference ranking
  is inferred from a book-series label.

## Deferred clarification

FCAJ start/end dates and completion status remain unconfirmed. The PPE dates
conflict between the imported source (September–November 2025) and the project
MDX (September 2024). The CV omits PPE dates pending clarification. Existing case
dates were not silently changed. These questions are in
`notes/portfolio-backlog.md` alongside the deferred paper and demo artifacts.

## Verification

The updated PDF is checked as a two-page letter document, rendered page by page,
and inspected for clipping and readable hierarchy. Text extraction checks the
current architecture, publication status, metrics and certification. Website
checks cover the certification disclosure and CV links; deployment is verified
against the pushed commit and the public PDF checksum.
