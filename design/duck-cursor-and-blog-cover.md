# Duck cursor and blog cover — 2026-10-27

The owner asks for a running-duck cursor and a blog cover that fits the current
site. Keep the existing Sculpture direction and motion ribbon. Add the duck as
user-driven feedback rather than another continuous ambient effect.

## Art and provenance

The cursor is a six-frame 3 × 2 running sheet generated with OpenAI ImageGen
from the existing `running-duck-v1.png` character reference. It is generated
artwork, not claimed to be hand-drawn by the owner. The prompt preserves the
cream duck, cobalt running outfit/headband, coral shoes and navy doodle outline;
asks for a consistent right-facing gait on actual transparent alpha, aligned
square cells and no background, captions, gradients or motion blur.

Original output: `C:/Users/Admin/.codex/generated_images/01a178cc-c3a6-7562-bc86-8db45cd96134/exec-674bc020-59f8-4112-a4a1-b00cefb64d38.png`.
It is 1536 × 1024 RGBA with transparent margins. Standard Sharp resizing/encoding
packages it as the 384 × 256 lossless WebP in
`public/images/personal/running-duck-sprite-v2.webp`; the original remains intact.
This is a CSS sprite animation, not a GIF dependency.

The strip and About placements now share `DuckSprite` with the cursor. Their
1152 × 768 WebP is encoded from the same original sheet at quality 90 with full
alpha quality (221,954 bytes), providing retina detail at the larger size.
A 3% top inset removes a neighboring-cell remnant without cutting into the head.

The strip advances gait phase from its actual movement speed: the base cycle is
550 ms, becoming faster with scroll/drag velocity, bounded below at 180 ms and
slowing continuously as the duck tires. Phase
integration avoids restarting the run when speed changes. Facing follows travel;
pause, reduced motion, keyboard focus and offscreen state stop automatic gait
updates with the existing strip loop, without adding a second animation loop.

The About button runs and gently bobs on hover/focus, with a stable hit target.
Coarse touch does not activate hover animation. Global pause and reduced motion
stop it. The decorative cursor is hidden over this button so two ducks do not
overlap. The playground click and focus return remain intact.

The cover is a new native graphic, not an edit of the old cartoon bitmap.
Editable source: `design/assets/curiosity-to-clarity-v2.svg`. Its wandering route
becomes an arrow between Curiosity and Clarity, matching the actual article and
the owner's running/curiosity interests. This is a visual metaphor, not model
output or a scientific plot. Cobalt, ink, mist and leaf match the site. Rendered
with the site's Manrope face for the production asset. Retain the old cover file
as an unused historical asset.

## Behavior

The ordinary pointer remains available. The duck follows with damping, faces
the direction of travel, runs while moving/catching up, and breathes in place
when idle. Hover labels remain outside the character so they stay legible.
Keyboard use, touch, reduced motion, hidden tabs, window blur and open playground
dialogs suppress the decorative follower. No new mandatory interaction is added.

## Verification

Production build, lint/type checks and `git diff --check` passed. The targeted
source detector returned `[]`. The inherited Next/SWC and Browserslist warnings
remain; no dependency update was introduced.

Fresh Chromium contexts checked:

- Pointer movement enters `run` with the sprite animation; stopping returns to
  `idle` with no CSS animation. Sampled background positions change between the
  frame cells, rather than merely translating/bobbing a single still image.
- Moving left sets left-facing; pointer-down has press feedback. Keyboard input
  and opening the playground hide the follower. Search input hover also hides it.
- The effect is absent in reduced motion and in a touch-enabled phone context.
- The sprite and cover return 200 as image/webp and image/png. Assets are
  104,012 and 98,327 bytes respectively. Homepage JavaScript remains reported at
  141 kB by Next; these asset figures are not a device-performance measurement.
- Writing index and article show the new cover; article title/date/author/body
  remain unchanged apart from the image reference and alt text. The homepage
  preview uses the same frontmatter image source.
- Desktop and 390 px phone captures were visually inspected; the two writing
  routes have no horizontal overflow. Normal tested paths recorded no console
  warnings/errors or page errors.

Captures are in ignored `output/playwright/duck-*.png`. This is browser
verification, not physical-device or cross-engine certification.

