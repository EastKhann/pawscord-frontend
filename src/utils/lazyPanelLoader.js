// ⚡ LAZY PANEL LOADER: Optimized Panel Loading System
// Reduces initial bundle size by lazy loading all panels

import React, { Suspense, lazy, useState, useCallback } from 'react';

// Loading fallback component
const PanelLoadingFallback = ({ name }) => (
    <div className="panel-loading-fallback">
        <div className="panel-loading-spinner"></div>
        <p>Loading {name || 'panel'}...</p>
        <style>{`
            .panel-loading-fallback {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 40px;
                color: #888;
            }
            .panel-loading-spinner {
                width: 40px;
                height: 40px;
                border: 3px solid rgba(88, 101, 242, 0.2);
                border-top-color: #5865F2;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `}</style>
    </div>
);

// Error fallback component
const PanelErrorFallback = ({ error, resetError }) => (
    <div className="panel-error-fallback">
        <span className="error-icon">⚠️</span>
        <h3>Failed to load panel</h3>
        <p>{error?.message || 'Unknown error'}</p>
        <button onClick={resetError}>Try Again</button>
        <style>{`
            .panel-error-fallback {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 40px;
                color: #f44336;
                text-align: center;
            }
            .error-icon { font-size: 48px; margin-bottom: 16px; }
            .panel-error-fallback h3 { margin: 0 0 8px; }
            .panel-error-fallback p { color: #888; margin: 0 0 16px; }
            .panel-error-fallback button {
                padding: 8px 24px;
                background: #5865F2;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
        `}</style>
    </div>
);

// ⚡ PANEL REGISTRY: All panels are lazy loaded
const panelRegistry = {
    // ====== MODERATION PANELS ======
    AutoModerationDashboard: lazy(() => import(/* webpackChunkName: "panel-moderation" */ '../components/AutoModerationDashboard')),
    AutoModerationPanel: lazy(() => import(/* webpackChunkName: "panel-moderation" */ '../components/AutoModerationPanel')),
    RaidProtectionPanel: lazy(() => import(/* webpackChunkName: "panel-moderation" */ '../components/RaidProtectionPanel')),
    ReportSystemPanel: lazy(() => import(/* webpackChunkName: "panel-moderation" */ '../components/ReportSystemPanel')),
    AuditLogPanel: lazy(() => import(/* webpackChunkName: "panel-moderation" */ '../components/AuditLogPanel')),
    UserWarningsPanel: lazy(() => import(/* webpackChunkName: "panel-moderation" */ '../components/UserWarningsPanel')),

    // ====== SETTINGS PANELS ======
    ServerSettingsModal: lazy(() => import(/* webpackChunkName: "panel-settings" */ '../components/ServerSettingsModal')),
    PollSettingsPanel: lazy(() => import(/* webpackChunkName: "panel-settings" */ '../components/panels/PollSettingsPanel')),

    // ====== FEATURE PANELS ======
    BookmarkPanel: lazy(() => import(/* webpackChunkName: "panel-features" */ '../components/BookmarkPanel')),
    ReactionAggregatePanel: lazy(() => import(/* webpackChunkName: "panel-features" */ '../components/panels/ReactionAggregatePanel')),
    MessageSummaryPanel: lazy(() => import(/* webpackChunkName: "panel-features" */ '../components/panels/MessageSummaryPanel')),
    InviteAuditPanel: lazy(() => import(/* webpackChunkName: "panel-features" */ '../components/panels/InviteAuditPanel')),
    VirtualTransactionHistoryPanel: lazy(() => import(/* webpackChunkName: "panel-features" */ '../components/panels/VirtualTransactionHistoryPanel')),
    StageChannelManagementPanel: lazy(() => import(/* webpackChunkName: "panel-features" */ '../components/panels/StageChannelManagementPanel')),

    // ====== 🚀 NEW FEATURES - 26 Ocak 2026 ======
    NewFeaturesPanel: lazy(() => import(/* webpackChunkName: "panel-new-features" */ '../components/panels/NewFeaturesPanel')),

    // ====== 🚀 EXTRA FEATURES - 26 Ocak 2026 (PART 2) ======
    ExtraFeaturesPanel: lazy(() => import(/* webpackChunkName: "panel-extra-features" */ '../components/panels/ExtraFeaturesPanel')),

    // ====== ADMIN PANELS ======
    AdminAnalyticsPanel: lazy(() => import(/* webpackChunkName: "panel-admin" */ '../components/AdminAnalyticsPanel')),
    AdminPanelModal: lazy(() => import(/* webpackChunkName: "panel-admin" */ '../components/AdminPanelModal')),

    // ====== MEDIA PANELS ======
    WhiteboardModal: lazy(() => import(/* webpackChunkName: "panel-media" */ '../components/WhiteboardModal')),
    SoundboardModal: lazy(() => import(/* webpackChunkName: "panel-media" */ '../components/SoundboardModal')),
    DJModal: lazy(() => import(/* webpackChunkName: "panel-media" */ '../components/DJModal')),
    CinemaModal: lazy(() => import(/* webpackChunkName: "panel-media" */ '../CinemaModal')),

    // ====== STORE PANELS ======
    CryptoStoreModal: lazy(() => import(/* webpackChunkName: "panel-store" */ '../components/CryptoStoreModal')),
    PremiumStoreModal: lazy(() => import(/* webpackChunkName: "panel-store" */ '../components/PremiumStoreModal')),
    ThemeStoreModal: lazy(() => import(/* webpackChunkName: "panel-store" */ '../components/ThemeStoreModal')),

    // ====== INTEGRATION PANELS ======
    WebhooksPanel: lazy(() => import(/* webpackChunkName: "panel-integrations" */ '../components/WebhooksPanel')),
    KanbanBoard: lazy(() => import(/* webpackChunkName: "panel-integrations" */ '../components/KanbanBoard')),

    // ====== 🎮 GAMING & ENTERTAINMENT ======
    TournamentSystem: lazy(() => import(/* webpackChunkName: "panel-gaming" */ '../components/TournamentSystem')),
    GiveawayPanel: lazy(() => import(/* webpackChunkName: "panel-gaming" */ '../components/GiveawayPanel')),
    ClipsSystem: lazy(() => import(/* webpackChunkName: "panel-gaming" */ '../components/ClipsSystem')),

    // ====== 🔐 SECURITY PANELS ======
    E2EEPanel: lazy(() => import(/* webpackChunkName: "panel-security" */ '../components/E2EEPanel')),
    WebAuthnPanel: lazy(() => import(/* webpackChunkName: "panel-security" */ '../components/WebAuthnPanel')),
    TwoFactorPanel: lazy(() => import(/* webpackChunkName: "panel-security" */ '../components/TwoFactorPanel')),

    // ====== 🎙️ VOICE & STREAMING ======
    StageChannelPanel: lazy(() => import(/* webpackChunkName: "panel-voice" */ '../components/StageChannelPanel')),
    LiveStreamPanel: lazy(() => import(/* webpackChunkName: "panel-voice" */ '../components/LiveStreamPanel')),
    VoiceRecordingPanel: lazy(() => import(/* webpackChunkName: "panel-voice" */ '../components/VoiceRecordingPanel')),

    // ====== 💬 FORUM & COMMUNITY ======
    ForumPanel: lazy(() => import(/* webpackChunkName: "panel-forum" */ '../components/ForumPanel')),
    TicketSystemPanel: lazy(() => import(/* webpackChunkName: "panel-forum" */ '../components/TicketSystemPanel')),
    SuggestionsPanel: lazy(() => import(/* webpackChunkName: "panel-forum" */ '../components/SuggestionsPanel')),

    // ====== 🎨 ECONOMY ======
    EconomySystemPanel: lazy(() => import(/* webpackChunkName: "panel-economy" */ '../components/EconomySystemPanel')),
    InventoryPanel: lazy(() => import(/* webpackChunkName: "panel-economy" */ '../components/InventoryPanel')),

    // ====== 📊 ANALYTICS ======
    ServerAnalyticsDashboard: lazy(() => import(/* webpackChunkName: "panel-analytics" */ '../components/ServerAnalyticsDashboard')),
    GrowthDashboard: lazy(() => import(/* webpackChunkName: "panel-analytics" */ '../components/GrowthDashboard')),
    MemberActivityDashboard: lazy(() => import(/* webpackChunkName: "panel-analytics" */ '../components/MemberActivityDashboard')),

    // ====== 🤖 BOT & AUTOMATION ======
    BotDeveloperPanel: lazy(() => import(/* webpackChunkName: "panel-bot" */ '../components/BotDeveloperPanel')),
    AutoRespondersPanel: lazy(() => import(/* webpackChunkName: "panel-bot" */ '../components/AutoRespondersPanel')),
    CustomCommandsPanel: lazy(() => import(/* webpackChunkName: "panel-bot" */ '../components/CustomCommandsPanel')),
};

