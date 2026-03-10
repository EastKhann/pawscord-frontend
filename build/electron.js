const { app, BrowserWindow, shell, ipcMain, Menu, protocol, session } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const url = require('url');

// === LOG SİSTEMİ (Console + Dosya) ===
const LOG_FILE = path.join(app.getPath('userData'), 'pawscord.log');
const originalConsoleLog = console.log;
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

function writeLog(level, ...args) {
  const timestamp = new Date().toISOString();
  const message = args.map(arg =>
    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
  ).join(' ');
  const logLine = `[${timestamp}] [${level}] ${message}\n`;

  // Dosyaya yaz
  try {
    fs.appendFileSync(LOG_FILE, logLine);
  } catch (err) {
    originalConsoleError('Log yazma hatası:', err);
  }

  // Console'a da yaz (development mode)
  if (!app.isPackaged) {
    originalConsoleLog(`[${level}]`, ...args);
  }
}

// Console'u override et
console.log = (...args) => writeLog('INFO', ...args);
console.error = (...args) => writeLog('ERROR', ...args);
console.warn = (...args) => writeLog('WARN', ...args);

console.log('🚀 Pawscord Electron başlatılıyor...');
console.log('📁 Log dosyası:', LOG_FILE);
console.log('📦 Packaged:', app.isPackaged);
console.log('💻 Platform:', process.platform);
console.log('📍 Exe Path:', process.execPath);

// ✅ SINGLE INSTANCE LOCK - Çoklu pencere açılmasını engelle
const gotTheLock = app.requestSingleInstanceLock();

// Deep link bekleyen URL (mainWindow henüz hazır değilse)
let pendingDeepLink = null;

// Deep link URL'den token parse etme fonksiyonu
function handleDeepLink(url) {
  console.log('🔗 Deep Link Alındı:', url);

  if (url && url.startsWith('pawscord://auth')) {
    try {
      // pawscord://auth?access=XXX&refresh=YYY formatını parse et
      const urlObj = new URL(url);
      const accessToken = urlObj.searchParams.get('access');
      const refreshToken = urlObj.searchParams.get('refresh');

      console.log('✅ OAuth Token Alındı!');
      console.log('  Access Token:', accessToken ? accessToken.substring(0, 30) + '...' : 'YOK');
      console.log('  Refresh Token:', refreshToken ? refreshToken.substring(0, 30) + '...' : 'YOK');

      if (accessToken && refreshToken) {
        if (mainWindow && !mainWindow.isDestroyed()) {
          // Token'ları renderer process'e gönder
          mainWindow.webContents.send('oauth-tokens', {
            access: accessToken,
            refresh: refreshToken
          });

          // Pencereyi öne getir
          if (mainWindow.isMinimized()) mainWindow.restore();
          mainWindow.focus();
          mainWindow.show();

          console.log('✅ Token\'lar renderer\'a gönderildi!');
        } else {
          // mainWindow henüz hazır değil - daha sonra gönderilecek
          console.log('⏳ mainWindow henüz hazır değil, deep link kaydedildi');
          pendingDeepLink = url;
        }
      }
    } catch (err) {
      console.error('❌ Deep link parse hatası:', err);
    }
  }
}

