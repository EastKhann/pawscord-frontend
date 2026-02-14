// frontend/src/App.js

import React, { useState, useEffect, useRef, useCallback, useMemo, Suspense } from 'react';
import ReactDOM from 'react-dom';
// 🚀 SparkMD5 lazy import — sadece dosya upload'da kullanılır, başlangıçta yüklenmesine gerek yok
// import SparkMD5 from 'spark-md5';  // → calculateFileHash içinde dynamic import edilecek
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
    FaHeadphones, FaVideo, FaDesktop, FaTrash, FaInbox, FaSmile // 🔥 Ses kontrol ikonları + yeni özellik ikonları
} from './utils/iconOptimization'; // ⚡ OPTIMIZATION: -130KB bundle size
import { loadSavedTheme } from './utils/ThemeManager';

// --- STORE & UTILS ---
import { useChatStore } from './stores/useChatStore';
import { encryptMessage } from './utils/encryption';
import toast from './utils/toast';
import { useUIStore } from './stores/useUIStore';
import useResponsive from './hooks/useResponsive'; // 🔥 RESPONSIVE HOOK
import { useOptimizedMessages, useOnlineUsers } from './hooks/useOptimizedMessages'; // 🚀 PERFORMANS HOOK
import usePageTracking from './hooks/usePageTracking'; // 📊 PAGE VIEW TRACKING
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'; // ⌨️ KEYBOARD SHORTCUTS
import { useThrottle } from './utils/performanceOptimization'; // ⚡ THROTTLE HOOK (callback API)
import { useDebounce } from './hooks/usePerformanceHooks'; // ⚡ DEBOUNCE HOOK (value API)

// --- CONTEXT ---
import { useAuth } from './AuthContext';
import { VoiceProvider, useVoice } from './VoiceContext';
import { useGlobalWebSocket } from './GlobalWebSocketContext';

// --- CRITICAL COMPONENTS ONLY (Initial load) ---
const Message = React.lazy(() => import('./Message')); // ⚡ LAZY: Mesaj görüntüleme
const VirtualMessageList = React.lazy(() => import('./components/VirtualMessageList')); // ⚡ LAZY: Virtual scrolling
const MessageInput = React.lazy(() => import('./components/MessageInput')); // ⚡ LAZY: Mesaj input
import MaintenanceBanner from './components/MaintenanceBanner';
import LoadingSpinner from './components/LoadingSpinner'; // 🌀 Loading indicator
import AppModals from './components/AppModals'; // 🎭 All modal renders extracted

// ⚡ LAZY LOAD: Voice/Video components (not needed until voice chat)
const UserVideoContainer = React.lazy(() => import('./UserVideoContainer'));
const VoiceAudioController = React.lazy(() => import('./VoiceAudioController'));
const RichTextEditor = React.lazy(() => import('./components/RichTextEditor'));
const StickyMessageBanner = React.lazy(() => import('./components/StickyMessageBanner'));

// ⚡ LAZY LOAD: Auth screens (non-critical, load on demand)
import SplashScreen from './SplashScreen'; // 🔥 DIRECT IMPORT: Splash screen must load instantly
const LoginPage = React.lazy(() => import('./LoginPage'));
const WelcomeScreen = React.lazy(() => import('./WelcomeScreen'));

// ⚡ OPTIMIZATION: Lazy load modal components (on-demand loading)
const ImageModal = React.lazy(() => import('./ImageModal'));
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
const AutoModerationDashboard = React.lazy(() => import('./components/AutoModerationDashboard'));
const AutoModerationPanel = React.lazy(() => import('./components/AutoModerationPanel')); // 🔥 YENİ
const RaidProtectionPanel = React.lazy(() => import('./components/RaidProtectionPanel'));
const ReportSystemPanel = React.lazy(() => import('./components/ReportSystemPanel'));
const AuditLogPanel = React.lazy(() => import('./components/AuditLogPanel'));
const UserWarningsPanel = React.lazy(() => import('./components/UserWarningsPanel'));

// 📚 FEATURE: New Feature Panels (2026-01-19)
const BookmarkPanel = React.lazy(() => import('./components/BookmarkPanel')); // 📚 Bookmark Organization
const ReadLaterPanel = React.lazy(() => import('./components/ReadLaterPanel')); // 📖 Read Later
const ChannelPermissionsPanel = React.lazy(() => import('./components/ChannelPermissionsPanel')); // 🔐 Channel Permissions
const MessageThreadsPanel = React.lazy(() => import('./components/MessageThreadsPanel')); // 💬 Message Threads
const ModeratorNotesPanel = React.lazy(() => import('./components/ModeratorNotesPanel')); // 📝 Moderator Notes
const ServerRolesPanel = React.lazy(() => import('./components/ServerRolesPanel')); // 👑 Server Roles
const NotificationPreferencesPanel = React.lazy(() => import('./components/NotificationPreferencesPanel')); // 🔔 Notifications
const MessageOCRPanel = React.lazy(() => import('./components/MessageOCRPanel')); // 🔍 OCR Text Extraction
const MassActionsPanel = React.lazy(() => import('./components/MassActionsPanel')); // ⚡ Mass Moderation
const TimeoutMutePanel = React.lazy(() => import('./components/TimeoutMutePanel')); // ⏰ Timeout/Mute
const ServerThemesPanel = React.lazy(() => import('./components/ServerThemesPanel')); // 🎨 Server Themes
const KeywordMutesPanel = React.lazy(() => import('./components/KeywordMutesPanel')); // 🚫 Keyword Filters
const WelcomeTemplatesPanel = React.lazy(() => import('./components/WelcomeTemplatesPanel')); // 👋 Welcome Messages
const StickyMessagesPanel = React.lazy(() => import('./components/StickyMessagesPanel')); // 📌 Sticky Messages
const MessageTemplatesPanel = React.lazy(() => import('./components/MessageTemplatesPanel')); // 📄 Message Templates
const MessageExportPanel = React.lazy(() => import('./components/MessageExportPanel')); // 💾 Export History
const ArchivedRoomsPanel = React.lazy(() => import('./components/ArchivedRoomsPanel')); // 📦 Archived Channels
const SlowModePanel = React.lazy(() => import('./components/SlowModePanel')); // 🐢 Slow Mode
const EmojiManagementPanel = React.lazy(() => import('./components/EmojiManagementPanel')); // 😀 Emoji Management
const MentionsInboxPanel = React.lazy(() => import('./components/MentionsInboxPanel')); // 📬 Mentions Inbox
const CustomStatusModal = React.lazy(() => import('./components/CustomStatusModal')); // 🎭 Custom Status

// 🚀 BATCH 1: Analytics & Tracking (2026-01-19)
const ReactionAnalyticsPanel = React.lazy(() => import('./components/ReactionAnalyticsPanel'));
const LinkClickTrackingPanel = React.lazy(() => import('./components/LinkClickTrackingPanel'));
const JoinLeaveLogsPanel = React.lazy(() => import('./components/JoinLeaveLogsPanel'));
const UserActivityPanel = React.lazy(() => import('./components/UserActivityPanel'));
const NicknameHistoryPanel = React.lazy(() => import('./components/NicknameHistoryPanel'));
const FieldChangeTrackingPanel = React.lazy(() => import('./components/FieldChangeTrackingPanel'));
const InviteAnalyticsPanel = React.lazy(() => import('./components/InviteAnalyticsPanel'));

// 🚀 BATCH 2: Content & Moderation (2026-01-19)
const ContentScannerPanel = React.lazy(() => import('./components/ContentScannerPanel'));
const EphemeralMessagesPanel = React.lazy(() => import('./components/EphemeralMessagesPanel'));
const TopicHistoryPanel = React.lazy(() => import('./components/TopicHistoryPanel'));
const DraftsPanel = React.lazy(() => import('./components/DraftsPanel'));
const ServerNicknamesPanel = React.lazy(() => import('./components/ServerNicknamesPanel'));

// 🚀 BATCH 3: Server Features (2026-01-19)
const ServerBoostPanel = React.lazy(() => import('./components/ServerBoostPanel'));
const RoomWebhooksPanel = React.lazy(() => import('./components/RoomWebhooksPanel'));
const OAuthAppsPanel = React.lazy(() => import('./components/OAuthAppsPanel'));
const VanityURLPanel = React.lazy(() => import('./components/VanityURLPanel'));
const AutoRespondersPanel = React.lazy(() => import('./components/AutoRespondersPanel'));

// 🚀 BATCH 4: Security & Privacy (2026-01-19)
const SessionManagementPanel = React.lazy(() => import('./components/SessionManagementPanel'));
const GDPRExportPanel = React.lazy(() => import('./components/GDPRExportPanel'));
const DataRetentionPanel = React.lazy(() => import('./components/DataRetentionPanel'));
const TwoFactorSetupWizard = React.lazy(() => import('./components/TwoFactorSetupWizard'));

// 🚀 BATCH 5: Communication (2026-01-19)
const EnhancedPollsPanel = React.lazy(() => import('./components/EnhancedPollsPanel'));
const VoiceTranscriptsPanel = React.lazy(() => import('./components/VoiceTranscriptsPanel'));

// 💰 CRITICAL & HIGH PRIORITY: Payment & Engagement (2026-01-19)
const PaymentPanel = React.lazy(() => import('./components/PaymentPanel')); // 💰 Payment System
const StoreModal = React.lazy(() => import('./components/StoreModal')); // 🛒 Store
const DailyRewardsModal = React.lazy(() => import('./components/DailyRewardsModal')); // 🎁 Daily Rewards
const APIUsagePanel = React.lazy(() => import('./components/APIUsagePanel')); // 📊 API Analytics
const ExportJobsPanel = React.lazy(() => import('./components/ExportJobsPanel')); // 📥 Export Jobs
const ScheduledAnnouncementsPanel = React.lazy(() => import('./components/ScheduledAnnouncementsPanel')); // 📢 Scheduled Announcements
const InviteExportPanel = React.lazy(() => import('./components/InviteExportPanel'));

// 🚀 BATCH 6: Advanced Search & Analytics (2026-01-19)
const AdvancedSearchPanel = React.lazy(() => import('./components/AdvancedSearchPanel'));
const GrowthMetricsPanel = React.lazy(() => import('./components/GrowthMetricsPanel'));
const LinkPreviewRenderer = React.lazy(() => import('./components/LinkPreviewRenderer'));

// 🚀 BATCH 7: Store & Gamification (2026-01-19)
const InventoryPanel = React.lazy(() => import('./components/InventoryPanel'));
const WaitlistPanel = React.lazy(() => import('./components/WaitlistPanel'));
const ReferralRewardsPanel = React.lazy(() => import('./components/ReferralRewardsPanel'));

// �🔐 ROADMAP: Auth & Security Pages
const VerifyEmailPage = React.lazy(() => import('./pages/VerifyEmailPage'));
const ForgotPasswordPage = React.lazy(() => import('./pages/ForgotPasswordPage'));
const ResetPasswordPage = React.lazy(() => import('./pages/ResetPasswordPage'));
const TwoFactorLoginPage = React.lazy(() => import('./pages/TwoFactorLoginPage'));

// 🔐 NEW: 2FA & Email Components
const TwoFactorSetup = React.lazy(() => import('./components/TwoFactorSetup'));
const TwoFactorLogin = React.lazy(() => import('./components/TwoFactorLogin'));

