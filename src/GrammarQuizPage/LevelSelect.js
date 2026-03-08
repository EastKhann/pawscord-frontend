import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaClock, FaPlay } from 'react-icons/fa';
import { LEVELS, loadAllQuestions } from '../data/grammarQuestions';
import toast from '../utils/toast';
import styles from './grammarQuizStyles';

const LevelSelect = ({ knownQuestions, startQuiz }) => {
    const [allQuestions, setAllQuestions] = useState([]);

    useEffect(() => {
        loadAllQuestions().then(qs => setAllQuestions(qs));
    }, []);

    const colA = LEVELS.filter(l => l.id.startsWith('A'));
    const colB = LEVELS.filter(l => l.id.startsWith('B'));
    const colC = LEVELS.filter(l => l.id.startsWith('C'));

    const renderLevelCard = (lvl) => {
        const totalInDb = allQuestions.filter(q => q.level === lvl.id).length;
        const knownInLevel = allQuestions.filter(q => q.level === lvl.id && knownQuestions.includes(q.id)).length;
        const remaining = totalInDb - knownInLevel;
        const done = remaining === 0;

        return (
            <div
                key={lvl.id}
                style={{
                    ...styles.levelCard,
                    borderTop: `4px solid ${lvl.color}`,
                    boxShadow: `0 6px 28px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05), 0 -2px 16px ${lvl.color}22`,
                    opacity: done ? 0.55 : 1,
                    display: 'flex', flexDirection: 'column', gap: 0
                }}
            >
                <div style={{ ...styles.levelIcon, fontSize: '2.8em', marginBottom: 4 }}>{lvl.icon}</div>
                <div style={styles.levelName}>{lvl.name}</div>
                <div style={{ ...styles.levelCount, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {done
                        ? <span style={{ color: '#4ade80', fontWeight: 700 }}>✓ Tamamlandı</span>
                        : <><span style={{ color: lvl.color, fontWeight: 700 }}>{knownInLevel}</span> / <span>{totalInDb}</span> Soru</>}
                </div>
                {/* Mini progress bar */}
                {!done && totalInDb > 0 && (
                    <div style={{ height: 4, borderRadius: 4, background: 'rgba(255,255,255,0.07)', marginTop: 8, overflow: 'hidden' }}>
                        <div style={{ height: '100%', borderRadius: 4, width: `${Math.round(knownInLevel / totalInDb * 100)}%`, background: `linear-gradient(90deg,${lvl.color}cc,${lvl.color})`, transition: 'width 0.6s ease' }} />
                    </div>
                )}
                <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                    <button
                        onClick={() => done ? toast.success("Bu seviyeyi tamamladın!") : startQuiz(lvl.id, false)}
                        style={{ ...styles.modeBtn, flex: 1, background: 'rgba(88,101,242,0.13)', borderColor: 'rgba(88,101,242,0.5)', color: '#8b94ff' }}
                    >
                        <FaPlay size={10} /> Normal
                    </button>
                    <button
                        onClick={() => done ? toast.success("Bu seviyeyi tamamladın!") : startQuiz(lvl.id, true)}
                        style={{ ...styles.modeBtn, flex: 1, background: 'rgba(240,178,50,0.1)', borderColor: 'rgba(240,178,50,0.45)', color: '#f0b232' }}
                    >
                        <FaClock size={10} /> Zamanlı
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div style={styles.scrollWrapper}>
            <div style={styles.container}>
                <div style={styles.headerArea}>
                    <Link to="/eng-learn" style={styles.backLink}><FaArrowLeft /> Merkez</Link>
                    <h1 style={styles.mainTitle}>Seviyeni Seç</h1>
                    <p style={styles.subTitle}>Kendini test etmek için bir zorluk seviyesi seç.</p>
                </div>
                <div style={styles.columnsWrapper}>
                    <div style={styles.column}>{colA.map(lvl => renderLevelCard(lvl))}</div>
                    <div style={styles.column}>{colB.map(lvl => renderLevelCard(lvl))}</div>
                    <div style={styles.column}>{colC.map(lvl => renderLevelCard(lvl))}</div>
                </div>
            </div>
        </div>
    );
};

export default LevelSelect;
