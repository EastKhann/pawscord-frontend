const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage();
  const requests = [];
  p.on("request", r => { if (r.url().includes("AppModals")) requests.push(r.url()); });
  await p.goto("https://www.pawscord.com/login", { waitUntil: "networkidle" });
  await p.fill("input[type=text]", "YANHESAP");
  await p.fill("input[type=password]", "YANHESAP");
  await p.click("button[type=submit]");
  await p.waitForTimeout(4000);
  try { await p.locator("[aria-label='Premium Store']").click({ timeout: 5000 }); await p.waitForTimeout(3000); } catch(e) { console.log("click err:", e.message.substring(0,80)); }
  console.log("AppModals chunks loaded:", requests);
  await b.close();
})().catch(e => console.error(e.message));
