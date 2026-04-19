// frontend/src/components/panels/NewFeaturesPanel.js
// 🚀 20 YENİ ÖZELLİK PANELİ - 26 Ocak 2026
// Decomposed: DataPanels.js + InteractivePanels.js

import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewFeaturesPanel.css';

// Re-export all sub-panels
export {
    QuickReactionsPanel,
    MessageStatsPanel,
    UserNotesPanel,
    ServerInsightsPanel,
    ActivityFeedPanel,
} from './NewFeaturesPanel/DataPanels';
export {
    UserBadgesPanel,
    FavoriteRoomsPanel,
    EngagementMetricsPanel,
    StreakTrackerPanel,
    VoiceEffectsPanel,
} from './NewFeaturesPanel/InteractivePanels';

// Import for local use in dashboard
import {
    QuickReactionsPanel,
    MessageStatsPanel,
    ActivityFeedPanel,
} from './NewFeaturesPanel/DataPanels';
import {
    UserBadgesPanel,
    FavoriteRoomsPanel,
    EngagementMetricsPanel,
    StreakTrackerPanel,
    VoiceEffectsPanel,
} from './NewFeaturesPanel/InteractivePanels';
import { useTranslation } from 'react-i18next';

const NewFeaturesPanel = ({ onClose }) => {
    const { t } = useTranslation();

    const [activeFeature, setActiveFeature] = useState(null);

    const features = [
        {
            id: 'stats',
            name: t('admin.panel.messageStats'),
            icon: '📊',
            component: MessageStatsPanel,
        },
        { id: 'streak', name: t('ui.gunluk_seri'), icon: '🔥', component: StreakTrackerPanel },
        { id: 'badges', name: 'Rozetlerim', icon: '🏅', component: UserBadgesPanel },
        {
            id: 'engagement',
            name: t('ui.engagement'),
            icon: '💫',
            component: EngagementMetricsPanel,
        },
        { id: 'favorites', name: 'Favori Odalar', icon: '⭐', component: FavoriteRoomsPanel },
        { id: 'activity', name: t('ui.aktivite_akisi'), icon: '📰', component: ActivityFeedPanel },
        {
            id: 'reactions',
            name: t('ui.hizli_tepkwithr'),
            icon: '🎯',
            component: QuickReactionsPanel,
        },
        { id: 'voice', name: 'Sound Effects', icon: '🎤', component: VoiceEffectsPanel },
    ];

    const ActiveComponent = features.find((f) => f.id === activeFeature)?.component;

    return (
        <div aria-label="new features panel" className="new-features-dashboard">
            <div className="panel-header">
                <h2>{t('🚀_yeni_özellikler')}</h2>
                <button onClick={onClose} className="close-btn">
                    ✕
                </button>
            </div>
            {activeFeature && ActiveComponent ? (
                <ActiveComponent onClose={() => setActiveFeature(null)} />
            ) : (
                <div className="features-grid">
                    {features.map((feature) => (
                        <button
                            key={feature.id}
                            className="feature-card"
                            onClick={() => setActiveFeature(feature.id)}
                        >
                            <span className="feature-icon">{feature.icon}</span>
                            <span className="feature-name">{feature.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

NewFeaturesPanel.propTypes = {
    onClose: PropTypes.func,
};
export default NewFeaturesPanel;