// ⚡ LAZY PANEL WRAPPER
export const LazyPanel = ({ name, fallback, ...props }) => {
    const [error, setError] = useState(null);

    const Panel = panelRegistry[name];

    if (!Panel) {
        console.error(`[LazyPanel] Unknown panel: ${name}`);
        return <PanelErrorFallback error={{ message: `Unknown panel: ${name}` }} />;
    }

    if (error) {
        return <PanelErrorFallback error={error} resetError={() => setError(null)} />;
    }

    return (
        <Suspense fallback={fallback || <PanelLoadingFallback name={name} />}>
            <Panel {...props} />
        </Suspense>
    );
};

// ⚡ HOOK: Panel manager
export const usePanelManager = () => {
    const [openPanels, setOpenPanels] = useState(new Set());
    const [panelProps, setPanelProps] = useState({});

    const openPanel = useCallback((name, props = {}) => {
        setOpenPanels(prev => new Set([...prev, name]));
        setPanelProps(prev => ({ ...prev, [name]: props }));
    }, []);

    const closePanel = useCallback((name) => {
        setOpenPanels(prev => {
            const next = new Set(prev);
            next.delete(name);
            return next;
        });
    }, []);

    const togglePanel = useCallback((name, props = {}) => {
        if (openPanels.has(name)) {
            closePanel(name);
        } else {
            openPanel(name, props);
        }
    }, [openPanels, openPanel, closePanel]);

    const isPanelOpen = useCallback((name) => openPanels.has(name), [openPanels]);

    const getPanelProps = useCallback((name) => panelProps[name] || {}, [panelProps]);

    return {
        openPanels: Array.from(openPanels),
        openPanel,
        closePanel,
        togglePanel,
        isPanelOpen,
        getPanelProps
    };
};

// ⚡ PRELOAD PANEL: Load panel in background
export const preloadPanel = (name) => {
    const Panel = panelRegistry[name];
    if (Panel) {
        // Trigger the lazy load
        Panel._init?.();
    }
};

// ⚡ PRELOAD COMMON PANELS: Load frequently used panels
export const preloadCommonPanels = () => {
    const commonPanels = [
        'BookmarkPanel',
        'AdminPanelModal',
        'ServerSettingsModal'
    ];

    // Preload after initial render
    setTimeout(() => {
        commonPanels.forEach(preloadPanel);
    }, 3000);
};

// Export panel names for type safety
export const PanelNames = Object.keys(panelRegistry);

export default {
    LazyPanel,
    usePanelManager,
    preloadPanel,
    preloadCommonPanels,
    PanelNames
};
