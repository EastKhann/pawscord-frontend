const { chromium } = require('playwright');

(async () => {
    const b = await chromium.launch({ headless: true });
    const ctx = await b.newContext({ serviceWorkers: 'block', viewport: { width: 1400, height: 900 } });
    const p = await ctx.newPage();

    const errors = [];
    p.on('pageerror', e => errors.push('PAGEERROR: ' + e.message.substring(0, 300)));

    // 1. Load site
    await p.goto('https://www.pawscord.com', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await p.waitForTimeout(3000);

    // 2. Login
    const inputs = await p.$$('input');
    if (inputs.length >= 2) {
        await inputs[0].fill('YANHESAP');
        await inputs[1].fill('YANHESAP');
        await p.keyboard.press('Enter');
        console.log('LOGIN: submitted');
    }

    await p.waitForTimeout(6000);

    // 3. Check home page
    const body = await p.evaluate(() => document.body?.innerText?.substring(0, 300));
    console.log('AFTER_LOGIN_BODY:', body?.substring(0, 200));

    // 4. Check for error boundaries
    const uiIssues = await p.evaluate(() => {
        const text = document.body.innerText;
        const issues = [];
        if (text.includes('failed to load')) {
            // Find which sections failed
            const matches = text.match(/[\w\s]+ failed to load\./g);
            if (matches) issues.push(...matches);
        }
        if (text.includes('Maximum call stack')) issues.push('MAX_CALL_STACK');
        if (text.match(/\w+ is not defined/)) {
            const m = text.match(/(\w+ is not defined)/g);
            if (m) issues.push(...m);
        }
        return issues;
    });
    console.log('UI_ISSUES:', JSON.stringify(uiIssues));

    // 5. Navigate to a server channel
    const serverIcons = await p.$$('[class*="server"], [data-testid*="server"]');
    console.log('SERVER_ICONS:', serverIcons.length);

    // Click second sidebar icon (first server)
    const sidebarIcons = await p.$$('div[style*="width: 48px"][style*="height: 48px"], img[style*="48px"]');
    for (const icon of sidebarIcons.slice(0, 5)) {
        try { await icon.click(); } catch { }
    }
    await p.waitForTimeout(3000);

    // Re-check for errors after navigation
    const uiIssues2 = await p.evaluate(() => {
        const text = document.body.innerText;
        const issues = [];
        if (text.includes('failed to load')) {
            const matches = text.match(/[\w\s]+ failed to load\./g);
            if (matches) issues.push(...matches);
        }
        if (text.includes('Maximum call stack')) issues.push('MAX_CALL_STACK');
        if (text.match(/\w+ is not defined/)) {
            const m = text.match(/(\w+ is not defined)/g);
            if (m) issues.push(...m);
        }
        return issues;
    });
    console.log('UI_ISSUES_AFTER_NAV:', JSON.stringify(uiIssues2));

    // Take screenshot
    await p.screenshot({ path: 'verify_after_login.png', fullPage: false });
    console.log('SCREENSHOT: verify_after_login.png');

    console.log('PAGE_ERRORS:', JSON.stringify(errors.slice(0, 10)));
    await b.close();
})();
