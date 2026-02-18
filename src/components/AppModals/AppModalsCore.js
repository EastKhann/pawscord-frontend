import React, { Suspense, useCallback, useMemo } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import {
    ABSOLUTE_HOST_URL, API_BASE_URL, WS_PROTOCOL, API_HOST,
    LOCAL_GIF_LIST_URL, UPDATE_PROFILE_URL, CHANGE_USERNAME_URL
} from '../../config/api';

// Lazy imports for Core modals
const CinemaModal = React.lazy(() => import('../../CinemaModal'));
const CryptoChartModal = React.lazy(() => import('../../CryptoChartModal'));
const GifPicker = React.lazy(() => import('../../GifPicker'));
const StickerPicker = React.lazy(() => import('../../StickerPicker'));
const UserProfilePanel = React.lazy(() => import('../../UserProfilePanel'));
const AdminAnalyticsPanel = React.lazy(() => import('../AdminAnalyticsPanel'));
const AdminPanelModal = React.lazy(() => import('../AdminPanelModal'));
const APIUsagePanel = React.lazy(() => import('../APIUsagePanel'));
const AutoModerationDashboard = React.lazy(() => import('../AutoModerationDashboard'));
const AuditLogPanel = React.lazy(() => import('../AuditLogPanel'));
const BookmarkPanel = React.lazy(() => import('../BookmarkPanel'));
const ChannelPermissionsPanel = React.lazy(() => import('../ChannelPermissionsPanel'));
const CodeSnippetModal = React.lazy(() => import('../CodeSnippetModal'));
const ConnectionsPanel = React.lazy(() => import('../ConnectionsPanel'));
const CreateGroupModal = React.lazy(() => import('../CreateGroupModal'));
const CustomStatusModal = React.lazy(() => import('../CustomStatusModal'));
const DJModal = React.lazy(() => import('../DJModal'));
const DailyRewardsModal = React.lazy(() => import('../DailyRewardsModal'));
const DownloadModal = React.lazy(() => import('../DownloadModal'));
const EncryptionKeyModal = React.lazy(() => import('../EncryptionKeyModal'));
const ExportJobsPanel = React.lazy(() => import('../ExportJobsPanel'));
const MentionsInboxPanel = React.lazy(() => import('../MentionsInboxPanel'));
const PasswordSetupModal = React.lazy(() => import('../PasswordSetupModal'));
const PaymentPanel = React.lazy(() => import('../PaymentPanel'));
const PollCreateModal = React.lazy(() => import('../PollCreateModal'));
const PremiumStoreModal = React.lazy(() => import('../PremiumStoreModal'));
const RaidProtectionPanel = React.lazy(() => import('../RaidProtectionPanel'));
const ReadLaterPanel = React.lazy(() => import('../ReadLaterPanel'));
const ReportSystemPanel = React.lazy(() => import('../ReportSystemPanel'));
const ScheduledAnnouncementsPanel = React.lazy(() => import('../ScheduledAnnouncementsPanel'));
const ServerSettingsModal = React.lazy(() => import('../ServerSettingsModal'));
const SoundboardModal = React.lazy(() => import('../SoundboardModal'));
const StoreModal = React.lazy(() => import('../StoreModal'));
const UserWarningsPanel = React.lazy(() => import('../UserWarningsPanel'));
const VanityURLManager = React.lazy(() => import('../VanityURLManager'));
const WebhooksPanel = React.lazy(() => import('../WebhooksPanel'));
const WhiteboardModal = React.lazy(() => import('../WhiteboardModal'));

/**
 * AppModalsCore — Core/initial modals and inline modals
 * Handles: profile, store, admin, moderation, inline tools (chart, cinema, snippets, etc.)
 */
