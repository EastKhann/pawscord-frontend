import { getToken } from '../utils/tokenStorage';
// frontend/src/SrsReviewPage.js
// Spaced Repetition Review — uses /srs/due/, /srs/review/, /srs/add/ endpoints

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
    FaArrowLeft,
    FaRedo,
    FaBolt,
    FaCheck,
    FaTimes,
    FaLayerGroup,
    FaStar,
    FaFire,
    FaCheckCircle,
} from 'react-icons/fa';
import { API_BASE_URL } from '../utils/constants';

import PropTypes from 'prop-types';
import logger from '../utils/logger';

// -- dynamic style helpers (pass 2) --

// -- extracted inline style constants --

const _st1034 = {
    background: 'linear-gradient(160deg,#0f1117 0%,#13151e 60%,#0d0f14 100%)',
    border: '1px solid rgba(231,121,193,0.12)',
    borderRadius: 28,
    padding: '48px 36px',
    textAlign: 'center',
    maxWidth: 440,
    width: '100%',
    boxShadow: '0 16px 56px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
};
const _st1035 = {
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 20,
    boxShadow:
        '0 16px 56px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 1px rgba(231,121,193,0.1)',
};

const SRS_CSS_ID = 'srs-review-css';
const SRS_CSS = `
@keyframes srs-slideIn { 0%{opacity:0;transform:translateY(16px) scale(0.97)} 100%{opacity:1;transform:translateY(0) scale(1)} }
@keyframes srs-correct { 0%{background:rgba(35,165,89,0.3)} 100%{background:transparent} }
@keyframes srs-wrong { 0%{background:rgba(242,63,66,0.3)} 100%{background:transparent} }
@keyframes srs-confetti { 0%{opacity:1;transform:translateY(0) scale(1)} 100%{opacity:0;transform:translateY(-60px) scale(0.5)} }
@keyframes srs-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
.srs-quality-btn:hover { transform: scale(1.08) !important; filter: brightness(1.15) !important; }
.srs-quality-btn:active { transform: scale(0.96) !important; }
`;

function injectCSS(id, css) {
    if (typeof document === 'undefined' || document.getElementById(id)) return;
    const el = document.createElement('style');
    el.id = id;
    el.textContent = css;
    document.head.appendChild(el);
}

const fetchAuth = async (url, options = {}) => {
    const token = getToken();
    const headers = { ...options.headers };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    if (!headers['Content-Type']) headers['Content-Type'] = 'application/json';
    return fetch(url, { ...options, headers, credentials: 'include' });
};

const QUALITY_LABELS_BASE = [
    {
        q: 0,
        key: 'srs.dontKnow',
        fallback: t('srs.dontKnow','I have no idea'),
        emoji: '😞',
        color: '#f23f42',
        bg: 'rgba(242,63,66,0.12)',
    },
    {
        q: 1,
        key: 'srs.forgot',
        fallback: 'Unuttum',
        emoji: '😕',
        color: '#e07015',
        bg: 'rgba(224,112,21,0.12)',
    },
    {
        q: 2,
        key: 'srs.hard',
        fallback: 'Zor',
        emoji: '🤔',
        color: '#f0b232',
        bg: 'rgba(240,178,50,0.12)',
    },
    {
        q: 3,
        key: 'srs.remembered',
        fallback: t('srs.remembered','Remembered'),
        emoji: '🙂',
        color: '#5865f2',
        bg: 'rgba(88,101,242,0.12)',
    },
    {
        q: 4,
        key: 'srs.easy',
        fallback: 'Kolay',
        emoji: '😊',
        color: '#23a559',
        bg: 'rgba(35,165,89,0.12)',
    },
    {
        q: 5,
        key: 'srs.veryEasy',
        fallback: t('srs.tooEasy','Too easy!'),
        emoji: '🔥',
        color: '#e779c1',
        bg: 'rgba(231,121,193,0.12)',
    },
];

