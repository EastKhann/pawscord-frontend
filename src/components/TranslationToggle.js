// frontend/src/components/TranslationToggle.js
import React, { useState, useEffect } from 'react';
import { FaGlobe, FaCheck, FaTimes } from 'react-icons/fa';
import { getSupportedLanguages, clearTranslationCache } from '../utils/translation';

/**
 * 🌐 Translation Toggle Component
 * Toggle auto-translation ON/OFF and select target language
 */
const TranslationToggle = ({
    apiBaseUrl,
    currentLanguage,
    onLanguageChange,
    translationEnabled,
    onToggle
}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [languages, setLanguages] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Load supported languages on mount
        loadLanguages();
    }, [apiBaseUrl]);

    const loadLanguages = async () => {
        setLoading(true);
        const langs = await getSupportedLanguages(apiBaseUrl);
        setLanguages(langs);
        setLoading(false);
    };

    const handleToggle = () => {
        // Clear cache when toggling
        if (!translationEnabled) {
            clearTranslationCache();
        }
        onToggle(!translationEnabled);
    };

    const handleLanguageSelect = (code) => {
        onLanguageChange(code);
        setShowDropdown(false);
        setSearchTerm('');

        // Clear cache when changing language
        clearTranslationCache();
    };

    // Filter languages by search term
    const filteredLanguages = Object.entries(languages).filter(([code, name]) =>
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={styles.container}>
            {/* Toggle Button */}
            <button
                onClick={handleToggle}
                style={{
                    ...styles.toggleButton,
                    backgroundColor: translationEnabled ? '#43b581' : '#4e5058'
                }}
                title={translationEnabled ? 'Çeviri Açık' : 'Çeviri Kapalı'}
            >
                <FaGlobe />
                {translationEnabled && <span style={{ marginLeft: 4 }}>ON</span>}
            </button>

            {/* Language Selector (only show when enabled) */}
            {translationEnabled && (
                <div style={styles.languageSelector}>
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        style={styles.langButton}
                        title="Hedef Dil Seç"
                    >
                        <FaGlobe style={{ marginRight: 6, fontSize: 12 }} />
                        {languages[currentLanguage] || currentLanguage.toUpperCase()}
                        <span style={{ marginLeft: 6 }}>▼</span>
                    </button>

                    {/* Language Dropdown */}
                    {showDropdown && (
                        <div style={styles.dropdown}>
                            {/* Search Input */}
                            <div style={styles.searchContainer}>
                                <input
                                    type="text"
                                    placeholder="Dil ara..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={styles.searchInput}
                                    autoFocus
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        style={styles.clearButton}
                                    >
                                        <FaTimes />
                                    </button>
                                )}
                            </div>

                            {/* Language List */}
                            <div style={styles.languageList}>
                                {loading ? (
                                    <div style={styles.loading}>Yükleniyor...</div>
                                ) : filteredLanguages.length === 0 ? (
                                    <div style={styles.noResults}>Sonuç bulunamadı</div>
                                ) : (
                                    filteredLanguages.map(([code, name]) => (
                                        <button
                                            key={code}
                                            onClick={() => handleLanguageSelect(code)}
                                            style={{
                                                ...styles.langOption,
                                                backgroundColor: currentLanguage === code ? '#5865f2' : 'transparent'
                                            }}
                                        >
                                            {currentLanguage === code && (
                                                <FaCheck style={{ marginRight: 8, color: '#43b581' }} />
                                            )}
                                            <span style={{ flex: 1 }}>{name}</span>
                                            <span style={{ fontSize: 10, opacity: 0.6 }}>
                                                {code.toUpperCase()}
                                            </span>
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Close dropdown when clicking outside */}
            {showDropdown && (
                <div
                    style={styles.overlay}
                    onClick={() => setShowDropdown(false)}
                />
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        position: 'relative'
    },
    toggleButton: {
        border: 'none',
        borderRadius: '4px',
        padding: '8px 12px',
        color: '#fff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'all 0.2s ease'
    },
    languageSelector: {
        position: 'relative'
    },
    langButton: {
        backgroundColor: '#2b2d31',
        border: '1px solid #4e5058',
        borderRadius: '4px',
        padding: '8px 12px',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        minWidth: '120px',
        transition: 'all 0.2s ease'
    },
    dropdown: {
        position: 'absolute',
        top: '100%',
        left: 0,
        marginTop: '8px',
        backgroundColor: '#2b2d31',
        border: '1px solid #4e5058',
        borderRadius: '8px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
        zIndex: 10000,
        minWidth: '300px',
        maxWidth: '400px'
    },
    searchContainer: {
        padding: '12px',
        borderBottom: '1px solid #4e5058',
        position: 'relative'
    },
    searchInput: {
        width: '100%',
        padding: '8px 32px 8px 12px',
        backgroundColor: '#1e1f22',
        border: '1px solid #4e5058',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        outline: 'none'
    },
    clearButton: {
        position: 'absolute',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        padding: '4px',
        display: 'flex',
        alignItems: 'center'
    },
    languageList: {
        maxHeight: '400px',
        overflowY: 'auto',
        padding: '8px'
    },
    langOption: {
        width: '100%',
        padding: '10px 12px',
        border: 'none',
        background: 'none',
        color: '#dcddde',
        textAlign: 'left',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        fontSize: '14px',
        borderRadius: '4px',
        transition: 'background-color 0.15s ease',
        marginBottom: '2px'
    },
    loading: {
        padding: '20px',
        textAlign: 'center',
        color: '#b9bbbe',
        fontSize: '14px'
    },
    noResults: {
        padding: '20px',
        textAlign: 'center',
        color: '#b9bbbe',
        fontSize: '14px'
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999
    }
};

// Add hover effect via CSS-in-JS workaround
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
        button:hover {
            opacity: 0.9;
        }
    `;
    document.head.appendChild(style);
}

export default TranslationToggle;



