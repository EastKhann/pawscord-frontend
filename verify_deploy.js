/**
 * PAWSCORD Post-Deploy Verification Audit
 * Checks specific fixes after fresh deploy.
 * Run: node verify_deploy.js
 */
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.pawscord.com';
const USERNAME = 'YANHESAP';
const PASSWORD = 'YANHESAP';
const SHOTS_DIR = path.join(__dirname, 'screenshots_verify');

if (fs.existsSync(SHOTS_DIR)) {
    fs.readdirSync(SHOTS_DIR).forEach(f => { if (f.endsWith('.png')) fs.unlinkSync(path.join(SHOTS_DIR, f)); });
} else {
    fs.mkdirSync(SHOTS_DIR, { recursive: true });
}

let shotIdx = 0;
const results = [];
const consoleErrors = [];
const apiErrors = [];

function slug(name) { return name.replace(/[^a-zA-Z0-9_\-]/g, '_').slice(0, 60); }

async function shot(page, label) {
    shotIdx++;
    const idx = String(shotIdx).padStart(2, '0');
    const file = `${idx}_${slug(label)}.png`;
    try { await page.screenshot({ path: path.join(SHOTS_DIR, file), fullPage: false }); } catch (_) { }
    console.log(`📸 [${idx}] ${label}`);
    return file;
}

async function wait(page, ms = 800) { await page.waitForTimeout(ms); }

async function getText(page, selector, timeout = 3000) {
    try {
        const el = page.locator(selector).first();
        if (await el.isVisible({ timeout })) return (await el.textContent()).trim();
    } catch (_) { }
    return null;
}

async function isVisible(page, selector, timeout = 3000) {
    try { return await page.locator(selector).first().isVisible({ timeout }); } catch (_) { return false; }
}

async function tryClick(page, selector, opts = {}) {
    try {
        const el = page.locator(selector).first();
        if (await el.isVisible({ timeout: opts.timeout || 3000 })) {
            await el.click({ timeout: opts.timeout || 3000 });
            await wait(page, opts.wait || 1000);
            return true;
        }
    } catch (_) { }
    return false;
}

function check(id, description, passed, detail = '') {
    const status = passed ? '✅ PASS' : '❌ FAIL';
    console.log(`  ${status} — ${description}${detail ? ': ' + detail : ''}`);
    results.push({ id, description, passed, detail });
}

