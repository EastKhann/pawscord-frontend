/**
 * 🚀 Lazy-loaded component imports for App.js
 * Extracted from App.js to reduce file size and improve readability.
 * All components use lazyWithRetry() for code-splitting with auto-retry on chunk failure.
 */
import { lazyWithRetry } from '../utils/lazyWithRetry';

// ⚡ CORE: Message & Chat components
export const Message = lazyWithRetry(() => import('../Message'));
export const VirtualMessageList = lazyWithRetry(() => import('../components/VirtualMessageList'));
export const MessageInput = lazyWithRetry(() => import('../components/MessageInput'));

// ⚡ LAZY: Voice/Video components
export const UserVideoContainer = lazyWithRetry(() => import('../UserVideoContainer'));
export const VoiceAudioController = lazyWithRetry(() => import('../VoiceAudioController'));
export const RichTextEditor = lazyWithRetry(() => import('../components/RichTextEditor'));
export const StickyMessageBanner = lazyWithRetry(() => import('../components/StickyMessageBanner'));

// ⚡ LAZY: Auth screens
export const LoginPage = lazyWithRetry(() => import('../LoginPage'));
export const WelcomeScreen = lazyWithRetry(() => import('../WelcomeScreen'));

// ⚡ LAZY: Modal components
export const ImageModal = lazyWithRetry(() => import('../ImageModal'));
export const UserProfileModal = lazyWithRetry(() => import('../UserProfileModal'));
export const PollCreateModal = lazyWithRetry(() => import('../components/PollCreateModal'));
export const CodeSnippetModal = lazyWithRetry(() => import('../components/CodeSnippetModal'));
export const AvatarCropper = lazyWithRetry(() => import('../components/AvatarCropper'));

// --- Ağır Bileşenler (Lazy Load) ---
export const CryptoChartModal = lazyWithRetry(() => import('../CryptoChartModal'));
export const CryptoStoreModal = lazyWithRetry(() => import('../components/CryptoStoreModal'));
export const PremiumStoreModal = lazyWithRetry(() => import('../components/PremiumStoreModal'));
export const WhiteboardModal = lazyWithRetry(() => import('../components/WhiteboardModal'));
export const SoundboardModal = lazyWithRetry(() => import('../components/SoundboardModal'));
export const KanbanBoard = lazyWithRetry(() => import('../components/KanbanBoard'));
export const SummaryModal = lazyWithRetry(() => import('../SummaryModal'));
export const MessageTemplateModal = lazyWithRetry(() => import('../components/MessageTemplateModal'));
export const CinemaModal = lazyWithRetry(() => import('../CinemaModal'));
export const StickerPicker = lazyWithRetry(() => import('../StickerPicker'));
export const GifPicker = lazyWithRetry(() => import('../GifPicker'));
export const DJModal = lazyWithRetry(() => import('../components/DJModal'));
export const ThemeStoreModal = lazyWithRetry(() => import('../components/ThemeStoreModal'));
export const EncryptionKeyModal = lazyWithRetry(() => import('../components/EncryptionKeyModal'));
export const DownloadModal = lazyWithRetry(() => import('../components/DownloadModal'));
export const ServerSettingsModal = lazyWithRetry(() => import('../components/ServerSettingsModal'));
export const CreateGroupModal = lazyWithRetry(() => import('../components/CreateGroupModal'));
export const AdminAnalyticsPanel = lazyWithRetry(() => import('../components/AdminAnalyticsPanel'));
export const AdminPanelModal = lazyWithRetry(() => import('../components/AdminPanelModal'));
export const WebhooksPanel = lazyWithRetry(() => import('../components/WebhooksPanel'));
export const VanityURLManager = lazyWithRetry(() => import('../components/VanityURLManager'));

// 🛡️ MODERATION
export const AutoModerationDashboard = lazyWithRetry(() => import('../components/AutoModerationDashboard'));
export const AutoModerationPanel = lazyWithRetry(() => import('../components/AutoModerationPanel'));
export const RaidProtectionPanel = lazyWithRetry(() => import('../components/RaidProtectionPanel'));
export const ReportSystemPanel = lazyWithRetry(() => import('../components/ReportSystemPanel'));
export const AuditLogPanel = lazyWithRetry(() => import('../components/AuditLogPanel'));
export const UserWarningsPanel = lazyWithRetry(() => import('../components/UserWarningsPanel'));

