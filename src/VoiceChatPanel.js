// frontend/src/VoiceChatPanel.js
// 🎤 PROFESYONEL SESLİ SOHBET PANELİ - Discord/Zoom Tarzı

import React, { useState, useEffect, useCallback } from 'react';
import { useVoice } from './VoiceContext';
import { useAuth } from './AuthContext';
import useResponsive from './hooks/useResponsive'; // 🔥 RESPONSIVE
import UserContextMenu from './components/UserContextMenu';
import VoiceSettingsPanel from './components/VoiceSettingsPanel'; // 🔥 YENİ: Gelişmiş Ses Ayarları

// Extracted Sub-Components
import MinimizedView from './VoiceChatPanel/MinimizedView';
import useVoiceMonitoring from './VoiceChatPanel/useVoiceMonitoring';
import useVoiceInteractions from './VoiceChatPanel/useVoiceInteractions';
import useVoiceChatState from './VoiceChatPanel/useVoiceChatState';
import FullscreenView from './VoiceChatPanel/FullscreenView';
import GridView from './VoiceChatPanel/GridView';
import ProfileCardGrid from './VoiceChatPanel/ProfileCardGrid';
import VoiceHeader from './VoiceChatPanel/VoiceHeader';
import EchoWarning from './VoiceChatPanel/EchoWarning';
import './VoiceChatPanel/voicePanelStyles';

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

    // 🆕 CONTEXT MENU HANDLERS (extracted hook)
    const {
        handleSendMessage, handleAddFriend, handleBlock,
        handleViewProfile, handleMuteUser, handleAdjustVolume
    } = useVoiceInteractions({ setContextMenu, setVolumeSettings });

    // 🎯 Stable callback refs (performance)
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
                                isMobile={isMobile}
                            />
                        );
                    }
                    return <GridView {...gridProps} />;
                })()}
            </div>

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

            {/* 🆕 CONTEXT MENU */}
            {contextMenu && (
                <UserContextMenu
                    user={contextMenu.user}
                    position={contextMenu.position}
                    onClose={handleCloseContextMenu}
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

export default React.memo(VoiceChatPanel);