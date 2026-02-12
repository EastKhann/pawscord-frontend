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
import { PRODUCTION_URL } from './utils/constants';

// Extracted Sub-Components
import UserVideoCard from './VoiceChatPanel/UserVideoCard';
import ControlBar from './VoiceChatPanel/ControlBar';
import VoiceControlBtn from './VoiceChatPanel/VoiceControlBtn';
import MiniButton from './VoiceChatPanel/MiniButton';
import ActionButton from './VoiceChatPanel/ActionButton';
import VideoFeed from './VoiceChatPanel/VideoFeed';
import SettingsModal from './VoiceChatPanel/SettingsModal';

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
                    avatarUrl = `${PRODUCTION_URL}${currentUserProfile.avatar.startsWith('/') ? '' : '/'}${currentUserProfile.avatar}`;
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
                    avatarUrl = `${PRODUCTION_URL}${userFromList.avatar.startsWith('/') ? '' : '/'}${userFromList.avatar}`;
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
                    updateScreenQuality('720p');
                } else if (quality === 'excellent' && screenShareQuality === '720p') {
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
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
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
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
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
        const volume = Math.max(0, Math.min(200, newVolume)); // 0-200% range

        setVolumeSettings(prev => ({
            ...prev,
            [targetUser.username]: {
                ...prev[targetUser.username],
                volume: volume
            }
        }));

        // 🔥 İYİLEŞTİRME: Audio element'e anında uygula (GainNode ile >100% destek)
        const audioElements = document.querySelectorAll(`audio[data-username="${targetUser.username}"]`);
        audioElements.forEach(audio => {
            if (volume <= 100) {
                // Normal range — use native volume
                audio.volume = volume / 100;
                // Disconnect any existing GainNode
                if (audio._gainNode) {
                    try { audio._gainNode.gain.value = 1; } catch (e) { /* */ }
                }
            } else {
                // >100% — use Web Audio API GainNode for amplification
                audio.volume = 1.0; // Max native volume
                try {
                    if (!audio._audioContext) {
                        audio._audioContext = new (window.AudioContext || window.webkitAudioContext)();
                        audio._sourceNode = audio._audioContext.createMediaElementSource(audio);
                        audio._gainNode = audio._audioContext.createGain();
                        audio._sourceNode.connect(audio._gainNode);
                        audio._gainNode.connect(audio._audioContext.destination);
                    }
                    audio._gainNode.gain.value = volume / 100; // e.g., 1.5 for 150%, 2.0 for 200%
                } catch (e) {
                    console.warn('[Volume] GainNode amplification failed:', e);
                }
            }
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
                        background: 'linear-gradient(135deg, #1e2124 0%, #2c2f33 50%, #23272a 100%)',
                        borderRadius: '16px',
                        padding: '16px',
                        boxShadow: '0 12px 48px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(88, 101, 242, 0.15)',
                        border: '1px solid rgba(88, 101, 242, 0.1)',
                        minWidth: '320px',
                        maxWidth: '400px',
                        backdropFilter: 'blur(12px)',
                        animation: 'slideIn 0.3s ease',
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
                                <img
                                    src={getUserAvatar(user.username)}
                                    alt={user.username}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = getDeterministicAvatarFallback(user.username, 64);
                                    }}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: user.isTalking
                                            ? '2px solid #43b581'
                                            : '2px solid rgba(255, 255, 255, 0.15)',
                                        boxShadow: user.isTalking
                                            ? '0 0 10px rgba(67, 181, 129, 0.5)'
                                            : 'none',
                                        transition: 'all 0.3s ease',
                                    }}
                                />
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
                    fontSize: '17px',
                    fontWeight: 700,
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    letterSpacing: '0.3px',
                }}>
                    🎙️ {roomName}
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
                                                animation: 'slideIn 0.4s ease forwards',
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
                    <div style={{ fontSize: '24px', animation: 'pulse 1.5s infinite' }}>⚠️</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '15px' }}>Echo Tespit Edildi!</div>
                        <div style={{ fontSize: '13px', opacity: 0.9 }}>Kulaklık kullanmanız önerilir. Hoparlör kullanımı echo'ya neden olur.</div>
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

            {/* 🎨 COMPREHENSIVE ANIMATIONS */}
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                @keyframes talkingPulse {
                    0%, 100% { 
                        box-shadow: 0 0 0 0 rgba(67, 181, 129, 0.4);
                        transform: scale(1);
                    }
                    50% { 
                        box-shadow: 0 0 0 8px rgba(67, 181, 129, 0);
                        transform: scale(1.03);
                    }
                }
                @keyframes wave1 {
                    0%, 100% { height: 8px; }
                    50% { height: 16px; }
                }
                @keyframes wave2 {
                    0%, 100% { height: 12px; }
                    50% { height: 20px; }
                }
                @keyframes wave3 {
                    0%, 100% { height: 8px; }
                    50% { height: 14px; }
                }
                @keyframes badgePulse {
                    0%, 100% { 
                        box-shadow: 0 4px 16px rgba(88, 101, 242, 0.6), 0 0 0 2px rgba(255, 255, 255, 0.2);
                    }
                    50% { 
                        box-shadow: 0 4px 24px rgba(88, 101, 242, 0.8), 0 0 0 3px rgba(255, 255, 255, 0.3);
                    }
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(10px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes connectionGlow {
                    0%, 100% { box-shadow: 0 0 12px rgba(67, 181, 129, 0.3); }
                    50% { box-shadow: 0 0 20px rgba(67, 181, 129, 0.6); }
                }
                @keyframes screenShareGlow {
                    0%, 100% { border-color: rgba(88, 101, 242, 0.5); }
                    50% { border-color: rgba(88, 101, 242, 0.9); }
                }
                
                /* Smooth grid transitions */
                .voice-grid-item {
                    animation: slideIn 0.3s ease forwards;
                }
                
                /* Video card hover effects */
                .voice-video-card:hover {
                    transform: scale(1.01);
                    z-index: 10;
                }
                
                /* Active speaker highlight */
                .voice-active-speaker {
                    animation: connectionGlow 2s ease-in-out infinite;
                }
                
                /* Screen share border animation */
                .voice-screen-share {
                    animation: screenShareGlow 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

// 🎴 USER VIDEO CARD COMPONENT - 🔥 PERFORMANS: React.memo ile optimize edildi

// 🎮 CONTROL BAR COMPONENT - Discord Style

// 🔘 VOICE CONTROL BUTTON - Modern Discord Style

// 🔘 MINI BUTTON

// 🔘 ACTION BUTTON

// 📹 VIDEO FEED COMPONENT

// ⚙️ SETTINGS MODAL COMPONENT

export default React.memo(VoiceChatPanel);




