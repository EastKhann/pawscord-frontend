var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { y } from "./ui-vendor-iPoN0WGz.js";
import { d as confirmDialog, g as getApiBase } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
const useSecurityAPI = /* @__PURE__ */ __name(() => {
  const [twoFactorEnabled, setTwoFactorEnabled] = reactExports.useState(false);
  const [twoFactorMethods, setTwoFactorMethods] = reactExports.useState([]);
  const [sessions, setSessions] = reactExports.useState([]);
  const [ipWhitelist, setIpWhitelist] = reactExports.useState([]);
  const [backupCodes, setBackupCodes] = reactExports.useState([]);
  const [qrCode, setQrCode] = reactExports.useState("");
  const [verificationCode, setVerificationCode] = reactExports.useState("");
  const [newIp, setNewIp] = reactExports.useState("");
  const [securityStatus, setSecurityStatus] = reactExports.useState(null);
  const [activeTab, setActiveTab] = reactExports.useState("2fa");
  const apiBaseUrl = getApiBase();
  const token = localStorage.getItem("access_token");
  const headers = { "Authorization": `Bearer ${token}` };
  const postHeaders = { ...headers, "Content-Type": "application/json" };
  const fetchSecurityStatus = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/security/status/`, { headers });
      const data = await res.json();
      setSecurityStatus(data);
      setTwoFactorEnabled(data.two_factor_enabled || false);
    } catch (error) {
      console.error("Error fetching security status:", error);
    }
  }, "fetchSecurityStatus");
  const fetch2FAMethods = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/2fa/methods/`, { headers });
      const data = await res.json();
      setTwoFactorMethods(data.methods || []);
    } catch (error) {
      console.error("Error fetching 2FA methods:", error);
    }
  }, "fetch2FAMethods");
  const fetchSessions = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/security/sessions/`, { headers });
      const data = await res.json();
      setSessions(data.sessions || []);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  }, "fetchSessions");
  const fetchIPWhitelist = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/security/ip-whitelist/`, { headers });
      const data = await res.json();
      setIpWhitelist(data.whitelist || []);
    } catch (error) {
      console.error("Error fetching IP whitelist:", error);
    }
  }, "fetchIPWhitelist");
  const enable2FA = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/security/2fa/enable/`, { method: "POST", headers: postHeaders });
      const data = await res.json();
      if (res.ok) {
        setQrCode(data.qr_code || "");
        setBackupCodes(data.backup_codes || []);
        y.info("ℹ️ QR kodu tarayın ve doğrulama kodunu girin");
      } else {
        y.error(`❌ ${data.error || "2FA etkinleştirilemedi"}`);
      }
    } catch (error) {
      console.error("Error enabling 2FA:", error);
      y.error("❌ 2FA etkinleştirme hatası");
    }
  }, "enable2FA");
  const verify2FASetup = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/security/2fa/verify-setup/`, {
        method: "POST",
        headers: postHeaders,
        body: JSON.stringify({ code: verificationCode })
      });
      const data = await res.json();
      if (res.ok) {
        y.success("✅ 2FA başarıyla etkinleştirildi!");
        setTwoFactorEnabled(true);
        setQrCode("");
        setVerificationCode("");
        fetchSecurityStatus();
      } else {
        y.error(`❌ ${data.error || "Geçersiz kod"}`);
      }
    } catch (error) {
      console.error("Error verifying 2FA:", error);
      y.error("❌ Doğrulama hatası");
    }
  }, "verify2FASetup");
  const disable2FA = /* @__PURE__ */ __name(async () => {
    if (!await confirmDialog("2FA'yı devre dışı bırakmak istediğinizden emin misiniz?")) return;
    try {
      const res = await fetch(`${apiBaseUrl}/security/2fa/disable/`, { method: "POST", headers: postHeaders });
      const data = await res.json();
      if (res.ok) {
        y.info("ℹ️ 2FA devre dışı bırakıldı");
        setTwoFactorEnabled(false);
        fetchSecurityStatus();
      } else {
        y.error(`❌ ${data.error || "2FA devre dışı bırakılamadı"}`);
      }
    } catch (error) {
      console.error("Error disabling 2FA:", error);
      y.error("❌ 2FA devre dışı bırakma hatası");
    }
  }, "disable2FA");
  const getBackupCodes = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/security/2fa/backup-codes/`, { method: "POST", headers: postHeaders });
      const data = await res.json();
      if (res.ok) {
        setBackupCodes(data.backup_codes || []);
        y.success("✅ Yedek kodlar oluşturuldu");
      } else {
        y.error(`❌ ${data.error || "Yedek kodlar oluşturulamadı"}`);
      }
    } catch (error) {
      console.error("Error getting backup codes:", error);
      y.error("❌ Yedek kod hatası");
    }
  }, "getBackupCodes");
  const revokeSession = /* @__PURE__ */ __name(async (sessionId) => {
    try {
      const res = await fetch(`${apiBaseUrl}/security/sessions/${sessionId}/revoke/`, { method: "POST", headers: postHeaders });
      const data = await res.json();
      if (res.ok) {
        y.success("✅ Oturum sonlandırıldı");
        fetchSessions();
      } else {
        y.error(`❌ ${data.error || "Oturum sonlandırılamadı"}`);
      }
    } catch (error) {
      console.error("Error revoking session:", error);
      y.error("❌ Oturum sonlandırma hatası");
    }
  }, "revokeSession");
  const revokeAllSessions = /* @__PURE__ */ __name(async () => {
    if (!await confirmDialog("Tüm oturumları sonlandırmak istediğinizden emin misiniz?")) return;
    try {
      const res = await fetch(`${apiBaseUrl}/security/sessions/revoke-all/`, { method: "POST", headers: postHeaders });
      const data = await res.json();
      if (res.ok) {
        y.success("✅ Tüm oturumlar sonlandırıldı");
        fetchSessions();
      } else {
        y.error(`❌ ${data.error || "Oturumlar sonlandırılamadı"}`);
      }
    } catch (error) {
      console.error("Error revoking all sessions:", error);
      y.error("❌ Toplu sonlandırma hatası");
    }
  }, "revokeAllSessions");
  const addIPToWhitelist = /* @__PURE__ */ __name(async () => {
    if (!newIp.trim()) {
      y.error("❌ IP adresi gerekli");
      return;
    }
    try {
      const res = await fetch(`${apiBaseUrl}/security/ip-whitelist/add/`, {
        method: "POST",
        headers: postHeaders,
        body: JSON.stringify({ ip_address: newIp })
      });
      const data = await res.json();
      if (res.ok) {
        y.success("✅ IP beyaz listeye eklendi");
        setNewIp("");
        fetchIPWhitelist();
      } else {
        y.error(`❌ ${data.error || "IP eklenemedi"}`);
      }
    } catch (error) {
      console.error("Error adding IP:", error);
      y.error("❌ IP ekleme hatası");
    }
  }, "addIPToWhitelist");
  const removeIPFromWhitelist = /* @__PURE__ */ __name(async (whitelistId) => {
    try {
      const res = await fetch(`${apiBaseUrl}/security/ip-whitelist/${whitelistId}/`, { method: "DELETE", headers });
      if (res.ok) {
        y.success("✅ IP beyaz listeden kaldırıldı");
        fetchIPWhitelist();
      } else {
        y.error("❌ IP kaldırılamadı");
      }
    } catch (error) {
      console.error("Error removing IP:", error);
      y.error("❌ IP kaldırma hatası");
    }
  }, "removeIPFromWhitelist");
  const downloadBackupCodes = /* @__PURE__ */ __name(() => {
    const text = backupCodes.join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pawscord_backup_codes_${(/* @__PURE__ */ new Date()).toISOString()}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
    y.success("✅ Yedek kodlar indirildi");
  }, "downloadBackupCodes");
  reactExports.useEffect(() => {
    fetchSecurityStatus();
    fetch2FAMethods();
    fetchSessions();
    fetchIPWhitelist();
  }, []);
  return {
    twoFactorEnabled,
    twoFactorMethods,
    sessions,
    ipWhitelist,
    backupCodes,
    qrCode,
    verificationCode,
    setVerificationCode,
    newIp,
    setNewIp,
    securityStatus,
    activeTab,
    setActiveTab,
    enable2FA,
    verify2FASetup,
    disable2FA,
    getBackupCodes,
    downloadBackupCodes,
    revokeSession,
    revokeAllSessions,
    addIPToWhitelist,
    removeIPFromWhitelist
  };
}, "useSecurityAPI");
const TwoFactorTab = /* @__PURE__ */ __name(({
  twoFactorEnabled,
  qrCode,
  verificationCode,
  setVerificationCode,
  backupCodes,
  enable2FA,
  verify2FASetup,
  disable2FA,
  getBackupCodes,
  downloadBackupCodes
}) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tab-content", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
    "İ",
    "ki Faktörlü Kimlik Doğrulama (2FA)"
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Hesabınızı ekstra bir güvenlik katmanıyla koruyun" }),
  !twoFactorEnabled && !qrCode ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "enable-2fa", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "enable-btn", onClick: enable2FA, children: "2FA'yı Etkinleştir" }) }) : twoFactorEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "enabled-2fa", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "success-message", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "success-icon", children: "✅" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "2FA aktif - Hesabınız korunuyor" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "disable-btn", onClick: disable2FA, children: "2FA'yı Devre Dışı Bırak" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "backup-btn", onClick: getBackupCodes, children: "Yeni Yedek Kodlar Oluştur" })
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setup-2fa", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "qr-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "1. QR Kodu Tarayın" }),
      qrCode && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: qrCode, alt: "2FA QR Code", className: "qr-code" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Authenticator uygulamanızla QR kodu tarayın" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "verify-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "2. Doğrulama Kodunu Girin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "6 haneli kod",
          value: verificationCode,
          onChange: /* @__PURE__ */ __name((e) => setVerificationCode(e.target.value), "onChange"),
          maxLength: 6,
          className: "verification-input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "verify-btn", onClick: verify2FASetup, children: "Doğrula ve Etkinleştir" })
    ] }),
    backupCodes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "backup-codes", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "3. Yedek Kodlarınız" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Bu kodları güvenli bir yerde saklayın!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "codes-grid", children: backupCodes.map((code, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "backup-code", children: code }, index)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "download-btn", onClick: downloadBackupCodes, children: [
        "📥",
        " Kodları ",
        "İ",
        "ndir"
      ] })
    ] })
  ] })
] }), "TwoFactorTab");
const SessionsTab = /* @__PURE__ */ __name(({ sessions, revokeSession, revokeAllSessions }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tab-content", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sessions-header", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Aktif Oturumlar" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "revoke-all-btn", onClick: revokeAllSessions, children: "Tümünü Sonlandır" })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sessions-list", children: sessions.map((session) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "session-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "session-info", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "session-device", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "device-icon", children: session.device_type === "mobile" ? "📱" : "💻" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "device-details", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "device-name", children: session.device_name || "Bilinmeyen Cihaz" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "device-location", children: session.location || "Bilinmeyen Konum" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "session-meta", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "session-ip", children: [
          "IP: ",
          session.ip_address
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "session-time", children: [
          "Son Aktivite: ",
          new Date(session.last_activity).toLocaleString("tr-TR")
        ] })
      ] })
    ] }),
    session.is_current ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "current-badge", children: "Mevcut Oturum" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "revoke-btn", onClick: /* @__PURE__ */ __name(() => revokeSession(session.id), "onClick"), children: "Sonlandır" })
  ] }, session.id)) })
] }), "SessionsTab");
const IPWhitelistTab = /* @__PURE__ */ __name(({ ipWhitelist, newIp, setNewIp, addIPToWhitelist, removeIPFromWhitelist }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tab-content", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "IP Adresi Beyaz Listesi" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Sadece izin verilen IP adreslerinden giriş yapın" }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "add-ip", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "text",
        placeholder: "IP Adresi (örn: 192.168.1.1)",
        value: newIp,
        onChange: /* @__PURE__ */ __name((e) => setNewIp(e.target.value), "onChange"),
        className: "ip-input"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "add-btn", onClick: addIPToWhitelist, children: "+ Ekle" })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ip-list", children: ipWhitelist.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ip-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ip-info", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ip-address", children: item.ip_address }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ip-added", children: [
        "Eklendi: ",
        new Date(item.created_at).toLocaleDateString("tr-TR")
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "remove-btn", onClick: /* @__PURE__ */ __name(() => removeIPFromWhitelist(item.id), "onClick"), children: "Kaldır" })
  ] }, item.id)) })
] }), "IPWhitelistTab");
const SecuritySettingsPanel = /* @__PURE__ */ __name(({ onClose }) => {
  const api = useSecurityAPI();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "security-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "security-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "security-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
        "🔒",
        " Güvenlik Ayarları"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "✕" })
    ] }),
    api.securityStatus && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "security-status", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "status-icon", children: "🔐" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "status-label", children: "2FA:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `status-value ${api.twoFactorEnabled ? "active" : "inactive"}`, children: api.twoFactorEnabled ? "Aktif" : "Pasif" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "status-icon", children: "💻" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "status-label", children: "Aktif Oturumlar:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "status-value", children: api.sessions.length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "status-icon", children: "🌐" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "status-label", children: "IP Whitelist:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "status-value", children: api.ipWhitelist.length })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "security-tabs", children: [["2fa", "🔐 2FA"], ["sessions", "💻 Oturumlar"], ["ip", "🌐 IP Whitelist"]].map(([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: `tab-btn ${api.activeTab === key ? "active" : ""}`,
        onClick: /* @__PURE__ */ __name(() => api.setActiveTab(key), "onClick"),
        children: label
      },
      key
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "security-content", children: [
      api.activeTab === "2fa" && /* @__PURE__ */ jsxRuntimeExports.jsx(TwoFactorTab, { ...api }),
      api.activeTab === "sessions" && /* @__PURE__ */ jsxRuntimeExports.jsx(SessionsTab, { ...api }),
      api.activeTab === "ip" && /* @__PURE__ */ jsxRuntimeExports.jsx(IPWhitelistTab, { ...api })
    ] })
  ] }) });
}, "SecuritySettingsPanel");
export {
  SecuritySettingsPanel as default
};
