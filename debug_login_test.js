const { chromium } = require('@playwright/test');
(async () => {
    const browser = await chromium.launch({ headless: true });
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, serviceWorkers: 'block' });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', m => {
        if (m.type() === 'error' && !m.text().includes('Content Security Policy')) {
            errors.push(m.text().slice(0, 200));
        }
    });
    page.on('pageerror', e => errors.push('PAGEERR: ' + e.message.slice(0, 200)));

    console.log('1. Navigating to site...');
    await page.goto('https://www.pawscord.com', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);

    // Check what we see
    const bodyBefore = await page.evaluate(() => document.body.innerText.slice(0, 300));
    console.log('After initial load:', bodyBefore.slice(0, 100));

    // Click Login link
    const loginLink = page.locator('a:has-text("Login"), span:has-text("Login"), div:has-text("Login")').last();
    if (await loginLink.isVisible({ timeout: 3000 }).catch(() => false)) {
        await loginLink.click();
        await page.waitForTimeout(1000);
        console.log('2. Clicked Login link');
    }

    // Fill login form — use visible inputs only
    const uInput = page.locator('input:visible').first();
    if (await uInput.isVisible({ timeout: 3000 }).catch(() => false)) {
        await uInput.fill('YANHESAP');
        // Password is 2nd visible input
        const visibleInputs = page.locator('input:visible');
        const count = await visibleInputs.count();
        console.log('Visible inputs:', count);
        if (count >= 2) {
            await visibleInputs.nth(1).fill('YANHESAP');
        }
        console.log('3. Filled credentials');

        // Find and click submit button
        const btn = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")').first();
        if (await btn.isVisible({ timeout: 2000 }).catch(() => false)) {
            await btn.click();
            console.log('4. Clicked submit');
        }
    } else {
        console.log('No input field found');
    }

    // Wait longer
    console.log('5. Waiting 10s for app to load...');
    await page.waitForTimeout(10000);

    const url = page.url();
    console.log('6. Current URL:', url);

    const bodyAfter = await page.evaluate(() => document.body.innerText.slice(0, 500));
    console.log('7. Body text:', bodyAfter.slice(0, 200));

    // Check DOM element count
    const domInfo = await page.evaluate(() => {
        return {
            totalElements: document.querySelectorAll('*').length,
            divs: document.querySelectorAll('div').length,
            buttons: document.querySelectorAll('button').length,
            inputs: document.querySelectorAll('input').length,
            hasRoot: !!document.getElementById('root'),
            rootChildCount: document.getElementById('root')?.children?.length || 0,
            rootHTML: document.getElementById('root')?.innerHTML?.slice(0, 300) || 'empty',
        };
    });
    console.log('8. DOM info:', JSON.stringify(domInfo, null, 2));

    await page.screenshot({ path: 'screenshots_v2/debug_01_after_login.png' });

    // Try to check if app loaded but maybe is just black?
    const pixelCheck = await page.evaluate(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        return document.querySelector('[class*="sidebar"]')?.className || 'no sidebar found';
    });
    console.log('9. Sidebar class check:', pixelCheck);

    if (errors.length > 0) {
        console.log('\n=== JS ERRORS (non-CSP) ===');
        errors.forEach(e => console.log('  ', e));
    } else {
        console.log('\nNo JS errors (excluding CSP)');
    }

    await browser.close();
    console.log('Done.');
})();
