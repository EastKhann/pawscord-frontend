const { chromium } = require('@playwright/test');
(async () => {
    const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();

    const failedModules = [];
    page.on('console', msg => {
        const text = msg.text();
        if (text.includes('Failed to load module') || text.includes('module script')) {
            failedModules.push(text.slice(0, 300));
        }
    });
    page.on('response', resp => {
        if (resp.url().endsWith('.js') && resp.status() >= 400) {
            console.log('FAILED JS:', resp.status(), resp.url().split('/').pop());
        }
    });

    await page.goto('https://www.pawscord.com', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(5000);

    // Get the index.html content
    const html = await page.content();
    const scriptMatches = html.match(/src="[^"]*\.js"/g) || [];
    console.log('Scripts in HTML:');
    scriptMatches.forEach(s => console.log('  ', s));

    console.log('\nFailed module loads:', failedModules.length);
    failedModules.forEach(f => console.log('  ', f.slice(0, 200)));

    // Check if login form exists
    const hasLogin = await page.locator('input[aria-label="Username"]').count();
    console.log('\nLogin form present:', hasLogin > 0);

    await page.screenshot({ path: 'screenshots/debug_deploy.png' });
    await browser.close();
})();
