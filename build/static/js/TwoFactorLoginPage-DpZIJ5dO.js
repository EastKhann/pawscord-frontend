var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { b as useNavigate, c as useSearchParams } from "./router-vendor-DrLUSS4j.js";
import { A as FaArrowLeft, a1 as FaShieldAlt, a2 as FaKey } from "./icons-vendor-2VDeY8fW.js";
import { a as useAuth, A as API_BASE_URL } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const TwoFactorLoginPage = /* @__PURE__ */ __name(() => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [code, setCode] = reactExports.useState("");
  const [useBackupCode, setUseBackupCode] = reactExports.useState(false);
  const [backupCode, setBackupCode] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const tempToken = searchParams.get("temp_token");
  reactExports.useEffect(() => {
    if (!tempToken) {
      console.warn("🔐 [2FA] No temp_token found, redirecting to login");
      navigate("/login");
    }
  }, [tempToken, navigate]);
  if (!tempToken) {
    return null;
  }
  const handleSubmit = /* @__PURE__ */ __name(async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const codeToSend = useBackupCode ? backupCode : code;
    if (!codeToSend) {
      setError("Kod gerekli");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/security/2fa/verify-login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          temp_token: tempToken,
          code: codeToSend
        })
      });
      const data = await response.json();
      if (response.ok && data.verified) {
        login(data.access, data.refresh);
        navigate("/");
      } else {
        console.error("❌ [2FA] Verification failed:", data);
        setError(data.error || "Geçersiz kod");
      }
    } catch (error2) {
      console.error("❌ [2FA] Network error:", error2);
      setError("Bağlantı hatası oluştu");
    } finally {
      setLoading(false);
    }
  }, "handleSubmit");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.container, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => navigate("/login"), "onClick"), style: styles.backButton, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaArrowLeft, {}),
      " Geri"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, { style: styles.icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "İki Faktörlü Doğrulama" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.subtitle, children: useBackupCode ? "Yedek kodunuzu girin" : "Authenticator uygulamanızdaki 6 haneli kodu girin" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, style: styles.form, children: [
      !useBackupCode ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            maxLength: 6,
            placeholder: "000000",
            value: code,
            onChange: /* @__PURE__ */ __name((e) => {
              const value = e.target.value.replace(/\D/g, "");
              setCode(value);
            }, "onChange"),
            style: styles.codeInput,
            autoFocus: true,
            disabled: loading
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: /* @__PURE__ */ __name(() => setUseBackupCode(true), "onClick"),
            style: styles.backupLink,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaKey, {}),
              " Yedek kod kullan"
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Yedek kod",
            value: backupCode,
            onChange: /* @__PURE__ */ __name((e) => setBackupCode(e.target.value), "onChange"),
            style: styles.backupInput,
            autoFocus: true,
            disabled: loading
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: /* @__PURE__ */ __name(() => setUseBackupCode(false), "onClick"),
            style: styles.backupLink,
            children: "← Authenticator kodu kullan"
          }
        )
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.error, children: [
        "❌ ",
        error
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          style: styles.submitButton,
          disabled: loading || !useBackupCode && code.length !== 6 || useBackupCode && !backupCode,
          children: loading ? "Doğrulanıyor..." : "Giriş Yap"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.info, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.infoTitle, children: "💡 İpuçları:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { style: styles.infoList, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Kod sürekli değişir (30 saniyede bir)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Telefonunuzu kaybettiyseniz yedek kod kullanın" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Her yedek kod sadece bir kere kullanılabilir" })
      ] })
    ] })
  ] }) });
}, "TwoFactorLoginPage");
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
  subtitle: {
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
  codeInput: {
    backgroundColor: "#1e1f22",
    border: "2px solid #5865f2",
    borderRadius: "6px",
    padding: "16px",
    color: "#fff",
    fontSize: "32px",
    textAlign: "center",
    letterSpacing: "8px",
    fontFamily: "monospace",
    outline: "none"
  },
  backupInput: {
    backgroundColor: "#1e1f22",
    border: "1px solid #1e1f22",
    borderRadius: "6px",
    padding: "12px",
    color: "#fff",
    fontSize: "16px",
    textAlign: "center",
    fontFamily: "monospace",
    outline: "none"
  },
  backupLink: {
    background: "none",
    border: "none",
    color: "#5865f2",
    cursor: "pointer",
    fontSize: "14px",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px"
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
  }
};
export {
  TwoFactorLoginPage as default
};
