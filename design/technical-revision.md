# Research-led revision, 2026-10-26

The owner rejected the first concepts: they looked like designer portfolios,
removed too much technical content, were too plain, and offered insufficient
motion. This feedback supersedes the earlier visual recommendation. Blue and
botanical context remain; an architectural stock-like hero is no longer the lead.

## Content audit against the original

| Original surface | Revision |
| --- | --- |
| Hero: research engineer, XAI, time series, multimodal, CV/resume | Explicit identity, methods, affiliation, CV and animated architecture explorer |
| About: portrait, GPA, research interests, SpeedyLabX | Full researcher profile and personal context |
| Publications: 1 published, 3 under review, roles and DOI | Complete bibliography; no fake Read Paper links on private submissions |
| Experience: lab founding, first publication, current submissions | Research journey with real group/conference images and scroll progression |
| Projects: SmokeNet, MERR-GAT, Vietnamese ASR, PPE | All four, methods, roles, benchmark scope, detail dialogs and limitations |
| Impact: 10 members, 3 pilots, 4 manuscripts, MAE improvement | Restore lab/manuscript/pilot context; benchmark claims attached to actual evaluation |
| Skills: ML, development, tools | Full grouped toolkit, no invented proficiency percentages |
| Education: FPT, 8.62 GPA, 2023–2027, merit semesters 3–6 | Restore education and all six current certification labels |
| Contact: Scholar, ORCID, Scopus, WoS, email, GitHub, LinkedIn | Restore all academic and engineering profiles |
| Blog | Restore writing entry and blog navigation |
| NeuralBreach/ShooterGame easter egg | Retain as optional playground, dynamically loaded on request |

Content authority: `Publications.tsx`, `HorizontalScrollProjects.tsx`, `Skills.tsx`,
`Impact.tsx`, `Education.tsx`, `Experience.tsx`, `Contact.tsx`, project/blog MDX,
and `public/HungLNG_Resume.md`. The markdown resume is older than Education.tsx
for certifications and merit semesters; use the current component values.
Do not collapse the 35.9% held-out MAE reduction and 57.7% event backtest into one
general improvement claim. Paper statuses are copied, not independently verified.

## Visual direction and motion contract

Palette: blueprint blue #2358E8; research ink #112B42; canvas #EDF3FA;
white #FFFFFF; foliage #406B58; mist #BCD2EB.
Figtree carries identity and body; monospace is reserved for model labels,
metrics and architecture notation, where it conveys technical information.

```text
identity / section navigation / motion control
name + role + research focus | animated model topology and architecture controls
publication / project / lab summary
scroll: input → transformer → prediction + explanation
full publication list
four technical project case studies
research journey / SpeedyLabX / first publication
toolkit / education / certifications
personal context / writing / contact / optional playground
```

Motion should be visibly present: animated projected topology with travelling
signals, input-responsive camera, scroll-drawn model pipeline and research
journey, and responsive project transitions. Animation is schematic and never
represented as live model inference, a real attention map or measured activity.
Provide one global pause, OS reduced-motion support, offscreen/hidden-tab
suspension, and normal scrolling with direct anchors.

Replace only the Courtyard concept at its current URL for immediate review. Keep
the original homepage and the two earlier studies available. This revision
restores the information architecture rather than stripping it down further.
