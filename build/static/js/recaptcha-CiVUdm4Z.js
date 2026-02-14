var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports } from "./react-core-BiY6fgAJ.js";
const RECAPTCHA_SITE_KEY = "6LfhUU0sAAAAALQKKgbT5xKopHIlv2isjdzEKIo4";
const loadRecaptcha = /* @__PURE__ */ __name(() => {
  return new Promise((resolve, reject) => {
    if (window.grecaptcha) {
      resolve(window.grecaptcha);
      return;
    }
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.grecaptcha.ready(() => {
        resolve(window.grecaptcha);
      });
    };
    script.onerror = () => {
      reject(new Error("Failed to load reCAPTCHA"));
    };
    document.head.appendChild(script);
  });
}, "loadRecaptcha");
const executeRecaptcha = /* @__PURE__ */ __name(async (action = "submit") => {
  try {
    await loadRecaptcha();
    const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
    return token;
  } catch (error) {
    console.error("reCAPTCHA error:", error);
    return null;
  }
}, "executeRecaptcha");
const useRecaptcha = /* @__PURE__ */ __name(() => {
  reactExports.useEffect(() => {
    loadRecaptcha().catch((err) => {
      console.warn("reCAPTCHA load failed:", err);
    });
  }, []);
  const getToken = reactExports.useCallback(async (action) => {
    return await executeRecaptcha(action);
  }, []);
  return { getToken };
}, "useRecaptcha");
export {
  useRecaptcha as u
};
