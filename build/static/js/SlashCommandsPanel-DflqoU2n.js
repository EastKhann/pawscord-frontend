var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { b6 as FaTerminal, aN as FaPlay, q as FaCode, aB as FaHistory } from "./icons-vendor-2VDeY8fW.js";
function SlashCommandsPanel({ apiBaseUrl, fetchWithAuth }) {
  const [commands, setCommands] = reactExports.useState([]);
  const [commandInput, setCommandInput] = reactExports.useState("");
  const [commandArgs, setCommandArgs] = reactExports.useState({});
  const [selectedCommand, setSelectedCommand] = reactExports.useState(null);
  const [result, setResult] = reactExports.useState(null);
  const [history, setHistory] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    loadCommands();
    loadHistory();
  }, []);
  const loadCommands = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/commands/list/`);
      if (response.ok) {
        const data = await response.json();
        setCommands(data.commands || []);
      }
    } catch (err) {
      console.error("Error loading commands:", err);
    } finally {
      setLoading(false);
    }
  }, "loadCommands");
  const loadHistory = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/commands/history/`);
      if (response.ok) {
        const data = await response.json();
        setHistory(data.history || []);
      }
    } catch (err) {
      console.error("Error loading history:", err);
    }
  }, "loadHistory");
  const executeCommand = /* @__PURE__ */ __name(async (command) => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/commands/${command.name}/execute/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ args: commandArgs })
      });
      if (response.ok) {
        const data = await response.json();
        setResult({ success: true, output: data.output || "Command executed successfully!" });
        loadHistory();
      } else {
        const data = await response.json();
        setResult({ success: false, output: data.error || "Command failed" });
      }
    } catch (err) {
      setResult({ success: false, output: "Network error: " + err.message });
    } finally {
      setLoading(false);
    }
  }, "executeCommand");
  const handleCommandSelect = /* @__PURE__ */ __name((command) => {
    setSelectedCommand(command);
    setCommandInput(`/${command.name}`);
    setCommandArgs({});
    setResult(null);
  }, "handleCommandSelect");
  const getCategoryColor = /* @__PURE__ */ __name((category) => {
    const colors = {
      utility: "#5865f2",
      moderation: "#f04747",
      fun: "#43b581",
      info: "#faa61a",
      admin: "#7289da"
    };
    return colors[category] || "#72767d";
  }, "getCategoryColor");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "slash-commands-panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "commands-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaTerminal, {}),
      " Slash Commands"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "command-executor", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "executor-input", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaTerminal, { className: "terminal-icon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Type / to see available commands...",
            value: commandInput,
            onChange: /* @__PURE__ */ __name((e) => setCommandInput(e.target.value), "onChange"),
            className: "command-input"
          }
        ),
        selectedCommand && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: "execute-btn",
            onClick: /* @__PURE__ */ __name(() => executeCommand(selectedCommand), "onClick"),
            disabled: loading,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlay, {}),
              " Execute"
            ]
          }
        )
      ] }),
      result && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `command-result ${result.success ? "success" : "error"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "result-header", children: result.success ? "✅ Success" : "❌ Error" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "result-output", children: result.output })
      ] })
    ] }),
    selectedCommand && selectedCommand.parameters && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "command-params", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Parameters:" }),
      selectedCommand.parameters.map((param, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "param-input", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          param.name,
          " ",
          param.required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "required", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: param.type === "number" ? "number" : "text",
            placeholder: param.description,
            value: commandArgs[param.name] || "",
            onChange: /* @__PURE__ */ __name((e) => setCommandArgs({ ...commandArgs, [param.name]: e.target.value }), "onChange"),
            className: "param-field"
          }
        )
      ] }, idx))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "commands-list", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCode, {}),
        " Available Commands (",
        commands.length,
        ")"
      ] }),
      loading && commands.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loading", children: "Loading commands..." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "commands-grid", children: commands.map((command, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `command-card ${selectedCommand?.name === command.name ? "selected" : ""}`,
          onClick: /* @__PURE__ */ __name(() => handleCommandSelect(command), "onClick"),
          style: { borderLeftColor: getCategoryColor(command.category) },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "command-header", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "command-name", children: [
                "/",
                command.name
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "command-category",
                  style: { background: getCategoryColor(command.category) },
                  children: command.category
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "command-description", children: command.description }),
            command.usage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "command-usage", children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: command.usage }) })
          ]
        },
        idx
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "command-history", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaHistory, {}),
        " Command History"
      ] }),
      history.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-history", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaTerminal, { className: "empty-icon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No commands executed yet" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "history-list", children: history.slice(0, 10).map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `history-item ${item.success ? "success" : "error"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "history-command", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaTerminal, {}),
          " /",
          item.command
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "history-time", children: new Date(item.executed_at).toLocaleString() })
      ] }, idx)) })
    ] })
  ] });
}
__name(SlashCommandsPanel, "SlashCommandsPanel");
export {
  SlashCommandsPanel as default
};
