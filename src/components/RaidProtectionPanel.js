import { FaShieldAlt, FaExclamationCircle, FaUserSlash, FaBolt, FaChartBar, FaCog, FaTimes } from 'react-icons/fa';
import useRaidProtection from './RaidProtectionPanel/useRaidProtection';
import { styles } from './RaidProtectionPanel/raidProtectionStyles';

const RaidProtectionPanel = ({ serverId, fetchWithAuth, apiBaseUrl, onClose }) => {
    const r = useRaidProtection(serverId, fetchWithAuth, apiBaseUrl);

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.panel} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaShieldAlt style={{ ...styles.headerIcon, color: r.protection.enabled ? '#43b581' : '#72767d' }} />
                        <h2 style={styles.title}>Raid Protection</h2>
                        {r.protection.lockdown_mode && <span style={styles.lockdownBadge}>{'\ud83d\udd12'} LOCKDOWN</span>}
                    </div>
                    <button onClick={onClose} style={styles.closeButton}><FaTimes /></button>
                </div>

                <div style={styles.statsGrid}>
                    <div style={styles.statCard}>
                        <FaUserSlash style={{ ...styles.statIcon, color: '#ed4245' }} />
                        <div style={styles.statValue}>{r.stats.blocked_joins}</div>
                        <div style={styles.statLabel}>Blocked Joins</div>
                    </div>
                    <div style={styles.statCard}>
                        <FaBolt style={{ ...styles.statIcon, color: '#f0b132' }} />
                        <div style={styles.statValue}>{r.stats.kicked_users}</div>
                        <div style={styles.statLabel}>Auto-Kicked</div>
                    </div>
                    <div style={styles.statCard}>
                        <FaExclamationCircle style={{ ...styles.statIcon, color: '#f04747' }} />
                        <div style={styles.statValue}>{r.stats.raid_attempts}</div>
                        <div style={styles.statLabel}>Raid Attempts</div>
                    </div>
                    <div style={styles.statCard}>
                        <FaChartBar style={{ ...styles.statIcon, color: '#5865f2' }} />
                        <div style={styles.statValue}>{r.protection.enabled ? 'ACTIVE' : 'OFF'}</div>
                        <div style={styles.statLabel}>Status</div>
                    </div>
                </div>

                <div style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <h3 style={styles.sectionTitle}><FaCog /> Protection Settings</h3>
                        <label style={styles.masterSwitch}>
                            <input type="checkbox" checked={r.protection.enabled} onChange={r.toggleProtection} />
                            <span style={styles.switchSlider}></span>
                            <span style={styles.switchLabel}>{r.protection.enabled ? 'Enabled' : 'Disabled'}</span>
                        </label>
                    </div>

                    <div style={styles.settings}>
                        <div style={styles.setting}>
                            <div style={styles.settingInfo}>
                                <div style={styles.settingLabel}>Join Rate Limit</div>
                                <div style={styles.settingDesc}>Maximum users per minute: {r.protection.join_rate_limit}</div>
                            </div>
                            <input type="range" min="5" max="50" value={r.protection.join_rate_limit}
                                onChange={(e) => r.updateSetting('join_rate_limit', parseInt(e.target.value))}
                                style={styles.slider} disabled={!r.protection.enabled} />
                        </div>

                        <div style={styles.setting}>
                            <div style={styles.settingInfo}>
                                <div style={styles.settingLabel}>New Account Age Limit</div>
                                <div style={styles.settingDesc}>Block accounts younger than {r.protection.new_account_age} days</div>
                            </div>
                            <select value={r.protection.new_account_age}
                                onChange={(e) => r.updateSetting('new_account_age', parseInt(e.target.value))}
                                style={styles.select} disabled={!r.protection.enabled}>
                                <option value="1">1 day</option>
                                <option value="3">3 days</option>
                                <option value="7">7 days</option>
                                <option value="14">14 days</option>
                                <option value="30">30 days</option>
                            </select>
                        </div>

                        <div style={styles.setting}>
                            <div style={styles.settingInfo}>
                                <div style={styles.settingLabel}>Verification Level</div>
                                <div style={styles.settingDesc}>
                                    {r.protection.verification_level === 'low' && 'Basic: Email verification'}
                                    {r.protection.verification_level === 'medium' && 'Medium: Email + Phone'}
                                    {r.protection.verification_level === 'high' && 'High: Email + Phone + Captcha'}
                                </div>
                            </div>
                            <select value={r.protection.verification_level}
                                onChange={(e) => r.updateSetting('verification_level', e.target.value)}
                                style={styles.select} disabled={!r.protection.enabled}>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        <div style={styles.setting}>
                            <div style={styles.settingInfo}>
                                <div style={styles.settingLabel}>Auto-Kick Suspicious Accounts</div>
                                <div style={styles.settingDesc}>Automatically kick accounts flagged as suspicious</div>
                            </div>
                            <label style={styles.toggleSwitch}>
                                <input type="checkbox" checked={r.protection.auto_kick_suspicious}
                                    onChange={(e) => r.updateSetting('auto_kick_suspicious', e.target.checked)}
                                    disabled={!r.protection.enabled} />
                                <span style={styles.toggleSlider}></span>
                            </label>
                        </div>

                        <div style={styles.setting}>
                            <div style={styles.settingInfo}>
                                <div style={styles.settingLabel}>{'\ud83d\udd12'} Lockdown Mode</div>
                                <div style={styles.settingDesc}>Block ALL new joins (emergency mode)</div>
                            </div>
                            {r.protection.lockdown_mode ? (
                                <button onClick={() => r.updateSetting('lockdown_mode', false)} style={styles.lockdownDeactivateBtn}>Deactivate</button>
                            ) : (
                                <button onClick={r.activateLockdown} style={styles.lockdownBtn} disabled={!r.protection.enabled}>Activate</button>
                            )}
                        </div>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}><FaBolt /> Recent Activity</h3>
                    <div style={styles.activityList}>
                        {r.raidActivity.length === 0 ? (
                            <div style={styles.empty}>No suspicious activity detected</div>
                        ) : (
                            r.raidActivity.map((activity, idx) => (
                                <div key={idx} style={styles.activityItem}>
                                    <div style={styles.activityIcon}>
                                        {activity.type === 'raid' ? '\u26a0\ufe0f' : activity.type === 'suspicious' ? '\ud83d\udc40' : '\u2705'}
                                    </div>
                                    <div style={styles.activityContent}>
                                        <div style={styles.activityText}>{activity.message}</div>
                                        <div style={styles.activityTime}>{new Date(activity.timestamp).toLocaleString()}</div>
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

export default RaidProtectionPanel;
