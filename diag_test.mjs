import { chromium } from '@playwright/test';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const logs = [];
page.on('console', msg => { logs.push(msg.type() + ': ' + msg.text()); });
page.on('pageerror', err => { logs.push('ERROR: ' + err.message); });

const initScript = `
  window.__initScriptRan = true;
  var _st = window.setTimeout;
  window.setTimeout = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[1] === 'number' && args[1] >= 14000) {
      console.log('[INIT] Blocked setTimeout delay=' + args[1]);
      return 0;
    }
    return _st.apply(window, args);
  };
`;

await page.addInitScript({ content: initScript });
await page.goto('http://localhost:5173');
await page.waitForTimeout(6000);

const safetyNetDisabled = await page.evaluate(() => window.__initScriptRan);
const splashPresent = await page.evaluate(() => !!document.querySelector('.splash-screen'));
const darkTheme = await page.evaluate(() => !!document.querySelector('.dark-theme'));
const failedToLoad = await page.evaluate(() => document.body.innerText.includes('Pawscord failed to load'));
const rootContent = await page.evaluate(() => (document.getElementById('root') || {}).textContent?.substring(0, 150));
const localStorage_token = await page.evaluate(() => window.localStorage.getItem('access_token'));

console.log('=== DIAGNOSTICS ===');
console.log('initScriptRan:', safetyNetDisabled);
console.log('splashPresent:', splashPresent);
console.log('darkTheme:', darkTheme);
console.log('failedToLoad:', failedToLoad);
console.log('localStorage token:', localStorage_token ? 'PRESENT (' + localStorage_token.length + ' chars)' : 'NONE');
console.log('rootContent[:150]:', rootContent);
console.log('=== PAGE LOGS (first 30) ===');
logs.slice(0, 30).forEach(l => console.log(l));

await page.screenshot({ path: 'diag_screenshot.png', fullPage: false });
console.log('Screenshot saved to diag_screenshot.png');

await browser.close();
