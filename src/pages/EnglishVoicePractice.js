// frontend/src/EnglishVoicePractice.js

import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaMicrophone, FaArrowLeft, FaRobot, FaUser, FaStop, FaLightbulb } from 'react-icons/fa';
import { useAuth } from '../AuthContext';
import toast from '../utils/toast';

// -- extracted inline style constants --

const STARTER_PROMPTS = [
    'Hello! How are you today?',
    'Can you tell me about your hobbies?',
    "What's the weather like?",
    "I'd like to improve my English.",
    "Let's talk about movies!",
];

const EnglishVoicePractice = ({ apiBaseUrl }) => {
    const { t } = useTranslation();
    const [isRecording, setIsRecording] = useState(false);
    const [messages, setMessages] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [waveData, setWaveData] = useState(Array(32).fill(2));

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const messagesEndRef = useRef(null);
    const analyserRef = useRef(null);
    const animFrameRef = useRef(null);
    const streamRef = useRef(null);

    const { token } = useAuth();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, processing]);

    const drawWave = useCallback(() => {
        if (!analyserRef.current) return;
        const data = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(data);
        // sample 32 bars
        const bars = 32;
        const step = Math.floor(data.length / bars);
        const samples = Array.from({ length: bars }, (_, i) =>
            Math.max(3, Math.round((data[i * step] / 255) * 48))
        );
        setWaveData(samples);
        animFrameRef.current = requestAnimationFrame(drawWave);
    }, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            // Web Audio waveform
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const source = audioCtx.createMediaStreamSource(stream);
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 256;
            source.connect(analyser);
            analyserRef.current = analyser;
            animFrameRef.current = requestAnimationFrame(drawWave);

            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];
            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) audioChunksRef.current.push(e.data);
            };
            mediaRecorderRef.current.onstop = handleStop;
            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch {
            toast.error(t('voicePractice.micRequired', 'Microphone permission required!'));
        }
    };

    const stopRecording = () => {
        cancelAnimationFrame(animFrameRef.current);
        setWaveData(Array(32).fill(2));
        analyserRef.current = null;
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((t) => t.stop());
            streamRef.current = null;
        }
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleStop = async () => {
        setProcessing(true);
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const formData = new FormData();
        formData.append('audio', audioBlob, 'voice.webm');
        try {
            const res = await fetch(`${apiBaseUrl}/eng-learn/voice-chat/`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            if (res.ok) {
                const data = await res.json();
                setMessages((prev) => [
                    ...prev,
                    { sender: 'user', text: data.user_text },
                    { sender: 'ai', text: data.ai_text },
                ]);
                const audio = new Audio(`data:audio/mp3;base64,${data.audio_base64}`);
                audio.play();
            } else {
                toast.error(
                    t('voicePractice.errorOccurred', 'Could not understand or an error occurred.')
                );
            }
        } catch {
            toast.error(t('voicePractice.connectionError', 'Connection error.'));
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div aria-label={t('aria.englishVoicePractice', 'English Voice Practice')} style={S.container}>
            <style>{`
                @keyframes pulse { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(1.4);opacity:.15} }
                @keyframes typingDot { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
            `}</style>

            <div style={S.header}>
                <Link to="/eng-learn" style={S.backBtn}>
                    <FaArrowLeft /> {t('voicePractice.back', 'Geri')}
                </Link>
                <h2>{t('voicePractice.title', 'AI ile Konuş')}</h2>
                <div />
            </div>

            <div style={S.chatArea}>
                {messages.length === 0 && !processing && (
                    <div style={S.emptyState}>
                        <div>??</div>
                        <h3>{t('voicePractice.pageTitle', 'English Voice Practice')}</h3>
                        <p>
                            {t(
                                'voicePractice.instruction',
                                'Hold the microphone button and start speaking.'
                            )}
                            <br />
                            {t('voicePractice.orChoose', 'Or choose one of the topics below:')}
                        </p>
                        <div>
                            {STARTER_PROMPTS.map((p, i) => (
                                <div key={`item-${i}`} style={S.promptChip}>
                                    <FaLightbulb size={10} />
                                    {p}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {messages.map((msg, i) => (
                    <div
                        key={`item-${i}`}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                            gap: 3,
                        }}
                    >
                        <div>
                            {msg.sender === 'user' ? <FaUser size={10} /> : <FaRobot size={10} />}
                            {msg.sender === 'user'
                                ? t('voicePractice.you', 'Sen')
                                : t('voicePractice.aiTeacher', 'AI Teacher')}
                        </div>
                        <div
                            style={{
                                ...S.bubble,
                                background:
                                    msg.sender === 'user'
                                        ? 'linear-gradient(135deg, #5865f2 0%, #7b63f5 100%)'
                                        : 'linear-gradient(135deg, #16181d 0%, #1a1d24 100%)',
                                color: 'white',
                                borderBottomRightRadius: msg.sender === 'user' ? 5 : 18,
                                borderBottomLeftRadius: msg.sender === 'ai' ? 5 : 18,
                                border:
                                    msg.sender === 'ai'
                                        ? '1px solid rgba(88,101,242,0.18)'
                                        : 'none',
                                boxShadow:
                                    msg.sender === 'user'
                                        ? '0 4px 16px rgba(88,101,242,0.3)'
                                        : '0 3px 12px rgba(0,0,0,0.4)',
                            }}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}

                {processing && (
                    <div>
                        <FaRobot size={12} />
                        {[0, 1, 2].map((i) => (
                            <span
                                key={`item-${i}`}
                                style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    background: '#5865f2',
                                    display: 'inline-block',
                                    animation: `typingDot 1.2s ${i * 0.2}s ease infinite`,
                                }}
                            />
                        ))}
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Waveform + mic */}
            <div style={S.controls}>
                {isRecording && (
                    <div style={S.waveWrapper}>
                        {waveData.map((h, i) => (
                            <div
                                key={`item-${i}`}
                                style={{
                                    ...S.waveBar,
                                    height: h,
                                    background: `hsl(${230 + i * 2}, 80%, 60%)`,
                                }}
                            />
                        ))}
                    </div>
                )}

                <div>
                    {isRecording &&
                        [1, 2].map((r) => (
                            <span
                                key={r}
                                style={{
                                    position: 'absolute',
                                    borderRadius: '50%',
                                    border: '2px solid rgba(242,63,66,0.4)',
                                    width: 80 + r * 30,
                                    height: 80 + r * 30,
                                    animation: `pulse ${0.8 + r * 0.3}s ease-in-out infinite`,
                                }}
                            />
                        ))}
                    <button
                        onMouseDown={startRecording}
                        onMouseUp={stopRecording}
                        onTouchStart={startRecording}
                        onTouchEnd={stopRecording}
                        style={{
                            ...S.micButton,
                            background: isRecording
                                ? 'linear-gradient(135deg, #f23f42, #d4313a)'
                                : 'linear-gradient(135deg, #5865f2, #7b63f5)',
                            boxShadow: isRecording
                                ? '0 0 0 0 rgba(242,63,66,0), 0 8px 28px rgba(242,63,66,0.5)'
                                : '0 6px 28px rgba(88,101,242,0.45), 0 3px 0 #3b45c7',
                        }}
                    >
                        {isRecording ? <FaStop size={22} /> : <FaMicrophone size={28} />}
                    </button>
                </div>
                <p>
                    {isRecording
                        ? t('voicePractice.listening', 'Dinliyor... (Göndermek için bırak)')
                        : t('voicePractice.holdToSpeak', 'Konuşmak için basılı tut')}
                </p>
            </div>
        </div>
    );
};

const S = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: 'linear-gradient(160deg, #0b0d10 0%, #0d0f15 50%, #0b0d10 100%)',
        color: 'white',
        boxSizing: 'border-box',
        fontFamily: 'Poppins, sans-serif',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(11,13,16,0.85)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        zIndex: 10,
        position: 'sticky',
        top: 0,
    },
    backBtn: {
        color: '#949ba4',
        fontSize: '0.9em',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        fontWeight: 700,
        backgroundColor: 'rgba(255,255,255,0.05)',
        padding: '7px 13px',
        borderRadius: 10,
        border: '1px solid rgba(255,255,255,0.08)',
    },
    chatArea: {
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        padding: '18px 20px 22px',
    },
    emptyState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        textAlign: 'center',
        paddingTop: 32,
    },
    promptChip: {
        background: 'rgba(88,101,242,0.08)',
        border: '1px solid rgba(88,101,242,0.25)',
        borderRadius: 20,
        padding: '7px 14px',
        fontSize: '0.8em',
        color: '#9ba5ff',
        display: 'flex',
        alignItems: 'center',
        cursor: 'default',
        transition: 'background 0.15s',
    },
    bubble: {
        maxWidth: '84%',
        padding: '13px 17px',
        borderRadius: 18,
        fontSize: '0.95em',
        lineHeight: 1.65,
        boxShadow: '0 3px 12px rgba(0,0,0,0.35)',
    },
    controls: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '18px 20px 28px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(11,13,16,0.7)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
    },
    waveWrapper: { display: 'flex', alignItems: 'flex-end', gap: 3, height: 56, marginBottom: 16 },
    waveBar: { width: 5, borderRadius: 4, transition: 'height 0.07s ease', minHeight: 3 },
    micButton: {
        width: 80,
        height: 80,
        borderRadius: '50%',
        border: 'none',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'transform 0.12s, box-shadow 0.2s',
        position: 'relative',
        zIndex: 1,
    },
};

EnglishVoicePractice.propTypes = {
    apiBaseUrl: PropTypes.string,
};
export default EnglishVoicePractice;
