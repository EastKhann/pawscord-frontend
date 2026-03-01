// frontend/src/__tests__/stores/uiStore.test.js
// Comprehensive UI Store Tests — modals, panels, theme, notifications, state
import { describe, it, expect, beforeEach } from 'vitest';
import { useUIStore } from '../../stores/useUIStore';

const resetStore = () => {
    useUIStore.getState().closeAllModals();
    useUIStore.setState({
        theme: 'dark',
        accentColor: '#5865F2',
        sidebarCollapsed: false,
        mobileSidebarOpen: false,
        contextMenu: null,
        isConnected: false,
        connectionStatus: 'disconnected',
        isLoading: false,
        globalError: null,
        toastNotifications: [],
        searchQuery: '',
        downloadProgress: 0,
        isDownloading: false,
        panels: { userList: true, memberList: true, serverList: true, channelList: true },
    });
};

describe('useUIStore – Comprehensive', () => {
    beforeEach(resetStore);

    // ═══════════════════════════════════════════════════════════
    // INITIAL STATE
    // ═══════════════════════════════════════════════════════════
    describe('Initial State', () => {
        it('all predefined modals should default to false', () => {
            const modals = useUIStore.getState().modals;
            expect(modals.settings).toBe(false);
            expect(modals.createServer).toBe(false);
            expect(modals.userProfile).toBe(false);
            expect(modals.soundboard).toBe(false);
        });

        it('theme should default to dark', () => {
            expect(useUIStore.getState().theme).toBe('dark');
        });

        it('accentColor should default to Pawscord purple', () => {
            expect(useUIStore.getState().accentColor).toBe('#5865F2');
        });

        it('sidebar should not be collapsed', () => {
            expect(useUIStore.getState().sidebarCollapsed).toBe(false);
        });

        it('panels should all be visible', () => {
            const p = useUIStore.getState().panels;
            expect(p.userList).toBe(true);
            expect(p.memberList).toBe(true);
            expect(p.serverList).toBe(true);
            expect(p.channelList).toBe(true);
        });

        it('connectionStatus should be disconnected', () => {
            expect(useUIStore.getState().connectionStatus).toBe('disconnected');
            expect(useUIStore.getState().isConnected).toBe(false);
        });

        it('loading and error should be off', () => {
            expect(useUIStore.getState().isLoading).toBe(false);
            expect(useUIStore.getState().globalError).toBeNull();
        });

        it('toastNotifications should be empty', () => {
            expect(useUIStore.getState().toastNotifications).toEqual([]);
        });
    });

    // ═══════════════════════════════════════════════════════════
    // MODAL MANAGEMENT
    // ═══════════════════════════════════════════════════════════
    describe('openModal', () => {
        it('should open a modal flag to true', () => {
            useUIStore.getState().openModal('settings');
            expect(useUIStore.getState().modals.settings).toBe(true);
        });

        it('should store associated modal data', () => {
            useUIStore.getState().openModal('userProfile', { userId: 42 });
            expect(useUIStore.getState().modalData.userProfile).toEqual({ userId: 42 });
        });

        it('should create dynamic modal keys', () => {
            useUIStore.getState().openModal('custom_xyz');
            expect(useUIStore.getState().modals.custom_xyz).toBe(true);
        });

        it('should not overwrite other modals', () => {
            useUIStore.getState().openModal('settings');
            useUIStore.getState().openModal('soundboard');
            expect(useUIStore.getState().modals.settings).toBe(true);
            expect(useUIStore.getState().modals.soundboard).toBe(true);
        });
    });

    describe('closeModal', () => {
        it('should set modal flag to false', () => {
            useUIStore.getState().openModal('settings');
            useUIStore.getState().closeModal('settings');
            expect(useUIStore.getState().modals.settings).toBe(false);
        });

        it('should clear modal data', () => {
            useUIStore.getState().openModal('userProfile', { userId: 1 });
            useUIStore.getState().closeModal('userProfile');
            expect(useUIStore.getState().modalData.userProfile).toBeUndefined();
        });

        it('should be safe to call on already-closed modal', () => {
            useUIStore.getState().closeModal('settings');
            expect(useUIStore.getState().modals.settings).toBe(false);
        });
    });

    describe('toggleModal', () => {
        it('should toggle false → true', () => {
            useUIStore.getState().toggleModal('pinned');
            expect(useUIStore.getState().modals.pinned).toBe(true);
        });

        it('should toggle true → false', () => {
            useUIStore.getState().openModal('pinned');
            useUIStore.getState().toggleModal('pinned');
            expect(useUIStore.getState().modals.pinned).toBe(false);
        });

        it('should toggle back and forth', () => {
            useUIStore.getState().toggleModal('soundboard');
            expect(useUIStore.getState().modals.soundboard).toBe(true);
            useUIStore.getState().toggleModal('soundboard');
            expect(useUIStore.getState().modals.soundboard).toBe(false);
        });
    });

    describe('closeAllModals', () => {
        it('should close all open modals', () => {
            useUIStore.getState().openModal('settings');
            useUIStore.getState().openModal('soundboard');
            useUIStore.getState().openModal('analytics');
            useUIStore.getState().closeAllModals();
            const modals = useUIStore.getState().modals;
            Object.values(modals).forEach(v => expect(v).toBe(false));
        });

        it('should clear all modal data', () => {
            useUIStore.getState().openModal('a', { x: 1 });
            useUIStore.getState().openModal('b', { y: 2 });
            useUIStore.getState().closeAllModals();
            expect(useUIStore.getState().modalData).toEqual({});
        });
    });

    // ═══════════════════════════════════════════════════════════
    // PANELS
    // ═══════════════════════════════════════════════════════════
    describe('togglePanel', () => {
        it('should toggle memberList off', () => {
            useUIStore.getState().togglePanel('memberList');
            expect(useUIStore.getState().panels.memberList).toBe(false);
        });

        it('should toggle back on', () => {
            useUIStore.getState().togglePanel('memberList');
            useUIStore.getState().togglePanel('memberList');
            expect(useUIStore.getState().panels.memberList).toBe(true);
        });

        it('should not affect other panels', () => {
            useUIStore.getState().togglePanel('serverList');
            expect(useUIStore.getState().panels.memberList).toBe(true);
            expect(useUIStore.getState().panels.serverList).toBe(false);
        });
    });

    // ═══════════════════════════════════════════════════════════
    // THEME & ACCENT
    // ═══════════════════════════════════════════════════════════
    describe('Theme & Accent', () => {
        it('setTheme should update theme', () => {
            useUIStore.getState().setTheme('light');
            expect(useUIStore.getState().theme).toBe('light');
        });

        it('setAccentColor should update accent', () => {
            useUIStore.getState().setAccentColor('#ff0000');
            expect(useUIStore.getState().accentColor).toBe('#ff0000');
        });

        it('setTheme should accept any string', () => {
            useUIStore.getState().setTheme('amoled');
            expect(useUIStore.getState().theme).toBe('amoled');
        });
    });

    // ═══════════════════════════════════════════════════════════
    // SIDEBAR
    // ═══════════════════════════════════════════════════════════
    describe('Sidebar', () => {
        it('toggleSidebar should collapse sidebar', () => {
            useUIStore.getState().toggleSidebar();
            expect(useUIStore.getState().sidebarCollapsed).toBe(true);
        });

        it('toggleSidebar should expand sidebar back', () => {
            useUIStore.getState().toggleSidebar();
            useUIStore.getState().toggleSidebar();
            expect(useUIStore.getState().sidebarCollapsed).toBe(false);
        });

        it('setMobileSidebarOpen should control mobile sidebar', () => {
            useUIStore.getState().setMobileSidebarOpen(true);
            expect(useUIStore.getState().mobileSidebarOpen).toBe(true);
            useUIStore.getState().setMobileSidebarOpen(false);
            expect(useUIStore.getState().mobileSidebarOpen).toBe(false);
        });
    });

    // ═══════════════════════════════════════════════════════════
    // CONNECTION STATUS
    // ═══════════════════════════════════════════════════════════
    describe('Connection Status', () => {
        it('setConnectionStatus connected sets isConnected true', () => {
            useUIStore.getState().setConnectionStatus('connected');
            expect(useUIStore.getState().connectionStatus).toBe('connected');
            expect(useUIStore.getState().isConnected).toBe(true);
        });

        it('setConnectionStatus disconnected sets isConnected false', () => {
            useUIStore.getState().setConnectionStatus('connected');
            useUIStore.getState().setConnectionStatus('disconnected');
            expect(useUIStore.getState().isConnected).toBe(false);
        });

        it('setIsConnected sets both connectionStatus and isConnected', () => {
            useUIStore.getState().setIsConnected(true);
            expect(useUIStore.getState().isConnected).toBe(true);
            expect(useUIStore.getState().connectionStatus).toBe('connected');
        });

        it('setIsConnected(false) resets to disconnected', () => {
            useUIStore.getState().setIsConnected(true);
            useUIStore.getState().setIsConnected(false);
            expect(useUIStore.getState().connectionStatus).toBe('disconnected');
        });
    });

    // ═══════════════════════════════════════════════════════════
    // LOADING & ERROR
    // ═══════════════════════════════════════════════════════════
    describe('Loading & Error', () => {
        it('setLoading should set isLoading', () => {
            useUIStore.getState().setLoading(true);
            expect(useUIStore.getState().isLoading).toBe(true);
        });

        it('setLoading accepts function updater', () => {
            useUIStore.getState().setLoading(prev => !prev);
            expect(useUIStore.getState().isLoading).toBe(true);
        });

        it('setError should set globalError', () => {
            useUIStore.getState().setError('Network error');
            expect(useUIStore.getState().globalError).toBe('Network error');
        });

        it('clearError should reset globalError to null', () => {
            useUIStore.getState().setError('err');
            useUIStore.getState().clearError();
            expect(useUIStore.getState().globalError).toBeNull();
        });
    });

    // ═══════════════════════════════════════════════════════════
    // TOAST NOTIFICATIONS
    // ═══════════════════════════════════════════════════════════
    describe('Toast Notifications', () => {
        it('addNotification should add to queue', () => {
            useUIStore.getState().addNotification({ type: 'success', message: 'Done' });
            expect(useUIStore.getState().toastNotifications).toHaveLength(1);
            expect(useUIStore.getState().toastNotifications[0].message).toBe('Done');
        });

        it('addNotification should assign an id', () => {
            useUIStore.getState().addNotification({ type: 'info', message: 'Hi' });
            expect(useUIStore.getState().toastNotifications[0].id).toBeDefined();
        });

        it('removeNotification should remove by id', () => {
            useUIStore.getState().addNotification({ type: 'error', message: 'Fail' });
            const id = useUIStore.getState().toastNotifications[0].id;
            useUIStore.getState().removeNotification(id);
            expect(useUIStore.getState().toastNotifications).toHaveLength(0);
        });

        it('clearNotifications should empty queue', () => {
            useUIStore.getState().addNotification({ type: 'a', message: '1' });
            useUIStore.getState().addNotification({ type: 'b', message: '2' });
            useUIStore.getState().clearNotifications();
            expect(useUIStore.getState().toastNotifications).toEqual([]);
        });

        it('multiple notifications accumulate', () => {
            useUIStore.getState().addNotification({ type: 'a', message: '1' });
            useUIStore.getState().addNotification({ type: 'b', message: '2' });
            useUIStore.getState().addNotification({ type: 'c', message: '3' });
            expect(useUIStore.getState().toastNotifications).toHaveLength(3);
        });
    });

    // ═══════════════════════════════════════════════════════════
    // CONTEXT MENU
    // ═══════════════════════════════════════════════════════════
    describe('Context Menu', () => {
        it('setContextMenu should set menu data', () => {
            useUIStore.getState().setContextMenu({ x: 100, y: 200, type: 'user', data: {} });
            expect(useUIStore.getState().contextMenu).toEqual({ x: 100, y: 200, type: 'user', data: {} });
        });

        it('clearContextMenu should reset to null', () => {
            useUIStore.getState().setContextMenu({ x: 50, y: 50 });
            useUIStore.getState().clearContextMenu();
            expect(useUIStore.getState().contextMenu).toBeNull();
        });
    });

    // ═══════════════════════════════════════════════════════════
    // SEARCH QUERY
    // ═══════════════════════════════════════════════════════════
    describe('Search Query', () => {
        it('setSearchQuery should update searchQuery', () => {
            useUIStore.getState().setSearchQuery('hello');
            expect(useUIStore.getState().searchQuery).toBe('hello');
        });

        it('setSearchQuery with function updater', () => {
            useUIStore.getState().setSearchQuery('start');
            useUIStore.getState().setSearchQuery(prev => prev + ' more');
            expect(useUIStore.getState().searchQuery).toBe('start more');
        });
    });

    // ═══════════════════════════════════════════════════════════
    // DOWNLOAD PROGRESS
    // ═══════════════════════════════════════════════════════════
    describe('Download Progress', () => {
        it('setDownloadProgress should update progress', () => {
            useUIStore.getState().setDownloadProgress(50);
            expect(useUIStore.getState().downloadProgress).toBe(50);
        });

        it('setIsDownloading should toggle downloading state', () => {
            useUIStore.getState().setIsDownloading(true);
            expect(useUIStore.getState().isDownloading).toBe(true);
        });
    });
});
