var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { u as useEditor, i as index_default, a as index_default$1, E as EditorContent } from "./editor-vendor-De2l9AY3.js";
import { b6 as FaTerminal, b7 as FaTable, aD as FaUndo, b8 as FaRegSmile, b9 as FaUserShield, q as FaCode, s as FaBroom, aJ as FaStickyNote } from "./icons-vendor-2VDeY8fW.js";
import "./chart-vendor-4kC5cP2G.js";
import "./ui-vendor-iPoN0WGz.js";
const COMMANDS = [
  { name: "zar-at", description: "1-100 arası zar at", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTable, {}) },
  { name: "yazitura", description: "Yazı tura at", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUndo, {}) },
  { name: "tkm", description: "Taş Kağıt Makas oyna (@kullanici)", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaRegSmile, {}) },
  { name: "xox", description: "XOX oyunu başlat", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTable, {}) },
  { name: "sec", description: "Seçeneklerden birini seç (/sec a b c)", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTerminal, {}) },
  { name: "cuzdan", description: "Coin bakiyeni gör", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserShield, {}) },
  { name: "transfer", description: "Coin gönder (/transfer @kullanici miktar)", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserShield, {}) },
  { name: "kanban", description: "Kanban panosunu aç", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTable, {}) },
  { name: "kod", description: "Python kodu çalıştır", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCode, {}) },
  { name: "resimgelismis", description: "AI ile resim çiz", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaRegSmile, {}) },
  { name: "temizle", description: "Mesajları sil (Admin)", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaBroom, {}), adminOnly: true },
  { name: "yardim", description: "Komut listesini gör", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTerminal, {}) },
  { name: "tema", description: "Tema Mağazasını Aç", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTable, {}) },
  { name: "duyuru", description: "Sabit Duyuru Yap (/duyuru mesaj)", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaBroom, {}), adminOnly: true },
  { name: "sablon", description: "Hazır Şablonlar", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaStickyNote, {}) },
  { name: "shrug", description: "¯\\_(ツ)_/¯ gönder", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaRegSmile, {}) }
];
const SlashCommandList = /* @__PURE__ */ __name(({ query, onSelect, activeIndex }) => {
  const [filteredCommands, setFilteredCommands] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (query === null || query === void 0) return;
    const q = query.toLowerCase().replace("/", "");
    const filtered = COMMANDS.filter(
      (cmd) => cmd.name.toLowerCase().startsWith(q)
    );
    setFilteredCommands(filtered);
  }, [query]);
  if (filteredCommands.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaTerminal, { style: { marginRight: 6 } }),
      "KOMUTLAR"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.list, children: filteredCommands.map((cmd, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        onClick: /* @__PURE__ */ __name(() => onSelect(cmd), "onClick"),
        style: {
          ...styles.item,
          backgroundColor: index === activeIndex ? "#5865f2" : "transparent"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.iconWrapper, children: cmd.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.textWrapper, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontWeight: "bold", color: "white" }, children: [
              "/",
              cmd.name
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "0.85em", color: index === activeIndex ? "#eee" : "#b9bbbe", marginLeft: 8 }, children: cmd.description })
          ] })
        ]
      },
      cmd.name
    )) })
  ] });
}, "SlashCommandList");
const styles = {
  container: {
    position: "absolute",
    bottom: "100%",
    // Inputun üstünde
    left: 0,
    width: "300px",
    maxHeight: "300px",
    backgroundColor: "#2f3136",
    borderRadius: "8px",
    boxShadow: "0 -4px 15px rgba(0,0,0,0.4)",
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",
    overflow: "hidden",
    zIndex: 1e3,
    border: "1px solid rgba(255,255,255,0.05)"
  },
  header: {
    padding: "8px 12px",
    fontSize: "0.75em",
    fontWeight: "bold",
    color: "#b9bbbe",
    backgroundColor: "#202225",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    display: "flex",
    alignItems: "center",
    letterSpacing: "0.5px"
  },
  list: {
    overflowY: "auto",
    padding: "0"
  },
  item: {
    display: "flex",
    alignItems: "center",
    padding: "10px 12px",
    cursor: "pointer",
    transition: "background-color 0.1s"
  },
  iconWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "24px",
    height: "24px",
    marginRight: "10px",
    color: "white",
    fontSize: "1.1em"
  },
  textWrapper: {
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
};
const RichTextEditor = reactExports.forwardRef(({ onSend, onChange, placeholder, initialValue = "", onFileUpload }, ref) => {
  const isSendingRef = reactExports.useRef(false);
  const [slashQuery, setSlashQuery] = reactExports.useState(null);
  const [slashIndex, setSlashIndex] = reactExports.useState(0);
  const editor = useEditor({
    extensions: [
      index_default,
      index_default$1.configure({
        placeholder: placeholder || "Bir mesaj yaz..."
      })
    ],
    content: initialValue,
    editorProps: {
      handlePaste: /* @__PURE__ */ __name((view, event, slice) => {
        const items = event.clipboardData?.items;
        if (items && onFileUpload) {
          for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.kind === "file") {
              event.preventDefault();
              const file = item.getAsFile();
              if (file) {
                onFileUpload(file);
              }
              return true;
            }
          }
        }
        return false;
      }, "handlePaste"),
      handleKeyDown: /* @__PURE__ */ __name((view, event) => {
        if (slashQuery !== null) {
          if (event.key === "ArrowUp") {
            event.preventDefault();
            setSlashIndex((prev) => Math.max(0, prev - 1));
            return true;
          }
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setSlashIndex((prev) => prev + 1);
            return true;
          }
          if (event.key === "Enter") {
            event.preventDefault();
            const q = slashQuery.toLowerCase().replace("/", "");
            const filtered = COMMANDS.filter((cmd) => cmd.name.toLowerCase().startsWith(q));
            if (filtered.length > 0) {
              const actualIndex = Math.max(0, Math.min(slashIndex, filtered.length - 1));
              const cmd = filtered[actualIndex];
              editor.commands.setContent(`/${cmd.name} `);
              editor.commands.focus("end");
              setSlashQuery(null);
            }
            return true;
          }
          if (event.key === "Escape") {
            event.preventDefault();
            setSlashQuery(null);
            return true;
          }
        }
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          if (slashQuery !== null) {
            return true;
          }
          const text = view.state.doc.textContent;
          if (text.trim().length > 0) {
            isSendingRef.current = true;
            onSend(text);
            editor.commands.clearContent();
            onChange?.("");
            setTimeout(() => {
              isSendingRef.current = false;
            }, 100);
          }
          return true;
        }
        return false;
      }, "handleKeyDown")
    }
  });
  reactExports.useEffect(() => {
    if (!editor) return;
    const handler = /* @__PURE__ */ __name(() => {
      if (isSendingRef.current) return;
      const text = editor.getText().trim();
      if (text.startsWith("/")) {
        if (!text.includes(" ")) {
          setSlashQuery(text);
          setSlashIndex(0);
        } else {
          setSlashQuery(null);
        }
      } else {
        if (slashQuery !== null) setSlashQuery(null);
      }
      onChange?.(text);
    }, "handler");
    editor.on("update", handler);
    return () => editor.off("update", handler);
  }, [editor, onChange]);
  reactExports.useEffect(() => {
    if (!editor) return;
    const currentContent = editor.getText();
    if (initialValue === "" && currentContent !== "") {
      editor.commands.clearContent();
    } else if (initialValue !== "" && currentContent === "") {
      editor.commands.setContent(initialValue);
    }
  }, [editor, initialValue]);
  const focusEditor = reactExports.useCallback(() => {
    if (editor) editor.chain().focus().run();
  }, [editor]);
  reactExports.useImperativeHandle(ref, () => ({
    send: /* @__PURE__ */ __name(() => {
      if (!editor) return;
      const text = editor.getText().trim();
      if (!text) return;
      isSendingRef.current = true;
      onSend(text);
      editor.commands.clearContent();
      onChange?.("");
      setTimeout(() => {
        isSendingRef.current = false;
      }, 100);
    }, "send"),
    clear: /* @__PURE__ */ __name(() => editor?.commands.clearContent(), "clear"),
    hasContent: /* @__PURE__ */ __name(() => !!editor?.getText().trim(), "hasContent"),
    appendText: /* @__PURE__ */ __name((val) => {
      if (!editor || !val) return;
      editor.chain().focus().insertContent(val).run();
    }, "appendText")
  }), [editor, onSend, onChange]);
  if (!editor) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rich-editor-wrapper", onClick: focusEditor, role: "textbox", "aria-label": "Mesaj editörü", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(EditorContent, { editor, className: "tiptap-editor" }),
    slashQuery !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
      SlashCommandList,
      {
        query: slashQuery,
        activeIndex: slashIndex,
        onSelect: /* @__PURE__ */ __name((cmd) => {
          if (!editor) return;
          editor.commands.setContent(`/${cmd.name} `);
          editor.commands.focus("end");
          setSlashQuery(null);
        }, "onSelect")
      }
    )
  ] });
});
RichTextEditor.displayName = "RichTextEditor";
export {
  RichTextEditor as default
};
