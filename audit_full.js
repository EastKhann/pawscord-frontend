/**
 * Pawscord Full Audit — April 2026
 * Takes screenshots of EVERY page/modal/panel, captures console + API errors,
 * outputs JSON log for scoring.
 *
 * Run:  node audit_full.js
 * Output: audit_screenshots/ folder + audit_results.json
 */
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.pawscord.com';
const USERNAME = 'YANHESAP';
const PASSWORD = 'YANHESAP';
const SHOTS_DIR = path.join(__dirname, '..', 'audit_screenshots');

if (!fs.existsSync(SHOTS_DIR)) fs.mkdirSync(SHOTS_DIR, { recursive: true });
// Clean old screenshots
fs.readdirSync(SHOTS_DIR).forEach(f => { if (f.endsWith('.png')) fs.unlinkSync(path.join(SHOTS_DIR, f)); });

const report = [];
let shotIdx = 0;
const allConsoleErrors = [];
const allApiErrors = [];
let screenErrors = [];
let screenApiErrors = [];

function slug(name) { return name.replace(/[^a-zA-Z0-9_\-]/g, '_').replace(/__+/g, '_').slice(0, 50); }

async function screenshot(page, label) {
    shotIdx++;
    const idx = String(shotIdx).padStart(3, '0');
    const file = `${idx}_${slug(label)}.png`;
    try { await page.screenshot({ path: path.join(SHOTS_DIR, file), fullPage: false }); } catch (_) { }

    // Detect DOM error boundaries
    try {
        const bTexts = await page.evaluate(() => {
            const found = [];
            for (const el of document.querySelectorAll('div, span, p, h1, h2, h3')) {
                const t = el.textContent || '';
                if ((t.includes('failed to load') || t.includes('is not defined') ||
                    t.includes('Something went wrong') || t.includes('Error') && el.closest('[class*="error"]') ||
                    (t.includes('Try Again') && t.length < 200)) && t.length < 200) {
                    found.push(t.trim().slice(0, 150));
                }
            }
            return [...new Set(found)];
        });
        for (const t of bTexts) {
            const msg = `DOM: ${t}`;
            if (!screenErrors.includes(msg)) screenErrors.push(msg);
        }
    } catch (_) { }

    const entry = { idx: shotIdx, label, file, consoleErrors: [...screenErrors], apiErrors: [...screenApiErrors] };
    report.push(entry);
    screenErrors = [];
    screenApiErrors = [];
    const errCount = entry.consoleErrors.length + entry.apiErrors.length;
    console.log(`${errCount > 0 ? '🔴' : '🟢'} [${idx}] ${label}${errCount ? ` (${errCount} issues)` : ''}`);
    return entry;
}

async function wait(page, ms = 700) { await page.waitForTimeout(ms); }

async function tryClick(page, selector, opts = {}) {
    const timeout = opts.timeout || 3000;
    try {
        const el = page.locator(selector).first();
        if (await el.isVisible({ timeout })) {
            await el.click({ timeout });
            await wait(page, opts.wait || 800);
            return true;
        }
    } catch (_) { }
    return false;
}

async function closeAll(page) {
    for (let i = 0; i < 5; i++) { await page.keyboard.press('Escape'); await wait(page, 200); }
    try { await page.mouse.click(8, 8); await wait(page, 150); } catch (_) { }
    for (const sel of ['button[aria-label="Close"]', 'button:has-text("İptal")', 'button:has-text("Cancel")', '.modal-close']) {
        try { if (await page.locator(sel).first().isVisible({ timeout: 300 })) { await page.locator(sel).first().click(); await wait(page, 200); } } catch (_) { }
    }
    await wait(page, 200);
}

