// frontend/src/VoiceChatPanel.js
// 🎤 PROFESYONEL SESLİ SOHBET PANELİ - Discord/Zoom Tarzı

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useVoice } from './VoiceContext';
import { useAuth } from './AuthContext';
import useResponsive from './hooks/useResponsive'; // 🔥 RESPONSIVE
import Draggable from 'react-draggable';
import UserContextMenu from './components/UserContextMenu';
import ConnectionQualityIndicator from './components/ConnectionQualityIndicator'; // 🔥 YENİ
import VoiceSettingsPanel from './components/VoiceSettingsPanel'; // 🔥 YENİ: Gelişmiş Ses Ayarları
import toast from './utils/toast';
import SparkMD5 from 'spark-md5'; // 🔥 Avatar için

// 🔥 Avatar helper fonksiyonu - Fallback olarak kalıyor
const getDeterministicAvatarFallback = (username, size = 256) => {
    if (!username) return `https://ui-avatars.com/api/?name=User&background=5865f2&color=fff&bold=true&size=${size}`;
    const hash = SparkMD5.hash(username);
    const hue = parseInt(hash.substring(0, 8), 16) % 360;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=${hue.toString(16).padStart(2, '0')}${((hue + 60) % 360).toString(16).padStart(2, '0')}${((hue + 120) % 360).toString(16).padStart(2, '0')}&color=fff&bold=true&size=${size}`;
};

// 🔥 YENİ: Avatar URL'sinden _100x100 thumbnail suffix'ini kaldır
const getFullResolutionAvatar = (avatarUrl) => {
    if (!avatarUrl) return null;
    // _100x100 veya benzeri thumbnail suffix'lerini kaldır
    return avatarUrl
        .replace(/_100x100\./gi, '.')
        .replace(/_150x150\./gi, '.')
        .replace(/_50x50\./gi, '.')
        .replace(/\?.*$/, ''); // Query parametrelerini de temizle (size= gibi)
};

const VoiceChatPanel = ({
    roomName,
    onClose,
    isMinimized,
    onToggleMinimize,
    getRealUserAvatar,  // 🔥 YENİ: Gerçek avatar URL alıcı
    allUsers = [],      // 🔥 YENİ: Tüm kullanıcı listesi
    currentUserProfile  // 🔥 YENİ: Mevcut kullanıcının profili
}) => {
    const {
        isInVoice,
        isMuted,
        isDeafened,
        isVideoEnabled,
        isScreenSharing,
        isSpatialAudioEnabled,
        vadSensitivity,
        isNoiseSuppressionEnabled,
        screenShareQuality,
        screenShareFPS,
        isRecording,
        recordingDuration,
        isPTTMode,
        isPTTActive,
        pttKey,
        includeSystemAudio,
        connectedUsers = [],
        isReconnecting = false,
        connectionStats = {},
        startStatsMonitoring,
        stopStatsMonitoring,
        toggleMute,
        toggleDeafened,
        toggleCamera,
        toggleScreenShare,
        toggleSpatialAudio,
        updateVadSensitivity,
        toggleNoiseSuppression,
        updateScreenQuality,
        updateScreenFPS,
        toggleSystemAudio,
        togglePTTMode,
        updatePTTKey,
        startRecording,
        stopRecording,
        downloadRecording,
        leaveVoiceRoom: leaveVoice,
        localAudioStream,
        remoteStreams = {},
        remoteVolumes = {},
        setRemoteVolume,
        localCameraStream,
        localScreenStream,
        isTalking = false
    } = useVoice();

    console.log('[VoicePanel] Render:', {
        isInVoice,
        roomName,
        connectedUsers,
        remoteStreams,
        localCameraStream,
        localScreenStream
    });

    // 🔥 ALIAS: isCameraOn = isVideoEnabled
    const isCameraOn = isVideoEnabled;

    // 🔥 FIX: Combine local and remote streams
    const { user: currentUser } = useAuth();
    const combinedUsers = React.useMemo(() => {
        const users = [...connectedUsers];
        // Kendi local stream'imi ekle (eğer yoksa)
        if (currentUser && !users.some(u => u.username === currentUser.username)) {
            users.push({
                username: currentUser.username,
                isMuted: isMuted,
                isCameraOn: isCameraOn,
                isScreenSharing: isScreenSharing,
                isTalking: isTalking, // Burada kullan ama dependency'de değil
                isLocal: true // 🔥 Flag to identify local user
            });
        } else if (currentUser) {
            // Update existing user with local state
            const index = users.findIndex(u => u.username === currentUser.username);
            if (index >= 0) {
                users[index] = {
                    ...users[index],
                    isMuted: isMuted,
                    isCameraOn: isCameraOn,
                    isScreenSharing: isScreenSharing,
                    isTalking: isTalking, // Burada kullan ama dependency'de değil
                    isLocal: true
                };
            }
        }
        return users;
    }, [connectedUsers, currentUser, isMuted, isCameraOn, isScreenSharing]);
    // 🔥 PERFORMANS: isTalking çıkarıldı! Her 150ms re-render engellenecek

    // 🔥 YENİ: Gerçek avatar alma fonksiyonu (TAM ÇÖZÜNÜRLÜKLÜ)
    const getUserAvatar = useCallback((username) => {
        let avatarUrl = null;

        // 1. Önce currentUserProfile kontrol et (kendi avatar'ım)
        if (currentUserProfile && username === currentUser?.username) {
            // 🔥 FIX: avatar string olmalı
            if (currentUserProfile.avatar && typeof currentUserProfile.avatar === 'string') {
                // Tam URL ise direkt kullan
                if (currentUserProfile.avatar.startsWith('http') || currentUserProfile.avatar.startsWith('blob:')) {
                    avatarUrl = currentUserProfile.avatar;
                } else {
                    // Relative path ise tam URL yap
                    avatarUrl = `https://pawscord.com${currentUserProfile.avatar.startsWith('/') ? '' : '/'}${currentUserProfile.avatar}`;
                }
            }
        }

        // 2. getRealUserAvatar prop'unu kullan (varsa)
        if (!avatarUrl && getRealUserAvatar) {
            avatarUrl = getRealUserAvatar(username);
        }

        // 3. allUsers'tan avatar bul
        if (!avatarUrl) {
            const userFromList = allUsers.find(u => u.username === username);
            // 🔥 FIX: avatar string olmalı
            if (userFromList?.avatar && typeof userFromList.avatar === 'string') {
                if (userFromList.avatar.startsWith('http') || userFromList.avatar.startsWith('blob:')) {
                    avatarUrl = userFromList.avatar;
                } else {
                    avatarUrl = `https://pawscord.com${userFromList.avatar.startsWith('/') ? '' : '/'}${userFromList.avatar}`;
                }
            }
        }

        // 4. Avatar bulunduysa, tam çözünürlüklü versiyonu döndür
        if (avatarUrl) {
            return getFullResolutionAvatar(avatarUrl);
        }

        // 5. Fallback: Deterministic avatar (yüksek çözünürlük)
        return getDeterministicAvatarFallback(username, 256);
    }, [currentUserProfile, currentUser, getRealUserAvatar, allUsers]);

    // 🔥 Separate camera and screen streams
    const allStreams = React.useMemo(() => {
        const streams = { ...remoteStreams };
        if (currentUser?.username) {
            if (localCameraStream) {
                streams[`${currentUser.username}_camera`] = localCameraStream;
            }
            if (localScreenStream) {
                streams[`${currentUser.username}_screen`] = localScreenStream;
            }
        }
        return streams;
    }, [remoteStreams, currentUser, localCameraStream, localScreenStream]);

    const [expandedUser, setExpandedUser] = useState(null); // Fullscreen mode
    const [pinnedUser, setPinnedUser] = useState(null); // Pinned user
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [audioSettings, setAudioSettings] = useState({
        noiseSuppression: true,
        echoCancellation: true,
        autoGainControl: true,
    });
    const [contextMenu, setContextMenu] = useState(null); // 🆕 User context menu
    const [volumeSettings, setVolumeSettings] = useState(() => {
        // 🔥 YENİ: localStorage'dan yükle
        try {
            const saved = localStorage.getItem('pawscord_voice_volumes');
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    }); // 🆕 Per-user volume

    // 🔥 YENİ: Connection Quality Monitoring
    const [connectionQuality, setConnectionQuality] = useState({});

    // 🔥 YENİ: Echo Detection
    const [hasEchoRisk, setHasEchoRisk] = useState(false);
    const [showEchoWarning, setShowEchoWarning] = useState(true);

    // 🔥 YENİ: Network Quality Monitor
    const [networkQuality, setNetworkQuality] = useState('good'); // 'excellent', 'good', 'poor'
    const [networkType, setNetworkType] = useState('unknown');
    const [autoQualityEnabled, setAutoQualityEnabled] = useState(true);

    // 🔥 YENİ: Volume Normalization
    const [volumeNormalization, setVolumeNormalization] = useState(true);
    const [userAudioLevels, setUserAudioLevels] = useState({}); // Track audio levels per user
    const [normalizedGains, setNormalizedGains] = useState({}); // Auto-adjusted gains

    // 🔥 YENİ: Visual Enhancements
    const [talkingIndicators, setTalkingIndicators] = useState({}); // Animated waves when talking
    const [activeSpeaker, setActiveSpeaker] = useState(null); // Currently dominant speaker

    const nodeRef = useRef(null);

    // 🔥 YENİ: RoomList'teki ayar butonundan settings açma
    useEffect(() => {
        const handleOpenSettings = () => {
            setIsSettingsOpen(true);
        };
        window.addEventListener('openVoiceSettings', handleOpenSettings);
        return () => window.removeEventListener('openVoiceSettings', handleOpenSettings);
    }, []);

    // 🔥 YENİ: Volume ayarlarını localStorage'a kaydet
    useEffect(() => {
        try {
            localStorage.setItem('pawscord_voice_volumes', JSON.stringify(volumeSettings));
        } catch (err) {
            console.warn('Failed to save volume settings:', err);
        }
    }, [volumeSettings]);

    // 🔥 YENİ: Connection Quality Monitoring
    useEffect(() => {
        if (!isInVoice) return;

        const monitorConnections = async () => {
            // VoiceContext'ten peer connections'a erişmek için global reference kullan
            const peerConnections = window.__pawscord_peer_connections__ || {};

            for (const [username, pc] of Object.entries(peerConnections)) {
                if (pc && pc.getStats) {
                    try {
                        const stats = await pc.getStats();
                        stats.forEach(report => {
                            if (report.type === 'candidate-pair' && report.state === 'succeeded') {
                                setConnectionQuality(prev => ({
                                    ...prev,
                                    [username]: {
                                        rtt: Math.round((report.currentRoundTripTime || 0) * 1000), // ms
                                        packetLoss: report.packetsLost && report.packetsSent
                                            ? Math.round((report.packetsLost / report.packetsSent) * 100 * 10) / 10
                                            : 0,
                                        quality: (report.currentRoundTripTime || 0) < 0.1 ? 'excellent' :
                                            (report.currentRoundTripTime || 0) < 0.2 ? 'good' : 'poor'
                                    }
                                }));
                            }
                        });
                    } catch (err) {
                        console.warn('[Quality] Failed to get stats for', username, err);
                    }
                }
            }
        };

        const interval = setInterval(monitorConnections, 3000);
        monitorConnections(); // İlk çalıştırma

        return () => clearInterval(interval);
    }, [isInVoice]);

    // 🔥 YENİ: WebRTC Stats Monitoring from VoiceContext
    useEffect(() => {
        if (isInVoice && startStatsMonitoring) {
            startStatsMonitoring();
        }
        return () => {
            if (stopStatsMonitoring) {
                stopStatsMonitoring();
            }
        };
    }, [isInVoice, startStatsMonitoring, stopStatsMonitoring]);

    // 🔥 YENİ: Echo Detection
    useEffect(() => {
        if (!localAudioStream || isMuted || !isInVoice) {
            setHasEchoRisk(false);
            return;
        }

        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioContext = new AudioContext();
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 2048;
            analyser.smoothingTimeConstant = 0.8;

            const source = audioContext.createMediaStreamSource(localAudioStream);
            source.connect(analyser);

            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            let consecutiveHighReadings = 0;

            const detectEcho = () => {
                analyser.getByteFrequencyData(dataArray);

                // Yüksek frekanslı feedback tespiti (2-4 kHz arası)
                const highFreqRange = dataArray.slice(80, 160);
                const highFreqPeak = Math.max(...highFreqRange);
                const highFreqAvg = highFreqRange.reduce((a, b) => a + b, 0) / highFreqRange.length;

                // Düşük frekanslı (kendi sesimiz)
                const lowFreqRange = dataArray.slice(10, 40);
                const lowFreqAvg = lowFreqRange.reduce((a, b) => a + b, 0) / lowFreqRange.length;

                // Echo riski: Yüksek frekans çok yüksek VE düşük frekansa göre orantısız
                if (highFreqPeak > 180 && highFreqAvg > 100 && highFreqAvg > lowFreqAvg * 1.5) {
                    consecutiveHighReadings++;
                    if (consecutiveHighReadings > 3) { // 3 saniye üst üste
                        setHasEchoRisk(true);
                    }
                } else {
                    consecutiveHighReadings = 0;
                    if (highFreqPeak < 120) {
                        setHasEchoRisk(false);
                    }
                }
            };

            const interval = setInterval(detectEcho, 1000);

            return () => {
                clearInterval(interval);
                source.disconnect();
                audioContext.close();
            };
        } catch (err) {
            console.warn('[Echo] Detection failed:', err);
        }
    }, [localAudioStream, isMuted, isInVoice]);

    // 🔥 YENİ: Network Quality Monitoring
    useEffect(() => {
        if (!isInVoice) return;

        // Check if Network Information API is available
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

        const updateNetworkQuality = () => {
            if (!connection) {
                setNetworkQuality('good');
                setNetworkType('unknown');
                return;
            }

            // Get network type (4g, 3g, wifi, etc.)
            const effectiveType = connection.effectiveType || 'unknown';
            setNetworkType(effectiveType);

            // Get downlink speed (Mbps)
            const downlink = connection.downlink || 10; // Default 10 Mbps
            const rtt = connection.rtt || 50; // Round trip time

            // Determine quality based on network conditions
            let quality = 'good';
            if (effectiveType === '4g' && downlink >= 5 && rtt < 100) {
                quality = 'excellent';
            } else if (effectiveType === 'slow-2g' || downlink < 1 || rtt > 300) {
                quality = 'poor';
            } else if (effectiveType === '2g' || effectiveType === '3g' || downlink < 3 || rtt > 150) {
                quality = 'good';
            } else {
                quality = 'excellent';
            }

            setNetworkQuality(quality);

            // Auto-adjust video quality if enabled
            if (autoQualityEnabled && updateScreenQuality) {
                if (quality === 'poor' && screenShareQuality !== '720p') {
                    console.log('📶 [Network] Poor connection detected, downgrading to 720p');
                    updateScreenQuality('720p');
                } else if (quality === 'excellent' && screenShareQuality === '720p') {
                    console.log('📶 [Network] Excellent connection, upgrading to 1080p');
                    updateScreenQuality('1080p');
                }
            }
        };

        // Initial check
        updateNetworkQuality();

        // Listen for network changes
        if (connection) {
            connection.addEventListener('change', updateNetworkQuality);
        }

        // Periodic check (every 10 seconds)
        const interval = setInterval(updateNetworkQuality, 10000);

        return () => {
            clearInterval(interval);
            if (connection) {
                connection.removeEventListener('change', updateNetworkQuality);
            }
        };
    }, [isInVoice, autoQualityEnabled, screenShareQuality, updateScreenQuality]);

    // 🔥 YENİ: Volume Normalization & Audio Level Monitoring
    useEffect(() => {
        if (!volumeNormalization || !isInVoice) return;

        const monitorAudioLevels = () => {
            const remoteAudios = document.querySelectorAll('audio[data-username]');
            const levels = {};
            const newGains = { ...normalizedGains };

            remoteAudios.forEach(audio => {
                const username = audio.getAttribute('data-username');
                if (!username) return;

                try {
                    // Create audio context for analysis
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const source = audioContext.createMediaElementSource(audio);
                    const analyser = audioContext.createAnalyser();
                    analyser.fftSize = 256;

                    source.connect(analyser);
                    analyser.connect(audioContext.destination);

                    const dataArray = new Uint8Array(analyser.frequencyBinCount);
                    analyser.getByteFrequencyData(dataArray);

                    // Calculate average audio level
                    const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
                    levels[username] = average;

                    // Auto-adjust gain for quiet/loud talkers
                    // Target level: 70-100 (good speaking volume)
                    if (average > 0) {
                        if (average < 50) {
                            // Quiet talker - boost volume
                            newGains[username] = Math.min(1.5, (newGains[username] || 1) * 1.05);
                        } else if (average > 120) {
                            // Loud talker - reduce volume
                            newGains[username] = Math.max(0.7, (newGains[username] || 1) * 0.95);
                        }
                    }

                    audioContext.close();
                } catch (err) {
                    // Ignore errors for already connected sources
                    console.debug('Audio analysis error (expected):', err.message);
                }
            });

            setUserAudioLevels(levels);
            setNormalizedGains(newGains);
        };

        const interval = setInterval(monitorAudioLevels, 2000);
        return () => clearInterval(interval);
    }, [volumeNormalization, isInVoice, normalizedGains]);

    // 🔥 YENİ: Talking Indicator & Active Speaker Detection
    useEffect(() => {
        if (!isInVoice) return;

        const detectTalking = () => {
            const indicators = {};
            let loudestUser = null;
            let maxLevel = 0;

            // Check all users including self
            Object.entries(userAudioLevels).forEach(([username, level]) => {
                // Talking threshold: 30+ (adjusted for sensitivity)
                if (level > 30) {
                    indicators[username] = true;

                    // Track loudest speaker
                    if (level > maxLevel) {
                        maxLevel = level;
                        loudestUser = username;
                    }
                } else {
                    indicators[username] = false;
                }
            });

            setTalkingIndicators(indicators);

            // Update active speaker (with debounce to avoid flickering)
            if (loudestUser && maxLevel > 50) {
                setActiveSpeaker(loudestUser);
            } else if (maxLevel === 0) {
                // No one talking
                setActiveSpeaker(null);
            }
        };

        const interval = setInterval(detectTalking, 100); // 10 FPS for smooth animation
        return () => clearInterval(interval);
    }, [isInVoice, userAudioLevels]);

    // 🎨 GLOBAL CSS FOR FULLSCREEN
    useEffect(() => {
        const style = document.createElement('style');
        style.id = 'voice-fullscreen-styles';
        style.textContent = `
            /* Tam Ekran Video Stilleri */
            div:fullscreen video,
            div:-webkit-full-screen video,
            div:-moz-full-screen video,
            div:-ms-fullscreen video {
                width: 100% !important;
                height: 100% !important;
                object-fit: contain !important;
                background: #000 !important;
            }

            /* Tam Ekran Container */
            div:fullscreen,
            div:-webkit-full-screen,
            div:-moz-full-screen,
            div:-ms-fullscreen {
                background: #000 !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
            }

            /* Tam Ekran Kontrolleri */
            div:fullscreen .hover-actions,
            div:-webkit-full-screen .hover-actions,
            div:-moz-full-screen .hover-actions,
            div:-ms-fullscreen .hover-actions {
                opacity: 1 !important;
                z-index: 9999 !important;
            }

            /* 🔥 YENİ: Badge Animasyonları */
            @keyframes badgePulse {
                0%, 100% {
                    transform: scale(1);
                    box-shadow: 0 4px 16px rgba(88, 101, 242, 0.6), 0 0 0 2px rgba(255, 255, 255, 0.2);
                }
                50% {
                    transform: scale(1.05);
                    box-shadow: 0 6px 20px rgba(88, 101, 242, 0.9), 0 0 0 3px rgba(255, 255, 255, 0.4);
                }
            }

            @keyframes pulse {
                0%, 100% {
                    opacity: 1;
                    transform: scale(1);
                }
                50% {
                    opacity: 0.7;
                    transform: scale(1.2);
                }
            }

            /* 🔥 YENİ: Talking Indicator Wave Animations */
            @keyframes wave1 {
                0%, 100% { height: 12px; }
                50% { height: 20px; }
            }
            @keyframes wave2 {
                0%, 100% { height: 16px; }
                50% { height: 24px; }
            }
            @keyframes wave3 {
                0%, 100% { height: 12px; }
                50% { height: 20px; }
            }

            /* 🔥 YENİ: Avatar Talking Pulse Animation */
            @keyframes talkingPulse {
                0%, 100% {
                    box-shadow: 0 0 0 0 rgba(67, 181, 129, 0.7);
                    transform: scale(1);
                }
                50% {
                    box-shadow: 0 0 0 15px rgba(67, 181, 129, 0);
                    transform: scale(1.02);
                }
            }
        `;
        document.head.appendChild(style);

        return () => {
            // Cleanup: Component unmount olduğunda style'ı kaldır
            const existingStyle = document.getElementById('voice-fullscreen-styles');
            if (existingStyle) {
                existingStyle.remove();
            }
        };
    }, []);

    // 🔥 RESPONSIVE HOOK
    const { isMobile } = useResponsive();

    // 🎨 RENDER MODES (mobile için özel)
    const renderMode = expandedUser ? 'fullscreen' :
        isMinimized ? 'minimized' :
            isMobile ? 'mobile' : 'grid';

    useEffect(() => {
        if (!isInVoice) {
            onClose();
        }
    }, [isInVoice, onClose]);

    // 🎯 VIDEO GRID LAYOUT (responsive)
    const getGridLayout = (count) => {
        // Mobile: 1 column
        if (isMobile) {
            return { cols: 1, rows: count };
        }

        // Tablet/Desktop
        if (count <= 1) return { cols: 1, rows: 1 };
        if (count <= 4) return { cols: 2, rows: 2 };
        if (count <= 6) return { cols: 3, rows: 2 };
        if (count <= 9) return { cols: 3, rows: 3 };
        return { cols: 4, rows: Math.ceil(count / 4) };
    };

    // Calculate total stream count (camera + screen shares)
    const totalStreamCount = React.useMemo(() => {
        let count = combinedUsers.length; // Her kullanıcı için kamera kartı
        combinedUsers.forEach(user => {
            const baseKey = user.username;
            const hasScreenStream = allStreams[`${baseKey}_screen`];
            if (hasScreenStream && user.isScreenSharing) {
                count++; // Ekran paylaşımı varsa bir kart daha ekle
            }
        });
        return count;
    }, [combinedUsers, allStreams]);

    const userCount = combinedUsers.length;
    const { cols, rows } = getGridLayout(totalStreamCount);

    // 🆕 CONTEXT MENU HANDLERS
    const handleSendMessage = useCallback(async (targetUser) => {
        window.location.hash = `#/dm/${targetUser.username}`;
    }, []);

    const handleAddFriend = useCallback(async (targetUser) => {
        try {
            const response = await fetch(`/api/friends/send_request/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ username: targetUser.username })
            });
            if (response.ok) {
                toast.success(`✅ ${targetUser.username} kullanıcısına arkadaşlık isteği gönderildi!`);
            } else {
                toast.error('❌ Arkadaşlık isteği gönderilemedi');
            }
        } catch (error) {
            console.error('Friend request error:', error);
            toast.error('❌ Bir hata oluştu');
        }
    }, []);

    const handleBlock = useCallback(async (targetUser) => {
        try {
            const response = await fetch(`/api/users/block/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ username: targetUser.username })
            });
            if (response.ok) {
                toast.success(`✅ ${targetUser.username} engellendi!`);
            } else {
                toast.error('❌ Engelleme işlemi başarısız');
            }
        } catch (error) {
            console.error('Block error:', error);
            toast.error('❌ Bir hata oluştu');
        }
    }, []);

    const handleViewProfile = useCallback((targetUser) => {
        setContextMenu(null);
        // 🔥 Profil panelini aç
        if (window.openUserProfile) {
            window.openUserProfile(targetUser.username);
        } else {
            // Fallback - profil sayfasına git
            window.location.hash = `#/profile/${targetUser.username}`;
        }
    }, []);

    const handleMuteUser = useCallback((targetUser) => {
        setVolumeSettings(prev => ({
            ...prev,
            [targetUser.username]: {
                ...prev[targetUser.username],
                isMuted: !prev[targetUser.username]?.isMuted
            }
        }));
    }, []);

    const handleAdjustVolume = useCallback((targetUser, newVolume) => {
        const volume = Math.max(0, Math.min(150, newVolume)); // 0-150% range

        setVolumeSettings(prev => ({
            ...prev,
            [targetUser.username]: {
                ...prev[targetUser.username],
                volume: volume
            }
        }));

        // 🔥 İYİLEŞTİRME: Audio element'e anında uygula
        const audioElements = document.querySelectorAll(`audio[data-username="${targetUser.username}"]`);
        audioElements.forEach(audio => {
            audio.volume = volume / 100;
            console.log(`🔊 [Volume] Set ${targetUser.username} to ${volume}%`);
        });
    }, []);

    // 🎨 HELPER: Status Badges
    const renderStatusBadges = () => {
        const badges = [];
        if (isRecording) {
            badges.push(
                <span key="rec" style={{ background: 'rgba(237,66,69,0.2)', color: '#ed4245', border: '1px solid rgba(237,66,69,0.4)', padding: '4px 8px', borderRadius: '10px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    ⏺️ Kayıtta ({Math.floor(recordingDuration / 60).toString().padStart(2, '0')}:{Math.floor(recordingDuration % 60).toString().padStart(2, '0')})
                </span>
            );
        }
        if (isScreenSharing) {
            badges.push(
                <span key="ss" style={{ background: 'rgba(88,101,242,0.15)', color: '#8893ff', border: '1px solid rgba(88,101,242,0.35)', padding: '4px 8px', borderRadius: '10px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    🖥️ Paylaşılıyor {screenShareQuality} • {screenShareFPS}fps{includeSystemAudio ? ' • 🔊 Sistem' : ''}
                </span>
            );
        }
        if (isPTTMode) {
            badges.push(
                <span key="ptt" style={{ background: 'rgba(250,166,26,0.18)', color: '#faa61a', border: '1px solid rgba(250,166,26,0.35)', padding: '4px 8px', borderRadius: '10px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    🎙️ PTT ({pttKey}) {isPTTActive ? '• Aktif' : ''}
                </span>
            );
        }
        if (isReconnecting) {
            badges.push(
                <span key="reconnect" style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: '10px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    🔄 Yeniden bağlanıyor
                </span>
            );
        }
        return badges.length ? <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>{badges}</div> : null;
    };

    // 🎨 HELPER: Stream Type Badge (Ekran/Kamera Göstergesi)
    const renderStreamBadge = (user) => {
        if (user.streamType === 'screen') {
            return (
                <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'linear-gradient(135deg, #5865f2 0%, #7289da 100%)',
                    color: '#fff',
                    padding: '8px 16px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: 700,
                    boxShadow: '0 4px 16px rgba(88, 101, 242, 0.6), 0 0 0 2px rgba(255, 255, 255, 0.2)',
                    zIndex: 100,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    animation: 'badgePulse 2s infinite',
                }}>
                    🖥️ <span style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>{user.username} - Ekran Paylaşıyor</span>
                </div>
            );
        } else if (user.streamType === 'camera') {
            return (
                <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(67, 181, 129, 0.85)',
                    color: '#fff',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 600,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                    zIndex: 100,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                }}>
                    📹 Kamera
                </div>
            );
        }
        return null;
    };

    // 🎨 MINIMIZED VIEW (Küçük Ada - Discord Tarzı)
    if (renderMode === 'minimized') {
        return (
            <Draggable
                nodeRef={nodeRef}
                handle=".mini-drag-handle"
                defaultPosition={{ x: 20, y: window.innerHeight - 180 }}
                bounds="parent"
            >
                <div
                    ref={nodeRef}
                    style={{
                        position: 'fixed',
                        zIndex: 9999,
                        background: 'linear-gradient(135deg, #2c2f33 0%, #23272a 100%)',
                        borderRadius: '16px',
                        padding: '16px',
                        boxShadow: '0 12px 48px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        minWidth: '320px',
                        maxWidth: '400px',
                    }}
                >
                    {/* MINI HEADER */}
                    <div
                        className="mini-drag-handle"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            cursor: 'move',
                            marginBottom: '12px',
                            paddingBottom: '12px',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        <div style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: '#43b581',
                            boxShadow: '0 0 12px #43b581',
                            animation: 'pulse 2s infinite',
                        }} />
                        <span style={{
                            color: '#fff',
                            fontSize: '14px',
                            fontWeight: 600,
                            flex: 1,
                        }}>
                            🎤 {roomName}
                        </span>
                        <div style={{
                            background: 'rgba(67, 181, 129, 0.2)',
                            borderRadius: '12px',
                            padding: '4px 10px',
                            fontSize: '11px',
                            color: '#43b581',
                            fontWeight: 600,
                        }}>
                            👥 {userCount}
                        </div>
                        <button
                            onClick={onToggleMinimize}
                            style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '6px 10px',
                                color: '#fff',
                                cursor: 'pointer',
                                fontSize: '12px',
                                transition: 'all 0.2s',
                            }}
                            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                            onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                        >
                            ⬆️ Aç
                        </button>
                    </div>

                    {/* KULLANICILAR */}
                    <div style={{
                        marginBottom: '12px',
                        maxHeight: '120px',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                    }}>
                        {combinedUsers.slice(0, 3).map(user => (
                            <div
                                key={user.username}
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    if (user.username !== currentUser?.username) {
                                        setContextMenu({
                                            user,
                                            position: { x: e.clientX, y: e.clientY }
                                        });
                                    }
                                }}
                                onClick={(e) => {
                                    if (user.username !== currentUser?.username) {
                                        setContextMenu({
                                            user,
                                            position: { x: e.clientX, y: e.clientY }
                                        });
                                    }
                                }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '8px',
                                    background: user.isTalking
                                        ? 'rgba(67, 181, 129, 0.15)'
                                        : 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '8px',
                                    border: user.isTalking
                                        ? '1px solid rgba(67, 181, 129, 0.4)'
                                        : '1px solid transparent',
                                    transition: 'all 0.2s',
                                    cursor: user.username !== currentUser?.username ? 'pointer' : 'default',
                                }}
                                onMouseEnter={(e) => {
                                    if (user.username !== currentUser?.username) {
                                        e.currentTarget.style.background = 'rgba(67, 181, 129, 0.2)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = user.isTalking
                                        ? 'rgba(67, 181, 129, 0.15)'
                                        : 'rgba(255, 255, 255, 0.05)';
                                }}
                            >
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #5865f2, #7289da)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '14px',
                                }}>
                                    👤
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{
                                        color: '#fff',
                                        fontSize: '13px',
                                        fontWeight: 600,
                                    }}>
                                        {user.username} {user.isLocal && '(Siz)'}
                                    </div>
                                    <div style={{
                                        color: 'rgba(255, 255, 255, 0.5)',
                                        fontSize: '11px',
                                    }}>
                                        {user.isMuted ? '🔇 Sessiz' : user.isTalking ? '🔊 Konuşuyor' : '🎤 Aktif'}
                                    </div>
                                </div>
                                {user.isCameraOn && <span style={{ fontSize: '14px' }}>📹</span>}
                                {user.isScreenSharing && <span style={{ fontSize: '14px' }}>🖥️</span>}
                            </div>
                        ))}
                        {userCount > 3 && (
                            <div style={{
                                textAlign: 'center',
                                color: 'rgba(255, 255, 255, 0.5)',
                                fontSize: '11px',
                                padding: '6px',
                            }}>
                                +{userCount - 3} daha...
                            </div>
                        )}
                    </div>

                    {/* MINI CONTROLS */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '8px',
                    }}>
                        <MiniButton
                            icon={isMuted ? '🔇' : '🎤'}
                            active={!isMuted}
                            onClick={toggleMute}
                            title={isMuted ? 'Mikrofonu Aç' : 'Mikrofonu Kapat'}
                        />
                        <MiniButton
                            icon={isCameraOn ? '📹' : '📷'}
                            active={isCameraOn}
                            onClick={toggleCamera}
                            title={isCameraOn ? 'Kamerayı Kapat' : 'Kamerayı Aç'}
                        />
                        <MiniButton
                            icon="🖥️"
                            active={isScreenSharing}
                            onClick={toggleScreenShare}
                            title={isScreenSharing ? 'Paylaşımı Durdur' : 'Ekran Paylaş'}
                        />
                        <MiniButton
                            icon="❌"
                            danger
                            onClick={leaveVoice}
                            title="Ayrıl"
                        />
                    </div>
                </div>
            </Draggable>
        );
    }

    // 🎨 FULLSCREEN VIEW (Bir kullanıcı genişletildi)
    if (renderMode === 'fullscreen' && expandedUser) {
        const streamKey = expandedUser.streamType === 'screen'
            ? `${expandedUser.username}_screen`
            : `${expandedUser.username}_camera`;
        const expandedStream = allStreams[streamKey] || allStreams[expandedUser.username];

        return (
            <div style={{
                width: '100%',
                height: '100%',
                background: '#000',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}>
                {/* FULLSCREEN HEADER */}
                <div style={{
                    background: 'rgba(0, 0, 0, 0.8)',
                    padding: '16px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                }}>
                    <button
                        onClick={() => setExpandedUser(null)}
                        style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            color: '#fff',
                            cursor: 'pointer',
                            fontSize: '14px',
                        }}
                    >
                        ⬅️ Geri
                    </button>
                    <h3 style={{ color: '#fff', margin: 0, flex: 1 }}>
                        👤 {expandedUser.username} {expandedUser.streamType === 'screen' && '🖥️ Ekran Paylaşımı'}
                    </h3>
                </div>

                {/* FULLSCREEN VIDEO */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#1a1a1a',
                }}>
                    <VideoFeed
                        user={expandedUser}
                        stream={expandedStream}
                        fullscreen
                    />
                </div>

                {/* FULLSCREEN CONTROLS */}
                <ControlBar
                    isMuted={isMuted}
                    isDeafened={isDeafened} // 🔥 YENİ
                    isCameraOn={isCameraOn}
                    isScreenSharing={isScreenSharing}
                    isSpatialAudio={isSpatialAudioEnabled}
                    isRecording={isRecording}
                    recordingDuration={recordingDuration}
                    onToggleMute={toggleMute}
                    onToggleDeafened={toggleDeafened} // 🔥 YENİ
                    onToggleCamera={toggleCamera}
                    onToggleScreenShare={toggleScreenShare}
                    onToggleSpatialAudio={toggleSpatialAudio}
                    onStartRecording={startRecording}
                    onStopRecording={stopRecording}
                    onLeave={leaveVoice}
                />
            </div>
        );
    }

    // 🎨 GRID VIEW (Ana Görünüm)
    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #1e1e1e 0%, #2c2c2c 100%)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
        }}>
            {/* HEADER */}
            <div style={{
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
                <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#43b581',
                    boxShadow: '0 0 12px #43b581',
                    animation: 'pulse 2s infinite',
                }} />
                <h2 style={{
                    color: '#fff',
                    margin: 0,
                    fontSize: '18px',
                    fontWeight: 600,
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    📹 Sesli Sohbet: {roomName}
                    {renderStatusBadges()}
                    {/* 🔥 YENİ: Network Quality Badge */}
                    {networkQuality === 'poor' && (
                        <div style={{
                            background: 'rgba(240, 71, 71, 0.2)',
                            border: '1px solid #f04747',
                            borderRadius: '6px',
                            padding: '4px 8px',
                            fontSize: '12px',
                            color: '#f04747',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }}>
                            ⚠️ Zayıf Bağlantı
                        </div>
                    )}
                    {networkQuality === 'excellent' && networkType !== 'unknown' && (
                        <div style={{
                            background: 'rgba(67, 181, 129, 0.2)',
                            border: '1px solid #43b581',
                            borderRadius: '6px',
                            padding: '4px 8px',
                            fontSize: '12px',
                            color: '#43b581',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }}>
                            📶 {networkType.toUpperCase()}
                        </div>
                    )}
                </h2>
                <div style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '14px',
                }}>
                    👥 {userCount} kişi
                </div>
                <button
                    onClick={onToggleMinimize}
                    style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        color: '#fff',
                        cursor: 'pointer',
                        fontSize: '13px',
                    }}
                >
                    ⬇️ Küçült
                </button>
            </div>

            {/* VIDEO GRID */}
            <div style={{
                flex: 1,
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'auto', // 🔥 FIX: auto olsun ki scroll yapılabilsin
                position: 'relative',
                minHeight: 0, // 🔥 FIX: Flex child overflow için gerekli
            }}>
                {/* Ana ekran paylaşımları varsa büyük göster */}
                {(() => {
                    const screenShares = combinedUsers.filter(u => u.isScreenSharing && allStreams[`${u.username}_screen`]);
                    const hasScreenShares = screenShares.length > 0;

                    // 🔥 DEBUG: Stream durumlarını logla
                    console.log('[VoicePanel] Stream Status:', {
                        combinedUsersCount: combinedUsers.length,
                        combinedUsers: combinedUsers.map(u => u.username),
                        screenSharesCount: screenShares.length,
                        screenShares: screenShares.map(u => u.username),
                        allStreamKeys: Object.keys(allStreams),
                        hasScreenShares
                    });

                    if (hasScreenShares) {
                        // 🔥 FIX: Tüm kullanıcıları tek grid'de göster (ekran + kamera karışık)
                        const allItems = [];

                        // Önce ekran paylaşımlarını ekle
                        screenShares.forEach(user => {
                            const screenStream = allStreams[`${user.username}_screen`];
                            if (screenStream) { // 🔥 Stream varsa ekle
                                allItems.push({
                                    key: `${user.username}_screen`,
                                    username: user.username,
                                    type: 'screen',
                                    component: (
                                        <UserVideoCard
                                            key={`${user.username}_screen`}
                                            user={{ ...user, streamType: 'screen' }}
                                            stream={screenStream}
                                            isActive={false}
                                            isPinned={false}
                                            onExpand={() => setExpandedUser({ ...user, streamType: 'screen' })}
                                            onPin={() => { }}
                                            onContextMenu={(data) => setContextMenu(data)}
                                            badge={renderStreamBadge({ ...user, streamType: 'screen' })}
                                            connectionQuality={connectionQuality[user.username]}
                                            getUserAvatar={getUserAvatar}
                                        />
                                    )
                                });
                            }
                        });

                        // Sonra kameraları ekle (sadece aktif stream'ler veya kendim)
                        combinedUsers.forEach(user => {
                            const cameraStream = allStreams[`${user.username}_camera`] || allStreams[user.username];

                            // 🔥 CRITICAL: Stream varsa VEYA kendim isem göster
                            const shouldShow = (cameraStream && cameraStream.active) || user.isLocal;

                            if (shouldShow) {
                                allItems.push({
                                    key: `${user.username}_camera`,
                                    username: user.username,
                                    type: 'camera',
                                    component: (
                                        <UserVideoCard
                                            key={`${user.username}_camera`}
                                            user={{
                                                ...user,
                                                streamType: 'camera',
                                                volume: remoteVolumes[user.username] || 100,
                                                onVolumeChange: (vol) => setRemoteVolume(user.username, vol),
                                                isTalking: talkingIndicators[user.username] || false, // 🔥 YENİ
                                            }}
                                            stream={cameraStream}
                                            isActive={activeSpeaker === user.username}
                                            isPinned={pinnedUser === user.username}
                                            onExpand={() => setExpandedUser({ ...user, streamType: 'camera' })}
                                            onPin={() => setPinnedUser(pinnedUser === user.username ? null : user.username)}
                                            onContextMenu={(data) => setContextMenu(data)}
                                            badge={renderStreamBadge(user)}
                                            connectionQuality={connectionQuality[user.username]}
                                            getUserAvatar={getUserAvatar}
                                        />
                                    )
                                });
                            }
                        });

                        // Grid layout hesapla - Daha iyi dağılım
                        const totalItems = allItems.length;
                        let cols, rows;

                        if (totalItems <= 2) {
                            cols = totalItems;
                            rows = 1;
                        } else if (totalItems <= 4) {
                            cols = 2;
                            rows = 2;
                        } else if (totalItems <= 6) {
                            cols = 3;
                            rows = 2;
                        } else {
                            cols = 3;
                            rows = Math.ceil(totalItems / 3);
                        }

                        console.log(`[VoicePanel] Grid: ${totalItems} items, ${cols}x${rows}`, allItems.map(i => `${i.username}:${i.type}`));

                        return (
                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'grid',
                                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                                gridTemplateRows: `repeat(${rows}, 1fr)`,
                                gap: '16px',
                                padding: '0',
                                position: 'relative', // 🔥 FIX: Parent relative olmalı
                            }}>
                                {allItems.map((item, index) => (
                                    <div
                                        key={item.key}
                                        style={{
                                            position: 'relative', // 🔥 FIX: Her cell relative
                                            width: '100%',
                                            height: '100%',
                                            overflow: 'hidden', // 🔥 FIX: Taşmayı önle
                                            zIndex: 1, // 🔥 FIX: Base z-index
                                            isolation: 'isolate', // 🔥 FIX: Z-index context izolasyonu
                                        }}
                                    >
                                        {item.component}
                                    </div>
                                ))}
                            </div>
                        );
                    } else {
                        // 🔥 YENİ: Hiç stream yoksa profil fotoğraflarını göster
                        const hasAnyActiveStream = combinedUsers.some(u => {
                            const cameraStream = allStreams[`${u.username}_camera`] || allStreams[u.username];
                            return cameraStream && cameraStream.active;
                        });

                        if (!hasAnyActiveStream) {
                            // Profil kartları göster
                            return (
                                <div style={{
                                    flex: 1,
                                    display: 'grid',
                                    gridTemplateColumns: `repeat(${Math.min(cols, 3)}, 1fr)`,
                                    gridTemplateRows: `repeat(${rows}, 1fr)`,
                                    gap: '24px',
                                    padding: '40px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    {combinedUsers.map(user => (
                                        <div
                                            key={user.username}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '12px',
                                                padding: '32px',
                                                borderRadius: '16px',
                                                background: activeSpeaker === user.username
                                                    ? 'linear-gradient(135deg, rgba(88, 101, 242, 0.25) 0%, rgba(114, 137, 218, 0.15) 100%)'
                                                    : 'rgba(47, 49, 54, 0.5)',
                                                border: activeSpeaker === user.username
                                                    ? '2px solid rgba(88, 101, 242, 0.9)'
                                                    : '2px solid rgba(79, 84, 92, 0.3)',
                                                boxShadow: activeSpeaker === user.username
                                                    ? '0 8px 32px rgba(88, 101, 242, 0.4), 0 0 20px rgba(88, 101, 242, 0.3)'
                                                    : '0 4px 12px rgba(0, 0, 0, 0.2)',
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                cursor: 'pointer',
                                                position: 'relative',
                                                transform: activeSpeaker === user.username ? 'scale(1.05)' : 'scale(1)',
                                            }}
                                            onClick={() => setContextMenu({
                                                user,
                                                position: { x: window.innerWidth / 2, y: window.innerHeight / 2 }
                                            })}
                                        >
                                            {/* Avatar */}
                                            <div style={{
                                                width: '140px',
                                                height: '140px',
                                                borderRadius: '50%',
                                                overflow: 'hidden',
                                                border: `5px solid ${activeSpeaker === user.username ? '#5865f2' : '#40444b'}`,
                                                boxShadow: activeSpeaker === user.username
                                                    ? '0 8px 24px rgba(88, 101, 242, 0.6), inset 0 0 20px rgba(88, 101, 242, 0.2)'
                                                    : '0 4px 12px rgba(0, 0, 0, 0.4)',
                                                animation: activeSpeaker === user.username ? 'pulse 1.5s infinite' : 'none',
                                                position: 'relative',
                                            }}>
                                                <img
                                                    src={getUserAvatar(user.username)}
                                                    alt={user.username}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = getDeterministicAvatarFallback(user.username, 256);
                                                    }}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        filter: activeSpeaker === user.username ? 'brightness(1.1)' : 'brightness(0.95)',
                                                    }}
                                                />
                                            </div>

                                            {/* Username */}
                                            <div style={{
                                                fontSize: '20px',
                                                fontWeight: '700',
                                                color: activeSpeaker === user.username ? '#dee0fc' : '#fff',
                                                textAlign: 'center',
                                                textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)',
                                                letterSpacing: '0.3px',
                                            }}>
                                                {user.username}
                                            </div>

                                            {/* Status badges */}
                                            <div style={{
                                                display: 'flex',
                                                gap: '12px',
                                                fontSize: '22px',
                                                marginTop: '4px',
                                            }}>
                                                {user.isMuted && (
                                                    <span
                                                        title="Mikrofon Kapalı"
                                                        style={{
                                                            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))',
                                                        }}
                                                    >
                                                        🔇
                                                    </span>
                                                )}
                                                {user.isDeafened && (
                                                    <span
                                                        title="Kulaklık Kapalı"
                                                        style={{
                                                            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))',
                                                        }}
                                                    >
                                                        🔈
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            );
                        }

                        // Sadece kameralar varsa normal grid
                        return (
                            <div style={{
                                flex: 1,
                                display: 'grid',
                                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                                gridTemplateRows: `repeat(${rows}, 1fr)`,
                                gap: '16px',
                                // 🔥 FIX: Responsive sizing
                                minHeight: '400px',
                                height: '100%',
                            }}>
                                {combinedUsers.map(user => {
                                    const cameraStream = allStreams[`${user.username}_camera`] || (user.isLocal ? null : allStreams[user.username]);
                                    return (
                                        <UserVideoCard
                                            key={`${user.username}_camera`}
                                            user={{
                                                ...user,
                                                streamType: 'camera',
                                                volume: remoteVolumes[user.username] || 100,
                                                onVolumeChange: (vol) => setRemoteVolume(user.username, vol)
                                            }}
                                            stream={cameraStream}
                                            isActive={activeSpeaker === user.username}
                                            isPinned={pinnedUser === user.username}
                                            onExpand={() => setExpandedUser({ ...user, streamType: 'camera' })}
                                            onPin={() => setPinnedUser(pinnedUser === user.username ? null : user.username)}
                                            onContextMenu={(data) => setContextMenu(data)}
                                            badge={renderStreamBadge({ ...user, streamType: 'camera' })}
                                            connectionQuality={connectionQuality[user.username]}
                                            getUserAvatar={getUserAvatar}
                                        />
                                    );
                                })}
                            </div>
                        );
                    }
                })()}
            </div>

            {/* 🔥 CONTROL BAR KALDIRILDI - Sol sidebar'da "Ses Bağlandı" bölümünden kontrol edilecek */}

            {/* 🔥 YENİ: ECHO WARNING */}
            {hasEchoRisk && showEchoWarning && (
                <div style={{
                    position: 'absolute',
                    bottom: '100px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, rgba(250, 166, 26, 0.95) 0%, rgba(237, 66, 69, 0.95) 100%)',
                    color: '#fff',
                    padding: '16px 24px',
                    borderRadius: '12px',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 8px 32px rgba(250, 166, 26, 0.6)',
                    animation: 'pulse 2s infinite',
                    maxWidth: '90%',
                }}>
                    <div style={{ fontSize: '24px' }}>⚠️</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Echo Tespit Edildi!</div>
                        <div style={{ fontSize: '13px', opacity: 0.9 }}>Kulaklık kullanmanız önerilir.</div>
                    </div>
                    <button
                        onClick={() => setShowEchoWarning(false)}
                        style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            border: 'none',
                            borderRadius: '6px',
                            color: '#fff',
                            padding: '6px 12px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: 'bold',
                        }}
                    >
                        Kapat
                    </button>
                </div>
            )}

            {/* SETTINGS MODAL - YENİ GELİŞMİŞ PANEL */}
            {isSettingsOpen && (
                <VoiceSettingsPanel
                    onClose={() => setIsSettingsOpen(false)}
                    channelId={roomName}
                />
            )}

            {/* 🆕 CONTEXT MENU */}
            {contextMenu && (
                <UserContextMenu
                    user={contextMenu.user}
                    position={contextMenu.position}
                    onClose={() => setContextMenu(null)}
                    onSendMessage={handleSendMessage}
                    onAddFriend={handleAddFriend}
                    onBlock={handleBlock}
                    onViewProfile={handleViewProfile}
                    onMuteUser={handleMuteUser}
                    onAdjustVolume={handleAdjustVolume}
                    currentUser={currentUser}
                    isInVoiceChat={true}
                />
            )}

            {/* PULSE ANIMATION */}
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>
        </div>
    );
};

