import React, { Suspense } from 'react';
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
    return (
        <>
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
                {modals.connectionsPanel && (
                    <ConnectionsPanel
                        onClose={() => closeModal('connectionsPanel')}
                    />
                )}
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
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={() => closeModal('auditLog')}
                    />
                )}
                {modals.userWarnings && (
                    <UserWarningsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={() => closeModal('userWarnings')}
                    />
                )}
                {modals.webhooks && (
                    <WebhooksPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        serverId={activeChat?.type === 'room' ? activeChat.server_id : null}
                        onClose={() => closeModal('webhooks')}
                    />
                )}
                {modals.vanityURL && activeChat?.type === 'room' && activeChat.server_id && (
                    <VanityURLManager
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        serverId={activeChat.server_id}
                        onClose={() => closeModal('vanityURL')}
                    />
                )}
                {modals.bookmarks && (
                    <BookmarkPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={() => closeModal('bookmarks')}
                        onMessageClick={(msg) => {
                            if (msg.room) {
                                setActiveChat({ type: 'room', slug: msg.room });
                            }
                            closeModal('bookmarks');
                        }}
                    />
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
                {modals.mentionsInbox && (
                    <Suspense fallback={<div>Yükleniyor...</div>}>
                        <MentionsInboxPanel
                            isOpen={modals.mentionsInbox}
                            onClose={() => closeModal('mentionsInbox')}
                            currentUsername={currentUserProfile?.username || username}
                            onNavigateToMessage={(msg) => {
                                if (msg.room_id) {
                                    setActiveChat({ type: 'room', id: msg.room_id });
                                }
                                closeModal('mentionsInbox');
                            }}
                        />
                    </Suspense>
                )}
                {modals.customStatus && (
                    <Suspense fallback={<div>Yükleniyor...</div>}>
                        <CustomStatusModal
                            isOpen={modals.customStatus}
                            onClose={() => closeModal('customStatus')}
                            onStatusChange={(status) => {
                                if (currentUserProfile) {
                                    setCurrentUserProfile(prev => ({ ...prev, customStatus: status }));
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
                {/* Inline modals */}
                {chartSymbol && <CryptoChartModal symbol={chartSymbol} onClose={() => setChartSymbol(null)} />}
                {modals.cinema && <CinemaModal onClose={() => closeModal('cinema')} ws={ws} username={username} />}
                {modals.snippetModal && <CodeSnippetModal onClose={() => closeModal('snippetModal')} onSend={handleSendSnippet} />}
                {serverToEdit && <ServerSettingsModal onClose={() => setServerToEdit(null)} server={serverToEdit} currentUsername={username} fetchWithAuth={fetchWithAuth} apiBaseUrl={API_BASE_URL} serverMembers={serverMembers} />}
                {modals.encModal && <EncryptionKeyModal onClose={() => closeModal('encModal')} onSetKey={(key) => setEncryptionKey(currentKeyId, key)} existingKey={encryptionKeys[currentKeyId]} />}
                {modals.downloadModal && <DownloadModal onClose={() => closeModal('downloadModal')} apiBaseUrl={ABSOLUTE_HOST_URL} />}
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
        </>
    );
};

export default AppModalsCore;
