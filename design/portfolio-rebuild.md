# Portfolio rebuild: research and tooling brief

Research date: 2026-10-26. This turn prepares tools and direction; it does not
replace the website yet. Findings below come from source inspection and external
research, not a rendered visual audit of this checkout.

## Owner's brief

- Career: following a researcher path; wants both AI/ML engineering opportunities
  and research internships/labs/scholarships.
- Taste: strong art direction, unusual composition, rich imagery.
- Complaint: the current portfolio feels AI-generated and lacks a personal
  aesthetic and a convincing reason for a recruiter to remember it.
- Interview completed: running, gym, trail running, photography, plants and urban
  tropical architecture; curious, energetic and funny. Explicitly wants blue,
  botanical atmosphere, optimization and scroll-linked motion. The first paper
  matters as his research foundation; XAI/transparency and Computer Vision matter.
- Still open: owner-selected reference images, exact palette, typography and final
  concept. See `owner-interview-and-references.md` for the updated recommendation;
  the earlier concepts below remain exploratory, not approved taste.

## Positioning proposal

An AI researcher who can build and evaluate systems. Let one body of work serve
two reading depths rather than maintaining two different identities:

- First scan: name, research focus, selected artifact, personal role, strongest
  verifiable outcome, CV, source code, and contact.
- Deeper review: research question, methods, evaluation protocol, baselines,
  limitations, authorship, implementation decisions, reproducibility, paper status.

This is a proposal for information hierarchy, not a promise about hiring outcomes.

## Why the current code feels generic

- `app/page.tsx` mounts the main content only after `EntranceAnimation` finishes;
  its timer is 3.3 seconds. The opening prioritizes a name reveal over the work.
- `HeroShape`, `FloatingElements`, global gradients, glow treatments, custom cursor,
  parallax, and repeated section reveals compete for attention. The problem is
  their cumulative weight and weak connection to the specific research.
- `HorizontalScrollProjects` uses a long sticky horizontal sequence on desktop.
  Compare against a direct, scannable work index before carrying it into redesign.
- Research truth is stronger than the presentation: real work in air-quality
  forecasting, multimodal emotion recognition, and explainability can supply the
  visual material and project narrative.
- Project data appears in components as well as MDX. Review duplication before
  revising content so the homepage and detail pages stay consistent.
- Publications include both a published paper and work under review. Maintain
  clear status labels; a submitted paper is not a published result.

## Sources and decisions

### Installed in `.agents/skills`

