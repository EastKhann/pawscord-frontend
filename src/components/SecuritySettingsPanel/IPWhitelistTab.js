import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const IPWhitelistTab = ({
    ipWhitelist,
    newIp,
    setNewIp,
    addIPToWhitelist,
    removeIPFromWhitelist,
}) => {
    const { t } = useTranslation();
    return (
        <div className="tab-content">
            <h3>{t('ip_adresi_beyaz_listesi')}</h3>
            <p>{t('sadece_izin_verilen_ip_adreslerinden_giriş_yapın')}</p>
            <div className="add-ip">
                <input
                    type="text"
                    placeholder={t('ip_adresi_örn_192_168_1_1')}
                    value={newIp}
                    onChange={(e) => setNewIp(e.target.value)}
                    className="ip-input"
                />
                <button className="add-btn" onClick={addIPToWhitelist}>
                    {t('add')}
                </button>
            </div>
            <div className="ip-list">
                {ipWhitelist.map((item) => (
                    <div key={item.id} className="ip-card">
                        <div className="ip-info">
                            <span className="ip-address">{item.ip_address}</span>
                            <span className="ip-added">
                                Addndi: {new Date(item.created_at).toLocaleDateString('tr-TR')}
                            </span>
                        </div>
                        <button
                            className="remove-btn"
                            onClick={() => removeIPFromWhitelist(item.id)}
                        >
                            {t('remove')}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

IPWhitelistTab.propTypes = {
    ipWhitelist: PropTypes.array,
    newIp: PropTypes.object,
    setNewIp: PropTypes.func,
    addIPToWhitelist: PropTypes.array,
    removeIPFromWhitelist: PropTypes.array,
};
export default IPWhitelistTab;
