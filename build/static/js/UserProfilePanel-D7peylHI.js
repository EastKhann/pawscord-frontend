var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import AvatarCropper from "./AvatarCropper-fmvEo3gX.js";
import LogoutModal from "./LogoutModal-B4uPtFZv.js";
import { g as getApiBase, d as confirmDialog, t as toast$1, n as ABSOLUTE_HOST_URL } from "./index-DGqPEDt8.js";
import { a as axios } from "./index-BnLT0o6q.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
import "./ui-vendor-iPoN0WGz.js";
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    backdropFilter: "blur(8px)"
  },
  panel: {
    width: "900px",
    maxHeight: "90vh",
    background: "linear-gradient(135deg, #1e1e2e 0%, #2a2a3e 100%)",
    borderRadius: "16px",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.1)"
  },
  header: {
    padding: "24px 32px",
    background: "linear-gradient(90deg, #5865f2 0%, #7289da 100%)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#fff",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  closeBtn: {
    background: "rgba(255, 255, 255, 0.15)",
    border: "none",
    color: "#fff",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s"
  },
  tabBar: {
    display: "flex",
    gap: "8px",
    padding: "20px 32px",
    minHeight: "70px",
    background: "rgba(0, 0, 0, 0.2)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    overflowX: "auto",
    alignItems: "center"
  },
  body: {
    display: "flex",
    height: "calc(90vh - 88px)",
    // Header yüksekliği çıkarılmış
    overflow: "hidden"
  },
  sidebar: {
    width: "240px",
    background: "rgba(0, 0, 0, 0.3)",
    borderRight: "1px solid rgba(255, 255, 255, 0.1)",
    overflowY: "auto",
    padding: "12px 8px"
  },
  sidebarSection: {
    marginBottom: "24px"
  },
  sidebarHeader: {
    padding: "8px 16px",
    fontSize: "12px",
    fontWeight: "700",
    color: "#b9bbbe",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "4px"
  },
  sidebarBtn: /* @__PURE__ */ __name((active) => ({
    width: "100%",
    padding: "10px 16px",
    background: active ? "rgba(88, 101, 242, 0.15)" : "transparent",
    border: "none",
    borderLeft: active ? "3px solid #5865f2" : "3px solid transparent",
    borderRadius: "6px",
    color: active ? "#fff" : "#b9bbbe",
    cursor: "pointer",
    fontWeight: active ? "600" : "400",
    fontSize: "14px",
    textAlign: "left",
    transition: "all 0.2s",
    marginBottom: "2px",
    display: "flex",
    alignItems: "center"
  }), "sidebarBtn"),
  tab: /* @__PURE__ */ __name((active) => ({
    padding: "10px 20px",
    background: active ? "linear-gradient(135deg, #5865f2 0%, #7289da 100%)" : "rgba(255, 255, 255, 0.05)",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: active ? "600" : "400",
    fontSize: "14px",
    transition: "all 0.3s",
    whiteSpace: "nowrap",
    boxShadow: active ? "0 4px 15px rgba(88, 101, 242, 0.4)" : "none"
  }), "tab"),
  content: {
    flex: 1,
    overflowY: "auto",
    padding: "32px"
  },
  card: {
    background: "rgba(255, 255, 255, 0.03)",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "20px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    transition: "all 0.3s"
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#fff",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  inputGroup: {
    marginBottom: "20px"
  },
  label: {
    display: "block",
    color: "#b9bbbe",
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    background: "rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.2s",
    boxSizing: "border-box"
  },
  button: /* @__PURE__ */ __name((variant = "primary") => ({
    padding: "12px 24px",
    background: variant === "primary" ? "linear-gradient(135deg, #5865f2 0%, #7289da 100%)" : variant === "danger" ? "linear-gradient(135deg, #ed4245 0%, #c9302c 100%)" : "rgba(255, 255, 255, 0.1)",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.3s",
    boxShadow: variant === "primary" ? "0 4px 15px rgba(88, 101, 242, 0.3)" : "none"
  }), "button"),
  avatarSection: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    marginBottom: "24px"
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid rgba(88, 101, 242, 0.5)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)"
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    background: "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#1e1e2e",
    margin: "4px"
  },
  progressBar: {
    width: "100%",
    height: "10px",
    background: "rgba(0, 0, 0, 0.3)",
    borderRadius: "10px",
    overflow: "hidden",
    marginTop: "8px"
  },
  progressFill: /* @__PURE__ */ __name((percent) => ({
    width: `${percent}%`,
    height: "100%",
    background: "linear-gradient(90deg, #5865f2 0%, #7289da 50%, #43b581 100%)",
    borderRadius: "10px",
    transition: "width 0.5s ease"
  }), "progressFill"),
  qrCode: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    padding: "24px",
    background: "#fff",
    borderRadius: "12px",
    marginTop: "16px"
  },
  backupCodesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
    marginTop: "16px"
  },
  backupCode: {
    padding: "12px",
    background: "rgba(0, 0, 0, 0.4)",
    borderRadius: "8px",
    fontFamily: "monospace",
    fontSize: "14px",
    textAlign: "center",
    color: "#43b581",
    border: "1px solid rgba(67, 181, 129, 0.3)"
  },
  themeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginTop: "16px"
  },
  themeCard: /* @__PURE__ */ __name((active) => ({
    padding: "16px",
    background: active ? "linear-gradient(135deg, #5865f2 0%, #7289da 100%)" : "rgba(255, 255, 255, 0.05)",
    borderRadius: "12px",
    cursor: "pointer",
    textAlign: "center",
    transition: "all 0.3s",
    border: active ? "2px solid #fff" : "2px solid transparent"
  }), "themeCard"),
  sessionCard: {
    padding: "16px",
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "8px",
    marginBottom: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  settingRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    background: "rgba(255, 255, 255, 0.03)",
    borderRadius: "8px",
    marginBottom: "12px"
  }
};
const API_URL = getApiBase();
const authHeaders = /* @__PURE__ */ __name(() => ({
  Authorization: `Bearer ${localStorage.getItem("access_token")}`
}), "authHeaders");
const authGet = /* @__PURE__ */ __name((path) => axios.get(`${API_URL}${path}`, { headers: authHeaders() }), "authGet");
const authPost = /* @__PURE__ */ __name((path, data = {}, opts = {}) => axios.post(`${API_URL}${path}`, data, { headers: authHeaders(), ...opts }), "authPost");
const authDelete = /* @__PURE__ */ __name((path) => axios.delete(`${API_URL}${path}`, { headers: authHeaders() }), "authDelete");
const useProfileSecurity = /* @__PURE__ */ __name(() => {
  const [loading, setLoading] = reactExports.useState({});
  const [twoFactorData, setTwoFactorData] = reactExports.useState(null);
  const [twoFactorEnabled, setTwoFactorEnabled] = reactExports.useState(false);
  const [backupCodes, setBackupCodes] = reactExports.useState([]);
  const [verificationCode, setVerificationCode] = reactExports.useState("");
  const [sessions, setSessions] = reactExports.useState([]);
  const [emailVerified, setEmailVerified] = reactExports.useState(false);
  const [passwordData, setPasswordData] = reactExports.useState({ old_password: "", new_password: "", confirm_password: "" });
  const [hasPassword, setHasPassword] = reactExports.useState(true);
  const check2FAStatus = /* @__PURE__ */ __name(async () => {
    try {
      const response = await authGet("/api/2fa/methods/");
      const enabledMethods = response.data?.enabled || [];
      setTwoFactorEnabled(enabledMethods.includes("totp") || response.data?.totp_enabled || response.data?.is_enabled || false);
    } catch (err) {
      console.error("2FA status check failed:", err);
    }
  }, "check2FAStatus");
  const enable2FA = /* @__PURE__ */ __name(async () => {
    try {
      setLoading((l) => ({ ...l, enable2fa: true }));
      const response = await authPost("/api/security/2fa/enable/");
      setTwoFactorData(response.data);
      setBackupCodes(response.data.backup_codes || []);
      toast$1.success("📱 2FA QR kodu oluşturuldu! Lütfen telefonunuzdaki authenticator uygulamasıyla tarayın.");
    } catch (err) {
      toast$1.error("2FA etkinleştirme başarısız: " + (err.response?.data?.error || "Bilinmeyen hata"));
    } finally {
      setLoading((l) => ({ ...l, enable2fa: false }));
    }
  }, "enable2FA");
  const verify2FASetup = /* @__PURE__ */ __name(async () => {
    try {
      setLoading((l) => ({ ...l, verify2fa: true }));
      await authPost("/api/security/2fa/verify-setup/", { code: verificationCode });
      setTwoFactorEnabled(true);
      setTwoFactorData(null);
      setVerificationCode("");
      toast$1.success("✅ 2FA başarıyla etkinleştirildi!");
    } catch (err) {
      toast$1.error("Kod yanlış! Lütfen tekrar deneyin.");
    } finally {
      setLoading((l) => ({ ...l, verify2fa: false }));
    }
  }, "verify2FASetup");
  const disable2FA = /* @__PURE__ */ __name(async () => {
    if (!await confirmDialog("2FA'yı devre dışı bırakmak istediğinize emin misiniz?")) return;
    try {
      setLoading((l) => ({ ...l, disable2fa: true }));
      await authPost("/api/security/2fa/disable/");
      setTwoFactorEnabled(false);
      toast$1.success("2FA devre dışı bırakıldı.");
    } catch (err) {
      toast$1.error("2FA devre dışı bırakma başarısız.");
    } finally {
      setLoading((l) => ({ ...l, disable2fa: false }));
    }
  }, "disable2FA");
  const checkPasswordStatus = /* @__PURE__ */ __name(async () => {
    try {
      const response = await authGet("/api/users/password_status/");
      setHasPassword(response.data?.has_password ?? true);
    } catch (err) {
      console.error("Password status check failed:", err);
      setHasPassword(true);
    }
  }, "checkPasswordStatus");
  const handlePasswordChange = /* @__PURE__ */ __name(async (e) => {
    e.preventDefault();
    if (passwordData.new_password !== passwordData.confirm_password) {
      toast$1.error("Yeni şifreler eşleşmiyor!");
      return;
    }
    if (passwordData.new_password.length < 8) {
      toast$1.error("Şifre en az 8 karakter olmalıdır!");
      return;
    }
    try {
      setLoading((l) => ({ ...l, changePassword: true }));
      const requestData = { new_password: passwordData.new_password };
      if (hasPassword) requestData.old_password = passwordData.old_password;
      await authPost("/api/users/change_password/", requestData);
      toast$1.success(hasPassword ? "✅ Şifre başarıyla değiştirildi!" : "✅ Şifre başarıyla belirlendi!");
      setPasswordData({ old_password: "", new_password: "", confirm_password: "" });
      if (!hasPassword) setHasPassword(true);
    } catch (err) {
      toast$1.error("Şifre değiştirme başarısız: " + (err.response?.data?.error || "Eski şifre yanlış olabilir"));
    } finally {
      setLoading((l) => ({ ...l, changePassword: false }));
    }
  }, "handlePasswordChange");
  const fetchEmailVerificationStatus = /* @__PURE__ */ __name(async () => {
    try {
      const response = await authGet("/auth/check-verification/");
      setEmailVerified(response.data?.is_verified || false);
    } catch (err) {
      console.error("Email verification check failed:", err);
    }
  }, "fetchEmailVerificationStatus");
  const resendVerificationEmail = /* @__PURE__ */ __name(async () => {
    try {
      setLoading((l) => ({ ...l, resendEmail: true }));
      await authPost("/auth/send-verification/");
      toast$1.success("✉️ Doğrulama e-postası gönderildi!");
    } catch (err) {
      toast$1.error("E-posta gönderilemedi.");
    } finally {
      setLoading((l) => ({ ...l, resendEmail: false }));
    }
  }, "resendVerificationEmail");
  const fetchSessions = /* @__PURE__ */ __name(async () => {
    try {
      const response = await authGet("/api/security/sessions/");
      setSessions(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Sessions fetch failed:", err);
      setSessions([]);
    }
  }, "fetchSessions");
  const revokeSession = /* @__PURE__ */ __name(async (sessionId) => {
    try {
      await authPost(`/api/security/sessions/${sessionId}/revoke/`);
      toast$1.success("Oturum sonlandırıldı.");
      fetchSessions();
    } catch (err) {
      toast$1.error("Oturum sonlandırılamadı.");
    }
  }, "revokeSession");
  const revokeAllSessions = /* @__PURE__ */ __name(async () => {
    if (!await confirmDialog("Tüm aktif oturumları sonlandırmak istediğinize emin misiniz?")) return;
    try {
      await authPost("/api/security/sessions/revoke-all/");
      toast$1.success("Tüm oturumlar sonlandırıldı. Lütfen tekrar giriş yapın.");
      setTimeout(() => {
        localStorage.removeItem("access_token");
        window.location.reload();
      }, 2e3);
    } catch (err) {
      toast$1.error("Oturumlar sonlandırılamadı.");
    }
  }, "revokeAllSessions");
  return {
    loading,
    twoFactorData,
    twoFactorEnabled,
    backupCodes,
    verificationCode,
    sessions,
    emailVerified,
    passwordData,
    hasPassword,
    setVerificationCode,
    setPasswordData,
    setEmailVerified,
    check2FAStatus,
    enable2FA,
    verify2FASetup,
    disable2FA,
    checkPasswordStatus,
    handlePasswordChange,
    fetchEmailVerificationStatus,
    resendVerificationEmail,
    fetchSessions,
    revokeSession,
    revokeAllSessions
  };
}, "useProfileSecurity");
const useProfileSocial = /* @__PURE__ */ __name(() => {
  const [loading, setLoading] = reactExports.useState({});
  const [blockedUsers, setBlockedUsers] = reactExports.useState([]);
  const [friendRequests, setFriendRequests] = reactExports.useState([]);
  const [friends, setFriends] = reactExports.useState([]);
  const fetchBlockedUsers = /* @__PURE__ */ __name(async () => {
    try {
      const response = await authGet("/blocks/list/");
      setBlockedUsers(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Blocked users fetch failed:", err);
      setBlockedUsers([]);
    }
  }, "fetchBlockedUsers");
  const unblockUser = /* @__PURE__ */ __name(async (userId) => {
    try {
      await authPost("/blocks/unblock/", { user_id: userId });
      toast$1.success("✅ Kullanıcı engeli kaldırıldı!");
      fetchBlockedUsers();
    } catch (err) {
      toast$1.error("Engel kaldırılamadı.");
    }
  }, "unblockUser");
  const fetchFriendRequests = /* @__PURE__ */ __name(async () => {
    try {
      const response = await authGet("/friends/requests/");
      setFriendRequests(response.data?.pending || []);
      setFriends(response.data?.friends || []);
    } catch (err) {
      console.error("Friend requests fetch failed:", err);
      setFriendRequests([]);
      setFriends([]);
    }
  }, "fetchFriendRequests");
  const respondToFriendRequest = /* @__PURE__ */ __name(async (requestId, action) => {
    try {
      await authPost(`/friends/respond/${requestId}/`, { action });
      toast$1.success(action === "accept" ? "✅ Arkadaş eklendi!" : "❌ İstek reddedildi.");
      fetchFriendRequests();
    } catch (err) {
      toast$1.error("İşlem başarısız.");
    }
  }, "respondToFriendRequest");
  const removeFriend = /* @__PURE__ */ __name(async (friendshipId) => {
    if (!await confirmDialog("Arkadaşı kaldırmak istediğinize emin misiniz?")) return;
    try {
      await authDelete(`/friends/remove/${friendshipId}/`);
      toast$1.success("Arkadaş kaldırıldı.");
      fetchFriendRequests();
    } catch (err) {
      toast$1.error("Arkadaş kaldırılamadı.");
    }
  }, "removeFriend");
  return {
    loading,
    blockedUsers,
    friendRequests,
    friends,
    fetchBlockedUsers,
    unblockUser,
    fetchFriendRequests,
    respondToFriendRequest,
    removeFriend
  };
}, "useProfileSocial");
const avatarCache = {
  data: null,
  timestamp: 0,
  maxAge: 60 * 60 * 1e3,
  isValid() {
    return this.data && Date.now() - this.timestamp < this.maxAge;
  }
};
const useProfileForm = /* @__PURE__ */ __name(({ user, onUpdate }) => {
  const [loading, setLoading] = reactExports.useState({});
  const [formData, setFormData] = reactExports.useState({
    username: user?.username || "",
    email: user?.email || "",
    status_message: user?.status_message || "",
    avatar_url: user?.avatar_url || user?.avatar || "",
    steam_id: user?.steam_id || "",
    spotify_username: user?.spotify_username || "",
    instagram_username: user?.instagram_username || "",
    x_username: user?.x_username || "",
    xbox_gamertag: user?.xbox_gamertag || ""
  });
  const [defaultAvatars, setDefaultAvatars] = reactExports.useState([]);
  const [phoneNumber, setPhoneNumber] = reactExports.useState(user?.phone_number || "");
  const [showCropper, setShowCropper] = reactExports.useState(false);
  const [tempImageFile, setTempImageFile] = reactExports.useState(null);
  const fileInputRef = reactExports.useRef(null);
  const resetFormData = /* @__PURE__ */ __name((u) => setFormData({
    username: u?.username || "",
    email: u?.email || "",
    status_message: u?.status_message || "",
    avatar_url: u?.avatar_url || u?.avatar || "",
    steam_id: u?.steam_id || "",
    spotify_username: u?.spotify_username || "",
    instagram_username: u?.instagram_username || "",
    x_username: u?.x_username || "",
    xbox_gamertag: u?.xbox_gamertag || ""
  }), "resetFormData");
  const fetchDefaultAvatars = /* @__PURE__ */ __name(async () => {
    try {
      if (avatarCache.isValid()) {
        setDefaultAvatars(avatarCache.data);
        return;
      }
      const response = await authGet("/api/users/default_avatars/");
      const BASE = API_URL.replace("/api", "");
      const avatars = Array.isArray(response.data) ? response.data.map((item) => {
        if (typeof item === "string") {
          const filename = item.split("/").pop();
          const name = filename.split(".")[0].replace("_100x100", "");
          const fullUrl = item.startsWith("/api/") ? `${BASE}${item}` : item;
          return { url: fullUrl, thumbnailUrl: fullUrl, name, filename };
        } else {
          const buildUrl = /* @__PURE__ */ __name((path) => path ? path.startsWith("/api/") ? `${BASE}${path}` : path : null, "buildUrl");
          return {
            url: buildUrl(item.original),
            thumbnailUrl: buildUrl(item.thumbnail) || buildUrl(item.original),
            name: item.name,
            filename: item.original ? item.original.split("/").pop() : "avatar.webp"
          };
        }
      }).filter((a) => a.url) : [];
      avatarCache.data = avatars;
      avatarCache.timestamp = Date.now();
      setDefaultAvatars(avatars);
    } catch (err) {
      console.error("Default avatars fetch failed:", err);
      setDefaultAvatars([]);
    }
  }, "fetchDefaultAvatars");
  const selectDefaultAvatar = /* @__PURE__ */ __name(async (avatar) => {
    try {
      setLoading((l) => ({ ...l, avatar: true }));
      const response = await authPost("/api/users/update_profile/", { avatar_url: avatar.url });
      setFormData((f) => ({ ...f, avatar_url: avatar.url }));
      toast$1.success(`✅ Avatar değiştirildi: ${avatar.name}`);
      if (onUpdate) onUpdate(response.data);
    } catch (err) {
      toast$1.error("❌ Avatar değiştirilemedi.");
    } finally {
      setLoading((l) => ({ ...l, avatar: false }));
    }
  }, "selectDefaultAvatar");
  const handlePhoneUpdate = /* @__PURE__ */ __name(async () => {
    try {
      setLoading((l) => ({ ...l, phoneUpdate: true }));
      await authPost("/api/users/update_phone/", { phone_number: phoneNumber });
      toast$1.success("✅ Telefon numarası güncellendi!");
    } catch (err) {
      toast$1.error("Telefon numarası güncellenemedi.");
    } finally {
      setLoading((l) => ({ ...l, phoneUpdate: false }));
    }
  }, "handlePhoneUpdate");
  const handleInputChange = /* @__PURE__ */ __name((e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  }, "handleInputChange");
  const handleAvatarUpload = /* @__PURE__ */ __name((e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast$1.error("Avatar 5MB'dan küçük olmalıdır!");
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast$1.error("Lütfen bir resim dosyası seçin!");
      return;
    }
    setTempImageFile(file);
    setShowCropper(true);
  }, "handleAvatarUpload");
  const handleCropComplete = /* @__PURE__ */ __name(async (croppedFile) => {
    try {
      const fd = new FormData();
      fd.append("avatar", croppedFile);
      setLoading((l) => ({ ...l, avatar: true }));
      const response = await axios.post(`${API_URL}/api/users/update_profile/`, fd, {
        headers: { ...authHeaders(), "Content-Type": "multipart/form-data" }
      });
      const avatarUrl = response.data.avatar || response.data.avatar_url;
      setFormData((f) => ({ ...f, avatar_url: avatarUrl }));
      setShowCropper(false);
      setTempImageFile(null);
      toast$1.success("✅ Avatar güncellendi!");
      if (onUpdate) onUpdate({ ...response.data, avatar_url: avatarUrl });
    } catch (err) {
      toast$1.error("Avatar yüklenemedi: " + (err.response?.data?.error || "Bilinmeyen hata"));
    } finally {
      setLoading((l) => ({ ...l, avatar: false }));
    }
  }, "handleCropComplete");
  const handleSaveProfile = /* @__PURE__ */ __name(async () => {
    try {
      setLoading((l) => ({ ...l, saveProfile: true }));
      const response = await authPost("/api/users/update_profile/", formData);
      toast$1.success("✅ Profil kaydedildi!");
      if (onUpdate) onUpdate(response.data);
    } catch (err) {
      toast$1.error("Profil kaydedilemedi: " + (err.response?.data?.error || "Bilinmeyen hata"));
    } finally {
      setLoading((l) => ({ ...l, saveProfile: false }));
    }
  }, "handleSaveProfile");
  return {
    loading,
    formData,
    defaultAvatars,
    phoneNumber,
    showCropper,
    tempImageFile,
    fileInputRef,
    setPhoneNumber,
    setShowCropper,
    setTempImageFile,
    resetFormData,
    fetchDefaultAvatars,
    selectDefaultAvatar,
    handlePhoneUpdate,
    handleInputChange,
    handleAvatarUpload,
    handleCropComplete,
    handleSaveProfile
  };
}, "useProfileForm");
const useProfileSettings = /* @__PURE__ */ __name(() => {
  const [themes, setThemes] = reactExports.useState([{ id: "dark", name: "Dark" }, { id: "light", name: "Light" }]);
  const [currentTheme, setCurrentTheme] = reactExports.useState("dark");
  const [notificationSettings, setNotificationSettings] = reactExports.useState({
    mentions: true,
    direct_messages: true,
    server_updates: true,
    friend_requests: true,
    sound_enabled: true,
    desktop_notifications: true
  });
  const [soundSettings, setSoundSettings] = reactExports.useState({
    message_sound: true,
    call_sound: true,
    notification_sound: true,
    voice_join_sound: true,
    voice_leave_sound: true,
    master_volume: 100,
    voice_volume: 100,
    notification_volume: 80,
    mic_volume: 100,
    input_sensitivity: 50,
    noise_suppression: true
  });
  const [language, setLanguage] = reactExports.useState("tr");
  const [availableLanguages, setAvailableLanguages] = reactExports.useState([
    { code: "tr", name: "Türkçe" },
    { code: "en", name: "English" }
  ]);
  const [customStatus, setCustomStatus] = reactExports.useState({
    status: "online",
    emoji: "",
    text: "",
    expires_at: null
  });
  const fetchThemes = /* @__PURE__ */ __name(async () => {
    try {
      const response = await authGet("/themes/list/");
      setThemes(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Themes fetch failed:", err);
      setThemes([{ id: "dark", name: "Dark" }, { id: "light", name: "Light" }]);
    }
  }, "fetchThemes");
  const applyTheme = /* @__PURE__ */ __name(async (themeName) => {
    try {
      await authPost("/api/users/update_profile/", { theme: themeName });
      setCurrentTheme(themeName);
      toast$1.success(`🎨 Tema "${themeName}" uygulandı!`);
    } catch (err) {
      toast$1.error("Tema uygulanamadı.");
    }
  }, "applyTheme");
  const handleNotificationSettingsUpdate = /* @__PURE__ */ __name(async (setting, value) => {
    try {
      const newSettings = { ...notificationSettings, [setting]: value };
      setNotificationSettings(newSettings);
      await authPost("/api/users/update_profile/", { notification_settings: newSettings });
      toast$1.success("✅ Bildirim ayarları güncellendi!");
    } catch (err) {
      toast$1.error("Bildirim ayarları güncellenemedi.");
    }
  }, "handleNotificationSettingsUpdate");
  const handleSoundSettingsUpdate = /* @__PURE__ */ __name(async (setting, value) => {
    try {
      const newSettings = { ...soundSettings, [setting]: value };
      setSoundSettings(newSettings);
      await authPost("/api/users/update_profile/", { sound_settings: newSettings });
      toast$1.success("✅ Ses ayarları güncellendi!");
    } catch (err) {
      toast$1.error("Ses ayarları güncellenemedi.");
    }
  }, "handleSoundSettingsUpdate");
  const fetchLanguages = /* @__PURE__ */ __name(async () => {
    try {
      const response = await authGet("/translation/languages/");
      setAvailableLanguages(Array.isArray(response.data) ? response.data : [
        { code: "tr", name: "Türkçe" },
        { code: "en", name: "English" }
      ]);
    } catch (err) {
      console.error("Languages fetch failed:", err);
      setAvailableLanguages([{ code: "tr", name: "Türkçe" }, { code: "en", name: "English" }]);
    }
  }, "fetchLanguages");
  const updateLanguage = /* @__PURE__ */ __name(async (newLanguage) => {
    try {
      await authPost("/api/users/update_profile/", { language: newLanguage });
      setLanguage(newLanguage);
      toast$1.success("🌍 Dil değiştirildi!");
    } catch (err) {
      toast$1.error("Dil değiştirilemedi.");
    }
  }, "updateLanguage");
  const updateCustomStatus = /* @__PURE__ */ __name(async () => {
    try {
      await authPost("/api/users/update_status/", customStatus);
      toast$1.success("✅ Durum güncellendi!");
    } catch (err) {
      toast$1.error("Durum güncellenemedi: " + (err.response?.data?.error || "Hata"));
    }
  }, "updateCustomStatus");
  return {
    themes,
    currentTheme,
    notificationSettings,
    soundSettings,
    language,
    availableLanguages,
    customStatus,
    setCustomStatus,
    fetchThemes,
    applyTheme,
    handleNotificationSettingsUpdate,
    handleSoundSettingsUpdate,
    fetchLanguages,
    updateLanguage,
    updateCustomStatus
  };
}, "useProfileSettings");
const useProfileData = /* @__PURE__ */ __name(({ user }) => {
  const [badges, setBadges] = reactExports.useState([]);
  const [achievements, setAchievements] = reactExports.useState([]);
  const [userStats, setUserStats] = reactExports.useState({
    level: 1,
    xp: 0,
    next_level_xp: 100,
    total_messages: 0,
    coins: 0
  });
  const [premiumStatus, setPremiumStatus] = reactExports.useState(null);
  const [storeBalance, setStoreBalance] = reactExports.useState(0);
  const [userActivity, setUserActivity] = reactExports.useState([]);
  const [drafts, setDrafts] = reactExports.useState([]);
  const [bookmarks, setBookmarks] = reactExports.useState([]);
  const [gdprExports, setGdprExports] = reactExports.useState([]);
  const [exportRequested, setExportRequested] = reactExports.useState(false);
  const fetchBadges = /* @__PURE__ */ __name(async () => {
    try {
      const response = await authGet("/api/user/badges/");
      setBadges(response.data || []);
    } catch (err) {
      console.error("Badges fetch failed:", err);
      setBadges([]);
    }
  }, "fetchBadges");
  const fetchAchievements = /* @__PURE__ */ __name(async () => {
    try {
      const response = await authGet("/api/user/achievements/");
      setAchievements(response.data || []);
    } catch (err) {
      console.error("Achievements fetch failed:", err);
      setAchievements([]);
    }
  }, "fetchAchievements");
  const calculateXPProgress = /* @__PURE__ */ __name(() => {
    const { xp, next_level_xp } = userStats;
    return Math.min(xp / next_level_xp * 100, 100);
  }, "calculateXPProgress");
  const fetchPremiumStatus = /* @__PURE__ */ __name(async () => {
    try {
      const response = await authGet("/api/premium/status/");
      setPremiumStatus(response.data);
    } catch (err) {
      console.error("Premium status fetch failed:", err);
    }
  }, "fetchPremiumStatus");
  const fetchStoreBalance = /* @__PURE__ */ __name(async () => {
    try {
      const response = await authGet("/api/store/balance/");
      setStoreBalance(response.data?.balance || 0);
    } catch (err) {
      console.error("Store balance fetch failed:", err);
    }
  }, "fetchStoreBalance");
  const fetchUserActivity = /* @__PURE__ */ __name(async () => {
    try {
      const response = await authGet(`/activity/${user.username}/`);
      setUserActivity(response.data || []);
    } catch (err) {
      console.error("User activity fetch failed:", err);
      setUserActivity([]);
    }
  }, "fetchUserActivity");
  const fetchDrafts = /* @__PURE__ */ __name(async () => {
    try {
      const response = await authGet("/api/drafts/list/");
      setDrafts(response.data || []);
    } catch (err) {
      console.error("Drafts fetch failed:", err);
      setDrafts([]);
    }
  }, "fetchDrafts");
  const deleteDraft = /* @__PURE__ */ __name(async (draftKey) => {
    try {
      await authDelete(`/api/drafts/${draftKey}/`);
      toast$1.success("Taslak silindi.");
      fetchDrafts();
    } catch (err) {
      toast$1.error("Taslak silinemedi.");
    }
  }, "deleteDraft");
  const requestGDPRExport = /* @__PURE__ */ __name(async () => {
    try {
      setExportRequested(true);
      const response = await authPost("/gdpr/request/");
      toast$1.success("✅ GDPR dışa aktarma talebi oluşturuldu!");
      setGdprExports((prev) => [response.data, ...prev]);
    } catch (err) {
      toast$1.error("GDPR talebi oluşturulamadı: " + (err.response?.data?.error || "Hata"));
    } finally {
      setExportRequested(false);
    }
  }, "requestGDPRExport");
  const fetchGDPRExports = /* @__PURE__ */ __name(async () => {
    setGdprExports([]);
  }, "fetchGDPRExports");
  return {
    badges,
    achievements,
    userStats,
    premiumStatus,
    storeBalance,
    userActivity,
    drafts,
    bookmarks,
    gdprExports,
    exportRequested,
    fetchBadges,
    fetchAchievements,
    calculateXPProgress,
    fetchPremiumStatus,
    fetchStoreBalance,
    fetchUserActivity,
    fetchDrafts,
    deleteDraft,
    requestGDPRExport,
    fetchGDPRExports
  };
}, "useProfileData");
const useProfileAdvanced = /* @__PURE__ */ __name(({ user }) => {
  const [richPresence, setRichPresence] = reactExports.useState(null);
  const [endorsements, setEndorsements] = reactExports.useState([]);
  const [inventory, setInventory] = reactExports.useState([]);
  const [equippedItems, setEquippedItems] = reactExports.useState([]);
  const [nicknameHistory, setNicknameHistory] = reactExports.useState([]);
  const [serverOrder, setServerOrder] = reactExports.useState([]);
  const [oauthApps, setOauthApps] = reactExports.useState([]);
  const [webhooks, setWebhooks] = reactExports.useState([]);
  const [botAccounts, setBotAccounts] = reactExports.useState([]);
  const fetchRichPresence = /* @__PURE__ */ __name(async () => {
    try {
      const response = await authGet(`/api/users/rich_presence/${user.username}/`);
      setRichPresence(response.data);
    } catch (err) {
    }
  }, "fetchRichPresence");
  const fetchEndorsements = /* @__PURE__ */ __name(async () => {
    try {
      const response = await authGet(`/api/users/${user.username}/endorsements/`);
      const data = response.data?.endorsements || response.data || [];
      setEndorsements(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Endorsements fetch failed:", err);
      setEndorsements([]);
    }
  }, "fetchEndorsements");
  const fetchInventory = /* @__PURE__ */ __name(async () => {
    try {
      const response = await authGet("/api/store/inventory/");
      setInventory(response.data || []);
      setEquippedItems(response.data?.filter((item) => item.is_equipped) || []);
    } catch (err) {
      setInventory([]);
      setEquippedItems([]);
    }
  }, "fetchInventory");
  const equipItem = /* @__PURE__ */ __name(async (inventoryId) => {
    try {
      await authPost(`/api/store/equip/${inventoryId}/`);
      toast$1.success("✅ Item equipped!");
      fetchInventory();
    } catch (err) {
      toast$1.error("❌ Failed to equip item");
    }
  }, "equipItem");
  const unequipItem = /* @__PURE__ */ __name(async (inventoryId) => {
    try {
      await authPost(`/api/store/unequip/${inventoryId}/`);
      toast$1.success("✅ Item unequipped!");
      fetchInventory();
    } catch (err) {
      toast$1.error("❌ Failed to unequip item");
    }
  }, "unequipItem");
  const fetchNicknameHistory = /* @__PURE__ */ __name(async () => {
    try {
      const response = await authGet(`/api/users/${user.username}/nicknames/history/`);
      setNicknameHistory(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Nickname history fetch failed:", err);
      setNicknameHistory([]);
    }
  }, "fetchNicknameHistory");
  const fetchServerOrder = /* @__PURE__ */ __name(async () => {
    try {
      const response = await authGet("/api/user/server-order/");
      setServerOrder(response.data || []);
    } catch (err) {
    }
  }, "fetchServerOrder");
  const fetchOAuthApps = /* @__PURE__ */ __name(async () => {
    try {
      const response = await authGet("/oauth/apps/list/");
      setOauthApps(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("OAuth apps fetch failed:", err);
      setOauthApps([]);
    }
  }, "fetchOAuthApps");
  const fetchWebhooks = /* @__PURE__ */ __name(async () => {
    try {
      const response = await authGet("/webhooks/list/");
      setWebhooks(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setWebhooks([]);
    }
  }, "fetchWebhooks");
  const fetchBotAccounts = /* @__PURE__ */ __name(async () => {
    try {
      const response = await authGet("/bots/list/");
      setBotAccounts(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setBotAccounts([]);
    }
  }, "fetchBotAccounts");
  return {
    richPresence,
    endorsements,
    inventory,
    equippedItems,
    nicknameHistory,
    serverOrder,
    oauthApps,
    webhooks,
    botAccounts,
    fetchRichPresence,
    fetchEndorsements,
    fetchInventory,
    equipItem,
    unequipItem,
    fetchNicknameHistory,
    fetchServerOrder,
    fetchOAuthApps,
    fetchWebhooks,
    fetchBotAccounts
  };
}, "useProfileAdvanced");
const useProfileAPI = /* @__PURE__ */ __name(({ user, isOwnProfile, onUpdate }) => {
  const security = useProfileSecurity();
  const social = useProfileSocial();
  const form = useProfileForm({ user, onUpdate });
  const settings = useProfileSettings();
  const data = useProfileData({ user });
  const advanced = useProfileAdvanced({ user });
  const lastFetchedUserRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const userId = user?.id || user?.username;
    if (!user || lastFetchedUserRef.current === userId) return;
    lastFetchedUserRef.current = userId;
    form.resetFormData(user);
    security.setEmailVerified(user?.is_active || false);
    if (isOwnProfile) {
      Promise.all([
        data.fetchBadges(),
        data.fetchPremiumStatus(),
        data.fetchStoreBalance(),
        security.check2FAStatus(),
        form.fetchDefaultAvatars(),
        security.checkPasswordStatus()
      ]).catch((err) => console.error("Initial fetch error:", err));
    } else {
      form.fetchDefaultAvatars();
    }
  }, [user?.id, user?.username, isOwnProfile]);
  const fetchDataForCategory = /* @__PURE__ */ __name(async (activeCategory) => {
    if (!isOwnProfile) return;
    switch (activeCategory) {
      case "account":
        break;
      case "security":
        await Promise.all([security.fetchSessions(), security.fetchEmailVerificationStatus()]);
        break;
      case "privacy":
        await Promise.all([social.fetchBlockedUsers(), social.fetchFriendRequests()]);
        break;
      case "advanced":
        await Promise.all([data.fetchGDPRExports(), advanced.fetchOAuthApps(), advanced.fetchWebhooks(), advanced.fetchBotAccounts()]);
        break;
      case "social":
        await Promise.all([advanced.fetchRichPresence(), advanced.fetchEndorsements()]);
        break;
      case "customization":
        await Promise.all([settings.fetchThemes(), advanced.fetchInventory(), advanced.fetchNicknameHistory(), advanced.fetchServerOrder()]);
        break;
      case "notifications":
        break;
      case "language":
        await settings.fetchLanguages();
        break;
    }
  }, "fetchDataForCategory");
  return {
    // Merge loading from all sub-hooks
    loading: { ...security.loading, ...social.loading, ...form.loading },
    // Security
    twoFactorData: security.twoFactorData,
    twoFactorEnabled: security.twoFactorEnabled,
    backupCodes: security.backupCodes,
    verificationCode: security.verificationCode,
    sessions: security.sessions,
    emailVerified: security.emailVerified,
    passwordData: security.passwordData,
    hasPassword: security.hasPassword,
    setVerificationCode: security.setVerificationCode,
    setPasswordData: security.setPasswordData,
    check2FAStatus: security.check2FAStatus,
    enable2FA: security.enable2FA,
    verify2FASetup: security.verify2FASetup,
    disable2FA: security.disable2FA,
    checkPasswordStatus: security.checkPasswordStatus,
    handlePasswordChange: security.handlePasswordChange,
    fetchEmailVerificationStatus: security.fetchEmailVerificationStatus,
    resendVerificationEmail: security.resendVerificationEmail,
    fetchSessions: security.fetchSessions,
    revokeSession: security.revokeSession,
    revokeAllSessions: security.revokeAllSessions,
    // Social
    blockedUsers: social.blockedUsers,
    friendRequests: social.friendRequests,
    friends: social.friends,
    fetchBlockedUsers: social.fetchBlockedUsers,
    unblockUser: social.unblockUser,
    fetchFriendRequests: social.fetchFriendRequests,
    respondToFriendRequest: social.respondToFriendRequest,
    removeFriend: social.removeFriend,
    // Form
    formData: form.formData,
    defaultAvatars: form.defaultAvatars,
    phoneNumber: form.phoneNumber,
    showCropper: form.showCropper,
    tempImageFile: form.tempImageFile,
    fileInputRef: form.fileInputRef,
    setPhoneNumber: form.setPhoneNumber,
    setShowCropper: form.setShowCropper,
    setTempImageFile: form.setTempImageFile,
    fetchDefaultAvatars: form.fetchDefaultAvatars,
    selectDefaultAvatar: form.selectDefaultAvatar,
    handlePhoneUpdate: form.handlePhoneUpdate,
    handleInputChange: form.handleInputChange,
    handleAvatarUpload: form.handleAvatarUpload,
    handleCropComplete: form.handleCropComplete,
    handleSaveProfile: form.handleSaveProfile,
    // Settings
    themes: settings.themes,
    currentTheme: settings.currentTheme,
    notificationSettings: settings.notificationSettings,
    soundSettings: settings.soundSettings,
    language: settings.language,
    availableLanguages: settings.availableLanguages,
    customStatus: settings.customStatus,
    setCustomStatus: settings.setCustomStatus,
    fetchThemes: settings.fetchThemes,
    applyTheme: settings.applyTheme,
    handleNotificationSettingsUpdate: settings.handleNotificationSettingsUpdate,
    handleSoundSettingsUpdate: settings.handleSoundSettingsUpdate,
    fetchLanguages: settings.fetchLanguages,
    updateLanguage: settings.updateLanguage,
    updateCustomStatus: settings.updateCustomStatus,
    // Data
    badges: data.badges,
    achievements: data.achievements,
    userStats: data.userStats,
    premiumStatus: data.premiumStatus,
    storeBalance: data.storeBalance,
    userActivity: data.userActivity,
    drafts: data.drafts,
    bookmarks: data.bookmarks,
    gdprExports: data.gdprExports,
    exportRequested: data.exportRequested,
    fetchBadges: data.fetchBadges,
    fetchAchievements: data.fetchAchievements,
    calculateXPProgress: data.calculateXPProgress,
    fetchPremiumStatus: data.fetchPremiumStatus,
    fetchStoreBalance: data.fetchStoreBalance,
    fetchUserActivity: data.fetchUserActivity,
    fetchDrafts: data.fetchDrafts,
    deleteDraft: data.deleteDraft,
    requestGDPRExport: data.requestGDPRExport,
    fetchGDPRExports: data.fetchGDPRExports,
    // Advanced
    richPresence: advanced.richPresence,
    endorsements: advanced.endorsements,
    inventory: advanced.inventory,
    equippedItems: advanced.equippedItems,
    nicknameHistory: advanced.nicknameHistory,
    serverOrder: advanced.serverOrder,
    oauthApps: advanced.oauthApps,
    webhooks: advanced.webhooks,
    botAccounts: advanced.botAccounts,
    fetchRichPresence: advanced.fetchRichPresence,
    fetchEndorsements: advanced.fetchEndorsements,
    fetchInventory: advanced.fetchInventory,
    equipItem: advanced.equipItem,
    unequipItem: advanced.unequipItem,
    fetchNicknameHistory: advanced.fetchNicknameHistory,
    fetchServerOrder: advanced.fetchServerOrder,
    fetchOAuthApps: advanced.fetchOAuthApps,
    fetchWebhooks: advanced.fetchWebhooks,
    fetchBotAccounts: advanced.fetchBotAccounts,
    fetchDataForCategory
  };
}, "useProfileAPI");
const BASE_URL$1 = ABSOLUTE_HOST_URL;
const ProfileHeader = /* @__PURE__ */ __name(({ formData, premiumStatus, badges, userStats, customStatus, friends, onClose, styles: styles2 }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "profile-header-banner", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "profile-header-content", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "profile-avatar-wrapper", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: formData?.avatar_url && typeof formData.avatar_url === "string" ? (formData.avatar_url.startsWith("http") ? formData.avatar_url : `${BASE_URL$1}${formData.avatar_url}`) + `?t=${Date.now()}` : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"%3E%3Crect fill="%235865f2" width="120" height="120" rx="60"/%3E%3Ctext x="60" y="60" font-size="50" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E',
          alt: formData?.username || "User",
          className: "profile-avatar-large",
          onError: /* @__PURE__ */ __name((e) => {
            if (!e.target.dataset.errorHandled) {
              e.target.dataset.errorHandled = "true";
              console.error("❌ [Avatar Load Error]", e.target.src);
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"%3E%3Crect fill="%235865f2" width="120" height="120" rx="60"/%3E%3Ctext x="60" y="60" font-size="50" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E';
            }
          }, "onError")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `profile-status-indicator ${customStatus?.status || "online"}` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "profile-header-info", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "profile-username", children: [
        formData?.username || "User",
        premiumStatus?.is_premium && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "profile-badge", children: "💎" }),
        Array.isArray(badges) && badges.includes("verified") && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "profile-badge", children: "✅" }),
        Array.isArray(badges) && badges.includes("developer") && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "profile-badge", children: "👨‍💻" })
      ] }),
      formData?.status_message && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "profile-status-message", children: [
        '"',
        formData.status_message,
        '"'
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "profile-stats-bar", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "profile-stat-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "profile-stat-icon", children: "⭐" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "profile-stat-value", children: [
            "Level ",
            userStats?.level || 1
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "profile-stat-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "profile-stat-icon", children: "🏆" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "profile-stat-value", children: userStats?.xp || 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "profile-stat-label", children: "XP" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "profile-stat-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "profile-stat-icon", children: "🪙" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "profile-stat-value", children: userStats?.coins || 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "profile-stat-label", children: "Coins" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "profile-stat-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "profile-stat-icon", children: "👥" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "profile-stat-value", children: Array.isArray(friends) ? friends.length : 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "profile-stat-label", children: "Arkadaş" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: {
      ...styles2.closeBtn,
      position: "absolute",
      top: "16px",
      right: "16px",
      background: "rgba(0, 0, 0, 0.5)",
      border: "2px solid rgba(255, 255, 255, 0.2)",
      width: "40px",
      height: "40px"
    }, onClick: onClose, children: "×" })
  ] }) });
}, "ProfileHeader");
const ProfileSidebar = /* @__PURE__ */ __name(({ activeTab, setActiveTab, setActiveCategory, isOwnProfile, onLogout, setShowLogoutModal }) => {
  const styles$1 = styles;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.sidebar, className: "user-profile-sidebar", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.sidebarSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.sidebarHeader, children: "👤 Hesabım" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "sidebar-btn",
          style: styles$1.sidebarBtn(activeTab === "profile"),
          onClick: /* @__PURE__ */ __name(() => {
            setActiveTab("profile");
            setActiveCategory("account");
          }, "onClick"),
          children: "Profil"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "sidebar-btn",
          style: styles$1.sidebarBtn(activeTab === "badges"),
          onClick: /* @__PURE__ */ __name(() => {
            setActiveTab("badges");
            setActiveCategory("account");
          }, "onClick"),
          children: "Rozetler & XP"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "sidebar-btn",
          style: styles$1.sidebarBtn(activeTab === "inventory"),
          onClick: /* @__PURE__ */ __name(() => {
            setActiveTab("inventory");
            setActiveCategory("account");
          }, "onClick"),
          children: "Envanter"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "sidebar-btn",
          style: styles$1.sidebarBtn(activeTab === "endorsements"),
          onClick: /* @__PURE__ */ __name(() => {
            setActiveTab("endorsements");
            setActiveCategory("account");
          }, "onClick"),
          children: "Onaylar"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.sidebarSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.sidebarHeader, children: "🔐 Gizlilik & Güvenlik" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "sidebar-btn",
          style: styles$1.sidebarBtn(activeTab === "security"),
          onClick: /* @__PURE__ */ __name(() => {
            setActiveTab("security");
            setActiveCategory("security");
          }, "onClick"),
          children: "Güvenlik"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "sidebar-btn",
          style: styles$1.sidebarBtn(activeTab === "privacy"),
          onClick: /* @__PURE__ */ __name(() => {
            setActiveTab("privacy");
            setActiveCategory("security");
          }, "onClick"),
          children: "Gizlilik"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "sidebar-btn",
          style: styles$1.sidebarBtn(activeTab === "gdpr"),
          onClick: /* @__PURE__ */ __name(() => {
            setActiveTab("gdpr");
            setActiveCategory("security");
          }, "onClick"),
          children: "GDPR"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.sidebarSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.sidebarHeader, children: "👥 Sosyal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "sidebar-btn",
          style: styles$1.sidebarBtn(activeTab === "friends"),
          onClick: /* @__PURE__ */ __name(() => {
            setActiveTab("friends");
            setActiveCategory("social");
          }, "onClick"),
          children: "Arkadaşlar"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "sidebar-btn",
          style: styles$1.sidebarBtn(activeTab === "activity"),
          onClick: /* @__PURE__ */ __name(() => {
            setActiveTab("activity");
            setActiveCategory("social");
          }, "onClick"),
          children: "Aktivite"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "sidebar-btn",
          style: styles$1.sidebarBtn(activeTab === "status"),
          onClick: /* @__PURE__ */ __name(() => {
            setActiveTab("status");
            setActiveCategory("social");
          }, "onClick"),
          children: "Özel Durum"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.sidebarSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.sidebarHeader, children: "🎨 Görünüm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "sidebar-btn",
          style: styles$1.sidebarBtn(activeTab === "appearance"),
          onClick: /* @__PURE__ */ __name(() => {
            setActiveTab("appearance");
            setActiveCategory("appearance");
          }, "onClick"),
          children: "Tema"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "sidebar-btn",
          style: styles$1.sidebarBtn(activeTab === "sounds"),
          onClick: /* @__PURE__ */ __name(() => {
            setActiveTab("sounds");
            setActiveCategory("appearance");
          }, "onClick"),
          children: "Sesler"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "sidebar-btn",
          style: styles$1.sidebarBtn(activeTab === "notifications"),
          onClick: /* @__PURE__ */ __name(() => {
            setActiveTab("notifications");
            setActiveCategory("appearance");
          }, "onClick"),
          children: "Bildirimler"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.sidebarSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.sidebarHeader, children: "📱 Uygulama" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "sidebar-btn",
          style: styles$1.sidebarBtn(activeTab === "drafts"),
          onClick: /* @__PURE__ */ __name(() => {
            setActiveTab("drafts");
            setActiveCategory("app");
          }, "onClick"),
          children: "Taslaklar"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "sidebar-btn",
          style: styles$1.sidebarBtn(activeTab === "bookmarks"),
          onClick: /* @__PURE__ */ __name(() => {
            setActiveTab("bookmarks");
            setActiveCategory("app");
          }, "onClick"),
          children: "Yer İmleri"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "sidebar-btn",
          style: styles$1.sidebarBtn(activeTab === "history"),
          onClick: /* @__PURE__ */ __name(() => {
            setActiveTab("history");
            setActiveCategory("app");
          }, "onClick"),
          children: "Geçmiş"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.sidebarSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.sidebarHeader, children: "🔧 Gelişmiş" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "sidebar-btn",
          style: styles$1.sidebarBtn(activeTab === "premium"),
          onClick: /* @__PURE__ */ __name(() => {
            setActiveTab("premium");
            setActiveCategory("advanced");
          }, "onClick"),
          children: "Premium"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "sidebar-btn",
          style: styles$1.sidebarBtn(activeTab === "developer"),
          onClick: /* @__PURE__ */ __name(() => {
            setActiveTab("developer");
            setActiveCategory("advanced");
          }, "onClick"),
          children: "Geliştirici"
        }
      )
    ] }),
    isOwnProfile && onLogout && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles$1.sidebarSection, borderTop: "1px solid #40444b", marginTop: "16px", paddingTop: "16px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: "sidebar-btn logout-btn",
        style: {
          ...styles$1.sidebarBtn(false),
          background: "transparent",
          color: "#f04747",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          justifyContent: "flex-start",
          padding: "10px 12px",
          width: "100%",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "background 0.2s"
        },
        onClick: /* @__PURE__ */ __name(() => setShowLogoutModal(true), "onClick"),
        onMouseEnter: /* @__PURE__ */ __name((e) => e.currentTarget.style.background = "rgba(240, 71, 71, 0.1)", "onMouseEnter"),
        onMouseLeave: /* @__PURE__ */ __name((e) => e.currentTarget.style.background = "transparent", "onMouseLeave"),
        children: "🚪 Çıkış Yap"
      }
    ) })
  ] });
}, "ProfileSidebar");
const BASE_URL = ABSOLUTE_HOST_URL;
const ProfileTab = /* @__PURE__ */ __name(({
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
  setPhoneNumber
}) => {
  const styles$1 = styles;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "profile-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "profile-card-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "profile-card-title", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "profile-card-icon", children: "👤" }),
        "Profil Bilgileri"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.avatarSection, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: formData.avatar_url && typeof formData.avatar_url === "string" ? (formData.avatar_url.startsWith("http") ? formData.avatar_url : `${BASE_URL}${formData.avatar_url}`) + `?t=${Date.now()}` : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%235865f2" width="100" height="100"/%3E%3Ctext x="50" y="50" font-size="45" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E',
            alt: "Avatar",
            style: styles$1.avatar,
            onError: /* @__PURE__ */ __name((e) => {
              if (!e.target.dataset.errorHandled) {
                e.target.dataset.errorHandled = "true";
                console.error("❌ [Avatar Load Error]", e.target.src);
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%235865f2" width="100" height="100"/%3E%3Ctext x="50" y="50" font-size="45" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E';
              }
            }, "onError")
          },
          formData.avatar_url
        ),
        isOwnProfile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              style: styles$1.button("secondary"),
              onClick: /* @__PURE__ */ __name(() => fileInputRef.current?.click(), "onClick"),
              disabled: loading.avatar,
              children: loading.avatar ? "⏳ Yükleniyor..." : "📷 Avatar Değiştir"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "file",
              ref: fileInputRef,
              accept: "image/*",
              style: { display: "none" },
              onChange: handleAvatarUpload
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", fontSize: "12px", marginTop: "8px" }, children: "Max 5MB • PNG, JPG, GIF" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.inputGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles$1.label, children: "Kullanıcı Adı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            name: "username",
            value: formData.username,
            onChange: handleInputChange,
            style: styles$1.input,
            disabled: !isOwnProfile
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.inputGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles$1.label, children: "E-posta" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "12px", alignItems: "center" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "email",
              value: formData.email,
              disabled: true,
              style: { ...styles$1.input, opacity: 0.6 }
            }
          ),
          isOwnProfile && !emailVerified && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              style: styles$1.button("secondary"),
              onClick: resendVerificationEmail,
              disabled: loading.resendEmail,
              children: loading.resendEmail ? "⏳" : "✉️ Doğrula"
            }
          ),
          emailVerified && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#43b581", fontSize: "20px" }, children: "✅" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.inputGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles$1.label, children: "Durum Mesajı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            name: "status_message",
            value: formData.status_message,
            onChange: handleInputChange,
            placeholder: "Bugün nasılsın?",
            style: styles$1.input,
            disabled: !isOwnProfile
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.inputGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles$1.label, children: "📱 Telefon Numarası" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "12px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "tel",
              value: phoneNumber,
              onChange: /* @__PURE__ */ __name((e) => setPhoneNumber(e.target.value), "onChange"),
              placeholder: "+90 555 123 4567",
              style: { ...styles$1.input, flex: 1 }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              style: styles$1.button("secondary"),
              onClick: handlePhoneUpdate,
              disabled: loading.phoneUpdate,
              children: loading.phoneUpdate ? "⏳" : "💾"
            }
          )
        ] })
      ] }),
      isOwnProfile && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          style: styles$1.button("primary"),
          onClick: handleSaveProfile,
          disabled: loading.saveProfile,
          children: loading.saveProfile ? "⏳ Kaydediliyor..." : "💾 Kaydet"
        }
      )
    ] }),
    isOwnProfile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.card, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles$1.sectionTitle, children: "🎭 Hazır Avatarlar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "12px", marginTop: "16px" }, children: defaultAvatars.map((avatar, idx) => {
        const displayUrl = avatar.thumbnailUrl || avatar.url;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            title: avatar.name,
            style: {
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              overflow: "hidden",
              cursor: "pointer",
              border: formData.avatar_url === avatar.url ? "3px solid #5865f2" : "2px solid rgba(255,255,255,0.1)",
              transition: "all 0.3s",
              boxShadow: formData.avatar_url === avatar.url ? "0 0 15px rgba(88, 101, 242, 0.5)" : "none",
              backgroundColor: "#2f3136"
              // Placeholder background while loading
            },
            onClick: /* @__PURE__ */ __name(() => selectDefaultAvatar(avatar), "onClick"),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: displayUrl,
                alt: avatar.name,
                loading: "lazy",
                decoding: "async",
                style: { width: "100%", height: "100%", objectFit: "cover" },
                onError: /* @__PURE__ */ __name((e) => {
                  if (!e.target.dataset.errorHandled) {
                    e.target.dataset.errorHandled = "true";
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%235865f2" width="100" height="100"/%3E%3Ctext x="50" y="50" font-size="45" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E';
                  }
                }, "onError")
              }
            )
          },
          idx
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.card, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles$1.sectionTitle, children: "🔗 Sosyal Bağlantılar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        marginBottom: "20px",
        padding: "16px",
        background: "linear-gradient(135deg, #5865f2 0%, #7289da 100%)",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "white", margin: 0, marginBottom: "4px" }, children: "🎮 Hesaplarını Bağla" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "rgba(255,255,255,0.8)", margin: 0, fontSize: "14px" }, children: "Spotify, Steam, Epic Games, Twitch, Xbox ve daha fazlası" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => {
              window.dispatchEvent(new CustomEvent("openConnectionsPanel"));
            }, "onClick"),
            style: {
              background: "white",
              color: "#5865f2",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
              transition: "transform 0.2s"
            },
            onMouseEnter: /* @__PURE__ */ __name((e) => e.target.style.transform = "scale(1.05)", "onMouseEnter"),
            onMouseLeave: /* @__PURE__ */ __name((e) => e.target.style.transform = "scale(1)", "onMouseLeave"),
            children: "🔗 Bağlantıları Yönet"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.inputGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles$1.label, children: "🎮 Steam ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            name: "steam_id",
            value: formData.steam_id,
            onChange: handleInputChange,
            placeholder: "76561198012345678",
            style: styles$1.input
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.inputGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles$1.label, children: "🎵 Spotify Kullanıcı Adı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            name: "spotify_username",
            value: formData.spotify_username,
            onChange: handleInputChange,
            placeholder: "spotify_username",
            style: styles$1.input
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.inputGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles$1.label, children: "📸 Instagram" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            name: "instagram_username",
            value: formData.instagram_username,
            onChange: handleInputChange,
            placeholder: "@instagram",
            style: styles$1.input
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.inputGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles$1.label, children: "🐦 X (Twitter)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            name: "x_username",
            value: formData.x_username,
            onChange: handleInputChange,
            placeholder: "@x_username",
            style: styles$1.input
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.inputGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles$1.label, children: "🎮 Xbox Gamertag" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            name: "xbox_gamertag",
            value: formData.xbox_gamertag,
            onChange: handleInputChange,
            placeholder: "XboxGamerTag",
            style: styles$1.input
          }
        )
      ] })
    ] })
  ] });
}, "ProfileTab");
const SecurityTab = /* @__PURE__ */ __name(({
  backupCodes,
  disable2FA,
  enable2FA,
  handlePasswordChange,
  hasPassword,
  loading,
  passwordData,
  revokeAllSessions,
  revokeSession,
  sessions,
  setPasswordData,
  setVerificationCode,
  twoFactorData,
  twoFactorEnabled,
  user,
  verificationCode,
  verify2FASetup
}) => {
  const styles$1 = styles;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.card, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles$1.sectionTitle, children: "🔒 İki Faktörlü Kimlik Doğrulama (2FA)" }),
      !twoFactorEnabled && !twoFactorData && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", marginBottom: "16px" }, children: "Hesabınızı ekstra bir güvenlik katmanıyla koruyun. Giriş yaparken telefonunuzdaki doğrulama kodunu girmeniz istenecek." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            style: styles$1.button("primary"),
            onClick: enable2FA,
            disabled: loading.enable2fa,
            children: loading.enable2fa ? "⏳ Etkinleştiriliyor..." : "🔐 2FA Etkinleştir"
          }
        )
      ] }),
      twoFactorData && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", marginBottom: "16px" }, children: "Aşağıdaki QR kodunu Google Authenticator, Authy veya benzer bir uygulamayla tarayın:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.qrCode, children: [
          twoFactorData.qr_code ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: twoFactorData.qr_code, alt: "QR Code", style: { width: "200px", height: "200px" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(QRCodeSVG, { value: `otpauth://totp/Pawscord:${user.email}?secret=${twoFactorData.secret}&issuer=Pawscord`, size: 200 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: "#b9bbbe", fontSize: "12px", marginTop: "12px" }, children: [
            "Manuel kod: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { style: { background: "rgba(0,0,0,0.3)", padding: "4px 8px", borderRadius: "4px" }, children: twoFactorData.secret })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: "24px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles$1.label, children: "Doğrulama Kodu" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: verificationCode,
              onChange: /* @__PURE__ */ __name((e) => setVerificationCode(e.target.value), "onChange"),
              placeholder: "6 haneli kod",
              style: styles$1.input,
              maxLength: 6
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              style: { ...styles$1.button("primary"), marginTop: "12px" },
              onClick: verify2FASetup,
              disabled: loading.verify2fa || verificationCode.length !== 6,
              children: loading.verify2fa ? "⏳ Doğrulanıyor..." : "✅ Doğrula ve Etkinleştir"
            }
          )
        ] }),
        backupCodes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: "24px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", marginBottom: "12px" }, children: "🔑 Yedek Kodlar (Kaydedin!)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#faa61a", fontSize: "13px", marginBottom: "12px" }, children: "⚠️ Bu kodları güvenli bir yerde saklayın! Telefonunuza erişemezseniz kullanabilirsiniz." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.backupCodesGrid, children: backupCodes.map((code, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.backupCode, children: code }, idx)) })
        ] })
      ] }),
      twoFactorEnabled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#43b581", marginBottom: "16px" }, children: "✅ 2FA aktif! Hesabınız korunuyor." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            style: styles$1.button("danger"),
            onClick: disable2FA,
            disabled: loading.disable2fa,
            children: loading.disable2fa ? "⏳ Devre Dışı Bırakılıyor..." : "🔓 2FA Devre Dışı Bırak"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.card, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles$1.sectionTitle, children: [
        "🔑 ",
        hasPassword ? "Şifre Değiştir" : "Şifre Belirle"
      ] }),
      !hasPassword && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        background: "rgba(88, 101, 242, 0.1)",
        border: "1px solid rgba(88, 101, 242, 0.3)",
        borderRadius: "8px",
        padding: "12px 16px",
        marginBottom: "16px",
        fontSize: "14px",
        color: "#b9bbbe"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "#5865f2" }, children: "ℹ️ Bilgi:" }),
        " Google ile giriş yaptınız. Şifre belirleyerek normal giriş de yapabilirsiniz."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handlePasswordChange, children: [
        hasPassword && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.inputGroup, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles$1.label, children: "Eski Şifre" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "password",
              value: passwordData.old_password,
              onChange: /* @__PURE__ */ __name((e) => setPasswordData({ ...passwordData, old_password: e.target.value }), "onChange"),
              style: styles$1.input,
              required: hasPassword
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.inputGroup, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles$1.label, children: "Yeni Şifre" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "password",
              value: passwordData.new_password,
              onChange: /* @__PURE__ */ __name((e) => setPasswordData({ ...passwordData, new_password: e.target.value }), "onChange"),
              style: styles$1.input,
              required: true,
              minLength: 8
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.inputGroup, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles$1.label, children: "Yeni Şifre (Tekrar)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "password",
              value: passwordData.confirm_password,
              onChange: /* @__PURE__ */ __name((e) => setPasswordData({ ...passwordData, confirm_password: e.target.value }), "onChange"),
              style: styles$1.input,
              required: true,
              minLength: 8
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            style: styles$1.button("primary"),
            disabled: loading.changePassword,
            children: loading.changePassword ? "⏳ Kaydediliyor..." : hasPassword ? "🔐 Şifreyi Değiştir" : "🔐 Şifre Belirle"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.card, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles$1.sectionTitle, children: "🖥️ Aktif Oturumlar" }),
      sessions.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe" }, children: "Aktif oturum bulunamadı." }),
      sessions.map((session) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.sessionCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#fff", margin: 0, fontWeight: "600" }, children: session.device_name || "Bilinmeyen Cihaz" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: "#b9bbbe", fontSize: "12px", margin: "4px 0 0 0" }, children: [
            "IP: ",
            session.ip_address,
            " • ",
            new Date(session.created_at).toLocaleDateString("tr-TR")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            style: styles$1.button("danger"),
            onClick: /* @__PURE__ */ __name(() => revokeSession(session.id), "onClick"),
            children: "❌ Sonlandır"
          }
        )
      ] }, session.id)),
      sessions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          style: { ...styles$1.button("danger"), marginTop: "16px" },
          onClick: revokeAllSessions,
          children: "🚨 Tüm Oturumları Sonlandır"
        }
      )
    ] })
  ] });
}, "SecurityTab");
const BadgesTab = /* @__PURE__ */ __name(({ achievements, badges, calculateXPProgress, storeBalance, userStats }) => {
  const styles$1 = styles;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.card, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles$1.sectionTitle, children: "🏆 Rozetler & XP" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "32px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#fff", fontSize: "16px", fontWeight: "600" }, children: [
            "Seviye ",
            userStats.level
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#b9bbbe", fontSize: "14px" }, children: [
            userStats.xp,
            " / ",
            userStats.next_level_xp,
            " XP"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.progressBar, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.progressFill(calculateXPProgress()) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "24px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { style: { color: "#fff", marginBottom: "12px" }, children: [
          "💰 Coin: ",
          userStats.coins
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { style: { color: "#fff", marginBottom: "12px" }, children: [
          "🏪 Mağaza Bakiyesi: $",
          storeBalance.toFixed(2)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", marginBottom: "16px" }, children: "🎖️ Kazanılan Rozetler" }),
      badges.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe" }, children: "Henüz rozet kazanılmadı. Daha fazla aktivite gösterin!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: "8px" }, children: badges.map((badge, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.badge, title: badge.description, children: [
        badge.icon,
        " ",
        badge.name
      ] }, idx)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.card, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles$1.sectionTitle, children: "🎯 Başarılar (Achievements)" }),
      achievements.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe" }, children: "Henüz başarı kazanılmadı." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginTop: "16px" }, children: achievements.map((achievement, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            padding: "16px",
            background: achievement.completed ? "linear-gradient(135deg, rgba(67, 181, 129, 0.2) 0%, rgba(67, 181, 129, 0.05) 100%)" : "rgba(255, 255, 255, 0.03)",
            borderRadius: "12px",
            border: achievement.completed ? "1px solid rgba(67, 181, 129, 0.3)" : "1px solid rgba(255, 255, 255, 0.05)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "32px" }, children: achievement.icon || "🏆" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { style: { color: "#fff", margin: 0, fontSize: "14px" }, children: [
                  achievement.name,
                  achievement.completed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginLeft: "8px", color: "#43b581" }, children: "✅" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", margin: "4px 0 0 0", fontSize: "12px" }, children: achievement.description })
              ] })
            ] }),
            achievement.progress !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles$1.progressBar, height: "6px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.progressFill(achievement.progress / achievement.target * 100) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: "#b9bbbe", fontSize: "11px", marginTop: "4px" }, children: [
                achievement.progress,
                " / ",
                achievement.target
              ] })
            ] })
          ]
        },
        idx
      )) })
    ] })
  ] });
}, "BadgesTab");
const PrivacyTab = /* @__PURE__ */ __name(({ blockedUsers, unblockUser }) => {
  const styles$1 = styles;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles$1.sectionTitle, children: "🚫 Engellenmiş Kullanıcılar" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", marginBottom: "24px" }, children: "Engellenmiş kullanıcılar sizinle iletişime geçemez ve mesajlarınızı göremez." }),
    blockedUsers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", textAlign: "center", padding: "32px" }, children: "Engellenmiş kullanıcı yok." }),
    blockedUsers.map((blockedUser) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.sessionCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: blockedUser.avatar_url || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Crect fill="%235865f2" width="40" height="40" rx="20"/%3E%3Ctext x="20" y="20" font-size="18" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E',
            alt: blockedUser.username,
            style: { width: "40px", height: "40px", borderRadius: "50%" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#fff", margin: 0, fontWeight: "600" }, children: blockedUser.username }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: "#b9bbbe", fontSize: "12px", margin: "4px 0 0 0" }, children: [
            "Engellenme: ",
            new Date(blockedUser.blocked_at).toLocaleDateString("tr-TR")
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          style: styles$1.button("secondary"),
          onClick: /* @__PURE__ */ __name(() => unblockUser(blockedUser.user_id), "onClick"),
          children: "✅ Engeli Kaldır"
        }
      )
    ] }, blockedUser.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: "32px", padding: "16px", background: "rgba(250, 166, 26, 0.1)", borderRadius: "8px", border: "1px solid rgba(250, 166, 26, 0.3)" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#faa61a", margin: "0 0 8px 0", fontSize: "14px" }, children: "ℹ️ Gizlilik İpucu" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", margin: 0, fontSize: "13px" }, children: 'Bir kullanıcıyı engellemek için profil sayfasından "Engelle" butonunu kullanabilirsiniz.' })
    ] })
  ] });
}, "PrivacyTab");
const FriendsTab = /* @__PURE__ */ __name(({ friendRequests, friends, removeFriend, respondToFriendRequest }) => {
  const styles$1 = styles;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.card, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles$1.sectionTitle, children: "📨 Bekleyen Arkadaşlık İstekleri" }),
      friendRequests.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", textAlign: "center", padding: "24px" }, children: "Bekleyen istek yok." }),
      friendRequests.map((request) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.sessionCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: request.from_user.avatar_url || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Crect fill="%235865f2" width="40" height="40" rx="20"/%3E%3Ctext x="20" y="20" font-size="18" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E',
              alt: request.from_user.username,
              style: { width: "40px", height: "40px", borderRadius: "50%" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#fff", margin: 0, fontWeight: "600" }, children: request.from_user.username }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", fontSize: "12px", margin: "4px 0 0 0" }, children: new Date(request.created_at).toLocaleDateString("tr-TR") })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "8px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              style: styles$1.button("primary"),
              onClick: /* @__PURE__ */ __name(() => respondToFriendRequest(request.id, "accept"), "onClick"),
              children: "✅ Kabul Et"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              style: styles$1.button("danger"),
              onClick: /* @__PURE__ */ __name(() => respondToFriendRequest(request.id, "reject"), "onClick"),
              children: "❌ Reddet"
            }
          )
        ] })
      ] }, request.id))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.card, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles$1.sectionTitle, children: [
        "👥 Arkadaşlarım (",
        friends.length,
        ")"
      ] }),
      friends.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", textAlign: "center", padding: "24px" }, children: "Henüz arkadaşınız yok." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gap: "12px", marginTop: "16px" }, children: friends.map((friend) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.sessionCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: friend.avatar_url || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Crect fill="%235865f2" width="40" height="40" rx="20"/%3E%3Ctext x="20" y="20" font-size="18" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E',
              alt: friend.username,
              style: { width: "40px", height: "40px", borderRadius: "50%" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#fff", margin: 0, fontWeight: "600" }, children: friend.username }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", fontSize: "12px", margin: "4px 0 0 0" }, children: friend.status_message || "Durum mesajı yok" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: friend.is_online ? "#43b581" : "#747f8d"
          } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            style: styles$1.button("danger"),
            onClick: /* @__PURE__ */ __name(() => removeFriend(friend.friendship_id), "onClick"),
            children: "🗑️ Kaldır"
          }
        )
      ] }, friend.id)) })
    ] })
  ] });
}, "FriendsTab");
const AppearanceTab = /* @__PURE__ */ __name(({ applyTheme, availableLanguages, currentTheme, language, themes, updateLanguage }) => {
  const styles$1 = styles;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.card, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles$1.sectionTitle, children: "🎨 Temalar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", marginBottom: "16px" }, children: "Profil temanızı seçin ve görünümünüzü kişiselleştirin." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.themeGrid, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: styles$1.themeCard(currentTheme === "dark"),
            onClick: /* @__PURE__ */ __name(() => applyTheme("dark"), "onClick"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "32px", marginBottom: "8px" }, children: "🌙" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#fff", margin: 0, fontWeight: "600" }, children: "Karanlık" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: styles$1.themeCard(currentTheme === "light"),
            onClick: /* @__PURE__ */ __name(() => applyTheme("light"), "onClick"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "32px", marginBottom: "8px" }, children: "☀️" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#fff", margin: 0, fontWeight: "600" }, children: "Aydınlık" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: styles$1.themeCard(currentTheme === "custom"),
            onClick: /* @__PURE__ */ __name(() => applyTheme("custom"), "onClick"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "32px", marginBottom: "8px" }, children: "🎨" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#fff", margin: 0, fontWeight: "600" }, children: "Özel" })
            ]
          }
        ),
        themes.map((theme) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: styles$1.themeCard(currentTheme === theme.name),
            onClick: /* @__PURE__ */ __name(() => applyTheme(theme.name), "onClick"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "32px", marginBottom: "8px" }, children: theme.icon || "🎭" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#fff", margin: 0, fontWeight: "600" }, children: theme.name })
            ]
          },
          theme.id
        ))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.card, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles$1.sectionTitle, children: "🌍 Dil Tercihi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", marginBottom: "16px" }, children: "Uygulama dilini seçin. Mesajlar otomatik çevrilecektir." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }, children: availableLanguages.map((lang) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            padding: "16px",
            background: language === lang.code ? "linear-gradient(135deg, #5865f2 0%, #7289da 100%)" : "rgba(255, 255, 255, 0.05)",
            borderRadius: "12px",
            cursor: "pointer",
            textAlign: "center",
            transition: "all 0.3s",
            border: language === lang.code ? "2px solid #fff" : "2px solid transparent"
          },
          onClick: /* @__PURE__ */ __name(() => updateLanguage(lang.code), "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "32px", marginBottom: "8px" }, children: lang.flag || "🌐" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#fff", margin: 0, fontWeight: "600", fontSize: "14px" }, children: lang.name })
          ]
        },
        lang.code
      )) }),
      availableLanguages.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe" }, children: "Diller yükleniyor..." })
    ] })
  ] });
}, "AppearanceTab");
const NotificationsTab = /* @__PURE__ */ __name(({ handleNotificationSettingsUpdate, notificationSettings }) => {
  const styles$1 = styles;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles$1.sectionTitle, children: "🔔 Bildirim Ayarları" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", marginBottom: "24px" }, children: "Hangi bildirimlerle uyarılmak istediğinizi seçin." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.settingRow, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", margin: 0, fontSize: "14px" }, children: "💬 Mesaj Bildirimleri" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", fontSize: "12px", margin: "4px 0 0 0" }, children: "Yeni mesaj geldiğinde bildirim göster" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          onClick: /* @__PURE__ */ __name(() => handleNotificationSettingsUpdate("message_notifications", !notificationSettings.message_notifications), "onClick"),
          style: {
            width: "50px",
            height: "26px",
            background: notificationSettings.message_notifications ? "#5865f2" : "rgba(255, 255, 255, 0.1)",
            borderRadius: "26px",
            cursor: "pointer",
            position: "relative",
            transition: "all 0.3s"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            position: "absolute",
            width: "20px",
            height: "20px",
            background: "#fff",
            borderRadius: "50%",
            top: "3px",
            left: notificationSettings.message_notifications ? "27px" : "3px",
            transition: "all 0.3s"
          } })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.settingRow, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", margin: 0, fontSize: "14px" }, children: "@️⃣ Bahsetme Bildirimleri" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", fontSize: "12px", margin: "4px 0 0 0" }, children: "Biri sizi etiketlediğinde bildirim göster" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          onClick: /* @__PURE__ */ __name(() => handleNotificationSettingsUpdate("mention_notifications", !notificationSettings.mention_notifications), "onClick"),
          style: {
            width: "50px",
            height: "26px",
            background: notificationSettings.mention_notifications ? "#5865f2" : "rgba(255, 255, 255, 0.1)",
            borderRadius: "26px",
            cursor: "pointer",
            position: "relative",
            transition: "all 0.3s"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            position: "absolute",
            width: "20px",
            height: "20px",
            background: "#fff",
            borderRadius: "50%",
            top: "3px",
            left: notificationSettings.mention_notifications ? "27px" : "3px",
            transition: "all 0.3s"
          } })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.settingRow, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", margin: 0, fontSize: "14px" }, children: "📨 DM Bildirimleri" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", fontSize: "12px", margin: "4px 0 0 0" }, children: "Direkt mesaj geldiğinde bildirim göster" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          onClick: /* @__PURE__ */ __name(() => handleNotificationSettingsUpdate("dm_notifications", !notificationSettings.dm_notifications), "onClick"),
          style: {
            width: "50px",
            height: "26px",
            background: notificationSettings.dm_notifications ? "#5865f2" : "rgba(255, 255, 255, 0.1)",
            borderRadius: "26px",
            cursor: "pointer",
            position: "relative",
            transition: "all 0.3s"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            position: "absolute",
            width: "20px",
            height: "20px",
            background: "#fff",
            borderRadius: "50%",
            top: "3px",
            left: notificationSettings.dm_notifications ? "27px" : "3px",
            transition: "all 0.3s"
          } })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.settingRow, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", margin: 0, fontSize: "14px" }, children: "📧 E-posta Bildirimleri" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", fontSize: "12px", margin: "4px 0 0 0" }, children: "Önemli olaylar için e-posta gönder" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          onClick: /* @__PURE__ */ __name(() => handleNotificationSettingsUpdate("email_notifications", !notificationSettings.email_notifications), "onClick"),
          style: {
            width: "50px",
            height: "26px",
            background: notificationSettings.email_notifications ? "#5865f2" : "rgba(255, 255, 255, 0.1)",
            borderRadius: "26px",
            cursor: "pointer",
            position: "relative",
            transition: "all 0.3s"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            position: "absolute",
            width: "20px",
            height: "20px",
            background: "#fff",
            borderRadius: "50%",
            top: "3px",
            left: notificationSettings.email_notifications ? "27px" : "3px",
            transition: "all 0.3s"
          } })
        }
      )
    ] })
  ] });
}, "NotificationsTab");
const SoundSettingsTab = /* @__PURE__ */ __name(({ handleSoundSettingsUpdate, soundSettings }) => {
  const styles$1 = styles;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles$1.sectionTitle, children: "🎵 Ses Ayarları" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", marginBottom: "24px" }, children: "Uygulama seslerini özelleştirin." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.settingRow, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", margin: 0, fontSize: "14px" }, children: "💬 Mesaj Sesi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", fontSize: "12px", margin: "4px 0 0 0" }, children: "Mesaj geldiğinde ses çal" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          onClick: /* @__PURE__ */ __name(() => handleSoundSettingsUpdate("message_sound", !soundSettings.message_sound), "onClick"),
          style: {
            width: "50px",
            height: "26px",
            background: soundSettings.message_sound ? "#5865f2" : "rgba(255, 255, 255, 0.1)",
            borderRadius: "26px",
            cursor: "pointer",
            position: "relative",
            transition: "all 0.3s"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            position: "absolute",
            width: "20px",
            height: "20px",
            background: "#fff",
            borderRadius: "50%",
            top: "3px",
            left: soundSettings.message_sound ? "27px" : "3px",
            transition: "all 0.3s"
          } })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.settingRow, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", margin: 0, fontSize: "14px" }, children: "🔔 Bildirim Sesi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", fontSize: "12px", margin: "4px 0 0 0" }, children: "Bildirim geldiğinde ses çal" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          onClick: /* @__PURE__ */ __name(() => handleSoundSettingsUpdate("notification_sound", !soundSettings.notification_sound), "onClick"),
          style: {
            width: "50px",
            height: "26px",
            background: soundSettings.notification_sound ? "#5865f2" : "rgba(255, 255, 255, 0.1)",
            borderRadius: "26px",
            cursor: "pointer",
            position: "relative",
            transition: "all 0.3s"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            position: "absolute",
            width: "20px",
            height: "20px",
            background: "#fff",
            borderRadius: "50%",
            top: "3px",
            left: soundSettings.notification_sound ? "27px" : "3px",
            transition: "all 0.3s"
          } })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.settingRow, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", margin: 0, fontSize: "14px" }, children: "🎤 Sesli Sohbet Ayrılma Sesi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", fontSize: "12px", margin: "4px 0 0 0" }, children: "Sesli sohbetten ayrıldığınızda ses çal" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          onClick: /* @__PURE__ */ __name(() => handleSoundSettingsUpdate("voice_disconnect_sound", !soundSettings.voice_disconnect_sound), "onClick"),
          style: {
            width: "50px",
            height: "26px",
            background: soundSettings.voice_disconnect_sound ? "#5865f2" : "rgba(255, 255, 255, 0.1)",
            borderRadius: "26px",
            cursor: "pointer",
            position: "relative",
            transition: "all 0.3s"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            position: "absolute",
            width: "20px",
            height: "20px",
            background: "#fff",
            borderRadius: "50%",
            top: "3px",
            left: soundSettings.voice_disconnect_sound ? "27px" : "3px",
            transition: "all 0.3s"
          } })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: "32px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", marginBottom: "12px" }, children: "🔊 Ana Ses Seviyesi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "16px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#b9bbbe", fontSize: "14px", minWidth: "40px" }, children: [
          soundSettings.volume,
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "range",
            min: "0",
            max: "100",
            value: soundSettings.volume,
            onChange: /* @__PURE__ */ __name((e) => handleSoundSettingsUpdate("volume", parseInt(e.target.value)), "onChange"),
            style: {
              flex: 1,
              height: "6px",
              borderRadius: "3px",
              background: `linear-gradient(to right, #5865f2 0%, #5865f2 ${soundSettings.volume}%, rgba(255,255,255,0.1) ${soundSettings.volume}%, rgba(255,255,255,0.1) 100%)`,
              outline: "none",
              cursor: "pointer"
            }
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: "32px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "24px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { ...styles$1.sectionTitle, fontSize: "16px", marginBottom: "16px" }, children: "🎙️ Gelişmiş Ses İyileştirme" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.settingRow, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", margin: 0, fontSize: "14px" }, children: "🔇 Krisp Gürültü Engelleme" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", fontSize: "12px", margin: "4px 0 0 0" }, children: "Arka plan gürültülerini akıllıca bastırır (AI powered)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            onClick: /* @__PURE__ */ __name(() => {
              const newValue = !soundSettings.krisp_enabled;
              handleSoundSettingsUpdate("krisp_enabled", newValue);
              if (newValue) toast.success("🔇 Krisp gürültü engelleme aktif!");
            }, "onClick"),
            style: {
              width: "50px",
              height: "26px",
              background: soundSettings.krisp_enabled ? "#43b581" : "rgba(255, 255, 255, 0.1)",
              borderRadius: "26px",
              cursor: "pointer",
              position: "relative",
              transition: "all 0.3s"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
              position: "absolute",
              width: "20px",
              height: "20px",
              background: "#fff",
              borderRadius: "50%",
              top: "3px",
              left: soundSettings.krisp_enabled ? "27px" : "3px",
              transition: "all 0.3s"
            } })
          }
        )
      ] }),
      soundSettings.krisp_enabled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: "16px", paddingLeft: "12px", borderLeft: "3px solid #43b581" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", marginBottom: "8px", fontSize: "13px" }, children: "🎚️ Gürültü Bastırma Seviyesi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#b9bbbe", fontSize: "12px", minWidth: "60px" }, children: [
            soundSettings.noise_suppression_level || 80,
            "%",
            (soundSettings.noise_suppression_level || 80) >= 90 && " 🔥"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "range",
              min: "50",
              max: "100",
              value: soundSettings.noise_suppression_level || 80,
              onChange: /* @__PURE__ */ __name((e) => handleSoundSettingsUpdate("noise_suppression_level", parseInt(e.target.value)), "onChange"),
              style: {
                flex: 1,
                height: "4px",
                borderRadius: "2px",
                background: `linear-gradient(to right, #43b581 0%, #43b581 ${(soundSettings.noise_suppression_level || 80) - 50}%, rgba(255,255,255,0.1) ${(soundSettings.noise_suppression_level || 80) - 50}%, rgba(255,255,255,0.1) 100%)`,
                outline: "none",
                cursor: "pointer"
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#72767d", fontSize: "11px", marginTop: "4px" }, children: "💡 Yüksek değerler daha fazla gürültü engeller ama sesinizi de etkileyebilir" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles$1.settingRow, marginTop: "20px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", margin: 0, fontSize: "14px" }, children: "🎵 Yankı Önleme" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", fontSize: "12px", margin: "4px 0 0 0" }, children: "Hoparlör sesinin mikrofona geri yansımasını engeller" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            onClick: /* @__PURE__ */ __name(() => {
              const newValue = !soundSettings.echo_cancellation;
              handleSoundSettingsUpdate("echo_cancellation", newValue);
            }, "onClick"),
            style: {
              width: "50px",
              height: "26px",
              background: soundSettings.echo_cancellation !== false ? "#43b581" : "rgba(255, 255, 255, 0.1)",
              borderRadius: "26px",
              cursor: "pointer",
              position: "relative",
              transition: "all 0.3s"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
              position: "absolute",
              width: "20px",
              height: "20px",
              background: "#fff",
              borderRadius: "50%",
              top: "3px",
              left: soundSettings.echo_cancellation !== false ? "27px" : "3px",
              transition: "all 0.3s"
            } })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.settingRow, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", margin: 0, fontSize: "14px" }, children: "📊 Otomatik Ses Seviyesi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", fontSize: "12px", margin: "4px 0 0 0" }, children: "Mikrofonunuzu otomatik normalize eder (Auto Gain Control)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            onClick: /* @__PURE__ */ __name(() => {
              const newValue = !soundSettings.auto_gain_control;
              handleSoundSettingsUpdate("auto_gain_control", newValue);
            }, "onClick"),
            style: {
              width: "50px",
              height: "26px",
              background: soundSettings.auto_gain_control !== false ? "#43b581" : "rgba(255, 255, 255, 0.1)",
              borderRadius: "26px",
              cursor: "pointer",
              position: "relative",
              transition: "all 0.3s"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
              position: "absolute",
              width: "20px",
              height: "20px",
              background: "#fff",
              borderRadius: "50%",
              top: "3px",
              left: soundSettings.auto_gain_control !== false ? "27px" : "3px",
              transition: "all 0.3s"
            } })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: "16px", padding: "12px", backgroundColor: "rgba(114, 137, 218, 0.1)", borderRadius: "8px", borderLeft: "3px solid #7289da" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: "#b9bbbe", fontSize: "12px", margin: 0 }, children: [
        "💡 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "#fff" }, children: "Profesyonel İpucu:" }),
        " En iyi sonuç için tüm iyileştirmeleri açık tutun. Eğer ses robotikleşirse gürültü bastırma seviyesini 70-80% arası deneyin."
      ] }) })
    ] })
  ] });
}, "SoundSettingsTab");
const PremiumTab = /* @__PURE__ */ __name(({ premiumStatus }) => {
  const styles$1 = styles;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles$1.sectionTitle, children: "💎 Premium Üyelik" }),
    premiumStatus?.is_active ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        padding: "24px",
        background: "linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0.05) 100%)",
        borderRadius: "12px",
        border: "2px solid rgba(255, 215, 0, 0.3)",
        marginBottom: "24px"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#ffd700", margin: "0 0 12px 0", fontSize: "20px" }, children: "⭐ Premium Üye" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", margin: 0 }, children: "Premium üyeliğiniz aktif! Tüm özel özelliklere erişiminiz var." }),
        premiumStatus.expires_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: "#b9bbbe", margin: "8px 0 0 0", fontSize: "13px" }, children: [
          "📅 Bitiş tarihi: ",
          new Date(premiumStatus.expires_at).toLocaleDateString("tr-TR")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", marginBottom: "16px" }, children: "✨ Premium Özellikleri" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gap: "12px" }, children: [
        { icon: "🎨", text: "Özel temalar ve renkler" },
        { icon: "🎭", text: "Animasyonlu avatar çerçeveleri" },
        { icon: "💬", text: "Gelişmiş mesaj araçları" },
        { icon: "🎵", text: "Özel emoji ve stickerlar" },
        { icon: "🏆", text: "Özel rozetler" },
        { icon: "🚀", text: "Öncelikli destek" }
      ].map((feature, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            padding: "12px",
            background: "rgba(255, 255, 255, 0.03)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "24px" }, children: feature.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#fff", fontSize: "14px" }, children: feature.text })
          ]
        },
        idx
      )) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        padding: "24px",
        background: "linear-gradient(135deg, rgba(88, 101, 242, 0.2) 0%, rgba(88, 101, 242, 0.05) 100%)",
        borderRadius: "12px",
        border: "2px solid rgba(88, 101, 242, 0.3)",
        marginBottom: "24px",
        textAlign: "center"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "64px", marginBottom: "16px" }, children: "💎" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", margin: "0 0 12px 0", fontSize: "24px" }, children: "Premium'a Yükselt" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", margin: "0 0 24px 0" }, children: "Özel özelliklerle deneyiminizi geliştirin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "32px", fontWeight: "700", color: "#5865f2", marginBottom: "8px" }, children: [
          "$4.99",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "16px", color: "#b9bbbe" }, children: "/ay" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            style: {
              ...styles$1.button("primary"),
              marginTop: "16px",
              padding: "16px 48px",
              fontSize: "16px"
            },
            children: "🚀 Şimdi Satın Al"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", marginBottom: "16px" }, children: "✨ Premium ile Kazanın" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gap: "12px" }, children: [
        { icon: "🎨", text: "Özel temalar ve renkler" },
        { icon: "🎭", text: "Animasyonlu avatar çerçeveleri" },
        { icon: "💬", text: "Gelişmiş mesaj araçları" },
        { icon: "🎵", text: "Özel emoji ve stickerlar" },
        { icon: "🏆", text: "Özel rozetler" },
        { icon: "🚀", text: "Öncelikli destek" },
        { icon: "📁", text: "100GB bulut depolama" },
        { icon: "🎬", text: "HD video paylaşımı" }
      ].map((feature, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            padding: "12px",
            background: "rgba(255, 255, 255, 0.03)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "24px" }, children: feature.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#fff", fontSize: "14px" }, children: feature.text })
          ]
        },
        idx
      )) })
    ] })
  ] });
}, "PremiumTab");
const ActivityTab = /* @__PURE__ */ __name(({ userActivity }) => {
  const styles$1 = styles;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles$1.sectionTitle, children: "📊 Kullanıcı Aktivitesi" }),
    userActivity.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      padding: "48px",
      textAlign: "center",
      background: "rgba(255, 255, 255, 0.03)",
      borderRadius: "12px"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "64px", marginBottom: "16px" }, children: "📊" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", margin: "0 0 8px 0" }, children: "Henüz aktivite yok" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", margin: 0 }, children: "Aktiviteleriniz burada görünecek" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: "12px" }, children: userActivity.map((activity, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          padding: "16px",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "8px",
          borderLeft: "4px solid #5865f2"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "8px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { style: { color: "#fff", margin: 0, fontSize: "14px" }, children: [
              activity.type === "message" && "💬 Mesaj gönderildi",
              activity.type === "join" && "👋 Sunucuya katıldı",
              activity.type === "voice" && "🎤 Sesli sohbete katıldı",
              activity.type === "game" && "🎮 Oyun başlatıldı"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#b9bbbe", fontSize: "12px" }, children: new Date(activity.timestamp).toLocaleString("tr-TR") })
          ] }),
          activity.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", margin: 0, fontSize: "13px" }, children: activity.description })
        ]
      },
      idx
    )) })
  ] });
}, "ActivityTab");
const DraftsTab = /* @__PURE__ */ __name(({ deleteDraft, drafts }) => {
  const styles$1 = styles;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles$1.sectionTitle, children: "📝 Mesaj Taslakları" }),
    drafts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      padding: "48px",
      textAlign: "center",
      background: "rgba(255, 255, 255, 0.03)",
      borderRadius: "12px"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "64px", marginBottom: "16px" }, children: "📝" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", margin: "0 0 8px 0" }, children: "Taslak yok" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", margin: 0 }, children: "Mesaj taslakları otomatik olarak kaydedilir" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: "12px" }, children: drafts.map((draft, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          padding: "16px",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", margin: "0 0 8px 0", fontSize: "14px" }, children: draft.channel_name || `Kanal #${draft.channel_id}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
              color: "#b9bbbe",
              margin: 0,
              fontSize: "13px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }, children: draft.content }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#72767d", fontSize: "11px", marginTop: "4px", display: "block" }, children: new Date(draft.updated_at).toLocaleString("tr-TR") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              style: {
                ...styles$1.button("danger"),
                padding: "8px 16px",
                fontSize: "12px",
                marginLeft: "12px"
              },
              onClick: /* @__PURE__ */ __name(() => deleteDraft(draft.key), "onClick"),
              children: "🗑️ Sil"
            }
          )
        ]
      },
      idx
    )) })
  ] });
}, "DraftsTab");
const BookmarksTab = /* @__PURE__ */ __name(({ bookmarks }) => {
  const styles$1 = styles;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles$1.sectionTitle, children: "🔖 Yer İmleri" }),
    bookmarks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      padding: "48px",
      textAlign: "center",
      background: "rgba(255, 255, 255, 0.03)",
      borderRadius: "12px"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "64px", marginBottom: "16px" }, children: "🔖" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", margin: "0 0 8px 0" }, children: "Henüz yer imi yok" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", margin: 0 }, children: "Mesajları işaretleyerek buraya ekleyebilirsiniz" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: "12px" }, children: bookmarks.map((bookmark, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          padding: "16px",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "8px",
          borderLeft: "4px solid #ffd700"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: bookmark.author_avatar || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"%3E%3Crect fill="%235865f2" width="32" height="32" rx="16"/%3E%3Ctext x="16" y="16" font-size="14" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E',
                alt: bookmark.author_name,
                style: { width: "32px", height: "32px", borderRadius: "50%" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", margin: 0, fontSize: "14px" }, children: bookmark.author_name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#b9bbbe", fontSize: "12px" }, children: [
                bookmark.channel_name,
                " • ",
                new Date(bookmark.timestamp).toLocaleString("tr-TR")
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#dcddde", margin: 0, fontSize: "14px" }, children: bookmark.content })
        ]
      },
      idx
    )) })
  ] });
}, "BookmarksTab");
const CustomStatusTab = /* @__PURE__ */ __name(({ customStatus, setCustomStatus, updateCustomStatus }) => {
  const styles$1 = styles;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles$1.sectionTitle, children: "🎨 Özel Durum" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "24px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles$1.label, children: "Durum" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginTop: "8px" }, children: [
        { value: "online", icon: "🟢", label: "Çevrimiçi", color: "#43b581" },
        { value: "idle", icon: "🟡", label: "Boşta", color: "#faa61a" },
        { value: "dnd", icon: "🔴", label: "Rahatsız Etmeyin", color: "#f04747" },
        { value: "invisible", icon: "⚫", label: "Görünmez", color: "#747f8d" }
      ].map((status) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => setCustomStatus({ ...customStatus, status: status.value }), "onClick"),
          style: {
            padding: "16px 12px",
            background: customStatus.status === status.value ? `linear-gradient(135deg, ${status.color}33 0%, ${status.color}11 100%)` : "rgba(255, 255, 255, 0.03)",
            border: customStatus.status === status.value ? `2px solid ${status.color}` : "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.2s",
            textAlign: "center"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "24px", marginBottom: "8px" }, children: status.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#fff", fontSize: "12px", fontWeight: "500" }, children: status.label })
          ]
        },
        status.value
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.inputGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles$1.label, children: "Özel Mesaj" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: customStatus.custom_status,
          onChange: /* @__PURE__ */ __name((e) => setCustomStatus({ ...customStatus, custom_status: e.target.value }), "onChange"),
          placeholder: "Ne yapıyorsun?",
          style: styles$1.input,
          maxLength: 128
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: "#b9bbbe", fontSize: "12px", marginTop: "4px" }, children: [
        customStatus.custom_status.length,
        "/128 karakter"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        style: { ...styles$1.button("primary"), marginTop: "16px" },
        onClick: updateCustomStatus,
        children: "💾 Durumu Kaydet"
      }
    )
  ] });
}, "CustomStatusTab");
const GDPRTab = /* @__PURE__ */ __name(({ exportRequested, gdprExports, requestGDPRExport }) => {
  const styles$1 = styles;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles$1.sectionTitle, children: "🔒 GDPR & Veri Gizliliği" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      padding: "16px",
      background: "rgba(88, 101, 242, 0.1)",
      borderRadius: "8px",
      borderLeft: "4px solid #5865f2",
      marginBottom: "24px"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", margin: "0 0 8px 0", fontSize: "14px" }, children: "ℹ️ Veri Dışa Aktarma Hakkı" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", margin: 0, fontSize: "13px" }, children: "GDPR (Genel Veri Koruma Yönetmeliği) kapsamında tüm kişisel verilerinizi dışa aktarabilirsiniz. Bu işlem, mesajlar, profil bilgileri, aktiviteler ve daha fazlasını içerir." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        style: styles$1.button("primary"),
        onClick: requestGDPRExport,
        disabled: exportRequested,
        children: exportRequested ? "⏳ İşleniyor..." : "📥 GDPR Dışa Aktarma Talebi Oluştur"
      }
    ),
    gdprExports.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: "24px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", marginBottom: "12px" }, children: "📋 Dışa Aktarma Geçmişi" }),
      gdprExports.map((exp, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            padding: "12px",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "8px",
            marginBottom: "8px"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: "#fff", margin: 0, fontSize: "14px" }, children: [
                exp.status === "pending" && "⏳ İşleniyor",
                exp.status === "completed" && "✅ Tamamlandı",
                exp.status === "failed" && "❌ Başarısız"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", margin: "4px 0 0 0", fontSize: "12px" }, children: new Date(exp.created_at).toLocaleString("tr-TR") })
            ] }),
            exp.status === "completed" && exp.download_url && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: exp.download_url,
                style: {
                  ...styles$1.button("secondary"),
                  padding: "8px 16px",
                  fontSize: "12px",
                  textDecoration: "none"
                },
                children: "📥 İndir"
              }
            )
          ] })
        },
        idx
      ))
    ] })
  ] });
}, "GDPRTab");
const DeveloperTab = /* @__PURE__ */ __name(({ botAccounts, oauthApps, webhooks }) => {
  const styles$1 = styles;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles$1.sectionTitle, children: "🔧 Geliştirici Araçları" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "32px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", marginBottom: "12px" }, children: "🔑 OAuth Uygulamalar" }),
      oauthApps.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", fontSize: "14px" }, children: "Henüz OAuth uygulamanız yok." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: "12px" }, children: oauthApps.map((app, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            padding: "16px",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "8px"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { style: { color: "#fff", margin: "0 0 8px 0" }, children: app.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: "#b9bbbe", margin: 0, fontSize: "13px" }, children: [
              "Client ID: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: app.client_id })
            ] })
          ]
        },
        idx
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "32px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", marginBottom: "12px" }, children: "🪝 Webhook'lar" }),
      webhooks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", fontSize: "14px" }, children: "Henüz webhook'unuz yok." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: "12px" }, children: webhooks.map((webhook, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            padding: "16px",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "8px"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { style: { color: "#fff", margin: "0 0 8px 0" }, children: webhook.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: "#b9bbbe", margin: 0, fontSize: "13px" }, children: [
              "URL: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { style: { wordBreak: "break-all" }, children: webhook.url })
            ] })
          ]
        },
        idx
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", marginBottom: "12px" }, children: "🤖 Bot Hesapları" }),
      botAccounts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", fontSize: "14px" }, children: "Henüz bot hesabınız yok." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: "12px" }, children: botAccounts.map((bot, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            padding: "16px",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: bot.avatar_url || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"%3E%3Crect fill="%235865f2" width="48" height="48" rx="24"/%3E%3Ctext x="24" y="24" font-size="22" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E🤖%3C/text%3E%3C/svg%3E',
                alt: bot.username,
                style: { width: "48px", height: "48px", borderRadius: "50%" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { style: { color: "#fff", margin: "0 0 4px 0" }, children: bot.username }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: "#b9bbbe", margin: 0, fontSize: "13px" }, children: [
                "Token: ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("code", { children: [
                  bot.token?.substring(0, 20),
                  "..."
                ] })
              ] })
            ] })
          ]
        },
        idx
      )) })
    ] })
  ] });
}, "DeveloperTab");
const InventoryTab = /* @__PURE__ */ __name(({ equipItem, equippedItems, inventory, unequipItem }) => {
  const styles$1 = styles;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles$1.sectionTitle, children: "🎒 Envanter & Ekipman" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "24px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", marginBottom: "12px" }, children: "⚡ Ekipli İtemler" }),
      equippedItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", fontSize: "14px" }, children: "Henüz ekipli item yok." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }, children: equippedItems.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            padding: "16px",
            background: "linear-gradient(135deg, rgba(67, 181, 129, 0.2) 0%, rgba(67, 181, 129, 0.05) 100%)",
            border: "2px solid #43b581",
            borderRadius: "12px",
            textAlign: "center"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "48px", marginBottom: "8px" }, children: item.icon || "🎁" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { style: { color: "#fff", margin: "0 0 4px 0", fontSize: "14px" }, children: item.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                style: { ...styles$1.button("secondary"), padding: "6px 12px", fontSize: "12px", marginTop: "8px" },
                onClick: /* @__PURE__ */ __name(() => unequipItem(item.id), "onClick"),
                children: "❌ Çıkar"
              }
            )
          ]
        },
        idx
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", marginBottom: "12px" }, children: "📦 Tüm İtemler" }),
      inventory.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "48px", textAlign: "center", background: "rgba(255, 255, 255, 0.03)", borderRadius: "12px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "64px", marginBottom: "16px" }, children: "🎒" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", margin: "0 0 8px 0" }, children: "Envanter boş" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", margin: 0 }, children: "Premium Store'dan item satın alabilirsiniz" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }, children: inventory.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            padding: "16px",
            background: item.is_equipped ? "linear-gradient(135deg, rgba(67, 181, 129, 0.2) 0%, rgba(67, 181, 129, 0.05) 100%)" : "rgba(255, 255, 255, 0.05)",
            border: item.is_equipped ? "2px solid #43b581" : "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            textAlign: "center"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "48px", marginBottom: "8px" }, children: item.icon || "🎁" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { style: { color: "#fff", margin: "0 0 4px 0", fontSize: "14px" }, children: item.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", margin: "4px 0", fontSize: "12px" }, children: item.description }),
            !item.is_equipped && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                style: { ...styles$1.button("primary"), padding: "6px 12px", fontSize: "12px", marginTop: "8px" },
                onClick: /* @__PURE__ */ __name(() => equipItem(item.id), "onClick"),
                children: "✅ Ekip"
              }
            )
          ]
        },
        idx
      )) })
    ] })
  ] });
}, "InventoryTab");
const EndorsementsTab = /* @__PURE__ */ __name(({ endorsements }) => {
  const styles$1 = styles;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles$1.sectionTitle, children: "⭐ Kullanıcı Onayları" }),
    endorsements.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "48px", textAlign: "center", background: "rgba(255, 255, 255, 0.03)", borderRadius: "12px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "64px", marginBottom: "16px" }, children: "⭐" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", margin: "0 0 8px 0" }, children: "Henüz onay yok" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", margin: 0 }, children: "Diğer kullanıcılar sizi onayladığında burada görünecek" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: "12px" }, children: endorsements.map((endorsement, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          padding: "16px",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "8px",
          borderLeft: "4px solid #ffd700"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: endorsement.endorser_avatar || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"%3E%3Crect fill="%235865f2" width="32" height="32" rx="16"/%3E%3Ctext x="16" y="16" font-size="14" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E',
                alt: endorsement.endorser_name,
                style: { width: "32px", height: "32px", borderRadius: "50%" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", margin: 0, fontSize: "14px" }, children: endorsement.endorser_name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#b9bbbe", fontSize: "12px" }, children: new Date(endorsement.created_at).toLocaleString("tr-TR") })
            ] })
          ] }),
          endorsement.message && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: "#dcddde", margin: 0, fontSize: "14px", fontStyle: "italic" }, children: [
            '"',
            endorsement.message,
            '"'
          ] })
        ]
      },
      idx
    )) })
  ] });
}, "EndorsementsTab");
const NicknameHistoryTab = /* @__PURE__ */ __name(({ nicknameHistory }) => {
  const styles$1 = styles;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles$1.sectionTitle, children: "📜 İsim Değişiklik Geçmişi" }),
    nicknameHistory.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "48px", textAlign: "center", background: "rgba(255, 255, 255, 0.03)", borderRadius: "12px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "64px", marginBottom: "16px" }, children: "📜" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: "#fff", margin: "0 0 8px 0" }, children: "Değişiklik yok" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", margin: 0 }, children: "İsim değişiklikleriniz burada görünecek" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: "12px" }, children: nicknameHistory.map((history, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          padding: "16px",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "8px"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: "#fff", margin: 0, fontSize: "14px", fontWeight: "600" }, children: [
              history.old_nickname,
              " → ",
              history.new_nickname
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", margin: "4px 0 0 0", fontSize: "12px" }, children: history.server_name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#b9bbbe", fontSize: "12px" }, children: new Date(history.changed_at).toLocaleString("tr-TR") })
        ] })
      },
      idx
    )) })
  ] });
}, "NicknameHistoryTab");
const ProfileTabContent = /* @__PURE__ */ __name(({ activeTab, api, isOwnProfile, user }) => {
  switch (activeTab) {
    case "profile":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        ProfileTab,
        {
          defaultAvatars: api.defaultAvatars,
          emailVerified: api.emailVerified,
          fileInputRef: api.fileInputRef,
          formData: api.formData,
          handleAvatarUpload: api.handleAvatarUpload,
          handleInputChange: api.handleInputChange,
          handlePhoneUpdate: api.handlePhoneUpdate,
          handleSaveProfile: api.handleSaveProfile,
          isOwnProfile,
          loading: api.loading,
          phoneNumber: api.phoneNumber,
          resendVerificationEmail: api.resendVerificationEmail,
          selectDefaultAvatar: api.selectDefaultAvatar,
          setPhoneNumber: api.setPhoneNumber
        }
      );
    case "security":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        SecurityTab,
        {
          backupCodes: api.backupCodes,
          disable2FA: api.disable2FA,
          enable2FA: api.enable2FA,
          handlePasswordChange: api.handlePasswordChange,
          hasPassword: api.hasPassword,
          loading: api.loading,
          passwordData: api.passwordData,
          revokeAllSessions: api.revokeAllSessions,
          revokeSession: api.revokeSession,
          sessions: api.sessions,
          setPasswordData: api.setPasswordData,
          setVerificationCode: api.setVerificationCode,
          twoFactorData: api.twoFactorData,
          twoFactorEnabled: api.twoFactorEnabled,
          user,
          verificationCode: api.verificationCode,
          verify2FASetup: api.verify2FASetup
        }
      );
    case "badges":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        BadgesTab,
        {
          achievements: api.achievements,
          badges: api.badges,
          calculateXPProgress: api.calculateXPProgress,
          storeBalance: api.storeBalance,
          userStats: api.userStats
        }
      );
    case "privacy":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(PrivacyTab, { blockedUsers: api.blockedUsers, unblockUser: api.unblockUser });
    case "friends":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        FriendsTab,
        {
          friendRequests: api.friendRequests,
          friends: api.friends,
          removeFriend: api.removeFriend,
          respondToFriendRequest: api.respondToFriendRequest
        }
      );
    case "appearance":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        AppearanceTab,
        {
          applyTheme: api.applyTheme,
          availableLanguages: api.availableLanguages,
          currentTheme: api.currentTheme,
          language: api.language,
          themes: api.themes,
          updateLanguage: api.updateLanguage
        }
      );
    case "notifications":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationsTab, { handleNotificationSettingsUpdate: api.handleNotificationSettingsUpdate, notificationSettings: api.notificationSettings });
    case "sounds":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SoundSettingsTab, { handleSoundSettingsUpdate: api.handleSoundSettingsUpdate, soundSettings: api.soundSettings });
    case "premium":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(PremiumTab, { premiumStatus: api.premiumStatus });
    case "activity":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityTab, { userActivity: api.userActivity });
    case "drafts":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(DraftsTab, { deleteDraft: api.deleteDraft, drafts: api.drafts });
    case "bookmarks":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarksTab, { bookmarks: api.bookmarks });
    case "status":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CustomStatusTab, { customStatus: api.customStatus, setCustomStatus: api.setCustomStatus, updateCustomStatus: api.updateCustomStatus });
    case "gdpr":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(GDPRTab, { exportRequested: api.exportRequested, gdprExports: api.gdprExports, requestGDPRExport: api.requestGDPRExport });
    case "developer":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(DeveloperTab, { botAccounts: api.botAccounts, oauthApps: api.oauthApps, webhooks: api.webhooks });
    case "inventory":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        InventoryTab,
        {
          equipItem: api.equipItem,
          equippedItems: api.equippedItems,
          inventory: api.inventory,
          unequipItem: api.unequipItem
        }
      );
    case "endorsements":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(EndorsementsTab, { endorsements: api.endorsements });
    case "history":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(NicknameHistoryTab, { nicknameHistory: api.nicknameHistory });
    default:
      return null;
  }
}, "ProfileTabContent");
const UserProfilePanel = /* @__PURE__ */ __name(({ user, onClose, onUpdate, onLogout }) => {
  if (!user) {
    console.error("[UserProfilePanel] User prop is null/undefined");
    return null;
  }
  const currentUsername = localStorage.getItem("chat_username");
  const currentUserId = localStorage.getItem("user_id");
  const viewingUsername = user?.username || user?.user?.username || user?.name;
  const isOwnProfile = viewingUsername === currentUsername || user?.id?.toString() === currentUserId;
  const [activeTab, setActiveTab] = reactExports.useState("profile");
  const [activeCategory, setActiveCategory] = reactExports.useState("account");
  const [showLogoutModal, setShowLogoutModal] = reactExports.useState(false);
  const api = useProfileAPI({ user, isOwnProfile, onUpdate });
  reactExports.useEffect(() => {
    api.fetchDataForCategory(activeCategory);
  }, [activeCategory]);
  const styles$1 = styles;
  try {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.overlay, onClick: onClose, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.panel, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ProfileHeader,
          {
            formData: api.formData,
            premiumStatus: api.premiumStatus,
            badges: api.badges,
            userStats: api.userStats,
            customStatus: api.customStatus,
            friends: api.friends,
            onClose,
            styles: styles$1
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.body, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProfileSidebar,
            {
              activeTab,
              setActiveTab,
              setActiveCategory,
              isOwnProfile,
              onLogout,
              setShowLogoutModal
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.content, className: "user-profile-content", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProfileTabContent,
            {
              activeTab,
              api,
              isOwnProfile,
              user
            }
          ) })
        ] })
      ] }),
      api.showCropper && /* @__PURE__ */ jsxRuntimeExports.jsx(
        AvatarCropper,
        {
          imageFile: api.tempImageFile,
          onCropComplete: api.handleCropComplete,
          onCancel: /* @__PURE__ */ __name(() => {
            api.setShowCropper(false);
            api.setTempImageFile(null);
          }, "onCancel")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        LogoutModal,
        {
          isOpen: showLogoutModal,
          onClose: /* @__PURE__ */ __name(() => setShowLogoutModal(false), "onClose"),
          onConfirm: /* @__PURE__ */ __name(() => {
            onLogout();
            onClose();
          }, "onConfirm"),
          username: user?.username || currentUsername
        }
      )
    ] });
  } catch (error) {
    console.error("[UserProfilePanel] Render error:", error);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      background: "#2f3136",
      padding: "32px",
      borderRadius: "12px",
      textAlign: "center",
      color: "#fff"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Profil Yuklenemedi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe" }, children: "Bir hata olustu. Lutfen tekrar deneyin." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          style: {
            background: "#5865f2",
            color: "#fff",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "16px"
          },
          children: "Kapat"
        }
      )
    ] }) });
  }
}, "UserProfilePanel");
export {
  UserProfilePanel as default
};
