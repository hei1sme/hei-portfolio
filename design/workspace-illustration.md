# Workspace hero comparison

2026-10-28. The owner supplied a photograph of their desk and explicitly asked
to preserve the current botanical hero. Keep `/` and `?scene=botanical` unchanged.
Build the workspace only at `?scene=workspace`, with no comparison toolbar.
The exact pre-workspace source is tagged `hero-botanical-backup-2026-10-28`
(commit `100abc9`). BotanicalDrawing and its poster remain intact.

## Art plan and critique

Frontend Design leads. Retain Manrope and all current hero text/actions. Palette:
mist #edf1f5, paper #f7f9fb, ink #152344, cobalt #214ce8, haze #a8c2eb and
leaf #d7ed91. Compose a flat ink-outlined desk illustration within the existing
right-hand hero frame; stack below the identity/CV on smaller screens.

Use recognizable details from the supplied photo: laptop on the left, larger
monitor behind/right with a light bar, separate mechanical keyboard, mouse,
tumbler and angled desktop. Reinterpret in blue rather than matching the photo's
wood tones. Tropical plants frame the left/right corners; they are an artistic
addition, not something claimed to be visible in the photograph. Keep the
original running duck on the foreground path and existing layered motion.

```
identity / qualifications           light bar / large monitor
research headline              laptop / foliage at desk corners
intro and research/CV actions          keyboard / mouse / desk
published paper                       running path / 2D duck
```

Critique: avoid a generic floating laptop icon or a fake analytics dashboard.
Use the owner's distinctive two-screen arrangement, keyboard and tumbler, and
the same perspective/line weight as the courtyard. Screen artwork is a simple
diagram and code-like linework, decorative and without invented metrics. Leave
the wall outlets, chat messages, personal documents and screen text out of the
public art. The source photo is kept privately in ignored `docs/design/`.

Use authored SVG to extend the established vector art, with no new generated
mascot or raster model. Share the existing animation runtime; load the workspace
drawing only for its comparison URL. Respect pause, reduced motion and touch
scrolling. Do not promote it to the default without the owner's selection.

## Verification

### Owner refinement: coherent desk in a forest

The owner likes the workspace but finds the objects scattered and asks for a
forest-like background. Preserve the courtyard default and this comparison URL.
Retain the palette/type above. Rebuild the desktop as one affine plane: origin
(113,455), surface axes (1,-.035) and (.45,.72). Align keyboard and mouse with
these axes, place the tumbler clear of the laptop, and give the phone stand its
own back-right position. Draw the monitor/stand after the desktop and keep every
desk object in the same parallax group so they cannot drift apart on scroll.

Replace the background wash with layered banana leaves, palm fronds, tall stems
and split leaves around a central clearing. Keep distant foliage pale and nearer
leaves cobalt/leaf green; foliage frames the screens rather than covering the
input devices. Put the foreground planter on the ground at the far right. Keep
the running duck/path in front. No additional animation loop or page controls.

Critique before implementation: increasing leaf count alone would leave the
spatial defects intact. Correct supporting surfaces/occlusion first, then use
the forest as a quiet background with a readable desk silhouette. No content,
navigation, original courtyard art or research facts need to change.

Implemented the new surface and draw order. Monitor/stand, laptop, keyboard,
mouse, tumbler and phone holder now share the middle layer with the desk.
The large planter sits on the ground at the far right; its leaves clear the
mouse. The background has pale distant palms, large mid-distance leaves and
deeper blue fronds near the desk. The poster is re-exported from the drawing.

Refinement checks: Chromium at 320/390/834/1024/1440/1920px showed no page/console
errors or document overflow; desktop, phone and tablet screenshots were inspected.
After pointer parallax and a 180px scroll, every desk object's position relative
to the table remained identical to 0.01px. Pause froze the duck and Explore/Escape
retained keyboard focus. Reduced-motion views settle the scene. Headless WebKit
at 390px rendered both duck images and the forest with no page errors/overflow.
Physical iPad/iPhone verification remains an owner check.
The refinement's production build passed lint/types and all 22 generated routes.
Fresh production mobile checks confirmed the forest comparison, original
courtyard default, no console/page errors or horizontal overflow, and research
anchors landing clear of the pill navigation at approximately 120px. Original
courtyard source/poster still match their backup tag exactly.

The new drawing is dynamically loaded only for `?scene=workspace`. It shares
BotanicalIllustration's runtime through optional drawing/description/route props;
their defaults preserve the courtyard. The lower desk route keeps the duck on
the floor rather than crossing the keyboard. Its native 1000 × 800 viewBox adds
space for foliage; all three parallax groups and the duck share that space.

- Chromium views at 320, 390, 834, 1024, 1440 and 1920px had no document overflow,
  page errors or WebGL canvas. Desktop/tablet/mobile screenshots were inspected;
  the right leaves were reframed to fit, and the mouse/keyboard kept visible.
- Normal motion changed duck position and sprite frame, reached breathing/rest,
  then resumed running. Pause produced identical position/frame snapshots over
  700ms. Offscreen animation stopped. Fresh-context checks had no console errors;
  Fast Refresh alone warned when the effect dependency list changed during edits.
- Touch input beginning over the illustration scrolled the mobile page. Main `/`
  still loaded the arched courtyard and no workspace drawing. Original drawing
  and poster have no Git diff from their backed-up versions.
- The workspace SVG loading poster is exported from the exact authored drawing.
  This comparison is selected after hydration; without JS the page retains its
  original courtyard poster and all research content/links. No new screenshot
  of the owner's actual desk is public, and no paper/CV facts were edited.

- Headless WebKit rendered the drawing and both duck images at 390, 834 and
  1440px without overflow/page errors. Physical iPad/iPhone inspection remains
  an owner check; Windows WebKit's inherited thin variable-font rendering is
  unchanged by this work.
- Production build passed lint/types and all 22 routes. Main first-load JS remains
  144kB (reported rounded). Fresh production checks confirmed both original and
  workspace scenes, published-paper/research anchors, the new pill navigation,
  and the 200 research-CV download, without page/console errors. Research anchors
  landed at 120px, clear of the navigation. Deployment is verified after pushing.
