import { useState, useEffect } from 'react';
import AvatarCropper from './components/AvatarCropper';
import LogoutModal from './components/LogoutModal';
import './UserProfilePanel.css';
import profileStyles from './UserProfilePanel/styles';
import useProfileAPI from './UserProfilePanel/hooks/useProfileAPI';
import ProfileHeader from './UserProfilePanel/ProfileHeader';
import ProfileSidebar from './UserProfilePanel/ProfileSidebar';
import ProfileTabContent from './UserProfilePanel/ProfileTabContent';

const UserProfilePanel = ({ user, onClose, onUpdate, onLogout }) => {
  // Safety check
  if (!user) {
    console.error('[UserProfilePanel] User prop is null/undefined');
    return null;
  }

  // Ownership detection
  const currentUsername = localStorage.getItem('chat_username');
  const currentUserId = localStorage.getItem('user_id');
  const viewingUsername = user?.username || user?.user?.username || user?.name;
  const isOwnProfile = viewingUsername === currentUsername ||
    user?.id?.toString() === currentUserId;

  // Tab navigation state
  const [activeTab, setActiveTab] = useState('profile');
  const [activeCategory, setActiveCategory] = useState('account');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // All API state + functions from custom hook
  const api = useProfileAPI({ user, isOwnProfile, onUpdate });

  // Lazy loading: Fetch data when category changes
  useEffect(() => {
    api.fetchDataForCategory(activeCategory);
  }, [activeCategory]);

  const styles = profileStyles;

  try {
    return (
      <div style={styles.overlay} onClick={onClose}>
        <div style={styles.panel} onClick={(e) => e.stopPropagation()}>
          {/* Banner Header */}
          <ProfileHeader
            formData={api.formData}
            premiumStatus={api.premiumStatus}
            badges={api.badges}
            userStats={api.userStats}
            customStatus={api.customStatus}
            friends={api.friends}
            onClose={onClose}
            styles={styles}
          />

          <div style={styles.body}>
            {/* Sidebar Navigation */}
            <ProfileSidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setActiveCategory={setActiveCategory}
              isOwnProfile={isOwnProfile}
              onLogout={onLogout}
              setShowLogoutModal={setShowLogoutModal}
            />

            {/* Tab Content */}
            <div style={styles.content} className="user-profile-content">
              <ProfileTabContent
                activeTab={activeTab}
                api={api}
                isOwnProfile={isOwnProfile}
                user={user}
              />
            </div>
          </div>
        </div>

        {/* Avatar Cropper Modal */}
        {api.showCropper && (
          <AvatarCropper
            imageFile={api.tempImageFile}
            onCropComplete={api.handleCropComplete}
            onCancel={() => {
              api.setShowCropper(false);
              api.setTempImageFile(null);
            }}
          />
        )}

        {/* Logout Modal */}
        <LogoutModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={() => {
            onLogout();
            onClose();
          }}
          username={user?.username || currentUsername}
        />
      </div>
    );
  } catch (error) {
    console.error('[UserProfilePanel] Render error:', error);
    return (
      <div style={styles.overlay} onClick={onClose}>
        <div style={{
          background: '#2f3136',
          padding: '32px',
          borderRadius: '12px',
          textAlign: 'center',
          color: '#fff'
        }}>
          <h3>Profil Yuklenemedi</h3>
          <p style={{ color: '#b9bbbe' }}>Bir hata olustu. Lutfen tekrar deneyin.</p>
          <button
            onClick={onClose}
            style={{
              background: '#5865f2',
              color: '#fff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              marginTop: '16px'
            }}
          >
            Kapat
          </button>
        </div>
      </div>
    );
  }
};

export default UserProfilePanel;