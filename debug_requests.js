const { chromium } = require('@playwright/test');
(async () => {
    const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
    const ctx = await browser.newContext({ serviceWorkers: 'block', viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();

    const requests = [];
    page.on('request', req => {
        const url = req.url();
        if (url.includes('/assets/js/')) {
            requests.push(url.split('/').pop());
        }
    });
    page.on('response', resp => {
        const url = resp.url();
        if (url.includes('/assets/js/') && resp.headers()['content-type']?.includes('text/html')) {
            console.log('HTML_INSTEAD_OF_JS:', resp.status(), url.split('/').pop());
        }
    });

    await page.goto('https://www.pawscord.com', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(5000);

    console.log('\nTotal JS requests:', requests.length);
    console.log('Unique:', [...new Set(requests)].length);

    // Check if login form exists
    const hasLogin = await page.locator('input').count();
    console.log('Input elements:', hasLogin);

    await page.screenshot({ path: 'screenshots/debug_requests.png' });
    await browser.close();
})();
