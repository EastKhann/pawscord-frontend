/**
 * 🚀 Lazy-loaded component imports for App.js
 * Extracted from App.js to reduce file size and improve readability.
 * All components use lazyWithRetry() for code-splitting with auto-retry on chunk failure.
 */
import { lazyWithRetry } from '../utils/lazyWithRetry';

// ⚡ CORE: Message & Chat components
export const Message = lazyWithRetry(() => import('../Message'));
export const VirtualMessageList = lazyWithRetry(
    () => import('../components/chat/VirtualMessageList')
);
export const MessageInput = lazyWithRetry(() => import('../components/chat/MessageInput'));

// ⚡ LAZY: Voice/Video components
export const UserVideoContainer = lazyWithRetry(() => import('../features/UserVideoContainer'));
// 🔥 EAGER: VoiceAudioController must NOT be lazy-loaded — it handles all remote
// audio playback through GainNode chains. If it loads late, users hear nothing.
import VoiceAudioController from '../features/VoiceAudioController';
export { VoiceAudioController };
export const RichTextEditor = lazyWithRetry(() => import('../components/chat/RichTextEditor'));
export const StickyMessageBanner = lazyWithRetry(
    () => import('../components/shared/StickyMessageBanner')
);

// ⚡ LAZY: Auth screens
export const LoginPage = lazyWithRetry(() => import('../pages/LoginPage'));
import WelcomeScreen from '../pages/WelcomeScreen';
export { WelcomeScreen };

// ⚡ LAZY: Modal components
export const ImageModal = lazyWithRetry(() => import('../features/ImageModal'));
export const UserProfileModal = lazyWithRetry(() => import('../UserProfileModal'));
export const PollCreateModal = lazyWithRetry(() => import('../components/chat/PollCreateModal'));
export const CodeSnippetModal = lazyWithRetry(() => import('../components/chat/CodeSnippetModal'));
export const AvatarCropper = lazyWithRetry(() => import('../components/profile/AvatarCropper'));

// --- Ağır Bileşenler (Lazy Load) ---
export const CryptoChartModal = lazyWithRetry(() => import('../features/CryptoChartModal'));
export const CryptoStoreModal = lazyWithRetry(
    () => import('../components/premium/CryptoStoreModal')
);
export const PremiumStoreModal = lazyWithRetry(
    () => import('../components/premium/PremiumStoreModal')
);
export const WhiteboardModal = lazyWithRetry(() => import('../components/media/WhiteboardModal'));
export const SoundboardModal = lazyWithRetry(() => import('../components/media/SoundboardModal'));
export const KanbanBoard = lazyWithRetry(() => import('../components/moderation/KanbanBoard'));
export const SummaryModal = lazyWithRetry(() => import('../features/SummaryModal'));
export const MessageTemplateModal = lazyWithRetry(
    () => import('../components/server/MessageTemplateModal')
);
export const CinemaModal = lazyWithRetry(() => import('../features/CinemaModal'));
export const StickerPicker = lazyWithRetry(() => import('../features/StickerPicker'));
export const GifPicker = lazyWithRetry(() => import('../features/GifPicker'));
export const DJModal = lazyWithRetry(() => import('../components/media/DJModal'));
export const ThemeStoreModal = lazyWithRetry(() => import('../components/premium/ThemeStoreModal'));
export const EncryptionKeyModal = lazyWithRetry(
    () => import('../components/security/EncryptionKeyModal')
);
export const DownloadModal = lazyWithRetry(() => import('../components/shared/DownloadModal'));
export const ServerSettingsModal = lazyWithRetry(
    () => import('../components/server/ServerSettingsModal')
);
export const CreateGroupModal = lazyWithRetry(
    () => import('../components/shared/CreateGroupModal')
);
export const AdminAnalyticsPanel = lazyWithRetry(
    () => import('../components/admin/AdminAnalyticsPanel')
);
export const AdminPanelModal = lazyWithRetry(() => import('../components/admin/AdminPanelModal'));
export const WebhooksPanel = lazyWithRetry(() => import('../components/server/WebhooksPanel'));
export const VanityURLManager = lazyWithRetry(
    () => import('../components/server/VanityURLManager')
);

