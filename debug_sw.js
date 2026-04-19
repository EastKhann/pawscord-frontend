const { chromium } = require('@playwright/test');
(async () => {
    const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();

    const failedJS = [];
    const loadedJS = [];
    page.on('response', resp => {
        const url = resp.url();
        if (url.includes('.js')) {
            const name = url.split('/').pop().split('?')[0];
            if (resp.status() >= 400) {
                failedJS.push({ name, status: resp.status() });
            } else {
                loadedJS.push(name);
            }
        }
    });
    page.on('console', msg => {
        if (msg.type() === 'error') {
            const text = msg.text();
            if (text.includes('module script') || text.includes('Failed to load')) {
                console.log('CONSOLE_ERR:', text.slice(0, 200));
            }
        }
    });

    // Load the page
    await page.goto('https://www.pawscord.com', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);

    // Unregister any service workers
    await page.evaluate(async () => {
        if ('serviceWorker' in navigator) {
            const regs = await navigator.serviceWorker.getRegistrations();
            for (const reg of regs) {
                await reg.unregister();
                console.log('Unregistered SW:', reg.scope);
            }
        }
    });

    // Reload after unregistering SW
    await page.reload({ waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);

    // Login
    try {
        await page.fill('input[aria-label="Username"]', 'YANHESAP');
        await page.fill('input[aria-label="Password"]', 'YANHESAP');
        await page.click('button[type="submit"]');
        console.log('Login submitted');
    } catch (e) {
        console.log('Login failed:', e.message.slice(0, 100));
    }
    await page.waitForTimeout(7000);

    console.log('\nLoaded JS:', loadedJS.length);
    console.log('Failed JS:', failedJS.length);
    failedJS.forEach(f => console.log('  FAILED:', f.status, f.name));

    // Check DOM
    const hasLogin = await page.locator('input[aria-label="Username"]').count();
    const hasHome = await page.locator('[aria-label="Home"]').isVisible({ timeout: 2000 }).catch(() => false);
    console.log('\nLogin form:', hasLogin > 0);
    console.log('Home button:', hasHome);

    // Check for error boundaries
    const boundaries = await page.evaluate(() => {
        const els = document.querySelectorAll('div, p');
        const found = [];
        for (const el of els) {
            const t = el.textContent || '';
            if ((t.includes('failed to load') || t.includes('is not defined')) && t.length < 200) {
                found.push(t.trim());
            }
        }
        return [...new Set(found)];
    });
    console.log('\nError boundaries:', boundaries.length);
    boundaries.forEach(b => console.log('  ', b.slice(0, 150)));

    await page.screenshot({ path: 'screenshots/debug_sw.png' });
    await browser.close();
})();
