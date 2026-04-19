import { useState, useEffect, useRef, lazy, Suspense } from 'react';

import PropTypes from 'prop-types';

import useModalA11y from '../hooks/useModalA11y';

const ReactPlayer = lazy(() => import('react-player'));

import { FaTimes, FaLink, FaExclamationCircle, FaPlay, FaPause } from 'react-icons/fa';

import { useTranslation } from 'react-i18next';

import logger from '../utils/logger';

// -- extracted inline style constants --

const CinemaModal = ({ onClose, ws }) => {
    const { t } = useTranslation();

    const [url, setUrl] = useState('https://www.youtube.com/watch?v=jfKfPfyJRdk');

    const [inputUrl, setInputUrl] = useState('');

    const [playing, setPlaying] = useState(false);

    const [volume, setVolume] = useState(0.8);

    const [error, setError] = useState(null);

    const [isReady, setIsReady] = useState(false);

    const playerRef = useRef(null);

    const isRemoteUpdate = useRef(false);

    // --- GÜVENLİ ZAMAN ALMA FONKSİYONU (HATA ÖNLEYİCİ) ---

    // Bu fonksiyon player hazır değilse hata vermek yerine 0 döndürür.

    const getCurrentTimeSafe = () => {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
            try {
                return playerRef.current.getCurrentTime();
            } catch (e) {
                return 0;
            }
        }

        return 0;
    };

    useEffect(() => {
        if (!ws.current) return;

        const handleMessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.type === 'media_sync') {
                    isRemoteUpdate.current = true;

                    if (data.action === 'change_url') {
                        setPlaying(false);

                        setIsReady(false);

                        setUrl(data.payload.url);

                        setError(null);
                    } else if (data.action === 'play') {
                        const currentTime = getCurrentTimeSafe();

                        // Zaman farkı 2 saniyeden fazlaysa atla

                        if (Math.abs(currentTime - data.payload.time) > 2) {
                            if (
                                playerRef.current &&
                                typeof playerRef.current.seekTo === 'function'
                            ) {
                                playerRef.current.seekTo(data.payload.time);
                            }
                        }

                        setPlaying(true);
                    } else if (data.action === 'pause') {
                        setPlaying(false);
                    }

                    setTimeout(() => {
                        isRemoteUpdate.current = false;
                    }, 1000);
                }
            } catch (e) {
                logger.error('WS Error:', e);
            }
        };

        ws.current.addEventListener('message', handleMessage);

        return () => ws.current?.removeEventListener('message', handleMessage);
    }, [ws]);

    const sendSignal = (action, payload = {}) => {
        if (isRemoteUpdate.current) return;

        if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({ type: 'media_sync', action, payload }));
        }
    };

    const handleLoadUrl = (e) => {
        e.preventDefault();

        if (!inputUrl.trim()) return;

        isRemoteUpdate.current = false;

        setPlaying(false);

        setIsReady(false);

        setUrl(inputUrl);

        setError(null);

        sendSignal('change_url', { url: inputUrl });

        setInputUrl('');
    };

    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Cinema & Music' });

    return (
        <div aria-label="cinema modal" style={styles.overlay} {...overlayProps}>
            <div style={styles.modal} {...dialogProps}>
                <div style={styles.header}>
                    <h3>🍿 Cinema & Music</h3>

                    <button onClick={onClose} style={styles.closeBtn} aria-label="Close">
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.playerWrapper}>
                    {error && (
                        <div style={styles.statusOverlay}>
                            <FaExclamationCircle size={40} color="#f23f42" />

                            <p>{error}</p>
                        </div>
                    )}

                    {!isReady && !error && (
                        <div style={styles.statusOverlay}>
                            <div className="spinner"></div>

                            <p>{t('common.loading')}</p>
                        </div>
                    )}

                    <Suspense fallback={<div>Oynatıcı yükleniyor...</div>}>
                        <ReactPlayer
                            key={url}
                            ref={playerRef}
                            url={url}
                            playing={playing}
                            volume={volume}
                            controls={true}
                            width="100%"
                            height="100%"
                            // Görünürlük ayarı

                            onReady={() => {
                                setIsReady(true);
                            }}
                            onError={(e) => {
                                logger.error('Video Playback Error:', e);

                                setError('Video oynatılamadı. Bağlantı geçersiz olabilir.');

                                setIsReady(true);
                            }}
                            // --- KRİTİK DÜZELTME BURADA ---

                            onPlay={() => {
                                const t = getCurrentTimeSafe(); // Güvenli fonksiyonu kullan

                                sendSignal('play', { time: t });
                            }}
                            onPause={() => {
                                sendSignal('pause');
                            }}
                            // Gereksiz sinyalleri önlemek for boş bıraktık

                            onProgress={() => {}}
                        />
                    </Suspense>
                </div>

                <div style={styles.controls}>
                    <form onSubmit={handleLoadUrl} style={styles.urlForm}>
                        <FaLink />

                        <input
                            type="text"
                            value={inputUrl}
                            onChange={(e) => setInputUrl(e.target.value)}
                            placeholder={t('cinema.paste_youtube_link')}
                            aria-label="Video URL input"
                            style={styles.input}
                        />

                        <button type="submit" style={styles.loadBtn}>
                            {t('common.upload')}
                        </button>
                    </form>

                    {/* --- KRİTİK DÜZELTME BURADA --- */}

                    <button
                        onClick={() => {
                            isRemoteUpdate.current = false;

                            if (playing) {
                                setPlaying(false);

                                sendSignal('pause');
                            } else {
                                setPlaying(true);

                                const t = getCurrentTimeSafe(); // Güvenli fonksiyonu kullan

                                sendSignal('play', { time: t });
                            }
                        }}
                        style={{
                            ...styles.loadBtn,
                            background: playing
                                ? 'linear-gradient(135deg, #f23f42 0%, #d93235 100%)'
                                : 'linear-gradient(135deg, #23a559 0%, #1d8f4a 100%)',
                            boxShadow: playing
                                ? '0 3px 0 #a82b2e, 0 6px 16px rgba(242,63,66,0.30)'
                                : '0 3px 0 #177a3e, 0 6px 16px rgba(35,165,89,0.30)',
                            marginLeft: 10,
                            width: 110,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 5,
                        }}
                    >
                        {playing ? (
                            <>
                                <FaPause /> Dur
                            </>
                        ) : (
                            <>
                                <FaPlay /> Oynat
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        zIndex: 2000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modal: {
        width: '90%',
        maxWidth: '900px',
        background: 'rgba(30,31,35,0.92)',
        backdropFilter: 'blur(48px) saturate(180%)',
        WebkitBackdropFilter: 'blur(48px) saturate(180%)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 0 0 1px rgba(88,101,242,0.10), 0 16px 48px rgba(0,0,0,0.6)',
        border: '1px solid rgba(255,255,255,0.07)',
    },

    header: {
        padding: '16px 20px',
        background: 'linear-gradient(135deg, rgba(88,101,242,0.15), rgba(114,137,218,0.08))',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
    },

    playerWrapper: { position: 'relative', paddingTop: '56.25%', backgroundColor: 'black' },

    closeBtn: {
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: '8px',
        width: '32px',
        height: '32px',
        color: 'white',
        fontSize: '1.2em',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
    },

    controls: { padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '10px' },

    urlForm: {
        display: 'flex',
        gap: '10px',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.07)',
        padding: '10px',
        borderRadius: '13px',
        flex: 1,
    },

    input: { flex: 1, background: 'transparent', border: 'none', color: 'white', outline: 'none' },

    loadBtn: {
        padding: '8px 20px',
        background: 'linear-gradient(135deg, #5865f2 0%, #4752c4 100%)',
        border: 'none',
        borderRadius: '13px',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 3px 0 #3b45c7, 0 6px 16px rgba(88,101,242,0.30)',
        transition: 'all 0.15s',
    },

    statusOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        color: 'white',
        zIndex: 10,
    },
};

const styleSheet = document.createElement('style');

styleSheet.innerText = `


    .spinner {


        border: 4px solid rgba(255, 255, 255, 0.3);


        border-radius: 50%;


        border-top: 4px solid #ffffff;


        width: 40px;


        height: 40px;


        animation: spin 1s linear infinite;


    }


    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }


`;

document.head.appendChild(styleSheet);

CinemaModal.propTypes = {
    onClose: PropTypes.func,

    ws: PropTypes.object,
};

export default CinemaModal;
