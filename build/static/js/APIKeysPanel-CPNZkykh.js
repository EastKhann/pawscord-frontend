var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { t as toast } from "./index-DGqPEDt8.js";
import { an as FaPlus, a2 as FaKey, $ as FaEyeSlash, a0 as FaEye, aV as FaCopy, g as FaTrash } from "./icons-vendor-2VDeY8fW.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const APIKeysPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl }) => {
  const [keys, setKeys] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [showKey, setShowKey] = reactExports.useState({});
  reactExports.useEffect(() => {
    loadKeys();
  }, []);
  const loadKeys = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/apikeys/list/`);
      if (res.ok) {
        const data = await res.json();
        setKeys(data);
      }
    } catch (e) {
      console.error("API keys load error:", e);
    } finally {
      setLoading(false);
    }
  }, "loadKeys");
  const createKey = /* @__PURE__ */ __name(async () => {
    const name = prompt("API Key name:");
    if (!name) return;
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/apikeys/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });
      if (res.ok) {
        const newKey = await res.json();
        toast.success(`✅ Key created!

Key: ${newKey.key}

⚠️ Save this! It won't be shown again.`);
        loadKeys();
      }
    } catch (e) {
      toast.error("❌ Failed to create key");
    }
  }, "createKey");
  const deleteKey = /* @__PURE__ */ __name(async (keyId) => {
    if (!confirm("Delete this API key?")) return;
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/apikeys/${keyId}/delete/`, {
        method: "DELETE"
      });
      if (res.ok) {
        loadKeys();
      }
    } catch (e) {
      toast.error("❌ Failed to delete key");
    }
  }, "deleteKey");
  const copyKey = /* @__PURE__ */ __name((key) => {
    navigator.clipboard.writeText(key);
    toast.success("✅ Copied to clipboard!");
  }, "copyKey");
  const maskKey = /* @__PURE__ */ __name((key) => {
    if (!key) return "";
    return key.substring(0, 8) + "•".repeat(24);
  }, "maskKey");
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "20px", color: "#b9bbbe" }, children: "Loading..." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "20px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { margin: 0, color: "#dcddde" }, children: "API Keys" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "5px 0 0 0", color: "#72767d", fontSize: "13px" }, children: "Create and manage API keys for external integrations" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: createKey,
          style: {
            padding: "8px 16px",
            backgroundColor: "#5865f2",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: "bold"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
            " New Key"
          ]
        }
      )
    ] }),
    keys.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      padding: "40px",
      textAlign: "center",
      color: "#72767d",
      backgroundColor: "#2f3136",
      borderRadius: "8px"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaKey, { style: { fontSize: "48px", marginBottom: "16px", opacity: 0.5 } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No API keys yet" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: "12px" }, children: keys.map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          padding: "16px",
          backgroundColor: "#2f3136",
          borderRadius: "8px",
          border: "1px solid #40444b"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaKey, { style: { color: "#5865f2" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#dcddde", fontWeight: "bold" }, children: key.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px",
              backgroundColor: "#1e1f22",
              borderRadius: "4px",
              fontFamily: "monospace",
              fontSize: "13px",
              color: "#b9bbbe"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: showKey[key.id] ? key.key : maskKey(key.key) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: /* @__PURE__ */ __name(() => setShowKey((prev) => ({ ...prev, [key.id]: !prev[key.id] })), "onClick"),
                  style: {
                    background: "none",
                    border: "none",
                    color: "#b9bbbe",
                    cursor: "pointer",
                    padding: "4px"
                  },
                  children: showKey[key.id] ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaEyeSlash, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaEye, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: /* @__PURE__ */ __name(() => copyKey(key.key), "onClick"),
                  style: {
                    background: "none",
                    border: "none",
                    color: "#b9bbbe",
                    cursor: "pointer",
                    padding: "4px"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCopy, {})
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: "8px", fontSize: "12px", color: "#72767d" }, children: [
              "Created: ",
              new Date(key.created_at).toLocaleDateString(),
              key.last_used && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                " • Last used: ",
                new Date(key.last_used).toLocaleDateString()
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: /* @__PURE__ */ __name(() => deleteKey(key.id), "onClick"),
              style: {
                background: "none",
                border: "none",
                color: "#f04747",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "4px"
              },
              title: "Delete key",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {})
            }
          )
        ] })
      },
      key.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      padding: "12px",
      backgroundColor: "rgba(250, 166, 26, 0.1)",
      borderLeft: "3px solid #faa61a",
      borderRadius: "4px",
      fontSize: "13px",
      color: "#dcddde"
    }, children: [
      "⚠️ ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Security:" }),
      " Keep your API keys secret! Anyone with your key can access your account."
    ] })
  ] });
}, "APIKeysPanel");
export {
  APIKeysPanel as default
};
