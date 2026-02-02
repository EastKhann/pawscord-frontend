const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  const out = { items: [], console: [] };
  const browser = await puppeteer.launch({ headless: true, args:['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.on('console', m => out.console.push({type: m.type(), text: m.text()}));

  // inject token and fetch mocks before any script
  const fakePayload = { username: 'ui_test_user', exp: 9999999999 };
  const b64 = (s) => Buffer.from(JSON.stringify(s)).toString('base64').replace(/=/g, '');
  const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' + b64(fakePayload) + '.sig';

  await page.evaluateOnNewDocument((t) => { try { localStorage.setItem('access_token', t); } catch (e) {} }, fakeToken);
  await page.evaluateOnNewDocument(() => {
    const originalFetch = window.fetch;
    window.fetch = async (input, init) => {
      try {
        const url = (typeof input === 'string') ? input : input.url || '';
        if (url.includes('/avatars') || url.includes('/default')) return new Response(JSON.stringify(['/avatars/1.png']), {status:200, headers:{'Content-Type':'application/json'}});
        if (url.includes('/users') || url.includes('/all_users')) return new Response(JSON.stringify([{username:'ui_test_user', avatar:'/avatars/1.png', role:'admin'}]), {status:200, headers:{'Content-Type':'application/json'}});
        if (url.includes('/rooms') || url.includes('/room_list')) return new Response(JSON.stringify([{name:'General', categories:[{rooms:[{slug:'general', name:'General', channel_type:'text'}]}]}]), {status:200, headers:{'Content-Type':'application/json'}});
        if (url.includes('/conversations')) return new Response(JSON.stringify([]), {status:200, headers:{'Content-Type':'application/json'}});
        if (url.includes('/friends')) return new Response(JSON.stringify({friends:[]}), {status:200, headers:{'Content-Type':'application/json'}});
        return originalFetch(input, init);
      } catch (e) { return originalFetch(input, init); }
    };
  });

  const url = 'http://localhost:3000/';
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  } catch (e) { out.error = "nav_error:" + e.message; }
  await sleep(2000);

  const items = await page.evaluate(() => {
    const sel = Array.from(document.querySelectorAll('button, a[href], [role=button], [title], img'));
    const res = [];
    for (const el of sel) {
      const rect = el.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) continue;
      const text = el.textContent ? el.textContent.trim().replace(/\s+/g,' ') : '';
      res.push({ tag: el.tagName, text, title: el.getAttribute('title') || null, outerHTML: el.outerHTML.substring(0,300), x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height) });
    }
    return res;
  });

  out.items = items;
  fs.writeFileSync(path.join(__dirname,'ui_clickables_dump.json'), JSON.stringify(out, null, 2));
  console.log('done');
  await browser.close();
})();
