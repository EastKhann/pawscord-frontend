// frontend/src/stores/useUIStore.js
// UI state management (modals, panels, theme)
// 🎯 This store manages ALL modal/panel visibility state.
// All show* booleans from App.js are now centralized here.

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUIStore = create(
    persist(
        (set, get) => ({
            // --- MODAL STATES ---
            // All modal visibility flags. Dynamic keys are auto-created by openModal().
            modals: {
                // Core UI
                settings: false,
                createServer: false,
                invitePeople: false,
                serverSettings: false,
                userProfile: false,
                imageViewer: false,

                // Migrated from App.js useState(false) — 191 modals
                groupModal: false,
                soundboard: false,
                whiteboard: false,
                encModal: false,
                templateModal: false,
                snippetModal: false,
                pollModal: false,
                profilePanel: false,
                pinned: false,
                gifPicker: false,
                cinema: false,
                stickerPicker: false,
                store: false,
                themeStore: false,
                analytics: false,
                adminPanel: false,
                webhooks: false,
                modTools: false,
                vanityURL: false,
                // Moderation
                autoModeration: false,
                raidProtection: false,
                reportSystem: false,
                auditLog: false,
                userWarnings: false,
                autoResponder: false,
                // Features
                bookmarks: false,
                readLater: false,
                mentionsInbox: false,
                customStatus: false,
                channelPermissions: false,
                messageThreads: false,
                moderatorNotes: false,
                serverRoles: false,
                notificationPrefs: false,
                messageOCR: false,
                massActions: false,
                // Analytics & Tracking
                reactionAnalytics: false,
                linkClickTracking: false,
                joinLeaveLogs: false,
                userActivity: false,
                nicknameHistory: false,
                fieldChangeTracking: false,
                inviteAnalytics: false,
                // Content & Moderation
                contentScanner: false,
                ephemeralMessages: false,
                topicHistory: false,
                drafts: false,
                serverNicknames: false,
                // Server Features
                serverBoost: false,
                roomWebhooks: false,
                oAuthApps: false,
                autoResponders: false,
                // Security & Privacy
                sessionManagement: false,
                gDPRExport: false,
                dataRetention: false,
                twoFactorSetup: false,
                // Communication
                enhancedPolls: false,
                voiceTranscripts: false,
                inviteExport: false,
                // Search & Analytics
                advancedSearch: false,
                growthMetrics: false,
                linkPreview: false,
                // Store & Gamification
                inventory: false,
                waitlist: false,
                referralRewards: false,
                miniGames: false,
                projectCollaboration: false,
                avatarStudio: false,
                timeoutMute: false,
                serverThemes: false,
                keywordMutes: false,
                welcomeTemplates: false,
                stickyMessages: false,
                messageTemplates: false,
                messageExport: false,
                archivedRooms: false,
                slowMode: false,
                emojiManagement: false,
                // Core UX
                userSettings: false,
                keyboardShortcuts: false,
                commandPalette: false,
                serverDiscovery: false,
                appearanceSettings: false,
                languageSelector: false,
                changelog: false,
                logoutConfirm: false,
                notificationSounds: false,
                quickSwitcher: false,
                // Security
                loginHistory: false,
                securitySettings: false,
                privacySettings: false,
                accountDeletion: false,
                blockList: false,
                e2EESettings: false,
                // Communication
                threadView: false,
                scheduledMessages: false,
                reminders: false,
                forum: false,
                stageChannel: false,
                videoCall: false,
                voiceSettings: false,
                messageSearch: false,
                watchTogether: false,
                // Server Management
                autoRoles: false,
                reactionRoles: false,
                welcomeMessages: false,
                eventCalendar: false,
                giveaway: false,
                ticketSystem: false,
                starboard: false,
                serverBackup: false,
                banAppeals: false,
                customCommands: false,
                levelingSystem: false,
                liveStream: false,
                // Engagement
                achievements: false,
                birthdaySystem: false,
                premium: false,
                musicPlayer: false,
                botMarketplace: false,
                profileCustomization: false,
                integrationHub: false,
                tournaments: false,
                // Advanced
                highlights: false,
                customEmbed: false,
                spotifyIntegration: false,
                serverClone: false,
                weeklyChallenges: false,
                featureHub: false,
                // Moderation Tools
                moderatorTools: false,
                aIModeration: false,
                spamDetection: false,
                auditLogs: false,
                banHistory: false,
                moderationLogs: false,
                securityAlerts: false,
                // Communication
                gIFPicker: false,
                pollCreator: false,
                stickers: false,
                savedMessages: false,
                notificationsCenter: false,
                messageSummary: false,
                translation: false,
                // Server Management
                channelSettings: false,
                inviteModal: false,
                serverTemplates: false,
                serverAnalytics: false,
                rolesManager: false,
                welcomeScreenEditor: false,
                communitySettings: false,
                inviteLinkManager: false,
                // Bot/Dev
                botBuilder: false,
                botDevPortal: false,
                webhookManager: false,
                aPIKeys: false,
                slashCommands: false,
                codeRunner: false,
                // Profile & Social
                profileCard: false,
                userNotes: false,
                statusPicker: false,
                mutuals: false,
                profileShowcase: false,
                sessionManager: false,
                // Premium
                coinStore: false,
                premiumManagement: false,
                subscriptionManager: false,
                giftPremium: false,
                premiumMarketplace: false,
                themeMarketplace: false,
                // Advanced
                aIChatbot: false,
                codeEditor: false,
                screenShare: false,
                liveStreamModal: false,
                advancedAnalytics: false,
                fileManager: false,
                reports: false,
                errorReporting: false,
                avatarCropper: false,
                downloadModal: false,
                summary: false,
                dJ: false,
                notifications: false,
                toolbarMenu: false,
                paymentPanel: false,
                storeModal: false,
                dailyRewards: false,
                aPIUsagePanel: false,
                exportJobsPanel: false,
                scheduledAnnouncements: false,
                connectionsPanel: false,
                passwordSetupModal: false,
            },

            // --- APP STATE (migrated from App.js local state) ---
            animationState: 'start',
            setAnimationState: (val) => set({ animationState: typeof val === 'function' ? val(get().animationState) : val }),
            isConnected: false,
            connectionStatus: 'disconnected', // 'disconnected' | 'connecting' | 'connected'
            setIsConnected: (val) => {
                const connected = typeof val === 'function' ? val(get().isConnected) : val;
                set({ isConnected: connected, connectionStatus: connected ? 'connected' : 'disconnected' });
            },
            setConnectionStatus: (status) => set({ connectionStatus: status, isConnected: status === 'connected' }),

            // Global loading & error state
            isLoading: false,
            setLoading: (val) => set({ isLoading: typeof val === 'function' ? val(get().isLoading) : val }),
            globalError: null,
            setError: (error) => set({ globalError: error }),
            clearError: () => set({ globalError: null }),

            // Toast notifications queue
            toastNotifications: [],
            addNotification: (notification) => set(state => ({
                toastNotifications: [...state.toastNotifications, { id: Date.now(), ...notification }]
            })),
            removeNotification: (id) => set(state => ({
                toastNotifications: state.toastNotifications.filter(n => n.id !== id)
            })),
            clearNotifications: () => set({ toastNotifications: [] }),
            updateStatusText: '',
            setUpdateStatusText: (val) => set({ updateStatusText: typeof val === 'function' ? val(get().updateStatusText) : val }),
            downloadProgress: 0,
            setDownloadProgress: (val) => set({ downloadProgress: typeof val === 'function' ? val(get().downloadProgress) : val }),
            isDownloading: false,
            setIsDownloading: (val) => set({ isDownloading: typeof val === 'function' ? val(get().isDownloading) : val }),
            searchQuery: '',
            setSearchQuery: (val) => set({ searchQuery: typeof val === 'function' ? val(get().searchQuery) : val }),
            dropTarget: null,
            setDropTarget: (val) => set({ dropTarget: typeof val === 'function' ? val(get().dropTarget) : val }),

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
