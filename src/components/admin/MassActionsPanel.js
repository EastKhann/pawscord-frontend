/* eslint-disable jsx-a11y/label-has-associated-control */
// frontend/src/components/MassActionsPanel.js

import { useState } from 'react';

import PropTypes from 'prop-types';

import { FaTimes, FaUsers, FaBan, FaVolumeUp, FaTrash } from 'react-icons/fa';

import toast from '../../utils/toast';

import { useTranslation } from 'react-i18next';

import logger from '../../utils/logger';

/**


 * ⚡ Mass Actions Panel


 * Toplu moderasyon işlemleri


 */

const MassActionsPanel = ({ fetchWithAuth, apiBaseUrl, serverId, onClose }) => {
    const { t } = useTranslation();
    const [actionType, setActionType] = useState('ban');

    const [isLoading, setIsLoading] = useState(false);

    const [userIds, setUserIds] = useState('');

    const [reason, setReason] = useState('');

    const [duration, setDuration] = useState('');

    const [processing, setProcessing] = useState(false);

    const executeAction = async () => {
        if (!userIds.trim()) {
            toast.error(t('admin.massActions.enterUserIds'));

            return;
        }

        const ids = userIds
            .split('\n')
            .map((id) => id.trim())
            .filter((id) => id);

        if (ids.length === 0) {
            toast.error(t('ui.gecerli_kullanici_id'));

            return;
        }

        try {
            setProcessing(true);

            const response = await fetchWithAuth(`${apiBaseUrl}/moderation/mass_action/create/`, {
                method: 'POST',

                headers: { 'Content-Type': 'application/json' },

                body: JSON.stringify({
                    server_id: serverId,

                    action_type: actionType,

                    user_ids: ids,

                    reason,

                    duration: duration || null,
                }),
            });

            if (response.ok) {
                toast.success(
                    t('admin.massActions.applied', { count: ids.length, action: actionType })
                );

                setUserIds('');

                setReason('');

                setDuration('');
            } else {
                toast.error(t('admin.massActions.operationFailed'));
            }
        } catch (error) {
            logger.error('Mass action error:', error);

            toast.error(t('admin.massActions.anErrorOccurred'));
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div
            style={styles.overlay}
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                style={styles.modal}
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div style={styles.header}>
                    <div className="flex-align-10">
                        <FaUsers className="icon-danger" />

                        <h2 className="m-0">Toplu Moderasyon</h2>
                    </div>

                    <FaTimes onClick={onClose} style={styles.closeBtn} />
                </div>

                <div style={styles.content}>
                    <div style={styles.field}>
                        <label style={styles.label}>Eylem Türü</label>

                        <select
                            value={actionType}
                            onChange={(e) => setActionType(e.target.value)}
                            style={styles.select}
                        >
                            <option value="ban">🔨 Yasak (Ban)</option>

                            <option value="kick">💢 Kick (At)</option>

                            <option value="mute">🔇 Mute (Mute)</option>

                            <option value="timeout">⏰ Timeout</option>

                            <option value="warn">⚠️ Warn (Uyar)</option>

                            <option value="delete_messages">🗑️ Delete Messages</option>
                        </select>
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>User IDs (one per line)</label>

                        <textarea
                            value={userIds}
                            onChange={(e) => setUserIds(e.target.value)}
                            placeholder="123456789&#10;987654321&#10;555555555"
                            style={styles.textarea}
                            rows={8}
                        />
                    </div>

                    {(actionType === 'mute' || actionType === 'timeout') && (
                        <div style={styles.field}>
                            <label style={styles.label}>Süre (dakika)</label>

                            <input
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                placeholder="60"
                                style={styles.input}
                            />
                        </div>
                    )}

                    <div style={styles.field}>
                        <label style={styles.label}>Sebep (isteğe bağlı)</label>

                        <input
                            type="text"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Spam, kural ihlali, vb."
                            style={styles.input}
                            aria-label="Sebep"
                        />
                    </div>

                    <div style={styles.warning}>
                        ⚠️ Bu eylem{' '}
                        <strong>{userIds.split('\n').filter((id) => id.trim()).length}</strong>{' '}
                        kullanıcıyı etkileyecek!
                    </div>
                </div>

                <div style={styles.footer}>
                    <button aria-label="Kapat" onClick={onClose} style={styles.cancelBtn}>
                        İptal
                    </button>

                    <button
                        aria-label="Eylemi uygula"
                        onClick={executeAction}
                        disabled={processing}
                        style={styles.executeBtn}
                    >
                        {processing ? 'İşleniyor...' : 'Uygula'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',

        top: 0,

        left: 0,

        right: 0,

        bottom: 0,

        backgroundColor: 'rgba(0,0,0,0.7)',

        display: 'flex',

        alignItems: 'center',

        justifyContent: 'center',

        zIndex: 999999,
    },

    modal: {
        backgroundColor: '#1e1e1e',

        borderRadius: '8px',

        width: '90%',

        maxWidth: '600px',

        maxHeight: '90vh',

        display: 'flex',

        flexDirection: 'column',

        color: '#fff',
    },

    header: {
        display: 'flex',

        justifyContent: 'space-between',

        alignItems: 'center',

        padding: '20px',

        borderBottom: '1px solid #333',
    },

    closeBtn: {
        cursor: 'pointer',

        fontSize: '24px',

        color: '#888',
    },

    content: {
        flex: 1,

        overflowY: 'auto',

        padding: '20px',
    },

    field: {
        marginBottom: '20px',
    },

    label: {
        display: 'block',

        marginBottom: '8px',

        color: '#dbdee1',

        fontSize: '14px',

        fontWeight: '600',
    },

    select: {
        width: '100%',

        padding: '10px',

        backgroundColor: '#111214',

        border: '1px solid #444',

        borderRadius: '4px',

        color: '#fff',

        fontSize: '14px',
    },

    textarea: {
        width: '100%',

        padding: '10px',

        backgroundColor: '#111214',

        border: '1px solid #444',

        borderRadius: '4px',

        color: '#fff',

        fontSize: '14px',

        fontFamily: 'monospace',

        resize: 'vertical',
    },

    input: {
        width: '100%',

        padding: '10px',

        backgroundColor: '#111214',

        border: '1px solid #444',

        borderRadius: '4px',

        color: '#fff',

        fontSize: '14px',
    },

    warning: {
        backgroundColor: '#f0b2321a',

        border: '1px solid #f0b232',

        borderRadius: '4px',

        padding: '15px',

        color: '#f0b232',

        fontSize: '14px',

        textAlign: 'center',
    },

    footer: {
        display: 'flex',

        gap: '10px',

        padding: '20px',

        borderTop: '1px solid #333',
    },

    cancelBtn: {
        flex: 1,

        backgroundColor: '#111214',

        color: '#fff',

        border: 'none',

        padding: '12px',

        borderRadius: '4px',

        cursor: 'pointer',

        fontSize: '16px',

        fontWeight: '600',
    },

    executeBtn: {
        flex: 1,

        backgroundColor: '#f23f42',

        color: '#fff',

        border: 'none',

        padding: '12px',

        borderRadius: '4px',

        cursor: 'pointer',

        fontSize: '16px',

        fontWeight: '600',
    },
};

MassActionsPanel.propTypes = {
    fetchWithAuth: PropTypes.func,

    apiBaseUrl: PropTypes.string,

    serverId: PropTypes.string,

    onClose: PropTypes.func,
};

export default MassActionsPanel;
