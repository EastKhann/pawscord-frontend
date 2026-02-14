import React, { Suspense } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import { ABSOLUTE_HOST_URL } from '../../config/api';

// Lazy imports for Standard/tail modals
const ImageLightbox = React.lazy(() => import('../ImageLightbox'));
const MessageTemplateModal = React.lazy(() => import('../MessageTemplateModal'));
const PinnedMessages = React.lazy(() => import('../../PinnedMessages'));
const SummaryModal = React.lazy(() => import('../../SummaryModal'));
const ThemeStoreModal = React.lazy(() => import('../ThemeStoreModal'));
const UserProfileModal = React.lazy(() => import('../../UserProfileModal'));

/**
 * AppModalsStandard — Standard/tail modals
 * Image lightbox, pinned messages, profile modal, theme store, summary, templates
 */
const AppModalsStandard = ({
    modals, closeModal,
    fetchWithAuth, activeChat, username,
    currentTheme, setCurrentTheme,
    pinnedMessages,
    zoomedImage, setZoomedImage,
    galleryData, setGalleryData,
    viewingProfile, setViewingProfile,
    isAdmin, richTextRef,
    getDeterministicAvatar, handleDMClick, friendsList,
}) => {
    return (
        <>
        {zoomedImage && <Suspense fallback={null}><ImageLightbox imageUrl={zoomedImage} onClose={() => setZoomedImage(null)} /></Suspense>}
        {galleryData && <Suspense fallback={null}><ImageLightbox images={galleryData.images} startIndex={galleryData.startIndex} onClose={() => setGalleryData(null)} /></Suspense>}
        {modals.pinned && <Suspense fallback={<LoadingSpinner size="small" text="Sabitlenmiş mesajlar yükleniyor..." />}><PinnedMessages messages={pinnedMessages} onClose={() => closeModal('pinned')} /></Suspense>}
        {viewingProfile && <Suspense fallback={null}><UserProfileModal user={viewingProfile} onClose={() => setViewingProfile(null)} onStartDM={handleDMClick} onImageClick={setZoomedImage} getDeterministicAvatar={getDeterministicAvatar} fetchWithAuth={fetchWithAuth} apiBaseUrl={ABSOLUTE_HOST_URL} currentUser={username} friendsList={friendsList} /></Suspense>}
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
        )}
        </>
    );
};

export default AppModalsStandard;
