import React, { Suspense } from 'react';
import { toast } from 'react-toastify';
import { ABSOLUTE_HOST_URL } from '../../config/api';

// Lazy imports for Batch 1-8 modals
const AdvancedSearchPanel = React.lazy(() => import('../AdvancedSearchPanel'));
const AutoRespondersPanel = React.lazy(() => import('../AutoRespondersPanel'));
const AvatarStudioPanel = React.lazy(() => import('../AvatarStudioPanel'));
const ContentScannerPanel = React.lazy(() => import('../ContentScannerPanel'));
const DataRetentionPanel = React.lazy(() => import('../DataRetentionPanel'));
const DraftsPanel = React.lazy(() => import('../DraftsPanel'));
const EnhancedPollsPanel = React.lazy(() => import('../EnhancedPollsPanel'));
const EphemeralMessagesPanel = React.lazy(() => import('../EphemeralMessagesPanel'));
const FieldChangeTrackingPanel = React.lazy(() => import('../FieldChangeTrackingPanel'));
const GDPRExportPanel = React.lazy(() => import('../GDPRExportPanel'));
const GrowthMetricsPanel = React.lazy(() => import('../GrowthMetricsPanel'));
const InventoryPanel = React.lazy(() => import('../InventoryPanel'));
const InviteAnalyticsPanel = React.lazy(() => import('../InviteAnalyticsPanel'));
const InviteExportPanel = React.lazy(() => import('../InviteExportPanel'));
const JoinLeaveLogsPanel = React.lazy(() => import('../JoinLeaveLogsPanel'));
const LinkClickTrackingPanel = React.lazy(() => import('../LinkClickTrackingPanel'));
const LinkPreviewRenderer = React.lazy(() => import('../LinkPreviewRenderer'));
const MiniGamesPanel = React.lazy(() => import('../MiniGamesPanel'));
const NicknameHistoryPanel = React.lazy(() => import('../NicknameHistoryPanel'));
const OAuthAppsPanel = React.lazy(() => import('../OAuthAppsPanel'));
const ProjectCollaborationPanel = React.lazy(() => import('../ProjectCollaborationPanel'));
const ReactionAnalyticsPanel = React.lazy(() => import('../ReactionAnalyticsPanel'));
const ReferralRewardsPanel = React.lazy(() => import('../ReferralRewardsPanel'));
const RoomWebhooksPanel = React.lazy(() => import('../RoomWebhooksPanel'));
const ServerBoostPanel = React.lazy(() => import('../ServerBoostPanel'));
const ServerNicknamesPanel = React.lazy(() => import('../ServerNicknamesPanel'));
const SessionManagementPanel = React.lazy(() => import('../SessionManagementPanel'));
const TopicHistoryPanel = React.lazy(() => import('../TopicHistoryPanel'));
const TwoFactorSetupWizard = React.lazy(() => import('../TwoFactorSetupWizard'));
const UserActivityPanel = React.lazy(() => import('../UserActivityPanel'));
const VoiceTranscriptsPanel = React.lazy(() => import('../VoiceTranscriptsPanel'));
const WaitlistPanel = React.lazy(() => import('../WaitlistPanel'));

/**
 * AppModalsBatch1to8 — BATCH 1-8 feature modals
 * Analytics, Content, Server, Security, Communication, Search, Store, New Features
 */
const AppModalsBatch1to8 = ({
    modals, closeModal,
    fetchWithAuth, activeChat, username,
    currentUserProfile, setCurrentUserProfile,
    setActiveChat,
}) => {
    return (
        <>
            {/* 🚀 BATCH 1: Analytics & Tracking */}
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
            {/* 🚀 BATCH 2: Content & Moderation */}
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
            {/* 🚀 BATCH 3: Server Features */}
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
            {/* 🚀 BATCH 4: Security & Privacy */}
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
            {/* 🚀 BATCH 5: Communication */}
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
            {/* 🚀 BATCH 6: Advanced Search & Analytics */}
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
            {/* 🚀 BATCH 7: Store & Gamification */}
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
            {/* 🎮 BATCH 8: New Features */}
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
                            if (currentUserProfile) {
                                setCurrentUserProfile({ ...currentUserProfile, avatar_url: newAvatarUrl });
                            }
                            toast.success('🎨 Avatar güncellendi!');
                        }}
                    />
                </Suspense>
            )}
        </>
    );
};

export default AppModalsBatch1to8;