// 📚 FEATURE PANELS
export const BookmarkPanel = lazyWithRetry(() => import('../components/BookmarkPanel'));
export const ReadLaterPanel = lazyWithRetry(() => import('../components/ReadLaterPanel'));
export const ChannelPermissionsPanel = lazyWithRetry(() => import('../components/ChannelPermissionsPanel'));
export const MessageThreadsPanel = lazyWithRetry(() => import('../components/MessageThreadsPanel'));
export const ModeratorNotesPanel = lazyWithRetry(() => import('../components/ModeratorNotesPanel'));
export const ServerRolesPanel = lazyWithRetry(() => import('../components/ServerRolesPanel'));
export const NotificationPreferencesPanel = lazyWithRetry(() => import('../components/NotificationPreferencesPanel'));
export const MessageOCRPanel = lazyWithRetry(() => import('../components/MessageOCRPanel'));
export const MassActionsPanel = lazyWithRetry(() => import('../components/MassActionsPanel'));
export const TimeoutMutePanel = lazyWithRetry(() => import('../components/TimeoutMutePanel'));
export const ServerThemesPanel = lazyWithRetry(() => import('../components/ServerThemesPanel'));
export const KeywordMutesPanel = lazyWithRetry(() => import('../components/KeywordMutesPanel'));
export const WelcomeTemplatesPanel = lazyWithRetry(() => import('../components/WelcomeTemplatesPanel'));
export const StickyMessagesPanel = lazyWithRetry(() => import('../components/StickyMessagesPanel'));
export const MessageTemplatesPanel = lazyWithRetry(() => import('../components/MessageTemplatesPanel'));
export const MessageExportPanel = lazyWithRetry(() => import('../components/MessageExportPanel'));
export const ArchivedRoomsPanel = lazyWithRetry(() => import('../components/ArchivedRoomsPanel'));
export const SlowModePanel = lazyWithRetry(() => import('../components/SlowModePanel'));
export const EmojiManagementPanel = lazyWithRetry(() => import('../components/EmojiManagementPanel'));
export const MentionsInboxPanel = lazyWithRetry(() => import('../components/MentionsInboxPanel'));
export const CustomStatusModal = lazyWithRetry(() => import('../components/CustomStatusModal'));

// 🚀 BATCH 1: Analytics & Tracking
export const ReactionAnalyticsPanel = lazyWithRetry(() => import('../components/ReactionAnalyticsPanel'));
export const LinkClickTrackingPanel = lazyWithRetry(() => import('../components/LinkClickTrackingPanel'));
export const JoinLeaveLogsPanel = lazyWithRetry(() => import('../components/JoinLeaveLogsPanel'));
export const UserActivityPanel = lazyWithRetry(() => import('../components/UserActivityPanel'));
export const NicknameHistoryPanel = lazyWithRetry(() => import('../components/NicknameHistoryPanel'));
export const FieldChangeTrackingPanel = lazyWithRetry(() => import('../components/FieldChangeTrackingPanel'));
export const InviteAnalyticsPanel = lazyWithRetry(() => import('../components/InviteAnalyticsPanel'));

// 🚀 BATCH 2: Content & Moderation
export const ContentScannerPanel = lazyWithRetry(() => import('../components/ContentScannerPanel'));
export const EphemeralMessagesPanel = lazyWithRetry(() => import('../components/EphemeralMessagesPanel'));
export const TopicHistoryPanel = lazyWithRetry(() => import('../components/TopicHistoryPanel'));
export const DraftsPanel = lazyWithRetry(() => import('../components/DraftsPanel'));
export const ServerNicknamesPanel = lazyWithRetry(() => import('../components/ServerNicknamesPanel'));

