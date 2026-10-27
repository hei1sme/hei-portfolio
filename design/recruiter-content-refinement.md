# Research visibility refinement — 2026-10-27

The owner authorized the improvements discussed after reviewing the Sculpture
site, then explicitly deferred unavailable research figures and demos. Missing
inputs and continuation steps are tracked in `notes/portfolio-backlog.md`.

This pass preserves the existing palette, type, Sculpture, duck behavior, four
project summaries and published/under-review distinction.

- Paper identity, authorship, reported evaluation and paper/code links come
  before the architecture in source and phone layout. Desktop keeps the
  architecture on the left using named grid areas. Contribution and methods
  remain visible; no disclosure is introduced.
- A short hero line names both research internships and AI/ML engineering
  opportunities, following the owner's stated audience. No start date or
  location preference is invented.
- The journey's first-paper milestone focuses on its place in the research
  journey and links back to the full publication rather than repeating its
  authorship and external paper action. The lab summary links to the lab repo.
- No new benchmark, forecast, XAI output, PPE detection or ASR sample is created
  without an actual project artifact.

The public SmokeNet tree and EDA notebook were read without executing notebook
code. The notebook includes data-analysis plots, not the missing prediction or
attribution results. Existing reported metrics remain scoped as before.

## Verification

Production build (including lint/types), standalone TypeScript and diff checks
passed. The targeted Impeccable source detector returned `[]`. Existing SWC
version and Browserslist warnings remain; dependencies were not changed.

Fresh Chromium inspection confirmed the desktop figure/content columns remain
side by side. At 390 px, the title, author role, evaluation and paper/code
actions all precede the architecture in DOM and visual layout. All four project
summaries and three under-review manuscripts remain. Keyboard focus reaches
Read published paper, then Methods & results, with visible focus. The journey
link reaches `#garden-published-paper`; CV and the three checked project routes
return 200. Reduced motion still hides the duck follower. No page or console
errors were recorded during the targeted checks.

Viewport checks at 390, 900, 901, 1024 and 1440 px showed no horizontal overflow.
At desktop sizes, the new availability line leaves the hero paper link clear of
the bottom sculpture controls. Desktop hero/publication and phone publication
screenshots were visually inspected in ignored `output/playwright/`:
`content-refinement-hero-desktop.png`, `content-refinement-paper-desktop.png`,
`content-refinement-paper-mobile.png`. This is Chromium emulation, not a
physical-device or cross-browser certification.
