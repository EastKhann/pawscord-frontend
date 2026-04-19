/**
 * Pawscord Deep Visual Audit v3 — Token-based auth
 * Uses API login to get token, injects into localStorage, then audits all pages.
 * 
 * Run: node deep_audit_v3.js
 */
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const BASE = 'https://www.pawscord.com';
const API = 'https://api.pawscord.com/api';
const SHOTS = path.join(__dirname, 'screenshots_v3');

// Clean up screenshots dir
if (fs.existsSync(SHOTS)) {
    fs.readdirSync(SHOTS).forEach(f => { if (f.endsWith('.png')) fs.unlinkSync(path.join(SHOTS, f)); });
} else {
    fs.mkdirSync(SHOTS, { recursive: true });
}

let idx = 0;
const report = [];
const jsErrors = [];

function slug(s) { return s.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 50); }

async function shot(page, label) {
    idx++;
    const num = String(idx).padStart(3, '0');
    const file = `${num}_${slug(label)}.png`;
    try { await page.screenshot({ path: path.join(SHOTS, file), fullPage: false }); } catch (_) { }
    report.push({ idx, label, file });
    console.log(`  📸 [${num}] ${label}`);
}

async function wait(page, ms = 1000) { await page.waitForTimeout(ms); }

async function tryClick(page, sel, timeout = 3000) {
    try {
        const el = page.locator(sel).first();
        if (await el.isVisible({ timeout })) {
            await el.click({ timeout });
            await wait(page, 800);
            return true;
        }
    } catch (_) { }
    return false;
}

