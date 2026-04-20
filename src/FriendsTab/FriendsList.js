/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useMemo, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FaCommentDots, FaTimes, FaSearch } from 'react-icons/fa';
import LazyImage from '../components/shared/LazyImage';
import styles from './friendsTabStyles';
import { getFreshActivity } from '../utils/activityUtils';

// -- dynamic style helpers (pass 2) --

// -- extracted inline style constants --

const _st1063 = styles.username;
const _st1064 = styles.status;
const _st1065 = { ...styles.iconButton, color: '#f23f42' };

const IGNORED_APPS = new Set([
    'fps monitor',
    'msi afterburner',
    'rivatuner',
    'fraps',
    'nvidia geforce experience',
    'amd radeon software',
    'obs',
    'obs studio',
    'streamlabs',
    'xsplit',
    'nvidia shadowplay',
    'movavi video suite',
    'movavi',
    'camtasia',
    'bandicam',
    'soundpad',
    'voicemod',
    'teamspeak',
    'mumble',
    'overwolf',
    'razer cortex',
    'steam',
    'epic games launcher',
    'origin',
    'uplay',
    'battle.net',
    'gog galaxy',
    'ea app',
    'xbox app',
    'microsoft store',
]);

const isIgnoredApp = (appName) => {
    if (!appName) return false;
    const lower = appName.toLowerCase().trim();
    for (const ignored of IGNORED_APPS) {
        if (lower.includes(ignored) || ignored.includes(lower)) return true;
    }
    return false;
};

const STATUS_KEYS = {
    online: 'friends.online',
    idle: 'status.idle',
    dnd: 'status.dnd',
    invisible: 'status.invisible',
    offline: 'status.offline',
};
const STATUS_COLOR = {
    online: '#23a559',
    idle: '#f0b232',
    dnd: '#f23f43',
    invisible: '#80848e',
    offline: '#80848e',
};

const getActivityMeta = (activity) => {
    if (activity?.spotify) {
        return {
            icon: '🎵',
            color: '#1db954',
            background: 'rgba(29, 185, 84, 0.16)',
            text: activity.spotify.track || activity.spotify.name,
        };
    }

    if (activity?.steam && !isIgnoredApp(activity.steam.game || activity.steam.name)) {
        return {
            icon: '🎮',
            color: '#66c0f4',
            background: 'rgba(102, 192, 244, 0.16)',
            text: activity.steam.game || activity.steam.name,
        };
    }

    return null;
};

