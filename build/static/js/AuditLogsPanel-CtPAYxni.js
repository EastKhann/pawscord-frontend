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
const AuditLogsPanel = /* @__PURE__ */ __name(({ serverId, onClose }) => {
  const [logs, setLogs] = reactExports.useState([]);
  const [filters, setFilters] = reactExports.useState({
    action_type: "",
    // message_delete, message_edit, member_join, member_leave, role_change, channel_create, etc.
    user_id: "",
    target_user_id: "",
    channel_id: "",
    start_date: "",
    end_date: ""
  });
  const [loading, setLoading] = reactExports.useState(true);
  const [page, setPage] = reactExports.useState(1);
  const [hasMore, setHasMore] = reactExports.useState(true);
  const apiBaseUrl = getApiBase();
  reactExports.useEffect(() => {
    if (serverId) {
      fetchLogs();
    }
  }, [serverId, page]);
  const fetchLogs = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const params = new URLSearchParams({
        page,
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== ""))
      });
      const response = await fetch(`${apiBaseUrl}/audit-logs/server/${serverId}/?${params}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        if (page === 1) {
          setLogs(data.logs || []);
        } else {
          setLogs([...logs, ...data.logs || []]);
        }
        setHasMore(data.has_more || false);
      }
    } catch (error) {
      console.error("Error fetching audit logs:", error);
      y.error("❌ Audit logları yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, "fetchLogs");
  const applyFilters = /* @__PURE__ */ __name(() => {
    setPage(1);
    fetchLogs();
  }, "applyFilters");
  const clearFilters = /* @__PURE__ */ __name(() => {
    setFilters({
      action_type: "",
      user_id: "",
      target_user_id: "",
      channel_id: "",
      start_date: "",
      end_date: ""
    });
    setPage(1);
  }, "clearFilters");
  const exportLogs = /* @__PURE__ */ __name(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const params = new URLSearchParams({
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== ""))
      });
      const response = await fetch(`${apiBaseUrl}/audit-logs/server/${serverId}/export/?${params}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `audit_logs_${serverId}.csv`;
        a.click();
        y.success("✅ Audit logları dışa aktarıldı");
      }
    } catch (error) {
      console.error("Error exporting logs:", error);
      y.error("❌ Dışa aktarma başarısız");
    }
  }, "exportLogs");
  const getActionIcon = /* @__PURE__ */ __name((actionType) => {
    const icons = {
      "message_delete": "🗑️",
      "message_edit": "✏️",
      "member_join": "👋",
      "member_leave": "👋",
      "member_kick": "🚫",
      "member_ban": "🔨",
      "member_unban": "✅",
      "role_create": "🎭",
      "role_delete": "🗑️",
      "role_update": "🎨",
      "role_assign": "⭐",
      "role_remove": "➖",
      "channel_create": "➕",
      "channel_delete": "❌",
      "channel_update": "🔧",
      "server_update": "⚙️",
      "invite_create": "🔗",
      "webhook_create": "🤖",
      "webhook_delete": "🗑️",
      "emoji_create": "😀",
      "emoji_delete": "😢",
      "pin_add": "📌",
      "pin_remove": "📌",
      "reaction_add": "❤️",
      "reaction_remove": "💔"
    };
    return icons[actionType] || "📝";
  }, "getActionIcon");
  const getActionColor = /* @__PURE__ */ __name((actionType) => {
    if (actionType.includes("delete") || actionType.includes("remove") || actionType.includes("kick") || actionType.includes("ban")) {
      return "#ef4444";
    }
    if (actionType.includes("create") || actionType.includes("add") || actionType.includes("join")) {
      return "#10b981";
    }
    if (actionType.includes("edit") || actionType.includes("update")) {
      return "#f59e0b";
    }
    return "#6366f1";
  }, "getActionColor");
  const formatDate = /* @__PURE__ */ __name((dateString) => {
    const date = new Date(dateString);
    const now = /* @__PURE__ */ new Date();
    const diffInSeconds = Math.floor((now - date) / 1e3);
    if (diffInSeconds < 60) return "Az önce";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} dakika önce`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} saat önce`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} gün önce`;
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }, "formatDate");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "audit-logs-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "audit-logs-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "audit-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "📋 Audit Logs" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "×" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filters-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-grid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Aksiyon Türü" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: filters.action_type,
              onChange: /* @__PURE__ */ __name((e) => setFilters({ ...filters, action_type: e.target.value }), "onChange"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Tümü" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("optgroup", { label: "Mesajlar", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "message_delete", children: "Mesaj Silme" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "message_edit", children: "Mesaj Düzenleme" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pin_add", children: "Pin Ekleme" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pin_remove", children: "Pin Kaldırma" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("optgroup", { label: "Üyeler", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "member_join", children: "Üye Katıldı" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "member_leave", children: "Üye Ayrıldı" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "member_kick", children: "Üye Atıldı" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "member_ban", children: "Üye Banlandı" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "member_unban", children: "Ban Kaldırıldı" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("optgroup", { label: "Roller", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "role_create", children: "Rol Oluşturma" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "role_delete", children: "Rol Silme" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "role_update", children: "Rol Güncelleme" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "role_assign", children: "Rol Atama" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "role_remove", children: "Rol Kaldırma" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("optgroup", { label: "Kanallar", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "channel_create", children: "Kanal Oluşturma" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "channel_delete", children: "Kanal Silme" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "channel_update", children: "Kanal Güncelleme" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("optgroup", { label: "Diğer", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "server_update", children: "Sunucu Güncelleme" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "invite_create", children: "Davet Oluşturma" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "webhook_create", children: "Webhook Oluşturma" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "webhook_delete", children: "Webhook Silme" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "emoji_create", children: "Emoji Ekleme" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "emoji_delete", children: "Emoji Silme" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Başlangıç Tarihi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "datetime-local",
              value: filters.start_date,
              onChange: /* @__PURE__ */ __name((e) => setFilters({ ...filters, start_date: e.target.value }), "onChange")
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Bitiş Tarihi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "datetime-local",
              value: filters.end_date,
              onChange: /* @__PURE__ */ __name((e) => setFilters({ ...filters, end_date: e.target.value }), "onChange")
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Kullanıcı ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "Aksiyon yapan kullanıcı",
              value: filters.user_id,
              onChange: /* @__PURE__ */ __name((e) => setFilters({ ...filters, user_id: e.target.value }), "onChange")
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filter-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "filter-btn apply-btn", onClick: applyFilters, children: "🔍 Filtrele" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "filter-btn clear-btn", onClick: clearFilters, children: "🗑️ Temizle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "filter-btn export-btn", onClick: exportLogs, children: "📥 Dışa Aktar" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "logs-content", children: loading && logs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Loglar yükleniyor..." })
    ] }) : logs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "empty-icon", children: "📋" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Henüz audit log yok" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Sunucudaki aksiyonlar burada görünecek" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "logs-list", children: logs.map((log) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "log-entry",
          style: { borderLeftColor: getActionColor(log.action_type) },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "log-icon", style: { background: `${getActionColor(log.action_type)}20` }, children: getActionIcon(log.action_type) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "log-details", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "log-header-row", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "log-action", style: { color: getActionColor(log.action_type) }, children: log.action_display || log.action_type }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "log-time", children: formatDate(log.created_at) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "log-description", children: log.description || "Açıklama yok" }),
              log.metadata && Object.keys(log.metadata).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "log-metadata", children: Object.entries(log.metadata).map(([key, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "metadata-item", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "metadata-key", children: [
                  key,
                  ":"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "metadata-value", children: JSON.stringify(value) })
              ] }, key)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "log-footer", children: [
                log.user && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "log-user", children: [
                  "👤 ",
                  log.user.username || `User#${log.user.id}`
                ] }),
                log.channel && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "log-channel", children: [
                  "📢 #",
                  log.channel.name
                ] }),
                log.target_user && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "log-target", children: [
                  "🎯 ",
                  log.target_user.username
                ] })
              ] })
            ] })
          ]
        },
        log.id
      )) }),
      hasMore && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "load-more-btn",
          onClick: /* @__PURE__ */ __name(() => setPage(page + 1), "onClick"),
          disabled: loading,
          children: loading ? "⏳ Yükleniyor..." : "📄 Daha Fazla Yükle"
        }
      )
    ] }) })
  ] }) });
}, "AuditLogsPanel");
export {
  AuditLogsPanel as default
};
