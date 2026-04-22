// frontend/src/components/panels/ExtraFeaturesPanel.js
// Decomposed: DataPanels.js + InteractivePanels.js

import './ExtraFeaturesPanel.css';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Re-export all sub-panels
export {
    ScheduledMessagesPanel,
    MoodStatusPanel,
    ServerTemplatesPanel,
    CustomCommandsPanel,
    ServerAnalyticsPanel,
} from './ExtraFeaturesPanel/DataPanels';
export {
    MemberLevelsPanel,
    WelcomeMessagesPanel,
    PrivacySettingsPanel,
    UserConnectionsPanel,
    ActivityStatusPanel,
} from './ExtraFeaturesPanel/InteractivePanels';

export const ExtraFeaturesPanel = ({ onClose, onOpenFeature }) => {
    const { t } = useTranslation();

    const features = [
        {
            id: 'scheduled',
            name: t('ui.planlanmis_mesajlar'),
            emoji: '📅',
            desc: 'Send scheduled messages',
        },
        { id: 'mood', name: 'Mood', emoji: '😊', desc: 'Set your mood' },
        { id: 'templates', name: t('ui.server_sablonlari'), emoji: '🎨', desc: 'Server templates' },
        {
            id: 'commands',
            name: t('ui.ozel_komutlar'),
            emoji: '⚡',
            desc: 'Create custom commands',
        },
        {
            id: 'analytics',
            name: t('ui.server_analitigi'),
            emoji: '📈',
            desc: 'Detailed statistics',
        },
        { id: 'levels', name: t('ui.level_sortmasi'), emoji: '🏆', desc: 'Member levels' },
        { id: 'welcome', name: t('ui.welcome_mesajlari'), emoji: '👋', desc: 'Auto welcome' },
        { id: 'privacy', name: 'Privacy Settings', emoji: '🔒', desc: 'Privacy settings' },
        {
            id: 'connections',
            name: t('settings.tabs.connections.connectedAccounts'),
            emoji: '🔗',
            desc: 'Spotify, GitHub vs.',
        },
        { id: 'activity', name: 'Aktivite Statusu', emoji: '🎮', desc: 'Show what you are doing' },
    ];

    return (
        <div aria-label={t('extraFeaturesPanel.panel', 'Extra features panel')} className="extra-features-panel">
            <div className="panel-header">
                <h2>{t('🚀_ekstra_özellikler_20')}</h2>
                <button onClick={onClose} className="close-btn">
                    ✕
                </button>
            </div>
            <div className="features-grid">
                {features.map((feature) => (
                    <div
                        key={feature.id}
                        className="feature-card"
                        role="button"
                        tabIndex={0}
                        onClick={() => onOpenFeature && onOpenFeature(feature.id)}
                        onKeyDown={(e) =>
                            (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                        }
                    >
                        <span className="feature-emoji">{feature.emoji}</span>
                        <span className="feature-name">{feature.name}</span>
                        <span className="feature-desc">{feature.desc}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

ExtraFeaturesPanel.propTypes = {
    onClose: PropTypes.func,
    onOpenFeature: PropTypes.func,
};
export default ExtraFeaturesPanel;
