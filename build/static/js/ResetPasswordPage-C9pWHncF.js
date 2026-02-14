var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { w as FaCheckCircle, x as FaTimesCircle, h as FaLock, $ as FaEyeSlash, a0 as FaEye } from "./icons-vendor-2VDeY8fW.js";
import { a as useParams, b as useNavigate } from "./router-vendor-DrLUSS4j.js";
const ResetPasswordPage = /* @__PURE__ */ __name(({ apiBaseUrl }) => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = reactExports.useState(false);
  const [status, setStatus] = reactExports.useState("idle");
  const [error, setError] = reactExports.useState("");
  const getPasswordStrength = /* @__PURE__ */ __name((pass) => {
    if (pass.length === 0) return { score: 0, text: "", color: "" };
    if (pass.length < 6) return { score: 1, text: "Çok Zayıf", color: "#da373c" };
    if (pass.length < 8) return { score: 2, text: "Zayıf", color: "#f0b132" };
    if (pass.length < 12) return { score: 3, text: "Orta", color: "#5865f2" };
    if (pass.length < 16) return { score: 4, text: "Güçlü", color: "#23a559" };
    return { score: 5, text: "Çok Güçlü", color: "#23a559" };
  }, "getPasswordStrength");
  const strength = getPasswordStrength(password);
  const handleSubmit = /* @__PURE__ */ __name(async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Şifre en az 6 karakter olmalı");
      return;
    }
    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor");
      return;
    }
    setStatus("loading");
    try {
      const response = await fetch(`${apiBaseUrl}/auth/reset-password/${token}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password })
      });
      const data = await response.json();
      if (response.ok) {
        setStatus("success");
        setTimeout(() => {
          navigate("/login");
        }, 3e3);
      } else {
        setError(data.error || "Şifre sıfırlama başarısız oldu");
        setStatus("error");
      }
    } catch (error2) {
      setError("Bağlantı hatası oluştu");
      setStatus("error");
    }
  }, "handleSubmit");
  if (status === "success") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.container, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.card, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheckCircle, { style: { ...styles.icon, color: "#23a559" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "✅ Şifre Değiştirildi!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.text, children: "Şifreniz başarıyla değiştirildi." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.redirect, children: "3 saniye içinde giriş sayfasına yönlendirileceksiniz..." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => navigate("/login"), "onClick"), style: styles.button, children: "Hemen Giriş Yap" })
    ] }) });
  }
  if (status === "error") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.container, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.card, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimesCircle, { style: { ...styles.icon, color: "#da373c" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "❌ Hata" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.text, children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.errorReasons, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.reasonTitle, children: "Olası sebepler:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { style: styles.reasonList, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Link süresi dolmuş olabilir (1 saat)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Link daha önce kullanılmış olabilir" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Geçersiz bir link olabilir" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => navigate("/forgot-password"), "onClick"), style: styles.button, children: "Yeni Link İste" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.container, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FaLock, { style: styles.icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Yeni Şifre Belirle" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.text, children: "Hesabınız için yeni bir şifre oluşturun." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, style: styles.form, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inputContainer, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: showPassword ? "text" : "password",
            placeholder: "Yeni şifre",
            value: password,
            onChange: /* @__PURE__ */ __name((e) => setPassword(e.target.value), "onChange"),
            required: true,
            style: styles.input,
            disabled: status === "loading"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: /* @__PURE__ */ __name(() => setShowPassword(!showPassword), "onClick"),
            style: styles.eyeButton,
            children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaEyeSlash, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaEye, {})
          }
        )
      ] }),
      password && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.strengthContainer, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.strengthBar, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              ...styles.strengthFill,
              width: `${strength.score / 5 * 100}%`,
              backgroundColor: strength.color
            }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { ...styles.strengthText, color: strength.color }, children: strength.text })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inputContainer, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: showConfirmPassword ? "text" : "password",
            placeholder: "Şifre tekrar",
            value: confirmPassword,
            onChange: /* @__PURE__ */ __name((e) => setConfirmPassword(e.target.value), "onChange"),
            required: true,
            style: styles.input,
            disabled: status === "loading"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: /* @__PURE__ */ __name(() => setShowConfirmPassword(!showConfirmPassword), "onClick"),
            style: styles.eyeButton,
            children: showConfirmPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaEyeSlash, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaEye, {})
          }
        )
      ] }),
      confirmPassword && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: password === confirmPassword ? styles.matchGood : styles.matchBad, children: password === confirmPassword ? "✅ Şifreler eşleşiyor" : "❌ Şifreler eşleşmiyor" }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.error, children: [
        "❌ ",
        error
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          style: styles.submitButton,
          disabled: status === "loading" || password !== confirmPassword,
          children: status === "loading" ? "Kaydediliyor..." : "Şifreyi Değiştir"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.info, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.infoTitle, children: "💡 Güçlü Şifre İpuçları:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { style: styles.infoList, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "En az 8 karakter kullanın" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Büyük ve küçük harf karışımı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Rakam ve özel karakter ekleyin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Kolay tahmin edilebilir şifrelerden kaçının" })
      ] })
    ] })
  ] }) });
}, "ResetPasswordPage");
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e1f22",
    padding: "20px"
  },
  card: {
    backgroundColor: "#2b2d31",
    borderRadius: "12px",
    padding: "40px",
    maxWidth: "500px",
    width: "100%",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)"
  },
  icon: {
    fontSize: "64px",
    color: "#5865f2",
    display: "block",
    margin: "0 auto 20px"
  },
  title: {
    color: "#fff",
    fontSize: "28px",
    textAlign: "center",
    margin: "0 0 10px 0"
  },
  text: {
    color: "#b9bbbe",
    fontSize: "16px",
    textAlign: "center",
    marginBottom: "30px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  inputContainer: {
    position: "relative"
  },
  input: {
    backgroundColor: "#1e1f22",
    border: "1px solid #1e1f22",
    borderRadius: "6px",
    padding: "12px",
    paddingRight: "45px",
    color: "#fff",
    fontSize: "16px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box"
  },
  eyeButton: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: "#b9bbbe",
    cursor: "pointer",
    fontSize: "18px"
  },
  strengthContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  strengthBar: {
    flex: 1,
    height: "6px",
    backgroundColor: "#1e1f22",
    borderRadius: "3px",
    overflow: "hidden"
  },
  strengthFill: {
    height: "100%",
    transition: "all 0.3s"
  },
  strengthText: {
    fontSize: "12px",
    fontWeight: "bold",
    minWidth: "80px"
  },
  matchGood: {
    color: "#23a559",
    fontSize: "14px",
    textAlign: "center"
  },
  matchBad: {
    color: "#da373c",
    fontSize: "14px",
    textAlign: "center"
  },
  error: {
    backgroundColor: "#da373c",
    color: "#fff",
    padding: "12px",
    borderRadius: "6px",
    fontSize: "14px",
    textAlign: "center"
  },
  submitButton: {
    backgroundColor: "#5865f2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.2s"
  },
  button: {
    backgroundColor: "#5865f2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "12px 32px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "20px",
    display: "block",
    width: "100%"
  },
  redirect: {
    color: "#747f8d",
    fontSize: "14px",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: "10px"
  },
  info: {
    backgroundColor: "#1e1f22",
    borderRadius: "8px",
    padding: "15px",
    marginTop: "20px"
  },
  infoTitle: {
    color: "#fff",
    fontSize: "14px",
    fontWeight: "bold",
    margin: "0 0 10px 0"
  },
  infoList: {
    color: "#b9bbbe",
    fontSize: "14px",
    margin: 0,
    paddingLeft: "20px"
  },
  errorReasons: {
    backgroundColor: "#1e1f22",
    borderRadius: "8px",
    padding: "20px",
    marginTop: "10px",
    textAlign: "left"
  },
  reasonTitle: {
    color: "#fff",
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "10px"
  },
  reasonList: {
    color: "#b9bbbe",
    fontSize: "14px",
    margin: 0,
    paddingLeft: "20px"
  }
};
export {
  ResetPasswordPage as default
};
