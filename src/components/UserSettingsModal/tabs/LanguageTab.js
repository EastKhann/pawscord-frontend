import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import SettingSection from '../components/SettingSection';

const LANGUAGES = [
    { code: 'tr', label: 'T\u00FCrk\u00E7e', flag: '\uD83C\uDDF9\uD83C\uDDF7' },
    { code: 'en', label: 'English', flag: '\uD83C\uDDEC\uD83C\uDDE7' },
    { code: 'de', label: 'Deutsch', flag: '\uD83C\uDDE9\uD83C\uDDEA' },
    { code: 'fr', label: 'Fran\u00E7ais', flag: '\uD83C\uDDEB\uD83C\uDDF7' },
    { code: 'es', label: 'Espa\u00F1ol', flag: '\uD83C\uDDEA\uD83C\uDDF8' },
    { code: 'ja', label: '\u65E5\u672C\u8A9E', flag: '\uD83C\uDDEF\uD83C\uDDF5' },
    { code: 'ko', label: '\uD55C\uAD6D\uC5B4', flag: '\uD83C\uDDF0\uD83C\uDDF7' },
    { code: 'ru', label: '\u0420\u0443\u0441\u0441\u043A\u0438\u0439', flag: '\uD83C\uDDF7\uD83C\uDDFA' },
    { code: 'ar', label: '\u0627\u0644\u0639\u0631\u0628\u064A\u0629', flag: '\uD83C\uDDF8\uD83C\uDDE6' },
    { code: 'zh', label: '\u4E2D\u6587', flag: '\uD83C\uDDE8\uD83C\uDDF3' },
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
                    Pawscord aray\u00FCz\u00FCn\u00FCn dilini se\u00E7.
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
                            <span style={{ color: language === lang.code ? '#5865f2' : '#dcddde', fontSize: 14, fontWeight: language === lang.code ? 600 : 400 }}>
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
