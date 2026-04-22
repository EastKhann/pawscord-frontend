import React from 'react';
import { useAdminAPIContext } from '../AdminAPIContext';
import { FaBan, FaFlag, FaHistory, FaShieldAlt, FaUnlock } from 'react-icons/fa';
import styles from '../styles';
import { useTranslation } from 'react-i18next';
import css from './AdminTabs.module.css';

const ModerationTab = () => {
    const { bannedUsers, handleUserAction, onOpenAuditLogs, onOpenModTools, onOpenReports } =
        useAdminAPIContext();
    const { t } = useTranslation();
    return (
        <div>
            <h2 className={css.sectionTitle}>{t('🛡️_moderasyon_merkezi')}</h2>

            {/* Quick Actions */}
            <div className={css.grid4colGap12}>
                {[
                    {
                        icon: <FaShieldAlt />,
                        title: t('admin.panel.modTools'),
                        color: '#e74c3c',
                        action: onOpenModTools,
                    },
                    {
                        icon: <FaFlag />,
                        title: 'Raporlar',
                        color: '#f0b132',
                        badge: '3',
                        action: onOpenReports,
                    },
                    {
                        icon: <FaHistory />,
                        title: 'Denetim Log',
                        color: '#5865f2',
                        action: onOpenAuditLogs,
                    },
                    {
                        icon: <FaBan />,
                        title: 'Ban Listesi',
                        color: '#5865f2',
                        badge: bannedUsers.length.toString(),
                    },
                ].map((item, idx) => (
                    <div
                        key={`item-${idx}`}
                        style={styles.statCardBtn}
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                            item.action?.();
                        }}
                        onKeyDown={(e) =>
                            (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                        }
                    >
                        <div className={css.flexAlignGap10}>
                            <div style={{ fontSize: '24px', color: item.color }}>{item.icon}</div>
                            <div>
                                <div className={css.labelLg}>{item.title}</div>
                                {item.badge && (
                                    <span style={styles.badge(item.color)}>{item.badge}</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Banned Users */}
            <div style={styles.statCard}>
                <h3 className={css.cardTitle}>{t('admin.panel.bannedUsers')}</h3>
                <div className="rounded-8">
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>{t('user')}</th>
                                <th style={styles.th}>{t('sebep')}</th>
                                <th style={styles.th}>{t('date')}</th>
                                <th style={styles.th}>{t('banyan')}</th>
                                <th style={styles.th}>{t('admin.panel.operation')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bannedUsers.map((user) => (
                                <tr key={user.id}>
                                    <td style={styles.td}>{user.username}</td>
                                    <td style={styles.td}>{user.reason}</td>
                                    <td style={styles.td}>{user.banned_at}</td>
                                    <td style={styles.td}>{user.banned_by}</td>
                                    <td style={styles.td}>
                                        <button
                                            aria-label={t('ban.removeBan', 'Remove ban')}
                                            style={styles.actionBtn('#23a559')}
                                            onClick={() => handleUserAction('unban', user.id)}
                                        >
                                            <FaUnlock /> {t('common.remove', 'Remove')}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default ModerationTab;
