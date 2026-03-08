import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import SettingSection from '../components/SettingSection';

const LANGUAGES = [
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'ko', label: '한국어', flag: '🇰🇷' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
];

const LanguageTab = () => {
    const [language, setLanguage] = useState(() => localStorage.getItem('pawscord_language') || 'tr');

    const selectLanguage = (code) => {
        setLanguage(code);
        localStorage.setItem('pawscord_language', code);
    };

    return (
        <div>
            <SettingSection title="Uygulama Dili">
                <p style={{ color: '#949ba4', fontSize: 13, marginBottom: 16 }}>
                    Pawscord arayüzünün dilini seç.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {LANGUAGES.map(lang => (
                        <button key={lang.code} type="button" onClick={() => selectLanguage(lang.code)} style={{
                            display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                            padding: '10px 16px', border: 'none', borderRadius: 4, cursor: 'pointer',
                            backgroundColor: language === lang.code ? 'rgba(88,101,242,0.15)' : 'transparent',
                            textAlign: 'left', transition: 'background 0.15s',
                        }}>
                            <span style={{ fontSize: 20 }}>{lang.flag}</span>
                            <span style={{ color: language === lang.code ? '#5865f2' : '#dbdee1', fontSize: 14, fontWeight: language === lang.code ? 600 : 400 }}>
                                {lang.label}
                            </span>
                            {language === lang.code && <FaCheck style={{ marginLeft: 'auto', color: '#5865f2', fontSize: 12 }} />}
                        </button>
                    ))}
                </div>
            </SettingSection>
        </div>
    );
};

export default LanguageTab;
