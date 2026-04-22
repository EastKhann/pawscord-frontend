/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import { getToken } from '../../utils/tokenStorage';
import PropTypes from 'prop-types';
import './ServerBackupPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';
import confirmDialog from '../../utils/confirmDialog';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

const ServerBackupPanel = ({ serverId, onClose }) => {
    const { t } = useTranslation();
    const apiBaseUrl = getApiBase();

    const [backups, setBackups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [backupOptions, setBackupOptions] = useState({
        include_channels: true,
        include_roles: true,
        include_messages: false,
        include_settings: true,
        include_emojis: true,
    });

    useEffect(() => {
        fetchBackups();
    }, [serverId]);

    const fetchBackups = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/backups/server/${serverId}/`, {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (response.ok) {
                const data = await response.json();
                setBackups(data);
            }
        } catch (error) {
            logger.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const createBackup = async () => {
        setCreating(true);
        try {
            const response = await fetch(`${apiBaseUrl}/backups/create/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ server_id: serverId, ...backupOptions }),
            });

            if (response.ok) {
                toast.success(t('ui.yedek_olusturuluyor'));
                fetchBackups();
            } else {
                toast.error(t('ui.yedek_olusturulamadi'));
            }
        } catch (error) {
            toast.error(t('backup.connectionError'));
        } finally {
            setCreating(false);
        }
    };

    const restoreBackup = async (backupId) => {
        if (
            !(await confirmDialog(
                t('backup.restoreConfirm', 'Are you sure you want to restore from this backup? This action cannot be undone!')
            ))
        )
            return;

        try {
            const response = await fetch(`${apiBaseUrl}/backups/${backupId}/restore/`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (response.ok) {
                toast.success(t('ui.server_back_yukleniyor'));
            } else {
                toast.error(t('ui.geri_load_hatasi'));
            }
        } catch (error) {
            toast.error(t('backup.connectionError'));
        }
    };

    const downloadBackup = async (backupId) => {
        try {
            const response = await fetch(`${apiBaseUrl}/backups/${backupId}/download/`, {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `backup_${backupId}.json`;
                a.click();
                toast.success(t('backup.downloading'));
            }
        } catch (error) {
            toast.error(t('ui.downloadme_hatasi'));
        }
    };

    const deleteBackup = async (backupId) => {
        if (!(await confirmDialog(t('backup.deleteConfirm', 'Are you sure you want to delete this backup?')))) return;
        try {
            const response = await fetch(`${apiBaseUrl}/backups/${backupId}/delete/`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (response.ok) {
                toast.success(t('backup.deleted'));
                fetchBackups();
            }
        } catch (error) {
            toast.error(t('backup.deleteFailed'));
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };

    const getStatusBadge = (status) => {
        const badges = {
            completed: { text: 'Completed', color: '#22c55e', icon: '✅' },
            processing: { text: 'Processing', color: '#f59e0b', icon: '⏳' },
            failed: { text: 'Failed', color: '#f23f42', icon: '❌' },
        };
        return badges[status] || badges.processing;
    };

    return (
        <div
            className="backup-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="backup-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="backup-header">
                    <h2>💾 Server Yedekleme</h2>
                    <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="backup-content">
                    <div className="create-backup-section">
                        <h3>{t('backup.createNew', 'Create New Backup')}</h3>
                        <div className="backup-options">
                            <label className="option-label">
                                <input
                                    type="checkbox"
                                    checked={backupOptions.include_channels}
                                    onChange={(e) =>
                                        setBackupOptions({
                                            ...backupOptions,
                                            include_channels: e.target.checked,
                                        })
                                    }
                                />
                                <span>{t('backup.includeChannels', '📁 Include channels')}</span>
                            </label>
                            <label className="option-label">
                                <input
                                    type="checkbox"
                                    checked={backupOptions.include_roles}
                                    onChange={(e) =>
                                        setBackupOptions({
                                            ...backupOptions,
                                            include_roles: e.target.checked,
                                        })
                                    }
                                />
                                <span>🎭 Rolleri dahil et</span>
                            </label>
                            <label className="option-label">
                                <input
                                    type="checkbox"
                                    checked={backupOptions.include_messages}
                                    onChange={(e) =>
                                        setBackupOptions({
                                            ...backupOptions,
                                            include_messages: e.target.checked,
                                        })
                                    }
                                />
                                <span>{t('backup.includeMessages', '💬 Include messages (last 100)')}</span>
                            </label>
                            <label className="option-label">
                                <input
                                    type="checkbox"
                                    checked={backupOptions.include_settings}
                                    onChange={(e) =>
                                        setBackupOptions({
                                            ...backupOptions,
                                            include_settings: e.target.checked,
                                        })
                                    }
                                />
                                <span>{t('backup.includeSettings', '⚙️ Include settings')}</span>
                            </label>
                            <label className="option-label">
                                <input
                                    type="checkbox"
                                    checked={backupOptions.include_emojis}
                                    onChange={(e) =>
                                        setBackupOptions({
                                            ...backupOptions,
                                            include_emojis: e.target.checked,
                                        })
                                    }
                                />
                                <span>😀 Emojforward dahil et</span>
                            </label>
                        </div>
                        <button
                            aria-label={t('serverBackup.createBtn', 'Create backup')}
                            className="create-backup-btn"
                            onClick={createBackup}
                            disabled={creating}
                        >
                            {creating ? t('backup.creating', '⏳ Creating...') : t('backup.create', '💾 Create Backup')}
                        </button>
                    </div>

                    {loading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>{t('common.loading')}</p>
                        </div>
                    ) : backups.length === 0 ? (
                        <div className="empty-state">
                            <span className="empty-icon">💾</span>
                            <p>{t('backup.noBackups', 'No backups yet')}</p>
                        </div>
                    ) : (
                        <div className="backups-list">
                            <h3>Mevcut Yedekler ({backups.length})</h3>
                            {backups.map((backup) => {
                                const badge = getStatusBadge(backup.status);
                                return (
                                    <div key={backup.id} className="backup-card">
                                        <div className="backup-info">
                                            <div className="backup-main">
                                                <h4>Yedek #{backup.id}</h4>
                                                <div className="backup-meta">
                                                    <span>
                                                        📅{' '}
                                                        {new Date(backup.created_at).toLocaleString(
                                                            'tr-TR'
                                                        )}
                                                    </span>
                                                    <span>
                                                        📦 {formatFileSize(backup.file_size)}
                                                    </span>
                                                    <span
                                                        className="status-badge"
                                                        style={{ background: badge.color }}
                                                    >
                                                        {badge.icon} {badge.text}
                                                    </span>
                                                </div>
                                                <div className="backup-includes">
                                                    {backup.includes_channels && (
                                                        <span className="include-badge">
                                                            📁 Kanallar
                                                        </span>
                                                    )}
                                                    {backup.includes_roles && (
                                                        <span className="include-badge">
                                                            🎭 Roller
                                                        </span>
                                                    )}
                                                    {backup.includes_messages && (
                                                        <span className="include-badge">
                                                            💬 Mesajlar
                                                        </span>
                                                    )}
                                                    {backup.includes_settings && (
                                                        <span className="include-badge">
                                                            ⚙️ Ayarlar
                                                        </span>
                                                    )}
                                                    {backup.includes_emojis && (
                                                        <span className="include-badge">
                                                            😀 Emojiler
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {backup.status === 'completed' && (
                                            <div className="backup-actions">
                                                <button
                                                    aria-label={t('serverBackup.restore', 'Restore backup')}
                                                    className="restore-btn"
                                                    onClick={() => restoreBackup(backup.id)}
                                                >
                                                    🔄 Geri Upload
                                                </button>
                                                <button
                                                    aria-label={t('serverBackup.download', 'Download backup')}
                                                    className="download-btn"
                                                    onClick={() => downloadBackup(backup.id)}
                                                >
                                                    📥 Download
                                                </button>
                                                <button
                                                    aria-label={t('serverBackup.delete', 'Delete backup')}
                                                    className="delete-btn"
                                                    onClick={() => deleteBackup(backup.id)}
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

ServerBackupPanel.propTypes = {
    serverId: PropTypes.string,
    onClose: PropTypes.func,
};
export default ServerBackupPanel;
