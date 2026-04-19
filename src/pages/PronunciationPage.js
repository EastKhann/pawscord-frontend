// frontend/src/PronunciationPage.js

import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaMicrophone, FaArrowLeft, FaVolumeUp, FaForward, FaFire, FaStar } from 'react-icons/fa';
import { useAuth } from '../AuthContext';
import toast from '../utils/toast';
import { pronunciationList } from '../data/pronunciationList';

import { useTranslation } from 'react-i18next';

// -- extracted inline style constants --

const DIFF_COLOR = { Kolay: '#23a559', Orta: '#f0b232', Zor: '#f23f42', Efsane: '#eb459e' };

// Animated score arc (SVG half-circle)
const ScoreArc = ({ score }) => {
    const { t } = useTranslation();
    const r = 36,
        circ = Math.PI * r;
    const pct = Math.min(score, 100) / 100;
    const color = score >= 80 ? '#23a559' : score >= 50 ? '#f0b232' : '#f23f42';
    return (
        <div aria-label="score arc">
            <svg width="90" height="52" viewBox="0 0 90 52">
                <path
                    d="M 9 46 A 36 36 0 0 1 81 46"
                    fill="none"
                    stroke="#2e3035"
                    strokeWidth="8"
                    strokeLinecap="round"
                />
                <path
                    d="M 9 46 A 36 36 0 0 1 81 46"
                    fill="none"
                    stroke={color}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circ}
                    strokeDashoffset={circ * (1 - pct)}
                />
            </svg>
            <span
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontWeight: 800,
                    fontSize: '1.1em',
                    color,
                }}
            >
                {score}
            </span>
        </div>
    );
};

