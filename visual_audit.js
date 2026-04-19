/**
 * Pawscord Visual Audit v1 — Screenshot every screen
 * Clicks every accessible element, captures console/API errors per screen,
 * generates screenshots/ folder + HTML report.
 *
 * Run:  node visual_audit.js
 * Output: screenshots/ folder + audit_report.html
 */
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.pawscord.com';
const USERNAME = 'YANHESAP';
const PASSWORD = 'YANHESAP';
const SHOTS_DIR = path.join(__dirname, 'screenshots');

// ── Ensure output directory (clear old screenshots) ──────────────────────────
if (fs.existsSync(SHOTS_DIR)) {
    fs.readdirSync(SHOTS_DIR).forEach(f => { if (f.endsWith('.png')) fs.unlinkSync(path.join(SHOTS_DIR, f)); });
} else {
    fs.mkdirSync(SHOTS_DIR, { recursive: true });
}

// ── Global state ─────────────────────────────────────────────────────────────
const report = [];   // { idx, label, file, errors, apiErrors, time }
let shotIdx = 0;
const allConsoleErrors = [];
const allApiErrors = [];

// Per-screen error buckets (reset before each screenshot)
let screenErrors = [];
let screenApiErrors = [];

// ── Helpers ───────────────────────────────────────────────────────────────────
function slug(name) {
    return name.replace(/[^a-zA-Z0-9_\-]/g, '_').slice(0, 50);
}

async function screenshot(page, label) {
    shotIdx++;
    const idx = String(shotIdx).padStart(3, '0');
    const file = `${idx}_${slug(label)}.png`;
    const full = path.join(SHOTS_DIR, file);
    try {
        await page.screenshot({ path: full, fullPage: false });
    } catch (_) { }

    // Detect React error boundary rendered text in DOM
    try {
        const boundaryTexts = await page.evaluate(() => {
            const errorDivs = document.querySelectorAll('div, span, p');
            const found = [];
            for (const el of errorDivs) {
                const text = el.textContent || '';
                if (text.includes('failed to load') || text.includes('is not defined') || text.includes('Something went wrong') || (text.includes('Try Again') && text.length < 200)) {
                    const parent = el.closest('[style], [class]');
                    const style = parent ? (parent.getAttribute('style') || '') : '';
                    // Only flag if it looks like an error boundary (has red/warning styling or minimal text)
                    if (style.includes('red') || style.includes('error') || text.length < 150) {
                        found.push(text.trim().slice(0, 150));
                    }
                }
            }
            return [...new Set(found)];
        });
        for (const t of boundaryTexts) {
            const msg = `DOM_BOUNDARY: ${t}`;
            if (!screenErrors.includes(msg)) screenErrors.push(msg);
        }
    } catch (_) { }

    const entry = {
        idx: shotIdx,
        label,
        file,
        errors: [...screenErrors],
        apiErrors: [...screenApiErrors],
    };
    report.push(entry);
    screenErrors = [];
    screenApiErrors = [];

    const errCount = entry.errors.length + entry.apiErrors.length;
    const icon = errCount > 0 ? '🔴' : '🟢';
    console.log(`${icon} [${idx}] ${label}${errCount ? ` (${errCount} errors)` : ''}`);
    return entry;
}

async function wait(page, ms = 700) { await page.waitForTimeout(ms); }

async function tryClick(page, selector, label, opts = {}) {
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
        await wait(page, 300);
    }
    try { await page.mouse.click(8, 8); await wait(page, 200); } catch (_) { }
    for (const sel of ['button[aria-label="Close"]', 'button[aria-label="on Close"]', 'button:has-text("İptal")', 'button:has-text("Cancel")']) {
        try {
            if (await page.locator(sel).first().isVisible({ timeout: 300 })) {
                await page.locator(sel).first().click();
                await wait(page, 300);
                break;
            }
        } catch (_) { }
    }
    await wait(page, 200);
}

