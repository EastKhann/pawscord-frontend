/**
 * PAWSCORD Full Visual Audit v5 — 150+ Screenshots
 * 2026-04-16
 *
 * MAJOR FIXES from v4/supplement:
 * 1. Uses aria-label="Settings" to find gear button (not coordinates)
 * 2. Uses .sidebar-btn class to find profile panel tabs
 * 3. Re-authenticates before EVERY section
 * 4. Admin panel: clicks actual tab labels
 * 5. Settings modal: clicks actual tab elements
 * 6. Friends page: captures All, Pending, Add Friend tabs
 * 7. Covers ALL servers, not just server 0
 *
 * Run:  cd frontend && node audit_v5.js
 * Output: ../audit_screenshots_v2/ (150+ PNGs + report files)
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
const allConsoleErrors = [];
const allApiErrors = [];
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

async function xy(page, x, y, opts = {}) {
    try { await page.mouse.click(x, y, opts); await w(page, opts.wait || 800); return true; } catch (_) { return false; }
}

/** Click element by exact text match */
async function textClick(page, text, opts = {}) {
    try {
        const found = await page.evaluate((t) => {
            const all = document.querySelectorAll('button, a, div, span, li, [role="button"], [role="tab"], [tabindex], h1, h2, h3, h4, p, label');
            for (const el of all) {
                const rect = el.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) continue;
                if (el.offsetParent === null && !el.closest('[style*="display"]')) continue;
                const txt = el.textContent.trim();
                if (txt === t || (txt.startsWith(t) && txt.length < t.length + 10)) {
                    el.click();
                    return true;
                }
            }
            return false;
        }, text);
        if (found) { await w(page, opts.wait || 800); return true; }
    } catch (_) { }
    return false;
}

/** Click element containing substring */
async function partialClick(page, substr, opts = {}) {
    try {
        const found = await page.evaluate((s) => {
            const all = document.querySelectorAll('button, a, div, span, li, [role="button"], [role="tab"]');
            for (const el of all) {
                const rect = el.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) continue;
                if (el.textContent.includes(s) && el.textContent.trim().length < s.length + 30) {
                    el.click();
                    return true;
                }
            }
            return false;
        }, substr);
        if (found) { await w(page, opts.wait || 800); return true; }
    } catch (_) { }
    return false;
}

/** Click element by aria-label */
async function ariaClick(page, label, opts = {}) {
    try {
        const el = page.locator(`[aria-label="${label}"]`).first();
        if (await el.isVisible({ timeout: 2000 })) {
            await el.click();
            await w(page, opts.wait || 800);
            return true;
        }
    } catch (_) { }
    return false;
}

async function closeAll(page) {
    for (let i = 0; i < 5; i++) {
        try { await page.keyboard.press('Escape'); } catch (_) { }
        await w(page, 120);
    }
    try {
        await page.evaluate(() => {
            const btns = document.querySelectorAll('button, [role="button"], span');
            for (const el of btns) {
                const t = el.textContent.trim();
                if (['✕', '×', '✖', 'X', '╳'].includes(t) && el.getBoundingClientRect().width > 0) {
                    el.click(); return;
                }
            }
        });
    } catch (_) { }
    await w(page, 200);
}

let savedToken = null;

