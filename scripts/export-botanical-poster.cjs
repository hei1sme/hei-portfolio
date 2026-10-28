// Export the same authored SVG used by the interactive illustration.
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const source = path.resolve('app/concepts/garden/BotanicalDrawing.tsx');
const { outputText } = ts.transpileModule(fs.readFileSync(source, 'utf8'), {
  compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
});
const drawingModule = new Module(source, module);
drawingModule.filename = source;
drawingModule.paths = Module._nodeModulePaths(path.dirname(source));
drawingModule._compile(outputText, source);
const svg = renderToStaticMarkup(React.createElement(drawingModule.exports.default));
const output = path.resolve('public/images/personal/botanical-courtyard-poster.svg');
fs.writeFileSync(output, svg + '\n');
process.stdout.write(`Exported ${path.relative(process.cwd(), output)}\n`);
