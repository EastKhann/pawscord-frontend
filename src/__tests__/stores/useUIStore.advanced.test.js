// frontend/src/__tests__/stores/useUIStore.advanced.test.js
// Advanced UI Store Tests — loading, error, sidebar, context menu, search, download progress
import { describe, it, expect, beforeEach } from 'vitest';
import { useUIStore } from '../../stores/useUIStore';

describe('useUIStore — Advanced', () => {
    beforeEach(() => {
        const state = useUIStore.getState();
        state.closeAllModals();
        useUIStore.setState({
            isLoading: false,
            globalError: null,
            toastNotifications: [],
            sidebarCollapsed: false,
            mobileSidebarOpen: false,
            contextMenu: null,
            searchQuery: '',
            downloadProgress: 0,
            isDownloading: false,
            isConnected: false,
            connectionStatus: 'disconnected',
        });
    });

    // ─── LOADING STATE ───
    describe('Loading state', () => {
        it('setLoading should set loading to true', () => {
            useUIStore.getState().setLoading(true);
            expect(useUIStore.getState().isLoading).toBe(true);
        });

        it('setLoading should accept function updater', () => {
            useUIStore.getState().setLoading(true);
            useUIStore.getState().setLoading((prev) => !prev);
            expect(useUIStore.getState().isLoading).toBe(false);
        });
    });

    // ─── ERROR STATE ───
    describe('Error state', () => {
        it('setError should set global error message', () => {
            useUIStore.getState().setError('Something went wrong');
            expect(useUIStore.getState().globalError).toBe('Something went wrong');
        });

        it('clearError should clear global error', () => {
            useUIStore.getState().setError('Error!');
            useUIStore.getState().clearError();
            expect(useUIStore.getState().globalError).toBeNull();
        });

        it('setError with null should clear the error', () => {
            useUIStore.getState().setError('Error!');
            useUIStore.getState().setError(null);
            expect(useUIStore.getState().globalError).toBeNull();
        });
    });

    // ─── SIDEBAR ───
    describe('Sidebar', () => {
        it('toggleSidebar should toggle collapsed state', () => {
            expect(useUIStore.getState().sidebarCollapsed).toBe(false);
            useUIStore.getState().toggleSidebar();
            expect(useUIStore.getState().sidebarCollapsed).toBe(true);
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

    // ─── CONTEXT MENU ───
    describe('Context menu', () => {
        it('setContextMenu should store menu data', () => {
            const menuData = { x: 100, y: 200, type: 'message', data: { id: 5 } };
            useUIStore.getState().setContextMenu(menuData);
            expect(useUIStore.getState().contextMenu).toEqual(menuData);
        });

        it('clearContextMenu should set to null', () => {
            useUIStore.getState().setContextMenu({ x: 50, y: 50, type: 'user' });
            useUIStore.getState().clearContextMenu();
            expect(useUIStore.getState().contextMenu).toBeNull();
        });
    });

    // ─── TOAST NOTIFICATIONS ───
    describe('Toast notifications — lifecycle', () => {
        it('should add multiple notifications', () => {
            const store = useUIStore.getState();
            store.addNotification({ message: 'First', type: 'info' });
            store.addNotification({ message: 'Second', type: 'error' });
            store.addNotification({ message: 'Third', type: 'success' });
            expect(useUIStore.getState().toastNotifications).toHaveLength(3);
        });

        it('each notification should include an id and message', () => {
            const store = useUIStore.getState();
            store.addNotification({ message: 'A', type: 'info' });
            const toasts = useUIStore.getState().toastNotifications;
            expect(toasts).toHaveLength(1);
            expect(toasts[0]).toHaveProperty('id');
            expect(toasts[0].message).toBe('A');
            expect(toasts[0].type).toBe('info');
        });

        it('removeNotification should remove toast by id', () => {
            const store = useUIStore.getState();
            store.addNotification({ message: 'Toast1' });
            const toasts = useUIStore.getState().toastNotifications;
            expect(toasts).toHaveLength(1);
            const id = toasts[0].id;

            store.removeNotification(id);
            expect(useUIStore.getState().toastNotifications).toHaveLength(0);
        });

        it('clearNotifications should empty the queue', () => {
            const store = useUIStore.getState();
            store.addNotification({ message: 'A' });
            store.addNotification({ message: 'B' });
            store.clearNotifications();
            expect(useUIStore.getState().toastNotifications).toHaveLength(0);
        });
    });

    // ─── SEARCH QUERY ───
    describe('Search query', () => {
        it('setSearchQuery should update search text', () => {
            useUIStore.getState().setSearchQuery('hello world');
            expect(useUIStore.getState().searchQuery).toBe('hello world');
        });

        it('setSearchQuery should accept function updater', () => {
            useUIStore.getState().setSearchQuery('hello');
            useUIStore.getState().setSearchQuery((prev) => prev + ' world');
            expect(useUIStore.getState().searchQuery).toBe('hello world');
        });

        it('should clear search query', () => {
            useUIStore.getState().setSearchQuery('search term');
            useUIStore.getState().setSearchQuery('');
            expect(useUIStore.getState().searchQuery).toBe('');
        });
    });

    // ─── DOWNLOAD PROGRESS ───
    describe('Download progress', () => {
        it('should track download progress', () => {
            useUIStore.getState().setDownloadProgress(50);
            expect(useUIStore.getState().downloadProgress).toBe(50);
        });

        it('should track downloadg state', () => {
            useUIStore.getState().setIsDownloading(true);
            expect(useUIStore.getState().isDownloading).toBe(true);
        });

        it('should handle full download lifecycle', () => {
            const store = useUIStore.getState();
            store.setIsDownloading(true);
            store.setDownloadProgress(25);
            expect(useUIStore.getState().isDownloading).toBe(true);

            store.setDownloadProgress(100);
            store.setIsDownloading(false);
            expect(useUIStore.getState().downloadProgress).toBe(100);
            expect(useUIStore.getState().isDownloading).toBe(false);
        });
    });

    // ─── MODAL WITH DATA ───
    describe('Modal with data — advanced', () => {
        it('openModal with user data should store it in modalData', () => {
            useUIStore.getState().openModal('userProfile', { userId: 42, username: 'alice' });
            expect(useUIStore.getState().modals.userProfile).toBe(true);
            expect(useUIStore.getState().modalData.userProfile).toEqual({
                userId: 42,
                username: 'alice',
            });
        });

        it('getModalData should return stored data', () => {
            useUIStore.getState().openModal('settings', { tab: 'privacy' });
            const data = useUIStore.getState().getModalData('settings');
            expect(data).toEqual({ tab: 'privacy' });
        });

        it('getModalData should return undefined for unopened modal', () => {
            const data = useUIStore.getState().getModalData('nonexistent');
            expect(data).toBeUndefined();
        });
    });

    // ─── CONNECTION STATUS ───
    describe('Connection status', () => {
        it('setConnectionStatus to connected should also set isConnected', () => {
            useUIStore.getState().setConnectionStatus('connected');
            expect(useUIStore.getState().connectionStatus).toBe('connected');
            expect(useUIStore.getState().isConnected).toBe(true);
        });

        it('setConnectionStatus to disconnected should clear isConnected', () => {
            useUIStore.getState().setConnectionStatus('connected');
            useUIStore.getState().setConnectionStatus('disconnected');
            expect(useUIStore.getState().isConnected).toBe(false);
        });

        it('setIsConnected with function updater should toggle', () => {
            useUIStore.getState().setIsConnected(true);
            expect(useUIStore.getState().isConnected).toBe(true);
            useUIStore.getState().setIsConnected((prev) => !prev);
            expect(useUIStore.getState().isConnected).toBe(false);
        });
    });

    // ─── PANEL TOGGLES ───
    describe('Panel toggles', () => {
        it('should toggle multiple panels independently', () => {
            useUIStore.getState().togglePanel('memberList');
            useUIStore.getState().togglePanel('channelList');
            const panels = useUIStore.getState().panels;
            expect(panels.memberList).toBe(false);
            expect(panels.channelList).toBe(false);
            expect(panels.serverList).toBe(true);
        });

        it('double toggle should restore original state', () => {
            useUIStore.getState().togglePanel('userList');
            useUIStore.getState().togglePanel('userList');
            expect(useUIStore.getState().panels.userList).toBe(true);
        });
    });
});