const PronunciationPage = ({ apiBaseUrl }) => {
    const { token } = useAuth();
    const { t } = useTranslation();

    const [currentCard, setCurrentCard] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState('idle');
    const [feedbackMsg, setFeedbackMsg] = useState('');
    const [score, setScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [waveData, setWaveData] = useState(Array(24).fill(2));

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const analyserRef = useRef(null);
    const animFrameRef = useRef(null);
    const streamRef = useRef(null);

    useEffect(() => {
        pickRandomCard();
    }, []);

    const pickRandomCard = () => {
        const idx = Math.floor(Math.random() * pronunciationList.length);
        setCurrentCard(pronunciationList[idx]);
        setStatus('idle');
        setFeedbackMsg('');
        setScore(0);
    };

    const drawWave = useCallback(() => {
        if (!analyserRef.current) return;
        const data = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(data);
        const bars = 24;
        const step = Math.floor(data.length / bars);
        setWaveData(
            Array.from({ length: bars }, (_, i) =>
                Math.max(3, Math.round((data[i * step] / 255) * 44))
            )
        );
        animFrameRef.current = requestAnimationFrame(drawWave);
    }, []);

    const stopStream = () => {
        cancelAnimationFrame(animFrameRef.current);
        analyserRef.current = null;
        setWaveData(Array(24).fill(2));
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((t) => t.stop());
            streamRef.current = null;
        }
    };

    const playPronunciation = async () => {
        if (!currentCard) return;
        try {
            const res = await fetch(`${apiBaseUrl}/eng-learn/speak-text/`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: currentCard.text }),
            });
            if (res.ok) {
                const data = await res.json();
                new Audio(`data:audio/mp3;base64,${data.audio_base64}`).play();
            }
        } catch {
            /* silent */
        }
    };

    const startRecording = async () => {
        setFeedbackMsg('');
        setStatus('recording');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const source = audioCtx.createMediaStreamSource(stream);
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 128;
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
            toast.error(t('pronunciation.micRequired', 'Microphone permission required!'));
            setStatus('idle');
        }
    };

    const stopRecording = () => {
        stopStream();
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
        formData.append('target_text', currentCard.text);
        try {
            const res = await fetch(`${apiBaseUrl}/eng-learn/check-pronunciation/`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const data = await res.json();
            const points = data.is_correct ? 100 : 40;
            setScore(points);
            setTotalScore((s) => s + (data.is_correct ? 1 : 0));
            if (data.is_correct) {
                setStatus('success');
                setFeedbackMsg(`M�kemmel! \uD83C\uDF89 "${data.spoken_text}"`);
                setStreak((s) => s + 1);
                try {
                    const cur = parseInt(localStorage.getItem('eng_xp') || '0');
                    localStorage.setItem('eng_xp', cur + 8);
                } catch {
                    /* ignore */
                }
            } else {
                setStatus('error');
                setFeedbackMsg(`Algilanan: "${data.spoken_text || '???'}" � Try again!`);
                setStreak(0);
            }
        } catch {
            setFeedbackMsg(t('pronunciation.serverError', 'Server error.'));
            setStatus('error');
        } finally {
            setProcessing(false);
        }
    };

    if (!currentCard) return <div style={S.container}>{t('common.loading')}</div>;

    const diffColor = DIFF_COLOR[currentCard.difficulty] || '#949ba4';
    const cardGlow =
        status === 'success'
            ? '0 0 40px rgba(35,165,89,0.35)'
            : status === 'error'
              ? '0 0 40px rgba(242,63,66,0.3)'
              : '0 8px 32px rgba(0,0,0,0.5)';
    const cardBorder =
        status === 'success' ? '#23a559' : status === 'error' ? '#f23f42' : '#2e3035';

    return (
        <div style={S.container}>
            <style>{`
                @keyframes pulse { 0%,100%{transform:scale(1);opacity:.5} 50%{transform:scale(1.35);opacity:.1} }
                @keyframes successPop { 0%{transform:scale(0.8);opacity:0} 60%{transform:scale(1.06)} 100%{transform:scale(1);opacity:1} }
            `}</style>

            <div style={S.header}>
                <Link to="/eng-learn" style={S.backBtn}>
                    <FaArrowLeft /> {t('pronunciation.exit', 'Çıkış')}
                </Link>
                <div>
                    {streak >= 2 && (
                        <div>
                            <FaFire color="#f06320" size={13} />
                            <span>
                                {streak} {t('pronunciation.streak', 'Seri')}
                            </span>
                        </div>
                    )}
                    <div>
                        <FaStar color="#f0b232" size={12} />
                        <span>
                            {totalScore} {t('pronunciation.correct', 'Doğru')}
                        </span>
                    </div>
                </div>
            </div>

            <div style={S.mainContent}>
                <div
                    style={{
                        ...S.card,
                        boxShadow: cardGlow,
                        borderColor: cardBorder,
                        animation: status === 'success' ? 'successPop 0.5s ease' : 'none',
                    }}
                >
                    <div
                        style={{
                            ...S.diffBadge,
                            background: diffColor + '22',
                            color: diffColor,
                            border: `1px solid ${diffColor}66`,
                        }}
                    >
                        {currentCard.difficulty}
                    </div>

                    <h1 style={S.word}>{currentCard.text}</h1>

                    {currentCard.ipa && <div>/{currentCard.ipa}/</div>}

                    {status !== 'idle' && status !== 'recording' && (
                        <div>
                            <ScoreArc score={score} />
                            <span>{t('pronunciation.score', 'Skor')}</span>
                        </div>
                    )}

                    {isRecording && (
                        <div style={S.waveWrapper}>
                            {waveData.map((h, i) => (
                                <div
                                    key={`item-${i}`}
                                    style={{
                                        ...S.waveBar,
                                        height: h,
                                        background: `hsl(${0 + i * 6}, 80%, 58%)`,
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    <div
                        style={{
                            minHeight: 28,
                            fontSize: '0.9em',
                            fontWeight: 600,
                            textAlign: 'center',
                            marginBottom: 8,
                            padding: '0 10px',
                            color:
                                status === 'success'
                                    ? '#23a559'
                                    : status === 'error'
                                      ? '#f23f42'
                                      : '#949ba4',
                            transition: 'color 0.3s',
                        }}
                    >
                        {processing
                            ? t('pronunciation.analyzing', '\uD83D\uDD0D Analiz ediliyor...')
                            : feedbackMsg ||
                              (status === 'recording'
                                  ? t('pronunciation.listening', '\uD83D\uDD34 Listening...')
                                  : t(
                                        'pronunciation.holdMic',
                                        'Mikrofona bas\u0131l\u0131 tut ve oku'
                                    ))}
                    </div>

                    <div style={S.controls}>
                        <button
                            onClick={playPronunciation}
                            style={S.listnBtn}
                            title={t('pronunciation.listenCorrect', 'Doğru telaffuzu dinle')}
                        >
                            <FaVolumeUp size={20} />
                            <span>{t('pronunciation.listen', 'Dinle')}</span>
                        </button>

                        <div>
                            {isRecording &&
                                [1, 2].map((r) => (
                                    <span
                                        key={r}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%,-50%)',
                                            width: 76 + r * 22,
                                            height: 76 + r * 22,
                                            borderRadius: '50%',
                                            border: '2px solid rgba(242,63,66,0.4)',
                                            animation: `pulse ${0.7 + r * 0.3}s ease-in-out infinite`,
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
                                        : status === 'success'
                                          ? 'linear-gradient(135deg, #23a559, #1a9e50)'
                                          : 'linear-gradient(135deg, #5865f2, #7b6cf6)',
                                    boxShadow: isRecording
                                        ? '0 0 32px rgba(242,63,66,0.55), 0 4px 0 #a41f22'
                                        : status === 'success'
                                          ? '0 0 28px rgba(35,165,89,0.5), 0 4px 0 #156936'
                                          : '0 0 24px rgba(88,101,242,0.45), 0 4px 0 #3b45c7',
                                    position: 'relative',
                                    zIndex: 1,
                                }}
                            >
                                <FaMicrophone size={30} />
                            </button>
                        </div>
                    </div>
                </div>

                <button onClick={pickRandomCard} style={S.nextBtn}>
                    {status === 'success'
                        ? t('pronunciation.nextWord', 'Sonraki Kelime \u27A1\uFE0F')
                        : t('pronunciation.skip', 'Bunu Ge\u00e7 \u23ED\uFE0F')}
                    <FaForward size={13} />
                </button>
            </div>
        </div>
    );
};

const S = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        background: 'linear-gradient(160deg, #0b0d10 0%, #0d0f18 50%, #090c10 100%)',
        color: 'white',
        fontFamily: 'Poppins, sans-serif',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        maxWidth: 560,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 16px',
        boxSizing: 'border-box',
    },
    backBtn: {
        color: '#949ba4',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        fontWeight: 700,
        fontSize: '0.88em',
        backgroundColor: 'rgba(255,255,255,0.05)',
        padding: '7px 13px',
        borderRadius: 10,
        border: '1px solid rgba(255,255,255,0.08)',
    },
    mainContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: 520,
        padding: '0 16px',
        boxSizing: 'border-box',
        gap: 22,
    },
    card: {
        background: 'linear-gradient(160deg, #0f1117 0%, #111520 60%, #0d0f14 100%)',
        border: '2px solid',
        borderRadius: 28,
        width: '100%',
        padding: '34px 28px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        gap: 10,
        boxSizing: 'border-box',
        backdropFilter: 'blur(6px)',
    },
    diffBadge: {
        borderRadius: 20,
        padding: '4px 16px',
        fontSize: '0.78em',
        fontWeight: 700,
        letterSpacing: '0.8px',
    },
    word: {
        fontSize: '2.6em',
        fontWeight: 900,
        margin: '6px 0',
        letterSpacing: 1,
        lineHeight: 1.15,
        background: 'linear-gradient(135deg,#fff 40%,#b8beee)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    waveWrapper: { display: 'flex', alignItems: 'flex-end', gap: 3, height: 52, margin: '6px 0' },
    waveBar: { width: 6, borderRadius: 4, transition: 'height 0.07s ease', minHeight: 3 },
    controls: { display: 'flex', alignItems: 'center', gap: 30, marginTop: 10 },
    listnBtn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 14,
        padding: '12px 18px',
        color: '#dbdee1',
        cursor: 'pointer',
        fontFamily: 'inherit',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
    },
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
        transition: 'all 0.15s',
    },
    nextBtn: {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        color: '#dbdee1',
        fontSize: '0.95em',
        fontWeight: 700,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '11px 24px',
        borderRadius: 14,
        fontFamily: 'inherit',
        transition: 'background 0.18s',
        boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
    },
};

PronunciationPage.propTypes = {
    score: PropTypes.number,
};
export default React.memo(PronunciationPage);
