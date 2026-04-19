const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage();
  // Intercept ALL failed requests
  const errors = [];
  p.on("pageerror", e => errors.push({type:"pageerror", msg: e.message, stack: e.stack}));
  p.on("requestfailed", r => errors.push({type:"reqfailed", url: r.url(), err: r.failure()?.errorText}));
  await p.goto("https://www.pawscord.com/login", { waitUntil: "networkidle" });
  await p.fill("input[type=text]", "YANHESAP");
  await p.fill("input[type=password]", "YANHESAP");
  await p.click("button[type=submit]");
  await p.waitForTimeout(4000);
  try { await p.locator("[aria-label='Premium Store']").click({ timeout: 5000 }); await p.waitForTimeout(3000); } catch(e) {}
  const domText = await p.evaluate(() => document.body.innerText);
  const hasError = domText.includes("klenemedi");
  console.log("Has error:", hasError);
  console.log("JS pageerrors:", errors.filter(e=>e.type==="pageerror").map(e=>e.msg.substring(0,200)));
  console.log("Failed requests:", errors.filter(e=>e.type==="reqfailed"));
  await b.close();
})().catch(e => console.error(e.message));
