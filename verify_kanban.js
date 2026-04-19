const { chromium } = require('@playwright/test');
const path = require('path');
const SHOTS = path.join(__dirname, 'screenshots_server');
(async () => {
    const resp = await fetch('https://api.pawscord.com/api/auth/login/', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'YANHESAP', password: 'YANHESAP' })
    });
    const { access, refresh } = await resp.json();
    const browser = await chromium.launch({ headless: true });
    const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 }, serviceWorkers: 'block' })).newPage();
    await page.goto('https://www.pawscord.com', { waitUntil: 'domcontentloaded' });
    await page.evaluate(({ a, r }) => { localStorage.setItem('access_token', a); localStorage.setItem('refresh_token', r); }, { a: access, r: refresh });
    await page.reload({ waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(5000);
    await page.locator('[role="button"][title="PawPaw"]').click();
    await page.waitForTimeout(3000);
    await page.locator('.channel-item').filter({ hasText: /^kanban$/i }).first().click();
    await page.waitForTimeout(4000);
    await page.screenshot({ path: path.join(SHOTS, 'kanban_verify.png') });
    const text = await page.evaluate(() => document.body.innerText.slice(0, 500));
    console.log('Kanban page text:', text.slice(0, 300));
    await browser.close();
})();
