// frontend/src/components/panels/ExtraFeaturesPanel.js
// Decomposed: DataPanels.js + InteractivePanels.js

import './ExtraFeaturesPanel.css';

// Re-export all sub-panels
export { ScheduledMessagesPanel, MoodStatusPanel, ServerTemplatesPanel, CustomCommandsPanel, ServerAnalyticsPanel } from './ExtraFeaturesPanel/DataPanels';
export { MemberLevelsPanel, WelcomeMessagesPanel, PrivacySettingsPanel, UserConnectionsPanel, ActivityStatusPanel } from './ExtraFeaturesPanel/InteractivePanels';

export const ExtraFeaturesPanel = ({ onClose, onOpenFeature }) => {
    const features = [
        { id: 'scheduled', name: 'Planlanmış Mesajlar', emoji: '📅', desc: 'İleri tarihli mesaj gönder' },
        { id: 'mood', name: 'Ruh Hali', emoji: '😊', desc: 'Ruh halini belirle' },
        { id: 'templates', name: 'Sunucu Şablonları', emoji: '🎨', desc: 'Hazır sunucu şablonları' },
        { id: 'commands', name: 'Özel Komutlar', emoji: '⚡', desc: 'Sunucu komutları oluştur' },
        { id: 'analytics', name: 'Sunucu Analitiği', emoji: '📈', desc: 'Detaylı istatistikler' },
        { id: 'levels', name: 'Seviye Sıralaması', emoji: '🏆', desc: 'Üye seviyeleri' },
        { id: 'welcome', name: 'Hoşgeldin Mesajları', emoji: '👋', desc: 'Otomatik karşılama' },
        { id: 'privacy', name: 'Gizlilik Ayarları', emoji: '🔒', desc: 'Gizlilik tercihleri' },
        { id: 'connections', name: 'Bağlı Hesaplar', emoji: '🔗', desc: 'Spotify, GitHub vs.' },
        { id: 'activity', name: 'Aktivite Durumu', emoji: '🎮', desc: 'Ne yaptığını göster' }
    ];

    return (
        <div className="extra-features-panel">
            <div className="panel-header">
                <h2>🚀 Ekstra Özellikler (20+)</h2>
                <button onClick={onClose} className="close-btn">✕</button>
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