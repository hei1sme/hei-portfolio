# Working on hei's portfolio

## Intent

This is Le Nguyen Gia Hung's personal portfolio. The owner is following a research
path and wants to appeal to both AI/ML engineering employers and research
internships, labs, and scholarship opportunities. Lead with research, supported by
evidence that he can implement and evaluate systems.

The owner explicitly rejected the current generic AI-generated appearance and
prefers strong, unusual, image-rich art direction. Blue is explicitly requested,
with botanical/urban tropical atmosphere and scroll-linked motion. He likes
running, gym, trail running and photography, and describes himself as curious,
energetic and funny. XAI/transparency and Computer Vision are important interests;
his first paper matters as the foundation of his research journey. Exact color
values, typefaces and a final visual concept have NOT been approved.
See `design/owner-interview-and-references.md` for the interview and reference
review, and `design/portfolio-rebuild.md` for the
research, candidate directions, and implementation sequence.

The owner subsequently rejected BOTH the designer-like concepts and the pale-blue
technical revision: too generic/AI-looking, too plain, and lacking aesthetic
identity and meaningful motion. Adding technical cards, a large name, or an
illustrative neural graph is not sufficient. Preserve the original information
while making research artifacts themselves carry the visual idea. Study technical
creators' actual rendered work and interactions; do not equate "technical" with
dashboard styling or tiny monospace labels. The reference study is in
`design/tech-portfolio-reference-study.md`; it predates the 2D botanical selection
on 2026-10-28 described below.

Latest correction (2026-10-27): the owner also rejected text-heavy technical
references and said the original may be more fun. Preserve the original's
playfulness and tactile/spatial interactions while improving hierarchy and
personal identity. The homepage should be image-led and concise, with full
research depth easy to open. The field-notebook aesthetic recommendation is
superseded by `design/visual-direction-reset.md`; do not keep steering toward an
essay/editorial homepage or require every playful effect to teach an algorithm.

Working motion proof: `/concepts/garden` (spatial) and
`/concepts/garden?view=photo` (photographic). Design comparison and verification
are in `design/garden-motion-proof.md`. These remain review candidates; do not
infer approval of the palette, typeface or botanical sculpture from implementation.

Owner feedback on 2026-10-27: the Sculpture variant is liked and is the direction
to develop. This is not approval of a complete final site. The owner also likes
ducks and suggests a cute colored doodle duck in running clothes. A generated
candidate is at `public/images/personal/running-duck-v1.png`, placed near the
About portrait as an optional playground trigger; its artwork is not yet approved.
Preserve its AI-generation provenance in `design/garden-function-parity-audit.md`.
Restore content/function depth rather than treating a successful hero as a finished
portfolio. The same document tracks the original-versus-prototype review.

Latest visibility correction: the owner likes the design but rejects hiding the
research evidence. Publications must be a visible main section immediately after
the hero, with published and under-review work distinguished. Surface authorship,
contribution, methods, contextual results, affiliation, degree/GPA and core tools
without disclosure. All four project summaries should be scannable before the
detail viewer. Long certifications and experimental discussion can be expandable.
See `design/research-visibility-review.md`. This remains a prototype; choosing
Sculpture selects the direction for a complete site, not a final-state approval.

Latest visual refinement: the owner asks for visual tools and an impressive
opening. `GardenToolkit` maps all original tools (plus documented XAI methods)
onto a project-linked workflow, keeping their names visible. The Sculpture
opening assembles geometric points into the blue plant, supports replay, and is
interruptible by scrolling/controls; reduced motion shows the settled scene.
See `design/visual-content-and-opening.md` for the whole-page visual/text review.
Do not turn factual paper references, author roles or statuses into icon-only UI.

## Skills

Full-site build requested by the owner on 2026-10-27: the integrated botanical
portfolio is the homepage at `/`, and `/concepts/garden` redirects there. The
owner selected the layered 2D hero on 2026-10-28; it now opens the main page.
Blog, article and all
four project cases share the portfolio shell; legacy components remain in the
repository but are not the public presentation. The selected-project inspector
opens on demand while all four summaries and publication evidence stay visible.
Read `design/final-build.md` for scope, verification and honest test limitations.
Do not describe the current main site as an unintegrated concept or restore the
comparison toolbar. A completed local build does not imply deployment to Vercel.

Subsequent motion/content review: the owner still found the site too static.
`MotionStrip` adds an ink image/type ribbon after publications, with drag, keyboard
steps, scroll-velocity response and global pause/reduced-motion support. Cursor
feedback is now a damped outline/expansion; the inherited purple scrollbar was
removed in favor of native scrolling. See `design/motion-and-recruiter-review.md`.
The owner explicitly confirmed that SER should follow the public repository:
WavLM + Compact Conformer, BERT/RoBERTa and GAT, superseding the former Wav2Vec
2.0/GATv2 description. Use the new labelled schematic; keep the old figure as
history. SmokeNet and SER have verified project-source links. The FCAJ cloud
journal is represented as a program experience; its completion/end status is
unconfirmed, so do not label it completed or assume a current AWS employment role.

