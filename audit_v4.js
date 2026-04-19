/**
 * PAWSCORD Full Visual Audit v4 — 100+ Screenshots
 * 2026-04-16 — Coordinate + DOM-text based approach
 *
 * Uses coordinate clicking based on known layout at 1440×900,
 * plus DOM text matching. NO CSS class selectors.
 *
 * Run:  cd frontend && node audit_v4.js
 * Output: ../audit_screenshots_v2/ (100+ PNGs + report files)
 */
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const BASE = 'https://www.pawscord.com';
const API = 'https://api.pawscord.com';
const U = 'YANHESAP';
const P = 'YANHESAP';
const DIR = path.resolve(__dirname, '..', 'audit_screenshots_v2');

// ── Setup ────────────────────────────────────────────────────────────────────
if (fs.existsSync(DIR)) {
    fs.readdirSync(DIR).forEach(f => fs.unlinkSync(path.join(DIR, f)));
} else {
    fs.mkdirSync(DIR, { recursive: true });
}

const report = [];
let idx = 0;
const consoleErrors = [];
const apiErrors = [];
let curErrors = [];
let curApiErrors = [];

function sl(n) { return n.replace(/[^a-zA-Z0-9_-]/g, '_').replace(/_+/g, '_').slice(0, 60); }

async function ss(page, label) {
    idx++;
    const num = String(idx).padStart(3, '0');
    const file = `${num}_${sl(label)}.png`;
    try { await page.screenshot({ path: path.join(DIR, file), fullPage: false }); } catch (_) { }
    const entry = { idx, label, file, errors: [...curErrors], apiErrors: [...curApiErrors] };
    report.push(entry);
    const errN = entry.errors.length + entry.apiErrors.length;
    console.log(`${errN > 0 ? '🔴' : '🟢'} [${num}] ${label}${errN ? ` (${errN} err)` : ''}`);
    curErrors = [];
    curApiErrors = [];
    return entry;
}

async function w(page, ms = 800) { await page.waitForTimeout(ms); }

/** Click at exact coordinates */
async function xy(page, x, y, opts = {}) {
    try {
        await page.mouse.click(x, y, opts);
        await w(page, opts.wait || 800);
        return true;
    } catch (_) { return false; }
}

/** Find and click element containing exact text */
async function textClick(page, text, opts = {}) {
    const waitMs = opts.wait || 800;
    try {
        const found = await page.evaluate((t) => {
            const all = document.querySelectorAll('button, a, div, span, li, [role="button"], [role="tab"], [tabindex]');
            for (const el of all) {
                if (el.offsetParent === null && !el.closest('[style*="display"]')) continue;
                const rect = el.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) continue;
                const txt = el.textContent.trim();
                if (txt === t || (txt.startsWith(t) && txt.length < t.length + 10)) {
                    el.click();
                    return { x: rect.x, y: rect.y, w: rect.width, h: rect.height, text: txt };
                }
            }
            return null;
        }, text);
        if (found) {
            await w(page, waitMs);
            return true;
        }
    } catch (_) { }
    return false;
}

/** Find element with substring text and click */
async function partialTextClick(page, substr, opts = {}) {
    const waitMs = opts.wait || 800;
    try {
        const found = await page.evaluate((s) => {
            const all = document.querySelectorAll('button, a, div, span, li, [role="button"], [role="tab"], [tabindex]');
            for (const el of all) {
                const rect = el.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) continue;
                if (el.textContent.includes(s)) {
                    el.click();
                    return true;
                }
            }
            return null;
        }, substr);
        if (found) { await w(page, waitMs); return true; }
    } catch (_) { }
    return false;
}

async function closeAll(page) {
    for (let i = 0; i < 5; i++) {
        try { await page.keyboard.press('Escape'); } catch (_) { }
        await w(page, 150);
    }
    // Click the X button if visible
    try {
        await page.evaluate(() => {
            const all = document.querySelectorAll('button, [role="button"], span');
            for (const el of all) {
                const t = el.textContent.trim();
                if ((t === '✕' || t === '×' || t === '✖' || t === 'X' || t === '╳') && el.offsetParent !== null) {
                    const rect = el.getBoundingClientRect();
                    if (rect.width > 0) { el.click(); return; }
                }
            }
        });
    } catch (_) { }
    await w(page, 300);
}

