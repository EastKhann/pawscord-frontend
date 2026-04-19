import { useState } from 'react';
import PropTypes from 'prop-types';
import usePrivacySettings, { SECTIONS } from '../PrivacySettingsPanel/usePrivacySettings';
import './PrivacySettingsPanel.css';
import { useTranslation } from 'react-i18next';

const ToggleItem = ({ label, desc, checked, onChange }) => (
    <div className="setting-item">
        <div className="setting-info">
            <div className="setting-label">{label}</div>
            <div className="setting-desc">{desc}</div>
        </div>
        <label className="toggle-switch">
            <input type="checkbox" checked={checked} onChange={onChange} aria-label="checkbox" />
            <span className="slider" />
        </label>
    </div>
);

const PrivacySettingsPanel = ({ onClose }) => {
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    const p = usePrivacySettings();

    if (p.loading) {
        return (
            <div className="privacy-settings-overlay">
                <div className="privacy-settings-panel">
                    <div className="loading-state">
                        <div className="spinner" />
                        <p>{t('privacy.loading')}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="privacy-settings-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="privacy-settings-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="privacy-settings-header">
                    <h2>🔒 {t('privacy.title')}</h2>
                    <button aria-label="Close" className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="privacy-settings-content">
                    {SECTIONS.map((section, si) => (
                        <div key={si} className="settings-section">
                            <h3>
                                {section.titleIcon} {t(section.titleKey)}
                            </h3>
                            <div className="settings-group">
                                {section.toggles.map((tog) => (
                                    <ToggleItem
                                        key={tog.key}
                                        label={t(tog.labelKey)}
                                        desc={t(tog.descKey)}
                                        checked={p.settings[tog.key]}
                                        onChange={() => p.toggleSetting(tog.key)}
                                    />
                                ))}
                            </div>
                            {section.hasExport && (
                                <button
                                    aria-label={t('privacy.exportData')}
                                    className="export-data-btn"
                                    onClick={p.requestDataExport}
                                >
                                    📥 {t('privacy.exportData')}
                                </button>
                            )}
                        </div>
                    ))}

                    {/* Message Filtering - special section */}
                    <div className="settings-section">
                        <h3>🛡️ {t('privacy.messageFiltering')}</h3>
                        <div className="settings-group">
                            <div className="setting-item">
                                <div className="setting-info">
                                    <div className="setting-label">
                                        {t('privacy.explicitFilter')}
                                    </div>
                                    <div className="setting-desc">
                                        {t('privacy.explicitFilterDesc')}
                                    </div>
                                </div>
                                <select
                                    className="explicit-filter-select"
                                    value={p.settings.explicit_content_filter}
                                    onChange={(e) => p.updateExplicitFilter(e.target.value)}
                                >
                                    <option value="none">{t('privacy.filterNone')}</option>
                                    <option value="friends">{t('privacy.filterFriends')}</option>
                                    <option value="all">{t('privacy.filterAll')}</option>
                                </select>
                            </div>
                            <ToggleItem
                                label={t('ui.blocknmis_kelime_filtersi')}
                                desc={t('privacy.hideExplicitMessages')}
                                checked={p.settings.blocked_words_filter_enabled}
                                onChange={() => p.toggleSetting('blocked_words_filter_enabled')}
                            />
                        </div>
                        {p.settings.blocked_words_filter_enabled && (
                            <div className="blocked-words-section">
                                <h4>{t('privacy.blockedWords')}</h4>
                                <div className="add-word-form">
                                    <input
                                        type="text"
                                        placeholder={t('privacy.blockedWords') + '...'}
                                        value={p.newWord}
                                        onChange={(e) => p.setNewWord(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && p.addBlockedWord()}
                                    />
                                    <button
                                        aria-label={t('common.add')}
                                        className="add-word-btn"
                                        onClick={p.addBlockedWord}
                                    >
                                        ➕ {t('common.add')}
                                    </button>
                                </div>
                                {p.blockedWords.length > 0 ? (
                                    <div className="blocked-words-list">
                                        {p.blockedWords.map((word, i) => (
                                            <div key={`item-${i}`} className="blocked-word-item">
                                                <span>{word}</span>
                                                <button
                                                    aria-label="Action button"
                                                    className="remove-word-btn"
                                                    onClick={() => p.removeBlockedWord(word)}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="empty-state">{t('privacy.blockedWords')} — 0</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

PrivacySettingsPanel.propTypes = {
    label: PropTypes.string,
    desc: PropTypes.object,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
};

ToggleItem.propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    desc: PropTypes.object,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
};

export default PrivacySettingsPanel;
