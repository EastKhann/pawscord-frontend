/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import { getToken } from '../../utils/tokenStorage';
import PropTypes from 'prop-types';
import './ReactionRolesPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';
import confirmDialog from '../../utils/confirmDialog';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

const ReactionRolesPanel = ({ serverId, onClose }) => {
    const { t } = useTranslation();
    const [reactionRoles, setReactionRoles] = useState([]);
    const [roles, setRoles] = useState([]);
    const [channels, setChannels] = useState([]);
    const [newReactionRole, setNewReactionRole] = useState({
        message_id: '',
        channel_id: '',
        emoji: '',
        role_id: '',
        description: '',
    });
    const [loading, setLoading] = useState(true);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const apiBaseUrl = getApiBase();

    useEffect(() => {
        if (serverId) {
            fetchReactionRoles();
            fetchRoles();
            fetchChannels();
        }
    }, [serverId]);

    const fetchReactionRoles = async () => {
        try {
            const token = getToken();
            const response = await fetch(`${apiBaseUrl}/reaction-roles/server/${serverId}/`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setReactionRoles(data.reaction_roles || []);
            }
        } catch (error) {
            logger.error('Error fetching reaction roles:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRoles = async () => {
        try {
            const token = getToken();
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/roles/`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setRoles(data.roles || []);
            }
        } catch (error) {
            logger.error('Error fetching roles:', error);
        }
    };

    const fetchChannels = async () => {
        try {
            const token = getToken();
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/channels/`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setChannels(data.channels || []);
            }
        } catch (error) {
            logger.error('Error fetching channels:', error);
        }
    };

    const createReactionRole = async () => {
        if (!newReactionRole.message_id || !newReactionRole.emoji || !newReactionRole.role_id) {
            toast.error(t('reactionRole.requiredFields'));
            return;
        }

        try {
            const token = getToken();
            const response = await fetch(`${apiBaseUrl}/reaction-roles/create/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    server_id: serverId,
                    ...newReactionRole,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setReactionRoles([...reactionRoles, data.reaction_role]);
                setNewReactionRole({
                    message_id: '',
                    channel_id: '',
                    emoji: '',
                    role_id: '',
                    description: '',
                });
                toast.success(t('reactionRole.created'));
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || t('reactionRole.createFailed'));
            }
        } catch (error) {
            logger.error('Error creating reaction role:', error);
            toast.error(t('reactionRole.createFailed'));
        }
    };

    const deleteReactionRole = async (id) => {
        if (!(await confirmDialog('Bu tepki rolünü silmek istediğinizden emin misiniz?'))) {
            return;
        }

        try {
            const token = getToken();
            const response = await fetch(`${apiBaseUrl}/reaction-roles/${id}/delete/`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                setReactionRoles(reactionRoles.filter((rr) => rr.id !== id));
                toast.success(t('reactionRole.deleted'));
            }
        } catch (error) {
            logger.error('Error deleting reaction role:', error);
            toast.error(t('reactionRole.deleteFailed'));
        }
    };

    const syncReactionRoles = async () => {
        try {
            const token = getToken();
            const response = await fetch(`${apiBaseUrl}/reaction-roles/server/${serverId}/sync/`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                toast.success(t('reactionRole.synced'));
                fetchReactionRoles();
            }
        } catch (error) {
            logger.error('Error syncing reaction roles:', error);
            toast.error(t('ui.sync_failed_2'));
        }
    };

    const commonEmojis = [
        '❤️',
        '💙',
        '💚',
        '💛',
        '🧡',
        '💜',
        '🖤',
        '🤍',
        '🔴',
        '🟠',
        '🟡',
        '🟢',
        '🔵',
        '🟣',
        '⚪',
        '⚫',
        '✅',
        '❌',
        '⭐',
        '🎉',
        '🎮',
        '🎵',
        '📚',
        '🏆',
    ];

    if (loading) {
        return (
            <div className="reaction-roles-overlay">
                <div className="reaction-roles-panel">
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Tepki rolleri yükleniyor...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="reaction-roles-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="reaction-roles-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="reaction-header">
                    <h2>⭐ Reaction Roles</h2>
                    <button aria-label="Close" className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="create-section">
                    <h3>🆕 New Reaction Role</h3>

                    <div className="form-grid">
                        <div className="form-group full-width">
                            <label>Channel</label>
                            <select
                                value={newReactionRole.channel_id}
                                onChange={(e) =>
                                    setNewReactionRole({
                                        ...newReactionRole,
                                        channel_id: e.target.value,
                                    })
                                }
                            >
                                <option value="">Kanal seç (isteğe bağlı)</option>
                                {channels.map((channel) => (
                                    <option key={channel.id} value={channel.id}>
                                        #{channel.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Mesaj ID *</label>
                            <input
                                type="text"
                                placeholder="Mesaj ID'sini girin"
                                value={newReactionRole.message_id}
                                onChange={(e) =>
                                    setNewReactionRole({
                                        ...newReactionRole,
                                        message_id: e.target.value,
                                    })
                                }
                            />
                            <span className="input-hint">
                                Mesaja sağ tıklayın → Mesaj ID'sini kopyalayın
                            </span>
                        </div>

                        <div className="form-group">
                            <label>Rol *</label>
                            <select
                                value={newReactionRole.role_id}
                                onChange={(e) =>
                                    setNewReactionRole({
                                        ...newReactionRole,
                                        role_id: e.target.value,
                                    })
                                }
                            >
                                <option value="">Rol seç</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group full-width">
                            <label>Emoji *</label>
                            <div className="emoji-input-group">
                                <input
                                    type="text"
                                    placeholder={t('ui.emoji_select_or_enter')}
                                    value={newReactionRole.emoji}
                                    onChange={(e) =>
                                        setNewReactionRole({
                                            ...newReactionRole,
                                            emoji: e.target.value,
                                        })
                                    }
                                    readOnly
                                />
                                <button
                                    aria-label="Action button"
                                    className="emoji-picker-btn"
                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                >
                                    😀
                                </button>
                            </div>

                            {showEmojiPicker && (
                                <div className="emoji-picker">
                                    {commonEmojis.map((emoji) => (
                                        <button
                                            aria-label="Action button"
                                            key={emoji}
                                            className="emoji-option"
                                            onClick={() => {
                                                setNewReactionRole({ ...newReactionRole, emoji });
                                                setShowEmojiPicker(false);
                                            }}
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="form-group full-width">
                            <label>Description</label>
                            <input
                                type="text"
                                placeholder={t('ui.role_description_optional')}
                                value={newReactionRole.description}
                                onChange={(e) =>
                                    setNewReactionRole({
                                        ...newReactionRole,
                                        description: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <button
                        aria-label="create Reaction Role"
                        className="create-btn"
                        onClick={createReactionRole}
                    >
                        ➕ Create Reaction Role
                    </button>
                </div>

                <div className="actions-bar">
                    <div className="info-text">
                        <span className="count-badge">{reactionRoles.length}</span> adet reaction
                        role
                    </div>
                    <button
                        aria-label="sync Reaction Roles"
                        className="sync-btn"
                        onClick={syncReactionRoles}
                    >
                        🔄 Senkronize Et
                    </button>
                </div>

                <div className="reaction-roles-list">
                    {reactionRoles.length === 0 ? (
                        <div className="empty-state">
                            <span className="empty-icon">⭐</span>
                            <p>Henüz tepki rolü yok</p>
                            <span>Kullanıcıların emoji ile rol almasını sağlayın</span>
                        </div>
                    ) : (
                        reactionRoles.map((rr) => (
                            <div key={rr.id} className="reaction-role-card">
                                <div className="rr-header">
                                    <div className="rr-emoji">{rr.emoji}</div>
                                    <div className="rr-info">
                                        <h4>{rr.role_name || `Role #${rr.role_id}`}</h4>
                                        {rr.description && (
                                            <p className="rr-description">{rr.description}</p>
                                        )}
                                    </div>
                                    <button
                                        aria-label="Action button"
                                        className="delete-btn"
                                        onClick={() => deleteReactionRole(rr.id)}
                                    >
                                        🗑️
                                    </button>
                                </div>

                                <div className="rr-meta">
                                    <div className="meta-item">
                                        <span className="meta-label">📢 Channel:</span>
                                        <span className="meta-value">
                                            {rr.channel_name
                                                ? `${rr.channel_name}`
                                                : 'Belirtilmedi'}
                                        </span>
                                    </div>
                                    <div className="meta-item">
                                        <span className="meta-label">💬 Message ID:</span>
                                        <span className="meta-value mono">{rr.message_id}</span>
                                    </div>
                                    <div className="meta-item">
                                        <span className="meta-label">👥 Kullanımlar:</span>
                                        <span className="meta-value">
                                            {rr.usage_count || 0} kez kullanıldı
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

ReactionRolesPanel.propTypes = {
    serverId: PropTypes.string,
    onClose: PropTypes.func,
};
export default ReactionRolesPanel;
