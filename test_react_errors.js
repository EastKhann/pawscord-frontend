const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage();
  const errors = [];
  // Capture errors FROM React
  await p.addInitScript(() => {
    const orig = console.error;
    window.__reactErrors__ = [];
    console.error = (...args) => {
      const msg = args.map(a => String(a)).join(" ");
      if (msg.includes("Cannot access") || msg.includes("initialization") || msg.includes("ErrorBoundary")) {
        window.__reactErrors__.push(msg.substring(0, 500));
      }
      orig.apply(console, args);
    };
  });
  p.on("pageerror", e => errors.push(e.message));
  await p.goto("https://www.pawscord.com/login", { waitUntil: "networkidle" });
  await p.fill("input[type=text]", "YANHESAP");
  await p.fill("input[type=password]", "YANHESAP");
  await p.click("button[type=submit]");
  await p.waitForTimeout(4000);
  try { await p.locator("[aria-label='Premium Store']").click({ timeout: 5000 }); await p.waitForTimeout(3000); } catch(e) {}
  const reactErrors = await p.evaluate(() => window.__reactErrors__ || []);
  console.log("React console errors:", reactErrors);
  console.log("Page errors:", errors);
  await b.close();
})().catch(e => console.error(e.message));
