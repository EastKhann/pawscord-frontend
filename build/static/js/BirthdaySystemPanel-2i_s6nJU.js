var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { y } from "./ui-vendor-iPoN0WGz.js";
import { g as getApiBase } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
const BirthdaySystemPanel = /* @__PURE__ */ __name(({ serverId, onClose }) => {
  const apiBaseUrl = getApiBase();
  const [config, setConfig] = reactExports.useState({
    enabled: false,
    announcement_channel_id: "",
    birthday_role_id: "",
    message_template: "🎉 Bugün @{user}'un doğum günü! Mutlu yıllar! 🎂",
    give_role: true,
    remove_role_after_day: true
  });
  const [birthdays, setBirthdays] = reactExports.useState([]);
  const [upcomingBirthdays, setUpcomingBirthdays] = reactExports.useState([]);
  const [channels, setChannels] = reactExports.useState([]);
  const [roles, setRoles] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    fetchConfig();
    fetchBirthdays();
    fetchChannels();
    fetchRoles();
  }, [serverId]);
  const fetchConfig = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/birthday-system/server/${serverId}/config/`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("access_token")}` }
      });
      if (response.ok) {
        const data = await response.json();
        setConfig(data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }, "fetchConfig");
  const fetchBirthdays = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/birthday-system/server/${serverId}/birthdays/`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("access_token")}` }
      });
      if (response.ok) {
        const data = await response.json();
        setBirthdays(data.all_birthdays);
        setUpcomingBirthdays(data.upcoming);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, "fetchBirthdays");
  const fetchChannels = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/channels/server/${serverId}/`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("access_token")}` }
      });
      if (response.ok) {
        const data = await response.json();
        setChannels(data.filter((ch) => ch.type === "text"));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, "fetchChannels");
  const fetchRoles = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/roles/server/${serverId}/`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("access_token")}` }
      });
      if (response.ok) {
        const data = await response.json();
        setRoles(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, "fetchRoles");
  const saveConfig = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/birthday-system/server/${serverId}/config/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(config)
      });
      if (response.ok) {
        y.success("✅ Ayarlar kaydedildi");
      } else {
        y.error("❌ Kaydetme hatası");
      }
    } catch (error) {
      y.error("❌ Bağlantı hatası");
    }
  }, "saveConfig");
  const testMessage = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/birthday-system/server/${serverId}/test/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${localStorage.getItem("access_token")}` }
      });
      if (response.ok) {
        y.success("✅ Test mesajı gönderildi");
      }
    } catch (error) {
      y.error("❌ Gönderim hatası");
    }
  }, "testMessage");
  const formatBirthday = /* @__PURE__ */ __name((date) => {
    const d = new Date(date);
    return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long" });
  }, "formatBirthday");
  const getDaysUntil = /* @__PURE__ */ __name((date) => {
    const now = /* @__PURE__ */ new Date();
    const birthday = new Date(date);
    birthday.setFullYear(now.getFullYear());
    if (birthday < now) birthday.setFullYear(now.getFullYear() + 1);
    const diff = Math.ceil((birthday - now) / (1e3 * 60 * 60 * 24));
    return diff;
  }, "getDaysUntil");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "birthday-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "birthday-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "birthday-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "🎂 Doğum Günü Sistemi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "×" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "birthday-content", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Yükleniyor..." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "config-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "⚙️ Ayarlar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "toggle-switch", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: config.enabled, onChange: /* @__PURE__ */ __name((e) => setConfig({ ...config, enabled: e.target.checked }), "onChange") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "toggle-slider" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "config-grid", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "📢 Duyuru Kanalı" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: config.announcement_channel_id, onChange: /* @__PURE__ */ __name((e) => setConfig({ ...config, announcement_channel_id: e.target.value }), "onChange"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Seçin" }),
              channels.map((ch) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: ch.id, children: [
                "# ",
                ch.name
              ] }, ch.id))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "🎭 Doğum Günü Rolü" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: config.birthday_role_id, onChange: /* @__PURE__ */ __name((e) => setConfig({ ...config, birthday_role_id: e.target.value }), "onChange"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Yok" }),
              roles.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: r.id, children: [
                "@",
                r.name
              ] }, r.id))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group full-width", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "💬 Mesaj Şablonu" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: config.message_template, onChange: /* @__PURE__ */ __name((e) => setConfig({ ...config, message_template: e.target.value }), "onChange"), rows: "2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
              "Kullanılabilir: ",
              "{user}",
              ", ",
              "{age}",
              ", ",
              "{server}"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "checkbox-label", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: config.give_role, onChange: /* @__PURE__ */ __name((e) => setConfig({ ...config, give_role: e.target.checked }), "onChange") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Doğum günü rolü ver" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "checkbox-label", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: config.remove_role_after_day, onChange: /* @__PURE__ */ __name((e) => setConfig({ ...config, remove_role_after_day: e.target.checked }), "onChange") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Bir gün sonra rolü kaldır" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "config-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "save-btn", onClick: saveConfig, children: "💾 Kaydet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "test-btn", onClick: testMessage, children: "✉️ Test Mesajı" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "upcoming-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "📅 Yaklaşan Doğum Günleri" }),
        upcomingBirthdays.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-small", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Yaklaşan doğum günü yok" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "upcoming-list", children: upcomingBirthdays.map((bd) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "upcoming-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "upcoming-avatar", children: bd.user_avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: bd.user_avatar, alt: "" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "default-avatar", children: "👤" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "upcoming-info", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: bd.user_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: formatBirthday(bd.birthday) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "upcoming-days", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "days-badge", children: [
            getDaysUntil(bd.birthday),
            " gün"
          ] }) })
        ] }, bd.user_id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "all-birthdays-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
          "📋 Tüm Doğum Günleri (",
          birthdays.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "birthdays-grid", children: birthdays.map((bd) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "birthday-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "user-name", children: bd.user_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "birthday-date", children: formatBirthday(bd.birthday) })
        ] }, bd.user_id)) })
      ] })
    ] }) })
  ] }) });
}, "BirthdaySystemPanel");
export {
  BirthdaySystemPanel as default
};