if (!gotTheLock) {
  // İkinci instance açıldı - deep link varsa ilk instance'a gönderilecek (second-instance event ile)
  // process.argv'dan deep link URL'ini al ve log'la
  const deepLinkArg = process.argv.find(arg => arg.startsWith('pawscord://'));
  console.log('⚠️ Başka bir Pawscord penceresi zaten açık.');
  console.log('  Deep link arg:', deepLinkArg || 'yok');
  console.log('  Bu instance kapatılıyor, deep link ilk instance\'a gönderildi...');
  app.quit();
} else {
  // Windows/Linux: İkinci instance açıldığında deep link URL burada gelir
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    console.log('🔄 İkinci instance algılandı');
    console.log('  Command Line:', JSON.stringify(commandLine));

    // Windows'ta deep link URL commandLine'da gelir
    const deepLinkUrl = commandLine.find(arg => arg.startsWith('pawscord://'));
    console.log('  Deep Link URL:', deepLinkUrl || 'bulunamadı');

    if (deepLinkUrl) {
      handleDeepLink(deepLinkUrl);
    } else if (mainWindow) {
      // Deep link yoksa sadece pencereyi öne getir
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  // macOS: open-url event'i ile deep link yakalanır
  app.on('open-url', (event, url) => {
    event.preventDefault();
    console.log('🍎 macOS open-url event:', url);
    handleDeepLink(url);
  });
}

// ✅ DEEP LINK PROTOKOL TANIMI
if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('pawscord', process.execPath, [path.resolve(process.argv[1])]);
  }
} else {
  app.setAsDefaultProtocolClient('pawscord');
}

let mainWindow;

