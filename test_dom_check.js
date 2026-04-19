const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage();
  await p.goto("https://www.pawscord.com/login", { waitUntil: "networkidle" });
  await p.fill("input[type=text]", "YANHESAP");
  await p.fill("input[type=password]", "YANHESAP");
  await p.click("button[type=submit]");
  await p.waitForTimeout(3000);
  // Try clicking the store button
  try {
    await p.locator("[aria-label='Premium Store']").click({ timeout: 5000 });
    await p.waitForTimeout(2000);
  } catch(e) { console.log("No store btn found:", e.message.substring(0, 100)); }
  // Check DOM for error text
  const domText = await p.evaluate(() => document.body.innerText);
  const hasError = domText.includes("klenemedi") || domText.includes("Cannot access");
  console.log("Has modal error:", hasError);
  if (hasError) {
    const idx = domText.indexOf("klenemedi");
    console.log("Error context:", domText.substring(Math.max(0, idx-20), idx+100));
  } else {
    console.log("No modal error - site works fine!");
  }
  await b.close();
})().catch(e => console.error(e.message));
