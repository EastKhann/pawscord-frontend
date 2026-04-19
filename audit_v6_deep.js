/**
 * PAWSCORD Full Visual Audit v6 � DEEP CLICK EVERYTHING
 * 2026-04-17
 *
 * APPROACH: Automatically discovers ALL clickable elements on every screen,
 * clicks each one, captures screenshot + console/API errors.
 * When a modal/panel opens, discovers and clicks nested clickables too.
 *
 * Run:  cd frontend && node audit_v6_deep.js
 * Output: ../audit_screenshots_v6/ (200+ PNGs + JSON + HTML report)
 */
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const BASE = 'https://www.pawscord.com';
const API = 'https://api.pawscord.com';
const U = 'YANHESAP';
const P = 'YANHESAP';
const DIR = path.resolve(__dirname, '..', 'audit_screenshots_v6');

// -- Setup --------------------------------------------------------------------
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
let savedToken = null;

function sl(n) { return n.replace(/[^a-zA-Z0-9_-]/g, '_').replace(/_+/g, '_').slice(0, 60); }

async function ss(page, label) {
    idx++;
    const num = String(idx).padStart(3, '0');
    const file = `${num}_${sl(label)}.png`;
    try { await page.screenshot({ path: path.join(DIR, file), fullPage: false }); } catch (_) { }

    // Detect DOM error boundaries
    let domErrors = [];
    try {
        domErrors = await page.evaluate(() => {
            const found = [];
            for (const el of document.querySelectorAll('div, span, p, h1, h2, h3')) {
                const t = (el.textContent || '').trim();
                if (t.length > 300 || t.length < 5) continue;
                if (/failed to load|is not defined|Something went wrong|Bir hata olu|Tekrar Dene|Try Again|Cannot read prop|undefined is not/i.test(t) && t.length < 200) {
                    found.push(t.slice(0, 150));
                }
            }
            return [...new Set(found)];
        });
        domErrors.forEach(t => curErrors.push(`DOM: ${t}`));
    } catch (_) { }

    const entry = {
        idx, label, file,
        errors: [...curErrors],
        apiErrors: [...curApiErrors],
        domErrors,
        timestamp: new Date().toISOString(),
    };
    report.push(entry);
    const errN = entry.errors.length + entry.apiErrors.length;
    console.log(`${errN > 0 ? '??' : '??'} [${num}] ${label}${errN ? ` (${errN} err)` : ''}`);
    curErrors = [];
    curApiErrors = [];
    return entry;
}

async function w(page, ms = 800) { await page.waitForTimeout(ms); }

async function xy(page, x, y, opts = {}) {
    try { await page.mouse.click(x, y, opts); await w(page, opts.wait || 800); return true; } catch (_) { return false; }
}

async function ariaClick(page, label, opts = {}) {
    try {
        const el = page.locator(`[aria-label="${label}"]`).first();
        if (await el.isVisible({ timeout: opts.timeout || 2000 })) {
            await el.click();
            await w(page, opts.wait || 800);
            return true;
        }
    } catch (_) { }
    return false;
}

