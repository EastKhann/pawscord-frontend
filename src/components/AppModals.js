import React, { Suspense } from 'react';
import { useUIStore } from '../stores/useUIStore';
import FeatureErrorBoundary from './FeatureErrorBoundary';
import LoadingSpinner from './LoadingSpinner';
import {
    ABSOLUTE_HOST_URL, API_BASE_URL, WS_PROTOCOL, API_HOST,
    LOCAL_GIF_LIST_URL, UPDATE_PROFILE_URL, CHANGE_USERNAME_URL
} from '../config/api';

// Lazy-loaded modal components
const CinemaModal = React.lazy(() => import('../CinemaModal'));
const CryptoChartModal = React.lazy(() => import('../CryptoChartModal'));
const GifPicker = React.lazy(() => import('../GifPicker'));
const PinnedMessages = React.lazy(() => import('../PinnedMessages'));
const StickerPicker = React.lazy(() => import('../StickerPicker'));
const SummaryModal = React.lazy(() => import('../SummaryModal'));
const UserProfileModal = React.lazy(() => import('../UserProfileModal'));
const UserProfilePanel = React.lazy(() => import('../UserProfilePanel'));
const AIChatbotPanel = React.lazy(() => import('./AIChatbotPanel'));
const AIModerationPanel = React.lazy(() => import('./AIModerationPanel'));
const APIKeysPanel = React.lazy(() => import('./APIKeysPanel'));
const APIUsagePanel = React.lazy(() => import('./APIUsagePanel'));
const AccountDeletionModal = React.lazy(() => import('./AccountDeletionModal'));
const AchievementsPanel = React.lazy(() => import('./AchievementsPanel'));
const AdminAnalyticsPanel = React.lazy(() => import('./AdminAnalyticsPanel'));
const AdminPanelModal = React.lazy(() => import('./AdminPanelModal'));
const AdvancedAnalyticsDashboard = React.lazy(() => import('./AdvancedAnalyticsDashboard'));
const AdvancedSearchPanel = React.lazy(() => import('./AdvancedSearchPanel'));
const AppearanceSettingsPanel = React.lazy(() => import('./AppearanceSettingsPanel'));
const AuditLogPanel = React.lazy(() => import('./AuditLogPanel'));
const AuditLogsPanel = React.lazy(() => import('./AuditLogsPanel'));
const AutoModerationDashboard = React.lazy(() => import('./AutoModerationDashboard'));
const AutoModerationPanel = React.lazy(() => import('./AutoModerationPanel'));
const AutoRespondersPanel = React.lazy(() => import('./AutoRespondersPanel'));
const AutoRolesPanel = React.lazy(() => import('./AutoRolesPanel'));
const AvatarStudioPanel = React.lazy(() => import('./AvatarStudioPanel'));
const BanAppealsPanel = React.lazy(() => import('./BanAppealsPanel'));
const BanHistoryPanel = React.lazy(() => import('./BanHistoryPanel'));
const BirthdaySystemPanel = React.lazy(() => import('./BirthdaySystemPanel'));
const BlockListPanel = React.lazy(() => import('./BlockListPanel'));
const BookmarkPanel = React.lazy(() => import('./BookmarkPanel'));
const BotBuilder = React.lazy(() => import('./BotBuilder'));
const BotDeveloperPortal = React.lazy(() => import('./BotDeveloperPortal'));
const BotMarketplace = React.lazy(() => import('./BotMarketplace'));
const ChangelogPanel = React.lazy(() => import('./ChangelogPanel'));
const ChannelPermissionsPanel = React.lazy(() => import('./ChannelPermissionsPanel'));
const ChannelSettingsModal = React.lazy(() => import('./ChannelSettingsModal'));
const CodeRunnerPanel = React.lazy(() => import('./CodeRunnerPanel'));
const CodeSnippetModal = React.lazy(() => import('./CodeSnippetModal'));
const CoinStoreModal = React.lazy(() => import('./CoinStoreModal'));
const CollaborativeCodeEditor = React.lazy(() => import('./CollaborativeCodeEditor'));
const CommandPalette = React.lazy(() => import('./CommandPalette'));
const CommunitySettingsPanel = React.lazy(() => import('./CommunitySettingsPanel'));
const ConnectionsPanel = React.lazy(() => import('./ConnectionsPanel'));
const ContentScannerPanel = React.lazy(() => import('./ContentScannerPanel'));
const CreateGroupModal = React.lazy(() => import('./CreateGroupModal'));
const CustomCommandsPanel = React.lazy(() => import('./CustomCommandsPanel'));
const CustomEmbedPanel = React.lazy(() => import('./CustomEmbedPanel'));
const CustomStatusModal = React.lazy(() => import('./CustomStatusModal'));
const DJModal = React.lazy(() => import('./DJModal'));
const DailyRewardsModal = React.lazy(() => import('./DailyRewardsModal'));
const DataRetentionPanel = React.lazy(() => import('./DataRetentionPanel'));
const DownloadModal = React.lazy(() => import('./DownloadModal'));
const DraftsPanel = React.lazy(() => import('./DraftsPanel'));
const E2EESettingsPanel = React.lazy(() => import('./E2EESettingsPanel'));
const EncryptionKeyModal = React.lazy(() => import('./EncryptionKeyModal'));
const EnhancedPollsPanel = React.lazy(() => import('./EnhancedPollsPanel'));
const EphemeralMessagesPanel = React.lazy(() => import('./EphemeralMessagesPanel'));
const ErrorReportingPanel = React.lazy(() => import('./ErrorReportingPanel'));
const EventCalendar = React.lazy(() => import('./EventCalendar'));
const ExportJobsPanel = React.lazy(() => import('./ExportJobsPanel'));
const FieldChangeTrackingPanel = React.lazy(() => import('./FieldChangeTrackingPanel'));
const FileManagerPanel = React.lazy(() => import('./FileManagerPanel'));
const ForumPanel = React.lazy(() => import('./ForumPanel'));
const GDPRExportPanel = React.lazy(() => import('./GDPRExportPanel'));
const GIFPickerPanel = React.lazy(() => import('./GIFPickerPanel'));
const GiftPremiumPanel = React.lazy(() => import('./GiftPremiumPanel'));
const GiveawayPanel = React.lazy(() => import('./GiveawayPanel'));
const GrowthMetricsPanel = React.lazy(() => import('./GrowthMetricsPanel'));
const HighlightsPanel = React.lazy(() => import('./HighlightsPanel'));
const ImageLightbox = React.lazy(() => import('./ImageLightbox'));
const IntegrationHubPanel = React.lazy(() => import('./IntegrationHubPanel'));
const InventoryPanel = React.lazy(() => import('./InventoryPanel'));
const InviteAnalyticsPanel = React.lazy(() => import('./InviteAnalyticsPanel'));
const InviteExportPanel = React.lazy(() => import('./InviteExportPanel'));
const InviteLinkManager = React.lazy(() => import('./InviteLinkManager'));
const InviteModal = React.lazy(() => import('./InviteModal'));
const JoinLeaveLogsPanel = React.lazy(() => import('./JoinLeaveLogsPanel'));
const KeyboardShortcutsModal = React.lazy(() => import('./KeyboardShortcutsModal'));
const LanguageSelector = React.lazy(() => import('./LanguageSelector'));
const LevelingSystemPanel = React.lazy(() => import('./LevelingSystemPanel'));
const LinkClickTrackingPanel = React.lazy(() => import('./LinkClickTrackingPanel'));
const LinkPreviewRenderer = React.lazy(() => import('./LinkPreviewRenderer'));
const LiveStreamModal = React.lazy(() => import('./LiveStreamModal'));
const LiveStreamPanel = React.lazy(() => import('./LiveStreamPanel'));
const LoginHistory = React.lazy(() => import('./LoginHistory'));
const LogoutModal = React.lazy(() => import('./LogoutModal'));
const MentionsInboxPanel = React.lazy(() => import('./MentionsInboxPanel'));
const MessageSearchPanel = React.lazy(() => import('./MessageSearchPanel'));
const MessageSummaryPanel = React.lazy(() => import('./MessageSummaryPanel'));
const MessageTemplateModal = React.lazy(() => import('./MessageTemplateModal'));
const MiniGamesPanel = React.lazy(() => import('./MiniGamesPanel'));
const ModerationLogsPanel = React.lazy(() => import('./ModerationLogsPanel'));
const ModeratorTools = React.lazy(() => import('./ModeratorTools'));
const MusicPlayer = React.lazy(() => import('./MusicPlayer'));
const MutualsPanel = React.lazy(() => import('./MutualsPanel'));
const NicknameHistoryPanel = React.lazy(() => import('./NicknameHistoryPanel'));
const NotificationSoundSettings = React.lazy(() => import('./NotificationSoundSettings'));
const NotificationsCenter = React.lazy(() => import('./NotificationsCenter'));
const OAuthAppsPanel = React.lazy(() => import('./OAuthAppsPanel'));
const PasswordSetupModal = React.lazy(() => import('./PasswordSetupModal'));
const PaymentPanel = React.lazy(() => import('./PaymentPanel'));
const PollCreateModal = React.lazy(() => import('./PollCreateModal'));
const PollCreator = React.lazy(() => import('./PollCreator'));
const PremiumManagementPanel = React.lazy(() => import('./PremiumManagementPanel'));
const PremiumMarketplace = React.lazy(() => import('./PremiumMarketplace'));
const PremiumModal = React.lazy(() => import('./PremiumModal'));
const PremiumStoreModal = React.lazy(() => import('./PremiumStoreModal'));
const PrivacySettingsPanel = React.lazy(() => import('./PrivacySettingsPanel'));
const ProfileCard = React.lazy(() => import('./ProfileCard'));
const ProfileCustomization = React.lazy(() => import('./ProfileCustomization'));
const ProfileShowcasePanel = React.lazy(() => import('./ProfileShowcasePanel'));
const ProjectCollaborationPanel = React.lazy(() => import('./ProjectCollaborationPanel'));
const QuickSwitcher = React.lazy(() => import('./QuickSwitcher'));
const RaidProtectionPanel = React.lazy(() => import('./RaidProtectionPanel'));
const ReactionAnalyticsPanel = React.lazy(() => import('./ReactionAnalyticsPanel'));
const ReactionRolesPanel = React.lazy(() => import('./ReactionRolesPanel'));
const ReadLaterPanel = React.lazy(() => import('./ReadLaterPanel'));
const ReferralRewardsPanel = React.lazy(() => import('./ReferralRewardsPanel'));
const ReminderPanel = React.lazy(() => import('./ReminderPanel'));
const ReportSystemPanel = React.lazy(() => import('./ReportSystemPanel'));
const ReportsPanel = React.lazy(() => import('./ReportsPanel'));
const RolesManager = React.lazy(() => import('./RolesManager'));
const RoomWebhooksPanel = React.lazy(() => import('./RoomWebhooksPanel'));
const SavedMessagesModal = React.lazy(() => import('./SavedMessagesModal'));
const ScheduledAnnouncementsPanel = React.lazy(() => import('./ScheduledAnnouncementsPanel'));
const ScheduledMessagesPanel = React.lazy(() => import('./ScheduledMessagesPanel'));
const ScreenShareModal = React.lazy(() => import('./ScreenShareModal'));
const SecurityAlertsPanel = React.lazy(() => import('./SecurityAlertsPanel'));
const SecuritySettingsPanel = React.lazy(() => import('./SecuritySettingsPanel'));
const ServerAnalyticsDashboard = React.lazy(() => import('./ServerAnalyticsDashboard'));
const ServerBackupPanel = React.lazy(() => import('./ServerBackupPanel'));
const ServerBoostPanel = React.lazy(() => import('./ServerBoostPanel'));
const ServerClonePanel = React.lazy(() => import('./ServerClonePanel'));
const ServerDiscoveryPage = React.lazy(() => import('./ServerDiscoveryPage'));
const ServerNicknamesPanel = React.lazy(() => import('./ServerNicknamesPanel'));
const ServerSettingsModal = React.lazy(() => import('./ServerSettingsModal'));
const ServerTemplates = React.lazy(() => import('./ServerTemplates'));
const SessionManagementPanel = React.lazy(() => import('./SessionManagementPanel'));
const SessionManagerModal = React.lazy(() => import('./SessionManagerModal'));
const SlashCommandsPanel = React.lazy(() => import('./SlashCommandsPanel'));
const SoundboardModal = React.lazy(() => import('./SoundboardModal'));
const SpamDetectionPanel = React.lazy(() => import('./SpamDetectionPanel'));
const SpotifyIntegrationPanel = React.lazy(() => import('./SpotifyIntegrationPanel'));
const StageChannelPanel = React.lazy(() => import('./StageChannelPanel'));
const StarboardPanel = React.lazy(() => import('./StarboardPanel'));
const StatusPicker = React.lazy(() => import('./StatusPicker'));
const StickersPanel = React.lazy(() => import('./StickersPanel'));
const StoreModal = React.lazy(() => import('./StoreModal'));
const SubscriptionManager = React.lazy(() => import('./SubscriptionManager'));
const ThemeMarketplace = React.lazy(() => import('./ThemeMarketplace'));
const ThemeStoreModal = React.lazy(() => import('./ThemeStoreModal'));
const ThreadView = React.lazy(() => import('./ThreadView'));
const TicketSystemPanel = React.lazy(() => import('./TicketSystemPanel'));
const TopicHistoryPanel = React.lazy(() => import('./TopicHistoryPanel'));
const TournamentSystem = React.lazy(() => import('./TournamentSystem'));
const TranslationPanel = React.lazy(() => import('./TranslationPanel'));
const TwoFactorSetupWizard = React.lazy(() => import('./TwoFactorSetupWizard'));
const UserActivityPanel = React.lazy(() => import('./UserActivityPanel'));
const UserNotesModal = React.lazy(() => import('./UserNotesModal'));
const UserSettingsModal = React.lazy(() => import('./UserSettingsModal'));
const UserWarningsPanel = React.lazy(() => import('./UserWarningsPanel'));
const VanityURLManager = React.lazy(() => import('./VanityURLManager'));
const VideoCallModal = React.lazy(() => import('./VideoCallModal'));
const VoiceSettingsPanel = React.lazy(() => import('./VoiceSettingsPanel'));
const VoiceTranscriptsPanel = React.lazy(() => import('./VoiceTranscriptsPanel'));
const WaitlistPanel = React.lazy(() => import('./WaitlistPanel'));
const WatchTogether = React.lazy(() => import('./WatchTogether'));
const WebhookManager = React.lazy(() => import('./WebhookManager'));
const WebhooksPanel = React.lazy(() => import('./WebhooksPanel'));
const WeeklyChallengesPanel = React.lazy(() => import('./WeeklyChallengesPanel'));
const WelcomeMessagesPanel = React.lazy(() => import('./WelcomeMessagesPanel'));
const WelcomeScreenEditor = React.lazy(() => import('./WelcomeScreenEditor'));
const WhiteboardModal = React.lazy(() => import('./WhiteboardModal'));

