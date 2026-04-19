import React from 'react';
import { toast } from 'react-toastify';
import i18n from '../../i18n';
import { ABSOLUTE_HOST_URL as API } from '../../config/api';

// Lazy component imports
const AccountDeletionModal = React.lazy(() => import('../AccountDeletionModal'));
const AchievementsPanel = React.lazy(() => import('../profile/AchievementsPanel'));
const AppearanceSettingsPanel = React.lazy(() => import('../AppearanceSettingsPanel'));
const AutoRolesPanel = React.lazy(() => import('../server/AutoRolesPanel'));
const BanAppealsPanel = React.lazy(() => import('../moderation/BanAppealsPanel'));
const BirthdaySystemPanel = React.lazy(() => import('../profile/BirthdaySystemPanel'));
const BlockListPanel = React.lazy(() => import('../security/BlockListPanel'));
const BotMarketplace = React.lazy(() => import('../BotMarketplace'));
const ChangelogPanel = React.lazy(() => import('../social/ChangelogPanel'));
const CommandPalette = React.lazy(() => import('../bot/CommandPalette'));
const CustomCommandsPanel = React.lazy(() => import('../CustomCommandsPanel'));
const CustomEmbedPanel = React.lazy(() => import('../profile/CustomEmbedPanel'));
const E2EESettingsPanel = React.lazy(() => import('../security/E2EESettingsPanel'));
const EventCalendar = React.lazy(() => import('../social/EventCalendar'));
const ForumPanel = React.lazy(() => import('../social/ForumPanel'));
const GiveawayPanel = React.lazy(() => import('../GiveawayPanel'));
const HighlightsPanel = React.lazy(() => import('../chat/HighlightsPanel'));
const IntegrationHubPanel = React.lazy(() => import('../IntegrationHubPanel'));
const KeyboardShortcutsModal = React.lazy(() => import('../shared/KeyboardShortcutsModal'));
const LanguageSelector = React.lazy(() => import('../settings/LanguageSelector'));
const LevelingSystemPanel = React.lazy(() => import('../LevelingSystemPanel'));
const LiveStreamPanel = React.lazy(() => import('../media/LiveStreamPanel'));
const LoginHistory = React.lazy(() => import('../security/LoginHistory'));
const LogoutModal = React.lazy(() => import('../shared/LogoutModal'));
const MessageSearchPanel = React.lazy(() => import('../chat/MessageSearchPanel'));
const MusicPlayer = React.lazy(() => import('../media/MusicPlayer'));
const NotificationSoundSettings = React.lazy(() => import('../media/NotificationSoundSettings'));
const PremiumModal = React.lazy(() => import('../premium/PremiumModal'));
const PrivacySettingsPanel = React.lazy(() => import('../PrivacySettingsPanel'));
const ProfileCustomization = React.lazy(() => import('../ProfileCustomization'));
const QuickSwitcher = React.lazy(() => import('../shared/QuickSwitcher'));
const ReactionRolesPanel = React.lazy(() => import('../server/ReactionRolesPanel'));
const ReminderPanel = React.lazy(() => import('../shared/ReminderPanel'));
const ScheduledMessagesPanel = React.lazy(() => import('../chat/ScheduledMessagesPanel'));
const SecuritySettingsPanel = React.lazy(() => import('../SecuritySettingsPanel'));
const ServerBackupPanel = React.lazy(() => import('../server/ServerBackupPanel'));
const ServerClonePanel = React.lazy(() => import('../server/ServerClonePanel'));
const ServerDiscoveryPage = React.lazy(() => import('../server/ServerDiscoveryPage'));
const SpotifyIntegrationPanel = React.lazy(() => import('../bot/SpotifyIntegrationPanel'));
const StageChannelPanel = React.lazy(() => import('../server/StageChannelPanel'));
const StarboardPanel = React.lazy(() => import('../social/StarboardPanel'));
const ThreadView = React.lazy(() => import('../chat/ThreadView'));
const TicketSystemPanel = React.lazy(() => import('../TicketSystemPanel'));
const TournamentSystem = React.lazy(() => import('../TournamentSystem'));
const UserSettingsModal = React.lazy(() => import('../UserSettingsModal'));
const VideoCallModal = React.lazy(() => import('../media/VideoCallModal'));
const VoiceSettingsPanel = React.lazy(() => import('../media/VoiceSettingsPanel'));
const WatchTogether = React.lazy(() => import('../WatchTogether'));
const WeeklyChallengesPanel = React.lazy(() => import('../WeeklyChallengesPanel'));
const WelcomeMessagesPanel = React.lazy(() => import('../WelcomeMessagesPanel'));

