import React, { Suspense } from 'react';
import { useUIStore } from '../stores/useUIStore';

// Lazy-load modal batches — they're rarely all active at once
const AppModalsCore = React.lazy(() => import('./AppModals/AppModalsCore'));
const AppModalsBatch1to8 = React.lazy(() => import('./AppModals/AppModalsBatch1to8'));
const AppModalsBatch10 = React.lazy(() => import('./AppModals/AppModalsBatch10'));
const AppModalsBatch11 = React.lazy(() => import('./AppModals/AppModalsBatch11'));
const AppModalsStandard = React.lazy(() => import('./AppModals/AppModalsStandard'));

/**
 * AppModals — Thin orchestrator for all application modals
 * Delegates rendering to 5 sub-components organized by feature batch.
 * Original: 1,970 lines -> Now: ~30 lines (-97%)
 * All sub-components are lazy-loaded to reduce initial bundle size.
 */
const AppModals = (props) => {
    const { modals, openModal, closeModal, toggleModal } = useUIStore();
    const shared = { ...props, modals, openModal, closeModal, toggleModal };

    // Only render Suspense wrappers when at least one modal from that batch is open
    // 🔥 FIX: viewingProfile, zoomedImage, galleryData are props (not in modals store)
    // but they also trigger modals inside AppModalsStandard — must be checked here too
    const hasAnyModal = Object.values(modals).some(Boolean)
        || props.viewingProfile || props.zoomedImage || props.galleryData
        || props.serverToEdit || props.chartSymbol;
    if (!hasAnyModal) return null;

    return (
        <Suspense fallback={null}>
            <AppModalsCore {...shared} />
            <AppModalsBatch1to8 {...shared} />
            <AppModalsBatch10 {...shared} />
            <AppModalsBatch11 {...shared} />
            <AppModalsStandard {...shared} />
        </Suspense>
    );
};

export default AppModals;