// 🛡️ MODERATION
export const AutoModerationDashboard = lazyWithRetry(
    () => import('../components/moderation/AutoModerationDashboard')
);
export const AutoModerationPanel = lazyWithRetry(
    () => import('../components/moderation/AutoModerationPanel')
);
export const RaidProtectionPanel = lazyWithRetry(
    () => import('../components/moderation/RaidProtectionPanel')
);
export const ReportSystemPanel = lazyWithRetry(
    () => import('../components/admin/ReportSystemPanel')
);
export const AuditLogPanel = lazyWithRetry(() => import('../components/admin/AuditLogPanel'));
export const UserWarningsPanel = lazyWithRetry(
    () => import('../components/moderation/UserWarningsPanel')
);

// 📚 FEATURE PANELS
export const BookmarkPanel = lazyWithRetry(() => import('../components/chat/BookmarkPanel'));
export const ReadLaterPanel = lazyWithRetry(() => import('../components/chat/ReadLaterPanel'));
export const ChannelPermissionsPanel = lazyWithRetry(
    () => import('../components/server/ChannelPermissionsPanel')
);
export const MessageThreadsPanel = lazyWithRetry(
    () => import('../components/chat/MessageThreadsPanel')
);
export const ModeratorNotesPanel = lazyWithRetry(
    () => import('../components/moderation/ModeratorNotesPanel')
);
export const ServerRolesPanel = lazyWithRetry(
    () => import('../components/server/ServerRolesPanel')
);
export const NotificationPreferencesPanel = lazyWithRetry(
    () => import('../components/notifications/NotificationPreferencesPanel')
);
export const MessageOCRPanel = lazyWithRetry(() => import('../components/chat/MessageOCRPanel'));
export const MassActionsPanel = lazyWithRetry(() => import('../components/admin/MassActionsPanel'));
export const TimeoutMutePanel = lazyWithRetry(
    () => import('../components/moderation/TimeoutMutePanel')
);
export const ServerThemesPanel = lazyWithRetry(
    () => import('../components/server/ServerThemesPanel')
);
export const KeywordMutesPanel = lazyWithRetry(
    () => import('../components/moderation/KeywordMutesPanel')
);
export const WelcomeTemplatesPanel = lazyWithRetry(
    () => import('../components/server/WelcomeTemplatesPanel')
);
export const StickyMessagesPanel = lazyWithRetry(
    () => import('../components/chat/StickyMessagesPanel')
);
export const MessageTemplatesPanel = lazyWithRetry(
    () => import('../components/server/MessageTemplatesPanel')
);
export const MessageExportPanel = lazyWithRetry(
    () => import('../components/chat/MessageExportPanel')
);
export const ArchivedRoomsPanel = lazyWithRetry(
    () => import('../components/server/ArchivedRoomsPanel')
);
export const SlowModePanel = lazyWithRetry(() => import('../components/shared/SlowModePanel'));
export const EmojiManagementPanel = lazyWithRetry(
    () => import('../components/chat/EmojiManagementPanel')
);
export const MentionsInboxPanel = lazyWithRetry(
    () => import('../components/chat/MentionsInboxPanel')
);
export const CustomStatusModal = lazyWithRetry(
    () => import('../components/profile/CustomStatusModal')
);

