var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { q as FaCode, cq as FaCompress, b2 as FaExpand, a as FaTimes, aB as FaHistory, aY as FaSave, g as FaTrash, b6 as FaTerminal, z as FaClock, aV as FaCopy, aN as FaPlay, D as FaStop, bs as FaFolder, w as FaCheckCircle, d as FaExclamationTriangle, cJ as FaPython } from "./icons-vendor-2VDeY8fW.js";
import { y } from "./ui-vendor-iPoN0WGz.js";
const CodeRunnerPanel = /* @__PURE__ */ __name(({ serverId, channelId, onClose }) => {
  const [code, setCode] = reactExports.useState("");
  const [language, setLanguage] = reactExports.useState("python");
  const [output, setOutput] = reactExports.useState("");
  const [isRunning, setIsRunning] = reactExports.useState(false);
  const [execTime, setExecTime] = reactExports.useState(null);
  const [history, setHistory] = reactExports.useState([]);
  const [showHistory, setShowHistory] = reactExports.useState(false);
  const [savedSnippets, setSavedSnippets] = reactExports.useState([]);
  const [showSaveModal, setShowSaveModal] = reactExports.useState(false);
  const [isFullscreen, setIsFullscreen] = reactExports.useState(false);
  const token = localStorage.getItem("access_token");
  const languages = [
    { id: "python", name: "Python", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaPython, {}), template: '# Python Code\nprint("Hello, World!")' },
    { id: "cpp", name: "C++", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCode, {}), template: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}' },
    { id: "c", name: "C", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCode, {}), template: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}' },
    { id: "ruby", name: "Ruby", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCode, {}), template: '# Ruby Code\nputs "Hello, World!"' },
    { id: "go", name: "Go", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCode, {}), template: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}' },
    { id: "rust", name: "Rust", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCode, {}), template: 'fn main() {\n    println!("Hello, World!");\n}' }
  ];
  reactExports.useEffect(() => {
    fetchHistory();
    fetchSavedSnippets();
  }, []);
  reactExports.useEffect(() => {
    const lang = languages.find((l) => l.id === language);
    if (lang && !code) {
      setCode(lang.template);
    }
  }, [language]);
  const fetchHistory = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch("/api/code-runner/history/", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setHistory(data.history || []);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  }, "fetchHistory");
  const fetchSavedSnippets = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch("/api/code-runner/snippets/", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setSavedSnippets(data.snippets || []);
      }
    } catch (error) {
      console.error("Error fetching snippets:", error);
    }
  }, "fetchSavedSnippets");
  const handleRunCode = /* @__PURE__ */ __name(async () => {
    if (!code.trim()) {
      y.warning("Kod boş olamaz");
      return;
    }
    setIsRunning(true);
    setOutput("Çalıştırılıyor...");
    const startTime = Date.now();
    try {
      const response = await fetch("/api/code-runner/execute/", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          code,
          language,
          channel_id: channelId
        })
      });
      const data = await response.json();
      const endTime = Date.now();
      setExecTime(endTime - startTime);
      if (response.ok) {
        setOutput(data.output || "Çıktı yok");
        if (data.error) {
          setOutput(`Hata:
${data.error}`);
        }
      } else {
        setOutput(`Hata: ${data.message || "Kod çalıştırılamadı"}`);
      }
      fetchHistory();
    } catch (error) {
      setOutput("Bağlantı hatası");
    }
    setIsRunning(false);
  }, "handleRunCode");
  const handleStopExecution = /* @__PURE__ */ __name(async () => {
    try {
      await fetch("/api/code-runner/stop/", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      setIsRunning(false);
      setOutput("Çalıştırma durduruldu");
    } catch (error) {
      y.error("Durdurma başarısız");
    }
  }, "handleStopExecution");
  const handleSaveSnippet = /* @__PURE__ */ __name(async (name) => {
    try {
      const response = await fetch("/api/code-runner/snippets/", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, code, language })
      });
      if (response.ok) {
        y.success("Snippet kaydedildi");
        fetchSavedSnippets();
        setShowSaveModal(false);
      }
    } catch (error) {
      y.error("Kaydetme başarısız");
    }
  }, "handleSaveSnippet");
  const handleLoadSnippet = /* @__PURE__ */ __name((snippet) => {
    setCode(snippet.code);
    setLanguage(snippet.language);
    setShowHistory(false);
  }, "handleLoadSnippet");
  const handleDeleteSnippet = /* @__PURE__ */ __name(async (snippetId) => {
    try {
      await fetch(`/api/code-runner/snippets/${snippetId}/`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      y.success("Snippet silindi");
      fetchSavedSnippets();
    } catch (error) {
      y.error("Silme başarısız");
    }
  }, "handleDeleteSnippet");
  const handleCopyOutput = /* @__PURE__ */ __name(() => {
    navigator.clipboard.writeText(output);
    y.success("Çıktı kopyalandı");
  }, "handleCopyOutput");
  const handleClearAll = /* @__PURE__ */ __name(() => {
    setCode("");
    setOutput("");
    setExecTime(null);
  }, "handleClearAll");
  const handleShareToChannel = /* @__PURE__ */ __name(async () => {
    if (!channelId) {
      y.warning("Paylaşım için kanal gerekli");
      return;
    }
    try {
      const response = await fetch(`/api/channels/${channelId}/messages/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content: `\`\`\`${language}
${code}
\`\`\`
**Çıktı:**
\`\`\`
${output}
\`\`\``
        })
      });
      if (response.ok) {
        y.success("Kanala paylaşıldı");
      }
    } catch (error) {
      y.error("Paylaşım başarısız");
    }
  }, "handleShareToChannel");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `code-runner-overlay ${isFullscreen ? "fullscreen" : ""}`, onClick: /* @__PURE__ */ __name((e) => e.target.className.includes("code-runner-overlay") && onClose(), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "code-runner-panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCode, {}),
        " Kod Çalıştırıcı"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "fullscreen-btn", onClick: /* @__PURE__ */ __name(() => setIsFullscreen(!isFullscreen), "onClick"), children: isFullscreen ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaCompress, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaExpand, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "toolbar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "language-selector", children: languages.map((lang) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: `lang-btn ${language === lang.id ? "active" : ""}`,
          onClick: /* @__PURE__ */ __name(() => setLanguage(lang.id), "onClick"),
          title: lang.name,
          children: [
            lang.icon,
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: lang.name })
          ]
        },
        lang.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "toolbar-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "action-btn", onClick: /* @__PURE__ */ __name(() => setShowHistory(!showHistory), "onClick"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaHistory, {}),
          " Geçmiş"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "action-btn", onClick: /* @__PURE__ */ __name(() => setShowSaveModal(true), "onClick"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaSave, {}),
          " Kaydet"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "action-btn clear", onClick: handleClearAll, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}),
          " Temizle"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "editor-container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "code-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaCode, {}),
            " Kod"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "line-count", children: [
            code.split("\n").length,
            " satır"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            className: "code-editor",
            value: code,
            onChange: /* @__PURE__ */ __name((e) => setCode(e.target.value), "onChange"),
            placeholder: "Kodunuzu buraya yazın...",
            spellCheck: "false"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "output-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaTerminal, {}),
            " Çıktı"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "output-actions", children: [
            execTime && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "exec-time", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, {}),
              " ",
              execTime,
              "ms"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleCopyOutput, title: "Kopyala", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCopy, {}) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: `output-display ${output.includes("Hata") ? "error" : ""}`, children: output || "Çıktı burada görünecek..." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "run-bar", children: [
      !isRunning ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "run-btn", onClick: handleRunCode, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlay, {}),
        " Çalıştır"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "stop-btn", onClick: handleStopExecution, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaStop, {}),
        " Durdur"
      ] }),
      channelId && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "share-btn", onClick: handleShareToChannel, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCode, {}),
        " Kanala Paylaş"
      ] })
    ] }),
    showHistory && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "history-sidebar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sidebar-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaHistory, {}),
          " Geçmiş & Snippets"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setShowHistory(false), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sidebar-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaFolder, {}),
          " Kaydedilen Snippets"
        ] }),
        savedSnippets.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "empty-msg", children: "Henüz snippet yok" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "snippets-list", children: savedSnippets.map((snippet) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "snippet-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "snippet-info", onClick: /* @__PURE__ */ __name(() => handleLoadSnippet(snippet), "onClick"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "snippet-name", children: snippet.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "snippet-lang", children: snippet.language })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "delete-snippet", onClick: /* @__PURE__ */ __name(() => handleDeleteSnippet(snippet.id), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}) })
        ] }, snippet.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sidebar-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, {}),
          " Son Çalıştırmalar"
        ] }),
        history.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "empty-msg", children: "Geçmiş yok" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "history-list", children: history.slice(0, 10).map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "history-item", onClick: /* @__PURE__ */ __name(() => handleLoadSnippet(item), "onClick"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "history-info", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "history-lang", children: item.language }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `history-status ${item.success ? "success" : "error"}`, children: item.success ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheckCircle, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, {}) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("code", { className: "history-preview", children: [
            item.code?.substring(0, 50),
            "..."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "history-time", children: [
            item.exec_time,
            "ms"
          ] })
        ] }, index)) })
      ] })
    ] }),
    showSaveModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      SaveSnippetModal,
      {
        onClose: /* @__PURE__ */ __name(() => setShowSaveModal(false), "onClose"),
        onSave: handleSaveSnippet,
        language
      }
    )
  ] }) });
}, "CodeRunnerPanel");
const SaveSnippetModal = /* @__PURE__ */ __name(({ onClose, onSave, language }) => {
  const [name, setName] = reactExports.useState("");
  const handleSubmit = /* @__PURE__ */ __name(() => {
    if (!name.trim()) {
      y.warning("Snippet adı gerekli");
      return;
    }
    onSave(name);
  }, "handleSubmit");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-overlay", onClick: /* @__PURE__ */ __name((e) => e.target.className === "modal-overlay" && onClose(), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "save-modal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaSave, {}),
      " Snippet Kaydet"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Snippet Adı" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: name,
          onChange: /* @__PURE__ */ __name((e) => setName(e.target.value), "onChange"),
          placeholder: "örn: Fibonacci Hesaplama"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Dil" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: language, disabled: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-actions", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "cancel-btn", onClick: onClose, children: "İptal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "save-submit-btn", onClick: handleSubmit, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaSave, {}),
        " Kaydet"
      ] })
    ] })
  ] }) });
}, "SaveSnippetModal");
export {
  CodeRunnerPanel as default
};
