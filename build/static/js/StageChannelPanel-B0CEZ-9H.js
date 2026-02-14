var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
import "./ui-vendor-iPoN0WGz.js";
const StageChannelPanel = /* @__PURE__ */ __name(({ roomId, apiBaseUrl, onClose, currentUser }) => {
  const [activeStages, setActiveStages] = reactExports.useState([]);
  const [selectedStage, setSelectedStage] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [view, setView] = reactExports.useState("list");
  const [newStage, setNewStage] = reactExports.useState({
    topic: "",
    description: "",
    max_speakers: 10,
    max_audience: 1e3,
    is_public: true
  });
  reactExports.useEffect(() => {
    fetchActiveStages();
    const interval = setInterval(fetchActiveStages, 5e3);
    return () => clearInterval(interval);
  }, [roomId]);
  const fetchActiveStages = /* @__PURE__ */ __name(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const url = roomId ? `${apiBaseUrl}/stages/active/` : `${apiBaseUrl}/stages/active/`;
      const response = await fetch(url, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setActiveStages(Array.isArray(data) ? data : data.stages || []);
      }
    } catch (error) {
      console.error("Stages fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, "fetchActiveStages");
  const handleCreateStage = /* @__PURE__ */ __name(async () => {
    if (!newStage.topic.trim()) {
      toast.error("⚠️ Konu başlığı gerekli");
      return;
    }
    if (!roomId) {
      toast.error("⚠️ Lütfen bir ses kanalında olun");
      return;
    }
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/stages/create/${roomId}/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newStage)
      });
      if (response.ok) {
        const data = await response.json();
        setActiveStages([...activeStages, data.stage]);
        setNewStage({ topic: "", description: "", max_speakers: 10, max_audience: 1e3, is_public: true });
        setView("list");
        toast.success("✅ Stage oluşturuldu!");
      } else {
        const error = await response.json();
        toast.error(error.error || "❌ Stage oluşturulamadı");
      }
    } catch (error) {
      console.error("Stage creation error:", error);
      toast.error("❌ Hata oluştu");
    }
  }, "handleCreateStage");
  const handleJoinStage = /* @__PURE__ */ __name(async (stageId) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/stages/${stageId}/join/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        toast.success("🎙️ Stage'e katıldın!");
        fetchActiveStages();
      } else {
        const error = await response.json();
        toast.error(error.error || "❌ Stage'e katılamadın");
      }
    } catch (error) {
      console.error("Join stage error:", error);
      toast.error("❌ Hata oluştu");
    }
  }, "handleJoinStage");
  const handleLeaveStage = /* @__PURE__ */ __name(async (stageId) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/stages/${stageId}/leave/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        toast.success("👋 Stage'den ayrıldın");
        fetchActiveStages();
      }
    } catch (error) {
      console.error("Leave stage error:", error);
    }
  }, "handleLeaveStage");
  const handleRequestToSpeak = /* @__PURE__ */ __name(async (stageId) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/stages/${stageId}/request-speak/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        toast.success("✋ Konuşma talebi gönderildi");
      }
    } catch (error) {
      console.error("Request speak error:", error);
    }
  }, "handleRequestToSpeak");
  const getRoleIcon = /* @__PURE__ */ __name((role) => {
    const icons = {
      host: "👑",
      moderator: "🛡️",
      speaker: "🎙️",
      listener: "👂"
    };
    return icons[role] || "👤";
  }, "getRoleIcon");
  const getRoleColor = /* @__PURE__ */ __name((role) => {
    const colors = {
      host: "#faa61a",
      moderator: "#8b5cf6",
      speaker: "#34c759",
      listener: "#6c6d7d"
    };
    return colors[role] || "#6c6d7d";
  }, "getRoleColor");
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stage-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stage-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stage-loading", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Yükleniyor..." })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stage-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stage-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stage-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "🎙️ Stage Kanalları" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-actions", children: [
        roomId && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: `view-toggle ${view === "list" ? "active" : ""}`,
              onClick: /* @__PURE__ */ __name(() => setView("list"), "onClick"),
              children: "📋 Aktif Stage'ler"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: `view-toggle ${view === "create" ? "active" : ""}`,
              onClick: /* @__PURE__ */ __name(() => setView("create"), "onClick"),
              children: "➕ Oluştur"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "✕" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stage-content", children: view === "list" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stages-list", children: activeStages.length > 0 ? activeStages.map((stage) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stage-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stage-info", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stage-icon", children: "🎙️" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stage-details", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: stage.topic }),
          stage.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stage-description", children: stage.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stage-meta", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "👑 Host: ",
              stage.host_username
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "🎙️ ",
              stage.speakers_count || 0,
              " konuşmacı"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "👂 ",
              stage.audience_count || 0,
              " dinleyici"
            ] })
          ] })
        ] })
      ] }),
      stage.speakers && stage.speakers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "speakers-list", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Konuşmacılar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "speakers-grid", children: [
          stage.speakers.slice(0, 6).map((speaker, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "speaker-badge", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "role-icon",
                style: { color: getRoleColor(speaker.role) },
                children: getRoleIcon(speaker.role)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "speaker-name", children: speaker.username })
          ] }, idx)),
          stage.speakers.length > 6 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "speaker-badge more", children: [
            "+",
            stage.speakers.length - 6
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stage-actions", children: !stage.is_member ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "join-stage-btn",
          onClick: /* @__PURE__ */ __name(() => handleJoinStage(stage.id), "onClick"),
          children: "🎧 Dinle"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "leave-stage-btn",
            onClick: /* @__PURE__ */ __name(() => handleLeaveStage(stage.id), "onClick"),
            children: "👋 Ayrıl"
          }
        ),
        stage.user_role === "listener" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "request-speak-btn",
            onClick: /* @__PURE__ */ __name(() => handleRequestToSpeak(stage.id), "onClick"),
            children: "✋ Konuşmak İstiyorum"
          }
        )
      ] }) })
    ] }, stage.id)) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "no-stages", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "🎙️ Aktif stage yok" }),
      roomId && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setView("create"), "onClick"), children: "İlk stage'i oluştur" })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "create-stage-form", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "🎙️ Yeni Stage Oluştur" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Konu Başlığı *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Konuşma konusu...",
            value: newStage.topic,
            onChange: /* @__PURE__ */ __name((e) => setNewStage({ ...newStage, topic: e.target.value }), "onChange"),
            maxLength: 100
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Açıklama" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            placeholder: "Stage hakkında detaylar...",
            value: newStage.description,
            onChange: /* @__PURE__ */ __name((e) => setNewStage({ ...newStage, description: e.target.value }), "onChange"),
            rows: 4
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Maks. Konuşmacı (1-10)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              value: newStage.max_speakers,
              onChange: /* @__PURE__ */ __name((e) => setNewStage({ ...newStage, max_speakers: Math.min(10, Math.max(1, parseInt(e.target.value) || 1)) }), "onChange"),
              min: "1",
              max: "10"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Maks. Dinleyici" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              value: newStage.max_audience,
              onChange: /* @__PURE__ */ __name((e) => setNewStage({ ...newStage, max_audience: Math.min(1e3, Math.max(1, parseInt(e.target.value) || 100)) }), "onChange"),
              min: "1",
              max: "1000"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-group checkbox-group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "checkbox",
            checked: newStage.is_public,
            onChange: /* @__PURE__ */ __name((e) => setNewStage({ ...newStage, is_public: e.target.checked }), "onChange")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🌍 Herkese Açık" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "submit-btn", onClick: handleCreateStage, children: "✨ Stage Oluştur" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "cancel-btn", onClick: /* @__PURE__ */ __name(() => setView("list"), "onClick"), children: "İptal" })
      ] })
    ] }) })
  ] }) });
}, "StageChannelPanel");
export {
  StageChannelPanel as default
};
