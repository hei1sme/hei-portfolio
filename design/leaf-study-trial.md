# Two-leaf sculpture trial

## Owner correction: keep the 2D duck

2026-10-28. The owner still finds the procedural 3D strange and explicitly prefers
the original 2D duck. The mesh duck was an unwanted change in visual character;
restore the existing six-frame artwork in the preview, preserving its generated
provenance in `duck-cursor-and-blog-cover.md`. The leaf geometry, right alignment
and current main homepage stay as they were for comparison. This is a small
correction, not approval of the leaf hero. The solid duck helper is removed from
active code; its experiment remains in Git history. The static vector fallback
shows only the botanical illustration rather than a different mascot.

Recommended next comparison: a layered 2D botanical composition with the existing
duck, cobalt shapes and restrained scroll parallax; alternatively a collage of
actual research imagery and personal photography when assets are available.
Preserve the visible research hierarchy and concise identity in either direction.
Neither alternative is selected or implemented by this correction.

Use the original sprite colors without 3D tone mapping. Keep rest breathing,
hover gait, global pause and reduced-motion behavior. Verify the production build,
desktop/mobile render, pause/reduced motion and hover before pushing the preview.

Verification for the restoration: Next.js production compilation, lint and types
passed. Playwright MCP checked the production server at 1440 and 390px: the
original 2D artwork rendered, hover entered run, settled pause and reduced-motion
canvas snapshots matched, and mobile had no horizontal overflow. No console or
page errors occurred in those normal runs. Images/logs are ignored
`output/duck-2d-*`. This is targeted browser QA, not a new visual approval of the
3D leaves or a physical-device test.

## Harmony refinement, 2026-10-28

Owner feedback: the first candidate is too flat and needs a more coherent scene;
move it right into the unused desktop space. Preserve the existing palette and
Manrope, content and default `/`. Improve the same botanical subject before
replacing it with another decorative object.

Plan: right-shift the candidate by about 6.5vw on desktop, reset that offset on
phones/tablets. A mature split leaf and a younger curled heart-shaped leaf should
share a stem/base, with a continuous front/back shell and bevel rather than ink
outlines. Use cobalt #214ce8, deep blue #18389b, muted underside #718bcd, mist
#edf1f5 and the existing ink #152344. Light should describe the folded surfaces.
Replace the sprite inside this scene with an authored small 3D duck in blue running
kit, using the same lighting, contact shadows and motion controls. Existing duck
artwork elsewhere is unchanged. Keep the geometry-to-points interaction and test
readability at rest as well as in motion. This remains the review URL, not a new
default hero. Verification below the original trial is updated after rendering.

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

The initial implementation used two authored Bezier silhouettes with unequal lobes, five
fenestrations in total, curved surfaces and branching veins clipped to the blade
boundary. Area-weighted samples form an 8,800-point representation of those same
triangulated surfaces. A soft floor shadow and small neutral base replace the pot.
Leaves separate slightly with scroll. No model-training or scan output is implied.

The initial small duck reused `running-duck-sprite-large-v2.webp`, the existing generated
six-frame artwork documented in `duck-cursor-and-blog-cover.md`. It breathes
subtly at rest and cycles its gait on pointer hover. Pause/reduced motion stops
both. It is decorative, so no extra focus stop or mystery button was added.
The loading/WebGL fallback is the authored vector `leaf-study-poster.svg`.

The harmony refinement supersedes those two details: one mature split blade has
three fenestrations; the younger blade is unperforated and rolls along its width.
Front and back are joined by beveled sidewalls, including the holes. Veins sit on
the curved surface normal and remain inside the blade. The muted underside shows
at curled edges. The scene's companion is now authored mesh geometry with ivory
plumage, a blue singlet/visor and running shoes. It uses the same scene lighting
and soft variance shadows; no sprite or texture is loaded by this scene. Existing
sprite art used for the cursor, strip and About is unchanged. The SVG fallback
has also been updated to show the younger blade and small duck.

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

## Harmony verification

- Final production build passed compilation, lint and TypeScript, including all
  22 static pages. Standalone TypeScript passed during implementation. No new
  dependency, research content or CV change was introduced.
- The real local production server was inspected through Playwright MCP at
  320, 390, 834, 901, 1024, 1440 and 1920px. No horizontal overflow was observed.
  At 1440px the scene is shifted 93.6px right; at 1920px it is shifted 110px.
  Touch layouts reset the shift. A dedicated 901–1100px art frame/camera avoids
  cropping the mature leaf on narrow desktop/iPad landscape layouts.
- Final screenshots show the curled young blade, continuous beveled edges and
  grounded mesh duck. Mobile/tablet checks are Chromium emulations, not physical
  Safari/iPad or GPU performance certification. Captures: ignored
  `output/leaf-harmony-final-*.png`; build log: `output/leaf-harmony-build.log`.
- Normal production runs reported no console/page errors. Native duck hover
  entered its run state, mouse dragging changed the paused scene's view, and
  keyboard-operated Explore/points controls worked. Settled pause snapshots
  matched; reduced-motion snapshots matched at every checked width.
- A touch gesture starting over the 390px canvas scrolled 264px. A simulated
  unavailable WebGL context showed the updated SVG fallback and decoded it
  successfully. Expected WebGL-construction diagnostics in that deliberate
  fallback check are separate from normal production console checks.
- `/` retains the original object, its original accessible description and no
  right shift. Four under-review manuscripts and the Experience section remain
  present. Generated local TypeScript directory references were restored before
  committing. Verify the public deployment after pushing this revision.
