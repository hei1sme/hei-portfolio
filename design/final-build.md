# Sculpture: full-site implementation

The owner requested the final build on 2026-10-27. Continue the selected Sculpture
world rather than exploring a new direction. Cobalt #214ce8, ink #152344, mist
#edf1f5, leaf #d7ed91 and white remain the working palette; Manrope is shared.
Hero and real research artifacts carry the visual expression. Paper titles,
roles, statuses, degree/GPA and technical evidence remain readable.

Scope: promote the homepage to `/`; unify all four project cases, writing index
and article; restore visible/copyable contact; introduce contextual pointer
feedback and project browsing controls without replacing normal scrolling.
Keep the sculpture opening, visible publications, tools workflow and optional
playground. Keep concept routes as noindex archives outside public navigation.

Composition: image-led opening → visible publications → four concise project
summaries with on-demand inspector → portrait/duck → journey and education →
visual tools → writing → contact. Case pages pair real figures or labelled method
diagrams with the original MDX and explicit evaluation scope. Writing uses a calm
single column in the same identity.

No invented repositories, benchmark outputs, availability dates or photographs.
The duck retains its recorded generated provenance; placement is not an approval
of human authorship. No mandatory loader, hijacked page scrolling or hidden papers.

Verification and remaining limitations are recorded after the build below.

## Implementation

- `/` now composes the Sculpture homepage. The previous Garden preview redirects
  to it; public navigation does not expose design comparisons.
- Shared navigation, typography, colors, footer and focus treatment cover Writing,
  articles, all four cases and 404/error presentation. Case return links go to
  `/#garden-work`, rather than a separate legacy homepage.
- All four summaries stay visible. The optional inspector opens from each row,
  with direct project selection, previous/next, arrow keys and touch swiping.
  Extended project information is also available on real case-study URLs.
- The ASR case was added using only the existing architecture, role, corpus size
  and reported WER/CER; the missing complete evaluation protocol is explicit.
- Preserved existing MDX bodies. Updated SmokeNet's status to published and used
  its actual architecture asset. Clarified that MERR attention is not a causal
  explanation and that its benchmark improvement is being tested, not established.
- Added contextual Drag/Enlarge/Read pointer feedback and a maximum 5 px magnetic
  response on primary actions. The normal pointer remains visible. These effects
  are absent for touch and reduced motion.
- Contact again shows the actual email and opportunity wording, with copy feedback
  and an honest failure message if clipboard access is unavailable.
- Added page metadata/canonicals, a generated social preview, sitemap and robots.
  Domain comes from the existing README address; `NEXT_PUBLIC_SITE_URL` overrides
  it for another deployment. No external deployment was performed.
- Loading and failed WebGL use `public/images/personal/sculpture-poster.jpg`, a
  62,724-byte screenshot of the actual procedural Three.js scene (not generated
  illustration or a plant photograph). Failed 3D controls are disabled.

## Verification

Production compilation, lint and type checks passed. All pages are prerendered,
including the four cases and current blog article. Homepage first-load JavaScript
is reported by Next as 139 kB; case pages 111 kB and the article 106 kB. These
bundle figures are not device-performance or Core Web Vitals measurements.

Fresh Chromium contexts verified:

| Check | Observed result |
| --- | --- |
| Routes | Homepage, four cases, Writing, actual article, CV, robots, sitemap and social PNG return 200; unknown project returns 404 |
| Preview bookmark | `/concepts/garden` redirects to `/` |
| Public navigation | ASR case → All projects returns to `/#garden-work`; article → All writing returns to `/blog` |
| Content | Four summaries and 25 tool/method names present; inspector starts closed; no comparison toolbar; real article body renders |
| Viewports | All seven public HTML routes checked at 320, 390 and 768 px plus desktop 1440 px; no horizontal overflow or clipped h1 |
| Keyboard | Visible skip link, working Enter and menu Escape; Inspect moves focus to the selected detail; ArrowRight changes project |
| Pointer | Contextual Drag hint appears over the sculpture while the ordinary pointer remains grab; magnetic action moves up to 5 px and resets on leave |
| Touch | Chromium CDP native touch sequence changed SmokeNet to MERR-GAT by swiping the inspector figure |
| Tools | Project selection updates documented highlights; prior workflow checks remain applicable |
| Clipboard | Clicking Copy email writes the exact address and announces success |
| Writing search | No-match state appears and Clear search restores the actual article |
| Opening | Replay enters assembling; Pause reaches settled; reduced motion starts settled |
| Fallback | Disabling WebGL yields the real scene poster, readable research and disabled 3D controls |
| No JavaScript | Identity, published paper, all tool names and CV remain server-rendered and available |
| Playground | Duck entry, skip to the real game, movement/firing, progression through waves 1–4 to the boss, defeat and Escape close exercised; focus returns to the duck |
| Runtime | No console/page errors in tested normal public navigation; the intentional missing-route request logs its expected 404 |
| Source detector | Impeccable scan of Garden, shared portfolio components, blog, project pages and homepage returned `[]` |

Desktop/mobile screenshots in ignored `output/playwright/final-*.png` were
visually reviewed. Browser emulation is not physical-device testing. No Safari,
Firefox, exhaustive screen-reader audit, slow-device performance measurement or
boss victory/completion screen is claimed. The automated touch playthrough was
defeated at the boss; this is not represented as a verified victory path.

Build retains pre-existing Next/SWC version-mismatch and stale Browserslist
warnings. No dependency update was folded into the redesign. The local production
server is started with Next's normal start command on port 3000; this is a local
review build, not a change to the existing online deployment.