(async () => {
    const startTime = Date.now();

    // ── Step 1: Get token via API ──────────────────────────────────────────
    console.log('═══ AUTHENTICATION ═══');
    let accessToken, refreshToken;
    try {
        const resp = await fetch(`${API}/auth/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'YANHESAP', password: 'YANHESAP' })
        });
        const data = await resp.json();
        accessToken = data.access;
        refreshToken = data.refresh;
        if (!accessToken) throw new Error('No access token: ' + JSON.stringify(data));
        console.log('  ✅ Token acquired');
    } catch (e) {
        console.error('  ❌ Login failed:', e.message);
        process.exit(1);
    }

    // ── Step 2: Launch browser ─────────────────────────────────────────────
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        serviceWorkers: 'block',
    });
    const page = await context.newPage();

    // Collect non-CSP errors
    page.on('console', msg => {
        if (msg.type() === 'error' && !msg.text().includes('Content Security Policy') && !msg.text().includes('favicon')) {
            jsErrors.push(msg.text().slice(0, 200));
        }
    });
    page.on('pageerror', err => {
        jsErrors.push('PAGE_ERR: ' + err.message.slice(0, 200));
    });

    // ── Step 3: Inject token and navigate ──────────────────────────────────
    console.log('\n═══ LOADING APP ═══');
    await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.evaluate(({ at, rt }) => {
        localStorage.setItem('access_token', at);
        localStorage.setItem('refresh_token', rt);
    }, { at: accessToken, rt: refreshToken });
    await page.reload({ waitUntil: 'networkidle', timeout: 30000 });
    await wait(page, 5000);
    await shot(page, 'home_after_login');

    // Check if app loaded
    const rootChildren = await page.evaluate(() => document.getElementById('root')?.children?.length || 0);
    const bodyText = await page.evaluate(() => document.body.innerText.slice(0, 200));
    console.log(`  Root children: ${rootChildren}, Body: ${bodyText.slice(0, 80)}`);

    if (rootChildren < 2) {
        console.log('  ⚠️ App may not have loaded. Waiting more...');
        await wait(page, 5000);
        await shot(page, 'home_retry');
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SIDEBAR NAVIGATION
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n═══ SIDEBAR ═══');

    // Discover servers button (compass icon)
    if (await tryClick(page, '[aria-label*="Discover"], [aria-label*="discover"], [title*="Discover"]')) {
        await wait(page, 2000);
        await shot(page, 'discover_servers');
    }

    // Go back home
    if (await tryClick(page, '[aria-label="Home"], [aria-label="home"]')) {
        await wait(page, 1500);
    }

    // Premium store (crown/store icon)
    if (await tryClick(page, '[aria-label*="Store"], [aria-label*="Premium"], [title*="Store"]')) {
        await wait(page, 2000);
        await shot(page, 'premium_store');
        // Back
        await page.keyboard.press('Escape');
        await wait(page, 500);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // DM / FRIENDS
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n═══ DM / FRIENDS ═══');
    // Click first DM if any
    const dmItems = page.locator('[class*="dmItem"], [class*="dm-item"], [class*="friendItem"]');
    const dmCount = await dmItems.count().catch(() => 0);
    console.log(`  DM items visible: ${dmCount}`);
    if (dmCount > 0) {
        await dmItems.first().click();
        await wait(page, 2000);
        await shot(page, 'dm_chat');
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SERVER LIST
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n═══ SERVERS ═══');
    // Find server icons in sidebar
    const serverIcons = page.locator('[class*="serverIcon"], [class*="server-icon"], [data-server-id]');
    const serverCount = await serverIcons.count().catch(() => 0);
    console.log(`  Server icons: ${serverCount}`);
    for (let i = 0; i < Math.min(serverCount, 3); i++) {
        try {
            await serverIcons.nth(i).click();
            await wait(page, 2000);
            await shot(page, `server_${i + 1}`);

            // Click channels
            const channels = page.locator('[class*="channelItem"], [class*="channel-item"], [class*="channelName"]');
            const chCount = await channels.count().catch(() => 0);
            console.log(`  Channels in server ${i + 1}: ${chCount}`);
            for (let c = 0; c < Math.min(chCount, 3); c++) {
                try {
                    await channels.nth(c).click();
                    await wait(page, 1500);
                    await shot(page, `server_${i + 1}_ch_${c + 1}`);
                } catch (_) { }
            }

            // Check right sidebar (members)
            const members = page.locator('[class*="memberItem"], [class*="member-item"], [class*="userItem"]');
            const memCount = await members.count().catch(() => 0);
            if (memCount > 0) {
                await shot(page, `server_${i + 1}_members`);
            }
        } catch (_) { }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SETTINGS (gear icon)
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n═══ USER SETTINGS ═══');
    if (await tryClick(page, '[aria-label*="Settings"], [aria-label*="settings"], [title*="Setting"]')) {
        await wait(page, 2000);
        await shot(page, 'settings_main');

        // Click through settings tabs
        const settingsTabs = ['Account', 'Profile', 'Privacy', 'Security', 'Appearance', 'Notifications', 'Language', 'Connections'];
        for (const tab of settingsTabs) {
            if (await tryClick(page, `text="${tab}"`, 1500) || await tryClick(page, `button:has-text("${tab}")`, 1000)) {
                await wait(page, 1000);
                await shot(page, `settings_${slug(tab)}`);
            }
        }
        await page.keyboard.press('Escape');
        await wait(page, 500);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // PROFILE PANEL (click avatar at bottom-left)
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n═══ PROFILE PANEL ═══');
    if (await tryClick(page, '[class*="userAvatar"], [class*="user-avatar"], [class*="statusArea"] img')) {
        await wait(page, 1500);
        await shot(page, 'profile_panel');
    }

    // ═══════════════════════════════════════════════════════════════════════
    // FEATURE PAGES (via hash routing)
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n═══ FEATURE PAGES ═══');
    const featureRoutes = [
        { path: '#/eng-learn', name: 'english_hub' },
        { path: '#/eng-learn/vocab', name: 'english_vocab' },
        { path: '#/eng-learn/grammar', name: 'english_grammar' },
        { path: '#/eng-learn/srs', name: 'english_srs' },
        { path: '#/crypto-analysis', name: 'crypto_dashboard' },
        { path: '#/launch', name: 'landing_page' },
        { path: '#/store', name: 'store' },
    ];

    for (const route of featureRoutes) {
        try {
            await page.goto(`${BASE}/${route.path}`, { waitUntil: 'networkidle', timeout: 15000 });
            await wait(page, 3000);
            await shot(page, route.name);
        } catch (e) {
            console.log(`  ⚠️ ${route.name} failed: ${e.message.slice(0, 60)}`);
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // ADMIN PANEL
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n═══ ADMIN PANEL ═══');
    // Navigate back home first
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 15000 });
    await wait(page, 3000);

    // Try opening admin panel
    if (await tryClick(page, '[aria-label*="Admin"], button:has-text("Admin"), [title*="Admin"]')) {
        await wait(page, 2000);
        await shot(page, 'admin_panel');

        // Click admin tabs
        const adminTabs = ['Overview', 'Users', 'Reports', 'Servers', 'Analytics', 'Logs', 'Settings', 'Audit'];
        for (const tab of adminTabs) {
            if (await tryClick(page, `text="${tab}"`, 1000) || await tryClick(page, `button:has-text("${tab}")`, 1000)) {
                await wait(page, 800);
                await shot(page, `admin_${slug(tab)}`);
            }
        }
        await page.keyboard.press('Escape');
        await wait(page, 500);
    } else {
        console.log('  ⚠️ Could not open admin panel');
    }

    // ═══════════════════════════════════════════════════════════════════════
    // FINAL HOME SCREENSHOT
    // ═══════════════════════════════════════════════════════════════════════
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 15000 });
    await wait(page, 3000);
    await shot(page, 'final_home');

    // ═══════════════════════════════════════════════════════════════════════
    // SUMMARY
    // ═══════════════════════════════════════════════════════════════════════
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log('\n════════════════════════════════════════════');
    console.log(`📸 Screenshots: ${idx}`);
    console.log(`⏱  Elapsed: ${elapsed}s`);
    if (jsErrors.length > 0) {
        console.log(`\n🔴 JS Errors (${jsErrors.length}):`);
        const unique = [...new Set(jsErrors)];
        unique.forEach(e => console.log(`   ${e.slice(0, 120)}`));
    } else {
        console.log('✅ No JS errors (excluding CSP)');
    }
    console.log('════════════════════════════════════════════');

    await browser.close();
})();
