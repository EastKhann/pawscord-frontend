import React from 'react';
import { ABSOLUTE_HOST_URL, API_BASE_URL } from '../../config/api';
const FeatureHubModal = React.lazy(() => import('../social/FeatureHubModal'));

// Lazy imports
const AIChatbotPanel = React.lazy(() => import('../chat/AIChatbotPanel'));
const AIModerationPanel = React.lazy(() => import('../AIModerationPanel'));
const APIKeysPanel = React.lazy(() => import('../bot/APIKeysPanel'));
const AdvancedAnalyticsDashboard = React.lazy(() => import('../AdvancedAnalyticsDashboard'));
const AuditLogsPanel = React.lazy(() => import('../admin/AuditLogsPanel'));
const BanHistoryPanel = React.lazy(() => import('../moderation/BanHistoryPanel'));
const BotBuilder = React.lazy(() => import('../BotBuilder'));
const BotDeveloperPortal = React.lazy(() => import('../BotDeveloperPortal'));
const ChannelSettingsModal = React.lazy(() => import('../server/ChannelSettingsModal'));
const CodeRunnerPanel = React.lazy(() => import('../chat/CodeRunnerPanel'));
const CoinStoreModal = React.lazy(() => import('../CoinStoreModal'));
const CollaborativeCodeEditor = React.lazy(() => import('../CollaborativeCodeEditor'));
const CommunitySettingsPanel = React.lazy(() => import('../CommunitySettingsPanel'));
const ErrorReportingPanel = React.lazy(() => import('../admin/ErrorReportingPanel'));
const FileManagerPanel = React.lazy(() => import('../shared/FileManagerPanel'));
const GIFPickerPanel = React.lazy(() => import('../chat/GIFPickerPanel'));
const GiftPremiumPanel = React.lazy(() => import('../chat/GiftPremiumPanel'));
const InviteLinkManager = React.lazy(() => import('../server/InviteLinkManager'));
const InviteModal = React.lazy(() => import('../server/InviteModal'));
const LiveStreamModal = React.lazy(() => import('../media/LiveStreamModal'));
const MessageSummaryPanel = React.lazy(() => import('../chat/MessageSummaryPanel'));
const ModerationLogsPanel = React.lazy(() => import('../moderation/ModerationLogsPanel'));
const ModeratorTools = React.lazy(() => import('../moderation/ModeratorTools'));
const MutualsPanel = React.lazy(() => import('../profile/MutualsPanel'));
const NotificationsCenter = React.lazy(() => import('../notifications/NotificationsCenter'));
const PollCreator = React.lazy(() => import('../chat/PollCreator'));
const PremiumManagementPanel = React.lazy(() => import('../premium/PremiumManagementPanel'));
const PremiumMarketplace = React.lazy(() => import('../premium/PremiumMarketplace'));
const ProfileCard = React.lazy(() => import('../ProfileCard'));
const ProfileShowcasePanel = React.lazy(() => import('../profile/ProfileShowcasePanel'));
const ReportsPanel = React.lazy(() => import('../admin/ReportsPanel'));
const RolesManager = React.lazy(() => import('../RolesManager'));
const SavedMessagesModal = React.lazy(() => import('../chat/SavedMessagesModal'));
const ScreenShareModal = React.lazy(() => import('../media/ScreenShareModal'));
const SecurityAlertsPanel = React.lazy(() => import('../security/SecurityAlertsPanel'));
const ServerAnalyticsDashboard = React.lazy(() => import('../ServerAnalyticsDashboard'));
const ServerTemplates = React.lazy(() => import('../server/ServerTemplates'));
const SessionManagerModal = React.lazy(() => import('../security/SessionManagerModal'));
const SlashCommandsPanel = React.lazy(() => import('../chat/SlashCommandsPanel'));
const SpamDetectionPanel = React.lazy(() => import('../SpamDetectionPanel'));
const StatusPicker = React.lazy(() => import('../profile/StatusPicker'));
const StickersPanel = React.lazy(() => import('../chat/StickersPanel'));
const SubscriptionManager = React.lazy(() => import('../premium/SubscriptionManager'));
const ThemeMarketplace = React.lazy(() => import('../settings/ThemeMarketplace'));
const TranslationPanel = React.lazy(() => import('../education/TranslationPanel'));
const UserNotesModal = React.lazy(() => import('../profile/UserNotesModal'));
const WebhookManager = React.lazy(() => import('../server/WebhookManager'));
const WelcomeScreenEditor = React.lazy(() => import('../server/WelcomeScreenEditor'));

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
        key: 'moderatorTools',
        C: ModeratorTools,
        fb: '🛡️ Loading Moderator Tools...',
        props: (c) => ({
            ...api(c),
            serverId: c.activeChat?.server_id,
            roomSlug: c.activeChat?.slug,
        }),
    },
    // 2. AI Moderation
    {
        key: 'aIModeration',
        C: AIModerationPanel,
        fb: '🤖 Loading AI Moderation...',
        props: (c) => ({ ...api(c), serverId: c.activeChat?.server_id }),
    },
    // 3. Spam Detection
    {
        key: 'spamDetection',
        C: SpamDetectionPanel,
        fb: '🚫 Loading Spam Protection...',
        props: (c) => ({ ...api(c), serverId: c.activeChat?.server_id }),
    },
    // 4. Audit Logs
    {
        key: 'auditLogs',
        C: AuditLogsPanel,
        fb: '📋 Loading Audit Logs...',
        props: (c) => ({ ...api(c), serverId: c.activeChat?.server_id }),
    },
    // 5. Ban History
    {
        key: 'banHistory',
        C: BanHistoryPanel,
        fb: '⛔ Loading Ban History...',
        props: (c) => ({ ...api(c), serverId: c.activeChat?.server_id }),
    },
    // 6. Moderation Logs
    {
        key: 'moderationLogs',
        C: ModerationLogsPanel,
        fb: '📜 Loading Moderation Logs...',
        props: (c) => ({ ...api(c), serverId: c.activeChat?.server_id }),
    },
    // 8. Security Alerts
    {
        key: 'securityAlerts',
        C: SecurityAlertsPanel,
        fb: '🚨 Loading Security Alerts...',
        props: api,
    },
    // 10. GIF Picker
    {
        key: 'gIFPicker',
        C: GIFPickerPanel,
        fb: '🎞️ Loading GIF Picker...',
        props: (c) => ({
            ...api(c),
            onSelect: () => {
                c.closeModal('gIFPicker');
            },
        }),
    },
    // 11. Poll Creator
    {
        key: 'pollCreator',
        C: PollCreator,
        fb: '📊 Loading Poll Creator...',
        props: (c) => ({ ...api(c), roomSlug: c.activeChat?.slug }),
    },
    // 12. Stickers
    {
        key: 'stickers',
        C: StickersPanel,
        fb: '🎨 Loading Stickers...',
        props: (c) => ({
            ...api(c),
            onSelect: () => {
                c.closeModal('stickers');
            },
        }),
    },
    // 13. Saved Messages
    {
        key: 'savedMessages',
        C: SavedMessagesModal,
        fb: '💾 Loading Saved Messages...',
        props: (c) => ({ ...api(c), username: c.username }),
    },
    // 14. Notifications Center
    {
        key: 'notificationsCenter',
        C: NotificationsCenter,
        fb: '🔔 Loading Notifications...',
        props: (c) => ({ ...api(c), username: c.username }),
    },
    // 15. Message Summary
    {
        key: 'messageSummary',
        C: MessageSummaryPanel,
        fb: '📝 Loading Summary...',
        props: (c) => ({ ...api(c), roomSlug: c.activeChat?.slug }),
    },
    // 16. Translation
    {
        key: 'translation',
        C: TranslationPanel,
        fb: '🌍 Loading Translation...',
        props: api,
    },
    // 17. Channel Settings (room only)
    {
        key: 'channelSettings',
        C: ChannelSettingsModal,
        fb: '⚙️ Loading Channel Settings...',
        cond: (c) => c.activeChat?.type === 'room',
        props: (c) => {
            const slug = c.activeChat?.slug || c.activeChat?.id;
            let room = null;
            let serverRoles = [];
            // Look up the full room object from categories tree
            if (c.categories) {
                for (const srv of c.categories) {
                    for (const cat of srv.categories || []) {
                        const found = (cat.rooms || []).find((r) => r.slug === slug);
                        if (found) {
                            room = { ...found, server_id: srv.id };
                            serverRoles = srv.roles || [];
                            break;
                        }
                    }
                    if (room) break;
                }
            }
            // Fallback: construct minimal room from activeChat if lookup fails
            if (!room)
                room = {
                    slug,
                    name: slug || 'Channel',
                    channel_type: 'text',
                    server_id: c.activeChat?.server_id,
                };
            return { ...api(c), room, serverRoles };
        },
    },
    // 18. Invite Modal (room only, uses API_BASE_URL)
    {
        key: 'inviteModal',
        C: InviteModal,
        fb: '📨 Loading Invite...',
        cond: (c) => c.activeChat?.type === 'room',
        props: (c) => ({
            fetchWithAuth: c.fetchWithAuth,
            apiBaseUrl: API_BASE_URL,
            server: (() => {
                for (const srv of c.categories || []) {
                    for (const cat of srv.categories || []) {
                        if (cat.rooms?.some((r) => r.slug === c.activeChat.id)) {
                            return { id: srv.id, name: srv.name, avatar: srv.avatar };
                        }
                    }
                }
                return { id: c.activeChat.server_id, name: 'Server' };
            })(),
            currentUser: c.username,
        }),
    },
    // 19. Server Templates
    {
        key: 'serverTemplates',
        C: ServerTemplates,
        fb: '📋 Loading Templates...',
        props: api,
    },
    // 20. Server Analytics
    {
        key: 'serverAnalytics',
        C: ServerAnalyticsDashboard,
        fb: '📊 Loading Analytics...',
        props: (c) => ({ ...api(c), serverId: c.activeChat?.server_id }),
    },
    // 21. Roles Manager (room only)
    {
        key: 'rolesManager',
        C: RolesManager,
        fb: '👑 Loading Roles Manager...',
        cond: (c) => c.activeChat?.type === 'room',
        props: (c) => ({ ...api(c), serverId: c.activeChat.server_id }),
    },
    // 22. Welcome Screen Editor
    {
        key: 'welcomeScreenEditor',
        C: WelcomeScreenEditor,
        fb: '👋 Loading Welcome Screen...',
        props: (c) => ({ ...api(c), serverId: c.activeChat?.server_id }),
    },
    // 23. Community Settings
    {
        key: 'communitySettings',
        C: CommunitySettingsPanel,
        fb: '🏘️ Loading Community Settings...',
        props: (c) => ({ ...api(c), serverId: c.activeChat?.server_id }),
    },
    // 24. Invite Link Manager
    {
        key: 'inviteLinkManager',
        C: InviteLinkManager,
        fb: '🔗 Loading Invite Links...',
        props: (c) => ({ ...api(c), serverId: c.activeChat?.server_id }),
    },
    // 25. Bot Builder
    {
        key: 'botBuilder',
        C: BotBuilder,
        fb: '🤖 Loading Bot Builder...',
        props: api,
    },
    // 26. Bot Developer Portal
    {
        key: 'botDevPortal',
        C: BotDeveloperPortal,
        fb: '🧑‍💻 Loading Developer Portal...',
        props: api,
    },
    // 27. Webhook Manager
    {
        key: 'webhookManager',
        C: WebhookManager,
        fb: '🔗 Loading Webhook Manager...',
        props: (c) => ({ ...api(c), serverId: c.activeChat?.server_id }),
    },
    // 28. API Keys
    {
        key: 'aPIKeys',
        C: APIKeysPanel,
        fb: '🔑 Loading API Keys...',
        props: api,
    },
    // 29. Slash Commands
    {
        key: 'slashCommands',
        C: SlashCommandsPanel,
        fb: '⚡ Loading Slash Commands...',
        props: (c) => ({ ...api(c), serverId: c.activeChat?.server_id }),
    },
    // 30. Code Runner
    {
        key: 'codeRunner',
        C: CodeRunnerPanel,
        fb: '💻 Loading Code Runner...',
        props: api,
    },
    // 31. Profile Card
    {
        key: 'profileCard',
        C: ProfileCard,
        fb: '👤 Loading Profile Card...',
        props: (c) => ({ ...api(c), username: c.username, currentUser: c.currentUserProfile }),
    },
    // 32. User Notes
    {
        key: 'userNotes',
        C: UserNotesModal,
        fb: '📝 Loading Notes...',
        props: (c) => ({ ...api(c), username: c.username }),
    },
    // 33. Status Picker
    {
        key: 'statusPicker',
        C: StatusPicker,
        fb: '🟢 Loading Status Picker...',
        props: (c) => ({ ...api(c), currentUser: c.currentUserProfile }),
    },
    // 34. Mutuals Panel
    {
        key: 'mutuals',
        C: MutualsPanel,
        fb: '👥 Loading Mutual Friends...',
        props: (c) => ({ ...api(c), username: c.username }),
    },
    // 35. Profile Showcase
    {
        key: 'profileShowcase',
        C: ProfileShowcasePanel,
        fb: '🏅 Loading Profile Showcase...',
        props: (c) => ({ ...api(c), username: c.username, currentUser: c.currentUserProfile }),
    },
    // 36. Session Manager
    {
        key: 'sessionManager',
        C: SessionManagerModal,
        fb: '📱 Loading Session Manager...',
        props: api,
    },
    // 37. Coin Store
    {
        key: 'coinStore',
        C: CoinStoreModal,
        fb: '🪙 Loading Coin Store...',
        props: (c) => ({ ...api(c), username: c.username }),
    },
    // 38. Premium Management
    {
        key: 'premiumManagement',
        C: PremiumManagementPanel,
        fb: '💎 Loading Premium Management...',
        props: (c) => ({ ...api(c), username: c.username }),
    },
    // 39. Subscription Manager
    {
        key: 'subscriptionManager',
        C: SubscriptionManager,
        fb: '📋 Loading Subscriptions...',
        props: (c) => ({ ...api(c), username: c.username }),
    },
    // 40. Gift Premium
    {
        key: 'giftPremium',
        C: GiftPremiumPanel,
        fb: '🎁 Loading Gift Premium...',
        props: (c) => ({ ...api(c), username: c.username }),
    },
    // 41. Premium Marketplace
    {
        key: 'premiumMarketplace',
        C: PremiumMarketplace,
        fb: '🛒 Loading Premium Store...',
        props: api,
    },
    // 42. Theme Marketplace
    {
        key: 'themeMarketplace',
        C: ThemeMarketplace,
        fb: '🎨 Loading Theme Marketplace...',
        props: api,
    },
    // 43. AI Chatbot
    {
        key: 'aIChatbot',
        C: AIChatbotPanel,
        fb: '🤖 Loading AI Chatbot...',
        props: (c) => ({ ...api(c), username: c.username }),
    },
    // 44. Collaborative Code Editor
    {
        key: 'codeEditor',
        C: CollaborativeCodeEditor,
        fb: '👨‍💻 Loading Code Editor...',
        props: (c) => ({ ...api(c), roomSlug: c.activeChat?.slug, username: c.username }),
    },
    // 45. Screen Share
    {
        key: 'screenShare',
        C: ScreenShareModal,
        fb: '🖥️ Loading Screen Share...',
        props: (c) => ({ ...api(c), roomSlug: c.activeChat?.slug }),
    },
    // 46. Live Stream
    {
        key: 'liveStreamModal',
        C: LiveStreamModal,
        fb: '📺 Loading Live Stream...',
        props: (c) => ({ ...api(c), roomSlug: c.activeChat?.slug, username: c.username }),
    },
    // 47. Advanced Analytics
    {
        key: 'advancedAnalytics',
        C: AdvancedAnalyticsDashboard,
        fb: '📈 Loading Advanced Analytics...',
        props: (c) => ({ ...api(c), serverId: c.activeChat?.server_id }),
    },
    // 48. File Manager
    {
        key: 'fileManager',
        C: FileManagerPanel,
        fb: '📁 Loading File Manager...',
        props: (c) => ({ ...api(c), roomSlug: c.activeChat?.slug }),
    },
    // 49. Reports
    {
        key: 'reports',
        C: ReportsPanel,
        fb: '📊 Loading Reports...',
        props: (c) => ({ ...api(c), serverId: c.activeChat?.server_id }),
    },
    // 50. Error Reporting
    {
        key: 'errorReporting',
        C: ErrorReportingPanel,
        fb: '🐛 Loading Error Reporting...',
        props: api,
    },
    // Feature Hub (not lazy, no suspense needed)
    { key: 'featureHub', C: FeatureHubModal },
];
