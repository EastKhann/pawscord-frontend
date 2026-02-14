var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { s as API_BASE_URL } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
import "./ui-vendor-iPoN0WGz.js";
const BADGE_DATA = {
  "early_supporter": { name: "Early Supporter", icon: "🌟", color: "#FFD700" },
  "premium": { name: "Premium", icon: "💎", color: "#a855f7" },
  "verified": { name: "Verified", icon: "✓", color: "#5865F2" },
  "developer": { name: "Developer", icon: "🛠️", color: "#3b82f6" },
  "bug_hunter": { name: "Bug Hunter", icon: "🐛", color: "#22c55e" },
  "top_contributor": { name: "Top Contributor", icon: "🏆", color: "#f59e0b" },
  "server_owner": { name: "Server Owner", icon: "👑", color: "#ef4444" },
  "moderator": { name: "Moderator", icon: "🛡️", color: "#10b981" },
  "artist": { name: "Artist", icon: "🎨", color: "#ec4899" },
  "streamer": { name: "Streamer", icon: "📺", color: "#8b5cf6" }
};
function useProfileCardEditor(onClose, onSave) {
  const [profile, setProfile] = reactExports.useState(null);
  const [themes, setThemes] = reactExports.useState([]);
  const [badges, setBadges] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [activeTab, setActiveTab] = reactExports.useState("appearance");
  const [formData, setFormData] = reactExports.useState({ banner: "", banner_color: "#5865F2", theme: "default", bio: "", links: [] });
  const [selectedBadges, setSelectedBadges] = reactExports.useState([]);
  const [newLink, setNewLink] = reactExports.useState({ name: "", url: "" });
  const API_URL = API_BASE_URL;
  const loadData = reactExports.useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const [profileRes, themesRes, badgesRes] = await Promise.all([
        fetch(`${API_URL}/profile/card/`, { headers: { "Authorization": `Bearer ${token}` } }),
        fetch(`${API_URL}/profile/themes/`, { headers: { "Authorization": `Bearer ${token}` } }),
        fetch(`${API_URL}/profile/badges/`, { headers: { "Authorization": `Bearer ${token}` } })
      ]);
      if (profileRes.ok) {
        const data = await profileRes.json();
        setProfile(data);
        setFormData({ banner: data.banner || "", banner_color: data.banner_color || "#5865F2", theme: data.theme || "default", bio: data.bio || "", links: data.links || [] });
        setSelectedBadges(data.badges || []);
      }
      if (themesRes.ok) {
        const d = await themesRes.json();
        setThemes(d.themes || []);
      }
      if (badgesRes.ok) {
        const d = await badgesRes.json();
        setBadges(d.badges || []);
      }
    } catch (e) {
      console.error("Failed to load data:", e);
    }
    setLoading(false);
  }, [API_URL]);
  const handleSave = /* @__PURE__ */ __name(async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("access_token");
      const profileRes = await fetch(`${API_URL}/profile/card/update/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      await fetch(`${API_URL}/profile/badges/set/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ badges: selectedBadges })
      });
      if (profileRes.ok) {
        onSave?.();
        onClose();
      }
    } catch (e) {
      console.error("Save failed:", e);
    }
    setSaving(false);
  }, "handleSave");
  const handleAddLink = /* @__PURE__ */ __name(async () => {
    if (!newLink.url) return;
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(`${API_URL}/profile/links/add/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(newLink)
      });
      if (res.ok) {
        const d = await res.json();
        setFormData((prev) => ({ ...prev, links: d.links }));
        setNewLink({ name: "", url: "" });
      }
    } catch (e) {
      console.error("Add link failed:", e);
    }
  }, "handleAddLink");
  const handleRemoveLink = /* @__PURE__ */ __name(async (index) => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(`${API_URL}/profile/links/${index}/remove/`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const d = await res.json();
        setFormData((prev) => ({ ...prev, links: d.links }));
      }
    } catch (e) {
      console.error("Remove link failed:", e);
    }
  }, "handleRemoveLink");
  const toggleBadge = /* @__PURE__ */ __name((badgeId) => {
    setSelectedBadges((prev) => {
      if (prev.includes(badgeId)) return prev.filter((id) => id !== badgeId);
      if (prev.length >= 3) return prev;
      return [...prev, badgeId];
    });
  }, "toggleBadge");
  reactExports.useEffect(() => {
    loadData();
  }, [loadData]);
  return {
    profile,
    themes,
    badges,
    loading,
    saving,
    activeTab,
    setActiveTab,
    formData,
    setFormData,
    selectedBadges,
    newLink,
    setNewLink,
    handleSave,
    handleAddLink,
    handleRemoveLink,
    toggleBadge
  };
}
__name(useProfileCardEditor, "useProfileCardEditor");
const ProfileCardEditor = /* @__PURE__ */ __name(({ onClose, onSave }) => {
  const e = useProfileCardEditor(onClose, onSave);
  if (e.loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "profile-editor-modal", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "editor-loading", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loading-spinner" }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "profile-editor-overlay", onClick: /* @__PURE__ */ __name((ev) => ev.target === ev.currentTarget && onClose(), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "profile-editor-modal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "editor-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
        "🎨",
        " Profil Kartı Düzenle"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "×" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "editor-tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: e.activeTab === "appearance" ? "active" : "", onClick: /* @__PURE__ */ __name(() => e.setActiveTab("appearance"), "onClick"), children: [
        "🎨",
        " Görünüm"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: e.activeTab === "badges" ? "active" : "", onClick: /* @__PURE__ */ __name(() => e.setActiveTab("badges"), "onClick"), children: [
        "🏅",
        " Rozetler"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: e.activeTab === "links" ? "active" : "", onClick: /* @__PURE__ */ __name(() => e.setActiveTab("links"), "onClick"), children: [
        "🔗",
        " Bağlantılar"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "editor-content", children: [
      e.activeTab === "appearance" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "appearance-tab", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Banner URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "url", placeholder: "https://...", value: e.formData.banner, onChange: /* @__PURE__ */ __name((ev) => e.setFormData((prev) => ({ ...prev, banner: ev.target.value })), "onChange") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Banner Rengi (resim yoksa)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "color-picker", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: e.formData.banner_color, onChange: /* @__PURE__ */ __name((ev) => e.setFormData((prev) => ({ ...prev, banner_color: ev.target.value })), "onChange") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: e.formData.banner_color })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Tema" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "theme-grid", children: e.themes.map((theme) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `theme-option ${e.formData.theme === theme.id ? "selected" : ""}`, onClick: /* @__PURE__ */ __name(() => e.setFormData((prev) => ({ ...prev, theme: theme.id })), "onClick"), style: { background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "theme-name", children: theme.id }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "theme-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { backgroundColor: theme.accent } }) })
          ] }, theme.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Biyografi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { placeholder: "Kendiniz hakkında bir şeyler yazın...", value: e.formData.bio, onChange: /* @__PURE__ */ __name((ev) => e.setFormData((prev) => ({ ...prev, bio: ev.target.value.slice(0, 500) })), "onChange"), rows: 4, maxLength: 500 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "char-count", children: [
            e.formData.bio.length,
            "/500"
          ] })
        ] })
      ] }),
      e.activeTab === "badges" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "badges-tab", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "badges-hint", children: "Profilinizde görüntülenecek en fazla 3 rozet seçin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "badges-grid", children: e.badges.map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `badge-option ${!badge.owned ? "locked" : ""} ${e.selectedBadges.includes(badge.id) ? "selected" : ""}`, onClick: /* @__PURE__ */ __name(() => badge.owned && e.toggleBadge(badge.id), "onClick"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-icon", style: { backgroundColor: badge.color }, children: badge.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-name", children: badge.name }),
          !badge.owned && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "lock-icon", children: "🔒" })
        ] }, badge.id)) })
      ] }),
      e.activeTab === "links" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "links-tab", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "links-hint", children: "En fazla 5 bağlantı ekleyebilirsiniz" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "current-links", children: e.formData.links.map((link, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "link-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "link-icon", children: link.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "link-name", children: link.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: link.url, target: "_blank", rel: "noopener noreferrer", className: "link-url", children: [
            link.url.slice(0, 40),
            "..."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "remove-link", onClick: /* @__PURE__ */ __name(() => e.handleRemoveLink(idx), "onClick"), children: "×" })
        ] }, idx)) }),
        e.formData.links.length < 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "add-link-form", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "İsim (opsiyonel)", value: e.newLink.name, onChange: /* @__PURE__ */ __name((ev) => e.setNewLink((prev) => ({ ...prev, name: ev.target.value })), "onChange") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "url", placeholder: "URL", value: e.newLink.url, onChange: /* @__PURE__ */ __name((ev) => e.setNewLink((prev) => ({ ...prev, url: ev.target.value })), "onChange") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: e.handleAddLink, children: "Ekle" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "editor-preview", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Önizleme" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileCard, { username: e.profile?.username, compact: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "editor-footer", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "cancel-btn", onClick: onClose, children: "İptal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "save-btn", onClick: e.handleSave, disabled: e.saving, children: e.saving ? "Kaydediliyor..." : "Kaydet" })
    ] })
  ] }) });
}, "ProfileCardEditor");
const ProfileCard = /* @__PURE__ */ __name(({ username, onEdit, compact = false }) => {
  const [profile, setProfile] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const API_URL = API_BASE_URL;
  reactExports.useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("access_token");
        const url = username ? `${API_URL}/profile/card/${username}/` : `${API_URL}/profile/card/`;
        const res = await fetch(url, { headers: { "Authorization": `Bearer ${token}` } });
        if (res.ok) setProfile(await res.json());
      } catch (e) {
        console.error("Failed to load profile:", e);
      }
      setLoading(false);
    })();
  }, [username, API_URL]);
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "profile-card loading", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loading-spinner" }) });
  if (!profile) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "profile-card error", children: "Profil yüklenemedi" });
  const colors = profile.custom_colors || profile.theme_colors;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `profile-card ${compact ? "compact" : ""}`, style: { "--primary": colors.primary, "--secondary": colors.secondary, "--accent": colors.accent, "--bg": colors.background }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-banner", style: { backgroundImage: profile.banner ? `url(${profile.banner})` : void 0, backgroundColor: profile.banner_color }, children: onEdit && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "edit-btn", onClick: onEdit, children: "✏️" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-avatar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: profile.avatar || "/default-avatar.png", alt: "" }),
      profile.status_text && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "status-indicator", title: profile.status_text, children: profile.status_text.slice(0, 1) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-content", children: [
      profile.badges?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-badges", children: profile.badges.map((badgeId) => {
        const badge = BADGE_DATA[badgeId];
        return badge ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge", style: { backgroundColor: badge.color }, title: badge.name, children: badge.icon }, badgeId) : null;
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "card-name", children: profile.display_name || profile.username }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "card-username", children: [
        "@",
        profile.username
      ] }),
      profile.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "card-bio", children: profile.bio }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-stats", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "stat-value", children: [
            "Lv.",
            profile.level
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Seviye" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: profile.xp?.toLocaleString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "XP" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: new Date(profile.created_at).toLocaleDateString("tr-TR", { month: "short", year: "numeric" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Katılım" })
        ] })
      ] }),
      profile.links?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-links", children: profile.links.map((link, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: link.url, target: "_blank", rel: "noopener noreferrer", className: "link-item", title: link.name, children: link.icon }, idx)) }),
      profile.spotify_connected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "spotify-badge", children: [
        "🎵",
        " Spotify Bağlı"
      ] }),
      profile.is_premium && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "premium-badge", children: [
        "💎",
        " Premium"
      ] })
    ] })
  ] });
}, "ProfileCard");
export {
  ProfileCard,
  ProfileCardEditor,
  ProfileCard as default
};
