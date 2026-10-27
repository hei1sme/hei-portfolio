# Visual direction reset

2026-10-27, Asia/Bangkok. Responds to the owner's objection that the latest
references are too text-heavy and that the original portfolio may be more fun.
This supersedes the homepage aesthetic recommendation in
`tech-portfolio-reference-study.md`. Its content inventory remains useful.

## Decision

Develop from the original portfolio's playful interaction vocabulary. Withdraw
the research-field-notebook recommendation as the leading homepage direction.
Research identity does not require the homepage to resemble a technical essay.
Preserve complete content through clear navigation and project detail pages;
make the initial experience image-led, concise, responsive and enjoyable.

This is a working recommendation, not approval of a particular shade, font,
light/dark treatment, scene or final composition. No application UI was changed
in this review pass.

## Original site: what is worth preserving

Reopened the original `/` in the browser and inspected the source, including
Hero, HeroShape, FloatingElements, HorizontalScrollProjects and NeuralBreach.
The first capture caught entrance animation; the later settled opening was
visually reviewed. These are distinct states, not two separate designs.

| Existing element | Preserve | Reconsider |
| --- | --- | --- |
| Full-screen reactive 3D hero | Immediate energy, spatial depth, pointer response | The central object, orbit lines and dense particles compete with the title and reduce subtitle legibility |
| Draggable floating elements | Tactile play and a sense of agency | Ten changing badge-like objects add visual noise; use fewer, more personal objects |
| Horizontal project sequence | A change of rhythm and large project imagery | Keep ordinary mobile scrolling and visible routes to each full case study |
| Secret NeuralBreach playground | Humor and optional discovery | Give it an intentional home and easy exit; keep main navigation direct |
| Lab/conference images and journey | Real human context and research credibility | Give imagery more space instead of turning everything into metadata |

The interaction implementations were source-inspected. This pass does not claim
all dragging, playground states, keyboard behavior or mobile behavior were tested.

## Better visual references

### Lusion — visual hierarchy and a dominant scene

- https://lusion.co/
- Loaded and visually inspected its desktop opening: a brief introduction above
  a large blue, black and white 3D composition. Captured a scroll state too.
- Transfer: commit to a dominant visual surface and coherent material/color
  language; put the short identity statement where the scene cannot obscure it.
- Boundary: this is a creative studio, not an AI researcher's portfolio. Borrow
  image scale, composition and visual confidence, not agency positioning.
- Capture: `output/playwright/reconsider-lusion-loaded.jpg`.

### Of the Oak — botanical atmosphere rendered computationally

- Live experience: https://oftheoak.co.uk/
- Creator's implementation account: https://lusion.co/projects/of_the_oak/
- Loaded the desktop scene, used Skip intro, moved the pointer and scrolled.
  Visually inspected its tree environment with point-like colored detail. The
  page exposes meditations and species sections. This pass does not establish
  every scene transition or interaction's behavior.
- The creator describes a Houdini-to-WebGL pipeline and instancing. This is a
  primary implementation account, not a claim that hei already has those assets.
- Transfer: botanical detail and computational structure can inhabit one scene.
  Light, depth, density and camera framing can provide atmosphere without adding
  a decorative plant image beside an unrelated network diagram.
- Boundary: this is an artwork/field guide, not a portfolio blueprint. Its
  scanned tree and production resources must not be assumed available here.
- Capture: `output/playwright/reconsider-oak-loaded.jpg`.

### Henry Heffernan — a personal environment creates curiosity

- https://henryheffernan.com/
- Browser-rendered a small 3D desk, monitor, books, chair and plant. Activated
  Start; a later screenshot shows the environment from another angle. The
  "Click anywhere to begin" stage remained visible; no successful desktop-OS
  exploration is claimed.
- Transfer: personal objects can express an identity more immediately than
  interchangeable skill badges. Technical implementation can support play.
- Boundary: the site identifies itself as Portfolio 2022 and deliberately uses
  retro imagery. It is a spatial-personality reference, not evidence of a 2026
  trend, and does not justify a mandatory boot sequence for this portfolio.
- Capture: `output/playwright/reconsider-henry-loaded.jpg`.

### Other screened sites and limits

- Clément Grellier: https://clementgrellier.fr/overview. Navigated from Quick
  overview; visually inspected its video-led project presentation. First video
  was playing with readyState 4. Useful for concise previews and access to work;
  its sparse monochrome shell is not the owner's desired aesthetic.
- Jordan Delcros: https://www.jordan-delcros.com/. Browser stayed in a loader
  despite an attempted entry. No final experience is recommended from that state.
- Bruno Simon remains relevant for authored play, but previous headless rendering
  failed; do not imply a new successful driving test in this pass.

## Working implementation brief

Opening: name, a short research identity, Research/CV/Contact access and a dominant
reactive visual. Explore blue with botanical structure in that visual. Compare a
spatial composition and a photography-led composition before implementing the
whole page. Do not assume a full imported 3D tropical environment is available.

Motion: preserve tactile play; choose a deliberate camera/scene transformation
as the main scroll event. Small feedback can make dragging and navigation feel
physical. Motion can serve atmosphere, delight and technical explanation. An
edge-detector demonstration is not required as the site's defining idea.

Selected work: show four strong visual previews with a short problem statement,
role and one correctly contextualized result/status. Open full case studies for
methods, evaluation protocol, limitations and links. Distinguish SmokeNet's
held-out result from its severe-event backtest. Do not invent attribution maps,
audio recordings, detection footage or deployment claims to fill these previews.

Publications: keep the complete bibliography reachable, with published versus
under-review statuses and authorship intact. CV, education, certifications,
toolkit, writing, academic profiles and contact remain accessible. Moving depth
into detail views is an information-architecture change, not deleting content.

Personal material: use existing portraits, SpeedyLabX/conference photos and
confirmed interests. Actual running/photography artifacts are preferable when
available; never invent routes, races, equipment, images or personal history.

Next proof: one opening plus one selected-work transition, viewed on desktop and
phone, with a comparison against the original. Evaluate whether it feels more
personal and fun before expanding the design. Keep normal scrolling, touch,
visible focus and reduced motion throughout.
