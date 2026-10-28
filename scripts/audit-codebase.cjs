// Read-only reachability audit. Next entrypoints, MDX and tooling are roots.
// This reports candidates for review; it never deletes files.
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const files = execFileSync('git', ['ls-files', '-z'], { cwd: root }).toString().split('\0').filter(f => f && fs.existsSync(path.join(root, f)));
const code = files.filter(f => /\.(tsx?|jsx?|cjs|mjs|css|mdx)$/.test(f) && !f.startsWith('.agents/'));
const graph = new Map();
const packages = new Map();
const unresolved = [];
const extensions = ['', '.ts', '.tsx', '.js', '.jsx', '.css', '.cjs', '.mjs', '/index.ts', '/index.tsx'];
function dependency(owner, spec) {
  if (spec.startsWith('.') || spec.startsWith('@/')) {
    const base = spec.startsWith('@/') ? spec.slice(2) : path.posix.normalize(path.posix.join(path.posix.dirname(owner), spec));
    const target = extensions.map(ext => base + ext).find(f => files.includes(f));
    if (target) graph.get(owner).add(target);
    else if (!/\.(png|jpe?g|svg|webp)$/.test(spec)) unresolved.push({ owner, spec });
  } else {
    const name = spec.startsWith('@') ? spec.split('/').slice(0, 2).join('/') : spec.split('/')[0];
    if (!packages.has(name)) packages.set(name, new Set());
    packages.get(name).add(owner);
  }
}
for (const file of code) {
  graph.set(file, new Set());
  const text = fs.readFileSync(path.join(root, file), 'utf8');
  if (/\.(tsx?|jsx?|cjs|mjs)$/.test(file)) {
    const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
    function visit(node) {
      if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) dependency(file, node.moduleSpecifier.text);
      if (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || node.expression.getText(source) === 'require') && node.arguments[0] && ts.isStringLiteral(node.arguments[0])) dependency(file, node.arguments[0].text);
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
}
const roots = code.filter(f => /^app\/(?:.*\/)?(?:page|layout|route|error|global-error|not-found|loading|template|default|robots|sitemap|opengraph-image|twitter-image|manifest)\.[jt]sx?$/.test(f) || /^(scripts\/|content\/|types\/)/.test(f) || !f.includes('/'));
const reached = new Set();
function walk(file) { if (reached.has(file)) return; reached.add(file); for (const next of graph.get(file) || []) walk(next); }
roots.forEach(walk);
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const unreachable = code.filter(f => /^(app|lib)\//.test(f) && /\.[jt]sx?$/.test(f) && !reached.has(f));
const unusedDependencies = Object.keys(manifest.dependencies).filter(name => ![...(packages.get(name) || [])].some(f => reached.has(f)) && name !== 'shiki'); // rehype-pretty-code loads shiki.
console.log(JSON.stringify({ roots, unreachable, unusedDependencies, unresolved, packageUsers: Object.fromEntries([...packages].map(([k, v]) => [k, [...v].filter(f => reached.has(f))])) }, null, 2));
if (process.argv.includes('--check') && (unreachable.length || unusedDependencies.length || unresolved.length)) process.exitCode = 1;
