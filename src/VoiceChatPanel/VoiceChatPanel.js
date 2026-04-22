// frontend/src/VoiceChatPanel.js
// 🎤 PROFESYONEL SESLİ SOHBET PANELİ - Discord/Zoom Tarzı

import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useVoice } from '../VoiceContext';
import { useAuth } from '../AuthContext';
import useResponsive from '../hooks/useResponsive'; // 🔥 RESPONSIVE
import VoiceSettingsPanel from '../components/media/VoiceSettingsPanel'; // 🔥 YENİ: Gelişmiş Voice Settings

// Extracted Sub-Components
import MinimizedView from './MinimizedView';
import useVoiceMonitoring from './useVoiceMonitoring';
import useVoiceChatState from './useVoiceChatState';
import FullscreenView from './FullscreenView';
import GridView from './GridView';
import ProfileCardGrid from './ProfileCardGrid';
import VoiceHeader from './VoiceHeader';
import ControlBar from './ControlBar';
import EchoWarning from './EchoWarning';
import logger from '../utils/logger';
import './voicePanelStyles';

// -- extracted inline style constants --

/* ── Sesli sohbet frame sağ-tık menüsü (Add Friend YOK) ───────────── */
const VoiceFrameMenu = ({ menu, currentUsername, remoteVolumes, setRemoteVolume, onClose }) => {
    const { t } = useTranslation();
    const menuRef = useRef(null);
    const [pos, setPos] = useState({ left: -9999, top: -9999 });
    const x = menu?.position?.x ?? menu?.x ?? 0;
    const y = menu?.position?.y ?? menu?.y ?? 0;
    const user = menu?.user;

    useEffect(() => {
        if (!menu || !menuRef.current) return;
        const pad = 10;
        const rect = menuRef.current.getBoundingClientRect();
        let left = x;
        let top = y;
        if (left + rect.width > window.innerWidth - pad)
            left = window.innerWidth - rect.width - pad;
        if (top + rect.height > window.innerHeight - pad)
            top = window.innerHeight - rect.height - pad;
        setPos({ left: Math.max(pad, left), top: Math.max(pad, top) });
    }, [menu, x, y]);

    useEffect(() => {
        if (!menu) return;
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) onClose();
        };
        window.addEventListener('mousedown', handler);
        return () => window.removeEventListener('mousedown', handler);
    }, [menu, onClose]);

    if (!menu || !user) return null;

    const isSelf = user.username === currentUsername;
    const vol = remoteVolumes?.[user.username] ?? 100;

    const menuItem = (icon, label, onClick, danger) => (
        <div
            role="button"
            tabIndex={0}
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                margin: '1px 4px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                color: danger ? '#f23f42' : '#dbdee1',
                transition: 'background 0.1s',
            }}
            onMouseEnter={(e) =>
            (e.currentTarget.style.background = danger
                ? 'rgba(237,66,69,0.15)'
                : 'rgba(88,101,242,0.15)')
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <span>{icon}</span>
            <span>{label}</span>
        </div>
    );

    return ReactDOM.createPortal(
        <div
            ref={menuRef}
            role="button"
            tabIndex={0}
            onClick={(e) => e.stopPropagation()}
            style={{
                position: 'fixed',
                left: pos.left,
                top: pos.top,
                zIndex: 2147483647,
                backgroundColor: 'rgba(30, 31, 35, 0.92)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px',
                boxShadow: '0 12px 32px rgba(0,0,0,0.7)',
                minWidth: '220px',
                maxWidth: '260px',
                animation: 'contextMenuIn 0.12s ease-out',
            }}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            {/* Title */}
            <div>
                <div>{user.username}</div>
                {isSelf && <div>{t('voice.you', 'Sensin')}</div>}
            </div>

            {/* Ses seviyesi slider (başkasıysa) */}
            {!isSelf && setRemoteVolume && (
                <div>
                    <div>
                        <span>🔊 {t('voice.volumeLevel', 'Ses Seviyesi')}</span>
                        <span
                            style={{
                                fontSize: '12px',
                                fontWeight: '700',
                                color: vol > 100 ? '#5865f2' : '#fff',
                                background: 'rgba(255,255,255,0.1)',
                                padding: '1px 7px',
                                borderRadius: '10px',
                            }}
                        >
                            {vol}%
                        </span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="200"
                        value={vol}
                        onChange={(e) => setRemoteVolume(user.username, parseInt(e.target.value))}
                        className="voice-volume-slider"
                    />
                </div>
            )}

            {/* Eylemler */}
            <div>
                {menuItem('👤', t('voice.viewProfile', 'Profili Görüntüle'), () => {
                    window.location.hash = `#/profile/${user.username}`;
                    onClose();
                })}
                {!isSelf &&
                    menuItem('💬', t('voice.sendDM', 'Özel Mesaj Gönder'), () => {
                        window.location.hash = `#/dm/${user.username}`;
                        onClose();
                    })}
                {!isSelf &&
                    menuItem('🔕', t('voice.muteForMe', 'Benim İçin Sessize Al'), () => {
                        if (setRemoteVolume) setRemoteVolume(user.username, 0);
                        onClose();
                    })}
            </div>
        </div>,
        document.getElementById('portal-root') || document.body
    );
};

