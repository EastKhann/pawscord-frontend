var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { q as FaCode, a as FaTimes, aZ as FaPaperPlane } from "./icons-vendor-2VDeY8fW.js";
const LANGUAGES = ["javascript", "python", "html", "css", "java", "cpp", "csharp", "sql", "json", "typescript", "go", "rust", "php"];
const CodeSnippetModal = /* @__PURE__ */ __name(({ onClose, onSend }) => {
  const [title, setTitle] = reactExports.useState("");
  const [language, setLanguage] = reactExports.useState("javascript");
  const [code, setCode] = reactExports.useState("");
  reactExports.useEffect(() => {
    const handleEsc = /* @__PURE__ */ __name((e) => {
      if (e.key === "Escape") onClose();
    }, "handleEsc");
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);
  const handleSubmit = /* @__PURE__ */ __name((e) => {
    e.preventDefault();
    if (!code.trim()) return;
    onSend({ title, language, code });
  }, "handleSubmit");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: { margin: 0, display: "flex", alignItems: "center", gap: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCode, { color: "#5865f2" }),
        " Kod Paylaş"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.body, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.row, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            placeholder: "Başlık (Opsiyonel)",
            value: title,
            onChange: /* @__PURE__ */ __name((e) => setTitle(e.target.value), "onChange"),
            style: styles.input
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: language,
            onChange: /* @__PURE__ */ __name((e) => setLanguage(e.target.value), "onChange"),
            style: styles.select,
            children: LANGUAGES.map((lang) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: lang, children: lang.toUpperCase() }, lang))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          placeholder: "Kodunuzu buraya yapıştırın...",
          value: code,
          onChange: /* @__PURE__ */ __name((e) => setCode(e.target.value), "onChange"),
          style: styles.textarea
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSubmit, style: styles.sendBtn, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPaperPlane, {}),
        " Gönder"
      ] })
    ] })
  ] }) });
}, "CodeSnippetModal");
const styles = {
  overlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.7)", zIndex: 2e3, display: "flex", justifyContent: "center", alignItems: "center" },
  modal: { backgroundColor: "#2b2d31", width: "90%", maxWidth: "600px", borderRadius: "12px", overflow: "hidden", border: "1px solid #1e1f22", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" },
  header: { padding: "15px 20px", borderBottom: "1px solid #1f2023", display: "flex", justifyContent: "space-between", alignItems: "center", color: "white" },
  closeBtn: { background: "none", border: "none", color: "#b9bbbe", cursor: "pointer", fontSize: "1.2em" },
  body: { padding: "20px", display: "flex", flexDirection: "column", gap: "15px" },
  row: { display: "flex", gap: "10px" },
  input: { flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #1f2023", backgroundColor: "#383a40", color: "white", outline: "none" },
  select: { padding: "10px", borderRadius: "6px", border: "1px solid #1f2023", backgroundColor: "#383a40", color: "white", outline: "none" },
  textarea: { minHeight: "200px", padding: "15px", borderRadius: "6px", border: "1px solid #1f2023", backgroundColor: "#1e1f22", color: "#00ff00", fontFamily: "monospace", resize: "vertical", outline: "none" },
  sendBtn: { padding: "12px", backgroundColor: "#5865f2", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }
};
export {
  CodeSnippetModal as default
};
