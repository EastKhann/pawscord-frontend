const { chromium } = require('@playwright/test');
(async () => {
    const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    // Track loaded scripts
    const scripts = [];
    page.on('response', async (resp) => {
        const url = resp.url();
        if (url.includes('.js') && url.includes('assets')) {
            scripts.push(url.split('/').pop());
        }
    });

    await page.goto('https://www.pawscord.com', { waitUntil: 'networkidle', timeout: 30000 });
    console.log('Loaded scripts (main):');
    scripts.filter(s => s.includes('main')).forEach(s => console.log('  ', s));

    // Check if it matches our latest build
    console.log('\nExpected main chunk: main-CSre8QsR.js');
    const hasCorrect = scripts.some(s => s.includes('CSre8QsR'));
    console.log('Correct version loaded:', hasCorrect);

    await browser.close();
})();
