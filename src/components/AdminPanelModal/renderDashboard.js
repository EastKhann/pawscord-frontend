/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
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

import { useTranslation } from 'react-i18next';

import css from './tabs/AdminTabs.module.css';

import PropTypes from 'prop-types';
import styles from './styles';

const S = {
    bg: { textAlign: 'center', backgroundColor: '#111113', padding: '10px', borderRadius: '8px' },
};

// Extracted from AdminPanelModal.js

const renderDashboard = () => {
    const { t } = useTranslation();

    const securityCardStyle = {
        ...styles.statCard,
        borderColor: securityAlerts.length > 0 ? '#e74c3c' : '#2a2a2e',
    };

    return (
        <div aria-label={t('admin.dashboard', 'Dashboard')}>
            {/* Header */}

            <div className={css.flexBetweenMb20}>
                <div>
                    <h2 className={css.headerWhite20}>{t('📊_admin_dashboard')}</h2>

                    <p className={css.subtitleGray}>
                        {t('admin.dashboard.lastUpdate', 'Son güncelleme')}:{' '}
                        {new Date().toLocaleTimeString('tr-TR')} |{' '}
                        {t('admin.dashboard.autoRefresh', 'Auto-refresh')}: 10s
                    </p>
                </div>

                <div className={css.flexGap8}>
                    <button
                        onClick={() => {
                            fetchDetailedStats();
                            fetchLiveActivity();
                            fetchSecurityAlerts();
                        }}
                        className={css.actionBtnBluePad}
                    >
                        <FaSync size={12} /> {t('admin.dashboard.refresh', 'Yenile')}
                    </button>

                    <button
                        onClick={() => setBroadcastModal(true)}
                        className={css.actionBtnGreenPad}
                    >
                        <FaPaperPlane size={12} /> {t('admin.dashboard.broadcast', 'Yayınla')}
                    </button>
                </div>
            </div>

            {/* Realtime Stats Bar - GERÇEK VERİLER */}

            <div className={css.dashGradientBar}>
                <div className={css.textCenter}>
                    <div className={css.valueLgGreen24}>{detailedStats?.users?.online || 0}</div>

                    <div className={css.textGray9c11}>{t('🟢_online')}</div>
                </div>

                <div className={css.dividerV} />

                <div className={css.textCenter}>
                    <div className={css.valueYellow24}>{detailedStats?.users?.idle || 0}</div>

                    <div className={css.textGray9c11}>{t('🌙_idle')}</div>
                </div>

                <div className={css.dividerV} />

                <div className={css.textCenter}>
                    <div className={css.valuePrimary24}>
                        {detailedStats?.messages?.last_1h || 0}
                    </div>

                    <div className={css.textGray9c11}>{t('💬_son_1_hour_message')}</div>
                </div>

                <div className={css.dividerV} />

                <div className={css.textCenter}>
                    <div className={css.valueRed24}>{securityAlerts?.length || 0}</div>

                    <div className={css.textGray9c11}>{t('⚠️_security_uyarısı')}</div>
                </div>
            </div>

            {/* Main Stats Grid - GERÇEK VERİLER */}

            <div className={css.grid6colGap12Mb20}>
                {[
                    {
                        icon: <FaUsers color="#5865f2" />,
                        value: detailedStats?.users?.total || stats?.totalUsers,
                        label: t('admin.dashboard.totalUsers'),
                        color: '#5865f2',
                    },

                    {
                        icon: <FaGlobe color="#23a559" />,
                        value: detailedStats?.users?.active || stats?.onlineUsers,
                        label: t('admin.dashboard.activeUsers'),
                        color: '#23a559',
                    },

                    {
                        icon: <FaServer color="#f0b132" />,
                        value: detailedStats?.servers?.total || stats?.totalServers,
                        label: t('admin.dashboard.serverCount'),
                        color: '#f0b132',
                    },

                    {
                        icon: <FaComment color="#e74c3c" />,
                        value: (
                            detailedStats?.messages?.total || stats?.totalMessages
                        )?.toLocaleString(),
                        label: t('admin.dashboard.messageCount'),
                        color: '#e74c3c',
                    },

                    {
                        icon: <FaShieldAlt color="#5865f2" />,
                        value: detailedStats?.users?.verified || 0,
                        label: t('admin.dashboard.verified'),
                        color: '#5865f2',
                    },

                    {
                        icon: <FaCrown color="#ffd700" />,
                        value: detailedStats?.premium?.total || stats?.premiumUsers,
                        label: t('admin.dashboard.premiumCount'),
                        color: '#ffd700',
                    },
                ].map((stat, idx) => (
                    <div key={`item-${idx}`} style={styles.statCard}>
                        <div className={css.flexAlignGap10}>
                            <div className={css.fs20}>{stat.icon}</div>

                            <div>
                                <div className={css.valueWhite22}>{stat.value || '---'}</div>

                                <div style={styles.statLabel}>{stat.label}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* User Büyüme + Sistem Sağlığı */}

            <div className={css.grid2colGap16Mb20}>
                {/* User Growth */}

                <div style={styles.statCard}>
                    <h3 className="white-14-mb14">{t('📈_user_growth')}</h3>

                    <div className={css.grid4colGap10}>
                        {[
                            {
                                value: `+${detailedStats?.users?.new_1h || 0}`,
                                label: t('admin.dashboard.last1h'),
                                color: '#23a559',
                            },

                            {
                                value: `+${detailedStats?.users?.new_24h || 0}`,
                                label: t('admin.dashboard.last24h'),
                                color: '#5865f2',
                            },

                            {
                                value: `+${detailedStats?.users?.new_7d || 0}`,
                                label: t('admin.dashboard.last7d'),
                                color: '#f0b132',
                            },

                            {
                                value: `+${detailedStats?.users?.new_30d || 0}`,
                                label: t('admin.dashboard.last30d'),
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

                                    <div className={css.textGray6b10}>{item.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Sistem Sağlığı - GERÇEK */}

                <div style={styles.statCard}>
                    <h3 className="white-14-mb14">{t('⚡_sistem_sağlığı')}</h3>

                    <div className={css.grid4colGap10}>
                        {[
                            {
                                value: `${detailedStats?.system?.cpu_percent?.toFixed(1) || 0}%`,

                                label: t('admin.health.cpu'),

                                color:
                                    (detailedStats?.system?.cpu_percent || 0) > 80
                                        ? '#e74c3c'
                                        : '#23a559',
                            },

                            {
                                value: `${detailedStats?.system?.memory_percent?.toFixed(1) || 0}%`,

                                label: t('admin.health.memory'),

                                color:
                                    (detailedStats?.system?.memory_percent || 0) > 80
                                        ? '#e74c3c'
                                        : '#3498db',
                            },

                            {
                                value: `${detailedStats?.system?.disk_percent?.toFixed(1) || 0}%`,

                                label: t('admin.health.disk'),

                                color:
                                    (detailedStats?.system?.disk_percent || 0) > 90
                                        ? '#e74c3c'
                                        : '#5865f2',
                            },

                            {
                                value: detailedStats?.system?.uptime || '---',

                                label: t('ui.calisma'),

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

                                    <div className={css.textGray6b10}>{item.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Mesaj & Premium İstatistikleri */}

            <div className={css.grid2colGap16Mb20}>
                {/* Mesaj İstatistikleri */}

                <div style={styles.statCard}>
                    <h3 className="white-14-mb14">{t('💬_mesaj_istatistikleri')}</h3>

                    <div className={css.grid2colGap10}>
                        {[
                            {
                                value: (detailedStats?.messages?.total || 0).toLocaleString(),
                                label: t('admin.dashboard.totalMessages'),
                                color: '#5865f2',
                            },

                            {
                                value: (
                                    detailedStats?.messages?.direct_messages || 0
                                ).toLocaleString(),
                                label: t('admin.dashboard.dmCount'),
                                color: '#23a559',
                            },

                            {
                                value: (detailedStats?.messages?.reactions || 0).toLocaleString(),
                                label: t('admin.dashboard.reactions'),
                                color: '#f0b132',
                            },

                            {
                                value: detailedStats?.messages?.pinned || 0,
                                label: t('admin.dashboard.pinned'),
                                color: '#e74c3c',
                            },
                        ].map((item, idx) => {
                            const itemColorStyle = {
                                fontSize: '18px',
                                fontWeight: '700',
                                color: item.color,
                            };

                            return (
                                <div key={`item-${idx}`} style={S.bg}>
                                    <div style={itemColorStyle}>{item.value}</div>

                                    <div className={css.textGray6b10}>{item.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Premium Gelir */}

                <div style={styles.statCard}>
                    <h3 className="white-14-mb14">{t('💎_premium_gelir')}</h3>

                    <div className={css.grid3colGap10}>
                        {[
                            {
                                value: detailedStats?.premium?.monthly || 0,
                                label: t('admin.dashboard.monthly', 'Aylık'),
                                color: '#5865f2',
                            },

                            {
                                value: detailedStats?.premium?.yearly || 0,
                                label: t('admin.dashboard.yearly', 'Yıllık'),
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
                                <div key={`item-${idx}`} style={S.bg}>
                                    <div style={itemColorStyle}>{item.value}</div>

                                    <div className={css.textGray6b10}>{item.label}</div>
                                </div>
                            );
                        })}
                    </div>

                    <div className={css.successMiniCard}>
                        <div className={css.valueLgGreen22}>
                            ${(detailedStats?.premium?.estimated_revenue || 0).toLocaleString()}
                        </div>

                        <div className={css.textGray6b11}>{t('tahmini_monthly_revenue')}</div>
                    </div>
                </div>
            </div>

            {/* Live Activity + Top Serverlar */}

            <div className={css.gridAsym16Mb20}>
                {/* Canlı Aktivite */}

                <div style={styles.statCard}>
                    <h3 className="white-14-mb14">
                        📡 {t('admin.dashboard.liveActivity', 'Canlı Aktivite')}
                        <span className={css.liveSpan10Green}>{t('🔴_canli')}</span>
                    </h3>

                    <div className={css.scroll220}>
                        {liveActivities.length === 0 ? (
                            <div className={css.textCenterGray20}>
                                {t('admin.dashboard.waitingActivity', 'Aktivite bekleniyor...')}
                            </div>
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
                                            <strong className="text-white">{activity.user}</strong>{' '}
                                            {activity.action}
                                            {activity.target && (
                                                <span className="icon-gray6b">
                                                    {' '}
                                                    → {activity.target}
                                                </span>
                                            )}
                                        </div>

                                        <div className={css.textGray6b10}>{activity.time_ago}</div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Top Serverlar */}

                <div style={styles.statCard}>
                    <h3 className="white-14-mb14">{t('🏆_top_5_server')}</h3>

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

                                            <span className={css.textLightGray12}>
                                                {server.name}
                                            </span>
                                        </div>

                                        <span className={css.textPrimary12}>
                                            {server.member_count}{' '}
                                            {t('admin.dashboard.member', 'üye')}
                                        </span>
                                    </div>
                                );
                            })}

                        {(!detailedStats?.servers?.top_servers ||
                            detailedStats.servers.top_servers.length === 0) && (
                                <div className={css.textCenterGray20}>
                                    {t('admin.dashboard.noServerData', 'Server verisi yok')}
                                </div>
                            )}
                    </div>
                </div>
            </div>

            {/* Security Uyarıları + File İstatistikleri */}

            <div className={css.grid2colGap16}>
                {/* Security Uyarıları */}

                <div style={securityCardStyle}>
                    <h3 className="white-14-mb14">
                        🛡️ {t('admin.dashboard.securityWarnings', 'Güvenlik Uyarıları')}
                        {securityAlerts.length > 0 && (
                            <span className={css.dashBadgeDanger}>{securityAlerts.length}</span>
                        )}
                    </h3>

                    <div className={css.scroll150}>
                        {securityAlerts.length === 0 ? (
                            <div className={css.successCenterPad20}>
                                ✅{' '}
                                {t('admin.dashboard.noSecurityWarnings', 'Güvenlik uyardısı yok')}
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
                                            <div className={css.textLightGray12}>
                                                {alert.message}
                                            </div>

                                            <div className={css.textGray6b10}>{alert.time}</div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* File İstatistikleri */}

                <div style={styles.statCard}>
                    <h3 className="white-14-mb14">{t('📁_file_depolama')}</h3>

                    <div className={css.grid2colGap8}>
                        {[
                            {
                                icon: <FaImage color="#e74c3c" />,
                                label: t('admin.dashboard.image', 'Resim'),
                                value: detailedStats?.files?.images || 0,
                            },

                            {
                                icon: <FaVideo color="#5865f2" />,
                                label: t('admin.dashboard.video', 'Video'),
                                value: detailedStats?.files?.videos || 0,
                            },

                            {
                                icon: <FaMicrophone color="#23a559" />,
                                label: t('admin.dashboard.audio', 'Ses'),
                                value: detailedStats?.files?.audio || 0,
                            },

                            {
                                icon: <FaFile color="#f0b132" />,
                                label: t('admin.dashboard.other', 'Diğer'),
                                value: detailedStats?.files?.other || 0,
                            },
                        ].map((item, idx) => (
                            <div key={`item-${idx}`} className={css.dashItemCard}>
                                {item.icon}

                                <div>
                                    <div className={css.textWhiteBold14}>{item.value}</div>

                                    <div className={css.textGray6b10}>{item.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={css.miniCardCenterMt10}>
                        <div className={css.valueBlue16}>
                            {detailedStats?.files?.total_storage || '0 MB'}
                        </div>

                        <div className={css.textGray6b10}>{t('toplam_depolama')}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

renderDashboard.propTypes = {};