// 🚀 BATCH 3: Server Features
export const ServerBoostPanel = lazyWithRetry(() => import('../components/ServerBoostPanel'));
export const RoomWebhooksPanel = lazyWithRetry(() => import('../components/RoomWebhooksPanel'));
export const OAuthAppsPanel = lazyWithRetry(() => import('../components/OAuthAppsPanel'));
export const VanityURLPanel = lazyWithRetry(() => import('../components/VanityURLPanel'));
export const AutoRespondersPanel = lazyWithRetry(() => import('../components/AutoRespondersPanel'));

// 🚀 BATCH 4: Security & Privacy
export const SessionManagementPanel = lazyWithRetry(() => import('../components/SessionManagementPanel'));
export const GDPRExportPanel = lazyWithRetry(() => import('../components/GDPRExportPanel'));
export const DataRetentionPanel = lazyWithRetry(() => import('../components/DataRetentionPanel'));
export const TwoFactorSetupWizard = lazyWithRetry(() => import('../components/TwoFactorSetupWizard'));

// 🚀 BATCH 5: Communication
export const EnhancedPollsPanel = lazyWithRetry(() => import('../components/EnhancedPollsPanel'));
export const VoiceTranscriptsPanel = lazyWithRetry(() => import('../components/VoiceTranscriptsPanel'));

// 💰 Payment & Engagement
export const PaymentPanel = lazyWithRetry(() => import('../components/PaymentPanel'));
export const StoreModal = lazyWithRetry(() => import('../components/StoreModal'));
export const DailyRewardsModal = lazyWithRetry(() => import('../components/DailyRewardsModal'));
export const APIUsagePanel = lazyWithRetry(() => import('../components/APIUsagePanel'));
export const ExportJobsPanel = lazyWithRetry(() => import('../components/ExportJobsPanel'));
export const ScheduledAnnouncementsPanel = lazyWithRetry(() => import('../components/ScheduledAnnouncementsPanel'));
export const InviteExportPanel = lazyWithRetry(() => import('../components/InviteExportPanel'));

// 🚀 BATCH 6: Advanced Search & Analytics
export const AdvancedSearchPanel = lazyWithRetry(() => import('../components/AdvancedSearchPanel'));
export const GrowthMetricsPanel = lazyWithRetry(() => import('../components/GrowthMetricsPanel'));
export const LinkPreviewRenderer = lazyWithRetry(() => import('../components/LinkPreviewRenderer'));

// 🚀 BATCH 7: Store & Gamification
export const InventoryPanel = lazyWithRetry(() => import('../components/InventoryPanel'));
export const WaitlistPanel = lazyWithRetry(() => import('../components/WaitlistPanel'));
export const ReferralRewardsPanel = lazyWithRetry(() => import('../components/ReferralRewardsPanel'));

// 🔐 Auth & Security Pages
export const VerifyEmailPage = lazyWithRetry(() => import('../pages/VerifyEmailPage'));
export const ForgotPasswordPage = lazyWithRetry(() => import('../pages/ForgotPasswordPage'));
export const ResetPasswordPage = lazyWithRetry(() => import('../pages/ResetPasswordPage'));
export const TwoFactorLoginPage = lazyWithRetry(() => import('../pages/TwoFactorLoginPage'));
export const TwoFactorSetup = lazyWithRetry(() => import('../components/TwoFactorSetup'));
export const TwoFactorLogin = lazyWithRetry(() => import('../components/TwoFactorLogin'));

// 🔗 Vanity & Invite
export const VanityInviteScreen = lazyWithRetry(() => import('../components/VanityInviteScreen'));
export const InviteCodeScreen = lazyWithRetry(() => import('../components/InviteCodeScreen'));
export const EmailVerification = lazyWithRetry(() => import('../components/EmailVerification'));

// 📱 Mobile Components
export const MobileNav = lazyWithRetry(() => import('../components/MobileNav'));
export const SwipeActions = lazyWithRetry(() => import('../components/SwipeActions'));
export const VoiceMessage = lazyWithRetry(() => import('../components/VoiceMessage'));

