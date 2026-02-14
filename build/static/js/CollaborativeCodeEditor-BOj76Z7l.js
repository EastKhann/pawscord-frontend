var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { q as FaCode, u as FaUsers, aV as FaCopy, a5 as FaDownload, aY as FaSave, aN as FaPlay } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const FILE_EXTENSIONS = { javascript: "js", python: "py", typescript: "ts", html: "html", css: "css", java: "java", cpp: "cpp" };
const useCodeEditor = /* @__PURE__ */ __name(({ roomId, userId, username, apiBaseUrl, fetchWithAuth, websocket }) => {
  const [code, setCode] = reactExports.useState("// Start coding...\n");
  const [language, setLanguage] = reactExports.useState("javascript");
  const [output, setOutput] = reactExports.useState("");
  const [collaborators, setCollaborators] = reactExports.useState([]);
  const [saving, setSaving] = reactExports.useState(false);
  const [running, setRunning] = reactExports.useState(false);
  const editorRef = reactExports.useRef(null);
  const monacoRef = reactExports.useRef(null);
  const cursorDecorations = reactExports.useRef(/* @__PURE__ */ new Map());
  const handleRemoteCodeUpdate = /* @__PURE__ */ __name((data) => {
    if (data.user_id === userId) return;
    if (window.monacoEditor) window.monacoEditor.setValue(data.code);
  }, "handleRemoteCodeUpdate");
  const handleRemoteCursorUpdate = /* @__PURE__ */ __name((data) => {
    if (data.user_id === userId) return;
    const editor = window.monacoEditor;
    const monaco = monacoRef.current;
    if (!editor || !monaco) return;
    const old = cursorDecorations.current.get(data.user_id);
    if (old) editor.deltaDecorations(old, []);
    const dec = editor.deltaDecorations([], [{
      range: new monaco.Range(data.position.lineNumber, data.position.column, data.position.lineNumber, data.position.column),
      options: { className: `remote-cursor remote-cursor-${data.user_id}`, hoverMessage: { value: `**${data.username}**` } }
    }]);
    cursorDecorations.current.set(data.user_id, dec);
  }, "handleRemoteCursorUpdate");
  const handleCollaboratorJoined = /* @__PURE__ */ __name((data) => setCollaborators((prev) => [...prev, { id: data.user_id, username: data.username, color: data.color || "#5865f2" }]), "handleCollaboratorJoined");
  const handleCollaboratorLeft = /* @__PURE__ */ __name((data) => {
    setCollaborators((prev) => prev.filter((c) => c.id !== data.user_id));
    const dec = cursorDecorations.current.get(data.user_id);
    if (dec && window.monacoEditor) window.monacoEditor.deltaDecorations(dec, []);
    cursorDecorations.current.delete(data.user_id);
  }, "handleCollaboratorLeft");
  const setupWebSocket = /* @__PURE__ */ __name(() => {
    if (!websocket) return;
    websocket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "code_update") handleRemoteCodeUpdate(data);
      else if (data.type === "cursor_update") handleRemoteCursorUpdate(data);
      else if (data.type === "collaborator_joined") handleCollaboratorJoined(data);
      else if (data.type === "collaborator_left") handleCollaboratorLeft(data);
    });
  }, "setupWebSocket");
  const loadSavedCode = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/code-editor/load/?room_id=${roomId}`);
      if (res.ok) {
        const d = await res.json();
        if (d.code) {
          setCode(d.code);
          setLanguage(d.language || "javascript");
          if (window.monacoEditor) {
            window.monacoEditor.setValue(d.code);
            window.monacoEditor.setLanguage(d.language || "javascript");
          }
        }
      }
    } catch (e) {
      console.error("Failed to load code:", e);
    }
  }, "loadSavedCode");
  reactExports.useEffect(() => {
    setupWebSocket();
    loadSavedCode();
    return () => {
      if (window.monacoEditor) {
        window.monacoEditor.dispose();
        delete window.monacoEditor;
      }
      if (websocket) websocket.close();
    };
  }, []);
  const saveCode = /* @__PURE__ */ __name(async () => {
    setSaving(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/code-editor/save/`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ room_id: roomId, code, language }) });
      if (res.ok) toast.success("✅ Kod kaydedildi!");
    } catch (e) {
      console.error("Save error:", e);
      toast.error("❌ Kaydetme başarısız");
    } finally {
      setSaving(false);
    }
  }, "saveCode");
  const runCode = /* @__PURE__ */ __name(async () => {
    setRunning(true);
    setOutput("Çalıştırılıyor...");
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/code-editor/run/`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code, language }) });
      if (res.ok) {
        const d = await res.json();
        setOutput(d.output || "No output");
      } else {
        const err = await res.json();
        setOutput(`Error: ${err.error || "Execution failed"}`);
      }
    } catch (e) {
      setOutput(`Error: ${e.message}`);
    } finally {
      setRunning(false);
    }
  }, "runCode");
  const copyCode = /* @__PURE__ */ __name(() => {
    navigator.clipboard.writeText(code);
    toast.success("✅ Kod kopyalandı!");
  }, "copyCode");
  const downloadCode = /* @__PURE__ */ __name(() => {
    const ext = FILE_EXTENSIONS[language] || "txt";
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  }, "downloadCode");
  const changeLanguage = /* @__PURE__ */ __name((lang) => {
    setLanguage(lang);
    if (window.monacoEditor && monacoRef.current) monacoRef.current.editor.setModelLanguage(window.monacoEditor.getModel(), lang);
  }, "changeLanguage");
  return { code, language, output, collaborators, saving, running, editorRef, saveCode, runCode, copyCode, downloadCode, changeLanguage };
}, "useCodeEditor");
const styles = {
  container: { display: "flex", flexDirection: "column", height: "100%", backgroundColor: "#1e1e1e" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", backgroundColor: "#2d2d30", borderBottom: "1px solid #3e3e42" },
  headerLeft: { display: "flex", alignItems: "center", gap: "12px" },
  headerIcon: { color: "#5865f2", fontSize: "20px" },
  title: { margin: 0, fontSize: "16px", fontWeight: "600", color: "#cccccc" },
  languageSelect: { backgroundColor: "#3c3c3c", border: "1px solid #3e3e42", borderRadius: "4px", color: "#cccccc", padding: "6px 12px", fontSize: "13px", cursor: "pointer" },
  headerRight: { display: "flex", alignItems: "center", gap: "8px" },
  collaborators: { display: "flex", alignItems: "center", backgroundColor: "#3c3c3c", padding: "6px 12px", borderRadius: "4px", fontSize: "13px", color: "#cccccc" },
  actionButton: { backgroundColor: "#3c3c3c", border: "none", borderRadius: "4px", color: "#cccccc", padding: "8px 12px", fontSize: "14px", cursor: "pointer", transition: "background-color 0.2s" },
  saveButton: { backgroundColor: "#5865f2", color: "#fff" },
  runButton: { backgroundColor: "#3ba55d", color: "#fff" },
  editorContainer: { flex: 1, position: "relative", overflow: "hidden" },
  editor: { width: "100%", height: "100%" },
  outputPanel: { height: "200px", backgroundColor: "#1e1e1e", borderTop: "1px solid #3e3e42", display: "flex", flexDirection: "column" },
  outputHeader: { padding: "8px 16px", backgroundColor: "#2d2d30", borderBottom: "1px solid #3e3e42", fontSize: "13px", fontWeight: "600", color: "#cccccc" },
  outputContent: { flex: 1, margin: 0, padding: "12px 16px", color: "#d4d4d4", fontSize: "13px", fontFamily: 'Consolas, Monaco, "Courier New", monospace', overflowY: "auto", whiteSpace: "pre-wrap", wordBreak: "break-word" }
};
const LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" }
];
const CollaborativeCodeEditor = /* @__PURE__ */ __name(({ roomId, userId, username, apiBaseUrl, fetchWithAuth, websocket, onClose }) => {
  const { language, output, collaborators, saving, running, editorRef, saveCode, runCode, copyCode, downloadCode, changeLanguage } = useCodeEditor({ roomId, userId, username, apiBaseUrl, fetchWithAuth, websocket });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCode, { style: styles.headerIcon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Code Editor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: language, onChange: /* @__PURE__ */ __name((e) => changeLanguage(e.target.value), "onChange"), style: styles.languageSelect, children: LANGUAGES.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: l.value, children: l.label }, l.value)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerRight, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.collaborators, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, { style: { marginRight: "6px" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: collaborators.length + 1 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: copyCode, style: styles.actionButton, title: "Kopyala", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCopy, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: downloadCode, style: styles.actionButton, title: "İndir", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: saveCode, disabled: saving, style: { ...styles.actionButton, ...styles.saveButton }, title: "Kaydet", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaSave, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: runCode, disabled: running, style: { ...styles.actionButton, ...styles.runButton }, title: "Çalıştır", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlay, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.editorContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: editorRef, style: styles.editor }) }),
    output && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.outputPanel, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.outputHeader, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Output" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { style: styles.outputContent, children: output })
    ] })
  ] });
}, "CollaborativeCodeEditor");
export {
  CollaborativeCodeEditor as default
};
