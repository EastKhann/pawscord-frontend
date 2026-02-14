var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { aV as FaCopy, y as FaServer, a as FaTimes, v as FaSpinner, bs as FaFolder, a9 as FaCheck, aF as FaHashtag, a1 as FaShieldAlt, az as FaCog, n as FaSmile, u as FaUsers, G as FaVolumeUp, d as FaExclamationTriangle } from "./icons-vendor-2VDeY8fW.js";
import { g as getApiBase, t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const ServerClonePanel = /* @__PURE__ */ __name(({ serverId, serverName, onClose, onClone }) => {
  const [loading, setLoading] = reactExports.useState(true);
  const [cloning, setCloning] = reactExports.useState(false);
  const [serverData, setServerData] = reactExports.useState(null);
  const [newServerName, setNewServerName] = reactExports.useState("");
  const [options, setOptions] = reactExports.useState({
    channels: true,
    roles: true,
    emojis: true,
    settings: true,
    permissions: true,
    categories: true
  });
  const [progress, setProgress] = reactExports.useState(0);
  const [status, setStatus] = reactExports.useState("");
  const token = localStorage.getItem("access_token");
  reactExports.useEffect(() => {
    loadServerData();
  }, [serverId]);
  const loadServerData = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${getApiBase()}/api/servers/${serverId}/clone-data/`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setServerData(data);
        setNewServerName(`${data.name || serverName} (Copy)`);
      } else {
        setServerData({ id: serverId, name: serverName, channels: [], categories: [], roles: [], emojis: [], settings: {} });
        setNewServerName(`${serverName} (Copy)`);
      }
    } catch (error) {
      console.error("Error loading server data:", error);
      setServerData({ id: serverId, name: serverName, channels: [], categories: [], roles: [], emojis: [], settings: {} });
      setNewServerName(`${serverName} (Copy)`);
    }
    setLoading(false);
  }, "loadServerData");
  const handleOptionToggle = /* @__PURE__ */ __name((option) => {
    setOptions((prev) => ({
      ...prev,
      [option]: !prev[option]
    }));
  }, "handleOptionToggle");
  const handleClone = /* @__PURE__ */ __name(async () => {
    if (!newServerName.trim()) return;
    setCloning(true);
    setProgress(0);
    setStatus("Starting clone process...");
    try {
      const response = await fetch(`${getApiBase()}/api/servers/${serverId}/clone/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: newServerName,
          options
        })
      });
      const steps = [
        { progress: 20, status: "Creating server..." },
        { progress: 40, status: "Setting up channels..." },
        { progress: 60, status: "Configuring roles..." },
        { progress: 80, status: "Applying settings..." },
        { progress: 100, status: "Complete!" }
      ];
      for (const step of steps) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        setProgress(step.progress);
        setStatus(step.status);
      }
      if (response.ok) {
        const data = await response.json();
        toast.success(`Server "${newServerName}" created successfully!`);
        if (onClone) onClone({ name: newServerName, ...options, newServerId: data.server_id });
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to clone server");
      }
    } catch (error) {
      console.error("Error cloning server:", error);
      toast.error("Failed to clone server");
    }
    onClose();
  }, "handleClone");
  const getSelectedCount = /* @__PURE__ */ __name(() => {
    return Object.values(options).filter(Boolean).length;
  }, "getSelectedCount");
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "serverclone-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "serverclone-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loading", children: "Loading server data..." }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "serverclone-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "serverclone-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-info", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCopy, {}),
          " Clone Server"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "source-server", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaServer, {}),
          " ",
          serverData?.name
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    cloning ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "cloning-progress", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaSpinner, { className: "spinning" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Cloning Server..." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "progress-fill",
          style: { width: `${progress}%` }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "progress-status", children: status }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "progress-percent", children: [
        progress,
        "%"
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "content", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "New Server Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: newServerName,
              onChange: /* @__PURE__ */ __name((e) => setNewServerName(e.target.value), "onChange"),
              placeholder: "Enter server name",
              maxLength: 100
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
            "What to Clone (",
            getSelectedCount(),
            "/6)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "options-grid", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `option-card ${options.categories ? "selected" : ""}`,
                onClick: /* @__PURE__ */ __name(() => handleOptionToggle("categories"), "onClick"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "option-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaFolder, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "option-info", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "option-name", children: "Categories" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "option-count", children: [
                      serverData?.categories?.length || 0,
                      " categories"
                    ] })
                  ] }),
                  options.categories && /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { className: "check" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `option-card ${options.channels ? "selected" : ""}`,
                onClick: /* @__PURE__ */ __name(() => handleOptionToggle("channels"), "onClick"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "option-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaHashtag, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "option-info", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "option-name", children: "Channels" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "option-count", children: [
                      serverData?.channels?.length || 0,
                      " channels"
                    ] })
                  ] }),
                  options.channels && /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { className: "check" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `option-card ${options.roles ? "selected" : ""}`,
                onClick: /* @__PURE__ */ __name(() => handleOptionToggle("roles"), "onClick"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "option-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "option-info", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "option-name", children: "Roles" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "option-count", children: [
                      serverData?.roles?.length || 0,
                      " roles"
                    ] })
                  ] }),
                  options.roles && /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { className: "check" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `option-card ${options.permissions ? "selected" : ""}`,
                onClick: /* @__PURE__ */ __name(() => handleOptionToggle("permissions"), "onClick"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "option-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCog, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "option-info", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "option-name", children: "Permissions" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "option-count", children: "Channel overrides" })
                  ] }),
                  options.permissions && /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { className: "check" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `option-card ${options.emojis ? "selected" : ""}`,
                onClick: /* @__PURE__ */ __name(() => handleOptionToggle("emojis"), "onClick"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "option-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaSmile, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "option-info", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "option-name", children: "Emojis" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "option-count", children: [
                      serverData?.emojis?.length || 0,
                      " emojis"
                    ] })
                  ] }),
                  options.emojis && /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { className: "check" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `option-card ${options.settings ? "selected" : ""}`,
                onClick: /* @__PURE__ */ __name(() => handleOptionToggle("settings"), "onClick"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "option-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCog, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "option-info", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "option-name", children: "Settings" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "option-count", children: "Server config" })
                  ] }),
                  options.settings && /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { className: "check" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Preview" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "preview-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "preview-header", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "preview-icon", children: newServerName.charAt(0).toUpperCase() }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "preview-info", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "preview-name", children: newServerName || "New Server" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "preview-meta", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, {}),
                  " 1 member"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "preview-items", children: [
              options.categories && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "preview-item", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FaFolder, {}),
                " ",
                serverData?.categories?.length,
                " Categories"
              ] }),
              options.channels && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "preview-item", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FaHashtag, {}),
                " ",
                serverData?.channels?.filter((c) => c.type === "text").length,
                " Text"
              ] }),
              options.channels && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "preview-item", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FaVolumeUp, {}),
                " ",
                serverData?.channels?.filter((c) => c.type === "voice").length,
                " Voice"
              ] }),
              options.roles && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "preview-item", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, {}),
                " ",
                serverData?.roles?.length,
                " Roles"
              ] }),
              options.emojis && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "preview-item", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FaSmile, {}),
                " ",
                serverData?.emojis?.length,
                " Emojis"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "warning-box", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Note:" }),
            " Members, messages, and message history will not be cloned. Only server structure and settings will be copied."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-footer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "cancel-btn", onClick: onClose, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: "clone-btn",
            onClick: handleClone,
            disabled: !newServerName.trim(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaCopy, {}),
              " Clone Server"
            ]
          }
        )
      ] })
    ] })
  ] }) });
}, "ServerClonePanel");
export {
  ServerClonePanel as default
};
