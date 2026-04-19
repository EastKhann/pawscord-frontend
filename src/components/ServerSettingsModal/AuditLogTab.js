import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FaHistory, FaUndo } from 'react-icons/fa';
import styles from './styles';

import { useTranslation } from 'react-i18next';
import css from './ServerTabs.module.css';
import logger from '../../utils/logger';

const S = {
    txt2: { color: '#4e5058', fontSize: '11px', flexShrink: 0, whiteSpace: 'nowrap' },
    txt: {
        color: '#949ba4',
        fontSize: '12px',
        marginTop: '4px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    flex: { display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' },
    bg2: { ...styles.actionBtn, backgroundColor: '#5865f2', padding: '8px 14px', fontSize: '12px' },
    bg: {
        padding: '8px 12px',
        backgroundColor: '#111214',
        border: '1px solid #182135',
        borderRadius: '6px',
        color: '#dbdee1',
        fontSize: '12px',
        outline: 'none',
        cursor: 'pointer',
    },
};

const AuditLogTab = ({ server, fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
    const [auditLogs, setAuditLogs] = useState([]);
    const [auditLoading, setAuditLoading] = useState(false);
    const [auditFilter, setAuditFilter] = useState('');

    const loadAuditLogs = useCallback(
        async (filter = '') => {
            setAuditLoading(true);
            try {
                const url = filter
                    ? `${apiBaseUrl}/audit-logs/?action_type=${filter}&limit=100`
                    : `${apiBaseUrl}/audit-logs/?limit=100`;
                const res = await fetchWithAuth(url);
                if (res.ok) {
                    const data = await res.json();
                    setAuditLogs(Array.isArray(data) ? data : []);
                }
            } catch (e) {
                logger.error('Audit log load error:', e);
            } finally {
                setAuditLoading(false);
            }
        },
        [fetchWithAuth, apiBaseUrl]
    );

    useEffect(() => {
        loadAuditLogs();
    }, [loadAuditLogs]);

    return (
        <div className={css.flexColGap16}>
            <div className={css.headerBar}>
                <div className={css.flexAlignGap12}>
                    <FaHistory className="icon-primary-24" />
                    <div>
                        <h3 className={css.headerWhite16}>{t('action_history')}</h3>
                        <p className={css.mutedSmall}>{t('all_moderator_and_admin_actions')}</p>
                    </div>
                </div>
                <div className={css.flexGap8}>
                    <select
                        aria-label="Filter by action type"
                        value={auditFilter}
                        onChange={(e) => {
                            setAuditFilter(e.target.value);
                            loadAuditLogs(e.target.value);
                        }}
                        style={S.bg}
                    >
                        <option value="">{t('all_actions')}</option>
                        <option value="BAN">{t('ban')}</option>
                        <option value="UNBAN">{t('unban')}</option>
                        <option value="KICK">{t('kick')}</option>
                        <option value="ROLE_CHANGE">{t('role_change')}</option>
                        <option value="CHANNEL_CREATE">{t('channel_create')}</option>
                        <option value="CHANNEL_DELETE">{t('channel_delete')}</option>
                        <option value="MESSAGE_DELETE">{t('message_delete')}</option>
                        <option value="SERVER_UPDATE">{t('server_update')}</option>
                        <option value="EMAIL_VERIFIED">{t('email_verified')}</option>
                    </select>
                    <button
                        onClick={() => loadAuditLogs(auditFilter)}
                        aria-label="Refresh audit logs"
                        style={S.bg2}
                    >
                        <FaUndo />
                    </button>
                </div>
            </div>

            {auditLoading ? (
                <div className={css.loadingCenter}> {t('common.loading')}</div>
            ) : auditLogs.length === 0 ? (
                <div className={css.emptyState}>
                    <FaHistory className={css.bigIcon4e} />
                    <h4 className={css.headerMb8}>{t('no_records')}</h4>
                    <p className={css.chatText14}>{t('no_actions_recorded_yet')}</p>
                </div>
            ) : (
                <div className={css.flexColGap4}>
                    {auditLogs.map((log, idx) => {
                        const actionColors = {
                            BAN: '#f23f42',
                            UNBAN: '#23a559',
                            KICK: '#f0b232',
                            MESSAGE_DELETE: '#f47b67',
                            ROLE_CHANGE: '#5865f2',
                            CHANNEL_CREATE: '#23a559',
                            CHANNEL_DELETE: '#f23f42',
                            SERVER_UPDATE: '#5865f2',
                            EMAIL_VERIFIED: '#23a559',
                        };
                        const actionColor = actionColors[log.action_type] || '#b5bac1';
                        const logItemStyle = {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 16px',
                            backgroundColor: '#111214',
                            borderRadius: '6px',
                            borderLeft: `3px solid ${actionColor}`,
                        };
                        const dotStyle = {
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: actionColor,
                            flexShrink: 0,
                        };
                        const badgeStyle = {
                            backgroundColor: `${actionColor}22`,
                            color: actionColor,
                            padding: '2px 8px',
                            borderRadius: '10px',
                            fontSize: '11px',
                            fontWeight: '600',
                        };
                        return (
                            <div key={log.id || idx} style={logItemStyle}>
                                <div style={dotStyle} />
                                <div className="flex-min0">
                                    <div style={S.flex}>
                                        <span className="white-bold-13">
                                            {log.actor_username || log.actor || 'System'}
                                        </span>
                                        <span style={badgeStyle}>{log.action_type}</span>
                                    </div>
                                    {log.details && (
                                        <div style={S.txt}>
                                            {typeof log.details === 'object'
                                                ? JSON.stringify(log.details).substring(0, 120)
                                                : String(log.details).substring(0, 120)}
                                        </div>
                                    )}
                                </div>
                                <div style={S.txt2}>
                                    {log.timestamp
                                        ? new Date(log.timestamp).toLocaleString('tr-TR', {
                                              month: 'short',
                                              day: 'numeric',
                                              hour: '2-digit',
                                              minute: '2-digit',
                                          })
                                        : ''}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

AuditLogTab.propTypes = {
    server: PropTypes.string,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};
export default AuditLogTab;