// 🚀 BATCH 1: Analytics & Tracking
export const ReactionAnalyticsPanel = lazyWithRetry(
    () => import('../components/chat/ReactionAnalyticsPanel')
);
export const LinkClickTrackingPanel = lazyWithRetry(
    () => import('../components/chat/LinkClickTrackingPanel')
);
export const JoinLeaveLogsPanel = lazyWithRetry(
    () => import('../components/social/JoinLeaveLogsPanel')
);
export const UserActivityPanel = lazyWithRetry(
    () => import('../components/profile/UserActivityPanel')
);
export const NicknameHistoryPanel = lazyWithRetry(
    () => import('../components/profile/NicknameHistoryPanel')
);
export const FieldChangeTrackingPanel = lazyWithRetry(
    () => import('../components/analytics/FieldChangeTrackingPanel')
);
export const InviteAnalyticsPanel = lazyWithRetry(
    () => import('../components/server/InviteAnalyticsPanel')
);

// 🚀 BATCH 2: Content & Moderation
export const ContentScannerPanel = lazyWithRetry(
    () => import('../components/moderation/ContentScannerPanel')
);
export const EphemeralMessagesPanel = lazyWithRetry(
    () => import('../components/chat/EphemeralMessagesPanel')
);
export const TopicHistoryPanel = lazyWithRetry(
    () => import('../components/shared/TopicHistoryPanel')
);
export const DraftsPanel = lazyWithRetry(() => import('../components/chat/DraftsPanel'));
export const ServerNicknamesPanel = lazyWithRetry(
    () => import('../components/server/ServerNicknamesPanel')
);

// 🚀 BATCH 3: Server Features
export const ServerBoostPanel = lazyWithRetry(
    () => import('../components/server/ServerBoostPanel')
);
export const RoomWebhooksPanel = lazyWithRetry(
    () => import('../components/server/RoomWebhooksPanel')
);
export const OAuthAppsPanel = lazyWithRetry(() => import('../components/security/OAuthAppsPanel'));
export const VanityURLPanel = lazyWithRetry(() => import('../components/server/VanityURLPanel'));
export const AutoRespondersPanel = lazyWithRetry(
    () => import('../components/bot/AutoRespondersPanel')
);

// 🚀 BATCH 4: Security & Privacy
export const SessionManagementPanel = lazyWithRetry(
    () => import('../components/security/SessionManagementPanel')
);
export const GDPRExportPanel = lazyWithRetry(
    () => import('../components/security/GDPRExportPanel')
);
export const DataRetentionPanel = lazyWithRetry(
    () => import('../components/security/DataRetentionPanel')
);
export const TwoFactorSetupWizard = lazyWithRetry(
    () => import('../components/security/TwoFactorSetupWizard')
);

// 🚀 BATCH 5: Communication
export const EnhancedPollsPanel = lazyWithRetry(
    () => import('../components/chat/EnhancedPollsPanel')
);
export const VoiceTranscriptsPanel = lazyWithRetry(
    () => import('../components/media/VoiceTranscriptsPanel')
);

// 💰 Payment & Engagement
export const PaymentPanel = lazyWithRetry(() => import('../components/premium/PaymentPanel'));
export const StoreModal = lazyWithRetry(() => import('../components/premium/StoreModal'));
export const DailyRewardsModal = lazyWithRetry(
    () => import('../components/premium/DailyRewardsModal')
);
export const APIUsagePanel = lazyWithRetry(() => import('../components/bot/APIUsagePanel'));
export const ExportJobsPanel = lazyWithRetry(() => import('../components/social/ExportJobsPanel'));
export const ScheduledAnnouncementsPanel = lazyWithRetry(
    () => import('../components/social/ScheduledAnnouncementsPanel')
);
export const InviteExportPanel = lazyWithRetry(
    () => import('../components/server/InviteExportPanel')
);

// 🚀 BATCH 6: Advanced Search & Analytics
export const AdvancedSearchPanel = lazyWithRetry(
    () => import('../components/shared/AdvancedSearchPanel')
);
export const GrowthMetricsPanel = lazyWithRetry(
    () => import('../components/analytics/GrowthMetricsPanel')
);
export const LinkPreviewRenderer = lazyWithRetry(
    () => import('../components/chat/LinkPreviewRenderer')
);

