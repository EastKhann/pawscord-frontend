/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    FaShieldAlt,
    FaExclamationCircle,
    FaUserSlash,
    FaBolt,
    FaChartBar,
    FaCog,
    FaTimes,
} from 'react-icons/fa';
import useRaidProtection from '../RaidProtectionPanel/useRaidProtection';
import { styles } from '../RaidProtectionPanel/raidProtectionStyles';

const S = {
    txt3: { ...styles.statIcon, color: '#5865f2' },
    txt: { ...styles.statIcon, color: '#f23f42' },
    txt2: { ...styles.statIcon, color: '#f0b132' },
};

const RaidProtectionPanel = ({ serverId, fetchWithAuth, apiBaseUrl, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const r = useRaidProtection(serverId, fetchWithAuth, apiBaseUrl);

    return (
        <div
            style={styles.overlay}
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                style={styles.panel}
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaShieldAlt
                            style={{
                                ...styles.headerIcon,
                                color: r.protection.enabled ? '#23a559' : '#949ba4',
                            }}
                        />
                        <h2 style={styles.title}>Baskın Koruması</h2>
                        {r.protection.lockdown_mode && (
                            <span style={styles.lockdownBadge}>🔒 LOCKDOWN</span>
                        )}
                    </div>
                    <button aria-label="Close" onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.statsGrid}>
                    <div style={styles.statCard}>
                        <FaUserSlash style={S.txt} />
                        <div style={styles.statValue}>{r.stats.blocked_joins}</div>
                        <div style={styles.statLabel}>Engellenen Katılımlar</div>
                    </div>
                    <div style={styles.statCard}>
                        <FaBolt style={S.txt2} />
                        <div style={styles.statValue}>{r.stats.kicked_users}</div>
                        <div style={styles.statLabel}>Otomatik Atıldı</div>
                    </div>
                    <div style={styles.statCard}>
                        <FaExclamationCircle style={S.txt} />
                        <div style={styles.statValue}>{r.stats.raid_attempts}</div>
                        <div style={styles.statLabel}>Baskın Denemeleri</div>
                    </div>
                    <div style={styles.statCard}>
                        <FaChartBar style={S.txt3} />
                        <div style={styles.statValue}>
                            {r.protection.enabled ? 'ACTIVE' : 'OFF'}
                        </div>
                        <div style={styles.statLabel}>Durum</div>
                    </div>
                </div>

                <div style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <h3 style={styles.sectionTitle}>
                            <FaCog /> Protection Settings
                        </h3>
                        <label style={styles.masterSwitch}>
                            <input
                                type="checkbox"
                                checked={r.protection.enabled}
                                onChange={r.toggleProtection}
                                aria-label="checkbox"
                            />
                            <span style={styles.switchSlider}></span>
                            <span style={styles.switchLabel}>
                                {r.protection.enabled ? 'Enabled' : 'Disabled'}
                            </span>
                        </label>
                    </div>

                    <div style={styles.settings}>
                        <div style={styles.setting}>
                            <div style={styles.settingInfo}>
                                <div style={styles.settingLabel}>Katılım Hızı Limiti</div>
                                <div style={styles.settingDesc}>
                                    Maximum users per minute: {r.protection.join_rate_limit}
                                </div>
                            </div>
                            <input
                                type="range"
                                min="5"
                                max="50"
                                value={r.protection.join_rate_limit}
                                onChange={(e) =>
                                    r.updateSetting('join_rate_limit', parseInt(e.target.value))
                                }
                                style={styles.slider}
                                disabled={!r.protection.enabled}
                            />
                        </div>

                        <div style={styles.setting}>
                            <div style={styles.settingInfo}>
                                <div style={styles.settingLabel}>Yeni Hesap Yaşı Sınırı</div>
                                <div style={styles.settingDesc}>
                                    Block accounts younger than {r.protection.new_account_age} days
                                </div>
                            </div>
                            <select
                                value={r.protection.new_account_age}
                                onChange={(e) =>
                                    r.updateSetting('new_account_age', parseInt(e.target.value))
                                }
                                style={styles.select}
                                disabled={!r.protection.enabled}
                            >
                                <option value="1">1 day</option>
                                <option value="3">3 days</option>
                                <option value="7">7 days</option>
                                <option value="14">14 days</option>
                                <option value="30">30 days</option>
                            </select>
                        </div>

                        <div style={styles.setting}>
                            <div style={styles.settingInfo}>
                                <div style={styles.settingLabel}>Doğrulama Seviyesi</div>
                                <div style={styles.settingDesc}>
                                    {r.protection.verification_level === 'low' &&
                                        'Basic: Email verification'}
                                    {r.protection.verification_level === 'medium' &&
                                        'Medium: Email + Phone'}
                                    {r.protection.verification_level === 'high' &&
                                        'High: Email + Phone + Captcha'}
                                </div>
                            </div>
                            <select
                                value={r.protection.verification_level}
                                onChange={(e) =>
                                    r.updateSetting('verification_level', e.target.value)
                                }
                                style={styles.select}
                                disabled={!r.protection.enabled}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        <div style={styles.setting}>
                            <div style={styles.settingInfo}>
                                <div style={styles.settingLabel}>Auto-Kick Suspicious Accounts</div>
                                <div style={styles.settingDesc}>
                                    Şüpheli olarak işaretlenen hesapları otomatik olarak at
                                </div>
                            </div>
                            <label style={styles.toggleSwitch}>
                                <input
                                    type="checkbox"
                                    checked={r.protection.auto_kick_suspicious}
                                    onChange={(e) =>
                                        r.updateSetting('auto_kick_suspicious', e.target.checked)
                                    }
                                    disabled={!r.protection.enabled}
                                />
                                <span style={styles.toggleSlider}></span>
                            </label>
                        </div>

                        <div style={styles.setting}>
                            <div style={styles.settingInfo}>
                                <div style={styles.settingLabel}>🔒 Lockdown Mode</div>
                                <div style={styles.settingDesc}>
                                    Block ALL new joins (emergency mode)
                                </div>
                            </div>
                            {r.protection.lockdown_mode ? (
                                <button
                                    aria-label="Devre Dışı Bırak"
                                    onClick={() => r.updateSetting('lockdown_mode', false)}
                                    style={styles.lockdownDeactivateBtn}
                                >
                                    Devre Dışı Bırak
                                </button>
                            ) : (
                                <button
                                    aria-label="Kilitleme Modunu Etkinleştir"
                                    onClick={r.activateLockdown}
                                    style={styles.lockdownBtn}
                                    disabled={!r.protection.enabled}
                                >
                                    Etkinleştir
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>
                        <FaBolt /> Recent Activity
                    </h3>
                    <div style={styles.activityList}>
                        {r.raidActivity.length === 0 ? (
                            <div style={styles.empty}>Şüpheli aktivite algılanmadı</div>
                        ) : (
                            r.raidActivity.map((activity, idx) => (
                                <div key={`item-${idx}`} style={styles.activityItem}>
                                    <div style={styles.activityIcon}>
                                        {activity.type === 'raid'
                                            ? '⚠️'
                                            : activity.type === 'suspicious'
                                              ? '👀'
                                              : '✅'}
                                    </div>
                                    <div style={styles.activityContent}>
                                        <div style={styles.activityText}>{activity.message}</div>
                                        <div style={styles.activityTime}>
                                            {new Date(activity.timestamp).toLocaleString()}
                                        </div>
                                    </div>
                                    {activity.action && (
                                        <div style={styles.activityAction}>
                                            <span style={styles.actionBadge}>
                                                {activity.action}
                                            </span>
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
                        <strong>Baskın Koruması Nasıl Çalışır:</strong>
                        <ul style={styles.infoList}>
                            <li>Katılım hızını izler (dakikada kullanıcı sayısı)</li>
                            <li>Hesap yaşını ve aktiviteyi kontrol eder</li>
                            <li>Şüpheli desenleri otomatik olarak atar</li>
                            <li>Aktif baskınlarda kilitlenme modülü devreye girer</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

RaidProtectionPanel.propTypes = {
    serverId: PropTypes.string,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
};
export default RaidProtectionPanel;