Latest character/cover refinement: the owner requested a running-duck pointer.
`PortfolioCursor` now uses a six-frame 3 × 2 transparent sprite, faces movement,
and returns to an idle pose on stopping; native pointer and contextual labels
remain. Touch/reduced motion, keyboard use and playground dialogs suppress it.
The sprite is generated artwork based on the existing duck; preserve provenance
in `design/duck-cursor-and-blog-cover.md`. The first AI blog article now uses the
native cobalt/leaf route poster `curiosity-to-clarity-v2.png` for both preview and
body; its editable source is in `design/assets/`. Keep the old cover as history.

The strip and About now reuse the same `DuckSprite` artwork at a larger
resolution. Strip gait phase follows actual scroll/drag velocity and travel
direction, using the strip's existing loop. About runs/bobs on hover or keyboard
focus with a stable clickable button; global pause/reduced motion stop it.

Repository skills live in `.agents/skills/`:
- `frontend-design`: visual concepts, typography, composition, and implementation.
- `react-best-practices` (skill name `vercel-react-best-practices`): React/Next.js performance.
- `web-design-guidelines`: UI, accessibility, and interaction review.
- `writing-guidelines`: concise, concrete portfolio writing.
- `humanizer`: edit AI-sounding prose while preserving the owner's voice,
  technical facts, names, numbers, metadata and source links.
- `academic-cv-builder`: research CV structure, publication categories and
  authorship. Apply at the owner's undergraduate stage; omit unsupported grants,
  teaching appointments, advisors and references.
- `tech-resume-optimizer`: technical resume hierarchy and evidence-backed
  project bullets for AI/ML engineering roles.
- `resume-reviewer`: a four-dimension review rubric, prioritized findings and
  sample rewrites. Calibrate its length rules to academic CVs; scores are manual
  judgments, not employer ATS results. Latest review:
  `notes/cv-format-and-content-review.md`.
- `resume-cover-letter`: role-specific resumes and cover letters once a real
  job description and employer are supplied. Region and eligibility need facts.
- `taste-skill` (skill name `design-taste-frontend`): reference-led art direction
  and browser-based visual iteration.
- `apple-design`: fluid interaction, typography and spatial consistency for web.
- `emil-design-eng`: component details, interaction feedback and motion polish.
- `impeccable`: focused critique, layout/typography refinement and quality audits.
- `ui-ux-pro-max`: searchable UI/UX, palette, typography and chart references.

Read only the skill needed for the current task. User preferences override a
skill's default taste. Source commits and licenses are recorded in
`.agents/skills/SOURCES.json`; preserve upstream attribution when updating.
For concept exploration choose one lead design workflow (Taste or Frontend Design).
Use the others for targeted reference or review rather than combining every
workflow into one brief. Apple-inspired interaction does not imply copying
Apple's brand or choosing Liquid Glass as the owner's aesthetic. In Codex, resolve
UI UX Pro Max's scripts against its installed skill directory rather than assuming
the Claude-specific environment variable in the upstream command exists.

## Content and design

- Latest selected direction (2026-10-28): layered 2D botanical illustration.
  The main `/` uses this hero; `/?scene=botanical` selects it explicitly. Follow
  `design/botanical-illustration.md`. It uses authored flat SVG courtyard layers
  and the original 2D duck, with a shared run/rest rhythm, distance-driven gait,
  and scroll/pointer parallax. No new 3D mascot or fake research output. Hide
  sculpture-specific controls for this scene. The original potted object is at
  `/?scene=sculpture`; the leaf trial remains at `/?sculpture=leaves`. The owner
  selected the 2D direction, not every palette/type/art detail as permanently
  approved. Photography collage is not selected.
- Two-leaf hero trial requested on 2026-10-28: `/?sculpture=leaves` loads
  `LeafStudyScene`; `/?scene=sculpture` retains the potted object for comparison.
  Follow `design/leaf-study-trial.md`. The current refinement has a mature split
  leaf, curled young leaf, solid beveled edges and the restored original 2D duck;
  desktop alignment shifts right and resets on smaller screens. This is
  procedural geometry, not a plant scan or model inference. Existing generated
  duck artwork elsewhere is unchanged. Do not promote
  the trial to the default hero without the owner's selection.
- Owner correction before the 2D selection: the procedural 3D looks strange and the original
  2D duck is preferred. Restore the original six-frame duck in the leaf preview;
  do not replace the mascot with another 3D toy. The 3D hero remains unapproved.
  The subsequent 2D selection above supersedes the earlier alternative proposals.
- The owner reviewed/scanned the CV batch, then explicitly requested the web
  update on 2026-10-27. That request supersedes the earlier web hold for this
  update. Follow `design/research-experience-update.md`; keep intake PDFs private,
  distinguish all paper/competition statuses, and scope SmokeNet performance
  claims to the published report while its baseline table awaits source review.
