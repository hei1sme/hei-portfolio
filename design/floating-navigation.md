# Scroll-responsive navigation

2026-10-28. Owner requested that the top navigation become a clean pill on
scroll, with fluid Apple-inspired motion suited to the existing portfolio.
Apple Design guides interaction; Frontend Design preserves the site's identity.

## Plan before implementation

Keep Manrope, cobalt #214ce8, ink #152344, mist #edf1f5, paper #f7f9fb and the
existing orange focus outline. Use a lightly translucent paper surface, a thin
blue/ink edge and a restrained shadow. No new brand treatment or Liquid Glass
imitation. The wide, transparent top bar becomes a centered capsule after 96px;
it expands again below 40px to avoid threshold flicker. Compact size: up to
820px × 64px on the homepage, 720px on content pages, 60px tall on phones.

Use the same header DOM and links at both sizes. Reserve its original 106/86px
document space, so fixed positioning cannot shift the hero. A critically damped
scalar spring controls width, inset, radius, padding and typography together,
retaining velocity when scroll reverses. This small fixed region changes its
geometry without scaling/distorting the text or relaying out page content.
Only threshold changes start animation; no React state updates per scroll/frame.
Pause/reduced motion jump directly to the functional final state.

Keep 44px hit areas, visible focus, safe-area insets, anchor clearance and all
existing navigation destinations. Use one shared behavior for the homepage and
the blog/project shell. The narrow-screen menu must fit the viewport and leave
room above the global motion button. Outside pointer/focus closes the popover;
Escape retains its existing focus-return behavior. Without JS the header stays
in ordinary document flow. Welcome and native playground dialogs stay above it.

Critique: a large bouncing glass capsule would compete with the illustration.
Keep the motion quick, reversible and calm, with readable labels and little
background interference. Do not introduce a second mobile navigation or a row
of duplicate motion controls.

## Workspace illustration follow-up

The owner proposes photographing their actual workspace and using its layout,
screens and plants as inspiration for a simplified cobalt illustration. No photo
has been supplied in this request. Do not invent a depiction of their real desk.
When supplied, study its recognizable arrangement and compose it into the hero;
plants may frame the screen/window/desk edge rather than copying every object.
Keep the original 2D duck and research links. Existing courtyard stays in place
while the reference is pending.

## Implementation and verification

`PortfolioHeader` shares the spring, scroll thresholds and menu dismissal across
the homepage, blog and project pages. Its only animated value is a CSS custom
property on the header; existing links keep their DOM identity. The spring
retains velocity on reversal and stops requesting frames at rest. It also
settles when the tab is hidden. A pseudo-element holds the translucent surface,
so the header does not create a transformed containing block for its popover.

Browser review in Chromium at 320, 390, 834 and 1440px:

- Homepage retains its exact 86/106px hero document position before/after
  contraction. Compact bars measure 296 × 60px on the smallest viewport and
  820 × 64px on desktop; content pages cap at 720px.
- Research anchors land at approximately 120px from the viewport top, clear of
  the header. Menu navigation still opens collapsed destination sections.
- Explore stays within the viewport; Escape closes it and focuses its summary;
  outside clicks close it. All visible header targets remain at least 44px tall.
- Reversing scroll during contraction smoothly returns to the wide bar; the
  40–96px threshold band retains the existing shape. Global pause and system
  reduced motion snap to the correct shape without spring motion.
- Blog and BioListen case navigation fits all four widths. No horizontal
  overflow or homepage page errors were observed. Screenshot review includes
  the expanded header, floating pill and mobile menu.

Headless WebKit also passed homepage geometry/menu/overflow checks at 320, 834
and 1440px without page errors. This is browser-engine coverage, not a physical
iPhone/iPad certification. The previously observed Windows WebKit variable-font
weight rendering remains unchanged. Browser outputs stay ignored in `output/`.

Production build passed, including lint/type checks and all 22 generated routes.
The production server also retained CV-link focus and its visible outline during
contraction. With JavaScript disabled, the mobile header rendered normally at
86px in document flow. No production page errors were observed in these checks.