// 🔥 ERROR PAGE - Hata durumunda gösterilecek sayfa
function showErrorPage(win, errorMessage) {
  const errorHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Pawscord - Hata</title>
      <style>
        body {
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%);
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
          text-align: center;
        }
        .error-icon { font-size: 64px; margin-bottom: 20px; }
        h1 { color: #f38ba8; margin-bottom: 10px; }
        p { color: #cdd6f4; max-width: 500px; line-height: 1.6; }
        .error-details { 
          background: rgba(0,0,0,0.3); 
          padding: 15px; 
          border-radius: 8px; 
          margin-top: 20px;
          font-family: monospace;
          font-size: 12px;
          max-width: 600px;
          word-break: break-all;
        }
        button {
          margin-top: 20px;
          padding: 12px 24px;
          background: #89b4fa;
          border: none;
          border-radius: 8px;
          color: #1e1e2e;
          font-size: 16px;
          cursor: pointer;
        }
        button:hover { background: #b4befe; }
      </style>
    </head>
    <body>
      <div class="error-icon">😿</div>
      <h1>Bir Hata Oluştu</h1>
      <p>Pawscord başlatılırken bir sorun oluştu. Lütfen uygulamayı yeniden başlatın veya yeniden kurun.</p>
      <div class="error-details">${errorMessage}</div>
      <button onclick="location.reload()">Yeniden Dene</button>
    </body>
    </html>
  `;
  win.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(errorHtml)}`);
}

// 🔥 FIX: Build path for intercepting requests
let BUILD_PATH = null;

// 🔥 FIX: Request interceptor to fix base href issues
function setupRequestInterceptor() {
  if (!BUILD_PATH) return;

  // file:// protokolü için interceptor
  protocol.interceptFileProtocol('file', (request, callback) => {
    let requestPath = decodeURIComponent(new URL(request.url).pathname);

    // Windows'ta başındaki / karakterini kaldır (örn: /C:/... -> C:/...)
    if (process.platform === 'win32' && requestPath.match(/^\/[A-Za-z]:\//)) {
      requestPath = requestPath.substring(1);
    }

    // Eğer dosya zaten var ve BUILD_PATH içindeyse, doğrudan döndür
    if (fs.existsSync(requestPath)) {
      callback({ path: requestPath });
      return;
    }

    // Eğer path /static/ ile başlıyorsa veya root'ta bir dosya ise, BUILD_PATH'e yönlendir
    const filename = path.basename(requestPath);
    const relativePath = requestPath.replace(/^.*?([\/\\]static[\/\\].*)$/, '$1').replace(/^[\/\\]/, '');

    // Olası yolları dene
    const possiblePaths = [
      path.join(BUILD_PATH, relativePath),
      path.join(BUILD_PATH, filename),
      path.join(BUILD_PATH, 'static', 'js', filename),
      path.join(BUILD_PATH, 'static', 'css', filename),
    ];

    for (const tryPath of possiblePaths) {
      if (fs.existsSync(tryPath)) {
        console.log(`📦 Intercepted: ${request.url} -> ${tryPath}`);
        callback({ path: tryPath });
        return;
      }
    }

    // Bulunamadı - orijinal path'i dene (hata verecek ama en azından log'a yazılacak)
    console.warn(`⚠️ File not found: ${request.url}`);
    callback({ path: requestPath });
  });

  console.log('✅ File protocol interceptor registered');
}

function createWindow() {
  // 🔥 PRODUCTION vs DEVELOPMENT modu belirleme
  const isDevelopment = !app.isPackaged || process.env.NODE_ENV === 'development';

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 800,  // 🔥 Minimum genişlik
    minHeight: 600,  // 🔥 Minimum yükseklik
    icon: path.join(__dirname, '../build/logo.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true,
      sandbox: true,
      preload: path.join(__dirname, 'preload.js'),
      devTools: isDevelopment,
      partition: 'persist:pawscord',  // 🔥 localStorage persist için!
    },
    autoHideMenuBar: !isDevelopment, // 🔥 Production'da menu bar gizle
    show: true,  // 🔥 FIX: Pencereyi hemen göster (yükleniyor ekranında kalmasın)
  });

  // 🔒 SECURITY: Set Content-Security-Policy header
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self'; " +
          "script-src 'self'; " +
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
          "font-src 'self' https://fonts.gstatic.com; " +
          "img-src 'self' data: blob: https:; " +
          "media-src 'self' blob: https:; " +
          "connect-src 'self' https://*.pawscord.com wss://*.pawscord.com https://accounts.google.com https://fonts.googleapis.com; " +
          "frame-src 'none';"
        ]
      }
    });
  });

  // 🔥 MENU BAR OLUŞTUR (DevTools için)
  const template = [
    {
      label: 'Dosya',
      submenu: [
        { role: 'quit', label: 'Çıkış' }
      ]
    },
    {
      label: 'Görünüm',
      submenu: [
        { role: 'reload', label: 'Yenile' },
        { role: 'forceReload', label: 'Zorla Yenile' },
        { type: 'separator' },
        { role: 'toggleDevTools', label: 'Geliştirici Araçları', accelerator: 'F12' },
        { type: 'separator' },
        { role: 'resetZoom', label: 'Zoom Sıfırla' },
        { role: 'zoomIn', label: 'Yakınlaştır' },
        { role: 'zoomOut', label: 'Uzaklaştır' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Tam Ekran' }
      ]
    },
    {
      label: 'Yardım',
      submenu: [
        {
          label: 'Logları Aç',
          click: () => {
            require('child_process').exec(`notepad "${LOG_FILE}"`);
          }
        },
        {
          label: 'Log Klasörünü Aç',
          click: () => {
            shell.showItemInFolder(LOG_FILE);
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // User Agent
  const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
  mainWindow.webContents.setUserAgent(userAgent);

  // 🔥 FIX: Development vs Production yolu
  // isDevelopment already defined above in createWindow function

  if (isDevelopment) {
    // Development mode - React dev server
    console.log('🔧 DEVELOPMENT MODE - Loading from localhost:3000');
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();  // DevTools sadece dev'de
  } else {
    // Production mode - Packaged app
    console.log('🚀 PRODUCTION MODE - Loading from build folder');
    console.log('📁 __dirname:', __dirname);
    console.log('📁 resourcesPath:', process.resourcesPath);
    console.log('📁 execPath:', process.execPath);

    // Tüm olası yolları tanımla
    const possiblePaths = [
      // 1. asarUnpack ile çıkarılmış build klasörü
      path.join(process.resourcesPath, 'app.asar.unpacked', 'build', 'index.html'),
      // 2. asar içindeki build klasörü
      path.join(__dirname, '..', 'build', 'index.html'),
      // 3. Resources klasörü altında
      path.join(process.resourcesPath, 'build', 'index.html'),
      // 4. __dirname ile doğrudan
      path.join(__dirname, 'build', 'index.html'),
      // 5. app klasörü içinde
      path.join(process.resourcesPath, 'app', 'build', 'index.html'),
      // 6. Exe yanında (portable mode)
      path.join(path.dirname(process.execPath), 'resources', 'build', 'index.html'),
    ];

    console.log('🔍 Trying paths:');
    possiblePaths.forEach((p, i) => {
      const exists = fs.existsSync(p);
      console.log(`  ${i + 1}. ${exists ? '✅' : '❌'} ${p}`);
    });

    // İlk bulunan path'i kullan
    let loadedPath = null;
    for (const testPath of possiblePaths) {
      if (fs.existsSync(testPath)) {
        loadedPath = testPath;
        console.log('✅ Found valid path:', loadedPath);
        break;
      }
    }

    if (loadedPath) {
      // 🔥 BUILD_PATH'i ayarla (interceptor için)
      BUILD_PATH = path.dirname(loadedPath);
      console.log('📂 BUILD_PATH:', BUILD_PATH);

      // 🔥 File protocol interceptor'ü kur
      setupRequestInterceptor();

      // 🔥 FIX: Timeout ile yükleme kontrolü
      const loadTimeout = setTimeout(() => {
        console.error('⏰ Page load timeout! Showing error page...');
        showErrorPage(mainWindow, 'Sayfa yükleme zaman aşımına uğradı. Log dosyasını kontrol edin: ' + LOG_FILE);
      }, 15000); // 15 saniye timeout

      // 🔥 FIX: loadFile ile yükle (interceptor path'leri düzeltecek)
      console.log('🌐 Loading file:', loadedPath);

      mainWindow.loadFile(loadedPath).then(() => {
        clearTimeout(loadTimeout);
        console.log('✅ Page loaded successfully');
      }).catch(err => {
        clearTimeout(loadTimeout);
        console.error('❌ Failed to load file:', err);
        showErrorPage(mainWindow, `Sayfa yüklenemedi: ${err.message}\n\nLog: ${LOG_FILE}`);
      });
    } else {
      console.error('❌ No valid path found!');
      showErrorPage(mainWindow, 'Build klasörü bulunamadı. Lütfen uygulamayı yeniden kurun.');
    }

    // 🔥 PRODUCTION: DevTools KAPALI (sadece F12 ile açılabilir)
    mainWindow.webContents.once('did-finish-load', () => {
      console.log('✅ Production page loaded successfully!');
      // DevTools açma - kullanıcı F12 ile açabilir

      // 🔥 Pending deep link varsa şimdi işle (sayfa yüklendi, IPC hazır)
      if (pendingDeepLink) {
        console.log('🔄 Sayfa yüklendi, pending deep link işleniyor:', pendingDeepLink);
        handleDeepLink(pendingDeepLink);
        pendingDeepLink = null;
      }
    });

    // 🔥 Renderer process hatalarını yakala
    mainWindow.webContents.on('render-process-gone', (event, details) => {
      console.error('💥 Renderer process crashed:', details);
      showErrorPage(mainWindow, `Renderer process çöktü: ${details.reason}\n\nLog: ${LOG_FILE}`);
    });

    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
      console.error('❌ Page failed to load:', errorCode, errorDescription, validatedURL);
      if (errorCode !== -3) { // -3 = aborted (normal)
        showErrorPage(mainWindow, `Sayfa yüklenemedi (${errorCode}): ${errorDescription}\n\nURL: ${validatedURL}\n\nLog: ${LOG_FILE}`);
      }
    });
  }

  // 🔥 F12 ile DevTools toggle (Her zaman çalışsın - debug için)
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F12') {
      mainWindow.webContents.toggleDevTools();
    }
  });

  // 🔥 Pencere hazır olunca göster (smooth açılış)
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    console.log('✅ Main window shown');
  });

  // 🔥 SAĞ TIK MENU (DevTools için)
  mainWindow.webContents.on('context-menu', (event, params) => {
    const contextMenu = Menu.buildFromTemplate([
      { label: 'Geri', role: 'back', enabled: mainWindow.webContents.canGoBack() },
      { label: 'İleri', role: 'forward', enabled: mainWindow.webContents.canGoForward() },
      { label: 'Yenile', role: 'reload' },
      { type: 'separator' },
      { label: 'Kes', role: 'cut' },
      { label: 'Kopyala', role: 'copy' },
      { label: 'Yapıştır', role: 'paste' },
      { type: 'separator' },
      {
        label: 'Öğeyi İncele (DevTools)',
        click: () => {
          mainWindow.webContents.inspectElement(params.x, params.y);
        }
      }
    ]);
    contextMenu.popup();
  });

  // Google Login vb. için dış linkleri tarayıcıda aç
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    console.log('🔗 setWindowOpenHandler:', url);
    if (url.startsWith('http:') || url.startsWith('https:')) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });

  // 🔥 Google OAuth ve diğer harici URL'leri Chrome'da aç (will-navigate)
  // Ana pencerede Google OAuth URL'lerini Chrome'da açıyoruz
  mainWindow.webContents.on('will-navigate', (event, url) => {
    console.log('🔗 will-navigate (MainWindow):', url);

    // 🔒 SECURITY: Strict hostname check for external navigation
    // Only open external browser for truly external URLs
    try {
      const navUrl = new URL(url);
      const trustedHosts = ['localhost', '127.0.0.1', 'pawscord.com', 'www.pawscord.com'];
      const isExternal = !trustedHosts.includes(navUrl.hostname) &&
        !navUrl.hostname.endsWith('.pawscord.com');
      if (isExternal) {
        event.preventDefault();
        console.log('✅ External URL → Chrome:', url);
        shell.openExternal(url);
      }
    } catch (e) {
      event.preventDefault(); // Block invalid URLs
    }
  });

  // 🔥🔥🔥 GÜNCELLEME YÖNETİCİSİ (YENİ EKLENEN KISIM) 🔥🔥🔥
  mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
    // Dosyayı 'Downloads' klasörüne kaydet
    const fileName = item.getFilename();
    const filePath = path.join(app.getPath('downloads'), fileName);
    item.setSavePath(filePath);

    item.on('updated', (event, state) => {
      if (state === 'interrupted') {
        console.log('İndirme kesildi');
      } else if (state === 'progressing') {
        if (item.isPaused()) {
          console.log('İndirme duraklatıldı');
        } else {
          // Yüzdeyi hesapla ve React'e gönder
          const progress = item.getReceivedBytes() / item.getTotalBytes();
          mainWindow.webContents.send('download-progress', progress);
        }
      }
    });

    item.once('done', (event, state) => {
      if (state === 'completed') {
        console.log('İndirme tamamlandı:', filePath);
        // React'e bitti bilgisini gönder
        mainWindow.webContents.send('download-complete');

        // � SECURITY: Only auto-install Pawscord updater from trusted domain
        const downloadURL = item.getURL();
        const isTrustedUpdate = downloadURL && (
          downloadURL.startsWith('https://pawscord.com/') ||
          downloadURL.startsWith('https://download.pawscord.com/') ||
          downloadURL.startsWith('https://github.com/') && downloadURL.includes('pawscord')
        );
        const isPawscordInstaller = fileName.toLowerCase().includes('pawscord') &&
          (fileName.endsWith('.exe') || fileName.endsWith('.msi'));

        if (isTrustedUpdate && isPawscordInstaller) {
          const { execFile } = require('child_process');
          console.log('🔧 Trusted Pawscord update - silent install:', filePath);
          try {
            const installer = execFile(filePath, ['/S', '--force-run'], {
              detached: true,
              windowsHide: false
            });
            installer.unref();
            console.log('✅ Installer başlatıldı, uygulama kapanıyor...');
            setTimeout(() => { app.quit(); }, 2000);
          } catch (execErr) {
            console.error('❌ Silent install başlatılamadı:', execErr);
            shell.openPath(filePath);
            setTimeout(() => app.quit(), 3000);
          }
        } else {
          console.log('📁 Download complete (not auto-install):', filePath);
          shell.showItemInFolder(filePath);
        }
      } else {
        console.log(`İndirme başarısız: ${state}`);
        mainWindow.webContents.send('download-error', state);
      }
    });
  });
}

