/**
 * Pawscord Audit Round 1 — Post-fix verification + full page scoring
 * Tests: message history, admin stats, endorsements, all major pages
 * Run:  npx playwright test --config=audit_pw.config.js audit_round1.js
 *   or: node audit_round1.js
 */
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const BASE = 'https://www.pawscord.com';
const API = 'https://api.pawscord.com';
const USER = 'YANHESAP';
const PASS = 'YANHESAP';
const DIR = path.join(__dirname, 'screenshots_round1');

if (fs.existsSync(DIR)) {
    fs.readdirSync(DIR).forEach(f => { if (f.endsWith('.png')) fs.unlinkSync(path.join(DIR, f)); });
} else {
    fs.mkdirSync(DIR, { recursive: true });
}

const results = [];
let idx = 0;

function slug(s) { return s.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 50); }

async function shot(page, label, extra = {}) {
    idx++;
    const file = `${String(idx).padStart(3, '0')}_${slug(label)}.png`;
    try { await page.screenshot({ path: path.join(DIR, file), fullPage: false }); } catch (_) { }
    const entry = { idx, label, file, ...extra };
    results.push(entry);
    const status = extra.error ? '🔴' : (extra.warning ? '🟡' : '🟢');
    console.log(`${status} [${String(idx).padStart(3, '0')}] ${label}${extra.error ? ' — ' + extra.error : ''}${extra.warning ? ' — ' + extra.warning : ''}`);
    return entry;
}

