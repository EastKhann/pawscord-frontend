import React, { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import toast from './utils/toast';
import { QRCodeSVG } from 'qrcode.react';
import AvatarCropper from './components/AvatarCropper';
import LogoutModal from './components/LogoutModal';
import { getApiBase } from './utils/apiEndpoints';
import './UserProfilePanel.css';

const API_URL = getApiBase();
// Get BASE_URL from VITE_BACKEND_URL or derive from window.location for production
const BASE_URL = import.meta.env.VITE_BACKEND_URL ||
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? `http://${window.location.hostname}:8888`
    : `${window.location.protocol}//${window.location.host}`);

// 🚀 OPTIMIZATION: Global cache for default avatars (survives component remounts)
const avatarCache = {
  data: null,
  timestamp: 0,
  maxAge: 60 * 60 * 1000, // 1 hour
  isValid() {
    return this.data && (Date.now() - this.timestamp < this.maxAge);
  }
};

const UserProfilePanel = ({ user, onClose, onUpdate, onLogout }) => {
  // 🛡️ SAFETY CHECK - Prevent crashes
  if (!user) {
    console.error('❌ [UserProfilePanel] User prop is null/undefined');
    return null;
  }

  // 🔑 Check if this is the current user's own profile
  const currentUsername = localStorage.getItem('chat_username'); // ✅ FIXED: Correct key
  const currentUserId = localStorage.getItem('user_id');

  // 🔧 FIX: Hem user.username hem de diğer olası field'ları kontrol et
  const viewingUsername = user?.username || user?.user?.username || user?.name;

  // ✅ FIXED: Proper ownership detection with fallbacks
  const isOwnProfile = viewingUsername === currentUsername ||
    user?.id?.toString() === currentUserId;

  // 🐛 Debug log
  console.log('🔍 [UserProfilePanel] Is own profile:', isOwnProfile);

  const [activeTab, setActiveTab] = useState('profile');
  const [activeCategory, setActiveCategory] = useState('account'); // 🆕 Kategori state'i
  const [showLogoutModal, setShowLogoutModal] = useState(false); // 🚪 Logout Modal State
  const [loading, setLoading] = useState({});
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    status_message: user?.status_message || '',
    avatar_url: user?.avatar_url || user?.avatar || '',
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
  const [themes, setThemes] = useState([{ id: 'dark', name: 'Dark' }, { id: 'light', name: 'Light' }]);
  const [currentTheme, setCurrentTheme] = useState('dark');

  // 🏆 Badges & XP State
  const [badges, setBadges] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [userStats, setUserStats] = useState({
    level: user?.level || 1,
    xp: user?.xp || 0,
    coins: user?.coins || 0,
    next_level_xp: 100,
  });

  // 📧 Email Verification State
  const [emailVerified, setEmailVerified] = useState(user?.is_active || false);

  // 📱 Phone & Extra Profile State
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number || '');

  // 🔔 Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    message_notifications: true,
    mention_notifications: true,
    dm_notifications: true,
    email_notifications: false,
  });

  // 🎵 Sound Settings State
  const [soundSettings, setSoundSettings] = useState({
    message_sound: true,
    notification_sound: true,
    voice_disconnect_sound: true,
    volume: 50,
    // 🔥 Gelişmiş Ses İyileştirme
    krisp_enabled: true, // Krisp AI gürültü engelleme
    noise_suppression_level: 80, // %50-100 arası
    echo_cancellation: true, // Yankı önleme
    auto_gain_control: true, // Otomatik ses seviyesi
  });

  // 💎 Premium Status State
  const [premiumStatus, setPremiumStatus] = useState(null);

  // 🏪 Store & Inventory State
  const [storeBalance, setStoreBalance] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [defaultAvatars, setDefaultAvatars] = useState([]);

  // 🚫 Privacy & Blocking State
  const [blockedUsers, setBlockedUsers] = useState([]);

  // 👥 Friends State
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);

  // 🌍 Language Preferences
  const [language, setLanguage] = useState('tr');
  const [availableLanguages, setAvailableLanguages] = useState([
    { code: 'tr', name: 'Türkçe' },
    { code: 'en', name: 'English' },
  ]);

  // 📊 Activity Feed
  const [userActivity, setUserActivity] = useState([]);

  // 📝 Drafts & Bookmarks
  const [drafts, setDrafts] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  // 🎨 Custom Status State
  const [customStatus, setCustomStatus] = useState({
    status: user?.status || 'online',
    custom_status: user?.status_message || '',
    emoji: '😊',
  });

  // 🔒 GDPR & Privacy State
  const [gdprExports, setGdprExports] = useState([]);
  const [exportRequested, setExportRequested] = useState(false);

  // 🔧 Developer Features State
  const [oauthApps, setOauthApps] = useState([]);
  const [webhooks, setWebhooks] = useState([]);
  const [botAccounts, setBotAccounts] = useState([]);

  // 🎮 Rich Presence & Advanced Features State
  const [richPresence, setRichPresence] = useState(null);
  const [endorsements, setEndorsements] = useState([]);
  const [equippedItems, setEquippedItems] = useState([]);
  const [nicknameHistory, setNicknameHistory] = useState([]);
  const [serverOrder, setServerOrder] = useState([]);

  // � Avatar Cropper State
  const [showCropper, setShowCropper] = useState(false);
  const [tempImageFile, setTempImageFile] = useState(null);

  // 🔑 Password Change State
  const [passwordData, setPasswordData] = useState({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [hasPassword, setHasPassword] = useState(true); // 🆕 Kullanıcının şifresi var mı (Google kullanıcıları için false)

  const fileInputRef = useRef(null);
  const lastFetchedUserRef = useRef(null); // 🛡️ Prevent re-fetch loops

  // ========================================
  // 📊 FETCH DATA ON MOUNT
  // ========================================
  useEffect(() => {
    const userId = user?.id || user?.username;

    // 🛡️ Prevent infinite re-renders - only fetch if user actually changed
    if (!user || lastFetchedUserRef.current === userId) {
      return;
    }

    lastFetchedUserRef.current = userId;
    console.log('🔄 [UserProfilePanel] Fetching data for user:', userId);

    // Update formData when user prop changes
    setFormData({
      username: user?.username || '',
      email: user?.email || '',
      status_message: user?.status_message || '',
      avatar_url: user?.avatar_url || user?.avatar || '',
      steam_id: user?.steam_id || '',
      spotify_username: user?.spotify_username || '',
      instagram_username: user?.instagram_username || '',
      x_username: user?.x_username || '',
      xbox_gamertag: user?.xbox_gamertag || '',
    });

    // 🚀 OPTIMIZATION: Only fetch CRITICAL data on mount
    // Other data will be lazy-loaded when tabs are clicked
    if (isOwnProfile) {
      // 🔥 PARALLEL: Fetch critical data simultaneously
      Promise.all([
        fetchBadges(),
        fetchPremiumStatus(),
        fetchStoreBalance(),
        check2FAStatus(),
        fetchDefaultAvatars(),
        checkPasswordStatus(), // 🆕 Şifre durumu kontrolü (Google kullanıcıları için)
      ]).catch(err => console.error('Initial fetch error:', err));
    } else {
      // For other users' profiles, just fetch avatars
      fetchDefaultAvatars();
    }
  }, [user?.id, user?.username, isOwnProfile]);

  // 🚀 LAZY LOADING: Fetch data only when tab/category is selected
  useEffect(() => {
    if (!isOwnProfile) return;

    const fetchDataForCategory = async () => {
      switch (activeCategory) {
        case 'account':
          // Already fetched on mount
          break;
        case 'security':
          await Promise.all([fetchSessions(), fetchEmailVerificationStatus()]);
          break;
        case 'privacy':
          await Promise.all([fetchBlockedUsers(), fetchFriendRequests()]);
          break;
        case 'advanced':
          await Promise.all([fetchGDPRExports(), fetchOAuthApps(), fetchWebhooks(), fetchBotAccounts()]);
          break;
        case 'social':
          await Promise.all([fetchRichPresence(), fetchEndorsements()]);
          break;
        case 'customization':
          await Promise.all([fetchThemes(), fetchInventory(), fetchNicknameHistory(), fetchServerOrder()]);
          break;
        case 'notifications':
          // Notification settings are already in state
          break;
        case 'language':
          await fetchLanguages();
          break;
        default:
          break;
      }
    };

    fetchDataForCategory();
  }, [activeCategory, isOwnProfile]);

  // ========================================
  // 🔒 2FA FUNCTIONS
  // ========================================
  const check2FAStatus = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/api/2fa/methods/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('🔐 [2FA Status] Response:', response.data);
      // 🔧 FIX: Backend returns {available: [], enabled: []} format
      // Check if 'totp' is in the enabled array
      const enabledMethods = response.data?.enabled || [];
      const isEnabled = enabledMethods.includes('totp') ||
        response.data?.totp_enabled ||
        response.data?.is_enabled ||
        false;
      console.log('🔐 [2FA Status] Enabled methods:', enabledMethods);
      console.log('🔐 [2FA Status] Setting twoFactorEnabled to:', isEnabled);
      setTwoFactorEnabled(isEnabled);
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
  // 🔑 PASSWORD STATUS CHECK (Google/OAuth users)
  // ========================================
  const checkPasswordStatus = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/api/users/password_status/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHasPassword(response.data?.has_password ?? true);
      console.log('🔑 [Password Status]', response.data);
    } catch (err) {
      console.error('Password status check failed:', err);
      setHasPassword(true); // Varsayılan olarak şifresi var kabul et
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

      // 🆕 Google/OAuth kullanıcıları için old_password gönderme
      const requestData = {
        new_password: passwordData.new_password,
      };

      // Sadece şifresi olan kullanıcılar için old_password ekle
      if (hasPassword) {
        requestData.old_password = passwordData.old_password;
      }

      await axios.post(`${API_URL}/api/users/change_password/`, requestData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success(hasPassword ? '✅ Şifre başarıyla değiştirildi!' : '✅ Şifre başarıyla belirlendi!');
      setPasswordData({ old_password: '', new_password: '', confirm_password: '' });

      // 🆕 Şifre belirlendiyse hasPassword'u güncelle
      if (!hasPassword) {
        setHasPassword(true);
      }
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
      const response = await axios.get(`${API_URL}/auth/check-verification/`, {
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
      await axios.post(`${API_URL}/auth/send-verification/`, {}, {
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
      setBadges([]);
    }
  };

  const fetchAchievements = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/api/user/achievements/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAchievements(response.data || []);
    } catch (err) {
      console.error('Achievements fetch failed:', err);
      setAchievements([]);
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
      const response = await axios.get(`${API_URL}/themes/list/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setThemes(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Themes fetch failed:', err);
      setThemes([{ id: 'dark', name: 'Dark' }, { id: 'light', name: 'Light' }]);
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
  // 💎 PREMIUM STATUS
  // ========================================
  const fetchPremiumStatus = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/api/premium/status/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPremiumStatus(response.data);
    } catch (err) {
      console.error('Premium status fetch failed:', err);
    }
  };

  // ========================================
  // 🏪 STORE & INVENTORY
  // ========================================
  const fetchStoreBalance = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/api/store/balance/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStoreBalance(response.data?.balance || 0);
    } catch (err) {
      console.error('Store balance fetch failed:', err);
    }
  };

  // ========================================
  // 🎯 DEFAULT AVATARS
  // ========================================
  const fetchDefaultAvatars = async () => {
    try {
      // 🚀 OPTIMIZATION: Use cached data if available
      if (avatarCache.isValid()) {
        console.log('🎯 [Avatars] Using cached data');
        setDefaultAvatars(avatarCache.data);
        return;
      }

      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/api/users/default_avatars/`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // 🚀 Backend returns OBJECTS with thumbnail + original URLs
      // Format: [{name, thumbnail, original}, ...]
      // - thumbnail: 100x100 for display in picker (fast loading)
      // - original: Full resolution for saving (high quality)
      const BASE_URL = API_URL.replace('/api', '');

      const avatars = Array.isArray(response.data) ? response.data.map(item => {
        // Handle both old format (string URL) and new format (object with thumbnail/original)
        if (typeof item === 'string') {
          // Old format: just URL string (backward compatibility)
          const filename = item.split('/').pop();
          const name = filename.split('.')[0].replace('_100x100', '');
          const fullUrl = item.startsWith('/api/') ? `${BASE_URL}${item}` : item;
          return {
            url: fullUrl, // For saving (full res)
            thumbnailUrl: fullUrl, // For display
            name: name,
            filename: filename
          };
        } else {
          // New format: object with thumbnail and original
          const buildUrl = (path) => {
            if (!path) return null;
            return path.startsWith('/api/') ? `${BASE_URL}${path}` : path;
          };

          return {
            url: buildUrl(item.original), // 🎯 ORIGINAL for saving (full resolution!)
            thumbnailUrl: buildUrl(item.thumbnail) || buildUrl(item.original), // Thumbnail for display
            name: item.name,
            filename: item.original ? item.original.split('/').pop() : 'avatar.webp'
          };
        }
      }).filter(a => a.url) : []; // Filter out invalid entries

      // 🚀 Cache the results
      avatarCache.data = avatars;
      avatarCache.timestamp = Date.now();

      setDefaultAvatars(avatars);
      console.log(`✅ [Avatars] Loaded ${avatars.length} avatars (thumbnail for display, original for saving)`);
    } catch (err) {
      console.error('Default avatars fetch failed:', err);
      setDefaultAvatars([]);
    }
  };

  const selectDefaultAvatar = async (avatar) => {
    try {
      setLoading({ ...loading, avatar: true });
      const token = localStorage.getItem('access_token');
      const response = await axios.post(`${API_URL}/api/users/update_profile/`, {
        avatar_url: avatar.url // Use full URL from avatar object
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setFormData({ ...formData, avatar_url: avatar.url });
      toast.success(`✅ Avatar değiştirildi: ${avatar.name}`);
      if (onUpdate) onUpdate(response.data);
    } catch (err) {
      toast.error('❌ Avatar değiştirilemedi.');
    } finally {
      setLoading({ ...loading, avatar: false });
    }
  };

  // ========================================
  // 📱 PHONE NUMBER
  // ========================================
  const handlePhoneUpdate = async () => {
    try {
      setLoading({ ...loading, phoneUpdate: true });
      const token = localStorage.getItem('access_token');
      await axios.post(`${API_URL}/api/users/update_phone/`, {
        phone_number: phoneNumber
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('✅ Telefon numarası güncellendi!');
    } catch (err) {
      toast.error('Telefon numarası güncellenemedi.');
    } finally {
      setLoading({ ...loading, phoneUpdate: false });
    }
  };

  // ========================================
  // 🔔 NOTIFICATION SETTINGS
  // ========================================
  const handleNotificationSettingsUpdate = async (setting, value) => {
    try {
      const newSettings = { ...notificationSettings, [setting]: value };
      setNotificationSettings(newSettings);

      const token = localStorage.getItem('access_token');
      await axios.post(`${API_URL}/api/users/update_profile/`, {
        notification_settings: newSettings
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('✅ Bildirim ayarları güncellendi!');
    } catch (err) {
      toast.error('Bildirim ayarları güncellenemedi.');
    }
  };

  // ========================================
  // 🎵 SOUND SETTINGS
  // ========================================
  const handleSoundSettingsUpdate = async (setting, value) => {
    try {
      const newSettings = { ...soundSettings, [setting]: value };
      setSoundSettings(newSettings);

      const token = localStorage.getItem('access_token');
      await axios.post(`${API_URL}/api/users/update_profile/`, {
        sound_settings: newSettings
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('✅ Ses ayarları güncellendi!');
    } catch (err) {
      toast.error('Ses ayarları güncellenemedi.');
    }
  };

  // ========================================
  // 🚫 BLOCKED USERS
  // ========================================
  const fetchBlockedUsers = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/blocks/list/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBlockedUsers(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Blocked users fetch failed:', err);
      setBlockedUsers([]);
    }
  };

  const unblockUser = async (userId) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.post(`${API_URL}/blocks/unblock/`, {
        user_id: userId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('✅ Kullanıcı engeli kaldırıldı!');
      fetchBlockedUsers();
    } catch (err) {
      toast.error('Engel kaldırılamadı.');
    }
  };

  // ========================================
  // 👥 FRIEND REQUESTS
  // ========================================
  const fetchFriendRequests = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/friends/requests/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFriendRequests(response.data?.pending || []);
      setFriends(response.data?.friends || []);
    } catch (err) {
      console.error('Friend requests fetch failed:', err);
      setFriendRequests([]);
      setFriends([]);
    }
  };

  const respondToFriendRequest = async (requestId, action) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.post(`${API_URL}/friends/respond/${requestId}/`, {
        action: action // 'accept' or 'reject'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(action === 'accept' ? '✅ Arkadaş eklendi!' : '❌ İstek reddedildi.');
      fetchFriendRequests();
    } catch (err) {
      toast.error('İşlem başarısız.');
    }
  };

  const removeFriend = async (friendshipId) => {
    if (!window.confirm('Arkadaşı kaldırmak istediğinize emin misiniz?')) return;

    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`${API_URL}/friends/remove/${friendshipId}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Arkadaş kaldırıldı.');
      fetchFriendRequests();
    } catch (err) {
      toast.error('Arkadaş kaldırılamadı.');
    }
  };

  // ========================================
  // 🌍 LANGUAGE PREFERENCES
  // ========================================
  const fetchLanguages = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/translation/languages/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAvailableLanguages(Array.isArray(response.data) ? response.data : [
        { code: 'tr', name: 'Türkçe' },
        { code: 'en', name: 'English' },
      ]);
    } catch (err) {
      console.error('Languages fetch failed:', err);
      setAvailableLanguages([
        { code: 'tr', name: 'Türkçe' },
        { code: 'en', name: 'English' },
      ]);
    }
  };

  const updateLanguage = async (newLanguage) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.post(`${API_URL}/api/users/update_profile/`, {
        language: newLanguage
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLanguage(newLanguage);
      toast.success('🌍 Dil değiştirildi!');
    } catch (err) {
      toast.error('Dil değiştirilemedi.');
    }
  };

  // ========================================
  // 📊 USER ACTIVITY
  // ========================================
  const fetchUserActivity = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/activity/${user.username}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserActivity(response.data || []);
    } catch (err) {
      console.error('User activity fetch failed:', err);
      setUserActivity([]);
    }
  };

  // ========================================
  // 📝 DRAFTS
  // ========================================
  const fetchDrafts = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/api/drafts/list/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDrafts(response.data || []);
    } catch (err) {
      console.error('Drafts fetch failed:', err);
      setDrafts([]);
    }
  };

  const deleteDraft = async (draftKey) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`${API_URL}/api/drafts/${draftKey}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Taslak silindi.');
      fetchDrafts();
    } catch (err) {
      toast.error('Taslak silinemedi.');
    }
  };

  // ========================================
  // 🎨 CUSTOM STATUS
  // ========================================
  const updateCustomStatus = async () => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.post(`${API_URL}/api/users/update_status/`, customStatus, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('✅ Durum güncellendi!');
    } catch (err) {
      toast.error('Durum güncellenemedi: ' + (err.response?.data?.error || 'Hata'));
    }
  };

  // ========================================
  // 🔒 GDPR DATA EXPORT
  // ========================================
  const requestGDPRExport = async () => {
    try {
      setExportRequested(true);
      const token = localStorage.getItem('access_token');
      const response = await axios.post(`${API_URL}/gdpr/request/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('✅ GDPR dışa aktarma talebi oluşturuldu!');
      setGdprExports([response.data, ...gdprExports]);
    } catch (err) {
      toast.error('GDPR talebi oluşturulamadı: ' + (err.response?.data?.error || 'Hata'));
    } finally {
      setExportRequested(false);
    }
  };

  const fetchGDPRExports = async () => {
    // GDPR export status requires specific request_id
    // For now, just show empty state - user will see status after requesting export
    setGdprExports([]);
  };

  // ========================================
  // 🔧 DEVELOPER FEATURES
  // ========================================
  const fetchOAuthApps = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/oauth/apps/list/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOauthApps(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('OAuth apps fetch failed:', err);
      setOauthApps([]);
    }
  };

  const fetchWebhooks = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/webhooks/list/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWebhooks(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      // Silent fail
      setWebhooks([]);
    }
  };

  const fetchBotAccounts = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/bots/list/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBotAccounts(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      // Silent fail
      setBotAccounts([]);
    }
  };

  // ========================================
  // 🎮 RICH PRESENCE & ADVANCED FEATURES
  // ========================================
  const fetchRichPresence = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/api/users/rich_presence/${user.username}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRichPresence(response.data);
    } catch (err) {
      // Silent fail
    }
  };

  const fetchEndorsements = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/api/users/${user.username}/endorsements/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const endorsementsData = response.data?.endorsements || response.data || [];
      setEndorsements(Array.isArray(endorsementsData) ? endorsementsData : []);
    } catch (err) {
      console.error('Endorsements fetch failed:', err);
      setEndorsements([]);
    }
  };

  const fetchInventory = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/api/store/inventory/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInventory(response.data || []);
      setEquippedItems(response.data?.filter(item => item.is_equipped) || []);
    } catch (err) {
      // Silent fail
      setInventory([]);
      setEquippedItems([]);
    }
  };

  const equipItem = async (inventoryId) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.post(`${API_URL}/api/store/equip/${inventoryId}/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('✅ Item equipped!');
      fetchInventory();
    } catch (err) {
      toast.error('❌ Failed to equip item');
    }
  };

  const unequipItem = async (inventoryId) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.post(`${API_URL}/api/store/unequip/${inventoryId}/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('✅ Item unequipped!');
      fetchInventory();
    } catch (err) {
      toast.error('❌ Failed to unequip item');
    }
  };

  const fetchNicknameHistory = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/api/users/${user.username}/nicknames/history/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNicknameHistory(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Nickname history fetch failed:', err);
      setNicknameHistory([]);
    }
  };

  const fetchServerOrder = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${API_URL}/api/user/server-order/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServerOrder(response.data || []);
    } catch (err) {
      // Silent fail
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
      setSessions(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Sessions fetch failed:', err);
      setSessions([]);
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

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Avatar 5MB\'dan küçük olmalıdır!');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Lütfen bir resim dosyası seçin!');
      return;
    }

    // Önce cropper modal'ını aç
    setTempImageFile(file);
    setShowCropper(true);
  };

  // 📸 Kırpma tamamlandığında
  const handleCropComplete = async (croppedFile) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('avatar', croppedFile);

      setLoading({ ...loading, avatar: true });
      const token = localStorage.getItem('access_token');
      const response = await axios.post(`${API_URL}/api/users/update_profile/`, formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Backend returns relative path like /media/avatars/blob_xyz
      // We need to store it as-is (not with timestamp), image component will add timestamp
      const avatarUrl = response.data.avatar || response.data.avatar_url;
      setFormData({ ...formData, avatar_url: avatarUrl });
      setShowCropper(false);
      setTempImageFile(null);
      toast.success('✅ Avatar güncellendi!');
      if (onUpdate) onUpdate({ ...response.data, avatar_url: avatarUrl });
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
      zIndex: 9999,
      backdropFilter: 'blur(8px)',
    },
    panel: {
      width: '900px',
      maxHeight: '90vh',
      background: 'linear-gradient(135deg, #1e1e2e 0%, #2a2a3e 100%)',
      borderRadius: '16px',
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
      padding: '20px 32px',
      minHeight: '70px',
      background: 'rgba(0, 0, 0, 0.2)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      overflowX: 'auto',
      alignItems: 'center',
    },
    body: {
      display: 'flex',
      height: 'calc(90vh - 88px)', // Header yüksekliği çıkarılmış
      overflow: 'hidden',
    },
    sidebar: {
      width: '240px',
      background: 'rgba(0, 0, 0, 0.3)',
      borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      overflowY: 'auto',
      padding: '12px 8px',
    },
    sidebarSection: {
      marginBottom: '24px',
    },
    sidebarHeader: {
      padding: '8px 16px',
      fontSize: '12px',
      fontWeight: '700',
      color: '#b9bbbe',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '4px',
    },
    sidebarBtn: (active) => ({
      width: '100%',
      padding: '10px 16px',
      background: active ? 'rgba(88, 101, 242, 0.15)' : 'transparent',
      border: 'none',
      borderLeft: active ? '3px solid #5865f2' : '3px solid transparent',
      borderRadius: '6px',
      color: active ? '#fff' : '#b9bbbe',
      cursor: 'pointer',
      fontWeight: active ? '600' : '400',
      fontSize: '14px',
      textAlign: 'left',
      transition: 'all 0.2s',
      marginBottom: '2px',
      display: 'flex',
      alignItems: 'center',
    }),
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
    settingRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px',
      background: 'rgba(255, 255, 255, 0.03)',
      borderRadius: '8px',
      marginBottom: '12px',
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
                    <p style={{ color: '#b9bbbe', fontSize: '12px', marginTop: '8px' }}>
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
                          backgroundColor: '#2f3136', // Placeholder background while loading
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
                background: 'linear-gradient(135deg, #5865f2 0%, #7289da 100%)',
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
                    {twoFactorData.qr_code ? (
                      <img src={twoFactorData.qr_code} alt="QR Code" style={{ width: '200px', height: '200px' }} />
                    ) : (
                      <QRCodeSVG value={`otpauth://totp/Pawscord:${user.email}?secret=${twoFactorData.secret}&issuer=Pawscord`} size={200} />
                    )}
                    <p style={{ color: '#b9bbbe', fontSize: '12px', marginTop: '12px' }}>
                      Manuel kod: <code style={{ background: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: '4px' }}>{twoFactorData.secret}</code>
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
              <h3 style={styles.sectionTitle}>
                🔑 {hasPassword ? 'Şifre Değiştir' : 'Şifre Belirle'}
              </h3>

              {/* 🆕 Google/OAuth kullanıcıları için bilgilendirme */}
              {!hasPassword && (
                <div style={{
                  background: 'rgba(88, 101, 242, 0.1)',
                  border: '1px solid rgba(88, 101, 242, 0.3)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  marginBottom: '16px',
                  fontSize: '14px',
                  color: '#b9bbbe'
                }}>
                  <strong style={{ color: '#5865f2' }}>ℹ️ Bilgi:</strong> Google ile giriş yaptınız.
                  Şifre belirleyerek normal giriş de yapabilirsiniz.
                </div>
              )}

              <form onSubmit={handlePasswordChange}>
                {/* 🆕 Eski şifre alanı sadece şifresi olan kullanıcılara göster */}
                {hasPassword && (
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Eski Şifre</label>
                    <input
                      type="password"
                      value={passwordData.old_password}
                      onChange={(e) => setPasswordData({ ...passwordData, old_password: e.target.value })}
                      style={styles.input}
                      required={hasPassword}
                    />
                  </div>
                )}

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
                  {loading.changePassword ? '⏳ Kaydediliyor...' : (hasPassword ? '🔐 Şifreyi Değiştir' : '🔐 Şifre Belirle')}
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
          <>
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
                <h4 style={{ color: '#fff', marginBottom: '12px' }}>🏪 Mağaza Bakiyesi: ${storeBalance.toFixed(2)}</h4>
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

            <div style={styles.card}>
              <h3 style={styles.sectionTitle}>🎯 Başarılar (Achievements)</h3>

              {achievements.length === 0 && (
                <p style={{ color: '#b9bbbe' }}>Henüz başarı kazanılmadı.</p>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginTop: '16px' }}>
                {achievements.map((achievement, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '16px',
                      background: achievement.completed
                        ? 'linear-gradient(135deg, rgba(67, 181, 129, 0.2) 0%, rgba(67, 181, 129, 0.05) 100%)'
                        : 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '12px',
                      border: achievement.completed
                        ? '1px solid rgba(67, 181, 129, 0.3)'
                        : '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <div style={{ fontSize: '32px' }}>{achievement.icon || '🏆'}</div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ color: '#fff', margin: 0, fontSize: '14px' }}>
                          {achievement.name}
                          {achievement.completed && <span style={{ marginLeft: '8px', color: '#43b581' }}>✅</span>}
                        </h4>
                        <p style={{ color: '#b9bbbe', margin: '4px 0 0 0', fontSize: '12px' }}>
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                    {achievement.progress !== undefined && (
                      <div>
                        <div style={{ ...styles.progressBar, height: '6px' }}>
                          <div style={styles.progressFill((achievement.progress / achievement.target) * 100)} />
                        </div>
                        <p style={{ color: '#b9bbbe', fontSize: '11px', marginTop: '4px' }}>
                          {achievement.progress} / {achievement.target}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        );

      case 'privacy':
        return (
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>🚫 Engellenmiş Kullanıcılar</h3>

            <p style={{ color: '#b9bbbe', marginBottom: '24px' }}>
              Engellenmiş kullanıcılar sizinle iletişime geçemez ve mesajlarınızı göremez.
            </p>

            {blockedUsers.length === 0 && (
              <p style={{ color: '#b9bbbe', textAlign: 'center', padding: '32px' }}>
                Engellenmiş kullanıcı yok.
              </p>
            )}

            {blockedUsers.map((blockedUser) => (
              <div key={blockedUser.id} style={styles.sessionCard}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={blockedUser.avatar_url || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Crect fill="%235865f2" width="40" height="40" rx="20"/%3E%3Ctext x="20" y="20" font-size="18" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E'}
                    alt={blockedUser.username}
                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                  />
                  <div>
                    <p style={{ color: '#fff', margin: 0, fontWeight: '600' }}>
                      {blockedUser.username}
                    </p>
                    <p style={{ color: '#b9bbbe', fontSize: '12px', margin: '4px 0 0 0' }}>
                      Engellenme: {new Date(blockedUser.blocked_at).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                </div>
                <button
                  style={styles.button('secondary')}
                  onClick={() => unblockUser(blockedUser.user_id)}
                >
                  ✅ Engeli Kaldır
                </button>
              </div>
            ))}

            <div style={{ marginTop: '32px', padding: '16px', background: 'rgba(250, 166, 26, 0.1)', borderRadius: '8px', border: '1px solid rgba(250, 166, 26, 0.3)' }}>
              <h4 style={{ color: '#faa61a', margin: '0 0 8px 0', fontSize: '14px' }}>ℹ️ Gizlilik İpucu</h4>
              <p style={{ color: '#b9bbbe', margin: 0, fontSize: '13px' }}>
                Bir kullanıcıyı engellemek için profil sayfasından "Engelle" butonunu kullanabilirsiniz.
              </p>
            </div>
          </div>
        );

      case 'friends':
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

      case 'appearance':
        return (
          <>
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

            <div style={styles.card}>
              <h3 style={styles.sectionTitle}>🌍 Dil Tercihi</h3>

              <p style={{ color: '#b9bbbe', marginBottom: '16px' }}>
                Uygulama dilini seçin. Mesajlar otomatik çevrilecektir.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {availableLanguages.map((lang) => (
                  <div
                    key={lang.code}
                    style={{
                      padding: '16px',
                      background: language === lang.code ? 'linear-gradient(135deg, #5865f2 0%, #7289da 100%)' : 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.3s',
                      border: language === lang.code ? '2px solid #fff' : '2px solid transparent',
                    }}
                    onClick={() => updateLanguage(lang.code)}
                  >
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>{lang.flag || '🌐'}</div>
                    <p style={{ color: '#fff', margin: 0, fontWeight: '600', fontSize: '14px' }}>{lang.name}</p>
                  </div>
                ))}
              </div>

              {availableLanguages.length === 0 && (
                <p style={{ color: '#b9bbbe' }}>Diller yükleniyor...</p>
              )}
            </div>
          </>
        );

      case 'notifications':
        return (
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>🔔 Bildirim Ayarları</h3>

            <p style={{ color: '#b9bbbe', marginBottom: '24px' }}>
              Hangi bildirimlerle uyarılmak istediğinizi seçin.
            </p>

            <div style={styles.settingRow}>
              <div>
                <h4 style={{ color: '#fff', margin: 0, fontSize: '14px' }}>💬 Mesaj Bildirimleri</h4>
                <p style={{ color: '#b9bbbe', fontSize: '12px', margin: '4px 0 0 0' }}>
                  Yeni mesaj geldiğinde bildirim göster
                </p>
              </div>
              <div
                onClick={() => handleNotificationSettingsUpdate('message_notifications', !notificationSettings.message_notifications)}
                style={{
                  width: '50px',
                  height: '26px',
                  background: notificationSettings.message_notifications ? '#5865f2' : 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '26px',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s',
                }}
              >
                <div style={{
                  position: 'absolute',
                  width: '20px',
                  height: '20px',
                  background: '#fff',
                  borderRadius: '50%',
                  top: '3px',
                  left: notificationSettings.message_notifications ? '27px' : '3px',
                  transition: 'all 0.3s',
                }} />
              </div>
            </div>

            <div style={styles.settingRow}>
              <div>
                <h4 style={{ color: '#fff', margin: 0, fontSize: '14px' }}>@️⃣ Bahsetme Bildirimleri</h4>
                <p style={{ color: '#b9bbbe', fontSize: '12px', margin: '4px 0 0 0' }}>
                  Biri sizi etiketlediğinde bildirim göster
                </p>
              </div>
              <div
                onClick={() => handleNotificationSettingsUpdate('mention_notifications', !notificationSettings.mention_notifications)}
                style={{
                  width: '50px',
                  height: '26px',
                  background: notificationSettings.mention_notifications ? '#5865f2' : 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '26px',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s',
                }}
              >
                <div style={{
                  position: 'absolute',
                  width: '20px',
                  height: '20px',
                  background: '#fff',
                  borderRadius: '50%',
                  top: '3px',
                  left: notificationSettings.mention_notifications ? '27px' : '3px',
                  transition: 'all 0.3s',
                }} />
              </div>
            </div>

            <div style={styles.settingRow}>
              <div>
                <h4 style={{ color: '#fff', margin: 0, fontSize: '14px' }}>📨 DM Bildirimleri</h4>
                <p style={{ color: '#b9bbbe', fontSize: '12px', margin: '4px 0 0 0' }}>
                  Direkt mesaj geldiğinde bildirim göster
                </p>
              </div>
              <div
                onClick={() => handleNotificationSettingsUpdate('dm_notifications', !notificationSettings.dm_notifications)}
                style={{
                  width: '50px',
                  height: '26px',
                  background: notificationSettings.dm_notifications ? '#5865f2' : 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '26px',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s',
                }}
              >
                <div style={{
                  position: 'absolute',
                  width: '20px',
                  height: '20px',
                  background: '#fff',
                  borderRadius: '50%',
                  top: '3px',
                  left: notificationSettings.dm_notifications ? '27px' : '3px',
                  transition: 'all 0.3s',
                }} />
              </div>
            </div>

            <div style={styles.settingRow}>
              <div>
                <h4 style={{ color: '#fff', margin: 0, fontSize: '14px' }}>📧 E-posta Bildirimleri</h4>
                <p style={{ color: '#b9bbbe', fontSize: '12px', margin: '4px 0 0 0' }}>
                  Önemli olaylar için e-posta gönder
                </p>
              </div>
              <div
                onClick={() => handleNotificationSettingsUpdate('email_notifications', !notificationSettings.email_notifications)}
                style={{
                  width: '50px',
                  height: '26px',
                  background: notificationSettings.email_notifications ? '#5865f2' : 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '26px',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s',
                }}
              >
                <div style={{
                  position: 'absolute',
                  width: '20px',
                  height: '20px',
                  background: '#fff',
                  borderRadius: '50%',
                  top: '3px',
                  left: notificationSettings.email_notifications ? '27px' : '3px',
                  transition: 'all 0.3s',
                }} />
              </div>
            </div>
          </div>
        );

      case 'sounds':
        return (
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>🎵 Ses Ayarları</h3>

            <p style={{ color: '#b9bbbe', marginBottom: '24px' }}>
              Uygulama seslerini özelleştirin.
            </p>

            <div style={styles.settingRow}>
              <div>
                <h4 style={{ color: '#fff', margin: 0, fontSize: '14px' }}>💬 Mesaj Sesi</h4>
                <p style={{ color: '#b9bbbe', fontSize: '12px', margin: '4px 0 0 0' }}>
                  Mesaj geldiğinde ses çal
                </p>
              </div>
              <div
                onClick={() => handleSoundSettingsUpdate('message_sound', !soundSettings.message_sound)}
                style={{
                  width: '50px',
                  height: '26px',
                  background: soundSettings.message_sound ? '#5865f2' : 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '26px',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s',
                }}
              >
                <div style={{
                  position: 'absolute',
                  width: '20px',
                  height: '20px',
                  background: '#fff',
                  borderRadius: '50%',
                  top: '3px',
                  left: soundSettings.message_sound ? '27px' : '3px',
                  transition: 'all 0.3s',
                }} />
              </div>
            </div>

            <div style={styles.settingRow}>
              <div>
                <h4 style={{ color: '#fff', margin: 0, fontSize: '14px' }}>🔔 Bildirim Sesi</h4>
                <p style={{ color: '#b9bbbe', fontSize: '12px', margin: '4px 0 0 0' }}>
                  Bildirim geldiğinde ses çal
                </p>
              </div>
              <div
                onClick={() => handleSoundSettingsUpdate('notification_sound', !soundSettings.notification_sound)}
                style={{
                  width: '50px',
                  height: '26px',
                  background: soundSettings.notification_sound ? '#5865f2' : 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '26px',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s',
                }}
              >
                <div style={{
                  position: 'absolute',
                  width: '20px',
                  height: '20px',
                  background: '#fff',
                  borderRadius: '50%',
                  top: '3px',
                  left: soundSettings.notification_sound ? '27px' : '3px',
                  transition: 'all 0.3s',
                }} />
              </div>
            </div>

            <div style={styles.settingRow}>
              <div>
                <h4 style={{ color: '#fff', margin: 0, fontSize: '14px' }}>🎤 Sesli Sohbet Ayrılma Sesi</h4>
                <p style={{ color: '#b9bbbe', fontSize: '12px', margin: '4px 0 0 0' }}>
                  Sesli sohbetten ayrıldığınızda ses çal
                </p>
              </div>
              <div
                onClick={() => handleSoundSettingsUpdate('voice_disconnect_sound', !soundSettings.voice_disconnect_sound)}
                style={{
                  width: '50px',
                  height: '26px',
                  background: soundSettings.voice_disconnect_sound ? '#5865f2' : 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '26px',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s',
                }}
              >
                <div style={{
                  position: 'absolute',
                  width: '20px',
                  height: '20px',
                  background: '#fff',
                  borderRadius: '50%',
                  top: '3px',
                  left: soundSettings.voice_disconnect_sound ? '27px' : '3px',
                  transition: 'all 0.3s',
                }} />
              </div>
            </div>

            <div style={{ marginTop: '32px' }}>
              <h4 style={{ color: '#fff', marginBottom: '12px' }}>🔊 Ana Ses Seviyesi</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ color: '#b9bbbe', fontSize: '14px', minWidth: '40px' }}>
                  {soundSettings.volume}%
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={soundSettings.volume}
                  onChange={(e) => handleSoundSettingsUpdate('volume', parseInt(e.target.value))}
                  style={{
                    flex: 1,
                    height: '6px',
                    borderRadius: '3px',
                    background: `linear-gradient(to right, #5865f2 0%, #5865f2 ${soundSettings.volume}%, rgba(255,255,255,0.1) ${soundSettings.volume}%, rgba(255,255,255,0.1) 100%)`,
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                />
              </div>
            </div>

            {/* 🔥 YENİ: Gelişmiş Ses İyileştirme Ayarları */}
            <div style={{ marginTop: '32px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px' }}>
              <h3 style={{ ...styles.sectionTitle, fontSize: '16px', marginBottom: '16px' }}>
                🎙️ Gelişmiş Ses İyileştirme
              </h3>

              <div style={styles.settingRow}>
                <div>
                  <h4 style={{ color: '#fff', margin: 0, fontSize: '14px' }}>🔇 Krisp Gürültü Engelleme</h4>
                  <p style={{ color: '#b9bbbe', fontSize: '12px', margin: '4px 0 0 0' }}>
                    Arka plan gürültülerini akıllıca bastırır (AI powered)
                  </p>
                </div>
                <div
                  onClick={() => {
                    const newValue = !soundSettings.krisp_enabled;
                    handleSoundSettingsUpdate('krisp_enabled', newValue);
                    if (newValue) toast.success('🔇 Krisp gürültü engelleme aktif!');
                  }}
                  style={{
                    width: '50px',
                    height: '26px',
                    background: soundSettings.krisp_enabled ? '#43b581' : 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '26px',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.3s',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    width: '20px',
                    height: '20px',
                    background: '#fff',
                    borderRadius: '50%',
                    top: '3px',
                    left: soundSettings.krisp_enabled ? '27px' : '3px',
                    transition: 'all 0.3s',
                  }} />
                </div>
              </div>

              {soundSettings.krisp_enabled && (
                <div style={{ marginTop: '16px', paddingLeft: '12px', borderLeft: '3px solid #43b581' }}>
                  <h4 style={{ color: '#fff', marginBottom: '8px', fontSize: '13px' }}>
                    🎚️ Gürültü Bastırma Seviyesi
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ color: '#b9bbbe', fontSize: '12px', minWidth: '60px' }}>
                      {soundSettings.noise_suppression_level || 80}%
                      {(soundSettings.noise_suppression_level || 80) >= 90 && ' 🔥'}
                    </span>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={soundSettings.noise_suppression_level || 80}
                      onChange={(e) => handleSoundSettingsUpdate('noise_suppression_level', parseInt(e.target.value))}
                      style={{
                        flex: 1,
                        height: '4px',
                        borderRadius: '2px',
                        background: `linear-gradient(to right, #43b581 0%, #43b581 ${(soundSettings.noise_suppression_level || 80) - 50}%, rgba(255,255,255,0.1) ${(soundSettings.noise_suppression_level || 80) - 50}%, rgba(255,255,255,0.1) 100%)`,
                        outline: 'none',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                  <p style={{ color: '#72767d', fontSize: '11px', marginTop: '4px' }}>
                    💡 Yüksek değerler daha fazla gürültü engeller ama sesinizi de etkileyebilir
                  </p>
                </div>
              )}

              <div style={{ ...styles.settingRow, marginTop: '20px' }}>
                <div>
                  <h4 style={{ color: '#fff', margin: 0, fontSize: '14px' }}>🎵 Yankı Önleme</h4>
                  <p style={{ color: '#b9bbbe', fontSize: '12px', margin: '4px 0 0 0' }}>
                    Hoparlör sesinin mikrofona geri yansımasını engeller
                  </p>
                </div>
                <div
                  onClick={() => {
                    const newValue = !soundSettings.echo_cancellation;
                    handleSoundSettingsUpdate('echo_cancellation', newValue);
                  }}
                  style={{
                    width: '50px',
                    height: '26px',
                    background: soundSettings.echo_cancellation !== false ? '#43b581' : 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '26px',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.3s',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    width: '20px',
                    height: '20px',
                    background: '#fff',
                    borderRadius: '50%',
                    top: '3px',
                    left: soundSettings.echo_cancellation !== false ? '27px' : '3px',
                    transition: 'all 0.3s',
                  }} />
                </div>
              </div>

              <div style={styles.settingRow}>
                <div>
                  <h4 style={{ color: '#fff', margin: 0, fontSize: '14px' }}>📊 Otomatik Ses Seviyesi</h4>
                  <p style={{ color: '#b9bbbe', fontSize: '12px', margin: '4px 0 0 0' }}>
                    Mikrofonunuzu otomatik normalize eder (Auto Gain Control)
                  </p>
                </div>
                <div
                  onClick={() => {
                    const newValue = !soundSettings.auto_gain_control;
                    handleSoundSettingsUpdate('auto_gain_control', newValue);
                  }}
                  style={{
                    width: '50px',
                    height: '26px',
                    background: soundSettings.auto_gain_control !== false ? '#43b581' : 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '26px',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.3s',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    width: '20px',
                    height: '20px',
                    background: '#fff',
                    borderRadius: '50%',
                    top: '3px',
                    left: soundSettings.auto_gain_control !== false ? '27px' : '3px',
                    transition: 'all 0.3s',
                  }} />
                </div>
              </div>

              <div style={{ marginTop: '16px', padding: '12px', backgroundColor: 'rgba(114, 137, 218, 0.1)', borderRadius: '8px', borderLeft: '3px solid #7289da' }}>
                <p style={{ color: '#b9bbbe', fontSize: '12px', margin: 0 }}>
                  💡 <strong style={{ color: '#fff' }}>Profesyonel İpucu:</strong> En iyi sonuç için tüm iyileştirmeleri açık tutun.
                  Eğer ses robotikleşirse gürültü bastırma seviyesini 70-80% arası deneyin.
                </p>
              </div>
            </div>
          </div>
        );

      case 'premium':
        return (
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>💎 Premium Üyelik</h3>

            {premiumStatus?.is_active ? (
              <div>
                <div style={{
                  padding: '24px',
                  background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0.05) 100%)',
                  borderRadius: '12px',
                  border: '2px solid rgba(255, 215, 0, 0.3)',
                  marginBottom: '24px',
                }}>
                  <h4 style={{ color: '#ffd700', margin: '0 0 12px 0', fontSize: '20px' }}>
                    ⭐ Premium Üye
                  </h4>
                  <p style={{ color: '#b9bbbe', margin: 0 }}>
                    Premium üyeliğiniz aktif! Tüm özel özelliklere erişiminiz var.
                  </p>
                  {premiumStatus.expires_at && (
                    <p style={{ color: '#b9bbbe', margin: '8px 0 0 0', fontSize: '13px' }}>
                      📅 Bitiş tarihi: {new Date(premiumStatus.expires_at).toLocaleDateString('tr-TR')}
                    </p>
                  )}
                </div>

                <h4 style={{ color: '#fff', marginBottom: '16px' }}>✨ Premium Özellikleri</h4>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {[
                    { icon: '🎨', text: 'Özel temalar ve renkler' },
                    { icon: '🎭', text: 'Animasyonlu avatar çerçeveleri' },
                    { icon: '💬', text: 'Gelişmiş mesaj araçları' },
                    { icon: '🎵', text: 'Özel emoji ve stickerlar' },
                    { icon: '🏆', text: 'Özel rozetler' },
                    { icon: '🚀', text: 'Öncelikli destek' },
                  ].map((feature, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '12px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                      }}
                    >
                      <span style={{ fontSize: '24px' }}>{feature.icon}</span>
                      <span style={{ color: '#fff', fontSize: '14px' }}>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div style={{
                  padding: '24px',
                  background: 'linear-gradient(135deg, rgba(88, 101, 242, 0.2) 0%, rgba(88, 101, 242, 0.05) 100%)',
                  borderRadius: '12px',
                  border: '2px solid rgba(88, 101, 242, 0.3)',
                  marginBottom: '24px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '64px', marginBottom: '16px' }}>💎</div>
                  <h4 style={{ color: '#fff', margin: '0 0 12px 0', fontSize: '24px' }}>
                    Premium'a Yükselt
                  </h4>
                  <p style={{ color: '#b9bbbe', margin: '0 0 24px 0' }}>
                    Özel özelliklerle deneyiminizi geliştirin
                  </p>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: '#5865f2', marginBottom: '8px' }}>
                    $4.99<span style={{ fontSize: '16px', color: '#b9bbbe' }}>/ay</span>
                  </div>
                  <button
                    style={{
                      ...styles.button('primary'),
                      marginTop: '16px',
                      padding: '16px 48px',
                      fontSize: '16px',
                    }}
                  >
                    🚀 Şimdi Satın Al
                  </button>
                </div>

                <h4 style={{ color: '#fff', marginBottom: '16px' }}>✨ Premium ile Kazanın</h4>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {[
                    { icon: '🎨', text: 'Özel temalar ve renkler' },
                    { icon: '🎭', text: 'Animasyonlu avatar çerçeveleri' },
                    { icon: '💬', text: 'Gelişmiş mesaj araçları' },
                    { icon: '🎵', text: 'Özel emoji ve stickerlar' },
                    { icon: '🏆', text: 'Özel rozetler' },
                    { icon: '🚀', text: 'Öncelikli destek' },
                    { icon: '📁', text: '100GB bulut depolama' },
                    { icon: '🎬', text: 'HD video paylaşımı' },
                  ].map((feature, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '12px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                      }}
                    >
                      <span style={{ fontSize: '24px' }}>{feature.icon}</span>
                      <span style={{ color: '#fff', fontSize: '14px' }}>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'activity':
        return (
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>📊 Kullanıcı Aktivitesi</h3>

            {userActivity.length === 0 ? (
              <div style={{
                padding: '48px',
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
              }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>📊</div>
                <h4 style={{ color: '#fff', margin: '0 0 8px 0' }}>Henüz aktivite yok</h4>
                <p style={{ color: '#b9bbbe', margin: 0 }}>
                  Aktiviteleriniz burada görünecek
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {userActivity.map((activity, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      borderLeft: '4px solid #5865f2',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <h4 style={{ color: '#fff', margin: 0, fontSize: '14px' }}>
                        {activity.type === 'message' && '💬 Mesaj gönderildi'}
                        {activity.type === 'join' && '👋 Sunucuya katıldı'}
                        {activity.type === 'voice' && '🎤 Sesli sohbete katıldı'}
                        {activity.type === 'game' && '🎮 Oyun başlatıldı'}
                      </h4>
                      <span style={{ color: '#b9bbbe', fontSize: '12px' }}>
                        {new Date(activity.timestamp).toLocaleString('tr-TR')}
                      </span>
                    </div>
                    {activity.description && (
                      <p style={{ color: '#b9bbbe', margin: 0, fontSize: '13px' }}>
                        {activity.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'drafts':
        return (
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>📝 Mesaj Taslakları</h3>

            {drafts.length === 0 ? (
              <div style={{
                padding: '48px',
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
              }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>📝</div>
                <h4 style={{ color: '#fff', margin: '0 0 8px 0' }}>Taslak yok</h4>
                <p style={{ color: '#b9bbbe', margin: 0 }}>
                  Mesaj taslakları otomatik olarak kaydedilir
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {drafts.map((draft, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <h4 style={{ color: '#fff', margin: '0 0 8px 0', fontSize: '14px' }}>
                        {draft.channel_name || `Kanal #${draft.channel_id}`}
                      </h4>
                      <p style={{
                        color: '#b9bbbe',
                        margin: 0,
                        fontSize: '13px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {draft.content}
                      </p>
                      <span style={{ color: '#72767d', fontSize: '11px', marginTop: '4px', display: 'block' }}>
                        {new Date(draft.updated_at).toLocaleString('tr-TR')}
                      </span>
                    </div>
                    <button
                      style={{
                        ...styles.button('danger'),
                        padding: '8px 16px',
                        fontSize: '12px',
                        marginLeft: '12px',
                      }}
                      onClick={() => deleteDraft(draft.key)}
                    >
                      🗑️ Sil
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'bookmarks':
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

      case 'status':
        return (
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>🎨 Özel Durum</h3>

            <div style={{ marginBottom: '24px' }}>
              <label style={styles.label}>Durum</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginTop: '8px' }}>
                {[
                  { value: 'online', icon: '🟢', label: 'Çevrimiçi', color: '#43b581' },
                  { value: 'idle', icon: '🟡', label: 'Boşta', color: '#faa61a' },
                  { value: 'dnd', icon: '🔴', label: 'Rahatsız Etmeyin', color: '#f04747' },
                  { value: 'invisible', icon: '⚫', label: 'Görünmez', color: '#747f8d' },
                ].map(status => (
                  <button
                    key={status.value}
                    onClick={() => setCustomStatus({ ...customStatus, status: status.value })}
                    style={{
                      padding: '16px 12px',
                      background: customStatus.status === status.value
                        ? `linear-gradient(135deg, ${status.color}33 0%, ${status.color}11 100%)`
                        : 'rgba(255, 255, 255, 0.03)',
                      border: customStatus.status === status.value ? `2px solid ${status.color}` : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>{status.icon}</div>
                    <div style={{ color: '#fff', fontSize: '12px', fontWeight: '500' }}>{status.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Özel Mesaj</label>
              <input
                type="text"
                value={customStatus.custom_status}
                onChange={(e) => setCustomStatus({ ...customStatus, custom_status: e.target.value })}
                placeholder="Ne yapıyorsun?"
                style={styles.input}
                maxLength={128}
              />
              <p style={{ color: '#b9bbbe', fontSize: '12px', marginTop: '4px' }}>
                {customStatus.custom_status.length}/128 karakter
              </p>
            </div>

            <button
              style={{ ...styles.button('primary'), marginTop: '16px' }}
              onClick={updateCustomStatus}
            >
              💾 Durumu Kaydet
            </button>
          </div>
        );

      case 'gdpr':
        return (
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>🔒 GDPR & Veri Gizliliği</h3>

            <div style={{
              padding: '16px',
              background: 'rgba(88, 101, 242, 0.1)',
              borderRadius: '8px',
              borderLeft: '4px solid #5865f2',
              marginBottom: '24px',
            }}>
              <h4 style={{ color: '#fff', margin: '0 0 8px 0', fontSize: '14px' }}>
                ℹ️ Veri Dışa Aktarma Hakkı
              </h4>
              <p style={{ color: '#b9bbbe', margin: 0, fontSize: '13px' }}>
                GDPR (Genel Veri Koruma Yönetmeliği) kapsamında tüm kişisel verilerinizi dışa aktarabilirsiniz.
                Bu işlem, mesajlar, profil bilgileri, aktiviteler ve daha fazlasını içerir.
              </p>
            </div>

            <button
              style={styles.button('primary')}
              onClick={requestGDPRExport}
              disabled={exportRequested}
            >
              {exportRequested ? '⏳ İşleniyor...' : '📥 GDPR Dışa Aktarma Talebi Oluştur'}
            </button>

            {gdprExports.length > 0 && (
              <div style={{ marginTop: '24px' }}>
                <h4 style={{ color: '#fff', marginBottom: '12px' }}>📋 Dışa Aktarma Geçmişi</h4>
                {gdprExports.map((exp, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      marginBottom: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ color: '#fff', margin: 0, fontSize: '14px' }}>
                          {exp.status === 'pending' && '⏳ İşleniyor'}
                          {exp.status === 'completed' && '✅ Tamamlandı'}
                          {exp.status === 'failed' && '❌ Başarısız'}
                        </p>
                        <p style={{ color: '#b9bbbe', margin: '4px 0 0 0', fontSize: '12px' }}>
                          {new Date(exp.created_at).toLocaleString('tr-TR')}
                        </p>
                      </div>
                      {exp.status === 'completed' && exp.download_url && (
                        <a
                          href={exp.download_url}
                          style={{
                            ...styles.button('secondary'),
                            padding: '8px 16px',
                            fontSize: '12px',
                            textDecoration: 'none',
                          }}
                        >
                          📥 İndir
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'developer':
        return (
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>🔧 Geliştirici Araçları</h3>

            {/* OAuth Apps */}
            <div style={{ marginBottom: '32px' }}>
              <h4 style={{ color: '#fff', marginBottom: '12px' }}>🔑 OAuth Uygulamalar</h4>
              {oauthApps.length === 0 ? (
                <p style={{ color: '#b9bbbe', fontSize: '14px' }}>Henüz OAuth uygulamanız yok.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {oauthApps.map((app, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '16px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '8px',
                      }}
                    >
                      <h5 style={{ color: '#fff', margin: '0 0 8px 0' }}>{app.name}</h5>
                      <p style={{ color: '#b9bbbe', margin: 0, fontSize: '13px' }}>
                        Client ID: <code>{app.client_id}</code>
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Webhooks */}
            <div style={{ marginBottom: '32px' }}>
              <h4 style={{ color: '#fff', marginBottom: '12px' }}>🪝 Webhook'lar</h4>
              {webhooks.length === 0 ? (
                <p style={{ color: '#b9bbbe', fontSize: '14px' }}>Henüz webhook'unuz yok.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {webhooks.map((webhook, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '16px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '8px',
                      }}
                    >
                      <h5 style={{ color: '#fff', margin: '0 0 8px 0' }}>{webhook.name}</h5>
                      <p style={{ color: '#b9bbbe', margin: 0, fontSize: '13px' }}>
                        URL: <code style={{ wordBreak: 'break-all' }}>{webhook.url}</code>
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bot Accounts */}
            <div>
              <h4 style={{ color: '#fff', marginBottom: '12px' }}>🤖 Bot Hesapları</h4>
              {botAccounts.length === 0 ? (
                <p style={{ color: '#b9bbbe', fontSize: '14px' }}>Henüz bot hesabınız yok.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {botAccounts.map((bot, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '16px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                      }}
                    >
                      <img
                        src={bot.avatar_url || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"%3E%3Crect fill="%235865f2" width="48" height="48" rx="24"/%3E%3Ctext x="24" y="24" font-size="22" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E🤖%3C/text%3E%3C/svg%3E'}
                        alt={bot.username}
                        style={{ width: '48px', height: '48px', borderRadius: '50%' }}
                      />
                      <div>
                        <h5 style={{ color: '#fff', margin: '0 0 4px 0' }}>{bot.username}</h5>
                        <p style={{ color: '#b9bbbe', margin: 0, fontSize: '13px' }}>
                          Token: <code>{bot.token?.substring(0, 20)}...</code>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'inventory':
        return (
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>🎒 Envanter & Ekipman</h3>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ color: '#fff', marginBottom: '12px' }}>⚡ Ekipli İtemler</h4>
              {equippedItems.length === 0 ? (
                <p style={{ color: '#b9bbbe', fontSize: '14px' }}>Henüz ekipli item yok.</p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                  {equippedItems.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '16px',
                        background: 'linear-gradient(135deg, rgba(67, 181, 129, 0.2) 0%, rgba(67, 181, 129, 0.05) 100%)',
                        border: '2px solid #43b581',
                        borderRadius: '12px',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontSize: '48px', marginBottom: '8px' }}>{item.icon || '🎁'}</div>
                      <h5 style={{ color: '#fff', margin: '0 0 4px 0', fontSize: '14px' }}>{item.name}</h5>
                      <button
                        style={{ ...styles.button('secondary'), padding: '6px 12px', fontSize: '12px', marginTop: '8px' }}
                        onClick={() => unequipItem(item.id)}
                      >
                        ❌ Çıkar
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h4 style={{ color: '#fff', marginBottom: '12px' }}>📦 Tüm İtemler</h4>
              {inventory.length === 0 ? (
                <div style={{ padding: '48px', textAlign: 'center', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px' }}>
                  <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎒</div>
                  <h4 style={{ color: '#fff', margin: '0 0 8px 0' }}>Envanter boş</h4>
                  <p style={{ color: '#b9bbbe', margin: 0 }}>Premium Store'dan item satın alabilirsiniz</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                  {inventory.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '16px',
                        background: item.is_equipped
                          ? 'linear-gradient(135deg, rgba(67, 181, 129, 0.2) 0%, rgba(67, 181, 129, 0.05) 100%)'
                          : 'rgba(255, 255, 255, 0.05)',
                        border: item.is_equipped ? '2px solid #43b581' : '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontSize: '48px', marginBottom: '8px' }}>{item.icon || '🎁'}</div>
                      <h5 style={{ color: '#fff', margin: '0 0 4px 0', fontSize: '14px' }}>{item.name}</h5>
                      <p style={{ color: '#b9bbbe', margin: '4px 0', fontSize: '12px' }}>{item.description}</p>
                      {!item.is_equipped && (
                        <button
                          style={{ ...styles.button('primary'), padding: '6px 12px', fontSize: '12px', marginTop: '8px' }}
                          onClick={() => equipItem(item.id)}
                        >
                          ✅ Ekip
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'endorsements':
        return (
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>⭐ Kullanıcı Onayları</h3>

            {endorsements.length === 0 ? (
              <div style={{ padding: '48px', textAlign: 'center', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px' }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>⭐</div>
                <h4 style={{ color: '#fff', margin: '0 0 8px 0' }}>Henüz onay yok</h4>
                <p style={{ color: '#b9bbbe', margin: 0 }}>Diğer kullanıcılar sizi onayladığında burada görünecek</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {endorsements.map((endorsement, idx) => (
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
                        src={endorsement.endorser_avatar || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"%3E%3Crect fill="%235865f2" width="32" height="32" rx="16"/%3E%3Ctext x="16" y="16" font-size="14" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E'}
                        alt={endorsement.endorser_name}
                        style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                      />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ color: '#fff', margin: 0, fontSize: '14px' }}>{endorsement.endorser_name}</h4>
                        <span style={{ color: '#b9bbbe', fontSize: '12px' }}>
                          {new Date(endorsement.created_at).toLocaleString('tr-TR')}
                        </span>
                      </div>
                    </div>
                    {endorsement.message && (
                      <p style={{ color: '#dcddde', margin: 0, fontSize: '14px', fontStyle: 'italic' }}>
                        "{endorsement.message}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'history':
        return (
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>📜 İsim Değişiklik Geçmişi</h3>

            {nicknameHistory.length === 0 ? (
              <div style={{ padding: '48px', textAlign: 'center', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px' }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>📜</div>
                <h4 style={{ color: '#fff', margin: '0 0 8px 0' }}>Değişiklik yok</h4>
                <p style={{ color: '#b9bbbe', margin: 0 }}>İsim değişiklikleriniz burada görünecek</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {nicknameHistory.map((history, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ color: '#fff', margin: 0, fontSize: '14px', fontWeight: '600' }}>
                          {history.old_nickname} → {history.new_nickname}
                        </p>
                        <p style={{ color: '#b9bbbe', margin: '4px 0 0 0', fontSize: '12px' }}>
                          {history.server_name}
                        </p>
                      </div>
                      <span style={{ color: '#b9bbbe', fontSize: '12px' }}>
                        {new Date(history.changed_at).toLocaleString('tr-TR')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  // ========================================
  // 🎨 MAIN RENDER
  // ========================================
  try {
    return (
      <div style={styles.overlay} onClick={onClose}>
        <div style={styles.panel} onClick={(e) => e.stopPropagation()}>
          {/* 🎨 MODERN PROFILE BANNER HEADER */}
          <div className="profile-header-banner">
            <div className="profile-header-content">
              <div className="profile-avatar-wrapper">
                <img
                  src={
                    formData?.avatar_url && typeof formData.avatar_url === 'string'
                      ? ((formData.avatar_url.startsWith('http')
                        ? formData.avatar_url
                        : `${BASE_URL}${formData.avatar_url}`) + `?t=${Date.now()}`)
                      : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"%3E%3Crect fill="%235865f2" width="120" height="120" rx="60"/%3E%3Ctext x="60" y="60" font-size="50" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E'
                  }
                  alt={formData?.username || 'User'}
                  className="profile-avatar-large"
                  onError={(e) => {
                    // Prevent infinite loop - only set fallback once
                    if (!e.target.dataset.errorHandled) {
                      e.target.dataset.errorHandled = 'true';
                      console.error('❌ [Avatar Load Error]', e.target.src);
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"%3E%3Crect fill="%235865f2" width="120" height="120" rx="60"/%3E%3Ctext x="60" y="60" font-size="50" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E';
                    }
                  }}
                />
                <div className={`profile-status-indicator ${customStatus?.status || 'online'}`}></div>
              </div>
              <div className="profile-header-info">
                <h1 className="profile-username">
                  {formData?.username || 'User'}
                  {premiumStatus?.is_premium && <span className="profile-badge">💎</span>}
                  {Array.isArray(badges) && badges.includes('verified') && <span className="profile-badge">✅</span>}
                  {Array.isArray(badges) && badges.includes('developer') && <span className="profile-badge">👨‍💻</span>}
                </h1>
                {formData?.status_message && (
                  <p className="profile-status-message">"{formData.status_message}"</p>
                )}
                <div className="profile-stats-bar">
                  <div className="profile-stat-item">
                    <span className="profile-stat-icon">⭐</span>
                    <span className="profile-stat-value">Level {userStats?.level || 1}</span>
                  </div>
                  <div className="profile-stat-item">
                    <span className="profile-stat-icon">🏆</span>
                    <span className="profile-stat-value">{userStats?.xp || 0}</span>
                    <span className="profile-stat-label">XP</span>
                  </div>
                  <div className="profile-stat-item">
                    <span className="profile-stat-icon">🪙</span>
                    <span className="profile-stat-value">{userStats?.coins || 0}</span>
                    <span className="profile-stat-label">Coins</span>
                  </div>
                  <div className="profile-stat-item">
                    <span className="profile-stat-icon">👥</span>
                    <span className="profile-stat-value">{Array.isArray(friends) ? friends.length : 0}</span>
                    <span className="profile-stat-label">Arkadaş</span>
                  </div>
                </div>
              </div>
              <button style={{
                ...styles.closeBtn,
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(0, 0, 0, 0.5)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                width: '40px',
                height: '40px',
              }} onClick={onClose}>×</button>
            </div>
          </div>

          <div style={styles.body}>
            {/* 🎨 Sol Sidebar - Kategoriler */}
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

            {/* 🖼️ Sağ İçerik Alanı */}
            <div style={styles.content} className="user-profile-content">
              {renderTabContent()}
            </div>
          </div>
        </div>

        {/* 📸 Avatar Cropper Modal */}
        {showCropper && (
          <AvatarCropper
            imageFile={tempImageFile}
            onCropComplete={handleCropComplete}
            onCancel={() => {
              setShowCropper(false);
              setTempImageFile(null);
            }}
          />
        )}

        {/* 🚪 Logout Modal */}
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
    console.error('❌ [UserProfilePanel] Render error:', error);
    return (
      <div style={styles.overlay} onClick={onClose}>
        <div style={{
          background: '#2f3136',
          padding: '32px',
          borderRadius: '12px',
          textAlign: 'center',
          color: '#fff'
        }}>
          <h3>😢 Profil Yüklenemedi</h3>
          <p style={{ color: '#b9bbbe' }}>Bir hata oluştu. Lütfen tekrar deneyin.</p>
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


