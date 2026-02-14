var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { v as FaSpinner, w as FaCheckCircle, x as FaTimesCircle } from "./icons-vendor-2VDeY8fW.js";
import { a as useParams, b as useNavigate } from "./router-vendor-DrLUSS4j.js";
const VerifyEmailPage = /* @__PURE__ */ __name(({ apiBaseUrl }) => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = reactExports.useState("loading");
  const [message, setMessage] = reactExports.useState("");
  const [username, setUsername] = reactExports.useState("");
  reactExports.useEffect(() => {
    verifyEmail();
  }, [token]);
  const verifyEmail = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/auth/verify-email/${token}/`);
      const data = await response.json();
      if (response.ok) {
        setStatus("success");
        setUsername(data.username);
        setMessage("Email adresiniz başarıyla doğrulandı!");
        setTimeout(() => {
          navigate("/login");
        }, 3e3);
      } else {
        setStatus("error");
        setMessage(data.error || "Doğrulama başarısız oldu");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Bağlantı hatası oluştu");
    }
  }, "verifyEmail");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.container, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.card, children: [
    status === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaSpinner, { style: styles.iconLoading }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Email Doğrulanıyor..." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.text, children: "Lütfen bekleyin..." })
    ] }),
    status === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheckCircle, { style: { ...styles.icon, color: "#23a559" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "✅ Başarılı!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.text, children: message }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: styles.username, children: [
        "Hoş geldin, ",
        username,
        "!"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.redirect, children: "3 saniye içinde giriş sayfasına yönlendirileceksiniz..." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => navigate("/login"), "onClick"), style: styles.button, children: "Hemen Giriş Yap" })
    ] }),
    status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimesCircle, { style: { ...styles.icon, color: "#da373c" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "❌ Hata" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.text, children: message }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.errorReasons, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.reasonTitle, children: "Olası sebepler:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { style: styles.reasonList, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Link süresi dolmuş olabilir (24 saat)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Link daha önce kullanılmış olabilir" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Geçersiz bir link olabilir" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => navigate("/login"), "onClick"), style: styles.button, children: "Giriş Sayfasına Dön" })
    ] })
  ] }) });
}, "VerifyEmailPage");
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
    textAlign: "center"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px"
  },
  icon: {
    fontSize: "64px",
    marginBottom: "10px"
  },
  iconLoading: {
    fontSize: "64px",
    color: "#5865f2",
    animation: "spin 1s linear infinite",
    marginBottom: "10px"
  },
  title: {
    color: "#fff",
    fontSize: "28px",
    margin: 0
  },
  text: {
    color: "#b9bbbe",
    fontSize: "16px",
    margin: 0
  },
  username: {
    color: "#5865f2",
    fontSize: "20px",
    fontWeight: "bold",
    margin: 0
  },
  redirect: {
    color: "#747f8d",
    fontSize: "14px",
    fontStyle: "italic"
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
    marginTop: "10px",
    transition: "background-color 0.2s"
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
  VerifyEmailPage as default
};
