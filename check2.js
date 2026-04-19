const { chromium } = require('@playwright/test');
(async () => {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push({ message: e.message, stack: e.stack }));
  p.on('console', m => { if (m.type() === 'error') errs.push({ message: 'CONSOLE: ' + m.text() }); });
  await p.goto('https://www.pawscord.com/', { waitUntil: 'load', timeout: 60000 });
  await p.waitForSelector('input', { timeout: 30000 });
  const inputs = await p.locator('input').all();
  await inputs[0].fill('YANHESAP');
  await inputs[1].fill('YANHESAP');
  await p.locator('button[type=submit]').click();
  await p.waitForTimeout(12000);
  console.log('Errs after login:', errs.length);

  // Find Premium Store button
  const candidates = await p.locator(':text("Premium")').all();
  console.log('Premium text matches:', candidates.length);
  for (let i = 0; i < Math.min(5, candidates.length); i++) {
    try {
      const t = await candidates[i].textContent();
      console.log('try', i, ':', (t || '').slice(0, 80));
      await candidates[i].click({ timeout: 2000, force: true });
      await p.waitForTimeout(5000);
      const dom = await p.evaluate(() => document.body.innerText);
      const yuk = dom.split('\n').filter(l => l.includes('klenemedi') || l.includes('Cannot access'));
      if (yuk.length) {
        console.log('GOT DOM ERROR:');
        yuk.forEach(l => console.log(' ', l));
        break;
      }
    } catch (e) { console.log('skip', i, e.message.slice(0, 80)); }
  }
  console.log('=== PAGE ERRORS:', errs.length, '===');
  errs.forEach((e, i) => {
    console.log('---', i, '---');
    console.log(e.message.slice(0, 400));
    if (e.stack) console.log(e.stack.split('\n').slice(0, 12).join('\n'));
  });
  await b.close();
})();