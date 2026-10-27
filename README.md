# hei — Le Nguyen Gia Hung

Research-first portfolio for an AI undergraduate at FPT University, with a cobalt
botanical Sculpture opening, visible publications and an optional playground.

A short welcome introduces the owner with his running duck and full name before
revealing the Sculpture. It runs once per browser-tab session and can be skipped
immediately with the button, Escape, Tab or scrolling. Direct section links and
reduced motion bypass it. It is an introduction, not a simulated loading meter.
Replay welcome and sculpture options live in Explore. A single Pause motion
control stops ambient movement across the site; it is hidden when the system
already requests reduced motion. Decorative stars and arrows use SVG so Safari
does not replace them with colored emoji.

The Sculpture site is now the main homepage at `/`. `/concepts/garden` redirects
there. Earlier concepts remain under `/concepts`, excluded from indexing and
outside the public portfolio navigation.

A two-leaf sculpture trial is available at `/?sculpture=leaves`: curved cobalt
leaves, fine veins, a sampled-point opening and a small duck companion. The main
homepage keeps the existing sculpture while this candidate is reviewed. See
[the trial notes](design/leaf-study-trial.md) for scope and provenance.

Research lists one published paper and four manuscripts under review, with full
authorship and venue/status kept distinct. The applied-work section covers
FCAJ/NutriTrack, BioListen VN (6th in Round 1 of VAIC 2026) and CosmicOptic
(frontend/backend, synthetic-data demo). Each has a linked case study. Existing
speech and computer-vision projects remain in the project explorer. See
`design/research-experience-update.md` for the content reconciliation and asset
provenance; private papers and certificates stay in ignored `cv-inbox/`.

## Run locally

With a supported Node runtime and dependencies installed:

```sh
npm run dev
```

For a production build:

```sh
npm run build
npm run start
```

The local site runs at `http://localhost:3000`. If npm is unavailable in this
Windows checkout, `python scripts/bootstrap-portfolio-tools.py` prepares the
isolated tooling described in `.codex/config.toml`. Its npm entry point is
`.codex/tooling/npm/bin/npm-cli.js`.
On Windows, the bootstrap also creates npm/npx command shims in
`.codex/tooling/bin`. Add that directory to the current process PATH when a
framework command needs to invoke npm internally; no global installation is needed.

`PORTFOLIO_DIST_DIR` optionally selects a local Next.js build directory; production
defaults to `.next`. This checkout uses an ignored `.next-local` junction for
build output when the system disk is full. If that junction points to another
volume, the task's build parent also needs a `node_modules` junction back to this
checkout so Node can resolve runtime dependencies. No absolute machine path is
required in the application configuration.

## Stack and structure

Next.js 15, React 19, TypeScript, Tailwind 3, Three.js and Framer Motion. Installed
versions in `package.json` and `package-lock.json` are authoritative.

The current Next.js 15 patch baseline is 15.5.28. Dependency fixes and the two
scoped PostCSS/parser overrides are documented in
[design/dependency-maintenance.md](design/dependency-maintenance.md).

- `app/page.tsx`: main homepage composition.
- `app/concepts/garden/`: shared Sculpture components, publications, project
  inspector, background and visual tools workflow.
- `app/components/portfolio/`: shared navigation/footer, contextual pointer,
  duck welcome, copy-email action and method diagrams.
- `lib/intro.ts`: welcome eligibility and the pre-paint bootstrap/failsafe.
- `app/portfolio.css`: cross-page styles and production homepage refinements.
- `app/projects/[slug]`: statically generated cases with real figures or labelled
  schematics and explicit evaluation scope.
- `app/blog`: searchable writing index and server-rendered MDX articles.
- `NeuralBreach.tsx` and `ShooterGame.tsx`: optional playground entered through
  the running duck/footer or the `ailab` shortcut.

The welcome can be skipped while 3D loads. Identity, CV and publications remain
server-rendered; JavaScript failure does not leave a blank screen. Reduced motion
starts settled. A still captured from the procedural scene supplies the loading
and WebGL fallback. Normal pointer behavior and vertical scrolling remain usable.

## Content

- Blog: `content/blog/*.mdx`, loaded by `lib/posts.ts`.
- Cases: `content/projects/*.mdx`, loaded by `lib/projects.ts`.
- Shared facts/profiles: `app/concepts/research/portfolioData.ts`.
- Resume: `public/HungLNG_Resume.pdf`; text version: `public/HungLNG_Resume.md`.
- One-page AI/ML resume: `public/HungLNG_Resume_AI_ML.pdf` and matching `.md`.
- Print editions: the corresponding `_Print.pdf` files, with a grayscale layout
  and a portfolio QR. All four PDFs use A4; digital copies retain cobalt links.

Trusted repository MDX is compiled on the server. Preserve authorship, paper
status, project roles, dates and evaluation scope. Do not present attention as a
causal explanation, a schematic as measured output, or a profile as a project repo.

