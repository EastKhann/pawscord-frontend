const { chromium } = require('@playwright/test');
(async () => {
    const b = await chromium.launch({ headless: true });
    const p = await b.newPage();
    await p.goto('https://www.pawscord.com', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await p.waitForTimeout(3000);

    // Find all inputs on login page
    const inputs = await p.evaluate(() => {
        return Array.from(document.querySelectorAll('input, button[type=submit]')).map(el => ({
            tag: el.tagName.toLowerCase(),
            type: el.type,
            name: el.name,
            id: el.id,
            placeholder: el.placeholder,
            ariaLabel: el.getAttribute('aria-label'),
            value: el.value
        }));
    });
    console.log('INPUTS:', JSON.stringify(inputs, null, 2));
    await p.screenshot({ path: 'debug_login_page.png' });
    await b.close();
})();
