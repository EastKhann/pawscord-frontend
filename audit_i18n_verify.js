// frontend/audit_i18n_verify.js
// Focused i18n verification: captures key pages with CORRECT localStorage key
// Verifies Turkish translations appear when pawscord_language = 'tr'

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE = 'https://www.pawscord.com';
const API = 'https://api.pawscord.com';
const U = 'YANHESAP';
const P = 'YANHESAP';

const DIR = path.join(__dirname, 'screenshots_i18n_verify');
fs.mkdirSync(DIR, { recursive: true });

let n = 0;
const ss = async (page, label) => {
    n++;
    const name = `${String(n).padStart(3, '0')}_${label}.png`;
    await page.screenshot({ path: path.join(DIR, name), fullPage: false });
    console.log(`  📸 ${name}`);
};

const w = (page, ms) => page.waitForTimeout(ms);

(async () => {
    console.log('🌐 i18n Verification Audit — pawscord_language=tr');
    const browser = await chromium.launch({ headless: true });
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'tr-TR' });
    const page = await ctx.newPage();

    // Collect console errors
    const errors = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });

    // === LOGIN ===
    console.log('§1 Login');
    await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await w(page, 2000);

    let token;
    try {
        const resp = await page.evaluate(async ({ api, u, p }) => {
            const r = await fetch(`${api}/api/auth/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: u, password: p }),
            });
            return { ok: r.ok, data: await r.json() };
        }, { api: API, u: U, p: P });
        token = resp.data?.access || resp.data?.token;
    } catch (e) {
        console.log('  ⚠ Login failed:', e.message.slice(0, 100));
    }

    if (token) {
        // SET CORRECT KEYS
        await page.evaluate(t => {
            localStorage.setItem('access_token', t);
            localStorage.setItem('token', t);
            localStorage.setItem('pawscord_language', 'tr');  // ← CORRECT KEY
            localStorage.setItem('i18nextLng', 'tr');          // ← also set fallback
        }, token);
    }

    await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await w(page, 6000);
    await ss(page, 'home_turkish');

    // Check specific Turkish strings on page
    const homeCheck = await page.evaluate(() => {
        const body = document.body.textContent;
        return {
            hasArkadas: body.includes('Arkadaş'),
            hasSunucu: body.includes('Sunucu'),
            hasAnaSayfa: body.includes('Ana Sayfa'),
            hasMesaj: body.includes('DOĞRUDAN MESAJLAR') || body.includes('Mesaj'),
            hasGoodAfternoon: body.includes('Good afternoon') || body.includes('Good morning') || body.includes('Good evening'),
            hasIyiAksamlar: body.includes('İyi') || body.includes('Günaydın'),
            bodySnippet: body.slice(0, 500),
        };
    });
    console.log('  Home i18n check:', JSON.stringify(homeCheck, null, 2));

    // === SETTINGS ===
    console.log('§2 Settings');
    const gearBtn = await page.$('[aria-label="Settings"], [aria-label="Ayarlar"], [aria-label="Ayarları aç"]');
    if (gearBtn) {
        await gearBtn.click();
        await w(page, 2000);
        await ss(page, 'settings_turkish');

        const settingsCheck = await page.evaluate(() => {
            const body = document.body.textContent;
            return {
                hasHesabim: body.includes('Hesabım'),
                hasGizlilik: body.includes('Gizlilik'),
                hasGorunum: body.includes('Görünüm'),
                hasBildirimler: body.includes('Bildirimler'),
                hasKlavye: body.includes('Klavye'),
                hasDil: body.includes('Dil'),
                hasKullaniciAyarlari: body.includes('KULLANICI AYARLARI'),
                hasUygulamaAyarlari: body.includes('UYGULAMA AYARLARI'),
                hasMyAccount: body.includes('My Account'),
                hasUserSettings: body.includes('USER SETTINGS'),
            };
        });
        console.log('  Settings i18n check:', JSON.stringify(settingsCheck, null, 2));

        // Click Appearance tab
        const appearBtn = await page.$('button:has-text("Görünüm"), button:has-text("Appearance")');
        if (appearBtn) {
            await appearBtn.click();
            await w(page, 1000);
            await ss(page, 'appearance_turkish');
        }

        // Click Keybinds tab
        const keybindBtn = await page.$('button:has-text("Klavye"), button:has-text("Keyboard")');
        if (keybindBtn) {
            await keybindBtn.click();
            await w(page, 1000);
            await ss(page, 'keybinds_turkish');
        }

        // Close settings
        const closeBtn = await page.$('button[aria-label="Close"], button[aria-label="Kapat"]');
        if (closeBtn) await closeBtn.click();
        await w(page, 1000);
    } else {
        console.log('  ⚠ Settings gear button not found');
    }

    // === FRIENDS ===
    console.log('§3 Friends');
    const friendsBtn = await page.$('button:has-text("Arkadaşlar"), div:has-text("Arkadaşlar")');
    if (friendsBtn) {
        await friendsBtn.click();
        await w(page, 2000);
        await ss(page, 'friends_turkish');

        const friendsCheck = await page.evaluate(() => {
            const body = document.body.textContent;
            return {
                hasArkadaslar: body.includes('Arkadaşlar'),
                hasTumu: body.includes('Tümü'),
                hasBekleyen: body.includes('Bekleyen'),
                hasArkadasEkle: body.includes('Arkadaş Ekle'),
                hasFriends: body.includes('Friends') && !body.includes('Arkadaşlar'),
                hasAll: body.includes('All (') && !body.includes('Tümü'),
            };
        });
        console.log('  Friends i18n check:', JSON.stringify(friendsCheck, null, 2));
    }

    // === KEYBOARD SHORTCUTS MODAL (Ctrl+/) ===
    console.log('§4 Keyboard Shortcuts Modal');
    await page.keyboard.press('Control+/');
    await w(page, 1500);
    await ss(page, 'shortcuts_modal_turkish');

    const shortcutsCheck = await page.evaluate(() => {
        const body = document.body.textContent;
        return {
            hasKisayollar: body.includes('Klavye Kısayolları'),
            hasGenel: body.includes('Genel'),
            hasMesajlasma: body.includes('Mesajlaşma'),
            hasNavigasyon: body.includes('Navigasyon'),
            hasSesli: body.includes('Sesli'),
            hasGeneral: body.includes('General'),
            hasMessaging: body.includes('Messaging'),
        };
    });
    console.log('  Shortcuts i18n check:', JSON.stringify(shortcutsCheck, null, 2));

    // Close modal
    await page.keyboard.press('Escape');
    await w(page, 500);

    // === WELCOME / HOME SCREEN ===
    console.log('§5 Welcome Screen');
    // Click logo/home to go to welcome screen
    const logo = await page.$('img[alt*="Pawscord"], img[alt*="Logo"]');
    if (logo) {
        await logo.click();
        await w(page, 2000);
        await ss(page, 'welcome_turkish');
    }

    // === RIGHT SIDEBAR ===
    console.log('§6 Right sidebar check');
    const sidebarCheck = await page.evaluate(() => {
        const body = document.body.textContent;
        return {
            hasHizliErisim: body.includes('HIZLI ERİŞİM'),
            hasQuickAccess: body.includes('QUICK ACCESS') && !body.includes('HIZLI'),
            hasDirectMessages: body.includes('DIRECT MESSAGES'),
            hasDogrudan: body.includes('DOĞRUDAN'),
        };
    });
    console.log('  Sidebar i18n check:', JSON.stringify(sidebarCheck, null, 2));

    // === SUMMARY ===
    console.log('\n=== i18n VERIFICATION SUMMARY ===');
    console.log(`Screenshots: ${n}`);
    console.log(`Console errors: ${errors.length}`);
    if (errors.length > 0) {
        const unique = [...new Set(errors)].slice(0, 5);
        unique.forEach(e => console.log(`  ❌ ${e}`));
    }

    await browser.close();
    console.log('✅ Done');
})();
