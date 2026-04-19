/**
 * Pawscord Visual Audit v2 — Deep Screenshot Audit
 * Clicks EVERY tab in admin panel, settings, profile panel,
 * navigates servers & channels, captures console/API errors.
 *
 * Run:  node visual_audit_v2.js
 * Output: screenshots/ folder + audit_report_v2.html
 */
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.pawscord.com';
const USERNAME = 'YANHESAP';
const PASSWORD = 'YANHESAP';
const SHOTS_DIR = path.join(__dirname, 'screenshots_v2');

// ── Ensure output directory ──────────────────────────────────────────────────
if (fs.existsSync(SHOTS_DIR)) {
    fs.readdirSync(SHOTS_DIR).forEach(f => { if (f.endsWith('.png')) fs.unlinkSync(path.join(SHOTS_DIR, f)); });
} else {
    fs.mkdirSync(SHOTS_DIR, { recursive: true });
}

// ── Global state ─────────────────────────────────────────────────────────────
const report = [];
let shotIdx = 0;
const allConsoleErrors = [];
const allApiErrors = [];
let screenErrors = [];
let screenApiErrors = [];

// ── Helpers ──────────────────────────────────────────────────────────────────
function slug(name) { return name.replace(/[^a-zA-Z0-9_\-]/g, '_').slice(0, 60); }

async function screenshot(page, label) {
    shotIdx++;
    const idx = String(shotIdx).padStart(3, '0');
    const file = `${idx}_${slug(label)}.png`;
    try { await page.screenshot({ path: path.join(SHOTS_DIR, file), fullPage: false }); } catch (_) { }

    // Detect React error boundaries
    try {
        const bTexts = await page.evaluate(() => {
            const found = [];
            for (const el of document.querySelectorAll('div, span, p')) {
                const t = el.textContent || '';
                if ((t.includes('failed to load') || t.includes('is not defined') ||
                    t.includes('Something went wrong') || (t.includes('Try Again') && t.length < 200)) && t.length < 200) {
                    found.push(t.trim().slice(0, 150));
                }
            }
            return [...new Set(found)];
        });
        for (const t of bTexts) {
            const msg = `DOM_BOUNDARY: ${t}`;
            if (!screenErrors.includes(msg)) screenErrors.push(msg);
        }
    } catch (_) { }

    const entry = { idx: shotIdx, label, file, errors: [...screenErrors], apiErrors: [...screenApiErrors] };
    report.push(entry);
    screenErrors = [];
    screenApiErrors = [];
    const errCount = entry.errors.length + entry.apiErrors.length;
    console.log(`${errCount > 0 ? '🔴' : '🟢'} [${idx}] ${label}${errCount ? ` (${errCount} errors)` : ''}`);
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
    for (let i = 0; i < 5; i++) { await page.keyboard.press('Escape'); await wait(page, 250); }
    try { await page.mouse.click(8, 8); await wait(page, 200); } catch (_) { }
    for (const sel of ['button[aria-label="Close"]', 'button[aria-label="on Close"]', 'button:has-text("İptal")', 'button:has-text("Cancel")']) {
        try {
            if (await page.locator(sel).first().isVisible({ timeout: 300 })) {
                await page.locator(sel).first().click();
                await wait(page, 250);
            }
        } catch (_) { }
    }
    await wait(page, 200);
}