// ─────────────────────────────────────────────────────────────────
(async () => {
    const browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
    });
    const context = await browser.newContext({
        serviceWorkers: 'block',
        viewport: { width: 1440, height: 900 },
        locale: 'tr-TR',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36',
    });
    const page = await context.newPage();

    // Capture errors
    page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text().slice(0, 300));
    });
    page.on('pageerror', err => consoleErrors.push('PAGE_ERR: ' + err.message.slice(0, 300)));
    page.on('response', resp => {
        if (resp.status() >= 400 && resp.url().includes('/api/')) {
            apiErrors.push(`${resp.status()} ${resp.url().replace(/https?:\/\/[^/]+/, '')}`);
        }
    });

    // ═══════════════════════════════════════════════════════════════
    // 0. HARD REFRESH + LOGIN
    // ═══════════════════════════════════════════════════════════════
    console.log('\n══ LOGIN ══════════════════════════════════════');
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    // Hard refresh to bypass cache
    await page.evaluate(() => location.reload(true));
    await wait(page, 3000);

    // Check version — look for build hash or meta tag
    const buildInfo = await page.evaluate(() => {
        const meta = document.querySelector('meta[name="build-version"]');
        if (meta) return meta.getAttribute('content');
        // Check if service worker is registered
        const scripts = [...document.querySelectorAll('script[src]')].map(s => s.src);
        const hashed = scripts.find(s => /\.[a-f0-9]{8}\.js/.test(s));
        return hashed ? hashed.split('/').pop() : 'unknown';
    });
    console.log(`  Build: ${buildInfo}`);

    await shot(page, 'login_page');

    // Login
    try { await page.fill('input[aria-label="Username"]', USERNAME); } catch (_) {
        try { await page.fill('input[name="username"]', USERNAME); } catch (_) { }
    }
    try { await page.fill('input[aria-label="Password"]', PASSWORD); } catch (_) {
        try { await page.fill('input[name="password"]', PASSWORD); } catch (_) { }
    }
    try { await page.click('button[type="submit"]'); } catch (_) { }
    await wait(page, 6000);
    await shot(page, 'after_login');

    // ═══════════════════════════════════════════════════════════════
    // 1. HOME — Check "Ana Sayfa" header
    // ═══════════════════════════════════════════════════════════════
    console.log('\n══ CHECK 1: Home — Ana Sayfa header ═══════════');
    // Click home icon
    await tryClick(page, '[aria-label="Home"], [aria-label="Ana Sayfa"]', { wait: 1500 });
    await shot(page, 'home_page');

    const homeHeader = await page.evaluate(() => {
        const candidates = document.querySelectorAll('h1, h2, h3, [class*="header"], [class*="Header"], [class*="title"], [class*="Title"]');
        for (const el of candidates) {
            const t = el.textContent.trim();
            if (t === 'Ana Sayfa' || t === 'Home') return t;
        }
        return null;
    });
    check(1, 'Home header shows "Ana Sayfa"', homeHeader === 'Ana Sayfa', `Found: "${homeHeader}"`);

    // ═══════════════════════════════════════════════════════════════
    // 2. FRIENDS TAB — Check sub-tabs and i18n
    // ═══════════════════════════════════════════════════════════════
    console.log('\n══ CHECK 2: Friends tab ════════════════════════');
    // Navigate to friends
    const friendsClicked = await tryClick(page, '[aria-label="Friends"], button:has-text("Arkadaşlar"), [data-tab="friends"]', { wait: 1500 });
    if (!friendsClicked) {
        // Try via home cards
        await tryClick(page, '[role="button"]:has-text("Arkadaşlar")', { wait: 1500 });
    }
    await shot(page, 'friends_tab');

    // Check sub-tabs
    const friendSubTabs = await page.evaluate(() => {
        const tabs = document.querySelectorAll('[role="tab"], [class*="tab"], button[class*="Tab"]');
        return [...tabs].map(t => t.textContent.trim()).filter(t => t.length > 0 && t.length < 30);
    });
    console.log(`  Sub-tabs found: ${JSON.stringify(friendSubTabs)}`);
    const hasEnglishFriendTabs = friendSubTabs.some(t => /^(Online|All|Pending|Blocked|Add Friend)$/i.test(t));
    check(2, 'Friends sub-tabs are in Turkish (not English)', !hasEnglishFriendTabs, `Tabs: ${friendSubTabs.join(', ')}`);

    // Click each sub-tab
    for (const tabText of ['Çevrimiçi', 'Tümü', 'Bekleyen', 'Engellenen', 'Arkadaş Ekle']) {
        const clicked = await tryClick(page, `[role="tab"]:has-text("${tabText}"), button:has-text("${tabText}")`, { wait: 800 });
        if (clicked) await shot(page, `friends_subtab_${slug(tabText)}`);
    }

    // ═══════════════════════════════════════════════════════════════
    // 3. SERVER TEXT CHANNEL — Right sidebar "Sunucu Üyeleri"
    // ═══════════════════════════════════════════════════════════════
    console.log('\n══ CHECK 3: Server sidebar — Sunucu Üyeleri ═══');
    // Click PawPaw server
    const pawpawClicked = await tryClick(page, '[aria-label="PawPaw"], [aria-label*="PawPaw"]', { wait: 2000 });
    if (!pawpawClicked) {
        // Try first server icon
        await tryClick(page, '[aria-label="Serverlar"] [role="button"]', { wait: 2000 });
    }
    await shot(page, 'server_channel_list');

    // Click first text channel
    await tryClick(page, '.channel-item.text-channel, [class*="channel"][class*="text"]', { wait: 1500 });
    await shot(page, 'server_text_channel');

    // Check right sidebar header
    const sidebarHeader = await page.evaluate(() => {
        // Look for "Sunucu Üyeleri" or "FRIENDS" in right sidebar
        const all = document.querySelectorAll('h2, h3, h4, [class*="sidebar"] h2, [class*="sidebar"] h3, [class*="member"] h2, [class*="member"] h3, [class*="Header"], [class*="header"]');
        for (const el of all) {
            const t = el.textContent.trim();
            if (t.includes('Sunucu Üyeleri') || t.includes('FRIENDS') || t.includes('Members') || t.includes('Üyeler')) return t;
        }
        // Check for any text containing these keywords
        const body = document.body.innerText;
        if (body.includes('Sunucu Üyeleri')) return 'Sunucu Üyeleri (found in body)';
        if (body.includes('FRIENDS')) return 'FRIENDS (found in body)';
        return null;
    });
    check(3, 'Server right sidebar shows "Sunucu Üyeleri" (not "FRIENDS")',
        sidebarHeader && sidebarHeader.includes('Sunucu Üyeleri') && !sidebarHeader.includes('FRIENDS'),
        `Found: "${sidebarHeader}"`);

    // ═══════════════════════════════════════════════════════════════
    // 4. DM CONVERSATION — No 500 error
    // ═══════════════════════════════════════════════════════════════
    console.log('\n══ CHECK 4: DM conversation — No 500 error ════');
    // Go home first
    await tryClick(page, '[aria-label="Home"], [aria-label="Ana Sayfa"]', { wait: 1500 });
    const errsBefore = apiErrors.filter(e => e.includes('500')).length;

    // Open first DM
    let dmFound = false;
    for (const name of ['PawPaw', 'iyzico']) {
        if (await tryClick(page, `[role="button"]:has-text("${name}")`, { timeout: 2000, wait: 2500 })) {
            dmFound = true;
            break;
        }
    }
    if (!dmFound) {
        // Try any DM item in the list
        const dmItems = page.locator('[class*="dm-item"], [class*="DmItem"], [class*="directMessage"]');
        if (await dmItems.count() > 0) {
            await dmItems.first().click();
            await wait(page, 2500);
            dmFound = true;
        }
    }
    await shot(page, 'dm_conversation');

    const errsAfter = apiErrors.filter(e => e.includes('500')).length;
    const dm500 = errsAfter > errsBefore;
    check(4, 'DM conversation loads without 500 error', !dm500,
        dm500 ? `New 500 errors: ${apiErrors.filter(e => e.includes('500')).slice(-3).join('; ')}` : 'No new 500 errors');

    // ═══════════════════════════════════════════════════════════════
    // 5. VOICE CHANNEL — "Ses Bağlandı", no "/ General" suffix
    // ═══════════════════════════════════════════════════════════════
    console.log('\n══ CHECK 5: Voice channel — Ses Bağlandı ══════');
    // Go to server
    await tryClick(page, '[aria-label="PawPaw"], [aria-label*="PawPaw"]', { wait: 1500 });
    // Find and click a voice channel
    const voiceClicked = await tryClick(page, '.channel-item.voice-channel, [class*="voice-channel"], [class*="VoiceChannel"]', { wait: 3000 });
    await shot(page, 'voice_before_join');

    if (voiceClicked) {
        // Wait for voice connection
        await wait(page, 4000);
        await shot(page, 'voice_joined');

        // Check bottom-left voice panel text
        const voiceText = await page.evaluate(() => {
            const body = document.body.innerText;
            const lines = body.split('\n').map(l => l.trim()).filter(l => l.length > 0);
            const voiceLines = lines.filter(l =>
                l.includes('Ses Bağlandı') || l.includes('Voice Connected') ||
                l.includes('/ General') || l.includes('Bağlantıyı Kes') || l.includes('Disconnect')
            );
            return voiceLines;
        });
        console.log(`  Voice panel text: ${JSON.stringify(voiceText)}`);

        const hasSesBaglandi = voiceText.some(t => t.includes('Ses Bağlandı'));
        const hasVoiceConnected = voiceText.some(t => t.includes('Voice Connected'));
        const hasGeneralSuffix = voiceText.some(t => t.includes('/ General'));
        check(5, 'Voice shows "Ses Bağlandı" (not "Voice Connected")',
            hasSesBaglandi && !hasVoiceConnected,
            `Found: ${voiceText.join(' | ')}`);
        check('5b', 'No "/ General" suffix in voice panel', !hasGeneralSuffix,
            hasGeneralSuffix ? 'Still has / General suffix' : 'Clean');

        // ═══════════════════════════════════════════════════════════════
        // 6. VOICE HEADER — "Bağlantıyı Kes" button
        // ═══════════════════════════════════════════════════════════════
        console.log('\n══ CHECK 6: Voice header — Bağlantıyı Kes ════');
        const disconnectBtn = await page.evaluate(() => {
            const buttons = document.querySelectorAll('button');
            for (const btn of buttons) {
                const t = btn.textContent.trim();
                if (t.includes('Bağlantıyı Kes') || t.includes('Disconnect')) return t;
            }
            // Check aria-labels too
            for (const btn of buttons) {
                const label = btn.getAttribute('aria-label') || '';
                if (label.includes('Bağlantıyı Kes') || label.includes('Disconnect') || label.includes('disconnect')) return `aria: ${label}`;
            }
            return null;
        });
        check(6, 'Voice disconnect button shows "Bağlantıyı Kes" (not "Disconnect")',
            disconnectBtn && disconnectBtn.includes('Bağlantıyı Kes') && !disconnectBtn.includes('Disconnect'),
            `Found: "${disconnectBtn}"`);
        await shot(page, 'voice_header_disconnect');

        // Disconnect from voice
        await tryClick(page, 'button[aria-label*="Bağlantıyı Kes"], button[aria-label*="Disconnect"], button[aria-label*="disconnect"]', { wait: 2000 });
    } else {
        check(5, 'Voice channel — could not join', false, 'Voice channel not found');
        check('5b', 'No "/ General" suffix', false, 'Could not test');
        check(6, 'Voice disconnect button', false, 'Could not test');
    }

    // ═══════════════════════════════════════════════════════════════
    // 7. QUICK ACTIONS (Ctrl+K) — Turkish labels
    // ═══════════════════════════════════════════════════════════════
    console.log('\n══ CHECK 7: QuickActions (Ctrl+K) ══════════════');
    await tryClick(page, '[aria-label="Home"], [aria-label="Ana Sayfa"]', { wait: 1000 });
    await page.keyboard.press('Control+k');
    await wait(page, 1500);
    await shot(page, 'quick_actions_modal');

    const qaLabels = await page.evaluate(() => {
        // Check modal/dialog content
        const modal = document.querySelector('[role="dialog"], [class*="modal"], [class*="Modal"], [class*="quickAction"], [class*="QuickAction"], [class*="command-palette"]');
        if (!modal) return { found: false, text: 'No modal found' };
        const text = modal.innerText;
        const englishWords = ['Search', 'Settings', 'Friends', 'Servers', 'Profile', 'Logout', 'Create Server', 'Join Server']
            .filter(w => text.includes(w));
        return { found: true, text: text.slice(0, 500), englishWords };
    });
    console.log(`  QA modal: ${qaLabels.found ? 'found' : 'not found'}`);
    if (qaLabels.englishWords) console.log(`  English words found: ${JSON.stringify(qaLabels.englishWords)}`);
    check(7, 'QuickActions labels are in Turkish',
        qaLabels.found && (!qaLabels.englishWords || qaLabels.englishWords.length === 0),
        qaLabels.found ? `English words: ${JSON.stringify(qaLabels.englishWords || [])}` : 'Modal not found');
    await page.keyboard.press('Escape');
    await wait(page, 500);

    // ═══════════════════════════════════════════════════════════════
    // 8. HOME PANEL — "Ana Sayfa" title, "Sunucu Keşfet" button
    // ═══════════════════════════════════════════════════════════════
    console.log('\n══ CHECK 8: HomePanel ══════════════════════════');
    await tryClick(page, '[aria-label="Home"], [aria-label="Ana Sayfa"]', { wait: 1500 });
    await shot(page, 'home_panel');

    const homePanel = await page.evaluate(() => {
        const body = document.body.innerText;
        return {
            hasAnaSayfa: body.includes('Ana Sayfa'),
            hasSunucuKesfet: body.includes('Sunucu Keşfet'),
            hasHome: /\bHome\b/.test(body),
            hasDiscoverServers: body.includes('Discover Servers'),
        };
    });
    check(8, 'HomePanel shows "Ana Sayfa" title', homePanel.hasAnaSayfa, homePanel.hasHome ? 'Also found "Home"' : 'OK');
    check('8b', 'HomePanel shows "Sunucu Keşfet" (if present)',
        homePanel.hasSunucuKesfet || !homePanel.hasDiscoverServers,
        homePanel.hasSunucuKesfet ? 'Found' : (homePanel.hasDiscoverServers ? 'Shows "Discover Servers" instead' : 'Button not shown'));

    // ═══════════════════════════════════════════════════════════════
    // 9. ADMIN PANEL — Detailed stats no 500
    // ═══════════════════════════════════════════════════════════════
    console.log('\n══ CHECK 9: Admin panel ════════════════════════');
    await tryClick(page, '[aria-label="Home"], [aria-label="Ana Sayfa"]', { wait: 1000 });
    // Scroll sidebar to find admin button
    await page.evaluate(() => {
        const sidebar = document.querySelector('[role="navigation"]') || document.querySelector('.room-list') || document.querySelector('[class*="sidebar"]');
        if (sidebar) sidebar.scrollTop = sidebar.scrollHeight;
    });
    await wait(page, 500);

    const admin500Before = apiErrors.filter(e => e.includes('500')).length;
    const adminOpened = await tryClick(page, 'button[aria-label="Open Admin Panel"]', { timeout: 5000, wait: 3000 });
    await shot(page, 'admin_panel');

    if (adminOpened) {
        // Click Dashboard / detailed stats
        await tryClick(page, '.admin-panel-sidebar-btn:has-text("Dashboard")', { wait: 2000 });
        await shot(page, 'admin_dashboard');

        const admin500After = apiErrors.filter(e => e.includes('500')).length;
        check(9, 'Admin panel loads without 500 error', admin500After === admin500Before,
            admin500After > admin500Before ? `500 errors: ${apiErrors.filter(e => e.includes('500')).slice(-3).join('; ')}` : 'OK');

        // Check for React error boundaries
        const adminError = await page.evaluate(() => {
            const el = document.querySelector('[class*="error"], [class*="Error"]');
            if (el && el.textContent.includes('Something went wrong')) return el.textContent.trim().slice(0, 200);
            return null;
        });
        if (adminError) console.log(`  ⚠️ Admin error boundary: ${adminError}`);

        await page.keyboard.press('Escape');
        await wait(page, 500);
    } else {
        check(9, 'Admin panel opens', false, 'Could not open admin panel');
    }

    // ═══════════════════════════════════════════════════════════════
    // 10. ADDITIONAL PAGE SCREENSHOTS
    // ═══════════════════════════════════════════════════════════════
    console.log('\n══ ADDITIONAL SCREENSHOTS ══════════════════════');

    // Settings
    await tryClick(page, 'button[aria-label="Settings"], button[aria-label="Ayarlar"]', { wait: 1500 });
    await shot(page, 'settings_page');
    await page.keyboard.press('Escape');
    await wait(page, 500);

    // Premium Store
    await tryClick(page, '[aria-label="Premium Store"], [aria-label="Premium Mağaza"]', { wait: 1500 });
    await shot(page, 'premium_store');
    await page.keyboard.press('Escape');
    await wait(page, 500);

    // Discover Servers
    await tryClick(page, '[aria-label="Discover Servers"], [aria-label="Sunucu Keşfet"]', { wait: 1500 });
    await shot(page, 'discover_servers');
    await page.keyboard.press('Escape');
    await wait(page, 500);

    // ═══════════════════════════════════════════════════════════════
    // SUMMARY
    // ═══════════════════════════════════════════════════════════════
    console.log('\n══════════════════════════════════════════════════');
    console.log('═══ VERIFICATION SUMMARY ═════════════════════════');
    console.log('══════════════════════════════════════════════════\n');

    const passed = results.filter(r => r.passed).length;
    const failed = results.filter(r => !r.passed).length;
    console.log(`  Total checks: ${results.length}  |  ✅ Passed: ${passed}  |  ❌ Failed: ${failed}\n`);

    for (const r of results) {
        console.log(`  ${r.passed ? '✅' : '❌'} [${r.id}] ${r.description}`);
        if (r.detail) console.log(`      → ${r.detail}`);
    }

    if (consoleErrors.length > 0) {
        console.log(`\n  Console errors (${consoleErrors.length}):`);
        // Deduplicate
        const unique = [...new Set(consoleErrors)];
        for (const e of unique.slice(0, 20)) {
            console.log(`    🔴 ${e.slice(0, 200)}`);
        }
    }

    if (apiErrors.length > 0) {
        console.log(`\n  API errors (${apiErrors.length}):`);
        const unique = [...new Set(apiErrors)];
        for (const e of unique.slice(0, 20)) {
            console.log(`    🔴 ${e}`);
        }
    }

    console.log(`\n  Screenshots saved to: ${SHOTS_DIR}`);
    console.log(`  Total screenshots: ${shotIdx}`);

    await browser.close();

    // Write results to JSON
    fs.writeFileSync(path.join(SHOTS_DIR, 'results.json'), JSON.stringify({
        timestamp: new Date().toISOString(),
        build: buildInfo,
        checks: results,
        consoleErrors: [...new Set(consoleErrors)],
        apiErrors: [...new Set(apiErrors)],
        screenshotCount: shotIdx,
    }, null, 2));

    process.exit(failed > 0 ? 1 : 0);
})();
