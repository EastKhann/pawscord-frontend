var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports, a as React } from "./react-core-BiY6fgAJ.js";
import { bS as FaKeyboard, a as FaTimes } from "./icons-vendor-2VDeY8fW.js";
import { q as getShortcutKey } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const CommandPalette = /* @__PURE__ */ __name(({ onClose }) => {
  const [filter, setFilter] = reactExports.useState("all");
  const cmdKey = getShortcutKey();
  const commands = [
    {
      category: "Navigation",
      items: [
        { name: "Quick Switcher", shortcut: `${cmdKey}+K`, description: "Kanal veya kullanıcı ara" },
        { name: "Previous Channel", shortcut: "Alt+↑", description: "Önceki kanala git" },
        { name: "Next Channel", shortcut: "Alt+↓", description: "Sonraki kanala git" }
      ]
    },
    {
      category: "Search",
      items: [
        { name: "Advanced Search", shortcut: `${cmdKey}+F`, description: "Mesajlarda gelişmiş arama" }
      ]
    },
    {
      category: "Messaging",
      items: [
        { name: "Send Message", shortcut: `${cmdKey}+Enter`, description: "Mesajı gönder" },
        { name: "Edit Last Message", shortcut: "↑", description: "Son mesajını düzenle" },
        { name: "Toggle Emoji Picker", shortcut: `${cmdKey}+E`, description: "Emoji seçici aç/kapa" }
      ]
    },
    {
      category: "Voice",
      items: [
        { name: "Mute/Unmute", shortcut: `${cmdKey}+Shift+M`, description: "Mikrofonu aç/kapa" },
        { name: "Deafen/Undeafen", shortcut: `${cmdKey}+Shift+D`, description: "Kulaklığı kapat/aç" }
      ]
    },
    {
      category: "Interface",
      items: [
        { name: "Toggle Sidebar", shortcut: `${cmdKey}+B`, description: "Kenar çubuğunu aç/kapa" },
        { name: "Toggle User Info", shortcut: `${cmdKey}+I`, description: "Kullanıcı bilgisi aç/kapa" },
        { name: "Toggle Theme", shortcut: `${cmdKey}+Shift+T`, description: "Karanlık/Aydınlık mod" },
        { name: "Command List", shortcut: `${cmdKey}+/`, description: "Bu listeyi aç" },
        { name: "Close/Cancel", shortcut: "Esc", description: "Modal veya işlemi kapat" }
      ]
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "command-palette-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "command-palette", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "palette-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "palette-title", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaKeyboard, {}),
        " Klavye Kısayolları"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "palette-close", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "palette-filters", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: filter === "all" ? "active" : "",
          onClick: /* @__PURE__ */ __name(() => setFilter("all"), "onClick"),
          children: "Tümü"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: filter === "keyboard" ? "active" : "",
          onClick: /* @__PURE__ */ __name(() => setFilter("keyboard"), "onClick"),
          children: "Klavye"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: filter === "actions" ? "active" : "",
          onClick: /* @__PURE__ */ __name(() => setFilter("actions"), "onClick"),
          children: "Aksiyonlar"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "commands-list", children: commands.map((category, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "command-category", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: category.category }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "command-items", children: category.items.map((cmd, cmdIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "command-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "command-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "command-name", children: cmd.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "command-description", children: cmd.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "command-shortcut", children: cmd.shortcut.split("+").map((key, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(React.Fragment, { children: [
          i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "plus", children: "+" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { children: key })
        ] }, i)) })
      ] }, cmdIdx)) })
    ] }, idx)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "palette-footer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "footer-hint", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { children: cmdKey }),
      " + ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { children: "/" }),
      " ile her zaman açabilirsiniz"
    ] }) })
  ] }) });
}, "CommandPalette");
export {
  CommandPalette as default
};
