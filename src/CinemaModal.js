import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
const ReactPlayer = lazy(() => import('react-player'));
import { FaTimes, FaLink, FaExclamationCircle, FaPlay, FaPause } from 'react-icons/fa';

const CinemaModal = ({ onClose, ws }) => {
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
                        console.log("🔗 [Remote] URL:", data.payload.url);
                        setPlaying(false);
                        setIsReady(false);
                        setUrl(data.payload.url);
                        setError(null);
                    }
                    else if (data.action === 'play') {
                        const currentTime = getCurrentTimeSafe();
                        // Zaman farkı 2 saniyeden fazlaysa atla
                        if (Math.abs(currentTime - data.payload.time) > 2) {
                            if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
                                playerRef.current.seekTo(data.payload.time);
                            }
                        }
                        setPlaying(true);
                    }
                    else if (data.action === 'pause') {
                        setPlaying(false);
                    }

                    setTimeout(() => { isRemoteUpdate.current = false; }, 1000);
                }
            } catch (e) {
                console.error("WS Hatası:", e);
            }
        };

        ws.current.addEventListener('message', handleMessage);
        return () => ws.current?.removeEventListener('message', handleMessage);
    }, [ws]);

    const sendSignal = (action, payload = {}) => {
        if (isRemoteUpdate.current) return;

        if (ws.current?.readyState === WebSocket.OPEN) {
            console.log("📡 Sinyal:", action);
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

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <h3>🍿 Sinema & Müzik</h3>
                    <button onClick={onClose} style={styles.closeBtn}><FaTimes /></button>
                </div>

                <div style={styles.playerWrapper}>
                    {error && (
                        <div style={styles.statusOverlay}>
                            <FaExclamationCircle size={40} color="#f04747" />
                            <p style={{ marginTop: 10 }}>{error}</p>
                        </div>
                    )}

                    {!isReady && !error && (
                        <div style={styles.statusOverlay}>
                            <div className="spinner"></div>
                            <p style={{ marginTop: 10 }}>Yükleniyor...</p>
                        </div>
                    )}

                    <Suspense fallback={<div style={{ color: '#fff', padding: '50px', textAlign: 'center' }}>Loading player...</div>}>
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
                            style={{ position: 'absolute', top: 0, left: 0 }}

                            onReady={() => {
                                console.log("✅ Video Hazır");
                                setIsReady(true);
                            }}

                            onError={(e) => {
                                console.error("Video Oynatma Hatası:", e);
                                setError("Video oynatılamadı. Link geçersiz olabilir.");
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

                            // Gereksiz sinyalleri önlemek için boş bıraktık
                            onProgress={() => { }}
                        />
                    </Suspense>
                </div>

                <div style={styles.controls}>
                    <form onSubmit={handleLoadUrl} style={styles.urlForm}>
                        <FaLink style={{ color: '#b9bbbe' }} />
                        <input
                            type="text"
                            value={inputUrl}
                            onChange={(e) => setInputUrl(e.target.value)}
                            placeholder="YouTube linki yapıştır..."
                            style={styles.input}
                        />
                        <button type="submit" style={styles.loadBtn}>Yükle</button>
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
                        style={{ ...styles.loadBtn, backgroundColor: playing ? '#da373c' : '#43b581', marginLeft: 10, width: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}
                    >
                        {playing ? <><FaPause /> Durdur</> : <><FaPlay /> Oynat</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center' },
    modal: { width: '90%', maxWidth: '900px', backgroundColor: '#202225', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' },
    header: { padding: '15px', backgroundColor: '#2f3136', display: 'flex', justifyContent: 'space-between', color: 'white' },
    playerWrapper: { position: 'relative', paddingTop: '56.25%', backgroundColor: 'black' },
    closeBtn: { background: 'none', border: 'none', color: 'white', fontSize: '1.5em', cursor: 'pointer' },
    controls: { padding: '20px', display: 'flex', alignItems: 'center' },
    urlForm: { display: 'flex', gap: '10px', backgroundColor: '#40444b', padding: '10px', borderRadius: '8px', flex: 1 },
    input: { flex: 1, background: 'transparent', border: 'none', color: 'white', outline: 'none' },
    loadBtn: { padding: '8px 20px', backgroundColor: '#5865f2', border: 'none', borderRadius: '4px', color: 'white', fontWeight: 'bold', cursor: 'pointer' },
    statusOverlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', zIndex: 10 }
};

const styleSheet = document.createElement("style");
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

export default CinemaModal;

