var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { ba as FaComment, b3 as FaAt, k as FaBell, ad as FaUserPlus, ck as FaPhoneAlt, au as FaVolumeMute, G as FaVolumeUp, bo as FaToggleOn, bp as FaToggleOff, aM as FaPause, aN as FaPlay, aY as FaSave } from "./icons-vendor-2VDeY8fW.js";
const SOUND_EVENTS = [
  { key: "message", label: "Yeni Mesaj", icon: FaComment, defaultSound: "message.mp3" },
  { key: "mention", label: "@Bahsetme", icon: FaAt, defaultSound: "mention.mp3" },
  { key: "dm", label: "Özel Mesaj", icon: FaComment, defaultSound: "dm.mp3" },
  { key: "notification", label: "Bildirim", icon: FaBell, defaultSound: "notification.mp3" },
  { key: "join", label: "Kullanıcı Katıldı", icon: FaUserPlus, defaultSound: "join.mp3" },
  { key: "leave", label: "Kullanıcı Ayrıldı", icon: FaUserPlus, defaultSound: "leave.mp3" },
  { key: "call", label: "Gelen Arama", icon: FaPhoneAlt, defaultSound: "call.mp3" },
  { key: "deafen", label: "Sessize Al/Aç", icon: FaVolumeMute, defaultSound: "deafen.mp3" }
];
const SOUND_PRESETS = [
  { name: "Varsayılan", value: "default" },
  { name: "Discord Klasik", value: "classic" },
  { name: "Yumuşak", value: "soft" },
  { name: "Retro", value: "retro" },
  { name: "Minimal", value: "minimal" },
  { name: "Sessiz", value: "none" }
];
const NotificationSoundSettings = /* @__PURE__ */ __name(({ settings, onSave }) => {
  const [masterVolume, setMasterVolume] = reactExports.useState(settings?.masterVolume ?? 80);
  const [masterEnabled, setMasterEnabled] = reactExports.useState(settings?.masterEnabled !== false);
  const [eventSettings, setEventSettings] = reactExports.useState(
    settings?.events || SOUND_EVENTS.reduce((acc, e) => ({
      ...acc,
      [e.key]: { enabled: true, volume: 100, sound: "default" }
    }), {})
  );
  const [playingSound, setPlayingSound] = reactExports.useState(null);
  const updateEvent = reactExports.useCallback((key, field, value) => {
    setEventSettings((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value }
    }));
  }, []);
  const handlePlaySound = reactExports.useCallback((key) => {
    if (playingSound === key) {
      setPlayingSound(null);
      return;
    }
    setPlayingSound(key);
    setTimeout(() => setPlayingSound(null), 1500);
  }, [playingSound]);
  const handleSave = reactExports.useCallback(() => {
    onSave?.({
      masterVolume,
      masterEnabled,
      events: eventSettings
    });
  }, [masterVolume, masterEnabled, eventSettings, onSave]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaVolumeUp, { style: { fontSize: 18, color: "#5865f2" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: S.title, children: "Bildirim Sesleri" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.masterSection, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.masterRow, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          style: S.toggleBtn,
          onClick: /* @__PURE__ */ __name(() => setMasterEnabled(!masterEnabled), "onClick"),
          children: masterEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaToggleOn, { style: { fontSize: 24, color: "#5865f2" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaToggleOff, { style: { fontSize: 24, color: "#4e5058" } })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.masterLabel, children: "Tüm Sesler" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.volumeSlider, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaVolumeMute, { style: { fontSize: 12, color: "#4e5058" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 100,
            value: masterVolume,
            onChange: /* @__PURE__ */ __name((e) => setMasterVolume(Number(e.target.value)), "onChange"),
            style: S.slider,
            disabled: !masterEnabled
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaVolumeUp, { style: { fontSize: 12, color: "#4e5058" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: S.volumeValue, children: [
          masterVolume,
          "%"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.eventList, children: SOUND_EVENTS.map((event) => {
      const Icon = event.icon;
      const es = eventSettings[event.key] || { enabled: true, volume: 100, sound: "default" };
      const isPlaying = playingSound === event.key;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        ...S.eventItem,
        opacity: masterEnabled && es.enabled ? 1 : 0.5
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.eventInfo, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { style: { fontSize: 14, color: "#5865f2" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.eventLabel, children: event.label })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.eventControls, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              style: S.soundSelect,
              value: es.sound,
              onChange: /* @__PURE__ */ __name((e) => updateEvent(event.key, "sound", e.target.value), "onChange"),
              disabled: !masterEnabled || !es.enabled,
              children: SOUND_PRESETS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p.value, children: p.name }, p.value))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "range",
              min: 0,
              max: 100,
              value: es.volume,
              onChange: /* @__PURE__ */ __name((e) => updateEvent(event.key, "volume", Number(e.target.value)), "onChange"),
              style: { ...S.miniSlider },
              disabled: !masterEnabled || !es.enabled
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              style: S.playBtn,
              onClick: /* @__PURE__ */ __name(() => handlePlaySound(event.key), "onClick"),
              disabled: !masterEnabled || !es.enabled,
              children: isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaPause, { style: { fontSize: 10 } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlay, { style: { fontSize: 10 } })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              style: S.toggleSmall,
              onClick: /* @__PURE__ */ __name(() => updateEvent(event.key, "enabled", !es.enabled), "onClick"),
              disabled: !masterEnabled,
              children: es.enabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaToggleOn, { style: { fontSize: 18, color: "#57f287" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaToggleOff, { style: { fontSize: 18, color: "#4e5058" } })
            }
          )
        ] })
      ] }, event.key);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", style: S.saveBtn, onClick: handleSave, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaSave, {}),
      " Ayarları Kaydet"
    ] })
  ] });
}, "NotificationSoundSettings");
const S = {
  container: { padding: 16 },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 20
  },
  title: { fontSize: 16, fontWeight: 700, color: "#f2f3f5", margin: 0 },
  masterSection: {
    padding: 14,
    backgroundColor: "#2b2d31",
    borderRadius: 8,
    marginBottom: 16
  },
  masterRow: {
    display: "flex",
    alignItems: "center",
    gap: 10
  },
  masterLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: "#f2f3f5"
  },
  volumeSlider: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginLeft: "auto"
  },
  slider: {
    width: 120,
    height: 4,
    appearance: "none",
    backgroundColor: "#1e1f22",
    borderRadius: 2,
    outline: "none",
    cursor: "pointer"
  },
  volumeValue: {
    fontSize: 12,
    color: "#b5bac1",
    fontWeight: 500,
    minWidth: 32,
    textAlign: "right"
  },
  toggleBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center"
  },
  eventList: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    marginBottom: 16
  },
  eventItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 12px",
    backgroundColor: "#2b2d31",
    borderRadius: 6,
    transition: "opacity 0.2s"
  },
  eventInfo: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    minWidth: 120
  },
  eventLabel: {
    fontSize: 14,
    color: "#dcddde",
    fontWeight: 500
  },
  eventControls: {
    display: "flex",
    alignItems: "center",
    gap: 8
  },
  soundSelect: {
    backgroundColor: "#1e1f22",
    border: "none",
    borderRadius: 4,
    color: "#dcddde",
    fontSize: 12,
    padding: "4px 8px",
    outline: "none",
    minWidth: 90
  },
  miniSlider: {
    width: 60,
    height: 3,
    appearance: "none",
    backgroundColor: "#1e1f22",
    borderRadius: 2,
    outline: "none",
    cursor: "pointer"
  },
  playBtn: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    backgroundColor: "rgba(88,101,242,0.2)",
    color: "#5865f2",
    cursor: "pointer"
  },
  toggleSmall: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center"
  },
  saveBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: "10px 24px",
    borderRadius: 4,
    border: "none",
    backgroundColor: "#5865f2",
    color: "#fff",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    width: "100%"
  }
};
const NotificationSoundSettings_default = reactExports.memo(NotificationSoundSettings);
export {
  NotificationSoundSettings_default as default
};
