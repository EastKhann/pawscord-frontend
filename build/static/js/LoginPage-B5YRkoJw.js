var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a3 as FaPaw, C as FaUser, _ as FaEnvelope, h as FaLock } from "./icons-vendor-2VDeY8fW.js";
import { C as Capacitor, G as GoogleAuth, c as GOOGLE_WEB_CLIENT_ID, i as isElectron, t as toast, A as API_BASE_URL } from "./index-DGqPEDt8.js";
import { u as useRecaptcha } from "./recaptcha-CiVUdm4Z.js";
import { j as jwtDecode } from "./crypto-vendor-NANfm9jb.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./ui-vendor-iPoN0WGz.js";
const LoginPage = /* @__PURE__ */ __name(({ onLogin, onRegister, error, setAuthError }) => {
  const [isLoginMode, setIsLoginMode] = reactExports.useState(true);
  const [formData, setFormData] = reactExports.useState({ username: "", email: "", password: "" });
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const { getToken: getRecaptchaToken } = useRecaptcha();
  reactExports.useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      try {
        GoogleAuth.initialize({
          clientId: GOOGLE_WEB_CLIENT_ID,
          scopes: ["profile", "email"],
          grantOfflineAccess: true
        });
      } catch (error2) {
        console.error("❌ [Google] Initialization failed:", error2);
      }
    }
  }, []);
  reactExports.useEffect(() => {
    if (isElectron && window.require) {
      const { ipcRenderer } = window.require("electron");
      const handleAuthSuccess = /* @__PURE__ */ __name((event, data) => {
        try {
          const { access, refresh } = data;
          if (access && refresh) {
            const decoded = jwtDecode(access);
            localStorage.removeItem("chat_username");
            localStorage.setItem("access_token", access);
            localStorage.setItem("refresh_token", refresh);
            localStorage.setItem("chat_username", decoded.username);
            setTimeout(() => window.location.reload(), 500);
          }
        } catch (e) {
          console.error("❌ [Electron] Token error:", e);
          setAuthError("Token işleme hatası.");
        }
      }, "handleAuthSuccess");
      const handleAuthError = /* @__PURE__ */ __name((event, data) => {
        console.error("❌ [Electron] Auth error:", data);
        setAuthError(data.error || "Google girişi başarısız.");
      }, "handleAuthError");
      const handleOAuthTokens = /* @__PURE__ */ __name((event, data) => {
        try {
          const { access, refresh } = data;
          if (access && refresh) {
            const decoded = jwtDecode(access);
            localStorage.removeItem("chat_username");
            localStorage.setItem("access_token", access);
            localStorage.setItem("refresh_token", refresh);
            localStorage.setItem("chat_username", decoded.username);
            setTimeout(() => window.location.reload(), 500);
          }
        } catch (e) {
          console.error("❌ [Electron] OAuth token error:", e);
          setAuthError("Token işleme hatası.");
        }
      }, "handleOAuthTokens");
      const handleDeepLink = /* @__PURE__ */ __name((event, url) => {
        try {
          const urlObj = new URL(url);
          const params = new URLSearchParams(urlObj.search);
          const accessToken = params.get("access");
          const refreshToken = params.get("refresh");
          if (accessToken && refreshToken) {
            const decoded = jwtDecode(accessToken);
            localStorage.removeItem("chat_username");
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken);
            localStorage.setItem("chat_username", decoded.username);
            window.location.reload();
          }
        } catch (e) {
          console.error("Deep link hatası:", e);
          try {
            if (url.includes("access=") && url.includes("refresh=")) {
              const parts = url.split("access=");
              if (parts.length > 1) {
                const access = parts[1].split("&")[0];
                const refreshParts = url.split("refresh=");
                if (refreshParts.length > 1) {
                  const refresh = refreshParts[1];
                  const decoded = jwtDecode(access);
                  localStorage.removeItem("chat_username");
                  localStorage.setItem("access_token", access);
                  localStorage.setItem("refresh_token", refresh);
                  localStorage.setItem("chat_username", decoded.username);
                  window.location.reload();
                } else {
                  setAuthError("Giriş verisi okunamadı.");
                }
              } else {
                setAuthError("Giriş verisi okunamadı.");
              }
            } else {
              setAuthError("Giriş verisi okunamadı.");
            }
          } catch (parseError) {
            console.error("Manual parsing error:", parseError);
            setAuthError("Giriş işlemi başarısız.");
          }
        }
      }, "handleDeepLink");
      ipcRenderer.on("google-auth-success", handleAuthSuccess);
      ipcRenderer.on("google-auth-error", handleAuthError);
      ipcRenderer.on("deep-link-auth", handleDeepLink);
      ipcRenderer.on("oauth-tokens", handleOAuthTokens);
      return () => {
        ipcRenderer.removeListener("google-auth-success", handleAuthSuccess);
        ipcRenderer.removeListener("google-auth-error", handleAuthError);
        ipcRenderer.removeListener("deep-link-auth", handleDeepLink);
        ipcRenderer.removeListener("oauth-tokens", handleOAuthTokens);
      };
    }
  }, [setAuthError]);
  reactExports.useEffect(() => {
    if (!isElectron) {
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get("access");
      const refreshToken = params.get("refresh");
      const error2 = params.get("error");
      if (error2) {
        console.error("❌ [Web] OAuth error from URL:", error2);
        setAuthError(decodeURIComponent(error2));
        window.history.replaceState({}, document.title, "/");
        return;
      }
      if (accessToken && refreshToken) {
        try {
          const decoded = jwtDecode(accessToken);
          localStorage.removeItem("chat_username");
          localStorage.setItem("access_token", accessToken);
          localStorage.setItem("refresh_token", refreshToken);
          localStorage.setItem("chat_username", decoded.username);
          window.history.replaceState({}, document.title, "/");
          window.location.reload();
        } catch (storageError) {
          console.error("❌ [Web] LocalStorage error:", storageError);
          setAuthError("Tarayıcı depolama hatası. Lütfen gizli modda değilseniz kontrol edin.");
        }
      }
    }
  }, []);
  const handleGoogleLogin = /* @__PURE__ */ __name(async () => {
    try {
      if (Capacitor.isNativePlatform()) {
        const googleUser = await GoogleAuth.signIn();
        const url = `${API_BASE_URL}/auth/google/native/`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({ token: googleUser.authentication.idToken })
        });
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const textResponse = await response.text();
          console.error("❌ [Google] Backend HTML döndü:", textResponse.substring(0, 500));
          setAuthError("Backend hatası: JSON yerine HTML yanıtı alındı. Sunucu ayarlarını kontrol edin.");
          return;
        }
        const data = await response.json();
        if (response.ok) {
          if (data.access && data.refresh) {
            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);
            window.location.reload();
          } else {
            console.error("❌ [Google] Tokens eksik:", data);
            setAuthError("Token bilgileri eksik.");
          }
        } else {
          console.error("❌ [Google] Login failed:", data);
          setAuthError(data.error || "Google girişi başarısız.");
        }
      } else {
        const source = isElectron ? "electron" : "web";
        const oauthBaseUrl = isElectron ? "https://api.pawscord.com/api" : API_BASE_URL;
        const redirectUrl = `${oauthBaseUrl}/auth/google/start/?source=${source}`;
        if (isElectron && window.require) {
          const { ipcRenderer } = window.require("electron");
          ipcRenderer.send("start-google-login", redirectUrl);
        } else {
          window.location.href = redirectUrl;
        }
      }
    } catch (error2) {
      console.error("❌ [Google] Unexpected error:", error2);
      setAuthError("Google girişi sırasında bir hata oluştu: " + error2.message);
    }
  }, "handleGoogleLogin");
  const handleSubmit = /* @__PURE__ */ __name(async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError("");
    try {
      const recaptchaToken = await getRecaptchaToken(isLoginMode ? "login" : "register");
      if (isLoginMode) {
        await onLogin(formData.username, formData.password, recaptchaToken);
      } else {
        const success = await onRegister(formData.username, formData.email, formData.password, recaptchaToken);
        if (success) {
          toast.success("Kayıt başarılı! Lütfen e-postanı kontrol et.", 4e3);
          setIsLoginMode(true);
        }
      }
    } catch (error2) {
      console.error("❌ [Login] Beklenmeyen hata:", error2);
      setAuthError("Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  }, "handleSubmit");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "login-container", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "background-animate" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "login-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "logo-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "logo-circle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaPaw, { size: 40, color: "white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Pawscord" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: isLoginMode ? "Tekrar hoşgeldin!" : "Aramıza katıl!" })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "error-message", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaUser, { className: "input-icon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "Kullanıcı Adı",
              value: formData.username,
              onChange: /* @__PURE__ */ __name((e) => setFormData({ ...formData, username: e.target.value }), "onChange"),
              required: true
            }
          )
        ] }),
        !isLoginMode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group slide-down", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaEnvelope, { className: "input-icon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "email",
              placeholder: "E-posta Adresi",
              value: formData.email,
              onChange: /* @__PURE__ */ __name((e) => setFormData({ ...formData, email: e.target.value }), "onChange"),
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaLock, { className: "input-icon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "password",
              placeholder: "Şifre",
              value: formData.password,
              onChange: /* @__PURE__ */ __name((e) => setFormData({ ...formData, password: e.target.value }), "onChange"),
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "submit-btn", disabled: isLoading, children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }) : isLoginMode ? "Giriş Yap" : "Kayıt Ol" })
      ] }),
      isLoginMode && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        marginTop: "10px",
        textAlign: "center"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "#/forgot-password",
          style: {
            color: "#5865f2",
            textDecoration: "none",
            fontSize: "14px",
            transition: "opacity 0.2s"
          },
          onMouseEnter: /* @__PURE__ */ __name((e) => e.target.style.opacity = "0.8", "onMouseEnter"),
          onMouseLeave: /* @__PURE__ */ __name((e) => e.target.style.opacity = "1", "onMouseLeave"),
          children: "Şifremi Unuttum?"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divider", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "veya" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "google-btn-wrapper", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleGoogleLogin,
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: "11px",
            borderRadius: "20px",
            border: "1px solid #dadce0",
            backgroundColor: "#ffffff",
            color: "#3c4043",
            fontWeight: "500",
            cursor: "pointer",
            fontSize: "14px",
            gap: "10px",
            fontFamily: '"Google Sans", arial, sans-serif',
            transition: "background-color .2s, box-shadow .2s",
            boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
          },
          onMouseEnter: /* @__PURE__ */ __name((e) => {
            e.currentTarget.style.backgroundColor = "#f7f8f8";
            e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.2)";
          }, "onMouseEnter"),
          onMouseLeave: /* @__PURE__ */ __name((e) => {
            e.currentTarget.style.backgroundColor = "#ffffff";
            e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.1)";
          }, "onMouseLeave"),
          onMouseDown: /* @__PURE__ */ __name((e) => e.currentTarget.style.backgroundColor = "#eff2f5", "onMouseDown"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
                alt: "G",
                style: { width: "18px", height: "18px" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Google ile Giriş Yap" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "toggle-mode", children: [
        isLoginMode ? "Hesabın yok mu? " : "Zaten üye misin? ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { onClick: /* @__PURE__ */ __name(() => {
          setIsLoginMode(!isLoginMode);
          setAuthError("");
        }, "onClick"), children: isLoginMode ? "Kayıt Ol" : "Giriş Yap" })
      ] })
    ] })
  ] });
}, "LoginPage");
export {
  LoginPage as default
};
