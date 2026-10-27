# Garden prototype: parity and functional review

2026-10-27. The owner likes the Sculpture direction, adds a liking for ducks,
and asks whether the prototype has all the original functions. The Sculpture
direction is accepted for further development; the whole site is not final.

## Findings before this pass

| Area | Original | Garden before this pass | Finding |
| --- | --- | --- | --- |
| Research/project evidence | Four manuscripts, four projects, details | Four selectors, bibliography and detail disclosures | Present; review scoped evaluation and author statuses |
| Journey | Four milestones and SpeedyLabX wordmark | One paragraph and `/#experience` link | Missing local journey; old-page navigation interrupts the new experience |
| Academic background | GPA, merit, degree, six certifications | CV PDF only | Important information is not presented in the new site |
| Toolkit | Methods, engineering tools and workflow | Hidden in CV/project descriptions | Missing navigable toolkit |
| Impact | 10 members, 3 pilots, 4 manuscripts, event result | Mostly absent | Restore scoped evidence without inventing a deployment or combining evaluations |
| Writing | Blog listing and article | No writing route from Garden | Article request returned HTTP 500; reproduce and repair server/client MDX boundary |
| Academic profiles | Scholar, ORCID, Scopus and WoS | Scholar and ORCID | Two original profile links omitted |
| Playground | Button, secret `ailab`, story and shooter | Button; entry/Escape previously tested | Secret shortcut absent; full game not previously tested |
| Navigation | Section navigation and scroll progress | Short header and comparison toolbar | Add direct links to restored content and page position feedback |
| Personal artifacts | Portrait, lab wordmark and conference photo | Portrait and conference photo | Lab identity and personal character are reduced; the supplied SpeedyLabX PNG is a wordmark, not a team photo |

This explains why the prototype can feel thinner despite a working sculpture.
The earlier browser QA was true for the checked interactions, not a claim of
complete feature parity. The original's glow, cursor replacement, counter loops,
and entrance are not automatically requirements to reproduce; retain useful
interaction and information while keeping the accepted direction.

## Scope of the next refinement

Restore a visual local journey, academic background/toolkit disclosures, writing
access and complete academic links. Keep the existing sculpture, main hierarchy
and research evidence. Repair the verified blog failure. Add one running-duck
mascot in the personal section; no constant floating duck over the research.
Record actual function tests below, including any game paths not completed.

## Duck asset

Candidate v1: `public/images/personal/running-duck-v1.png`, transparent PNG.
Generated with OpenAI ImageGen on 2026-10-27 from the owner's duck/running/doodle
brief. This is an AI-generated candidate, not commissioned hand-drawn artwork.
The visual preference is a cute limited-color doodle with imperfect pen contours;
that description does not establish a human drawing process or owner approval.

Prompt: one cream duck jogging right, cobalt running singlet/shorts/headband,
orange bill, cream sneakers with muted coral soles; flat colored doodle, dark
navy slightly uneven contour, simple small eyes and minimal interior detail;
full body with transparent padding; no background, text, logos, shadow, 3D,
glossy rendering or extra characters. Original generated file retained under
the Codex generated_images directory.

## Verification and remaining work

Implemented this pass:

- Local four-milestone journey using the actual lab wordmark, with original
  authorship/status distinctions and an explicitly scoped research-context note.
- Native education/certification and toolkit disclosures. Six certifications,
  GPA 8.62/10, merit semesters 3–6 and expected December 2027 graduation restored.
- Explore disclosure navigation, section sitemap, page-position indicator and all
  four academic-profile links; the old `/#experience` jump is now local.
- Writing preview connected to the actual content loader. Blog MDX now renders
  on the server via the installed RSC entry point, with rendered children passed
  into the existing presentation shell. Removed duplicate blog navigation already
  supplied by LegacyShell. The formerly failing article now returns 200 and
  renders its actual body, rather than merely returning a successful wrapper.
- One running-duck candidate next to the About portrait, acting as a labelled
  playground button. It does not displace the accepted Sculpture opening.
