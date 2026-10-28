# Maintenance

Keep the selected forest-workspace design and its accessible motion intact.
Read [AGENTS.md](AGENTS.md) for owner decisions and factual constraints before
changing content. Current design notes start at [design/README.md](design/README.md).

## Development and checks

Use Node 22 LTS (22.9+) and `npm ci`. The lockfile is committed; the local npm
configuration preserves the existing peer-dependency resolution.

```sh
npm run dev
npm run lint
npm run typecheck
npm run audit:code -- --check
npm run build
npm start
```

The read-only code audit walks static imports, literal dynamic imports and
`require` calls from Next entrypoints, content and tooling. It reports unused
code/dependency candidates. Review computed imports, MDX, CSS URLs, public assets
and peer dependencies separately before deleting anything. A successful audit
does not replace a build or browser checks.

Check the homepage, writing, all seven project cases and preserved concept
routes at desktop and mobile widths. Verify keyboard focus, reduced motion,
the navigation capsule, project selector and optional playground. Content must
remain usable without JavaScript. Keep browser output in ignored `output/`.

`NEXT_PUBLIC_SITE_URL` overrides the production origin for metadata, canonical
links, sitemap and robots. No environment file is needed for local development.

## Content and artwork

- Shared research/project facts: `app/concepts/research/portfolioData.ts`.
- Applied work: `lib/applied-work.ts` and matching `content/projects/*.mdx`.
- Blog: top-level `content/blog/*.mdx`; `WIP/` is excluded by the loader.
- CVs: [cv/README.md](cv/README.md). Keep PDFs, Markdown versions and web facts aligned.

Keep paper status, authorship, personal contribution and evaluation limits
accurate. Never replace a missing research artifact with invented output.
[The backlog](notes/portfolio-backlog.md) records deferred evidence.

After editing the scene drawings, regenerate their loading/no-JS posters:

```sh
node scripts/export-botanical-poster.cjs --workspace
node scripts/export-botanical-poster.cjs
```

Keep the original courtyard and the tag `hero-botanical-backup-2026-10-28`.
The default scene is 2D; WebGL is optional. Preserve generated-art attribution
and the upstream licenses under `.agents/skills/`.

## Private files and moving computers

Current CV LaTeX sources in `cv/` are public and contain the same personal
information as the published CVs. `docs/` holds private imports, originals and
review material. `cv-inbox/` holds unpublished papers, certificates and answers;
`.taste-skill/` holds local design exploration state. These stay ignored.

Before returning a borrowed computer, create a private archive outside the repo:

```sh
python scripts/backup-workspace.py --destination D:/my-backups/hei-portfolio.zip
```

This includes all Git refs/history, the working tree, `docs/`, `cv-inbox/`, local
design state and any root `.env*` files. It verifies ZIP CRCs and every file's
SHA-256, and writes a whole-archive checksum beside the ZIP. `RESTORE.txt` explains
how to clone the bundled history and restore the private overlay.

The archive is **private and unencrypted**. Copy it to storage you own before
returning the computer. Do not commit it, publish its manifest, or assume a copy
on another drive of the same machine is an off-machine backup. Dependencies,
build caches, browser profiles and account credentials are excluded; reinstall
them on the new machine.

## Deployment

Pushes to `main` trigger the connected Vercel project at
[hei-portfolio.vercel.app](https://hei-portfolio.vercel.app). Check the pushed
commit's deployment status and the public page before calling a change live.
Set `NEXT_PUBLIC_SITE_URL` and redeploy when moving to a custom domain.

On Windows without npm, `python scripts/bootstrap-portfolio-tools.py` installs
checksum-verified repo-local npm. Its entrypoint is
`.codex/tooling/npm/bin/npm-cli.js`; the generated shims are in `.codex/tooling/bin`.
Node must already be installed. This tooling and the CV compiler cache are ignored.

`PORTFOLIO_DIST_DIR` optionally selects a local Next build directory. It defaults
to `.next` on a fresh clone and on Vercel. Never share one build directory between
a running dev server and a production build. If using a Windows junction on
another drive, its build parent also needs a `node_modules` junction to this
checkout for runtime resolution; do not copy machine-specific paths into config.
