// frontend/src/components/panels/NewFeaturesPanel.js
// 🚀 20 YENİ ÖZELLİK PANELİ - 26 Ocak 2026
// Decomposed: DataPanels.js + InteractivePanels.js

import { useState } from 'react';
import './NewFeaturesPanel.css';

// Re-export all sub-panels
export { QuickReactionsPanel, MessageStatsPanel, UserNotesPanel, ServerInsightsPanel, ActivityFeedPanel } from './NewFeaturesPanel/DataPanels';
export { UserBadgesPanel, FavoriteRoomsPanel, EngagementMetricsPanel, StreakTrackerPanel, VoiceEffectsPanel } from './NewFeaturesPanel/InteractivePanels';

// Import for local use in dashboard
import { QuickReactionsPanel, MessageStatsPanel, ActivityFeedPanel } from './NewFeaturesPanel/DataPanels';
import { UserBadgesPanel, FavoriteRoomsPanel, EngagementMetricsPanel, StreakTrackerPanel, VoiceEffectsPanel } from './NewFeaturesPanel/InteractivePanels';

const NewFeaturesPanel = ({ onClose }) => {
    const [activeFeature, setActiveFeature] = useState(null);

    const features = [
        { id: 'stats', name: 'Mesaj İstatistikleri', icon: '📊', component: MessageStatsPanel },
        { id: 'streak', name: 'Günlük Seri', icon: '🔥', component: StreakTrackerPanel },
        { id: 'badges', name: 'Rozetlerim', icon: '🏅', component: UserBadgesPanel },
        { id: 'engagement', name: 'Etkileşim', icon: '💫', component: EngagementMetricsPanel },
        { id: 'favorites', name: 'Favori Odalar', icon: '⭐', component: FavoriteRoomsPanel },
        { id: 'activity', name: 'Aktivite Akışı', icon: '📰', component: ActivityFeedPanel },
        { id: 'reactions', name: 'Hızlı Tepkiler', icon: '🎯', component: QuickReactionsPanel },
        { id: 'voice', name: 'Ses Efektleri', icon: '🎤', component: VoiceEffectsPanel },
    ];

    const ActiveComponent = features.find(f => f.id === activeFeature)?.component;

    return (
        <div className="new-features-dashboard">
            <div className="panel-header">
                <h2>🚀 Yeni Özellikler</h2>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>
            {activeFeature && ActiveComponent ? (
                <ActiveComponent onClose={() => setActiveFeature(null)} />
            ) : (
                <div className="features-grid">
                    {features.map((feature) => (
                        <button key={feature.id} className="feature-card" onClick={() => setActiveFeature(feature.id)}>
                            <span className="feature-icon">{feature.icon}</span>
                            <span className="feature-name">{feature.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NewFeaturesPanel;