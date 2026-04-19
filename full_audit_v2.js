// full_audit_v2.js — Comprehensive 100+ screen audit for PAWSCORD
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const SCREENSHOT_DIR = path.join(__dirname, '..', 'audit_screenshots_v2');
if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

let ssCount = 0;
const consoleLogs = {};
let currentPage = '';

async function ss(page, name) {
    ssCount++;
    const num = String(ssCount).padStart(3, '0');
    const safeName = name.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 60);
    const fpath = path.join(SCREENSHOT_DIR, `${num}_${safeName}.png`);
    await page.screenshot({ path: fpath, fullPage: false });
    console.log(`  [SS ${num}] ${name}`);
    return fpath;
}

function logConsole(page) {
    page.on('console', msg => {
        const type = msg.type();
        if (['error', 'warn'].includes(type)) {
            if (!consoleLogs[currentPage]) consoleLogs[currentPage] = [];
            consoleLogs[currentPage].push(`[${type}] ${msg.text().substring(0, 200)}`);
        }
    });
}

async function waitAndSS(page, name, ms = 1500) {
    await page.waitForTimeout(ms);
    return ss(page, name);
}

async function clickAndSS(page, selector, name, timeout = 3000) {
    try {
        const el = await page.waitForSelector(selector, { timeout });
        await el.click();
        await page.waitForTimeout(1500);
        await ss(page, name);
        return true;
    } catch { return false; }
}

async function safeClick(page, selector, timeout = 2000) {
    try {
        const el = await page.waitForSelector(selector, { timeout });
        await el.click();
        await page.waitForTimeout(500);
        return true;
    } catch { return false; }
}

