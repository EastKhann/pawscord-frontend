// frontend/src/ChatUserList.js
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCircle, FaMoon } from 'react-icons/fa';
import { styles } from './ChatUserList/chatUserListStyles';
import UserItem from './ChatUserList/UserItem';

const ChatUserList = ({
  chatUsers = [],
  allUsers = [],
  onlineUsers = [],
  currentUser,
  currentUserProfile,
  getDeterministicAvatar,
  onUserClick,
  onUserContextMenu,
  activeChat = {},
  serverMembers = [],
  friendsList = [],
  onNavigate
}) => {
  const navigate = useNavigate();

  const displayUsers = useMemo(() => {
    if (activeChat.type === 'room' || activeChat.type === 'server') {
      if (serverMembers.length === 0) return [];
      return serverMembers.map(member => {
        const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(member.username);
        const userInfo = allUsers.find(u => u.username === member.username) || {};
        return {
          username: member.username,
          display_name: userInfo.display_name || member.username,
          avatar: userInfo.avatar || member.avatar || getDeterministicAvatar?.(member.username),
          status: isOnline ? 'online' : 'offline',
          is_online: isOnline,
          role: member.role || 'member',
          current_activity: userInfo.current_activity || member.current_activity || {}
        };
      });
    } else {
      let friendsToProcess = friendsList;
      if (friendsList.length === 0 && allUsers.length > 1) {
        friendsToProcess = allUsers.filter(u => u.username !== currentUser);
      }
      if (friendsToProcess.length === 0) return [];
      return friendsToProcess.map(friend => {
        const friendUsername = friend.username || friend;
        const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(friendUsername);
        const userInfo = allUsers.find(u => u.username === friendUsername) || friend;
        return {
          username: friendUsername,
          display_name: userInfo.display_name || friendUsername,
          avatar: userInfo.avatar || friend.avatar || getDeterministicAvatar?.(friendUsername),
          status: isOnline ? 'online' : (userInfo.status || 'offline'),
          is_online: isOnline,
          role: 'friend',
          current_activity: userInfo.current_activity || friend.current_activity
        };
      });
    }
  }, [activeChat.type, serverMembers, friendsList, onlineUsers, allUsers, getDeterministicAvatar, currentUser]);

  const { onlineList, offlineList } = useMemo(() => {
    const online = displayUsers.filter(u => u.is_online);
    const offline = displayUsers.filter(u => !u.is_online);
    online.sort((a, b) => a.username.localeCompare(b.username));
    offline.sort((a, b) => a.username.localeCompare(b.username));
    return { onlineList: online, offlineList: offline };
  }, [displayUsers]);

  const totalCount = displayUsers.length;
  const onlineCount = onlineList.length;
  const isServer = activeChat.type === 'room' || activeChat.type === 'server';

  const renderUserList = (users) =>
    users.map(user => (
      <UserItem
        key={user.username}
        user={user}
        isCurrentUser={user.username === currentUser}
        onClick={() => onUserClick?.(user.username)}
        onContextMenu={(e) => { e.preventDefault(); onUserContextMenu?.(e, user.username); }}
      />
    ));

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <span style={styles.headerTitle}>
          {isServer ? 'Sunucu Üyeleri' : 'Arkadaşlar'}
        </span>
        <span style={styles.headerCount}>{onlineCount} / {totalCount}</span>
      </div>

      {/* USER LIST */}
      <div style={styles.userList}>
        {totalCount === 0 ? (
          <div style={styles.emptyState}>
            <FaCircle size={24} color="#43b581" style={{ opacity: 0.3 }} />
            <p style={{ color: '#b9bbbe', fontSize: '13px', marginTop: '8px' }}>
              {isServer ? 'Bu sunucuda kimse yok' : 'Arkadaş listesi boş. Arkadaş ekle!'}
            </p>
          </div>
        ) : (
          <>
            {onlineList.length > 0 && (
              <>
                <div style={styles.sectionHeader}>
                  <FaCircle size={8} color="#43b581" />
                  <span style={styles.sectionTitle}>Çevrimiçi — {onlineList.length}</span>
                </div>
                {renderUserList(onlineList)}
              </>
            )}

            {offlineList.length > 0 && (
              <>
                <div style={{ ...styles.sectionHeader, marginTop: onlineList.length > 0 ? '16px' : '0' }}>
                  <FaMoon size={8} color="#747f8d" />
                  <span style={styles.sectionTitle}>Çevrimdışı — {offlineList.length}</span>
                </div>
                {renderUserList(offlineList)}
              </>
            )}
          </>
        )}
      </div>

      {/* QUICK ACCESS & LOGO */}
      <div style={styles.quickAccessSection}>
        {currentUserProfile?.is_whitelisted && (
          <>
            <div style={styles.quickAccessHeader}>HIZLI ERİŞİM</div>
            <button
              onClick={() => navigate('/eng-learn')}
              style={styles.quickAccessButton}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(88, 101, 242, 0.4)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(88, 101, 242, 0.3)'; }}
            >
              <span style={{ fontSize: '18px' }}>📚</span>
              <span>English Learn</span>
            </button>
            <button
              onClick={() => navigate('/crypto-analysis')}
              style={{
                ...styles.quickAccessButton,
                background: 'linear-gradient(135deg, #F39C12 0%, #E67E22 100%)',
                boxShadow: '0 2px 8px rgba(243, 156, 18, 0.3)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(243, 156, 18, 0.4)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(243, 156, 18, 0.3)'; }}
            >
              <span style={{ fontSize: '18px' }}>📊</span>
              <span>Crypto Signals</span>
            </button>
          </>
        )}
        <div style={styles.pawscordLogo}>
          <div style={{ fontSize: '24px', marginBottom: '4px' }}>🐾</div>
          <div style={{ fontWeight: 'bold', color: '#5865f2', fontSize: '14px' }}>PAWSCORD</div>
          <div style={{ fontSize: '11px', color: '#b9bbbe', opacity: 0.7, marginTop: '2px' }}>v1.1.133</div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChatUserList);
