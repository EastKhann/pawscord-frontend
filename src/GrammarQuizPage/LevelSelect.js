import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { QUESTIONS_DB, LEVELS } from '../data/grammarQuestions';
import toast from '../utils/toast';
import styles from './grammarQuizStyles';

const LevelSelect = ({ knownQuestions, startQuiz }) => {
    const colA = LEVELS.filter(l => l.id.startsWith('A'));
    const colB = LEVELS.filter(l => l.id.startsWith('B'));
    const colC = LEVELS.filter(l => l.id.startsWith('C'));

    const renderLevelCard = (lvl) => {
        const totalInDb = QUESTIONS_DB.filter(q => q.level === lvl.id).length;
        const knownInLevel = QUESTIONS_DB.filter(q => q.level === lvl.id && knownQuestions.includes(q.id)).length;
        const remaining = totalInDb - knownInLevel;

        return (
            <button
                key={lvl.id}
                onClick={() => remaining > 0 ? startQuiz(lvl.id) : toast.success("Tebrikler! Bu seviyedeki t\u00FCm sorular\u0131 tamamlad\u0131n.")}
                style={{
                    ...styles.levelCard,
                    borderTop: `5px solid ${lvl.color}`,
                    opacity: remaining === 0 ? 0.6 : 1
                }}
            >
                <div style={styles.levelIcon}>{lvl.icon}</div>
                <div style={styles.levelName}>{lvl.name}</div>
                <div style={styles.levelCount}>
                    {remaining === 0 ? "Tamamland\u0131! \uD83C\uDF89" : `${knownInLevel} / ${totalInDb} Tamamland\u0131`}
                </div>
            </button>
        );
    };

    return (
        <div style={styles.scrollWrapper}>
            <div style={styles.container}>
                <div style={styles.headerArea}>
                    <Link to="/eng-learn" style={styles.backLink}><FaArrowLeft /> Merkez</Link>
                    <h1 style={styles.mainTitle}>Seviyeni Se\u00E7</h1>
                    <p style={styles.subTitle}>Kendini test etmek i\u00E7in bir zorluk seviyesi se\u00E7.</p>
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
