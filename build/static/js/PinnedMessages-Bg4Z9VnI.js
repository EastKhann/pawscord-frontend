var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { a as React, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import Message from "./Message-C6wc4GJi.js";
import "./media-vendor-BRMiuG2Y.js";
import "./icons-vendor-2VDeY8fW.js";
import "./LazyImage-DdkEZ080.js";
import "./imageCaching-xf5IJBbb.js";
import "./index-DGqPEDt8.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
import "./syntax-core-DVGewJU9.js";
import "./perf-vendor-C7SkqPhC.js";
const PinnedMessages = /* @__PURE__ */ __name(({ messages, onClose }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.panel, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Sabitlenmiş Mesajlar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: styles.closeButton, onClick: onClose, children: "×" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.list, children: messages.length > 0 ? messages.map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.pinnedMessageItem, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Message, { msg, currentUser: "", isAdmin: false }) }, msg.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.noPinsText, children: "Bu kanalda sabitlenmiş mesaj yok." }) })
  ] }) });
}, "PinnedMessages");
const styles = {
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1e3 },
  panel: { backgroundColor: "#36393f", color: "white", width: "90%", maxWidth: "500px", height: "70%", display: "flex", flexDirection: "column", borderRadius: "8px", boxShadow: "0 5px 15px rgba(0,0,0,0.5)" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 20px", borderBottom: "1px solid #2f3136" },
  closeButton: { background: "none", border: "none", color: "#b9bbbe", fontSize: "1.8em", cursor: "pointer" },
  list: { flexGrow: 1, overflowY: "auto", padding: "10px 20px" },
  pinnedMessageItem: { marginBottom: "10px", border: "1px solid #40444b", borderRadius: "5px" },
  noPinsText: { textAlign: "center", color: "#72767d", marginTop: "20px" }
};
const PinnedMessages_default = React.memo(PinnedMessages);
export {
  PinnedMessages_default as default
};
