/* Pawscord boot script - extracted from index.html to comply with strict CSP (no 'unsafe-inline'). */
(function () {
  'use strict';

  // 1) Async non-blocking utility CSS - replaces <style media="print" onload="this.media='all'">
  try {
    var asyncStyle = document.getElementById('pawscord-async-utility-css');
    if (asyncStyle && asyncStyle.media === 'print') {
      // Defer to next frame to keep behavior of "print" -> "all" swap after FCP
      requestAnimationFrame(function () { asyncStyle.media = 'all'; });
    }
  } catch (_) { /* noop */ }

  // 2) Skip-link focus/blur visibility - replaces inline onfocus/onblur
  try {
    var skip = document.querySelector('a.skip-link');
    if (skip) {
      skip.addEventListener('focus', function () {
        skip.style.left = '0';
        skip.style.width = 'auto';
        skip.style.height = 'auto';
      });
      skip.addEventListener('blur', function () {
        skip.style.left = '-9999px';
        skip.style.width = '1px';
        skip.style.height = '1px';
      });
    }
  } catch (_) { /* noop */ }

  // 3) Suppress browser extension errors (MetaMask / chrome-extension://) -- noise filter
  window.addEventListener('error', function (e) {
    if (e.filename && e.filename.indexOf('chrome-extension://') !== -1) {
      e.preventDefault(); e.stopPropagation(); return false;
    }
    if (e.message && (
      e.message.indexOf('MetaMask') !== -1 ||
      e.message.indexOf('ethereum') !== -1 ||
      e.message.indexOf('chrome-extension') !== -1
    )) {
      e.preventDefault(); e.stopPropagation(); return false;
    }
  }, true);
  window.addEventListener('unhandledrejection', function (e) {
    if (e.reason && e.reason.message && (
      e.reason.message.indexOf('MetaMask') !== -1 ||
      e.reason.message.indexOf('chrome-extension') !== -1
    )) {
      e.preventDefault(); e.stopPropagation(); return false;
    }
  });
  var origConsoleError = console.error;
  console.error = function () {
    var msg = Array.prototype.join.call(arguments, ' ');
    if (msg.indexOf('chrome-extension') !== -1 ||
      msg.indexOf('MetaMask') !== -1 ||
      msg.indexOf('ethereum') !== -1) { return; }
    return origConsoleError.apply(console, arguments);
  };

  // 4) Service Worker bootstrap - clean stale workers/caches before app load
  window.__pawscordBootstrap = (async function () {
    var isElectronSW = typeof window !== 'undefined' && (
      (window.process && window.process.versions && window.process.versions.electron) ||
      (window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf('Electron') !== -1) ||
      (window.location && window.location.protocol === 'file:')
    );
    if (isElectronSW || !('serviceWorker' in navigator)) return true;

    var resetFlag = '__pawscord_sw_reset__';
    var resetAttempted = sessionStorage.getItem(resetFlag) === '1';

    try {
      var registrations = await navigator.serviceWorker.getRegistrations();
      var controller = navigator.serviceWorker.controller;
      var cacheNames = 'caches' in window ? await caches.keys() : [];
      var hasProblemCaches = cacheNames.some(function (n) {
        return n.indexOf('workbox') !== -1 ||
          n.indexOf('static-assets-v2') !== -1 ||
          n.indexOf('static-assets-v3') !== -1 ||
          n.indexOf('pawscord-v') !== -1;
      });
      if (registrations.length || controller || hasProblemCaches) {
        for (var i = 0; i < registrations.length; i++) { await registrations[i].unregister(); }
        if ('caches' in window) {
          await Promise.all(cacheNames.map(function (n) { return caches.delete(n); }));
        }
        if (!resetAttempted) {
          sessionStorage.setItem(resetFlag, '1');
          var resetUrl = new URL(window.location.href);
          resetUrl.searchParams.set('__sw_reset__', Date.now().toString());
          window.location.replace(resetUrl.toString());
          return false;
        }
      }
      sessionStorage.removeItem(resetFlag);
      if (window.location.search.indexOf('__sw_reset__=') !== -1) {
        var cleanUrl = new URL(window.location.href);
        cleanUrl.searchParams.delete('__sw_reset__');
        window.history.replaceState(null, '', cleanUrl.toString());
      }
    } catch (err) {
      console.warn('SW bootstrap cleanup error:', err);
    }
    return true;
  })();

  // 5) Safety net - if React fails to mount in 15s, render reload UI (no inline onclick)
  (function () {
    var TIMEOUT = 15000;
    var timer = setTimeout(function () {
      var root = document.getElementById('root');
      if (!root || !root.querySelector('.splash-screen')) return;

      root.innerHTML = '';
      var box = document.createElement('div');
      box.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#0b0d10;color:#dcddde;font-family:sans-serif;gap:16px;text-align:center;padding:24px';

      var emoji = document.createElement('div'); emoji.style.fontSize = '48px'; emoji.textContent = '🐾';
      var title = document.createElement('h2'); title.style.cssText = 'color:#fff;margin:0'; title.textContent = 'Pawscord failed to load';
      var desc = document.createElement('p'); desc.style.cssText = 'color:#aaa;margin:0'; desc.textContent = 'This may be caused by a network or browser cache issue.';

      var retry = document.createElement('button');
      retry.style.cssText = 'margin-top:8px;padding:10px 24px;background:#5865f2;color:#fff;border:none;border-radius:6px;font-size:15px;cursor:pointer';
      retry.textContent = '🔄 Retry';
      retry.addEventListener('click', function () { location.reload(); });

      var clear = document.createElement('button');
      clear.style.cssText = 'padding:10px 24px;background:#2f3136;color:#dcddde;border:none;border-radius:6px;font-size:15px;cursor:pointer';
      clear.textContent = '🧹 Clear cache & retry';
      clear.addEventListener('click', function () { try { localStorage.clear(); sessionStorage.clear(); } catch (_) { } location.reload(); });

      box.appendChild(emoji); box.appendChild(title); box.appendChild(desc); box.appendChild(retry); box.appendChild(clear);
      root.appendChild(box);
    }, TIMEOUT);
    window.__pawscordSafetyNet = timer;
  })();

  // App entry is loaded via <script type="module" src="/src/main.jsx"> in index.html.
  // main.jsx awaits window.__pawscordBootstrap before mounting React.
})();