async function resetErrorBoundaries(page) {
    // Click all "Try Again" buttons to reset React error boundaries
    for (let attempt = 0; attempt < 3; attempt++) {
        try {
            const btns = page.locator('button:has-text("Try Again")');
            const count = await btns.count();
            if (count === 0) break;
            for (let i = 0; i < count; i++) {
                try {
                    const btn = btns.nth(i);
                    if (await btn.isVisible({ timeout: 400 })) {
                        await btn.click();
                        await wait(page, 600);
                    }
                } catch (_) { }
            }
        } catch (_) { break; }
    }
}

async function goHome(page) {
    await closeAll(page);
    await resetErrorBoundaries(page);
    try {
        const h = page.locator('[aria-label="Home"]').first();
        if (await h.isVisible({ timeout: 2000 })) { await h.click(); await wait(page, 700); return; }
    } catch (_) { }
    // Full reload if still stuck (e.g., error boundary won't reset)
    try { await page.reload({ waitUntil: 'domcontentloaded', timeout: 20000 }); await wait(page, 3000); } catch (_) { }
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
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36',
    });
    const page = await context.newPage();

    // ── Event listeners ───────────────────────────────────────────────────────
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

    // ════════════════════════════════════════════════════════════════════════
    // 1. LOGIN
    // ════════════════════════════════════════════════════════════════════════
    console.log('\n══ LOGIN ══════════════════════════════════════');
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await wait(page, 2000);
    await screenshot(page, '00_login_page');

    try { await page.fill('input[aria-label="Username"]', USERNAME); } catch (_) { }
    try { await page.fill('input[aria-label="Password"]', PASSWORD); } catch (_) { }
    try { await page.click('button[type="submit"]'); } catch (_) { }
    await wait(page, 7000);
    await screenshot(page, '01_after_login');

    // ════════════════════════════════════════════════════════════════════════
    // 2. HOME SCREEN CARDS
    // ════════════════════════════════════════════════════════════════════════
    console.log('\n══ HOME CARDS ══════════════════════════════════');
    await goHome(page);
    await screenshot(page, '02_home');

    for (const card of ['Arkadaşlar', 'Sunucular', 'Aktiviteler', 'Yapay Zeka']) {
        await goHome(page);
        const ok = await tryClick(page, `[role="button"]:has-text("${card}"), button:has-text("${card}")`, card);
        if (ok) await screenshot(page, `home_card_${card}`);
    }

    // ════════════════════════════════════════════════════════════════════════
    // 3. SIDEBAR BUTTONS (Discover, Premium, Add Server)
    // ════════════════════════════════════════════════════════════════════════
    console.log('\n══ SIDEBAR BUTTONS ══════════════════════════════');
    await goHome(page);

    // Discover Servers
    await tryClick(page, '[aria-label="Discover Servers"]', 'Discover Servers');
    await screenshot(page, '03_discover_servers');

    // Scroll down in discover modal to see servers
    try { await page.keyboard.press('End'); await wait(page, 500); } catch (_) { }
    await screenshot(page, '03b_discover_scroll');
    await closeAll(page);

    // Premium Store
    await goHome(page);
    await tryClick(page, '[aria-label="Premium Store"]', 'Premium Store');
    await screenshot(page, '04_premium_store');

    for (const tab of ['Premium', 'Mağaza', 'Store', 'Server Boost', 'Boost']) {
        try {
            const el = page.locator(`[role="tab"]:has-text("${tab}"), button:has-text("${tab}")`).first();
            if (await el.isVisible({ timeout: 1000 })) {
                await el.click(); await wait(page, 800);
                await screenshot(page, `04_premium_tab_${tab}`);
            }
        } catch (_) { }
    }
    await closeAll(page);

    // Add Server
    await goHome(page);
    await tryClick(page, '[aria-label="Server add"]', 'Add Server (+)');
    await screenshot(page, '05_add_server_menu');
    await closeAll(page);

    // ════════════════════════════════════════════════════════════════════════
    // 4. SETTINGS — every tab
    // ════════════════════════════════════════════════════════════════════════
    console.log('\n══ SETTINGS TABS ════════════════════════════════');
    await goHome(page);
    const settingsOpened = await tryClick(page, 'button[aria-label="Settings"]', 'Settings');
    if (settingsOpened) {
        await screenshot(page, '06_settings_open');

        const settingsTabs = [
            'Hesabım', 'Gizlilik ve Güvenlik', 'Bağlantılar',
            'Görünüm', 'Ses ve Video', 'Bildirimler',
            'Klavye Kısayolları', 'Dil', 'Aktivite Durumu',
            'Oturumlar', 'Gelişmiş',
            // English fallbacks
            'Account', 'Privacy', 'Connections', 'Appearance',
            'Voice & Video', 'Notifications', 'Keybinds',
            'Language', 'Activity', 'Sessions', 'Advanced',
        ];
        const seen = new Set();
        for (const tab of settingsTabs) {
            if (seen.has(tab.toLowerCase())) continue;
            try {
                const el = page.locator(
                    `[role="button"]:has-text("${tab}"), li:has-text("${tab}"), button:has-text("${tab}")`
                ).first();
                if (await el.isVisible({ timeout: 1000 })) {
                    await el.click(); await wait(page, 800);
                    // scroll to show full panel
                    try { await page.keyboard.press('End'); await wait(page, 300); } catch (_) { }
                    await screenshot(page, `settings_${tab}`);
                    seen.add(tab.toLowerCase());
                }
            } catch (_) { }
        }
        await closeAll(page);
    }

    // ════════════════════════════════════════════════════════════════════════
    // 5. QUICK ACCESS BUTTONS
    // ════════════════════════════════════════════════════════════════════════
    console.log('\n══ QUICK ACCESS BUTTONS ════════════════════════');
    const quickBtns = [
        '💰 Payment Panel',
        '🛒 Store',
        '🎁 Daily Rewards',
        '📊 API Usage',
        '📥 Export Jobs',
        '📢 Scheduled Announcements',
        '🎮 Mini Games',
        '📂 Projects',
        '🎨 Avatar Studio',
    ];
    for (const label of quickBtns) {
        await goHome(page);
        const ok = await tryClick(page, `[aria-label="${label}"]`, label, { timeout: 4000 });
        if (ok) {
            // Scroll down to see full content
            try { await page.keyboard.press('End'); await wait(page, 400); } catch (_) { }
            await screenshot(page, `quick_${label.replace(/[^a-z0-9]/gi, '_').slice(0, 30)}`);
        }
    }

    // Admin Panel
    await goHome(page);
    await tryClick(page, 'button[aria-label="Open Admin Panel"]', 'Admin Panel open');
    await wait(page, 2000);
    await screenshot(page, 'admin_panel_open');

    // Admin tabs — click by index (all buttons have same aria-label="Switch tab")
    const adminTabBtns = page.locator('button.admin-panel-sidebar-btn');
    const adminTabCount = await adminTabBtns.count();
    console.log(`  Found ${adminTabCount} admin tab buttons`);
    for (let i = 0; i < adminTabCount; i++) {
        try {
            const btn = adminTabBtns.nth(i);
            if (await btn.isVisible({ timeout: 1000 })) {
                const tabLabel = (await btn.textContent() || `tab_${i}`).trim().replace(/\s+/g, '_').slice(0, 30);
                await btn.click(); await wait(page, 1200);
                await screenshot(page, `admin_tab_${String(i).padStart(2, '0')}_${tabLabel}`);
            }
        } catch (_) { }
    }
    await closeAll(page);

    // ════════════════════════════════════════════════════════════════════════
    // 6. SERVER LIST — click first 3 servers in rail
    // ════════════════════════════════════════════════════════════════════════
    console.log('\n══ SERVER RAIL ══════════════════════════════════');
    await goHome(page);

    // Get all server icons in the left rail
    const serverIcons = page.locator('[aria-label*="server" i]:not([aria-label="Discover Servers"]):not([aria-label="Server add"]), [class*="serverIcon"], [class*="ServerIcon"]');
    const serverCount = await serverIcons.count();
    console.log(`  Found ${serverCount} server icons`);

    for (let i = 0; i < Math.min(serverCount, 4); i++) {
        try {
            const icon = serverIcons.nth(i);
            if (await icon.isVisible({ timeout: 1000 })) {
                const label = await icon.getAttribute('aria-label') || `server_${i}`;
                await icon.click(); await wait(page, 1500);
                await screenshot(page, `server_${i}_${label.slice(0, 20)}`);

                // Click first visible channel
                const channels = page.locator('[class*="channel"], [class*="Channel"], [class*="room"], [class*="Room"]').filter({ hasNot: page.locator('[class*="voice"], [class*="Voice"]') });
                const chCount = await channels.count();
                for (let c = 0; c < Math.min(chCount, 3); c++) {
                    try {
                        const ch = channels.nth(c);
                        if (await ch.isVisible({ timeout: 800 })) {
                            const chLabel = await ch.getAttribute('aria-label') || await ch.textContent() || `ch_${c}`;
                            await ch.click(); await wait(page, 1200);
                            await screenshot(page, `server_${i}_channel_${c}_${chLabel.trim().slice(0, 20)}`);
                        }
                    } catch (_) { }
                }
            }
        } catch (_) { }
    }

    // ════════════════════════════════════════════════════════════════════════
    // 7. DM AREA — chat input toolbar items
    // ════════════════════════════════════════════════════════════════════════
    console.log('\n══ DM / CHAT AREA ══════════════════════════════');
    await goHome(page);

    // Open first DM — use text content since DM items use inline styles (no CSS class)
    // User has DMs with PawPaw and iyzico
    const dmNames = ['PawPaw', 'iyzico'];
    let dmOpened = false;
    for (const name of dmNames) {
        try {
            const el = page.locator(`[role="button"]:has-text("${name}")`).first();
            if (await el.isVisible({ timeout: 2000 })) {
                await el.click(); await wait(page, 2000);
                await screenshot(page, `dm_chat_${name}`);
                dmOpened = true;
                break;
            }
        } catch (_) { }
    }
    // fallback: try first role=button in the DM list area
    if (!dmOpened) {
        try {
            const dmItems = page.locator('[role="button"]').filter({ hasText: /^[A-Za-z]/ });
            if (await dmItems.count() > 0) {
                await dmItems.first().click(); await wait(page, 2000);
                await screenshot(page, 'dm_chat_first');
                dmOpened = true;
            }
        } catch (_) { }
    }
    if (dmOpened) {
        // Chat input area buttons
        for (const sel of [
            'button[aria-label="Emoji"]',
            'button[aria-label="Gif"]',
            'button[aria-label="GIF"]',
            'button[aria-label="Sticker"]',
            'button[aria-label="Upload"]',
            'button[aria-label="Attachment"]',
        ]) {
            try {
                if (await page.locator(sel).first().isVisible({ timeout: 800 })) {
                    await page.locator(sel).first().click(); await wait(page, 800);
                    await screenshot(page, `chat_btn_${sel.replace(/[^a-z]/gi, '_').slice(0, 30)}`);
                    await closeAll(page);
                }
            } catch (_) { }
        }

        // Right sidebar / user list toggle
        await tryClick(page, 'button[aria-label="Members"], button[aria-label="Üyeler"]', 'Members toggle');
        await screenshot(page, 'dm_members_sidebar');

        // Message context menu (right-click on last message)
        try {
            const msgs = page.locator('[class*="message"], [class*="Message"]').filter({ hasNot: page.locator('input, textarea') });
            const msgCount = await msgs.count();
            if (msgCount > 0) {
                await msgs.last().hover(); await wait(page, 400);
                await screenshot(page, 'dm_message_hover_buttons');
                await msgs.last().click({ button: 'right' }); await wait(page, 500);
                await screenshot(page, 'dm_message_context_menu');
                await closeAll(page);
            }
        } catch (_) { }

        // Open second DM if first was opened
        await goHome(page);
        for (const name of dmNames.slice(1)) {
            try {
                const el = page.locator(`[role="button"]:has-text("${name}")`).first();
                if (await el.isVisible({ timeout: 2000 })) {
                    await el.click(); await wait(page, 2000);
                    await screenshot(page, `dm_chat_${name}`);
                    break;
                }
            } catch (_) { }
        }
    } // end if (dmOpened)

    // ════════════════════════════════════════════════════════════════════════
    // 8. MORE MODALS via keyboard shortcut / buttons
    // ════════════════════════════════════════════════════════════════════════
    console.log('\n══ ADDITIONAL MODALS ═══════════════════════════');
    await goHome(page);

    // User profile click (username row bottom left)
    try {
        const userRow = page.locator('[role="button"]').filter({ hasText: USERNAME }).last();
        if (await userRow.isVisible({ timeout: 2000 })) {
            await userRow.click(); await wait(page, 1000);
            await screenshot(page, 'user_profile_panel');
            await closeAll(page);
        }
    } catch (_) { }

    // Custom Status button
    await goHome(page);
    await tryClick(page, '[aria-label*="status" i], button:has-text("Set Status"), button:has-text("Durum")', 'Custom Status');
    await screenshot(page, 'custom_status_modal');
    await closeAll(page);

    // Keyboard Shortcuts modal
    await goHome(page);
    try { await page.keyboard.press('Control+/'); await wait(page, 1000); } catch (_) { }
    await screenshot(page, 'keyboard_shortcuts_modal');
    await closeAll(page);

    // Support developer
    await goHome(page);
    await tryClick(page, '[aria-label*="support" i], [aria-label*="destek" i]', 'Support button');
    await screenshot(page, 'support_developer');
    await closeAll(page);

    // ════════════════════════════════════════════════════════════════════════
    // 9. FEATURE HUB / STORE MODALS
    // ════════════════════════════════════════════════════════════════════════
    console.log('\n══ STORE / FEATURE HUB ══════════════════════════');
    await goHome(page);

    // Coin Store
    await tryClick(page, 'button:has-text("Coin"), [aria-label*="Coin" i]', 'Coin Store');
    await screenshot(page, 'coin_store');
    await closeAll(page);

    // Crypto Modal
    await goHome(page);
    await tryClick(page, '[aria-label="Crypto"], button:has-text("Kripto")', 'Crypto modal');
    await screenshot(page, 'crypto_modal');
    await closeAll(page);

    // ════════════════════════════════════════════════════════════════════════
    // FINAL — scroll home to see everything
    // ════════════════════════════════════════════════════════════════════════
    await goHome(page);
    await screenshot(page, 'ZZ_final_home');

    await browser.close();

    // ════════════════════════════════════════════════════════════════════════
    // GENERATE HTML REPORT
    // ════════════════════════════════════════════════════════════════════════
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
            <a href="screenshots/${encodeURIComponent(r.file)}" target="_blank">
                <img src="screenshots/${encodeURIComponent(r.file)}" alt="${escHtml(r.label)}" loading="lazy" />
            </a>
            <div class="label">${r.idx}. ${escHtml(r.label)}</div>
            ${errHtml}
        </div>`;
    }).join('');

    function escHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

    const html = `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pawscord Visual Audit — ${new Date().toISOString().slice(0, 10)}</title>
