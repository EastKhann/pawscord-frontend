import { getToken } from '../utils/tokenStorage';
// frontend/src/EnglishHub.js

import { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    FaBookOpen,
    FaBrain,
    FaArrowLeft,
    FaChartLine,
    FaMicrophone,
    FaMicrophoneAlt,
    FaTrophy,
    FaFire,
    FaStar,
    FaBolt,
    FaMedal,
    FaCalendarCheck,
    FaGraduationCap,
    FaPlay,
    FaCheckCircle,
    FaLock,
    FaRedo,
    FaArrowRight,
    FaClock,
    FaLayerGroup,
} from 'react-icons/fa';
import { API_BASE_URL } from '../utils/constants';

// -- dynamic style helpers (pass 2) --

// -- extracted inline style constants --

const _st1021 = {
    position: 'absolute',
    borderRadius: '50%',
    pointerEvents: 'none',
    filter: 'blur(60px)',
    zIndex: 0,
    width: 500,
    height: 500,
    background: 'rgba(88,101,242,0.25)',
    top: -150,
    left: -100,
    animation: 'hub-orb1 12s ease-in-out infinite',
};
const _st1022 = {
    position: 'absolute',
    borderRadius: '50%',
    pointerEvents: 'none',
    filter: 'blur(60px)',
    zIndex: 0,
    width: 350,
    height: 350,
    background: 'rgba(231,121,193,0.18)',
    top: 20,
    right: -60,
    animation: 'hub-orb2 10s ease-in-out infinite',
};
const _st1023 = {
    position: 'absolute',
    borderRadius: '50%',
    pointerEvents: 'none',
    filter: 'blur(60px)',
    zIndex: 0,
    width: 250,
    height: 250,
    background: 'rgba(88,101,242,0.12)',
    bottom: 10,
    left: '40%',
    animation: 'hub-orb1 15s ease-in-out infinite reverse',
};

// --- Inject keyframes once --------------------------------------------------
const HUB_CSS_ID = 'eng-hub-css';
const HUB_CSS = `
@keyframes hub-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
@keyframes hub-pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
@keyframes hub-glow { 0%,100%{box-shadow:0 0 20px rgba(88,101,242,0.2)} 50%{box-shadow:0 0 40px rgba(88,101,242,0.4)} }
@keyframes hub-shine { 0%{background-position:-200% center} 100%{background-position:200% center} }
@keyframes hub-slideUp { 0%{opacity:0;transform:translateY(16px)} 100%{opacity:1;transform:translateY(0)} }
@keyframes hub-countUp { 0%{opacity:0;transform:scale(0.8)} 100%{opacity:1;transform:scale(1)} }
@keyframes hub-orb1 { 0%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-30px) scale(1.1)} 66%{transform:translate(-20px,20px) scale(0.95)} 100%{transform:translate(0,0) scale(1)} }
@keyframes hub-orb2 { 0%{transform:translate(0,0) scale(1)} 33%{transform:translate(-35px,25px) scale(0.9)} 66%{transform:translate(25px,-15px) scale(1.05)} 100%{transform:translate(0,0) scale(1)} }
.hub-card:hover { transform: translateY(-4px) scale(1.02) !important; }
.hub-card:active { transform: translateY(-1px) scale(0.99) !important; }
.hub-goal:hover { background: linear-gradient(135deg,#111520 0%,#151a2a 100%) !important; border-color: rgba(88,101,242,0.2) !important; }
`;

function injectCSS(id, css) {
    if (typeof document === 'undefined' || document.getElementById(id)) return;
    const el = document.createElement('style');
    el.id = id;
    el.textContent = css;
    document.head.appendChild(el);
}

