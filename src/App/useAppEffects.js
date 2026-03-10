// frontend/src/App/useAppEffects.js
// Consolidates all initialization side-effect useEffect hooks from App.js

import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { registerServiceWorker, setupInstallPrompt, setupNetworkMonitor } from '../utils/pwaHelper';
import { initializeCSSOptimization } from '../utils/criticalCSS';
import { preloadCriticalChunks, prefetchNextChunks } from '../utils/codeSplitting.config';
import toast from '../utils/toast';
import usePageTracking from '../hooks/usePageTracking';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { loadSavedTheme } from '../utils/ThemeManager';

export default function useAppEffects({
    // State setters
    setAnimationState, setShowVanityInvite, setShowInviteCode,
    setMaintenanceMode, setUpdateAvailable, setAllUsers,

    // State values
    animationState, isInitialDataLoaded, isAuthenticated, username,
    messages, activeChat, isInVoice, currentVoiceRoom, modals,

    // Refs
    statusWsRef,

    // Store functions
    openModal, closeModal, toggleModal, setActiveChat,

    // Auth
    isNative, isElectron,

    // Helpers
    fetchWithAuth, isNearBottom, scrollToBottom, handleMessageScroll,

    // Config
    API_BASE_URL, MEDIA_BASE_URL,

    // Imported utils
    GOOGLE_WEB_CLIENT_ID,
}) {
    // --- LOCAL STATE ---
    const [safeAreaTop, setSafeAreaTop] = useState('0px');

    // =========================================================================
    // 1. SPLASH SCREEN ANIMATION
    // =========================================================================
    useEffect(() => {
        if (animationState === 'finished') return;
        setAnimationState('start');
        // ⚡ Minimum animasyon: 1600ms (logo + loading bar), data hazırsa hemen kapat
        const minTimer = setTimeout(() => setAnimationState('pre-transition'), 1600);
        const forceFinishTimer = setTimeout(() => setAnimationState('finished'), 3200); // Max bekle
        return () => {
            clearTimeout(minTimer);
            clearTimeout(forceFinishTimer);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // 🚀 Veri yüklendiğinde splash'ı erken kapat (minimum 800ms sonra)
    useEffect(() => {
        if (isInitialDataLoaded && animationState === 'pre-transition') {
            setAnimationState('finished');
        }
    }, [isInitialDataLoaded, animationState]); // eslint-disable-line react-hooks/exhaustive-deps

    // =========================================================================
    // 2. EMAIL VERIFICATION URL PARAMS
    // =========================================================================
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const verification = params.get('verification');
        const verUsername = params.get('username');
        const reason = params.get('reason');
        const needsPassword = params.get('needs_password');

        if (verification === 'success') {
            toast.success(`✅ Email doğrulandı! Hoşgeldin ${verUsername || 'kullanıcı'}!`);
            window.history.replaceState({}, document.title, window.location.pathname);
        } else if (verification === 'failed') {
            const errorMsg = reason === 'expired'
                ? '⏰ Doğrulama linki süresi dolmuş. Yeni bir link talep edin.'
                : '❌ Geçersiz doğrulama linki.';
            toast.error(errorMsg);
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        // 🔑 Google ile giriş yapan kullanıcılar için şifre belirleme kontrolü
        if (needsPassword === 'true') {
            openModal('passwordSetupModal');
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // =========================================================================
    // 3. PAYMENT SUCCESS URL PARAMS
    // =========================================================================
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const success = params.get('success');
        const coins = params.get('coins');
        const sessionId = params.get('session_id');
        const canceled = params.get('canceled');

        if (success === 'true' && coins) {
            const verifyPayment = async () => {
                try {
                    const token = localStorage.getItem('access_token');
                    const apiBase = API_BASE_URL || 'https://api.pawscord.com/api';

                    if (sessionId) {
                        const response = await fetch(`${apiBase}/payments/verify/`, {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                session_id: sessionId,
                                coin_amount: parseInt(coins)
                            })
                        });

                        const data = await response.json();

                        if (data.success) {
                            if (data.already_processed) {
                                toast.info(`💰 Ödeme zaten işlendi! Bakiye: ${data.balance} coin`);
                            } else {
                                toast.success(`🎉 ${coins} coin hesabına eklendi! Yeni bakiye: ${data.balance} coin`);
                            }
                        } else {
                            toast.error(data.error || 'Ödeme doğrulama hatası');
                        }
                    } else {
                        toast.success(`🎉 Ödeme başarılı! ${coins} coin hesabına eklendi.`);
                    }
                } catch (error) {
                    console.error('Payment verification error:', error);
                    toast.success(`🎉 ${coins} coin satın alma tamamlandı!`);
                }
            };

            verifyPayment();
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        if (canceled === 'true') {
            toast.info('❌ Ödeme iptal edildi.');
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // =========================================================================
    // 4. VANITY URL DETECTION
    // =========================================================================
    useEffect(() => {
        const hash = window.location.hash;

        // 0️⃣ Invite code: /#/invite/ABCD1234
        const inviteMatch = hash.match(/^#\/invite\/([^/?]+)/);
        if (inviteMatch) {
            setShowInviteCode(inviteMatch[1]);
            return;
        }

        // 1️⃣ Hash-based: /#/join/pawpaw
        const vanityMatch = hash.match(/^#\/join\/([^/?]+)/);
        if (vanityMatch) {
            setShowVanityInvite(vanityMatch[1]);
            return;
        }

        // 2️⃣ Path-based: /join/pawpaw (nginx veya direkt URL)
        const pathMatch = window.location.pathname.match(/^\/join\/([^/?]+)/);
        if (pathMatch) {
            const vanityPath = pathMatch[1];
            // Hash'e taşı ki SPA düzgün çalışsın
            window.history.replaceState({}, '', `/#/join/${vanityPath}`);
            setShowVanityInvite(vanityPath);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // =========================================================================
    // 5. MODERATION GLOBAL FUNCTIONS
    // =========================================================================
    useEffect(() => {
        window.showAutoModeration = () => openModal('autoModeration');
        window.showRaidProtection = () => openModal('raidProtection');
        window.showReportSystem = () => openModal('reportSystem');
        window.showAuditLog = () => openModal('auditLog');
        window.showUserWarnings = () => openModal('userWarnings');

        return () => {
            delete window.showAutoModeration;
            delete window.showRaidProtection;
            delete window.showReportSystem;
            delete window.showAuditLog;
            delete window.showUserWarnings;
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // =========================================================================
    // 6. CLICK OUTSIDE TOOLBAR
    // =========================================================================
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modals.toolbarMenu && !e.target.closest('.toolbar-menu-container')) {
                closeModal('toolbarMenu');
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [modals.toolbarMenu]); // eslint-disable-line react-hooks/exhaustive-deps

    // =========================================================================
    // 7. CONNECTIONS PANEL EVENT
    // =========================================================================
    useEffect(() => {
        const handleOpenConnectionsPanel = () => {
            openModal('connectionsPanel');
        };
        window.addEventListener('openConnectionsPanel', handleOpenConnectionsPanel);
        return () => window.removeEventListener('openConnectionsPanel', handleOpenConnectionsPanel);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // =========================================================================
    // 8. PWA INIT
    // =========================================================================
    useEffect(() => {
        // Register Service Worker for offline support
        registerServiceWorker();

        // Setup PWA install prompt (A2HS)
        setupInstallPrompt();

        // Setup network monitoring (online/offline banner)
        setupNetworkMonitor();

        // Initialize critical CSS optimization
        initializeCSSOptimization();

        // 🚀 CODE SPLITTING: Preload critical chunks after 3 seconds
        const preloadTimer = setTimeout(() => {
            preloadCriticalChunks();
        }, 3000);

        // 🚀 CODE SPLITTING: Prefetch next chunks during idle time
        let idleCallbackId;
        if ('requestIdleCallback' in window) {
            idleCallbackId = requestIdleCallback(() => {
                prefetchNextChunks();
            });
        }

        // 🔗 Initialize Deep Link Handler (APK)
        if (isNative) {
            import('../utils/urlHandlers').then(({ initializeDeepLinkHandler }) => {
                // Deep link handler initialized
            });
        }

        return () => {
            clearTimeout(preloadTimer);
            if (idleCallbackId && 'cancelIdleCallback' in window) {
                cancelIdleCallback(idleCallbackId);
            }
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // =========================================================================
    // 9. PUSH NOTIFICATIONS
    // =========================================================================
    useEffect(() => {
        if (isAuthenticated) {
            import('../utils/pushNotifications').then(({ pushNotificationManager }) => {
                pushNotificationManager.init(API_BASE_URL, fetchWithAuth);
            });
        }
    }, [isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

    // =========================================================================
    // 10. CAPACITOR / GOOGLE AUTH INIT
    // =========================================================================
    useEffect(() => {
        if (Capacitor.isNativePlatform()) {
            GoogleAuth.initialize({
                clientId: GOOGLE_WEB_CLIENT_ID,
                scopes: ['profile', 'email'],
                grantOfflineAccess: true
            });
            setSafeAreaTop('max(35px, env(safe-area-inset-top))');
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // =========================================================================
    // 11. VERSION CHECK
    // =========================================================================
    useEffect(() => {
        // Semantic version karşılaştırma fonksiyonu
        const compareVersions = (latest, current) => {
            try {
                const latestParts = latest.split('.').map(Number);
                const currentParts = current.split('.').map(Number);

                // Major version
                if (latestParts[0] > currentParts[0]) return true;
                if (latestParts[0] < currentParts[0]) return false;

                // Minor version
                if (latestParts[1] > currentParts[1]) return true;
                if (latestParts[1] < currentParts[1]) return false;

                // Patch version
                if (latestParts[2] > currentParts[2]) return true;

                return false; // Aynı veya eski
            } catch (error) {
                console.error('❌ Version karşılaştırma hatası:', error);
                return false;
            }
        };

        const checkForUpdates = async () => {
            // 🔥 DEBUG MODE: localhost:3000'de test için (geçici)
            const isDebugMode = window.location.hostname === 'localhost' && window.location.port === '3000';

            // Sadece Electron veya Native (Capacitor) platformlarda çalışsın
            if (!isElectron && !isNative && !isDebugMode) {
                return;
            }

            try {
                // 🔥 FIX: Electron'da app.getVersion() kullan, fallback olarak VITE_APP_VERSION
                let currentVersion = import.meta.env.VITE_APP_VERSION || '1.1.203';

                // Electron'da doğru versiyonu al
                if (window.electron?.getAppVersion) {
                    try {
                        currentVersion = await window.electron.getAppVersion();
                    } catch (e) {
                        console.warn('⚠️ Electron version alınamadı:', e);
                    }
                }

                // 🔥 R2 CDN'den son versiyonu kontrol et
                const res = await fetch('https://media.pawscord.com/builds/version.json');

                if (!res.ok) {
                    console.warn('⚠️ version.json alınamadı:', res.status);
                    return;
                }

                const data = await res.json();
                const latestVersion = data.latest_version;

                // Versiyon karşılaştırması - semantic versioning
                const isNewer = compareVersions(latestVersion, currentVersion);

                if (latestVersion && isNewer) {
                    setUpdateAvailable(true);

                    // Optional: Electron'a bildirim gönder
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
                console.error('❌ Version check hatası:', error);
            }
        };

        // İlk kontrol
        checkForUpdates();

        // Her 30 dakikada bir kontrol et
        const interval = setInterval(checkForUpdates, 30 * 60 * 1000);

        return () => clearInterval(interval);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // =========================================================================
    // 12. ACTIVITY POLLING (Spotify / Steam)
    // =========================================================================
    useEffect(() => {
        // 🔥 FIX: Wait until allUsers is populated before the first poll.
        // If we poll before isInitialDataLoaded, setAllUsers(prev => prev.map(...))
        // runs on an empty array, silently discards the activity, but prevActivityRef
        // is already set — so all subsequent 30s polls see "no change" and skip.
        if (!isAuthenticated || !username || !isInitialDataLoaded) return;

        const prevActivityRef = { current: null };

        const checkActivity = async () => {
            try {
                // Fetch my own rich presence locally
                // Note: We use the endpoint that calls Spotify/Steam APIs
                const res = await fetchWithAuth(`${API_BASE_URL}/users/rich_presence/${username}/`);
                if (res.ok) {
                    const data = await res.json();

                    // Flatten data to a single activity object for simplicity (priority: Spotify > Steam)
                    let newActivity = {};

                    // 🔥 Helper: Check if timestamp is fresh (within 2 minutes)
                    const isTimestampFresh = (timestamp) => {
                        if (!timestamp) return true; // No timestamp = trust it
                        const activityTime = new Date(timestamp);
                        const now = new Date();
                        const diffMinutes = (now - activityTime) / 1000 / 60;
                        return diffMinutes < 5; // 🔥 5 dakika freshness — geçici API timeout'larında aktivite kaybolmasın
                    };

                    if (data.spotify && isTimestampFresh(data.spotify.timestamp)) {
                        newActivity.spotify = {
                            type: 'listening',
                            track: data.spotify.track,
                            name: data.spotify.track,
                            artist: data.spotify.artist,
                            details: data.spotify.artist,
                            album_art: data.spotify.album_art
                        };
                    }

                    if (data.steam && isTimestampFresh(data.steam.timestamp)) {
                        newActivity.steam = {
                            type: 'playing',
                            game: data.steam.game,
                            name: data.steam.game,
                            state: data.steam.state
                        };
                    }

                    // If no activity, keep it empty object or null
                    if (Object.keys(newActivity).length === 0) newActivity = null;

                    // Compare with previous to avoid spamming WS
                    const prevStr = JSON.stringify(prevActivityRef.current);
                    const newStr = JSON.stringify(newActivity);

                    if (prevStr !== newStr) {
                        prevActivityRef.current = newActivity;

                        // 🔥 FIX: Update own entry in allUsers immediately so the
                        // current user can see their own activity in the sidebar/list
                        const stamped = newActivity ? { ...newActivity, _received_at: Date.now() } : null;
                        setAllUsers(prev => prev.map(u =>
                            u.username === username ? { ...u, current_activity: stamped } : u
                        ));

                        // Also broadcast to others via status WebSocket
                        if (statusWsRef.current && statusWsRef.current.readyState === WebSocket.OPEN) {
                            statusWsRef.current.send(JSON.stringify({
                                type: 'update_activity',
                                activity: newActivity
                            }));
                        }
                    }
                }
            } catch (e) {
                // Silent fail
            }
        };

        const interval = setInterval(checkActivity, 15000); // 🔥 15s interval — daha hızlı Spotify/Steam güncellemesi
        checkActivity(); // Initial check

        return () => clearInterval(interval);
    }, [isAuthenticated, username, fetchWithAuth, isInitialDataLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

    // =========================================================================
    // 13. MAINTENANCE MODE POLLING
    // =========================================================================
    useEffect(() => {
        const checkMaintenanceMode = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/maintenance/status/`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.active) {
                        setMaintenanceMode({
                            message: data.message || 'System maintenance in progress',
                            endTime: data.end_time,
                            level: data.level || 'info'
                        });
                    } else {
                        setMaintenanceMode(null);
                    }
                }
            } catch (error) {
                console.error('Maintenance check error:', error);
            }
        };

        // ⚡ İlk kontrol combined init'ten geliyor, sadece 5dk'da bir poll yap
        const interval = setInterval(checkMaintenanceMode, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // =========================================================================
    // 14. SCROLL BEHAVIOR
    // =========================================================================
    useEffect(() => {
        if (isNearBottom()) {
            scrollToBottom('smooth');
        }
    }, [messages, isNearBottom, scrollToBottom]);

    useEffect(() => {
        handleMessageScroll();
    }, [activeChat, handleMessageScroll]);

    // =========================================================================
    // 15. KEYBOARD SHORTCUTS
    // =========================================================================
    useKeyboardShortcuts({
        onQuickSwitcher: () => toggleModal('quickSwitcher'),
        onCommandList: () => toggleModal('keyboardShortcuts'),
        onCommandPalette: () => toggleModal('commandPalette'),
        onSettings: () => toggleModal('userSettings'),
        onEscape: () => { if (modals.featureHub) closeModal('featureHub'); },
    });

    // =========================================================================
    // 16. VOICE ROOM — Auto-set activeChat to 'voice'
    // =========================================================================
    useEffect(() => {
        if (isInVoice && currentVoiceRoom) {
            setActiveChat('voice', currentVoiceRoom);
        }
    }, [isInVoice, currentVoiceRoom]); // eslint-disable-line react-hooks/exhaustive-deps

    // =========================================================================
    // ANALYTICS: Page view tracking
    // =========================================================================
    usePageTracking();

    // --- RETURN ---
    return { safeAreaTop };
}
