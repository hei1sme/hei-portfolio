# Technical portfolio reference study

**2026-10-27 update:** The owner rejected these references as too text-heavy for
the desired homepage and preferred the original site's fun. The proposed
field-notebook aesthetic below is superseded by
[`visual-direction-reset.md`](visual-direction-reset.md). Keep the factual
inventory and research-presentation lessons; do not apply the essay format as
the homepage's visual direction.

2026-10-26. The owner rejected the latest technical revision as plain and
AI-looking. Styling changes are paused while the direction is reconsidered. This
document records an actual source/browser study, not a finished redesign or a
claim that the current prototype is ready.

## What the current revision got wrong

Restoring information was necessary but did not establish visual identity. The
same large-name / pale-ground / small-paragraph / boxed-demo composition could
belong to many AI engineers. A rotating schematic is movement, but it does not
let someone investigate the owner's research. Adding filters and cards increased
functionality without resolving that problem.

The Taste inspector was run on the current dev preview at 1440, 768 and 390 px.
Report: `output/taste-audit/report.json`. It reported 10 deduplicated FAIL findings
and 5 WARN findings under its own design rules. This is a failed review of the
rejected prototype, not a passing final build. Some heuristic flags (such as
numbers which are real manuscript counts) are not design faults by themselves.

Specific useful findings:
- Main running text is predominantly 13 px. The desktop contains 118 text blocks
  below 13 px. Much of the research information reads as metadata.
- It measured 29 font sizes at desktop, indicating weak hierarchy despite the
  simple appearance.
- The same split/boxed presentation repeats through the opening and method story.
- On the phone, the supposedly distinctive visual is mostly below the first
  screen. The opening is effectively a generic name-and-paragraph page.
- The inspector counts plenty of animated elements (including waveform bars).
  That count does not mean the motion is meaningful or visually memorable.

Screenshots reviewed: `output/taste-audit/desktop-fold.jpg`,
`desktop-page-01.jpg`, and `mobile-fold.jpg`. Additional sheets exist, but this
study does not claim that every generated sheet was visually reviewed.

## Creators and actual lessons

These are strong examples with different purposes, not an objective ranking of
the world's best portfolios. Personal sites, technical essays and research
explainers are distinguished below. No screenshots or assets are licensed for
reuse as the owner's portfolio imagery.

### Josh W. Comeau — personality sustained through technical material

- Personal site: https://www.joshwcomeau.com/
- His own portfolio guidance: https://www.joshwcomeau.com/effective-portfolio/
- Opened the live homepage, captured opening and scroll states, and
  keyboard-activated the generative-art editor. It exposes a Rainbow Configurator
  with density, rows, operation and edge options. Pointer activation was
  intercepted by the cloud artwork in this browser; keyboard activation worked.
- Lesson: the playful visual world is part of his authored site, while articles
  and demonstrations still deliver substantial technical content. Personality
  is not confined to an isolated About paragraph.
- For hei: running, photography and botanical interests should inform the
  composition and interaction language, while research stays fully accessible.
- Do not copy his clouds, rainbow, color scheme or editor.
- Captures: `output/playwright/reference-josh-hero.jpg`,
  `reference-josh-scroll.jpg`, `reference-josh-art-editor.jpg`.

### Maxime Heckel — the rendered technical experiment is the artwork

- Personal technical blog: https://blog.maximeheckel.com/
- Examined essay:
  https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/
- Opened the index and essay, captured states and inspected actual controls. The
  article connects a painterly WebGL result to the Kuwahara filter, research
  sources, implementation and interactive examples.
- Limitation: the inspected parameter inputs were disabled in this automated
  session; attempted arrow-key changes did not change values. This is not a
  verified interaction success. Some early screenshots caught unloaded visual
  regions, so they are not treated as complete rendered artworks.
- Lesson: technical richness and visual richness can be the same thing. His
  output is not merely a diagram showing that a shader exists.
- For hei: make an image-processing or explanation experiment perform useful
  work on the page, with an honest relationship to the actual research. Avoid
  invented heatmaps or a generic graph presented as an implementation result.
- Captures: `output/playwright/reference-maxime-hero.jpg`,
  `reference-maxime-painterly-scroll.jpg`, `reference-maxime-slider.jpg`.

### Bartosz Ciechanowski — manipulate the mechanism to understand it

- Personal technical site: https://ciechanow.ski/
- Examined essay: https://ciechanow.ski/cameras-and-lenses/
- Opened the essay and scrolled its explanation; inspected the camera/sensor
  demonstrations and dragged the first canvas. The page had 56 canvas elements
  at inspection, each embedded in a specific explanatory narrative.
- Lesson: interaction changes what the reader can understand. A parameter or
  camera is attached to a concrete concept, not added for visual activity.
- For hei: use a similarly explorable visual argument for CV or XAI. The
  photography connection is especially relevant to his own interests.
- Boundary: this is an essay, not a homepage blueprint. Keep CV, work and
  publications directly reachable instead of turning hiring into a long lesson.
- Captures: `output/playwright/reference-bartosz-camera-scroll.jpg`,
  `reference-bartosz-manipulated.jpg`.

