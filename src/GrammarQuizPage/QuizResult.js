import { Link } from 'react-router-dom';
import { FaTrophy, FaRedo } from 'react-icons/fa';
import styles from './grammarQuizStyles';

const QuizResult = ({ score, totalQuestions, resetQuiz }) => {
    const successRate = totalQuestions > 0 ? (score / totalQuestions) * 100 : 100;
    let message = "Gayet iyi!";
    if (successRate === 100) message = "M\u00FCkemmel! \uD83C\uDFC6";
    else if (successRate < 50) message = "Biraz daha \u00E7al\u0131\u015Fmal\u0131s\u0131n. \uD83D\uDCAA";

    return (
        <div style={styles.scrollWrapper}>
            <div style={styles.container}>
                <div style={styles.resultCard}>
                    <FaTrophy size={60} color="#faa61a" style={{ marginBottom: '20px' }} />
                    <h2 style={styles.resultTitle}>Oturum Tamamland\u0131!</h2>
                    <p style={styles.resultScore}>Skorun: {score} / {totalQuestions}</p>
                    <p style={styles.resultMessage}>{message}</p>
                    <div style={styles.resultBtnGroup}>
                        <button onClick={resetQuiz} style={styles.primaryBtn}>
                            <FaRedo style={{ marginRight: '8px' }} /> Men\u00FCye D\u00F6n
                        </button>
                        <Link to="/eng-learn" style={styles.secondaryBtn}>Merkeze D\u00F6n</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizResult;
