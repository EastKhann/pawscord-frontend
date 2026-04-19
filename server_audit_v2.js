/**
 * Pawscord Server Audit v2 — Uses Playwright locators for reliable clicks
 * Tests: text channels, voice channels, kanban boards
 * Run: cd frontend && node server_audit_v2.js
 */
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const BASE = 'https://www.pawscord.com';
const API = 'https://api.pawscord.com/api';
const SHOTS = path.join(__dirname, 'screenshots_server');

if (fs.existsSync(SHOTS)) {
    fs.readdirSync(SHOTS).forEach(f => { if (f.endsWith('.png')) fs.unlinkSync(path.join(SHOTS, f)); });
} else {
    fs.mkdirSync(SHOTS, { recursive: true });
}

let idx = 0;
const report = [];
const jsErrors = [];

function slug(s) { return s.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 60); }

async function shot(page, label) {
    idx++;
    const num = String(idx).padStart(3, '0');
    const file = `${num}_${slug(label)}.png`;
    try { await page.screenshot({ path: path.join(SHOTS, file), fullPage: false }); } catch (_) { }
    report.push({ idx, label, file });
    console.log(`  📸 [${num}] ${label}`);
}

async function wait(page, ms = 1000) { await page.waitForTimeout(ms); }

(async () => {
    const startTime = Date.now();

    // ── Auth ──
    console.log('═══ AUTH ═══');
    const resp = await fetch(`${API}/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'YANHESAP', password: 'YANHESAP' })
    });
    const { access: accessToken, refresh: refreshToken } = await resp.json();
    if (!accessToken) { console.error('Login failed'); process.exit(1); }
    console.log('  ✅ Token acquired');

    // ── Browser ──
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, serviceWorkers: 'block' });
    const page = await context.newPage();

    page.on('console', msg => {
        if (msg.type() === 'error' && !msg.text().includes('Content Security Policy') && !msg.text().includes('favicon')) {
            jsErrors.push(msg.text().slice(0, 300));
        }
    });
    page.on('pageerror', err => jsErrors.push('PAGE_ERR: ' + err.message.slice(0, 300)));

    // ── Load app with token ──
    console.log('\n═══ LOAD APP ═══');
    await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.evaluate(({ at, rt }) => {
        localStorage.setItem('access_token', at);
        localStorage.setItem('refresh_token', rt);
    }, { at: accessToken, rt: refreshToken });
    await page.reload({ waitUntil: 'networkidle', timeout: 30000 });
    await wait(page, 5000);
    await shot(page, '00_home');

    // ═══════════════════════════════════════════════════════════════════
    // PawPaw SERVER — has text, voice, and kanban
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n═══ PAWPAW SERVER ═══');

    // Click PawPaw server icon
    const pawpawBtn = page.locator('[role="button"][title="PawPaw"]');
    if (await pawpawBtn.isVisible({ timeout: 5000 })) {
        await pawpawBtn.click();
        await wait(page, 3000);
        await shot(page, '01_pawpaw_default');
        console.log('  ✅ PawPaw server opened');
    } else {
        console.log('  ❌ PawPaw icon not found');
    }

    // ── Text channel: genel ──
    console.log('\n  --- TEXT: genel ---');
    // Use Playwright locator to click the .channel-item div containing "genel"
    const genelChannel = page.locator('.channel-item.text-channel').filter({ hasText: /^genel$/ });
    const genelCount = await genelChannel.count();
    console.log(`  "genel" text-channel matches: ${genelCount}`);
    if (genelCount > 0) {
        await genelChannel.first().click();
        await wait(page, 3000);
        await shot(page, '02_pawpaw_genel_chat');
        // Get header text
        const header = await page.locator('.chat-header-elevated, [class*="chatHeader"]').first().innerText().catch(() => '');
        console.log(`  Header: "${header.trim().slice(0, 80)}"`);
    } else {
        // Fallback: try clicking channel-wrapper
        const fallback = page.locator('.channel-wrapper').filter({ hasText: 'genel' }).first();
        if (await fallback.isVisible({ timeout: 3000 })) {
            await fallback.click();
            await wait(page, 3000);
            await shot(page, '02_pawpaw_genel_chat_fallback');
        }
    }

    // Check message input
    const msgInput = page.locator('textarea').first();
    if (await msgInput.isVisible({ timeout: 2000 })) {
        const placeholder = await msgInput.getAttribute('placeholder');
        console.log(`  Message input placeholder: "${placeholder}"`);
    }

    // ── Text channel: PawPaw AI ──
    console.log('\n  --- TEXT: PawPaw AI ---');
    const aiChannel = page.locator('.channel-item.text-channel').filter({ hasText: 'PawPaw AI' });
    if (await aiChannel.count() > 0) {
        await aiChannel.first().click();
        await wait(page, 3000);
        await shot(page, '03_pawpaw_ai_chat');
        const header = await page.locator('.chat-header-elevated, [class*="chatHeader"]').first().innerText().catch(() => '');
        console.log(`  Header: "${header.trim().slice(0, 80)}"`);
    }

    // ── Text channel: Sinyal Bot ──
    console.log('\n  --- TEXT: Sinyal Bot ---');
    const sinyalChannel = page.locator('.channel-item.text-channel').filter({ hasText: 'Sinyal Bot' });
    if (await sinyalChannel.count() > 0) {
        await sinyalChannel.first().click();
        await wait(page, 3000);
        await shot(page, '04_pawpaw_sinyal_bot_chat');
        const header = await page.locator('.chat-header-elevated, [class*="chatHeader"]').first().innerText().catch(() => '');
        console.log(`  Header: "${header.trim().slice(0, 80)}"`);
    }

    // ── KANBAN channel ──
    console.log('\n  --- KANBAN ---');
    // The kanban channel is under METİN KANALLARI category, listed as text-channel class
    const kanbanChannel = page.locator('.channel-item').filter({ hasText: /^kanban$/i });
    const kanbanCount = await kanbanChannel.count();
    console.log(`  "kanban" channel matches: ${kanbanCount}`);
    if (kanbanCount > 0) {
        await kanbanChannel.first().click();
        await wait(page, 4000);
        await shot(page, '05_pawpaw_kanban');
        const header = await page.locator('.chat-header-elevated, [class*="chatHeader"], h2').first().innerText().catch(() => '');
        console.log(`  Header: "${header.trim().slice(0, 80)}"`);
        // Check for kanban-specific elements
        const pageText = await page.evaluate(() => document.body.innerText.slice(0, 1000));
        console.log(`  Page text: "${pageText.slice(0, 300)}"`);
        const hasKanbanUI = pageText.includes('Kolon') || pageText.includes('Column') || pageText.includes('Pano') || pageText.includes('Board') || pageText.includes('Kart');
        console.log(`  Has kanban UI: ${hasKanbanUI}`);
    }

    // ── Voice channel: Sohbet ──
    console.log('\n  --- VOICE: Sohbet ---');
    const voiceChannel = page.locator('.channel-item.voice-channel').filter({ hasText: 'Sohbet' });
    if (await voiceChannel.count() > 0) {
        await voiceChannel.first().click();
        await wait(page, 3000);
        await shot(page, '06_pawpaw_voice_sohbet');
        // Check voice state
        const voiceState = await page.evaluate(() => {
            const body = document.body.innerText;
            return {
                joined: body.includes('1/∞') || body.includes('(Sen)') || body.includes('(You)'),
                error: body.includes('Could not') || body.includes('Bağlanamadı')
            };
        });
        console.log(`  Voice joined: ${voiceState.joined}, error: ${voiceState.error}`);
    }

    // ═══════════════════════════════════════════════════════════════════
    // AAAA SERVER
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n═══ AAAA SERVER ═══');

    const aaaaBtn = page.locator('[role="button"][title="AAAA"]');
    if (await aaaaBtn.isVisible({ timeout: 5000 })) {
        await aaaaBtn.click();
        await wait(page, 3000);
        await shot(page, '07_aaaa_default');
        console.log('  ✅ AAAA server opened');
    }

    // ── Text: genel ──
    console.log('\n  --- TEXT: genel ---');
    const aaaaGenel = page.locator('.channel-item.text-channel').filter({ hasText: /^genel$/ });
    if (await aaaaGenel.count() > 0) {
        await aaaaGenel.first().click();
        await wait(page, 3000);
        await shot(page, '08_aaaa_genel_chat');
        const header = await page.locator('.chat-header-elevated, [class*="chatHeader"]').first().innerText().catch(() => '');
        console.log(`  Header: "${header.trim().slice(0, 80)}"`);
        const placeholder = await page.locator('textarea').first().getAttribute('placeholder').catch(() => '');
        console.log(`  Input placeholder: "${placeholder}"`);
    }

    // ── Voice: Chat ──
    console.log('\n  --- VOICE: Chat ---');
    const aaaaVoice = page.locator('.channel-item.voice-channel').filter({ hasText: 'Chat' });
    if (await aaaaVoice.count() > 0) {
        await aaaaVoice.first().click();
        await wait(page, 3000);
        await shot(page, '09_aaaa_voice_chat');
    }

    // ═══════════════════════════════════════════════════════════════════
    // EXTRA: Check DM view
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n═══ DM VIEW ═══');
    const homeBtn = page.locator('[role="button"][aria-label="Home"]');
    if (await homeBtn.isVisible({ timeout: 3000 })) {
        await homeBtn.click();
        await wait(page, 3000);
        await shot(page, '10_home_dm_view');
    }

    // ═══════════════════════════════════════════════════════════════════
    // SUMMARY
    // ═══════════════════════════════════════════════════════════════════
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log('\n\n═══════════════════════════════════════════════════');
    console.log(`  AUDIT COMPLETE — ${idx} screenshots in ${elapsed}s`);
    console.log(`  JS Errors: ${jsErrors.length}`);
    jsErrors.forEach(e => console.log(`    ❌ ${e.slice(0, 200)}`));
    console.log('═══════════════════════════════════════════════════');

    fs.writeFileSync(path.join(SHOTS, 'report.json'), JSON.stringify({ report, jsErrors, elapsed }, null, 2));
    await browser.close();
})();
