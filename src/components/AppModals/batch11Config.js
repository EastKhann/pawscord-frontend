import React from 'react';
import { ABSOLUTE_HOST_URL, API_BASE_URL } from '../../config/api';
import FeatureHubModal from '../FeatureHubModal';

// Lazy imports
const AIChatbotPanel = React.lazy(() => import('../AIChatbotPanel'));
const AIModerationPanel = React.lazy(() => import('../AIModerationPanel'));
const APIKeysPanel = React.lazy(() => import('../APIKeysPanel'));
const AdvancedAnalyticsDashboard = React.lazy(() => import('../AdvancedAnalyticsDashboard'));
const AuditLogsPanel = React.lazy(() => import('../AuditLogsPanel'));
const BanHistoryPanel = React.lazy(() => import('../BanHistoryPanel'));
const BotBuilder = React.lazy(() => import('../BotBuilder'));
const BotDeveloperPortal = React.lazy(() => import('../BotDeveloperPortal'));
const ChannelSettingsModal = React.lazy(() => import('../ChannelSettingsModal'));
const CodeRunnerPanel = React.lazy(() => import('../CodeRunnerPanel'));
const CoinStoreModal = React.lazy(() => import('../CoinStoreModal'));
const CollaborativeCodeEditor = React.lazy(() => import('../CollaborativeCodeEditor'));
const CommunitySettingsPanel = React.lazy(() => import('../CommunitySettingsPanel'));
const ErrorReportingPanel = React.lazy(() => import('../ErrorReportingPanel'));
const FileManagerPanel = React.lazy(() => import('../FileManagerPanel'));
const GIFPickerPanel = React.lazy(() => import('../GIFPickerPanel'));
const GiftPremiumPanel = React.lazy(() => import('../GiftPremiumPanel'));
const InviteLinkManager = React.lazy(() => import('../InviteLinkManager'));
const InviteModal = React.lazy(() => import('../InviteModal'));
const LiveStreamModal = React.lazy(() => import('../LiveStreamModal'));
const MessageSummaryPanel = React.lazy(() => import('../MessageSummaryPanel'));
const ModerationLogsPanel = React.lazy(() => import('../ModerationLogsPanel'));
const ModeratorTools = React.lazy(() => import('../ModeratorTools'));
const MutualsPanel = React.lazy(() => import('../MutualsPanel'));
const NotificationsCenter = React.lazy(() => import('../NotificationsCenter'));
const PollCreator = React.lazy(() => import('../PollCreator'));
const PremiumManagementPanel = React.lazy(() => import('../PremiumManagementPanel'));
const PremiumMarketplace = React.lazy(() => import('../PremiumMarketplace'));
const ProfileCard = React.lazy(() => import('../ProfileCard'));
const ProfileShowcasePanel = React.lazy(() => import('../ProfileShowcasePanel'));
const ReportsPanel = React.lazy(() => import('../ReportsPanel'));
const RolesManager = React.lazy(() => import('../RolesManager'));
const SavedMessagesModal = React.lazy(() => import('../SavedMessagesModal'));
const ScreenShareModal = React.lazy(() => import('../ScreenShareModal'));
const SecurityAlertsPanel = React.lazy(() => import('../SecurityAlertsPanel'));
const ServerAnalyticsDashboard = React.lazy(() => import('../ServerAnalyticsDashboard'));
const ServerTemplates = React.lazy(() => import('../ServerTemplates'));
const SessionManagerModal = React.lazy(() => import('../SessionManagerModal'));
const SlashCommandsPanel = React.lazy(() => import('../SlashCommandsPanel'));
const SpamDetectionPanel = React.lazy(() => import('../SpamDetectionPanel'));
const StatusPicker = React.lazy(() => import('../StatusPicker'));
const StickersPanel = React.lazy(() => import('../StickersPanel'));
const SubscriptionManager = React.lazy(() => import('../SubscriptionManager'));
const ThemeMarketplace = React.lazy(() => import('../ThemeMarketplace'));
const TranslationPanel = React.lazy(() => import('../TranslationPanel'));
const UserNotesModal = React.lazy(() => import('../UserNotesModal'));
const WebhookManager = React.lazy(() => import('../WebhookManager'));
const WelcomeScreenEditor = React.lazy(() => import('../WelcomeScreenEditor'));

// Prop helpers
const API = ABSOLUTE_HOST_URL;
const api = (c) => ({ fetchWithAuth: c.fetchWithAuth, apiBaseUrl: API });
const isRoom = (c) => c.activeChat?.type === 'room' && c.activeChat?.server_id;

