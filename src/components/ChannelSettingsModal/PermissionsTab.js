// frontend/src/components/ChannelSettingsModal/PermissionsTab.js

import { FaUserShield, FaPlus, FaLock } from 'react-icons/fa';
import styles from './styles';

const PermissionsTab = ({
    permissions,
    showAddPermission, setShowAddPermission,
    permissionType, setPermissionType,
    selectedRoleForPerm, setSelectedRoleForPerm,
    selectedUserForPerm, setSelectedUserForPerm,
    searchUser, setSearchUser,
    searchResults, setSearchResults,
    searchUsers,
    removePermission,
    addPermission
}) => {
    return (
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
                    <h5 style={{ color: '#b5bac1', fontSize: '0.9em', marginBottom: '10px' }}>ROL İZİNLERİ</h5>
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
                    <h5 style={{ color: '#b5bac1', fontSize: '0.9em', marginBottom: '10px' }}>KULLANICI İZİNLERİ</h5>
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
                        <label style={{ color: '#b5bac1', fontSize: '0.9em' }}>İzin Türü</label>
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
                            <label style={{ color: '#b5bac1', fontSize: '0.9em' }}>Rol Seç</label>
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
                            <label style={{ color: '#b5bac1', fontSize: '0.9em' }}>Kullanıcı Ara</label>
                            <input
                                type="text"
                                placeholder="Kullanıcı adı yazın... (min 2 karakter)"
                                value={searchUser}
                                onChange={e => {
                                    setSearchUser(e.target.value);
                                    searchUsers(e.target.value);
                                }}
                                style={styles.input}
                            />

                            {/* Arama Sonuçları */}
                            {searchResults.length > 0 && (
                                <div style={{
                                    background: '#0d0e10',
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
                                                borderBottom: '1px solid #0e1222',
                                                backgroundColor: selectedUserForPerm === user.id ? '#5865f2' : 'transparent',
                                                transition: 'background-color 0.2s'
                                            }}
                                            onMouseEnter={e => {
                                                if (selectedUserForPerm !== user.id) {
                                                    e.currentTarget.style.backgroundColor = '#111214';
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
                                <p style={{ fontSize: '0.85em', color: '#23a559', marginTop: '5px' }}>
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
    );
};

export default PermissionsTab;
