# CV for digital applications and in-person meetings

2026-10-27. The owner asked for more reference study and implementation for both
online PDFs and printed CVs, after discussing a single-column cobalt direction.

## What informed the change

- [Harvard MCS resume guidance](https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/):
  specific, factual language, visible results and a hierarchy that supports skimming.
- [Oxford Careers CV guidance](https://www.ox.ac.uk/careers/careers-guidance/job-search-and-applications/writing-applications/cvs):
  concise bullets, evidence of individual contribution, clear type and dates aligned
  on the right. Its North America section distinguishes Letter from A4; use the
  employer's requirements when an application specifies another format.
- [MIT CAPD LinkedIn guidance](https://capd.mit.edu/resources/linkedin/): a readable
  customized profile address. The owner's existing URL is retained and displayed.
- [Awesome CV, Byungjin Park](https://github.com/posquit0/Awesome-CV): inspected the
  rendered PDF, particularly typographic contrast, accent color and section hierarchy.
- [Deedy Resume, Debarghya Das](https://github.com/deedy/Deedy-Resume): inspected the
  2015 PDF as a historical asymmetric-layout reference. The owner's document keeps
  a single body column so long research titles retain room.
- [RenderCV Ink](https://github.com/rendercv/rendercv/blob/main/examples/John_Doe_InkTheme_CV.pdf)
  and [Opal](https://github.com/rendercv/rendercv/blob/main/examples/John_Doe_OpalTheme_CV.pdf):
  inspected the rendered template samples for left-aligned names, whitespace and
  restrained color. Their sample candidate and claims are not evidence for this CV.

The implementation is a refinement of the owner's imported source, with no
third-party CV template code or example achievements copied into it. Academic CV
Builder, Tech Resume Optimizer and Humanizer guided the structure and copy review.

## Current editions

| Content | Digital | Print |
| --- | --- | --- |
| Research CV, 2 pages | `HungLNG_Resume.pdf` | `HungLNG_Resume_Print.pdf` |
| AI/ML resume, 1 page | `HungLNG_Resume_AI_ML.pdf` | `HungLNG_Resume_AI_ML_Print.pdf` |

All four use A4, 20mm margins, XCharter OpenType 11pt body text, a left-aligned name and
page counts. Dates/location use a quieter hierarchy than project names and
contributions. Profile addresses and the paper DOI are visible text. ORCID and
Google Scholar retain their actual identifiers and links. Publication status and
reported result scopes remain unchanged.

Digital uses cobalt headings and links. Print uses grayscale, a small running-duck
footer mark and an 18mm QR on
the first page that encodes `https://hei-portfolio.vercel.app`. The readable web
address, email, phone and social addresses remain beside it. Print at actual size
on A4; these files have been reviewed on screen, not physically printed on the
owner's printer. No PDF/UA or vendor-specific ATS certification is claimed.

The AI/ML opening now surfaces first/corresponding authorship of the published
AJCAI 2025 paper. Project bullets name the task as well as the method. The short
paper citation does not repeat the author role already stated in the header and
project. The research CV preserves both scopes of the SmokeNet results and the
full author list. No deployment, new score, eligibility or employment was inferred.

## Maintenance

Two private content sources and `cv-style.tex` live in ignored `docs/cv/`.
`scripts/build-cv.py` builds both editions from each source; the print wrapper is
generated in `docs/cv/build/` and does not fork the content. The unmodified
attachment and pre-redesign sources/PDFs remain in `docs/cv/original/`.

```sh
python scripts/build-cv.py
python scripts/build-cv.py --variant industry --edition print
python scripts/build-cv.py --publish
```

The default is all roles and editions. `--publish` copies reviewed exports into
`public/`; Git/Vercel deployment is a separate step. Keep both Markdown resumes
aligned with the content sources. The website keeps two digital links visible and
groups print downloads in a native keyboard-accessible disclosure under Education.

## Verification

### Text-extraction follow-up

The owner authorized repairing the identified parser issue and adding the duck
after a read-only review. The previous embedded Type 1/T1 Charter export produced
`PyT orch` and `T ensorFlow` in pypdf's plain mode, although layout mode was correct.
The shared style now loads [XCharter OpenType](https://ctan.org/pkg/xcharter) with
[fontspec](https://ctan.org/pkg/fontspec), with kerning and common-ligature settings
chosen for reliable word boundaries. The visual family, body size, page counts,
profile links and all factual content are retained.

`scripts/check-cv-text.py` checks 18 identity/skill/result strings in all four
PDFs using pypdf plain, pypdf layout and the independent PyMuPDF reader. It also
checks A4/page counts, the DOI link and absence of raster images. The regression
now passes in all modes. All fonts remain embedded. This is local extraction
verification; no actual employer ATS has been accessed or an ATS score invented.

The print-only mark is an original code-native TikZ drawing in
`design/assets/cv-running-duck.tex`, roughly 7 by 8mm. Its running pose/headband
refer to the owner's established duck identity. It is distinct from the generated
bitmap mascot described in `duck-cursor-and-blog-cover.md`; neither artwork is
claimed as the owner's hand drawing. The existing bitmap files are unchanged.
The mark sits beside the footer name, away from the QR and factual text. Digital
editions contain no duck. The source is copied into the private build directory
by the build helper; both print editions use the same mark.

After the font/duck changes, all six pages were rendered and inspected again.
The content source files match their pre-change backups byte-for-byte. Print
grayscale, QR decoding, embedded fonts and digital/print text parity also pass.

### Layout and download checks

The production build passed compilation, lint/type checks and static generation.
Browser checks at 1440, 834 and 390px found no horizontal overflow or console
errors. The print disclosure opens with Enter, both print links receive visible
keyboard focus, and the summary/links retain 44px touch targets. Reduced motion
was applied during the review. All four local PDF requests returned 200.

All six pages were rendered and visually inspected after the last layout change.
The final TeX logs contain no overfull/underfull box warnings. A4 dimensions,
2/1 page counts, page counters, current keywords/results and DOI annotations
passed checks. Digital/print text matches per role after excluding the QR label.
Rendered print pages contain grayscale pixels only, and an independent ZXing
decoder read the expected portfolio URL from both QR codes.

- Render and inspect all six final pages, including page boundaries, footer page
  counts, QR placement and scientific characters. Check the TeX logs for overflow.
- Verify A4 dimensions, 2/1 page counts, current architecture/metrics/status and
  usable PDF link annotations. Compare digital/print text for the same role.
- Decode both printed QR codes from the rendered PDF using an independent decoder.
  ZXing is local ignored review tooling; it is not a website dependency.
- Check desktop, tablet and phone layouts, keyboard disclosure/focus, reduced
  motion and console output. Request each of the four PDF assets.
- Confirm the pushed Vercel status and compare all four deployed PDF checksums
  with the locally reviewed exports.
