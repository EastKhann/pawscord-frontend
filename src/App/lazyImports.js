/**
 * 🚀 Lazy-loaded component imports for App.js
 * Extracted from App.js to reduce file size and improve readability.
 * All components use React.lazy() for code-splitting.
 */
import React from 'react';

// ⚡ CORE: Message & Chat components
export const Message = React.lazy(() => import('../Message'));
export const VirtualMessageList = React.lazy(() => import('../components/VirtualMessageList'));
export const MessageInput = React.lazy(() => import('../components/MessageInput'));

// ⚡ LAZY: Voice/Video components
export const UserVideoContainer = React.lazy(() => import('../UserVideoContainer'));
export const VoiceAudioController = React.lazy(() => import('../VoiceAudioController'));
export const RichTextEditor = React.lazy(() => import('../components/RichTextEditor'));
export const StickyMessageBanner = React.lazy(() => import('../components/StickyMessageBanner'));

// ⚡ LAZY: Auth screens
export const LoginPage = React.lazy(() => import('../LoginPage'));
export const WelcomeScreen = React.lazy(() => import('../WelcomeScreen'));

// ⚡ LAZY: Modal components
export const ImageModal = React.lazy(() => import('../ImageModal'));
export const UserProfileModal = React.lazy(() => import('../UserProfileModal'));
export const PollCreateModal = React.lazy(() => import('../components/PollCreateModal'));
export const CodeSnippetModal = React.lazy(() => import('../components/CodeSnippetModal'));
export const AvatarCropper = React.lazy(() => import('../components/AvatarCropper'));

// --- Ağır Bileşenler (Lazy Load) ---
export const CryptoChartModal = React.lazy(() => import('../CryptoChartModal'));
export const CryptoStoreModal = React.lazy(() => import('../components/CryptoStoreModal'));
export const PremiumStoreModal = React.lazy(() => import('../components/PremiumStoreModal'));
export const WhiteboardModal = React.lazy(() => import('../components/WhiteboardModal'));
export const SoundboardModal = React.lazy(() => import('../components/SoundboardModal'));
export const KanbanBoard = React.lazy(() => import('../components/KanbanBoard'));
export const SummaryModal = React.lazy(() => import('../SummaryModal'));
export const MessageTemplateModal = React.lazy(() => import('../components/MessageTemplateModal'));
export const CinemaModal = React.lazy(() => import('../CinemaModal'));
export const StickerPicker = React.lazy(() => import('../StickerPicker'));
export const GifPicker = React.lazy(() => import('../GifPicker'));
export const DJModal = React.lazy(() => import('../components/DJModal'));
export const ThemeStoreModal = React.lazy(() => import('../components/ThemeStoreModal'));
export const EncryptionKeyModal = React.lazy(() => import('../components/EncryptionKeyModal'));
export const DownloadModal = React.lazy(() => import('../components/DownloadModal'));
export const ServerSettingsModal = React.lazy(() => import('../components/ServerSettingsModal'));
export const CreateGroupModal = React.lazy(() => import('../components/CreateGroupModal'));
export const AdminAnalyticsPanel = React.lazy(() => import('../components/AdminAnalyticsPanel'));
export const AdminPanelModal = React.lazy(() => import('../components/AdminPanelModal'));
export const WebhooksPanel = React.lazy(() => import('../components/WebhooksPanel'));
export const VanityURLManager = React.lazy(() => import('../components/VanityURLManager'));

// 🛡️ MODERATION
export const AutoModerationDashboard = React.lazy(() => import('../components/AutoModerationDashboard'));
export const AutoModerationPanel = React.lazy(() => import('../components/AutoModerationPanel'));
export const RaidProtectionPanel = React.lazy(() => import('../components/RaidProtectionPanel'));
export const ReportSystemPanel = React.lazy(() => import('../components/ReportSystemPanel'));
export const AuditLogPanel = React.lazy(() => import('../components/AuditLogPanel'));
export const UserWarningsPanel = React.lazy(() => import('../components/UserWarningsPanel'));

