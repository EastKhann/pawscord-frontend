// frontend/src/components/ChannelSettingsModal.js
// 🔥 FULL DISCORD-STYLE CHANNEL SETTINGS WITH ADVANCED PERMISSIONS

import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { FaTimes, FaTrash, FaSave, FaLock, FaGlobe, FaExclamationTriangle, FaUserFriends, FaBroadcastTower, FaClock, FaShieldAlt, FaCog, FaUserShield, FaPlus, FaChartLine, FaHistory, FaBell, FaEye, FaRobot, FaLink, FaCopy, FaCheck } from 'react-icons/fa';
import toast from '../utils/toast';

const ChannelSettingsModal = ({ room, serverRoles, onClose, fetchWithAuth, apiBaseUrl }) => {
    const [activeTab, setActiveTab] = useState('general'); // 'general', 'permissions'
    const [name, setName] = useState(room.name);
    const [selectedRoles, setSelectedRoles] = useState(room.allowed_roles || []);

    // 🔥 YENİ: Tüm kanal özellikleri
    const [isPrivate, setIsPrivate] = useState(room.is_private || false);
    const [isNsfw, setIsNsfw] = useState(room.is_nsfw || false);
    const [isLocked, setIsLocked] = useState(room.is_locked || false);
    const [isReadOnly, setIsReadOnly] = useState(room.admin_only_chat || false);
    const [userLimit, setUserLimit] = useState(room.user_limit || 0);
    const [bitrate, setBitrate] = useState(room.bitrate || 64);

    // 🔒 Gelişmiş İzinler
    const [permissions, setPermissions] = useState({ role_permissions: [], user_permissions: [], available_roles: [], available_users: [] });
    const [showAddPermission, setShowAddPermission] = useState(false);
    const [permissionType, setPermissionType] = useState('role'); // 'role' or 'user'
    const [selectedRoleForPerm, setSelectedRoleForPerm] = useState(null);
    const [selectedUserForPerm, setSelectedUserForPerm] = useState(null); // 🔥 YENİ: Seçilen kullanıcı
    const [searchUser, setSearchUser] = useState('');
    const [searchResults, setSearchResults] = useState([]); // 🔥 YENİ: Arama sonuçları
    const [notificationPref, setNotificationPref] = useState('all'); // 🔥 YENİ: Bildirim tercihi
    const [deleteHistoryDays, setDeleteHistoryDays] = useState('7'); // 🔥 YENİ: Mesaj geçmişi silme süresi

    const isVoiceChannel = room.channel_type === 'voice';

    const handlePrivateChange = useCallback((e) => {
        setIsPrivate(e.target.checked);
        updateChannelRestriction({ is_private: e.target.checked });
    }, []);

    const handleNsfwChange = useCallback((e) => {
        setIsNsfw(e.target.checked);
    }, []);

    const handleLockedChange = useCallback((e) => {
        setIsLocked(e.target.checked);
        updateChannelRestriction({ is_locked: e.target.checked });
    }, []);

    const handleReadOnlyChange = useCallback((e) => {
        setIsReadOnly(e.target.checked);
    }, []);

    const handleUserLimitChange = useCallback((e) => {
        const val = parseInt(e.target.value) || 0;
        setUserLimit(val);
        updateChannelRestriction({ user_limit: val });
    }, []);

    // İzinleri yükle
    useEffect(() => {
        if (activeTab === 'permissions') {
            loadPermissions();
        }
    }, [activeTab]);

    const loadPermissions = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/channels/${room.slug}/permissions/`);
            const data = await response.json();
            setPermissions(data);
        } catch (error) {
            console.error('❌ İzinler yüklenemedi:', error);
        }
    };

    const handleSave = async () => {
        try {
            // 1. İsim Değişikliği
            if (name !== room.name) {
                await fetchWithAuth(`${apiBaseUrl}/rooms/${room.slug}/settings/`, {
                    method: 'POST',
                    body: JSON.stringify({ action: 'rename', name })
                });
            }

            // 2. Rol Bazlı Erişim
            if (isPrivate) {
                await fetchWithAuth(`${apiBaseUrl}/rooms/${room.slug}/settings/`, {
                    method: 'POST',
                    body: JSON.stringify({
                        action: 'update_roles',
                        allowed_roles: selectedRoles
                    })
                });
            }

            // 3. 🔥 YENİ: Tüm Kanal Ayarları (NSFW, Locked, Read-Only, etc.)
            await fetchWithAuth(`${apiBaseUrl}/rooms/${room.slug}/settings/`, {
                method: 'POST',
                body: JSON.stringify({
                    action: 'update_settings',
                    is_private: isPrivate,
                    is_nsfw: isNsfw,
                    is_locked: isLocked,
                    admin_only_chat: isReadOnly,
                    user_limit: isVoiceChannel ? userLimit : null,
                    bitrate: isVoiceChannel ? bitrate : null
                })
            });

            // ✅ Ayarlar kaydedildi - alert kaldırıldı
            onClose();
        } catch (e) {
            console.error("❌ Ayarlar kaydedilemedi:", e);
            toast.error("❌ Hata oluştu.");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Bu kanalı kalıcı olarak silmek istiyor musun?")) return;
        try {
            await fetchWithAuth(`${apiBaseUrl}/rooms/${room.slug}/settings/`, {
                method: 'POST',
                body: JSON.stringify({ action: 'delete' })
            });
            onClose();
        } catch (e) { console.error(e); }
    };

    const toggleRole = (roleId) => {
        if (selectedRoles.includes(roleId)) {
            setSelectedRoles(prev => prev.filter(id => id !== roleId));
        } else {
            setSelectedRoles(prev => [...prev, roleId]);
        }
    };

    const addPermission = async () => {
        // 🔥 ROL veya USER kontrolü
        if (permissionType === 'role' && !selectedRoleForPerm) {
            toast.error('❌ Lütfen bir rol seçin!');
            return;
        }
        if (permissionType === 'user' && !selectedUserForPerm) {
            toast.error('❌ Lütfen bir kullanıcı seçin!');
            return;
        }

        try {
            const body = {
                room_id: room.id,
                permissions: {
                    can_view: true,
                    can_send_messages: true,
                    can_read_history: true,
                    can_connect: true,
                    can_speak: true,
                    can_video: true
                }
            };

            // Rol veya user ID'sini ekle
            if (permissionType === 'role') {
                body.role_id = selectedRoleForPerm;
            } else {
                body.user_id = selectedUserForPerm;
            }

            await fetchWithAuth(`${apiBaseUrl}/channels/permissions/add/`, {
                method: 'POST',
                body: JSON.stringify(body)
            });

            setShowAddPermission(false);
            setSelectedRoleForPerm(null);
            setSelectedUserForPerm(null); // 🔥 YENİ: User seçimini sıfırla
            setSearchUser(''); // 🔥 YENİ: Arama kutusunu temizle
            setSearchResults([]); // 🔥 YENİ: Arama sonuçlarını temizle
            loadPermissions();
            // ✅ İzin eklendi - alert kaldırıldı
        } catch (error) {
            console.error('❌ İzin eklenemedi:', error);
            toast.error('❌ İzin eklenemedi! Hata: ' + (error.message || 'Bilinmeyen hata'));
        }
    };

    // 🔥 YENİ: Kullanıcı arama fonksiyonu
    const searchUsers = async (query) => {
        if (!query || query.length < 2) {
            setSearchResults([]);
            return;
        }

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/users/search/?q=${encodeURIComponent(query)}`);
            const data = await response.json();
            setSearchResults(data.users || data || []);
        } catch (error) {
            console.error('❌ Kullanıcı arama hatası:', error);
            setSearchResults([]);
        }
    };

    const removePermission = async (permId) => {
        if (!window.confirm('Bu izni kaldırmak istediğinizden emin misiniz?')) return;

        try {
            await fetchWithAuth(`${apiBaseUrl}/channels/permissions/${permId}/remove/`, {
                method: 'DELETE'
            });
            loadPermissions();
        } catch (error) {
            console.error('❌ İzin silinemedi:', error);
        }
    };

    const updateChannelRestriction = async (updates) => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/channels/${room.slug}/restriction/`, {
                method: 'PATCH',
                body: JSON.stringify(updates)
            });
            // ✅ Kısıtlamalar güncellendi - alert kaldırıldı
        } catch (error) {
            console.error('❌ Kısıtlama güncellenemedi:', error);
            toast.error('❌ Hata oluştu!');
        }
    };

    const modalContent = (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                {/* HEADER - Profesyonel Görünüm */}
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <div style={styles.channelIcon}>
                            {isVoiceChannel ? '🔊' : '#'}
                        </div>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1.1em', color: '#fff' }}>{room.name}</h3>
                            <span style={{ fontSize: '0.8em', color: '#72767d' }}>
                                {isVoiceChannel ? 'Ses Kanalı' : 'Metin Kanalı'} Ayarları
                            </span>
                        </div>
                    </div>
                    <button onClick={onClose} style={styles.closeBtn}><FaTimes /></button>
                </div>

                {/* 🔥 TAB NAVIGATION - Daha Fazla Tab */}
                <div style={styles.tabs}>
                    <button
                        style={activeTab === 'general' ? styles.tabActive : styles.tab}
                        onClick={() => setActiveTab('general')}
                    >
                        <FaCog /> Genel
                    </button>
                    <button
                        style={activeTab === 'permissions' ? styles.tabActive : styles.tab}
                        onClick={() => setActiveTab('permissions')}
                    >
                        <FaShieldAlt /> İzinler
                    </button>
                    <button
                        style={activeTab === 'integrations' ? styles.tabActive : styles.tab}
                        onClick={() => setActiveTab('integrations')}
                    >
                        <FaLink /> Entegrasyonlar
                    </button>
                    <button
                        style={activeTab === 'advanced' ? styles.tabActive : styles.tab}
                        onClick={() => setActiveTab('advanced')}
                    >
                        <FaHistory /> Gelişmiş
                    </button>
                </div>

                <div style={styles.body}>
                    {/* GENEL AYARLAR TAB */}
                    {activeTab === 'general' && (
                        <>
                            <div style={styles.section}>
                                <label style={styles.label}>Kanal Adı</label>
                                <input
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.section}>
                                <label style={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={isPrivate}
                                        onChange={handlePrivateChange}
                                    />
                                    {isPrivate ? <FaLock color="#f04747" /> : <FaGlobe color="#43b581" />}
                                    <span>{isPrivate ? "🔒 Özel Kanal (İzinli roller)" : "🌍 Herkese Açık Kanal"}</span>
                                </label>
                            </div>

                            {isPrivate && (
                                <div style={styles.rolesList}>
                                    <p style={{ fontSize: '0.9em', color: '#ccc' }}>Kimler erişebilir?</p>
                                    {serverRoles.map(role => (
                                        <div key={role.id} style={styles.roleItem} onClick={() => toggleRole(role.id)}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: role.color }}></div>
                                                <span>{role.name}</span>
                                            </div>
                                            <input type="checkbox" checked={selectedRoles.includes(role.id)} readOnly />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* 🔥 NSFW CHANNEL */}
                            <div style={styles.section}>
                                <label style={styles.checkboxLabel}>
                                    <input type="checkbox" checked={isNsfw} onChange={handleNsfwChange} />
                                    <FaExclamationTriangle color="#f04747" size={16} />
                                    <span>🔞 NSFW (18+ İçerik)</span>
                                </label>
                                <p style={{ fontSize: '0.875em', color: '#949ba4', marginTop: '8px', marginLeft: '28px', fontStyle: 'italic' }}>
                                    Yetişkin içerik uyarısı gösterilir.
                                </p>
                            </div>

                            {/* 🔥 LOCKED CHANNEL */}
                            <div style={styles.section}>
                                <label style={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={isLocked}
                                        onChange={handleLockedChange}
                                    />
                                    <FaLock color="#f04747" size={14} />
                                    <span>🔒 Kanal Kilitli</span>
                                </label>
                                <p style={{ fontSize: '0.875em', color: '#949ba4', marginTop: '8px', marginLeft: '28px', fontStyle: 'italic' }}>
                                    Kimse mesaj gönderemez (geçici kilitleme).
                                </p>
                            </div>

                            {/* 🔥 READ-ONLY CHANNEL */}
                            <div style={styles.section}>
                                <label style={styles.checkboxLabel}>
                                    <input type="checkbox" checked={isReadOnly} onChange={handleReadOnlyChange} />
                                    <FaBroadcastTower color="#faa61a" size={16} />
                                    <span>📢 Duyuru Kanalı (Sadece Admin Yazar)</span>
                                </label>
                                <p style={{ fontSize: '0.875em', color: '#949ba4', marginTop: '8px', marginLeft: '28px', fontStyle: 'italic' }}>
                                    Herkes okuyabilir, sadece adminler yazabilir.
                                </p>
                            </div>

                            {/* 🔥 VOICE SETTINGS */}
                            {isVoiceChannel && (
                                <>
                                    <div style={styles.section}>
                                        <label style={{ ...styles.label, display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <FaUserFriends size={14} /> Kullanıcı Limiti
                                        </label>
                                        <input
                                            type="number" min="0" max="99" value={userLimit}
                                            onChange={handleUserLimitChange}
                                            style={styles.input} placeholder="0 = Sınırsız"
                                        />
                                        <p style={{ fontSize: '0.875em', color: '#949ba4', marginTop: '8px', fontStyle: 'italic' }}>
                                            Max kişi sayısı (0 = limitsiz)
                                        </p>
                                    </div>

                                    <div style={styles.section}>
                                        <label style={{ ...styles.label, display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <FaClock size={14} /> Ses Kalitesi (Bitrate)
                                        </label>
                                        <select value={bitrate} onChange={e => setBitrate(parseInt(e.target.value))} style={styles.input}>
                                            <option value={8}>8 kbps (Düşük)</option>
                                            <option value={32}>32 kbps</option>
                                            <option value={64}>64 kbps (Normal)</option>
                                            <option value={96}>96 kbps (İyi)</option>
                                            <option value={128}>128 kbps (Yüksek)</option>
                                            <option value={256}>256 kbps (Çok Yüksek)</option>
                                            <option value={384}>384 kbps (Maksimum)</option>
                                        </select>
                                        <p style={{ fontSize: '0.85em', color: '#949ba4', marginTop: '6px', fontStyle: 'italic' }}>
                                            Yüksek bitrate = daha iyi ses
                                        </p>
                                    </div>
                                </>
                            )}

                            <div style={styles.footer}>
                                <button onClick={handleDelete} style={styles.deleteBtn}><FaTrash /> Kanalı Sil</button>
                                <button onClick={handleSave} style={styles.saveBtn}><FaSave /> Kaydet</button>
                            </div>
                        </>
                    )}

                    {/* İZİNLER TAB */}
                    {activeTab === 'permissions' && (
                        <>
                            <div style={styles.permissionsHeader}>
                                <h4 style={{ margin: 0, color: '#fff' }}>
                                    <FaUserShield /> Kanal İzinleri
                                </h4>
                                <button onClick={() => setShowAddPermission(true)} style={styles.addPermBtn}>
                                    <FaPlus /> İzin Ekle
                                </button>
                            </div>

                            {/* Rol İzinleri */}
                            {permissions.role_permissions?.length > 0 && (
                                <div style={styles.permSection}>
                                    <h5 style={{ color: '#b9bbbe', fontSize: '0.9em', marginBottom: '10px' }}>ROL İZİNLERİ</h5>
                                    {permissions.role_permissions.map(perm => (
                                        <div key={perm.id} style={styles.permissionItem}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: perm.role_color }}></div>
                                                <span style={{ fontWeight: 'bold' }}>{perm.role_name}</span>
                                            </div>
                                            <div style={{ fontSize: '0.85em', color: '#949ba4', marginTop: '5px' }}>
                                                {perm.can_view && '👁 Görüntüle '}
                                                {perm.can_send_messages && '✏️ Mesaj '}
                                                {perm.can_connect && '🎤 Bağlan '}
                                                {perm.can_speak && '🔊 Konuş '}
                                            </div>
                                            <button onClick={() => removePermission(perm.id)} style={styles.removeBtn}>Kaldır</button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Kullanıcı İzinleri */}
                            {permissions.user_permissions?.length > 0 && (
                                <div style={styles.permSection}>
                                    <h5 style={{ color: '#b9bbbe', fontSize: '0.9em', marginBottom: '10px' }}>KULLANICI İZİNLERİ</h5>
                                    {permissions.user_permissions.map(perm => (
                                        <div key={perm.id} style={styles.permissionItem}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <img
                                                    src={perm.avatar || '/default-avatar.png'}
                                                    alt={perm.username}
                                                    style={{ width: 24, height: 24, borderRadius: '50%' }}
                                                />
                                                <span>{perm.username}</span>
                                            </div>
                                            <div style={{ fontSize: '0.85em', color: '#949ba4', marginTop: '5px' }}>
                                                {perm.can_view && '👁 Görüntüle '}
                                                {perm.can_send_messages && '✏️ Mesaj '}
                                                {perm.can_connect && '🎤 Bağlan '}
                                            </div>
                                            <button onClick={() => removePermission(perm.id)} style={styles.removeBtn}>Kaldır</button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {permissions.role_permissions?.length === 0 && permissions.user_permissions?.length === 0 && (
                                <div style={{ textAlign: 'center', padding: '40px', color: '#949ba4' }}>
                                    <FaLock size={40} style={{ opacity: 0.3, marginBottom: '10px' }} />
                                    <p>Henüz özel izin tanımlanmamış</p>
                                    <p style={{ fontSize: '0.85em' }}>Belirli roller veya kullanıcılara özel izinler tanımlayabilirsiniz</p>
                                </div>
                            )}

                            {/* İzin Ekleme Modalı */}
                            {showAddPermission && (
                                <div style={styles.addPermModal}>
                                    <h5 style={{ color: '#fff', marginBottom: '15px' }}>İzin Ekle</h5>

                                    <div style={{ marginBottom: '15px' }}>
                                        <label style={{ color: '#b9bbbe', fontSize: '0.9em' }}>İzin Türü</label>
                                        <select
                                            value={permissionType}
                                            onChange={e => setPermissionType(e.target.value)}
                                            style={styles.input}
                                        >
                                            <option value="role">Rol</option>
                                            <option value="user">Kullanıcı</option>
                                        </select>
                                    </div>

                                    {permissionType === 'role' && (
                                        <div style={{ marginBottom: '15px' }}>
                                            <label style={{ color: '#b9bbbe', fontSize: '0.9em' }}>Rol Seç</label>
                                            <select
                                                value={selectedRoleForPerm || ''}
                                                onChange={e => setSelectedRoleForPerm(e.target.value)}
                                                style={styles.input}
                                            >
                                                <option value="">Rol seçin...</option>
                                                {permissions.available_roles?.map(role => (
                                                    <option key={role.id} value={role.id}>{role.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}

                                    {permissionType === 'user' && (
                                        <div style={{ marginBottom: '15px' }}>
                                            <label style={{ color: '#b9bbbe', fontSize: '0.9em' }}>Kullanıcı Ara</label>
                                            <input
                                                type="text"
                                                placeholder="Kullanıcı adı yazın... (min 2 karakter)"
                                                value={searchUser}
                                                onChange={e => {
                                                    setSearchUser(e.target.value);
                                                    searchUsers(e.target.value); // 🔥 YENİ: Otomatik arama
                                                }}
                                                style={styles.input}
                                            />

                                            {/* 🔥 YENİ: Arama Sonuçları */}
                                            {searchResults.length > 0 && (
                                                <div style={{
                                                    background: '#1e1f22',
                                                    borderRadius: '6px',
                                                    marginTop: '8px',
                                                    maxHeight: '200px',
                                                    overflowY: 'auto',
                                                    border: '1px solid #4e5058'
                                                }}>
                                                    {searchResults.map(user => (
                                                        <div
                                                            key={user.id}
                                                            onClick={() => {
                                                                setSelectedUserForPerm(user.id);
                                                                setSearchUser(user.username);
                                                                setSearchResults([]);
                                                            }}
                                                            style={{
                                                                padding: '10px 12px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '10px',
                                                                cursor: 'pointer',
                                                                borderBottom: '1px solid #2b2d31',
                                                                backgroundColor: selectedUserForPerm === user.id ? '#5865f2' : 'transparent',
                                                                transition: 'background-color 0.2s'
                                                            }}
                                                            onMouseEnter={e => {
                                                                if (selectedUserForPerm !== user.id) {
                                                                    e.currentTarget.style.backgroundColor = '#2b2d31';
                                                                }
                                                            }}
                                                            onMouseLeave={e => {
                                                                if (selectedUserForPerm !== user.id) {
                                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                                }
                                                            }}
                                                        >
                                                            <img
                                                                src={user.avatar || '/default-avatar.png'}
                                                                alt={user.username}
                                                                style={{ width: 24, height: 24, borderRadius: '50%' }}
                                                            />
                                                            <span style={{ color: '#fff', fontSize: '0.95em' }}>{user.username}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {searchUser && searchResults.length === 0 && (
                                                <p style={{ fontSize: '0.8em', color: '#949ba4', marginTop: '5px' }}>
                                                    {searchUser.length < 2
                                                        ? 'En az 2 karakter girin'
                                                        : 'Kullanıcı bulunamadı'
                                                    }
                                                </p>
                                            )}

                                            {selectedUserForPerm && (
                                                <p style={{ fontSize: '0.85em', color: '#43b581', marginTop: '5px' }}>
                                                    ✅ Kullanıcı seçildi: <strong>{searchUser}</strong>
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                        <button onClick={() => {
                                            setShowAddPermission(false);
                                            setSearchUser('');
                                            setSearchResults([]);
                                            setSelectedUserForPerm(null);
                                            setSelectedRoleForPerm(null);
                                        }} style={styles.cancelBtn}>
                                            İptal
                                        </button>
                                        <button onClick={addPermission} style={styles.confirmBtn}>
                                            Ekle
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* 🔗 ENTEGRASYONLAR TAB */}
                    {activeTab === 'integrations' && (
                        <>
                            <div style={styles.integrationHeader}>
                                <h4 style={{ margin: 0, color: '#fff' }}>
                                    <FaLink /> Kanal Entegrasyonları
                                </h4>
                                <p style={{ color: '#72767d', fontSize: '13px', marginTop: '8px' }}>
                                    Webhooklar, botlar ve dış servisler ile entegrasyon ayarları
                                </p>
                            </div>

                            {/* Webhook Bölümü */}
                            <div style={styles.integrationCard}>
                                <div style={styles.integrationCardHeader}>
                                    <div style={styles.integrationIcon}>
                                        <FaRobot style={{ color: '#5865f2', fontSize: '20px' }} />
                                    </div>
                                    <div>
                                        <h5 style={styles.integrationTitle}>Webhook</h5>
                                        <p style={styles.integrationDesc}>Bu kanala mesaj göndermek için webhook URL'i oluşturun</p>
                                    </div>
                                </div>
                                <button
                                    style={styles.integrationBtn}
                                    onClick={async () => {
                                        try {
                                            const res = await fetchWithAuth(`${apiBaseUrl}/webhooks/create/`, {
                                                method: 'POST',
                                                body: JSON.stringify({ room_id: room.id, name: `${room.name} Webhook` })
                                            });
                                            if (res.ok) {
                                                const data = await res.json();
                                                navigator.clipboard.writeText(data.url);
                                                toast.success('Webhook oluşturuldu ve kopyalandı!');
                                            } else {
                                                toast.error('Webhook oluşturulamadı');
                                            }
                                        } catch (e) {
                                            console.error(e);
                                            toast.error('Hata oluştu');
                                        }
                                    }}
                                >
                                    <FaPlus /> Webhook Oluştur
                                </button>
                            </div>

                            {/* Bildirimler */}
                            <div style={styles.integrationCard}>
                                <div style={styles.integrationCardHeader}>
                                    <div style={{ ...styles.integrationIcon, backgroundColor: 'rgba(250, 166, 26, 0.2)' }}>
                                        <FaBell style={{ color: '#faa61a', fontSize: '20px' }} />
                                    </div>
                                    <div>
                                        <h5 style={styles.integrationTitle}>Bildirim Ayarları</h5>
                                        <p style={styles.integrationDesc}>Bu kanal için bildirim tercihlerini yapılandırın</p>
                                    </div>
                                </div>
                                <select
                                    style={{ ...styles.input, maxWidth: '200px' }}
                                    value={notificationPref}
                                    onChange={async (e) => {
                                        const val = e.target.value;
                                        setNotificationPref(val);
                                        try {
                                            await fetchWithAuth(`${apiBaseUrl}/channels/${room.slug}/notification-preference/`, {
                                                method: 'POST',
                                                body: JSON.stringify({ preference: val })
                                            });
                                            toast.success('Bildirim tercihi güncellendi!');
                                        } catch (err) {
                                            console.error('Bildirim tercihi güncellenemedi:', err);
                                            toast.error('Bildirim tercihi güncellenemedi');
                                        }
                                    }}
                                >
                                    <option value="all">Tüm Mesajlar</option>
                                    <option value="mentions">Sadece Mention</option>
                                    <option value="none">Bildirimsiz</option>
                                </select>
                            </div>

                            {/* Kanal Takip */}
                            <div style={styles.integrationCard}>
                                <div style={styles.integrationCardHeader}>
                                    <div style={{ ...styles.integrationIcon, backgroundColor: 'rgba(67, 181, 129, 0.2)' }}>
                                        <FaEye style={{ color: '#43b581', fontSize: '20px' }} />
                                    </div>
                                    <div>
                                        <h5 style={styles.integrationTitle}>Kanal Takibi</h5>
                                        <p style={styles.integrationDesc}>Bu kanalı başka bir sunucuya yansıtın (mirror)</p>
                                    </div>
                                </div>
                                <button
                                    style={{ ...styles.integrationBtn, backgroundColor: '#43b581' }}
                                    onClick={async () => {
                                        try {
                                            const res = await fetchWithAuth(`${apiBaseUrl}/channels/${room.slug}/follow-link/`, {
                                                method: 'POST'
                                            });
                                            if (res.ok) {
                                                const data = await res.json();
                                                if (data.url) {
                                                    navigator.clipboard.writeText(data.url);
                                                    toast.success('Takip linki oluşturuldu ve kopyalandı!');
                                                } else {
                                                    toast.success('Kanal takibi aktif edildi!');
                                                }
                                            } else {
                                                toast.error('Takip linki oluşturulamadı');
                                            }
                                        } catch (err) {
                                            console.error('Takip linki hatası:', err);
                                            toast.error('Hata oluştu');
                                        }
                                    }}
                                >
                                    <FaLink /> Takip Linki Oluştur
                                </button>
                            </div>
                        </>
                    )}

                    {/* ⚙️ GELİŞMİŞ AYARLAR TAB */}
                    {activeTab === 'advanced' && (
                        <>
                            <div style={styles.integrationHeader}>
                                <h4 style={{ margin: 0, color: '#fff' }}>
                                    <FaHistory /> Gelişmiş Ayarlar
                                </h4>
                                <p style={{ color: '#72767d', fontSize: '13px', marginTop: '8px' }}>
                                    Kanal geçmişi, arşiv ve tehlikeli işlemler
                                </p>
                            </div>

                            {/* Mesaj Geçmişi */}
                            <div style={styles.advancedSection}>
                                <h5 style={styles.advancedSectionTitle}>
                                    <FaHistory /> Mesaj Geçmişi
                                </h5>
                                <div style={styles.advancedOption}>
                                    <div>
                                        <p style={styles.advancedOptionTitle}>Mesaj Geçmişini Sil</p>
                                        <p style={styles.advancedOptionDesc}>Son X günün mesajlarını toplu olarak sil</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <select
                                            style={{ ...styles.input, width: '100px' }}
                                            value={deleteHistoryDays}
                                            onChange={(e) => setDeleteHistoryDays(e.target.value)}
                                        >
                                            <option value="1">1 Gün</option>
                                            <option value="7">7 Gün</option>
                                            <option value="30">30 Gün</option>
                                            <option value="all">Tümü</option>
                                        </select>
                                        <button
                                            style={styles.dangerBtnSmall}
                                            onClick={async () => {
                                                if (!window.confirm(`Son ${deleteHistoryDays === 'all' ? 'tüm' : deleteHistoryDays + ' günlük'} mesajları silmek istediğinize emin misiniz? Bu işlem geri alınamaz!`)) return;
                                                try {
                                                    const res = await fetchWithAuth(`${apiBaseUrl}/rooms/${room.slug}/clear-history/`, {
                                                        method: 'POST',
                                                        body: JSON.stringify({ days: deleteHistoryDays })
                                                    });
                                                    if (res.ok) {
                                                        toast.success('Mesaj geçmişi silindi!');
                                                    } else {
                                                        toast.error('Mesaj geçmişi silinemedi');
                                                    }
                                                } catch (err) {
                                                    console.error('Mesaj geçmişi silme hatası:', err);
                                                    toast.error('Hata oluştu');
                                                }
                                            }}
                                        >Sil</button>
                                    </div>
                                </div>
                            </div>

                            {/* Slow Mode Detaylı */}
                            <div style={styles.advancedSection}>
                                <h5 style={styles.advancedSectionTitle}>
                                    <FaClock /> Slow Mode
                                </h5>
                                <div style={styles.advancedOption}>
                                    <div>
                                        <p style={styles.advancedOptionTitle}>Mesaj Bekleme Süresi</p>
                                        <p style={styles.advancedOptionDesc}>Kullanıcılar arasındaki minimum bekleme süresi</p>
                                    </div>
                                    <select
                                        style={{ ...styles.input, width: '150px' }}
                                        onChange={async (e) => {
                                            await updateChannelRestriction({ slow_mode_seconds: parseInt(e.target.value) });
                                            toast.success('Slow mode güncellendi!');
                                        }}
                                    >
                                        <option value="0">Kapalı</option>
                                        <option value="5">5 Saniye</option>
                                        <option value="10">10 Saniye</option>
                                        <option value="30">30 Saniye</option>
                                        <option value="60">1 Dakika</option>
                                        <option value="300">5 Dakika</option>
                                        <option value="900">15 Dakika</option>
                                        <option value="3600">1 Saat</option>
                                    </select>
                                </div>
                            </div>

                            {/* İstatistikler */}
                            <div style={styles.advancedSection}>
                                <h5 style={styles.advancedSectionTitle}>
                                    <FaChartLine /> Kanal İstatistikleri
                                </h5>
                                <div style={styles.statsGrid}>
                                    <div style={styles.statBox}>
                                        <span style={styles.statValue}>{room.message_count || 0}</span>
                                        <span style={styles.statLabel}>Toplam Mesaj</span>
                                    </div>
                                    <div style={styles.statBox}>
                                        <span style={styles.statValue}>{room.member_count || serverRoles?.length || 0}</span>
                                        <span style={styles.statLabel}>Erişebilen Üye</span>
                                    </div>
                                    <div style={styles.statBox}>
                                        <span style={styles.statValue}>{room.file_count || 0}</span>
                                        <span style={styles.statLabel}>Paylaşılan Dosya</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tehlikeli Bölge */}
                            <div style={styles.dangerZone}>
                                <h5 style={styles.dangerZoneTitle}>
                                    <FaExclamationTriangle /> Tehlikeli Bölge
                                </h5>
                                <div style={styles.advancedOption}>
                                    <div>
                                        <p style={styles.advancedOptionTitle}>Kanalı Sil</p>
                                        <p style={styles.advancedOptionDesc}>Bu işlem geri alınamaz! Tüm mesajlar silinir.</p>
                                    </div>
                                    <button onClick={handleDelete} style={styles.dangerBtnLarge}>
                                        <FaTrash /> Kanalı Sil
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );

    // 🔥 Portal ile document.body'ye render et (positioning sorununu çözer)
    return ReactDOM.createPortal(modalContent, document.body);
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        padding: '20px',       // 🔥 Kenarlardan boşluk
        overflow: 'auto'       // 🔥 Scroll için
    },
    modal: {
        background: '#313338',
        width: '960px',
        maxWidth: '100%',
        borderRadius: '8px',
        overflow: 'hidden',
        maxHeight: 'calc(100vh - 40px)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '600px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
        position: 'relative',
        alignSelf: 'center'    // 🔥 YENİ: Flex child olarak kendini merkezle
    },
    header: {
        padding: '24px 28px',  // 🔥 Daha geniş padding: 20px → 24px 28px
        borderBottom: '1px solid #1e1f22',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
        flexShrink: 0
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: '#bbb',
        cursor: 'pointer',
        fontSize: '1.4em',     // 🔥 Daha büyük kapatma butonu: 1.2em → 1.4em
        transition: 'color 0.2s',
        padding: '8px'
    },
    tabs: {
        display: 'flex',
        borderBottom: '1px solid #1e1f22',
        background: '#2b2d31',
        flexShrink: 0
    },
    tab: {
        flex: 1,
        padding: '14px 20px',  // 🔥 Daha geniş tab padding
        background: 'transparent',
        border: 'none',
        color: '#949ba4',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',           // 🔥 Gap artırıldı: 8px → 10px
        fontSize: '1em',       // 🔥 Daha büyük font: 0.95em → 1em
        transition: 'all 0.2s',
        borderBottom: '2px solid transparent'
    },
    tabActive: {
        flex: 1,
        padding: '14px 20px',  // 🔥 Daha geniş tab padding
        background: 'transparent',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',           // 🔥 Gap artırıldı: 8px → 10px
        fontSize: '1em',       // 🔥 Daha büyük font: 0.95em → 1em
        fontWeight: 'bold',
        borderBottom: '2px solid #5865f2'
    },
    body: {
        padding: '28px 32px',  // 🔥 ÇOK DAHA GENİŞ PADDING: 20px → 28px 32px
        overflowY: 'auto',
        flex: 1
    },
    section: {
        marginBottom: '24px',   // 🔥 Daha fazla boşluk: 20px → 24px
        color: '#dbdee1',
        fontSize: '1em'         // 🔥 YENİ: Font boyutu belirtildi
    },
    input: {
        width: '100%',
        padding: '12px 14px',   // 🔥 Daha geniş padding: 10px → 12px 14px
        background: '#1e1f22',
        border: '1px solid #1e1f22',
        color: 'white',
        borderRadius: '6px',    // 🔥 Daha yuvarlatılmış: 4px → 6px
        marginTop: '8px',       // 🔥 Daha fazla boşluk: 5px → 8px
        boxSizing: 'border-box',
        fontSize: '0.95em',     // 🔥 YENİ: Okunabilir font boyutu
        transition: 'border-color 0.2s'
    },
    rolesList: {
        maxHeight: '250px',     // 🔥 Daha yüksek: 200px → 250px
        overflowY: 'auto',
        background: '#2b2d31',
        padding: '12px',        // 🔥 Daha geniş padding: 10px → 12px
        borderRadius: '6px',    // 🔥 Daha yuvarlatılmış: 4px → 6px
        marginTop: '12px'       // 🔥 Daha fazla boşluk: 10px → 12px
    },
    roleItem: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 12px',   // 🔥 Daha geniş padding: 8px → 10px 12px
        cursor: 'pointer',
        borderBottom: '1px solid #333',
        color: 'white',
        alignItems: 'center',
        fontSize: '0.95em',     // 🔥 YENİ: Okunabilir font boyutu
        borderRadius: '4px',    // 🔥 YENİ: Hover için yuvarlatılmış köşeler
        transition: 'background-color 0.2s'
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '28px',      // 🔥 Daha fazla boşluk: 20px → 28px
        paddingTop: '20px',     // 🔥 YENİ: Üstten padding
        borderTop: '1px solid #1e1f22'  // 🔥 YENİ: Üstte ayırıcı çizgi
    },
    saveBtn: {
        background: '#23a559',
        color: 'white',
        border: 'none',
        padding: '12px 24px',   // 🔥 Daha büyük buton: 10px 20px → 12px 24px
        borderRadius: '6px',    // 🔥 Daha yuvarlatılmış: 4px → 6px
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 8,                 // 🔥 Daha fazla gap: 5 → 8
        fontWeight: 'bold',
        fontSize: '0.95em',     // 🔥 YENİ: Font boyutu
        transition: 'background-color 0.2s'
    },
    deleteBtn: {
        background: 'transparent',
        color: '#da373c',
        border: '1px solid #da373c',
        padding: '12px 24px',   // 🔥 Daha büyük buton: 10px 20px → 12px 24px
        borderRadius: '6px',    // 🔥 Daha yuvarlatılmış: 4px → 6px
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 8,                 // 🔥 Daha fazla gap: 5 → 8
        fontSize: '0.95em',     // 🔥 YENİ: Font boyutu
        transition: 'all 0.2s'
    },
    permissionsHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        paddingBottom: '10px',
        borderBottom: '1px solid #1e1f22'
    },
    addPermBtn: {
        background: '#5865f2',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        fontSize: '0.9em',
        fontWeight: 'bold'
    },
    permSection: {
        marginBottom: '20px'
    },
    permissionItem: {
        background: '#2b2d31',
        padding: '12px',
        borderRadius: '6px',
        marginBottom: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        position: 'relative'
    },
    removeBtn: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: '#da373c',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.8em'
    },
    addPermModal: {
        background: '#2b2d31',
        padding: '20px',
        borderRadius: '8px',
        marginTop: '20px',
        border: '2px solid #5865f2'
    },
    cancelBtn: {
        background: 'transparent',
        color: '#b9bbbe',
        border: '1px solid #4e5058',
        padding: '10px 20px',       // 🔥 Daha büyük: 8px 16px → 10px 20px
        borderRadius: '6px',        // 🔥 Daha yuvarlatılmış: 4px → 6px
        cursor: 'pointer',
        fontSize: '0.95em',         // 🔥 Daha büyük font: 0.9em → 0.95em
        transition: 'all 0.2s'
    },
    confirmBtn: {
        background: '#5865f2',
        color: 'white',
        border: 'none',
        padding: '10px 20px',       // 🔥 Daha büyük: 8px 16px → 10px 20px
        borderRadius: '6px',        // 🔥 Daha yuvarlatılmış: 4px → 6px
        cursor: 'pointer',
        fontSize: '0.95em',         // 🔥 Daha büyük font: 0.9em → 0.95em
        fontWeight: 'bold',
        transition: 'background-color 0.2s'
    },
    label: {
        color: '#b5bac1',           // 🔥 YENİ: Label rengi
        fontSize: '0.875em',        // 🔥 YENİ: Label font boyutu
        fontWeight: '600',          // 🔥 YENİ: Kalın font
        textTransform: 'uppercase', // 🔥 YENİ: Büyük harf
        marginBottom: '8px',        // 🔥 YENİ: Alt boşluk
        display: 'block',           // 🔥 YENİ: Block element
        letterSpacing: '0.5px'      // 🔥 YENİ: Harf aralığı
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,                    // 🔥 Daha fazla gap: 10 → 12
        cursor: 'pointer',
        fontSize: '0.95em',         // 🔥 YENİ: Font boyutu
        padding: '8px 0'            // 🔥 YENİ: Dikey padding
    },
    // 🔗 ENTEGRASYONLAR TAB STİLLERİ
    integrationHeader: {
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '1px solid #1e1f22'
    },
    integrationCard: {
        background: '#2b2d31',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #3f4147',
        transition: 'border-color 0.2s'
    },
    integrationCardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
    },
    integrationIcon: {
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        background: 'rgba(88, 101, 242, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    integrationTitle: {
        color: '#fff',
        fontSize: '1em',
        fontWeight: 'bold',
        margin: 0
    },
    integrationDesc: {
        color: '#72767d',
        fontSize: '0.85em',
        margin: '4px 0 0 0'
    },
    integrationBtn: {
        background: '#5865f2',
        color: 'white',
        border: 'none',
        padding: '10px 18px',
        borderRadius: '6px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.9em',
        fontWeight: 'bold',
        transition: 'background-color 0.2s'
    },
    // ⚙️ GELİŞMİŞ TAB STİLLERİ
    advancedSection: {
        background: '#2b2d31',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '16px',
        border: '1px solid #3f4147'
    },
    advancedSectionTitle: {
        color: '#fff',
        fontSize: '1em',
        fontWeight: 'bold',
        margin: '0 0 16px 0',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    advancedOption: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 0',
        borderTop: '1px solid #3f4147'
    },
    advancedOptionTitle: {
        color: '#dbdee1',
        fontSize: '0.95em',
        fontWeight: '500',
        margin: 0
    },
    advancedOptionDesc: {
        color: '#72767d',
        fontSize: '0.8em',
        margin: '4px 0 0 0'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px'
    },
    statBox: {
        background: '#1e1f22',
        borderRadius: '8px',
        padding: '16px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    statValue: {
        color: '#5865f2',
        fontSize: '1.5em',
        fontWeight: 'bold'
    },
    statLabel: {
        color: '#72767d',
        fontSize: '0.8em'
    },
    dangerZone: {
        background: 'rgba(237, 66, 69, 0.1)',
        borderRadius: '12px',
        padding: '20px',
        marginTop: '24px',
        border: '1px solid rgba(237, 66, 69, 0.3)'
    },
    dangerZoneTitle: {
        color: '#ed4245',
        fontSize: '1em',
        fontWeight: 'bold',
        margin: '0 0 16px 0',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    dangerBtnSmall: {
        background: '#ed4245',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.85em',
        fontWeight: 'bold'
    },
    dangerBtnLarge: {
        background: '#ed4245',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '6px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.9em',
        fontWeight: 'bold',
        transition: 'background-color 0.2s'
    }
};

export default ChannelSettingsModal;