// 🎴 USER VIDEO CARD COMPONENT - 🔥 PERFORMANS: React.memo ile optimize edildi
const UserVideoCard = React.memo(({
    user,
    stream,
    isActive,
    isPinned,
    onExpand,
    onPin,
    onContextMenu,
    compact = false,
    badge,
    connectionQuality, // 🔥 YENİ: Bağlantı kalitesi
    getUserAvatar // 🔥 YENİ: Avatar fonksiyonu prop olarak
}) => {
    const videoRef = useRef(null);
    const audioRef = useRef(null); // 🔥 YENİ: Audio ref eklendi
    const [showFullControls, setShowFullControls] = useState(false);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    // 🔥 YENİ: Audio stream'i ayrı yönet (video ile karışmasın)
    useEffect(() => {
        if (audioRef.current && stream && !user.isLocal) {
            const audioTracks = stream.getAudioTracks();
            if (audioTracks.length > 0) {
                audioRef.current.srcObject = new MediaStream(audioTracks);
                const volume = (user.volume || 100) / 100;
                audioRef.current.volume = Math.min(2.0, Math.max(0, volume));
            }
        }
    }, [stream, user.isLocal, user.username, user.volume]);

    const handleRightClick = useCallback((e) => {
        e.preventDefault();
        if (onContextMenu && user.username !== user.isLocal) {
            onContextMenu({
                user,
                position: { x: e.clientX, y: e.clientY }
            });
        }
    }, [onContextMenu, user]);

    const handleClick = useCallback((e) => {
        // Sol tık - profil/mesaj menüsünü aç
        if (!user.isLocal && onContextMenu) {
            onContextMenu({
                user,
                position: { x: e.clientX, y: e.clientY }
            });
        }
    }, [user, onContextMenu]);

    return (
        <div
            onContextMenu={handleRightClick} // 🆕 Sağ tık
            onClick={handleClick} // 🆕 Sol tık
            onMouseEnter={() => setShowFullControls(true)}
            onMouseLeave={() => setShowFullControls(false)}
            style={{
                background: 'linear-gradient(135deg, #2c2f33 0%, #23272a 100%)',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                border: isActive ? '3px solid #43b581' : isPinned ? '3px solid #5865f2' : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: isActive ? '0 0 20px rgba(67, 181, 129, 0.5)' : '0 4px 16px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s ease',
                cursor: user.isLocal ? 'default' : 'pointer',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}>
            {/* 🔥 YENİ: Audio Element (gizli ama ses çıkışı için gerekli) */}
            {!user.isLocal && stream && (
                <audio
                    ref={audioRef}
                    autoPlay
                    playsInline
                    data-username={user.username}
                    style={{ display: 'none' }}
                />
            )}

            {/* VIDEO FEED */}
            <div style={{
                width: '100%',
                height: '100%',
                background: '#1a1a1a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {badge}
                {stream && stream.active && stream.getVideoTracks().length > 0 ? (
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted={user.isLocal === true}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: user.streamType === 'screen' ? 'contain' : 'cover',
                            backgroundColor: user.streamType === 'screen' ? '#000' : '#1a1a1a',
                        }}
                    />
                ) : (
                    // 🔥 FIX: Kamera kapalıyken büyük avatar göster
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '16px',
                        background: 'linear-gradient(135deg, #36393f 0%, #2f3136 50%, #202225 100%)',
                        position: 'relative',
                    }}>
                        {/* Avatar Container with Talking Animation */}
                        <div style={{
                            position: 'relative',
                            padding: '8px',
                            borderRadius: '50%',
                            background: user.isTalking
                                ? 'linear-gradient(135deg, #43b581, #3ca374)'
                                : 'transparent',
                            boxShadow: user.isTalking
                                ? '0 0 20px rgba(67, 181, 129, 0.6), 0 0 40px rgba(67, 181, 129, 0.3)'
                                : 'none',
                            transition: 'all 0.3s ease',
                            animation: user.isTalking ? 'talkingPulse 1s ease-in-out infinite' : 'none',
                        }}>
                            <img
                                src={getUserAvatar(user.username)}
                                alt={user.username}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = getDeterministicAvatarFallback(user.username, 256);
                                }}
                                style={{
                                    width: '140px',
                                    height: '140px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    border: '5px solid #40444b',
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                                    display: 'block',
                                }}
                                loading="lazy"
                            />
                        </div>
                        {/* Username */}
                        <div style={{
                            color: '#fff',
                            fontSize: '18px',
                            fontWeight: 700,
                            textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)',
                            letterSpacing: '0.5px',
                        }}>
                            {user.username}
                        </div>
                        {/* Status */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 14px',
                            background: user.isMuted ? 'rgba(240, 71, 71, 0.2)' : 'rgba(67, 181, 129, 0.2)',
                            borderRadius: '16px',
                            border: user.isMuted ? '1px solid rgba(240, 71, 71, 0.4)' : '1px solid rgba(67, 181, 129, 0.4)',
                        }}>
                            <span style={{ fontSize: '16px' }}>{user.isMuted ? '🔇' : '🎤'}</span>
                            <span style={{
                                color: user.isMuted ? '#f04747' : '#43b581',
                                fontSize: '13px',
                                fontWeight: 600,
                            }}>
                                {user.isMuted ? 'Sessiz' : (user.isTalking ? 'Konuşuyor...' : 'Dinliyor')}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* USER INFO OVERLAY */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                zIndex: 10, // 🔥 FIX: Overlay üstte
            }}>
                {/* 🔥 YENİ: Talking Indicator Waves */}
                {user.isTalking && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                    }}>
                        <div style={{
                            width: '3px',
                            height: '12px',
                            background: '#43b581',
                            borderRadius: '2px',
                            animation: 'wave1 0.6s ease-in-out infinite',
                        }} />
                        <div style={{
                            width: '3px',
                            height: '16px',
                            background: '#43b581',
                            borderRadius: '2px',
                            animation: 'wave2 0.6s ease-in-out infinite 0.1s',
                        }} />
                        <div style={{
                            width: '3px',
                            height: '12px',
                            background: '#43b581',
                            borderRadius: '2px',
                            animation: 'wave3 0.6s ease-in-out infinite 0.2s',
                        }} />
                    </div>
                )}

                {/* 🔥 YENİ: Connection Quality Indicator */}
                {!user.isLocal && connectionQuality && (
                    <div
                        title={`RTT: ${connectionQuality.rtt}ms, Packet Loss: ${connectionQuality.packetLoss}%`}
                        style={{
                            fontSize: '16px',
                            filter: connectionQuality.quality === 'excellent' ? 'none' :
                                connectionQuality.quality === 'good' ? 'hue-rotate(30deg)' :
                                    'hue-rotate(90deg) saturate(2)',
                            opacity: 0.9,
                        }}
                    >
                        {connectionQuality.quality === 'excellent' ? '📶' :
                            connectionQuality.quality === 'good' ? '📶' :
                                '⚠️'}
                    </div>
                )}

                <span
                    onClick={(e) => {
                        e.stopPropagation();
                        if (!user.isLocal) {
                            // Profil açma
                            if (window.openUserProfile) {
                                window.openUserProfile(user.username);
                            } else {
                                window.location.hash = `#/profile/${user.username}`;
                            }
                        }
                    }}
                    style={{
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: 600,
                        flex: 1,
                        cursor: user.isLocal ? 'default' : 'pointer',
                        textDecoration: user.isLocal ? 'none' : 'underline',
                        textDecorationColor: 'rgba(255, 255, 255, 0.3)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}>
                    {user.username} {user.streamType === 'screen' && '🖥️ Ekran'}
                </span>

                {/* STATUS ICONS */}
                <div style={{ display: 'flex', gap: '6px' }}>
                    {user.isMuted && <span style={{ fontSize: '16px' }}>🔇</span>}
                    {user.streamType === 'camera' && user.isCameraOn && <span style={{ fontSize: '16px' }}>📹</span>}
                    {isActive && <span style={{ fontSize: '16px' }}>🔊</span>}
                </div>
            </div>

            {/* HOVER ACTIONS - Her zaman görünsün */}
            <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                display: 'flex',
                gap: '6px',
                opacity: 1, // 🔥 FIX: Her zaman görünür
                transition: 'opacity 0.2s',
                zIndex: 20, // 🔥 FIX: Butonlar en üstte
            }}>
                <ActionButton
                    icon={isPinned ? '📌' : '📍'}
                    onClick={(e) => {
                        e.stopPropagation();
                        onPin();
                    }}
                    title={isPinned ? 'Sabitlemeyi Kaldır' : 'Sabitle'}
                    bgColor="rgba(88, 101, 242, 0.9)"
                />
                <ActionButton
                    icon="⛶"
                    onClick={(e) => {
                        e.stopPropagation();
                        onExpand();
                    }}
                    title="Panelde Genişlet"
                    bgColor="rgba(67, 181, 129, 0.9)"
                />
                <ActionButton
                    icon="🖥️"
                    onClick={(e) => {
                        e.stopPropagation();
                        // 🔥 Tam ekran modunu aç
                        const videoElement = videoRef.current;
                        if (videoElement) {
                            const parentDiv = videoElement.parentElement?.parentElement;
                            const element = parentDiv || videoElement;
                            if (element.requestFullscreen) {
                                element.requestFullscreen();
                            } else if (element.webkitRequestFullscreen) {
                                element.webkitRequestFullscreen();
                            } else if (element.mozRequestFullScreen) {
                                element.mozRequestFullScreen();
                            } else if (element.msRequestFullscreen) {
                                element.msRequestFullscreen();
                            }
                        }
                    }}
                    title="Tam Ekran İzle"
                    bgColor="rgba(250, 166, 26, 0.9)"
                />

                {/* 🔥 YENİ: Volume Slider (sadece remote user için) */}
                {!user.isLocal && (
                    <div style={{
                        background: 'rgba(0, 0, 0, 0.85)',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        minWidth: '120px',
                    }}>
                        <span style={{ fontSize: '14px' }}>🔊</span>
                        <input
                            type="range"
                            min="0"
                            max="200"
                            value={user.volume || 100}
                            onChange={(e) => {
                                e.stopPropagation();
                                if (user.onVolumeChange) {
                                    user.onVolumeChange(parseInt(e.target.value));
                                }
                            }}
                            style={{
                                flex: 1,
                                cursor: 'pointer',
                            }}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <span style={{ fontSize: '11px', color: '#fff', minWidth: '35px' }}>
                            {user.volume || 100}%
                        </span>
                    </div>
                )}
            </div>

            <style>{`
                div:hover .hover-actions {
                    opacity: 1;
                }
            `}</style>
        </div>
    );
}, (prevProps, nextProps) => {
    // 🔥 PERFORMANS: Sadece bu prop'lar değişince re-render yap
    // isTalking gibi sık değişen prop'ları karşılaştırmıyoruz
    return (
        prevProps.user.username === nextProps.user.username &&
        prevProps.stream === nextProps.stream &&
        prevProps.user.isCameraOn === nextProps.user.isCameraOn &&
        prevProps.user.isScreenSharing === nextProps.user.isScreenSharing &&
        prevProps.user.isMuted === nextProps.user.isMuted &&
        prevProps.isActive === nextProps.isActive &&
        prevProps.isPinned === nextProps.isPinned &&
        prevProps.compact === nextProps.compact
    );
    // NOT: user.isTalking karşılaştırılmıyor → Her 150ms re-render olmasını engeller!
});

