const { chromium } = require('playwright');

(async () => {
    const b = await chromium.launch({ headless: true });
    const ctx = await b.newContext({ serviceWorkers: 'block' });
    const p = await ctx.newPage();

    const errors = [];
    p.on('console', m => {
        if (m.type() === 'error') errors.push(m.text().substring(0, 200));
    });
    p.on('pageerror', e => errors.push('PAGEERROR: ' + e.message.substring(0, 200)));

    // Check for JS files returning wrong content-type
    const failedJS = [];
    p.on('response', r => {
        if (r.url().endsWith('.js') && r.headers()['content-type']?.includes('text/html')) {
            failedJS.push(r.url().split('/').pop());
        }
    });

    await p.goto('https://www.pawscord.com', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await p.waitForTimeout(6000);

    const inputs = await p.$$('input');
    console.log('INPUT_COUNT:', inputs.length);

    const body = await p.evaluate(() => document.body?.innerText?.substring(0, 500));
    console.log('BODY:', body);

    // Check for login form
    const hasLogin = await p.evaluate(() => {
        const inputs = document.querySelectorAll('input');
        return Array.from(inputs).some(i => i.type === 'password' || i.name === 'password' || i.placeholder?.toLowerCase().includes('password'));
    });
    console.log('HAS_LOGIN_FORM:', hasLogin);

    // Check for error boundaries
    const errorBoundaries = await p.evaluate(() => {
        const texts = document.body.innerText;
        const issues = [];
        if (texts.includes('failed to load')) issues.push('ERROR_BOUNDARY_VISIBLE');
        if (texts.includes('Maximum call stack')) issues.push('MAX_CALL_STACK');
        if (texts.includes('is not defined')) issues.push('NOT_DEFINED_ERROR');
        return issues;
    });
    console.log('UI_ISSUES:', JSON.stringify(errorBoundaries));
    console.log('FAILED_JS:', JSON.stringify(failedJS));
    console.log('CONSOLE_ERRORS:', JSON.stringify(errors.slice(0, 10)));

    await b.close();
})();
