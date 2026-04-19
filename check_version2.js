const { chromium } = require('@playwright/test');
(async () => {
    const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    const scripts = [];
    page.on('response', async (resp) => {
        const url = resp.url();
        if (url.endsWith('.js')) {
            scripts.push(url);
        }
    });

    // Try the direct production deploy URL 
    const url = 'https://96e0507b.pawscord.pages.dev';
    console.log('Testing:', url);
    try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
        console.log('Title:', await page.title());
        console.log('JS files loaded:', scripts.length);
        scripts.filter(s => s.includes('main')).forEach(s => console.log('  MAIN:', s.split('/').pop()));
        if (scripts.length === 0) {
            console.log('All scripts:');
            scripts.forEach(s => console.log('  ', s));
        }
    } catch (e) {
        console.log('ERROR:', e.message.slice(0, 200));
    }

    // Also test production
    scripts.length = 0;
    console.log('\nTesting: https://www.pawscord.com (no cache)');
    const ctx2 = await browser.newContext({
        bypassCSP: true,
        extraHTTPHeaders: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
    });
    const page2 = await ctx2.newPage();
    page2.on('response', async (resp) => {
        const url = resp.url();
        if (url.endsWith('.js')) scripts.push(url);
    });
    try {
        await page2.goto('https://www.pawscord.com', { waitUntil: 'networkidle', timeout: 30000 });
        console.log('Title:', await page2.title());
        scripts.filter(s => s.includes('main')).forEach(s => console.log('  MAIN:', s.split('/').pop()));
        const hasCorrect = scripts.some(s => s.includes('CSre8QsR'));
        console.log('Correct version (CSre8QsR):', hasCorrect);
    } catch (e) {
        console.log('ERROR:', e.message.slice(0, 200));
    }

    await browser.close();
})();
