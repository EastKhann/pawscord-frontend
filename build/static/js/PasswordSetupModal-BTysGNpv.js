var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { w as FaCheckCircle, c0 as FaGoogle, h as FaLock, $ as FaEyeSlash, a0 as FaEye, v as FaSpinner } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const PasswordSetupModal = /* @__PURE__ */ __name(({ onClose, apiBaseUrl }) => {
  const [password, setPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [success, setSuccess] = reactExports.useState(false);
  const validatePassword = /* @__PURE__ */ __name(() => {
    if (password.length < 8) {
      toast.error("Şifre en az 8 karakter olmalıdır");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Şifreler eşleşmiyor");
      return false;
    }
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      toast.error("Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir");
      return false;
    }
    return true;
  }, "validatePassword");
  const handleSubmit = /* @__PURE__ */ __name(async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/users/change_password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          new_password: password
        })
      });
      if (response.ok) {
        setSuccess(true);
        toast.success("✅ Şifre başarıyla belirlendi!");
        setTimeout(() => {
          onClose();
        }, 2e3);
      } else {
        const data = await response.json();
        toast.error(data.error || "Şifre belirlenemedi");
      }
    } catch (error) {
      console.error("Password setup error:", error);
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }, "handleSubmit");
  const handleSkip = /* @__PURE__ */ __name(() => {
    toast.info("Şifreyi daha sonra profil ayarlarından belirleyebilirsin");
    onClose();
  }, "handleSkip");
  const getPasswordStrength = /* @__PURE__ */ __name(() => {
    let strength2 = 0;
    if (password.length >= 8) strength2++;
    if (password.length >= 12) strength2++;
    if (/[A-Z]/.test(password)) strength2++;
    if (/[a-z]/.test(password)) strength2++;
    if (/[0-9]/.test(password)) strength2++;
    if (/[^A-Za-z0-9]/.test(password)) strength2++;
    return strength2;
  }, "getPasswordStrength");
  const strengthColors = ["#f04747", "#faa61a", "#faa61a", "#43b581", "#43b581", "#43b581"];
  const strengthLabels = ["Çok Zayıf", "Zayıf", "Orta", "İyi", "Güçlü", "Çok Güçlü"];
  const strength = getPasswordStrength();
  if (success) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "password-setup-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "password-setup-modal success", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "success-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheckCircle, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Şifre Belirlendi!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Artık e-posta ve şifrenle de giriş yapabilirsin." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "password-setup-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "password-setup-modal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "password-setup-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-icon", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaGoogle, { className: "google-icon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaLock, { className: "lock-icon" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Şifre Belirle" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Google ile giriş yaptın! Hesabını daha güvenli hale getirmek için bir şifre belirleyebilirsin." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "password-setup-form", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Yeni Şifre" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "password-input-wrapper", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaLock, { className: "input-icon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: showPassword ? "text" : "password",
              value: password,
              onChange: /* @__PURE__ */ __name((e) => setPassword(e.target.value), "onChange"),
              placeholder: "En az 8 karakter",
              required: true,
              minLength: 8
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "toggle-visibility",
              onClick: /* @__PURE__ */ __name(() => setShowPassword(!showPassword), "onClick"),
              children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaEyeSlash, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaEye, {})
            }
          )
        ] }),
        password && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "password-strength", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "strength-bars", children: [...Array(6)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `strength-bar ${i < strength ? "active" : ""}`,
              style: { backgroundColor: i < strength ? strengthColors[strength - 1] : void 0 }
            },
            i
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: strengthColors[strength - 1] || "#72767d" }, children: strengthLabels[strength - 1] || "Şifre girin" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Şifre Tekrar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "password-input-wrapper", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaLock, { className: "input-icon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: showConfirmPassword ? "text" : "password",
              value: confirmPassword,
              onChange: /* @__PURE__ */ __name((e) => setConfirmPassword(e.target.value), "onChange"),
              placeholder: "Şifreyi tekrar girin",
              required: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "toggle-visibility",
              onClick: /* @__PURE__ */ __name(() => setShowConfirmPassword(!showConfirmPassword), "onClick"),
              children: showConfirmPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaEyeSlash, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaEye, {})
            }
          )
        ] }),
        confirmPassword && password !== confirmPassword && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "error-text", children: "Şifreler eşleşmiyor" }),
        confirmPassword && password === confirmPassword && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "success-text", children: "✓ Şifreler eşleşiyor" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "password-requirements", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Şifre gereksinimleri:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: password.length >= 8 ? "met" : "", children: "En az 8 karakter" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: /[A-Z]/.test(password) ? "met" : "", children: "En az bir büyük harf (A-Z)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: /[a-z]/.test(password) ? "met" : "", children: "En az bir küçük harf (a-z)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: /[0-9]/.test(password) ? "met" : "", children: "En az bir rakam (0-9)" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "button-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            className: "submit-btn",
            disabled: loading || password.length < 8 || password !== confirmPassword,
            children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaSpinner, { className: "spin" }),
              "Kaydediliyor..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaLock, {}),
              "Şifreyi Belirle"
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "skip-btn",
            onClick: handleSkip,
            disabled: loading,
            children: "Daha Sonra"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "password-setup-footer", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "💡 Şifreyi belirlersen hem Google hem de e-posta/şifre ile giriş yapabilirsin." }) })
  ] }) });
}, "PasswordSetupModal");
export {
  PasswordSetupModal as default
};
