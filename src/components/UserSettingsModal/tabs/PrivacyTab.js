import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import SettingSection from '../components/SettingSection';
import ToggleSwitch from '../components/ToggleSwitch';
import S from '../styles';
import ut from './UserTabs.module.css';

const PrivacyTab = () => {
    const { t } = useTranslation();
    const [dmFromServer, setDmFromServer] = useState(true);
    const [friendRequests, setFriendRequests] = useState(true);
    const [showActivity, setShowActivity] = useState(true);
    const [readReceipts, setReadReceipts] = useState(true);

    return (
        <div aria-label="privacy tab">
            <SettingSection title={t('settings.tabs.privacy.dmAndFriend')}>
                <ToggleSwitch
                    label={t('settings.tabs.privacy.dmFromServer')}
                    value={dmFromServer}
                    onChange={setDmFromServer}
                />
                <ToggleSwitch
                    label={t('settings.tabs.privacy.friendRequests')}
                    value={friendRequests}
                    onChange={setFriendRequests}
                />
            </SettingSection>
            <SettingSection title={t('settings.tabs.privacy.privacyTitle')}>
                <ToggleSwitch
                    label={t('settings.tabs.privacy.showActivity')}
                    value={showActivity}
                    onChange={setShowActivity}
                />
                <ToggleSwitch
                    label={t('settings.tabs.privacy.readReceipts')}
                    value={readReceipts}
                    onChange={setReadReceipts}
                />
            </SettingSection>
            <SettingSection title={t('settings.tabs.privacy.data')}>
                <button type="button" style={S.actionBtn}>
                    {t('settings.tabs.privacy.downloadData')}
                </button>
            </SettingSection>
        </div>
    );
};

PrivacyTab.propTypes = {};
export default PrivacyTab;
