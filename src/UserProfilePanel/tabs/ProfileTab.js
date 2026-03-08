import React from 'react';
import { ABSOLUTE_HOST_URL } from '../../utils/constants';
import profileStyles from '../styles';

const BASE_URL = ABSOLUTE_HOST_URL;

const ProfileTab = ({
  defaultAvatars,
  emailVerified,
  fileInputRef,
  formData,
  handleAvatarUpload,
  handleInputChange,
  handlePhoneUpdate,
  handleSaveProfile,
  isOwnProfile,
  loading,
  phoneNumber,
  resendVerificationEmail,
  selectDefaultAvatar,
  setPhoneNumber,
}) => {
  const styles = profileStyles;

  return (
    <>
      <div className="profile-card">
        <div className="profile-card-header">
          <div className="profile-card-title">
            <span className="profile-card-icon">👤</span>
            Profil Bilgileri
          </div>
        </div>

        <div style={styles.avatarSection}>
          <img
            src={
              formData.avatar_url && typeof formData.avatar_url === 'string'
                ? ((formData.avatar_url.startsWith('http')
                  ? formData.avatar_url
                  : `${BASE_URL}${formData.avatar_url}`) + `?t=${Date.now()}`)
                : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%235865f2" width="100" height="100"/%3E%3Ctext x="50" y="50" font-size="45" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E'
            }
            alt="Avatar"
            style={styles.avatar}
            key={formData.avatar_url}
            onError={(e) => {
              // Prevent infinite loop - only set fallback once
              if (!e.target.dataset.errorHandled) {
                e.target.dataset.errorHandled = 'true';
                console.error('❌ [Avatar Load Error]', e.target.src);
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%235865f2" width="100" height="100"/%3E%3Ctext x="50" y="50" font-size="45" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E';
              }
            }}
          />
          {/* 🔑 Only show avatar upload button for own profile */}
          {isOwnProfile && (
            <div>
              <button
                style={styles.button('secondary')}
                onClick={() => fileInputRef.current?.click()}
                disabled={loading.avatar}
              >
                {loading.avatar ? '⏳ Yükleniyor...' : '📷 Avatar Değiştir'}
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleAvatarUpload}
              />
              <p style={{ color: '#b5bac1', fontSize: '12px', marginTop: '8px' }}>
                Max 5MB • PNG, JPG, GIF
              </p>
            </div>
          )}
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Kullanıcı Adı</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            style={styles.input}
            disabled={!isOwnProfile}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>E-posta</label>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input
              type="email"
              value={formData.email}
              disabled
              style={{ ...styles.input, opacity: 0.6 }}
            />
            {isOwnProfile && !emailVerified && (
              <button
                style={styles.button('secondary')}
                onClick={resendVerificationEmail}
                disabled={loading.resendEmail}
              >
                {loading.resendEmail ? '⏳' : '✉️ Doğrula'}
              </button>
            )}
            {emailVerified && <span style={{ color: '#23a559', fontSize: '20px' }}>✅</span>}
          </div>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Durum Mesajı</label>
          <input
            type="text"
            name="status_message"
            value={formData.status_message}
            onChange={handleInputChange}
            placeholder="Bugün nasılsın?"
            style={styles.input}
            disabled={!isOwnProfile}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>📱 Telefon Numarası</label>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+90 555 123 4567"
              style={{ ...styles.input, flex: 1 }}
            />
            <button
              style={styles.button('secondary')}
              onClick={handlePhoneUpdate}
              disabled={loading.phoneUpdate}
            >
              {loading.phoneUpdate ? '⏳' : '💾'}
            </button>
          </div>
        </div>

        {/* 🔑 Only show save button for own profile */}
        {isOwnProfile && (
          <button
            style={styles.button('primary')}
            onClick={handleSaveProfile}
            disabled={loading.saveProfile}
          >
            {loading.saveProfile ? '⏳ Kaydediliyor...' : '💾 Kaydet'}
          </button>
        )}
      </div>

      {/* 🔑 Only show default avatars for own profile */}
      {isOwnProfile && (
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>🎭 Hazır Avatarlar</h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px', marginTop: '16px' }}>
            {defaultAvatars.map((avatar, idx) => {
              // 🚀 Use thumbnail for display (fast loading), original for saving (high quality)
              const displayUrl = avatar.thumbnailUrl || avatar.url;

              return (
                <div
                  key={idx}
                  title={avatar.name}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: formData.avatar_url === avatar.url ? '3px solid #5865f2' : '2px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.3s',
                    boxShadow: formData.avatar_url === avatar.url ? '0 0 15px rgba(88, 101, 242, 0.5)' : 'none',
                    backgroundColor: '#111214', // Placeholder background while loading
                  }}
                  onClick={() => selectDefaultAvatar(avatar)}
                >
                  <img
                    src={displayUrl}
                    alt={avatar.name}
                    loading="lazy" // 🚀 Native lazy loading
                    decoding="async" // 🚀 Non-blocking decode
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      // 🚀 Final fallback: SVG placeholder (backend already sent best available)
                      if (!e.target.dataset.errorHandled) {
                        e.target.dataset.errorHandled = 'true';
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%235865f2" width="100" height="100"/%3E%3Ctext x="50" y="50" font-size="45" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E';
                      }
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>🔗 Sosyal Bağlantılar</h3>

        {/* 🔗 OAuth ile Bağlan Butonu */}
        <div style={{
          marginBottom: '20px',
          padding: '16px',
          background: 'linear-gradient(135deg, #5865f2 0%, #5865f2 100%)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h4 style={{ color: 'white', margin: 0, marginBottom: '4px' }}>🎮 Hesaplarını Bağla</h4>
            <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '14px' }}>
              Spotify, Steam, Epic Games, Twitch, Xbox ve daha fazlası
            </p>
          </div>
          <button
            onClick={() => {
              // ConnectionsPanel'i açmak için global event gönder
              window.dispatchEvent(new CustomEvent('openConnectionsPanel'));
            }}
            style={{
              background: 'white',
              color: '#5865f2',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            🔗 Bağlantıları Yönet
          </button>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>🎮 Steam ID</label>
          <input
            type="text"
            name="steam_id"
            value={formData.steam_id}
            onChange={handleInputChange}
            placeholder="76561198012345678"
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>🎵 Spotify Kullanıcı Adı</label>
          <input
            type="text"
            name="spotify_username"
            value={formData.spotify_username}
            onChange={handleInputChange}
            placeholder="spotify_username"
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>📸 Instagram</label>
          <input
            type="text"
            name="instagram_username"
            value={formData.instagram_username}
            onChange={handleInputChange}
            placeholder="@instagram"
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>🐦 X (Twitter)</label>
          <input
            type="text"
            name="x_username"
            value={formData.x_username}
            onChange={handleInputChange}
            placeholder="@x_username"
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>🎮 Xbox Gamertag</label>
          <input
            type="text"
            name="xbox_gamertag"
            value={formData.xbox_gamertag}
            onChange={handleInputChange}
            placeholder="XboxGamerTag"
            style={styles.input}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileTab;
