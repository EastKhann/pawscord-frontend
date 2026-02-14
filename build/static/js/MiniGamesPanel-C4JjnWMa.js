var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a8 as FaGamepad, a as FaTimes, c8 as FaDice, P as FaTrophy, u as FaUsers, aq as FaCoins, aN as FaPlay } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const MiniGamesPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
  const [games, setGames] = reactExports.useState([]);
  const [activeGame, setActiveGame] = reactExports.useState(null);
  const [leaderboard, setLeaderboard] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [view, setView] = reactExports.useState("games");
  reactExports.useEffect(() => {
    fetchGames();
    fetchLeaderboard();
  }, []);
  const fetchGames = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/games/?server_id=${serverId}`);
      const data = await res.json();
      setGames(data.games || []);
    } catch (error) {
      console.error("Failed to fetch games:", error);
    }
  }, "fetchGames");
  const fetchLeaderboard = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/games/leaderboard/?server_id=${serverId}`);
      const data = await res.json();
      setLeaderboard(data.leaderboard || []);
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error);
    }
  }, "fetchLeaderboard");
  const createGame = /* @__PURE__ */ __name(async (gameType) => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/games/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ game_type: gameType, server_id: serverId })
      });
      const data = await res.json();
      if (data.game) {
        setActiveGame(data.game);
        setView("playing");
        toast.success(`${data.game.game_type} started!`);
      }
    } catch (error) {
      toast.error("Failed to create game");
    } finally {
      setLoading(false);
    }
  }, "createGame");
  const performAction = /* @__PURE__ */ __name(async (action, actionData = {}) => {
    if (!activeGame) return;
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/games/${activeGame.id}/action/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, data: actionData })
      });
      const data = await res.json();
      if (data.game) {
        setActiveGame(data.game);
      }
      if (data.status === "finished") {
        toast.success(`Game over! ${data.winners?.join(", ")} won ${data.reward} coins!`);
        setTimeout(() => {
          setActiveGame(null);
          setView("games");
          fetchLeaderboard();
        }, 3e3);
      }
      return data;
    } catch (error) {
      toast.error("Action failed");
    }
  }, "performAction");
  const gameIcons = {
    trivia: "🧠",
    word_chain: "📝",
    tic_tac_toe: "⭕",
    rock_paper_scissors: "✊",
    number_guess: "🔢",
    emoji_quiz: "😀",
    hangman: "🎯",
    memory_match: "🃏"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaGamepad, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Mini Games" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.tabs, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setView("games"), "onClick"), style: view === "games" ? styles.activeTab : styles.tab, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaDice, {}),
        " Games"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setView("leaderboard"), "onClick"), style: view === "leaderboard" ? styles.activeTab : styles.tab, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrophy, {}),
        " Leaderboard"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      view === "games" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.gamesGrid, children: games.map((game) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.gameCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.gameIcon, children: gameIcons[game.id] || "🎮" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.gameName, children: game.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.gameDesc, children: game.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.gameInfo, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, {}),
            " ",
            game.min_players,
            "-",
            game.max_players
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaCoins, {}),
            " ",
            game.reward_coins
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => createGame(game.id), "onClick"),
            style: styles.playButton,
            disabled: loading,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlay, {}),
              " Play"
            ]
          }
        )
      ] }, game.id)) }),
      view === "playing" && activeGame && /* @__PURE__ */ jsxRuntimeExports.jsx(
        GameRenderer,
        {
          game: activeGame,
          onAction: performAction
        }
      ),
      view === "leaderboard" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.leaderboard, children: [
        leaderboard.map((player, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.leaderboardRow, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.rank, children: [
            "#",
            idx + 1
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.playerName, children: player.username }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.wins, children: [
            player.wins,
            " wins"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.totalScore, children: [
            player.total_score,
            " pts"
          ] })
        ] }, player.username)),
        leaderboard.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.emptyText, children: "No games played yet!" })
      ] })
    ] })
  ] }) });
}, "MiniGamesPanel");
const GameRenderer = /* @__PURE__ */ __name(({ game, onAction }) => {
  const { game_type, state, players } = game;
  if (game_type === "trivia") {
    const question = state.questions?.[state.current_question];
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.gameArea, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
        "Question ",
        state.current_question + 1,
        "/",
        state.questions?.length
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.question, children: question?.question }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.options, children: question?.options.map((opt, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => onAction("answer", { answer: idx }), "onClick"),
          style: styles.optionButton,
          children: opt
        },
        idx
      )) })
    ] });
  }
  if (game_type === "tic_tac_toe") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.gameArea, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Tic Tac Toe" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.ticTacToeBoard, children: state.board?.map((cell, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => onAction("move", { position: idx }), "onClick"),
          style: styles.ticTacToeCell,
          disabled: cell !== null,
          children: cell === 0 ? "❌" : cell === 1 ? "⭕" : ""
        },
        idx
      )) })
    ] });
  }
  if (game_type === "number_guess") {
    const [guess, setGuess] = reactExports.useState("");
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.gameArea, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Guess the Number (1-100)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Guesses left: ",
        state.max_guesses - (state.guesses?.length || 0)
      ] }),
      state.hints?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Last hint: Go ",
        state.hints[state.hints.length - 1]
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "number",
          value: guess,
          onChange: /* @__PURE__ */ __name((e) => setGuess(e.target.value), "onChange"),
          style: styles.guessInput,
          min: "1",
          max: "100"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => {
            onAction("guess", { number: parseInt(guess) });
            setGuess("");
          }, "onClick"),
          style: styles.guessButton,
          children: "Guess!"
        }
      )
    ] });
  }
  if (game_type === "rock_paper_scissors") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.gameArea, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
        "Rock Paper Scissors - Round ",
        state.current_round,
        "/",
        state.max_rounds
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.rpsButtons, children: ["rock", "paper", "scissors"].map((choice) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => onAction("choose", { choice }), "onClick"),
          style: styles.rpsButton,
          children: [
            choice === "rock" ? "🪨" : choice === "paper" ? "📄" : "✂️",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: choice })
          ]
        },
        choice
      )) })
    ] });
  }
  if (game_type === "hangman") {
    const [letter, setLetter] = reactExports.useState("");
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.gameArea, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Hangman" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.hangmanWord, children: state.display?.join(" ") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Wrong guesses: ",
        state.wrong_guesses,
        "/",
        state.max_wrong
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Used: ",
        state.guessed_letters?.join(", ")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: letter,
          onChange: /* @__PURE__ */ __name((e) => setLetter(e.target.value.slice(-1).toUpperCase()), "onChange"),
          style: styles.letterInput,
          maxLength: 1
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => {
            onAction("guess_letter", { letter });
            setLetter("");
          }, "onClick"),
          style: styles.guessButton,
          children: "Guess Letter"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.gameArea, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
      "Game: ",
      game_type
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Game is in progress..." })
  ] });
}, "GameRenderer");
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1e4
  },
  modal: {
    backgroundColor: "#2f3136",
    borderRadius: "12px",
    width: "700px",
    maxHeight: "85vh",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #40444b"
  },
  headerLeft: { display: "flex", alignItems: "center" },
  title: { margin: 0, color: "#fff", fontSize: "20px" },
  closeButton: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    cursor: "pointer",
    fontSize: "20px"
  },
  tabs: { display: "flex", padding: "10px 20px", gap: "10px" },
  tab: {
    background: "#40444b",
    border: "none",
    color: "#b9bbbe",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px"
  },
  activeTab: {
    background: "#5865f2",
    border: "none",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px"
  },
  content: { padding: "20px", overflowY: "auto", flex: 1 },
  gamesGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "15px" },
  gameCard: {
    background: "#40444b",
    borderRadius: "10px",
    padding: "15px",
    textAlign: "center"
  },
  gameIcon: { fontSize: "40px" },
  gameName: { color: "#fff", margin: "10px 0 5px" },
  gameDesc: { color: "#b9bbbe", fontSize: "12px", marginBottom: "10px" },
  gameInfo: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    color: "#b9bbbe",
    fontSize: "12px",
    marginBottom: "10px"
  },
  playButton: {
    background: "#5865f2",
    border: "none",
    color: "#fff",
    padding: "8px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    margin: "0 auto"
  },
  gameArea: { textAlign: "center", color: "#fff" },
  question: { fontSize: "18px", marginBottom: "20px" },
  options: { display: "flex", flexDirection: "column", gap: "10px" },
  optionButton: {
    background: "#40444b",
    border: "none",
    color: "#fff",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background 0.2s"
  },
  ticTacToeBoard: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "5px",
    width: "200px",
    margin: "20px auto"
  },
  ticTacToeCell: {
    width: "60px",
    height: "60px",
    background: "#40444b",
    border: "none",
    borderRadius: "8px",
    fontSize: "30px",
    cursor: "pointer"
  },
  guessInput: {
    background: "#40444b",
    border: "none",
    color: "#fff",
    padding: "10px",
    borderRadius: "6px",
    width: "100px",
    textAlign: "center",
    fontSize: "18px"
  },
  guessButton: {
    background: "#5865f2",
    border: "none",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    marginLeft: "10px"
  },
  letterInput: {
    background: "#40444b",
    border: "none",
    color: "#fff",
    padding: "10px",
    borderRadius: "6px",
    width: "50px",
    textAlign: "center",
    fontSize: "24px",
    textTransform: "uppercase"
  },
  rpsButtons: { display: "flex", justifyContent: "center", gap: "20px" },
  rpsButton: {
    background: "#40444b",
    border: "none",
    color: "#fff",
    padding: "20px",
    borderRadius: "12px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
    fontSize: "40px"
  },
  hangmanWord: { fontSize: "32px", letterSpacing: "8px", marginBottom: "20px" },
  leaderboard: { display: "flex", flexDirection: "column", gap: "10px" },
  leaderboardRow: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    background: "#40444b",
    padding: "12px 15px",
    borderRadius: "8px"
  },
  rank: { color: "#faa61a", fontWeight: "bold", width: "40px" },
  playerName: { color: "#fff", flex: 1 },
  wins: { color: "#57f287" },
  totalScore: { color: "#b9bbbe" },
  emptyText: { color: "#72767d", textAlign: "center", padding: "40px" }
};
export {
  MiniGamesPanel as default
};
