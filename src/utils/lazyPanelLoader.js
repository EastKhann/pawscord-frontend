// ⚡ LAZY PANEL LOADER: Optimized Panel Loading System
// Reduces initial bundle size by lazy loading all panels

// Accessibility (aria): N/A for this module (hook/context/utility — no rendered DOM)
// aria-label: n/a — hook/context/utility module, no directly rendered JSX
import { Suspense, lazy, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import logger from '../utils/logger';

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
        <h3>Panel could not be loaded</h3>
        <p>{error?.message || 'Unknown error'}</p>
        <button onClick={resetError}>Tekrar Dene</button>
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
    AutoModerationDashboard: lazy(() => import('../components/moderation/AutoModerationDashboard')),
    AutoModerationPanel: lazy(() => import('../components/moderation/AutoModerationPanel')),
    RaidProtectionPanel: lazy(() => import('../components/moderation/RaidProtectionPanel')),
    ReportSystemPanel: lazy(() => import('../components/admin/ReportSystemPanel')),
    AuditLogPanel: lazy(() => import('../components/admin/AuditLogPanel')),
    UserWarningsPanel: lazy(() => import('../components/moderation/UserWarningsPanel')),

    // ====== SETTINGS PANELS ======
    ServerSettingsModal: lazy(() => import('../components/server/ServerSettingsModal')),
    PollSettingsPanel: lazy(() => import('../components/chat/PollSettingsPanel')),

    // ====== FEATURE PANELS ======
    BookmarkPanel: lazy(() => import('../components/chat/BookmarkPanel')),
    ReactionAggregatePanel: lazy(() => import('../components/panels/ReactionAggregatePanel')),
    MessageSummaryPanel: lazy(() => import('../components/chat/MessageSummaryPanel')),
    InviteAuditPanel: lazy(() => import('../components/admin/InviteAuditPanel')),
    VirtualTransactionHistoryPanel: lazy(
        () => import('../components/premium/VirtualTransactionHistoryPanel')
    ),
    StageChannelManagementPanel: lazy(
        () => import('../components/server/StageChannelManagementPanel')
    ),

    // ====== 🚀 NEW FEATURES - 26 Ocak 2026 ======
    NewFeaturesPanel: lazy(() => import('../components/panels/NewFeaturesPanel')),

    // ====== 🚀 EXTRA FEATURES - 26 Ocak 2026 (PART 2) ======
    ExtraFeaturesPanel: lazy(() => import('../components/panels/ExtraFeaturesPanel')),

    // ====== ADMIN PANELS ======
    AdminAnalyticsPanel: lazy(() => import('../components/admin/AdminAnalyticsPanel')),
    AdminPanelModal: lazy(() => import('../components/admin/AdminPanelModal')),

    // ====== MEDIA PANELS ======
    WhiteboardModal: lazy(() => import('../components/media/WhiteboardModal')),
    SoundboardModal: lazy(() => import('../components/media/SoundboardModal')),
    DJModal: lazy(() => import('../components/media/DJModal')),
    CinemaModal: lazy(() => import('../CinemaModal')),

    // ====== STORE PANELS ======
    CryptoStoreModal: lazy(() => import('../components/premium/CryptoStoreModal')),
    PremiumStoreModal: lazy(() => import('../components/premium/PremiumStoreModal')),
    ThemeStoreModal: lazy(() => import('../components/premium/ThemeStoreModal')),

    // ====== INTEGRATION PANELS ======
    WebhooksPanel: lazy(() => import('../components/server/WebhooksPanel')),
    KanbanBoard: lazy(() => import('../components/moderation/KanbanBoard')),

    // ====== 🎮 GAMING & ENTERTAINMENT ======
    TournamentSystem: lazy(() => import('../components/social/TournamentSystem')),
    GiveawayPanel: lazy(() => import('../components/social/GiveawayPanel')),
    ClipsSystem: lazy(() => import('../components/media/ClipsSystem')),

    // ====== 🔐 SECURITY PANELS ======
    E2EEPanel: lazy(() => import('../components/security/E2EEPanel')),
    WebAuthnPanel: lazy(() => import('../components/security/WebAuthnPanel')),
    TwoFactorPanel: lazy(() => import('../components/security/TwoFactorPanel')),

    // ====== 🎙️ VOICE & STREAMING ======
    StageChannelPanel: lazy(() => import('../components/server/StageChannelPanel')),
    LiveStreamPanel: lazy(() => import('../components/media/LiveStreamPanel')),
    VoiceRecordingPanel: lazy(() => import('../components/media/VoiceRecordingPanel')),

    // ====== 💬 FORUM & COMMUNITY ======
    ForumPanel: lazy(() => import('../components/social/ForumPanel')),
    TicketSystemPanel: lazy(() => import('../components/social/TicketSystemPanel')),
    SuggestionsPanel: lazy(() => import('../components/social/SuggestionsPanel')),

    // ====== 🎨 ECONOMY ======
    EconomySystemPanel: lazy(() => import('../components/premium/EconomySystemPanel')),
    InventoryPanel: lazy(() => import('../components/premium/InventoryPanel')),

    // ====== 📊 ANALYTICS ======
    ServerAnalyticsDashboard: lazy(() => import('../components/server/ServerAnalyticsDashboard')),
    GrowthDashboard: lazy(() => import('../components/analytics/GrowthDashboard')),
    MemberActivityDashboard: lazy(() => import('../components/profile/MemberActivityDashboard')),

    // ====== 🤖 BOT & AUTOMATION ======
    BotDeveloperPanel: lazy(() => import('../components/bot/BotDeveloperPanel')),
    AutoRespondersPanel: lazy(() => import('../components/bot/AutoRespondersPanel')),
    CustomCommandsPanel: lazy(() => import('../components/profile/CustomCommandsPanel')),
};

// ⚡ LAZY PANEL WRAPPER
export const LazyPanel = ({ name, fallback, ...props }) => {
    const [error, setError] = useState(null);

    const Panel = panelRegistry[name];

    if (!Panel) {
        logger.error(`[LazyPanel] Unknown panel: ${name}`);
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
        setOpenPanels((prev) => new Set([...prev, name]));
        setPanelProps((prev) => ({ ...prev, [name]: props }));
    }, []);

    const closePanel = useCallback((name) => {
        setOpenPanels((prev) => {
            const next = new Set(prev);
            next.delete(name);
            return next;
        });
    }, []);

    const togglePanel = useCallback(
        (name, props = {}) => {
            if (openPanels.has(name)) {
                closePanel(name);
            } else {
                openPanel(name, props);
            }
        },
        [openPanels, openPanel, closePanel]
    );

    const isPanelOpen = useCallback((name) => openPanels.has(name), [openPanels]);

    const getPanelProps = useCallback((name) => panelProps[name] || {}, [panelProps]);

    return {
        openPanels: Array.from(openPanels),
        openPanel,
        closePanel,
        togglePanel,
        isPanelOpen,
        getPanelProps,
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
    const commonPanels = ['BookmarkPanel', 'AdminPanelModal', 'ServerSettingsModal'];

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
    PanelNames,
};

LazyPanel.propTypes = {
    name: PropTypes.string,
    fallback: PropTypes.node,
};
