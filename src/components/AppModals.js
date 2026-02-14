import React from 'react';
import { useUIStore } from '../stores/useUIStore';
import AppModalsCore from './AppModals/AppModalsCore';
import AppModalsBatch1to8 from './AppModals/AppModalsBatch1to8';
import AppModalsBatch10 from './AppModals/AppModalsBatch10';
import AppModalsBatch11 from './AppModals/AppModalsBatch11';
import AppModalsStandard from './AppModals/AppModalsStandard';

/**
 * AppModals — Thin orchestrator for all application modals
 * Delegates rendering to 5 sub-components organized by feature batch.
 * Original: 1,970 lines -> Now: ~30 lines (-97%)
 */
const AppModals = (props) => {
    const { modals, openModal, closeModal, toggleModal } = useUIStore();
    const shared = { ...props, modals, openModal, closeModal, toggleModal };

    return (
        <>
            <AppModalsCore {...shared} />
            <AppModalsBatch1to8 {...shared} />
            <AppModalsBatch10 {...shared} />
            <AppModalsBatch11 {...shared} />
            <AppModalsStandard {...shared} />
        </>
    );
};

export default AppModals;