const VoiceChatPanel = ({
    roomName,
    onClose,
    isMinimized,
    onToggleMinimize,
    showHeader = true, // When embedded in voice view page, hide header to avoid duplicate
    getRealUserAvatar, // 🔥 YENİ: Gerçek avatar URL alıcı
    allUsers = [], // 🔥 YENİ: Tüm kullanıcı listsi
    currentUserProfile, // 🔥 YENİ: Mevcut kullanıcının profilei
}) => {
    const { t } = useTranslation();
    const {
        isInVoice,
        isMuted,
        isDeafened,
        isVideoEnabled,
        isScreenSharing,
        isSpatialAudioEnabled,
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
        startStatsMonitoring,
        stopStatsMonitoring,
        toggleMute,
        toggleDeafened,
        toggleCamera,
        toggleScreenShare,
        toggleSpatialAudio,
        updateScreenQuality,
        startRecording,
        stopRecording,
        leaveVoiceRoom: leaveVoice,
        localAudioStream,
        remoteStreams = {},
        remoteVolumes = {},
        setRemoteVolume,
        localCameraStream,
        localScreenStream,
        isTalking = false,
    } = useVoice();

    const isCameraOn = isVideoEnabled;

    const { user: currentUser } = useAuth();
    const { combinedUsers, getUserAvatar, allStreams } = useVoiceChatState({
        connectedUsers,
        currentUser,
        isMuted,
        isCameraOn,
        isScreenSharing,
        isTalking,
        currentUserProfile,
        getRealUserAvatar,
        allUsers,
        remoteStreams,
        localCameraStream,
        localScreenStream,
    });

    const [expandedUser, setExpandedUser] = useState(null); // Fullscreen mode
    const [pinnedUser, setPinnedUser] = useState(null); // Pinned user
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [contextMenu, setContextMenu] = useState(null); // 🆕 User context menu
    const [volumeSettings, setVolumeSettings] = useState(() => {
        // 🔥 YENİ: localStorage'dan upload
        try {
            const saved = localStorage.getItem('pawscord_voice_volumes');
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    }); // 🆕 Thu-user volume

    const [isLoading, setIsLoading] = useState(false);
    const [showEchoWarning, setShowEchoWarning] = useState(true);

    // Monitoring effects (extracted hook)
    const {
        connectionQuality,
        hasEchoRisk,
        networkQuality,
        networkType,
        talkingIndicators,
        activeSpeaker,
    } = useVoiceMonitoring({
        isInVoice,
        localAudioStream,
        isMuted,
        startStatsMonitoring,
        stopStatsMonitoring,
        screenShareQuality,
        updateScreenQuality,
    });

    // 🔥 YENİ: RoomList'teki ayar butonundan settings openma
    useEffect(() => {
        const handleOpenSettings = () => {
            setIsSettingsOpen(true);
        };
        window.addEventListener('openVoiceSettings', handleOpenSettings);
        return () => window.removeEventListener('openVoiceSettings', handleOpenSettings);
    }, []);

    // 🔥 YENİ: Volume settingsını localStorage'a save
    useEffect(() => {
        try {
            localStorage.setItem('pawscord_voice_volumes', JSON.stringify(volumeSettings));
        } catch (err) {
            logger.warn('Failed to save volume settings:', err);
        }
    }, [volumeSettings]);

    // 🔥 RESPONSIVE HOOK
    const { isMobile } = useResponsive();

    // 🎨 RENDER MODES (mobile for özel)
    const renderMode = expandedUser
        ? 'fullscreen'
        : isMinimized
            ? 'minimized'
            : isMobile
                ? 'mobile'
                : 'grid';

    useEffect(() => {
        if (!isInVoice) {
            onClose();
        }
    }, [isInVoice, onClose]);

    const userCount = combinedUsers.length;

    //  Stable callback refs (performance)
    const handleContextMenu = useCallback((data) => setContextMenu(data), []);
    const handleBackFromFullscreen = useCallback(() => setExpandedUser(null), []);
    const handleDismissEcho = useCallback(() => setShowEchoWarning(false), []);
    const handleCloseSettings = useCallback(() => setIsSettingsOpen(false), []);
    const handleCloseContextMenu = useCallback(() => setContextMenu(null), []);

    // 🎨 MINIMIZED VIEW (Kk Ada - Discord Tarzı)
    if (renderMode === 'minimized') {
        return (
            <MinimizedView
                roomName={roomName}
                userCount={userCount}
                combinedUsers={combinedUsers}
                currentUser={currentUser}
                onToggleMinimize={onToggleMinimize}
                onContextMenu={handleContextMenu}
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

    // 🎨 FULLSCREEN VIEW (Bir kullanıcı genişletildi)
    if (renderMode === 'fullscreen' && expandedUser) {
        return (
            <FullscreenView
                expandedUser={expandedUser}
                allStreams={allStreams}
                onBack={handleBackFromFullscreen}
                isMuted={isMuted}
                isDeafened={isDeafened}
                isCameraOn={isCameraOn}
                isScreenSharing={isScreenSharing}
                isSpatialAudioEnabled={isSpatialAudioEnabled}
                isRecording={isRecording}
                recordingDuration={recordingDuration}
                toggleMute={toggleMute}
                toggleDeafened={toggleDeafened}
                toggleCamera={toggleCamera}
                toggleScreenShare={toggleScreenShare}
                toggleSpatialAudio={toggleSpatialAudio}
                startRecording={startRecording}
                stopRecording={stopRecording}
                leaveVoice={leaveVoice}
            />
        );
    }

    // 🎨 GRID VIEW (Ana Görünüm)
    return (
        <div
            aria-label={t('aria.voicePanel', 'Voice Panel')}
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                background: 'linear-gradient(180deg, #1a1b1e 0%, #111214 50%, #0d0e10 100%)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* HEADER */}
            {showHeader && (
                <VoiceHeader
                    roomName={roomName}
                    userCount={userCount}
                    onToggleMinimize={onToggleMinimize}
                    isRecording={isRecording}
                    recordingDuration={recordingDuration}
                    isScreenSharing={isScreenSharing}
                    screenShareQuality={screenShareQuality}
                    screenShareFPS={screenShareFPS}
                    includeSystemAudio={includeSystemAudio}
                    isPTTMode={isPTTMode}
                    pttKey={pttKey}
                    isPTTActive={isPTTActive}
                    isReconnecting={isReconnecting}
                    networkQuality={networkQuality}
                    networkType={networkType}
                />
            )}

            {/* VIDEO GRID */}
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    overflow: 'hidden',
                    minHeight: 0,
                    padding: '12px',
                }}
            >
                {(() => {
                    const gridProps = {
                        combinedUsers,
                        allStreams,
                        remoteVolumes,
                        setRemoteVolume,
                        talkingIndicators,
                        activeSpeaker,
                        pinnedUser,
                        setPinnedUser,
                        setExpandedUser,
                        setContextMenu,
                        connectionQuality,
                        getUserAvatar,
                        isMobile,
                    };
                    const screenShares = combinedUsers.filter(
                        (u) => u.isScreenSharing && allStreams[`${u.username}_screen`]
                    );
                    if (screenShares.length > 0) {
                        return <GridView {...gridProps} screenShares={screenShares} />;
                    }
                    const hasAnyActiveStream = combinedUsers.some((u) => {
                        const cs = allStreams[`${u.username}_camera`] || allStreams[u.username];
                        return cs && cs.active;
                    });
                    if (!hasAnyActiveStream) {
                        return (
                            <ProfileCardGrid
                                combinedUsers={combinedUsers}
                                activeSpeaker={activeSpeaker}
                                getUserAvatar={getUserAvatar}
                                setContextMenu={setContextMenu}
                                connectionQuality={connectionQuality}
                                isMobile={isMobile}
                            />
                        );
                    }
                    return <GridView {...gridProps} />;
                })()}
            </div>

            {/* CONTROL BAR (mute / deafen / camera / settings) */}
            <ControlBar
                isMuted={isMuted}
                isDeafened={isDeafened}
                isCameraOn={isCameraOn}
                isScreenSharing={isScreenSharing}
                isSpatialAudio={isSpatialAudioEnabled}
                isRecording={isRecording}
                recordingDuration={recordingDuration}
                onToggleMute={toggleMute}
                onToggleDeafened={toggleDeafened}
                onToggleCamera={toggleCamera}
                onToggleScreenShare={toggleScreenShare}
                onToggleSpatialAudio={toggleSpatialAudio}
                onStartRecording={startRecording}
                onStopRecording={stopRecording}
                onLeave={leaveVoice}
                onSettings={() => setIsSettingsOpen(true)}
            />

            {/* ECHO WARNING */}
            {hasEchoRisk && showEchoWarning && <EchoWarning onDismiss={handleDismissEcho} />}

            {/* SETTINGS MODAL */}
            {isSettingsOpen && (
                <VoiceSettingsPanel onClose={handleCloseSettings} channelId={roomName} />
            )}

            {/* FRAME CONTEXT MENU (sağ tık — Add Friend yok) */}
            {contextMenu && (
                <VoiceFrameMenu
                    menu={contextMenu}
                    currentUsername={currentUser?.username}
                    remoteVolumes={remoteVolumes}
                    setRemoteVolume={setRemoteVolume}
                    onClose={handleCloseContextMenu}
                />
            )}
        </div>
    );
};

VoiceChatPanel.propTypes = {
    menu: PropTypes.object,
    currentUsername: PropTypes.string,
    remoteVolumes: PropTypes.array,
    setRemoteVolume: PropTypes.func,
    onClose: PropTypes.func,
};
export default React.memo(VoiceChatPanel);
