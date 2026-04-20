// ⚡ ELECTRON MAIN PROCESS - Production Ready
const { app, BrowserWindow, ipcMain, shell, dialog } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const isDev = process.env.NODE_ENV === 'development';

// 🔄 AUTO-UPDATE SYSTEM
let autoUpdater = null;
try {
    const { autoUpdater: updater } = require('electron-updater');
    autoUpdater = updater;
    autoUpdater.autoDownload = false; // Ask user before downloadg
    autoUpdater.autoInstallOnAppQuit = true;
} catch (e) {
    console.log('ℹ️ electron-updater not available (dev mode)');
}

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
    'deadbygünlight.exe': { name: 'Dead by Daylight', id: 'dbd' },
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

app.whenReady().then(() => {
    createWindow();

    // 🔄 AUTO-UPDATE: Check for updates after window loads
    if (autoUpdater && !isDev) {
        setupAutoUpdater();
        // Check for updates 5 seconds after launch
        setTimeout(() => autoUpdater.checkForUpdates(), 5000);
    }
});

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

// Focus the main window (called after deep-link auth completes)
ipcMain.on('focus-window', () => {
    if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.show();
        mainWindow.focus();
    }
});

// 🔵 GOOGLE AUTH: Open system browser for OAuth (NOT an embedded BrowserWindow)
// This avoids Google's webview/embedded browser restrictions and gives the user
// their trusted browser with saved passwords/sessions.
ipcMain.on('start-google-login', (event, authUrl) => {
    console.log('🔵 [Electron] Opening system browser for Google Auth:', authUrl.substring(0, 80));
    // shell.openExternal opens the URL in the OS default browser (Chrome, Edge, Firefox…)
    shell.openExternal(authUrl).catch((err) => {
        console.error('❌ [Electron] shell.openExternal failed:', err);
    });
    // Tokens will return via pawscord:// deep link → second-instance / open-url handler below
});

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

// ═══════════════════════════════════════════
// 🔄 AUTO-UPDATE SYSTEM
// ═══════════════════════════════════════════
function setupAutoUpdater() {
    if (!autoUpdater) return;

    autoUpdater.on('checking-for-update', () => {
        console.log('🔄 Checking for updates...');
        if (mainWindow) {
            mainWindow.webContents.send('update-status', { status: 'checking' });
        }
    });

    autoUpdater.on('update-available', (info) => {
        console.log('✅ Update available:', info.version);
        if (mainWindow) {
            mainWindow.webContents.send('update-status', {
                status: 'available',
                version: info.version,
                releaseNotes: info.releaseNotes
            });
        }
        // Ask user if they want to download
        dialog.showMessageBox(mainWindow, {
            type: 'info',
            title: 'Update Available',
            message: `Pawscord v${info.version} is available. Download now?`,
            buttons: ['Download', 'Later'],
            defaultId: 0
        }).then(({ response }) => {
            if (response === 0) {
                autoUpdater.downloadUpdate();
            }
        });
    });

    autoUpdater.on('update-not-available', () => {
        console.log('ℹ️ No updates available');
        if (mainWindow) {
            mainWindow.webContents.send('update-status', { status: 'up-to-date' });
        }
    });

    autoUpdater.on('download-progress', (progress) => {
        console.log(`⬇️ Download progress: ${Math.round(progress.percent)}%`);
        if (mainWindow) {
            mainWindow.webContents.send('update-status', {
                status: 'downloadg',
                percent: Math.round(progress.percent)
            });
        }
    });

    autoUpdater.on('update-downloaded', (info) => {
        console.log('✅ Update downloaded:', info.version);
        if (mainWindow) {
            mainWindow.webContents.send('update-status', {
                status: 'ready',
                version: info.version
            });
        }
        dialog.showMessageBox(mainWindow, {
            type: 'info',
            title: 'Update Ready',
            message: `Pawscord v${info.version} has been downloaded. Restart now to install?`,
            buttons: ['Restart', 'Later'],
            defaultId: 0
        }).then(({ response }) => {
            if (response === 0) {
                autoUpdater.quitAndInstall();
            }
        });
    });

    autoUpdater.on('error', (error) => {
        console.error('❌ Auto-update error:', error);
        if (mainWindow) {
            mainWindow.webContents.send('update-status', {
                status: 'error',
                message: error.message
            });
        }
    });
}

// IPC: Manual update check
ipcMain.handle('check-for-updates', () => {
    if (autoUpdater && !isDev) {
        autoUpdater.checkForUpdates();
        return { status: 'checking' };
    }
    return { status: 'dev-mode' };
});

