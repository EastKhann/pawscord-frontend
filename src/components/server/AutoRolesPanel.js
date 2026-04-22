/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import { getToken } from '../../utils/tokenStorage';
import PropTypes from 'prop-types';
import './AutoRolesPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';
import confirmDialog from '../../utils/confirmDialog';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

const AutoRolesPanel = ({ serverId, onClose }) => {
    const { t } = useTranslation();
    const apiBaseUrl = getApiBase();

    const [autoRoles, setAutoRoles] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newAutoRole, setNewAutoRole] = useState({
        role_id: '',
        trigger_type: 'on_join',
        delay: 0,
        required_level: 0,
        required_invites: 0,
        required_messages: 0,
        remove_after: 0,
        enabled: true,
    });

    const triggerTypes = [
        { value: 'on_join', label: t('ui.join_serverinca'), icon: '👋' },
        { value: 'on_verify', label: t('ui.dogrulama_sonrasi'), icon: '✅' },
        { value: 'on_level', label: t('ui.levelye_ulasinca'), icon: '⭐' },
        { value: 'on_invites', label: t('ui.davet_sayisi'), icon: '👥' },
        { value: 'on_messages', label: t('admin.panel.messageCount'), icon: '💬' },
        { value: 'on_reaction', label: 'Reactions Verince', icon: '😀' },
        { value: 'on_boost', label: 'Server Boost', icon: '🚀' },
    ];

    useEffect(() => {
        fetchAutoRoles();
        fetchRoles();
    }, [serverId]);

    const fetchAutoRoles = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/auto-roles/server/${serverId}/`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setAutoRoles(data);
            }
        } catch (error) {
            logger.error('Error fetching auto roles:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/roles/server/${serverId}/`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setRoles(data);
            }
        } catch (error) {
            logger.error('Error fetching roles:', error);
        }
    };

    const createAutoRole = async () => {
        if (!newAutoRole.role_id) {
            toast.error(t('ui.please_select_role'));
            return;
        }

        try {
            const response = await fetch(`${apiBaseUrl}/auto-roles/create/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    server_id: serverId,
                    ...newAutoRole,
                }),
            });

            if (response.ok) {
                toast.success(t('autoRole.created'));
                fetchAutoRoles();
                setNewAutoRole({
                    role_id: '',
                    trigger_type: 'on_join',
                    delay: 0,
                    required_level: 0,
                    required_invites: 0,
                    required_messages: 0,
                    remove_after: 0,
                    enabled: true,
                });
            } else {
                toast.error(t('ui.otomatik_rol_olusturulamadi'));
            }
        } catch (error) {
            logger.error('Error creating auto role:', error);
            toast.error(t('autoRole.connectionError'));
        }
    };

    const toggleAutoRole = async (autoRoleId, currentStatus) => {
        try {
            const response = await fetch(`${apiBaseUrl}/auto-roles/${autoRoleId}/toggle/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });

            if (response.ok) {
                toast.success(
                    currentStatus ? t('ui.otomatik_rol_devre_disi') : t('autoRole.active')
                );
                fetchAutoRoles();
            } else {
                toast.error(t('autoRole.statusFailed'));
            }
        } catch (error) {
            logger.error('Error toggling auto role:', error);
            toast.error(t('autoRole.connectionError'));
        }
    };

    const deleteAutoRole = async (autoRoleId) => {
        if (!(await confirmDialog(t('autoRoles.deleteConfirm', 'Are you sure you want to delete this auto role?')))) return;

        try {
            const response = await fetch(`${apiBaseUrl}/auto-roles/${autoRoleId}/delete/`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });

            if (response.ok) {
                toast.success(t('autoRole.deleted'));
                fetchAutoRoles();
            } else {
                toast.error(t('autoRole.deleteFailed'));
            }
        } catch (error) {
            logger.error('Error deleting auto role:', error);
            toast.error(t('autoRole.connectionError'));
        }
    };

    const getRoleName = (roleId) => {
        const role = roles.find((r) => r.id === roleId);
        return role ? role.name : t('roles.unknown');
    };

    const getTriggerLabel = (type) => {
        const trigger = triggerTypes.find((t) => t.value === type);
        return trigger ? trigger.label : type;
    };

    const getTriggerIcon = (type) => {
        const trigger = triggerTypes.find((t) => t.value === type);
        return trigger ? trigger.icon : '⚙️';
    };

    const formatDelay = (seconds) => {
        if (seconds === 0) return t('ui.aninda');
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        if (hours > 0) return `${hours} ${t('common.hour')}`;
        return `${minutes} ${t('common.minute')}`;
    };

    return (
        <div
            className="autoroles-panel-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="autoroles-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="autoroles-header">
                    <h2>⚡ Auto Roles</h2>
                    <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="autoroles-content">
                    <div className="create-autorole-section">
                        <h3>Yeni Otomatik Rol Ekle</h3>

                        <div className="create-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Role *</label>
                                    <select
                                        value={newAutoRole.role_id}
                                        onChange={(e) =>
                                            setNewAutoRole({
                                                ...newAutoRole,
                                                role_id: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="">{t('common.selectRole', 'Select Role')}</option>
                                        {roles.map((role) => (
                                            <option key={role.id} value={role.id}>
                                                {role.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Trigger</label>
                                    <select
                                        value={newAutoRole.trigger_type}
                                        onChange={(e) =>
                                            setNewAutoRole({
                                                ...newAutoRole,
                                                trigger_type: e.target.value,
                                            })
                                        }
                                    >
                                        {triggerTypes.map((trigger) => (
                                            <option key={trigger.value} value={trigger.value}>
                                                {trigger.icon} {trigger.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Gecikme (Saniye)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder={t('ui.0_aninda')}
                                        value={newAutoRole.delay}
                                        onChange={(e) =>
                                            setNewAutoRole({
                                                ...newAutoRole,
                                                delay: parseInt(e.target.value) || 0,
                                            })
                                        }
                                    />
                                </div>

                                {newAutoRole.trigger_type === 'on_level' && (
                                    <div className="form-group">
                                        <label>Gerekli Level</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={newAutoRole.required_level}
                                            onChange={(e) =>
                                                setNewAutoRole({
                                                    ...newAutoRole,
                                                    required_level: parseInt(e.target.value) || 0,
                                                })
                                            }
                                        />
                                    </div>
                                )}

                                {newAutoRole.trigger_type === 'on_invites' && (
                                    <div className="form-group">
                                        <label>Gerekli Davet</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={newAutoRole.required_invites}
                                            onChange={(e) =>
                                                setNewAutoRole({
                                                    ...newAutoRole,
                                                    required_invites: parseInt(e.target.value) || 0,
                                                })
                                            }
                                        />
                                    </div>
                                )}

                                {newAutoRole.trigger_type === 'on_messages' && (
                                    <div className="form-group">
                                        <label>Gerekli Mesaj</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={newAutoRole.required_messages}
                                            onChange={(e) =>
                                                setNewAutoRole({
                                                    ...newAutoRole,
                                                    required_messages:
                                                        parseInt(e.target.value) || 0,
                                                })
                                            }
                                        />
                                    </div>
                                )}

                                <div className="form-group">
                                    <label>Auto Remove (Hours)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder={t('autoRoles.delay', '0 = Never')}
                                        value={newAutoRole.remove_after}
                                        onChange={(e) =>
                                            setNewAutoRole({
                                                ...newAutoRole,
                                                remove_after: parseInt(e.target.value) || 0,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <button
                                aria-label={t('autoRoles.createBtn', 'Create auto role')}
                                className="create-btn"
                                onClick={createAutoRole}
                            >
                                ⚡ Auto Role Create
                            </button>
                        </div>
                    </div>

                    <div className="autoroles-list-section">
                        <h3>Aktif Otomatik Roller ({autoRoles.length})</h3>

                        {loading ? (
                            <div className="loading-state">
                                <div className="spinner"></div>
                                <p>{t('autoRoles.loading', 'Loading auto roles...')}</p>
                            </div>
                        ) : autoRoles.length === 0 ? (
                            <div className="empty-state">
                                <span className="empty-icon">⚡</span>
                                <p>{t('autoRoles.noRoles', 'No auto roles yet')}</p>
                                <span className="empty-hint">
                                    {t('autoRoles.subtitle', 'You can set up automatic role assignments for users')}
                                </span>
                            </div>
                        ) : (
                            <div className="autoroles-list">
                                {autoRoles.map((autoRole) => (
                                    <div
                                        key={autoRole.id}
                                        className={`autorole-card ${!autoRole.enabled ? 'disabled' : ''}`}
                                    >
                                        <div className="autorole-card-header">
                                            <div className="role-info">
                                                <span className="trigger-icon">
                                                    {getTriggerIcon(autoRole.trigger_type)}
                                                </span>
                                                <div>
                                                    <h4>{getRoleName(autoRole.role_id)}</h4>
                                                    <span className="trigger-label">
                                                        {getTriggerLabel(autoRole.trigger_type)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="autorole-actions">
                                                <button
                                                    aria-label={autoRole.enabled ? t('autoRoles.disableRole', 'Disable role') : t('autoRoles.enableRole', 'Enable role')}
                                                    onClick={() =>
                                                        toggleAutoRole(
                                                            autoRole.id,
                                                            autoRole.enabled
                                                        )
                                                    }
                                                >
                                                    {autoRole.enabled ? '✓' : '○'}
                                                </button>
                                                <button
                                                    aria-label={t('autoRoles.deleteRole', 'Delete auto role')}
                                                    className="delete-btn"
                                                    onClick={() => deleteAutoRole(autoRole.id)}
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>

                                        <div className="autorole-details">
                                            {autoRole.delay > 0 && (
                                                <div className="detail-item">
                                                    <span className="detail-icon">⏱️</span>
                                                    <span>
                                                        Delay: {formatDelay(autoRole.delay)}
                                                    </span>
                                                </div>
                                            )}
                                            {autoRole.required_level > 0 && (
                                                <div className="detail-item">
                                                    <span className="detail-icon">⭐</span>
                                                    <span>
                                                        Level {autoRole.required_level} required
                                                    </span>
                                                </div>
                                            )}
                                            {autoRole.required_invites > 0 && (
                                                <div className="detail-item">
                                                    <span className="detail-icon">👥</span>
                                                    <span>
                                                        {autoRole.required_invites} invites required
                                                    </span>
                                                </div>
                                            )}
                                            {autoRole.required_messages > 0 && (
                                                <div className="detail-item">
                                                    <span className="detail-icon">💬</span>
                                                    <span>
                                                        {autoRole.required_messages} messages
                                                        required
                                                    </span>
                                                </div>
                                            )}
                                            {autoRole.remove_after > 0 && (
                                                <div className="detail-item">
                                                    <span className="detail-icon">🔄</span>
                                                    <span>
                                                        {autoRole.remove_after} hours then removed
                                                    </span>
                                                </div>
                                            )}
                                            {autoRole.uses_count > 0 && (
                                                <div className="detail-item">
                                                    <span className="detail-icon">📊</span>
                                                    <span>{autoRole.uses_count} times used</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

AutoRolesPanel.propTypes = {
    serverId: PropTypes.string,
    onClose: PropTypes.func,
};
export default AutoRolesPanel;
