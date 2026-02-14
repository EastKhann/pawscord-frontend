// frontend/src/components/AutoModerationDashboard.js
import { FaShieldAlt, FaBan, FaExclamationTriangle, FaClock, FaCheck, FaTimes, FaPlus, FaCog, FaChartLine } from 'react-icons/fa';
import styles from './AutoModerationDashboard/styles';
import { useAutoModeration } from './AutoModerationDashboard/hooks/useAutoModeration';
import { getRuleIcon, getRuleLabel, getActionLabel, getActionIcon, getActionStyle } from './AutoModerationDashboard/helpers';
import CreateRuleModal from './AutoModerationDashboard/CreateRuleModal';

/**
 * 🛡️ Auto-Moderation Dashboard
 * Spam, toxic content, keyword filtering
 */
const AutoModerationDashboard = ({ serverId, fetchWithAuth, apiBaseUrl, onClose }) => {
    const {
        rules, logs, stats, showCreateRule, setShowCreateRule,
        newRule, setNewRule, loading, createRule, toggleRule, deleteRule
    } = useAutoModeration(serverId, fetchWithAuth, apiBaseUrl);

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
                                        {log.content?.substring(0, 50)}... {'•'} {new Date(log.created_at).toLocaleString()}
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
                    <CreateRuleModal
                        newRule={newRule}
                        setNewRule={setNewRule}
                        onClose={() => setShowCreateRule(false)}
                        onCreateRule={createRule}
                    />
                )}
            </div>
        </div>
    );
};

export default AutoModerationDashboard;