const FriendsList = ({
    friends,
    onlineUsers = [],
    allUsers = [],
    getDeterministicAvatar,
    onStartDM,
    handleRemoveFriend,
    setActiveTab,
    isLoading = false,
    error = null,
}) => {
    const { t } = useTranslation();
    const [search, setSearch] = useState('');
    const myUsername = localStorage.getItem('chat_username') || '';
    const listRef = useRef(null);

    const handleListKeyDown = useCallback((e) => {
        if (!listRef.current) return;
        const items = Array.from(listRef.current.querySelectorAll('[role="button"][tabindex="0"]'));
        const idx = items.indexOf(document.activeElement);
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            items[(idx + 1) % items.length]?.focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            items[(idx - 1 + items.length) % items.length]?.focus();
        }
    }, []);

    if (isLoading) return <div>{t('common.loading')}</div>;
    if (error) return <div role="alert">{error}</div>;

    const enriched = useMemo(
        () =>
            friends.map((friend) => {
                const iAmSender = friend.sender_username === myUsername;
                const friendUsername = iAmSender
                    ? friend.receiver_username
                    : friend.sender_username;
                const displayAvatar = iAmSender ? friend.receiver_avatar : friend.sender_avatar;
                // Prefer live activity from allUsers (real-time) over the stale DB snapshot on the friend object
                const liveUser = allUsers.find((u) => u.username === friendUsername);
                const friendActivity = getFreshActivity(
                    liveUser?.current_activity ||
                    (iAmSender ? friend.receiver_activity : friend.sender_activity)
                );
                const isReallyOnline =
                    Array.isArray(onlineUsers) && onlineUsers.includes(friendUsername);
                return { ...friend, friendUsername, displayAvatar, friendActivity, isReallyOnline };
            }),
        [friends, onlineUsers, allUsers, myUsername]
    );

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        const list = q
            ? enriched.filter((f) => f.friendUsername.toLowerCase().includes(q))
            : enriched;
        // sort: online first
        return [...list].sort((a, b) => (b.isReallyOnline ? 1 : 0) - (a.isReallyOnline ? 1 : 0));
    }, [enriched, search]);

    const onlineCount = enriched.filter((f) => f.isReallyOnline).length;

    if (friends.length === 0) {
        return (
            <div style={styles.emptyState}>
                <div>🥺</div>
                <p style={styles.emptyText}>{t('friends.noFriends')}</p>
                <button
                    onClick={() => setActiveTab('add')}
                    style={styles.emptyBtn}
                    aria-label={t('friends.addFriend')}
                >
                    {t('friends.addFriend')}
                </button>
            </div>
        );
    }

    return (
        <div ref={listRef} onKeyDown={handleListKeyDown}>
            {/* Header with search + online count */}
            <div>
                <div>
                    <FaSearch size={11} color="#7a7d87" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={t('common.search')}
                    />
                </div>
                <div>
                    🟢 {onlineCount} / {friends.length}
                </div>
            </div>

            {filtered.map((friend) => {
                const { id, friendUsername, displayAvatar, friendActivity, isReallyOnline } =
                    friend;
                const friendStatus = isReallyOnline ? 'online' : 'offline';
                const statusText = t(STATUS_KEYS[friendStatus] || 'status.offline', friendStatus);
                const statusColor = STATUS_COLOR[friendStatus] || '#80848e';
                const activityMeta = getActivityMeta(friendActivity);

                return (
                    <div key={id} style={styles.listItem}>
                        <div
                            style={styles.userInfo}
                            role="button"
                            tabIndex={0}
                            onClick={() => onStartDM(friendUsername)}
                            onKeyDown={(e) => e.key === 'Enter' && onStartDM(friendUsername)}
                            aria-label={`${t('friends.startDM')} ${friendUsername}`}
                        >
                            <div>
                                <LazyImage
                                    src={displayAvatar || getDeterministicAvatar(friendUsername)}
                                    style={styles.avatar}
                                    alt="avatar"
                                />
                                <span
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        width: 11,
                                        height: 11,
                                        borderRadius: '50%',
                                        background: statusColor,
                                        border: '2px solid #2b2d31',
                                    }}
                                />
                            </div>
                            <div>
                                <div>
                                    <div style={_st1063}>{friendUsername}</div>
                                    {activityMeta && (
                                        <span
                                            style={{
                                                flexShrink: 0,
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '22px',
                                                height: '22px',
                                                borderRadius: '999px',
                                                background: activityMeta.background,
                                                border: `1px solid ${activityMeta.color}33`,
                                                color: activityMeta.color,
                                                fontSize: '10px',
                                                fontWeight: '700',
                                            }}
                                        >
                                            <span aria-hidden="true">{activityMeta.icon}</span>
                                        </span>
                                    )}
                                </div>
                                <div style={_st1064}>{statusText}</div>
                                {activityMeta && (
                                    <span
                                        style={{
                                            fontSize: '10px',
                                            color: activityMeta.color,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            marginTop: '2px',
                                        }}
                                    >
                                        {activityMeta.icon} {activityMeta.text}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div style={styles.actions}>
                            <button
                                style={styles.iconButton}
                                title={t('friends.startDM')}
                                aria-label={t('friends.startDM')}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onStartDM(friendUsername);
                                }}
                            >
                                <FaCommentDots />
                            </button>
                            <button
                                style={_st1065}
                                title={t('friends.removeFriend')}
                                aria-label={t('friends.removeFriend')}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveFriend(id, friendUsername);
                                }}
                            >
                                <FaTimes />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

FriendsList.propTypes = {
    friends: PropTypes.array,
    onlineUsers: PropTypes.func,
    allUsers: PropTypes.array,
    getDeterministicAvatar: PropTypes.func,
    onStartDM: PropTypes.func,
    handleRemoveFriend: PropTypes.func,
    setActiveTab: PropTypes.func,
    isLoading: PropTypes.bool,
    error: PropTypes.string,
};
export default React.memo(FriendsList);
