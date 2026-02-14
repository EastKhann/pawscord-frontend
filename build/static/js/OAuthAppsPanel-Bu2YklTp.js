var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { an as FaPlus, g as FaTrash, aV as FaCopy, B as FaRobot, a as FaTimes, q as FaCode } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const AVAILABLE_SCOPES = ["read_messages", "send_messages", "manage_channels", "manage_roles", "manage_server", "read_user", "modify_user"];
const useOAuthApps = /* @__PURE__ */ __name((fetchWithAuth, apiBaseUrl) => {
  const [apps, setApps] = reactExports.useState([]);
  const [bots, setBots] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [activeTab, setActiveTab] = reactExports.useState("apps");
  const [showCreateApp, setShowCreateApp] = reactExports.useState(false);
  const [showCreateBot, setShowCreateBot] = reactExports.useState(false);
  const [newApp, setNewApp] = reactExports.useState({ name: "", description: "", redirect_uris: "", scopes: [] });
  const [newBot, setNewBot] = reactExports.useState({ name: "", description: "" });
  const fetchApps = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/oauth/apps/list/`);
      const data = await response.json();
      setApps(data.apps || []);
    } catch (error) {
      toast.error("Failed to load OAuth apps");
    } finally {
      setLoading(false);
    }
  }, "fetchApps");
  const fetchBots = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/bots/list/`);
      const data = await response.json();
      setBots(data.bots || []);
    } catch (error) {
      toast.error("Failed to load bots");
    }
  }, "fetchBots");
  reactExports.useEffect(() => {
    fetchApps();
    fetchBots();
  }, []);
  const createApp = /* @__PURE__ */ __name(async () => {
    if (!newApp.name) {
      toast.error("App name is required");
      return;
    }
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/oauth/apps/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newApp, redirect_uris: newApp.redirect_uris.split("\n").filter((uri) => uri.trim()) })
      });
      const data = await response.json();
      toast.success("OAuth app created successfully");
      setShowCreateApp(false);
      setNewApp({ name: "", description: "", redirect_uris: "", scopes: [] });
      fetchApps();
      if (data.client_id && data.client_secret) {
        toast.info(`Client ID: ${data.client_id}
Client Secret: ${data.client_secret}

Save these credentials securely. The secret will not be shown again.`);
      }
    } catch (error) {
      toast.error("Failed to create OAuth app");
    }
  }, "createApp");
  const createBot = /* @__PURE__ */ __name(async () => {
    if (!newBot.name) {
      toast.error("Bot name is required");
      return;
    }
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/bots/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBot)
      });
      const data = await response.json();
      toast.success("Bot created successfully");
      setShowCreateBot(false);
      setNewBot({ name: "", description: "" });
      fetchBots();
      if (data.token) {
        toast.info(`Bot Token: ${data.token}

Save this token securely. It will not be shown again.`);
      }
    } catch (error) {
      toast.error("Failed to create bot");
    }
  }, "createBot");
  const deleteApp = /* @__PURE__ */ __name(async (appId) => {
    if (!confirm("Are you sure you want to delete this app? This cannot be undone.")) return;
    try {
      await fetchWithAuth(`${apiBaseUrl}/oauth/apps/${appId}/delete/`, { method: "DELETE" });
      toast.success("App deleted successfully");
      fetchApps();
    } catch (error) {
      toast.error("Failed to delete app");
    }
  }, "deleteApp");
  const deleteBot = /* @__PURE__ */ __name(async (botId) => {
    if (!confirm("Are you sure you want to delete this bot? This cannot be undone.")) return;
    try {
      await fetchWithAuth(`${apiBaseUrl}/bots/${botId}/delete/`, { method: "DELETE" });
      toast.success("Bot deleted successfully");
      fetchBots();
    } catch (error) {
      toast.error("Failed to delete bot");
    }
  }, "deleteBot");
  const copyToClipboard = /* @__PURE__ */ __name((text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  }, "copyToClipboard");
  const toggleScope = /* @__PURE__ */ __name((scope) => {
    setNewApp((prev) => ({
      ...prev,
      scopes: prev.scopes.includes(scope) ? prev.scopes.filter((s) => s !== scope) : [...prev.scopes, scope]
    }));
  }, "toggleScope");
  return {
    apps,
    bots,
    loading,
    activeTab,
    setActiveTab,
    showCreateApp,
    setShowCreateApp,
    showCreateBot,
    setShowCreateBot,
    newApp,
    setNewApp,
    newBot,
    setNewBot,
    createApp,
    createBot,
    deleteApp,
    deleteBot,
    copyToClipboard,
    toggleScope,
    availableScopes: AVAILABLE_SCOPES
  };
}, "useOAuthApps");
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999999
  },
  modal: {
    backgroundColor: "#1e1e1e",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "900px",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #2c2f33"
  },
  headerLeft: {
    display: "flex",
    alignItems: "center"
  },
  title: {
    margin: 0,
    fontSize: "20px",
    color: "#ffffff"
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#99aab5",
    cursor: "pointer",
    fontSize: "20px",
    padding: "5px"
  },
  tabs: {
    display: "flex",
    borderBottom: "1px solid #2c2f33",
    padding: "0 20px"
  },
  tab: {
    padding: "12px 20px",
    backgroundColor: "transparent",
    border: "none",
    color: "#99aab5",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    borderBottom: "2px solid transparent"
  },
  tabActive: {
    color: "#5865f2",
    borderBottom: "2px solid #5865f2"
  },
  content: {
    padding: "20px",
    overflowY: "auto",
    flex: 1
  },
  loading: {
    textAlign: "center",
    color: "#99aab5",
    padding: "40px"
  },
  toolbar: {
    marginBottom: "20px"
  },
  createButton: {
    padding: "10px 20px",
    backgroundColor: "#5865f2",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    fontWeight: "500"
  },
  createForm: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "20px"
  },
  formTitle: {
    margin: "0 0 16px 0",
    fontSize: "16px",
    color: "#ffffff"
  },
  formGroup: {
    marginBottom: "16px"
  },
  label: {
    display: "block",
    color: "#dcddde",
    fontSize: "14px",
    marginBottom: "8px",
    fontWeight: "500"
  },
  input: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#1e1e1e",
    border: "1px solid #2c2f33",
    borderRadius: "4px",
    color: "#ffffff",
    fontSize: "14px"
  },
  scopesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "8px"
  },
  scopeCheckbox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#dcddde",
    fontSize: "14px",
    cursor: "pointer"
  },
  formActions: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
    marginTop: "20px"
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#43b581",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500"
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#4f545c",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "14px"
  },
  empty: {
    textAlign: "center",
    color: "#99aab5",
    padding: "40px"
  },
  appsList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  appCard: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "16px"
  },
  appHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12px"
  },
  appName: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "4px"
  },
  appDescription: {
    fontSize: "14px",
    color: "#99aab5"
  },
  deleteButton: {
    background: "none",
    border: "none",
    color: "#f04747",
    cursor: "pointer",
    fontSize: "16px",
    padding: "5px"
  },
  appDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  credential: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "14px",
    color: "#dcddde"
  },
  code: {
    flex: 1,
    padding: "8px",
    backgroundColor: "#1e1e1e",
    borderRadius: "4px",
    fontFamily: "monospace",
    fontSize: "13px",
    color: "#5865f2"
  },
  copyButton: {
    background: "none",
    border: "none",
    color: "#99aab5",
    cursor: "pointer",
    fontSize: "14px",
    padding: "5px"
  },
  detail: {
    fontSize: "14px",
    color: "#dcddde"
  },
  uri: {
    fontSize: "13px",
    color: "#5865f2",
    marginLeft: "8px",
    fontFamily: "monospace"
  },
  botsList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  botCard: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "16px"
  },
  botHeader: {
    display: "flex",
    alignItems: "center"
  },
  botName: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "4px"
  },
  botDescription: {
    fontSize: "14px",
    color: "#99aab5",
    marginBottom: "4px"
  },
  botStatus: {
    fontSize: "13px",
    color: "#dcddde"
  }
};
const AppsTab = /* @__PURE__ */ __name(({ o }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.toolbar, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => o.setShowCreateApp(!o.showCreateApp), "onClick"), style: styles.createButton, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, { style: { marginRight: "5px" } }),
    " New OAuth App"
  ] }) }),
  o.showCreateApp && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.createForm, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.formTitle, children: "Create OAuth Application" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Application Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: o.newApp.name,
          onChange: /* @__PURE__ */ __name((e) => o.setNewApp({ ...o.newApp, name: e.target.value }), "onChange"),
          placeholder: "My Awesome App",
          style: styles.input
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Description" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: o.newApp.description,
          onChange: /* @__PURE__ */ __name((e) => o.setNewApp({ ...o.newApp, description: e.target.value }), "onChange"),
          placeholder: "What does your app do?",
          style: { ...styles.input, minHeight: "60px" }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Redirect URIs (one per line)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: o.newApp.redirect_uris,
          onChange: /* @__PURE__ */ __name((e) => o.setNewApp({ ...o.newApp, redirect_uris: e.target.value }), "onChange"),
          placeholder: "https://example.com/callback",
          style: { ...styles.input, minHeight: "80px" }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Scopes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.scopesGrid, children: o.availableScopes.map((scope) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.scopeCheckbox, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "checkbox",
            checked: o.newApp.scopes.includes(scope),
            onChange: /* @__PURE__ */ __name(() => o.toggleScope(scope), "onChange")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: scope })
      ] }, scope)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formActions, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: o.createApp, style: styles.submitButton, children: "Create Application" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => o.setShowCreateApp(false), "onClick"), style: styles.cancelButton, children: "Cancel" })
    ] })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.appsList, children: o.apps.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "No OAuth apps yet. Create one to get started!" }) : o.apps.map((app) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.appCard, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.appHeader, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.appName, children: app.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.appDescription, children: app.description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => o.deleteApp(app.id), "onClick"), style: styles.deleteButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.appDetails, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.credential, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Client ID:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { style: styles.code, children: app.client_id }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => o.copyToClipboard(app.client_id, "Client ID"), "onClick"), style: styles.copyButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCopy, {}) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.detail, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Scopes:" }),
        " ",
        app.scopes?.join(", ") || "None"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.detail, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Redirect URIs:" }),
        app.redirect_uris?.map((uri, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.uri, children: uri }, idx))
      ] })
    ] })
  ] }, app.id)) })
] }), "AppsTab");
const BotsTab = /* @__PURE__ */ __name(({ o }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.toolbar, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => o.setShowCreateBot(!o.showCreateBot), "onClick"), style: styles.createButton, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, { style: { marginRight: "5px" } }),
    " New Bot"
  ] }) }),
  o.showCreateBot && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.createForm, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.formTitle, children: "Create Bot Account" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Bot Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: o.newBot.name,
          onChange: /* @__PURE__ */ __name((e) => o.setNewBot({ ...o.newBot, name: e.target.value }), "onChange"),
          placeholder: "My Bot",
          style: styles.input
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formGroup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Description" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: o.newBot.description,
          onChange: /* @__PURE__ */ __name((e) => o.setNewBot({ ...o.newBot, description: e.target.value }), "onChange"),
          placeholder: "What does your bot do?",
          style: { ...styles.input, minHeight: "60px" }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formActions, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: o.createBot, style: styles.submitButton, children: "Create Bot" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => o.setShowCreateBot(false), "onClick"), style: styles.cancelButton, children: "Cancel" })
    ] })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.botsList, children: o.bots.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "No bots yet. Create one to automate tasks!" }) : o.bots.map((bot) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.botCard, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.botHeader, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FaRobot, { style: { fontSize: "32px", color: "#5865f2" } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, marginLeft: "12px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.botName, children: bot.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.botDescription, children: bot.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.botStatus, children: [
        "Status: ",
        bot.is_active ? "🟢 Active" : "🔴 Inactive"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => o.deleteBot(bot.id), "onClick"), style: styles.deleteButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}) })
  ] }) }, bot.id)) })
] }), "BotsTab");
const OAuthAppsPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose }) => {
  const o = useOAuthApps(fetchWithAuth, apiBaseUrl);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaRobot, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Developer Portal" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.tabs, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => o.setActiveTab("apps"), "onClick"),
          style: { ...styles.tab, ...o.activeTab === "apps" && styles.tabActive },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaCode, { style: { marginRight: "5px" } }),
            " OAuth Apps (",
            o.apps.length,
            ")"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => o.setActiveTab("bots"), "onClick"),
          style: { ...styles.tab, ...o.activeTab === "bots" && styles.tabActive },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaRobot, { style: { marginRight: "5px" } }),
            " Bots (",
            o.bots.length,
            ")"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: o.loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading..." }) : o.activeTab === "apps" ? /* @__PURE__ */ jsxRuntimeExports.jsx(AppsTab, { o }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BotsTab, { o }) })
  ] }) });
}, "OAuthAppsPanel");
export {
  OAuthAppsPanel as default
};
