// frontend/src/components/RaidProtectionPanel.js
import { useState, useEffect } from 'react';
import toast from '../utils/toast';
import { FaShieldAlt, FaExclamationCircle, FaUserSlash, FaBolt, FaChartBar, FaCog, FaTimes } from 'react-icons/fa';
import confirmDialog from '../utils/confirmDialog';

/**
 * 🛡️ Raid Protection Panel
 * Protect server from mass join/spam attacks
 */
const RaidProtectionPanel = ({ serverId, fetchWithAuth, apiBaseUrl, onClose }) => {
    const [protection, setProtection] = useState({
        enabled: false,
        join_rate_limit: 10, // Users per minute
        new_account_age: 7, // Days
        verification_level: 'medium', // low, medium, high
        auto_kick_suspicious: true,
        lockdown_mode: false
    });
    const [raidActivity, setRaidActivity] = useState([]);
    const [stats, setStats] = useState({
        blocked_joins: 0,
        kicked_users: 0,
        raid_attempts: 0,
        last_raid: null
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProtection();
        checkRaidActivity();
        const interval = setInterval(checkRaidActivity, 30000); // Check every 30s
        return () => clearInterval(interval);
    }, [serverId]);

    const loadProtection = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/moderation/raid-protection/${serverId}/`);
            if (res.ok) {
                const data = await res.json();
                setProtection(data);
            }
        } catch (error) {
            console.error('Failed to load raid protection:', error);
        }
        setLoading(false);
    };

    const checkRaidActivity = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/moderation/raid-protection/check/`, {
                method: 'POST',
                body: JSON.stringify({ server_id: serverId })
            });
            
            if (res.ok) {
                const data = await res.json();
                setRaidActivity(data.recent_activity || []);
                
                if (data.raid_detected) {
                    // Show alert
                    toast.error(`⚠️ RAID DETECTED!\n${data.message}\n\nAutomatic protection activated.`);
                }
            }
        } catch (error) {
            console.error('Failed to check raid activity:', error);
        }
    };

    const toggleProtection = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/moderation/raid-protection/enable/`, {
                method: 'POST',
                body: JSON.stringify({
                    server_id: serverId,
                    enabled: !protection.enabled
                })
            });

            if (res.ok) {
                const data = await res.json();
                setProtection({ ...protection, enabled: !protection.enabled });
            }
        } catch (error) {
            console.error('Failed to toggle raid protection:', error);
        }
    };

    const updateSetting = async (key, value) => {
        const updated = { ...protection, [key]: value };
        setProtection(updated);

        try {
            await fetchWithAuth(`${apiBaseUrl}/moderation/raid-protection/update/`, {
                method: 'POST',
                body: JSON.stringify({
                    server_id: serverId,
                    ...updated
                })
            });
        } catch (error) {
            console.error('Failed to update setting:', error);
        }
    };

    const activateLockdown = async () => {
        if (!await confirmDialog('⚠️ LOCKDOWN MODE\n\nThis will:\n- Block all new joins\n- Require manual approval for each user\n- Kick suspicious accounts\n\nActivate?')) return;

        try {
            await updateSetting('lockdown_mode', true);
            toast.success('🔒 Lockdown Mode Activated!');
        } catch (error) {
            console.error('Failed to activate lockdown:', error);
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.panel} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaShieldAlt style={{ ...styles.headerIcon, color: protection.enabled ? '#43b581' : '#72767d' }} />
                        <h2 style={styles.title}>Raid Protection</h2>
                        {protection.lockdown_mode && (
                            <span style={styles.lockdownBadge}>🔒 LOCKDOWN</span>
                        )}
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                {/* Quick Stats */}
                <div style={styles.statsGrid}>
                    <div style={styles.statCard}>
                        <FaUserSlash style={{ ...styles.statIcon, color: '#ed4245' }} />
                        <div style={styles.statValue}>{stats.blocked_joins}</div>
                        <div style={styles.statLabel}>Blocked Joins</div>
                    </div>
                    <div style={styles.statCard}>
                        <FaBolt style={{ ...styles.statIcon, color: '#f0b132' }} />
                        <div style={styles.statValue}>{stats.kicked_users}</div>
                        <div style={styles.statLabel}>Auto-Kicked</div>
                    </div>
                    <div style={styles.statCard}>
                        <FaExclamationCircle style={{ ...styles.statIcon, color: '#f04747' }} />
                        <div style={styles.statValue}>{stats.raid_attempts}</div>
                        <div style={styles.statLabel}>Raid Attempts</div>
                    </div>
                    <div style={styles.statCard}>
                        <FaChartBar style={{ ...styles.statIcon, color: '#5865f2' }} />
                        <div style={styles.statValue}>
                            {protection.enabled ? 'ACTIVE' : 'OFF'}
                        </div>
                        <div style={styles.statLabel}>Status</div>
                    </div>
                </div>

                {/* Protection Settings */}
                <div style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <h3 style={styles.sectionTitle}>
                            <FaCog /> Protection Settings
                        </h3>
                        <label style={styles.masterSwitch}>
                            <input
                                type="checkbox"
                                checked={protection.enabled}
                                onChange={toggleProtection}
                            />
                            <span style={styles.switchSlider}></span>
                            <span style={styles.switchLabel}>
                                {protection.enabled ? 'Enabled' : 'Disabled'}
                            </span>
                        </label>
                    </div>

                    <div style={styles.settings}>
                        {/* Join Rate Limit */}
                        <div style={styles.setting}>
                            <div style={styles.settingInfo}>
                                <div style={styles.settingLabel}>Join Rate Limit</div>
                                <div style={styles.settingDesc}>
                                    Maximum users per minute: {protection.join_rate_limit}
                                </div>
                            </div>
                            <input
                                type="range"
                                min="5"
                                max="50"
                                value={protection.join_rate_limit}
                                onChange={(e) => updateSetting('join_rate_limit', parseInt(e.target.value))}
                                style={styles.slider}
                                disabled={!protection.enabled}
                            />
                        </div>

                        {/* New Account Age */}
                        <div style={styles.setting}>
                            <div style={styles.settingInfo}>
                                <div style={styles.settingLabel}>New Account Age Limit</div>
                                <div style={styles.settingDesc}>
                                    Block accounts younger than {protection.new_account_age} days
                                </div>
                            </div>
                            <select
                                value={protection.new_account_age}
                                onChange={(e) => updateSetting('new_account_age', parseInt(e.target.value))}
                                style={styles.select}
                                disabled={!protection.enabled}
                            >
                                <option value="1">1 day</option>
                                <option value="3">3 days</option>
                                <option value="7">7 days</option>
                                <option value="14">14 days</option>
                                <option value="30">30 days</option>
                            </select>
                        </div>

                        {/* Verification Level */}
                        <div style={styles.setting}>
                            <div style={styles.settingInfo}>
                                <div style={styles.settingLabel}>Verification Level</div>
                                <div style={styles.settingDesc}>
                                    {protection.verification_level === 'low' && 'Basic: Email verification'}
                                    {protection.verification_level === 'medium' && 'Medium: Email + Phone'}
                                    {protection.verification_level === 'high' && 'High: Email + Phone + Captcha'}
                                </div>
                            </div>
                            <select
                                value={protection.verification_level}
                                onChange={(e) => updateSetting('verification_level', e.target.value)}
                                style={styles.select}
                                disabled={!protection.enabled}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        {/* Auto-Kick Suspicious */}
                        <div style={styles.setting}>
                            <div style={styles.settingInfo}>
                                <div style={styles.settingLabel}>Auto-Kick Suspicious Accounts</div>
                                <div style={styles.settingDesc}>
                                    Automatically kick accounts flagged as suspicious
                                </div>
                            </div>
                            <label style={styles.toggleSwitch}>
                                <input
                                    type="checkbox"
                                    checked={protection.auto_kick_suspicious}
                                    onChange={(e) => updateSetting('auto_kick_suspicious', e.target.checked)}
                                    disabled={!protection.enabled}
                                />
                                <span style={styles.toggleSlider}></span>
                            </label>
                        </div>

                        {/* Lockdown Mode */}
                        <div style={styles.setting}>
                            <div style={styles.settingInfo}>
                                <div style={styles.settingLabel}>🔒 Lockdown Mode</div>
                                <div style={styles.settingDesc}>
                                    Block ALL new joins (emergency mode)
                                </div>
                            </div>
                            {protection.lockdown_mode ? (
                                <button
                                    onClick={() => updateSetting('lockdown_mode', false)}
                                    style={styles.lockdownDeactivateBtn}
                                >
                                    Deactivate
                                </button>
                            ) : (
                                <button
                                    onClick={activateLockdown}
                                    style={styles.lockdownBtn}
                                    disabled={!protection.enabled}
                                >
                                    Activate
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>
                        <FaBolt /> Recent Activity
                    </h3>
                    <div style={styles.activityList}>
                        {raidActivity.length === 0 ? (
                            <div style={styles.empty}>No suspicious activity detected</div>
                        ) : (
                            raidActivity.map((activity, idx) => (
                                <div key={idx} style={styles.activityItem}>
                                    <div style={styles.activityIcon}>
                                        {activity.type === 'raid' ? '⚠️' : activity.type === 'suspicious' ? '👀' : '✅'}
                                    </div>
                                    <div style={styles.activityContent}>
                                        <div style={styles.activityText}>{activity.message}</div>
                                        <div style={styles.activityTime}>
                                            {new Date(activity.timestamp).toLocaleString()}
                                        </div>
                                    </div>
                                    {activity.action && (
                                        <div style={styles.activityAction}>
                                            <span style={styles.actionBadge}>{activity.action}</span>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Info Box */}
                <div style={styles.infoBox}>
                    <FaShieldAlt style={styles.infoIcon} />
                    <div style={styles.infoContent}>
                        <strong>How Raid Protection Works:</strong>
                        <ul style={styles.infoList}>
                            <li>Monitors join rate (users per minute)</li>
                            <li>Checks account age and activity</li>
                            <li>Auto-kicks suspicious patterns</li>
                            <li>Activates lockdown during active raids</li>
                        </ul>
                    </div>
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
        maxWidth: '900px',
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
        fontSize: '24px'
    },
    title: {
        margin: 0,
        color: '#fff',
        fontSize: '24px',
        fontWeight: '600'
    },
    lockdownBadge: {
        backgroundColor: '#ed4245',
        color: '#fff',
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '700',
        animation: 'pulse 1.5s infinite'
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
    section: {
        padding: '20px',
        borderBottom: '1px solid #1e1f22',
        overflowY: 'auto'
    },
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
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
    masterSwitch: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        cursor: 'pointer'
    },
    switchSlider: {
        position: 'relative',
        width: '48px',
        height: '24px',
        backgroundColor: '#72767d',
        borderRadius: '24px',
        transition: '0.3s'
    },
    switchLabel: {
        color: '#fff',
        fontSize: '14px',
        fontWeight: '600'
    },
    settings: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    setting: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: '#1e1f22',
        borderRadius: '8px'
    },
    settingInfo: {
        flex: 1
    },
    settingLabel: {
        color: '#fff',
        fontSize: '15px',
        fontWeight: '600',
        marginBottom: '4px'
    },
    settingDesc: {
        color: '#b9bbbe',
        fontSize: '13px'
    },
    slider: {
        width: '200px',
        marginLeft: '20px'
    },
    select: {
        backgroundColor: '#2b2d31',
        border: '1px solid #1e1f22',
        borderRadius: '6px',
        padding: '8px 12px',
        color: '#fff',
        fontSize: '14px',
        marginLeft: '20px',
        minWidth: '150px'
    },
    toggleSwitch: {
        position: 'relative',
        width: '48px',
        height: '24px',
        marginLeft: '20px'
    },
    toggleSlider: {
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
    lockdownBtn: {
        backgroundColor: '#ed4245',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '8px 16px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        marginLeft: '20px'
    },
    lockdownDeactivateBtn: {
        backgroundColor: '#43b581',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '8px 16px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        marginLeft: '20px'
    },
    activityList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    empty: {
        textAlign: 'center',
        color: '#b9bbbe',
        padding: '40px',
        fontSize: '14px'
    },
    activityItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px',
        backgroundColor: '#1e1f22',
        borderRadius: '6px'
    },
    activityIcon: {
        fontSize: '24px'
    },
    activityContent: {
        flex: 1
    },
    activityText: {
        color: '#fff',
        fontSize: '14px',
        marginBottom: '4px'
    },
    activityTime: {
        color: '#72767d',
        fontSize: '12px'
    },
    activityAction: {
        marginLeft: 'auto'
    },
    actionBadge: {
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: '600',
        backgroundColor: '#5865f2',
        color: '#fff'
    },
    infoBox: {
        display: 'flex',
        gap: '16px',
        padding: '20px',
        backgroundColor: 'rgba(88, 101, 242, 0.1)',
        borderTop: '1px solid #5865f2'
    },
    infoIcon: {
        fontSize: '24px',
        color: '#5865f2',
        marginTop: '4px'
    },
    infoContent: {
        color: '#fff',
        fontSize: '14px'
    },
    infoList: {
        margin: '8px 0 0 0',
        paddingLeft: '20px',
        color: '#b9bbbe'
    }
};

export default RaidProtectionPanel;


