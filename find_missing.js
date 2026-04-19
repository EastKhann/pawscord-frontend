const fs = require("fs");
const path = require("path");
function walk(dir) {
  const files = [];
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) files.push(...walk(p));
    else if (/\.(js|jsx|ts|tsx)$/.test(f.name)) files.push(p);
  }
  return files;
}
const TARGET = process.argv[2] || "t";
const files = walk("src");
const allMissing = [];
for (const file of files) {
  if (file.includes("locales") || /__tests__|\.(test|spec)\./.test(file)) continue;
  const src = fs.readFileSync(file, "utf8");
  const componentRegex = /(?:export\s+)?(?:const|function)\s+([A-Z]\w+)\s*=?\s*(?:memo\()?\s*\(/g;
  let m;
  const components = [];
  while ((m = componentRegex.exec(src)) !== null) components.push({ name: m[1], idx: m.index });
  if (components.length === 0) continue;
  components.push({ name: "EOF", idx: src.length });
  for (let i = 0; i < components.length - 1; i++) {
    const body = src.slice(components[i].idx, components[i + 1].idx);
    const stripped = body.replace(/"(?:[^"\\]|\\.)*"|`[^`]*`|'(?:[^'\\]|\\.)*'/g, "").replace(/\/\/[^\n]*/g, "");
    let usesIt;
    if (TARGET === "t") {
      usesIt = /(?:^|[^\w.])t\(/.test(stripped);
    } else if (TARGET === "style") {
      usesIt = /(?:^|[^.\w])style\.\w/.test(stripped);
    }
    if (!usesIt) continue;
    let hasDecl;
    if (TARGET === "t") {
      hasDecl = /useTranslation\(\)|i18n\.t/.test(body);
    } else if (TARGET === "style") {
      hasDecl = /\b(?:const|let|var|import)[^=]*\bstyle\b|\bstyle\s*[:,]\s*[A-Za-z{[]|\(\s*\{[^}]*\bstyle\b|function\s+\w+\s*\([^)]*\bstyle\b/.test(body);
    }
    if (!hasDecl) allMissing.push({ file, comp: components[i].name });
  }
}
console.log("Total missing:", allMissing.length);
allMissing.forEach(x => console.log(`  ${x.file}: ${x.comp}`));