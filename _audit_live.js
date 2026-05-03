const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const errors = [];
  const failed = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
  page.on('requestfailed', r => failed.push(r.url() + ' -> ' + r.failure().errorText));
  page.on('response', r => { if (r.status() >= 400) failed.push(r.status() + ' ' + r.url()); });
  try {
    await page.goto('https://www.pawscord.com/', { waitUntil: 'networkidle', timeout: 30000 });
  } catch (e) {
    console.log('NAV ERROR:', e.message);
  }
  await page.waitForTimeout(3000);
  const title = await page.title();
  const bodyText = (await page.textContent('body') || '').substring(0, 300);
  const hasLogin = await page.locator('input[type=password], input[name=password]').count();
  console.log('TITLE:', title);
  console.log('HAS_LOGIN_INPUT:', hasLogin);
  console.log('BODY:', bodyText);
  console.log('---CONSOLE ERRORS---');
  errors.slice(0, 20).forEach(e => console.log(e));
  console.log('---FAILED REQUESTS---');
  failed.slice(0, 20).forEach(e => console.log(e));
  await browser.close();
})();
