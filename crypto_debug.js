// crypto_debug.js — Test crypto page loading on desktop
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();

    const consoleLogs = [];
    const networkErrors = [];

    page.on('console', msg => {
        const type = msg.type();
        if (['error', 'warn'].includes(type)) {
            consoleLogs.push(`[${type}] ${msg.text()}`);
        }
    });

    page.on('requestfailed', req => {
        networkErrors.push(`FAILED: ${req.method()} ${req.url()} — ${req.failure()?.errorText}`);
    });

    page.on('response', res => {
        if (res.status() >= 400) {
            networkErrors.push(`HTTP ${res.status()}: ${res.url()}`);
        }
    });

    // Login - first navigate to site so we can use localStorage
    console.log('1. Navigating to site...');
    await page.goto('https://www.pawscord.com', { waitUntil: 'domcontentloaded', timeout: 30000 });

    console.log('2. Logging in...');
    const loginRes = await page.evaluate(async () => {
        const r = await fetch('https://api.pawscord.com/api/auth/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'YANHESAP', password: 'YANHESAP' })
        });
        return r.json();
    });

    await page.evaluate((token) => {
        localStorage.setItem('access_token', token);
        localStorage.setItem('token', token);
    }, loginRes.access);

    await page.reload({ waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    console.log('3. Logged in. Navigating to crypto...');

    // Navigate to crypto signals page via sidebar click
    console.log('4. Looking for Kripto Sinyalleri button...');
    const cryptoBtn = await page.$('text=Kripto Sinyalleri') || await page.$('[title*="Kripto"]') || await page.$('a[href*="crypto"]');
    if (cryptoBtn) {
        await cryptoBtn.click();
        await page.waitForTimeout(5000);
        console.log('5. Clicked crypto button');
    } else {
        // Try sidebar emoji button (from audit screenshots, it's the 📊 button)
        console.log('4b. No text button found, trying sidebar icons...');
        const sidebarBtns = await page.$$('.quick-access-btn, [class*="sidebar"] button, [class*="side"] a');
        console.log(`   Found ${sidebarBtns.length} sidebar buttons`);
        // Try navigating directly via React router
        await page.evaluate(() => {
            window.history.pushState({}, '', '/crypto-analysis');
            window.dispatchEvent(new PopStateEvent('popstate'));
        });
        await page.waitForTimeout(5000);
        console.log('5. Used pushState to navigate');
    }

    // Check page state
    const pageText = await page.textContent('body');
    const isLoading = pageText.includes('Loading Crypto Data') || pageText.includes('Kripto Verileri Yükleniyor');
    const hasError = pageText.includes('Failed to') || pageText.includes('Hata');
    const hasTabs = pageText.includes('TUM_STRATEJILER') || pageText.includes('Tüm Stratejiler');
    const hasData = pageText.includes('LONG') || pageText.includes('SHORT');

    console.log(`\n=== CRYPTO PAGE STATE ===`);
    console.log(`Still loading: ${isLoading}`);
    console.log(`Has error: ${hasError}`);
    console.log(`Has tabs: ${hasTabs}`);
    console.log(`Has signal data: ${hasData}`);

    // Take screenshot  
    await page.screenshot({ path: '../audit_screenshots/crypto_debug_desktop.png', fullPage: true });
    console.log('Screenshot saved to audit_screenshots/crypto_debug_desktop.png');

    console.log(`\n=== CONSOLE ERRORS (${consoleLogs.length}) ===`);
    consoleLogs.forEach(l => console.log(l));

    console.log(`\n=== NETWORK ERRORS (${networkErrors.length}) ===`);
    networkErrors.forEach(l => console.log(l));

    // Check if spinning element exists
    const spinnerExists = await page.$('.crypto-spin');
    console.log(`\nSpinner element visible: ${!!spinnerExists}`);

    // Try to read the actual loaded content
    const contentSample = pageText.substring(0, 1000).replace(/\s+/g, ' ').trim();
    console.log(`\nPage content sample: ${contentSample.substring(0, 500)}`);

    await browser.close();
    console.log('\nDone.');
})();
