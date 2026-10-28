# Workspace selection and interaction review

2026-10-28. The owner selects the forest workspace as the main hero and likes
the pill navigation's clean motion. Review every public content route and apply
similar restraint to useful interactions. Apple Design leads behavior; Emil
Design Engineering supplies targeted interaction review.

Keep Manrope, cobalt/ink/paper/leaf colors and all research facts. `/` must now
use the workspace and its matching pre-hydration poster. Keep `?scene=botanical`
and the existing original-hero Git tag as the courtyard backup. Earlier 3D
comparison URLs remain available. Do not add a comparison toolbar.

| Before | After | Why |
| --- | --- | --- |
| Explore menu opens abruptly | Short fade/settle anchored beneath its trigger | Connect the menu to the pill without delaying dismissal |
| Native disclosures jump between heights | Interruptible measured expansion on pointer activation | Keep surrounding content visually connected; keyboard/direct anchors remain instant |
| Project selection uses unrelated filled buttons | One moving selection surface within the existing project picker | Track which project is selected without adding controls |
| Copy button has no visual completion state | Stable-width label/check feedback, with the existing live status | Confirm success without shifting surrounding content |
| Article and project reading has no progress cue | Thin scroll-driven progress line in the shared shell | Orient readers on long pages without moving paragraphs |
| Cover hover can remain transformed on touch/pause | Fine-pointer-only image emphasis and small deliberate press feedback | Keep touch, keyboard and global pause predictable |
| Large research figures and long prose | Keep static; retain ordinary enlargement/source links | Motion would make evidence harder to inspect |
| Toolkit highlights change abruptly; workflow trace ignores pause | Brief color feedback; trace respects pause/keyboard | Keep tool selection consistent with the rest of the site |

Use existing native elements and progressive enhancement. Disclosures retain
their actual open state, native keyboard behavior and no-JS availability. Never
wait for an exit animation to navigate. Changes in selection can be reversed
from their presentation values. Motion is disabled by system preference/global
pause; keyboard interaction stays immediate. No scroll hijacking, full-page
transition gate, autoplay on reading paragraphs, or new animation dependency.

Review scope: homepage, writing index, published article, all seven project
cases and not-found state. `/concepts` contains archived alternatives outside
the public navigation and receives a regression check, not a style rebuild.

## Implementation and verification

`PortfolioInteractions` shares native disclosure/menu enhancement, input-mode
tracking and article/case reading progress across the public shell. Pointer
disclosures animate height for 240ms from their current presentation height;
rapid reversals cancel the old animation and restore its inert children before
retargeting. Closed content becomes natively closed after settling. Keyboard,
direct links, pause and system reduced motion retain instant native behavior.
Tab hiding/navigation cleanup settles all pending expansions. Menu opening is
180ms from its top edge; dismissal/navigation never waits on an exit effect.

`ProjectPicker` measures a single selection surface and follows wrapping/font
changes with ResizeObserver. Selection keeps the existing pressed-button semantics
and arrow controls. The old 420ms image wipe is replaced with short opacity
feedback on pointer selection, disabled for keyboard/pause/reduced motion.
Copy confirmation keeps a constant 132px button width, announces success in the
existing live region and retains failure guidance. Reading progress is a ref
update once per scroll frame, not React state or a page entrance animation.

## Verification

- Next.js production build passed compilation, lint/types and all 22 generated
  routes. No dependency was added. Browser assets/logs stay ignored under
  `output/motion-review/` (a local junction to the D-drive QA workspace).
- Chromium at 390 and 1440px checked homepage, writing index, published article,
  all seven project cases (SmokeNet, MERR-GAT, Vietnamese ASR, PPE, NutriTrack,
  BioListen, CosmicOptic), not-found, and all three archived concepts: 28 route
  checks, expected 200/404 statuses, no page errors or document overflow. Main,
  writing, article and representative case screenshots were visually inspected.
- Normal-motion tests observed menu entry, disclosure expansion/reversal/close,
  native Enter behavior with no running animation, project selection at wrapped
  mobile and desktop widths, pause/reduced-motion selection with zero transition
  duration, and reading progress reaching 1 at the bottom of the article.
- Copy success changed the label to Copied without changing 132px width. Writing
  search/no-results/Clear search restored the published article. Explore Escape
  returned focus to its summary. Native disclosure content and research remain
  available without JS, with the workspace poster as the server-rendered hero.
- Headless WebKit at 390px passed pointer disclosure animation, immediate
  keyboard close, wrapped project indicator and article progress with no page
  errors/overflow. This is engine coverage, not physical iPad certification.
- The archive review exposed a pre-existing reduced-motion hydration mismatch in
  TechnicalPortfolio: Framer's initial client preference changed server text.
  It now uses useSyncExternalStore with a matching server snapshot; all three
  archived routes passed reduced-motion production checks. Their design is unchanged.
- Courtyard remains selectable at `?scene=botanical`; its source and poster are
  preserved, as is the Git backup tag. Paper facts, project evidence and CV files
  were not edited. Deployment is verified separately after pushing.
