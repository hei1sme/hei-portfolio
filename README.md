# Le Nguyen Gia Hung - Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Three.js](https://img.shields.io/badge/Three.js-Neural_Core-000000?logo=three.js&logoColor=white)](https://threejs.org/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://hei-portfolio-w.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-0A0A0A.svg)](#license)

> Research-driven personal site for hei.isme: highlights SmokeNet (AJCAI 2025), ongoing Conformer-GAT experiments, and collaboration touchpoints in a glassmorphism interface.

Live site → https://hei-portfolio-w.vercel.app

---

## Table of Contents

1. [Quick Links](#quick-links)
2. [Feature Matrix](#feature-matrix)
3. [Technology Stack](#technology-stack)
4. [Architecture Overview](#architecture-overview)
5. [Content Model](#content-model)
6. [Design Notes](#design-notes)
7. [Getting Started](#getting-started)
8. [MDX Workflow](#mdx-workflow)
9. [Deployment](#deployment)
10. [Roadmap](#roadmap)
11. [Maintainer](#maintainer)
12. [License](#license)

---

## Quick Links

- Live portfolio: https://hei-portfolio-w.vercel.app
- Resume (PDF): `/public/HungLNG_Resume.pdf`
- Blog: `/blog`
- Projects: `/projects/[slug]`

---

## Feature Matrix

| Surface      | Highlights                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------- |
| Hero         | Three.js neural core, generative gradients, rolling bio via Typewriter, dual CTAs           |
| Navigation   | Glassmorphic sidebar/topbar, framer-motion transitions, smooth scroll, theme toggle        |
| About        | Narrative glass cards with research highlights, active experiments, and collaboration CTA   |
| Projects     | MDX-backed case studies rendered as responsive cards with tool tags and CTA actions         |
| Skills       | Competency gauges + tooling tiles with glass styling                                        |
| Experience   | Timeline narrative of SpeedyLabX leadership, SmokeNet acceptance, Conformer-GAT progress    |
| Education    | Honors and core modules in elevated cards                                                   |
| Contact      | Split layout (signals + glass form), animated status messaging                              |
| Blog         | MDX posts, Shiki-based syntax highlighting via rehype-pretty-code                           |

---

## Technology Stack

- **Framework**: Next.js 14 (App Router) + React 18
- **Language**: TypeScript with ESLint (Next config)
- **Styling**: Tailwind CSS 3, custom global glassmorphism tokens
- **Motion**: Framer Motion 11
- **3D**: Three.js powered by @react-three/fiber (neural hologram)
- **Content**: next-mdx-remote, gray-matter, Shiki / rehype-pretty-code

---

## Architecture Overview

```
app/
  layout.tsx          # Root layout (theme provider, parallax, custom cursor, nav)
  page.tsx            # Landing page orchestrating sections
  blog/               # Listing + dynamic slug routes
  projects/[slug]/    # MDX-driven project pages
  components/         # Hero, cards, sliders, timelines, etc.
  context/            # ThemeContext (dark/light)
  utils/              # Theme utilities

content/
  blog/               # Published + WIP MDX posts
  projects/           # Case studies (smokenet, conformer-gat-ser, ppe)

lib/
  posts.ts            # MDX parsing, sorting, serialization

public/
  images/             # Placeholder imagery + blog assets
  HungLNG_Resume.pdf  # Downloadable resume
```

---

## Content Model

- **Projects**: MDX frontmatter (`title`, `summary`, `image`, `tags`, `technologies`) rendered via `ProjectClientPage`.
- **Blog posts**: MDX with `date`, `excerpt`, `imageUrl`; loaded by `getSortedPostsData` / `getPostData`.
- **Experience**: Curated array in `Experience.tsx` to enable timeline presentation.
- **Skills**: Structured arrays in `Skills.tsx` for competencies and tooling.

---

## Design Notes

- Layered radial gradients + global utilities in `app/globals.css` drive glassmorphism.
- Hero uses particle field, rotating halos, and neural link lines for an AI-lab aesthetic.
- Framer Motion animates section entrances and navigation transitions.
- Accessible focus states retained via Tailwind focus classes and semantic HTML.
- Placeholder SVGs in `public/images` match card styling for consistent fallbacks.

---

## Getting Started

```bash
# install dependencies
npm install

# run dev server (http://localhost:3000)
npm run dev

# lint
npm run lint

# build production bundle
npm run build

# start production server
npm run start
```

No environment variables required for local content—MDX lives in `content/`.

---

## MDX Workflow

1. Add a new `.mdx` file under `content/blog` or `content/projects`.
2. Include frontmatter metadata.
3. Start or refresh `npm run dev` to hot-load the new entry.
4. Code blocks automatically receive Shiki highlighting via `rehype-pretty-code` (configured in `lib/posts.ts`).

---

## Deployment

Optimized for Vercel deployment (static + SSR mix). Typical flow:

```bash
npm run build
npm run start
```

Ensure `content/` and `public/` assets ship with the deployment bundle. No server-side secrets are required.

---

## Roadmap

- Surface SpeedyLabX research updates through a dedicated MDX feed.
- Persist theme preference (local storage or cookies).
- Evaluate CMS integration (e.g., Sanity, Contentlayer) for easier content authoring.
- Expand project gallery with additional measurable outcomes and prepared slides.

---

## Maintainer

Le Nguyen Gia Hung  
https://hei-portfolio-w.vercel.app  
https://linkedin.com/in/le-nguyen-gia-hung/  
heiontheway@gmail.com

---

## License

MIT (c) Le Nguyen Gia Hung
