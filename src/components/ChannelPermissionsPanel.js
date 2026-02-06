// frontend/src/components/ChannelPermissionsPanel.js
import React, { useState, useEffect } from 'react';
import { FaTimes, FaLock, FaUnlock, FaSave, FaTrash, FaUserShield } from 'react-icons/fa';
import toast from '../utils/toast';

/**
 * 🔐 Channel Permissions Panel
 * Kanal bazlı rol izinleri (Discord-style overrides)
 * 
 * Features:
 * - Per-channel permission matrix
 * - Role overrides
 * - Permission templates
 */

const ChannelPermissionsPanel = ({ fetchWithAuth, apiBaseUrl, channelSlug, onClose }) => {
    const [permissions, setPermissions] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRole, setSelectedRole] = useState(null);
    const [permissionMatrix, setPermissionMatrix] = useState({});

    const PERMISSIONS = [
        { key: 'view_channel', name: 'Kanalı Görüntüle', icon: '👁️' },
        { key: 'send_messages', name: 'Mesaj Gönder', icon: '💬' },
        { key: 'attach_files', name: 'Dosya Ekle', icon: '📎' },
        { key: 'embed_links', name: 'Link Gömme', icon: '🔗' },
        { key: 'add_reactions', name: 'Tepki Ekle', icon: '😀' },
        { key: 'use_voice', name: 'Sesli Kullan', icon: '🎤' },
        { key: 'speak', name: 'Konuş', icon: '🗣️' },
        { key: 'mute_members', name: 'Susturma', icon: '🔇' },
        { key: 'manage_messages', name: 'Mesaj Yönetimi', icon: '⚙️' },
        { key: 'manage_channel', name: 'Kanal Yönetimi', icon: '🛠️' }
    ];

    useEffect(() => {
        loadPermissions();
        loadRoles();
    }, [channelSlug]);

    const loadPermissions = async () => {
        try {
            setLoading(true);
            const response = await fetchWithAuth(`${apiBaseUrl}/channels/${channelSlug}/permissions/`);
            if (response.ok) {
                const data = await response.json();
                setPermissions(data);

                // Matrix'i doldur
                const matrix = {};
                data.forEach(perm => {
                    if (!matrix[perm.role_id]) {
                        matrix[perm.role_id] = {};
                    }
                    matrix[perm.role_id][perm.permission] = perm.value;
                });
                setPermissionMatrix(matrix);
            }
        } catch (error) {
            console.error('İzin yükleme hatası:', error);
            toast.error('İzinler yüklenemedi');
        } finally {
            setLoading(false);
        }
    };

    const loadRoles = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/servers/roles/list/`);
            if (response.ok) {
                const data = await response.json();
                setRoles(data);
            }
        } catch (error) {
            console.error('Rol yükleme hatası:', error);
        }
    };

    const updatePermission = async (roleId, permission, value) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/channels/permissions/add/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    channel_slug: channelSlug,
                    role_id: roleId,
                    permission: permission,
                    value: value
                })
            });

            if (response.ok) {
                toast.success('İzin güncellendi');

                // Matrix'i güncelle
                setPermissionMatrix(prev => ({
                    ...prev,
                    [roleId]: {
                        ...prev[roleId],
                        [permission]: value
                    }
                }));
            } else {
                toast.error('İzin güncellenemedi');
            }
        } catch (error) {
            console.error('İzin güncelleme hatası:', error);
            toast.error('Bir hata oluştu');
        }
    };

    const getPermissionValue = (roleId, permission) => {
        return permissionMatrix[roleId]?.[permission];
    };

    const getPermissionIcon = (value) => {
        if (value === true) return { icon: '✅', color: '#43b581', text: 'İzin Ver' };
        if (value === false) return { icon: '❌', color: '#ed4245', text: 'Reddet' };
        return { icon: '➖', color: '#99aab5', text: 'Varsayılan' };
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaLock style={{ color: '#faa61a' }} />
                        <h2 style={{ margin: 0 }}>Kanal İzinleri</h2>
                    </div>
                    <FaTimes onClick={onClose} style={styles.closeBtn} />
                </div>

                {/* Permission Matrix */}
                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Yükleniyor...</div>
                    ) : (
                        <div style={styles.matrix}>
                            <div style={styles.matrixHeader}>
                                <div style={styles.headerCell}>İzin</div>
                                {roles.map(role => (
                                    <div key={role.id} style={styles.headerCell}>
                                        <div style={{
                                            ...styles.roleTag,
                                            backgroundColor: role.color || '#5865f2'
                                        }}>
                                            {role.name}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {PERMISSIONS.map(perm => (
                                <div key={perm.key} style={styles.matrixRow}>
                                    <div style={styles.permissionName}>
                                        <span style={{ fontSize: '18px', marginRight: '8px' }}>{perm.icon}</span>
                                        {perm.name}
                                    </div>
                                    {roles.map(role => {
                                        const value = getPermissionValue(role.id, perm.key);
                                        const display = getPermissionIcon(value);

                                        return (
                                            <div key={role.id} style={styles.permissionCell}>
                                                <button
                                                    onClick={() => {
                                                        // Cycle: null → true → false → null
                                                        const newValue = value === null
                                                            ? true
                                                            : value === true
                                                                ? false
                                                                : null;
                                                        updatePermission(role.id, perm.key, newValue);
                                                    }}
                                                    style={{
                                                        ...styles.permissionBtn,
                                                        color: display.color
                                                    }}
                                                    title={display.text}
                                                >
                                                    <span style={{ fontSize: '20px' }}>{display.icon}</span>
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div style={styles.footer}>
                    <div style={styles.legend}>
                        <div style={styles.legendItem}>
                            <span style={{ color: '#43b581', fontSize: '18px' }}>✅</span>
                            <span>İzin Ver</span>
                        </div>
                        <div style={styles.legendItem}>
                            <span style={{ color: '#ed4245', fontSize: '18px' }}>❌</span>
                            <span>Reddet</span>
                        </div>
                        <div style={styles.legendItem}>
                            <span style={{ color: '#99aab5', fontSize: '18px' }}>➖</span>
                            <span>Varsayılan</span>
                        </div>
                    </div>
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
        zIndex: 999999
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '95%',
        maxWidth: '1200px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        color: '#fff'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #333'
    },
    closeBtn: {
        cursor: 'pointer',
        fontSize: '24px',
        color: '#888'
    },
    content: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
    },
    matrix: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px'
    },
    matrixHeader: {
        display: 'grid',
        gridTemplateColumns: '200px repeat(auto-fit, minmax(100px, 1fr))',
        gap: '2px',
        marginBottom: '10px',
        position: 'sticky',
        top: 0,
        backgroundColor: '#1e1e1e',
        zIndex: 10,
        paddingBottom: '10px'
    },
    headerCell: {
        padding: '12px',
        fontWeight: '600',
        textAlign: 'center',
        backgroundColor: '#2c2f33',
        borderRadius: '4px'
    },
    roleTag: {
        padding: '6px 12px',
        borderRadius: '12px',
        fontSize: '13px',
        fontWeight: '600',
        color: '#fff'
    },
    matrixRow: {
        display: 'grid',
        gridTemplateColumns: '200px repeat(auto-fit, minmax(100px, 1fr))',
        gap: '2px',
        marginBottom: '2px'
    },
    permissionName: {
        padding: '12px',
        backgroundColor: '#2c2f33',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        fontWeight: '500'
    },
    permissionCell: {
        padding: '12px',
        backgroundColor: '#2c2f33',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    permissionBtn: {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '4px',
        transition: 'background-color 0.2s'
    },
    footer: {
        padding: '20px',
        borderTop: '1px solid #333'
    },
    legend: {
        display: 'flex',
        gap: '30px',
        justifyContent: 'center'
    },
    legendItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px'
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        color: '#888'
    }
};

export default ChannelPermissionsPanel;
