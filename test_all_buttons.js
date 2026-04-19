/**
 * Pawscord Comprehensive Button/Modal Integration Test v2
 * Logs in, clicks EVERY interactive element, captures all console/API errors.
 * Run: node test_all_buttons.js
 */
const { chromium } = require('@playwright/test');
const fs = require('fs');

const BASE_URL = 'https://www.pawscord.com';
const USERNAME = 'YANHESAP';
const PASSWORD = 'YANHESAP';

const errors = [];
const warnings = [];
const results = [];
const apiErrors = [];
let screenshotIdx = 0;

function log(icon, label, detail = '') {
    const line = `${icon} ${label}${detail ? ': ' + detail : ''}`;
    console.log(line);
    results.push(line);
}

function shot(name) {
    screenshotIdx++;
    return `test_${String(screenshotIdx).padStart(3, '0')}_${name.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 40)}.png`;
}

async function tryClick(page, selector, label, options = {}) {
    const visTimeout = options.timeout || 3000;
    const clickTimeout = options.timeout || 3000;
    try {
        const el = page.locator(selector).first();
        if (await el.isVisible({ timeout: visTimeout })) {
            await el.click({ timeout: clickTimeout });
            log('✅', label);
            await page.waitForTimeout(700);
            return true;
        }
        log('⚠️', label, 'not visible');
        return false;
    } catch (e) {
        log('❌', label, e.message.split('\n')[0].slice(0, 80));
        return false;
    }
}

async function closeModal(page) {
    // Press Escape up to 3 times to handle multi-step dialogs
    for (let i = 0; i < 3; i++) {
        await page.keyboard.press('Escape');
        await page.waitForTimeout(400);
        // Check if any overlay is still visible
        try {
            const overlay = page.locator('[role="dialog"], [role="presentation"][class*="overlay" i], [class*="modalOverlay" i], [class*="Modal"] > div[style*="position: fixed"]').first();
            if (!await overlay.isVisible({ timeout: 300 })) break;
        } catch (_) { break; }
    }
    // Click top-left corner (outside any modal, if overlay captures clicks)
    try { await page.mouse.click(8, 8); await page.waitForTimeout(250); } catch (_) { }
    // Try explicit close buttons as fallback
    for (const sel of [
        'button[aria-label="Close"]', 'button[aria-label="Kapat"]',
        'button[aria-label="on Close"]', 'button[aria-label="cancel"]',
        'button:has-text("Cancel")', 'button:has-text("İptal")',
    ]) {
        try {
            if (await page.locator(sel).first().isVisible({ timeout: 400 })) {
                await page.locator(sel).first().click();
                await page.waitForTimeout(300);
                break;
            }
        } catch (_) { }
    }
    await page.waitForTimeout(300);
}

// More aggressive: press Escape + navigate home + wait for modals to clear
async function resetToHome(page) {
    for (let i = 0; i < 4; i++) {
        await page.keyboard.press('Escape');
        await page.waitForTimeout(350);
    }
    // Try explicit Close button (for Create Server form which uses button[aria-label="Close"])
    try {
        const closeBtn = page.locator('button[aria-label="Close"]').first();
        if (await closeBtn.isVisible({ timeout: 500 })) {
            await closeBtn.click();
            await page.waitForTimeout(500);
        }
    } catch (_) { }
    try { await page.mouse.click(8, 8); await page.waitForTimeout(300); } catch (_) { }
    // Navigate to Home button
    try {
        const homeBtn = page.locator('[aria-label="Home"]').first();
        if (await homeBtn.isVisible({ timeout: 2000 })) {
            await homeBtn.click();
            await page.waitForTimeout(700);
            return;
        }
    } catch (_) { }
    // Last resort: reload the page (will stay logged in via cookie/session)
    log('⚠️', 'resetToHome: Home not visible, reloading page');
    try {
        await page.reload({ waitUntil: 'domcontentloaded', timeout: 20000 });
        await page.waitForTimeout(3000);
        // Try Home again after reload
        const homeBtn2 = page.locator('[aria-label="Home"]').first();
        if (await homeBtn2.isVisible({ timeout: 3000 })) {
            await homeBtn2.click();
            await page.waitForTimeout(700);
        }
    } catch (_) { }
    await page.waitForTimeout(400);
}

