import { useTranslation } from 'react-i18next';
import { FaCamera, FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';
import SettingSection from '../components/SettingSection';
import SettingField from '../components/SettingField';
import importedS from '../styles';
import ut from './UserTabs.module.css';

const S = {
    ...importedS,
    bg2: {
        ...importedS.actionBtn,
        backgroundColor: 'rgba(218,55,60,0.1)',
        color: '#da373c',
        borderColor: '#da373c',
    },
    grid: { marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
    txt2: { color: '#949ba4', fontSize: 14 },
    txt: { color: '#fff', fontWeight: 700, fontSize: 18 },
    flex2: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 28,
        height: 28,
        borderRadius: '50%',
        backgroundColor: '#5865f2',
        border: '3px solid #0b0e1b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: '#fff',
        fontSize: 11,
    },
    border: { width: 80, height: 80, borderRadius: '50%', border: '4px solid #0e1222' },
    flex: { display: 'flex', alignItems: 'center', gap: 16 },
    bg: { backgroundColor: '#0d0e10', borderRadius: 8, padding: 16 },
};

const AccountTab = ({ user, onAvatarChange }) => {
    const { t } = useTranslation();
    return (
        <div>
            <SettingSection title={t('settings.tabs.account.profile')}>
                <div style={S.bg}>
                    <div style={S.flex}>
                        <div className="pos-relative">
                            <img
                                src={user?.avatar || '/default-avatar.png'}
                                alt=""
                                style={S.border}
                            />
                            <button
                                type="button"
                                onClick={onAvatarChange}
                                aria-label={t('settings.tabs.account.changeAvatar')}
                                style={S.flex2}
                            >
                                <FaCamera />
                            </button>
                        </div>
                        <div>
                            <div style={S.txt}>{user?.display_name || user?.username}</div>
                            <div style={S.txt2}>@{user?.username}</div>
                        </div>
                    </div>
                    <div style={S.grid}>
                        <SettingField
                            label={t('settings.tabs.account.username')}
                            value={user?.username}
                        />
                        <SettingField
                            label={t('settings.tabs.account.email')}
                            value={user?.email || t('settings.tabs.account.notSet')}
                            masked
                        />
                        <SettingField
                            label={t('settings.tabs.account.phone')}
                            value={user?.phone || t('settings.tabs.account.notSet')}
                        />
                    </div>
                </div>
            </SettingSection>
            <SettingSection title={t('settings.tabs.account.password')}>
                <button type="button" style={S.actionBtn}>
                    {t('settings.tabs.account.changePassword')}
                </button>
            </SettingSection>
            <SettingSection title={t('settings.tabs.account.deleteAccountTitle')}>
                <button type="button" style={S.bg2}>
                    <FaTrash /> {t('settings.tabs.account.deleteAccountBtn')}
                </button>
            </SettingSection>
        </div>
    );
};

AccountTab.propTypes = {
    user: PropTypes.object,
    onAvatarChange: PropTypes.func,
};
export default AccountTab;