// --- Circular Progress SVG (animated) ----------------------------------------
const CircleProgress = ({ pct, color, size = 80, stroke = 7, children, glow }) => {
    const { t } = useTranslation();
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const dash = (circ * Math.min(pct, 100)) / 100;
    return (
        <div
            aria-label={t('aria.circleProgress', 'Progress')}
            style={{ position: 'relative', width: size, height: size }}
        >
            {glow && (
                <div
                    style={{
                        position: 'absolute',
                        inset: -4,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
                        animation: 'hub-pulse 3s ease-in-out infinite',
                    }}
                />
            )}
            <svg width={size} height={size}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={r}
                    fill="none"
                    stroke="#1a1e28"
                    strokeWidth={stroke}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={r}
                    fill="none"
                    stroke={color}
                    strokeWidth={stroke}
                    strokeDasharray={`${dash} ${circ}`}
                    strokeLinecap="round"
                    style={{
                        transition: 'stroke-dasharray 1.2s cubic-bezier(0.4,0,0.2,1)',
                        filter: `drop-shadow(0 0 6px ${color}80)`,
                    }}
                />
            </svg>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: size,
                    height: size,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                }}
            >
                {children}
            </div>
        </div>
    );
};

// --- Word of the day pool (expanded) -----------------------------------------
const WOTD_POOL = [
    { word: 'Perseverance', tr: 'Azim', ex: 'Success requires perseverance.', level: 'B2' },
    { word: 'Eloquent', tr: 'Belagatli', ex: 'She gave an eloquent speech.', level: 'C1' },
    { word: 'Ambiguous', tr: 'Belirsiz', ex: 'The instructions were ambiguous.', level: 'B2' },
    { word: 'Meticulous', tr: 'Titiz', ex: 'He is meticulous about details.', level: 'C1' },
    { word: 'Resilient', tr: 'Resilient', ex: 'Children are surprisingly resilient.', level: 'B2' },
    { word: 'Concise', tr: 'Concise', ex: 'Please be concise in your answer.', level: 'B1' },
    { word: 'Pragmatic', tr: 'Pragmatik', ex: 'We need a pragmatic approach.', level: 'C1' },
    { word: 'Lucid', tr: 'Open/Berrak', ex: 'Her explanation was perfectly lucid.', level: 'B2' },
    {
        word: 'Serendipity',
        tr: 'Found by chance',
        ex: 'Meeting her was pure serendipity.',
        level: 'C1',
    },
    {
        word: 'Endeavor',
        tr: 'Effort/Entry',
        ex: 'Learning a language is a worthy endeavor.',
        level: 'B2',
    },
    { word: 'Ephemeral', tr: 'Temporary/Short-lived', ex: 'Beauty is ephemeral.', level: 'C1' },
    {
        word: 'Tenacious',
        tr: 'Stubborn/Determined',
        ex: 'She is tenacious in her pursuit.',
        level: 'C1',
    },
];

const getWOTD = () => {
    const day = Math.floor(Date.now() / 86400000);
    return WOTD_POOL[day % WOTD_POOL.length];
};

