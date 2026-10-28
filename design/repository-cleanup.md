# Repository cleanup

2026-10-28. The owner approved the forest-workspace site and requested a public
repository cleanup plus a portable backup before returning a borrowed computer.
This pass preserves the selected design, content and reachable routes.

## Removal decisions

The read-only import audit identified 36 unreachable files under `app/components`,
`app/context` and `app/utils`: the old homepage sections, legacy shell/providers,
cursor/navigation, duplicate cards, counters and animation helpers. None was
reachable from a Next entrypoint, a literal dynamic import or current tooling.
They were removed after a verified pre-cleanup archive. Git history retains them.

The obsolete React Three Fiber JSX declaration was also removed. Current optional
3D scenes use Three.js directly; `@types/three` is now an explicit dev dependency.
Twelve obsolete dependency declarations were removed:

`@headlessui/react`, `@heroicons/react`, `@react-three/drei`, `@react-three/fiber`,
`@types/react-slick`, `@types/gsap`, `gsap`, `react-scroll-parallax`, `react-slick`,
`slick-carousel`, `three-mesh-bvh` and `typewriter-effect`.

Unused legacy glow/card/gradient utilities were removed from `globals.css`.
Base and code-block styling stay intact. The lint script now uses ESLint directly
instead of the deprecated `next lint` command. The lockfile was updated without
an unrelated framework upgrade.

Intentionally retained:

- All current homepage sections, MDX content and seven project cases.
- Welcome, cursor, ribbon, duck rhythm, shared motion and optional playground.
- Courtyard/leaf/sculpture comparisons and the live, non-indexed concept routes.
- Original artwork and superseded figures/covers with provenance, plus WIP posts
  excluded from publication by the content loader.
- Vendored skills, pinned source metadata and licenses.

Dead source was already excluded from the production import graph. Removing it
cleans maintenance and dependency installation; this is not a claim of a large
runtime performance gain. Static reachability cannot establish whether every
asset or computed path is unused, so it is not an automatic deletion tool.

## Documentation and CV portability

The root README now introduces the portfolio with a real homepage screenshot,
links, setup commands and a source map. Maintenance, deployment and migration
instructions live in `CONTRIBUTING.md`. Current design notes are indexed in
`design/README.md`; eleven superseded studies/audits are grouped in `design/history/`.
References were updated. `notes/README.md` indexes the factual backlog and reviews.

Current LaTeX sources and the shared style were copied byte-for-byte from the
private Overleaf workspace into tracked `cv/`. They contain information already
present in the public PDFs. The builder now compiles local copies in ignored
`output/cv-build/`, so a fresh clone includes all editable source files. No CV
wording, claims, layout or published PDF was changed.

Private imports/originals, papers, certificates, answers and the workspace photo
remain ignored. `.gitignore` now focuses on this stack and explicitly excludes
private ZIP/bundle backups and environment files. A scan of tracked project files
found no matches for common GitHub/OpenAI/AWS key or private-key patterns; this
is a bounded pattern scan, not a security certification.

`scripts/backup-workspace.py` creates a private ZIP outside the repository. It
includes all Git refs/history, current source, ignored owner material and restore
instructions, with CRC and per-file SHA-256 verification plus an archive checksum.
Tool/dependency caches, browser profiles and account credentials are omitted.
The ZIP is unencrypted and must be copied off the borrowed computer by the owner.

## Verification

- Clean `npm ci` in a separate directory, with no old `node_modules`; production
  build generated all 22 static entries. No dependency was supplied by a stale
  install. ESLint, TypeScript and the read-only import audit passed.
- Production dependency audit reported zero advisories at the time of this pass.
  This is a point-in-time npm advisory check, not a permanent safety guarantee.
- Chromium: 16 routes at 390, 834 and 1440px (48 checks), including the writing,
  seven cases, legacy redirects/concepts and expected 404. Expected statuses,
  no horizontal overflow and no page errors.
- WebKit: homepage, blog and SmokeNet case at 390 and 834px (six checks), with
  expected statuses, no horizontal overflow and no page errors. Engine emulation
  does not replace a physical iPad check.
- Keyboard Explore/Enter/Escape and returned focus; project inspection/selection;
  global motion pause; playground open/Escape/focus return; reduced-motion welcome
  bypass; and no-JavaScript poster, publication evidence and CV links passed.
- Before/after desktop and mobile screenshots were reviewed. Hero captures match;
  no layout regression was found in full-page comparison.
- Four rebuilt CVs passed pypdf plain/layout and PyMuPDF extraction checks.
  Their extracted text and all six rendered pages match the public PDFs exactly,
  including pixel comparison. The website PDF files were not republished.

Review logs and screenshots are in ignored `output/cleanup-*`. Check deployment
status and the live site after pushing; a local successful build is not deployment.