// 🚀 BATCH 7: Store & Gamification
export const InventoryPanel = lazyWithRetry(() => import('../components/premium/InventoryPanel'));
export const WaitlistPanel = lazyWithRetry(() => import('../components/social/WaitlistPanel'));
export const ReferralRewardsPanel = lazyWithRetry(
    () => import('../components/premium/ReferralRewardsPanel')
);

// 🔐 Auth & Security Pages
export const VerifyEmailPage = lazyWithRetry(() => import('../pages/VerifyEmailPage'));
export const ForgotPasswordPage = lazyWithRetry(() => import('../pages/ForgotPasswordPage'));
export const ResetPasswordPage = lazyWithRetry(() => import('../pages/ResetPasswordPage'));
export const TwoFactorLoginPage = lazyWithRetry(() => import('../pages/TwoFactorLoginPage'));
export const TwoFactorSetup = lazyWithRetry(() => import('../components/security/TwoFactorSetup'));
export const TwoFactorLogin = lazyWithRetry(() => import('../components/security/TwoFactorLogin'));

// 🔗 Vanity & Invite
export const VanityInviteScreen = lazyWithRetry(
    () => import('../components/server/VanityInviteScreen')
);
export const InviteCodeScreen = lazyWithRetry(
    () => import('../components/server/InviteCodeScreen')
);
export const EmailVerification = lazyWithRetry(
    () => import('../components/security/EmailVerification')
);

// 📱 Mobile Components
export const MobileNav = lazyWithRetry(() => import('../components/shared/MobileNav'));
export const SwipeActions = lazyWithRetry(() => import('../components/shared/SwipeActions'));
export const VoiceMessage = lazyWithRetry(() => import('../components/chat/VoiceMessage'));

// ⚡ Primary lazy components
export const FriendsTab = lazyWithRetry(() => import('../FriendsTab'));
import RoomList from '../RoomList';
export { RoomList };
export const UserProfilePanel = lazyWithRetry(() => import('../UserProfilePanel'));
export const VoiceChatPanel = lazyWithRetry(() => import('../VoiceChatPanel'));
export const ChatUserList = lazyWithRetry(() => import('../ChatUserList'));
export const PinnedMessages = lazyWithRetry(() => import('../features/PinnedMessages'));
export const FloatingVoiceIsland = lazyWithRetry(() => import('../features/FloatingVoiceIsland'));
export const CinemaPlayer = lazyWithRetry(() => import('../components/media/CinemaPlayer'));
export const ConnectionsPanel = lazyWithRetry(
    () => import('../components/profile/ConnectionsPanel')
);
export const PasswordSetupModal = lazyWithRetry(
    () => import('../components/security/PasswordSetupModal')
);
export const NotificationDropdown = lazyWithRetry(
    () => import('../components/notifications/NotificationDropdown')
);

// 📊 Analytics Panels
export const ReactionStatsPanel = lazyWithRetry(
    () => import('../components/panels/ReactionStatsPanel')
);
export const ServerHealthPanel = lazyWithRetry(
    () => import('../components/panels/ServerHealthPanel')
);
export const ChannelAnalyticsPanel = lazyWithRetry(
    () => import('../components/panels/ChannelAnalyticsPanel')
);
export const SmartSuggestionsPanel = lazyWithRetry(
    () => import('../components/panels/SmartSuggestionsPanel')
);
export const UserPresenceInsightsPanel = lazyWithRetry(
    () => import('../components/panels/UserPresenceInsightsPanel')
);

// UI Components
export const UserFooter = lazyWithRetry(() => import('../components/profile/UserFooter'));
export const UserContextMenu = lazyWithRetry(() => import('../components/profile/UserContextMenu'));

// 🎮 BATCH 8: New Features
export const MiniGamesPanel = lazyWithRetry(() => import('../components/games/MiniGamesPanel'));
export const ProjectCollaborationPanel = lazyWithRetry(
    () => import('../components/social/ProjectCollaborationPanel')
);
export const AvatarStudioPanel = lazyWithRetry(
    () => import('../components/profile/AvatarStudioPanel')
);

