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
  {
    key: 'moderatorTools', C: ModeratorTools, fb: '🛡️ Moderasyon Araçları Yükleniyor...',
    props: c => ({ ...api(c), serverId: c.activeChat?.server_id, roomSlug: c.activeChat?.slug })
  },
  // 2. AI Moderation
  {
    key: 'aIModeration', C: AIModerationPanel, fb: '🤖 AI Moderasyon Yükleniyor...',
    props: c => ({ ...api(c), serverId: c.activeChat?.server_id })
  },
  // 3. Spam Detection
  {
    key: 'spamDetection', C: SpamDetectionPanel, fb: '🚫 Spam Koruması Yükleniyor...',
    props: c => ({ ...api(c), serverId: c.activeChat?.server_id })
  },
  // 4. Audit Logs
  {
    key: 'auditLogs', C: AuditLogsPanel, fb: '📋 Denetim Kayıtları Yükleniyor...',
    props: c => ({ ...api(c), serverId: c.activeChat?.server_id })
  },
  // 5. Ban History
  {
    key: 'banHistory', C: BanHistoryPanel, fb: '⛔ Ban Geçmişi Yükleniyor...',
    props: c => ({ ...api(c), serverId: c.activeChat?.server_id })
  },
  // 6. Moderation Logs
  {
    key: 'moderationLogs', C: ModerationLogsPanel, fb: '📜 Moderasyon Logları Yükleniyor...',
    props: c => ({ ...api(c), serverId: c.activeChat?.server_id })
  },
  // 8. Security Alerts
  {
    key: 'securityAlerts', C: SecurityAlertsPanel, fb: '🚨 Güvenlik Uyarıları Yükleniyor...',
    props: api
  },
  // 10. GIF Picker
  {
    key: 'gIFPicker', C: GIFPickerPanel, fb: '🎞️ GIF Seçici Yükleniyor...',
    props: c => ({ ...api(c), onSelect: () => { c.closeModal('gIFPicker'); } })
  },
  // 11. Poll Creator
  {
    key: 'pollCreator', C: PollCreator, fb: '📊 Anket Oluşturucu Yükleniyor...',
    props: c => ({ ...api(c), roomSlug: c.activeChat?.slug })
  },
  // 12. Stickers
  {
    key: 'stickers', C: StickersPanel, fb: '🎨 Çıkartmalar Yükleniyor...',
    props: c => ({ ...api(c), onSelect: () => { c.closeModal('stickers'); } })
  },
  // 13. Saved Messages
  {
    key: 'savedMessages', C: SavedMessagesModal, fb: '💾 Kayıtlı Mesajlar Yükleniyor...',
    props: c => ({ ...api(c), username: c.username })
  },
  // 14. Notifications Center
  {
    key: 'notificationsCenter', C: NotificationsCenter, fb: '🔔 Bildirimler Yükleniyor...',
    props: c => ({ ...api(c), username: c.username })
  },
  // 15. Message Summary
  {
    key: 'messageSummary', C: MessageSummaryPanel, fb: '📝 Özet Yükleniyor...',
    props: c => ({ ...api(c), roomSlug: c.activeChat?.slug })
  },
  // 16. Translation
  {
    key: 'translation', C: TranslationPanel, fb: '🌍 Çeviri Yükleniyor...',
    props: api
  },
  // 17. Channel Settings (room only)
  {
    key: 'channelSettings', C: ChannelSettingsModal, fb: '⚙️ Kanal Ayarları Yükleniyor...',
    cond: c => c.activeChat?.type === 'room',
    props: c => {
      const slug = c.activeChat?.slug || c.activeChat?.id;
      let room = null;
      let serverRoles = [];
      // Look up the full room object from categories tree
      if (c.categories) {
        for (const srv of c.categories) {
          for (const cat of (srv.categories || [])) {
            const found = (cat.rooms || []).find(r => r.slug === slug);
            if (found) { room = { ...found, server_id: srv.id }; serverRoles = srv.roles || []; break; }
          }
          if (room) break;
        }
      }
      // Fallback: construct minimal room from activeChat if lookup fails
      if (!room) room = { slug, name: slug || 'Kanal', channel_type: 'text', server_id: c.activeChat?.server_id };
      return { ...api(c), room, serverRoles };
    }
  },
  // 18. Invite Modal (room only, uses API_BASE_URL)
  {
    key: 'inviteModal', C: InviteModal, fb: '📨 Davet Yükleniyor...',
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
    })
  },
  // 19. Server Templates
  {
    key: 'serverTemplates', C: ServerTemplates, fb: '📋 Şablonlar Yükleniyor...',
    props: api
  },
  // 20. Server Analytics
  {
    key: 'serverAnalytics', C: ServerAnalyticsDashboard, fb: '📊 Analitik Yükleniyor...',
    props: c => ({ ...api(c), serverId: c.activeChat?.server_id })
  },
  // 21. Roles Manager (room only)
  {
    key: 'rolesManager', C: RolesManager, fb: '👑 Rol Yöneticisi Yükleniyor...',
    cond: c => c.activeChat?.type === 'room',
    props: c => ({ ...api(c), serverId: c.activeChat.server_id })
  },
  // 22. Welcome Screen Editor
  {
    key: 'welcomeScreenEditor', C: WelcomeScreenEditor, fb: '👋 Karşılama Ekranı Yükleniyor...',
    props: c => ({ ...api(c), serverId: c.activeChat?.server_id })
  },
  // 23. Community Settings
  {
    key: 'communitySettings', C: CommunitySettingsPanel, fb: '🏘️ Topluluk Ayarları Yükleniyor...',
    props: c => ({ ...api(c), serverId: c.activeChat?.server_id })
  },
  // 24. Invite Link Manager
  {
    key: 'inviteLinkManager', C: InviteLinkManager, fb: '🔗 Davet Linkleri Yükleniyor...',
    props: c => ({ ...api(c), serverId: c.activeChat?.server_id })
  },
  // 25. Bot Builder
  {
    key: 'botBuilder', C: BotBuilder, fb: '🤖 Bot Oluşturucu Yükleniyor...',
    props: api
  },
  // 26. Bot Developer Portal
  {
    key: 'botDevPortal', C: BotDeveloperPortal, fb: '🧑‍💻 Geliştirici Portalı Yükleniyor...',
    props: api
  },
  // 27. Webhook Manager
  {
    key: 'webhookManager', C: WebhookManager, fb: '🔗 Webhook Yöneticisi Yükleniyor...',
    props: c => ({ ...api(c), serverId: c.activeChat?.server_id })
  },
  // 28. API Keys
  {
    key: 'aPIKeys', C: APIKeysPanel, fb: '🔑 API Anahtarları Yükleniyor...',
    props: api
  },
  // 29. Slash Commands
  {
    key: 'slashCommands', C: SlashCommandsPanel, fb: '⚡ Komut Yöneticisi Yükleniyor...',
    props: c => ({ ...api(c), serverId: c.activeChat?.server_id })
  },
  // 30. Code Runner
  {
    key: 'codeRunner', C: CodeRunnerPanel, fb: '💻 Kod Çalıştırıcı Yükleniyor...',
    props: api
  },
  // 31. Profile Card
  {
    key: 'profileCard', C: ProfileCard, fb: '👤 Profil Kartı Yükleniyor...',
    props: c => ({ ...api(c), username: c.username, currentUser: c.currentUserProfile })
  },
  // 32. User Notes
  {
    key: 'userNotes', C: UserNotesModal, fb: '📝 Notlar Yükleniyor...',
    props: c => ({ ...api(c), username: c.username })
  },
  // 33. Status Picker
  {
    key: 'statusPicker', C: StatusPicker, fb: '🟢 Durum Seçici Yükleniyor...',
    props: c => ({ ...api(c), currentUser: c.currentUserProfile })
  },
  // 34. Mutuals Panel
  {
    key: 'mutuals', C: MutualsPanel, fb: '👥 Ortak Arkadaşlar Yükleniyor...',
    props: c => ({ ...api(c), username: c.username })
  },
  // 35. Profile Showcase
  {
    key: 'profileShowcase', C: ProfileShowcasePanel, fb: '🏅 Profil Vitrini Yükleniyor...',
    props: c => ({ ...api(c), username: c.username, currentUser: c.currentUserProfile })
  },
  // 36. Session Manager
  {
    key: 'sessionManager', C: SessionManagerModal, fb: '📱 Oturum Yöneticisi Yükleniyor...',
    props: api
  },
  // 37. Coin Store
  {
    key: 'coinStore', C: CoinStoreModal, fb: '🪙 Mağaza Yükleniyor...',
    props: c => ({ ...api(c), username: c.username })
  },
  // 38. Premium Management
  {
    key: 'premiumManagement', C: PremiumManagementPanel, fb: '💎 Premium Yönetimi Yükleniyor...',
    props: c => ({ ...api(c), username: c.username })
  },
  // 39. Subscription Manager
  {
    key: 'subscriptionManager', C: SubscriptionManager, fb: '📋 Abonelikler Yükleniyor...',
    props: c => ({ ...api(c), username: c.username })
  },
  // 40. Gift Premium
  {
    key: 'giftPremium', C: GiftPremiumPanel, fb: '🎁 Hediye Premium Yükleniyor...',
    props: c => ({ ...api(c), username: c.username })
  },
  // 41. Premium Marketplace
  {
    key: 'premiumMarketplace', C: PremiumMarketplace, fb: '🛒 Premium Mağaza Yükleniyor...',
    props: api
  },
  // 42. Theme Marketplace
  {
    key: 'themeMarketplace', C: ThemeMarketplace, fb: '🎨 Tema Mağazası Yükleniyor...',
    props: api
  },
  // 43. AI Chatbot
  {
    key: 'aIChatbot', C: AIChatbotPanel, fb: '🤖 AI Chatbot Yükleniyor...',
    props: c => ({ ...api(c), username: c.username })
  },
  // 44. Collaborative Code Editor
  {
    key: 'codeEditor', C: CollaborativeCodeEditor, fb: '👨‍💻 Kod Editörü Yükleniyor...',
    props: c => ({ ...api(c), roomSlug: c.activeChat?.slug, username: c.username })
  },
  // 45. Screen Share
  {
    key: 'screenShare', C: ScreenShareModal, fb: '🖥️ Ekran Paylaşımı Yükleniyor...',
    props: c => ({ ...api(c), roomSlug: c.activeChat?.slug })
  },
  // 46. Live Stream
  {
    key: 'liveStreamModal', C: LiveStreamModal, fb: '📺 Canlı Yayın Yükleniyor...',
    props: c => ({ ...api(c), roomSlug: c.activeChat?.slug, username: c.username })
  },
  // 47. Advanced Analytics
  {
    key: 'advancedAnalytics', C: AdvancedAnalyticsDashboard, fb: '📈 Gelişmiş Analitik Yükleniyor...',
    props: c => ({ ...api(c), serverId: c.activeChat?.server_id })
  },
  // 48. File Manager
  {
    key: 'fileManager', C: FileManagerPanel, fb: '📁 Dosya Yöneticisi Yükleniyor...',
    props: c => ({ ...api(c), roomSlug: c.activeChat?.slug })
  },
  // 49. Reports
  {
    key: 'reports', C: ReportsPanel, fb: '📊 Raporlar Yükleniyor...',
    props: c => ({ ...api(c), serverId: c.activeChat?.server_id })
  },
  // 50. Error Reporting
  {
    key: 'errorReporting', C: ErrorReportingPanel, fb: '🐛 Hata Raporlama Yükleniyor...',
    props: api
  },
  // Feature Hub (not lazy, no suspense needed)
  { key: 'featureHub', C: FeatureHubModal, noSuspense: true },
];
