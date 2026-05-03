const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await (await browser.newContext()).newPage();
    const errors = [], badMime = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    page.on('pageerror', err => errors.push('PAGE: ' + err.message));
    page.on('response', resp => {
        const u = resp.url(), ct = resp.headers()['content-type'] || '';
        if ((u.includes('.js') || u.includes('.css')) && !ct.includes('javascript') && !ct.includes('css') && !u.includes('beacon')) {
            badMime.push(`${resp.status()} ${u} -> ${ct}`);
        }
    });
    try { await page.goto('https://www.pawscord.com/', { waitUntil: 'networkidle', timeout: 30000 }); } catch (e) { console.log('NAV:', e.message); }
    await page.waitForTimeout(3000);
    console.log('Title:', await page.title());
    console.log('Body:', (await page.evaluate(() => document.body ? document.body.innerText.substring(0, 200) : 'NONE')).replace(/\n/g, ' | '));
    console.log('BadMIME:', badMime.length ? badMime.join('\n  ') : 'NONE');
    console.log('Errors:', errors.length ? JSON.stringify(errors, null, 2) : 'NONE');
    // print resource list
    await browser.close();
})();
