# Blue Canopy: concept prototypes

Three working directions, created 2026-10-26. These are reviewable prototypes,
not an approved replacement for the existing homepage. No deployment performed.

## Open locally

Start the app from this repo, then visit:

- `/concepts/courtyard`: an architectural split composition, large blue type,
  arched garden image, small physical note, modest scroll parallax.
- `/concepts/lens`: centered typographic opening, wide photographic field,
  adjustable framing, and a contrasting blue research section.
- `/concepts/trail`: a looser photographic collage, personal portrait, continuous
  path motif, serif display type and an informal exploration theme.

The sticky comparison navigation switches between concepts. `/concepts` redirects
to the first. Existing homepage, blog, CV and project URLs remain available.

If npm is absent in this environment:

```powershell
python scripts/bootstrap-portfolio-tools.py
node .codex/tooling/npm/bin/npm-cli.js ci --no-audit --no-fund
node .codex/tooling/npm/bin/npm-cli.js run dev
```

## Design decisions

- Palette: cobalt `#245AE8`, ink `#142C40`, daylight `#F7F9F7`, pale blue
  `#EAF0F7`, foliage `#355F49`. Trail uses a pale green ground `#EDF2ED`.
- Type: Figtree for the main interface and clear, energetic body/headline text;
  Georgia for Trail's full display heading and the physical photo/note captions.
  Avoid single-word italic accents as a recurring headline formula.
- Courtyard alignment is predominantly left; Lens creates a centered visual
  field; Trail uses asymmetry and overlapping images. Below the opening, the same
  SmokeNet content is shown for a fair comparison.
- Replaced the initial single-word italic headline treatments after reviewing the
  first captures; distinguish concepts through composition and whole type roles.
- Botanical character comes primarily from a composed image, natural light and
  the space around it. Simple sprout motifs are secondary accents.

Rough compositions:

```text
Courtyard                     Lens                         Trail
name / navigation             name / navigation            name / navigation
headline | arched garden      centered headline            headline | photo collage
intro    | note               wide image + framing         CTA      | portrait
selected research             intro / research             winding path / research
```

## Functionality

- All concepts use the same research section with keyboard-accessible tabs for
  question, system and evidence, a real architecture image, case study and paper.
- Outside-the-lab copy derives only from the owner's interview; the portrait is
  the existing `public/profile.jpg`.
- CV, GitHub, LinkedIn and email are real links from the existing repo.
- Scroll motion uses a single passive listener and requestAnimationFrame; the
  image shift is bounded. There is a pause toggle and a static reduced-motion
  equivalent. There is no mandatory intro, autoplay audio or scroll hijacking.
- Prototype routes are marked `noindex`. The comparison bar intentionally belongs
  to the review environment and would not ship as the final portfolio navigation.
- The old providers/cursor/lab/navigation are isolated in `LegacyShell`, selected
  by `SiteShell`. They are not mounted for concept routes. The root layout can
  remain a Server Component.

## Imagery and provenance

Project image: `public/images/concepts/blue-courtyard.webp` (1536 x 1024,
approximately 299 kB), generated with the built-in ImageGen tool and converted to
WebP with Sharp. Original generation stays in the user's generated-images cache;
the app consumes the workspace copy. Captioned as a generated concept image.
It is not presented as the owner's home, photography or a real visited location.

Generation prompt:

> Create one photographic art-direction asset for a personal AI research
> portfolio. Wide landscape 3:2 image, no text, no lettering, no UI, no people, no
> logo. A remarkably beautiful contemporary urban tropical courtyard: strong
> cobalt blue plaster walls and a simple architectural opening to a sunlit
> tropical garden, large natural monstera and banana leaves, fern planting, pale
> concrete floor, soft crisp leaf shadows, a narrow reflecting water channel.
> View from shaded interior toward blue sky and foliage. Editorial architecture
> photography, medium format, tactile authentic materials, restrained rich color,
> healthy deep green leaves against Yves Klein blue walls, warm natural sunlight,
> refined realistic photography rather than futuristic or glossy 3D. Dense leaves
> frame right and foreground; a beautiful composed blue wall and tall opening
> left-center. Carefully composed, peaceful but energetic. This is an illustrative
> imagined setting and will be labeled as concept imagery.

The same asset is used across concepts so the choice is about layout and
interaction. Personal photographs would be valuable for the selected final
direction; none have been fabricated as personal history.

## Scope and follow-up

Concepts currently include opening, selected research, personal context and
contact. A full publication index, research chronology, Computer Vision gallery,
personal photo collection and a new project-detail design belong to the next
implementation after the owner chooses a direction.

Production link checking exposed a server-side MDX rendering failure on the
existing project routes (`useState` on null; HTTP 500). Project documents now use
`compileMDX` from `next-mdx-remote/rsc` and pass rendered content as children to
the existing interactive client presentation. Existing document element styling
is retained in `ProjectMdxComponents.tsx`; no research text was changed.

## Verification

- Production build, including lint and type validation, passed after the MDX fix.
  All three existing project routes returned HTTP 200; SmokeNet's Overview content
  rendered successfully in the browser with no page errors.
- Separate TypeScript and scoped ESLint checks passed for the new concept code.
- All three concept routes rendered, with one h1 and no broken loaded images.
- Desktop/mobile captures at 1440 and 390 px reviewed; widths 320, 768, 1024 and
  1440 checked for horizontal document overflow and heading bounds.
- Skip link, keyboard tab switching, image framing, pause control and OS reduced
  motion were exercised in the production server. CV returned HTTP 200; invalid
  concept returned 404; original homepage loaded and blog listing returned 200.
- Initial Next build report: concept routes 116 kB first-load JavaScript; original
  homepage 429 kB. These are bundle reports, not Lighthouse or field performance.
- Screenshots and snapshots live in ignored `output/playwright/`.

Review questions: which composition feels like the owner; which blue/light balance
works; whether the botanical presence is sufficient; and which personal photos
can replace the concept image. Do not select a winner based only on convention.
