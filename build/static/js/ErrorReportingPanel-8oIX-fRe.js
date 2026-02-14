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
const ErrorReportingPanel = /* @__PURE__ */ __name(({ apiBaseUrl, onClose }) => {
  const [errorReport, setErrorReport] = reactExports.useState({
    title: "",
    description: "",
    severity: "medium",
    // 'low', 'medium', 'high', 'critical'
    category: "bug",
    // 'bug', 'feature', 'performance', 'ui', 'crash'
    steps_to_reproduce: "",
    expected_behavior: "",
    actual_behavior: "",
    browser: navigator.userAgent,
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
    url: window.location.href,
    console_errors: []
  });
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [attachments, setAttachments] = reactExports.useState([]);
  const captureConsoleErrors = /* @__PURE__ */ __name(() => {
    const errors = window.consoleErrors || [];
    setErrorReport((prev) => ({ ...prev, console_errors: errors }));
    toast.info("ℹ️ Konsol hataları yakalandı");
  }, "captureConsoleErrors");
  const submitErrorReport = /* @__PURE__ */ __name(async () => {
    if (!errorReport.title.trim()) {
      toast.error("❌ Başlık gerekli");
      return;
    }
    if (!errorReport.description.trim()) {
      toast.error("❌ Açıklama gerekli");
      return;
    }
    try {
      setSubmitting(true);
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/errors/report/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(errorReport)
      });
      if (response.ok) {
        const data = await response.json();
        toast.success("✅ Hata raporu gönderildi");
        setErrorReport({
          title: "",
          description: "",
          severity: "medium",
          category: "bug",
          steps_to_reproduce: "",
          expected_behavior: "",
          actual_behavior: "",
          browser: navigator.userAgent,
          screen_resolution: `${window.screen.width}x${window.screen.height}`,
          url: window.location.href,
          console_errors: []
        });
        setTimeout(() => onClose(), 1500);
      } else {
        const error = await response.json();
        toast.error(`❌ ${error.error || "Gönderim başarısız"}`);
      }
    } catch (error) {
      console.error("Submit error report error:", error);
      toast.error("❌ Bağlantı hatası");
    } finally {
      setSubmitting(false);
    }
  }, "submitErrorReport");
  const getSeverityColor = /* @__PURE__ */ __name((severity) => {
    const colors = {
      "low": "#3b82f6",
      "medium": "#faa61a",
      "high": "#ff6b61",
      "critical": "#ff3b30"
    };
    return colors[severity] || colors.medium;
  }, "getSeverityColor");
  const getCategoryIcon = /* @__PURE__ */ __name((category) => {
    const icons = {
      "bug": "🐛",
      "feature": "✨",
      "performance": "⚡",
      "ui": "🎨",
      "crash": "💥"
    };
    return icons[category] || "❓";
  }, "getCategoryIcon");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "error-reporting-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "error-reporting-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "error-reporting-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "🐛 Hata Bildirimi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "✕" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "error-reporting-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-banner", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "info-icon", children: "💡" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Karşılaştığınız hataları detaylı bir şekilde bildirerek uygulamayı geliştirmemize yardımcı olabilirsiniz." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Başlık *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              className: "form-input",
              placeholder: "Kısa ve açıklayıcı bir başlık",
              value: errorReport.title,
              onChange: /* @__PURE__ */ __name((e) => setErrorReport({ ...errorReport, title: e.target.value }), "onChange")
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Kategori" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                className: "form-select",
                value: errorReport.category,
                onChange: /* @__PURE__ */ __name((e) => setErrorReport({ ...errorReport, category: e.target.value }), "onChange"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "bug", children: "🐛 Bug (Hata)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "feature", children: "✨ Feature Request (Özellik İsteği)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "performance", children: "⚡ Performance (Performans)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ui", children: "🎨 UI/UX (Arayüz)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "crash", children: "💥 Crash (Çökme)" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Önem Derecesi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                className: "form-select",
                value: errorReport.severity,
                onChange: /* @__PURE__ */ __name((e) => setErrorReport({ ...errorReport, severity: e.target.value }), "onChange"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "low", children: "🟢 Düşük" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "medium", children: "🟡 Orta" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "high", children: "🟠 Yüksek" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "critical", children: "🔴 Kritik" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Açıklama *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              className: "form-textarea",
              placeholder: "Hatayı detaylı bir şekilde açıklayın...",
              value: errorReport.description,
              onChange: /* @__PURE__ */ __name((e) => setErrorReport({ ...errorReport, description: e.target.value }), "onChange"),
              rows: 5
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Hatayı Yeniden Oluşturma Adımları" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              className: "form-textarea",
              placeholder: "1. İlk adım\n2. İkinci adım\n3. Üçüncü adım",
              value: errorReport.steps_to_reproduce,
              onChange: /* @__PURE__ */ __name((e) => setErrorReport({ ...errorReport, steps_to_reproduce: e.target.value }), "onChange"),
              rows: 4
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Beklenen Davranış" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                className: "form-textarea",
                placeholder: "Ne olmasını bekliyordunuz?",
                value: errorReport.expected_behavior,
                onChange: /* @__PURE__ */ __name((e) => setErrorReport({ ...errorReport, expected_behavior: e.target.value }), "onChange"),
                rows: 3
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Gerçekleşen Davranış" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                className: "form-textarea",
                placeholder: "Ne oldu?",
                value: errorReport.actual_behavior,
                onChange: /* @__PURE__ */ __name((e) => setErrorReport({ ...errorReport, actual_behavior: e.target.value }), "onChange"),
                rows: 3
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "system-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "📊 Sistem Bilgileri" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-grid", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-item", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "info-label", children: "Tarayıcı:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "info-value", children: navigator.userAgent.split("(")[1]?.split(")")[0] || "Unknown" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-item", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "info-label", children: "Ekran:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "info-value", children: errorReport.screen_resolution })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-item", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "info-label", children: "URL:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "info-value truncate", children: errorReport.url })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "capture-errors-btn",
              onClick: captureConsoleErrors,
              children: "📝 Konsol Hatalarını Yakala"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "preview-section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "👁️ Önizleme" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "error-preview", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "preview-header", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "preview-icon", children: getCategoryIcon(errorReport.category) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "preview-title", children: errorReport.title || "Başlık" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "preview-severity",
                  style: { backgroundColor: getSeverityColor(errorReport.severity) },
                  children: errorReport.severity
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "preview-body", children: errorReport.description || "Açıklama burada görünecek..." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "cancel-btn",
              onClick: onClose,
              children: "İptal"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "submit-btn",
              onClick: submitErrorReport,
              disabled: submitting,
              children: submitting ? "⏳ Gönderiliyor..." : "📨 Raporu Gönder"
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}, "ErrorReportingPanel");
export {
  ErrorReportingPanel as default
};