// ⚡ Primary lazy components
export const FriendsTab = lazyWithRetry(() => import('../FriendsTab'));
export const RoomList = lazyWithRetry(() => import('../RoomList'));
export const UserProfilePanel = lazyWithRetry(() => import('../UserProfilePanel'));
export const VoiceChatPanel = lazyWithRetry(() => import('../VoiceChatPanel'));
export const ChatUserList = lazyWithRetry(() => import('../ChatUserList'));
export const PinnedMessages = lazyWithRetry(() => import('../PinnedMessages'));
export const FloatingVoiceIsland = lazyWithRetry(() => import('../FloatingVoiceIsland'));
export const CinemaPlayer = lazyWithRetry(() => import('../components/CinemaPlayer'));
export const ConnectionsPanel = lazyWithRetry(() => import('../components/ConnectionsPanel'));
export const PasswordSetupModal = lazyWithRetry(() => import('../components/PasswordSetupModal'));
export const NotificationDropdown = lazyWithRetry(() => import('../components/NotificationDropdown'));

// 📊 Analytics Panels
export const ReactionStatsPanel = lazyWithRetry(() => import('../components/panels/ReactionStatsPanel'));
export const ServerHealthPanel = lazyWithRetry(() => import('../components/panels/ServerHealthPanel'));
export const ChannelAnalyticsPanel = lazyWithRetry(() => import('../components/panels/ChannelAnalyticsPanel'));
export const SmartSuggestionsPanel = lazyWithRetry(() => import('../components/panels/SmartSuggestionsPanel'));
export const UserPresenceInsightsPanel = lazyWithRetry(() => import('../components/panels/UserPresenceInsightsPanel'));

// UI Components
export const UserFooter = lazyWithRetry(() => import('../components/UserFooter'));
export const UserContextMenu = lazyWithRetry(() => import('../components/UserContextMenu'));

// 🎮 BATCH 8: New Features
export const MiniGamesPanel = lazyWithRetry(() => import('../components/MiniGamesPanel'));
export const ProjectCollaborationPanel = lazyWithRetry(() => import('../components/ProjectCollaborationPanel'));
export const AvatarStudioPanel = lazyWithRetry(() => import('../components/AvatarStudioPanel'));

// 🔥 BATCH 9: Essential UX
export const ImageLightbox = lazyWithRetry(() => import('../components/ImageLightbox'));
export const ChannelAboutPanel = lazyWithRetry(() => import('../components/ChannelAboutPanel'));
export const MessageSchedulePicker = lazyWithRetry(() => import('../components/MessageSchedulePicker'));

// 🔥 BATCH 10: Core UX
export const UserSettingsModal = lazyWithRetry(() => import('../components/UserSettingsModal'));
export const KeyboardShortcutsModal = lazyWithRetry(() => import('../components/KeyboardShortcutsModal'));
export const CommandPalette = lazyWithRetry(() => import('../components/CommandPalette'));
export const ServerDiscoveryPage = lazyWithRetry(() => import('../components/ServerDiscoveryPage'));
export const AppearanceSettingsPanel = lazyWithRetry(() => import('../components/AppearanceSettingsPanel'));
export const LanguageSelector = lazyWithRetry(() => import('../components/LanguageSelector'));
export const ChangelogPanel = lazyWithRetry(() => import('../components/ChangelogPanel'));
export const LogoutModal = lazyWithRetry(() => import('../components/LogoutModal'));
export const NotificationSoundSettings = lazyWithRetry(() => import('../components/NotificationSoundSettings'));
export const QuickSwitcher = lazyWithRetry(() => import('../components/QuickSwitcher'));

// Security & Account
export const LoginHistory = lazyWithRetry(() => import('../components/LoginHistory'));
export const SecuritySettingsPanel = lazyWithRetry(() => import('../components/SecuritySettingsPanel'));
export const PrivacySettingsPanel = lazyWithRetry(() => import('../components/PrivacySettingsPanel'));
export const AccountDeletionModal = lazyWithRetry(() => import('../components/AccountDeletionModal'));
export const BlockListPanel = lazyWithRetry(() => import('../components/BlockListPanel'));
export const E2EESettingsPanel = lazyWithRetry(() => import('../components/E2EESettingsPanel'));

