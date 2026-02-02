// ⚡ ELECTRON MAIN PROCESS - Production Ready
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const isDev = process.env.NODE_ENV === 'development';

let mainWindow;
let gameDetectionInterval = null;

// 🎮 GAME DETECTION: Known games database
const KNOWN_GAMES = {
    // Popular Games
    'valorant.exe': { name: 'VALORANT', id: 'valorant' },
    'leagueclient.exe': { name: 'League of Legends', id: 'lol' },
    'csgo.exe': { name: 'Counter-Strike: Global Offensive', id: 'csgo' },
    'cs2.exe': { name: 'Counter-Strike 2', id: 'cs2' },
    'fortnitelauncher.exe': { name: 'Fortnite', id: 'fortnite' },
    'gta5.exe': { name: 'Grand Theft Auto V', id: 'gta5' },
    'minecraft.exe': { name: 'Minecraft', id: 'minecraft' },
    'javaw.exe': { name: 'Minecraft', id: 'minecraft' }, // Java Minecraft
    'rocketleague.exe': { name: 'Rocket League', id: 'rocketleague' },
    'overwatch.exe': { name: 'Overwatch 2', id: 'overwatch' },
    'apex_legends.exe': { name: 'Apex Legends', id: 'apex' },
    'r5apex.exe': { name: 'Apex Legends', id: 'apex' },
    'pubg.exe': { name: 'PUBG: Battlegrounds', id: 'pubg' },
    'destiny2.exe': { name: 'Destiny 2', id: 'destiny2' },
    'eldenring.exe': { name: 'Elden Ring', id: 'eldenring' },
    'hogwarts.exe': { name: 'Hogwarts Legacy', id: 'hogwarts' },
    'baldursgate3.exe': { name: "Baldur's Gate 3", id: 'bg3' },
    'cyberpunk2077.exe': { name: 'Cyberpunk 2077', id: 'cyberpunk' },
    'witcher3.exe': { name: 'The Witcher 3', id: 'witcher3' },
    'dota2.exe': { name: 'Dota 2', id: 'dota2' },
    'rust.exe': { name: 'Rust', id: 'rust' },
    'ark.exe': { name: 'ARK: Survival Evolved', id: 'ark' },
    'terraria.exe': { name: 'Terraria', id: 'terraria' },
    'stardewvalley.exe': { name: 'Stardew Valley', id: 'stardew' },
    'amongus.exe': { name: 'Among Us', id: 'amongus' },
    'fallguys_client.exe': { name: 'Fall Guys', id: 'fallguys' },
    'deadbydaylight.exe': { name: 'Dead by Daylight', id: 'dbd' },
    'phasmophobia.exe': { name: 'Phasmophobia', id: 'phasmo' },
    'lethalcompany.exe': { name: 'Lethal Company', id: 'lethal' },
    'palworld.exe': { name: 'Palworld', id: 'palworld' },
    'helldivers2.exe': { name: 'Helldivers 2', id: 'helldivers2' },
    // Add more as needed
};

