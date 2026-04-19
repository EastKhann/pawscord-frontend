/* eslint-disable no-irregular-whitespace */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaUserFriends, FaPaperPlane, FaTimes, FaBell } from '../utils/iconOptimization';
import useFriendsAPI from './useFriendsAPI';
import FriendsList from './FriendsList';
import PendingRequests from './PendingRequests';
import styles from './friendsTabStyles';

import { useTranslation } from 'react-i18next';

// -- extracted inline style constants --

const FriendsTab = ({
    fetchWithAuth,
    apiBaseUrl,
    getDeterministicAvatar,
    onStartDM,
    onClose,
    onPendingCountChange,
    onlineUsers = [],
    allUsers = [],
}) => {
    const { t } = useTranslation();
    const api = useFriendsAPI({ fetchWithAuth, apiBaseUrl, onPendingCountChange });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    return (
        <div style={styles.container}>
            <div style={styles.topBar}>
                <div style={styles.headerLeft}>
                    <div style={styles.title}>
                        <FaUserFriends />
                        {t('friends.title', 'Arkadaşlar')}
                    </div>
                    <div style={styles.tabButtons}>
                        <button
                            style={{
                                ...styles.tabBtn,
                                ...(api.activeTab === 'all' ? styles.activeTabBtn : {}),
                            }}
                            onClick={() => {
                                api.setActiveTab('all');
                                api.setStatusMsg(null);
                            }}
                        >
                            {t('friends.all', 'Hepsi')} ({api.friends.length})
                        </button>
                        <button
                            style={{
                                ...styles.tabBtn,
                                ...(api.activeTab === 'pending' ? styles.activeTabBtn : {}),
                            }}
                            onClick={() => {
                                api.setActiveTab('pending');
                                api.setStatusMsg(null);
                            }}
                        >
                            {t('friends.pending', 'Bekleyenler')}
                            {api.requests.length > 0 && (
                                <span style={styles.badgePulse}>{api.requests.length}</span>
                            )}
                        </button>
                        <button
                            style={{
                                ...styles.addFriendBtn,
                                ...(api.activeTab === 'add' ? styles.activeAddFriendBtn : {}),
                            }}
                            onClick={() => {
                                api.setActiveTab('add');
                                api.setStatusMsg(null);
                            }}
                        >
                            {t('friends.addFriend', 'Arkadaş Ekle')}
                        </button>
                    </div>
                </div>
                <button onClick={onClose} style={styles.closeHeaderBtn} title={t('common.close')}>
                    <FaTimes />
                </button>
            </div>

            <div style={styles.contentArea}>
                {api.statusMsg && (
                    <div
                        style={{
                            marginBottom: '20px',
                            padding: '12px',
                            borderRadius: '8px',
                            backgroundColor:
                                api.statusMsg.type === 'success'
                                    ? 'rgba(67, 181, 129, 0.2)'
                                    : api.statusMsg.type === 'info'
                                      ? 'rgba(88, 101, 242, 0.2)'
                                      : 'rgba(240, 71, 71, 0.2)',
                            color:
                                api.statusMsg.type === 'success'
                                    ? '#23a559'
                                    : api.statusMsg.type === 'info'
                                      ? '#dee0fc'
                                      : '#f23f42',
                            border: `1px solid ${api.statusMsg.type === 'success' ? '#23a559' : api.statusMsg.type === 'info' ? '#5865f2' : '#f23f42'}`,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            animation: 'fadeIn 0.3s ease',
                        }}
                    >
                        {api.statusMsg.type === 'info' && <FaBell />}
                        {api.statusMsg.text}
                    </div>
                )}

                {api.activeTab === 'add' && (
                    <div style={styles.addSection}>
                        <h3 style={{ color: '#fff', marginBottom: '8px' }}>
                            {t('friends.addFriendTitle', 'ARKADAŞ EKLE')}
                        </h3>
                        <p style={{ color: '#b5bac1', fontSize: '0.9em', marginBottom: '16px' }}>
                            {t(
                                'friends.addFriendDesc',
                                'Arkadaşlık isteği göndermek için bir kullanıcı adı girin.'
                            )}
                        </p>
                        <form onSubmit={api.handleSendRequest} style={styles.addForm}>
                            {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
                            <input
                                type="text"
                                value={api.addUsername}
                                onChange={(e) => api.setAddUsername(e.target.value)}
                                placeholder={t(
                                    'friends.searchPlaceholder',
                                    'Kullanıcı adı veya Arkadaş Kodu (örn: 8392014)'
                                )}
                                aria-label={t(
                                    'friends.usernameLabel',
                                    'Kullanıcı adı veya arkadaş kodu'
                                )}
                                style={styles.input}
                                autoFocus
                            />
                            <button type="submit" style={styles.sendRequestBtn}>
                                <FaPaperPlane /> {t('common.send', 'Gönder')}
                            </button>
                        </form>
                    </div>
                )}

                {api.activeTab === 'all' && (
                    <div style={styles.listContainer}>
                        <h4 style={styles.listHeader}>
                            {t('friends.friendsCount', 'ARKADAŞLAR')} — {api.friends.length}
                        </h4>
                        <FriendsList
                            friends={api.friends}
                            onlineUsers={onlineUsers}
                            allUsers={allUsers}
                            getDeterministicAvatar={getDeterministicAvatar}
                            onStartDM={onStartDM}
                            handleRemoveFriend={api.handleRemoveFriend}
                            setActiveTab={api.setActiveTab}
                        />
                    </div>
                )}

                {api.activeTab === 'pending' && (
                    <PendingRequests
                        requests={api.requests}
                        outgoing={api.outgoing}
                        getDeterministicAvatar={getDeterministicAvatar}
                        handleRespond={api.handleRespond}
                    />
                )}
            </div>
        </div>
    );
};

FriendsTab.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    getDeterministicAvatar: PropTypes.func,
    onStartDM: PropTypes.func,
    onClose: PropTypes.func,
    onPendingCountChange: PropTypes.func,
    onlineUsers: PropTypes.func,
    allUsers: PropTypes.array,
};
export default React.memo(FriendsTab);
