# Garden motion proof

2026-10-27. Frontend Design is the lead workflow; Apple Design informs direct
manipulation and React Best Practices informs the isolated heavy scene. This is
a focused opening + selected-work prototype, not a replacement of `/`.

## Composition comparison before implementation

Spatial (`/concepts/garden`):

```
hei.             Research   About   CV   Contact
                  a large cobalt botanical sculpture
Seeing beyond     occupies the right two thirds;
the prediction.   rotate / surface–points controls
short identity
                    scroll pulls scene upwards
SmokeNet       conference photo → original architecture
               role / scoped result / paper / full project
```

Photography (`/concepts/garden?view=photo`):

```
hei.             Research   About   CV   Contact
               existing conference photograph, large crop
same identity   paper caption anchors it in real research
               paper caption sits on the image edge
same selected-work section, independent of the opening
```

The spatial version is the working candidate because the owner specifically
wants the playful original's energy and botanical movement. The photo alternative
uses real available imagery rather than inventing a personal photography library.
Both keep identity and direct access visible. This is a comparison to review,
not an owner-approved final style.

## Tokens and review against the brief

- Cobalt `#214ce8`: main sculpture and feature field.
- Midnight blue `#152344`: text and dark research surface.
- Mist `#edf1f5`: opening background and quiet negative space.
- White `#ffffff`: readable text on cobalt and actual research figures.
- Leaf `#d7ed91`: small supporting botanical accent.
- Typeface: Manrope for human, open forms and strong medium-weight display;
  normal readable body text, no ornamental monospaced metadata.

Avoid another boxed neural network or a pale dashboard. The distinctive object
is a procedurally constructed botanical sculpture. Surface and point views show
two real representations of the same geometry, not AI inference or attribution.
Its movement can be playful without claiming a scientific finding. Details and
controls must explain that boundary without cluttering the opening.

SmokeNet uses the existing conference photo and original architecture figure.
The first paper, authorship, published status and held-out result stay explicit.
The severe-event backtest is a different result and must remain distinct.
Other project and complete-profile access stays available in the prototype.

## Verification

Implemented at `/concepts/garden`; photo alternative uses `?view=photo`. The
comparison controls at the bottom switch between them and link to the original.
The original `/` and earlier concepts remain available.

Checks completed on the local production server:

- Production build passed, including lint/type validation. Separate targeted
  lint and TypeScript checks also passed. The build still reports the repository's
  existing Next/SWC version mismatch and stale Browserslist warnings.
- Visually reviewed rendered desktop (1440 px), tablet (768 px), phone (390 px)
  and narrow phone (320 px) captures. Fixed the tablet heading/scene overlap and
  narrow-phone contact clipping, rebuilt, and visually reviewed both fixes.
- No horizontal document overflow at those checked widths. Contact remained
  inside the viewport after the fix. The canvas intentionally extends outside
  its composition and is clipped without changing document width.
- Surface/points switching worked with pointer, Enter and touch; pointer dragging
  changed the scene while ambient motion was paused. Rotation has a button for
  keyboard/touch users. A simulated native vertical touch gesture starting over
  the phone canvas scrolled the page by 205 px.
- Reduced motion produced an unchanged canvas across successive captures.
  Preference changes are subscribed through `useSyncExternalStore` with a stable
  server snapshot. This fixed an initial reduced-motion hydration mismatch.
- First Tab reached the skip link with a visible outline. All four project
  selectors, architecture switch, ASR detail expansion and bibliography disclosure
  worked. Four publication/manuscript entries were present.
- Playground entry and Escape closure worked, with focus restored to its trigger.
  Its complete legacy game sequence was not regression-tested in this pass.
- Fresh production browser context reported zero console/page errors and zero
  warnings for the checked main interactions. This does not claim a site-wide
  audit of the original portfolio or every unrelated route.
- SmokeNet, MERR-GAT and PPE project URLs plus the CV returned HTTP 200.

Captures in ignored `output/playwright/`:
`garden-final-desktop.jpg`, `garden-final-scroll.jpg`, `garden-final-work.jpg`,
`garden-final-320.jpg`, `garden-final-390.jpg`, `garden-final-768.jpg`,
`garden-final-mobile-work.jpg`, `garden-final-photo.jpg`, and
`garden-final-mobile-photo.jpg`.

Subsequent owner feedback: Sculpture is liked for further development. The owner
adds a liking for ducks and asks for stronger parity with the original. Follow-up
changes and checks are tracked in `garden-function-parity-audit.md`; the earlier
claim that the complete legacy game was not tested applies to that earlier pass.

Review judgment: this establishes an actual interactive visual candidate and
restores a playful object on the first phone screen. The sculpture is deliberately
stylized and the page still uses a split composition on desktop; neither is proof
that the owner's aesthetic is solved. The photo alternative is quieter. Broader
content migration and further art direction should follow feedback on this
working candidate. No owner approval or final redesign completion is claimed.
