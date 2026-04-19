/**
 * Quick check: Screenshot the welcome channel to verify mojibake is fixed.
 * Tests with PawPaw account since that's what the user sees.
 */
const { chromium } = require('@playwright/test');
const path = require('path');

const BASE_URL = 'https://www.pawscord.com';

(async () => {
    const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
    const context = await browser.newContext({
        serviceWorkers: 'block',
        viewport: { width: 1440, height: 900 },
    });
    const page = await context.newPage();

    // Login as PawPaw
    console.log('Logging in as PawPaw...');
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);
    try { await page.fill('input[aria-label="Username"]', 'PawPaw'); } catch (_) { }
    try { await page.fill('input[aria-label="Password"]', 'Deneme123.'); } catch (_) { }
    try { await page.click('button[type="submit"]'); } catch (_) { }
    await page.waitForTimeout(7000);

    // Screenshot home
    await page.screenshot({ path: path.join(__dirname, 'screenshots_v2', 'check_pawpaw_home.png') });
    console.log('Home screenshot taken');

    // Click PawPaw server
    const serverBtn = page.locator('[aria-label="Serverlar"] [role="button"]').first();
    if (await serverBtn.isVisible({ timeout: 3000 })) {
        await serverBtn.click();
        await page.waitForTimeout(1500);
        console.log('Clicked first server');
    }

    // Navigate to Hoşgeldin Kanalı
    const welcomeChannel = page.locator('.channel-item.text-channel').filter({ hasText: /Ho.geldin/i }).first();
    if (await welcomeChannel.isVisible({ timeout: 3000 })) {
        await welcomeChannel.click();
        await page.waitForTimeout(2000);
        console.log('Clicked Hoşgeldin Kanalı');
    } else {
        // Try clicking channels one by one
        const channels = page.locator('.channel-item.text-channel');
        const count = await channels.count();
        for (let i = 0; i < count; i++) {
            const ch = channels.nth(i);
            const label = await ch.getAttribute('aria-label') || '';
            console.log(`Channel ${i}: ${label}`);
            if (label.toLowerCase().includes('ho') || label.toLowerCase().includes('geldin')) {
                await ch.click();
                await page.waitForTimeout(2000);
                break;
            }
        }
    }

    await page.screenshot({ path: path.join(__dirname, 'screenshots_v2', 'check_pawpaw_welcome.png') });
    console.log('Welcome channel screenshot taken');

    // Also capture all text on page to check for mojibake
    const allText = await page.evaluate(() => document.body.innerText);
    if (allText.includes('ðŸ') || allText.includes('Ã°') || allText.includes('â€')) {
        console.log('⚠️ MOJIBAKE DETECTED on page!');
        // Find the specific mojibake
        const lines = allText.split('\n').filter(l => l.includes('ðŸ') || l.includes('Ã°') || l.includes('â€'));
        lines.forEach(l => console.log('  GARBLED:', l.trim().slice(0, 100)));
    } else {
        console.log('✅ No mojibake detected on page');
    }

    // Check for any ð character (start of CP1252 mojibake)
    const hasGarbled = await page.evaluate(() => {
        const text = document.body.innerText;
        const matches = [];
        for (let i = 0; i < text.length; i++) {
            if (text.charCodeAt(i) === 0xF0 && i + 1 < text.length && text.charCodeAt(i + 1) === 0x0178) {
                matches.push(text.substring(Math.max(0, i - 10), i + 20));
            }
        }
        return matches;
    });
    if (hasGarbled.length > 0) {
        console.log('⚠️ Found ðŸ patterns:', hasGarbled);
    }

    await browser.close();
    console.log('Done');
})();
