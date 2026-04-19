// Server member hover test — tests right panel in PawPaw server
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const https = require('https');

const DIR = path.join(__dirname, 'screenshots_server_hover');
if (fs.existsSync(DIR)) fs.readdirSync(DIR).forEach(f => fs.unlinkSync(path.join(DIR, f)));
else fs.mkdirSync(DIR, { recursive: true });

let n = 0;
async function ss(page, label) {
    n++;
    const f = `${String(n).padStart(2, '0')}_${label.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
    await page.screenshot({ path: path.join(DIR, f) });
    console.log(`  [${f}]`);
}

function getToken() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({ username: 'YANHESAP', password: 'YANHESAP' });
        const req = https.request('https://api.pawscord.com/api/auth/login/', {
            method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) }
        }, res => { let body = ''; res.on('data', c => body += c); res.on('end', () => resolve(JSON.parse(body))); });
        req.on('error', reject); req.write(data); req.end();
    });
}

(async () => {
    const tokens = await getToken();
    console.log('[AUTH]', tokens.access ? 'OK' : 'FAIL');

    const browser = await chromium.launch({ headless: true });
    const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
    const page = await ctx.newPage();

    // Inject tokens
    await page.goto('https://www.pawscord.com', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.evaluate((t) => {
        localStorage.setItem('access_token', t.access);
        localStorage.setItem('refresh_token', t.refresh);
        localStorage.setItem('auth_tokens', JSON.stringify({ access: t.access, refresh: t.refresh }));
    }, tokens);
    await page.reload({ waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(5000);
    console.log('[LOGIN]', page.url());

    // Navigate to PawPaw server — click on server icon in left sidebar
    // The server icons are in the far-left column. PawPaw server should be the first one
    console.log('[NAV] Clicking PawPaw server...');
    const serverIcons = await page.$$('img[alt]');
    for (const icon of serverIcons) {
        const alt = await icon.getAttribute('alt');
        const box = await icon.boundingBox();
        if (box && box.x < 60 && alt) {
            console.log(`  Server icon: "${alt}" at (${Math.round(box.x)},${Math.round(box.y)})`);
            if (alt.toLowerCase().includes('pawpaw') || alt.toLowerCase().includes('paw')) {
                await icon.click();
                await page.waitForTimeout(2000);
                break;
            }
        }
    }

    // If that didn't work, try clicking the first server icon
    let url = page.url();
    if (!url.includes('/servers/')) {
        console.log('  Trying sidebar links...');
        const links = await page.$$('a[href*="/servers/"]');
        if (links.length > 0) {
            await links[0].click();
            await page.waitForTimeout(2000);
        }
    }

    // Click PawPaw AI channel to see text channel with member list
    console.log('[NAV] Clicking PawPaw AI channel...');
    const pawpawAI = page.locator('text=PawPaw AI').first();
    if (await pawpawAI.isVisible({ timeout: 3000 }).catch(() => false)) {
        await pawpawAI.click();
        await page.waitForTimeout(2000);
    }

    await ss(page, 'server_view');
    console.log('  URL:', page.url());

    // Check right panel structure
    const rightPanelInfo = await page.evaluate(() => {
        const W = window.innerWidth;
        const items = [];
        document.querySelectorAll('*').forEach(el => {
            const r = el.getBoundingClientRect();
            if (r.left > W - 300 && r.width > 100 && r.height >= 30 && r.height <= 60) {
                const text = el.textContent?.trim().substring(0, 50);
                const hasImg = el.querySelector('img') !== null;
                if (text && (hasImg || text.match(/online|offline|üye/i))) {
                    items.push({
                        text, hasImg, x: Math.round(r.x), y: Math.round(r.y),
                        w: Math.round(r.width), h: Math.round(r.height),
                        tag: el.tagName
                    });
                }
            }
        });
        return items;
    });
    console.log(`[RIGHT PANEL] Found ${rightPanelInfo.length} items:`);
    rightPanelInfo.forEach(it => console.log(`  ${it.text.substring(0, 30)} | hasImg=${it.hasImg} | (${it.x},${it.y}) ${it.w}x${it.h}`));

    // Now hover over each user item in right panel (items with images)
    const userItems = rightPanelInfo.filter(it => it.hasImg);
    console.log(`\n[HOVER TEST] ${userItems.length} user items to hover`);

    for (let i = 0; i < userItems.length; i++) {
        const it = userItems[i];
        console.log(`\n  [${i}] Hovering "${it.text.substring(0, 20)}" @ (${it.x + it.w / 2}, ${it.y + it.h / 2})`);

        // Move mouse away first
        await page.mouse.move(960, 540);
        await page.waitForTimeout(300);

        // Take "before" screenshot of the right panel area
        const beforeImgs = await page.evaluate(() => {
            return [...document.querySelectorAll('img')].map(img => {
                const r = img.getBoundingClientRect();
                return { w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y), src: img.src.substring(0, 60) };
            }).filter(i => i.w > 0);
        });

        // Hover
        await page.mouse.move(it.x + it.w / 2, it.y + it.h / 2);
        await page.waitForTimeout(1000);

        // Check for popup/overlay with large images
        const afterImgs = await page.evaluate(() => {
            return [...document.querySelectorAll('img')].map(img => {
                const r = img.getBoundingClientRect();
                return { w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y), src: img.src.substring(0, 60) };
            }).filter(i => i.w > 0);
        });

        // Find new/changed images
        const newBigImgs = afterImgs.filter(a => a.w > 80 || a.h > 80);
        if (newBigImgs.length > 0) {
            console.log(`  ⚠ BIG IMAGES after hover:`);
            newBigImgs.forEach(img => console.log(`    ${img.w}x${img.h} at (${img.x},${img.y}) ${img.src}`));
        }

        // Check for any new popup elements
        const popup = await page.evaluate(() => {
            const els = document.querySelectorAll('[style*="position: absolute"], [style*="position: fixed"]');
            const popups = [];
            els.forEach(el => {
                const r = el.getBoundingClientRect();
                if (r.width > 100 && r.height > 50 && r.width < 400 && r.height < 400 && r.x > 0 && r.y > 0) {
                    const imgs = el.querySelectorAll('img');
                    popups.push({
                        tag: el.tagName, w: Math.round(r.width), h: Math.round(r.height),
                        x: Math.round(r.x), y: Math.round(r.y),
                        imgs: [...imgs].map(i => ({ w: Math.round(i.getBoundingClientRect().width), h: Math.round(i.getBoundingClientRect().height) }))
                    });
                }
            });
            return popups;
        });
        if (popup.length > 0) {
            console.log(`  Popup detected:`);
            popup.forEach(p => {
                console.log(`    ${p.tag} ${p.w}x${p.h} at (${p.x},${p.y})`);
                p.imgs.forEach(img => console.log(`      img: ${img.w}x${img.h}`));
            });
        }

        await ss(page, `hover_${i}_${it.text.substring(0, 10)}`);
    }

    // Also hover on left sidebar DM users
    console.log('\n[LEFT SIDEBAR HOVER]');
    const leftUsers = await page.evaluate(() => {
        const items = [];
        document.querySelectorAll('*').forEach(el => {
            const r = el.getBoundingClientRect();
            if (r.left > 50 && r.left < 250 && r.width > 100 && r.height >= 30 && r.height <= 60) {
                const hasImg = el.querySelector('img') !== null;
                const text = el.textContent?.trim().substring(0, 30);
                if (hasImg && text) {
                    items.push({ text, x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2) });
                }
            }
        });
        const uniq = [];
        for (const item of items) {
            if (!uniq.some(u => Math.abs(u.y - item.y) < 15)) uniq.push(item);
        }
        return uniq;
    });
    console.log(`  Found ${leftUsers.length} left sidebar users`);
    for (let i = 0; i < leftUsers.length; i++) {
        const u = leftUsers[i];
        await page.mouse.move(u.x, u.y);
        await page.waitForTimeout(800);
        await ss(page, `left_hover_${i}_${u.text.substring(0, 10)}`);
    }

    // Summary: check all images on page
    console.log('\n[SUMMARY] All images > 40px:');
    const allImgs = await page.evaluate(() => {
        return [...document.querySelectorAll('img')].map(img => {
            const r = img.getBoundingClientRect();
            return {
                w: Math.round(r.width), h: Math.round(r.height),
                src: img.src.substring(0, 80),
                alt: img.alt
            };
        }).filter(i => i.w > 40 || i.h > 40);
    });
    allImgs.forEach(img => console.log(`  ${img.w}x${img.h} alt="${img.alt}" src=${img.src}`));

    await ss(page, 'final');
    await browser.close();
    console.log(`\nDone! ${n} screenshots in ${DIR}`);
})();