// 📚 FEATURE PANELS
export const BookmarkPanel = React.lazy(() => import('../components/BookmarkPanel'));
export const ReadLaterPanel = React.lazy(() => import('../components/ReadLaterPanel'));
export const ChannelPermissionsPanel = React.lazy(() => import('../components/ChannelPermissionsPanel'));
export const MessageThreadsPanel = React.lazy(() => import('../components/MessageThreadsPanel'));
export const ModeratorNotesPanel = React.lazy(() => import('../components/ModeratorNotesPanel'));
export const ServerRolesPanel = React.lazy(() => import('../components/ServerRolesPanel'));
export const NotificationPreferencesPanel = React.lazy(() => import('../components/NotificationPreferencesPanel'));
export const MessageOCRPanel = React.lazy(() => import('../components/MessageOCRPanel'));
export const MassActionsPanel = React.lazy(() => import('../components/MassActionsPanel'));
export const TimeoutMutePanel = React.lazy(() => import('../components/TimeoutMutePanel'));
export const ServerThemesPanel = React.lazy(() => import('../components/ServerThemesPanel'));
export const KeywordMutesPanel = React.lazy(() => import('../components/KeywordMutesPanel'));
export const WelcomeTemplatesPanel = React.lazy(() => import('../components/WelcomeTemplatesPanel'));
export const StickyMessagesPanel = React.lazy(() => import('../components/StickyMessagesPanel'));
export const MessageTemplatesPanel = React.lazy(() => import('../components/MessageTemplatesPanel'));
export const MessageExportPanel = React.lazy(() => import('../components/MessageExportPanel'));
export const ArchivedRoomsPanel = React.lazy(() => import('../components/ArchivedRoomsPanel'));
export const SlowModePanel = React.lazy(() => import('../components/SlowModePanel'));
export const EmojiManagementPanel = React.lazy(() => import('../components/EmojiManagementPanel'));
export const MentionsInboxPanel = React.lazy(() => import('../components/MentionsInboxPanel'));
export const CustomStatusModal = React.lazy(() => import('../components/CustomStatusModal'));

// 🚀 BATCH 1: Analytics & Tracking
export const ReactionAnalyticsPanel = React.lazy(() => import('../components/ReactionAnalyticsPanel'));
export const LinkClickTrackingPanel = React.lazy(() => import('../components/LinkClickTrackingPanel'));
export const JoinLeaveLogsPanel = React.lazy(() => import('../components/JoinLeaveLogsPanel'));
export const UserActivityPanel = React.lazy(() => import('../components/UserActivityPanel'));
export const NicknameHistoryPanel = React.lazy(() => import('../components/NicknameHistoryPanel'));
export const FieldChangeTrackingPanel = React.lazy(() => import('../components/FieldChangeTrackingPanel'));
export const InviteAnalyticsPanel = React.lazy(() => import('../components/InviteAnalyticsPanel'));

// 🚀 BATCH 2: Content & Moderation
export const ContentScannerPanel = React.lazy(() => import('../components/ContentScannerPanel'));
export const EphemeralMessagesPanel = React.lazy(() => import('../components/EphemeralMessagesPanel'));
export const TopicHistoryPanel = React.lazy(() => import('../components/TopicHistoryPanel'));
export const DraftsPanel = React.lazy(() => import('../components/DraftsPanel'));
export const ServerNicknamesPanel = React.lazy(() => import('../components/ServerNicknamesPanel'));

// 🚀 BATCH 3: Server Features
export const ServerBoostPanel = React.lazy(() => import('../components/ServerBoostPanel'));
export const RoomWebhooksPanel = React.lazy(() => import('../components/RoomWebhooksPanel'));
export const OAuthAppsPanel = React.lazy(() => import('../components/OAuthAppsPanel'));
export const VanityURLPanel = React.lazy(() => import('../components/VanityURLPanel'));
export const AutoRespondersPanel = React.lazy(() => import('../components/AutoRespondersPanel'));

// 🚀 BATCH 4: Security & Privacy
export const SessionManagementPanel = React.lazy(() => import('../components/SessionManagementPanel'));
export const GDPRExportPanel = React.lazy(() => import('../components/GDPRExportPanel'));
export const DataRetentionPanel = React.lazy(() => import('../components/DataRetentionPanel'));
export const TwoFactorSetupWizard = React.lazy(() => import('../components/TwoFactorSetupWizard'));

// 🚀 BATCH 5: Communication
export const EnhancedPollsPanel = React.lazy(() => import('../components/EnhancedPollsPanel'));
export const VoiceTranscriptsPanel = React.lazy(() => import('../components/VoiceTranscriptsPanel'));

// 💰 Payment & Engagement
export const PaymentPanel = React.lazy(() => import('../components/PaymentPanel'));
export const StoreModal = React.lazy(() => import('../components/StoreModal'));
export const DailyRewardsModal = React.lazy(() => import('../components/DailyRewardsModal'));
export const APIUsagePanel = React.lazy(() => import('../components/APIUsagePanel'));
export const ExportJobsPanel = React.lazy(() => import('../components/ExportJobsPanel'));
export const ScheduledAnnouncementsPanel = React.lazy(() => import('../components/ScheduledAnnouncementsPanel'));
export const InviteExportPanel = React.lazy(() => import('../components/InviteExportPanel'));

