var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { aN as FaPlay, g as FaTrash, B as FaRobot, an as FaPlus, aY as FaSave } from "./icons-vendor-2VDeY8fW.js";
import { t as toast, g as getApiBase } from "./index-DGqPEDt8.js";
import { a as axios } from "./index-BnLT0o6q.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const getStyles = /* @__PURE__ */ __name((isMobile, isSaving) => ({
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.85)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1e4,
    padding: isMobile ? "0" : "20px"
  },
  modal: {
    background: "linear-gradient(135deg, rgba(30,31,34,0.98), rgba(35,36,40,0.98))",
    borderRadius: isMobile ? "0" : "16px",
    width: "100%",
    maxWidth: isMobile ? "100%" : "900px",
    height: isMobile ? "100%" : "auto",
    maxHeight: "90vh",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(88,101,242,0.3)",
    border: isMobile ? "none" : "1px solid rgba(88,101,242,0.4)"
  },
  header: {
    padding: isMobile ? "16px" : "20px 24px",
    background: "linear-gradient(135deg, rgba(88,101,242,0.15), rgba(114,137,218,0.15))",
    borderBottom: "1px solid rgba(88,101,242,0.3)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontSize: isMobile ? "20px" : "24px",
    fontWeight: "700",
    color: "rgba(255,255,255,0.95)",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  content: { flex: 1, overflowY: "auto", padding: isMobile ? "16px" : "24px" },
  section: { marginBottom: "24px" },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "rgba(255,255,255,0.9)",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  inputGroup: { marginBottom: "16px" },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "500",
    color: "rgba(255,255,255,0.8)",
    marginBottom: "8px"
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    background: "rgba(0,0,0,0.3)",
    border: "1px solid rgba(88,101,242,0.3)",
    borderRadius: "8px",
    color: "rgba(255,255,255,0.95)",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
    transition: "all 0.2s ease"
  },
  textarea: {
    width: "100%",
    minHeight: "80px",
    padding: "12px 14px",
    background: "rgba(0,0,0,0.3)",
    border: "1px solid rgba(88,101,242,0.3)",
    borderRadius: "8px",
    color: "rgba(255,255,255,0.95)",
    fontSize: "14px",
    outline: "none",
    resize: "vertical",
    fontFamily: "inherit",
    boxSizing: "border-box"
  },
  commandCard: {
    background: "rgba(0,0,0,0.3)",
    border: "1px solid rgba(88,101,242,0.3)",
    borderRadius: "12px",
    padding: isMobile ? "12px" : "16px",
    marginBottom: "12px"
  },
  commandHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px"
  },
  commandActions: { display: "flex", gap: "8px" },
  iconBtn: {
    background: "rgba(88,101,242,0.2)",
    border: "1px solid rgba(88,101,242,0.4)",
    borderRadius: "6px",
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "rgba(255,255,255,0.9)",
    transition: "all 0.2s ease",
    fontSize: "14px"
  },
  deleteBtn: {
    background: "rgba(218,55,60,0.2)",
    border: "1px solid rgba(218,55,60,0.4)",
    color: "#da373c"
  },
  addBtn: {
    width: "100%",
    padding: "12px",
    background: "rgba(88,101,242,0.2)",
    border: "1px solid rgba(88,101,242,0.4)",
    borderRadius: "8px",
    color: "rgba(255,255,255,0.9)",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.2s ease",
    minHeight: "44px"
  },
  toggle: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" },
  switch: /* @__PURE__ */ __name((enabled) => ({
    width: "50px",
    height: "28px",
    background: enabled ? "linear-gradient(135deg, #43b581, #4caf50)" : "rgba(255,255,255,0.2)",
    borderRadius: "14px",
    position: "relative",
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: "2px solid rgba(88,101,242,0.3)"
  }), "switch"),
  switchKnob: /* @__PURE__ */ __name((enabled) => ({
    width: "22px",
    height: "22px",
    background: "white",
    borderRadius: "50%",
    position: "absolute",
    top: "1px",
    left: enabled ? "24px" : "1px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
  }), "switchKnob"),
  footer: {
    padding: isMobile ? "16px" : "20px 24px",
    borderTop: "1px solid rgba(88,101,242,0.2)",
    display: "flex",
    gap: "12px",
    background: "rgba(0,0,0,0.2)"
  },
  cancelBtn: {
    flex: 1,
    padding: "14px",
    background: "rgba(78,80,88,0.5)",
    border: "1px solid rgba(88,101,242,0.3)",
    borderRadius: "8px",
    color: "rgba(255,255,255,0.9)",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    minHeight: "44px"
  },
  saveBtn: {
    flex: 1,
    padding: "14px",
    background: "linear-gradient(135deg, #5865f2, #7289da)",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    cursor: isSaving ? "not-allowed" : "pointer",
    opacity: isSaving ? 0.6 : 1,
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    minHeight: "44px"
  }
}), "getStyles");
const useBotBuilder = /* @__PURE__ */ __name((serverSlug, token, onClose) => {
  const [botName, setBotName] = reactExports.useState("");
  const [botAvatar, setBotAvatar] = reactExports.useState("🤖");
  const [commands, setCommands] = reactExports.useState([
    { id: 1, trigger: "!hello", response: "Hello! How can I help you?", enabled: true }
  ]);
  const [events, setEvents] = reactExports.useState({
    onMemberJoin: { enabled: false, message: "Welcome {{username}} to {{server}}!" },
    onMemberLeave: { enabled: false, message: "Goodbye {{username}}. We will miss you!" },
    onMessageDelete: { enabled: false, action: "log" }
  });
  const [autoModeration, setAutoModeration] = reactExports.useState({
    spamDetection: false,
    profanityFilter: false,
    capsLimit: 70,
    linkBlocking: false
  });
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const addCommand = /* @__PURE__ */ __name(() => {
    setCommands([...commands, { id: Date.now(), trigger: "", response: "", enabled: true }]);
  }, "addCommand");
  const updateCommand = /* @__PURE__ */ __name((id, field, value) => {
    setCommands(commands.map((cmd) => cmd.id === id ? { ...cmd, [field]: value } : cmd));
  }, "updateCommand");
  const removeCommand = /* @__PURE__ */ __name((id) => {
    if (commands.length > 1) setCommands(commands.filter((cmd) => cmd.id !== id));
  }, "removeCommand");
  const testCommand = /* @__PURE__ */ __name((cmd) => {
    toast.info(`📋 Test Output:

${cmd.response}`);
  }, "testCommand");
  const handleSave = /* @__PURE__ */ __name(async () => {
    if (!botName.trim()) {
      toast.error("❌ Please enter a bot name");
      return;
    }
    const validCommands = commands.filter((cmd) => cmd.trigger && cmd.response);
    if (validCommands.length === 0) {
      toast.error("❌ Please add at least one valid command");
      return;
    }
    setIsSaving(true);
    try {
      await axios.post(`${getApiBase()}/bots/create/`, {
        server_slug: serverSlug,
        name: botName,
        avatar: botAvatar,
        commands: validCommands,
        events,
        auto_moderation: autoModeration
      }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("✅ Bot created successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to create bot:", error);
      toast.error("❌ Failed to create bot. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }, "handleSave");
  return {
    botName,
    setBotName,
    botAvatar,
    setBotAvatar,
    commands,
    addCommand,
    updateCommand,
    removeCommand,
    testCommand,
    autoModeration,
    setAutoModeration,
    isSaving,
    handleSave
  };
}, "useBotBuilder");
const CommandCard = /* @__PURE__ */ __name(({ cmd, styles, onUpdate, onRemove, onTest, canRemove }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.commandCard, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.commandHeader, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.toggle, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.switch(cmd.enabled), onClick: /* @__PURE__ */ __name(() => onUpdate(cmd.id, "enabled", !cmd.enabled), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.switchKnob(cmd.enabled) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "rgba(255,255,255,0.8)", fontSize: "14px" }, children: cmd.enabled ? "Enabled" : "Disabled" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.commandActions, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => onTest(cmd), "onClick"), style: styles.iconBtn, title: "Test Command", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlay, {}) }),
      canRemove && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => onRemove(cmd.id), "onClick"), style: { ...styles.iconBtn, ...styles.deleteBtn }, title: "Delete Command", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}) })
    ] })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inputGroup, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Trigger (e.g., !hello)" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: cmd.trigger, onChange: /* @__PURE__ */ __name((e) => onUpdate(cmd.id, "trigger", e.target.value), "onChange"), placeholder: "!command", style: styles.input })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inputGroup, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Response" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: cmd.response, onChange: /* @__PURE__ */ __name((e) => onUpdate(cmd.id, "response", e.target.value), "onChange"), placeholder: "Bot response here...", style: styles.textarea })
  ] })
] }), "CommandCard");
const BotBuilder = /* @__PURE__ */ __name(({ onClose, serverSlug, token, isMobile }) => {
  const {
    botName,
    setBotName,
    botAvatar,
    setBotAvatar,
    commands,
    addCommand,
    updateCommand,
    removeCommand,
    testCommand,
    autoModeration,
    setAutoModeration,
    isSaving,
    handleSave
  } = useBotBuilder(serverSlug, token, onClose);
  const styles = getStyles(isMobile, isSaving);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.header, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: styles.title, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaRobot, {}),
      " Custom Bot Builder"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles.sectionTitle, children: [
          "🤖",
          " Basic Information"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inputGroup, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Bot Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: botName, onChange: /* @__PURE__ */ __name((e) => setBotName(e.target.value), "onChange"), placeholder: "My Awesome Bot", style: styles.input, maxLength: 32 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inputGroup, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Bot Avatar (Emoji)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: botAvatar, onChange: /* @__PURE__ */ __name((e) => setBotAvatar(e.target.value), "onChange"), placeholder: "🤖", style: styles.input, maxLength: 2 })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles.sectionTitle, children: [
          "⚡",
          " Commands"
        ] }),
        commands.map((cmd) => /* @__PURE__ */ jsxRuntimeExports.jsx(CommandCard, { cmd, styles, onUpdate: updateCommand, onRemove: removeCommand, onTest: testCommand, canRemove: commands.length > 1 }, cmd.id)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: addCommand, style: styles.addBtn, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
          " Add Command"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles.sectionTitle, children: [
          "🛡️",
          " Auto Moderation"
        ] }),
        Object.entries(autoModeration).map(([key, value]) => {
          if (typeof value !== "boolean") return null;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.toggle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.switch(value), onClick: /* @__PURE__ */ __name(() => setAutoModeration({ ...autoModeration, [key]: !value }), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.switchKnob(value) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "rgba(255,255,255,0.8)", fontSize: "14px" }, children: key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()) })
          ] }, key);
        })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.footer, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.cancelBtn, children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSave, disabled: isSaving, style: styles.saveBtn, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaSave, {}),
        " ",
        isSaving ? "Creating..." : "Create Bot"
      ] })
    ] })
  ] }) });
}, "BotBuilder");
export {
  BotBuilder as default
};
