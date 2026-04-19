const { chromium } = require('@playwright/test');
(async () => {
    const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const errors = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text().slice(0, 300)); });
    page.on('pageerror', err => errors.push('PAGE_ERR: ' + err.message.slice(0, 300)));

    // Use the direct deploy URL (no CDN cache)
    await page.goto('https://7767214a.pawscord.pages.dev', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);
    await page.fill('input[aria-label="Username"]', 'YANHESAP');
    await page.fill('input[aria-label="Password"]', 'YANHESAP');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(7000);
    console.log('Logged in, URL:', page.url());

    // Try opening admin panel (which triggers modal load)
    const adminBtn = page.locator('button[aria-label="Open Admin Panel"]');
    if (await adminBtn.isVisible({ timeout: 3000 })) {
        await adminBtn.click();
        await page.waitForTimeout(3000);
    }

    // Check for error boundaries in DOM
    const boundaryTexts = await page.evaluate(() => {
        const els = document.querySelectorAll('[role="alert"], [style*="error"], div');
        const found = [];
        for (const el of els) {
            const text = el.textContent || '';
            if (text.includes('failed to load') || text.includes('is not defined')) {
                found.push(text.trim().slice(0, 200));
            }
        }
        return [...new Set(found)];
    });

    console.log('\nConsole errors:', errors.length);
    errors.forEach(e => console.log('  ERR:', e));
    console.log('\nDOM boundary texts:', boundaryTexts.length);
    boundaryTexts.forEach(t => console.log('  DOM:', t));

    await page.screenshot({ path: 'screenshots/direct_deploy_test.png' });
    await browser.close();
})();
