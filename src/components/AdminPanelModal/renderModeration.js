/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import React from 'react';
import { FaBan, FaFlag, FaHistory, FaShieldAlt, FaUnlock } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import css from './tabs/AdminTabs.module.css';
import PropTypes from 'prop-types';
import styles from './styles';

const S = {
    grid: {
        display: 'grid',
        gap: '12px',
        marginBottom: '20px',
    },
};

// Extracted from AdminPanelModal.js
const renderModeration = () => {
    const { t } = useTranslation();
    return (
        <div aria-label="render moderation">
            <h2 className="white-18-mb16">{t('🛡️_moderasyon_merkezi')}</h2>

            {/* Quick Actions */}
            <div className="admin-grid-4" style={S.grid}>
                {[
                    {
                        icon: <FaShieldAlt />,
                        title: t('ui.mod_araçlari'),
                        color: '#e74c3c',
                        action: onOpenModTools,
                    },
                    {
                        icon: <FaFlag />,
                        title: t('admin.mod.reports', 'Raporlar'),
                        color: '#f0b132',
                        badge: '3',
                        action: onOpenReports,
                    },
                    {
                        icon: <FaHistory />,
                        title: t('admin.mod.auditLog', 'Denetim Log'),
                        color: '#5865f2',
                        action: onOpenAuditLogs,
                    },
                    {
                        icon: <FaBan />,
                        title: t('admin.mod.banList', 'Ban Listesi'),
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
                                <div className="white-bold-13">{item.title}</div>
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
                <h3 className="white-14-mb14">{t('🚫_banned_users')}</h3>
                <div className="rounded-8">
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>{t('user')}</th>
                                <th style={styles.th}>{t('sebep')}</th>
                                <th style={styles.th}>{t('date')}</th>
                                <th style={styles.th}>{t('banyan')}</th>
                                <th style={styles.th}>{t('i̇şlem')}</th>
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
                                            style={styles.actionBtn('#23a559')}
                                            onClick={() => handleUserAction('unban', user.id)}
                                        >
                                            <FaUnlock /> {t('admin.mod.remove', 'Kaldır')}
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

renderModeration.propTypes = {};
