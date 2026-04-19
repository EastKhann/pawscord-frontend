const fs = require("fs");
const file = "src/components/panels/NewFeaturesPanel/InteractivePanels.js";
const src = fs.readFileSync(file, "utf8");
const componentRegex = /export const (\w+) = (?:memo\()?\s*\(/g;
let m;
const components = [];
while ((m = componentRegex.exec(src)) !== null) components.push({ name: m[1], idx: m.index });
components.push({ name: "EOF", idx: src.length });
console.log("Components:", components.length - 1);
for (let i = 0; i < components.length - 1; i++) {
  const body = src.slice(components[i].idx, components[i+1].idx);
  const stripped = body.replace(/"(?:[^"\\]|\\.)*"|`[^`]*`|"(?:[^"\\]|\\.)*"/g, "");
  const usesT = /\bt\(/.test(stripped);
  const hasUT = /useTranslation\(\)/.test(body);
  console.log("-", components[i].name, "usesT:", usesT, "hasUT:", hasUT, usesT && !hasUT ? "<<< MISSING" : "");
}