const AppModalsCore = ({
    modals, openModal, closeModal,
    fetchWithAuth, activeChat, username, sendMessage, sendSignal, ws,
    currentUserProfile, setCurrentUserProfile,
    soundSettings, setSoundSettings,
    encryptionKeys, currentKeyId, setEncryptionKey,
    chartSymbol, setChartSymbol,
    serverToEdit, setServerToEdit, serverMembers,
    friendsList, conversations,
    zoomedImage, setZoomedImage,
    logout, getDeterministicAvatar,
    handleSendSnippet, setActiveChat, setConversations,
}) => {
    // Memoize close handlers for frequently used modals
    const closeProfilePanel = useCallback(() => closeModal('profilePanel'), [closeModal]);
    const closeStore = useCallback(() => closeModal('store'), [closeModal]);
    const closeAnalytics = useCallback(() => closeModal('analytics'), [closeModal]);
    const closeAdminPanel = useCallback(() => closeModal('adminPanel'), [closeModal]);
    const openAnalytics = useCallback(() => openModal('analytics'), [openModal]);
    const openWebhooks = useCallback(() => openModal('webhooks'), [openModal]);
    const openModTools = useCallback(() => openModal('modTools'), [openModal]);
    const openAuditLogs = useCallback(() => openModal('auditLog'), [openModal]);
    const openReports = useCallback(() => openModal('reportSystem'), [openModal]);
    const openVanityURL = useCallback(() => openModal('vanityURL'), [openModal]);
    const openAutoResponder = useCallback(() => openModal('autoResponder'), [openModal]);
    const closePaymentPanel = useCallback(() => closeModal('paymentPanel'), [closeModal]);
    const closeStoreModal = useCallback(() => closeModal('storeModal'), [closeModal]);
    const closeDailyRewards = useCallback(() => closeModal('dailyRewards'), [closeModal]);
    const closeAPIUsagePanel = useCallback(() => closeModal('aPIUsagePanel'), [closeModal]);
    const closeExportJobsPanel = useCallback(() => closeModal('exportJobsPanel'), [closeModal]);
    const closeScheduledAnnouncements = useCallback(() => closeModal('scheduledAnnouncements'), [closeModal]);
    const closeConnectionsPanel = useCallback(() => closeModal('connectionsPanel'), [closeModal]);
    const closePasswordSetupModal = useCallback(() => closeModal('passwordSetupModal'), [closeModal]);
    const closeAutoModeration = useCallback(() => closeModal('autoModeration'), [closeModal]);
    const closeRaidProtection = useCallback(() => closeModal('raidProtection'), [closeModal]);
    const closeReportSystem = useCallback(() => closeModal('reportSystem'), [closeModal]);
    const closeAuditLog = useCallback(() => closeModal('auditLog'), [closeModal]);
    const closeUserWarnings = useCallback(() => closeModal('userWarnings'), [closeModal]);
    const closeWebhooks = useCallback(() => closeModal('webhooks'), [closeModal]);
    const closeVanityURL = useCallback(() => closeModal('vanityURL'), [closeModal]);
    const closeBookmarks = useCallback(() => closeModal('bookmarks'), [closeModal]);
    const closeReadLater = useCallback(() => closeModal('readLater'), [closeModal]);
    const closeMentionsInbox = useCallback(() => closeModal('mentionsInbox'), [closeModal]);
    const closeCustomStatus = useCallback(() => closeModal('customStatus'), [closeModal]);
    const closeChannelPermissions = useCallback(() => closeModal('channelPermissions'), [closeModal]);
    const closeCinema = useCallback(() => closeModal('cinema'), [closeModal]);
    const closeSnippetModal = useCallback(() => closeModal('snippetModal'), [closeModal]);
    const closeEncModal = useCallback(() => closeModal('encModal'), [closeModal]);
    const closeDownloadModal = useCallback(() => closeModal('downloadModal'), [closeModal]);
    const closeGroupModal = useCallback(() => closeModal('groupModal'), [closeModal]);
    const closeWhiteboard = useCallback(() => closeModal('whiteboard'), [closeModal]);
    const closeSoundboard = useCallback(() => closeModal('soundboard'), [closeModal]);
    const closeDJ = useCallback(() => closeModal('dJ'), [closeModal]);
    const closeGifPicker = useCallback(() => closeModal('gifPicker'), [closeModal]);
    const closeStickerPicker = useCallback(() => closeModal('stickerPicker'), [closeModal]);
    const closePollModal = useCallback(() => closeModal('pollModal'), [closeModal]);
    const clearChartSymbol = useCallback(() => setChartSymbol(null), [setChartSymbol]);
    const clearServerToEdit = useCallback(() => setServerToEdit(null), [setServerToEdit]);

    const handleBookmarkMessageClick = useCallback((msg) => {
        if (msg.room) {
            setActiveChat({ type: 'room', slug: msg.room });
        }
        closeModal('bookmarks');
    }, [setActiveChat, closeModal]);

    const handleReadLaterMessageClick = useCallback((msg) => {
        if (msg.room) {
            setActiveChat({ type: 'room', slug: msg.room });
        } else if (msg.conversation) {
            setActiveChat({ type: 'dm', slug: msg.conversation });
        }
        closeModal('readLater');
    }, [setActiveChat, closeModal]);

    const handleMentionNavigate = useCallback((msg) => {
        if (msg.room_id) {
            setActiveChat({ type: 'room', id: msg.room_id });
        }
        closeModal('mentionsInbox');
    }, [setActiveChat, closeModal]);

    const handleStatusChange = useCallback((status) => {
        if (currentUserProfile) {
            setCurrentUserProfile(prev => ({ ...prev, customStatus: status }));
        }
    }, [currentUserProfile, setCurrentUserProfile]);

    const handleSetEncKey = useCallback((key) => setEncryptionKey(currentKeyId, key), [setEncryptionKey, currentKeyId]);

    const handleGroupCreated = useCallback((newConv) => {
        setConversations(prev => [newConv, ...prev]);
        setActiveChat('dm', newConv.id, 'Grup Sohbeti');
    }, [setConversations, setActiveChat]);

    const handleGifSelect = useCallback((url) => {
        const full = url.startsWith('http') ? url : ABSOLUTE_HOST_URL + url;
        sendMessage(full);
        closeModal('gifPicker');
    }, [sendMessage, closeModal]);

    const handleStickerSelect = useCallback((url) => {
        sendMessage(url);
        closeModal('stickerPicker');
    }, [sendMessage, closeModal]);

    const whiteboardRoomSlug = useMemo(() =>
        activeChat?.type === 'room' ? activeChat.id : `dm_${activeChat?.id}`,
        [activeChat?.type, activeChat?.id]);

    const serverId = useMemo(() =>
        activeChat?.type === 'room' ? activeChat.server_id : null,
        [activeChat?.type, activeChat?.server_id]);

    return (
        <>
            <Suspense fallback={<LoadingSpinner size="medium" text="Modal yükleniyor..." />}>
                {modals.profilePanel && <UserProfilePanel user={currentUserProfile} onClose={closeProfilePanel} onProfileUpdate={(updatedUser) => setCurrentUserProfile(updatedUser)} onLogout={logout} fetchWithAuth={fetchWithAuth} getDeterministicAvatar={getDeterministicAvatar} updateProfileUrl={UPDATE_PROFILE_URL} changeUsernameUrl={CHANGE_USERNAME_URL} soundSettings={soundSettings} onUpdateSoundSettings={setSoundSettings} onImageClick={setZoomedImage} apiBaseUrl={ABSOLUTE_HOST_URL} />}
                {modals.store && <PremiumStoreModal onClose={closeStore} />}
                {modals.analytics && <AdminAnalyticsPanel onClose={closeAnalytics} fetchWithAuth={fetchWithAuth} apiBaseUrl={ABSOLUTE_HOST_URL} />}
                {modals.adminPanel && (
                    <AdminPanelModal
                        onClose={closeAdminPanel}
                        onOpenAnalytics={openAnalytics}
                        onOpenWebhooks={openWebhooks}
                        onOpenModTools={openModTools}
                        onOpenAuditLogs={openAuditLogs}
                        onOpenReports={openReports}
                        onOpenVanityURL={openVanityURL}
                        onOpenAutoResponder={openAutoResponder}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                    />
                )}
                {modals.paymentPanel && (
                    <PaymentPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closePaymentPanel}
                        username={username}
                    />
                )}
                {modals.storeModal && (
                    <StoreModal
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeStoreModal}
                        username={username}
                    />
                )}
                {modals.dailyRewards && (
                    <DailyRewardsModal
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeDailyRewards}
                        username={username}
                    />
                )}
                {modals.aPIUsagePanel && (
                    <APIUsagePanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeAPIUsagePanel}
                        username={username}
                    />
                )}
                {modals.exportJobsPanel && (
                    <ExportJobsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeExportJobsPanel}
                        username={username}
                    />
                )}
                {modals.scheduledAnnouncements && (
                    <ScheduledAnnouncementsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeScheduledAnnouncements}
                        serverId={serverId}
                    />
                )}
                {modals.connectionsPanel && (
                    <ConnectionsPanel
                        onClose={closeConnectionsPanel}
                    />
                )}
                {modals.passwordSetupModal && (
                    <PasswordSetupModal
                        onClose={closePasswordSetupModal}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                    />
                )}
                {/* 🛡️ MODERATION PANELS */}
                {modals.autoModeration && (
                    <AutoModerationDashboard
                        serverId={serverId}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeAutoModeration}
                    />
                )}
                {modals.raidProtection && (
                    <RaidProtectionPanel
                        serverId={serverId}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeRaidProtection}
                    />
                )}
                {modals.reportSystem && (
                    <ReportSystemPanel
                        serverId={serverId}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeReportSystem}
                    />
                )}
                {modals.auditLog && (
                    <AuditLogPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeAuditLog}
                    />
                )}
                {modals.userWarnings && (
                    <UserWarningsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeUserWarnings}
                    />
                )}
                {modals.webhooks && (
                    <WebhooksPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        serverId={serverId}
                        onClose={closeWebhooks}
                    />
                )}
                {modals.vanityURL && activeChat?.type === 'room' && activeChat.server_id && (
                    <VanityURLManager
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        serverId={activeChat.server_id}
                        onClose={closeVanityURL}
                    />
                )}
                {modals.bookmarks && (
                    <BookmarkPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeBookmarks}
                        onMessageClick={handleBookmarkMessageClick}
                    />
                )}
                {modals.readLater && (
                    <Suspense fallback={<div>Yükleniyor...</div>}>
                        <ReadLaterPanel
                            fetchWithAuth={fetchWithAuth}
                            apiBaseUrl={ABSOLUTE_HOST_URL}
                            onClose={closeReadLater}
                            onMessageClick={handleReadLaterMessageClick}
                        />
                    </Suspense>
                )}
                {modals.mentionsInbox && (
                    <Suspense fallback={<div>Yükleniyor...</div>}>
                        <MentionsInboxPanel
                            isOpen={modals.mentionsInbox}
                            onClose={closeMentionsInbox}
                            currentUsername={currentUserProfile?.username || username}
                            onNavigateToMessage={handleMentionNavigate}
                        />
                    </Suspense>
                )}
                {modals.customStatus && (
                    <Suspense fallback={<div>Yükleniyor...</div>}>
                        <CustomStatusModal
                            isOpen={modals.customStatus}
                            onClose={closeCustomStatus}
                            onStatusChange={handleStatusChange}
                        />
                    </Suspense>
                )}
                {modals.channelPermissions && activeChat?.type === 'room' && (
                    <Suspense fallback={<div>Yükleniyor...</div>}>
                        <ChannelPermissionsPanel
                            fetchWithAuth={fetchWithAuth}
                            apiBaseUrl={ABSOLUTE_HOST_URL}
                            channelSlug={activeChat.slug}
                            onClose={closeChannelPermissions}
                        />
                    </Suspense>
                )}
                {/* Inline modals */}
                {chartSymbol && <CryptoChartModal symbol={chartSymbol} onClose={clearChartSymbol} />}
                {modals.cinema && <CinemaModal onClose={closeCinema} ws={ws} username={username} />}
                {modals.snippetModal && <CodeSnippetModal onClose={closeSnippetModal} onSend={handleSendSnippet} />}
                {serverToEdit && <ServerSettingsModal onClose={clearServerToEdit} server={serverToEdit} currentUsername={username} fetchWithAuth={fetchWithAuth} apiBaseUrl={API_BASE_URL} serverMembers={serverMembers} />}
                {modals.encModal && <EncryptionKeyModal onClose={closeEncModal} onSetKey={handleSetEncKey} existingKey={encryptionKeys[currentKeyId]} />}
                {modals.downloadModal && <DownloadModal onClose={closeDownloadModal} apiBaseUrl={ABSOLUTE_HOST_URL} />}
                {modals.groupModal && <CreateGroupModal onClose={closeGroupModal} friendsList={friendsList} fetchWithAuth={fetchWithAuth} apiBaseUrl={ABSOLUTE_HOST_URL} onGroupCreated={handleGroupCreated} />}
                {modals.whiteboard && (activeChat.type === 'room' || activeChat.type === 'dm') && (
                    <WhiteboardModal roomSlug={whiteboardRoomSlug} onClose={closeWhiteboard} wsProtocol={WS_PROTOCOL} apiHost={API_HOST} />
                )}
                {modals.soundboard && <SoundboardModal onClose={closeSoundboard} fetchWithAuth={fetchWithAuth} apiBaseUrl={ABSOLUTE_HOST_URL} sendSignal={sendSignal} absoluteHostUrl={ABSOLUTE_HOST_URL} />}
                {modals.dJ && <DJModal onClose={closeDJ} ws={ws} roomSlug={activeChat.id} />}
                {modals.gifPicker && <GifPicker onSelect={handleGifSelect} onClose={closeGifPicker} localGifListUrl={LOCAL_GIF_LIST_URL} absoluteHostUrl={ABSOLUTE_HOST_URL} fetchWithAuth={fetchWithAuth} />}
                {modals.stickerPicker && <StickerPicker onClose={closeStickerPicker} onSelect={handleStickerSelect} fetchWithAuth={fetchWithAuth} apiBaseUrl={ABSOLUTE_HOST_URL} />}
                {modals.pollModal && <PollCreateModal onClose={closePollModal} fetchWithAuth={fetchWithAuth} apiBaseUrl={ABSOLUTE_HOST_URL} activeRoomSlug={activeChat.id} />}
            </Suspense>
        </>
    );
};

export default React.memo(AppModalsCore);
