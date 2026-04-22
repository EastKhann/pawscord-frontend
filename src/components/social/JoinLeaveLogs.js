/* eslint-disable no-undef */
// components/JoinLeaveLogs.js
// 📊 Server Join/Leave Activity Logs

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaUserPlus, FaUserMinus, FaClock } from 'react-icons/fa';
import logger from '../../utils/logger';
import { useTranslation } from 'react-i18next';

// -- extracted inline style constants --

const JoinLeaveLogs = ({ serverId, fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, joins, leaves

    useEffect(() => {
        loadLogs();
    }, [serverId, filter]);

    const loadLogs = async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/logs/`);
            if (res.ok) {
                const data = await res.json();
                const filtered =
                    filter === 'all'
                        ? data
                        : filter === 'joins'
                            ? data.filter((l) => l.action === 'join')
                            : data.filter((l) => l.action === 'leave');
                setLogs(filtered);
            }
        } catch (e) {
            logger.error('Logs load error:', e);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('tr-TR', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (loading) return <div className="pad-20-b5">{t('joinLogs.loading', 'Loading logs...')}</div>;

    return (
        <div>
            <div className="flex-between-center">
                <h4 className="text-dbd-m0">{t('joinLogs.title', 'Member Activity')}</h4>
                <div className="flex-gap-8">
                    {['all', 'joins', 'leaves'].map((f) => (
                        <button
                            aria-label={t('joinLeaveLogs.filter', 'Filter logs')}
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: '6px 12px',
                                backgroundColor: filter === f ? '#5865f2' : '#111214',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                textTransform: 'capitalize',
                                fontSize: '13px',
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {logs.length === 0 ? (
                <div className={css.emptyStatePad40}>{t('joinLogs.noActivity', 'No activity records')}</div>
            ) : (
                <div>
                    {logs.map((log, idx) => (
                        <div
                            key={`item-${idx}`}
                            style={{
                                padding: '12px',
                                backgroundColor: '#111214',
                                borderRadius: '6px',
                                borderLeft: `3px solid ${log.action === 'join' ? '#23a559' : '#f23f42'}`,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                            }}
                        >
                            <div
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    backgroundColor: log.action === 'join' ? '#23a559' : '#f23f42',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '16px',
                                    flexShrink: 0,
                                }}
                            >
                                {log.action === 'join' ? <FaUserPlus /> : <FaUserMinus />}
                            </div>
                            <div className="flex-1">
                                <div>{log.username}</div>
                                <div className="text-b5-13">
                                    {log.action === 'join'
                                        ? t('joinLogs.joined', 'Joined the server')
                                        : t('joinLogs.left', 'Left the server')}
                                </div>
                            </div>
                            <div>
                                <FaClock />
                                {formatTime(log.timestamp)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

JoinLeaveLogs.propTypes = {
    serverId: PropTypes.string,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};
export default JoinLeaveLogs;
