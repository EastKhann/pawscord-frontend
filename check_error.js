const { chromium } = require("@playwright/test");
(async () => {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage();
  const errs = [];
  p.on("pageerror", e => errs.push({ type: "pageerror", message: e.message, stack: e.stack }));
  p.on("console", m => { if (m.type() === "error") errs.push({ type: "console", message: m.text() }); });
  try { await p.goto("https://www.pawscord.com/", { waitUntil: "domcontentloaded", timeout: 30000 }); } catch(e) { console.log("goto:", e.message); }
  await p.waitForTimeout(5000);
  const html = await p.content();
  console.log("html length:", html.length);
  console.log("title:", await p.title());
  // try a few selectors
  for (const sel of ["input[name=username]", "input[type=text]", "input[placeholder*=username i]", "input[placeholder*=ad i]", "input"]) {
    const c = await p.locator(sel).count();
    console.log("sel:", sel, "count:", c);
  }
  console.log("=== Errors (" + errs.length + ") ===");
  errs.slice(0, 10).forEach(e => { console.log("---", e.type, "---"); console.log(e.message.slice(0, 400)); if (e.stack) console.log(e.stack.split("\n").slice(0, 6).join("\n")); });
  await b.close();
})();
