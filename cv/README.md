# CV sources

These are the current public sources, maintained from the owner's
Overleaf import. They contain the personal information already
present in the downloadable PDFs. Originals, unpublished papers and certificates
remain private in ignored `docs/` and `cv-inbox/`.

| Source | Digital export | Print export |
| --- | --- | --- |
| `resume_havard_ver.tex` | `HungLNG_Resume.pdf` (2 pages) | `HungLNG_Resume_Print.pdf` |
| `resume_ai_ml.tex` | `HungLNG_Resume_AI_ML.pdf` (1 page) | `HungLNG_Resume_AI_ML_Print.pdf` |

`cv-style.tex` supplies the shared A4, 11pt XCharter OpenType layout. Print adds
grayscale styling, a portfolio QR and the vector duck from
[`design/assets/cv-running-duck.tex`](../design/assets/cv-running-duck.tex).
The digital research CV remains the website's default download.

From the repository root, with Python 3.9+:

```sh
python scripts/build-cv.py
python -m pip install --target .codex/tooling/pdf-python pypdf PyMuPDF
python scripts/check-cv-text.py
```

On Windows the builder installs a checksum-verified Tectonic 0.17.0 if no compiler
is available. On other platforms, install Tectonic on PATH first. The first build
downloads TeX packages and the XCharter fonts, so it needs internet access.

Build output stays in ignored `output/cv-build/`; review PDFs are in `output/pdf/`.
Use `--variant research|industry|all` and `--edition digital|print|all` to choose
exports. Both default to `all`.

Inspect all six rendered pages, links and print QR before publishing changes.
The extraction check uses pypdf (plain/layout) and PyMuPDF to catch split words
and missing fields. It does not certify an employer's ATS. Preserve the font
settings that prevent the earlier PyTorch/TensorFlow split-word regression.

```sh
python scripts/build-cv.py --publish
python scripts/check-cv-text.py --directory public
```

`--publish` copies reviewed PDFs into `public/`; it does not push or deploy.
Keep `public/HungLNG_Resume.md`, `public/HungLNG_Resume_AI_ML.md` and portfolio facts
aligned when editing content. The October 2026 update adds Outlier contributor experience. The layout keeps
11pt body text with 18mm margins; the industry edition uses tighter section spacing.
Selected certifications stay on the website rather than extending the research CV.

See [CV design and print notes](../design/cv-digital-and-print.md) and
[pending owner inputs](../notes/portfolio-backlog.md). Role-specific applications
belong in ignored `docs/career/`, separate from these base documents.