// 🔗 Vanity URL Invite Screen
const VanityInviteScreen = React.lazy(() => import('./components/VanityInviteScreen'));
const InviteCodeScreen = React.lazy(() => import('./components/InviteCodeScreen'));
const EmailVerification = React.lazy(() => import('./components/EmailVerification'));

// 📱 NEW: Mobile Components
const MobileNav = React.lazy(() => import('./components/MobileNav'));
const SwipeActions = React.lazy(() => import('./components/SwipeActions'));
const VoiceMessage = React.lazy(() => import('./components/VoiceMessage'));

// ⚡ YENİ: Additional lazy loading
const FriendsTab = React.lazy(() => import('./FriendsTab'));
const RoomList = React.lazy(() => import('./RoomList'));
const UserProfilePanel = React.lazy(() => import('./UserProfilePanel'));
const VoiceChatPanel = React.lazy(() => import('./VoiceChatPanel'));
const ChatUserList = React.lazy(() => import('./ChatUserList'));
const PinnedMessages = React.lazy(() => import('./PinnedMessages'));
const FloatingVoiceIsland = React.lazy(() => import('./FloatingVoiceIsland'));
const CinemaPlayer = React.lazy(() => import('./components/CinemaPlayer'));
const ConnectionsPanel = React.lazy(() => import('./components/ConnectionsPanel')); // 🔗 Platform Connections
const PasswordSetupModal = React.lazy(() => import('./components/PasswordSetupModal')); // 🔑 Google Password Setup
const NotificationDropdown = React.lazy(() => import('./components/NotificationDropdown'));

// 📊 NEW: Nice-to-Have Analytics Panels (2026-01-30)
const ReactionStatsPanel = React.lazy(() => import('./components/panels/ReactionStatsPanel')); // 📊 Reaction Statistics
const ServerHealthPanel = React.lazy(() => import('./components/panels/ServerHealthPanel')); // 🏥 Server Health
const ChannelAnalyticsPanel = React.lazy(() => import('./components/panels/ChannelAnalyticsPanel')); // 📈 Channel Analytics
const SmartSuggestionsPanel = React.lazy(() => import('./components/panels/SmartSuggestionsPanel')); // 🤖 AI Suggestions
const UserPresenceInsightsPanel = React.lazy(() => import('./components/panels/UserPresenceInsightsPanel')); // 👤 User Insights

// --- YENİ EKLEMELER: Eksik componentler - LAZY LOAD OPTIMIZATION ---
const UserFooter = React.lazy(() => import('./components/UserFooter')); // 👤 Kullanıcı footer
const UserContextMenu = React.lazy(() => import('./components/UserContextMenu')); // 🖱️ Kullanıcı sağ tık menüsü

//  BATCH 8: New Features (2026-01-28) - Missing Imports Fixed
const MiniGamesPanel = React.lazy(() => import('./components/MiniGamesPanel')); //  Mini Games
const ProjectCollaborationPanel = React.lazy(() => import('./components/ProjectCollaborationPanel')); //  Project Collaboration
const AvatarStudioPanel = React.lazy(() => import('./components/AvatarStudioPanel')); //  Avatar Studio

// 🔥 BATCH 9: Essential UX Features (2026-02-01)
const ImageLightbox = React.lazy(() => import('./components/ImageLightbox')); // 🔍 Enhanced Image Viewer
const ChannelAboutPanel = React.lazy(() => import('./components/ChannelAboutPanel')); // ℹ️ Channel Info Panel
const MessageSchedulePicker = React.lazy(() => import('./components/MessageSchedulePicker')); // 📅 Message Scheduler
import ConnectionStatusBar from './components/ConnectionStatusBar'; // 🌐 Connection Status (direct - always needed)
import ScrollToBottomButton from './components/ScrollToBottomButton'; // ⬇️ Scroll FAB (direct - always visible)
import MessageDateDivider from './components/MessageDateDivider'; // 📅 Date Dividers (direct - always shown)
import TypingIndicatorEnhanced from './components/TypingIndicatorEnhanced'; // ⌨️ Enhanced Typing
import NewMessagesDivider from './components/NewMessagesDivider'; // 🔴 New Messages Divider

// 🔥 BATCH 10: 50 Essential Features Integration (2026-02-01)
// -- Core UX --
const UserSettingsModal = React.lazy(() => import('./components/UserSettingsModal')); // ⚙️ Unified User Settings
const KeyboardShortcutsModal = React.lazy(() => import('./components/KeyboardShortcutsModal')); // ⌨️ Keyboard Shortcuts
const CommandPalette = React.lazy(() => import('./components/CommandPalette')); // 🔍 Quick Switcher
const ServerDiscoveryPage = React.lazy(() => import('./components/ServerDiscoveryPage')); // 🌍 Server Discovery
const AppearanceSettingsPanel = React.lazy(() => import('./components/AppearanceSettingsPanel')); // 🎨 Appearance Settings
const LanguageSelector = React.lazy(() => import('./components/LanguageSelector')); // 🌐 Language Selector
const ChangelogPanel = React.lazy(() => import('./components/ChangelogPanel')); // 📋 Changelog
const LogoutModal = React.lazy(() => import('./components/LogoutModal')); // 🚪 Logout Confirm
const NotificationSoundSettings = React.lazy(() => import('./components/NotificationSoundSettings')); // 🔊 Notification Sounds
const QuickSwitcher = React.lazy(() => import('./components/QuickSwitcher')); // ⚡ Quick Switcher

// -- Security & Account --
const LoginHistory = React.lazy(() => import('./components/LoginHistory')); // 🔐 Login History
const SecuritySettingsPanel = React.lazy(() => import('./components/SecuritySettingsPanel')); // 🛡️ Security Settings
const PrivacySettingsPanel = React.lazy(() => import('./components/PrivacySettingsPanel')); // 🔒 Privacy Settings
const AccountDeletionModal = React.lazy(() => import('./components/AccountDeletionModal')); // ❌ Account Deletion
const BlockListPanel = React.lazy(() => import('./components/BlockListPanel')); // 🚫 Block List
const E2EESettingsPanel = React.lazy(() => import('./components/E2EESettingsPanel')); // 🔐 E2EE Settings

// -- Communication --
const ThreadView = React.lazy(() => import('./components/ThreadView')); // 💬 Thread Conversations
const ScheduledMessagesPanel = React.lazy(() => import('./components/ScheduledMessagesPanel')); // ⏰ Scheduled Messages
const ReminderPanel = React.lazy(() => import('./components/ReminderPanel')); // ⏰ Reminders
const ForumPanel = React.lazy(() => import('./components/ForumPanel')); // 📋 Forum Channels
const StageChannelPanel = React.lazy(() => import('./components/StageChannelPanel')); // 🎤 Stage Channels
const VideoCallModal = React.lazy(() => import('./components/VideoCallModal')); // 📹 Video Calls
const VoiceSettingsPanel = React.lazy(() => import('./components/VoiceSettingsPanel')); // 🎙️ Voice Settings
const MessageSearchPanel = React.lazy(() => import('./components/MessageSearchPanel')); // 🔍 Message Search
const WatchTogether = React.lazy(() => import('./components/WatchTogether')); // 🎬 Watch Together

// -- Server Management --
const AutoRolesPanel = React.lazy(() => import('./components/AutoRolesPanel')); // 🤖 Auto Roles
const ReactionRolesPanel = React.lazy(() => import('./components/ReactionRolesPanel')); // 🎭 Reaction Roles
const WelcomeMessagesPanel = React.lazy(() => import('./components/WelcomeMessagesPanel')); // 👋 Welcome Messages
const EventCalendar = React.lazy(() => import('./components/EventCalendar')); // 📅 Event Calendar
const GiveawayPanel = React.lazy(() => import('./components/GiveawayPanel')); // 🎉 Giveaways
const TicketSystemPanel = React.lazy(() => import('./components/TicketSystemPanel')); // 🎫 Ticket System
const StarboardPanel = React.lazy(() => import('./components/StarboardPanel')); // ⭐ Starboard
const ServerBackupPanel = React.lazy(() => import('./components/ServerBackupPanel')); // 💾 Server Backup
const BanAppealsPanel = React.lazy(() => import('./components/BanAppealsPanel')); // ⚖️ Ban Appeals
const CustomCommandsPanel = React.lazy(() => import('./components/CustomCommandsPanel')); // 🤖 Custom Commands
const LevelingSystemPanel = React.lazy(() => import('./components/LevelingSystemPanel')); // 📊 Leveling System
const LiveStreamPanel = React.lazy(() => import('./components/LiveStreamPanel')); // 📺 Live Streaming

// -- Engagement & Social --
const AchievementsPanel = React.lazy(() => import('./components/AchievementsPanel')); // 🏆 Achievements
const BirthdaySystemPanel = React.lazy(() => import('./components/BirthdaySystemPanel')); // 🎂 Birthday System
const PremiumModal = React.lazy(() => import('./components/PremiumModal')); // 💎 Premium
const MusicPlayer = React.lazy(() => import('./components/MusicPlayer')); // 🎵 Music Player
const BotMarketplace = React.lazy(() => import('./components/BotMarketplace')); // 🤖 Bot Marketplace
const ProfileCustomization = React.lazy(() => import('./components/ProfileCustomization')); // 👤 Profile Customization
const IntegrationHubPanel = React.lazy(() => import('./components/IntegrationHubPanel')); // 🔗 Integration Hub
const TournamentSystem = React.lazy(() => import('./components/TournamentSystem')); // 🏆 Tournaments

// -- Advanced Features --
const HighlightsPanel = React.lazy(() => import('./components/HighlightsPanel')); // 💡 Keyword Highlights
const CustomEmbedPanel = React.lazy(() => import('./components/CustomEmbedPanel')); // 📦 Custom Embeds
const SpotifyIntegrationPanel = React.lazy(() => import('./components/SpotifyIntegrationPanel')); // 🎵 Spotify
const ServerClonePanel = React.lazy(() => import('./components/ServerClonePanel')); // 📋 Server Clone
const WeeklyChallengesPanel = React.lazy(() => import('./components/WeeklyChallengesPanel')); // 🎯 Weekly Challenges

// 🔥 BATCH 11: 50 More Essential Features (2026-02-02)
// -- 🔰 Moderation & Admin --
const ModeratorTools = React.lazy(() => import('./components/ModeratorTools')); // 🛡️ Moderator Tools
const AIModerationPanel = React.lazy(() => import('./components/AIModerationPanel')); // 🤖 AI Moderation
const SpamDetectionPanel = React.lazy(() => import('./components/SpamDetectionPanel')); // 🚫 Spam Detection
const AuditLogsPanel = React.lazy(() => import('./components/AuditLogsPanel')); // 📋 Audit Logs
const BanHistoryPanel = React.lazy(() => import('./components/BanHistoryPanel')); // ⛔ Ban History
const ModerationLogsPanel = React.lazy(() => import('./components/ModerationLogsPanel')); // 📜 Moderation Logs
const RaidProtectionDashboard = React.lazy(() => import('./components/RaidProtectionDashboard')); // 🛡️ Raid Protection
const SecurityAlertsPanel = React.lazy(() => import('./components/SecurityAlertsPanel')); // 🚨 Security Alerts

