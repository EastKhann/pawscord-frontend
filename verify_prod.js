const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });

    // Login
    await page.goto('https://www.pawscord.com/login');
    await page.waitForTimeout(2000);
    await page.fill('input[name=username], input[type=text]', 'YANHESAP');
    await page.fill('input[name=password], input[type=password]', 'YANHESAP');
    await page.click('button[type=submit]');
    await page.waitForTimeout(4000);

    // 1. Home
    await page.screenshot({ path: '../audit_screenshots/v2_home.png' });
    const homeText = await page.textContent('body');
    console.log('1. Home -', homeText.includes('home.greeting') ? 'FAIL raw keys' : 'OK translated');

    // 2. Settings
    await page.goto('https://www.pawscord.com/settings');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: '../audit_screenshots/v2_settings.png' });
    console.log('2. Settings captured');

    // 3. Admin
    await page.goto('https://www.pawscord.com/admin');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: '../audit_screenshots/v2_admin.png' });
    console.log('3. Admin captured');

    // 4. Crypto
    await page.goto('https://www.pawscord.com/crypto');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: '../audit_screenshots/v2_crypto.png' });
    console.log('4. Crypto captured');

    // 5. Forum
    await page.goto('https://www.pawscord.com/forum');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: '../audit_screenshots/v2_forum.png' });
    console.log('5. Forum captured');

    // 6. DM
    await page.goto('https://www.pawscord.com/dm');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: '../audit_screenshots/v2_dm.png' });
    console.log('6. DM captured');

    // 7. Education
    await page.goto('https://www.pawscord.com/education');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: '../audit_screenshots/v2_education.png' });
    console.log('7. Education captured');

    // 8. Voice channels
    await page.goto('https://www.pawscord.com/voice');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: '../audit_screenshots/v2_voice.png' });
    console.log('8. Voice captured');

    // 9. Games
    await page.goto('https://www.pawscord.com/games');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: '../audit_screenshots/v2_games.png' });
    console.log('9. Games captured');

    // 10. Music
    await page.goto('https://www.pawscord.com/music');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: '../audit_screenshots/v2_music.png' });
    console.log('10. Music captured');

    // 11. Health
    await page.goto('https://www.pawscord.com/health');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: '../audit_screenshots/v2_health.png' });
    console.log('11. Health captured');

    // 12. Productivity
    await page.goto('https://www.pawscord.com/productivity');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: '../audit_screenshots/v2_productivity.png' });
    console.log('12. Productivity captured');

    console.log('\nConsole errors total:', errors.length);
    errors.slice(0, 15).forEach(e => console.log('  ERR:', e.substring(0, 150)));

    await browser.close();
    console.log('\nDONE');
})();
