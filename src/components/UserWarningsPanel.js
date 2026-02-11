// frontend/src/components/UserWarningsPanel.js
import { useState, useEffect } from 'react';
import toast from '../utils/toast';
import { FaExclamationTriangle, FaTimes, FaPlus, FaUser, FaBan, FaHistory, FaSearch, FaTrash } from 'react-icons/fa';
import confirmDialog from '../utils/confirmDialog';

/**
 * ⚠️ User Warnings Panel
 * Manage user warnings (strikes) system with auto-ban on threshold
 */
const UserWarningsPanel = ({ serverId, fetchWithAuth, apiBaseUrl, onClose }) => {
    const [warnings, setWarnings] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showAddWarning, setShowAddWarning] = useState(false);
    const [newWarning, setNewWarning] = useState({
        user_id: '',
        reason: '',
        severity: 'medium', // low, medium, high
        expires_in_days: 30,
        auto_ban_on: 3 // Auto-ban after X warnings
    });
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total_warnings: 0,
        active_warnings: 0,
        expired_warnings: 0,
        auto_banned_users: 0
    });

    useEffect(() => {
        loadWarnings();
        loadUsers();
        loadStats();
    }, [serverId]);

    const loadWarnings = async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/moderation/warnings/${serverId}/`);
            if (res.ok) {
                const data = await res.json();
                setWarnings(data.results || data);
            }
        } catch (error) {
            console.error('Failed to load warnings:', error);
        }
        setLoading(false);
    };

    const loadUsers = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/members/`);
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            }
        } catch (error) {
            console.error('Failed to load users:', error);
        }
    };

    const loadStats = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/moderation/warnings/stats/${serverId}/`);
            if (res.ok) {
                const data = await res.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Failed to load stats:', error);
        }
    };

    const addWarning = async () => {
        if (!newWarning.user_id || !newWarning.reason) {
            toast.error('❌ Please select a user and provide a reason');
            return;
        }

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/moderation/warnings/create/`, {
                method: 'POST',
                body: JSON.stringify({
                    server: serverId,
                    user: newWarning.user_id,
                    reason: newWarning.reason,
                    severity: newWarning.severity,
                    expires_at: new Date(Date.now() + newWarning.expires_in_days * 24 * 60 * 60 * 1000).toISOString(),
                    is_auto: false
                })
            });

            if (res.ok) {
                const data = await res.json();
                
                // Check if auto-ban threshold reached
                if (data.total_warnings >= newWarning.auto_ban_on) {
                    if (await confirmDialog(`User has ${data.total_warnings} warnings. Auto-ban now?`)) {
                        await banUser(newWarning.user_id, `Auto-ban: ${newWarning.auto_ban_on} warnings reached`);
                    }
                }

                loadWarnings();
                loadStats();
                setShowAddWarning(false);
                setNewWarning({
                    user_id: '',
                    reason: '',
                    severity: 'medium',
                    expires_in_days: 30,
                    auto_ban_on: 3
                });
            } else {
                toast.error('❌ Failed to add warning');
            }
        } catch (error) {
            console.error('Failed to add warning:', error);
        }
    };

    const removeWarning = async (warningId) => {
        if (!await confirmDialog('Remove this warning?')) return;

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/moderation/warnings/${warningId}/`, {
                method: 'DELETE'
            });

            if (res.ok) {
                loadWarnings();
                loadStats();
            } else {
                toast.error('❌ Failed to remove warning');
            }
        } catch (error) {
            console.error('Failed to remove warning:', error);
        }
    };

    const banUser = async (userId, reason) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/moderation/ban/`, {
                method: 'POST',
                body: JSON.stringify({
                    server: serverId,
                    user: userId,
                    reason
                })
            });

            if (res.ok) {
                toast.success('✅ User banned successfully');
                loadWarnings();
                loadStats();
            }
        } catch (error) {
            console.error('Failed to ban user:', error);
        }
    };

    const getUserWarnings = (userId) => {
        return warnings.filter(w => w.user === userId && w.is_active);
    };

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'low': return '#43b581';
            case 'medium': return '#f0b132';
            case 'high': return '#ed4245';
            default: return '#72767d';
        }
    };

    const filteredWarnings = warnings.filter(w =>
        !searchTerm ||
        w.user_username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.reason?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Group warnings by user
    const warningsByUser = filteredWarnings.reduce((acc, warning) => {
        if (!acc[warning.user]) {
            acc[warning.user] = {
                user_id: warning.user,
                username: warning.user_username,
                warnings: []
            };
        }
        acc[warning.user].warnings.push(warning);
        return acc;
    }, {});

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.panel} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaExclamationTriangle style={styles.headerIcon} />
                        <h2 style={styles.title}>User Warnings</h2>
                    </div>
                    <div style={styles.headerRight}>
                        <button onClick={() => setShowAddWarning(true)} style={styles.addBtn}>
                            <FaPlus /> Add Warning
                        </button>
                        <button onClick={onClose} style={styles.closeButton}>
                            <FaTimes />
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div style={styles.statsGrid}>
                    <div style={styles.statCard}>
                        <FaExclamationTriangle style={{ ...styles.statIcon, color: '#f0b132' }} />
                        <div style={styles.statValue}>{stats.total_warnings}</div>
                        <div style={styles.statLabel}>Total Warnings</div>
                    </div>
                    <div style={styles.statCard}>
                        <FaExclamationTriangle style={{ ...styles.statIcon, color: '#43b581' }} />
                        <div style={styles.statValue}>{stats.active_warnings}</div>
                        <div style={styles.statLabel}>Active</div>
                    </div>
                    <div style={styles.statCard}>
                        <FaHistory style={{ ...styles.statIcon, color: '#72767d' }} />
                        <div style={styles.statValue}>{stats.expired_warnings}</div>
                        <div style={styles.statLabel}>Expired</div>
                    </div>
                    <div style={styles.statCard}>
                        <FaBan style={{ ...styles.statIcon, color: '#ed4245' }} />
                        <div style={styles.statValue}>{stats.auto_banned_users}</div>
                        <div style={styles.statLabel}>Auto-Banned</div>
                    </div>
                </div>

                {/* Search */}
                <div style={styles.searchBar}>
                    <FaSearch style={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search by username or reason..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.searchInput}
                    />
                </div>

                {/* Warnings List */}
                <div style={styles.warningsList}>
                    {loading ? (
                        <div style={styles.loading}>Loading warnings...</div>
                    ) : Object.keys(warningsByUser).length === 0 ? (
                        <div style={styles.empty}>
                            <FaExclamationTriangle style={styles.emptyIcon} />
                            <p>No warnings found</p>
                        </div>
                    ) : (
                        Object.values(warningsByUser).map(({ user_id, username, warnings: userWarnings }) => {
                            const activeWarnings = userWarnings.filter(w => w.is_active);
                            const isAtRisk = activeWarnings.length >= 2;

                            return (
                                <div key={user_id} style={styles.userCard}>
                                    <div style={styles.userHeader}>
                                        <div style={styles.userInfo}>
                                            <FaUser style={styles.userIcon} />
                                            <div style={styles.userName}>{username}</div>
                                            <span
                                                style={{
                                                    ...styles.badge,
                                                    backgroundColor: isAtRisk ? '#ed4245' : '#f0b132'
                                                }}
                                            >
                                                {activeWarnings.length} Active Warning{activeWarnings.length !== 1 ? 's' : ''}
                                            </span>
                                            {isAtRisk && (
                                                <span style={styles.riskBadge}>⚠️ AT RISK</span>
                                            )}
                                        </div>
                                        {activeWarnings.length >= 3 && (
                                            <button
                                                onClick={() => banUser(user_id, 'Auto-ban: 3 warnings')}
                                                style={styles.banBtn}
                                            >
                                                <FaBan /> Ban User
                                            </button>
                                        )}
                                    </div>
                                    <div style={styles.userWarnings}>
                                        {userWarnings.map((warning) => (
                                            <div
                                                key={warning.id}
                                                style={{
                                                    ...styles.warningItem,
                                                    opacity: warning.is_active ? 1 : 0.5
                                                }}
                                            >
                                                <div style={styles.warningLeft}>
                                                    <div
                                                        style={{
                                                            ...styles.severityDot,
                                                            backgroundColor: getSeverityColor(warning.severity)
                                                        }}
                                                    />
                                                    <div style={styles.warningContent}>
                                                        <div style={styles.warningReason}>{warning.reason}</div>
                                                        <div style={styles.warningMeta}>
                                                            <span>
                                                                {warning.is_auto ? '🤖 Auto' : '👤 Manual'}
                                                            </span>
                                                            <span>•</span>
                                                            <span>
                                                                {new Date(warning.created_at).toLocaleString()}
                                                            </span>
                                                            {warning.expires_at && (
                                                                <>
                                                                    <span>•</span>
                                                                    <span>
                                                                        Expires: {new Date(warning.expires_at).toLocaleDateString()}
                                                                    </span>
                                                                </>
                                                            )}
                                                            {!warning.is_active && (
                                                                <>
                                                                    <span>•</span>
                                                                    <span style={{ color: '#72767d' }}>EXPIRED</span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                {warning.is_active && !warning.is_auto && (
                                                    <button
                                                        onClick={() => removeWarning(warning.id)}
                                                        style={styles.removeBtn}
                                                        title="Remove warning"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Add Warning Modal */}
                {showAddWarning && (
                    <div style={styles.modalOverlay} onClick={() => setShowAddWarning(false)}>
                        <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                            <div style={styles.modalHeader}>
                                <h3 style={styles.modalTitle}>Add Warning</h3>
                                <button onClick={() => setShowAddWarning(false)} style={styles.modalClose}>
                                    <FaTimes />
                                </button>
                            </div>
                            <div style={styles.modalContent}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>User</label>
                                    <select
                                        value={newWarning.user_id}
                                        onChange={(e) => setNewWarning({ ...newWarning, user_id: e.target.value })}
                                        style={styles.select}
                                    >
                                        <option value="">Select user...</option>
                                        {users.map(user => (
                                            <option key={user.id} value={user.id}>
                                                {user.username}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Reason</label>
                                    <textarea
                                        value={newWarning.reason}
                                        onChange={(e) => setNewWarning({ ...newWarning, reason: e.target.value })}
                                        placeholder="Why is this warning being issued?"
                                        style={styles.textarea}
                                        rows="3"
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Severity</label>
                                    <select
                                        value={newWarning.severity}
                                        onChange={(e) => setNewWarning({ ...newWarning, severity: e.target.value })}
                                        style={styles.select}
                                    >
                                        <option value="low">🟢 Low</option>
                                        <option value="medium">🟡 Medium</option>
                                        <option value="high">🔴 High</option>
                                    </select>
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Expires In (Days)</label>
                                    <input
                                        type="number"
                                        value={newWarning.expires_in_days}
                                        onChange={(e) => setNewWarning({ ...newWarning, expires_in_days: parseInt(e.target.value) })}
                                        style={styles.input}
                                        min="1"
                                        max="365"
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Auto-ban Threshold</label>
                                    <input
                                        type="number"
                                        value={newWarning.auto_ban_on}
                                        onChange={(e) => setNewWarning({ ...newWarning, auto_ban_on: parseInt(e.target.value) })}
                                        style={styles.input}
                                        min="2"
                                        max="10"
                                    />
                                    <div style={styles.hint}>
                                        User will be auto-banned after reaching {newWarning.auto_ban_on} active warnings
                                    </div>
                                </div>
                            </div>
                            <div style={styles.modalActions}>
                                <button onClick={() => setShowAddWarning(false)} style={styles.cancelBtn}>
                                    Cancel
                                </button>
                                <button onClick={addWarning} style={styles.submitBtn}>
                                    <FaPlus /> Add Warning
                                </button>
                            </div>
                        </div>
                    </div>
                )}
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        backdropFilter: 'blur(5px)'
    },
    panel: {
        backgroundColor: '#2b2d31',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '1000px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #1e1f22'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    headerIcon: {
        fontSize: '24px',
        color: '#f0b132'
    },
    title: {
        margin: 0,
        color: '#fff',
        fontSize: '24px',
        fontWeight: '600'
    },
    headerRight: {
        display: 'flex',
        gap: '12px'
    },
    addBtn: {
        backgroundColor: '#43b581',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '8px 16px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '24px',
        padding: '8px'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '16px',
        padding: '20px',
        borderBottom: '1px solid #1e1f22'
    },
    statCard: {
        backgroundColor: '#1e1f22',
        borderRadius: '8px',
        padding: '16px',
        textAlign: 'center'
    },
    statIcon: {
        fontSize: '32px',
        marginBottom: '8px'
    },
    statValue: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: '4px'
    },
    statLabel: {
        fontSize: '13px',
        color: '#b9bbbe'
    },
    searchBar: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '16px 20px',
        borderBottom: '1px solid #1e1f22',
        backgroundColor: '#1e1f22'
    },
    searchIcon: {
        color: '#b9bbbe',
        fontSize: '16px'
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#2b2d31',
        border: '1px solid #1e1f22',
        borderRadius: '6px',
        padding: '8px 12px',
        color: '#fff',
        fontSize: '14px'
    },
    warningsList: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
    },
    loading: {
        textAlign: 'center',
        color: '#b9bbbe',
        padding: '40px',
        fontSize: '14px'
    },
    empty: {
        textAlign: 'center',
        color: '#b9bbbe',
        padding: '60px'
    },
    emptyIcon: {
        fontSize: '48px',
        marginBottom: '16px',
        opacity: 0.5
    },
    userCard: {
        backgroundColor: '#1e1f22',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px'
    },
    userHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
        paddingBottom: '12px',
        borderBottom: '1px solid #2b2d31'
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    userIcon: {
        fontSize: '20px',
        color: '#5865f2'
    },
    userName: {
        color: '#fff',
        fontSize: '18px',
        fontWeight: '600'
    },
    badge: {
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '11px',
        fontWeight: '600',
        color: '#fff',
        textTransform: 'uppercase'
    },
    riskBadge: {
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '11px',
        fontWeight: '700',
        color: '#fff',
        backgroundColor: '#ed4245',
        animation: 'pulse 1.5s infinite'
    },
    banBtn: {
        backgroundColor: '#ed4245',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '8px 16px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    userWarnings: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    warningItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px',
        backgroundColor: '#2b2d31',
        borderRadius: '6px'
    },
    warningLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flex: 1
    },
    severityDot: {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        flexShrink: 0
    },
    warningContent: {
        flex: 1
    },
    warningReason: {
        color: '#fff',
        fontSize: '14px',
        marginBottom: '4px'
    },
    warningMeta: {
        color: '#72767d',
        fontSize: '12px',
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap'
    },
    removeBtn: {
        background: 'none',
        border: 'none',
        color: '#ed4245',
        cursor: 'pointer',
        fontSize: '14px',
        padding: '8px'
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10001
    },
    modal: {
        backgroundColor: '#2b2d31',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #1e1f22'
    },
    modalTitle: {
        margin: 0,
        color: '#fff',
        fontSize: '20px',
        fontWeight: '600'
    },
    modalClose: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '20px'
    },
    modalContent: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
    },
    formGroup: {
        marginBottom: '20px'
    },
    label: {
        display: 'block',
        color: '#b9bbbe',
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '8px'
    },
    select: {
        width: '100%',
        backgroundColor: '#1e1f22',
        border: '1px solid #2b2d31',
        borderRadius: '6px',
        padding: '10px',
        color: '#fff',
        fontSize: '14px'
    },
    input: {
        width: '100%',
        backgroundColor: '#1e1f22',
        border: '1px solid #2b2d31',
        borderRadius: '6px',
        padding: '10px',
        color: '#fff',
        fontSize: '14px'
    },
    textarea: {
        width: '100%',
        backgroundColor: '#1e1f22',
        border: '1px solid #2b2d31',
        borderRadius: '6px',
        padding: '10px',
        color: '#fff',
        fontSize: '14px',
        resize: 'vertical',
        fontFamily: 'inherit'
    },
    hint: {
        color: '#72767d',
        fontSize: '12px',
        marginTop: '4px'
    },
    modalActions: {
        display: 'flex',
        gap: '12px',
        padding: '16px 20px',
        borderTop: '1px solid #1e1f22'
    },
    cancelBtn: {
        flex: 1,
        backgroundColor: '#2b2d31',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '10px 16px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600'
    },
    submitBtn: {
        flex: 1,
        backgroundColor: '#43b581',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '10px 16px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
    }
};

export default UserWarningsPanel;