/** Full re-authentication */
async function ensureLoggedIn(page) {
    try {
        const isIn = await page.evaluate(() => document.body?.textContent?.includes('YANHESAP'));
        if (isIn) return true;
    } catch (_) { }

    console.log('  🔑 Re-authenticating...');
    try {
        await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 25000 });
        await w(page, 2000);

        const resp = await page.evaluate(async ({ api, u, p }) => {
            const r = await fetch(`${api}/api/auth/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: u, password: p }),
            });
            return { status: r.status, data: await r.json() };
        }, { api: API, u: U, p: P });

        const token = resp.data?.access || resp.data?.token;
        if (!token) { console.log('  ⚠ Re-auth failed'); return false; }
        savedToken = token;

        await page.evaluate(t => {
            localStorage.setItem('access_token', t);
            localStorage.setItem('token', t);
            localStorage.setItem('pawscord_language', 'tr');
            localStorage.setItem('i18nextLng', 'tr');
        }, token);

        await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 25000 });
        await w(page, 5000);
        const ok = await page.evaluate(() => document.body.textContent.includes('YANHESAP'));
        console.log(`  🔑 Re-auth: ${ok ? '✓' : '✗'}`);
        return ok;
    } catch (e) {
        console.log(`  ⚠ Re-auth error: ${e.message.slice(0, 80)}`);
        return false;
    }
}

async function goHome(page) {
    await closeAll(page);
    // Click logo at top-left
    await xy(page, 33, 18, { wait: 1500 });
    // Verify home
    const isHome = await page.evaluate(() =>
        document.body.textContent.includes('Friends') || document.body.textContent.includes('Ana Sayfa'));
    if (!isHome) await ensureLoggedIn(page);
}

// ──────────────────────────────────────────────────────────────────────────────
(async () => {
    const t0 = Date.now();
    console.log('🐾 PAWSCORD Full Audit v5 — Target: 150+ Screenshots');
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
            curErrors.push(t); allConsoleErrors.push(t);
        }
    });
    page.on('pageerror', err => {
        const t = 'PAGE: ' + err.message.slice(0, 250);
        curErrors.push(t); allConsoleErrors.push(t);
    });
    page.on('response', r => {
        if (r.status() >= 400 && r.url().includes('/api/')) {
            const e = `${r.status()} ${r.url().replace(/https?:\/\/[^/]+/, '')}`;
            if (!allApiErrors.includes(e)) allApiErrors.push(e);
            curApiErrors.push(e);
        }
    });

    // ═══════════════════════════════════════════════════════════════════
    // §1. PRE-LOGIN
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ §1. PRE-LOGIN ══════════════════════════════════');
    await page.goto(BASE, { waitUntil: 'commit', timeout: 30000 });
    await w(page, 500);
    await ss(page, 'pre_splash');
    await w(page, 4000);
    await ss(page, 'pre_login_page');

    // Sign Up page
    if (await textClick(page, 'Sign Up', { wait: 2000 })) {
        await ss(page, 'pre_signup_page');
        await page.goBack();
        await w(page, 2000);
    }

    // ═══════════════════════════════════════════════════════════════════
    // §2. LOGIN
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ §2. LOGIN ══════════════════════════════════════');
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
        savedToken = token;
        if (token) console.log('  ✓ Got token');
    } catch (e) {
        console.log('  ⚠ API login error:', e.message.slice(0, 100));
    }

    if (token) {
        await page.evaluate(t => {
            localStorage.setItem('access_token', t);
            localStorage.setItem('token', t);
            localStorage.setItem('pawscord_language', 'tr');
            localStorage.setItem('i18nextLng', 'tr');
        }, token);
    }

    await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await w(page, 6000);
    await ss(page, 'after_login');

    const loggedIn = await page.evaluate(() => document.body.textContent.includes('YANHESAP'));
    console.log(`  Logged in: ${loggedIn}`);

    // ═══════════════════════════════════════════════════════════════════
    // §3. HOME PAGE
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ §3. HOME PAGE ══════════════════════════════════');
    await goHome(page);
    await ss(page, 'home_full');

    // Scroll home page
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await w(page, 500);
    await ss(page, 'home_scrolled');
    await page.evaluate(() => window.scrollTo(0, 0));

    // Click each card
    const homeCards = [
        { name: 'Friends', x: 600, y: 340 },
        { name: 'Servers', x: 857, y: 340 },
        { name: 'Activities', x: 600, y: 530 },
        { name: 'AI_Assistant', x: 857, y: 530 },
    ];
    for (const card of homeCards) {
        await goHome(page);
        await xy(page, card.x, card.y, { wait: 2000 });
        await ss(page, `home_card_${card.name}`);
    }

    // ═══════════════════════════════════════════════════════════════════
    // §4. DM CONVERSATIONS
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ §4. DM CONVERSATIONS ═══════════════════════════');
    await goHome(page);

    // Get all DM contacts
    const dmContacts = await page.evaluate(() => {
        const items = [];
        const seen = new Set();
        const els = document.querySelectorAll('div, span');
        for (const el of els) {
            const r = el.getBoundingClientRect();
            if (r.left > 80 && r.left < 260 && r.top > 150 && r.top < 600 && r.height > 15 && r.height < 50) {
                const t = el.textContent.trim();
                if (t.length > 2 && t.length < 25 && !seen.has(t) && !t.includes('DIRECT') && !t.includes('Ekle') && !t.includes('MESSAGE')) {
                    seen.add(t);
                    items.push({ text: t, x: r.x + r.width / 2, y: r.y + r.height / 2 });
                }
            }
        }
        return items;
    });
    console.log(`  DM contacts: ${dmContacts.map(c => c.text).join(', ')}`);

    for (const dm of dmContacts) {
        await goHome(page);
        await xy(page, dm.x, dm.y, { wait: 2000 });
        await ss(page, `dm_${sl(dm.text)}_chat`);

        // Scroll chat
        try {
            await page.evaluate(() => {
                const divs = document.querySelectorAll('div');
                for (const d of divs) {
                    const r = d.getBoundingClientRect();
                    if (r.left > 280 && r.width > 400 && r.height > 300 && d.scrollHeight > d.clientHeight) {
                        d.scrollTop = d.scrollHeight; return;
                    }
                }
            });
            await w(page, 500);
            await ss(page, `dm_${sl(dm.text)}_scrolled`);
        } catch (_) { }
    }

    // ═══════════════════════════════════════════════════════════════════
    // §5. SERVERS & CHANNELS (all servers)
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ §5. SERVERS & CHANNELS ═════════════════════════');
    const serverYPositions = [90, 140, 195, 250];

    for (let si = 0; si < serverYPositions.length; si++) {
        await ensureLoggedIn(page);
        await goHome(page);
        await xy(page, 33, serverYPositions[si], { wait: 2500 });

        // Check if server loaded
        const serverInfo = await page.evaluate(() => {
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

        if (!serverInfo) {
            console.log(`  Server ${si}: didn't load`);
            continue;
        }

        console.log(`  Server ${si}: ${serverInfo}`);
        await ss(page, `server_${si}_${sl(serverInfo)}`);

        // Collect channels
        const channels = await page.evaluate(() => {
            const items = [];
            const seen = new Set();
            const els = document.querySelectorAll('div, span, a, button, [role="button"]');
            for (const el of els) {
                const r = el.getBoundingClientRect();
                if (r.left < 70 || r.left > 290 || r.width < 50 || r.height < 15 || r.height > 45 || r.top < 50) continue;
                const t = el.textContent.trim();
                if (!t || t.length > 40 || t.length < 2 || seen.has(t)) continue;
                if (/^(BOT|METİN|SES|KANALLARI|CHANNELS)/.test(t)) continue;
                const cs = window.getComputedStyle(el);
                if (cs.cursor !== 'pointer' && el.tagName !== 'BUTTON') continue;
                seen.add(t);
                items.push({ text: t, x: r.x + r.width / 2, y: r.y + r.height / 2 });
            }
            return items;
        });

        console.log(`    Channels: ${channels.map(c => c.text).join(', ')}`);

        for (let ci = 0; ci < Math.min(channels.length, 8); ci++) {
            const ch = channels[ci];
            if (/voice|ses|🔊|Sohbet|sesliss|Sesss|AFK/i.test(ch.text)) continue;
            if (/Hoşgeldin|Hosgeldin/i.test(ch.text)) continue; // Crashes WebSocket
            await xy(page, 33, serverYPositions[si], { wait: 1500 });
            await xy(page, ch.x, ch.y, { wait: 1500 });
            await ss(page, `server_${si}_ch_${ci}_${sl(ch.text)}`);
        }
    }

    // ═══════════════════════════════════════════════════════════════════
    // §6. PROFILE PANEL — ALL 19 TABS
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ §6. PROFILE PANEL (19 tabs) ════════════════════');
    await ensureLoggedIn(page);
    await goHome(page);

    // Click on the user panel area (YANHESAP username) — NOT the gear
    const profileOpened = await page.evaluate(() => {
        const els = document.querySelectorAll('div, span');
        for (const el of els) {
            const r = el.getBoundingClientRect();
            if (r.bottom > 800 && r.left > 60 && r.left < 230) {
                const t = el.textContent.trim();
                if (t.includes('YANHESAP')) {
                    // Find the parent clickable element
                    let target = el;
                    while (target && !target.getAttribute('role') && target.tagName !== 'BUTTON') {
                        target = target.parentElement;
                    }
                    if (target) target.click();
                    else el.click();
                    return true;
                }
            }
        }
        return false;
    });
    if (profileOpened) await w(page, 2500);

    // Check if profile panel is visible
    const profileVisible = await page.evaluate(() => {
        const body = document.body.textContent;
        return body.includes('MY ACCOUNT') || body.includes('Hesabım') ||
            body.includes('Profile') || body.includes('Profil') ||
            body.includes('Badges') || body.includes('Rozetler');
    });

    if (profileVisible) {
        await ss(page, 'profile_panel_opened');

        // Profile panel tabs use .sidebar-btn class and aria-labels
        const profileTabs = [
            'Profile', 'Profil',
            'Badges & XP', 'Rozetler',
            'Inventory', 'Envanter',
            'Endorsements', 'Onaylar',
            'Security', 'Güvenlik',
            'Privacy', 'Gizlilik',
            'GDPR', 'KVKK',
            'Friends', 'Arkadaşlar',
            'Activity', 'Aktivite',
            'Custom Status', 'Özel Durum',
            'Theme', 'Tema',
            'Sounds', 'Sesler',
            'Notifications', 'Bildirimler',
            'Language', 'Dil',
            'Drafts', 'Taslaklar',
            'Bookmarks', 'Yer İmleri',
            'History', 'Geçmiş',
            'Premium',
            'Developer', 'Geliştirici',
        ];

        const clickedTabs = new Set();
        for (const tab of profileTabs) {
            // Skip if we already captured the equivalent tab
            if (clickedTabs.has(tab.toLowerCase())) continue;

            // Try clicking sidebar-btn with matching text
            const clicked = await page.evaluate((t) => {
                const btns = document.querySelectorAll('.sidebar-btn, button');
                for (const b of btns) {
                    const rect = b.getBoundingClientRect();
                    if (rect.width < 50 || rect.height < 20) continue;
                    const txt = b.textContent.trim();
                    if (txt === t || txt.startsWith(t)) {
                        b.click();
                        return txt;
                    }
                }
                return null;
            }, tab);

            if (clicked) {
                clickedTabs.add(tab.toLowerCase());
                clickedTabs.add(clicked.toLowerCase());
                await w(page, 1000);
                await ss(page, `profile_${sl(clicked)}`);

                // Scroll content
                try {
                    await page.evaluate(() => {
                        const containers = document.querySelectorAll('div');
                        for (const c of containers) {
                            const r = c.getBoundingClientRect();
                            if (r.left > 350 && r.width > 300 && r.height > 250 && c.scrollHeight > c.clientHeight + 50) {
                                c.scrollTop = c.scrollHeight; return;
                            }
                        }
                    });
                    await w(page, 300);
                } catch (_) { }
            }
        }
    } else {
        console.log('  ⚠ Profile panel did not open');
        await ss(page, 'profile_NOT_opened');
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════
    // §7. USER SETTINGS MODAL — 11 TABS
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ §7. USER SETTINGS (gear icon) ══════════════════');
    await ensureLoggedIn(page);
    await goHome(page);

    // Click the gear icon using aria-label="Settings"
    const gearClicked = await ariaClick(page, 'Settings', { wait: 2500 });
    if (!gearClicked) {
        // Fallback: find the gear icon near YANHESAP
        await page.evaluate(() => {
            const btns = document.querySelectorAll('button');
            for (const b of btns) {
                const r = b.getBoundingClientRect();
                if (r.bottom > 800 && r.left > 240 && r.right < 300) {
                    b.click(); return;
                }
            }
        });
        await w(page, 2500);
    }

    // Check if settings modal opened
    const settingsOpen = await page.evaluate(() => {
        const body = document.body.textContent;
        return body.includes('My Account') || body.includes('Hesabım') ||
            body.includes('Appearance') || body.includes('Voice & Video') ||
            body.includes('Advanced') || body.includes('Gelişmiş');
    });

    if (settingsOpen) {
        await ss(page, 'settings_opened');

        // Settings tabs from constants.js
        const settingsTabs = [
            'My Account', 'Hesabım',
            'Privacy & Security', 'Gizlilik ve Güvenlik', 'Gizlilik & Güvenlik',
            'Connections', 'Bağlantılar',
            'Appearance', 'Görünüm',
            'Voice & Video', 'Ses ve Video', 'Ses & Video',
            'Notifications', 'Bildirimler',
            'Keyboard Shortcuts', 'Klavye Kısayolları',
            'Language', 'Dil',
            'Activity Status', 'Aktivite Durumu',
            'Sessions', 'Oturumlar',
            'Advanced', 'Gelişmiş',
        ];

        const clickedSettings = new Set();
        for (const tab of settingsTabs) {
            if (clickedSettings.has(tab.toLowerCase())) continue;

            const clicked = await page.evaluate((t) => {
                const all = document.querySelectorAll('button, [role="tab"], div, span, li');
                for (const el of all) {
                    const rect = el.getBoundingClientRect();
                    if (rect.width < 60 || rect.height < 20 || rect.height > 50) continue;
                    const txt = el.textContent.trim();
                    if (txt === t) {
                        const cs = window.getComputedStyle(el);
                        if (cs.cursor === 'pointer' || el.tagName === 'BUTTON' || el.getAttribute('role')) {
                            el.click();
                            return txt;
                        }
                    }
                }
                return null;
            }, tab);

            if (clicked) {
                clickedSettings.add(tab.toLowerCase());
                clickedSettings.add(clicked.toLowerCase());
                await w(page, 1000);
                await ss(page, `settings_${sl(clicked)}`);
            }
        }
    } else {
        console.log('  ⚠ Settings modal did not open');
        await ss(page, 'settings_not_opened');
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════
    // §8. ADMIN PANEL — 15 TABS
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ §8. ADMIN PANEL (15 tabs) ══════════════════════');
    await ensureLoggedIn(page);
    await goHome(page);

    // Click "Yönetici Paneli" button
    let adminOK = await page.evaluate(() => {
        const els = document.querySelectorAll('button, [role="button"], div, span, a');
        for (const el of els) {
            const t = el.textContent.trim();
            if (t.includes('Yönetici') && t.includes('Panel')) {
                const rect = el.getBoundingClientRect();
                if (rect.width > 50) { el.click(); return true; }
            }
        }
        return false;
    });
    if (adminOK) await w(page, 3000);

    // Verify admin panel opened
    const adminVisible = await page.evaluate(() =>
        document.body.textContent.includes('Dashboard') || document.body.textContent.includes('Admin')
    );

    if (adminVisible) {
        await ss(page, 'admin_dashboard');

        // Admin tabs from AdminPanelModal.js
        const adminTabs = [
            'Dashboard', 'Users', 'Servers', 'Moderation', 'Logs',
            'Database', 'System', 'Security', 'Broadcast', 'Tools',
            'Quick Actions', 'Whitelist', 'Feature Access', 'Crypto Signals', 'Visitor Logs',
        ];

        for (const tab of adminTabs) {
            const clicked = await page.evaluate((t) => {
                const all = document.querySelectorAll('button, [role="tab"], [role="button"], div, span, li');
                for (const el of all) {
                    const rect = el.getBoundingClientRect();
                    if (rect.width < 30 || rect.height < 15 || rect.height > 50) continue;
                    const txt = el.textContent.trim();
                    if (txt === t && txt.length < 30) {
                        const cs = window.getComputedStyle(el);
                        if (cs.cursor === 'pointer' || el.tagName === 'BUTTON' || el.getAttribute('role')) {
                            el.click();
                            return true;
                        }
                    }
                }
                return false;
            }, tab);

            if (clicked) {
                await w(page, 1500);
                await ss(page, `admin_${sl(tab)}`);

                // Scroll admin content
                try {
                    await page.evaluate(() => {
                        const containers = document.querySelectorAll('div');
                        for (const c of containers) {
                            const r = c.getBoundingClientRect();
                            if (r.left > 200 && r.width > 400 && c.scrollHeight > c.clientHeight + 50) {
                                c.scrollTop = c.scrollHeight; return;
                            }
                        }
                    });
                    await w(page, 300);
                    await ss(page, `admin_${sl(tab)}_scrolled`);
                } catch (_) { }
            }
        }
    } else {
        console.log('  ⚠ Admin panel did not open');
        await ss(page, 'admin_not_opened');
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════
    // §9. EMOJI SIDEBAR BUTTONS — 9 modals with sub-tabs
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ §9. EMOJI SIDEBAR BUTTONS ══════════════════════');
    const emojis = [
        { x: 100, y: 678, name: 'payment_center' },    // 💰
        { x: 140, y: 678, name: 'store' },               // 🛒
        { x: 180, y: 678, name: 'daily_reward' },        // 🎁
        { x: 220, y: 678, name: 'leaderboard' },         // 📊
        { x: 260, y: 678, name: 'export' },              // 📥
        { x: 100, y: 717, name: 'announce' },            // 📢
        { x: 140, y: 717, name: 'games' },               // 🎮
        { x: 180, y: 717, name: 'files' },               // 📂
        { x: 220, y: 717, name: 'avatar' },              // 🎨
    ];

    for (const em of emojis) {
        await ensureLoggedIn(page);
        await goHome(page);
        await xy(page, em.x, em.y, { wait: 2000 });
        await ss(page, `emoji_${em.name}`);

        // Find and click sub-tabs inside modal
        const modalTabs = await page.evaluate(() => {
            const tabs = [];
            const seen = new Set();
            const btns = document.querySelectorAll('button, [role="tab"], [role="button"]');
            for (const b of btns) {
                const r = b.getBoundingClientRect();
                if (r.width < 40 || r.height < 15 || r.height > 50) continue;
                const t = b.textContent.trim();
                if (!t || t.length > 30 || t.length < 2 || seen.has(t)) continue;
                if (['✕', '×', 'X', '✖', '╳'].includes(t)) continue;
                seen.add(t);
                tabs.push({ text: t, x: r.x + r.width / 2, y: r.y + r.height / 2 });
            }
            return tabs.slice(0, 10);
        });

        for (const mt of modalTabs.slice(0, 6)) {
            await xy(page, mt.x, mt.y, { wait: 800 });
            await ss(page, `emoji_${em.name}_${sl(mt.text)}`);
        }

        await closeAll(page);
    }

    // ═══════════════════════════════════════════════════════════════════
    // §10. FRIENDS PAGE (via Friends card)
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ §10. FRIENDS PAGE ══════════════════════════════');
    await ensureLoggedIn(page);
    await goHome(page);

    // Click Friends card in home page
    await xy(page, 600, 340, { wait: 2500 });
    await ss(page, 'friends_page');

    // Friends sub-tabs: All, Pending, Add Friend
    for (const tab of ['All', 'Tümü', 'Pending', 'Bekleyen', 'Add Friend', 'Arkadaş Ekle']) {
        if (await partialClick(page, tab, { wait: 1000 })) {
            await ss(page, `friends_${sl(tab)}`);
        }
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════
    // §11. LEARN ENGLISH
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ §11. LEARN ENGLISH ═════════════════════════════');
    await ensureLoggedIn(page);
    await goHome(page);

    let eduOK = await page.evaluate(() => {
        const els = document.querySelectorAll('button, a, div, [role="button"]');
        for (const el of els) {
            const t = el.textContent.trim();
            if ((t.includes('Learn English') || t.includes('İngilizce Öğren')) && t.length < 40) {
                const r = el.getBoundingClientRect();
                if (r.width > 80) { el.click(); return true; }
            }
        }
        return false;
    });
    if (eduOK) await w(page, 3000);
    else await xy(page, 1275, 679, { wait: 3000 });

    await ss(page, 'learn_english');
    // Scroll
    try {
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await w(page, 500);
        await ss(page, 'learn_english_scrolled');
    } catch (_) { }

    // Look for sub-sections/tabs
    for (const tab of ['SRS', 'Kelime', 'Grammar', 'Gramer', 'A1', 'B1', 'C1']) {
        if (await partialClick(page, tab, { wait: 800 })) {
            await ss(page, `learn_english_${sl(tab)}`);
        }
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════
    // §12. CRYPTO SIGNALS
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ §12. CRYPTO SIGNALS ════════════════════════════');
    await ensureLoggedIn(page);
    await goHome(page);

    let cryptoOK = await page.evaluate(() => {
        const els = document.querySelectorAll('button, a, div, [role="button"]');
        for (const el of els) {
            const t = el.textContent.trim();
            if ((t.includes('Crypto Signals') || t.includes('Kripto Sinyalleri')) && t.length < 40) {
                const r = el.getBoundingClientRect();
                if (r.width > 80) { el.click(); return true; }
            }
        }
        return false;
    });
    if (cryptoOK) await w(page, 3000);
    else await xy(page, 1275, 728, { wait: 3000 });

    await ss(page, 'crypto_signals');
    await w(page, 2000);
    await ss(page, 'crypto_loaded');

    for (const tab of ['Tüm Stratejiler', 'Open', 'Closed', 'Performance', 'Açık', 'Kapalı', 'Performans']) {
        if (await partialClick(page, tab, { wait: 1000 })) {
            await ss(page, `crypto_${sl(tab)}`);
        }
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════
    // §13. DOWNLOAD MODAL
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ §13. DOWNLOAD MODAL ════════════════════════════');
    await ensureLoggedIn(page);
    await goHome(page);

    if (await textClick(page, 'Download', { wait: 1500 }) || await textClick(page, 'İndir', { wait: 1000 })) {
        await ss(page, 'download_modal');
    } else {
        // Download button is yellow at top-right
        await xy(page, 1082, 30, { wait: 1500 });
        await ss(page, 'download_modal_coord');
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════
    // §14. SUPPORT DEVELOPER
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ §14. SUPPORT DEVELOPER ═════════════════════════');
    await ensureLoggedIn(page);
    await goHome(page);

    if (await partialClick(page, 'Geliştiriciy', { wait: 1500 }) || await partialClick(page, 'Support', { wait: 1000 })) {
        await ss(page, 'support_developer');
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════
    // §15. ADD DM DIALOG
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ §15. ADD DM DIALOG ═════════════════════════════');
    await ensureLoggedIn(page);
    await goHome(page);

    if (await textClick(page, 'Ekle', { wait: 1500 })) {
        await ss(page, 'add_dm_dialog');
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════
    // §16. ADD SERVER FLOW
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ §16. ADD SERVER ════════════════════════════════');
    await ensureLoggedIn(page);
    await goHome(page);

    await xy(page, 33, 305, { wait: 1500 });
    await ss(page, 'add_server_popup');

    // Create Server option
    if (await partialClick(page, 'Oluştur', { wait: 1000 }) || await partialClick(page, 'Create', { wait: 1000 })) {
        await ss(page, 'create_server_dialog');
    }
    await closeAll(page);

    // Join Server
    await xy(page, 33, 305, { wait: 1500 });
    if (await partialClick(page, 'Katıl', { wait: 1000 }) || await partialClick(page, 'Join', { wait: 1000 })) {
        await ss(page, 'join_server_dialog');
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════
    // §17. NOTIFICATION BELL & THREE-DOT MENU
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ §17. NOTIFICATIONS & MENUS ═════════════════════');
    await ensureLoggedIn(page);
    await goHome(page);
    await xy(page, 33, 90, { wait: 2000 }); // Go to PawPaw server

    // Bell icon (~655, 25)
    await xy(page, 655, 25, { wait: 1000 });
    await ss(page, 'notification_bell');
    await closeAll(page);

    // Three-dot menu (~690, 25)
    await xy(page, 33, 90, { wait: 1500 });
    await xy(page, 690, 25, { wait: 1000 });
    await ss(page, 'three_dot_menu');
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════
    // §18. SERVER NAME DROPDOWN
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ §18. SERVER DROPDOWN ═══════════════════════════');
    await ensureLoggedIn(page);
    await goHome(page);
    await xy(page, 33, 90, { wait: 2000 }); // PawPaw server

    // Click server name to open dropdown
    await xy(page, 120, 25, { wait: 1000 });
    await ss(page, 'server_name_dropdown');

    // Dump dropdown items
    const dropItems = await page.evaluate(() => {
        const items = [];
        const els = document.querySelectorAll('button, [role="menuitem"], li, a, div, span');
        for (const el of els) {
            const r = el.getBoundingClientRect();
            if (r.width < 80 || r.height < 20 || r.height > 50) continue;
            const t = el.textContent.trim();
            if (t.length > 2 && t.length < 40) {
                const cs = window.getComputedStyle(el);
                if (cs.cursor === 'pointer' || el.tagName === 'BUTTON') {
                    items.push({ text: t, x: r.x + r.width / 2, y: r.y + r.height / 2 });
                }
            }
        }
        return items;
    });
    console.log(`  Dropdown: ${dropItems.map(i => i.text).join(' | ')}`);

    // Click "İçeriğe Atla" or "Davet Oluştur" or similar
    for (const item of dropItems) {
        if (/Atla|İçerik|Davet|Invite|Jump/i.test(item.text)) {
            await xy(page, item.x, item.y, { wait: 1000 });
            await ss(page, `server_dropdown_${sl(item.text)}`);
            await closeAll(page);
            break;
        }
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════
    // §19. CONTEXT MENUS
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ §19. CONTEXT MENUS ═════════════════════════════');
    await ensureLoggedIn(page);
    await goHome(page);

    // Right-click PawPaw in DM list
    const dmPos = await page.evaluate(() => {
        const els = document.querySelectorAll('div, span');
        for (const el of els) {
            const r = el.getBoundingClientRect();
            if (r.left > 80 && r.left < 260 && el.textContent.trim() === 'PawPaw' && r.height < 40) {
                return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
            }
        }
        return null;
    });
    if (dmPos) {
        await page.mouse.click(dmPos.x, dmPos.y, { button: 'right' });
        await w(page, 600);
        await ss(page, 'context_dm_right_click');
    }
    await closeAll(page);

    // Right-click server icon
    await page.mouse.click(33, 90, { button: 'right' });
    await w(page, 600);
    await ss(page, 'context_server_right_click');
    await closeAll(page);

    // Click member in server right sidebar
    await ensureLoggedIn(page);
    await goHome(page);
    await xy(page, 33, 90, { wait: 2000 });

    const memberPos = await page.evaluate(() => {
        const els = document.querySelectorAll('div, span');
        for (const el of els) {
            const r = el.getBoundingClientRect();
            if (r.left > 1100 && r.width > 50 && r.height > 15 && r.height < 40) {
                const t = el.textContent.trim();
                if (t.length > 2 && t.length < 25 && t !== 'YANHESAP' && !t.includes('—') && !t.includes('SERVER') && !t.includes('ÇEVRİM')) {
                    return { x: r.x + r.width / 2, y: r.y + r.height / 2, text: t };
                }
            }
        }
        return null;
    });
    if (memberPos) {
        await xy(page, memberPos.x, memberPos.y, { wait: 1000 });
        await ss(page, `member_popup_${sl(memberPos.text)}`);
    }
    await closeAll(page);

    // Message hover actions
    await ensureLoggedIn(page);
    await goHome(page);
    if (await textClick(page, 'PawPaw AI', { wait: 2000 })) {
        const msgPos = await page.evaluate(() => {
            const els = document.querySelectorAll('div');
            for (const el of els) {
                const r = el.getBoundingClientRect();
                if (r.left > 300 && r.left < 1000 && r.width > 200 && r.height > 30 && r.height < 200) {
                    const t = el.textContent.trim();
                    if (t.length > 10 && t.length < 500) {
                        return { x: r.x + 100, y: r.y + 15 };
                    }
                }
            }
            return null;
        });
        if (msgPos) {
            await page.mouse.move(msgPos.x, msgPos.y);
            await w(page, 800);
            await ss(page, 'message_hover_actions');
        }
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════
    // §20. SEARCH
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ §20. SEARCH ════════════════════════════════════');
    await ensureLoggedIn(page);
    await goHome(page);

    // Ctrl+K search
    try {
        await page.keyboard.press('Control+k');
        await w(page, 1000);
        await ss(page, 'search_ctrl_k');
    } catch (_) { }
    await closeAll(page);

    // Search in server
    await xy(page, 33, 90, { wait: 1500 });
    await xy(page, 505, 25, { wait: 1000 });
    await ss(page, 'search_in_server');
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════
    // §21. KEYBOARD SHORTCUTS
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ §21. KEYBOARD SHORTCUTS ════════════════════════');
    await ensureLoggedIn(page);
    await goHome(page);
    try {
        await page.keyboard.press('Control+/');
        await w(page, 1000);
        await ss(page, 'keyboard_shortcuts');
    } catch (_) { }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════
    // §22. CHAT INPUT FEATURES (in DM)
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ §22. CHAT INPUT FEATURES ═══════════════════════');
    await ensureLoggedIn(page);
    await goHome(page);

    if (await textClick(page, 'PawPaw', { wait: 2000 })) {
        await ss(page, 'dm_chat_full');

        // Find buttons near the chat input (bottom area)
        const chatBtns = await page.evaluate(() => {
            const btns = [];
            const all = document.querySelectorAll('button');
            for (const b of all) {
                const r = b.getBoundingClientRect();
                if (r.bottom > 820 && r.left > 300 && r.width < 60 && r.height < 60 && r.width > 10) {
                    btns.push({ x: r.x + r.width / 2, y: r.y + r.height / 2, title: b.title || b.getAttribute('aria-label') || 'btn' });
                }
            }
            return btns;
        });

        for (const btn of chatBtns.slice(0, 5)) {
            await xy(page, btn.x, btn.y, { wait: 800 });
            await ss(page, `chat_btn_${sl(btn.title)}`);
            await closeAll(page);
            await goHome(page);
            await textClick(page, 'PawPaw', { wait: 1500 });
        }
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════
    // §23. RESPONSIVE VIEWS
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ §23. RESPONSIVE VIEWS ══════════════════════════');

    // ── Mobile 375px ──
    await page.setViewportSize({ width: 375, height: 812 });
    await ensureLoggedIn(page);
    await w(page, 2000);
    await ss(page, 'mobile_375_home');

    // Mobile bottom nav
    for (const tab of ['Chats', 'Servers', 'Friends', 'Profile']) {
        if (await textClick(page, tab, { wait: 1500 })) {
            await ss(page, `mobile_375_${sl(tab)}`);
        }
    }

    // Click into a server on mobile
    if (await textClick(page, 'Servers', { wait: 1000 })) {
        await ss(page, 'mobile_servers_list');
        await xy(page, 188, 200, { wait: 2000 });
        await ss(page, 'mobile_server_view');
    }

    // ── Tablet 768px ──
    await page.setViewportSize({ width: 768, height: 1024 });
    await ensureLoggedIn(page);
    await w(page, 2000);
    await ss(page, 'tablet_768_home');

    // Go to server
    await xy(page, 33, 90, { wait: 1500 });
    await ss(page, 'tablet_768_server');

    // ── Back to desktop ──
    await page.setViewportSize({ width: 1440, height: 900 });
    await ensureLoggedIn(page);
    await w(page, 2000);

    // ═══════════════════════════════════════════════════════════════════
    // §24. ERROR STATES
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ §24. ERROR/404 ═════════════════════════════════');
    await page.goto(`${BASE}/this-page-does-not-exist-404`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await w(page, 2000);
    await ss(page, 'error_404');

    // Invalid route with params
    await page.goto(`${BASE}/channel/999999`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await w(page, 2000);
    await ss(page, 'error_invalid_route');

    // Go back home
    await ensureLoggedIn(page);

    // ═══════════════════════════════════════════════════════════════════
    // §25. PREMIUM STORE (via profile or emoji)
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ §25. PREMIUM STORE ═════════════════════════════');
    await ensureLoggedIn(page);
    await goHome(page);

    // Try via profile panel → Premium tab
    const profileOpenedForPremium = await page.evaluate(() => {
        const els = document.querySelectorAll('div, span');
        for (const el of els) {
            const r = el.getBoundingClientRect();
            if (r.bottom > 800 && r.left > 60 && r.left < 230 && el.textContent.trim().includes('YANHESAP')) {
                let target = el;
                while (target && !target.getAttribute('role') && target.tagName !== 'BUTTON') {
                    target = target.parentElement;
                }
                (target || el).click();
                return true;
            }
        }
        return false;
    });
    if (profileOpenedForPremium) {
        await w(page, 2000);
        if (await textClick(page, 'Premium', { wait: 1500 })) {
            await ss(page, 'premium_tab');
        }
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════
    // FINAL
    // ═══════════════════════════════════════════════════════════════════
    await ensureLoggedIn(page);
    await goHome(page);
    await ss(page, 'final_state');

    await browser.close();

    // ═══════════════════════════════════════════════════════════════════
    // REPORTS
    // ═══════════════════════════════════════════════════════════════════
    const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
    const errScreens = report.filter(r => r.errors.length + r.apiErrors.length > 0).length;

    const jsonReport = {
        date: new Date().toISOString(),
        elapsed: `${elapsed}s`,
        total: report.length,
        withErrors: errScreens,
        consoleErrors: [...new Set(allConsoleErrors)],
        apiErrors: [...new Set(allApiErrors)],
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

    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>PAWSCORD Audit v5 ${new Date().toISOString().slice(0, 10)}</title></head>
<body style="background:#111;color:#eee;font-family:system-ui;margin:0">
<h1 style="padding:16px;background:#1a1a3e;margin:0">🐾 PAWSCORD Audit v5 — ${report.length} Screenshots — ${elapsed}s</h1>
<div style="display:flex;gap:12px;padding:12px;background:#16213e">
  <div style="background:#111;padding:8px 16px;border-radius:6px;text-align:center"><div style="font-size:1.8rem;font-weight:bold">${report.length}</div><div style="font-size:.8rem;opacity:.6">Total</div></div>
  <div style="background:#111;padding:8px 16px;border-radius:6px;text-align:center"><div style="font-size:1.8rem;font-weight:bold;color:#2ecc71">${report.length - errScreens}</div><div style="font-size:.8rem;opacity:.6">Clean</div></div>
  <div style="background:#111;padding:8px 16px;border-radius:6px;text-align:center"><div style="font-size:1.8rem;font-weight:bold;color:#e74c3c">${errScreens}</div><div style="font-size:.8rem;opacity:.6">Errors</div></div>
  <div style="background:#111;padding:8px 16px;border-radius:6px;text-align:center"><div style="font-size:1.8rem;font-weight:bold;color:#f1c40f">${[...new Set(allApiErrors)].length}</div><div style="font-size:.8rem;opacity:.6">API Errors</div></div>
</div>
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(420px,1fr));gap:12px;padding:16px">${cards}</div>

<div style="padding:16px;background:#0a0a1a">
<h2>🟠 API Errors</h2>
<pre style="color:#e67e22;font-size:.8rem">${[...new Set(allApiErrors)].map(esc).join('\n') || 'None'}</pre>
<h2>🔴 Console Errors (unique)</h2>
<pre style="color:#e74c3c;font-size:.8rem">${[...new Set(allConsoleErrors)].slice(0, 30).map(esc).join('\n') || 'None'}</pre>
</div>
</body></html>`;
    fs.writeFileSync(path.join(DIR, 'audit_report.html'), html);

    console.log('\n' + '═'.repeat(60));
    console.log(`  ✅ COMPLETE — ${elapsed}s — ${report.length} screenshots`);
    console.log(`  Screens with errors: ${errScreens}`);
    console.log(`  Unique console errors: ${[...new Set(allConsoleErrors)].length}`);
    console.log(`  Unique API errors: ${[...new Set(allApiErrors)].length}`);
    console.log('═'.repeat(60));

    if (allApiErrors.length > 0) {
        console.log('\n  API Errors:');
        [...new Set(allApiErrors)].forEach(e => console.log(`    ❌ ${e}`));
    }
    if (allConsoleErrors.length > 0) {
        console.log('\n  Console Errors (top 20):');
        [...new Set(allConsoleErrors)].slice(0, 20).forEach(e => console.log(`    🔴 ${e}`));
    }

    console.log(`\n  📂 ${DIR}`);
})();
