var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a as FaTimes } from "./icons-vendor-2VDeY8fW.js";
const EncryptionKeyModal = /* @__PURE__ */ __name(({ onClose, onSetKey, existingKey }) => {
  const [key, setKey] = reactExports.useState(existingKey || "");
  reactExports.useEffect(() => {
    const handleEsc = /* @__PURE__ */ __name((e) => {
      if (e.key === "Escape") onClose();
    }, "handleEsc");
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);
  const handleSubmit = /* @__PURE__ */ __name((e) => {
    e.preventDefault();
    onSetKey(key);
    onClose();
  }, "handleSubmit");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "🔐 Güvenli Sohbet Anahtarı" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, style: styles.body, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", fontSize: "0.9em" }, children: "Bu sohbet için ortak bir şifre belirleyin. Bu şifre sunucuya gönderilmez. Sadece aynı şifreyi giren taraf mesajları okuyabilir." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "password",
          value: key,
          onChange: /* @__PURE__ */ __name((e) => setKey(e.target.value), "onChange"),
          placeholder: "Gizli Anahtar (Örn: 123456)",
          style: styles.input,
          autoFocus: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", style: styles.saveBtn, children: "Kaydet" }),
      existingKey && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: /* @__PURE__ */ __name(() => {
        onSetKey("");
        onClose();
      }, "onClick"), style: styles.clearBtn, children: "Şifrelemeyi Kapat" })
    ] })
  ] }) });
}, "EncryptionKeyModal");
const styles = {
  overlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.8)", zIndex: 2e3, display: "flex", justifyContent: "center", alignItems: "center" },
  modal: { backgroundColor: "#36393f", width: "400px", borderRadius: "8px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" },
  header: { padding: "15px 20px", backgroundColor: "#2f3136", display: "flex", justifyContent: "space-between", alignItems: "center", color: "white" },
  closeBtn: { background: "none", border: "none", color: "#b9bbbe", cursor: "pointer" },
  body: { padding: "20px", display: "flex", flexDirection: "column", gap: "15px" },
  input: { padding: "10px", borderRadius: "4px", border: "1px solid #202225", backgroundColor: "#202225", color: "white", outline: "none" },
  saveBtn: { padding: "10px", backgroundColor: "#3ba55c", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" },
  clearBtn: { padding: "10px", backgroundColor: "#ed4245", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }
};
export {
  EncryptionKeyModal as default
};
