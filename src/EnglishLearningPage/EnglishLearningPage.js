import { useState, useEffect, useCallback } from 'react';
import { getToken } from '../utils/tokenStorage';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useEnglishLearning from './useEnglishLearning';
import {
    FaArrowLeft,
    FaKeyboard,
    FaStar,
    FaBookOpen,
    FaBolt,
    FaCopy,
    FaCheck,
    FaLayerGroup,
    FaArrowRight,
} from 'react-icons/fa';
import { API_BASE_URL } from '../utils/constants';
import PropTypes from 'prop-types';
import './EnglishLearningPage.css';

// ─── Main Component ──────────────────────────────────────────────────────────
function EnglishLearningPage() {
    const e = useEnglishLearning();
    const { t } = useTranslation();
    const [flipped, setFlipped] = useState(false);
    const [error, setError] = useState(null);
    const [shake, setShake] = useState(false);
    const [copied, setCopied] = useState(false);
    const [sessionTime, setSessionTime] = useState(0);
    const [sessionCards, setSessionCards] = useState(0);
    const [xpPop, setXpPop] = useState(false);
    const [srsAdded, setSrsAdded] = useState(false);

    // Session timer
    useEffect(() => {
        const t = setInterval(() => setSessionTime((s) => s + 1), 1000);
        return () => clearInterval(t);
    }, []);

    // Reset flip when word changes
    useEffect(() => {
        setFlipped(false);
        setSrsAdded(false);
    }, [e.currentWord]);

    const triggerShake = () => {
        setShake(true);
        setTimeout(() => setShake(false), 500);
    };

    const handleKnown = useCallback(() => {
        setSessionCards((c) => c + 1);
        setXpPop(true);
        setTimeout(() => setXpPop(false), 1000);
        try {
            const xp = parseInt(localStorage.getItem('eng_xp') || '0') + 10;
            const vocab = parseInt(localStorage.getItem('eng_vocab_learned') || '0') + 1;
            localStorage.setItem('eng_xp', xp);
            localStorage.setItem('eng_vocab_learned', vocab);
        } catch {}
        e.handleMarkAsKnown();
    }, [e]);

    const handleAddToSrs = useCallback(async () => {
        if (!e.currentWord || srsAdded) return;
        const token = getToken();
        try {
            await fetch(`${API_BASE_URL}/srs/add/`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    word: e.currentWord.term,
                    translation: e.currentWord.meanings?.join(' / ') || '',
                }),
            });
            setSrsAdded(true);
        } catch {}
    }, [e.currentWord, srsAdded]);

    // Keyboard shortcuts
    useEffect(() => {
        const handler = (ev) => {
            if (['INPUT', 'SELECT', 'TEXTAREA'].includes(ev.target.tagName)) return;
            if (ev.key === ' ') {
                ev.preventDefault();
                setFlipped((f) => !f);
            } else if (ev.key === 'ArrowRight' && !e.levelComplete) {
                if (!flipped) {
                    triggerShake();
                    return;
                }
                handleKnown();
            } else if (ev.key === 'ArrowLeft' && !e.levelComplete) {
                e.getNewWord();
            } else if (ev.key === 's' || ev.key === 'S') {
                handleAddToSrs();
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [flipped, e.levelComplete, handleKnown, e.getNewWord, handleAddToSrs]);

    const handleCopyList = () => {
        try {
            const words = (e.availableWordsForLevel || [])
                .map((w) => `${w.term}: ${w.meanings?.join(', ')}`)
                .join('\n');
            navigator.clipboard.writeText(words);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {}
    };

    const fmtTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

    const LEVEL_COLORS = {
        A1: '#23a559',
        A2: '#4ade80',
        B1: '#5865f2',
        B2: '#7e89f5',
        C1: '#f0b232',
    };

    if (e.isLoading)
        return (
            <div style={S.root}>
                <div style={S.loadWrap}>
                    <div style={S.spinner} />
                    <p>{t('education.loadingWords')}</p>
                </div>
            </div>
        );

    if (e.error)
        return (
            <div style={S.root}>
                <div>
                    <p>Error: {e.error}</p>
                    <Link to="/eng-learn" style={S.backBtnLink}>
                        <FaArrowLeft /> {t('common.back')}
                    </Link>
                </div>
            </div>
        );

    return (
        <div style={S.root}>
            {/* XP Pop animation */}
            {xpPop && (
                <div style={S.xpPopWrap}>
                    <span style={S.xpPopText}>+10 XP</span>
                </div>
            )}

            {/* ── Top Bar ─────────────────────────────────────────────── */}
            <div style={S.topBar}>
                <Link to="/eng-learn" style={S.backBtnLink}>
                    <FaArrowLeft />
                </Link>
                <span style={S.topTitle}>📚 {t('education.vocabulary')}</span>
                <div style={S.sessionBadges}>
                    <span style={S.badge}>⏱ {fmtTime(sessionTime)}</span>
                    <span className="eng-session-count">✓ {sessionCards}</span>
                </div>
            </div>

            <div style={S.body}>
                {/* ── Level Chips ──────────────────────────────────────── */}
                <div style={S.levelChips}>
                    {e.availableLevels.map((l) => {
                        const isActive = l === e.currentLevel;
                        const color = LEVEL_COLORS[l] || '#5865f2';
                        const total = e.allData[l]?.length || 0;
                        const known = e.knownWords?.[l]?.length || 0;
                        const pct = total > 0 ? Math.round((known / total) * 100) : 0;
                        return (
                            <button
                                key={l}
                                className="eng-level-chip"
                                onClick={() => {
                                    e.setCurrentLevel(l);
                                    setSessionCards(0);
                                }}
                                style={{
                                    ...S.levelChip,
                                    backgroundColor: isActive
                                        ? `${color}18`
                                        : 'rgba(255,255,255,0.04)',
                                    borderColor: isActive ? `${color}50` : 'rgba(255,255,255,0.08)',
                                    color: isActive ? color : '#6b7280',
                                    boxShadow: isActive ? `0 0 16px ${color}20` : 'none',
                                }}
                            >
                                <span>{l.toUpperCase()}</span>
                                <span>{pct}%</span>
                            </button>
                        );
                    })}{' '}
                    <button
                        className="eng-btn"
                        style={S.iconBtn}
                        title={t('education.copyList')}
                        aria-label={t('education.copyList')}
                        onClick={handleCopyList}
                    >
                        {copied ? <FaCheck /> : <FaCopy />}
                    </button>
                </div>

                {/* ── Progress ──────────────────────────────────────────── */}
                <div style={S.progressWrap}>
                    <div style={S.progressRow}>
                        <span style={S.pLabel}>
                            {t('education.levelProgress')} — {e.currentLevel?.toUpperCase()}
                        </span>
                        <span style={S.pVal}>
                            {e.levelStats.knownWords} / {e.levelStats.totalWords}
                        </span>
                    </div>
                    <div style={S.pBg}>
                        <div
                            style={{
                                ...S.pFill,
                                width: `${e.levelStats.progress}%`,
                                background: `linear-gradient(90deg,${LEVEL_COLORS[e.currentLevel] || '#23a559'},${LEVEL_COLORS[e.currentLevel] || '#23a559'}88)`,
                            }}
                        />
                    </div>
                    <div style={S.progressRow}>
                        <span style={S.pLabel}>{t('education.overallProgress')}</span>
                        <span style={S.pVal}>{e.totalStats.progress}%</span>
                    </div>
                    <div style={S.pBg}>
                        <div
                            style={{
                                ...S.pFill,
                                background: 'linear-gradient(90deg,#5865f2,#7e89f5)',
                                width: `${e.totalStats.progress}%`,
                            }}
                        />
                    </div>
                </div>

                {/* ── Flashcard ─────────────────────────────────────────── */}
                {e.levelComplete ? (
                    <div style={S.completeCard}>
                        <div>🎉</div>
                        <h2>{t('education.levelCompleted', 'Seviye Tamamlandı!')}</h2>
                        <p>{t('education.levelCompletedDesc')}</p>
                        <div>
                            <button
                                className="eng-btn"
                                style={S.primaryBtn}
                                aria-label={t('education.nextLevel')}
                                onClick={() => {
                                    const idx = e.availableLevels.indexOf(e.currentLevel);
                                    if (idx < e.availableLevels.length - 1)
                                        e.setCurrentLevel(e.availableLevels[idx + 1]);
                                }}
                            >
                                {t('education.nextLevel')} <FaArrowRight size={12} />
                            </button>
                            <Link to="/eng-learn/srs" style={S.secondaryBtn}>
                                <FaLayerGroup size={12} /> {t('education.srsReview')}
                            </Link>
                        </div>
                    </div>
                ) : e.currentWord ? (
                    <>
                        <div
                            className="flashcard-scene"
                            style={{
                                animation: shake ? 'eng-shake 0.4s ease' : 'none',
                                marginBottom: 230,
                            }}
                        >
                            <div
                                className={`flashcard${flipped ? ' flipped' : ''}`}
                                role="button"
                                tabIndex={0}
                                aria-label={flipped ? 'Show question' : 'Reveal answer'}
                                onKeyDown={(e) =>
                                    (e.key === 'Enter' || e.key === ' ') && setFlipped((f) => !f)
                                }
                                onClick={() => setFlipped((f) => !f)}
                            >
                                <div className="flashcard-face flashcard-front">
                                    <div style={S.cardLevelBadge}>
                                        <span
                                            style={{
                                                color: LEVEL_COLORS[e.currentLevel] || '#5865f2',
                                                fontWeight: 700,
                                                fontSize: 11,
                                            }}
                                        >
                                            {e.currentLevel?.toUpperCase()}
                                        </span>
                                    </div>
                                    <p style={S.cardHint}>{t('education.clickOrSpace')}</p>
                                    <h2 style={S.cardWord}>{e.currentWord.term}</h2>
                                    {e.currentWord.phonetic && (
                                        <p style={S.phonetic}>{e.currentWord.phonetic}</p>
                                    )}
                                </div>
                                <div className="flashcard-face flashcard-back">
                                    <p style={S.cardHint}>{t('education.meaning')}</p>
                                    <h2 style={S.cardWord}>
                                        {e.currentWord.meanings?.join(' / ')}
                                    </h2>
                                    {e.currentWord.example && (
                                        <p style={S.example}>"{e.currentWord.example}"</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div style={S.actionRow}>
                            <button
                                className="eng-btn"
                                style={{ ...S.actionBtn, ...S.skipBtn }}
                                onClick={() => e.getNewWord()}
                                aria-label={t('education.skip')}
                            >
                                ← {t('education.skip')}
                            </button>
                            <button
                                className="eng-btn"
                                style={{ ...S.actionBtn, ...(flipped ? S.knownBtn : S.dimBtn) }}
                                aria-label={t('education.iKnow')}
                                onClick={() => (flipped ? handleKnown() : triggerShake())}
                            >
                                ✓ {t('education.iKnow')}
                            </button>
                        </div>

                        {/* SRS Add Button */}
                        {flipped && (
                            <div>
                                <button
                                    className="eng-btn"
                                    style={{
                                        ...S.srsBtn,
                                        color: srsAdded ? '#23a559' : '#e779c1',
                                        borderColor: srsAdded
                                            ? 'rgba(35,165,89,0.3)'
                                            : 'rgba(231,121,193,0.3)',
                                        backgroundColor: srsAdded
                                            ? 'rgba(35,165,89,0.08)'
                                            : 'rgba(231,121,193,0.08)',
                                    }}
                                    onClick={handleAddToSrs}
                                    disabled={srsAdded}
                                    aria-label={
                                        srsAdded
                                            ? t('education.addedToSrs')
                                            : t('education.addToSrs')
                                    }
                                >
                                    {srsAdded ? (
                                        <>
                                            <FaCheck size={12} /> {t('education.addedToSrs')}
                                        </>
                                    ) : (
                                        <>
                                            <FaLayerGroup size={12} /> {t('education.addToSrs')}
                                        </>
                                    )}
                                </button>
                            </div>
                        )}

                        <div style={S.kbRow}>
                            <FaKeyboard />
                            <span>{t('education.spaceFlip')}</span>
                            <span>{t('education.arrowKnow')}</span>
                            <span>{t('education.arrowSkip')}</span>
                            <span>S=SRS</span>
                        </div>
                    </>
                ) : (
                    <div style={S.emptyCard}>
                        <FaBookOpen size={40} />
                        <p>{t('education.noWordsInLevel')}</p>
                    </div>
                )}

                {/* ── Session Bar ───────────────────────────────────────── */}
                <div style={S.sessionBar}>
                    {[
                        {
                            icon: <FaStar />,
                            val: e.levelStats.knownWords,
                            sub: t('education.known'),
                        },
                        { icon: <FaBolt />, val: sessionCards, sub: t('education.session') },
                        {
                            icon: <span>⏱</span>,
                            val: fmtTime(sessionTime),
                            sub: t('education.time'),
                        },
                    ].map((s) => (
                        <div key={s.sub} style={S.sStat}>
                            {s.icon}
                            <span>{s.val}</span>
                            <span>{s.sub}</span>
                        </div>
                    ))}
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
    },
    loadWrap: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
    },
    spinner: {
        width: 40,
        height: 40,
        border: '3px solid #1a1e26',
        borderTop: '3px solid #5865f2',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
    },

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
    backBtnLink: {
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
    topTitle: { flex: 1, fontWeight: 800, fontSize: 16, letterSpacing: '-0.2px' },
    sessionBadges: { display: 'flex', gap: 8 },
    badge: {
        backgroundColor: 'rgba(255,255,255,0.06)',
        padding: '5px 12px',
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 700,
        border: '1px solid rgba(255,255,255,0.08)',
    },

    body: { maxWidth: 560, margin: '0 auto', padding: '24px 20px 60px' },

    levelChips: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 20,
        flexWrap: 'wrap',
    },
    levelChip: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        padding: '8px 16px',
        borderRadius: 14,
        border: '1px solid rgba(255,255,255,0.08)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        fontSize: 13,
        fontWeight: 700,
        background: 'none',
    },
    iconBtn: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: '#949ba4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: 14,
        marginLeft: 'auto',
    },

    progressWrap: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        marginBottom: 28,
        background: 'linear-gradient(135deg,#0f1117 0%,#111520 100%)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 16,
        padding: '16px 18px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
    },
    progressRow: { display: 'flex', justifyContent: 'space-between' },
    pLabel: { color: '#6b7280', fontSize: 12, fontWeight: 600 },
    pVal: { color: '#dbdee1', fontSize: 12, fontWeight: 700 },
    pBg: { height: 8, backgroundColor: '#1a1e28', borderRadius: 6, overflow: 'hidden' },
    pFill: {
        height: '100%',
        background: 'linear-gradient(90deg,#23a559,#4ade80)',
        borderRadius: 6,
        transition: 'width 0.6s ease',
        boxShadow: '0 0 8px rgba(35,165,89,0.4)',
    },

    cardHint: {
        color: 'rgba(88,101,242,0.4)',
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: 2,
        fontWeight: 700,
        margin: '0 0 18px',
        textAlign: 'center',
    },
    cardWord: {
        fontSize: 42,
        fontWeight: 900,
        margin: 0,
        color: '#fff',
        textAlign: 'center',
        wordBreak: 'break-word',
        letterSpacing: '-1px',
    },
    phonetic: {
        color: '#7e89f5',
        fontSize: 16,
        margin: '12px 0 0',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    example: {
        color: '#4a5568',
        fontSize: 14,
        fontStyle: 'italic',
        margin: '18px 0 0',
        textAlign: 'center',
        lineHeight: 1.6,
    },

    completeCard: {
        background: 'linear-gradient(135deg,#071a10 0%,#0d2b18 100%)',
        border: '1px solid rgba(35,165,89,0.25)',
        borderRadius: 28,
        padding: 44,
        textAlign: 'center',
        marginBottom: 20,
        boxShadow: '0 12px 40px rgba(35,165,89,0.15)',
    },
    emptyCard: {
        background: 'linear-gradient(135deg,#0f1117 0%,#111520 100%)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 28,
        padding: 52,
        textAlign: 'center',
        marginBottom: 20,
    },

    actionRow: { display: 'flex', gap: 14, marginTop: 28 },
    actionBtn: {
        flex: 1,
        padding: '17px',
        borderRadius: 18,
        border: 'none',
        fontSize: 15,
        fontWeight: 800,
        cursor: 'pointer',
        letterSpacing: '0.2px',
    },
    skipBtn: {
        background: 'rgba(255,255,255,0.05)',
        color: '#6b7280',
        border: '1px solid rgba(255,255,255,0.08)',
    },
    knownBtn: {
        background: 'linear-gradient(135deg,#23a559,#1a9e50)',
        color: '#fff',
        boxShadow: '0 4px 0 #156936, 0 8px 28px rgba(35,165,89,0.4)',
    },
    dimBtn: {
        background: 'rgba(255,255,255,0.03)',
        color: '#2e3035',
        cursor: 'not-allowed',
        border: '1px solid rgba(255,255,255,0.05)',
    },
    primaryBtn: {
        background: 'linear-gradient(135deg,#5865f2,#7e89f5)',
        color: '#fff',
        border: 'none',
        borderRadius: 14,
        padding: '15px 30px',
        fontSize: 15,
        fontWeight: 800,
        cursor: 'pointer',
        boxShadow: '0 4px 0 #3b45c7, 0 8px 24px rgba(88,101,242,0.35)',
    },

    kbRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        marginTop: 16,
        color: '#2e3035',
        fontSize: 12,
        fontWeight: 600,
    },

    srsBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 22px',
        borderRadius: 14,
        border: '1px solid',
        fontSize: 13,
        fontWeight: 700,
        cursor: 'pointer',
        background: 'none',
        transition: 'all 0.2s ease',
    },
    secondaryBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '13px 24px',
        borderRadius: 14,
        fontSize: 14,
        fontWeight: 700,
        cursor: 'pointer',
        textDecoration: 'none',
        background: 'rgba(231,121,193,0.1)',
        color: '#e779c1',
        border: '1px solid rgba(231,121,193,0.25)',
    },
    cardLevelBadge: {
        position: 'absolute',
        top: 14,
        right: 16,
        background: 'rgba(255,255,255,0.06)',
        padding: '3px 10px',
        borderRadius: 8,
        border: '1px solid rgba(255,255,255,0.08)',
    },
    xpPopWrap: {
        position: 'fixed',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        pointerEvents: 'none',
        animation: 'eng-xpPop 1s ease forwards',
    },
    xpPopText: {
        fontSize: 28,
        fontWeight: 900,
        color: '#4ade80',
        textShadow: '0 2px 12px rgba(74,222,128,0.5)',
    },

    sessionBar: {
        display: 'flex',
        gap: 12,
        marginTop: 32,
        background: 'linear-gradient(135deg,#0f1117 0%,#111520 100%)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 18,
        padding: '16px 22px',
        justifyContent: 'space-around',
        boxShadow: '0 6px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)',
    },
    sStat: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600 },
};

EnglishLearningPage.propTypes = {};

export default EnglishLearningPage;