// 🎮 CONTROL BAR COMPONENT - Discord Style
const ControlBar = ({
    isMuted,
    isDeafened,
    isCameraOn,
    isScreenSharing,
    isSpatialAudio,
    isRecording,
    recordingDuration,
    onToggleMute,
    onToggleDeafened,
    onToggleCamera,
    onToggleScreenShare,
    onToggleSpatialAudio,
    onStartRecording,
    onStopRecording,
    onDownloadRecording,
    onLeave,
    onSettings
}) => {
    const formatDuration = (sec) => {
        const m = Math.floor(sec / 60).toString().padStart(2, '0');
        const s = Math.floor(sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <div style={{
            background: 'linear-gradient(180deg, rgba(32, 34, 37, 0.98) 0%, rgba(24, 25, 28, 1) 100%)',
            padding: '12px 20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.4)',
            flexShrink: 0, // 🔥 FIX: Asla küçülme - her zaman görünsün
            minHeight: '70px', // 🔥 FIX: Minimum yükseklik garantisi
            position: 'relative',
            zIndex: 100,
        }}>
            {/* Sol Grup: Ses Kontrolleri */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <VoiceControlBtn
                    icon={isMuted ? '🔇' : '🎤'}
                    active={!isMuted}
                    danger={isMuted}
                    onClick={onToggleMute}
                    title={isMuted ? 'Mikrofonu Aç' : 'Mikrofonu Kapat'}
                />
                <VoiceControlBtn
                    icon={isDeafened ? '🔈' : '🎧'}
                    active={!isDeafened}
                    danger={isDeafened}
                    onClick={onToggleDeafened}
                    title={isDeafened ? 'Kulaklığı Aç' : 'Kulaklığı Kapat'}
                />
            </div>

            {/* Orta Grup: Video/Ekran Kontrolleri */}
            <div style={{
                display: 'flex',
                gap: '8px',
                padding: '0 16px',
                borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
                <VoiceControlBtn
                    icon={isCameraOn ? '📹' : '📷'}
                    active={isCameraOn}
                    onClick={onToggleCamera}
                    title={isCameraOn ? 'Kamerayı Kapat' : 'Kamerayı Aç'}
                />
                <VoiceControlBtn
                    icon="🖥️"
                    active={isScreenSharing}
                    special={isScreenSharing}
                    onClick={onToggleScreenShare}
                    title={isScreenSharing ? 'Paylaşımı Durdur' : 'Ekran Paylaş'}
                />
                {onToggleSpatialAudio && (
                    <VoiceControlBtn
                        icon="🔊"
                        active={isSpatialAudio}
                        onClick={onToggleSpatialAudio}
                        title={isSpatialAudio ? '3D Ses (Açık)' : '3D Ses (Kapalı)'}
                        small
                    />
                )}
            </div>

            {/* Sağ Grup: Kayıt & Ayarlar */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {onStartRecording && onStopRecording && (
                    <VoiceControlBtn
                        icon={isRecording ? '⏹️' : '⏺️'}
                        active={isRecording}
                        danger={isRecording}
                        onClick={isRecording ? onStopRecording : onStartRecording}
                        title={isRecording ? `Kaydı Durdur (${formatDuration(recordingDuration)})` : 'Kayıt Başlat'}
                        label={isRecording ? formatDuration(recordingDuration) : null}
                    />
                )}
                {onSettings && (
                    <VoiceControlBtn
                        icon="⚙️"
                        onClick={onSettings}
                        title="Ayarlar"
                        subtle
                    />
                )}
            </div>

            {/* Ayrıl Butonu - Vurgulu */}
            <VoiceControlBtn
                icon="📞"
                danger
                onClick={onLeave}
                title="Ayrıl"
                isLeave
            />
        </div>
    );
};

// 🔘 VOICE CONTROL BUTTON - Modern Discord Style
const VoiceControlBtn = ({ icon, active, danger, special, subtle, small, isLeave, onClick, title, label }) => {
    const getBackground = () => {
        if (isLeave) return 'linear-gradient(135deg, #ed4245 0%, #c03537 100%)';
        if (danger && active) return 'rgba(240, 71, 71, 0.4)';
        if (danger) return 'rgba(240, 71, 71, 0.15)';
        if (special) return 'linear-gradient(135deg, #5865f2 0%, #4752c4 100%)';
        if (active) return 'rgba(67, 181, 129, 0.25)';
        if (subtle) return 'rgba(255, 255, 255, 0.05)';
        return 'rgba(255, 255, 255, 0.1)';
    };

    const getBorder = () => {
        if (isLeave) return 'none';
        if (danger && active) return '2px solid rgba(240, 71, 71, 0.6)';
        if (active) return '2px solid rgba(67, 181, 129, 0.5)';
        if (special) return '2px solid rgba(88, 101, 242, 0.5)';
        return '2px solid transparent';
    };

    return (
        <button
            onClick={onClick}
            title={title}
            style={{
                background: getBackground(),
                border: getBorder(),
                borderRadius: isLeave ? '50%' : '12px',
                width: isLeave ? '48px' : (small ? '40px' : '48px'),
                height: isLeave ? '48px' : (small ? '40px' : '48px'),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: small ? '16px' : '20px',
                color: '#fff',
                transition: 'all 0.2s ease',
                boxShadow: isLeave
                    ? '0 4px 15px rgba(237, 66, 69, 0.4)'
                    : (active ? '0 2px 10px rgba(67, 181, 129, 0.3)' : 'none'),
                transform: 'scale(1)',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = isLeave
                    ? '0 6px 20px rgba(237, 66, 69, 0.6)'
                    : '0 4px 15px rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = isLeave
                    ? '0 4px 15px rgba(237, 66, 69, 0.4)'
                    : (active ? '0 2px 10px rgba(67, 181, 129, 0.3)' : 'none');
            }}
        >
            <span>{icon}</span>
            {label && (
                <span style={{ fontSize: '9px', marginTop: '2px', fontWeight: 600 }}>{label}</span>
            )}
        </button>
    );
};

// 🔘 MINI BUTTON
const MiniButton = ({ icon, active, danger, onClick, title }) => {
    return (
        <button
            onClick={onClick}
            title={title}
            style={{
                background: active
                    ? 'rgba(88, 101, 242, 0.8)'
                    : danger
                        ? 'rgba(237, 66, 69, 0.8)'
                        : 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                borderRadius: '8px',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'all 0.2s ease',
            }}
        >
            {icon}
        </button>
    );
};

// 🔘 ACTION BUTTON
const ActionButton = ({ icon, onClick, title, bgColor = 'rgba(0, 0, 0, 0.7)' }) => {
    return (
        <button
            onClick={onClick}
            title={title}
            style={{
                background: bgColor,
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '8px',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#fff',
                fontWeight: 'bold',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
            }}
        >
            {icon}
        </button>
    );
};

// 📹 VIDEO FEED COMPONENT
const VideoFeed = ({ stream, fullscreen }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <video
            ref={videoRef}
            autoPlay
            playsInline
            muted={false}
            style={{
                width: '100%',
                height: '100%',
                objectFit: fullscreen ? 'contain' : 'cover',
                background: '#000',
            }}
        />
    );
};

// ⚙️ SETTINGS MODAL COMPONENT
const SettingsModal = ({
    audioSettings,
    vadSensitivity,
    isNoiseSuppressionEnabled,
    screenShareQuality,
    screenShareFPS,
    onClose,
    onSave,
    onVadChange,
    onNoiseToggle,
    onScreenQualityChange,
    onScreenFPSChange
}) => {
    const [settings, setSettings] = useState(audioSettings);
    const [tempVadSensitivity, setTempVadSensitivity] = useState(vadSensitivity);
    const [tempScreenQuality, setTempScreenQuality] = useState(screenShareQuality);
    const [tempScreenFPS, setTempScreenFPS] = useState(screenShareFPS);

    // 🔥 YENİ: Microphone Test
    const [micLevel, setMicLevel] = useState(0);
    const [isTesting, setIsTesting] = useState(false);
    const testStreamRef = React.useRef(null);
    const analyserRef = React.useRef(null);
    const animationRef = React.useRef(null);

    // 🔥 YENİ: Microphone Test Start/Stop
    React.useEffect(() => {
        if (!isTesting) {
            // Stop testing
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            if (testStreamRef.current) {
                testStreamRef.current.getTracks().forEach(track => track.stop());
                testStreamRef.current = null;
            }
            setMicLevel(0);
            return;
        }

        // Start testing
        (async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                testStreamRef.current = stream;

                const AudioContext = window.AudioContext || window.webkitAudioContext;
                const audioContext = new AudioContext();
                const analyser = audioContext.createAnalyser();
                analyser.fftSize = 256;
                analyser.smoothingTimeConstant = 0.8;
                analyserRef.current = analyser;

                const source = audioContext.createMediaStreamSource(stream);
                source.connect(analyser);

                const dataArray = new Uint8Array(analyser.frequencyBinCount);

                const updateLevel = () => {
                    analyser.getByteFrequencyData(dataArray);
                    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
                    setMicLevel(Math.min(100, average * 1.5)); // Scale to 0-100
                    animationRef.current = requestAnimationFrame(updateLevel);
                };

                updateLevel();
            } catch (err) {
                console.error('Mic test error:', err);
                setIsTesting(false);
            }
        })();

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            if (testStreamRef.current) {
                testStreamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, [isTesting]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '20px', // Ekrana yapışmasın
        }}>
            <div style={{
                background: 'linear-gradient(135deg, #2c2f33 0%, #23272a 100%)',
                borderRadius: '16px',
                maxWidth: '500px',
                width: '90%',
                maxHeight: '90vh', // Ekran yüksekliğinin %90'ı
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                overflow: 'hidden', // Taşma kontrolü
            }}>
                {/* Header - Sabit */}
                <div style={{
                    padding: '24px 32px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    flexShrink: 0, // Küçülmesin
                }}>
                    <h2 style={{
                        color: '#fff',
                        margin: 0,
                        fontSize: '24px',
                        fontWeight: 700,
                    }}>
                        ⚙️ Ses Ayarları
                    </h2>
                </div>

                {/* Content - Kaydırılabilir */}
                <div style={{
                    padding: '24px 32px',
                    overflowY: 'auto', // Dikey kaydırma
                    flex: 1, // Kalan alanı kaplasın
                }}>
                    {/* 🔥 YENİ: Microphone Test Panel */}
                    <div style={{
                        marginBottom: '20px',
                        padding: '16px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                        border: isTesting ? '2px solid #43b581' : '1px solid rgba(255,255,255,0.1)',
                    }}>
                        <div style={{ marginBottom: '12px', color: '#fff' }}>
                            <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>
                                🎤 Mikrofon Testi
                            </div>
                            <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)' }}>
                                Mikrofonunuzun çalışıp çalışmadığını test edin
                            </div>
                        </div>

                        <button
                            onClick={() => setIsTesting(!isTesting)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                background: isTesting ? '#43b581' : '#5865f2',
                                border: 'none',
                                borderRadius: '8px',
                                color: '#fff',
                                fontSize: '14px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                marginBottom: '12px',
                            }}
                        >
                            {isTesting ? '⏹️ Testi Durdur' : '▶️ Testi Başlat'}
                        </button>

                        {isTesting && (
                            <div>
                                <div style={{
                                    height: '8px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: '4px',
                                    overflow: 'hidden',
                                    marginBottom: '8px',
                                }}>
                                    <div style={{
                                        height: '100%',
                                        width: `${micLevel}%`,
                                        background: micLevel > 70 ? '#43b581' : micLevel > 40 ? '#faa61a' : '#ed4245',
                                        borderRadius: '4px',
                                        transition: 'width 0.1s ease',
                                    }} />
                                </div>
                                <div style={{
                                    fontSize: '12px',
                                    color: micLevel > 10 ? '#43b581' : '#ed4245',
                                    textAlign: 'center',
                                    fontWeight: 600,
                                }}>
                                    {micLevel > 10 ? '✅ Mikrofonunuz çalışıyor!' : '⚠️ Konuşun veya ses yapın'}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Echo Cancellation */}
                    <div style={{
                        marginBottom: '20px',
                        padding: '16px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                    }}>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            cursor: 'pointer',
                            color: '#fff',
                        }}>
                            <input
                                type="checkbox"
                                checked={settings.echoCancellation}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    echoCancellation: e.target.checked
                                })}
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    cursor: 'pointer',
                                }}
                            />
                            <div>
                                <div style={{ fontWeight: 600, fontSize: '16px' }}>
                                    🔊 Yankı Engelleme
                                </div>
                                <div style={{
                                    fontSize: '13px',
                                    color: 'rgba(255, 255, 255, 0.6)',
                                    marginTop: '4px',
                                }}>
                                    Hoparlörden gelen sesi mikrofona almaz
                                </div>
                            </div>
                        </label>
                    </div>

                    {/* Noise Suppression */}
                    <div style={{
                        marginBottom: '20px',
                        padding: '16px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                    }}>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            cursor: 'pointer',
                            color: '#fff',
                        }}>
                            <input
                                type="checkbox"
                                checked={isNoiseSuppressionEnabled}
                                onChange={() => onNoiseToggle && onNoiseToggle()}
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    cursor: 'pointer',
                                }}
                            />
                            <div>
                                <div style={{ fontWeight: 600, fontSize: '16px' }}>
                                    🎙️ Gürültü Engelleme
                                </div>
                                <div style={{
                                    fontSize: '13px',
                                    color: 'rgba(255, 255, 255, 0.6)',
                                    marginTop: '4px',
                                }}>
                                    Arka plan gürültüsünü azaltır (Klavye, fan vb.)
                                    <br />
                                    <span style={{ color: '#ff9800', fontWeight: 600 }}>
                                        ⚠️ Müzik paylaşırken kapatın!
                                    </span>
                                </div>
                            </div>
                        </label>
                    </div>

                    {/* 🔥 YENİ: Push-to-Talk Mode */}
                    <div style={{
                        marginBottom: '20px',
                        padding: '16px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                    }}>
                        <div style={{ marginBottom: '12px', color: '#fff' }}>
                            <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>
                                🎙️ Ses Modu
                            </div>
                            <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)' }}>
                                Voice Activity veya Push-to-Talk
                            </div>
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                            <select
                                value={audioSettings?.pttMode ? 'ptt' : 'voice'}
                                onChange={(e) => {
                                    const isPtt = e.target.value === 'ptt';
                                    setSettings({ ...settings, pttMode: isPtt });
                                    togglePTTMode && togglePTTMode();
                                }}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    background: '#2b2d31',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '8px',
                                    color: '#fff',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                }}
                            >
                                <option value="voice">🎤 Voice Activity (Otomatik)</option>
                                <option value="ptt">⌨️ Push-to-Talk (Tuşa basınca)</option>
                            </select>
                        </div>

                        {audioSettings?.pttMode && (
                            <div style={{ marginTop: '12px' }}>
                                <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
                                    ⌨️ PTT Tuşu:
                                </div>
                                <select
                                    value={audioSettings?.pttKey || 'Space'}
                                    onChange={(e) => {
                                        setSettings({ ...settings, pttKey: e.target.value });
                                        updatePTTKey && updatePTTKey(e.target.value);
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        background: '#2b2d31',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '8px',
                                        color: '#fff',
                                        fontSize: '13px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <option value="Space">Space (Boşluk)</option>
                                    <option value="ControlLeft">Ctrl (Sol)</option>
                                    <option value="ControlRight">Ctrl (Sağ)</option>
                                    <option value="ShiftLeft">Shift (Sol)</option>
                                    <option value="AltLeft">Alt (Sol)</option>
                                    <option value="KeyV">V</option>
                                    <option value="KeyC">C</option>
                                </select>
                                <div style={{ fontSize: '11px', color: '#43b581', marginTop: '6px', textAlign: 'center' }}>
                                    ℹ️ Tuşa basılı tutunca konuşursunuz
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 🔥 YENİ: VAD Sensitivity Slider */}
                    <div style={{
                        marginBottom: '20px',
                        padding: '16px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                    }}>
                        <div style={{ marginBottom: '12px', color: '#fff' }}>
                            <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>
                                🎚️ Mikrofon Hassasiyeti
                            </div>
                            <div style={{
                                fontSize: '13px',
                                color: 'rgba(255, 255, 255, 0.6)',
                            }}>
                                Konuşma algılama eşiği (Düşük = Hassas, Yüksek = Az Hassas)
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ color: '#fff', fontSize: '14px' }}>20</span>
                            <input
                                type="range"
                                min="20"
                                max="80"
                                value={tempVadSensitivity}
                                onChange={(e) => {
                                    setTempVadSensitivity(parseInt(e.target.value));
                                    onVadChange && onVadChange(parseInt(e.target.value));
                                }}
                                style={{
                                    flex: 1,
                                    height: '6px',
                                    borderRadius: '3px',
                                    outline: 'none',
                                    background: `linear-gradient(to right, #5865f2 0%, #5865f2 ${((tempVadSensitivity - 20) / 60) * 100}%, rgba(255,255,255,0.2) ${((tempVadSensitivity - 20) / 60) * 100}%, rgba(255,255,255,0.2) 100%)`,
                                    cursor: 'pointer'
                                }}
                            />
                            <span style={{ color: '#fff', fontSize: '14px' }}>80</span>
                            <span style={{
                                color: '#5865f2',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                minWidth: '40px',
                                textAlign: 'right'
                            }}>
                                {tempVadSensitivity}
                            </span>
                        </div>
                        <div style={{
                            marginTop: '8px',
                            fontSize: '12px',
                            color: tempVadSensitivity < 35
                                ? '#ff9800'
                                : tempVadSensitivity > 60
                                    ? '#ff9800'
                                    : '#43b581',
                            textAlign: 'center'
                        }}>
                            {tempVadSensitivity < 35
                                ? '⚠️ Çok hassas - False positive olabilir'
                                : tempVadSensitivity > 60
                                    ? '⚠️ Az hassas - Konuşma algılanmayabilir'
                                    : '✅ Optimal hassasiyet'}
                        </div>
                    </div>

                    {/* 🔥 YENİ: Screen Share Quality */}
                    <div style={{
                        marginBottom: '20px',
                        padding: '16px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                    }}>
                        <div style={{ marginBottom: '12px', color: '#fff' }}>
                            <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>
                                📺 Ekran Paylaşımı Kalitesi
                            </div>
                            <div style={{
                                fontSize: '13px',
                                color: 'rgba(255, 255, 255, 0.6)',
                            }}>
                                Yüksek kalite = Daha fazla bandwidth
                            </div>
                        </div>

                        {/* Quality Selector */}
                        <div style={{ marginBottom: '12px' }}>
                            <select
                                value={tempScreenQuality}
                                onChange={(e) => {
                                    setTempScreenQuality(e.target.value);
                                    onScreenQualityChange && onScreenQualityChange(e.target.value);
                                }}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    background: '#2b2d31',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '8px',
                                    color: '#fff',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                }}
                            >
                                <option value="720p">720p (HD) - Az bandwidth</option>
                                <option value="1080p">1080p (Full HD) - Önerilen ✅</option>
                                <option value="4K">4K (Ultra HD) - Çok bandwidth</option>
                            </select>
                        </div>

                        {/* FPS Slider */}
                        <div style={{ marginBottom: '8px', color: '#fff' }}>
                            <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '8px' }}>
                                🎬 FPS: {tempScreenFPS}
                            </div>
                            <input
                                type="range"
                                min="15"
                                max="60"
                                step="15"
                                value={tempScreenFPS}
                                onChange={(e) => {
                                    const v = parseInt(e.target.value);
                                    setTempScreenFPS(v);
                                    onScreenFPSChange && onScreenFPSChange(v);
                                }}
                                style={{
                                    width: '100%',
                                    cursor: 'pointer',
                                }}
                            />
                        </div>
                        <div style={{
                            fontSize: '12px',
                            color: tempScreenFPS === 30 ? '#43b581' : '#faa61a',
                            textAlign: 'center',
                        }}>
                            {tempScreenFPS === 30 ? '✅ Optimal (Önerilen)' : tempScreenFPS < 30 ? '⚠️ Düşük FPS' : '⚠️ Yüksek bandwidth'}
                        </div>

                        {/* 🔥 YENİ: System Audio Checkbox */}
                        <div style={{ marginTop: '12px' }}>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                cursor: 'pointer',
                                color: '#fff',
                                fontSize: '14px',
                            }}>
                                <input
                                    type="checkbox"
                                    checked={audioSettings?.includeSystemAudio || false}
                                    onChange={(e) => {
                                        setSettings({ ...settings, includeSystemAudio: e.target.checked });
                                        toggleSystemAudio && toggleSystemAudio(e.target.checked);
                                    }}
                                    style={{ cursor: 'pointer' }}
                                />
                                <span>🔊 Sistem sesini dahil et (Oyun/Video sesi)</span>
                            </label>
                        </div>
                    </div>

                    {/* Auto Gain Control */}
                    <div style={{
                        marginBottom: '32px',
                        padding: '16px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                    }}>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            cursor: 'pointer',
                            color: '#fff',
                        }}>
                            <input
                                type="checkbox"
                                checked={settings.autoGainControl}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    autoGainControl: e.target.checked
                                })}
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    cursor: 'pointer',
                                }}
                            />
                            <div>
                                <div style={{ fontWeight: 600, fontSize: '16px' }}>
                                    📊 Otomatik Ses Seviyesi
                                </div>
                                <div style={{
                                    fontSize: '13px',
                                    color: 'rgba(255, 255, 255, 0.6)',
                                    marginTop: '4px',
                                }}>
                                    Ses seviyesini otomatik ayarlar
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Footer - Sabit butonlar */}
                <div style={{
                    padding: '20px 32px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    flexShrink: 0,
                    display: 'flex',
                    gap: '12px',
                    justifyContent: 'flex-end',
                    background: 'rgba(0, 0, 0, 0.2)',
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '12px 24px',
                            color: '#fff',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 600,
                        }}
                    >
                        İptal
                    </button>
                    <button
                        onClick={() => onSave(settings)}
                        style={{
                            background: 'linear-gradient(135deg, #5865f2 0%, #4752c4 100%)',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '12px 24px',
                            color: '#fff',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 600,
                            boxShadow: '0 4px 16px rgba(88, 101, 242, 0.4)',
                        }}
                    >
                        Kaydet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(VoiceChatPanel);




