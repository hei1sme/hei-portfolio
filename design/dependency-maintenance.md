# Deployment dependency follow-up — 2026-10-27

The initial Sculpture/welcome build deployed successfully as commit `828c8bb`.
GitHub's push response also reported dependency alerts. A fresh npm audit found
8 production dependency findings, including Next.js at critical severity.

The follow-up keeps Next.js 15 and the existing application APIs:

- Next.js: 15.5.11 → 15.5.28, including the upstream image-optimization fixes.
- Sharp updated to 0.35.5 through Next's patched dependency tree.
- Compatible dependency updates via `npm audit fix`, without `--force`.
- PostCSS 8 is shared at the patched direct-dependency range `^8.5.23` using
  `"postcss": "$postcss"`. Next's old exact PostCSS pin would otherwise retain
  a vulnerable nested installation despite the newer root package.
- Typography's old exact selector-parser pin is overridden to `^6.1.5`, keeping
  the same parser major version rather than downgrading the typography plugin.

Relevant upstream advisories:

- [Next image optimization](https://github.com/vercel/next.js/security/advisories/GHSA-2464-fhr4-w9xw)
- [Sharp's librsvg dependency](https://github.com/lovell/sharp/security/advisories/GHSA-wq5f-xc86-pv6w)
- [PostCSS source-map handling](https://github.com/postcss/postcss/security/advisories/GHSA-r28c-9q8g-f849)
- [Selector-parser complexity](https://github.com/postcss/postcss-selector-parser/security/advisories/GHSA-rj75-hqrm-r3gf)

The updated lockfile resolves PostCSS 8.5.32 and selector-parser 6.1.5. Both full
and production-only npm audit report zero known findings at this point in time.
This is a dependency database result, not a guarantee that the application has
no vulnerabilities. ESLint 8 and some transitive build tools still emit
deprecation notices; a tooling-major migration is separate work.

The existing local npm is isolated under `.codex/tooling/npm/`. When invoking
Next directly on this Windows machine, add the bootstrap-generated
`.codex/tooling/bin` command shims to the process PATH so framework helpers can
invoke npm. Vercel has npm on PATH normally. The Linux x64 SWC lock entry was
hoisted to the same root location as the other platform binaries, preserving its
registry metadata; npm validated the resolved lockfile afterwards.

## Validation

A clean `npm ci --ignore-scripts` succeeded. Full and production-only audit
reported zero known vulnerabilities after the compatible updates/overrides.
`npm ls` resolves the patched packages without invalid-dependency errors.
The final Next 15.5.28 production build, lint/type validation, standalone
TypeScript and diff checks passed. SWC version/lockfile warnings from earlier
builds were resolved.

Fresh Chromium checks covered the welcome/Skip, project-linked toolkit,
playground open/Escape close, the blog index/article and all four case routes.
The image optimizer returned 200, desktop and 390 px phone captures were
inspected, and the phone had no horizontal overflow. No page/console errors
were recorded. Captures: `output/playwright/security-patch-home.png` and
`security-patch-paper-phone.png` (ignored).
