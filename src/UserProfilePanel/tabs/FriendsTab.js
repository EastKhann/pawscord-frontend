import React from 'react';
import profileStyles from '../styles';

const FriendsTab = ({ friendRequests, friends, removeFriend, respondToFriendRequest }) => {
  const styles = profileStyles;

  return (
    <>
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>📨 Bekleyen Arkadaşlık İstekleri</h3>

        {friendRequests.length === 0 && (
          <p style={{ color: '#b9bbbe', textAlign: 'center', padding: '24px' }}>
            Bekleyen istek yok.
          </p>
        )}

        {friendRequests.map((request) => (
          <div key={request.id} style={styles.sessionCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src={request.from_user.avatar_url || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Crect fill="%235865f2" width="40" height="40" rx="20"/%3E%3Ctext x="20" y="20" font-size="18" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E'}
                alt={request.from_user.username}
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
              />
              <div>
                <p style={{ color: '#fff', margin: 0, fontWeight: '600' }}>
                  {request.from_user.username}
                </p>
                <p style={{ color: '#b9bbbe', fontSize: '12px', margin: '4px 0 0 0' }}>
                  {new Date(request.created_at).toLocaleDateString('tr-TR')}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                style={styles.button('primary')}
                onClick={() => respondToFriendRequest(request.id, 'accept')}
              >
                ✅ Kabul Et
              </button>
              <button
                style={styles.button('danger')}
                onClick={() => respondToFriendRequest(request.id, 'reject')}
              >
                ❌ Reddet
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>👥 Arkadaşlarım ({friends.length})</h3>

        {friends.length === 0 && (
          <p style={{ color: '#b9bbbe', textAlign: 'center', padding: '24px' }}>
            Henüz arkadaşınız yok.
          </p>
        )}

        <div style={{ display: 'grid', gap: '12px', marginTop: '16px' }}>
          {friends.map((friend) => (
            <div key={friend.id} style={styles.sessionCard}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={friend.avatar_url || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Crect fill="%235865f2" width="40" height="40" rx="20"/%3E%3Ctext x="20" y="20" font-size="18" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E'}
                  alt={friend.username}
                  style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ color: '#fff', margin: 0, fontWeight: '600' }}>
                    {friend.username}
                  </p>
                  <p style={{ color: '#b9bbbe', fontSize: '12px', margin: '4px 0 0 0' }}>
                    {friend.status_message || 'Durum mesajı yok'}
                  </p>
                </div>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: friend.is_online ? '#43b581' : '#747f8d'
                }} />
              </div>
              <button
                style={styles.button('danger')}
                onClick={() => removeFriend(friend.friendship_id)}
              >
                🗑️ Kaldır
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FriendsTab;
