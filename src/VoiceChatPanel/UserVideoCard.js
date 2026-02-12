import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import ActionButton from './ActionButton';

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
                const volumePercent = user.volume || 100;
                if (volumePercent <= 100) {
                    audioRef.current.volume = Math.max(0, volumePercent / 100);
                } else {
                    // >100% — use Web Audio API GainNode for amplification
                    audioRef.current.volume = 1.0;
                    try {
                        const audio = audioRef.current;
                        if (!audio._audioContext) {
                            audio._audioContext = new (window.AudioContext || window.webkitAudioContext)();
                            audio._sourceNode = audio._audioContext.createMediaElementSource(audio);
                            audio._gainNode = audio._audioContext.createGain();
                            audio._sourceNode.connect(audio._gainNode);
                            audio._gainNode.connect(audio._audioContext.destination);
                        }
                        audio._gainNode.gain.value = volumePercent / 100;
                    } catch (e) {
                        console.warn('[Volume] GainNode amplification failed:', e);
                    }
                }
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

            {/* HOVER ACTIONS - Hover'da görünsün, temiz görünüm */}
            <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                display: 'flex',
                gap: '6px',
                opacity: showFullControls ? 1 : 0,
                transition: 'opacity 0.25s ease, transform 0.25s ease',
                transform: showFullControls ? 'translateY(0)' : 'translateY(-6px)',
                zIndex: 20,
                pointerEvents: showFullControls ? 'auto' : 'none',
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

                {/* 🔥 Volume Slider (hover'da görünür, sadece remote user) */}
                {!user.isLocal && showFullControls && (
                    <div style={{
                        background: 'rgba(0, 0, 0, 0.9)',
                        borderRadius: '10px',
                        padding: '6px 10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        minWidth: '100px',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        animation: 'fadeIn 0.2s ease',
                    }}>
                        <span style={{ fontSize: '12px' }}>
                            {(user.volume || 100) === 0 ? '🔇' : (user.volume || 100) > 100 ? '🔊' : '🔉'}
                        </span>
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
                                height: '4px',
                            }}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <span style={{ fontSize: '10px', color: '#fff', minWidth: '30px', fontWeight: 600 }}>
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

export default UserVideoCard;
