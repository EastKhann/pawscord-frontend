// frontend/src/App.js (SAĞ ALT KÖŞEYE PAWSCORD LOGOSU VE METNİ EKLENDİ)

import React, { useState, useEffect, useRef, useCallback } from 'react';
import RoomList from './RoomList';
import ChatUserList from './ChatUserList';
import UserProfilePanel from './UserProfilePanel';
import Message from './Message';
import MessageEditForm from './MessageEditForm';
import ImageModal from './ImageModal';
import ReplyPreview from './ReplyPreview';

const NGROK_HOST = 'pseudostudiously-reflexional-clara.ngrok-free.dev';
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_HOST = isLocal ? 'localhost:8000' : NGROK_HOST;
const API_PROTOCOL = isLocal ? 'http' : 'https';
const WS_PROTOCOL = isLocal ? 'ws' : 'wss';
const MESSAGE_HISTORY_ROOM_URL = `${API_PROTOCOL}://${API_HOST}/api/messages/history/room/`;
const MESSAGE_HISTORY_DM_URL = `${API_PROTOCOL}://${API_HOST}/api/messages/history/dm/`;
const ROOM_LIST_URL = `${API_PROTOCOL}://${API_HOST}/api/rooms/list/`;
const CONVERSATION_LIST_URL = `${API_PROTOCOL}://${API_HOST}/api/conversations/`;
const GET_OR_CREATE_CONVERSATION_URL = `${API_PROTOCOL}://${API_HOST}/api/conversations/find_or_create/`;
const IMAGE_UPLOAD_URL = `${API_PROTOCOL}://${API_HOST}/api/messages/upload_image/`;
const ALL_USERS_URL = `${API_PROTOCOL}://${API_HOST}/api/users/list_all/`;
const UPDATE_PROFILE_URL = `${API_PROTOCOL}://${API_HOST}/api/users/update_profile/`;
const DEFAULT_AVATARS_URL = `${API_PROTOCOL}://${API_HOST}/api/users/default_avatars/`;
const MARK_AS_READ_URL = `${API_PROTOCOL}://${API_HOST}/api/chats/mark_as_read/`;
const ICE_SERVERS = [{ urls: 'stun:stun.l.google.com:19302' }];
const ADMIN_USER = 'Doğukan';

const EMOJI_LIST = ['😀', '😂', '😍', '🤔', '👍', '🙏', '🔥', '🎉', '💡', '🚀', '💻', '💡', '📌', '🛠️', '⚙️', '🐈', '🐕', '❤️', '🌟', '😊'];

const getTemporaryId = () => Date.now() + Math.floor(Math.random() * 1000);

