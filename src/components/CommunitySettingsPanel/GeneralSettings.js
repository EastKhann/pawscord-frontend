/* eslint-disable jsx-a11y/label-has-associated-control */
import { FaGavel, FaBullhorn, FaGlobe, FaComments } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const GeneralSettings = ({ settings, setSettings, channels }) => {
    const { t } = useTranslation();
    return (
        <div className="settings-tab">
            <div className="form-group">
                <label>Server Açıklaması</label>
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
                        <FaGavel /> Kurallar Kanalı
                    </label>
                    <select
                        value={settings.rules_channel_id}
                        onChange={(e) =>
                            setSettings((prev) => ({ ...prev, rules_channel_id: e.target.value }))
                        }
                    >
                        <option value="">Seç...</option>
                        {channels.map((ch) => (
                            <option key={ch.id} value={ch.id}>
                                {ch.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>
                        <FaBullhorn /> Güncellemeler Kanalı
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
                        <option value="">Seç...</option>
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
                        <option value="tr">🇹🇷 Türkçe</option>
                        <option value="en">🇬🇧 English</option>
                        <option value="de">🇩🇪 Deutsch</option>
                        <option value="fr">🇫🇷 Français</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>
                        <FaComments /> Varsayılan Bildirimler
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
                        <option value="all">Tüm Mesajlar</option>
                        <option value="mentions">{t('sadece_tagler')}</option>
                    </select>
                </div>
            </div>

            <div className="feature-toggles">
                <h4>Özellikler</h4>
                {[
                    { key: 'welcome_screen', label: 'Hoşgeldin Ekranı' },
                    { key: 'member_screening', label: 'Üye Tarama' },
                    { key: 'discovery', label: 'Sunucuları Keşfet' },
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
