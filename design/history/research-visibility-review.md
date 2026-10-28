# Research visibility review

2026-10-27. The owner likes the current design, but explicitly rejects hiding
publications and other essential information. This is a hierarchy refinement of
the accepted Sculpture direction, not another visual redesign.

## Review lens

This is a hiring-oriented design assessment, not an empirical claim about all
recruiters. A lab lead needs an immediate research question, actual publication
status, author role, methods, and a path to inspect evidence. An AI/ML engineering
reviewer also needs implementation ownership and contextual evaluation. Both
need affiliation, degree timeline, CV and contact without searching disclosures.

The previous page conflated concise presentation with hidden evidence: one
project was selected, the bibliography was collapsed below it, and education and
toolkit were entirely closed. Merely having that content in the DOM did not make
it prominent or scannable.

## Hierarchy and information budget

1. Sculpture opening stays. State FPT affiliation, research interests, a direct
   published-paper signal and CV access. No invented seniority or availability.
2. Publications become the first full section after the hero. Feature the actual
   published SmokeNet reference, first/corresponding authorship, full author list,
   original architecture figure, concise contribution and DOI/project links.
3. Show all three under-review manuscripts as a separate visible list with
   title, role, venue and status. One publication plus three manuscripts is not
   four published papers. Avoid made-up author lists or links for withheld work.
4. Show all four project summaries simultaneously: problem, personal role,
   methods and one scoped result/status. Keep the visual detail viewer as a
   second layer, rather than the only way to learn the other projects exist.
5. Keep degree, GPA, merit and core tools visible. Only the longer certificate
   list and detailed experimental discussion need progressive disclosure.

Layout: an open two-column paper spread with a real figure, then three readable
manuscript rows; a cobalt project index with visible research/engineering evidence
and a clearly labelled detail viewer. Preserve Manrope, the existing cobalt/mist/
navy/leaf palette, the botanical scene, duck and ordinary scrolling. Do not turn
the page into an academic text wall or replace it with a dashboard.

Verification will check actual no-click visibility, correct published/review
counts, functioning direct links, project controls, keyboard/focus, responsive
views, reduced motion and console errors on the production build.

## Implemented

- Server-rendered `GardenPublications` is the first section after the hero.
  Published reference, author list, personal contribution, methods and held-out
  evaluation are visible; pending manuscripts are an explicit separate list.
- Hero affiliation, direct research/CV actions and a first-author publication
  signal are visible. The paper signal precedes the sculpture on phones, so it
  is not pushed below the first screen by the artwork.
- Four visible project summaries include role, method and scoped outcome/status.
  Three real case-study links are available directly; ASR has an inline detail
  viewer because no full case-study page exists. No fake page/source link added.
- The detail viewer remains available with a return link, keyboard focus handoff
  and a short, in-view media reveal. Its contribution/evaluation panel is open by
  default. Text does not wait for the image transition.
- Degree, GPA, merit and core toolkit are regular visible sections. Only the
  detailed certification list remains closed initially.

## Motion and full-version status

The owner asked again whether this is final and what to retain from the original.
Sculpture is already selected for development; that does not make this preview
the final portfolio. No repeat direction-selection approval is necessary.

Already present: pointer/keyboard/touch sculpture controls, surface-to-points
scroll transition, project-viewer navigation/media reveal, page-position feedback,
duck hover/focus/tap responses and the optional legacy playground.

Full-site motion priorities: a coherent transition from the opening into research,
more physical project browsing/transitions, a scroll-progressive research journey,
and consistent navigation/return transitions across case studies and writing.
Keep publication titles, status, author role and results visible and immediately
usable. Avoid a mandatory entrance or another blanket fade-up on every section.

Still outside this hierarchy pass: full visual migration of blog/project-detail
pages, final motion choreography, complete physical-device and game-victory QA,
and replacing the original home route with the completed site. The comparison
toolbar remains prototype-only.

## Validation

- Production build (with lint/type checking) and separate targeted lint/tsc pass.
  Existing SWC/Browserslist build warnings persist.
- Rendered desktop and mobile paper, manuscript, project-index and background
  screenshots reviewed. Checked 320, 390, 768 and 1440 px widths: no document
  overflow, the hero publication signal appears within the first screen, and
  all paper/manuscript/project summaries, GPA and toolkit are visible without
  disclosure interaction. Offscreen content still requires ordinary scrolling.
- JavaScript-disabled context confirms the publication title, three manuscript
  rows, four project summaries and GPA are present and visible; the publication
  section directly follows the hero in the document.
- Project inspection by Enter focuses the correct detail panel. Its evaluation
  is open; the return link works; image animation is `none` under reduced motion.
- All local hash-link targets exist. Fresh production contexts recorded no
  page/console errors for the changed flows.
- Final normal-motion check confirmed sculpture dissolution (`0.67` at the
  sampled scroll position) and the in-view `garden-project-reveal` animation.
  All three direct case-study links returned HTTP 200; the phone project index
  remained within the document width after adding these links.
- Dev HMR briefly served a manifest JSON parse error during editing; a fresh
  reload and production checks passed. It was not treated as a successful render.

Captures: ignored `output/playwright/research-final-{hero,paper,projects}-{width}.jpg`
and `research-visible-mobile-{manuscripts,background}.jpg`.