- Restored the original `ailab` secret, ignoring text inputs and open dialogs.
- Optional skip-intro control for the Garden playground; default original-site
  narrative remains available. Added a labelled legacy close control.
- Fixed typewriter/completion/damage/stage timers' unmount cleanup, cleared held
  game inputs on blur/visibility loss, and added touch dragging with automatic
  aim/fire. Desktop keyboard/mouse interaction remains available.
- Fixed the prototype's generic pressed-button transform overwriting the skip
  button's centering transform: individual CSS `scale` now preserves positioning.

Completed checks:

| Check | Evidence/result |
| --- | --- |
| Build, lint, typecheck | Production build and targeted checks passed |
| Rendered sizes | Reviewed About/duck captures at desktop and phone; checked 320, 390, 768, 1440 px; no document overflow or clipped contact/menu bounds |
| Navigation | All local hash links have targets; Explore works with pointer/Enter/Escape; education opens before navigation; CV menu action has no selector exception |
| Background | Education/toolkit expand; six certification entries present; all four academic-profile links present |
| Research regression | Four project selectors, architecture switch, four-paper bibliography tested on production |
| Motion | Surface/points switch tested; repeated reduced-motion canvas captures were identical |
| Duck | Image loaded and visually reviewed on desktop/phone; clicking opens playground; Escape closes it and restores focus to the duck |
| Secret/skip | `ailab` opens the playground; Skip intro enters the real game |
| Desktop game | Held D changed player X position; normal game rendering inspected |
| Touch game | Chromium synthesized native touch drag changed player X from 135 to 195; game screenshot shows score 40 and enemies reduced to 3, verifying automatic firing/scoring during that gesture |
| Loss/retry | Waited for loss, tapped Try Again, waited for overlay exit; player returned on wave 1/5 |
| Blog | Followed writing link; real article body rendered (4,858 text characters); inspected settled desktop capture after entrance animation |
| Routes | Blog index/detail, three project-detail URLs and CV all returned HTTP 200 |
| Runtime | Fresh production contexts recorded no console/page errors in the tested paths |

Physical-device touch testing, completing all five waves/victory, and a complete
regression of every legacy animation are not claimed. The touch evidence comes
from Chromium's synthesized touch input, not a real phone. The loss/retry test
initially inspected the exiting overlay too early; it passed once the test waited
for that real transition to finish.

Impeccable source detector: Garden target scan returned `[]`. A separate scan of
the changed legacy components reported five style warnings: purple/cyan palette
in the original game and gradient text/accented blockquote styling in the blog.
These are real inherited styles, not new Garden styling. They remain part of the
cross-route visual integration work; no blanket detector-clean claim is made.

Internal technical-review snapshot (judgment, not a certification): accessibility
3/4, performance 3/4, theming 2/4, responsive 3/4, implementation integrity 3/4 =
14/20. Primary controls and flows are verified; mixed legacy styling, incomplete
device/game-path coverage and partially hard-coded surface colors prevent a
finished-site claim.

## Remaining before a final site

- Unify blog/project detail presentation and return navigation with the accepted
  Garden direction. Their current legacy visuals are intentionally still visible.
- Review the project browsing rhythm against the original's horizontal sequence;
  the four-button selector is functional but a different experience.
- Obtain/produce honest project media for ASR/PPE where useful. Current diagrams
  are labelled method schematics, not invented audio/detection/model results.
- Review duck character, scale and expression with the owner; candidate v1 is not
  approved merely because it has been placed in the prototype.
- Finish physical-device, full-game-path and cross-route visual verification.
- Remove design-comparison controls when a final implementation replaces `/`.

The verified 500 and omitted-content problems were release blockers. They are
fixed in this pass; the remaining integration/coverage items explain why this
must continue to be described as a prototype, not the final portfolio.

Reference captures: `output/playwright/garden-parity-about-{width}.jpg`,
`garden-game-desktop.jpg`, `garden-game-mobile.jpg`, `garden-education-mobile.jpg`,
`garden-blog-fixed-desktop.jpg`. Build retains the existing Next/SWC mismatch and
stale Browserslist warnings; no dependency update was attempted here.
