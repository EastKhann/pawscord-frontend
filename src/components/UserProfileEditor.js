import React, { useState, useEffect, useRef } from 'react';
import './UserProfileEditor.css';

const UserProfileEditor = ({ userId, onClose }) => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    bio: '',
    avatar: '',
    banner: '',
    status: '',
    pronouns: '',
    birthday: '',
    location: '',
    website: ''
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile'); // profile, appearance, privacy
  const [badges, setBadges] = useState([]);
  const [connections, setConnections] = useState([]);
  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  useEffect(() => {
    fetchProfile();
    fetchBadges();
    fetchConnections();
  }, [userId]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/user/${userId}/profile/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data.profile || {});
      } else {
        console.error('Failed to fetch profile');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBadges = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/user/${userId}/badges/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setBadges(data.badges || []);
      }
    } catch (error) {
      console.error('Error fetching badges:', error);
    }
  };

  const fetchConnections = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/user/${userId}/connections/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setConnections(data.connections || []);
      }
    } catch (error) {
      console.error('Error fetching connections:', error);
    }
  };

  const updateProfile = async (updates) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/user/${userId}/update/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Profile updated');
        setProfile(data.profile);
      } else {
        console.error('❌ Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const uploadAvatar = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      setUploading(true);
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/user/${userId}/avatar/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Avatar uploaded');
        setProfile({ ...profile, avatar: data.avatar_url });
      } else {
        console.error('❌ Failed to upload avatar');
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    } finally {
      setUploading(false);
    }
  };

  const uploadBanner = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('banner', file);

    try {
      setUploading(true);
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/user/${userId}/banner/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Banner uploaded');
        setProfile({ ...profile, banner: data.banner_url });
      } else {
        console.error('❌ Failed to upload banner');
      }
    } catch (error) {
      console.error('Error uploading banner:', error);
    } finally {
      setUploading(false);
    }
  };

  const removeAvatar = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/user/${userId}/avatar/remove/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        console.log('✅ Avatar removed');
        setProfile({ ...profile, avatar: '' });
      } else {
        console.error('❌ Failed to remove avatar');
      }
    } catch (error) {
      console.error('Error removing avatar:', error);
    }
  };

  const removeBanner = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/user/${userId}/banner/remove/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        console.log('✅ Banner removed');
        setProfile({ ...profile, banner: '' });
      } else {
        console.error('❌ Failed to remove banner');
      }
    } catch (error) {
      console.error('Error removing banner:', error);
    }
  };

  const addConnection = async (platform, username) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/user/${userId}/connections/add/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ platform, username })
      });

      if (response.ok) {
        console.log('✅ Connection added');
        fetchConnections();
      } else {
        console.error('❌ Failed to add connection');
      }
    } catch (error) {
      console.error('Error adding connection:', error);
    }
  };

  const removeConnection = async (connectionId) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/user/${userId}/connections/${connectionId}/remove/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        console.log('✅ Connection removed');
        fetchConnections();
      } else {
        console.error('❌ Failed to remove connection');
      }
    } catch (error) {
      console.error('Error removing connection:', error);
    }
  };

  if (loading) {
    return (
      <div className="profile-editor-overlay">
        <div className="profile-editor-modal">
          <div className="loading-spinner">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-editor-overlay" onClick={onClose}>
      <div className="profile-editor-modal" onClick={e => e.stopPropagation()}>
        <div className="profile-editor-header">
          <h2>👤 Edit Profile</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="profile-tabs">
          <button
            className={`profile-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            📝 Profile
          </button>
          <button
            className={`profile-tab ${activeTab === 'appearance' ? 'active' : ''}`}
            onClick={() => setActiveTab('appearance')}
          >
            🎨 Appearance
          </button>
          <button
            className={`profile-tab ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacy')}
          >
            🔒 Privacy
          </button>
        </div>

        <div className="profile-editor-content">
          {activeTab === 'profile' && (
            <div className="profile-section">
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={profile.username || ''}
                  onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  onBlur={() => updateProfile({ username: profile.username })}
                  placeholder="Your username"
                  maxLength={32}
                />
                <span className="char-count">{profile.username?.length || 0}/32</span>
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  value={profile.bio || ''}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  onBlur={() => updateProfile({ bio: profile.bio })}
                  placeholder="Tell us about yourself..."
                  maxLength={190}
                  rows={4}
                />
                <span className="char-count">{profile.bio?.length || 0}/190</span>
              </div>

              <div className="form-group">
                <label>Pronouns</label>
                <input
                  type="text"
                  value={profile.pronouns || ''}
                  onChange={(e) => setProfile({ ...profile, pronouns: e.target.value })}
                  onBlur={() => updateProfile({ pronouns: profile.pronouns })}
                  placeholder="e.g., he/him, she/her, they/them"
                  maxLength={20}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Birthday</label>
                  <input
                    type="date"
                    value={profile.birthday || ''}
                    onChange={(e) => {
                      setProfile({ ...profile, birthday: e.target.value });
                      updateProfile({ birthday: e.target.value });
                    }}
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={profile.location || ''}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    onBlur={() => updateProfile({ location: profile.location })}
                    placeholder="City, Country"
                    maxLength={50}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Website</label>
                <input
                  type="url"
                  value={profile.website || ''}
                  onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                  onBlur={() => updateProfile({ website: profile.website })}
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div className="connections-section">
                <h3>🔗 Connections</h3>
                <div className="connections-list">
                  {connections.length === 0 ? (
                    <p className="no-connections">No connections yet</p>
                  ) : (
                    connections.map(conn => (
                      <div key={conn.id} className="connection-item">
                        <div className="connection-icon">{conn.icon}</div>
                        <div className="connection-info">
                          <div className="connection-platform">{conn.platform}</div>
                          <div className="connection-username">{conn.username}</div>
                        </div>
                        <button
                          className="remove-connection-btn"
                          onClick={() => removeConnection(conn.id)}
                        >
                          ✕
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="badges-section">
                <h3>🏆 Badges</h3>
                <div className="badges-list">
                  {badges.length === 0 ? (
                    <p className="no-badges">No badges earned yet</p>
                  ) : (
                    badges.map(badge => (
                      <div key={badge.id} className="badge-item" title={badge.description}>
                        <span className="badge-icon">{badge.icon}</span>
                        <span className="badge-name">{badge.name}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="appearance-section">
              <div className="banner-upload-section">
                <label>Profile Banner</label>
                <div className="banner-preview" style={{ backgroundImage: profile.banner ? `url(${profile.banner})` : 'none' }}>
                  {!profile.banner && <div className="banner-placeholder">Click to upload banner</div>}
                  <div className="banner-actions">
                    <button
                      className="upload-banner-btn"
                      onClick={() => bannerInputRef.current?.click()}
                      disabled={uploading}
                    >
                      📤 {uploading ? 'Uploading...' : 'Upload Banner'}
                    </button>
                    {profile.banner && (
                      <button className="remove-banner-btn" onClick={removeBanner}>
                        🗑️ Remove
                      </button>
                    )}
                  </div>
                </div>
                <input
                  ref={bannerInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => uploadBanner(e.target.files[0])}
                />
                <p className="upload-hint">Recommended: 960x240px, max 8MB</p>
              </div>

              <div className="avatar-upload-section">
                <label>Profile Avatar</label>
                <div className="avatar-preview-container">
                  <div className="avatar-preview">
                    <img src={profile.avatar || '/default-avatar.png'} alt="Avatar" />
                  </div>
                  <div className="avatar-actions">
                    <button
                      className="upload-avatar-btn"
                      onClick={() => avatarInputRef.current?.click()}
                      disabled={uploading}
                    >
                      📤 {uploading ? 'Uploading...' : 'Upload Avatar'}
                    </button>
                    {profile.avatar && (
                      <button className="remove-avatar-btn" onClick={removeAvatar}>
                        🗑️ Remove
                      </button>
                    )}
                  </div>
                </div>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => uploadAvatar(e.target.files[0])}
                />
                <p className="upload-hint">Recommended: 256x256px, max 8MB</p>
              </div>

              <div className="theme-section">
                <h3>🎨 Profile Theme</h3>
                <p className="section-description">Customize how your profile appears to others</p>
                <div className="theme-options">
                  <div className="theme-option">
                    <span>Primary Color</span>
                    <input type="color" defaultValue="#8b5cf6" />
                  </div>
                  <div className="theme-option">
                    <span>Accent Color</span>
                    <input type="color" defaultValue="#ec4899" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="privacy-section">
              <div className="privacy-setting">
                <div className="setting-info">
                  <h4>Show Online Status</h4>
                  <p>Let friends see when you're online</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="privacy-setting">
                <div className="setting-info">
                  <h4>Show Activity</h4>
                  <p>Display your current game or app</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="privacy-setting">
                <div className="setting-info">
                  <h4>Allow Direct Messages</h4>
                  <p>Receive DMs from server members</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="privacy-setting">
                <div className="setting-info">
                  <h4>Allow Friend Requests</h4>
                  <p>Let others send you friend requests</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="privacy-setting">
                <div className="setting-info">
                  <h4>Show Profile in Discovery</h4>
                  <p>Appear in public server member lists</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileEditor;
