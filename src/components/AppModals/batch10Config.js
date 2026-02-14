import React from 'react';
import { toast } from 'react-toastify';
import { ABSOLUTE_HOST_URL as API } from '../../config/api';

// Lazy component imports
const AccountDeletionModal = React.lazy(() => import('../AccountDeletionModal'));
const AchievementsPanel = React.lazy(() => import('../AchievementsPanel'));
const AppearanceSettingsPanel = React.lazy(() => import('../AppearanceSettingsPanel'));
const AutoRolesPanel = React.lazy(() => import('../AutoRolesPanel'));
const BanAppealsPanel = React.lazy(() => import('../BanAppealsPanel'));
const BirthdaySystemPanel = React.lazy(() => import('../BirthdaySystemPanel'));
const BlockListPanel = React.lazy(() => import('../BlockListPanel'));
const BotMarketplace = React.lazy(() => import('../BotMarketplace'));
const ChangelogPanel = React.lazy(() => import('../ChangelogPanel'));
const CommandPalette = React.lazy(() => import('../CommandPalette'));
const CustomCommandsPanel = React.lazy(() => import('../CustomCommandsPanel'));
const CustomEmbedPanel = React.lazy(() => import('../CustomEmbedPanel'));
const E2EESettingsPanel = React.lazy(() => import('../E2EESettingsPanel'));
const EventCalendar = React.lazy(() => import('../EventCalendar'));
const ForumPanel = React.lazy(() => import('../ForumPanel'));
const GiveawayPanel = React.lazy(() => import('../GiveawayPanel'));
const HighlightsPanel = React.lazy(() => import('../HighlightsPanel'));
const IntegrationHubPanel = React.lazy(() => import('../IntegrationHubPanel'));
const KeyboardShortcutsModal = React.lazy(() => import('../KeyboardShortcutsModal'));
const LanguageSelector = React.lazy(() => import('../LanguageSelector'));
const LevelingSystemPanel = React.lazy(() => import('../LevelingSystemPanel'));
const LiveStreamPanel = React.lazy(() => import('../LiveStreamPanel'));
const LoginHistory = React.lazy(() => import('../LoginHistory'));
const LogoutModal = React.lazy(() => import('../LogoutModal'));
const MessageSearchPanel = React.lazy(() => import('../MessageSearchPanel'));
const MusicPlayer = React.lazy(() => import('../MusicPlayer'));
const NotificationSoundSettings = React.lazy(() => import('../NotificationSoundSettings'));
const PremiumModal = React.lazy(() => import('../PremiumModal'));
const PrivacySettingsPanel = React.lazy(() => import('../PrivacySettingsPanel'));
const ProfileCustomization = React.lazy(() => import('../ProfileCustomization'));
const QuickSwitcher = React.lazy(() => import('../QuickSwitcher'));
const ReactionRolesPanel = React.lazy(() => import('../ReactionRolesPanel'));
const ReminderPanel = React.lazy(() => import('../ReminderPanel'));
const ScheduledMessagesPanel = React.lazy(() => import('../ScheduledMessagesPanel'));
const SecuritySettingsPanel = React.lazy(() => import('../SecuritySettingsPanel'));
const ServerBackupPanel = React.lazy(() => import('../ServerBackupPanel'));
const ServerClonePanel = React.lazy(() => import('../ServerClonePanel'));
const ServerDiscoveryPage = React.lazy(() => import('../ServerDiscoveryPage'));
const SpotifyIntegrationPanel = React.lazy(() => import('../SpotifyIntegrationPanel'));
const StageChannelPanel = React.lazy(() => import('../StageChannelPanel'));
const StarboardPanel = React.lazy(() => import('../StarboardPanel'));
const ThreadView = React.lazy(() => import('../ThreadView'));
const TicketSystemPanel = React.lazy(() => import('../TicketSystemPanel'));
const TournamentSystem = React.lazy(() => import('../TournamentSystem'));
const UserSettingsModal = React.lazy(() => import('../UserSettingsModal'));
const VideoCallModal = React.lazy(() => import('../VideoCallModal'));
const VoiceSettingsPanel = React.lazy(() => import('../VoiceSettingsPanel'));
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
 * - fb: fallback text (default: 'Yükleniyor...')
 * - cond: extra condition function beyond modals[key]
 * - props: function(ctx) returning extra props (onClose is auto-added)
 */
