var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { V as FaFilter, a as FaTimes, an as FaPlus, g as FaTrash } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const KeywordMutesPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose }) => {
  const [keywords, setKeywords] = reactExports.useState([]);
  const [newKeyword, setNewKeyword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    loadKeywords();
  }, []);
  const loadKeywords = /* @__PURE__ */ __name(async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth(`${apiBaseUrl}/mutekeyword/list/`);
      if (response.ok) {
        const data = await response.json();
        setKeywords(data);
      }
    } catch (error) {
      console.error("Keyword yükleme hatası:", error);
    } finally {
      setLoading(false);
    }
  }, "loadKeywords");
  const addKeyword = /* @__PURE__ */ __name(async () => {
    if (!newKeyword.trim()) {
      toast.error("Kelime girin");
      return;
    }
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/mutekeyword/add/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: newKeyword.trim() })
      });
      if (response.ok) {
        toast.success("Kelime eklendi");
        setNewKeyword("");
        loadKeywords();
      } else {
        toast.error("Kelime eklenemedi");
      }
    } catch (error) {
      console.error("Keyword ekleme hatası:", error);
      toast.error("Bir hata oluştu");
    }
  }, "addKeyword");
  const removeKeyword = /* @__PURE__ */ __name(async (keywordId) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/mutekeyword/remove/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword_id: keywordId })
      });
      if (response.ok) {
        toast.success("Kelime kaldırıldı");
        loadKeywords();
      } else {
        toast.error("Kelime kaldırılamadı");
      }
    } catch (error) {
      console.error("Keyword kaldırma hatası:", error);
      toast.error("Bir hata oluştu");
    }
  }, "removeKeyword");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaFilter, { style: { color: "#f04747" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0 }, children: "Kelime Filtreleri" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { onClick: onClose, style: styles.closeBtn })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.addSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: newKeyword,
          onChange: /* @__PURE__ */ __name((e) => setNewKeyword(e.target.value), "onChange"),
          onKeyPress: /* @__PURE__ */ __name((e) => e.key === "Enter" && addKeyword(), "onKeyPress"),
          placeholder: "Filtrelenecek kelime/ifade girin...",
          style: styles.input
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: addKeyword, style: styles.addBtn, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
        " Ekle"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Yükleniyor..." }) : keywords.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.empty, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaFilter, { style: { fontSize: "48px", color: "#555", marginBottom: "10px" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Henüz filtrelenmiş kelime yok" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "12px", color: "#888" }, children: "Bu kelimeler içeren mesajlar sizden gizlenecek" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.keywordList, children: keywords.map((kw) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.keywordItem, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.keywordText, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaFilter, { style: { color: "#888", fontSize: "14px" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: kw.keyword })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => removeKeyword(kw.id), "onClick"),
          style: styles.removeBtn,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {})
        }
      )
    ] }, kw.id)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.footer, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.hint, children: "💡 İpucu: Bu kelimeleri içeren mesajlar size gösterilmeyecek" }) })
  ] }) });
}, "KeywordMutesPanel");
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
  addSection: {
    display: "flex",
    gap: "10px",
    padding: "20px",
    borderBottom: "1px solid #333"
  },
  input: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#2c2f33",
    border: "1px solid #444",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "14px"
  },
  addBtn: {
    backgroundColor: "#43b581",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
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
  keywordList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  keywordItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    backgroundColor: "#2c2f33",
    borderRadius: "8px"
  },
  keywordText: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flex: 1
  },
  removeBtn: {
    backgroundColor: "#f04747",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px"
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
  },
  footer: {
    padding: "15px 20px",
    borderTop: "1px solid #333"
  },
  hint: {
    fontSize: "13px",
    color: "#888",
    textAlign: "center"
  }
};
export {
  KeywordMutesPanel as default
};