async function goHome(page) {
    await closeAll(page);
    // Click Try Again buttons
    for (let a = 0; a < 3; a++) {
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

function escHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

// ────────────────────────────────────────────────────────────────────────────
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

    // ── Event listeners ──────────────────────────────────────────────────────
    page.on('console', msg => {
        if (msg.type() === 'error') {
            const txt = msg.text().slice(0, 200);
            screenErrors.push(txt);
            allConsoleErrors.push(txt);
        }
    });
    page.on('pageerror', err => {
        const txt = err.message.slice(0, 200);
        screenErrors.push('PAGE_ERR: ' + txt);
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
    // 1. LOGIN
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ LOGIN ══════════════════════════════════════');
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await wait(page, 2000);
    await screenshot(page, '00_login_page');

    try { await page.fill('input[aria-label="Username"]', USERNAME); } catch (_) { }
    try { await page.fill('input[aria-label="Password"]', PASSWORD); } catch (_) { }
    try { await page.click('button[type="submit"]'); } catch (_) { }
    await wait(page, 7000);
    await screenshot(page, '01_after_login');

    // ═══════════════════════════════════════════════════════════════════════
    // 2. HOME
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ HOME ════════════════════════════════════════');
    await goHome(page);
    await screenshot(page, '02_home');

    // Home cards
    for (const card of ['Arkadaşlar', 'Sunucular', 'Aktiviteler', 'Yapay Zeka']) {
        await goHome(page);
        if (await tryClick(page, `[role="button"]:has-text("${card}"), button:has-text("${card}")`))
            await screenshot(page, `home_card_${card}`);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 3. SIDEBAR BUTTONS
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ SIDEBAR ═════════════════════════════════════');
    await goHome(page);
    await tryClick(page, '[aria-label="Discover Servers"]');
    await screenshot(page, '03_discover_servers');
    try { await page.keyboard.press('End'); await wait(page, 500); } catch (_) { }
    await screenshot(page, '03b_discover_scroll');
    await closeAll(page);

    await goHome(page);
    await tryClick(page, '[aria-label="Premium Store"]');
    await screenshot(page, '04_premium_store');
    await closeAll(page);

    await goHome(page);
    await tryClick(page, '[aria-label="Server add"]');
    await screenshot(page, '05_add_server_menu');
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════════
    // 4. ADMIN PANEL — ALL 15 TABS
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ ADMIN PANEL ═════════════════════════════════');
    await goHome(page);
    // Scroll down in the RoomList to reveal the admin button
    try {
        // The admin panel button is at the bottom of the room list sidebar
        const adminBtn = page.locator('button[aria-label="Open Admin Panel"]');
        // Try scrolling the sidebar to bring it into view
        await page.evaluate(() => {
            const sidebar = document.querySelector('[role="navigation"]') || document.querySelector('.room-list') || document.querySelector('[class*="sidebar"]');
            if (sidebar) sidebar.scrollTop = sidebar.scrollHeight;
        });
        await wait(page, 500);
    } catch (_) { }

    const adminOpened = await tryClick(page, 'button[aria-label="Open Admin Panel"]', { timeout: 5000, wait: 2500 });
    if (!adminOpened) {
        // Try alternative: scroll entire page
        try {
            await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            await wait(page, 500);
        } catch (_) { }
        await tryClick(page, 'button[aria-label="Open Admin Panel"]', { timeout: 3000, wait: 2500 });
    }

    // Check if the admin panel modal is visible
    const adminModalVisible = await page.locator('.admin-panel-modal').isVisible({ timeout: 3000 }).catch(() => false);
    console.log(`  Admin panel modal visible: ${adminModalVisible}`);

    if (adminModalVisible) {
        await screenshot(page, 'admin_00_dashboard');

        // Admin tab labels in order
        const adminTabs = [
            'Dashboard', 'Users', 'Servers', 'Moderation', 'Logs',
            'Database', 'System', 'Security', 'Broadcast', 'Tools',
            'Quick Actions', 'Whitelist', 'Feature Access', 'Crypto Signals', 'Visitor Logs'
        ];

        // Click each sidebar tab button by its text content
        for (let i = 0; i < adminTabs.length; i++) {
            const tabName = adminTabs[i];
            try {
                // Use .admin-panel-sidebar-btn with matching text
                const btn = page.locator(`.admin-panel-sidebar-btn:has-text("${tabName}")`).first();
                if (await btn.isVisible({ timeout: 2000 })) {
                    await btn.click();
                    await wait(page, 1500);
                    // Scroll content to see everything
                    try {
                        await page.evaluate(() => {
                            const content = document.querySelector('.admin-panel-content');
                            if (content) content.scrollTop = 0;
                        });
                    } catch (_) { }
                    await screenshot(page, `admin_${String(i + 1).padStart(2, '0')}_${slug(tabName)}`);

                    // For some tabs, scroll down to see more content
                    try {
                        await page.evaluate(() => {
                            const content = document.querySelector('.admin-panel-content');
                            if (content) content.scrollTop = content.scrollHeight;
                        });
                        await wait(page, 500);
                        await screenshot(page, `admin_${String(i + 1).padStart(2, '0')}_${slug(tabName)}_scroll`);
                    } catch (_) { }
                } else {
                    console.log(`  ⚠️ Admin tab "${tabName}" button not visible`);
                }
            } catch (e) {
                console.log(`  ⚠️ Admin tab "${tabName}" error: ${e.message.slice(0, 80)}`);
            }
        }
    } else {
        console.log('  ⚠️ Admin panel did not open — checking if "Open Admin Panel" button exists');
        const btnExists = await page.locator('button[aria-label="Open Admin Panel"]').count();
        console.log(`  Admin Panel button count: ${btnExists}`);
        await screenshot(page, 'admin_NOT_OPENED');
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════════
    // 5. SERVERS — Navigate to each server + channels
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ SERVERS ═════════════════════════════════════');
    await goHome(page);
    await wait(page, 500);

    // Find server icons in the server rail using role="list" with aria-label="Serverlar"
    const serverBtns = page.locator('[aria-label="Serverlar"] [role="button"]');
    const serverCount = await serverBtns.count().catch(() => 0);
    console.log(`  Found ${serverCount} server icons`);

    for (let i = 0; i < serverCount; i++) {
        try {
            const btn = serverBtns.nth(i);
            if (!(await btn.isVisible({ timeout: 1000 }))) continue;
            const serverName = (await btn.getAttribute('aria-label')) || `server_${i}`;
            console.log(`  → Server: ${serverName}`);
            await btn.click();
            await wait(page, 1500);
            await screenshot(page, `server_${i}_${slug(serverName)}`);

            // Click text channels
            const textChannels = page.locator('.channel-item.text-channel');
            const txtCount = await textChannels.count().catch(() => 0);
            console.log(`    Text channels: ${txtCount}`);
            for (let c = 0; c < Math.min(txtCount, 5); c++) {
                try {
                    const ch = textChannels.nth(c);
                    if (!(await ch.isVisible({ timeout: 800 }))) continue;
                    const chName = (await ch.getAttribute('aria-label')) || `ch_${c}`;
                    await ch.click();
                    await wait(page, 1200);
                    await screenshot(page, `server_${i}_text_${c}_${slug(chName)}`);
                } catch (_) { }
            }

            // Show voice channels (just screenshot, don't join)
            const voiceChannels = page.locator('.channel-item.voice-channel');
            const voiceCount = await voiceChannels.count().catch(() => 0);
            console.log(`    Voice channels: ${voiceCount}`);
            if (voiceCount > 0) {
                await screenshot(page, `server_${i}_voice_channels`);
            }

            // Server settings gear (if visible, click the first one)
            try {
                const gear = page.locator('.channel-item button[aria-label*="settings" i], .channel-item button[aria-label*="ayar" i]').first();
                if (await gear.isVisible({ timeout: 800 })) {
                    // Just note it, don't click to avoid accidental changes
                    console.log(`    ⚙️ Server settings gear visible`);
                }
            } catch (_) { }
        } catch (e) {
            console.log(`  ⚠️ Server ${i} error: ${e.message.slice(0, 80)}`);
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 6. DM AREA
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ DM / CHAT ═══════════════════════════════════');
    await goHome(page);
    await wait(page, 500);

    // Open first DM
    let dmOpened = false;
    for (const name of ['PawPaw', 'iyzico', 'test']) {
        if (await tryClick(page, `[role="button"]:has-text("${name}")`, { timeout: 2000, wait: 2000 })) {
            await screenshot(page, `dm_chat_${name}`);
            dmOpened = true;
            break;
        }
    }
    if (!dmOpened) {
        // Fallback: try first DM item
        const dmItems = page.locator('[role="button"]').filter({ hasText: /^[A-Za-z]/ });
        if (await dmItems.count() > 0) {
            await dmItems.first().click();
            await wait(page, 2000);
            await screenshot(page, 'dm_chat_first');
            dmOpened = true;
        }
    }

    if (dmOpened) {
        // Chat toolbar buttons
        for (const ariaLabel of ['Emoji', 'Gif', 'GIF', 'Sticker', 'Upload', 'Attachment']) {
            try {
                const btn = page.locator(`button[aria-label="${ariaLabel}"]`).first();
                if (await btn.isVisible({ timeout: 800 })) {
                    await btn.click(); await wait(page, 800);
                    await screenshot(page, `chat_btn_${ariaLabel}`);
                    await closeAll(page);
                }
            } catch (_) { }
        }

        // Members sidebar toggle
        await tryClick(page, 'button[aria-label="Members"], button[aria-label="Üyeler"]');
        await screenshot(page, 'dm_members_sidebar');

        // Message hover and context menu
        try {
            const msgs = page.locator('[class*="message"], [class*="Message"]').filter({ hasNot: page.locator('input, textarea') });
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
    // 7. USER SETTINGS MODAL — ALL TABS
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ USER SETTINGS ═══════════════════════════════');
    await goHome(page);

    const settingsOpened = await tryClick(page, 'button[aria-label="Settings"]', { timeout: 4000, wait: 1500 });
    if (settingsOpened) {
        const settingsModal = page.locator('[aria-label="User Settings"]');
        const settingsVisible = await settingsModal.isVisible({ timeout: 3000 }).catch(() => false);
        console.log(`  Settings modal visible: ${settingsVisible}`);

        if (settingsVisible) {
            await screenshot(page, 'settings_00_open');

            const settingsTabs = [
                'My Account', 'Privacy & Security', 'Connections',
                'Appearance', 'Voice & Video', 'Notifications',
                'Keyboard Shortcuts', 'Language', 'Activity Status',
                'Sessions', 'Advanced',
                // Turkish fallbacks
                'Hesabım', 'Gizlilik ve Güvenlik', 'Bağlantılar',
                'Görünüm', 'Ses ve Video', 'Bildirimler',
                'Klavye Kısayolları', 'Dil', 'Aktivite Durumu',
                'Oturumlar', 'Gelişmiş',
            ];
            const seen = new Set();
            for (const tab of settingsTabs) {
                if (seen.has(tab.toLowerCase())) continue;
                try {
                    // Settings tabs use aria-label="Action button" with text content
                    const el = page.locator(`[aria-label="User Settings"] button:has-text("${tab}"), [aria-label="User Settings"] [role="button"]:has-text("${tab}"), [aria-label="User Settings"] li:has-text("${tab}")`).first();
                    if (await el.isVisible({ timeout: 1000 })) {
                        await el.click();
                        await wait(page, 800);
                        await screenshot(page, `settings_${slug(tab)}`);
                        seen.add(tab.toLowerCase());

                        // Click sub-buttons/toggles within each settings tab
                        try {
                            const subBtns = page.locator('[aria-label="User Settings"] main button, [aria-label="User Settings"] [class*="content"] button');
                            const subCount = await subBtns.count();
                            for (let s = 0; s < Math.min(subCount, 3); s++) {
                                try {
                                    const sb = subBtns.nth(s);
                                    if (await sb.isVisible({ timeout: 400 })) {
                                        const sbText = (await sb.textContent()).trim();
                                        if (sbText && !sbText.includes('Delete') && !sbText.includes('Sil') && !sbText.includes('Log out') && !sbText.includes('Hesabı Sil')
                                            && !sbText.includes('Çıkış') && !sbText.includes('Parolayı') && sbText.length < 30) {
                                            await sb.click();
                                            await wait(page, 600);
                                            await screenshot(page, `settings_${slug(tab)}_sub_${slug(sbText)}`);
                                            await closeAll(page);
                                            // Re-open settings if closed
                                            const stillVis = await page.locator('[aria-label="User Settings"]').isVisible({ timeout: 500 }).catch(() => false);
                                            if (!stillVis) {
                                                await tryClick(page, 'button[aria-label="Settings"]', { timeout: 2000, wait: 1000 });
                                                // Re-click the same tab
                                                const el2 = page.locator(`[aria-label="User Settings"] button:has-text("${tab}"), [aria-label="User Settings"] [role="button"]:has-text("${tab}"), [aria-label="User Settings"] li:has-text("${tab}")`).first();
                                                if (await el2.isVisible({ timeout: 1000 })) { await el2.click(); await wait(page, 500); }
                                            }
                                        }
                                    }
                                } catch (_) { }
                            }
                        } catch (_) { }
                    }
                } catch (_) { }
            }
        }
        await closeAll(page);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 8. USER PROFILE PANEL — ALL TABS (deep click)
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ USER PROFILE PANEL ══════════════════════════');
    await goHome(page);

    // Click on username row (bottom-left user info area)
    let profileOpened = false;
    try {
        const userRow = page.locator(`[role="button"]:has-text("${USERNAME}")`).last();
        if (await userRow.isVisible({ timeout: 2000 })) {
            await userRow.click();
            await wait(page, 1500);
            profileOpened = await page.locator('[aria-label="user profile panel"]').isVisible({ timeout: 3000 }).catch(() => false);
        }
    } catch (_) { }

    if (profileOpened) {
        console.log('  Profile panel opened');
        await screenshot(page, 'profile_00_open');

        // Collect ALL visible sidebar buttons dynamically
        const sidebarBtns = page.locator('[aria-label="user profile panel"] .sidebar-btn');
        let profileBtnCount = await sidebarBtns.count().catch(() => 0);
        console.log(`  Found ${profileBtnCount} sidebar buttons`);

        const clickedProfileTabs = new Set();
        for (let pass = 0; pass < 3; pass++) {
            profileBtnCount = await sidebarBtns.count().catch(() => 0);
            for (let i = 0; i < profileBtnCount; i++) {
                try {
                    const btn = sidebarBtns.nth(i);
                    if (!(await btn.isVisible({ timeout: 500 }))) continue;
                    const text = (await btn.textContent()).trim();
                    if (clickedProfileTabs.has(text) || !text) continue;
                    clickedProfileTabs.add(text);
                    await btn.click();
                    await wait(page, 1500);
                    await screenshot(page, `profile_${String(clickedProfileTabs.size).padStart(2, '0')}_${slug(text)}`);
                    console.log(`    ✓ Profile tab: ${text}`);

                    // Scroll the content area to see more
                    try {
                        await page.evaluate(() => {
                            const content = document.querySelector('[aria-label="user profile panel"] [class*="content"], [aria-label="user profile panel"] [class*="Content"]');
                            if (content && content.scrollHeight > content.clientHeight) {
                                content.scrollTop = content.scrollHeight;
                            }
                        });
                        await wait(page, 400);
                        await screenshot(page, `profile_${String(clickedProfileTabs.size).padStart(2, '0')}_${slug(text)}_scroll`);
                    } catch (_) { }

                    // Click sub-buttons/tabs inside the profile content
                    try {
                        const subBtns = page.locator('[aria-label="user profile panel"] [class*="content"] button, [aria-label="user profile panel"] [class*="Content"] button');
                        const subCount = await subBtns.count();
                        for (let s = 0; s < Math.min(subCount, 3); s++) {
                            try {
                                const sb = subBtns.nth(s);
                                if (await sb.isVisible({ timeout: 400 })) {
                                    const sbText = (await sb.textContent()).trim();
                                    if (sbText && !sbText.includes('Delete') && !sbText.includes('Sil') && !sbText.includes('Log out') && !sbText.includes('Çıkış') && sbText.length < 30) {
                                        await sb.click();
                                        await wait(page, 800);
                                        await screenshot(page, `profile_${slug(text)}_sub_${slug(sbText)}`);
                                        await closeAll(page);
                                        // Re-open profile panel if closed
                                        const stillVisible = await page.locator('[aria-label="user profile panel"]').isVisible({ timeout: 500 }).catch(() => false);
                                        if (!stillVisible) {
                                            const ur = page.locator(`[role="button"]:has-text("${USERNAME}")`).last();
                                            if (await ur.isVisible({ timeout: 1000 })) { await ur.click(); await wait(page, 1000); }
                                        }
                                    }
                                }
                            } catch (_) { }
                        }
                    } catch (_) { }
                } catch (_) { }
            }
            // Scroll sidebar to reveal more buttons
            try {
                await page.evaluate(() => {
                    const s = document.querySelector('[aria-label="user profile panel"] [class*="sidebar"], .user-profile-sidebar');
                    if (s) s.scrollTop += 300;
                });
                await wait(page, 300);
            } catch (_) { }
        }
        console.log(`  Total profile tabs clicked: ${clickedProfileTabs.size}`);
    } else {
        console.log('  ⚠️ Profile panel did not open');
        await screenshot(page, 'profile_NOT_OPENED');
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════════
    // 9. QUICK ACCESS BUTTONS
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ QUICK ACCESS ════════════════════════════════');
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
    ];
    for (const { aria, name } of quickBtns) {
        await goHome(page);
        if (await tryClick(page, `[aria-label="${aria}"]`, { timeout: 3000, wait: 1500 })) {
            try { await page.keyboard.press('End'); await wait(page, 400); } catch (_) { }
            await screenshot(page, `quick_${name}`);

            // Click sub-tabs/buttons inside the modal
            try {
                const modalBtns = page.locator('[class*="modal"] button, [class*="Modal"] button, [role="dialog"] button');
                const mbCount = await modalBtns.count();
                const clickedSubs = new Set();
                for (let s = 0; s < Math.min(mbCount, 5); s++) {
                    try {
                        const mb = modalBtns.nth(s);
                        if (!(await mb.isVisible({ timeout: 400 }))) continue;
                        const mbText = (await mb.textContent()).trim();
                        if (!mbText || clickedSubs.has(mbText) || mbText === '✕' || mbText === '×' || mbText.length > 30
                            || mbText.includes('Delete') || mbText.includes('Sil')) continue;
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

    // ═══════════════════════════════════════════════════════════════════════
    // 10. ADDITIONAL MODALS & INTERACTIONS
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ MODALS ══════════════════════════════════════');

    // Custom Status
    await goHome(page);
    await tryClick(page, '[aria-label*="status" i], button:has-text("Set Status"), button:has-text("Durum")');
    await screenshot(page, 'modal_custom_status');
    await closeAll(page);

    // Keyboard Shortcuts
    await goHome(page);
    try { await page.keyboard.press('Control+/'); await wait(page, 1000); } catch (_) { }
    await screenshot(page, 'modal_keyboard_shortcuts');
    await closeAll(page);

    // Support Developer
    await goHome(page);
    await tryClick(page, '[aria-label*="support" i], [aria-label*="destek" i]');
    await screenshot(page, 'modal_support');
    // Click sub-buttons inside support modal
    try {
        const supportBtns = page.locator('[class*="modal"] button, [role="dialog"] button');
        const sc = await supportBtns.count();
        for (let s = 0; s < Math.min(sc, 3); s++) {
            try {
                const sb = supportBtns.nth(s);
                if (await sb.isVisible({ timeout: 400 })) {
                    const t = (await sb.textContent()).trim();
                    if (t && t !== '✕' && t !== '×' && t.length < 25) {
                        await sb.click(); await wait(page, 600);
                        await screenshot(page, `modal_support_sub_${slug(t)}`);
                    }
                }
            } catch (_) { }
        }
    } catch (_) { }
    await closeAll(page);

    // Coin Store
    await goHome(page);
    await tryClick(page, 'button:has-text("Coin"), [aria-label*="Coin" i]');
    await screenshot(page, 'modal_coin_store');
    await closeAll(page);

    // Crypto
    await goHome(page);
    await tryClick(page, '[aria-label="Crypto"], button:has-text("Kripto")');
    await screenshot(page, 'modal_crypto');
    await closeAll(page);

    // English Learn
    await goHome(page);
    await tryClick(page, '[aria-label*="English" i], button:has-text("English Learn")');
    await screenshot(page, 'modal_english_learn');
    await closeAll(page);

    // Crypto Signals
    await goHome(page);
    await tryClick(page, '[aria-label*="Crypto Signals" i], button:has-text("Crypto Signals")');
    await screenshot(page, 'modal_crypto_signals');
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════════
    // 11. SERVER SETTINGS (gear icon)
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ SERVER SETTINGS ═════════════════════════════');
    await goHome(page);
    // Click first server
    const srvBtn_ss = page.locator('[aria-label="Serverlar"] [role="button"]').first();
    if (await srvBtn_ss.isVisible({ timeout: 2000 }).catch(() => false)) {
        await srvBtn_ss.click();
        await wait(page, 1500);

        // Click server header settings gear
        const srvGear = page.locator('button[aria-label*="settings" i], button[aria-label*="ayar" i], button[aria-label*="Server Settings" i]').first();
        if (await srvGear.isVisible({ timeout: 2000 }).catch(() => false)) {
            await srvGear.click();
            await wait(page, 1500);
            await screenshot(page, 'server_settings_00');

            // Click tabs inside server settings
            const ssTabs = page.locator('[class*="modal"] button, [class*="Modal"] button, [role="dialog"] [role="button"]');
            const ssCount = await ssTabs.count().catch(() => 0);
            const clickedSS = new Set();
            for (let s = 0; s < Math.min(ssCount, 10); s++) {
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
    // 12. PREMIUM STORE — Sub-tabs
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ PREMIUM STORE TABS ══════════════════════════');
    await goHome(page);
    await tryClick(page, '[aria-label="Premium Store"]', { timeout: 3000, wait: 1500 });
    await screenshot(page, 'premium_tab_premium');
    // Click sub-tabs: Mağaza, Server Boost
    for (const tabName of ['Magaza', 'Mağaza', 'Store', 'Server Boost']) {
        if (await tryClick(page, `button:has-text("${tabName}"), [role="tab"]:has-text("${tabName}")`, { timeout: 1000, wait: 800 })) {
            await screenshot(page, `premium_tab_${slug(tabName)}`);
        }
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════════
    // 13. DISCOVER SERVERS — Join interaction
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ DISCOVER INTERACTIONS ════════════════════════');
    await goHome(page);
    await tryClick(page, '[aria-label="Discover Servers"]', { timeout: 3000, wait: 1500 });
    // Search in discover
    try {
        const searchInput = page.locator('input[placeholder*="Search" i], input[placeholder*="Ara" i]').first();
        if (await searchInput.isVisible({ timeout: 1000 })) {
            await searchInput.fill('test');
            await wait(page, 1000);
            await screenshot(page, 'discover_search_results');
            await searchInput.fill('');
            await wait(page, 500);
        }
    } catch (_) { }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════════
    // FINAL
    // ═══════════════════════════════════════════════════════════════════════
    await goHome(page);
    await screenshot(page, 'ZZ_final_home');

    await browser.close();

    // ═══════════════════════════════════════════════════════════════════════
    // GENERATE HTML REPORT
    // ═══════════════════════════════════════════════════════════════════════
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    const totalErrors = allConsoleErrors.length;
    const totalApiErrors = allApiErrors.length;
    const screensWithErrors = report.filter(r => r.errors.length + r.apiErrors.length > 0);

    const thumbs = report.map(r => {
        const hasErr = r.errors.length + r.apiErrors.length > 0;
        const errHtml = hasErr ? `
            <div class="errors">
                ${r.errors.map(e => `<div class="err console">🔴 ${escHtml(e)}</div>`).join('')}
                ${r.apiErrors.map(e => `<div class="err api">🟠 API ${escHtml(e)}</div>`).join('')}
            </div>` : '';
        return `
        <div class="card ${hasErr ? 'has-error' : ''}">
            <a href="screenshots_v2/${encodeURIComponent(r.file)}" target="_blank">
                <img src="screenshots_v2/${encodeURIComponent(r.file)}" alt="${escHtml(r.label)}" loading="lazy" />
            </a>
            <div class="label">${r.idx}. ${escHtml(r.label)}</div>
            ${errHtml}
        </div>`;
    }).join('');

    const html = `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pawscord Visual Audit v2 — ${new Date().toISOString().slice(0, 10)}</title>
<style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #1a1a2e; color: #e0e0e0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    h1 { padding: 20px; background: #16213e; font-size: 1.4rem; }
    .summary { display: flex; gap: 16px; padding: 16px 20px; background: #0f3460; flex-wrap: wrap; }
    .stat { background: #1a1a2e; padding: 10px 18px; border-radius: 8px; text-align: center; }
    .stat .val { font-size: 1.8rem; font-weight: bold; }
    .stat .key { font-size: 0.75rem; opacity: 0.7; margin-top: 2px; }
    .val.ok { color: #23a559; } .val.warn { color: #f0b132; } .val.err { color: #e74c3c; }
    .filter-bar { padding: 12px 20px; background: #16213e; display: flex; gap: 10px; align-items: center; }
    .filter-bar button { padding: 6px 16px; border: none; border-radius: 6px; cursor: pointer; font-size: 0.85rem; }
    .btn-all { background: #5865f2; color: white; } .btn-err { background: #e74c3c; color: white; } .btn-ok { background: #23a559; color: white; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 16px; padding: 20px; }
    .card { background: #16213e; border-radius: 10px; overflow: hidden; border: 2px solid transparent; transition: border-color 0.2s; }
    .card:hover { border-color: #5865f2; }
    .card.has-error { border-color: #e74c3c66; }
    .card img { width: 100%; height: 240px; object-fit: cover; object-position: top; display: block; cursor: pointer; }
    .card img:hover { object-position: center; }
    .label { padding: 8px 12px; font-size: 0.85rem; font-weight: 500; background: #0f3460; }
    .errors { padding: 6px 12px 10px; }
    .err { font-size: 0.72rem; padding: 3px 6px; margin-top: 3px; border-radius: 4px; word-break: break-all; }
    .err.console { background: #e74c3c22; color: #ff8080; }
    .err.api { background: #f0b13222; color: #ffd080; }
    .all-errors { padding: 20px; }
    .all-errors h2 { margin-bottom: 12px; color: #e74c3c; }
    .all-errors ul { list-style: none; }
    .all-errors li { font-size: 0.8rem; padding: 4px 0; border-bottom: 1px solid #ffffff18; word-break: break-all; }
    footer { padding: 20px; text-align: center; opacity: 0.5; font-size: 0.8rem; }
</style>
</head>
<body>
<h1>🎨 Pawscord Deep Visual Audit v2 — ${new Date().toUTCString()}</h1>
<div class="summary">
    <div class="stat"><div class="val ok">${report.length}</div><div class="key">Screenshots</div></div>
    <div class="stat"><div class="val ${screensWithErrors.length > 0 ? 'err' : 'ok'}">${screensWithErrors.length}</div><div class="key">Error Screens</div></div>
    <div class="stat"><div class="val ${totalErrors > 0 ? 'err' : 'ok'}">${totalErrors}</div><div class="key">Console Errors</div></div>
    <div class="stat"><div class="val ${totalApiErrors > 0 ? 'warn' : 'ok'}">${totalApiErrors}</div><div class="key">API Errors</div></div>
    <div class="stat"><div class="val">${elapsed}s</div><div class="key">Duration</div></div>
</div>
<div class="filter-bar">
    <button class="btn-all" onclick="filterCards('all')">All (${report.length})</button>
    <button class="btn-err" onclick="filterCards('err')">⚠️ Errors (${screensWithErrors.length})</button>
    <button class="btn-ok"  onclick="filterCards('ok')">✅ Clean (${report.length - screensWithErrors.length})</button>
</div>
<div class="grid" id="grid">${thumbs}</div>
${totalErrors > 0 ? `<div class="all-errors"><h2>🔴 Console Errors (${totalErrors})</h2><ul>${[...new Set(allConsoleErrors)].map(e => `<li>${escHtml(e)}</li>`).join('')}</ul></div>` : ''}
${totalApiErrors > 0 ? `<div class="all-errors"><h2>🟠 API Errors (${totalApiErrors})</h2><ul>${[...new Set(allApiErrors)].map(e => `<li>${escHtml(e)}</li>`).join('')}</ul></div>` : ''}
<footer>Generated by visual_audit_v2.js · ${new Date().toISOString()}</footer>
<script>
function filterCards(mode) {
    document.querySelectorAll('.card').forEach(c => {
        if (mode === 'all') c.style.display = '';
        else if (mode === 'err') c.style.display = c.classList.contains('has-error') ? '' : 'none';
        else if (mode === 'ok')  c.style.display = c.classList.contains('has-error') ? 'none' : '';
    });
}
</script>
</body></html>`;

    fs.writeFileSync(path.join(__dirname, 'audit_report_v2.html'), html, 'utf8');

    // ── Console summary ──────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(60));
    console.log(`📸 Screenshots: ${report.length}  |  🔴 Errors: ${totalErrors}  |  🟠 API: ${totalApiErrors}`);
    console.log(`⏱  Elapsed: ${elapsed}s`);
    console.log(`📋 Report: ${path.join(__dirname, 'audit_report_v2.html')}`);
    if (screensWithErrors.length > 0) {
        console.log(`\n⚠️  Screens with errors:`);
        screensWithErrors.forEach(r => {
            console.log(`   [${r.idx}] ${r.label}`);
            r.errors.forEach(e => console.log(`       🔴 ${e.slice(0, 120)}`));
            r.apiErrors.forEach(e => console.log(`       🟠 API ${e}`));
        });
    }
    if (totalErrors === 0 && totalApiErrors === 0) console.log('\n✅ No errors found!');
    console.log('═'.repeat(60));
})();
