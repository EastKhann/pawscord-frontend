var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { t as toast } from "./index-DGqPEDt8.js";
import { an as FaPlus, B as FaRobot, a as FaTimes } from "./icons-vendor-2VDeY8fW.js";
const AutoResponderManager = /* @__PURE__ */ __name(({ onClose, fetchWithAuth, apiBaseUrl, serverId, embedded = false }) => {
  const [responders, setResponders] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [showCreate, setShowCreate] = reactExports.useState(false);
  const [newResponder, setNewResponder] = reactExports.useState({ trigger: "", response: "", is_regex: false });
  reactExports.useEffect(() => {
    loadResponders();
  }, []);
  const loadResponders = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/autoresponders/list/`);
      if (res.ok) {
        const data = await res.json();
        setResponders(data.responders || []);
      }
    } catch (error) {
      console.error("Load responders error:", error);
    } finally {
      setLoading(false);
    }
  }, "loadResponders");
  const handleCreate = /* @__PURE__ */ __name(async () => {
    if (!newResponder.trigger || !newResponder.response) {
      toast.error("❌ Tetikleyici ve yanıt gerekli");
      return;
    }
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/autoresponders/create/`, {
        method: "POST",
        body: JSON.stringify(newResponder)
      });
      if (res.ok) {
        toast.success("✅ Auto-responder oluşturuldu!");
        setShowCreate(false);
        setNewResponder({ trigger: "", response: "", is_regex: false });
        loadResponders();
      }
    } catch (error) {
      console.error("Create responder error:", error);
    }
  }, "handleCreate");
  const content = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    !showCreate && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setShowCreate(true), "onClick"), style: styles.createButton, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
      " Yeni Otomatik Yanıt"
    ] }),
    showCreate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.createForm, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Tetikleyici kelime (örn: merhaba)",
          value: newResponder.trigger,
          onChange: /* @__PURE__ */ __name((e) => setNewResponder({ ...newResponder, trigger: e.target.value }), "onChange"),
          style: styles.input
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          placeholder: "Otomatik yanıt mesajı",
          value: newResponder.response,
          onChange: /* @__PURE__ */ __name((e) => setNewResponder({ ...newResponder, response: e.target.value }), "onChange"),
          style: styles.textarea
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.checkbox, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "checkbox",
            checked: newResponder.is_regex,
            onChange: /* @__PURE__ */ __name((e) => setNewResponder({ ...newResponder, is_regex: e.target.checked }), "onChange")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginLeft: "8px", color: "#b9bbbe" }, children: "Regex kullan" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleCreate, style: styles.submitButton, children: "Oluştur" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setShowCreate(false), "onClick"), style: styles.cancelButton, children: "İptal" })
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Yükleniyor..." }) : responders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "Henüz otomatik yanıt oluşturulmamış" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.responderList, children: responders.map((resp) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.responderItem, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.trigger, children: [
        "🤖 ",
        resp.trigger
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.response, children: resp.response })
    ] }) }, resp.id)) })
  ] });
  if (embedded) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: content });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: styles.title, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaRobot, {}),
        " Otomatik Yanıtlar"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: content })
  ] }) });
}, "AutoResponderManager");
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
    maxWidth: "600px",
    maxHeight: "80vh",
    display: "flex",
    flexDirection: "column"
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
    fontSize: "1.5em",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    cursor: "pointer",
    fontSize: "1.5em"
  },
  content: {
    padding: "20px",
    overflowY: "auto",
    flex: 1
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "15px"
  },
  createForm: {
    backgroundColor: "#40444b",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "15px"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "#2b2d31",
    border: "1px solid #5865f2",
    borderRadius: "4px",
    color: "white"
  },
  textarea: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    minHeight: "80px",
    backgroundColor: "#2b2d31",
    border: "1px solid #5865f2",
    borderRadius: "4px",
    color: "white",
    resize: "vertical"
  },
  checkbox: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px"
  },
  submitButton: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#3ba55d",
    border: "none",
    borderRadius: "4px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },
  cancelButton: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#f04747",
    border: "none",
    borderRadius: "4px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },
  loading: {
    textAlign: "center",
    color: "#b9bbbe",
    padding: "40px"
  },
  empty: {
    textAlign: "center",
    color: "#b9bbbe",
    padding: "40px"
  },
  responderList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  responderItem: {
    backgroundColor: "#40444b",
    padding: "15px",
    borderRadius: "8px"
  },
  trigger: {
    color: "#5865f2",
    fontWeight: "bold",
    marginBottom: "8px"
  },
  response: {
    color: "#dcddde",
    fontSize: "0.9em"
  }
};
export {
  AutoResponderManager as A
};
