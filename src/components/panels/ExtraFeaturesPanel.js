// frontend/src/components/panels/ExtraFeaturesPanel.js
// Decomposed: DataPanels.js + InteractivePanels.js

import './ExtraFeaturesPanel.css';

// Re-export all sub-panels
export { ScheduledMessagesPanel, MoodStatusPanel, ServerTemplatesPanel, CustomCommandsPanel, ServerAnalyticsPanel } from './ExtraFeaturesPanel/DataPanels';
export { MemberLevelsPanel, WelcomeMessagesPanel, PrivacySettingsPanel, UserConnectionsPanel, ActivityStatusPanel } from './ExtraFeaturesPanel/InteractivePanels';

export const ExtraFeaturesPanel = ({ onClose, onOpenFeature }) => {
    const features = [
        { id: 'scheduled', name: 'Planlanm\u0131\u015F Mesajlar', emoji: '\uD83D\uDCC5', desc: '\u0130leri tarihli mesaj g\u00F6nder' },
        { id: 'mood', name: 'Ruh Hali', emoji: '\uD83D\uDE0A', desc: 'Ruh halini belirle' },
        { id: 'templates', name: 'Sunucu \u015Eablonlar\u0131', emoji: '\uD83C\uDFA8', desc: 'Haz\u0131r sunucu \u015Fablonlar\u0131' },
        { id: 'commands', name: '\u00D6zel Komutlar', emoji: '\u26A1', desc: 'Sunucu komutlar\u0131 olu\u015Ftur' },
        { id: 'analytics', name: 'Sunucu Analiti\u011Fi', emoji: '\uD83D\uDCC8', desc: 'Detayl\u0131 istatistikler' },
        { id: 'levels', name: 'Seviye S\u0131ralamas\u0131', emoji: '\uD83C\uDFC6', desc: '\u00DCye seviyeleri' },
        { id: 'welcome', name: 'Ho\u015Fgeldin Mesajlar\u0131', emoji: '\uD83D\uDC4B', desc: 'Otomatik kar\u015F\u0131lama' },
        { id: 'privacy', name: 'Gizlilik Ayarlar\u0131', emoji: '\uD83D\uDD12', desc: 'Gizlilik tercihleri' },
        { id: 'connections', name: 'Ba\u011Fl\u0131 Hesaplar', emoji: '\uD83D\uDD17', desc: 'Spotify, GitHub vs.' },
        { id: 'activity', name: 'Aktivite Durumu', emoji: '\uD83C\uDFAE', desc: 'Ne yapt\u0131\u011F\u0131n\u0131 g\u00F6ster' }
    ];

    return (
        <div className="extra-features-panel">
            <div className="panel-header">
                <h2>\uD83D\uDE80 Ekstra \u00D6zellikler (20+)</h2>
                <button onClick={onClose} className="close-btn">\u2715</button>
            </div>
            <div className="features-grid">
                {features.map(feature => (
                    <div key={feature.id} className="feature-card" onClick={() => onOpenFeature && onOpenFeature(feature.id)}>
                        <span className="feature-emoji">{feature.emoji}</span>
                        <span className="feature-name">{feature.name}</span>
                        <span className="feature-desc">{feature.desc}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExtraFeaturesPanel;