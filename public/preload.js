// Electron Preload Script — Secure contextBridge for production
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    getAppVersion: () => ipcRenderer.invoke('get-app-version'),
    platform: process.platform,
    isElectron: true,

    // 🎮 Game Detection API
    detectGames: () => ipcRenderer.invoke('detect-games'),
    getRunningProcesses: () => ipcRenderer.invoke('get-running-processes'),
    onGameDetected: (callback) => {
        ipcRenderer.on('game-detected', (_event, game) => callback(game));
    },

    // 🔔 Activity updates
    onActivityUpdate: (callback) => {
        ipcRenderer.on('activity-update', (_event, activity) => callback(activity));
    },

    // 🔐 Auth callbacks
    onGoogleAuthSuccess: (callback) => {
        ipcRenderer.on('google-auth-success', (_event, tokens) => callback(tokens));
    },
    onGoogleAuthError: (callback) => {
        ipcRenderer.on('google-auth-error', (_event, error) => callback(error));
    },
    onDeepLinkAuth: (callback) => {
        ipcRenderer.on('deep-link-auth', (_event, url) => callback(url));
    },

    // 📐 Window events
    onWindowResized: (callback) => {
        ipcRenderer.on('window-resized', (_event, size) => callback(size));
    },

    // 📥 Download events
    onDownloadProgress: (callback) => {
        ipcRenderer.on('download-progress', (_event, progress) => callback(progress));
    },
    onDownloadComplete: (callback) => {
        ipcRenderer.on('download-complete', () => callback());
    },
    onDownloadError: (callback) => {
        ipcRenderer.on('download-error', (_event, state) => callback(state));
    },

    // � OAuth tokens from deep link (main process → renderer)
    onOAuthTokens: (callback) => {
        ipcRenderer.on('oauth-tokens', (_event, tokens) => callback(tokens));
    },

    // 🔗 OAuth cancelled (user closed popup)
    onGoogleAuthCancelled: (callback) => {
        ipcRenderer.on('google-auth-cancelled', () => callback());
    },

    // 🔗 Actions
    startGoogleLogin: (authUrl) => {
        ipcRenderer.send('start-google-login', authUrl);
    },
    focusWindow: () => {
        ipcRenderer.send('focus-window');
    },
    minimizeWindow: () => {
        ipcRenderer.send('minimize-window');
    },
    startDownload: (url) => {
        ipcRenderer.send('start-download', url);
    }
});
