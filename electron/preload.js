// Electron Preload Script
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    getAppVersion: () => ipcRenderer.invoke('get-app-version'),
    platform: process.platform,
    isElectron: true,

    // 🎮 Game Detection API
    detectGames: () => ipcRenderer.invoke('detect-games'),
    getRunningProcesses: () => ipcRenderer.invoke('get-running-processes'),
    onGameDetected: (callback) => {
        ipcRenderer.on('game-detected', (event, game) => callback(game));
    },

    // 🔐 Auth callbacks
    onGoogleAuthSuccess: (callback) => {
        ipcRenderer.on('google-auth-success', (event, tokens) => callback(tokens));
    },
    onGoogleAuthError: (callback) => {
        ipcRenderer.on('google-auth-error', (event, error) => callback(error));
    },
    onDeepLinkAuth: (callback) => {
        ipcRenderer.on('deep-link-auth', (event, url) => callback(url));
    },
    // Alias used by LoginPage to receive deep-link tokens as a {access, refresh} object
    onOAuthTokens: (callback) => {
        ipcRenderer.on('deep-link-auth', (event, url) => {
            try {
                const urlObj = new URL(url);
                const access = urlObj.searchParams.get('access');
                const refresh = urlObj.searchParams.get('refresh');
                if (access && refresh) callback({ access, refresh });
            } catch (_) {
                // malformed deep-link — ignore
            }
        });
    },

    // 📐 Window events
    onWindowResized: (callback) => {
        ipcRenderer.on('window-resized', (event, size) => callback(size));
    },

    // 🪟 Window controls
    focusWindow: () => ipcRenderer.send('focus-window'),
    minimizeWindow: () => ipcRenderer.send('minimize-window'),

    // 🔗 Start Google Login — opens system browser and minimizes Electron window
    startGoogleLogin: (authUrl) => {
        ipcRenderer.send('start-google-login', authUrl);
    }
});

