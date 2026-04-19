// frontend/src/stores/useUIStore.ts
// UI state management (modals, panels, theme)
// 🎯 This store manages ALL modal/panel visibility state.
// All show* booleans from App.js are now centralized here.

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { UIStore } from '../types/store';

export const useUIStore = create<UIStore>()(
    devtools(
        persist(
            (set, get) => ({
                // --- MODAL STATES ---
                // Dynamic modal registry. Use openModal('name') / closeModal('name').
                // No need to pre-register modals — any string key works automatically.
                modals: {} as Record<string, boolean>,

                // --- APP STATE (migrated from App.js local state) ---
                animationState: 'start',
                setAnimationState: (val) =>
                    set({
                        animationState: typeof val === 'function' ? val(get().animationState) : val,
                    }),
                isConnected: false,
                connectionStatus: 'disconnected' as 'disconnected' | 'connecting' | 'connected',
                setIsConnected: (val) => {
                    const connected = typeof val === 'function' ? val(get().isConnected) : val;
                    set({
                        isConnected: connected,
                        connectionStatus: connected ? 'connected' : 'disconnected',
                    });
                },
                setConnectionStatus: (status: 'disconnected' | 'connecting' | 'connected') =>
                    set({ connectionStatus: status, isConnected: status === 'connected' }),

                // Global loading & error state
                isLoading: false,
                setLoading: (val: boolean | ((prev: boolean) => boolean)) =>
                    set({ isLoading: typeof val === 'function' ? val(get().isLoading) : val }),
                globalError: null as string | null,
                setError: (error: string | null) => set({ globalError: error }),
                clearError: () => set({ globalError: null }),

                // Toast notifications queue
                toastNotifications: [] as Array<{ id: number; type: string; message: string }>,
                addNotification: (notification: { type: string; message: string }) =>
                    set((state) => ({
                        toastNotifications: [
                            ...state.toastNotifications,
                            { id: Date.now(), ...notification },
                        ],
                    })),
                removeNotification: (id: number) =>
                    set((state) => ({
                        toastNotifications: state.toastNotifications.filter(
                            (n: any) => n.id !== id
                        ),
                    })),
                clearNotifications: () => set({ toastNotifications: [] }),
                updateStatusText: '',
                setUpdateStatusText: (val) =>
                    set({
                        updateStatusText:
                            typeof val === 'function' ? val(get().updateStatusText) : val,
                    }),
                downloadProgress: 0,
                setDownloadProgress: (val) =>
                    set({
                        downloadProgress:
                            typeof val === 'function' ? val(get().downloadProgress) : val,
                    }),
                isDownloading: false,
                setIsDownloading: (val) =>
                    set({
                        isDownloading: typeof val === 'function' ? val(get().isDownloading) : val,
                    }),
                searchQuery: '',
                setSearchQuery: (val) =>
                    set({ searchQuery: typeof val === 'function' ? val(get().searchQuery) : val }),
                dropTarget: null,
                setDropTarget: (val) =>
                    set({ dropTarget: typeof val === 'function' ? val(get().dropTarget) : val }),

                // --- MODAL DATA ---
                // Stores data associated with open modals (e.g., which user profile to show)
                modalData: {},

                // --- PANEL STATES ---
                panels: {
                    userList: true,
                    memberList: true,
                    serverList: true,
                    channelList: true,
                },

                // --- THEME ---
                theme: 'dark',
                accentColor: '#5865F2',

                // --- SIDEBAR ---
                sidebarCollapsed: false,
                mobileSidebarOpen: false,

                // --- CONTEXT MENU ---
                contextMenu: null, // { x, y, type, data }

                // --- ACTIONS ---
                openModal: (modalName, data = null) =>
                    set((state) => ({
                        modals: { ...state.modals, [modalName]: true },
                        modalData: data
                            ? { ...state.modalData, [modalName]: data }
                            : state.modalData,
                    })),

                closeModal: (modalName) =>
                    set((state) => ({
                        modals: { ...state.modals, [modalName]: false },
                        modalData: { ...state.modalData, [modalName]: undefined },
                    })),

                toggleModal: (modalName) =>
                    set((state) => ({
                        modals: { ...state.modals, [modalName]: !state.modals[modalName] },
                    })),

                closeAllModals: () =>
                    set((state) => ({
                        modals: Object.keys(state.modals).reduce((acc, key) => {
                            acc[key] = false;
                            return acc;
                        }, {}),
                        modalData: {},
                    })),

                getModalData: (modalName) => get().modalData[modalName],

                togglePanel: (panelName) =>
                    set((state) => ({
                        panels: { ...state.panels, [panelName]: !state.panels[panelName] },
                    })),

                /** Set the UI theme (dark/light). */
                setTheme: (theme) => set({ theme }),
                /** Set the accent color for the UI. */
                setAccentColor: (color) => set({ accentColor: color }),

                /** Toggle sidebar collapsed state. */
                toggleSidebar: () =>
                    set((state) => ({
                        sidebarCollapsed: !state.sidebarCollapsed,
                    })),

                /** Set mobile sidebar open state. */
                setMobileSidebarOpen: (isOpen) => set({ mobileSidebarOpen: isOpen }),

                /** Set the context menu position and data. */
                setContextMenu: (menu) => set({ contextMenu: menu }),
                /** Clear and close the context menu. */
                clearContextMenu: () => set({ contextMenu: null }),

                // --- RESET (for testing / logout) ---
                /** Reset transient UI state (keeps theme/accent/sidebar preferences). */
                resetTransient: () =>
                    set((state) => ({
                        modals: Object.keys(state.modals).reduce((acc, key) => {
                            acc[key] = false;
                            return acc;
                        }, {} as any),
                        modalData: {},
                        isLoading: false,
                        globalError: null,
                        toastNotifications: [],
                        contextMenu: null,
                        mobileSidebarOpen: false,
                        isConnected: false,
                        connectionStatus: 'disconnected' as const,
                    })),
            }),
            {
                name: 'pawscord-ui-store',
                partialize: (state) => ({
                    theme: state.theme,
                    accentColor: state.accentColor,
                    sidebarCollapsed: state.sidebarCollapsed,
                    panels: state.panels,
                }),
            }
        ),
        { name: 'pawscord-ui-store' }
    )
);

// --- SELECTORS (prevent unnecessary re-renders) ---
/** Select the current theme. */
export const selectTheme = (state: UIStore) => state.theme;
/** Select the accent color. */
export const selectAccentColor = (state: UIStore) => state.accentColor;
/** Select whether a specific modal is open. */
export const selectIsModalOpen = (modalName: string) => (state: UIStore) =>
    !!state.modals[modalName];
/** Select the connection status. */
export const selectConnectionStatus = (state: UIStore) => (state as any).connectionStatus;
/** Select the global loading state. */
export const selectIsLoading = (state: UIStore) => (state as any).isLoading;
/** Select the sidebar collapsed state. */
export const selectSidebarCollapsed = (state: UIStore) => state.sidebarCollapsed;
/** Select all toast notifications. */
export const selectToastNotifications = (state: UIStore) => (state as any).toastNotifications;

// Hook selectors
export const useTheme = () => useUIStore((s) => s.theme);
export const useAccentColor = () => useUIStore((s) => s.accentColor);
export const useSidebarCollapsed = () => useUIStore((s) => s.sidebarCollapsed);
export const useIsModalOpen = (name: string) => useUIStore((s) => !!s.modals[name]);
