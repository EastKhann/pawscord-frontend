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
const VoiceMessage = /* @__PURE__ */ __name(({ onSend, onCancel }) => {
  const [isRecording, setIsRecording] = reactExports.useState(false);
  const [isLocked, setIsLocked] = reactExports.useState(false);
  const [recordingTime, setRecordingTime] = reactExports.useState(0);
  const [audioBlob, setAudioBlob] = reactExports.useState(null);
  const [mediaRecorder, setMediaRecorder] = reactExports.useState(null);
  const [waveformData, setWaveformData] = reactExports.useState([]);
  const [startY, setStartY] = reactExports.useState(0);
  const [currentY, setCurrentY] = reactExports.useState(0);
  const [swipeDistance, setSwipeDistance] = reactExports.useState(0);
  const recordButtonRef = reactExports.useRef(null);
  const SWIPE_LOCK_THRESHOLD = -80;
  reactExports.useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1e3);
    }
    return () => clearInterval(interval);
  }, [isRecording]);
  const startRecording = /* @__PURE__ */ __name(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];
      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
        updateWaveform();
      };
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
      };
      recorder.start(100);
      setMediaRecorder(recorder);
      setIsRecording(true);
      setIsLocked(false);
      setRecordingTime(0);
    } catch (error) {
      console.error("Microphone access error:", error);
      toast.error("❌ Mikrofon erişimi reddedildi");
    }
  }, "startRecording");
  const stopRecording = /* @__PURE__ */ __name(() => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      setIsLocked(false);
    }
  }, "stopRecording");
  const cancelRecording = /* @__PURE__ */ __name(() => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
    }
    setIsRecording(false);
    setIsLocked(false);
    setAudioBlob(null);
    setRecordingTime(0);
    setWaveformData([]);
    setSwipeDistance(0);
    onCancel?.();
  }, "cancelRecording");
  const handleRecordStart = /* @__PURE__ */ __name((e) => {
    e.preventDefault();
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setStartY(clientY);
    setCurrentY(clientY);
    setSwipeDistance(0);
    startRecording();
  }, "handleRecordStart");
  const handleRecordMove = /* @__PURE__ */ __name((e) => {
    if (!isRecording || isLocked) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setCurrentY(clientY);
    const distance = clientY - startY;
    setSwipeDistance(distance);
    if (distance < SWIPE_LOCK_THRESHOLD) {
      setIsLocked(true);
      toast.success("🔒 Kayıt kilitlendi");
    }
  }, "handleRecordMove");
  const handleRecordEnd = /* @__PURE__ */ __name((e) => {
    e.preventDefault();
    if (!isLocked && isRecording) {
      cancelRecording();
      toast.info("Kayıt iptal edildi");
    }
    setSwipeDistance(0);
  }, "handleRecordEnd");
  const sendVoiceMessage = /* @__PURE__ */ __name(() => {
    if (audioBlob) {
      onSend?.(audioBlob, recordingTime);
      setAudioBlob(null);
      setRecordingTime(0);
      setWaveformData([]);
    }
  }, "sendVoiceMessage");
  const updateWaveform = /* @__PURE__ */ __name(() => {
    setWaveformData((prev) => {
      const newData = [...prev, Math.random() * 100];
      return newData.slice(-50);
    });
  }, "updateWaveform");
  const formatTime = /* @__PURE__ */ __name((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, "formatTime");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "voice-message-container", children: [
    !isRecording && !audioBlob && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        ref: recordButtonRef,
        className: "btn-start-recording",
        onMouseDown: handleRecordStart,
        onMouseMove: handleRecordMove,
        onMouseUp: handleRecordEnd,
        onMouseLeave: handleRecordEnd,
        onTouchStart: handleRecordStart,
        onTouchMove: handleRecordMove,
        onTouchEnd: handleRecordEnd,
        style: {
          cursor: "pointer",
          userSelect: "none",
          WebkitUserSelect: "none",
          touchAction: "none"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mic-icon", children: "🎤" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Basılı Tut" })
        ]
      }
    ),
    isRecording && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "recording-ui", children: [
      !isLocked && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "swipe-indicator",
          style: {
            opacity: Math.max(0, Math.min(1, -swipeDistance / 80)),
            transform: `translateY(${Math.max(swipeDistance, -100)}px)`
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lock-icon", children: "🔒" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "swipe-text", children: "Yukarı kaydır" })
          ]
        }
      ),
      isLocked && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "locked-indicator", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "lock-icon", children: "🔒" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Kilitli" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "waveform", children: waveformData.map((value, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "waveform-bar",
          style: { height: `${value}%` }
        },
        index
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "recording-info", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "recording-indicator", children: "🔴" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "recording-time", children: formatTime(recordingTime) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "recording-controls", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "btn-cancel",
            onClick: cancelRecording,
            children: "İptal"
          }
        ),
        isLocked && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "btn-stop",
            onClick: stopRecording,
            children: "Durdur"
          }
        )
      ] })
    ] }),
    audioBlob && !isRecording && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "preview-ui", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("audio", { controls: true, src: URL.createObjectURL(audioBlob) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "preview-info", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "Sesli mesaj • ",
        formatTime(recordingTime)
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "preview-controls", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "btn-cancel",
            onClick: cancelRecording,
            children: "Sil"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "btn-send",
            onClick: sendVoiceMessage,
            children: "Gönder 📤"
          }
        )
      ] })
    ] })
  ] });
}, "VoiceMessage");
export {
  VoiceMessage as default
};
