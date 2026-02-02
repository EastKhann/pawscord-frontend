import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import QRCode from 'qrcode.react';
import { getApiBase } from './utils/apiEndpoints';

const API_URL = getApiBase();

const UserProfilePanel = ({ user, onClose, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState({});
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    status_message: user?.status_message || '',
    avatar_url: user?.avatar_url || '',
    steam_id: user?.steam_id || '',
    spotify_username: user?.spotify_username || '',
    instagram_username: user?.instagram_username || '',
    x_username: user?.x_username || '',
    xbox_gamertag: user?.xbox_gamertag || '',
  });

  // 🔒 Security & 2FA State
  const [twoFactorData, setTwoFactorData] = useState(null);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [backupCodes, setBackupCodes] = useState([]);
  const [verificationCode, setVerificationCode] = useState('');
  const [sessions, setSessions] = useState([]);

  // 🎨 Theme State
  const [themes, setThemes] = useState([]);
  const [currentTheme, setCurrentTheme] = useState('dark');

  // 🏆 Badges & XP State
  const [badges, setBadges] = useState([]);
  const [userStats, setUserStats] = useState({
    level: user?.level || 1,
    xp: user?.xp || 0,
    coins: user?.coins || 0,
    next_level_xp: 100,
  });

  // 📧 Email Verification State
  const [emailVerified, setEmailVerified] = useState(user?.is_active || false);

  // 🔑 Password Change State
  const [passwordData, setPasswordData] = useState({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });

  const fileInputRef = useRef(null);

  // ========================================
  // 📊 FETCH DATA ON MOUNT
  // ========================================
  useEffect(() => {
    if (user) {
      fetchBadges();
      fetchThemes();
      fetchEmailVerificationStatus();
      fetchSessions();
      check2FAStatus();
    }
  }, [user]);

  // ========================================
  // 🔒 2FA FUNCTIONS
  // ========================================
  const check2FAStatus = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/api/2fa/methods/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTwoFactorEnabled(response.data?.totp_enabled || false);
    } catch (err) {
      console.error('2FA status check failed:', err);
    }
  };

  const enable2FA = async () => {
    try {
      setLoading({ ...loading, enable2fa: true });
      const token = localStorage.getItem('access_token');
      const response = await axios.post(`${API_URL}/api/security/2fa/enable/`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTwoFactorData(response.data);
      setBackupCodes(response.data.backup_codes || []);
      toast.success('📱 2FA QR kodu oluşturuldu! Lütfen telefonunuzdaki authenticator uygulamasıyla tarayın.');
    } catch (err) {
      toast.error('2FA etkinleştirme başarısız: ' + (err.response?.data?.error || 'Bilinmeyen hata'));
    } finally {
      setLoading({ ...loading, enable2fa: false });
    }
  };

  const verify2FASetup = async () => {
    try {
      setLoading({ ...loading, verify2fa: true });
      const token = localStorage.getItem('access_token');
      await axios.post(`${API_URL}/api/security/2fa/verify-setup/`, {
        code: verificationCode
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTwoFactorEnabled(true);
      setTwoFactorData(null);
      setVerificationCode('');
      toast.success('✅ 2FA başarıyla etkinleştirildi!');
    } catch (err) {
      toast.error('Kod yanlış! Lütfen tekrar deneyin.');
    } finally {
      setLoading({ ...loading, verify2fa: false });
    }
  };

  const disable2FA = async () => {
    if (!window.confirm('2FA\'yı devre dışı bırakmak istediğinize emin misiniz?')) return;

    try {
      setLoading({ ...loading, disable2fa: true });
      const token = localStorage.getItem('access_token');
      await axios.post(`${API_URL}/api/security/2fa/disable/`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTwoFactorEnabled(false);
      toast.success('2FA devre dışı bırakıldı.');
    } catch (err) {
      toast.error('2FA devre dışı bırakma başarısız.');
    } finally {
      setLoading({ ...loading, disable2fa: false });
    }
  };

  // ========================================
  // 🔑 PASSWORD CHANGE
  // ========================================
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.new_password !== passwordData.confirm_password) {
      toast.error('Yeni şifreler eşleşmiyor!');
      return;
    }

    if (passwordData.new_password.length < 8) {
      toast.error('Şifre en az 8 karakter olmalıdır!');
      return;
    }

    try {
      setLoading({ ...loading, changePassword: true });
      const token = localStorage.getItem('access_token');
      await axios.post(`${API_URL}/api/users/change_password/`, {
        old_password: passwordData.old_password,
        new_password: passwordData.new_password,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('✅ Şifre başarıyla değiştirildi!');
      setPasswordData({ old_password: '', new_password: '', confirm_password: '' });
    } catch (err) {
      toast.error('Şifre değiştirme başarısız: ' + (err.response?.data?.error || 'Eski şifre yanlış olabilir'));
    } finally {
      setLoading({ ...loading, changePassword: false });
    }
  };

  // ========================================
  // 📧 EMAIL VERIFICATION
  // ========================================
  const fetchEmailVerificationStatus = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/api/auth/check-verification/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmailVerified(response.data?.is_verified || false);
    } catch (err) {
      console.error('Email verification check failed:', err);
    }
  };

  const resendVerificationEmail = async () => {
    try {
      setLoading({ ...loading, resendEmail: true });
      const token = localStorage.getItem('access_token');
      await axios.post(`${API_URL}/api/auth/send-verification/`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('✉️ Doğrulama e-postası gönderildi!');
    } catch (err) {
      toast.error('E-posta gönderilemedi.');
    } finally {
      setLoading({ ...loading, resendEmail: false });
    }
  };

  // ========================================
  // 🏆 BADGES & XP
  // ========================================
  const fetchBadges = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/api/user/badges/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBadges(response.data || []);
    } catch (err) {
      console.error('Badges fetch failed:', err);
    }
  };

  const calculateXPProgress = () => {
    const { xp, next_level_xp } = userStats;
    return Math.min((xp / next_level_xp) * 100, 100);
  };

  // ========================================
  // 🎨 THEMES
  // ========================================
  const fetchThemes = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/api/themes/list/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setThemes(response.data || []);
    } catch (err) {
      console.error('Themes fetch failed:', err);
    }
  };

  const applyTheme = async (themeName) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.post(`${API_URL}/api/users/update_profile/`, {
        theme: themeName
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCurrentTheme(themeName);
      toast.success(`🎨 Tema "${themeName}" uygulandı!`);
    } catch (err) {
      toast.error('Tema uygulanamadı.');
    }
  };

  // ========================================
  // 🔐 SESSIONS
  // ========================================
  const fetchSessions = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/api/security/sessions/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSessions(response.data || []);
    } catch (err) {
      console.error('Sessions fetch failed:', err);
    }
  };

  const revokeSession = async (sessionId) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.post(`${API_URL}/api/security/sessions/${sessionId}/revoke/`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Oturum sonlandırıldı.');
      fetchSessions();
    } catch (err) {
      toast.error('Oturum sonlandırılamadı.');
    }
  };

  const revokeAllSessions = async () => {
    if (!window.confirm('Tüm aktif oturumları sonlandırmak istediğinize emin misiniz?')) return;

    try {
      const token = localStorage.getItem('access_token');
      await axios.post(`${API_URL}/api/security/sessions/revoke-all/`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Tüm oturumlar sonlandırıldı. Lütfen tekrar giriş yapın.');
      setTimeout(() => {
        localStorage.removeItem('access_token');
        window.location.reload();
      }, 2000);
    } catch (err) {
      toast.error('Oturumlar sonlandırılamadı.');
    }
  };

  // ========================================
  // 📝 PROFILE UPDATE
  // ========================================
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Avatar 5MB\'dan küçük olmalıdır!');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('avatar', file);

    try {
      setLoading({ ...loading, avatar: true });
      const token = localStorage.getItem('access_token');
      const response = await axios.post(`${API_URL}/api/users/update_profile/`, formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setFormData({ ...formData, avatar_url: response.data.avatar_url });
      toast.success('✅ Avatar güncellendi!');
      if (onUpdate) onUpdate(response.data);
    } catch (err) {
      toast.error('Avatar yüklenemedi: ' + (err.response?.data?.error || 'Bilinmeyen hata'));
    } finally {
      setLoading({ ...loading, avatar: false });
    }
  };

  const handleSaveProfile = async () => {
    try {
      setLoading({ ...loading, saveProfile: true });
      const token = localStorage.getItem('access_token');
      const response = await axios.post(`${API_URL}/api/users/update_profile/`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('✅ Profil kaydedildi!');
      if (onUpdate) onUpdate(response.data);
    } catch (err) {
      toast.error('Profil kaydedilemedi: ' + (err.response?.data?.error || 'Bilinmeyen hata'));
    } finally {
      setLoading({ ...loading, saveProfile: false });
    }
  };

  // ========================================
  // 🎨 MODERN UI STYLES
  // ========================================
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10000,
      backdropFilter: 'blur(8px)',
    },
    panel: {
      width: '800px',
      maxHeight: '90vh',
      background: 'linear-gradient(135deg, #1e1e2e 0%, #2a2a3e 100%)',
      borderRadius: '20px',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    header: {
      padding: '24px 32px',
      background: 'linear-gradient(90deg, #5865f2 0%, #7289da 100%)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },
    title: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#fff',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    closeBtn: {
      background: 'rgba(255, 255, 255, 0.15)',
      border: 'none',
      color: '#fff',
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      cursor: 'pointer',
      fontSize: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s',
    },
    tabBar: {
      display: 'flex',
      gap: '8px',
      padding: '16px 32px',
      background: 'rgba(0, 0, 0, 0.2)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      overflowX: 'auto',
    },
    tab: (active) => ({
      padding: '10px 20px',
      background: active ? 'linear-gradient(135deg, #5865f2 0%, #7289da 100%)' : 'rgba(255, 255, 255, 0.05)',
      border: 'none',
      borderRadius: '10px',
      color: '#fff',
      cursor: 'pointer',
      fontWeight: active ? '600' : '400',
      fontSize: '14px',
      transition: 'all 0.3s',
      whiteSpace: 'nowrap',
      boxShadow: active ? '0 4px 15px rgba(88, 101, 242, 0.4)' : 'none',
    }),
    content: {
      flex: 1,
      overflowY: 'auto',
      padding: '32px',
    },
    card: {
      background: 'rgba(255, 255, 255, 0.03)',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '20px',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      transition: 'all 0.3s',
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#fff',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    inputGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      color: '#b9bbbe',
      fontSize: '13px',
      fontWeight: '600',
      marginBottom: '8px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      background: 'rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      color: '#fff',
      fontSize: '14px',
      outline: 'none',
      transition: 'all 0.2s',
      boxSizing: 'border-box',
    },
    button: (variant = 'primary') => ({
      padding: '12px 24px',
      background: variant === 'primary'
        ? 'linear-gradient(135deg, #5865f2 0%, #7289da 100%)'
        : variant === 'danger'
          ? 'linear-gradient(135deg, #ed4245 0%, #c9302c 100%)'
          : 'rgba(255, 255, 255, 0.1)',
      border: 'none',
      borderRadius: '8px',
      color: '#fff',
      fontWeight: '600',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.3s',
      boxShadow: variant === 'primary' ? '0 4px 15px rgba(88, 101, 242, 0.3)' : 'none',
    }),
    avatarSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      marginBottom: '24px',
    },
    avatar: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '4px solid rgba(88, 101, 242, 0.5)',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '6px 12px',
      background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      color: '#1e1e2e',
      margin: '4px',
    },
    progressBar: {
      width: '100%',
      height: '10px',
      background: 'rgba(0, 0, 0, 0.3)',
      borderRadius: '10px',
      overflow: 'hidden',
      marginTop: '8px',
    },
    progressFill: (percent) => ({
      width: `${percent}%`,
      height: '100%',
      background: 'linear-gradient(90deg, #5865f2 0%, #7289da 50%, #43b581 100%)',
      borderRadius: '10px',
      transition: 'width 0.5s ease',
    }),
    qrCode: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      padding: '24px',
      background: '#fff',
      borderRadius: '12px',
      marginTop: '16px',
    },
    backupCodesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '12px',
      marginTop: '16px',
    },
    backupCode: {
      padding: '12px',
      background: 'rgba(0, 0, 0, 0.4)',
      borderRadius: '8px',
      fontFamily: 'monospace',
      fontSize: '14px',
      textAlign: 'center',
      color: '#43b581',
      border: '1px solid rgba(67, 181, 129, 0.3)',
    },
    themeGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
      marginTop: '16px',
    },
    themeCard: (active) => ({
      padding: '16px',
      background: active ? 'linear-gradient(135deg, #5865f2 0%, #7289da 100%)' : 'rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      cursor: 'pointer',
      textAlign: 'center',
      transition: 'all 0.3s',
      border: active ? '2px solid #fff' : '2px solid transparent',
    }),
    sessionCard: {
      padding: '16px',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '8px',
      marginBottom: '12px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  };

  // ========================================
  // 🎯 RENDER TAB CONTENT
  // ========================================
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <>
            <div style={styles.card}>
              <h3 style={styles.sectionTitle}>👤 Profil Bilgileri</h3>

              <div style={styles.avatarSection}>
                <img
                  src={formData.avatar_url || 'https://via.placeholder.com/100'}
                  alt="Avatar"
                  style={styles.avatar}
                />
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
                  <p style={{ color: '#b9bbbe', fontSize: '12px', marginTop: '8px' }}>
                    Max 5MB • PNG, JPG, GIF
                  </p>
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Kullanıcı Adı</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  style={styles.input}
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
                  {!emailVerified && (
                    <button
                      style={styles.button('secondary')}
                      onClick={resendVerificationEmail}
                      disabled={loading.resendEmail}
                    >
                      {loading.resendEmail ? '⏳' : '✉️ Doğrula'}
                    </button>
                  )}
                  {emailVerified && <span style={{ color: '#43b581', fontSize: '20px' }}>✅</span>}
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
                />
              </div>

              <button
                style={styles.button('primary')}
                onClick={handleSaveProfile}
                disabled={loading.saveProfile}
              >
                {loading.saveProfile ? '⏳ Kaydediliyor...' : '💾 Kaydet'}
              </button>
            </div>

            <div style={styles.card}>
              <h3 style={styles.sectionTitle}>🔗 Sosyal Bağlantılar</h3>

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

      case 'security':
        return (
          <>
            <div style={styles.card}>
              <h3 style={styles.sectionTitle}>🔒 İki Faktörlü Kimlik Doğrulama (2FA)</h3>

              {!twoFactorEnabled && !twoFactorData && (
                <div>
                  <p style={{ color: '#b9bbbe', marginBottom: '16px' }}>
                    Hesabınızı ekstra bir güvenlik katmanıyla koruyun. Giriş yaparken telefonunuzdaki
                    doğrulama kodunu girmeniz istenecek.
                  </p>
                  <button
                    style={styles.button('primary')}
                    onClick={enable2FA}
                    disabled={loading.enable2fa}
                  >
                    {loading.enable2fa ? '⏳ Etkinleştiriliyor...' : '🔐 2FA Etkinleştir'}
                  </button>
                </div>
              )}

              {twoFactorData && (
                <div>
                  <p style={{ color: '#b9bbbe', marginBottom: '16px' }}>
                    Aşağıdaki QR kodunu Google Authenticator, Authy veya benzer bir uygulamayla tarayın:
                  </p>

                  <div style={styles.qrCode}>
                    <QRCode value={twoFactorData.secret_url} size={200} />
                    <p style={{ color: '#1e1e2e', fontSize: '12px', margin: 0 }}>
                      Manuel kod: <code>{twoFactorData.secret}</code>
                    </p>
                  </div>

                  <div style={{ marginTop: '24px' }}>
                    <label style={styles.label}>Doğrulama Kodu</label>
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="6 haneli kod"
                      style={styles.input}
                      maxLength={6}
                    />
                    <button
                      style={{ ...styles.button('primary'), marginTop: '12px' }}
                      onClick={verify2FASetup}
                      disabled={loading.verify2fa || verificationCode.length !== 6}
                    >
                      {loading.verify2fa ? '⏳ Doğrulanıyor...' : '✅ Doğrula ve Etkinleştir'}
                    </button>
                  </div>

                  {backupCodes.length > 0 && (
                    <div style={{ marginTop: '24px' }}>
                      <h4 style={{ color: '#fff', marginBottom: '12px' }}>🔑 Yedek Kodlar (Kaydedin!)</h4>
                      <p style={{ color: '#faa61a', fontSize: '13px', marginBottom: '12px' }}>
                        ⚠️ Bu kodları güvenli bir yerde saklayın! Telefonunuza erişemezseniz kullanabilirsiniz.
                      </p>
                      <div style={styles.backupCodesGrid}>
                        {backupCodes.map((code, idx) => (
                          <div key={idx} style={styles.backupCode}>{code}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {twoFactorEnabled && (
                <div>
                  <p style={{ color: '#43b581', marginBottom: '16px' }}>
                    ✅ 2FA aktif! Hesabınız korunuyor.
                  </p>
                  <button
                    style={styles.button('danger')}
                    onClick={disable2FA}
                    disabled={loading.disable2fa}
                  >
                    {loading.disable2fa ? '⏳ Devre Dışı Bırakılıyor...' : '🔓 2FA Devre Dışı Bırak'}
                  </button>
                </div>
              )}
            </div>

            <div style={styles.card}>
              <h3 style={styles.sectionTitle}>🔑 Şifre Değiştir</h3>

              <form onSubmit={handlePasswordChange}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Eski Şifre</label>
                  <input
                    type="password"
                    value={passwordData.old_password}
                    onChange={(e) => setPasswordData({ ...passwordData, old_password: e.target.value })}
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Yeni Şifre</label>
                  <input
                    type="password"
                    value={passwordData.new_password}
                    onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                    style={styles.input}
                    required
                    minLength={8}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Yeni Şifre (Tekrar)</label>
                  <input
                    type="password"
                    value={passwordData.confirm_password}
                    onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
                    style={styles.input}
                    required
                    minLength={8}
                  />
                </div>

                <button
                  type="submit"
                  style={styles.button('primary')}
                  disabled={loading.changePassword}
                >
                  {loading.changePassword ? '⏳ Değiştiriliyor...' : '🔐 Şifreyi Değiştir'}
                </button>
              </form>
            </div>

            <div style={styles.card}>
              <h3 style={styles.sectionTitle}>🖥️ Aktif Oturumlar</h3>

              {sessions.length === 0 && (
                <p style={{ color: '#b9bbbe' }}>Aktif oturum bulunamadı.</p>
              )}

              {sessions.map((session) => (
                <div key={session.id} style={styles.sessionCard}>
                  <div>
                    <p style={{ color: '#fff', margin: 0, fontWeight: '600' }}>
                      {session.device_name || 'Bilinmeyen Cihaz'}
                    </p>
                    <p style={{ color: '#b9bbbe', fontSize: '12px', margin: '4px 0 0 0' }}>
                      IP: {session.ip_address} • {new Date(session.created_at).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                  <button
                    style={styles.button('danger')}
                    onClick={() => revokeSession(session.id)}
                  >
                    ❌ Sonlandır
                  </button>
                </div>
              ))}

              {sessions.length > 0 && (
                <button
                  style={{ ...styles.button('danger'), marginTop: '16px' }}
                  onClick={revokeAllSessions}
                >
                  🚨 Tüm Oturumları Sonlandır
                </button>
              )}
            </div>
          </>
        );

      case 'badges':
        return (
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>🏆 Rozetler & XP</h3>

            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ color: '#fff', fontSize: '16px', fontWeight: '600' }}>
                  Seviye {userStats.level}
                </span>
                <span style={{ color: '#b9bbbe', fontSize: '14px' }}>
                  {userStats.xp} / {userStats.next_level_xp} XP
                </span>
              </div>
              <div style={styles.progressBar}>
                <div style={styles.progressFill(calculateXPProgress())} />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ color: '#fff', marginBottom: '12px' }}>💰 Coin: {userStats.coins}</h4>
            </div>

            <h4 style={{ color: '#fff', marginBottom: '16px' }}>🎖️ Kazanılan Rozetler</h4>

            {badges.length === 0 && (
              <p style={{ color: '#b9bbbe' }}>Henüz rozet kazanılmadı. Daha fazla aktivite gösterin!</p>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {badges.map((badge, idx) => (
                <div key={idx} style={styles.badge} title={badge.description}>
                  {badge.icon} {badge.name}
                </div>
              ))}
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>🎨 Temalar</h3>

            <p style={{ color: '#b9bbbe', marginBottom: '16px' }}>
              Profil temanızı seçin ve görünümünüzü kişiselleştirin.
            </p>

            <div style={styles.themeGrid}>
              <div
                style={styles.themeCard(currentTheme === 'dark')}
                onClick={() => applyTheme('dark')}
              >
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>🌙</div>
                <p style={{ color: '#fff', margin: 0, fontWeight: '600' }}>Karanlık</p>
              </div>

              <div
                style={styles.themeCard(currentTheme === 'light')}
                onClick={() => applyTheme('light')}
              >
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>☀️</div>
                <p style={{ color: '#fff', margin: 0, fontWeight: '600' }}>Aydınlık</p>
              </div>

              <div
                style={styles.themeCard(currentTheme === 'custom')}
                onClick={() => applyTheme('custom')}
              >
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎨</div>
                <p style={{ color: '#fff', margin: 0, fontWeight: '600' }}>Özel</p>
              </div>

              {themes.map((theme) => (
                <div
                  key={theme.id}
                  style={styles.themeCard(currentTheme === theme.name)}
                  onClick={() => applyTheme(theme.name)}
                >
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{theme.icon || '🎭'}</div>
                  <p style={{ color: '#fff', margin: 0, fontWeight: '600' }}>{theme.name}</p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // ========================================
  // 🎨 MAIN RENDER
  // ========================================
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>
            ⚙️ Kullanıcı Ayarları
          </h2>
          <button style={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        <div style={styles.tabBar}>
          <button
            style={styles.tab(activeTab === 'profile')}
            onClick={() => setActiveTab('profile')}
          >
            👤 Profil
          </button>
          <button
            style={styles.tab(activeTab === 'security')}
            onClick={() => setActiveTab('security')}
          >
            🔒 Güvenlik
          </button>
          <button
            style={styles.tab(activeTab === 'badges')}
            onClick={() => setActiveTab('badges')}
          >
            🏆 Rozetler & XP
          </button>
          <button
            style={styles.tab(activeTab === 'appearance')}
            onClick={() => setActiveTab('appearance')}
          >
            🎨 Görünüm
          </button>
        </div>

        <div style={styles.content}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePanel;


