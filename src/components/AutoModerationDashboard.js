// frontend/src/components/AutoModerationDashboard.js
import React, { useState, useEffect } from 'react';
import { FaShieldAlt, FaBan, FaExclamationTriangle, FaClock, FaCheck, FaTimes, FaPlus, FaCog, FaChartLine } from 'react-icons/fa';
import confirmDialog from '../utils/confirmDialog';

/**
 * 🛡️ Auto-Moderation Dashboard
 * Spam, toxic content, keyword filtering
 */
const AutoModerationDashboard = ({ serverId, fetchWithAuth, apiBaseUrl, onClose }) => {
    const [rules, setRules] = useState([]);
    const [logs, setLogs] = useState([]);
    const [stats, setStats] = useState({
        total_violations: 0,
        auto_deleted: 0,
        warnings_issued: 0,
        users_banned: 0
    });
    const [showCreateRule, setShowCreateRule] = useState(false);
    const [newRule, setNewRule] = useState({
        rule_type: 'toxic',
        action: 'warn',
        threshold: 0.8,
        keywords: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, [serverId]);

    const loadData = async () => {
        setLoading(true);
        try {
            // Load moderation rules
            const rulesRes = await fetchWithAuth(`${apiBaseUrl}/moderation/rules/${serverId}/`);
            if (rulesRes.ok) {
                const data = await rulesRes.json();
                setRules(data.rules || []);
            }

            // Load moderation logs
            const logsRes = await fetchWithAuth(`${apiBaseUrl}/moderation/logs/${serverId}/`);
            if (logsRes.ok) {
                const data = await logsRes.json();
                setLogs(data.logs || data);
            }

            // Calculate stats
            if (logs.length > 0) {
                setStats({
                    total_violations: logs.length,
                    auto_deleted: logs.filter(l => l.action === 'delete').length,
                    warnings_issued: logs.filter(l => l.action === 'warn').length,
                    users_banned: logs.filter(l => l.action === 'ban').length
                });
            }
        } catch (error) {
            console.error('Failed to load moderation data:', error);
        }
        setLoading(false);
    };

    const createRule = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/moderation/rules/${serverId}/create/`, {
                method: 'POST',
                body: JSON.stringify(newRule)
            });

            if (res.ok) {
                const data = await res.json();
                setRules([...rules, data]);
                setShowCreateRule(false);
                setNewRule({ rule_type: 'toxic', action: 'warn', threshold: 0.8, keywords: [] });
            }
        } catch (error) {
            console.error('Failed to create rule:', error);
        }
    };

    const toggleRule = async (ruleId) => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/moderation/rules/${ruleId}/toggle/`, {
                method: 'POST'
            });
            setRules(rules.map(r => r.id === ruleId ? { ...r, is_enabled: !r.is_enabled } : r));
        } catch (error) {
            console.error('Failed to toggle rule:', error);
        }
    };

    const deleteRule = async (ruleId) => {
        if (!await confirmDialog('Bu kuralı silmek istediğine emin misin?')) return;
        
        try {
            await fetchWithAuth(`${apiBaseUrl}/moderation/rules/${ruleId}/`, {
                method: 'DELETE'
            });
            setRules(rules.filter(r => r.id !== ruleId));
        } catch (error) {
            console.error('Failed to delete rule:', error);
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.panel} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaShieldAlt style={styles.headerIcon} />
                        <h2 style={styles.title}>Auto-Moderation</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                {/* Stats */}
                <div style={styles.statsGrid}>
                    <div style={styles.statCard}>
                        <FaExclamationTriangle style={{ ...styles.statIcon, color: '#f04747' }} />
                        <div style={styles.statValue}>{stats.total_violations}</div>
                        <div style={styles.statLabel}>Total Violations</div>
                    </div>
                    <div style={styles.statCard}>
                        <FaBan style={{ ...styles.statIcon, color: '#ed4245' }} />
                        <div style={styles.statValue}>{stats.auto_deleted}</div>
                        <div style={styles.statLabel}>Auto-Deleted</div>
                    </div>
                    <div style={styles.statCard}>
                        <FaClock style={{ ...styles.statIcon, color: '#f0b132' }} />
                        <div style={styles.statValue}>{stats.warnings_issued}</div>
                        <div style={styles.statLabel}>Warnings</div>
                    </div>
                    <div style={styles.statCard}>
                        <FaCheck style={{ ...styles.statIcon, color: '#43b581' }} />
                        <div style={styles.statValue}>{rules.filter(r => r.is_enabled).length}</div>
                        <div style={styles.statLabel}>Active Rules</div>
                    </div>
                </div>

                {/* Rules */}
                <div style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <h3 style={styles.sectionTitle}>
                            <FaCog /> Moderation Rules
                        </h3>
                        <button onClick={() => setShowCreateRule(true)} style={styles.addButton}>
                            <FaPlus /> Add Rule
                        </button>
                    </div>

                    {loading ? (
                        <div style={styles.loading}>Loading...</div>
                    ) : rules.length === 0 ? (
                        <div style={styles.empty}>
                            No moderation rules yet. Create one to get started!
                        </div>
                    ) : (
                        <div style={styles.rulesList}>
                            {rules.map(rule => (
                                <div key={rule.id} style={styles.ruleCard}>
                                    <div style={styles.ruleHeader}>
                                        <div style={styles.ruleType}>
                                            {getRuleIcon(rule.rule_type)}
                                            <span>{getRuleLabel(rule.rule_type)}</span>
                                        </div>
                                        <div style={styles.ruleActions}>
                                            <label style={styles.switch}>
                                                <input
                                                    type="checkbox"
                                                    checked={rule.is_enabled}
                                                    onChange={() => toggleRule(rule.id)}
                                                />
                                                <span style={styles.slider}></span>
                                            </label>
                                            <button onClick={() => deleteRule(rule.id)} style={styles.deleteBtn}>
                                                <FaTimes />
                                            </button>
                                        </div>
                                    </div>
                                    <div style={styles.ruleDetails}>
                                        <div style={styles.ruleInfo}>
                                            <span style={styles.ruleLabel}>Action:</span>
                                            <span style={styles.ruleValue}>{getActionLabel(rule.action)}</span>
                                        </div>
                                        {rule.threshold && (
                                            <div style={styles.ruleInfo}>
                                                <span style={styles.ruleLabel}>Threshold:</span>
                                                <span style={styles.ruleValue}>{(rule.threshold * 100).toFixed(0)}%</span>
                                            </div>
                                        )}
                                        {rule.keywords && rule.keywords.length > 0 && (
                                            <div style={styles.ruleInfo}>
                                                <span style={styles.ruleLabel}>Keywords:</span>
                                                <span style={styles.ruleValue}>{rule.keywords.join(', ')}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Logs */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>
                        <FaChartLine /> Recent Activity
                    </h3>
                    <div style={styles.logsList}>
                        {logs.slice(0, 10).map((log, idx) => (
                            <div key={idx} style={styles.logItem}>
                                <div style={styles.logIcon}>{getActionIcon(log.action)}</div>
                                <div style={styles.logContent}>
                                    <div style={styles.logText}>
                                        <strong>{log.user || 'Unknown'}</strong> - {log.violation_type}
                                    </div>
                                    <div style={styles.logMeta}>
                                        {log.content?.substring(0, 50)}... • {new Date(log.created_at).toLocaleString()}
                                    </div>
                                </div>
                                <div style={styles.logAction}>
                                    <span style={getActionStyle(log.action)}>{log.action}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Create Rule Modal */}
                {showCreateRule && (
                    <div style={styles.modalOverlay} onClick={() => setShowCreateRule(false)}>
                        <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                            <h3 style={styles.modalTitle}>Create Moderation Rule</h3>
                            
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Rule Type</label>
                                <select
                                    value={newRule.rule_type}
                                    onChange={(e) => setNewRule({ ...newRule, rule_type: e.target.value })}
                                    style={styles.select}
                                >
                                    <option value="toxic">Toxic Language</option>
                                    <option value="spam">Spam Detection</option>
                                    <option value="keyword">Keyword Filter</option>
                                    <option value="link">Link Filter</option>
                                    <option value="caps">Excessive Caps</option>
                                </select>
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Action</label>
                                <select
                                    value={newRule.action}
                                    onChange={(e) => setNewRule({ ...newRule, action: e.target.value })}
                                    style={styles.select}
                                >
                                    <option value="warn">Warn User</option>
                                    <option value="delete">Delete Message</option>
                                    <option value="timeout">Timeout User (5min)</option>
                                    <option value="kick">Kick User</option>
                                    <option value="ban">Ban User</option>
                                </select>
                            </div>

                            {newRule.rule_type !== 'keyword' && (
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>AI Threshold ({(newRule.threshold * 100).toFixed(0)}%)</label>
                                    <input
                                        type="range"
                                        min="0.5"
                                        max="1"
                                        step="0.05"
                                        value={newRule.threshold}
                                        onChange={(e) => setNewRule({ ...newRule, threshold: parseFloat(e.target.value) })}
                                        style={styles.slider}
                                    />
                                </div>
                            )}

                            {newRule.rule_type === 'keyword' && (
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Keywords (comma separated)</label>
                                    <input
                                        type="text"
                                        placeholder="word1, word2, word3"
                                        onChange={(e) => setNewRule({ ...newRule, keywords: e.target.value.split(',').map(k => k.trim()) })}
                                        style={styles.input}
                                    />
                                </div>
                            )}

                            <div style={styles.modalButtons}>
                                <button onClick={() => setShowCreateRule(false)} style={styles.cancelBtn}>
                                    Cancel
                                </button>
                                <button onClick={createRule} style={styles.createBtn}>
                                    Create Rule
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Helper functions
const getRuleIcon = (type) => {
    switch (type) {
        case 'toxic': return '☠️';
        case 'spam': return '🚫';
        case 'keyword': return '🔤';
        case 'link': return '🔗';
        case 'caps': return '📢';
        default: return '⚙️';
    }
};

const getRuleLabel = (type) => {
    switch (type) {
        case 'toxic': return 'Toxic Language';
        case 'spam': return 'Spam Detection';
        case 'keyword': return 'Keyword Filter';
        case 'link': return 'Link Filter';
        case 'caps': return 'Excessive Caps';
        default: return type;
    }
};

const getActionLabel = (action) => {
    switch (action) {
        case 'warn': return '⚠️ Warn';
        case 'delete': return '🗑️ Delete';
        case 'timeout': return '⏱️ Timeout';
        case 'kick': return '👢 Kick';
        case 'ban': return '🔨 Ban';
        default: return action;
    }
};

const getActionIcon = (action) => {
    switch (action) {
        case 'warn': return '⚠️';
        case 'delete': return '🗑️';
        case 'timeout': return '⏱️';
        case 'ban': return '🔨';
        default: return '❓';
    }
};

const getActionStyle = (action) => ({
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: action === 'ban' ? '#ed4245' : action === 'timeout' ? '#f0b132' : '#5865f2',
    color: '#fff'
});

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
        color: '#5865f2'
    },
    title: {
        margin: 0,
        color: '#fff',
        fontSize: '24px',
        fontWeight: '600'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '24px',
        padding: '8px',
        borderRadius: '4px'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
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
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: '4px'
    },
    statLabel: {
        fontSize: '14px',
        color: '#b9bbbe'
    },
    section: {
        padding: '20px',
        borderBottom: '1px solid #1e1f22',
        overflowY: 'auto'
    },
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
    },
    sectionTitle: {
        color: '#fff',
        fontSize: '18px',
        fontWeight: '600',
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    addButton: {
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '8px 16px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        fontWeight: '600'
    },
    loading: {
        textAlign: 'center',
        color: '#b9bbbe',
        padding: '40px'
    },
    empty: {
        textAlign: 'center',
        color: '#b9bbbe',
        padding: '40px',
        fontSize: '14px'
    },
    rulesList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    ruleCard: {
        backgroundColor: '#1e1f22',
        borderRadius: '8px',
        padding: '16px'
    },
    ruleHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
    },
    ruleType: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '16px',
        fontWeight: '600',
        color: '#fff'
    },
    ruleActions: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    switch: {
        position: 'relative',
        display: 'inline-block',
        width: '44px',
        height: '24px'
    },
    slider: {
        position: 'absolute',
        cursor: 'pointer',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#72767d',
        transition: '0.3s',
        borderRadius: '24px'
    },
    deleteBtn: {
        background: 'none',
        border: 'none',
        color: '#ed4245',
        cursor: 'pointer',
        fontSize: '18px',
        padding: '4px'
    },
    ruleDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    ruleInfo: {
        display: 'flex',
        gap: '8px',
        fontSize: '14px'
    },
    ruleLabel: {
        color: '#b9bbbe',
        fontWeight: '500'
    },
    ruleValue: {
        color: '#fff'
    },
    logsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    logItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: '#1e1f22',
        borderRadius: '6px',
        padding: '12px'
    },
    logIcon: {
        fontSize: '24px'
    },
    logContent: {
        flex: 1
    },
    logText: {
        color: '#fff',
        fontSize: '14px',
        marginBottom: '4px'
    },
    logMeta: {
        color: '#72767d',
        fontSize: '12px'
    },
    logAction: {
        marginLeft: 'auto'
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
        padding: '24px',
        width: '90%',
        maxWidth: '500px'
    },
    modalTitle: {
        color: '#fff',
        fontSize: '20px',
        marginBottom: '20px'
    },
    formGroup: {
        marginBottom: '16px'
    },
    label: {
        display: 'block',
        color: '#b9bbbe',
        fontSize: '14px',
        marginBottom: '8px',
        fontWeight: '500'
    },
    select: {
        width: '100%',
        backgroundColor: '#1e1f22',
        border: '1px solid #1e1f22',
        borderRadius: '6px',
        padding: '10px',
        color: '#fff',
        fontSize: '14px'
    },
    input: {
        width: '100%',
        backgroundColor: '#1e1f22',
        border: '1px solid #1e1f22',
        borderRadius: '6px',
        padding: '10px',
        color: '#fff',
        fontSize: '14px'
    },
    modalButtons: {
        display: 'flex',
        gap: '12px',
        justifyContent: 'flex-end',
        marginTop: '20px'
    },
    cancelBtn: {
        backgroundColor: '#4e5058',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '10px 20px',
        cursor: 'pointer',
        fontSize: '14px'
    },
    createBtn: {
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '10px 20px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600'
    }
};

export default AutoModerationDashboard;


