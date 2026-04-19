const { chromium } = require('@playwright/test');
(async () => {
    const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
    // Block service workers completely
    const ctx = await browser.newContext({
        serviceWorkers: 'block',
        viewport: { width: 1440, height: 900 }
    });
    const page = await ctx.newPage();

    const htmlResponses = [];
    page.on('response', resp => {
        const url = resp.url();
        if (url.includes('/assets/js/') && resp.headers()['content-type']?.includes('text/html')) {
            htmlResponses.push(url.split('/').pop());
        }
    });
    page.on('console', msg => {
        if (msg.type() === 'error') {
            const t = msg.text();
            if (t.includes('module script') || t.includes('Failed to load')) {
                console.log('ERR:', t.slice(0, 250));
            }
        }
    });

    await page.goto('https://www.pawscord.com', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(5000);

    console.log('HTML responses for JS files:', htmlResponses.length);
    htmlResponses.forEach(h => console.log('  HTML:', h));

    const hasLogin = await page.locator('input[aria-label="Username"]').count();
    console.log('Login form present:', hasLogin > 0);

    if (hasLogin > 0) {
        await page.fill('input[aria-label="Username"]', 'YANHESAP');
        await page.fill('input[aria-label="Password"]', 'YANHESAP');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(7000);

        const homeBtn = await page.locator('[aria-label="Home"]').isVisible({ timeout: 3000 }).catch(() => false);
        console.log('Home button visible:', homeBtn);

        // Check boundaries
        const boundaries = await page.evaluate(() => {
            const found = [];
            for (const el of document.querySelectorAll('div, p')) {
                const t = el.textContent || '';
                if ((t.includes('failed to load') || t.includes('is not defined')) && t.length < 200) {
                    found.push(t.trim());
                }
            }
            return [...new Set(found)];
        });
        console.log('Error boundaries:', boundaries.length);
        boundaries.forEach(b => console.log('  ', b.slice(0, 150)));
    }

    await page.screenshot({ path: 'screenshots/debug_nosw.png' });
    await browser.close();
})();
