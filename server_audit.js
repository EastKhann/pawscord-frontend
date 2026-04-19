/**
 * Pawscord Server Audit — Messaging, Voice, Kanban
 * Tests server-specific features: text channels, voice channels, kanban boards
 * 
 * Run: cd frontend && node server_audit.js
 */
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const BASE = 'https://www.pawscord.com';
const API = 'https://api.pawscord.com/api';
const SHOTS = path.join(__dirname, 'screenshots_server');

// Clean up
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

async function tryClick(page, sel, timeout = 3000) {
    try {
        const el = page.locator(sel).first();
        if (await el.isVisible({ timeout })) {
            await el.click({ timeout });
            await wait(page, 800);
            return true;
        }
    } catch (_) { }
    return false;
}

(async () => {
    const startTime = Date.now();

    // ── Step 1: Get token via API ──
    console.log('═══ AUTHENTICATION ═══');
    let accessToken, refreshToken;
    try {
        const resp = await fetch(`${API}/auth/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'YANHESAP', password: 'YANHESAP' })
        });
        const data = await resp.json();
        accessToken = data.access;
        refreshToken = data.refresh;
        if (!accessToken) throw new Error('No access token: ' + JSON.stringify(data));
        console.log('  ✅ Token acquired');
    } catch (e) {
        console.error('  ❌ Login failed:', e.message);
        process.exit(1);
    }

    // ── Step 2: Launch browser ──
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        serviceWorkers: 'block',
    });
    const page = await context.newPage();

    page.on('console', msg => {
        if (msg.type() === 'error' && !msg.text().includes('Content Security Policy') && !msg.text().includes('favicon')) {
            jsErrors.push(msg.text().slice(0, 300));
        }
    });
    page.on('pageerror', err => {
        jsErrors.push('PAGE_ERR: ' + err.message.slice(0, 300));
    });

    // ── Step 3: Inject token and navigate ──
    console.log('\n═══ LOADING APP ═══');
    await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.evaluate(({ at, rt }) => {
        localStorage.setItem('access_token', at);
        localStorage.setItem('refresh_token', rt);
    }, { at: accessToken, rt: refreshToken });
    await page.reload({ waitUntil: 'networkidle', timeout: 30000 });
    await wait(page, 5000);
    await shot(page, 'home_loaded');

    // ═════════════════════════════════════════════════════════════════════
    // SERVER: Click server icons in the rail
    // ═════════════════════════════════════════════════════════════════════
    console.log('\n═══ FINDING SERVERS ═══');

    // The server rail has server icons rendered as listitem elements
    // with role="listitem" inside role="list" aria-label="Serverlar"
    const serverListItems = page.locator('[role="list"][aria-label="Serverlar"] [role="listitem"]');
    const serverCount = await serverListItems.count().catch(() => 0);
    console.log(`  Server icons found: ${serverCount}`);

    // Also look for clickable server items with title attributes
    const serverButtons = page.locator('[role="list"][aria-label="Serverlar"] [role="button"]');
    const btnCount = await serverButtons.count().catch(() => 0);
    console.log(`  Server buttons found: ${btnCount}`);

    // Try to list what we see in the server rail
    const railInfo = await page.evaluate(() => {
        const rail = document.querySelector('[role="list"][aria-label="Serverlar"]');
        if (!rail) return 'No server rail found';
        const items = rail.querySelectorAll('[role="listitem"]');
        return Array.from(items).map((el, i) => {
            const btn = el.querySelector('[role="button"]');
            return `  [${i}] title="${btn?.title || ''}" text="${btn?.innerText || ''}"`;
        }).join('\n');
    });
    console.log('  Rail contents:\n' + railInfo);

    // ═════════════════════════════════════════════════════════════════════
    // Click first server (should be AAAA or PawPaw)
    // ═════════════════════════════════════════════════════════════════════
    async function auditServer(serverIndex) {
        console.log(`\n═══ ENTERING SERVER [${serverIndex}] ═══`);

        // Click the server icon
        const serverBtn = page.locator('[role="list"][aria-label="Serverlar"] [role="listitem"]').nth(serverIndex).locator('[role="button"]');
        const title = await serverBtn.getAttribute('title').catch(() => 'unknown');
        console.log(`  Clicking server: "${title}"`);

        try {
            await serverBtn.click({ timeout: 5000 });
            await wait(page, 3000);
            await shot(page, `server_${slug(title)}_overview`);
        } catch (e) {
            console.log(`  ⚠️ Failed to click server: ${e.message}`);
            return;
        }

        // ── Inspect sidebar for categories & rooms ──
        const sidebarInfo = await page.evaluate(() => {
            // Look for category headers and room items in the left sidebar
            const allText = document.body.innerText;
            // Find elements that look like room/channel items
            const items = document.querySelectorAll('[class*="room"], [class*="channel"], [class*="Room"], [class*="Channel"]');
            const info = [];
            items.forEach(el => {
                if (el.innerText?.trim()) {
                    info.push(`${el.className?.slice(0, 50)}: "${el.innerText.trim().slice(0, 100)}"`);
                }
            });
            return info.slice(0, 30).join('\n');
        });
        console.log('  Sidebar items:\n' + sidebarInfo);

        // ── Find and click text channels ──
        console.log('\n  --- TEXT CHANNELS ---');

        // Look for channel/room list items - they're typically in the left sidebar
        // The rooms are rendered in category sections
        const roomElements = await page.evaluate(() => {
            // Get all clickable elements in the sidebar that look like channel names
            const candidates = [];

            // Pattern 1: Look for elements with channel/room related classes
            document.querySelectorAll('[data-room-slug], [data-channel-id], [class*="roomName"], [class*="channelName"]').forEach(el => {
                candidates.push({ text: el.innerText?.trim(), tag: el.tagName, class: el.className?.slice(0, 60) });
            });

            // Pattern 2: Look for text that matches known channel names
            const knownNames = ['genel', 'hoşgeldin', 'PawPaw AI', 'Sinyal Bot', 'Chat', 'Sohbet', 'kanban', 'sesliss', 'Sesss', 'AFK'];
            document.querySelectorAll('span, div, a, p').forEach(el => {
                const txt = el.innerText?.trim();
                if (txt && knownNames.some(n => txt.toLowerCase().includes(n.toLowerCase())) && txt.length < 100) {
                    candidates.push({ text: txt, tag: el.tagName, class: el.className?.slice(0, 60) });
                }
            });

            return candidates.slice(0, 20);
        });
        console.log(`  Found ${roomElements.length} room-like elements`);
        roomElements.forEach(r => console.log(`    ${r.tag}.${r.class}: "${r.text}"`));

        // Click "genel" text channel
        const clickedChannel = await page.evaluate(() => {
            // Find clickable element containing "genel" text
            const all = document.querySelectorAll('span, div, p');
            for (const el of all) {
                const txt = el.innerText?.trim();
                if (txt === 'genel' || txt === '# genel') {
                    // Make sure it's a reasonable element (not the entire page)
                    if (el.offsetWidth < 300 && el.offsetHeight < 60) {
                        el.click();
                        return txt;
                    }
                }
            }
            return null;
        });

        if (clickedChannel) {
            console.log(`  ✅ Clicked channel: "${clickedChannel}"`);
            await wait(page, 3000);
            await shot(page, `server_${slug(title)}_text_channel_genel`);

            // Check if a chat area loaded
            const chatInfo = await page.evaluate(() => {
                // Look for message input, message list, etc.
                const input = document.querySelector('textarea, [contenteditable="true"], input[placeholder*="mesaj"], input[placeholder*="message"]');
                const messages = document.querySelectorAll('[class*="message"], [class*="Message"]');
                return {
                    hasInput: !!input,
                    inputPlaceholder: input?.placeholder || input?.getAttribute('aria-label') || '',
                    messageCount: messages.length,
                    bodySnippet: document.body.innerText.slice(0, 500)
                };
            });
            console.log(`  Chat area: input=${chatInfo.hasInput}, messages=${chatInfo.messageCount}`);
            if (chatInfo.inputPlaceholder) console.log(`  Input placeholder: "${chatInfo.inputPlaceholder}"`);
        } else {
            console.log('  ⚠️ Could not find "genel" channel to click, trying broader search');
            // Try clicking any text channel item
            const clickedAny = await tryClick(page, '[class*="room"][class*="text"], [data-channel-type="text"]');
            if (clickedAny) {
                await wait(page, 3000);
                await shot(page, `server_${slug(title)}_first_text_channel`);
            }
        }

        // ── Try to find and type a test message (don't send) ──
        const inputFound = await page.evaluate(() => {
            const inputs = [
                ...document.querySelectorAll('textarea'),
                ...document.querySelectorAll('[contenteditable="true"]'),
                ...document.querySelectorAll('input[type="text"][placeholder*="mesaj"]'),
                ...document.querySelectorAll('input[type="text"][placeholder*="message"]'),
                ...document.querySelectorAll('input[type="text"][placeholder*="Mesaj"]'),
            ];
            if (inputs.length > 0) {
                return { found: true, tag: inputs[0].tagName, placeholder: inputs[0].placeholder || '', count: inputs.length };
            }
            return { found: false, count: 0 };
        });
        console.log(`  Message input: found=${inputFound.found}, count=${inputFound.count}`);
        if (inputFound.found) {
            console.log(`  Input: <${inputFound.tag}> placeholder="${inputFound.placeholder}"`);
        }

        // ── VOICE CHANNELS ──
        console.log('\n  --- VOICE CHANNELS ---');

        // Look for voice channel elements (they typically have a speaker/mic icon)
        const voiceClicked = await page.evaluate(() => {
            const all = document.querySelectorAll('span, div, p');
            const voiceNames = ['Chat', 'Sohbet', 'sesliss', 'Sesss', 'AFK'];
            for (const el of all) {
                const txt = el.innerText?.trim();
                if (txt && voiceNames.some(v => txt === v) && el.offsetWidth < 300 && el.offsetHeight < 60) {
                    // Check if it's in a voice category section
                    const parent = el.closest('[class*="category"], [class*="Category"]') || el.parentElement?.parentElement?.parentElement;
                    const parentText = parent?.innerText || '';
                    if (parentText.includes('SES') || parentText.includes('VOICE') || parentText.includes('ses')) {
                        el.click();
                        return txt;
                    }
                }
            }
            // Fallback: click anything with "Sohbet" or "Chat" that looks like voice
            for (const el of all) {
                const txt = el.innerText?.trim();
                if (txt && (txt === 'Sohbet' || txt === 'Chat') && el.offsetWidth < 300 && el.offsetHeight < 60) {
                    el.click();
                    return txt;
                }
            }
            return null;
        });

        if (voiceClicked) {
            console.log(`  ✅ Clicked voice channel: "${voiceClicked}"`);
            await wait(page, 3000);
            await shot(page, `server_${slug(title)}_voice_channel`);

            // Check for voice UI elements
            const voiceInfo = await page.evaluate(() => {
                const body = document.body.innerText;
                return {
                    hasJoinButton: body.includes('Bağlan') || body.includes('Join') || body.includes('Sesli') || body.includes('Connect'),
                    hasMicControl: !!document.querySelector('[aria-label*="mic"], [aria-label*="Mikrofon"], [class*="mic"]'),
                    bodySnippet: body.slice(0, 500)
                };
            });
            console.log(`  Voice UI: joinBtn=${voiceInfo.hasJoinButton}, micCtrl=${voiceInfo.hasMicControl}`);
        } else {
            console.log('  ⚠️ Could not find voice channel to click');
        }

        // ── KANBAN BOARD ──
        console.log('\n  --- KANBAN ---');

        const kanbanClicked = await page.evaluate(() => {
            const all = document.querySelectorAll('span, div, p');
            for (const el of all) {
                const txt = el.innerText?.trim();
                if (txt && (txt.toLowerCase() === 'kanban' || txt.toLowerCase().includes('kanban')) && el.offsetWidth < 300 && el.offsetHeight < 60) {
                    el.click();
                    return txt;
                }
            }
            return null;
        });

        if (kanbanClicked) {
            console.log(`  ✅ Clicked kanban: "${kanbanClicked}"`);
            await wait(page, 3000);
            await shot(page, `server_${slug(title)}_kanban_board`);

            // Check for kanban UI
            const kanbanInfo = await page.evaluate(() => {
                const body = document.body.innerText;
                return {
                    hasColumns: !!document.querySelector('[class*="kanban"], [class*="Kanban"], [class*="column"], [class*="Column"]'),
                    hasCards: !!document.querySelector('[class*="card"], [class*="Card"]'),
                    hasAddButton: body.includes('Kolon Ekle') || body.includes('Add Column') || body.includes('Kart Ekle') || body.includes('Add Card'),
                    bodySnippet: body.slice(0, 500)
                };
            });
            console.log(`  Kanban UI: columns=${kanbanInfo.hasColumns}, cards=${kanbanInfo.hasCards}, addBtn=${kanbanInfo.hasAddButton}`);
        } else {
            console.log('  ⚠️ No kanban channel found in this server');
        }
    }

    // ── Audit each server ──
    for (let i = 0; i < Math.min(serverCount, 3); i++) {
        await auditServer(i);

        // Go back to home between servers
        if (await tryClick(page, '[aria-label="Home"]')) {
            await wait(page, 2000);
        }
    }

    // If no servers found in rail, try alternative approach
    if (serverCount === 0) {
        console.log('\n⚠️ No servers in rail. Trying text-based approach...');

        // Look for server names in sidebar
        const sidebarText = await page.evaluate(() => {
            return document.body.innerText.slice(0, 2000);
        });
        console.log('  Page text (first 500 chars): ' + sidebarText.slice(0, 500));
        await shot(page, 'no_servers_debug');

        // Try clicking anything that says "AAAA" or "PawPaw"
        for (const serverName of ['AAAA', 'PawPaw']) {
            const clicked = await page.evaluate((name) => {
                const all = document.querySelectorAll('div, span, button, a');
                for (const el of all) {
                    if (el.title === name || (el.innerText?.trim() === name && el.offsetWidth < 200)) {
                        el.click();
                        return true;
                    }
                }
                return false;
            }, serverName);

            if (clicked) {
                console.log(`  ✅ Clicked server "${serverName}" via text`);
                await wait(page, 3000);
                await shot(page, `server_${serverName}_via_text`);
            }
        }
    }

    // ═════════════════════════════════════════════════════════════════════
    // EXTRA: Try direct room navigation via interacting with Zustand store
    // ═════════════════════════════════════════════════════════════════════
    console.log('\n═══ DIRECT ROOM NAVIGATION (Zustand Store) ═══');

    // The app stores state in Zustand — we can dispatch events
    const storeInfo = await page.evaluate(() => {
        // Look at what's currently in the React state
        const root = document.getElementById('root');
        if (!root || !root._reactRootContainer && !root.__reactFiber$) {
            // Try React 18 style
            const internalKey = Object.keys(root).find(k => k.startsWith('__reactFiber'));
            if (!internalKey) return 'No React fiber found';
        }
        return 'React app detected';
    });
    console.log(`  ${storeInfo}`);

    // ═════════════════════════════════════════════════════════════════════
    // SUMMARY
    // ═════════════════════════════════════════════════════════════════════
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log('\n\n═══════════════════════════════════════════════════');
    console.log(`  AUDIT COMPLETE — ${idx} screenshots in ${elapsed}s`);
    console.log(`  JS Errors: ${jsErrors.length}`);
    jsErrors.forEach(e => console.log(`    ❌ ${e.slice(0, 200)}`));
    console.log('═══════════════════════════════════════════════════');
    console.log('\nReport:');
    report.forEach(r => console.log(`  ${r.file}: ${r.label}`));

    // Save report
    fs.writeFileSync(path.join(SHOTS, 'report.json'), JSON.stringify({ report, jsErrors, elapsed }, null, 2));

    await browser.close();
})();