async function safeScreenshot(page, name) {
    try { await page.screenshot({ path: shot(name), fullPage: false }); } catch (_) { }
}

// ─── Navigate into a DM so we have a real chat area ──────────────────────────
async function navigateToDM(page, preferUser = 'iyzico') {
    try {
        // Click Home first to get back to DM list
        await tryClick(page, '[aria-label="Home"]', 'Home (before DM nav)');
        await page.waitForTimeout(800);

        // Look in DIRECT MESSAGES section for the exact user
        const dm = page.locator('li, [role="listitem"]').filter({ hasText: preferUser }).first();
        if (await dm.isVisible({ timeout: 3000 })) {
            await dm.click();
            log('✅', `Opened DM: ${preferUser}`);
            await page.waitForTimeout(2500);
            return true;
        }
        // Fallback: any DM item
        const anyDm = page.locator('[aria-label*="Direct Messages"] [role="button"], [class*="dmItem"], [class*="DmItem"]').first();
        if (await anyDm.isVisible({ timeout: 2000 })) {
            await anyDm.click();
            log('✅', 'Opened first available DM');
            await page.waitForTimeout(2500);
            return true;
        }
    } catch (e) {
        log('❌', 'DM navigation', e.message.split('\n')[0].slice(0, 80));
    }
    return false;
}

