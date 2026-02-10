import React, { useState, useEffect } from 'react';
import {
    FaShieldAlt, FaTimes, FaUserShield, FaCrown, FaStar, FaChevronUp,
    FaChevronDown, FaPlus, FaTrash, FaEdit, FaCheck, FaSearch, FaUsers,
    FaLock, FaCog, FaEye, FaEyeSlash, FaArrowUp, FaArrowDown, FaGripVertical,
    FaCopy, FaPalette, FaKey, FaExchangeAlt, FaLayerGroup
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import './AdvancedRoleHierarchyPanel.css';
import confirmDialog from '../utils/confirmDialog';

const AdvancedRoleHierarchyPanel = ({ serverId, onClose }) => {
    const [activeTab, setActiveTab] = useState('hierarchy');
    const [roles, setRoles] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRole, setSelectedRole] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showPermissionModal, setShowPermissionModal] = useState(false);
    const [bulkAssignModal, setBulkAssignModal] = useState(false);
    const token = localStorage.getItem('access_token');

    const permissionCategories = {
        general: {
            name: 'Genel',
            permissions: [
                { key: 'view_channels', label: 'Kanalları Görüntüle' },
                { key: 'manage_channels', label: 'Kanalları Yönet' },
                { key: 'manage_roles', label: 'Rolleri Yönet' },
                { key: 'manage_emojis', label: 'Emojileri Yönet' },
                { key: 'view_audit_log', label: 'Denetim Günlüğünü Görüntüle' },
                { key: 'manage_webhooks', label: 'Webhook Yönet' },
                { key: 'manage_server', label: 'Sunucuyu Yönet' }
            ]
        },
        membership: {
            name: 'Üyelik',
            permissions: [
                { key: 'create_invite', label: 'Davet Oluştur' },
                { key: 'change_nickname', label: 'Takma Ad Değiştir' },
                { key: 'manage_nicknames', label: 'Takma Adları Yönet' },
                { key: 'kick_members', label: 'Üyeleri At' },
                { key: 'ban_members', label: 'Üyeleri Yasakla' }
            ]
        },
        text: {
            name: 'Metin Kanalları',
            permissions: [
                { key: 'send_messages', label: 'Mesaj Gönder' },
                { key: 'embed_links', label: 'Bağlantı Yerleştir' },
                { key: 'attach_files', label: 'Dosya Ekle' },
                { key: 'add_reactions', label: 'Tepki Ekle' },
                { key: 'use_external_emojis', label: 'Harici Emoji Kullan' },
                { key: 'mention_everyone', label: '@everyone Etiketle' },
                { key: 'manage_messages', label: 'Mesajları Yönet' },
                { key: 'read_message_history', label: 'Mesaj Geçmişini Oku' }
            ]
        },
        voice: {
            name: 'Sesli Kanallar',
            permissions: [
                { key: 'connect', label: 'Bağlan' },
                { key: 'speak', label: 'Konuş' },
                { key: 'video', label: 'Video' },
                { key: 'mute_members', label: 'Üyeleri Sustur' },
                { key: 'deafen_members', label: 'Üyelerin Sesini Kapat' },
                { key: 'move_members', label: 'Üyeleri Taşı' },
                { key: 'use_voice_activity', label: 'Ses Etkinliği Kullan' },
                { key: 'priority_speaker', label: 'Öncelikli Konuşmacı' }
            ]
        },
        advanced: {
            name: 'Gelişmiş',
            permissions: [
                { key: 'administrator', label: 'Yönetici' }
            ]
        }
    };

    useEffect(() => {
        fetchRoles();
        fetchMembers();
    }, [serverId]);

    const fetchRoles = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/servers/${serverId}/roles/hierarchy/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setRoles(data.roles || []);
            } else {
                setRoles([]);
            }
        } catch (error) {
            console.error('Error fetching roles:', error);
            setRoles([]);
        }
        setLoading(false);
    };

    const fetchMembers = async () => {
        try {
            const response = await fetch(`/api/servers/${serverId}/members/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setMembers(data.members || []);
            }
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    };

    const handleMoveRole = async (roleId, direction) => {
        const roleIndex = roles.findIndex(r => r.id === roleId);
        if (roleIndex === -1) return;

        const newIndex = direction === 'up' ? roleIndex - 1 : roleIndex + 1;
        if (newIndex < 0 || newIndex >= roles.length) return;

        const newRoles = [...roles];
        [newRoles[roleIndex], newRoles[newIndex]] = [newRoles[newIndex], newRoles[roleIndex]];

        // Update positions
        newRoles.forEach((role, index) => {
            role.position = newRoles.length - index;
        });

        setRoles(newRoles);

        try {
            await fetch(`/api/servers/${serverId}/roles/reorder/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    roles: newRoles.map(r => ({ id: r.id, position: r.position }))
                })
            });
            toast.success('Rol sırası güncellendi');
        } catch (error) {
            toast.error('Sıralama güncellenemedi');
        }
    };

    const handleDeleteRole = async (roleId) => {
        const role = roles.find(r => r.id === roleId);
        if (role?.name === '@everyone') {
            toast.warning('@everyone rolü silinemez');
            return;
        }

        if (!await confirmDialog(`"${role?.name}" rolünü silmek istediğinize emin misiniz?`)) return;

        try {
            const response = await fetch(`/api/servers/${serverId}/roles/${roleId}/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success('Rol silindi');
                fetchRoles();
            }
        } catch (error) {
            toast.error('Rol silinemedi');
        }
    };

    const handleDuplicateRole = async (role) => {
        try {
            const response = await fetch(`/api/servers/${serverId}/roles/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: `${role.name} (Kopya)`,
                    color: role.color,
                    permissions: role.permissions
                })
            });

            if (response.ok) {
                toast.success('Rol kopyalandı');
                fetchRoles();
            }
        } catch (error) {
            toast.error('Rol kopyalanamadı');
        }
    };

    const filteredRoles = roles.filter(role =>
        role.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="role-hierarchy-overlay" onClick={(e) => e.target.className === 'role-hierarchy-overlay' && onClose()}>
            <div className="role-hierarchy-panel">
                <div className="panel-header">
                    <h2><FaShieldAlt /> Gelişmiş Rol Hiyerarşisi</h2>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                <div className="tabs-bar">
                    <div className="tabs">
                        <button
                            className={`tab ${activeTab === 'hierarchy' ? 'active' : ''}`}
                            onClick={() => setActiveTab('hierarchy')}
                        >
                            <FaLayerGroup /> Hiyerarşi
                        </button>
                        <button
                            className={`tab ${activeTab === 'permissions' ? 'active' : ''}`}
                            onClick={() => setActiveTab('permissions')}
                        >
                            <FaKey /> İzin Matrisi
                        </button>
                        <button
                            className={`tab ${activeTab === 'members' ? 'active' : ''}`}
                            onClick={() => setActiveTab('members')}
                        >
                            <FaUsers /> Üye Rolleri
                        </button>
                    </div>
                    <button className="create-role-btn" onClick={() => setShowCreateModal(true)}>
                        <FaPlus /> Yeni Rol
                    </button>
                </div>

                <div className="toolbar">
                    <div className="search-box">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Rol ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="bulk-assign-btn" onClick={() => setBulkAssignModal(true)}>
                        <FaExchangeAlt /> Toplu Atama
                    </button>
                </div>

                <div className="panel-content">
                    {loading ? (
                        <div className="loading">Yükleniyor...</div>
                    ) : (
                        <>
                            {activeTab === 'hierarchy' && (
                                <HierarchyView
                                    roles={filteredRoles}
                                    onMove={handleMoveRole}
                                    onEdit={(role) => { setSelectedRole(role); setShowPermissionModal(true); }}
                                    onDelete={handleDeleteRole}
                                    onDuplicate={handleDuplicateRole}
                                />
                            )}

                            {activeTab === 'permissions' && (
                                <PermissionMatrixView
                                    roles={filteredRoles}
                                    permissionCategories={permissionCategories}
                                    serverId={serverId}
                                    token={token}
                                    onUpdate={fetchRoles}
                                />
                            )}

                            {activeTab === 'members' && (
                                <MemberRolesView
                                    members={members}
                                    roles={roles}
                                    serverId={serverId}
                                    token={token}
                                    onUpdate={fetchMembers}
                                />
                            )}
                        </>
                    )}
                </div>

                {showCreateModal && (
                    <CreateRoleModal
                        serverId={serverId}
                        token={token}
                        onClose={() => setShowCreateModal(false)}
                        onCreated={() => { fetchRoles(); setShowCreateModal(false); }}
                    />
                )}

                {showPermissionModal && selectedRole && (
                    <RolePermissionModal
                        role={selectedRole}
                        permissionCategories={permissionCategories}
                        serverId={serverId}
                        token={token}
                        onClose={() => { setShowPermissionModal(false); setSelectedRole(null); }}
                        onSaved={() => { fetchRoles(); setShowPermissionModal(false); setSelectedRole(null); }}
                    />
                )}

                {bulkAssignModal && (
                    <BulkAssignModal
                        roles={roles}
                        members={members}
                        serverId={serverId}
                        token={token}
                        onClose={() => setBulkAssignModal(false)}
                        onAssigned={() => { fetchMembers(); setBulkAssignModal(false); }}
                    />
                )}
            </div>
        </div>
    );
};