// ✅ APP VERSION (Preload'dan çağrılıyor)
ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

// ✅ REACT'TEN GELEN 'İNDİR' EMRİNİ DİNLE
ipcMain.on('start-download', (event, url) => {
  if (mainWindow) {
    mainWindow.webContents.downloadURL(url);
  }
});

// ✅ GOOGLE LOGIN HANDLER (Electron için - Chrome'da aç)
ipcMain.on('start-google-login', (event, authUrl) => {
  console.log('🔵 [Google] Opening Google login in Chrome:', authUrl);

  // ⚡ YENİ ÇÖZÜM: Direkt Chrome'da aç!
  // Deep link (pawscord://) Windows tarafından yakalanıp uygulamaya döner
  shell.openExternal(authUrl);

  console.log('✅ [Google] Google login Chrome\'da açıldı. Deep link bekliyor...');
  console.log('💡 [Google] Giriş yaptıktan sonra pawscord:// deep link uygulamaya dönecek');
});

// � SECURITY: HTTP/2 enabled, certificate validation enforced
// Removed: app.commandLine.appendSwitch('disable-http2');
// Removed: app.commandLine.appendSwitch('ignore-certificate-errors');

app.whenReady().then(() => {
  // 🔥 Session persist ayarı (localStorage için)
  // partition: 'persist:pawscord' webPreferences'da yeterli!
  // Electron otomatik olarak %AppData%/Pawscord/Partitions/persist:pawscord/ kullanır

  console.log('💾 [Session] Storage path:', app.getPath('userData'));

  createWindow();

  // 🔥 Başlangıçta komut satırından gelen deep link kontrolü (ilk açılış)
  const deepLinkArg = process.argv.find(arg => arg.startsWith('pawscord://'));
  if (deepLinkArg) {
    console.log('🚀 Başlangıçta deep link bulundu:', deepLinkArg);
    // Biraz bekle ki mainWindow hazır olsun
    setTimeout(() => {
      handleDeepLink(deepLinkArg);
    }, 1500);
  }

  // 🔥 Pending deep link kontrolü (second-instance'dan gelen)
  if (pendingDeepLink) {
    console.log('🔄 Pending deep link işleniyor:', pendingDeepLink);
    setTimeout(() => {
      handleDeepLink(pendingDeepLink);
      pendingDeepLink = null;
    }, 1500);
  }
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });



// --- AKTİVİTE TAKİP ---
const { exec } = require('child_process');
const ACTIVITY_MAP = {
  'Spotify.exe': { type: 'listening', name: 'Spotify' },
  'cs2.exe': { type: 'playing', name: 'Counter-Strike 2' },
  'dota2.exe': { type: 'playing', name: 'Dota 2' },
  'League of Legends.exe': { type: 'playing', name: 'League of Legends' },
  'vlc.exe': { type: 'watching', name: 'VLC Media Player' },
  'Code.exe': { type: 'coding', name: 'Visual Studio Code' },
  'chrome.exe': { type: 'browsing', name: 'Google Chrome' }
};

let lastActivity = null;
setInterval(() => {
  exec('tasklist', (err, stdout, stderr) => {
    if (err) return;
    let currentActivity = null;
    const processes = stdout.toLowerCase();
    for (const [exe, info] of Object.entries(ACTIVITY_MAP)) {
      if (processes.includes(exe.toLowerCase())) {
        currentActivity = info;
        break;
      }
    }
    if (JSON.stringify(currentActivity) !== JSON.stringify(lastActivity)) {
      lastActivity = currentActivity;
      BrowserWindow.getAllWindows().forEach(win => {
        if (!win.isDestroyed()) {
          win.webContents.send('activity-update', currentActivity);
        }
      });
    }
  });
}, 5000);