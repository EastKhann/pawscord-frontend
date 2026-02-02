// frontend/src/components/VoiceChannelPermissions.js

/**
 * 🔐 Voice Channel Permissions Manager
 * Control who can join voice channels based on roles and users
 */

import React, { useState, useEffect } from 'react';
import FaLock from 'react-icons/fa/FaLock';
import FaUnlock from 'react-icons/fa/FaUnlock';
import FaUsers from 'react-icons/fa/FaUsers';
import FaUserPlus from 'react-icons/fa/FaUserPlus';
import FaTimes from 'react-icons/fa/FaTimes';
import FaSave from 'react-icons/fa/FaSave';
import FaCrown from 'react-icons/fa/FaCrown';

const VoiceChannelPermissions = ({
    channel,
    serverRoles = [],
    serverMembers = [],
    onSave,
    onClose,
    apiBaseUrl,
    fetchWithAuth
}) => {
    const [permissions, setPermissions] = useState({
        isPrivate: false,
        allowedRoles: [],
        allowedUsers: [],
        deniedUsers: [],
        maxUsers: null
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('roles'); // roles, users, settings

    // Load existing permissions
    useEffect(() => {
        loadPermissions();
    }, [channel.id]);

    const loadPermissions = async () => {
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/channels/${channel.id}/permissions/`
            );

            if (response.ok) {
                const data = await response.json();
                setPermissions(data);
            }
        } catch (error) {
            console.error('Failed to load permissions:', error);
        }
    };

    const handleSave = async () => {
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/channels/${channel.id}/permissions/`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(permissions)
                }
            );

            if (response.ok) {
                onSave?.(permissions);
                onClose();
            }
        } catch (error) {
            console.error('Failed to save permissions:', error);
        }
    };

    const toggleRole = (roleId) => {
        setPermissions(prev => ({
            ...prev,
            allowedRoles: prev.allowedRoles.includes(roleId)
                ? prev.allowedRoles.filter(id => id !== roleId)
                : [...prev.allowedRoles, roleId]
        }));
    };

    const toggleUser = (userId, type = 'allowed') => {
        const key = type === 'allowed' ? 'allowedUsers' : 'deniedUsers';
        setPermissions(prev => ({
            ...prev,
            [key]: prev[key].includes(userId)
                ? prev[key].filter(id => id !== userId)
                : [...prev[key], userId]
        }));
    };

    const filteredMembers = serverMembers.filter(member =>
        member.username?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerTitle}>
                        <FaLock style={styles.headerIcon} />
                        <div>
                            <h3 style={styles.title}>Kanal İzinleri</h3>
                            <p style={styles.subtitle}>#{channel.name}</p>
                        </div>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                {/* Tabs */}
                <div style={styles.tabs}>
                    <button
                        onClick={() => setActiveTab('roles')}
                        style={{
                            ...styles.tab,
                            ...(activeTab === 'roles' && styles.tabActive)
                        }}
                    >
                        <FaCrown style={{ marginRight: '6px' }} />
                        Roller
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        style={{
                            ...styles.tab,
                            ...(activeTab === 'users' && styles.tabActive)
                        }}
                    >
                        <FaUsers style={{ marginRight: '6px' }} />
                        Kullanıcılar
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        style={{
                            ...styles.tab,
                            ...(activeTab === 'settings' && styles.tabActive)
                        }}
                    >
                        Ayarlar
                    </button>
                </div>

                {/* Content */}
                <div style={styles.content}>
                    {/* Privacy Toggle */}
                    <div style={styles.privacySection}>
                        <div style={styles.privacyInfo}>
                            {permissions.isPrivate ? (
                                <>
                                    <FaLock style={styles.privacyIcon} />
                                    <div>
                                        <strong>Özel Kanal</strong>
                                        <p style={styles.privacyDesc}>
                                            Sadece izin verilen roller ve kullanıcılar girebilir
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <FaUnlock style={{ ...styles.privacyIcon, color: '#43b581' }} />
                                    <div>
                                        <strong>Herkese Açık</strong>
                                        <p style={styles.privacyDesc}>
                                            Tüm sunucu üyeleri girebilir
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                        <button
                            onClick={() => setPermissions(prev => ({
                                ...prev,
                                isPrivate: !prev.isPrivate
                            }))}
                            style={{
                                ...styles.toggleButton,
                                backgroundColor: permissions.isPrivate ? '#5865f2' : '#40444b'
                            }}
                        >
                            {permissions.isPrivate ? 'Özel' : 'Açık'}
                        </button>
                    </div>

                    {/* Roles Tab */}
                    {activeTab === 'roles' && (
                        <div style={styles.tabContent}>
                            <p style={styles.infoText}>
                                {permissions.isPrivate
                                    ? 'Bu kanala girebilecek rolleri seçin'
                                    : 'Özel kanal aktif değil. Tüm roller girebilir.'}
                            </p>

                            <div style={styles.list}>
                                {serverRoles.length === 0 ? (
                                    <div style={styles.emptyState}>
                                        <p>Sunucuda rol bulunmuyor</p>
                                    </div>
                                ) : (
                                    serverRoles.map(role => (
                                        <div
                                            key={role.id}
                                            style={styles.listItem}
                                        >
                                            <div style={styles.roleInfo}>
                                                <div
                                                    style={{
                                                        ...styles.roleColor,
                                                        backgroundColor: role.color || '#99aab5'
                                                    }}
                                                />
                                                <span style={styles.roleName}>{role.name}</span>
                                                <span style={styles.memberCount}>
                                                    {role.memberCount || 0} üye
                                                </span>
                                            </div>
                                            <label style={styles.checkbox}>
                                                <input
                                                    type="checkbox"
                                                    checked={permissions.allowedRoles.includes(role.id)}
                                                    onChange={() => toggleRole(role.id)}
                                                    disabled={!permissions.isPrivate}
                                                />
                                                <span>{permissions.allowedRoles.includes(role.id) ? 'İzinli' : 'Yasaklı'}</span>
                                            </label>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {/* Users Tab */}
                    {activeTab === 'users' && (
                        <div style={styles.tabContent}>
                            <input
                                type="text"
                                placeholder="Kullanıcı ara..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={styles.searchInput}
                            />

                            <div style={styles.userActions}>
                                <button style={styles.actionButton}>
                                    <FaUserPlus style={{ marginRight: '6px' }} />
                                    İzin Ver
                                </button>
                                <button style={styles.actionButton}>
                                    <FaTimes style={{ marginRight: '6px' }} />
                                    Yasakla
                                </button>
                            </div>

                            <div style={styles.list}>
                                {filteredMembers.length === 0 ? (
                                    <div style={styles.emptyState}>
                                        <p>Kullanıcı bulunamadı</p>
                                    </div>
                                ) : (
                                    filteredMembers.map(member => {
                                        const isAllowed = permissions.allowedUsers.includes(member.id);
                                        const isDenied = permissions.deniedUsers.includes(member.id);

                                        return (
                                            <div key={member.id} style={styles.listItem}>
                                                <div style={styles.userInfo}>
                                                    <div style={styles.avatar}>
                                                        {member.username?.[0]?.toUpperCase() || 'U'}
                                                    </div>
                                                    <div>
                                                        <div style={styles.username}>{member.username}</div>
                                                        <div style={styles.status}>
                                                            {isAllowed && <span style={styles.badgeGreen}>✓ İzinli</span>}
                                                            {isDenied && <span style={styles.badgeRed}>✗ Yasaklı</span>}
                                                            {!isAllowed && !isDenied && <span style={styles.badgeGray}>Rol bazlı</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={styles.userActions}>
                                                    <button
                                                        onClick={() => toggleUser(member.id, 'allowed')}
                                                        style={{
                                                            ...styles.permButton,
                                                            backgroundColor: isAllowed ? '#43b581' : 'transparent'
                                                        }}
                                                        title="İzin ver"
                                                    >
                                                        ✓
                                                    </button>
                                                    <button
                                                        onClick={() => toggleUser(member.id, 'denied')}
                                                        style={{
                                                            ...styles.permButton,
                                                            backgroundColor: isDenied ? '#f04747' : 'transparent'
                                                        }}
                                                        title="Yasakla"
                                                    >
                                                        ✗
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    )}

                    {/* Settings Tab */}
                    {activeTab === 'settings' && (
                        <div style={styles.tabContent}>
                            <div style={styles.settingItem}>
                                <label style={styles.settingLabel}>
                                    Maksimum Kullanıcı Sayısı
                                    <span style={styles.settingHint}>
                                        0 = sınırsız
                                    </span>
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="99"
                                    value={permissions.maxUsers || 0}
                                    onChange={(e) => setPermissions(prev => ({
                                        ...prev,
                                        maxUsers: parseInt(e.target.value) || null
                                    }))}
                                    style={styles.numberInput}
                                />
                            </div>

                            <div style={styles.settingItem}>
                                <label style={styles.settingLabel}>
                                    Kanal Açıklaması
                                </label>
                                <textarea
                                    placeholder="Bu kanal hakkında kısa bir açıklama..."
                                    rows={3}
                                    style={styles.textarea}
                                />
                            </div>

                            <div style={styles.summary}>
                                <h4 style={styles.summaryTitle}>Özet</h4>
                                <div style={styles.summaryItem}>
                                    <span>Kanal Durumu:</span>
                                    <strong>{permissions.isPrivate ? '🔒 Özel' : '🔓 Açık'}</strong>
                                </div>
                                <div style={styles.summaryItem}>
                                    <span>İzinli Roller:</span>
                                    <strong>{permissions.allowedRoles.length}</strong>
                                </div>
                                <div style={styles.summaryItem}>
                                    <span>İzinli Kullanıcılar:</span>
                                    <strong>{permissions.allowedUsers.length}</strong>
                                </div>
                                <div style={styles.summaryItem}>
                                    <span>Yasaklı Kullanıcılar:</span>
                                    <strong>{permissions.deniedUsers.length}</strong>
                                </div>
                                <div style={styles.summaryItem}>
                                    <span>Maks. Kullanıcı:</span>
                                    <strong>{permissions.maxUsers || 'Sınırsız'}</strong>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div style={styles.footer}>
                    <button onClick={onClose} style={styles.cancelButton}>
                        İptal
                    </button>
                    <button onClick={handleSave} style={styles.saveButton}>
                        <FaSave style={{ marginRight: '6px' }} />
                        Kaydet
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
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        width: '90%',
        maxWidth: '700px',
        maxHeight: '90vh',
        backgroundColor: '#2f3136',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 24px',
        borderBottom: '1px solid #1e1f22'
    },
    headerTitle: {
        display: 'flex',
        gap: '12px',
        alignItems: 'center'
    },
    headerIcon: {
        color: '#5865f2',
        fontSize: '24px'
    },
    title: {
        margin: 0,
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#fff'
    },
    subtitle: {
        margin: '4px 0 0 0',
        fontSize: '14px',
        color: '#b9bbbe'
    },
    closeButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#b9bbbe',
        fontSize: '20px',
        cursor: 'pointer',
        padding: '8px'
    },
    tabs: {
        display: 'flex',
        padding: '0 24px',
        gap: '8px',
        borderBottom: '1px solid #1e1f22',
        backgroundColor: '#36393f'
    },
    tab: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#b9bbbe',
        padding: '12px 16px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        borderBottom: '2px solid transparent',
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.2s'
    },
    tabActive: {
        color: '#fff',
        borderBottomColor: '#5865f2'
    },
    content: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px 24px'
    },
    privacySection: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: '#202225',
        borderRadius: '8px',
        marginBottom: '20px'
    },
    privacyInfo: {
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        color: '#dcddde'
    },
    privacyIcon: {
        fontSize: '24px',
        color: '#f04747'
    },
    privacyDesc: {
        margin: '4px 0 0 0',
        fontSize: '13px',
        color: '#b9bbbe'
    },
    toggleButton: {
        padding: '8px 20px',
        border: 'none',
        borderRadius: '4px',
        color: '#fff',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '14px'
    },
    tabContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    },
    infoText: {
        color: '#b9bbbe',
        fontSize: '14px',
        margin: 0
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        maxHeight: '400px',
        overflowY: 'auto'
    },
    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px',
        backgroundColor: '#36393f',
        borderRadius: '4px',
        transition: 'background-color 0.2s'
    },
    roleInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    roleColor: {
        width: '12px',
        height: '12px',
        borderRadius: '50%'
    },
    roleName: {
        color: '#fff',
        fontWeight: '500',
        fontSize: '14px'
    },
    memberCount: {
        color: '#b9bbbe',
        fontSize: '12px'
    },
    checkbox: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#dcddde',
        fontSize: '14px',
        cursor: 'pointer'
    },
    searchInput: {
        width: '100%',
        padding: '10px 12px',
        backgroundColor: '#202225',
        border: '1px solid #1e1f22',
        borderRadius: '4px',
        color: '#dcddde',
        fontSize: '14px'
    },
    userActions: {
        display: 'flex',
        gap: '8px'
    },
    actionButton: {
        padding: '8px 16px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '13px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center'
    },
    userInfo: {
        display: 'flex',
        gap: '12px',
        alignItems: 'center'
    },
    avatar: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: '#5865f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#fff'
    },
    username: {
        color: '#fff',
        fontSize: '14px',
        fontWeight: '500'
    },
    status: {
        fontSize: '12px',
        marginTop: '2px'
    },
    badgeGreen: {
        color: '#43b581'
    },
    badgeRed: {
        color: '#f04747'
    },
    badgeGray: {
        color: '#72767d'
    },
    permButton: {
        width: '32px',
        height: '32px',
        border: '1px solid #40444b',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    settingItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    settingLabel: {
        color: '#b9bbbe',
        fontSize: '14px',
        fontWeight: '500',
        display: 'flex',
        justifyContent: 'space-between'
    },
    settingHint: {
        color: '#72767d',
        fontSize: '12px',
        fontWeight: 'normal'
    },
    numberInput: {
        width: '100px',
        padding: '8px',
        backgroundColor: '#202225',
        border: '1px solid #1e1f22',
        borderRadius: '4px',
        color: '#dcddde',
        fontSize: '14px'
    },
    textarea: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#202225',
        border: '1px solid #1e1f22',
        borderRadius: '4px',
        color: '#dcddde',
        fontSize: '14px',
        resize: 'vertical',
        fontFamily: 'inherit'
    },
    summary: {
        marginTop: '20px',
        padding: '16px',
        backgroundColor: '#202225',
        borderRadius: '8px'
    },
    summaryTitle: {
        margin: '0 0 12px 0',
        fontSize: '14px',
        color: '#fff',
        fontWeight: 'bold'
    },
    summaryItem: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px 0',
        fontSize: '13px',
        color: '#b9bbbe',
        borderBottom: '1px solid #1e1f22'
    },
    emptyState: {
        padding: '40px',
        textAlign: 'center',
        color: '#72767d'
    },
    footer: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        padding: '16px 24px',
        borderTop: '1px solid #1e1f22',
        backgroundColor: '#2f3136'
    },
    cancelButton: {
        padding: '10px 20px',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '4px',
        color: '#dcddde',
        fontSize: '14px',
        cursor: 'pointer',
        fontWeight: '500'
    },
    saveButton: {
        padding: '10px 20px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        cursor: 'pointer',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center'
    }
};

export default VoiceChannelPermissions;


