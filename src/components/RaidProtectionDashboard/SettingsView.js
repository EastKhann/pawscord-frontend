/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { FaCog } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const SettingsView = ({ settings, setSettings, handleSaveSettings }) => {
    const { t } = useTranslation();

    return (
        <div className="settings-view">
            <h3>
                <FaCog />
                {t('koruma_ayarları')}
            </h3>

            <div className="settings-section">
                <h4>{t('joinım_limitleri')}</h4>

                <div className="setting-item">
                    <div className="setting-info">
                        <label>{t('joinım_hız_limiti')}</label>
                        <p>{t('belirli_süre_forde_maksimum_katılım_sayısı')}</p>
                    </div>
                    <div className="setting-control">
                        <input
                            type="number"
                            value={settings.join_rate_limit}
                            onChange={(e) =>
                                setSettings({
                                    ...settings,
                                    join_rate_limit: parseInt(e.target.value),
                                })
                            }
                            min="1"
                            max="100"
                        />
                        <span>{t('kişi')}</span>
                        <input
                            type="number"
                            value={settings.join_time_window}
                            onChange={(e) =>
                                setSettings({
                                    ...settings,
                                    join_time_window: parseInt(e.target.value),
                                })
                            }
                            min="10"
                            max="300"
                        />
                        <span>saniye</span>
                    </div>
                </div>

                <div className="setting-item">
                    <div className="setting-info">
                        <label>{t('yeni_hesap_eşiği')}</label>
                        <p>{t('bu_dayden_eski_hesaplar_şüpheli_sailır')}</p>
                    </div>
                    <div className="setting-control">
                        <input
                            type="number"
                            value={settings.new_account_threshold}
                            onChange={(e) =>
                                setSettings({
                                    ...settings,
                                    new_account_threshold: parseInt(e.target.value),
                                })
                            }
                            min="1"
                            max="30"
                        />
                        <span>{t('common.days','days')}</span>
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h4>{t('mesaj_limitleri')}</h4>

                <div className="setting-item">
                    <div className="setting-info">
                        <label>{t('mention_limiti')}</label>
                        <p>{t('bir_messagedaki_maksimum_mention_sayısı')}</p>
                    </div>
                    <div className="setting-control">
                        <input
                            type="number"
                            value={settings.mention_limit}
                            onChange={(e) =>
                                setSettings({
                                    ...settings,
                                    mention_limit: parseInt(e.target.value),
                                })
                            }
                            min="1"
                            max="50"
                        />
                    </div>
                </div>

                <div className="setting-item">
                    <div className="setting-info">
                        <label>{t('mesaj_hız_limiti')}</label>
                        <p>{t('10_saniyede_maksimum_message_sayısı')}</p>
                    </div>
                    <div className="setting-control">
                        <input
                            type="number"
                            value={settings.message_rate_limit}
                            onChange={(e) =>
                                setSettings({
                                    ...settings,
                                    message_rate_limit: parseInt(e.target.value),
                                })
                            }
                            min="1"
                            max="50"
                        />
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h4>{t('otomatik_aksiyonlar')}</h4>

                <div className="setting-item toggle">
                    <div className="setting-info">
                        <label>{t('şüpheli_hesapları_otomatik_banla')}</label>
                        <p>{t('raid_tespit_edildiğinde_şüpheli_hesapları_otomatik_banla')}</p>
                    </div>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={settings.auto_ban_suspicious}
                            onChange={(e) =>
                                setSettings({ ...settings, auto_ban_suspicious: e.target.checked })
                            }
                        />
                        <span className="slider"></span>
                    </label>
                </div>

                <div className="setting-item toggle">
                    <div className="setting-info">
                        <label>{t('joinımda_captcha')}</label>
                        <p>{t('yeni_memberler_katılırken_captcha_doğrulaması_iste')}</p>
                    </div>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={settings.captcha_on_join}
                            onChange={(e) =>
                                setSettings({ ...settings, captcha_on_join: e.target.checked })
                            }
                        />
                        <span className="slider"></span>
                    </label>
                </div>

                <div className="setting-item toggle">
                    <div className="setting-info">
                        <label>{t('joinım_uyarı_dm')}</label>
                        <p>{t('şüpheli_hesap_katıldığında_yöneticwithre_dm_gönder')}</p>
                    </div>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={settings.dm_on_join_warning}
                            onChange={(e) =>
                                setSettings({ ...settings, dm_on_join_warning: e.target.checked })
                            }
                        />
                        <span className="slider"></span>
                    </label>
                </div>
            </div>

            <div className="settings-actions">
                <button className="save-btn" onClick={handleSaveSettings}>
                    Save Settings
                </button>
            </div>
        </div>
    );
};

SettingsView.propTypes = {
    settings: PropTypes.object,
    setSettings: PropTypes.func,
    handleSaveSettings: PropTypes.func,
};
export default SettingsView;