### Chris Olah / Distill — research artifacts carry visual identity

- Research index: https://colah.github.io/
- Feature Visualization: https://distill.pub/2017/feature-visualization/
- Circuits: https://distill.pub/2020/circuits/
- Read the primary research pages. Feature Visualization explicitly distinguishes
  feature visualization from attribution, with figures and examples tied to
  the claims. These pages were source-read, not fully interaction-tested.
- Lesson: interpretations need an inspectable argument, original artifacts,
  authorship and caveats. This is particularly close to hei's interest in XAI.
- For hei: larger real figures, methodological context and explorable evidence
  should define the research presentation. Dense rigor and strong visuals can
  coexist. Preserve the distinction between schematic visuals and measured data.
- Do not borrow their generated feature images as if they were hei's results.

### Bruno Simon — coherent authored world

- Portfolio: https://bruno-simon.com/
- Read the live page's explanation/controls and attempted browser inspection.
  The current 3D scene did not render reliably in this headless environment;
  captures were blank and one timed out. No successful driving test is claimed.
- The primary page explains its explorable driving world, inputs and secrets.
- Lesson: the entire experience expresses a coherent idea, rather than attaching
  a 3D object to a standard landing-page template.
- For hei: consider a continuous visual environment and stronger transitions,
  but keep normal scrolling and a direct route to research/CV.

### Brittany Chiang — useful content reference, not the aesthetic target

- Portfolio: https://brittanychiang.com/
- Source-read the project and experience narratives. Initial browser capture
  caught the entrance state, so no visual conclusion is drawn from that frame.
- Lesson: clear roles, concise contributions and project descriptions make
  engineering work assessable.
- Boundary: copying another minimal developer portfolio would repeat the owner's
  complaint. Borrow content discipline, not its visual shell.

### Hakim El Hattab — playful experiments demonstrate actual engineering

- Personal portfolio: https://hakim.se/
- Tested experiment: https://hakim.se/textify/
- Opened the project index and Textify. Selected the Binary preset and activated
  Apply Settings on its actual controller. Inspected the resulting 600 × 867
  canvas and visually reviewed its character reconstruction of the sample image.
  No personal file was uploaded. Capture:
  `output/playwright/reference-hakim-textify-binary.jpg`.
- Lesson: a small, concrete computation can be memorable and playful without a
  generic "AI" animation. His index also keeps substantial projects and open
  source directly reachable.
- For hei: one image-processing experiment can connect photography and CV.
  Explain its operation and relationship to the research; preserve the actual
  project bibliography instead of replacing it with a gallery of effects.

### Robb Owen — a recognizable person, not an interchangeable developer label

- Personal portfolio: https://robbowen.digital/
- The web text fetch was robots-blocked, but the ordinary browser rendered the
  site. The first screenshot caught a loader; the later hero was visually
  reviewed after loading. Capture:
  `output/playwright/reference-robb-personality.jpg`.
- His illustrated self-portrait and cohesive cyan/violet treatment establish an
  authored personality alongside the creative-developer introduction.
- Lesson: personal artifacts can carry identity immediately. For hei this means
  authentic photography, observations and research imagery, rather than borrowing
  Robb's illustration style or assuming that a designer's homepage fits a researcher.
- No specific pointer-following effect was verified in this pass.

### Andrej Karpathy and Daniel Holden — research content references

- https://karpathy.ai/
- https://theorangeduck.com/page/publications
- Source-read these primary personal sites; no interaction verification claimed.
  Karpathy connects projects, teaching, publications and personal interests.
  Holden's publication presentation gives methods, research artifacts and links
  a clear home alongside programming work.
- Lesson: research identity comes from inspectable work and an intelligible
  trajectory. Neither site's restrained visual shell is the aesthetic target
  for this owner. An established researcher's name recognition is also not a
  substitute for clearly explaining an early-career candidate's contribution.