(async () => {
    console.log('=== PAWSCORD FULL AUDIT V2 — 100+ Screen Coverage ===\n');
    const browser = await chromium.launch({ headless: true });
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'tr-TR' });
    const page = await ctx.newPage();
    logConsole(page);

    // ========== SECTION 1: Pre-Login ==========
    currentPage = 'landing';
    console.log('\n--- SECTION 1: Pre-Login ---');
    await page.goto('https://www.pawscord.com', { waitUntil: 'networkidle', timeout: 30000 });
    await ss(page, '01_splash_screen');
    await page.waitForTimeout(3000);
    await ss(page, '02_login_page');

    // ========== LOGIN ==========
    console.log('\n--- LOGIN ---');
    currentPage = 'login';
    const loginRes = await page.evaluate(async () => {
        const r = await fetch('https://api.pawscord.com/api/auth/login/', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'YANHESAP', password: 'YANHESAP' })
        });
        return r.json();
    });
    await page.evaluate((t) => {
        localStorage.setItem('access_token', t);
        localStorage.setItem('token', t);
    }, loginRes.access);
    await page.reload({ waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);

    // ========== SECTION 2: Home Page ==========
    currentPage = 'home';
    console.log('\n--- SECTION 2: Home Page ---');
    await ss(page, '03_home_page');
    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 500));
    await waitAndSS(page, '04_home_scrolled');

    // ========== SECTION 3: Sidebar Elements ==========
    currentPage = 'sidebar';
    console.log('\n--- SECTION 3: Sidebar ---');
    // DM list
    await ss(page, '05_sidebar_dm_list');

    // ========== SECTION 4: Servers ==========
    currentPage = 'servers';
    console.log('\n--- SECTION 4: Servers ---');
    // Click each server icon in left sidebar
    const serverIcons = await page.$$('div[class*="serverIcon"], div[class*="server-icon"], nav img[class*="avatar"], .server-list img');
    console.log(`  Found ${serverIcons.length} server icons`);
    for (let i = 0; i < Math.min(serverIcons.length, 5); i++) {
        try {
            await serverIcons[i].click();
            await page.waitForTimeout(2000);
            await ss(page, `06_server_${i}_overview`);

            // Click each text channel in this server
            const channels = await page.$$('div[class*="channel-item"], div[class*="channelItem"], [class*="channel-name"]');
            console.log(`  Server ${i}: ${channels.length} channels`);
            for (let j = 0; j < Math.min(channels.length, 4); j++) {
                try {
                    const chText = await channels[j].textContent();
                    await channels[j].click();
                    await page.waitForTimeout(1500);
                    await ss(page, `07_server${i}_ch${j}_${chText.substring(0, 20).trim()}`);
                } catch { }
            }

            // Click voice channels
            const voiceChannels = await page.$$('[class*="voice"] [class*="channel"], [class*="ses"] [class*="kanal"]');
            for (let j = 0; j < Math.min(voiceChannels.length, 3); j++) {
                try {
                    const vText = await voiceChannels[j].textContent();
                    await voiceChannels[j].click();
                    await page.waitForTimeout(1000);
                    await ss(page, `08_server${i}_voice${j}_${vText.substring(0, 15).trim()}`);
                } catch { }
            }
        } catch { }
    }

    // ========== SECTION 5: DM Conversations ==========
    currentPage = 'dm';
    console.log('\n--- SECTION 5: DM Conversations ---');
    // Navigate home first
    await safeClick(page, '[class*="home-btn"], [class*="homeBtn"], [aria-label*="Ana Sayfa"]');
    await page.waitForTimeout(1000);

    // Click each DM contact
    const dmItems = await page.$$('[class*="dm-item"], [class*="dmItem"], [class*="friend-item"]');
    console.log(`  Found ${dmItems.length} DM items`);
    for (let i = 0; i < Math.min(dmItems.length, 5); i++) {
        try {
            await dmItems[i].click();
            await page.waitForTimeout(1500);
            await ss(page, `09_dm_chat_${i}`);
        } catch { }
    }

    // ========== SECTION 6: Add Server Dialog ==========
    currentPage = 'add_server';
    console.log('\n--- SECTION 6: Add Server ---');
    await clickAndSS(page, '[class*="add-server"], [class*="addServer"], [aria-label*="Sunucu Ekle"], button:has-text("+")', '10_add_server_dialog');

    // Close dialog if opened
    await safeClick(page, '[class*="close"], button:has-text("İptal"), [aria-label="Close"]');
    await page.waitForTimeout(500);

    // ========== SECTION 7: Discover Servers ==========
    currentPage = 'discover';
    console.log('\n--- SECTION 7: Discover Servers ---');
    await clickAndSS(page, '[class*="discover"], [aria-label*="Keşfet"], button:has-text("Keşfet")', '11_discover_servers');
    // Scroll discover
    await page.evaluate(() => window.scrollBy(0, 400));
    await waitAndSS(page, '12_discover_scrolled');
    await safeClick(page, '[class*="close"], [aria-label="Close"]');

    // ========== SECTION 8: Premium Store ==========
    currentPage = 'premium';
    console.log('\n--- SECTION 8: Premium Store ---');
    // Click premium/store icon in sidebar
    const premiumClicked = await clickAndSS(page, '[class*="premium"], [aria-label*="Premium"], button:has-text("🛒")', '13_premium_store');
    if (premiumClicked) {
        // Click tabs
        await clickAndSS(page, 'button:has-text("Premium"), [class*="tab"]:has-text("Premium")', '14_premium_tab');
        await clickAndSS(page, 'button:has-text("Magaza"), button:has-text("Mağaza")', '15_store_tab');
        await clickAndSS(page, 'button:has-text("Server Boost")', '16_server_boost_tab');
        await safeClick(page, '[class*="close"], button[aria-label="Close"]');
    }

    // ========== SECTION 9: User Settings (ALL 11 tabs) ==========
    currentPage = 'settings';
    console.log('\n--- SECTION 9: Settings (11 tabs) ---');
    // Click gear icon near username
    const gearClicked = await clickAndSS(page, '[class*="settings-btn"], [aria-label*="Ayarlar"], [class*="user-controls"] button', '17_settings_opened');

    if (!gearClicked) {
        // Try to find settings button near YANHESAP username at bottom
        await clickAndSS(page, 'button[class*="gear"], svg[class*="gear"], [class*="userPanel"] button', '17_settings_opened_v2');
    }

    const settingsTabs = [
        'Hesabım', 'Gizlilik', 'Bağlantılar', 'Görünüm', 'Ses ve Video',
        'Bildirimler', 'Klavye Kısayolları', 'Dil', 'Aktivite Durumu', 'Oturumlar', 'Gelişmiş'
    ];
    for (const tab of settingsTabs) {
        const clicked = await clickAndSS(page, `button:has-text("${tab}"), [class*="tab"]:has-text("${tab}"), nav a:has-text("${tab}")`, `18_settings_${tab}`);
        if (clicked) {
            await page.evaluate(() => {
                const main = document.querySelector('[class*="settings-content"], [class*="settingsContent"], main');
                if (main) main.scrollTop = 500;
            });
            await waitAndSS(page, `19_settings_${tab}_scrolled`, 800);
        }
    }
    // Close settings
    await safeClick(page, 'button:has-text("ESC"), [class*="close-btn"], [aria-label="Kapat"]');
    await page.waitForTimeout(500);

    // ========== SECTION 10: Profile Panel ==========
    currentPage = 'profile';
    console.log('\n--- SECTION 10: Profile Panel ---');
    // Click on own avatar/username at bottom
    await clickAndSS(page, '[class*="user-avatar"], [class*="userAvatar"], img[alt="YANHESAP"]', '20_profile_panel');
    await safeClick(page, '[class*="close"]');

    // ========== SECTION 11: Payment Center ==========
    currentPage = 'payment';
    console.log('\n--- SECTION 11: Payment Center ---');
    await clickAndSS(page, 'button:has-text("💰"), [aria-label*="Ödeme"], [class*="payment"]', '21_payment_center');
    // Tabs in payment
    await clickAndSS(page, 'button:has-text("Transfer"), button:has-text("Aktar")', '22_payment_transfer');
    await clickAndSS(page, 'button:has-text("Geçmiş"), button:has-text("History")', '23_payment_history');
    await safeClick(page, '[class*="close"]');

    // ========== SECTION 12: Daily Rewards ==========
    currentPage = 'daily_rewards';
    console.log('\n--- SECTION 12: Daily Rewards ---');
    await clickAndSS(page, 'button:has-text("🎁"), [aria-label*="Ödül"], [class*="daily"]', '24_daily_rewards');
    await safeClick(page, '[class*="close"]');

    // ========== SECTION 13: Leaderboard ==========
    currentPage = 'leaderboard';
    console.log('\n--- SECTION 13: Leaderboard ---');
    await clickAndSS(page, 'button:has-text("📊"), [aria-label*="Sıralama"], [class*="leader"]', '25_leaderboard');
    await safeClick(page, '[class*="close"]');

    // ========== SECTION 14: Notifications ==========
    currentPage = 'notifications';
    console.log('\n--- SECTION 14: Notifications ---');
    await clickAndSS(page, 'button:has-text("📢"), [aria-label*="Bildirim"], [class*="notif"]', '26_notifications');
    await safeClick(page, '[class*="close"]');

    // ========== SECTION 15: Mini Games ==========
    currentPage = 'mini_games';
    console.log('\n--- SECTION 15: Mini Games ---');
    await clickAndSS(page, 'button:has-text("🎮"), [aria-label*="Oyun"], [class*="game"]', '27_mini_games');
    // Inside modal tabs
    await clickAndSS(page, 'button:has-text("Sıralama"), button:has-text("Ranking")', '28_games_ranking');
    await safeClick(page, '[class*="close"]');

    // ========== SECTION 16: File Manager ==========
    currentPage = 'file_manager';
    console.log('\n--- SECTION 16: File Manager ---');
    await clickAndSS(page, 'button:has-text("📂"), [aria-label*="Dosya"], [class*="file"]', '29_file_manager');
    await safeClick(page, '[class*="close"]');

    // ========== SECTION 17: Avatar Studio ==========
    currentPage = 'avatar_studio';
    console.log('\n--- SECTION 17: Avatar Studio ---');
    await clickAndSS(page, 'button:has-text("🎨"), [aria-label*="Avatar"], [class*="avatar-studio"]', '30_avatar_studio');
    // Tabs in avatar studio
    await clickAndSS(page, 'button:has-text("Presets"), button:has-text("Hazır")', '31_avatar_presets');
    await safeClick(page, '[class*="close"]');

    // ========== SECTION 18: Admin Panel ==========
    currentPage = 'admin';
    console.log('\n--- SECTION 18: Admin Panel ---');
    await clickAndSS(page, 'button:has-text("Yönetici Paneli"), [class*="admin-btn"], [class*="adminBtn"]', '32_admin_dashboard');

    // All admin tabs - based on 15 sections found in audit
    const adminTabs = [
        'Dashboard', 'Kullanıcılar', 'Sunucular', 'Mesajlar', 'Raporlar',
        'Güvenlik', 'Analitik', 'Ayarlar', 'Loglar', 'Whitelist',
        'Kripto', 'Bots', 'Premium', 'Medya', 'Duyurular'
    ];
    for (const tab of adminTabs) {
        const clicked = await clickAndSS(page, `button:has-text("${tab}"), [class*="tab"]:has-text("${tab}"), nav a:has-text("${tab}"), [class*="sidebar"] *:has-text("${tab}")`, `33_admin_${tab}`);
        if (clicked) {
            // Scroll inside admin content
            await page.evaluate(() => {
                const content = document.querySelector('[class*="admin-content"], [class*="adminContent"], [class*="panel-content"]');
                if (content) content.scrollTop = 400;
            });
            await waitAndSS(page, `34_admin_${tab}_scrolled`, 800);
        }
    }
    // Close admin
    await safeClick(page, 'button:has-text("×"), [class*="close"], [aria-label="Kapat"]');
    await page.waitForTimeout(500);

    // ========== SECTION 19: Crypto Signals Page ==========
    currentPage = 'crypto';
    console.log('\n--- SECTION 19: Crypto Signals ---');
    // Click sidebar crypto button
    const cryptoNavClicked = await clickAndSS(page, 'button:has-text("Kripto Sinyalleri"), a:has-text("Kripto"), [class*="crypto-nav"]', '35_crypto_signals');
    if (!cryptoNavClicked) {
        // Try the quick access button in sidebar
        await clickAndSS(page, '[class*="quick-access"] button:nth-child(2), a[href*="crypto"]', '35_crypto_sidebar_btn');
    }
    await page.waitForTimeout(3000);
    await ss(page, '36_crypto_page_loaded');
    // Take scroll
    await page.evaluate(() => window.scrollBy(0, 600));
    await waitAndSS(page, '37_crypto_scrolled');

    // ========== SECTION 20: Education / SRS ==========
    currentPage = 'education';
    console.log('\n--- SECTION 20: Education/SRS ---');
    // Navigate back home
    await safeClick(page, '[class*="home-btn"], [aria-label*="Ana Sayfa"]');
    await page.waitForTimeout(1000);
    // Click education button
    await clickAndSS(page, 'button:has-text("İngilizce"), a:has-text("İngilizce"), [class*="education"]', '38_education_page');
    await page.waitForTimeout(2000);
    await ss(page, '39_education_loaded');

    // ========== SECTION 21: Friends Tab ==========
    currentPage = 'friends';
    console.log('\n--- SECTION 21: Friends ---');
    await safeClick(page, '[class*="home-btn"], [aria-label*="Ana Sayfa"]');
    await page.waitForTimeout(1000);
    // Click friends card on home
    await clickAndSS(page, 'div:has-text("Arkadaşlar"):not(nav)', '40_friends_tab');
    // Friends subtabs: Online, All, Pending, Blocked, Add
    const friendsTabs = ['Çevrimiçi', 'Tümü', 'Beklemede', 'Engellenen', 'Arkadaş Ekle'];
    for (const ft of friendsTabs) {
        await clickAndSS(page, `button:has-text("${ft}")`, `41_friends_${ft}`);
    }

    // ========== SECTION 22: Context Menus ==========
    currentPage = 'context_menus';
    console.log('\n--- SECTION 22: Context Menus ---');
    // Right-click on a user in member list
    await safeClick(page, '[class*="home-btn"]');
    await page.waitForTimeout(1000);
    // Go to a server
    if (serverIcons.length > 0) {
        await serverIcons[0].click();
        await page.waitForTimeout(2000);
        // Right-click on a member
        const members = await page.$$('[class*="member-item"], [class*="memberItem"], [class*="user-item"]');
        if (members.length > 0) {
            await members[0].click({ button: 'right' });
            await waitAndSS(page, '42_user_context_menu');
            await page.keyboard.press('Escape');
        }
        // Right-click on a channel
        const chItems = await page.$$('[class*="channel-item"], [class*="channelItem"]');
        if (chItems.length > 0) {
            await chItems[0].click({ button: 'right' });
            await waitAndSS(page, '43_channel_context_menu');
            await page.keyboard.press('Escape');
        }
    }

    // ========== SECTION 23: Message Input Features ==========
    currentPage = 'message_input';
    console.log('\n--- SECTION 23: Message Input ---');
    // Click emoji picker button
    await clickAndSS(page, '[class*="emoji-btn"], [aria-label*="Emoji"], button:has-text("😀")', '44_emoji_picker');
    await page.keyboard.press('Escape');
    // Click attach/upload button
    await clickAndSS(page, '[class*="attach"], [aria-label*="Dosya"], [class*="upload-btn"]', '45_attach_menu');
    await page.keyboard.press('Escape');
    // MD toggle
    await clickAndSS(page, 'button:has-text("MD"), [class*="markdown"]', '46_markdown_toggle');

    // ========== SECTION 24: Server Settings ==========
    currentPage = 'server_settings';
    console.log('\n--- SECTION 24: Server Settings ---');
    // Click gear next to server name
    await clickAndSS(page, '[class*="server-settings"], [class*="serverSettings"], [class*="server-name"] button', '47_server_settings');
    await safeClick(page, '[class*="close"]');

    // ========== SECTION 25: Mobile Viewport ==========
    currentPage = 'mobile';
    console.log('\n--- SECTION 25: Mobile View ---');
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(1500);
    await ss(page, '48_mobile_home');
    // Navigate to a server on mobile
    if (serverIcons.length > 0) {
        try {
            await serverIcons[0].click();
            await page.waitForTimeout(1500);
            await ss(page, '49_mobile_server');
        } catch { }
    }
    // Mobile settings
    await clickAndSS(page, '[class*="settings"], [aria-label*="Ayarlar"]', '50_mobile_settings');
    await safeClick(page, '[class*="close"]');

    // ========== SECTION 26: Tablet Viewport ==========
    currentPage = 'tablet';
    console.log('\n--- SECTION 26: Tablet View ---');
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(1500);
    await ss(page, '51_tablet_home');

    // ========== SECTION 27: Wide Desktop ==========
    currentPage = 'wide_desktop';
    console.log('\n--- SECTION 27: Wide Desktop ---');
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(1500);
    await ss(page, '52_widescreen_home');

    // Reset to standard desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(500);

    // ========== SECTION 28: Store Inner Pages ==========
    currentPage = 'store';
    console.log('\n--- SECTION 28: Store Pages ---');
    // Open store modal
    await clickAndSS(page, 'button:has-text("🛒"), [aria-label*="Mağaza"], [class*="store-btn"]', '53_store_modal');
    // Store category tabs
    const storeCategories = ['Tümü', 'Kozmetik', 'Rozetler', 'Güçlendirici', 'Özel'];
    for (const cat of storeCategories) {
        await clickAndSS(page, `button:has-text("${cat}")`, `54_store_${cat}`);
    }
    await safeClick(page, '[class*="close"]');

    // ========== SECTION 29: Notifications Detail ==========
    currentPage = 'notifications_detail';
    console.log('\n--- SECTION 29: Notification Details ---');
    await clickAndSS(page, '[class*="notification"], [aria-label*="Bildirim"], button:has-text("🔔")', '55_notification_panel');
    await safeClick(page, '[class*="close"]');

    // ========== SECTION 30: Developer Support ==========
    currentPage = 'dev_support';
    console.log('\n--- SECTION 30: Developer Support ---');
    await clickAndSS(page, 'button:has-text("Destekle"), [class*="support"], button:has-text("☕")', '56_dev_support');
    await safeClick(page, '[class*="close"]');

    // ========== SECTION 31: Download Dialog ==========
    currentPage = 'download';
    console.log('\n--- SECTION 31: Download ---');
    await clickAndSS(page, 'button:has-text("İndir"), [class*="download"]', '57_download_dialog');
    await safeClick(page, '[class*="close"]');
    await page.keyboard.press('Escape');

    // ========== SECTION 32: Voice Channel Connected State ==========
    currentPage = 'voice';
    console.log('\n--- SECTION 32: Voice Channel ---');
    // Go to a server with voice channels
    if (serverIcons.length > 0) {
        await serverIcons[0].click();
        await page.waitForTimeout(2000);
        const voiceBtn = await page.$('[class*="voice-channel"], [class*="voiceChannel"]');
        if (voiceBtn) {
            await voiceBtn.click();
            await page.waitForTimeout(2000);
            await ss(page, '58_voice_channel_view');
        }
    }

    // ========== SECTION 33: Error States ==========
    currentPage = 'error_states';
    console.log('\n--- SECTION 33: Error States ---');
    await page.goto('https://www.pawscord.com/nonexistent-page', { waitUntil: 'networkidle', timeout: 15000 });
    await waitAndSS(page, '59_404_page');

    // Go back to app
    await page.goto('https://www.pawscord.com', { waitUntil: 'networkidle', timeout: 30000 });
    await page.evaluate((t) => {
        localStorage.setItem('access_token', t);
        localStorage.setItem('token', t);
    }, loginRes.access);
    await page.reload({ waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // ========== SECTION 34: Keyboard Shortcuts ==========
    currentPage = 'keyboard';
    console.log('\n--- SECTION 34: Keyboard Shortcuts ---');
    // Try Ctrl+K or / for search
    await page.keyboard.press('Control+k');
    await waitAndSS(page, '60_search_dialog');
    await page.keyboard.press('Escape');

    // ========== SECTION 35: Chat Features ==========
    currentPage = 'chat_features';
    console.log('\n--- SECTION 35: Chat Features ---');
    if (serverIcons.length > 0) {
        await serverIcons[0].click();
        await page.waitForTimeout(2000);
        // Click first text channel
        const ch = await page.$('[class*="channel-item"], [class*="channelItem"]');
        if (ch) {
            await ch.click();
            await page.waitForTimeout(1500);
            await ss(page, '61_chat_area');
            // Click on a message (if any) for message actions
            const msgs = await page.$$('[class*="message-item"], [class*="messageItem"], [class*="chat-message"]');
            if (msgs.length > 0) {
                await msgs[0].hover();
                await waitAndSS(page, '62_message_hover_actions');
                await msgs[0].click({ button: 'right' });
                await waitAndSS(page, '63_message_context_menu');
                await page.keyboard.press('Escape');
            }
            // Scroll up in chat
            await page.evaluate(() => {
                const chatArea = document.querySelector('[class*="messages-container"], [class*="messagesContainer"], [class*="chat-messages"]');
                if (chatArea) chatArea.scrollTop = 0;
            });
            await waitAndSS(page, '64_chat_scrolled_up');
        }
    }

    // ========== SECTION 36: User Popups ==========
    currentPage = 'user_popups';
    console.log('\n--- SECTION 36: User Popups ---');
    // Click on a user in member list for popup
    const memberItems = await page.$$('[class*="member"], [class*="user-item"]');
    for (let i = 0; i < Math.min(memberItems.length, 3); i++) {
        try {
            await memberItems[i].click();
            await page.waitForTimeout(1000);
            await ss(page, `65_user_popup_${i}`);
            await page.keyboard.press('Escape');
        } catch { }
    }

    // ========== FINAL: Summary Screenshot ==========
    currentPage = 'final';
    console.log('\n--- FINAL ---');
    // Go home for final screenshot
    await safeClick(page, '[class*="home-btn"], [aria-label*="Ana Sayfa"]');
    await page.waitForTimeout(1500);
    await ss(page, '99_final_home');

    // ========== REPORT ==========
    console.log(`\n\n=== AUDIT COMPLETE ===`);
    console.log(`Total screenshots: ${ssCount}`);
    console.log(`Screenshot directory: ${SCREENSHOT_DIR}`);

    console.log(`\n=== CONSOLE ERRORS BY PAGE ===`);
    let totalErrors = 0;
    for (const [pg, logs] of Object.entries(consoleLogs)) {
        const nonCSP = logs.filter(l => !l.includes('Content Security Policy'));
        totalErrors += nonCSP.length;
        if (nonCSP.length > 0) {
            console.log(`\n${pg} (${nonCSP.length} errors):`);
            nonCSP.forEach(l => console.log(`  ${l}`));
        }
    }
    console.log(`\nTotal non-CSP console errors: ${totalErrors}`);
    console.log(`Total CSP violations: ${Object.values(consoleLogs).flat().filter(l => l.includes('Content Security Policy')).length}`);

    // Save report
    const report = {
        date: new Date().toISOString(),
        totalScreenshots: ssCount,
        consoleLogs,
        screenshotDir: SCREENSHOT_DIR
    };
    fs.writeFileSync(path.join(SCREENSHOT_DIR, 'audit_report.json'), JSON.stringify(report, null, 2));
    console.log(`\nReport saved to audit_screenshots_v2/audit_report.json`);

    await browser.close();
})();
