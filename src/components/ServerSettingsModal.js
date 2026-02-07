// frontend/src/components/ServerSettingsModal.js

import React, { useState, useEffect, useCallback } from 'react';
import { FaTimes, FaPlus, FaCheck, FaPalette, FaUsers, FaShieldAlt, FaEdit, FaTrash, FaCog, FaVolumeUp, FaVolumeMute, FaRobot, FaLink, FaHandPaper, FaImage, FaLock, FaGlobe, FaChartBar, FaHistory, FaExclamationTriangle, FaBan, FaClock, FaUserSlash, FaFileAlt, FaUserShield, FaComments, FaBell, FaEye, FaStar, FaCrown, FaGavel } from 'react-icons/fa';
import { ChromePicker } from 'react-color';
import toast from '../utils/toast';
import ServerMembers from './ServerMembers';
import AutoResponderManager from './AutoResponderManager';
import VanityURLManager from './VanityURLManager';

// 🆕 Welcome Templates component (creating inline for now)
const WelcomeTemplateEditor = ({ serverId, fetchWithAuth, apiBaseUrl }) => {
    const [template, setTemplate] = useState('');
    const [enabled, setEnabled] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTemplate = async () => {
            try {
                const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/welcome/`);
                if (res.ok) {
                    const data = await res.json();
                    setTemplate(data.template || '');
                    setEnabled(data.enabled || false);
                }
            } catch (e) {
                console.error('Welcome template load error:', e);
            } finally {
                setLoading(false);
            }
        };
        loadTemplate();
    }, [serverId, fetchWithAuth, apiBaseUrl]);

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/welcome/set/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    server_id: serverId,
                    template,
                    enabled
                })
            });
            if (res.ok) {
                toast.success('Welcome message saved!');
            } else {
                toast.error('Failed to save');
            }
        } catch (e) {
            console.error('Save error:', e);
            toast.error('Error saving');
        } finally {
            setLoading(false);
        }
    };

    const variables = [
        '{username}', '{mention}', '{server}', '{memberCount}', '{inviter}', '{date}'
    ];

    if (loading) return <div style={{ padding: '20px', color: '#b9bbbe' }}>Loading...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => setEnabled(e.target.checked)}
                    id="welcome-enabled"
                />
                <label htmlFor="welcome-enabled" style={{ color: '#dcddde', cursor: 'pointer' }}>
                    Enable Welcome Messages
                </label>
            </div>

            <div>
                <label style={{ color: '#b9bbbe', fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
                    Welcome Message Template
                </label>
                <textarea
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    placeholder="Welcome {mention} to {server}! You are member #{memberCount}!"
                    style={{
                        width: '100%',
                        minHeight: '120px',
                        padding: '10px',
                        backgroundColor: '#1e1f22',
                        border: '1px solid #40444b',
                        borderRadius: '4px',
                        color: '#dcddde',
                        fontFamily: 'inherit',
                        resize: 'vertical'
                    }}
                />
                <div style={{ fontSize: '11px', color: '#72767d', marginTop: '5px' }}>
                    {template.length}/500 characters
                </div>
            </div>

            <div>
                <label style={{ color: '#b9bbbe', fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
                    Available Variables
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {variables.map(v => (
                        <button
                            key={v}
                            onClick={() => setTemplate(template + ' ' + v)}
                            style={{
                                padding: '6px 12px',
                                backgroundColor: '#2f3136',
                                border: '1px solid #40444b',
                                borderRadius: '4px',
                                color: '#5865f2',
                                cursor: 'pointer',
                                fontFamily: 'monospace',
                                fontSize: '13px'
                            }}
                        >
                            {v}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                    onClick={handleSave}
                    disabled={loading}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#5865f2',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold',
                        opacity: loading ? 0.5 : 1
                    }}
                >
                    {loading ? 'Saving...' : 'Save Welcome Message'}
                </button>
            </div>
        </div>
    );
};

const ServerSettingsModal = ({ onClose, server, currentUsername, fetchWithAuth, apiBaseUrl, serverMembers, onRefreshServers }) => {

    const [activeTab, setActiveTab] = useState('roles'); // 'roles', 'members', 'management'
    const [roles, setRoles] = useState(server.roles || []);
    // İsim değişikliği olmuşsa bile backend'den gelen my_permissions bilgisini veya isme dayalı kontrolü kullan
    const isOwner = server.my_permissions?.is_owner || server.owner_username === currentUsername;

    // Sunucu yönetimi için state'ler
    const [isMuted, setIsMuted] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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
        console.log("Düzenlenen Rol Verisi:", role); // Hata ayıklama için konsola yazdır

        setEditingRole(role);
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

        console.log("Sunucuya Gönderilen Payload:", payload); // Kontrol için log ekledik

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/roles/create/`, {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const savedRole = await res.json();
                console.log("Sunucudan Gelen Kayıtlı Rol:", savedRole); // Dönüşü kontrol et

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
        if (!window.confirm("Bu rolü silmek istediğinize emin misiniz?")) return;
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

        if (!window.confirm(`"${server.name}" sunucusunu KALİCİ OLARAK silmek istediğinize emin misiniz?\n\nBu işlem geri alınamaz!`)) {
            return;
        }

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/delete/`, {
                method: 'DELETE'
            });

            if (res.ok) {
                toast.success('Sunucu başarıyla silindi!');
                onClose();
                if (onRefreshServers) onRefreshServers(); // Ana listeyi yenile
                window.location.href = '/'; // Ana sayfaya dön
            } else {
                const data = await res.json();
                toast.error(data.error || 'Sunucu silinemedi.');
            }
        } catch (e) {
            console.error('Delete hatası:', e);
            toast.error('Sunucu silinirken bir hata oluştu.');
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
                            </div>

                            <div style={styles.navDivider} />

                            {/* Güvenlik Section */}
                            <div style={styles.navSection}>
                                <span style={styles.navSectionLabel}>GÜVENLİK</span>
                                <button className={`ss-nav-item${activeTab === 'moderation' ? ' ss-nav-active' : ''}`} style={{ ...styles.navItem, ...(activeTab === 'moderation' ? styles.navItemActive : {}) }} onClick={() => setActiveTab('moderation')}>
                                    <FaGavel style={styles.navIcon} /> Moderasyon
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

                                            {/* İkon Değiştirme */}
                                            <div style={styles.settingBox}>
                                                <div style={styles.settingInfo}>
                                                    <div style={styles.settingLabel}>
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
                                                                    window.location.reload();
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

                                                        if (!window.confirm(message)) return;

                                                        try {
                                                            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/privacy/`, {
                                                                method: 'POST',
                                                                headers: { 'Content-Type': 'application/json' },
                                                                body: JSON.stringify({ is_public: newPrivacy })
                                                            });

                                                            if (res.ok) {
                                                                toast.success(`Sunucu ${newPrivacy ? 'herkese açık' : 'özel'} yapıldı!`);
                                                                window.location.reload();
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
                                                onClick={() => toast.info('Lockdown aktifleştirildi!')}
                                            >
                                                <FaLock /> Sunucuyu Kilitle
                                            </button>
                                            <button
                                                style={styles.quickActionBtn}
                                                onClick={() => toast.info('Tüm kanallar temizlendi!')}
                                            >
                                                <FaTrash /> Tüm Mesajları Temizle
                                            </button>
                                            <button
                                                style={styles.quickActionBtn}
                                                onClick={() => toast.info('Yeni üyelik durduruldu!')}
                                            >
                                                <FaUserSlash /> Yeni Üyeliği Durdur
                                            </button>
                                            <button
                                                style={styles.quickActionBtn}
                                                onClick={() => toast.info('Bildirimleri yayınla!')}
                                            >
                                                <FaBell /> Duyuru Gönder
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 },
    modal: { backgroundColor: '#313338', borderRadius: '12px', width: '900px', maxWidth: '95vw', height: '650px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.6)' },

    // Layout
    layoutContainer: { display: 'flex', flex: 1, overflow: 'hidden' },

    // ═══ SIDEBAR ═══
    sidebar: {
        width: '220px',
        minWidth: '220px',
        backgroundColor: '#2b2d31',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid rgba(255,255,255,0.06)',
    },
    sidebarHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '20px 16px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    sidebarServerIcon: {
        width: '40px',
        height: '40px',
        borderRadius: '12px',
        backgroundColor: '#5865f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: '700',
        fontSize: '16px',
        flexShrink: 0,
    },
    sidebarServerInfo: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    sidebarServerName: {
        color: '#fff',
        fontWeight: '700',
        fontSize: '14px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    sidebarServerSub: {
        color: '#949ba4',
        fontSize: '11px',
        marginTop: '2px',
    },
    sidebarNav: {
        flex: 1,
        overflowY: 'auto',
        padding: '8px',
    },
    navSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
    },
    navSectionLabel: {
        fontSize: '11px',
        fontWeight: '700',
        color: '#949ba4',
        letterSpacing: '0.04em',
        padding: '8px 10px 4px',
        userSelect: 'none',
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 10px',
        borderRadius: '6px',
        border: 'none',
        background: 'none',
        color: '#b5bac1',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'all 0.15s ease',
        textAlign: 'left',
        width: '100%',
    },
    navItemActive: {
        backgroundColor: 'rgba(88,101,242,0.15)',
        color: '#fff',
    },
    navIcon: {
        fontSize: '14px',
        opacity: 0.8,
        flexShrink: 0,
    },
    navDivider: {
        height: '1px',
        backgroundColor: 'rgba(255,255,255,0.06)',
        margin: '8px 10px',
    },

    // ═══ MAIN CONTENT ═══
    mainContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    contentHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 24px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    contentTitle: {
        margin: 0,
        color: '#fff',
        fontSize: '1.2em',
        fontWeight: '700',
    },
    closeBtn: { background: 'none', border: 'none', color: '#b9bbbe', cursor: 'pointer', padding: '4px', borderRadius: '4px', transition: 'color 0.15s' },
    content: { flex: 1, padding: '20px 24px', overflow: 'auto' },

    // Legacy compat (header/tabs removed - kept for inner usage)
    header: { display: 'none' },
    headerTitle: { margin: 0, color: '#fff', fontSize: '1.2em' },
    tabs: { display: 'none' },
    tabBtn: { display: 'none' },
    activeTab: {},

    // Sol Menü
    rolesSidebar: { width: '200px', borderRight: '1px solid #1e1f22', display: 'flex', flexDirection: 'column', gap: '10px' },
    newRoleBtn: { padding: '10px', backgroundColor: '#232428', color: '#fff', border: '1px solid #1e1f22', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' },
    rolesList: { overflowY: 'auto', flex: 1 },
    roleItem: { padding: '10px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '4px', marginBottom: '2px', color: '#b9bbbe' },

    // Sağ Editör
    roleEditor: { flex: 1, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' },
    editorTitle: { margin: 0, color: '#fff', borderBottom: '1px solid #40444b', paddingBottom: '10px' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '5px', color: '#b9bbbe', fontSize: '0.9em' },
    input: { padding: '10px', backgroundColor: '#1e1f22', border: 'none', borderRadius: '4px', color: '#fff', outline: 'none' },
    colorPreview: { width: '40px', height: '40px', borderRadius: '4px', border: '1px solid #fff', cursor: 'pointer' },

    // 🔥 KAPLAMA (COVER) STİLİ: Tüm ekranı kaplar ama z-index ile picker'ın altında kalır
    cover: { position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px', zIndex: 999 },

    permissionsGrid: { display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: '#2b2d31', padding: '15px', borderRadius: '8px' },

    // 🛡️ Moderation Cards - YENİ KAPSAMLI STİLLER
    moderationTab: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    },
    moderationHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 20px',
        backgroundColor: '#1e1f22',
        borderRadius: '12px',
        marginBottom: '8px'
    },
    moderationTitleSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
    },
    serverStats: {
        display: 'flex',
        gap: '24px'
    },
    statItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    statNumber: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#5865f2'
    },
    statLabel: {
        fontSize: '12px',
        color: '#72767d'
    },
    quickStatsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px'
    },
    quickStatCard: {
        backgroundColor: '#2b2d31',
        padding: '16px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    quickStatValue: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#fff'
    },
    quickStatLabel: {
        fontSize: '12px',
        color: '#72767d'
    },
    moderationCardsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
    },
    modCard: {
        backgroundColor: '#2b2d31',
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid #1e1f22',
        transition: 'transform 0.2s, box-shadow 0.2s'
    },
    modCardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '16px'
    },
    modCardIcon: {
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modCardBadge: {
        backgroundColor: 'rgba(88, 101, 242, 0.2)',
        color: '#5865f2',
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: '600'
    },
    modCardTitle: {
        margin: '0 0 8px',
        color: '#fff',
        fontSize: '16px',
        fontWeight: '600'
    },
    modCardDesc: {
        color: '#b9bbbe',
        fontSize: '13px',
        lineHeight: '1.5',
        marginBottom: '16px'
    },
    modCardFeatures: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginBottom: '16px'
    },
    modCardFeature: {
        backgroundColor: '#1e1f22',
        padding: '6px 10px',
        borderRadius: '6px',
        fontSize: '11px',
        color: '#b9bbbe'
    },
    modCardBtn: {
        width: '100%',
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 16px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'opacity 0.2s'
    },
    quickActionsSection: {
        backgroundColor: '#1e1f22',
        padding: '20px',
        borderRadius: '12px'
    },
    quickActionsTitle: {
        margin: '0 0 16px',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    quickActionsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '12px'
    },
    quickActionBtn: {
        backgroundColor: '#2b2d31',
        color: '#b9bbbe',
        border: '1px solid #40444b',
        borderRadius: '8px',
        padding: '12px 16px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.2s'
    },
    moderationCard: {
        backgroundColor: '#1e1f22',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #2b2d31'
    },
    moderationBtn: {
        width: '100%',
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '10px 16px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        transition: 'background-color 0.2s'
    },
    permLabel: { display: 'flex', gap: '10px', alignItems: 'center', color: '#dbdee1', cursor: 'pointer' },

    editorFooter: { marginTop: 'auto', display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid #40444b', paddingTop: '15px' },
    saveBtn: { padding: '10px 20px', backgroundColor: '#23a559', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' },
    deleteBtn: { padding: '10px 20px', backgroundColor: 'transparent', color: '#da373c', border: '1px solid #1e1f22', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' },

    // 🔥 YENİ: SUNUCU YÖNETİMİ TAB STİLLERİ
    managementTab: {
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        maxWidth: '600px',
        margin: '0 auto'
    },
    sectionTitle: {
        margin: 0,
        color: '#fff',
        fontSize: '1.1em',
        borderBottom: '2px solid #40444b',
        paddingBottom: '10px'
    },
    settingBox: {
        backgroundColor: '#2b2d31',
        padding: '20px',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px'
    },
    settingInfo: {
        flex: 1
    },
    settingLabel: {
        color: '#fff',
        fontSize: '1em',
        fontWeight: 'bold',
        marginBottom: '5px'
    },
    settingDesc: {
        color: '#b9bbbe',
        fontSize: '0.9em'
    },
    actionBtn: {
        padding: '10px 20px',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.95em',
        whiteSpace: 'nowrap'
    },
    divider: {
        height: '1px',
        backgroundColor: '#40444b',
        margin: '10px 0'
    },
    dangerBox: {
        backgroundColor: '#2b2d31',
        padding: '20px',
        borderRadius: '8px',
        border: '2px solid #da373c',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '20px'
    },
    dangerBtn: {
        padding: '10px 20px',
        backgroundColor: '#da373c',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.95em'
    },
    deleteConfirmation: {
        marginTop: '15px',
        padding: '15px',
        backgroundColor: '#1e1f22',
        borderRadius: '4px'
    },
    confirmInput: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#313338',
        border: '1px solid #da373c',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '0.95em',
        outline: 'none'
    },
    cancelBtn: {
        padding: '10px 20px',
        backgroundColor: 'transparent',
        color: '#b9bbbe',
        border: '1px solid #40444b',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold'
    }
};

export default ServerSettingsModal;

