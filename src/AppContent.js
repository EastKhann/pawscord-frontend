// Bileşenler (Code Splitting / Lazy Load)
import React, { useState, useEffect, useRef, useCallback, useMemo, Suspense } from 'react'; // React ve Suspense eklendi
import { FaThLarge, FaWindowMaximize, FaMicrophone, FaMicrophoneSlash, FaHeadphones, FaVideo, FaVideoSlash, FaDesktop, FaTimes, FaPaperclip } from 'react-icons/fa';
import toast from './utils/toast';

// Kritik olmayan bileşenleri Lazy Load ile yükle
const CreateGroupModal = React.lazy(() => import('./components/CreateGroupModal'));
const SoundboardModal = React.lazy(() => import('./components/SoundboardModal'));
const WhiteboardModal = React.lazy(() => import('./components/WhiteboardModal'));
const ServerSettingsModal = React.lazy(() => import('./components/ServerSettingsModal'));
const KanbanBoard = React.lazy(() => import('./components/KanbanBoard'));
const CryptoChartModal = React.lazy(() => import('./CryptoChartModal'));
const CryptoStoreModal = React.lazy(() => import('./components/CryptoStoreModal'));
const PremiumStoreModal = React.lazy(() => import('./components/PremiumStoreModal')); // ✨ YENİ: Premium Mağaza
// DownloadModal kullanılmıyor gibi görünüyor, gerekirse lazy yapın
const FriendsTab = React.lazy(() => import('./FriendsTab')); // Büyük olabilir
const RoomList = React.lazy(() => import('./RoomList')); // Kritik olabilir ama deneyelim
const ChatUserList = React.lazy(() => import('./ChatUserList'));
const SummaryModal = React.lazy(() => import('./SummaryModal'));
const UserProfilePanel = React.lazy(() => import('./UserProfilePanel'));
// Message ve MessageEditForm ana akışta, lazy OLMAMALI (UX için)
import Message from './Message';
import MessageEditForm from './MessageEditForm';
const ImageModal = React.lazy(() => import('./ImageModal'));
// ReplyPreview hafif, kalabilir
import ReplyPreview from './ReplyPreview';
const PinnedMessages = React.lazy(() => import('./PinnedMessages'));
const GifPicker = React.lazy(() => import('./GifPicker'));
import FloatingVoiceIsland from './FloatingVoiceIsland'; // Ses önemli, hızlı gelsin
import UserVideoContainer from './UserVideoContainer';
import SplashScreen from './SplashScreen';
import LoginPage from './LoginPage';
const AnalyticsDashboard = React.lazy(() => import(/* webpackChunkName: "admin-analytics", webpackMode: "lazy" */ './AnalyticsDashboard')); // Çok büyük - lazy load
const UserProfileModal = React.lazy(() => import('./UserProfileModal'));
const CinemaModal = React.lazy(() => import('./CinemaModal'));
const StickerPicker = React.lazy(() => import('./StickerPicker'));
const WelcomeScreen = React.lazy(() => import('./WelcomeScreen'));
const CodeSnippetModal = React.lazy(() => import('./components/CodeSnippetModal'));
import RichTextEditor from './components/RichTextEditor'; // Editör hemen lazım
import MessageInput from './components/MessageInput'; // ✨ YENİ: Modern mesaj input
import EmojiPicker from './components/EmojiPicker'; // ✨ YENİ: Emoji picker
const EncryptionKeyModal = React.lazy(() => import('./components/EncryptionKeyModal'));
const DJModal = React.lazy(() => import('./components/DJModal'));
import VoiceAudioController from './VoiceAudioController'; // ✨ EKLENDİ: Ses kontrolcüsü
import packageJson from '../package.json'; // package.json src dışında olabilir, ../ ile çağır
import { URLS, API_BASE_URL, GOOGLE_WEB_CLIENT_ID } from './utils/constants';
import styles from './SidebarStyles'; // 🔥 Styles import

// Loading Spinner (Lazy bileşenler yüklenirken görünür)
const LazyLoader = () => <div style={{ padding: 20, color: '#b9bbbe', textAlign: 'center' }}>Yükleniyor...</div>;
const getTemporaryId = () => (Date.now() + Math.floor(Math.random() * 1000)).toString();

const calculateFileHash = (file) => {
    return new Promise((resolve, reject) => {
        const chunkSize = 2 * 1024 * 1024;
        const totalChunks = Math.ceil(file.size / chunkSize);
        let currentChunk = 0;
        const spark = new SparkMD5.ArrayBuffer();
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            spark.append(e.target.result);
            currentChunk++;
            if (currentChunk < totalChunks) loadNextChunk();
            else resolve(spark.end());
        };
        fileReader.onerror = (err) => reject(err);
        function loadNextChunk() {
            const start = currentChunk * chunkSize;
            const end = Math.min(start + chunkSize, file.size);
            fileReader.readAsArrayBuffer(file.slice(start, end));
        }
        loadNextChunk();
    });
};

