// frontend/src/hooks/useVersionCheck.js
// Extracted from App.js - checks for app updates via CDN
import { useState, useEffect } from 'react';

/**
 * Checks for application updates by comparing semantic versions
 * against the CDN version manifest. Runs on mount + every 30 minutes.
 * Only active on Electron, Capacitor (native), or debug mode.
 */
export default function useVersionCheck({ isElectron, isNative }) {
    const [updateAvailable, setUpdateAvailable] = useState(false);

    useEffect(() => {
        // Semantic version comparison
        const compareVersions = (latest, current) => {
            try {
                const latestParts = latest.split('.').map(Number);
                const currentParts = current.split('.').map(Number);

                if (latestParts[0] > currentParts[0]) return true;
                if (latestParts[0] < currentParts[0]) return false;
                if (latestParts[1] > currentParts[1]) return true;
                if (latestParts[1] < currentParts[1]) return false;
                if (latestParts[2] > currentParts[2]) return true;

                return false;
            } catch (error) {
                console.error('Version comparison error:', error);
                return false;
            }
        };

        const checkForUpdates = async () => {
            const isDebugMode = window.location.hostname === 'localhost' && window.location.port === '3000';

            if (!isElectron && !isNative && !isDebugMode) {
                return;
            }

            try {
                let currentVersion = import.meta.env.VITE_APP_VERSION || '1.1.203';

                if (window.electron?.getAppVersion) {
                    try {
                        currentVersion = await window.electron.getAppVersion();
                    } catch (e) {
                        console.warn('Electron version unavailable:', e);
                    }
                }

                const res = await fetch('https://media.pawscord.com/builds/version.json');

                if (!res.ok) {
                    console.warn('version.json fetch failed:', res.status);
                    return;
                }

                const data = await res.json();
                const latestVersion = data.latest_version;

                const isNewer = compareVersions(latestVersion, currentVersion);

                if (latestVersion && isNewer) {
                    setUpdateAvailable(true);

                    if (window.require) {
                        const { ipcRenderer } = window.require('electron');
                        ipcRenderer.send('update-available', {
                            currentVersion,
                            latestVersion,
                            downloadUrl: data.download_url_windows
                        });
                    }
                } else {
                    setUpdateAvailable(false);
                }
            } catch (error) {
                console.error('Version check error:', error);
            }
        };

        checkForUpdates();

        const interval = setInterval(checkForUpdates, 30 * 60 * 1000);
        return () => clearInterval(interval);
    }, [isElectron, isNative]);

    return { updateAvailable, setUpdateAvailable };
}
