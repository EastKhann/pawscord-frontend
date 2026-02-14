var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { C as FaUser, a as FaTimes } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const ServerNicknamesPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
  const [nicknames, setNicknames] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  reactExports.useEffect(() => {
    fetchNicknames();
  }, []);
  const fetchNicknames = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/nicknames/`);
      const data = await response.json();
      setNicknames(data.nicknames || []);
    } catch (error) {
      toast.error("Failed to load nicknames");
    } finally {
      setLoading(false);
    }
  }, "fetchNicknames");
  const updateNickname = /* @__PURE__ */ __name(async (userId, newNickname) => {
    try {
      await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/nicknames/set/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          nickname: newNickname
        })
      });
      toast.success("Nickname updated");
      fetchNicknames();
    } catch (error) {
      toast.error("Failed to update nickname");
    }
  }, "updateNickname");
  const clearNickname = /* @__PURE__ */ __name(async (userId) => {
    try {
      await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/nicknames/clear/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId })
      });
      toast.success("Nickname cleared");
      fetchNicknames();
    } catch (error) {
      toast.error("Failed to clear nickname");
    }
  }, "clearNickname");
  const filteredNicknames = nicknames.filter(
    (n) => n.username.toLowerCase().includes(searchQuery.toLowerCase()) || n.nickname && n.nickname.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaUser, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Server Nicknames" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.toolbar, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "text",
        value: searchQuery,
        onChange: /* @__PURE__ */ __name((e) => setSearchQuery(e.target.value), "onChange"),
        placeholder: "Search members...",
        style: styles.searchInput
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading nicknames..." }) : filteredNicknames.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: searchQuery ? "No members match your search" : "No members found" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.nicknamesList, children: filteredNicknames.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.nicknameCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.userInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.username, children: item.username }),
        item.nickname && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.currentNickname, children: [
          "Current nickname: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.nicknameValue, children: item.nickname })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.actions, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => {
              const newNick = prompt("Enter new nickname:", item.nickname || "");
              if (newNick !== null && newNick.trim()) {
                updateNickname(item.user_id, newNick.trim());
              }
            }, "onClick"),
            style: styles.editButton,
            children: "Edit"
          }
        ),
        item.nickname && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => clearNickname(item.user_id), "onClick"),
            style: styles.clearButton,
            children: "Clear"
          }
        )
      ] })
    ] }, idx)) }) })
  ] }) });
}, "ServerNicknamesPanel");
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
    maxWidth: "700px",
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
    padding: "15px 20px",
    borderBottom: "1px solid #2c2f33"
  },
  searchInput: {
    width: "100%",
    padding: "10px 12px",
    backgroundColor: "#2c2f33",
    border: "1px solid #2c2f33",
    borderRadius: "4px",
    color: "#ffffff",
    fontSize: "14px"
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
  nicknamesList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  nicknameCard: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  userInfo: {
    flex: 1
  },
  username: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "4px"
  },
  currentNickname: {
    fontSize: "13px",
    color: "#99aab5"
  },
  nicknameValue: {
    color: "#5865f2",
    fontWeight: "500"
  },
  actions: {
    display: "flex",
    gap: "8px"
  },
  editButton: {
    padding: "6px 12px",
    backgroundColor: "#5865f2",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500"
  },
  clearButton: {
    padding: "6px 12px",
    backgroundColor: "#f04747",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500"
  }
};
export {
  ServerNicknamesPanel as default
};