// 🚀 BATCH 6: Advanced Search & Analytics
export const AdvancedSearchPanel = React.lazy(() => import('../components/AdvancedSearchPanel'));
export const GrowthMetricsPanel = React.lazy(() => import('../components/GrowthMetricsPanel'));
export const LinkPreviewRenderer = React.lazy(() => import('../components/LinkPreviewRenderer'));

// 🚀 BATCH 7: Store & Gamification
export const InventoryPanel = React.lazy(() => import('../components/InventoryPanel'));
export const WaitlistPanel = React.lazy(() => import('../components/WaitlistPanel'));
export const ReferralRewardsPanel = React.lazy(() => import('../components/ReferralRewardsPanel'));

// 🔐 Auth & Security Pages
export const VerifyEmailPage = React.lazy(() => import('../pages/VerifyEmailPage'));
export const ForgotPasswordPage = React.lazy(() => import('../pages/ForgotPasswordPage'));
export const ResetPasswordPage = React.lazy(() => import('../pages/ResetPasswordPage'));
export const TwoFactorLoginPage = React.lazy(() => import('../pages/TwoFactorLoginPage'));
export const TwoFactorSetup = React.lazy(() => import('../components/TwoFactorSetup'));
export const TwoFactorLogin = React.lazy(() => import('../components/TwoFactorLogin'));

// 🔗 Vanity & Invite
export const VanityInviteScreen = React.lazy(() => import('../components/VanityInviteScreen'));
export const InviteCodeScreen = React.lazy(() => import('../components/InviteCodeScreen'));
export const EmailVerification = React.lazy(() => import('../components/EmailVerification'));

// 📱 Mobile Components
export const MobileNav = React.lazy(() => import('../components/MobileNav'));
export const SwipeActions = React.lazy(() => import('../components/SwipeActions'));
export const VoiceMessage = React.lazy(() => import('../components/VoiceMessage'));

// ⚡ Primary lazy components
export const FriendsTab = React.lazy(() => import('../FriendsTab'));
export const RoomList = React.lazy(() => import('../RoomList'));
export const UserProfilePanel = React.lazy(() => import('../UserProfilePanel'));
export const VoiceChatPanel = React.lazy(() => import('../VoiceChatPanel'));
export const ChatUserList = React.lazy(() => import('../ChatUserList'));
export const PinnedMessages = React.lazy(() => import('../PinnedMessages'));
export const FloatingVoiceIsland = React.lazy(() => import('../FloatingVoiceIsland'));
export const CinemaPlayer = React.lazy(() => import('../components/CinemaPlayer'));
export const ConnectionsPanel = React.lazy(() => import('../components/ConnectionsPanel'));
export const PasswordSetupModal = React.lazy(() => import('../components/PasswordSetupModal'));
export const NotificationDropdown = React.lazy(() => import('../components/NotificationDropdown'));

// 📊 Analytics Panels
export const ReactionStatsPanel = React.lazy(() => import('../components/panels/ReactionStatsPanel'));
export const ServerHealthPanel = React.lazy(() => import('../components/panels/ServerHealthPanel'));
export const ChannelAnalyticsPanel = React.lazy(() => import('../components/panels/ChannelAnalyticsPanel'));
export const SmartSuggestionsPanel = React.lazy(() => import('../components/panels/SmartSuggestionsPanel'));
export const UserPresenceInsightsPanel = React.lazy(() => import('../components/panels/UserPresenceInsightsPanel'));

// UI Components
export const UserFooter = React.lazy(() => import('../components/UserFooter'));
export const UserContextMenu = React.lazy(() => import('../components/UserContextMenu'));

// 🎮 BATCH 8: New Features
export const MiniGamesPanel = React.lazy(() => import('../components/MiniGamesPanel'));
export const ProjectCollaborationPanel = React.lazy(() => import('../components/ProjectCollaborationPanel'));
export const AvatarStudioPanel = React.lazy(() => import('../components/AvatarStudioPanel'));

// 🔥 BATCH 9: Essential UX
export const ImageLightbox = React.lazy(() => import('../components/ImageLightbox'));
export const ChannelAboutPanel = React.lazy(() => import('../components/ChannelAboutPanel'));
export const MessageSchedulePicker = React.lazy(() => import('../components/MessageSchedulePicker'));

