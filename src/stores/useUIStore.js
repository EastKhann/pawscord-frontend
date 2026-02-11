// frontend/src/stores/useUIStore.js
// UI state management (modals, panels, theme)
// 🎯 This store manages ALL modal/panel visibility state.
// App.js modal booleans should migrate here incrementally.

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUIStore = create(
    persist(
        (set, get) => ({
            // --- MODAL STATES ---
            // All modal visibility flags. Add new modals here instead of App.js useState.
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
                // ─── Migrated from App.js ───
                friendsList: false,
                notifications: false,
                searchPanel: false,
                pinnedMessages: false,
                threadPanel: false,
                memberProfile: false,
                channelSettings: false,
                roleEditor: false,
                banList: false,
                auditLog: false,
                welcomeMessages: false,
                serverAnalytics: false,
                botStore: false,
                storePanel: false,
                premiumPanel: false,
                customStatus: false,
                noteEditor: false,
                bookmarks: false,
                pollCreator: false,
                eventCreator: false,
                reminderCreator: false,
                fileManager: false,
                codeRunner: false,
                musicPlayer: false,
                miniGames: false,
                whiteboard: false,
                kanban: false,
                pomodoro: false,
                collaboration: false,
                screenShare: false,
                videoCall: false,
                announcementPanel: false,
                scheduledMessages: false,
                messageTemplates: false,
                automod: false,
                serverBackup: false,
                webhookManager: false,
                apiDashboard: false,
                cryptoPanel: false,
                nftGallery: false,
                gameTournaments: false,
                achievementPanel: false,
                leaderboard: false,
                petPanel: false,
                avatarStudio: false,
                reportModal: false,
                feedbackModal: false,
                keyboardShortcuts: false,
                languageSelector: false,
                accessibilityPanel: false,
                developerTools: false,
            },

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
            contextMenu: null,  // { x, y, type, data }

            // --- ACTIONS ---
            openModal: (modalName, data = null) => set((state) => ({
                modals: { ...state.modals, [modalName]: true },
                modalData: data ? { ...state.modalData, [modalName]: data } : state.modalData
            })),

            closeModal: (modalName) => set((state) => ({
                modals: { ...state.modals, [modalName]: false },
                modalData: { ...state.modalData, [modalName]: undefined }
            })),

            toggleModal: (modalName) => set((state) => ({
                modals: { ...state.modals, [modalName]: !state.modals[modalName] }
            })),

            closeAllModals: () => set((state) => ({
                modals: Object.keys(state.modals).reduce((acc, key) => {
                    acc[key] = false;
                    return acc;
                }, {}),
                modalData: {}
            })),

            getModalData: (modalName) => get().modalData[modalName],

            togglePanel: (panelName) => set((state) => ({
                panels: { ...state.panels, [panelName]: !state.panels[panelName] }
            })),

            setTheme: (theme) => set({ theme }),
            setAccentColor: (color) => set({ accentColor: color }),

            toggleSidebar: () => set((state) => ({
                sidebarCollapsed: !state.sidebarCollapsed
            })),

            setMobileSidebarOpen: (isOpen) => set({ mobileSidebarOpen: isOpen }),

            setContextMenu: (menu) => set({ contextMenu: menu }),
            clearContextMenu: () => set({ contextMenu: null }),
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
