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
- Resume: `public/HungLNG_Resume.pdf`.

Trusted repository MDX is compiled on the server. Preserve authorship, paper
status, project roles, dates and evaluation scope. Do not present attention as a
causal explanation, a schematic as measured output, or a profile as a project repo.

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
pinned source commit. The latest icon, motion-control and copy review is in
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
