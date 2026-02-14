import { useState, useEffect, useRef } from 'react';

const useEnhancedCinema = (ws) => {
    // Player state
    const [currentVideo, setCurrentVideo] = useState('https://www.youtube.com/watch?v=jfKfPfyJRdk');
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isReady, setIsReady] = useState(false);

    // Playlist state
    const [playlist, setPlaylist] = useState([
        { id: 1, url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk', title: 'lofi hip hop radio \uD83D\uDCDA' },
    ]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showPlaylist, setShowPlaylist] = useState(false);
    const [inputUrl, setInputUrl] = useState('');

    // Reactions
    const [reactions, setReactions] = useState({});
    const [recentReactions, setRecentReactions] = useState([]);

    const playerRef = useRef(null);
    const isRemoteUpdate = useRef(false);

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

    // WebSocket message handler
    useEffect(() => {
        if (!ws.current) return;

        const handleMessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.type === 'media_sync') {
                    isRemoteUpdate.current = true;

                    switch (data.action) {
                        case 'change_url':
                            setCurrentVideo(data.payload.url);
                            setPlaying(false);
                            setIsReady(false);
                            break;
                        case 'play':
                            const currentTime = getCurrentTimeSafe();
                            if (Math.abs(currentTime - data.payload.time) > 2) {
                                playerRef.current?.seekTo(data.payload.time);
                            }
                            setPlaying(true);
                            break;
                        case 'pause':
                            setPlaying(false);
                            break;
                        case 'seek':
                            playerRef.current?.seekTo(data.payload.time);
                            break;
                        case 'playlist_update':
                            setPlaylist(data.payload.playlist);
                            break;
                        case 'reaction':
                            addReaction(data.payload.emoji, data.payload.username);
                            break;
                        default:
                            break;
                    }

                    setTimeout(() => { isRemoteUpdate.current = false; }, 1000);
                }
            } catch (e) {
                console.error('WS Error:', e);
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

    const handleAddToPlaylist = (e) => {
        e.preventDefault();
        if (!inputUrl.trim()) return;

        const newVideo = {
            id: Date.now(),
            url: inputUrl.trim(),
            title: `Video ${playlist.length + 1}`,
        };

        const newPlaylist = [...playlist, newVideo];
        setPlaylist(newPlaylist);
        sendSignal('playlist_update', { playlist: newPlaylist });
        setInputUrl('');
    };

    const playVideo = (index) => {
        if (index >= 0 && index < playlist.length) {
            setCurrentIndex(index);
            setCurrentVideo(playlist[index].url);
            setPlaying(true);
            setIsReady(false);
            sendSignal('change_url', { url: playlist[index].url });
        }
    };

    const nextVideo = () => {
        const nextIndex = (currentIndex + 1) % playlist.length;
        playVideo(nextIndex);
    };

    const previousVideo = () => {
        const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        playVideo(prevIndex);
    };

    const removeFromPlaylist = (index) => {
        const newPlaylist = playlist.filter((_, i) => i !== index);
        setPlaylist(newPlaylist);
        sendSignal('playlist_update', { playlist: newPlaylist });

        if (index === currentIndex && newPlaylist.length > 0) {
            playVideo(0);
        }
    };

    const addReaction = (emoji, username = 'You') => {
        const reactionId = Date.now() + Math.random();
        const newReaction = { id: reactionId, emoji, username, x: Math.random() * 80 + 10 };

        setRecentReactions(prev => [...prev, newReaction]);
        setReactions(prev => ({ ...prev, [emoji]: (prev[emoji] || 0) + 1 }));

        setTimeout(() => {
            setRecentReactions(prev => prev.filter(r => r.id !== reactionId));
        }, 3000);
    };

    const sendReaction = (emoji) => {
        addReaction(emoji);
        sendSignal('reaction', { emoji, username: 'User' });
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return {
        currentVideo,
        playing, setPlaying,
        volume,
        progress, setProgress,
        duration, setDuration,
        isReady, setIsReady,
        playlist,
        currentIndex,
        showPlaylist, setShowPlaylist,
        inputUrl, setInputUrl,
        reactions,
        recentReactions,
        playerRef,
        getCurrentTimeSafe,
        sendSignal,
        handleAddToPlaylist,
        playVideo,
        nextVideo,
        previousVideo,
        removeFromPlaylist,
        sendReaction,
        formatTime
    };
};

export default useEnhancedCinema;