## Strip and About follow-up verification

Production build/lint/type checks passed after sharing the animation. In fresh
Chromium contexts, the strip pose changed during normal travel; its measured
cycle setting changed from 0.550 s to 0.235 s during a scroll impulse. Dragging
right/left set matching facing directions. Pause froze the strip pose.

About is still by default, runs on hover/focus, and keeps the button bounds
unchanged while its inner artwork moves. Clicking opened the playground, and
Escape restored focus. The cursor follower is hidden over the large duck.
Reduced motion disabled the About animation and kept the strip pose static;
global pause also froze About. The large WebP returns 200. Desktop and a
touch-enabled 390 px viewport showed no horizontal overflow or page errors.
The final desktop capture was checked for the removed neighboring-frame remnant.
Captures: `output/playwright/duck-about-running-final.png` and
`duck-about-mobile.png`. These are emulated-browser checks, not physical hardware.

## Run, recover, repeat

The owner suggested letting the duck lead the ribbon's pace, tire, catch its
breath, and continue. `duckRhythm.ts` supplies an active-time cycle: run for
6.8 seconds, decelerate over 1.2 seconds, breathe for 2.6 seconds, and accelerate
over 0.9 seconds. During the breath both the ribbon and running gait stop; a
small caption explains the break. Dragging resets the cycle and responds 1:1,
and arrow keys still step immediately. Pause, hidden/offscreen state and keyboard
focus suspend automatic progress rather than skipping to a later phase.

The About duck uses the same cycle with a shorter run and rest while hovered or
keyboard focused. Its hit area and playground action stay fixed. Leaving resets
it. The cursor uses a smaller recovery after sustained movement, but its position
continues following the pointer throughout the rest. When the mouse stops it
breathes in place using CSS, with no ongoing JavaScript position loop. These behaviors
are confined to the character and decorative ribbon, not the main content.

The resting pose is also ImageGen artwork, derived from `running-duck-v1.png`;
it is not represented as an owner-drawn illustration. Original output, retained:
`C:/Users/Admin/.codex/generated_images/01a178cc-c3a6-7562-bc86-8db45cd96134/exec-839f1f19-a157-45a7-a367-3374f16aea91.png`.
Sharp resized/encoded it as `public/images/personal/running-duck-rest-v1.webp`,
384 × 384 RGBA, 26,210 bytes. It shows both feet planted and wings on hips;
a subtle scale cycle anchored at the feet supplies breathing. No new animation
dependency or GIF was added. Reduced motion disables the motion.

Verification of the recovery cycle: production build (including lint/types),
standalone TypeScript and `git diff --check` passed. Fresh Chromium contexts
observed a constant strip transform during breathing and movement after restart.
Pause froze both phase and breathing animation. Dragging interrupted a breath
and moved the track exactly 120 px for a 120 px pointer move; arrow keys still
stepped it. About entered breathing and resumed running; after scrolling settled,
its button bounds stayed identical between samples. Click opened the playground
and Escape returned focus. The cursor changed to breathing during sustained
movement, continued following a new pointer position during recovery, settled
idle, and hid for keyboard use. In a touch-enabled 390 px reduced-motion context,
the strip was static, About had no animation, the cursor was hidden and the page
had no horizontal overflow. Tested normal desktop and reduced-motion phone paths
recorded no page errors. Desktop strip/About and phone screenshots were inspected:
`output/playwright/duck-rhythm-strip.png`, `duck-rhythm-about.png`,
`duck-rhythm-mobile-reduced.png`. These are Chromium emulation results.

Latest cursor refinement: any stationary pointer now leaves the duck breathing
continuously, even after a very short move. Once caught up, its JavaScript RAF
stops while CSS handles the breathing. Moving again resumes running; sustained
movement can still trigger the existing fatigue recovery. Production build,
lint/types and diff checks passed. Fresh Chromium checks observed changing
breathing scale at a fixed position, breathing persisting beyond the old 1.8 s
recovery, and running on the next movement. Keyboard and reduced motion hid the
follower; a touch-enabled 390 px context also hid it with no horizontal overflow.
No desktop page/console errors were recorded. Desktop capture inspected:
`output/playwright/duck-cursor-idle-breath.png`.
