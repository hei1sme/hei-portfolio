# Visual content and opening pass

2026-10-27. Refine the selected Sculpture direction. Frontend Design remains the
lead workflow; use Apple Design for immediate, interruptible interactions. The
owner asks for tools to become visual and for a memorable opening.

## Whole-page content review

| Area | Visual treatment | Text to keep immediately readable |
| --- | --- | --- |
| Opening | Actual GPU point formation into the cobalt sculpture, slight camera arrival, replay | Name, affiliation, interests, published-paper signal, CV/navigation |
| Published paper | Keep the actual architecture figure, enlarge on request | Full title, author role/list, venue/status, contribution and scoped evaluation |
| Pending manuscripts | Clear status/venue hierarchy; do not invent three illustrations | All three titles and author roles; under review remains explicit |
| Project overview | Real architecture thumbnails for SmokeNet/MERR; labelled geometry-based method thumbnails for ASR/PPE | Problem, role, methods, results/status and direct case links |
| Project detail | Existing original diagrams and honest method schematics | Contribution, evaluation and limitations; no fake model output |
| Personal section | Real portrait and the running-duck candidate | Brief personal identity; optional playground remains optional |
| Journey | A visible chronological track and nodes beside actual milestones | Dates, research progression and author/status facts |
| Toolkit | A workflow map with recognizable monochrome tool marks, names, and project-linked highlighting | Every original tool remains visible; no invented proficiency percentages |
| Education | Clear degree/GPA/date typography | Exact school, expected graduation, GPA and merit; certifications expandable |
| Writing | Keep actual article preview image | Title, date, excerpt and usable article link |
| Contact | Keep direct text/link actions | Email, CV and academic profiles; no decorative chart needed |

## Opening sequence

No full-screen loader or forced wait. The page is readable while the scene loads.
Once WebGL is ready, dispersed geometric points converge to the same botanical
surface vertices, then the blue material appears as the camera settles. This is
a procedural visual, not an AI inference, real plant scan or attribution result.
Pause, normal scrolling, selecting a representation and rotation interrupt the
arrival. Reduced motion starts in the settled view. Replay does not reload Three
or recreate GPU resources.

## Toolkit structure

Data → model → inspect → build. All names remain legible beside icons. Project
selection highlights only tools/methods actually documented for that project,
and explains the real workflow in a short caption with its existing case link.
General familiarity must not imply that every listed tool was deployed in every
project. Shared lab tools stay visible as a separate row. No skill-rating bars,
fake terminals, decorative dashboards or logo-only walls.

Keep the existing cobalt, mist, navy and leaf palette and Manrope. Visuals clarify
the work; they do not conceal publications or remove the technical evidence.

## Verification

Implemented in `/concepts/garden`. Production build, TypeScript and lint checks
passed. Fresh isolated Playwright contexts verified the following:

- At 1440 px, Replay enters `assembling`, proceeds to `materializing`, then
  `settled`. It reuses the same canvas. Pause and ordinary scrolling interrupt
  the opening; the hero heading and published-paper signal stay visible.
- All four project selectors work with Enter, update their pressed state and
  workflow caption, and highlight only their documented tools. All 25 tool and
  method names remain visible. ASR links to its actual overview row.
- At 320, 390, 768 and 1440 px, there is no horizontal overflow or clipped tool
  label. Reduced motion starts settled and disables Replay. Mobile selectors
  and the ASR anchor work in touch-enabled browser contexts.
- Fresh production contexts reported no page errors or console warnings/errors
  during these checks. Desktop and mobile screenshots were visually reviewed.

Screenshots are in ignored `output/playwright/`, including
`garden-opening-production.png`, `garden-settled-production.png`,
`garden-toolkit-production.png`, and `garden-tools-320-production.png`.

This is an implemented refinement of the selected direction, not a finished
whole-site migration. The original homepage is still at `/`, and legacy blog
and case-study pages have not yet received the Garden visual system. These
checks use desktop browser emulation rather than physical mobile hardware;
they do not establish performance across devices or every legacy function.