/**
 * BATCH11_MODALS config array — 50 modals + FeatureHub
 * Each entry: { key, C, fb?, cond?, props? }
 */
export const BATCH11_MODALS = [
  // 1. Moderator Tools
  { key: 'moderatorTools', C: ModeratorTools, fb: '\uD83D\uDEE1\uFE0F Moderasyon Ara\u00E7lar\u0131 Y\u00FCkleniyor...',
    props: c => ({ ...api(c), serverId: c.activeChat?.server_id, roomSlug: c.activeChat?.slug }) },
  // 2. AI Moderation
  { key: 'aIModeration', C: AIModerationPanel, fb: '\uD83E\uDD16 AI Moderasyon Y\u00FCkleniyor...',
    props: c => ({ ...api(c), serverId: c.activeChat?.server_id }) },
  // 3. Spam Detection
  { key: 'spamDetection', C: SpamDetectionPanel, fb: '\uD83D\uDEAB Spam Korumas\u0131 Y\u00FCkleniyor...',
    props: c => ({ ...api(c), serverId: c.activeChat?.server_id }) },
  // 4. Audit Logs
  { key: 'auditLogs', C: AuditLogsPanel, fb: '\uD83D\uDCCB Denetim Kay\u0131tlar\u0131 Y\u00FCkleniyor...',
    props: c => ({ ...api(c), serverId: c.activeChat?.server_id }) },
  // 5. Ban History
  { key: 'banHistory', C: BanHistoryPanel, fb: '\u26D4 Ban Ge\u00E7mi\u015Fi Y\u00FCkleniyor...',
    props: c => ({ ...api(c), serverId: c.activeChat?.server_id }) },
  // 6. Moderation Logs
  { key: 'moderationLogs', C: ModerationLogsPanel, fb: '\uD83D\uDCDC Moderasyon Loglar\u0131 Y\u00FCkleniyor...',
    props: c => ({ ...api(c), serverId: c.activeChat?.server_id }) },
  // 8. Security Alerts
  { key: 'securityAlerts', C: SecurityAlertsPanel, fb: '\uD83D\uDEA8 G\u00FCvenlik Uyar\u0131lar\u0131 Y\u00FCkleniyor...',
    props: api },
  // 10. GIF Picker
  { key: 'gIFPicker', C: GIFPickerPanel, fb: '\uD83C\uDF9E\uFE0F GIF Se\u00E7ici Y\u00FCkleniyor...',
    props: c => ({ ...api(c), onSelect: () => { c.closeModal('gIFPicker'); } }) },
  // 11. Poll Creator
  { key: 'pollCreator', C: PollCreator, fb: '\uD83D\uDCCA Anket Olu\u015Fturucu Y\u00FCkleniyor...',
    props: c => ({ ...api(c), roomSlug: c.activeChat?.slug }) },
  // 12. Stickers
  { key: 'stickers', C: StickersPanel, fb: '\uD83C\uDFA8 \u00C7\u0131kartmalar Y\u00FCkleniyor...',
    props: c => ({ ...api(c), onSelect: () => { c.closeModal('stickers'); } }) },
  // 13. Saved Messages
  { key: 'savedMessages', C: SavedMessagesModal, fb: '\uD83D\uDCBE Kay\u0131tl\u0131 Mesajlar Y\u00FCkleniyor...',
    props: c => ({ ...api(c), username: c.username }) },
  // 14. Notifications Center
  { key: 'notificationsCenter', C: NotificationsCenter, fb: '\uD83D\uDD14 Bildirimler Y\u00FCkleniyor...',
    props: c => ({ ...api(c), username: c.username }) },
  // 15. Message Summary
  { key: 'messageSummary', C: MessageSummaryPanel, fb: '\uD83D\uDCDD \u00D6zet Y\u00FCkleniyor...',
    props: c => ({ ...api(c), roomSlug: c.activeChat?.slug }) },
  // 16. Translation
  { key: 'translation', C: TranslationPanel, fb: '\uD83C\uDF0D \u00C7eviri Y\u00FCkleniyor...',
    props: api },
  // 17. Channel Settings (room only)
  { key: 'channelSettings', C: ChannelSettingsModal, fb: '\u2699\uFE0F Kanal Ayarlar\u0131 Y\u00FCkleniyor...',
    cond: c => c.activeChat?.type === 'room',
    props: c => ({ ...api(c), roomSlug: c.activeChat.slug, serverId: c.activeChat.server_id }) },
  // 18. Invite Modal (room only, uses API_BASE_URL)
  { key: 'inviteModal', C: InviteModal, fb: '\uD83D\uDCE8 Davet Y\u00FCkleniyor...',
    cond: c => c.activeChat?.type === 'room',
    props: c => ({
      fetchWithAuth: c.fetchWithAuth,
      apiBaseUrl: API_BASE_URL,
      server: (() => {
        for (const srv of (c.categories || [])) {
          for (const cat of (srv.categories || [])) {
            if (cat.rooms?.some(r => r.slug === c.activeChat.id)) {
              return { id: srv.id, name: srv.name, avatar: srv.avatar };
            }
          }
        }
        return { id: c.activeChat.server_id, name: 'Sunucu' };
      })(),
      currentUser: c.username,
    }) },
  // 19. Server Templates
  { key: 'serverTemplates', C: ServerTemplates, fb: '\uD83D\uDCCB \u015Eablonlar Y\u00FCkleniyor...',
    props: api },
  // 20. Server Analytics
  { key: 'serverAnalytics', C: ServerAnalyticsDashboard, fb: '\uD83D\uDCCA Analitik Y\u00FCkleniyor...',
    props: c => ({ ...api(c), serverId: c.activeChat?.server_id }) },
  // 21. Roles Manager (room only)
  { key: 'rolesManager', C: RolesManager, fb: '\uD83D\uDC51 Rol Y\u00F6neticisi Y\u00FCkleniyor...',
    cond: c => c.activeChat?.type === 'room',
    props: c => ({ ...api(c), serverId: c.activeChat.server_id }) },
  // 22. Welcome Screen Editor
  { key: 'welcomeScreenEditor', C: WelcomeScreenEditor, fb: '\uD83D\uDC4B Kar\u015F\u0131lama Ekran\u0131 Y\u00FCkleniyor...',
    props: c => ({ ...api(c), serverId: c.activeChat?.server_id }) },
  // 23. Community Settings
  { key: 'communitySettings', C: CommunitySettingsPanel, fb: '\uD83C\uDFD8\uFE0F Topluluk Ayarlar\u0131 Y\u00FCkleniyor...',
    props: c => ({ ...api(c), serverId: c.activeChat?.server_id }) },
  // 24. Invite Link Manager
  { key: 'inviteLinkManager', C: InviteLinkManager, fb: '\uD83D\uDD17 Davet Linkleri Y\u00FCkleniyor...',
    props: c => ({ ...api(c), serverId: c.activeChat?.server_id }) },
  // 25. Bot Builder
  { key: 'botBuilder', C: BotBuilder, fb: '\uD83E\uDD16 Bot Olu\u015Fturucu Y\u00FCkleniyor...',
    props: api },
  // 26. Bot Developer Portal
  { key: 'botDevPortal', C: BotDeveloperPortal, fb: '\uD83E\uDDD1\u200D\uD83D\uDCBB Geli\u015Ftirici Portal\u0131 Y\u00FCkleniyor...',
    props: api },
  // 27. Webhook Manager
  { key: 'webhookManager', C: WebhookManager, fb: '\uD83D\uDD17 Webhook Y\u00F6neticisi Y\u00FCkleniyor...',
    props: c => ({ ...api(c), serverId: c.activeChat?.server_id }) },
  // 28. API Keys
  { key: 'aPIKeys', C: APIKeysPanel, fb: '\uD83D\uDD11 API Anahtarlar\u0131 Y\u00FCkleniyor...',
    props: api },
  // 29. Slash Commands
  { key: 'slashCommands', C: SlashCommandsPanel, fb: '\u26A1 Komut Y\u00F6neticisi Y\u00FCkleniyor...',
    props: c => ({ ...api(c), serverId: c.activeChat?.server_id }) },
  // 30. Code Runner
  { key: 'codeRunner', C: CodeRunnerPanel, fb: '\uD83D\uDCBB Kod \u00C7al\u0131\u015Ft\u0131r\u0131c\u0131 Y\u00FCkleniyor...',
    props: api },
  // 31. Profile Card
  { key: 'profileCard', C: ProfileCard, fb: '\uD83D\uDC64 Profil Kart\u0131 Y\u00FCkleniyor...',
    props: c => ({ ...api(c), username: c.username, currentUser: c.currentUserProfile }) },
  // 32. User Notes
  { key: 'userNotes', C: UserNotesModal, fb: '\uD83D\uDCDD Notlar Y\u00FCkleniyor...',
    props: c => ({ ...api(c), username: c.username }) },
  // 33. Status Picker
  { key: 'statusPicker', C: StatusPicker, fb: '\uD83D\uDFE2 Durum Se\u00E7ici Y\u00FCkleniyor...',
    props: c => ({ ...api(c), currentUser: c.currentUserProfile }) },
  // 34. Mutuals Panel
  { key: 'mutuals', C: MutualsPanel, fb: '\uD83D\uDC65 Ortak Arkada\u015Flar Y\u00FCkleniyor...',
    props: c => ({ ...api(c), username: c.username }) },
  // 35. Profile Showcase
  { key: 'profileShowcase', C: ProfileShowcasePanel, fb: '\uD83C\uDFC5 Profil Vitrini Y\u00FCkleniyor...',
    props: c => ({ ...api(c), username: c.username, currentUser: c.currentUserProfile }) },
  // 36. Session Manager
  { key: 'sessionManager', C: SessionManagerModal, fb: '\uD83D\uDCF1 Oturum Y\u00F6neticisi Y\u00FCkleniyor...',
    props: api },
  // 37. Coin Store
  { key: 'coinStore', C: CoinStoreModal, fb: '\uD83E\uDE99 Ma\u011Faza Y\u00FCkleniyor...',
    props: c => ({ ...api(c), username: c.username }) },
  // 38. Premium Management
  { key: 'premiumManagement', C: PremiumManagementPanel, fb: '\uD83D\uDC8E Premium Y\u00F6netimi Y\u00FCkleniyor...',
    props: c => ({ ...api(c), username: c.username }) },
  // 39. Subscription Manager
  { key: 'subscriptionManager', C: SubscriptionManager, fb: '\uD83D\uDCCB Abonelikler Y\u00FCkleniyor...',
    props: c => ({ ...api(c), username: c.username }) },
  // 40. Gift Premium
  { key: 'giftPremium', C: GiftPremiumPanel, fb: '\uD83C\uDF81 Hediye Premium Y\u00FCkleniyor...',
    props: c => ({ ...api(c), username: c.username }) },
  // 41. Premium Marketplace
  { key: 'premiumMarketplace', C: PremiumMarketplace, fb: '\uD83D\uDED2 Premium Ma\u011Faza Y\u00FCkleniyor...',
    props: api },
  // 42. Theme Marketplace
  { key: 'themeMarketplace', C: ThemeMarketplace, fb: '\uD83C\uDFA8 Tema Ma\u011Fazas\u0131 Y\u00FCkleniyor...',
    props: api },
  // 43. AI Chatbot
  { key: 'aIChatbot', C: AIChatbotPanel, fb: '\uD83E\uDD16 AI Chatbot Y\u00FCkleniyor...',
    props: c => ({ ...api(c), username: c.username }) },
  // 44. Collaborative Code Editor
  { key: 'codeEditor', C: CollaborativeCodeEditor, fb: '\uD83D\uDC68\u200D\uD83D\uDCBB Kod Edit\u00F6r\u00FC Y\u00FCkleniyor...',
    props: c => ({ ...api(c), roomSlug: c.activeChat?.slug, username: c.username }) },
  // 45. Screen Share
  { key: 'screenShare', C: ScreenShareModal, fb: '\uD83D\uDDA5\uFE0F Ekran Payla\u015F\u0131m\u0131 Y\u00FCkleniyor...',
    props: c => ({ ...api(c), roomSlug: c.activeChat?.slug }) },
  // 46. Live Stream
  { key: 'liveStreamModal', C: LiveStreamModal, fb: '\uD83D\uDCFA Canl\u0131 Yay\u0131n Y\u00FCkleniyor...',
    props: c => ({ ...api(c), roomSlug: c.activeChat?.slug, username: c.username }) },
  // 47. Advanced Analytics
  { key: 'advancedAnalytics', C: AdvancedAnalyticsDashboard, fb: '\uD83D\uDCC8 Geli\u015Fmi\u015F Analitik Y\u00FCkleniyor...',
    props: c => ({ ...api(c), serverId: c.activeChat?.server_id }) },
  // 48. File Manager
  { key: 'fileManager', C: FileManagerPanel, fb: '\uD83D\uDCC1 Dosya Y\u00F6neticisi Y\u00FCkleniyor...',
    props: c => ({ ...api(c), roomSlug: c.activeChat?.slug }) },
  // 49. Reports
  { key: 'reports', C: ReportsPanel, fb: '\uD83D\uDCCA Raporlar Y\u00FCkleniyor...',
    props: c => ({ ...api(c), serverId: c.activeChat?.server_id }) },
  // 50. Error Reporting
  { key: 'errorReporting', C: ErrorReportingPanel, fb: '\uD83D\uDC1B Hata Raporlama Y\u00FCkleniyor...',
    props: api },
  // Feature Hub (not lazy, no suspense needed)
  { key: 'featureHub', C: FeatureHubModal, noSuspense: true },
];
