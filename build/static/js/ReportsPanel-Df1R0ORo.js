var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
import "./ui-vendor-iPoN0WGz.js";
const ReportsPanel = /* @__PURE__ */ __name(({ apiBaseUrl, onClose }) => {
  const [reports, setReports] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [filter, setFilter] = reactExports.useState("all");
  const [selectedReport, setSelectedReport] = reactExports.useState(null);
  reactExports.useEffect(() => {
    fetchReports();
  }, []);
  const fetchReports = /* @__PURE__ */ __name(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/reports/list/`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setReports(data.reports || []);
      } else {
        toast.error("❌ Şikayetler yüklenemedi");
      }
    } catch (error) {
      console.error("Fetch reports error:", error);
      toast.error("❌ Bağlantı hatası");
    } finally {
      setLoading(false);
    }
  }, "fetchReports");
  const handleReport = /* @__PURE__ */ __name(async (reportId, action, reason = "") => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/reports/handle/${reportId}/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action,
          // 'ban', 'warn', 'delete_message', 'dismiss'
          reason
        })
      });
      if (response.ok) {
        const data = await response.json();
        setReports(reports.map(
          (r) => r.id === reportId ? { ...r, status: action === "dismiss" ? "dismissed" : "resolved", resolution: action } : r
        ));
        setSelectedReport(null);
        toast.success(`✅ ${getActionLabel(action)}`);
      } else {
        const error = await response.json();
        toast.error(`❌ ${error.error || "İşlem başarısız"}`);
      }
    } catch (error) {
      console.error("Handle report error:", error);
      toast.error("❌ Bağlantı hatası");
    }
  }, "handleReport");
  const getActionLabel = /* @__PURE__ */ __name((action) => {
    const labels = {
      "ban": "Kullanıcı yasaklandı",
      "warn": "Kullanıcı uyarıldı",
      "delete_message": "Mesaj silindi",
      "dismiss": "Şikayet reddedildi"
    };
    return labels[action] || "İşlem tamamlandı";
  }, "getActionLabel");
  const filteredReports = reports.filter((report) => {
    if (filter === "all") return true;
    if (filter === "pending") return report.status === "pending";
    if (filter === "resolved") return report.status === "resolved";
    if (filter === "dismissed") return report.status === "dismissed";
    return true;
  });
  const getStatusBadge = /* @__PURE__ */ __name((status) => {
    const badges = {
      "pending": { label: "Bekliyor", className: "status-pending" },
      "resolved": { label: "Çözüldü", className: "status-resolved" },
      "dismissed": { label: "Reddedildi", className: "status-dismissed" }
    };
    return badges[status] || { label: status, className: "" };
  }, "getStatusBadge");
  const getSeverityBadge = /* @__PURE__ */ __name((reason) => {
    const severities = {
      "spam": { label: "Spam", className: "severity-low" },
      "harassment": { label: "Taciz", className: "severity-high" },
      "hate_speech": { label: "Nefret Söylemi", className: "severity-critical" },
      "inappropriate": { label: "Uygunsuz İçerik", className: "severity-medium" },
      "scam": { label: "Dolandırıcılık", className: "severity-high" },
      "other": { label: "Diğer", className: "severity-low" }
    };
    return severities[reason] || { label: reason, className: "" };
  }, "getSeverityBadge");
  const formatDate = /* @__PURE__ */ __name((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }, "formatDate");
  const stats = {
    total: reports.length,
    pending: reports.filter((r) => r.status === "pending").length,
    resolved: reports.filter((r) => r.status === "resolved").length,
    dismissed: reports.filter((r) => r.status === "dismissed").length
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "reports-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reports-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reports-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "🚨 Şikayet Yönetimi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "✕" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reports-stats", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: stats.total }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Toplam" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item pending", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: stats.pending }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Bekliyor" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item resolved", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: stats.resolved }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Çözüldü" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item dismissed", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: stats.dismissed }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Reddedildi" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reports-filters", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: filter === "all" ? "active" : "",
          onClick: /* @__PURE__ */ __name(() => setFilter("all"), "onClick"),
          children: [
            "Tümü (",
            stats.total,
            ")"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: filter === "pending" ? "active" : "",
          onClick: /* @__PURE__ */ __name(() => setFilter("pending"), "onClick"),
          children: [
            "Bekliyor (",
            stats.pending,
            ")"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: filter === "resolved" ? "active" : "",
          onClick: /* @__PURE__ */ __name(() => setFilter("resolved"), "onClick"),
          children: [
            "Çözüldü (",
            stats.resolved,
            ")"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: filter === "dismissed" ? "active" : "",
          onClick: /* @__PURE__ */ __name(() => setFilter("dismissed"), "onClick"),
          children: [
            "Reddedildi (",
            stats.dismissed,
            ")"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "reports-content", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Yükleniyor..." })
    ] }) : filteredReports.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-icon", children: "🎉" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Şikayet yok" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Bu filtre için şikayet bulunamadı" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "reports-list", children: filteredReports.map((report) => {
      const statusBadge = getStatusBadge(report.status);
      const severityBadge = getSeverityBadge(report.reason);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "report-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "report-header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "report-meta", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `status-badge ${statusBadge.className}`, children: statusBadge.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `severity-badge ${severityBadge.className}`, children: severityBadge.label })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "report-date", children: formatDate(report.created_at) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "report-body", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "report-info", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-row", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "info-label", children: "Bildiren:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "info-value", children: [
                "👤 ",
                report.reporter_username
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-row", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "info-label", children: "Bildirilen:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "info-value", children: [
                "⚠️ ",
                report.reported_user_username
              ] })
            ] }),
            report.message_content && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-row", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "info-label", children: "Mesaj:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "message-preview", children: report.message_content })
            ] })
          ] }),
          report.description && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "report-description", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Açıklama:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: report.description })
          ] })
        ] }),
        report.status === "pending" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "report-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "action-btn ban",
              onClick: /* @__PURE__ */ __name(() => {
                const reason = prompt("Yasaklama sebebi:");
                if (reason) handleReport(report.id, "ban", reason);
              }, "onClick"),
              title: "Kullanıcıyı Yasakla",
              children: "🚫 Yasakla"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "action-btn warn",
              onClick: /* @__PURE__ */ __name(() => handleReport(report.id, "warn", "Uyarı verildi"), "onClick"),
              title: "Kullanıcıyı Uyar",
              children: "⚠️ Uyar"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "action-btn delete",
              onClick: /* @__PURE__ */ __name(() => handleReport(report.id, "delete_message", "Mesaj silindi"), "onClick"),
              title: "Mesajı Sil",
              children: "🗑️ Mesajı Sil"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "action-btn dismiss",
              onClick: /* @__PURE__ */ __name(() => handleReport(report.id, "dismiss", "Geçersiz şikayet"), "onClick"),
              title: "Şikayeti Reddet",
              children: "✕ Reddet"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "report-resolution", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "resolution-label", children: "Çözüm:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "resolution-value", children: getActionLabel(report.resolution) })
        ] })
      ] }, report.id);
    }) }) })
  ] }) });
}, "ReportsPanel");
export {
  ReportsPanel as default
};
