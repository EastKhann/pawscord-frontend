const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ viewport: {width:1440,height:900} });
  const p = await ctx.newPage();
  
  const reqHeaders = {};
  p.on('request', r => {
    const url = r.url();
    if (url.includes('pawscord.com/assets')) {
      const fname = url.split('/').pop().slice(0,20);
      reqHeaders[fname] = {
        mode: r.headers()['sec-fetch-mode'],
        origin: r.headers()['origin'] ? 'PRESENT' : 'ABSENT',
        dest: r.headers()['sec-fetch-dest']
      };
    }
  });
  const wrongMIME = [];
  p.on('response', r => {
    if (r.url().includes('pawscord.com/assets') && r.headers()['content-type']?.includes('text/html')) {
      wrongMIME.push(r.url().split('/').pop().slice(0, 25));
    }
  });
  
  await p.goto('https://www.pawscord.com', { waitUntil: 'networkidle', timeout: 30000 });
  await p.waitForTimeout(5000);
  
  const state = await p.evaluate(() => ({
    isLogin: !!document.querySelector('.login-container'),
    isSplash: !!document.querySelector('.splash-screen')
  }));
  
  console.log('State:', JSON.stringify(state));
  console.log('Wrong MIME (text/html for assets):', wrongMIME);
  console.log('\nAsset request details (first 6):');
  Object.entries(reqHeaders).slice(0, 6).forEach(([k,v]) => console.log(' ', k, JSON.stringify(v)));
  
  await b.close();
})();
