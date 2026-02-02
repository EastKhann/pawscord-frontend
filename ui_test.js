const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  const outDir = path.resolve(__dirname, 'ui_test_results');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
  const screenshotsDir = path.join(outDir, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir);

  const results = { clicked: [], errors: [], console: [] };

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.on('console', msg => {
    try { results.console.push({ type: msg.type(), text: msg.text() }); } catch (e) {}
  });
  page.on('pageerror', err => results.errors.push({ type: 'pageerror', message: err.message }));
  page.on('requestfailed', req => results.errors.push({ type: 'requestfailed', url: req.url(), errorText: req.failure().errorText }));

  const url = 'http://localhost:3000/';
  console.log('Opening', url);
  try {
    // set a fake token to bypass login (jwt-decode doesn't verify signature)
    const fakePayload = { username: 'ui_test_user', exp: 9999999999 };
    const b64 = (s) => Buffer.from(JSON.stringify(s)).toString('base64').replace(/=/g, '');
    const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' + b64(fakePayload) + '.sig';

    // inject token before any document scripts run
    await page.evaluateOnNewDocument((t) => {
      try { localStorage.setItem('access_token', t); } catch (e) { /* ignore */ }
    }, fakeToken);

    // inject a simple fetch mock to return sample JSON for common endpoints
    await page.evaluateOnNewDocument(() => {
      const originalFetch = window.fetch;
      window.__UI_TEST_MOCK = true;
      window.fetch = async (input, init) => {
        try {
          const url = (typeof input === 'string') ? input : input.url || '';
          // Sample endpoint matching (adjust as needed)
          if (url.includes('/default_avatars') || url.includes('/default-avatars') || url.includes('/avatars')) {
            return new Response(JSON.stringify(['\/avatars\/1.png','\/avatars\/2.png']), { status: 200, headers: { 'Content-Type': 'application/json' } });
          }
          if (url.includes('/users') || url.includes('/all_users') || url.includes('/all-users')) {
            return new Response(JSON.stringify([{ username: 'ui_test_user', avatar: '/avatars/1.png', role: 'admin' }]), { status: 200, headers: { 'Content-Type': 'application/json' } });
          }
          if (url.includes('/room_list') || url.includes('/rooms') || url.includes('/room-list')) {
            return new Response(JSON.stringify([{ name: 'General', categories: [{ rooms: [{ slug: 'general', name: 'General', channel_type: 'text' }] }] }]), { status: 200, headers: { 'Content-Type': 'application/json' } });
          }
          if (url.includes('/conversations') || url.includes('/conv_list') || url.includes('/conv-list')) {
            return new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json' } });
          }
          if (url.includes('/friends/list')) {
            return new Response(JSON.stringify({ friends: [] }), { status: 200, headers: { 'Content-Type': 'application/json' } });
          }
          // fallback to original fetch for external resources
          return originalFetch(input, init);
        } catch (e) {
          return originalFetch(input, init);
        }
      };
    });

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // wait for app root to appear
    await page.waitForSelector('#root, [id="root"], body', { timeout: 10000 });

    // Wait until splash screen finishes (either removed or has class 'finished')
    try {
      await page.waitForFunction(() => {
        const s = document.querySelector('.splash-screen');
        return !s || s.classList.contains('finished');
      }, { timeout: 8000 });
    } catch (e) {
      // if it times out, continue anyway
    }

  } catch (e) {
    console.error('Failed to open page:', e.message);
    results.errors.push({ type: 'navigation', message: e.message });
    fs.writeFileSync(path.join(outDir, 'results.json'), JSON.stringify(results, null, 2));
    await browser.close();
    process.exit(1);
  }

  // give app some extra time to render
  await sleep(2000);

  // If splash logo present, click it to advance animation
  const splashLogo = await page.$('.splash-logo');
  if (splashLogo) {
    try { await splashLogo.click({ delay: 50 }); await sleep(600); } catch (e) { /* ignore */ }
  }

  // Helper to click element by title attribute
  const clickByTitle = async (title, id) => {
    const el = await page.$(`[title="${title}"]`);
    if (el) {
      await el.evaluate(e => e.scrollIntoView({ block: 'center' }));
      await sleep(200);
      try { await el.click({ delay: 100 }); await sleep(500); await page.screenshot({ path: path.join(screenshotsDir, `action_${id}_${title.replace(/\s+/g,'_')}.png`) }); results.clicked.push({ id: `title:${title}`, screenshot: `screenshots/action_${id}_${title.replace(/\s+/g,'_')}.png` }); } catch (e) { results.errors.push({ type: 'action_click', title, message: e.message }); }
    } else {
      results.errors.push({ type: 'not_found', title });
    }
  };

  // Helper to click element by exact visible text (span/div/button)
  const clickByText = async (text, id) => {
    // Use evaluateHandle to find element with exact trimmed text content
    const handle = await page.evaluateHandle((t) => {
      const candidates = Array.from(document.querySelectorAll('button, a, span, div'));
      for (const el of candidates) {
        if (el && el.textContent && el.textContent.trim() === t) return el;
      }
      return null;
    }, text);

    const el = handle && handle.asElement ? handle.asElement() : null;
    if (el) {
      await el.evaluate(e => e.scrollIntoView({ block: 'center' }));
      await sleep(200);
      try {
        await el.click({ delay: 100 });
        await sleep(500);
        const safeName = text.replace(/\s+/g,'_');
        await page.screenshot({ path: path.join(screenshotsDir, `action_${id}_${safeName}.png`) });
        results.clicked.push({ id: `text:${text}`, screenshot: `screenshots/action_${id}_${safeName}.png` });
      } catch (e) {
        results.errors.push({ type: 'action_click', text, message: e.message });
      }
      await handle.dispose();
    } else {
      results.errors.push({ type: 'not_found_text', text });
      if (handle) await handle.dispose();
    }
  };

  // Targeted actions: try to open common panels
  await clickByTitle('Sunucu Keşfet', 1);
  await clickByTitle('Ekle', 2);
  await clickByTitle('Grup Oluştur', 3);
  await clickByTitle('Arkadaş Ekle', 4);
  await clickByText('PawPaw AI', 5);
  await clickByText('Sinyal Bot', 6);
  await clickByText('Mağaza & Bakiye', 7);

  // find clickable elements: buttons, a[href], [role=button], elements with onclick
  const clickableHandles = await page.$$('button, a[href], [role=button]');
  // also find elements with onclick attribute
  const onclickHandles = await page.$$('[onclick]');

  const uniqueHandles = new Map();
  let idx = 0;
  for (const h of clickableHandles.concat(onclickHandles)) {
    try {
      const box = await h.boundingBox();
      if (!box) continue; // not visible
      const html = await page.evaluate(el => el.outerHTML.substring(0, 500), h);
      const key = html + '|' + Math.round(box.x) + '|' + Math.round(box.y);
      if (!uniqueHandles.has(key)) uniqueHandles.set(key, { handle: h, html, box, id: idx++ });
    } catch (e) {}
  }

  for (const [key, item] of uniqueHandles) {
    const { handle, html, id } = item;
    try {
      // requery bounding box to ensure it's still in DOM and coordinates are fresh
      const box = await handle.boundingBox();
      if (!box) { results.errors.push({ type: 'click', id, message: 'no bounding box', html }); continue; }
      const x = box.x + box.width / 2;
      const y = box.y + box.height / 2;
      await page.mouse.move(x, y);
      await sleep(100);
      await page.mouse.click(x, y, { delay: 100 });
      await sleep(700);
      const screenshotPath = path.join(screenshotsDir, `click_${id}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });
      results.clicked.push({ id, html, screenshot: `screenshots/click_${id}.png` });
    } catch (e) {
      results.errors.push({ type: 'click', id, message: e.message, html });
    }
  }

  // final screenshot
  await page.screenshot({ path: path.join(outDir, 'final.png'), fullPage: true });

  fs.writeFileSync(path.join(outDir, 'results.json'), JSON.stringify(results, null, 2));
  console.log('Done. Results saved to', outDir);
  await browser.close();
})();
