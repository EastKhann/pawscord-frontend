// frontend/src/EnglishHub.js

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    FaBookOpen, FaBrain, FaArrowLeft, FaChartLine, FaMicrophone, FaMicrophoneAlt,
    FaTrophy, FaFire, FaStar, FaBolt, FaMedal, FaCalendarCheck, FaGraduationCap,
    FaPlay, FaCheckCircle, FaLock
} from 'react-icons/fa';

// ─── Circular Progress SVG ───────────────────────────────────────────────────
const CircleProgress = ({ pct, color, size = 64, stroke = 6, children }) => {
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const dash = circ * Math.min(pct, 100) / 100;
    return (
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1e2124" strokeWidth={stroke} />
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
                strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
                style={{ transition: 'stroke-dasharray 0.8s ease' }} />
            <foreignObject x={0} y={0} width={size} height={size} style={{ transform: 'rotate(90deg)', transformOrigin: `${size / 2}px ${size / 2}px` }}>
                <div style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {children}
                </div>
            </foreignObject>
        </svg>
    );
};

// ─── Word of the day pool ────────────────────────────────────────────────────
const WOTD_POOL = [
    { word: 'Perseverance', tr: 'Azim', ex: 'Success requires perseverance.' },
    { word: 'Eloquent', tr: 'Belagatli', ex: 'She gave an eloquent speech.' },
    { word: 'Ambiguous', tr: 'Belirsiz', ex: 'The instructions were ambiguous.' },
    { word: 'Meticulous', tr: 'Titiz', ex: 'He is meticulous about details.' },
    { word: 'Resilient', tr: 'Dirençli', ex: 'Children are surprisingly resilient.' },
    { word: 'Concise', tr: 'Özlü', ex: 'Please be concise in your answer.' },
    { word: 'Pragmatic', tr: 'Pragmatik', ex: 'We need a pragmatic approach.' },
    { word: 'Lucid', tr: 'Açık/Berrak', ex: 'Her explanation was perfectly lucid.' },
];

const getWOTD = () => {
    const day = Math.floor(Date.now() / 86400000);
    return WOTD_POOL[day % WOTD_POOL.length];
};