/** Navigate home by clicking Pawscord logo at top-left */
async function goHome(page) {
    await closeAll(page);
    await xy(page, 33, 18, { wait: 1200 }); // Pawscord logo in left sidebar
}

// ──────────────────────────────────────────────────────────────────────────────
(async () => {
    const t0 = Date.now();
    console.log('🐾 PAWSCORD Full Audit v4 — Target: 100+ Screenshots');
    console.log('═'.repeat(60));

    const browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
    });
    const ctx = await browser.newContext({
        serviceWorkers: 'block',
        viewport: { width: 1440, height: 900 },
        locale: 'tr-TR',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36',
    });
    const page = await ctx.newPage();

    page.on('console', msg => {
        if (msg.type() === 'error') {
            const t = msg.text().slice(0, 250);
            if (/favicon|sw\.js|service.worker/i.test(t)) return;
            curErrors.push(t);
            consoleErrors.push(t);
        }
    });
    page.on('pageerror', err => {
        const t = 'PAGE: ' + err.message.slice(0, 250);
        curErrors.push(t);
        consoleErrors.push(t);
    });
    page.on('response', r => {
        if (r.status() >= 400 && r.url().includes('/api/')) {
            const e = `${r.status()} ${r.url().replace(/https?:\/\/[^/]+/, '')}`;
            if (!apiErrors.includes(e)) apiErrors.push(e);
            curApiErrors.push(e);
        }
    });

    // ═══════════════════════════════════════════════════════════════════════
    // 1. PRE-LOGIN
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 1. PRE-LOGIN ═══════════════════════════════════');
    await page.goto(BASE, { waitUntil: 'commit', timeout: 30000 });
    await w(page, 500);
    await ss(page, 'pre_splash');
    await w(page, 4000);
    await ss(page, 'pre_login_page');

    // ═══════════════════════════════════════════════════════════════════════
    // 2. LOGIN VIA API
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 2. LOGIN ═══════════════════════════════════════');
    let token = null;
    try {
        const resp = await page.evaluate(async ({ api, u, p }) => {
            const r = await fetch(`${api}/api/auth/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: u, password: p }),
            });
            return { status: r.status, data: await r.json() };
        }, { api: API, u: U, p: P });
        console.log(`  API login: ${resp.status}`);
        token = resp.data?.access || resp.data?.token || null;
        if (token) console.log('  ✓ Got token');
        else console.log('  ⚠ Response:', JSON.stringify(resp.data).slice(0, 200));
    } catch (e) {
        console.log('  ⚠ API login error:', e.message.slice(0, 100));
    }

    if (token) {
        await page.evaluate(t => {
            localStorage.setItem('access_token', t);
            localStorage.setItem('token', t);
            localStorage.setItem('i18nextLng', 'tr');
        }, token);
    } else {
        // Form login fallback
        await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await w(page, 3000);
        try { await page.fill('input[placeholder="Username"]', U); } catch (_) {
            try { await page.fill('input[type="text"]', U); } catch (_) { }
        }
        try { await page.fill('input[placeholder="Password"]', P); } catch (_) {
            try { await page.fill('input[type="password"]', P); } catch (_) { }
        }
        await ss(page, 'login_form_filled');
        try { await page.click('button:has-text("Login")'); } catch (_) { }
        await w(page, 8000);
    }

    // Reload to apply tokens
    await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await w(page, 6000);
    await ss(page, 'after_login');

    // Verify
    const loggedIn = await page.evaluate(() => document.body.textContent.includes('YANHESAP'));
    console.log(`  Logged in: ${loggedIn}`);
    if (!loggedIn) {
        console.log('  ⚠ Login may have failed. Continuing...');
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 3. HOME PAGE
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 3. HOME PAGE ═══════════════════════════════════');
    await goHome(page);
    await w(page, 1000);
    await ss(page, 'home_full');

    // Click each home card (Friends, Servers, Activities, AI)
    // Cards are in center area: ~(600,340) and ~(857,340) for row 1, ~(600,530) and ~(857,530) for row 2
    const homeCards = [
        { name: 'Friends', x: 600, y: 340 },
        { name: 'Servers', x: 857, y: 340 },
        { name: 'Activities', x: 600, y: 530 },
        { name: 'AI_Assistant', x: 857, y: 530 },
    ];
    for (const card of homeCards) {
        await goHome(page);
        await w(page, 500);
        await xy(page, card.x, card.y, { wait: 1500 });
        await ss(page, `home_card_${card.name}`);
        await closeAll(page);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 4. DM CONVERSATIONS
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 4. DM CONVERSATIONS ════════════════════════════');

    // PawPaw DM — text "PawPaw" is at ~(165, 195) in second column
    await goHome(page);
    await w(page, 500);
    if (await textClick(page, 'PawPaw', { wait: 2000 })) {
        await ss(page, 'dm_PawPaw_chat');
        // Scroll chat
        try {
            await page.evaluate(() => {
                const chatAreas = document.querySelectorAll('div');
                for (const d of chatAreas) {
                    const r = d.getBoundingClientRect();
                    if (r.left > 250 && r.width > 500 && r.height > 400 && d.scrollHeight > d.clientHeight) {
                        d.scrollTop = d.scrollHeight;
                        return;
                    }
                }
            });
        } catch (_) { }
        await w(page, 500);
        await ss(page, 'dm_PawPaw_scrolled');

        // Try emoji button 
        const emojiBtn = await page.evaluate(() => {
            const btns = document.querySelectorAll('button');
            for (const b of btns) {
                const r = b.getBoundingClientRect();
                if (r.bottom > 850 && r.left > 300) {
                    const svg = b.querySelector('svg');
                    if (svg) return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
                }
            }
            return null;
        });
        if (emojiBtn) {
            await xy(page, emojiBtn.x, emojiBtn.y, { wait: 800 });
            await ss(page, 'dm_PawPaw_emoji_picker');
            await closeAll(page);
        }
    }

    // iyzico DM
    await goHome(page);
    await w(page, 500);
    if (await textClick(page, 'iyzico', { wait: 2000 })) {
        await ss(page, 'dm_iyzico_chat');
    }

    // PawPaw AI channel
    await goHome(page);
    await w(page, 500);
    if (await textClick(page, 'PawPaw AI', { wait: 2000 })) {
        await ss(page, 'channel_PawPaw_AI');
    }

    // Signal Bot channel
    await goHome(page);
    await w(page, 500);
    if (await textClick(page, 'Signal Bot', { wait: 2000 })) {
        await ss(page, 'channel_Signal_Bot');
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 5. SERVER NAVIGATION
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 5. SERVERS & CHANNELS ══════════════════════════');

    // Server icons are at approx x=33 in the left bar:
    // Server 1: ~y=85 (cat avatar)
    // Server 2: ~y=133 (red "A")
    // Server 3: ~y=190 (green rocket)
    // Server 4: ~y=248 (keyboard icon) — may be something else
    const serverYPositions = [85, 133, 190, 248];

    for (let si = 0; si < serverYPositions.length; si++) {
        await goHome(page);
        await w(page, 500);
        await xy(page, 33, serverYPositions[si], { wait: 2000 });

        // Check if we're now in a server (the header should change from "Ana Sayfa")
        const headerText = await page.evaluate(() => {
            // Get text from the header area (top of second column, ~x:80-280, y:0-30)
            const els = document.querySelectorAll('h1, h2, h3, div, span');
            for (const el of els) {
                const r = el.getBoundingClientRect();
                if (r.left > 60 && r.left < 300 && r.top < 40 && r.height > 10 && r.height < 40) {
                    const t = el.textContent.trim();
                    if (t.length > 1 && t.length < 40 && t !== 'Ana Sayfa') return t;
                }
            }
            return null;
        });

        if (!headerText || headerText === 'Ana Sayfa') {
            console.log(`  Server ${si}: no change (still home)`);
            continue;
        }

        console.log(`  Server ${si}: ${headerText}`);
        await ss(page, `server_${si}_${sl(headerText)}`);

        // Get all clickable items in the channel column (x: 70-290)
        const channelItems = await page.evaluate(() => {
            const items = [];
            const seen = new Set();
            const els = document.querySelectorAll('div, span, a, button, [role="button"]');
            for (const el of els) {
                const r = el.getBoundingClientRect();
                if (r.left < 70 || r.left > 290 || r.width < 60 || r.height < 15 || r.height > 45) continue;
                if (r.top < 50) continue;
                const t = el.textContent.trim();
                if (!t || t.length > 40 || t.length < 2 || seen.has(t)) continue;
                const cs = window.getComputedStyle(el);
                if (cs.cursor !== 'pointer' && el.tagName !== 'BUTTON' && el.getAttribute('role') !== 'button') continue;
                seen.add(t);
                items.push({ text: t, x: r.x + r.width / 2, y: r.y + r.height / 2 });
            }
            return items;
        });

        console.log(`    Channels: ${channelItems.map(c => c.text).join(', ')}`);

        for (let ci = 0; ci < Math.min(channelItems.length, 8); ci++) {
            const ch = channelItems[ci];
            if (/voice|ses|🔊/i.test(ch.text)) continue;
            // Re-navigate to server
            await xy(page, 33, serverYPositions[si], { wait: 1500 });
            await xy(page, ch.x, ch.y, { wait: 1500 });
            await ss(page, `server_${si}_ch_${ci}_${sl(ch.text)}`);
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 6. PROFILE PANEL (click YANHESAP at bottom)
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 6. PROFILE PANEL ═══════════════════════════════');
    await goHome(page);
    await w(page, 500);

    // Click on YANHESAP text at bottom (~155, 830)
    await xy(page, 155, 830, { wait: 1500 });
    await ss(page, 'profile_panel_opened');

    // Profile sidebar tabs — visible from screenshot:
    // MY ACCOUNT: Profile, Badges & XP, Inventory, Endorsements
    // PRIVACY & SECURITY: Security, Privacy, GDPR
    // SOCIAL: Friends, Activity, Custom Status
    // APPEARANCE: Theme, Sounds, Notifications
    // APPLICATION: Language, Drafts, Bookmarks, History
    // ADVANCED: Premium, Developer
    const profileTabs = [
        'Profile', 'Badges & XP', 'Inventory', 'Endorsements',
        'Security', 'Privacy', 'GDPR',
        'Friends', 'Activity', 'Custom Status',
        'Theme', 'Sounds', 'Notifications',
        'Language', 'Drafts', 'Bookmarks', 'History',
        'Premium', 'Developer',
    ];

    for (const tab of profileTabs) {
        const clicked = await textClick(page, tab, { wait: 1000 });
        if (clicked) {
            await ss(page, `profile_${sl(tab)}`);
            // Scroll the content area
            try {
                await page.evaluate(() => {
                    const containers = document.querySelectorAll('div');
                    for (const c of containers) {
                        const r = c.getBoundingClientRect();
                        if (r.left > 400 && r.width > 300 && r.height > 300 && c.scrollHeight > c.clientHeight + 50) {
                            c.scrollTop = c.scrollHeight;
                            return;
                        }
                    }
                });
                await w(page, 400);
                await ss(page, `profile_${sl(tab)}_scrolled`);
            } catch (_) { }
        }
    }

    // Close profile panel
    // The X is at ~(1108, 167) based on screenshots
    await xy(page, 1108, 167, { wait: 500 });
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════════
    // 7. SETTINGS (click gear ⚙ next to YANHESAP)
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 7. SETTINGS ════════════════════════════════════');
    await goHome(page);
    await w(page, 500);

    // Gear icon is at ~(273, 835) — small icon to the right of YANHESAP
    await xy(page, 273, 835, { wait: 1500 });

    // Check if a settings dialog/panel opened
    const settingsOpen = await page.evaluate(() => {
        // Check for new modal/overlay
        const overlays = document.querySelectorAll('[role="dialog"], [class*="modal" i], [class*="settings" i]');
        for (const o of overlays) {
            const r = o.getBoundingClientRect();
            if (r.width > 400 && r.height > 400) return true;
        }
        return false;
    });

    if (settingsOpen) {
        await ss(page, 'settings_opened');

        // Try clicking settings tabs
        const settingsTabs = [
            'Hesabım', 'My Account',
            'Gizlilik ve Güvenlik', 'Privacy & Security',
            'Bağlantılar', 'Connections',
            'Görünüm', 'Appearance',
            'Ses ve Video', 'Voice & Video',
            'Bildirimler', 'Notifications',
            'Klavye Kısayolları', 'Keyboard Shortcuts',
            'Dil', 'Language',
            'Aktivite Durumu', 'Activity Status',
            'Oturumlar', 'Sessions',
            'Gelişmiş', 'Advanced',
        ];

        const clickedTabs = new Set();
        for (const tab of settingsTabs) {
            if (clickedTabs.has(tab.toLowerCase())) continue;
            if (await textClick(page, tab, { wait: 1000 })) {
                clickedTabs.add(tab.toLowerCase());
                await ss(page, `settings_${sl(tab)}`);
            }
        }
        await closeAll(page);
    } else {
        console.log('  Settings may not have opened — gear click might open profile panel');
        // The gear might open the same profile panel. Take screenshot anyway.
        await ss(page, 'gear_click_result');
        await closeAll(page);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 8. SIDEBAR EMOJI BUTTONS
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 8. EMOJI BUTTONS ═══════════════════════════════');
    await goHome(page);
    await w(page, 500);

    // From screenshot, emoji icons are in 2 rows starting at about y=678:
    // Row 1 (y~678): 5 icons at x≈100, 140, 180, 220, 260
    // Row 2 (y~717): 4 icons at x≈100, 140, 180, 220
    const emojiPositions = [
        { x: 100, y: 678, name: 'emoji_1_money' },     // 💰
        { x: 140, y: 678, name: 'emoji_2_store' },      // 🛒
        { x: 180, y: 678, name: 'emoji_3_gift' },       // 🎁
        { x: 220, y: 678, name: 'emoji_4_chart' },      // 📊
        { x: 260, y: 678, name: 'emoji_5_download' },   // 📥
        { x: 100, y: 717, name: 'emoji_6_announce' },   // 📢
        { x: 140, y: 717, name: 'emoji_7_games' },      // 🎮
        { x: 180, y: 717, name: 'emoji_8_folder' },     // 📂
        { x: 220, y: 717, name: 'emoji_9_art' },        // 🎨
    ];

    for (const ep of emojiPositions) {
        await goHome(page);
        await w(page, 300);
        await xy(page, ep.x, ep.y, { wait: 1500 });

        // Check if something opened (modal/dialog/new content)
        const hasModal = await page.evaluate(() => {
            // Any new overlay bigger than 300x300?
            const els = document.querySelectorAll('div');
            for (const el of els) {
                const r = el.getBoundingClientRect();
                const z = parseInt(window.getComputedStyle(el).zIndex) || 0;
                if (z > 100 && r.width > 300 && r.height > 300) return true;
            }
            return false;
        });

        await ss(page, ep.name);

        if (hasModal) {
            // Try clicking sub-tabs inside the modal
            const modalTabs = await page.evaluate(() => {
                const tabs = [];
                const btns = document.querySelectorAll('button, [role="tab"]');
                for (const b of btns) {
                    const r = b.getBoundingClientRect();
                    const z = parseInt(window.getComputedStyle(b.closest('div') || b).zIndex) || 0;
                    if (r.width > 0 && r.height > 0 && r.width < 200) {
                        const t = b.textContent.trim();
                        if (t.length > 1 && t.length < 30 && !['✕', '×', 'X'].includes(t)) {
                            tabs.push({ text: t, x: r.x + r.width / 2, y: r.y + r.height / 2 });
                        }
                    }
                }
                return tabs.slice(0, 8);
            });

            for (const mt of modalTabs.slice(0, 5)) {
                await xy(page, mt.x, mt.y, { wait: 800 });
                await ss(page, `${ep.name}_tab_${sl(mt.text)}`);
            }
        }

        await closeAll(page);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 9. ADMIN PANEL
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 9. ADMIN PANEL ═════════════════════════════════');
    await goHome(page);
    await w(page, 500);

    // "Yönetici Paneli" button at ~(184, 631) based on screenshot
    if (await textClick(page, 'Yönetici Paneli', { wait: 2500 })) {
        await ss(page, 'admin_dashboard');

        // Get all sidebar buttons in admin panel
        const adminSidebarBtns = await page.evaluate(() => {
            const btns = [];
            const seen = new Set();
            const all = document.querySelectorAll('button, [role="button"], [role="tab"], li, a, div');
            for (const el of all) {
                const r = el.getBoundingClientRect();
                // Admin sidebar tabs are on the left side of the modal
                if (r.width < 50 || r.width > 250 || r.height < 20 || r.height > 50) continue;
                const t = el.textContent.trim();
                if (!t || t.length > 30 || t.length < 3 || seen.has(t)) continue;
                const cs = window.getComputedStyle(el);
                if (cs.cursor !== 'pointer' && el.tagName !== 'BUTTON') continue;
                seen.add(t);
                btns.push({ text: t, x: r.x + r.width / 2, y: r.y + r.height / 2, left: r.left });
            }
            // Sort by left position, take leftmost ones (sidebar)
            return btns.sort((a, b) => a.left - b.left).slice(0, 20);
        });

        console.log(`  Admin sidebar items: ${adminSidebarBtns.map(b => b.text).join(', ')}`);

        const clickedAdmin = new Set();
        for (const btn of adminSidebarBtns) {
            if (clickedAdmin.has(btn.text)) continue;
            clickedAdmin.add(btn.text);
            await xy(page, btn.x, btn.y, { wait: 1500 });
            await ss(page, `admin_${sl(btn.text)}`);

            // Scroll content
            try {
                await page.evaluate(() => {
                    const containers = document.querySelectorAll('div');
                    for (const c of containers) {
                        const r = c.getBoundingClientRect();
                        if (r.left > 200 && r.width > 400 && c.scrollHeight > c.clientHeight + 50) {
                            c.scrollTop = c.scrollHeight;
                            return;
                        }
                    }
                });
                await w(page, 400);
                await ss(page, `admin_${sl(btn.text)}_bottom`);
            } catch (_) { }
        }

        await closeAll(page);
    } else {
        console.log('  ⚠ Admin panel button not found');
        // Try coordinate click
        await xy(page, 184, 631, { wait: 2500 });
        await ss(page, 'admin_coord_click');
        await closeAll(page);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 10. PREMIUM STORE
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 10. PREMIUM STORE ══════════════════════════════');
    await goHome(page);

    // Premium store — try to find it. From screenshot I don't see explicit premium nav.
    // But there was a screenshot showing "Premium Magaza" modal with tabs: Premium, Magaza, Server Boost
    // There might be a "Premium" text in the sidebar or accessible via page icons
    // Let me look for crown icon in left sidebar or try the Pawscord logo area

    // Try clicking the crown/jewel icon in the left sidebar (around y=195)
    await xy(page, 33, 195, { wait: 1500 });
    await ss(page, 'left_icon_premium_attempt');

    // Check if premium store opened
    const hasPremium = await page.evaluate(() => document.body.textContent.includes('Premium'));
    if (hasPremium) {
        // Try tabs
        for (const tab of ['Premium', 'Magaza', 'Mağaza', 'Server Boost']) {
            if (await textClick(page, tab, { wait: 800 })) {
                await ss(page, `premium_${sl(tab)}`);
            }
        }
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════════
    // 11. QUICK ACCESS — Learn English & Crypto Signals
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 11. QUICK ACCESS ═══════════════════════════════');

    // "Learn English" button at right sidebar (~1275, 679)
    await goHome(page);
    await w(page, 500);
    if (await partialTextClick(page, 'Learn English', { wait: 2500 }) ||
        await partialTextClick(page, 'İngilizce Öğren', { wait: 2000 })) {
        await ss(page, 'quick_learn_english');
        // Scroll if it's a page
        await w(page, 1000);
        await ss(page, 'quick_learn_english_loaded');
    } else {
        // Try coordinate click
        await xy(page, 1275, 679, { wait: 2500 });
        await ss(page, 'quick_learn_english_coord');
    }
    await closeAll(page);

    // "Crypto Signals" button at right sidebar (~1275, 728)
    await goHome(page);
    await w(page, 500);
    if (await partialTextClick(page, 'Crypto Signals', { wait: 2500 }) ||
        await partialTextClick(page, 'Kripto Sinyalleri', { wait: 2000 })) {
        await ss(page, 'quick_crypto_signals');
        await w(page, 2000);
        await ss(page, 'quick_crypto_loaded');

        // Crypto tabs
        for (const tab of ['Tüm Stratejiler', 'Açık Pozisyonlar', 'Kapalı Pozisyonlar', 'Performans']) {
            if (await textClick(page, tab, { wait: 1000 })) {
                await ss(page, `crypto_${sl(tab)}`);
            }
        }
    } else {
        await xy(page, 1275, 728, { wait: 2500 });
        await ss(page, 'quick_crypto_coord');
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════════
    // 12. DISCOVER SERVERS (+ button)
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 12. DISCOVER / ADD SERVER ═══════════════════════');
    await goHome(page);

    // "+" button at bottom of server list ~(33, 305)
    await xy(page, 33, 305, { wait: 1500 });
    await ss(page, 'add_server_menu');

    // Look for "Create Server" or "Join Server" options
    if (await textClick(page, 'Sunucu Oluştur', { wait: 800 }) ||
        await textClick(page, 'Create Server', { wait: 800 })) {
        await ss(page, 'create_server_dialog');
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════════
    // 13. DOWNLOAD MODAL
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 13. DOWNLOAD MODAL ═════════════════════════════');
    await goHome(page);

    // Download button at top-right (~1082, 30) — yellow button
    if (await partialTextClick(page, 'Download', { wait: 1500 })) {
        await ss(page, 'download_modal');
    } else {
        await xy(page, 1082, 30, { wait: 1500 });
        await ss(page, 'download_modal_coord');
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════════
    // 14. SUPPORT DEVELOPER BUTTON
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 14. SUPPORT DEVELOPER ══════════════════════════');
    await goHome(page);
    if (await partialTextClick(page, 'Geliştiriciyi Destekle', { wait: 1500 })) {
        await ss(page, 'support_developer');
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════════
    // 15. ADD DM (Ekle button)
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 15. ADD DM ═════════════════════════════════════');
    await goHome(page);
    if (await textClick(page, 'Ekle', { wait: 1500 })) {
        await ss(page, 'add_dm_dialog');
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════════
    // 16. FRIENDS PANEL
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 16. FRIENDS ════════════════════════════════════');
    await goHome(page);

    // Right sidebar has "FRIENDS 1/2" header + PawPaw and iyzico
    // "FRIENDS" section is at ~(1200, 22)
    // Click on PawPaw in right panel
    const rightPawPaw = await page.evaluate(() => {
        const spans = document.querySelectorAll('span, div');
        for (const el of spans) {
            const r = el.getBoundingClientRect();
            if (r.left > 1100 && el.textContent.trim() === 'PawPaw') {
                return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
            }
        }
        return null;
    });
    if (rightPawPaw) {
        await xy(page, rightPawPaw.x, rightPawPaw.y, { wait: 1000 });
        await ss(page, 'friends_pawpaw_popup');
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════════
    // 17. CONTEXT MENUS
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 17. CONTEXT MENUS ══════════════════════════════');

    // Right-click on PawPaw in DM list
    await goHome(page);
    const pawpawDm = await page.evaluate(() => {
        const els = document.querySelectorAll('div, span');
        for (const el of els) {
            const r = el.getBoundingClientRect();
            if (r.left > 80 && r.left < 280 && el.textContent.trim() === 'PawPaw') {
                return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
            }
        }
        return null;
    });
    if (pawpawDm) {
        await page.mouse.click(pawpawDm.x, pawpawDm.y, { button: 'right' });
        await w(page, 600);
        await ss(page, 'context_dm_pawpaw');
    }
    await closeAll(page);

    // Right-click on a server icon
    await goHome(page);
    await page.mouse.click(33, 85, { button: 'right' });
    await w(page, 600);
    await ss(page, 'context_server_icon');
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════════
    // 18. RESPONSIVE VIEWS
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 18. RESPONSIVE VIEWS ═══════════════════════════');

    // Mobile 375
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await w(page, 3000);
    await ss(page, 'responsive_375_home');

    // Mobile bottom nav bar (Chats, Servers, Friends, Profile)
    const mobileNav = ['Chats', 'Servers', 'Friends', 'Profile'];
    for (const nav of mobileNav) {
        if (await textClick(page, nav, { wait: 1500 })) {
            await ss(page, `responsive_375_${sl(nav)}`);
        }
    }

    // Tablet 768
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await w(page, 3000);
    await ss(page, 'responsive_768_home');

    // Back to desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await w(page, 3000);

    // ═══════════════════════════════════════════════════════════════════════
    // 19. ERROR STATES
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 19. ERROR STATES ═══════════════════════════════');
    await page.goto(`${BASE}/this-page-does-not-exist-404`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await w(page, 2000);
    await ss(page, 'error_404');

    // Go back home
    await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await w(page, 3000);

    // ═══════════════════════════════════════════════════════════════════════
    // 20. SEARCH
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 20. SEARCH ═════════════════════════════════════');
    await goHome(page);
    try {
        await page.keyboard.press('Control+k');
        await w(page, 1000);
        await ss(page, 'search_dialog');
    } catch (_) { }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════════
    // 21. KEYBOARD SHORTCUTS
    // ═══════════════════════════════════════════════════════════════════════
    console.log('\n══ 21. KEYBOARD SHORTCUTS ═════════════════════════');
    await goHome(page);
    try {
        await page.keyboard.press('Control+/');
        await w(page, 1000);
        await ss(page, 'keyboard_shortcuts');
    } catch (_) { }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════════
    // FINAL
    // ═══════════════════════════════════════════════════════════════════════
    await goHome(page);
    await ss(page, 'final_state');

    await browser.close();

    // ═══════════════════════════════════════════════════════════════════════
    // REPORTS
    // ═══════════════════════════════════════════════════════════════════════
    const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
    const errScreens = report.filter(r => r.errors.length + r.apiErrors.length > 0).length;

    const jsonReport = {
        date: new Date().toISOString(),
        elapsed: `${elapsed}s`,
        total: report.length,
        withErrors: errScreens,
        consoleErrors: [...new Set(consoleErrors)],
        apiErrors: [...new Set(apiErrors)],
        screenshots: report,
    };
    fs.writeFileSync(path.join(DIR, 'audit_report.json'), JSON.stringify(jsonReport, null, 2));

    // HTML report
    const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const cards = report.map(r => {
        const hasErr = r.errors.length + r.apiErrors.length > 0;
        const errs = [
            ...r.errors.map(e => `<div style="color:#e74c3c;font-size:.7rem">🔴 ${esc(e)}</div>`),
            ...r.apiErrors.map(e => `<div style="color:#e67e22;font-size:.7rem">🟠 ${esc(e)}</div>`),
        ].join('');
        return `<div style="background:#1a1a3e;border-radius:6px;overflow:hidden;${hasErr ? 'border:2px solid #e74c3c' : ''}">
      <a href="${encodeURIComponent(r.file)}" target="_blank"><img src="${encodeURIComponent(r.file)}" style="width:100%;display:block" loading="lazy"/></a>
      <div style="padding:6px 10px;font-size:.85rem">${r.idx}. ${esc(r.label)}</div>
      ${errs ? `<div style="padding:2px 10px 6px">${errs}</div>` : ''}
    </div>`;
    }).join('\n');

    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>PAWSCORD Audit ${new Date().toISOString().slice(0, 10)}</title></head>
<body style="background:#111;color:#eee;font-family:system-ui;margin:0">
<h1 style="padding:16px;background:#1a1a3e;margin:0">🐾 PAWSCORD Audit — ${report.length} Screenshots — ${elapsed}s</h1>
<div style="display:flex;gap:12px;padding:12px;background:#16213e">
  <div style="background:#111;padding:8px 16px;border-radius:6px;text-align:center"><div style="font-size:1.8rem;font-weight:bold">${report.length}</div><div style="font-size:.8rem;opacity:.6">Total</div></div>
  <div style="background:#111;padding:8px 16px;border-radius:6px;text-align:center"><div style="font-size:1.8rem;font-weight:bold;color:#2ecc71">${report.length - errScreens}</div><div style="font-size:.8rem;opacity:.6">Clean</div></div>
  <div style="background:#111;padding:8px 16px;border-radius:6px;text-align:center"><div style="font-size:1.8rem;font-weight:bold;color:#e74c3c">${errScreens}</div><div style="font-size:.8rem;opacity:.6">Errors</div></div>
</div>
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(400px,1fr));gap:12px;padding:16px">${cards}</div>
</body></html>`;
    fs.writeFileSync(path.join(DIR, 'audit_report.html'), html);

    console.log('\n' + '═'.repeat(60));
    console.log(`  COMPLETE — ${elapsed}s — ${report.length} screenshots`);
    console.log(`  Errors: ${errScreens} screens`);
    console.log(`  Console errors: ${[...new Set(consoleErrors)].length}`);
    console.log(`  API errors: ${[...new Set(apiErrors)].length}`);
    console.log('═'.repeat(60));

    if (apiErrors.length > 0) {
        console.log('\n  API Errors:');
        [...new Set(apiErrors)].forEach(e => console.log(`    ❌ ${e}`));
    }
    if (consoleErrors.length > 0) {
        console.log('\n  Console Errors (top 20):');
        [...new Set(consoleErrors)].slice(0, 20).forEach(e => console.log(`    🔴 ${e}`));
    }

    console.log(`\n  📂 ${DIR}`);
    console.log(`  📄 ${path.join(DIR, 'audit_report.html')}`);
})();
