/**
 * PAWSCORD Audit Supplement — Captures sections missed by v4
 * 2026-04-16
 * 
 * Key fix: Re-authenticates before EVERY section to prevent session expiry.
 * Skips "Hoşgeldin Kanalı" that crashes WebSocket.
 * Focuses on: Profile panel tabs, Admin panel, Emoji modals, Quick Access,
 *             Premium Store, Responsive, Context menus, Settings
 *
 * Run:  cd frontend && node audit_supplement.js
 * Appends to: ../audit_screenshots_v2/
 */
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const BASE = 'https://www.pawscord.com';
const API = 'https://api.pawscord.com';
const U = 'YANHESAP';
const P = 'YANHESAP';
const DIR = path.resolve(__dirname, '..', 'audit_screenshots_v2');
if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });

// Start numbering from 47 to continue from v4's 46 screenshots
let idx = 46;
const report = [];
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
}

async function w(page, ms = 800) { await page.waitForTimeout(ms); }

async function xy(page, x, y, opts = {}) {
    try { await page.mouse.click(x, y, opts); await w(page, opts.wait || 800); return true; } catch (_) { return false; }
}

async function textClick(page, text, opts = {}) {
    try {
        const found = await page.evaluate((t) => {
            const all = document.querySelectorAll('button, a, div, span, li, [role="button"], [role="tab"], [tabindex], h1, h2, h3, h4, p, label');
            for (const el of all) {
                const rect = el.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) continue;
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

async function partialClick(page, substr, opts = {}) {
    try {
        const found = await page.evaluate((s) => {
            const all = document.querySelectorAll('button, a, div, span, li, [role="button"]');
            for (const el of all) {
                const rect = el.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) continue;
                if (el.textContent.includes(s) && el.textContent.trim().length < s.length + 20) {
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

/** Full re-authentication: API login + set localStorage + reload */
async function ensureLoggedIn(page) {
    // Check if already logged in
    const isIn = await page.evaluate(() => document.body.textContent.includes('YANHESAP'));
    if (isIn) return true;

    console.log('  🔑 Re-authenticating...');
    try {
        // Navigate to base first
        await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 20000 });
        await w(page, 2000);

        // API login
        const resp = await page.evaluate(async ({ api, u, p }) => {
            const r = await fetch(`${api}/api/auth/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: u, password: p }),
            });
            return { status: r.status, data: await r.json() };
        }, { api: API, u: U, p: P });

        const token = resp.data?.access || resp.data?.token;
        if (!token) {
            console.log('  ⚠ Re-auth failed:', JSON.stringify(resp.data).slice(0, 100));
            return false;
        }

        await page.evaluate(t => {
            localStorage.setItem('access_token', t);
            localStorage.setItem('token', t);
            localStorage.setItem('i18nextLng', 'tr');
        }, token);

        await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 20000 });
        await w(page, 5000);

        const logged = await page.evaluate(() => document.body.textContent.includes('YANHESAP'));
        console.log(`  🔑 Re-auth: ${logged ? '✓' : '✗'}`);
        return logged;
    } catch (e) {
        console.log(`  ⚠ Re-auth error: ${e.message.slice(0, 80)}`);
        return false;
    }
}

async function goHome(page) {
    await closeAll(page);
    // Click the Pawscord logo
    await xy(page, 33, 18, { wait: 1200 });
    // Verify we're on home
    const onHome = await page.evaluate(() => document.body.textContent.includes('Good morning') || document.body.textContent.includes('Good afternoon') || document.body.textContent.includes('Good evening'));
    if (!onHome) {
        await ensureLoggedIn(page);
    }
}

(async () => {
    const t0 = Date.now();
    console.log('🐾 PAWSCORD Audit Supplement — Capturing missed sections');
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
            curErrors.push(t); consoleErrors.push(t);
        }
    });
    page.on('pageerror', err => {
        const t = 'PAGE: ' + err.message.slice(0, 250);
        curErrors.push(t); consoleErrors.push(t);
    });
    page.on('response', r => {
        if (r.status() >= 400 && r.url().includes('/api/')) {
            const e = `${r.status()} ${r.url().replace(/https?:\/\/[^/]+/, '')}`;
            if (!apiErrors.includes(e)) apiErrors.push(e);
            curApiErrors.push(e);
        }
    });

    // ── Initial Login ────────────────────────────────────────────────────
    await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 30000 });
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
    if (token) {
        await page.evaluate(t => {
            localStorage.setItem('access_token', t);
            localStorage.setItem('token', t);
            localStorage.setItem('i18nextLng', 'tr');
        }, token);
        console.log('✓ Initial login OK');
    }

    await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await w(page, 5000);

    // ═══════════════════════════════════════════════════════════════════
    // S1: PROFILE PANEL — ALL TABS
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ S1. PROFILE PANEL TABS ═════════════════════════');
    await ensureLoggedIn(page);
    await goHome(page);

    // Click YANHESAP at bottom to open profile panel
    await xy(page, 155, 830, { wait: 2000 });

    // Check if profile panel opened (should show "Profil Bilgileri" or similar)
    const profileVisible = await page.evaluate(() => {
        const body = document.body.textContent;
        return body.includes('Profil Bilgileri') || body.includes('Profile') || body.includes('MY ACCOUNT') || body.includes('Badges');
    });

    if (profileVisible) {
        await ss(page, 'S_profile_opened');

        const profileTabs = [
            'Profile', 'Badges & XP', 'Inventory', 'Endorsements',
            'Security', 'Privacy', 'GDPR',
            'Friends', 'Activity', 'Custom Status',
            'Theme', 'Sounds', 'Notifications',
            'Language', 'Drafts', 'Bookmarks', 'History',
            'Premium', 'Developer',
        ];

        for (const tab of profileTabs) {
            if (await textClick(page, tab, { wait: 1200 })) {
                await ss(page, `S_profile_${sl(tab)}`);
                // Scroll content
                try {
                    await page.evaluate(() => {
                        const containers = document.querySelectorAll('div');
                        for (const c of containers) {
                            const r = c.getBoundingClientRect();
                            if (r.left > 400 && r.width > 300 && r.height > 300 && c.scrollHeight > c.clientHeight + 50) {
                                c.scrollTop = c.scrollHeight; return;
                            }
                        }
                    });
                    await w(page, 300);
                    await ss(page, `S_profile_${sl(tab)}_scroll`);
                } catch (_) { }
            }
        }

        // Log Out button visible test
        await ss(page, 'S_profile_log_out_visible');
    } else {
        console.log('  ⚠ Profile panel did not open');
        await ss(page, 'S_profile_NOT_opened');
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════
    // S2: ADMIN PANEL — ALL TABS
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ S2. ADMIN PANEL ════════════════════════════════');
    await ensureLoggedIn(page);
    await goHome(page);

    // The button "Yönetici Paneli" is at coordinates ~(184, 631)
    // But let's also try text-based approach with special chars
    let adminOK = await page.evaluate(() => {
        const els = document.querySelectorAll('button, [role="button"], div, span, a');
        for (const el of els) {
            const t = el.textContent.trim();
            if (t.includes('Yönetici') || t.includes('Admin Panel')) {
                const rect = el.getBoundingClientRect();
                if (rect.width > 50) { el.click(); return true; }
            }
        }
        return false;
    });
    if (adminOK) await w(page, 2500);

    if (!adminOK) {
        // Try coordinate click
        await xy(page, 184, 631, { wait: 2500 });
        adminOK = await page.evaluate(() =>
            document.body.textContent.includes('Dashboard') || document.body.textContent.includes('Admin')
        );
    }

    if (adminOK) {
        await ss(page, 'S_admin_opened');

        // Dump all clickable items to find admin tabs
        const adminItems = await page.evaluate(() => {
            const items = [];
            const seen = new Set();
            const all = document.querySelectorAll('button, [role="button"], [role="tab"], li, a, div, span');
            for (const el of all) {
                const r = el.getBoundingClientRect();
                if (r.width < 30 || r.width > 300 || r.height < 15 || r.height > 50) continue;
                const t = el.textContent.trim();
                if (!t || t.length > 35 || t.length < 3 || seen.has(t)) continue;
                const cs = window.getComputedStyle(el);
                if (cs.cursor !== 'pointer' && el.tagName !== 'BUTTON' && !['button', 'tab'].includes(el.getAttribute('role'))) continue;
                seen.add(t);
                items.push({ text: t, x: r.x + r.width / 2, y: r.y + r.height / 2 });
            }
            return items;
        });

        console.log(`  Found ${adminItems.length} clickable items`);
        console.log(`  Items: ${adminItems.map(i => i.text).join(' | ')}`);

        // Click each admin-like tab
        const adminKeywords = ['Dashboard', 'Users', 'Kullanıcı', 'Servers', 'Sunucu',
            'Moderation', 'Moderasyon', 'Logs', 'Log', 'Database', 'Veritabanı',
            'System', 'Sistem', 'Security', 'Güvenlik', 'Broadcast', 'Yayın',
            'Tools', 'Araç', 'Quick', 'Hızlı', 'Whitelist', 'Beyaz',
            'Feature', 'Özellik', 'Crypto', 'Kripto', 'Visitor', 'Ziyaretçi',
            'Premium', 'Storage', 'Depolama', 'Analytics', 'Analitik'];

        const clickedAdmin = new Set();
        for (const item of adminItems) {
            const isAdmin = adminKeywords.some(k => item.text.includes(k));
            if (!isAdmin || clickedAdmin.has(item.text)) continue;
            clickedAdmin.add(item.text);
            await xy(page, item.x, item.y, { wait: 1500 });
            await ss(page, `S_admin_${sl(item.text)}`);
        }
    } else {
        console.log('  ⚠ Admin panel did not open');
        await ss(page, 'S_admin_NOT_opened');
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════
    // S3: EMOJI MODALS WITH SUB-TABS
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ S3. EMOJI MODALS (with sub-tabs) ═══════════════');
    await ensureLoggedIn(page);
    await goHome(page);

    // Emoji positions from first screenshot analysis
    const emojis = [
        { x: 100, y: 678, name: 'payment', label: '💰' },
        { x: 140, y: 678, name: 'store', label: '🛒' },
        { x: 180, y: 678, name: 'daily', label: '🎁' },
        { x: 220, y: 678, name: 'leaderboard', label: '📊' },
        { x: 260, y: 678, name: 'export', label: '📥' },
        { x: 100, y: 717, name: 'announce', label: '📢' },
        { x: 140, y: 717, name: 'games', label: '🎮' },
        { x: 180, y: 717, name: 'files', label: '📂' },
        { x: 220, y: 717, name: 'avatar', label: '🎨' },
    ];

    for (const em of emojis) {
        await ensureLoggedIn(page);
        await goHome(page);
        await xy(page, em.x, em.y, { wait: 2000 });

        // Check if a modal/panel opened by looking for new visible overlays
        const modalContent = await page.evaluate(() => {
            const body = document.body.textContent;
            // Test for known modal texts
            const patterns = ['Payment', 'Store', 'Mağaza', 'Günlük', 'Daily', 'Ödeme',
                'Liderlik', 'Leaderboard', 'Export', 'Dışa Aktar', 'Announcements', 'Duyuru',
                'Games', 'Oyun', 'Files', 'Dosya', 'Avatar', 'Studio'];
            const found = patterns.filter(p => body.includes(p));
            return found;
        });

        await ss(page, `S_emoji_${em.name}`);

        // Find and click tabs within any opened modal
        const modalTabs = await page.evaluate(() => {
            const tabs = [];
            const seen = new Set();
            // Look for tab-like buttons (usually near top of modal)
            const btns = document.querySelectorAll('button, [role="tab"], [role="button"]');
            for (const b of btns) {
                const r = b.getBoundingClientRect();
                if (r.width < 40 || r.height < 20 || r.height > 50) continue;
                // Tabs are usually near the top of the visible area (y < 200) or in a tab bar
                const t = b.textContent.trim();
                if (!t || t.length > 30 || t.length < 2 || seen.has(t)) continue;
                if (['✕', '×', 'X', '✖'].includes(t)) continue;
                seen.add(t);
                tabs.push({ text: t, x: r.x + r.width / 2, y: r.y + r.height / 2 });
            }
            return tabs.slice(0, 10);
        });

        for (const tab of modalTabs.slice(0, 6)) {
            await xy(page, tab.x, tab.y, { wait: 800 });
            await ss(page, `S_emoji_${em.name}_${sl(tab.text)}`);
        }

        await closeAll(page);
    }

    // ═══════════════════════════════════════════════════════════════════
    // S4: PREMIUM STORE (3 tabs)
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ S4. PREMIUM STORE ══════════════════════════════');
    await ensureLoggedIn(page);
    await goHome(page);

    // Try clicking the green rocket icon in left sidebar (y~190) which may be Premium
    await xy(page, 33, 190, { wait: 1500 });
    let hasPremium = await page.evaluate(() => document.body.textContent.includes('Premium'));

    if (!hasPremium) {
        // Try the shield icon
        await goHome(page);
        await xy(page, 33, 133, { wait: 1500 });
        hasPremium = await page.evaluate(() => document.body.textContent.includes('Premium'));
    }

    if (hasPremium) {
        await ss(page, 'S_premium_main');
        for (const tab of ['Premium', 'Magaza', 'Mağaza', 'Server Boost', 'Sunucu Boost']) {
            if (await textClick(page, tab, { wait: 1000 })) {
                await ss(page, `S_premium_${sl(tab)}`);
            }
        }
    } else {
        // Try "Premium Magaza" button text
        if (await partialClick(page, 'Premium', { wait: 1500 })) {
            await ss(page, 'S_premium_via_text');
        }
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════
    // S5: QUICK ACCESS — Learn English
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ S5. LEARN ENGLISH ══════════════════════════════');
    await ensureLoggedIn(page);
    await goHome(page);

    // "Learn English" is in the right sidebar QUICK ACCESS area
    // Its approximate position: x~1275, y~679 (green button)
    let eduOK = await page.evaluate(() => {
        const els = document.querySelectorAll('button, a, div, [role="button"]');
        for (const el of els) {
            const t = el.textContent.trim();
            if ((t.includes('Learn English') || t.includes('İngilizce Öğren')) && t.length < 40) {
                const r = el.getBoundingClientRect();
                if (r.width > 100) { el.click(); return true; }
            }
        }
        return false;
    });
    if (eduOK) await w(page, 3000);

    if (!eduOK) {
        await xy(page, 1275, 679, { wait: 3000 });
        eduOK = true;
    }

    await ss(page, 'S_learn_english');
    // Check if page changed
    const eduPage = await page.evaluate(() => {
        return document.body.textContent.includes('SRS') || document.body.textContent.includes('Kelime') ||
            document.body.textContent.includes('İngilizce') || document.body.textContent.includes('English');
    });
    if (eduPage) {
        await ss(page, 'S_learn_english_content');
        // Scroll
        try {
            await page.evaluate(() => {
                const main = document.querySelector('main') || document.querySelector('[class*="content"]');
                if (main) main.scrollTop = main.scrollHeight;
                else window.scrollTo(0, document.body.scrollHeight);
            });
            await w(page, 500);
            await ss(page, 'S_learn_english_scrolled');
        } catch (_) { }
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════
    // S6: CRYPTO SIGNALS
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ S6. CRYPTO SIGNALS ═════════════════════════════');
    await ensureLoggedIn(page);
    await goHome(page);

    let cryptoOK = await page.evaluate(() => {
        const els = document.querySelectorAll('button, a, div, [role="button"]');
        for (const el of els) {
            const t = el.textContent.trim();
            if ((t.includes('Crypto Signals') || t.includes('Kripto Sinyalleri')) && t.length < 40) {
                const r = el.getBoundingClientRect();
                if (r.width > 100) { el.click(); return true; }
            }
        }
        return false;
    });
    if (cryptoOK) await w(page, 3000);

    if (!cryptoOK) {
        await xy(page, 1275, 728, { wait: 3000 });
    }

    await ss(page, 'S_crypto_signals');

    // Wait for data to load
    await w(page, 3000);
    await ss(page, 'S_crypto_loaded');

    // Try strategy tabs
    for (const tab of ['Tüm', 'Açık', 'Kapalı', 'Performans', 'All', 'Open', 'Closed', 'Performance']) {
        if (await partialClick(page, tab, { wait: 1000 })) {
            await ss(page, `S_crypto_tab_${sl(tab)}`);
        }
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════
    // S7: DOWNLOAD MODAL
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ S7. DOWNLOAD & MISC ════════════════════════════');
    await ensureLoggedIn(page);
    await goHome(page);

    // Download button (yellow) at top-right, find by text
    if (await textClick(page, 'Download', { wait: 1500 }) ||
        await textClick(page, 'İndir', { wait: 1000 })) {
        await ss(page, 'S_download_modal');
    }
    await closeAll(page);

    // Support Developer
    await ensureLoggedIn(page);
    await goHome(page);
    if (await partialClick(page, 'Geliştiriciy', { wait: 1500 })) {
        await ss(page, 'S_support_developer');
    }
    await closeAll(page);

    // Add DM
    await ensureLoggedIn(page);
    await goHome(page);
    if (await textClick(page, 'Ekle', { wait: 1500 })) {
        await ss(page, 'S_add_dm_dialog');
    }
    await closeAll(page);

    // Notification bell
    await ensureLoggedIn(page);
    await goHome(page);
    // Click on server first, then look for notification bell at top
    await xy(page, 33, 85, { wait: 1500 }); // Go to PawPaw server
    // Bell icon is at top near search bar (~655, 25)
    await xy(page, 655, 25, { wait: 1000 });
    await ss(page, 'S_notification_bell');
    await closeAll(page);

    // Three-dot menu on server
    await ensureLoggedIn(page);
    await goHome(page);
    await xy(page, 33, 85, { wait: 1500 });
    // Three dots: ~(690, 25)
    await xy(page, 690, 25, { wait: 1000 });
    await ss(page, 'S_server_three_dot_menu');
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════
    // S8: ADD SERVER FLOW
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ S8. ADD SERVER ═════════════════════════════════');
    await ensureLoggedIn(page);
    await goHome(page);

    // "+" button at ~(33, 305)
    await xy(page, 33, 305, { wait: 1500 });
    await ss(page, 'S_add_server_popup');

    // Look for Create/Join options
    const addOptions = await page.evaluate(() => {
        const items = [];
        const els = document.querySelectorAll('button, [role="button"], div, span');
        for (const el of els) {
            const r = el.getBoundingClientRect();
            if (r.width > 100 && r.height > 30) {
                const t = el.textContent.trim();
                if ((t.includes('Oluştur') || t.includes('Create') || t.includes('Katıl') || t.includes('Join'))
                    && t.length < 40) {
                    items.push({ text: t, x: r.x + r.width / 2, y: r.y + r.height / 2 });
                }
            }
        }
        return items;
    });

    for (const opt of addOptions) {
        await xy(page, opt.x, opt.y, { wait: 1000 });
        await ss(page, `S_add_server_${sl(opt.text)}`);
        await closeAll(page);
        await goHome(page);
        await xy(page, 33, 305, { wait: 1000 });
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════
    // S9: CONTEXT MENUS & POPUPS
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ S9. CONTEXT MENUS ══════════════════════════════');
    await ensureLoggedIn(page);
    await goHome(page);

    // Right-click on PawPaw DM
    const dmPos = await page.evaluate(() => {
        const els = document.querySelectorAll('div, span, button');
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
        await ss(page, 'S_context_dm_pawpaw');
    }
    await closeAll(page);

    // Click on a username in server member list to get profile popup
    await ensureLoggedIn(page);
    await goHome(page);
    await xy(page, 33, 85, { wait: 2000 }); // PawPaw server

    // Find member in right sidebar and click
    const memberPos = await page.evaluate(() => {
        const els = document.querySelectorAll('div, span');
        for (const el of els) {
            const r = el.getBoundingClientRect();
            if (r.left > 1100 && r.width > 50 && r.height > 15 && r.height < 40) {
                const t = el.textContent.trim();
                if (t.length > 2 && t.length < 25 && t !== 'YANHESAP' && !t.includes('—') && !t.includes('SERVER')) {
                    return { x: r.x + r.width / 2, y: r.y + r.height / 2, text: t };
                }
            }
        }
        return null;
    });
    if (memberPos) {
        console.log(`  Clicking member: ${memberPos.text}`);
        await xy(page, memberPos.x, memberPos.y, { wait: 1000 });
        await ss(page, `S_member_popup_${sl(memberPos.text)}`);
    }
    await closeAll(page);

    // Hover over message to see action buttons
    await ensureLoggedIn(page);
    await goHome(page);
    // Go to PawPaw AI channel (which has messages)
    if (await textClick(page, 'PawPaw AI', { wait: 2000 })) {
        // Try hovering over a message
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
            await ss(page, 'S_message_hover_actions');
        }
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════
    // S10: RESPONSIVE VIEWS (with login)
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ S10. RESPONSIVE VIEWS ══════════════════════════');

    // Mobile 375
    await page.setViewportSize({ width: 375, height: 812 });
    await ensureLoggedIn(page);
    await w(page, 2000);
    await ss(page, 'S_mobile_375_home');

    // Mobile nav: Chats, Servers, Friends, Profile
    for (const tab of ['Chats', 'Servers', 'Friends', 'Profile']) {
        if (await textClick(page, tab, { wait: 1000 })) {
            await ss(page, `S_mobile_375_${sl(tab)}`);
        }
    }

    // Click a server in mobile
    await page.setViewportSize({ width: 375, height: 812 });
    if (await textClick(page, 'Servers', { wait: 1000 })) {
        await ss(page, 'S_mobile_servers_list');
        // Click first server
        await xy(page, 188, 200, { wait: 1500 });
        await ss(page, 'S_mobile_server_view');
    }

    // Tablet 768
    await page.setViewportSize({ width: 768, height: 1024 });
    await ensureLoggedIn(page);
    await w(page, 2000);
    await ss(page, 'S_tablet_768_home');

    // Go to server in tablet
    await xy(page, 33, 85, { wait: 1500 });
    await ss(page, 'S_tablet_768_server');

    // Back to desktop
    await page.setViewportSize({ width: 1440, height: 900 });

    // ═══════════════════════════════════════════════════════════════════
    // S11: ERROR STATES
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ S11. ERROR/EDGE STATES ═════════════════════════');
    await ensureLoggedIn(page);

    // 404
    await page.goto(`${BASE}/nonexistent-404`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await w(page, 2000);
    await ss(page, 'S_404_page');

    // Empty channel state (already captured in v4 with "Welcome to the chat!")
    await ensureLoggedIn(page);
    await goHome(page);

    // ═══════════════════════════════════════════════════════════════════
    // S12: SEARCH DIALOG
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ S12. SEARCH & SHORTCUTS ════════════════════════');
    await ensureLoggedIn(page);
    await goHome(page);

    // Search — click the search input at top of server
    await xy(page, 33, 85, { wait: 1500 }); // Go to server first
    // Search bar is at ~(505, 25)
    await xy(page, 505, 25, { wait: 1000 });
    await ss(page, 'S_search_clicked');

    // Ctrl+K search
    await goHome(page);
    try { await page.keyboard.press('Control+k'); await w(page, 1000); } catch (_) { }
    await ss(page, 'S_search_ctrl_k');
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════
    // S13: SERVER SETTINGS (via server name dropdown)
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ S13. SERVER SETTINGS ═══════════════════════════');
    await ensureLoggedIn(page);
    await goHome(page);
    await xy(page, 33, 85, { wait: 2000 }); // Go to PawPaw server

    // Click server name "PawPaw" at top of channel list to get dropdown
    // Server name is at ~(120, 25)
    await xy(page, 120, 25, { wait: 1000 });
    await ss(page, 'S_server_name_dropdown');

    // Look for settings option in dropdown
    const dropdownItems = await page.evaluate(() => {
        const items = [];
        const els = document.querySelectorAll('button, [role="menuitem"], [role="button"], li, a, div');
        for (const el of els) {
            const r = el.getBoundingClientRect();
            if (r.width < 80 || r.height < 20 || r.height > 50) continue;
            const t = el.textContent.trim();
            if (t.length > 2 && t.length < 40) {
                const cs = window.getComputedStyle(el);
                if (cs.cursor === 'pointer' || el.tagName === 'BUTTON' || ['menuitem', 'button'].includes(el.getAttribute('role'))) {
                    items.push({ text: t, x: r.x + r.width / 2, y: r.y + r.height / 2 });
                }
            }
        }
        return items;
    });
    console.log(`  Dropdown items: ${dropdownItems.map(i => i.text).join(' | ')}`);

    for (const item of dropdownItems.slice(0, 8)) {
        if (item.text.includes('Ayar') || item.text.includes('Settings') ||
            item.text.includes('İçe') || item.text.includes('Davet') || item.text.includes('Invite')) {
            await xy(page, item.x, item.y, { wait: 1500 });
            await ss(page, `S_server_dropdown_${sl(item.text)}`);
            await closeAll(page);
            break;
        }
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════
    // S14: DM CHAT INPUT AREA
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n══ S14. DM CHAT DETAILS ═══════════════════════════');
    await ensureLoggedIn(page);
    await goHome(page);

    if (await textClick(page, 'PawPaw', { wait: 2000 })) {
        await ss(page, 'S_dm_pawpaw_full');

        // GIF picker
        const chatBtns = await page.evaluate(() => {
            const btns = [];
            const all = document.querySelectorAll('button');
            for (const b of all) {
                const r = b.getBoundingClientRect();
                if (r.bottom > 800 && r.left > 300 && r.width < 50 && r.height < 50) {
                    btns.push({ x: r.x + r.width / 2, y: r.y + r.height / 2, title: b.title || b.getAttribute('aria-label') || '' });
                }
            }
            return btns;
        });
        console.log(`  Chat buttons: ${chatBtns.map(b => b.title).join(', ')}`);

        for (const btn of chatBtns) {
            await xy(page, btn.x, btn.y, { wait: 800 });
            await ss(page, `S_dm_btn_${sl(btn.title || 'btn')}`);
            await closeAll(page);
            // Re-navigate to DM
            await goHome(page);
            await textClick(page, 'PawPaw', { wait: 1500 });
        }
    }
    await closeAll(page);

    // ═══════════════════════════════════════════════════════════════════
    // FINAL
    // ═══════════════════════════════════════════════════════════════════
    await ensureLoggedIn(page);
    await goHome(page);
    await ss(page, 'S_final_state');

    await browser.close();

    // ═══════════════════════════════════════════════════════════════════
    // REPORT
    // ═══════════════════════════════════════════════════════════════════
    const elapsed = ((Date.now() - t0) / 1000).toFixed(1);

    // Append to existing JSON
    let existingReport = [];
    const jsonPath = path.join(DIR, 'audit_report.json');
    try {
        const existing = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        existingReport = existing.screenshots || [];
    } catch (_) { }

    const combined = [...existingReport, ...report];
    const errScreens = combined.filter(r => r.errors.length + r.apiErrors.length > 0).length;

    fs.writeFileSync(jsonPath, JSON.stringify({
        date: new Date().toISOString(),
        elapsed: `${elapsed}s (supplement)`,
        total: combined.length,
        withErrors: errScreens,
        consoleErrors: [...new Set(consoleErrors)],
        apiErrors: [...new Set(apiErrors)],
        screenshots: combined,
    }, null, 2));

    console.log('\n' + '═'.repeat(60));
    console.log(`  SUPPLEMENT COMPLETE — ${elapsed}s — ${report.length} new screenshots`);
    console.log(`  Total (combined): ${combined.length}`);
    console.log(`  Errors: ${errScreens}`);
    console.log('═'.repeat(60));

    if (apiErrors.length > 0) {
        console.log('\n  API Errors:');
        [...new Set(apiErrors)].forEach(e => console.log(`    ❌ ${e}`));
    }
    if (consoleErrors.length > 0) {
        console.log('\n  Console Errors (top 15):');
        [...new Set(consoleErrors)].slice(0, 15).forEach(e => console.log(`    🔴 ${e}`));
    }

    console.log(`\n  📂 ${DIR}`);
})();
