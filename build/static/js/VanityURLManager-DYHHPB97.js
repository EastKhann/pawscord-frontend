var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { aV as FaCopy, g as FaTrash, j as FaLink, a as FaTimes } from "./icons-vendor-2VDeY8fW.js";
import { P as PRODUCTION_URL, t as toast, d as confirmDialog } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const VanityURLManager = /* @__PURE__ */ __name(({ onClose, fetchWithAuth, apiBaseUrl, serverId, embedded = false }) => {
  const [vanityPath, setVanityPath] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [existingVanity, setExistingVanity] = reactExports.useState(null);
  const [loadingExisting, setLoadingExisting] = reactExports.useState(true);
  reactExports.useEffect(() => {
    loadExistingVanity();
  }, [serverId]);
  const loadExistingVanity = /* @__PURE__ */ __name(async () => {
    if (!serverId) {
      setLoadingExisting(false);
      return;
    }
    setLoadingExisting(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/vanity/get/${serverId}/`);
      if (res.ok) {
        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          console.warn("[Vanity] Non-JSON response:", contentType);
          setExistingVanity(null);
          return;
        }
        const data = await res.json();
        if (data.exists) {
          setExistingVanity(data);
          setVanityPath(data.path);
        } else {
          setExistingVanity(null);
        }
      }
    } catch (error) {
      console.error("Vanity URL yükleme hatası:", error);
    } finally {
      setLoadingExisting(false);
    }
  }, "loadExistingVanity");
  const handleCreate = /* @__PURE__ */ __name(async () => {
    if (!vanityPath.trim()) {
      toast.warning("Lütfen bir vanity path girin");
      return;
    }
    if (vanityPath.length < 3) {
      toast.warning("Path en az 3 karakter olmalı");
      return;
    }
    setLoading(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/vanity/create/`, {
        method: "POST",
        body: JSON.stringify({
          path: vanityPath,
          server_id: serverId
        })
      });
      if (res.ok) {
        const data = await res.json();
        toast.success("Vanity URL oluşturuldu!");
        loadExistingVanity();
      } else {
        const data = await res.json();
        toast.error("Hata: " + (data.error || "Bu path zaten kullanılıyor"));
      }
    } catch (error) {
      console.error("Vanity URL error:", error);
      toast.error("Sunucu hatası");
    } finally {
      setLoading(false);
    }
  }, "handleCreate");
  const handleDelete = /* @__PURE__ */ __name(async () => {
    if (!await confirmDialog("Vanity URL'i silmek istediğinize emin misiniz?")) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/vanity/delete/${serverId}/`, {
        method: "DELETE"
      });
      if (res.ok) {
        toast.success("Vanity URL silindi!");
        setExistingVanity(null);
        setVanityPath("");
      } else {
        const data = await res.json();
        toast.error("Hata: " + (data.error || "Silme başarısız"));
      }
    } catch (error) {
      console.error("Vanity URL silme hatası:", error);
      toast.error("Sunucu hatası");
    } finally {
      setLoading(false);
    }
  }, "handleDelete");
  const copyUrl = /* @__PURE__ */ __name(() => {
    const fullUrl = `${PRODUCTION_URL}/join/${existingVanity.path}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success("URL kopyalandı!");
  }, "copyUrl");
  const content = /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: loadingExisting ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.description, children: "Yükleniyor..." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.description, children: [
      "Sunucunuz için özel bir davet URL'i oluşturun.",
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: "0.9em", color: "#72767d" }, children: [
        "Format: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "#5865f2" }, children: "pawscord.com/join/yourpath" })
      ] })
    ] }),
    existingVanity && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.existingSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.existingLabel, children: "📌 Mevcut Vanity URL:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.existingUrl, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.urlText, children: [
          "pawscord.com/join/",
          existingVanity.path
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "10px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: copyUrl, style: styles.copyButton, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaCopy, {}),
            " Kopyala"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleDelete, style: styles.deleteButton, disabled: loading, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}),
            " Sil"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inputGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.prefix, children: "pawscord.com/join/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: vanityPath,
          onChange: /* @__PURE__ */ __name((e) => setVanityPath(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "")), "onChange"),
          placeholder: "myserver",
          style: styles.input,
          maxLength: 32
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "0.85em", color: "#72767d", marginTop: "8px", marginBottom: "15px" }, children: [
      "• En az 3, en fazla 32 karakter",
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      "• Sadece küçük harf, rakam ve tire (-) kullanılabilir",
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      "• Sistem kelimeleri (api, admin, vb.) kullanılamaz"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: handleCreate,
        disabled: loading || !vanityPath.trim(),
        style: styles.createButton,
        children: loading ? "İşleniyor..." : existingVanity ? "🔗 Vanity URL Güncelle" : "🔗 Vanity URL Oluştur"
      }
    )
  ] }) });
  if (embedded) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: content });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles.title, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaLink, {}),
        " Vanity URL Oluştur"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: content })
  ] }) });
}, "VanityURLManager");
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1e4
  },
  modal: {
    backgroundColor: "#2b2d31",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "500px"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #40444b"
  },
  title: {
    color: "white",
    margin: 0,
    fontSize: "1.3em",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    cursor: "pointer",
    fontSize: "1.3em"
  },
  content: {
    padding: "20px"
  },
  description: {
    color: "#b9bbbe",
    fontSize: "0.9em",
    marginBottom: "15px",
    padding: "10px",
    backgroundColor: "#40444b",
    borderRadius: "4px"
  },
  existingSection: {
    marginBottom: "20px",
    padding: "15px",
    backgroundColor: "#2f3136",
    borderRadius: "8px",
    border: "1px solid #5865f2"
  },
  existingLabel: {
    color: "#5865f2",
    fontWeight: "bold",
    marginBottom: "10px",
    fontSize: "0.9em"
  },
  existingUrl: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px"
  },
  urlText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1em"
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#40444b",
    borderRadius: "4px",
    padding: "5px",
    marginBottom: "15px"
  },
  prefix: {
    color: "#b9bbbe",
    padding: "0 10px",
    fontWeight: "bold"
  },
  input: {
    flex: 1,
    padding: "10px",
    backgroundColor: "transparent",
    border: "none",
    color: "white",
    fontSize: "1em",
    outline: "none"
  },
  copyButton: {
    padding: "8px 12px",
    backgroundColor: "#43b581",
    border: "none",
    borderRadius: "4px",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontWeight: "bold"
  },
  deleteButton: {
    padding: "8px 12px",
    backgroundColor: "#ed4245",
    border: "none",
    borderRadius: "4px",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontWeight: "bold"
  },
  createButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#5865f2",
    border: "none",
    borderRadius: "4px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1em"
  }
};
export {
  VanityURLManager as default
};
