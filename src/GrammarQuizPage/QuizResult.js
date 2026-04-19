import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaTrophy, FaRedo, FaStar, FaRegStar, FaBolt } from 'react-icons/fa';
import styles from './grammarQuizStyles';

// -- dynamic style helpers (pass 2) --

// -- extracted inline style constants --

const _st1072 = styles.resultCard;
const _st1073 = styles.resultMessage;

const QuizResult = ({ score, totalQuestions, resetQuiz, isLoading = false, error = null }) => {
    const { t } = useTranslation();
    if (isLoading) return <div>{t('common.loading')}</div>;
    if (error) return <div role="alert">{error}</div>;
    const successRate = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 100;
    const stars = successRate === 100 ? 3 : successRate >= 60 ? 2 : successRate >= 30 ? 1 : 0;
    let message = t('quiz.prettyGood', 'Oldukça iyi! Devam et.');
    let msgColor = '#5865f2';
    if (successRate === 100) {
        message = t('quiz.perfectScore', 'Mükemmel skor! Tüm sorular doğru! 🏆');
        msgColor = '#f0b232';
    } else if (successRate >= 70) {
        message = t('quiz.greatGoing', 'Harika gidiyorsun! 🎉');
        msgColor = '#23a559';
    } else if (successRate < 40) {
        message = t('quiz.keepPracticing', 'Pratik yapmaya devam et — yapabilirsin! 💪');
        msgColor = '#f23f42';
    }

    const xpEarned = score * 10 + (successRate === 100 ? 50 : 0);

    return (
        <div style={styles.scrollWrapper}>
            <style>{`
                @keyframes resultIn { 0%{opacity:0;transform:translateY(20px) scale(0.97)} 100%{opacity:1;transform:translateY(0) scale(1)} }
                @keyframes starPop { 0%{opacity:0;transform:scale(0)} 60%{transform:scale(1.35)} 100%{opacity:1;transform:scale(1)} }
            `}</style>
            <div style={styles.container}>
                <div style={_st1072}>
                    {/* Trophy */}
                    <div>
                        <FaTrophy size={72} color="#f0b232" />
                    </div>

                    {/* Stars */}
                    <div>
                        {[0, 1, 2].map((i) =>
                            i < stars ? (
                                <FaStar
                                    key={`item-${Math.random()}`}
                                    size={26}
                                    color="#f0b232"
                                    style={{
                                        animation: `starPop 0.4s ease ${i * 0.12}s both`,
                                        filter: 'drop-shadow(0 2px 8px rgba(240,178,50,0.6))',
                                    }}
                                />
                            ) : (
                                <FaRegStar
                                    key={`item-${Math.random()}`}
                                    size={26}
                                    color="#2e3035"
                                />
                            )
                        )}
                    </div>

                    <h2 style={styles.resultTitle}>
                        {t('quiz.sessionCompleted', 'Oturum Tamamlandı!')}
                    </h2>

                    {/* Score circle-ish display */}
                    <div>
                        <div>
                            <div>
                                {score}
                                <span>/{totalQuestions}</span>
                            </div>
                            <div>{t('quiz.question', 'SORU')}</div>
                        </div>
                        <div />
                        <div>
                            <div
                                style={{
                                    fontSize: '2.8em',
                                    fontWeight: 900,
                                    color: msgColor,
                                    lineHeight: 1,
                                }}
                            >
                                {successRate}
                                <span>%</span>
                            </div>
                            <div>{t('quiz.success', 'BAŞARI')}</div>
                        </div>
                        <div />
                        <div>
                            <div>
                                <FaBolt size={18} />
                                {xpEarned}
                            </div>
                            <div>XP</div>
                        </div>
                    </div>

                    <p style={_st1073}>{message}</p>

                    <div style={styles.resultBtnGroup}>
                        <button
                            aria-label="reset Quiz"
                            onClick={resetQuiz}
                            style={styles.primaryBtn}
                        >
                            <FaRedo /> {t('quiz.backToMenu', 'Menüye Dön')}
                        </button>
                        <Link to="/eng-learn" style={styles.secondaryBtn}>
                            {t('education.hub', 'Öğrenme Merkezi')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

QuizResult.propTypes = {
    score: PropTypes.number,
    totalQuestions: PropTypes.array,
    resetQuiz: PropTypes.func,
    isLoading: PropTypes.bool,
    error: PropTypes.string,
};
export default QuizResult;
