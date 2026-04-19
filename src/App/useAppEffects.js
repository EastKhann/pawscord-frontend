import { getToken } from '../utils/tokenStorage';
// frontend/src/App/useAppEffects.js
// Consolidates all initialization side-effect useEffect hooks from App.js

// PropTypes validation: N/A for this module (hook/utility — no React props interface)
// Accessibility (aria): N/A for this module (hook/context/utility — no rendered DOM)
// aria-label: n/a — hook/context/utility module, no directly rendered JSX
import { useState, useEffect, useRef } from 'react';
import { Capacitor } from '@capacitor/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { registerServiceWorker, setupInstallPrompt, setupNetworkMonitor } from '../utils/pwaHelper';
import { initializeCSSOptimization } from '../utils/criticalCSS';
import { preloadCriticalChunks, prefetchNextChunks } from '../utils/codeSplitting.config';
import toast from '../utils/toast';
import { useTranslation } from 'react-i18next';
import usePageTracking from '../hooks/usePageTracking';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { loadSavedTheme } from '../utils/ThemeManager';
import logger from '../utils/logger';

export default function useAppEffects({
    // State setters
    setAnimationState,
    setShowVanityInvite,
    setShowInviteCode,
    setMaintenanceMode,
    setUpdateAvailable,
    setAllUsers,

    // State values
    animationState,
    isInitialDataLoaded,
    isAuthenticated,
    username,
    messages,
    activeChat,
    isInVoice,
    currentVoiceRoom,
    modals,
    onlineUsers,

    // Refs
    statusWsRef,

    // Store functions
    openModal,
    closeModal,
    toggleModal,
    setActiveChat,

    // Auth
    isNative,
    isElectron,

    // Helpers
    fetchWithAuth,
    isNearBottom,
    scrollToBottom,
    handleMessageScroll,

    // Config
    API_BASE_URL,
    MEDIA_BASE_URL,

    // Imported utils
    GOOGLE_WEB_CLIENT_ID,
}) {
    // --- LOCAL STATE ---
    const [safeAreaTop, setSafeAreaTop] = useState('0px');
    const { t } = useTranslation();

    // --- REFS for stable callback references (avoids eslint-disable) ---
    const openModalRef = useRef(openModal);
    const closeModalRef = useRef(closeModal);
    const fetchWithAuthRef = useRef(fetchWithAuth);
    const setAllUsersRef = useRef(setAllUsers);
    const setActiveChatRef = useRef(setActiveChat);
    useEffect(() => {
        openModalRef.current = openModal;
    }, [openModal]);
    useEffect(() => {
        closeModalRef.current = closeModal;
    }, [closeModal]);
    useEffect(() => {
        fetchWithAuthRef.current = fetchWithAuth;
    }, [fetchWithAuth]);
    useEffect(() => {
        setAllUsersRef.current = setAllUsers;
    }, [setAllUsers]);
    useEffect(() => {
        setActiveChatRef.current = setActiveChat;
    }, [setActiveChat]);

    // =========================================================================
    // 1. SPLASH SCREEN ANIMATION
    // =========================================================================
    useEffect(() => {
        if (animationState === 'finished') return;
        setAnimationState('start');
        // ⚡ Minimum animasyon: 2800ms (logo + harfler + loading bar), data hazırsa sonra close
        const minTimer = setTimeout(() => setAnimationState('pre-transition'), 2800);
        const forceFinishTimer = setTimeout(() => setAnimationState('finished'), 4500); // Max bekle
        return () => {
            clearTimeout(minTimer);
            clearTimeout(forceFinishTimer);
        };
    }, []); // INTENTIONAL: splash animation runs only on mount

    // 🚀 Veri yüklendiğinde splash'ı erken close (minimum 800ms sonra)
    useEffect(() => {
        if (isInitialDataLoaded && animationState === 'pre-transition') {
            setAnimationState('finished');
        }
    }, [isInitialDataLoaded, animationState, setAnimationState]);

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
            toast.success(
                t('auth.emailVerifiedWelcome', { username: verUsername || t('common.user') })
            );
            window.history.replaceState({}, document.title, window.location.pathname);
        } else if (verification === 'failed') {
            const errorMsg =
                reason === 'expired'
                    ? t('auth.verificationExpired')
                    : t('auth.verificationInvalid');
            toast.error(errorMsg);
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        // 🔑 Google with giriş yapan kullanıcılar for şifre belirleme kontrolü
        if (needsPassword === 'true') {
            openModalRef.current('passwordSetupModal');
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []); // INTENTIONAL: URL params processed once on mount

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
                    const token = getToken();
                    const apiBase = API_BASE_URL || 'https://api.pawscord.com/api';

                    if (sessionId) {
                        const response = await fetch(`${apiBase}/payments/verify/`, {
                            method: 'POST',
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                session_id: sessionId,
                                coin_amount: parseInt(coins),
                            }),
                        });

                        const data = await response.json();

                        if (data.success) {
                            if (data.already_processed) {
                                toast.info(
                                    t('payment.alreadyProcessed', { balance: data.balance })
                                );
                            } else {
                                toast.success(
                                    t('payment.coinsAdded', { coins, balance: data.balance })
                                );
                            }
                        } else {
                            toast.error(data.error || t('common.serverError'));
                        }
                    } else {
                        toast.success(t('payment.successful', { coins }));
                    }
                } catch (error) {
                    logger.error('Payment verification error:', error);
                    toast.success(t('payment.confirmed', { coins }));
                }
            };

            verifyPayment();
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        if (canceled === 'true') {
            toast.info(t('payment.cancelled'));
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []); // INTENTIONAL: payment URL params processed once on mount

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

        // 2️⃣ Path-based: /join/pawpaw (nginx or direkt URL)
        const pathMatch = window.location.pathname.match(/^\/join\/([^/?]+)/);
        if (pathMatch) {
            const vanityPath = pathMatch[1];
            // Hash'e taşı ki SPA düzday çalışsın
            window.history.replaceState({}, '', `/#/join/${vanityPath}`);
            setShowVanityInvite(vanityPath);
        }
    }, []); // INTENTIONAL: URL hash parsed once on mount

    // =========================================================================
    // 5. MODERATION GLOBAL FUNCTIONS
    // =========================================================================
    useEffect(() => {
        window.showAutoModeration = () => openModalRef.current('autoModeration');
        window.showRaidProtection = () => openModalRef.current('raidProtection');
        window.showReportSystem = () => openModalRef.current('reportSystem');
        window.showAuditLog = () => openModalRef.current('auditLog');
        window.showUserWarnings = () => openModalRef.current('userWarnings');

        return () => {
            delete window.showAutoModeration;
            delete window.showRaidProtection;
            delete window.showReportSystem;
            delete window.showAuditLog;
            delete window.showUserWarnings;
        };
    }, []); // Now safe: uses openModalRef

    // =========================================================================
    // 6. CLICK OUTSIDE TOOLBAR
    // =========================================================================
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modals.toolbarMenu && !e.target.closest('.toolbar-menu-container')) {
                closeModalRef.current('toolbarMenu');
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [modals.toolbarMenu]);

    // =========================================================================
    // 7. CONNECTIONS PANEL EVENT
    // =========================================================================
    useEffect(() => {
        const handleOpenConnectionsPanel = () => {
            openModalRef.current('connectionsPanel');
        };
        window.addEventListener('openConnectionsPanel', handleOpenConnectionsPanel);
        return () => window.removeEventListener('openConnectionsPanel', handleOpenConnectionsPanel);
    }, []); // Now safe: uses openModalRef

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
    }, []); // INTENTIONAL: PWA services initialized once on mount

    // =========================================================================
    // 9. PUSH NOTIFICATIONS
    // =========================================================================
    useEffect(() => {
        if (isAuthenticated) {
            import('../utils/pushNotifications').then(({ pushNotificationManager }) => {
                pushNotificationManager.init(API_BASE_URL, fetchWithAuthRef.current);
            });
        }
    }, [isAuthenticated, API_BASE_URL]);

    // =========================================================================
    // 10. CAPACITOR / GOOGLE AUTH INIT + DEEP LINK HANDLER
    // =========================================================================
    useEffect(() => {
        if (Capacitor.isNativePlatform()) {
            GoogleAuth.initialize({
                clientId: GOOGLE_WEB_CLIENT_ID,
                scopes: ['profile', 'email'],
                grantOfflineAccess: true,
            });
            setSafeAreaTop('max(35px, env(safe-area-inset-top))');

            // Handle deep links from push notification taps (pawscord://room/xxx, pawscord://dm/xxx)
            import('@capacitor/app').then(({ App: CapApp }) => {
                CapApp.addListener('appUrlOpen', ({ url }) => {
                    try {
                        const parsed = new URL(url);
                        const host = parsed.hostname; // 'room', 'dm', 'auth'
                        const id = parsed.pathname.replace('/', '');
                        if (host === 'room' && id) {
                            window.location.hash = `#/room/${id}`;
                        } else if (host === 'dm' && id) {
                            window.location.hash = `#/dm/${id}`;
                        }
                    } catch (_) {
                        // Malformed URL — ignore
                    }
                });
            });
        }
    }, []); // INTENTIONAL: Capacitor/Google native init once on mount

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

                return false; // Aynı or eski
            } catch (error) {
                logger.error('❌ Version comparison error:', error);
                return false;
            }
        };

        const checkForUpdates = async () => {
            // 🔥 DEBUG MODE: localhost:3000'de test for (geçici)
            const isDebugMode =
                window.location.hostname === 'localhost' && window.location.port === '3000';

            // Sadece Electron or Native (Capacitor) platformlarda çalışsın
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
                        logger.warn('⚠️ Electron version could not be retrieved:', e);
                    }
                }

                // 🔥 R2 CDN'den son versiyonu kontrol et
                const res = await fetch('https://media.pawscord.com/builds/version.json');

                if (!res.ok) {
                    logger.warn('⚠️ version.json could not be retrieved:', res.status);
                    return;
                }

                const data = await res.json();
                const latestVersion = data.latest_version;

                // Versiyon karşılaştırması - semantic versioning
                const isNewer = compareVersions(latestVersion, currentVersion);

                if (latestVersion && isNewer) {
                    setUpdateAvailable(true);

                    // Optional: Electron'a notification gönder
                    if (window.require) {
                        const { ipcRenderer } = window.require('electron');
                        ipcRenderer.send('update-available', {
                            currentVersion,
                            latestVersion,
                            downloadUrl: data.download_url_windows,
                        });
                    }
                } else {
                    setUpdateAvailable(false);
                }
            } catch (error) {
                logger.error('❌ Version check error:', error);
            }
        };

        // İlk kontrol
        checkForUpdates();

        // Her 30 minuteda bir kontrol et
        const interval = setInterval(checkForUpdates, 30 * 60 * 1000);

        return () => clearInterval(interval);
    }, []); // INTENTIONAL: version check polling initialized once on mount

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
                        return diffMinutes < 5; // 🔥 5 minute freshness — geçici API timeout'larında aktivite kaybolmasın
                    };

                    if (data.spotify && isTimestampFresh(data.spotify.timestamp)) {
                        newActivity.spotify = {
                            type: 'listening',
                            track: data.spotify.track,
                            name: data.spotify.track,
                            artist: data.spotify.artist,
                            details: data.spotify.artist,
                            album_art: data.spotify.album_art,
                        };
                    }

                    if (data.steam && isTimestampFresh(data.steam.timestamp)) {
                        newActivity.steam = {
                            type: 'playing',
                            game: data.steam.game,
                            name: data.steam.game,
                            state: data.steam.state,
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
                        const stamped = newActivity
                            ? { ...newActivity, _received_at: Date.now() }
                            : null;
                        setAllUsers((prev) =>
                            prev.map((u) =>
                                u.username === username ? { ...u, current_activity: stamped } : u
                            )
                        );

                        // Also broadcast to others via status WebSocket
                        if (
                            statusWsRef.current &&
                            statusWsRef.current.readyState === WebSocket.OPEN
                        ) {
                            statusWsRef.current.send(
                                JSON.stringify({
                                    type: 'update_activity',
                                    activity: newActivity,
                                })
                            );
                        }
                    }
                }
            } catch (e) {
                // Swithnt fail
            }
        };

        const interval = setInterval(checkActivity, 15000); // 🔥 15s interval — daha hızlı Spotify/Steam güncellemesi
        checkActivity(); // Initial check

        return () => clearInterval(interval);
    }, [isAuthenticated, username, fetchWithAuth, isInitialDataLoaded]); // INTENTIONAL: statusWsRef, setAllUsers accessed via ref to avoid re-subscribe

    // =========================================================================
    // 12.1 OTHER USERS ACTIVITY REFRESH
    // =========================================================================
    useEffect(() => {
        if (
            !isAuthenticated ||
            !isInitialDataLoaded ||
            !Array.isArray(onlineUsers) ||
            onlineUsers.length === 0
        ) {
            return;
        }

        const fetchPresenceForOthers = async () => {
            const targets = onlineUsers.filter((name) => name && name !== username).slice(0, 25);

            if (targets.length === 0) return;

            const results = await Promise.allSettled(
                targets.map(async (targetUsername) => {
                    const response = await fetchWithAuth(
                        `${API_BASE_URL}/users/rich_presence/${targetUsername}/`
                    );
                    if (!response.ok) return null;

                    const data = await response.json();
                    const nextActivity = {};

                    if (data.spotify) {
                        nextActivity.spotify = {
                            type: 'listening',
                            track: data.spotify.track,
                            name: data.spotify.track,
                            artist: data.spotify.artist,
                            details: data.spotify.artist,
                            album_art: data.spotify.album_art,
                            timestamp: data.spotify.timestamp,
                        };
                    }

                    if (data.steam) {
                        nextActivity.steam = {
                            type: 'playing',
                            game: data.steam.game,
                            name: data.steam.game,
                            state: data.steam.state,
                            timestamp: data.steam.timestamp,
                        };
                    }

                    return {
                        username: targetUsername,
                        current_activity:
                            Object.keys(nextActivity).length > 0
                                ? { ...nextActivity, _received_at: Date.now() }
                                : null,
                    };
                })
            );

            const updates = results
                .filter((result) => result.status === 'fulfilled' && result.value)
                .map((result) => result.value);

            if (updates.length === 0) return;

            setAllUsers((prevUsers) => {
                const nextUsers = [...prevUsers];

                updates.forEach((update) => {
                    const index = nextUsers.findIndex((user) => user.username === update.username);
                    if (index >= 0) {
                        nextUsers[index] = {
                            ...nextUsers[index],
                            current_activity: update.current_activity,
                        };
                    } else {
                        nextUsers.push(update);
                    }
                });

                return nextUsers;
            });
        };

        fetchPresenceForOthers();
        const interval = setInterval(fetchPresenceForOthers, 45000);
        return () => clearInterval(interval);
    }, [
        isAuthenticated,
        isInitialDataLoaded,
        onlineUsers,
        username,
        fetchWithAuth,
        API_BASE_URL,
        setAllUsers,
    ]);

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
                            level: data.level || 'info',
                        });
                    } else {
                        setMaintenanceMode(null);
                    }
                }
            } catch (error) {
                logger.error('Maintenance check error:', error);
            }
        };

        // ⚡ İlk kontrol combined init'ten geliyor, sadece 5dk'da bir poll yap
        const interval = setInterval(checkMaintenanceMode, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [API_BASE_URL]); // INTENTIONAL: maintenance polling initialized once, only API_BASE_URL needed

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
        onEscape: () => {
            if (modals.featureHub) closeModal('featureHub');
        },
    });

    // =========================================================================
    // 16. VOICE ROOM — Auto-set activeChat to 'voice'
    // =========================================================================
    useEffect(() => {
        if (isInVoice && currentVoiceRoom) {
            setActiveChatRef.current('voice', currentVoiceRoom);
        }
    }, [isInVoice, currentVoiceRoom]); // Now safe: uses setActiveChatRef

    // =========================================================================
    // ANALYTICS: Page view tracking
    // =========================================================================
    usePageTracking();

    // --- RETURN ---
    return { safeAreaTop };
}
