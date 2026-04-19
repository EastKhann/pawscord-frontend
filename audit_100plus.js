/**
 * PAWSCORD Full Visual Audit — 100+ Screenshots
 * 2026-04-16
 *
 * KEY FIX: Avoids CSS-class selectors (Vite hashes them).
 * Uses: text selectors, DOM structure queries, img tags, aria-labels, roles.
 *
 * Run:  cd frontend && node audit_100plus.js
 * Output: ../audit_screenshots_v2/  (100+ PNGs + JSON + HTML report)
 */
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// ── Config ───────────────────────────────────────────────────────────────────
const BASE_URL = 'https://www.pawscord.com';
const API_URL = 'https://api.pawscord.com';
const USERNAME = 'YANHESAP';
const PASSWORD = 'YANHESAP';
const SHOTS_DIR = path.resolve(__dirname, '..', 'audit_screenshots_v2');

// ── Setup output dir ─────────────────────────────────────────────────────────
if (fs.existsSync(SHOTS_DIR)) {
    fs.readdirSync(SHOTS_DIR).forEach(f => {
        if (f.endsWith('.png') || f.endsWith('.json') || f.endsWith('.html'))
            fs.unlinkSync(path.join(SHOTS_DIR, f));
    });
} else {
    fs.mkdirSync(SHOTS_DIR, { recursive: true });
}

// ── State ────────────────────────────────────────────────────────────────────
const report = [];
let shotIdx = 0;
const allConsoleErrors = [];
const allApiErrors = [];
let screenErrors = [];
let screenApiErrors = [];

// English text detection patterns (i18n problems)
const EN_PATTERNS = [
    'Settings', 'Profile', 'Friends', 'Home', 'Server', 'Channel',
    'Message', 'Search', 'Edit', 'Delete', 'Cancel', 'Save', 'Close',
    'Submit', 'Upload', 'Download', 'Create', 'Join', 'Leave',
    'Online', 'Offline', 'Idle', 'Typing', 'Loading', 'Retry',
    'Try Again', 'Something went wrong', 'Sign Out', 'Log Out',
    'Password', 'Username', 'Email', 'Confirm', 'Notifications',
    'Appearance', 'Voice', 'Video', 'Privacy', 'Security', 'Advanced',
    'Language', 'Activity', 'Status', 'Connections', 'Sessions',
    'Premium', 'Store', 'Boost', 'Members', 'Admin', 'Moderator',
    'Owner', 'Role', 'Permissions', 'Invite', 'Copy', 'Paste',
    'Reply', 'Thread', 'React', 'Dashboard', 'Overview',
    'Block', 'Unblock', 'Add Friend', 'Pending', 'Accept', 'Decline',
];

function slug(name) {
    return name.replace(/[^a-zA-Z0-9_\-]/g, '_').replace(/_+/g, '_').slice(0, 60);
}

async function ss(page, label) {
    shotIdx++;
    const idx = String(shotIdx).padStart(3, '0');
    const file = `${idx}_${slug(label)}.png`;
    try {
        await page.screenshot({ path: path.join(SHOTS_DIR, file), fullPage: false });
    } catch (e) {
        console.log(`  ⚠ Screenshot failed: ${e.message.slice(0, 60)}`);
    }

    // DOM errors
    let domErrors = [];
    try {
        domErrors = await page.evaluate(() => {
            const found = [];
            for (const el of document.querySelectorAll('div, span, p, h1, h2, h3')) {
                const t = (el.textContent || '').trim();
                if (t.length > 300 || t.length < 5) continue;
                if (/failed to load|is not defined|Something went wrong|Bir hata oluştu|Tekrar Dene|Try Again/i.test(t) && t.length < 200) {
                    found.push(t.slice(0, 150));
                }
            }
            return [...new Set(found)];
        });
        domErrors.forEach(t => screenErrors.push(`DOM: ${t}`));
    } catch (_) { }

    // English text
    let englishTexts = [];
    try {
        englishTexts = await page.evaluate((pats) => {
            const found = [];
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
            while (walker.nextNode()) {
                const text = walker.currentNode.textContent.trim();
                if (!text || text.length < 3 || text.length > 200) continue;
                const parent = walker.currentNode.parentElement;
                if (!parent || ['SCRIPT', 'STYLE', 'CODE', 'PRE'].includes(parent.tagName)) continue;
                const style = window.getComputedStyle(parent);
                if (style.display === 'none' || style.visibility === 'hidden') continue;
                for (const p of pats) {
                    if (new RegExp('\\b' + p + '\\b', 'i').test(text)) {
                        found.push(text.slice(0, 100));
                        break;
                    }
                }
            }
            return [...new Set(found)].slice(0, 20);
        }, EN_PATTERNS);
    } catch (_) { }

    const entry = {
        idx: shotIdx, label, file,
        errors: [...screenErrors],
        apiErrors: [...screenApiErrors],
        englishTexts,
        domErrors,
    };
    report.push(entry);
    screenErrors = [];
    screenApiErrors = [];

    const errCount = entry.errors.length + entry.apiErrors.length;
    const engCount = englishTexts.length;
    const icon = errCount > 0 ? '🔴' : engCount > 0 ? '🟡' : '🟢';
    console.log(`${icon} [${idx}] ${label}${errCount ? ` (${errCount} err)` : ''}${engCount ? ` (${engCount} EN)` : ''}`);
    return entry;
}

async function w(page, ms = 800) { await page.waitForTimeout(ms); }

/** Click by multiple selector strategies, returns true if clicked */
async function click(page, selectors, opts = {}) {
    const timeout = opts.timeout || 3000;
    const waitAfter = opts.wait || 800;
    const sels = Array.isArray(selectors) ? selectors : [selectors];
    for (const sel of sels) {
        try {
            const el = page.locator(sel).first();
            if (await el.isVisible({ timeout: Math.min(timeout, 2000) })) {
                await el.click({ timeout });
                await w(page, waitAfter);
                return true;
            }
        } catch (_) { }
    }
    return false;
}

/** Use evaluate to find and click elements by inner text */
async function clickByText(page, text, opts = {}) {
    const waitAfter = opts.wait || 800;
    const tag = opts.tag || '*';
    try {
        const clicked = await page.evaluate(({ text, tag }) => {
            const els = document.querySelectorAll(tag);
            for (const el of els) {
                if (el.offsetParent === null) continue; // hidden
                const t = el.textContent.trim();
                if (t === text || t.startsWith(text)) {
                    el.click();
                    return true;
                }
            }
            return false;
        }, { text, tag });
        if (clicked) { await w(page, waitAfter); return true; }
    } catch (_) { }
    return false;
}

/** Press Escape several times + click corners to close overlays */
async function closeAll(page) {
    for (let i = 0; i < 6; i++) {
        await page.keyboard.press('Escape');
        await w(page, 150);
    }
    try { await page.mouse.click(5, 5); await w(page, 150); } catch (_) { }
    // Click any visible close buttons
    for (const sel of [
        'button[aria-label="Close"]', 'button[aria-label="Kapat"]',
        'button:has-text("İptal")', 'button:has-text("Cancel")',
        'button:has-text("✕")', 'button:has-text("×")',
    ]) {
        try {
            const el = page.locator(sel).first();
            if (await el.isVisible({ timeout: 300 })) await el.click();
        } catch (_) { }
    }
    await w(page, 300);
}

