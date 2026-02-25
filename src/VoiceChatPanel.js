// frontend/src/VoiceChatPanel.js
// 🎤 PROFESYONEL SESLİ SOHBET PANELİ - Discord/Zoom Tarzı

import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useVoice } from './VoiceContext';
import { useAuth } from './AuthContext';
import useResponsive from './hooks/useResponsive'; // 🔥 RESPONSIVE
import VoiceSettingsPanel from './components/VoiceSettingsPanel'; // 🔥 YENİ: Gelişmiş Ses Ayarları

// Extracted Sub-Components
import MinimizedView from './VoiceChatPanel/MinimizedView';
import useVoiceMonitoring from './VoiceChatPanel/useVoiceMonitoring';
import useVoiceChatState from './VoiceChatPanel/useVoiceChatState';
import FullscreenView from './VoiceChatPanel/FullscreenView';
import GridView from './VoiceChatPanel/GridView';
import ProfileCardGrid from './VoiceChatPanel/ProfileCardGrid';
import VoiceHeader from './VoiceChatPanel/VoiceHeader';
import ControlBar from './VoiceChatPanel/ControlBar';
import EchoWarning from './VoiceChatPanel/EchoWarning';
import './VoiceChatPanel/voicePanelStyles';

/* ── Sesli sohbet frame sağ-tık menüsü (Add Friend YOK) ───────────── */
const VoiceFrameMenu = ({ menu, currentUsername, remoteVolumes, setRemoteVolume, onClose }) => {
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
        if (left + rect.width > window.innerWidth - pad) left = window.innerWidth - rect.width - pad;
        if (top + rect.height > window.innerHeight - pad) top = window.innerHeight - rect.height - pad;
        setPos({ left: Math.max(pad, left), top: Math.max(pad, top) });
    }, [menu, x, y]);

    useEffect(() => {
        if (!menu) return;
        const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) onClose(); };
        window.addEventListener('mousedown', handler);
        return () => window.removeEventListener('mousedown', handler);
    }, [menu, onClose]);

    if (!menu || !user) return null;

    const isSelf = user.username === currentUsername;
    const vol = remoteVolumes?.[user.username] ?? 100;

    const menuItem = (icon, label, onClick, danger) => (
        <div onClick={onClick} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '8px 14px', margin: '1px 4px', borderRadius: '4px',
            cursor: 'pointer', fontSize: '13px', color: danger ? '#ed4245' : '#dcddde',
            transition: 'background 0.1s',
        }}
            onMouseEnter={e => e.currentTarget.style.background = danger ? 'rgba(237,66,69,0.15)' : 'rgba(88,101,242,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
            <span style={{ fontSize: '15px', opacity: 0.75 }}>{icon}</span>
            <span>{label}</span>
        </div>
    );

    return ReactDOM.createPortal(
        <div ref={menuRef} onClick={e => e.stopPropagation()} style={{
            position: 'fixed', left: pos.left, top: pos.top, zIndex: 2147483647,
            backgroundColor: '#111214', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '8px', boxShadow: '0 12px 32px rgba(0,0,0,0.7)',
            minWidth: '220px', maxWidth: '260px',
            animation: 'contextMenuIn 0.12s ease-out',
        }}>
            {/* Başlık */}
            <div style={{ padding: '10px 14px', background: '#1a1b1e', borderBottom: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px 8px 0 0' }}>
                <div style={{ fontWeight: '600', fontSize: '14px', color: '#fff' }}>{user.username}</div>
                {isSelf && <div style={{ fontSize: '11px', color: '#b9bbbe', marginTop: '2px' }}>Sensin</div>}
            </div>

            {/* Ses seviyesi slider (başkasıysa) */}
            {!isSelf && setRemoteVolume && (
                <div style={{ padding: '10px 14px 12px', background: '#16171a', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '11px', color: '#8e9297', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>🔊 Ses Seviyesi</span>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: vol > 100 ? '#5865f2' : '#fff', background: 'rgba(255,255,255,0.1)', padding: '1px 7px', borderRadius: '10px' }}>{vol}%</span>
                    </div>
                    <input type="range" min="0" max="200" value={vol}
                        onChange={e => setRemoteVolume(user.username, parseInt(e.target.value))}
                        className="voice-volume-slider"
                        style={{ width: '100%', cursor: 'pointer', accentColor: '#5865f2' }}
                    />
                </div>
            )}

            {/* Eylemler */}
            <div style={{ padding: '4px 0 6px' }}>
                {menuItem('👤', 'Profili Görüntüle', () => { window.location.hash = `#/profile/${user.username}`; onClose(); })}
                {!isSelf && menuItem('💬', 'Özelden Mesaj At', () => { window.location.hash = `#/dm/${user.username}`; onClose(); })}
                {!isSelf && menuItem('🔕', 'Benim İçin Sessize Al', () => { if (setRemoteVolume) setRemoteVolume(user.username, 0); onClose(); })}
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
    showHeader = true,  // When embedded in voice view page, hide header to avoid duplicate
    getRealUserAvatar,  // 🔥 YENİ: Gerçek avatar URL alıcı
    allUsers = [],      // 🔥 YENİ: Tüm kullanıcı listesi
    currentUserProfile  // 🔥 YENİ: Mevcut kullanıcının profili
}) => {
    const {
        isInVoice, isMuted, isDeafened, isVideoEnabled, isScreenSharing,
        isSpatialAudioEnabled, screenShareQuality, screenShareFPS,
        isRecording, recordingDuration, isPTTMode, isPTTActive, pttKey,
        includeSystemAudio, connectedUsers = [], isReconnecting = false,
        startStatsMonitoring, stopStatsMonitoring,
        toggleMute, toggleDeafened, toggleCamera, toggleScreenShare,
        toggleSpatialAudio, updateScreenQuality,
        startRecording, stopRecording,
        leaveVoiceRoom: leaveVoice,
        localAudioStream, remoteStreams = {}, remoteVolumes = {},
        setRemoteVolume, localCameraStream, localScreenStream,
        isTalking = false
    } = useVoice();

    const isCameraOn = isVideoEnabled;

    const { user: currentUser } = useAuth();
    const { combinedUsers, getUserAvatar, allStreams } = useVoiceChatState({
        connectedUsers, currentUser,
        isMuted, isCameraOn, isScreenSharing, isTalking,
        currentUserProfile, getRealUserAvatar, allUsers,
        remoteStreams, localCameraStream, localScreenStream,
    });

    const [expandedUser, setExpandedUser] = useState(null); // Fullscreen mode
    const [pinnedUser, setPinnedUser] = useState(null); // Pinned user
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
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

    const [showEchoWarning, setShowEchoWarning] = useState(true);

    // Monitoring effects (extracted hook)
    const {
        connectionQuality, hasEchoRisk, networkQuality, networkType,
        talkingIndicators, activeSpeaker
    } = useVoiceMonitoring({
        isInVoice, localAudioStream, isMuted,
        startStatsMonitoring, stopStatsMonitoring,
        screenShareQuality, updateScreenQuality
    });

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

    const userCount = combinedUsers.length;

    //  Stable callback refs (performance)
    const handleContextMenu = useCallback((data) => setContextMenu(data), []);
    const handleBackFromFullscreen = useCallback(() => setExpandedUser(null), []);
    const handleDismissEcho = useCallback(() => setShowEchoWarning(false), []);
    const handleCloseSettings = useCallback(() => setIsSettingsOpen(false), []);
    const handleCloseContextMenu = useCallback(() => setContextMenu(null), []);

    // 🎨 MINIMIZED VIEW (Küçük Ada - Discord Tarzı)
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
        <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #1e1e1e 0%, #2c2c2c 100%)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
        }}>
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
            <div style={{
                flex: 1,
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'auto',
                position: 'relative',
                minHeight: 0,
            }}>
                {(() => {
                    const gridProps = {
                        combinedUsers, allStreams, remoteVolumes, setRemoteVolume,
                        talkingIndicators, activeSpeaker, pinnedUser, setPinnedUser,
                        setExpandedUser, setContextMenu, connectionQuality, getUserAvatar, isMobile,
                    };
                    const screenShares = combinedUsers.filter(u => u.isScreenSharing && allStreams[`${u.username}_screen`]);
                    if (screenShares.length > 0) {
                        return <GridView {...gridProps} screenShares={screenShares} />;
                    }
                    const hasAnyActiveStream = combinedUsers.some(u => {
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
            {hasEchoRisk && showEchoWarning && (
                <EchoWarning onDismiss={handleDismissEcho} />
            )}

            {/* SETTINGS MODAL */}
            {isSettingsOpen && (
                <VoiceSettingsPanel
                    onClose={handleCloseSettings}
                    channelId={roomName}
                />
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

export default React.memo(VoiceChatPanel);