import React from 'react';

const IPWhitelistTab = ({ ipWhitelist, newIp, setNewIp, addIPToWhitelist, removeIPFromWhitelist }) => (
    <div className="tab-content">
        <h3>IP Adresi Beyaz Listesi</h3>
        <p>Sadece izin verilen IP adreslerinden giri\u015F yap\u0131n</p>
        <div className="add-ip">
            <input type="text" placeholder="IP Adresi (\u00F6rn: 192.168.1.1)" value={newIp}
                onChange={(e) => setNewIp(e.target.value)} className="ip-input" />
            <button className="add-btn" onClick={addIPToWhitelist}>+ Ekle</button>
        </div>
        <div className="ip-list">
            {ipWhitelist.map((item) => (
                <div key={item.id} className="ip-card">
                    <div className="ip-info">
                        <span className="ip-address">{item.ip_address}</span>
                        <span className="ip-added">Eklendi: {new Date(item.created_at).toLocaleDateString('tr-TR')}</span>
                    </div>
                    <button className="remove-btn" onClick={() => removeIPFromWhitelist(item.id)}>Kald\u0131r</button>
                </div>
            ))}
        </div>
    </div>
);

export default IPWhitelistTab;
