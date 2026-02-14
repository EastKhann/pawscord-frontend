var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
const LogoutModal = /* @__PURE__ */ __name(({ isOpen, onClose, onConfirm, username }) => {
  const [isLoggingOut, setIsLoggingOut] = reactExports.useState(false);
  if (!isOpen) return null;
  const handleConfirm = /* @__PURE__ */ __name(async () => {
    setIsLoggingOut(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    onConfirm();
  }, "handleConfirm");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "logout-modal-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "logout-modal", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: !isLoggingOut ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "logout-modal-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "logout-icon-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "logout-icon", children: "👋" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "logout-title", children: "Çıkış Yapılıyor" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "logout-subtitle", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "username-highlight", children: username || "Kullanıcı" }),
        ", hesabınızdan çıkış yapmak istediğinize emin misiniz?"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "logout-info", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "info-icon", children: "🔒" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Oturumunuz güvenli şekilde sonlandırılacak" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "info-icon", children: "💬" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Mesajlarınız ve ayarlarınız korunacak" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "info-icon", children: "🔔" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Bildirimler artık almayacaksınız" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "logout-buttons", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "logout-btn-cancel", onClick: onClose, children: "Vazgeç" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "logout-btn-confirm", onClick: handleConfirm, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "btn-icon", children: "🚪" }),
        "Çıkış Yap"
      ] })
    ] })
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "logout-loading", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "logout-spinner" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "logout-loading-text", children: [
      "Güle güle, ",
      username,
      "! 👋"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "logout-loading-subtext", children: "Oturumunuz kapatılıyor..." })
  ] }) }) });
}, "LogoutModal");
export {
  LogoutModal as default
};
