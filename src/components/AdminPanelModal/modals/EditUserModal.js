import React from 'react';
import { FaEdit, FaTimes } from 'react-icons/fa';
import styles from '../styles';

const EditUserModal = ({
    editUserForm,
    editUserLoading,
    editUserModal,
    handleUpdateUser,
    setEditUserForm,
    setEditUserModal
}) => {
    return (
        <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex',
                                justifyContent: 'center', alignItems: 'center', zIndex: 15
                            }} onClick={() => setEditUserModal(null)}>
                                <div style={{
                                    backgroundColor: '#1a1a1e', borderRadius: '12px',
                                    padding: '24px', width: '600px', maxHeight: '85vh', overflowY: 'auto',
                                    border: '1px solid #2a2a2e'
                                }} onClick={e => e.stopPropagation()}>
                                    {/* Header */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                                        <div style={{
                                            width: '48px', height: '48px', borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #f0b132, #e67e22)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: '#fff', fontWeight: '700', fontSize: '20px'
                                        }}>
                                            <FaEdit />
                                        </div>
                                        <div>
                                            <h3 style={{ color: '#fff', margin: 0, fontSize: '18px' }}>✏️ Kullanıcı Düzenle</h3>
                                            <div style={{ color: '#6b7280', fontSize: '12px' }}>ID: {editUserModal.id} | {editUserModal.username}</div>
                                        </div>
                                        <button onClick={() => setEditUserModal(null)} style={{ ...styles.actionBtn('#e74c3c'), marginLeft: 'auto', padding: '8px 12px' }}>
                                            <FaTimes />
                                        </button>
                                    </div>

                                    {/* Form */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                                        {/* Username */}
                                        <div>
                                            <label style={{ color: '#9ca3af', fontSize: '11px', display: 'block', marginBottom: '4px' }}>👤 Kullanıcı Adı</label>
                                            <input
                                                type="text"
                                                value={editUserForm.username || ''}
                                                onChange={(e) => setEditUserForm(f => ({ ...f, username: e.target.value }))}
                                                style={styles.searchInput}
                                            />
                                        </div>
                                        {/* Email */}
                                        <div>
                                            <label style={{ color: '#9ca3af', fontSize: '11px', display: 'block', marginBottom: '4px' }}>📧 Email</label>
                                            <input
                                                type="email"
                                                value={editUserForm.email || ''}
                                                onChange={(e) => setEditUserForm(f => ({ ...f, email: e.target.value }))}
                                                style={styles.searchInput}
                                            />
                                        </div>
                                        {/* Coins */}
                                        <div>
                                            <label style={{ color: '#9ca3af', fontSize: '11px', display: 'block', marginBottom: '4px' }}>💰 Coin</label>
                                            <input
                                                type="number"
                                                value={editUserForm.coins || 0}
                                                onChange={(e) => setEditUserForm(f => ({ ...f, coins: parseInt(e.target.value) || 0 }))}
                                                style={styles.searchInput}
                                            />
                                        </div>
                                        {/* Level */}
                                        <div>
                                            <label style={{ color: '#9ca3af', fontSize: '11px', display: 'block', marginBottom: '4px' }}>⭐ Seviye</label>
                                            <input
                                                type="number"
                                                value={editUserForm.level || 1}
                                                onChange={(e) => setEditUserForm(f => ({ ...f, level: parseInt(e.target.value) || 1 }))}
                                                style={styles.searchInput}
                                            />
                                        </div>
                                        {/* XP */}
                                        <div>
                                            <label style={{ color: '#9ca3af', fontSize: '11px', display: 'block', marginBottom: '4px' }}>🎮 XP</label>
                                            <input
                                                type="number"
                                                value={editUserForm.xp || 0}
                                                onChange={(e) => setEditUserForm(f => ({ ...f, xp: parseInt(e.target.value) || 0 }))}
                                                style={styles.searchInput}
                                            />
                                        </div>
                                        {/* Role */}
                                        <div>
                                            <label style={{ color: '#9ca3af', fontSize: '11px', display: 'block', marginBottom: '4px' }}>🎭 Rol</label>
                                            <select
                                                value={editUserForm.role || 'member'}
                                                onChange={(e) => setEditUserForm(f => ({ ...f, role: e.target.value }))}
                                                style={styles.searchInput}
                                            >
                                                <option value="member">Üye</option>
                                                <option value="admin">Yönetici</option>
                                            </select>
                                        </div>
                                        {/* Status Message */}
                                        <div style={{ gridColumn: '1 / -1' }}>
                                            <label style={{ color: '#9ca3af', fontSize: '11px', display: 'block', marginBottom: '4px' }}>📝 Durum Mesajı</label>
                                            <input
                                                type="text"
                                                value={editUserForm.status_message || ''}
                                                onChange={(e) => setEditUserForm(f => ({ ...f, status_message: e.target.value }))}
                                                style={styles.searchInput}
                                                placeholder="Durum mesajı..."
                                            />
                                        </div>
                                    </div>

                                    {/* Toggles */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: '16px' }}>
                                        {[
                                            { key: 'is_active', label: '✅ Aktif', color: '#23a559' },
                                            { key: 'is_staff', label: '👑 Admin', color: '#e74c3c' },
                                            { key: 'is_premium', label: '⭐ Premium', color: '#ffd700' },
                                            { key: 'email_verified', label: '📧 Doğrulanmış', color: '#5865f2' },
                                        ].map((toggle) => (
                                            <div
                                                key={toggle.key}
                                                onClick={() => setEditUserForm(f => ({ ...f, [toggle.key]: !f[toggle.key] }))}
                                                style={{
                                                    padding: '10px', borderRadius: '8px', cursor: 'pointer', textAlign: 'center',
                                                    backgroundColor: editUserForm[toggle.key] ? `${toggle.color}20` : '#2a2a2e',
                                                    border: `1px solid ${editUserForm[toggle.key] ? toggle.color : '#3a3a3e'}`,
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                <div style={{ fontSize: '12px', fontWeight: '600', color: editUserForm[toggle.key] ? toggle.color : '#6b7280' }}>
                                                    {toggle.label}
                                                </div>
                                                <div style={{ fontSize: '10px', color: editUserForm[toggle.key] ? '#fff' : '#6b7280', marginTop: '2px' }}>
                                                    {editUserForm[toggle.key] ? 'Açık' : 'Kapalı'}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Buttons */}
                                    <div style={{ display: 'flex', gap: '8px', marginTop: '20px', justifyContent: 'flex-end' }}>
                                        <button style={{ ...styles.actionBtn('#6b7280'), padding: '10px 20px' }} onClick={() => setEditUserModal(null)}>
                                            İptal
                                        </button>
                                        <button
                                            style={{ ...styles.actionBtn('#23a559'), padding: '10px 20px', opacity: editUserLoading ? 0.6 : 1 }}
                                            onClick={handleUpdateUser}
                                            disabled={editUserLoading}
                                        >
                                            {editUserLoading ? '⏳ Kaydediliyor...' : '💾 Kaydet'}
                                        </button>
                                    </div>
                                </div>
                            </div>
    );
};

export default EditUserModal;
