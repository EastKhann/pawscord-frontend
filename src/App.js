// frontend/src/App.js

import React, { useState, useEffect, useRef, useCallback, useMemo, Suspense } from 'react';
import ReactDOM from 'react-dom';
import SparkMD5 from 'spark-md5';
import './index.css';
import './styles/modern-theme.css'; // 🎨 Modern Elegant Theme
import { Capacitor } from '@capacitor/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'; // 🛡️ ERROR BOUNDARY

// ⚡ OPTIMIZATION IMPORTS
import { registerServiceWorker, setupInstallPrompt, setupNetworkMonitor } from './utils/pwaHelper';
import { initializeCSSOptimization } from './utils/criticalCSS';
import { preloadCriticalChunks, prefetchNextChunks } from './utils/codeSplitting.config'; // 🚀 CODE SPLITTING

// --- İKONLAR (OPTIMIZED) ---
import {
    FaPlusCircle, FaUsers, FaFilm,
    FaGift, FaMicrophone, FaCode,
    FaSearch, FaBroom, FaLock, FaCoffee, FaMagic, FaPaperPlane,
    FaLink, FaThumbtack, FaBellSlash, FaBell, FaTimes, FaPoll, FaPhoneSlash,
    FaHeadphones, FaVideo, FaDesktop, FaTrash // 🔥 Ses kontrol ikonları eklendi
} from './utils/iconOptimization'; // ⚡ OPTIMIZATION: -130KB bundle size
import { loadSavedTheme } from './utils/ThemeManager';

// --- STORE & UTILS ---
import { useChatStore } from './stores/useChatStore';
import { encryptMessage } from './utils/encryption';
import toast from './utils/toast';
import useResponsive from './hooks/useResponsive'; // 🔥 RESPONSIVE HOOK
import { useOptimizedMessages, useOnlineUsers } from './hooks/useOptimizedMessages'; // 🚀 PERFORMANS HOOK
import usePageTracking from './hooks/usePageTracking'; // 📊 PAGE VIEW TRACKING
import { useDebounce, useThrottle } from './utils/performanceOptimization'; // ⚡ DEBOUNCE & THROTTLE HOOKS

// --- CONTEXT ---
import { useAuth } from './AuthContext';
import { VoiceProvider, useVoice } from './VoiceContext';
import { useGlobalWebSocket } from './GlobalWebSocketContext';

// --- CRITICAL COMPONENTS ONLY (Initial load) ---
const Message = React.lazy(() => import(/* webpackChunkName: "message-ui" */ './Message')); // ⚡ LAZY: Mesaj görüntüleme
const VirtualMessageList = React.lazy(() => import(/* webpackChunkName: "message-ui" */ './components/VirtualMessageList')); // ⚡ LAZY: Virtual scrolling
const MessageInput = React.lazy(() => import(/* webpackChunkName: "message-ui" */ './components/MessageInput')); // ⚡ LAZY: Mesaj input
import MaintenanceBanner from './components/MaintenanceBanner';
import LoadingSpinner from './components/LoadingSpinner'; // 🌀 Loading indicator

// ⚡ LAZY LOAD: Voice/Video components (not needed until voice chat)
const UserVideoContainer = React.lazy(() => import(/* webpackChunkName: "voice" */ './UserVideoContainer'));
const VoiceAudioController = React.lazy(() => import(/* webpackChunkName: "voice" */ './VoiceAudioController'));
const RichTextEditor = React.lazy(() => import(/* webpackChunkName: "editor" */ './components/RichTextEditor'));
const StickyMessageBanner = React.lazy(() => import(/* webpackChunkName: "features" */ './components/StickyMessageBanner'));

// ⚡ LAZY LOAD: Auth screens (non-critical, load on demand)
import SplashScreen from './SplashScreen'; // 🔥 DIRECT IMPORT: Splash screen must load instantly
const LoginPage = React.lazy(() => import(/* webpackChunkName: "auth", webpackMode: "lazy" */ './LoginPage'));
const WelcomeScreen = React.lazy(() => import(/* webpackChunkName: "auth", webpackMode: "lazy" */ './WelcomeScreen'));

// ⚡ OPTIMIZATION: Lazy load modal components (on-demand loading)
const ImageModal = React.lazy(() => import(/* webpackMode: "lazy" */ './ImageModal'));
const UserProfileModal = React.lazy(() => import(/* webpackMode: "lazy" */ './UserProfileModal'));
const PollCreateModal = React.lazy(() => import(/* webpackMode: "lazy" */ './components/PollCreateModal'));
const CodeSnippetModal = React.lazy(() => import(/* webpackMode: "lazy" */ './components/CodeSnippetModal'));
const AvatarCropper = React.lazy(() => import(/* webpackMode: "lazy" */ './components/AvatarCropper')); // 📸 AVATAR CROPPER

// --- AĞIR BİLEŞENLER (Lazy Load - Performans İçin) ---
// Bu bileşenler sadece ihtiyaç duyulduğunda yüklenir, açılışı yavaşlatmaz.
const CryptoChartModal = React.lazy(() => import(/* webpackMode: "lazy" */ './CryptoChartModal'));
const CryptoStoreModal = React.lazy(() => import(/* webpackMode: "lazy" */ './components/CryptoStoreModal'));
const PremiumStoreModal = React.lazy(() => import(/* webpackMode: "lazy" */ './components/PremiumStoreModal')); // 🔥 YENİ: Premium Mağaza
const WhiteboardModal = React.lazy(() => import(/* webpackMode: "lazy" */ './components/WhiteboardModal'));
const SoundboardModal = React.lazy(() => import(/* webpackMode: "lazy" */ './components/SoundboardModal'));
const KanbanBoard = React.lazy(() => import(/* webpackMode: "lazy" */ './components/KanbanBoard'));
const SummaryModal = React.lazy(() => import(/* webpackMode: "lazy" */ './SummaryModal'));
const MessageTemplateModal = React.lazy(() => import(/* webpackMode: "lazy" */ './components/MessageTemplateModal'));
const CinemaModal = React.lazy(() => import(/* webpackMode: "lazy" */ './CinemaModal'));
const StickerPicker = React.lazy(() => import(/* webpackMode: "lazy" */ './StickerPicker'));
const GifPicker = React.lazy(() => import(/* webpackMode: "lazy" */ './GifPicker'));
const DJModal = React.lazy(() => import(/* webpackMode: "lazy" */ './components/DJModal'));
const ThemeStoreModal = React.lazy(() => import(/* webpackMode: "lazy" */ './components/ThemeStoreModal'));
// 🆕 YENİ: Daha fazla lazy loading
const EncryptionKeyModal = React.lazy(() => import(/* webpackMode: "lazy" */ './components/EncryptionKeyModal'));
const DownloadModal = React.lazy(() => import(/* webpackMode: "lazy" */ './components/DownloadModal'));
const ServerSettingsModal = React.lazy(() => import(/* webpackMode: "lazy" */ './components/ServerSettingsModal'));
const CreateGroupModal = React.lazy(() => import(/* webpackMode: "lazy" */ './components/CreateGroupModal'));
const AdminAnalyticsPanel = React.lazy(() => import(/* webpackMode: "lazy" */ './components/AdminAnalyticsPanel')); // 🔥 YENİ: Admin Analytics
const AdminPanelModal = React.lazy(() => import(/* webpackMode: "lazy" */ './components/AdminPanelModal')); // 🔥 Admin Panel Modal
const WebhooksPanel = React.lazy(() => import(/* webpackMode: "lazy" */ './components/WebhooksPanel')); // 🔥 Webhooks Panel
const VanityURLManager = React.lazy(() => import(/* webpackMode: "lazy" */ './components/VanityURLManager')); // 🔥 Vanity URL Manager

// �️ MODERATION: Moderation Tools (2026-01-15)
const AutoModerationDashboard = React.lazy(() => import(/* webpackChunkName: "moderation" */ './components/AutoModerationDashboard'));
const AutoModerationPanel = React.lazy(() => import(/* webpackChunkName: "moderation" */ './components/AutoModerationPanel')); // 🔥 YENİ
const RaidProtectionPanel = React.lazy(() => import(/* webpackChunkName: "moderation" */ './components/RaidProtectionPanel'));
const ReportSystemPanel = React.lazy(() => import(/* webpackChunkName: "moderation" */ './components/ReportSystemPanel'));
const AuditLogPanel = React.lazy(() => import(/* webpackChunkName: "moderation" */ './components/AuditLogPanel'));
const UserWarningsPanel = React.lazy(() => import(/* webpackChunkName: "moderation" */ './components/UserWarningsPanel'));

// 📚 FEATURE: New Feature Panels (2026-01-19)
const BookmarkPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/BookmarkPanel')); // 📚 Bookmark Organization
const ReadLaterPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/ReadLaterPanel')); // 📖 Read Later
const ChannelPermissionsPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/ChannelPermissionsPanel')); // 🔐 Channel Permissions
const MessageThreadsPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/MessageThreadsPanel')); // 💬 Message Threads
const ModeratorNotesPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/ModeratorNotesPanel')); // 📝 Moderator Notes
const ServerRolesPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/ServerRolesPanel')); // 👑 Server Roles
const NotificationPreferencesPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/NotificationPreferencesPanel')); // 🔔 Notifications
const MessageOCRPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/MessageOCRPanel')); // 🔍 OCR Text Extraction
const MassActionsPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/MassActionsPanel')); // ⚡ Mass Moderation
const TimeoutMutePanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/TimeoutMutePanel')); // ⏰ Timeout/Mute
const ServerThemesPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/ServerThemesPanel')); // 🎨 Server Themes
const KeywordMutesPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/KeywordMutesPanel')); // 🚫 Keyword Filters
const WelcomeTemplatesPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/WelcomeTemplatesPanel')); // 👋 Welcome Messages
const StickyMessagesPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/StickyMessagesPanel')); // 📌 Sticky Messages
const MessageTemplatesPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/MessageTemplatesPanel')); // 📄 Message Templates
const MessageExportPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/MessageExportPanel')); // 💾 Export History
const ArchivedRoomsPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/ArchivedRoomsPanel')); // 📦 Archived Channels
const SlowModePanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/SlowModePanel')); // 🐢 Slow Mode
const EmojiManagementPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/EmojiManagementPanel')); // 😀 Emoji Management

// 🚀 BATCH 1: Analytics & Tracking (2026-01-19)
const ReactionAnalyticsPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/ReactionAnalyticsPanel'));
const LinkClickTrackingPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/LinkClickTrackingPanel'));
const JoinLeaveLogsPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/JoinLeaveLogsPanel'));
const UserActivityPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/UserActivityPanel'));
const NicknameHistoryPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/NicknameHistoryPanel'));
const FieldChangeTrackingPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/FieldChangeTrackingPanel'));
const InviteAnalyticsPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/InviteAnalyticsPanel'));

// 🚀 BATCH 2: Content & Moderation (2026-01-19)
const ContentScannerPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/ContentScannerPanel'));
const EphemeralMessagesPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/EphemeralMessagesPanel'));
const TopicHistoryPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/TopicHistoryPanel'));
const DraftsPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/DraftsPanel'));
const ServerNicknamesPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/ServerNicknamesPanel'));

// 🚀 BATCH 3: Server Features (2026-01-19)
const ServerBoostPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/ServerBoostPanel'));
const RoomWebhooksPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/RoomWebhooksPanel'));
const OAuthAppsPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/OAuthAppsPanel'));
const VanityURLPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/VanityURLPanel'));
const AutoRespondersPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/AutoRespondersPanel'));

// 🚀 BATCH 4: Security & Privacy (2026-01-19)
const SessionManagementPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/SessionManagementPanel'));
const GDPRExportPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/GDPRExportPanel'));
const DataRetentionPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/DataRetentionPanel'));
const TwoFactorSetupWizard = React.lazy(() => import(/* webpackChunkName: "features" */ './components/TwoFactorSetupWizard'));

// 🚀 BATCH 5: Communication (2026-01-19)
const EnhancedPollsPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/EnhancedPollsPanel'));
const VoiceTranscriptsPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/VoiceTranscriptsPanel'));

// 💰 CRITICAL & HIGH PRIORITY: Payment & Engagement (2026-01-19)
const PaymentPanel = React.lazy(() => import(/* webpackChunkName: "critical" */ './components/PaymentPanel')); // 💰 Payment System
const StoreModal = React.lazy(() => import(/* webpackChunkName: "critical" */ './components/StoreModal')); // 🛒 Store
const DailyRewardsModal = React.lazy(() => import(/* webpackChunkName: "engagement" */ './components/DailyRewardsModal')); // 🎁 Daily Rewards
const APIUsagePanel = React.lazy(() => import(/* webpackChunkName: "engagement" */ './components/APIUsagePanel')); // 📊 API Analytics
const ExportJobsPanel = React.lazy(() => import(/* webpackChunkName: "engagement" */ './components/ExportJobsPanel')); // 📥 Export Jobs
const ScheduledAnnouncementsPanel = React.lazy(() => import(/* webpackChunkName: "engagement" */ './components/ScheduledAnnouncementsPanel')); // 📢 Scheduled Announcements
const InviteExportPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/InviteExportPanel'));

// 🚀 BATCH 6: Advanced Search & Analytics (2026-01-19)
const AdvancedSearchPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/AdvancedSearchPanel'));
const GrowthMetricsPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/GrowthMetricsPanel'));
const LinkPreviewRenderer = React.lazy(() => import(/* webpackChunkName: "features" */ './components/LinkPreviewRenderer'));

// 🚀 BATCH 7: Store & Gamification (2026-01-19)
const InventoryPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/InventoryPanel'));
const WaitlistPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/WaitlistPanel'));
const ReferralRewardsPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/ReferralRewardsPanel'));

// �🔐 ROADMAP: Auth & Security Pages
const VerifyEmailPage = React.lazy(() => import('./pages/VerifyEmailPage'));
const ForgotPasswordPage = React.lazy(() => import('./pages/ForgotPasswordPage'));
const ResetPasswordPage = React.lazy(() => import('./pages/ResetPasswordPage'));
const TwoFactorLoginPage = React.lazy(() => import('./pages/TwoFactorLoginPage'));

// 🔐 NEW: 2FA & Email Components
const TwoFactorSetup = React.lazy(() => import(/* webpackChunkName: "security" */ './components/TwoFactorSetup'));
const TwoFactorLogin = React.lazy(() => import(/* webpackChunkName: "security" */ './components/TwoFactorLogin'));

// 🔗 Vanity URL Invite Screen
const VanityInviteScreen = React.lazy(() => import(/* webpackChunkName: "features" */ './components/VanityInviteScreen'));
const EmailVerification = React.lazy(() => import(/* webpackChunkName: "security" */ './components/EmailVerification'));

// 📱 NEW: Mobile Components
const MobileNav = React.lazy(() => import(/* webpackChunkName: "mobile" */ './components/MobileNav'));
const SwipeActions = React.lazy(() => import(/* webpackChunkName: "mobile" */ './components/SwipeActions'));
const VoiceMessage = React.lazy(() => import(/* webpackChunkName: "mobile" */ './components/VoiceMessage'));

// ⚡ YENİ: Additional lazy loading
const FriendsTab = React.lazy(() => import(/* webpackChunkName: "main-ui" */ './FriendsTab'));
const RoomList = React.lazy(() => import(/* webpackChunkName: "main-ui" */ './RoomList'));
const UserProfilePanel = React.lazy(() => import(/* webpackChunkName: "main-ui" */ './UserProfilePanel'));
const VoiceChatPanel = React.lazy(() => import(/* webpackChunkName: "main-ui" */ './VoiceChatPanel'));
const ChatUserList = React.lazy(() => import(/* webpackChunkName: "main-ui" */ './ChatUserList'));
const PinnedMessages = React.lazy(() => import(/* webpackChunkName: "features" */ './PinnedMessages'));
const FloatingVoiceIsland = React.lazy(() => import(/* webpackChunkName: "features" */ './FloatingVoiceIsland'));
const CinemaPlayer = React.lazy(() => import(/* webpackChunkName: "features" */ './components/CinemaPlayer'));
const ConnectionsPanel = React.lazy(() => import(/* webpackChunkName: "features" */ './components/ConnectionsPanel')); // 🔗 Platform Connections
const PasswordSetupModal = React.lazy(() => import(/* webpackChunkName: "auth" */ './components/PasswordSetupModal')); // 🔑 Google Password Setup
const NotificationDropdown = React.lazy(() => import(/* webpackChunkName: "features" */ './components/NotificationDropdown'));

// 📊 NEW: Nice-to-Have Analytics Panels (2026-01-30)
const ReactionStatsPanel = React.lazy(() => import(/* webpackChunkName: "analytics" */ './components/panels/ReactionStatsPanel')); // 📊 Reaction Statistics
const ServerHealthPanel = React.lazy(() => import(/* webpackChunkName: "analytics" */ './components/panels/ServerHealthPanel')); // 🏥 Server Health
const ChannelAnalyticsPanel = React.lazy(() => import(/* webpackChunkName: "analytics" */ './components/panels/ChannelAnalyticsPanel')); // 📈 Channel Analytics
const SmartSuggestionsPanel = React.lazy(() => import(/* webpackChunkName: "analytics" */ './components/panels/SmartSuggestionsPanel')); // 🤖 AI Suggestions
const UserPresenceInsightsPanel = React.lazy(() => import(/* webpackChunkName: "analytics" */ './components/panels/UserPresenceInsightsPanel')); // 👤 User Insights

// --- YENİ EKLEMELER: Eksik componentler - LAZY LOAD OPTIMIZATION ---
const UserFooter = React.lazy(() => import(/* webpackChunkName: "main-ui" */ './components/UserFooter')); // 👤 Kullanıcı footer
const UserContextMenu = React.lazy(() => import(/* webpackChunkName: "main-ui" */ './components/UserContextMenu')); // 🖱️ Kullanıcı sağ tık menüsü

// --- AYARLAR ---
// Bu kısmı tamamen değiştiriyoruz:

const DJANGO_PORT = "8888";

const isElectron = typeof window !== 'undefined' && typeof window.require === 'function';
const isNative = window.Capacitor && window.Capacitor.isNativePlatform();

// 🔥 Production build kontrolü - EXE dağıtımı için
const isProductionBuild = import.meta.env.PROD || process.env.NODE_ENV === 'production';

const API_URL_BASE_STRING = (() => {
    // 1. Mobil Uygulama ise gerçek siteye git
    if (isNative) return "https://pawscord.com";

    // 2. Electron Masaüstü ise
    if (isElectron) {
        // Production build'de (EXE dağıtımı) pawscord.com kullan
        // Development'ta localhost kullan
        return isProductionBuild ? "https://pawscord.com" : `http://127.0.0.1:${DJANGO_PORT}`;
    }

    // 3. Web Tarayıcısı ise (Chrome/Edge) adres çubuğundaki IP neyse onu kullan.
    // Böylece "localhost" veya "192.168.x.x" fark etmeksizin çalışır.
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;

    if (hostname.includes('pawscord.com')) {
        return "https://pawscord.com";
    }

    return `${protocol}//${hostname}:${DJANGO_PORT}`;
})();

// 🔥 FIX: Media dosyaları için ayrı URL (EXE/APK'da production URL kullan)
const MEDIA_BASE_URL = (() => {
    // EXE veya APK ise MUTLAKA production URL kullan (media dosyaları localhost'ta yok)
    if (isElectron || isNative) return "https://pawscord.com";

    // Web tarayıcısında ise normal API URL'i kullan
    return API_URL_BASE_STRING;
})();

