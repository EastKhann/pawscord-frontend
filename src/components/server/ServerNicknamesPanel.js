import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { FaTimes, FaUser, FaHistory } from 'react-icons/fa';

import { toast } from '../../utils/toast';

import { useTranslation } from 'react-i18next';

const ServerNicknamesPanel = ({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
    const { t } = useTranslation();

    const [nicknames, setNicknames] = useState([]);

    const [loading, setLoading] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchNicknames();
    }, []);

    const fetchNicknames = async () => {
        setLoading(true);

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/nicknames/`);

            const data = await response.json();

            setNicknames(data.nicknames || []);
        } catch (error) {
            toast.error(t('nickname.loadFailed'));
        } finally {
            setLoading(false);
        }
    };

    const updateNickname = async (userId, newNickname) => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/nicknames/set/`, {
                method: 'POST',

                headers: { 'Content-Type': 'application/json' },

                body: JSON.stringify({
                    user_id: userId,

                    nickname: newNickname,
                }),
            });

            toast.success(t('nickname.updated'));

            fetchNicknames();
        } catch (error) {
            toast.error(t('nickname.updateFailed'));
        }
    };

    const clearNickname = async (userId) => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/nicknames/clear/`, {
                method: 'POST',

                headers: { 'Content-Type': 'application/json' },

                body: JSON.stringify({ user_id: userId }),
            });

            toast.success(t('nickname.cleared'));

            fetchNicknames();
        } catch (error) {
            toast.error(t('nickname.clearFailed'));
        }
    };

    const filteredNicknames = nicknames.filter(
        (n) =>
            n.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (n.nickname && n.nickname.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaUser className="icon-primary-mr10" />

                        <h2 style={styles.title}>{t('serverNicks.title', 'Server Nicknames')}</h2>
                    </div>

                    <button aria-label={t('common.close', 'Close')} onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.toolbar}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t('common.searchMembers', 'Search members...')}
                        style={styles.searchInput}
                        aria-label={t('serverNicknames.searchInput', 'Search members')}
                    />
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>{t('serverNicks.loading', 'Loading nicknames...')}</div>
                    ) : filteredNicknames.length === 0 ? (
                        <div style={styles.empty}>
                            {searchQuery ? t('serverNicks.noMatch', 'No members match your search') : t('serverNicks.notFound', 'No members found')}
                        </div>
                    ) : (
                        <div style={styles.nicknamesList}>
                            {filteredNicknames.map((item, idx) => (
                                <div key={`item-${idx}`} style={styles.nicknameCard}>
                                    <div style={styles.userInfo}>
                                        <div style={styles.username}>{item.username}</div>

                                        {item.nickname && (
                                            <div style={styles.currentNickname}>
                                                Current nickname:{' '}
                                                <span style={styles.nicknameValue}>
                                                    {item.nickname}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div style={styles.actions}>
                                        <button
                                            aria-label={t('serverNicknames.editNickname', 'Edit nickname')}
                                            onClick={() => {
                                                const newNick = prompt(
                                                    'Enter new nickname:',
                                                    item.nickname || ''
                                                );
                                                if (newNick !== null && newNick.trim()) {
                                                    updateNickname(item.user_id, newNick.trim());
                                                }
                                            }}
                                            style={styles.editButton}
                                        >
                                            Edit
                                        </button>

                                        {item.nickname && (
                                            <button
                                                aria-label={t('serverNicknames.clearNickname', 'Clear nickname')}
                                                onClick={() => clearNickname(item.user_id)}
                                                style={styles.clearButton}
                                            >
                                                Clear
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

const styles = {
    overlay: {
        position: 'fixed',

        top: 0,

        left: 0,

        right: 0,

        bottom: 0,

        backgroundColor: 'rgba(0, 0, 0, 0.85)',

        display: 'flex',

        alignItems: 'center',

        justifyContent: 'center',

        zIndex: 999999,
    },

    modal: {
        backgroundColor: '#1e1e1e',

        borderRadius: '8px',

        width: '90%',

        maxWidth: '700px',

        maxHeight: '90vh',

        display: 'flex',

        flexDirection: 'column',

        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    },

    header: {
        display: 'flex',

        justifyContent: 'space-between',

        alignItems: 'center',

        padding: '20px',

        borderBottom: '1px solid #0e1222',
    },

    headerLeft: {
        display: 'flex',

        alignItems: 'center',
    },

    title: {
        margin: 0,

        fontSize: '20px',

        color: '#ffffff',
    },

    closeButton: {
        background: 'none',

        border: 'none',

        color: '#949ba4',

        cursor: 'pointer',

        fontSize: '20px',

        padding: '5px',
    },

    toolbar: {
        padding: '15px 20px',

        borderBottom: '1px solid #0e1222',
    },

    searchInput: {
        width: '100%',

        padding: '10px 12px',

        backgroundColor: '#111214',

        border: '1px solid #0e1222',

        borderRadius: '4px',

        color: '#ffffff',

        fontSize: '14px',
    },

    content: {
        padding: '20px',

        overflowY: 'auto',

        flex: 1,
    },

    loading: {
        textAlign: 'center',

        color: '#949ba4',

        padding: '40px',
    },

    empty: {
        textAlign: 'center',

        color: '#949ba4',

        padding: '40px',
    },

    nicknamesList: {
        display: 'flex',

        flexDirection: 'column',

        gap: '10px',
    },

    nicknameCard: {
        backgroundColor: '#111214',

        borderRadius: '8px',

        padding: '16px',

        display: 'flex',

        justifyContent: 'space-between',

        alignItems: 'center',
    },

    userInfo: {
        flex: 1,
    },

    username: {
        fontSize: '16px',

        fontWeight: '600',

        color: '#ffffff',

        marginBottom: '4px',
    },

    currentNickname: {
        fontSize: '13px',

        color: '#949ba4',
    },

    nicknameValue: {
        color: '#5865f2',

        fontWeight: '500',
    },

    actions: {
        display: 'flex',

        gap: '8px',
    },

    editButton: {
        padding: '6px 12px',

        backgroundColor: '#5865f2',

        border: 'none',

        borderRadius: '4px',

        color: '#ffffff',

        cursor: 'pointer',

        fontSize: '13px',

        fontWeight: '500',
    },

    clearButton: {
        padding: '6px 12px',

        backgroundColor: '#f23f42',

        border: 'none',

        borderRadius: '4px',

        color: '#ffffff',

        cursor: 'pointer',

        fontSize: '13px',

        fontWeight: '500',
    },
};

ServerNicknamesPanel.propTypes = {
    fetchWithAuth: PropTypes.func,

    apiBaseUrl: PropTypes.string,

    onClose: PropTypes.func,

    serverId: PropTypes.string,
};

export default ServerNicknamesPanel;