async function apiTest(token, endpoint, label) {
    try {
        const resp = await fetch(`${API}${endpoint}`, {
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
        const status = resp.status;
        const ok = status >= 200 && status < 400;
        let body = null;
        try { body = await resp.json(); } catch (_) { }
        const result = { label, endpoint, status, ok };
        if (!ok) result.error = body?.message || body?.error || `HTTP ${status}`;
        results.push(result);
        console.log(`${ok ? '🟢' : '🔴'} API ${status} ${endpoint} — ${label}`);
        return { status, ok, body };
    } catch (e) {
        results.push({ label, endpoint, status: 0, ok: false, error: e.message });
        console.log(`🔴 API ERR ${endpoint} — ${e.message}`);
        return { status: 0, ok: false };
    }
}

async function main() {
    console.log('=== PAWSCORD AUDIT ROUND 1 ===');
    console.log(`Time: ${new Date().toISOString()}\n`);

    // ── 1. Get JWT Token ─────────────────────────────────────────────
    console.log('--- AUTHENTICATION ---');
    let token;
    try {
        const resp = await fetch(`${API}/api/auth/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: USER, password: PASS })
        });
        const data = await resp.json();
        token = data.access;
        console.log(`🟢 Login OK — token obtained\n`);
    } catch (e) {
        console.log(`🔴 Login FAILED: ${e.message}`);
        return;
    }

    // ── 2. API Endpoint Tests ────────────────────────────────────────
    console.log('--- API ENDPOINT TESTS (fixes verification) ---');

    // Message History — Room with messages (was 500)
    const rooms = ['ai', 'sinyal-bot', 'genel', 'genel-1'];
    for (const room of rooms) {
        await apiTest(token, `/api/messages/history/room/${room}/`, `Message History: ${room}`);
    }

    // Admin Stats (was 500)
    await apiTest(token, `/api/admin/detailed-stats/`, 'Admin Detailed Stats');
    await apiTest(token, `/api/admin/live-activity/`, 'Admin Live Activity');

    // Endorsements (was 500 - NameError)
    await apiTest(token, `/api/users/16/endorsements/`, 'Endorsements');

    // Other important endpoints
    await apiTest(token, `/api/profile/`, 'Profile');
    await apiTest(token, `/api/servers/`, 'Servers List');
    await apiTest(token, `/api/notifications/`, 'Notifications');
    await apiTest(token, `/api/friends/`, 'Friends List');
    await apiTest(token, `/api/eng-learn/words/`, 'English Words');
    await apiTest(token, `/api/discover/servers/`, 'Discover Servers');
    await apiTest(token, `/api/premium/status/`, 'Premium Status');

    console.log('');

    // ── 3. Browser Visual Audit ──────────────────────────────────────
    console.log('--- VISUAL AUDIT (all pages) ---');
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        ignoreHTTPSErrors: true
    });
    const page = await context.newPage();

    // Collect console errors
    const consoleErrors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text().slice(0, 200));
    });

    // Collect failed network requests
    const networkErrors = [];
    page.on('response', resp => {
        if (resp.status() >= 400 && !resp.url().includes('favicon')) {
            networkErrors.push(`${resp.status()} ${resp.url().split('?')[0].slice(0, 100)}`);
        }
    });

    // ── Login ──
    await page.goto(`${BASE}/login`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);
    await shot(page, 'login_page');

    try {
        await page.fill('input[name="username"], input[type="text"]', USER);
        await page.fill('input[name="password"], input[type="password"]', PASS);
        await page.click('button[type="submit"]');
        await page.waitForTimeout(3000);
    } catch (e) {
        await shot(page, 'login_FAILED', { error: e.message });
    }
    await shot(page, 'after_login');

    // ── Navigate pages ──
    const pages = [
        { url: '/', label: 'Home' },
        { url: '/discover', label: 'Discover Servers' },
        { url: '/store', label: 'Premium Store' },
        { url: '/friends', label: 'Friends' },
        { url: '/english-learning', label: 'English Learning' },
        { url: '/crypto', label: 'Crypto Dashboard' },
        { url: '/settings', label: 'Settings' },
        { url: '/settings/profile', label: 'Settings Profile' },
        { url: '/settings/appearance', label: 'Settings Appearance' },
        { url: '/settings/security', label: 'Settings Security' },
        { url: '/settings/language', label: 'Settings Language' },
        { url: '/settings/notifications', label: 'Settings Notifications' },
        { url: '/admin', label: 'Admin Dashboard' },
    ];

    for (const p of pages) {
        const prevErrors = consoleErrors.length;
        const prevNet = networkErrors.length;
        try {
            await page.goto(`${BASE}${p.url}`, { waitUntil: 'networkidle', timeout: 15000 });
        } catch (_) {
            await page.goto(`${BASE}${p.url}`, { waitUntil: 'domcontentloaded', timeout: 10000 }).catch(() => { });
        }
        await page.waitForTimeout(1500);

        const newConsole = consoleErrors.slice(prevErrors);
        const newNet = networkErrors.slice(prevNet);
        const extra = {};
        if (newConsole.length) extra.warning = `${newConsole.length} console errors`;
        if (newNet.length) extra.error = `${newNet.length} network errors: ${newNet.slice(0, 3).join(', ')}`;
        await shot(page, p.label, extra);

        // Scroll down to capture full page content
        await page.evaluate(() => window.scrollBy(0, 600));
        await page.waitForTimeout(500);
        await shot(page, `${p.label}_scroll`);
    }

    // ── Admin tabs ──
    console.log('--- ADMIN PANEL TABS ---');
    try {
        await page.goto(`${BASE}/admin`, { waitUntil: 'networkidle', timeout: 15000 });
        await page.waitForTimeout(2000);

        const adminTabs = ['Dashboard', 'Users', 'Servers', 'Moderation', 'Logs', 'Database', 'System'];
        for (const tab of adminTabs) {
            const prevNet = networkErrors.length;
            try {
                const btn = page.locator(`button, [role="tab"], a`).filter({ hasText: new RegExp(`^${tab}$`, 'i') }).first();
                if (await btn.isVisible({ timeout: 2000 })) {
                    await btn.click();
                    await page.waitForTimeout(1500);
                }
            } catch (_) { }
            const newNet = networkErrors.slice(prevNet);
            const extra = {};
            if (newNet.length) extra.error = `${newNet.length} errors: ${newNet.slice(0, 2).join(', ')}`;
            await shot(page, `admin_${tab}`, extra);
        }
    } catch (e) {
        await shot(page, 'admin_ERROR', { error: e.message });
    }

    // ── Server channels (if any) ──
    console.log('--- SERVER CHANNELS ---');
    try {
        await page.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 10000 });
        await page.waitForTimeout(1500);

        // Click first server icon in sidebar
        const serverIcons = page.locator('.server-icon, [class*="serverIcon"], [data-testid="server-icon"]');
        const count = await serverIcons.count();
        if (count > 0) {
            await serverIcons.first().click();
            await page.waitForTimeout(2000);
            await shot(page, 'server_first_channel');

            // Try clicking different channels
            const channels = page.locator('[class*="channel"], [class*="Channel"], [data-channel]');
            const chCount = Math.min(await channels.count(), 5);
            for (let i = 0; i < chCount; i++) {
                const prevNet = networkErrors.length;
                try {
                    await channels.nth(i).click();
                    await page.waitForTimeout(1500);
                } catch (_) { }
                const newNet = networkErrors.slice(prevNet);
                const extra = {};
                if (newNet.length) extra.error = `network: ${newNet.slice(0, 2).join(', ')}`;
                await shot(page, `channel_${i}`);
            }
        } else {
            await shot(page, 'no_server_icons_found', { warning: 'No server icons in sidebar' });
        }
    } catch (e) {
        await shot(page, 'server_ERROR', { error: e.message });
    }

    // ── DM page ──
    console.log('--- DM ---');
    try {
        await page.goto(`${BASE}/dm`, { waitUntil: 'networkidle', timeout: 10000 });
        await page.waitForTimeout(1500);
        await shot(page, 'dm_list');
    } catch (_) {
        await shot(page, 'dm_list_fallback');
    }

    // ── Profile page ──
    console.log('--- PROFILE ---');
    try {
        await page.goto(`${BASE}/profile`, { waitUntil: 'networkidle', timeout: 10000 });
        await page.waitForTimeout(1500);
        await shot(page, 'profile');
    } catch (_) { }

    await browser.close();

    // ── 4. Generate Report ───────────────────────────────────────────
    console.log('\n=== AUDIT SUMMARY ===');
    const apiResults = results.filter(r => r.endpoint);
    const pageResults = results.filter(r => r.file);
    const apiOk = apiResults.filter(r => r.ok).length;
    const apiFail = apiResults.filter(r => !r.ok).length;
    const pageErr = pageResults.filter(r => r.error).length;
    const pageWarn = pageResults.filter(r => r.warning).length;

    console.log(`API Tests:  ${apiOk} OK / ${apiFail} FAIL (of ${apiResults.length})`);
    console.log(`Pages:      ${pageResults.length} screenshots, ${pageErr} with errors, ${pageWarn} with warnings`);
    console.log(`Console:    ${consoleErrors.length} total console errors`);
    console.log(`Network:    ${networkErrors.length} total network errors`);

    if (apiFail > 0) {
        console.log('\n--- FAILED ENDPOINTS ---');
        apiResults.filter(r => !r.ok).forEach(r => console.log(`  ${r.status} ${r.endpoint} — ${r.error || ''}`));
    }
    if (pageErr > 0) {
        console.log('\n--- PAGES WITH ERRORS ---');
        pageResults.filter(r => r.error).forEach(r => console.log(`  ${r.label}: ${r.error}`));
    }

    // Save JSON report
    const reportData = {
        timestamp: new Date().toISOString(),
        summary: { apiOk, apiFail, pageCount: pageResults.length, pageErrors: pageErr, pageWarnings: pageWarn, consoleErrors: consoleErrors.length, networkErrors: networkErrors.length },
        apiResults,
        pageResults,
        consoleErrors: consoleErrors.slice(0, 50),
        networkErrors: networkErrors.slice(0, 50),
    };
    fs.writeFileSync(path.join(DIR, 'report.json'), JSON.stringify(reportData, null, 2));
    console.log(`\nReport saved to ${DIR}/report.json`);
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
