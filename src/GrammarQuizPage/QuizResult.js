import { Link } from 'react-router-dom';
import { FaTrophy, FaRedo } from 'react-icons/fa';
import styles from './grammarQuizStyles';

const QuizResult = ({ score, totalQuestions, resetQuiz }) => {
    const successRate = totalQuestions > 0 ? (score / totalQuestions) * 100 : 100;
    let message = "Gayet iyi!";
    if (successRate === 100) message = "Mükemmel! 🏆";
    else if (successRate < 50) message = "Biraz daha çalışmalısın. 💪";

    return (
        <div style={styles.scrollWrapper}>
            <div style={styles.container}>
                <div style={styles.resultCard}>
                    <FaTrophy size={60} color="#faa61a" style={{ marginBottom: '20px' }} />
                    <h2 style={styles.resultTitle}>Oturum Tamamlandı!</h2>
                    <p style={styles.resultScore}>Skorun: {score} / {totalQuestions}</p>
                    <p style={styles.resultMessage}>{message}</p>
                    <div style={styles.resultBtnGroup}>
                        <button onClick={resetQuiz} style={styles.primaryBtn}>
                            <FaRedo style={{ marginRight: '8px' }} /> Menüye Dön
                        </button>
                        <Link to="/eng-learn" style={styles.secondaryBtn}>Merkeze Dön</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizResult;