// --- SRS Due Words Hook ------------------------------------------------------
const useSrsDue = () => {
    const [dueCount, setDueCount] = useState(0);
    useEffect(() => {
        const token = getToken();
        if (!token) return;
        fetch(`${API_BASE_URL}/srs/due/`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((r) => (r.ok ? r.json() : null))
            .then((data) => {
                if (data?.words) setDueCount(data.words.length);
            })
            .catch(() => { });
    }, []);
    return dueCount;
};

const EnglishHub = () => {
    const { t } = useTranslation();
    const [stats, setStats] = useState({ quizzes: 0, correct: 0, streak: 0, vocabLearned: 0 });
    const [wotdRevealed, setWotdRevealed] = useState(false);
    const [xp, setXp] = useState(0);
    const [mounted, setMounted] = useState(false);
    const wotd = getWOTD();
    const srsDue = useSrsDue();

    useEffect(() => {
        injectCSS(HUB_CSS_ID, HUB_CSS);
        setMounted(true);
        try {
            const quizzes = parseInt(localStorage.getItem('eng_quiz_count') || '0');
            const correct = parseInt(localStorage.getItem('eng_correct_count') || '0');
            const streak = parseInt(localStorage.getItem('eng_streak') || '0');
            const vocabLearned = parseInt(localStorage.getItem('eng_vocab_learned') || '0');
            const xpVal = parseInt(localStorage.getItem('eng_xp') || '0');
            setStats({ quizzes, correct, streak, vocabLearned });
            setXp(xpVal);
        } catch { }
    }, []);

    const accuracy =
        stats.quizzes > 0 ? Math.round((stats.correct / Math.max(stats.quizzes, 1)) * 100) : 0;
    const xpLevel = Math.floor(xp / 200) + 1;
    const xpInLevel = xp % 200;
    const xpPct = (xpInLevel / 200) * 100;

    // Level title
    const levelTitle = useMemo(() => {
        if (xpLevel <= 3) return t('education.levelBeginner', 'Başlangıç');
        if (xpLevel <= 7) return t('education.levelExplorer', 'Keşfeden');
        if (xpLevel <= 15) return t('education.levelStudent', 'Öğrenci');
        if (xpLevel <= 25) return t('education.levelScholar', 'Bilgin');
        return t('education.levelMaster', 'Usta');
    }, [xpLevel]);

    const modules = [
        {
            to: '/eng-learn/vocab',
            icon: <FaBookOpen size={32} />,
            color: '#23a559',
            gradient: 'linear-gradient(135deg,#0a2e18 0%,#0d3d20 100%)',
            glowColor: 'rgba(35,165,89,0.15)',
            title: t('education.vocabulary', 'Kelime Dağarcığı'),
            desc: t('education.vocabDesc', '5,300+ words, A1–C1 levels, flashcard system'),
            badge:
                stats.vocabLearned > 0
                    ? `${stats.vocabLearned} ${t('education.learned', 'öğrenildi')}`
                    : null,
            emoji: '📚',
        },
        {
            to: '/eng-learn/grammar',
            icon: <FaBrain size={32} />,
            color: '#5865f2',
            gradient: 'linear-gradient(135deg,#0c1030 0%,#111840 100%)',
            glowColor: 'rgba(88,101,242,0.15)',
            title: t('education.grammarQuiz', 'Gramer & Test'),
            desc: t('education.grammarDesc', '300+ questions, explained answers, timed mode'),
            badge: stats.quizzes > 0 ? `${stats.quizzes} ${t('education.quiz', 'test')}` : null,
            emoji: '🧠',
        },
        {
            to: '/eng-learn/srs',
            icon: <FaLayerGroup size={32} />,
            color: '#e779c1',
            gradient: 'linear-gradient(135deg,#1a0a20 0%,#2a1035 100%)',
            glowColor: 'rgba(231,121,193,0.15)',
            title: t('education.srsSystem', 'Tekrar Sistemi (SRS)'),
            desc: t(
                'education.srsDesc',
                t('englishHub.spacedRep', 'Smart spaced repetition algorithm for permanent vocabulary learning')
            ),
            badge:
                srsDue > 0 ? `${srsDue} ${t('education.reviewsPending', 'tekrar bekliyor')}` : null,
            emoji: '🔄',
        },
        {
            to: '/eng-learn/voice',
            icon: <FaMicrophone size={32} />,
            color: '#eb459e',
            gradient: 'linear-gradient(135deg,#1a0a18 0%,#2a1028 100%)',
            glowColor: 'rgba(235,69,158,0.15)',
            title: t('education.voicePractice', 'Sesli Pratik'),
            desc: t('education.voiceDesc', 'Yapay zeka ile gerçek zamanlı konuşma pratiği'),
            badge: null,
            emoji: '🎤',
        },
        {
            to: '/eng-learn/pronunciation',
            icon: <FaMicrophoneAlt size={32} />,
            color: '#f0b232',
            gradient: 'linear-gradient(135deg,#1a1408 0%,#2a2010 100%)',
            glowColor: 'rgba(240,178,50,0.15)',
            title: t('education.pronunciationTest', 'Telaffuz Testi'),
            desc: t('education.pronunciationDesc', 'İşitme analizi ile telaffuzunuzu değlendirin'),
            badge: null,
            emoji: '🗣️',
        },
    ];

    const goals = [
        {
            label: t('education.goalStudy10', 'Study 10 words'),
            done: stats.vocabLearned >= 10,
            icon: <FaBookOpen />,
            color: '#23a559',
            progress: Math.min(stats.vocabLearned / 10, 1),
        },
        {
            label: t('education.goal5Quiz', '5 quiz tamamla'),
            done: stats.quizzes >= 5,
            icon: <FaBrain />,
            color: '#5865f2',
            progress: Math.min(stats.quizzes / 5, 1),
        },
        {
            label: t('education.goalSrsReview', 'SRS Tekrar'),
            done: false,
            icon: <FaRedo />,
            color: '#e779c1',
            progress: 0,
        },
        {
            label: t('education.goal3DayStreak', '3 day streak'),
            done: stats.streak >= 3,
            icon: <FaFire />,
            color: '#f23f42',
            progress: Math.min(stats.streak / 3, 1),
        },
    ];
    const goalsCompleted = goals.filter((g) => g.done).length;

    return (
        <div style={S.root}>
            {/* -- Hero Header ----------------------------------------------- */}
            <div style={S.hero}>
                {/* Animated background orbs */}
                <div style={_st1021} />
                <div style={_st1022} />
                <div style={_st1023} />

                <Link to="/" style={S.backBtn}>
                    <FaArrowLeft /> {t('nav.home', 'Ana Sayfa')}
                </Link>

                <div style={S.heroContent}>
                    <div
                        style={{
                            ...S.heroIconWrap,
                            animation: mounted ? 'hub-float 4s ease-in-out infinite' : 'none',
                        }}
                    >
                        <span style={S.heroIcon}>🎓</span>
                    </div>
                    <h1 style={S.heroTitle}>
                        {t('education.hubTitle', 'İngilizce Öğrenme Merkezi')}
                    </h1>
                    <p style={S.heroSub}>
                        {t('education.hubSubtitle', 'Kelime, gramer, konuşma — her şey bir arada')}
                    </p>

                    {/* XP Bar — Enhanced */}
                    <div style={S.xpRow}>
                        <div style={S.xpLevelBadge}>
                            <FaBolt />
                            <span style={S.xpLevelNum}>{xpLevel}</span>
                        </div>
                        <div style={S.xpInfo}>
                            <div style={S.xpInfoTop}>
                                <span style={S.xpLevelTitle}>{levelTitle}</span>
                                <span style={S.xpNum}>{xpInLevel} / 200 XP</span>
                            </div>
                            <div style={S.xpBarBg}>
                                <div style={{ ...S.xpBarFill, width: `${xpPct}%` }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={S.body}>
                {/* -- Stats Row ---------------------------------------------- */}
                <div style={S.statsRow}>
                    {[
                        {
                            label: t('education.streak', 'Seri'),
                            value: stats.streak,
                            unit: t('education.day', 'gün'),
                            color: '#f23f42',
                            icon: <FaFire size={16} />,
                            pct: Math.min(stats.streak * 10, 100),
                            glow: stats.streak >= 3,
                        },
                        {
                            label: t('education.accuracy', 'Doğruluk'),
                            value: accuracy,
                            unit: '%',
                            color: '#23a559',
                            icon: <FaStar size={16} />,
                            pct: accuracy,
                            glow: accuracy >= 80,
                        },
                        {
                            label: t('education.vocabularyLabel', 'Kelime'),
                            value: stats.vocabLearned,
                            unit: '',
                            color: '#5865f2',
                            icon: <FaBookOpen size={16} />,
                            pct: Math.min((stats.vocabLearned / 50) * 100, 100),
                            glow: false,
                        },
                        {
                            label: t('education.quizLabel', 'Test'),
                            value: stats.quizzes,
                            unit: '',
                            color: '#f0b232',
                            icon: <FaTrophy size={16} />,
                            pct: Math.min(stats.quizzes * 5, 100),
                            glow: false,
                        },
                    ].map((s, i) => (
                        <div
                            key={s.label}
                            style={{
                                ...S.statCard,
                                animation: mounted
                                    ? `hub-slideUp 0.5s ease ${i * 0.1}s both`
                                    : 'none',
                            }}
                        >
                            <CircleProgress
                                pct={s.pct}
                                color={s.color}
                                size={76}
                                stroke={6}
                                glow={s.glow}
                            >
                                <div>
                                    <span
                                        style={{
                                            color: s.color,
                                            fontSize: 20,
                                            fontWeight: 800,
                                            display: 'block',
                                        }}
                                    >
                                        {s.value}
                                    </span>
                                    {s.unit && (
                                        <span
                                            style={{
                                                color: `${s.color}99`,
                                                fontSize: 10,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {s.unit}
                                        </span>
                                    )}
                                </div>
                            </CircleProgress>
                            <div style={S.statBottom}>
                                <span style={{ color: s.color, fontSize: 14 }}>{s.icon}</span>
                                <span style={S.statName}>{s.label}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* -- Word of the Day ---------------------------------------- */}
                <div style={S.wotdCard}>
                    <div style={S.wotdGlow} />
                    <div style={S.wotdLeft}>
                        <div style={S.wotdHeader}>
                            <span style={S.wotdBadge}>
                                📖 {t('education.wordOfTheDay', 'Günün Kelimesi')}
                            </span>
                            <span style={S.wotdLevel}>{wotd.level}</span>
                        </div>
                        <h2 style={S.wotdWord}>{wotd.word}</h2>
                        {wotdRevealed ? (
                            <div>
                                <p style={S.wotdTr}>👉 {wotd.tr}</p>
                                <p style={S.wotdEx}>"{wotd.ex}"</p>
                            </div>
                        ) : (
                            <button style={S.revealBtn} onClick={() => setWotdRevealed(true)}>
                                <FaPlay size={10} /> {t('education.showMeaning', 'Anlamı Göster')}
                            </button>
                        )}
                    </div>
                    <div style={S.wotdRight}>
                        <FaGraduationCap size={56} />
                    </div>
                </div>

                {/* -- Module Cards ------------------------------------------- */}
                <div style={S.sectionHeader}>
                    <h3 style={S.sectionTitle}>{t('education.modules', 'Modüller')}</h3>
                    <span style={S.sectionSub}>
                        {modules.length} {t('education.moduleCount', 'modül')}
                    </span>
                </div>
                <div style={S.cardGrid}>
                    {modules.map((m, i) => (
                        <Link key={m.to} to={m.to} style={S.cardLink}>
                            <div
                                className="hub-card"
                                style={{
                                    ...S.card,
                                    background: m.gradient,
                                    animation: mounted
                                        ? `hub-slideUp 0.5s ease ${0.15 + i * 0.08}s both`
                                        : 'none',
                                    boxShadow: `0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 1px ${m.color}15`,
                                }}
                            >
                                {/* Glow effect */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: -30,
                                        right: -30,
                                        width: 100,
                                        height: 100,
                                        borderRadius: '50%',
                                        background: m.glowColor,
                                        filter: 'blur(30px)',
                                        pointerEvents: 'none',
                                    }}
                                />

                                {m.badge && (
                                    <span
                                        style={{
                                            ...S.cardBadge,
                                            backgroundColor: `${m.color}18`,
                                            color: m.color,
                                            borderColor: `${m.color}30`,
                                        }}
                                    >
                                        {m.badge}
                                    </span>
                                )}
                                <div style={S.cardTop}>
                                    <div
                                        style={{
                                            ...S.cardIconCircle,
                                            backgroundColor: `${m.color}15`,
                                            color: m.color,
                                            border: `1px solid ${m.color}25`,
                                        }}
                                    >
                                        {m.icon}
                                    </div>
                                    <span>{m.emoji}</span>
                                </div>
                                <h2 style={S.cardTitle}>{m.title}</h2>
                                <p style={S.cardDesc}>{m.desc}</p>
                                <span
                                    style={{
                                        ...S.cardCta,
                                        color: m.color,
                                        borderColor: `${m.color}30`,
                                        backgroundColor: `${m.color}10`,
                                    }}
                                >
                                    {t('education.start', 'Başla')} <FaArrowRight size={11} />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* -- Daily Goals -------------------------------------------- */}
                <div style={S.sectionHeader}>
                    <h3 style={S.sectionTitle}>{t('education.dailyGoals', 'Günlük Hedefler')}</h3>
                    <span style={S.goalCounter}>
                        {goalsCompleted}/{goals.length}
                    </span>
                </div>
                {/* Overall goal progress */}
                <div style={S.goalProgressBg}>
                    <div
                        style={{
                            ...S.goalProgressFill,
                            width: `${(goalsCompleted / goals.length) * 100}%`,
                        }}
                    />
                </div>
                <div style={S.goalsGrid}>
                    {goals.map((g, i) => (
                        <div
                            key={g.label}
                            className="hub-goal"
                            style={{
                                ...S.goalItem,
                                opacity: g.done ? 1 : 0.8,
                                animation: mounted
                                    ? `hub-slideUp 0.4s ease ${0.4 + i * 0.06}s both`
                                    : 'none',
                            }}
                        >
                            <div
                                style={{
                                    ...S.goalIconWrap,
                                    backgroundColor: g.done
                                        ? `${g.color}20`
                                        : 'rgba(255,255,255,0.04)',
                                    borderColor: g.done ? `${g.color}40` : 'rgba(255,255,255,0.08)',
                                }}
                            >
                                <span style={{ color: g.done ? g.color : '#4a5568', fontSize: 16 }}>
                                    {g.done ? <FaCheckCircle /> : g.icon}
                                </span>
                            </div>
                            <div style={S.goalText}>
                                <span
                                    style={{
                                        color: g.done ? '#dbdee1' : '#949ba4',
                                        fontWeight: 600,
                                        fontSize: 14,
                                        textDecoration: g.done ? 'line-through' : 'none',
                                    }}
                                >
                                    {g.label}
                                </span>
                                {!g.done && (
                                    <div style={S.goalMiniBar}>
                                        <div
                                            style={{
                                                ...S.goalMiniFill,
                                                width: `${g.progress * 100}%`,
                                                backgroundColor: g.color,
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                            <span
                                style={{
                                    fontSize: 12,
                                    fontWeight: 700,
                                    whiteSpace: 'nowrap',
                                    color: g.done ? g.color : '#4a5568',
                                    marginLeft: 'auto',
                                    paddingLeft: 8,
                                }}
                            >
                                {g.done ? '+50 XP ✅' : `${Math.round(g.progress * 100)}%`}
                            </span>
                        </div>
                    ))}
                </div>

                {/* -- Quick Actions ------------------------------------------ */}
                <div style={S.quickActions}>
                    {srsDue > 0 && (
                        <Link to="/eng-learn/srs" style={S.quickAction}>
                            <FaRedo />
                            <span>
                                <strong>{srsDue}</strong>{' '}
                                {t('education.reviewsPending', 'kelime tekrar bekliyor')}
                            </span>
                            <FaArrowRight size={12} />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Styles ------------------------------------------------------------------
const S = {
    root: {
        minHeight: '100vh',
        backgroundColor: '#0b0d10',
        color: '#dbdee1',
        fontFamily: "'Poppins', 'Segoe UI', sans-serif",
    },

    // Hero
    hero: {
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(160deg,#080c1a 0%,#0d1428 40%,#090e1e 100%)',
        borderBottom: '1px solid rgba(88,101,242,0.12)',
        paddingBottom: 40,
    },
    orb: {
        position: 'absolute',
        borderRadius: '50%',
        pointerEvents: 'none',
        filter: 'blur(60px)',
        zIndex: 0,
    },
    backBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        color: '#6b7280',
        textDecoration: 'none',
        fontSize: 13,
        fontWeight: 600,
        padding: '9px 16px',
        margin: '16px 20px 0',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 10,
        position: 'relative',
        zIndex: 2,
        border: '1px solid rgba(255,255,255,0.07)',
        transition: 'color 0.2s',
    },
    heroContent: {
        textAlign: 'center',
        padding: '24px 20px 10px',
        position: 'relative',
        zIndex: 2,
    },
    heroIconWrap: { display: 'inline-block', marginBottom: 12 },
    heroIcon: { fontSize: 56, lineHeight: 1, display: 'block' },
    heroTitle: {
        fontSize: 'clamp(1.7rem,4vw,2.5rem)',
        fontWeight: 800,
        margin: '0 0 8px',
        background: 'linear-gradient(135deg,#fff 20%,#a0aaff 60%,#e779c1)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '-0.5px',
        backgroundSize: '200% auto',
        animation: 'hub-shine 4s linear infinite',
    },
    heroSub: { color: '#6b7280', fontSize: 14, margin: '0 0 24px', fontWeight: 500 },

    // XP Bar
    xpRow: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        maxWidth: 480,
        margin: '0 auto',
        backgroundColor: 'rgba(255,255,255,0.04)',
        padding: '14px 18px',
        borderRadius: 16,
        border: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(12px)',
    },
    xpLevelBadge: {
        width: 48,
        height: 48,
        borderRadius: 14,
        background: 'linear-gradient(135deg,rgba(240,178,50,0.2),rgba(240,178,50,0.08))',
        border: '1px solid rgba(240,178,50,0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        flexShrink: 0,
    },
    xpLevelNum: { color: '#f0b232', fontWeight: 900, fontSize: 15, lineHeight: 1 },
    xpInfo: { flex: 1, minWidth: 0 },
    xpInfoTop: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    xpLevelTitle: { color: '#f0b232', fontWeight: 700, fontSize: 13 },
    xpNum: { color: '#6b7280', fontSize: 12, fontWeight: 600 },
    xpBarBg: { height: 8, backgroundColor: '#1a1e28', borderRadius: 6, overflow: 'hidden' },
    xpBarFill: {
        height: '100%',
        background: 'linear-gradient(90deg,#f0b232,#f5d060,#f0b232)',
        backgroundSize: '200% 100%',
        borderRadius: 6,
        transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: '0 0 12px rgba(240,178,50,0.5)',
        animation: 'hub-shine 3s linear infinite',
    },

    body: { maxWidth: 980, margin: '0 auto', padding: '32px 24px 80px' },

    // Stats
    statsRow: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 32 },
    statCard: {
        background: 'linear-gradient(160deg,#0f1117 0%,#111520 100%)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 22,
        padding: '20px 10px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
    },
    statBottom: { display: 'flex', alignItems: 'center', gap: 6 },
    statName: {
        color: '#6b7280',
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        fontWeight: 700,
    },

    // WOTD
    wotdCard: {
        background: 'linear-gradient(135deg,#0c1430 0%,#121e42 50%,#0d1228 100%)',
        border: '1px solid rgba(88,101,242,0.18)',
        borderRadius: 24,
        padding: '28px 32px',
        marginBottom: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
        overflow: 'hidden',
        boxShadow: '0 12px 48px rgba(88,101,242,0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
        position: 'relative',
    },
    wotdGlow: {
        position: 'absolute',
        top: -40,
        right: -40,
        width: 180,
        height: 180,
        borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(88,101,242,0.2) 0%,transparent 70%)',
        pointerEvents: 'none',
        filter: 'blur(40px)',
    },
    wotdLeft: { flex: 1, minWidth: 0, position: 'relative', zIndex: 1 },
    wotdRight: { flexShrink: 0, position: 'relative', zIndex: 1 },
    wotdHeader: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 },
    wotdBadge: {
        backgroundColor: 'rgba(88,101,242,0.15)',
        color: '#8b94ff',
        fontSize: 12,
        fontWeight: 700,
        padding: '5px 14px',
        borderRadius: 20,
        display: 'inline-block',
        border: '1px solid rgba(88,101,242,0.25)',
    },
    wotdLevel: {
        backgroundColor: 'rgba(240,178,50,0.12)',
        color: '#f0b232',
        fontSize: 11,
        fontWeight: 700,
        padding: '3px 10px',
        borderRadius: 8,
        border: '1px solid rgba(240,178,50,0.25)',
    },
    wotdWord: {
        fontSize: 30,
        fontWeight: 800,
        margin: '0 0 12px',
        letterSpacing: '-0.5px',
        background: 'linear-gradient(135deg,#fff 40%,#b8beee)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    wotdTr: { color: '#4ade80', fontSize: 15, fontWeight: 600, margin: '0 0 6px' },
    wotdEx: { color: '#6b7280', fontSize: 14, fontStyle: 'italic', margin: 0 },
    revealBtn: {
        background: 'linear-gradient(135deg,#5865f2,#7e89f5)',
        color: '#fff',
        border: 'none',
        borderRadius: 12,
        padding: '11px 22px',
        cursor: 'pointer',
        fontWeight: 700,
        fontSize: 13,
        boxShadow: '0 4px 0 #3b45c7, 0 8px 20px rgba(88,101,242,0.35)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        transition: 'transform 0.1s',
    },

    // Section
    sectionHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    sectionTitle: {
        color: '#6b7280',
        fontSize: 11,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: 2.5,
        margin: 0,
    },
    sectionSub: { color: '#4a5568', fontSize: 12, fontWeight: 600 },

    // Cards
    cardGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))',
        gap: 16,
        marginBottom: 40,
    },
    cardLink: { textDecoration: 'none', display: 'block' },
    card: {
        borderRadius: 22,
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 10,
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'pointer',
        border: '1px solid rgba(255,255,255,0.06)',
        minHeight: 200,
    },
    cardBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        fontSize: 10,
        fontWeight: 700,
        padding: '3px 10px',
        borderRadius: 16,
        border: '1px solid',
        letterSpacing: '0.2px',
    },
    cardTop: { display: 'flex', alignItems: 'center', gap: 12, width: '100%' },
    cardIconCircle: {
        width: 52,
        height: 52,
        borderRadius: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTitle: {
        color: '#f2f3f5',
        fontWeight: 800,
        fontSize: 15,
        margin: 0,
        letterSpacing: '-0.2px',
    },
    cardDesc: { color: '#6b7280', fontSize: 12, lineHeight: 1.6, margin: 0, flexGrow: 1 },
    cardCta: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 12,
        fontWeight: 700,
        padding: '7px 16px',
        borderRadius: 10,
        border: '1px solid',
        marginTop: 4,
        transition: 'gap 0.2s',
    },

    // Goals
    goalCounter: {
        color: '#5865f2',
        fontSize: 13,
        fontWeight: 700,
        backgroundColor: 'rgba(88,101,242,0.12)',
        padding: '3px 12px',
        borderRadius: 12,
        border: '1px solid rgba(88,101,242,0.2)',
    },
    goalProgressBg: {
        height: 4,
        backgroundColor: '#1a1e28',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 14,
    },
    goalProgressFill: {
        height: '100%',
        background: 'linear-gradient(90deg,#5865f2,#23a559)',
        borderRadius: 4,
        transition: 'width 0.8s ease',
    },
    goalsGrid: { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 },
    goalItem: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: 'linear-gradient(135deg,#0f1117 0%,#111520 100%)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 14,
        padding: '13px 18px',
        transition: 'all 0.2s',
    },
    goalIconWrap: {
        width: 36,
        height: 36,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid',
        flexShrink: 0,
        transition: 'all 0.2s',
    },
    goalText: { flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 },
    goalMiniBar: {
        height: 3,
        backgroundColor: '#1a1e28',
        borderRadius: 3,
        overflow: 'hidden',
        width: '100%',
    },
    goalMiniFill: { height: '100%', borderRadius: 3, transition: 'width 0.6s ease' },

    // Quick Actions
    quickActions: { display: 'flex', flexDirection: 'column', gap: 10 },
    quickAction: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: 'linear-gradient(135deg,rgba(231,121,193,0.06),rgba(231,121,193,0.02))',
        border: '1px solid rgba(231,121,193,0.15)',
        borderRadius: 14,
        padding: '14px 18px',
        textDecoration: 'none',
        color: '#dbdee1',
        fontSize: 14,
        fontWeight: 500,
        transition: 'border-color 0.2s, background 0.2s',
    },
};

EnglishHub.propTypes = {
    pct: PropTypes.object,
    color: PropTypes.string,
    size: PropTypes.number,
    stroke: PropTypes.number,
    children: PropTypes.array,
    glow: PropTypes.object,
};
export default EnglishHub;