- The owner's Overleaf CV was imported into ignored `docs/cv/`. Edit
  `resume_havard_ver.tex` there; preserve `original/`. Build with
  `python scripts/build-cv.py`, inspect both pages, then use `--publish` to update
  the public PDF. Keep `public/HungLNG_Resume.md` aligned. Source reconciliation
  and unresolved dates are in `design/cv-update.md` and the portfolio backlog.
  The industry source is `docs/cv/resume_ai_ml.tex`; it exports the one-page
  `public/HungLNG_Resume_AI_ML.pdf` and has a matching Markdown file. The default
  build now handles both variants (`--variant research|industry|all`).
  `--edition digital|print|all` selects editions; the default builds four PDFs.
  Shared style: ignored `docs/cv/cv-style.tex`. Current editions are A4, 11pt
  XCharter OpenType (fontspec), with visible profile URLs and page counts.
  Keep the text-extraction font settings: the previous Type 1 export split
  PyTorch/TensorFlow in pypdf plain mode. Run `python scripts/check-cv-text.py`
  before publishing; it uses pypdf plain/layout and PyMuPDF, not an ATS score.
  Print adds a real portfolio QR, grayscale styling and the small native vector
  duck from `design/assets/cv-running-duck.tex`; keep it out of digital editions.
  All editions derive from the same content per role. See
  `design/cv-digital-and-print.md`; inspect all six rendered pages and decode the
  print QR before publishing. Keep the digital research CV as the default link.
- Career skills are guidance, not evidence. Do not estimate achievements, change
  official roles, infer work authorization, turn certificates into hands-on
  experience or report a universal ATS score. Preserve the research CV as the
  default download. The role-specific application workflow and evidence gaps
  are in `notes/career-skills-review.md`; private application material belongs
  in ignored `docs/career/`. Do not send applications or contact anyone without
  explicit instructions.
- Owner-supplied CV updates belong in ignored `cv-inbox/`. Start with
  `cv-inbox/00-README.md` and `cv-inbox/01-tra-loi.md` when resuming intake.
  It holds papers, conference and hackathon details, project evidence and private
  answers. Never force-add the folder. Participation is not an award; conference
  attendance, paper submission, acceptance and presentation are different facts.
  Reconcile confirmed details with the existing CV before publishing updates.

- Decorative stars/arrows in active pages must use `components/portfolio/Icon`
  SVGs, not Unicode glyphs that iOS/iPadOS can render as emoji. Semantic symbols
  in scientific text are unaffected. See `design/ipad-icons-and-copy.md`.
- Keep one shared ambient-motion control via `PortfolioMotion`; hero replay,
  points and rotation options are in Explore. Do not restore a row of prototype
  controls or duplicate ribbon pause buttons. System reduced motion still wins.

- The owner requested a running-duck welcome before the homepage and authorized
  pushing the finished site to the connected Vercel integration. Its behavior,
  bypasses and verification are in `design/duck-welcome-intro.md`. Keep Skip,
  keyboard/scroll dismissal, direct-link bypass and the hydration failsafe.

- Pending owner-supplied research artifacts, demos and personal photos are
  tracked in `notes/portfolio-backlog.md`. The owner explicitly deferred missing
  assets; consult that file when asked what remains and do not invent outputs.
  The latest content refinement is in `design/recruiter-content-refinement.md`.

- Preserve truthful names, authorship, dates, paper status, project roles, and links.
  Distinguish published work from work under review. Never invent metrics,
  deployment status, users, impact, or the owner's aesthetic preferences.
- Give each featured project a clear problem, personal contribution, method,
  evaluation evidence, limitation, and usable source/demo/paper links when present.
- Make identity, selected work, CV, and contact easy to find. Main content should
  not depend on waiting through a mandatory intro or solving a navigation puzzle.
- Derive expressive visuals from the work: real diagrams, experiments, data, and
  personal artifacts. Review legibility alongside the visual ambition.
- Keep keyboard navigation, visible focus, touch interaction, and reduced-motion
  support. A normal pointer and ordinary scrolling should remain usable.
- Before a broad redesign, compare concrete visual concepts and document the
  chosen direction. Do not impose an editorial/minimal/terminal style by default.

## Engineering and verification

- Actual manifest: Next.js 15, React 19, TypeScript, Tailwind 3. README versions lag.
- MDX: `content/blog`, `content/projects`; blog loader: `lib/posts.ts`.
- Main composition: `app/page.tsx`; global providers/navigation: `app/layout.tsx`.
- Reuse this checkout and keep unrelated user changes intact.
- Run appropriate checks for code changes. Inspect rendered desktop and mobile
  views, keyboard behavior, reduced motion, and console errors before claiming UI QA.
- Playwright MCP is configured in `.codex/config.toml`. Bootstrap its local npm
  with `python scripts/bootstrap-portfolio-tools.py` (Python 3.9+; Node 22.9+ or
  20.17+ in the 20.x line). It uses an isolated, headless browser profile.
- Keep generated browser output in `output/` (ignored). Never claim a configured
  MCP is connected unless the current client actually exposes its tools.
- Context7 is connected and verified for framework documentation. Resolve the
  library first and match indexed documentation to the installed version; do not
  silently apply newer Next.js APIs to this Next.js 15 project.
