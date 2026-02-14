var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { i as FaThumbtack, a as FaTimes, an as FaPlus, g as FaTrash } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const StickyMessagesPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, roomSlug, onClose }) => {
  const [stickies, setStickies] = reactExports.useState([]);
  const [newMessage, setNewMessage] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    loadStickies();
  }, []);
  const loadStickies = /* @__PURE__ */ __name(async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth(`${apiBaseUrl}/stickies/list/?room_slug=${roomSlug}`);
      if (response.ok) {
        const data = await response.json();
        setStickies(data);
      }
    } catch (error) {
      console.error("Sticky yükleme hatası:", error);
    } finally {
      setLoading(false);
    }
  }, "loadStickies");
  const createSticky = /* @__PURE__ */ __name(async () => {
    if (!newMessage.trim()) {
      toast.error("Mesaj girin");
      return;
    }
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/stickies/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room_slug: roomSlug,
          message: newMessage
        })
      });
      if (response.ok) {
        toast.success("Sticky mesaj oluşturuldu");
        setNewMessage("");
        loadStickies();
      } else {
        toast.error("Sticky oluşturulamadı");
      }
    } catch (error) {
      console.error("Sticky oluşturma hatası:", error);
      toast.error("Bir hata oluştu");
    }
  }, "createSticky");
  const deleteSticky = /* @__PURE__ */ __name(async (stickyId) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/stickies/${stickyId}/delete/`, {
        method: "DELETE"
      });
      if (response.ok) {
        toast.success("Sticky mesaj silindi");
        loadStickies();
      } else {
        toast.error("Sticky silinemedi");
      }
    } catch (error) {
      console.error("Sticky silme hatası:", error);
      toast.error("Bir hata oluştu");
    }
  }, "deleteSticky");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaThumbtack, { style: { color: "#faa61a" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0 }, children: "Sticky Mesajlar" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { onClick: onClose, style: styles.closeBtn })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.createSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: newMessage,
          onChange: /* @__PURE__ */ __name((e) => setNewMessage(e.target.value), "onChange"),
          placeholder: "Bu mesaj kanalın en üstünde sabitlenecek...",
          style: styles.textarea,
          rows: 3
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: createSticky, style: styles.createBtn, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
        " Sticky Oluştur"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Yükleniyor..." }) : stickies.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.empty, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaThumbtack, { style: { fontSize: "48px", color: "#555", marginBottom: "10px" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Henüz sticky mesaj yok" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "12px", color: "#888" }, children: "Sticky mesajlar kanalın en üstünde sabitlenir" })
    ] }) : stickies.map((sticky) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.stickyCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.stickyIcon, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaThumbtack, { style: { color: "#faa61a" } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.stickyContent, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.stickyMessage, children: sticky.message }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.stickyMeta, children: [
          "Oluşturan: ",
          sticky.created_by,
          " • ",
          new Date(sticky.created_at).toLocaleString("tr-TR")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => deleteSticky(sticky.id), "onClick"),
          style: styles.deleteBtn,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {})
        }
      )
    ] }, sticky.id)) })
  ] }) });
}, "StickyMessagesPanel");
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
  createSection: {
    padding: "20px",
    borderBottom: "1px solid #333"
  },
  textarea: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2c2f33",
    border: "1px solid #444",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "14px",
    resize: "vertical",
    marginBottom: "10px"
  },
  createBtn: {
    width: "100%",
    backgroundColor: "#5865f2",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  },
  content: {
    flex: 1,
    overflowY: "auto",
    padding: "20px"
  },
  stickyCard: {
    display: "flex",
    gap: "15px",
    padding: "15px",
    backgroundColor: "#faa61a1a",
    border: "1px solid #faa61a",
    borderRadius: "8px",
    marginBottom: "10px"
  },
  stickyIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#faa61a33",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    flexShrink: 0
  },
  stickyContent: {
    flex: 1
  },
  stickyMessage: {
    color: "#dcddde",
    fontSize: "14px",
    marginBottom: "8px",
    lineHeight: "1.5"
  },
  stickyMeta: {
    fontSize: "12px",
    color: "#888"
  },
  deleteBtn: {
    backgroundColor: "#f04747",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    alignSelf: "flex-start"
  },
  loading: {
    textAlign: "center",
    padding: "40px",
    color: "#888"
  },
  empty: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#888"
  }
};
export {
  StickyMessagesPanel as default
};
