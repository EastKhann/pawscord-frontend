import React from 'react';
import profileStyles from '../styles';

const BookmarksTab = ({ bookmarks }) => {
  const styles = profileStyles;

  return (
    <div style={styles.card}>
      <h3 style={styles.sectionTitle}>🔖 Yer İmleri</h3>

      {bookmarks.length === 0 ? (
        <div style={{
          padding: '48px',
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '12px',
        }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔖</div>
          <h4 style={{ color: '#fff', margin: '0 0 8px 0' }}>Henüz yer imi yok</h4>
          <p style={{ color: '#b9bbbe', margin: 0 }}>
            Mesajları işaretleyerek buraya ekleyebilirsiniz
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {bookmarks.map((bookmark, idx) => (
            <div
              key={idx}
              style={{
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                borderLeft: '4px solid #ffd700',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <img
                  src={bookmark.author_avatar || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"%3E%3Crect fill="%235865f2" width="32" height="32" rx="16"/%3E%3Ctext x="16" y="16" font-size="14" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E'}
                  alt={bookmark.author_name}
                  style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ color: '#fff', margin: 0, fontSize: '14px' }}>
                    {bookmark.author_name}
                  </h4>
                  <span style={{ color: '#b9bbbe', fontSize: '12px' }}>
                    {bookmark.channel_name} • {new Date(bookmark.timestamp).toLocaleString('tr-TR')}
                  </span>
                </div>
              </div>
              <p style={{ color: '#dcddde', margin: 0, fontSize: '14px' }}>
                {bookmark.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarksTab;