/** Navigate home — click the home/pawscord logo or reload */
async function goHome(page) {
    await closeAll(page);
    // Try clicking the pawscord logo / home icon in sidebar
    const homeClicked = await click(page, [
        'img[alt*="Pawscord" i]',
        '[aria-label="Home"]',
        '[aria-label="Ana Sayfa"]',
    ], { timeout: 2000, wait: 1000 });
    if (!homeClicked) {
        try {
            await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 20000 });
            await w(page, 3000);
        } catch (_) { }
    }
}

/** Get all server img elements in the left sidebar (narrow ~64px bar) */
async function getServerIcons(page) {
    return page.evaluate(() => {
        // The server list is the leftmost narrow bar. Find img elements that look like server icons.
        const imgs = document.querySelectorAll('img');
        const results = [];
        for (const img of imgs) {
            const rect = img.getBoundingClientRect();
            // Server icons are within the first ~80px from left, sized ~40-50px
            if (rect.left < 80 && rect.width >= 30 && rect.width <= 64 && rect.height >= 30 && rect.height <= 64) {
                // Skip the very top logo icon (usually first img)
                if (rect.top < 60) continue;
                results.push({
                    src: img.src,
                    alt: img.alt || '',
                    title: img.title || '',
                    top: rect.top,
                    idx: results.length,
                });
            }
        }
        return results;
    });
}

/** Click a server icon by its index (among the left-sidebar img elements) */
async function clickServerIcon(page, index) {
    return page.evaluate((idx) => {
        const imgs = document.querySelectorAll('img');
        const servers = [];
        for (const img of imgs) {
            const rect = img.getBoundingClientRect();
            if (rect.left < 80 && rect.width >= 30 && rect.width <= 64 && rect.height >= 30 && rect.height <= 64) {
                if (rect.top < 60) continue;
                servers.push(img);
            }
        }
        if (servers[idx]) { servers[idx].click(); return true; }
        return false;
    }, index);
}

/** Get channel names visible in the second column */
async function getChannelNames(page) {
    return page.evaluate(() => {
        // Channels are in the second column (~70px to ~280px from left)
        const results = [];
        const seen = new Set();
        // Look for elements that contain # (text channels) or 🔊 (voice)
        const allEls = document.querySelectorAll('div, span, a, button');
        for (const el of allEls) {
            const rect = el.getBoundingClientRect();
            if (rect.left < 60 || rect.left > 300) continue;
            if (rect.width < 50 || rect.height < 15 || rect.height > 50) continue;
            const text = el.textContent.trim();
            if (!text || text.length > 40 || text.length < 2) continue;
            if (seen.has(text)) continue;
            // Check if this looks like a clickable channel item
            const isClickable = el.tagName === 'BUTTON' || el.tagName === 'A' ||
                el.getAttribute('role') === 'button' || el.style.cursor === 'pointer' ||
                window.getComputedStyle(el).cursor === 'pointer';
            if (!isClickable) continue;
            seen.add(text);
            results.push({
                text,
                top: rect.top,
                isVoice: text.includes('🔊') || text.toLowerCase().includes('voice') || text.toLowerCase().includes('ses'),
            });
        }
        return results.sort((a, b) => a.top - b.top);
    });
}

/** Click a channel by its text content */
async function clickChannel(page, channelText) {
    return page.evaluate((text) => {
        const allEls = document.querySelectorAll('div, span, a, button');
        for (const el of allEls) {
            const rect = el.getBoundingClientRect();
            if (rect.left < 60 || rect.left > 300) continue;
            if (el.textContent.trim() === text || el.textContent.trim().includes(text)) {
                el.click();
                return true;
            }
        }
        return false;
    }, channelText);
}

/** Scroll an element's content container down */
async function scrollDown(page, selector) {
    try {
        await page.evaluate((sel) => {
            const el = sel ? document.querySelector(sel) : null;
            if (el) el.scrollTop = el.scrollHeight;
            else window.scrollTo(0, document.body.scrollHeight);
        }, selector);
        await w(page, 400);
    } catch (_) { }
}

/** Find all interactive emoji buttons in sidebar */
async function getEmojiButtons(page) {
    return page.evaluate(() => {
        const emojis = ['💰', '🛒', '🎁', '📊', '📥', '📢', '🎮', '📂', '🎨'];
        const results = [];
        const buttons = document.querySelectorAll('button, [role="button"], div[tabindex]');
        for (const btn of buttons) {
            const text = btn.textContent.trim();
            for (const emoji of emojis) {
                if (text.includes(emoji)) {
                    results.push({ emoji, text: text.slice(0, 50), found: true });
                    break;
                }
            }
        }
        return results;
    });
}

