const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage();
  const errors = [];
  p.on("pageerror", e => errors.push(e.message));
  p.on("console", m => { if (m.type() === "error") errors.push("[console] " + m.text()); });
  await p.goto("https://www.pawscord.com/login", { waitUntil: "networkidle" });
  await p.fill("input[type=text]", "YANHESAP");
  await p.fill("input[type=password]", "YANHESAP");
  await p.click("button[type=submit]");
  await p.waitForTimeout(3000);
  try {
    await p.locator("[aria-label='Premium Store']").click({ timeout: 5000 });
    await p.waitForTimeout(2000);
  } catch(e) { console.log("No store btn:", e.message.substring(0, 80)); }
  console.log("JS Errors:", errors.slice(0, 5).join("\n"));
  await b.close();
})().catch(e => console.error(e.message));
