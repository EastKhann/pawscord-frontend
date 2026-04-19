const { chromium } = require('@playwright/test');
(async () => {
    const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const errors = [];
    page.on('pageerror', err => {
        errors.push({ msg: err.message.slice(0, 300), stack: err.stack ? err.stack.slice(0, 1000) : 'no stack' });
    });
    await page.goto('https://www.pawscord.com', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);
    await page.fill('input[aria-label="Username"]', 'YANHESAP');
    await page.fill('input[aria-label="Password"]', 'YANHESAP');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(7000);

    // Open admin panel to trigger modal loading
    const adminBtn = page.locator('button[aria-label="Open Admin Panel"]');
    if (await adminBtn.isVisible({ timeout: 3000 })) {
        await adminBtn.click();
        await page.waitForTimeout(5000);
    }

    console.log('Page errors:', errors.length);
    errors.forEach((e, i) => {
        console.log(`\n--- ERROR ${i + 1} ---`);
        console.log('MSG:', e.msg);
        console.log('STACK:', e.stack);
    });

    if (errors.length === 0) {
        console.log('\nNo page errors! Checking DOM for error boundaries...');
        const boundaryTexts = await page.evaluate(() => {
            const els = document.querySelectorAll('div, p, span');
            const found = [];
            for (const el of els) {
                const text = el.textContent || '';
                if ((text.includes('failed to load') || text.includes('is not defined')) && text.length < 200) {
                    found.push(text.trim());
                }
            }
            return [...new Set(found)];
        });
        boundaryTexts.forEach(t => console.log('  DOM:', t));
    }

    await browser.close();
})();
