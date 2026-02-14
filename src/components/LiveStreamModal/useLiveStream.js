import { useState, useRef, useEffect } from 'react';
import toast from '../../utils/toast';

const rtcConfig = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
    ]
};

const useLiveStream = ({ roomSlug, ws, onClose }) => {
    const [isStreaming, setIsStreaming] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [streamType, setStreamType] = useState('camera');
    const [viewers, setViewers] = useState(0);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');

    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const peerConnectionsRef = useRef({});

    const createPeerConnection = async (viewerId) => {
        if (!streamRef.current) return;
        const pc = new RTCPeerConnection(rtcConfig);
        peerConnectionsRef.current[viewerId] = pc;
        streamRef.current.getTracks().forEach(track => { pc.addTrack(track, streamRef.current); });
        pc.onicecandidate = (event) => {
            if (event.candidate && ws.current?.readyState === WebSocket.OPEN) {
                ws.current.send(JSON.stringify({ type: 'ice_candidate', candidate: event.candidate, viewer_id: viewerId }));
            }
        };
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({ type: 'stream_offer', sdp: pc.localDescription, viewer_id: viewerId }));
        }
    };

    useEffect(() => {
        if (!ws.current) return;
        const handleMessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'stream_viewer_count') setViewers(data.count);
                else if (data.type === 'stream_chat') {
                    setChatMessages(prev => [...prev, { id: Date.now(), user: data.username, message: data.message, timestamp: new Date().toLocaleTimeString() }]);
                } else if (data.type === 'stream_viewer_join') createPeerConnection(data.viewerId);
            } catch (e) { console.error('Stream WS error:', e); }
        };
        ws.current.addEventListener('message', handleMessage);
        return () => ws.current?.removeEventListener('message', handleMessage);
    }, [ws]);

    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const startStream = async () => {
        try {
            let stream;
            if (streamType === 'camera') {
                stream = await navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 30 } }, audio: true });
            } else {
                stream = await navigator.mediaDevices.getDisplayMedia({ video: { width: { ideal: 1920 }, height: { ideal: 1080 }, frameRate: { ideal: 30 } }, audio: true });
            }
            streamRef.current = stream;
            if (videoRef.current) videoRef.current.srcObject = stream;
            setIsStreaming(true);
            if (ws.current?.readyState === WebSocket.OPEN) {
                ws.current.send(JSON.stringify({ type: 'stream_start', room_slug: roomSlug, stream_type: streamType }));
            }
        } catch (error) { console.error('Failed to start stream:', error); toast.error('\u274C Failed to start stream. Please check permissions.'); }
    };

    const stopStream = () => {
        if (streamRef.current) { streamRef.current.getTracks().forEach(track => track.stop()); streamRef.current = null; }
        Object.values(peerConnectionsRef.current).forEach(pc => pc.close());
        peerConnectionsRef.current = {};
        if (videoRef.current) videoRef.current.srcObject = null;
        setIsStreaming(false);
        if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({ type: 'stream_stop', room_slug: roomSlug }));
        }
    };

    const toggleMute = () => {
        if (streamRef.current) { streamRef.current.getAudioTracks().forEach(track => { track.enabled = isMuted; }); setIsMuted(!isMuted); }
    };

    const sendChatMessage = (e) => {
        e.preventDefault();
        if (!chatInput.trim()) return;
        if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({ type: 'stream_chat', room_slug: roomSlug, message: chatInput }));
        }
        setChatInput('');
    };

    return {
        isStreaming, isMuted, streamType, setStreamType, viewers,
        chatMessages, chatInput, setChatInput, videoRef,
        startStream, stopStream, toggleMute, sendChatMessage
    };
};

export default useLiveStream;
