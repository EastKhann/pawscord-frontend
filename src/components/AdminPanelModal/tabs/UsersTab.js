import React from 'react';
import { FaBan, FaCheckCircle, FaEdit, FaEye, FaFileExport, FaKey, FaSearch, FaTrash } from 'react-icons/fa';
import styles from '../styles';

const UsersTab = ({
    currentPage,
    fetchUsers,
    filterStatus,
    handleUserAction,
    openEditUserModal,
    searchQuery,
    setActionModal,
    setCurrentPage,
    setFilterStatus,
    setPasswordResetModal,
    setSearchQuery,
    setSelectedUser,
    setSortField,
    sortField,
    totalPages,
    users
}) => {
    return (
        <div>
                    <h2 style={{ color: '#fff', marginBottom: '16px', fontSize: '18px' }}>👥 Kullanıcı Yönetimi</h2>

                    {/* Search & Filters */}
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                        <input
                            type="text"
                            placeholder="Kullanıcı ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ ...styles.searchInput, maxWidth: '300px' }}
                        />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            style={{ ...styles.searchInput, maxWidth: '150px' }}
                        >
                            <option value="all">Tümü</option>
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                            <option value="premium">Premium</option>
                            <option value="banned">Yasaklı</option>
                        </select>
                        <select
                            value={sortField}
                            onChange={(e) => setSortField(e.target.value)}
                            style={{ ...styles.searchInput, maxWidth: '150px' }}
                        >
                            <option value="created">Kayıt Tarihi</option>
                            <option value="username">Kullanıcı Adı</option>
                            <option value="message_count">Mesaj Sayısı</option>
                        </select>
                        <button onClick={fetchUsers} style={styles.actionBtn('#5865f2')}>
                            <FaSearch /> Ara
                        </button>
                        <button style={styles.actionBtn('#23a559')}>
                            <FaFileExport /> Export
                        </button>
                    </div>

                    {/* Table */}
                    <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #2a2a2e' }}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Kullanıcı</th>
                                    <th style={styles.th}>Arkadaşlık Kodu</th>
                                    <th style={styles.th}>Seviye / XP</th>
                                    <th style={styles.th}>Coin</th>
                                    <th style={styles.th}>Mesaj</th>
                                    <th style={styles.th}>Sunucu</th>
                                    <th style={styles.th}>Arkadaş</th>
                                    <th style={styles.th}>Durum</th>
                                    <th style={styles.th}>Tip</th>
                                    <th style={styles.th}>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id} style={{ backgroundColor: user.is_admin ? '#1a1a2e20' : 'transparent' }}>
                                        <td style={styles.td}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{
                                                    width: '32px', height: '32px', borderRadius: '50%',
                                                    background: `linear-gradient(135deg, hsl(${user.id * 40}, 70%, 50%), hsl(${user.id * 40 + 30}, 70%, 40%))`,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    color: '#fff', fontWeight: '600', fontSize: '12px'
                                                }}>
                                                    {user.username?.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: '600', fontSize: '13px' }}>{user.username}</div>
                                                    <div style={{ fontSize: '10px', color: '#6b7280' }}>{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ ...styles.td, fontFamily: 'monospace', fontWeight: '600', color: '#5865f2' }}>
                                            #{user.friend_code || 'N/A'}
                                        </td>
                                        <td style={styles.td}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <span style={{ ...styles.badge('#23a559'), minWidth: '45px' }}>Lv.{user.level || 1}</span>
                                                <span style={{ fontSize: '11px', color: '#a3a3a3' }}>{(user.xp || 0).toLocaleString()} XP</span>
                                            </div>
                                        </td>
                                        <td style={{ ...styles.td, color: '#ffd700', fontWeight: '600' }}>
                                            🪙 {(user.coins || 0).toLocaleString()}
                                        </td>
                                        <td style={styles.td}>
                                            💬 {(user.total_messages || 0).toLocaleString()}
                                        </td>
                                        <td style={styles.td}>
                                            🏠 {user.servers_joined || 0}
                                        </td>
                                        <td style={styles.td}>
                                            👥 {user.friends_count || 0}
                                        </td>
                                        <td style={styles.td}>
                                            <span style={styles.badge(
                                                user.status === 'online' ? '#23a559' :
                                                    user.status === 'idle' ? '#f0b132' :
                                                        user.status === 'dnd' ? '#e74c3c' : '#6b7280'
                                            )}>
                                                {user.status === 'online' ? '🟢' : user.status === 'idle' ? '🌙' : user.status === 'dnd' ? '⛔' : '⚫'}
                                            </span>
                                        </td>
                                        <td style={styles.td}>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                                {user.is_staff && <span style={styles.badge('#e74c3c')}>👑</span>}
                                                {user.is_premium && <span style={styles.badge('#ffd700')}>⭐</span>}
                                                {user.is_whitelisted && <span style={styles.badge('#9b59b6')}>💎</span>}
                                                {user.has_spotify && <span style={styles.badge('#1db954')}>🎵</span>}
                                                {!user.is_staff && !user.is_premium && !user.is_whitelisted && <span style={styles.badge('#6b7280')}>Free</span>}
                                            </div>
                                        </td>
                                        <td style={styles.td}>
                                            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                                <button style={styles.actionBtn('#5865f2')} onClick={() => setSelectedUser(user)} title="Görüntüle">
                                                    <FaEye />
                                                </button>
                                                <button style={styles.actionBtn('#f0b132')} onClick={() => openEditUserModal(user)} title="Düzenle">
                                                    <FaEdit />
                                                </button>
                                                <button style={styles.actionBtn('#f59e0b')} onClick={() => setPasswordResetModal(user)} title="Şifre Değiştir">
                                                    <FaKey />
                                                </button>
                                                {user.is_active !== false ? (
                                                    <button style={styles.actionBtn('#e74c3c')} onClick={() => setActionModal({ type: 'ban', user })} title="Yasakla">
                                                        <FaBan />
                                                    </button>
                                                ) : (
                                                    <button style={styles.actionBtn('#23a559')} onClick={() => handleUserAction('unban', user.id)} title="Yasağı Kaldır">
                                                        <FaCheckCircle />
                                                    </button>
                                                )}
                                                <button style={styles.actionBtn('#dc2626')} onClick={() => setActionModal({ type: 'delete', user })} title="Sil">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                            style={{ ...styles.actionBtn('#3d3f44'), opacity: currentPage === 1 ? 0.5 : 1 }}
                        >
                            ◀ Önceki
                        </button>
                        <span style={{ color: '#fff', padding: '6px 12px' }}>
                            Sayfa {currentPage} / {totalPages}
                        </span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => p + 1)}
                            style={{ ...styles.actionBtn('#3d3f44'), opacity: currentPage === totalPages ? 0.5 : 1 }}
                        >
                            Sonraki ▶
                        </button>
                    </div>
                </div>
    );
};

export default UsersTab;