async function goHome(page) {
    await closeAll(page);
    // Click Try Again buttons
    for (let a = 0; a < 2; a++) {
        try {
            const btns = page.locator('button:has-text("Try Again")');
            if (await btns.count() === 0) break;
            for (let i = 0; i < await btns.count(); i++) {
                try { if (await btns.nth(i).isVisible({ timeout: 400 })) { await btns.nth(i).click(); await wait(page, 400); } } catch (_) { }
            }
        } catch (_) { break; }
    }
    try {
        const h = page.locator('[aria-label="Home"]').first();
        if (await h.isVisible({ timeout: 2000 })) { await h.click(); await wait(page, 700); return; }
    } catch (_) { }
    try { await page.reload({ waitUntil: 'domcontentloaded', timeout: 20000 }); await wait(page, 3000); } catch (_) { }
}

// ─────────────────────────────────────────────────────────────────────────────
(async () => {
    const startTime = Date.now();
    const browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
    });
    const context = await browser.newContext({
        serviceWorkers: 'block',
        viewport: { width: 1440, height: 900 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36',
    });
    const page = await context.newPage();

    // ── Console/Network listeners ────────────────────────────────────────
    page.on('console', msg => {
        if (msg.type() === 'error') {
            const txt = msg.text().slice(0, 300);
            screenErrors.push(txt);
            allConsoleErrors.push(txt);
        }
    });
    page.on('pageerror', err => {
        const txt = 'PAGE_ERR: ' + err.message.slice(0, 300);
        screenErrors.push(txt);
        allConsoleErrors.push(txt);
    });
    page.on('response', async resp => {
        const status = resp.status();
        const url = resp.url();
        if (status >= 400 && url.includes('/api/')) {
            const entry = `${status} ${url.replace(/https?:\/\/[^/]+/, '')}`;
            if (!allApiErrors.includes(entry)) allApiErrors.push(entry);
            screenApiErrors.push(entry);
        }
    });

    // ═══════════════════════════════════════════════════════════════════════
    // 1. LANDING / LOGIN
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 1. LOGIN ═══════════════════════════════════');
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await wait(page, 2000);
    await screenshot(page, 'splash_screen');

    // Wait for splash to finish and login form to appear (up to 15s)
    console.log('  Waiting for login form...');
    try {
        await page.waitForSelector('.login-card, .login-container, input[type="text"], input[type="password"]', { timeout: 15000 });
    } catch (_) {
        console.log('  ⚠️ Login form not found, trying to continue...');
    }
    await wait(page, 2000);
    await screenshot(page, 'login_page');

    // Fill login using type selectors (works regardless of i18n)
    const textInput = page.locator('.login-card input[type="text"], .login-container input[type="text"], form input[type="text"]').first();
    const passInput = page.locator('.login-card input[type="password"], .login-container input[type="password"], form input[type="password"]').first();

    try {
        if (await textInput.isVisible({ timeout: 3000 })) {
            await textInput.fill(USERNAME);
            console.log('  ✓ Username filled');
        } else {
            console.log('  ⚠️ Username input not visible');
        }
    } catch (e) { console.log('  ⚠️ Username fill error:', e.message.slice(0, 80)); }

    try {
        if (await passInput.isVisible({ timeout: 3000 })) {
            await passInput.fill(PASSWORD);
            console.log('  ✓ Password filled');
        } else {
            console.log('  ⚠️ Password input not visible');
        }
    } catch (e) { console.log('  ⚠️ Password fill error:', e.message.slice(0, 80)); }

    await screenshot(page, 'login_filled');

    // Submit
    try {
        await page.click('button[type="submit"], .submit-btn');
        console.log('  ✓ Submit clicked');
    } catch (_) {
        try { await page.click('button:has-text("Login"), button:has-text("Giriş"), button:has-text("Giriş Yap")'); } catch (_) { }
    }

    // Wait for navigation after login (up to 15s)
    console.log('  Waiting for app to load after login...');
    try {
        await page.waitForSelector('[aria-label="Home"], [class*="room-list"], [class*="server-rail"], [class*="sidebar"]', { timeout: 15000 });
        console.log('  ✓ App loaded');
    } catch (_) {
        console.log('  ⚠️ App did not load within 15s');
    }
    await wait(page, 3000);
    await screenshot(page, 'after_login');

    // ═══════════════════════════════════════════════════════════════════════
    // 2. HOME
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 2. HOME ════════════════════════════════════');
    await goHome(page);
    await screenshot(page, 'home_main');

    // Home cards
    for (const card of ['Arkadaşlar', 'Friends', 'Sunucular', 'Servers', 'Aktiviteler', 'Activities', 'Yapay Zeka', 'AI']) {
        await goHome(page);
        if (await tryClick(page, `[role="button"]:has-text("${card}"), button:has-text("${card}")`, { timeout: 1500, wait: 1200 })) {
            await screenshot(page, `home_card_${slug(card)}`);
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 3. SIDEBAR NAVIGATION
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 3. SIDEBAR ═════════════════════════════════');
    await goHome(page);

    // Discover Servers
    if (await tryClick(page, '[aria-label="Discover Servers"]', { timeout: 3000, wait: 1500 })) {
        await screenshot(page, 'discover_servers');
        // Search
        try {
            const searchInput = page.locator('input[placeholder*="Search" i], input[placeholder*="Ara" i]').first();
            if (await searchInput.isVisible({ timeout: 1000 })) {
                await searchInput.fill('pawscord');
                await wait(page, 1500);
                await screenshot(page, 'discover_search');
                await searchInput.fill('');
            }
        } catch (_) { }
        // Scroll
        try { await page.keyboard.press('End'); await wait(page, 500); } catch (_) { }
        await screenshot(page, 'discover_servers_scroll');
        await closeAll(page);
    }

    // Premium Store
    await goHome(page);
    if (await tryClick(page, '[aria-label="Premium Store"]', { timeout: 3000, wait: 1500 })) {
        await screenshot(page, 'premium_store');
        for (const tab of ['Mağaza', 'Store', 'Server Boost', 'Premium']) {
            if (await tryClick(page, `button:has-text("${tab}"), [role="tab"]:has-text("${tab}")`, { timeout: 1000, wait: 800 }))
                await screenshot(page, `premium_tab_${slug(tab)}`);
        }
        await closeAll(page);
    }

    // Add Server
    await goHome(page);
    if (await tryClick(page, '[aria-label="Server add"]', { timeout: 3000, wait: 1000 })) {
        await screenshot(page, 'add_server_dialog');
        await closeAll(page);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 4. SERVERS & CHANNELS
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 4. SERVERS & CHANNELS ══════════════════════');
    await goHome(page);
    await wait(page, 500);

    const serverBtns = page.locator('[aria-label="Serverlar"] [role="button"]');
    const serverCount = await serverBtns.count().catch(() => 0);
    console.log(`  Found ${serverCount} servers`);

    for (let i = 0; i < Math.min(serverCount, 8); i++) {
        try {
            const btn = serverBtns.nth(i);
            if (!(await btn.isVisible({ timeout: 1000 }))) continue;
            const serverName = (await btn.getAttribute('aria-label')) || `server_${i}`;
            console.log(`  → Server: ${serverName}`);
            await btn.click();
            await wait(page, 1500);
            await screenshot(page, `server_${i}_${slug(serverName)}`);

            // Text channels
            const textChannels = page.locator('.channel-item.text-channel, [class*="channel"][class*="text"]');
            const txtCount = await textChannels.count().catch(() => 0);
            for (let c = 0; c < Math.min(txtCount, 4); c++) {
                try {
                    const ch = textChannels.nth(c);
                    if (!(await ch.isVisible({ timeout: 800 }))) continue;
                    const chName = (await ch.getAttribute('aria-label')) || (await ch.textContent()).trim().slice(0, 30) || `ch_${c}`;
                    await ch.click();
                    await wait(page, 1200);
                    await screenshot(page, `server_${i}_ch_${c}_${slug(chName)}`);
                } catch (_) { }
            }

            // Voice channels
            const voiceChannels = page.locator('.channel-item.voice-channel, [class*="channel"][class*="voice"]');
            const voiceCount = await voiceChannels.count().catch(() => 0);
            if (voiceCount > 0) await screenshot(page, `server_${i}_voice_channels`);

            // Forum channels
            const forumChannels = page.locator('.channel-item.forum-channel, [class*="channel"][class*="forum"]');
            const forumCount = await forumChannels.count().catch(() => 0);
            for (let f = 0; f < Math.min(forumCount, 2); f++) {
                try {
                    const ch = forumChannels.nth(f);
                    if (!(await ch.isVisible({ timeout: 800 }))) continue;
                    await ch.click();
                    await wait(page, 1200);
                    await screenshot(page, `server_${i}_forum_${f}`);
                } catch (_) { }
            }
        } catch (e) {
            console.log(`  ⚠️ Server ${i} error: ${e.message.slice(0, 80)}`);
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 5. DM / CHAT
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 5. DM / CHAT ═══════════════════════════════');
    await goHome(page);
    await wait(page, 500);

    // Click first DM
    let dmOpened = false;
    const dmItems = page.locator('[class*="dm-item"], [class*="DmItem"], [class*="dmRoom"]');
    const dmCount = await dmItems.count().catch(() => 0);
    console.log(`  Found ${dmCount} DM items`);
    if (dmCount > 0) {
        await dmItems.first().click();
        await wait(page, 2000);
        await screenshot(page, 'dm_chat_first');
        dmOpened = true;
    } else {
        // Fallback: Broad search for clickable items in the room list
        for (const name of ['PawPaw', 'iyzico', 'test', 'bot', 'Bot']) {
            if (await tryClick(page, `[role="button"]:has-text("${name}")`, { timeout: 1500, wait: 2000 })) {
                await screenshot(page, `dm_chat_${slug(name)}`);
                dmOpened = true;
                break;
            }
        }
    }

    if (dmOpened) {
        // Chat input area
        await screenshot(page, 'dm_chat_input_area');

        // Chat toolbar buttons
        for (const label of ['Emoji', 'Gif', 'GIF', 'Sticker', 'Upload', 'Attachment', 'Dosya']) {
            try {
                const btn = page.locator(`button[aria-label="${label}"], button[aria-label="${label}" i]`).first();
                if (await btn.isVisible({ timeout: 800 })) {
                    await btn.click(); await wait(page, 800);
                    await screenshot(page, `chat_btn_${slug(label)}`);
                    await closeAll(page);
                }
            } catch (_) { }
        }

        // Message context menu
        try {
            const msgs = page.locator('[class*="message-content"], [class*="MessageContent"]');
            const msgCount = await msgs.count();
            if (msgCount > 0) {
                await msgs.last().hover();
                await wait(page, 500);
                await screenshot(page, 'dm_message_hover');
                await msgs.last().click({ button: 'right' });
                await wait(page, 500);
                await screenshot(page, 'dm_context_menu');
                await closeAll(page);
            }
        } catch (_) { }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 6. USER SETTINGS — ALL TABS
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 6. USER SETTINGS ═══════════════════════════');
    await goHome(page);

    const settingsOpened = await tryClick(page, 'button[aria-label="Settings"], button[aria-label="Ayarlar"]', { timeout: 4000, wait: 1500 });
    if (settingsOpened) {
        await screenshot(page, 'settings_opened');

        const settingsTabs = [
            'My Account', 'Hesabım',
            'Privacy & Security', 'Gizlilik ve Güvenlik', 'Privacy',
            'Connections', 'Bağlantılar',
            'Appearance', 'Görünüm',
            'Voice & Video', 'Ses ve Video',
            'Notifications', 'Bildirimler',
            'Keyboard Shortcuts', 'Klavye Kısayolları',
            'Language', 'Dil',
            'Activity Status', 'Aktivite Durumu',
            'Sessions', 'Oturumlar',
            'Advanced', 'Gelişmiş',
        ];
        const seen = new Set();
        for (const tab of settingsTabs) {
            if (seen.has(tab.toLowerCase())) continue;
            try {
                const el = page.locator(`[aria-label="User Settings"] button:has-text("${tab}"), [aria-label="User Settings"] [role="button"]:has-text("${tab}"), [aria-label="User Settings"] li:has-text("${tab}"), button:has-text("${tab}")`).first();
                if (await el.isVisible({ timeout: 1000 })) {
                    await el.click();
                    await wait(page, 1000);
                    await screenshot(page, `settings_${slug(tab)}`);
                    seen.add(tab.toLowerCase());

                    // Scroll content
                    try {
                        await page.evaluate(() => {
                            const c = document.querySelector('[aria-label="User Settings"] [class*="content"], [class*="settings-content"]');
                            if (c) c.scrollTop = c.scrollHeight;
                        });
                        await wait(page, 400);
                        await screenshot(page, `settings_${slug(tab)}_scroll`);
                    } catch (_) { }
                }
            } catch (_) { }
        }
        await closeAll(page);
    } else {
        console.log('  ⚠️ Settings did not open');
        await screenshot(page, 'settings_NOT_OPENED');
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 7. USER PROFILE PANEL
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 7. USER PROFILE PANEL ══════════════════════');
    await goHome(page);

    let profileOpened = false;
    try {
        const userRow = page.locator(`[role="button"]:has-text("${USERNAME}")`).last();
        if (await userRow.isVisible({ timeout: 2000 })) {
            await userRow.click();
            await wait(page, 1500);
            profileOpened = await page.locator('[aria-label="user profile panel"]').isVisible({ timeout: 3000 }).catch(() => false);
        }
    } catch (_) { }
    if (!profileOpened) {
        // Try clicking avatar
        try {
            const avatar = page.locator('[class*="user-avatar"], [class*="UserAvatar"]').last();
            if (await avatar.isVisible({ timeout: 1000 })) {
                await avatar.click(); await wait(page, 1500);
                profileOpened = true;
            }
        } catch (_) { }
    }

    if (profileOpened) {
        await screenshot(page, 'profile_opened');

        const sidebarBtns = page.locator('[aria-label="user profile panel"] .sidebar-btn, [aria-label="user profile panel"] button');
        const clickedTabs = new Set();
        for (let pass = 0; pass < 2; pass++) {
            const btnCount = await sidebarBtns.count().catch(() => 0);
            for (let i = 0; i < btnCount; i++) {
                try {
                    const btn = sidebarBtns.nth(i);
                    if (!(await btn.isVisible({ timeout: 500 }))) continue;
                    const text = (await btn.textContent()).trim();
                    if (clickedTabs.has(text) || !text || text.length > 40 || text === '✕') continue;
                    clickedTabs.add(text);
                    await btn.click();
                    await wait(page, 1200);
                    await screenshot(page, `profile_tab_${slug(text)}`);
                } catch (_) { }
            }
            // Scroll sidebar
            try {
                await page.evaluate(() => {
                    const s = document.querySelector('[aria-label="user profile panel"] [class*="sidebar"]');
                    if (s) s.scrollTop += 300;
                });
                await wait(page, 300);
            } catch (_) { }
        }
        console.log(`  Profile tabs clicked: ${clickedTabs.size}`);
    } else {
        console.log('  ⚠️ Profile panel did not open');
        await screenshot(page, 'profile_NOT_OPENED');
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════════
    // 8. ADMIN PANEL
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 8. ADMIN PANEL ═════════════════════════════');
    await goHome(page);

    // Scroll sidebar to reveal admin button
    try {
        await page.evaluate(() => {
            const sidebar = document.querySelector('[role="navigation"]') || document.querySelector('[class*="sidebar"]') || document.querySelector('[class*="room-list"]');
            if (sidebar) sidebar.scrollTop = sidebar.scrollHeight;
        });
        await wait(page, 500);
    } catch (_) { }

    let adminOpened = await tryClick(page, 'button[aria-label="Open Admin Panel"]', { timeout: 5000, wait: 2500 });
    if (!adminOpened) {
        try { await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await wait(page, 500); } catch (_) { }
        adminOpened = await tryClick(page, 'button[aria-label="Open Admin Panel"]', { timeout: 3000, wait: 2500 });
    }

    const adminVisible = await page.locator('.admin-panel-modal, [class*="admin-panel"], [class*="AdminPanel"]').isVisible({ timeout: 3000 }).catch(() => false);

    if (adminVisible) {
        await screenshot(page, 'admin_dashboard');

        const adminTabs = [
            'Dashboard', 'Users', 'Servers', 'Moderation', 'Logs',
            'Database', 'System', 'Security', 'Broadcast', 'Tools',
            'Quick Actions', 'Whitelist', 'Feature Access', 'Crypto Signals', 'Visitor Logs'
        ];

        for (let i = 0; i < adminTabs.length; i++) {
            const tabName = adminTabs[i];
            try {
                const btn = page.locator(`.admin-panel-sidebar-btn:has-text("${tabName}"), [class*="admin"] button:has-text("${tabName}")`).first();
                if (await btn.isVisible({ timeout: 2000 })) {
                    await btn.click();
                    await wait(page, 1500);
                    await screenshot(page, `admin_${slug(tabName)}`);

                    // Scroll to see more
                    try {
                        await page.evaluate(() => {
                            const c = document.querySelector('.admin-panel-content, [class*="admin"] [class*="content"]');
                            if (c) c.scrollTop = c.scrollHeight;
                        });
                        await wait(page, 500);
                        await screenshot(page, `admin_${slug(tabName)}_scroll`);
                    } catch (_) { }
                } else {
                    console.log(`  ⚠️ Admin tab "${tabName}" not found`);
                }
            } catch (e) {
                console.log(`  ⚠️ Admin tab "${tabName}" error: ${e.message.slice(0, 80)}`);
            }
        }
    } else {
        console.log('  ⚠️ Admin panel did not open');
        await screenshot(page, 'admin_NOT_OPENED');
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════════
    // 9. QUICK ACCESS MODALS
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 9. QUICK ACCESS MODALS ═════════════════════');
    const quickBtns = [
        { aria: '💰 Payment Panel', name: 'payment' },
        { aria: '🛒 Store', name: 'store' },
        { aria: '🎁 Daily Rewards', name: 'daily_rewards' },
        { aria: '📊 API Usage', name: 'api_usage' },
        { aria: '📥 Export Jobs', name: 'export_jobs' },
        { aria: '📢 Scheduled Announcements', name: 'announcements' },
        { aria: '🎮 Mini Games', name: 'mini_games' },
        { aria: '📂 Projects', name: 'projects' },
        { aria: '🎨 Avatar Studio', name: 'avatar_studio' },
        { aria: '💎 Premium', name: 'premium' },
        { aria: '🪙 Coin Store', name: 'coin_store' },
        { aria: '📈 Crypto', name: 'crypto' },
        { aria: '📚 English Learn', name: 'english_learn' },
        { aria: '📡 Crypto Signals', name: 'crypto_signals' },
    ];
    for (const { aria, name } of quickBtns) {
        await goHome(page);
        if (await tryClick(page, `[aria-label="${aria}"]`, { timeout: 2000, wait: 1500 })) {
            await screenshot(page, `quick_${name}`);
            // Scroll inside modal
            try { await page.keyboard.press('End'); await wait(page, 400); } catch (_) { }
            await screenshot(page, `quick_${name}_scroll`);

            // Click tabs/sub-buttons inside modal
            try {
                const modalBtns = page.locator('[role="dialog"] button, [class*="modal"] button, [class*="Modal"] button');
                const mbCount = await modalBtns.count();
                const clickedSubs = new Set();
                for (let s = 0; s < Math.min(mbCount, 5); s++) {
                    try {
                        const mb = modalBtns.nth(s);
                        if (!(await mb.isVisible({ timeout: 400 }))) continue;
                        const mbText = (await mb.textContent()).trim();
                        if (!mbText || clickedSubs.has(mbText) || mbText === '✕' || mbText === '×' || mbText.length > 30
                            || mbText.includes('Delete') || mbText.includes('Sil') || mbText.includes('Kapat')) continue;
                        clickedSubs.add(mbText);
                        await mb.click();
                        await wait(page, 800);
                        await screenshot(page, `quick_${name}_sub_${slug(mbText)}`);
                    } catch (_) { }
                }
            } catch (_) { }
            await closeAll(page);
        }
    }

    // Also try text-based buttons in the sidebar/bottom bar
    const extraBtns = [
        { text: 'Kripto', name: 'kripto' },
        { text: 'Coin', name: 'coin' },
        { text: 'SRS', name: 'srs' },
        { text: 'Forum', name: 'forum' },
    ];
    for (const { text, name } of extraBtns) {
        await goHome(page);
        if (await tryClick(page, `button:has-text("${text}"), [role="button"]:has-text("${text}")`, { timeout: 2000, wait: 1500 })) {
            await screenshot(page, `extra_${name}`);
            await closeAll(page);
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 10. FRIENDS LIST
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 10. FRIENDS LIST ═══════════════════════════');
    await goHome(page);
    if (await tryClick(page, '[aria-label="Friends"], button:has-text("Arkadaşlar"), button:has-text("Friends")', { timeout: 3000, wait: 1500 })) {
        await screenshot(page, 'friends_list');
        // Tabs: All, Online, Pending, Blocked
        for (const tab of ['All', 'Tümü', 'Online', 'Çevrimiçi', 'Pending', 'Bekleyen', 'Blocked', 'Engellenen', 'Add Friend', 'Arkadaş Ekle']) {
            if (await tryClick(page, `button:has-text("${tab}")`, { timeout: 1000, wait: 800 }))
                await screenshot(page, `friends_tab_${slug(tab)}`);
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 11. NOTIFICATIONS
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 11. NOTIFICATIONS ══════════════════════════');
    await goHome(page);
    if (await tryClick(page, '[aria-label="Notifications"], button[aria-label="Bildirimler"]', { timeout: 3000, wait: 1500 })) {
        await screenshot(page, 'notifications');
        await closeAll(page);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 12. SERVER SETTINGS
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 12. SERVER SETTINGS ════════════════════════');
    await goHome(page);
    const firstSrv = page.locator('[aria-label="Serverlar"] [role="button"]').first();
    if (await firstSrv.isVisible({ timeout: 2000 }).catch(() => false)) {
        await firstSrv.click();
        await wait(page, 1500);

        const srvGear = page.locator('button[aria-label*="settings" i], button[aria-label*="ayar" i], button[aria-label*="Server Settings" i]').first();
        if (await srvGear.isVisible({ timeout: 2000 }).catch(() => false)) {
            await srvGear.click();
            await wait(page, 1500);
            await screenshot(page, 'server_settings_main');

            // Click tabs
            const ssTabs = page.locator('[role="dialog"] button, [class*="modal"] button, [class*="Modal"] button');
            const ssCount = await ssTabs.count().catch(() => 0);
            const clickedSS = new Set();
            for (let s = 0; s < Math.min(ssCount, 12); s++) {
                try {
                    const tb = ssTabs.nth(s);
                    if (!(await tb.isVisible({ timeout: 400 }))) continue;
                    const t = (await tb.textContent()).trim();
                    if (!t || clickedSS.has(t) || t === '✕' || t === '×' || t.length > 30 || t.includes('Delete') || t.includes('Sil')) continue;
                    clickedSS.add(t);
                    await tb.click();
                    await wait(page, 800);
                    await screenshot(page, `server_settings_${slug(t)}`);
                } catch (_) { }
            }
            await closeAll(page);
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 13. MISC INTERACTIONS
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 13. MISC ═══════════════════════════════════');

    // Custom Status
    await goHome(page);
    if (await tryClick(page, '[aria-label*="status" i], button:has-text("Set Status"), button:has-text("Durum Ayarla")', { timeout: 2000, wait: 1000 })) {
        await screenshot(page, 'custom_status');
        await closeAll(page);
    }

    // Keyboard Shortcuts
    await goHome(page);
    try { await page.keyboard.press('Control+/'); await wait(page, 1000); } catch (_) { }
    await screenshot(page, 'keyboard_shortcuts');
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════════
    // 14. RESPONSIVE CHECK (different viewports)
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 14. RESPONSIVE CHECK ═══════════════════════');
    await goHome(page);
    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    await wait(page, 1000);
    await screenshot(page, 'responsive_mobile_375');
    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await wait(page, 1000);
    await screenshot(page, 'responsive_tablet_768');
    // Back to desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    await wait(page, 1000);

    // ═══════════════════════════════════════════════════════════════════════
    // FINAL
    // ═══════════════════════════════════════════════════════════════════════
    await goHome(page);
    await screenshot(page, 'final_home');

    await browser.close();

    // ═══════════════════════════════════════════════════════════════════════
    // OUTPUT JSON REPORT
    // ═══════════════════════════════════════════════════════════════════════
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    const results = {
        date: new Date().toISOString(),
        elapsed: `${elapsed}s`,
        totalScreenshots: report.length,
        totalConsoleErrors: allConsoleErrors.length,
        totalApiErrors: allApiErrors.length,
        screensWithErrors: report.filter(r => r.consoleErrors.length + r.apiErrors.length > 0).length,
        screenshots: report,
        allConsoleErrors: [...new Set(allConsoleErrors)],
        allApiErrors: [...new Set(allApiErrors)],
    };

    fs.writeFileSync(path.join(__dirname, '..', 'audit_results.json'), JSON.stringify(results, null, 2), 'utf8');

    // Console summary
    console.log('\n' + '═'.repeat(60));
    console.log(`📸 Screenshots: ${report.length}`);
    console.log(`🔴 Console Errors: ${allConsoleErrors.length}`);
    console.log(`🟠 API Errors: ${allApiErrors.length}`);
    console.log(`⏱  Elapsed: ${elapsed}s`);
    console.log(`📋 JSON: audit_results.json`);
    console.log(`📁 Shots: audit_screenshots/`);

    if (allConsoleErrors.length > 0) {
        console.log('\n── Unique Console Errors ──');
        [...new Set(allConsoleErrors)].forEach(e => console.log(`  🔴 ${e.slice(0, 150)}`));
    }
    if (allApiErrors.length > 0) {
        console.log('\n── API Errors ──');
        [...new Set(allApiErrors)].forEach(e => console.log(`  🟠 ${e}`));
    }

    const errScreens = report.filter(r => r.consoleErrors.length + r.apiErrors.length > 0);
    if (errScreens.length > 0) {
        console.log('\n── Screens With Errors ──');
        errScreens.forEach(r => {
            console.log(`  [${r.idx}] ${r.label}`);
            r.consoleErrors.forEach(e => console.log(`       🔴 ${e.slice(0, 120)}`));
            r.apiErrors.forEach(e => console.log(`       🟠 ${e}`));
        });
    }
    console.log('═'.repeat(60));
})();