// 🔥 BATCH 10: Core UX
export const UserSettingsModal = React.lazy(() => import('../components/UserSettingsModal'));
export const KeyboardShortcutsModal = React.lazy(() => import('../components/KeyboardShortcutsModal'));
export const CommandPalette = React.lazy(() => import('../components/CommandPalette'));
export const ServerDiscoveryPage = React.lazy(() => import('../components/ServerDiscoveryPage'));
export const AppearanceSettingsPanel = React.lazy(() => import('../components/AppearanceSettingsPanel'));
export const LanguageSelector = React.lazy(() => import('../components/LanguageSelector'));
export const ChangelogPanel = React.lazy(() => import('../components/ChangelogPanel'));
export const LogoutModal = React.lazy(() => import('../components/LogoutModal'));
export const NotificationSoundSettings = React.lazy(() => import('../components/NotificationSoundSettings'));
export const QuickSwitcher = React.lazy(() => import('../components/QuickSwitcher'));

// Security & Account
export const LoginHistory = React.lazy(() => import('../components/LoginHistory'));
export const SecuritySettingsPanel = React.lazy(() => import('../components/SecuritySettingsPanel'));
export const PrivacySettingsPanel = React.lazy(() => import('../components/PrivacySettingsPanel'));
export const AccountDeletionModal = React.lazy(() => import('../components/AccountDeletionModal'));
export const BlockListPanel = React.lazy(() => import('../components/BlockListPanel'));
export const E2EESettingsPanel = React.lazy(() => import('../components/E2EESettingsPanel'));

// Communication
export const ThreadView = React.lazy(() => import('../components/ThreadView'));
export const ScheduledMessagesPanel = React.lazy(() => import('../components/ScheduledMessagesPanel'));
export const ReminderPanel = React.lazy(() => import('../components/ReminderPanel'));
export const ForumPanel = React.lazy(() => import('../components/ForumPanel'));
export const StageChannelPanel = React.lazy(() => import('../components/StageChannelPanel'));
export const VideoCallModal = React.lazy(() => import('../components/VideoCallModal'));
export const VoiceSettingsPanel = React.lazy(() => import('../components/VoiceSettingsPanel'));
export const MessageSearchPanel = React.lazy(() => import('../components/MessageSearchPanel'));
export const WatchTogether = React.lazy(() => import('../components/WatchTogether'));

// Server Management
export const AutoRolesPanel = React.lazy(() => import('../components/AutoRolesPanel'));
export const ReactionRolesPanel = React.lazy(() => import('../components/ReactionRolesPanel'));
export const WelcomeMessagesPanel = React.lazy(() => import('../components/WelcomeMessagesPanel'));
export const EventCalendar = React.lazy(() => import('../components/EventCalendar'));
export const GiveawayPanel = React.lazy(() => import('../components/GiveawayPanel'));
export const TicketSystemPanel = React.lazy(() => import('../components/TicketSystemPanel'));
export const StarboardPanel = React.lazy(() => import('../components/StarboardPanel'));
export const ServerBackupPanel = React.lazy(() => import('../components/ServerBackupPanel'));
export const BanAppealsPanel = React.lazy(() => import('../components/BanAppealsPanel'));
export const CustomCommandsPanel = React.lazy(() => import('../components/CustomCommandsPanel'));
export const LevelingSystemPanel = React.lazy(() => import('../components/LevelingSystemPanel'));
export const LiveStreamPanel = React.lazy(() => import('../components/LiveStreamPanel'));

// Engagement & Social
export const AchievementsPanel = React.lazy(() => import('../components/AchievementsPanel'));
export const BirthdaySystemPanel = React.lazy(() => import('../components/BirthdaySystemPanel'));
export const PremiumModal = React.lazy(() => import('../components/PremiumModal'));
export const MusicPlayer = React.lazy(() => import('../components/MusicPlayer'));
export const BotMarketplace = React.lazy(() => import('../components/BotMarketplace'));
export const ProfileCustomization = React.lazy(() => import('../components/ProfileCustomization'));
export const IntegrationHubPanel = React.lazy(() => import('../components/IntegrationHubPanel'));
export const TournamentSystem = React.lazy(() => import('../components/TournamentSystem'));

// Advanced Features
export const HighlightsPanel = React.lazy(() => import('../components/HighlightsPanel'));
export const CustomEmbedPanel = React.lazy(() => import('../components/CustomEmbedPanel'));
export const SpotifyIntegrationPanel = React.lazy(() => import('../components/SpotifyIntegrationPanel'));
export const ServerClonePanel = React.lazy(() => import('../components/ServerClonePanel'));
export const WeeklyChallengesPanel = React.lazy(() => import('../components/WeeklyChallengesPanel'));

