/* eslint-disable no-irregular-whitespace */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { FaCode, FaDownload, FaSync, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import css from './tabs/AdminTabs.module.css';
import PropTypes from 'prop-types';
import styles from './styles';

const S = {
    border: { borderBottom: '1px solid #1a1a1e' },
    mar: { fontSize: '24px', marginBottom: '10px' },
};

function getLogTypeBadgeStyle(type) {
    const bgMap = {
        error: '#f8514920',
        security: '#f0b13220',
        login: '#23a55920',
        moderation: '#5865f220',
        api: '#3498db20',
    };
    const colorMap = {
        error: '#f85149',
        security: '#f0b132',
        login: '#23a559',
        moderation: '#5865f2',
        api: '#3498db',
    };
    return {
        padding: '2px 6px',
        borderRadius: '4px',
        fontSize: '10px',
        backgroundColor: bgMap[type] || '#5865f220',
        color: colorMap[type] || '#5865f2',
    };
}
function getLogSeverityBadgeStyle(severity) {
    const isError = severity === 'error' || severity === 'critical';
    return {
        padding: '2px 6px',
        borderRadius: '4px',
        fontSize: '10px',
        backgroundColor: isError ? '#f8514920' : severity === 'warning' ? '#d2992220' : '#23a55920',
        color: isError ? '#f85149' : severity === 'warning' ? '#d29922' : '#3fb950',
    };
}
function getActivityIconStyle(type) {
    const bgMap = { login: '#23a55930', message: '#5865f230', moderation: '#e74c3c30' };
    return {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        backgroundColor: bgMap[type] || '#f0b13230',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };
}

// Extracted from AdminPanelModal.js
const renderLogs = () => {
    const { t } = useTranslation();
    return (
        <div>
            {/* Header & Filters */}
            <div className={css.flexBetweenWrapGap10}>
                <h2 className={css.headerWhite18}>{t('📋_gelişmiş_sistem_logları')}</h2>
                <div className={css.flexWrapGap8}>
                    <select
                        value={logType}
                        onChange={(e) => setLogType(e.target.value)}
                        className={css.siW120}
                    >
                        <option value="all">{t('🔄_all')}</option>
                        <option value="audit">{t('📝_audit')}</option>
                        <option value="login">{t('🔐_login')}</option>
                        <option value="error">{t('❌_error')}</option>
                        <option value="security">{t('🛡️_security')}</option>
                        <option value="moderation">{t('⚖️_moderation')}</option>
                        <option value="api">{t('🌐_api')}</option>
                    </select>
                    <select
                        value={logSeverity}
                        onChange={(e) => setLogSeverity(e.target.value)}
                        className={css.siW100}
                    >
                        <option value="">{t('severity')}</option>
                        <option value="info">{t('ℹ️_info')}</option>
                        <option value="warning">{t('⚠️_warning')}</option>
                        <option value="error">{t('🔴_error')}</option>
                        <option value="critical">{t('💀_critical')}</option>
                    </select>
                    <input
                        type="text"
                        placeholder={t('🔍_search')}
                        value={logSearch}
                        onChange={(e) => setLogSearch(e.target.value)}
                        className={css.siW150}
                    />
                    <button
                        onClick={fetchSystemLogs}
                        style={styles.actionBtn('#5865f2')}
                        disabled={logLoading}
                    >
                        <FaSync className={logLoading ? 'spin' : ''} />{' '}
                        {t('admin.logs.refresh', 'Yenile')}
                    </button>
                    <div className={css.relative}>
                        <button
                            style={styles.actionBtn('#23a559')}
                            onClick={() => handleExportLogs('csv')}
                        >
                            <FaDownload /> CSV
                        </button>
                    </div>
                    <button
                        style={styles.actionBtn('#f0b132')}
                        onClick={() => handleExportLogs('json')}
                    >
                        <FaCode /> JSON
                    </button>
                </div>
            </div>

            {/* Date Range Filters */}
            <div className={css.flexAlignGap10Mb16}>
                <span className="text-a0-12">{t('📅_date')}</span>
                <input
                    type="date"
                    value={logDateFrom}
                    onChange={(e) => setLogDateFrom(e.target.value)}
                    className={css.siW140}
                />
                <span className="text-666">→</span>
                <input
                    type="date"
                    value={logDateTo}
                    onChange={(e) => setLogDateTo(e.target.value)}
                    className={css.siW140}
                />
                {(logDateFrom || logDateTo) && (
                    <button
                        onClick={() => {
                            setLogDateFrom('');
                            setLogDateTo('');
                        }}
                        style={styles.actionBtnRedSm}
                    >
                        ✕ {t('admin.logs.clear', 'Temizle')}
                    </button>
                )}
            </div>

            {/* Stats Cards */}
            {logStats && (
                <div className={css.grid6colGap10Mb16}>
                    {[
                        {
                            label: t('admin.logs.audit', 'Denetim'),
                            count: logStats.audit_count,
                            color: '#5865f2',
                            icon: '📝',
                        },
                        {
                            label: t('admin.logs.login', 'Giriş'),
                            count: logStats.login_count,
                            color: '#23a559',
                            icon: '🔐',
                        },
                        {
                            label: t('admin.logs.errors', 'Hatalar'),
                            count: logStats.error_count,
                            color: '#e74c3c',
                            icon: '❌',
                        },
                        {
                            label: t('admin.logs.security', 'Güvenlik'),
                            count: logStats.security_count,
                            color: '#f0b132',
                            icon: '🛡️',
                        },
                        {
                            label: t('admin.logs.moderation', 'Moderasyon'),
                            count: logStats.moderation_count,
                            color: '#5865f2',
                            icon: '⚖️',
                        },
                        {
                            label: t('admin.logs.api', 'API'),
                            count: logStats.api_count,
                            color: '#3498db',
                            icon: '🌐',
                        },
                    ].map((stat, idx) => {
                        const statBgStyle = {
                            backgroundColor: '#1a1a1e',
                            borderRadius: '8px',
                            padding: '10px',
                            textAlign: 'center',
                            border: `1px solid ${stat.color}30`,
                        };
                        const statValueStyle = {
                            color: stat.color,
                            fontWeight: '700',
                            fontSize: '18px',
                        };
                        return (
                            <div key={`item-${idx}`} style={statBgStyle}>
                                <div className={css.icon20Mb4}>{stat.icon}</div>
                                <div style={statValueStyle}>
                                    {(stat.count || 0).toLocaleString()}
                                </div>
                                <div className={css.textGray88_11}>{stat.label}</div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Logs Table */}
            <div className={css.logPanel}>
                {logLoading ? (
                    <div className={css.emptyState40}>
                        <FaSync className="spin" style={S.mar} />
                        <div>{t('loading_logs')}</div>
                    </div>
                ) : systemLogs.length === 0 ? (
                    <div className={css.emptyState40}>
                        📭 {t('admin.logs.noLogs', 'Kayıt bulunamadı')}
                    </div>
                ) : (
                    <table className={css.tableBase}>
                        <thead className="sticky-header">
                            <tr>
                                <th className={css.thW150}>{t('zaman')}</th>
                                <th className={css.thW80}>{t('tip')}</th>
                                <th className={css.thW70}>{t('severity')}</th>
                                <th className={css.thW120}>{t('actor')}</th>
                                <th style={styles.th}>{t('action_details')}</th>
                                <th className={css.thW120}>{t('ip')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {systemLogs.map((log, idx) => (
                                <tr key={log.id || idx} style={S.border}>
                                    <td className={css.tdDark11}>
                                        {new Date(log.timestamp).toLocaleString('tr-TR')}
                                    </td>
                                    <td style={styles.td}>
                                        <span style={getLogTypeBadgeStyle(log.type)}>
                                            {log.type}
                                        </span>
                                    </td>
                                    <td style={styles.td}>
                                        <span style={getLogSeverityBadgeStyle(log.severity)}>
                                            {log.severity}
                                        </span>
                                    </td>
                                    <td className={css.tdFs12}>
                                        <span
                                            role="button"
                                            tabIndex={0}
                                            className="text-5865-link"
                                            onClick={() =>
                                                log.actor !== 'System' &&
                                                log.actor !== 'Anonymous' &&
                                                log.actor !== 'AutoMod' &&
                                                fetchUserActivity(log.actor)
                                            }
                                            onKeyDown={(e) =>
                                                (e.key === 'Enter' || e.key === ' ') &&
                                                log.actor !== 'System' &&
                                                log.actor !== 'Anonymous' &&
                                                log.actor !== 'AutoMod' &&
                                                fetchUserActivity(log.actor)
                                            }
                                        >
                                            {log.actor || t('admin.logs.system', 'Sistem')}
                                        </span>
                                    </td>
                                    <td className={css.tdFs11}>
                                        <div className={css.textLightGray}>{log.action}</div>
                                        {log.details && typeof log.details === 'object' && (
                                            <div className={css.textGray10Alt}>
                                                {Object.entries(log.details)
                                                    .slice(0, 3)
                                                    .map(([k, v]) => (
                                                        <span key={k} className="mr-8">
                                                            {k}:{' '}
                                                            {typeof v === 'object'
                                                                ? JSON.stringify(v).slice(0, 30)
                                                                : String(v).slice(0, 30)}
                                                        </span>
                                                    ))}
                                            </div>
                                        )}
                                    </td>
                                    <td className={css.tdGray11}>{log.ip_address || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* User Activity Modal */}
            {userActivityModal && (
                <div className={css.logModalOverlay}>
                    <div className={css.logModalContent}>
                        <div className={css.flexBetweenMb16}>
                            <h3 className="white-m0">
                                👤 {userActivityModal.user?.username}{' '}
                                {t('admin.logs.activityTimeline', 'Aktivite Zaman Çizelgesi')}
                            </h3>
                            <button
                                onClick={() => setUserActivityModal(null)}
                                style={styles.actionBtn('#e74c3c')}
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* User Info */}
                        <div className={css.darkCardSm}>
                            <div className={css.grid3colGap10}>
                                <div>
                                    <span className={css.textGray88}>{t('email')}</span>{' '}
                                    <span className="text-white">
                                        {userActivityModal.user?.email}
                                    </span>
                                </div>
                                <div>
                                    <span className={css.textGray88}>{t('joined')}</span>{' '}
                                    <span className="text-white">
                                        {new Date(
                                            userActivityModal.user?.date_joined
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                                <div>
                                    <span className={css.textGray88}>{t('last_login')}</span>{' '}
                                    <span className="text-white">
                                        {userActivityModal.user?.last_login
                                            ? new Date(
                                                  userActivityModal.user.last_login
                                              ).toLocaleString()
                                            : t('admin.logs.never', 'Hiçbir zaman')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Activities */}
                        <div className={css.scroll400}>
                            {userActivityModal.activities?.map((activity, idx) => (
                                <div key={`item-${idx}`} className={css.logRow}>
                                    <div style={getActivityIconStyle(activity.type)}>
                                        {activity.type === 'login'
                                            ? '🔐'
                                            : activity.type === 'message'
                                              ? '💬'
                                              : activity.type === 'moderation'
                                                ? '⚖️'
                                                : activity.type === 'server'
                                                  ? '🏠'
                                                  : '📝'}
                                    </div>
                                    <div className={css.flex1}>
                                        <div className={css.textWhite13}>{activity.action}</div>
                                        <div className={css.textGray88_11}>
                                            {new Date(activity.timestamp).toLocaleString()}
                                        </div>
                                        {activity.details && (
                                            <div className={css.textGray11Mt4}>
                                                {JSON.stringify(activity.details).slice(0, 100)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

renderLogs.propTypes = {};
