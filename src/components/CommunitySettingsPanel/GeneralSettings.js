/* eslint-disable jsx-a11y/label-has-associated-control */
import { FaGavel, FaBullhorn, FaGlobe, FaComments } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const GeneralSettings = ({ settings, setSettings, channels }) => {
    const { t } = useTranslation();
    return (
        <div className="settings-tab">
            <div className="form-group">
                <label>{t('community.serverDescription', 'Server Description')}</label>
                <textarea
                    value={settings.description}
                    onChange={(e) =>
                        setSettings((prev) => ({ ...prev, description: e.target.value }))
                    }
                    placeholder={t('servernuz_hakkında_kısa_bir_aklama')}
                    rows="3"
                    maxLength={300}
                />
                <span className="char-count">{settings.description?.length || 0}/300</span>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>
                        <FaGavel /> {t('community.rulesChannel', 'Rules Channel')}
                    </label>
                    <select
                        value={settings.rules_channel_id}
                        onChange={(e) =>
                            setSettings((prev) => ({ ...prev, rules_channel_id: e.target.value }))
                        }
                    >
                        <option value="">{t('common.select', 'Select...')}</option>
                        {channels.map((ch) => (
                            <option key={ch.id} value={ch.id}>
                                {ch.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>
                        <FaBullhorn /> {t('community.updatesChannel', 'Updates Channel')}
                    </label>
                    <select
                        value={settings.public_updates_channel_id}
                        onChange={(e) =>
                            setSettings((prev) => ({
                                ...prev,
                                public_updates_channel_id: e.target.value,
                            }))
                        }
                    >
                        <option value="">{t('common.select', 'Select...')}</option>
                        {channels.map((ch) => (
                            <option key={ch.id} value={ch.id}>
                                {ch.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>
                        <FaGlobe />
                        {t('tercih_edilen_dil')}
                    </label>
                    <select
                        value={settings.preferred_locale}
                        onChange={(e) =>
                            setSettings((prev) => ({ ...prev, preferred_locale: e.target.value }))
                        }
                    >
                        <option value="tr">🇹🇷 {t('lang.tr', 'Turkish')}</option>
                        <option value="en">🇬🇧 English</option>
                        <option value="de">🇩🇪 Deutsch</option>
                        <option value="fr">{t('lang.fr', '🇫🇷 French')}</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>
                        <FaComments /> {t('community.defaultNotifications', 'Default Notifications')}
                    </label>
                    <select
                        value={settings.default_notifications}
                        onChange={(e) =>
                            setSettings((prev) => ({
                                ...prev,
                                default_notifications: e.target.value,
                            }))
                        }
                    >
                        <option value="all">{t('community.allMessages', 'All Messages')}</option>
                        <option value="mentions">{t('sadece_tagler')}</option>
                    </select>
                </div>
            </div>

            <div className="feature-toggles">
                <h4>{t('community.features', 'Features')}</h4>
                {[
                    { key: 'welcome_screen', label: t('community.welcomeScreen', 'Welcome Screen') },
                    { key: 'member_screening', label: t('community.memberScreening', 'Member Screening') },
                    { key: 'discovery', label: t('community.discoverServers', 'Discover Servers') },
                ].map((f) => (
                    <label key={f.key} className="feature-item">
                        <span>{f.label}</span>
                        <input
                            type="checkbox"
                            checked={settings.features?.[f.key]}
                            onChange={(e) =>
                                setSettings((prev) => ({
                                    ...prev,
                                    features: { ...prev.features, [f.key]: e.target.checked },
                                }))
                            }
                        />
                    </label>
                ))}
            </div>
        </div>
    );
};

GeneralSettings.propTypes = {
    settings: PropTypes.object,
    setSettings: PropTypes.func,
    channels: PropTypes.array,
};
export default GeneralSettings;