const API_BASE_URL = `${API_URL_BASE_STRING}/api`;
const ABSOLUTE_HOST_URL = API_URL_BASE_STRING;
const WS_PROTOCOL = API_URL_BASE_STRING.startsWith('https') ? 'wss' : 'ws';
// API_HOST kısmını da dinamik yapıyoruz:
const API_HOST = API_URL_BASE_STRING.replace(/^https?:\/\//, '');
// URL CONSTANTS
const LOGIN_URL = `${API_BASE_URL}/auth/login/`;
const REGISTER_URL = `${API_BASE_URL}/auth/register/`;
const UPLOAD_FILE_URL = `${API_BASE_URL}/messages/upload_file/`;
const MESSAGE_HISTORY_ROOM_URL = `${API_BASE_URL}/messages/history/room/`;
const MESSAGE_HISTORY_DM_URL = `${API_BASE_URL}/messages/history/dm/`;
const ROOM_LIST_URL = `${API_BASE_URL}/rooms/list_with_categories/`;
const CONVERSATION_LIST_URL = `${API_BASE_URL}/conversations/`;
const GET_OR_CREATE_CONVERSATION_URL = `${API_BASE_URL}/conversations/find_or_create/`;
const ALL_USERS_URL = `${API_BASE_URL}/users/list_all/`;
const UPDATE_PROFILE_URL = `${API_BASE_URL}/users/update_profile/`;
const DEFAULT_AVATARS_URL = `${API_BASE_URL}/users/default_avatars/`;
const CHANGE_USERNAME_URL = `${API_BASE_URL}/users/change_username/`;
const LOCAL_GIF_LIST_URL = `${API_BASE_URL}/gifs/list_local/`;
const GOOGLE_WEB_CLIENT_ID = "774757987258-poa0elqqapnab8eud3tol3h2pilcqe71.apps.googleusercontent.com";
const DRAFT_STORAGE_KEY = 'chat_drafts_v1';

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

// --- ANA İÇERİK BİLEŞENİ ---
const AppContent = () => {
    const { user, isAuthenticated, token, login, logout, isLoading: isAuthLoading } = useAuth();
    const {
        isInVoice, isConnecting, currentRoom: currentVoiceRoom, joinChannel, leaveChannel,
        isMuted, isDeafened, toggleMute, toggleDeafened, toggleVideo, toggleScreenShare,
        remoteVolumes, setRemoteVolume, localCameraStream, remoteStreams, isTalking,
        sendSignal, isScreenSharing, isVideoEnabled, isPttActive, localScreenStream,
        sendReaction, lastReaction, // 🔥 EKLENDİ
        applyVoiceEffect, activeEffect, // 🔥 EKLENDİ
        cinemaState, setCinemaState, // 🔥 EKLENDİ
        gameState, sendGameSignal, // 🔥 EKLENDİ
        mutedUsers // 🔥 EKLENDİ
    } = useVoice();

    // Global WebSocket Data
    const { globalData } = useGlobalWebSocket();


    // Store State
    const activeChat = useChatStore(state => state.activeChat);
    const messages = useChatStore(state => state.messages);
    const encryptionKeys = useChatStore(state => state.encryptionKeys);
    const voiceUsers = useChatStore(state => state.voiceUsers); // 🔥 FIX: Voice users state eklendi
    const unreadCounts = useChatStore(state => state.unreadCounts); // 🔥 YENİ: Okunmamış mesaj sayıları

    // Store Actions
    const setActiveChat = useChatStore(state => state.setActiveChat);
    const addMessage = useChatStore(state => state.addMessage);
    const updateMessage = useChatStore(state => state.updateMessage); // 🔥 NEW
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
    const [showTemplateModal, setShowTemplateModal] = useState(false); // ✨ New State
    const [chartSymbol, setChartSymbol] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [updateStatusText, setUpdateStatusText] = useState('');
    const username = user?.username || '';
    const [showSnippetModal, setShowSnippetModal] = useState(false);
    const [showPollModal, setShowPollModal] = useState(false); // 🔥 NEW STATE
    const [focusedStream, setFocusedStream] = useState(null); // { id, user, track, streamType, avatarUrl, isLocal }

    // 🔥 RESPONSIVE HOOK (replaces old isMobile state)
    const { isMobile, isTablet, isDesktop, width, height, orientation, isTouchDevice } = useResponsive();

    const [searchQuery, setSearchQuery] = useState('');

    // ⚡ OPTIMIZATION: Debounce search query to reduce re-renders
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    const [safeAreaTop, setSafeAreaTop] = useState('0px');
    const safeAreaBottom = isNative ? 'max(20px, env(safe-area-inset-bottom))' : '0px';
    const [islandState, setIslandState] = useState({ width: 300, height: 225, x: 100, y: 100 });
    const [showVoiceIsland, setShowVoiceIsland] = useState(true); // 🔥 Toggle visibility
    const [useNewVoicePanel, setUseNewVoicePanel] = useState(true); // 🆕 Yeni panel kullan
    const [isVoicePanelMinimized, setIsVoicePanelMinimized] = useState(false); // 🆕 Panel minimize durumu

    // Modals & UI States
    const [animationState, setAnimationState] = useState('start');
    const [conversations, setConversations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [pinnedMessages, setPinnedMessages] = useState([]);
    const [defaultAvatars, setDefaultAvatars] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [isLeftSidebarVisible, setIsLeftSidebarVisible] = useState(false);
    const [isRightSidebarVisible, setIsRightSidebarVisible] = useState(false);
    const [showProfilePanel, setShowProfilePanel] = useState(false);
    const [showPinned, setShowPinned] = useState(false);
    const [showGifPicker, setShowGifPicker] = useState(false);
    const [authError, setAuthError] = useState('');
    const [showCinema, setShowCinema] = useState(false);
    const [showStickerPicker, setShowStickerPicker] = useState(false);
    const [selectedMessages, setSelectedMessages] = useState(new Set());
    const [zoomedImage, setZoomedImage] = useState(null);
    const [viewingProfile, setViewingProfile] = useState(null);
    const [dropTarget, setDropTarget] = useState(null);
    const [showStore, setShowStore] = useState(false);
    const [showThemeStore, setShowThemeStore] = useState(false);
    const [showAnalytics, setShowAnalytics] = useState(false); // 🔥 YENİ: Admin Analytics
    const [showAdminPanel, setShowAdminPanel] = useState(false); // 🔥 Admin Panel Modal
    const [showWebhooks, setShowWebhooks] = useState(false); // 🔥 Webhooks Panel
    const [showModTools, setShowModTools] = useState(false); // 🔥 Moderation Tools
    const [showVanityURL, setShowVanityURL] = useState(false); // 🔥 Vanity URL Manager

    // 🛡️ MODERATION: Moderation Panels (2026-01-15)
    const [showAutoModeration, setShowAutoModeration] = useState(false);
    const [showRaidProtection, setShowRaidProtection] = useState(false);
    const [showReportSystem, setShowReportSystem] = useState(false);
    const [showAuditLog, setShowAuditLog] = useState(false);
    const [showUserWarnings, setShowUserWarnings] = useState(false);
    const [showAutoResponder, setShowAutoResponder] = useState(false); // 🔥 Auto Responder

    // 📚 NEW FEATURES: Feature Panels (2026-01-19)
    const [showBookmarks, setShowBookmarks] = useState(false); // 📚 Bookmark Panel
    const [showReadLater, setShowReadLater] = useState(false); // 📖 Read Later
    const [showChannelPermissions, setShowChannelPermissions] = useState(false); // 🔐 Channel Permissions
    const [showMessageThreads, setShowMessageThreads] = useState(false); // 💬 Message Threads
    const [showModeratorNotes, setShowModeratorNotes] = useState(false); // 📝 Moderator Notes
    const [showServerRoles, setShowServerRoles] = useState(false); // 👥 Server Roles
    const [showNotificationPrefs, setShowNotificationPrefs] = useState(false); // 🔔 Notifications
    const [showMessageOCR, setShowMessageOCR] = useState(false); // 🔍 OCR
    const [showMassActions, setShowMassActions] = useState(false); // ⚡ Mass Actions

    // 🚀 BATCH 1: Analytics & Tracking (2026-01-19)
    const [showReactionAnalytics, setShowReactionAnalytics] = useState(false); // 📊 Reaction Analytics
    const [showLinkClickTracking, setShowLinkClickTracking] = useState(false); // 🔗 Link Click Tracking
    const [showJoinLeaveLogs, setShowJoinLeaveLogs] = useState(false); // 🚪 Join/Leave Logs
    const [showUserActivity, setShowUserActivity] = useState(false); // 📈 User Activity
    const [showNicknameHistory, setShowNicknameHistory] = useState(false); // 👤 Nickname History
    const [showFieldChangeTracking, setShowFieldChangeTracking] = useState(false); // 📋 Field Change Tracking
    const [showInviteAnalytics, setShowInviteAnalytics] = useState(false); // 📧 Invite Analytics

    // 🚀 BATCH 2: Content & Moderation (2026-01-19)
    const [showContentScanner, setShowContentScanner] = useState(false); // 🔍 Content Scanner
    const [showEphemeralMessages, setShowEphemeralMessages] = useState(false); // ⏱️ Ephemeral Messages
    const [showTopicHistory, setShowTopicHistory] = useState(false); // 📜 Topic History
    const [showDrafts, setShowDrafts] = useState(false); // 💾 Drafts
    const [showServerNicknames, setShowServerNicknames] = useState(false); // 🏷️ Server Nicknames

    // 🚀 BATCH 3: Server Features (2026-01-19)
    const [showServerBoost, setShowServerBoost] = useState(false); // 🚀 Server Boost
    const [showRoomWebhooks, setShowRoomWebhooks] = useState(false); // 🪝 Room Webhooks
    const [showOAuthApps, setShowOAuthApps] = useState(false); // 🔐 OAuth Apps
    // Note: showVanityURL already exists above
    const [showAutoResponders, setShowAutoResponders] = useState(false); // 🤖 Auto Responders

    // 🚀 BATCH 4: Security & Privacy (2026-01-19)
    const [showSessionManagement, setShowSessionManagement] = useState(false); // 🔒 Session Management
    const [showGDPRExport, setShowGDPRExport] = useState(false); // 📦 GDPR Export
    const [showDataRetention, setShowDataRetention] = useState(false); // 🗄️ Data Retention
    const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false); // 🔐 Two-Factor Auth

    // 🚀 BATCH 5: Communication (2026-01-19)
    const [showEnhancedPolls, setShowEnhancedPolls] = useState(false); // 📊 Enhanced Polls
    const [showVoiceTranscripts, setShowVoiceTranscripts] = useState(false); // 🎤 Voice Transcripts
    const [showInviteExport, setShowInviteExport] = useState(false); // 📤 Invite Export

    // 🚀 BATCH 6: Advanced Search & Analytics (2026-01-19)
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false); // 🔍 Advanced Search
    const [showGrowthMetrics, setShowGrowthMetrics] = useState(false); // 📈 Growth Metrics
    const [showLinkPreview, setShowLinkPreview] = useState(false); // 🔗 Link Preview

    // 🚀 BATCH 7: Store & Gamification (2026-01-19)
    const [showInventory, setShowInventory] = useState(false); // 🎒 Inventory
    const [showWaitlist, setShowWaitlist] = useState(false); // 📋 Waitlist
    const [showReferralRewards, setShowReferralRewards] = useState(false); // 🎁 Referral Rewards

    // 🎮 BATCH 8: New Features (2026-01-28)
    const [showMiniGames, setShowMiniGames] = useState(false); // 🎮 Mini Games Hub
    const [showProjectCollaboration, setShowProjectCollaboration] = useState(false); // 📂 Project Collaboration
    const [showAvatarStudio, setShowAvatarStudio] = useState(false); // 🎨 Avatar Customization Studio

    const [showTimeoutMute, setShowTimeoutMute] = useState(false); // ⏰ Timeout/Mute
    const [showServerThemes, setShowServerThemes] = useState(false); // 🎨 Server Themes
    const [showKeywordMutes, setShowKeywordMutes] = useState(false); // 🔇 Keyword Mutes
    const [showWelcomeTemplates, setShowWelcomeTemplates] = useState(false); // 👋 Welcome Templates
    const [showStickyMessages, setShowStickyMessages] = useState(false); // 📌 Sticky Messages
    const [showMessageTemplates, setShowMessageTemplates] = useState(false); // 📝 Message Templates
    const [showMessageExport, setShowMessageExport] = useState(false); // 📦 Message Export
    const [showArchivedRooms, setShowArchivedRooms] = useState(false); // 📦 Archived Rooms
    const [showSlowMode, setShowSlowMode] = useState(false); // ⏱️ Slow Mode
    const [showEmojiManagement, setShowEmojiManagement] = useState(false); // 😀 Emoji Management

    const [currentTheme, setCurrentTheme] = useState('default');
    const [stickyMessage, setStickyMessage] = useState(null);
    const [showAvatarCropper, setShowAvatarCropper] = useState(false); // 📸 AVATAR CROPPER
    const [messageHistoryLoading, setMessageHistoryLoading] = useState(false);
    const [hasMoreMessages, setHasMoreMessages] = useState(true);
    const [messageHistoryOffset, setMessageHistoryOffset] = useState(0);
    const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);
    const [friendsList, setFriendsList] = useState([]);
    const [pendingFriendRequests, setPendingFriendRequests] = useState(0); // 🔥 YENİ: Bekleyen arkadaşlık istekleri sayısı
    const [serverOrder, setServerOrder] = useState([]); // 🔥 YENİ: Sunucu sıralaması
    const [serverMembers, setServerMembers] = useState([]);
    const [selectedServer, setSelectedServer] = useState(null); // 🔥 YENİ: Seçili sunucu (üye listesi için)
    const [currentUserProfile, setCurrentUserProfile] = useState(null); // 🔥 YENİ: Kullanıcının profil verisi
    const [updateAvailable, setUpdateAvailable] = useState(false);
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const [serverToEdit, setServerToEdit] = useState(null);
    const [showSummary, setShowSummary] = useState(false);
    const [isSummaryLoading, setIsSummaryLoading] = useState(false);
    const [summaryResult, setSummaryResult] = useState("");
    const [soundSettings, setSoundSettings] = useState(() => JSON.parse(localStorage.getItem('chat_sound_settings')) || { notifications: true, mentions: true, userJoinLeave: true });
    const [maintenanceMode, setMaintenanceMode] = useState(null); // 🆕 Maintenance mode
    const [showDJ, setShowDJ] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0); // 📊 Upload progress %
    const [isRecordingVoice, setIsRecordingVoice] = useState(false);
    const [hasDraftMessage, setHasDraftMessage] = useState(false);
    const [draftText, setDraftText] = useState('');
    const [showScrollToBottom, setShowScrollToBottom] = useState(false);
    const [editingMessage, setEditingMessage] = useState(null); // 🔥 Mesaj düzenleme
    const [replyingTo, setReplyingTo] = useState(null); // 🔥 Mesaja cevap verme
    const [forwardingMessage, setForwardingMessage] = useState(null); // 🔥 Mesaj iletme
    const [isSelectionMode, setIsSelectionMode] = useState(false); // 🔥 EKLENDİ: Mesaj seçme modu

    // 🔔 YENİ: Bildirim ve context menu state'leri
    const [showNotifications, setShowNotifications] = useState(false);
    const [showToolbarMenu, setShowToolbarMenu] = useState(false); // 🔥 Toolbar açılır menü
    const [userContextMenu, setUserContextMenu] = useState(null); // { x, y, user, permissions }

    // 🎫 YENİ: Sunucuya davet modal state
    const [inviteToServerUser, setInviteToServerUser] = useState(null); // { username } or null

    // 💰 YENİ: Payment & Store state'leri (2026-01-19)
    const [showPaymentPanel, setShowPaymentPanel] = useState(false);
    const [showStoreModal, setShowStoreModal] = useState(false);
    const [showDailyRewards, setShowDailyRewards] = useState(false);
    const [showAPIUsagePanel, setShowAPIUsagePanel] = useState(false);
    const [showExportJobsPanel, setShowExportJobsPanel] = useState(false);
    const [showScheduledAnnouncements, setShowScheduledAnnouncements] = useState(false);

    // 🔗 YENİ: Vanity URL Invite Screen (2026-01-23)
    const [showVanityInvite, setShowVanityInvite] = useState(null); // vanity path veya null

    // 🔗 YENİ: Platform Connections Panel
    const [showConnectionsPanel, setShowConnectionsPanel] = useState(false);

    // 🔑 YENİ: Google ile giriş yapanlar için şifre belirleme modal
    const [showPasswordSetupModal, setShowPasswordSetupModal] = useState(false);

    const typingUsers = useChatStore(state => state.typingUsers);

    // ⚡ OPTIMIZATION: Memoize filtered typing users
    const activeTypingUsers = useMemo(() => {
        return typingUsers.filter(u => u !== username);
    }, [typingUsers, username]);

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const ws = useRef(null);
    const statusWsRef = useRef(null);
    const messagesEndRef = useRef(null);
    const fileInputRefNormal = useRef(null);
    const richTextRef = useRef(null);
    const messageBoxRef = useRef(null);
    const searchInputRef = useRef(null);
    const historyCacheRef = useRef({});

    // 🔥 Admin kontrolü - Eastkhan her zaman admin, diğerleri için role kontrolü
    const isAdmin = username === 'Eastkhan' || username === 'PawPaw' || currentUserProfile?.role === 'admin';

    // 🔥 YENİ: Kullanıcı izinleri - context menu için
    const currentUserPermissions = useMemo(() => {
        const currentServer = categories?.find(c => c.id === activeChat?.serverId);
        const isServerOwner = currentServer?.owner === username || currentServer?.created_by === username;
        const isModerator = serverMembers?.find(m => m.username === username)?.role === 'moderator';

        return {
            isAdmin,
            isServerOwner,
            isModerator,
            canKick: isAdmin || isServerOwner || isModerator,
            canBan: isAdmin || isServerOwner,
            canMute: isAdmin || isServerOwner || isModerator,
            canWarn: isAdmin || isServerOwner || isModerator,
            canManageRoles: isAdmin || isServerOwner
        };
    }, [isAdmin, categories, activeChat?.serverId, username, serverMembers]);

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
    const onlineUsers = useChatStore(state => state.onlineUsers);

    // 🚀 PERFORMANS: Optimized messages ve online users
    const rawMessages = useChatStore(state => state.messages);
    const optimizedMessages = useOptimizedMessages(rawMessages, debouncedSearchQuery, activeChat);
    const optimizedOnlineUsers = useOnlineUsers(allUsers);


    // --- SPLASH SCREEN LOGIC ---
    useEffect(() => {
        if (animationState === 'finished') return;
        setAnimationState('start');
        // ⚡ Animasyonun tam görünmesi için yeterli süre: 2-2.5s
        const timer1 = setTimeout(() => setAnimationState('pre-transition'), 1500); // Logo animasyonu için bekle
        const timer2 = setTimeout(() => setAnimationState('finished'), 2200); // Normal bitiş - animasyon tamamlansın
        const forceFinishTimer = setTimeout(() => setAnimationState('finished'), 3000); // Max bekle
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(forceFinishTimer);
        };
    }, []);

    // 🔥 NOT: Veri yüklendiğinde splash erken kapatmıyoruz - animasyon tamamlansın
    // Timer'lar splash'ı kontrol eder, veri hazır olsa bile animasyon biter

    // 📧 EMAIL VERIFICATION: Check URL parameters for verification status
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const verification = params.get('verification');
        const username = params.get('username');
        const reason = params.get('reason');
        const needsPassword = params.get('needs_password');

        if (verification === 'success') {
            toast.success(`✅ Email doğrulandı! Hoşgeldin ${username || 'kullanıcı'}!`);
            // Clear URL parameters
            window.history.replaceState({}, document.title, window.location.pathname);
        } else if (verification === 'failed') {
            const errorMsg = reason === 'expired'
                ? '⏰ Doğrulama linki süresi dolmuş. Yeni bir link talep edin.'
                : '❌ Geçersiz doğrulama linki.';
            toast.error(errorMsg);
            // Clear URL parameters
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        // 🔑 Google ile giriş yapan kullanıcılar için şifre belirleme kontrolü
        if (needsPassword === 'true') {
            console.log('🔑 [Auth] Google user needs to set password');
            setShowPasswordSetupModal(true);
            // Clear URL parameters
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);

    // 🔗 VANITY URL CHECK: Eğer URL /#/join/path formatındaysa invite ekranını aç
    useEffect(() => {
        const hash = window.location.hash; // /#/join/pawpaw
        const vanityMatch = hash.match(/^#\/join\/([^/?]+)/);

        if (vanityMatch) {
            const vanityPath = vanityMatch[1];
            console.log('🔗 [Vanity] Detected vanity path:', vanityPath);
            setShowVanityInvite(vanityPath);
        }
    }, []);

    // �️ MODERATION: Global functions for ServerSettingsModal to trigger panels
    useEffect(() => {
        window.showAutoModeration = () => setShowAutoModeration(true);
        window.showRaidProtection = () => setShowRaidProtection(true);
        window.showReportSystem = () => setShowReportSystem(true);
        window.showAuditLog = () => setShowAuditLog(true);
        window.showUserWarnings = () => setShowUserWarnings(true);

        return () => {
            delete window.showAutoModeration;
            delete window.showRaidProtection;
            delete window.showReportSystem;
            delete window.showAuditLog;
            delete window.showUserWarnings;
        };
    }, []);

    // �🔥 Close toolbar menu on click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (showToolbarMenu && !e.target.closest('.toolbar-menu-container')) {
                setShowToolbarMenu(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [showToolbarMenu]);

    // 🔗 CONNECTIONS PANEL EVENT LISTENER
    useEffect(() => {
        const handleOpenConnectionsPanel = () => {
            setShowConnectionsPanel(true);
        };
        window.addEventListener('openConnectionsPanel', handleOpenConnectionsPanel);
        return () => window.removeEventListener('openConnectionsPanel', handleOpenConnectionsPanel);
    }, []);

    // ⚡ OPTIMIZATION: PWA & Critical CSS Initialization
    useEffect(() => {
        // Register Service Worker for offline support
        registerServiceWorker();

        // Setup PWA install prompt (A2HS)
        setupInstallPrompt();

        // Setup network monitoring (online/offline banner)
        setupNetworkMonitor();

        // Initialize critical CSS optimization
        initializeCSSOptimization();

        // 🚀 CODE SPLITTING: Preload critical chunks after 3 seconds
        setTimeout(() => {
            preloadCriticalChunks();
        }, 3000);

        // 🚀 CODE SPLITTING: Prefetch next chunks during idle time
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                prefetchNextChunks();
            });
        }

        // 🔔 Initialize Push Notifications
        if (isAuthenticated && user) {
            import('./utils/pushNotifications').then(({ pushNotificationManager }) => {
                pushNotificationManager.init(API_BASE_URL, fetchWithAuth);
            });
        }

        // 🔗 Initialize Deep Link Handler (APK)
        if (isNative) {
            import('./utils/urlHandlers').then(({ initializeDeepLinkHandler }) => {
                // Deep link handler needs navigate function - will be added when routing is available
                console.log('✅ Deep link handler ready');
            });
        }

        console.log('✅ PWA ve optimizasyonlar aktif!');
    }, [isAuthenticated, user]);



    // --- CHAT TITLE ---
    const chatTitle = useMemo(() => {
        if (activeChat.type === 'room') {
            if (categories) {
                for (const server of categories) {
                    if (server.categories) {
                        for (const cat of server.categories) {
                            const foundRoom = cat.rooms?.find(r => r.slug === activeChat.id);
                            if (foundRoom) return String(foundRoom.name);
                        }
                    }
                }
            }
            return String(activeChat.id);
        } else if (activeChat.type === 'dm') {
            return `@ ${String(activeChat.targetUser || 'DM')}`;
        }
        return '';
    }, [activeChat, categories]);

    // --- DRAFT SYSTEM ---
    const chatDraftKey = useMemo(() => {
        if (!activeChat || !activeChat.id) return '';
        return `${activeChat.type}-${activeChat.id}`;
    }, [activeChat]);

    const loadDraftMap = useCallback(() => {
        try {
            const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
            if (!raw) return {};
            const parsed = JSON.parse(raw);
            return parsed && typeof parsed === 'object' ? parsed : {};
        } catch (e) {
            console.warn('Taslak okunamadı', e);
            return {};
        }
    }, []);

    const persistDraft = useCallback((value) => {
        if (!chatDraftKey) return;
        const map = loadDraftMap();
        map[chatDraftKey] = value;
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(map));
    }, [chatDraftKey, loadDraftMap]);

    useEffect(() => {
        if (!chatDraftKey) {
            setDraftText('');
            setHasDraftMessage(false);
            return;
        }
        const drafts = loadDraftMap();
        const restored = drafts[chatDraftKey] || '';
        setDraftText(restored);
        setHasDraftMessage(!!restored.trim());
    }, [chatDraftKey, loadDraftMap]);

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

    // --- SCROLL LOGIC (DÜZELTİLDİ) ---
    const scrollToBottom = useCallback((behavior = 'auto') => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior });
        }
    }, []);

    const isNearBottom = useCallback(() => {
        const el = messageBoxRef.current;
        if (!el) return true;
        const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
        return distance < 160;
    }, []);

    const handleMessageScroll = useCallback(() => {
        const el = messageBoxRef.current;
        if (!el) return;
        const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
        setShowScrollToBottom(distance > 160);
    }, []);

    // ⚡ OPTIMIZATION: Throttle scroll handler to reduce re-renders
    const throttledHandleMessageScroll = useThrottle(handleMessageScroll, 100);

    const getDeterministicAvatar = useCallback((uname) => {
        if (uname === '⚡ Signal Bot') return `${MEDIA_BASE_URL}/static/bot/signal.png`;
        if (uname === 'PawPaw AI') return `${MEDIA_BASE_URL}/static/bot/ai.png`;
        if (!uname || !defaultAvatars || defaultAvatars.length === 0) return `${MEDIA_BASE_URL}/media/avatars/default.png`;
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
            return `${MEDIA_BASE_URL}/media/avatars/default.png`;
        }

        // 🔥 FIX: Avatar URL'leri için tam URL oluştur
        if (path.startsWith('http')) return path;
        if (path.startsWith('blob:')) return path;

        // Path'i normalize et
        if (!path.startsWith('/')) path = '/' + path;

        // 🔥 CRITICAL FIX: EXE/APK'da her zaman production URL kullan
        return `${MEDIA_BASE_URL}${path}`;
    }, [defaultAvatars]);

    const getRealUserAvatar = useCallback((targetUsername) => {
        const userObj = allUsers.find(u => u.username === targetUsername);
        // 🔥 FIX: avatar string olmalı
        if (userObj && userObj.avatar && typeof userObj.avatar === 'string') {
            // 🔥 FIX 1: HTTP/HTTPS URL'leri direkt kullan
            if (userObj.avatar.startsWith('http://') || userObj.avatar.startsWith('https://')) {
                return userObj.avatar;
            }

            // 🔥 FIX 2: Blob URL'leri direkt kullan (local upload)
            if (userObj.avatar.startsWith('blob:')) {
                return userObj.avatar;
            }

            // 🔥 FIX 3: Relative path için MEDIA_BASE_URL ekle
            let avatarPath = userObj.avatar;
            if (!avatarPath.startsWith('/')) avatarPath = '/' + avatarPath;

            // 🔥 CRITICAL: EXE/APK'da production URL zorunlu
            return `${MEDIA_BASE_URL}${avatarPath}`;
        }
        return getDeterministicAvatar(targetUsername);
    }, [allUsers, getDeterministicAvatar]);

    const fetchWithAuth = useCallback(async (url, options = {}) => {
        const headers = options.headers || {};
        if (token) headers['Authorization'] = `Bearer ${token}`;
        if (!(options.body instanceof FormData)) headers['Content-Type'] = 'application/json';
        try {
            // 🚀 Upload için 5 dakika timeout, diğerleri için 30 saniye
            const isUpload = url.includes('upload') || (options.body instanceof FormData);
            const timeout = isUpload ? 300000 : 30000; // 5 min : 30 sec

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);

            const response = await fetch(url, {
                ...options,
                headers,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            // 🔥 401'de hemen logout etme, sadece critical endpoint'lerde logout yap
            if (response.status === 401) {
                // Login/auth endpoint'lerinde logout yap
                if (url.includes('/auth/') || url.includes('/login')) {
                    console.warn('⚠️ [Auth] 401 on auth endpoint, logging out');
                    logout();
                } else {
                    // Diğer endpoint'lerde sadece warning ver, logout yapma
                    console.warn('⚠️ [Auth] 401 error on:', url, '- NOT logging out');
                }
                throw new Error("Unauthorized");
            }
            return response;
        } catch (err) {
            if (err.name === 'AbortError') {
                console.error('⏱️ [Fetch] Request timed out:', url);
                throw new Error('İstek zaman aşımına uğradı');
            }
            console.error("Fetch error:", err);
            throw err;
        }
    }, [token, logout]);

    // 📊 ANALYTICS: Page view tracking (fetchWithAuth tanımından SONRA!)
    usePageTracking(API_BASE_URL, fetchWithAuth);

    // 🔗 VANITY URL JOIN HANDLER (fetchWithAuth tanımından SONRA!)
    useEffect(() => {
        // HashRouter kullanıldığı için hash'ten sonraki parametreleri oku
        // URL format: /#/?join_server=123
        const hash = window.location.hash;
        const queryString = hash.includes('?') ? hash.split('?')[1] : '';
        const urlParams = new URLSearchParams(queryString);
        const joinServerId = urlParams.get('join_server');

        if (joinServerId && isAuthenticated && categories && categories.length > 0) {
            console.log('🔗 [Vanity URL] Found join_server parameter:', joinServerId);
            // Sunucuya katılma işlemi
            const targetServer = categories.find(s => s.id === parseInt(joinServerId));

            if (targetServer) {
                // Kullanıcı zaten bu sunucuda mı?
                console.log(`🔗 Vanity URL: Redirecting to server ${targetServer.name}`);

                // İlk kanalı bul ve aç
                if (targetServer.categories && targetServer.categories.length > 0) {
                    const firstCategory = targetServer.categories[0];
                    if (firstCategory.rooms && firstCategory.rooms.length > 0) {
                        const firstRoom = firstCategory.rooms[0];
                        setActiveChat({ type: 'room', id: firstRoom.slug });
                    }
                }

                // URL'i temizle (HashRouter için)
                window.history.replaceState({}, document.title, '/#/');
            } else {
                // Sunucu bulunamadı - invite link olabilir
                console.log(`🔗 Vanity URL: Server ${joinServerId} not found, showing invite modal`);

                // Sunucu invite modal'ı açmak için API çağrısı yap
                const joinServer = async () => {
                    try {
                        const res = await fetchWithAuth(`${API_BASE_URL}/servers/${joinServerId}/join/`, {
                            method: 'POST'
                        });

                        if (res.ok) {
                            toast.success('Sunucuya katıldınız!');
                            // Sunucu listesini yenile
                            window.location.reload();
                        } else {
                            const data = await res.json();
                            toast.error(data.error || 'Sunucuya katılınamadı');
                        }
                    } catch (error) {
                        console.error('Join server error:', error);
                        toast.error('Sunucuya katılırken hata oluştu');
                    } finally {
                        // URL'i temizle (HashRouter için)
                        window.history.replaceState({}, document.title, '/#/');
                    }
                };

                joinServer();
            }
        }
    }, [isAuthenticated, categories, fetchWithAuth]);

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

        // Custom drag image
        const dragElement = e.currentTarget.cloneNode(true);
        dragElement.style.position = 'absolute';
        dragElement.style.top = '-9999px';
        dragElement.style.opacity = '0.8';
        dragElement.style.transform = 'rotate(5deg)';
        dragElement.style.pointerEvents = 'none';
        document.body.appendChild(dragElement);

        e.dataTransfer.setDragImage(dragElement, 24, 24);

        setTimeout(() => {
            if (document.body.contains(dragElement)) {
                document.body.removeChild(dragElement);
            }
        }, 0);

        e.currentTarget.style.opacity = '0.4';
    };

    const handleServerDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleServerDragEnd = (e) => {
        e.currentTarget.style.opacity = '1';
    };

    const handleServerDrop = useCallback((e, targetIndex) => {
        e.preventDefault();

        const serverId = parseInt(e.dataTransfer.getData('serverId'));
        const sourceIndex = parseInt(e.dataTransfer.getData('sourceIndex'));

        console.log('📝 DROP: sourceIndex:', sourceIndex, '→ targetIndex:', targetIndex);

        // Aynı yere veya hemen yanına bırakıyorsa işlem yapma
        // ANCAK sadece yukarıdan aşağıya değil, gerçek pozisyon kontrolü yap
        if (sourceIndex === targetIndex) {
            console.log('❌ Aynı yere bırakılıyor (sourceIndex === targetIndex), işlem iptal');
            return;
        }

        let currentOrder = serverOrder.length > 0 ? [...serverOrder] : categories.map(c => c.id);

        console.log('📝 Mevcut sıralama:', currentOrder);
        console.log('🔄 Kaynak index:', sourceIndex, '→ Hedef index:', targetIndex);

        // Kaynak elementi çıkar
        const [draggedId] = currentOrder.splice(sourceIndex, 1);

        // Hedef index'i ayarla (splice sonrası kayma için)
        const adjustedTargetIndex = sourceIndex < targetIndex ? targetIndex - 1 : targetIndex;

        console.log('🎯 Adjusted target index:', adjustedTargetIndex);

        // Hedef konuma ekle
        currentOrder.splice(adjustedTargetIndex, 0, draggedId);

        console.log('✅ Yeni sıralama:', currentOrder);

        setServerOrder(currentOrder);
        saveServerOrder(currentOrder);
    }, [serverOrder, categories, saveServerOrder]);


    const scrollToMessage = (msgId) => {
        const el = document.getElementById(`message-${msgId}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    const handleClearChat = async () => {
        if (!window.confirm("Bu odadaki tüm mesajları silmek istediğine emin misin?")) return;
        try {
            const res = await fetchWithAuth(`${API_BASE_URL}/rooms/${activeChat.id}/clear/`, { method: 'POST' });
            if (res.ok) setMessages([]);
        } catch (e) { console.error(e); }
    };

    const handleSummarize = async () => {
        setShowSummary(true);
        setIsSummaryLoading(true);
        setSummaryResult("");
        try {
            const res = await fetchWithAuth(`${API_BASE_URL}/rooms/${activeChat.id}/summarize/`, { method: 'POST' });
            const data = await res.json();
            if (res.ok) {
                setSummaryResult(data.summary);
            } else {
                setSummaryResult("Hata: " + data.error);
            }
        } catch (e) {
            setSummaryResult("Bağlantı hatası.");
        }
        setIsSummaryLoading(false);
    };


    const sendMessage = (content) => {
        console.log('📤 [DEBUG] sendMessage called with:', content);
        console.log('📤 [DEBUG] ws.current:', ws.current);
        console.log('📤 [DEBUG] ws.current.readyState:', ws.current?.readyState);
        console.log('📤 [DEBUG] activeChat:', activeChat);

        if (!content) return;
        const trimmed = content.trim();
        if (!trimmed) return;

        // ✨ Check for /tema command
        if (trimmed === '/tema') {
            setShowThemeStore(true);
            setEditingMessage(null);
            setHasDraftMessage(false);
            setDraftText('');
            richTextRef.current?.clear?.();
            return;
        }

        // ✨ Check for /sablon command
        if (trimmed === '/sablon') {
            setShowTemplateModal(true);
            setEditingMessage(null);
            setHasDraftMessage(false);
            setDraftText('');
            richTextRef.current?.clear?.();
            return;
        }

        // ✨ Check for /duyuru command
        if (trimmed.startsWith('/duyuru ')) {
            const announcement = trimmed.slice(8).trim();
            if (announcement) {
                const payload = {
                    type: activeChat.type === 'room' ? 'chat_message' : 'dm_message',
                    message: `[ANNOUNCE] ${announcement}`,
                    username: username,
                    temp_id: getTemporaryId(),
                    ...(activeChat.type === 'room' ? { room: activeChat.id } : { conversation: activeChat.id })
                };
                ws.current?.send(JSON.stringify(payload));

                // Optimistic update for sender's sticky message
                setStickyMessage({ message: announcement, type: 'info', author: username });

                setEditingMessage(null);
                setHasDraftMessage(false);
                setDraftText('');
                richTextRef.current?.clear?.();
                return;
            }
        }

        setEditingMessage(null);
        setHasDraftMessage(false);
        setDraftText('');
        persistDraft('');

        const currentChatId = activeChat.type === 'room' ? `room-${activeChat.id}` : `dm-${activeChat.id}`;
        const secretKey = encryptionKeys[currentChatId];

        let finalContent = trimmed;
        if (activeChat.type === 'dm' && secretKey) {
            finalContent = encryptMessage(trimmed, secretKey);
        }

        const payload = {
            type: activeChat.type === 'room' ? 'chat_message' : 'dm_message',
            message: finalContent,
            username: username,
            temp_id: getTemporaryId(),
            ...(activeChat.type === 'room' ? { room: activeChat.id } : { conversation: activeChat.id })
        };

        const jsonPayload = JSON.stringify(payload);

        // WebSocket gönderme fonksiyonu (bağlantı bekleme ile)
        const sendViaWebSocket = async () => {
            const maxWait = 3000;
            const checkInterval = 100;
            let waited = 0;

            // WebSocket CONNECTING durumundaysa bekle
            while (ws.current && ws.current.readyState === WebSocket.CONNECTING && waited < maxWait) {
                await new Promise(resolve => setTimeout(resolve, checkInterval));
                waited += checkInterval;
            }

            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                try {
                    ws.current.send(jsonPayload);
                    return true;
                } catch (error) {
                    console.error('WebSocket send error:', error);
                    return false;
                }
            }
            return false;
        };

        // HTTP fallback
        const sendViaHTTP = async () => {
            try {
                const endpoint = activeChat.type === 'dm'
                    ? `${API_BASE_URL}/messages/send_dm/`
                    : `${API_BASE_URL}/messages/send/`;

                const httpPayload = activeChat.type === 'dm'
                    ? { conversation_id: activeChat.id, content: finalContent }
                    : { room: activeChat.id, content: finalContent };

                const response = await fetchWithAuth(endpoint, {
                    method: 'POST',
                    body: JSON.stringify(httpPayload)
                });
                return response.ok;
            } catch (error) {
                console.error('HTTP fallback error:', error);
                return false;
            }
        };

        // WebSocket dene, başarısız olursa HTTP fallback
        (async () => {
            const wsSent = await sendViaWebSocket();
            if (!wsSent) {
                await sendViaHTTP();
            }
        })();

        // 🔥 FIX: addMessage yerine setMessages kullan (prev state ile)
        // 🔥 AVATAR FIX: Kendi avatar'ımızı da ekle
        setMessages(prev => {
            const newMessage = {
                ...payload,
                content: finalContent,
                timestamp: new Date().toISOString(),
                id: payload.temp_id,
                avatar: currentUserProfile?.avatar || getDeterministicAvatar(username)
            };
            const updatedMessages = [...prev, newMessage];

            // Cache'e de ekle
            const cacheKey = activeChat.type === 'room' ? `room-${activeChat.id}` : `dm-${activeChat.id}`;
            if (historyCacheRef.current[cacheKey]) {
                historyCacheRef.current[cacheKey].messages = updatedMessages;
            }

            return updatedMessages;
        });

        richTextRef.current?.clear?.();
        scrollToBottom('smooth');
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

        // 🔥 FIX: addMessage yerine setMessages kullan + avatar ekle
        setMessages(prev => [...prev, {
            ...payload,
            timestamp: new Date().toISOString(),
            id: payload.temp_id,
            avatar: currentUserProfile?.avatar || getDeterministicAvatar(username) // 🔥 Avatar eklendi
        }]);
        setShowSnippetModal(false);
    };

    const startVoiceRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // 🎤 Sadece ses codec'i kullan (video metadata oluşmasın)
            const options = { mimeType: 'audio/webm;codecs=opus' };
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                options.mimeType = 'audio/webm';
            }

            mediaRecorderRef.current = new MediaRecorder(stream, options);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    audioChunksRef.current.push(e.data);
                }
            };

            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm;codecs=opus' });
                await sendVoiceMessage(audioBlob);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start();
            setIsRecordingVoice(true);
        } catch (error) {
            console.error('Error starting voice recording:', error);
            if (error.name === 'NotAllowedError') {
                toast.warning('Mikrofon erişimi reddedildi! Lütfen tarayıcı ayarlarından mikrofon izni verin.', 5000);
            } else if (error.name === 'NotFoundError') {
                toast.warning('Mikrofon bulunamadı! Lütfen bir mikrofon bağlayın.');
            } else {
                toast.error('Mikrofon hatası: ' + error.message);
            }
        }
    };

    const stopVoiceRecording = () => {
        if (mediaRecorderRef.current && isRecordingVoice) {
            mediaRecorderRef.current.stop();
            setIsRecordingVoice(false);
        }
    };

    const sendVoiceMessage = async (audioBlob) => {
        const fileName = `voice_${Date.now()}.webm`;
        const uploadId = `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const formData = new FormData();
        formData.append('chunk', audioBlob);
        formData.append('upload_id', uploadId);
        formData.append('chunk_index', '0');
        formData.append('total_chunks', '1');
        formData.append('file_name', fileName);
        formData.append('is_voice_message', 'true');

        if (activeChat.type === 'room') {
            formData.append('room_slug', activeChat.id);
        } else if (activeChat.type === 'dm') {
            formData.append('conversation_id', activeChat.id);
        }

        try {
            const response = await fetchWithAuth(`${API_BASE_URL}/messages/upload_file/`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Voice upload error:', errorText);
                throw new Error('Upload failed');
            }

            const data = await response.json();
            console.log('Voice message uploaded:', data);
        } catch (error) {
            console.error('Error uploading voice message:', error);
            toast.error('Ses mesajı gönderilemedi');
        }
    };

    const connectWebSocket = useCallback(() => {
        if (!activeChat.id || activeChat.type === 'welcome' || activeChat.type === 'friends' || !username) return;

        // 🔥 FIX: Mevcut WebSocket aynı chat için zaten açıksa, tekrar bağlanma
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            const currentWsUrl = ws.current.url;
            const expectedPath = activeChat.type === 'room'
                ? `/ws/chat/${activeChat.id}/`
                : `/ws/dm/${activeChat.id}/`;

            if (currentWsUrl.includes(expectedPath)) {
                console.log('⏭️ [WebSocket] Already connected to this chat, skipping reconnect');
                return;
            }
        }

        // 🔥 FIX: Mevcut bağlantıyı kapat (eğer varsa)
        if (ws.current) {
            console.log('🔌 [WebSocket] Closing existing connection before new one');
            ws.current.close(1000, 'change_room');
        }

        let wsUrl = '';
        const params = `?username=${encodeURIComponent(username)}&token=${token}`;
        if (activeChat.type === 'room') wsUrl = `${WS_PROTOCOL}://${API_HOST}/ws/chat/${activeChat.id}/${params}`;
        else if (activeChat.type === 'dm') wsUrl = `${WS_PROTOCOL}://${API_HOST}/ws/dm/${activeChat.id}/${params}`;

        console.log('🔌 [WebSocket] Connecting to:', wsUrl.split('?')[0]); // Token'sız URL'i logla

        const newWs = new WebSocket(wsUrl);
        ws.current = newWs;

        newWs.onopen = () => {
            console.log('✅ [WebSocket] Connected successfully');
            setIsConnected(true);
        };

        newWs.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'chat' || data.type === 'dm' || data.type === 'chat_message_handler') {
                // 🔥 DEBUG: Gelen mesajın yapısını logla
                console.log('📨 [WebSocket] Message data:', {
                    type: data.type,
                    id: data.id,
                    temp_id: data.temp_id,
                    room: data.room,
                    conversation: data.conversation
                });

                // 🔥 FIX: Cache key'i gelen mesajdan hesapla (activeChat'e güvenme - stale closure olabilir!)
                // data.room = room slug (string), data.conversation = conversation ID (number)
                const getCacheKeyFromMessage = (msgData) => {
                    if (msgData.room) return `room-${msgData.room}`;
                    if (msgData.conversation) return `dm-${msgData.conversation}`;
                    // Fallback: activeChat kullan (eski davranış)
                    console.warn('⚠️ [WebSocket] No room/conversation in message, using activeChat fallback');
                    return activeChat.type === 'room' ? `room-${activeChat.id}` : `dm-${activeChat.id}`;
                };

                // 🔥 FIX: Duplicate kontrolü - temp mesajı gerçek mesajla DEĞIŞTIR
                setMessages(prev => {
                    // Temp mesaj varsa, gerçek mesajla değiştir (server ID'si ile)
                    if (data.temp_id) {
                        const tempIndex = prev.findIndex(msg => msg.temp_id === data.temp_id);
                        if (tempIndex !== -1) {
                            console.log('🔄 [WebSocket] Replacing temp message with real message:', data.temp_id, '→', data.id);
                            const newMessages = [...prev];
                            newMessages[tempIndex] = data; // Temp mesajı gerçek mesajla değiştir

                            // 🔥 FIX: Cache'i gelen mesajın room/conversation bilgisine göre güncelle
                            const cacheKey = getCacheKeyFromMessage(data);
                            if (historyCacheRef.current[cacheKey]) {
                                historyCacheRef.current[cacheKey].messages = newMessages;
                            }

                            return newMessages;
                        }
                    }

                    // ID ile duplicate kontrolü (aynı mesaj tekrar gelirse)
                    if (data.id && prev.some(msg => msg.id === data.id)) {
                        console.log('⏭️ [WebSocket] Duplicate message (by ID) skipped:', data.id);
                        return prev;
                    }

                    console.log('📨 [WebSocket] New message received:', data);
                    const updatedMessages = [...prev, data];

                    // 🔥 FIX: Cache'i gelen mesajın room/conversation bilgisine göre güncelle
                    const cacheKey = getCacheKeyFromMessage(data);
                    if (historyCacheRef.current[cacheKey]) {
                        historyCacheRef.current[cacheKey].messages = updatedMessages;
                    }

                    return updatedMessages;
                });

                setTypingUser(data.username, false);
                if (isNearBottom()) {
                    scrollToBottom('smooth');
                } else {
                    setShowScrollToBottom(true);
                }
            } else if (data.type === 'typing_status_update') {
                if (data.username !== username) setTypingUser(data.username, data.is_typing);

            } else if (data.type === 'chat_cleared') {
                setMessages([]);
            }

            // ✨ Check for sticky message in incoming data
            if (data.message && data.message.startsWith('[ANNOUNCE] ')) {
                const announcement = data.message.replace('[ANNOUNCE] ', '');
                setStickyMessage({ message: announcement, type: 'info', author: data.username });
            }
        };

        newWs.onerror = (error) => {
            console.error('❌ [WebSocket] Connection error:', error);
        };

        newWs.onclose = (event) => {
            console.log('🔌 [WebSocket] Connection closed:', event.code, event.reason);
            setIsConnected(false);
        };
    }, [activeChat.id, activeChat.type, username, token]);
    // 🔥 FIX: activeChat yerine activeChat.id ve activeChat.type kullan
    // Object referansı her render'da değişebilir!

    useEffect(() => {
        if (Capacitor.isNativePlatform()) {
            GoogleAuth.initialize({ clientId: GOOGLE_WEB_CLIENT_ID, scopes: ['profile', 'email'], grantOfflineAccess: true });
            setSafeAreaTop('max(35px, env(safe-area-inset-top))');
        }
    }, []);

    // 🔥 OLD resize listener REMOVED - useResponsive hook handles it

    // 🚀 PERFORM OPTIMIZASYONU: Tüm kullanıcıları peşin peşin çekme işlemi KALDIRILDI.
    useEffect(() => {
        const fetchInit = async () => {
            try {
                const [avatars, rooms, convs, friendsData, currentUserData] = await Promise.all([
                    fetchWithAuth(DEFAULT_AVATARS_URL).then(r => r.json()),
                    fetchWithAuth(ROOM_LIST_URL).then(r => r.json()),
                    fetchWithAuth(`${CONVERSATION_LIST_URL}?username=${encodeURIComponent(username)}`).then(r => r.json()),
                    fetchWithAuth(`${API_BASE_URL}/friends/list/`).then(r => r.json()),
                    fetchWithAuth(`${API_BASE_URL}/users/me/`).then(r => r.json())
                ]);
                setDefaultAvatars(avatars);

                const currentUser = {
                    username: currentUserData?.username || username,
                    email: currentUserData?.email || '',
                    avatar: currentUserData?.avatar || null,
                    status_message: currentUserData?.status_message || '',
                    friend_code: currentUserData?.friend_code || '0000',
                    social_links: currentUserData?.social_links || {},
                    coins: currentUserData?.coins || 0,
                    status: 'online',
                    role: currentUserData?.role || 'member'
                };
                setCurrentUserProfile(currentUser);

                const friendProfiles = (friendsData.friends || []).map(f => {
                    const isSender = f.sender_username === username;
                    const friendUsername = isSender ? f.receiver_username : f.sender_username;
                    const friendAvatar = isSender ? f.receiver_avatar : f.sender_avatar;
                    const friendStatus = isSender ? f.receiver_status : f.sender_status;
                    const friendActivity = isSender ? f.receiver_activity : f.sender_activity;

                    if (!friendUsername) return null;

                    return {
                        username: friendUsername,
                        avatar: friendAvatar,
                        status: friendStatus || 'offline',
                        display_name: friendUsername,
                        current_activity: friendActivity || {},
                        status_message: '',
                        last_seen: f.created_at,
                        role: 'friend',
                        friend_code: ''
                    };
                }).filter(Boolean);

                const uniqueFriendProfiles = friendProfiles.filter(fp => fp.username !== currentUser.username);
                setAllUsers(uniqueFriendProfiles);
                setCategories(rooms);
                setConversations(convs);
                setFriendsList(uniqueFriendProfiles);
                setIsInitialDataLoaded(true);

                // 🔥 DM Avatar Prefetch - Arkadaşların avatarlarını arka planda yükle
                import('./utils/imageCaching').then(({ prefetchUserAvatars }) => {
                    prefetchUserAvatars(uniqueFriendProfiles);
                });
            } catch (e) { console.error("Init Data Error", e); setAuthError("Veriler yüklenemedi."); }
        };
        if (isAuthenticated && !isInitialDataLoaded) fetchInit();
    }, [isAuthenticated, isInitialDataLoaded, fetchWithAuth, username]);

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

        if (username) {
            fetchServerOrder();
        }
    }, [username, fetchWithAuth]);

    // 🆕 Sticky Messages - Current room için sticky message çek
    useEffect(() => {
        const fetchStickyMessages = async () => {
            if (!activeChat.id || activeChat.type !== 'room') {
                setStickyMessage(null);
                return;
            }

            try {
                const res = await fetchWithAuth(`${API_BASE_URL}/stickies/list/?room=${activeChat.id}`);
                if (res.ok) {
                    const stickies = await res.json();
                    if (stickies && stickies.length > 0) {
                        setStickyMessage({
                            message: stickies[0].content,
                            type: 'info',
                            author: stickies[0].creator
                        });
                    } else {
                        setStickyMessage(null);
                    }
                }
            } catch (error) {
                console.error('Sticky messages fetch error:', error);
            }
        };

        if (isAuthenticated && activeChat.id) {
            fetchStickyMessages();
        }
    }, [activeChat.id, activeChat.type, isAuthenticated, fetchWithAuth]);

    // 🔥 YENİ: Server Members - Sunucuya girildiğinde veya sunucu seçildiğinde üyeleri fetch et
    const fetchServerMembersById = useCallback(async (serverId) => {
        if (!serverId) {
            setServerMembers([]);
            return;
        }
        try {
            console.log(`🔍 [Server Members] Fetching members for server ${serverId}...`);
            const res = await fetchWithAuth(`${API_BASE_URL}/servers/${serverId}/members/`);
            if (res.ok) {
                const members = await res.json();
                console.log(`👥 [Server Members] Fetched ${members.length} members for server ${serverId}:`, members);
                setServerMembers(members);
            } else {
                const errorText = await res.text();
                console.error('❌ Server members fetch failed:', res.status, errorText);
                setServerMembers([]);
            }
        } catch (error) {
            console.error('❌ Server members fetch error:', error);
            setServerMembers([]);
        }
    }, [fetchWithAuth]);

    // 🔥 YENİ: Sunucu seçildiğinde üyeleri yükle (kanala basmadan)
    const handleServerSelect = useCallback((server) => {
        console.log('🖱️ [Server Select] Server clicked:', server.name, server.id);
        setSelectedServer(server);
        fetchServerMembersById(server.id);
        // activeChat'i 'server' moduna al - sağ panelde üyeleri göster
        setActiveChat('server', server.id, null);
    }, [fetchServerMembersById, setActiveChat]);

    useEffect(() => {
        const fetchServerMembers = async () => {
            if (!activeChat.id || activeChat.type !== 'room') {
                // Eğer sunucu seçiliyse, onu koru
                if (activeChat.type !== 'server') {
                    setServerMembers([]);
                }
                return;
            }

            try {
                // activeChat.id room slug'dır, server_id bulmalıyız
                // categories YENİ YAPIDIR: Her item aslında bir server, ve içinde categories array var
                let serverId = null;

                // 🔥 FIX: categories array'i aslında server array'i
                for (const server of categories) {
                    // Her server'ın içinde categories var
                    if (!server.categories || !Array.isArray(server.categories)) {
                        console.warn('⚠️ Server has no categories array:', server);
                        continue;
                    }

                    // Server'ın içindeki her category'yi kontrol et
                    for (const category of server.categories) {
                        if (!category.rooms || !Array.isArray(category.rooms)) {
                            continue;
                        }

                        // Category'nin içindeki her room'u kontrol et
                        for (const room of category.rooms) {
                            if (room.slug === activeChat.id) {
                                // 🔥 Server ID'yi parent server'dan al
                                serverId = server.id;
                                break;
                            }
                        }
                        if (serverId) break;
                    }
                    if (serverId) break;
                }

                if (!serverId) {
                    console.warn('🔴 Server ID bulunamadı for room:', activeChat.id);
                    setServerMembers([]);
                    return;
                }

                fetchServerMembersById(serverId);
            } catch (error) {
                console.error('❌ Server members fetch error:', error);
                setServerMembers([]);
            }
        };

        if (isAuthenticated && activeChat.id && activeChat.type === 'room') {
            fetchServerMembers();
        } else if (activeChat.type !== 'server') {
            setServerMembers([]);
        }
    }, [activeChat.id, activeChat.type, isAuthenticated, fetchServerMembersById, categories]);

    // 🆕 Maintenance Mode Check
    useEffect(() => {
        const checkMaintenanceMode = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/maintenance/status/`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.active) {
                        setMaintenanceMode({
                            message: data.message || 'System maintenance in progress',
                            endTime: data.end_time,
                            level: data.level || 'info'
                        });
                    } else {
                        setMaintenanceMode(null);
                    }
                }
            } catch (error) {
                console.error('Maintenance check error:', error);
            }
        };

        checkMaintenanceMode();
        // Check every 5 minutes
        const interval = setInterval(checkMaintenanceMode, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    // 🔥 VERSION CHECK - Güncelleme Kontrolü (EXE & APK)
    useEffect(() => {
        // Semantic version karşılaştırma fonksiyonu
        const compareVersions = (latest, current) => {
            try {
                const latestParts = latest.split('.').map(Number);
                const currentParts = current.split('.').map(Number);

                // Major version
                if (latestParts[0] > currentParts[0]) return true;
                if (latestParts[0] < currentParts[0]) return false;

                // Minor version
                if (latestParts[1] > currentParts[1]) return true;
                if (latestParts[1] < currentParts[1]) return false;

                // Patch version
                if (latestParts[2] > currentParts[2]) return true;

                return false; // Aynı veya eski
            } catch (error) {
                console.error('❌ Version karşılaştırma hatası:', error);
                return false;
            }
        };

        const checkForUpdates = async () => {
            // 🔥 DEBUG MODE: localhost:3000'de test için (geçici)
            const isDebugMode = window.location.hostname === 'localhost' && window.location.port === '3000';

            // Sadece Electron veya Native (Capacitor) platformlarda çalışsın
            // Debug modda da çalışsın (test için)
            if (!isElectron && !isNative && !isDebugMode) {
                console.log('⏭️ Version check atlandı (web browser)');
                return;
            }

            try {
                console.log('🔍 Version kontrolü yapılıyor...', {
                    isElectron,
                    isNative,
                    isDebugMode,
                    hostname: window.location.hostname
                });

                // package.json'dan mevcut versiyonu al (Vite uyumlu)
                const currentVersion = import.meta.env.VITE_APP_VERSION || '1.1.143';
                console.log('📦 Mevcut versiyon:', currentVersion);

                // 🔥 R2 CDN'den son versiyonu kontrol et
                const res = await fetch('https://media.pawscord.com/builds/version.json');

                if (!res.ok) {
                    console.warn('⚠️ version.json alınamadı:', res.status);
                    return;
                }

                const data = await res.json();
                const latestVersion = data.latest_version;
                console.log('🌐 Son versiyon:', latestVersion);
                console.log('📊 Karşılaştırma:', { current: currentVersion, latest: latestVersion });

                // Versiyon karşılaştırması - semantic versioning
                const isNewer = compareVersions(latestVersion, currentVersion);
                console.log('🔍 İs newer?', isNewer);

                if (latestVersion && isNewer) {
                    console.log('✅ YENİ GÜNCELLEME MEVCUT!', {
                        current: currentVersion,
                        latest: latestVersion
                    });
                    setUpdateAvailable(true);

                    // Optional: Electron'a bildirim gönder
                    if (window.require) {
                        const { ipcRenderer } = window.require('electron');
                        ipcRenderer.send('update-available', {
                            currentVersion,
                            latestVersion,
                            downloadUrl: data.download_url_windows
                        });
                    }
                } else {
                    console.log('ℹ️ Versiyon güncel veya eski:', currentVersion, '>=', latestVersion);
                    setUpdateAvailable(false);
                }
            } catch (error) {
                console.error('❌ Version check hatası:', error);
            }
        };

        // İlk kontrol
        checkForUpdates();

        // Her 30 dakikada bir kontrol et
        const interval = setInterval(checkForUpdates, 30 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    // 🔥 FIX: activeChat değiştiğinde cache kontrol et, sonra mesaj yükle ve WebSocket bağla
    // 🔥 TEK BİR useEffect - çakışma yok!
    useEffect(() => {
        if (!isInitialDataLoaded || !activeChat.id || activeChat.type === 'friends' || activeChat.type === 'welcome') return;

        console.log('🔄 [DEBUG activeChat] Chat değişti:', activeChat);

        // 🔥 CRITICAL: İşlemi iptal etmek için flag (cleanup için)
        let isCancelled = false;

        const key = activeChat.type === 'room' ? `room-${activeChat.id}` : `dm-${activeChat.id}`;
        const cached = historyCacheRef.current[key];

        if (cached?.messages?.length > 0) {
            // ✅ Cache varsa SADECE cache'i göster, API'ye GITME
            console.log('📦 [Cache] Restoring cached messages:', cached.messages.length, '(skipping API call)');
            setMessages(cached.messages);
            setHasMoreMessages(!!cached.hasMore);
            setMessageHistoryOffset(cached.offset || 0);
            setTimeout(() => {
                if (!isCancelled) scrollToBottom('auto');
            }, 50);

            // WebSocket'i bağla (mesajları yeniden yüklemeden)
            // 🔥 FIX: setTimeout ile değil, direkt bağla - race condition önleme
            if (!isCancelled) connectWebSocket();
        } else {
            // ❌ Cache yoksa server'dan çek
            console.log('🌐 [Fetch] No cache, fetching from server...');
            setMessageHistoryOffset(0);
            setHasMoreMessages(true);

            // 🔥 FIX: Önce WebSocket bağla, sonra mesajları çek
            if (!isCancelled) connectWebSocket();

            // Mesaj geçmişini yükle
            setTimeout(() => {
                if (!isCancelled) fetchMessageHistory(true, 0);
            }, 50);
        }

        // 🔥 CLEANUP: Component unmount veya activeChat değişince eski işlemleri iptal et
        return () => {
            isCancelled = true;
            console.log('🧹 [Cleanup] activeChat useEffect cleanup triggered');
        };
    }, [activeChat.id, activeChat.type, isInitialDataLoaded, connectWebSocket]);
    // ⚠️ fetchMessageHistory dependency'den KALDIRILDI - useCallback değil, fonksiyon tanımı
    // connectWebSocket useCallback olduğu için güvenle eklenebilir

    // 🔥 REAL-TIME SERVER STRUCTURE UPDATE
    useEffect(() => {
        if (globalData?.type === 'server_structure_update') {
            console.log("🔄 Real-time Update: Refetching Server List...");
            // Re-fetch only the server structure part of fetchInit
            const fetchCategories = async () => {
                try {
                    const res = await fetchWithAuth(ROOM_LIST_URL);
                    if (res.ok) {
                        const data = await res.json();
                        setCategories(data);
                    }
                } catch (e) {
                    console.error("Real-time Update Failed:", e);
                }
            };
            fetchCategories();
        }
    }, [globalData, fetchWithAuth]);


    // 🔥 PERIODIC ACTIVITY POLLING (Spotify/Steam)
    useEffect(() => {
        if (!isAuthenticated || !username) return;

        const prevActivityRef = { current: null };

        const checkActivity = async () => {
            try {
                // Fetch my own rich presence locally
                // Note: We use the endpoint that calls Spotify/Steam APIs
                const res = await fetchWithAuth(`${API_BASE_URL}/users/rich_presence/${username}/`);
                if (res.ok) {
                    const data = await res.json();

                    // Flatten data to a single activity object for simplicity (priority: Spotify > Steam)
                    // Or keep it as is. The serializer expects 'current_activity' to be a dict/JSON.
                    // Let's decide a structure. The backend ChatConsumer 'update_user_activity' saves whatever we send.
                    // ChatUserList expects { type: 'listening', name: '...' } etc.

                    let newActivity = {}; // Changed to object to hold multiple

                    // 🔥 Helper: Check if timestamp is fresh (within 2 minutes)
                    const isTimestampFresh = (timestamp) => {
                        if (!timestamp) return true; // No timestamp = trust it
                        const activityTime = new Date(timestamp);
                        const now = new Date();
                        const diffMinutes = (now - activityTime) / 1000 / 60;
                        return diffMinutes < 2; // Only show if less than 2 minutes old
                    };

                    if (data.spotify && isTimestampFresh(data.spotify.timestamp)) {
                        newActivity.spotify = {
                            type: 'listening',
                            name: data.spotify.track,
                            details: data.spotify.artist,
                            album_art: data.spotify.album_art
                        };
                    }

                    if (data.steam && isTimestampFresh(data.steam.timestamp)) {
                        newActivity.steam = {
                            type: 'playing',
                            name: data.steam.game,
                            state: data.steam.state
                        };
                    }

                    // If no activity, keep it empty object or null
                    if (Object.keys(newActivity).length === 0) newActivity = null;

                    // Compare with previous to avoid spamming WS
                    const prevStr = JSON.stringify(prevActivityRef.current);
                    const newStr = JSON.stringify(newActivity);

                    if (prevStr !== newStr) {
                        // Update Local & Send WS
                        prevActivityRef.current = newActivity;

                        if (statusWsRef.current && statusWsRef.current.readyState === WebSocket.OPEN) {
                            statusWsRef.current.send(JSON.stringify({
                                type: 'update_activity',
                                activity: newActivity
                            }));
                        }
                    }
                }
            } catch (e) {
                // Silent fail
            }
        };

        const interval = setInterval(checkActivity, 30000); // 30s interval (daha az API isteği)
        checkActivity(); // Initial check

        return () => clearInterval(interval);
    }, [isAuthenticated, username, fetchWithAuth]);

    // 🚀 SCROLL DAVRANIŞI
    useEffect(() => {
        if (isNearBottom()) {
            scrollToBottom('smooth');
            setShowScrollToBottom(false);
        }
    }, [messages, isNearBottom, scrollToBottom]);

    useEffect(() => {
        handleMessageScroll();
    }, [activeChat, handleMessageScroll]);

    useEffect(() => {
        const handler = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    // Global Status WebSocket
    useEffect(() => {
        if (!isAuthenticated || !isInitialDataLoaded) return;

        // ✨ Load Theme on Startup
        const saved = loadSavedTheme();
        setCurrentTheme(saved);



        const url = `${WS_PROTOCOL}://${API_HOST}/ws/status/?username=${encodeURIComponent(username)}&token=${token}`;
        const socket = new WebSocket(url);
        statusWsRef.current = socket;
        socket.onmessage = (e) => {
            const data = JSON.parse(e.data);

            // 🔧 FIX: Online users - sadece username array'i olarak set et
            if (data.type === 'online_user_list_update') {
                // Backend'den gelen data.users array'ini kontrol et
                // Eğer object array'i ise username'leri çıkar, string array'i ise direkt kullan
                const onlineUsernames = Array.isArray(data.users)
                    ? data.users.map(u => typeof u === 'string' ? u : u.username || u)
                    : [];

                console.log('👥 [Online Users] Updated:', onlineUsernames);
                setOnlineUsers(onlineUsernames);
            }

            if (data.type === 'voice_users_update') {
                console.log('🔊 [GlobalWS] Received voice_users_update:', data.voice_users);
                setVoiceUsersState(data.voice_users);
            }

            if (data.type === 'user_activity_update') {
                setAllUsers(prevUsers => prevUsers.map(u => {
                    if (u.username === data.username) {
                        return { ...u, current_activity: data.activity };
                    }
                    return u;
                }));
            }

            // 🔥 Profil güncelleme (avatar, status_message vb.) - currentUserProfile'ı güncelle
            if (data.type === 'user_profile_update' && data.user_data) {
                const updatedUser = data.user_data;

                // Kendi profilimizi mi güncelledi?
                if (updatedUser.username === username) {
                    console.log('👤 [Profile Update] Updating currentUserProfile:', updatedUser);
                    setCurrentUserProfile(prevProfile => ({
                        ...prevProfile,
                        avatar: updatedUser.avatar,
                        status_message: updatedUser.status_message,
                        social_links: updatedUser.social_links,
                        coins: updatedUser.coins,
                        xp: updatedUser.xp,
                        level: updatedUser.level,
                        status: updatedUser.status,
                        role: updatedUser.role
                    }));
                }

                // AllUsers listesini de güncelle
                setAllUsers(prevUsers => prevUsers.map(u => {
                    if (u.username === updatedUser.username) {
                        return { ...u, ...updatedUser };
                    }
                    return u;
                }));
            }

            if (data.type === 'global_message_notification' && data.username !== username) {
                const key = data.room_slug ? `room-${data.room_slug}` : `dm-${data.conversation_id}`;
                const currentKey = activeChat.type === 'room' ? `room-${activeChat.id}` : `dm-${activeChat.id}`;
                if (key !== currentKey) incrementUnread(key);
            }

            // ✨ Handle Real-time Server/Channel Updates
            if (data.type === 'server_structure_update') {
                console.log("Server structure update received, refreshing...");
                fetchWithAuth(ROOM_LIST_URL).then(r => r.json()).then(rooms => setCategories(rooms)).catch(console.error);
            }
        };
        return () => socket.close();
    }, [isAuthenticated, isInitialDataLoaded, username, token, activeChat]);

    // 🎤 SESLİ SOHBETE GİRİNCE CHAT ALANINI OTOMATİK DEĞİŞTİR
    useEffect(() => {
        if (isInVoice && currentVoiceRoom) {
            console.log(`🔊 [Voice] Switched to voice chat panel: ${currentVoiceRoom}`);
            setActiveChat('voice', currentVoiceRoom);
        }
    }, [isInVoice, currentVoiceRoom]);

    const handleRoomChange = (slug) => {
        setActiveChat('room', slug);
        if (isMobile) setIsLeftSidebarVisible(false);
    };

    const handleDMClick = (targetUser) => {
        fetchWithAuth(GET_OR_CREATE_CONVERSATION_URL, { method: 'POST', body: JSON.stringify({ target_username: targetUser }) })
            .then(r => r.json())
            .then(data => {
                setActiveChat('dm', data.conversation_id, targetUser);
                if (isMobile) setIsLeftSidebarVisible(false);
            });
    };

    const navigateToPath = useCallback((hashPath) => {
        if (!hashPath) return;
        window.location.hash = hashPath.startsWith('#/') ? hashPath : `#${hashPath.startsWith('/') ? hashPath : `/${hashPath}`}`;
        if (isMobile) setIsRightSidebarVisible(false);
    }, [isMobile]);

    // 🔥 REMOVED: Bu useEffect satır 1787'deki useEffect ile çakışıyordu!
    // activeChat değiştiğinde mesaj geçmişini ve WebSocket'i YÖNETİM artık
    // TEK BİR useEffect'te yapılıyor (satır 1787-1819)
    // Bu sayede WebSocket bağlantısı çift açılmıyor ve mesajlar kaybolmuyor.

    // 🔥 REMOVED: Conflicting cache useEffect - cache logic now in main useEffect above

    const toggleNotifications = useCallback(() => {
        setSoundSettings(prev => {
            const next = { ...prev, notifications: !prev.notifications };
            localStorage.setItem('chat_sound_settings', JSON.stringify(next));
            return next;
        });
    }, []);

    const handleCopyLink = useCallback(async () => {
        if (!activeChat?.id) return;
        const link = `${window.location.origin}/#/${activeChat.type === 'dm' ? `dm/${activeChat.id}` : `room/${activeChat.id}`}`;
        try {
            await navigator.clipboard.writeText(link);
            setUpdateStatusText('Link kopyalandı');
            setTimeout(() => setUpdateStatusText(''), 1500);
        } catch (e) {
            console.error('Link kopyalanamadı', e);
            toast.error('Link kopyalanamadı');
        }
    }, [activeChat]);

    const fetchMessageHistory = async (isInitial = true, offset = 0) => {
        if (!activeChat.id) return;

        // 🔥 FIX: Voice chat için mesaj geçmişi yok
        if (activeChat.type === 'voice') {
            console.log('[Voice] Skipping message history for voice chat');
            setMessages([]);
            setHasMoreMessages(false);
            return;
        }

        console.log('🔄 [fetchMessageHistory] Starting fetch:', { isInitial, offset, activeChat });
        setMessageHistoryLoading(true);
        const urlBase = activeChat.type === 'room' ? MESSAGE_HISTORY_ROOM_URL : MESSAGE_HISTORY_DM_URL;
        const key = activeChat.type === 'room' ? `room-${activeChat.id}` : `dm-${activeChat.id}`;

        // 🔥 FIX: Cache'i ARTIK TEMİZLEME - activeChat effect'inde cache varsa bu fonksiyon zaten çağrılmıyor
        // Sadece ilk yüklemede (cache yoksa) buraya gelir, o yüzden cache temizlemeye gerek yok
        // if (isInitial) {
        //     console.log('🗑️ [fetchMessageHistory] Clearing cache for:', key);
        //     delete historyCacheRef.current[key];
        // }

        try {
            const res = await fetchWithAuth(`${urlBase}${activeChat.id}/?limit=50&offset=${offset}`);
            if (res.ok) {
                const data = await res.json();

                // ✅ FIX: Hatalı mesajları filtrele (eski/bozuk veriler için)
                const rawMessages = data.results || [];
                const validMessages = rawMessages.filter(msg => {
                    // Mesaj objesi geçerli mi?
                    if (!msg || typeof msg !== 'object') {
                        console.warn('⚠️ [fetchMessageHistory] Invalid message object:', msg);
                        return false;
                    }
                    // En azından ID veya temp_id olmalı
                    if (!msg.id && !msg.temp_id) {
                        console.warn('⚠️ [fetchMessageHistory] Message without ID:', msg);
                        return false;
                    }
                    return true;
                });

                if (validMessages.length < rawMessages.length) {
                    console.warn(`⚠️ [fetchMessageHistory] Filtered out ${rawMessages.length - validMessages.length} invalid messages`);
                }

                const newMsgs = validMessages.reverse();
                console.log('✅ [fetchMessageHistory] Fetched messages:', newMsgs.length);

                let combinedMessages = newMsgs;
                if (isInitial) {
                    console.log('📝 [fetchMessageHistory] Setting messages (INITIAL):', newMsgs.length);
                    setMessages(newMsgs);
                    setTimeout(() => scrollToBottom('auto'), 100);
                } else {
                    setMessages(prev => {
                        console.log('📝 [fetchMessageHistory] Appending to existing:', prev.length, '+', newMsgs.length);
                        combinedMessages = [...newMsgs, ...prev];
                        return combinedMessages;
                    });
                }

                const nextOffset = isInitial ? newMsgs.length : offset + newMsgs.length;
                const hasMore = !!data.next;
                setHasMoreMessages(hasMore);
                if (!isInitial) setMessageHistoryOffset(nextOffset);

                const cachedExisting = historyCacheRef.current[key]?.messages || [];
                const cachedCombined = isInitial ? newMsgs : [...newMsgs, ...cachedExisting];
                historyCacheRef.current[key] = {
                    messages: combinedMessages || cachedCombined,
                    offset: nextOffset,
                    hasMore,
                };
                console.log('💾 [fetchMessageHistory] Cached:', key, 'with', (combinedMessages || cachedCombined).length, 'messages');
            }
        } catch (e) {
            console.error('❌ [fetchMessageHistory] Error:', e);
        }
        setMessageHistoryLoading(false);
    };

    const handleLogin = async (u, p) => {
        try {
            console.log('🔑 [Auth] Login attempt:', { username: u, url: LOGIN_URL });
            const res = await fetch(LOGIN_URL, {
                method: 'POST',
                body: JSON.stringify({ username: u, password: p }),
                headers: { 'Content-Type': 'application/json' }
            });

            console.log('🔑 [Auth] Response status:', res.status);
            const data = await res.json();

            if (res.ok) {
                console.log('✅ [Auth] Login successful');
                login(data.access, data.refresh);
            } else {
                console.error('❌ [Auth] Login failed:', data);
                if (res.status === 401) {
                    setAuthError('Kullanıcı adı veya şifre hatalı');
                } else if (res.status === 400) {
                    setAuthError(data.detail || data.error || 'Geçersiz giriş bilgileri');
                } else if (res.status >= 500) {
                    setAuthError('Sunucu hatası. Lütfen daha sonra tekrar deneyin.');
                } else {
                    setAuthError(data.detail || data.error || 'Giriş başarısız');
                }
            }
        } catch (e) {
            console.error('❌ [Auth] Network error:', e);
            setAuthError("Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.");
        }
    };

    const handleRegister = async (u, e, p) => {
        try {
            console.log('📝 [Auth] Register attempt:', { username: u, email: e, url: REGISTER_URL });
            const res = await fetch(REGISTER_URL, {
                method: 'POST',
                body: JSON.stringify({ username: u, email: e, password: p }),
                headers: { 'Content-Type': 'application/json' }
            });

            console.log('📝 [Auth] Response status:', res.status);

            if (res.status === 201) {
                console.log('✅ [Auth] Registration successful');
                return true;
            }

            const data = await res.json();
            console.error('❌ [Auth] Registration failed:', data);

            // Hata mesajlarını kullanıcı dostu hale getir
            let errorMessage = '';
            if (data.username) {
                errorMessage = data.username.join(' ');
            } else if (data.email) {
                errorMessage = data.email.join(' ');
            } else if (data.password) {
                errorMessage = data.password.join(' ');
            } else if (data.detail) {
                errorMessage = data.detail;
            } else {
                errorMessage = Object.values(data).flat().join(' ');
            }

            setAuthError(errorMessage || 'Kayıt işlemi başarısız');
            return false;
        } catch (err) {
            console.error('❌ [Auth] Network error:', err);
            setAuthError("Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.");
            return false;
        }
    };

    const uploadFile = useCallback(async (file, isVoice = false, duration = 0, targetOverride = null) => {
        setIsUploading(true);
        setUploadProgress(0);

        const target = targetOverride || activeChat;
        const tempId = getTemporaryId();

        try {
            const hash = await calculateFileHash(file);
            const contentType = file.type || 'application/octet-stream';

            // 🚀 R2 MULTIPART UPLOAD - Çok daha hızlı!
            const CHUNK_SIZE = 10 * 1024 * 1024; // 10 MB (R2 min: 5MB)
            const PARALLEL_UPLOADS = 5; // 5 part aynı anda
            const totalParts = Math.ceil(file.size / CHUNK_SIZE);

            console.log(`🚀 [R2 Multipart] Starting upload:`, {
                fileName: file.name,
                fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
                totalParts,
                parallelUploads: PARALLEL_UPLOADS
            });

            // 1️⃣ Multipart upload başlat
            const initRes = await fetchWithAuth(`${API_BASE_URL}/upload/multipart/init/`, {
                method: 'POST',
                body: JSON.stringify({
                    file_name: file.name,
                    file_size: file.size,
                    content_type: contentType,
                    file_hash: hash
                })
            });

            const initData = await initRes.json();

            // Dosya zaten varsa
            if (initData.file_exists) {
                console.log('✅ [R2] File already exists, skipping upload');
                toast.success('Dosya zaten yüklü!');
                setIsUploading(false);
                setUploadProgress(100);
                return;
            }

            const { upload_id, key } = initData;
            console.log(`📦 [R2] Upload ID: ${upload_id.substring(0, 20)}..., Key: ${key}`);

            // 2️⃣ Her part için backend üzerinden R2'ye yükle (ETag almak için)
            const parts = [];
            let completedParts = 0;

            const uploadPart = async (partNumber) => {
                const start = (partNumber - 1) * CHUNK_SIZE;
                const end = Math.min(start + CHUNK_SIZE, file.size);
                const chunk = file.slice(start, end);

                console.log(`📤 [R2] Part ${partNumber}/${totalParts} uploading...`);

                // Backend üzerinden yükle (ETag döner)
                const formData = new FormData();
                formData.append('upload_id', upload_id);
                formData.append('key', key);
                formData.append('part_number', partNumber.toString());
                formData.append('chunk', chunk, `part_${partNumber}`);

                const uploadRes = await fetchWithAuth(`${API_BASE_URL}/upload/multipart/upload-part/`, {
                    method: 'POST',
                    body: formData,
                    // Content-Type header'ı FormData için otomatik ayarlanır
                    headers: {} // fetchWithAuth'un Content-Type'ı override etmemesi için
                });

                if (!uploadRes.ok) {
                    const errText = await uploadRes.text();
                    throw new Error(`Part ${partNumber} upload failed: ${uploadRes.status} - ${errText}`);
                }

                const { etag, part_number } = await uploadRes.json();

                completedParts++;
                const progress = Math.round((completedParts / totalParts) * 95); // %95'e kadar
                setUploadProgress(progress);

                console.log(`✅ [R2] Part ${partNumber}/${totalParts} complete (${progress}%), ETag: ${etag}`);

                return {
                    ETag: etag,
                    PartNumber: part_number
                };
            };

            // Paralel upload - PARALLEL_UPLOADS adet aynı anda
            for (let i = 0; i < totalParts; i += PARALLEL_UPLOADS) {
                const batch = [];
                for (let j = 0; j < PARALLEL_UPLOADS && (i + j) < totalParts; j++) {
                    batch.push(uploadPart(i + j + 1)); // PartNumber 1'den başlar
                }
                const batchResults = await Promise.all(batch);
                parts.push(...batchResults);
            }

            // Parts'ı PartNumber'a göre sırala
            parts.sort((a, b) => a.PartNumber - b.PartNumber);

            console.log(`📋 [R2] All parts uploaded, completing...`, parts);

            // 3️⃣ Multipart upload'ı tamamla ve mesaj oluştur
            const completeRes = await fetchWithAuth(`${API_BASE_URL}/upload/multipart/complete/`, {
                method: 'POST',
                body: JSON.stringify({
                    upload_id,
                    key,
                    parts,
                    file_name: file.name,
                    file_hash: hash,
                    room_slug: target.type === 'room' ? target.id : null,
                    conversation_id: target.type === 'dm' ? target.id : null,
                    temp_id: tempId,
                    is_voice_message: isVoice ? 'true' : 'false',
                    duration: duration.toString()
                })
            });

            if (!completeRes.ok) {
                const errorText = await completeRes.text();
                throw new Error(`Complete failed: ${errorText}`);
            }

            const data = await completeRes.json();
            setUploadProgress(100);

            console.log('✅ [R2 Multipart] Upload complete!', data);

            // Mesajı listeye ekle
            if (target.id === activeChat.id) {
                setMessages(prev => {
                    if (data.temp_id) {
                        const tempIndex = prev.findIndex(msg => msg.temp_id === data.temp_id);
                        if (tempIndex !== -1) {
                            const newMessages = [...prev];
                            newMessages[tempIndex] = data;
                            return newMessages;
                        }
                    }
                    if (data.id && prev.some(msg => msg.id === data.id)) {
                        return prev;
                    }
                    return [...prev, data];
                });
                scrollToBottom('smooth');
            }

        } catch (e) {
            console.error('❌ [R2 Multipart] Error:', e);
            toast.error(`Yükleme hatası: ${e.message}`);
        }

        setIsUploading(false);
    }, [activeChat, username, fetchWithAuth]);

    const handleChatDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            uploadFile(e.dataTransfer.files[0]);
        }
    };
    const handleSidebarDrop = (e, target) => {
        e.preventDefault(); e.stopPropagation(); setDropTarget(null);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];

            // DM'e dosya atıldıysa
            if (target.type === 'dm') {
                // DM'i aç ve dosyayı yükle
                const conversation = conversations.find(c => c.id === target.id);
                if (conversation) {
                    const otherUser = conversation.participants.find(p => p.username !== username);
                    if (otherUser) {
                        // DM'i aktif et
                        handleDMClick(otherUser.username);
                        // Dosyayı yükle
                        setTimeout(() => {
                            uploadFile(file, false, 0, target);
                        }, 300);
                    }
                }
            }
            // Odaya dosya atıldıysa
            else if (target.type === 'room') {
                // Odayı aç ve dosyayı yükle
                const room = roomsWithCategories.find(r => r.room_slug === target.id);
                if (room) {
                    handleRoomClick(target.id);
                    setTimeout(() => {
                        uploadFile(file, false, 0, target);
                    }, 300);
                }
            }
        }
    };

    const handleSearchMessages = async (e) => {
        e.preventDefault();
        if (!activeChat.id || !debouncedSearchQuery.trim()) {
            if (!debouncedSearchQuery.trim()) fetchMessageHistory(true, 0);
            return;
        }
        setMessageHistoryLoading(true);
        try {
            let url = `${API_BASE_URL}/messages/search/?q=${encodeURIComponent(debouncedSearchQuery)}`;
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

    const handleDeleteMessage = async (messageId) => {
        if (!window.confirm("Bu mesajı silmek istediğine emin misin?")) return;
        try {
            const res = await fetchWithAuth(`${API_BASE_URL}/messages/${messageId}/delete/`, { method: 'DELETE' });
            if (res.ok) setMessages(prev => prev.filter(m => m.id !== messageId));
        } catch (e) { console.error(e); }
    };

    const handleHideConversation = async (conversationId) => {
        if (!window.confirm("Bu sohbeti listenizden gizlemek istiyor musunuz?")) return;
        try {
            const res = await fetchWithAuth(`${API_BASE_URL}/conversations/${conversationId}/hide/`, { method: 'POST' });
            if (res.ok) {
                setConversations(prev => prev.filter(c => c.id !== conversationId));
                if (activeChat.type === 'dm' && activeChat.id === conversationId) {
                    setActiveChat('welcome', 'welcome');
                }
            }
        } catch (e) { console.error(e); }
    };

    // 🔥 ADMIN: Permanently delete entire conversation (from both sides)
    const handleAdminDeleteConversation = async (conversationId) => {
        if (!window.confirm("⚠️ ADMİN: Bu konuşmayı HER İKİ TARAFTAN KALICI OLARAK silmek istediğinize emin misiniz?\n\nBu işlem GERİ ALINAMAZ!")) return;
        try {
            const res = await fetchWithAuth(`${API_BASE_URL}/conversations/${conversationId}/admin-delete/`, { method: 'DELETE' });
            if (res.ok) {
                const data = await res.json();
                toast.success(`✅ ${data.deleted_messages} mesaj silindi. Katılımcılar: ${data.participants.join(', ')}`);
                setConversations(prev => prev.filter(c => c.id !== conversationId));
                if (activeChat.type === 'dm' && activeChat.id === conversationId) {
                    setActiveChat('welcome', 'welcome');
                }
            } else {
                const errorData = await res.json();
                toast.error(`❌ Hata: ${errorData.error || 'Silme işlemi başarısız'}`);
            }
        } catch (e) {
            console.error(e);
            toast.error('❌ Sunucuyla bağlantı hatası');
        }
    };

    const handleWelcomeClick = useCallback(() => {
        setActiveChat('welcome', 'welcome', null);
        if (isMobile) setIsLeftSidebarVisible(false);
    }, [isMobile]);

    // 🔥 USER CONTEXT MENU HANDLER
    const handleUserContextAction = useCallback(async (action, user, extraData) => {
        switch (action) {
            case 'profile':
                // Profil görüntüle
                const userProfile = allUsers.find(u => u.username === user.username);
                if (userProfile) setViewingProfile(userProfile);
                break;

            case 'message':
                // DM başlat
                handleDMClick(user.username);
                break;

            case 'volume':
                // Ses seviyesi ayarla (zaten VoiceUserList'te var)
                break;

            case 'move':
                // Kullanıcıyı başka kanala taşı (admin/mod)
                if (isAdmin && extraData && currentVoiceRoom) {
                    try {
                        const res = await fetchWithAuth(`${API_BASE_URL}/voice/move_user/`, {
                            method: 'POST',
                            body: JSON.stringify({
                                username: user.username,
                                from_channel: currentVoiceRoom,
                                to_channel: extraData
                            })
                        });
                        if (res.ok) {
                            console.log(`✅ ${user.username} moved to ${extraData}`);
                        }
                    } catch (e) {
                        console.error('Move user error:', e);
                    }
                }
                break;

            case 'kick':
                // Kanaldan at (admin/mod)
                if (isAdmin && window.confirm(`${user.username} kullanıcısını kanaldan atmak istediğine emin misin?`)) {
                    try {
                        const res = await fetchWithAuth(`${API_BASE_URL}/voice/kick_user/`, {
                            method: 'POST',
                            body: JSON.stringify({
                                username: user.username,
                                room: currentVoiceRoom
                            })
                        });
                        if (res.ok) {
                            console.log(`✅ ${user.username} kicked from voice`);
                        }
                    } catch (e) {
                        console.error('Kick user error:', e);
                    }
                }
                break;

            case 'server_mute':
                // Server-side mute (admin/mod)
                if (isAdmin) {
                    try {
                        const res = await fetchWithAuth(`${API_BASE_URL}/voice/server_mute/`, {
                            method: 'POST',
                            body: JSON.stringify({
                                username: user.username,
                                room: currentVoiceRoom
                            })
                        });
                        if (res.ok) {
                            console.log(`✅ ${user.username} server muted`);
                        }
                    } catch (e) {
                        console.error('Server mute error:', e);
                    }
                }
                break;

            case 'add_friend':
                // Arkadaş ekle
                try {
                    const res = await fetchWithAuth(`${API_BASE_URL}/friends/send/`, {
                        method: 'POST',
                        body: JSON.stringify({ username: user.username })
                    });
                    if (res.ok) {
                        setUpdateStatusText(`✅ ${user.username} kullanıcısına arkadaşlık isteği gönderildi!`);
                        setTimeout(() => setUpdateStatusText(''), 3000);
                    } else {
                        const data = await res.json();
                        setUpdateStatusText(`❌ ${data.error || 'İstek gönderilemedi'}`);
                        setTimeout(() => setUpdateStatusText(''), 3000);
                    }
                } catch (e) {
                    console.error('Add friend error:', e);
                    setUpdateStatusText('❌ Arkadaş ekleme hatası');
                    setTimeout(() => setUpdateStatusText(''), 3000);
                }
                break;

            case 'remove_friend':
                // Arkadaştan çıkar
                if (window.confirm(`${user.username} ile arkadaşlığı sonlandırmak istediğinize emin misiniz?`)) {
                    try {
                        // Friendship ID'sini bul
                        const friendship = friendsList.find(f =>
                            f.sender_username === user.username || f.receiver_username === user.username
                        );
                        if (friendship) {
                            const res = await fetchWithAuth(`${API_BASE_URL}/friends/remove/${friendship.id}/`, {
                                method: 'DELETE'
                            });
                            if (res.ok) {
                                setUpdateStatusText(`✅ ${user.username} ile arkadaşlık sonlandırıldı`);
                                setTimeout(() => setUpdateStatusText(''), 3000);
                                // Listeyi yenile
                                const friendsRes = await fetchWithAuth(`${API_BASE_URL}/friends/list/`);
                                if (friendsRes.ok) {
                                    const data = await friendsRes.json();
                                    setFriendsList(data.friends || []);
                                }
                            }
                        }
                    } catch (e) {
                        console.error('Remove friend error:', e);
                        setUpdateStatusText('❌ Arkadaşlık sonlandırma hatası');
                        setTimeout(() => setUpdateStatusText(''), 3000);
                    }
                }
                break;

            case 'invite_to_server':
                // 🎫 Sunucuya davet modal'ını aç
                setInviteToServerUser({ username: user.username });
                break;

            case 'mute_user':
                // 🔇 Kullanıcıyı sessize al (DM bildirimleri)
                try {
                    const res = await fetchWithAuth(`${API_BASE_URL}/users/${user.username}/mute/`, {
                        method: 'POST'
                    });
                    if (res.ok) {
                        toast.success(`🔇 ${user.username} sessize alındı`);
                    } else {
                        const data = await res.json();
                        toast.error(`❌ ${data.error || 'Sessize alma başarısız'}`);
                    }
                } catch (e) {
                    console.error('Mute user error:', e);
                    toast.error('❌ Sessize alma hatası');
                }
                break;

            case 'block_user':
                // 🚫 Kullanıcıyı engelle
                if (window.confirm(`${user.username} kullanıcısını engellemek istediğinize emin misiniz?`)) {
                    try {
                        const res = await fetchWithAuth(`${API_BASE_URL}/users/${user.username}/block/`, {
                            method: 'POST'
                        });
                        if (res.ok) {
                            toast.success(`🚫 ${user.username} engellendi`);
                            // Arkadaş listesini yenile
                            const friendsRes = await fetchWithAuth(`${API_BASE_URL}/friends/list/`);
                            if (friendsRes.ok) {
                                const data = await friendsRes.json();
                                setFriendsList(data.friends || []);
                            }
                        } else {
                            const data = await res.json();
                            toast.error(`❌ ${data.error || 'Engelleme başarısız'}`);
                        }
                    } catch (e) {
                        console.error('Block user error:', e);
                        toast.error('❌ Engelleme hatası');
                    }
                }
                break;

            default:
                console.log('Unknown action:', action);
        }
    }, [allUsers, isAdmin, currentVoiceRoom, fetchWithAuth, API_BASE_URL, handleDMClick, friendsList, setUpdateStatusText]);

    const handleStartUpdate = () => {
        if (isElectron) {
            setIsDownloading(true);
            setUpdateStatusText('İndiriliyor...');
            const { ipcRenderer } = window.require('electron');
            // Local path - media/build/Pawscord-Setup.exe
            const DOWNLOAD_URL = `${ABSOLUTE_HOST_URL}/media/build/Pawscord-Setup.exe`;
            ipcRenderer.send('start-download', DOWNLOAD_URL);
        } else {
            // Tarayıcıdan indirme - media/build klasörüne yönlendir
            window.open(`${ABSOLUTE_HOST_URL}/media/build/Pawscord-Setup.exe`, '_blank');
        }
    };

    useEffect(() => {
        if (isElectron) {
            const { ipcRenderer } = window.require('electron');
            const handleProgress = (event, progress) => setDownloadProgress(Math.round(progress * 100));
            const handleComplete = () => {
                setUpdateStatusText('Başlatılıyor...');
                setDownloadProgress(100);
                setTimeout(() => setUpdateStatusText('Kapanıyor...'), 1500);
            };
            const handleError = (event, error) => { setIsDownloading(false); toast.error(`İndirme hatası: ${error}`); };

            ipcRenderer.on('download-progress', handleProgress);
            ipcRenderer.on('download-complete', handleComplete);
            ipcRenderer.on('download-error', handleError);

            return () => {
                ipcRenderer.removeAllListeners('download-progress');
                ipcRenderer.removeAllListeners('download-complete');
                ipcRenderer.removeAllListeners('download-error');
            };
        }
    }, []);

    // --- RENDER ---
    // 🔥 Splash screen overlay - arka planda veri yüklenmeye devam eder
    const showSplash = animationState !== 'finished';

    if (!isAuthenticated) return (
        <>
            {showSplash && <SplashScreen animationState={animationState} />}
            <LoginPage onLogin={handleLogin} onRegister={handleRegister} error={authError} setAuthError={setAuthError} />
        </>
    );

    const mobileWebPadding = (isMobile && !isNative) ? '20px' : safeAreaTop;
    const currentKeyId = activeChat.type === 'room' ? `room-${activeChat.id}` : `dm-${activeChat.id}`;
    const hasKey = !!encryptionKeys[currentKeyId];

    // 🔗 Eğer vanity invite ekranı açıksa, sadece onu göster (performans için)
    if (showVanityInvite) {
        return (
            <Suspense fallback={<LoadingSpinner size="large" text="Davet yükleniyor..." />}>
                <VanityInviteScreen
                    vanityPath={showVanityInvite}
                    fetchWithAuth={fetchWithAuth}
                    apiBaseUrl={API_BASE_URL}
                    onClose={() => {
                        setShowVanityInvite(null);
                        window.location.hash = '#/';
                    }}
                />
            </Suspense>
        );
    }

    return (
        <div style={{ ...styles.mainContainer }} className="dark-theme">
            {/* 🔥 Splash overlay - veri yüklenirken göster */}
            {showSplash && <SplashScreen animationState={animationState} />}

            {/* 🆕 Maintenance Mode Banner */}
            {maintenanceMode && (
                <MaintenanceBanner
                    message={maintenanceMode.message}
                    endTime={maintenanceMode.endTime}
                    level={maintenanceMode.level}
                    onDismiss={() => setMaintenanceMode(null)}
                />
            )}

            {/* --- LAZY MODALS --- */}
            <Suspense fallback={<LoadingSpinner size="medium" text="Modal yükleniyor..." />}>
                {showProfilePanel && <UserProfilePanel user={currentUserProfile} onClose={() => setShowProfilePanel(false)} onProfileUpdate={(updatedUser) => setCurrentUserProfile(updatedUser)} onLogout={logout} fetchWithAuth={fetchWithAuth} getDeterministicAvatar={getDeterministicAvatar} updateProfileUrl={UPDATE_PROFILE_URL} changeUsernameUrl={CHANGE_USERNAME_URL} soundSettings={soundSettings} onUpdateSoundSettings={setSoundSettings} onImageClick={setZoomedImage} apiBaseUrl={API_BASE_URL} />}
                {showStore && <PremiumStoreModal onClose={() => setShowStore(false)} />}
                {showAnalytics && <AdminAnalyticsPanel onClose={() => setShowAnalytics(false)} fetchWithAuth={fetchWithAuth} apiBaseUrl={API_BASE_URL} />}
                {showAdminPanel && (
                    <AdminPanelModal
                        onClose={() => setShowAdminPanel(false)}
                        onOpenAnalytics={() => setShowAnalytics(true)}
                        onOpenWebhooks={() => setShowWebhooks(true)}
                        onOpenModTools={() => setShowModTools(true)}
                        onOpenAuditLogs={() => setShowAuditLog(true)}
                        onOpenReports={() => setShowReportSystem(true)}
                        onOpenVanityURL={() => setShowVanityURL(true)}
                        onOpenAutoResponder={() => setShowAutoResponder(true)}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                    />
                )}

                {/* � CRITICAL & HIGH PRIORITY PANELS (2026-01-19) */}
                {showPaymentPanel && (
                    <PaymentPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        onClose={() => setShowPaymentPanel(false)}
                        username={username}
                    />
                )}
                {showStoreModal && (
                    <StoreModal
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        onClose={() => setShowStoreModal(false)}
                        username={username}
                    />
                )}
                {showDailyRewards && (
                    <DailyRewardsModal
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        onClose={() => setShowDailyRewards(false)}
                        username={username}
                    />
                )}
                {showAPIUsagePanel && (
                    <APIUsagePanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        onClose={() => setShowAPIUsagePanel(false)}
                        username={username}
                    />
                )}
                {showExportJobsPanel && (
                    <ExportJobsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        onClose={() => setShowExportJobsPanel(false)}
                        username={username}
                    />
                )}
                {showScheduledAnnouncements && (
                    <ScheduledAnnouncementsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        onClose={() => setShowScheduledAnnouncements(false)}
                        serverId={activeChat?.type === 'room' ? activeChat.server_id : null}
                    />
                )}

                {/* 🔗 PLATFORM CONNECTIONS PANEL */}
                {showConnectionsPanel && (
                    <ConnectionsPanel
                        onClose={() => setShowConnectionsPanel(false)}
                    />
                )}

                {/* 🔑 PASSWORD SETUP MODAL (Google Users) */}
                {showPasswordSetupModal && (
                    <PasswordSetupModal
                        onClose={() => setShowPasswordSetupModal(false)}
                        apiBaseUrl={API_BASE_URL}
                    />
                )}

                {/* 🛡️ MODERATION PANELS */}
                {showAutoModeration && (
                    <AutoModerationDashboard
                        serverId={activeChat?.type === 'room' ? activeChat.server_id : null}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        onClose={() => setShowAutoModeration(false)}
                    />
                )}
                {showRaidProtection && (
                    <RaidProtectionPanel
                        serverId={activeChat?.type === 'room' ? activeChat.server_id : null}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        onClose={() => setShowRaidProtection(false)}
                    />
                )}
                {showReportSystem && (
                    <ReportSystemPanel
                        serverId={activeChat?.type === 'room' ? activeChat.server_id : null}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        onClose={() => setShowReportSystem(false)}
                    />
                )}
                {showAuditLog && (
                    <AuditLogPanel
                        serverId={activeChat?.type === 'room' ? activeChat.server_id : null}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        onClose={() => setShowAuditLog(false)}
                    />
                )}
                {showUserWarnings && (
                    <UserWarningsPanel
                        serverId={activeChat?.type === 'room' ? activeChat.server_id : null}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        onClose={() => setShowUserWarnings(false)}
                    />
                )}

                {/* 🔥 WEBHOOKS & VANITY URL */}
                {showWebhooks && (
                    <WebhooksPanel
                        serverId={activeChat?.type === 'room' ? activeChat.server_id : null}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        onClose={() => setShowWebhooks(false)}
                    />
                )}
                {showVanityURL && (
                    <VanityURLManager
                        serverId={activeChat?.type === 'room' ? activeChat.server_id : null}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        onClose={() => setShowVanityURL(false)}
                    />
                )}
                {showAutoResponder && activeChat?.type === 'room' && activeChat.server_id && (
                    <Suspense fallback={<div>Yükleniyor...</div>}>
                        <AutoRespondersPanel
                            fetchWithAuth={fetchWithAuth}
                            apiBaseUrl={API_BASE_URL}
                            serverId={activeChat.server_id}
                            onClose={() => setShowAutoResponder(false)}
                        />
                    </Suspense>
                )}

                {/* 📚 NEW FEATURES: Feature Panels (2026-01-19) */}
                {showBookmarks && (
                    <Suspense fallback={<div>Yükleniyor...</div>}>
                        <BookmarkPanel
                            fetchWithAuth={fetchWithAuth}
                            apiBaseUrl={API_BASE_URL}
                            onClose={() => setShowBookmarks(false)}
                            onMessageClick={(msg) => {
                                // Mesaja git
                                if (msg.room) {
                                    setActiveChat({ type: 'room', slug: msg.room });
                                } else if (msg.conversation) {
                                    setActiveChat({ type: 'dm', slug: msg.conversation });
                                }
                                setShowBookmarks(false);
                            }}
                        />
                    </Suspense>
                )}

                {showReadLater && (
                    <Suspense fallback={<div>Yükleniyor...</div>}>
                        <ReadLaterPanel
                            fetchWithAuth={fetchWithAuth}
                            apiBaseUrl={API_BASE_URL}
                            onClose={() => setShowReadLater(false)}
                            onMessageClick={(msg) => {
                                if (msg.room) {
                                    setActiveChat({ type: 'room', slug: msg.room });
                                } else if (msg.conversation) {
                                    setActiveChat({ type: 'dm', slug: msg.conversation });
                                }
                                setShowReadLater(false);
                            }}
                        />
                    </Suspense>
                )}

                {showChannelPermissions && activeChat?.type === 'room' && (
                    <Suspense fallback={<div>Yükleniyor...</div>}>
                        <ChannelPermissionsPanel
                            fetchWithAuth={fetchWithAuth}
                            apiBaseUrl={API_BASE_URL}
                            channelSlug={activeChat.slug}
                            onClose={() => setShowChannelPermissions(false)}
                        />
                    </Suspense>
                )}

                {showAutoModeration && (
                    <Suspense fallback={<div>Yükleniyor...</div>}>
                        <AutoModerationPanel
                            fetchWithAuth={fetchWithAuth}
                            apiBaseUrl={API_BASE_URL}
                            serverId={activeChat?.type === 'room' ? activeChat.server_id : null}
                            onClose={() => setShowAutoModeration(false)}
                        />
                    </Suspense>
                )}

                {chartSymbol && <CryptoChartModal symbol={chartSymbol} onClose={() => setChartSymbol(null)} />}
                {showCinema && <CinemaModal onClose={() => setShowCinema(false)} ws={ws} username={username} />}
                {showSnippetModal && <CodeSnippetModal onClose={() => setShowSnippetModal(false)} onSend={handleSendSnippet} />}
                {serverToEdit && <ServerSettingsModal onClose={() => setServerToEdit(null)} server={serverToEdit} currentUsername={username} fetchWithAuth={fetchWithAuth} apiBaseUrl={API_BASE_URL} serverMembers={serverMembers} />}
                {showEncModal && <EncryptionKeyModal onClose={() => setShowEncModal(false)} onSetKey={(key) => setEncryptionKey(currentKeyId, key)} existingKey={encryptionKeys[currentKeyId]} />}
                {showDownloadModal && <DownloadModal onClose={() => setShowDownloadModal(false)} apiBaseUrl={API_BASE_URL} />}
                {showSummary && <SummaryModal isLoading={isSummaryLoading} summaryText={summaryResult} onClose={() => setShowSummary(false)} />}
                {showGroupModal && <CreateGroupModal onClose={() => setShowGroupModal(false)} friendsList={friendsList} fetchWithAuth={fetchWithAuth} apiBaseUrl={API_BASE_URL} onGroupCreated={(newConv) => { setConversations(prev => [newConv, ...prev]); setActiveChat('dm', newConv.id, 'Grup Sohbeti'); }} />}
                {showWhiteboard && (activeChat.type === 'room' || activeChat.type === 'dm') && (
                    <WhiteboardModal roomSlug={activeChat.type === 'room' ? activeChat.id : `dm_${activeChat.id}`} onClose={() => setShowWhiteboard(false)} wsProtocol={WS_PROTOCOL} apiHost={API_HOST} />
                )}
                {showSoundboard && <SoundboardModal onClose={() => setShowSoundboard(false)} fetchWithAuth={fetchWithAuth} apiBaseUrl={API_BASE_URL} sendSignal={sendSignal} absoluteHostUrl={ABSOLUTE_HOST_URL} />}
                {showDJ && <DJModal onClose={() => setShowDJ(false)} ws={ws} roomSlug={activeChat.id} />}
                {showGifPicker && <GifPicker onSelect={(url) => { const full = url.startsWith('http') ? url : ABSOLUTE_HOST_URL + url; sendMessage(full); setShowGifPicker(false); }} onClose={() => setShowGifPicker(false)} localGifListUrl={LOCAL_GIF_LIST_URL} absoluteHostUrl={ABSOLUTE_HOST_URL} fetchWithAuth={fetchWithAuth} />}
                {showStickerPicker && <StickerPicker onClose={() => setShowStickerPicker(false)} onSelect={(url) => { sendMessage(url); setShowStickerPicker(false); }} fetchWithAuth={fetchWithAuth} apiBaseUrl={API_BASE_URL} />}
                {showPollModal && <PollCreateModal onClose={() => setShowPollModal(false)} fetchWithAuth={fetchWithAuth} apiBaseUrl={API_BASE_URL} activeRoomSlug={activeChat.id} />}
            </Suspense>

            {/* 🚀 BATCH 1: Analytics & Tracking (2026-01-19) */}
            {showReactionAnalytics && activeChat?.type === 'room' && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <ReactionAnalyticsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        roomSlug={activeChat.slug}
                        onClose={() => setShowReactionAnalytics(false)}
                    />
                </Suspense>
            )}

            {showLinkClickTracking && activeChat?.type === 'room' && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <LinkClickTrackingPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        roomSlug={activeChat.slug}
                        onClose={() => setShowLinkClickTracking(false)}
                    />
                </Suspense>
            )}

            {showJoinLeaveLogs && activeChat?.type === 'room' && activeChat.server_id && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <JoinLeaveLogsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        serverId={activeChat.server_id}
                        onClose={() => setShowJoinLeaveLogs(false)}
                    />
                </Suspense>
            )}

            {showUserActivity && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <UserActivityPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        username={username}
                        onClose={() => setShowUserActivity(false)}
                    />
                </Suspense>
            )}

            {showNicknameHistory && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <NicknameHistoryPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        username={username}
                        onClose={() => setShowNicknameHistory(false)}
                    />
                </Suspense>
            )}

            {showFieldChangeTracking && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <FieldChangeTrackingPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        onClose={() => setShowFieldChangeTracking(false)}
                    />
                </Suspense>
            )}

            {showInviteAnalytics && activeChat?.type === 'room' && activeChat.server_id && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <InviteAnalyticsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        serverId={activeChat.server_id}
                        onClose={() => setShowInviteAnalytics(false)}
                    />
                </Suspense>
            )}

            {/* 🚀 BATCH 2: Content & Moderation (2026-01-19) */}
            {showContentScanner && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <ContentScannerPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        onClose={() => setShowContentScanner(false)}
                    />
                </Suspense>
            )}

            {showEphemeralMessages && activeChat?.type === 'room' && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <EphemeralMessagesPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        roomSlug={activeChat.slug}
                        onClose={() => setShowEphemeralMessages(false)}
                    />
                </Suspense>
            )}

            {showTopicHistory && activeChat?.type === 'room' && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <TopicHistoryPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        roomSlug={activeChat.slug}
                        onClose={() => setShowTopicHistory(false)}
                    />
                </Suspense>
            )}

            {showDrafts && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <DraftsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        onClose={() => setShowDrafts(false)}
                        onLoadDraft={(draft) => {
                            // Draft'ı mesaj composer'a yükle
                            if (draft.room) {
                                setActiveChat({ type: 'room', slug: draft.room });
                            }
                            setShowDrafts(false);
                        }}
                    />
                </Suspense>
            )}

            {showServerNicknames && activeChat?.type === 'room' && activeChat.server_id && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <ServerNicknamesPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        serverId={activeChat.server_id}
                        onClose={() => setShowServerNicknames(false)}
                    />
                </Suspense>
            )}

            {/* 🚀 BATCH 3: Server Features (2026-01-19) */}
            {showServerBoost && activeChat?.type === 'room' && activeChat.server_id && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <ServerBoostPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        serverId={activeChat.server_id}
                        currentUsername={username}
                        onClose={() => setShowServerBoost(false)}
                    />
                </Suspense>
            )}

            {showRoomWebhooks && activeChat?.type === 'room' && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <RoomWebhooksPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        roomSlug={activeChat.slug}
                        onClose={() => setShowRoomWebhooks(false)}
                    />
                </Suspense>
            )}

            {showOAuthApps && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <OAuthAppsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        onClose={() => setShowOAuthApps(false)}
                    />
                </Suspense>
            )}

            {showAutoResponders && activeChat?.type === 'room' && activeChat.server_id && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <AutoRespondersPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        serverId={activeChat.server_id}
                        onClose={() => setShowAutoResponders(false)}
                    />
                </Suspense>
            )}

            {/* 🚀 BATCH 4: Security & Privacy (2026-01-19) */}
            {showSessionManagement && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <SessionManagementPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        onClose={() => setShowSessionManagement(false)}
                    />
                </Suspense>
            )}

            {showGDPRExport && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <GDPRExportPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        onClose={() => setShowGDPRExport(false)}
                    />
                </Suspense>
            )}

            {showDataRetention && activeChat?.type === 'room' && activeChat.server_id && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <DataRetentionPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        serverId={activeChat.server_id}
                        onClose={() => setShowDataRetention(false)}
                    />
                </Suspense>
            )}

            {showTwoFactorSetup && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <TwoFactorSetupWizard
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        onClose={() => setShowTwoFactorSetup(false)}
                        onSuccess={() => {
                            toast.success('2FA başarıyla etkinleştirildi!');
                            setShowTwoFactorSetup(false);
                        }}
                    />
                </Suspense>
            )}

            {/* 🚀 BATCH 5: Communication (2026-01-19) */}
            {showEnhancedPolls && activeChat?.type === 'room' && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <EnhancedPollsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        roomSlug={activeChat.slug}
                        onClose={() => setShowEnhancedPolls(false)}
                    />
                </Suspense>
            )}

            {showVoiceTranscripts && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <VoiceTranscriptsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        onClose={() => setShowVoiceTranscripts(false)}
                    />
                </Suspense>
            )}

            {showInviteExport && activeChat?.type === 'room' && activeChat.server_id && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <InviteExportPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        serverId={activeChat.server_id}
                        onClose={() => setShowInviteExport(false)}
                    />
                </Suspense>
            )}

            {/* 🚀 BATCH 6: Advanced Search & Analytics (2026-01-19) */}
            {showAdvancedSearch && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <AdvancedSearchPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        onClose={() => setShowAdvancedSearch(false)}
                        onMessageClick={(msg) => {
                            if (msg.room) {
                                setActiveChat({ type: 'room', slug: msg.room });
                            }
                            setShowAdvancedSearch(false);
                        }}
                    />
                </Suspense>
            )}

            {showGrowthMetrics && activeChat?.type === 'room' && activeChat.server_id && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <GrowthMetricsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        serverId={activeChat.server_id}
                        onClose={() => setShowGrowthMetrics(false)}
                    />
                </Suspense>
            )}

            {showLinkPreview && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <LinkPreviewRenderer
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        url={null}
                        onClose={() => setShowLinkPreview(false)}
                    />
                </Suspense>
            )}

            {/* 🚀 BATCH 7: Store & Gamification (2026-01-19) */}
            {showInventory && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <InventoryPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        onClose={() => setShowInventory(false)}
                    />
                </Suspense>
            )}

            {showWaitlist && activeChat?.type === 'room' && activeChat.server_id && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <WaitlistPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        serverId={activeChat.server_id}
                        onClose={() => setShowWaitlist(false)}
                    />
                </Suspense>
            )}

            {showReferralRewards && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <ReferralRewardsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        onClose={() => setShowReferralRewards(false)}
                    />
                </Suspense>
            )}

            {/* 🎮 BATCH 8: New Features (2026-01-28) */}
            {showMiniGames && (
                <Suspense fallback={<div>🎮 Oyunlar Yükleniyor...</div>}>
                    <MiniGamesPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        roomSlug={activeChat?.id}
                        currentUser={username}
                        onClose={() => setShowMiniGames(false)}
                    />
                </Suspense>
            )}

            {showProjectCollaboration && (
                <Suspense fallback={<div>📂 Projeler Yükleniyor...</div>}>
                    <ProjectCollaborationPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        serverId={activeChat?.server_id}
                        currentUser={username}
                        onClose={() => setShowProjectCollaboration(false)}
                    />
                </Suspense>
            )}

            {showAvatarStudio && (
                <Suspense fallback={<div>🎨 Avatar Studio Yükleniyor...</div>}>
                    <AvatarStudioPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={API_BASE_URL}
                        currentUser={username}
                        onClose={() => setShowAvatarStudio(false)}
                        onAvatarChange={(newAvatarUrl) => {
                            // Update user profile with new avatar
                            if (currentUserProfile) {
                                setCurrentUserProfile({ ...currentUserProfile, avatar_url: newAvatarUrl });
                            }
                            toast.success('🎨 Avatar güncellendi!');
                        }}
                    />
                </Suspense>
            )}

            {/* --- STANDART MODALLAR --- */}
            {zoomedImage && <ImageModal imageUrl={zoomedImage} onClose={() => setZoomedImage(null)} />}
            {showPinned && <Suspense fallback={<LoadingSpinner size="small" text="Sabitlenmiş mesajlar yükleniyor..." />}><PinnedMessages messages={pinnedMessages} onClose={() => setShowPinned(false)} /></Suspense>}
            {viewingProfile && <UserProfileModal user={viewingProfile} onClose={() => setViewingProfile(null)} onStartDM={handleDMClick} onImageClick={setZoomedImage} getDeterministicAvatar={getDeterministicAvatar} fetchWithAuth={fetchWithAuth} apiBaseUrl={API_BASE_URL} currentUser={username} friendsList={friendsList} />}

            {/* Mobile overlay for left sidebar */}
            {isMobile && isLeftSidebarVisible && (
                <div style={styles.mobileOverlay} onClick={() => setIsLeftSidebarVisible(false)} />
            )}

            {/* Mobile overlay for right sidebar */}
            {isMobile && isRightSidebarVisible && (
                <div style={styles.mobileOverlay} onClick={() => setIsRightSidebarVisible(false)} />
            )}

            <div style={styles.chatLayout}>
                {(!isMobile || isLeftSidebarVisible) && (
                    <div style={{ ...styles.sidebarWrapper, ...(isMobile && styles.mobileSidebar), paddingTop: mobileWebPadding, paddingBottom: safeAreaBottom, height: '100%', boxSizing: 'border-box' }}>
                        {isMobile && (
                            <div style={styles.mobileSidebarHeader}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <img src="https://media.pawscord.com/assets/logo.png" alt="" style={{ width: '24px', height: '24px' }} onError={(e) => { e.target.style.display = 'none'; }} />
                                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>Pawscord</span>
                                </div>
                                <button onClick={() => setIsLeftSidebarVisible(false)} style={styles.closeSidebarButton}>
                                    <FaTimes />
                                </button>
                            </div>
                        )}
                        <RoomList
                            onFriendsClick={() => setActiveChat('friends', 'friends')}
                            onRoomSelect={handleRoomChange}
                            onDMSelect={(id, targetUsername) => setActiveChat('dm', id, targetUsername)}
                            onWelcomeClick={handleWelcomeClick}
                            setIsLeftSidebarVisible={setIsLeftSidebarVisible}
                            onProfileClick={() => setShowProfilePanel(true)}
                            onViewUserProfile={(username) => {
                                const user = allUsers.find(u => u.username === username);
                                if (user) setViewingProfile(user);
                            }}
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
                            pendingFriendRequests={pendingFriendRequests} // 🔥 YENİ: Bekleyen arkadaşlık istekleri
                            currentUsername={username}
                            currentUserProfile={currentUserProfile} // 🔥 DÜZELTME: Kullanıcının profil verisi
                            getRealUserAvatar={getRealUserAvatar}
                            getDeterministicAvatar={getDeterministicAvatar}
                            unreadCounts={unreadCounts} // 🔥 YENİ: Okunmamış mesaj sayıları
                            joinVoiceChat={joinChannel}
                            leaveVoiceChat={leaveChannel}
                            voiceUsers={voiceUsers}
                            isConnecting={isConnecting}
                            currentVoiceRoom={currentVoiceRoom}
                            currentRoom={currentVoiceRoom} // 🔥 EKLENDI: ScheduledMessageModal için
                            currentConversationId={activeChat.type === 'dm' ? activeChat.id : null} // 🔥 EKLENDI
                            remoteVolumes={remoteVolumes}
                            setRemoteVolume={setRemoteVolume}
                            isPttActive={isPttActive}
                            apiBaseUrl={API_BASE_URL}
                            fetchWithAuth={fetchWithAuth}
                            onHideConversation={handleHideConversation}
                            handleDrop={handleSidebarDrop}
                            dropTarget={dropTarget}
                            setDropTarget={setDropTarget}
                            isDragging={isDragging}
                            onOpenCreateGroup={() => setShowGroupModal(true)}
                            // Voice Controls
                            toggleMute={toggleMute}
                            toggleDeafened={toggleDeafened}
                            isMuted={isMuted}
                            isDeafened={isDeafened}
                            isInVoice={isInVoice}
                            toggleVideo={toggleVideo}
                            toggleScreenShare={toggleScreenShare}
                            isVideoEnabled={isVideoEnabled}
                            isScreenSharing={isScreenSharing}
                            // 🔥 Update System
                            updateAvailable={updateAvailable}
                            onUpdateClick={() => setShowDownloadModal(true)}
                            // 🔥 Analytics System
                            onOpenAnalytics={() => setShowAnalytics(true)}
                            onOpenAdminPanel={() => setShowAdminPanel(true)}
                            // 💰 Payment & Engagement System (2026-01-19)
                            onOpenPaymentPanel={() => setShowPaymentPanel(true)}
                            onOpenStoreModal={() => setShowStoreModal(true)}
                            onOpenDailyRewards={() => setShowDailyRewards(true)}
                            onOpenAPIUsage={() => setShowAPIUsagePanel(true)}
                            onOpenExportJobs={() => setShowExportJobsPanel(true)}
                            onOpenScheduledAnnouncements={() => setShowScheduledAnnouncements(true)}
                            // 🎮 New Features (2026-01-28)
                            onOpenMiniGames={() => setShowMiniGames(true)}
                            onOpenProjectCollaboration={() => setShowProjectCollaboration(true)}
                            onOpenAvatarStudio={() => setShowAvatarStudio(true)}
                            // 🔥 YENİ: Sunucu seçildiğinde sağ panelde üyeleri göster
                            onServerSelect={handleServerSelect}
                        />
                    </div>
                )}

                <div style={styles.mainContent}>
                    {/* ✨ STICKY BANNER */}
                    <div style={{ position: 'absolute', top: 60, left: 0, right: 0, zIndex: 90 }}>
                        <StickyMessageBanner
                            message={stickyMessage?.message}
                            type={stickyMessage?.type}
                            onDismiss={() => setStickyMessage(null)}
                        />
                    </div>
                    {activeChat.type === 'friends' ? (
                        <div style={{ width: '100%', height: '100%', paddingTop: mobileWebPadding }}>
                            <FriendsTab
                                fetchWithAuth={fetchWithAuth}
                                apiBaseUrl={API_BASE_URL}
                                onStartDM={handleDMClick}
                                getDeterministicAvatar={getDeterministicAvatar}
                                onClose={() => setActiveChat('welcome', 'welcome')}
                                onPendingCountChange={setPendingFriendRequests}
                                onlineUsers={onlineUsers} // 🔥 DÜZELTME: Gerçek zamanlı online durumu için
                            />
                        </div>
                    ) : activeChat.type === 'welcome' ? (
                        <div style={{ width: '100%', height: '100%' }}>
                            <WelcomeScreen
                                isMobile={isMobile}
                                onOpenMenu={() => setIsLeftSidebarVisible(true)}
                                onOpenRightMenu={() => setIsRightSidebarVisible(true)}
                                updateAvailable={updateAvailable}
                                isDownloading={isDownloading}
                                downloadProgress={downloadProgress}
                                updateStatusText={updateStatusText}
                                onStartUpdate={handleStartUpdate}
                                onSwitchToFriends={() => {
                                    setActiveChat('friends', 'friends');
                                    if (isMobile) setIsLeftSidebarVisible(false);
                                }}
                                onSwitchToAI={() => {
                                    handleRoomChange('ai');
                                }}
                                onSwitchToCinema={() => {
                                    setShowCinema(true);
                                    if (isMobile) setIsLeftSidebarVisible(false);
                                }}
                            />
                        </div>
                    ) : activeRoomType === 'kanban' ? (
                        <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                            <div style={styles.chatHeader}><h2># {chatTitle} (Pano)</h2></div>
                            <Suspense fallback={<LoadingSpinner size="medium" text="Pano yükleniyor..." />}>
                                <KanbanBoard roomSlug={activeChat.id} apiBaseUrl={API_BASE_URL} fetchWithAuth={fetchWithAuth} />
                            </Suspense>
                        </div>
                    ) : activeChat.type === 'voice' && isInVoice ? (
                        /* 🎤 SESLİ SOHBET FULL-SCREEN PANEL */
                        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#2f3136' }}>
                            <div style={{ ...styles.chatHeader, justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    {isMobile && (
                                        <button
                                            onClick={() => setActiveChat('welcome', 'welcome')}
                                            style={{ ...styles.mobileMenuButton }}
                                        >
                                            ←
                                        </button>
                                    )}
                                    <h2 style={{ margin: 0, fontSize: '1.2em' }}>
                                        🔊 {currentVoiceRoom}
                                    </h2>
                                </div>
                                <button
                                    onClick={() => {
                                        leaveChannel();
                                        setActiveChat('welcome', 'welcome');
                                    }}
                                    style={{
                                        background: '#ed4245',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '8px 16px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Bağlantıyı Kes
                                </button>
                            </div>
                            <VoiceChatPanel
                                roomName={currentVoiceRoom}
                                onClose={() => {
                                    leaveChannel();
                                    setActiveChat('welcome', 'welcome');
                                }}
                                isMinimized={false}
                                onToggleMinimize={() => { }}
                                getRealUserAvatar={getRealUserAvatar}
                                allUsers={allUsers}
                                currentUserProfile={currentUserProfile}
                            />
                        </div>
                    ) : (
                        <div
                            style={{ ...styles.chatArea, position: 'relative', paddingTop: mobileWebPadding, boxSizing: 'border-box' }}
                            onDrop={handleChatDrop}
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={(e) => { e.preventDefault(); if (e.target === e.currentTarget) setIsDragging(false); }}
                        >
                            <div style={{ ...styles.chatHeader, justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', overflow: 'hidden', gap: '8px' }}>
                                    {/* 🔥 MOBİL - Sol Panel Açma Butonu */}
                                    {isMobile && !isLeftSidebarVisible && (
                                        <button onClick={() => setIsLeftSidebarVisible(true)} style={{ ...styles.mobileMenuButton, fontSize: '1.3em' }} aria-label="Menüyü Aç">
                                            ☰
                                        </button>
                                    )}

                                    {/* 🔥 MOBİL - Geri Butonu (DM/Kanal açıkken Welcome'a dön) */}
                                    {isMobile && (activeChat.type === 'dm' || activeChat.type === 'room') && (
                                        <button
                                            onClick={() => {
                                                setActiveChat('welcome', 'welcome');
                                                setIsLeftSidebarVisible(false);
                                                setIsRightSidebarVisible(false);
                                            }}
                                            style={{ ...styles.mobileMenuButton, fontSize: '1.2em' }}
                                            aria-label="Geri"
                                        >
                                            ←
                                        </button>
                                    )}

                                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0, fontSize: isMobile ? '1em' : '1.1em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {activeChat.type === 'dm' ? `@ ${String(activeChat.targetUser || 'DM')}` : `# ${String(chatTitle)}`}
                                    </h2>
                                    <div style={isConnected ? styles.connectionPillOnline : styles.connectionPillOffline}>
                                        {isConnected ? 'Bağlı' : 'Kopuk'}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: isMobile ? '5px' : '10px', alignItems: 'center', flexWrap: isMobile ? 'nowrap' : 'wrap', position: 'relative' }}>
                                    {/* 🔍 Arama */}
                                    <form onSubmit={handleSearchMessages} style={styles.searchForm}>
                                        <input type="text" placeholder="Ara..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={styles.searchInput} ref={searchInputRef} />
                                        <FaSearch style={styles.searchIcon} />
                                    </form>

                                    {/* ⌨️ Yazıyor göstergesi */}
                                    {!isMobile && activeTypingUsers.length > 0 && (
                                        <span style={styles.typingIndicator}>
                                            {activeTypingUsers.join(', ')} yazıyor...
                                        </span>
                                    )}

                                    {/* 🔔 Bildirimler (Her zaman görünür) */}
                                    <button
                                        onClick={() => setShowNotifications(!showNotifications)}
                                        style={{
                                            ...styles.iconButton,
                                            color: showNotifications ? '#5865f2' : '#b9bbbe',
                                            position: 'relative'
                                        }}
                                        title="Bildirimler"
                                    >
                                        <FaBell />
                                    </button>
                                    {showNotifications && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '54px',
                                            right: '20px',
                                            zIndex: 1000
                                        }}>
                                            <Suspense fallback={<LoadingSpinner size="small" text="" />}>
                                                <NotificationDropdown
                                                    currentUser={username}
                                                    onClose={() => setShowNotifications(false)}
                                                    fetchWithAuth={fetchWithAuth}
                                                    apiBaseUrl={API_BASE_URL}
                                                />
                                            </Suspense>
                                        </div>
                                    )}

                                    {/* 🔥 AÇILIR MENÜ BUTONU */}
                                    <div className="toolbar-menu-container" style={{ position: 'relative' }}>
                                        <button
                                            onClick={() => setShowToolbarMenu(!showToolbarMenu)}
                                            style={{
                                                ...styles.iconButton,
                                                color: showToolbarMenu ? '#5865f2' : '#b9bbbe',
                                                fontSize: '1.2em',
                                                fontWeight: 'bold'
                                            }}
                                            title="Daha Fazla"
                                        >
                                            ⋮
                                        </button>

                                        {/* 🔥 AÇILIR MENÜ - TOOLBAR ÖZELLİKLERİ */}
                                        {showToolbarMenu && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '50px',
                                                right: '0',
                                                backgroundColor: '#2f3136',
                                                borderRadius: '8px',
                                                boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
                                                minWidth: '220px',
                                                zIndex: 1000,
                                                overflow: 'hidden',
                                                border: '1px solid #202225'
                                            }}>
                                                {/* 🔐 Şifreleme (Sadece DM'de) */}
                                                {activeChat.type === 'dm' && (
                                                    <button
                                                        onClick={() => {
                                                            setShowEncModal(true);
                                                            setShowToolbarMenu(false);
                                                        }}
                                                        style={{
                                                            ...styles.menuItem,
                                                            color: hasKey ? '#43b581' : '#dcddde'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.backgroundColor = '#5865f2';
                                                            e.currentTarget.style.color = '#ffffff';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.backgroundColor = 'transparent';
                                                            e.currentTarget.style.color = hasKey ? '#43b581' : '#dcddde';
                                                        }}
                                                    >
                                                        {hasKey ? <FaLock /> : <FaLock style={{ opacity: 0.5 }} />}
                                                        <span>{hasKey ? 'Şifreli' : 'Şifrele'}</span>
                                                    </button>
                                                )}

                                                {/* 📌 Sabitli Mesajlar */}
                                                <button
                                                    onClick={() => {
                                                        setShowPinned(!showPinned);
                                                        setShowToolbarMenu(false);
                                                    }}
                                                    style={{
                                                        ...styles.menuItem,
                                                        color: showPinned ? '#f5a524' : '#dcddde'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#5865f2';
                                                        e.currentTarget.style.color = '#ffffff';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = 'transparent';
                                                        e.currentTarget.style.color = showPinned ? '#f5a524' : '#dcddde';
                                                    }}
                                                >
                                                    <FaThumbtack />
                                                    <span>Sabitli Mesajlar</span>
                                                </button>

                                                {/* 🔗 Link Kopyala */}
                                                <button
                                                    onClick={() => {
                                                        handleCopyLink();
                                                        setShowToolbarMenu(false);
                                                    }}
                                                    style={styles.menuItem}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#5865f2';
                                                        e.currentTarget.style.color = '#ffffff';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = 'transparent';
                                                        e.currentTarget.style.color = '#dcddde';
                                                    }}
                                                >
                                                    <FaLink />
                                                    <span>Bağlantıyı Kopyala</span>
                                                </button>

                                                {/* 🔕 Sessize Al */}
                                                <button
                                                    onClick={() => {
                                                        toggleNotifications();
                                                        setShowToolbarMenu(false);
                                                    }}
                                                    style={{
                                                        ...styles.menuItem,
                                                        color: soundSettings.notifications ? '#43b581' : '#f04747'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#5865f2';
                                                        e.currentTarget.style.color = '#ffffff';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = 'transparent';
                                                        e.currentTarget.style.color = soundSettings.notifications ? '#43b581' : '#f04747';
                                                    }}
                                                >
                                                    {soundSettings.notifications ? <FaBell /> : <FaBellSlash />}
                                                    <span>{soundSettings.notifications ? 'Sessize Al' : 'Sesi Aç'}</span>
                                                </button>

                                                <div style={{ height: '1px', backgroundColor: '#40444b', margin: '4px 0' }} />

                                                {/* 🎬 Sinema */}
                                                <button
                                                    onClick={() => {
                                                        setShowCinema(true);
                                                        setShowToolbarMenu(false);
                                                    }}
                                                    style={styles.menuItem}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#5865f2';
                                                        e.currentTarget.style.color = '#ffffff';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = 'transparent';
                                                        e.currentTarget.style.color = '#dcddde';
                                                    }}
                                                >
                                                    <FaFilm />
                                                    <span>Sinema Modu</span>
                                                </button>

                                                {/* 🎵 DJ Modu */}
                                                <button
                                                    onClick={() => {
                                                        setShowDJ(true);
                                                        setShowToolbarMenu(false);
                                                    }}
                                                    style={styles.menuItem}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#5865f2';
                                                        e.currentTarget.style.color = '#ffffff';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = 'transparent';
                                                        e.currentTarget.style.color = '#dcddde';
                                                    }}
                                                >
                                                    <FaCoffee />
                                                    <span>DJ Modu</span>
                                                </button>

                                                {/* 🖍️ Beyaz Tahta */}
                                                <button
                                                    onClick={() => {
                                                        setShowWhiteboard(true);
                                                        setShowToolbarMenu(false);
                                                    }}
                                                    style={styles.menuItem}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#5865f2';
                                                        e.currentTarget.style.color = '#ffffff';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = 'transparent';
                                                        e.currentTarget.style.color = '#dcddde';
                                                    }}
                                                >
                                                    <FaCode />
                                                    <span>Beyaz Tahta</span>
                                                </button>

                                                {/* 🎤 Ses Efektleri */}
                                                {isInVoice && (
                                                    <button
                                                        onClick={() => {
                                                            setShowSoundboard(true);
                                                            setShowToolbarMenu(false);
                                                        }}
                                                        style={styles.menuItem}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.backgroundColor = '#5865f2';
                                                            e.currentTarget.style.color = '#ffffff';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.backgroundColor = 'transparent';
                                                            e.currentTarget.style.color = '#dcddde';
                                                        }}
                                                    >
                                                        <FaMagic />
                                                        <span>Ses Efektleri</span>
                                                    </button>
                                                )}

                                                {/* 📊 Özetle (Oda ise) */}
                                                {activeChat.type === 'room' && (
                                                    <>
                                                        <div style={{ height: '1px', backgroundColor: '#40444b', margin: '4px 0' }} />
                                                        <button
                                                            onClick={() => {
                                                                handleSummarize();
                                                                setShowToolbarMenu(false);
                                                            }}
                                                            style={styles.menuItem}
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.backgroundColor = '#5865f2';
                                                                e.currentTarget.style.color = '#ffffff';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.backgroundColor = 'transparent';
                                                                e.currentTarget.style.color = '#dcddde';
                                                            }}
                                                        >
                                                            <FaMagic />
                                                            <span>Sohbeti Özetle</span>
                                                        </button>

                                                        {/* 🧹 Temizle */}
                                                        <button
                                                            onClick={() => {
                                                                handleClearChat();
                                                                setShowToolbarMenu(false);
                                                            }}
                                                            style={{
                                                                ...styles.menuItem,
                                                                color: '#f04747'
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.backgroundColor = '#f04747';
                                                                e.currentTarget.style.color = '#ffffff';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.backgroundColor = 'transparent';
                                                                e.currentTarget.style.color = '#f04747';
                                                            }}
                                                        >
                                                            <FaBroom />
                                                            <span>Sohbeti Temizle</span>
                                                        </button>

                                                        {/* 🔥 ADMIN: Permanently Delete Conversation (both sides) */}
                                                        {username === 'admin' && activeChat.type === 'dm' && (
                                                            <>
                                                                <div style={{ height: '1px', backgroundColor: '#40444b', margin: '4px 0' }} />
                                                                <button
                                                                    onClick={() => {
                                                                        handleAdminDeleteConversation(activeChat.id);
                                                                        setShowToolbarMenu(false);
                                                                    }}
                                                                    style={{
                                                                        ...styles.menuItem,
                                                                        color: '#ed4245',
                                                                        fontWeight: 'bold'
                                                                    }}
                                                                    onMouseEnter={(e) => {
                                                                        e.currentTarget.style.backgroundColor = '#ed4245';
                                                                        e.currentTarget.style.color = '#ffffff';
                                                                    }}
                                                                    onMouseLeave={(e) => {
                                                                        e.currentTarget.style.backgroundColor = 'transparent';
                                                                        e.currentTarget.style.color = '#ed4245';
                                                                    }}
                                                                    title="Admin: Konuşmayı kalıcı olarak sil (her iki taraftan)"
                                                                >
                                                                    <FaTrash />
                                                                    <span>⚠️ KALICI SİL (ADMİN)</span>
                                                                </button>
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* 🔥 MOBİL - Sağ Panel Açma Butonu (Kullanıcı Listesi) */}
                                    {isMobile && !isRightSidebarVisible && (
                                        <button onClick={() => setIsRightSidebarVisible(true)} style={{ ...styles.mobileMenuButton, fontSize: '1.3em' }} aria-label="Kullanıcıları Göster">
                                            <FaUsers />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* ⚡ VIRTUAL MESSAGE LIST - 10x Performance Boost */}
                            <div style={styles.messageBox} ref={messageBoxRef} onScroll={throttledHandleMessageScroll}>
                                {messageHistoryLoading ? (
                                    <p style={styles.systemMessage}>Yükleniyor...</p>
                                ) : optimizedMessages.length > 50 ? (
                                    // Virtual scrolling for 50+ messages
                                    <VirtualMessageList
                                        messages={optimizedMessages}
                                        scrollToBottom={true}
                                        renderMessage={(msg, index) => (
                                            <Message
                                                key={msg.id || msg.temp_id || index}
                                                msg={msg}
                                                currentUser={username}
                                                absoluteHostUrl={ABSOLUTE_HOST_URL}
                                                isAdmin={isAdmin}
                                                onImageClick={setZoomedImage}
                                                fetchWithAuth={fetchWithAuth}
                                                allUsers={allUsers}
                                                getDeterministicAvatar={getDeterministicAvatar}
                                                onShowChart={setChartSymbol}
                                                onDelete={handleDeleteMessage}
                                                onStartEdit={setEditingMessage}
                                                onSetReply={setReplyingTo}
                                                onToggleReaction={() => { }}
                                                onStartForward={setForwardingMessage}
                                                isSelectionMode={isSelectionMode}
                                                isSelected={selectedMessages.has(msg.id)}
                                                onToggleSelection={(id) => {
                                                    const newSet = new Set(selectedMessages);
                                                    if (newSet.has(id)) newSet.delete(id); else newSet.add(id);
                                                    setSelectedMessages(newSet);
                                                }}
                                                onScrollToMessage={scrollToMessage}
                                                onViewProfile={(u) => setViewingProfile(allUsers.find(usr => usr.username === u))}
                                                onTogglePin={(id) => { /* pin fonksiyonun */ }}
                                            />
                                        )}
                                    />
                                ) : (
                                    // Standard rendering for <50 messages
                                    <>
                                        {optimizedMessages.map((msg, index) => {
                                            const key = msg.id || msg.temp_id || index;
                                            return (
                                                <Message
                                                    key={key}
                                                    msg={msg}
                                                    currentUser={username}
                                                    absoluteHostUrl={ABSOLUTE_HOST_URL}
                                                    isAdmin={isAdmin}
                                                    onImageClick={setZoomedImage}
                                                    fetchWithAuth={fetchWithAuth}
                                                    allUsers={allUsers}
                                                    getDeterministicAvatar={getDeterministicAvatar}
                                                    onShowChart={setChartSymbol}
                                                    onDelete={handleDeleteMessage}
                                                    onStartEdit={setEditingMessage}
                                                    onSetReply={setReplyingTo}
                                                    onToggleReaction={() => { }}
                                                    onStartForward={setForwardingMessage}
                                                    isSelectionMode={isSelectionMode}
                                                    isSelected={selectedMessages.has(msg.id)}
                                                    onToggleSelection={(id) => {
                                                        const newSet = new Set(selectedMessages);
                                                        if (newSet.has(id)) newSet.delete(id); else newSet.add(id);
                                                        setSelectedMessages(newSet);
                                                    }}
                                                    onScrollToMessage={scrollToMessage}
                                                    onViewProfile={(u) => setViewingProfile(allUsers.find(usr => usr.username === u))}
                                                    onTogglePin={(id) => { /* pin fonksiyonun */ }}
                                                />
                                            );
                                        })}
                                        <div ref={messagesEndRef} style={{ float: "left", clear: "both", height: 1 }} />
                                    </>
                                )}
                            </div>

                            {showScrollToBottom && (
                                <button
                                    type="button"
                                    style={styles.scrollToBottomButton}
                                    onClick={() => { scrollToBottom('smooth'); setShowScrollToBottom(false); }}
                                    aria-label="En alta in"
                                >
                                    En alta in
                                </button>
                            )}
                            <div style={{ ...styles.inputContainer, paddingBottom: isNative ? `calc(16px + ${safeAreaBottom})` : (isMobile ? '25px' : '16px') }}>
                                {isDragging && (
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: 'rgba(88, 101, 242, 0.2)',
                                        border: '2px dashed #5865f2',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        pointerEvents: 'none',
                                        zIndex: 1000
                                    }}>
                                        <div style={{ color: '#5865f2', fontSize: '1.2em', fontWeight: 'bold' }}>
                                            📁 Dosyayı buraya bırakın
                                        </div>
                                    </div>
                                )}
                                {/* 📊 Upload Progress Bar */}
                                {isUploading && uploadProgress > 0 && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '-40px',
                                        left: '16px',
                                        right: '16px',
                                        backgroundColor: '#2b2d31',
                                        borderRadius: '8px',
                                        padding: '8px 12px',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                                        zIndex: 1001
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ color: '#b9bbbe', fontSize: '12px', whiteSpace: 'nowrap' }}>
                                                📤 Yükleniyor: {uploadProgress}%
                                            </span>
                                            <div style={{ flex: 1, height: '6px', backgroundColor: '#40444b', borderRadius: '3px', overflow: 'hidden' }}>
                                                <div style={{
                                                    width: `${uploadProgress}%`,
                                                    height: '100%',
                                                    backgroundColor: '#5865f2',
                                                    borderRadius: '3px',
                                                    transition: 'width 0.3s ease'
                                                }} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/* ✨ Modern MessageInput Component */}
                                <MessageInput
                                    onSendMessage={sendMessage}
                                    onFileUpload={uploadFile}
                                    onShowCodeSnippet={() => setShowSnippetModal(true)}
                                    placeholder={chatTitle
                                        ? `${activeChat.type === 'dm' ? chatTitle : `# ${chatTitle}`} kanalına mesaj gönder`
                                        : 'Mesaj yaz...'}
                                    disabled={isUploading}
                                    fetchWithAuth={fetchWithAuth}
                                    apiBaseUrl={API_BASE_URL}
                                    activeChat={activeChat}
                                />
                            </div>

                        </div>
                    )}
                    {/* 🔥 SAĞ PANEL - HER ZAMAN AÇIK (Arkadaşlar tab'ı hariç, çünkü orada FriendsTab kendi içeriğini gösteriyor) */}
                    {(!isMobile || isRightSidebarVisible) && (
                        <div style={{ ...styles.chatUserListPanel, ...(isMobile ? styles.mobileRightSidebar : {}), paddingTop: mobileWebPadding }}>
                            {isMobile && (
                                <div style={styles.mobileSidebarHeader}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <FaUsers size={18} color="#b9bbbe" />
                                        <span style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>
                                            {activeChat.type === 'room' ? 'Sunucu Üyeleri' : activeChat.type === 'friends' ? 'Çevrimiçi' : 'Arkadaşlar'}
                                        </span>
                                    </div>
                                    <button onClick={() => setIsRightSidebarVisible(false)} style={styles.closeSidebarButton}>
                                        <FaTimes />
                                    </button>
                                </div>
                            )}
                            <Suspense fallback={<LoadingSpinner size="small" text="Kullanıcılar yükleniyor..." />}>
                                <ChatUserList
                                    chatUsers={[]}
                                    allUsers={allUsers}
                                    onlineUsers={onlineUsers}
                                    currentUser={username}
                                    getDeterministicAvatar={getDeterministicAvatar}
                                    onUserClick={(u) => {
                                        // Önce allUsers'da ara, yoksa serverMembers'dan al
                                        let user = allUsers.find(usr => usr.username === u);
                                        if (!user && serverMembers.length > 0) {
                                            const member = serverMembers.find(m => m.username === u);
                                            if (member) {
                                                user = {
                                                    username: member.username,
                                                    display_name: member.username,
                                                    avatar: getDeterministicAvatar(member.username),
                                                    role: member.role || 'member'
                                                };
                                            }
                                        }
                                        if (user) setViewingProfile(user);
                                    }}
                                    onUserContextMenu={(e, targetUsername) => {
                                        if (targetUsername === username) return; // Kendine sağ tıklama yok
                                        const targetUser = allUsers.find(u => u.username === targetUsername);
                                        if (!targetUser) return;
                                        setUserContextMenu({
                                            x: e.clientX,
                                            y: e.clientY,
                                            user: targetUser,
                                            permissions: currentUserPermissions
                                        });
                                    }}
                                    activeChat={activeChat}
                                    serverMembers={serverMembers}
                                    friendsList={friendsList}
                                    onNavigate={navigateToPath}
                                />
                            </Suspense>
                        </div>
                    )}
                </div>
                {/* 🔊 SES KONTROLCÜSÜ - ALWAYS ACTIVE when in voice (UNMOUNT EDILMEMELI) */}
                {isInVoice && (
                    <VoiceAudioController
                        remoteStreams={remoteStreams}
                        remoteVolumes={remoteVolumes}
                        mutedUsers={mutedUsers}
                    />
                )}

                {/* 🔥 RESTORE PANEL BUTTON (when hidden) - SADECE VOICE FULL-SCREEN DEĞİLKEN */}
                {isInVoice && !showVoiceIsland && activeChat.type !== 'voice' && (
                    <button
                        onClick={() => setShowVoiceIsland(true)}
                        style={{
                            position: 'fixed',
                            bottom: '20px',
                            right: '20px',
                            zIndex: 9998,
                            background: '#5865f2',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '60px',
                            height: '60px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: '24px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                            transition: 'all 0.2s'
                        }}
                        title="Ses Panelini Aç"
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        🎤
                    </button>
                )}

                {/* 🎤 FLOATING VOICE ISLAND - SADECE VOICE FULL-SCREEN MODDA DEĞİLKEN */}
                {
                    isInVoice && showVoiceIsland && activeChat.type !== 'voice' && (
                        <>
                            {useNewVoicePanel ? (
                                /* 🆕 YENİ PROFESYONEL PANEL */
                                <VoiceChatPanel
                                    roomName={currentVoiceRoom}
                                    onClose={() => {
                                        setShowVoiceIsland(false);
                                    }}
                                    isMinimized={isVoicePanelMinimized}
                                    onToggleMinimize={() => setIsVoicePanelMinimized(!isVoicePanelMinimized)}
                                    getRealUserAvatar={getRealUserAvatar}
                                    allUsers={allUsers}
                                    currentUserProfile={currentUserProfile}
                                />
                            ) : (
                                /* ⚙️ ESKİ FLOATING ISLAND */
                                <Suspense fallback={<LoadingSpinner size="small" text="Sesli sohbet yükleniyor..." />}>
                                    <FloatingVoiceIsland
                                        islandState={islandState}
                                        onDrag={(d) => setIslandState(p => ({ ...p, x: d.x, y: d.y }))}
                                        onResize={(size) => setIslandState(p => ({ ...p, width: size.width, height: size.height }))}
                                        isMobile={isMobile}
                                        headerActions={
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                                {/* 🔥 MINIMIZE BUTTON (Hide Island) */}
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        console.log('🎛️ [VoiceIsland] Hiding panel');
                                                        setShowVoiceIsland(false);
                                                    }}
                                                    style={{
                                                        background: 'rgba(255,255,255,0.1)',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        padding: '8px',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '16px',
                                                        transition: 'all 0.2s'
                                                    }}
                                                    title="Paneli Gizle"
                                                >
                                                    <FaTimes />
                                                </button>

                                                <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }} />

                                                {/* 🎤 MİKROFON BUTONU */}
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        console.log('🎤 [VoiceIsland] Mute toggle clicked');
                                                        toggleMute();
                                                    }}
                                                    style={{
                                                        background: isMuted ? '#ed4245' : '#23a559',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        padding: '8px',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '16px',
                                                        transition: 'all 0.2s'
                                                    }}
                                                    title={isMuted ? "Mikrofonu Aç" : "Mikrofonu Kapat"}
                                                >
                                                    <FaMicrophone style={{ opacity: isMuted ? 0.5 : 1 }} />
                                                </button>

                                                {/* 🎧 KULAKLIK BUTONU */}
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        console.log('🎧 [VoiceIsland] Deafen toggle clicked');
                                                        toggleDeafened();
                                                    }}
                                                    style={{
                                                        background: isDeafened ? '#ed4245' : '#23a559',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        padding: '8px',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '16px',
                                                        transition: 'all 0.2s'
                                                    }}
                                                    title={isDeafened ? "Sesi Aç" : "Sesi Kapat"}
                                                >
                                                    <FaHeadphones style={{ opacity: isDeafened ? 0.5 : 1 }} />
                                                </button>

                                                {/* 📹 VİDEO BUTONU */}
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        console.log('📹 [VoiceIsland] Video toggle clicked');
                                                        toggleVideo();
                                                    }}
                                                    style={{
                                                        background: isVideoEnabled ? '#5865f2' : 'rgba(255,255,255,0.1)',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        padding: '8px',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '16px',
                                                        transition: 'all 0.2s'
                                                    }}
                                                    title={isVideoEnabled ? "Kamerayı Kapat" : "Kamerayı Aç"}
                                                >
                                                    <FaVideo style={{ opacity: isVideoEnabled ? 1 : 0.5 }} />
                                                </button>

                                                {/* 🖥️ EKRAN PAYLAŞIMI BUTONU */}
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        console.log('🖥️ [VoiceIsland] Screen share toggle clicked');
                                                        toggleScreenShare();
                                                    }}
                                                    style={{
                                                        background: isScreenSharing ? '#5865f2' : 'rgba(255,255,255,0.1)',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        padding: '8px',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '16px',
                                                        transition: 'all 0.2s'
                                                    }}
                                                    title={isScreenSharing ? "Ekran Paylaşımını Durdur" : "Ekranı Paylaş"}
                                                >
                                                    <FaDesktop style={{ opacity: isScreenSharing ? 1 : 0.5 }} />
                                                </button>

                                                <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }} />

                                                {/* Disconnect Button */}
                                                <button
                                                    onClick={leaveChannel}
                                                    style={{
                                                        background: '#ed4245', // Error Red
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        padding: '8px',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '16px'
                                                    }}
                                                    title="Odadan Ayrıl"
                                                >
                                                    <FaPhoneSlash />
                                                </button>
                                                <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }} />

                                                {/* Cinema Toggle */}
                                                <button
                                                    onClick={() => setCinemaState(p => ({ ...p, isActive: !p.isActive }))}
                                                    style={{
                                                        background: cinemaState.isActive ? '#5865f2' : 'rgba(255,255,255,0.1)',
                                                        color: 'white', border: 'none', borderRadius: '4px',
                                                        padding: '4px 8px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold'
                                                    }}
                                                >
                                                    {cinemaState.isActive ? '🎬 Kapat' : '🍿 Sinema'}
                                                </button>

                                                <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }} />

                                                {/* Voice Changer Dropdown */}
                                                <select
                                                    onChange={(e) => applyVoiceEffect(e.target.value)}
                                                    value={activeEffect}
                                                    style={{
                                                        background: 'rgba(0,0,0,0.3)',
                                                        color: 'white',
                                                        border: '1px solid rgba(255,255,255,0.1)',
                                                        borderRadius: '4px',
                                                        padding: '2px 4px',
                                                        fontSize: '12px',
                                                        cursor: 'pointer',
                                                        outline: 'none'
                                                    }}
                                                >
                                                    <option value="none">Normal</option>
                                                    <option value="robot">🤖 Robot</option>
                                                    <option value="child">👶 Bebek</option>
                                                    <option value="monster">👹 Canavar</option>
                                                </select>

                                                <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }} />

                                                {/* 🔥 GAME BUTTONS */}
                                                <div style={{ display: 'flex', gap: '5px' }}>
                                                    <button
                                                        onClick={() => sendGameSignal('reset')}
                                                        title="Reset Game"
                                                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px' }}
                                                    >
                                                        🔄
                                                    </button>
                                                    {['🪨', '📄', '✂️'].map((move, i) => {
                                                        const moveKey = i === 0 ? 'rock' : i === 1 ? 'paper' : 'scissors';
                                                        return (
                                                            <button
                                                                key={move}
                                                                onClick={() => sendGameSignal('move', moveKey)}
                                                                style={{
                                                                    background: gameState?.moves?.[username] === moveKey ? 'rgba(88, 101, 242, 0.5)' : 'transparent',
                                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                                    borderRadius: '50%',
                                                                    cursor: 'pointer',
                                                                    fontSize: '16px',
                                                                    width: '28px', height: '28px',
                                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                    transition: 'all 0.1s'
                                                                }}
                                                                title={`Play ${moveKey}`}
                                                            >
                                                                {move}
                                                            </button>
                                                        );
                                                    })}
                                                </div>

                                                <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }} />

                                                <div style={{ display: 'flex', gap: '5px' }}>
                                                    {['❤️', '😂', '😮', '👍', '🎉'].map(emoji => (
                                                        <button
                                                            key={emoji}
                                                            onClick={() => sendReaction(emoji)}
                                                            style={{
                                                                background: 'transparent',
                                                                border: 'none',
                                                                cursor: 'pointer',
                                                                fontSize: '16px',
                                                                padding: '0 4px',
                                                                transition: 'transform 0.1s'
                                                            }}
                                                            onMouseEnter={e => e.target.style.transform = 'scale(1.2)'}
                                                            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                                                            title={`Send ${emoji}`}
                                                        >
                                                            {emoji}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        }
                                    >
                                        {/* 🔥 CINEMA MODE vs GRID MODE */}
                                        {cinemaState.isActive ? (
                                            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                                {/* TOP: CINEMA PLAYER */}
                                                <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
                                                    <Suspense fallback={<LoadingSpinner size="large" text="Cinema Player yükleniyor..." fullscreen />}>
                                                        <CinemaPlayer />
                                                    </Suspense>
                                                </div>

                                                {/* BOTTOM: MINI USER STRIP */}
                                                <div style={{ height: '140px', display: 'flex', gap: '8px', padding: '10px', overflowX: 'auto', background: 'rgba(0,0,0,0.5)', flexShrink: 0, alignItems: 'center' }}>
                                                    {(() => {
                                                        const allStreams = [];
                                                        // Local
                                                        allStreams.push({
                                                            id: 'local-cam',
                                                            user: { username, is_talking: isTalking, is_mic_off: isMuted, is_deafened: isDeafened },
                                                            track: localCameraStream?.getVideoTracks()[0] || null,
                                                            streamType: 'camera', isLocal: true, avatarUrl: getRealUserAvatar(username)
                                                        });
                                                        if (localScreenStream) allStreams.push({ id: 'local-screen', user: { username }, track: localScreenStream.getVideoTracks()[0], streamType: 'screen', isLocal: true, avatarUrl: getRealUserAvatar(username) });
                                                        // Remote
                                                        Object.entries(remoteStreams || {}).forEach(([u, s]) => {
                                                            const videoTracks = s.getVideoTracks();
                                                            const audioTracks = s.getAudioTracks();

                                                            if (videoTracks.length > 0) {
                                                                videoTracks.forEach(t => allStreams.push({ id: `${u}-${t.id}`, user: { username: u }, track: t, streamType: 'camera', isLocal: false, avatarUrl: getRealUserAvatar(u) }));
                                                            } else if (audioTracks.length > 0) {
                                                                // Audio only user
                                                                allStreams.push({ id: `${u}-audio`, user: { username: u }, track: audioTracks[0], streamType: 'camera', isLocal: false, avatarUrl: getRealUserAvatar(u) });
                                                            }
                                                        });

                                                        return allStreams.map(stream => (
                                                            <UserVideoContainer
                                                                key={stream.id}
                                                                {...stream}
                                                                style={{ height: '100%', aspectRatio: '16/9', minWidth: '160px' }}
                                                                lastReaction={lastReaction}
                                                                gameMove={gameState?.moves?.[stream.user.username]} // 🔥 Game Move
                                                            />
                                                        ));
                                                    })()}
                                                </div>
                                            </div>
                                        ) : (
                                            /* 🔥 NORMAL GRID / FOCUS MODE */
                                            <div style={{ ...styles.videoGrid, flexDirection: focusedStream ? 'column' : 'row', flexWrap: focusedStream ? 'nowrap' : 'wrap', overflowY: 'auto', height: '100%' }}>
                                                {(() => {
                                                    // 1. Tüm streamleri topla
                                                    const allStreams = [];

                                                    // Local Camera (or Avatar)
                                                    allStreams.push({
                                                        id: 'local-cam',
                                                        user: { username, is_talking: isTalking, is_mic_off: isMuted, is_deafened: isDeafened },
                                                        track: localCameraStream?.getVideoTracks()[0] || null,
                                                        streamType: 'camera',
                                                        isLocal: true,
                                                        avatarUrl: getRealUserAvatar(username)
                                                    });

                                                    // Local Screen
                                                    if (localScreenStream?.getVideoTracks()[0]) {
                                                        allStreams.push({
                                                            id: 'local-screen',
                                                            user: { username, is_talking: false },
                                                            track: localScreenStream.getVideoTracks()[0],
                                                            streamType: 'screen',
                                                            isLocal: true,
                                                            avatarUrl: getRealUserAvatar(username)
                                                        });
                                                    }

                                                    // Remote Streams
                                                    Object.entries(remoteStreams || {}).forEach(([uName, stream]) => {
                                                        if (uName !== username) {
                                                            const videoTracks = stream.getVideoTracks();
                                                            const audioTracks = stream.getAudioTracks();

                                                            if (videoTracks.length > 0) {
                                                                videoTracks.forEach((track) => {
                                                                    allStreams.push({
                                                                        id: `${uName}-${track.id}`,
                                                                        user: { username: uName },
                                                                        track: track,
                                                                        streamType: track.label?.toLowerCase().includes('screen') ? 'screen' : 'camera',
                                                                        isLocal: false,
                                                                        avatarUrl: getRealUserAvatar(uName)
                                                                    });
                                                                });
                                                            } else if (audioTracks.length > 0) {
                                                                // Audio only - Show Avatar
                                                                allStreams.push({
                                                                    id: `${uName}-audio`,
                                                                    user: { username: uName },
                                                                    track: audioTracks[0], // Pass audio track (UserVideoContainer handles it as non-video -> avatar)
                                                                    streamType: 'camera',
                                                                    isLocal: false,
                                                                    avatarUrl: getRealUserAvatar(uName)
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // 2. Focused Stream Logic
                                                    if (focusedStream) {
                                                        // Bulunan stream hala aktif mi kontrol et
                                                        const activeFocused = allStreams.find(s => s.id === focusedStream);

                                                        if (!activeFocused) {
                                                            setFocusedStream(null); // Akış gittiyse focus'tan çık
                                                            return renderGrid(allStreams); // Fallback to grid
                                                        }

                                                        const others = allStreams.filter(s => s.id !== focusedStream);

                                                        return (
                                                            <>
                                                                {/* MAIN FOCUSED PLAYER */}
                                                                <div style={{ flex: 1, width: '100%', minHeight: '300px', padding: '0', overflow: 'hidden', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
                                                                    <UserVideoContainer
                                                                        {...activeFocused}
                                                                        style={{
                                                                            width: '100%',
                                                                            height: '100%',
                                                                            maxWidth: '100%',
                                                                            borderRadius: '0',
                                                                            maxHeight: '100%',
                                                                            margin: '0 auto',
                                                                            aspectRatio: 'unset' // 🔥 Explicitly override default
                                                                        }}
                                                                        onClick={() => setFocusedStream(null)} // Click to Unfocus
                                                                        lastReaction={lastReaction} // 🔥 Pass logic
                                                                        gameMove={gameState?.moves?.[activeFocused.user?.username]} // 🔥 Game Move
                                                                    />
                                                                </div>

                                                                {/* BOTTOM STRIP */}
                                                                <div style={{ height: '120px', display: 'flex', gap: '8px', padding: '10px', overflowX: 'auto', flexShrink: 0, justifyContent: 'center' }}>
                                                                    {others.map(stream => (
                                                                        <UserVideoContainer
                                                                            key={stream.id}
                                                                            {...stream}
                                                                            style={{ width: '180px', height: '100%', flexShrink: 0, aspectRatio: '16/9' }}
                                                                            onClick={() => setFocusedStream(stream.id)} // Switch focus
                                                                            lastReaction={lastReaction} // 🔥 Pass logic
                                                                            gameMove={gameState?.moves?.[stream.user.username]} // 🔥 Game Move
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </>
                                                        );

                                                    } else {
                                                        // 3. Normal Grid Mode
                                                        return renderGrid(allStreams);
                                                    }

                                                    function renderGrid(streams) {
                                                        return streams.map(stream => (
                                                            <UserVideoContainer
                                                                key={stream.id}
                                                                {...stream}
                                                                style={{ width: '240px', maxWidth: '100%', flexGrow: 1, height: 'auto' }} // Büyütülmüş varsayılan boyut
                                                                onClick={() => setFocusedStream(stream.id)} // Click to Focus
                                                                lastReaction={lastReaction} // 🔥 Pass logic
                                                                gameMove={gameState?.moves?.[stream.user.username]} // 🔥 Game Move
                                                            />
                                                        ));
                                                    }

                                                })()}
                                            </div>
                                        )}
                                    </FloatingVoiceIsland>
                                </Suspense>
                            )}
                        </>
                    )}
                {/* ✨ THEME STORE MODAL */}
                {showThemeStore && (
                    <Suspense fallback={<LoadingSpinner size="medium" text="Temalar yükleniyor..." />}>
                        <ThemeStoreModal
                            onClose={() => setShowThemeStore(false)}
                            currentTheme={currentTheme}
                            onThemeChange={setCurrentTheme}
                        />
                    </Suspense>
                )}

                {showSummary && (
                    <Suspense fallback={<LoadingSpinner size="medium" text="Özet hazırlanıyor..." />}>
                        <SummaryModal
                            roomSlug={activeChat.id}
                            onClose={() => setShowSummary(false)}
                            fetchWithAuth={fetchWithAuth}
                            apiBaseUrl={API_BASE_URL}
                        />
                    </Suspense>
                )}

                {showTemplateModal && (
                    <Suspense fallback={<LoadingSpinner size="small" text="Şablonlar yükleniyor..." />}>
                        <MessageTemplateModal
                            onClose={() => setShowTemplateModal(false)}
                            onSelect={(content) => {
                                richTextRef.current?.appendText?.(content);
                                setShowTemplateModal(false);
                            }}
                            fetchWithAuth={fetchWithAuth}
                            apiBaseUrl={API_BASE_URL}
                            isAdmin={isAdmin}
                        />
                    </Suspense>
                )}
            </div >

            {/* 🔥 USER CONTEXT MENU */}
            {
                userContextMenu && (
                    <UserContextMenu
                        x={userContextMenu.x}
                        y={userContextMenu.y}
                        user={userContextMenu.user}
                        currentUser={username}
                        onClose={() => setUserContextMenu(null)}
                        onAction={handleUserContextAction}
                        voiceChannels={categories.flatMap(server =>
                            (server.categories || []).flatMap(category =>
                                (category.rooms || []).filter(room => room.is_voice)
                            )
                        )}
                        isAdmin={isAdmin}
                        isInVoiceRoom={isInVoice}
                        friendsList={friendsList}
                    />
                )
            }

            {/* 🎫 SUNUCUYA DAVET MODAL - Sağ Panel için */}
            {inviteToServerUser && ReactDOM.createPortal(
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.85)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 999999
                    }}
                    onClick={() => setInviteToServerUser(null)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            backgroundColor: '#2b2d31',
                            borderRadius: '12px',
                            width: '400px',
                            maxHeight: '80vh',
                            overflow: 'hidden',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '20px',
                            borderBottom: '1px solid #3f4147',
                            textAlign: 'center'
                        }}>
                            <h2 style={{ color: '#f2f3f5', margin: 0, fontSize: '18px' }}>
                                🎫 Sunucuya Davet Et
                            </h2>
                            <p style={{ color: '#b9bbbe', margin: '8px 0 0', fontSize: '14px' }}>
                                <strong>{inviteToServerUser.username}</strong> kullanıcısını hangi sunucuya davet etmek istiyorsunuz?
                            </p>
                        </div>

                        {/* Server List */}
                        <div style={{
                            maxHeight: '300px',
                            overflowY: 'auto',
                            padding: '12px'
                        }}>
                            {categories.map(server => (
                                <div
                                    key={server.id}
                                    onClick={async () => {
                                        try {
                                            const res = await fetchWithAuth(`${API_BASE_URL}/servers/${server.id}/invite/`, {
                                                method: 'POST',
                                                body: JSON.stringify({ target_username: inviteToServerUser.username })
                                            });
                                            if (res.ok) {
                                                toast.success(`🎫 ${inviteToServerUser.username} kullanıcısına davetiye gönderildi!`);
                                            } else {
                                                const data = await res.json();
                                                // Zaten üye ise özel mesaj
                                                if (data.error && data.error.includes('zaten')) {
                                                    toast.info(`ℹ️ ${inviteToServerUser.username} zaten bu sunucunun üyesi!`);
                                                } else {
                                                    toast.error(`❌ ${data.error || 'Davet gönderilemedi'}`);
                                                }
                                            }
                                        } catch (error) {
                                            console.error('❌ Invite error:', error);
                                            toast.error('❌ Bağlantı hatası');
                                        }
                                        setInviteToServerUser(null);
                                    }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        backgroundColor: 'rgba(255,255,255,0.02)',
                                        marginBottom: '8px'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(88, 101, 242, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)';
                                    }}
                                >
                                    {server.icon ? (
                                        <img
                                            src={server.icon}
                                            alt={server.name}
                                            style={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: '50%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    ) : (
                                        <div style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: '50%',
                                            backgroundColor: '#5865f2',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            color: 'white',
                                            fontSize: '16px'
                                        }}>
                                            {server.name?.substring(0, 2).toUpperCase()}
                                        </div>
                                    )}
                                    <div style={{ flex: 1 }}>
                                        <div style={{ color: '#f2f3f5', fontWeight: '600' }}>
                                            {server.name}
                                        </div>
                                        <div style={{ color: '#b9bbbe', fontSize: '12px' }}>
                                            {server.member_count || server.categories?.length || 0} üye
                                        </div>
                                    </div>
                                    <div style={{ color: '#5865f2', fontSize: '20px' }}>→</div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div style={{
                            padding: '16px 20px',
                            borderTop: '1px solid #3f4147',
                            textAlign: 'center'
                        }}>
                            <button
                                onClick={() => setInviteToServerUser(null)}
                                style={{
                                    backgroundColor: '#4f545c',
                                    color: '#f2f3f5',
                                    border: 'none',
                                    padding: '10px 24px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontWeight: '600'
                                }}
                            >
                                İptal
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div >
    );
};









// --- STİLLER ---
const styles = {
    // ✨ GLASSMORPHISM - ANA PENCERE
    mainContainer: {
        display: 'flex',
        width: '100%',
        height: '100dvh',
        backgroundColor: '#1E1F22', // Deep dark base
        backgroundImage: 'radial-gradient(circle at 50% 10%, rgba(88, 101, 242, 0.05) 0%, transparent 40%)', // Subtle glow
        color: 'white',
        overflow: 'hidden',
        fontFamily: "'Inter', sans-serif"
    },

    // 2. YERLEŞİM DÜZENİ
    chatLayout: {
        display: 'flex',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    },

    // 3. SOL MENÜ (Sidebar)
    sidebarWrapper: {
        width: '312px',
        backgroundColor: 'rgba(30, 31, 34, 0.6)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'row',
        flexShrink: 0,
        height: '100%',
        borderRight: '1px solid rgba(255,255,255,0.05)'
    },

    // 4. SAĞ TARAFTAKİ ANA İÇERİK
    mainContent: {
        flex: 1,
        display: 'flex',
        minWidth: 0,
        position: 'relative',
        height: '100%',
        overflow: 'hidden'
    },

    // 5. CHAT ALANI (Başlık + Mesajlar + Input)
    chatArea: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        minWidth: 0,
        height: '100%',
        overflow: 'hidden',
        position: 'relative'
    },

    chatHeader: {
        height: '54px',
        minHeight: '54px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        flexShrink: 0,
        backgroundColor: 'rgba(20, 21, 24, 0.7)',
        backdropFilter: 'blur(15px)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        zIndex: 10
    },

    // 🔥 DÜZELTİLEN MESAJ KUTUSU
    messageBox: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        scrollBehavior: 'smooth',
        minHeight: 0
    },

    // 7. INPUT ALANI (En altta sabit)
    inputContainer: {
        padding: '0 20px 24px 20px',
        backgroundColor: 'transparent',
        position: 'relative',
        flexShrink: 0,
        minHeight: 'auto',
        zIndex: 20
    },

    inputForm: {
        display: 'flex',
        backgroundColor: 'rgba(56, 58, 64, 0.5)',
        borderRadius: '12px', // Yuvarlatılmış köşeler
        padding: '12px',
        alignItems: 'flex-end',
        gap: '12px',
        maxHeight: '400px',
        overflowY: 'auto',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    },

    // ... Diğer stiller (Modernize)
    chatUserListPanel: {
        width: '240px',
        backgroundColor: 'rgba(30, 31, 34, 0.6)',
        borderLeft: '1px solid rgba(255,255,255,0.08)',
        flexShrink: 0,
        height: '100%',
        backdropFilter: 'blur(10px)'
    },
    mobileSidebar: { position: 'fixed', zIndex: 100, top: 0, bottom: 0, left: 0, width: '85vw', maxWidth: '350px', boxShadow: '5px 0 15px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column' },
    mobileRightSidebar: { position: 'fixed', zIndex: 100, top: 0, bottom: 0, right: 0, width: '85vw', maxWidth: '300px', boxShadow: '-5px 0 15px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column' },

    // 🔥 MOBİL OVERLAY - Sidebar açıldığında arka planı karartır ve tıklanabilir yapar
    mobileOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 99, // Sidebar'ın altında
        backdropFilter: 'blur(3px)'
    },

    mobileMenuButton: { background: 'none', border: 'none', color: 'white', fontSize: '1.5em', marginRight: '10px', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center', transition: 'all 0.2s' },

    iconButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        fontSize: '1.3em',
        cursor: 'pointer',
        padding: '6px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '50%',
        transition: 'all 0.2s',
        ':hover': { backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff' }
    },
    micButton: { background: 'none', border: 'none', color: '#b9bbbe', fontSize: '1.3em', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center', transition: 'color 0.2s' },
    sendButton: {
        backgroundColor: '#5865f2',
        border: 'none',
        color: '#ffffff',
        fontSize: '1.3em',
        cursor: 'pointer',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '8px',
        transition: 'all 0.2s',
        boxShadow: '0 2px 5px rgba(88, 101, 242, 0.4)'
    },

    videoGrid: { display: 'flex', flexWrap: 'wrap', gap: '5px', padding: '5px', alignContent: 'center', justifyContent: 'center', alignItems: 'center' },
    systemMessage: { color: '#949ba4', textAlign: 'center', fontSize: '0.85em', margin: '10px 0', fontStyle: 'italic' },

    searchForm: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: '4px',
        padding: '0 8px',
        height: '32px',
        marginRight: '8px',
        border: '1px solid rgba(255,255,255,0.05)'
    },
    searchInput: { backgroundColor: 'transparent', border: 'none', color: '#dcddde', fontSize: '0.9em', width: '140px', outline: 'none' },
    searchIcon: { color: '#949ba4', fontSize: '0.8em', cursor: 'pointer' },
    typingIndicator: { color: '#dbdee1', fontSize: '0.85em', maxWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 'bold' },

    connectionPillOnline: { marginLeft: '10px', padding: '4px 8px', borderRadius: '999px', backgroundColor: 'rgba(59, 165, 93, 0.2)', border: '1px solid #3ba55d', color: '#3ba55d', fontSize: '0.75em', fontWeight: 700 },
    connectionPillOffline: { marginLeft: '10px', padding: '4px 8px', borderRadius: '999px', backgroundColor: 'rgba(218, 55, 60, 0.2)', border: '1px solid #da373c', color: '#da373c', fontSize: '0.75em', fontWeight: 700 },

    scrollToBottomButton: { position: 'absolute', right: '16px', bottom: '110px', backgroundColor: '#5865f2', color: '#fff', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.35)', cursor: 'pointer', fontWeight: 600 },
    quickEmojiRow: { display: 'flex', gap: '6px', marginTop: '8px', paddingLeft: '4px' },
    quickEmojiButton: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', color: '#fff', fontSize: '14px', transition: 'background 0.2s' },

    // 🔥 MOBİL KENAR ÇUBUĞU HEADER STİLİ
    mobileSidebarHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 15px',
        backgroundColor: '#202225',
        borderBottom: '1px solid #111214',
        minHeight: '54px',
        flexShrink: 0
    },
    closeSidebarButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        fontSize: '22px',
        cursor: 'pointer',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        transition: 'background 0.2s, color 0.2s'
    },

    // 🔥 AÇILIR MENÜ ITEM STİLİ
    menuItem: {
        width: '100%',
        padding: '10px 16px',
        background: 'transparent',
        border: 'none',
        color: '#dcddde',
        textAlign: 'left',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'all 0.15s ease',
        borderRadius: '0',
    },
    menuItemHover: {
        backgroundColor: '#5865f2',
        color: '#ffffff'
    }
};

function App() {
    return (
        <ErrorBoundary fallbackMessage="Pawscord encountered an error. Please try refreshing the page.">
            <VoiceProvider>
                <AppContent />
            </VoiceProvider>
        </ErrorBoundary>
    );
}

export default App;

