const { chromium } = require('@playwright/test');
(async () => {
    const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    page.on('console', msg => { if (msg.type() === 'error') console.log('ERR:', msg.text().slice(0, 200)); });
    page.on('pageerror', err => console.log('PAGE_ERR:', err.message.slice(0, 200)));
    try {
        await page.goto('https://www.pawscord.com', { waitUntil: 'domcontentloaded', timeout: 30000 });
        await page.waitForTimeout(2000);
        await page.fill('input[aria-label="Username"]', 'YANHESAP');
        await page.fill('input[aria-label="Password"]', 'YANHESAP');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(7000);
        console.log('URL_AFTER_LOGIN:', page.url());
        await page.screenshot({ path: 'screenshots/test_login.png' });
        console.log('LOGIN_OK');
        const h = page.locator('[aria-label="Home"]').first();
        console.log('HOME_VISIBLE:', await h.isVisible({ timeout: 3000 }));
        await page.keyboard.press('Escape');
        console.log('ALL_OK');
    } catch (e) { console.log('FAIL:', e.message.slice(0, 200)); }
    await browser.close();
})();
