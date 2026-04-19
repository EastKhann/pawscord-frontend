const { chromium } = require('@playwright/test');
const path = require('path');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
    const dir = path.join(__dirname, '..', 'audit_screenshots');

    console.log('Navigating to login...');
    await page.goto('https://www.pawscord.com', { waitUntil: 'networkidle', timeout: 30000 });

    // Wait for login form
    await page.waitForSelector('.login-card', { timeout: 15000 }).catch(() => { });
    await page.waitForTimeout(2000);

    // Login
    const user = await page.$('.login-card input[type="text"]');
    const pass = await page.$('.login-card input[type="password"]');
    if (user && pass) {
        await user.fill('YANHESAP');
        await pass.fill('YANHESAP');
        await page.click('.submit-btn');
        console.log('Logged in, waiting for app...');
        await page.waitForTimeout(5000);
    }

    // Screenshot home page
    await page.screenshot({ path: path.join(dir, 'verify_home.png'), fullPage: false });
    console.log('Home screenshot taken');

    // Open payment modal
    const paymentBtn = await page.$('[aria-label*="payment"], [aria-label*="Payment"], button:has-text("💰")');
    if (paymentBtn) {
        await paymentBtn.click();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: path.join(dir, 'verify_payment.png'), fullPage: false });
        console.log('Payment screenshot taken');
        // Close
        const closeBtn = await page.$('button[aria-label="Close"]');
        if (closeBtn) await closeBtn.click();
        await page.waitForTimeout(500);
    }

    // Open store modal
    const storeBtn = await page.$('button:has-text("🛍️"), button:has-text("🎁")');
    if (storeBtn) {
        await storeBtn.click();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: path.join(dir, 'verify_store.png'), fullPage: false });
        console.log('Store screenshot taken');
    }

    // Open avatar studio
    const avatarBtn = await page.$('button:has-text("🎨")');
    if (avatarBtn) {
        // Close any open modal first
        const close = await page.$('button[aria-label="Close"]');
        if (close) await close.click();
        await page.waitForTimeout(500);
        await avatarBtn.click();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: path.join(dir, 'verify_avatar.png'), fullPage: false });
        console.log('Avatar screenshot taken');
    }

    // Open admin panel
    const adminBtn = await page.$('button:has-text("Yönetici"), [aria-label*="admin"]');
    if (adminBtn) {
        const close = await page.$('button[aria-label="Close"]');
        if (close) await close.click();
        await page.waitForTimeout(500);
        await adminBtn.click();
        await page.waitForTimeout(2000);
        await page.screenshot({ path: path.join(dir, 'verify_admin.png'), fullPage: false });
        console.log('Admin screenshot taken');
    }

    await browser.close();
    console.log('DONE');
})();