function SrsReviewPage() {
    const { t } = useTranslation();
    const [dueWords, setDueWords] = useState([]);
    const QUALITY_LABELS = QUALITY_LABELS_BASE.map((q) => ({ ...q, label: t(q.key, q.fallback) }));
    const [currentIdx, setCurrentIdx] = useState(0);
    const [revealed, setRevealed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sessionStats, setSessionStats] = useState({ reviewed: 0, correct: 0, streak: 0 });
    const [flashAnim, setFlashAnim] = useState(null); // 'correct' | 'wrong' | null
    const [done, setDone] = useState(false);

    useEffect(() => {
        injectCSS(SRS_CSS_ID, SRS_CSS);
    }, []);

    // Fetch due words
    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetchAuth(`${API_BASE_URL}/srs/due/`);
                if (!res.ok) throw new Error('SRS words could not be loaded');
                const data = await res.json();
                setDueWords(data.words || []);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const currentWord = dueWords[currentIdx] || null;

    const handleRate = useCallback(
        async (quality) => {
            if (!currentWord) return;
            const isGood = quality >= 3;
            setFlashAnim(isGood ? 'correct' : 'wrong');
            setTimeout(() => setFlashAnim(null), 600);

            setSessionStats((prev) => ({
                reviewed: prev.reviewed + 1,
                correct: isGood ? prev.correct + 1 : prev.correct,
                streak: isGood ? prev.streak + 1 : 0,
            }));

            // XP
            try {
                const xp = parseInt(localStorage.getItem('eng_xp') || '0') + (isGood ? 8 : 3);
                localStorage.setItem('eng_xp', String(xp));
            } catch {}

            // Send review to backend
            try {
                await fetchAuth(`${API_BASE_URL}/srs/review/`, {
                    method: 'POST',
                    body: JSON.stringify({ word_id: currentWord.id, quality }),
                });
            } catch (e) {
                logger.error('SRS review error:', e);
            }

            // Next word
            setRevealed(false);
            if (currentIdx + 1 >= dueWords.length) {
                setDone(true);
            } else {
                setCurrentIdx((prev) => prev + 1);
            }
        },
        [currentWord, currentIdx, dueWords.length]
    );

    // Keyboard shortcuts
    useEffect(() => {
        const handler = (e) => {
            if (e.target.tagName === 'INPUT') return;
            if (e.key === ' ') {
                e.preventDefault();
                setRevealed(true);
            }
            if (revealed && e.key >= '0' && e.key <= '5') {
                handleRate(parseInt(e.key));
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [revealed, handleRate]);

    if (loading)
        return (
            <div style={S.root}>
                <div style={S.center}>
                    <div style={S.spinner} />
                    <p>{t('srs.loading', 'SRS kelimeleri yükleniyor…')}</p>
                </div>
            </div>
        );

    if (error)
        return (
            <div style={S.root}>
                <div style={S.center}>
                    <p>
                        {t('srs.error', 'Hata')}: {error}
                    </p>
                    <Link to="/eng-learn" style={S.backLink}>
                        <FaArrowLeft /> {t('srs.learningCenter', 'Öğrenme Merkezi')}
                    </Link>
                </div>
            </div>
        );

    if (dueWords.length === 0 || done)
        return (
            <div style={S.root}>
                <div style={S.topBar}>
                    <Link to="/eng-learn" style={S.backLink}>
                        <FaArrowLeft />
                    </Link>
                    <span style={S.topTitle}>{t('srs.title','SRS Review')}</span>
                </div>
                <div style={S.center}>
                    <div style={_st1034}>
                        <div>{done ? '🏆' : '✅'}</div>
                        <h2 style={S.doneTitle}>
                            {done
                                ? t('srs.sessionComplete', 'Oturum Tamamlandı!')
                                : t('srs.noWordsDue', 'Tekrar Bekleyen Kelime Yok!')}
                        </h2>
                        {done && (
                            <div style={S.doneStats}>
                                <div style={S.doneStat}>
                                    <span>{sessionStats.reviewed}</span>
                                    <span style={S.doneStatLabel}>{t('srs.review', 'Tekrar')}</span>
                                </div>
                                <div style={S.doneDivider} />
                                <div style={S.doneStat}>
                                    <span>{sessionStats.correct}</span>
                                    <span style={S.doneStatLabel}>{t('srs.correct', 'Doğru')}</span>
                                </div>
                                <div style={S.doneDivider} />
                                <div style={S.doneStat}>
                                    <span>
                                        {sessionStats.reviewed > 0
                                            ? Math.round(
                                                  (sessionStats.correct / sessionStats.reviewed) *
                                                      100
                                              )
                                            : 0}
                                        %
                                    </span>
                                    <span style={S.doneStatLabel}>
                                        {t('srs.success', 'Başarı')}
                                    </span>
                                </div>
                            </div>
                        )}
                        <p>
                            {done
                                ? t('srs.greatJob', 'Harika iş çıkardın! 🎉')
                                : t(
                                      'srs.addNewWords',
                                      t('srs.addWords','Add new words to use the SRS system.')
                                  )}
                        </p>
                        <div>
                            <Link to="/eng-learn" style={S.primaryBtn}>
                                {t('srs.learningCenter', 'Öğrenme Merkezi')}
                            </Link>
                            <Link to="/eng-learn/vocab" style={S.secondaryBtn}>
                                {t('srs.studyVocab', 'Kelime Çalış')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );

    return (
        <div
            aria-label={t('aria.srsReview', 'SRS Review')}
            style={{
                ...S.root,
                animation:
                    flashAnim === 'correct'
                        ? 'srs-correct 0.5s ease'
                        : flashAnim === 'wrong'
                          ? 'srs-wrong 0.5s ease'
                          : 'none',
            }}
        >
            {/* Top Bar */}
            <div style={S.topBar}>
                <Link to="/eng-learn" style={S.backLink}>
                    <FaArrowLeft />
                </Link>
                <span style={S.topTitle}>{t('srs.title','SRS Review')}</span>
                <div style={S.topBadges}>
                    {sessionStats.streak >= 2 && (
                        <span style={S.streakBadge}>
                            <FaFire size={12} /> {sessionStats.streak}
                        </span>
                    )}
                    <span style={S.xpBadge}>
                        <FaBolt size={11} /> {sessionStats.reviewed * 8} XP
                    </span>
                </div>
            </div>

            {/* Progress Bar */}
            <div style={S.progressWrap}>
                <div style={S.progressBg}>
                    <div
                        style={{
                            ...S.progressFill,
                            width: `${(currentIdx / dueWords.length) * 100}%`,
                        }}
                    />
                </div>
                <span style={S.progressLabel}>
                    {currentIdx + 1} / {dueWords.length}
                </span>
            </div>

            <div style={S.body}>
                {/* The Card */}
                <div style={_st1035} key={currentIdx}>
                    {!revealed ? (
                        /* Front: show word */
                        <div
                            style={S.cardFront}
                            role="button"
                            tabIndex={0}
                            onClick={() => setRevealed(true)}
                            onKeyDown={(e) =>
                                (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                            }
                        >
                            <p style={S.cardHint}>
                                {t('srs.tapOrSpace', 'tıkla veya SPACE ile çevir')}
                            </p>
                            <h1 style={S.cardWord}>{currentWord.word}</h1>
                            {currentWord.pronunciation && (
                                <p style={S.cardPhonetic}>{currentWord.pronunciation}</p>
                            )}
                            <div style={S.tapHint}>
                                <span style={S.tapIcon}>👆</span>
                            </div>
                        </div>
                    ) : (
                        /* Back: show answer + rate */
                        <div style={S.cardBack}>
                            <h2 style={S.answerWord}>{currentWord.word}</h2>
                            <div style={S.answerDivider} />
                            <h3 style={S.answerTranslation}>{currentWord.translation}</h3>
                            {currentWord.example_sentence && (
                                <p style={S.answerExample}>"{currentWord.example_sentence}"</p>
                            )}

                            {/* Quality Rating */}
                            <p style={S.rateLabel}>
                                {t('srs.howWell', 'Ne kadar iyi hatırladın?')}
                            </p>
                            <div style={S.qualityGrid}>
                                {QUALITY_LABELS.map((q) => (
                                    <button
                                        key={q.q}
                                        className="srs-quality-btn"
                                        style={{
                                            ...S.qualityBtn,
                                            backgroundColor: q.bg,
                                            borderColor: `${q.color}35`,
                                            color: q.color,
                                        }}
                                        onClick={() => handleRate(q.q)}
                                        title={`Klavye: ${q.q}`}
                                    >
                                        <span>{q.emoji}</span>
                                        <span>{q.label}</span>
                                        <span>{q.q}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Keyboard hint */}
                <div style={S.kbHint}>
                    <span>SPACE = {t('srs.flip', 'çevir')}</span>
                    <span>0-5 = {t('srs.rate', 'puanla')}</span>
                </div>

                {/* Session Stats */}
                <div style={S.sessionBar}>
                    <div style={S.sStat}>
                        <FaLayerGroup />
                        <span>{sessionStats.reviewed}</span>
                        <span>{t('srs.review', 'tekrar')}</span>
                    </div>
                    <div style={S.sStat}>
                        <FaCheckCircle />
                        <span>{sessionStats.correct}</span>
                        <span>{t('srs.correct', 'doğru')}</span>
                    </div>
                    <div style={S.sStat}>
                        <FaFire />
                        <span>{sessionStats.streak}</span>
                        <span>{t('srs.streak', 'seri')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const S = {
    root: {
        minHeight: '100vh',
        backgroundColor: '#0b0d10',
        color: '#dbdee1',
        fontFamily: "'Poppins','Segoe UI',sans-serif",
        transition: 'background 0.5s',
    },
    center: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        padding: 24,
    },
    spinner: {
        width: 40,
        height: 40,
        border: '3px solid #1a1e26',
        borderTop: '3px solid #e779c1',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
    },

    // Top bar
    topBar: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '14px 20px',
        backgroundColor: 'rgba(15,16,20,0.9)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backdropFilter: 'blur(12px)',
    },
    backLink: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.06)',
        color: '#949ba4',
        textDecoration: 'none',
        flexShrink: 0,
        border: '1px solid rgba(255,255,255,0.08)',
    },
    topTitle: {
        flex: 1,
        fontWeight: 800,
        fontSize: 16,
        letterSpacing: '-0.2px',
        background: 'linear-gradient(135deg,#e779c1,#f2a5d8)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    topBadges: { display: 'flex', gap: 8 },
    streakBadge: {
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'rgba(242,63,66,0.15)',
        border: '1px solid rgba(242,63,66,0.3)',
        borderRadius: 20,
        padding: '4px 10px',
        color: '#f23f42',
        fontSize: 12,
        fontWeight: 700,
    },
    xpBadge: {
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'rgba(88,101,242,0.12)',
        border: '1px solid rgba(88,101,242,0.25)',
        borderRadius: 20,
        padding: '4px 10px',
        color: '#5865f2',
        fontSize: 12,
        fontWeight: 700,
    },

    // Progress
    progressWrap: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 20px',
        maxWidth: 600,
        margin: '0 auto',
    },
    progressBg: {
        flex: 1,
        height: 6,
        backgroundColor: '#1a1e28',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        background: 'linear-gradient(90deg,#e779c1,#f2a5d8)',
        borderRadius: 4,
        transition: 'width 0.5s ease',
        boxShadow: '0 0 8px rgba(231,121,193,0.4)',
    },
    progressLabel: { color: '#6b7280', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' },

    body: { maxWidth: 520, margin: '0 auto', padding: '20px 20px 60px' },

    // Card
    card: {
        borderRadius: 28,
        overflow: 'hidden',
        marginBottom: 20,
        boxShadow:
            '0 16px 56px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 1px rgba(231,121,193,0.1)',
    },
    cardFront: {
        background: 'linear-gradient(160deg,#12082a 0%,#1a1040 40%,#140c30 100%)',
        border: '1px solid rgba(231,121,193,0.15)',
        borderRadius: 28,
        padding: '48px 32px',
        textAlign: 'center',
        cursor: 'pointer',
        minHeight: 240,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardBack: {
        background: 'linear-gradient(160deg,#081a10 0%,#0d2b18 40%,#0a1e12 100%)',
        border: '1px solid rgba(35,165,89,0.15)',
        borderRadius: 28,
        padding: '36px 28px',
        textAlign: 'center',
    },
    cardHint: {
        color: 'rgba(231,121,193,0.4)',
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: 2,
        fontWeight: 700,
        margin: '0 0 20px',
    },
    cardWord: {
        fontSize: 40,
        fontWeight: 900,
        margin: 0,
        color: '#fff',
        letterSpacing: '-1px',
        wordBreak: 'break-word',
    },
    cardPhonetic: {
        color: 'rgba(231,121,193,0.6)',
        fontSize: 16,
        margin: '10px 0 0',
        fontStyle: 'italic',
    },
    tapHint: { marginTop: 20, opacity: 0.3 },
    tapIcon: { fontSize: 28, animation: 'srs-float 2s ease-in-out infinite' },

    answerWord: {
        fontSize: 24,
        fontWeight: 800,
        margin: '0 0 8px',
        color: '#fff',
        letterSpacing: '-0.5px',
    },
    answerDivider: {
        width: 60,
        height: 3,
        background: 'linear-gradient(90deg,#23a559,#4ade80)',
        borderRadius: 3,
        margin: '8px auto 16px',
    },
    answerTranslation: { fontSize: 22, fontWeight: 700, margin: '0 0 10px', color: '#4ade80' },
    answerExample: {
        color: '#6b7280',
        fontSize: 14,
        fontStyle: 'italic',
        margin: '0 0 24px',
        lineHeight: 1.6,
    },

    rateLabel: {
        color: '#949ba4',
        fontSize: 12,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        margin: '0 0 14px',
    },
    qualityGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 },
    qualityBtn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        padding: '14px 8px',
        borderRadius: 14,
        border: '1px solid',
        cursor: 'pointer',
        transition: 'all 0.15s',
        fontFamily: 'inherit',
    },

    kbHint: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        color: '#2e3035',
        fontSize: 12,
        fontWeight: 600,
        marginBottom: 24,
    },

    sessionBar: {
        display: 'flex',
        gap: 12,
        justifyContent: 'space-around',
        background: 'linear-gradient(135deg,#0f1117 0%,#111520 100%)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 18,
        padding: '16px 22px',
        boxShadow: '0 6px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)',
    },
    sStat: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600 },

    // Done card
    doneCard: {
        background: 'linear-gradient(160deg,#0f1117 0%,#13151e 60%,#0d0f14 100%)',
        border: '1px solid rgba(231,121,193,0.12)',
        borderRadius: 28,
        padding: '48px 36px',
        textAlign: 'center',
        maxWidth: 440,
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
    },
    doneTitle: {
        fontSize: 24,
        fontWeight: 800,
        margin: '0 0 16px',
        background: 'linear-gradient(135deg,#fff 30%,#f2a5d8)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    doneStats: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        margin: '20px 0',
    },
    doneStat: { textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 4 },
    doneStatLabel: { color: '#6b7280', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' },
    doneDivider: { width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.08)' },

    primaryBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg,#e779c1,#f2a5d8)',
        color: '#fff',
        border: 'none',
        borderRadius: 14,
        padding: '14px 28px',
        fontSize: 14,
        fontWeight: 700,
        textDecoration: 'none',
        boxShadow: '0 4px 0 #c45a9e, 0 8px 24px rgba(231,121,193,0.35)',
    },
    secondaryBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.04)',
        color: '#949ba4',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 14,
        padding: '13px 28px',
        fontSize: 14,
        fontWeight: 700,
        textDecoration: 'none',
    },
};

SrsReviewPage.propTypes = {};

export default SrsReviewPage;
