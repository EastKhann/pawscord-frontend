// frontend/src/components/WatchTogether/WatchTogether.js
/**
 * 📺 PAWSCORD - Watch Together Component
 * ════════════════════════════════════════════════════════════════════════════════
 * Birlikte video izleme özelliği - YouTube, Twitch, Vimeo destekli
 * ════════════════════════════════════════════════════════════════════════════════
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaPlay, FaPause, FaExpand, FaCompress, FaUsers, FaPlus, FaTimes, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { API_BASE_URL, WS_PROTOCOL, API_HOST } from '../../utils/constants';
import toast from '../../utils/toast';
import './WatchTogether.css';

// ════════════════════════════════════════════════════════════════════════════════
// 🎬 MAIN COMPONENT
// ════════════════════════════════════════════════════════════════════════════════

const WatchTogether = ({ roomId, onClose }) => {
    const [party, setParty] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [viewers, setViewers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isHost, setIsHost] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showChat, setShowChat] = useState(true);
    const [reactions, setReactions] = useState([]);

    const wsRef = useRef(null);
    const playerRef = useRef(null);
    const containerRef = useRef(null);
    const chatEndRef = useRef(null);
    const heartbeatRef = useRef(null);

    const token = localStorage.getItem('access_token');

    // ════════════════════════════════════════════════════════════════════════════
    // 🔌 WEBSOCKET CONNECTION
    // ════════════════════════════════════════════════════════════════════════════

    const connectWebSocket = useCallback((partyId) => {
        if (wsRef.current) {
            wsRef.current.close();
        }

        const wsUrl = `${WS_PROTOCOL}://${API_HOST}/ws/watch-party/${partyId}/?token=${token}`;
        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            // Senkronizasyon talep et
            ws.send(JSON.stringify({ type: 'request_sync' }));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            handleWebSocketMessage(data);
        };

        ws.onclose = () => {
        };

        ws.onerror = (error) => {
            console.error('📺 Watch Party WebSocket error:', error);
        };

        wsRef.current = ws;

        // Heartbeat başlat
        heartbeatRef.current = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({
                    type: 'heartbeat',
                    local_time: currentTime,
                    is_buffering: false,
                }));
            }
        }, 5000);

    }, [token, currentTime]);

    const handleWebSocketMessage = (data) => {
        switch (data.type) {
            case 'sync_playback':
                handleSyncPlayback(data);
                break;
            case 'reaction':
                handleReaction(data);
                break;
            case 'chat_message':
                handleChatMessage(data);
                break;
            case 'viewer_joined':
                handleViewerJoined(data);
                break;
            case 'viewer_left':
                handleViewerLeft(data);
                break;
            case 'party_ended':
                handlePartyEnded(data);
                break;
            case 'video_changed':
                handleVideoChanged(data);
                break;
            default:
                break;
        }
    };

    // ════════════════════════════════════════════════════════════════════════════
    // 🎬 MESSAGE HANDLERS
    // ════════════════════════════════════════════════════════════════════════════

    const handleSyncPlayback = (data) => {
        if (data.by_user === 'system' || !isHost) {
            setCurrentTime(data.current_time);
            setIsPlaying(data.status === 'playing');

            // Player'ı senkronize et
            if (playerRef.current) {
                playerRef.current.seekTo(data.current_time);
                if (data.status === 'playing') {
                    playerRef.current.play();
                } else {
                    playerRef.current.pause();
                }
            }
        }
    };

    const handleReaction = (data) => {
        const reactionId = Date.now() + Math.random();
        setReactions(prev => [...prev, { ...data, id: reactionId }]);

        // 3 saniye sonra kaldır
        setTimeout(() => {
            setReactions(prev => prev.filter(r => r.id !== reactionId));
        }, 3000);
    };

    const handleChatMessage = (data) => {
        setMessages(prev => [...prev, data]);
        // Scroll to bottom
        setTimeout(() => {
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleViewerJoined = (data) => {
        toast.success(`${data.username} katıldı!`);
        setViewers(prev => {
            if (!prev.find(v => v.username === data.username)) {
                return [...prev, { username: data.username, id: data.user_id }];
            }
            return prev;
        });
    };

    const handleViewerLeft = (data) => {
        setViewers(prev => prev.filter(v => v.username !== data.username));
    };

    const handlePartyEnded = (data) => {
        toast.info('Watch Party sona erdi');
        setParty(null);
        onClose?.();
    };

    const handleVideoChanged = (data) => {
        setParty(prev => ({
            ...prev,
            video_url: data.video_url,
            video_title: data.video_title,
            embed_url: data.embed_url,
        }));
        setCurrentTime(0);
        setIsPlaying(false);
    };

    // ════════════════════════════════════════════════════════════════════════════
    // 🎮 CONTROL FUNCTIONS
    // ════════════════════════════════════════════════════════════════════════════

    const createWatchParty = async () => {
        if (!videoUrl.trim()) {
            toast.error('Video URL gerekli');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/rooms/${roomId}/watch-party/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    video_url: videoUrl,
                    allow_control: false,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setParty(data);
                setIsHost(true);
                setShowCreateModal(false);
                connectWebSocket(data.id);
                toast.success('Watch Party oluşturuldu! 🎉');
            } else {
                const error = await response.json();
                toast.error(error.error || 'Watch Party oluşturulamadı');
            }
        } catch (error) {
            console.error('Watch Party create error:', error);
            toast.error('Bağlantı hatası');
        } finally {
            setIsLoading(false);
        }
    };

    const joinWatchParty = async (partyId) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/watch-party/${partyId}/join/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                // Party detaylarını çek
                const partyResponse = await fetch(`${API_BASE_URL}/watch-party/${partyId}/`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                const partyData = await partyResponse.json();

                setParty(partyData);
                setIsHost(partyData.is_host);
                setViewers(partyData.viewers || []);
                setCurrentTime(partyData.current_time);
                setIsPlaying(partyData.status === 'playing');

                connectWebSocket(partyId);
                toast.success('Watch Party\'ye katıldın! 🎬');
            } else {
                const error = await response.json();
                toast.error(error.error || 'Katılınamadı');
            }
        } catch (error) {
            console.error('Watch Party join error:', error);
            toast.error('Bağlantı hatası');
        } finally {
            setIsLoading(false);
        }
    };

    const sendSync = (action) => {
        if (!isHost || !wsRef.current) return;

        wsRef.current.send(JSON.stringify({
            type: 'sync',
            action: action,
            current_time: currentTime,
            playback_rate: 1.0,
        }));
    };

    const sendReaction = (emoji) => {
        if (!wsRef.current) return;

        wsRef.current.send(JSON.stringify({
            type: 'reaction',
            emoji: emoji,
            video_time: currentTime,
        }));
    };

    const sendMessage = () => {
        if (!newMessage.trim() || !wsRef.current) return;

        wsRef.current.send(JSON.stringify({
            type: 'message',
            content: newMessage,
            video_time: currentTime,
        }));

        setNewMessage('');
    };

    const endParty = async () => {
        if (!party || !isHost) return;

        try {
            await fetch(`${API_BASE_URL}/watch-party/${party.id}/end/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
            });
        } catch (error) {
            console.error('End party error:', error);
        }
    };

    const togglePlay = () => {
        if (isHost) {
            const action = isPlaying ? 'pause' : 'play';
            sendSync(action);
        }
        setIsPlaying(!isPlaying);
    };

    const toggleFullscreen = () => {
        if (!containerRef.current) return;

        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    // ════════════════════════════════════════════════════════════════════════════
    // 🧹 CLEANUP
    // ════════════════════════════════════════════════════════════════════════════

    useEffect(() => {
        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
            if (heartbeatRef.current) {
                clearInterval(heartbeatRef.current);
            }
        };
    }, []);

    // ════════════════════════════════════════════════════════════════════════════
    // 🎨 RENDER
    // ════════════════════════════════════════════════════════════════════════════

    const REACTION_EMOJIS = ['👍', '❤️', '😂', '😮', '😢', '🔥', '👏', '🎉'];

    if (!party) {
        return (
            <div className="watch-together-container">
                <div className="watch-together-empty">
                    <h2>📺 Watch Together</h2>
                    <p>Arkadaşlarınla birlikte video izle!</p>

                    <button
                        className="create-party-btn"
                        onClick={() => setShowCreateModal(true)}
                    >
                        <FaPlus /> Yeni Watch Party Oluştur
                    </button>

                    <div className="supported-platforms">
                        <span>Desteklenen platformlar:</span>
                        <div className="platforms">
                            <span>YouTube</span>
                            <span>Twitch</span>
                            <span>Vimeo</span>
                            <span>Dailymotion</span>
                        </div>
                    </div>
                </div>

                {/* Create Modal */}
                {showCreateModal && (
                    <div className="watch-modal-overlay" onClick={() => setShowCreateModal(false)}>
                        <div className="watch-modal" onClick={e => e.stopPropagation()}>
                            <h3>🎬 Watch Party Oluştur</h3>
                            <input
                                type="url"
                                placeholder="Video URL'sini yapıştır..."
                                value={videoUrl}
                                onChange={e => setVideoUrl(e.target.value)}
                                autoFocus
                            />
                            <div className="modal-actions">
                                <button
                                    className="cancel-btn"
                                    onClick={() => setShowCreateModal(false)}
                                >
                                    İptal
                                </button>
                                <button
                                    className="create-btn"
                                    onClick={createWatchParty}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Oluşturuluyor...' : 'Oluştur'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="watch-together-container" ref={containerRef}>
            {/* Header */}
            <div className="watch-header">
                <div className="watch-title">
                    <span className="live-badge">CANLI</span>
                    <h3>{party.video_title || 'Watch Party'}</h3>
                </div>
                <div className="watch-viewers">
                    <FaUsers />
                    <span>{viewers.length} izleyici</span>
                </div>
                <button className="close-btn" onClick={onClose}>
                    <FaTimes />
                </button>
            </div>

            {/* Video Player */}
            <div className="watch-player">
                {party.video_source === 'youtube' && (
                    <iframe
                        ref={playerRef}
                        src={`https://www.youtube.com/embed/${extractYouTubeId(party.video_url)}?autoplay=${isPlaying ? 1 : 0}&start=${Math.floor(currentTime)}&enablejsapi=1`}
                        title="Watch Party"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                )}

                {party.video_source === 'direct' && (
                    <video
                        ref={playerRef}
                        src={party.video_url}
                        autoPlay={isPlaying}
                        muted={isMuted}
                    />
                )}

                {/* Reaction overlay */}
                <div className="reaction-overlay">
                    {reactions.map(r => (
                        <div
                            key={r.id}
                            className="floating-reaction"
                            style={{ left: `${Math.random() * 80 + 10}%` }}
                        >
                            {r.emoji}
                        </div>
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div className="watch-controls">
                <div className="control-left">
                    {isHost && (
                        <button onClick={togglePlay}>
                            {isPlaying ? <FaPause /> : <FaPlay />}
                        </button>
                    )}
                    <button onClick={() => setIsMuted(!isMuted)}>
                        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                    </button>
                </div>

                <div className="reactions-bar">
                    {REACTION_EMOJIS.map(emoji => (
                        <button
                            key={emoji}
                            className="reaction-btn"
                            onClick={() => sendReaction(emoji)}
                        >
                            {emoji}
                        </button>
                    ))}
                </div>

                <div className="control-right">
                    <button onClick={() => setShowChat(!showChat)}>
                        💬
                    </button>
                    <button onClick={toggleFullscreen}>
                        {isFullscreen ? <FaCompress /> : <FaExpand />}
                    </button>
                    {isHost && (
                        <button className="end-btn" onClick={endParty}>
                            Bitir
                        </button>
                    )}
                </div>
            </div>

            {/* Chat Sidebar */}
            {showChat && (
                <div className="watch-chat">
                    <div className="chat-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className="chat-message">
                                <img
                                    src={msg.avatar || '/default-avatar.png'}
                                    alt={msg.user}
                                    className="chat-avatar"
                                />
                                <div className="chat-content">
                                    <span className="chat-user">{msg.user}</span>
                                    <span className="chat-text">{msg.content}</span>
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>
                    <div className="chat-input">
                        <input
                            type="text"
                            placeholder="Mesaj yaz..."
                            value={newMessage}
                            onChange={e => setNewMessage(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' && sendMessage()}
                        />
                        <button onClick={sendMessage}>Gönder</button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Helper function
const extractYouTubeId = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : '';
};

export default WatchTogether;
