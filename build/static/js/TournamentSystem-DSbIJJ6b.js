var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { u as FaUsers, z as FaClock, a as FaTimes, P as FaTrophy, an as FaPlus } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const useTournament = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl }) => {
  const [tournaments, setTournaments] = reactExports.useState([]);
  const [activeTournament, setActiveTournament] = reactExports.useState(null);
  const [showCreateModal, setShowCreateModal] = reactExports.useState(false);
  const [filter, setFilter] = reactExports.useState("all");
  const loadTournaments = /* @__PURE__ */ __name(async (currentFilter) => {
    try {
      const f = currentFilter || filter;
      const res = await fetchWithAuth(`${apiBaseUrl}/tournaments/?filter=${f}`);
      if (res.ok) {
        const data = await res.json();
        setTournaments(data.tournaments || []);
      }
    } catch (error) {
      console.error("Tournament load error:", error);
    }
  }, "loadTournaments");
  const createTournament = /* @__PURE__ */ __name(async (tournamentData) => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/tournaments/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tournamentData)
      });
      if (res.ok) {
        const data = await res.json();
        setTournaments([data.tournament, ...tournaments]);
        setShowCreateModal(false);
      }
    } catch (error) {
      console.error("Tournament create error:", error);
    }
  }, "createTournament");
  const joinTournament = /* @__PURE__ */ __name(async (tournamentId) => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/tournaments/${tournamentId}/join/`, {
        method: "POST"
      });
      if (res.ok) {
        toast.success("✅ Turnuvaya katıldınız!");
        loadTournaments();
      }
    } catch (error) {
      console.error("Join error:", error);
    }
  }, "joinTournament");
  const leaveTournament = /* @__PURE__ */ __name(async (tournamentId) => {
    if (!confirm("Turnuvadan ayrılmak istediğinize emin misiniz?")) return;
    try {
      await fetchWithAuth(`${apiBaseUrl}/tournaments/${tournamentId}/leave/`, {
        method: "POST"
      });
      loadTournaments();
    } catch (error) {
      console.error("Leave error:", error);
    }
  }, "leaveTournament");
  return {
    tournaments,
    activeTournament,
    setActiveTournament,
    showCreateModal,
    setShowCreateModal,
    filter,
    setFilter,
    loadTournaments,
    createTournament,
    joinTournament,
    leaveTournament
  };
}, "useTournament");
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
    zIndex: 1e4,
    padding: "20px"
  },
  panel: {
    backgroundColor: "#2f3136",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "1200px",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column"
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px",
    borderBottom: "1px solid #202225"
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  headerActions: {
    display: "flex",
    gap: "12px"
  },
  title: {
    margin: 0,
    fontSize: "20px",
    color: "#ffffff"
  },
  createButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#5865f2",
    color: "#ffffff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px"
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    cursor: "pointer",
    padding: "8px"
  },
  filters: {
    display: "flex",
    gap: "8px",
    padding: "16px 20px",
    borderBottom: "1px solid #202225"
  },
  filterButton: {
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "13px"
  },
  content: {
    flex: 1,
    overflowY: "auto",
    padding: "20px"
  },
  empty: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#b9bbbe"
  },
  tournamentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "16px"
  },
  tournamentCard: {
    backgroundColor: "#36393f",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start"
  },
  tournamentName: {
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "bold",
    flex: 1
  },
  statusBadge: {
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "11px",
    color: "#ffffff",
    textTransform: "uppercase",
    fontWeight: "bold"
  },
  cardBody: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  cardInfo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#b9bbbe",
    fontSize: "13px"
  },
  cardFooter: {
    display: "flex",
    gap: "8px",
    marginTop: "auto"
  },
  viewButton: {
    flex: 1,
    backgroundColor: "#202225",
    color: "#ffffff",
    border: "none",
    padding: "8px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px"
  },
  joinButton: {
    flex: 1,
    backgroundColor: "#3ba55d",
    color: "#ffffff",
    border: "none",
    padding: "8px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "bold"
  },
  leaveButton: {
    flex: 1,
    backgroundColor: "#ed4245",
    color: "#ffffff",
    border: "none",
    padding: "8px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px"
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10001
  },
  modal: {
    backgroundColor: "#36393f",
    borderRadius: "8px",
    padding: "24px",
    width: "90%",
    maxWidth: "500px",
    maxHeight: "80vh",
    overflowY: "auto"
  },
  modalTitle: {
    color: "#ffffff",
    marginBottom: "16px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  input: {
    width: "100%",
    backgroundColor: "#202225",
    border: "none",
    color: "#dcddde",
    padding: "10px",
    borderRadius: "4px",
    fontSize: "14px",
    outline: "none"
  },
  modalButtons: {
    display: "flex",
    gap: "8px",
    justifyContent: "flex-end",
    marginTop: "16px"
  },
  cancelButton: {
    backgroundColor: "transparent",
    color: "#ffffff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer"
  },
  submitButton: {
    backgroundColor: "#5865f2",
    color: "#ffffff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500"
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px"
  },
  modalClose: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    cursor: "pointer",
    padding: "4px"
  },
  modalContent: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  detailSection: {
    backgroundColor: "#2f3136",
    padding: "16px",
    borderRadius: "8px"
  },
  participantList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "8px"
  },
  participant: {
    backgroundColor: "#36393f",
    padding: "8px 12px",
    borderRadius: "4px",
    color: "#dcddde",
    fontSize: "13px",
    display: "flex",
    justifyContent: "space-between"
  },
  seed: {
    color: "#faa61a",
    fontWeight: "bold"
  }
};
const TournamentCard = /* @__PURE__ */ __name(({ tournament, currentUser, onJoin, onLeave, onView }) => {
  const isParticipant = tournament.participants?.some((p) => p.username === currentUser);
  const isFull = tournament.participants?.length >= tournament.max_participants;
  const isCompleted = tournament.status === "completed";
  const isActive = tournament.status === "active";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.tournamentCard, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.cardHeader, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.tournamentName, children: tournament.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        ...styles.statusBadge,
        backgroundColor: isActive ? "#3ba55d" : isCompleted ? "#72767d" : "#faa61a"
      }, children: tournament.status })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.cardBody, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.cardInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, { size: 14 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          tournament.participants?.length || 0,
          "/",
          tournament.max_participants
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.cardInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, { size: 14 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(tournament.start_date).toLocaleDateString("tr-TR") })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.cardFooter, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onView, style: styles.viewButton, children: "Detaylar" }),
      !isCompleted && (isParticipant ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onLeave, style: styles.leaveButton, children: [
        "Ayr",
        "ı",
        "l"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onJoin,
          disabled: isFull,
          style: {
            ...styles.joinButton,
            opacity: isFull ? 0.5 : 1,
            cursor: isFull ? "not-allowed" : "pointer"
          },
          children: isFull ? "Dolu" : "Katıl"
        }
      ))
    ] })
  ] });
}, "TournamentCard");
const CreateTournamentModal = /* @__PURE__ */ __name(({ onClose, onCreate }) => {
  const [formData, setFormData] = reactExports.useState({
    name: "",
    game: "",
    max_participants: 8,
    start_date: "",
    prize: "",
    rules: ""
  });
  const handleSubmit = /* @__PURE__ */ __name((e) => {
    e.preventDefault();
    onCreate(formData);
  }, "handleSubmit");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.modalOverlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles.modalTitle, children: [
      "Yeni Turnuva Olu",
      "ş",
      "tur"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, style: styles.form, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Turnuva Ad{'ı'}",
          value: formData.name,
          onChange: /* @__PURE__ */ __name((e) => setFormData({ ...formData, name: e.target.value }), "onChange"),
          style: styles.input,
          required: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Oyun",
          value: formData.game,
          onChange: /* @__PURE__ */ __name((e) => setFormData({ ...formData, game: e.target.value }), "onChange"),
          style: styles.input,
          required: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: formData.max_participants,
          onChange: /* @__PURE__ */ __name((e) => setFormData({ ...formData, max_participants: parseInt(e.target.value) }), "onChange"),
          style: styles.input,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: 4, children: [
              "4 Ki",
              "ş",
              "i"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: 8, children: [
              "8 Ki",
              "ş",
              "i"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: 16, children: [
              "16 Ki",
              "ş",
              "i"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: 32, children: [
              "32 Ki",
              "ş",
              "i"
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "datetime-local",
          value: formData.start_date,
          onChange: /* @__PURE__ */ __name((e) => setFormData({ ...formData, start_date: e.target.value }), "onChange"),
          style: styles.input,
          required: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Ödül (opsiyonel)",
          value: formData.prize,
          onChange: /* @__PURE__ */ __name((e) => setFormData({ ...formData, prize: e.target.value }), "onChange"),
          style: styles.input
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          placeholder: "Kurallar",
          value: formData.rules,
          onChange: /* @__PURE__ */ __name((e) => setFormData({ ...formData, rules: e.target.value }), "onChange"),
          style: { ...styles.input, minHeight: "100px" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modalButtons, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: onClose, style: styles.cancelButton, children: [
          "İ",
          "ptal"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", style: styles.submitButton, children: [
          "Olu",
          "ş",
          "tur"
        ] })
      ] })
    ] })
  ] }) });
}, "CreateTournamentModal");
const TournamentDetailModal = /* @__PURE__ */ __name(({ tournament, onClose, fetchWithAuth, apiBaseUrl }) => {
  const [bracket, setBracket] = reactExports.useState(null);
  reactExports.useEffect(() => {
    loadBracket();
  }, [tournament.id]);
  const loadBracket = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/tournaments/${tournament.id}/bracket/`);
      if (res.ok) {
        const data = await res.json();
        setBracket(data.bracket);
      }
    } catch (error) {
      console.error("Bracket load error:", error);
    }
  }, "loadBracket");
  const renderBracket = /* @__PURE__ */ __name(() => {
    const rounds = {};
    (Array.isArray(bracket) ? bracket : []).forEach((m) => {
      const r = m.round || 1;
      if (!rounds[r]) rounds[r] = [];
      rounds[r].push(m);
    });
    const roundKeys = Object.keys(rounds).sort((a, b) => a - b);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: "20px", overflowX: "auto", padding: "12px 0" }, children: roundKeys.map((rk) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { minWidth: "200px", flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#5865f2", fontWeight: 600, fontSize: "0.85em", marginBottom: "10px", textAlign: "center" }, children: roundKeys.length === 1 ? "Final" : `Tur ${rk}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: "12px" }, children: rounds[rk].map((match) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { backgroundColor: "#1e1f22", borderRadius: "8px", overflow: "hidden", border: match.status === "completed" ? "1px solid #23a559" : "1px solid #3f4147" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", backgroundColor: match.winner && match.winner === match.participant1?.user_id ? "rgba(35,165,89,0.1)" : "transparent", borderBottom: "1px solid #2b2d31" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#dbdee1", fontSize: "0.85em", fontWeight: match.winner === match.participant1?.user_id ? 700 : 400 }, children: match.participant1?.username || "TBD" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#949ba4", fontSize: "0.8em", fontWeight: 600 }, children: match.score1 ?? "-" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", backgroundColor: match.winner && match.winner === match.participant2?.user_id ? "rgba(35,165,89,0.1)" : "transparent" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#dbdee1", fontSize: "0.85em", fontWeight: match.winner === match.participant2?.user_id ? 700 : 400 }, children: match.participant2?.username || "TBD" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#949ba4", fontSize: "0.8em", fontWeight: 600 }, children: match.score2 ?? "-" })
        ] })
      ] }, match.id)) })
    ] }, rk)) });
  }, "renderBracket");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.modalOverlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.modal, maxWidth: "800px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modalHeader, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.modalTitle, children: tournament.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.modalClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { size: 18 }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modalContent, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.detailSection, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Bilgiler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Oyun:" }),
          " ",
          tournament.game
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
            "Kat",
            "ı",
            "l",
            "ı",
            "mc",
            "ı",
            ":"
          ] }),
          " ",
          tournament.participants?.length,
          "/",
          tournament.max_participants
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
            "Ba",
            "ş",
            "lang",
            "ıç",
            ":"
          ] }),
          " ",
          new Date(tournament.start_date).toLocaleString("tr-TR")
        ] }),
        tournament.prize && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
            "Ö",
            "d",
            "ü",
            "l:"
          ] }),
          " ",
          tournament.prize
        ] })
      ] }),
      tournament.rules && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.detailSection, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Kurallar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: tournament.rules })
      ] }),
      bracket && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.detailSection, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { children: [
          "E",
          "ş",
          "le",
          "ş",
          "meler"
        ] }),
        renderBracket()
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.detailSection, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { children: [
          "Kat",
          "ı",
          "l",
          "ı",
          "mc",
          "ı",
          "lar"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.participantList, children: tournament.participants?.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.participant, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: p.username }),
          p.seed && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.seed, children: [
            "#",
            p.seed
          ] })
        ] }, p.id)) })
      ] })
    ] })
  ] }) });
}, "TournamentDetailModal");
const TournamentSystem = /* @__PURE__ */ __name(({ onClose, fetchWithAuth, apiBaseUrl, currentUser }) => {
  const {
    tournaments,
    activeTournament,
    setActiveTournament,
    showCreateModal,
    setShowCreateModal,
    filter,
    setFilter,
    loadTournaments,
    createTournament,
    joinTournament,
    leaveTournament
  } = useTournament({ fetchWithAuth, apiBaseUrl });
  reactExports.useEffect(() => {
    loadTournaments();
  }, [filter]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.panel, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrophy, { size: 24, color: "#faa61a" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Turnuvalar" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerActions, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setShowCreateModal(true), "onClick"), style: styles.createButton, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, { size: 14 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Yeni Turnuva" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { size: 20 }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.filters, children: ["all", "active", "upcoming", "completed"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: /* @__PURE__ */ __name(() => setFilter(f), "onClick"),
        style: {
          ...styles.filterButton,
          backgroundColor: filter === f ? "#5865f2" : "#2f3136"
        },
        children: f === "all" ? "Tümü" : f === "active" ? "Aktif" : f === "upcoming" ? "Yaklaşan" : "Tamamlanan"
      },
      f
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: tournaments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.empty, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrophy, { size: 48, color: "#4e5058" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Henüz turnuva yok" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.tournamentGrid, children: tournaments.map((tournament) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      TournamentCard,
      {
        tournament,
        currentUser,
        onJoin: /* @__PURE__ */ __name(() => joinTournament(tournament.id), "onJoin"),
        onLeave: /* @__PURE__ */ __name(() => leaveTournament(tournament.id), "onLeave"),
        onView: /* @__PURE__ */ __name(() => setActiveTournament(tournament), "onView")
      },
      tournament.id
    )) }) }),
    showCreateModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateTournamentModal,
      {
        onClose: /* @__PURE__ */ __name(() => setShowCreateModal(false), "onClose"),
        onCreate: createTournament
      }
    ),
    activeTournament && /* @__PURE__ */ jsxRuntimeExports.jsx(
      TournamentDetailModal,
      {
        tournament: activeTournament,
        onClose: /* @__PURE__ */ __name(() => setActiveTournament(null), "onClose"),
        fetchWithAuth,
        apiBaseUrl
      }
    )
  ] }) });
}, "TournamentSystem");
export {
  TournamentSystem as default
};
