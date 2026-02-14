var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { bd as FaFileExport, a as FaTimes, a5 as FaDownload, bv as FaCalendar } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const MessageExportPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, roomSlug, onClose }) => {
  const [format, setFormat] = reactExports.useState("json");
  const [dateRange, setDateRange] = reactExports.useState({
    start_date: "",
    end_date: ""
  });
  const [includeAttachments, setIncludeAttachments] = reactExports.useState(false);
  const [processing, setProcessing] = reactExports.useState(false);
  const [jobId, setJobId] = reactExports.useState(null);
  const [downloadUrl, setDownloadUrl] = reactExports.useState(null);
  const formats = [
    { value: "json", label: "JSON", icon: "📋" },
    { value: "csv", label: "CSV (Excel)", icon: "📊" },
    { value: "txt", label: "Text", icon: "📄" },
    { value: "html", label: "HTML", icon: "🌐" }
  ];
  const startExport = /* @__PURE__ */ __name(async () => {
    try {
      setProcessing(true);
      const response = await fetchWithAuth(`${apiBaseUrl}/exports/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room_slug: roomSlug,
          format,
          start_date: dateRange.start_date || null,
          end_date: dateRange.end_date || null,
          include_attachments: includeAttachments
        })
      });
      if (response.ok) {
        const data = await response.json();
        setJobId(data.job_id);
        toast.success("Dışa aktarma başlatıldı");
        checkExportStatus(data.job_id);
      } else {
        toast.error("Dışa aktarma başlatılamadı");
        setProcessing(false);
      }
    } catch (error) {
      console.error("Export başlatma hatası:", error);
      toast.error("Bir hata oluştu");
      setProcessing(false);
    }
  }, "startExport");
  const checkExportStatus = /* @__PURE__ */ __name(async (jId) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetchWithAuth(`${apiBaseUrl}/exports/${jId}/status/`);
        if (response.ok) {
          const data = await response.json();
          if (data.status === "completed") {
            clearInterval(interval);
            setProcessing(false);
            setDownloadUrl(data.download_url);
            toast.success("Dışa aktarma tamamlandı!");
          } else if (data.status === "failed") {
            clearInterval(interval);
            setProcessing(false);
            toast.error("Dışa aktarma başarısız oldu");
          }
        }
      } catch (error) {
        clearInterval(interval);
        setProcessing(false);
        console.error("Status kontrol hatası:", error);
      }
    }, 2e3);
  }, "checkExportStatus");
  const downloadExport = /* @__PURE__ */ __name(() => {
    if (downloadUrl) {
      window.open(downloadUrl, "_blank");
      toast.success("İndirme başlatıldı");
    }
  }, "downloadExport");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaFileExport, { style: { color: "#43b581" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0 }, children: "Sohbet Geçmişini Dışa Aktar" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { onClick: onClose, style: styles.closeBtn })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: !downloadUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.field, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.label, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, { style: { marginRight: "8px" } }),
          "Dosya Formatı"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.formatGrid, children: formats.map((fmt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => setFormat(fmt.value), "onClick"),
            style: {
              ...styles.formatBtn,
              backgroundColor: format === fmt.value ? "#5865f2" : "#2c2f33"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "24px" }, children: fmt.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt.label })
            ]
          },
          fmt.value
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.field, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.label, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCalendar, { style: { marginRight: "8px" } }),
          "Tarih Aralığı (opsiyonel)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.dateRange, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "date",
              value: dateRange.start_date,
              onChange: /* @__PURE__ */ __name((e) => setDateRange({ ...dateRange, start_date: e.target.value }), "onChange"),
              style: styles.dateInput,
              placeholder: "Başlangıç"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#888" }, children: "→" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "date",
              value: dateRange.end_date,
              onChange: /* @__PURE__ */ __name((e) => setDateRange({ ...dateRange, end_date: e.target.value }), "onChange"),
              style: styles.dateInput,
              placeholder: "Bitiş"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.field, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.checkboxLabel, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "checkbox",
            checked: includeAttachments,
            onChange: /* @__PURE__ */ __name((e) => setIncludeAttachments(e.target.checked), "onChange")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Ekleri de dahil et (dosya boyutu artabilir)" })
      ] }) }),
      processing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.progress, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.progressSpinner }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Mesajlar işleniyor..." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "12px", color: "#888" }, children: "Bu işlem birkaç dakika sürebilir" })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.success, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.successIcon, children: "✅" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Dışa Aktarma Tamamlandı!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Dosyanız hazır ve indirilebilir durumda." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: downloadExport, style: styles.downloadBtn, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, {}),
        " Dosyayı İndir"
      ] })
    ] }) }),
    !downloadUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.footer, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.cancelBtn, children: "İptal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: startExport,
          disabled: processing,
          style: styles.exportBtn,
          children: processing ? "İşleniyor..." : "Dışa Aktar"
        }
      )
    ] })
  ] }) });
}, "MessageExportPanel");
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999999
  },
  modal: {
    backgroundColor: "#1e1e1e",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "600px",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    color: "#fff"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #333"
  },
  closeBtn: {
    cursor: "pointer",
    fontSize: "24px",
    color: "#888"
  },
  content: {
    flex: 1,
    overflowY: "auto",
    padding: "20px"
  },
  field: {
    marginBottom: "25px"
  },
  label: {
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
    color: "#dcddde",
    fontSize: "15px",
    fontWeight: "600"
  },
  formatGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px"
  },
  formatBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    padding: "20px",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "background-color 0.2s"
  },
  dateRange: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  dateInput: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#2c2f33",
    border: "1px solid #444",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "14px"
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    fontSize: "14px"
  },
  progress: {
    textAlign: "center",
    padding: "30px",
    backgroundColor: "#2c2f33",
    borderRadius: "8px"
  },
  progressSpinner: {
    width: "50px",
    height: "50px",
    border: "4px solid #333",
    borderTop: "4px solid #5865f2",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto 15px"
  },
  success: {
    textAlign: "center",
    padding: "40px"
  },
  successIcon: {
    fontSize: "64px",
    marginBottom: "20px"
  },
  downloadBtn: {
    backgroundColor: "#43b581",
    color: "#fff",
    border: "none",
    padding: "15px 30px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "20px"
  },
  footer: {
    display: "flex",
    gap: "10px",
    padding: "20px",
    borderTop: "1px solid #333"
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#2c2f33",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600"
  },
  exportBtn: {
    flex: 1,
    backgroundColor: "#43b581",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600"
  }
};
export {
  MessageExportPanel as default
};
