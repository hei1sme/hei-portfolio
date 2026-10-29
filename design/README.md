# Design documentation

The current site is the selected **forest workspace**, with cobalt illustrations,
botanical layers and a running duck. The owner approved this version before the
repository cleanup. Earlier proposals record the process; they are not the brief
for another redesign.

## Current implementation

| Topic | Notes |
| --- | --- |
| Workspace scene, private reference and object placement | [Workspace illustration](workspace-illustration.md) |
| Preserved courtyard and shared animation runtime | [Botanical illustration](botanical-illustration.md) |
| Floating navigation | [Navigation capsule](floating-navigation.md) |
| Disclosures, project selection and reading progress | [Motion polish](portfolio-motion-polish.md) |
| Research, program experience and competitions | [Content reconciliation](research-experience-update.md) |
| Recruiter-facing content and deferred evidence | [Content refinement](recruiter-content-refinement.md) |
| CV editions, typography and print QR | [Digital and print](cv-digital-and-print.md), [import history](cv-update.md) |
| iPad SVG icons, motion control and copy | [Icons and copy](ipad-icons-and-copy.md) |
| Duck sprites and blog artwork provenance | [Cursor and cover](duck-cursor-and-blog-cover.md) |
| Skippable welcome and failure handling | [Welcome intro](duck-welcome-intro.md) |
| Ribbon and contextual evidence | [Motion/content review](motion-and-recruiter-review.md) |
| Preserved optional 3D comparison | [Leaf trial](leaf-study-trial.md) |
| Integrated site scope | [Full build](final-build.md) |
| Dependency overrides | [Dependency maintenance](dependency-maintenance.md) |
| Safe removal, private archive and verification | [Cleanup audit](repository-cleanup.md) |

Editable artwork lives in `assets/`. The homepage SVG drawing sources live beside
their animation components under `app/concepts/garden/`. The screenshot in the
root README is a capture of the actual homepage, not a separate concept.

Latest content update: [Outlier contributor experience](outlier-experience-update.md).

Latest reading refinement: [Mobile density and case-study clarity](portfolio-reading-polish.md).

## History

Superseded explorations and earlier audits are grouped in [history/](history/README.md).
Source paths in those documents describe the version being reviewed; some legacy
components have since been removed. Git preserves their original source and the
tag `hero-botanical-backup-2026-10-28` preserves the selected courtyard backup.

Start at [CONTRIBUTING.md](../CONTRIBUTING.md) for commands and deployment,
[cv/README.md](../cv/README.md) for the current CV sources, and
[notes/README.md](../notes/README.md) for pending factual inputs.
