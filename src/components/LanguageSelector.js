// frontend/src/components/LanguageSelector.js
// 🌐 LANGUAGE SELECTOR COMPONENT

import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './LanguageSelector.css';

// ========================================
// 🌐 LANGUAGE SELECTOR DROPDOWN
// ========================================
export const LanguageSelector = ({ compact = false }) => {
    const { currentLanguage, languages, changeLanguage, getLanguageInfo } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const currentLang = getLanguageInfo(currentLanguage) || {
        code: 'tr',
        name: 'Türkçe',
        flag: '🇹🇷'
    };

    const handleSelect = (langCode) => {
        changeLanguage(langCode);
        setIsOpen(false);
    };

    return (
        <div className={`language-selector ${compact ? 'compact' : ''}`}>
            <button
                className="language-toggle"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="lang-flag">{currentLang.flag}</span>
                {!compact && (
                    <>
                        <span className="lang-name">{currentLang.native_name || currentLang.name}</span>
                        <span className="lang-arrow">{isOpen ? '▲' : '▼'}</span>
                    </>
                )}
            </button>

            {isOpen && (
                <div className="language-dropdown">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            className={`language-option ${lang.code === currentLanguage ? 'active' : ''}`}
                            onClick={() => handleSelect(lang.code)}
                        >
                            <span className="lang-flag">{lang.flag}</span>
                            <span className="lang-name">{lang.native_name}</span>
                            {lang.code === currentLanguage && (
                                <span className="lang-check">✓</span>
                            )}
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
    const [selectedLang, setSelectedLang] = useState(currentLanguage);

    const handleSave = () => {
        changeLanguage(selectedLang);
        onClose?.();
    };

    return (
        <div className="language-settings-panel">
            <div className="panel-header">
                <h2>🌐 Dil Ayarları / Language Settings</h2>
                <button className="close-btn" onClick={onClose}>✕</button>
            </div>

            <div className="panel-content">
                <p className="settings-desc">
                    Arayüz dilini seçin / Select interface language
                </p>

                <div className="languages-grid">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            className={`language-card ${lang.code === selectedLang ? 'selected' : ''}`}
                            onClick={() => setSelectedLang(lang.code)}
                        >
                            <span className="card-flag">{lang.flag}</span>
                            <div className="card-info">
                                <span className="card-native">{lang.native_name}</span>
                                <span className="card-name">{lang.name}</span>
                            </div>
                            {lang.direction === 'rtl' && (
                                <span className="rtl-badge">RTL</span>
                            )}
                            {lang.code === selectedLang && (
                                <span className="selected-check">✓</span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="settings-info">
                    <div className="info-item">
                        <span className="info-icon">📝</span>
                        <span>Metin yönü: {direction === 'rtl' ? 'Sağdan Sola' : 'Soldan Sağa'}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-icon">🔄</span>
                        <span>Değişiklikler anında uygulanır</span>
                    </div>
                </div>
            </div>

            <div className="panel-footer">
                <button className="btn-cancel" onClick={onClose}>
                    İptal / Cancel
                </button>
                <button className="btn-save" onClick={handleSave}>
                    Kaydet / Save
                </button>
            </div>
        </div>
    );
};

// ========================================
// 🌐 INLINE LANGUAGE SWITCHER
// ========================================
export const InlineLanguageSwitcher = () => {
    const { currentLanguage, languages, changeLanguage } = useLanguage();

    return (
        <div className="inline-language-switcher">
            {languages.slice(0, 4).map((lang) => (
                <button
                    key={lang.code}
                    className={`inline-lang-btn ${lang.code === currentLanguage ? 'active' : ''}`}
                    onClick={() => changeLanguage(lang.code)}
                    title={lang.native_name}
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

export default LanguageSelector;
