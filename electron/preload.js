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

    // 📐 Window events
    onWindowResized: (callback) => {
        ipcRenderer.on('window-resized', (event, size) => callback(size));
    },

    // 🔗 Start Google Login
    startGoogleLogin: (authUrl) => {
        ipcRenderer.send('start-google-login', authUrl);
    }
});