// 🔥 BATCH 11: Moderation & Admin
export const ModeratorTools = React.lazy(() => import('../components/ModeratorTools'));
export const AIModerationPanel = React.lazy(() => import('../components/AIModerationPanel'));
export const SpamDetectionPanel = React.lazy(() => import('../components/SpamDetectionPanel'));
export const AuditLogsPanel = React.lazy(() => import('../components/AuditLogsPanel'));
export const BanHistoryPanel = React.lazy(() => import('../components/BanHistoryPanel'));
export const ModerationLogsPanel = React.lazy(() => import('../components/ModerationLogsPanel'));
export const RaidProtectionDashboard = React.lazy(() => import('../components/RaidProtectionDashboard'));
export const SecurityAlertsPanel = React.lazy(() => import('../components/SecurityAlertsPanel'));

// Communication & Messages
export const BookmarksPanel = React.lazy(() => import('../components/BookmarksPanel'));
export const GIFPickerPanel = React.lazy(() => import('../components/GIFPickerPanel'));
export const PollCreator = React.lazy(() => import('../components/PollCreator'));
export const StickersPanel = React.lazy(() => import('../components/StickersPanel'));
export const SavedMessagesModal = React.lazy(() => import('../components/SavedMessagesModal'));
export const NotificationsCenter = React.lazy(() => import('../components/NotificationsCenter'));
export const MessageSummaryPanel = React.lazy(() => import('../components/MessageSummaryPanel'));
export const TranslationPanel = React.lazy(() => import('../components/TranslationPanel'));

// Server Management (Batch 11)
export const ChannelSettingsModal = React.lazy(() => import('../components/ChannelSettingsModal'));
export const InviteModal = React.lazy(() => import('../components/InviteModal'));
export const ServerTemplates = React.lazy(() => import('../components/ServerTemplates'));
export const ServerAnalyticsDashboard = React.lazy(() => import('../components/ServerAnalyticsDashboard'));
export const RolesManager = React.lazy(() => import('../components/RolesManager'));
export const WelcomeScreenEditor = React.lazy(() => import('../components/WelcomeScreenEditor'));
export const CommunitySettingsPanel = React.lazy(() => import('../components/CommunitySettingsPanel'));
export const InviteLinkManager = React.lazy(() => import('../components/InviteLinkManager'));

// Bot & Developer
export const BotBuilder = React.lazy(() => import('../components/BotBuilder'));
export const BotDeveloperPortal = React.lazy(() => import('../components/BotDeveloperPortal'));
export const WebhookManager = React.lazy(() => import('../components/WebhookManager'));
export const APIKeysPanel = React.lazy(() => import('../components/APIKeysPanel'));
export const SlashCommandsPanel = React.lazy(() => import('../components/SlashCommandsPanel'));
export const CodeRunnerPanel = React.lazy(() => import('../components/CodeRunnerPanel'));

// Profile & Social
export const ProfileCard = React.lazy(() => import('../components/ProfileCard'));
export const UserNotesModal = React.lazy(() => import('../components/UserNotesModal'));
export const StatusPicker = React.lazy(() => import('../components/StatusPicker'));
export const MutualsPanel = React.lazy(() => import('../components/MutualsPanel'));
export const ProfileShowcasePanel = React.lazy(() => import('../components/ProfileShowcasePanel'));
export const SessionManagerModal = React.lazy(() => import('../components/SessionManagerModal'));

// Premium & Economy
export const CoinStoreModal = React.lazy(() => import('../components/CoinStoreModal'));
export const PremiumManagementPanel = React.lazy(() => import('../components/PremiumManagementPanel'));
export const SubscriptionManager = React.lazy(() => import('../components/SubscriptionManager'));
export const GiftPremiumPanel = React.lazy(() => import('../components/GiftPremiumPanel'));
export const PremiumMarketplace = React.lazy(() => import('../components/PremiumMarketplace'));
export const ThemeMarketplace = React.lazy(() => import('../components/ThemeMarketplace'));

// Advanced
export const AIChatbotPanel = React.lazy(() => import('../components/AIChatbotPanel'));
export const CollaborativeCodeEditor = React.lazy(() => import('../components/CollaborativeCodeEditor'));
export const ScreenShareModal = React.lazy(() => import('../components/ScreenShareModal'));
export const LiveStreamModal = React.lazy(() => import('../components/LiveStreamModal'));
export const AdvancedAnalyticsDashboard = React.lazy(() => import('../components/AdvancedAnalyticsDashboard'));
export const FileManagerPanel = React.lazy(() => import('../components/FileManagerPanel'));
export const ReportsPanel = React.lazy(() => import('../components/ReportsPanel'));
export const ErrorReportingPanel = React.lazy(() => import('../components/ErrorReportingPanel'));
