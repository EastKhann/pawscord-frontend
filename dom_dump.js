// dom_dump.js — Dump actual DOM structure for audit selectors
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'tr-TR' });
    const page = await ctx.newPage();

    // Login
    await page.goto('https://www.pawscord.com', { waitUntil: 'networkidle', timeout: 30000 });
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
        localStorage.setItem('i18nextLng', 'tr');
    }, loginRes.access);
    await page.reload({ waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);

    // Dump DOM structure
    const domInfo = await page.evaluate(() => {
        function getStructure(el, depth = 0, maxDepth = 4) {
            if (depth > maxDepth || !el || !el.children) return [];
            const results = [];
            for (const child of el.children) {
                const tag = child.tagName?.toLowerCase();
                const cls = child.className?.toString().substring(0, 80) || '';
                const id = child.id || '';
                const text = child.textContent?.substring(0, 50)?.trim() || '';
                const ariaLabel = child.getAttribute('aria-label') || '';
                const role = child.getAttribute('role') || '';
                const href = child.getAttribute('href') || '';
                const dataTestId = child.getAttribute('data-testid') || '';

                results.push({
                    tag, cls, id, text, ariaLabel, role, href, dataTestId,
                    depth,
                    childCount: child.children.length
                });

                if (child.children.length > 0 && depth < maxDepth) {
                    results.push(...getStructure(child, depth + 1, maxDepth));
                }
            }
            return results;
        }

        // Get all clickable elements
        const clickables = [];
        document.querySelectorAll('button, a, [role="button"], [onclick]').forEach(el => {
            const text = el.textContent?.substring(0, 60)?.trim();
            const cls = el.className?.toString().substring(0, 80);
            const ariaLabel = el.getAttribute('aria-label');
            const title = el.getAttribute('title');
            if (text || ariaLabel || title) {
                clickables.push({
                    tag: el.tagName,
                    text, cls, ariaLabel, title,
                    visible: el.offsetParent !== null
                });
            }
        });

        // Get sidebar server icons
        const leftBar = document.querySelector('[class*="serverBar"], [class*="server-bar"], nav');
        const leftBarInfo = leftBar ? {
            tag: leftBar.tagName,
            cls: leftBar.className?.toString().substring(0, 100),
            children: leftBar.children.length,
            imgs: leftBar.querySelectorAll('img').length,
            links: leftBar.querySelectorAll('a').length
        } : 'NOT FOUND';

        // Get all images in sidebar
        const sidebarImgs = [];
        document.querySelectorAll('img').forEach(img => {
            if (img.offsetParent !== null) {
                sidebarImgs.push({
                    src: img.src?.substring(0, 80),
                    alt: img.alt,
                    cls: img.className?.substring(0, 60),
                    parentCls: img.parentElement?.className?.substring(0, 60),
                    width: img.width,
                    height: img.height
                });
            }
        });

        return {
            clickables: clickables.filter(c => c.visible).slice(0, 60),
            leftBar: leftBarInfo,
            visibleImages: sidebarImgs.slice(0, 30),
            bodyClasses: document.body.className,
            rootChildren: Array.from(document.getElementById('root')?.children || []).map(c => ({
                tag: c.tagName, cls: c.className?.toString().substring(0, 100), childCount: c.children.length
            }))
        };
    });

    console.log('=== ROOT STRUCTURE ===');
    domInfo.rootChildren.forEach(c => console.log(`  <${c.tag}> class="${c.cls}" children=${c.childCount}`));

    console.log('\n=== LEFT BAR ===');
    console.log(JSON.stringify(domInfo.leftBar, null, 2));

    console.log('\n=== VISIBLE IMAGES ===');
    domInfo.visibleImages.forEach(img => console.log(`  <img src="${img.src}" alt="${img.alt}" cls="${img.cls}" ${img.width}x${img.height}>`));

    console.log('\n=== CLICKABLE ELEMENTS ===');
    domInfo.clickables.forEach(c => {
        const label = c.ariaLabel || c.title || '';
        console.log(`  <${c.tag}> "${c.text?.substring(0, 40)}" class="${c.cls?.substring(0, 50)}" aria="${label}"`);
    });

    await browser.close();
})();