const EnglishHub = () => {
    const [stats, setStats] = useState({ quizzes: 0, correct: 0, streak: 0, vocabLearned: 0 });

    useEffect(() => {
        try {
            const quizzes = parseInt(localStorage.getItem('eng_quiz_count') || '0');
            const correct = parseInt(localStorage.getItem('eng_correct_count') || '0');
            const streak = parseInt(localStorage.getItem('eng_streak') || '0');
            const vocabLearned = parseInt(localStorage.getItem('eng_vocab_learned') || '0');
            setStats({ quizzes, correct, streak, vocabLearned });
        } catch { }
    }, []);

    const [wotdRevealed, setWotdRevealed] = useState(false);
    const [xp, setXp] = useState(0);
    const wotd = getWOTD();

    useEffect(() => {
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

    const accuracy = stats.quizzes > 0 ? Math.round((stats.correct / Math.max(stats.quizzes, 1)) * 100) : 0;

    // XP level calculation
    const xpLevel = Math.floor(xp / 200) + 1;
    const xpInLevel = xp % 200;
    const xpPct = (xpInLevel / 200) * 100;

    const modules = [
        {
            to: '/eng-learn/vocab',
            icon: <FaBookOpen size={36} />,
            color: '#23a559',
            bg: 'rgba(35,165,89,0.12)',
            title: 'Kelime Hazinesi',
            desc: 'A1–B2 seviyelere ayrılmış flashcard sistemi. Flip animasyonu, klavye kısayolları.',
            badge: stats.vocabLearned > 0 ? `${stats.vocabLearned} kelime` : null,
            locked: false,
        },
        {
            to: '/eng-learn/grammar',
            icon: <FaBrain size={36} />,
            color: '#5865f2',
            bg: 'rgba(88,101,242,0.12)',
            title: 'Grammar & Quiz',
            desc: 'Dilbilgisi testleri, açıklamalı yanlış cevaplar, zamanlayıcı modu.',
            badge: stats.quizzes > 0 ? `${stats.quizzes} quiz` : null,
            locked: false,
        },
        {
            to: '/eng-learn/voice',
            icon: <FaMicrophone size={36} />,
            color: '#eb459e',
            bg: 'rgba(235,69,158,0.12)',
            title: 'Sesli Pratik (AI)',
            desc: 'Yapay zeka ile gerçek zamanlı İngilizce konuşma pratiği yap.',
            badge: null,
            locked: false,
        },
        {
            to: '/eng-learn/pronunciation',
            icon: <FaMicrophoneAlt size={36} />,
            color: '#f0b232',
            bg: 'rgba(240,178,50,0.12)',
            title: 'Telaffuz Testi',
            desc: 'Doğru telaffuzu öğren, ses analizi ile kendini değerlendir.',
            badge: null,
            locked: false,
        },
    ];

    return (
        <div style={S.root}>
            {/* ── Hero Header ─────────────────────────────────────────────── */}
            <div style={S.hero}>
                <div style={S.heroBg} aria-hidden />
                <Link to="/" style={S.backBtn}><FaArrowLeft /> Sohbet</Link>
                <div style={S.heroContent}>
                    <div style={S.heroIcon}>🎓</div>
                    <h1 style={S.heroTitle}>İngilizce Eğitim Merkezi</h1>
                    <p style={S.heroSub}>Kelime, gramer, konuşma — her şey bir arada.</p>

                    {/* XP Bar */}
                    <div style={S.xpRow}>
                        <FaBolt style={{ color: '#f0b232', flexShrink: 0 }} />
                        <span style={S.xpLabel}>Seviye {xpLevel}</span>
                        <div style={S.xpBarBg}>
                            <div style={{ ...S.xpBarFill, width: `${xpPct}%` }} />
                        </div>
                        <span style={S.xpNum}>{xpInLevel} / 200 XP</span>
                    </div>
                </div>
            </div>

            <div style={S.body}>
                {/* ── Stats Row ────────────────────────────────────────────── */}
                <div style={S.statsRow}>
                    {[
                        { label: 'Seri', value: stats.streak, color: '#f23f42', icon: <FaFire />, pct: Math.min(stats.streak * 10, 100) },
                        { label: 'Doğruluk', value: `${accuracy}%`, color: '#23a559', icon: <FaStar />, pct: accuracy },
                        { label: 'Kelime', value: stats.vocabLearned, color: '#5865f2', icon: <FaBookOpen />, pct: Math.min(stats.vocabLearned / 5, 100) },
                        { label: 'Quiz', value: stats.quizzes, color: '#f0b232', icon: <FaTrophy />, pct: Math.min(stats.quizzes * 5, 100) },
                    ].map(s => (
                        <div key={s.label} style={S.statCard}>
                            <CircleProgress pct={s.pct} color={s.color} size={72} stroke={6}>
                                <span style={{ color: s.color, fontSize: 22, fontWeight: 700 }}>{s.value}</span>
                            </CircleProgress>
                            <span style={{ ...S.statLabel, color: s.color }}>{s.icon}</span>
                            <span style={S.statName}>{s.label}</span>
                        </div>
                    ))}
                </div>

                {/* ── Word of the Day ──────────────────────────────────────── */}
                <div style={S.wotdCard}>
                    <div style={S.wotdLeft}>
                        <span style={S.wotdBadge}>📅 Günün Kelimesi</span>
                        <h2 style={S.wotdWord}>{wotd.word}</h2>
                        {wotdRevealed ? (
                            <>
                                <p style={S.wotdTr}>🇹🇷 {wotd.tr}</p>
                                <p style={S.wotdEx}>"{wotd.ex}"</p>
                            </>
                        ) : (
                            <button style={S.revealBtn} onClick={() => setWotdRevealed(true)}>
                                Anlamı Göster
                            </button>
                        )}
                    </div>
                    <FaGraduationCap size={64} style={{ color: 'rgba(88,101,242,0.2)', flexShrink: 0 }} />
                </div>

                {/* ── Module Cards ─────────────────────────────────────────── */}
                <h3 style={S.sectionTitle}>Modüller</h3>
                <div style={S.cardGrid}>
                    {modules.map(m => (
                        <Link key={m.to} to={m.to} style={S.cardLink}>
                            <div style={{ ...S.card, boxShadow: `0 6px 28px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 1px ${m.color}1a` }}>
                                {m.badge && <span style={{ ...S.cardBadge, backgroundColor: m.bg, color: m.color }}>{m.badge}</span>}
                                <div style={{ ...S.cardIconCircle, backgroundColor: m.bg, color: m.color }}>
                                    {m.icon}
                                </div>
                                <h2 style={S.cardTitle}>{m.title}</h2>
                                <p style={S.cardDesc}>{m.desc}</p>
                                <span style={{ ...S.cardCta, color: m.color, borderColor: `${m.color}44`, backgroundColor: m.bg }}>
                                    <FaPlay size={10} /> Başla
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* ── Daily Goals ──────────────────────────────────────────── */}
                <h3 style={S.sectionTitle}>Günlük Hedefler</h3>
                <div style={S.goalsGrid}>
                    {[
                        { label: '10 kelime çalış', done: stats.vocabLearned >= 10, icon: <FaBookOpen />, color: '#23a559' },
                        { label: '5 quiz sor', done: stats.quizzes >= 5, icon: <FaBrain />, color: '#5865f2' },
                        { label: 'Sesli pratik yap', done: false, icon: <FaMicrophone />, color: '#eb459e' },
                        { label: '3 günlük seri', done: stats.streak >= 3, icon: <FaFire />, color: '#f23f42' },
                    ].map(g => (
                        <div key={g.label} style={{ ...S.goalItem, opacity: g.done ? 1 : 0.65 }}>
                            <span style={{ color: g.done ? g.color : '#949ba4', marginRight: 8 }}>
                                {g.done ? <FaCheckCircle /> : g.icon}
                            </span>
                            <span style={{ color: g.done ? '#dbdee1' : '#949ba4', textDecoration: g.done ? 'line-through' : 'none' }}>
                                {g.label}
                            </span>
                            {g.done && <span style={{ marginLeft: 'auto', fontSize: 12, color: g.color, fontWeight: 700 }}>+50 XP</span>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ─── Styles ──────────────────────────────────────────────────────────────────
const S = {
    root: { minHeight: '100vh', backgroundColor: '#0b0d10', color: '#dbdee1', fontFamily: "'Poppins', 'Segoe UI', sans-serif" },
    hero: { position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg,#09101e 0%,#0f1628 40%,#0a0e1a 100%)', borderBottom: '1px solid rgba(88,101,242,0.15)', paddingBottom: 36 },
    heroBg: { position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%,rgba(88,101,242,0.22) 0%,transparent 70%)', pointerEvents: 'none' },
    backBtn: { display: 'inline-flex', alignItems: 'center', gap: 8, color: '#6b7280', textDecoration: 'none', fontSize: 13, fontWeight: 600, padding: '9px 16px', margin: '16px 20px 0', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 10, position: 'relative', zIndex: 2, border: '1px solid rgba(255,255,255,0.07)' },
    heroContent: { textAlign: 'center', padding: '28px 20px 10px', position: 'relative', zIndex: 2 },
    heroIcon: { fontSize: 64, lineHeight: 1, marginBottom: 14 },
    heroTitle: { fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 800, margin: '0 0 10px', background: 'linear-gradient(135deg,#fff 30%,#9ba5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px' },
    heroSub: { color: '#6b7280', fontSize: 15, margin: '0 0 28px' },
    xpRow: { display: 'flex', alignItems: 'center', gap: 10, maxWidth: 500, margin: '0 auto', backgroundColor: 'rgba(255,255,255,0.05)', padding: '12px 18px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' },
    xpLabel: { color: '#f0b232', fontWeight: 800, fontSize: 13, whiteSpace: 'nowrap' },
    xpBarBg: { flex: 1, height: 8, backgroundColor: '#1a1e28', borderRadius: 6, overflow: 'hidden' },
    xpBarFill: { height: '100%', background: 'linear-gradient(90deg,#f0b232,#f5d060)', borderRadius: 6, transition: 'width 0.8s ease', boxShadow: '0 0 10px rgba(240,178,50,0.5)' },
    xpNum: { color: '#6b7280', fontSize: 12, whiteSpace: 'nowrap' },

    body: { maxWidth: 960, margin: '0 auto', padding: '32px 24px 80px' },

    statsRow: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 32 },
    statCard: {
        background: 'linear-gradient(160deg,#0f1117 0%,#111520 100%)',
        border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20,
        padding: '22px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        boxShadow: '0 6px 28px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)',
        backdropFilter: 'blur(6px)'
    },
    statLabel: { fontSize: 18 },
    statName: { color: '#6b7280', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: 700 },

    wotdCard: {
        background: 'linear-gradient(135deg,#0c1430 0%,#111b3d 50%,#0d1228 100%)',
        border: '1px solid rgba(88,101,242,0.2)', borderRadius: 24, padding: '26px 32px', marginBottom: 36,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, overflow: 'hidden',
        boxShadow: '0 12px 40px rgba(88,101,242,0.15), inset 0 1px 0 rgba(255,255,255,0.05)'
    },
    wotdLeft: { flex: 1, minWidth: 0 },
    wotdBadge: { backgroundColor: 'rgba(88,101,242,0.2)', color: '#8b94ff', fontSize: 12, fontWeight: 700, padding: '5px 14px', borderRadius: 20, display: 'inline-block', marginBottom: 12, border: '1px solid rgba(88,101,242,0.35)' },
    wotdWord: { fontSize: 32, fontWeight: 800, margin: '0 0 12px', letterSpacing: '-0.5px', background: 'linear-gradient(135deg,#fff 40%,#b8beee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    wotdTr: { color: '#4ade80', fontSize: 15, fontWeight: 600, margin: '0 0 6px' },
    wotdEx: { color: '#6b7280', fontSize: 14, fontStyle: 'italic', margin: 0 },
    revealBtn: {
        background: 'linear-gradient(135deg,#5865f2,#7e89f5)', color: '#fff', border: 'none',
        borderRadius: 12, padding: '11px 24px', cursor: 'pointer', fontWeight: 700, fontSize: 14,
        boxShadow: '0 4px 0 #3b45c7, 0 8px 20px rgba(88,101,242,0.35)'
    },

    sectionTitle: { color: '#6b7280', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2.5, margin: '0 0 18px' },
    cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 20, marginBottom: 40 },
    cardLink: { textDecoration: 'none', display: 'block' },
    card: {
        background: 'linear-gradient(160deg,#0f1117 0%,#111520 100%)',
        border: '1px solid rgba(255,255,255,0.07)', borderRadius: 24, padding: '26px 22px',
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12, position: 'relative',
        overflow: 'hidden', transition: 'transform 0.18s ease,box-shadow 0.18s ease', cursor: 'pointer',
        boxShadow: '0 6px 28px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)'
    },
    cardBadge: { position: 'absolute', top: 14, right: 14, fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 20, border: '1px solid transparent' },
    cardIconCircle: { width: 64, height: 64, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    cardTitle: { color: '#f2f3f5', fontWeight: 800, fontSize: 16, margin: 0, letterSpacing: '-0.2px' },
    cardDesc: { color: '#6b7280', fontSize: 13, lineHeight: 1.6, margin: 0, flexGrow: 1 },
    cardCta: {
        display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700,
        padding: '8px 18px', borderRadius: 12, border: '1px solid', marginTop: 6
    },

    goalsGrid: { display: 'flex', flexDirection: 'column', gap: 10 },
    goalItem: {
        display: 'flex', alignItems: 'center',
        background: 'linear-gradient(135deg,#0f1117 0%,#111520 100%)',
        border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '15px 20px',
        fontSize: 14, transition: 'opacity 0.2s',
        boxShadow: '0 3px 12px rgba(0,0,0,0.3)'
    },
};

export default EnglishHub;