<style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #1a1a2e; color: #e0e0e0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    h1 { padding: 20px; background: #16213e; font-size: 1.4rem; }
    .summary { display: flex; gap: 16px; padding: 16px 20px; background: #0f3460; flex-wrap: wrap; }
    .stat { background: #1a1a2e; padding: 10px 18px; border-radius: 8px; text-align: center; }
    .stat .val { font-size: 1.8rem; font-weight: bold; }
    .stat .key { font-size: 0.75rem; opacity: 0.7; margin-top: 2px; }
    .val.ok { color: #23a559; }
    .val.warn { color: #f0b132; }
    .val.err { color: #e74c3c; }
    .filter-bar { padding: 12px 20px; background: #16213e; display: flex; gap: 10px; align-items: center; }
    .filter-bar button { padding: 6px 16px; border: none; border-radius: 6px; cursor: pointer; font-size: 0.85rem; }
    .btn-all { background: #5865f2; color: white; }
    .btn-err { background: #e74c3c; color: white; }
    .btn-ok  { background: #23a559; color: white; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 16px; padding: 20px; }
    .card { background: #16213e; border-radius: 10px; overflow: hidden; border: 2px solid transparent; transition: border-color 0.2s; }
    .card:hover { border-color: #5865f2; }
    .card.has-error { border-color: #e74c3c66; }
    .card img { width: 100%; height: 200px; object-fit: cover; object-position: top; display: block; cursor: pointer; }
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
<h1>🎨 Pawscord Visual Audit — ${new Date().toUTCString()}</h1>
<div class="summary">
    <div class="stat"><div class="val ok">${report.length}</div><div class="key">Screenshots</div></div>
    <div class="stat"><div class="val ${screensWithErrors.length > 0 ? 'err' : 'ok'}">${screensWithErrors.length}</div><div class="key">Screens with Errors</div></div>
    <div class="stat"><div class="val ${totalErrors > 0 ? 'err' : 'ok'}">${totalErrors}</div><div class="key">Console Errors</div></div>
    <div class="stat"><div class="val ${totalApiErrors > 0 ? 'warn' : 'ok'}">${totalApiErrors}</div><div class="key">API Errors</div></div>
    <div class="stat"><div class="val">${elapsed}s</div><div class="key">Duration</div></div>
</div>
<div class="filter-bar">
    <button class="btn-all" onclick="filterCards('all')">All Screens (${report.length})</button>
    <button class="btn-err" onclick="filterCards('err')">⚠️ With Errors (${screensWithErrors.length})</button>
    <button class="btn-ok"  onclick="filterCards('ok')">✅ Clean (${report.length - screensWithErrors.length})</button>
</div>
<div class="grid" id="grid">
${thumbs}
</div>
${totalErrors > 0 ? `
<div class="all-errors">
    <h2>🔴 All Console Errors (${totalErrors})</h2>
    <ul>${[...new Set(allConsoleErrors)].map(e => `<li>${escHtml(e)}</li>`).join('')}</ul>
</div>` : ''}
${totalApiErrors > 0 ? `
<div class="all-errors">
    <h2>🟠 All API Errors (${totalApiErrors})</h2>
    <ul>${[...new Set(allApiErrors)].map(e => `<li>${escHtml(e)}</li>`).join('')}</ul>
</div>` : ''}
<footer>Generated by visual_audit.js · ${new Date().toISOString()}</footer>
<script>
function filterCards(mode) {
    document.querySelectorAll('.card').forEach(c => {
        if (mode === 'all') c.style.display = '';
        else if (mode === 'err') c.style.display = c.classList.contains('has-error') ? '' : 'none';
        else if (mode === 'ok')  c.style.display = c.classList.contains('has-error') ? 'none' : '';
    });
}
// Click image to open full-size in modal
document.querySelectorAll('.card img').forEach(img => {
    img.onclick = e => { e.preventDefault(); window.open(img.parentElement.href, '_blank'); };
});
</script>
</body>
</html>`;

    fs.writeFileSync(path.join(__dirname, 'audit_report.html'), html, 'utf8');

    // ── Console summary ───────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(60));
    console.log(`📸 Screenshots: ${report.length}  |  🔴 Errors: ${totalErrors}  |  🟠 API: ${totalApiErrors}`);
    console.log(`⏱  Elapsed: ${elapsed}s`);
    console.log(`📋 Report: ${path.join(__dirname, 'audit_report.html')}`);
    if (screensWithErrors.length > 0) {
        console.log(`\n⚠️  Screens with errors:`);
        screensWithErrors.forEach(r => {
            console.log(`   [${r.idx}] ${r.label}`);
            r.errors.forEach(e => console.log(`       🔴 ${e.slice(0, 100)}`));
            r.apiErrors.forEach(e => console.log(`       🟠 API ${e}`));
        });
    }
    if (totalErrors === 0 && totalApiErrors === 0) {
        console.log('\n✅ No errors found!');
    }
    console.log('═'.repeat(60));
})();
