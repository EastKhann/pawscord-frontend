/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaCog, FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useModalA11y from '../../hooks/useModalA11y';

import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '../../utils/apiEndpoints';
const ConfigurationModal = ({ integration, serverId, token, onClose, onSave }) => {
    const { t } = useTranslation();
    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Integration Settings' });
    const [config, setConfig] = useState({
        notifications_enabled: true,
        notification_channel: '',
        auto_sync: true,
        sync_interval: 30,
    });

    const handleSave = async () => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/servers/${serverId}/integrations/${integration.id}/configure/`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(config),
                }
            );

            if (response.ok) {
                toast.success(t('configModal.saved'));
                onSave();
                onClose();
            }
        } catch (error) {
            toast.error(t('configModal.saveFailed'));
        }
    };

    return (
        <div className="modal-overlay" {...overlayProps}>
            <div className="config-modal" {...dialogProps}>
                <h3>
                    <FaCog /> {integration.name} {t('integrations.settings','Settings')}
                </h3>

                <div className="config-section">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={config.notifications_enabled}
                            onChange={(e) =>
                                setConfig({ ...config, notifications_enabled: e.target.checked })
                            }
                        />
                        Notificationsi Enable
                    </label>
                </div>

                <div className="config-section">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={config.auto_sync}
                            onChange={(e) => setConfig({ ...config, auto_sync: e.target.checked })}
                        />
                        Auto Senkronizasyon
                    </label>
                </div>

                {config.auto_sync && (
                    <div className="form-group">
                        <label>{t('sync_interval_minutes')}</label>
                        <input
                            type="number"
                            value={config.sync_interval}
                            onChange={(e) =>
                                setConfig({ ...config, sync_interval: parseInt(e.target.value) })
                            }
                            min={5}
                            max={1440}
                        />
                    </div>
                )}

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>
                        {t('common.cancel')}
                    </button>
                    <button className="save-btn" onClick={handleSave}>
                        <FaCheck /> Kaydet
                    </button>
                </div>
            </div>
        </div>
    );
};

ConfigurationModal.propTypes = {
    integration: PropTypes.object,
    serverId: PropTypes.string,
    token: PropTypes.string,
    onClose: PropTypes.func,
    onSave: PropTypes.func,
};
export default ConfigurationModal;