Additional screening: Jhey's current site was source-read for its emphasis on
prototypes and experiments (https://www.jhey.dev/). Cassie's current homepage is
a retirement/thank-you page (https://cassie.codes/), so historical screenshots
should not be presented as an inspected, currently live portfolio design.

## Subject inventory

Use these actual materials rather than an interchangeable "AI developer" concept:

1. SmokeNet's published Melbourne air-quality research and health-alert question.
2. The first-paper story as a foundation for later research.
3. Distinct held-out and severe-smoke-event evaluations.
4. SHAP, Integrated Gradients and counterfactual approaches to explanation.
5. MERR-GAT's audio/text conversational fusion.
6. Compact Vietnamese speech recognition research.
7. YOLOv8 PPE detection with compliance logic.
8. SpeedyLabX's group identity, 10 members and existing group image.
9. Existing conference/SmokeNet image and personal portrait.
10. Running, trails, photography, urban tropical spaces and blue, explicitly
    supplied by the owner; no personal landscape photo library supplied yet.

Page claims and proof:
- Identity: researcher who builds interpretable systems → roles, methods and work.
- Credibility: research is documented → full bibliography with correct statuses.
- Implementation: systems were built → diagrams, code links where real, technical
  detail and evaluation context, not generic stack badges as the main proof.
- Trajectory: first paper led to ongoing questions → actual research journey.
- Personality: active and curious → confirmed interests and authentic photos,
  without invented running statistics or travel history.

## Proposed next direction, not approved

Taste's direction workflow was actually run. The three dealt compositions were
`type-only-statement`, `name-as-monument` and `pinned-poster`. The first two repeat
the weakness the owner rejected, so the candidate selected for exploration is
**The pinned poster**, seed **296750271**. The full sheet is stored locally in
`.taste-skill/direction.json`; no redraws so far. Palette is kept blue, as requested.

Its useful principle is a stable point of view while real research material
changes through scroll. Its default ornamental name treatment and placeholder
proof/name band are not instructions to invent content. Any eventual adaptations
must be documented against the owner's actual information and asset constraints.

Idea sentence: **On this page, the progression from SmokeNet's environmental
observations to interpretable decisions becomes the changing visual field of a
researcher's photographic field notebook.**

This is stronger than a rotating generic network, but still needs a rendered
proof before it can be considered a successful direction. The next artifact should
be one deliberately composed, motion-tested opening and one complete research
section, not another whole-site template built before checking its identity.

The dealt composition is only a layout candidate. It does not by itself establish
an aesthetic. Compare these subject-led interpretations in that next artifact:

| Interpretation | Opening and motion | Research presentation | Main risk |
| --- | --- | --- | --- |
| Blue field notebook | Large image plane, cobalt fields, botanical image detail; scroll moves from observation to representation | SmokeNet's actual architecture and first-paper story become the first full research spread | Decorative nature imagery could overpower the work |
| Optical laboratory | A real image-processing surface occupies the opening; a parameter changes the computation | CV methods sit beside readable code/method explanations; SmokeNet still leads selected research | A standalone CV exercise could be mistaken for the owner's trained model |
| Movement study | A continuous path connects personal observation, research stages and lab/conference photography | A research journey with complete project spreads rather than identical cards | Running could become the main professional identity despite research-first intent |

Working recommendation: explore the first direction with one honest mechanism
from the second. Use the third only for transition rhythm and personal details.
These are proposed interpretations, not approved colors, typefaces or a final
design selection. The old imagined courtyard is not a sufficient personal artifact.

Concrete opening storyboard:
1. Identity and a precise research sentence appear immediately, with Research,
   CV and Contact links. A large visual occupies the same first screen on mobile.
2. A labelled image operation exposes the difference between a scene and a
   computed representation. A keyboard/touch control offers the same operation
   as the scroll sequence; reduced motion keeps the meaningful states accessible.
3. Scrolling expands the first-paper spread: the environmental question, actual
   SmokeNet architecture, personal role, held-out result and event-backtest result
   with their distinct protocols, limitation, and paper/project links.
4. Subsequent project spreads vary their composition according to actual artifacts:
   conversational fusion for MERR-GAT, speech recognition for Vietnamese ASR,
   and detection/compliance logic for PPE. Full manuscripts remain easy to scan.

Asset boundary: the repository contains a personal portrait, SpeedyLabX and
conference photos, and SmokeNet/MERR-GAT figures. It does not establish a library
of the owner's trail/botanical photographs or measured model-attribution maps.
Use available artifacts first; do not invent either kind of personal evidence.

Candidate live interaction: apply a real, browser-computed image operation to
an image (for example a named edge operator) and reveal the intermediate view
through an accessible control. This demonstrates a CV mechanism honestly. It is
not equivalent to running hei's PPE model or generating model explanations, and
must not be labeled as those. A real trained-model interaction requires actual
model artifacts/results, which have not been provided in this repo.

Carry forward: all four projects; all four manuscripts; author roles/status;
education/certifications; toolkit; SpeedyLabX/journey; writing; academic profiles;
CV/contact; optional playground. Change the composition, not the truth or depth.

## Critique of the rejected revision

ROUND 1 (self-review, not an external rating)

Seen in one second: large name beside a generic boxed network.

Idea (one sentence): AI researcher with an architectural visualization, which
could belong to many candidates.

Live thing: model-mode/rotation controls on an illustrative topology; weakly
connected to the claimed research, not an evidence-exploration interaction.

Layout words by section: hero=split / method=split / publications=list /
projects=card grid / journey=grid / toolkit=columns / about=split /
writing=split / contact=statement.

Scores: design 5 · usability 6 · creativity 3 · content 7 → overall 5.1.

Caps applied: name-swap test fails; the automated review has unresolved FAILs;
small grey body copy; repetitive framing. Scores are an honest internal judgment,
not Awwwards results or a scientific measurement.

Top three problems:
1. `desktop-fold.jpg`: replace the interchangeable name-plus-network composition
   with a subject-specific visual artifact. Do not rescue it with more chrome.
2. `desktop-page-01.jpg`: replace repeated thin boxes and 13px metadata with a
   deliberate scale hierarchy and research figures that can be read.
3. `mobile-fold.jpg`: the distinctive visual is below the first screen. Give the
   phone an authored composition and a visible meaningful interaction.

No new portfolio styling was added during this reference-study pass. The old
revision remains a rejected prototype, not a completed design.
