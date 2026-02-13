// useUIStore Tests — Modal Management
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