// 🔥 BATCH 9: Essential UX
export const ImageLightbox = lazyWithRetry(() => import('../components/shared/ImageLightbox'));
export const ChannelAboutPanel = lazyWithRetry(
    () => import('../components/server/ChannelAboutPanel')
);
export const MessageSchedulePicker = lazyWithRetry(
    () => import('../components/chat/MessageSchedulePicker')
);

// 🔥 BATCH 10: Core UX
export const UserSettingsModal = lazyWithRetry(
    () => import('../components/profile/UserSettingsModal')
);
export const KeyboardShortcutsModal = lazyWithRetry(
    () => import('../components/shared/KeyboardShortcutsModal')
);
export const CommandPalette = lazyWithRetry(() => import('../components/bot/CommandPalette'));
export const ServerDiscoveryPage = lazyWithRetry(
    () => import('../components/server/ServerDiscoveryPage')
);
export const AppearanceSettingsPanel = lazyWithRetry(
    () => import('../components/settings/AppearanceSettingsPanel')
);
export const LanguageSelector = lazyWithRetry(
    () => import('../components/settings/LanguageSelector')
);
export const ChangelogPanel = lazyWithRetry(() => import('../components/social/ChangelogPanel'));
export const LogoutModal = lazyWithRetry(() => import('../components/shared/LogoutModal'));
export const NotificationSoundSettings = lazyWithRetry(
    () => import('../components/media/NotificationSoundSettings')
);
export const QuickSwitcher = lazyWithRetry(() => import('../components/shared/QuickSwitcher'));

// Security & Account
export const LoginHistory = lazyWithRetry(() => import('../components/security/LoginHistory'));
export const SecuritySettingsPanel = lazyWithRetry(
    () => import('../components/security/SecuritySettingsPanel')
);
export const PrivacySettingsPanel = lazyWithRetry(
    () => import('../components/security/PrivacySettingsPanel')
);
export const AccountDeletionModal = lazyWithRetry(
    () => import('../components/security/AccountDeletionModal')
);
export const BlockListPanel = lazyWithRetry(() => import('../components/security/BlockListPanel'));
export const E2EESettingsPanel = lazyWithRetry(
    () => import('../components/security/E2EESettingsPanel')
);

// Communication
export const ThreadView = lazyWithRetry(() => import('../components/chat/ThreadView'));
export const ScheduledMessagesPanel = lazyWithRetry(
    () => import('../components/chat/ScheduledMessagesPanel')
);
export const ReminderPanel = lazyWithRetry(() => import('../components/shared/ReminderPanel'));
export const ForumPanel = lazyWithRetry(() => import('../components/social/ForumPanel'));
export const StageChannelPanel = lazyWithRetry(
    () => import('../components/server/StageChannelPanel')
);
export const VideoCallModal = lazyWithRetry(() => import('../components/media/VideoCallModal'));
export const VoiceSettingsPanel = lazyWithRetry(
    () => import('../components/media/VoiceSettingsPanel')
);
export const MessageSearchPanel = lazyWithRetry(
    () => import('../components/chat/MessageSearchPanel')
);
export const WatchTogether = lazyWithRetry(() => import('../components/WatchTogether'));

// Server Management
export const AutoRolesPanel = lazyWithRetry(() => import('../components/server/AutoRolesPanel'));
export const ReactionRolesPanel = lazyWithRetry(
    () => import('../components/server/ReactionRolesPanel')
);
export const WelcomeMessagesPanel = lazyWithRetry(
    () => import('../components/server/WelcomeMessagesPanel')
);
export const EventCalendar = lazyWithRetry(() => import('../components/social/EventCalendar'));
export const GiveawayPanel = lazyWithRetry(() => import('../components/social/GiveawayPanel'));
export const TicketSystemPanel = lazyWithRetry(
    () => import('../components/social/TicketSystemPanel')
);
export const StarboardPanel = lazyWithRetry(() => import('../components/social/StarboardPanel'));
export const ServerBackupPanel = lazyWithRetry(
    () => import('../components/server/ServerBackupPanel')
);
export const BanAppealsPanel = lazyWithRetry(
    () => import('../components/moderation/BanAppealsPanel')
);
export const CustomCommandsPanel = lazyWithRetry(
    () => import('../components/profile/CustomCommandsPanel')
);
export const LevelingSystemPanel = lazyWithRetry(
    () => import('../components/profile/LevelingSystemPanel')
);
export const LiveStreamPanel = lazyWithRetry(() => import('../components/media/LiveStreamPanel'));

