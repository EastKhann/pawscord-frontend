// Comprehensive hover + click test
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const https = require('https');

const DIR = path.join(__dirname, 'screenshots_hover_test');
if (fs.existsSync(DIR)) fs.readdirSync(DIR).forEach(f => fs.unlinkSync(path.join(DIR, f)));
else fs.mkdirSync(DIR, { recursive: true });

let n = 0;
async function ss(page, label) {
    n++;
    const f = `${String(n).padStart(2, '0')}_${label.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
    await page.screenshot({ path: path.join(DIR, f) });
    console.log(`  [${f}]`);
}

// Get JWT token via API
function getToken() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({ username: 'YANHESAP', password: 'YANHESAP' });
        const req = https.request('https://api.pawscord.com/api/auth/login/', {
            method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) }
        }, res => {
            let body = '';
            res.on('data', c => body += c);
            res.on('end', () => resolve(JSON.parse(body)));
        });
        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

(async () => {
    // Get JWT tokens first
    console.log('[AUTH] Getting tokens...');
    const tokens = await getToken();
    console.log('  access token:', tokens.access ? 'OK' : 'MISSING');

    const browser = await chromium.launch({ headless: true });
    const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
    const page = await ctx.newPage();

    // Go to site and inject tokens
    console.log('[LOGIN] Injecting tokens...');
    await page.goto('https://www.pawscord.com', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.evaluate((t) => {
        localStorage.setItem('access_token', t.access);
        localStorage.setItem('refresh_token', t.refresh);
        // Also try auth_tokens format
        localStorage.setItem('auth_tokens', JSON.stringify({ access: t.access, refresh: t.refresh }));
    }, tokens);

    // Reload to pick up tokens
    await page.reload({ waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(5000);
    console.log('  URL:', page.url());
    await ss(page, 'after_login');

    // If still on login, try form login
    if (page.url().includes('/login')) {
        console.log('[LOGIN] Token injection failed, trying form...');
        try { await page.fill('input[aria-label="Username"]', 'YANHESAP'); } catch (_) {
            await page.fill('input[type="text"]', 'YANHESAP');
        }
        try { await page.fill('input[aria-label="Password"]', 'YANHESAP'); } catch (_) {
            await page.fill('input[type="password"]', 'YANHESAP');
        }
        await page.click('button[type="submit"]');
        await page.waitForTimeout(10000);
        console.log('  URL after form login:', page.url());
        await ss(page, 'after_form_login');
    }

    // Navigate to PawPaw server genel channel
    console.log('[NAV] Going to genel channel...');
    const genel = page.locator('text=genel').first();
    if (await genel.isVisible({ timeout: 3000 }).catch(() => false)) {
        await genel.click();
        await page.waitForTimeout(2000);
    }
    await ss(page, 'genel');

    // ── RIGHT PANEL HOVER ──
    console.log('[HOVER] Right panel items...');
    const items = await page.evaluate(() => {
        const res = [];
        const W = window.innerWidth;
        document.querySelectorAll('*').forEach(el => {
            const r = el.getBoundingClientRect();
            // Right panel area
            if (r.left > W - 420 && r.width > 40 && r.width < 400 &&
                r.height > 25 && r.height < 70) {
                const imgs = el.querySelectorAll('img');
                const hasImg = imgs.length > 0;
                const cs = window.getComputedStyle(el);
                if ((cs.cursor === 'pointer' || el.tabIndex >= 0 || el.getAttribute('role') === 'listitem') && hasImg) {
                    res.push({
                        text: el.textContent?.trim().substring(0, 30) || '',
                        x: r.x + r.width / 2,
                        y: r.y + r.height / 2
                    });
                }
            }
        });
        // Deduplicate
        const uniq = [];
        for (const item of res) {
            if (!uniq.some(u => Math.abs(u.y - item.y) < 15)) uniq.push(item);
        }
        return uniq;
    });

    console.log(`  Found ${items.length} user items`);
    for (let i = 0; i < items.length; i++) {
        const it = items[i];
        console.log(`  Hover [${i}]: "${it.text}" @ (${Math.round(it.x)},${Math.round(it.y)})`);
        await page.mouse.move(it.x, it.y);
        await page.waitForTimeout(800);
        await ss(page, `hover_${i}_${it.text.substring(0, 12)}`);
    }

    // ── Also check: does any popup/overlay appear with a huge image? ──
    console.log('[CHECK] Looking for oversized images...');
    const bigImgs = await page.evaluate(() => {
        const issues = [];
        document.querySelectorAll('img').forEach(img => {
            const r = img.getBoundingClientRect();
            if (r.width > 100 || r.height > 100) {
                issues.push({
                    src: img.src.substring(0, 80),
                    renderedW: Math.round(r.width),
                    renderedH: Math.round(r.height),
                    x: Math.round(r.x),
                    y: Math.round(r.y),
                    parentTag: img.parentElement?.tagName,
                    alt: img.alt
                });
            }
        });
        return issues;
    });
    if (bigImgs.length > 0) {
        console.log(`  Found ${bigImgs.length} images > 100px:`);
        bigImgs.forEach(img => console.log(`    ${img.renderedW}x${img.renderedH} at (${img.x},${img.y}) src=${img.src}`));
    } else {
        console.log('  No oversized images found');
    }

    // Move mouse away
    await page.mouse.move(960, 540);
    await page.waitForTimeout(300);

    // ── CHANNELS ──
    console.log('[CHANNELS]');
    for (const ch of ['PawPaw AI', 'Sinyal Bot', 'genel', 'kanban', 'Hosgeldin']) {
        try {
            const l = page.locator(`text=${ch}`).first();
            if (await l.isVisible({ timeout: 1500 }).catch(() => false)) {
                await l.click();
                await page.waitForTimeout(2000);
                await ss(page, `ch_${ch}`);
                console.log(`  OK: ${ch}`);
            } else {
                console.log(`  SKIP: ${ch} (not visible)`);
            }
        } catch (e) { console.log(`  ERR: ${ch}`); }
    }

    // ── BUTTONS ──
    console.log('[BUTTONS]');
    for (const btn of ['English Learn', 'Crypto Signals', 'Admin Panel']) {
        try {
            const el = page.locator(`text=${btn}`).first();
            if (await el.isVisible({ timeout: 1500 }).catch(() => false)) {
                await el.click();
                await page.waitForTimeout(2500);
                await ss(page, `btn_${btn}`);
                console.log(`  OK: ${btn}`);
                await page.goBack().catch(() => { });
                await page.waitForTimeout(1500);
            } else {
                console.log(`  SKIP: ${btn} (not visible)`);
            }
        } catch (e) { console.log(`  ERR: ${btn}`); }
    }

    await ss(page, 'final');
    await browser.close();
    console.log(`\nDone! ${n} screenshots in ${DIR}`);
})();
