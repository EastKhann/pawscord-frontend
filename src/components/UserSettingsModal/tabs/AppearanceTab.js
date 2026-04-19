import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheck } from 'react-icons/fa';
import PropTypes from 'prop-types';
import SettingSection from '../components/SettingSection';
import ToggleSwitch from '../components/ToggleSwitch';
import importedS from '../styles';
import ut from './UserTabs.module.css';

const S = {
    ...importedS,
    txt: { color: '#fff', fontSize: 14, fontWeight: 600, minWidth: 40 },
    abs: { color: '#5865f2', position: 'absolute', top: 4, right: 4, fontSize: 10 },
    flex: { display: 'flex', gap: 12 },
};

const AppearanceTab = () => {
    const { t } = useTranslation();
    const [theme, setTheme] = useState('dark');
    const [fontSize, setFontSize] = useState(16);
    const [compact, setCompact] = useState(false);

    return (
        <div>
            <SettingSection title={t('settings.tabs.appearance.theme')}>
                <div style={S.flex}>
                    {['dark', 'light', 'amoled'].map((tm) => (
                        <button
                            key={tm}
                            type="button"
                            onClick={() => setTheme(tm)}
                            style={{
                                ...S.themeBtn,
                                borderColor: theme === tm ? '#5865f2' : 'rgba(255,255,255,0.1)',
                                backgroundColor:
                                    tm === 'dark' ? '#17191c' : tm === 'light' ? '#fff' : '#000',
                            }}
                        >
                            <span
                                style={{
                                    color: tm === 'light' ? '#000' : '#fff',
                                    fontSize: 12,
                                    fontWeight: 600,
                                }}
                            >
                                {t('settings.tabs.appearance.' + tm)}
                            </span>
                            {theme === tm && <FaCheck style={S.abs} />}
                        </button>
                    ))}
                </div>
            </SettingSection>
            <SettingSection title={t('settings.tabs.appearance.fontSize')}>
                <div className={ut.flexAlignGap12}>
                    <span className={ut.mutedSm}>{t('12px')}</span>
                    <input
                        type="range"
                        min={12}
                        max={24}
                        value={fontSize}
                        onChange={(e) => setFontSize(+e.target.value)}
                        className={ut.rangeAccent}
                    />
                    <span className={ut.mutedSm}>{t('24px')}</span>
                    <span style={S.txt}>{fontSize}px</span>
                </div>
            </SettingSection>
            <ToggleSwitch
                label={t('settings.tabs.appearance.compactMode')}
                value={compact}
                onChange={setCompact}
            />
        </div>
    );
};

AppearanceTab.propTypes = {};
export default AppearanceTab;
