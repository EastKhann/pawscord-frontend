var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { j as jsxRuntimeExports, r as reactExports } from "./react-core-BiY6fgAJ.js";
import { C as FaUser, a1 as FaShieldAlt, j as FaLink, ap as FaPalette, E as FaMicrophone, k as FaBell, bS as FaKeyboard, ax as FaGlobe, a8 as FaGamepad, af as FaDesktop, az as FaCog, ce as FaCamera, g as FaTrash, bV as FaSteam, bU as FaSpotify, cf as FaInstagram, cg as FaTwitter, bW as FaXbox, ch as FaPlaystation, bY as FaGithub, a9 as FaCheck, G as FaVolumeUp, bB as FaSignOutAlt, a as FaTimes } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const TABS = [
  { id: "account", label: "Hesabım", icon: FaUser, section: "KULLANICI AYARLARI" },
  { id: "privacy", label: "Gizlilik & Güvenlik", icon: FaShieldAlt, section: "KULLANICI AYARLARI" },
  { id: "connections", label: "Bağlantılar", icon: FaLink, section: "KULLANICI AYARLARI" },
  { id: "appearance", label: "Görünüm", icon: FaPalette, section: "UYGULAMA AYARLARI" },
  { id: "voice", label: "Ses & Video", icon: FaMicrophone, section: "UYGULAMA AYARLARI" },
  { id: "notifications", label: "Bildirimler", icon: FaBell, section: "UYGULAMA AYARLARI" },
  { id: "keybinds", label: "Kısayol Tuşları", icon: FaKeyboard, section: "UYGULAMA AYARLARI" },
  { id: "language", label: "Dil", icon: FaGlobe, section: "UYGULAMA AYARLARI" },
  { id: "activity", label: "Aktivite Durumu", icon: FaGamepad, section: "UYGULAMA AYARLARI" },
  { id: "devices", label: "Oturumlar", icon: FaDesktop, section: "UYGULAMA AYARLARI" },
  { id: "advanced", label: "Gelişmiş", icon: FaCog, section: "UYGULAMA AYARLARI" }
];
const S = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5e3
  },
  modal: {
    display: "flex",
    width: "95vw",
    maxWidth: 900,
    height: "85vh",
    backgroundColor: "#313338",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(0,0,0,0.5)"
  },
  sidebar: {
    width: 220,
    backgroundColor: "#2b2d31",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column"
  },
  sidebarScroll: {
    flex: 1,
    overflowY: "auto",
    padding: "12px 8px"
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: "#949ba4",
    padding: "8px 10px 4px",
    letterSpacing: "0.04em"
  },
  tabBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 10px",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
    textAlign: "left",
    transition: "all 0.1s",
    background: "transparent"
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    margin: "8px 10px"
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  },
  contentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    borderBottom: "1px solid rgba(255,255,255,0.06)"
  },
  closeBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    background: "none",
    border: "2px solid #949ba4",
    color: "#949ba4",
    width: 36,
    height: 36,
    borderRadius: "50%",
    cursor: "pointer",
    justifyContent: "center",
    fontSize: 14,
    transition: "all 0.15s"
  },
  contentBody: {
    flex: 1,
    overflowY: "auto",
    padding: "20px 24px"
  },
  actionBtn: {
    padding: "8px 16px",
    backgroundColor: "rgba(88,101,242,0.1)",
    border: "1px solid rgba(88,101,242,0.3)",
    borderRadius: 4,
    color: "#5865f2",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    gap: 8
  },
  themeBtn: {
    width: 100,
    height: 70,
    borderRadius: 8,
    border: "2px solid",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    transition: "border-color 0.15s"
  },
  kbd: {
    padding: "3px 8px",
    backgroundColor: "#1e1f22",
    borderRadius: 4,
    color: "#dcddde",
    fontSize: 12,
    fontFamily: "monospace",
    border: "1px solid rgba(255,255,255,0.08)"
  },
  volumeRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "8px 0"
  }
};
const SettingSection = /* @__PURE__ */ __name(({ title, children }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 24 }, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { color: "#fff", fontSize: 16, fontWeight: 700, marginBottom: 12 }, children: title }),
  children
] }), "SettingSection");
const SettingField = /* @__PURE__ */ __name(({ label, value, masked }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "12px 16px", backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 4 }, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, fontWeight: 700, color: "#949ba4", textTransform: "uppercase", marginBottom: 4 }, children: label }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#dcddde", fontSize: 14 }, children: masked ? "••••••••" : value })
] }), "SettingField");
const AccountTab = /* @__PURE__ */ __name(({ user, onAvatarChange }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(SettingSection, { title: "Profil", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { backgroundColor: "#1e1f22", borderRadius: 8, padding: 16 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 16 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: user?.avatar || "/default-avatar.png", alt: "", style: { width: 80, height: 80, borderRadius: "50%", border: "4px solid #2b2d31" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onAvatarChange,
            style: {
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 28,
              height: 28,
              borderRadius: "50%",
              backgroundColor: "#5865f2",
              border: "3px solid #1e1f22",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#fff",
              fontSize: 11
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCamera, {})
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#fff", fontWeight: 700, fontSize: 18 }, children: user?.display_name || user?.username }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: "#949ba4", fontSize: 14 }, children: [
          "@",
          user?.username
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingField, { label: "KULLANICI ADI", value: user?.username }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingField, { label: "E-POSTA", value: user?.email || "Ayarlanmamış", masked: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingField, { label: "TELEFON", value: user?.phone || "Eklenmemiş" })
    ] })
  ] }) }),
  /* @__PURE__ */ jsxRuntimeExports.jsx(SettingSection, { title: "Parola", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", style: S.actionBtn, children: "Parolayı Değiştir" }) }),
  /* @__PURE__ */ jsxRuntimeExports.jsx(SettingSection, { title: "Hesap Silme", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", style: { ...S.actionBtn, backgroundColor: "rgba(218,55,60,0.1)", color: "#da373c", borderColor: "#da373c" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}),
    " Hesabı Sil"
  ] }) })
] }), "AccountTab");
const ToggleSwitch = /* @__PURE__ */ __name(({ value, onChange, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#dcddde", fontSize: 14 }, children: label }),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: /* @__PURE__ */ __name(() => onChange(!value), "onClick"),
      style: {
        width: 44,
        height: 24,
        borderRadius: 12,
        border: "none",
        cursor: "pointer",
        backgroundColor: value ? "#3ba55c" : "#72767d",
        position: "relative",
        transition: "all 0.2s"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        width: 18,
        height: 18,
        borderRadius: "50%",
        backgroundColor: "#fff",
        position: "absolute",
        top: 3,
        left: value ? 23 : 3,
        transition: "left 0.2s"
      } })
    }
  )
] }), "ToggleSwitch");
const PrivacyTab = /* @__PURE__ */ __name(() => {
  const [dmFromServer, setDmFromServer] = reactExports.useState(true);
  const [friendRequests, setFriendRequests] = reactExports.useState(true);
  const [showActivity, setShowActivity] = reactExports.useState(true);
  const [readReceipts, setReadReceipts] = reactExports.useState(true);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingSection, { title: "DM & Arkadaş", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { label: "Sunucu üyelerinden DM al", value: dmFromServer, onChange: setDmFromServer }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { label: "Herkesten arkadaşlık isteği al", value: friendRequests, onChange: setFriendRequests })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingSection, { title: "Gizlilik", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { label: "Aktivite durumunu göster", value: showActivity, onChange: setShowActivity }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { label: "Okundu bilgisi gönder", value: readReceipts, onChange: setReadReceipts })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SettingSection, { title: "Veri", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", style: S.actionBtn, children: "Verilerimi İndir (GDPR)" }) })
  ] });
}, "PrivacyTab");
const CONNECTIONS = [
  { id: "steam", name: "Steam", icon: FaSteam, color: "#171a21" },
  { id: "spotify", name: "Spotify", icon: FaSpotify, color: "#1DB954" },
  { id: "instagram", name: "Instagram", icon: FaInstagram, color: "#E4405F" },
  { id: "twitter", name: "X (Twitter)", icon: FaTwitter, color: "#1DA1F2" },
  { id: "xbox", name: "Xbox", icon: FaXbox, color: "#107C10" },
  { id: "playstation", name: "PlayStation", icon: FaPlaystation, color: "#003791" },
  { id: "github", name: "GitHub", icon: FaGithub, color: "#333" }
];
const ConnectionsTab = /* @__PURE__ */ __name(() => {
  const [connectedIds, setConnectedIds] = reactExports.useState(() => {
    try {
      return JSON.parse(localStorage.getItem("pawscord_connections") || "[]");
    } catch {
      return [];
    }
  });
  const toggleConnection = /* @__PURE__ */ __name((id) => {
    setConnectedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id];
      localStorage.setItem("pawscord_connections", JSON.stringify(next));
      return next;
    });
  }, "toggleConnection");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingSection, { title: "Bağlı Hesaplar", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#949ba4", fontSize: 13, marginBottom: 16 }, children: "Profilinde gösterilecek bağlı hesaplarını yönet." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: CONNECTIONS.map((c) => {
      const isConnected = connectedIds.includes(c.id);
      const Icon = c.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 16px",
        backgroundColor: "#1e1f22",
        borderRadius: 8,
        border: isConnected ? `1px solid ${c.color}44` : "1px solid transparent"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { style: { fontSize: 24, color: isConnected ? c.color : "#949ba4" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#fff", fontSize: 14, fontWeight: 600 }, children: c.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: isConnected ? "#3ba55c" : "#949ba4", fontSize: 12 }, children: isConnected ? "✓ Bağlı" : "Bağlı değil" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: /* @__PURE__ */ __name(() => toggleConnection(c.id), "onClick"), style: {
          padding: "6px 16px",
          borderRadius: 4,
          border: "none",
          cursor: "pointer",
          fontSize: 13,
          fontWeight: 600,
          backgroundColor: isConnected ? "rgba(218,55,60,0.15)" : "rgba(88,101,242,0.15)",
          color: isConnected ? "#da373c" : "#5865f2"
        }, children: isConnected ? "Kaldır" : "Bağla" })
      ] }, c.id);
    }) })
  ] }) });
}, "ConnectionsTab");
const AppearanceTab = /* @__PURE__ */ __name(() => {
  const [theme, setTheme] = reactExports.useState("dark");
  const [fontSize, setFontSize] = reactExports.useState(16);
  const [compact, setCompact] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SettingSection, { title: "Tema", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 12 }, children: ["dark", "light", "amoled"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: /* @__PURE__ */ __name(() => setTheme(t), "onClick"), style: {
      ...S.themeBtn,
      borderColor: theme === t ? "#5865f2" : "rgba(255,255,255,0.1)",
      backgroundColor: t === "dark" ? "#36393f" : t === "light" ? "#fff" : "#000"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: t === "light" ? "#000" : "#fff", fontSize: 12, fontWeight: 600 }, children: t === "dark" ? "Koyu" : t === "light" ? "Açık" : "AMOLED" }),
      theme === t && /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { style: { color: "#5865f2", position: "absolute", top: 4, right: 4, fontSize: 10 } })
    ] }, t)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SettingSection, { title: "Yazı Boyutu", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#949ba4", fontSize: 12 }, children: "12px" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: 12, max: 24, value: fontSize, onChange: /* @__PURE__ */ __name((e) => setFontSize(+e.target.value), "onChange"), style: { flex: 1, accentColor: "#5865f2" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#949ba4", fontSize: 12 }, children: "24px" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#fff", fontSize: 14, fontWeight: 600, minWidth: 40 }, children: [
        fontSize,
        "px"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { label: "Kompakt Mod", value: compact, onChange: setCompact })
  ] });
}, "AppearanceTab");
const VoiceTab = /* @__PURE__ */ __name(() => {
  const [inputVolume, setInputVolume] = reactExports.useState(100);
  const [outputVolume, setOutputVolume] = reactExports.useState(100);
  const [noiseSuppression, setNoiseSuppression] = reactExports.useState(true);
  const [echoCancellation, setEchoCancellation] = reactExports.useState(true);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SettingSection, { title: "Ses Giriş", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.volumeRow, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaMicrophone, { style: { color: "#949ba4" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: 0, max: 200, value: inputVolume, onChange: /* @__PURE__ */ __name((e) => setInputVolume(+e.target.value), "onChange"), style: { flex: 1, accentColor: "#5865f2" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#fff", minWidth: 40, textAlign: "right" }, children: [
        inputVolume,
        "%"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SettingSection, { title: "Ses Çıkış", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.volumeRow, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaVolumeUp, { style: { color: "#949ba4" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: 0, max: 200, value: outputVolume, onChange: /* @__PURE__ */ __name((e) => setOutputVolume(+e.target.value), "onChange"), style: { flex: 1, accentColor: "#5865f2" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#fff", minWidth: 40, textAlign: "right" }, children: [
        outputVolume,
        "%"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingSection, { title: "Gelişmiş", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { label: "Gürültü Bastırma", value: noiseSuppression, onChange: setNoiseSuppression }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { label: "Yankı Önleme", value: echoCancellation, onChange: setEchoCancellation })
    ] })
  ] });
}, "VoiceTab");
const NotificationsTab = /* @__PURE__ */ __name(() => {
  const [desktop, setDesktop] = reactExports.useState(true);
  const [sound, setSound] = reactExports.useState(true);
  const [mentions, setMentions] = reactExports.useState(true);
  const [dms, setDms] = reactExports.useState(true);
  const [everyone, setEveryone] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingSection, { title: "Bildirim Ayarları", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { label: "Masaüstü Bildirimleri", value: desktop, onChange: setDesktop }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { label: "Bildirim Sesleri", value: sound, onChange: setSound }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { label: "Mention Bildirimleri", value: mentions, onChange: setMentions }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { label: "DM Bildirimleri", value: dms, onChange: setDms }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { label: "@everyone / @here Bildirimleri", value: everyone, onChange: setEveryone })
  ] }) });
}, "NotificationsTab");
const SHORTCUTS = [
  { keys: "Ctrl + K", desc: "Hızlı Geçiş" },
  { keys: "Ctrl + Shift + M", desc: "Mikrofon Aç/Kapa" },
  { keys: "Ctrl + Shift + D", desc: "Kulaklık Aç/Kapa" },
  { keys: "Ctrl + Enter", desc: "Mesaj Gönder" },
  { keys: "Shift + Enter", desc: "Yeni Satır" },
  { keys: "↑ (boş input)", desc: "Son Mesajı Düzenle" },
  { keys: "Escape", desc: "Düzenleme/Yanıt İptal" },
  { keys: "Ctrl + T", desc: "Şablonlar" },
  { keys: "Ctrl + B", desc: "Kalın Metin" },
  { keys: "Ctrl + I", desc: "İtalik Metin" },
  { keys: "Ctrl + U", desc: "Altı Çizili" }
];
const KeybindsTab = /* @__PURE__ */ __name(() => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingSection, { title: "Klavye Kısayolları", children: SHORTCUTS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#dcddde", fontSize: 14 }, children: s.desc }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { style: S.kbd, children: s.keys })
] }, i)) }) }), "KeybindsTab");
const LANGUAGES = [
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "zh", label: "中文", flag: "🇨🇳" }
];
const LanguageTab = /* @__PURE__ */ __name(() => {
  const [language, setLanguage] = reactExports.useState(() => localStorage.getItem("pawscord_language") || "tr");
  const selectLanguage = /* @__PURE__ */ __name((code) => {
    setLanguage(code);
    localStorage.setItem("pawscord_language", code);
  }, "selectLanguage");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingSection, { title: "Uygulama Dili", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#949ba4", fontSize: 13, marginBottom: 16 }, children: "Pawscord arayüzünün dilini seç." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 4 }, children: LANGUAGES.map((lang) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: /* @__PURE__ */ __name(() => selectLanguage(lang.code), "onClick"), style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      width: "100%",
      padding: "10px 16px",
      border: "none",
      borderRadius: 4,
      cursor: "pointer",
      backgroundColor: language === lang.code ? "rgba(88,101,242,0.15)" : "transparent",
      textAlign: "left",
      transition: "background 0.15s"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 20 }, children: lang.flag }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: language === lang.code ? "#5865f2" : "#dcddde", fontSize: 14, fontWeight: language === lang.code ? 600 : 400 }, children: lang.label }),
      language === lang.code && /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { style: { marginLeft: "auto", color: "#5865f2", fontSize: 12 } })
    ] }, lang.code)) })
  ] }) });
}, "LanguageTab");
const createToggle = /* @__PURE__ */ __name((key, setter) => (val) => {
  setter(val);
  localStorage.setItem(key, val.toString());
}, "createToggle");
const ActivityTab = /* @__PURE__ */ __name(() => {
  const [showActivity, setShowActivity] = reactExports.useState(() => localStorage.getItem("pawscord_show_activity") !== "false");
  const [showGame, setShowGame] = reactExports.useState(() => localStorage.getItem("pawscord_show_game") !== "false");
  const [showSpotify, setShowSpotify] = reactExports.useState(() => localStorage.getItem("pawscord_show_spotify") !== "false");
  const [showStatus, setShowStatus] = reactExports.useState(() => localStorage.getItem("pawscord_show_status") !== "false");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingSection, { title: "Aktivite Gizliliği", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#949ba4", fontSize: 13, marginBottom: 12 }, children: "Diğer kullanıcıların ne gördüğünü kontrol et." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { label: "Aktivite durumunu göster", value: showActivity, onChange: createToggle("pawscord_show_activity", setShowActivity) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { label: "Oynadığım oyunu göster", value: showGame, onChange: createToggle("pawscord_show_game", setShowGame) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { label: "Spotify dinlediğimi göster", value: showSpotify, onChange: createToggle("pawscord_show_spotify", setShowSpotify) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { label: "Özel durum mesajını göster", value: showStatus, onChange: createToggle("pawscord_show_status", setShowStatus) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SettingSection, { title: "Oyun Algılama", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: 16, backgroundColor: "#1e1f22", borderRadius: 8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaGamepad, { style: { color: "#5865f2", fontSize: 24 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#fff", fontSize: 14, fontWeight: 600 }, children: "Otomatik Algılama" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#949ba4", fontSize: 12 }, children: "Çalışan uygulamalar otomatik algılanır (Electron/APK)" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { label: "Oyun algılamayı etkinleştir", value: showGame, onChange: createToggle("pawscord_show_game", setShowGame) })
    ] }) })
  ] });
}, "ActivityTab");
const DevicesTab = /* @__PURE__ */ __name(() => {
  const [sessions] = reactExports.useState([
    {
      id: 1,
      device: "💻 Windows PC",
      browser: "Chrome 132",
      ip: "88.238.xx.xxx",
      location: "İstanbul, Türkiye",
      lastActive: "Şu an aktif",
      current: true
    },
    {
      id: 2,
      device: "📱 Android",
      browser: "Chrome Mobile 144",
      ip: "88.238.xx.xxx",
      location: "İstanbul, Türkiye",
      lastActive: "2 saat önce",
      current: false
    }
  ]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingSection, { title: "Aktif Oturumlar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#949ba4", fontSize: 13, marginBottom: 16 }, children: "Hesabınızın giriş yaptığı cihazlar." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: sessions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        padding: "14px 16px",
        backgroundColor: "#1e1f22",
        borderRadius: 8,
        border: s.current ? "1px solid rgba(59,165,92,0.3)" : "1px solid transparent"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: "#fff", fontSize: 15, fontWeight: 600, marginBottom: 4 }, children: [
            s.device,
            " ",
            s.current && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#3ba55c", fontSize: 11, fontWeight: 400 }, children: [
              "●",
              " Şu anki oturum"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#949ba4", fontSize: 13 }, children: s.browser }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: "#949ba4", fontSize: 12, marginTop: 4 }, children: [
            s.location,
            " ",
            "•",
            " ",
            s.ip,
            " ",
            "•",
            " ",
            s.lastActive
          ] })
        ] }),
        !s.current && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", style: {
          padding: "6px 12px",
          borderRadius: 4,
          border: "none",
          cursor: "pointer",
          backgroundColor: "rgba(218,55,60,0.15)",
          color: "#da373c",
          fontSize: 12,
          fontWeight: 600
        }, children: "Sonlandır" })
      ] }) }, s.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SettingSection, { title: "", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", style: {
      ...S.actionBtn,
      backgroundColor: "rgba(218,55,60,0.1)",
      color: "#da373c",
      borderColor: "#da373c"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaDesktop, { style: { fontSize: 14 } }),
      " Diğer Tüm Oturumları Sonlandır"
    ] }) })
  ] });
}, "DevicesTab");
const AdvancedTab = /* @__PURE__ */ __name(() => {
  const [devMode, setDevMode] = reactExports.useState(() => localStorage.getItem("pawscord_dev_mode") === "true");
  const [hwAccel, setHwAccel] = reactExports.useState(() => localStorage.getItem("pawscord_hw_accel") !== "false");
  const [reducedMotion, setReducedMotion] = reactExports.useState(() => localStorage.getItem("pawscord_reduced_motion") === "true");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingSection, { title: "Geliştirici Modu", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#949ba4", fontSize: 13, marginBottom: 8 }, children: "ID'leri kopyalama ve hata ayıklama araçlarına erişim sağlar." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { label: "Geliştirici modunu etkinleştir", value: devMode, onChange: createToggle("pawscord_dev_mode", setDevMode) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingSection, { title: "Performans", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { label: "Donanım hızlandırma", value: hwAccel, onChange: createToggle("pawscord_hw_accel", setHwAccel) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, { label: "Azaltılmış hareket (animasyonları kapat)", value: reducedMotion, onChange: createToggle("pawscord_reduced_motion", setReducedMotion) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SettingSection, { title: "Önbellek", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 8 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: /* @__PURE__ */ __name(() => {
      if (window.caches) {
        window.caches.keys().then((names) => names.forEach((n) => window.caches.delete(n)));
      }
      localStorage.removeItem("pawscord_msg_cache");
      toast.info("Önbellek temizlendi!");
    }, "onClick"), style: S.actionBtn, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, { style: { fontSize: 12 } }),
      " Önbelleği Temizle"
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SettingSection, { title: "Hata Ayıklama", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: 12, backgroundColor: "#1e1f22", borderRadius: 8, fontFamily: "monospace", fontSize: 12, color: "#949ba4" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "App Version: ",
        window.__PAWSCORD_VERSION__ || "2.0.0"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "Build: ",
        document.querySelector('script[src*="index-"]')?.src?.match(/index-(\w+)/)?.[1] || "dev"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "Platform: ",
        navigator.userAgent.includes("Electron") ? "Desktop" : navigator.userAgent.includes("Android") ? "Android" : "Web"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "Service Worker: ",
        navigator.serviceWorker?.controller ? "Active" : "Inactive"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "Memory: ",
        navigator.deviceMemory ? `${navigator.deviceMemory} GB` : "N/A"
      ] })
    ] }) })
  ] });
}, "AdvancedTab");
const TAB_COMPONENTS = {
  account: AccountTab,
  privacy: PrivacyTab,
  connections: ConnectionsTab,
  appearance: AppearanceTab,
  voice: VoiceTab,
  notifications: NotificationsTab,
  keybinds: KeybindsTab,
  language: LanguageTab,
  activity: ActivityTab,
  devices: DevicesTab,
  advanced: AdvancedTab
};
const UserSettingsModal = /* @__PURE__ */ __name(({ onClose, user }) => {
  const [activeTab, setActiveTab] = reactExports.useState("account");
  reactExports.useEffect(() => {
    const handler = /* @__PURE__ */ __name((e) => {
      if (e.key === "Escape") onClose();
    }, "handler");
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);
  const ActiveComponent = TAB_COMPONENTS[activeTab] || AccountTab;
  const sections = {};
  TABS.forEach((tab) => {
    if (!sections[tab.section]) sections[tab.section] = [];
    sections[tab.section].push(tab);
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.sidebar, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.sidebarScroll, children: [
      Object.entries(sections).map(([section, tabs]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.sectionLabel, children: section }),
        tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              style: {
                ...S.tabBtn,
                backgroundColor: isActive ? "rgba(88,101,242,0.2)" : "transparent",
                color: isActive ? "#fff" : "#949ba4"
              },
              onClick: /* @__PURE__ */ __name(() => setActiveTab(tab.id), "onClick"),
              onMouseEnter: /* @__PURE__ */ __name((e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
              }, "onMouseEnter"),
              onMouseLeave: /* @__PURE__ */ __name((e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
              }, "onMouseLeave"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { style: { fontSize: 14, flexShrink: 0 } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tab.label })
              ]
            },
            tab.id
          );
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.divider })
      ] }, section)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", style: { ...S.tabBtn, color: "#da373c" }, onClick: onClose, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaSignOutAlt, { style: { fontSize: 14 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Çıkış Yap" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.content, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.contentHeader, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { color: "#fff", fontSize: 20, fontWeight: 700, margin: 0 }, children: TABS.find((t) => t.id === activeTab)?.label || "Ayarlar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", style: S.closeBtn, onClick: onClose, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 11, color: "#949ba4" }, children: "ESC" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.contentBody, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActiveComponent, { user }) })
    ] })
  ] }) });
}, "UserSettingsModal");
const UserSettingsModal_default = reactExports.memo(UserSettingsModal);
export {
  UserSettingsModal_default as default
};
