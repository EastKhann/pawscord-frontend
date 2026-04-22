/* eslint-disable no-undef */
// frontend/src/components/LanguageSelector.js
// 🌐 LANGUAGE SELECTOR COMPONENT

import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation as useI18nTranslation } from 'react-i18next';
import { useLanguage } from '../../contexts/LanguageContext';
import './LanguageSelector.css';

// ========================================
// 🌐 LANGUAGE SELECTOR DROPDOWN
// ========================================
export const LanguageSelector = ({ compact = false }) => {
    const { currentLanguage, languages, changeLanguage, getLanguageInfo } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const currentLang = getLanguageInfo(currentLanguage) || {
        code: 'en',
        name: 'English',
        flag: '🇬🇧',
    };

    const handleSelect = (langCode) => {
        changeLanguage(langCode);
        setIsOpen(false);
    };

    return (
        <div className={`language-selector ${compact ? 'compact' : ''}`}>
            <button
                aria-label={t('language.toggleSelector', 'Select language')}
            >
                <span className="lang-flag">{currentLang.flag}</span>
                {!compact && (
                    <>
                        <span className="lang-name">
                            {currentLang.native_name || currentLang.name}
                        </span>
                        <span className="lang-arrow">{isOpen ? '▲' : '▼'}</span>
                    </>
                )}
            </button>

            {isOpen && (
                <div className="language-dropdown">
                    {languages.map((lang) => (
                        <button
                            aria-label={t('language.selectLang', 'Select {{lang}}', { lang: lang.native_name })}
                        >
                            <span className="lang-flag">{lang.flag}</span>
                            <span className="lang-name">{lang.native_name}</span>
                            {lang.code === currentLanguage && <span className="lang-check">✓</span>}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

// ========================================
// 🌐 LANGUAGE SETTINGS PANEL
// ========================================
export const LanguageSettings = ({ onClose }) => {
    const { currentLanguage, languages, changeLanguage, direction } = useLanguage();
    const { t } = useI18nTranslation();
    const [selectedLang, setSelectedLang] = useState(currentLanguage);

    const handleSave = () => {
        changeLanguage(selectedLang);
        onClose?.();
    };

    return (
        <div className="language-settings-panel">
            <div className="panel-header">
                <h2>🌐 {t('language.title')}</h2>
                <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                    ✕
                </button>
            </div>

            <div className="panel-content">
                <p className="settings-desc">{t('language.selectLanguage')}</p>

                <div className="languages-grid">
                    {languages.map((lang) => (
                        <button
                            aria-label={t('language.selectLang', 'Select {{lang}}', { lang: lang.native_name })}
                            key={lang.code}
                            className={`language-card ${lang.code === selectedLang ? 'selected' : ''}`}
                            onClick={() => setSelectedLang(lang.code)}
                        >
                            <span className="card-flag">{lang.flag}</span>
                            <div className="card-info">
                                <span className="card-native">{lang.native_name}</span>
                                <span className="card-name">{lang.name}</span>
                            </div>
                            {lang.direction === 'rtl' && <span className="rtl-badge">RTL</span>}
                            {lang.code === selectedLang && (
                                <span className="selected-check">✓</span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="settings-info">
                    <div className="info-item">
                        <span className="info-icon">📝</span>
                        <span>
                            {t('language.currentLanguage')}: {direction === 'rtl' ? 'RTL' : 'LTR'}
                        </span>
                    </div>
                    <div className="info-item">
                        <span className="info-icon">🔄</span>
                        <span>{t('language.autoDetected')}</span>
                    </div>
                </div>
            </div>

            <div className="panel-footer">
                <button aria-label={t('common.close', 'Close')} className="btn-cancel" onClick={onClose}>
                    {t('common.cancel')}
                </button>
                <button aria-label={t('common.save', 'Save')} className="btn-save" onClick={handleSave}>
                    {t('common.save')}
                </button>
            </div>
        </div>
    );
};

// ========================================
// 🌐 INLINE LANGUAGE SWITCHER
// ========================================
export const InlineLanguageSwitcher = () => {
    const { t } = useTranslation();
    const { currentLanguage, languages, changeLanguage } = useLanguage();

    return (
        <div className="inline-language-switcher">
            {languages.slice(0, 4).map((lang) => (
                <button
                    aria-label={t('language.selectLang', 'Select {{lang}}', { lang: lang.native_name })}
                >
                    {lang.flag}
                </button>
            ))}
        </div>
    );
};

// ========================================
// 🌐 TRANSLATED TEXT COMPONENT
// ========================================
export const T = ({ id, params = {}, as: Component = 'span', ...props }) => {
    const { t } = useLanguage();
    return <Component {...props}>{t(id, params)}</Component>;
};

LanguageSelector.propTypes = {
    compact: PropTypes.bool,
};

LanguageSettings.propTypes = {
    onClose: PropTypes.func,
};

export default LanguageSelector;