// 🎮 IGNORED APPS: Not games
const IGNORED_APPS = new Set([
    'explorer.exe', 'chrome.exe', 'firefox.exe', 'msedge.exe', 'opera.exe',
    'discord.exe', 'slack.exe', 'teams.exe', 'zoom.exe', 'skype.exe',
    'steam.exe', 'epicgameslauncher.exe', 'origin.exe', 'upc.exe', 'battlenet.exe',
    'obs64.exe', 'obs32.exe', 'streamlabs obs.exe', 'nvidia share.exe',
    'spotify.exe', 'itunes.exe', 'vlc.exe', 'mpv.exe',
    'code.exe', 'devenv.exe', 'notepad.exe', 'notepad++.exe',
    'pawscord.exe', 'electron.exe'
]);

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            devTools: isDev, // ⚡ PRODUCTION: DevTools disabled
            preload: path.join(__dirname, 'preload.js')
        },
        backgroundColor: '#2f3136',
        icon: path.join(__dirname, 'build', 'logo.png'),
        autoHideMenuBar: true, // Hide menu bar
        frame: true
    });

    // 🖥️ RESPONSIVE: Window resizing
    mainWindow.on('resize', () => {
        const [width, height] = mainWindow.getSize();
        mainWindow.webContents.send('window-resized', { width, height });
    });

    // Load app
    if (isDev) {
        mainWindow.loadURL('http://localhost:3000');
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
    }

    // ⚡ SECURITY: Prevent external navigation
    mainWindow.webContents.on('will-navigate', (event, url) => {
        const allowedDomains = ['localhost', 'pawscord.com'];
        const urlObj = new URL(url);
        if (!allowedDomains.some(domain => urlObj.hostname.includes(domain))) {
            event.preventDefault();
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
        // Stop game detection when window closes
        if (gameDetectionInterval) {
            clearInterval(gameDetectionInterval);
            gameDetectionInterval = null;
        }
    });

    // 🎮 Start game detection after window loads
    mainWindow.webContents.on('did-finish-load', () => {
        startGameDetection();
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// IPC Handlers
ipcMain.handle('get-app-version', () => {
    return app.getVersion();
});

// 🔵 GOOGLE AUTH: Popup window handler
ipcMain.on('start-google-login', (event, authUrl) => {
    console.log('🔵 [Electron] Opening Google Auth popup:', authUrl);

    const authWindow = new BrowserWindow({
        width: 600,
        height: 700,
        show: true,
        modal: true,
        parent: mainWindow,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    authWindow.loadURL(authUrl);

    // Listen for all navigation events
    authWindow.webContents.on('will-redirect', (event, url) => {
        console.log('🔀 [Electron] will-redirect:', url.substring(0, 100));
        handleAuthCallback(url, authWindow);
    });

    authWindow.webContents.on('did-navigate', (event, url) => {
        console.log('🔀 [Electron] did-navigate:', url.substring(0, 100));
        handleAuthCallback(url, authWindow);
    });

    authWindow.webContents.on('will-navigate', (event, url) => {
        console.log('🔀 [Electron] will-navigate:', url.substring(0, 100));
        handleAuthCallback(url, authWindow);
    });

    // Catch window close
    authWindow.on('closed', () => {
        console.log('❌ [Electron] Auth window closed by user');
    });

    // Safety timeout - close window after 60 seconds if still open
    setTimeout(() => {
        if (authWindow && !authWindow.isDestroyed()) {
            console.log('⏱️ [Electron] Auth window timeout, closing...');
            authWindow.close();
        }
    }, 60000);
});

// Auth callback handler
function handleAuthCallback(url, authWindow) {
    console.log('🔍 [Electron] Checking URL:', url);

    // Deep link captured (pawscord://auth?access=...&refresh=...)
    if (url.startsWith('pawscord://auth')) {
        console.log('✅ [Electron] Deep link detected:', url.substring(0, 50) + '...');

        try {
            const urlObj = new URL(url);
            const access = urlObj.searchParams.get('access');
            const refresh = urlObj.searchParams.get('refresh');

            if (access && refresh) {
                console.log('✅ [Electron] Tokens extracted from deep link');
                // Send tokens to main window via IPC
                mainWindow.webContents.send('google-auth-success', { access, refresh });

                // Close auth window after a short delay
                setTimeout(() => {
                    if (authWindow && !authWindow.isDestroyed()) {
                        authWindow.close();
                    }
                }, 500);
            } else {
                console.error('❌ [Electron] Tokens missing from deep link');
            }
        } catch (e) {
            console.error('❌ [Electron] Deep link parse error:', e);
        }
        return;
    }

    // Google callback URL (backend processing)
    if (url.includes('api/auth/google/callback') && url.includes('code=')) {
        console.log('🔄 [Electron] Google callback detected, waiting for backend redirect...');
        // Backend will create HTML page with deep link, we'll catch it on next navigation
        return;
    }

    // Error handling
    if (url.includes('error=')) {
        console.error('❌ [Electron] OAuth error detected in URL');
        try {
            const urlObj = new URL(url);
            const error = urlObj.searchParams.get('error');
            mainWindow.webContents.send('google-auth-error', { error });
            authWindow.close();
        } catch (e) {
            console.error('❌ [Electron] Error URL parse failed:', e);
        }
    }
}

// 🔗 DEEP LINK PROTOCOL HANDLER
// Protocol: pawscord://auth?access=...&refresh=...
if (!app.isDefaultProtocolClient('pawscord')) {
    app.setAsDefaultProtocolClient('pawscord');
}

// 🎮 GAME DETECTION SYSTEM
function detectRunningGames() {
    if (process.platform !== 'win32') return;

    exec('tasklist /FO CSV /NH', { maxBuffer: 1024 * 1024 * 5 }, (error, stdout) => {
        if (error) {
            console.error('❌ Game detection error:', error);
            return;
        }

        const lines = stdout.split('\n');
        const runningProcesses = new Set();

        for (const line of lines) {
            const match = line.match(/"([^"]+\.exe)"/i);
            if (match) {
                runningProcesses.add(match[1].toLowerCase());
            }
        }

        // Find first known game
        let detectedGame = null;
        for (const [exe, gameInfo] of Object.entries(KNOWN_GAMES)) {
            if (runningProcesses.has(exe.toLowerCase())) {
                detectedGame = gameInfo;
                break;
            }
        }

        // Send to renderer
        if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.send('game-detected', detectedGame);
        }
    });
}

// Start game detection when window is ready
function startGameDetection() {
    if (gameDetectionInterval) {
        clearInterval(gameDetectionInterval);
    }

    // Check every 30 seconds
    detectRunningGames();
    gameDetectionInterval = setInterval(detectRunningGames, 30000);
    console.log('🎮 Game detection started');
}

// IPC: Manual game detection trigger
ipcMain.handle('detect-games', () => {
    detectRunningGames();
    return { status: 'ok' };
});

// IPC: Get running processes (for custom game detection)
ipcMain.handle('get-running-processes', () => {
    return new Promise((resolve) => {
        if (process.platform !== 'win32') {
            resolve([]);
            return;
        }

        exec('tasklist /FO CSV /NH', { maxBuffer: 1024 * 1024 * 5 }, (error, stdout) => {
            if (error) {
                resolve([]);
                return;
            }

            const processes = [];
            const lines = stdout.split('\n');

            for (const line of lines) {
                const match = line.match(/"([^"]+\.exe)"/i);
                if (match) {
                    const exe = match[1].toLowerCase();
                    if (!IGNORED_APPS.has(exe)) {
                        processes.push(exe);
                    }
                }
            }

            resolve([...new Set(processes)]);
        });
    });
});

// macOS/Linux için
app.on('open-url', (event, url) => {
    event.preventDefault();
    console.log('🔗 [DeepLink] URL received:', url);

    if (mainWindow) {
        mainWindow.webContents.send('deep-link-auth', url);
    }
});

// Windows için
if (process.platform === 'win32') {
    // İkinci instance açılırsa deep link'i yakala
    const gotTheLock = app.requestSingleInstanceLock();

    if (!gotTheLock) {
        app.quit();
    } else {
        app.on('second-instance', (event, commandLine, workingDirectory) => {
            // Windows'ta deep link commandLine'ın sonunda olur
            const url = commandLine.find(arg => arg.startsWith('pawscord://'));

            if (url) {
                console.log('🔗 [DeepLink] Windows URL:', url);
                if (mainWindow) {
                    if (mainWindow.isMinimized()) mainWindow.restore();
                    mainWindow.focus();
                    mainWindow.webContents.send('deep-link-auth', url);
                }
            }
        });
    }
}