// -- 💬 Communication & Messages --
const BookmarksPanel = React.lazy(() => import('./components/BookmarksPanel')); // 🔖 Bookmarks
const GIFPickerPanel = React.lazy(() => import('./components/GIFPickerPanel')); // 🎞️ GIF Picker
const PollCreator = React.lazy(() => import('./components/PollCreator')); // 📊 Poll Creator
const StickersPanel = React.lazy(() => import('./components/StickersPanel')); // 🎨 Stickers
const SavedMessagesModal = React.lazy(() => import('./components/SavedMessagesModal')); // 💾 Saved Messages
const NotificationsCenter = React.lazy(() => import('./components/NotificationsCenter')); // 🔔 Notifications Center
const MessageSummaryPanel = React.lazy(() => import('./components/MessageSummaryPanel')); // 📝 Message Summary
const TranslationPanel = React.lazy(() => import('./components/TranslationPanel')); // 🌍 Translation

// -- 🏠 Server Management --
const ChannelSettingsModal = React.lazy(() => import('./components/ChannelSettingsModal')); // ⚙️ Channel Settings
const InviteModal = React.lazy(() => import('./components/InviteModal')); // 📨 Invite Manager
const ServerTemplates = React.lazy(() => import('./components/ServerTemplates')); // 📋 Server Templates
const ServerAnalyticsDashboard = React.lazy(() => import('./components/ServerAnalyticsDashboard')); // 📊 Server Analytics
const RolesManager = React.lazy(() => import('./components/RolesManager')); // 👑 Roles Manager
const WelcomeScreenEditor = React.lazy(() => import('./components/WelcomeScreenEditor')); // 👋 Welcome Screen Editor
const CommunitySettingsPanel = React.lazy(() => import('./components/CommunitySettingsPanel')); // 🏘️ Community Settings
const InviteLinkManager = React.lazy(() => import('./components/InviteLinkManager')); // 🔗 Invite Links

// -- 🤖 Bot & Developer --
const BotBuilder = React.lazy(() => import('./components/BotBuilder')); // 🤖 Bot Builder
const BotDeveloperPortal = React.lazy(() => import('./components/BotDeveloperPortal')); // 🧑‍💻 Bot Developer Portal
const WebhookManager = React.lazy(() => import('./components/WebhookManager')); // 🔗 Webhook Manager
const APIKeysPanel = React.lazy(() => import('./components/APIKeysPanel')); // 🔑 API Keys
const SlashCommandsPanel = React.lazy(() => import('./components/SlashCommandsPanel')); // ⚡ Slash Commands
const CodeRunnerPanel = React.lazy(() => import('./components/CodeRunnerPanel')); // 💻 Code Runner

// -- 👤 Profile & Social --
const ProfileCard = React.lazy(() => import('./components/ProfileCard')); // 👤 Profile Card
const UserNotesModal = React.lazy(() => import('./components/UserNotesModal')); // 📝 User Notes
const StatusPicker = React.lazy(() => import('./components/StatusPicker')); // 🟢 Status Picker
const MutualsPanel = React.lazy(() => import('./components/MutualsPanel')); // 👥 Mutual Friends/Servers
const ProfileShowcasePanel = React.lazy(() => import('./components/ProfileShowcasePanel')); // 🏅 Profile Showcase
const SessionManagerModal = React.lazy(() => import('./components/SessionManagerModal')); // 📱 Session Manager

// -- 💎 Premium & Economy --
const CoinStoreModal = React.lazy(() => import('./components/CoinStoreModal')); // 🪙 Coin Store
const PremiumManagementPanel = React.lazy(() => import('./components/PremiumManagementPanel')); // 💎 Premium Management
const SubscriptionManager = React.lazy(() => import('./components/SubscriptionManager')); // 📋 Subscription Manager
const GiftPremiumPanel = React.lazy(() => import('./components/GiftPremiumPanel')); // 🎁 Gift Premium
const PremiumMarketplace = React.lazy(() => import('./components/PremiumMarketplace')); // 🛒 Premium Marketplace
const ThemeMarketplace = React.lazy(() => import('./components/ThemeMarketplace')); // 🎨 Theme Marketplace

// -- 🔧 Advanced --
const AIChatbotPanel = React.lazy(() => import('./components/AIChatbotPanel')); // 🤖 AI Chatbot
const CollaborativeCodeEditor = React.lazy(() => import('./components/CollaborativeCodeEditor')); // 👨‍💻 Collaborative Code Editor
const ScreenShareModal = React.lazy(() => import('./components/ScreenShareModal')); // 🖥️ Screen Share
const LiveStreamModal = React.lazy(() => import('./components/LiveStreamModal')); // 📺 Live Stream Modal
const AdvancedAnalyticsDashboard = React.lazy(() => import('./components/AdvancedAnalyticsDashboard')); // 📈 Advanced Analytics
const FileManagerPanel = React.lazy(() => import('./components/FileManagerPanel')); // 📁 File Manager
const ReportsPanel = React.lazy(() => import('./components/ReportsPanel')); // 📊 Reports
const ErrorReportingPanel = React.lazy(() => import('./components/ErrorReportingPanel')); // 🐛 Error Reporting

// --- AYARLAR ---
// 🔥 Extracted to config/api.js for cleaner architecture
import {
    isElectron, isNative, isProductionBuild,
    API_URL_BASE_STRING, MEDIA_BASE_URL, API_BASE_URL, ABSOLUTE_HOST_URL,
    WS_PROTOCOL, API_HOST, LOGIN_URL, REGISTER_URL, UPLOAD_FILE_URL,
    MESSAGE_HISTORY_ROOM_URL, MESSAGE_HISTORY_DM_URL, ROOM_LIST_URL,
    CONVERSATION_LIST_URL, GET_OR_CREATE_CONVERSATION_URL, ALL_USERS_URL,
    UPDATE_PROFILE_URL, DEFAULT_AVATARS_URL, CHANGE_USERNAME_URL, LOCAL_GIF_LIST_URL,
    DRAFT_STORAGE_KEY, getTemporaryId, calculateFileHash
} from './config/api';
import styles from './styles/appStyles';
import ImageGalleryGroup from './components/ImageGalleryGroup';

// Google Client ID imported from constants.js
import { GOOGLE_WEB_CLIENT_ID } from './utils/constants';
import confirmDialog from './utils/confirmDialog';

