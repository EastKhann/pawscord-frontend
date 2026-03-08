// frontend/src/UserVideoContainer.js

import React, { useEffect, useRef, useMemo, useState } from 'react';

const VideoPlayer = ({ stream, isMirrored, objectFit = 'cover', muted = false }) => {
    const videoRef = useRef(null);
    const [isPiP, setIsPiP] = useState(false);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;

            // Video ready olduğunda log
            videoRef.current.onloadedmetadata = () => {
                videoRef.current.play().catch(err => {
                    console.error('❌ Video play error:', err);
                });
            };
        }

        return () => {
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
        };
    }, [stream]);

    // 🔥 PiP state tracking
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const onEnter = () => setIsPiP(true);
        const onLeave = () => setIsPiP(false);
        video.addEventListener('enterpictureinpicture', onEnter);
        video.addEventListener('leavepictureinpicture', onLeave);
        return () => {
            video.removeEventListener('enterpictureinpicture', onEnter);
            video.removeEventListener('leavepictureinpicture', onLeave);
        };
    }, []);

    // 🔥 Picture-in-Picture toggle
    const togglePiP = async (e) => {
        e.stopPropagation();
        const video = videoRef.current;
        if (!video) return;
        try {
            if (document.pictureInPictureElement === video) {
                await document.exitPictureInPicture();
            } else if (document.pictureInPictureEnabled) {
                await video.requestPictureInPicture();
            }
        } catch (err) {
            console.warn('[PiP] Failed:', err.message);
        }
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <video
                ref={videoRef}
                style={{ ...styles.videoElement, transform: isMirrored ? 'scaleX(-1)' : 'none', objectFit }}
                autoPlay
                playsInline
                muted={true} // 🔥 VoiceAudioController handles audio now
            />
            {/* 🔥 PiP Button — only show if browser supports it */}
            {document.pictureInPictureEnabled && (
                <button
                    onClick={togglePiP}
                    style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        backgroundColor: isPiP ? 'rgba(88, 101, 242, 0.9)' : 'rgba(0,0,0,0.6)',
                        border: 'none',
                        color: 'white',
                        borderRadius: '4px',
                        padding: '4px 7px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        zIndex: 15,
                        opacity: 0.7,
                        transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={e => { e.target.style.opacity = '1'; }}
                    onMouseLeave={e => { e.target.style.opacity = '0.7'; }}
                    title={isPiP ? "PiP'den Çık" : "Pencere İçinde Pencere (PiP)"}
                >
                    {isPiP ? '📌' : '🖼️'}
                </button>
            )}
        </div>
    );
};

