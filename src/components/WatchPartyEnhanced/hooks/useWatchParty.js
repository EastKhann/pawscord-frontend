// WatchPartyEnhanced/hooks/useWatchParty.js
import { useState, useEffect, useRef, useCallback } from 'react';

const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const useWatchParty = ({ roomId, currentUser, websocket, initialVideoUrl }) => {
    const videoRef = useRef(null);
    const chatRef = useRef(null);
    const [videoUrl, setVideoUrl] = useState(initialVideoUrl);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [isHost, setIsHost] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [quality, setQuality] = useState('auto');
    const [showSettings, setShowSettings] = useState(false);
    const [syncStatus, setSyncStatus] = useState('synced');
    const [reactions, setReactions] = useState({});

    const sendWsControl = useCallback((action, extra = {}) => {
        if (isHost && websocket) {
            websocket.send(JSON.stringify({
                type: 'watch_party_control', action, roomId,
                currentTime: videoRef.current?.currentTime, sender: currentUser, ...extra
            }));
        }
    }, [isHost, websocket, roomId, currentUser]);

    const handlePlay = useCallback(() => {
        if (!videoRef.current) return;
        videoRef.current.play();
        setIsPlaying(true);
        sendWsControl('play');
    }, [sendWsControl]);

    const handlePause = useCallback(() => {
        if (!videoRef.current) return;
        videoRef.current.pause();
        setIsPlaying(false);
        sendWsControl('pause');
    }, [sendWsControl]);

    const handleSeek = useCallback((time) => {
        if (!videoRef.current) return;
        videoRef.current.currentTime = time;
        setCurrentTime(time);
        sendWsControl('seek', { currentTime: time });
    }, [sendWsControl]);

    const handleSkip = useCallback((seconds) => {
        if (!videoRef.current) return;
        const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
        handleSeek(newTime);
    }, [currentTime, duration, handleSeek]);

    const handleVolumeChange = useCallback((newVolume) => {
        if (!videoRef.current) return;
        videoRef.current.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    }, []);

    const toggleMute = useCallback(() => {
        if (!videoRef.current) return;
        const newMuted = !isMuted;
        videoRef.current.muted = newMuted;
        setIsMuted(newMuted);
        setVolume(newMuted ? 0 : (videoRef.current.volume || 0.5));
    }, [isMuted]);

    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            videoRef.current?.requestFullscreen?.();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen?.();
            setIsFullscreen(false);
        }
    }, []);

    const handlePlaybackRateChange = useCallback((rate) => {
        if (!videoRef.current) return;
        videoRef.current.playbackRate = rate;
        setPlaybackRate(rate);
        sendWsControl('playback_rate', { playbackRate: rate });
    }, [sendWsControl]);

    const sendChatMessage = useCallback(() => {
        if (!newMessage.trim() || !websocket) return;
        const message = {
            type: 'watch_party_chat', roomId, sender: currentUser,
            message: newMessage, timestamp: Date.now()
        };
        websocket.send(JSON.stringify(message));
        setChatMessages(prev => [...prev, { ...message, isOwn: true }]);
        setNewMessage('');
        setTimeout(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, 100);
    }, [newMessage, websocket, roomId, currentUser]);

    const sendReaction = useCallback((emoji) => {
        if (!websocket) return;
        websocket.send(JSON.stringify({
            type: 'watch_party_reaction', roomId, sender: currentUser, emoji, timestamp: Date.now()
        }));
        setReactions(prev => ({ ...prev, [currentUser]: { emoji, timestamp: Date.now() } }));
        setTimeout(() => {
            setReactions(prev => { const n = { ...prev }; delete n[currentUser]; return n; });
        }, 3000);
    }, [websocket, roomId, currentUser]);

    const requestSync = useCallback(() => {
        if (!websocket) return;
        setSyncStatus('syncing');
        websocket.send(JSON.stringify({ type: 'watch_party_sync_request', roomId, sender: currentUser }));
    }, [websocket, roomId, currentUser]);

    // WebSocket message handler
    useEffect(() => {
        if (!websocket) return;
        const handleMessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'watch_party_control' && data.sender !== currentUser) {
                    switch (data.action) {
                        case 'play': videoRef.current.currentTime = data.currentTime; videoRef.current.play(); setIsPlaying(true); break;
                        case 'pause': videoRef.current.currentTime = data.currentTime; videoRef.current.pause(); setIsPlaying(false); break;
                        case 'seek': videoRef.current.currentTime = data.currentTime; setCurrentTime(data.currentTime); break;
                        case 'playback_rate': videoRef.current.playbackRate = data.playbackRate; setPlaybackRate(data.playbackRate); break;
                    }
                    setSyncStatus('synced');
                }
                if (data.type === 'watch_party_chat' && data.sender !== currentUser) {
                    setChatMessages(prev => [...prev, { ...data, isOwn: false }]);
                    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
                }
                if (data.type === 'watch_party_reaction' && data.sender !== currentUser) {
                    setReactions(prev => ({ ...prev, [data.sender]: { emoji: data.emoji, timestamp: data.timestamp } }));
                    setTimeout(() => {
                        setReactions(prev => { const n = { ...prev }; delete n[data.sender]; return n; });
                    }, 3000);
                }
                if (data.type === 'watch_party_sync_response' && data.sender !== currentUser) {
                    videoRef.current.currentTime = data.currentTime;
                    if (data.isPlaying) { videoRef.current.play(); setIsPlaying(true); }
                    else { videoRef.current.pause(); setIsPlaying(false); }
                    setSyncStatus('synced');
                }
            } catch (error) { console.error('Watch Party WS error:', error); }
        };
        websocket.addEventListener('message', handleMessage);
        return () => websocket.removeEventListener('message', handleMessage);
    }, [websocket, currentUser]);

    // Video progress tracking
    useEffect(() => {
        if (!videoRef.current) return;
        const interval = setInterval(() => {
            if (videoRef.current) {
                setCurrentTime(videoRef.current.currentTime);
                setDuration(videoRef.current.duration || 0);
            }
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return {
        videoRef, chatRef, videoUrl, isPlaying, currentTime, duration,
        volume, isMuted, isFullscreen, playbackRate, isHost, chatMessages,
        newMessage, setNewMessage, quality, setQuality, showSettings, setShowSettings,
        syncStatus, reactions, formatTime,
        handlePlay, handlePause, handleSeek, handleSkip,
        handleVolumeChange, toggleMute, toggleFullscreen,
        handlePlaybackRateChange, sendChatMessage, sendReaction, requestSync
    };
};

export default useWatchParty;
