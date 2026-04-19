const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage();
  const errors = [];
  p.on("pageerror", err => {
    errors.push({ msg: err.message, stack: err.stack ? err.stack.substring(0, 500) : "no stack" });
  });
  await p.goto("https://www.pawscord.com/login", { waitUntil: "networkidle" });
  await p.fill("input[type=text]", "YANHESAP");
  await p.fill("input[type=password]", "YANHESAP");  
  await p.click("button[type=submit]");
  await p.waitForTimeout(4000);
  console.log("ERRORS BEFORE MODAL:", JSON.stringify(errors));
  errors.length = 0;
  try {
    const storeBtn = await p.locator("[aria-label='Premium Store']");
    await storeBtn.click({ timeout: 5000 });
    await p.waitForTimeout(3000);
  } catch(e) { console.log("click err:", e.message.substring(0, 200)); }
  console.log("ERRORS AFTER MODAL:", JSON.stringify(errors));
  await b.close();
})().catch(e => console.error(e.message));