const UserVideoContainer = ({ id, user, track, streamType, avatarUrl, isLocal, onClick, style, lastReaction, gameMove }) => { // 🔥 gameMove eklendi
    const containerRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const videoStream = useMemo(() => {
        if (track && track.kind === 'video') {
            return new MediaStream([track]);
        }
        return null;
    }, [track]);

    // 🔥 FULLSCREEN TOGGLE
    const toggleFullscreen = (e) => {
        e.stopPropagation(); // onClick'i tetiklememek için

        if (!containerRef.current) return;

        if (!document.fullscreenElement) {
            // Tam ekrana geç
            containerRef.current.requestFullscreen().then(() => {
                setIsFullscreen(true);
            }).catch(err => {
                console.error('Tam ekran hatası:', err);
            });
        } else {
            // Tam ekrandan çık
            document.exitFullscreen().then(() => {
                setIsFullscreen(false);
            });
        }
    };

    // Fullscreen change listener
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // 🔥 REACTION LOGIC
    const [reactions, setReactions] = useState([]);

    useEffect(() => {
        if (lastReaction && lastReaction.username === user.username) {
            const id = Date.now() + Math.random();
            setReactions(prev => [...prev, { id, emoji: lastReaction.emoji }]);

            // Cleanup after animation
            setTimeout(() => {
                setReactions(prev => prev.filter(r => r.id !== id));
            }, 2000);
        }
    }, [lastReaction, user.username]);

    const isMirrored = isLocal && streamType === 'camera';

    // 🔥 DÜZELTME: Sadece "Siz" yazmak yerine ismini de gösterelim
    // Örn: "EastKhan (Siz)"
    const displayName = isLocal ? `${user.username} (Siz)` : user.username;

    // 🔥 ANIMASYON SINIFLARI
    const containerClasses = user.is_talking ? 'talking-border talking-pulse' : '';

    return (
        <div
            ref={containerRef}
            className={containerClasses}
            style={{
                ...styles.containerOuter,
                cursor: 'pointer',
                border: user.is_talking ? 'none' : '1px solid rgba(0,0,0,0.2)',
                // ✅ Tam ekrandayken düzgün görünüm
                ...(isFullscreen && {
                    width: '100vw',
                    height: '100vh',
                    maxWidth: 'none',
                    paddingBottom: 0, // ✅ Tam ekranda padding trick iptal
                }),
                ...style, // Allow style overrides (en son, çünkü dışarıdan gelen override olabilir)
            }}
            onClick={() => onClick && onClick(id)}
        >
            {/* 🌟 GLOBAL STYLES FOR REACTIONS */}
            <style>{`
                @keyframes floatUp {
                    0% { transform: translateY(0) scale(0.5); opacity: 0; }
                    20% { opacity: 1; transform: translateY(-20px) scale(1.2); }
                    100% { transform: translateY(-100px) scale(1); opacity: 0; }
                }
            `}</style>

            <div style={{
                ...styles.aspectRatioWrapper,
                // ✅ Tam ekrandayken full yükseklik
                height: isFullscreen ? '100%' : styles.aspectRatioWrapper.height
            }}>
                {videoStream ? (
                    <div style={styles.videoFull}>
                        {/* MAIN VIDEO */}
                        <VideoPlayer
                            stream={videoStream}
                            isMirrored={isMirrored}
                            objectFit="cover"
                        />

                        {/* ✅ TAM EKRAN BUTONU */}
                        <button
                            onClick={toggleFullscreen}
                            style={{
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                                backgroundColor: 'rgba(0,0,0,0.7)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: 'white',
                                borderRadius: '6px',
                                padding: '6px 10px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                zIndex: 15,
                                backdropFilter: 'blur(4px)',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(88, 101, 242, 0.8)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.7)'}
                            title={isFullscreen ? "Tam Ekrandan Çık (ESC)" : "Tam Ekran"}
                        >
                            {isFullscreen ? '🔙' : '🔳'}
                        </button>

                        <div style={styles.label}>{streamType === 'screen' ? '🖥️' : '📷'}</div>
                    </div>
                ) : (
                    <div style={styles.avatarPlaceholder}>
                        <img
                            src={avatarUrl || "https://media.pawscord.com/assets/logo.png"}
                            style={{
                                ...styles.avatarImage,
                                border: user.is_talking ? '3px solid #3ba55c' : '2px solid #0b0e1b',
                                transform: user.is_talking ? 'scale(1.1)' : 'scale(1)',
                                transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                            }}
                            alt={user.username}
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://media.pawscord.com/assets/logo.png"; }}
                        />

                        <div style={styles.micStatus}>
                            {user.is_deafened ? '🔕' : user.is_mic_off ? '🔇' : (user.is_talking ? '🔊' : '🎤')}
                        </div>
                    </div>
                )}

                {/* 🔥 FLOAT EMOJIS */}
                <div style={{ position: 'absolute', bottom: '10px', right: '10px', pointerEvents: 'none', zIndex: 20 }}>
                    {reactions.map(r => (
                        <div key={r.id} style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0 + Math.random() * 20,
                            fontSize: '32px',
                            animation: 'floatUp 2s ease-out forwards'
                        }}>
                            {r.emoji}
                        </div>
                    ))}
                </div>

                {/* 🔥 GAME MOVE DISPLAY */}
                {gameMove && (
                    <div style={{
                        position: 'absolute',
                        top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: '64px',
                        filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.8))',
                        zIndex: 30,
                        animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}>
                        {gameMove === 'rock' ? '🪨' : gameMove === 'paper' ? '📄' : '✂️'}
                    </div>
                )}
                <style>{`
                    @keyframes popIn {
                        from { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                        to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                    }
                `}</style>

                <div style={styles.usernameOverlay}>
                    <span>{displayName}</span>
                </div>
            </div>
        </div>
    );
};

const styles = {
    containerOuter: {
        flexGrow: 1,
        borderRadius: '12px',
        overflow: 'hidden', // ✅ Scroll çıkmasın
        backgroundColor: '#111214',
        boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
        transition: 'all 0.2s ease-in-out',
        position: 'relative',
        width: '100%', // ✅ Parent'a göre ayarla
        paddingBottom: '56.25%', // ✅ 16:9 aspect ratio (9/16 = 0.5625)
        minWidth: '200px',
    },
    aspectRatioWrapper: {
        position: 'absolute', // ✅ Padding-bottom trick için absolute
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
        overflow: 'hidden' // ✅ İçerik taşmasın
    },
    videoFull: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        overflow: 'hidden' // ✅ Video taşmasın
    },
    videoElement: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'relative',
        zIndex: 2,
        display: 'block' // ✅ Inline spacing kaldır
    },

    avatarPlaceholder: {
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        backgroundColor: '#0d0e10',
    },
    avatarImage: {
        width: '65px', // Biraz büyüttüm
        height: '65px',
        objectFit: 'cover',
        borderRadius: '50%',
        boxShadow: '0 5px 15px rgba(0,0,0,0.5)'
    },
    usernameOverlay: {
        position: 'absolute', bottom: '8px', left: '8px',
        backgroundColor: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(4px)',
        color: 'white', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75em', zIndex: 10,
        fontWeight: 'bold',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '85%',
        border: '1px solid rgba(255,255,255,0.1)'
    },
    label: {
        position: 'absolute', top: '8px', right: '8px', backgroundColor: 'rgba(0,0,0,0.6)',
        color: 'white', padding: '4px', borderRadius: '4px', fontSize: '0.8em', zIndex: 1,
    },
    micStatus: {
        position: 'absolute', bottom: '8px', right: '8px', fontSize: '1.1em', zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '4px', borderRadius: '50%',
        width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)'
    },
    // 🌟 AMBIENCE STYLES
    ambienceLayer: {
        position: 'absolute',
        top: '-20%',
        left: '-20%',
        width: '140%',
        height: '140%',
        zIndex: 0,
        pointerEvents: 'none',
        filter: 'blur(25px) brightness(0.5)',
        opacity: 0.8,
    },
    ambienceOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)',
        zIndex: 1,
    }
};

export default React.memo(UserVideoContainer);

