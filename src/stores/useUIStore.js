// frontend/src/stores/useUIStore.js
// UI state management (modals, panels, theme)

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUIStore = create(
    persist(
        (set, get) => ({
            // --- MODAL STATES ---
            modals: {
                settings: false,
                createServer: false,
                invitePeople: false,
                serverSettings: false,
                userProfile: false,
                imageViewer: false,
                emojiPicker: false,
                gifPicker: false,
                stickerPicker: false,
                voiceSettings: false,
            },

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

            // --- ACTIONS ---
            openModal: (modalName) => set((state) => ({
                modals: { ...state.modals, [modalName]: true }
            })),

            closeModal: (modalName) => set((state) => ({
                modals: { ...state.modals, [modalName]: false }
            })),

            toggleModal: (modalName) => set((state) => ({
                modals: { ...state.modals, [modalName]: !state.modals[modalName] }
            })),

            closeAllModals: () => set((state) => ({
                modals: Object.keys(state.modals).reduce((acc, key) => {
                    acc[key] = false;
                    return acc;
                }, {})
            })),

            togglePanel: (panelName) => set((state) => ({
                panels: { ...state.panels, [panelName]: !state.panels[panelName] }
            })),

            setTheme: (theme) => set({ theme }),
            setAccentColor: (color) => set({ accentColor: color }),

            toggleSidebar: () => set((state) => ({
                sidebarCollapsed: !state.sidebarCollapsed
            })),

            setMobileSidebarOpen: (isOpen) => set({ mobileSidebarOpen: isOpen }),
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
    )
);
