const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push({ msg: e.message, stack: e.stack }));
  await page.goto('https://www.pawscord.com/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(5000);
  console.log('=== PAGE ERRORS ===');
  errors.forEach(e => {
    console.log('MSG:', e.msg);
    console.log('STACK:', (e.stack || '').split('\n').slice(0, 6).join('\n'));
    console.log('---');
  });
  await page.screenshot({ path: 'live_screenshot.png', fullPage: false });
  console.log('Screenshot saved');
  await browser.close();
})();