// ──────────────────────────────────────────────────────────────────────────────
// MAIN
// ──────────────────────────────────────────────────────────────────────────────
(async () => {
    const startTime = Date.now();
    console.log('🐾 PAWSCORD Full Audit — 100+ Screenshots');
    console.log('═'.repeat(60));

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

    // ── Console & API error tracking ─────────────────────────────────────────
    page.on('console', msg => {
        if (msg.type() === 'error') {
            const txt = msg.text().slice(0, 250);
            if (/favicon|sw\.js|service.worker/i.test(txt)) return;
            screenErrors.push(txt);
            allConsoleErrors.push(txt);
        }
    });
    page.on('pageerror', err => {
        const txt = err.message.slice(0, 250);
        screenErrors.push('PAGE_ERR: ' + txt);
        allConsoleErrors.push(txt);
    });
    page.on('response', resp => {
        const status = resp.status();
        const url = resp.url();
        if (status >= 400 && url.includes('/api/')) {
            const entry = `${status} ${url.replace(/https?:\/\/[^/]+/, '')}`;
            if (!allApiErrors.includes(entry)) allApiErrors.push(entry);
            screenApiErrors.push(entry);
        }
    });

    // ═════════════════════════════════════════════════════════════════════════
    // SECTION 1: PRE-LOGIN
    // ═════════════════════════════════════════════════════════════════════════
    console.log('\n══ 1. PRE-LOGIN ═══════════════════════════════════');

    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await w(page, 3000);
    await ss(page, 'pre_01_login_page');

    // Attempt to screenshot splash/loading too
    await page.goto(BASE_URL, { waitUntil: 'commit', timeout: 15000 });
    await w(page, 500);
    await ss(page, 'pre_02_splash_loading');
    await w(page, 5000);

    // ═════════════════════════════════════════════════════════════════════════
    // SECTION 2: LOGIN VIA API
    // ═════════════════════════════════════════════════════════════════════════
    console.log('\n══ 2. LOGIN ═══════════════════════════════════════');

    // Login via API endpoint first
    let accessToken = null;
    try {
        const loginResp = await page.evaluate(async ({ apiUrl, username, password }) => {
            const resp = await fetch(`${apiUrl}/api/auth/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            return { status: resp.status, data: await resp.json() };
        }, { apiUrl: API_URL, username: USERNAME, password: PASSWORD });

        console.log(`  Login API status: ${loginResp.status}`);
        if (loginResp.data && loginResp.data.access) {
            accessToken = loginResp.data.access;
            console.log('  ✓ Got JWT access token');
        } else if (loginResp.data && loginResp.data.token) {
            accessToken = loginResp.data.token;
            console.log('  ✓ Got token');
        } else {
            console.log('  ⚠ Login response:', JSON.stringify(loginResp.data).slice(0, 200));
        }
    } catch (e) {
        console.log(`  ⚠ API login failed: ${e.message.slice(0, 100)}`);
    }

    // Set tokens in localStorage
    if (accessToken) {
        await page.evaluate(({ token }) => {
            localStorage.setItem('access_token', token);
            localStorage.setItem('token', token);
            localStorage.setItem('i18nextLng', 'tr');
        }, { token: accessToken });
        console.log('  ✓ Set localStorage tokens + i18nextLng=tr');
    } else {
        // Fallback: login via form
        console.log('  Falling back to form login...');
        await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await w(page, 3000);
        for (const sel of ['input[aria-label="Username"]', 'input[name="username"]', 'input[type="text"]']) {
            try { await page.fill(sel, USERNAME); break; } catch (_) { }
        }
        for (const sel of ['input[aria-label="Password"]', 'input[name="password"]', 'input[type="password"]']) {
            try { await page.fill(sel, PASSWORD); break; } catch (_) { }
        }
        await ss(page, 'login_02_form_filled');
        try { await page.click('button[type="submit"]'); } catch (_) { }
        await w(page, 8000);
    }

    // Reload to apply tokens
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await w(page, 5000);
    await ss(page, 'login_03_after_login');

    // Verify we're logged in by checking if we see the user's name
    const isLoggedIn = await page.evaluate((uname) => {
        return document.body.textContent.includes(uname);
    }, USERNAME);
    console.log(`  Logged in: ${isLoggedIn}`);

    // ═════════════════════════════════════════════════════════════════════════
    // SECTION 3: HOME PAGE
    // ═════════════════════════════════════════════════════════════════════════
    console.log('\n══ 3. HOME PAGE ═══════════════════════════════════');
    await goHome(page);
    await w(page, 1500);
    await ss(page, 'home_01_full');

    // Home page cards
    const homeCards = ['Arkadaşlar', 'Sunucular', 'Aktiviteler', 'Yapay Zeka'];
    for (const card of homeCards) {
        await goHome(page);
        await w(page, 500);
        const clicked = await click(page, [
            `text="${card}"`,
            `button:has-text("${card}")`,
            `div:has-text("${card}") >> nth=0`,
        ], { timeout: 2000, wait: 1200 });
        if (clicked) {
            await ss(page, `home_card_${slug(card)}`);
        }
        await closeAll(page);
    }

    // Scroll home page
    await goHome(page);
    await scrollDown(page, null);
    await ss(page, 'home_02_scrolled');

    // ═════════════════════════════════════════════════════════════════════════
    // SECTION 4: FRIENDS
    // ═════════════════════════════════════════════════════════════════════════
    console.log('\n══ 4. FRIENDS ═════════════════════════════════════');
    await goHome(page);

    // Find the friends icon/link
    const friendsClicked = await click(page, [
        'text="Arkadaşlar"',
        '[aria-label*="riend" i]',
        'button:has-text("Arkadaşlar")',
    ], { timeout: 3000, wait: 1500 });
    if (friendsClicked) {
        await ss(page, 'friends_01_main');

        // Sub-tabs
        const friendsTabs = ['Çevrimiçi', 'Tümü', 'Bekleyen', 'Engelli', 'Arkadaş Ekle'];
        for (const tab of friendsTabs) {
            if (await click(page, [
                `button:has-text("${tab}")`,
                `text="${tab}"`,
            ], { timeout: 1500, wait: 800 })) {
                await ss(page, `friends_${slug(tab)}`);
            }
        }
    } else {
        await ss(page, 'friends_NOT_FOUND');
    }

    // ═════════════════════════════════════════════════════════════════════════
    // SECTION 5: DM CONVERSATIONS
    // ═════════════════════════════════════════════════════════════════════════
    console.log('\n══ 5. DM CONVERSATIONS ════════════════════════════');
    await goHome(page);
    await w(page, 500);

    // Try clicking DM contacts by their names
    const dmNames = ['PawPaw', 'iyzico'];
    for (const name of dmNames) {
        await goHome(page);
        await w(page, 500);
        const dmClicked = await click(page, [
            `text="${name}"`,
            `div:has-text("${name}") >> nth=0`,
        ], { timeout: 3000, wait: 2000 });
        if (dmClicked) {
            await ss(page, `dm_${slug(name)}_chat`);

            // Try opening emoji picker
            if (await click(page, [
                'button[aria-label*="Emoji" i]',
                'button[aria-label*="emoji" i]',
            ], { timeout: 1500, wait: 800 })) {
                await ss(page, `dm_${slug(name)}_emoji`);
                await closeAll(page);
            }

            // Try GIF button
            if (await click(page, [
                'button[aria-label*="GIF" i]',
                'button:has-text("GIF")',
            ], { timeout: 1500, wait: 800 })) {
                await ss(page, `dm_${slug(name)}_gif`);
                await closeAll(page);
            }

            // Try sticker button
            if (await click(page, [
                'button[aria-label*="ticker" i]',
                'button[aria-label*="Sticker" i]',
            ], { timeout: 1500, wait: 800 })) {
                await ss(page, `dm_${slug(name)}_sticker`);
                await closeAll(page);
            }

            // Right-click on a message for context menu
            try {
                const msgs = await page.evaluate(() => {
                    const allDivs = document.querySelectorAll('div');
                    for (const d of allDivs) {
                        const rect = d.getBoundingClientRect();
                        // Message area is roughly in the center-right area, has reasonable height
                        if (rect.left > 250 && rect.width > 200 && rect.height > 20 && rect.height < 200) {
                            const text = d.textContent.trim();
                            if (text.length > 5 && text.length < 500) return { x: rect.x + 50, y: rect.y + 10 };
                        }
                    }
                    return null;
                });
                if (msgs) {
                    await page.mouse.click(msgs.x, msgs.y, { button: 'right' });
                    await w(page, 600);
                    await ss(page, `dm_${slug(name)}_context_menu`);
                    await closeAll(page);
                }
            } catch (_) { }

            // Hover over a message to see action buttons
            try {
                const msgPos = await page.evaluate(() => {
                    const allDivs = document.querySelectorAll('div');
                    for (const d of allDivs) {
                        const rect = d.getBoundingClientRect();
                        if (rect.left > 250 && rect.width > 200 && rect.height > 20 && rect.height < 200) {
                            const text = d.textContent.trim();
                            if (text.length > 5 && text.length < 500) return { x: rect.x + 50, y: rect.y + 10 };
                        }
                    }
                    return null;
                });
                if (msgPos) {
                    await page.mouse.move(msgPos.x, msgPos.y);
                    await w(page, 800);
                    await ss(page, `dm_${slug(name)}_hover_actions`);
                }
            } catch (_) { }
        }
    }

    // ═════════════════════════════════════════════════════════════════════════
    // SECTION 6: SERVERS & CHANNELS
    // ═════════════════════════════════════════════════════════════════════════
    console.log('\n══ 6. SERVERS & CHANNELS ══════════════════════════');
    await goHome(page);
    await w(page, 1000);

    const servers = await getServerIcons(page);
    console.log(`  Found ${servers.length} server icons`);

    for (let si = 0; si < servers.length; si++) {
        const srv = servers[si];
        console.log(`  → Server ${si}: ${srv.alt || srv.src.split('/').pop().slice(0, 30)}`);

        await goHome(page);
        await w(page, 500);
        const clicked = await clickServerIcon(page, si);
        if (!clicked) { console.log(`    ⚠ Could not click server ${si}`); continue; }
        await w(page, 2000);
        await ss(page, `server_${si}_overview`);

        // Get channel list
        const channels = await getChannelNames(page);
        console.log(`    Channels: ${channels.length} — ${channels.map(c => c.text).join(', ')}`);

        for (let ci = 0; ci < Math.min(channels.length, 10); ci++) {
            const ch = channels[ci];
            if (ch.isVoice) continue; // Don't join voice channels
            try {
                // Re-click server first to ensure we're on it
                await clickServerIcon(page, si);
                await w(page, 1000);

                const chClicked = await clickChannel(page, ch.text);
                if (!chClicked) continue;
                await w(page, 1500);
                await ss(page, `server_${si}_ch_${ci}_${slug(ch.text)}`);
            } catch (_) { }
        }

        // Screenshot voice channels section (without joining)
        const voiceChannels = channels.filter(c => c.isVoice);
        if (voiceChannels.length > 0) {
            await ss(page, `server_${si}_voice_channels`);
        }

        // Check for member list on right side
        try {
            const hasMembers = await page.evaluate(() => {
                const allEls = document.querySelectorAll('div');
                for (const el of allEls) {
                    const rect = el.getBoundingClientRect();
                    // Member list is on the far right
                    if (rect.left > 1100 && rect.width > 150 && rect.height > 200) {
                        return true;
                    }
                }
                return false;
            });
            if (hasMembers) {
                await ss(page, `server_${si}_member_list`);
            }
        } catch (_) { }
    }

    // ═════════════════════════════════════════════════════════════════════════
    // SECTION 7: SETTINGS PANEL — ALL 11 TABS
    // ═════════════════════════════════════════════════════════════════════════
    console.log('\n══ 7. SETTINGS ════════════════════════════════════');
    await goHome(page);
    await w(page, 500);

    // Find the gear icon near the username at the bottom
    let settingsOpened = false;
    // Try aria-label approaches
    settingsOpened = await click(page, [
        'button[aria-label="Settings"]',
        'button[aria-label="Ayarlar"]',
        'button[aria-label="User Settings"]',
    ], { timeout: 3000, wait: 1500 });

    if (!settingsOpened) {
        // Try finding the gear icon near YANHESAP text at the bottom of the sidebar
        settingsOpened = await page.evaluate(() => {
            const buttons = document.querySelectorAll('button, [role="button"]');
            for (const btn of buttons) {
                const rect = btn.getBoundingClientRect();
                // Settings gear is at bottom-left area, near the username
                if (rect.bottom > 800 && rect.left < 300 && rect.width < 50 && rect.height < 50) {
                    // Check if it's near YANHESAP text or has SVG gear icon
                    const svg = btn.querySelector('svg');
                    if (svg) {
                        btn.click();
                        return true;
                    }
                }
            }
            return false;
        });
        if (settingsOpened) await w(page, 1500);
    }

    console.log(`  Settings opened: ${settingsOpened}`);

    if (settingsOpened) {
        await ss(page, 'settings_00_opened');

        const settingsTabs = [
            { tr: 'Hesabım', en: 'My Account' },
            { tr: 'Gizlilik ve Güvenlik', en: 'Privacy & Security' },
            { tr: 'Bağlantılar', en: 'Connections' },
            { tr: 'Görünüm', en: 'Appearance' },
            { tr: 'Ses ve Video', en: 'Voice & Video' },
            { tr: 'Bildirimler', en: 'Notifications' },
            { tr: 'Klavye Kısayolları', en: 'Keyboard Shortcuts' },
            { tr: 'Dil', en: 'Language' },
            { tr: 'Aktivite Durumu', en: 'Activity Status' },
            { tr: 'Oturumlar', en: 'Sessions' },
            { tr: 'Gelişmiş', en: 'Advanced' },
        ];

        for (let i = 0; i < settingsTabs.length; i++) {
            const tab = settingsTabs[i];
            // Try Turkish first, then English
            let tabClicked = await click(page, [
                `text="${tab.tr}"`,
                `button:has-text("${tab.tr}")`,
                `text="${tab.en}"`,
                `button:has-text("${tab.en}")`,
            ], { timeout: 2000, wait: 1000 });

            if (!tabClicked) {
                // Try via evaluate — look for text nodes in the settings sidebar
                tabClicked = await page.evaluate(({ tr, en }) => {
                    const els = document.querySelectorAll('button, li, a, [role="button"], [role="tab"], div');
                    for (const el of els) {
                        const text = el.textContent.trim();
                        if (text === tr || text === en) {
                            el.click();
                            return true;
                        }
                    }
                    return false;
                }, tab);
                if (tabClicked) await w(page, 1000);
            }

            if (tabClicked) {
                await ss(page, `settings_${String(i + 1).padStart(2, '0')}_${slug(tab.tr)}`);

                // Scroll down to see full content
                try {
                    await page.evaluate(() => {
                        // Find the main content area of settings
                        const containers = document.querySelectorAll('main, [role="main"], div');
                        for (const c of containers) {
                            const rect = c.getBoundingClientRect();
                            if (rect.left > 200 && rect.width > 400 && rect.height > 400 &&
                                c.scrollHeight > c.clientHeight) {
                                c.scrollTop = c.scrollHeight;
                                return;
                            }
                        }
                    });
                    await w(page, 500);
                    await ss(page, `settings_${String(i + 1).padStart(2, '0')}_${slug(tab.tr)}_scrolled`);
                } catch (_) { }
            } else {
                console.log(`    ⚠ Setting tab "${tab.tr}" not found`);
            }
        }

        await closeAll(page);
    }

    // ═════════════════════════════════════════════════════════════════════════
    // SECTION 8: SIDEBAR EMOJI BUTTONS / MODALS
    // ═════════════════════════════════════════════════════════════════════════
    console.log('\n══ 8. SIDEBAR EMOJI BUTTONS ═══════════════════════');
    await goHome(page);
    await w(page, 500);

    const emojiModals = [
        { emoji: '💰', name: 'payment_center', subTabs: ['Satın Al', 'Buy', 'Transfer', 'Geçmiş', 'History'] },
        { emoji: '🛒', name: 'store', subTabs: ['Tema', 'Theme', 'Avatar', 'Çerçeve', 'Frame', 'Rozet', 'Badge'] },
        { emoji: '🎁', name: 'daily_rewards', subTabs: [] },
        { emoji: '📊', name: 'leaderboard', subTabs: ['Liderlik', 'Sunucu', 'Haftalık', 'Weekly'] },
        { emoji: '📥', name: 'export_jobs', subTabs: [] },
        { emoji: '📢', name: 'announcements', subTabs: [] },
        { emoji: '🎮', name: 'mini_games', subTabs: ['Tümü', 'All', 'Popüler', 'Popular'] },
        { emoji: '📂', name: 'file_manager', subTabs: [] },
        { emoji: '🎨', name: 'avatar_studio', subTabs: ['Özelleştir', 'Customize', 'Hazır', 'Presets'] },
    ];

    for (const modal of emojiModals) {
        await goHome(page);
        await w(page, 300);

        // Click the emoji button — they're in the sidebar
        const emojiClicked = await page.evaluate((emoji) => {
            const buttons = document.querySelectorAll('button, [role="button"], div[tabindex]');
            for (const btn of buttons) {
                if (btn.textContent.includes(emoji)) {
                    btn.click();
                    return true;
                }
            }
            return false;
        }, modal.emoji);

        if (emojiClicked) {
            await w(page, 1500);
            await ss(page, `modal_${modal.name}`);

            // Click sub-tabs
            for (const sub of modal.subTabs) {
                const subClicked = await click(page, [
                    `button:has-text("${sub}")`,
                    `text="${sub}"`,
                ], { timeout: 1500, wait: 800 });
                if (subClicked) {
                    await ss(page, `modal_${modal.name}_${slug(sub)}`);
                }
            }

            // Scroll modal content
            try {
                await page.evaluate(() => {
                    const modals = document.querySelectorAll('[role="dialog"], [class*="modal" i]');
                    for (const m of modals) {
                        if (m.scrollHeight > m.clientHeight) {
                            m.scrollTop = m.scrollHeight;
                            return;
                        }
                    }
                    // Try the largest visible container
                    const containers = document.querySelectorAll('div');
                    let best = null;
                    let bestArea = 0;
                    for (const c of containers) {
                        const rect = c.getBoundingClientRect();
                        const area = rect.width * rect.height;
                        if (area > bestArea && c.scrollHeight > c.clientHeight + 100 && rect.width > 300) {
                            best = c;
                            bestArea = area;
                        }
                    }
                    if (best) best.scrollTop = best.scrollHeight;
                });
                await w(page, 400);
                await ss(page, `modal_${modal.name}_scrolled`);
            } catch (_) { }

            await closeAll(page);
        } else {
            console.log(`  ⚠ Emoji button "${modal.emoji}" (${modal.name}) not found`);
        }
    }

    // ═════════════════════════════════════════════════════════════════════════
    // SECTION 9: ADMIN PANEL — ALL TABS
    // ═════════════════════════════════════════════════════════════════════════
    console.log('\n══ 9. ADMIN PANEL ═════════════════════════════════');
    await goHome(page);
    await w(page, 500);

    // Try to find and click Admin Panel button by text
    let adminOpened = await click(page, [
        'button:has-text("Yönetici Paneli")',
        'text="Yönetici Paneli"',
        'button:has-text("Admin Panel")',
        'button[aria-label="Open Admin Panel"]',
    ], { timeout: 4000, wait: 2500 });

    if (!adminOpened) {
        // Scroll sidebar to bottom to reveal admin button
        await page.evaluate(() => {
            const containers = document.querySelectorAll('div, nav, aside');
            for (const c of containers) {
                const rect = c.getBoundingClientRect();
                if (rect.left < 300 && rect.height > 400 && c.scrollHeight > c.clientHeight) {
                    c.scrollTop = c.scrollHeight;
                }
            }
        });
        await w(page, 500);
        adminOpened = await click(page, [
            'button:has-text("Yönetici Paneli")',
            'text="Yönetici Paneli"',
            'button:has-text("Admin Panel")',
            'button[aria-label="Open Admin Panel"]',
        ], { timeout: 3000, wait: 2500 });
    }

    if (!adminOpened) {
        // Last resort: find by evaluate
        adminOpened = await page.evaluate(() => {
            const all = document.querySelectorAll('button, [role="button"], div, span, a');
            for (const el of all) {
                const t = el.textContent.trim();
                if (t === 'Yönetici Paneli' || t === 'Admin Panel' || t.includes('Yönetici')) {
                    el.click();
                    return true;
                }
            }
            return false;
        });
        if (adminOpened) await w(page, 2500);
    }

    console.log(`  Admin panel opened: ${adminOpened}`);

    if (adminOpened) {
        await ss(page, 'admin_00_dashboard');

        const adminTabs = [
            'Dashboard', 'Kullanıcılar', 'Users', 'Sunucular', 'Servers',
            'Moderasyon', 'Moderation', 'Loglar', 'Logs',
            'Veritabanı', 'Database', 'Sistem', 'System',
            'Güvenlik', 'Security', 'Yayın', 'Broadcast',
            'Araçlar', 'Tools', 'Hızlı İşlemler', 'Quick Actions',
            'Beyaz Liste', 'Whitelist', 'Özellik Erişimi', 'Feature Access',
            'Kripto Sinyalleri', 'Crypto Signals', 'Ziyaretçi Logları', 'Visitor Logs',
        ];
        const clickedAdminTabs = new Set();

        for (let i = 0; i < adminTabs.length; i++) {
            const tabName = adminTabs[i];
            if (clickedAdminTabs.has(tabName.toLowerCase())) continue;

            const tabClicked = await page.evaluate((name) => {
                // Look for buttons/tabs in the admin panel sidebar
                const els = document.querySelectorAll('button, [role="button"], [role="tab"], li, a, div');
                for (const el of els) {
                    const text = el.textContent.trim();
                    // Exact match or starts with
                    if (text === name || (text.startsWith(name) && text.length < name.length + 5)) {
                        const rect = el.getBoundingClientRect();
                        // Should be on the left side of the admin panel (sidebar)
                        if (rect.width > 0 && rect.height > 0 && rect.left < 600) {
                            el.click();
                            return text;
                        }
                    }
                }
                return null;
            }, tabName);

            if (tabClicked && !clickedAdminTabs.has(tabClicked.toLowerCase())) {
                clickedAdminTabs.add(tabClicked.toLowerCase());
                await w(page, 1500);
                await ss(page, `admin_${String(clickedAdminTabs.size).padStart(2, '0')}_${slug(tabClicked)}`);

                // Scroll content
                try {
                    await page.evaluate(() => {
                        const containers = document.querySelectorAll('div');
                        for (const c of containers) {
                            const rect = c.getBoundingClientRect();
                            if (rect.left > 200 && rect.width > 400 && c.scrollHeight > c.clientHeight + 50) {
                                c.scrollTop = c.scrollHeight;
                                return;
                            }
                        }
                    });
                    await w(page, 400);
                    await ss(page, `admin_${String(clickedAdminTabs.size).padStart(2, '0')}_${slug(tabClicked)}_bottom`);
                } catch (_) { }
            }
        }

        console.log(`  Admin tabs clicked: ${clickedAdminTabs.size}`);
    }
    await closeAll(page);

    // ═════════════════════════════════════════════════════════════════════════
    // SECTION 10: PREMIUM STORE
    // ═════════════════════════════════════════════════════════════════════════
    console.log('\n══ 10. PREMIUM STORE ══════════════════════════════');
    await goHome(page);

    const premiumClicked = await click(page, [
        '[aria-label="Premium Store"]',
        'button:has-text("Premium")',
        'text="Premium"',
    ], { timeout: 3000, wait: 1500 });

    if (premiumClicked) {
        await ss(page, 'premium_01_main');

        for (const tab of ['Premium', 'Mağaza', 'Store', 'Server Boost', 'Sunucu Boost']) {
            if (await click(page, [
                `button:has-text("${tab}")`,
                `text="${tab}"`,
            ], { timeout: 1500, wait: 800 })) {
                await ss(page, `premium_${slug(tab)}`);
            }
        }
    }
    await closeAll(page);

    // ═════════════════════════════════════════════════════════════════════════
    // SECTION 11: CRYPTO SIGNALS
    // ═════════════════════════════════════════════════════════════════════════
    console.log('\n══ 11. CRYPTO SIGNALS ═════════════════════════════');
    await goHome(page);

    const cryptoClicked = await click(page, [
        'text="Kripto Sinyalleri"',
        'text="Crypto Signals"',
        'button:has-text("Kripto")',
        'button:has-text("Crypto")',
        '[aria-label*="Crypto" i]',
        '[aria-label*="Kripto" i]',
    ], { timeout: 3000, wait: 2000 });

    if (cryptoClicked) {
        await ss(page, 'crypto_01_main');

        // Try sub-tabs
        const cryptoTabs = ['TUM_STRATEJILER', 'Tüm Stratejiler', 'ACIK_POZISYONLAR',
            'Açık Pozisyonlar', 'KAPALI_POZISYONLAR', 'Kapalı Pozisyonlar',
            'PERFORMANS', 'Performans'];
        for (const tab of cryptoTabs) {
            if (await click(page, [
                `button:has-text("${tab}")`,
                `text="${tab}"`,
            ], { timeout: 1000, wait: 800 })) {
                await ss(page, `crypto_${slug(tab)}`);
            }
        }
    }
    await closeAll(page);

    // ═════════════════════════════════════════════════════════════════════════
    // SECTION 12: ENGLISH LEARN / EDUCATION
    // ═════════════════════════════════════════════════════════════════════════
    console.log('\n══ 12. EDUCATION ══════════════════════════════════');
    await goHome(page);

    const eduClicked = await click(page, [
        'text="İngilizce Öğren"',
        'text="Learn English"',
        'button:has-text("İngilizce")',
        'button:has-text("English")',
        '[aria-label*="English" i]',
        '[aria-label*="İngilizce" i]',
    ], { timeout: 3000, wait: 2000 });

    if (eduClicked) {
        await ss(page, 'education_01_main');
        // Scroll
        await scrollDown(page, null);
        await ss(page, 'education_02_scrolled');
    }
    await closeAll(page);

    // ═════════════════════════════════════════════════════════════════════════
    // SECTION 13: DISCOVER SERVERS
    // ═════════════════════════════════════════════════════════════════════════
    console.log('\n══ 13. DISCOVER ═══════════════════════════════════');
    await goHome(page);

    if (await click(page, [
        '[aria-label="Discover Servers"]',
        'button:has-text("Keşfet")',
        'text="Keşfet"',
    ], { timeout: 3000, wait: 1500 })) {
        await ss(page, 'discover_01_main');
        await scrollDown(page, null);
        await ss(page, 'discover_02_scrolled');
    }
    await closeAll(page);

    // ═════════════════════════════════════════════════════════════════════════
    // SECTION 14: ADD SERVER
    // ═════════════════════════════════════════════════════════════════════════
    console.log('\n══ 14. ADD SERVER ═════════════════════════════════');
    await goHome(page);

    if (await click(page, [
        '[aria-label="Server add"]',
        '[aria-label="Sunucu Ekle"]',
        'button:has-text("+")',
    ], { timeout: 3000, wait: 1500 })) {
        await ss(page, 'add_server_01_menu');

        // Try "Create Server" and "Join Server" options
        if (await click(page, [
            'button:has-text("Sunucu Oluştur")',
            'button:has-text("Create Server")',
            'text="Sunucu Oluştur"',
        ], { timeout: 2000, wait: 800 })) {
            await ss(page, 'add_server_02_create');
        }
    }
    await closeAll(page);

    // ═════════════════════════════════════════════════════════════════════════
    // SECTION 15: USER PROFILE PANEL
    // ═════════════════════════════════════════════════════════════════════════
    console.log('\n══ 15. USER PROFILE PANEL ═════════════════════════');
    await goHome(page);
    await w(page, 500);

    // Click on the username at the bottom to open profile panel
    const profileOpened = await page.evaluate(() => {
        const els = document.querySelectorAll('div, span, button, [role="button"]');
        for (const el of els) {
            const text = el.textContent.trim();
            const rect = el.getBoundingClientRect();
            // Username is at bottom-left area
            if (text === 'YANHESAP' && rect.bottom > 750 && rect.left < 300) {
                el.click();
                return true;
            }
        }
        return false;
    });

    if (profileOpened) {
        await w(page, 1500);
        await ss(page, 'profile_01_panel');

        // Click profile sub-tabs
        const profileTabs = ['Hakkında', 'About', 'Aktivite', 'Activity', 'Arkadaşlar', 'Friends',
            'Sunucular', 'Servers', 'Rozetler', 'Badges'];
        for (const tab of profileTabs) {
            if (await click(page, [
                `button:has-text("${tab}")`,
                `text="${tab}"`,
            ], { timeout: 1000, wait: 800 })) {
                await ss(page, `profile_${slug(tab)}`);
            }
        }
    }
    await closeAll(page);

    // ═════════════════════════════════════════════════════════════════════════
    // SECTION 16: DOWNLOAD / SUPPORT MODALS
    // ═════════════════════════════════════════════════════════════════════════
    console.log('\n══ 16. MISC MODALS ════════════════════════════════');
    await goHome(page);

    // Download button
    if (await click(page, [
        'button:has-text("İndir")',
        'button:has-text("Download")',
        '[aria-label*="download" i]',
        '[aria-label*="İndir" i]',
    ], { timeout: 2000, wait: 1000 })) {
        await ss(page, 'misc_download_modal');
        await closeAll(page);
    }

    // Notification bell
    await goHome(page);
    if (await click(page, [
        '[aria-label*="Notification" i]',
        '[aria-label*="Bildirim" i]',
        'button:has-text("🔔")',
    ], { timeout: 2000, wait: 1000 })) {
        await ss(page, 'misc_notifications');
        await closeAll(page);
    }

    // Support developer
    await goHome(page);
    if (await click(page, [
        'button:has-text("Geliştiriciyi Destekle")',
        'button:has-text("Support Developer")',
        'text="Geliştiriciyi Destekle"',
    ], { timeout: 2000, wait: 1000 })) {
        await ss(page, 'misc_support_developer');
        await closeAll(page);
    }

    // ═════════════════════════════════════════════════════════════════════════
    // SECTION 17: CONTEXT MENUS
    // ═════════════════════════════════════════════════════════════════════════
    console.log('\n══ 17. CONTEXT MENUS ══════════════════════════════');

    // Right-click on a user in member list (go to a server first)
    if (servers.length > 0) {
        await goHome(page);
        await clickServerIcon(page, 0);
        await w(page, 2000);

        // Right-click on member list area (right side)
        try {
            const memberPos = await page.evaluate(() => {
                const els = document.querySelectorAll('div, span');
                for (const el of els) {
                    const rect = el.getBoundingClientRect();
                    if (rect.left > 1100 && rect.width > 50 && rect.height > 15 && rect.height < 40) {
                        const text = el.textContent.trim();
                        if (text.length > 2 && text.length < 30) {
                            return { x: rect.x + 20, y: rect.y + 10 };
                        }
                    }
                }
                return null;
            });
            if (memberPos) {
                await page.mouse.click(memberPos.x, memberPos.y, { button: 'right' });
                await w(page, 600);
                await ss(page, 'context_user_right_click');
                await closeAll(page);
            }
        } catch (_) { }

        // Right-click on a channel
        try {
            const chPos = await page.evaluate(() => {
                const els = document.querySelectorAll('div, span, button');
                for (const el of els) {
                    const rect = el.getBoundingClientRect();
                    if (rect.left > 60 && rect.left < 300 && rect.height > 15 && rect.height < 40) {
                        const text = el.textContent.trim();
                        if (text.length > 2 && text.length < 30 && !text.includes('YANHESAP')) {
                            return { x: rect.x + 30, y: rect.y + 10 };
                        }
                    }
                }
                return null;
            });
            if (chPos) {
                await page.mouse.click(chPos.x, chPos.y, { button: 'right' });
                await w(page, 600);
                await ss(page, 'context_channel_right_click');
                await closeAll(page);
            }
        } catch (_) { }
    }

    // User profile popup card (click on a user in chat)
    if (servers.length > 0) {
        await goHome(page);
        await clickServerIcon(page, 0);
        await w(page, 2000);

        // Click on first channel
        const channels2 = await getChannelNames(page);
        if (channels2.length > 0) {
            await clickChannel(page, channels2[0].text);
            await w(page, 1500);

            // Click on a username in messages
            try {
                const userPos = await page.evaluate(() => {
                    const els = document.querySelectorAll('span, div, strong, b');
                    for (const el of els) {
                        const rect = el.getBoundingClientRect();
                        if (rect.left > 250 && rect.left < 800 && rect.height > 10 && rect.height < 30) {
                            const text = el.textContent.trim();
                            // Username-like text near the top of messages
                            if (text.length > 2 && text.length < 25 && !text.includes(' ')) {
                                return { x: rect.x + 20, y: rect.y + 5 };
                            }
                        }
                    }
                    return null;
                });
                if (userPos) {
                    await page.mouse.click(userPos.x, userPos.y);
                    await w(page, 1000);
                    await ss(page, 'popup_user_profile_card');
                    await closeAll(page);
                }
            } catch (_) { }
        }
    }

    // ═════════════════════════════════════════════════════════════════════════
    // SECTION 18: RESPONSIVE VIEWS
    // ═════════════════════════════════════════════════════════════════════════
    console.log('\n══ 18. RESPONSIVE VIEWS ═══════════════════════════');

    // Mobile 375px
    await page.setViewportSize({ width: 375, height: 812 });
    await goHome(page);
    await w(page, 1500);
    await ss(page, 'responsive_mobile_375_home');

    // Navigate to a server in mobile view
    if (servers.length > 0) {
        await clickServerIcon(page, 0);
        await w(page, 1500);
        await ss(page, 'responsive_mobile_375_server');
    }

    // DM in mobile
    await goHome(page);
    if (await click(page, ['text="PawPaw"'], { timeout: 2000, wait: 1500 })) {
        await ss(page, 'responsive_mobile_375_dm');
    }

    // Tablet 768px
    await page.setViewportSize({ width: 768, height: 1024 });
    await goHome(page);
    await w(page, 1500);
    await ss(page, 'responsive_tablet_768_home');

    if (servers.length > 0) {
        await clickServerIcon(page, 0);
        await w(page, 1500);
        await ss(page, 'responsive_tablet_768_server');
    }

    // Reset to desktop
    await page.setViewportSize({ width: 1440, height: 900 });

    // ═════════════════════════════════════════════════════════════════════════
    // SECTION 19: ERROR & EDGE STATES
    // ═════════════════════════════════════════════════════════════════════════
    console.log('\n══ 19. ERROR & EDGE STATES ════════════════════════');

    // 404 page
    try {
        await page.goto(`${BASE_URL}/nonexistent-page-404-test`, { waitUntil: 'domcontentloaded', timeout: 15000 });
        await w(page, 2000);
        await ss(page, 'error_404_page');
    } catch (_) { }

    // Empty channel
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await w(page, 3000);

    // ═════════════════════════════════════════════════════════════════════════
    // SECTION 20: KEYBOARD SHORTCUTS
    // ═════════════════════════════════════════════════════════════════════════
    console.log('\n══ 20. KEYBOARD SHORTCUTS ═════════════════════════');
    await goHome(page);
    try {
        await page.keyboard.press('Control+/');
        await w(page, 1000);
        await ss(page, 'keyboard_shortcuts_modal');
    } catch (_) { }
    await closeAll(page);

    // ═════════════════════════════════════════════════════════════════════════
    // SECTION 21: SERVER SETTINGS (if we own a server)
    // ═════════════════════════════════════════════════════════════════════════
    console.log('\n══ 21. SERVER SETTINGS ════════════════════════════');
    await goHome(page);
    if (servers.length > 0) {
        await clickServerIcon(page, 0);
        await w(page, 2000);

        // Look for server settings gear
        const srvSettingsClicked = await click(page, [
            'button[aria-label*="Server Settings" i]',
            'button[aria-label*="Sunucu Ayarları" i]',
        ], { timeout: 2000, wait: 1500 });

        if (!srvSettingsClicked) {
            // Try right-clicking the server name to get context menu
            const srvNamePos = await page.evaluate(() => {
                const els = document.querySelectorAll('h1, h2, h3, span, div');
                for (const el of els) {
                    const rect = el.getBoundingClientRect();
                    if (rect.left > 60 && rect.left < 300 && rect.top < 80) {
                        const text = el.textContent.trim();
                        if (text.length > 2 && text.length < 40) {
                            return { x: rect.x + 20, y: rect.y + 10 };
                        }
                    }
                }
                return null;
            });
            if (srvNamePos) {
                await page.mouse.click(srvNamePos.x, srvNamePos.y);
                await w(page, 800);
                await ss(page, 'server_header_click');

                // Try clicking settings in dropdown
                if (await click(page, [
                    'button:has-text("Sunucu Ayarları")',
                    'button:has-text("Server Settings")',
                    'text="Sunucu Ayarları"',
                ], { timeout: 2000, wait: 1500 })) {
                    await ss(page, 'server_settings_01');

                    // Click through settings sub-tabs
                    const srvSettingsTabs = ['Genel Bakış', 'Overview', 'Roller', 'Roles',
                        'Emoji', 'Davetler', 'Invites', 'Yasaklamalar', 'Bans'];
                    for (const tab of srvSettingsTabs) {
                        if (await click(page, [
                            `button:has-text("${tab}")`,
                            `text="${tab}"`,
                        ], { timeout: 1000, wait: 800 })) {
                            await ss(page, `server_settings_${slug(tab)}`);
                        }
                    }
                }
                await closeAll(page);
            }
        }
    }

    // ═════════════════════════════════════════════════════════════════════════
    // SECTION 22: FORUM (if accessible)
    // ═════════════════════════════════════════════════════════════════════════
    console.log('\n══ 22. FORUM ══════════════════════════════════════');
    await goHome(page);
    if (await click(page, [
        'text="Forum"',
        'button:has-text("Forum")',
        '[aria-label*="Forum" i]',
    ], { timeout: 2000, wait: 1500 })) {
        await ss(page, 'forum_01_main');

        // Click a forum thread
        try {
            const threadClicked = await page.evaluate(() => {
                const els = document.querySelectorAll('div, a, button');
                for (const el of els) {
                    const rect = el.getBoundingClientRect();
                    if (rect.left > 200 && rect.width > 300 && rect.height > 40 && rect.height < 150) {
                        const cs = window.getComputedStyle(el);
                        if (cs.cursor === 'pointer') {
                            el.click();
                            return true;
                        }
                    }
                }
                return false;
            });
            if (threadClicked) {
                await w(page, 1500);
                await ss(page, 'forum_02_thread');
            }
        } catch (_) { }
    }
    await closeAll(page);

    // ═════════════════════════════════════════════════════════════════════════
    // FINAL
    // ═════════════════════════════════════════════════════════════════════════
    await goHome(page);
    await ss(page, 'final_home_state');

    await browser.close();

    // ═════════════════════════════════════════════════════════════════════════
    // GENERATE REPORTS
    // ═════════════════════════════════════════════════════════════════════════
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    const errScreens = report.filter(r => r.errors.length + r.apiErrors.length > 0).length;
    const engScreens = report.filter(r => r.englishTexts.length > 0).length;

    // JSON report
    const jsonReport = {
        date: new Date().toISOString(),
        elapsed: `${elapsed}s`,
        totalScreenshots: report.length,
        screensWithErrors: errScreens,
        screensWithEnglish: engScreens,
        allConsoleErrors: [...new Set(allConsoleErrors)],
        allApiErrors: [...new Set(allApiErrors)],
        screenshots: report,
    };
    fs.writeFileSync(path.join(SHOTS_DIR, 'audit_report.json'), JSON.stringify(jsonReport, null, 2));

    // HTML report
    function escHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

    const thumbs = report.map(r => {
        const hasErr = r.errors.length + r.apiErrors.length > 0;
        const hasEng = r.englishTexts.length > 0;
        const cls = hasErr ? 'has-error' : hasEng ? 'has-warning' : '';
        const errs = [
            ...r.errors.map(e => `<div class="err c">🔴 ${escHtml(e)}</div>`),
            ...r.apiErrors.map(e => `<div class="err a">🟠 ${escHtml(e)}</div>`),
            ...r.englishTexts.map(e => `<div class="err e">🟡 EN: ${escHtml(e)}</div>`),
        ].join('');
        return `<div class="card ${cls}">
      <a href="${encodeURIComponent(r.file)}" target="_blank"><img src="${encodeURIComponent(r.file)}" alt="${escHtml(r.label)}" loading="lazy"/></a>
      <div class="lbl">${r.idx}. ${escHtml(r.label)}</div>
      ${errs ? `<div class="errs">${errs}</div>` : ''}
    </div>`;
    }).join('\n');

    const html = `<!DOCTYPE html>
<html lang="tr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>PAWSCORD Audit ${new Date().toISOString().slice(0, 10)}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#111;color:#eee;font-family:system-ui,sans-serif}
h1{padding:16px 20px;background:#1a1a3e;font-size:1.3rem}
.sum{display:flex;gap:12px;padding:12px 20px;background:#16213e;flex-wrap:wrap}
.st{background:#111;padding:8px 16px;border-radius:6px;text-align:center}
.st .n{font-size:1.8rem;font-weight:bold}.st .l{font-size:.8rem;opacity:.6}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(420px,1fr));gap:12px;padding:16px}
.card{background:#1a1a3e;border-radius:6px;overflow:hidden;border:2px solid transparent}
.card.has-error{border-color:#e74c3c}.card.has-warning{border-color:#f39c12}
.card img{width:100%;display:block;cursor:pointer}
.lbl{padding:6px 10px;font-size:.85rem;font-weight:500}
.errs{padding:2px 10px 6px}
.err{font-size:.72rem;padding:1px 0;word-break:break-all}
.err.c{color:#e74c3c}.err.a{color:#e67e22}.err.e{color:#f1c40f}
</style></head><body>
<h1>🐾 PAWSCORD Full Audit — ${new Date().toISOString().slice(0, 10)}</h1>
<div class="sum">
  <div class="st"><div class="n">${report.length}</div><div class="l">Screenshots</div></div>
  <div class="st"><div class="n" style="color:#2ecc71">${report.length - errScreens}</div><div class="l">Clean</div></div>
  <div class="st"><div class="n" style="color:#e74c3c">${errScreens}</div><div class="l">With Errors</div></div>
  <div class="st"><div class="n" style="color:#f1c40f">${engScreens}</div><div class="l">English Text</div></div>
  <div class="st"><div class="n">${[...new Set(allApiErrors)].length}</div><div class="l">API Errors</div></div>
  <div class="st"><div class="n">${elapsed}s</div><div class="l">Duration</div></div>
</div>
<div class="grid">${thumbs}</div></body></html>`;

    fs.writeFileSync(path.join(SHOTS_DIR, 'audit_report.html'), html);

    // Console summary
    console.log('\n' + '═'.repeat(60));
    console.log(`  AUDIT COMPLETE — ${elapsed}s`);
    console.log(`  Total Screenshots: ${report.length}`);
    console.log(`  With Errors: ${errScreens}`);
    console.log(`  With English Text (i18n issues): ${engScreens}`);
    console.log(`  Unique Console Errors: ${[...new Set(allConsoleErrors)].length}`);
    console.log(`  Unique API Errors: ${[...new Set(allApiErrors)].length}`);
    console.log('═'.repeat(60));

    if (allApiErrors.length > 0) {
        console.log('\n  API Errors:');
        [...new Set(allApiErrors)].forEach(e => console.log(`    ❌ ${e}`));
    }

    if (allConsoleErrors.length > 0) {
        console.log('\n  Console Errors (top 30):');
        [...new Set(allConsoleErrors)].slice(0, 30).forEach(e => console.log(`    🔴 ${e}`));
    }

    const allEng = report.flatMap(r => r.englishTexts.map(t => ({ text: t, screen: r.label })));
    if (allEng.length > 0) {
        console.log('\n  English Text (i18n issues, top 30):');
        const unique = [...new Map(allEng.map(e => [e.text, e])).values()];
        unique.slice(0, 30).forEach(e => console.log(`    🟡 "${e.text}" [${e.screen}]`));
    }

    console.log(`\n  📂 Screenshots: ${SHOTS_DIR}`);
    console.log(`  📄 HTML Report: ${path.join(SHOTS_DIR, 'audit_report.html')}`);
    console.log(`  📊 JSON Report: ${path.join(SHOTS_DIR, 'audit_report.json')}`);
})();