| Skill | Purpose here | Source |
| --- | --- | --- |
| frontend-design | Derive composition, typography, imagery and motion from this owner's work; compare concepts before building | [Anthropic](https://github.com/anthropics/skills/tree/dbd4588f9e1033efb41dad4bef2f7947c8993d44/skills/frontend-design) |
| react-best-practices | Review client/server boundaries, heavy imports, event listeners and rendering | [Vercel](https://github.com/vercel-labs/agent-skills/tree/063bee94c3f4df8453406c830b0a7df0f2860278/skills/react-best-practices) |
| web-design-guidelines | Check keyboard use, focus, responsive behavior, accessibility and interaction details | [Vercel](https://github.com/vercel-labs/agent-skills/tree/063bee94c3f4df8453406c830b0a7df0f2860278/skills/web-design-guidelines) |
| writing-guidelines | Remove vague promotional copy; make research contributions and actions concrete | [Vercel](https://github.com/vercel-labs/agent-skills/tree/063bee94c3f4df8453406c830b0a7df0f2860278/skills/writing-guidelines) |

Installed using the system skill-installer, pinned to commit revisions. Exact file
hashes and license notes are in `.agents/skills/SOURCES.json`. Anthropic's license
is included. The Vercel React skill declares MIT; the two guideline skills have no
license declaration in their SKILL.md and the source revision has no LICENSE file.
Keep provenance and review upstream terms before redistributing this toolkit.
Skills should be available on the next turn; restart the client if discovery lags.
Official discovery behavior: [OpenAI skill documentation](https://learn.chatgpt.com/docs/build-skills).

### Additional skills installed after the owner's request

The owner subsequently requested the discussed additions. Installed repo-locally:
`taste-skill` from Leonxlnx, `apple-design` and `emil-design-eng` from Emil Kowalski,
`impeccable` from pbakaus, and `ui-ux-pro-max` from nextlevelbuilder.
All five additions are pinned to commits, have their upstream root
licenses preserved, and are recorded in `SOURCES.json`. Impeccable's launcher and
the bundled design scripts have not been executed as part of installation.

Use one concept workflow at a time, with targeted help from the others. Begin
with an owner interview before treating any of the candidate concepts as the
chosen direction. New skills should be available on the next turn.

### Earlier comparison rationale

- [Impeccable](https://github.com/pbakaus/impeccable): useful critique, distillation,
  typography and layout workflows. The current revision also introduces a binary
  launcher, context files and a broad command framework. Initially deferred to
  keep setup small; now installed at the owner's request, for targeted review.
- UI component galleries: useful for individual primitives, but adopting a whole
  animated template would not establish the owner's personal direction.

### Community feedback considered

These are anecdotal comments, not representative hiring research:

- [Over-engineered portfolio discussion](https://www.reddit.com/r/webdev/comments/1ms8tjg/i_rebuilt_my_portfolio_after_getting_laid_off/): separate
  playful exploration from the fast path to work samples.
- [Portfolio feedback discussion](https://www.reddit.com/r/webdev/comments/1jmp1oa/finally_put_together_my_portfolio/): animation density can obscure content;
  references should be selected for reasons relevant to the owner.
- [3D portfolio discussion](https://www.reddit.com/r/webdesign/comments/1x5x1by/are_hiring_managers_annoyed_at_lavish_3d/): consider the time needed to reach
  evidence. This does not mean removing all expressive or interactive work.

Our conclusion: keep visual ambition, but connect it to the research and preserve
a fast path to evaluation. This is our design judgment, not a universal rule.

## MCP and integrations

- **Configured: Playwright MCP 0.0.83**, from
  [Microsoft](https://github.com/microsoft/playwright-mcp). Runs an isolated,
  headless browser for screenshots, responsive checks, navigation, console and
  keyboard inspection. Configuration is project-local in `.codex/config.toml`.
  It needs the client to load the configuration before its tools appear in chat.
- The environment has Node 24 but no npm/npx executable. The bootstrap script
  installs an SHA-512-verified npm 11.6.2 inside ignored `.codex/tooling/`; it does
  not modify application dependencies or global settings. On a fresh checkout,
  run `python scripts/bootstrap-portfolio-tools.py` with Node available.
- [OpenAI MCP configuration documentation](https://learn.chatgpt.com/docs/extend/mcp?surface=cli)
  says project configuration applies to trusted projects. Launch the client from
  this repository so the relative launcher path resolves.
- **Connected and verified: Context7** for framework documentation. Library
  resolution and a documentation query both succeeded. The smoke check used
  `/vercel/next.js/v15.1.8` for server layout/client provider composition and
  metadata; that indexed version is not a claim about this repo's exact resolved
  Next.js version. Match documentation to the installed version during changes.
  [Upstream](https://github.com/upstash/context7).
- **Deferred: Chrome DevTools MCP** for deeper performance traces if needed.
  [Upstream](https://github.com/ChromeDevTools/chrome-devtools-mcp).
- **Deferred: Figma** until there is a concrete Figma design/reference or a need
  for a shared editable design file. It is not required to develop visual concepts.

Playwright's own README also describes a CLI + skills alternative as more context
efficient for some coding agents. MCP is chosen here for interactive inspection
and because the owner explicitly invited MCP setup; it can be replaced later.

Verification completed: npm archive integrity; MCP initialize handshake; 25 tools
advertised; successful headless navigation to `about:blank`; browser closed;
all 80 vendored skill files match the recorded SHA-256 hashes. The actual site
has not been run, visually reviewed, or performance-tested in this preparation.

## Candidate visual concepts, not approved designs

### 1. Field Signals

Build a visual world from atmospheric observations, station maps, forecast curves,
and warning thresholds. A large, carefully composed data image becomes the first
artifact; surrounding text stays clear. Use authentic charts or label explanatory
illustrations. This links the look to the environmental research.

Risk: may overemphasize one domain. Emotion-recognition work needs its own related
signal imagery without pretending the projects share a dataset.

### 2. Human / Model

Explore the relationship between human interpretation and machine prediction:
personal photography, annotated model outputs, fragments of speech signals and
attention/graph structures. Art direction can be photographic and expressive,
with technical detail revealed through deliberate interaction.

Risk: avoid invented explanations, decorative heatmaps presented as results, or
generic cyberpunk imagery. The artifacts and wording must remain accurate.

### 3. Open Experiments

A visually curated research collection: each selected project has a distinct
poster-like artifact, and opening it reveals the question, experiment, evidence,
and implementation. A shared composition and type system ties the collection
together while letting the work vary.

Risk: posters must not hide titles, authorship, outcomes or links. Avoid a gallery
that requires hovering or unusual gestures to discover basic information.

Do not choose fonts or colors solely to avoid a trend. Test actual content in
two or three compositions and choose the one that feels specific to the owner.

## Next implementation sequence

1. Run the existing app and capture desktop/mobile baseline views. Inventory
   verified claims, research assets, image rights, links and missing evidence.
2. Produce two or three concrete first-viewport concepts with one real project
   section each. Compare distinct composition and imagery, not just color swaps.
3. Record the selected direction and design tokens; implement the homepage and
   project case studies. Preserve existing URLs and CV access where practical.
4. Review mobile, keyboard, reduced motion, readable content without animation,
   image loading, console errors, links and metadata. Run TypeScript/build checks
   appropriate to code changes. Treat measured performance separately from taste.

Success means a visitor can identify the researcher, assess a real contribution,
reach evidence and contact him quickly, while remembering an image or interaction
that belongs to his work. Visual distinctiveness alone does not prove competence.
