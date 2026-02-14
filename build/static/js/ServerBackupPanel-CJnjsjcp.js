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
const ServerBackupPanel = /* @__PURE__ */ __name(({ serverId, onClose }) => {
  const apiBaseUrl = getApiBase();
  const [backups, setBackups] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [creating, setCreating] = reactExports.useState(false);
  const [backupOptions, setBackupOptions] = reactExports.useState({
    include_channels: true,
    include_roles: true,
    include_messages: false,
    include_settings: true,
    include_emojis: true
  });
  reactExports.useEffect(() => {
    fetchBackups();
  }, [serverId]);
  const fetchBackups = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/backups/server/${serverId}/`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("access_token")}` }
      });
      if (response.ok) {
        const data = await response.json();
        setBackups(data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }, "fetchBackups");
  const createBackup = /* @__PURE__ */ __name(async () => {
    setCreating(true);
    try {
      const response = await fetch(`${apiBaseUrl}/backups/create/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ server_id: serverId, ...backupOptions })
      });
      if (response.ok) {
        y.success("✅ Yedek oluşturuluyor...");
        fetchBackups();
      } else {
        y.error("❌ Yedek oluşturulamadı");
      }
    } catch (error) {
      y.error("❌ Bağlantı hatası");
    } finally {
      setCreating(false);
    }
  }, "createBackup");
  const restoreBackup = /* @__PURE__ */ __name(async (backupId) => {
    if (!await confirmDialog("Sunucuyu bu yedeğe geri yüklemek istediğinize emin misiniz? Bu işlem geri alınamaz!")) return;
    try {
      const response = await fetch(`${apiBaseUrl}/backups/${backupId}/restore/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${localStorage.getItem("access_token")}` }
      });
      if (response.ok) {
        y.success("✅ Sunucu geri yükleniyor...");
      } else {
        y.error("❌ Geri yükleme hatası");
      }
    } catch (error) {
      y.error("❌ Bağlantı hatası");
    }
  }, "restoreBackup");
  const downloadBackup = /* @__PURE__ */ __name(async (backupId) => {
    try {
      const response = await fetch(`${apiBaseUrl}/backups/${backupId}/download/`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("access_token")}` }
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `backup_${backupId}.json`;
        a.click();
        y.success("✅ Yedek indiriliyor");
      }
    } catch (error) {
      y.error("❌ İndirme hatası");
    }
  }, "downloadBackup");
  const deleteBackup = /* @__PURE__ */ __name(async (backupId) => {
    if (!await confirmDialog("Yedeği silmek istediğinize emin misiniz?")) return;
    try {
      const response = await fetch(`${apiBaseUrl}/backups/${backupId}/delete/`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${localStorage.getItem("access_token")}` }
      });
      if (response.ok) {
        y.success("✅ Yedek silindi");
        fetchBackups();
      }
    } catch (error) {
      y.error("❌ Silme hatası");
    }
  }, "deleteBackup");
  const formatFileSize = /* @__PURE__ */ __name((bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  }, "formatFileSize");
  const getStatusBadge = /* @__PURE__ */ __name((status) => {
    const badges = {
      completed: { text: "Tamamlandı", color: "#22c55e", icon: "✅" },
      processing: { text: "İşleniyor", color: "#f59e0b", icon: "⏳" },
      failed: { text: "Başarısız", color: "#ef4444", icon: "❌" }
    };
    return badges[status] || badges.processing;
  }, "getStatusBadge");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "backup-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "backup-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "backup-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "💾 Sunucu Yedekleme" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "×" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "backup-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "create-backup-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Yeni Yedek Oluştur" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "backup-options", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "option-label", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: backupOptions.include_channels, onChange: /* @__PURE__ */ __name((e) => setBackupOptions({ ...backupOptions, include_channels: e.target.checked }), "onChange") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📁 Kanalları dahil et" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "option-label", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: backupOptions.include_roles, onChange: /* @__PURE__ */ __name((e) => setBackupOptions({ ...backupOptions, include_roles: e.target.checked }), "onChange") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🎭 Rolleri dahil et" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "option-label", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: backupOptions.include_messages, onChange: /* @__PURE__ */ __name((e) => setBackupOptions({ ...backupOptions, include_messages: e.target.checked }), "onChange") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "💬 Mesajları dahil et (son 100)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "option-label", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: backupOptions.include_settings, onChange: /* @__PURE__ */ __name((e) => setBackupOptions({ ...backupOptions, include_settings: e.target.checked }), "onChange") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⚙️ Ayarları dahil et" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "option-label", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: backupOptions.include_emojis, onChange: /* @__PURE__ */ __name((e) => setBackupOptions({ ...backupOptions, include_emojis: e.target.checked }), "onChange") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "😀 Emojileri dahil et" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "create-backup-btn", onClick: createBackup, disabled: creating, children: creating ? "⏳ Oluşturuluyor..." : "💾 Yedek Oluştur" })
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Yükleniyor..." })
      ] }) : backups.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "empty-icon", children: "💾" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Henüz yedek yok" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "backups-list", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
          "Mevcut Yedekler (",
          backups.length,
          ")"
        ] }),
        backups.map((backup) => {
          const badge = getStatusBadge(backup.status);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "backup-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "backup-info", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "backup-main", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { children: [
                "Yedek #",
                backup.id
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "backup-meta", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "📅 ",
                  new Date(backup.created_at).toLocaleString("tr-TR")
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "📦 ",
                  formatFileSize(backup.file_size)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "status-badge", style: { background: badge.color }, children: [
                  badge.icon,
                  " ",
                  badge.text
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "backup-includes", children: [
                backup.includes_channels && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "include-badge", children: "📁 Kanallar" }),
                backup.includes_roles && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "include-badge", children: "🎭 Roller" }),
                backup.includes_messages && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "include-badge", children: "💬 Mesajlar" }),
                backup.includes_settings && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "include-badge", children: "⚙️ Ayarlar" }),
                backup.includes_emojis && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "include-badge", children: "😀 Emojiler" })
              ] })
            ] }) }),
            backup.status === "completed" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "backup-actions", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "restore-btn", onClick: /* @__PURE__ */ __name(() => restoreBackup(backup.id), "onClick"), children: "🔄 Geri Yükle" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "download-btn", onClick: /* @__PURE__ */ __name(() => downloadBackup(backup.id), "onClick"), children: "📥 İndir" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "delete-btn", onClick: /* @__PURE__ */ __name(() => deleteBackup(backup.id), "onClick"), children: "🗑️ Sil" })
            ] })
          ] }, backup.id);
        })
      ] })
    ] })
  ] }) });
}, "ServerBackupPanel");
export {
  ServerBackupPanel as default
};
