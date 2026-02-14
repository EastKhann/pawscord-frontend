import React from 'react';
import { FaCog } from 'react-icons/fa';

const SettingsView = ({ settings, setSettings, handleSaveSettings }) => {
    return (
        <div className="settings-view">
            <h3><FaCog /> Koruma Ayarları</h3>

            <div className="settings-section">
                <h4>Katılım Limitleri</h4>

                <div className="setting-item">
                    <div className="setting-info">
                        <label>Katılım Hız Limiti</label>
                        <p>Belirli süre içinde maksimum katılım sayısı</p>
                    </div>
                    <div className="setting-control">
                        <input
                            type="number"
                            value={settings.join_rate_limit}
                            onChange={(e) => setSettings({ ...settings, join_rate_limit: parseInt(e.target.value) })}
                            min="1"
                            max="100"
                        />
                        <span>kişi /</span>
                        <input
                            type="number"
                            value={settings.join_time_window}
                            onChange={(e) => setSettings({ ...settings, join_time_window: parseInt(e.target.value) })}
                            min="10"
                            max="300"
                        />
                        <span>saniye</span>
                    </div>
                </div>

                <div className="setting-item">
                    <div className="setting-info">
                        <label>Yeni Hesap Eşiği</label>
                        <p>Bu günden eski hesaplar şüpheli sayılır</p>
                    </div>
                    <div className="setting-control">
                        <input
                            type="number"
                            value={settings.new_account_threshold}
                            onChange={(e) => setSettings({ ...settings, new_account_threshold: parseInt(e.target.value) })}
                            min="1"
                            max="30"
                        />
                        <span>gün</span>
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h4>Mesaj Limitleri</h4>

                <div className="setting-item">
                    <div className="setting-info">
                        <label>Mention Limiti</label>
                        <p>Bir mesajdaki maksimum mention sayısı</p>
                    </div>
                    <div className="setting-control">
                        <input
                            type="number"
                            value={settings.mention_limit}
                            onChange={(e) => setSettings({ ...settings, mention_limit: parseInt(e.target.value) })}
                            min="1"
                            max="50"
                        />
                    </div>
                </div>

                <div className="setting-item">
                    <div className="setting-info">
                        <label>Mesaj Hız Limiti</label>
                        <p>10 saniyede maksimum mesaj sayısı</p>
                    </div>
                    <div className="setting-control">
                        <input
                            type="number"
                            value={settings.message_rate_limit}
                            onChange={(e) => setSettings({ ...settings, message_rate_limit: parseInt(e.target.value) })}
                            min="1"
                            max="50"
                        />
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h4>Otomatik Aksiyonlar</h4>

                <div className="setting-item toggle">
                    <div className="setting-info">
                        <label>Şüpheli Hesapları Otomatik Banla</label>
                        <p>Raid tespit edildiğinde şüpheli hesapları otomatik banla</p>
                    </div>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={settings.auto_ban_suspicious}
                            onChange={(e) => setSettings({ ...settings, auto_ban_suspicious: e.target.checked })}
                        />
                        <span className="slider"></span>
                    </label>
                </div>

                <div className="setting-item toggle">
                    <div className="setting-info">
                        <label>Katılımda CAPTCHA</label>
                        <p>Yeni üyeler katılırken CAPTCHA doğrulaması iste</p>
                    </div>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={settings.captcha_on_join}
                            onChange={(e) => setSettings({ ...settings, captcha_on_join: e.target.checked })}
                        />
                        <span className="slider"></span>
                    </label>
                </div>

                <div className="setting-item toggle">
                    <div className="setting-info">
                        <label>Katılım Uyarı DM</label>
                        <p>Şüpheli hesap katıldığında yöneticilere DM gönder</p>
                    </div>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={settings.dm_on_join_warning}
                            onChange={(e) => setSettings({ ...settings, dm_on_join_warning: e.target.checked })}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
            </div>

            <div className="settings-actions">
                <button className="save-btn" onClick={handleSaveSettings}>
                    Ayarları Kaydet
                </button>
            </div>
        </div>
    );
};

export default SettingsView;
