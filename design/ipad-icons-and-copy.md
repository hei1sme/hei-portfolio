# iPad icons, controls and copy — 2026-10-27

The owner supplied iPad/Safari photos showing the logo's star and outbound arrow
as colored emoji. He requested consistent icons, fewer motion controls, a review
of page density, and a Humanizer pass.

## Icons

The glyphs `✳` and `↗` depended on the device's font/emoji rendering. Active
homepage, welcome, shared chrome, blog, case studies and 404 now use the shared
`Icon.tsx` SVG component. Decorative icons are hidden from assistive technology;
link and button names remain ordinary text. Mathematical/method arrows within
research descriptions remain text because they carry meaning rather than serve
as interface icons. The cursor hint now says Open rather than showing a glyph.

## Motion and pacing

Hero controls and the ribbon pause button have been removed. Explore contains
Replay welcome, Sculpture points and Rotate sculpture, including keyboard access.
Touch users get a hint pointing to those controls instead of instructions for
mouse dragging. One 44 px Pause motion control is available across public pages.

`PortfolioMotion` shares pause and system reduced-motion state. Pause stops the
sculpture's ambient loop, ribbon travel/gait, About duck and decorative cursor.
It survives in-app route changes. System reduced motion also hides the redundant
control, disables welcome replay and leaves the scene settled. Main content is
never gated by the motion preference. Footer padding leaves space for the control.

An accessible stop mechanism is retained because the ambient motion starts
automatically and continues alongside content:
[WCAG 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide).
The welcome still has immediate Skip and lasts under five seconds.

## Humanizer

Installed from [blader/humanizer](https://github.com/blader/humanizer), commit
`8c307f367c91bd974002f10f2be2965d642c13df`, version 3.1.0, MIT. The upstream
files/license are preserved and hashed in `.agents/skills/SOURCES.json`.
The skill was read and applied in this pass, rather than merely installed.

The copy pass covered the welcome, homepage introduction/About/contact,
publication contribution, journey, toolkit, writing-index intro, shared footer,
404, and selected SmokeNet/MERR explanatory prose. It removes staged closers,
vague motivational language and duplicate manuscript teasers. The owner's duck,
running, gym and photography interests stay. Personal blog-body text and YAML
metadata are preserved; the article was not silently rewritten as a new account.

All publication titles, authors, roles, statuses, dates, project summaries,
metrics and tool names remain visible or in their original case studies. The
shared factual records are unchanged. In SmokeNet, the held-out and smoke-event
results are explicitly separate; a claim that chronological CV guarantees no
leakage was replaced with its actual ordering property. MERR still reports
ongoing experiments without a final accuracy claim.

The page keeps the selected blue Sculpture direction. Density is reduced in the
surrounding copy and controls while research evidence stays easy to scan.

## Verification

The final production build, lint/type validation, standalone TypeScript and diff
checks passed. The targeted Impeccable source detector returned `[]`. Case-study
frontmatter and `portfolioData.ts` were compared with the prior commit and remain
unchanged.

Chromium checked every public content route plus the 404 page: all have SVG brand
marks and no decorative star/outbound/rotate Unicode glyphs. Normal routes return
200; the intentionally missing route returns 404 (with its expected resource
console message). The four project summaries and three manuscripts remain. The
Explore menu, replay, points, rotate, playground/Escape, shared pause/resume and
pause retention through in-app navigation worked. No ordinary-path page/console
errors were recorded.

WebKit 26.6 was run separately from the Chromium MCP with iPhone 13, iPad Pro 11
portrait and landscape device profiles. SVG marks/arrows rendered in the intended
color, with no horizontal overflow. Pause froze ribbon travel; Tab produced
visible focus; reduced motion stopped the ribbon and hid the redundant control.
There were no recorded page/console errors in those runs. Screenshots were taken
after the sculpture opening settled and visually inspected; the earlier
mid-opening capture was not treated as a missing-art defect.

Captures in ignored `output/playwright/` include `ipad-fix-desktop.png`,
`webkit-iphone-13.png`, `webkit-ipad-pro-11.png`,
`webkit-ipad-pro-11-landscape.png`, the corresponding publication captures and
`ipad-svg-header.png`. These are browser/device-profile emulations on Windows,
not claims of testing on the owner's physical iPhone or iPad.
