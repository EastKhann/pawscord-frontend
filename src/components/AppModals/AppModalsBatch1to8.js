import React, { Suspense, useCallback, useMemo } from 'react';
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
    // Memoize close handlers
    const closeReactionAnalytics = useCallback(() => closeModal('reactionAnalytics'), [closeModal]);
    const closeLinkClickTracking = useCallback(() => closeModal('linkClickTracking'), [closeModal]);
    const closeJoinLeaveLogs = useCallback(() => closeModal('joinLeaveLogs'), [closeModal]);
    const closeUserActivity = useCallback(() => closeModal('userActivity'), [closeModal]);
    const closeNicknameHistory = useCallback(() => closeModal('nicknameHistory'), [closeModal]);
    const closeFieldChangeTracking = useCallback(() => closeModal('fieldChangeTracking'), [closeModal]);
    const closeInviteAnalytics = useCallback(() => closeModal('inviteAnalytics'), [closeModal]);
    const closeContentScanner = useCallback(() => closeModal('contentScanner'), [closeModal]);
    const closeEphemeralMessages = useCallback(() => closeModal('ephemeralMessages'), [closeModal]);
    const closeTopicHistory = useCallback(() => closeModal('topicHistory'), [closeModal]);
    const closeDrafts = useCallback(() => closeModal('drafts'), [closeModal]);
    const closeServerNicknames = useCallback(() => closeModal('serverNicknames'), [closeModal]);
    const closeServerBoost = useCallback(() => closeModal('serverBoost'), [closeModal]);
    const closeRoomWebhooks = useCallback(() => closeModal('roomWebhooks'), [closeModal]);
    const closeOAuthApps = useCallback(() => closeModal('oAuthApps'), [closeModal]);
    const closeAutoResponders = useCallback(() => closeModal('autoResponders'), [closeModal]);
    const closeSessionManagement = useCallback(() => closeModal('sessionManagement'), [closeModal]);
    const closeGDPRExport = useCallback(() => closeModal('gDPRExport'), [closeModal]);
    const closeDataRetention = useCallback(() => closeModal('dataRetention'), [closeModal]);
    const closeTwoFactorSetup = useCallback(() => closeModal('twoFactorSetup'), [closeModal]);
    const closeEnhancedPolls = useCallback(() => closeModal('enhancedPolls'), [closeModal]);
    const closeVoiceTranscripts = useCallback(() => closeModal('voiceTranscripts'), [closeModal]);
    const closeInviteExport = useCallback(() => closeModal('inviteExport'), [closeModal]);
    const closeAdvancedSearch = useCallback(() => closeModal('advancedSearch'), [closeModal]);
    const closeGrowthMetrics = useCallback(() => closeModal('growthMetrics'), [closeModal]);
    const closeLinkPreview = useCallback(() => closeModal('linkPreview'), [closeModal]);
    const closeInventory = useCallback(() => closeModal('inventory'), [closeModal]);
    const closeWaitlist = useCallback(() => closeModal('waitlist'), [closeModal]);
    const closeReferralRewards = useCallback(() => closeModal('referralRewards'), [closeModal]);
    const closeMiniGames = useCallback(() => closeModal('miniGames'), [closeModal]);
    const closeProjectCollaboration = useCallback(() => closeModal('projectCollaboration'), [closeModal]);
    const closeAvatarStudio = useCallback(() => closeModal('avatarStudio'), [closeModal]);

    const handle2FASuccess = useCallback(() => {
        toast.success('2FA ba\u015Far\u0131yla etkinle\u015Ftirildi!');
        closeModal('twoFactorSetup');
    }, [closeModal]);

    const handleDraftLoad = useCallback((draft) => {
        if (draft.room) {
            setActiveChat({ type: 'room', slug: draft.room });
        }
        closeModal('drafts');
    }, [setActiveChat, closeModal]);

    const handleSearchMessageClick = useCallback((msg) => {
        if (msg.room) {
            setActiveChat({ type: 'room', slug: msg.room });
        }
        closeModal('advancedSearch');
    }, [setActiveChat, closeModal]);

    const handleAvatarChange = useCallback((newAvatarUrl) => {
        if (currentUserProfile) {
            setCurrentUserProfile({ ...currentUserProfile, avatar_url: newAvatarUrl });
        }
        toast.success('\uD83C\uDFA8 Avatar g\u00fcncellendi!');
    }, [currentUserProfile, setCurrentUserProfile]);

    const serverId = useMemo(() =>
        activeChat?.type === 'room' ? activeChat.server_id : null,
        [activeChat?.type, activeChat?.server_id]);

    return (
        <>
            {/* 🚀 BATCH 1: Analytics & Tracking */}
            {modals.reactionAnalytics && activeChat?.type === 'room' && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <ReactionAnalyticsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        roomSlug={activeChat.slug}
                        onClose={closeReactionAnalytics}
                    />
                </Suspense>
            )}
            {modals.linkClickTracking && activeChat?.type === 'room' && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <LinkClickTrackingPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        roomSlug={activeChat.slug}
                        onClose={closeLinkClickTracking}
                    />
                </Suspense>
            )}
            {modals.joinLeaveLogs && activeChat?.type === 'room' && activeChat.server_id && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <JoinLeaveLogsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        serverId={serverId}
                        onClose={closeJoinLeaveLogs}
                    />
                </Suspense>
            )}
            {modals.userActivity && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <UserActivityPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        username={username}
                        onClose={closeUserActivity}
                    />
                </Suspense>
            )}
            {modals.nicknameHistory && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <NicknameHistoryPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        username={username}
                        onClose={closeNicknameHistory}
                    />
                </Suspense>
            )}
            {modals.fieldChangeTracking && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <FieldChangeTrackingPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeFieldChangeTracking}
                    />
                </Suspense>
            )}
            {modals.inviteAnalytics && activeChat?.type === 'room' && activeChat.server_id && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <InviteAnalyticsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        serverId={serverId}
                        onClose={closeInviteAnalytics}
                    />
                </Suspense>
            )}
            {/* 🚀 BATCH 2: Content & Moderation */}
            {modals.contentScanner && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <ContentScannerPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeContentScanner}
                    />
                </Suspense>
            )}
            {modals.ephemeralMessages && activeChat?.type === 'room' && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <EphemeralMessagesPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        roomSlug={activeChat.slug}
                        onClose={closeEphemeralMessages}
                    />
                </Suspense>
            )}
            {modals.topicHistory && activeChat?.type === 'room' && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <TopicHistoryPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        roomSlug={activeChat.slug}
                        onClose={closeTopicHistory}
                    />
                </Suspense>
            )}
            {modals.drafts && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <DraftsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeDrafts}
                        onLoadDraft={handleDraftLoad}
                    />
                </Suspense>
            )}
            {modals.serverNicknames && activeChat?.type === 'room' && activeChat.server_id && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <ServerNicknamesPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        serverId={serverId}
                        onClose={closeServerNicknames}
                    />
                </Suspense>
            )}
            {/* 🚀 BATCH 3: Server Features */}
            {modals.serverBoost && activeChat?.type === 'room' && activeChat.server_id && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <ServerBoostPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        serverId={serverId}
                        currentUsername={username}
                        onClose={closeServerBoost}
                    />
                </Suspense>
            )}
            {modals.roomWebhooks && activeChat?.type === 'room' && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <RoomWebhooksPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        roomSlug={activeChat.slug}
                        onClose={closeRoomWebhooks}
                    />
                </Suspense>
            )}
            {modals.oAuthApps && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <OAuthAppsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeOAuthApps}
                    />
                </Suspense>
            )}
            {modals.autoResponders && activeChat?.type === 'room' && activeChat.server_id && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <AutoRespondersPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        serverId={serverId}
                        onClose={closeAutoResponders}
                    />
                </Suspense>
            )}
            {/* 🚀 BATCH 4: Security & Privacy */}
            {modals.sessionManagement && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <SessionManagementPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeSessionManagement}
                    />
                </Suspense>
            )}
            {modals.gDPRExport && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <GDPRExportPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeGDPRExport}
                    />
                </Suspense>
            )}
            {modals.dataRetention && activeChat?.type === 'room' && activeChat.server_id && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <DataRetentionPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        serverId={serverId}
                        onClose={closeDataRetention}
                    />
                </Suspense>
            )}
            {modals.twoFactorSetup && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <TwoFactorSetupWizard
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeTwoFactorSetup}
                        onSuccess={handle2FASuccess}
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
                        onClose={closeEnhancedPolls}
                    />
                </Suspense>
            )}
            {modals.voiceTranscripts && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <VoiceTranscriptsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeVoiceTranscripts}
                    />
                </Suspense>
            )}
            {modals.inviteExport && activeChat?.type === 'room' && activeChat.server_id && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <InviteExportPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        serverId={serverId}
                        onClose={closeInviteExport}
                    />
                </Suspense>
            )}
            {/* 🚀 BATCH 6: Advanced Search & Analytics */}
            {modals.advancedSearch && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <AdvancedSearchPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeAdvancedSearch}
                        onMessageClick={handleSearchMessageClick}
                    />
                </Suspense>
            )}
            {modals.growthMetrics && activeChat?.type === 'room' && activeChat.server_id && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <GrowthMetricsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        serverId={serverId}
                        onClose={closeGrowthMetrics}
                    />
                </Suspense>
            )}
            {modals.linkPreview && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <LinkPreviewRenderer
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        url={null}
                        onClose={closeLinkPreview}
                    />
                </Suspense>
            )}
            {/* 🚀 BATCH 7: Store & Gamification */}
            {modals.inventory && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <InventoryPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeInventory}
                    />
                </Suspense>
            )}
            {modals.waitlist && activeChat?.type === 'room' && activeChat.server_id && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <WaitlistPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        serverId={serverId}
                        onClose={closeWaitlist}
                    />
                </Suspense>
            )}
            {modals.referralRewards && (
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    <ReferralRewardsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeReferralRewards}
                    />
                </Suspense>
            )}
            {/* 🎮 BATCH 8: New Features */}
            {modals.miniGames && (
                <Suspense fallback={<div>🎮 Oyunlar Yükleniyor...</div>}>
                    <MiniGamesPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        serverId={serverId}
                        currentUser={username}
                        onClose={closeMiniGames}
                    />
                </Suspense>
            )}
            {modals.projectCollaboration && (
                <Suspense fallback={<div>📂 Projeler Yükleniyor...</div>}>
                    <ProjectCollaborationPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        serverId={serverId}
                        currentUser={username}
                        onClose={closeProjectCollaboration}
                    />
                </Suspense>
            )}
            {modals.avatarStudio && (
                <Suspense fallback={<div>🎨 Avatar Studio Yükleniyor...</div>}>
                    <AvatarStudioPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        currentUser={username}
                        onClose={closeAvatarStudio}
                        onAvatarChange={handleAvatarChange}
                    />
                </Suspense>
            )}
        </>
    );
};

export default React.memo(AppModalsBatch1to8);
