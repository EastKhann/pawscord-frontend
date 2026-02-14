var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { y } from "./ui-vendor-iPoN0WGz.js";
import { g as getApiBase, d as confirmDialog } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
const DEFAULT_SETTINGS = {
  allow_dm_from_everyone: true,
  allow_dm_from_friends_only: false,
  allow_dm_from_server_members: true,
  allow_friend_requests: true,
  keep_dm_history_on_server_leave: true,
  show_current_activity: true,
  explicit_content_filter: "friends",
  blocked_words_filter_enabled: false,
  show_online_status: true,
  show_read_receipts: true,
  show_typing_indicator: true,
  allow_profile_views_from_non_friends: false,
  allow_data_collection: false,
  allow_personalized_ads: false
};
function usePrivacySettings() {
  const [settings, setSettings] = reactExports.useState(DEFAULT_SETTINGS);
  const [blockedWords, setBlockedWords] = reactExports.useState([]);
  const [newWord, setNewWord] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(true);
  const apiBaseUrl = getApiBase();
  const authHeaders = /* @__PURE__ */ __name((json = false) => {
    const h = { "Authorization": `Bearer ${localStorage.getItem("access_token")}` };
    if (json) h["Content-Type"] = "application/json";
    return h;
  }, "authHeaders");
  reactExports.useEffect(() => {
    Promise.all([
      fetch(`${apiBaseUrl}/privacy/settings/`, { headers: authHeaders() }).then((r) => r.ok ? r.json() : null),
      fetch(`${apiBaseUrl}/privacy/blocked-words/`, { headers: authHeaders() }).then((r) => r.ok ? r.json() : null)
    ]).then(([sData, wData]) => {
      if (sData) setSettings(sData);
      if (wData) setBlockedWords(wData.blocked_words || []);
    }).catch((e) => console.error("Error fetching privacy settings:", e)).finally(() => setLoading(false));
  }, []);
  const updateSettings = /* @__PURE__ */ __name(async (newSettings) => {
    try {
      const res = await fetch(`${apiBaseUrl}/privacy/settings/update/`, { method: "POST", headers: authHeaders(true), body: JSON.stringify(newSettings) });
      if (res.ok) {
        setSettings(newSettings);
        y.success("✅ Gizlilik ayarları kaydedildi");
      } else y.error("❌ Ayarlar kaydedilemedi");
    } catch {
      y.error("❌ Bağlantı hatası");
    }
  }, "updateSettings");
  const toggleSetting = /* @__PURE__ */ __name((key) => updateSettings({ ...settings, [key]: !settings[key] }), "toggleSetting");
  const updateExplicitFilter = /* @__PURE__ */ __name((value) => updateSettings({ ...settings, explicit_content_filter: value }), "updateExplicitFilter");
  const addBlockedWord = /* @__PURE__ */ __name(async () => {
    if (!newWord.trim()) return;
    try {
      const res = await fetch(`${apiBaseUrl}/privacy/blocked-words/add/`, { method: "POST", headers: authHeaders(true), body: JSON.stringify({ word: newWord.trim() }) });
      if (res.ok) {
        setBlockedWords((p) => [...p, newWord.trim()]);
        y.success(`✅ "${newWord.trim()}" engellenmiş kelimeler listesine eklendi`);
        setNewWord("");
      } else y.error("❌ Kelime eklenemedi");
    } catch {
      y.error("❌ Bağlantı hatası");
    }
  }, "addBlockedWord");
  const removeBlockedWord = /* @__PURE__ */ __name(async (word) => {
    try {
      const res = await fetch(`${apiBaseUrl}/privacy/blocked-words/remove/`, { method: "POST", headers: authHeaders(true), body: JSON.stringify({ word }) });
      if (res.ok) {
        setBlockedWords((p) => p.filter((w) => w !== word));
        y.success(`✅ "${word}" engellenmiş kelimeler listesinden kaldırıldı`);
      } else y.error("❌ Kelime kaldırılamadı");
    } catch {
      y.error("❌ Bağlantı hatası");
    }
  }, "removeBlockedWord");
  const requestDataExport = /* @__PURE__ */ __name(async () => {
    if (!await confirmDialog("Verilerinizi dışa aktarmak istediğinizden emin misiniz? Bu işlem biraz zaman alabilir.")) return;
    try {
      const res = await fetch(`${apiBaseUrl}/privacy/data-export/request/`, { method: "POST", headers: authHeaders() });
      res.ok ? y.success("✅ Veri dışa aktarma işlemi başlatıldı. E-postanıza link gönderilecek.") : y.error("❌ İstek gönderilemedi");
    } catch {
      y.error("❌ Bağlantı hatası");
    }
  }, "requestDataExport");
  return { settings, loading, blockedWords, newWord, setNewWord, toggleSetting, updateExplicitFilter, addBlockedWord, removeBlockedWord, requestDataExport };
}
__name(usePrivacySettings, "usePrivacySettings");
const SECTIONS = [
  {
    title: "💬 Direkt Mesaj Gizliliği",
    toggles: [
      { key: "allow_dm_from_everyone", label: "Herkesten DM alabilir", desc: "Sunucu üyesi olmasalar bile" },
      { key: "allow_dm_from_friends_only", label: "Sadece arkadaşlardan DM", desc: "Yalnızca arkadaşlarınızdan mesaj alabilirsiniz" },
      { key: "allow_dm_from_server_members", label: "Sunucu üyelerinden DM", desc: "Aynı sunucudaki üyelerden mesaj alabilirsiniz" },
      { key: "allow_friend_requests", label: "Arkadaşlık isteklerini kabul et", desc: "Diğer kullanıcılar size istek gönderebilir" }
    ]
  },
  {
    title: "🏠 Sunucu Gizliliği",
    toggles: [
      { key: "keep_dm_history_on_server_leave", label: "Sunucudan ayrılırken DM geçmişini sakla", desc: "Sunucudan ayrıldıktan sonra DM'ler silinmez" },
      { key: "show_current_activity", label: "Mevcut aktiviteyi göster", desc: "Oynadığınız oyun veya dinlediğiniz müziği gösterin" }
    ]
  },
  {
    title: "👁️ Görünürlük",
    toggles: [
      { key: "show_online_status", label: "Çevrimiçi durumu göster", desc: "Diğer kullanıcılar çevrimiçi olduğunuzu görebilir" },
      { key: "show_read_receipts", label: "Okundu bilgisi gönder", desc: "Mesajları okudunuzda karşı tarafa bildirim gösterilir" },
      { key: "show_typing_indicator", label: "Yazıyor göstergesini göster", desc: "Mesaj yazarken karşı tarafa bildirim gösterilir" },
      { key: "allow_profile_views_from_non_friends", label: "Arkadaş olmayanlar profilimi görebilir", desc: "Herkes profilinizi görüntüleyebilir" }
    ]
  },
  {
    title: "📊 Veri Gizliliği",
    toggles: [
      { key: "allow_data_collection", label: "Veri toplamaya izin ver", desc: "Uygulamayı geliştirmek için anonim kullanım verisi toplanır" },
      { key: "allow_personalized_ads", label: "Kişiselleştirilmiş reklamlara izin ver", desc: "Size özel reklamlar gösterilir" }
    ],
    hasExport: true
  }
];
const ToggleItem = /* @__PURE__ */ __name(({ label, desc, checked, onChange }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-item", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-info", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "setting-label", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "setting-desc", children: desc })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "toggle-switch", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked, onChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "slider" })
  ] })
] }), "ToggleItem");
const PrivacySettingsPanel = /* @__PURE__ */ __name(({ onClose }) => {
  const p = usePrivacySettings();
  if (p.loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "privacy-settings-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "privacy-settings-panel", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Gizlilik ayarları yükleniyor..." })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "privacy-settings-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "privacy-settings-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "privacy-settings-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
        "🔒",
        " Gizlilik ve Güvenlik Ayarları"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "×" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "privacy-settings-content", children: [
      SECTIONS.map((section, si) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: section.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "settings-group", children: section.toggles.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleItem, { label: t.label, desc: t.desc, checked: p.settings[t.key], onChange: /* @__PURE__ */ __name(() => p.toggleSetting(t.key), "onChange") }, t.key)) }),
        section.hasExport && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "export-data-btn", onClick: p.requestDataExport, children: [
          "📥",
          " Verilerimi Dışa Aktar"
        ] })
      ] }, si)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
          "🛡️",
          " Mesaj Filtreleme"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "setting-info", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "setting-label", children: "Açık içerik filtresi" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "setting-desc", children: "Mesajlardaki müstehcen içeriği otomatik tara" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "explicit-filter-select", value: p.settings.explicit_content_filter, onChange: /* @__PURE__ */ __name((e) => p.updateExplicitFilter(e.target.value), "onChange"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "none", children: "Kapalı" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "friends", children: "Arkadaşlar hariç" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Herkesten tara" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleItem, { label: "Engellenmiş kelime filtresi", desc: "Belirlediğiniz kelimeleri içeren mesajları gizleyin", checked: p.settings.blocked_words_filter_enabled, onChange: /* @__PURE__ */ __name(() => p.toggleSetting("blocked_words_filter_enabled"), "onChange") })
        ] }),
        p.settings.blocked_words_filter_enabled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "blocked-words-section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Engellenmiş Kelimeler" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "add-word-form", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Engellenecek kelime...", value: p.newWord, onChange: /* @__PURE__ */ __name((e) => p.setNewWord(e.target.value), "onChange"), onKeyPress: /* @__PURE__ */ __name((e) => e.key === "Enter" && p.addBlockedWord(), "onKeyPress") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "add-word-btn", onClick: p.addBlockedWord, children: [
              "➕",
              " Ekle"
            ] })
          ] }),
          p.blockedWords.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "blocked-words-list", children: p.blockedWords.map((word, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "blocked-word-item", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: word }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "remove-word-btn", onClick: /* @__PURE__ */ __name(() => p.removeBlockedWord(word), "onClick"), children: "✕" })
          ] }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "empty-state", children: "Henüz engellenmiş kelime yok" })
        ] })
      ] })
    ] })
  ] }) });
}, "PrivacySettingsPanel");
export {
  PrivacySettingsPanel as default
};
