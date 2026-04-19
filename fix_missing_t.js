const fs = require("fs");
const path = require("path");

// Each entry: file -> [componentNames] - computed inline (same logic as find_missing.js)
function walk(dir) {
  const out = [];
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) out.push(...walk(p));
    else if (/\.(js|jsx|ts|tsx)$/.test(f.name)) out.push(p);
  }
  return out;
}
const fileMap = {};
for (const file of walk("src")) {
  if (file.includes("locales") || /__tests__|\.(test|spec)\./.test(file)) continue;
  const src = fs.readFileSync(file, "utf8");
  if (!/\bt\(/.test(src)) continue;
  const componentRegex = /(?:export\s+)?(?:const|function)\s+([A-Z]\w+)\s*=?\s*(?:memo\()?\s*\(/g;
  let m;
  const comps = [];
  while ((m = componentRegex.exec(src)) !== null) comps.push({ name: m[1], idx: m.index });
  if (comps.length === 0) continue;
  comps.push({ name: "EOF", idx: src.length });
  for (let i = 0; i < comps.length - 1; i++) {
    const body = src.slice(comps[i].idx, comps[i + 1].idx);
    const stripped = body.replace(/"(?:[^"\\]|\\.)*"|`[^`]*`|'(?:[^'\\]|\\.)*'/g, "").replace(/\/\/[^\n]*/g, "");
    const usesT = /(?:^|[^\w.])t\(/.test(stripped);
    if (!usesT) continue;
    const hasUT = /useTranslation\(\)|i18n\.t/.test(body);
    if (!hasUT) {
      if (!fileMap[file]) fileMap[file] = [];
      fileMap[file].push(comps[i].name);
    }
  }
}

let totalFixed = 0;
let filesFixed = 0;

for (const [file, names] of Object.entries(fileMap)) {
  let src = fs.readFileSync(file, "utf8");
  let fixed = 0;
  // Ensure useTranslation imported
  if (!/from\s+['"]react-i18next['"]/.test(src)) {
    // Insert after first import line
    const lines = src.split(/\r?\n/);
    let lastImport = -1;
    for (let i = 0; i < lines.length; i++) {
      if (/^import\s/.test(lines[i])) lastImport = i;
    }
    if (lastImport >= 0) {
      lines.splice(lastImport + 1, 0, "import { useTranslation } from 'react-i18next';");
      src = lines.join("\n");
    }
  } else if (!/useTranslation/.test(src)) {
    // Has react-i18next but not useTranslation symbol — replace the import to add it
    src = src.replace(/(import\s*\{[^}]*)\}\s*from\s*['"]react-i18next['"]/, (full, body) => {
      if (body.includes("useTranslation")) return full;
      return `${body.trimEnd()}, useTranslation } from 'react-i18next'`;
    });
    if (!/useTranslation/.test(src)) {
      // Fallback: append new import
      src = src.replace(/(\nimport[^\n]*\n)(?!import)/, `$1import { useTranslation } from 'react-i18next';\n`);
    }
  }

  // For each component, inject `const { t } = useTranslation();` after the opening brace
  for (const name of names) {
    // Match: ` Name = memo(({...}) => {` or ` Name = ({...}) => {` or `function Name(...) {`
    const patterns = [
      // Arrow function with memo wrapper: `const Name = memo((props) => {`
      new RegExp(`(\\b(?:const|let)\\s+${name}\\s*=\\s*memo\\s*\\(\\s*\\([^)]*\\)\\s*=>\\s*\\{)`),
      // Arrow function: `const Name = (props) => {`
      new RegExp(`(\\b(?:const|let)\\s+${name}\\s*=\\s*\\([^)]*\\)\\s*=>\\s*\\{)`),
      // function declaration: `function Name(props) {`
      new RegExp(`(\\bfunction\\s+${name}\\s*\\([^)]*\\)\\s*\\{)`),
    ];
    let matched = false;
    for (const pat of patterns) {
      if (pat.test(src)) {
        src = src.replace(pat, (m) => `${m}\n    const { t } = useTranslation();`);
        matched = true;
        fixed++;
        break;
      }
    }
    if (!matched) {
      console.log(`  WARN: could not find component opening for ${name} in ${file}`);
    }
  }
  if (fixed > 0) {
    fs.writeFileSync(file, src);
    console.log(`  ${file}: +${fixed}`);
    totalFixed += fixed;
    filesFixed++;
  }
}
console.log(`\nFixed ${totalFixed} components in ${filesFixed} files`);