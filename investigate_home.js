const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  const errors = [];
  const failed = [];
  const consoles = [];
  page.on('pageerror', e => errors.push('PAGEERR: ' + e.message));
  page.on('console', m => { if (['error','warning'].includes(m.type())) consoles.push(m.type().toUpperCase() + ': ' + m.text()); });
  page.on('requestfailed', r => failed.push('REQFAIL: ' + r.url() + ' :: ' + (r.failure() && r.failure().errorText)));
  page.on('response', r => { if (r.status() >= 400) failed.push('HTTP ' + r.status() + ': ' + r.url()); });
  try {
    await page.goto('https://www.pawscord.com', { waitUntil: 'networkidle', timeout: 30000 });
  } catch (e) { errors.push('NAV: ' + e.message); }
  await page.waitForTimeout(3000);
  const html = await page.evaluate(() => ({
    title: document.title,
    rootHtml: (document.getElementById('root') || {}).innerHTML?.slice(0, 500) || '(no root)',
    bodyText: document.body.innerText.slice(0, 500),
    splash: !!document.querySelector('.splash-screen'),
  }));
  console.log('=== TITLE:', html.title);
  console.log('=== SPLASH STILL VISIBLE:', html.splash);
  console.log('=== BODY TEXT (first 500):\n' + html.bodyText);
  console.log('=== ROOT HTML (first 500):\n' + html.rootHtml);
  console.log('\n=== PAGE ERRORS (' + errors.length + '):');
  errors.forEach(e => console.log(e));
  console.log('\n=== CONSOLE (' + consoles.length + '):');
  consoles.slice(0, 30).forEach(c => console.log(c));
  console.log('\n=== FAILED REQUESTS (' + failed.length + '):');
  failed.slice(0, 30).forEach(f => console.log(f));
  await page.screenshot({ path: 'investigate_home.png', fullPage: true });
  await browser.close();
})();
