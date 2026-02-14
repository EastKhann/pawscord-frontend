import { useState, useEffect, useRef, useCallback } from 'react';
import { API_BASE_URL, WS_PROTOCOL, API_HOST } from '../../utils/constants';
import toast from '../../utils/toast';

export const REACTION_EMOJIS = ['\uD83D\uDC4D', '\u2764\uFE0F', '\uD83D\uDE02', '\uD83D\uDE2E', '\uD83D\uDE22', '\uD83D\uDD25', '\uD83D\uDC4F', '\uD83C\uDF89'];

export const extractYouTubeId = (url) => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : '';
};

export default function useWatchParty(roomId, onClose) {
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

  // ── WS message handlers ──────────────────────────────────────────────────
  const handleSyncPlayback = useCallback((data) => {
    if (data.by_user === 'system' || !isHost) {
      setCurrentTime(data.current_time);
      setIsPlaying(data.status === 'playing');
      if (playerRef.current) {
        playerRef.current.seekTo(data.current_time);
        data.status === 'playing' ? playerRef.current.play() : playerRef.current.pause();
      }
    }
  }, [isHost]);

  const handleReaction = useCallback((data) => {
    const reactionId = Date.now() + Math.random();
    setReactions(prev => [...prev, { ...data, id: reactionId }]);
    setTimeout(() => setReactions(prev => prev.filter(r => r.id !== reactionId)), 3000);
  }, []);

  const handleChatMessage = useCallback((data) => {
    setMessages(prev => [...prev, data]);
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  }, []);

  const handleViewerJoined = useCallback((data) => {
    toast.success(`${data.username} kat\u0131ld\u0131!`);
    setViewers(prev => prev.find(v => v.username === data.username) ? prev : [...prev, { username: data.username, id: data.user_id }]);
  }, []);

  const handleViewerLeft = useCallback((data) => {
    setViewers(prev => prev.filter(v => v.username !== data.username));
  }, []);

  const handlePartyEnded = useCallback(() => {
    toast.info('Watch Party sona erdi');
    setParty(null);
    onClose?.();
  }, [onClose]);

  const handleVideoChanged = useCallback((data) => {
    setParty(prev => ({ ...prev, video_url: data.video_url, video_title: data.video_title, embed_url: data.embed_url }));
    setCurrentTime(0);
    setIsPlaying(false);
  }, []);

  // ── WebSocket connection ─────────────────────────────────────────────────
  const connectWebSocket = useCallback((partyId) => {
    if (wsRef.current) wsRef.current.close();

    const ws = new WebSocket(`${WS_PROTOCOL}://${API_HOST}/ws/watch-party/${partyId}/?token=${token}`);

    ws.onopen = () => ws.send(JSON.stringify({ type: 'request_sync' }));
    ws.onmessage = (event) => {
      const d = JSON.parse(event.data);
      const handlers = {
        sync_playback: handleSyncPlayback, reaction: handleReaction,
        chat_message: handleChatMessage, viewer_joined: handleViewerJoined,
        viewer_left: handleViewerLeft, party_ended: handlePartyEnded,
        video_changed: handleVideoChanged
      };
      handlers[d.type]?.(d);
    };
    ws.onerror = (err) => console.error('\uD83D\uDCFA Watch Party WebSocket error:', err);

    wsRef.current = ws;
    heartbeatRef.current = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'heartbeat', local_time: currentTime, is_buffering: false }));
      }
    }, 5000);
  }, [token, currentTime, handleSyncPlayback, handleReaction, handleChatMessage, handleViewerJoined, handleViewerLeft, handlePartyEnded, handleVideoChanged]);

  // ── API calls ────────────────────────────────────────────────────────────
  const createWatchParty = async () => {
    if (!videoUrl.trim()) { toast.error('Video URL gerekli'); return; }
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/rooms/${roomId}/watch-party/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ video_url: videoUrl, allow_control: false })
      });
      if (res.ok) {
        const data = await res.json();
        setParty(data); setIsHost(true); setShowCreateModal(false);
        connectWebSocket(data.id);
        toast.success('Watch Party olu\u015fturuldu! \uD83C\uDF89');
      } else {
        const err = await res.json();
        toast.error(err.error || 'Watch Party olu\u015fturulamad\u0131');
      }
    } catch { toast.error('Ba\u011flant\u0131 hatas\u0131'); }
    finally { setIsLoading(false); }
  };

  const joinWatchParty = async (partyId) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/watch-party/${partyId}/join/`, {
        method: 'POST', headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const partyRes = await fetch(`${API_BASE_URL}/watch-party/${partyId}/`, { headers: { 'Authorization': `Bearer ${token}` } });
        const partyData = await partyRes.json();
        setParty(partyData); setIsHost(partyData.is_host);
        setViewers(partyData.viewers || []); setCurrentTime(partyData.current_time);
        setIsPlaying(partyData.status === 'playing');
        connectWebSocket(partyId);
        toast.success('Watch Party\'ye kat\u0131ld\u0131n! \uD83C\uDFAC');
      } else {
        const err = await res.json();
        toast.error(err.error || 'Kat\u0131l\u0131namad\u0131');
      }
    } catch { toast.error('Ba\u011flant\u0131 hatas\u0131'); }
    finally { setIsLoading(false); }
  };

  // ── Control functions ────────────────────────────────────────────────────
  const sendSync = (action) => {
    if (!isHost || !wsRef.current) return;
    wsRef.current.send(JSON.stringify({ type: 'sync', action, current_time: currentTime, playback_rate: 1.0 }));
  };

  const sendReaction = (emoji) => {
    if (!wsRef.current) return;
    wsRef.current.send(JSON.stringify({ type: 'reaction', emoji, video_time: currentTime }));
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !wsRef.current) return;
    wsRef.current.send(JSON.stringify({ type: 'message', content: newMessage, video_time: currentTime }));
    setNewMessage('');
  };

  const endParty = async () => {
    if (!party || !isHost) return;
    try { await fetch(`${API_BASE_URL}/watch-party/${party.id}/end/`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } }); }
    catch (err) { console.error('End party error:', err); }
  };

  const togglePlay = () => {
    if (isHost) sendSync(isPlaying ? 'pause' : 'play');
    setIsPlaying(!isPlaying);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) { containerRef.current.requestFullscreen(); setIsFullscreen(true); }
    else { document.exitFullscreen(); setIsFullscreen(false); }
  };

  // ── Cleanup ──────────────────────────────────────────────────────────────
  useEffect(() => () => {
    wsRef.current?.close();
    if (heartbeatRef.current) clearInterval(heartbeatRef.current);
  }, []);

  return {
    party, isLoading, showCreateModal, setShowCreateModal, videoUrl, setVideoUrl,
    viewers, messages, newMessage, setNewMessage, isHost, isPlaying, currentTime,
    isMuted, setIsMuted, isFullscreen, showChat, setShowChat, reactions,
    playerRef, containerRef, chatEndRef,
    createWatchParty, joinWatchParty, sendReaction, sendMessage, endParty,
    togglePlay, toggleFullscreen
  };
}
