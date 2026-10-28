# Layered botanical illustration

2026-10-28. Owner selected “Layered 2D botanical illustration” after rejecting
the procedural 3D's appearance and preferring the original doodle duck. Build a
complete integrated hero for the main `/`, also selectable with `?scene=botanical`.
Keep the original potted object at `?scene=sculpture` and the earlier
`?sculpture=leaves` comparison. Direction selection authorizes this implementation;
it does not lock every art detail against later feedback. Frontend Design leads, with React
Best Practices for the lightweight animation implementation.

## Plan and critique before implementation

Keep the existing Manrope identity, qualifications, concise research introduction,
CV actions, first-paper link and immediately following publications section.
Palette: mist #edf1f5, ink #152344, cobalt #214ce8, deep blue #183caa,
blue haze #a8c2eb and leaf #d7ed91. Warm color stays in the existing duck artwork.

Illustrate a small urban tropical courtyard, with a breezeblock screen, an open
arched window, asymmetric foliage and a curving running path. Use flat fills,
deliberate ink outlines and open space; avoid simulated ceramic, extrusion,
pedestals and large drop shadows. The original duck remains a small character
in the composition. Three art layers move at different scroll/pointer depths.
The path and duck pace share the existing run/slow/breathe/start rhythm.

```
identity + qualifications                 open courtyard / foliage
research headline                        broad leaves / screen
short introduction                  low planter / curving path + duck
research and CV links
published paper                      scroll continues to publications
```

Left-align the factual copy. The right illustration has its own frame, so art
cannot cover links or the headline. Stack the illustration below the identity
and publication link on small screens. A single coordinated drawing/layer reveal
follows the welcome; content is always usable and scrolling can interrupt it.
Use the existing global motion control; reduced motion shows a settled still.
Do not offer 3D rotation or sculpture-points controls for a 2D drawing.

Critique: another isolated blue leaf would repeat the failed model's composition.
The courtyard gives the foliage and runner a shared graphic setting. Keep it
compact rather than turning the whole website into a game. Research evidence
stays literal and visible, with no invented data labels or fake model outputs.

## Artwork and provenance

The courtyard is authored SVG, with native editable shapes rather than a generated
raster or downloaded model. The duck reuses `running-duck-sprite-large-v2.webp`
and `running-duck-rest-v1.webp`; their generated provenance remains in
`duck-cursor-and-blog-cover.md`. This is decorative illustration, not an actual
photograph, location, field deployment or inference result.

The previously inspected Lynn Fisher 2023 illustrated scene/case study informs
the coherence of character/environment and layered SVG motion. No artwork or
site layout is copied: https://lynnandtonic.com/thoughts/entries/case-study-2023-refresh/

## Verification

- Main `/` and explicit `?scene=botanical` use the new scene. The potted object
  remains at `?scene=sculpture`; `?sculpture=leaves` retains the earlier trial.
  The main page server-renders the matching SVG poster before hydration, including
  when JavaScript is disabled. The interactive scene never creates a canvas.
- Final Next.js 15 production build passed compilation, lint, types and all 22
  static pages. Standalone TypeScript passed after generation; an earlier check
  raced a dev-generated route declaration, resolved by the sequential build.
  Reported main-page first-load JS remains 143 kB. No dependency was added.
- Playwright MCP inspected Chromium at 320, 390, 834, 901, 1024, 1440 and 1920px.
  No document overflow; reduced-motion snapshots matched. The final main/default
  branch was rechecked at 320/390/834/1440px. Mobile research/CV actions precede
  the picture; the illustration is followed immediately by publications in DOM.
- Normal-motion testing observed the opening held behind the welcome, Escape
  dismissal, visible running/gait changes, stopping during the breathing phase,
  correct rest artwork, frozen pause snapshots and successful replay. Explore
  has no sculpture-specific buttons in 2D. Native touch input beginning over the
  art scrolled the 390px page by 251px. Offscreen animation stops.
- The actor shares the middle layer's parallax transform, keeping its feet on the
  route. Gait phase follows distance along the curve; travel speed follows the
  existing run/slow/breathe/start rhythm. Transforms and frame offsets update via
  refs, capped at 30fps; visibility, pause and reduced motion stop the loop.
- The duck uses native SVG image clipping, not a new model or foreignObject.
  Original artwork and provenance are unchanged. The single editable drawing
  exports its own poster with `node scripts/export-botanical-poster.cjs`.
- A local headless WebKit run at 390px / 2× rendered the SVG and original duck,
  with no page errors or overflow. This is engine coverage, not physical iPad or
  Safari certification. Font weight appeared lighter in Windows WebKit than in
  Chromium; no global typography change was made based on that engine difference.
- Fresh production visits reported no console/page errors. The existing welcome
  script intentionally changes root data attributes before hydration; only that
  root now has `suppressHydrationWarning`. It does not suppress descendant bugs.
- One published paper, four under-review manuscripts, all four project summaries,
  Experience and the 200/application-pdf research CV download remain present.
  No paper facts, project metrics, private intake material or CV bytes changed.
- Screenshots/logs are in ignored `output/botanical-*`; the local WebKit runner
  is ignored as well. Production output uses the existing ignored D-drive build
  junction. Generated TypeScript config paths are restored before committing.
  Public deployment must be verified after pushing.
