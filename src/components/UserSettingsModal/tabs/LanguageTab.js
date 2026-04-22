import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheck } from 'react-icons/fa';
import PropTypes from 'prop-types';
import SettingSection from '../components/SettingSection';
import ut from './UserTabs.module.css';
import i18n, { SUPPORTED_LANGUAGES } from '../../../i18n';

const LanguageTab = () => {
    const { t } = useTranslation();
    const [language, setLanguage] = useState(
        () => i18n.language || localStorage.getItem('pawscord_language') || 'tr'
    );

    const selectLanguage = (code) => {
        setLanguage(code);
        localStorage.setItem('pawscord_language', code);
        i18n.changeLanguage(code);
    };

    return (
        <div aria-label={t('settings.languageTab', 'Language tab')}>
            <SettingSection title={t('settings.tabs.language.appLanguage')}>
                <p className={ut.mutedMdMb16}>{t('settings.tabs.language.selectDesc')}</p>
                <div className={ut.flexColGap4}>
                    {SUPPORTED_LANGUAGES.map((lang) => (
                        <button
                            key={lang.code}
                            type="button"
                            onClick={() => selectLanguage(lang.code)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                width: '100%',
                                padding: '10px 16px',
                                border: 'none',
                                borderRadius: 4,
                                cursor: 'pointer',
                                backgroundColor:
                                    language === lang.code
                                        ? 'rgba(88,101,242,0.15)'
                                        : 'transparent',
                                textAlign: 'left',
                                transition: 'background 0.15s',
                            }}
                        >
                            <span className={ut.fs20}>{lang.flag}</span>
                            <span
                                style={{
                                    color: language === lang.code ? '#5865f2' : '#dbdee1',
                                    fontSize: 14,
                                    fontWeight: language === lang.code ? 600 : 400,
                                }}
                            >
                                {lang.name}
                            </span>
                            {language === lang.code && <FaCheck className={ut.mutedLink} />}
                        </button>
                    ))}
                </div>
            </SettingSection>
        </div>
    );
};

LanguageTab.propTypes = {};
export default LanguageTab;
