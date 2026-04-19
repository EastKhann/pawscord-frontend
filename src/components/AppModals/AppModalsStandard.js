import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from '../shared/LoadingSpinner';
import { ABSOLUTE_HOST_URL } from '../../config/api';

// Lazy imports for Standard/tail modals
const ImageLightbox = React.lazy(() => import('../shared/ImageLightbox'));
const MessageTemplateModal = React.lazy(() => import('../server/MessageTemplateModal'));
const PinnedMessages = React.lazy(() => import('../../features/PinnedMessages'));
const SummaryModal = React.lazy(() => import('../../features/SummaryModal'));
const ThemeStoreModal = React.lazy(() => import('../premium/ThemeStoreModal'));
const UserProfileModal = React.lazy(() => import('../../UserProfileModal'));

/**
 * AppModalsStandard — Standard/tail modals
 * Image lightbox, pinned messages, profile modal, theme store, summary, templates
 */
const AppModalsStandard = ({
    modals,
    closeModal,
    fetchWithAuth,
    activeChat,
    username,
    currentTheme,
    setCurrentTheme,
    pinnedMessages,
    zoomedImage,
    setZoomedImage,
    galleryData,
    setGalleryData,
    viewingProfile,
    setViewingProfile,
    isAdmin,
    richTextRef,
    getDeterministicAvatar,
    handleDMClick,
    friendsList,
}) => {
    const { t } = useTranslation();
    return (
        <>
            {zoomedImage && (
                <Suspense fallback={null}>
                    <ImageLightbox imageUrl={zoomedImage} onClose={() => setZoomedImage(null)} />
                </Suspense>
            )}
            {galleryData && (
                <Suspense fallback={null}>
                    <ImageLightbox
                        images={galleryData.images}
                        startIndex={galleryData.startIndex}
                        onClose={() => setGalleryData(null)}
                    />
                </Suspense>
            )}
            {modals.pinned && (
                <Suspense
                    fallback={<LoadingSpinner size="small" text={t('panels.pinnedLoading')} />}
                >
                    <PinnedMessages
                        messages={pinnedMessages}
                        onClose={() => closeModal('pinned')}
                    />
                </Suspense>
            )}
            {viewingProfile && (
                <Suspense fallback={null}>
                    <UserProfileModal
                        user={viewingProfile}
                        onClose={() => setViewingProfile(null)}
                        onStartDM={handleDMClick}
                        onImageClick={setZoomedImage}
                        getDeterministicAvatar={getDeterministicAvatar}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        currentUser={username}
                        friendsList={friendsList}
                    />
                </Suspense>
            )}
            {modals.themeStore && (
                <Suspense
                    fallback={<LoadingSpinner size="medium" text={t('panels.themesLoading')} />}
                >
                    <ThemeStoreModal
                        onClose={() => closeModal('themeStore')}
                        currentTheme={currentTheme}
                        onThemeChange={setCurrentTheme}
                    />
                </Suspense>
            )}
            {modals.summary && (
                <Suspense
                    fallback={<LoadingSpinner size="medium" text={t('ui.ozet_hazirlaniyor')} />}
                >
                    <SummaryModal
                        roomSlug={activeChat.id}
                        onClose={() => closeModal('summary')}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                    />
                </Suspense>
            )}
            {modals.templateModal && (
                <Suspense
                    fallback={<LoadingSpinner size="small" text={t('panels.templatesLoading')} />}
                >
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
            )}
        </>
    );
};

AppModalsStandard.propTypes = {
    modals: PropTypes.object,
    closeModal: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    activeChat: PropTypes.bool,
    username: PropTypes.string,
    currentTheme: PropTypes.object,
    setCurrentTheme: PropTypes.func,
    pinnedMessages: PropTypes.array,
    zoomedImage: PropTypes.string,
    setZoomedImage: PropTypes.func,
    galleryData: PropTypes.array,
    setGalleryData: PropTypes.func,
    viewingProfile: PropTypes.object,
    setViewingProfile: PropTypes.func,
    isAdmin: PropTypes.bool,
    richTextRef: PropTypes.object,
    getDeterministicAvatar: PropTypes.func,
    handleDMClick: PropTypes.func,
    friendsList: PropTypes.object,
};
export default React.memo(AppModalsStandard);
