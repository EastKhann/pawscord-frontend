import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FaBan, FaCheck, FaUndo, FaCalendarAlt } from 'react-icons/fa';
import toast from '../../utils/toast';
import confirmDialog from '../../utils/confirmDialog';
import styles from './styles';

import { useTranslation } from 'react-i18next';
import css from './ServerTabs.module.css';
import logger from '../../utils/logger';

const S = {
    flex3: {
        padding: '8px 14px',
        backgroundColor: 'transparent',
        border: '1px solid #23a559',
        borderRadius: '6px',
        color: '#23a559',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'all 0.15s',
    },
    txt5: { marginLeft: '8px', color: '#f23f42' },
    txt4: { marginLeft: '8px', color: '#f0b232' },
    mar: { marginRight: '4px', fontSize: '10px' },
    txt3: { color: '#4e5058', fontSize: '11px', marginTop: '2px' },
    flex2: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        backgroundColor: '#f23f42',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: '700',
        fontSize: '14px',
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 18px',
        backgroundColor: '#111214',
        borderRadius: '8px',
        border: '1px solid #0b0e1b',
        transition: 'background-color 0.15s',
    },
    txt2: { fontSize: '48px', color: '#23a559', marginBottom: '16px' },
    txt: { fontSize: '24px', color: '#f23f42' },
};

const BansTab = ({ server, fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
    const [bans, setBans] = useState([]);
    const [bansLoading, setBansLoading] = useState(false);

    const loadBans = useCallback(async () => {
        setBansLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/bans/`);
            if (res.ok) {
                const data = await res.json();
                setBans(data.bans || []);
            }
        } catch (e) {
            logger.error('Ban list load error:', e);
        } finally {
            setBansLoading(false);
        }
    }, [fetchWithAuth, apiBaseUrl, server.id]);

    useEffect(() => {
        loadBans();
    }, [loadBans]);

    const handleUnban = async (username) => {
        if (!(await confirmDialog(`Are you sure you want to unban ${username}?`))) return;
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/moderation/unban/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, server_id: server.id }),
            });
            if (res.ok) {
                toast.success(t('ban.unbanned', { user: username }));
                loadBans();
            } else {
                const data = await res.json().catch(() => ({}));
                toast.error(data.error || 'Operation failed');
            }
        } catch (e) {
            toast.error(t('bans.unbanFailed'));
        }
    };

    return (
        <div className={css.flexColGap16}>
            <div className={css.headerBar}>
                <div className={css.flexAlignGap12}>
                    <FaBan style={S.txt} />
                    <div>
                        <h3 className={css.headerWhite16}>{t('banned_users')}</h3>
                        <p className={css.mutedSmall}>{bans.length} banned users</p>
                    </div>
                </div>
                <button
                    onClick={loadBans}
                    aria-label="Refresh ban list"
                    className={css.actionBtnPrimary}
                >
                    <FaUndo /> Refresh
                </button>
            </div>

            {bansLoading ? (
                <div className={css.loadingCenter}>{t('common.loading')}</div>
            ) : bans.length === 0 ? (
                <div className={css.emptyState}>
                    <FaCheck style={S.txt2} />
                    <h4 className={css.headerMb8}>{t('all_clear')}</h4>
                    <p className={css.chatText14}>{t('no_banned_users_yet')}</p>
                </div>
            ) : (
                <div className={css.flexColGap8}>
                    {bans.map((ban) => (
                        <div key={ban.id} style={S.flex}>
                            <div className={css.flexAlignGap12}>
                                <div style={S.flex2}>{ban.username?.[0]?.toUpperCase() || '?'}</div>
                                <div>
                                    <div className="white-bold-14">{ban.username}</div>
                                    <div className={css.mutedTime}>
                                        {ban.reason || 'No reason provided'} • Banned by:{' '}
                                        {ban.banned_by || 'System'}
                                    </div>
                                    <div style={S.txt3}>
                                        <FaCalendarAlt style={S.mar} />
                                        {ban.created_at
                                            ? new Date(ban.created_at).toLocaleDateString('tr-TR', {
                                                  year: 'numeric',
                                                  month: 'long',
                                                  day: 'numeric',
                                                  hour: '2-digit',
                                                  minute: '2-digit',
                                              })
                                            : 'No date'}
                                        {ban.expires_at && !ban.is_permanent && (
                                            <span style={S.txt4}>
                                                ⏰ Expires:{' '}
                                                {new Date(ban.expires_at).toLocaleDateString()}
                                            </span>
                                        )}
                                        {ban.is_permanent && (
                                            <span style={S.txt5}>{t('♾️_permanent')}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleUnban(ban.username)}
                                aria-label={`Unban ${ban.username}`}
                                style={S.flex3}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#23a559';
                                    e.target.style.color = '#fff';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.color = '#23a559';
                                }}
                            >
                                <FaUndo /> Unban
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

BansTab.propTypes = {
    server: PropTypes.string,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};
export default BansTab;
