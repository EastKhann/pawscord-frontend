var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { G as FaVolumeUp, h as FaLock, aF as FaHashtag, a as FaTimes, u as FaUsers, i as FaThumbtack, bv as FaCalendar, z as FaClock, l as FaBellSlash, k as FaBell } from "./icons-vendor-2VDeY8fW.js";
const ChannelAboutPanel = /* @__PURE__ */ __name(({
  channel,
  memberCount,
  pinnedCount,
  onClose,
  onToggleMute,
  isMuted
}) => {
  const [tab, setTab] = reactExports.useState("about");
  if (!channel) return null;
  const createdAt = channel.created_at ? new Date(channel.created_at).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }) : null;
  const channelIcon = channel.is_voice ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaVolumeUp, { style: { color: "#949ba4" } }) : channel.is_private ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaLock, { style: { color: "#949ba4" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaHashtag, { style: { color: "#949ba4" } });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.panel, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.headerTitle, children: [
        channelIcon,
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.channelName, children: channel.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: S.closeBtn, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.tabs, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: { ...S.tab, ...tab === "about" ? S.tabActive : {} }, onClick: /* @__PURE__ */ __name(() => setTab("about"), "onClick"), children: "Hakkında" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: { ...S.tab, ...tab === "members" ? S.tabActive : {} }, onClick: /* @__PURE__ */ __name(() => setTab("members"), "onClick"), children: "Üyeler" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.content, children: tab === "about" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      channel.topic && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.sectionLabel, children: "KONU" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: S.topicText, children: channel.topic })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.sectionLabel, children: "BİLGİLER" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.infoGrid, children: [
          memberCount != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.infoItem, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, { style: S.infoIcon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: S.infoText, children: [
              memberCount,
              " üye"
            ] })
          ] }),
          pinnedCount != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.infoItem, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaThumbtack, { style: S.infoIcon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: S.infoText, children: [
              pinnedCount,
              " sabitlenmiş mesaj"
            ] })
          ] }),
          createdAt && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.infoItem, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaCalendar, { style: S.infoIcon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.infoText, children: createdAt })
          ] }),
          channel.slow_mode_interval > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.infoItem, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, { style: S.infoIcon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: S.infoText, children: [
              "Yavaş mod: ",
              channel.slow_mode_interval,
              "sn"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.sectionLabel, children: "KANAL TÜRÜ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.typeBadge, children: [
          channelIcon,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.typeText, children: channel.is_voice ? "Sesli Kanal" : channel.is_private ? "Özel Kanal" : channel.is_forum ? "Forum Kanal" : "Metin Kanalı" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.section, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          style: S.muteBtn,
          onClick: onToggleMute,
          children: [
            isMuted ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaBellSlash, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaBell, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isMuted ? "Bildirimleri Aç" : "Bildirimleri Kapat" })
          ]
        }
      ) })
    ] }) })
  ] });
}, "ChannelAboutPanel");
const S = {
  panel: {
    width: 280,
    height: "100%",
    backgroundColor: "#2b2d31",
    borderLeft: "1px solid rgba(255,255,255,0.06)",
    display: "flex",
    flexDirection: "column",
    flexShrink: 0
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    borderBottom: "1px solid rgba(255,255,255,0.06)"
  },
  headerTitle: { display: "flex", alignItems: "center", gap: 8 },
  channelName: { color: "#fff", fontWeight: 700, fontSize: 15 },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#949ba4",
    cursor: "pointer",
    fontSize: 16,
    padding: 4
  },
  tabs: {
    display: "flex",
    borderBottom: "1px solid rgba(255,255,255,0.06)"
  },
  tab: {
    flex: 1,
    padding: "10px 0",
    background: "none",
    border: "none",
    color: "#949ba4",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    borderBottom: "2px solid transparent",
    transition: "all 0.15s"
  },
  tabActive: { color: "#fff", borderBottomColor: "#5865f2" },
  content: { flex: 1, padding: 16, overflow: "auto" },
  section: { marginBottom: 20 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: "#949ba4",
    letterSpacing: "0.04em",
    display: "block",
    marginBottom: 8
  },
  topicText: {
    color: "#b5bac1",
    fontSize: 13,
    lineHeight: 1.5,
    margin: 0,
    wordBreak: "break-word"
  },
  infoGrid: { display: "flex", flexDirection: "column", gap: 8 },
  infoItem: { display: "flex", alignItems: "center", gap: 8 },
  infoIcon: { color: "#949ba4", fontSize: 14 },
  infoText: { color: "#b5bac1", fontSize: 13 },
  typeBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "4px 10px",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 6
  },
  typeText: { color: "#b5bac1", fontSize: 13 },
  muteBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    width: "100%",
    padding: "10px 14px",
    backgroundColor: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 8,
    color: "#b5bac1",
    cursor: "pointer",
    fontSize: 13,
    transition: "background 0.15s"
  }
};
const ChannelAboutPanel_default = reactExports.memo(ChannelAboutPanel);
export {
  ChannelAboutPanel_default as default
};
