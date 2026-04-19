/**
 * Pawscord Visual Audit v3 — Comprehensive 2026-04-15
 * Full site audit: every page, modal, tab, button.
 * Captures: screenshots, console errors, API errors, English text detection.
 * 
 * Run:  node visual_audit_v3.js
 * Output: screenshots_v3/ folder + audit_report_v3.json + audit_report_v3.html
 */
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.pawscord.com';
const USERNAME = 'YANHESAP';
const PASSWORD = 'YANHESAP';
const SHOTS_DIR = path.join(__dirname, 'screenshots_v3');

// English words that indicate i18n bug (Turkish-first site)
const ENGLISH_PATTERNS = [
    /\bSettings\b/, /\bProfile\b/, /\bFriends\b/, /\bHome\b/, /\bServer\b/,
    /\bChannel\b/, /\bMessage\b/, /\bSearch\b/, /\bEdit\b/, /\bDelete\b/,
    /\bCancel\b/, /\bSave\b/, /\bClose\b/, /\bSubmit\b/, /\bUpload\b/,
    /\bDownload\b/, /\bCreate\b/, /\bJoin\b/, /\bLeave\b/, /\bMute\b/,
    /\bUnmute\b/, /\bDeafen\b/, /\bUndeafen\b/, /\bKick\b/, /\bBan\b/,
    /\bOnline\b/, /\bOffline\b/, /\bIdle\b/, /\bDo Not Disturb\b/,
    /\bInvisible\b/, /\bTyping\b/, /\bNo messages\b/, /\bNothing here\b/,
    /\bSend a message\b/, /\bError\b/, /\bFailed\b/, /\bLoading\b/,
    /\bRetry\b/, /\bTry Again\b/, /\bSomething went wrong\b/,
    /\bSign Out\b/, /\bLog Out\b/, /\bSign In\b/, /\bLog In\b/,
    /\bPassword\b/, /\bUsername\b/, /\bEmail\b/, /\bConfirm\b/,
    /\bNotifications\b/, /\bAppearance\b/, /\bVoice\b/, /\bVideo\b/,
    /\bPrivacy\b/, /\bSecurity\b/, /\bAdvanced\b/, /\bLanguage\b/,
    /\bActivity\b/, /\bStatus\b/, /\bConnections\b/, /\bSessions\b/,
    /\bor\b(?= link| paste)/, /\bPremium\b/, /\bStore\b/, /\bBoost\b/,
    /\bMembers\b/, /\bMember\b/, /\bAdmin\b/, /\bModerator\b/,
    /\bOwner\b/, /\bRole\b/, /\bRoles\b/, /\bPermissions\b/,
    /\bInvite\b/, /\bInvite Link\b/, /\bCopy\b/, /\bPaste\b/,
    /\bAre you sure\b/, /\bThis action\b/, /\bcannot be undone\b/,
    /\bNew\b(?= message| channel| server)/, /\bPin\b/, /\bUnpin\b/,
    /\bReply\b/, /\bThread\b/, /\bReact\b/, /\bReaction\b/,
    /\bFile too large\b/, /\bUnsupported\b/, /\bEmpty\b/,
    /\bDashboard\b/, /\bOverview\b/, /\bInsights\b/, /\bAnalytics\b/,
    /\bReport\b/, /\bBlock\b/, /\bUnblock\b/,
    /\bAdd Friend\b/, /\bRemove Friend\b/, /\bPending\b/, /\bAll\b(?= Friends)/,
    /\bSend Friend Request\b/, /\bAccept\b/, /\bDecline\b/, /\bIgnore\b/
];