### Update the CV

The owner's research CV source lives locally at `docs/cv/resume_havard_ver.tex`;
the one-page industry source is `docs/cv/resume_ai_ml.tex`.
Both use the private `docs/cv/cv-style.tex` layout, with 11pt XCharter OpenType
text, visible profile addresses and page numbers. The print edition is generated
from the same content with a QR, grayscale styling and a small vector running
duck in the footer. Its editable source is `design/assets/cv-running-duck.tex`.
The attachment and previous PDF are preserved in
`docs/cv/original/`. The entire `docs/` directory is ignored; these private source
files are not included in a fresh clone.

```sh
python scripts/build-cv.py
```

This builds all four review copies in `output/pdf/`. Use `--variant research` or
`--variant industry` to select the content; `--edition digital` or
`--edition print` selects the output style. Both default to `all`. On Windows the
script installs a checksum-verified Tectonic 0.17.0 into ignored local tooling if
needed; other platforms need Tectonic on PATH. The first build downloads TeX
packages and requires network access. Review all six pages and links, then run
`python scripts/build-cv.py --publish` to replace the website PDFs. Update the
Markdown versions and shared portfolio facts alongside them. The `--publish`
flag only copies the PDFs locally; deploying still requires the Git/Vercel flow below.

Before publishing, run `python scripts/check-cv-text.py` against the review
exports. It checks the original split-word regression using pypdf in plain and
layout modes plus the independent PyMuPDF reader. Local review dependencies can
be installed with `python -m pip install --target .codex/tooling/pdf-python pypdf PyMuPDF`.
Use `--directory public` to check the website copies. These checks establish
local text extraction; they do not certify an employer's ATS or job fit.
Expected content differs by role: the research CV keeps speech-research keywords
and all four manuscript venues; the one-page résumé checks the selected applied
projects. Do not reintroduce omitted projects solely to satisfy a shared keyword list.

Use the digital PDFs for online applications and the `_Print` editions when
printing on A4 at actual size (100%). Employer requirements take precedence if a
posting asks for another paper size or file format. The website's Education
section keeps the digital downloads visible and groups print downloads in a
disclosure. Layout decisions and verification are in
[design/cv-digital-and-print.md](design/cv-digital-and-print.md).

The import, content reconciliation and remaining date questions are documented
in [design/cv-update.md](design/cv-update.md).
Career skill selection, application workflow and evidence gaps are in
[notes/career-skills-review.md](notes/career-skills-review.md). These are base
documents; tailor a copy to the actual posting before applying.

## Deployment

Production: [hei-portfolio.vercel.app](https://hei-portfolio.vercel.app).
The former `hei-portfolio-w.vercel.app` address redirects there. The connected
GitHub repository is `hei1sme/hei-portfolio`; pushes to `main` trigger the existing
Vercel production integration. Verify the Vercel status for the pushed commit and
the public page before treating an update as live. Local edits alone do not deploy.

Set `NEXT_PUBLIC_SITE_URL` when deploying under another domain; it controls
metadata URLs, canonicals, `robots.txt` and `sitemap.xml`. The generated social
preview is at `/opengraph-image`. Build with `npm run build` on the existing
Next.js deployment platform.

For a future `.me` domain, connect the registered domain in the existing Vercel
project, use the DNS records Vercel gives for that domain, then set
`NEXT_PUBLIC_SITE_URL` to its HTTPS origin and redeploy. Do not point this Next.js
app at GitHub Pages just because a student domain offer includes Pages. No custom
domain has been chosen or configured by this change.

## Design and verification

Read `AGENTS.md` before making changes. Interviews and reference studies remain
in `design/`; skill attribution is in `.agents/skills/SOURCES.json`.
Humanizer is vendored in `.agents/skills/humanizer/` with its MIT license and
pinned source commit. Academic CV Builder, Tech Resume Optimizer and
Resume/Cover Letter Writer are also vendored with pinned commits and upstream
MIT licenses. Their scope and local factual constraints are in `AGENTS.md`.
The latest icon, motion-control and copy review is in
[design/ipad-icons-and-copy.md](design/ipad-icons-and-copy.md).

Deferred research figures, demos and owner inputs are tracked in
[notes/portfolio-backlog.md](notes/portfolio-backlog.md). Check it before planning
the next content pass.

See [design/final-build.md](design/final-build.md) for the full-site scope and
verification. Browser output belongs in ignored `output/`. The duck is generated
artwork; provenance remains in `design/garden-function-parity-audit.md`. The
sculpture is procedural Three.js geometry, not a scan or model attribution.
Welcome behavior and verification: [design/duck-welcome-intro.md](design/duck-welcome-intro.md).

## Maintainer

Le Nguyen Gia Hung · [LinkedIn](https://linkedin.com/in/le-nguyen-gia-hung/) ·
heiontheway@gmail.com

## License

MIT (c) Le Nguyen Gia Hung
