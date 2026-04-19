// frontend/src/RoomList/VoiceControlBar.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
    // -- extracted inline style constants --
    FaMicrophone,
    FaMicrophoneSlash,
    FaHeadphones,
    FaFilm,
    FaDesktop,
    FaVideoSlash,
    FaPhoneSlash,
    FaCog,
    TbHeadphonesOff,
} from '../utils/iconOptimization';
const _st1 = {
    padding: '8px',
    backgroundColor: '#0b0e1b',
    borderTop: '1px solid rgba(255,255,255,0.06)',
};
const _st2 = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
    padding: '0 4px',
};
const _st3 = { position: 'relative' };
const _st4 = { width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' };
const _st5 = { flex: 1, overflow: 'hidden' };
const _st6 = {
    fontSize: '0.7em',
    color: '#b5bac1',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
};
const _st7 = { display: 'flex', justifyContent: 'space-between', gap: '5px' };

const VoiceControlBar = ({
    isInVoice,
    isConnecting,
    isMuted,
    isDeafened,
    isVideoEnabled,
    isScreenSharing,
    toggleVideo,
    toggleScreenShare,
    toggleMute,
    toggleDeafened,
    leaveVoiceChat,
    voiceRoomDisplayName,
    getAvatarUrl,
    currentUserProfile,
    currentUsername,
    getDeterministicAvatar,
}) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    if (!isInVoice && !isConnecting) return null;

    const ctrlBtn = (active, activeColor = '#23a559', inactiveColor = '#111214') => ({
        flex: 1,
        background: active ? activeColor : inactiveColor,
        border: 'none',
        color: 'white',
        padding: '8px',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
    });

    return (
        <div style={_st1}>
            {/* Avatar ve Channel Bilgisi */}
            <div style={_st2}>
                <div style={_st3}>
                    <img
                        src={getAvatarUrl(currentUserProfile?.avatar, currentUsername)}
                        alt={currentUsername}
                        style={_st4}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = getDeterministicAvatar(currentUsername);
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '-2px',
                            right: '-2px',
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            backgroundColor: isMuted ? '#f23f42' : '#23a559',
                            border: '2px solid #232428',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '8px',
                        }}
                    >
                        {isMuted ? '🔇' : '🎤'}
                    </div>
                </div>
                <div style={_st5}>
                    <div
                        style={{
                            color: isConnecting ? '#eba61e' : '#23a559',
                            fontWeight: 'bold',
                            fontSize: '0.8em',
                        }}
                    >
                        {isConnecting ? t('voiceControl.connecting') : t('voiceControl.connected')}
                    </div>
                    <div style={_st6}>{voiceRoomDisplayName}</div>
                </div>
            </div>

            {/* Control Buttons */}
            <div style={_st7}>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleVideo();
                    }}
                    style={ctrlBtn(isVideoEnabled)}
                    title={
                        isVideoEnabled ? t('voiceControl.cameraOff') : t('voiceControl.cameraOn')
                    }
                    aria-label={
                        isVideoEnabled ? t('voiceControl.cameraOff') : t('voiceControl.cameraOn')
                    }
                    aria-pressed={isVideoEnabled}
                >
                    {isVideoEnabled ? <FaFilm size={16} /> : <FaVideoSlash size={16} />}
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleScreenShare();
                    }}
                    style={ctrlBtn(isScreenSharing)}
                    title={
                        isScreenSharing
                            ? t('voiceControl.stopShare')
                            : t('voiceControl.shareScreen')
                    }
                    aria-label={
                        isScreenSharing
                            ? t('voiceControl.stopShare')
                            : t('voiceControl.shareScreen')
                    }
                    aria-pressed={isScreenSharing}
                >
                    <FaDesktop size={16} />
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleMute();
                    }}
                    style={ctrlBtn(isMuted, '#da373c')}
                    title={isMuted ? t('voiceControl.unmute') : t('voiceControl.mute')}
                    aria-label={isMuted ? t('voiceControl.unmute') : t('voiceControl.mute')}
                    aria-pressed={isMuted}
                >
                    {isMuted ? <FaMicrophoneSlash size={16} /> : <FaMicrophone size={16} />}
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleDeafened();
                    }}
                    style={ctrlBtn(isDeafened, '#da373c')}
                    title={isDeafened ? t('voiceControl.undeafen') : t('voiceControl.deafen')}
                    aria-label={isDeafened ? t('voiceControl.undeafen') : t('voiceControl.deafen')}
                    aria-pressed={isDeafened}
                >
                    {isDeafened ? <TbHeadphonesOff size={18} /> : <FaHeadphones size={16} />}
                </button>

                <button
                    aria-label={t('voiceControl.settings')}
                    onClick={(e) => {
                        e.stopPropagation();
                        window.dispatchEvent(new CustomEvent('openVoiceSettings'));
                    }}
                    style={ctrlBtn(false)}
                    title={t('voiceControl.settings')}
                >
                    <FaCog size={16} />
                </button>

                <button
                    aria-label={t('voiceControl.leave')}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (typeof leaveVoiceChat === 'function') leaveVoiceChat();
                    }}
                    style={ctrlBtn(true, '#da373c')}
                    title={t('voiceControl.leave')}
                >
                    <FaPhoneSlash size={16} />
                </button>
            </div>
        </div>
    );
};

VoiceControlBar.propTypes = {
    isInVoice: PropTypes.bool,
    isConnecting: PropTypes.bool,
    isMuted: PropTypes.bool,
    isDeafened: PropTypes.bool,
    isVideoEnabled: PropTypes.bool,
    isScreenSharing: PropTypes.bool,
    toggleVideo: PropTypes.func,
    toggleScreenShare: PropTypes.func,
    toggleMute: PropTypes.func,
    toggleDeafened: PropTypes.func,
    leaveVoiceChat: PropTypes.object,
    voiceRoomDisplayName: PropTypes.string,
    getAvatarUrl: PropTypes.func,
    currentUserProfile: PropTypes.object,
    currentUsername: PropTypes.string,
    getDeterministicAvatar: PropTypes.func,
};
export default React.memo(VoiceControlBar);
