const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage();
  const failedChunks = [];
  
  // Intercept all JS loading
  p.on("requestfailed", r => {
    if (r.url().includes(".js")) failedChunks.push({url: r.url(), err: r.failure()?.errorText});  
  });
  
  // Intercept errors including those from modules
  await p.addInitScript(() => {
    window.addEventListener("error", e => {
      window.__errors__ = window.__errors__ || [];
      window.__errors__.push({msg: e.message, src: e.filename, line: e.lineno});
    });
    window.addEventListener("unhandledrejection", e => {
      window.__errors__ = window.__errors__ || [];
      window.__errors__.push({msg: String(e.reason), type: "unhandledrejection"});
    });
  });
  
  await p.goto("https://www.pawscord.com/login", { waitUntil: "networkidle" });
  await p.fill("input[type=text]", "YANHESAP");
  await p.fill("input[type=password]", "YANHESAP");
  await p.click("button[type=submit]");
  await p.waitForTimeout(4000);
  try { await p.locator("[aria-label='Premium Store']").click({ timeout: 5000 }); await p.waitForTimeout(3000); } catch(e) {}
  
  const winErrors = await p.evaluate(() => window.__errors__ || []);
  console.log("Window errors:", JSON.stringify(winErrors, null, 2));
  console.log("Failed chunks:", failedChunks);
  await b.close();
})().catch(e => console.error(e.message));