async function textClick(page, text, opts = {}) {
    try {
        const found = await page.evaluate((t) => {
            const all = document.querySelectorAll('button, a, div, span, li, [role="button"], [role="tab"], [tabindex], label');
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

async function closeAll(page) {
    for (let i = 0; i < 5; i++) {
        try { await page.keyboard.press('Escape'); } catch (_) { }
        await w(page, 120);
    }
    try {
        await page.evaluate(() => {
            for (const el of document.querySelectorAll('button, [role="button"], span')) {
                const t = el.textContent.trim();
                if (['?', '�', '?', 'X', '?'].includes(t) && el.getBoundingClientRect().width > 0) {
                    el.click(); return;
                }
            }
        });
    } catch (_) { }
    await w(page, 200);
}

async function ensureLoggedIn(page) {
    try {
        const isIn = await page.evaluate(() => document.body?.textContent?.includes('YANHESAP'));
        if (isIn) return true;
    } catch (_) { }
    console.log('  ?? Re-authenticating...');
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
        if (!token) return false;
        savedToken = token;
        await page.evaluate(t => {
            localStorage.setItem('access_token', t);
            localStorage.setItem('token', t);
            localStorage.setItem('pawscord_language', 'tr');
            localStorage.setItem('i18nextLng', 'tr');
        }, token);
        await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 25000 });
        await w(page, 10000);
        return await page.evaluate(() => document.body.textContent.includes('YANHESAP'));
    } catch (e) {
        console.log(`  ? Re-auth error: ${e.message.slice(0, 80)}`);
        return false;
    }
}

async function goHome(page) {
    await closeAll(page);
    // Check if already on home with user logged in
    const alreadyHome = await page.evaluate(() => document.body.textContent.includes('YANHESAP'));
    if (!alreadyHome) {
        await ensureLoggedIn(page);
        return;
    }
    // Navigate to home tab
    await xy(page, 33, 18, { wait: 2000 });
    await w(page, 1000);
}

/**
 * CORE: Discover all clickable elements on current screen
 * Returns array of { text, tag, x, y, w, h, ariaLabel, role, id, classes }
 */
async function discoverClickables(page, region = null) {
    return await page.evaluate((reg) => {
        const results = [];
        const seen = new Set();
        const selectors = 'button, a, [role="button"], [role="tab"], [role="menuitem"], [role="option"], [role="link"], [tabindex], input[type="submit"], input[type="button"], label[for], summary, details > summary, [onclick]';
        const all = document.querySelectorAll(selectors);

        // Also get any element with cursor:pointer
        const allEls = document.querySelectorAll('div, span, li, img, svg, i, p');
        const cursorPointers = [];
        for (const el of allEls) {
            try {
                const cs = window.getComputedStyle(el);
                if (cs.cursor === 'pointer' && el.offsetParent !== null) {
                    cursorPointers.push(el);
                }
            } catch (_) { }
        }

        const elList = [...new Set([...all, ...cursorPointers])];

        for (const el of elList) {
            try {
                const rect = el.getBoundingClientRect();
                if (rect.width < 10 || rect.height < 10 || rect.width > 1400 || rect.height > 800) continue;

                // Region filter
                if (reg) {
                    if (rect.x < reg.left || rect.x > reg.right || rect.y < reg.top || rect.y > reg.bottom) continue;
                }

                // Visibility check
                const cs = window.getComputedStyle(el);
                if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') continue;

                const cx = Math.round(rect.x + rect.width / 2);
                const cy = Math.round(rect.y + rect.height / 2);
                const key = `${cx}_${cy}`;
                if (seen.has(key)) continue;
                seen.add(key);

                const text = (el.textContent || '').trim().slice(0, 60);
                const ariaLabel = el.getAttribute('aria-label') || '';
                const role = el.getAttribute('role') || '';
                const title = el.getAttribute('title') || '';
                const id = el.id || '';
                const tag = el.tagName.toLowerCase();
                const classes = (el.className?.toString?.() || '').slice(0, 80);

                results.push({
                    text, tag, x: cx, y: cy,
                    w: Math.round(rect.width), h: Math.round(rect.height),
                    ariaLabel, role, title, id, classes,
                    label: ariaLabel || title || text || `${tag}@${cx},${cy}`,
                });
            } catch (_) { }
        }

        // Sort by position (top-left first)
        results.sort((a, b) => (a.y - b.y) || (a.x - b.x));
        return results;
    }, region);
}

/**
 * Get a "snapshot" of the current DOM state (for detecting changes after click)
 */
async function getDOMSnapshot(page) {
    return await page.evaluate(() => {
        const dialogs = document.querySelectorAll('[role="dialog"], [role="presentation"], [class*="modal"], [class*="Modal"], [class*="overlay"], [class*="Overlay"], [class*="popup"], [class*="Popup"]');
        const texts = [];
        for (const d of dialogs) {
            texts.push(d.textContent.slice(0, 200));
        }
        return {
            dialogCount: dialogs.length,
            dialogTexts: texts,
            url: location.href,
            bodyLen: document.body.textContent.length,
        };
    });
}

/**
 * Check if a new modal/panel opened after a click
 */
async function detectNewContent(page, beforeSnap) {
    const after = await getDOMSnapshot(page);
    return {
        newModal: after.dialogCount > beforeSnap.dialogCount,
        urlChanged: after.url !== beforeSnap.url,
        contentChanged: Math.abs(after.bodyLen - beforeSnap.bodyLen) > 200,
        dialogCount: after.dialogCount,
    };
}

// ------------------------------------------------------------------------------
(async () => {
    const t0 = Date.now();
    console.log('?? PAWSCORD Full Audit v6 � DEEP CLICK EVERYTHING');
    console.log('-'.repeat(65));

    const browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
    });
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        locale: 'tr-TR',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36',
    });
    const page = await ctx.newPage();

    page.on('console', msg => {
        if (msg.type() === 'error') {
            const t = msg.text().slice(0, 300);
            if (/favicon|sw\.js|service.worker/i.test(t)) return;
            curErrors.push(t); allConsoleErrors.push(t);
        }
    });
    page.on('pageerror', err => {
        const t = 'PAGE: ' + err.message.slice(0, 300);
        curErrors.push(t); allConsoleErrors.push(t);
    });
    page.on('response', r => {
        if (r.status() >= 400 && r.url().includes('/api/')) {
            const e = `${r.status()} ${r.url().replace(/https?:\/\/[^/]+/, '')}`;
            if (!allApiErrors.includes(e)) allApiErrors.push(e);
            curApiErrors.push(e);
        }
    });

    // -------------------------------------------------------------------
    // �1. LOGIN
    // -------------------------------------------------------------------
    console.log('\n-- �1. LOGIN ---------------------------------------');
    await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await w(page, 4000);
    await ss(page, 'login_page');

    // Click all login page clickables
    const loginClickables = await discoverClickables(page);
    console.log(`  Login page clickables: ${loginClickables.length}`);
    for (const c of loginClickables) {
        if (c.tag === 'input' || c.text.includes('Giris') || c.text.includes('Login')) continue; // Don't click submit yet
        console.log(`    ? ${c.label} (${c.tag} @ ${c.x},${c.y})`);
    }

    // Clickable links on login page (sign up, forgot password, etc.)
    for (const c of loginClickables) {
        if (c.tag === 'a' || (c.text && /kayit|register|sign up|sifre|forgot|password/i.test(c.text + c.ariaLabel))) {
            const before = await getDOMSnapshot(page);
            await xy(page, c.x, c.y, { wait: 1500 });
            const change = await detectNewContent(page, before);
            await ss(page, `login_click_${sl(c.label)}`);
            if (change.urlChanged || change.newModal) {
                // Discover sub-clickables
                const subClickables = await discoverClickables(page);
                console.log(`    Opened: ${subClickables.length} sub-clickables`);
                await page.goBack().catch(() => { });
                await w(page, 2000);
            }
        }
    }

    // Actually login
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
        token = resp.data?.access || resp.data?.token || null;
        savedToken = token;
        console.log(`  Login: ${resp.status} ${token ? '?' : '?'}`);
    } catch (e) {
        console.log(`  Login error: ${e.message.slice(0, 100)}`);
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
    await w(page, 10000);
    await ss(page, 'after_login');

    // -------------------------------------------------------------------
    // �2. HOME PAGE � Click ALL elements
    // -------------------------------------------------------------------
    console.log('\n-- �2. HOME PAGE � ALL CLICKABLES -----------------');
    await goHome(page);
    await ss(page, 'home_full');

    const homeClickables = await discoverClickables(page);
    console.log(`  Home clickables found: ${homeClickables.length}`);

    // Group by region
    const homeSidebar = homeClickables.filter(c => c.x < 280);
    const homeMain = homeClickables.filter(c => c.x >= 280);

    console.log(`  Sidebar: ${homeSidebar.length}, Main: ${homeMain.length}`);

    // Click each main area clickable
    for (const c of homeMain) {
        // Skip tiny elements, scrollbar, etc.
        if (c.w < 20 || c.h < 15) continue;
        console.log(`  ? [main] ${c.label} (${c.tag} ${c.w}x${c.h} @ ${c.x},${c.y})`);

        const before = await getDOMSnapshot(page);
        await goHome(page);
        await xy(page, c.x, c.y, { wait: 1500 });
        const change = await detectNewContent(page, before);
        await ss(page, `home_click_${sl(c.label)}`);

        // If new content opened, explore it
        if (change.newModal || change.contentChanged) {
            console.log(`    ? NEW CONTENT (modal=${change.newModal}, changed=${change.contentChanged})`);

            // Find clickables inside the new content
            const subClickables = await discoverClickables(page);
            const newItems = subClickables.filter(sc =>
                !homeClickables.some(hc => Math.abs(hc.x - sc.x) < 10 && Math.abs(hc.y - sc.y) < 10)
            );

            console.log(`    ? ${newItems.length} new sub-clickables`);
            for (const sc of newItems.slice(0, 15)) { // Limit to 15 per modal
                if (sc.w < 20 || sc.h < 15) continue;
                // Don't click destructive actions
                if (/delete|sil|kaldir|remove|�ik|leave|logout/i.test(sc.text + sc.ariaLabel)) {
                    console.log(`      ? SKIP destructive: ${sc.label}`);
                    continue;
                }
                console.log(`      ? [sub] ${sc.label} (${sc.tag} @ ${sc.x},${sc.y})`);
                await xy(page, sc.x, sc.y, { wait: 1000 });
                await ss(page, `home_sub_${sl(c.label)}_${sl(sc.label)}`);
            }
        }
    }

    // -------------------------------------------------------------------
    // �3. SIDEBAR BUTTONS � Click each server rail icon + DM items
    // -------------------------------------------------------------------
    console.log('\n-- �3. SIDEBAR � ALL CLICKABLES -------------------');
    await goHome(page);

    for (const c of homeSidebar) {
        if (c.w < 15 || c.h < 15) continue;
        // Skip known safe re-navigation
        if (/logo|pawscord/i.test(c.ariaLabel + c.title + c.classes)) continue;

        console.log(`  ? [sidebar] ${c.label} (${c.tag} ${c.w}x${c.h} @ ${c.x},${c.y})`);

        const before = await getDOMSnapshot(page);
        await goHome(page);
        await xy(page, c.x, c.y, { wait: 2000 });
        const change = await detectNewContent(page, before);
        await ss(page, `sidebar_click_${sl(c.label)}`);

        if (change.newModal || change.contentChanged) {
            console.log(`    ? NEW CONTENT opened`);

            const subClickables = await discoverClickables(page);
            const newItems = subClickables.filter(sc =>
                !homeSidebar.some(hc => Math.abs(hc.x - sc.x) < 10 && Math.abs(hc.y - sc.y) < 10)
            );

            console.log(`    ? ${newItems.length} new sub-clickables`);
            for (const sc of newItems.slice(0, 20)) {
                if (sc.w < 20 || sc.h < 15) continue;
                if (/delete|sil|kaldir|remove|�ik|leave|logout/i.test(sc.text + sc.ariaLabel)) continue;
                console.log(`      ? [sub] ${sc.label} (${sc.tag} @ ${sc.x},${sc.y})`);
                await xy(page, sc.x, sc.y, { wait: 1000 });
                await ss(page, `sidebar_sub_${sl(c.label)}_${sl(sc.label)}`);

                // Third level: check if THIS opened something new
                const sub2Before = await getDOMSnapshot(page);
                const sub2Change = await detectNewContent(page, sub2Before);
                if (sub2Change.newModal) {
                    const sub3 = await discoverClickables(page);
                    const newest = sub3.filter(s3 =>
                        !subClickables.some(sc2 => Math.abs(sc2.x - s3.x) < 10 && Math.abs(sc2.y - s3.y) < 10)
                    );
                    for (const s3 of newest.slice(0, 8)) {
                        if (s3.w < 20 || s3.h < 15) continue;
                        if (/delete|sil|kaldir|remove|�ik|leave|logout/i.test(s3.text + s3.ariaLabel)) continue;
                        console.log(`        ? [L3] ${s3.label}`);
                        await xy(page, s3.x, s3.y, { wait: 800 });
                        await ss(page, `L3_${sl(c.label)}_${sl(sc.label)}_${sl(s3.label)}`);
                    }
                    await closeAll(page);
                }
            }

            await closeAll(page);
        }
    }

    // -------------------------------------------------------------------
    // �4. DM CONVERSATIONS � Click each, then click elements inside
    // -------------------------------------------------------------------
    console.log('\n-- �4. DM CONVERSATIONS � DEEP --------------------');
    await ensureLoggedIn(page);
    await goHome(page);

    const dmContacts = await page.evaluate(() => {
        const items = [];
        const seen = new Set();
        for (const el of document.querySelectorAll('div, span, li')) {
            const r = el.getBoundingClientRect();
            if (r.left < 60 || r.left > 260 || r.top < 100 || r.top > 700 || r.height < 15 || r.height > 55) continue;
            const t = el.textContent.trim();
            if (!t || t.length > 30 || t.length < 2 || seen.has(t)) continue;
            if (/DIRECT|DOGRUDAN|MESAJ|MESSAGE|Ekle|Add/i.test(t)) continue;
            const cs = window.getComputedStyle(el);
            if (cs.cursor !== 'pointer' && el.tagName !== 'BUTTON' && !el.getAttribute('role')) continue;
            seen.add(t);
            items.push({ text: t, x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2) });
        }
        return items;
    });
    console.log(`  DM contacts: ${dmContacts.map(c => c.text).join(', ')}`);

    for (const dm of dmContacts.slice(0, 6)) {
        await goHome(page);
        await xy(page, dm.x, dm.y, { wait: 2000 });
        await ss(page, `dm_${sl(dm.text)}_chat`);

        // Discover clickables in the chat area (right side)
        const chatClickables = await discoverClickables(page, { left: 280, right: 1440, top: 0, bottom: 900 });
        console.log(`    Chat clickables: ${chatClickables.length}`);

        for (const cc of chatClickables.slice(0, 10)) {
            if (cc.w < 15 || cc.h < 15) continue;
            if (/delete|sil|kaldir|remove|�ik|leave|logout|g�nder|send/i.test(cc.text + cc.ariaLabel)) continue;
            // Don't click message input
            if (cc.tag === 'textarea' || cc.tag === 'input') continue;

            const before = await getDOMSnapshot(page);
            await xy(page, cc.x, cc.y, { wait: 1000 });
            const change = await detectNewContent(page, before);
            await ss(page, `dm_${sl(dm.text)}_click_${sl(cc.label)}`);

            if (change.newModal) {
                console.log(`      ? Modal opened from: ${cc.label}`);
                // Click stuff inside modal
                const modalClickables = await discoverClickables(page);
                const newOnes = modalClickables.filter(mc =>
                    !chatClickables.some(c2 => Math.abs(c2.x - mc.x) < 10 && Math.abs(c2.y - mc.y) < 10)
                );
                for (const mc of newOnes.slice(0, 8)) {
                    if (/delete|sil|kaldir|remove|�ik|leave|logout/i.test(mc.text + mc.ariaLabel)) continue;
                    await xy(page, mc.x, mc.y, { wait: 800 });
                    await ss(page, `dm_modal_${sl(dm.text)}_${sl(mc.label)}`);
                }
                await closeAll(page);
            }
        }
    }

    // -------------------------------------------------------------------
    // �5. SERVERS � Each server, each channel, click all elements inside
    // -------------------------------------------------------------------
    console.log('\n-- �5. SERVERS & CHANNELS � DEEP ------------------');
    const serverYPositions = [90, 140, 195, 250, 305];

    for (let si = 0; si < serverYPositions.length; si++) {
        await ensureLoggedIn(page);
        await goHome(page);
        await xy(page, 33, serverYPositions[si], { wait: 2500 });

        const serverName = await page.evaluate(() => {
            for (const el of document.querySelectorAll('h1, h2, h3, div, span')) {
                const r = el.getBoundingClientRect();
                if (r.left > 60 && r.left < 300 && r.top < 45 && r.height > 10 && r.height < 40) {
                    const t = el.textContent.trim();
                    if (t.length > 1 && t.length < 40 && !['Ana Sayfa', 'Home'].includes(t)) return t;
                }
            }
            return null;
        });

        if (!serverName) { console.log(`  Server ${si}: not found`); continue; }
        console.log(`  Server ${si}: ${serverName}`);
        await ss(page, `server_${si}_${sl(serverName)}`);

        // Click server header (usually opens server settings/info)
        const headerBefore = await getDOMSnapshot(page);
        await xy(page, 180, 25, { wait: 1500 });
        const headerChange = await detectNewContent(page, headerBefore);
        if (headerChange.newModal || headerChange.contentChanged) {
            await ss(page, `server_${si}_header_menu`);
            // Click items in server menu
            const menuItems = await discoverClickables(page, { left: 60, right: 400, top: 30, bottom: 400 });
            for (const mi of menuItems.slice(0, 10)) {
                if (/delete|sil|kaldir|remove|�ik|leave|ayril/i.test(mi.text + mi.ariaLabel)) continue;
                await xy(page, mi.x, mi.y, { wait: 1000 });
                await ss(page, `server_${si}_menu_${sl(mi.label)}`);
                await closeAll(page);
                // Re-open if needed
                await xy(page, 180, 25, { wait: 1000 });
            }
            await closeAll(page);
        }

        // Get channels
        const channels = await page.evaluate(() => {
            const items = [];
            const seen = new Set();
            for (const el of document.querySelectorAll('div, span, a, button, li, [role="button"]')) {
                const r = el.getBoundingClientRect();
                if (r.left < 60 || r.left > 290 || r.width < 50 || r.height < 15 || r.height > 50 || r.top < 50) continue;
                const t = el.textContent.trim();
                if (!t || t.length > 40 || t.length < 2 || seen.has(t)) continue;
                if (/^(BOT|METIN|SES|KANALLARI|CHANNELS|TEXT|VOICE|FORUM)$/i.test(t)) continue;
                const cs = window.getComputedStyle(el);
                if (cs.cursor !== 'pointer' && el.tagName !== 'BUTTON') continue;
                seen.add(t);
                items.push({ text: t, x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2) });
            }
            return items;
        });
        console.log(`    Channels: ${channels.map(c => c.text).join(', ')}`);

        for (let ci = 0; ci < Math.min(channels.length, 10); ci++) {
            const ch = channels[ci];
            if (/Hosgeldin|Hosgeldin/i.test(ch.text)) continue; // Crashes WS

            await xy(page, 33, serverYPositions[si], { wait: 1500 });
            await xy(page, ch.x, ch.y, { wait: 2000 });
            await ss(page, `server_${si}_ch_${ci}_${sl(ch.text)}`);

            // Discover clickables in channel content area
            const chClickables = await discoverClickables(page, { left: 280, right: 1440, top: 0, bottom: 900 });
            console.log(`      Channel "${ch.text}" clickables: ${chClickables.length}`);

            // Click header buttons (pin, search, members, etc.)
            const headerBtns = chClickables.filter(c => c.y < 60 && c.x > 300);
            for (const hb of headerBtns) {
                if (/delete|sil/i.test(hb.text + hb.ariaLabel)) continue;
                const before = await getDOMSnapshot(page);
                await xy(page, hb.x, hb.y, { wait: 1000 });
                const change = await detectNewContent(page, before);
                await ss(page, `server_${si}_ch${ci}_hdr_${sl(hb.label)}`);

                if (change.newModal) {
                    const modalItems = await discoverClickables(page);
                    for (const mi of modalItems.slice(0, 5)) {
                        if (/delete|sil/i.test(mi.text + mi.ariaLabel)) continue;
                        await xy(page, mi.x, mi.y, { wait: 800 });
                        await ss(page, `server_${si}_ch${ci}_modal_${sl(mi.label)}`);
                    }
                    await closeAll(page);
                }
            }

            // Right-click on a message (context menu)
            try {
                const msgEl = await page.evaluate(() => {
                    for (const el of document.querySelectorAll('div')) {
                        const r = el.getBoundingClientRect();
                        if (r.left > 300 && r.width > 200 && r.height > 30 && r.height < 150 && r.top > 80 && r.top < 700) {
                            const t = el.textContent.trim();
                            if (t.length > 10 && t.length < 500) {
                                return { x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2) };
                            }
                        }
                    }
                    return null;
                });
                if (msgEl) {
                    await page.mouse.click(msgEl.x, msgEl.y, { button: 'right' });
                    await w(page, 800);
                    await ss(page, `server_${si}_ch${ci}_context_menu`);

                    // Click items in context menu
                    const ctxItems = await discoverClickables(page, { left: msgEl.x - 50, right: msgEl.x + 250, top: msgEl.y - 50, bottom: msgEl.y + 300 });
                    for (const ci2 of ctxItems.slice(0, 5)) {
                        if (/delete|sil|kaldir|ban|kick/i.test(ci2.text + ci2.ariaLabel)) continue;
                        await xy(page, ci2.x, ci2.y, { wait: 800 });
                        await ss(page, `server_${si}_ctx_${sl(ci2.label)}`);
                        await closeAll(page);
                    }
                    await closeAll(page);
                }
            } catch (_) { }
        }
    }

    // -------------------------------------------------------------------
    // �6. SETTINGS � Open + click ALL tabs + elements inside each tab
    // -------------------------------------------------------------------
    console.log('\n-- �6. SETTINGS � ALL TABS + INNER ELEMENTS ------');
    await ensureLoggedIn(page);
    await goHome(page);

    const gearClicked = await ariaClick(page, 'Settings', { wait: 2500 });
    if (!gearClicked) {
        // Fallback: find gear near bottom-left
        await page.evaluate(() => {
            for (const b of document.querySelectorAll('button')) {
                const r = b.getBoundingClientRect();
                if (r.bottom > 800 && r.left > 240 && r.right < 300) { b.click(); return; }
            }
        });
        await w(page, 2500);
    }

    const settingsVisible = await page.evaluate(() =>
        /My Account|Hesabim|Appearance|G�r�n�m|Voice.*Video|Ses.*Video/.test(document.body.textContent)
    );

    if (settingsVisible) {
        await ss(page, 'settings_opened');

        // Discover settings sidebar tabs
        const settingsTabs = await page.evaluate(() => {
            const tabs = [];
            const seen = new Set();
            for (const el of document.querySelectorAll('button, div, span, [role="tab"], li')) {
                const r = el.getBoundingClientRect();
                if (r.left > 350 || r.width < 60 || r.height < 20 || r.height > 50 || r.top < 50) continue;
                const t = el.textContent.trim();
                if (!t || t.length > 40 || t.length < 3 || seen.has(t)) continue;
                const cs = window.getComputedStyle(el);
                if (cs.cursor !== 'pointer' && el.tagName !== 'BUTTON') continue;
                seen.add(t);
                tabs.push({ text: t, x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2) });
            }
            return tabs;
        });
        console.log(`  Settings tabs: ${settingsTabs.map(t => t.text).join(', ')}`);

        for (const tab of settingsTabs) {
            // Re-open settings if closed
            const stillOpen = await page.evaluate(() =>
                /My Account|Hesabim|Appearance|G�r�n�m/.test(document.body.textContent)
            );
            if (!stillOpen) {
                await goHome(page);
                await ariaClick(page, 'Settings', { wait: 2500 });
            }

            await xy(page, tab.x, tab.y, { wait: 1500 });
            await ss(page, `settings_tab_${sl(tab.text)}`);

            // Discover clickables in the settings content area (right panel)
            const tabClickables = await discoverClickables(page, { left: 350, right: 1200, top: 50, bottom: 850 });
            console.log(`    Tab "${tab.text}": ${tabClickables.length} inner clickables`);

            for (const tc of tabClickables.slice(0, 10)) {
                if (tc.w < 20 || tc.h < 15) continue;
                if (/delete|sil|kaldir|deactivate|devre|logout|�ik/i.test(tc.text + tc.ariaLabel)) continue;
                if (tc.tag === 'input' || tc.tag === 'textarea') continue;

                const before = await getDOMSnapshot(page);
                await xy(page, tc.x, tc.y, { wait: 800 });
                const change = await detectNewContent(page, before);

                if (change.newModal) {
                    await ss(page, `settings_${sl(tab.text)}_modal_${sl(tc.label)}`);
                    await closeAll(page);
                }
            }

            // Scroll settings content
            try {
                await page.evaluate(() => {
                    for (const c of document.querySelectorAll('div')) {
                        const r = c.getBoundingClientRect();
                        if (r.left > 350 && r.width > 300 && c.scrollHeight > c.clientHeight + 50) {
                            c.scrollTop = c.scrollHeight; return;
                        }
                    }
                });
                await w(page, 300);
                await ss(page, `settings_${sl(tab.text)}_scrolled`);
            } catch (_) { }
        }
    } else {
        console.log('  ? Settings did not open');
        await ss(page, 'settings_FAILED');
    }
    await closeAll(page);

    // -------------------------------------------------------------------
    // �7. PROFILE PANEL � Click username + ALL tabs + inner elements
    // -------------------------------------------------------------------
    console.log('\n-- �7. PROFILE PANEL � ALL TABS + INNER -----------');
    await ensureLoggedIn(page);
    await goHome(page);

    // Click YANHESAP username at bottom
    const profileOpened = await page.evaluate(() => {
        for (const el of document.querySelectorAll('div, span')) {
            const r = el.getBoundingClientRect();
            if (r.bottom > 800 && r.left > 60 && r.left < 230) {
                if (el.textContent.trim().includes('YANHESAP')) {
                    let t = el;
                    while (t && !t.getAttribute('role') && t.tagName !== 'BUTTON') t = t.parentElement;
                    (t || el).click();
                    return true;
                }
            }
        }
        return false;
    });
    if (profileOpened) await w(page, 2500);

    const profileVis = await page.evaluate(() =>
        /Badges|Rozetler|Profile|Profil|Endorsements|Onaylar/i.test(document.body.textContent)
    );

    if (profileVis) {
        await ss(page, 'profile_panel');

        // Discover profile tabs
        const profileTabs = await page.evaluate(() => {
            const tabs = [];
            const seen = new Set();
            for (const el of document.querySelectorAll('.sidebar-btn, button, [role="tab"]')) {
                const r = el.getBoundingClientRect();
                if (r.width < 50 || r.height < 20 || r.height > 50) continue;
                const t = el.textContent.trim();
                if (!t || t.length > 35 || seen.has(t)) continue;
                seen.add(t);
                tabs.push({ text: t, x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2) });
            }
            return tabs;
        });
        console.log(`  Profile tabs: ${profileTabs.map(t => t.text).join(', ')}`);

        for (const tab of profileTabs) {
            await xy(page, tab.x, tab.y, { wait: 1200 });
            await ss(page, `profile_${sl(tab.text)}`);

            // Discover inner clickables
            const innerClickables = await discoverClickables(page, { left: 350, right: 1200, top: 50, bottom: 850 });
            for (const ic of innerClickables.slice(0, 8)) {
                if (ic.w < 20 || ic.h < 15) continue;
                if (/delete|sil|kaldir|deactivate|logout|�ik/i.test(ic.text + ic.ariaLabel)) continue;
                if (ic.tag === 'input' || ic.tag === 'textarea') continue;

                const before = await getDOMSnapshot(page);
                await xy(page, ic.x, ic.y, { wait: 800 });
                const change = await detectNewContent(page, before);
                if (change.newModal) {
                    await ss(page, `profile_${sl(tab.text)}_modal_${sl(ic.label)}`);
                    await closeAll(page);
                }
            }

            // Scroll
            try {
                await page.evaluate(() => {
                    for (const c of document.querySelectorAll('div')) {
                        const r = c.getBoundingClientRect();
                        if (r.left > 350 && r.width > 300 && c.scrollHeight > c.clientHeight + 50) {
                            c.scrollTop = c.scrollHeight; return;
                        }
                    }
                });
                await w(page, 300);
            } catch (_) { }
        }
    } else {
        console.log('  ? Profile panel did not open');
        await ss(page, 'profile_NOT_opened');
    }
    await closeAll(page);

    // -------------------------------------------------------------------
    // �8. ADMIN PANEL � ALL tabs + inner clickables
    // -------------------------------------------------------------------
    console.log('\n-- �8. ADMIN PANEL � ALL TABS + INNER -------------');
    await ensureLoggedIn(page);
    await goHome(page);

    let adminOK = await page.evaluate(() => {
        for (const el of document.querySelectorAll('button, [role="button"], div, span, a')) {
            const t = el.textContent.trim();
            if ((t.includes('Y�netici') && t.includes('Panel')) || t.includes('Admin Panel')) {
                const rect = el.getBoundingClientRect();
                if (rect.width > 50) { el.click(); return true; }
            }
        }
        return false;
    });
    if (adminOK) await w(page, 3000);

    const adminVis = await page.evaluate(() =>
        /Dashboard|Admin|Y�netici|Users|Kullanicilar/.test(document.body.textContent) &&
        document.querySelectorAll('[class*="admin"], [class*="Admin"]').length > 0
    );

    if (adminVis) {
        await ss(page, 'admin_opened');

        // Admin tabs
        const adminTabNames = [
            'Dashboard', 'Users', 'Servers', 'Moderation', 'Logs',
            'Database', 'System', 'Security', 'Broadcast', 'Tools',
            'Quick Actions', 'Whitelist', 'Feature Access', 'Crypto Signals', 'Visitor Logs',
        ];

        for (const tabName of adminTabNames) {
            const clicked = await page.evaluate((t) => {
                for (const el of document.querySelectorAll('button, [role="tab"], [role="button"], div, span')) {
                    const rect = el.getBoundingClientRect();
                    if (rect.width < 30 || rect.height < 15 || rect.height > 50) continue;
                    const txt = el.textContent.trim();
                    if (txt === t && txt.length < 30) {
                        const cs = window.getComputedStyle(el);
                        if (cs.cursor === 'pointer' || el.tagName === 'BUTTON' || el.getAttribute('role')) {
                            el.click(); return true;
                        }
                    }
                }
                return false;
            }, tabName);

            if (!clicked) { console.log(`    ? Admin tab "${tabName}" not found`); continue; }
            await w(page, 1500);
            await ss(page, `admin_${sl(tabName)}`);

            // Discover inner clickables
            const tabClickables = await discoverClickables(page, { left: 200, right: 1400, top: 50, bottom: 850 });
            console.log(`    Admin "${tabName}": ${tabClickables.length} inner clickables`);

            for (const tc of tabClickables.slice(0, 12)) {
                if (tc.w < 20 || tc.h < 15) continue;
                if (/delete|sil|kaldir|ban|kick|reset|purge|broadcast|yayin/i.test(tc.text + tc.ariaLabel)) {
                    console.log(`      ? SKIP dangerous: ${tc.label}`);
                    continue;
                }
                if (tc.tag === 'input' || tc.tag === 'textarea') continue;

                const before = await getDOMSnapshot(page);
                await xy(page, tc.x, tc.y, { wait: 800 });
                const change = await detectNewContent(page, before);
                if (change.newModal) {
                    await ss(page, `admin_${sl(tabName)}_modal_${sl(tc.label)}`);
                    await closeAll(page);
                }
            }

            // Scroll admin content
            try {
                await page.evaluate(() => {
                    for (const c of document.querySelectorAll('div')) {
                        const r = c.getBoundingClientRect();
                        if (r.left > 200 && r.width > 400 && c.scrollHeight > c.clientHeight + 50) {
                            c.scrollTop = c.scrollHeight; return;
                        }
                    }
                });
                await w(page, 300);
                await ss(page, `admin_${sl(tabName)}_scrolled`);
            } catch (_) { }
        }
    } else {
        console.log('  ? Admin panel did not open');
        await ss(page, 'admin_NOT_opened');
    }
    await closeAll(page);

    // -------------------------------------------------------------------
    // �9. EMOJI/QUICK ACCESS BAR � Click all bottom bar emojis
    // -------------------------------------------------------------------
    console.log('\n-- �9. BOTTOM BAR EMOJI BUTTONS -------------------');
    await ensureLoggedIn(page);
    await goHome(page);

    // Discover clickables in bottom area
    const bottomClickables = await discoverClickables(page, { left: 60, right: 280, top: 600, bottom: 900 });
    console.log(`  Bottom area clickables: ${bottomClickables.length}`);

    for (const bc of bottomClickables) {
        if (bc.w < 15 || bc.h < 15) continue;
        if (/delete|sil|kaldir|logout|�ik/i.test(bc.text + bc.ariaLabel)) continue;

        const before = await getDOMSnapshot(page);
        await goHome(page);
        await xy(page, bc.x, bc.y, { wait: 1500 });
        const change = await detectNewContent(page, before);
        await ss(page, `bottom_${sl(bc.label)}`);

        if (change.newModal || change.contentChanged) {
            // Click sub-elements inside what opened
            const subItems = await discoverClickables(page);
            const newItems = subItems.filter(si2 =>
                !bottomClickables.some(b2 => Math.abs(b2.x - si2.x) < 10 && Math.abs(b2.y - si2.y) < 10)
            );
            for (const ni of newItems.slice(0, 10)) {
                if (ni.w < 20 || ni.h < 15) continue;
                if (/delete|sil|kaldir|logout/i.test(ni.text + ni.ariaLabel)) continue;
                await xy(page, ni.x, ni.y, { wait: 800 });
                await ss(page, `bottom_${sl(bc.label)}_sub_${sl(ni.label)}`);
                await closeAll(page);
                // Re-open
                await goHome(page);
                await xy(page, bc.x, bc.y, { wait: 1500 });
            }
            await closeAll(page);
        }
    }

    // -------------------------------------------------------------------
    // �10. KEYBOARD SHORTCUTS MODAL
    // -------------------------------------------------------------------
    console.log('\n-- �10. KEYBOARD SHORTCUTS ------------------------');
    await ensureLoggedIn(page);
    await goHome(page);
    await page.keyboard.press('Control+/');
    await w(page, 1500);
    await ss(page, 'keyboard_shortcuts_modal');

    // Click tabs inside shortcuts modal
    const shortcutTabs = await discoverClickables(page, { left: 200, right: 1200, top: 50, bottom: 850 });
    for (const st of shortcutTabs.slice(0, 8)) {
        if (st.h < 15) continue;
        await xy(page, st.x, st.y, { wait: 800 });
        await ss(page, `shortcuts_${sl(st.label)}`);
    }
    await closeAll(page);

    // -------------------------------------------------------------------
    // �11. DISCOVER SERVERS / PREMIUM STORE / ADD SERVER
    // -------------------------------------------------------------------
    console.log('\n-- �11. DISCOVER / PREMIUM / ADD SERVER ------------');
    await ensureLoggedIn(page);
    await goHome(page);

    // Discover Servers
    if (await ariaClick(page, 'Discover Servers', { wait: 2000 })) {
        await ss(page, 'discover_servers');
        const discoverItems = await discoverClickables(page);
        console.log(`  Discover clickables: ${discoverItems.length}`);
        for (const di of discoverItems.slice(0, 15)) {
            if (di.w < 20 || di.h < 15) continue;
            if (/join|katil/i.test(di.text + di.ariaLabel)) {
                console.log(`    ? SKIP join action: ${di.label}`);
                continue;
            }
            await xy(page, di.x, di.y, { wait: 800 });
            await ss(page, `discover_${sl(di.label)}`);
        }
        await closeAll(page);
    }

    // Premium Store
    await goHome(page);
    if (await ariaClick(page, 'Premium Store', { wait: 2000 })) {
        await ss(page, 'premium_store');
        const premiumItems = await discoverClickables(page);
        console.log(`  Premium clickables: ${premiumItems.length}`);
        for (const pi of premiumItems.slice(0, 15)) {
            if (pi.w < 20 || pi.h < 15) continue;
            if (/buy|satin|purchase|boost/i.test(pi.text + pi.ariaLabel)) {
                console.log(`    ? SKIP purchase: ${pi.label}`);
                continue;
            }
            await xy(page, pi.x, pi.y, { wait: 800 });
            await ss(page, `premium_${sl(pi.label)}`);
        }
        await closeAll(page);
    }

    // Add Server
    await goHome(page);
    if (await ariaClick(page, 'Server add', { wait: 2000 })) {
        await ss(page, 'add_server_modal');
        const addServerItems = await discoverClickables(page);
        console.log(`  Add Server clickables: ${addServerItems.length}`);
        for (const asi of addServerItems.slice(0, 10)) {
            if (asi.w < 20 || asi.h < 15) continue;
            if (/create|olustur|submit/i.test(asi.text + asi.ariaLabel)) {
                console.log(`    ? SKIP create: ${asi.label}`);
                continue;
            }
            const before = await getDOMSnapshot(page);
            await xy(page, asi.x, asi.y, { wait: 1000 });
            const change = await detectNewContent(page, before);
            await ss(page, `add_server_${sl(asi.label)}`);
            if (change.newModal) {
                // Sub modal clickables
                const subModal = await discoverClickables(page);
                for (const sm of subModal.slice(0, 5)) {
                    if (/create|olustur|submit/i.test(sm.text + sm.ariaLabel)) continue;
                    await xy(page, sm.x, sm.y, { wait: 800 });
                    await ss(page, `add_server_sub_${sl(sm.label)}`);
                }
                await closeAll(page);
                await goHome(page);
                await ariaClick(page, 'Server add', { wait: 1500 });
            }
        }
        await closeAll(page);
    }

    // -------------------------------------------------------------------
    // �12. FRIENDS TAB � All, Pending, Add Friend
    // -------------------------------------------------------------------
    console.log('\n-- �12. FRIENDS TABS ------------------------------');
    await ensureLoggedIn(page);
    await goHome(page);

    // Click Friends card
    const friendsClicked = await page.evaluate(() => {
        for (const el of document.querySelectorAll('div, button, [role="button"]')) {
            const t = el.textContent.trim();
            if ((t.includes('Arkadaslar') || t.includes('Friends')) && t.length < 30) {
                const r = el.getBoundingClientRect();
                if (r.width > 80 && r.height > 40 && r.x > 300) {
                    el.click(); return true;
                }
            }
        }
        return false;
    });
    if (friendsClicked) await w(page, 2000);
    await ss(page, 'friends_page');

    // Discover friends page clickables
    const friendsClickables = await discoverClickables(page, { left: 280, right: 1440, top: 0, bottom: 900 });
    console.log(`  Friends clickables: ${friendsClickables.length}`);

    for (const fc of friendsClickables.slice(0, 15)) {
        if (fc.w < 20 || fc.h < 15) continue;
        if (/delete|sil|remove|kaldir|block|engelle/i.test(fc.text + fc.ariaLabel)) continue;
        await xy(page, fc.x, fc.y, { wait: 1000 });
        await ss(page, `friends_${sl(fc.label)}`);
    }

    // -------------------------------------------------------------------
    // �13. RESPONSIVE CHECK (mobile viewport)
    // -------------------------------------------------------------------
    console.log('\n-- �13. RESPONSIVE (375x812) ----------------------');
    await page.setViewportSize({ width: 375, height: 812 });
    await w(page, 1500);
    await ensureLoggedIn(page);
    await ss(page, 'responsive_home');

    const respClickables = await discoverClickables(page);
    console.log(`  Responsive clickables: ${respClickables.length}`);
    for (const rc of respClickables.slice(0, 10)) {
        if (rc.w < 15 || rc.h < 15) continue;
        if (/delete|sil|logout|�ik/i.test(rc.text + rc.ariaLabel)) continue;
        await xy(page, rc.x, rc.y, { wait: 1000 });
        await ss(page, `responsive_${sl(rc.label)}`);
    }

    // Restore viewport
    await page.setViewportSize({ width: 1440, height: 900 });
    await w(page, 1000);

    // -------------------------------------------------------------------
    // FINAL REPORT
    // -------------------------------------------------------------------
    const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
    console.log('\n' + '-'.repeat(65));
    console.log(`?? DONE � ${idx} screenshots in ${elapsed}s`);

    const errScreens = report.filter(r => r.errors.length > 0 || r.apiErrors.length > 0);
    const cleanScreens = report.filter(r => r.errors.length === 0 && r.apiErrors.length === 0);

    console.log(`?? Clean: ${cleanScreens.length}`);
    console.log(`?? With errors: ${errScreens.length}`);
    console.log(`?? Console errors total: ${allConsoleErrors.length}`);
    console.log(`?? API errors total: ${allApiErrors.length}`);

    // Unique console errors
    const uniqueConsole = [...new Set(allConsoleErrors)];
    if (uniqueConsole.length) {
        console.log('\n-- UNIQUE CONSOLE ERRORS --');
        uniqueConsole.forEach((e, i) => console.log(`  ${i + 1}. ${e.slice(0, 200)}`));
    }

    // Unique API errors
    const uniqueApi = [...new Set(allApiErrors)];
    if (uniqueApi.length) {
        console.log('\n-- UNIQUE API ERRORS --');
        uniqueApi.forEach((e, i) => console.log(`  ${i + 1}. ${e}`));
    }

    // Error summary per screen
    if (errScreens.length) {
        console.log('\n-- SCREENS WITH ERRORS --');
        for (const r of errScreens) {
            console.log(`  [${String(r.idx).padStart(3, '0')}] ${r.label}`);
            for (const e of r.errors) console.log(`    ?? ${e.slice(0, 150)}`);
            for (const a of r.apiErrors) console.log(`    ?? ${a}`);
        }
    }

    // Save JSON report
    fs.writeFileSync(path.join(DIR, 'audit_report_v6.json'), JSON.stringify({
        total: idx,
        clean: cleanScreens.length,
        withErrors: errScreens.length,
        consoleErrors: uniqueConsole,
        apiErrors: uniqueApi,
        elapsed,
        screens: report,
    }, null, 2));

    // Generate HTML report
    const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>PAWSCORD Audit v6 Deep ${new Date().toISOString().slice(0, 10)}</title></head>
