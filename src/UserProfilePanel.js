import { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import toast from './utils/toast';
import { QRCodeSVG } from 'qrcode.react';
import AvatarCropper from './components/AvatarCropper';
import LogoutModal from './components/LogoutModal';
import { getApiBase } from './utils/apiEndpoints';
import { ABSOLUTE_HOST_URL } from './utils/constants';
import './UserProfilePanel.css';
import confirmDialog from './utils/confirmDialog';
import profileStyles from './UserProfilePanel/styles';

// Tab Components
import ProfileTab from './UserProfilePanel/tabs/ProfileTab';
import SecurityTab from './UserProfilePanel/tabs/SecurityTab';
import BadgesTab from './UserProfilePanel/tabs/BadgesTab';
import PrivacyTab from './UserProfilePanel/tabs/PrivacyTab';
import FriendsTab from './UserProfilePanel/tabs/FriendsTab';
import AppearanceTab from './UserProfilePanel/tabs/AppearanceTab';
import NotificationsTab from './UserProfilePanel/tabs/NotificationsTab';
import SoundSettingsTab from './UserProfilePanel/tabs/SoundSettingsTab';
import PremiumTab from './UserProfilePanel/tabs/PremiumTab';
import ActivityTab from './UserProfilePanel/tabs/ActivityTab';
import DraftsTab from './UserProfilePanel/tabs/DraftsTab';
import BookmarksTab from './UserProfilePanel/tabs/BookmarksTab';
import CustomStatusTab from './UserProfilePanel/tabs/CustomStatusTab';
import GDPRTab from './UserProfilePanel/tabs/GDPRTab';
import DeveloperTab from './UserProfilePanel/tabs/DeveloperTab';
import InventoryTab from './UserProfilePanel/tabs/InventoryTab';
import EndorsementsTab from './UserProfilePanel/tabs/EndorsementsTab';
import NicknameHistoryTab from './UserProfilePanel/tabs/NicknameHistoryTab';

const API_URL = getApiBase();
const BASE_URL = ABSOLUTE_HOST_URL;

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

      // 🔧 FIX: Backend returns {available: [], enabled: []} format
      // Check if 'totp' is in the enabled array
      const enabledMethods = response.data?.enabled || [];
      const isEnabled = enabledMethods.includes('totp') ||
        response.data?.totp_enabled ||
        response.data?.is_enabled ||
        false;

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
    if (!await confirmDialog('2FA\'yı devre dışı bırakmak istediğinize emin misiniz?')) return;

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
    if (!await confirmDialog('Arkadaşı kaldırmak istediğinize emin misiniz?')) return;

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
    if (!await confirmDialog('Tüm aktif oturumları sonlandırmak istediğinize emin misiniz?')) return;

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

  const styles = profileStyles;

  // ========================================
  // 🎯 RENDER TAB CONTENT
  // ========================================
const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <ProfileTab
            defaultAvatars={defaultAvatars}
            emailVerified={emailVerified}
            fileInputRef={fileInputRef}
            formData={formData}
            handleAvatarUpload={handleAvatarUpload}
            handleInputChange={handleInputChange}
            handlePhoneUpdate={handlePhoneUpdate}
            handleSaveProfile={handleSaveProfile}
            isOwnProfile={isOwnProfile}
            loading={loading}
            phoneNumber={phoneNumber}
            resendVerificationEmail={resendVerificationEmail}
            selectDefaultAvatar={selectDefaultAvatar}
            setPhoneNumber={setPhoneNumber}
          />
        );
      case 'security':
        return (
          <SecurityTab
            backupCodes={backupCodes}
            disable2FA={disable2FA}
            enable2FA={enable2FA}
            handlePasswordChange={handlePasswordChange}
            hasPassword={hasPassword}
            loading={loading}
            passwordData={passwordData}
            revokeAllSessions={revokeAllSessions}
            revokeSession={revokeSession}
            sessions={sessions}
            setPasswordData={setPasswordData}
            setVerificationCode={setVerificationCode}
            twoFactorData={twoFactorData}
            twoFactorEnabled={twoFactorEnabled}
            user={user}
            verificationCode={verificationCode}
            verify2FASetup={verify2FASetup}
          />
        );
      case 'badges':
        return (
          <BadgesTab
            achievements={achievements}
            badges={badges}
            calculateXPProgress={calculateXPProgress}
            storeBalance={storeBalance}
            userStats={userStats}
          />
        );
      case 'privacy':
        return <PrivacyTab blockedUsers={blockedUsers} unblockUser={unblockUser} />;
      case 'friends':
        return (
          <FriendsTab
            friendRequests={friendRequests}
            friends={friends}
            removeFriend={removeFriend}
            respondToFriendRequest={respondToFriendRequest}
          />
        );
      case 'appearance':
        return (
          <AppearanceTab
            applyTheme={applyTheme}
            availableLanguages={availableLanguages}
            currentTheme={currentTheme}
            language={language}
            themes={themes}
            updateLanguage={updateLanguage}
          />
        );
      case 'notifications':
        return <NotificationsTab handleNotificationSettingsUpdate={handleNotificationSettingsUpdate} notificationSettings={notificationSettings} />;
      case 'sounds':
        return <SoundSettingsTab handleSoundSettingsUpdate={handleSoundSettingsUpdate} soundSettings={soundSettings} />;
      case 'premium':
        return <PremiumTab premiumStatus={premiumStatus} />;
      case 'activity':
        return <ActivityTab userActivity={userActivity} />;
      case 'drafts':
        return <DraftsTab deleteDraft={deleteDraft} drafts={drafts} />;
      case 'bookmarks':
        return <BookmarksTab bookmarks={bookmarks} />;
      case 'status':
        return <CustomStatusTab customStatus={customStatus} setCustomStatus={setCustomStatus} updateCustomStatus={updateCustomStatus} />;
      case 'gdpr':
        return <GDPRTab exportRequested={exportRequested} gdprExports={gdprExports} requestGDPRExport={requestGDPRExport} />;
      case 'developer':
        return <DeveloperTab botAccounts={botAccounts} oauthApps={oauthApps} webhooks={webhooks} />;
      case 'inventory':
        return (
          <InventoryTab
            equipItem={equipItem}
            equippedItems={equippedItems}
            inventory={inventory}
            unequipItem={unequipItem}
          />
        );
      case 'endorsements':
        return <EndorsementsTab endorsements={endorsements} />;
      case 'history':
        return <NicknameHistoryTab nicknameHistory={nicknameHistory} />;
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