// Communication
export const ThreadView = lazyWithRetry(() => import('../components/ThreadView'));
export const ScheduledMessagesPanel = lazyWithRetry(() => import('../components/ScheduledMessagesPanel'));
export const ReminderPanel = lazyWithRetry(() => import('../components/ReminderPanel'));
export const ForumPanel = lazyWithRetry(() => import('../components/ForumPanel'));
export const StageChannelPanel = lazyWithRetry(() => import('../components/StageChannelPanel'));
export const VideoCallModal = lazyWithRetry(() => import('../components/VideoCallModal'));
export const VoiceSettingsPanel = lazyWithRetry(() => import('../components/VoiceSettingsPanel'));
export const MessageSearchPanel = lazyWithRetry(() => import('../components/MessageSearchPanel'));
export const WatchTogether = lazyWithRetry(() => import('../components/WatchTogether'));

// Server Management
export const AutoRolesPanel = lazyWithRetry(() => import('../components/AutoRolesPanel'));
export const ReactionRolesPanel = lazyWithRetry(() => import('../components/ReactionRolesPanel'));
export const WelcomeMessagesPanel = lazyWithRetry(() => import('../components/WelcomeMessagesPanel'));
export const EventCalendar = lazyWithRetry(() => import('../components/EventCalendar'));
export const GiveawayPanel = lazyWithRetry(() => import('../components/GiveawayPanel'));
export const TicketSystemPanel = lazyWithRetry(() => import('../components/TicketSystemPanel'));
export const StarboardPanel = lazyWithRetry(() => import('../components/StarboardPanel'));
export const ServerBackupPanel = lazyWithRetry(() => import('../components/ServerBackupPanel'));
export const BanAppealsPanel = lazyWithRetry(() => import('../components/BanAppealsPanel'));
export const CustomCommandsPanel = lazyWithRetry(() => import('../components/CustomCommandsPanel'));
export const LevelingSystemPanel = lazyWithRetry(() => import('../components/LevelingSystemPanel'));
export const LiveStreamPanel = lazyWithRetry(() => import('../components/LiveStreamPanel'));

// Engagement & Social
export const AchievementsPanel = lazyWithRetry(() => import('../components/AchievementsPanel'));
export const BirthdaySystemPanel = lazyWithRetry(() => import('../components/BirthdaySystemPanel'));
export const PremiumModal = lazyWithRetry(() => import('../components/PremiumModal'));
export const MusicPlayer = lazyWithRetry(() => import('../components/MusicPlayer'));
export const BotMarketplace = lazyWithRetry(() => import('../components/BotMarketplace'));
export const ProfileCustomization = lazyWithRetry(() => import('../components/ProfileCustomization'));
export const IntegrationHubPanel = lazyWithRetry(() => import('../components/IntegrationHubPanel'));
export const TournamentSystem = lazyWithRetry(() => import('../components/TournamentSystem'));

// Advanced Features
export const HighlightsPanel = lazyWithRetry(() => import('../components/HighlightsPanel'));
export const CustomEmbedPanel = lazyWithRetry(() => import('../components/CustomEmbedPanel'));
export const SpotifyIntegrationPanel = lazyWithRetry(() => import('../components/SpotifyIntegrationPanel'));
export const ServerClonePanel = lazyWithRetry(() => import('../components/ServerClonePanel'));
export const WeeklyChallengesPanel = lazyWithRetry(() => import('../components/WeeklyChallengesPanel'));

// 🔥 BATCH 11: Moderation & Admin
export const ModeratorTools = lazyWithRetry(() => import('../components/ModeratorTools'));
export const AIModerationPanel = lazyWithRetry(() => import('../components/AIModerationPanel'));
export const SpamDetectionPanel = lazyWithRetry(() => import('../components/SpamDetectionPanel'));
export const AuditLogsPanel = lazyWithRetry(() => import('../components/AuditLogsPanel'));
export const BanHistoryPanel = lazyWithRetry(() => import('../components/BanHistoryPanel'));
export const ModerationLogsPanel = lazyWithRetry(() => import('../components/ModerationLogsPanel'));
export const RaidProtectionDashboard = lazyWithRetry(() => import('../components/RaidProtectionDashboard'));
export const SecurityAlertsPanel = lazyWithRetry(() => import('../components/SecurityAlertsPanel'));

