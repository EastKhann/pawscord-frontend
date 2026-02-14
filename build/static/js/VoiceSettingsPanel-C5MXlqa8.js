var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { E as FaMicrophone, bQ as FaSlidersH, bR as FaWaveSquare, d as FaExclamationTriangle, D as FaStop, aN as FaPlay, bN as FaHeadphones, G as FaVolumeUp, aK as FaMusic, a1 as FaShieldAlt, bq as FaBolt, bS as FaKeyboard, bL as FaMicrophoneSlash, r as FaMagic, a as FaTimes, az as FaCog, c as FaSync } from "./icons-vendor-2VDeY8fW.js";
import { y } from "./ui-vendor-iPoN0WGz.js";
import { o as useVoice, g as getApiBase, d as confirmDialog } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
const useVoiceSettings = /* @__PURE__ */ __name(({ channelId }) => {
  const voice = useVoice();
  const [activeTab, setActiveTab] = reactExports.useState("input");
  const [settings, setSettings] = reactExports.useState({
    input_device: "default",
    output_device: "default",
    input_volume: 100,
    output_volume: 100,
    noise_suppression: true,
    noise_suppression_level: "high",
    echo_cancellation: true,
    echo_cancellation_level: "high",
    automatic_gain_control: true,
    agc_level: "moderate",
    noise_gate: true,
    noise_gate_threshold: -50,
    noise_gate_attack: 10,
    noise_gate_release: 100,
    voice_activity: true,
    input_sensitivity: 50,
    voice_threshold: -45,
    push_to_talk: false,
    push_to_talk_key: "Space",
    ptt_release_delay: 200,
    high_pass_filter: true,
    high_pass_frequency: 80,
    audio_bitrate: 64e3,
    sample_rate: 48e3,
    stereo_audio: false,
    attenuation: 50,
    attenuation_while_speaking: true
  });
  const [devices, setDevices] = reactExports.useState({ input: [], output: [] });
  const [equalizerPreset, setEqualizerPreset] = reactExports.useState("default");
  const [voiceEffect, setVoiceEffect] = reactExports.useState(null);
  const [availableEffects, setAvailableEffects] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [micLevel, setMicLevel] = reactExports.useState(0);
  const [isTesting, setIsTesting] = reactExports.useState(false);
  const audioContextRef = reactExports.useRef(null);
  const analyserRef = reactExports.useRef(null);
  const mediaStreamRef = reactExports.useRef(null);
  const animationRef = reactExports.useRef(null);
  const apiBaseUrl = getApiBase();
  const token = localStorage.getItem("access_token");
  reactExports.useEffect(() => {
    setLoading(false);
    Promise.all([
      fetchDevices(),
      fetchVoiceEffects(),
      channelId ? fetchVoiceSettings() : Promise.resolve()
    ]).catch((err) => console.warn("[VoiceSettings] Load error:", err));
    return () => stopMicTest();
  }, []);
  const fetchVoiceSettings = /* @__PURE__ */ __name(async () => {
    if (!channelId) return;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3e3);
      const response = await fetch(`${apiBaseUrl}/voice/${channelId}/settings/`, {
        headers: { "Authorization": `Bearer ${token}` },
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      const data = await response.json();
      if (data.settings) {
        setSettings((prev) => ({ ...prev, ...data.settings }));
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error fetching voice settings:", error);
      }
    }
  }, "fetchVoiceSettings");
  const fetchDevices = /* @__PURE__ */ __name(async () => {
    try {
      const mediaDevices = await navigator.mediaDevices.enumerateDevices();
      setDevices({
        input: mediaDevices.filter((d) => d.kind === "audioinput"),
        output: mediaDevices.filter((d) => d.kind === "audiooutput")
      });
    } catch (error) {
      y.error("❌ Cihazlar yüklenemedi");
    }
  }, "fetchDevices");
  const fetchVoiceEffects = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/voice/effects/`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await response.json();
      setAvailableEffects(data.effects || [
        { id: "robot", name: "Robot", icon: "🤖" },
        { id: "deep", name: "Derin Ses", icon: "🎭" },
        { id: "high", name: "Yüksek Ses", icon: "🎵" },
        { id: "echo", name: "Yankı", icon: "🔊" },
        { id: "radio", name: "Radyo", icon: "📻" }
      ]);
    } catch (error) {
      console.error("Error fetching effects:", error);
    }
  }, "fetchVoiceEffects");
  const updateSettings = /* @__PURE__ */ __name(async (newSettings) => {
    setSettings(newSettings);
    if (!channelId) return;
    try {
      await fetch(`${apiBaseUrl}/voice/${channelId}/settings/update/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(newSettings)
      });
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  }, "updateSettings");
  const updateSetting = /* @__PURE__ */ __name((key, value) => {
    const newSettings = { ...settings, [key]: value };
    updateSettings(newSettings);
  }, "updateSetting");
  const applyAudioConstraints = /* @__PURE__ */ __name(async (constraints) => {
    if (!voice.localAudioStream) return;
    const audioTrack = voice.localAudioStream.getAudioTracks()[0];
    if (audioTrack && audioTrack.applyConstraints) {
      try {
        await audioTrack.applyConstraints(constraints);
      } catch (err) {
        console.warn("⚠️ [Settings] Could not apply constraints:", err);
      }
    }
  }, "applyAudioConstraints");
  const startMicTest = /* @__PURE__ */ __name(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: settings.input_device !== "default" ? settings.input_device : void 0,
          echoCancellation: settings.echo_cancellation,
          noiseSuppression: settings.noise_suppression,
          autoGainControl: settings.automatic_gain_control
        }
      });
      mediaStreamRef.current = stream;
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      const updateLevel = /* @__PURE__ */ __name(() => {
        analyserRef.current.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setMicLevel(avg / 255 * 100);
        animationRef.current = requestAnimationFrame(updateLevel);
      }, "updateLevel");
      updateLevel();
      setIsTesting(true);
      y.success("🎙️ Mikrofon testi başladı");
    } catch (error) {
      y.error("❌ Mikrofon erişimi sağlanamadı");
    }
  }, "startMicTest");
  const stopMicTest = /* @__PURE__ */ __name(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (mediaStreamRef.current) mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    if (audioContextRef.current) audioContextRef.current.close();
    setIsTesting(false);
    setMicLevel(0);
  }, "stopMicTest");
  const resetSettings = /* @__PURE__ */ __name(async () => {
    if (!await confirmDialog("Tüm ayarları varsayılana döndürmek istiyor musunuz?")) return;
    const defaults = {
      input_device: "default",
      output_device: "default",
      input_volume: 100,
      output_volume: 100,
      noise_suppression: true,
      noise_suppression_level: "high",
      echo_cancellation: true,
      echo_cancellation_level: "high",
      automatic_gain_control: true,
      agc_level: "moderate",
      noise_gate: true,
      noise_gate_threshold: -50,
      voice_activity: true,
      input_sensitivity: 50,
      push_to_talk: false,
      push_to_talk_key: "Space",
      high_pass_filter: true,
      high_pass_frequency: 80,
      attenuation: 50
    };
    updateSettings({ ...settings, ...defaults });
    y.success("✅ Ayarlar sıfırlandı");
  }, "resetSettings");
  return {
    activeTab,
    setActiveTab,
    settings,
    updateSetting,
    updateSettings,
    devices,
    equalizerPreset,
    setEqualizerPreset,
    voiceEffect,
    setVoiceEffect,
    availableEffects,
    loading,
    micLevel,
    isTesting,
    startMicTest,
    stopMicTest,
    resetSettings,
    applyAudioConstraints,
    voice
  };
}, "useVoiceSettings");
const InputTab = /* @__PURE__ */ __name(({ settings, updateSetting, devices, micLevel, isTesting, startMicTest, stopMicTest }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tab-content", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaMicrophone, { className: "card-icon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Mikrofon Cihazı" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: settings.input_device, onChange: /* @__PURE__ */ __name((e) => updateSetting("input_device", e.target.value), "onChange"), className: "device-select", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "default", children: "🎙️ Varsayılan Mikrofon" }),
      devices.input.map((device) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: device.deviceId, children: device.label || "Bilinmeyen Mikrofon" }, device.deviceId))
    ] })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaSlidersH, { className: "card-icon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Mikrofon Seviyesi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "value-badge", children: [
        settings.input_volume,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "range",
        min: "0",
        max: "200",
        value: settings.input_volume,
        onChange: /* @__PURE__ */ __name((e) => updateSetting("input_volume", parseInt(e.target.value)), "onChange"),
        className: "premium-slider"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "slider-labels", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "0%" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "100%" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "200%" })
    ] })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-card mic-test-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaWaveSquare, { className: "card-icon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Mikrofon Testi" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mic-test-area", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mic-level-container", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mic-level-bar", style: { width: `${micLevel}%` }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mic-level-glow" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mic-level-markers", children: [...Array(10)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `marker ${micLevel > i * 10 ? "active" : ""}` }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mic-level-info", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "level-text", children: [
          Math.round(micLevel),
          "%"
        ] }),
        micLevel > 80 && /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, { className: "warning-icon" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `test-btn ${isTesting ? "testing" : ""}`, onClick: isTesting ? stopMicTest : startMicTest, children: isTesting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaStop, {}),
        " Testi Durdur"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlay, {}),
        " Mikrofonu Test Et"
      ] }) })
    ] })
  ] })
] }), "InputTab");
const OutputTab = /* @__PURE__ */ __name(({ settings, updateSetting, devices }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tab-content", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaHeadphones, { className: "card-icon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Çıkış Cihazı" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: settings.output_device, onChange: /* @__PURE__ */ __name((e) => updateSetting("output_device", e.target.value), "onChange"), className: "device-select", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "default", children: "🔊 Varsayılan Hoparlör" }),
      devices.output.map((device) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: device.deviceId, children: device.label || "Bilinmeyen Hoparlör" }, device.deviceId))
    ] })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaVolumeUp, { className: "card-icon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Çıkış Seviyesi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "value-badge", children: [
        settings.output_volume,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "range",
        min: "0",
        max: "200",
        value: settings.output_volume,
        onChange: /* @__PURE__ */ __name((e) => updateSetting("output_volume", parseInt(e.target.value)), "onChange"),
        className: "premium-slider"
      }
    )
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaMusic, { className: "card-icon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Uygulama Sesi Azaltma" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "value-badge", children: [
        settings.attenuation,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "card-description", children: "Biri konuşurken diğer uygulama seslerini azalt" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "range",
        min: "0",
        max: "100",
        value: settings.attenuation,
        onChange: /* @__PURE__ */ __name((e) => updateSetting("attenuation", parseInt(e.target.value)), "onChange"),
        className: "premium-slider"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "toggle-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Konuşurken Aktif" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "toggle-switch", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "checkbox",
            checked: settings.attenuation_while_speaking,
            onChange: /* @__PURE__ */ __name((e) => updateSetting("attenuation_while_speaking", e.target.checked), "onChange")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "slider" })
      ] })
    ] })
  ] })
] }), "OutputTab");
const NoiseTab = /* @__PURE__ */ __name(({ settings, updateSetting, applyAudioConstraints, voice }) => {
  const { isNoiseSuppressionEnabled, toggleNoiseSuppression, updateNoiseSuppressionLevel, noiseSuppressionLevel } = voice;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tab-content", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-card highlight-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, { className: "card-icon premium" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "🛡️ Gürültü Bastırma" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "toggle-switch", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: isNoiseSuppressionEnabled ?? settings.noise_suppression,
              onChange: /* @__PURE__ */ __name((e) => {
                updateSetting("noise_suppression", e.target.checked);
                if (toggleNoiseSuppression && isNoiseSuppressionEnabled !== e.target.checked) toggleNoiseSuppression();
                y.success(e.target.checked ? "🛡️ Gürültü engelleme açıldı" : "🔇 Gürültü engelleme kapatıldı");
              }, "onChange")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "slider" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "card-description", children: "Fan sesi, klima, klavye sesi gibi arka plan gürültülerini engeller" }),
      (isNoiseSuppressionEnabled ?? settings.noise_suppression) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "noise-levels", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "level-label", children: "Seviye:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "level-buttons", children: [
          { id: "low", label: "Düşük", desc: "Minimal işleme" },
          { id: "medium", label: "Orta", desc: "Dengeli" },
          { id: "high", label: "Yüksek", desc: "Önerilen" },
          { id: "aggressive", label: "Agresif", desc: "Maksimum" }
        ].map((level) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: `level-btn ${(noiseSuppressionLevel || settings.noise_suppression_level) === level.id ? "active" : ""}`,
            onClick: /* @__PURE__ */ __name(() => {
              updateSetting("noise_suppression_level", level.id);
              if (updateNoiseSuppressionLevel) updateNoiseSuppressionLevel(level.id);
              y.info(`🎚️ Gürültü seviyesi: ${level.label}`);
            }, "onClick"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "level-name", children: level.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "level-desc", children: level.desc })
            ]
          },
          level.id
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaWaveSquare, { className: "card-icon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "🔇 Yankı Önleme" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "toggle-switch", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: settings.echo_cancellation,
              onChange: /* @__PURE__ */ __name((e) => {
                updateSetting("echo_cancellation", e.target.checked);
                applyAudioConstraints({ echoCancellation: e.target.checked });
              }, "onChange")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "slider" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "card-description", children: "Hoparlörden gelen sesin mikrofona geri dönmesini engeller" }),
      settings.echo_cancellation && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "level-selector", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: settings.echo_cancellation_level,
          onChange: /* @__PURE__ */ __name((e) => updateSetting("echo_cancellation_level", e.target.value), "onChange"),
          className: "inline-select",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "low", children: "Düşük" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "medium", children: "Orta" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "high", children: "Yüksek (Önerilen)" })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaBolt, { className: "card-icon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "⚡ Gürültü Kapısı (Noise Gate)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "toggle-switch", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: settings.noise_gate,
              onChange: /* @__PURE__ */ __name((e) => updateSetting("noise_gate", e.target.checked), "onChange")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "slider" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "card-description", children: "Belirli ses seviyesinin altındaki sesleri tamamen engeller" }),
      settings.noise_gate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gate-settings", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gate-slider", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
            "Eşik Değeri: ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
              settings.noise_gate_threshold,
              " dB"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "range",
              min: "-80",
              max: "-20",
              value: settings.noise_gate_threshold,
              onChange: /* @__PURE__ */ __name((e) => updateSetting("noise_gate_threshold", parseInt(e.target.value)), "onChange"),
              className: "premium-slider"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "slider-hint", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Hassas (-80)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Sert (-20)" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gate-timing", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "timing-item", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Açılış Süresi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: settings.noise_gate_attack,
                onChange: /* @__PURE__ */ __name((e) => updateSetting("noise_gate_attack", parseInt(e.target.value)), "onChange"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "5", children: "5ms (Hızlı)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "10", children: "10ms (Normal)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "20", children: "20ms (Yumuşak)" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "timing-item", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Kapanış Süresi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: settings.noise_gate_release,
                onChange: /* @__PURE__ */ __name((e) => updateSetting("noise_gate_release", parseInt(e.target.value)), "onChange"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "50", children: "50ms (Hızlı)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "100", children: "100ms (Normal)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "200", children: "200ms (Yumuşak)" })
                ]
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaSlidersH, { className: "card-icon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "🎚️ Otomatik Ses Ayarlama (AGC)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "toggle-switch", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: settings.automatic_gain_control,
              onChange: /* @__PURE__ */ __name((e) => updateSetting("automatic_gain_control", e.target.checked), "onChange")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "slider" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "card-description", children: "Ses seviyenizi otomatik olarak dengeler" }),
      settings.automatic_gain_control && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "agc-options", children: [
        { id: "moderate", label: "Dengeli", desc: "Doğal ses" },
        { id: "aggressive", label: "Agresif", desc: "Sabit seviye" }
      ].map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `radio-card ${settings.agc_level === opt.id ? "selected" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "radio",
            checked: settings.agc_level === opt.id,
            onChange: /* @__PURE__ */ __name(() => updateSetting("agc_level", opt.id), "onChange")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "radio-content", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "radio-label", children: opt.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "radio-desc", children: opt.desc })
        ] })
      ] }, opt.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaWaveSquare, { className: "card-icon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "🔉 Düşük Frekans Filtresi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "toggle-switch", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: settings.high_pass_filter,
              onChange: /* @__PURE__ */ __name((e) => updateSetting("high_pass_filter", e.target.checked), "onChange")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "slider" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "card-description", children: "Düşük frekanslı gürültüleri keser" }),
      settings.high_pass_filter && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "frequency-selector", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Kesim Frekansı:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: settings.high_pass_frequency,
            onChange: /* @__PURE__ */ __name((e) => updateSetting("high_pass_frequency", parseInt(e.target.value)), "onChange"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "50", children: "50 Hz (Minimal)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "80", children: "80 Hz (Önerilen)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "100", children: "100 Hz (Agresif)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "150", children: "150 Hz (Çok Agresif)" })
            ]
          }
        )
      ] })
    ] })
  ] });
}, "NoiseTab");
const VoiceTab = /* @__PURE__ */ __name(({ settings, updateSetting, updateSettings, micLevel, voice }) => {
  const { isPTTMode, togglePTTMode, vadSensitivity, updateVadSensitivity, pttKey, updatePTTKey } = voice;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tab-content", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaMicrophone, { className: "card-icon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "🎙️ Giriş Modu" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-mode-selector", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `mode-card ${!isPTTMode && settings.voice_activity ? "selected" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "radio",
              checked: !isPTTMode,
              onChange: /* @__PURE__ */ __name(() => {
                updateSettings({ ...settings, voice_activity: true, push_to_talk: false });
                if (isPTTMode && togglePTTMode) togglePTTMode();
                y.success("🎤 Ses aktivasyonu açıldı");
              }, "onChange")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mode-content", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaWaveSquare, { className: "mode-icon" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mode-title", children: "Ses Aktivasyonu" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mode-desc", children: "Konuştuğunuzda otomatik aktif olur" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `mode-card ${isPTTMode || settings.push_to_talk ? "selected" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "radio",
              checked: isPTTMode,
              onChange: /* @__PURE__ */ __name(() => {
                updateSettings({ ...settings, voice_activity: false, push_to_talk: true });
                if (!isPTTMode && togglePTTMode) togglePTTMode();
                y.success("⌨️ Bas Konuş modu açıldı");
              }, "onChange")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mode-content", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaKeyboard, { className: "mode-icon" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mode-title", children: "Bas Konuş" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mode-desc", children: "Tuşa basılı tutarak konuşun" })
          ] })
        ] })
      ] })
    ] }),
    !isPTTMode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaSlidersH, { className: "card-icon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Hassasiyet Ayarları" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sensitivity-control", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sensitivity-header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Mikrofon Hassasiyeti" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "value-badge", children: [
            vadSensitivity || settings.input_sensitivity,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "range",
            min: "20",
            max: "80",
            value: vadSensitivity || settings.input_sensitivity,
            onChange: /* @__PURE__ */ __name((e) => {
              const val = parseInt(e.target.value);
              updateSetting("input_sensitivity", val);
              if (updateVadSensitivity) updateVadSensitivity(val);
            }, "onChange"),
            className: "premium-slider sensitivity"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sensitivity-hint", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaMicrophoneSlash, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Düşük = Daha sessiz sesleri algılar" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sensitivity-visualizer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "threshold-line", style: { left: `${((vadSensitivity || settings.input_sensitivity) - 20) / 60 * 100}%` } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "level-indicator", style: { width: `${micLevel}%` } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "visualizer-labels", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Sessiz" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Yüksek" })
        ] })
      ] })
    ] }),
    isPTTMode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaKeyboard, { className: "card-icon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Bas Konuş Ayarları" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ptt-settings", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ptt-key-bind", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Tuş Ataması" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: pttKey || settings.push_to_talk_key,
              onKeyDown: /* @__PURE__ */ __name((e) => {
                e.preventDefault();
                updateSetting("push_to_talk_key", e.code);
                if (updatePTTKey) updatePTTKey(e.code);
                y.info(`⌨️ Tuş: ${e.code}`);
              }, "onKeyDown"),
              placeholder: "Bir tuşa basın...",
              className: "key-input",
              readOnly: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ptt-delay", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Bırakma Gecikmesi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: settings.ptt_release_delay,
              onChange: /* @__PURE__ */ __name((e) => updateSetting("ptt_release_delay", parseInt(e.target.value)), "onChange"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "0", children: "0ms (Anında)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "100", children: "100ms" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "200", children: "200ms (Önerilen)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "300", children: "300ms" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "500", children: "500ms" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hint", children: "Tuşu bıraktıktan sonra mikrofon açık kalma süresi" })
        ] })
      ] })
    ] })
  ] });
}, "VoiceTab");
const EffectsTab = /* @__PURE__ */ __name(({ equalizerPreset, setEqualizerPreset, voiceEffect, setVoiceEffect, availableEffects }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tab-content", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaMusic, { className: "card-icon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "🎚️ Equalizer" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "equalizer-presets", children: [
      { id: "default", label: "Varsayılan", icon: "🎵" },
      { id: "bass_boost", label: "Bass Boost", icon: "🔊" },
      { id: "treble_boost", label: "Treble Boost", icon: "🎼" },
      { id: "voice", label: "Ses İyileştirme", icon: "🗣️" },
      { id: "crisp", label: "Kristal Netlik", icon: "✨" }
    ].map((preset) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        className: `eq-preset-btn ${equalizerPreset === preset.id ? "active" : ""}`,
        onClick: /* @__PURE__ */ __name(() => setEqualizerPreset(preset.id), "onClick"),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "preset-icon", children: preset.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "preset-label", children: preset.label })
        ]
      },
      preset.id
    )) })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaMagic, { className: "card-icon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "🎭 Ses Efektleri" }),
      voiceEffect && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "remove-effect-btn", onClick: /* @__PURE__ */ __name(() => setVoiceEffect(null), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}),
        " Kaldır"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "effects-grid", children: availableEffects.map((effect) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        className: `effect-btn ${voiceEffect === effect.id ? "active" : ""}`,
        onClick: /* @__PURE__ */ __name(() => setVoiceEffect(effect.id), "onClick"),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "effect-icon", children: effect.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "effect-name", children: effect.name })
        ]
      },
      effect.id
    )) })
  ] })
] }), "EffectsTab");
const AdvancedTab = /* @__PURE__ */ __name(({ settings, updateSetting, resetSettings }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tab-content", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaCog, { className: "card-icon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "🔧 Ses Kalitesi" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "advanced-options", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "option-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Bit Hızı (Bitrate)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: settings.audio_bitrate,
            onChange: /* @__PURE__ */ __name((e) => updateSetting("audio_bitrate", parseInt(e.target.value)), "onChange"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "32000", children: "32 kbps (Düşük)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "64000", children: "64 kbps (Normal)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "96000", children: "96 kbps (Yüksek)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "128000", children: "128 kbps (En İyi)" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "option-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Örnekleme Hızı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: settings.sample_rate,
            onChange: /* @__PURE__ */ __name((e) => updateSetting("sample_rate", parseInt(e.target.value)), "onChange"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "24000", children: "24 kHz" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "48000", children: "48 kHz (Önerilen)" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "toggle-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Stereo Ses" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "option-desc", children: "Müzik paylaşımı için" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "toggle-switch", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: settings.stereo_audio,
              onChange: /* @__PURE__ */ __name((e) => updateSetting("stereo_audio", e.target.checked), "onChange")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "slider" })
        ] })
      ] })
    ] })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-card danger-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaSync, { className: "card-icon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "🔄 Ayarları Sıfırla" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "card-description", children: "Tüm ses ayarlarını varsayılan değerlerine döndürür" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "reset-btn", onClick: resetSettings, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaSync, {}),
      " Varsayılana Dön"
    ] })
  ] })
] }), "AdvancedTab");
const TABS = [
  { id: "input", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaMicrophone, {}), label: "Giriş" },
  { id: "output", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaHeadphones, {}), label: "Çıkış" },
  { id: "noise", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, {}), label: "Gürültü Engelleme" },
  { id: "voice", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaWaveSquare, {}), label: "Ses Algılama" },
  { id: "effects", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaMagic, {}), label: "Efektler" },
  { id: "advanced", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCog, {}), label: "Gelişmiş" }
];
const VoiceSettingsPanel = /* @__PURE__ */ __name(({ onClose, channelId }) => {
  const api = useVoiceSettings({ channelId });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "voice-settings-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "voice-settings-panel premium", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "voice-settings-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "🎙️ Ses Ayarları" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "settings-tabs", children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        className: `tab-btn ${api.activeTab === tab.id ? "active" : ""}`,
        onClick: /* @__PURE__ */ __name(() => api.setActiveTab(tab.id), "onClick"),
        children: [
          tab.icon,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tab.label })
        ]
      },
      tab.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "voice-settings-content", children: [
      api.activeTab === "input" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        InputTab,
        {
          settings: api.settings,
          updateSetting: api.updateSetting,
          devices: api.devices,
          micLevel: api.micLevel,
          isTesting: api.isTesting,
          startMicTest: api.startMicTest,
          stopMicTest: api.stopMicTest
        }
      ),
      api.activeTab === "output" && /* @__PURE__ */ jsxRuntimeExports.jsx(OutputTab, { settings: api.settings, updateSetting: api.updateSetting, devices: api.devices }),
      api.activeTab === "noise" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        NoiseTab,
        {
          settings: api.settings,
          updateSetting: api.updateSetting,
          applyAudioConstraints: api.applyAudioConstraints,
          voice: api.voice
        }
      ),
      api.activeTab === "voice" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        VoiceTab,
        {
          settings: api.settings,
          updateSetting: api.updateSetting,
          updateSettings: api.updateSettings,
          micLevel: api.micLevel,
          voice: api.voice
        }
      ),
      api.activeTab === "effects" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        EffectsTab,
        {
          equalizerPreset: api.equalizerPreset,
          setEqualizerPreset: api.setEqualizerPreset,
          voiceEffect: api.voiceEffect,
          setVoiceEffect: api.setVoiceEffect,
          availableEffects: api.availableEffects
        }
      ),
      api.activeTab === "advanced" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        AdvancedTab,
        {
          settings: api.settings,
          updateSetting: api.updateSetting,
          resetSettings: api.resetSettings
        }
      )
    ] })
  ] }) });
}, "VoiceSettingsPanel");
export {
  VoiceSettingsPanel as default
};
