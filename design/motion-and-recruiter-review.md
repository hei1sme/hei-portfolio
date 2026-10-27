# Motion and recruiter review — 2026-10-27

The owner finds the completed route integration too static and asks for a styled
cursor, a smooth motion strip, a full content review and removal/reworking of old
side scrolling. Keep Frontend Design as the lead workflow; use Emil Design
Engineering for interaction timing and feedback.

## References and decisions

Primary sites were opened and rendered in fresh browser contexts:

- [Keita Yamada](https://p5aholic.me/): a living graphic surface beside readable
  navigation. Borrow the separation of an expressive surface from factual text;
  do not borrow the monochrome world or private code.
- [Rauno Freiberg](https://rauno.me/): oversized spatial panels. Borrow the feeling
  of movement between visual surfaces, without adopting an essay-like homepage.
- [Dennis Snellenberg](https://www.dennissnellenberg.com/): large moving type and
  direct manipulation cues. Borrow rhythm and contextual feedback, not identity.
- [Bruno Simon](https://bruno-simon.com/): official page documents direct control,
  quality and recovery controls. The WebGL world did not render in the short
  headless capture; do not claim a completed visual/interaction review of it.

Use the existing cobalt, ink, mist, white and leaf palette and Manrope. Add one
full-width ink filmstrip after publications: large “Keep asking / Keep moving”
type with real research figures, conference image, portrait and the existing duck.
It runs gently, responds to vertical scroll velocity, and can be dragged directly
or stepped with arrow keys. It must not hijack vertical scrolling or conceal
research. Pause/reduced motion, visibility and keyboard focus stop automatic motion.

| Before | After | Why |
| --- | --- | --- |
| Contextual solid cursor label only | Small outlined follower with damped movement, press feedback and contextual expansion | Give the pointer a consistent identity while keeping the native pointer |
| Purple gradient custom scrollbar | Native scrollbar | Remove the verified inherited chrome; keep usable scrolling |
| Motion concentrated in hero | One authored image/type strip plus responsive project previews | Add a second visual beat without animating every paragraph |
| GitHub profile only | Verified project repositories at publication/summary/case-study entry points | Let recruiters inspect implementation directly |
| Wav2Vec 2.0/GATv2 MERR description | WavLM + Compact Conformer, BERT/RoBERTa and GAT | Owner explicitly confirmed the current repository direction |

## Content evidence

Core hiring/lab information is present: identity/affiliation, interests, published
paper and three under-review manuscripts, roles, methods/evaluation scope, four
cases, degree/GPA, research leadership, tools, CV, email and academic profiles.
This does not establish that every career experience or experimental result is
documented. Do not describe the content as exhaustively complete.

Verified public project repositories, pinned on the owner's GitHub profile:

- [SmokeNet](https://github.com/SpeedyLabX/melbourne-air-quality-forecast).
- [Conformer–GAT SER](https://github.com/SpeedyLabX/ser-conformer-gat-xai).

The SmokeNet README contains an older planning description; it does not supersede
the owner's published-paper status. The SER repository describes WavLM/Compact
Conformer, unlike the previous portfolio description. The owner confirmed updating
to the repository direction in this session. Keep the old MERR figure as a
historical asset, and show a new labelled architecture schematic rather than
misrepresenting the old figure as current measured evidence.

No verified matching public source was found for ASR/PPE in the public account
lists; do not invent repository links. The public GitHub profile also contains
newer unpublished-research metrics. Do not copy isolated numbers into a featured
result without the matching protocol and paper context.

An [FCJ/FCAJ internship-report repository](https://github.com/hei1sme/hei-FCAJ-intership-report)
was discovered. Its README names FCAJ Cloud Intern, Team NeuraX and First Cloud AI
Journey at AWS Vietnam, with a January–April 2026 journal plan. The owner says
completion/end status is unclear. The journey now links this program journal
under 2026, without asserting completion, an exact actual end date or a current
AWS employment contract. Other public software such as CheckinEdu exists, but a new selected-project case needs
verified personal contribution and evaluation, not merely a repository title.

## Implementation scope

- The ribbon contains real repository assets and the existing generated-duck
  candidate, whose provenance is unchanged. No reference-site code/media was
  copied. It moves only while visible, stops offscreen/hidden, uses one translated
  track, and loads its remaining images when it approaches the viewport.
- Native vertical scrolling remains intact. Dragging respects the grab offset,
  release carries decaying velocity, and keyboard steps are immediate. A shared
  motion toggle controls both scene and ribbon. Reduced motion starts still.
- The portrait responds gently to scroll; paper/paragraph text does not fade away.
- GPA and expected graduation are visible in the hero. On narrow phones, CV is
  directly available in the header alongside Explore.
- Verified research repositories appear beside project summaries, the published
  paper and case-study entry points. ASR/PPE are not given invented source links.
- SER copy, workflow, figure, methods and case all use the owner-confirmed current
  architecture. It remains in progress, with evaluation metrics rather than a
  fabricated performance claim.

## Verification

Production build, lint/type checks and `git diff --check` passed. Next reports
141 kB first-load JavaScript for the homepage (139 kB before this pass); the new
strip uses DOM transforms, not a second WebGL renderer or another animation
dependency. Impeccable's source detector returned `[]` for the changed surfaces.
Pre-existing Next/SWC and Browserslist build warnings remain.

Fresh Chromium contexts, rather than the user's in-app tab, verified:

| Check | Evidence |
| --- | --- |
| Autoplay and hover | Track transform changed between samples; it remains running under the pointer |
| Drag/release | Native mouse drag changed offset; release continued from −277.771 px to −451.064 px under decaying momentum |
| Pause | Track transform stayed identical across samples after Pause |
| Keyboard | Arrow step changed position immediately, then the focused strip remained still |
| Offscreen | Transform stayed identical after scrolling the strip away |
| Reduced motion | At 320, 390, 430 and 768 px, track remained still automatically and Pause was disabled with the reduced-motion label |
| Touch | CDP native touch dragging changed strip position at all four widths; dragging state reset after release |
| Ordinary scrolling | Starting a vertical touch gesture inside the strip scrolled the page by 364–385 px across the tested widths |
| Responsive | No horizontal page overflow on homepage or current SER case at the four widths; desktop 1440 px also checked |
| CV | Direct header CV is visible on the narrow-phone layout at 320/390 px |
| Content | Four project summaries, three pending manuscripts, two project-repository links and the cloud-journal link present |
| SER | WavLM/current schematic and repository links render; workflow highlights Python/PyTorch/Transformers/XAI/SHAP/IG, without carrying the former DiCE assumption into this project |
| Cursor | Rest mode and Drag expansion respond, press feedback works, keyboard use hides the follower; native pointer remains available |
| Scrollbar | Computed scrollbar-thumb background image is `none`, replacing the inherited gradient |
| Routes | Writing and all four cases return 200; external cloud journal returns 200 |
| Runtime | No console warnings/errors or page errors in these normal tested paths |

Desktop/mobile screenshots `output/playwright/motion-*-final*.png` were reviewed.
The initial SVG connector paths inherited a fill and produced triangles; this
was corrected and the final standalone figure was inspected. One early test
waited for lazy offscreen images and timed out; the strip now requests its
remaining images on entering the viewport and the final image check passed.

This is not a physical-device, cross-engine, screen-reader or Core Web Vitals
certification. Public source links make implementation inspectable; they do not
prove the paper's entire evaluation is reproducible. ASR/PPE still lack verified
dedicated public source/demo links here, and full experimental evidence needs
actual artifacts rather than decorative motion.