function App() {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [username, setUsername] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [roomOptions, setRoomOptions] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [activeChat, setActiveChat] = useState({ type: 'room', id: 'genel' });
    const [isConnected, setIsConnected] = useState(false);
    const [unreadCounts, setUnreadCounts] = useState({});
    const [voiceUsers, setVoiceUsers] = useState({});
    const [isInVoiceChat, setIsInVoiceChat] = useState(false);
    const [typingUsers, setTypingUsers] = useState([]);
    const [remoteVolumes, setRemoteVolumes] = useState({});
    const [currentVoiceRoom, setCurrentVoiceRoom] = useState(null);
    const [chatUsers, setChatUsers] = useState([]);
    const [pendingJoinRoom, setPendingJoinRoom] = useState(null);
    const [isVideoEnabled, setIsVideoEnabled] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [hasFetchedAllUsers, setHasFetchedAllUsers] = useState(false);
    const [showProfilePanel, setShowProfilePanel] = useState(false);
    const [defaultAvatars, setDefaultAvatars] = useState([]);
    const [editingMessage, setEditingMessage] = useState(null);
    const [zoomedImage, setZoomedImage] = useState(null);
    const [replyingTo, setReplyingTo] = useState(null);
    const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);

    const ws = useRef(null);
    const statusWsRef = useRef(null);
    const messagesEndRef = useRef(null);
    const notificationSoundRef = useRef(null);
    const voiceWsRef = useRef(null);
    const peerConnectionsRef = useRef({});
    const localStreamRef = useRef(null);
    const typingTimeoutRef = useRef(null);
    const localVideoRefs = useRef(null);
    const remoteVideoRefs = useRef({});
    const fileInputRef = useRef(null);
    const activeChatRef = useRef(activeChat);
    const dragCounter = useRef(0);
    const emojiPickerRef = useRef(null);
    const messageInputRef = useRef(null);

    const getDeterministicAvatar = useCallback((username) => {
        if (!username || defaultAvatars.length === 0) {
            return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        }
        let hash = 0;
        for (let i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash % defaultAvatars.length);
        return defaultAvatars[index];
    }, [defaultAvatars]);

    useEffect(() => { activeChatRef.current = activeChat; }, [activeChat]);
    useEffect(() => { notificationSoundRef.current = new Audio('/sounds/notification.mp3'); }, []);
    
    const isAdmin = username === ADMIN_USER;

    const fetchRoomOptions = useCallback(async () => {
        try {
            const response = await fetch(ROOM_LIST_URL);
            const data = await response.json();
            if (Array.isArray(data)) setRoomOptions(data);
        } catch (error) { console.error("[HATA] Oda listesi çekilemedi:", error); }
    }, []);

    const fetchConversations = useCallback(async () => {
        if (!username) return;
        try {
            const response = await fetch(`${CONVERSATION_LIST_URL}?username=${encodeURIComponent(username)}`);
            const data = await response.json();
            if (response.ok) setConversations(data);
            else console.error("DM listesi alınamadı:", data.error);
        } catch (error) { console.error("[HATA] DM listesi çekilemedi:", error); }
    }, [username]);

    const fetchAllUsers = useCallback(async () => {
        if (!username) return;
        try {
            const response = await fetch(ALL_USERS_URL);
            const data = await response.json();
            if (response.ok && Array.isArray(data)) {
                setAllUsers(data.sort((a, b) => a.username.localeCompare(b.username)));
            } else {
                setAllUsers([]);
            }
        } catch (error) {
            console.error("[HATA] Tüm kullanıcılar çekilemedi:", error);
            setAllUsers([]);
        } finally {
            setHasFetchedAllUsers(true);
        }
    }, [username]);

    const markChatAsRead = useCallback((chatType, chatId) => {
        if (!username || !chatId) return;

        const body = { username };
        if (chatType === 'room') {
            body.room_slug = chatId;
        } else if (chatType === 'dm') {
            body.conversation_id = chatId;
        }

        fetch(MARK_AS_READ_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        .then(response => {
            if(!response.ok) console.error("Okundu olarak işaretlenemedi:", response.status);
        })
        .catch(err => console.error("Okundu olarak işaretleme API hatası:", err));

    }, [username]);
    
    const handleProfileUpdate = useCallback((updatedUserData) => {
        setAllUsers(prevUsers => {
            const userExists = prevUsers.some(u => u.username === updatedUserData.username);
            if (userExists) {
                return prevUsers.map(user => 
                    user.username === updatedUserData.username ? { ...user, ...updatedUserData } : user
                );
            } else {
                return [...prevUsers, updatedUserData].sort((a, b) => a.username.localeCompare(b.username));
            }
        });
        setConversations(prev => prev.map(conv => ({
            ...conv,
            participants: conv.participants.map(p => p.username === updatedUserData.username ? { ...p, ...updatedUserData } : p)
        })));
    }, []);
    
    const sendRoomManagementSignal = useCallback((type, roomSlug, channelType) => {
        const payload = { type, room_slug: roomSlug, ...(type === 'add_room' && { channel_type: channelType }), username };
        const ws = statusWsRef.current;
        if (!ws || ws.readyState !== WebSocket.OPEN) {
            console.error(`[WS HATA] Global Status WS KAPALI. İşlem: ${type} iptal.`);
            fetchRoomOptions();
            return;
        }
        try { ws.send(JSON.stringify(payload)); } catch (error) { console.error(`[WS GÖNDERİM HATA]: ${error}`); fetchRoomOptions(); }
    }, [username, fetchRoomOptions]);

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    const sendSignal = useCallback((signal) => { if (voiceWsRef.current?.readyState === WebSocket.OPEN) voiceWsRef.current.send(JSON.stringify(signal)); }, []);
    
    const handleVoiceStateUpdate = useCallback((data) => {
        if (data.initial_load) { setVoiceUsers(data.rooms); return; }
        setVoiceUsers(prev => ({ ...prev, ...data.rooms }));
    }, []);

    const setRemoteVolume = useCallback((partnerUsername, volume) => {
        setRemoteVolumes(prev => ({ ...prev, [partnerUsername]: volume }));
        const audioEl = document.getElementById(`audio-${partnerUsername}`);
        if (audioEl) audioEl.volume = volume / 100;
    }, []);

    const handleRemoteStream = useCallback((partnerUsername, stream) => {
        let audioEl = document.getElementById(`audio-${partnerUsername}`);
        if (!audioEl) {
            audioEl = document.createElement('audio');
            audioEl.id = `audio-${partnerUsername}`;
            audioEl.autoplay = true;
            document.body.appendChild(audioEl);
        }
        audioEl.srcObject = stream;
        audioEl.volume = (remoteVolumes[partnerUsername] || 100) / 100;
        const videoEl = remoteVideoRefs.current[partnerUsername];
        if (videoEl) videoEl.srcObject = stream;
    }, [remoteVolumes]);

    const createPeerConnection = useCallback((partnerUsername, stream) => {
        const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
        stream.getTracks().forEach(track => pc.addTrack(track, stream));
        pc.ontrack = (event) => handleRemoteStream(partnerUsername, event.streams[0]);
        pc.onicecandidate = (event) => {
            if (event.candidate) sendSignal({ type: 'candidate', candidate: event.candidate, receiver_username: partnerUsername, sender_username: username });
        };
        peerConnectionsRef.current[partnerUsername] = pc;
        return pc;
    }, [username, sendSignal, handleRemoteStream]);
    
    const leaveVoiceChat = useCallback(() => {
        localStreamRef.current?.getTracks().forEach(track => track.stop());
        localStreamRef.current = null;
        Object.keys(peerConnectionsRef.current).forEach(p => {
            document.getElementById(`audio-${p}`)?.remove();
            if (remoteVideoRefs.current[p]) remoteVideoRefs.current[p] = null;
        });
        if (voiceWsRef.current?.readyState === WebSocket.OPEN) {
            const room = voiceWsRef.current.url.match(/voice\/([^/]+)/)?.[1];
            sendSignal({ type: 'leave', sender_username: username, room });
        }
        voiceWsRef.current?.close(1000, 'manual_leave');
        voiceWsRef.current = null;
        Object.values(peerConnectionsRef.current).forEach(pc => pc.close());
        peerConnectionsRef.current = {};
        setCurrentVoiceRoom(null);
        setIsInVoiceChat(false);
    }, [username, sendSignal]);

    const joinVoiceChat = useCallback(async (roomSlug) => {
        if (voiceWsRef.current) return;
        let stream;
        try {
            const mediaConstraints = { audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }, video: true };
            stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
            stream.getVideoTracks().forEach(track => track.enabled = false);
            setIsVideoEnabled(false);
            setIsMuted(false);
            localStreamRef.current = stream;
        } catch (error) {
            alert("Mikrofon ve Kamera izni gereklidir. Hata: " + error.message);
            return;
        }
        const encodedUsername = encodeURIComponent(username);
        const voiceWs = new WebSocket(`${WS_PROTOCOL}://${API_HOST}/ws/voice/${roomSlug}/?username=${encodedUsername}`);
        voiceWsRef.current = voiceWs;
        voiceWs.onerror = () => { leaveVoiceChat(); };
        voiceWs.onopen = () => { setIsInVoiceChat(true); setCurrentVoiceRoom(roomSlug); sendSignal({ type: 'join', sender_username: username, room: roomSlug }); };
        voiceWs.onmessage = async (event) => {
            const signal = JSON.parse(event.data);
            const sender = signal.sender_username;
            if (signal.type === 'voice_state_update' || sender === username) return;
            let pc = peerConnectionsRef.current[sender];
            if (!pc) {
                if (signal.type !== 'offer' && signal.type !== 'join') return;
                pc = createPeerConnection(sender, stream);
            }
            if (signal.type === 'join') {
                const offer = await pc.createOffer();
                await pc.setLocalDescription(offer);
                sendSignal({ type: 'offer', sdp: pc.localDescription, receiver_username: sender, sender_username: username });
            } else if (signal.type === 'offer') {
                if (pc.signalingState !== 'stable' && pc.signalingState !== 'have-local-pranswer') return;
                await pc.setRemoteDescription(new RTCSessionDescription(signal.sdp));
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);
                sendSignal({ type: 'answer', sdp: pc.localDescription, receiver_username: sender, sender_username: username });
            } else if (signal.type === 'answer') {
                if (pc.signalingState !== 'have-local-offer') return;
                await pc.setRemoteDescription(new RTCSessionDescription(signal.sdp));
            } else if (signal.type === 'candidate' && pc.remoteDescription && signal.candidate) {
                try { await pc.addIceCandidate(new RTCIceCandidate(signal.candidate)); } catch (e) { console.error('ICE adayı eklenirken hata:', e); }
            }
        };
        voiceWs.onclose = () => { leaveVoiceChat(); };
    }, [username, createPeerConnection, sendSignal, leaveVoiceChat]);

    const toggleVideo = () => {
        if (localStreamRef.current) {
            const videoTrack = localStreamRef.current.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setIsVideoEnabled(videoTrack.enabled);
            }
        }
    };
    
    const toggleMute = useCallback(() => {
        if (localStreamRef.current) {
            const audioTrack = localStreamRef.current.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setIsMuted(!audioTrack.enabled);
            }
        }
    }, []);

    const handleClearChat = useCallback(async () => {
        if (!isAdmin || !window.confirm(`'${activeChat.id}' odasındaki tüm mesajları kalıcı olarak silmek istediğinizden emin misiniz?`)) return;
        try {
            const response = await fetch(`${API_PROTOCOL}://${API_HOST}/api/rooms/${activeChat.id}/clear/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: username }) });
            if (response.ok) {
                setMessages([{ type: 'system_message', id: getTemporaryId(), message: `Sohbet yönetici tarafından temizlendi.` }]);
            } else {
                const data = await response.json();
                alert(`Hata: ${data.error || 'Sohbet temizlenemedi.'}`);
            }
        } catch (error) {
            alert("Sohbet temizlenirken bir ağ hatası oluştu.");
        }
    }, [activeChat, isAdmin, username]);

    const connectWebSocket = useCallback(() => {
        if (!isAuthenticated || !activeChat.id) return;
        ws.current?.close(1000, 'chat_change');
        setTypingUsers([]);
        
        const encodedUsername = encodeURIComponent(username);
        let DYNAMIC_WS_URL;
        if (activeChat.type === 'room') DYNAMIC_WS_URL = `${WS_PROTOCOL}://${API_HOST}/ws/chat/${activeChat.id}/?username=${encodedUsername}`;
        else if (activeChat.type === 'dm') DYNAMIC_WS_URL = `${WS_PROTOCOL}://${API_HOST}/ws/dm/${activeChat.id}/?username=${encodedUsername}`;
        else return;

        const newWs = new WebSocket(DYNAMIC_WS_URL);
        ws.current = newWs;

        newWs.onopen = () => {
            console.log(`WebSocket bağlandı: ${DYNAMIC_WS_URL}`);
            let historyUrl;
            if (activeChat.type === 'room') historyUrl = `${MESSAGE_HISTORY_ROOM_URL}${activeChat.id}/`;
            else if (activeChat.type === 'dm') historyUrl = `${MESSAGE_HISTORY_DM_URL}${activeChat.id}/`;

            if (historyUrl) {
                fetch(historyUrl).then(res => res.json()).then(data => {
                    setMessages(Array.isArray(data) ? data : []);
                }).catch(err => console.error("Geçmiş yüklenemedi:", err));
            }
            setIsConnected(true);
        };

        newWs.onmessage = (event) => {
            const data = JSON.parse(event.data);
            
            if (data.type === 'system_message') {
                setMessages(prev => [...prev, { ...data, id: getTemporaryId() }]);
            } else if (data.type === 'message_deleted') {
                setMessages(prev => prev.filter(msg => msg.id !== data.message_id));
            } else if (data.type === 'message_updated') {
                setMessages(prev => prev.map(msg => msg.id === data.message.id ? data.message : msg));
            } 
            else if (data.type === 'chat' || data.type === 'dm') {
                setMessages((prev) => {
                    const tempMessageExists = data.temp_id && prev.some(msg => msg.temp_id === data.temp_id);
                    if (tempMessageExists) {
                        return prev.map(msg => (msg.temp_id === data.temp_id ? data : msg));
                    }
                    if (!prev.some(msg => msg.id === data.id)) {
                        return [...prev, data];
                    }
                    return prev; 
                });
            } else if (data.type === 'chat_user_list_update') {
                setChatUsers(data.users);
            } else if (data.type === 'typing_status_update') {
                setTypingUsers(prev => {
                    const isTyping = prev.includes(data.username);
                    if (data.is_typing && !isTyping) return [...prev, data.username];
                    if (!data.is_typing && isTyping) return prev.filter(u => u !== data.username);
                    return prev;
                });
            }
        };
        newWs.onclose = () => { console.log(`WebSocket kapandı: ${DYNAMIC_WS_URL}`); setIsConnected(false); setTypingUsers([]); };
        newWs.onerror = (err) => { console.error("WebSocket Hatası:", err); setIsConnected(false); };
        
    }, [isAuthenticated, activeChat, username]); 

    useEffect(() => {
        const key = `${activeChat.type}-${activeChat.id}`;
        if (unreadCounts[key] > 0) {
            setUnreadCounts(prev => ({ ...prev, [key]: 0 }));
        }
        if (isAuthenticated && activeChat.id) {
            markChatAsRead(activeChat.type, activeChat.id);
        }
    }, [activeChat, isAuthenticated, markChatAsRead, unreadCounts]); 

    useEffect(() => { const stored = localStorage.getItem('chat_username'); if (stored) { setUsername(stored); setIsAuthenticated(true); } }, []);
    
    useEffect(() => {
        const fetchInitialData = async () => {
            if (isAuthenticated) {
                await fetchAllUsers();
                await fetchRoomOptions();
                await fetchConversations();
                setIsInitialDataLoaded(true);
            }
        };
        fetchInitialData();
    }, [isAuthenticated, fetchAllUsers, fetchRoomOptions, fetchConversations]);
    
    useEffect(() => {
        const fetchDefaultAvatars = async () => {
            try {
                const response = await fetch(DEFAULT_AVATARS_URL);
                const data = await response.json();
                if (response.ok && Array.isArray(data)) {
                    setDefaultAvatars(data);
                }
            } catch (error) {
                console.error("Varsayılan avatarlar çekilemedi:", error);
            }
        };
        fetchDefaultAvatars();
    }, []);
    
    useEffect(() => {
        if (isInitialDataLoaded) {
            connectWebSocket();
        }
    }, [isInitialDataLoaded, connectWebSocket]);
    
    useEffect(() => { if (!isInVoiceChat && pendingJoinRoom) { joinVoiceChat(pendingJoinRoom); setPendingJoinRoom(null); } }, [isInVoiceChat, pendingJoinRoom, joinVoiceChat]);
    useEffect(scrollToBottom, [messages]);
    useEffect(() => { if (isInVoiceChat && localStreamRef.current && localVideoRefs.current) { localVideoRefs.current.srcObject = localStreamRef.current; } }, [isInVoiceChat]);
    
    useEffect(() => {
        function handleClickOutside(event) {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target) && !event.target.closest('button')) {
                setIsEmojiPickerOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    let chatTitle = 'Pawscord';
    if (isAuthenticated) {
        if (activeChat.type === 'room') {
            chatTitle = `# ${activeChat.id}`;
        } else if (activeChat.type === 'dm') {
            const conversation = conversations.find(c => c.id === activeChat.id);
            const otherUser = conversation?.participants.find(p => p.username !== username);
            chatTitle = `@ ${otherUser ? otherUser.username : '...'}`;
        }
    }
    
    useEffect(() => {
        const onFocus = () => { document.title = `${chatTitle} - Pawscord`; };
        window.addEventListener('focus', onFocus);
        return () => window.removeEventListener('focus', onFocus);
    }, [chatTitle]);

    useEffect(() => {
        if (!isAuthenticated || !isInitialDataLoaded) return; 
        
        const encodedUsername = encodeURIComponent(username);
        const STATUS_WS_URL = `${WS_PROTOCOL}://${API_HOST}/ws/status/?username=${encodedUsername}`;
        
        if (statusWsRef.current) {
             statusWsRef.current.close(1000, 'reconnect_initiated');
             statusWsRef.current = null;
        }
        
        const newStatusWs = new WebSocket(STATUS_WS_URL);
        statusWsRef.current = newStatusWs;
        
        newStatusWs.onopen = () => console.log("Global Status WS BAĞLANDI.");
        newStatusWs.onmessage = (event) => {
            const data = JSON.parse(event.data);
            
            if (data.type === 'voice_state_update') handleVoiceStateUpdate(data);
            
            if (data.type === 'online_user_list_update') {
                setOnlineUsers(data.online_users);
            }

            if (data.type === 'user_profile_update') {
                handleProfileUpdate(data.user_data);
            }
            
            if (data.type === 'unread_counts_update') {
                console.log("Okunmamış mesajlar WS'den (başlangıç) alındı:", data.counts);
                setUnreadCounts(data.counts);
            }

            if (data.type === 'global_message_notification') {
                const incomingChatKey = `${data.room_slug ? 'room' : 'dm'}-${data.room_slug || data.conversation_id}`;
                const currentChatKey = `${activeChatRef.current.type}-${activeChatRef.current.id}`;
                if (data.username !== username && incomingChatKey !== currentChatKey) {
                    setUnreadCounts(prev => ({ ...prev, [incomingChatKey]: (prev[incomingChatKey] || 0) + 1 }));
                    if (document.hidden) {
                        notificationSoundRef.current?.play().catch(e => console.warn("Sesli bildirim oynatılamadı."));
                        document.title = `(1) Yeni Mesaj - Pawscord`;
                    }
                }
            }

            if (data.type === 'room_list_update') {
                setRoomOptions(data.rooms);
                if (activeChatRef.current.type === 'room' && !data.rooms.map(r => r.slug).includes(activeChatRef.current.id)) {
                    setActiveChat({ type: 'room', id: 'genel' });
                    setMessages([]);
                }
            }
        };
        newStatusWs.onerror = (err) => { console.error("Global Status WS Hatası:", err); };

        return () => {
             if (newStatusWs && newStatusWs.readyState === WebSocket.OPEN) {
                 newStatusWs.close(1000, 'component_cleanup');
             }
        };
    }, [isAuthenticated, isInitialDataLoaded, username, handleVoiceStateUpdate, handleProfileUpdate, chatTitle]);
    
    const handleRoomChange = (newRoomSlug) => {
        if (activeChat.type !== 'room' || activeChat.id !== newRoomSlug) {
            setActiveChat({ type: 'room', id: newRoomSlug });
            setMessages([]);
            setEditingMessage(null);
            setReplyingTo(null);
        }
    };

    const handleDMClick = async (targetUsername) => {
        if (targetUsername === username) return;
        try {
            const response = await fetch(GET_OR_CREATE_CONVERSATION_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user1: username, user2: targetUsername }) });
            const data = await response.json();
            if (response.ok) {
                if (activeChat.type !== 'dm' || activeChat.id !== data.id) {
                    setActiveChat({ type: 'dm', id: data.id, targetUser: targetUsername });
                    setMessages([]);
                    setEditingMessage(null);
                    setReplyingTo(null);
                    if (!conversations.some(c => c.id === data.id)) {
                        fetchConversations();
                    }
                }
            } else {
                alert(`Hata: ${data.error || 'Konuşma başlatılamadı.'}`);
            }
        } catch (error) { console.error("Konuşma başlatma hatası:", error); }
    };
    
    const handleEmojiClick = (emoji) => {
        setMessageInput(prev => prev + emoji);
        setIsEmojiPickerOpen(false);
        messageInputRef.current?.focus();
    };

    const handleMessageInputChange = (e) => {
        const value = e.target.value;
        setMessageInput(value);
        if (!isConnected || !isAuthenticated) return;
        
        if (value.length > 0 && !typingTimeoutRef.current) {
            ws.current?.send(JSON.stringify({ type: 'typing_start' }));
        }
        
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => { ws.current?.send(JSON.stringify({ type: 'typing_stop' })); typingTimeoutRef.current = null; }, 3000);
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (!isAuthenticated || messageInput.trim() === '' || ws.current?.readyState !== WebSocket.OPEN) return;
        
        const messagePayload = { 'message': messageInput.trim(), 'username': username };
        if (activeChat.type === 'room') messagePayload.type = 'chat_message';
        else if (activeChat.type === 'dm') messagePayload.type = 'dm_message';
        
        if (replyingTo) {
            messagePayload.reply_to = replyingTo.id;
        }

        const tempId = getTemporaryId();
        messagePayload.temp_id = tempId;
        
        const tempMessage = {
            id: tempId,
            temp_id: tempId,
            username: username,
            content: messageInput.trim(),
            timestamp: new Date().toISOString(),
            reply_to: replyingTo,
            reactions: []
        };
        setMessages((prev) => [...prev, tempMessage]);
        
        ws.current.send(JSON.stringify(messagePayload));
        
        setMessageInput('');
        setReplyingTo(null);
        clearTimeout(typingTimeoutRef.current);
        ws.current?.send(JSON.stringify({ type: 'typing_stop' }));
        typingTimeoutRef.current = null;
    };

    const uploadFile = useCallback(async (file) => {
        if (!file || isUploading) return;
        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);
        formData.append('username', username);
        if (replyingTo) formData.append('reply_to', replyingTo.id);
        if (activeChat.type === 'room') formData.append('room_slug', activeChat.id);
        else if (activeChat.type === 'dm') formData.append('conversation_id', activeChat.id);
        
        const tempId = getTemporaryId();
        setMessages(prev => [...prev, { id: tempId, type: 'system_message', message: `[${file.name}] resmi yükleniyor...` }]);
        
        try {
            const response = await fetch(IMAGE_UPLOAD_URL, { method: 'POST', body: formData });
            
            setMessages(prev => prev.filter(msg => msg.id !== tempId)); 
            
            if (!response.ok) {
                const errorData = await response.json();
                alert(`Hata: ${errorData.error || 'Bilinmeyen hata'}`);
            }
        } catch (error) {
            console.error("Resim yükleme hatası:", error);
            alert("Resim yüklenirken bir ağ hatası oluştu.");
        } finally {
            setIsUploading(false);
            if(fileInputRef.current) fileInputRef.current.value = "";
        }
    }, [activeChat, username, isUploading, replyingTo]);

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        uploadFile(file);
    };
    
    const handleDragEnter = (e) => { e.preventDefault(); e.stopPropagation(); dragCounter.current++; if (e.dataTransfer.items && e.dataTransfer.items.length > 0) { setIsDragging(true); } };
    const handleDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); dragCounter.current--; if (dragCounter.current === 0) { setIsDragging(false); } };
    const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        dragCounter.current = 0;
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith('image/')) {
                uploadFile(file);
            }
            e.dataTransfer.clearData();
        }
    };

    const handleToggleReaction = useCallback((messageId, emoji) => {
        if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({
                type: 'toggle_reaction',
                message_id: messageId,
                emoji: emoji
            }));
        }
    }, []);

    const handleDeleteMessage = useCallback((messageId) => {
        if (window.confirm("Bu mesajı silmek istediğinizden emin misiniz?") && ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({
                type: 'delete_message',
                message_id: messageId
            }));
        }
    }, []);

    const handleSaveEdit = useCallback((messageId, newContent) => {
        if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({
                type: 'edit_message',
                message_id: messageId,
                new_content: newContent
            }));
            setEditingMessage(null);
        }
    }, []);
    
    const currentUserProfile = allUsers.find(u => u.username === username);
    
    const typingMessage = typingUsers.filter(u => u !== username && u).length > 0 ? (
        typingUsers.filter(u => u !== username).length === 1 ?
        `${typingUsers.filter(u => u !== username)[0]} yazıyor...` :
        `${typingUsers.filter(u => u !== username).join(', ')} yazıyor...`
    ) : null;

    return (
        <div style={styles.mainContainer}>
            {zoomedImage && <ImageModal imageUrl={zoomedImage} onClose={() => setZoomedImage(null)} />}
            {!isAuthenticated ? (
                <div style={styles.centeredAuthBox}><div style={styles.authBox}><h2>Sohbete katılmak için adınızı girin</h2><form onSubmit={(e) => { e.preventDefault(); if (username.trim()) { setIsAuthenticated(true); localStorage.setItem('chat_username', username.trim()); }}}><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Adınız..." style={{...styles.inputField, width: '100%', marginBottom: '10px'}} required /><button type="submit" style={styles.sendButton} disabled={username.trim() === ''}>Katıl</button></form></div></div>
            ) : (
                <>
                    {showProfilePanel && (
                        <UserProfilePanel
                            user={currentUserProfile}
                            onClose={() => setShowProfilePanel(false)}
                            onProfileUpdate={handleProfileUpdate}
                            updateProfileUrl={UPDATE_PROFILE_URL}
                            getDeterministicAvatar={getDeterministicAvatar}
                        />
                    )}
                    <div style={styles.chatLayout}>
                        <div style={styles.sidebarWrapper}>
                            <RoomList 
                                isAdmin={isAdmin} 
                                roomOptions={roomOptions} 
                                conversations={conversations} 
                                currentRoom={activeChat.type === 'room' ? activeChat.id : null} 
                                currentConversationId={activeChat.type === 'dm' ? activeChat.id : null} 
                                onRoomSelect={handleRoomChange} 
                                onDMSelect={handleDMClick} 
                                isConnected={isConnected} 
                                unreadCounts={unreadCounts} 
                                voiceUsers={voiceUsers} 
                                currentUsername={username} 
                                currentVoiceRoom={currentVoiceRoom} 
                                remoteVolumes={remoteVolumes} 
                                setRemoteVolume={setRemoteVolume} 
                                joinVoiceChat={(roomSlug) => { if (isInVoiceChat) { setPendingJoinRoom(roomSlug); leaveVoiceChat(); } else { joinVoiceChat(roomSlug); } }} 
                                leaveVoiceChat={leaveVoiceChat} 
                                sendRoomManagementSignal={sendRoomManagementSignal}
                                onlineUsers={onlineUsers}
                                allUsers={allUsers}
                                onProfileClick={() => setShowProfilePanel(true)}
                                getDeterministicAvatar={getDeterministicAvatar}
                            />
                        </div>
                        <div style={styles.mainContent}>
                            <div style={styles.chatArea} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}>
                                {isDragging && <div style={styles.dragOverlay}><p>Resmi buraya bırak</p></div>}
                                <div style={styles.chatHeader}><h1 style={styles.header}>{chatTitle}</h1>{isAdmin && activeChat.type === 'room' && (<button onClick={handleClearChat} style={styles.clearButton} title="Bu odadaki tüm mesajları sil">Chati Temizle</button>)}</div>
                                <div style={styles.messageBox}>
                                    {messages.map((msg) => (
                                        <div key={msg.id || msg.temp_id} style={styles.chatMessageWrapper}>
                                            <img src={allUsers.find(u => u.username === msg.username)?.avatar || getDeterministicAvatar(msg.username)} style={styles.avatar} alt={`${msg.username} avatar`} />
                                            <div style={{width: '100%'}}>
                                                {msg.type === 'system_message' ? (
                                                    <p style={styles.systemMessage}>{msg.message}</p>
                                                ) : editingMessage?.id === msg.id ? (
                                                    <MessageEditForm 
                                                        message={editingMessage}
                                                        onSave={handleSaveEdit}
                                                        onCancel={() => setEditingMessage(null)}
                                                    />
                                                ) : (
                                                    <Message
                                                        msg={msg}
                                                        currentUser={username}
                                                        onDelete={handleDeleteMessage}
                                                        onStartEdit={setEditingMessage}
                                                        onToggleReaction={handleToggleReaction}
                                                        onSetReply={setReplyingTo}
                                                        onImageClick={setZoomedImage}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                                {typingMessage && ( <p style={styles.typingStatus}>{typingMessage}</p> )}
                                {isInVoiceChat && (
                                    <div style={styles.voiceControls}><button onClick={toggleMute} style={styles.controlButton}>{isMuted ? 'Sesi Aç' : 'Sesi Kapat'}</button><button onClick={toggleVideo} style={styles.controlButton}>{isVideoEnabled ? 'Kamerayı Kapat' : 'Kamerayı Aç'}</button><button onClick={leaveVoiceChat} style={{...styles.controlButton, backgroundColor: '#d9534f'}}>Görüşmeden Ayrıl</button></div>
                                )}
                                <div style={styles.inputContainer}>
                                    <ReplyPreview message={replyingTo} onCancel={() => setReplyingTo(null)} />
                                    {isEmojiPickerOpen && (
                                        <div style={styles.emojiPicker} ref={emojiPickerRef}>
                                            {EMOJI_LIST.map((emoji, index) => (
                                                <span key={index} style={styles.emojiItem} onClick={() => handleEmojiClick(emoji)}>{emoji}</span>
                                            ))}
                                        </div>
                                    )}
                                    <form onSubmit={sendMessage} style={styles.inputForm}>
                                        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileInputChange} accept="image/*" />
                                        <button type="button" onClick={() => fileInputRef.current.click()} style={styles.uploadButton} disabled={!isConnected || isUploading}>📎</button>
                                        <button type="button" onClick={() => setIsEmojiPickerOpen(prev => !prev)} style={styles.emojiButton} disabled={!isConnected || isUploading}>😀</button>
                                        <input
                                            type="text"
                                            value={messageInput}
                                            onChange={handleMessageInputChange}
                                            onKeyDown={(e) => {if (e.key === 'Enter') sendMessage(e)}}
                                            placeholder={replyingTo ? `@${replyingTo.username} adlı kişiye yanıt yaz...` : `Mesajınızı buraya yazın...`}
                                            style={styles.inputField}
                                            ref={messageInputRef}
                                        />
                                        <button type="submit" style={styles.sendButton} disabled={!isConnected || isUploading || messageInput.trim() === ''}>
                                            {isUploading ? 'Yükleniyor...' : 'Gönder'}
                                        </button>
                                    </form>
                                </div>
                                <p style={styles.status}>Backend Durumu: {isConnected ? 'BAĞLI' : 'BAĞLANTI YOK'}</p>
                            </div>
                            <div style={styles.rightPanel}>
                                {isInVoiceChat && (
                                    <div style={styles.videoContainer}><h3 style={styles.panelHeader}>GÖRÜNTÜLÜ SOHBET</h3><div style={styles.videoWrapper}><video ref={localVideoRefs} autoPlay muted style={styles.videoElement}></video><div style={styles.videoLabel}>{username} (Siz)</div></div>{voiceUsers[currentVoiceRoom]?.filter(u => u !== username).map(user => (<div key={user} style={styles.videoWrapper}><video ref={el => remoteVideoRefs.current[user] = el} autoPlay style={styles.videoElement}></video><div style={styles.videoLabel}>{user}</div></div>))}</div>
                                )}
                                <ChatUserList 
                                    chatUsers={chatUsers} 
                                    onUserClick={handleDMClick} 
                                    currentUser={username} 
                                    onlineUsers={onlineUsers} 
                                    allUsers={allUsers} 
                                    hasFetchedAllUsers={hasFetchedAllUsers} 
                                    getDeterministicAvatar={getDeterministicAvatar}
                                />
                                {/* <<< YENİ: Sağ alt köşe logosu ve metni >>> */}
                                <div style={styles.bottomRightBranding}>
                                    <img src="/logo.png" alt="Pawscord Logo" style={styles.brandingLogo} />
                                    <span style={styles.brandingText}>Pawscord</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

const styles = {
    mainContainer: { display: 'flex', height: '100vh', backgroundColor: '#36393f', width: '100%', overflowX: 'auto' },
    centeredAuthBox: { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' },
    chatLayout: { display: 'flex', width: '100%', height: '100vh' },
    sidebarWrapper: { position: 'relative', width: '250px', minWidth: '250px', backgroundColor: '#2f3136', height: '100%', display: 'flex', flexDirection: 'column' },
    mainContent: { display: 'flex', flex: 1, height: '100%', minWidth: 0 },
    chatArea: { position: 'relative', flexGrow: 1, display: 'flex', flexDirection: 'column', padding: '0 20px 20px 20px', backgroundColor: '#36393f', color: '#fff', height: '100%', boxSizing: 'border-box' },
    dragOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(88, 101, 242, 0.7)', border: '3px dashed white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5em', fontWeight: 'bold', zIndex: 10 },
    rightPanel: { 
        width: '300px', 
        minWidth: '300px', 
        backgroundColor: '#2f3136', 
        color: '#fff', 
        padding: '20px 10px', 
        borderLeft: '1px solid #444', 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        overflowY: 'auto',
        position: 'relative', // Logo için konumlandırma
    },
    panelHeader: { paddingBottom: '10px', borderBottom: '1px solid #444', marginBottom: '10px', color: '#99aab5', fontSize: '1em', fontWeight: 'bold', textTransform: 'uppercase', marginTop: 0 },
    chatHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #444', marginBottom: '10px'},
    header: { padding: '20px 0 10px 0', border: 'none', margin: 0, color: '#fff', fontSize: '1.4em' },
    messageBox: { flexGrow: 1, overflowY: 'auto', paddingRight: '10px', marginBottom: '15px' },
    chatMessageWrapper: { display: 'flex', alignItems: 'flex-start', marginBottom: '2px' },
    avatar: { width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px', marginTop: '5px', flexShrink: 0, objectFit: 'cover' },
    systemMessage: { width: '100%', padding: '5px 0', color: '#949ba4', fontStyle: 'italic', textAlign: 'center', fontSize: '0.9em' },
    inputContainer: { position: 'relative', width: '100%', zIndex: 10 },
    inputForm: { display: 'flex' },
    emojiPicker: { position: 'absolute', bottom: '50px', left: '50px', backgroundColor: '#2f3136', border: '1px solid #5865f2', borderRadius: '8px', padding: '10px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '5px', zIndex: 20, boxShadow: '0 5px 15px rgba(0,0,0,0.5)' },
    emojiItem: { cursor: 'pointer', fontSize: '1.5em', padding: '5px', transition: 'background-color 0.1s', borderRadius: '4px', textAlign: 'center' },
    emojiButton: { padding: '10px 15px', backgroundColor: '#7289da', color: 'white', border: 'none', cursor: 'pointer', fontSize: '1.2em', order: 2, borderRadius: '0' },
    uploadButton: { padding: '10px 15px', backgroundColor: '#7289da', color: 'white', border: 'none', borderRadius: '4px 0 0 4px', cursor: 'pointer', fontSize: '1.2em', order: 1 },
    inputField: { flexGrow: 1, padding: '10px', border: '1px solid #555', borderLeft: 'none', borderRight: 'none', fontSize: '16px', backgroundColor: '#444', color: 'white', order: 3, outline: 'none' },
    sendButton: { padding: '10px 20px', backgroundColor: '#5865f2', color: 'white', border: 'none', borderRadius: '0 4px 4px 0', cursor: 'pointer', order: 4 },
    status: { textAlign: 'center', marginTop: '10px', color: '#5865f2' },
    authBox: { padding: '20px', border: '1px solid #5865f2', textAlign: 'center', backgroundColor: '#2f3136', color: 'white', borderRadius: '8px', boxShadow: '0 5px 15px rgba(0,0,0,0.5)' },
    typingStatus: { textAlign: 'left', height: '25px', marginTop: '5px', marginBottom: '5px', color: '#7289da', fontSize: '0.9em', fontWeight: 'bold' },
    clearButton: { backgroundColor: '#d9534f', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer', fontWeight: 'bold', marginRight: '10px', height: 'fit-content' },
    videoContainer: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' },
    videoWrapper: { position: 'relative', width: '100%', paddingTop: '75%', backgroundColor: '#202225', borderRadius: '5px', overflow: 'hidden' },
    videoElement: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' },
    videoLabel: { position: 'absolute', bottom: '5px', left: '5px', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '2px 5px', borderRadius: '3px', fontSize: '0.8em' },
    voiceControls: { display: 'flex', justifyContent: 'center', gap: '10px', padding: '10px 0', marginBottom: '10px' },
    controlButton: { padding: '8px 15px', backgroundColor: '#5865f2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' },
    
    // <<< YENİ STİLLER: Sağ alt köşe logosu ve metni için >>>
    bottomRightBranding: {
        position: 'sticky', // veya 'absolute' kullanabilirsiniz, test etmek gerekebilir
        bottom: '20px',
        right: '10px',
        marginTop: 'auto', // ChatUserList'in altına itmek için
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px',
        // backgroundColor: '#2f3136', // Arka plan eklemek isterseniz
        borderRadius: '8px',
        zIndex: 5, // Diğer elemanların üzerinde kalması için
        // boxSizing: 'border-box', // padding'in genişliği etkilememesi için
    },
    brandingLogo: {
        width: '50px', // Logonun boyutu
        height: '50px',
        marginBottom: '5px',
        // filter: 'drop-shadow(0 0 5px rgba(88, 101, 242, 0.5))', // Hafif bir gölge ekleyebiliriz
    },
    brandingText: {
        color: '#7289da', // Logonun rengiyle uyumlu bir metin rengi
        fontSize: '1em',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    }
};

export default App;