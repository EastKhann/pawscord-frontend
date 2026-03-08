import { Link } from 'react-router-dom';
import { FaTrophy, FaRedo, FaStar, FaRegStar, FaBolt } from 'react-icons/fa';
import styles from './grammarQuizStyles';

const QuizResult = ({ score, totalQuestions, resetQuiz }) => {
    const successRate = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 100;
    const stars = successRate === 100 ? 3 : successRate >= 60 ? 2 : successRate >= 30 ? 1 : 0;
    let message = "Gayet iyi! Devam et.";
    let msgColor = '#5865f2';
    if (successRate === 100) { message = "Mükemmel! Tüm soruları doğru yaptın! 🏆"; msgColor = '#f0b232'; }
    else if (successRate >= 70) { message = "Harika gidiyorsun! 🎉"; msgColor = '#23a559'; }
    else if (successRate < 40) { message = "Biraz daha pratik yap — yapabilirsin! 💪"; msgColor = '#f23f42'; }

    const xpEarned = score * 10 + (successRate === 100 ? 50 : 0);

    return (
        <div style={styles.scrollWrapper}>
            <style>{`
                @keyframes resultIn { 0%{opacity:0;transform:translateY(20px) scale(0.97)} 100%{opacity:1;transform:translateY(0) scale(1)} }
                @keyframes starPop { 0%{opacity:0;transform:scale(0)} 60%{transform:scale(1.35)} 100%{opacity:1;transform:scale(1)} }
            `}</style>
            <div style={styles.container}>
                <div style={{ ...styles.resultCard, animation: 'resultIn 0.5s cubic-bezier(0.2,0.8,0.3,1) forwards' }}>
                    {/* Trophy */}
                    <div style={{ position: 'relative', marginBottom: 8 }}>
                        <FaTrophy size={72} color="#f0b232" style={{ filter: 'drop-shadow(0 6px 16px rgba(240,178,50,0.5))' }} />
                    </div>

                    {/* Stars */}
                    <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                        {[0, 1, 2].map(i => (
                            i < stars
                                ? <FaStar key={i} size={26} color="#f0b232" style={{ animation: `starPop 0.4s ease ${i * 0.12}s both`, filter: 'drop-shadow(0 2px 8px rgba(240,178,50,0.6))' }} />
                                : <FaRegStar key={i} size={26} color="#2e3035" />
                        ))}
                    </div>

                    <h2 style={styles.resultTitle}>Oturum Tamamlandı!</h2>

                    {/* Score circle-ish display */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20, margin: '10px 0 18px', justifyContent: 'center' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2.8em', fontWeight: 900, background: 'linear-gradient(135deg,#5865f2,#9ba5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>
                                {score}<span style={{ fontSize: '0.5em', WebkitTextFillColor: '#4a5568' }}>/{totalQuestions}</span>
                            </div>
                            <div style={{ color: '#6b7280', fontSize: 12, fontWeight: 600, marginTop: 4 }}>SORU</div>
                        </div>
                        <div style={{ width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.08)' }} />
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2.8em', fontWeight: 900, color: msgColor, lineHeight: 1 }}>{successRate}<span style={{ fontSize: '0.45em', opacity: 0.7 }}>%</span></div>
                            <div style={{ color: '#6b7280', fontSize: 12, fontWeight: 600, marginTop: 4 }}>BAŞARI</div>
                        </div>
                        <div style={{ width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.08)' }} />
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '2em', fontWeight: 900, color: '#f0b232', lineHeight: 1 }}>
                                <FaBolt size={18} />{xpEarned}
                            </div>
                            <div style={{ color: '#6b7280', fontSize: 12, fontWeight: 600, marginTop: 4 }}>XP</div>
                        </div>
                    </div>

                    <p style={{ ...styles.resultMessage, color: msgColor, fontWeight: 700 }}>{message}</p>

                    <div style={styles.resultBtnGroup}>
                        <button onClick={resetQuiz} style={styles.primaryBtn}>
                            <FaRedo style={{ marginRight: '8px' }} /> Menüye Dön
                        </button>
                        <Link to="/eng-learn" style={styles.secondaryBtn}>Eğitim Merkezi</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizResult;