<body style="background:#0d1117;color:#e6edf3;font-family:system-ui;margin:0">
<h1 style="padding:16px;background:#161b22;margin:0;border-bottom:1px solid #30363d">
  ?? PAWSCORD Audit v6 DEEP � ${idx} Screenshots � ${elapsed}s
</h1>
<div style="display:flex;gap:12px;padding:12px;background:#161b22;border-bottom:1px solid #30363d">
  <div style="background:#0d1117;padding:8px 16px;border-radius:6px;text-align:center">
    <div style="font-size:1.8rem;font-weight:bold">${idx}</div>
    <div style="font-size:.8rem;opacity:.6">Total</div>
  </div>
  <div style="background:#0d1117;padding:8px 16px;border-radius:6px;text-align:center">
    <div style="font-size:1.8rem;font-weight:bold;color:#3fb950">${cleanScreens.length}</div>
    <div style="font-size:.8rem;opacity:.6">Clean</div>
  </div>
  <div style="background:#0d1117;padding:8px 16px;border-radius:6px;text-align:center">
    <div style="font-size:1.8rem;font-weight:bold;color:#f85149">${errScreens.length}</div>
    <div style="font-size:.8rem;opacity:.6">Errors</div>
  </div>
  <div style="background:#0d1117;padding:8px 16px;border-radius:6px;text-align:center">
    <div style="font-size:1.8rem;font-weight:bold;color:#d29922">${uniqueApi.length}</div>
    <div style="font-size:.8rem;opacity:.6">API Errors</div>
  </div>
  <div style="background:#0d1117;padding:8px 16px;border-radius:6px;text-align:center">
    <div style="font-size:1.8rem;font-weight:bold;color:#d29922">${uniqueConsole.length}</div>
    <div style="font-size:.8rem;opacity:.6">Console Errors</div>
  </div>