const AppContent = () => {
    const { user, isAuthenticated, token, login, logout, isLoading: isAuthLoading } = useAuth();
    const {
        isInVoice,
        isConnecting, // ✨ EKLENDİ
        currentRoom: currentVoiceRoom, joinChannel, leaveChannel,
        isMuted, isDeafened, toggleMute, toggleDeafened, toggleVideo, toggleScreenShare,
        remoteVolumes, setRemoteVolume, localCameraStream, remoteStreams, isTalking,
        sendSignal, isScreenSharing, isVideoEnabled
    } = useVoice();

    // URL Constants
    const UPDATE_PROFILE_URL = URLS.UPDATE_PROFILE;
    const CHANGE_USERNAME_URL = URLS.CHANGE_USERNAME;
    const LOCAL_GIF_LIST_URL = URLS.GIFS;

    // Store State
    const activeChat = useChatStore(state => state.activeChat);
    const messages = useChatStore(state => state.messages);
    const unreadCounts = useChatStore(state => state.unreadCounts);
    const typingUsers = useChatStore(state => state.typingUsers);
    const onlineUsers = useChatStore(state => state.onlineUsers);
    const voiceUsers = useChatStore(state => state.voiceUsers);
    const encryptionKeys = useChatStore(state => state.encryptionKeys);

    // Store Actions
    const setActiveChat = useChatStore(state => state.setActiveChat);
    const addMessage = useChatStore(state => state.addMessage);
    const setMessages = useChatStore(state => state.setMessages);
    const setTypingUser = useChatStore(state => state.setTypingUser);
    const setOnlineUsers = useChatStore(state => state.setOnlineUsers);
    const setVoiceUsersState = useChatStore(state => state.setVoiceUsers);
    const incrementUnread = useChatStore(state => state.incrementUnread);
    const setEncryptionKey = useChatStore(state => state.setEncryptionKey);

    // Local State
    const [showGroupModal, setShowGroupModal] = useState(false);
    const [showSoundboard, setShowSoundboard] = useState(false);
    const [showWhiteboard, setShowWhiteboard] = useState(false);
    const [showEncModal, setShowEncModal] = useState(false);
    const [chartSymbol, setChartSymbol] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [updateStatusText, setUpdateStatusText] = useState('');
    const username = user?.username || '';
    const [showSnippetModal, setShowSnippetModal] = useState(false);
    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768 || isNative);
    const [searchQuery, setSearchQuery] = useState('');
    const [safeAreaTop, setSafeAreaTop] = useState('0px');
    const safeAreaBottom = isNative ? 'max(20px, env(safe-area-inset-bottom))' : '0px';
    const [islandState, setIslandState] = useState({ width: 300, height: 225, x: 100, y: 100 });
    const [voiceLayout, setVoiceLayout] = useState('grid'); // 'grid' | 'focus'

    // Modals & UI States
    const [showServerSettings, setShowServerSettings] = useState(false);
    const [animationState, setAnimationState] = useState('start');
    const [conversations, setConversations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [serverOrder, setServerOrder] = useState([]); // 🔥 YENİ: Sunucu sıralaması
    const [allUsers, setAllUsers] = useState([]);
    const [pinnedMessages, setPinnedMessages] = useState([]);
    const [defaultAvatars, setDefaultAvatars] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [isLeftSidebarVisible, setIsLeftSidebarVisible] = useState(false);
    const [isRightSidebarVisible, setIsRightSidebarVisible] = useState(false);
    const [showProfilePanel, setShowProfilePanel] = useState(false);
    const [showPinned, setShowPinned] = useState(false);
    const [showGifPicker, setShowGifPicker] = useState(false);
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [authError, setAuthError] = useState('');
    const [showCinema, setShowCinema] = useState(false);
    const [showStickerPicker, setShowStickerPicker] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const [recordingDuration, setRecordingDuration] = useState(0);
    const [editingMessage, setEditingMessage] = useState(null);
    const [replyingTo, setReplyingTo] = useState(null);
    const [forwardingMessage, setForwardingMessage] = useState(null);
    const [selectedMessages, setSelectedMessages] = useState(new Set());
    const [zoomedImage, setZoomedImage] = useState(null);
    const [viewingProfile, setViewingProfile] = useState(null);
    const [dropTarget, setDropTarget] = useState(null);
    const [showStore, setShowStore] = useState(false);
    const [messageHistoryLoading, setMessageHistoryLoading] = useState(false);
    const [hasDraftMessage, setHasDraftMessage] = useState(false);
    const [hasMoreMessages, setHasMoreMessages] = useState(true);
    const [messageHistoryOffset, setMessageHistoryOffset] = useState(0);
    const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);
    const [friendsList, setFriendsList] = useState([]);
    const [serverMembers, setServerMembers] = useState([]);
    const [updateAvailable, setUpdateAvailable] = useState(false);
    const [serverToEdit, setServerToEdit] = useState(null);
    const [isSummaryLoading, setIsSummaryLoading] = useState(false);
    const [summaryResult, setSummaryResult] = useState("");
    const [soundSettings, setSoundSettings] = useState(() => JSON.parse(localStorage.getItem('chat_sound_settings')) || { notifications: true, mentions: true, userJoinLeave: true });
    const [showDJ, setShowDJ] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0); // 🆕 Upload progress %
    const [uploadingFileName, setUploadingFileName] = useState(''); // 🆕 Yüklenen dosya adı
    const [pendingFilesFromDrop, setPendingFilesFromDrop] = useState([]); // 🆕 Sürükle-bırak dosyaları
    const isNativeApp = isNative;

    // Refs
    const ws = useRef(null);
    const statusWsRef = useRef(null);
    const messagesEndRef = useRef(null);
    const fileInputRefNormal = useRef(null);
    const richTextRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const startTimeRef = useRef(null);
    const timerIntervalRef = useRef(null);
    const dragStartY = useRef(0);
    const isLockedRef = useRef(false);
    const typingTimeoutRef = useRef(null);

    const currentUserProfile = username ? allUsers.find(u => u.username === username) : null;
    const isAdmin = currentUserProfile?.role === 'admin' || false;

    // --- HELPER FUNCTIONS ---
    const activeRoomType = useMemo(() => {
        if (activeChat.type !== 'room' || !categories) return 'text';
        for (const srv of categories) {
            if (srv.categories) {
                for (const cat of srv.categories) {
                    const room = cat.rooms?.find(r => r.slug === activeChat.id);
                    if (room) return room.channel_type;
                }
            }
        }
        return 'text';
    }, [activeChat, categories]);

    // 🔥 YENİ: Sunucuları sırala
    const sortedServers = useMemo(() => {
        if (!categories || categories.length === 0) return [];
        if (!serverOrder || serverOrder.length === 0) return categories;

        const ordered = [];
        const unordered = [];

        // Sıralı olanları ekle
        serverOrder.forEach(serverId => {
            const server = categories.find(c => c.id === serverId);
            if (server) ordered.push(server);
        });

        // Sıralamada olmayan yenileri ekle
        categories.forEach(server => {
            if (!serverOrder.includes(server.id)) {
                unordered.push(server);
            }
        });

        return [...ordered, ...unordered];
    }, [categories, serverOrder]);

    const chatTitle = useMemo(() => {
        if (activeChat.type === 'room') {
            if (categories) {
                for (const server of categories) {
                    if (server.categories) {
                        for (const cat of server.categories) {
                            const foundRoom = cat.rooms?.find(r => r.slug === activeChat.id);
                            if (foundRoom) return foundRoom.name;
                        }
                    }
                }
            }
            return activeChat.id;
        } else if (activeChat.type === 'dm') return `@ ${activeChat.targetUser || 'DM'}`;
        return '';
    }, [activeChat, categories]);

    const getDeterministicAvatar = useCallback((uname) => {
        if (uname === '⚡ Signal Bot') return `${ABSOLUTE_HOST_URL}/static/bot/signal.png`;
        if (uname === 'PawPaw AI') return `${ABSOLUTE_HOST_URL}/static/bot/ai.png`;
        if (!uname || !defaultAvatars || defaultAvatars.length === 0) return `${ABSOLUTE_HOST_URL}/avatars/cat_1.png`;
        let hash = 0;
        for (let i = 0; i < uname.length; i++) hash = uname.charCodeAt(i) + ((hash << 5) - hash);
        const index = Math.abs(hash % defaultAvatars.length);
        const avatarItem = defaultAvatars[index];

        // 🔥 FIX: API returns objects {name, original, thumbnail} or strings
        let path;
        if (typeof avatarItem === 'object' && avatarItem !== null) {
            path = avatarItem.original || avatarItem.thumbnail || avatarItem.url;
        } else if (typeof avatarItem === 'string') {
            path = avatarItem;
        }

        // 🔥 FIX: path yoksa veya string değilse fallback
        if (!path || typeof path !== 'string') {
            return `${ABSOLUTE_HOST_URL}/avatars/cat_1.png`;
        }

        // 🔥 FIX: Avatar URL handling
        if (path.startsWith('http://') || path.startsWith('https://')) return path;
        if (path.startsWith('blob:')) return path;

        // Normalize path
        if (!path.startsWith('/')) path = '/' + path;

        return `${ABSOLUTE_HOST_URL}${path}`;
    }, [defaultAvatars]);

    const getRealUserAvatar = useCallback((targetUsername) => {
        const userObj = allUsers.find(u => u.username === targetUsername);
        // 🔥 FIX: avatar string olmalı
        if (userObj && userObj.avatar && typeof userObj.avatar === 'string') {
            // 🔥 FIX: Handle different avatar URL types
            if (userObj.avatar.startsWith('http://') || userObj.avatar.startsWith('https://')) {
                return userObj.avatar;
            }
            if (userObj.avatar.startsWith('blob:')) {
                return userObj.avatar;
            }

            // Relative path için ABSOLUTE_HOST_URL ekle
            let avatarPath = userObj.avatar;
            if (!avatarPath.startsWith('/')) avatarPath = '/' + avatarPath;

            return `${ABSOLUTE_HOST_URL}${avatarPath}`;
        }
        return getDeterministicAvatar(targetUsername);
    }, [allUsers, getDeterministicAvatar]);

    const fetchWithAuth = useCallback(async (url, options = {}) => {
        const headers = options.headers || {};
        if (token) headers['Authorization'] = `Bearer ${token}`;
        if (!(options.body instanceof FormData)) headers['Content-Type'] = 'application/json';
        try {
            const response = await fetch(url, { ...options, headers });
            if (response.status === 401) { logout(); throw new Error("Oturum süresi doldu"); }
            return response;
        } catch (err) { console.error("Fetch error:", err); throw err; }
    }, [token, logout]);

    // 🔥 YENİ: Sunucu Sıralama Handler'ları
    const saveServerOrder = useCallback(async (newOrder) => {
        try {
            await fetchWithAuth(`${API_BASE_URL}/user/server-order/update/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ server_order: newOrder })
            });
            console.log('💾 Server order saved:', newOrder);
        } catch (error) {
            console.error('Server order save error:', error);
        }
    }, [fetchWithAuth]);

    const handleServerDragStart = (e, serverId, index) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('serverId', serverId.toString());
        e.dataTransfer.setData('sourceIndex', index.toString());

        // 🔥 YENİ: Custom drag image için ghost element oluştur
        const dragElement = e.currentTarget.cloneNode(true);
        dragElement.style.position = 'absolute';
        dragElement.style.top = '-9999px';
        dragElement.style.opacity = '0.8';
        dragElement.style.transform = 'rotate(5deg)';
        dragElement.style.pointerEvents = 'none';
        document.body.appendChild(dragElement);

        // Drag image olarak ayarla
        e.dataTransfer.setDragImage(dragElement, 24, 24);

        // Temizlik için timeout
        setTimeout(() => {
            if (document.body.contains(dragElement)) {
                document.body.removeChild(dragElement);
            }
        }, 0);

        // Sürüklenen elementi işaretle
        e.currentTarget.style.opacity = '0.4';
    };

    const handleServerDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleServerDragEnd = (e) => {
        // 🔥 YENİ: Drag bittiğinde opacity'yi geri al
        e.currentTarget.style.opacity = '1';
    };

    const handleServerDrop = useCallback((e, targetIndex) => {
        e.preventDefault();

        const serverId = parseInt(e.dataTransfer.getData('serverId'));
        const sourceIndex = parseInt(e.dataTransfer.getData('sourceIndex'));

        // Aynı yere bırakıyorsa işlem yapma
        if (sourceIndex === targetIndex || sourceIndex + 1 === targetIndex) return;

        let currentOrder = serverOrder.length > 0 ? [...serverOrder] : categories.map(c => c.id);

        // Kaynak elementi çıkar
        const [draggedId] = currentOrder.splice(sourceIndex, 1);

        // Hedef index'i ayarla (splice sonrası kayma olduğu için)
        const adjustedTargetIndex = sourceIndex < targetIndex ? targetIndex - 1 : targetIndex;

        // Hedef konuma ekle
        currentOrder.splice(adjustedTargetIndex, 0, draggedId);

        setServerOrder(currentOrder);
        saveServerOrder(currentOrder);

        console.log('🔄 Sunucu sıralaması güncellendi:', currentOrder);
    }, [serverOrder, categories, saveServerOrder]);

    // --- SEND MESSAGE ---
    const sendMessage = (content) => {
        if (!content || !content.trim()) return;
        setEditingMessage(null);
        setHasDraftMessage(false);

        const currentChatId = activeChat.type === 'room' ? `room-${activeChat.id}` : `dm-${activeChat.id}`;
        const secretKey = encryptionKeys[currentChatId];

        let finalContent = content;
        if (activeChat.type === 'dm' && secretKey) {
            finalContent = encryptMessage(content, secretKey);
        }

        const payload = {
            type: activeChat.type === 'room' ? 'chat_message' : 'dm_message',
            message: finalContent,
            username: username,
            temp_id: getTemporaryId(),
            ...(activeChat.type === 'room' ? { room: activeChat.id } : { conversation: activeChat.id })
        };

        ws.current?.send(JSON.stringify(payload));
        addMessage({ ...payload, content: finalContent, timestamp: new Date().toISOString() });
    };

    const handleSendSnippet = (data) => {
        const payload = {
            type: activeChat.type === 'room' ? 'chat_message' : 'dm_message',
            message: "",
            username: username,
            temp_id: getTemporaryId(),
            snippet_data: data,
            ...(activeChat.type === 'room' ? { room: activeChat.id } : { conversation: activeChat.id })
        };
        ws.current?.send(JSON.stringify(payload));
        addMessage({ ...payload, timestamp: new Date().toISOString() });
        setShowSnippetModal(false);
    };

    const sendMessageAsSticker = (stickerUrl) => {
        const fullUrl = stickerUrl.startsWith('http') ? stickerUrl : `${ABSOLUTE_HOST_URL}${stickerUrl}`;
        sendMessage(fullUrl);
        setShowStickerPicker(false);
    };

    // --- WEBSOCKETS ---
    const reconnectTimeoutRef = React.useRef(null);
    const reconnectAttemptsRef = React.useRef(0);

    const connectWebSocket = useCallback(() => {
        if (!activeChat.id || activeChat.type === 'welcome' || activeChat.type === 'friends' || !username) return;

        // Clear any pending reconnect attempts
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
            reconnectTimeoutRef.current = null;
        }

        if (ws.current) ws.current.close(1000, 'change_room');

        setMessageHistoryOffset(0);
        setHasMoreMessages(true);
        fetchMessageHistory(true, 0);

        let wsUrl = '';
        const params = `?username=${encodeURIComponent(username)}&token=${token}`;

        if (activeChat.type === 'room') {
            // 🔥 ID ile bağlanma mantığı (Slug çakışmasını önlemek için)
            let roomIdentifier = activeChat.id;

            // Eğer activeChat.id bir Slug ise, gerçek ID'yi bulmaya çalış (categories listesinden)
            if (categories) {
                for (const cat of categories) {
                    const found = cat.rooms?.find(r => r.slug === activeChat.id);
                    if (found && found.id) {
                        roomIdentifier = found.id; // Gerçek ID'yi kullan (örn: 35)
                        console.log(`[WS] Connecting with Room ID: ${roomIdentifier} (Slug: ${activeChat.id})`);
                        break;
                    }
                }
            }
            wsUrl = `${WS_PROTOCOL}://${API_HOST}/ws/chat/${roomIdentifier}/${params}`;
        }
        else if (activeChat.type === 'dm') wsUrl = `${WS_PROTOCOL}://${API_HOST}/ws/dm/${activeChat.id}/${params}`;

        const newWs = new WebSocket(wsUrl);
        ws.current = newWs;
        newWs.onopen = () => {
            setIsConnected(true);
            reconnectAttemptsRef.current = 0; // Reset on successful connection
        };

        newWs.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'chat' || data.type === 'dm' || data.type === 'chat_message_handler' || data.type === 'game_rps') {
                addMessage(data);
                setTypingUser(data.username, false);
            } else if (data.type === 'typing_status_update') {
                if (data.username !== username) setTypingUser(data.username, data.is_typing);
            } else if (data.type === 'chat_cleared') {
                setMessages([]);
            } else if (data.type === 'messages_read') {
                // 🔔 Karşı taraf mesajları okudu
                console.log('👁️ [ReadReceipt] Mesajlar okundu:', data);
                // Toast veya UI gösterimi yapılabilir
                if (data.reader && data.reader !== username) {
                    // Mesajları "okundu" olarak işaretle (UI güncellemesi)
                    setMessages(prev => prev.map(msg => ({
                        ...msg,
                        is_read: msg.username === username ? true : msg.is_read
                    })));
                }
            }
        };

        newWs.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        newWs.onclose = (event) => {
            setIsConnected(false);
            // Auto-reconnect with exponential backoff (max 5 attempts)
            if (event.code !== 1000 && reconnectAttemptsRef.current < 5) {
                const delay = Math.min(3000 * Math.pow(2, reconnectAttemptsRef.current), 30000);
                if (!IS_PRODUCTION) console.log(`WebSocket bağlantısı koptu, ${delay / 1000}s içinde yeniden bağlanılıyor... (Deneme ${reconnectAttemptsRef.current + 1}/5)`);
                reconnectAttemptsRef.current++;
                reconnectTimeoutRef.current = setTimeout(() => {
                    if (activeChat.id && activeChat.type !== 'welcome' && activeChat.type !== 'friends') {
                        connectWebSocket();
                    }
                }, delay);
            } else if (reconnectAttemptsRef.current >= 5) {
                console.error("WebSocket: Maksimum yeniden bağlanma denemesi aşıldı.");
            }
        };
    }, [activeChat, username, token]);

    // Cleanup reconnect timeout on unmount
    useEffect(() => {
        return () => {
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
        };
    }, []);

    // --- EFFECT HOOKS ---
    useEffect(() => {
        if (isNative) {
            GoogleAuth.initialize({ clientId: GOOGLE_WEB_CLIENT_ID, scopes: ['profile', 'email'], grantOfflineAccess: true });
        }
    }, []);

    useEffect(() => {
        const fetchInit = async () => {
            try {
                // Paralel yükleme ile hızlı başlangıç
                const [avatars, users, rooms, convs, friendsData] = await Promise.all([
                    fetchWithAuth(URLS.DEFAULT_AVATARS).then(r => { if (!r.ok) throw new Error("Avatarlar yüklenemedi"); return r.json(); }),
                    fetchWithAuth(URLS.ALL_USERS).then(r => { if (!r.ok) throw new Error("Kullanıcılar yüklenemedi"); return r.json(); }),
                    fetchWithAuth(URLS.ROOM_LIST).then(r => { if (!r.ok) throw new Error("Odalar yüklenemedi"); return r.json(); }),
                    fetchWithAuth(`${URLS.CONV_LIST}?username=${encodeURIComponent(username)}`).then(r => { if (!r.ok) throw new Error("Konuşmalar yüklenemedi"); return r.json(); }),
                    fetchWithAuth(`${API_BASE_URL}/friends/list/`).then(r => { if (!r.ok) throw new Error("Arkadaşlar yüklenemedi"); return r.json(); })
                ]);
                setDefaultAvatars(avatars);
                setAllUsers(users);
                setCategories(rooms);
                setConversations(convs);
                // ✅ Keep full friend objects instead of just usernames
                setFriendsList(friendsData.friends || []);
                setIsInitialDataLoaded(true);
                console.log('✅ Tüm veriler yüklendi:', {
                    kullanıcılar: users.length,
                    odalar: rooms.length,
                    konuşmalar: convs.length
                });
            } catch (e) {
                console.error("Init Data Error", e);
                setAuthError("Veriler yüklenemedi: " + e.message);
            }
        };
        if (isAuthenticated && !isInitialDataLoaded) fetchInit();
    }, [isAuthenticated, isInitialDataLoaded, fetchWithAuth, username]);

    useEffect(() => {
        if (isInitialDataLoaded && activeChat.id && activeChat.type !== 'friends' && activeChat.type !== 'welcome') connectWebSocket();
    }, [activeChat, isInitialDataLoaded, connectWebSocket]);

    useEffect(() => {
        // Mesajlar değiştiğinde veya sayfa yüklendiğinde en alta kaydır
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "auto" }); // "smooth" yerine "auto" kullan ilk açılışta
        }
    }, [messages, activeChat.id]); // activeChat.id değişince de tetiklensin
    // Global Status WebSocket
    useEffect(() => {
        if (!isAuthenticated || !isInitialDataLoaded) return;
        const url = `${WS_PROTOCOL}://${API_HOST}/ws/status/?username=${encodeURIComponent(username)}&token=${token}`;
        const socket = new WebSocket(url);
        statusWsRef.current = socket;
        socket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            if (data.type === 'online_user_list_update') setOnlineUsers(data.users);
            if (data.type === 'voice_users_update') setVoiceUsersState(data.voice_users);
            if (data.type === 'global_message_notification' && data.username !== username) {
                const key = data.room_slug ? `room-${data.room_slug}` : `dm-${data.conversation_id}`;
                const currentKey = activeChat.type === 'room' ? `room-${activeChat.id}` : `dm-${activeChat.id}`;
                if (key !== currentKey) incrementUnread(key);
            }
        };
        return () => socket.close();
    }, [isAuthenticated, isInitialDataLoaded, username, token, activeChat]);

    // 🔥 YENİ: Sunucu sırasını yükle
    useEffect(() => {
        const fetchServerOrder = async () => {
            try {
                const res = await fetchWithAuth(`${API_BASE_URL}/user/server-order/`);
                if (res.ok) {
                    const data = await res.json();
                    setServerOrder(data.server_order || []);
                    console.log('🎯 Server order loaded:', data.server_order);
                }
            } catch (error) {
                console.error('Server order fetch error:', error);
            }
        };

        if (username && isAuthenticated) {
            fetchServerOrder();
        }
    }, [username, isAuthenticated, fetchWithAuth]);

    // 🔥 DÜZELTME: Aktif odaya göre sunucu üyelerini getir
    useEffect(() => {
        const fetchServerMembers = async () => {
            if (activeChat.type !== 'room' || !categories) return;

            console.log('🔍 [AppContent] Searching for server with room:', activeChat.id);
            let foundServer = null;
            // Aktif odanın hangi sunucuda olduğunu bul
            for (const server of categories) {
                if (server.categories) {
                    for (const cat of server.categories) {
                        // Optional chaining and logging
                        const room = cat.rooms?.find(r => r.slug === activeChat.id);
                        if (room) {
                            foundServer = server;
                            console.log('🎉 [AppContent] Found server:', server.name);
                            break;
                        }
                    }
                }
                if (foundServer) break;
            }

            if (!foundServer) {
                console.warn('⚠️ [AppContent] Could not find server for room:', activeChat.id);
                // Debug logs to see available structure
                if (categories.length > 0) {
                    console.log('Available servers:', categories.map(s => s.name));
                }
                return;
            }

            if (foundServer) {
                try {
                    console.log(`🔄 [AppContent] Fetching members for server: ${foundServer.name} (${foundServer.id})`);
                    const res = await fetchWithAuth(`${API_BASE_URL}/servers/${foundServer.id}/members/`);
                    if (res.ok) {
                        const data = await res.json();
                        // API returns list directly, but check if wrapped just in case
                        const members = Array.isArray(data) ? data : (data.members || []);
                        setServerMembers(members);
                        console.log('✅ [AppContent] Server members fetched:', members.length);
                    } else {
                        console.error('❌ [AppContent] Fetch failed status:', res.status);
                    }
                } catch (err) {
                    console.error("❌ [AppContent] Failed to fetch server members", err);
                }
            }
        };

        fetchServerMembers();
    }, [activeChat, categories, fetchWithAuth]);

    // --- HANDLERS ---
    const handleRoomChange = (slug) => {
        setActiveChat('room', slug);
        if (isMobile) setIsLeftSidebarVisible(false);
    };

    const handleDMClick = async (targetUser) => {
        try {
            const res = await fetchWithAuth(URLS.CREATE_CONV, { method: 'POST', body: JSON.stringify({ user1: username, user2: targetUser }) });
            if (!res.ok) {
                toast.error("DM oluşturma hatası");
                return;
            }
            const data = await res.json();
            setActiveChat('dm', data.id, targetUser);
            if (isMobile) setIsLeftSidebarVisible(false);
        } catch (error) {
            console.error("DM oluşturma hatası:", error);
            toast.error("DM oluşturulamadı. Lütfen tekrar deneyin.");
        }
    };

    // 🆕 DM listesinden seçim - targetUser ile birlikte
    const handleDMSelect = useCallback((convId, targetUsername) => {
        console.log('📩 handleDMSelect:', { convId, targetUsername });
        setActiveChat('dm', convId, targetUsername);
        if (isMobile) setIsLeftSidebarVisible(false);
    }, [setActiveChat, isMobile]);

    const fetchMessageHistory = async (isInitial = true, offset = 0) => {
        if (!activeChat.id) return;
        setMessageHistoryLoading(true);
        const urlBase = activeChat.type === 'room' ? URLS.MSG_HISTORY_ROOM : URLS.MSG_HISTORY_DM;
        try {
            const res = await fetchWithAuth(`${urlBase}${activeChat.id}/?limit=50&offset=${offset}`);
            if (res.ok) {
                const data = await res.json();
                const newMsgs = (data.results || []).reverse();
                setMessages(prev => isInitial ? newMsgs : [...newMsgs, ...prev]);
                setHasMoreMessages(!!data.next);
                if (!isInitial) setMessageHistoryOffset(offset + newMsgs.length);

                // 🔔 Görüldü bilgisi gönder (ilk yüklemede)
                if (isInitial && activeChat.type === 'dm') {
                    try {
                        await fetchWithAuth(`${API_BASE_URL}/chats/mark_as_read/`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ conversation_id: activeChat.id })
                        });
                        console.log('✅ [ReadReceipt] DM okundu işaretlendi:', activeChat.id);
                    } catch (e) {
                        console.error('❌ [ReadReceipt] Hata:', e);
                    }
                } else if (isInitial && activeChat.type === 'room') {
                    try {
                        await fetchWithAuth(`${API_BASE_URL}/chats/mark_as_read/`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ room_slug: activeChat.id })
                        });
                        console.log('✅ [ReadReceipt] Room okundu işaretlendi:', activeChat.id);
                    } catch (e) {
                        console.error('❌ [ReadReceipt] Hata:', e);
                    }
                }
            }
        } catch (e) { console.error(e); }
        setMessageHistoryLoading(false);
    };

    // Login & Register
    const handleLogin = async (u, p) => {
        try {
            const res = await fetch(URLS.LOGIN, { method: 'POST', body: JSON.stringify({ username: u, password: p }), headers: { 'Content-Type': 'application/json' } });
            const data = await res.json();
            if (res.ok) login(data.access, data.refresh);
            else setAuthError(data.detail || 'Hata');
        } catch (e) { setAuthError("Sunucu hatası"); }
    };

    const handleRegister = async (u, e, p) => {
        try {
            const res = await fetch(URLS.REGISTER, { method: 'POST', body: JSON.stringify({ username: u, email: e, password: p }), headers: { 'Content-Type': 'application/json' } });
            if (res.status === 201) return true;
            const data = await res.json();
            setAuthError(Object.values(data).flat().join(' '));
            return false;
        } catch (err) { setAuthError("Kayıt hatası"); return false; }
    };

    // Dosya Yükleme (Progress göstergeli)
    const uploadFile = useCallback(async (file, options = {}) => {
        if (!file) return;
        setIsUploading(true);
        setUploadProgress(0);
        setUploadingFileName(file.name);

        try {
            const hash = await calculateFileHash(file);
            const formData = new FormData();
            formData.append('chunk', file);
            formData.append('upload_id', `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
            formData.append('file_name', file.name);
            formData.append('file_hash', hash);
            formData.append('username', username);
            formData.append('temp_id', getTemporaryId());

            // DM ID sağlandıysa onu kullan, yoksa activeChat'i kullan
            const targetChat = options.dmId ? { type: 'dm', id: options.dmId } : activeChat;

            if (targetChat.type === 'room') formData.append('room_slug', targetChat.id);
            else formData.append('conversation_id', targetChat.id);

            // 🆕 XHR ile progress takibi
            const token = localStorage.getItem('access_token');

            await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();

                xhr.upload.addEventListener('progress', (e) => {
                    if (e.lengthComputable) {
                        const percent = Math.round((e.loaded / e.total) * 100);
                        setUploadProgress(percent);
                    }
                });

                xhr.addEventListener('load', () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        try {
                            const data = JSON.parse(xhr.responseText);
                            addMessage(data);
                            console.log('✅ Dosya yüklendi:', file.name);
                            resolve(data);
                        } catch (e) {
                            reject(new Error('Response parse hatası'));
                        }
                    } else {
                        reject(new Error(`HTTP ${xhr.status}`));
                    }
                });

                xhr.addEventListener('error', () => reject(new Error('Network hatası')));
                xhr.addEventListener('abort', () => reject(new Error('İptal edildi')));

                xhr.open('POST', URLS.UPLOAD_FILE);
                xhr.setRequestHeader('Authorization', `Bearer ${token}`);
                xhr.send(formData);
            });

        } catch (e) {
            console.error('❌ Yükleme hatası:', e);
            toast.error("Yükleme hatası: " + e.message);
        }

        setIsUploading(false);
        setUploadProgress(0);
        setUploadingFileName('');
    }, [username, activeChat, addMessage]);

    // 🔥 YENİ: Drag & Drop Handlers
    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        // Sadece chat container'dan çıkıldığında kapat
        if (e.currentTarget === e.target) {
            setIsDragging(false);
        }
    }, []);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            console.log('🔥 [Drag&Drop] Files dropped to preview:', files.map(f => f.name));
            // 🆕 Dosyaları önizleme için pendingFiles'a ekle (direkt yükleme yerine)
            const processedFiles = files.map(file => ({
                id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                file,
                name: file.name,
                size: file.size,
                type: file.type,
                previewUrl: file.type.startsWith('image/') || file.type.startsWith('video/')
                    ? URL.createObjectURL(file)
                    : null
            }));
            setPendingFilesFromDrop(prev => [...prev, ...processedFiles]);
        }
    }, []);


    // Sürükle Bırak
    const handleChatDrop = (e) => {
        e.preventDefault(); e.stopPropagation(); setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            // 🆕 Dosyaları önizleme için pendingFiles'a ekle
            const files = Array.from(e.dataTransfer.files);
            const processedFiles = files.map(file => ({
                id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                file,
                name: file.name,
                size: file.size,
                type: file.type,
                previewUrl: file.type.startsWith('image/') || file.type.startsWith('video/')
                    ? URL.createObjectURL(file)
                    : null
            }));
            setPendingFilesFromDrop(prev => [...prev, ...processedFiles]);
        }
    };
    const handleSidebarDrop = (e, target) => {
        e.preventDefault(); e.stopPropagation(); setDropTarget(null);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            // Sol DM listesinden sürükle-bırak desteği
            if (target && target.type === 'dm') {
                // DM'e dosya at
                const files = Array.from(e.dataTransfer.files);
                files.forEach(file => {
                    uploadFile(file, { dmId: target.id });
                });
                toast.success(`${files.length} dosya ${target.name}'e yükleniyor...`);
            } else {
                toast.warning("Sadece DM sohbetine dosya atılabilir.");
            }
        }
    };

    // Mesaj Arama
    const handleSearchMessages = async (e) => {
        e.preventDefault();
        if (!activeChat.id || !searchQuery.trim()) {
            if (!searchQuery.trim()) fetchMessageHistory(true, 0);
            return;
        }
        setMessageHistoryLoading(true);
        try {
            let url = `${API_BASE_URL}/messages/search/?q=${encodeURIComponent(searchQuery)}`;
            if (activeChat.type === 'room') url += `&room=${activeChat.id}`;
            else url += `&dm=${activeChat.id}`;

            const res = await fetchWithAuth(url);
            if (res.ok) {
                const data = await res.json();
                setMessages(data.results || data);
            }
        } catch (e) { console.error(e); }
        setMessageHistoryLoading(false);
    };

    // Güncelleme (Electron)
    const handleStartUpdate = () => {
        if (isElectron) {
            setIsDownloading(true);
            setUpdateStatusText('İndiriliyor...');
            const { ipcRenderer } = window.require('electron');
            ipcRenderer.send('start-download', URLS.DOWNLOAD);
        } else {
            window.open(URLS.DOWNLOAD, '_blank');
        }
    };

    // --- RENDER ---
    if (animationState !== 'finished' || isAuthLoading) return <SplashScreen animationState={animationState} />;
    if (!isAuthenticated) return <LoginPage onLogin={handleLogin} onRegister={handleRegister} error={authError} setAuthError={setAuthError} />;

    const mobileWebPadding = (isMobile && !isNative) ? '20px' : safeAreaTop;
    const currentKeyId = activeChat.type === 'room' ? `room-${activeChat.id}` : `dm-${activeChat.id}`;
    const hasKey = !!encryptionKeys[currentKeyId];

    return (
        <div style={{ ...styles.mainContainer }} className="dark-theme">
            {/* --- MODALS (Suspense ile sarıldı) --- */}
            <Suspense fallback={<LazyLoader />}>
                {showProfilePanel && <UserProfilePanel user={currentUserProfile} onClose={() => setShowProfilePanel(false)} onLogout={logout} fetchWithAuth={fetchWithAuth} getDeterministicAvatar={getDeterministicAvatar} updateProfileUrl={UPDATE_PROFILE_URL} changeUsernameUrl={CHANGE_USERNAME_URL} soundSettings={soundSettings} onUpdateSoundSettings={setSoundSettings} onImageClick={setZoomedImage} apiBaseUrl={API_BASE_URL} />}
                {showStore && <PremiumStoreModal onClose={() => setShowStore(false)} currentUser={user} />}
                {zoomedImage && <ImageModal imageUrl={zoomedImage} onClose={() => setZoomedImage(null)} />}
                {showGifPicker && <GifPicker onSelect={(url) => { const full = url.startsWith('http') ? url : ABSOLUTE_HOST_URL + url; sendMessage(full); setShowGifPicker(false); }} onClose={() => setShowGifPicker(false)} localGifListUrl={LOCAL_GIF_LIST_URL} absoluteHostUrl={ABSOLUTE_HOST_URL} fetchWithAuth={fetchWithAuth} />}
                {showPinned && <PinnedMessages messages={pinnedMessages} onClose={() => setShowPinned(false)} />}
                {viewingProfile && <UserProfileModal user={viewingProfile} onClose={() => setViewingProfile(null)} onStartDM={handleDMClick} onImageClick={setZoomedImage} getDeterministicAvatar={getDeterministicAvatar} fetchWithAuth={fetchWithAuth} apiBaseUrl={API_BASE_URL} currentUser={username} friendsList={friendsList} />}
                {chartSymbol && <CryptoChartModal symbol={chartSymbol} onClose={() => setChartSymbol(null)} />}
                {showCinema && <CinemaModal onClose={() => setShowCinema(false)} ws={ws} username={username} />}
                {showSnippetModal && <CodeSnippetModal onClose={() => setShowSnippetModal(false)} onSend={handleSendSnippet} />}
                {serverToEdit && <ServerSettingsModal onClose={() => setServerToEdit(null)} server={serverToEdit} currentUsername={username} fetchWithAuth={fetchWithAuth} apiBaseUrl={API_BASE_URL} serverMembers={serverMembers} />}
                {showEncModal && <EncryptionKeyModal onClose={() => setShowEncModal(false)} onSetKey={(key) => setEncryptionKey(currentKeyId, key)} existingKey={encryptionKeys[currentKeyId]} />}

                {showEncModal && <EncryptionKeyModal onClose={() => setShowEncModal(false)} onSetKey={(key) => setEncryptionKey(currentKeyId, key)} existingKey={encryptionKeys[currentKeyId]} />}

                {/* ✨ NEW MODALS */}
                {showGroupModal && (
                    <CreateGroupModal
                        onClose={() => setShowGroupModal(false)}
                        friendsList={friendsList}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        onGroupCreated={(newConv) => {
                            setConversations(prev => [newConv, ...prev]);
                            setActiveChat('dm', newConv.id, 'Grup Sohbeti');
                        }}
                    />
                )}
                {showWhiteboard && activeChat.type === 'room' && (
                    <WhiteboardModal
                        roomSlug={activeChat.id}
                        onClose={() => setShowWhiteboard(false)}
                        wsProtocol={WS_PROTOCOL}
                        apiHost={API_HOST}
                    />
                )}
                {showSoundboard && (
                    <SoundboardModal
                        onClose={() => setShowSoundboard(false)}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        sendSignal={sendSignal}
                        absoluteHostUrl={ABSOLUTE_HOST_URL}
                    />
                )}
                {showDJ && (
                    <DJModal onClose={() => setShowDJ(false)} ws={ws} roomSlug={activeChat.id} />
                )}
            </Suspense>

            {/* --- LAYOUT --- */}
            {/* Mobile overlay for left sidebar */}
            {isMobile && isLeftSidebarVisible && (
                <div style={styles.mobileOverlay} onClick={() => setIsLeftSidebarVisible(false)} />
            )}

            {/* Mobile overlay for right sidebar */}
            {isMobile && isRightSidebarVisible && (
                <div style={styles.mobileOverlay} onClick={() => setIsRightSidebarVisible(false)} />
            )}

            <div style={styles.chatLayout}>
                <Suspense fallback={<div className="loading-spinner"></div>}>
                    {/* --- MODALS --- */}
                    {/* LEFT SIDEBAR */}
                    {(!isMobile || isLeftSidebarVisible) && (
                        <div style={{ ...styles.sidebarWrapper, ...(isMobile && styles.mobileSidebar), paddingTop: mobileWebPadding, paddingBottom: safeAreaBottom, height: '100%', boxSizing: 'border-box' }}>
                            <Suspense fallback={<div style={{ padding: 20, color: '#ccc' }}>Sunucular yükleniyor...</div>}>
                                <RoomList
                                    onFriendsClick={() => setActiveChat('friends', 'friends')}
                                    onWelcomeClick={() => { setActiveChat('welcome', 'welcome'); if (isMobile) setIsLeftSidebarVisible(false); }}
                                    setIsLeftSidebarVisible={setIsLeftSidebarVisible}
                                    onProfileClick={() => setShowProfilePanel(true)}
                                    onOpenStore={() => setShowStore(true)}
                                    onOpenServerSettings={(server) => setServerToEdit(server)}
                                    categories={sortedServers}
                                    onServerDragStart={handleServerDragStart}
                                    onServerDragOver={handleServerDragOver}
                                    onServerDragEnd={handleServerDragEnd}
                                    onServerDrop={handleServerDrop}
                                    conversations={conversations}
                                    allUsers={allUsers}
                                    onlineUsers={onlineUsers}
                                    serverMembers={serverMembers}
                                    isAdmin={isAdmin}
                                    friendsList={friendsList}
                                    currentUsername={username}
                                    onUserClick={(u) => setViewingProfile(allUsers.find(usr => usr.username === u))}
                                    userAvatar={getRealUserAvatar(username)}
                                    onlineStatus="online"
                                    getDeterministicAvatar={getDeterministicAvatar}
                                    getRealUserAvatar={getRealUserAvatar}
                                    joinVoiceChat={joinChannel}
                                    voiceUsers={voiceUsers}
                                    currentVoiceRoom={currentVoiceRoom}
                                    remoteVolumes={remoteVolumes}
                                    setRemoteVolume={setRemoteVolume}
                                    isPttActive={false}
                                    apiBaseUrl={API_BASE_URL}
                                    fetchWithAuth={fetchWithAuth}
                                    onHideConversation={() => { }}
                                    handleDrop={handleSidebarDrop}
                                    dropTarget={dropTarget}
                                    setDropTarget={setDropTarget}
                                    isDragging={isDragging}
                                    // ✨ GRUP OLUŞTURMA BUTONU İÇİN PROP
                                    onOpenCreateGroup={() => setShowGroupModal(true)}
                                    toggleMute={toggleMute}
                                    toggleDeafened={toggleDeafened}
                                    isMuted={isMuted}
                                    isDeafened={isDeafened}
                                    isInVoice={isInVoice}
                                    isConnecting={isConnecting} // ✨ EKLENDİ
                                    toggleVideo={toggleVideo}
                                    // 🆕 DM seçimi için handler
                                    onDMSelect={handleDMSelect}
                                    currentConversationId={activeChat.type === 'dm' ? activeChat.id : null}
                                    activeChat={activeChat}
                                    toggleScreenShare={toggleScreenShare}
                                    isVideoEnabled={isVideoEnabled}
                                    isScreenSharing={isScreenSharing}
                                />
                            </Suspense>
                        </div>
                    )}

                    {/* MAIN CONTENT */}
                    <div style={styles.mainContent}>
                        {activeChat.type === 'friends' ? (
                            <div style={{ width: '100%', height: '100%', paddingTop: mobileWebPadding }}>
                                <Suspense fallback={<LazyLoader />}>
                                    <FriendsTab fetchWithAuth={fetchWithAuth} apiBaseUrl={API_BASE_URL} onStartDM={handleDMClick} getDeterministicAvatar={getDeterministicAvatar} onClose={() => setActiveChat('welcome', 'welcome')} />
                                </Suspense>
                            </div>
                        ) : activeChat.type === 'welcome' ? (
                            <div style={{ width: '100%', height: '100%' }}>
                                <Suspense fallback={<LazyLoader />}>
                                    <WelcomeScreen
                                        isMobile={isMobile}
                                        onOpenMenu={() => setIsLeftSidebarVisible(true)}
                                        onOpenRightMenu={() => setIsRightSidebarVisible(true)}
                                        updateAvailable={updateAvailable}
                                        onStartUpdate={handleStartUpdate}
                                        isDownloading={isDownloading}
                                        downloadProgress={downloadProgress}
                                        updateStatusText={updateStatusText}
                                        onSwitchToFriends={() => setActiveChat('friends', 'friends')}
                                        onSwitchToAI={() => setActiveChat('room', 'ai')}
                                        onSwitchToCinema={() => setShowCinema(true)}
                                    />
                                </Suspense>
                            </div>
                        ) : activeRoomType === 'kanban' ? (
                            <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                                <div style={styles.chatHeader}><h2># {chatTitle} (Pano)</h2></div>
                                <Suspense fallback={<LazyLoader />}><KanbanBoard roomSlug={activeChat.id} apiBaseUrl={API_BASE_URL} fetchWithAuth={fetchWithAuth} /></Suspense>
                            </div>
                        ) : (
                            // --- CHAT AREA ---
                            <div style={{ ...styles.chatArea, position: 'relative', paddingTop: mobileWebPadding, boxSizing: 'border-box' }} onDrop={handleChatDrop} onDragOver={(e) => e.preventDefault()}>
                                <div style={{ ...styles.chatHeader, justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                                        {isMobile && <button onClick={() => setIsLeftSidebarVisible(true)} style={styles.mobileMenuButton}>☰</button>}
                                        <h2
                                            style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0, fontSize: '1.1em', cursor: 'pointer' }}
                                            onClick={() => {
                                                // Eğer DM ise, başlıktaki isme tıklayınca profili aç
                                                if (activeChat.type === 'dm') {
                                                    // 🆕 targetUser null olsa bile conversations'tan bul
                                                    let targetUser = activeChat.targetUser;
                                                    if (!targetUser && conversations.length > 0) {
                                                        const conv = conversations.find(c => c.id === activeChat.id);
                                                        if (conv) {
                                                            const other = conv.participants?.find(p => p.username !== username);
                                                            targetUser = other?.username;
                                                        }
                                                    }
                                                    const userObj = allUsers.find(u => u.username === targetUser);
                                                    if (userObj) setViewingProfile(userObj);
                                                }
                                            }}
                                        >
                                            {activeChat.type === 'dm'
                                                ? (() => {
                                                    // 🆕 targetUser null olsa bile conversations'tan bul
                                                    let displayName = activeChat.targetUser;
                                                    if (!displayName && conversations.length > 0) {
                                                        const conv = conversations.find(c => c.id === activeChat.id);
                                                        if (conv) {
                                                            const other = conv.participants?.find(p => p.username !== username);
                                                            displayName = other?.username;
                                                        }
                                                    }
                                                    return displayName || 'Sohbet';
                                                })()
                                                : `# ${chatTitle}`}
                                        </h2>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        {/* 🔐 ŞİFRELEME BUTONU */}
                                        {activeChat.type === 'dm' && (
                                            <button onClick={() => setShowEncModal(true)} style={{ ...styles.iconButton, color: hasKey ? '#43b581' : '#b9bbbe' }} title={hasKey ? "Sohbet Şifreli" : "Şifrele"}>
                                                {hasKey ? <FaLock /> : <FaUnlock />}
                                            </button>
                                        )}
                                        <button onClick={() => setShowCinema(true)} style={{ ...styles.iconButton, color: '#faa61a' }} title="Sinema"><FaFilm /></button>
                                        <button onClick={() => setShowDJ(true)} style={styles.iconButton} title="DJ Modu">
                                            <FaHeadphones />
                                        </button>
                                        <button onClick={() => setShowWhiteboard(true)} style={{ ...styles.iconButton, color: '#00a8fc' }} title="Beyaz Tahta">
                                            <FaPenNib />
                                        </button>
                                        {/* ✨ SES EFEKT BUTONU (Sadece Seslideyken) */}
                                        {isInVoice && (
                                            <button onClick={() => setShowSoundboard(true)} style={{ ...styles.iconButton, color: '#eb459e' }} title="Ses Efektleri">
                                                <FaMusic />
                                            </button>
                                        )}
                                        {isMobile && (<button onClick={() => setIsRightSidebarVisible(true)} style={styles.mobileMenuButton}><FaUsers /></button>)}
                                    </div>
                                </div>

                                <div
                                    style={{
                                        ...styles.messageBox,
                                        border: isDragging ? '3px dashed #5865f2' : 'none',
                                        backgroundColor: isDragging ? 'rgba(88, 101, 242, 0.1)' : 'transparent'
                                    }}
                                    onDragEnter={handleDragEnter}
                                    onDragLeave={handleDragLeave}
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                >
                                    {isDragging && (
                                        <div style={styles.dragOverlay}>
                                            <div style={styles.dragOverlayContent}>
                                                <FaPaperclip style={{ fontSize: '48px', marginBottom: '16px' }} />
                                                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Dosyayı buraya bırak</p>
                                                <p style={{ fontSize: '14px', opacity: 0.8 }}>Resim, video, ses veya doküman yükle</p>
                                            </div>
                                        </div>
                                    )}
                                    {messageHistoryLoading && <p style={styles.systemMessage}>Yükleniyor...</p>}
                                    {messages.map(msg => (
                                        <Message
                                            key={msg.id || msg.temp_id}
                                            msg={msg}
                                            currentUser={username}
                                            absoluteHostUrl={ABSOLUTE_HOST_URL}
                                            isAdmin={isAdmin}
                                            onImageClick={setZoomedImage}
                                            fetchWithAuth={fetchWithAuth}
                                            allUsers={allUsers}
                                            getDeterministicAvatar={getDeterministicAvatar}
                                            onShowChart={setChartSymbol}
                                            messageEditHistoryUrl={`${API_BASE_URL}/messages/`}
                                            // 👇 YENİ: Resim yüklenince scroll'u tetikleyen prop
                                            onContentLoad={() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })}
                                        />
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>

                                <div style={{ ...styles.inputContainer, paddingBottom: isNativeApp ? `calc(16px + ${safeAreaBottom})` : (isMobile ? '25px' : '16px') }}>
                                    {/* 🆕 Upload Progress Indicator */}
                                    {isUploading && (
                                        <div style={styles.uploadProgressContainer}>
                                            <div style={styles.uploadProgressInfo}>
                                                <span style={styles.uploadFileName}>
                                                    📎 {uploadingFileName.length > 30 ? uploadingFileName.substring(0, 27) + '...' : uploadingFileName}
                                                </span>
                                                <span style={styles.uploadPercent}>{uploadProgress}%</span>
                                            </div>
                                            <div style={styles.uploadProgressBar}>
                                                <div
                                                    style={{
                                                        ...styles.uploadProgressFill,
                                                        width: `${uploadProgress}%`
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* ✨ YENİ: Modern MessageInput Component */}
                                    <MessageInput
                                        onSendMessage={sendMessage}
                                        onFileUpload={uploadFile}
                                        onShowCodeSnippet={() => setShowSnippetModal(true)}
                                        placeholder={
                                            activeChat.type === 'dm'
                                                ? `@${activeChat.targetUser || 'DM'} kişisine mesaj gönder`
                                                : `#${chatTitle} kanalına mesaj gönder`
                                        }
                                        editingMessage={editingMessage}
                                        onCancelEdit={() => setEditingMessage(null)}
                                        replyingTo={replyingTo}
                                        onCancelReply={() => setReplyingTo(null)}
                                        disabled={isUploading}
                                        pendingFilesFromDrop={pendingFilesFromDrop}
                                        onClearPendingFiles={() => setPendingFilesFromDrop([])}
                                    />
                                </div>
                            </div>
                        )}

                        {(!isMobile || isRightSidebarVisible) && activeChat.type !== 'friends' && activeChat.type !== 'welcome' && (
                            <div style={{ ...styles.chatUserListPanel, ...(isMobile ? styles.mobileRightSidebar : {}), paddingTop: mobileWebPadding }}>
                                {isMobile && (
                                    <div style={styles.mobileRightSidebarHeader}>
                                        <span style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>Üyeler</span>
                                        <button onClick={() => setIsRightSidebarVisible(false)} style={styles.closeSidebarButton}>
                                            <FaTimes />
                                        </button>
                                    </div>
                                )}
                                <Suspense fallback={<LazyLoader />}>
                                    <ChatUserList
                                        chatUsers={[]}
                                        allUsers={allUsers}
                                        onlineUsers={onlineUsers}
                                        currentUser={username}
                                        getDeterministicAvatar={getDeterministicAvatar}
                                        onUserClick={(u) => setViewingProfile(allUsers.find(usr => usr.username === u))}
                                        activeChat={activeChat}
                                        serverMembers={serverMembers}
                                        friendsList={friendsList}
                                    />
                                </Suspense>
                            </div>
                        )}
                    </div>
                </Suspense>
            </div>

            {isInVoice && (
                <FloatingVoiceIsland
                    islandState={islandState}
                    onDrag={(d) => setIslandState(p => ({ ...p, x: d.x, y: d.y }))}
                    onResize={(size) => setIslandState(p => ({ ...p, width: size.width, height: size.height }))}
                    isMobile={isMobile}
                    headerActions={
                        <button
                            onClick={() => setVoiceLayout(prev => prev === 'grid' ? 'focus' : 'grid')}
                            style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: 'none',
                                color: 'white',
                                borderRadius: '4px',
                                width: '28px',
                                height: '28px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                marginRight: '8px'
                            }}
                            title={voiceLayout === 'grid' ? "Odak Modu" : "Izgara Modu"}
                        >
                            {voiceLayout === 'grid' ? <FaWindowMaximize size={14} /> : <FaThLarge size={14} />}
                        </button>
                    }
                >
                    {/* ... Island Content ... */}
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        {/* ... Video Grid and Controls ... */}
                        <div style={{
                            ...styles.videoGrid,
                            display: 'grid',
                            gridTemplateColumns: voiceLayout === 'grid' ? 'repeat(auto-fit, minmax(280px, 1fr))' : '1fr',
                            gridAutoRows: 'min-content', // ✅ İçeriğe göre boyutlandır
                            gap: '12px',
                            flex: 1,
                            overflowY: 'auto',
                            overflowX: 'hidden', // ✅ Yatay scroll kaldır
                            alignContent: 'start', // ✅ Yukarıdan başla
                            padding: '12px',
                            // ✅ Custom scrollbar
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'rgba(88, 101, 242, 0.5) rgba(0,0,0,0.2)'
                        }}>
                            <UserVideoContainer
                                user={{ username, is_talking: isTalking, is_mic_off: isMuted, is_deafened: isDeafened }}
                                track={localCameraStream?.getVideoTracks()[0]}
                                streamType="camera"
                                isLocal={true}
                                avatarUrl={getRealUserAvatar(username)}
                            />
                            {localScreenStream && (
                                <UserVideoContainer
                                    key="local-screen"
                                    user={{ username }}
                                    track={localScreenStream.getVideoTracks()[0]}
                                    streamType="screen"
                                    isLocal={true}
                                    avatarUrl={getRealUserAvatar(username)}
                                />
                            )}
                            {/* --- REMOTE USERS GRID --- */}
                            {console.log("[AppContent] Rendering Remote Grid. RemoteStreams keys:", Object.keys(remoteStreams || {}))}
                            {Object.entries(remoteStreams || {}).map(([streamKey, stream]) => {
                                // 🔥 YENİ: Stream key'den username'i çıkar
                                // streamKey: "username" veya "username_camera" veya "username_screen"
                                const uName = streamKey.split('_')[0];
                                const streamType = streamKey.includes('_camera') ? 'camera'
                                    : streamKey.includes('_screen') ? 'screen'
                                        : 'audio';

                                console.log(`[AppContent] Checking stream: ${streamKey} (user: ${uName}, type: ${streamType})`);

                                if (uName === username) {
                                    console.log(`[AppContent] Skipping own stream: ${streamKey}`);
                                    return null;
                                }

                                const videoTracks = stream.getVideoTracks();
                                console.log(`[AppContent] Stream ${streamKey} has ${videoTracks.length} video tracks. Active:`, stream.active);

                                if (videoTracks.length === 0) {
                                    // Sadece ses varsa (Görüntü yoksa avatar göster)
                                    console.log(`[AppContent] Rendering AUDIO-ONLY for ${streamKey}`);
                                    return (
                                        <UserVideoContainer
                                            key={`${streamKey}-audio`}
                                            user={{ username: uName }}
                                            streamType="audio"
                                            avatarUrl={getRealUserAvatar(uName)}
                                        />
                                    );
                                }

                                // 🔥 YENİ: Sadece aktif track'leri render et
                                const activeTracks = videoTracks.filter(track => {
                                    console.log(`[AppContent] Track ${track.id} enabled:`, track.enabled, 'readyState:', track.readyState);
                                    return track.enabled && track.readyState === 'live';
                                });

                                console.log(`[AppContent] Stream ${streamKey} has ${activeTracks.length} ACTIVE video tracks`);

                                if (activeTracks.length === 0) {
                                    console.log(`[AppContent] No active tracks for ${streamKey}, skipping`);
                                    return null;
                                }

                                // Video stream'i render et
                                return (
                                    <React.Fragment key={streamKey}>
                                        {activeTracks.map((track, i) => {
                                            // Track'ten stream type'ı belirle
                                            const isScreenTrack = track.contentHint === 'detail' || streamType === 'screen';

                                            console.log(`[AppContent] Rendering video for ${streamKey}, track ${i}, isScreen:`, isScreenTrack);

                                            return (
                                                <UserVideoContainer
                                                    key={`${streamKey}-${track.id}-${i}`}
                                                    user={{ username: uName }}
                                                    track={track}
                                                    streamType={isScreenTrack ? 'screen' : 'camera'}
                                                    avatarUrl={getRealUserAvatar(uName)}
                                                />
                                            );
                                        })}
                                    </React.Fragment>
                                );
                            })}
                        </div>

                        {/* 🎛️ SES & VİDEO KONTROLLERİ */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '15px',
                            padding: '10px',
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            borderTop: '1px solid rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(10px)',
                            marginTop: 'auto'
                        }}>
                            <button onClick={toggleMute} style={{ ...styles.iconButton, backgroundColor: isMuted ? '#da373c' : 'rgba(255,255,255,0.1)' }} title={isMuted ? "Mikrofonu Aç" : "Mikrofonu Kapat"}>
                                {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                            </button>
                            <button onClick={toggleDeafened} style={{ ...styles.iconButton, backgroundColor: isDeafened ? '#da373c' : 'rgba(255,255,255,0.1)' }} title={isDeafened ? "Sağırlaştırmayı Kapat" : "Sağırlaştır"}>
                                <FaHeadphones style={{ opacity: isDeafened ? 0.5 : 1 }} />
                            </button>
                            <button onClick={toggleVideo} style={{ ...styles.iconButton, backgroundColor: localCameraStream ? '#23a559' : 'rgba(255,255,255,0.1)' }} title={localCameraStream ? "Kamerayı Kapat" : "Kamerayı Aç"}>
                                {localCameraStream ? <FaVideo /> : <FaVideoSlash />}
                            </button>
                            <button onClick={toggleScreenShare} style={{ ...styles.iconButton, backgroundColor: isScreenSharing ? '#23a559' : 'rgba(255,255,255,0.1)' }} title={isScreenSharing ? "Ekran Paylaşımını Durdur" : "Ekranı Paylaş"}>
                                <FaDesktop style={{ opacity: isScreenSharing ? 1 : 0.6 }} />
                            </button>
                            <button onClick={leaveChannel} style={{ ...styles.iconButton, backgroundColor: '#da373c' }} title="Sesli Sohbetten Ayrıl">
                                <FaTimes />
                            </button>
                        </div>
                    </div>
                </FloatingVoiceIsland>
            )}

            {/* 🔊 AUDIO CONTROLLER - MOVED TO ROOT TO ENSURE RENDERING */}
            {isInVoice && (
                <VoiceAudioController
                    remoteStreams={remoteStreams}
                    remoteVolumes={remoteVolumes}
                    mutedUsers={mutedUsers || new Set()}
                />
            )}
        </div>
    );
};

export default AppContent;


