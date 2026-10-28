# Owner interview and portfolio reference review

Updated: 2026-10-26. Preparation for redesign; no website UI changed in this pass.

## Confirmed by the owner

- Activities: running, gym, trail running and photography.
- Nature and space: likes plants and urban tropical architecture/interiors.
- Music: chooses music for the task; no specific genre or artist supplied.
- Personality: curious, energetic, funny.
- Color: wants blue. No exact shade or light/dark preference was specified.
- Experience: wants optimization and aesthetic, botanical elements with movement
  linked to scrolling. Existing site feels excessively busy to him and others.
- Research: the first paper matters as the foundation of ongoing research,
  regardless of whether it is his strongest paper. He values explainable AI and
  transparency for people, and also likes Computer Vision.
- Career: research-led, with both AI/ML engineering and research opportunities.
- Personal visual references: still considering; none supplied yet.
- Later feedback (2026-10-27): likes the Sculpture opening and wants it developed;
  also likes ducks and proposes a cute colored running-duck doodle as personal
  character. The prototype is not a final-site approval. The owner explicitly
  calls out missing original content and functions; see the parity audit.

Do not infer athletic results, race routes, location history, photography assets,
favorite plants, musical artists or a specific architectural reference.

## Review method and limits

Opened live websites and primary project/award pages. Inspected desktop browser
captures of Dennis Snellenberg, Sean Halpin, Rauno Freiberg and The Damai at
1440 x 1000. Scrolled Sean and The Damai and captured additional states.
Reviewed Bruno Simon's live page text and its historical Awwwards entry; did not
test the driving experience. Initial captures on some sites caught loading states,
so those were not treated as final designs. This is a focused inspiration study,
not a mobile, accessibility, performance or interaction audit of these sites.

Screenshots are reference records in ignored `output/playwright/`; they are not
licensed assets for reuse. The user-facing links below are the actual sites.
Interpretations and transfer suggestions are our design judgment.

## References

### Dennis Snellenberg

- Site: https://www.dennissnellenberg.com/
- Recognition: https://www.awwwards.com/sites/dennis-snellenberg
  (Site of the Day, 2022-04-04; this historical award is not a claim that every
  current page state is identical to the awarded edition).
- Observed: a large portrait, oversized name, small navigation and clear role
  text. The current hero gives the person a central place rather than relying on
  abstract technological imagery. The award entry identifies parallax,
  transitions and microinteractions.
- Useful here: a real image and confident composition can establish identity.
  Let selected scrolling moments carry the rhythm.
- Boundary: do not replicate his oversized sliding name, portrait arrangement,
  page loader, custom pointer or motion choreography as a package.

### Sean Halpin

- Site: https://www.seanhalpin.xyz/
- Observed: green-toned opening, expressive large type, short personal greeting,
  work/play/notes navigation and generous image-led project panels. At the
  inspected scroll position the work is visibly represented, not just described.
- Useful here: approachable personality can coexist with a professional work
  collection. Reserve room for photography and experiments outside research.
- Boundary: blue is the owner's requested anchor. Do not import the green palette
  or identical rounded project panels as a new template.

### Rauno Freiberg

- Site: https://rauno.me/
- Primary page describes an interaction designer working with Vercel and
  Devouring Details, with craft, projects and field notes routes.
- After loading, the desktop capture shows a large typographic introduction on a
  white panel with a bright yellow circular field and adjacent panels. The first
  sparse capture was replaced with this rendered state in the reference output.
- Useful here: clearly distinguish finished research, experiments and personal
  notes. Study deliberate interaction details as targeted references.
- Boundary: inspect the interaction itself before borrowing a specific mechanism.
  Do not infer motion quality from static page text or screenshots.

### Bruno Simon

- Site: https://bruno-simon.com/
- Historical recognition: https://www.awwwards.com/sites/bruno-simon-portfolio
  (Site of the Day, 2019-11-11).
- Observed in the current page text: an explorable driving world, input controls,
  achievements and quality settings. The historical award explicitly highlights
  3D game project navigation.
- Useful here: a memorable concept becomes coherent when it belongs to the
  creator's work. For hei, interpretability could supply the interaction's idea.
- Boundary: this portfolio serves a creative developer. Making recruiters drive
  through a game to find research would add friction for a different audience.
  Current live world and 2019 award entry are different time snapshots.

### The Damai — adjacent tropical reference, not a personal portfolio

