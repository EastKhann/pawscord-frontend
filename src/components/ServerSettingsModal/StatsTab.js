import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    FaChartBar,
    FaUsers,
    FaComments,
    FaHashtag,
    FaShieldAlt,
    FaChartLine,
    FaChartPie,
    FaUndo,
} from 'react-icons/fa';
import styles from './styles';

import { useTranslation } from 'react-i18next';
import css from './ServerTabs.module.css';
import logger from '../../utils/logger';

const S = {
    txt3: { fontSize: '12px', color: '#f0b232', marginTop: '4px' },
    txt2: { color: '#23a559', fontSize: '18px' },
    txt: { fontSize: '12px', color: '#23a559', marginTop: '4px' },
};

const StatsTab = ({ server, fetchWithAuth, apiBaseUrl, roles }) => {
    const { t } = useTranslation();
    const [serverStats, setServerStats] = useState(null);
    const [statsLoading, setStatsLoading] = useState(false);

    const loadServerStats = useCallback(async () => {
        setStatsLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/stats/overview/`);
            if (res.ok) {
                const data = await res.json();
                setServerStats(data);
            }
        } catch (e) {
            logger.error('Stats load error:', e);
        } finally {
            setStatsLoading(false);
        }
    }, [fetchWithAuth, apiBaseUrl, server.id]);

    useEffect(() => {
        loadServerStats();
    }, [loadServerStats]);

    return (
        <div className={css.flexColGap20}>
            <div className={css.headerBar}>
                <div className={css.flexAlignGap12}>
                    <FaChartBar className="icon-primary-24" />
                    <div>
                        <h3 className={css.headerWhite16}>{t('server_statistics')}</h3>
                        <p className={css.mutedSmall}>{t('server_performance_summary')}</p>
                    </div>
                </div>
                <button
                    onClick={loadServerStats}
                    aria-label="Refresh server stats"
                    className={css.actionBtnPrimary}
                >
                    <FaUndo /> Refresh
                </button>
            </div>

            {statsLoading ? (
                <div className={css.loadingCenter}>{t('common.loading')}</div>
            ) : !serverStats ? (
                <div className={css.emptyState}>
                    <FaChartBar className={css.bigIcon4e} />
                    <h4 className={css.headerMb8}>{t('could_not_load_statistics')}</h4>
                    <p className={css.chatText14}>{t('click_refresh_to_try_again')}</p>
                </div>
            ) : (
                <>
                    {/* Ana Metrikler */}
                    <div className="grid-auto-200-12">
                        <div className={css.statCardPrimary}>
                            <div className={css.flexAlignGap10Mb8}>
                                <FaUsers className={css.primaryIcon18} />
                                <span className={css.labelUppercase}>{t('total_members')}</span>
                            </div>
                            <div className={css.valueBig}>
                                {serverStats.total_members ?? serverStats.members ?? 0}
                            </div>
                            {serverStats.online_members !== undefined && (
                                <div style={S.txt}>🟢 {serverStats.online_members} online</div>
                            )}
                        </div>
                        <div className={css.statCardSuccess}>
                            <div className={css.flexAlignGap10Mb8}>
                                <FaComments style={S.txt2} />
                                <span className={css.labelUppercase}>{t('total_messages')}</span>
                            </div>
                            <div className={css.valueBig}>
                                {(serverStats.total_messages ?? 0).toLocaleString('tr-TR')}
                            </div>
                            {serverStats.messages_last_7_days !== undefined && (
                                <div style={S.txt3}>
                                    📈 Last 7 days: {serverStats.messages_last_7_days}
                                </div>
                            )}
                        </div>
                        <div className={css.statCardWarning}>
                            <div className={css.flexAlignGap10Mb8}>
                                <FaHashtag className="icon-warning" />
                                <span className={css.labelUppercase}>{t('channels')}</span>
                            </div>
                            <div className={css.valueBig}>
                                {serverStats.total_channels ?? serverStats.rooms ?? 0}
                            </div>
                        </div>
                    </div>

                    {/* Detailed Info */}
                    <div className="grid-2col-12">
                        <div className={css.darkBlock}>
                            <h4 className={css.headerMb14}>
                                <FaShieldAlt className="icon-primary" /> Server Info
                            </h4>
                            <div className={css.flexColGap10}>
                                {[
                                    {
                                        label: 'Server Name',
                                        value: serverStats.server_name || server.name,
                                    },
                                    {
                                        label: 'Created',
                                        value: serverStats.created_at
                                            ? new Date(serverStats.created_at).toLocaleDateString(
                                                  'tr-TR',
                                                  { year: 'numeric', month: 'long', day: 'numeric' }
                                              )
                                            : server.created_at
                                              ? new Date(server.created_at).toLocaleDateString(
                                                    'tr-TR'
                                                )
                                              : 'Bilinmiyor',
                                    },
                                    {
                                        label: 'Privacy',
                                        value: server.is_public ? '🌐 Public' : t('ui.ozel_4'),
                                        color: server.is_public ? '#23a559' : '#f0b232',
                                    },
                                    { label: 'Roles', value: roles?.length ?? 0 },
                                ].map((item, i) => {
                                    const valueStyle = {
                                        color: item.color || '#fff',
                                        fontSize: '13px',
                                        fontWeight: '600',
                                    };
                                    return (
                                        <div key={`item-${i}`} className={css.flexBetweenRow}>
                                            <span className={css.chatText13}>{item.label}</span>
                                            <span style={valueStyle}>{item.value}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className={css.darkBlock}>
                            <h4 className={css.headerMb14}>
                                <FaChartLine className="icon-success" /> Activity Overview
                            </h4>
                            <div className={css.flexColGap10}>
                                {[
                                    { label: 'Categories', value: server.categories?.length || 0 },
                                    {
                                        label: 'Online Members',
                                        value: serverStats.online_members ?? '—',
                                        color: '#23a559',
                                    },
                                    {
                                        label: 'Weekly Messages',
                                        value: serverStats.messages_last_7_days ?? '—',
                                    },
                                ].map((item, i) => {
                                    const valueStyle = {
                                        color: item.color || '#fff',
                                        fontSize: '13px',
                                        fontWeight: '600',
                                    };
                                    return (
                                        <div key={`item-${i}`} className={css.flexBetweenRow}>
                                            <span className={css.chatText13}>{item.label}</span>
                                            <span style={valueStyle}>{item.value}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Health Metrics */}
                    <div className={css.darkBlock}>
                        <h4 className={css.headerMb14}>
                            <FaChartPie className="icon-warning" /> Health Metrics
                        </h4>
                        <div className="grid-auto-180-10">
                            {[
                                {
                                    label: 'Member Activity',
                                    value:
                                        serverStats.online_members && serverStats.total_members
                                            ? Math.round(
                                                  (serverStats.online_members /
                                                      serverStats.total_members) *
                                                      100
                                              )
                                            : null,
                                    color: '#23a559',
                                    suffix: '%',
                                },
                                {
                                    label: 'Avg Daily Messages',
                                    value: serverStats.messages_last_7_days
                                        ? Math.round(serverStats.messages_last_7_days / 7)
                                        : null,
                                    color: '#5865f2',
                                    suffix: '',
                                },
                                {
                                    label: 'Members per Channel',
                                    value: serverStats.total_channels
                                        ? Math.round(
                                              (serverStats.total_members || 0) /
                                                  serverStats.total_channels
                                          )
                                        : null,
                                    color: '#f0b232',
                                    suffix: ':1',
                                },
                            ].map((metric, i) => {
                                const metricValueStyle = {
                                    fontSize: '24px',
                                    fontWeight: '800',
                                    color: metric.color,
                                };
                                return (
                                    <div key={`item-${i}`} className="pad-14-dark-center">
                                        <div style={metricValueStyle}>
                                            {metric.value ?? '—'}
                                            {metric.value !== null ? metric.suffix : ''}
                                        </div>
                                        <div className={css.fieldHint}>{metric.label}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

StatsTab.propTypes = {
    server: PropTypes.string,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    roles: PropTypes.array,
};
export default StatsTab;