</div>
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(420px,1fr));gap:12px;padding:16px">
${report.map(r => {
        const errN = r.errors.length + r.apiErrors.length;
        const border = errN > 0 ? 'border:2px solid #f85149' : '';
        const errs = [...r.errors.map(e => `<div style="color:#f85149;font-size:.7rem;margin:1px 0">?? ${e.replace(/</g, '&lt;').slice(0, 200)}</div>`),
        ...r.apiErrors.map(e => `<div style="color:#d29922;font-size:.7rem;margin:1px 0">?? ${e.replace(/</g, '&lt;')}</div>`)].join('');
        return `<div style="background:#161b22;border-radius:6px;overflow:hidden;${border}">
  <a href="${r.file}" target="_blank"><img src="${r.file}" style="width:100%;display:block" loading="lazy"/></a>
  <div style="padding:6px 10px;font-size:.85rem">${r.idx}. ${r.label}</div>
  ${errs ? `<div style="padding:2px 10px 6px">${errs}</div>` : ''}
</div>`;
    }).join('\n')}
</div>
${uniqueConsole.length ? `<div style="padding:16px;background:#161b22;margin:16px;border-radius:6px">
<h3>Console Errors (${uniqueConsole.length} unique)</h3>
${uniqueConsole.map((e, i) => `<div style="color:#f85149;font-size:.8rem;margin:4px 0">${i + 1}. ${e.replace(/</g, '&lt;').slice(0, 300)}</div>`).join('')}
</div>` : ''}
${uniqueApi.length ? `<div style="padding:16px;background:#161b22;margin:16px;border-radius:6px">
<h3>API Errors (${uniqueApi.length} unique)</h3>
${uniqueApi.map((e, i) => `<div style="color:#d29922;font-size:.8rem;margin:4px 0">${i + 1}. ${e.replace(/</g, '&lt;')}</div>`).join('')}
</div>` : ''}
</body></html>`;

    fs.writeFileSync(path.join(DIR, 'audit_report_v6.html'), html);
    console.log(`\n?? Report: ${DIR}/audit_report_v6.html`);
    console.log(`?? JSON:   ${DIR}/audit_report_v6.json`);

    await browser.close();
})();
