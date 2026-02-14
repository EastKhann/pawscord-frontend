import React, { useState } from 'react';
import { FaCog, FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ConfigurationModal = ({ integration, serverId, token, onClose, onSave }) => {
    const [config, setConfig] = useState({
        notifications_enabled: true,
        notification_channel: '',
        auto_sync: true,
        sync_interval: 30
    });

    const handleSave = async () => {
        try {
            const response = await fetch(`/api/servers/${serverId}/integrations/${integration.id}/configure/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(config)
            });

            if (response.ok) {
                toast.success('Ayarlar kaydedildi');
                onSave();
                onClose();
            }
        } catch (error) {
            toast.error('Ayarlar kaydedilemedi');
        }
    };

    return (
        <div className="modal-overlay" onClick={(e) => e.target.className === 'modal-overlay' && onClose()}>
            <div className="config-modal">
                <h3><FaCog /> {integration.name} Ayarları</h3>

                <div className="config-section">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={config.notifications_enabled}
                            onChange={(e) => setConfig({ ...config, notifications_enabled: e.target.checked })}
                        />
                        Bildirimleri Etkinleştir
                    </label>
                </div>

                <div className="config-section">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={config.auto_sync}
                            onChange={(e) => setConfig({ ...config, auto_sync: e.target.checked })}
                        />
                        Otomatik Senkronizasyon
                    </label>
                </div>

                {config.auto_sync && (
                    <div className="form-group">
                        <label>Senkronizasyon Aralığı (dakika)</label>
                        <input
                            type="number"
                            value={config.sync_interval}
                            onChange={(e) => setConfig({ ...config, sync_interval: parseInt(e.target.value) })}
                            min={5}
                            max={1440}
                        />
                    </div>
                )}

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>İptal</button>
                    <button className="save-btn" onClick={handleSave}>
                        <FaCheck /> Kaydet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfigurationModal;
