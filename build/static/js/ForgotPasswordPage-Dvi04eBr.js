var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { w as FaCheckCircle, A as FaArrowLeft, _ as FaEnvelope } from "./icons-vendor-2VDeY8fW.js";
import { u as useRecaptcha } from "./recaptcha-CiVUdm4Z.js";
import { b as useNavigate } from "./router-vendor-DrLUSS4j.js";
const ForgotPasswordPage = /* @__PURE__ */ __name(({ apiBaseUrl }) => {
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState("idle");
  const [error, setError] = reactExports.useState("");
  const { getToken: getRecaptchaToken } = useRecaptcha();
  const handleSubmit = /* @__PURE__ */ __name(async (e) => {
    e.preventDefault();
    setError("");
    setStatus("loading");
    try {
      const recaptchaToken = await getRecaptchaToken("password_reset");
      const response = await fetch(`${apiBaseUrl}/auth/request-password-reset/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, recaptcha_token: recaptchaToken })
      });
      const data = await response.json();
      if (response.ok) {
        setStatus("sent");
      } else {
        setError(data.error || "Bir hata oluştu");
        setStatus("idle");
      }
    } catch (error2) {
      setError("Bağlantı hatası oluştu");
      setStatus("idle");
    }
  }, "handleSubmit");
  if (status === "sent") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.container, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.card, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheckCircle, { style: { ...styles.icon, color: "#23a559" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Email Gönderildi!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: styles.text, children: [
        "Eğer ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: email }),
        " adresine kayıtlı bir hesap varsa, şifre sıfırlama linki gönderildi."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.infoText, children: "📧 Email'inizi kontrol edin (Spam klasörünü de kontrol etmeyi unutmayın)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.infoText, children: "⏱️ Link 1 saat geçerlidir" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => navigate("/login"), "onClick"), style: styles.button, children: "Giriş Sayfasına Dön" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.container, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => navigate("/login"), "onClick"), style: styles.backButton, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaArrowLeft, {}),
      " Geri"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FaEnvelope, { style: styles.icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Şifremi Unuttum" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.text, children: "Email adresinizi girin, size şifre sıfırlama linki gönderelim." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, style: styles.form, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "email",
          placeholder: "Email adresiniz",
          value: email,
          onChange: /* @__PURE__ */ __name((e) => setEmail(e.target.value), "onChange"),
          required: true,
          style: styles.input,
          disabled: status === "loading"
        }
      ),
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.error, children: [
        "❌ ",
        error
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          style: styles.submitButton,
          disabled: status === "loading",
          children: status === "loading" ? "Gönderiliyor..." : "Sıfırlama Linki Gönder"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.info, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.infoTitle, children: "💡 Bilgi:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { style: styles.infoList, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Email hesabınıza erişiminiz olmalı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Link 1 saat geçerlidir" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Güvenlik nedeniyle email'in kayıtlı olup olmadığını söylemiyoruz" })
      ] })
    ] })
  ] }) });
}, "ForgotPasswordPage");
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
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
    position: "relative"
  },
  backButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
    background: "none",
    border: "none",
    color: "#b9bbbe",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "color 0.2s"
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
  input: {
    backgroundColor: "#1e1f22",
    border: "1px solid #1e1f22",
    borderRadius: "6px",
    padding: "12px",
    color: "#fff",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.2s"
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
  infoText: {
    color: "#b9bbbe",
    fontSize: "14px",
    textAlign: "center",
    margin: "10px 0"
  },
  infoList: {
    color: "#b9bbbe",
    fontSize: "14px",
    margin: 0,
    paddingLeft: "20px"
  }
};
export {
  ForgotPasswordPage as default
};