// Communication & Messages
export const BookmarksPanel = lazyWithRetry(() => import('../components/BookmarksPanel'));
export const GIFPickerPanel = lazyWithRetry(() => import('../components/GIFPickerPanel'));
export const PollCreator = lazyWithRetry(() => import('../components/PollCreator'));
export const StickersPanel = lazyWithRetry(() => import('../components/StickersPanel'));
export const SavedMessagesModal = lazyWithRetry(() => import('../components/SavedMessagesModal'));
export const NotificationsCenter = lazyWithRetry(() => import('../components/NotificationsCenter'));
export const MessageSummaryPanel = lazyWithRetry(() => import('../components/MessageSummaryPanel'));
export const TranslationPanel = lazyWithRetry(() => import('../components/TranslationPanel'));

// Server Management (Batch 11)
export const ChannelSettingsModal = lazyWithRetry(() => import('../components/ChannelSettingsModal'));
export const InviteModal = lazyWithRetry(() => import('../components/InviteModal'));
export const ServerTemplates = lazyWithRetry(() => import('../components/ServerTemplates'));
export const ServerAnalyticsDashboard = lazyWithRetry(() => import('../components/ServerAnalyticsDashboard'));
export const RolesManager = lazyWithRetry(() => import('../components/RolesManager'));
export const WelcomeScreenEditor = lazyWithRetry(() => import('../components/WelcomeScreenEditor'));
export const CommunitySettingsPanel = lazyWithRetry(() => import('../components/CommunitySettingsPanel'));
export const InviteLinkManager = lazyWithRetry(() => import('../components/InviteLinkManager'));

// Bot & Developer
export const BotBuilder = lazyWithRetry(() => import('../components/BotBuilder'));
export const BotDeveloperPortal = lazyWithRetry(() => import('../components/BotDeveloperPortal'));
export const WebhookManager = lazyWithRetry(() => import('../components/WebhookManager'));
export const APIKeysPanel = lazyWithRetry(() => import('../components/APIKeysPanel'));
export const SlashCommandsPanel = lazyWithRetry(() => import('../components/SlashCommandsPanel'));
export const CodeRunnerPanel = lazyWithRetry(() => import('../components/CodeRunnerPanel'));

// Profile & Social
export const ProfileCard = lazyWithRetry(() => import('../components/ProfileCard'));
export const UserNotesModal = lazyWithRetry(() => import('../components/UserNotesModal'));
export const StatusPicker = lazyWithRetry(() => import('../components/StatusPicker'));
export const MutualsPanel = lazyWithRetry(() => import('../components/MutualsPanel'));
export const ProfileShowcasePanel = lazyWithRetry(() => import('../components/ProfileShowcasePanel'));
export const SessionManagerModal = lazyWithRetry(() => import('../components/SessionManagerModal'));

// Premium & Economy
export const CoinStoreModal = lazyWithRetry(() => import('../components/CoinStoreModal'));
export const PremiumManagementPanel = lazyWithRetry(() => import('../components/PremiumManagementPanel'));
export const SubscriptionManager = lazyWithRetry(() => import('../components/SubscriptionManager'));
export const GiftPremiumPanel = lazyWithRetry(() => import('../components/GiftPremiumPanel'));
export const PremiumMarketplace = lazyWithRetry(() => import('../components/PremiumMarketplace'));
export const ThemeMarketplace = lazyWithRetry(() => import('../components/ThemeMarketplace'));

// Advanced
export const AIChatbotPanel = lazyWithRetry(() => import('../components/AIChatbotPanel'));
export const CollaborativeCodeEditor = lazyWithRetry(() => import('../components/CollaborativeCodeEditor'));
export const ScreenShareModal = lazyWithRetry(() => import('../components/ScreenShareModal'));
export const LiveStreamModal = lazyWithRetry(() => import('../components/LiveStreamModal'));
export const AdvancedAnalyticsDashboard = lazyWithRetry(() => import('../components/AdvancedAnalyticsDashboard'));
export const FileManagerPanel = lazyWithRetry(() => import('../components/FileManagerPanel'));
export const ReportsPanel = lazyWithRetry(() => import('../components/ReportsPanel'));
export const ErrorReportingPanel = lazyWithRetry(() => import('../components/ErrorReportingPanel'));
