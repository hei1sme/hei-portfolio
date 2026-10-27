# Duck welcome — 2026-10-27

The owner requested an impressive welcome/loading introduction before the site,
featuring a running duck and his name, followed by updating docs and pushing the
site to the existing Vercel integration.

Keep the selected Sculpture identity: cobalt, Manrope, cream/cobalt runner and
leaf accents. The full name enters in two lines while the six-pose duck crosses
a simple running lane. After 2 seconds the blue surface moves upward over 550 ms,
revealing the actual homepage. No fake percentage or synthetic loading task is
shown. Existing generated duck artwork and its provenance are reused unchanged.

The pre-paint script enables this only on a fresh root visit, once per tab
session. Direct section links, other routes and reduced motion skip it. A
Skip intro button, Escape, Tab, wheel, touch scroll and page scroll can dismiss
it immediately. Tab moves to the existing Skip to research link. The decorative
cursor is suppressed during the welcome. Replay opening replays the welcome
and existing sculpture; it remains disabled under reduced motion.

The homepage is always server-rendered. Without JavaScript the welcome is hidden.
A 4-second boot timeout plus a CSS visibility failsafe cover failed hydration.
No page scroll lock, main-content opacity gate or mandatory asset dependency is
introduced. Storage failures fall back to ordinary content. Intro state lives in
DOM attributes and timers, without a React render loop. StrictMode setup/cleanup
retains initial eligibility until the welcome has actually finished.

Deployment uses the current Git remote and existing Vercel integration. The
verified production address is `https://hei-portfolio.vercel.app`; the older
`-w` address redirects there. The default metadata origin was corrected to match.
Custom-domain configuration remains a separate owner choice.

## Verification before publishing

The production build, lint/type validation, standalone TypeScript and diff checks
passed. The targeted Impeccable source detector returned `[]`. Existing SWC and
Browserslist warnings remain. No dependency changes were needed for the welcome.

Fresh Chromium contexts verified the duck both changes pose and crosses the
lane, automatic dismissal, session-once behavior, replay, Skip, Escape, Tab to
the research skip link, wheel and touch dismissal. Cursor idle breathing resumes
after the welcome. Reduced motion, direct paper links and JavaScript disabled
all bypass it. Blocking the hydration bundles still leaves the server-rendered
site visible after the 4-second fallback. No ordinary-path console/page errors
were recorded.

The welcome fits 1440 × 900, 390 × 844, 844 × 390 and 640 × 320 viewports without
internal overflow. Desktop and portrait-phone captures were visually inspected:
`output/playwright/welcome-desktop.png` and `welcome-mobile.png`. Blog and all
four case routes returned 200, and canonical URLs use the verified production
origin. These are Chromium/emulation checks, not physical-device certification.

All portfolio source, skill attribution, design notes and local MCP configuration
are included in the publishing scope requested by the owner. Local caches,
browser output, private CV source and environment files stay ignored. A pattern
scan of candidate source files found no credential matches; it is not a full
security audit.