// Condition & prop helpers
const isServer = (c) => c.activeChat?.type === 'room' && c.activeChat?.server_id;
const api = (c) => ({ fetchWithAuth: c.fetchWithAuth, apiBaseUrl: API });

/**
 * Modal configuration for Batch 10 (50 Essential Features).
 * Each entry: { key, C, fb?, cond?, props? }
 * - key: modals state key (also used for auto onClose)
 * - C: lazy-loaded component
 * - fb: fallback text (default: 'Loading...')
 * - cond: extra condition function beyond modals[key]
 * - props: function(ctx) returning extra props (onClose is auto-added)
 */
export const BATCH10_MODALS = [
    // === SETTINGS & NAVIGATION (1-10) ===
    {
        key: 'userSettings',
        C: UserSettingsModal,
        fb: '⚙️ Loading Settings...',
        props: (c) => ({
            ...api(c),
            user: c.currentUserProfile,
            username: c.username,
            onOpenAppearance: () => c.openModal('appearanceSettings'),
            onOpenPrivacy: () => c.openModal('privacySettings'),
            onOpenSecurity: () => c.openModal('securitySettings'),
            onOpenNotifications: () => c.openModal('notificationSounds'),
            onOpenConnections: () => c.openModal('connectionsPanel'),
            onOpenLanguage: () => c.openModal('languageSelector'),
            onLogout: () => c.openModal('logoutConfirm'),
        }),
    },
    { key: 'keyboardShortcuts', C: KeyboardShortcutsModal },
    {
        key: 'commandPalette',
        C: CommandPalette,
        props: (c) => ({
            categories: c.categories,
            conversations: c.conversations,
            allUsers: c.allUsers,
            onNavigate: (t) => {
                if (t.type === 'room') c.setActiveChat({ type: 'room', slug: t.slug });
                else if (t.type === 'dm') c.setActiveChat({ type: 'dm', id: t.id });
                c.closeModal('commandPalette');
            },
        }),
    },
    {
        key: 'serverDiscovery',
        C: ServerDiscoveryPage,
        fb: '🌍 Loading Discover Servers...',
        props: (c) => ({
            ...api(c),
            currentUsername: c.username,
            onJoinServer: (s) => {
                toast.success(i18n.t('server.joinedNamed', { name: s.name }));
                c.closeModal('serverDiscovery');
            },
        }),
    },
    {
        key: 'appearanceSettings',
        C: AppearanceSettingsPanel,
        props: (c) => ({ currentTheme: c.currentTheme, onThemeChange: c.setCurrentTheme }),
    },
    { key: 'languageSelector', C: LanguageSelector },
    { key: 'changelog', C: ChangelogPanel, props: api },
    {
        key: 'logoutConfirm',
        C: LogoutModal,
        props: (c) => ({
            onConfirm: () => {
                c.logout();
                c.closeModal('logoutConfirm');
            },
        }),
    },
    {
        key: 'notificationSounds',
        C: NotificationSoundSettings,
        props: (c) => ({ soundSettings: c.soundSettings, onUpdateSettings: c.setSoundSettings }),
    },
    {
        key: 'quickSwitcher',
        C: QuickSwitcher,
        props: (c) => ({
            categories: c.categories,
            conversations: c.conversations,
            onSelect: (item) => {
                if (item.type === 'room') c.setActiveChat({ type: 'room', slug: item.slug });
                else if (item.type === 'dm') c.setActiveChat({ type: 'dm', id: item.id });
                c.closeModal('quickSwitcher');
            },
        }),
    },
    // === SECURITY & PRIVACY (11-16) ===
    { key: 'loginHistory', C: LoginHistory, props: api },
    {
        key: 'securitySettings',
        C: SecuritySettingsPanel,
        props: (c) => ({
            ...api(c),
            username: c.username,
            onOpen2FA: () => c.openModal('twoFactorSetup'),
            onOpenLoginHistory: () => c.openModal('loginHistory'),
        }),
    },
    {
        key: 'privacySettings',
        C: PrivacySettingsPanel,
        props: (c) => ({
            ...api(c),
            username: c.username,
            onOpenBlockList: () => c.openModal('blockList'),
        }),
    },
    {
        key: 'accountDeletion',
        C: AccountDeletionModal,
        props: (c) => ({
            ...api(c),
            username: c.username,
            onConfirm: () => {
                c.logout();
                c.closeModal('accountDeletion');
            },
        }),
    },
    { key: 'blockList', C: BlockListPanel, props: api },
    {
        key: 'e2EESettings',
        C: E2EESettingsPanel,
        props: (c) => ({ ...api(c), encryptionKeys: c.encryptionKeys }),
    },
    // === COMMUNICATION (17-25) ===
    {
        key: 'threadView',
        C: ThreadView,
        props: (c) => ({ ...api(c), roomSlug: c.activeChat?.slug }),
    },
    {
        key: 'scheduledMessages',
        C: ScheduledMessagesPanel,
        props: (c) => ({ ...api(c), username: c.username }),
    },
    { key: 'reminders', C: ReminderPanel, props: (c) => ({ ...api(c), username: c.username }) },
    {
        key: 'forum',
        C: ForumPanel,
        fb: '📋 Loading Forum...',
        cond: isServer,
        props: (c) => ({
            ...api(c),
            roomSlug: c.activeChat.slug,
            serverId: c.activeChat.server_id,
            currentUser: c.username,
        }),
    },
    {
        key: 'stageChannel',
        C: StageChannelPanel,
        fb: '🎤 Loading Stage Channel...',
        props: (c) => ({ ...api(c), roomSlug: c.activeChat?.slug, currentUser: c.username }),
    },
    {
        key: 'videoCall',
        C: VideoCallModal,
        fb: '📹 Loading Video Call...',
        props: (c) => ({
            ...api(c),
            currentUser: c.username,
            targetUser: c.activeChat?.type === 'dm' ? c.activeChat.name : null,
        }),
    },
    {
        key: 'voiceSettings',
        C: VoiceSettingsPanel,
        props: (c) => ({
            isMuted: c.isMuted,
            isDeafened: c.isDeafened,
            onToggleMute: c.toggleMute,
            onToggleDeafened: c.toggleDeafened,
        }),
    },
    {
        key: 'messageSearch',
        C: MessageSearchPanel,
        props: (c) => ({
            ...api(c),
            roomSlug: c.activeChat?.slug,
            onMessageClick: (msg) => {
                if (msg.room) c.setActiveChat({ type: 'room', slug: msg.room });
                c.closeModal('messageSearch');
            },
        }),
    },
    {
        key: 'watchTogether',
        C: WatchTogether,
        fb: '🎬 Loading Watch Together...',
        props: (c) => ({ ...api(c), roomSlug: c.activeChat?.slug, currentUser: c.username }),
    },
    // === SERVER MANAGEMENT (26-35) ===
    {
        key: 'autoRoles',
        C: AutoRolesPanel,
        cond: isServer,
        props: (c) => ({ ...api(c), serverId: c.activeChat.server_id }),
    },
    {
        key: 'reactionRoles',
        C: ReactionRolesPanel,
        cond: isServer,
        props: (c) => ({ ...api(c), serverId: c.activeChat.server_id }),
    },
    {
        key: 'welcomeMessages',
        C: WelcomeMessagesPanel,
        cond: isServer,
        props: (c) => ({ ...api(c), serverId: c.activeChat.server_id }),
    },
    {
        key: 'eventCalendar',
        C: EventCalendar,
        fb: '📅 Loading Events...',
        cond: isServer,
        props: (c) => ({ ...api(c), serverId: c.activeChat.server_id, currentUser: c.username }),
    },
    {
        key: 'giveaway',
        C: GiveawayPanel,
        fb: '🎉 Loading Giveaway...',
        cond: isServer,
        props: (c) => ({ ...api(c), serverId: c.activeChat.server_id, currentUser: c.username }),
    },
    {
        key: 'ticketSystem',
        C: TicketSystemPanel,
        fb: '🎫 Loading Ticket System...',
        cond: isServer,
        props: (c) => ({ ...api(c), serverId: c.activeChat.server_id, currentUser: c.username }),
    },
    {
        key: 'starboard',
        C: StarboardPanel,
        cond: isServer,
        props: (c) => ({ ...api(c), serverId: c.activeChat.server_id }),
    },
    {
        key: 'serverBackup',
        C: ServerBackupPanel,
        cond: isServer,
        props: (c) => ({ ...api(c), serverId: c.activeChat.server_id }),
    },
    {
        key: 'banAppeals',
        C: BanAppealsPanel,
        cond: isServer,
        props: (c) => ({ ...api(c), serverId: c.activeChat.server_id }),
    },
    {
        key: 'customCommands',
        C: CustomCommandsPanel,
        cond: isServer,
        props: (c) => ({ ...api(c), serverId: c.activeChat.server_id }),
    },
    // === GAMIFICATION & SOCIAL (36-50) ===
    {
        key: 'levelingSystem',
        C: LevelingSystemPanel,
        fb: '📊 Loading Level System...',
        cond: isServer,
        props: (c) => ({ ...api(c), serverId: c.activeChat.server_id, currentUser: c.username }),
    },
    {
        key: 'liveStream',
        C: LiveStreamPanel,
        fb: '📺 Loading Live Stream...',
        props: (c) => ({ ...api(c), roomSlug: c.activeChat?.slug, currentUser: c.username }),
    },
    {
        key: 'achievements',
        C: AchievementsPanel,
        fb: '🏆 Loading Achievements...',
        props: (c) => ({ ...api(c), username: c.username }),
    },
    {
        key: 'birthdaySystem',
        C: BirthdaySystemPanel,
        cond: isServer,
        props: (c) => ({ ...api(c), serverId: c.activeChat.server_id }),
    },
    {
        key: 'premium',
        C: PremiumModal,
        fb: '💎 Loading Premium...',
        props: (c) => ({ ...api(c), username: c.username }),
    },
    {
        key: 'musicPlayer',
        C: MusicPlayer,
        fb: '🎵 Loading Music Player...',
        props: (c) => ({ ...api(c), roomSlug: c.activeChat?.slug }),
    },
    {
        key: 'botMarketplace',
        C: BotMarketplace,
        fb: '🤖 Loading Bot Marketplace...',
        props: (c) => ({ ...api(c), serverId: c.activeChat?.server_id }),
    },
    {
        key: 'profileCustomization',
        C: ProfileCustomization,
        props: (c) => ({
            ...api(c),
            currentUser: c.currentUserProfile,
            onProfileUpdate: (updated) => c.setCurrentUserProfile(updated),
        }),
    },
    { key: 'integrationHub', C: IntegrationHubPanel, fb: '🔗 Loading Integrations...', props: api },
    {
        key: 'tournaments',
        C: TournamentSystem,
        fb: '🏆 Loading Tournaments...',
        cond: isServer,
        props: (c) => ({ ...api(c), serverId: c.activeChat.server_id, currentUser: c.username }),
    },
    { key: 'highlights', C: HighlightsPanel, props: api },
    {
        key: 'customEmbed',
        C: CustomEmbedPanel,
        props: (c) => ({ ...api(c), roomSlug: c.activeChat?.slug }),
    },
    {
        key: 'spotifyIntegration',
        C: SpotifyIntegrationPanel,
        fb: '🎵 Loading Spotify...',
        props: api,
    },
    {
        key: 'serverClone',
        C: ServerClonePanel,
        cond: isServer,
        props: (c) => ({ ...api(c), serverId: c.activeChat.server_id }),
    },
    {
        key: 'weeklyChallenges',
        C: WeeklyChallengesPanel,
        fb: '🎯 Loading Weekly Challenges...',
        props: (c) => ({ ...api(c), username: c.username }),
    },
];
