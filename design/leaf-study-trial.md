# Two-leaf sculpture trial

2026-10-28. The owner asked to try the proposed replacement for the potted
Sculpture. This is a focused hero-object trial, not approval to redesign the
portfolio or replace the production default. Frontend Design leads; React Best
Practices guides the isolated, dynamically loaded scene.

## Plan before implementation

Keep Manrope and the current identity, research links and page hierarchy.
Palette: mist #edf1f5, ink #152344, cobalt #214ce8, deep leaf #1539aa,
vein blue #456ce0 and the existing leaf accent #d7ed91. The object should read as
two botanical specimens, with different silhouettes and softly curved surfaces.
Use a matte material, fine branching veins and an understated base instead of
the repeating glossy six-leaf plant and nursery pot.

Composition: identity and actions stay left; a tall leaf and a lower, angled leaf
fill the existing right-hand scene. On phones the sculpture follows the identity.
One small existing duck may sit near the base, subordinate to the leaves.

```
identity                    tall, gently curled leaf
headline                angled leaf / fine stems
research + CV                      small base, duck
```

Opening: sampled points assemble onto the same leaf surfaces and materialize.
Dragging changes the view; scrolling separates the two leaves slightly as their
surface becomes points. Explore retains keyboard rotation and the points toggle.
Global pause, system reduced motion and ordinary touch scrolling remain intact.
No extra controls on the hero. No new stock model, generated bitmap or invented scan.
Describe this as procedural geometry, not a real plant scan or AI inference.

Critique before building: a floating island, glowing network or giant mascot would
push this back toward a generic 3D demo. Spend the visual effort on the silhouette,
veins, material and interaction of one composition. Do not add a dashboard or
rewrite the research story to explain a decorative object.

## Review access

The existing sculpture remains at `/`. The candidate uses `/?sculpture=leaves`.
Both use the full current portfolio. Selecting the candidate is not a permanent
visual approval. Browser captures and local build output remain ignored.

## Verification

Implementation uses two authored Bezier silhouettes with unequal lobes, five
fenestrations in total, curved surfaces and branching veins clipped to the blade
boundary. Area-weighted samples form an 8,800-point representation of those same
triangulated surfaces. A soft floor shadow and small neutral base replace the pot.
Leaves separate slightly with scroll. No model-training or scan output is implied.

The small duck reuses `running-duck-sprite-large-v2.webp`, the existing generated
six-frame artwork documented in `duck-cursor-and-blog-cover.md`. It breathes
subtly at rest and cycles its gait on pointer hover. Pause/reduced motion stops
both. It is decorative, so no extra focus stop or mystery button was added.
The loading/WebGL fallback is the authored vector `leaf-study-poster.svg`.

Only the selected scene is mounted after reading the query; a trial visit does
not first create and discard the old WebGL scene. GPU geometry, textures,
materials, observers and event listeners are released on unmount. Rendering is
capped at 30fps/1.6 DPR and suspended offscreen or in a hidden tab. Animation uses
refs/local values instead of React state per frame. The welcome overlay holds
the leaf assembly until its exit; scrolling still interrupts the assembly.

## Verification results

- Final Next.js 15 production build passed compilation, lint, type validation and
  all 22 static pages. Standalone TypeScript also passed during implementation.
  Homepage first-load JS remains 143 kB (reported by Next); no new dependency.
- Exposed Playwright MCP checked the actual local production server. Visual
  captures at 320, 390, 834 and 1440px show no document overflow. Adjusted the
  wide-aspect camera after the first tablet capture clipped the bottom leaf;
  the final 834px capture includes the entire specimen and duck.
- Fresh visit observed assembling → materializing → settled. Direct-link and
  reduced-motion bypasses remain intact. Scroll produced an intermediate
  surface/points blend; pointer dragging changed the rendered view.
- Explore works with Enter/Escape. Points toggling and keyboard rotation work;
  focus returns to Explore with a 3px outline. Paused canvas snapshots were
  identical after settling. Reduced-motion snapshots were identical at all four
  widths. The duck's hover state changed to running and returned to idle.
- A Chromium touch gesture beginning over the 390px canvas scrolled the page by
  269px. This is browser touch emulation, not testing on physical iPad/Safari.
- Simulated unavailable WebGL produced the authored SVG fallback, which decoded
  successfully. Normal production runs reported no console/page errors. The
  deliberate WebGL-disabled check is separate from normal console verification.
- Default `/` still renders the original sculpture and its original accessible
  description. Research keeps four under-review manuscripts; no content or CV
  files changed in this trial.
- Screenshots/logs are in ignored `output/leaf-study-*`. Local output uses the
  existing ignored D-drive junction; generated TypeScript directory references
  are restored before committing. Deployment must be checked separately.
