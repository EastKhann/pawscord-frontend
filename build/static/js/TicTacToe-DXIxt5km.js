var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
const TicTacToe = /* @__PURE__ */ __name(({ gameData, onMove, currentUser }) => {
  const { board, turn, player_x, player_o, winner, game_id } = gameData;
  const handleClick = /* @__PURE__ */ __name((index) => {
    if (board[index] !== "" || winner) return;
    onMove(game_id, index);
  }, "handleClick");
  let status = `Sıra: ${turn}`;
  if (winner) status = `🏆 Kazanan: ${winner}`;
  if (!board.includes("") && !winner) status = "🤝 Berabere!";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "❌ ",
        player_x
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "#f0b232" }, children: status }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "⭕ ",
        player_o || "Bekleniyor..."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.board, children: board.map((cell, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        style: {
          ...styles.cell,
          color: cell === "X" ? "#f04747" : "#5865f2"
        },
        onClick: /* @__PURE__ */ __name(() => handleClick(i), "onClick"),
        disabled: !!cell || !!winner,
        children: cell
      },
      i
    )) })
  ] });
}, "TicTacToe");
const styles = {
  container: { backgroundColor: "#2f3136", padding: "10px", borderRadius: "8px", maxWidth: "200px", margin: "10px 0" },
  header: { display: "flex", justifyContent: "space-between", fontSize: "0.8em", marginBottom: "5px", color: "#ccc" },
  board: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "5px" },
  cell: { width: "50px", height: "50px", fontSize: "1.5em", fontWeight: "bold", backgroundColor: "#202225", border: "none", borderRadius: "4px", cursor: "pointer" }
};
export {
  TicTacToe as default
};
