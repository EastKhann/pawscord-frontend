const { chromium } = require('@playwright/test');
(async () => {
    const browser = await chromium.launch({ headless: true });
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.goto('https://www.pawscord.com');
    await page.waitForTimeout(3000);

    try { await page.fill('input[aria-label="Username"]', 'YANHESAP'); } catch (_) { }
    try { await page.fill('input[aria-label="Password"]', 'YANHESAP'); } catch (_) { }
    try { await page.click('button[type="submit"]'); } catch (_) { }
    await page.waitForTimeout(7000);

    // Get token from localStorage
    const token = await page.evaluate(() => localStorage.getItem('access_token'));
    console.log('Token:', token ? token.substring(0, 20) + '...' : 'NONE');

    if (!token) {
        console.log('Login failed, trying to get auth from page state...');
        const allStorage = await page.evaluate(() => JSON.stringify(localStorage));
        console.log('LocalStorage keys:', Object.keys(JSON.parse(allStorage)).join(', '));
        await browser.close();
        return;
    }

    // Test visitor-logs API
    const resp = await page.evaluate(async (tok) => {
        const r = await fetch('https://api.pawscord.com/api/admin/visitor-logs/?page=1', {
            headers: { 'Authorization': 'Bearer ' + tok }
        });
        return { status: r.status, body: await r.text() };
    }, token);
    console.log('Visitor Status:', resp.status);
    console.log('Visitor Body:', resp.body.substring(0, 1000));

    // Test kanban API  
    const resp2 = await page.evaluate(async (tok) => {
        const r = await fetch('https://api.pawscord.com/api/kanban/kanban/', {
            headers: { 'Authorization': 'Bearer ' + tok }
        });
        return { status: r.status, body: await r.text() };
    }, token);
    console.log('\nKanban Status:', resp2.status);
    console.log('Kanban Body:', resp2.body.substring(0, 500));

    await browser.close();
})();
