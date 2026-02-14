var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
const TwoFactorLogin = /* @__PURE__ */ __name(({ onVerify, onCancel, username }) => {
  const [code, setCode] = reactExports.useState("");
  const [useBackupCode, setUseBackupCode] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const handleSubmit = /* @__PURE__ */ __name(async (e) => {
    e.preventDefault();
    if (code.length < 6) {
      setError("Geçersiz kod uzunluğu");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await onVerify(code, useBackupCode);
    } catch (err) {
      setError(err.message || "Doğrulama başarısız");
      setCode("");
    } finally {
      setLoading(false);
    }
  }, "handleSubmit");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "twofa-login-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "twofa-login-content", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "twofa-login-close", onClick: onCancel, children: "×" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "🔐 İki Faktörlü Doğrulama" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "twofa-login-subtitle", children: [
      username,
      " hesabına giriş yapılıyor"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "twofa-login-input-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: useBackupCode ? "Yedek Kod" : "Authenticator Kodu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: code,
            onChange: /* @__PURE__ */ __name((e) => setCode(e.target.value.replace(/\D/g, "")), "onChange"),
            placeholder: useBackupCode ? "12345678" : "000000",
            maxLength: useBackupCode ? 8 : 6,
            className: "twofa-login-input",
            autoFocus: true,
            disabled: loading
          }
        )
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "twofa-login-error", children: [
        "❌ ",
        error
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          className: "twofa-login-submit",
          disabled: loading || code.length < 6,
          children: loading ? "Doğrulanıyor..." : "Giriş Yap"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: /* @__PURE__ */ __name(() => {
            setUseBackupCode(!useBackupCode);
            setCode("");
            setError("");
          }, "onClick"),
          className: "twofa-login-toggle",
          children: useBackupCode ? "← Authenticator Kodu Kullan" : "Yedek Kod Kullan →"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "twofa-login-help", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "💡 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "İpucu:" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Google Authenticator veya Authy uygulamasını açın" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "PAWSCORD için gösterilen 6 haneli kodu girin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Telefonunuza erişemiyorsanız yedek kodlarınızı kullanın" })
      ] })
    ] })
  ] }) });
}, "TwoFactorLogin");
export {
  TwoFactorLogin as default
};
