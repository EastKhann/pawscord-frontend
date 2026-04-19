const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage();
  const errors = [];
  p.on('pageerror', err => errors.push(err.stack || err.message));
  await p.goto('https://www.pawscord.com/login');
  await p.fill('input[type=text]', 'YANHESAP');
  await p.fill('input[type=password]', 'YANHESAP');
  await p.click('button[type=submit]');
  await p.waitForTimeout(3000);
  const storeBtn = await p.locator('[aria-label=\"Premium Store\"]');
  const cnt = await storeBtn.count();
  console.log('store buttons found:', cnt);
  if (cnt > 0) { await storeBtn.click(); await p.waitForTimeout(2000); }
  console.log('ERRORS:', JSON.stringify(errors.slice(0, 5)));
  await b.close();
})().catch(e => console.error(e));
