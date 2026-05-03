const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await (await browser.newContext()).newPage();
  const responses = [];
  page.on('response', r => responses.push({ status: r.status(), ct: r.headers()['content-type']||'', url: r.url() }));
  await page.goto('https://www.pawscord.com', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  console.log('--- Module script suspects (text/html or 404) ---');
  responses.filter(r => /\.js(\?|$)/.test(r.url) || /\/assets\//.test(r.url)).forEach(r => {
    const flag = r.ct.includes('html') || r.status>=400 ? ' <<< BAD' : '';
    console.log(r.status, '|', r.ct.slice(0,40).padEnd(40), '|', r.url, flag);
  });
  await browser.close();
})();
