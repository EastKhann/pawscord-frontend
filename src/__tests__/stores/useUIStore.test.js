// useUIStore Tests — Modal Management + Selectors
import { describe, it, expect, beforeEach } from 'vitest';
import { useUIStore } from '../../stores/useUIStore';

describe('useUIStore', () => {
    beforeEach(() => {
        // Reset store to initial state
        const { closeAllModals } = useUIStore.getState();
        closeAllModals();
    });

    describe('openModal', () => {
        it('should open a modal', () => {
            const { openModal } = useUIStore.getState();
            openModal('testModal');
            expect(useUIStore.getState().modals.testModal).toBe(true);
        });

        it('should store modal data when provided', () => {
            const { openModal } = useUIStore.getState();
            openModal('testModal', { userId: 123 });
            expect(useUIStore.getState().modals.testModal).toBe(true);
            expect(useUIStore.getState().modalData.testModal).toEqual({ userId: 123 });
        });

        it('should handle dynamic modal keys', () => {
            const { openModal } = useUIStore.getState();
            openModal('dynamicKey_123');
            expect(useUIStore.getState().modals.dynamicKey_123).toBe(true);
        });
    });

    describe('closeModal', () => {
        it('should close an opened modal', () => {
            const { openModal, closeModal } = useUIStore.getState();
            openModal('testModal');
            expect(useUIStore.getState().modals.testModal).toBe(true);
            closeModal('testModal');
            expect(useUIStore.getState().modals.testModal).toBe(false);
        });

        it('should clear modal data on close', () => {
            const { openModal, closeModal } = useUIStore.getState();
            openModal('testModal', { data: 'test' });
            closeModal('testModal');
            expect(useUIStore.getState().modalData.testModal).toBeUndefined();
        });
    });

    describe('toggleModal', () => {
        it('should toggle modal off when on', () => {
            const { openModal, toggleModal } = useUIStore.getState();
            openModal('testModal');
            toggleModal('testModal');
            expect(useUIStore.getState().modals.testModal).toBe(false);
        });

        it('should toggle modal on when off', () => {
            const { toggleModal } = useUIStore.getState();
            toggleModal('testModal');
            expect(useUIStore.getState().modals.testModal).toBe(true);
        });
    });

    describe('closeAllModals', () => {
        it('should close all open modals', () => {
            const { openModal, closeAllModals } = useUIStore.getState();
            openModal('modalA');
            openModal('modalB');
            openModal('modalC');
            expect(useUIStore.getState().modals.modalA).toBe(true);
            expect(useUIStore.getState().modals.modalB).toBe(true);

            closeAllModals();
            const modals = useUIStore.getState().modals;
            Object.values(modals).forEach(val => {
                expect(val).toBe(false);
            });
        });

        it('should clear all modal data', () => {
            const { openModal, closeAllModals } = useUIStore.getState();
            openModal('modalA', { data: 'a' });
            openModal('modalB', { data: 'b' });

            closeAllModals();
            expect(useUIStore.getState().modalData).toEqual({});
        });
    });

    describe('predefined modals', () => {
        it('should have key modals defined with default false', () => {
            const state = useUIStore.getState();
            // Check some key modal names exist and are false
            expect(state.modals.settings).toBe(false);
            expect(state.modals.userProfile).toBe(false);
        });
    });
});

// ─── Selector Tests ──────────────────────────────────────────────────────────
describe('useUIStore selectors', () => {
    beforeEach(() => {
        useUIStore.getState().closeAllModals();
    });

    it('useIsModalOpen returns false for closed modal', () => {
        expect(useUIStore.getState().modals['settings'] ?? false).toBe(false);
    });

    it('useIsModalOpen returns true after openModal', () => {
        useUIStore.getState().openModal('settings');
        expect(useUIStore.getState().modals['settings']).toBe(true);
    });

    it('useTheme returns default dark theme', () => {
        expect(useUIStore.getState().theme).toBe('dark');
    });

    it('setTheme updates theme', () => {
        useUIStore.getState().setTheme('light');
        expect(useUIStore.getState().theme).toBe('light');
        useUIStore.getState().setTheme('dark'); // restore
    });

    it('useAccentColor returns default Discord purple', () => {
        expect(useUIStore.getState().accentColor).toBe('#5865F2');
    });

    it('setAccentColor updates accent', () => {
        useUIStore.getState().setAccentColor('#ff0000');
        expect(useUIStore.getState().accentColor).toBe('#ff0000');
        useUIStore.getState().setAccentColor('#5865F2'); // restore
    });

    it('useConnectionStatus starts as disconnected', () => {
        expect(useUIStore.getState().connectionStatus).toBe('disconnected');
    });

    it('setConnectionStatus updates status and isConnected', () => {
        useUIStore.getState().setConnectionStatus('connected');
        expect(useUIStore.getState().connectionStatus).toBe('connected');
        expect(useUIStore.getState().isConnected).toBe(true);
        useUIStore.getState().setConnectionStatus('disconnected'); // restore
    });

    it('usePanelVisible returns true for default panels', () => {
        expect(useUIStore.getState().panels['memberList']).toBe(true);
    });

    it('togglePanel flips panel visibility', () => {
        useUIStore.getState().togglePanel('memberList');
        expect(useUIStore.getState().panels['memberList']).toBe(false);
        useUIStore.getState().togglePanel('memberList'); // restore
    });

    it('toast notifications can be added and removed', () => {
        const { addNotification, removeNotification } = useUIStore.getState();
        addNotification({ message: 'Test toast', type: 'success' });
        const toasts = useUIStore.getState().toastNotifications;
        expect(toasts.length).toBeGreaterThan(0);
        const id = toasts[0].id;
        removeNotification(id);
        expect(useUIStore.getState().toastNotifications).toHaveLength(0);
    });

    it('clearNotifications empties the queue', () => {
        const { addNotification, clearNotifications } = useUIStore.getState();
        addNotification({ message: 'A' });
        addNotification({ message: 'B' });
        clearNotifications();
        expect(useUIStore.getState().toastNotifications).toHaveLength(0);
    });
});