// Engagement & Social
export const AchievementsPanel = lazyWithRetry(
    () => import('../components/profile/AchievementsPanel')
);
export const BirthdaySystemPanel = lazyWithRetry(
    () => import('../components/profile/BirthdaySystemPanel')
);
export const PremiumModal = lazyWithRetry(() => import('../components/premium/PremiumModal'));
export const MusicPlayer = lazyWithRetry(() => import('../components/media/MusicPlayer'));
export const BotMarketplace = lazyWithRetry(() => import('../components/bot/BotMarketplace'));
export const ProfileCustomization = lazyWithRetry(
    () => import('../components/profile/ProfileCustomization')
);
export const IntegrationHubPanel = lazyWithRetry(
    () => import('../components/bot/IntegrationHubPanel')
);
export const TournamentSystem = lazyWithRetry(
    () => import('../components/social/TournamentSystem')
);

// Advanced Features
export const HighlightsPanel = lazyWithRetry(() => import('../components/chat/HighlightsPanel'));
export const CustomEmbedPanel = lazyWithRetry(
    () => import('../components/profile/CustomEmbedPanel')
);
export const SpotifyIntegrationPanel = lazyWithRetry(
    () => import('../components/bot/SpotifyIntegrationPanel')
);
export const ServerClonePanel = lazyWithRetry(
    () => import('../components/server/ServerClonePanel')
);
export const WeeklyChallengesPanel = lazyWithRetry(
    () => import('../components/social/WeeklyChallengesPanel')
);

// 🔥 BATCH 11: Moderation & Admin
export const ModeratorTools = lazyWithRetry(
    () => import('../components/moderation/ModeratorTools')
);
export const AIModerationPanel = lazyWithRetry(
    () => import('../components/moderation/AIModerationPanel')
);
export const SpamDetectionPanel = lazyWithRetry(
    () => import('../components/moderation/SpamDetectionPanel')
);
export const AuditLogsPanel = lazyWithRetry(() => import('../components/admin/AuditLogsPanel'));
export const BanHistoryPanel = lazyWithRetry(
    () => import('../components/moderation/BanHistoryPanel')
);
export const ModerationLogsPanel = lazyWithRetry(
    () => import('../components/moderation/ModerationLogsPanel')
);
export const RaidProtectionDashboard = lazyWithRetry(
    () => import('../components/moderation/RaidProtectionDashboard')
);
export const SecurityAlertsPanel = lazyWithRetry(
    () => import('../components/security/SecurityAlertsPanel')
);

// Communication & Messages
export const BookmarksPanel = lazyWithRetry(() => import('../components/chat/BookmarksPanel'));
export const GIFPickerPanel = lazyWithRetry(() => import('../components/chat/GIFPickerPanel'));
export const PollCreator = lazyWithRetry(() => import('../components/chat/PollCreator'));
export const StickersPanel = lazyWithRetry(() => import('../components/chat/StickersPanel'));
export const SavedMessagesModal = lazyWithRetry(
    () => import('../components/chat/SavedMessagesModal')
);
export const NotificationsCenter = lazyWithRetry(
    () => import('../components/notifications/NotificationsCenter')
);
export const MessageSummaryPanel = lazyWithRetry(
    () => import('../components/chat/MessageSummaryPanel')
);
export const TranslationPanel = lazyWithRetry(
    () => import('../components/education/TranslationPanel')
);

