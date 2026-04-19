/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import { getToken } from '../../utils/tokenStorage';
import PropTypes from 'prop-types';
import './PermissionsPanel.css';
import {
    FaShieldAlt,
    FaTimes,
    FaPlus,
    FaEdit,
    FaTrash,
    FaUsers,
    FaCrown,
    FaLock,
} from 'react-icons/fa';
import { getApiBase } from '../../utils/apiEndpoints';
import confirmDialog from '../../utils/confirmDialog';
import logger from '../../utils/logger';

const PermissionsPanel = ({ serverId, roleId, onClose }) => {
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);
    const [permissions, setPermissions] = useState({});
    const [presets, setPresets] = useState([]);
    const [loading, setLoading] = useState(true);

    const permissionCategories = {
        general: {
            label: 'Genel \u0130zinler',
            permissions: [
                {
                    key: 'view_channels',
                    label: 'Kanallar\u0131 G\u00f6r\u00fcnt\u00fcle',
                    description:
                        '\u00dcyelerin kanallar\u0131 g\u00f6r\u00fcnt\u00fclemesine izin ver',
                },
                {
                    key: 'manage_channels',
                    label: 'Kanallar\u0131 Y\u00f6net',
                    description: 'Kanal olu\u015ftur, d\u00fczenle ve sil',
                },
                {
                    key: 'manage_roles',
                    label: 'Rolleri Y\u00f6net',
                    description: 'Rol olu\u015ftur ve d\u00fczenle',
                },
                {
                    key: 'manage_server',
                    label: 'Sunucuyu Y\u00f6net',
                    description: 'Sunucu ayarlar\u0131n\u0131 de\u011fi\u015ftir',
                },
                {
                    key: 'kick_members',
                    label: '\u00dcye At',
                    description: '\u00dcyeleri sunucudan at',
                },
                {
                    key: 'ban_members',
                    label: '\u00dcye Banla',
                    description: '\u00dcyeleri sunucudan banla',
                },
                {
                    key: 'create_invite',
                    label: 'Davet Olu\u015ftur',
                    description: 'Davet ba\u011flant\u0131s\u0131 olu\u015ftur',
                },
                {
                    key: 'change_nickname',
                    label: 'Takma Ad\u0131 De\u011fi\u015ftir',
                    description: 'Kendi takma ad\u0131n\u0131 de\u011fi\u015ftir',
                },
                {
                    key: 'manage_nicknames',
                    label: 'Takma Adlar\u0131 Y\u00f6net',
                    description:
                        'Di\u011fer \u00fcyelerin takma adlar\u0131n\u0131 de\u011fi\u015ftir',
                },
                {
                    key: 'manage_emojis',
                    label: 'Emojileri Y\u00f6net',
                    description: 'Emoji ekle ve kald\u0131r',
                },
            ],
        },
        text: {
            label: 'Metin Kanal\u0131 \u0130zinleri',
            permissions: [
                {
                    key: 'send_messages',
                    label: 'Mesaj G\u00f6nder',
                    description: 'Metin kanallar\u0131nda mesaj g\u00f6nder',
                },
                {
                    key: 'embed_links',
                    label: 'Ba\u011flant\u0131 G\u00f6m',
                    description:
                        'Ba\u011flant\u0131lar g\u00f6m\u00fcl\u00fc i\u00e7erik g\u00f6sterir',
                },
                {
                    key: 'attach_files',
                    label: 'Dosya Ekle',
                    description: 'Resim ve dosya y\u00fckle',
                },
                {
                    key: 'add_reactions',
                    label: 'Tepki Ekle',
                    description: 'Mesajlara yeni tepkiler ekle',
                },
                {
                    key: 'use_external_emojis',
                    label: 'D\u0131\u015f Emoji Kullan',
                    description: 'Di\u011fer sunuculardan emoji kullan',
                },
                {
                    key: 'mention_everyone',
                    label: '@everyone Bahset',
                    description: '@everyone ve @here bahsetmelerini kullan',
                },
                {
                    key: 'manage_messages',
                    label: 'Mesajlar\u0131 Y\u00f6net',
                    description:
                        'Di\u011fer kullan\u0131c\u0131lar\u0131n mesajlar\u0131n\u0131 sil',
                },
                {
                    key: 'read_message_history',
                    label: 'Mesaj Ge\u00e7mi\u015fini Oku',
                    description: 'Ge\u00e7mi\u015f mesajlar\u0131 g\u00f6r\u00fcnt\u00fcle',
                },
            ],
        },
        voice: {
            label: 'Ses Kanal\u0131 \u0130zinleri',
            permissions: [
                {
                    key: 'connect',
                    label: 'Ba\u011flan',
                    description: 'Ses kanallar\u0131na ba\u011flan',
                },
                {
                    key: 'speak',
                    label: 'Konu\u015f',
                    description: 'Ses kanallar\u0131nda konu\u015f',
                },
                { key: 'video', label: 'Video', description: 'Ses kanallar\u0131nda video kullan' },
                {
                    key: 'mute_members',
                    label: '\u00dcye Sustur',
                    description: 'Di\u011fer \u00fcyeleri sustur',
                },
                {
                    key: 'deafen_members',
                    label: '\u00dcye Sa\u011f\u0131rla\u015ft\u0131r',
                    description: 'Di\u011fer \u00fcyeleri sa\u011f\u0131rla\u015ft\u0131r',
                },
                {
                    key: 'move_members',
                    label: '\u00dcye Ta\u015f\u0131',
                    description: '\u00dcyeleri ses kanallar\u0131 aras\u0131nda ta\u015f\u0131',
                },
                {
                    key: 'priority_speaker',
                    label: 'Birincil Konu\u015fmac\u0131',
                    description: 'Konu\u015furken daha net duyul',
                },
            ],
        },
        advanced: {
            label: 'Geli\u015fmi\u015f \u0130zinler',
            permissions: [
                {
                    key: 'administrator',
                    label: 'Y\u00f6netici',
                    description: 'Sunucu \u00fczerinde tam kontrol',
                },
                {
                    key: 'view_audit_log',
                    label: 'Denetim Kayd\u0131n\u0131 G\u00f6r\u00fcnt\u00fcle',
                    description:
                        'Sunucu denetim kay\u0131tlar\u0131n\u0131 g\u00f6r\u00fcnt\u00fcle',
                },
                {
                    key: 'manage_webhooks',
                    label: 'Webhookleri Y\u00f6net',
                    description: 'Webhook olu\u015ftur ve d\u00fczenle',
                },
                {
                    key: 'manage_threads',
                    label: 'Konular\u0131 Y\u00f6net',
                    description: 'Forum konular\u0131n\u0131 y\u00f6net',
                },
            ],
        },
    };

    useEffect(() => {
        fetchRoles();
        fetchPresets();
    }, [serverId]);

    useEffect(() => {
        if (roleId) {
            const role = roles.find((r) => r.id === roleId);
            if (role) setSelectedRole(role);
        }
    }, [roleId, roles]);

    useEffect(() => {
        if (selectedRole) {
            fetchPermissions(selectedRole.id);
        }
    }, [selectedRole]);

    const fetchWithAuth = async (url, options = {}) => {
        const token = getToken();
        const response = await fetch(url, {
            ...options,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    };

    const fetchRoles = async () => {
        try {
            const data = await fetchWithAuth(`${getApiBase()}/permissions/${serverId}/roles/`);
            setRoles(data.roles || []);
        } catch (error) {
            logger.error('Roles fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPermissions = async (roleId) => {
        try {
            const data = await fetchWithAuth(`${getApiBase()}/permissions/${serverId}/${roleId}/`);
            setPermissions(data.permissions || {});
        } catch (error) {
            logger.error('Permissions fetch error:', error);
        }
    };

    const fetchPresets = async () => {
        try {
            const data = await fetchWithAuth(`${getApiBase()}/permissions/presets/`);
            setPresets(data.presets || []);
        } catch (error) {
            logger.error('Presets fetch error:', error);
        }
    };

    const updatePermission = async (permissionKey, value) => {
        const newPermissions = { ...permissions, [permissionKey]: value };
        setPermissions(newPermissions);

        try {
            await fetchWithAuth(
                `${getApiBase()}/permissions/${serverId}/${selectedRole.id}/update/`,
                {
                    method: 'PUT',
                    body: JSON.stringify({ permissions: newPermissions }),
                }
            );
        } catch (error) {
            logger.error('Permission update error:', error);
            showToast('İzin güncellenemedi', 'error');
        }
    };

    const applyPreset = async (presetId) => {
        try {
            const data = await fetchWithAuth(
                `${getApiBase()}/permissions/${serverId}/${selectedRole.id}/apply-preset/`,
                {
                    method: 'POST',
                    body: JSON.stringify({ preset_id: presetId }),
                }
            );
            setPermissions(data.permissions);
            showToast('Ön ayar başarıyla uygulandı!');
        } catch (error) {
            logger.error('Apply preset error:', error);
            showToast('Ön ayar uygulanamadı', 'error');
        }
    };

    const copyFromRole = async (sourceRoleId) => {
        try {
            const data = await fetchWithAuth(
                `${getApiBase()}/permissions/${serverId}/${selectedRole.id}/copy/`,
                {
                    method: 'POST',
                    body: JSON.stringify({ source_role_id: sourceRoleId }),
                }
            );
            setPermissions(data.permissions);
            showToast('İzinler başarıyla kopyalandı!');
        } catch (error) {
            logger.error('Copy permissions error:', error);
            showToast('İzinler kopyalanamadı', 'error');
        }
    };

    const resetPermissions = async () => {
        if (
            !(await confirmDialog(
                'Tüm izinleri varsayılana sıfırlamak istediğinizden emin misiniz?'
            ))
        )
            return;

        try {
            const data = await fetchWithAuth(
                `${getApiBase()}/permissions/${serverId}/${selectedRole.id}/reset/`,
                {
                    method: 'POST',
                }
            );
            setPermissions(data.permissions);
            showToast('İzinler varsayılana sıfırlandı!');
        } catch (error) {
            logger.error('Reset permissions error:', error);
            showToast('İzinler sıfırlanamadı', 'error');
        }
    };

    const showToast = (message, type = 'success') => {};

    const getRoleIcon = (roleName) => {
        if (roleName.toLowerCase().includes('owner') || roleName.toLowerCase().includes('admin')) {
            return <FaCrown />;
        } else if (roleName.toLowerCase().includes('mod')) {
            return <FaShieldAlt />;
        } else {
            return <FaUsers />;
        }
    };

    if (loading) {
        return (
            <div className="permissions-overlay">
                <div className="permissions-panel loading">
                    <div className="spinner" />
                    <p>İzinler yükleniyor...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="permissions-overlay">
            <div className="permissions-panel">
                <div className="panel-header">
                    <h2>
                        <FaShieldAlt /> Permissions Manager
                    </h2>
                    <button aria-label="Close" onClick={onClose} className="btn-close">
                        <FaTimes />
                    </button>
                </div>

                <div className="permissions-layout">
                    {/* Roles Sidebar */}
                    <div className="roles-sidebar">
                        <h3>Roles</h3>
                        <div className="roles-list">
                            {roles.map((role) => (
                                <div
                                    key={role.id}
                                    className={`role-item ${selectedRole?.id === role.id ? 'active' : ''}`}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => setSelectedRole(role)}
                                    onKeyDown={(e) =>
                                        (e.key === 'Enter' || e.key === ' ') &&
                                        e.currentTarget.click()
                                    }
                                >
                                    <div
                                        className="role-icon"
                                        style={{ background: role.color || '#5865f2' }}
                                    >
                                        {getRoleIcon(role.name)}
                                    </div>
                                    <div className="role-info">
                                        <h4>{role.name}</h4>
                                        <span className="role-members">
                                            {role.member_count || 0} members
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Permissions Editor */}
                    <div className="permissions-editor">
                        {selectedRole ? (
                            <>
                                <div className="editor-header">
                                    <div>
                                        <h3>{selectedRole.name}</h3>
                                        <p>Bu rol için izinleri yapılandırın</p>
                                    </div>
                                    <div className="editor-actions">
                                        <select
                                            onChange={(e) => applyPreset(e.target.value)}
                                            defaultValue=""
                                        >
                                            <option value="" disabled>
                                                Ayar Uygula...
                                            </option>
                                            {presets.map((preset) => (
                                                <option key={preset.id} value={preset.id}>
                                                    {preset.name}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            onChange={(e) => copyFromRole(e.target.value)}
                                            defaultValue=""
                                        >
                                            <option value="" disabled>
                                                Buradan Kopyala...
                                            </option>
                                            {roles
                                                .filter((r) => r.id !== selectedRole.id)
                                                .map((role) => (
                                                    <option key={role.id} value={role.id}>
                                                        {role.name}
                                                    </option>
                                                ))}
                                        </select>
                                        <button
                                            aria-label="reset Permissions"
                                            onClick={resetPermissions}
                                            className="btn-reset"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </div>

                                <div className="permissions-grid">
                                    {Object.entries(permissionCategories).map(
                                        ([categoryKey, category]) => (
                                            <div key={categoryKey} className="permission-category">
                                                <h4>{category.label}</h4>
                                                <div className="permissions-list">
                                                    {category.permissions.map((permission) => (
                                                        <div
                                                            key={permission.key}
                                                            className="permission-item"
                                                        >
                                                            <div className="permission-info">
                                                                <h5>{permission.label}</h5>
                                                                <p>{permission.description}</p>
                                                            </div>
                                                            <label className="permission-toggle">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={
                                                                        permissions[
                                                                            permission.key
                                                                        ] || false
                                                                    }
                                                                    onChange={(e) =>
                                                                        updatePermission(
                                                                            permission.key,
                                                                            e.target.checked
                                                                        )
                                                                    }
                                                                />
                                                                <span className="toggle-slider"></span>
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="no-role-selected">
                                <FaLock size={64} />
                                <h3>Rol Seçin</h3>
                                <p>Yapılandırmak için soldan bir rol seçin</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

PermissionsPanel.propTypes = {
    serverId: PropTypes.string,
    roleId: PropTypes.string,
    onClose: PropTypes.func,
};
export default PermissionsPanel;
