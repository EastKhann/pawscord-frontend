// frontend/src/RoomList/VoiceControlBar.js
import React from 'react';
import {
    FaMicrophone, FaMicrophoneSlash, FaHeadphones,
    FaFilm, FaDesktop, FaVideoSlash, FaPhoneSlash, FaCog,
    TbHeadphonesOff
} from '../utils/iconOptimization';

const VoiceControlBar = ({
    isInVoice, isConnecting, isMuted, isDeafened,
    isVideoEnabled, isScreenSharing,
    toggleVideo, toggleScreenShare, toggleMute, toggleDeafened, leaveVoiceChat,
    voiceRoomDisplayName, getAvatarUrl, currentUserProfile, currentUsername, getDeterministicAvatar
}) => {
    if (!isInVoice && !isConnecting) return null;

    const ctrlBtn = (active, activeColor = '#23a559', inactiveColor = '#2b2d31') => ({
        flex: 1,
        background: active ? activeColor : inactiveColor,
        border: 'none', color: 'white', padding: '8px', borderRadius: '4px',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.2s'
    });

    return (
        <div style={{
            padding: '8px', backgroundColor: '#232428',
            borderTop: '1px solid #1e1f22', borderBottom: '1px solid #1e1f22'
        }}>
            {/* Avatar ve Kanal Bilgisi */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', padding: '0 4px' }}>
                <div style={{ position: 'relative' }}>
                    <img
                        src={getAvatarUrl(currentUserProfile?.avatar, currentUsername)}
                        alt={currentUsername}
                        style={{
                            width: '32px', height: '32px', borderRadius: '50%',
                            border: '2px solid #23a559', boxShadow: '0 0 8px rgba(35, 165, 89, 0.5)'
                        }}
                        onError={(e) => { e.target.onerror = null; e.target.src = getDeterministicAvatar(currentUsername); }}
                    />
                    <div style={{
                        position: 'absolute', bottom: '-2px', right: '-2px',
                        width: '16px', height: '16px', borderRadius: '50%',
                        backgroundColor: isMuted ? '#f04747' : '#23a559',
                        border: '2px solid #232428', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', fontSize: '8px'
                    }}>
                        {isMuted ? '🔇' : '🎤'}
                    </div>
                </div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ color: isConnecting ? '#eba61e' : '#23a559', fontWeight: 'bold', fontSize: '0.8em' }}>
                        {isConnecting ? 'Bağlanılıyor...' : 'Ses Bağlandı'}
                    </div>
                    <div style={{ fontSize: '0.7em', color: '#b9bbbe', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {voiceRoomDisplayName} / Genel
                    </div>
                </div>
            </div>

            {/* Kontrol Butonları */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5px' }}>
                <button onClick={(e) => { e.stopPropagation(); toggleVideo(); }}
                    style={ctrlBtn(isVideoEnabled)} title={isVideoEnabled ? "Kamerayı Kapat" : "Kamerayı Aç"}>
                    {isVideoEnabled ? <FaFilm size={16} /> : <FaVideoSlash size={16} />}
                </button>

                <button onClick={(e) => { e.stopPropagation(); toggleScreenShare(); }}
                    style={ctrlBtn(isScreenSharing)} title={isScreenSharing ? "Paylaşımı Durdur" : "Ekran Paylaş"}>
                    <FaDesktop size={16} />
                </button>

                <button onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                    style={ctrlBtn(isMuted, '#da373c')} title={isMuted ? "Sesi Aç" : "Sessize Al"}>
                    {isMuted ? <FaMicrophoneSlash size={16} /> : <FaMicrophone size={16} />}
                </button>

                <button onClick={(e) => { e.stopPropagation(); toggleDeafened(); }}
                    style={ctrlBtn(isDeafened, '#da373c')} title={isDeafened ? "Duy" : "Sağırlaştır"}>
                    {isDeafened ? <TbHeadphonesOff size={18} /> : <FaHeadphones size={16} />}
                </button>

                <button onClick={(e) => { e.stopPropagation(); window.dispatchEvent(new CustomEvent('openVoiceSettings')); }}
                    style={ctrlBtn(false)} title="Ses Ayarları">
                    <FaCog size={16} />
                </button>

                <button onClick={(e) => { e.stopPropagation(); if (typeof leaveVoiceChat === 'function') leaveVoiceChat(); }}
                    style={ctrlBtn(true, '#da373c')} title="Sesli Kanaldan Çık">
                    <FaPhoneSlash size={16} />
                </button>
            </div>
        </div>
    );
};

export default React.memo(VoiceControlBar);