const AppModals = ({
    fetchWithAuth,
    activeChat,
    username,
    sendMessage,
    sendSignal,
    ws,
    currentUserProfile, setCurrentUserProfile,
    currentUser, setCurrentUser,
    currentTheme, setCurrentTheme,
    soundSettings, setSoundSettings,
    encryptionKeys, currentKeyId, setEncryptionKey,
    chartSymbol, setChartSymbol,
    serverToEdit, setServerToEdit,
    serverMembers,
    friendsList,
    conversations, categories, allUsers,
    pinnedMessages,
    isSummaryLoading, summaryResult,
    zoomedImage, setZoomedImage,
    galleryData, setGalleryData,
    viewingProfile, setViewingProfile,
    isAdmin,
    richTextRef,
    logout,
    getDeterministicAvatar,
    handleSendSnippet,
    handleDMClick,
    setActiveChat,
    setConversations,
    isMuted, isDeafened, toggleMute, toggleDeafened,
}) => {
    const { modals, openModal, closeModal, toggleModal } = useUIStore();

    return (
        <>
        {/* --- LAZY MODALS --- */}

        <Suspense fallback={<LoadingSpinner size="medium" text="Modal yükleniyor..." />}>

            {modals.profilePanel && <UserProfilePanel user={currentUserProfile} onClose={() => closeModal('profilePanel')} onProfileUpdate={(updatedUser) => setCurrentUserProfile(updatedUser)} onLogout={logout} fetchWithAuth={fetchWithAuth} getDeterministicAvatar={getDeterministicAvatar} updateProfileUrl={UPDATE_PROFILE_URL} changeUsernameUrl={CHANGE_USERNAME_URL} soundSettings={soundSettings} onUpdateSoundSettings={setSoundSettings} onImageClick={setZoomedImage} apiBaseUrl={ABSOLUTE_HOST_URL} />}

            {modals.store && <PremiumStoreModal onClose={() => closeModal('store')} />}

            {modals.analytics && <AdminAnalyticsPanel onClose={() => closeModal('analytics')} fetchWithAuth={fetchWithAuth} apiBaseUrl={ABSOLUTE_HOST_URL} />}

            {modals.adminPanel && (

                <AdminPanelModal

                    onClose={() => closeModal('adminPanel')}

                    onOpenAnalytics={() => openModal('analytics')}

                    onOpenWebhooks={() => openModal('webhooks')}

                    onOpenModTools={() => openModal('modTools')}

                    onOpenAuditLogs={() => openModal('auditLog')}

                    onOpenReports={() => openModal('reportSystem')}

                    onOpenVanityURL={() => openModal('vanityURL')}

                    onOpenAutoResponder={() => openModal('autoResponder')}

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                />

            )}


            {/* � CRITICAL & HIGH PRIORITY PANELS (2026-01-19) */}

            {modals.paymentPanel && (

                <PaymentPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('paymentPanel')}

                    username={username}

                />

            )}

            {modals.storeModal && (

                <StoreModal

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('storeModal')}

                    username={username}

                />

            )}

            {modals.dailyRewards && (

                <DailyRewardsModal

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('dailyRewards')}

                    username={username}

                />

            )}

            {modals.aPIUsagePanel && (

                <APIUsagePanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('aPIUsagePanel')}

                    username={username}

                />

            )}

            {modals.exportJobsPanel && (

                <ExportJobsPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('exportJobsPanel')}

                    username={username}

                />

            )}

            {modals.scheduledAnnouncements && (

                <ScheduledAnnouncementsPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('scheduledAnnouncements')}

                    serverId={activeChat?.type === 'room' ? activeChat.server_id : null}

                />

            )}


            {/* 🔗 PLATFORM CONNECTIONS PANEL */}

            {modals.connectionsPanel && (

                <ConnectionsPanel

                    onClose={() => closeModal('connectionsPanel')}

                />

            )}


            {/* 🔑 PASSWORD SETUP MODAL (Google Users) */}

            {modals.passwordSetupModal && (

                <PasswordSetupModal

                    onClose={() => closeModal('passwordSetupModal')}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                />

            )}


            {/* 🛡️ MODERATION PANELS */}

            {modals.autoModeration && (

                <AutoModerationDashboard

                    serverId={activeChat?.type === 'room' ? activeChat.server_id : null}

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('autoModeration')}

                />

            )}

            {modals.raidProtection && (

                <RaidProtectionPanel

                    serverId={activeChat?.type === 'room' ? activeChat.server_id : null}

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('raidProtection')}

                />

            )}

            {modals.reportSystem && (

                <ReportSystemPanel

                    serverId={activeChat?.type === 'room' ? activeChat.server_id : null}

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('reportSystem')}

                />

            )}

            {modals.auditLog && (

                <AuditLogPanel

                    serverId={activeChat?.type === 'room' ? activeChat.server_id : null}

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('auditLog')}

                />

            )}

            {modals.userWarnings && (

                <UserWarningsPanel

                    serverId={activeChat?.type === 'room' ? activeChat.server_id : null}

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('userWarnings')}

                />

            )}


            {/* 🔥 WEBHOOKS & VANITY URL */}

            {modals.webhooks && (

                <WebhooksPanel

                    serverId={activeChat?.type === 'room' ? activeChat.server_id : null}

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('webhooks')}

                />

            )}

            {modals.vanityURL && (

                <VanityURLManager

                    serverId={activeChat?.type === 'room' ? activeChat.server_id : null}

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={API_BASE_URL}

                    onClose={() => closeModal('vanityURL')}

                />

            )}

            {modals.autoResponder && activeChat?.type === 'room' && activeChat.server_id && (

                <Suspense fallback={<div>Yükleniyor...</div>}>

                    <AutoRespondersPanel

                        fetchWithAuth={fetchWithAuth}

                        apiBaseUrl={ABSOLUTE_HOST_URL}

                        serverId={activeChat.server_id}

                        onClose={() => closeModal('autoResponder')}

                    />

                </Suspense>

            )}


            {/* 📚 NEW FEATURES: Feature Panels (2026-01-19) */}

            {modals.bookmarks && (

                <Suspense fallback={<div>Yükleniyor...</div>}>

                    <BookmarkPanel

                        fetchWithAuth={fetchWithAuth}

                        apiBaseUrl={ABSOLUTE_HOST_URL}

                        onClose={() => closeModal('bookmarks')}

                        onMessageClick={(msg) => {

                            // Mesaja git

                            if (msg.room) {

                                setActiveChat({ type: 'room', slug: msg.room });

                            } else if (msg.conversation) {

                                setActiveChat({ type: 'dm', slug: msg.conversation });

                            }

                            closeModal('bookmarks');

                        }}

                    />

                </Suspense>

            )}


            {modals.readLater && (

                <Suspense fallback={<div>Yükleniyor...</div>}>

                    <ReadLaterPanel

                        fetchWithAuth={fetchWithAuth}

                        apiBaseUrl={ABSOLUTE_HOST_URL}

                        onClose={() => closeModal('readLater')}

                        onMessageClick={(msg) => {

                            if (msg.room) {

                                setActiveChat({ type: 'room', slug: msg.room });

                            } else if (msg.conversation) {

                                setActiveChat({ type: 'dm', slug: msg.conversation });

                            }

                            closeModal('readLater');

                        }}

                    />

                </Suspense>

            )}


            {/* 📬 Mentions Inbox Panel */}

            {modals.mentionsInbox && (

                <Suspense fallback={<div>Yükleniyor...</div>}>

                    <MentionsInboxPanel

                        isOpen={modals.mentionsInbox}

                        onClose={() => closeModal('mentionsInbox')}

                        currentUsername={currentUser?.username}

                        onNavigateToMessage={(msg) => {

                            if (msg.room_id) {

                                // Navigate to the room where the mention happened

                                setActiveChat({ type: 'room', id: msg.room_id });

                            }

                            closeModal('mentionsInbox');

                        }}

                    />

                </Suspense>

            )}


            {/* 🎭 Custom Status Modal */}

            {modals.customStatus && (

                <Suspense fallback={<div>Yükleniyor...</div>}>

                    <CustomStatusModal

                        isOpen={modals.customStatus}

                        onClose={() => closeModal('customStatus')}

                        onStatusChange={(status) => {

                            // Update local user status display

                            if (currentUser) {

                                setCurrentUser(prev => ({ ...prev, customStatus: status }));

                            }

                        }}

                    />

                </Suspense>

            )}


            {modals.channelPermissions && activeChat?.type === 'room' && (

                <Suspense fallback={<div>Yükleniyor...</div>}>

                    <ChannelPermissionsPanel

                        fetchWithAuth={fetchWithAuth}

                        apiBaseUrl={ABSOLUTE_HOST_URL}

                        channelSlug={activeChat.slug}

                        onClose={() => closeModal('channelPermissions')}

                    />

                </Suspense>

            )}


            {modals.autoModeration && (

                <Suspense fallback={<div>Yükleniyor...</div>}>

                    <AutoModerationPanel

                        fetchWithAuth={fetchWithAuth}

                        apiBaseUrl={ABSOLUTE_HOST_URL}

                        serverId={activeChat?.type === 'room' ? activeChat.server_id : null}

                        onClose={() => closeModal('autoModeration')}

                    />

                </Suspense>

            )}


            {chartSymbol && <CryptoChartModal symbol={chartSymbol} onClose={() => setChartSymbol(null)} />}

            {modals.cinema && <CinemaModal onClose={() => closeModal('cinema')} ws={ws} username={username} />}

            {modals.snippetModal && <CodeSnippetModal onClose={() => closeModal('snippetModal')} onSend={handleSendSnippet} />}

            {serverToEdit && <ServerSettingsModal onClose={() => setServerToEdit(null)} server={serverToEdit} currentUsername={username} fetchWithAuth={fetchWithAuth} apiBaseUrl={API_BASE_URL} serverMembers={serverMembers} />}

            {modals.encModal && <EncryptionKeyModal onClose={() => closeModal('encModal')} onSetKey={(key) => setEncryptionKey(currentKeyId, key)} existingKey={encryptionKeys[currentKeyId]} />}

            {modals.downloadModal && <DownloadModal onClose={() => closeModal('downloadModal')} apiBaseUrl={ABSOLUTE_HOST_URL} />}

            {modals.summary && <SummaryModal isLoading={isSummaryLoading} summaryText={summaryResult} onClose={() => closeModal('summary')} />}

            {modals.groupModal && <CreateGroupModal onClose={() => closeModal('groupModal')} friendsList={friendsList} fetchWithAuth={fetchWithAuth} apiBaseUrl={ABSOLUTE_HOST_URL} onGroupCreated={(newConv) => { setConversations(prev => [newConv, ...prev]); setActiveChat('dm', newConv.id, 'Grup Sohbeti'); }} />}

            {modals.whiteboard && (activeChat.type === 'room' || activeChat.type === 'dm') && (

                <WhiteboardModal roomSlug={activeChat.type === 'room' ? activeChat.id : `dm_${activeChat.id}`} onClose={() => closeModal('whiteboard')} wsProtocol={WS_PROTOCOL} apiHost={API_HOST} />

            )}

            {modals.soundboard && <SoundboardModal onClose={() => closeModal('soundboard')} fetchWithAuth={fetchWithAuth} apiBaseUrl={ABSOLUTE_HOST_URL} sendSignal={sendSignal} absoluteHostUrl={ABSOLUTE_HOST_URL} />}

            {modals.dJ && <DJModal onClose={() => closeModal('dJ')} ws={ws} roomSlug={activeChat.id} />}

            {modals.gifPicker && <GifPicker onSelect={(url) => { const full = url.startsWith('http') ? url : ABSOLUTE_HOST_URL + url; sendMessage(full); closeModal('gifPicker'); }} onClose={() => closeModal('gifPicker')} localGifListUrl={LOCAL_GIF_LIST_URL} absoluteHostUrl={ABSOLUTE_HOST_URL} fetchWithAuth={fetchWithAuth} />}

            {modals.stickerPicker && <StickerPicker onClose={() => closeModal('stickerPicker')} onSelect={(url) => { sendMessage(url); closeModal('stickerPicker'); }} fetchWithAuth={fetchWithAuth} apiBaseUrl={ABSOLUTE_HOST_URL} />}

            {modals.pollModal && <PollCreateModal onClose={() => closeModal('pollModal')} fetchWithAuth={fetchWithAuth} apiBaseUrl={ABSOLUTE_HOST_URL} activeRoomSlug={activeChat.id} />}

        </Suspense>


        {/* 🚀 BATCH 1: Analytics & Tracking (2026-01-19) */}

        {modals.reactionAnalytics && activeChat?.type === 'room' && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <ReactionAnalyticsPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    roomSlug={activeChat.slug}

                    onClose={() => closeModal('reactionAnalytics')}

                />

            </Suspense>

        )}


        {modals.linkClickTracking && activeChat?.type === 'room' && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <LinkClickTrackingPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    roomSlug={activeChat.slug}

                    onClose={() => closeModal('linkClickTracking')}

                />

            </Suspense>

        )}


        {modals.joinLeaveLogs && activeChat?.type === 'room' && activeChat.server_id && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <JoinLeaveLogsPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat.server_id}

                    onClose={() => closeModal('joinLeaveLogs')}

                />

            </Suspense>

        )}


        {modals.userActivity && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <UserActivityPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    username={username}

                    onClose={() => closeModal('userActivity')}

                />

            </Suspense>

        )}


        {modals.nicknameHistory && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <NicknameHistoryPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    username={username}

                    onClose={() => closeModal('nicknameHistory')}

                />

            </Suspense>

        )}


        {modals.fieldChangeTracking && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <FieldChangeTrackingPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('fieldChangeTracking')}

                />

            </Suspense>

        )}


        {modals.inviteAnalytics && activeChat?.type === 'room' && activeChat.server_id && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <InviteAnalyticsPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat.server_id}

                    onClose={() => closeModal('inviteAnalytics')}

                />

            </Suspense>

        )}


        {/* 🚀 BATCH 2: Content & Moderation (2026-01-19) */}

        {modals.contentScanner && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <ContentScannerPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('contentScanner')}

                />

            </Suspense>

        )}


        {modals.ephemeralMessages && activeChat?.type === 'room' && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <EphemeralMessagesPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    roomSlug={activeChat.slug}

                    onClose={() => closeModal('ephemeralMessages')}

                />

            </Suspense>

        )}


        {modals.topicHistory && activeChat?.type === 'room' && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <TopicHistoryPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    roomSlug={activeChat.slug}

                    onClose={() => closeModal('topicHistory')}

                />

            </Suspense>

        )}


        {modals.drafts && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <DraftsPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('drafts')}

                    onLoadDraft={(draft) => {

                        // Draft'ı mesaj composer'a yükle

                        if (draft.room) {

                            setActiveChat({ type: 'room', slug: draft.room });

                        }

                        closeModal('drafts');

                    }}

                />

            </Suspense>

        )}


        {modals.serverNicknames && activeChat?.type === 'room' && activeChat.server_id && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <ServerNicknamesPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat.server_id}

                    onClose={() => closeModal('serverNicknames')}

                />

            </Suspense>

        )}


        {/* 🚀 BATCH 3: Server Features (2026-01-19) */}

        {modals.serverBoost && activeChat?.type === 'room' && activeChat.server_id && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <ServerBoostPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat.server_id}

                    currentUsername={username}

                    onClose={() => closeModal('serverBoost')}

                />

            </Suspense>

        )}


        {modals.roomWebhooks && activeChat?.type === 'room' && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <RoomWebhooksPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    roomSlug={activeChat.slug}

                    onClose={() => closeModal('roomWebhooks')}

                />

            </Suspense>

        )}


        {modals.oAuthApps && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <OAuthAppsPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('oAuthApps')}

                />

            </Suspense>

        )}


        {modals.autoResponders && activeChat?.type === 'room' && activeChat.server_id && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <AutoRespondersPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat.server_id}

                    onClose={() => closeModal('autoResponders')}

                />

            </Suspense>

        )}


        {/* 🚀 BATCH 4: Security & Privacy (2026-01-19) */}

        {modals.sessionManagement && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <SessionManagementPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('sessionManagement')}

                />

            </Suspense>

        )}


        {modals.gDPRExport && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <GDPRExportPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('gDPRExport')}

                />

            </Suspense>

        )}


        {modals.dataRetention && activeChat?.type === 'room' && activeChat.server_id && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <DataRetentionPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat.server_id}

                    onClose={() => closeModal('dataRetention')}

                />

            </Suspense>

        )}


        {modals.twoFactorSetup && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <TwoFactorSetupWizard

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('twoFactorSetup')}

                    onSuccess={() => {

                        toast.success('2FA başarıyla etkinleştirildi!');

                        closeModal('twoFactorSetup');

                    }}

                />

            </Suspense>

        )}


        {/* 🚀 BATCH 5: Communication (2026-01-19) */}

        {modals.enhancedPolls && activeChat?.type === 'room' && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <EnhancedPollsPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    roomSlug={activeChat.slug}

                    onClose={() => closeModal('enhancedPolls')}

                />

            </Suspense>

        )}


        {modals.voiceTranscripts && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <VoiceTranscriptsPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('voiceTranscripts')}

                />

            </Suspense>

        )}


        {modals.inviteExport && activeChat?.type === 'room' && activeChat.server_id && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <InviteExportPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat.server_id}

                    onClose={() => closeModal('inviteExport')}

                />

            </Suspense>

        )}


        {/* 🚀 BATCH 6: Advanced Search & Analytics (2026-01-19) */}

        {modals.advancedSearch && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <AdvancedSearchPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('advancedSearch')}

                    onMessageClick={(msg) => {

                        if (msg.room) {

                            setActiveChat({ type: 'room', slug: msg.room });

                        }

                        closeModal('advancedSearch');

                    }}

                />

            </Suspense>

        )}


        {modals.growthMetrics && activeChat?.type === 'room' && activeChat.server_id && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <GrowthMetricsPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat.server_id}

                    onClose={() => closeModal('growthMetrics')}

                />

            </Suspense>

        )}


        {modals.linkPreview && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <LinkPreviewRenderer

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    url={null}

                    onClose={() => closeModal('linkPreview')}

                />

            </Suspense>

        )}


        {/* 🚀 BATCH 7: Store & Gamification (2026-01-19) */}

        {modals.inventory && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <InventoryPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('inventory')}

                />

            </Suspense>

        )}


        {modals.waitlist && activeChat?.type === 'room' && activeChat.server_id && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <WaitlistPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat.server_id}

                    onClose={() => closeModal('waitlist')}

                />

            </Suspense>

        )}


        {modals.referralRewards && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <ReferralRewardsPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('referralRewards')}

                />

            </Suspense>

        )}


        {/* 🎮 BATCH 8: New Features (2026-01-28) */}

        {modals.miniGames && (

            <Suspense fallback={<div>🎮 Oyunlar Yükleniyor...</div>}>

                <MiniGamesPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat?.server_id}

                    currentUser={username}

                    onClose={() => closeModal('miniGames')}

                />

            </Suspense>

        )}


        {modals.projectCollaboration && (

            <Suspense fallback={<div>📂 Projeler Yükleniyor...</div>}>

                <ProjectCollaborationPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat?.server_id}

                    currentUser={username}

                    onClose={() => closeModal('projectCollaboration')}

                />

            </Suspense>

        )}


        {modals.avatarStudio && (

            <Suspense fallback={<div>🎨 Avatar Studio Yükleniyor...</div>}>

                <AvatarStudioPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    currentUser={username}

                    onClose={() => closeModal('avatarStudio')}

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


        {/* 🔥 BATCH 10: 50 Essential Features (2026-02-01) */}


        {/* ⚙️ 1. User Settings Modal */}

        {modals.userSettings && (

            <Suspense fallback={<div>⚙️ Ayarlar Yükleniyor...</div>}>

                <UserSettingsModal

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    currentUser={currentUserProfile}

                    username={username}

                    onClose={() => closeModal('userSettings')}

                    onOpenAppearance={() => openModal('appearanceSettings')}

                    onOpenPrivacy={() => openModal('privacySettings')}

                    onOpenSecurity={() => openModal('securitySettings')}

                    onOpenNotifications={() => openModal('notificationSounds')}

                    onOpenConnections={() => openModal('connectionsPanel')}

                    onOpenLanguage={() => openModal('languageSelector')}

                    onLogout={() => openModal('logoutConfirm')}

                />

            </Suspense>

        )}


        {/* ⌨️ 2. Keyboard Shortcuts */}

        {modals.keyboardShortcuts && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <KeyboardShortcutsModal onClose={() => closeModal('keyboardShortcuts')} />

            </Suspense>

        )}


        {/* 🔍 3. Command Palette */}

        {modals.commandPalette && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <CommandPalette

                    onClose={() => closeModal('commandPalette')}

                    onNavigate={(target) => {

                        if (target.type === 'room') setActiveChat({ type: 'room', slug: target.slug });

                        else if (target.type === 'dm') setActiveChat({ type: 'dm', id: target.id });

                        closeModal('commandPalette');

                    }}

                    categories={categories}

                    conversations={conversations}

                    allUsers={allUsers}

                />

            </Suspense>

        )}


        {/* 🌍 4. Server Discovery */}

        {modals.serverDiscovery && (

            <Suspense fallback={<div>🌍 Sunucu Keşfet Yükleniyor...</div>}>

                <ServerDiscoveryPage

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    currentUsername={username}

                    onClose={() => closeModal('serverDiscovery')}

                    onJoinServer={(server) => {

                        toast.success(`${server.name} sunucusuna katıldın!`);

                        closeModal('serverDiscovery');

                    }}

                />

            </Suspense>

        )}


        {/* 🎨 5. Appearance Settings */}

        {modals.appearanceSettings && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <AppearanceSettingsPanel

                    onClose={() => closeModal('appearanceSettings')}

                    currentTheme={currentTheme}

                    onThemeChange={setCurrentTheme}

                />

            </Suspense>

        )}


        {/* 🌐 6. Language Selector */}

        {modals.languageSelector && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <LanguageSelector onClose={() => closeModal('languageSelector')} />

            </Suspense>

        )}


        {/* 📋 7. Changelog */}

        {modals.changelog && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <ChangelogPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('changelog')}

                />

            </Suspense>

        )}


        {/* 🚪 8. Logout Confirm */}

        {modals.logoutConfirm && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <LogoutModal

                    onConfirm={() => { logout(); closeModal('logoutConfirm'); }}

                    onClose={() => closeModal('logoutConfirm')}

                />

            </Suspense>

        )}


        {/* 🔊 9. Notification Sound Settings */}

        {modals.notificationSounds && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <NotificationSoundSettings

                    soundSettings={soundSettings}

                    onUpdateSettings={setSoundSettings}

                    onClose={() => closeModal('notificationSounds')}

                />

            </Suspense>

        )}


        {/* ⚡ 10. Quick Switcher */}

        {modals.quickSwitcher && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <QuickSwitcher

                    onClose={() => closeModal('quickSwitcher')}

                    categories={categories}

                    conversations={conversations}

                    onSelect={(item) => {

                        if (item.type === 'room') setActiveChat({ type: 'room', slug: item.slug });

                        else if (item.type === 'dm') setActiveChat({ type: 'dm', id: item.id });

                        closeModal('quickSwitcher');

                    }}

                />

            </Suspense>

        )}


        {/* 🔐 11. Login History */}

        {modals.loginHistory && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <LoginHistory

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('loginHistory')}

                />

            </Suspense>

        )}


        {/* 🛡️ 12. Security Settings */}

        {modals.securitySettings && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <SecuritySettingsPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    username={username}

                    onClose={() => closeModal('securitySettings')}

                    onOpen2FA={() => openModal('twoFactorSetup')}

                    onOpenLoginHistory={() => openModal('loginHistory')}

                />

            </Suspense>

        )}


        {/* 🔒 13. Privacy Settings */}

        {modals.privacySettings && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <PrivacySettingsPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    username={username}

                    onClose={() => closeModal('privacySettings')}

                    onOpenBlockList={() => openModal('blockList')}

                />

            </Suspense>

        )}


        {/* ❌ 14. Account Deletion */}

        {modals.accountDeletion && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <AccountDeletionModal

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    username={username}

                    onClose={() => closeModal('accountDeletion')}

                    onConfirm={() => { logout(); closeModal('accountDeletion'); }}

                />

            </Suspense>

        )}


        {/* 🚫 15. Block List */}

        {modals.blockList && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <BlockListPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('blockList')}

                />

            </Suspense>

        )}


        {/* 🔐 16. E2EE Settings */}

        {modals.e2EESettings && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <E2EESettingsPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    encryptionKeys={encryptionKeys}

                    onClose={() => closeModal('e2EESettings')}

                />

            </Suspense>

        )}


        {/* 💬 17. Thread View */}

        {modals.threadView && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <ThreadView

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    roomSlug={activeChat?.slug}

                    onClose={() => closeModal('threadView')}

                />

            </Suspense>

        )}


        {/* ⏰ 18. Scheduled Messages */}

        {modals.scheduledMessages && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <ScheduledMessagesPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    username={username}

                    onClose={() => closeModal('scheduledMessages')}

                />

            </Suspense>

        )}


        {/* ⏰ 19. Reminders */}

        {modals.reminders && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <ReminderPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    username={username}

                    onClose={() => closeModal('reminders')}

                />

            </Suspense>

        )}


        {/* 📋 20. Forum Panel */}

        {modals.forum && activeChat?.type === 'room' && (

            <Suspense fallback={<div>📋 Forum Yükleniyor...</div>}>

                <ForumPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    roomSlug={activeChat.slug}

                    serverId={activeChat.server_id}

                    currentUser={username}

                    onClose={() => closeModal('forum')}

                />

            </Suspense>

        )}


        {/* 🎤 21. Stage Channel */}

        {modals.stageChannel && (

            <Suspense fallback={<div>🎤 Sahne Yükleniyor...</div>}>

                <StageChannelPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    roomSlug={activeChat?.slug}

                    currentUser={username}

                    onClose={() => closeModal('stageChannel')}

                />

            </Suspense>

        )}


        {/* 📹 22. Video Call */}

        {modals.videoCall && (

            <Suspense fallback={<div>📹 Video Arama Yükleniyor...</div>}>

                <VideoCallModal

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    currentUser={username}

                    targetUser={activeChat?.type === 'dm' ? activeChat.name : null}

                    onClose={() => closeModal('videoCall')}

                />

            </Suspense>

        )}


        {/* 🎙️ 23. Voice Settings */}

        {modals.voiceSettings && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <VoiceSettingsPanel

                    onClose={() => closeModal('voiceSettings')}

                    isMuted={isMuted}

                    isDeafened={isDeafened}

                    onToggleMute={toggleMute}

                    onToggleDeafened={toggleDeafened}

                />

            </Suspense>

        )}


        {/* 🔍 24. Message Search */}

        {modals.messageSearch && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <MessageSearchPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    roomSlug={activeChat?.slug}

                    onClose={() => closeModal('messageSearch')}

                    onMessageClick={(msg) => {

                        if (msg.room) setActiveChat({ type: 'room', slug: msg.room });

                        closeModal('messageSearch');

                    }}

                />

            </Suspense>

        )}


        {/* 🎬 25. Watch Together */}

        {modals.watchTogether && (

            <Suspense fallback={<div>🎬 Birlikte İzle Yükleniyor...</div>}>

                <WatchTogether

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    roomSlug={activeChat?.slug}

                    currentUser={username}

                    onClose={() => closeModal('watchTogether')}

                />

            </Suspense>

        )}


        {/* 🤖 26. Auto Roles */}

        {modals.autoRoles && activeChat?.type === 'room' && activeChat.server_id && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <AutoRolesPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat.server_id}

                    onClose={() => closeModal('autoRoles')}

                />

            </Suspense>

        )}


        {/* 🎭 27. Reaction Roles */}

        {modals.reactionRoles && activeChat?.type === 'room' && activeChat.server_id && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <ReactionRolesPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat.server_id}

                    onClose={() => closeModal('reactionRoles')}

                />

            </Suspense>

        )}


        {/* 👋 28. Welcome Messages */}

        {modals.welcomeMessages && activeChat?.type === 'room' && activeChat.server_id && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <WelcomeMessagesPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat.server_id}

                    onClose={() => closeModal('welcomeMessages')}

                />

            </Suspense>

        )}


        {/* 📅 29. Event Calendar */}

        {modals.eventCalendar && activeChat?.type === 'room' && activeChat.server_id && (

            <Suspense fallback={<div>📅 Etkinlikler Yükleniyor...</div>}>

                <EventCalendar

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat.server_id}

                    currentUser={username}

                    onClose={() => closeModal('eventCalendar')}

                />

            </Suspense>

        )}


        {/* 🎉 30. Giveaway */}

        {modals.giveaway && activeChat?.type === 'room' && activeChat.server_id && (

            <Suspense fallback={<div>🎉 Çekiliş Yükleniyor...</div>}>

                <GiveawayPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat.server_id}

                    currentUser={username}

                    onClose={() => closeModal('giveaway')}

                />

            </Suspense>

        )}


        {/* 🎫 31. Ticket System */}

        {modals.ticketSystem && activeChat?.type === 'room' && activeChat.server_id && (

            <Suspense fallback={<div>🎫 Destek Sistemi Yükleniyor...</div>}>

                <TicketSystemPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat.server_id}

                    currentUser={username}

                    onClose={() => closeModal('ticketSystem')}

                />

            </Suspense>

        )}


        {/* ⭐ 32. Starboard */}

        {modals.starboard && activeChat?.type === 'room' && activeChat.server_id && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <StarboardPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat.server_id}

                    onClose={() => closeModal('starboard')}

                />

            </Suspense>

        )}


        {/* 💾 33. Server Backup */}

        {modals.serverBackup && activeChat?.type === 'room' && activeChat.server_id && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <ServerBackupPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat.server_id}

                    onClose={() => closeModal('serverBackup')}

                />

            </Suspense>

        )}


        {/* ⚖️ 34. Ban Appeals */}

        {modals.banAppeals && activeChat?.type === 'room' && activeChat.server_id && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <BanAppealsPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat.server_id}

                    onClose={() => closeModal('banAppeals')}

                />

            </Suspense>

        )}


        {/* 🤖 35. Custom Commands */}

        {modals.customCommands && activeChat?.type === 'room' && activeChat.server_id && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <CustomCommandsPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat.server_id}

                    onClose={() => closeModal('customCommands')}

                />

            </Suspense>

        )}


        {/* 📊 36. Leveling System */}

        {modals.levelingSystem && activeChat?.type === 'room' && activeChat.server_id && (

            <Suspense fallback={<div>📊 Seviye Sistemi Yükleniyor...</div>}>

                <LevelingSystemPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat.server_id}

                    currentUser={username}

                    onClose={() => closeModal('levelingSystem')}

                />

            </Suspense>

        )}


        {/* 📺 37. Live Stream */}

        {modals.liveStream && (

            <Suspense fallback={<div>📺 Canlı Yayın Yükleniyor...</div>}>

                <LiveStreamPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    roomSlug={activeChat?.slug}

                    currentUser={username}

                    onClose={() => closeModal('liveStream')}

                />

            </Suspense>

        )}


        {/* 🏆 38. Achievements */}

        {modals.achievements && (

            <Suspense fallback={<div>🏆 Başarımlar Yükleniyor...</div>}>

                <AchievementsPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    username={username}

                    onClose={() => closeModal('achievements')}

                />

            </Suspense>

        )}


        {/* 🎂 39. Birthday System */}

        {modals.birthdaySystem && activeChat?.type === 'room' && activeChat.server_id && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <BirthdaySystemPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat.server_id}

                    onClose={() => closeModal('birthdaySystem')}

                />

            </Suspense>

        )}


        {/* 💎 40. Premium */}

        {modals.premium && (

            <Suspense fallback={<div>💎 Premium Yükleniyor...</div>}>

                <PremiumModal

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    username={username}

                    onClose={() => closeModal('premium')}

                />

            </Suspense>

        )}


        {/* 🎵 41. Music Player */}

        {modals.musicPlayer && (

            <Suspense fallback={<div>🎵 Müzik Yükleniyor...</div>}>

                <MusicPlayer

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    roomSlug={activeChat?.slug}

                    onClose={() => closeModal('musicPlayer')}

                />

            </Suspense>

        )}


        {/* 🤖 42. Bot Marketplace */}

        {modals.botMarketplace && (

            <Suspense fallback={<div>🤖 Bot Mağazası Yükleniyor...</div>}>

                <BotMarketplace

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat?.server_id}

                    onClose={() => closeModal('botMarketplace')}

                />

            </Suspense>

        )}


        {/* 👤 43. Profile Customization */}

        {modals.profileCustomization && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <ProfileCustomization

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    currentUser={currentUserProfile}

                    onClose={() => closeModal('profileCustomization')}

                    onProfileUpdate={(updated) => setCurrentUserProfile(updated)}

                />

            </Suspense>

        )}


        {/* 🔗 44. Integration Hub */}

        {modals.integrationHub && (

            <Suspense fallback={<div>🔗 Entegrasyonlar Yükleniyor...</div>}>

                <IntegrationHubPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('integrationHub')}

                />

            </Suspense>

        )}


        {/* 🏆 45. Tournaments */}

        {modals.tournaments && activeChat?.type === 'room' && activeChat.server_id && (

            <Suspense fallback={<div>🏆 Turnuvalar Yükleniyor...</div>}>

                <TournamentSystem

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat.server_id}

                    currentUser={username}

                    onClose={() => closeModal('tournaments')}

                />

            </Suspense>

        )}


        {/* 💡 46. Highlights */}

        {modals.highlights && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <HighlightsPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('highlights')}

                />

            </Suspense>

        )}


        {/* 📦 47. Custom Embed */}

        {modals.customEmbed && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <CustomEmbedPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    roomSlug={activeChat?.slug}

                    onClose={() => closeModal('customEmbed')}

                />

            </Suspense>

        )}


        {/* 🎵 48. Spotify Integration */}

        {modals.spotifyIntegration && (

            <Suspense fallback={<div>🎵 Spotify Yükleniyor...</div>}>

                <SpotifyIntegrationPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('spotifyIntegration')}

                />

            </Suspense>

        )}


        {/* 📋 49. Server Clone */}

        {modals.serverClone && activeChat?.type === 'room' && activeChat.server_id && (

            <Suspense fallback={<div>Yükleniyor...</div>}>

                <ServerClonePanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat.server_id}

                    onClose={() => closeModal('serverClone')}

                />

            </Suspense>

        )}


        {/* 🎯 50. Weekly Challenges */}

        {modals.weeklyChallenges && (

            <Suspense fallback={<div>🎯 Haftalık Görevler Yükleniyor...</div>}>

                <WeeklyChallengesPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    username={username}

                    onClose={() => closeModal('weeklyChallenges')}

                />

            </Suspense>

        )}


        {/* ═══════════════════════════════════════════════════════════════ */}

        {/* 🔥 BATCH 11: 50 More Essential Features (2026-02-02)          */}

        {/* ═══════════════════════════════════════════════════════════════ */}


        {/* 🛡️ 1. Moderator Tools */}

        {modals.moderatorTools && (

            <Suspense fallback={<div>🛡️ Moderasyon Araçları Yükleniyor...</div>}>

                <ModeratorTools

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat?.server_id}

                    roomSlug={activeChat?.slug}

                    onClose={() => closeModal('moderatorTools')}

                />

            </Suspense>

        )}


        {/* 🤖 2. AI Moderation */}

        {modals.aIModeration && (

            <Suspense fallback={<div>🤖 AI Moderasyon Yükleniyor...</div>}>

                <AIModerationPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat?.server_id}

                    onClose={() => closeModal('aIModeration')}

                />

            </Suspense>

        )}


        {/* 🚫 3. Spam Detection */}

        {modals.spamDetection && (

            <Suspense fallback={<div>🚫 Spam Koruması Yükleniyor...</div>}>

                <SpamDetectionPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat?.server_id}

                    onClose={() => closeModal('spamDetection')}

                />

            </Suspense>

        )}


        {/* 📋 4. Audit Logs */}

        {modals.auditLogs && (

            <Suspense fallback={<div>📋 Denetim Kayıtları Yükleniyor...</div>}>

                <AuditLogsPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat?.server_id}

                    onClose={() => closeModal('auditLogs')}

                />

            </Suspense>

        )}


        {/* ⛔ 5. Ban History */}

        {modals.banHistory && (

            <Suspense fallback={<div>⛔ Ban Geçmişi Yükleniyor...</div>}>

                <BanHistoryPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat?.server_id}

                    onClose={() => closeModal('banHistory')}

                />

            </Suspense>

        )}


        {/* 📜 6. Moderation Logs */}

        {modals.moderationLogs && (

            <Suspense fallback={<div>📜 Moderasyon Logları Yükleniyor...</div>}>

                <ModerationLogsPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat?.server_id}

                    onClose={() => closeModal('moderationLogs')}

                />

            </Suspense>

        )}


        {/*  8. Security Alerts */}

        {modals.securityAlerts && (

            <Suspense fallback={<div>🚨 Güvenlik Uyarıları Yükleniyor...</div>}>

                <SecurityAlertsPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('securityAlerts')}

                />

            </Suspense>

        )}


        {/* 🎞️ 10. GIF Picker */}

        {modals.gIFPicker && (

            <Suspense fallback={<div>🎞️ GIF Seçici Yükleniyor...</div>}>

                <GIFPickerPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onSelect={(gif) => { /* handle gif insert */ closeModal('gIFPicker'); }}

                    onClose={() => closeModal('gIFPicker')}

                />

            </Suspense>

        )}


        {/* 📊 11. Poll Creator */}

        {modals.pollCreator && (

            <Suspense fallback={<div>📊 Anket Oluşturucu Yükleniyor...</div>}>

                <PollCreator

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    roomSlug={activeChat?.slug}

                    onClose={() => closeModal('pollCreator')}

                />

            </Suspense>

        )}


        {/* 🎨 12. Stickers */}

        {modals.stickers && (

            <Suspense fallback={<div>🎨 Çıkartmalar Yükleniyor...</div>}>

                <StickersPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onSelect={(sticker) => { /* handle sticker insert */ closeModal('stickers'); }}

                    onClose={() => closeModal('stickers')}

                />

            </Suspense>

        )}


        {/* 💾 13. Saved Messages */}

        {modals.savedMessages && (

            <Suspense fallback={<div>💾 Kayıtlı Mesajlar Yükleniyor...</div>}>

                <SavedMessagesModal

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    username={username}

                    onClose={() => closeModal('savedMessages')}

                />

            </Suspense>

        )}


        {/* 🔔 14. Notifications Center */}

        {modals.notificationsCenter && (

            <Suspense fallback={<div>🔔 Bildirimler Yükleniyor...</div>}>

                <NotificationsCenter

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    username={username}

                    onClose={() => closeModal('notificationsCenter')}

                />

            </Suspense>

        )}


        {/* 📝 15. Message Summary */}

        {modals.messageSummary && (

            <Suspense fallback={<div>📝 Özet Yükleniyor...</div>}>

                <MessageSummaryPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    roomSlug={activeChat?.slug}

                    onClose={() => closeModal('messageSummary')}

                />

            </Suspense>

        )}


        {/* 🌍 16. Translation */}

        {modals.translation && (

            <Suspense fallback={<div>🌍 Çeviri Yükleniyor...</div>}>

                <TranslationPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('translation')}

                />

            </Suspense>

        )}


        {/* ⚙️ 17. Channel Settings */}

        {modals.channelSettings && activeChat?.type === 'room' && (

            <Suspense fallback={<div>⚙️ Kanal Ayarları Yükleniyor...</div>}>

                <ChannelSettingsModal

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    roomSlug={activeChat.slug}

                    serverId={activeChat.server_id}

                    onClose={() => closeModal('channelSettings')}

                />

            </Suspense>

        )}


        {/* 📨 18. Invite Modal */}

        {modals.inviteModal && activeChat?.type === 'room' && (

            <Suspense fallback={<div>📨 Davet Yükleniyor...</div>}>

                <InviteModal

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={API_BASE_URL}

                    server={(() => {

                        for (const srv of (categories || [])) {

                            for (const cat of (srv.categories || [])) {

                                if (cat.rooms?.some(r => r.slug === activeChat.id)) {

                                    return { id: srv.id, name: srv.name, avatar: srv.avatar };

                                }

                            }

                        }

                        return { id: activeChat.server_id, name: 'Sunucu' };

                    })()}

                    currentUser={username}

                    onClose={() => closeModal('inviteModal')}

                />

            </Suspense>

        )}


        {/* 📋 19. Server Templates */}

        {modals.serverTemplates && (

            <Suspense fallback={<div>📋 Şablonlar Yükleniyor...</div>}>

                <ServerTemplates

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('serverTemplates')}

                />

            </Suspense>

        )}


        {/* 📊 20. Server Analytics */}

        {modals.serverAnalytics && (

            <Suspense fallback={<div>📊 Analitik Yükleniyor...</div>}>

                <ServerAnalyticsDashboard

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat?.server_id}

                    onClose={() => closeModal('serverAnalytics')}

                />

            </Suspense>

        )}


        {/* 👑 21. Roles Manager */}

        {modals.rolesManager && activeChat?.type === 'room' && (

            <Suspense fallback={<div>👑 Rol Yöneticisi Yükleniyor...</div>}>

                <RolesManager

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat.server_id}

                    onClose={() => closeModal('rolesManager')}

                />

            </Suspense>

        )}


        {/* 👋 22. Welcome Screen Editor */}

        {modals.welcomeScreenEditor && (

            <Suspense fallback={<div>👋 Karşılama Ekranı Yükleniyor...</div>}>

                <WelcomeScreenEditor

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat?.server_id}

                    onClose={() => closeModal('welcomeScreenEditor')}

                />

            </Suspense>

        )}


        {/* 🏘️ 23. Community Settings */}

        {modals.communitySettings && (

            <Suspense fallback={<div>🏘️ Topluluk Ayarları Yükleniyor...</div>}>

                <CommunitySettingsPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat?.server_id}

                    onClose={() => closeModal('communitySettings')}

                />

            </Suspense>

        )}


        {/* 🔗 24. Invite Link Manager */}

        {modals.inviteLinkManager && (

            <Suspense fallback={<div>🔗 Davet Linkleri Yükleniyor...</div>}>

                <InviteLinkManager

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat?.server_id}

                    onClose={() => closeModal('inviteLinkManager')}

                />

            </Suspense>

        )}


        {/* 🤖 25. Bot Builder */}

        {modals.botBuilder && (

            <Suspense fallback={<div>🤖 Bot Oluşturucu Yükleniyor...</div>}>

                <BotBuilder

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('botBuilder')}

                />

            </Suspense>

        )}


        {/* 🧑‍💻 26. Bot Developer Portal */}

        {modals.botDevPortal && (

            <Suspense fallback={<div>🧑‍💻 Geliştirici Portalı Yükleniyor...</div>}>

                <BotDeveloperPortal

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('botDevPortal')}

                />

            </Suspense>

        )}


        {/* 🔗 27. Webhook Manager */}

        {modals.webhookManager && (

            <Suspense fallback={<div>🔗 Webhook Yöneticisi Yükleniyor...</div>}>

                <WebhookManager

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat?.server_id}

                    onClose={() => closeModal('webhookManager')}

                />

            </Suspense>

        )}


        {/* 🔑 28. API Keys */}

        {modals.aPIKeys && (

            <Suspense fallback={<div>🔑 API Anahtarları Yükleniyor...</div>}>

                <APIKeysPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('aPIKeys')}

                />

            </Suspense>

        )}


        {/* ⚡ 29. Slash Commands */}

        {modals.slashCommands && (

            <Suspense fallback={<div>⚡ Komut Yöneticisi Yükleniyor...</div>}>

                <SlashCommandsPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat?.server_id}

                    onClose={() => closeModal('slashCommands')}

                />

            </Suspense>

        )}


        {/* 💻 30. Code Runner */}

        {modals.codeRunner && (

            <Suspense fallback={<div>💻 Kod Çalıştırıcı Yükleniyor...</div>}>

                <CodeRunnerPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('codeRunner')}

                />

            </Suspense>

        )}


        {/* 👤 31. Profile Card */}

        {modals.profileCard && (

            <Suspense fallback={<div>👤 Profil Kartı Yükleniyor...</div>}>

                <ProfileCard

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    username={username}

                    currentUser={currentUserProfile}

                    onClose={() => closeModal('profileCard')}

                />

            </Suspense>

        )}


        {/* 📝 32. User Notes */}

        {modals.userNotes && (

            <Suspense fallback={<div>📝 Notlar Yükleniyor...</div>}>

                <UserNotesModal

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    username={username}

                    onClose={() => closeModal('userNotes')}

                />

            </Suspense>

        )}


        {/* 🟢 33. Status Picker */}

        {modals.statusPicker && (

            <Suspense fallback={<div>🟢 Durum Seçici Yükleniyor...</div>}>

                <StatusPicker

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    currentUser={currentUserProfile}

                    onClose={() => closeModal('statusPicker')}

                />

            </Suspense>

        )}


        {/* 👥 34. Mutuals Panel */}

        {modals.mutuals && (

            <Suspense fallback={<div>👥 Ortak Arkadaşlar Yükleniyor...</div>}>

                <MutualsPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    username={username}

                    onClose={() => closeModal('mutuals')}

                />

            </Suspense>

        )}


        {/* 🏅 35. Profile Showcase */}

        {modals.profileShowcase && (

            <Suspense fallback={<div>🏅 Profil Vitrini Yükleniyor...</div>}>

                <ProfileShowcasePanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    username={username}

                    currentUser={currentUserProfile}

                    onClose={() => closeModal('profileShowcase')}

                />

            </Suspense>

        )}


        {/* 📱 36. Session Manager */}

        {modals.sessionManager && (

            <Suspense fallback={<div>📱 Oturum Yöneticisi Yükleniyor...</div>}>

                <SessionManagerModal

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('sessionManager')}

                />

            </Suspense>

        )}


        {/* 🪙 37. Coin Store */}

        {modals.coinStore && (

            <Suspense fallback={<div>🪙 Mağaza Yükleniyor...</div>}>

                <CoinStoreModal

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    username={username}

                    onClose={() => closeModal('coinStore')}

                />

            </Suspense>

        )}


        {/* 💎 38. Premium Management */}

        {modals.premiumManagement && (

            <Suspense fallback={<div>💎 Premium Yönetimi Yükleniyor...</div>}>

                <PremiumManagementPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    username={username}

                    onClose={() => closeModal('premiumManagement')}

                />

            </Suspense>

        )}


        {/* 📋 39. Subscription Manager */}

        {modals.subscriptionManager && (

            <Suspense fallback={<div>📋 Abonelikler Yükleniyor...</div>}>

                <SubscriptionManager

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    username={username}

                    onClose={() => closeModal('subscriptionManager')}

                />

            </Suspense>

        )}


        {/* 🎁 40. Gift Premium */}

        {modals.giftPremium && (

            <Suspense fallback={<div>🎁 Hediye Premium Yükleniyor...</div>}>

                <GiftPremiumPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    username={username}

                    onClose={() => closeModal('giftPremium')}

                />

            </Suspense>

        )}


        {/* 🛒 41. Premium Marketplace */}

        {modals.premiumMarketplace && (

            <Suspense fallback={<div>🛒 Premium Mağaza Yükleniyor...</div>}>

                <PremiumMarketplace

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('premiumMarketplace')}

                />

            </Suspense>

        )}


        {/* 🎨 42. Theme Marketplace */}

        {modals.themeMarketplace && (

            <Suspense fallback={<div>🎨 Tema Mağazası Yükleniyor...</div>}>

                <ThemeMarketplace

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('themeMarketplace')}

                />

            </Suspense>

        )}


        {/* 🤖 43. AI Chatbot */}

        {modals.aIChatbot && (

            <Suspense fallback={<div>🤖 AI Chatbot Yükleniyor...</div>}>

                <AIChatbotPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    username={username}

                    onClose={() => closeModal('aIChatbot')}

                />

            </Suspense>

        )}


        {/* 👨‍💻 44. Collaborative Code Editor */}

        {modals.codeEditor && (

            <Suspense fallback={<div>👨‍💻 Kod Editörü Yükleniyor...</div>}>

                <CollaborativeCodeEditor

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    roomSlug={activeChat?.slug}

                    username={username}

                    onClose={() => closeModal('codeEditor')}

                />

            </Suspense>

        )}


        {/* 🖥️ 45. Screen Share */}

        {modals.screenShare && (

            <Suspense fallback={<div>🖥️ Ekran Paylaşımı Yükleniyor...</div>}>

                <ScreenShareModal

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    roomSlug={activeChat?.slug}

                    onClose={() => closeModal('screenShare')}

                />

            </Suspense>

        )}


        {/* 📺 46. Live Stream Modal */}

        {modals.liveStreamModal && (

            <Suspense fallback={<div>📺 Canlı Yayın Yükleniyor...</div>}>

                <LiveStreamModal

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    roomSlug={activeChat?.slug}

                    username={username}

                    onClose={() => closeModal('liveStreamModal')}

                />

            </Suspense>

        )}


        {/* 📈 47. Advanced Analytics */}

        {modals.advancedAnalytics && (

            <Suspense fallback={<div>📈 Gelişmiş Analitik Yükleniyor...</div>}>

                <AdvancedAnalyticsDashboard

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat?.server_id}

                    onClose={() => closeModal('advancedAnalytics')}

                />

            </Suspense>

        )}


        {/* 📁 48. File Manager */}

        {modals.fileManager && (

            <Suspense fallback={<div>📁 Dosya Yöneticisi Yükleniyor...</div>}>

                <FileManagerPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    roomSlug={activeChat?.slug}

                    onClose={() => closeModal('fileManager')}

                />

            </Suspense>

        )}


        {/* 📊 49. Reports */}

        {modals.reports && (

            <Suspense fallback={<div>📊 Raporlar Yükleniyor...</div>}>

                <ReportsPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    serverId={activeChat?.server_id}

                    onClose={() => closeModal('reports')}

                />

            </Suspense>

        )}


        {/* 🐛 50. Error Reporting */}

        {modals.errorReporting && (

            <Suspense fallback={<div>🐛 Hata Raporlama Yükleniyor...</div>}>

                <ErrorReportingPanel

                    fetchWithAuth={fetchWithAuth}

                    apiBaseUrl={ABSOLUTE_HOST_URL}

                    onClose={() => closeModal('errorReporting')}

                />

            </Suspense>

        )}


        {/* 🚀 FEATURE HUB - Mega Menu (All Features Access Point) */}

        {modals.featureHub && <FeatureHubModal />}


        {/* --- STANDART MODALLAR --- */}

        {zoomedImage && <Suspense fallback={null}><ImageLightbox imageUrl={zoomedImage} onClose={() => setZoomedImage(null)} /></Suspense>}

        {galleryData && <Suspense fallback={null}><ImageLightbox images={galleryData.images} startIndex={galleryData.startIndex} onClose={() => setGalleryData(null)} /></Suspense>}

        {modals.pinned && <Suspense fallback={<LoadingSpinner size="small" text="Sabitlenmiş mesajlar yükleniyor..." />}><PinnedMessages messages={pinnedMessages} onClose={() => closeModal('pinned')} /></Suspense>}

        {viewingProfile && <Suspense fallback={null}><UserProfileModal user={viewingProfile} onClose={() => setViewingProfile(null)} onStartDM={handleDMClick} onImageClick={setZoomedImage} getDeterministicAvatar={getDeterministicAvatar} fetchWithAuth={fetchWithAuth} apiBaseUrl={ABSOLUTE_HOST_URL} currentUser={username} friendsList={friendsList} /></Suspense>}


            {/* ✨ THEME STORE MODAL */}

            {modals.themeStore && (

                <Suspense fallback={<LoadingSpinner size="medium" text="Temalar yükleniyor..." />}>

                    <ThemeStoreModal

                        onClose={() => closeModal('themeStore')}

                        currentTheme={currentTheme}

                        onThemeChange={setCurrentTheme}

                    />

                </Suspense>

            )}


            {modals.summary && (

                <Suspense fallback={<LoadingSpinner size="medium" text="Özet hazırlanıyor..." />}>

                    <SummaryModal

                        roomSlug={activeChat.id}

                        onClose={() => closeModal('summary')}

                        fetchWithAuth={fetchWithAuth}

                        apiBaseUrl={ABSOLUTE_HOST_URL}

                    />

                </Suspense>

            )}


            {modals.templateModal && (

                <Suspense fallback={<LoadingSpinner size="small" text="Şablonlar yükleniyor..." />}>

                    <MessageTemplateModal

                        onClose={() => closeModal('templateModal')}

                        onSelect={(content) => {

                            richTextRef.current?.appendText?.(content);

                            closeModal('templateModal');

                        }}

                        fetchWithAuth={fetchWithAuth}

                        apiBaseUrl={ABSOLUTE_HOST_URL}

                        isAdmin={isAdmin}

                    />

                </Suspense>

        </>
    );
};

export default AppModals;
