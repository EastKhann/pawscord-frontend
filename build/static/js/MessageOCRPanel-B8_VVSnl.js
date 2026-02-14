var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { aw as FaImage, a as FaTimes, av as FaFileAlt, aV as FaCopy, a5 as FaDownload } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const MessageOCRPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, messageId, onClose }) => {
  const [ocrText, setOcrText] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(true);
  const [processing, setProcessing] = reactExports.useState(false);
  reactExports.useEffect(() => {
    loadOCRText();
  }, [messageId]);
  const loadOCRText = /* @__PURE__ */ __name(async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth(`${apiBaseUrl}/messages/${messageId}/ocr/`);
      if (response.ok) {
        const data = await response.json();
        setOcrText(data.text || "");
      }
    } catch (error) {
      console.error("OCR yükleme hatası:", error);
    } finally {
      setLoading(false);
    }
  }, "loadOCRText");
  const requestOCR = /* @__PURE__ */ __name(async () => {
    try {
      setProcessing(true);
      const response = await fetchWithAuth(`${apiBaseUrl}/messages/${messageId}/ocr/request/`, {
        method: "POST"
      });
      if (response.ok) {
        toast.success("OCR işlemi başlatıldı");
        setTimeout(loadOCRText, 3e3);
      } else {
        toast.error("OCR işlemi başlatılamadı");
      }
    } catch (error) {
      console.error("OCR isteği hatası:", error);
      toast.error("Bir hata oluştu");
    } finally {
      setProcessing(false);
    }
  }, "requestOCR");
  const copyText = /* @__PURE__ */ __name(() => {
    navigator.clipboard.writeText(ocrText);
    toast.success("Metin kopyalandı");
  }, "copyText");
  const downloadText = /* @__PURE__ */ __name(() => {
    const blob = new Blob([ocrText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ocr_${messageId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Metin indirildi");
  }, "downloadText");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaImage, { style: { color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0 }, children: "OCR - Görüntüden Metin" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { onClick: onClose, style: styles.closeBtn })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.loading, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaFileAlt, { style: { fontSize: "48px", color: "#888", marginBottom: "10px" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Yükleniyor..." })
    ] }) : ocrText ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.toolbar, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: copyText, style: styles.toolBtn, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCopy, {}),
          " Kopyala"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: downloadText, style: styles.toolBtn, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, {}),
          " İndir"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.textArea, children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { style: styles.textContent, children: ocrText }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.empty, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaImage, { style: { fontSize: "64px", color: "#555", marginBottom: "15px" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Bu mesajda OCR metni yok" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: requestOCR,
          disabled: processing,
          style: styles.requestBtn,
          children: processing ? "İşleniyor..." : "OCR İşlemini Başlat"
        }
      )
    ] }) })
  ] }) });
}, "MessageOCRPanel");
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
    maxWidth: "700px",
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
    padding: "20px",
    display: "flex",
    flexDirection: "column"
  },
  toolbar: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px"
  },
  toolBtn: {
    backgroundColor: "#2c2f33",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px"
  },
  textArea: {
    flex: 1,
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "15px",
    overflow: "auto"
  },
  textContent: {
    color: "#dcddde",
    fontSize: "14px",
    lineHeight: "1.6",
    margin: 0,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    fontFamily: "monospace"
  },
  loading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px",
    color: "#888"
  },
  empty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px",
    color: "#888"
  },
  requestBtn: {
    marginTop: "20px",
    backgroundColor: "#5865f2",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600"
  }
};
export {
  MessageOCRPanel as default
};
