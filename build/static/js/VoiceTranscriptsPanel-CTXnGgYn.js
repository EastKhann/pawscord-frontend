var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { E as FaMicrophone, a as FaTimes, t as FaSearch, a5 as FaDownload, av as FaFileAlt } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const VoiceTranscriptsPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, roomSlug }) => {
  const [transcripts, setTranscripts] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [filteredTranscripts, setFilteredTranscripts] = reactExports.useState([]);
  reactExports.useEffect(() => {
    fetchTranscripts();
  }, []);
  reactExports.useEffect(() => {
    if (searchQuery) {
      const filtered = transcripts.filter(
        (t) => t.text.toLowerCase().includes(searchQuery.toLowerCase()) || t.speaker_username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTranscripts(filtered);
    } else {
      setFilteredTranscripts(transcripts);
    }
  }, [searchQuery, transcripts]);
  const fetchTranscripts = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/voice/transcripts/?room_slug=${roomSlug}`);
      const data = await response.json();
      setTranscripts(data.transcripts || []);
      setFilteredTranscripts(data.transcripts || []);
    } catch (error) {
      toast.error("Failed to load transcripts");
    } finally {
      setLoading(false);
    }
  }, "fetchTranscripts");
  const downloadTranscript = /* @__PURE__ */ __name((transcript) => {
    const text = `Voice Transcript
Speaker: ${transcript.speaker_username}
Date: ${new Date(transcript.created_at).toLocaleString()}
Confidence: ${(transcript.confidence * 100).toFixed(1)}%

${transcript.text}
`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transcript_${transcript.id}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }, "downloadTranscript");
  const exportAll = /* @__PURE__ */ __name(() => {
    const csv = [
      ["Speaker", "Date", "Text", "Confidence"],
      ...filteredTranscripts.map((t) => [
        t.speaker_username,
        new Date(t.created_at).toLocaleString(),
        `"${t.text.replace(/"/g, '""')}"`,
        `${(t.confidence * 100).toFixed(1)}%`
      ])
    ].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `voice_transcripts_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    toast.success("Transcripts exported");
  }, "exportAll");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaMicrophone, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Voice Transcripts" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.toolbar, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.searchBox, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaSearch, { style: { color: "#99aab5", marginRight: "8px" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: searchQuery,
            onChange: /* @__PURE__ */ __name((e) => setSearchQuery(e.target.value), "onChange"),
            placeholder: "Search transcripts...",
            style: styles.searchInput
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: exportAll, style: styles.exportButton, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, { style: { marginRight: "6px" } }),
        "Export All"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading transcripts..." }) : filteredTranscripts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: searchQuery ? "No transcripts match your search" : "No voice transcripts yet" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.transcriptsList, children: filteredTranscripts.map((transcript, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.transcriptCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.transcriptHeader, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.speaker, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaMicrophone, { style: { marginRight: "8px", color: "#5865f2", fontSize: "14px" } }),
          transcript.speaker_username
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.metadata, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.date, children: new Date(transcript.created_at).toLocaleString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: {
            ...styles.confidence,
            color: transcript.confidence >= 0.8 ? "#43b581" : transcript.confidence >= 0.6 ? "#faa61a" : "#f04747"
          }, children: [
            (transcript.confidence * 100).toFixed(1),
            "% confidence"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.transcriptText, children: transcript.text }),
      transcript.duration && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.duration, children: [
        "Duration: ",
        transcript.duration,
        "s"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => downloadTranscript(transcript), "onClick"),
          style: styles.downloadButton,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaFileAlt, { style: { marginRight: "6px" } }),
            "Download"
          ]
        }
      )
    ] }, idx)) }) })
  ] }) });
}, "VoiceTranscriptsPanel");
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
  toolbar: {
    display: "flex",
    gap: "12px",
    padding: "15px 20px",
    borderBottom: "1px solid #2c2f33"
  },
  searchBox: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#2c2f33",
    borderRadius: "4px",
    padding: "8px 12px"
  },
  searchInput: {
    flex: 1,
    background: "none",
    border: "none",
    color: "#ffffff",
    fontSize: "14px",
    outline: "none"
  },
  exportButton: {
    padding: "8px 16px",
    backgroundColor: "#5865f2",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "13px",
    display: "flex",
    alignItems: "center"
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
  empty: {
    textAlign: "center",
    color: "#99aab5",
    padding: "40px"
  },
  transcriptsList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  transcriptCard: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "16px"
  },
  transcriptHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "12px"
  },
  speaker: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
    display: "flex",
    alignItems: "center"
  },
  metadata: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "4px"
  },
  date: {
    fontSize: "12px",
    color: "#99aab5"
  },
  confidence: {
    fontSize: "12px",
    fontWeight: "500"
  },
  transcriptText: {
    fontSize: "14px",
    color: "#dcddde",
    lineHeight: "1.6",
    marginBottom: "12px",
    padding: "12px",
    backgroundColor: "#1e1e1e",
    borderRadius: "4px"
  },
  duration: {
    fontSize: "12px",
    color: "#99aab5",
    marginBottom: "12px"
  },
  downloadButton: {
    padding: "6px 12px",
    backgroundColor: "#5865f2",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "12px",
    display: "inline-flex",
    alignItems: "center"
  }
};
export {
  VoiceTranscriptsPanel as default
};
