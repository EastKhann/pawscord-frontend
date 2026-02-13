// frontend/src/components/ServerSettingsModal.js
// Refactored: All tabs extracted as self-contained components

import { useState, useEffect } from 'react';
import { FaTimes, FaUsers, FaShieldAlt, FaCog, FaRobot, FaLink, FaHandPaper, FaChartBar, FaHistory, FaBan, FaGavel } from 'react-icons/fa';
import ServerMembers from './ServerMembers';
import AutoResponderManager from './AutoResponderManager';
import VanityURLManager from './VanityURLManager';
import styles from './ServerSettingsModal/styles';

// Extracted Tab Components
import WelcomeTemplateEditor from './ServerSettingsModal/WelcomeTemplateEditor';
import SystemBotEditor from './ServerSettingsModal/SystemBotEditor';
import RolesTab from './ServerSettingsModal/RolesTab';
import ManagementTab from './ServerSettingsModal/ManagementTab';
import ModerationTab from './ServerSettingsModal/ModerationTab';
import BansTab from './ServerSettingsModal/BansTab';
import AuditLogTab from './ServerSettingsModal/AuditLogTab';
import StatsTab from './ServerSettingsModal/StatsTab';

const ServerSettingsModal = ({ onClose, server, currentUsername, fetchWithAuth, apiBaseUrl, serverMembers, onRefreshServers }) => {

    const [activeTab, setActiveTab] = useState('roles');
    // İsim değişikliği olmuşsa bile backend'den gelen my_permissions bilgisini veya isme dayalı kontrolü kullan
    const isOwner = server.my_permissions?.is_owner || server.owner_username === currentUsername;

    // Sunucu yönetimi için state'ler
    const [isMuted, setIsMuted] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [serverName, setServerName] = useState(server.name || '');
    const [isRenamingServer, setIsRenamingServer] = useState(false);
    const [serverDescription, setServerDescription] = useState(server.description || '');
    const [isSavingDescription, setIsSavingDescription] = useState(false);
    const [defaultChannelSlug, setDefaultChannelSlug] = useState(server.metadata?.default_channel_slug || '');
    const [isSavingDefaultChannel, setIsSavingDefaultChannel] = useState(false);

    // Audit Log state
    const [auditLogs, setAuditLogs] = useState([]);
    const [auditLoading, setAuditLoading] = useState(false);
    const [auditFilter, setAuditFilter] = useState('');

    // Ban Management state
    const [bans, setBans] = useState([]);
    const [bansLoading, setBansLoading] = useState(false);

    // Server Stats state
    const [serverStats, setServerStats] = useState(null);
    const [statsLoading, setStatsLoading] = useState(false);

    // Load audit logs
    const loadAuditLogs = useCallback(async (filter = '') => {
        setAuditLoading(true);
        try {
            const url = filter
                ? `${apiBaseUrl}/audit-logs/?action_type=${filter}&limit=100`
                : `${apiBaseUrl}/audit-logs/?limit=100`;
            const res = await fetchWithAuth(url);
            if (res.ok) {
                const data = await res.json();
                setAuditLogs(Array.isArray(data) ? data : []);
            }
        } catch (e) {
            console.error('Audit log load error:', e);
        } finally {
            setAuditLoading(false);
        }
    }, [fetchWithAuth, apiBaseUrl]);

    // Load bans
    const loadBans = useCallback(async () => {
        setBansLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/bans/`);
            if (res.ok) {
                const data = await res.json();
                setBans(data.bans || []);
            }
        } catch (e) {
            console.error('Ban list load error:', e);
        } finally {
            setBansLoading(false);
        }
    }, [fetchWithAuth, apiBaseUrl, server.id]);

    // Load server stats
    const loadServerStats = useCallback(async () => {
        setStatsLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/stats/overview/`);
            if (res.ok) {
                const data = await res.json();
                setServerStats(data);
            }
        } catch (e) {
            console.error('Stats load error:', e);
        } finally {
            setStatsLoading(false);
        }
    }, [fetchWithAuth, apiBaseUrl, server.id]);

    // Auto-load data when tab changes
    useEffect(() => {
        if (activeTab === 'auditlog') loadAuditLogs(auditFilter);
        if (activeTab === 'bans') loadBans();
        if (activeTab === 'stats') loadServerStats();
    }, [activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

    // Unban handler
    const handleUnban = async (username) => {
        if (!await confirmDialog(`${username} kullanıcısının yasağını kaldırmak istediğinize emin misiniz?`)) return;
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/moderation/unban/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, server_id: server.id })
            });
            if (res.ok) {
                toast.success(`${username} yasağı kaldırıldı!`);
                loadBans();
            } else {
                const data = await res.json().catch(() => ({}));
                toast.error(data.error || 'İşlem başarısız');
            }
        } catch (e) {
            toast.error('Yasak kaldırılırken bir hata oluştu');
        }
    };

    // 🔇 Mute durumunu backend'den yükle
    useEffect(() => {
        const loadMuteStatus = async () => {
            try {
                const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/mute-status/`);
                if (res.ok) {
                    const data = await res.json();
                    setIsMuted(data.is_muted || false);
                }
            } catch (e) {
                console.error('Mute status load error:', e);
            }
        };
        loadMuteStatus();
    }, [server.id, fetchWithAuth, apiBaseUrl]);

    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Sidebar hover styles
    useEffect(() => {
        const id = 'server-settings-sidebar-css';
        if (!document.getElementById(id)) {
            const s = document.createElement('style');
            s.id = id;
            s.textContent = `
                .ss-nav-item:hover:not(.ss-nav-active) { background: rgba(255,255,255,0.06) !important; color: #dbdee1 !important; }
                .ss-nav-active { background: rgba(88,101,242,0.15) !important; color: #fff !important; }
                .ss-sidebar::-webkit-scrollbar { width: 4px; }
                .ss-sidebar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
                .ss-sidebar::-webkit-scrollbar-track { background: transparent; }
                .ss-close-btn:hover { color: #fff !important; }
            `;
            document.head.appendChild(s);
        }
        return () => { const el = document.getElementById(id); if (el) el.remove(); };
    }, []);

    // --- ROL EDİTÖR STATE'LERİ ---
    const [editingRole, setEditingRole] = useState(null); // Düzenlenen rol (null ise yeni rol modu)
    const [roleName, setRoleName] = useState('');
    const [roleColor, setRoleColor] = useState('#99aab5');
    const [permissions, setPermissions] = useState({
        is_admin: false,
        can_manage_channels: false,
        can_delete_messages: false,
        can_manage_roles: false,
        can_ban_members: false
    });

    const [showColorPicker, setShowColorPicker] = useState(false);
    const [loading, setLoading] = useState(false);

    // Bir rolü düzenlemeye başla
    const startEditRole = (role) => {
        setRoleName(role.name);
        setRoleColor(role.color);

        // Verilerin kesinlikle boolean (true/false) olmasını sağlıyoruz
        setPermissions({
            is_admin: !!role.is_admin,
            can_manage_channels: !!role.can_manage_channels,
            can_delete_messages: !!role.can_delete_messages,
            can_manage_roles: !!role.can_manage_roles,
            can_ban_members: !!role.can_ban_members
        });
    };

    // Yeni rol moduna dön
    const resetForm = () => {
        setEditingRole(null);
        setRoleName('');
        setRoleColor('#99aab5');
        setPermissions({
            is_admin: false,
            can_manage_channels: false,
            can_delete_messages: false,
            can_manage_roles: false,
            can_ban_members: false
        });
    };

    const handleSaveRole = async (e) => {
        e.preventDefault();
        if (!roleName.trim()) return;
        setLoading(true);

        // İzinleri açıkça belirtelim ki hata olmasın
        const payload = {
            role_id: editingRole ? editingRole.id : null,
            name: roleName,
            color: roleColor,
            is_admin: permissions.is_admin,
            can_manage_channels: permissions.can_manage_channels,
            can_delete_messages: permissions.can_delete_messages,
            can_manage_roles: permissions.can_manage_roles,
            can_ban_members: permissions.can_ban_members
        };

        try {
            const url = editingRole
                ? `${apiBaseUrl}/roles/${editingRole.id}/update/`
                : `${apiBaseUrl}/servers/${server.id}/roles/create/`;
            const res = await fetchWithAuth(url, {
                method: editingRole ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const savedRole = await res.json();
                setRoles(prev => {
                    if (editingRole) {
                        return prev.map(r => r.id === savedRole.id ? savedRole : r);
                    } else {
                        return [...prev, savedRole];
                    }
                });
                resetForm();
                setShowColorPicker(false);
            } else {
                toast.error("Rol kaydedilemedi.");
            }
        } catch (error) {
            console.error("Rol hatası:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteRole = async (roleId) => {
        if (!await confirmDialog("Bu rolü silmek istediğinize emin misiniz?")) return;
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/roles/${roleId}/delete/`, { method: 'DELETE' });
            if (res.ok) {
                setRoles(prev => prev.filter(r => r.id !== roleId));
                if (editingRole?.id === roleId) resetForm();
            }
        } catch (e) { console.error(e); }
    };

    // 🔇 SUNUCU MUTE/UNMUTE
    const handleToggleMute = async () => {
        try {
            const endpoint = isMuted ? 'unmute' : 'mute';
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/${endpoint}/`, {
                method: 'POST'
            });

            if (res.ok) {
                setIsMuted(!isMuted);
                toast.success(isMuted ? 'Sunucu bildirimleri açıldı!' : 'Sunucu bildirimleri kapatıldı!');
            } else {
                const data = await res.json();
                toast.error(data.error || 'İşlem başarısız.');
            }
        } catch (e) {
            console.error('Mute hatası:', e);
            toast.error('Bir hata oluştu.');
        }
    };

    // 🗑️ SUNUCU SİLME
    const handleDeleteServer = async () => {
        if (deleteConfirmation !== server.name) {
            toast.warning('Sunucu adını doğru yazmadınız!');
            return;
        }

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/delete/`, {
                method: 'DELETE'
            });

            if (res.ok) {
                toast.success('Sunucu başarıyla silindi!');
                onClose();
                if (onRefreshServers) onRefreshServers();
                setTimeout(() => { window.location.href = '/'; }, 500);
            } else {
                const data = await res.json();
                toast.error(data.error || 'Sunucu silinemedi.');
            }
        } catch (e) {
            console.error('Delete hatası:', e);
            toast.error('Sunucu silinirken bir hata oluştu.');
        }
    };

    // 🆕 Sunucu açıklaması kaydetme
    const handleSaveDescription = async () => {
        setIsSavingDescription(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/update/`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description: serverDescription })
            });
            if (res.ok) {
                toast.success('Sunucu açıklaması güncellendi!');
                if (onRefreshServers) onRefreshServers();
            } else {
                const data = await res.json();
                toast.error(data.error || 'Açıklama kaydedilemedi.');
            }
        } catch (e) {
            console.error('Description hatası:', e);
            toast.error('Açıklama kaydedilirken bir hata oluştu.');
        } finally {
            setIsSavingDescription(false);
        }
    };

    // 🆕 Varsayılan kanal kaydetme
    const handleSaveDefaultChannel = async () => {
        setIsSavingDefaultChannel(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/default-channel/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ channel_slug: defaultChannelSlug })
            });
            if (res.ok) {
                toast.success('Varsayılan kanal güncellendi!');
                if (onRefreshServers) onRefreshServers();
            } else {
                const data = await res.json().catch(() => ({}));
                toast.error(data.error || 'Varsayılan kanal kaydedilemedi.');
            }
        } catch (e) {
            console.error('Default channel hatası:', e);
            toast.error('Varsayılan kanal kaydedilirken bir hata oluştu.');
        } finally {
            setIsSavingDefaultChannel(false);
        }
    };

    // 🆕 Sunucu adı değiştirme
    const handleRenameServer = async () => {
        const trimmed = serverName.trim();
        if (!trimmed || trimmed === server.name) {
            toast.warning('Geçerli bir isim girin.');
            return;
        }
        setIsRenamingServer(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/update/`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: trimmed })
            });
            if (res.ok) {
                toast.success('Sunucu adı güncellendi!');
                if (onRefreshServers) onRefreshServers();
            } else {
                const data = await res.json();
                toast.error(data.error || 'Sunucu adı değiştirilemedi.');
            }
        } catch (e) {
            console.error('Rename hatası:', e);
            toast.error('Sunucu adı değiştirilirken bir hata oluştu.');
        } finally {
            setIsRenamingServer(false);
        }
    };

    if (!isOwner) return null; // Sadece sahip görebilir

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>

                {/* DISCORD-STYLE LAYOUT: Sidebar + Content */}
                <div style={styles.layoutContainer}>

                    {/* ═════ LEFT SIDEBAR ═════ */}
                    <div style={styles.sidebar}>
                        <div style={styles.sidebarHeader}>
                            <div style={styles.sidebarServerIcon}>
                                {server.icon ? (
                                    <img src={server.icon} alt="" style={{ width: '100%', height: '100%', borderRadius: '12px', objectFit: 'cover' }} />
                                ) : (
                                    <span style={{ fontSize: '18px' }}>{server.name?.[0]?.toUpperCase()}</span>
                                )}
                            </div>
                            <div style={styles.sidebarServerInfo}>
                                <span style={styles.sidebarServerName}>{server.name}</span>
                                <span style={styles.sidebarServerSub}>Sunucu Ayarları</span>
                            </div>
                        </div>

                        <div className="ss-sidebar" style={styles.sidebarNav}>
                            {/* Yönetim Section */}
                            <div style={styles.navSection}>
                                <span style={styles.navSectionLabel}>YÖNETİM</span>
                                <button className={`ss-nav-item${activeTab === 'management' ? ' ss-nav-active' : ''}`} style={{ ...styles.navItem, ...(activeTab === 'management' ? styles.navItemActive : {}) }} onClick={() => setActiveTab('management')}>
                                    <FaCog style={styles.navIcon} /> Genel Ayarlar
                                </button>
                                <button className={`ss-nav-item${activeTab === 'roles' ? ' ss-nav-active' : ''}`} style={{ ...styles.navItem, ...(activeTab === 'roles' ? styles.navItemActive : {}) }} onClick={() => setActiveTab('roles')}>
                                    <FaShieldAlt style={styles.navIcon} /> Roller
                                </button>
                                <button className={`ss-nav-item${activeTab === 'members' ? ' ss-nav-active' : ''}`} style={{ ...styles.navItem, ...(activeTab === 'members' ? styles.navItemActive : {}) }} onClick={() => setActiveTab('members')}>
                                    <FaUsers style={styles.navIcon} /> Üyeler
                                </button>
                            </div>

                            <div style={styles.navDivider} />

                            {/* Özellikler Section */}
                            <div style={styles.navSection}>
                                <span style={styles.navSectionLabel}>ÖZELLİKLER</span>
                                <button className={`ss-nav-item${activeTab === 'autoresponders' ? ' ss-nav-active' : ''}`} style={{ ...styles.navItem, ...(activeTab === 'autoresponders' ? styles.navItemActive : {}) }} onClick={() => setActiveTab('autoresponders')}>
                                    <FaRobot style={styles.navIcon} /> Otomatik Yanıtlar
                                </button>
                                <button className={`ss-nav-item${activeTab === 'vanity' ? ' ss-nav-active' : ''}`} style={{ ...styles.navItem, ...(activeTab === 'vanity' ? styles.navItemActive : {}) }} onClick={() => setActiveTab('vanity')}>
                                    <FaLink style={styles.navIcon} /> Özel URL
                                </button>
                                <button className={`ss-nav-item${activeTab === 'welcome' ? ' ss-nav-active' : ''}`} style={{ ...styles.navItem, ...(activeTab === 'welcome' ? styles.navItemActive : {}) }} onClick={() => setActiveTab('welcome')}>
                                    <FaHandPaper style={styles.navIcon} /> Hoş Geldin Mesajı
                                </button>
                                <button className={`ss-nav-item${activeTab === 'systembot' ? ' ss-nav-active' : ''}`} style={{ ...styles.navItem, ...(activeTab === 'systembot' ? styles.navItemActive : {}) }} onClick={() => setActiveTab('systembot')}>
                                    <FaRobot style={styles.navIcon} /> Sistem Botu
                                </button>
                            </div>

                            <div style={styles.navDivider} />

                            {/* Güvenlik Section */}
                            <div style={styles.navSection}>
                                <span style={styles.navSectionLabel}>GÜVENLİK</span>
                                <button className={`ss-nav-item${activeTab === 'moderation' ? ' ss-nav-active' : ''}`} style={{ ...styles.navItem, ...(activeTab === 'moderation' ? styles.navItemActive : {}) }} onClick={() => setActiveTab('moderation')}>
                                    <FaGavel style={styles.navIcon} /> Moderasyon
                                </button>
                                <button className={`ss-nav-item${activeTab === 'bans' ? ' ss-nav-active' : ''}`} style={{ ...styles.navItem, ...(activeTab === 'bans' ? styles.navItemActive : {}) }} onClick={() => setActiveTab('bans')}>
                                    <FaBan style={styles.navIcon} /> Ban Yönetimi
                                </button>
                                <button className={`ss-nav-item${activeTab === 'auditlog' ? ' ss-nav-active' : ''}`} style={{ ...styles.navItem, ...(activeTab === 'auditlog' ? styles.navItemActive : {}) }} onClick={() => setActiveTab('auditlog')}>
                                    <FaHistory style={styles.navIcon} /> Audit Log
                                </button>
                            </div>

                            <div style={styles.navDivider} />

                            {/* Analitik Section */}
                            <div style={styles.navSection}>
                                <span style={styles.navSectionLabel}>ANALİTİK</span>
                                <button className={`ss-nav-item${activeTab === 'stats' ? ' ss-nav-active' : ''}`} style={{ ...styles.navItem, ...(activeTab === 'stats' ? styles.navItemActive : {}) }} onClick={() => setActiveTab('stats')}>
                                    <FaChartBar style={styles.navIcon} /> İstatistikler
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ═════ RIGHT CONTENT ═════ */}
                    <div style={styles.mainContent}>
                        {/* Content Header */}
                        <div style={styles.contentHeader}>
                            <h2 style={styles.contentTitle}>
                                {activeTab === 'roles' && '🛡️ Roller'}
                                {activeTab === 'members' && '👥 Üyeler'}
                                {activeTab === 'management' && '⚙️ Genel Ayarlar'}
                                {activeTab === 'autoresponders' && '🤖 Otomatik Yanıtlar'}
                                {activeTab === 'vanity' && '🔗 Özel Davet URL'}
                                {activeTab === 'welcome' && '👋 Hoş Geldin Mesajı'}
                                {activeTab === 'moderation' && '🛡️ Moderasyon'}
                                {activeTab === 'bans' && '🚫 Ban Yönetimi'}
                                {activeTab === 'auditlog' && '📜 Audit Log'}
                                {activeTab === 'stats' && '📊 Sunucu İstatistikleri'}
                                {activeTab === 'systembot' && '🤖 Sistem Botu Ayarları'}
                            </h2>
                            <button className="ss-close-btn" onClick={onClose} style={styles.closeBtn}><FaTimes size={20} /></button>
                        </div>

                        {/* Content Body */}
                        <div style={styles.content}>
                            {activeTab === 'roles' && (
                                <div style={{ display: 'flex', height: '100%', gap: '20px' }}>

                                    {/* SOL TARAFTAKİ ROL LİSTESİ */}
                                    <div style={styles.rolesSidebar}>
                                        <button onClick={resetForm} style={styles.newRoleBtn}>
                                            <FaPlus /> Yeni Rol Oluştur
                                        </button>
                                        <div style={styles.rolesList}>
                                            {roles.map(role => (
                                                <div
                                                    key={role.id}
                                                    style={{
                                                        ...styles.roleItem,
                                                        backgroundColor: editingRole?.id === role.id ? '#40444b' : 'transparent',
                                                        borderLeft: `4px solid ${role.color}`
                                                    }}
                                                    onClick={() => startEditRole(role)}
                                                >
                                                    <span>{role.name}</span>
                                                    <FaEdit style={{ opacity: 0.5, fontSize: '0.8em' }} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* SAĞ TARAFTAKİ EDİTÖR */}
                                    <div style={styles.roleEditor}>
                                        <h3 style={styles.editorTitle}>{editingRole ? 'Rolü Düzenle' : 'Yeni Rol'}</h3>

                                        <div style={styles.inputGroup}>
                                            <label>Rol Adı</label>
                                            <input
                                                value={roleName}
                                                onChange={e => setRoleName(e.target.value)}
                                                style={styles.input}
                                                placeholder="Örn: Moderatör"
                                            />
                                        </div>

                                        <div style={styles.inputGroup}>
                                            <label>Rol Rengi</label>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div
                                                    style={{ ...styles.colorPreview, backgroundColor: roleColor }}
                                                    onClick={() => setShowColorPicker(!showColorPicker)}
                                                />
                                                <span style={{ fontSize: '0.9em', color: '#b9bbbe' }}>{roleColor}</span>
                                            </div>

                                            {/* 🔥 RENK SEÇİCİ DÜZELTMESİ 🔥 */}
                                            {showColorPicker && (
                                                <>
                                                    {/* 1. Görünmez Arka Plan (Tıklayınca Kapatır) - Z-Index 999 */}
                                                    <div style={styles.cover} onClick={() => setShowColorPicker(false)} />

                                                    {/* 2. Renk Seçici - Z-Index 1000 (En Üstte) */}
                                                    <div style={{ position: 'absolute', zIndex: 1000, marginTop: '10px' }}>
                                                        <ChromePicker
                                                            color={roleColor}
                                                            onChange={c => setRoleColor(c.hex)}
                                                            disableAlpha={true}
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        <div style={styles.permissionsGrid}>
                                            <label style={styles.permLabel}>
                                                <input type="checkbox" checked={permissions.is_admin || false} onChange={e => setPermissions({ ...permissions, is_admin: e.target.checked })} />
                                                <span style={{ color: '#f0b232' }}>👑 Yönetici (Her yetkiye sahip)</span>
                                            </label>
                                            <label style={styles.permLabel}>
                                                <input type="checkbox" checked={permissions.can_manage_channels || false} onChange={e => setPermissions({ ...permissions, can_manage_channels: e.target.checked })} />
                                                Kanal Yönet (Aç/Sil/Düzenle)
                                            </label>
                                            <label style={styles.permLabel}>
                                                <input type="checkbox" checked={permissions.can_delete_messages || false} onChange={e => setPermissions({ ...permissions, can_delete_messages: e.target.checked })} />
                                                Mesajları Sil
                                            </label>
                                            <label style={styles.permLabel}>
                                                <input type="checkbox" checked={permissions.can_manage_roles || false} onChange={e => setPermissions({ ...permissions, can_manage_roles: e.target.checked })} />
                                                Rolleri Yönet (Oluştur/Düzenle/Sil)
                                            </label>
                                            <label style={styles.permLabel}>
                                                <input type="checkbox" checked={permissions.can_ban_members || false} onChange={e => setPermissions({ ...permissions, can_ban_members: e.target.checked })} />
                                                Üyeleri Yasakla/At
                                            </label>
                                        </div>

                                        <div style={styles.editorFooter}>
                                            {editingRole && (
                                                <button onClick={() => handleDeleteRole(editingRole.id)} style={styles.deleteBtn}>
                                                    <FaTrash /> Sil
                                                </button>
                                            )}
                                            <button onClick={handleSaveRole} style={styles.saveBtn} disabled={loading}>
                                                {loading ? '...' : <><FaCheck /> Kaydet</>}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'members' && (
                                <ServerMembers
                                    members={serverMembers || []}
                                    roles={roles}
                                    serverId={server.id}
                                    fetchWithAuth={fetchWithAuth}
                                    apiBaseUrl={apiBaseUrl}
                                    onRefresh={() => { }}
                                />
                            )}

                            {/* 🔥 YENİ: SUNUCU YÖNETİMİ TAB'I */}
                            {activeTab === 'management' && (
                                <div style={styles.managementTab}>
                                    <h3 style={styles.sectionTitle}>🔔 Bildirim Ayarları</h3>
                                    <div style={styles.settingBox}>
                                        <div style={styles.settingInfo}>
                                            <div style={styles.settingLabel}>
                                                {isMuted ? '🔇 Sunucu Sessize Alındı' : '🔊 Bildirimler Aktif'}
                                            </div>
                                            <div style={styles.settingDesc}>
                                                {isMuted
                                                    ? 'Bu sunucudan hiçbir bildirim almıyorsunuz.'
                                                    : 'Bu sunucudan tüm bildirimleri alıyorsunuz.'
                                                }
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleToggleMute}
                                            style={{
                                                ...styles.actionBtn,
                                                backgroundColor: isMuted ? '#23a559' : '#5865f2'
                                            }}
                                        >
                                            {isMuted ? <FaVolumeUp /> : <FaVolumeMute />}
                                            {isMuted ? ' Bildirimleri Aç' : ' Sessize Al'}
                                        </button>
                                    </div>

                                    <div style={styles.divider}></div>

                                    {/* 🆕 SUNUCU İKONU VE GİZLİLİK AYARLARI - SADECE SAHİP */}
                                    {isOwner && (
                                        <>
                                            <h3 style={styles.sectionTitle}>🎨 Sunucu Özelleştirme</h3>

                                            {/* 🆕 Sunucu Adı Değiştirme */}
                                            <div style={styles.settingBox}>
                                                <div style={styles.settingInfo}>
                                                    <div style={styles.settingLabel}>
                                                        <FaEdit style={{ marginRight: '8px' }} />
                                                        Sunucu Adı
                                                    </div>
                                                    <div style={styles.settingDesc}>
                                                        Sunucunuzun görünen adını değiştirin
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                    <input
                                                        type="text"
                                                        value={serverName}
                                                        onChange={(e) => setServerName(e.target.value)}
                                                        maxLength={100}
                                                        style={{
                                                            padding: '10px 14px',
                                                            backgroundColor: '#1e1f22',
                                                            border: '1px solid #40444b',
                                                            borderRadius: '8px',
                                                            color: '#dcddde',
                                                            fontSize: '14px',
                                                            outline: 'none',
                                                            width: '220px',
                                                            transition: 'border-color 0.2s'
                                                        }}
                                                        onFocus={(e) => { e.target.style.borderColor = '#5865f2'; }}
                                                        onBlur={(e) => { e.target.style.borderColor = '#40444b'; }}
                                                        placeholder="Sunucu adı..."
                                                    />
                                                    <button
                                                        onClick={handleRenameServer}
                                                        disabled={isRenamingServer || serverName.trim() === server.name}
                                                        style={{
                                                            ...styles.actionBtn,
                                                            backgroundColor: serverName.trim() !== server.name ? '#5865f2' : '#4e5058',
                                                            opacity: isRenamingServer || serverName.trim() === server.name ? 0.5 : 1,
                                                            cursor: isRenamingServer || serverName.trim() === server.name ? 'not-allowed' : 'pointer'
                                                        }}
                                                    >
                                                        {isRenamingServer ? '...' : 'Kaydet'}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* 🆕 Sunucu Açıklaması */}
                                            <div style={{ ...styles.settingBox, flexDirection: 'column', alignItems: 'stretch' }}>
                                                <div style={styles.settingInfo}>
                                                    <div style={styles.settingLabel}>
                                                        <FaFileAlt style={{ marginRight: '8px' }} />
                                                        Sunucu Açıklaması
                                                    </div>
                                                    <div style={styles.settingDesc}>
                                                        Sunucunuz hakkında kısa bir açıklama yazın
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                                                    <textarea
                                                        value={serverDescription}
                                                        onChange={(e) => setServerDescription(e.target.value)}
                                                        maxLength={300}
                                                        placeholder="Bu sunucu hakkında bir açıklama yazın..."
                                                        style={{
                                                            flex: 1, padding: '10px 14px',
                                                            backgroundColor: '#1e1f22',
                                                            border: '1px solid #40444b',
                                                            borderRadius: '8px', color: '#dcddde',
                                                            fontSize: '14px', outline: 'none',
                                                            resize: 'vertical', minHeight: '60px',
                                                            fontFamily: 'inherit',
                                                            transition: 'border-color 0.2s'
                                                        }}
                                                        onFocus={(e) => { e.target.style.borderColor = '#5865f2'; }}
                                                        onBlur={(e) => { e.target.style.borderColor = '#40444b'; }}
                                                    />
                                                    <button
                                                        onClick={handleSaveDescription}
                                                        disabled={isSavingDescription || serverDescription === (server.description || '')}
                                                        style={{
                                                            ...styles.actionBtn,
                                                            backgroundColor: serverDescription !== (server.description || '') ? '#5865f2' : '#4e5058',
                                                            opacity: isSavingDescription || serverDescription === (server.description || '') ? 0.5 : 1,
                                                            cursor: isSavingDescription || serverDescription === (server.description || '') ? 'not-allowed' : 'pointer',
                                                            alignSelf: 'flex-start'
                                                        }}
                                                    >
                                                        {isSavingDescription ? '...' : 'Kaydet'}
                                                    </button>
                                                </div>
                                                <div style={{ fontSize: '11px', color: '#72767d', marginTop: '4px', textAlign: 'right' }}>
                                                    {serverDescription.length}/300 karakter
                                                </div>
                                            </div>

                                            {/* İkon Değiştirme */}
                                            <div style={styles.settingBox}>
                                                <div style={styles.settingInfo}>                                                    <div style={styles.settingLabel}>
                                                    <FaImage style={{ marginRight: '8px' }} />
                                                    Sunucu İkonu
                                                </div>
                                                    <div style={styles.settingDesc}>
                                                        Sunucunuzun profil resmini değiştirin (Maks 5MB)
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        const input = document.createElement('input');
                                                        input.type = 'file';
                                                        input.accept = 'image/*';
                                                        input.onchange = async (e) => {
                                                            const file = e.target.files[0];
                                                            if (!file) return;

                                                            if (file.size > 5 * 1024 * 1024) {
                                                                toast.warning('Dosya boyutu çok büyük! Maksimum 5MB olmalıdır.');
                                                                return;
                                                            }

                                                            const formData = new FormData();
                                                            formData.append('icon', file);

                                                            try {
                                                                const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/icon/`, {
                                                                    method: 'POST',
                                                                    body: formData
                                                                });

                                                                if (res.ok) {
                                                                    toast.success('Sunucu ikonu güncellendi!');
                                                                    if (onRefreshServers) onRefreshServers();
                                                                } else {
                                                                    const error = await res.json();
                                                                    toast.error(`Hata: ${error.error || 'Bilinmeyen hata'}`);
                                                                }
                                                            } catch (error) {
                                                                console.error('❌ İkon yükleme hatası:', error);
                                                                toast.error('İkon yüklenirken bir hata oluştu.');
                                                            }
                                                        };
                                                        input.click();
                                                    }}
                                                    style={styles.actionBtn}
                                                >
                                                    <FaImage /> İkon Değiştir
                                                </button>
                                            </div>

                                            {/* Gizlilik Ayarı */}
                                            <div style={styles.settingBox}>
                                                <div style={styles.settingInfo}>
                                                    <div style={styles.settingLabel}>
                                                        {server.is_public ? <FaGlobe style={{ marginRight: '8px' }} /> : <FaLock style={{ marginRight: '8px' }} />}
                                                        {server.is_public ? 'Herkese Açık Sunucu' : 'Özel Sunucu'}
                                                    </div>
                                                    <div style={styles.settingDesc}>
                                                        {server.is_public
                                                            ? 'Herkes bu sunucuyu bulabilir ve katılabilir.'
                                                            : 'Sadece davet edilen kişiler katılabilir.'
                                                        }
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={async () => {
                                                        const newPrivacy = !server.is_public;
                                                        const message = newPrivacy
                                                            ? 'Sunucuyu herkese açık yapmak istediğinize emin misiniz? Herkes bu sunucuyu bulabilir ve katılabilir.'
                                                            : 'Sunucuyu özel yapmak istediğinize emin misiniz? Sadece davet edilen kişiler katılabilir.';

                                                        if (!await confirmDialog(message)) return;

                                                        try {
                                                            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/privacy/`, {
                                                                method: 'POST',
                                                                headers: { 'Content-Type': 'application/json' },
                                                                body: JSON.stringify({ is_public: newPrivacy })
                                                            });

                                                            if (res.ok) {
                                                                toast.success(`Sunucu ${newPrivacy ? 'herkese açık' : 'özel'} yapıldı!`);
                                                                if (onRefreshServers) onRefreshServers();
                                                            } else {
                                                                const error = await res.json();
                                                                toast.error(`Hata: ${error.error || 'Bilinmeyen hata'}`);
                                                            }
                                                        } catch (error) {
                                                            console.error('❌ Gizlilik ayarı hatası:', error);
                                                            toast.error('Gizlilik ayarı değiştirilirken bir hata oluştu.');
                                                        }
                                                    }}
                                                    style={{
                                                        ...styles.actionBtn,
                                                        backgroundColor: server.is_public ? '#ed4245' : '#43b581'
                                                    }}
                                                >
                                                    {server.is_public ? <FaLock /> : <FaGlobe />}
                                                    {server.is_public ? ' Özel Yap' : ' Herkese Açık Yap'}
                                                </button>
                                            </div>

                                            {/* 🆕 Varsayılan Kanal Seçimi */}
                                            <div style={styles.settingBox}>
                                                <div style={styles.settingInfo}>
                                                    <div style={styles.settingLabel}>
                                                        <FaComments style={{ marginRight: '8px' }} />
                                                        Varsayılan Kanal
                                                    </div>
                                                    <div style={styles.settingDesc}>
                                                        Kullanıcılar sunucuya girdiğinde ilk gösterilecek kanal
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                    <select
                                                        value={defaultChannelSlug}
                                                        onChange={(e) => setDefaultChannelSlug(e.target.value)}
                                                        style={{
                                                            padding: '10px 14px',
                                                            backgroundColor: '#1e1f22',
                                                            border: '1px solid #40444b',
                                                            borderRadius: '8px',
                                                            color: '#dcddde',
                                                            fontSize: '14px',
                                                            outline: 'none',
                                                            width: '220px',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        <option value="">Otomatik (İlk metin kanalı)</option>
                                                        {server.categories?.map(cat =>
                                                            cat.rooms?.filter(r => r.room_type !== 'voice' && r.channel_type !== 'voice')
                                                                .map(room => (
                                                                    <option key={room.slug} value={room.slug}>
                                                                        {room.name}
                                                                    </option>
                                                                ))
                                                        )}
                                                    </select>
                                                    <button
                                                        onClick={handleSaveDefaultChannel}
                                                        disabled={isSavingDefaultChannel || defaultChannelSlug === (server.metadata?.default_channel_slug || '')}
                                                        style={{
                                                            ...styles.actionBtn,
                                                            backgroundColor: defaultChannelSlug !== (server.metadata?.default_channel_slug || '') ? '#5865f2' : '#4e5058',
                                                            opacity: isSavingDefaultChannel || defaultChannelSlug === (server.metadata?.default_channel_slug || '') ? 0.5 : 1,
                                                            cursor: isSavingDefaultChannel || defaultChannelSlug === (server.metadata?.default_channel_slug || '') ? 'not-allowed' : 'pointer'
                                                        }}
                                                    >
                                                        {isSavingDefaultChannel ? '...' : 'Kaydet'}
                                                    </button>
                                                </div>
                                            </div>

                                            <div style={styles.divider}></div>
                                        </>
                                    )}

                                    {/* SADECE SUNUCU SAHİBİ İÇİN GÖRÜNÜR */}
                                    {isOwner && (
                                        <>
                                            <h3 style={styles.sectionTitle}>⚠️ Tehlikeli Bölge</h3>
                                            <div style={styles.dangerBox}>
                                                <div style={styles.settingInfo}>
                                                    <div style={styles.settingLabel}>🗑️ Sunucuyu Sil</div>
                                                    <div style={styles.settingDesc}>
                                                        Bu işlem geri alınamaz! Tüm kanallar, mesajlar ve ayarlar kalıcı olarak silinir.
                                                    </div>
                                                    {showDeleteModal && (
                                                        <div style={styles.deleteConfirmation}>
                                                            <p style={{ margin: '10px 0', color: '#dcddde' }}>
                                                                Silmek için sunucu adını yazın: <strong>{server.name}</strong>
                                                            </p>
                                                            <input
                                                                type="text"
                                                                value={deleteConfirmation}
                                                                onChange={(e) => setDeleteConfirmation(e.target.value)}
                                                                placeholder={server.name}
                                                                style={styles.confirmInput}
                                                            />
                                                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                                                <button
                                                                    onClick={handleDeleteServer}
                                                                    disabled={deleteConfirmation !== server.name}
                                                                    style={{
                                                                        ...styles.dangerBtn,
                                                                        opacity: deleteConfirmation !== server.name ? 0.5 : 1,
                                                                        cursor: deleteConfirmation !== server.name ? 'not-allowed' : 'pointer'
                                                                    }}
                                                                >
                                                                    <FaTrash /> Sunucuyu KALİCİ OLARAK Sil
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        setShowDeleteModal(false);
                                                                        setDeleteConfirmation('');
                                                                    }}
                                                                    style={styles.cancelBtn}
                                                                >
                                                                    İptal
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                {!showDeleteModal && (
                                                    <button
                                                        onClick={() => setShowDeleteModal(true)}
                                                        style={styles.dangerBtn}
                                                    >
                                                        <FaTrash /> Sunucuyu Sil
                                                    </button>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}

                            {/* 🆕 AUTO-RESPONDERS TAB */}
                            {activeTab === 'autoresponders' && (
                                <div>
                                    <h3 style={styles.sectionTitle}>🤖 Otomatik Yanıtlar</h3>
                                    <p style={{ color: '#b9bbbe', marginBottom: '20px' }}>
                                        Belirli anahtar kelimeler için otomatik yanıtlar oluşturun.
                                    </p>
                                    <AutoResponderManager
                                        serverId={server.id}
                                        fetchWithAuth={fetchWithAuth}
                                        apiBaseUrl={apiBaseUrl}
                                        embedded={true}
                                    />
                                </div>
                            )}

                            {/* 🆕 VANITY URL TAB */}
                            {activeTab === 'vanity' && (
                                <div>
                                    <h3 style={styles.sectionTitle}>🔗 Özel Davet URL'i</h3>
                                    <p style={{ color: '#b9bbbe', marginBottom: '20px' }}>
                                        Sunucunuz için hatırlanması kolay özel bir URL oluşturun.
                                    </p>
                                    <VanityURLManager
                                        serverId={server.id}
                                        fetchWithAuth={fetchWithAuth}
                                        apiBaseUrl={apiBaseUrl}
                                        embedded={true}
                                    />
                                </div>
                            )}

                            {/* 🆕 WELCOME MESSAGES TAB */}
                            {activeTab === 'welcome' && (
                                <div>
                                    <h3 style={styles.sectionTitle}>👋 Hoş Geldin Mesajı</h3>
                                    <p style={{ color: '#b9bbbe', marginBottom: '20px' }}>
                                        Yeni üyeler için özel hoş geldin mesajı oluşturun.
                                    </p>
                                    <WelcomeTemplateEditor
                                        serverId={server.id}
                                        fetchWithAuth={fetchWithAuth}
                                        apiBaseUrl={apiBaseUrl}
                                    />
                                </div>
                            )}

                            {/* 🤖 SYSTEM BOT TAB */}
                            {activeTab === 'systembot' && (
                                <div>
                                    <SystemBotEditor
                                        serverId={server.id}
                                        serverIcon={server.icon}
                                        fetchWithAuth={fetchWithAuth}
                                        apiBaseUrl={apiBaseUrl}
                                    />
                                </div>
                            )}

                            {/* 🛡️ MODERATION TAB - KAPSAMLI VE PROFESYONEL */}
                            {activeTab === 'moderation' && (
                                <div style={styles.moderationTab}>
                                    {/* HEADER */}
                                    <div style={styles.moderationHeader}>
                                        <div style={styles.moderationTitleSection}>
                                            <FaShieldAlt style={{ fontSize: '28px', color: '#5865f2' }} />
                                            <div>
                                                <h3 style={{ margin: 0, color: '#fff', fontSize: '18px' }}>Moderasyon Merkezi</h3>
                                                <p style={{ margin: '4px 0 0', color: '#b9bbbe', fontSize: '13px' }}>
                                                    Sunucunuzu güvende tutmak için gelişmiş araçlar
                                                </p>
                                            </div>
                                        </div>
                                        <div style={styles.serverStats}>
                                            <div style={styles.statItem}>
                                                <span style={styles.statNumber}>{serverMembers?.length || 0}</span>
                                                <span style={styles.statLabel}>Üye</span>
                                            </div>
                                            <div style={styles.statItem}>
                                                <span style={styles.statNumber}>{server.categories?.reduce((acc, cat) => acc + (cat.rooms?.length || 0), 0) || 0}</span>
                                                <span style={styles.statLabel}>Kanal</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* HIZLI İSTATİSTİKLER */}
                                    <div style={styles.quickStatsGrid}>
                                        <div style={{ ...styles.quickStatCard, borderLeft: '4px solid #43b581' }}>
                                            <FaUsers style={{ fontSize: '20px', color: '#43b581' }} />
                                            <div>
                                                <div style={styles.quickStatValue}>Aktif</div>
                                                <div style={styles.quickStatLabel}>Moderasyon Durumu</div>
                                            </div>
                                        </div>
                                        <div style={{ ...styles.quickStatCard, borderLeft: '4px solid #faa61a' }}>
                                            <FaExclamationTriangle style={{ fontSize: '20px', color: '#faa61a' }} />
                                            <div>
                                                <div style={styles.quickStatValue}>0</div>
                                                <div style={styles.quickStatLabel}>Bekleyen Rapor</div>
                                            </div>
                                        </div>
                                        <div style={{ ...styles.quickStatCard, borderLeft: '4px solid #ed4245' }}>
                                            <FaBan style={{ fontSize: '20px', color: '#ed4245' }} />
                                            <div>
                                                <div style={styles.quickStatValue}>0</div>
                                                <div style={styles.quickStatLabel}>Yasaklı Kullanıcı</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* MODERASYON KARTLARI */}
                                    <div style={styles.moderationCardsGrid}>
                                        {/* Otomatik Moderasyon */}
                                        <div style={styles.modCard}>
                                            <div style={styles.modCardHeader}>
                                                <div style={{ ...styles.modCardIcon, backgroundColor: 'rgba(88, 101, 242, 0.2)' }}>
                                                    <FaRobot style={{ color: '#5865f2', fontSize: '20px' }} />
                                                </div>
                                                <div style={styles.modCardBadge}>AI Destekli</div>
                                            </div>
                                            <h4 style={styles.modCardTitle}>Otomatik Moderasyon</h4>
                                            <p style={styles.modCardDesc}>
                                                Spam, küfür, toxic içerik ve zararlı linkleri otomatik tespit edip aksiyonlar alır.
                                            </p>
                                            <div style={styles.modCardFeatures}>
                                                <span style={styles.modCardFeature}>🚫 Spam Filtresi</span>
                                                <span style={styles.modCardFeature}>🔗 Link Koruması</span>
                                                <span style={styles.modCardFeature}>💬 Toxic Algılama</span>
                                            </div>
                                            <button
                                                style={styles.modCardBtn}
                                                onClick={() => {
                                                    onClose();
                                                    window.showAutoModeration?.();
                                                }}
                                            >
                                                <FaCog /> Ayarları Yapılandır
                                            </button>
                                        </div>

                                        {/* Raid Koruması */}
                                        <div style={styles.modCard}>
                                            <div style={styles.modCardHeader}>
                                                <div style={{ ...styles.modCardIcon, backgroundColor: 'rgba(237, 66, 69, 0.2)' }}>
                                                    <FaShieldAlt style={{ color: '#ed4245', fontSize: '20px' }} />
                                                </div>
                                                <div style={{ ...styles.modCardBadge, backgroundColor: 'rgba(237, 66, 69, 0.2)', color: '#ed4245' }}>Kritik</div>
                                            </div>
                                            <h4 style={styles.modCardTitle}>Raid Koruması</h4>
                                            <p style={styles.modCardDesc}>
                                                Toplu katılım saldırılarını tespit eder, otomatik lockdown modunu aktifleştirir.
                                            </p>
                                            <div style={styles.modCardFeatures}>
                                                <span style={styles.modCardFeature}>🔒 Lockdown Modu</span>
                                                <span style={styles.modCardFeature}>⏱️ Join Limiti</span>
                                                <span style={styles.modCardFeature}>🛡️ Anti-Bot</span>
                                            </div>
                                            <button
                                                style={{ ...styles.modCardBtn, backgroundColor: '#ed4245' }}
                                                onClick={() => {
                                                    onClose();
                                                    window.showRaidProtection?.();
                                                }}
                                            >
                                                <FaShieldAlt /> Korumayı Yönet
                                            </button>
                                        </div>

                                        {/* Kullanıcı Uyarıları */}
                                        <div style={styles.modCard}>
                                            <div style={styles.modCardHeader}>
                                                <div style={{ ...styles.modCardIcon, backgroundColor: 'rgba(250, 166, 26, 0.2)' }}>
                                                    <FaGavel style={{ color: '#faa61a', fontSize: '20px' }} />
                                                </div>
                                            </div>
                                            <h4 style={styles.modCardTitle}>Uyarı Sistemi</h4>
                                            <p style={styles.modCardDesc}>
                                                3 aşamalı uyarı sistemi. Otomatik mute ve ban aksiyonları.
                                            </p>
                                            <div style={styles.modCardFeatures}>
                                                <span style={styles.modCardFeature}>⚠️ 3-Strike Sistem</span>
                                                <span style={styles.modCardFeature}>🔇 Otomatik Mute</span>
                                                <span style={styles.modCardFeature}>📝 Uyarı Geçmişi</span>
                                            </div>
                                            <button
                                                style={{ ...styles.modCardBtn, backgroundColor: '#faa61a' }}
                                                onClick={() => {
                                                    onClose();
                                                    window.showUserWarnings?.();
                                                }}
                                            >
                                                <FaGavel /> Uyarıları Yönet
                                            </button>
                                        </div>

                                        {/* Rapor Sistemi */}
                                        <div style={styles.modCard}>
                                            <div style={styles.modCardHeader}>
                                                <div style={{ ...styles.modCardIcon, backgroundColor: 'rgba(67, 181, 129, 0.2)' }}>
                                                    <FaFileAlt style={{ color: '#43b581', fontSize: '20px' }} />
                                                </div>
                                            </div>
                                            <h4 style={styles.modCardTitle}>Rapor Merkezi</h4>
                                            <p style={styles.modCardDesc}>
                                                Kullanıcı raporlarını incele, aksiyonları takip et ve istatistikleri görüntüle.
                                            </p>
                                            <div style={styles.modCardFeatures}>
                                                <span style={styles.modCardFeature}>📋 Rapor Listesi</span>
                                                <span style={styles.modCardFeature}>✅ Çözüm Takibi</span>
                                                <span style={styles.modCardFeature}>📊 İstatistikler</span>
                                            </div>
                                            <button
                                                style={{ ...styles.modCardBtn, backgroundColor: '#43b581' }}
                                                onClick={() => {
                                                    onClose();
                                                    window.showReportSystem?.();
                                                }}
                                            >
                                                <FaFileAlt /> Raporları Görüntüle
                                            </button>
                                        </div>

                                        {/* Audit Log */}
                                        <div style={styles.modCard}>
                                            <div style={styles.modCardHeader}>
                                                <div style={{ ...styles.modCardIcon, backgroundColor: 'rgba(114, 137, 218, 0.2)' }}>
                                                    <FaHistory style={{ color: '#7289da', fontSize: '20px' }} />
                                                </div>
                                            </div>
                                            <h4 style={styles.modCardTitle}>Audit Log</h4>
                                            <p style={styles.modCardDesc}>
                                                Tüm admin ve moderatör aksiyonlarını kronolojik olarak görüntüle.
                                            </p>
                                            <div style={styles.modCardFeatures}>
                                                <span style={styles.modCardFeature}>📜 Aksiyon Geçmişi</span>
                                                <span style={styles.modCardFeature}>🔍 Filtreleme</span>
                                                <span style={styles.modCardFeature}>📥 Dışa Aktar</span>
                                            </div>
                                            <button
                                                style={{ ...styles.modCardBtn, backgroundColor: '#7289da' }}
                                                onClick={() => {
                                                    onClose();
                                                    window.showAuditLog?.();
                                                }}
                                            >
                                                <FaHistory /> Logları Görüntüle
                                            </button>
                                        </div>

                                        {/* Slow Mode / Timeout */}
                                        <div style={styles.modCard}>
                                            <div style={styles.modCardHeader}>
                                                <div style={{ ...styles.modCardIcon, backgroundColor: 'rgba(153, 170, 181, 0.2)' }}>
                                                    <FaClock style={{ color: '#99aab5', fontSize: '20px' }} />
                                                </div>
                                            </div>
                                            <h4 style={styles.modCardTitle}>Slow Mode & Timeout</h4>
                                            <p style={styles.modCardDesc}>
                                                Kanal bazlı slow mode ve kullanıcı timeout yönetimi.
                                            </p>
                                            <div style={styles.modCardFeatures}>
                                                <span style={styles.modCardFeature}>⏳ Slow Mode</span>
                                                <span style={styles.modCardFeature}>🔇 Timeout</span>
                                                <span style={styles.modCardFeature}>⏰ Süre Yönetimi</span>
                                            </div>
                                            <button
                                                style={{ ...styles.modCardBtn, backgroundColor: '#99aab5' }}
                                                onClick={() => {
                                                    onClose();
                                                    window.showSlowMode?.();
                                                }}
                                            >
                                                <FaClock /> Ayarları Yapılandır
                                            </button>
                                        </div>
                                    </div>

                                    {/* HIZLI AKSİYONLAR */}
                                    <div style={styles.quickActionsSection}>
                                        <h4 style={styles.quickActionsTitle}>
                                            <FaGavel /> Hızlı Aksiyonlar
                                        </h4>
                                        <div style={styles.quickActionsGrid}>
                                            <button
                                                style={styles.quickActionBtn}
                                                onClick={async () => {
                                                    if (!await confirmDialog('Sunucuyu kilitlemek istediğinize emin misiniz? Sadece yöneticiler mesaj yazabilir.')) return;
                                                    try {
                                                        const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/update/`, {
                                                            method: 'PATCH',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify({ metadata: { ...server.metadata, lockdown: true } })
                                                        });
                                                        toast.success('🔒 Sunucu lockdown moduna alındı!');
                                                    } catch (e) { toast.error('İşlem başarısız'); }
                                                }}
                                            >
                                                <FaLock /> Sunucuyu Kilitle
                                            </button>
                                            <button
                                                style={styles.quickActionBtn}
                                                onClick={() => toast.info('🚧 Bu özellik yakında eklenecek')}
                                            >
                                                <FaTrash /> Tüm Mesajları Temizle
                                            </button>
                                            <button
                                                style={styles.quickActionBtn}
                                                onClick={async () => {
                                                    if (!await confirmDialog('Yeni üyelikleri durdurmak istediğinize emin misiniz?')) return;
                                                    try {
                                                        await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/update/`, {
                                                            method: 'PATCH',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify({ metadata: { ...server.metadata, join_disabled: true } })
                                                        });
                                                        toast.success('🚫 Yeni üyelikler durduruldu!');
                                                    } catch (e) { toast.error('İşlem başarısız'); }
                                                }}
                                            >
                                                <FaUserSlash /> Yeni Üyeliği Durdur
                                            </button>
                                            <button
                                                style={styles.quickActionBtn}
                                                onClick={() => toast.info('🚧 Bu özellik yakında eklenecek')}
                                            >
                                                <FaBell /> Duyuru Gönder
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 🚫 BAN YÖNETİMİ TAB */}
                            {activeTab === 'bans' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', backgroundColor: '#1e1f22', borderRadius: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <FaBan style={{ fontSize: '24px', color: '#ed4245' }} />
                                            <div>
                                                <h3 style={{ margin: 0, color: '#fff', fontSize: '16px' }}>Yasaklı Kullanıcılar</h3>
                                                <p style={{ margin: '2px 0 0', color: '#b9bbbe', fontSize: '12px' }}>
                                                    {bans.length} yasaklı kullanıcı
                                                </p>
                                            </div>
                                        </div>
                                        <button onClick={loadBans} style={{ ...styles.actionBtn, backgroundColor: '#5865f2', padding: '8px 16px', fontSize: '13px' }}>
                                            <FaUndo /> Yenile
                                        </button>
                                    </div>

                                    {bansLoading ? (
                                        <div style={{ textAlign: 'center', color: '#b9bbbe', padding: '40px' }}>Yükleniyor...</div>
                                    ) : bans.length === 0 ? (
                                        <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#2b2d31', borderRadius: '12px' }}>
                                            <FaCheck style={{ fontSize: '48px', color: '#43b581', marginBottom: '16px' }} />
                                            <h4 style={{ color: '#fff', margin: '0 0 8px' }}>Temiz!</h4>
                                            <p style={{ color: '#b9bbbe', fontSize: '14px' }}>Henüz yasaklanmış kullanıcı yok.</p>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {bans.map(ban => (
                                                <div key={ban.id} style={{
                                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                                    padding: '14px 18px', backgroundColor: '#2b2d31', borderRadius: '8px',
                                                    border: '1px solid #1e1f22', transition: 'background-color 0.15s'
                                                }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                        <div style={{
                                                            width: '36px', height: '36px', borderRadius: '50%',
                                                            backgroundColor: '#ed4245', display: 'flex', alignItems: 'center',
                                                            justifyContent: 'center', color: '#fff', fontWeight: '700', fontSize: '14px'
                                                        }}>
                                                            {ban.username?.[0]?.toUpperCase() || '?'}
                                                        </div>
                                                        <div>
                                                            <div style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>{ban.username}</div>
                                                            <div style={{ color: '#72767d', fontSize: '12px', marginTop: '2px' }}>
                                                                {ban.reason || 'Sebep belirtilmemiş'} • Yasaklayan: {ban.banned_by || 'Sistem'}
                                                            </div>
                                                            <div style={{ color: '#4e5058', fontSize: '11px', marginTop: '2px' }}>
                                                                <FaCalendarAlt style={{ marginRight: '4px', fontSize: '10px' }} />
                                                                {ban.created_at ? new Date(ban.created_at).toLocaleDateString('tr-TR', {
                                                                    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                                                }) : 'Tarih yok'}
                                                                {ban.expires_at && !ban.is_permanent && (
                                                                    <span style={{ marginLeft: '8px', color: '#faa61a' }}>
                                                                        ⏰ Bitiş: {new Date(ban.expires_at).toLocaleDateString('tr-TR')}
                                                                    </span>
                                                                )}
                                                                {ban.is_permanent && (
                                                                    <span style={{ marginLeft: '8px', color: '#ed4245' }}>♾️ Kalıcı</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleUnban(ban.username)}
                                                        style={{
                                                            padding: '8px 14px', backgroundColor: 'transparent',
                                                            border: '1px solid #43b581', borderRadius: '6px',
                                                            color: '#43b581', cursor: 'pointer', fontWeight: '600',
                                                            fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px',
                                                            transition: 'all 0.15s'
                                                        }}
                                                        onMouseEnter={(e) => { e.target.style.backgroundColor = '#43b581'; e.target.style.color = '#fff'; }}
                                                        onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#43b581'; }}
                                                    >
                                                        <FaUndo /> Yasağı Kaldır
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* 📜 AUDIT LOG TAB */}
                            {activeTab === 'auditlog' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', backgroundColor: '#1e1f22', borderRadius: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <FaHistory style={{ fontSize: '24px', color: '#7289da' }} />
                                            <div>
                                                <h3 style={{ margin: 0, color: '#fff', fontSize: '16px' }}>Aksiyon Geçmişi</h3>
                                                <p style={{ margin: '2px 0 0', color: '#b9bbbe', fontSize: '12px' }}>
                                                    Tüm moderatör ve admin aksiyonları
                                                </p>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <select
                                                value={auditFilter}
                                                onChange={(e) => { setAuditFilter(e.target.value); loadAuditLogs(e.target.value); }}
                                                style={{
                                                    padding: '8px 12px', backgroundColor: '#2b2d31', border: '1px solid #40444b',
                                                    borderRadius: '6px', color: '#dcddde', fontSize: '12px', outline: 'none', cursor: 'pointer'
                                                }}
                                            >
                                                <option value="">Tüm Aksiyonlar</option>
                                                <option value="BAN">Yasaklama</option>
                                                <option value="UNBAN">Yasak Kaldırma</option>
                                                <option value="KICK">Atma</option>
                                                <option value="ROLE_CHANGE">Rol Değişikliği</option>
                                                <option value="CHANNEL_CREATE">Kanal Oluşturma</option>
                                                <option value="CHANNEL_DELETE">Kanal Silme</option>
                                                <option value="MESSAGE_DELETE">Mesaj Silme</option>
                                                <option value="SERVER_UPDATE">Sunucu Güncelleme</option>
                                                <option value="EMAIL_VERIFIED">E-posta Doğrulama</option>
                                            </select>
                                            <button onClick={() => loadAuditLogs(auditFilter)} style={{ ...styles.actionBtn, backgroundColor: '#5865f2', padding: '8px 14px', fontSize: '12px' }}>
                                                <FaUndo />
                                            </button>
                                        </div>
                                    </div>

                                    {auditLoading ? (
                                        <div style={{ textAlign: 'center', color: '#b9bbbe', padding: '40px' }}>Yükleniyor...</div>
                                    ) : auditLogs.length === 0 ? (
                                        <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#2b2d31', borderRadius: '12px' }}>
                                            <FaHistory style={{ fontSize: '48px', color: '#4e5058', marginBottom: '16px' }} />
                                            <h4 style={{ color: '#fff', margin: '0 0 8px' }}>Kayıt Yok</h4>
                                            <p style={{ color: '#b9bbbe', fontSize: '14px' }}>Henüz kayıtlı aksiyon bulunamadı.</p>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            {auditLogs.map((log, idx) => {
                                                const actionColors = {
                                                    'BAN': '#ed4245', 'UNBAN': '#43b581', 'KICK': '#faa61a',
                                                    'MESSAGE_DELETE': '#f47b67', 'ROLE_CHANGE': '#5865f2',
                                                    'CHANNEL_CREATE': '#43b581', 'CHANNEL_DELETE': '#ed4245',
                                                    'SERVER_UPDATE': '#7289da', 'EMAIL_VERIFIED': '#43b581'
                                                };
                                                const actionColor = actionColors[log.action_type] || '#b9bbbe';
                                                return (
                                                    <div key={log.id || idx} style={{
                                                        display: 'flex', alignItems: 'center', gap: '12px',
                                                        padding: '12px 16px', backgroundColor: '#2b2d31',
                                                        borderRadius: '6px', borderLeft: `3px solid ${actionColor}`,
                                                    }}>
                                                        <div style={{
                                                            width: '8px', height: '8px', borderRadius: '50%',
                                                            backgroundColor: actionColor, flexShrink: 0
                                                        }} />
                                                        <div style={{ flex: 1, minWidth: 0 }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                                                <span style={{ color: '#fff', fontWeight: '600', fontSize: '13px' }}>
                                                                    {log.actor_username || log.actor || 'Sistem'}
                                                                </span>
                                                                <span style={{
                                                                    backgroundColor: `${actionColor}22`, color: actionColor,
                                                                    padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: '600'
                                                                }}>
                                                                    {log.action_type}
                                                                </span>
                                                            </div>
                                                            {log.details && (
                                                                <div style={{ color: '#72767d', fontSize: '12px', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                                    {typeof log.details === 'object' ? JSON.stringify(log.details).substring(0, 120) : String(log.details).substring(0, 120)}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div style={{ color: '#4e5058', fontSize: '11px', flexShrink: 0, whiteSpace: 'nowrap' }}>
                                                            {log.timestamp ? new Date(log.timestamp).toLocaleString('tr-TR', {
                                                                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                                            }) : ''}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* 📊 SUNUCU İSTATİSTİKLERİ TAB */}
                            {activeTab === 'stats' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', backgroundColor: '#1e1f22', borderRadius: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <FaChartBar style={{ fontSize: '24px', color: '#5865f2' }} />
                                            <div>
                                                <h3 style={{ margin: 0, color: '#fff', fontSize: '16px' }}>Sunucu İstatistikleri</h3>
                                                <p style={{ margin: '2px 0 0', color: '#b9bbbe', fontSize: '12px' }}>
                                                    Sunucunuzun performans özeti
                                                </p>
                                            </div>
                                        </div>
                                        <button onClick={loadServerStats} style={{ ...styles.actionBtn, backgroundColor: '#5865f2', padding: '8px 16px', fontSize: '13px' }}>
                                            <FaUndo /> Yenile
                                        </button>
                                    </div>

                                    {statsLoading ? (
                                        <div style={{ textAlign: 'center', color: '#b9bbbe', padding: '40px' }}>Yükleniyor...</div>
                                    ) : !serverStats ? (
                                        <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#2b2d31', borderRadius: '12px' }}>
                                            <FaChartBar style={{ fontSize: '48px', color: '#4e5058', marginBottom: '16px' }} />
                                            <h4 style={{ color: '#fff', margin: '0 0 8px' }}>İstatistikler yüklenemedi</h4>
                                            <p style={{ color: '#b9bbbe', fontSize: '14px' }}>Yenile butonuna basarak tekrar deneyin.</p>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Ana Metrikler */}
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                                                <div style={{ backgroundColor: '#2b2d31', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #5865f2' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                                        <FaUsers style={{ color: '#5865f2', fontSize: '18px' }} />
                                                        <span style={{ color: '#b9bbbe', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Toplam Üye</span>
                                                    </div>
                                                    <div style={{ fontSize: '32px', fontWeight: '800', color: '#fff' }}>{serverStats.total_members ?? serverStats.members ?? 0}</div>
                                                    {serverStats.online_members !== undefined && (
                                                        <div style={{ fontSize: '12px', color: '#43b581', marginTop: '4px' }}>
                                                            🟢 {serverStats.online_members} çevrimiçi
                                                        </div>
                                                    )}
                                                </div>

                                                <div style={{ backgroundColor: '#2b2d31', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #43b581' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                                        <FaComments style={{ color: '#43b581', fontSize: '18px' }} />
                                                        <span style={{ color: '#b9bbbe', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Toplam Mesaj</span>
                                                    </div>
                                                    <div style={{ fontSize: '32px', fontWeight: '800', color: '#fff' }}>{(serverStats.total_messages ?? 0).toLocaleString('tr-TR')}</div>
                                                    {serverStats.messages_last_7_days !== undefined && (
                                                        <div style={{ fontSize: '12px', color: '#faa61a', marginTop: '4px' }}>
                                                            📈 Son 7 gün: {serverStats.messages_last_7_days}
                                                        </div>
                                                    )}
                                                </div>

                                                <div style={{ backgroundColor: '#2b2d31', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #faa61a' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                                        <FaHashtag style={{ color: '#faa61a', fontSize: '18px' }} />
                                                        <span style={{ color: '#b9bbbe', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Kanal Sayısı</span>
                                                    </div>
                                                    <div style={{ fontSize: '32px', fontWeight: '800', color: '#fff' }}>{serverStats.total_channels ?? serverStats.rooms ?? 0}</div>
                                                </div>
                                            </div>

                                            {/* Detay Bilgileri */}
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                                <div style={{ backgroundColor: '#2b2d31', padding: '18px', borderRadius: '10px' }}>
                                                    <h4 style={{ margin: '0 0 14px', color: '#fff', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <FaShieldAlt style={{ color: '#5865f2' }} /> Sunucu Bilgileri
                                                    </h4>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: '#1e1f22', borderRadius: '6px' }}>
                                                            <span style={{ color: '#b9bbbe', fontSize: '13px' }}>Sunucu Adı</span>
                                                            <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600' }}>{serverStats.server_name || server.name}</span>
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: '#1e1f22', borderRadius: '6px' }}>
                                                            <span style={{ color: '#b9bbbe', fontSize: '13px' }}>Oluşturulma</span>
                                                            <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600' }}>
                                                                {serverStats.created_at ? new Date(serverStats.created_at).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' }) : (server.created_at ? new Date(server.created_at).toLocaleDateString('tr-TR') : 'Bilinmiyor')}
                                                            </span>
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: '#1e1f22', borderRadius: '6px' }}>
                                                            <span style={{ color: '#b9bbbe', fontSize: '13px' }}>Gizlilik</span>
                                                            <span style={{ color: server.is_public ? '#43b581' : '#faa61a', fontSize: '13px', fontWeight: '600' }}>
                                                                {server.is_public ? '🌐 Herkese Açık' : '🔒 Özel'}
                                                            </span>
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: '#1e1f22', borderRadius: '6px' }}>
                                                            <span style={{ color: '#b9bbbe', fontSize: '13px' }}>Rol Sayısı</span>
                                                            <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600' }}>{roles.length}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div style={{ backgroundColor: '#2b2d31', padding: '18px', borderRadius: '10px' }}>
                                                    <h4 style={{ margin: '0 0 14px', color: '#fff', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <FaChartLine style={{ color: '#43b581' }} /> Aktivite Özeti
                                                    </h4>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: '#1e1f22', borderRadius: '6px' }}>
                                                            <span style={{ color: '#b9bbbe', fontSize: '13px' }}>Kategori Sayısı</span>
                                                            <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600' }}>{server.categories?.length || 0}</span>
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: '#1e1f22', borderRadius: '6px' }}>
                                                            <span style={{ color: '#b9bbbe', fontSize: '13px' }}>Yasaklı Üye</span>
                                                            <span style={{ color: bans.length > 0 ? '#ed4245' : '#43b581', fontSize: '13px', fontWeight: '600' }}>{bans.length}</span>
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: '#1e1f22', borderRadius: '6px' }}>
                                                            <span style={{ color: '#b9bbbe', fontSize: '13px' }}>Çevrimiçi Üye</span>
                                                            <span style={{ color: '#43b581', fontSize: '13px', fontWeight: '600' }}>{serverStats.online_members ?? '—'}</span>
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: '#1e1f22', borderRadius: '6px' }}>
                                                            <span style={{ color: '#b9bbbe', fontSize: '13px' }}>Haftalık Mesaj</span>
                                                            <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600' }}>{serverStats.messages_last_7_days ?? '—'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Sunucu Sağlık Göstergeleri */}
                                            <div style={{ backgroundColor: '#2b2d31', padding: '18px', borderRadius: '10px' }}>
                                                <h4 style={{ margin: '0 0 14px', color: '#fff', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <FaChartPie style={{ color: '#faa61a' }} /> Sağlık Göstergeleri
                                                </h4>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                                                    {[
                                                        {
                                                            label: 'Üye Aktivitesi',
                                                            value: serverStats.online_members && serverStats.total_members
                                                                ? Math.round((serverStats.online_members / serverStats.total_members) * 100) : null,
                                                            color: '#43b581', suffix: '%'
                                                        },
                                                        {
                                                            label: 'Günlük Ort. Mesaj',
                                                            value: serverStats.messages_last_7_days ? Math.round(serverStats.messages_last_7_days / 7) : null,
                                                            color: '#5865f2', suffix: ''
                                                        },
                                                        {
                                                            label: 'Üye/Kanal Oranı',
                                                            value: serverStats.total_channels ? Math.round((serverStats.total_members || 0) / serverStats.total_channels) : null,
                                                            color: '#faa61a', suffix: ':1'
                                                        }
                                                    ].map((metric, i) => (
                                                        <div key={i} style={{ padding: '14px', backgroundColor: '#1e1f22', borderRadius: '8px', textAlign: 'center' }}>
                                                            <div style={{ fontSize: '24px', fontWeight: '800', color: metric.color }}>{metric.value ?? '—'}{metric.value !== null ? metric.suffix : ''}</div>
                                                            <div style={{ fontSize: '11px', color: '#72767d', marginTop: '4px' }}>{metric.label}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Styles extracted to ./ServerSettingsModal/styles.js

export default ServerSettingsModal;