(async () => {
    const browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-dev-shm-usage'],
    });
    const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36',
    });
    const page = await context.newPage();

    // ── Listeners ──────────────────────────────────────────────────────────
    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push(msg.text());
            console.error(`[CONSOLE ERROR] ${msg.text()}`);
        } else if (msg.type() === 'warning') {
            warnings.push(msg.text());
        }
    });
    page.on('pageerror', err => {
        errors.push(`PAGE_ERROR: ${err.message}`);
        console.error(`[PAGE ERROR] ${err.message}`);
    });
    page.on('response', async resp => {
        const status = resp.status();
        const url = resp.url();
        if (status >= 400 && url.includes('/api/')) {
            const entry = `${status} ${url.replace(/https?:\/\/[^/]+/, '')}`;
            if (!apiErrors.includes(entry)) apiErrors.push(entry);
            console.warn(`[API ${status}] ${url}`);
        }
    });

    // ════════════════════════════════════════════════════════════════
    // PHASE 1 — LOGIN
    // ════════════════════════════════════════════════════════════════
    console.log('\n══ PHASE 1: LOGIN ══════════════════════════════');
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2500);
    await page.fill('input[aria-label="Username"]', USERNAME);
    await page.fill('input[aria-label="Password"]', PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(7000);
    await safeScreenshot(page, 'after_login');
    log('ℹ️', 'URL after login', page.url());

    // ════════════════════════════════════════════════════════════════
    // PHASE 2 — HOME SCREEN CARDS
    // ════════════════════════════════════════════════════════════════
    console.log('\n══ PHASE 2: HOME SCREEN CARDS ══════════════════');
    await tryClick(page, '[aria-label="Home"]', 'Home button');
    await page.waitForTimeout(600);

    for (const card of ['Arkadaşlar', 'Sunucular', 'Aktiviteler', 'Yapay Zeka']) {
        const clicked = await tryClick(page,
            `[role="button"]:has-text("${card}"), button:has-text("${card}")`,
            `Home card: ${card}`);
        if (clicked) {
            await safeScreenshot(page, `home_card_${card}`);
            await closeModal(page);
            await tryClick(page, '[aria-label="Home"]', 'Home (return)');
            await page.waitForTimeout(500);
        }
    }

    // ════════════════════════════════════════════════════════════════
    // PHASE 3 — SERVER RAIL (left sidebar icons)
    // ════════════════════════════════════════════════════════════════
    console.log('\n══ PHASE 3: SERVER RAIL BUTTONS ════════════════');

    await tryClick(page, '[aria-label="Discover Servers"]', 'Discover Servers');
    await safeScreenshot(page, 'discover_servers');
    await closeModal(page);

    await tryClick(page, '[aria-label="Premium Store"]', 'Premium Store');
    await safeScreenshot(page, 'premium_store');

    // Check inner Premium tabs
    for (const tab of ['Premium', 'Magaza', 'Server Boost']) {
        const tabEl = page.locator(`[role="tab"]:has-text("${tab}"), button:has-text("${tab}")`).first();
        try {
            if (await tabEl.isVisible({ timeout: 1500 })) {
                await tabEl.click();
                log('✅', `Premium tab: ${tab}`);
                await page.waitForTimeout(600);
                await safeScreenshot(page, `premium_tab_${tab}`);
            }
        } catch (_) { }
    }
    await closeModal(page);

    await tryClick(page, '[aria-label="Server add"]', 'Add Server (+)');
    await safeScreenshot(page, 'add_server');
    // Try Create Server / Find Server sub-buttons
    for (const btn of ['Create Server', 'Find Server', 'Add Friend']) {
        const el = page.locator(`button:has-text("${btn}"), [role="button"]:has-text("${btn}"), button[aria-label="${btn}"]`).first();
        try {
            if (await el.isVisible({ timeout: 1000 })) {
                await el.click();
                log('✅', `Add server menu: ${btn}`);
                await page.waitForTimeout(1000);
                await safeScreenshot(page, `add_server_${btn}`);
                // Close everything aggressively - multi-step modal needs multiple Escapes
                for (let r = 0; r < 4; r++) {
                    await page.keyboard.press('Escape');
                    await page.waitForTimeout(400);
                }
                try { await page.mouse.click(8, 8); await page.waitForTimeout(400); } catch (_) { }
                // Re-open server-add modal for next button (if not last)
                if (btn !== 'Add Friend') {
                    await page.waitForTimeout(500);
                    const addBtn = page.locator('[aria-label="Server add"]').first();
                    if (await addBtn.isVisible({ timeout: 2000 })) {
                        await addBtn.click();
                        await page.waitForTimeout(700);
                    }
                }
            }
        } catch (_) { }
    }
    // Final close of server-add modal
    for (let r = 0; r < 3; r++) { await page.keyboard.press('Escape'); await page.waitForTimeout(400); }
    try { await page.mouse.click(8, 8); await page.waitForTimeout(400); } catch (_) { }

    // ════════════════════════════════════════════════════════════════
    // PHASE 4 — USER FOOTER (Settings, Profile, Mic/Deafen)
    // ════════════════════════════════════════════════════════════════
    console.log('\n══ PHASE 4: USER FOOTER ════════════════════════');
    await resetToHome(page);

    const settingsOpened = await tryClick(page, 'button[aria-label="Settings"]', 'Settings (cog)');
    if (settingsOpened) {
        await safeScreenshot(page, 'settings_open');

        const settingsTabs = [
            'Hesabım', 'Gizlilik ve Güvenlik', 'Bağlantılar',
            'Görünüm', 'Ses ve Video', 'Bildirimler', 'Klavye Kısayolları',
            'Dil', 'Aktivite Durumu', 'Oturumlar', 'Gelişmiş',
        ];
        for (const tab of settingsTabs) {
            const tabEl = page.locator(`[role="button"]:has-text("${tab}"), button:has-text("${tab}"), li:has-text("${tab}")`).first();
            try {
                if (await tabEl.isVisible({ timeout: 1000 })) {
                    await tabEl.click();
                    log('✅', `Settings tab: ${tab}`);
                    await page.waitForTimeout(600);
                    await safeScreenshot(page, `settings_${tab}`);
                }
            } catch (_) { }
        }
        await closeModal(page);
    }

    // Click username row (opens profile panel)
    try {
        const userRow = page.locator('[role="button"]').filter({ hasText: USERNAME }).last();
        if (await userRow.isVisible({ timeout: 2000 })) {
            await userRow.click();
            log('✅', 'Profile panel (username row)');
            await page.waitForTimeout(800);
            await safeScreenshot(page, 'profile_panel');
            await closeModal(page);
        }
    } catch (_) { }

    // ════════════════════════════════════════════════════════════════
    // PHASE 5 — QUICK ACCESS BUTTONS (bottom of home panel)
    // ════════════════════════════════════════════════════════════════
    console.log('\n══ PHASE 5: QUICK ACCESS BUTTONS ═══════════════');
    await resetToHome(page);

    const quickBtns = [
        '💰 Payment Panel', '🛒 Store', '🎁 Daily Rewards',
        '📊 API Usage', '📥 Export Jobs', '📢 Scheduled Announcements',
        '🎮 Mini Games', '📂 Projects', '🎨 Avatar Studio',
    ];
    for (const label of quickBtns) {
        const clicked = await tryClick(page, `[aria-label="${label}"]`, `Quick: ${label}`, { timeout: 4000 });
        if (clicked) {
            await safeScreenshot(page, `quick_${label.replace(/[^a-z0-9]/gi, '_').slice(0, 30)}`);
            await closeModal(page);
            await page.waitForTimeout(300);
        }
    }

    // Admin Panel (aria-label confirmed from RoomList.js: "Open Admin Panel")
    await tryClick(page, 'button[aria-label="Open Admin Panel"], button:has-text("Admin Panel"), [aria-label="Admin Panel"]', 'Admin Panel');
    await safeScreenshot(page, 'admin_panel');
    await closeModal(page);

    // Support Developer heart button
    await tryClick(page, '[aria-label*="support" i], [aria-label*="destek" i], button:has-text("Support Developer")', 'Support Developer');
    await page.waitForTimeout(500);
    await safeScreenshot(page, 'support_developer');
    await closeModal(page);

    // ════════════════════════════════════════════════════════════════
    // PHASE 6 — DM LIST: Open each DM
    // ════════════════════════════════════════════════════════════════
    console.log('\n══ PHASE 6: DM LIST ════════════════════════════');
    await resetToHome(page);

    // Add DM button
    await tryClick(page, 'button[aria-label="Ekle"], button:has-text("Ekle")', 'Add DM (+)');
    await safeScreenshot(page, 'add_dm');
    await closeModal(page);

    // Click each DM item
    const dmItems = ['PawPaw', 'iyzico'];
    for (const dm of dmItems) {
        // Try multiple selector strategies for DM items
        const dmEl = page.locator([
            `[aria-label="${dm}"]`,
            `[role="button"][title="${dm}"]`,
            `li:has-text("${dm}")`,
            `[class*="dm" i]:has-text("${dm}")`,
            `[class*="friend" i]:has-text("${dm}")`,
        ].join(', ')).first();
        try {
            if (await dmEl.isVisible({ timeout: 3000 })) {
                await dmEl.click();
                log('✅', `DM opened: ${dm}`);
                await page.waitForTimeout(2500);
                await safeScreenshot(page, `dm_${dm}`);

                // ── Phase 6a: Chat toolbar ──
                const toolbarBtn = page.locator('button[aria-label="More options"]').first();
                if (await toolbarBtn.isVisible({ timeout: 2000 })) {
                    await toolbarBtn.click();
                    log('✅', `Toolbar ⋮ opened in DM: ${dm}`);
                    await page.waitForTimeout(600);
                    await safeScreenshot(page, `dm_${dm}_toolbar`);

                    // Click each toolbar menu item
                    const toolItems = await page.locator('[role="menuitem"], [role="menu"] button').all();
                    log('ℹ️', `Toolbar items found: ${toolItems.length}`);
                    for (let i = 0; i < toolItems.length; i++) {
                        try {
                            const text = await toolItems[i].textContent();
                            if (await toolItems[i].isVisible({ timeout: 500 })) {
                                await toolItems[i].click();
                                log('✅', `  Toolbar item [${i}]: ${text?.trim().slice(0, 30)}`);
                                await page.waitForTimeout(800);
                                await safeScreenshot(page, `dm_${dm}_toolbar_${i}`);
                                await closeModal(page);
                                // Reopen toolbar
                                if (await toolbarBtn.isVisible({ timeout: 1500 })) {
                                    await toolbarBtn.click();
                                    await page.waitForTimeout(400);
                                }
                            }
                        } catch (_) { }
                    }
                    await closeModal(page);
                }

                // ── Phase 6b: Input + menu ──
                const inputMenuBtn = page.locator('button[aria-label="Message options menu"]').first();
                if (await inputMenuBtn.isVisible({ timeout: 1500 })) {
                    await inputMenuBtn.click();
                    log('✅', `Input menu (+) opened in: ${dm}`);
                    await page.waitForTimeout(500);
                    await safeScreenshot(page, `dm_${dm}_input_menu`);

                    const menuItems = await page.locator('[role="menu"] button, [role="menuitem"]').all();
                    for (let i = 0; i < menuItems.length; i++) {
                        try {
                            const text = await menuItems[i].textContent();
                            if (await menuItems[i].isVisible({ timeout: 500 })) {
                                await menuItems[i].click();
                                log('✅', `  Input menu item [${i}]: ${text?.trim().slice(0, 30)}`);
                                await page.waitForTimeout(800);
                                await safeScreenshot(page, `dm_${dm}_input_${i}`);
                                await closeModal(page);
                                if (await inputMenuBtn.isVisible({ timeout: 1500 })) {
                                    await inputMenuBtn.click();
                                    await page.waitForTimeout(400);
                                }
                            }
                        } catch (_) { }
                    }
                    await page.keyboard.press('Escape');
                }

                // ── Phase 6c: Emoji picker button ──
                const emojiBtn = page.locator('button[aria-label="Emoji picker"], button[aria-label*="emoji" i], button[aria-label*="Emoji"]').first();
                if (await emojiBtn.isVisible({ timeout: 1500 })) {
                    await emojiBtn.click();
                    log('✅', `Emoji picker opened in: ${dm}`);
                    await page.waitForTimeout(600);
                    await safeScreenshot(page, `dm_${dm}_emoji`);

                    // Click category buttons inside emoji picker
                    const catBtns = await page.locator('[aria-label="emoji-picker"] button, [class*="categoryButton"], [class*="emojiCategory"]').all();
                    log('ℹ️', `Emoji categories found: ${catBtns.length}`);
                    for (let c = 0; c < Math.min(catBtns.length, 8); c++) {
                        try {
                            if (await catBtns[c].isVisible({ timeout: 500 })) {
                                await catBtns[c].click();
                                await page.waitForTimeout(300);
                            }
                        } catch (_) { }
                    }
                    await closeModal(page);
                }

                // ── Phase 6d: GIF button ──
                await tryClick(page,
                    'button[aria-label="GIF picker"], button[aria-label*="GIF"], button[aria-label*="gif"]',
                    `GIF picker in: ${dm}`);
                await safeScreenshot(page, `dm_${dm}_gif`);
                await closeModal(page);

                // ── Phase 6e: Sticker button ──
                await tryClick(page,
                    'button[aria-label="Sticker picker"], button[aria-label*="sticker" i]',
                    `Sticker picker in: ${dm}`);
                await safeScreenshot(page, `dm_${dm}_sticker`);
                await closeModal(page);

                // ── Phase 6f: Right-click a message (context menu) ──
                try {
                    const msg = page.locator('[role="listitem"] [data-message-id], [class*="messageContent"], [class*="MessageContent"]').first();
                    if (await msg.isVisible({ timeout: 2000 })) {
                        await msg.hover();
                        await page.waitForTimeout(300);
                        // Hover action bar: react, reply, edit, delete
                        const actionBtns = await page.locator('[class*="messageActions"] button, [class*="MessageActions"] button, [aria-label*="React"], [aria-label*="Reply"], [aria-label*="Edit"], [aria-label*="Delete"]').all();
                        log('ℹ️', `Message hover action buttons: ${actionBtns.length}`);
                        for (const btn of actionBtns.slice(0, 5)) {
                            try {
                                const label2 = await btn.getAttribute('aria-label');
                                if (await btn.isVisible({ timeout: 500 })) {
                                    await btn.click();
                                    log('✅', `  Msg action: ${label2}`);
                                    await page.waitForTimeout(700);
                                    await safeScreenshot(page, `dm_${dm}_msgaction_${label2}`);
                                    await closeModal(page);
                                    await msg.hover(); // re-hover to get action bar
                                    await page.waitForTimeout(300);
                                }
                            } catch (_) { }
                        }
                        // Context menu
                        await msg.click({ button: 'right' });
                        await page.waitForTimeout(500);
                        await safeScreenshot(page, `dm_${dm}_contextmenu`);
                        const ctxItems = await page.locator('[role="menu"] [role="menuitem"], [role="menu"] button').all();
                        log('ℹ️', `Context menu items: ${ctxItems.length}`);
                        for (let i = 0; i < Math.min(ctxItems.length, 8); i++) {
                            try {
                                const text = await ctxItems[i].textContent();
                                // Skip destructive actions like delete/ban
                                if (/delete|sil|ban|kick/i.test(text || '')) continue;
                                if (await ctxItems[i].isVisible({ timeout: 500 })) {
                                    await ctxItems[i].click();
                                    log('✅', `  Context menu [${i}]: ${text?.trim().slice(0, 30)}`);
                                    await page.waitForTimeout(700);
                                    await safeScreenshot(page, `dm_${dm}_ctx_${i}`);
                                    await closeModal(page);
                                    // Re-open context menu for next item
                                    if (i < ctxItems.length - 1) {
                                        await msg.click({ button: 'right' });
                                        await page.waitForTimeout(400);
                                    }
                                }
                            } catch (_) { }
                        }
                        await page.keyboard.press('Escape');
                    }
                } catch (e) {
                    log('⚠️', 'Message actions', e.message.split('\n')[0].slice(0, 80));
                }

                // ── Phase 6g: User member list / right sidebar ──
                const membersBtn = page.locator('button[aria-label*="Members"], button[aria-label*="Üyeler"]').first();
                if (await membersBtn.isVisible({ timeout: 1000 })) {
                    await membersBtn.click();
                    log('✅', 'Members list opened');
                    await page.waitForTimeout(700);
                    await safeScreenshot(page, `dm_${dm}_members`);
                    await membersBtn.click(); // toggle off
                    await page.waitForTimeout(400);
                }

            }
        } catch (e) {
            log('❌', `DM ${dm}`, e.message.split('\n')[0].slice(0, 80));
        }

        // Return to home between DMs
        await tryClick(page, '[aria-label="Home"]', 'Home (after DM)');
        await page.waitForTimeout(500);
    }

    // ════════════════════════════════════════════════════════════════
    // PHASE 7 — SERVER CHANNEL NAVIGATION
    // ════════════════════════════════════════════════════════════════
    console.log('\n══ PHASE 7: SERVER CHANNELS ════════════════════');
    await resetToHome(page);
    // Click the first server icon in the rail (not Home, Discover, Premium, or Add Server).
    // ServerRail renders servers as role="listitem" > role="button" aria-label={server.name}
    // inside role="list" aria-label="Serverlar"
    try {
        const knownBtns = ['Home', 'Discover Servers', 'Premium Store', 'Server add'];
        const serverIcons = await page.locator('[role="list"][aria-label="Serverlar"] [role="button"]').all();
        const userServers = serverIcons.filter
            ? serverIcons  // filter applied below after getting labels
            : serverIcons;
        // Get all and filter out known fixed buttons
        const validIcons = [];
        for (const icon of serverIcons) {
            const label = await icon.getAttribute('aria-label').catch(() => '');
            if (!knownBtns.includes(label)) validIcons.push({ icon, label });
        }
        if (validIcons.length > 0) {
            const { icon: firstIcon, label: firstLabel } = validIcons[0];
            await firstIcon.click();
            log('✅', `Opened first server: ${firstLabel}`);
            await page.waitForTimeout(1500);
            await safeScreenshot(page, 'server_first');

            // Click each channel — channels use [data-channel-id] or role="listitem" in the channel list
            const channels = await page.locator('[data-channel-id], [aria-label][class*="channel"], [role="listitem"]:has([aria-label][class*="channel"])').all();
            log('ℹ️', `Channels found: ${channels.length}`);
            for (let i = 0; i < Math.min(channels.length, 5); i++) {
                try {
                    const label2 = await channels[i].getAttribute('aria-label');
                    await channels[i].click();
                    log('✅', `  Channel [${i}]: ${label2}`);
                    await page.waitForTimeout(1200);
                    await safeScreenshot(page, `server_channel_${i}`);
                } catch (_) { }
            }
        } else {
            log('⚠️', 'No user servers found in rail (test account may not be in any server)');
        }
    } catch (e) {
        log('⚠️', 'Server navigation', e.message.split('\n')[0].slice(0, 80));
    }

    // ════════════════════════════════════════════════════════════════
    // PHASE 8 — MODALS VIA ZUSTAND (openModal key buttons)
    // ════════════════════════════════════════════════════════════════
    console.log('\n══ PHASE 8: ADDITIONAL MODALS ══════════════════');
    await resetToHome(page);

    // Download modal
    await tryClick(page, 'button[aria-label*="Download"], button:has-text("Download")', 'Download modal');
    await safeScreenshot(page, 'download_modal');
    await closeModal(page);

    // Notification bell
    await tryClick(page, 'button[aria-label*="Notif" i], button[aria-label*="Bildirim" i]', 'Notifications');
    await safeScreenshot(page, 'notifications');
    await closeModal(page);

    // ════════════════════════════════════════════════════════════════
    // FINAL REPORT
    // ════════════════════════════════════════════════════════════════
    await safeScreenshot(page, 'zz_final_state');
    await browser.close();

    console.log('\n════════════════════════════════════════════════');
    console.log('                 FINAL REPORT');
    console.log('════════════════════════════════════════════════');

    const passed = results.filter(r => r.startsWith('✅')).length;
    const failed = results.filter(r => r.startsWith('❌')).length;
    const warned = results.filter(r => r.startsWith('⚠️')).length;
    console.log(`\n  ✅ PASSED:   ${passed}`);
    console.log(`  ❌ FAILED:   ${failed}`);
    console.log(`  ⚠️  WARNINGS: ${warned}`);

    if (errors.length > 0) {
        console.log(`\n🔴 CONSOLE ERRORS (${errors.length} total, deduped):`);
        [...new Set(errors)].forEach(e => console.log(`  • ${e}`));
    } else {
        console.log('\n🟢 No console errors!');
    }

    if (apiErrors.length > 0) {
        console.log(`\n🟡 API ERRORS (${apiErrors.length}):`);
        [...new Set(apiErrors)].forEach(e => console.log(`  • ${e}`));
    } else {
        console.log('🟢 No API errors!');
    }

    if (warnings.length > 0) {
        const uniq = [...new Set(warnings)].slice(0, 15);
        console.log(`\n🟡 CONSOLE WARNINGS (${warnings.length} total, showing ${uniq.length}):`);
        uniq.forEach(w => console.log(`  • ${w}`));
    }

    // Write JSON summary
    fs.writeFileSync('test_results.json', JSON.stringify({
        passed, failed, warned,
        errors: [...new Set(errors)],
        apiErrors: [...new Set(apiErrors)],
        warnings: [...new Set(warnings)].slice(0, 20),
        actions: results,
    }, null, 2));
    console.log('\n📄 Full results saved to test_results.json');
})();
