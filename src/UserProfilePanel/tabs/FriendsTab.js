import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import profileStyles from '../styles';
const _s = (o) => o;

// -- extracted inline style constants --
const _st1 = { color: '#b5bac1', textAlign: 'center', padding: '24px' };
const _st2 = { display: 'flex', alignItems: 'center', gap: '12px' };
const _st3 = { width: '40px', height: '40px', borderRadius: '50%' };
const _st4 = { color: '#fff', margin: 0, fontWeight: '600' };
const _st5 = { display: 'flex', gap: '8px' };
const _st6 = { display: 'grid', gap: '12px', marginTop: '16px' };
const _st7 = { flex: 1 };

const FriendsTab = ({
    friendRequests: rawFR,
    friends: rawFriends,
    removeFriend,
    respondToFriendRequest,
}) => {
    const friendRequests = rawFR || [];
    const friends = rawFriends || [];
    const { t } = useTranslation();
    const styles = profileStyles;
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <>
            <div style={styles.card}>
                <h3 style={styles.sectionTitle}>📨 {t('friends.pendingRequests')}</h3>

                {friendRequests.length === 0 && <p style={_st1}>{t('friends.noPendingRequests')}</p>}

                {friendRequests.map((request) => (
                    <div key={request.id} style={styles.sessionCard}>
                        <div style={_st2}>
                            <img
                                src={
                                    request.from_user.avatar_url ||
                                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Crect fill="%235865f2" width="40" height="40" rx="20"/%3E%3Ctext x="20" y="20" font-size="18" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E'
                                }
                                alt={request.from_user.username}
                                style={_st3}
                            />
                            <div>
                                <p style={_st4}>{request.from_user.username}</p>
                                <p style={styles.settingRowDesc}>
                                    {new Date(request.created_at).toLocaleDateString('tr-TR')}
                                </p>
                            </div>
                        </div>
                        <div style={_st5}>
                            <button
                                style={styles.button('primary')}
                                aria-label={t('friends.accept')}
                                onClick={() => respondToFriendRequest(request.id, 'accept')}
                            >
                                ✅ {t('friends.accept')}
                            </button>
                            <button
                                style={styles.button('danger')}
                                aria-label={t('friends.reject')}
                                onClick={() => respondToFriendRequest(request.id, 'reject')}
                            >
                                ❌ {t('friends.reject')}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div style={styles.card}>
                <h3 style={styles.sectionTitle}>👥 {t('friends.myFriends')} ({friends.length})</h3>

                {friends.length === 0 && <p style={_st1}>{t('friends.noFriends')}</p>}

                <div style={_st6}>
                    {friends.map((friend) => (
                        <div key={friend.id} style={styles.sessionCard}>
                            <div style={_st2}>
                                <img
                                    src={
                                        friend.avatar_url ||
                                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Crect fill="%235865f2" width="40" height="40" rx="20"/%3E%3Ctext x="20" y="20" font-size="18" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E'
                                    }
                                    alt={friend.username}
                                    style={_st3}
                                />
                                <div style={_st7}>
                                    <p style={_st4}>{friend.username}</p>
                                    <p style={styles.settingRowDesc}>
                                        {friend.status_message || t('friends.noStatus')}
                                    </p>
                                </div>
                                <div
                                    style={_s({
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        background: friend.is_online ? '#23a559' : '#80848e',
                                    })}
                                />
                            </div>
                            <button
                                style={styles.button('danger')}
                                aria-label={t('friends.remove')}
                                onClick={() => removeFriend(friend.friendship_id)}
                            >
                                🗑️ {t('friends.remove')}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

FriendsTab.propTypes = {
    friendRequests: PropTypes.array,
    friends: PropTypes.array,
    removeFriend: PropTypes.func,
    respondToFriendRequest: PropTypes.object,
};
export default FriendsTab;
