
import { useState, useEffect, useRef, lazy, Suspense } from 'react';
const ReactPlayer = lazy(() => import('react-player'));
import { FaPlay, FaPause, FaLink, FaExclamationCircle } from 'react-icons/fa';
import { useVoice } from '../VoiceContext';

const CinemaPlayer = () => {
    const { cinemaState, sendCinemaSignal, setCinemaState } = useVoice();
    const { url, playing, time, lastSyncAction } = cinemaState;

    const [inputUrl, setInputUrl] = useState('');
    const [volume, setVolume] = useState(0.8);
    const [error, setError] = useState(null);
    const [isReady, setIsReady] = useState(false);

    const playerRef = useRef(null);
    const isRemoteUpdate = useRef(false);

    // --- SYNC WITH CONTEXT STATE ---
    useEffect(() => {
        if (lastSyncAction === 'change_url') {
            setIsReady(false);
            setError(null);
        } else if (lastSyncAction === 'play') {
            if (Math.abs(getCurrentTimeSafe() - time) > 2) {
                if (playerRef.current) playerRef.current.seekTo(time);
            }
        }
    }, [url, playing, time, lastSyncAction]);

    const getCurrentTimeSafe = () => {
        try { return playerRef.current ? playerRef.current.getCurrentTime() : 0; }
        catch { return 0; }
    };

    const handleLoadUrl = (e) => {
        e.preventDefault();
        if (!inputUrl.trim()) return;
        sendCinemaSignal('change_url', { url: inputUrl });
        setInputUrl('');
    };

    const handlePlayPause = () => {
        if (playing) {
            sendCinemaSignal('pause');
        } else {
            sendCinemaSignal('play', { time: getCurrentTimeSafe() });
        }
    };

    return (
        <div style={styles.container}>
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

                <Suspense fallback={<div style={{color: '#fff', padding: '50px', textAlign: 'center'}}>Loading player...</div>}>
                    <ReactPlayer
                        ref={playerRef}
                        url={url}
                        playing={playing}
                        volume={volume}
                        controls={true}
                        width="100%"
                        height="100%"
                        style={{ position: 'absolute', top: 0, left: 0 }}
                        onReady={() => setIsReady(true)}
                        onError={() => { setError("Video oynatılamadı."); setIsReady(true); }}
                        onPlay={() => {
                            // Only send if not remote update (avoid loops)
                            // Actually ReactPlayer might fire onPlay when we set playing=true programmatically
                            // So we trust the context state mostly, but simple checks help
                            if (!playing) sendCinemaSignal('play', { time: getCurrentTimeSafe() });
                        }}
                        onPause={() => {
                            if (playing) sendCinemaSignal('pause');
                        }}
                    />
                </Suspense>
            </div>

            {/* CONTROLS */}
            <div style={styles.controls}>
                <button
                    onClick={handlePlayPause}
                    style={{
                        ...styles.btn,
                        backgroundColor: playing ? '#da373c' : '#43b581',
                        width: '40px', height: '40px', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                >
                    {playing ? <FaPause /> : <FaPlay style={{ marginLeft: 2 }} />}
                </button>

                <form onSubmit={handleLoadUrl} style={styles.urlForm}>
                    <FaLink style={{ color: '#b9bbbe' }} />
                    <input
                        type="text"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        placeholder="YouTube Link..."
                        style={styles.input}
                    />
                    <button type="submit" style={{ ...styles.btn, backgroundColor: '#5865f2', padding: '0 15px' }}>Yükle</button>
                </form>
            </div>

            <style>{`
                .spinner {
                    border: 4px solid rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    border-top: 4px solid #ffffff;
                    width: 30px; height: 30px;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

const styles = {
    container: {
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'black'
    },
    playerWrapper: {
        flex: 1, position: 'relative', overflow: 'hidden'
    },
    controls: {
        padding: '10px', display: 'flex', gap: '10px', backgroundColor: '#202225', alignItems: 'center'
    },
    urlForm: {
        flex: 1, display: 'flex', gap: '8px', backgroundColor: '#40444b', padding: '5px 10px', borderRadius: '4px', alignItems: 'center'
    },
    input: {
        flex: 1, background: 'transparent', border: 'none', color: 'white', outline: 'none', fontSize: '14px'
    },
    btn: {
        border: 'none', color: 'white', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold'
    },
    statusOverlay: {
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', zIndex: 10
    }
};

export default CinemaPlayer;


