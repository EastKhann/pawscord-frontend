import profileStyles from './styles';

/**
 * Sidebar navigation for UserProfilePanel.
 * Contains all category/tab navigation buttons and logout action.
 */
const ProfileSidebar = ({ activeTab, setActiveTab, setActiveCategory, isOwnProfile, onLogout, setShowLogoutModal }) => {
  const styles = profileStyles;

  return (
    <div style={styles.sidebar} className="user-profile-sidebar">
      <div style={styles.sidebarSection}>
        <div style={styles.sidebarHeader}>👤 Hesabım</div>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'profile')}
          onClick={() => { setActiveTab('profile'); setActiveCategory('account'); }}
        >
          Profil
        </button>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'badges')}
          onClick={() => { setActiveTab('badges'); setActiveCategory('account'); }}
        >
          Rozetler & XP
        </button>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'inventory')}
          onClick={() => { setActiveTab('inventory'); setActiveCategory('account'); }}
        >
          Envanter
        </button>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'endorsements')}
          onClick={() => { setActiveTab('endorsements'); setActiveCategory('account'); }}
        >
          Onaylar
        </button>
      </div>

      <div style={styles.sidebarSection}>
        <div style={styles.sidebarHeader}>🔐 Gizlilik & Güvenlik</div>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'security')}
          onClick={() => { setActiveTab('security'); setActiveCategory('security'); }}
        >
          Güvenlik
        </button>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'privacy')}
          onClick={() => { setActiveTab('privacy'); setActiveCategory('security'); }}
        >
          Gizlilik
        </button>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'gdpr')}
          onClick={() => { setActiveTab('gdpr'); setActiveCategory('security'); }}
        >
          GDPR
        </button>
      </div>

      <div style={styles.sidebarSection}>
        <div style={styles.sidebarHeader}>👥 Sosyal</div>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'friends')}
          onClick={() => { setActiveTab('friends'); setActiveCategory('social'); }}
        >
          Arkadaşlar
        </button>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'activity')}
          onClick={() => { setActiveTab('activity'); setActiveCategory('social'); }}
        >
          Aktivite
        </button>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'status')}
          onClick={() => { setActiveTab('status'); setActiveCategory('social'); }}
        >
          Özel Durum
        </button>
      </div>

      <div style={styles.sidebarSection}>
        <div style={styles.sidebarHeader}>🎨 Görünüm</div>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'appearance')}
          onClick={() => { setActiveTab('appearance'); setActiveCategory('appearance'); }}
        >
          Tema
        </button>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'sounds')}
          onClick={() => { setActiveTab('sounds'); setActiveCategory('appearance'); }}
        >
          Sesler
        </button>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'notifications')}
          onClick={() => { setActiveTab('notifications'); setActiveCategory('appearance'); }}
        >
          Bildirimler
        </button>
      </div>

      <div style={styles.sidebarSection}>
        <div style={styles.sidebarHeader}>📱 Uygulama</div>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'drafts')}
          onClick={() => { setActiveTab('drafts'); setActiveCategory('app'); }}
        >
          Taslaklar
        </button>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'bookmarks')}
          onClick={() => { setActiveTab('bookmarks'); setActiveCategory('app'); }}
        >
          Yer İmleri
        </button>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'history')}
          onClick={() => { setActiveTab('history'); setActiveCategory('app'); }}
        >
          Geçmiş
        </button>
      </div>

      <div style={styles.sidebarSection}>
        <div style={styles.sidebarHeader}>🔧 Gelişmiş</div>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'premium')}
          onClick={() => { setActiveTab('premium'); setActiveCategory('advanced'); }}
        >
          Premium
        </button>
        <button
          className="sidebar-btn"
          style={styles.sidebarBtn(activeTab === 'developer')}
          onClick={() => { setActiveTab('developer'); setActiveCategory('advanced'); }}
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
            onClick={() => setShowLogoutModal(true)}
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

export default ProfileSidebar;
