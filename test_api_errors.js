const { chromium } = require('@playwright/test');
(async () => {
    const browser = await chromium.launch({ headless: true });
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.goto('https://www.pawscord.com', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);
    try { await page.fill('input[aria-label="Username"]', 'YANHESAP'); } catch (e) { }
    try { await page.fill('input[aria-label="Password"]', 'YANHESAP'); } catch (e) { }
    try { await page.click('button[type="submit"]'); } catch (e) { }
    await page.waitForTimeout(5000);

    const endpoints = [
        '/api/admin/detailed-stats/',
        '/api/admin/security-alerts/',
        '/api/admin/system-logs/?type=all&limit=100',
        '/api/admin/db-stats/'
    ];

    for (const ep of endpoints) {
        try {
            const resp = await page.evaluate(async (url) => {
                const token = localStorage.getItem('access_token') || localStorage.getItem('token');
                const r = await fetch(url, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    }
                });
                const text = await r.text();
                return { status: r.status, body: text.slice(0, 800) };
            }, 'https://api.pawscord.com' + ep);
            console.log('\n=== ' + ep + ' ===');
            console.log('Status:', resp.status);
            console.log('Body:', resp.body);
        } catch (err) {
            console.log('\n=== ' + ep + ' ERROR ===', err.message);
        }
    }

    await browser.close();
})();