- Site: https://thedamai.com/
- Creator's case study: https://www.dennissnellenberg.com/work/the-damai
- Recognition: https://www.awwwards.com/sites/the-damai
  (Honorable Mention, 2024-01-08).
- Observed: a large tropical architectural scene with plants, water, natural
  materials, light and shadow, with clear content layered over it. The primary
  site credits Dennis Snellenberg, Christy Lammerink, Tom de Koning and
  photographer Nike Schuurmans.
- Useful here: bring the owner's botanical preference into light, image framing,
  material and depth. It need not become a collection of leaf icons.
- Boundary: this is a resort site, not evidence about recruiting or research
  portfolios. Borrow the relationship between nature and architecture rather
  than resort messaging, assets or its full visual identity.

## Updated direction proposal: Blue Canopy

Working title only, not approved branding. A blue-led research portfolio with
the spatial calm of urban tropical architecture, photographic framing and the
energy of an active, curious person.

The main idea is **making things understandable through observation**. It connects
photography, XAI and Computer Vision without claiming the hobbies are research
results. Running/trail supplies a sense of progression, not invented race stats.

### Proposed visual ingredients

- Blue: a substantial cobalt/clear-blue field with pale-blue supporting space.
- Plants: genuine photographic foliage, daylight shadows and selective foreground
  framing. Deep green supports blue rather than replacing it.
- Architecture: intentional negative space, framed openings and a disciplined
  grid behind more organic imagery.
- Personality: brief, warm writing and one or two playful responses. Let the
  research descriptions stay precise and useful.
- Images: prefer the owner's photography and real project artifacts. None of his
  personal landscape/plant photographs have been supplied or found in this repo;
  `public/profile.jpg` and existing research diagrams are currently available.

Initial palette to test, not finalized:

| Role | Candidate |
| --- | --- |
| Main blue | #245AE8 |
| Pale blue field | #EAF2FC |
| Ink | #152C40 |
| Foliage | #355F49 |
| Neutral daylight | #F8FAFC |

Typography proposal: test a humanist sans such as Figtree for clear, energetic
headlines and body text; use scale/weight/composition before adding a decorative
second family. Verify glyph coverage and the license before bundling any font.
Do not assume a serif editorial style or imitate Apple's typography wholesale.

### Candidate compositions

1. **Blue courtyard**: left-aligned name, role and research focus in an
   architectural blue field; a large photographic opening on the right brings
   foliage and light into the scene. Selected research follows immediately.
2. **Field of view**: a wide photograph and a restrained adjustable framing device
   express observation. A clearly illustrative view can reveal a model's
   explanation on interaction; never pass decorative overlays off as real XAI.
3. **Trail of questions**: image-led chapters alternate personal observation and
   research artifacts, with a continuous visual path marking progression from the
   first paper to present questions. Keep a direct work index alongside the story.

All three should be tested with the same real project and factual copy so the
comparison measures visual direction rather than different content quality.

### Motion proposal

- Hero photo moves slightly within its frame during the first viewport of scroll;
  foreground foliage and background can have small relative offsets.
- One research section uses a short scroll-linked transition from input through
  prediction to explanation. Label illustrative material and keep the full
  explanation readable without waiting for motion.
- The first-paper chapter transitions to current research questions. Emphasize
  the continuity of curiosity, not a hierarchy based solely on venue prestige.
- Avoid stacking all these effects in every section. Keep ordinary page scrolling,
  direct anchor navigation and usable touch behavior.
- Use a static equivalent for reduced motion, and disable costly layers on mobile
  when necessary. No mandatory introduction or autoplay audio.

### Research presentation

Proposed homepage sequence: identity and selected artifact; selected research;
first-paper origin and current questions; engineering/Computer Vision work;
short personal photography/field notes section; CV/contact.

Feature SmokeNet as the likely first-paper anchor after verifying chronology with
the owner/source materials. Each case study needs question, personal contribution,
method, evaluation, limitation and accessible code/paper links. Repo metrics are
source claims, not newly verified experimental results. Keep papers under review
distinct from published work.

## What remains open

- Owner reaction to the linked references and candidate compositions.
- Personal photography available for use and permission to publish it.
- Preferred blue shade and light/dark balance, assessed through visual prototypes.
- Exact first-paper chronology and contribution details before writing the story.

The next useful artifact is a visual comparison with real content. A second broad
personality survey is unnecessary; use targeted follow-up when an asset or factual
detail is needed.
