import React from 'react';
import {
    FaComment,
    FaCrown,
    FaExclamationTriangle,
    FaFile,
    FaGlobe,
    FaImage,
    FaMicrophone,
    FaPaperPlane,
    FaServer,
    FaShieldAlt,
    FaSync,
    FaUsers,
    FaVideo,
} from 'react-icons/fa';
import styles from '../styles';
import { useTranslation } from 'react-i18next';
import css from './AdminTabs.module.css';
import { useAdminAPIContext } from '../AdminAPIContext';

const DashboardTab = () => {
    const { t } = useTranslation();
    const {
        detailedStats,
        fetchDetailedStats,
        fetchLiveActivity,
        fetchSecurityAlerts,
        liveActivities,
        securityAlerts,
        servers,
        setBroadcastModal,
        stats,
        users,
    } = useAdminAPIContext();
    const securityCardStyle = {
        ...styles.statCard,
        borderColor: securityAlerts.length > 0 ? '#e74c3c' : '#2a2a2e',
    };
    return (
        <div>
            {/* Header */}
            <div className={css.headerRow}>
                <div>
                    <h2 className={css.headerWhite20}>📊 Admin Dashboard</h2>
                    <p className={css.subtitleGray}>
                        Last updated: {new Date().toLocaleTimeString()} | Auto-refresh: 10s
                    </p>
                </div>
                <div className={css.flexGap8}>
                    <button
                        aria-label={t('admin.refreshDashboard', 'Refresh dashboard')}
                        onClick={() => {
                            fetchDetailedStats();
                            fetchLiveActivity();
                            fetchSecurityAlerts();
                        }}
                        className={css.actionBtnBluePad}
                    >
                        <FaSync size={12} /> {t('crypto.refresh', 'Refresh')}
                    </button>
                    <button
                        aria-label={t('admin.sendBroadcast', 'Send broadcast')}
                        onClick={() => setBroadcastModal(true)}
                        className={css.actionBtnGreenPad}
                    >
                        <FaPaperPlane size={12} /> {t('admin.broadcast', 'Broadcast')}
                    </button>
                </div>
            </div>

            {/* Realtime Stats Bar */}
            <div className={css.dashGradientBar}>
                <div className={css.textCenter}>
                    <div className={css.valueLgGreen24}>{detailedStats?.users?.online || 0}</div>
                    <div className={css.labelMuted}>{t('🟢_online')}</div>
                </div>
                <div className={css.divider} />
                <div className={css.textCenter}>
                    <div className={css.valueYellow24}>{detailedStats?.users?.idle || 0}</div>
                    <div className={css.labelMuted}>{t('🌙_idle')}</div>
                </div>
                <div className={css.divider} />
                <div className={css.textCenter}>
                    <div className={css.valuePrimaryLg}>
                        {detailedStats?.messages?.last_1h || 0}
                    </div>
                    <div className={css.labelMuted}>{t('💬_son_1_hour_message')}</div>
                </div>
                <div className={css.divider} />
                <div className={css.textCenter}>
                    <div className={css.valueRed24}>{securityAlerts?.length || 0}</div>
                    <div className={css.labelMuted}>{t('admin.panel.securityAlert')}</div>
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className={css.grid6colGap12Mb20}>
                {[
                    {
                        icon: <FaUsers color="#5865f2" />,
                        value: detailedStats?.users?.total || stats?.totalUsers,
                        label: t('adminDash.totalUsers', 'Total Users'),
                        color: '#5865f2',
                    },
                    {
                        icon: <FaGlobe color="#23a559" />,
                        value: detailedStats?.users?.active || stats?.onlineUsers,
                        label: 'Aktif (24s)',
                        color: '#23a559',
                    },
                    {
                        icon: <FaServer color="#f0b132" />,
                        value: detailedStats?.servers?.total || stats?.totalServers,
                        label: 'Sunucu',
                        color: '#f0b132',
                    },
                    {
                        icon: <FaComment color="#e74c3c" />,
                        value: (
                            detailedStats?.messages?.total || stats?.totalMessages
                        )?.toLocaleString(),
                        label: 'Mesajlar',
                        color: '#e74c3c',
                    },
                    {
                        icon: <FaShieldAlt color="#5865f2" />,
                        value: detailedStats?.users?.verified || 0,
                        label: t('adminDash.verified', 'Verified'),
                        color: '#5865f2',
                    },
                    {
                        icon: <FaCrown color="#ffd700" />,
                        value: detailedStats?.premium?.total || stats?.premiumUsers,
                        label: 'Premium',
                        color: '#ffd700',
                    },
                ].map((stat, idx) => (
                    <div key={`item-${idx}`} style={styles.statCard}>
                        <div className={css.flexAlignGap10}>
                            <div className="fs-20">{stat.icon}</div>
                            <div>
                                <div className={css.valueWhite22}>{stat.value || '---'}</div>
                                <div style={styles.statLabel}>{stat.label}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* User Growth + System Health */}
            <div className={css.grid2col}>
                {/* User Growth */}
                <div style={styles.statCard}>
                    <h3 className={css.cardTitle}>{t('📈_user_growth')}</h3>
                    <div className={css.grid4colGap10}>
                        {[
                            {
                                value: `+${detailedStats?.users?.new_1h || 0}`,
                                label: 'Son 1 Saat',
                                color: '#23a559',
                            },
                            {
                                value: `+${detailedStats?.users?.new_24h || 0}`,
                                label: 'Son 24 Saat',
                                color: '#5865f2',
                            },
                            {
                                value: `+${detailedStats?.users?.new_7d || 0}`,
                                label: 'Last 7 Days',
                                color: '#f0b132',
                            },
                            {
                                value: `+${detailedStats?.users?.new_30d || 0}`,
                                label: 'Last 30 Days',
                                color: '#e74c3c',
                            },
                        ].map((item, idx) => {
                            const itemColorStyle = {
                                fontSize: '22px',
                                fontWeight: '700',
                                color: item.color,
                            };
                            return (
                                <div key={`item-${idx}`} className={css.textCenter}>
                                    <div style={itemColorStyle}>{item.value}</div>
                                    <div className={css.labelSm}>{item.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* System Health */}
                <div style={styles.statCard}>
                    <h3 className={css.cardTitle}>{t('admin.panel.systemHealth')}</h3>
                    <div className={css.grid4colGap10}>
                        {[
                            {
                                value: `${detailedStats?.system?.cpu_percent?.toFixed(1) || 0}%`,
                                label: 'CPU',
                                color:
                                    (detailedStats?.system?.cpu_percent || 0) > 80
                                        ? '#e74c3c'
                                        : '#23a559',
                            },
                            {
                                value: `${detailedStats?.system?.memory_percent?.toFixed(1) || 0}%`,
                                label: 'RAM',
                                color:
                                    (detailedStats?.system?.memory_percent || 0) > 80
                                        ? '#e74c3c'
                                        : '#3498db',
                            },
                            {
                                value: `${detailedStats?.system?.disk_percent?.toFixed(1) || 0}%`,
                                label: 'Disk',
                                color:
                                    (detailedStats?.system?.disk_percent || 0) > 90
                                        ? '#e74c3c'
                                        : '#5865f2',
                            },
                            {
                                value: detailedStats?.system?.uptime || '---',
                                label: t('admin.panel.uptime'),
                                color: '#ffd700',
                            },
                        ].map((item, idx) => {
                            const itemColorStyle = {
                                fontSize: '18px',
                                fontWeight: '700',
                                color: item.color,
                            };
                            return (
                                <div key={`item-${idx}`} className={css.textCenter}>
                                    <div style={itemColorStyle}>{item.value}</div>
                                    <div className={css.labelSm}>{item.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Message & Premium Statistics */}
            <div className={css.grid2col}>
                {/* Message Statistics */}
                <div style={styles.statCard}>
                    <h3 className={css.cardTitle}>{t('admin.panel.messageStats')}</h3>
                    <div className={css.grid2colGap10}>
                        {[
                            {
                                value: (detailedStats?.messages?.total || 0).toLocaleString(),
                                label: 'Toplam Mesajlar',
                                color: '#5865f2',
                            },
                            {
                                value: (
                                    detailedStats?.messages?.direct_messages || 0
                                ).toLocaleString(),
                                label: 'DM',
                                color: '#23a559',
                            },
                            {
                                value: (detailedStats?.messages?.reactions || 0).toLocaleString(),
                                label: 'Reaksiyon',
                                color: '#f0b132',
                            },
                            {
                                value: detailedStats?.messages?.pinned || 0,
                                label: t('adminDash.pinned', 'Pinned'),
                                color: '#e74c3c',
                            },
                        ].map((item, idx) => {
                            const itemColorStyle = {
                                fontSize: '18px',
                                fontWeight: '700',
                                color: item.color,
                            };
                            return (
                                <div key={`item-${idx}`} className={css.miniCardCenter}>
                                    <div style={itemColorStyle}>{item.value}</div>
                                    <div className={css.labelSm}>{item.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Premium Gelir */}
                <div style={styles.statCard}>
                    <h3 className={css.cardTitle}>{t('💎_premium_gelir')}</h3>
                    <div className={css.grid3colGap10}>
                        {[
                            {
                                value: detailedStats?.premium?.monthly || 0,
                                label: 'Monthly',
                                color: '#5865f2',
                            },
                            {
                                value: detailedStats?.premium?.yearly || 0,
                                label: 'Yearly',
                                color: '#23a559',
                            },
                            {
                                value: detailedStats?.premium?.lifetime || 0,
                                label: t('admin.panel.lifetimePremium'),
                                color: '#ffd700',
                            },
                        ].map((item, idx) => {
                            const itemColorStyle = {
                                fontSize: '18px',
                                fontWeight: '700',
                                color: item.color,
                            };
                            return (
                                <div key={`item-${idx}`} className={css.miniCardCenter}>
                                    <div style={itemColorStyle}>{item.value}</div>
                                    <div className={css.labelSm}>{item.label}</div>
                                </div>
                            );
                        })}
                    </div>
                    <div className={css.successMiniCard}>
                        <div className={css.valueLgGreen22}>
                            ${(detailedStats?.premium?.estimated_revenue || 0).toLocaleString()}
                        </div>
                        <div className={css.textGray11Alt}>{t('tahmini_monthly_revenue')}</div>
                    </div>
                </div>
            </div>

            {/* Live Activity + Top Serverlar */}
            <div className={css.gridAsymMb20}>
                {/* Live Activity */}
                <div style={styles.statCard}>
                    <h3 className={css.cardTitle}>
                        {t('admin.panel.liveActivity')}
                        <span className={css.textGray10Alt}>{t('●_canli')}</span>
                    </h3>
                    <div className={css.scroll220}>
                        {liveActivities.length === 0 ? (
                            <div className={css.emptyState20}>Aktivite bekleniyor...</div>
                        ) : (
                            liveActivities.map((activity, idx) => {
                                const activityDotStyle = {
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    backgroundColor:
                                        activity.type === 'user_join'
                                            ? '#23a559'
                                            : activity.type === 'message'
                                                ? '#5865f2'
                                                : activity.type === 'server_create'
                                                    ? '#f0b132'
                                                    : activity.type === 'premium'
                                                        ? '#ffd700'
                                                        : '#5865f2',
                                };
                                return (
                                    <div key={`item-${idx}`} className={css.dashActivityRow}>
                                        <div style={activityDotStyle} />
                                        <div className={css.flex1Text12}>
                                            <strong className={css.textWhite}>
                                                {activity.user}
                                            </strong>{' '}
                                            {activity.action}
                                            {activity.target && (
                                                <span className={css.textGray}>
                                                    {' '}
                                                    → {activity.target}
                                                </span>
                                            )}
                                        </div>
                                        <div className={css.textGray10}>{activity.time_ago}</div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Top Serverlar */}
                <div style={styles.statCard}>
                    <h3 className={css.cardTitle}>{t('🏆_top_5_server')}</h3>
                    <div className={css.flexColGap8}>
                        {(detailedStats?.servers?.top_servers || [])
                            .slice(0, 5)
                            .map((server, idx) => {
                                const rankColorStyle = {
                                    color:
                                        idx === 0
                                            ? '#ffd700'
                                            : idx === 1
                                                ? '#c0c0c0'
                                                : idx === 2
                                                    ? '#cd7f32'
                                                    : '#6b7280',
                                };
                                return (
                                    <div key={`item-${idx}`} className={css.dashTopServerRow}>
                                        <div className={css.flexAlignGap8}>
                                            <span style={rankColorStyle}>#{idx + 1}</span>
                                            <span className={css.tableCellText}>{server.name}</span>
                                        </div>
                                        <span className={css.textPrimary12}>
                                            {server.member_count} member
                                        </span>
                                    </div>
                                );
                            })}
                        {(!detailedStats?.servers?.top_servers ||
                            detailedStats.servers.top_servers.length === 0) && (
                                <div className={css.emptyState20}>Server verisi yok</div>
                            )}
                    </div>
                </div>
            </div>

            {/* Security Alerts + File Statistics */}
            <div className={css.grid2col}>
                {/* Security Alerts */}
                <div style={securityCardStyle}>
                    <h3 className={css.cardTitle}>
                        {t('admin.panel.securityAlerts')}
                        {securityAlerts.length > 0 && (
                            <span className={css.dashBadgeDanger}>{securityAlerts.length}</span>
                        )}
                    </h3>
                    <div className={css.scroll150}>
                        {securityAlerts.length === 0 ? (
                            <div className={css.successCenterPad20}>
                                ✅ {t('admin.panel.systemSafe')}
                            </div>
                        ) : (
                            securityAlerts.map((alert, idx) => {
                                const alertRowStyle = {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '8px',
                                    borderBottom: '1px solid #2a2a2e',
                                    backgroundColor:
                                        alert.severity === 'high' ? '#e74c3c20' : '#f0b13220',
                                };
                                return (
                                    <div key={`item-${idx}`} style={alertRowStyle}>
                                        <FaExclamationTriangle
                                            color={
                                                alert.severity === 'high' ? '#e74c3c' : '#f0b132'
                                            }
                                            size={14}
                                        />
                                        <div className={css.flex1}>
                                            <div className={css.tableCellText}>{alert.message}</div>
                                            <div className={css.textGray10}>{alert.time}</div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* File Statistics */}
                <div style={styles.statCard}>
                    <h3 className={css.cardTitle}>{t('📁_file_depolama')}</h3>
                    <div className={css.grid2colGap8}>
                        {[
                            {
                                icon: <FaImage color="#e74c3c" />,
                                label: 'Image',
                                value: detailedStats?.files?.images || 0,
                            },
                            {
                                icon: <FaVideo color="#5865f2" />,
                                label: 'Video',
                                value: detailedStats?.files?.videos || 0,
                            },
                            {
                                icon: <FaMicrophone color="#23a559" />,
                                label: 'Ses',
                                value: detailedStats?.files?.audio || 0,
                            },
                            {
                                icon: <FaFile color="#f0b132" />,
                                label: 'Other',
                                value: detailedStats?.files?.other || 0,
                            },
                        ].map((item, idx) => (
                            <div key={`item-${idx}`} className={css.dashItemCard}>
                                {item.icon}
                                <div>
                                    <div className={css.labelMd}>{item.value}</div>
                                    <div className={css.textGray10}>{item.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={css.miniCardCenterMt10}>
                        <div className={css.valuePrimary}>
                            {detailedStats?.files?.total_storage || '0 MB'}
                        </div>
                        <div className={css.labelSm}>{t('toplam_depolama')}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DashboardTab;
