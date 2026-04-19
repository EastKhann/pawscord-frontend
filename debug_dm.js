const { chromium } = require('@playwright/test');
(async () => {
    const b = await chromium.launch({ headless: true });
    const p = await b.newPage();
    p.on('console', m => { if (m.type() === 'error') console.error('[ERR]', m.text().slice(0, 120)); });
    await p.goto('https://www.pawscord.com', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await p.waitForTimeout(2500);
    await p.fill('input[aria-label="Username"]', 'YANHESAP');
    await p.fill('input[aria-label="Password"]', 'YANHESAP');
    await p.click('button[type="submit"]');
    await p.waitForTimeout(6000);
    // Click PawPaw DM
    const dm = p.locator('[role="button"]').filter({ hasText: /^PawPaw/ });
    const ct = await dm.count();
    console.log('PawPaw button count:', ct);
    if (ct > 0) {
        await dm.first().click();
        await p.waitForTimeout(4000);
    }
    await p.screenshot({ path: 'debug_after_dm.png' });
    const toolbarBtns = await p.evaluate(() => {
        const all = document.querySelectorAll('button');
        return Array.from(all).map(el => ({
            label: el.getAttribute('aria-label'),
            title: el.getAttribute('title'),
            text: el.textContent.trim().slice(0, 20)
        })).filter(el => el.label || el.title);
    });
    console.log('BUTTONS:', JSON.stringify(toolbarBtns.slice(0, 40), null, 2));
    await b.close();
})();
