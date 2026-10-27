# Garden readiness review

2026-10-27. Scope: review the running Sculpture direction against the original
homepage and identify what is still needed for a complete portfolio. This pass
does not redesign the UI or promote the concept route to `/`.

## Verdict

The direction is coherent enough to develop into the full site. It is not a
finished release. Research visibility, the blue sculpture, the portrait/duck and
project-linked toolkit provide a stronger identity than the original generic
neural-sphere composition. The main gap is continuity after the hero: repeated
project information, quieter project browsing and legacy detail pages still
make this feel like a developed concept rather than one complete experience.

This is a scoped Impeccable technical audit plus an original-versus-current
visual review, not the separate dual-assessment `critique` workflow. Context
setup and the source detector ran successfully. The detector returned `[]` for
`app/concepts/garden`; that result does not certify visual quality, WCAG
conformance or the legacy routes.

## Original versus Garden

| Element | Current state | Recommendation |
| --- | --- | --- |
| Mandatory entrance | Replaced with nonblocking point-to-sculpture opening and replay | Keep immediate access to research/CV |
| Cursor follower | Original has two animated followers; Garden uses ordinary pointer/grab | Add a small contextual cobalt ring or Drag/Inspect hint over visual surfaces; preserve the normal pointer and disable the decoration for touch/reduced motion |
| Magnetic buttons | Present in original hero, absent from Garden | Small optional response on primary visual actions; avoid moving text links or making targets difficult to click |
| Horizontal project sequence | Replaced by four visible summaries and an inspector | Preserve summaries; develop a tactile visual browsing interaction with touch and keyboard alternatives, without taking over ordinary page scrolling |
| Published and pending research | Visible immediately after hero, distinguished by status | Preserve exact titles, roles and scoped results |
| Technical depth | Four summaries, inspector, method/evaluation/limitation and case links | Reduce repetition between summaries and inspector; keep evidence visible and put extended discussion in case studies |
| Impact counters | Numbers are preserved in research context/evaluation rather than a looping counter strip | No need to restore counting as a requirement; retain the distinction between held-out and event-specific results |
| Journey, education and tools | Restored; tools now visual and project-linked | Preserve the complete factual content |
| Playground and secret | Restored, including duck entry and `ailab` | Retain as an optional personal detail; full victory/device coverage remains outstanding |
| Contact | Same email destination and social/academic links | Restore the visibly written email and original opportunity wording; consider copy-email feedback for visitors without a configured mail app |
| Blog/case studies | Pages respond, but keep the legacy presentation | Integrate the visual system and return navigation before release |
| Personal imagery | Portrait, conference image, lab wordmark and duck candidate | Additional owner photographs could deepen personal identity; do not invent running photographs or measured model outputs |

## Prioritized findings

1. **P1, integration:** `app/components/SiteShell.tsx` applies Garden only to
   concept routes. Blog and project details remain in LegacyShell. The project
   detail back link in `app/projects/[slug]/ProjectClientPage.tsx` points to
   `/#projects`, returning to the old site. A full visit therefore changes both
   identity and navigation model. Integrate page shells and return paths together.
2. **P2, reading/browsing rhythm:** `GardenPortfolio.tsx` renders the publication,
   four substantial project summaries and the expanded selected-project inspector.
   SmokeNet facts consequently recur. Tighten the presentation rather than hiding
   publication evidence again. Add spatial feedback when inspecting/changing work.
3. **P2, contact parity:** `GardenPortfolio.tsx` has working mailto CTAs but does
   not visibly print the email address or retain the original explicit openness
   to research collaborations, internships and AI community projects. Restore
   these known facts; do not invent current start dates or hiring availability.
4. **P2, completion:** the comparison toolbar and original-site link remain,
   while `/` is still the old homepage. Complete the route migration and remove
   exploration-only controls for the actual release. Finish social preview,
   canonical/indexing decisions and an appropriate not-found experience then.
5. **P2, coverage:** physical mobile performance, multiple browser engines and
   the complete game victory path have not been verified. Current checks use
   Chromium emulation. Measure before claiming broad production readiness.

Cursor styling and additional magnetic/duck microinteractions are **P3 polish**,
not release blockers. Concentrate expression on visual interaction surfaces;
continuous followers over paper text would compete with reading.

## Technical audit snapshot

Scores are reviewer judgments about this implementation, not certification or
instrumented performance results.

| Dimension | Score | Evidence and limitation |
| --- | --- | --- |
| Accessibility | 3/4 | Visible keyboard focus, working skip link/menu Escape, project focus handoff and intentional reduced-motion state; no exhaustive assistive-technology/contrast audit |
| Performance | 3/4 | Three loaded dynamically, pixel ratio capped, GPU resources disposed and rendering guarded by visibility; no physical-device/Core Web Vitals measurement |
| Theming | 2/4 | Garden has base color tokens, but secondary colors are hard-coded and detail routes use the old palette; dark mode is not a requirement |
| Responsive | 3/4 | Current phone interaction/layout checks pass; earlier pass covered 320/390/768/1440 px; physical touch and other engines unverified |
| Implementation integrity | 3/4 | Truthful statuses/metrics, labelled schematics and source detector clean in Garden; cross-route integration remains incomplete |
| Total | 14/20 | Good foundation with concrete integration and coverage work remaining |

## Fresh verification in this pass

- Inspected the original rendered hero and horizontal project sequence, and
  Garden publications, projects, portrait/duck and phone opening screenshots.
- Garden returned 200. Every local hash link resolves. CV, architecture image,
  all three case-study routes, blog index/article and original homepage returned
  200. This checks response status, not the correctness of every external link.
- At 390 × 844 in a touch-enabled Chromium context: no horizontal overflow;
  Tab exposes the skip link with a solid outline, Enter goes to publications;
  Explore opens and Escape closes it; Inspect ASR moves focus to its detail;
  PPE tool selection highlights Python/OpenCV/Streamlit. No recorded console
  errors or page errors in that path.
- Reduced motion begins in the settled state. With WebGL deliberately made
  unavailable in a separate context, the fallback appears while identity,
  the paper signal and CV links remain available.
- No UI source changed in this review, so the prior successful build remains
  applicable; a new compilation was not needed for this documentation-only pass.

Screenshots: ignored `output/playwright/garden-readiness-*.png` and
`original-readiness-*.png`. The legacy homepage also has duplicate section IDs
(`about`, `publications`, `impact`, `skills`, `education`); do not copy that
structure into the final route. This review did not repair the legacy page.

## What full build means

Selecting Sculpture already chooses the direction for continued development.
The word "final" is not a technical switch and does not make the current build
complete. A finished version requires the unified homepage, case-study and
writing experience; the remaining contact/content parity and navigation work;
interaction polish; then appropriate route/device/accessibility/performance
verification. Actual deployment is a separate action from completing that build.

Recommended sequence: integrate the page system and navigation, tighten project
browsing and restore contact parity, add contextual interaction details, then
perform the final polish and release checks. Avoid reopening concept exploration
or covering these gaps with more decorative particles.