// ── Ensure output directory ──────────────────────────────────────────────────
if (fs.existsSync(SHOTS_DIR)) {
    fs.readdirSync(SHOTS_DIR).forEach(f => {
        if (f.endsWith('.png') || f.endsWith('.json')) fs.unlinkSync(path.join(SHOTS_DIR, f));
    });
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

function slug(name) {
    return name.replace(/[^a-zA-Z0-9_\-]/g, '_').replace(/_+/g, '_').slice(0, 60);
}

async function detectEnglishText(page) {
    try {
        return await page.evaluate((patterns) => {
            const found = [];
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
            while (walker.nextNode()) {
                const text = walker.currentNode.textContent.trim();
                if (!text || text.length < 3 || text.length > 200) continue;
                // Skip script/style content
                const parent = walker.currentNode.parentElement;
                if (!parent || ['SCRIPT', 'STYLE', 'CODE', 'PRE'].includes(parent.tagName)) continue;
                // Skip invisible elements
                const style = window.getComputedStyle(parent);
                if (style.display === 'none' || style.visibility === 'hidden') continue;

                for (const pat of patterns) {
                    const re = new RegExp(pat, 'i');
                    if (re.test(text)) {
                        found.push({ text: text.slice(0, 100), element: parent.tagName, className: (parent.className || '').toString().slice(0, 50) });
                        break;
                    }
                }
            }
            return [...new Map(found.map(f => [f.text, f])).values()].slice(0, 20);
        }, ENGLISH_PATTERNS.map(p => p.source));
    } catch (_) {
        return [];
    }
}

async function screenshot(page, label) {
    shotIdx++;
    const idx = String(shotIdx).padStart(3, '0');
    const file = `${idx}_${slug(label)}.png`;
    try {
        await page.screenshot({ path: path.join(SHOTS_DIR, file), fullPage: false });
    } catch (_) { }

    // Detect React error boundaries / broken UI
    let domErrors = [];
    try {
        domErrors = await page.evaluate(() => {
            const found = [];
            for (const el of document.querySelectorAll('div, span, p, h1, h2, h3')) {
                const t = el.textContent || '';
                if (t.length > 200) continue;
                if (t.includes('failed to load') || t.includes('is not defined') ||
                    t.includes('Something went wrong') || t.includes('Bir hata oluştu') ||
                    (t.includes('Try Again') && t.length < 200) ||
                    (t.includes('Tekrar Dene') && t.length < 200)) {
                    found.push(t.trim().slice(0, 150));
                }
            }
            return [...new Set(found)];
        });
        for (const t of domErrors) {
            const msg = `DOM_ERROR: ${t}`;
            if (!screenErrors.includes(msg)) screenErrors.push(msg);
        }
    } catch (_) { }

    // Detect English text
    const englishTexts = await detectEnglishText(page);

    const entry = {
        idx: shotIdx,
        label,
        file,
        errors: [...screenErrors],
        apiErrors: [...screenApiErrors],
        englishTexts,
        domErrors,
        timestamp: new Date().toISOString(),
    };
    report.push(entry);
    screenErrors = [];
    screenApiErrors = [];

    const errCount = entry.errors.length + entry.apiErrors.length;
    const engCount = englishTexts.length;
    const icon = errCount > 0 ? '🔴' : engCount > 0 ? '🟡' : '🟢';
    console.log(`${icon} [${idx}] ${label}${errCount ? ` (${errCount} errors)` : ''}${engCount ? ` (${engCount} EN texts)` : ''}`);
    return entry;
}

async function wait(page, ms = 700) {
    await page.waitForTimeout(ms);
}

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
    for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Escape');
        await wait(page, 200);
    }
    try { await page.mouse.click(8, 8); await wait(page, 200); } catch (_) { }
    for (const sel of [
        'button[aria-label="Close"]',
        'button[aria-label="Kapat"]',
        'button:has-text("İptal")',
        'button:has-text("Cancel")',
        '[class*="close-btn"]',
    ]) {
        try {
            if (await page.locator(sel).first().isVisible({ timeout: 300 })) {
                await page.locator(sel).first().click();
                await wait(page, 200);
            }
        } catch (_) { }
    }
    await wait(page, 200);
}

async function goHome(page) {
    await closeAll(page);
    try {
        const h = page.locator('[aria-label="Home"]').first();
        if (await h.isVisible({ timeout: 2000 })) {
            await h.click();
            await wait(page, 1000);
            return;
        }
    } catch (_) { }
    try {
        await page.reload({ waitUntil: 'domcontentloaded', timeout: 20000 });
        await wait(page, 3000);
    } catch (_) { }
}

function escHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

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
        locale: 'tr-TR',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36',
    });
    const page = await context.newPage();

    // ── Event listeners ──────────────────────────────────────────────────────
    page.on('console', msg => {
        if (msg.type() === 'error') {
            const txt = msg.text().slice(0, 250);
            if (txt.includes('favicon') || txt.includes('sw.js')) return; // Skip noise
            screenErrors.push(txt);
            allConsoleErrors.push(txt);
        }
    });
    page.on('pageerror', err => {
        const txt = err.message.slice(0, 250);
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
    console.log('\n══ 1. LOGIN ═══════════════════════════════════════');
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await wait(page, 3000);
    await screenshot(page, '01_login_page');

    // Check login page form elements
    try { await page.fill('input[aria-label="Username"]', USERNAME); } catch (_) {
        // Try alternative selectors
        try { await page.fill('input[name="username"]', USERNAME); } catch (_) {
            try { await page.fill('input[type="text"]', USERNAME); } catch (_) { }
        }
    }
    try { await page.fill('input[aria-label="Password"]', PASSWORD); } catch (_) {
        try { await page.fill('input[name="password"]', PASSWORD); } catch (_) {
            try { await page.fill('input[type="password"]', PASSWORD); } catch (_) { }
        }
    }
    await screenshot(page, '01b_login_filled');
    try { await page.click('button[type="submit"]'); } catch (_) { }
    await wait(page, 8000);
    await screenshot(page, '02_after_login');

    // ═══════════════════════════════════════════════════════════════════════
    // 2. HOME PAGE
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 2. HOME PAGE ═══════════════════════════════════');
    await goHome(page);
    await wait(page, 1000);
    await screenshot(page, '03_home_page');

    // Home page quick access cards
    for (const card of ['Arkadaşlar', 'Sunucular', 'Aktiviteler', 'Yapay Zeka']) {
        await goHome(page);
        if (await tryClick(page, `[role="button"]:has-text("${card}"), button:has-text("${card}"), [class*="card"]:has-text("${card}")`)) {
            await screenshot(page, `03_home_card_${slug(card)}`);
            await closeAll(page);
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 3. FRIENDS TAB
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 3. FRIENDS TAB ═════════════════════════════════');
    await goHome(page);
    // Try to find and click Friends tab
    const friendsOpened = await tryClick(page, '[aria-label="Arkadaşlar"], [aria-label="Friends"], button:has-text("Arkadaşlar")');
    if (friendsOpened) {
        await screenshot(page, '04_friends_tab');
        // Friends sub-tabs: Online, All, Pending, Blocked
        for (const tab of ['Online', 'Tümü', 'All', 'Bekleyen', 'Pending', 'Engelli', 'Blocked', 'Arkadaş Ekle', 'Add Friend']) {
            if (await tryClick(page, `button:has-text("${tab}"), [role="tab"]:has-text("${tab}")`, { timeout: 1000, wait: 600 })) {
                await screenshot(page, `04_friends_${slug(tab)}`);
            }
        }
    } else {
        await screenshot(page, '04_friends_NOT_FOUND');
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 4. DM CONVERSATIONS
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 4. DM CONVERSATIONS ════════════════════════════');
    await goHome(page);
    await wait(page, 500);

    // Click DM items in the sidebar
    const dmNames = ['PawPaw', 'iyzico', 'test', 'admin'];
    let dmClicked = 0;
    for (const name of dmNames) {
        if (await tryClick(page, `[class*="dm-item"]:has-text("${name}"), [role="button"]:has-text("${name}")`, { timeout: 2000, wait: 2000 })) {
            await screenshot(page, `05_dm_${slug(name)}`);
            dmClicked++;

            // Check message input area
            try {
                const msgInput = page.locator('textarea, input[placeholder*="mesaj" i], input[placeholder*="message" i], [contenteditable="true"]').first();
                if (await msgInput.isVisible({ timeout: 1000 })) {
                    await screenshot(page, `05_dm_${slug(name)}_input`);
                }
            } catch (_) { }

            // Check chat toolbar buttons
            for (const btn of ['Emoji', 'GIF', 'Sticker', 'Upload', 'Dosya']) {
                try {
                    const el = page.locator(`button[aria-label="${btn}"], button[aria-label="${btn.toLowerCase()}"]`).first();
                    if (await el.isVisible({ timeout: 500 })) {
                        await el.click();
                        await wait(page, 600);
                        await screenshot(page, `05_dm_${slug(name)}_${slug(btn)}`);
                        await closeAll(page);
                    }
                } catch (_) { }
            }

            // Right-click a message for context menu
            try {
                const msgs = page.locator('[class*="message-content"], [class*="MessageContent"]');
                if (await msgs.count() > 0) {
                    await msgs.last().click({ button: 'right' });
                    await wait(page, 500);
                    await screenshot(page, `05_dm_${slug(name)}_context_menu`);
                    await closeAll(page);
                }
            } catch (_) { }

            if (dmClicked >= 2) break; // Check at most 2 DMs
        }
    }
    if (dmClicked === 0) {
        // Try clicking first available DM
        const firstDm = page.locator('[class*="dm-item"], [class*="DmItem"]').first();
        if (await firstDm.isVisible({ timeout: 2000 }).catch(() => false)) {
            await firstDm.click();
            await wait(page, 2000);
            await screenshot(page, '05_dm_first');
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 5. DISCOVER SERVERS
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 5. DISCOVER SERVERS ═════════════════════════════');
    await goHome(page);
    await tryClick(page, '[aria-label="Discover Servers"]', { timeout: 3000, wait: 1500 });
    await screenshot(page, '06_discover_servers');

    // Search
    try {
        const searchInput = page.locator('input[placeholder*="Ara" i], input[placeholder*="Search" i]').first();
        if (await searchInput.isVisible({ timeout: 1000 })) {
            await searchInput.fill('test');
            await wait(page, 1000);
            await screenshot(page, '06_discover_search');
            await searchInput.fill('');
        }
    } catch (_) { }

    // Scroll down
    try { await page.keyboard.press('End'); await wait(page, 500); } catch (_) { }
    await screenshot(page, '06_discover_scroll');
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════════
    // 6. ADD SERVER MENU
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 6. ADD SERVER MENU ══════════════════════════════');
    await goHome(page);
    await tryClick(page, '[aria-label="Server add"], [aria-label="Sunucu Ekle"], button:has-text("+")');
    await screenshot(page, '07_add_server_menu');
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════════
    // 7. SERVERS — Navigate to EACH server & channel
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 7. SERVERS & CHANNELS ══════════════════════════');
    await goHome(page);
    await wait(page, 500);

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
            await screenshot(page, `08_server_${i}_${slug(serverName)}`);

            // Text channels
            const textChannels = page.locator('.channel-item.text-channel, [class*="channel-item"][class*="text"]');
            const txtCount = await textChannels.count().catch(() => 0);
            console.log(`    Text channels: ${txtCount}`);
            for (let c = 0; c < Math.min(txtCount, 8); c++) {
                try {
                    const ch = textChannels.nth(c);
                    if (!(await ch.isVisible({ timeout: 800 }))) continue;
                    const chName = (await ch.textContent()).trim() || `ch_${c}`;
                    await ch.click();
                    await wait(page, 1500);
                    await screenshot(page, `08_server_${i}_ch_${c}_${slug(chName)}`);
                } catch (_) { }
            }

            // Voice channels (just screenshot, don't join)
            const voiceChannels = page.locator('.channel-item.voice-channel, [class*="channel-item"][class*="voice"]');
            const voiceCount = await voiceChannels.count().catch(() => 0);
            console.log(`    Voice channels: ${voiceCount}`);
            if (voiceCount > 0) {
                await screenshot(page, `08_server_${i}_voice_channels`);
            }

            // Kanban board (check if there's a kanban channel)
            const kanbanChannel = page.locator('.channel-item:has-text("kanban"), .channel-item:has-text("Kanban")').first();
            if (await kanbanChannel.isVisible({ timeout: 800 }).catch(() => false)) {
                await kanbanChannel.click();
                await wait(page, 2000);
                await screenshot(page, `08_server_${i}_kanban`);
                // Click kanban columns/cards
                try {
                    const kanbanCards = page.locator('[class*="kanban-card"], [class*="KanbanCard"]');
                    if (await kanbanCards.count() > 0) {
                        await kanbanCards.first().click();
                        await wait(page, 800);
                        await screenshot(page, `08_server_${i}_kanban_card`);
                        await closeAll(page);
                    }
                } catch (_) { }
            }

            // Forum channel check
            const forumChannel = page.locator('.channel-item:has-text("forum"), .channel-item:has-text("Forum")').first();
            if (await forumChannel.isVisible({ timeout: 800 }).catch(() => false)) {
                await forumChannel.click();
                await wait(page, 2000);
                await screenshot(page, `08_server_${i}_forum`);
            }
        } catch (e) {
            console.log(`  ⚠️ Server ${i} error: ${e.message.slice(0, 80)}`);
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 8. VOICE CHANNEL UI (join briefly)
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 8. VOICE CHANNEL ════════════════════════════════');
    await goHome(page);
    // Click first server
    if (serverCount > 0) {
        await serverBtns.first().click();
        await wait(page, 1500);
        const voiceCh = page.locator('.channel-item.voice-channel').first();
        if (await voiceCh.isVisible({ timeout: 2000 }).catch(() => false)) {
            await voiceCh.click();
            await wait(page, 2000);
            await screenshot(page, '09_voice_joined');

            // Voice control bar buttons
            for (const ariaLabel of ['Mute', 'Deafen', 'Mikrofon', 'Kulaklık', 'Ses', 'Video', 'Ekran Paylaş', 'Disconnect', 'Bağlantıyı Kes']) {
                try {
                    const btn = page.locator(`button[aria-label*="${ariaLabel}" i]`).first();
                    if (await btn.isVisible({ timeout: 500 })) {
                        // Don't actually click disconnect; screenshot others
                        if (!ariaLabel.includes('Disconnect') && !ariaLabel.includes('Kes')) {
                            await btn.click();
                            await wait(page, 500);
                            await screenshot(page, `09_voice_${slug(ariaLabel)}`);
                            // Toggle back
                            await btn.click();
                            await wait(page, 300);
                        }
                    }
                } catch (_) { }
            }
            await screenshot(page, '09_voice_controls');

            // Disconnect
            await tryClick(page, 'button[aria-label*="Disconnect" i], button[aria-label*="Bağlantı" i], button[aria-label*="disconnect" i]');
            await wait(page, 500);
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 9. PREMIUM STORE
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 9. PREMIUM STORE ════════════════════════════════');
    await goHome(page);
    await tryClick(page, '[aria-label="Premium Store"]', { timeout: 3000, wait: 1500 });
    await screenshot(page, '10_premium_store');
    // Sub-tabs
    for (const tab of ['Mağaza', 'Store', 'Premium', 'Server Boost', 'Sunucu Boost']) {
        if (await tryClick(page, `button:has-text("${tab}"), [role="tab"]:has-text("${tab}")`, { timeout: 1000, wait: 600 })) {
            await screenshot(page, `10_premium_${slug(tab)}`);
        }
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════════
    // 10. ADMIN PANEL — ALL TABS
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 10. ADMIN PANEL ═════════════════════════════════');
    await goHome(page);

    // Scroll sidebar to find admin button
    try {
        await page.evaluate(() => {
            const sidebar = document.querySelector('[role="navigation"]') ||
                document.querySelector('.room-list') ||
                document.querySelector('[class*="sidebar"]');
            if (sidebar) sidebar.scrollTop = sidebar.scrollHeight;
        });
        await wait(page, 500);
    } catch (_) { }

    let adminOpened = await tryClick(page, 'button[aria-label="Open Admin Panel"]', { timeout: 5000, wait: 2500 });
    if (!adminOpened) {
        try {
            await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            await wait(page, 500);
        } catch (_) { }
        adminOpened = await tryClick(page, 'button[aria-label="Open Admin Panel"]', { timeout: 3000, wait: 2500 });
    }

    const adminVisible = await page.locator('.admin-panel-modal').isVisible({ timeout: 3000 }).catch(() => false);
    console.log(`  Admin panel visible: ${adminVisible}`);

    if (adminVisible) {
        await screenshot(page, '11_admin_dashboard');

        const adminTabs = [
            'Dashboard', 'Users', 'Servers', 'Moderation', 'Logs',
            'Database', 'System', 'Security', 'Broadcast', 'Tools',
            'Quick Actions', 'Whitelist', 'Feature Access', 'Crypto Signals', 'Visitor Logs'
        ];

        for (let i = 0; i < adminTabs.length; i++) {
            const tabName = adminTabs[i];
            try {
                const btn = page.locator(`.admin-panel-sidebar-btn:has-text("${tabName}")`).first();
                if (await btn.isVisible({ timeout: 2000 })) {
                    await btn.click();
                    await wait(page, 1500);
                    try {
                        await page.evaluate(() => {
                            const content = document.querySelector('.admin-panel-content');
                            if (content) content.scrollTop = 0;
                        });
                    } catch (_) { }
                    await screenshot(page, `11_admin_${String(i + 1).padStart(2, '0')}_${slug(tabName)}`);

                    // Scroll down
                    try {
                        await page.evaluate(() => {
                            const content = document.querySelector('.admin-panel-content');
                            if (content) content.scrollTop = content.scrollHeight;
                        });
                        await wait(page, 500);
                        await screenshot(page, `11_admin_${String(i + 1).padStart(2, '0')}_${slug(tabName)}_bottom`);
                    } catch (_) { }
                } else {
                    console.log(`  ⚠️ Admin tab "${tabName}" not visible`);
                }
            } catch (e) {
                console.log(`  ⚠️ Admin tab "${tabName}" error: ${e.message.slice(0, 80)}`);
            }
        }
    } else {
        await screenshot(page, '11_admin_NOT_OPENED');
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════════
    // 11. USER SETTINGS — ALL TABS
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 11. USER SETTINGS ═══════════════════════════════');
    await goHome(page);

    const settingsOpened = await tryClick(page, 'button[aria-label="Settings"], button[aria-label="Ayarlar"]', { timeout: 4000, wait: 1500 });
    if (settingsOpened) {
        const settingsVisible = await page.locator('[aria-label="User Settings"]').isVisible({ timeout: 3000 }).catch(() => false);

        if (settingsVisible) {
            await screenshot(page, '12_settings_open');

            const settingsTabs = [
                'My Account', 'Hesabım',
                'Privacy & Security', 'Gizlilik ve Güvenlik',
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
            let tabIdx = 0;
            for (const tab of settingsTabs) {
                if (seen.has(tab.toLowerCase())) continue;
                try {
                    const el = page.locator(`[aria-label="User Settings"] button:has-text("${tab}"), [aria-label="User Settings"] [role="button"]:has-text("${tab}"), [aria-label="User Settings"] li:has-text("${tab}")`).first();
                    if (await el.isVisible({ timeout: 1000 })) {
                        tabIdx++;
                        await el.click();
                        await wait(page, 800);
                        await screenshot(page, `12_settings_${String(tabIdx).padStart(2, '0')}_${slug(tab)}`);
                        seen.add(tab.toLowerCase());

                        // Scroll content to see full page
                        try {
                            await page.evaluate(() => {
                                const content = document.querySelector('[aria-label="User Settings"] main, [aria-label="User Settings"] [class*="content"]');
                                if (content) content.scrollTop = content.scrollHeight;
                            });
                            await wait(page, 400);
                            await screenshot(page, `12_settings_${String(tabIdx).padStart(2, '0')}_${slug(tab)}_scroll`);
                        } catch (_) { }
                    }
                } catch (_) { }
            }
        }
        await closeAll(page);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 12. USER PROFILE PANEL — ALL TABS
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 12. USER PROFILE PANEL ══════════════════════════');
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

    if (profileOpened) {
        await screenshot(page, '13_profile_open');

        const sidebarBtns = page.locator('[aria-label="user profile panel"] .sidebar-btn');
        const clickedTabs = new Set();
        let profileTabIdx = 0;

        for (let pass = 0; pass < 3; pass++) {
            const btnCount = await sidebarBtns.count().catch(() => 0);
            for (let i = 0; i < btnCount; i++) {
                try {
                    const btn = sidebarBtns.nth(i);
                    if (!(await btn.isVisible({ timeout: 500 }))) continue;
                    const text = (await btn.textContent()).trim();
                    if (clickedTabs.has(text) || !text) continue;
                    clickedTabs.add(text);
                    profileTabIdx++;
                    await btn.click();
                    await wait(page, 1500);
                    await screenshot(page, `13_profile_${String(profileTabIdx).padStart(2, '0')}_${slug(text)}`);
                    console.log(`    ✓ Profile tab: ${text}`);

                    // Scroll content
                    try {
                        await page.evaluate(() => {
                            const content = document.querySelector('[aria-label="user profile panel"] [class*="content"]');
                            if (content && content.scrollHeight > content.clientHeight) {
                                content.scrollTop = content.scrollHeight;
                            }
                        });
                        await wait(page, 400);
                        await screenshot(page, `13_profile_${String(profileTabIdx).padStart(2, '0')}_${slug(text)}_scroll`);
                    } catch (_) { }
                } catch (_) { }
            }
            // Scroll sidebar to reveal more
            try {
                await page.evaluate(() => {
                    const s = document.querySelector('[aria-label="user profile panel"] [class*="sidebar"]');
                    if (s) s.scrollTop += 300;
                });
                await wait(page, 300);
            } catch (_) { }
        }
        console.log(`  Total profile tabs: ${clickedTabs.size}`);
    } else {
        await screenshot(page, '13_profile_NOT_OPENED');
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════════
    // 13. QUICK ACCESS BUTTONS / MODALS
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 13. QUICK ACCESS MODALS ═════════════════════════');
    const quickBtns = [
        { aria: 'Custom Status', name: 'custom_status' },
        { aria: 'Özel Durum', name: 'custom_status_tr' },
        { aria: '💰 Payment Panel', name: 'payment' },
        { aria: '🛒 Store', name: 'store' },
        { aria: '🎁 Daily Rewards', name: 'daily_rewards' },
        { aria: '📊 API Usage', name: 'api_usage' },
        { aria: '📥 Export Jobs', name: 'export_jobs' },
        { aria: '📢 Scheduled Announcements', name: 'announcements' },
        { aria: '🎮 Mini Games', name: 'mini_games' },
        { aria: '📂 Projects', name: 'projects' },
        { aria: '🎨 Avatar Studio', name: 'avatar_studio' },
        { aria: 'Crypto', name: 'crypto' },
        { aria: 'Kripto', name: 'crypto_tr' },
    ];

    for (const { aria, name } of quickBtns) {
        await goHome(page);
        if (await tryClick(page, `[aria-label="${aria}"], button[aria-label="${aria}"]`, { timeout: 2000, wait: 1500 })) {
            await screenshot(page, `14_modal_${name}`);

            // Click sub-tabs inside modal
            try {
                const modalBtns = page.locator('[class*="modal"] button, [role="dialog"] button');
                const count = await modalBtns.count();
                const clicked = new Set();
                for (let s = 0; s < Math.min(count, 5); s++) {
                    try {
                        const mb = modalBtns.nth(s);
                        if (!(await mb.isVisible({ timeout: 400 }))) continue;
                        const t = (await mb.textContent()).trim();
                        if (!t || clicked.has(t) || t === '✕' || t === '×' || t.length > 30 ||
                            t.includes('Delete') || t.includes('Sil') || t.includes('Kapat')) continue;
                        clicked.add(t);
                        await mb.click();
                        await wait(page, 800);
                        await screenshot(page, `14_modal_${name}_sub_${slug(t)}`);
                    } catch (_) { }
                }
            } catch (_) { }
            await closeAll(page);
        }
    }

    // Keyboard Shortcuts modal (Ctrl+/)
    await goHome(page);
    try { await page.keyboard.press('Control+/'); await wait(page, 1000); } catch (_) { }
    await screenshot(page, '14_modal_keyboard_shortcuts');
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════════
    // 14. SERVER SETTINGS (if accessible)
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 14. SERVER SETTINGS ═════════════════════════════');
    await goHome(page);
    if (serverCount > 0) {
        await serverBtns.first().click();
        await wait(page, 1500);

        // Look for server settings button
        const srvGear = page.locator('button[aria-label*="settings" i], button[aria-label*="ayar" i], button[aria-label*="Server Settings" i]').first();
        if (await srvGear.isVisible({ timeout: 2000 }).catch(() => false)) {
            await srvGear.click();
            await wait(page, 1500);
            await screenshot(page, '15_server_settings');

            // Click tabs
            const ssTabs = page.locator('[class*="modal"] [role="button"], [class*="Modal"] [role="button"], [class*="modal"] button, [role="dialog"] button');
            const ssCount = await ssTabs.count().catch(() => 0);
            const clickedSS = new Set();
            for (let s = 0; s < Math.min(ssCount, 15); s++) {
                try {
                    const tb = ssTabs.nth(s);
                    if (!(await tb.isVisible({ timeout: 400 }))) continue;
                    const t = (await tb.textContent()).trim();
                    if (!t || clickedSS.has(t) || t === '✕' || t === '×' || t.length > 30 ||
                        t.includes('Delete') || t.includes('Sil')) continue;
                    clickedSS.add(t);
                    await tb.click();
                    await wait(page, 800);
                    await screenshot(page, `15_server_settings_${slug(t)}`);
                } catch (_) { }
            }
            await closeAll(page);
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 15. ENGLISH LEARN / CRYPTO SIGNALS
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 15. ENGLISH LEARN & CRYPTO ══════════════════════');
    await goHome(page);
    if (await tryClick(page, '[aria-label*="English" i], button:has-text("English Learn"), button:has-text("İngilizce")')) {
        await screenshot(page, '16_english_learn');
        await closeAll(page);
    }

    await goHome(page);
    if (await tryClick(page, '[aria-label*="Crypto Signals" i], button:has-text("Crypto Signals"), button:has-text("Kripto Sinyalleri")')) {
        await screenshot(page, '16_crypto_signals');
        await closeAll(page);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 16. FORUM PAGES (if accessible via navigation)
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 16. FORUMS ══════════════════════════════════════');
    await goHome(page);
    if (await tryClick(page, '[aria-label*="Forum" i], button:has-text("Forum")')) {
        await screenshot(page, '17_forum_main');
        // Click forum categories/posts
        try {
            const forumItems = page.locator('[class*="forum-post"], [class*="ForumPost"], [class*="thread"]');
            if (await forumItems.count() > 0) {
                await forumItems.first().click();
                await wait(page, 1500);
                await screenshot(page, '17_forum_post');
            }
        } catch (_) { }
        await closeAll(page);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 17. COIN STORE
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 17. COIN STORE ═════════════════════════════════');
    await goHome(page);
    if (await tryClick(page, 'button:has-text("Coin"), [aria-label*="Coin" i], [aria-label*="coin" i]')) {
        await screenshot(page, '18_coin_store');
        await closeAll(page);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 18. SUPPORT / ABOUT / MISC
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 18. MISC ═══════════════════════════════════════');
    await goHome(page);
    if (await tryClick(page, '[aria-label*="support" i], [aria-label*="destek" i]')) {
        await screenshot(page, '19_support_modal');
        await closeAll(page);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // FINAL HOME
    // ═══════════════════════════════════════════════════════════════════════
    await goHome(page);
    await screenshot(page, '99_final_home');

    await browser.close();

    // ═══════════════════════════════════════════════════════════════════════
    // GENERATE REPORTS
    // ═══════════════════════════════════════════════════════════════════════
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

    // JSON report
    const jsonReport = {
        date: new Date().toISOString(),
        elapsed: `${elapsed}s`,
        totalScreenshots: report.length,
        screensWithErrors: report.filter(r => r.errors.length + r.apiErrors.length > 0).length,
        screensWithEnglish: report.filter(r => r.englishTexts.length > 0).length,
        allConsoleErrors: [...new Set(allConsoleErrors)],
        allApiErrors: [...new Set(allApiErrors)],
        screenshots: report,
    };
    fs.writeFileSync(path.join(SHOTS_DIR, 'audit_report_v3.json'), JSON.stringify(jsonReport, null, 2));

    // Summary
    console.log('\n\n══════════════════════════════════════════════════');
    console.log(`  AUDIT COMPLETE — ${elapsed}s`);
    console.log(`  Screenshots: ${report.length}`);
    console.log(`  With errors: ${jsonReport.screensWithErrors} (${(jsonReport.screensWithErrors / report.length * 100).toFixed(0)}%)`);
    console.log(`  With English text: ${jsonReport.screensWithEnglish}`);
    console.log(`  Console errors: ${allConsoleErrors.length}`);
    console.log(`  API errors: ${allApiErrors.length}`);
    console.log('══════════════════════════════════════════════════');

    // Print unique API errors
    if (allApiErrors.length > 0) {
        console.log('\n  Unique API Errors:');
        [...new Set(allApiErrors)].forEach(e => console.log(`    ❌ ${e}`));
    }

    // Print unique console errors
    if (allConsoleErrors.length > 0) {
        console.log('\n  Unique Console Errors (first 20):');
        [...new Set(allConsoleErrors)].slice(0, 20).forEach(e => console.log(`    🔴 ${e}`));
    }

    // Print English text detections
    const allEnglish = report.flatMap(r => r.englishTexts.map(e => ({ ...e, screenshot: r.label })));
    if (allEnglish.length > 0) {
        console.log('\n  English Text Detected (i18n issues):');
        const unique = [...new Map(allEnglish.map(e => [e.text, e])).values()];
        unique.slice(0, 30).forEach(e => console.log(`    🟡 "${e.text}" [${e.screenshot}]`));
    }

    // HTML report
    const thumbs = report.map(r => {
        const hasErr = r.errors.length + r.apiErrors.length > 0;
        const hasEng = r.englishTexts.length > 0;
        const cls = hasErr ? 'has-error' : hasEng ? 'has-warning' : '';
        const errHtml = [
            ...r.errors.map(e => `<div class="err console">🔴 ${escHtml(e)}</div>`),
            ...r.apiErrors.map(e => `<div class="err api">🟠 API ${escHtml(e)}</div>`),
            ...r.englishTexts.map(e => `<div class="err eng">🟡 EN: "${escHtml(e.text)}" &lt;${e.element}&gt;</div>`),
        ].join('');
        return `
    <div class="card ${cls}">
      <a href="${encodeURIComponent(r.file)}" target="_blank">
        <img src="${encodeURIComponent(r.file)}" alt="${escHtml(r.label)}" loading="lazy" />
      </a>
      <div class="label">${r.idx}. ${escHtml(r.label)}</div>
      ${errHtml ? `<div class="errors">${errHtml}</div>` : ''}
    </div>`;
    }).join('');

    const html = `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pawscord Visual Audit v3 — ${new Date().toISOString().slice(0, 10)}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #1a1a2e; color: #e0e0e0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
  h1 { padding: 20px; background: #16213e; font-size: 1.4rem; }
  .summary { display: flex; gap: 16px; padding: 16px 20px; background: #0f3460; flex-wrap: wrap; }
  .stat { background: #1a1a2e; padding: 10px 18px; border-radius: 8px; text-align: center; }
  .stat .n { font-size: 2rem; font-weight: bold; }
  .stat .l { font-size: 0.85rem; opacity: 0.7; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(440px, 1fr)); gap: 16px; padding: 20px; }
  .card { background: #16213e; border-radius: 8px; overflow: hidden; border: 2px solid transparent; }
  .card.has-error { border-color: #e74c3c; }
  .card.has-warning { border-color: #f39c12; }
  .card img { width: 100%; display: block; cursor: pointer; }
  .label { padding: 8px 12px; font-size: 0.9rem; font-weight: 500; }
  .errors { padding: 4px 12px 8px; }
  .err { font-size: 0.75rem; padding: 2px 0; word-break: break-all; }
  .err.console { color: #e74c3c; }
  .err.api { color: #e67e22; }
  .err.eng { color: #f1c40f; }
</style>
</head>
<body>
<h1>🐾 Pawscord Visual Audit v3 — ${new Date().toISOString().slice(0, 10)}</h1>
<div class="summary">
  <div class="stat"><div class="n">${report.length}</div><div class="l">Screenshots</div></div>
  <div class="stat"><div class="n" style="color:#2ecc71">${report.length - jsonReport.screensWithErrors}</div><div class="l">Clean</div></div>
  <div class="stat"><div class="n" style="color:#e74c3c">${jsonReport.screensWithErrors}</div><div class="l">Errors</div></div>
  <div class="stat"><div class="n" style="color:#f1c40f">${jsonReport.screensWithEnglish}</div><div class="l">English Text</div></div>
  <div class="stat"><div class="n">${[...new Set(allApiErrors)].length}</div><div class="l">API Errors</div></div>
  <div class="stat"><div class="n">${elapsed}s</div><div class="l">Duration</div></div>
</div>
<div class="grid">${thumbs}</div>
</body>
</html>`;

    fs.writeFileSync(path.join(__dirname, 'audit_report_v3.html'), html);
    console.log(`\n  📄 HTML report: audit_report_v3.html`);
    console.log(`  📂 Screenshots: ${SHOTS_DIR}/`);
    console.log(`  📊 JSON report: ${SHOTS_DIR}/audit_report_v3.json`);
})();