// --- ANA İÇERİK BİLEŞENİ ---
const AppContent = () => {
    const { user, isAuthenticated, token, login, logout, isLoading: isAuthLoading, refreshAccessToken } = useAuth();
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

    // Global WebSocket Data — App.js is the SINGLE WS connection, forwards to context
    const { setGlobalData: forwardToGlobalContext, setIsConnected: setGlobalWsConnected } = useGlobalWebSocket();


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

    const { modals, openModal, closeModal, toggleModal } = useUIStore();

    // Local State
    const [chartSymbol, setChartSymbol] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [updateStatusText, setUpdateStatusText] = useState('');
    const username = user?.username || '';
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
    const [authError, setAuthError] = useState('');
    const [selectedMessages, setSelectedMessages] = useState(new Set());
    const [zoomedImage, setZoomedImage] = useState(null);
    const [galleryData, setGalleryData] = useState(null); // {images: [], startIndex: 0} for gallery viewer
    const [viewingProfile, setViewingProfile] = useState(null);
    const [dropTarget, setDropTarget] = useState(null);

    // 🛡️ MODERATION: Moderation Panels (2026-01-15)

    // 📚 NEW FEATURES: Feature Panels (2026-01-19)

    // 🚀 BATCH 1: Analytics & Tracking (2026-01-19)

    // 🚀 BATCH 2: Content & Moderation (2026-01-19)

    // 🚀 BATCH 3: Server Features (2026-01-19)
    // Note: modals.vanityURL already exists above

    // 🚀 BATCH 4: Security & Privacy (2026-01-19)

    // 🚀 BATCH 5: Communication (2026-01-19)

    // 🚀 BATCH 6: Advanced Search & Analytics (2026-01-19)

    // 🚀 BATCH 7: Store & Gamification (2026-01-19)

    // 🎮 BATCH 8: New Features (2026-01-28)


    // 🔥 BATCH 10: 50 Essential Features States (2026-02-01)
    // -- Core UX --
    // -- Security --
    // -- Communication --
    // -- Server Management --
    // -- Engagement --
    // -- Advanced --
    // -- Feature Hub --

    // 🔥 BATCH 11: 50 More Essential Features States (2026-02-02)
    // -- 🔰 Moderation --
    // -- 💬 Communication --
    // -- 🏠 Server Management --
    // -- 🤖 Bot/Dev --
    // -- 👤 Profile & Social --
    // -- 💎 Premium --
    // -- 🔧 Advanced --

    const [currentTheme, setCurrentTheme] = useState('default');
    const [stickyMessage, setStickyMessage] = useState(null);
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
    const [serverToEdit, setServerToEdit] = useState(null);
    const [isSummaryLoading, setIsSummaryLoading] = useState(false);
    const [summaryResult, setSummaryResult] = useState("");
    const [soundSettings, setSoundSettings] = useState(() => JSON.parse(localStorage.getItem('chat_sound_settings')) || { notifications: true, mentions: true, userJoinLeave: true });
    const [maintenanceMode, setMaintenanceMode] = useState(null); // 🆕 Maintenance mode
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0); // 📊 Upload progress %
    const [pendingFilesFromDrop, setPendingFilesFromDrop] = useState([]); // 🆕 Chat area drop'tan gelen dosyalar
    const [isRecordingVoice, setIsRecordingVoice] = useState(false);
    const [hasDraftMessage, setHasDraftMessage] = useState(false);
    const [draftText, setDraftText] = useState('');
    const [showScrollToBottom, setShowScrollToBottom] = useState(false);
    const [editingMessage, setEditingMessage] = useState(null); // 🔥 Mesaj düzenleme
    const [replyingTo, setReplyingTo] = useState(null); // 🔥 Mesaja cevap verme
    const [forwardingMessage, setForwardingMessage] = useState(null); // 🔥 Mesaj iletme
    const [isSelectionMode, setIsSelectionMode] = useState(false); // 🔥 EKLENDİ: Mesaj seçme modu

    // 🔔 YENİ: Bildirim ve context menu state'leri
    const [userContextMenu, setUserContextMenu] = useState(null); // { x, y, user, permissions }

    // 🎫 YENİ: Sunucuya davet modal state
    const [inviteToServerUser, setInviteToServerUser] = useState(null); // { username } or null

    // 💰 YENİ: Payment & Store state'leri (2026-01-19)

    // 🔗 YENİ: Vanity URL Invite Screen (2026-01-23)
    const [showVanityInvite, setShowVanityInvite] = useState(null); // vanity path veya null
    const [showInviteCode, setShowInviteCode] = useState(null); // 🔥 FIX: invite code veya null

    // 🔗 YENİ: Platform Connections Panel

    // 🔑 YENİ: Google ile giriş yapanlar için şifre belirleme modal

    const typingUsers = useChatStore(state => state.typingUsers);

    // ⚡ OPTIMIZATION: Memoize filtered typing users
    const activeTypingUsers = useMemo(() => {
        return typingUsers.filter(u => u !== username);
    }, [typingUsers, username]);

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const ws = useRef(null);
    const statusWsRef = useRef(null);
    const activeChatRef = useRef(activeChat); // 🚨 PERF FIX: Ref for StatusWS to avoid reconnect on chat switch
    const messagesEndRef = useRef(null);
    const dragCounterRef = useRef(0); // 🆕 Drag counter for reliable drag leave detection
    const fileInputRefNormal = useRef(null);
    const richTextRef = useRef(null);
    const messageBoxRef = useRef(null);
    const searchInputRef = useRef(null);
    const historyCacheRef = useRef({});
    const serverMembersCacheRef = useRef({}); // 🚀 Server members cache — aynı sunucuda oda değiştirince tekrar fetch etme
    const statusWsReconnectRef = useRef(null);
    const tokenRef = useRef(token);
    const usernameRef = useRef(username);
    const fetchingInitRef = useRef(false);

    useEffect(() => { activeChatRef.current = activeChat; }, [activeChat]);
    useEffect(() => { tokenRef.current = token; }, [token]);
    useEffect(() => { usernameRef.current = username; }, [username]);

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

    // 🖼️ Gallery grouping: Ayni kullanicinin ardisik resim-only mesajlarini grupla
    const isImageOnlyMessage = (msg) => {
        if (!msg) return false;
        const hasImage = !!(msg.image_url || msg.image);
        const hasFileImage = !!(msg.file_url || msg.file) && !msg.is_voice_message &&
            /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(msg.file_name || '');
        const hasContent = !!(msg.content && msg.content.trim());
        const hasPoll = !!msg.poll;
        const hasReply = !!msg.reply_to;
        return (hasImage || hasFileImage) && !hasContent && !hasPoll && !hasReply;
    };

    // --- SPLASH SCREEN LOGIC (veri hazırsa erken kapat) ---
    useEffect(() => {
        if (animationState === 'finished') return;
        setAnimationState('start');
        // ⚡ Minimum animasyon: 800ms (logo animasyonu), data hazırsa hemen kapat
        const minTimer = setTimeout(() => setAnimationState('pre-transition'), 800);
        const forceFinishTimer = setTimeout(() => setAnimationState('finished'), 2000); // Max bekle
        return () => {
            clearTimeout(minTimer);
            clearTimeout(forceFinishTimer);
        };
    }, []);

    // 🚀 Veri yüklendiğinde splash'ı erken kapat (minimum 800ms sonra)
    useEffect(() => {
        if (isInitialDataLoaded && animationState === 'pre-transition') {
            setAnimationState('finished');
        }
    }, [isInitialDataLoaded, animationState]);

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
            openModal('passwordSetupModal');
            // Clear URL parameters
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);

    // ?? PAYMENT SUCCESS: Stripe/Coinbase'den d�nd�kten sonra coin ekleme
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const success = params.get('success');
        const coins = params.get('coins');
        const sessionId = params.get('session_id');
        const canceled = params.get('canceled');

        if (success === 'true' && coins) {
            const verifyPayment = async () => {
                try {
                    const token = localStorage.getItem('access_token');
                    const apiBase = 'https://api.pawscord.com/api';

                    if (sessionId) {
                        const response = await fetch(`${apiBase}/payments/verify/`, {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                session_id: sessionId,
                                coin_amount: parseInt(coins)
                            })
                        });

                        const data = await response.json();

                        if (data.success) {
                            if (data.already_processed) {
                                toast.info(`?? �deme zaten islendi! Bakiye: ${data.balance} coin`);
                            } else {
                                toast.success(`?? ${coins} coin hesabina eklendi! Yeni bakiye: ${data.balance} coin`);
                            }
                        } else {
                            toast.error(data.error || '�deme dogrulama hatasi');
                        }
                    } else {
                        toast.success(`?? �deme basarili! ${coins} coin hesabina eklendi.`);
                    }
                } catch (error) {
                    console.error('Payment verification error:', error);
                    toast.success(`?? ${coins} coin satin alma tamamlandi!`);
                }
            };

            verifyPayment();
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        if (canceled === 'true') {
            toast.info('? �deme iptal edildi.');
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);


    // 🔗 VANITY URL CHECK: /#/join/path VE /join/path her ikisini de destekle
    // 🔥 FIX: /#/invite/CODE desteği de eklendi
    useEffect(() => {
        const hash = window.location.hash;

        // 0️⃣ Invite code: /#/invite/ABCD1234
        const inviteMatch = hash.match(/^#\/invite\/([^/?]+)/);
        if (inviteMatch) {
            setShowInviteCode(inviteMatch[1]);
            return;
        }

        // 1️⃣ Hash-based: /#/join/pawpaw
        const vanityMatch = hash.match(/^#\/join\/([^/?]+)/);
        if (vanityMatch) {
            setShowVanityInvite(vanityMatch[1]);
            return;
        }

        // 2️⃣ Path-based: /join/pawpaw (nginx veya direkt URL)
        const pathMatch = window.location.pathname.match(/^\/join\/([^/?]+)/);
        if (pathMatch) {
            const vanityPath = pathMatch[1];
            // Hash'e taşı ki SPA düzgün çalışsın
            window.history.replaceState({}, '', `/#/join/${vanityPath}`);
            setShowVanityInvite(vanityPath);
        }
    }, []);

    // �️ MODERATION: Global functions for ServerSettingsModal to trigger panels
    useEffect(() => {
        window.showAutoModeration = () => openModal('autoModeration');
        window.showRaidProtection = () => openModal('raidProtection');
        window.showReportSystem = () => openModal('reportSystem');
        window.showAuditLog = () => openModal('auditLog');
        window.showUserWarnings = () => openModal('userWarnings');

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
            if (modals.toolbarMenu && !e.target.closest('.toolbar-menu-container')) {
                closeModal('toolbarMenu');
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [modals.toolbarMenu]);

    // 🔗 CONNECTIONS PANEL EVENT LISTENER
    useEffect(() => {
        const handleOpenConnectionsPanel = () => {
            openModal('connectionsPanel');
        };
        window.addEventListener('openConnectionsPanel', handleOpenConnectionsPanel);
        return () => window.removeEventListener('openConnectionsPanel', handleOpenConnectionsPanel);
    }, []);

    // ⚡ OPTIMIZATION: PWA & Critical CSS Initialization (run once on mount)
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

        // 🔗 Initialize Deep Link Handler (APK)
        if (isNative) {
            import('./utils/urlHandlers').then(({ initializeDeepLinkHandler }) => {
            });
        }

    }, []);

    // 🔔 Push Notifications (depends on auth)
    useEffect(() => {
        if (isAuthenticated) {
            import('./utils/pushNotifications').then(({ pushNotificationManager }) => {
                pushNotificationManager.init(API_BASE_URL, fetchWithAuth);
            });
        }
    }, [isAuthenticated]);


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
        if (!uname || !defaultAvatars || defaultAvatars.length === 0) return `${MEDIA_BASE_URL}/avatars/cat_1.png`;
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
            return `${MEDIA_BASE_URL}/avatars/cat_1.png`;
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

    const isRefreshingRef = useRef(false);
    const refreshPromiseRef = useRef(null);

    const fetchWithAuth = useCallback(async (url, options = {}, _isRetry = false) => {
        const currentToken = tokenRef.current || token;
        const headers = { ...(options.headers || {}) };
        if (currentToken) headers['Authorization'] = `Bearer ${currentToken}`;
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

            // 🔄 401 → Token refresh & retry (tek sefer)
            if (response.status === 401 && !_isRetry) {
                // Auth endpoint'lerinde direkt logout
                if (url.includes('/auth/') || url.includes('/login')) {
                    console.warn('⚠️ [Auth] 401 on auth endpoint, logging out');
                    logout();
                    throw new Error("Unauthorized");
                }

                // 🔄 Token refresh - deduplicate concurrent refreshes
                console.warn('⚠️ [Auth] 401, refreshing token for:', url.split('?')[0]);
                if (!isRefreshingRef.current) {
                    isRefreshingRef.current = true;
                    refreshPromiseRef.current = refreshAccessToken().finally(() => {
                        isRefreshingRef.current = false;
                    });
                }

                const refreshed = await refreshPromiseRef.current;
                if (refreshed) {
                    // Retry with new token
                    return fetchWithAuth(url, options, true);
                } else {
                    throw new Error("Unauthorized");
                }
            }

            return response;
        } catch (err) {
            if (err.name === 'AbortError') {
                console.error('⏱️ [Fetch] Request timed out:', url);
                throw new Error('İstek zaman aşımına uğradı');
            }
            if (err.message === 'Unauthorized') throw err;
            console.error("Fetch error:", err);
            throw err;
        }
    }, [token, logout, refreshAccessToken]);

    // 📊 ANALYTICS: Page view tracking (fetchWithAuth tanımından SONRA!)
    usePageTracking();

    // 🔗 VANITY URL JOIN HANDLER (fetchWithAuth tanımından SONRA!)
    useEffect(() => {
        // HashRouter kullanıldığı için hash'ten sonraki parametreleri oku
        // URL format: /#/?join_server=123
        const hash = window.location.hash;
        const queryString = hash.includes('?') ? hash.split('?')[1] : '';
        const urlParams = new URLSearchParams(queryString);
        const joinServerId = urlParams.get('join_server');

        if (joinServerId && isAuthenticated && categories && categories.length > 0) {
            // Sunucuya katılma işlemi
            const targetServer = categories.find(s => s.id === parseInt(joinServerId));

            if (targetServer) {
                // Kullanıcı zaten bu sunucuda mı?

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

                // Sunucu invite modal'ı açmak için API çağrısı yap
                const joinServer = async () => {
                    try {
                        const res = await fetchWithAuth(`${API_BASE_URL}/servers/${joinServerId}/join/`, {
                            method: 'POST'
                        });

                        if (res.ok) {
                            toast.success('Sunucuya katıldınız!');
                            // 🔥 FIX: Sayfa yenileme yerine sunucu listesini API'den yenile
                            try {
                                const roomsRes = await fetchWithAuth(ROOM_LIST_URL);
                                if (roomsRes.ok) {
                                    const rooms = await roomsRes.json();
                                    setCategories(rooms);
                                    // Yeni sunucuya otomatik git
                                    const joinedServer = rooms.find(s => s.id === parseInt(joinServerId));
                                    if (joinedServer) {
                                        handleServerSelect(joinedServer);
                                    }
                                }
                            } catch (e) {
                                console.warn('Server list refresh failed, continue anyway:', e);
                            }
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

    // 🔥 FIX: Context menu Move Up/Down — App.js tarafında state güncelle
    const handleMoveServer = useCallback((serverId, direction) => {
        let currentOrder = serverOrder.length > 0 ? [...serverOrder] : categories.map(c => c.id);
        categories.forEach(c => {
            if (!currentOrder.includes(c.id)) currentOrder.push(c.id);
        });

        const sourceIndex = currentOrder.indexOf(serverId);
        if (sourceIndex === -1) return;

        const targetIndex = direction === 'up' ? sourceIndex - 1 : sourceIndex + 1;
        if (targetIndex < 0 || targetIndex >= currentOrder.length) return;

        const [draggedId] = currentOrder.splice(sourceIndex, 1);
        currentOrder.splice(targetIndex, 0, draggedId);

        setServerOrder(currentOrder);
        saveServerOrder(currentOrder);
    }, [serverOrder, categories, saveServerOrder]);

    const handleServerDrop = useCallback((e, targetIndex) => {
        e.preventDefault();

        const serverId = parseInt(e.dataTransfer.getData('serverId'));
        if (isNaN(serverId)) return;

        // 🔥 FIX: Build currentOrder from all servers, using serverOrder as base
        let currentOrder = serverOrder.length > 0 ? [...serverOrder] : categories.map(c => c.id);

        // Ensure all current servers are in the order (handles newly joined servers)
        categories.forEach(c => {
            if (!currentOrder.includes(c.id)) currentOrder.push(c.id);
        });

        // 🔥 FIX: Use serverId to find the real index in currentOrder (not the visual sourceIndex
        // which can be stale or mismatched if serverOrder is out of sync)
        const sourceIndex = currentOrder.indexOf(serverId);
        if (sourceIndex === -1) return;


        // Aynı yere bırakıyorsa işlem yapma
        if (sourceIndex === targetIndex || sourceIndex + 1 === targetIndex) {
            return;
        }

        // Kaynak elementi çıkar
        const [draggedId] = currentOrder.splice(sourceIndex, 1);

        // Hedef index'i ayarla (splice sonrası kayma için)
        const adjustedTargetIndex = sourceIndex < targetIndex ? targetIndex - 1 : targetIndex;


        // Hedef konuma ekle
        currentOrder.splice(adjustedTargetIndex, 0, draggedId);


        setServerOrder(currentOrder);
        saveServerOrder(currentOrder);
    }, [serverOrder, categories, saveServerOrder]);


    const scrollToMessage = (msgId) => {
        const el = document.getElementById(`message-${msgId}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    const handleClearChat = async () => {
        if (!await confirmDialog("Bu odadaki tüm mesajları silmek istediğine emin misin?")) return;
        try {
            const res = await fetchWithAuth(`${API_BASE_URL}/rooms/${activeChat.id}/clear/`, { method: 'POST' });
            if (res.ok) setMessages([]);
        } catch (e) { console.error(e); }
    };

    const handleSummarize = async () => {
        openModal('summary');
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

        if (!content) return;
        const trimmed = content.trim();
        if (!trimmed) return;

        // ✨ Check for /tema command
        if (trimmed === '/tema') {
            openModal('themeStore');
            setEditingMessage(null);
            setHasDraftMessage(false);
            setDraftText('');
            richTextRef.current?.clear?.();
            return;
        }

        // ✨ Check for /sablon command
        if (trimmed === '/sablon') {
            openModal('templateModal');
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
        closeModal('snippetModal');
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
                return;
            }
        }

        // 🔥 FIX: Mevcut bağlantıyı kapat (eğer varsa)
        if (ws.current) {
            ws.current.close(1000, 'change_room');
        }

        let wsUrl = '';
        const params = `?username=${encodeURIComponent(username)}&token=${token}`;
        if (activeChat.type === 'room') wsUrl = `${WS_PROTOCOL}://${API_HOST}/ws/chat/${activeChat.id}/${params}`;
        else if (activeChat.type === 'dm') wsUrl = `${WS_PROTOCOL}://${API_HOST}/ws/dm/${activeChat.id}/${params}`;


        if (!wsUrl) {
            return;
        }

        const newWs = new WebSocket(wsUrl);
        ws.current = newWs;

        newWs.onopen = () => {
            setIsConnected(true);
        };

        newWs.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'chat' || data.type === 'dm' || data.type === 'chat_message_handler') {
                // 🔥 DEBUG: Gelen mesajın yapısını logla

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
                        return prev;
                    }

                    const updatedMessages = [...prev, data];

                    // 🔥 FIX: Cache'i gelen mesajın room/conversation bilgisine göre güncelle
                    const cacheKey = getCacheKeyFromMessage(data);
                    if (historyCacheRef.current[cacheKey]) {
                        historyCacheRef.current[cacheKey].messages = updatedMessages;
                    }

                    return updatedMessages;
                });

                setTypingUser(data.username, false);
                // 🔔 Play notification sound for incoming messages from others
                if (data.username !== username) {
                    try {
                        const { soundManager } = require('./utils/notificationSounds');
                        const isMention = data.content?.includes(`@${username}`) || data.mentions?.includes(username);
                        const isDM = data.type === 'dm';
                        if (isMention) soundManager.play('mention');
                        else if (isDM) soundManager.play('dm');
                        else soundManager.play('message');
                    } catch (e) { /* sound not critical */ }
                }
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

    // 🚀 COMBINED INIT — TEK istekte tüm veriyi yükle (7 API → 1 API)
    useEffect(() => {
        if (!isAuthenticated || isInitialDataLoaded) return;
        if (fetchingInitRef.current) return; // 🛡️ Prevent duplicate fetch
        fetchingInitRef.current = true;

        const fetchInit = async () => {
            try {
                const currentUsername = usernameRef.current || username;

                // 🚀 TEK İSTEK: /api/init/ — user, servers, conversations, friends, server_order, turn, maintenance
                let initData = null;
                try {
                    const initRes = await fetchWithAuth(`${API_BASE_URL}/init/`);
                    if (initRes.ok) {
                        initData = await initRes.json();
                    }
                } catch (e) {
                    console.warn('⚠️ [Init] Combined endpoint failed, falling back to individual calls');
                }

                let currentUserData, rooms, convs, friendsData;

                if (initData) {
                    // ✅ Combined endpoint başarılı — tek istekte tüm veri geldi
                    currentUserData = initData.user;
                    rooms = initData.servers;
                    convs = initData.conversations;
                    friendsData = initData.friends;
                    // Server order & maintenance da init'ten geliyor
                    if (initData.server_order) {
                        setServerOrder(initData.server_order);
                    }
                    if (initData.maintenance?.is_maintenance) {
                        setMaintenanceMode({
                            message: initData.maintenance.message || 'System maintenance in progress',
                            endTime: initData.maintenance.estimated_end,
                            level: 'info'
                        });
                    }
                } else {
                    // ⚡ Fallback: Eski 5-istek yöntemi (combined endpoint yoksa)
                    const [rooms_, convs_, friendsData_, currentUserData_] = await Promise.all([
                        fetchWithAuth(ROOM_LIST_URL).then(r => r.json()),
                        fetchWithAuth(`${CONVERSATION_LIST_URL}?username=${encodeURIComponent(currentUsername)}`).then(r => r.json()),
                        fetchWithAuth(`${API_BASE_URL}/friends/list/`).then(r => r.json()),
                        fetchWithAuth(`${API_BASE_URL}/users/me/`).then(r => r.json()),
                    ]);
                    currentUserData = currentUserData_;
                    rooms = rooms_;
                    convs = convs_;
                    friendsData = friendsData_;
                }

                const currentUser = {
                    username: currentUserData?.username || username,
                    email: currentUserData?.email || '',
                    avatar: currentUserData?.avatar || null,
                    status_message: currentUserData?.status_message || '',
                    friend_code: currentUserData?.friend_code || '0000',
                    social_links: currentUserData?.social_links || {},
                    coins: currentUserData?.coins || 0,
                    xp: currentUserData?.xp || 0,
                    level: currentUserData?.level || 1,
                    status: 'online',
                    role: currentUserData?.role || 'member',
                    is_whitelisted: currentUserData?.is_whitelisted || false
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
            } catch (e) { console.error("Init Data Error", e); setAuthError("Veriler yüklenemedi."); fetchingInitRef.current = false; }
        };
        fetchInit();
    }, [isAuthenticated, isInitialDataLoaded, fetchWithAuth]);

    // 🔥 Sunucu sırasını yükle (sadece fallback — combined init yoksa veya güncellenirse)
    useEffect(() => {
        // ⚡ Combined init zaten server_order yüklüyor — duplicate fetch'i önle
        if (isInitialDataLoaded) return;

        const fetchServerOrder = async () => {
            try {
                const res = await fetchWithAuth(`${API_BASE_URL}/user/server-order/`);
                if (res.ok) {
                    const data = await res.json();
                    setServerOrder(data.server_order || []);
                }
            } catch (error) {
                console.error('Server order fetch error:', error);
            }
        };

        if (username) {
            fetchServerOrder();
        }
    }, [username, fetchWithAuth, isInitialDataLoaded]);

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

    // � Server Members - Cache destekli (aynı sunucuda oda değiştirirken tekrar fetch etmez)
    const fetchServerMembersById = useCallback(async (serverId, forceRefresh = false) => {
        if (!serverId) {
            setServerMembers([]);
            return;
        }

        // 🚀 Cache kontrolü — 2 dakika geçerli
        const cached = serverMembersCacheRef.current[serverId];
        if (!forceRefresh && cached && (Date.now() - cached.timestamp < 120000)) {
            setServerMembers(cached.members);
            return;
        }

        try {
            const res = await fetchWithAuth(`${API_BASE_URL}/servers/${serverId}/members/`);
            if (res.ok) {
                const members = await res.json();
                // Cache'e kaydet
                serverMembersCacheRef.current[serverId] = { members, timestamp: Date.now() };
                setServerMembers(members);
            } else {
                setServerMembers([]);
            }
        } catch (error) {
            console.error('❌ Server members fetch error:', error);
            setServerMembers([]);
        }
    }, [fetchWithAuth]);

    // 🔥 YENİ: Sunucu seçildiğinde üyeleri yükle + ilk kanalı otomatik aç
    const handleServerSelect = useCallback((server) => {
        setSelectedServer(server);
        fetchServerMembersById(server.id);

        // 🔥 FIX: Sunucuya girince ilk metin kanalını otomatik aç
        // Sunucunun metadata'sında default_channel_slug varsa onu kullan
        const defaultSlug = server.metadata?.default_channel_slug;
        let selectedRoom = null;

        if (server.categories && Array.isArray(server.categories)) {
            for (const cat of server.categories) {
                if (cat.rooms && Array.isArray(cat.rooms)) {
                    for (const room of cat.rooms) {
                        // Önce default channel'ı ara
                        if (defaultSlug && room.slug === defaultSlug) {
                            selectedRoom = room;
                            break;
                        }
                        // İlk metin kanalını kaydet (voice olmayan)
                        if (!selectedRoom && room.room_type !== 'voice') {
                            selectedRoom = room;
                        }
                    }
                    if (selectedRoom && defaultSlug && selectedRoom.slug === defaultSlug) break;
                }
            }
        }

        if (selectedRoom) {
            setActiveChat('room', selectedRoom.slug, null);
        } else {
            // Kanal bulunamadıysa server modunda kal
            setActiveChat('server', server.id, null);
        }
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

    // 🆕 Maintenance Mode Check — Initial check is done by combined init, this is for periodic polling
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

        // ⚡ İlk kontrol combined init'ten geliyor, sadece 5dk'da bir poll yap
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
                return;
            }

            try {

                // 🔥 FIX: Electron'da app.getVersion() kullan, fallback olarak VITE_APP_VERSION
                let currentVersion = import.meta.env.VITE_APP_VERSION || '1.1.203';

                // Electron'da doğru versiyonu al
                if (window.electron?.getAppVersion) {
                    try {
                        currentVersion = await window.electron.getAppVersion();
                    } catch (e) {
                        console.warn('⚠️ Electron version alınamadı:', e);
                    }
                }

                // 🔥 R2 CDN'den son versiyonu kontrol et
                const res = await fetch('https://media.pawscord.com/builds/version.json');

                if (!res.ok) {
                    console.warn('⚠️ version.json alınamadı:', res.status);
                    return;
                }

                const data = await res.json();
                const latestVersion = data.latest_version;

                // Versiyon karşılaştırması - semantic versioning
                const isNewer = compareVersions(latestVersion, currentVersion);

                if (latestVersion && isNewer) {
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
        if (!isInitialDataLoaded || !activeChat.id || activeChat.type === 'friends' || activeChat.type === 'welcome' || activeChat.type === 'server') return;


        // 🔥 CRITICAL: İşlemi iptal etmek için flag (cleanup için)
        let isCancelled = false;

        const key = activeChat.type === 'room' ? `room-${activeChat.id}` : `dm-${activeChat.id}`;
        const cached = historyCacheRef.current[key];

        if (cached?.messages?.length > 0) {
            // ✅ Cache varsa SADECE cache'i göster, API'ye GITME
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
        };
    }, [activeChat.id, activeChat.type, isInitialDataLoaded, connectWebSocket]);
    // ⚠️ fetchMessageHistory dependency'den KALDIRILDI - useCallback değil, fonksiyon tanımı
    // connectWebSocket useCallback olduğu için güvenle eklenebilir

    // � PERF: server_structure_update is now handled directly in StatusWS onmessage handler above
    // This duplicate useEffect was causing EXTRA API calls on every structure update


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

    // ⌨️ Keyboard Shortcuts — delegated to useKeyboardShortcuts hook
    useKeyboardShortcuts({
        onQuickSwitcher: () => toggleModal('quickSwitcher'),
        onCommandList: () => toggleModal('keyboardShortcuts'),
        onCommandPalette: () => toggleModal('commandPalette'),
        onSettings: () => toggleModal('userSettings'),
        onEscape: () => { if (modals.featureHub) closeModal('featureHub'); },
    });

    // Global Status WebSocket
    useEffect(() => {
        if (!isAuthenticated || !isInitialDataLoaded) return;

        // Load Theme on Startup
        const saved = loadSavedTheme();
        setCurrentTheme(saved);

        // Token yoksa WebSocket acma
        const currentToken = tokenRef.current;
        if (!currentToken) {
            console.warn('[StatusWS] No token available, skipping WebSocket connection');
            return;
        }

        let intentionalClose = false;
        let reconnectAttempts = 0;
        const MAX_RECONNECT_ATTEMPTS = 10;

        const createSocket = () => {
            const tok = tokenRef.current || currentToken;
            const currentUser = usernameRef.current || username;
            const url = `${WS_PROTOCOL}://${API_HOST}/ws/status/?username=${encodeURIComponent(currentUser)}&token=${tok}`;

            let socket;
            try {
                socket = new WebSocket(url);
            } catch (err) {
                console.error('[StatusWS] WebSocket creation failed:', err);
                return null;
            }

            socket.onopen = () => {
                setGlobalWsConnected(true);
                reconnectAttempts = 0; // Reset on successful connection
            };

            socket.onerror = (error) => {
                console.error('[StatusWS] WebSocket error:', error);
            };

            socket.onclose = (event) => {
                setGlobalWsConnected(false);
                // Auto-reconnect after 5s if NOT intentional close
                if (!intentionalClose && event.code !== 1000 && event.code !== 1001) {
                    if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
                        console.warn(`[StatusWS] Max reconnect attempts (${MAX_RECONNECT_ATTEMPTS}) reached, giving up`);
                        return;
                    }
                    reconnectAttempts++;
                    const delay = Math.min(5000 * Math.pow(2, reconnectAttempts - 1), 60000); // 5s, 10s, 20s, 40s, 60s max
                    statusWsReconnectRef.current = setTimeout(() => {
                        if (!intentionalClose) {
                            const newSocket = createSocket();
                            if (newSocket) statusWsRef.current = newSocket;
                        }
                    }, delay);
                }
            };

            socket.onmessage = (e) => {
                try {
                    const data = JSON.parse(e.data);

                    // Forward ALL messages to GlobalWebSocketContext
                    forwardToGlobalContext(data);

                    if (data.type === 'online_user_list_update') {
                        const onlineUsernames = Array.isArray(data.users)
                            ? data.users.map(u => typeof u === 'string' ? u : u.username || u)
                            : [];
                        setOnlineUsers(onlineUsernames);
                    }

                    if (data.type === 'voice_users_update') {
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

                    if (data.type === 'user_profile_update' && data.user_data) {
                        const updatedUser = data.user_data;
                        if (updatedUser.username === username) {
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
                        setAllUsers(prevUsers => prevUsers.map(u => {
                            if (u.username === updatedUser.username) {
                                return { ...u, ...updatedUser };
                            }
                            return u;
                        }));
                    }

                    if (data.type === 'global_message_notification' && data.username !== username) {
                        const key = data.room_slug ? `room-${data.room_slug}` : `dm-${data.conversation_id}`;
                        const chat = activeChatRef.current;
                        const currentKey = chat.type === 'room' ? `room-${chat.id}` : `dm-${chat.id}`;
                        if (key !== currentKey) incrementUnread(key);
                    }

                    if (data.type === 'server_structure_update') {
                        if (data.categories && Array.isArray(data.categories)) {
                            setCategories(data.categories);
                        } else {
                            fetchWithAuth(ROOM_LIST_URL).then(r => r.json()).then(rooms => setCategories(rooms)).catch(console.error);
                        }
                    }
                } catch (parseError) {
                    console.error('[StatusWS] Failed to parse message:', parseError);
                }
            };

            return socket;
        };

        const socket = createSocket();
        if (socket) statusWsRef.current = socket;

        return () => {
            intentionalClose = true;
            clearTimeout(statusWsReconnectRef.current);
            try {
                if (statusWsRef.current) statusWsRef.current.close(1000, 'Component unmount');
            } catch (e) { /* Ignore */ }
        };
    }, [isAuthenticated, isInitialDataLoaded]);

    // 🎤 SESLİ SOHBETE GİRİNCE CHAT ALANINI OTOMATİK DEĞİŞTİR
    useEffect(() => {
        if (isInVoice && currentVoiceRoom) {
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
            setMessages([]);
            setHasMoreMessages(false);
            return;
        }

        setMessageHistoryLoading(true);
        const urlBase = activeChat.type === 'room' ? MESSAGE_HISTORY_ROOM_URL : MESSAGE_HISTORY_DM_URL;
        const key = activeChat.type === 'room' ? `room-${activeChat.id}` : `dm-${activeChat.id}`;

        // 🔥 FIX: Cache'i ARTIK TEMİZLEME - activeChat effect'inde cache varsa bu fonksiyon zaten çağrılmıyor
        // Sadece ilk yüklemede (cache yoksa) buraya gelir, o yüzden cache temizlemeye gerek yok
        // if (isInitial) {
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

                let combinedMessages = newMsgs;
                if (isInitial) {
                    setMessages(newMsgs);
                    setTimeout(() => scrollToBottom('auto'), 100);
                } else {
                    setMessages(prev => {
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
            }
        } catch (e) {
            console.error('❌ [fetchMessageHistory] Error:', e);
        }
        setMessageHistoryLoading(false);
    };

    const handleLogin = async (u, p) => {
        try {
            const res = await fetch(LOGIN_URL, {
                method: 'POST',
                body: JSON.stringify({ username: u, password: p }),
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await res.json();

            if (res.ok) {
                login(data.access, data.refresh);
            } else {
                console.error('❌ [Auth] Login failed:', data);

                // 🔐 2FA KONTROLÜ - Backend 2FA gerektiriyorsa
                if (res.status === 401 && data.requires_2fa && data.temp_token) {
                    // 2FA sayfasına yönlendir - temp_token'ı URL'de taşı
                    window.location.href = `/#/2fa-login?temp_token=${encodeURIComponent(data.temp_token)}`;
                    return;
                }

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
            const res = await fetch(REGISTER_URL, {
                method: 'POST',
                body: JSON.stringify({ username: u, email: e, password: p }),
                headers: { 'Content-Type': 'application/json' }
            });


            if (res.status === 201) {
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
        // 🔥 FIX: 5MB altı dosyalar için progress bar gösterme
        const showProgress = file.size >= 5 * 1024 * 1024;
        if (showProgress) {
            setIsUploading(true);
            setUploadProgress(0);
        }

        const target = targetOverride || activeChat;
        const tempId = getTemporaryId();

        try {
            const hash = await calculateFileHash(file);
            const contentType = file.type || 'application/octet-stream';

            // 🚀 R2 MULTIPART UPLOAD - Çok daha hızlı!
            const CHUNK_SIZE = 10 * 1024 * 1024; // 10 MB (R2 min: 5MB)
            const PARALLEL_UPLOADS = 5; // 5 part aynı anda
            const totalParts = Math.ceil(file.size / CHUNK_SIZE);


            // 1️⃣ Multipart upload başlat
            const initRes = await fetchWithAuth(`${API_BASE_URL}/upload/multipart/init/`, {
                method: 'POST',
                body: JSON.stringify({
                    file_name: file.name,
                    file_size: file.size,
                    content_type: contentType,
                    file_hash: hash,
                    room_slug: target.type === 'room' ? target.id : null,
                    conversation_id: target.type === 'dm' ? target.id : null,
                    temp_id: tempId,
                    is_voice_message: isVoice ? 'true' : 'false',
                    duration: duration.toString()
                })
            });

            const initData = await initRes.json();

            // Dosya zaten varsa — backend mesajı oluşturdu, direkt göster
            if (initData.file_exists) {
                if (showProgress) { setIsUploading(false); setUploadProgress(100); }

                // Backend mesaj verisi döndüyse listeye ekle
                if (initData.id) {
                    if (target.id === activeChat.id) {
                        setMessages(prev => {
                            if (initData.temp_id) {
                                const tempIndex = prev.findIndex(msg => msg.temp_id === initData.temp_id);
                                if (tempIndex !== -1) {
                                    const newMessages = [...prev];
                                    newMessages[tempIndex] = initData;
                                    return newMessages;
                                }
                            }
                            if (prev.some(msg => msg.id === initData.id)) return prev;
                            return [...prev, initData];
                        });
                        scrollToBottom('smooth');
                    }
                }
                return;
            }

            const { upload_id, key } = initData;

            // 2️⃣ Her part için backend üzerinden R2'ye yükle (ETag almak için)
            const parts = [];
            let completedParts = 0;

            const uploadPart = async (partNumber) => {
                const start = (partNumber - 1) * CHUNK_SIZE;
                const end = Math.min(start + CHUNK_SIZE, file.size);
                const chunk = file.slice(start, end);


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
                if (showProgress) setUploadProgress(progress);


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
            if (showProgress) setUploadProgress(100);


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

        if (showProgress) setIsUploading(false);
    }, [activeChat, username, fetchWithAuth]);

    const handleChatDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounterRef.current = 0; // 🔥 FIX: Drop sonrası counter sıfırla
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            // 🔥 FIX: TÜM dosyaları MessageInput'a pendingFiles olarak gönder
            const files = Array.from(e.dataTransfer.files);
            const processedFiles = files.map(file => ({
                id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                file,
                name: file.name,
                size: file.size,
                type: file.type,
                previewUrl: (file.type.startsWith('image/') || file.type.startsWith('video/'))
                    ? URL.createObjectURL(file)
                    : null
            }));
            setPendingFilesFromDrop(processedFiles);
        }
    };
    const handleSidebarDrop = (e, target) => {
        e.preventDefault(); e.stopPropagation(); setDropTarget(null);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const files = Array.from(e.dataTransfer.files);

            // DM'e dosya atıldıysa
            if (target.type === 'dm') {
                const conversation = conversations.find(c => c.id === target.id);
                if (conversation) {
                    const otherUser = conversation.participants.find(p => p.username !== username);
                    if (otherUser) {
                        handleDMClick(otherUser.username);
                        // 🔥 FIX: TÜM dosyaları sırayla yükle
                        setTimeout(async () => {
                            for (const file of files) {
                                await uploadFile(file, false, 0, target);
                            }
                        }, 300);
                    }
                }
            }
            // Odaya dosya atıldıysa
            else if (target.type === 'room') {
                const room = roomsWithCategories.find(r => r.room_slug === target.id);
                if (room) {
                    handleRoomClick(target.id);
                    // 🔥 FIX: TÜM dosyaları sırayla yükle
                    setTimeout(async () => {
                        for (const file of files) {
                            await uploadFile(file, false, 0, target);
                        }
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

    // ✅ Read Receipt: batch mark messages as read when they become visible
    const readReceiptBufferRef = useRef([]);
    const readReceiptTimerRef = useRef(null);
    const handleMessageVisible = useCallback((messageId) => {
        readReceiptBufferRef.current.push(messageId);
        if (readReceiptTimerRef.current) return; // already scheduled
        readReceiptTimerRef.current = setTimeout(async () => {
            const ids = [...new Set(readReceiptBufferRef.current)];
            readReceiptBufferRef.current = [];
            readReceiptTimerRef.current = null;
            if (ids.length === 0) return;
            try {
                const res = await fetchWithAuth(`${API_BASE_URL}/messages/mark_read/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message_ids: ids })
                });
                if (res.ok) {
                    setMessages(prev => prev.map(m =>
                        ids.includes(m.id) ? { ...m, read_by: [...(m.read_by || []), username] } : m
                    ));
                }
            } catch (e) { /* silent */ }
        }, 1500); // batch every 1.5s
    }, [fetchWithAuth, username]);

    const handleDeleteMessage = async (messageId) => {
        if (!await confirmDialog("Bu mesajı silmek istediğine emin misin?")) return;
        try {
            const res = await fetchWithAuth(`${API_BASE_URL}/messages/${messageId}/delete/`, { method: 'DELETE' });
            if (res.ok) setMessages(prev => prev.filter(m => m.id !== messageId));
        } catch (e) { console.error(e); }
    };

    // 📌 Pin/Unpin message handler
    const handleTogglePin = async (messageId) => {
        try {
            const res = await fetchWithAuth(`${API_BASE_URL}/messages/${messageId}/pin/`, { method: 'POST' });
            if (res.ok) {
                const data = await res.json();
                const isPinned = data.is_pinned ?? data.pinned ?? !messages.find(m => m.id === messageId)?.is_pinned;
                setMessages(prev => prev.map(m =>
                    m.id === messageId ? { ...m, is_pinned: isPinned } : m
                ));
                if (isPinned) {
                    setPinnedMessages(prev => {
                        const msg = messages.find(m => m.id === messageId);
                        if (msg && !prev.some(p => p.id === messageId)) return [...prev, { ...msg, is_pinned: true }];
                        return prev;
                    });
                    toast.success('📌 Mesaj sabitlendi');
                } else {
                    setPinnedMessages(prev => prev.filter(p => p.id !== messageId));
                    toast.success('📌 Sabitleme kaldırıldı');
                }
            }
        } catch (e) {
            console.error('Pin toggle error:', e);
            toast.error('❌ Sabitleme hatası');
        }
    };

    const handleHideConversation = async (conversationId) => {
        if (!await confirmDialog("Bu sohbeti listenizden gizlemek istiyor musunuz?")) return;
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
        if (!await confirmDialog("⚠️ ADMİN: Bu konuşmayı HER İKİ TARAFTAN KALICI OLARAK silmek istediğinize emin misiniz?\n\nBu işlem GERİ ALINAMAZ!")) return;
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
                        }
                    } catch (e) {
                        console.error('Move user error:', e);
                    }
                }
                break;

            case 'kick':
                // Kanaldan at (admin/mod)
                if (isAdmin && await confirmDialog(`${user.username} kullanıcısını kanaldan atmak istediğine emin misin?`)) {
                    try {
                        const res = await fetchWithAuth(`${API_BASE_URL}/voice/kick_user/`, {
                            method: 'POST',
                            body: JSON.stringify({
                                username: user.username,
                                room: currentVoiceRoom
                            })
                        });
                        if (res.ok) {
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
                if (await confirmDialog(`${user.username} ile arkadaşlığı sonlandırmak istediğinize emin misiniz?`)) {
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
                if (await confirmDialog(`${user.username} kullanıcısını engellemek istediğinize emin misiniz?`)) {
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
            <Suspense fallback={<LoadingSpinner size="large" text="Yükleniyor..." />}>
                <LoginPage onLogin={handleLogin} onRegister={handleRegister} error={authError} setAuthError={setAuthError} />
            </Suspense>
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

    // 🔥 FIX: Invite code ekranı (/#/invite/CODE)
    if (showInviteCode) {
        return (
            <Suspense fallback={<LoadingSpinner size="large" text="Davet yükleniyor..." />}>
                <InviteCodeScreen
                    inviteCode={showInviteCode}
                    fetchWithAuth={fetchWithAuth}
                    apiBaseUrl={API_BASE_URL}
                    onClose={() => {
                        setShowInviteCode(null);
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

            {/* All modal renders are in AppModals */}
            <AppModals
                fetchWithAuth={fetchWithAuth}
                activeChat={activeChat}
                username={username}
                sendMessage={sendMessage}
                sendSignal={sendSignal}
                ws={ws}
                currentUserProfile={currentUserProfile} setCurrentUserProfile={setCurrentUserProfile}
                currentTheme={currentTheme} setCurrentTheme={setCurrentTheme}
                soundSettings={soundSettings} setSoundSettings={setSoundSettings}
                encryptionKeys={encryptionKeys} currentKeyId={currentKeyId} setEncryptionKey={setEncryptionKey}
                chartSymbol={chartSymbol} setChartSymbol={setChartSymbol}
                serverToEdit={serverToEdit} setServerToEdit={setServerToEdit}
                serverMembers={serverMembers}
                friendsList={friendsList}
                conversations={conversations} categories={categories} allUsers={allUsers}
                pinnedMessages={pinnedMessages}
                isSummaryLoading={isSummaryLoading} summaryResult={summaryResult}
                zoomedImage={zoomedImage} setZoomedImage={setZoomedImage}
                galleryData={galleryData} setGalleryData={setGalleryData}
                viewingProfile={viewingProfile} setViewingProfile={setViewingProfile}
                isAdmin={isAdmin}
                richTextRef={richTextRef}
                logout={logout}
                getDeterministicAvatar={getDeterministicAvatar}
                handleSendSnippet={handleSendSnippet}
                handleDMClick={handleDMClick}
                setActiveChat={setActiveChat}
                setConversations={setConversations}
                isMuted={isMuted} isDeafened={isDeafened}
                toggleMute={toggleMute} toggleDeafened={toggleDeafened}
            />

            {/* Mobile overlay for left sidebar */}
            {isMobile && isLeftSidebarVisible && (
                <div style={styles.mobileOverlay} onClick={() => setIsLeftSidebarVisible(false)} />
            )}

            {/* Mobile overlay for right sidebar */}
            {isMobile && isRightSidebarVisible && (
                <div style={styles.mobileOverlay} onClick={() => setIsRightSidebarVisible(false)} />
            )}

            {/* 🌐 Connection Status Bar */}
            <ConnectionStatusBar />

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
                        <Suspense fallback={<LoadingSpinner size="medium" text="Kanallar yükleniyor..." />}>
                            <RoomList
                                onFriendsClick={() => setActiveChat('friends', 'friends')}
                                onRoomSelect={handleRoomChange}
                                onDMSelect={(id, targetUsername) => setActiveChat('dm', id, targetUsername)}
                                onWelcomeClick={handleWelcomeClick}
                                setIsLeftSidebarVisible={setIsLeftSidebarVisible}
                                onProfileClick={() => openModal('profilePanel')}
                                onViewUserProfile={(username) => {
                                    const user = allUsers.find(u => u.username === username);
                                    if (user) setViewingProfile(user);
                                }}
                                onOpenStore={() => openModal('store')}
                                onOpenServerSettings={(server) => setServerToEdit(server)}
                                categories={sortedServers}
                                onServerDragStart={handleServerDragStart}
                                onServerDragOver={handleServerDragOver}
                                onServerDragEnd={handleServerDragEnd}
                                onServerDrop={handleServerDrop}
                                onMoveServer={handleMoveServer}
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
                                apiBaseUrl={ABSOLUTE_HOST_URL}
                                fetchWithAuth={fetchWithAuth}
                                onHideConversation={handleHideConversation}
                                handleDrop={handleSidebarDrop}
                                dropTarget={dropTarget}
                                setDropTarget={setDropTarget}
                                isDragging={isDragging}
                                onOpenCreateGroup={() => openModal('groupModal')}
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
                                onUpdateClick={() => openModal('downloadModal')}
                                // 🔥 Analytics System
                                onOpenAnalytics={() => openModal('analytics')}
                                onOpenAdminPanel={() => openModal('adminPanel')}
                                // 💰 Payment & Engagement System (2026-01-19)
                                onOpenPaymentPanel={() => openModal('paymentPanel')}
                                onOpenStoreModal={() => openModal('storeModal')}
                                onOpenDailyRewards={() => openModal('dailyRewards')}
                                onOpenAPIUsage={() => openModal('aPIUsagePanel')}
                                onOpenExportJobs={() => openModal('exportJobsPanel')}
                                onOpenScheduledAnnouncements={() => openModal('scheduledAnnouncements')}
                                // 🎮 New Features (2026-01-28)
                                onOpenMiniGames={() => openModal('miniGames')}
                                onOpenProjectCollaboration={() => openModal('projectCollaboration')}
                                onOpenAvatarStudio={() => openModal('avatarStudio')}
                                // 🔥 YENİ: Sunucu seçildiğinde sağ panelde üyeleri göster
                                onServerSelect={handleServerSelect}
                            />
                        </Suspense>
                    </div>
                )}

                <div style={styles.mainContent}>
                    {/* ✨ STICKY BANNER */}
                    <div style={{ position: 'absolute', top: 60, left: 0, right: 0, zIndex: 90 }}>
                        <Suspense fallback={null}>
                            <StickyMessageBanner
                                message={stickyMessage?.message}
                                type={stickyMessage?.type}
                                onDismiss={() => setStickyMessage(null)}
                            />
                        </Suspense>
                    </div>
                    {activeChat.type === 'friends' ? (
                        <div style={{ width: '100%', height: '100%', paddingTop: mobileWebPadding }}>
                            <Suspense fallback={<LoadingSpinner size="medium" text="Arkadaşlar yükleniyor..." />}>
                                <FriendsTab
                                    fetchWithAuth={fetchWithAuth}
                                    apiBaseUrl={API_BASE_URL}
                                    onStartDM={handleDMClick}
                                    getDeterministicAvatar={getDeterministicAvatar}
                                    onClose={() => setActiveChat('welcome', 'welcome')}
                                    onPendingCountChange={setPendingFriendRequests}
                                    onlineUsers={onlineUsers} // 🔥 DÜZELTME: Gerçek zamanlı online durumu için
                                />
                            </Suspense>
                        </div>
                    ) : activeChat.type === 'welcome' ? (
                        <div style={{ width: '100%', height: '100%' }}>
                            <Suspense fallback={<LoadingSpinner size="medium" text="Yükleniyor..." />}>
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
                                        openModal('cinema');
                                        if (isMobile) setIsLeftSidebarVisible(false);
                                    }}
                                />
                            </Suspense>
                        </div>
                    ) : activeRoomType === 'kanban' ? (
                        <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                            <div style={styles.chatHeader}><h2># {chatTitle} (Pano)</h2></div>
                            <Suspense fallback={<LoadingSpinner size="medium" text="Pano yükleniyor..." />}>
                                <KanbanBoard roomSlug={activeChat.id} apiBaseUrl={ABSOLUTE_HOST_URL} fetchWithAuth={fetchWithAuth} />
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
                            onDragOver={(e) => { e.preventDefault(); }}
                            onDragEnter={(e) => { e.preventDefault(); dragCounterRef.current++; setIsDragging(true); }}
                            onDragLeave={(e) => { e.preventDefault(); dragCounterRef.current--; if (dragCounterRef.current <= 0) { dragCounterRef.current = 0; setIsDragging(false); } }}
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
                                        {isConnected ? '✓' : '✗'}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: isMobile ? '5px' : '10px', alignItems: 'center', flexWrap: isMobile ? 'nowrap' : 'wrap', position: 'relative' }}>
                                    {/* 🔍 Arama */}
                                    <form onSubmit={handleSearchMessages} style={styles.searchForm}>
                                        <input type="text" placeholder="Ara..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={styles.searchInput} ref={searchInputRef} />
                                        <FaSearch style={styles.searchIcon} />
                                    </form>

                                    {/* ⌨️ Gelişmiş Yazıyor Göstergesi */}
                                    {!isMobile && activeTypingUsers.length > 0 && (
                                        <TypingIndicatorEnhanced users={activeTypingUsers} />
                                    )}

                                    {/* 🔔 Bildirimler (Her zaman görünür) */}
                                    <button
                                        onClick={() => toggleModal('notifications')}
                                        style={{
                                            ...styles.iconButton,
                                            color: modals.notifications ? '#5865f2' : '#b9bbbe',
                                            position: 'relative'
                                        }}
                                        title="Bildirimler"
                                    >
                                        <FaBell />
                                    </button>
                                    {modals.notifications && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '54px',
                                            right: '20px',
                                            zIndex: 1000
                                        }}>
                                            <Suspense fallback={<LoadingSpinner size="small" text="" />}>
                                                <NotificationDropdown
                                                    currentUser={username}
                                                    onClose={() => closeModal('notifications')}
                                                    fetchWithAuth={fetchWithAuth}
                                                    apiBaseUrl={ABSOLUTE_HOST_URL}
                                                />
                                            </Suspense>
                                        </div>
                                    )}

                                    {/* 🔥 AÇILIR MENÜ BUTONU */}
                                    <div className="toolbar-menu-container" style={{ position: 'relative' }}>
                                        <button
                                            onClick={() => toggleModal('toolbarMenu')}
                                            style={{
                                                ...styles.iconButton,
                                                color: modals.toolbarMenu ? '#5865f2' : '#b9bbbe',
                                                fontSize: '1.2em',
                                                fontWeight: 'bold'
                                            }}
                                            title="Daha Fazla"
                                        >
                                            ⋮
                                        </button>

                                        {/* 🔥 AÇILIR MENÜ - TOOLBAR ÖZELLİKLERİ */}
                                        {modals.toolbarMenu && (
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
                                                            openModal('encModal');
                                                            closeModal('toolbarMenu');
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
                                                        toggleModal('pinned');
                                                        closeModal('toolbarMenu');
                                                    }}
                                                    style={{
                                                        ...styles.menuItem,
                                                        color: modals.pinned ? '#f5a524' : '#dcddde'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#5865f2';
                                                        e.currentTarget.style.color = '#ffffff';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = 'transparent';
                                                        e.currentTarget.style.color = modals.pinned ? '#f5a524' : '#dcddde';
                                                    }}
                                                >
                                                    <FaThumbtack />
                                                    <span>Sabitli Mesajlar</span>
                                                </button>

                                                {/* 🔗 Link Kopyala */}
                                                <button
                                                    onClick={() => {
                                                        handleCopyLink();
                                                        closeModal('toolbarMenu');
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
                                                        closeModal('toolbarMenu');
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

                                                {/* 📬 Bahsedilmeler (Mentions Inbox) */}
                                                <button
                                                    onClick={() => {
                                                        openModal('mentionsInbox');
                                                        closeModal('toolbarMenu');
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
                                                    <FaInbox />
                                                    <span>Bahsedilmeler</span>
                                                </button>

                                                {/* 🎭 Durumunu Ayarla */}
                                                <button
                                                    onClick={() => {
                                                        openModal('customStatus');
                                                        closeModal('toolbarMenu');
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
                                                    <FaSmile />
                                                    <span>Durumunu Ayarla</span>
                                                </button>

                                                <div style={{ height: '1px', backgroundColor: '#40444b', margin: '4px 0' }} />

                                                {/* 🎬 Sinema */}
                                                <button
                                                    onClick={() => {
                                                        openModal('cinema');
                                                        closeModal('toolbarMenu');
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
                                                        openModal('dJ');
                                                        closeModal('toolbarMenu');
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
                                                        openModal('whiteboard');
                                                        closeModal('toolbarMenu');
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
                                                            openModal('soundboard');
                                                            closeModal('toolbarMenu');
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
                                                                closeModal('toolbarMenu');
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
                                                                closeModal('toolbarMenu');
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
                                                                        closeModal('toolbarMenu');
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

                                                {/* 🚀 TÜM ÖZELLİKLER - Feature Hub */}
                                                <div style={{ height: '1px', backgroundColor: '#40444b', margin: '4px 0' }} />
                                                <button
                                                    onClick={() => {
                                                        openModal('featureHub');
                                                        closeModal('toolbarMenu');
                                                    }}
                                                    style={{
                                                        ...styles.menuItem,
                                                        color: '#5865f2',
                                                        fontWeight: 'bold'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#5865f2';
                                                        e.currentTarget.style.color = '#ffffff';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = 'transparent';
                                                        e.currentTarget.style.color = '#5865f2';
                                                    }}
                                                >
                                                    🚀
                                                    <span>Tüm Özellikler</span>
                                                </button>
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
                                <Suspense fallback={<p style={styles.systemMessage}>Mesajlar yükleniyor...</p>}>
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
                                                    onTogglePin={handleTogglePin}
                                                    onVisible={handleMessageVisible}
                                                />
                                            )}
                                        />
                                    ) : (
                                        // Standard rendering for <50 messages
                                        <>
                                            {(() => {
                                                // 🖼️ WhatsApp-style gallery grouping
                                                const elements = [];
                                                let i = 0;
                                                while (i < optimizedMessages.length) {
                                                    const msg = optimizedMessages[i];
                                                    const key = msg.id || msg.temp_id || i;
                                                    const prevMsg = i > 0 ? optimizedMessages[i - 1] : null;
                                                    const showDateDivider = !prevMsg || (
                                                        msg.timestamp && prevMsg.timestamp &&
                                                        new Date(msg.timestamp).toDateString() !== new Date(prevMsg.timestamp).toDateString()
                                                    );

                                                    // Check if this starts a gallery group
                                                    if (isImageOnlyMessage(msg)) {
                                                        const galleryMsgs = [msg];
                                                        let j = i + 1;
                                                        while (j < optimizedMessages.length &&
                                                            isImageOnlyMessage(optimizedMessages[j]) &&
                                                            optimizedMessages[j].username === msg.username &&
                                                            // Max 30 saniye aralık
                                                            msg.timestamp && optimizedMessages[j].timestamp &&
                                                            Math.abs(new Date(optimizedMessages[j].timestamp) - new Date(msg.timestamp)) < 300000
                                                        ) {
                                                            galleryMsgs.push(optimizedMessages[j]);
                                                            j++;
                                                        }

                                                        if (galleryMsgs.length >= 2) {
                                                            // 🖼️ Gallery render - WhatsApp style grid
                                                            const galleryKey = galleryMsgs.map(m => m.id || m.temp_id).join('-');
                                                            elements.push(
                                                                <React.Fragment key={`gallery-${galleryKey}`}>
                                                                    {showDateDivider && msg.timestamp && (
                                                                        <MessageDateDivider date={msg.timestamp} />
                                                                    )}
                                                                    <ImageGalleryGroup
                                                                        messages={galleryMsgs}
                                                                        currentUser={username}
                                                                        absoluteHostUrl={ABSOLUTE_HOST_URL}
                                                                        isAdmin={isAdmin}
                                                                        onOpenGallery={(images, startIndex) => setGalleryData({ images, startIndex })}
                                                                        onViewProfile={(u) => setViewingProfile(allUsers.find(usr => usr.username === u))}
                                                                        onDelete={handleDeleteMessage}
                                                                        allUsers={allUsers}
                                                                        getDeterministicAvatar={getDeterministicAvatar}
                                                                        fetchWithAuth={fetchWithAuth}
                                                                        onVisible={handleMessageVisible}
                                                                    />
                                                                </React.Fragment>
                                                            );
                                                            i = j;
                                                            continue;
                                                        }
                                                    }

                                                    // Normal single message
                                                    elements.push(
                                                        <React.Fragment key={key}>
                                                            {showDateDivider && msg.timestamp && (
                                                                <MessageDateDivider date={msg.timestamp} />
                                                            )}
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
                                                                onTogglePin={handleTogglePin}
                                                                onVisible={handleMessageVisible}
                                                            />
                                                        </React.Fragment>
                                                    );
                                                    i++;
                                                }
                                                return elements;
                                            })()}
                                            <div ref={messagesEndRef} style={{ float: "left", clear: "both", height: 1 }} />
                                        </>
                                    )}
                                </Suspense>
                            </div>

                            {/* 🖼️ Drag overlay - Tüm chat alanını kaplar */}
                            {isDragging && (
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'rgba(30, 31, 34, 0.9)',
                                    border: '3px dashed #5865f2',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    pointerEvents: 'none',
                                    zIndex: 1000
                                }}>
                                    <div style={{ fontSize: '48px', marginBottom: '12px' }}>📁</div>
                                    <div style={{ color: '#5865f2', fontSize: '1.4em', fontWeight: 'bold' }}>
                                        Dosyaları buraya bırakın
                                    </div>
                                    <div style={{ color: '#b9bbbe', fontSize: '0.9em', marginTop: '6px' }}>
                                        Birden fazla dosya seçebilirsiniz
                                    </div>
                                </div>
                            )}

                            {showScrollToBottom && (
                                <ScrollToBottomButton
                                    onClick={() => { scrollToBottom('smooth'); setShowScrollToBottom(false); }}
                                    unreadCount={0}
                                />
                            )}
                            <div style={{ ...styles.inputContainer, paddingBottom: isNative ? `calc(16px + ${safeAreaBottom})` : (isMobile ? '25px' : '16px') }}>
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
                                <Suspense fallback={<div style={{ padding: '12px', color: '#72767d' }}>Yükleniyor...</div>}>
                                    <MessageInput
                                        onSendMessage={sendMessage}
                                        onFileUpload={uploadFile}
                                        onShowCodeSnippet={() => openModal('snippetModal')}
                                        placeholder={chatTitle
                                            ? `${activeChat.type === 'dm' ? chatTitle : `# ${chatTitle}`} kanalına mesaj gönder`
                                            : 'Mesaj yaz...'}
                                        disabled={isUploading}
                                        fetchWithAuth={fetchWithAuth}
                                        apiBaseUrl={ABSOLUTE_HOST_URL}
                                        activeChat={activeChat}
                                        pendingFilesFromDrop={pendingFilesFromDrop}
                                        onClearPendingFiles={() => setPendingFilesFromDrop([])}
                                    />
                                </Suspense>
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
                                    currentUserProfile={currentUserProfile}
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
            </div >

            {/* 🔥 USER CONTEXT MENU */}
            {
                userContextMenu && (
                    <Suspense fallback={null}>
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
                    </Suspense>
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


// Styles extracted to ./styles/appStyles.js (imported at top)

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


