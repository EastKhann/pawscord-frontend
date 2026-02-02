// frontend/src/components/DJModal.js

import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
const ReactPlayer = lazy(() => import('react-player'));
import { FaPlay, FaPause, FaForward, FaPlus, FaTimes, FaMusic } from 'react-icons/fa';

const DJModal = ({ onClose, ws, roomSlug }) => {
    const [queue, setQueue] = useState([]);
    const [currentUrl, setCurrentUrl] = useState('');
    const [inputUrl, setInputUrl] = useState('');
    const [playing, setPlaying] = useState(false);

    // Kuyruğa ekle
    const addToQueue = () => {
        if (!inputUrl) return;
        const newQueue = [...queue, inputUrl];
        setQueue(newQueue);
        setInputUrl('');
        // Socket ile herkese kuyruğu gönder
        sendSignal('queue_update', { queue: newQueue });
    };

    const playNext = () => {
        if (queue.length > 0) {
            const next = queue[0];
            const remaining = queue.slice(1);
            setCurrentUrl(next);
            setQueue(remaining);
            setPlaying(true);

            sendSignal('play_track', { url: next, queue: remaining });
        }
    };

    // Socket Sinyalleri (CinemaModal ile benzer mantık)
    const sendSignal = (action, payload) => {
        if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({ type: 'media_sync', action, payload }));
        }
    };

    // Socket Dinleyici
    useEffect(() => {
        const handleMessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'media_sync') {
                if (data.action === 'queue_update') setQueue(data.payload.queue);
                if (data.action === 'play_track') {
                    setCurrentUrl(data.payload.url);
                    setQueue(data.payload.queue);
                    setPlaying(true);
                }
            }
        };
        ws.current?.addEventListener('message', handleMessage);
        return () => ws.current?.removeEventListener('message', handleMessage);
    }, [ws]);

    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
                <div style={styles.header}>
                    <h3>🎵 DJ Odası</h3>
                    <button onClick={onClose} style={styles.closeBtn}><FaTimes /></button>
                </div>

                {/* Player (Gizli veya Görünür) */}
                <div style={styles.playerWrapper}>
                    <Suspense fallback={<div style={{ color: '#fff', padding: '20px', textAlign: 'center' }}>Loading player...</div>}>
                        <ReactPlayer url={currentUrl} playing={playing} controls width="100%" height="200px" />
                    </Suspense>
                </div>

                <div style={styles.controls}>
                    <input
                        value={inputUrl}
                        onChange={e => setInputUrl(e.target.value)}
                        placeholder="YouTube Şarkı Linki..."
                        style={styles.input}
                    />
                    <button onClick={addToQueue} style={styles.addBtn}><FaPlus /></button>
                    <button onClick={playNext} style={styles.nextBtn}><FaForward /> Sıradaki</button>
                </div>

                <div style={styles.queueList}>
                    <h4>Sıradakiler ({queue.length})</h4>
                    {queue.map((link, i) => (
                        <div key={i} style={styles.queueItem}>
                            <FaMusic color="#ccc" /> {link}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center' },
    modal: { background: '#2b2d31', width: '500px', borderRadius: '12px', padding: '20px' },
    header: { display: 'flex', justifyContent: 'space-between', color: 'white', marginBottom: 20 },
    closeBtn: { background: 'none', border: 'none', color: 'white', fontSize: '1.2em', cursor: 'pointer' },
    playerWrapper: { marginBottom: 20, borderRadius: '8px', overflow: 'hidden' },
    controls: { display: 'flex', gap: 10, marginBottom: 20 },
    input: { flex: 1, padding: 8, borderRadius: 4, border: '1px solid #444', background: '#202225', color: 'white' },
    addBtn: { padding: '8px 12px', background: '#5865f2', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' },
    nextBtn: { padding: '8px 12px', background: '#23a559', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' },
    queueList: { maxHeight: 200, overflowY: 'auto', color: '#ccc' },
    queueItem: { padding: '8px', borderBottom: '1px solid #444', fontSize: '0.9em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }
};

export default React.memo(DJModal);

