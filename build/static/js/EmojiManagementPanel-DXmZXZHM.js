var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { n as FaSmile, a as FaTimes, Q as FaStar, bx as FaUpload, g as FaTrash } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const EmojiManagementPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, serverId, onClose }) => {
  const [emojis, setEmojis] = reactExports.useState([]);
  const [trendingEmojis, setTrendingEmojis] = reactExports.useState([]);
  const [suggestions, setSuggestions] = reactExports.useState([]);
  const [uploadFile, setUploadFile] = reactExports.useState(null);
  const [emojiName, setEmojiName] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(true);
  const [activeTab, setActiveTab] = reactExports.useState("custom");
  reactExports.useEffect(() => {
    loadEmojis();
    if (activeTab === "trending") loadTrending();
    if (activeTab === "suggestions") loadSuggestions();
  }, [activeTab]);
  const loadEmojis = /* @__PURE__ */ __name(async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth(`${apiBaseUrl}/emoji/list/?server_id=${serverId}`);
      if (response.ok) {
        const data = await response.json();
        setEmojis(data);
      }
    } catch (error) {
      console.error("Emoji yükleme hatası:", error);
    } finally {
      setLoading(false);
    }
  }, "loadEmojis");
  const loadTrending = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/emoji/trending/?server_id=${serverId}`);
      if (response.ok) {
        const data = await response.json();
        setTrendingEmojis(data);
      }
    } catch (error) {
      console.error("Trending yükleme hatası:", error);
    }
  }, "loadTrending");
  const loadSuggestions = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/emoji/suggestions/?server_id=${serverId}`);
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
      }
    } catch (error) {
      console.error("Öneriler yükleme hatası:", error);
    }
  }, "loadSuggestions");
  const uploadEmoji = /* @__PURE__ */ __name(async () => {
    if (!uploadFile || !emojiName.trim()) {
      toast.error("Emoji dosyası ve ismi gerekli");
      return;
    }
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("name", emojiName);
    formData.append("server_id", serverId);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/emoji/upload/`, {
        method: "POST",
        body: formData
      });
      if (response.ok) {
        toast.success("Emoji yüklendi");
        setUploadFile(null);
        setEmojiName("");
        loadEmojis();
      } else {
        toast.error("Emoji yüklenemedi");
      }
    } catch (error) {
      console.error("Upload hatası:", error);
      toast.error("Bir hata oluştu");
    }
  }, "uploadEmoji");
  const deleteEmoji = /* @__PURE__ */ __name(async (emojiId) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/emoji/${emojiId}/delete/`, {
        method: "DELETE"
      });
      if (response.ok) {
        toast.success("Emoji silindi");
        loadEmojis();
      } else {
        toast.error("Emoji silinemedi");
      }
    } catch (error) {
      console.error("Delete hatası:", error);
      toast.error("Bir hata oluştu");
    }
  }, "deleteEmoji");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaSmile, { style: { color: "#faa61a" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0 }, children: "Emoji Yönetimi" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { onClick: onClose, style: styles.closeBtn })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.tabs, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => setActiveTab("custom"), "onClick"),
          style: { ...styles.tab, ...activeTab === "custom" ? styles.activeTab : {} },
          children: "Özel Emojiler"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => setActiveTab("trending"), "onClick"),
          style: { ...styles.tab, ...activeTab === "trending" ? styles.activeTab : {} },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaStar, {}),
            " Trend Olanlar"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => setActiveTab("suggestions"), "onClick"),
          style: { ...styles.tab, ...activeTab === "suggestions" ? styles.activeTab : {} },
          children: "Öneriler"
        }
      )
    ] }),
    activeTab === "custom" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.uploadSection, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "file",
            accept: "image/png,image/gif,image/jpeg",
            onChange: /* @__PURE__ */ __name((e) => setUploadFile(e.target.files[0]), "onChange"),
            style: styles.fileInput
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: emojiName,
            onChange: /* @__PURE__ */ __name((e) => setEmojiName(e.target.value), "onChange"),
            placeholder: "Emoji ismi (örn: pog, kekw)",
            style: styles.input
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: uploadEmoji, style: styles.uploadBtn, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaUpload, {}),
          " Yükle"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Yükleniyor..." }) : emojis.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.empty, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaSmile, { style: { fontSize: "48px", color: "#555", marginBottom: "10px" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Henüz özel emoji yok" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.emojiGrid, children: emojis.map((emoji) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.emojiCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: emoji.url, alt: emoji.name, style: styles.emojiImage }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.emojiName, children: [
          ":",
          emoji.name,
          ":"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => deleteEmoji(emoji.id), "onClick"),
            style: styles.deleteEmojiBtn,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {})
          }
        )
      ] }, emoji.id)) }) })
    ] }),
    activeTab === "trending" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.emojiGrid, children: trendingEmojis.map((emoji, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.emojiCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: emoji.url, alt: emoji.name, style: styles.emojiImage }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.emojiName, children: [
        ":",
        emoji.name,
        ":"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.usageCount, children: [
        emoji.usage_count,
        " kullanım"
      ] })
    ] }, index)) }) }),
    activeTab === "suggestions" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.emojiGrid, children: suggestions.map((suggestion, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.suggestionCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: suggestion.emoji_url, alt: suggestion.emoji_name, style: styles.emojiImage }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.emojiName, children: [
        ":",
        suggestion.emoji_name,
        ":"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.suggester, children: [
        "Öneren: ",
        suggestion.suggested_by
      ] })
    ] }, index)) }) })
  ] }) });
}, "EmojiManagementPanel");
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
    maxWidth: "800px",
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
  tabs: {
    display: "flex",
    gap: "10px",
    padding: "15px 20px",
    borderBottom: "1px solid #333"
  },
  tab: {
    backgroundColor: "transparent",
    color: "#888",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  activeTab: {
    backgroundColor: "#5865f2",
    color: "#fff"
  },
  uploadSection: {
    display: "flex",
    gap: "10px",
    padding: "20px",
    borderBottom: "1px solid #333"
  },
  fileInput: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#2c2f33",
    border: "1px solid #444",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "14px"
  },
  input: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#2c2f33",
    border: "1px solid #444",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "14px"
  },
  uploadBtn: {
    backgroundColor: "#43b581",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  content: {
    flex: 1,
    overflowY: "auto",
    padding: "20px"
  },
  emojiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
    gap: "15px"
  },
  emojiCard: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "15px",
    textAlign: "center",
    position: "relative"
  },
  emojiImage: {
    width: "64px",
    height: "64px",
    objectFit: "contain",
    marginBottom: "10px"
  },
  emojiName: {
    fontSize: "13px",
    fontWeight: "500",
    color: "#dcddde",
    marginBottom: "4px",
    fontFamily: "monospace"
  },
  usageCount: {
    fontSize: "11px",
    color: "#888"
  },
  deleteEmojiBtn: {
    position: "absolute",
    top: "8px",
    right: "8px",
    backgroundColor: "#f04747",
    color: "#fff",
    border: "none",
    padding: "6px 8px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px"
  },
  suggestionCard: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "15px",
    textAlign: "center"
  },
  suggester: {
    fontSize: "11px",
    color: "#888",
    marginTop: "6px"
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
  EmojiManagementPanel as default
};
