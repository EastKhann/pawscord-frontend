import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
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

        return (
            <button
                key={lvl.id}
                onClick={() => remaining > 0 ? startQuiz(lvl.id) : toast.success("Tebrikler! Bu seviyedeki tüm soruları tamamladın.")}
                style={{
                    ...styles.levelCard,
                    borderTop: `5px solid ${lvl.color}`,
                    opacity: remaining === 0 ? 0.6 : 1
                }}
            >
                <div style={styles.levelIcon}>{lvl.icon}</div>
                <div style={styles.levelName}>{lvl.name}</div>
                <div style={styles.levelCount}>
                    {remaining === 0 ? "Tamamlandı! 🎉" : `${knownInLevel} / ${totalInDb} Tamamlandı`}
                </div>
            </button>
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