const HierarchyView = ({ roles, onMove, onEdit, onDelete, onDuplicate }) => {
    return (
        <div className="hierarchy-view">
            <p className="hierarchy-info">
                <FaShieldAlt /> Yukarıdaki roller daha yüksek yetkiye sahiptir. Sürükle-bırak veya okları kullanarak sırayı değiştirin.
            </p>

            <div className="roles-list">
                {roles.map((role, index) => (
                    <div key={role.id} className="role-item">
                        <div className="drag-handle">
                            <FaGripVertical />
                        </div>
                        <div className="role-color" style={{ background: role.color }}></div>
                        <div className="role-info">
                            <h4>
                                {role.permissions?.includes('administrator') && <FaCrown className="admin-icon" />}
                                {role.name}
                            </h4>
                            <span className="member-count">
                                <FaUsers /> {role.member_count} üye
                            </span>
                        </div>
                        <div className="role-position">
                            #{role.position}
                        </div>
                        <div className="role-actions">
                            <button
                                className="action-btn"
                                onClick={() => onMove(role.id, 'up')}
                                disabled={index === 0}
                                title="Yukarı Taşı"
                            >
                                <FaChevronUp />
                            </button>
                            <button
                                className="action-btn"
                                onClick={() => onMove(role.id, 'down')}
                                disabled={index === roles.length - 1}
                                title="Aşağı Taşı"
                            >
                                <FaChevronDown />
                            </button>
                            <button
                                className="action-btn edit"
                                onClick={() => onEdit(role)}
                                title="Düzenle"
                            >
                                <FaEdit />
                            </button>
                            <button
                                className="action-btn copy"
                                onClick={() => onDuplicate(role)}
                                title="Kopyala"
                            >
                                <FaCopy />
                            </button>
                            <button
                                className="action-btn delete"
                                onClick={() => onDelete(role.id)}
                                disabled={role.name === '@everyone'}
                                title="Sil"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const PermissionMatrixView = ({ roles, permissionCategories, serverId, token, onUpdate }) => {
    const [expandedCategories, setExpandedCategories] = useState(['general']);

    const toggleCategory = (category) => {
        setExpandedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const togglePermission = async (roleId, permission) => {
        try {
            const response = await fetch(`/api/servers/${serverId}/roles/${roleId}/permissions/toggle/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ permission })
            });

            if (response.ok) {
                onUpdate();
            }
        } catch (error) {
            toast.error('İzin güncellenemedi');
        }
    };

    return (
        <div className="permission-matrix">
            <div className="matrix-header">
                <div className="permission-col">İzin</div>
                {roles.slice(0, 5).map(role => (
                    <div key={role.id} className="role-col">
                        <div className="role-chip" style={{ borderColor: role.color }}>
                            <span className="role-dot" style={{ background: role.color }}></span>
                            {role.name}
                        </div>
                    </div>
                ))}
            </div>

            <div className="matrix-body">
                {Object.entries(permissionCategories).map(([key, category]) => (
                    <div key={key} className="category-group">
                        <div
                            className="category-header"
                            onClick={() => toggleCategory(key)}
                        >
                            {expandedCategories.includes(key) ? <FaChevronDown /> : <FaChevronUp />}
                            {category.name}
                        </div>

                        {expandedCategories.includes(key) && (
                            <div className="category-permissions">
                                {category.permissions.map(perm => (
                                    <div key={perm.key} className="permission-row">
                                        <div className="permission-col">
                                            {perm.key === 'administrator' && <FaCrown className="admin-icon" />}
                                            {perm.label}
                                        </div>
                                        {roles.slice(0, 5).map(role => (
                                            <div key={role.id} className="role-col">
                                                <button
                                                    className={`perm-toggle ${role.permissions?.includes(perm.key) || role.permissions?.includes('administrator') ? 'enabled' : ''}`}
                                                    onClick={() => togglePermission(role.id, perm.key)}
                                                    disabled={role.permissions?.includes('administrator') && perm.key !== 'administrator'}
                                                >
                                                    {role.permissions?.includes(perm.key) || role.permissions?.includes('administrator') ? (
                                                        <FaCheck />
                                                    ) : (
                                                        <FaTimes />
                                                    )}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const MemberRolesView = ({ members, roles, serverId, token, onUpdate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [editingMember, setEditingMember] = useState(null);

    const filteredMembers = members.filter(m =>
        m.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const updateMemberRoles = async (memberId, roleIds) => {
        try {
            const response = await fetch(`/api/servers/${serverId}/members/${memberId}/roles/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ role_ids: roleIds })
            });

            if (response.ok) {
                toast.success('Üye rolleri güncellendi');
                onUpdate();
                setEditingMember(null);
            }
        } catch (error) {
            toast.error('Roller güncellenemedi');
        }
    };

    return (
        <div className="member-roles-view">
            <div className="member-search">
                <FaSearch />
                <input
                    type="text"
                    placeholder="Üye ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="members-list">
                {filteredMembers.length === 0 ? (
                    <div className="empty-state">
                        <FaUsers />
                        <p>Üye bulunamadı</p>
                    </div>
                ) : (
                    filteredMembers.map(member => (
                        <div key={member.id} className="member-item">
                            <img
                                className="member-avatar"
                                src={member.avatar || '/default-avatar.png'}
                                alt=""
                            />
                            <div className="member-info">
                                <h4>{member.display_name || member.username}</h4>
                                <span className="username">@{member.username}</span>
                            </div>
                            <div className="member-roles">
                                {member.roles?.slice(0, 3).map(role => (
                                    <span
                                        key={role.id}
                                        className="role-badge"
                                        style={{ borderColor: role.color, color: role.color }}
                                    >
                                        {role.name}
                                    </span>
                                ))}
                                {member.roles?.length > 3 && (
                                    <span className="more-roles">+{member.roles.length - 3}</span>
                                )}
                            </div>
                            <button
                                className="edit-roles-btn"
                                onClick={() => setEditingMember(member)}
                            >
                                <FaEdit /> Düzenle
                            </button>
                        </div>
                    ))
                )}
            </div>

            {editingMember && (
                <MemberRoleEditModal
                    member={editingMember}
                    roles={roles}
                    onClose={() => setEditingMember(null)}
                    onSave={(roleIds) => updateMemberRoles(editingMember.id, roleIds)}
                />
            )}
        </div>
    );
};

const MemberRoleEditModal = ({ member, roles, onClose, onSave }) => {
    const [selectedRoles, setSelectedRoles] = useState(
        member.roles?.map(r => r.id) || []
    );

    const toggleRole = (roleId) => {
        setSelectedRoles(prev =>
            prev.includes(roleId)
                ? prev.filter(id => id !== roleId)
                : [...prev, roleId]
        );
    };

    return (
        <div className="modal-overlay" onClick={(e) => e.target.className === 'modal-overlay' && onClose()}>
            <div className="role-edit-modal">
                <h3><FaUserShield /> {member.username} Rolleri</h3>

                <div className="role-checkboxes">
                    {roles.filter(r => r.name !== '@everyone').map(role => (
                        <label key={role.id} className="role-checkbox">
                            <input
                                type="checkbox"
                                checked={selectedRoles.includes(role.id)}
                                onChange={() => toggleRole(role.id)}
                            />
                            <span className="role-dot" style={{ background: role.color }}></span>
                            {role.name}
                        </label>
                    ))}
                </div>

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>İptal</button>
                    <button className="save-btn" onClick={() => onSave(selectedRoles)}>
                        <FaCheck /> Kaydet
                    </button>
                </div>
            </div>
        </div>
    );
};

const CreateRoleModal = ({ serverId, token, onClose, onCreated }) => {
    const [name, setName] = useState('');
    const [color, setColor] = useState('#5865f2');

    const colorPresets = ['#ff4757', '#ff6b81', '#ffa502', '#ffce54', '#2ed573', '#1dd1a1', '#54a0ff', '#5865f2', '#a55eea', '#9b59b6'];

    const handleCreate = async () => {
        if (!name.trim()) {
            toast.warning('Rol adı gerekli');
            return;
        }

        try {
            const response = await fetch(`/api/servers/${serverId}/roles/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, color })
            });

            if (response.ok) {
                toast.success('Rol oluşturuldu');
                onCreated();
            }
        } catch (error) {
            toast.error('Rol oluşturulamadı');
        }
    };

    return (
        <div className="modal-overlay" onClick={(e) => e.target.className === 'modal-overlay' && onClose()}>
            <div className="create-role-modal">
                <h3><FaPlus /> Yeni Rol Oluştur</h3>

                <div className="form-group">
                    <label>Rol Adı</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="örn: Moderator"
                    />
                </div>

                <div className="form-group">
                    <label><FaPalette /> Rol Rengi</label>
                    <div className="color-presets">
                        {colorPresets.map(c => (
                            <button
                                key={c}
                                className={`color-preset ${color === c ? 'selected' : ''}`}
                                style={{ background: c }}
                                onClick={() => setColor(c)}
                            />
                        ))}
                    </div>
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="color-picker"
                    />
                </div>

                <div className="preview-role">
                    <span style={{ color, borderColor: color }}>{name || 'Rol Adı'}</span>
                </div>

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>İptal</button>
                    <button className="create-btn" onClick={handleCreate}>
                        <FaPlus /> Oluştur
                    </button>
                </div>
            </div>
        </div>
    );
};

const RolePermissionModal = ({ role, permissionCategories, serverId, token, onClose, onSaved }) => {
    const [permissions, setPermissions] = useState(role.permissions || []);
    const [name, setName] = useState(role.name);
    const [color, setColor] = useState(role.color);

    const togglePermission = (perm) => {
        setPermissions(prev =>
            prev.includes(perm)
                ? prev.filter(p => p !== perm)
                : [...prev, perm]
        );
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`/api/servers/${serverId}/roles/${role.id}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, color, permissions })
            });

            if (response.ok) {
                toast.success('Rol güncellendi');
                onSaved();
            }
        } catch (error) {
            toast.error('Rol güncellenemedi');
        }
    };

    return (
        <div className="modal-overlay" onClick={(e) => e.target.className === 'modal-overlay' && onClose()}>
            <div className="permission-modal">
                <h3><FaKey /> {role.name} İzinleri</h3>

                <div className="modal-scroll">
                    <div className="form-group">
                        <label>Rol Adı</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={role.name === '@everyone'}
                        />
                    </div>

                    <div className="form-group">
                        <label>Renk</label>
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                    </div>

                    {Object.entries(permissionCategories).map(([key, category]) => (
                        <div key={key} className="perm-category">
                            <h4>{category.name}</h4>
                            <div className="perm-list">
                                {category.permissions.map(perm => (
                                    <label key={perm.key} className="perm-item">
                                        <input
                                            type="checkbox"
                                            checked={permissions.includes(perm.key)}
                                            onChange={() => togglePermission(perm.key)}
                                        />
                                        {perm.label}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

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

const BulkAssignModal = ({ roles, members, serverId, token, onClose, onAssigned }) => {
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [action, setAction] = useState('add');

    const toggleMember = (memberId) => {
        setSelectedMembers(prev =>
            prev.includes(memberId)
                ? prev.filter(id => id !== memberId)
                : [...prev, memberId]
        );
    };

    const handleBulkAssign = async () => {
        if (!selectedRole || selectedMembers.length === 0) {
            toast.warning('Rol ve üyeleri seçin');
            return;
        }

        try {
            const response = await fetch(`/api/servers/${serverId}/roles/bulk-assign/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    role_id: selectedRole,
                    member_ids: selectedMembers,
                    action
                })
            });

            if (response.ok) {
                toast.success(`${selectedMembers.length} üyeye rol ${action === 'add' ? 'eklendi' : 'kaldırıldı'}`);
                onAssigned();
            }
        } catch (error) {
            toast.error('Toplu atama başarısız');
        }
    };

    return (
        <div className="modal-overlay" onClick={(e) => e.target.className === 'modal-overlay' && onClose()}>
            <div className="bulk-assign-modal">
                <h3><FaExchangeAlt /> Toplu Rol Atama</h3>

                <div className="form-group">
                    <label>İşlem</label>
                    <select value={action} onChange={(e) => setAction(e.target.value)}>
                        <option value="add">Rol Ekle</option>
                        <option value="remove">Rol Kaldır</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Rol</label>
                    <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                        <option value="">Rol seçin...</option>
                        {roles.filter(r => r.name !== '@everyone').map(role => (
                            <option key={role.id} value={role.id}>{role.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Üyeler ({selectedMembers.length} seçili)</label>
                    <div className="member-checkboxes">
                        {members.slice(0, 50).map(member => (
                            <label key={member.id} className="member-checkbox">
                                <input
                                    type="checkbox"
                                    checked={selectedMembers.includes(member.id)}
                                    onChange={() => toggleMember(member.id)}
                                />
                                {member.username}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>İptal</button>
                    <button className="assign-btn" onClick={handleBulkAssign}>
                        <FaCheck /> Uygula
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdvancedRoleHierarchyPanel;
