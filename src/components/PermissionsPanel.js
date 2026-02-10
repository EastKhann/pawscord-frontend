import React, { useState, useEffect } from 'react';
import './PermissionsPanel.css';
import { FaShieldAlt, FaTimes, FaPlus, FaEdit, FaTrash, FaUsers, FaCrown, FaLock } from 'react-icons/fa';
import { getApiBase } from '../utils/apiEndpoints';
import confirmDialog from '../utils/confirmDialog';

const PermissionsPanel = ({ serverId, roleId, onClose }) => {
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);
    const [permissions, setPermissions] = useState({});
    const [presets, setPresets] = useState([]);
    const [loading, setLoading] = useState(true);

    const permissionCategories = {
        general: {
            label: 'General Permissions',
            permissions: [
                { key: 'view_channels', label: 'View Channels', description: 'Allow members to view channels' },
                { key: 'manage_channels', label: 'Manage Channels', description: 'Create, edit, and delete channels' },
                { key: 'manage_roles', label: 'Manage Roles', description: 'Create and edit roles' },
                { key: 'manage_server', label: 'Manage Server', description: 'Change server settings' },
                { key: 'kick_members', label: 'Kick Members', description: 'Remove members from server' },
                { key: 'ban_members', label: 'Ban Members', description: 'Ban members from server' },
                { key: 'create_invite', label: 'Create Invite', description: 'Create invitation links' },
                { key: 'change_nickname', label: 'Change Nickname', description: 'Change own nickname' },
                { key: 'manage_nicknames', label: 'Manage Nicknames', description: 'Change other members nicknames' },
                { key: 'manage_emojis', label: 'Manage Emojis', description: 'Add and remove emojis' }
            ]
        },
        text: {
            label: 'Text Channel Permissions',
            permissions: [
                { key: 'send_messages', label: 'Send Messages', description: 'Send messages in text channels' },
                { key: 'embed_links', label: 'Embed Links', description: 'Links will show embedded content' },
                { key: 'attach_files', label: 'Attach Files', description: 'Upload images and files' },
                { key: 'add_reactions', label: 'Add Reactions', description: 'Add new reactions to messages' },
                { key: 'use_external_emojis', label: 'Use External Emojis', description: 'Use emojis from other servers' },
                { key: 'mention_everyone', label: 'Mention @everyone', description: 'Use @everyone and @here mentions' },
                { key: 'manage_messages', label: 'Manage Messages', description: 'Delete messages from other users' },
                { key: 'read_message_history', label: 'Read Message History', description: 'View previous messages' }
            ]
        },
        voice: {
            label: 'Voice Channel Permissions',
            permissions: [
                { key: 'connect', label: 'Connect', description: 'Connect to voice channels' },
                { key: 'speak', label: 'Speak', description: 'Speak in voice channels' },
                { key: 'video', label: 'Video', description: 'Use video in voice channels' },
                { key: 'mute_members', label: 'Mute Members', description: 'Mute other members' },
                { key: 'deafen_members', label: 'Deafen Members', description: 'Deafen other members' },
                { key: 'move_members', label: 'Move Members', description: 'Move members between voice channels' },
                { key: 'priority_speaker', label: 'Priority Speaker', description: 'Be heard more clearly when speaking' }
            ]
        },
        advanced: {
            label: 'Advanced Permissions',
            permissions: [
                { key: 'administrator', label: 'Administrator', description: 'Full control over server' },
                { key: 'view_audit_log', label: 'View Audit Log', description: 'View server audit logs' },
                { key: 'manage_webhooks', label: 'Manage Webhooks', description: 'Create and edit webhooks' },
                { key: 'manage_threads', label: 'Manage Threads', description: 'Manage forum threads' }
            ]
        }
    };

    useEffect(() => {
        fetchRoles();
        fetchPresets();
    }, [serverId]);

    useEffect(() => {
        if (roleId) {
            const role = roles.find(r => r.id === roleId);
            if (role) setSelectedRole(role);
        }
    }, [roleId, roles]);

    useEffect(() => {
        if (selectedRole) {
            fetchPermissions(selectedRole.id);
        }
    }, [selectedRole]);

    const fetchWithAuth = async (url, options = {}) => {
        const token = localStorage.getItem('access_token');
        const response = await fetch(url, {
            ...options,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    };

    const fetchRoles = async () => {
        try {
            const data = await fetchWithAuth(`${getApiBase()}/permissions/${serverId}/roles/`);
            setRoles(data.roles || []);
        } catch (error) {
            console.error('Roles fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPermissions = async (roleId) => {
        try {
            const data = await fetchWithAuth(`${getApiBase()}/permissions/${serverId}/${roleId}/`);
            setPermissions(data.permissions || {});
        } catch (error) {
            console.error('Permissions fetch error:', error);
        }
    };

    const fetchPresets = async () => {
        try {
            const data = await fetchWithAuth(`${getApiBase()}/permissions/presets/`);
            setPresets(data.presets || []);
        } catch (error) {
            console.error('Presets fetch error:', error);
        }
    };

    const updatePermission = async (permissionKey, value) => {
        const newPermissions = { ...permissions, [permissionKey]: value };
        setPermissions(newPermissions);

        try {
            await fetchWithAuth(`${getApiBase()}/permissions/${serverId}/${selectedRole.id}/update/`, {
                method: 'PUT',
                body: JSON.stringify({ permissions: newPermissions })
            });
        } catch (error) {
            console.error('Permission update error:', error);
            showToast('Failed to update permission', 'error');
        }
    };

    const applyPreset = async (presetId) => {
        try {
            const data = await fetchWithAuth(`${getApiBase()}/permissions/${serverId}/${selectedRole.id}/apply-preset/`, {
                method: 'POST',
                body: JSON.stringify({ preset_id: presetId })
            });
            setPermissions(data.permissions);
            showToast('Preset applied successfully!');
        } catch (error) {
            console.error('Apply preset error:', error);
            showToast('Failed to apply preset', 'error');
        }
    };

    const copyFromRole = async (sourceRoleId) => {
        try {
            const data = await fetchWithAuth(`${getApiBase()}/permissions/${serverId}/${selectedRole.id}/copy/`, {
                method: 'POST',
                body: JSON.stringify({ source_role_id: sourceRoleId })
            });
            setPermissions(data.permissions);
            showToast('Permissions copied successfully!');
        } catch (error) {
            console.error('Copy permissions error:', error);
            showToast('Failed to copy permissions', 'error');
        }
    };

    const resetPermissions = async () => {
        if (!await confirmDialog('Are you sure you want to reset all permissions to default?')) return;

        try {
            const data = await fetchWithAuth(`${getApiBase()}/permissions/${serverId}/${selectedRole.id}/reset/`, {
                method: 'POST'
            });
            setPermissions(data.permissions);
            showToast('Permissions reset to default!');
        } catch (error) {
            console.error('Reset permissions error:', error);
            showToast('Failed to reset permissions', 'error');
        }
    };

    const showToast = (message, type = 'success') => {
        console.log(`[${type}] ${message}`);
    };

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
                    <p>Loading Permissions...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="permissions-overlay">
            <div className="permissions-panel">
                <div className="panel-header">
                    <h2><FaShieldAlt /> Permissions Manager</h2>
                    <button onClick={onClose} className="btn-close">
                        <FaTimes />
                    </button>
                </div>

                <div className="permissions-layout">
                    {/* Roles Sidebar */}
                    <div className="roles-sidebar">
                        <h3>Roles</h3>
                        <div className="roles-list">
                            {roles.map(role => (
                                <div
                                    key={role.id}
                                    className={`role-item ${selectedRole?.id === role.id ? 'active' : ''}`}
                                    onClick={() => setSelectedRole(role)}
                                >
                                    <div className="role-icon" style={{ background: role.color || '#8b5cf6' }}>
                                        {getRoleIcon(role.name)}
                                    </div>
                                    <div className="role-info">
                                        <h4>{role.name}</h4>
                                        <span className="role-members">{role.member_count || 0} members</span>
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
                                        <p>Configure permissions for this role</p>
                                    </div>
                                    <div className="editor-actions">
                                        <select onChange={(e) => applyPreset(e.target.value)} defaultValue="">
                                            <option value="" disabled>Apply Preset...</option>
                                            {presets.map(preset => (
                                                <option key={preset.id} value={preset.id}>
                                                    {preset.name}
                                                </option>
                                            ))}
                                        </select>
                                        <select onChange={(e) => copyFromRole(e.target.value)} defaultValue="">
                                            <option value="" disabled>Copy From...</option>
                                            {roles.filter(r => r.id !== selectedRole.id).map(role => (
                                                <option key={role.id} value={role.id}>
                                                    {role.name}
                                                </option>
                                            ))}
                                        </select>
                                        <button onClick={resetPermissions} className="btn-reset">
                                            Reset
                                        </button>
                                    </div>
                                </div>

                                <div className="permissions-grid">
                                    {Object.entries(permissionCategories).map(([categoryKey, category]) => (
                                        <div key={categoryKey} className="permission-category">
                                            <h4>{category.label}</h4>
                                            <div className="permissions-list">
                                                {category.permissions.map(permission => (
                                                    <div key={permission.key} className="permission-item">
                                                        <div className="permission-info">
                                                            <h5>{permission.label}</h5>
                                                            <p>{permission.description}</p>
                                                        </div>
                                                        <label className="permission-toggle">
                                                            <input
                                                                type="checkbox"
                                                                checked={permissions[permission.key] || false}
                                                                onChange={(e) => updatePermission(permission.key, e.target.checked)}
                                                            />
                                                            <span className="toggle-slider"></span>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="no-role-selected">
                                <FaLock size={64} />
                                <h3>Select a Role</h3>
                                <p>Choose a role from the left to configure its permissions</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PermissionsPanel;
