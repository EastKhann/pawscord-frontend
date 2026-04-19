import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGamepad } from 'react-icons/fa';
import PropTypes from 'prop-types';
import SettingSection from '../components/SettingSection';
import ToggleSwitch from '../components/ToggleSwitch';
import { createToggle } from '../helpers';
import ut from './UserTabs.module.css';

const S = {
    txt: { color: '#5865f2', fontSize: 24 },
};

const ActivityTab = () => {
    const { t } = useTranslation();
    const [showActivity, setShowActivity] = useState(
        () => localStorage.getItem('pawscord_show_activity') !== 'false'
    );
    const [showGame, setShowGame] = useState(
        () => localStorage.getItem('pawscord_show_game') !== 'false'
    );
    const [showSpotify, setShowSpotify] = useState(
        () => localStorage.getItem('pawscord_show_spotify') !== 'false'
    );
    const [showStatus, setShowStatus] = useState(
        () => localStorage.getItem('pawscord_show_status') !== 'false'
    );

    return (
        <div aria-label="activity tab">
            <SettingSection title={t('settings.tabs.activity.privacyTitle')}>
                <p className={ut.mutedMb12}>{t('settings.tabs.activity.privacyDesc')}</p>
                <ToggleSwitch
                    label={t('settings.tabs.activity.showActivity')}
                    value={showActivity}
                    onChange={createToggle('pawscord_show_activity', setShowActivity)}
                />
                <ToggleSwitch
                    label={t('settings.tabs.activity.showGame')}
                    value={showGame}
                    onChange={createToggle('pawscord_show_game', setShowGame)}
                />
                <ToggleSwitch
                    label={t('settings.tabs.activity.showSpotify')}
                    value={showSpotify}
                    onChange={createToggle('pawscord_show_spotify', setShowSpotify)}
                />
                <ToggleSwitch
                    label={t('settings.tabs.activity.showStatus')}
                    value={showStatus}
                    onChange={createToggle('pawscord_show_status', setShowStatus)}
                />
            </SettingSection>
            <SettingSection title={t('settings.tabs.activity.gameDetection')}>
                <div className={ut.darkPad16}>
                    <div className={ut.flexAlignGap12Mb12}>
                        <FaGamepad style={S.txt} />
                        <div>
                            <div className={ut.whiteBold14}>
                                {t('settings.tabs.activity.autoDetect')}
                            </div>
                            <div className={ut.mutedSm}>
                                {t('settings.tabs.activity.autoDetectDesc')}
                            </div>
                        </div>
                    </div>
                    <ToggleSwitch
                        label={t('settings.tabs.activity.enableGameDetect')}
                        value={showGame}
                        onChange={createToggle('pawscord_show_game', setShowGame)}
                    />
                </div>
            </SettingSection>
        </div>
    );
};

ActivityTab.propTypes = {};
export default ActivityTab;
