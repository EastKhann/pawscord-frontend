// frontend/src/VoiceChatPanel.js
// ðŸŽ¤ PROFESYONEL SESLÄ° SOHBET PANELÄ° - Discord/Zoom TarzÄ±

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useVoice } from './VoiceContext';
import { useAuth } from './AuthContext';
import useResponsive from './hooks/useResponsive'; // ðŸ”¥ RESPONSIVE
import UserContextMenu from './components/UserContextMenu';
import VoiceSettingsPanel from './components/VoiceSettingsPanel'; // ðŸ”¥ YENÄ°: GeliÅŸmiÅŸ Ses AyarlarÄ±
import toast from './utils/toast';
import { PRODUCTION_URL } from './utils/constants';

// Extracted Sub-Components
import UserVideoCard from './VoiceChatPanel/UserVideoCard';
import ControlBar from './VoiceChatPanel/ControlBar';
import VideoFeed from './VoiceChatPanel/VideoFeed';
import MinimizedView from './VoiceChatPanel/MinimizedView';
import useVoiceMonitoring from './VoiceChatPanel/useVoiceMonitoring';
import './VoiceChatPanel/voicePanelStyles';
import { getDeterministicAvatarFallback } from './VoiceChatPanel/avatarUtils';

// ðŸ”¥ YENÄ°: Avatar URL'sinden _100x100 thumbnail suffix'ini kaldÄ±r
const getFullResolutionAvatar = (avatarUrl) => {
    if (!avatarUrl) return null;
    // _100x100 veya benzeri thumbnail suffix'lerini kaldÄ±r
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
    getRealUserAvatar,  // ðŸ”¥ YENÄ°: GerÃ§ek avatar URL alÄ±cÄ±
    allUsers = [],      // ðŸ”¥ YENÄ°: TÃ¼m kullanÄ±cÄ± listesi
    currentUserProfile  // ðŸ”¥ YENÄ°: Mevcut kullanÄ±cÄ±nÄ±n profili
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

    // ðŸ”¥ ALIAS: isCameraOn = isVideoEnabled
    const isCameraOn = isVideoEnabled;

    // ðŸ”¥ FIX: Combine local and remote streams
    const { user: currentUser } = useAuth();
    const combinedUsers = React.useMemo(() => {
        const users = [...connectedUsers];
        // Kendi local stream'imi ekle (eÄŸer yoksa)
        if (currentUser && !users.some(u => u.username === currentUser.username)) {
            users.push({
                username: currentUser.username,
                isMuted: isMuted,
                isCameraOn: isCameraOn,
                isScreenSharing: isScreenSharing,
                isTalking: isTalking, // Burada kullan ama dependency'de deÄŸil
                isLocal: true // ðŸ”¥ Flag to identify local user
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
                    isTalking: isTalking, // Burada kullan ama dependency'de deÄŸil
                    isLocal: true
                };
            }
        }
        return users;
    }, [connectedUsers, currentUser, isMuted, isCameraOn, isScreenSharing]);
    // ðŸ”¥ PERFORMANS: isTalking Ã§Ä±karÄ±ldÄ±! Her 150ms re-render engellenecek

    // ðŸ”¥ YENÄ°: GerÃ§ek avatar alma fonksiyonu (TAM Ã‡Ã–ZÃœNÃœRLÃœKLÃœ)
    const getUserAvatar = useCallback((username) => {
        let avatarUrl = null;

        // 1. Ã–nce currentUserProfile kontrol et (kendi avatar'Ä±m)
        if (currentUserProfile && username === currentUser?.username) {
            // ðŸ”¥ FIX: avatar string olmalÄ±
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
            // ðŸ”¥ FIX: avatar string olmalÄ±
            if (userFromList?.avatar && typeof userFromList.avatar === 'string') {
                if (userFromList.avatar.startsWith('http') || userFromList.avatar.startsWith('blob:')) {
                    avatarUrl = userFromList.avatar;
                } else {
                    avatarUrl = `${PRODUCTION_URL}${userFromList.avatar.startsWith('/') ? '' : '/'}${userFromList.avatar}`;
                }
            }
        }

        // 4. Avatar bulunduysa, tam Ã§Ã¶zÃ¼nÃ¼rlÃ¼klÃ¼ versiyonu dÃ¶ndÃ¼r
        if (avatarUrl) {
            return getFullResolutionAvatar(avatarUrl);
        }

        // 5. Fallback: Deterministic avatar (yÃ¼ksek Ã§Ã¶zÃ¼nÃ¼rlÃ¼k)
        return getDeterministicAvatarFallback(username, 256);
    }, [currentUserProfile, currentUser, getRealUserAvatar, allUsers]);

    // ðŸ”¥ Separate camera and screen streams
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
    const [contextMenu, setContextMenu] = useState(null); // ðŸ†• User context menu
    const [volumeSettings, setVolumeSettings] = useState(() => {
        // ðŸ”¥ YENÄ°: localStorage'dan yÃ¼kle
        try {
            const saved = localStorage.getItem('pawscord_voice_volumes');
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    }); // ðŸ†• Per-user volume

    const [showEchoWarning, setShowEchoWarning] = useState(true);

    // Monitoring effects (extracted hook)
    const {
        connectionQuality, hasEchoRisk, networkQuality, networkType,
        autoQualityEnabled, setAutoQualityEnabled,
        volumeNormalization, setVolumeNormalization,
        talkingIndicators, activeSpeaker
    } = useVoiceMonitoring({
        isInVoice, localAudioStream, isMuted,
        startStatsMonitoring, stopStatsMonitoring,
        screenShareQuality, updateScreenQuality
    });


    // ðŸ”¥ YENÄ°: RoomList'teki ayar butonundan settings aÃ§ma
    useEffect(() => {
        const handleOpenSettings = () => {
            setIsSettingsOpen(true);
        };
        window.addEventListener('openVoiceSettings', handleOpenSettings);
        return () => window.removeEventListener('openVoiceSettings', handleOpenSettings);
    }, []);

    // ðŸ”¥ YENÄ°: Volume ayarlarÄ±nÄ± localStorage'a kaydet
    useEffect(() => {
        try {
            localStorage.setItem('pawscord_voice_volumes', JSON.stringify(volumeSettings));
        } catch (err) {
            console.warn('Failed to save volume settings:', err);
        }
    }, [volumeSettings]);

    // ðŸ”¥ RESPONSIVE HOOK
    // ðŸ”¥ RESPONSIVE HOOK
    const { isMobile } = useResponsive();

    // ðŸŽ¨ RENDER MODES (mobile iÃ§in Ã¶zel)
    const renderMode = expandedUser ? 'fullscreen' :
        isMinimized ? 'minimized' :
            isMobile ? 'mobile' : 'grid';

    useEffect(() => {
        if (!isInVoice) {
            onClose();
        }
    }, [isInVoice, onClose]);

    // ðŸŽ¯ VIDEO GRID LAYOUT (responsive)
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
        let count = combinedUsers.length; // Her kullanÄ±cÄ± iÃ§in kamera kartÄ±
        combinedUsers.forEach(user => {
            const baseKey = user.username;
            const hasScreenStream = allStreams[`${baseKey}_screen`];
            if (hasScreenStream && user.isScreenSharing) {
                count++; // Ekran paylaÅŸÄ±mÄ± varsa bir kart daha ekle
            }
        });
        return count;
    }, [combinedUsers, allStreams]);

    const userCount = combinedUsers.length;
    const { cols, rows } = getGridLayout(totalStreamCount);

    // ðŸ†• CONTEXT MENU HANDLERS
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
                toast.success(`âœ… ${targetUser.username} kullanÄ±cÄ±sÄ±na arkadaÅŸlÄ±k isteÄŸi gÃ¶nderildi!`);
            } else {
                toast.error('âŒ ArkadaÅŸlÄ±k isteÄŸi gÃ¶nderilemedi');
            }
        } catch (error) {
            console.error('Friend request error:', error);
            toast.error('âŒ Bir hata oluÅŸtu');
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
                toast.success(`âœ… ${targetUser.username} engellendi!`);
            } else {
                toast.error('âŒ Engelleme iÅŸlemi baÅŸarÄ±sÄ±z');
            }
        } catch (error) {
            console.error('Block error:', error);
            toast.error('âŒ Bir hata oluÅŸtu');
        }
    }, []);

    const handleViewProfile = useCallback((targetUser) => {
        setContextMenu(null);
        // ðŸ”¥ Profil panelini aÃ§
        if (window.openUserProfile) {
            window.openUserProfile(targetUser.username);
        } else {
            // Fallback - profil sayfasÄ±na git
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

        // ðŸ”¥ Ä°YÄ°LEÅžTÄ°RME: Audio element'e anÄ±nda uygula (GainNode ile >100% destek)
        const audioElements = document.querySelectorAll(`audio[data-username="${targetUser.username}"]`);
        audioElements.forEach(audio => {
            if (volume <= 100) {
                // Normal range â€” use native volume
                audio.volume = volume / 100;
                // Disconnect any existing GainNode
                if (audio._gainNode) {
                    try { audio._gainNode.gain.value = 1; } catch (e) { /* */ }
                }
            } else {
                // >100% â€” use Web Audio API GainNode for amplification
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

    // ðŸŽ¨ HELPER: Status Badges
    const renderStatusBadges = () => {
        const badges = [];
        if (isRecording) {
            badges.push(
                <span key="rec" style={{ background: 'rgba(237,66,69,0.2)', color: '#ed4245', border: '1px solid rgba(237,66,69,0.4)', padding: '4px 8px', borderRadius: '10px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    âºï¸ KayÄ±tta ({Math.floor(recordingDuration / 60).toString().padStart(2, '0')}:{Math.floor(recordingDuration % 60).toString().padStart(2, '0')})
                </span>
            );
        }
        if (isScreenSharing) {
            badges.push(
                <span key="ss" style={{ background: 'rgba(88,101,242,0.15)', color: '#8893ff', border: '1px solid rgba(88,101,242,0.35)', padding: '4px 8px', borderRadius: '10px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    ðŸ–¥ï¸ PaylaÅŸÄ±lÄ±yor {screenShareQuality} â€¢ {screenShareFPS}fps{includeSystemAudio ? ' â€¢ ðŸ”Š Sistem' : ''}
                </span>
            );
        }
        if (isPTTMode) {
            badges.push(
                <span key="ptt" style={{ background: 'rgba(250,166,26,0.18)', color: '#faa61a', border: '1px solid rgba(250,166,26,0.35)', padding: '4px 8px', borderRadius: '10px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    ðŸŽ™ï¸ PTT ({pttKey}) {isPTTActive ? 'â€¢ Aktif' : ''}
                </span>
            );
        }
        if (isReconnecting) {
            badges.push(
                <span key="reconnect" style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: '10px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    ðŸ”„ Yeniden baÄŸlanÄ±yor
                </span>
            );
        }
        return badges.length ? <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>{badges}</div> : null;
    };

    // ðŸŽ¨ HELPER: Stream Type Badge (Ekran/Kamera GÃ¶stergesi)
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
                    ðŸ–¥ï¸ <span style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>{user.username} - Ekran PaylaÅŸÄ±yor</span>
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
                    ðŸ“¹ Kamera
                </div>
            );
        }
        return null;
    };

    // 🎨 MINIMIZED VIEW (Küçük Ada - Discord Tarzı)
    if (renderMode === 'minimized') {
        return (
            <MinimizedView
                roomName={roomName}
                userCount={userCount}
                combinedUsers={combinedUsers}
                currentUser={currentUser}
                onToggleMinimize={onToggleMinimize}
                onContextMenu={(data) => setContextMenu(data)}
                getUserAvatar={getUserAvatar}
                isMuted={isMuted}
                isCameraOn={isCameraOn}
                isScreenSharing={isScreenSharing}
                toggleMute={toggleMute}
                toggleCamera={toggleCamera}
                toggleScreenShare={toggleScreenShare}
                leaveVoice={leaveVoice}
            />
        );
    }

    // ðŸŽ¨ FULLSCREEN VIEW (Bir kullanÄ±cÄ± geniÅŸletildi)
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
                        â¬…ï¸ Geri
                    </button>
                    <h3 style={{ color: '#fff', margin: 0, flex: 1 }}>
                        ðŸ‘¤ {expandedUser.username} {expandedUser.streamType === 'screen' && 'ðŸ–¥ï¸ Ekran PaylaÅŸÄ±mÄ±'}
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
                    isDeafened={isDeafened} // ðŸ”¥ YENÄ°
                    isCameraOn={isCameraOn}
                    isScreenSharing={isScreenSharing}
                    isSpatialAudio={isSpatialAudioEnabled}
                    isRecording={isRecording}
                    recordingDuration={recordingDuration}
                    onToggleMute={toggleMute}
                    onToggleDeafened={toggleDeafened} // ðŸ”¥ YENÄ°
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

    // ðŸŽ¨ GRID VIEW (Ana GÃ¶rÃ¼nÃ¼m)
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
                    ðŸŽ™ï¸ {roomName}
                    {renderStatusBadges()}
                    {/* ðŸ”¥ YENÄ°: Network Quality Badge */}
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
                            âš ï¸ ZayÄ±f BaÄŸlantÄ±
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
                            ðŸ“¶ {networkType.toUpperCase()}
                        </div>
                    )}
                </h2>
                <div style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '14px',
                }}>
                    ðŸ‘¥ {userCount} kiÅŸi
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
                    â¬‡ï¸ KÃ¼Ã§Ã¼lt
                </button>
            </div>

            {/* VIDEO GRID */}
            <div style={{
                flex: 1,
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'auto', // ðŸ”¥ FIX: auto olsun ki scroll yapÄ±labilsin
                position: 'relative',
                minHeight: 0, // ðŸ”¥ FIX: Flex child overflow iÃ§in gerekli
            }}>
                {/* Ana ekran paylaÅŸÄ±mlarÄ± varsa bÃ¼yÃ¼k gÃ¶ster */}
                {(() => {
                    const screenShares = combinedUsers.filter(u => u.isScreenSharing && allStreams[`${u.username}_screen`]);
                    const hasScreenShares = screenShares.length > 0;

                    if (hasScreenShares) {
                        // ðŸ”¥ FIX: TÃ¼m kullanÄ±cÄ±larÄ± tek grid'de gÃ¶ster (ekran + kamera karÄ±ÅŸÄ±k)
                        const allItems = [];

                        // Ã–nce ekran paylaÅŸÄ±mlarÄ±nÄ± ekle
                        screenShares.forEach(user => {
                            const screenStream = allStreams[`${user.username}_screen`];
                            if (screenStream) { // ðŸ”¥ Stream varsa ekle
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

                        // Sonra kameralarÄ± ekle (sadece aktif stream'ler veya kendim)
                        combinedUsers.forEach(user => {
                            const cameraStream = allStreams[`${user.username}_camera`] || allStreams[user.username];

                            // ðŸ”¥ CRITICAL: Stream varsa VEYA kendim isem gÃ¶ster
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
                                                isTalking: talkingIndicators[user.username] || false, // ðŸ”¥ YENÄ°
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

                        // Grid layout hesapla - Daha iyi daÄŸÄ±lÄ±m
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
                                position: 'relative', // ðŸ”¥ FIX: Parent relative olmalÄ±
                            }}>
                                {allItems.map((item, index) => (
                                    <div
                                        key={item.key}
                                        style={{
                                            position: 'relative', // ðŸ”¥ FIX: Her cell relative
                                            width: '100%',
                                            height: '100%',
                                            overflow: 'hidden', // ðŸ”¥ FIX: TaÅŸmayÄ± Ã¶nle
                                            zIndex: 1, // ðŸ”¥ FIX: Base z-index
                                            isolation: 'isolate', // ðŸ”¥ FIX: Z-index context izolasyonu
                                        }}
                                    >
                                        {item.component}
                                    </div>
                                ))}
                            </div>
                        );
                    } else {
                        // ðŸ”¥ YENÄ°: HiÃ§ stream yoksa profil fotoÄŸraflarÄ±nÄ± gÃ¶ster
                        const hasAnyActiveStream = combinedUsers.some(u => {
                            const cameraStream = allStreams[`${u.username}_camera`] || allStreams[u.username];
                            return cameraStream && cameraStream.active;
                        });

                        if (!hasAnyActiveStream) {
                            // Profil kartlarÄ± gÃ¶ster
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
                                                        title="Mikrofon KapalÄ±"
                                                        style={{
                                                            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))',
                                                        }}
                                                    >
                                                        ðŸ”‡
                                                    </span>
                                                )}
                                                {user.isDeafened && (
                                                    <span
                                                        title="KulaklÄ±k KapalÄ±"
                                                        style={{
                                                            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))',
                                                        }}
                                                    >
                                                        ðŸ”ˆ
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
                                // ðŸ”¥ FIX: Responsive sizing
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

            {/* ðŸ”¥ CONTROL BAR KALDIRILDI - Sol sidebar'da "Ses BaÄŸlandÄ±" bÃ¶lÃ¼mÃ¼nden kontrol edilecek */}

            {/* ðŸ”¥ YENÄ°: ECHO WARNING */}
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
                    <div style={{ fontSize: '24px', animation: 'pulse 1.5s infinite' }}>âš ï¸</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '15px' }}>Echo Tespit Edildi!</div>
                        <div style={{ fontSize: '13px', opacity: 0.9 }}>KulaklÄ±k kullanmanÄ±z Ã¶nerilir. HoparlÃ¶r kullanÄ±mÄ± echo'ya neden olur.</div>
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

            {/* SETTINGS MODAL - YENÄ° GELÄ°ÅžMÄ°Åž PANEL */}
            {isSettingsOpen && (
                <VoiceSettingsPanel
                    onClose={() => setIsSettingsOpen(false)}
                    channelId={roomName}
                />
            )}

            {/* ðŸ†• CONTEXT MENU */}
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
        </div>
    );
};

// ðŸŽ® CONTROL BAR COMPONENT - Discord Style

// ðŸ”˜ VOICE CONTROL BUTTON - Modern Discord Style

// ðŸ”˜ MINI BUTTON

// ðŸ”˜ ACTION BUTTON

// ðŸ“¹ VIDEO FEED COMPONENT

// âš™ï¸ SETTINGS MODAL COMPONENT

export default React.memo(VoiceChatPanel);