// Server Management (Batch 11)
export const ChannelSettingsModal = lazyWithRetry(
    () => import('../components/server/ChannelSettingsModal')
);
export const InviteModal = lazyWithRetry(() => import('../components/server/InviteModal'));
export const ServerTemplates = lazyWithRetry(() => import('../components/server/ServerTemplates'));
export const ServerAnalyticsDashboard = lazyWithRetry(
    () => import('../components/server/ServerAnalyticsDashboard')
);
export const RolesManager = lazyWithRetry(() => import('../components/server/RolesManager'));
export const WelcomeScreenEditor = lazyWithRetry(
    () => import('../components/server/WelcomeScreenEditor')
);
export const CommunitySettingsPanel = lazyWithRetry(
    () => import('../components/settings/CommunitySettingsPanel')
);
export const InviteLinkManager = lazyWithRetry(
    () => import('../components/server/InviteLinkManager')
);

// Bot & Developer
export const BotBuilder = lazyWithRetry(() => import('../components/bot/BotBuilder'));
export const BotDeveloperPortal = lazyWithRetry(
    () => import('../components/bot/BotDeveloperPortal')
);
export const WebhookManager = lazyWithRetry(() => import('../components/server/WebhookManager'));
export const APIKeysPanel = lazyWithRetry(() => import('../components/bot/APIKeysPanel'));
export const SlashCommandsPanel = lazyWithRetry(
    () => import('../components/chat/SlashCommandsPanel')
);
export const CodeRunnerPanel = lazyWithRetry(() => import('../components/chat/CodeRunnerPanel'));

// Profile & Social
export const ProfileCard = lazyWithRetry(() => import('../components/profile/ProfileCard'));
export const UserNotesModal = lazyWithRetry(() => import('../components/profile/UserNotesModal'));
export const StatusPicker = lazyWithRetry(() => import('../components/profile/StatusPicker'));
export const MutualsPanel = lazyWithRetry(() => import('../components/profile/MutualsPanel'));
export const ProfileShowcasePanel = lazyWithRetry(
    () => import('../components/profile/ProfileShowcasePanel')
);
export const SessionManagerModal = lazyWithRetry(
    () => import('../components/security/SessionManagerModal')
);

// Premium & Economy
export const CoinStoreModal = lazyWithRetry(() => import('../components/premium/CoinStoreModal'));
export const PremiumManagementPanel = lazyWithRetry(
    () => import('../components/premium/PremiumManagementPanel')
);
export const SubscriptionManager = lazyWithRetry(
    () => import('../components/premium/SubscriptionManager')
);
export const GiftPremiumPanel = lazyWithRetry(() => import('../components/chat/GiftPremiumPanel'));
export const PremiumMarketplace = lazyWithRetry(
    () => import('../components/premium/PremiumMarketplace')
);
export const ThemeMarketplace = lazyWithRetry(
    () => import('../components/settings/ThemeMarketplace')
);

// Advanced
export const AIChatbotPanel = lazyWithRetry(() => import('../components/chat/AIChatbotPanel'));
export const CollaborativeCodeEditor = lazyWithRetry(
    () => import('../components/chat/CollaborativeCodeEditor')
);
export const ScreenShareModal = lazyWithRetry(() => import('../components/media/ScreenShareModal'));
export const LiveStreamModal = lazyWithRetry(() => import('../components/media/LiveStreamModal'));
export const AdvancedAnalyticsDashboard = lazyWithRetry(
    () => import('../components/analytics/AdvancedAnalyticsDashboard')
);
export const FileManagerPanel = lazyWithRetry(
    () => import('../components/shared/FileManagerPanel')
);
export const ReportsPanel = lazyWithRetry(() => import('../components/admin/ReportsPanel'));
export const ErrorReportingPanel = lazyWithRetry(
    () => import('../components/admin/ErrorReportingPanel')
);
