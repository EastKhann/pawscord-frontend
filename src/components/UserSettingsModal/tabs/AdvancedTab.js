import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';
import toast from '../../../utils/toast';
import SettingSection from '../components/SettingSection';
import ToggleSwitch from '../components/ToggleSwitch';
import importedS from '../styles';
import { createToggle } from '../helpers';
import ut from './UserTabs.module.css';

const S = {
    ...importedS,
    font: { fontSize: 12 },
};

const AdvancedTab = () => {
    const { t } = useTranslation();
    const [devMode, setDevMode] = useState(
        () => localStorage.getItem('pawscord_dev_mode') === 'true'
    );
    const [hwAccel, setHwAccel] = useState(
        () => localStorage.getItem('pawscord_hw_accel') !== 'false'
    );
    const [reducedMotion, setReducedMotion] = useState(
        () => localStorage.getItem('pawscord_reduced_motion') === 'true'
    );

    return (
        <div aria-label="advanced tab">
            <SettingSection title={t('settings.tabs.advanced.devMode')}>
                <p className={ut.mutedMb8}>{t('settings.tabs.advanced.devModeDesc')}</p>
                <ToggleSwitch
                    label={t('settings.tabs.advanced.enableDevMode')}
                    value={devMode}
                    onChange={createToggle('pawscord_dev_mode', setDevMode)}
                />
            </SettingSection>
            <SettingSection title={t('settings.tabs.advanced.performance')}>
                <ToggleSwitch
                    label={t('settings.tabs.advanced.hwAccel')}
                    value={hwAccel}
                    onChange={createToggle('pawscord_hw_accel', setHwAccel)}
                />
                <ToggleSwitch
                    label={t('settings.tabs.advanced.reducedMotion')}
                    value={reducedMotion}
                    onChange={createToggle('pawscord_reduced_motion', setReducedMotion)}
                />
            </SettingSection>
            <SettingSection title={t('settings.tabs.advanced.cache')}>
                <div className="flex-gap-8n">
                    <button
                        type="button"
                        onClick={() => {
                            if (window.caches) {
                                window.caches
                                    .keys()
                                    .then((names) => names.forEach((n) => window.caches.delete(n)));
                            }
                            localStorage.removeItem('pawscord_msg_cache');
                            toast.info(t('settings.tabs.advanced.cacheCleared'));
                        }}
                        style={S.actionBtn}
                    >
                        <FaTrash style={S.font} /> {t('settings.tabs.advanced.clearCache')}
                    </button>
                </div>
            </SettingSection>
            <SettingSection title={t('settings.tabs.advanced.debugging')}>
                <div className={ut.darkPad12}>
                    <div>App Version: {window.__PAWSCORD_VERSION__ || '2.0.0'}</div>
                </div>
            </SettingSection>
        </div>
    );
};

AdvancedTab.propTypes = {};
export default AdvancedTab;
