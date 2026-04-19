const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage();
  await p.goto("https://www.pawscord.com/login", { waitUntil: "networkidle" });
  await p.fill("input[type=text]", "YANHESAP");
  await p.fill("input[type=password]", "YANHESAP");
  await p.click("button[type=submit]");
  await p.waitForTimeout(4000);
  try { await p.locator("[aria-label='Premium Store']").click({ timeout: 5000 }); await p.waitForTimeout(3000); } catch(e) {}
  const errPayload = await p.evaluate(() => sessionStorage.getItem('pawscord_last_section_error'));
  console.log(errPayload || 'NO_SECTION_ERROR_PAYLOAD');
  await b.close();
})().catch(e => console.error(e.message));
