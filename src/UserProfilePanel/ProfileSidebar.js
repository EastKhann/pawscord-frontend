import React, { useCallback } from 'react';
import profileStyles from './styles';

/**
 * Sidebar navigation for UserProfilePanel.
 * Contains all category/tab navigation buttons and logout action.
 */
const ProfileSidebar = ({ activeTab, setActiveTab, setActiveCategory, isOwnProfile, onLogout, setShowLogoutModal }) => {
  const styles = profileStyles;
  const handleNav = useCallback((tab, cat) => { setActiveTab(tab); setActiveCategory(cat); }, [setActiveTab, setActiveCategory]);
  const handleLogout = useCallback(() => setShowLogoutModal(true), [setShowLogoutModal]);

  return (
    <div style={styles.sidebar} className="user-profile-sidebar">
      <div style={styles.sidebarSection}>
        <div style={styles.sidebarHeader}>👤 Hesabım</div>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'profile')}
          onClick={() => handleNav('profile', 'account')}
        >
          Profil
        </button>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'badges')}
          onClick={() => handleNav('badges', 'account')}
        >
          Rozetler & XP
        </button>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'inventory')}
          onClick={() => handleNav('inventory', 'account')}
        >
          Envanter
        </button>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'endorsements')}
          onClick={() => handleNav('endorsements', 'account')}
        >
          Onaylar
        </button>
      </div>

      <div style={styles.sidebarSection}>
        <div style={styles.sidebarHeader}>🔐 Gizlilik & Güvenlik</div>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'security')}
          onClick={() => handleNav('security', 'security')}
        >
          Güvenlik
        </button>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'privacy')}
          onClick={() => handleNav('privacy', 'security')}
        >
          Gizlilik
        </button>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'gdpr')}
          onClick={() => handleNav('gdpr', 'security')}
        >
          GDPR
        </button>
      </div>

      <div style={styles.sidebarSection}>
        <div style={styles.sidebarHeader}>👥 Sosyal</div>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'friends')}
          onClick={() => handleNav('friends', 'social')}
        >
          Arkadaşlar
        </button>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'activity')}
          onClick={() => handleNav('activity', 'social')}
        >
          Aktivite
        </button>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'status')}
          onClick={() => handleNav('status', 'social')}
        >
          Özel Durum
        </button>
      </div>

      <div style={styles.sidebarSection}>
        <div style={styles.sidebarHeader}>🎨 Görünüm</div>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'appearance')}
          onClick={() => handleNav('appearance', 'appearance')}
        >
          Tema
        </button>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'sounds')}
          onClick={() => handleNav('sounds', 'appearance')}
        >
          Sesler
        </button>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'notifications')}
          onClick={() => handleNav('notifications', 'appearance')}
        >
          Bildirimler
        </button>
      </div>

      <div style={styles.sidebarSection}>
        <div style={styles.sidebarHeader}>📱 Uygulama</div>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'drafts')}
          onClick={() => handleNav('drafts', 'app')}
        >
          Taslaklar
        </button>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'bookmarks')}
          onClick={() => handleNav('bookmarks', 'app')}
        >
          Yer İmleri
        </button>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'history')}
          onClick={() => handleNav('history', 'app')}
        >
          Geçmiş
        </button>
      </div>

      <div style={styles.sidebarSection}>
        <div style={styles.sidebarHeader}>🔧 Gelişmiş</div>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'premium')}
          onClick={() => handleNav('premium', 'advanced')}
        >
          Premium
        </button>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'developer')}
          onClick={() => handleNav('developer', 'advanced')}
        >
          Geliştirici
        </button>
      </div>

      {/* 🚪 Çıkış Yap Butonu */}
      {isOwnProfile && onLogout && (
        <div style={{ ...styles.sidebarSection, borderTop: '1px solid #40444b', marginTop: '16px', paddingTop: '16px' }}>
          <button
            className="sidebar-btn logout-btn"
            style={{
              ...styles.sidebarBtn(false),
              background: 'transparent',
              color: '#f04747',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              justifyContent: 'flex-start',
              padding: '10px 12px',
              width: '100%',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onClick={handleLogout}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(240, 71, 71, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            🚪 Çıkış Yap
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(ProfileSidebar);
