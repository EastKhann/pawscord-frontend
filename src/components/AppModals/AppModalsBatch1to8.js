import React, { Suspense, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { ABSOLUTE_HOST_URL } from '../../config/api';

import { useTranslation } from 'react-i18next';
// Lazy imports for Batch 1-8 modals
const AdvancedSearchPanel = React.lazy(() => import('../shared/AdvancedSearchPanel'));
const AutoRespondersPanel = React.lazy(() => import('../AutoRespondersPanel'));
const AvatarStudioPanel = React.lazy(() => import('../AvatarStudioPanel'));
const ContentScannerPanel = React.lazy(() => import('../ContentScannerPanel'));
const DataRetentionPanel = React.lazy(() => import('../security/DataRetentionPanel'));
const DraftsPanel = React.lazy(() => import('../chat/DraftsPanel'));
const EnhancedPollsPanel = React.lazy(() => import('../chat/EnhancedPollsPanel'));
const EphemeralMessagesPanel = React.lazy(() => import('../chat/EphemeralMessagesPanel'));
const FieldChangeTrackingPanel = React.lazy(() => import('../analytics/FieldChangeTrackingPanel'));
const GDPRExportPanel = React.lazy(() => import('../security/GDPRExportPanel'));
const GrowthMetricsPanel = React.lazy(() => import('../analytics/GrowthMetricsPanel'));
const InventoryPanel = React.lazy(() => import('../premium/InventoryPanel'));
const InviteAnalyticsPanel = React.lazy(() => import('../server/InviteAnalyticsPanel'));
const InviteExportPanel = React.lazy(() => import('../server/InviteExportPanel'));
const JoinLeaveLogsPanel = React.lazy(() => import('../social/JoinLeaveLogsPanel'));
const LinkClickTrackingPanel = React.lazy(() => import('../chat/LinkClickTrackingPanel'));
const LinkPreviewRenderer = React.lazy(() => import('../chat/LinkPreviewRenderer'));
const MiniGamesPanel = React.lazy(() => import('../games/MiniGamesPanel'));
const NicknameHistoryPanel = React.lazy(() => import('../profile/NicknameHistoryPanel'));
const OAuthAppsPanel = React.lazy(() => import('../OAuthAppsPanel'));
const ProjectCollaborationPanel = React.lazy(() => import('../social/ProjectCollaborationPanel'));
const ReactionAnalyticsPanel = React.lazy(() => import('../chat/ReactionAnalyticsPanel'));
const ReferralRewardsPanel = React.lazy(() => import('../premium/ReferralRewardsPanel'));
const RoomWebhooksPanel = React.lazy(() => import('../RoomWebhooksPanel'));
const ServerBoostPanel = React.lazy(() => import('../ServerBoostPanel'));
const ServerNicknamesPanel = React.lazy(() => import('../server/ServerNicknamesPanel'));
const SessionManagementPanel = React.lazy(() => import('../security/SessionManagementPanel'));
const TopicHistoryPanel = React.lazy(() => import('../shared/TopicHistoryPanel'));
const TwoFactorSetupWizard = React.lazy(() => import('../security/TwoFactorSetupWizard'));
const UserActivityPanel = React.lazy(() => import('../profile/UserActivityPanel'));
const VoiceTranscriptsPanel = React.lazy(() => import('../media/VoiceTranscriptsPanel'));
const WaitlistPanel = React.lazy(() => import('../social/WaitlistPanel'));

/**
 * AppModalsBatch1to8 — BATCH 1-8 feature modals
 * Analytics, Content, Server, Security, Communication, Search, Store, New Features
 */
const AppModalsBatch1to8 = ({
    modals,
    closeModal,
    fetchWithAuth,
    activeChat,
    username,
    currentUserProfile,
    setCurrentUserProfile,
    setActiveChat,
}) => {
    const { t } = useTranslation();
    // Memoize close handlers
    const closeReactionAnalytics = useCallback(() => closeModal('reactionAnalytics'), [closeModal]);
    const closeLinkClickTracking = useCallback(() => closeModal('linkClickTracking'), [closeModal]);
    const closeJoinLeaveLogs = useCallback(() => closeModal('joinLeaveLogs'), [closeModal]);
    const closeUserActivity = useCallback(() => closeModal('userActivity'), [closeModal]);
    const closeNicknameHistory = useCallback(() => closeModal('nicknameHistory'), [closeModal]);
    const closeFieldChangeTracking = useCallback(
        () => closeModal('fieldChangeTracking'),
        [closeModal]
    );
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
    const closeProjectCollaboration = useCallback(
        () => closeModal('projectCollaboration'),
        [closeModal]
    );
    const closeAvatarStudio = useCallback(() => closeModal('avatarStudio'), [closeModal]);

    const handle2FASuccess = useCallback(() => {
        toast.success(t('security.twoFactorEnabled'));
        closeModal('twoFactorSetup');
    }, [closeModal, t]);

    const handleDraftLoad = useCallback(
        (draft) => {
            if (draft.room) {
                setActiveChat({ type: 'room', slug: draft.room });
            }
            closeModal('drafts');
        },
        [setActiveChat, closeModal]
    );

    const handleSearchMessageClick = useCallback(
        (msg) => {
            if (msg.room) {
                setActiveChat({ type: 'room', slug: msg.room });
            }
            closeModal('advancedSearch');
        },
        [setActiveChat, closeModal]
    );

    const handleAvatarChange = useCallback(
        (newAvatarUrl) => {
            if (currentUserProfile) {
                setCurrentUserProfile({ ...currentUserProfile, avatar_url: newAvatarUrl });
            }
            toast.success(t('avatar.updated'));
        },
        [currentUserProfile, setCurrentUserProfile, t]
    );

    const serverId = useMemo(
        () => (activeChat?.type === 'room' ? activeChat.server_id : null),
        [activeChat?.type, activeChat?.server_id]
    );

    return (
        <>
            {/* 🚀 BATCH 1: Analytics & Tracking */}
            {modals.reactionAnalytics && activeChat?.type === 'room' && (
                <Suspense
                    fallback={
                        <div role="region" aria-label={t('appModals.batch1to8', 'App modals')}>
                            {t('common.loading')}
                        </div>
                    }
                >
                    <ReactionAnalyticsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        roomSlug={activeChat.slug}
                        onClose={closeReactionAnalytics}
                    />
                </Suspense>
            )}
            {modals.linkClickTracking && activeChat?.type === 'room' && (
                <Suspense fallback={<div>{t('common.loading')}</div>}>
                    <LinkClickTrackingPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        roomSlug={activeChat.slug}
                        onClose={closeLinkClickTracking}
                    />
                </Suspense>
            )}
            {modals.joinLeaveLogs && activeChat?.type === 'room' && activeChat.server_id && (
                <Suspense fallback={<div>{t('common.loading')}</div>}>
                    <JoinLeaveLogsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        serverId={serverId}
                        onClose={closeJoinLeaveLogs}
                    />
                </Suspense>
            )}
            {modals.userActivity && (
                <Suspense fallback={<div>{t('common.loading')}</div>}>
                    <UserActivityPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        username={username}
                        onClose={closeUserActivity}
                    />
                </Suspense>
            )}
            {modals.nicknameHistory && (
                <Suspense fallback={<div>{t('common.loading')}</div>}>
                    <NicknameHistoryPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        username={username}
                        onClose={closeNicknameHistory}
                    />
                </Suspense>
            )}
            {modals.fieldChangeTracking && (
                <Suspense fallback={<div>{t('common.loading')}</div>}>
                    <FieldChangeTrackingPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeFieldChangeTracking}
                    />
                </Suspense>
            )}
            {modals.inviteAnalytics && activeChat?.type === 'room' && activeChat.server_id && (
                <Suspense fallback={<div>{t('common.loading')}</div>}>
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
                <Suspense fallback={<div>{t('common.loading')}</div>}>
                    <ContentScannerPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeContentScanner}
                    />
                </Suspense>
            )}
            {modals.ephemeralMessages && activeChat?.type === 'room' && (
                <Suspense fallback={<div>{t('common.loading')}</div>}>
                    <EphemeralMessagesPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        roomSlug={activeChat.slug}
                        onClose={closeEphemeralMessages}
                    />
                </Suspense>
            )}
            {modals.topicHistory && activeChat?.type === 'room' && (
                <Suspense fallback={<div>{t('common.loading')}</div>}>
                    <TopicHistoryPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        roomSlug={activeChat.slug}
                        onClose={closeTopicHistory}
                    />
                </Suspense>
            )}
            {modals.drafts && (
                <Suspense fallback={<div>{t('common.loading')}</div>}>
                    <DraftsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeDrafts}
                        onLoadDraft={handleDraftLoad}
                    />
                </Suspense>
            )}
            {modals.serverNicknames && activeChat?.type === 'room' && activeChat.server_id && (
                <Suspense fallback={<div>{t('common.loading')}</div>}>
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
                <Suspense fallback={<div>{t('common.loading')}</div>}>
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
                <Suspense fallback={<div>{t('common.loading')}</div>}>
                    <RoomWebhooksPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        roomSlug={activeChat.slug}
                        onClose={closeRoomWebhooks}
                    />
                </Suspense>
            )}
            {modals.oAuthApps && (
                <Suspense fallback={<div>{t('common.loading')}</div>}>
                    <OAuthAppsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeOAuthApps}
                    />
                </Suspense>
            )}
            {modals.autoResponders && activeChat?.type === 'room' && activeChat.server_id && (
                <Suspense fallback={<div>{t('common.loading')}</div>}>
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
                <Suspense fallback={<div>{t('common.loading')}</div>}>
                    <SessionManagementPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeSessionManagement}
                    />
                </Suspense>
            )}
            {modals.gDPRExport && (
                <Suspense fallback={<div>{t('common.loading')}</div>}>
                    <GDPRExportPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeGDPRExport}
                    />
                </Suspense>
            )}
            {modals.dataRetention && activeChat?.type === 'room' && activeChat.server_id && (
                <Suspense fallback={<div>{t('common.loading')}</div>}>
                    <DataRetentionPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        serverId={serverId}
                        onClose={closeDataRetention}
                    />
                </Suspense>
            )}
            {modals.twoFactorSetup && (
                <Suspense fallback={<div>{t('common.loading')}</div>}>
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
                <Suspense fallback={<div>{t('common.loading')}</div>}>
                    <EnhancedPollsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        roomSlug={activeChat.slug}
                        onClose={closeEnhancedPolls}
                    />
                </Suspense>
            )}
            {modals.voiceTranscripts && (
                <Suspense fallback={<div>{t('common.loading')}</div>}>
                    <VoiceTranscriptsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeVoiceTranscripts}
                    />
                </Suspense>
            )}
            {modals.inviteExport && activeChat?.type === 'room' && activeChat.server_id && (
                <Suspense fallback={<div>{t('common.loading')}</div>}>
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
                <Suspense fallback={<div>{t('common.loading')}</div>}>
                    <AdvancedSearchPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeAdvancedSearch}
                        onMessageClick={handleSearchMessageClick}
                    />
                </Suspense>
            )}
            {modals.growthMetrics && activeChat?.type === 'room' && activeChat.server_id && (
                <Suspense fallback={<div>{t('common.loading')}</div>}>
                    <GrowthMetricsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        serverId={serverId}
                        onClose={closeGrowthMetrics}
                    />
                </Suspense>
            )}
            {modals.linkPreview && (
                <Suspense fallback={<div>{t('common.loading')}</div>}>
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
                <Suspense fallback={<div>{t('common.loading')}</div>}>
                    <InventoryPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeInventory}
                    />
                </Suspense>
            )}
            {modals.waitlist && activeChat?.type === 'room' && activeChat.server_id && (
                <Suspense fallback={<div>{t('common.loading')}</div>}>
                    <WaitlistPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        serverId={serverId}
                        onClose={closeWaitlist}
                    />
                </Suspense>
            )}
            {modals.referralRewards && (
                <Suspense fallback={<div>{t('common.loading')}</div>}>
                    <ReferralRewardsPanel
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        onClose={closeReferralRewards}
                    />
                </Suspense>
            )}
            {/* 🎮 BATCH 8: New Features */}
            {modals.miniGames && (
                <Suspense fallback={<div>{t('🎮_oyunlar_loading')}</div>}>
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
                <Suspense fallback={<div>{t('📂_projeler_loading')}</div>}>
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
                <Suspense fallback={<div>{t('🎨_avatar_studio_loading')}</div>}>
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

AppModalsBatch1to8.propTypes = {
    modals: PropTypes.object,
    closeModal: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    activeChat: PropTypes.bool,
    username: PropTypes.string,
    currentUserProfile: PropTypes.object,
    setCurrentUserProfile: PropTypes.func,
    setActiveChat: PropTypes.func,
};
export default React.memo(AppModalsBatch1to8);