export const BATCH10_MODALS = [
    // === SETTINGS & NAVIGATION (1-10) ===
    { key: 'userSettings', C: UserSettingsModal, fb: '⚙️ Ayarlar Yükleniyor...',
      props: c => ({ ...api(c), currentUser: c.currentUserProfile, username: c.username,
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
    { key: 'commandPalette', C: CommandPalette,
      props: c => ({
          categories: c.categories, conversations: c.conversations, allUsers: c.allUsers,
          onNavigate: (t) => {
              if (t.type === 'room') c.setActiveChat({ type: 'room', slug: t.slug });
              else if (t.type === 'dm') c.setActiveChat({ type: 'dm', id: t.id });
              c.closeModal('commandPalette');
          },
      }),
    },
    { key: 'serverDiscovery', C: ServerDiscoveryPage, fb: '🌍 Sunucu Keşfet Yükleniyor...',
      props: c => ({ ...api(c), currentUsername: c.username,
          onJoinServer: (s) => { toast.success(`${s.name} sunucusuna katıldın!`); c.closeModal('serverDiscovery'); },
      }),
    },
    { key: 'appearanceSettings', C: AppearanceSettingsPanel,
      props: c => ({ currentTheme: c.currentTheme, onThemeChange: c.setCurrentTheme }),
    },
    { key: 'languageSelector', C: LanguageSelector },
    { key: 'changelog', C: ChangelogPanel, props: api },
    { key: 'logoutConfirm', C: LogoutModal,
      props: c => ({ onConfirm: () => { c.logout(); c.closeModal('logoutConfirm'); } }),
    },
    { key: 'notificationSounds', C: NotificationSoundSettings,
      props: c => ({ soundSettings: c.soundSettings, onUpdateSettings: c.setSoundSettings }),
    },
    { key: 'quickSwitcher', C: QuickSwitcher,
      props: c => ({
          categories: c.categories, conversations: c.conversations,
          onSelect: (item) => {
              if (item.type === 'room') c.setActiveChat({ type: 'room', slug: item.slug });
              else if (item.type === 'dm') c.setActiveChat({ type: 'dm', id: item.id });
              c.closeModal('quickSwitcher');
          },
      }),
    },
    // === SECURITY & PRIVACY (11-16) ===
    { key: 'loginHistory', C: LoginHistory, props: api },
    { key: 'securitySettings', C: SecuritySettingsPanel,
      props: c => ({ ...api(c), username: c.username,
          onOpen2FA: () => c.openModal('twoFactorSetup'),
          onOpenLoginHistory: () => c.openModal('loginHistory'),
      }),
    },
    { key: 'privacySettings', C: PrivacySettingsPanel,
      props: c => ({ ...api(c), username: c.username, onOpenBlockList: () => c.openModal('blockList') }),
    },
    { key: 'accountDeletion', C: AccountDeletionModal,
      props: c => ({ ...api(c), username: c.username,
          onConfirm: () => { c.logout(); c.closeModal('accountDeletion'); },
      }),
    },
    { key: 'blockList', C: BlockListPanel, props: api },
    { key: 'e2EESettings', C: E2EESettingsPanel,
      props: c => ({ ...api(c), encryptionKeys: c.encryptionKeys }),
    },
    // === COMMUNICATION (17-25) ===
    { key: 'threadView', C: ThreadView, props: c => ({ ...api(c), roomSlug: c.activeChat?.slug }) },
    { key: 'scheduledMessages', C: ScheduledMessagesPanel, props: c => ({ ...api(c), username: c.username }) },
    { key: 'reminders', C: ReminderPanel, props: c => ({ ...api(c), username: c.username }) },
    { key: 'forum', C: ForumPanel, fb: '📋 Forum Yükleniyor...', cond: isServer,
      props: c => ({ ...api(c), roomSlug: c.activeChat.slug, serverId: c.activeChat.server_id, currentUser: c.username }),
    },
    { key: 'stageChannel', C: StageChannelPanel, fb: '🎤 Sahne Yükleniyor...',
      props: c => ({ ...api(c), roomSlug: c.activeChat?.slug, currentUser: c.username }),
    },
    { key: 'videoCall', C: VideoCallModal, fb: '📹 Video Arama Yükleniyor...',
      props: c => ({ ...api(c), currentUser: c.username,
          targetUser: c.activeChat?.type === 'dm' ? c.activeChat.name : null,
      }),
    },
    { key: 'voiceSettings', C: VoiceSettingsPanel,
      props: c => ({ isMuted: c.isMuted, isDeafened: c.isDeafened,
          onToggleMute: c.toggleMute, onToggleDeafened: c.toggleDeafened }),
    },
    { key: 'messageSearch', C: MessageSearchPanel,
      props: c => ({ ...api(c), roomSlug: c.activeChat?.slug,
          onMessageClick: (msg) => {
              if (msg.room) c.setActiveChat({ type: 'room', slug: msg.room });
              c.closeModal('messageSearch');
          },
      }),
    },
    { key: 'watchTogether', C: WatchTogether, fb: '🎬 Birlikte İzle Yükleniyor...',
      props: c => ({ ...api(c), roomSlug: c.activeChat?.slug, currentUser: c.username }),
    },
    // === SERVER MANAGEMENT (26-35) ===
    { key: 'autoRoles', C: AutoRolesPanel, cond: isServer, props: c => ({ ...api(c), serverId: c.activeChat.server_id }) },
    { key: 'reactionRoles', C: ReactionRolesPanel, cond: isServer, props: c => ({ ...api(c), serverId: c.activeChat.server_id }) },
    { key: 'welcomeMessages', C: WelcomeMessagesPanel, cond: isServer, props: c => ({ ...api(c), serverId: c.activeChat.server_id }) },
    { key: 'eventCalendar', C: EventCalendar, fb: '📅 Etkinlikler Yükleniyor...', cond: isServer,
      props: c => ({ ...api(c), serverId: c.activeChat.server_id, currentUser: c.username }),
    },
    { key: 'giveaway', C: GiveawayPanel, fb: '🎉 Çekiliş Yükleniyor...', cond: isServer,
      props: c => ({ ...api(c), serverId: c.activeChat.server_id, currentUser: c.username }),
    },
    { key: 'ticketSystem', C: TicketSystemPanel, fb: '🎫 Destek Sistemi Yükleniyor...', cond: isServer,
      props: c => ({ ...api(c), serverId: c.activeChat.server_id, currentUser: c.username }),
    },
    { key: 'starboard', C: StarboardPanel, cond: isServer, props: c => ({ ...api(c), serverId: c.activeChat.server_id }) },
    { key: 'serverBackup', C: ServerBackupPanel, cond: isServer, props: c => ({ ...api(c), serverId: c.activeChat.server_id }) },
    { key: 'banAppeals', C: BanAppealsPanel, cond: isServer, props: c => ({ ...api(c), serverId: c.activeChat.server_id }) },
    { key: 'customCommands', C: CustomCommandsPanel, cond: isServer, props: c => ({ ...api(c), serverId: c.activeChat.server_id }) },
    // === GAMIFICATION & SOCIAL (36-50) ===
    { key: 'levelingSystem', C: LevelingSystemPanel, fb: '📊 Seviye Sistemi Yükleniyor...', cond: isServer,
      props: c => ({ ...api(c), serverId: c.activeChat.server_id, currentUser: c.username }),
    },
    { key: 'liveStream', C: LiveStreamPanel, fb: '📺 Canlı Yayın Yükleniyor...',
      props: c => ({ ...api(c), roomSlug: c.activeChat?.slug, currentUser: c.username }),
    },
    { key: 'achievements', C: AchievementsPanel, fb: '🏆 Başarımlar Yükleniyor...',
      props: c => ({ ...api(c), username: c.username }),
    },
    { key: 'birthdaySystem', C: BirthdaySystemPanel, cond: isServer,
      props: c => ({ ...api(c), serverId: c.activeChat.server_id }),
    },
    { key: 'premium', C: PremiumModal, fb: '💎 Premium Yükleniyor...',
      props: c => ({ ...api(c), username: c.username }),
    },
    { key: 'musicPlayer', C: MusicPlayer, fb: '🎵 Müzik Yükleniyor...',
      props: c => ({ ...api(c), roomSlug: c.activeChat?.slug }),
    },
    { key: 'botMarketplace', C: BotMarketplace, fb: '🤖 Bot Mağazası Yükleniyor...',
      props: c => ({ ...api(c), serverId: c.activeChat?.server_id }),
    },
    { key: 'profileCustomization', C: ProfileCustomization,
      props: c => ({ ...api(c), currentUser: c.currentUserProfile,
          onProfileUpdate: (updated) => c.setCurrentUserProfile(updated),
      }),
    },
    { key: 'integrationHub', C: IntegrationHubPanel, fb: '🔗 Entegrasyonlar Yükleniyor...', props: api },
    { key: 'tournaments', C: TournamentSystem, fb: '🏆 Turnuvalar Yükleniyor...', cond: isServer,
      props: c => ({ ...api(c), serverId: c.activeChat.server_id, currentUser: c.username }),
    },
    { key: 'highlights', C: HighlightsPanel, props: api },
    { key: 'customEmbed', C: CustomEmbedPanel, props: c => ({ ...api(c), roomSlug: c.activeChat?.slug }) },
    { key: 'spotifyIntegration', C: SpotifyIntegrationPanel, fb: '🎵 Spotify Yükleniyor...', props: api },
    { key: 'serverClone', C: ServerClonePanel, cond: isServer, props: c => ({ ...api(c), serverId: c.activeChat.server_id }) },
    { key: 'weeklyChallenges', C: WeeklyChallengesPanel, fb: '🎯 Haftalık Görevler Yükleniyor...',
      props: c => ({ ...api(c), username: c.username }),
    },
];
