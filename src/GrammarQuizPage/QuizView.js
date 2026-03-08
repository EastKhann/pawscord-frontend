import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaCheckDouble, FaBolt, FaFire } from 'react-icons/fa';
import styles from './grammarQuizStyles';

// Circular timer ring
const TimerRing = ({ timeLeft, total }) => {
    const r = 24;
    const circ = 2 * Math.PI * r;
    const pct = timeLeft / total;
    const color = timeLeft <= 5 ? '#f23f42' : timeLeft <= 10 ? '#f0b232' : '#5865f2';
    return (
        <div style={{ position: 'relative', width: 58, height: 58, flexShrink: 0 }}>
            <svg width="58" height="58" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="29" cy="29" r={r} fill="none" stroke="#2e3035" strokeWidth="4" />
                <circle
                    cx="29" cy="29" r={r} fill="none"
                    stroke={color} strokeWidth="4"
                    strokeDasharray={circ}
                    strokeDashoffset={circ * (1 - pct)}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.9s linear, stroke 0.3s' }}
                />
            </svg>
            <span style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                color, fontWeight: 700, fontSize: '1em'
            }}>{timeLeft}</span>
        </div>
    );
};

const QuizView = ({
    currentQuestion, currentQuestionIndex, totalQuestions, progress,
    selectedOption, setSelectedOption, inputText, setInputText,
    isAnswered, isCorrect,
    streak = 0, xpEarned = 0, timerMode = false, timeLeft = 20, TIMER_SECONDS = 20,
    resultAnim,
    handleCheck, handleNext, handleMarkKnown, resetQuiz,
}) => {
    const [xpPop, setXpPop] = useState(null);

    useEffect(() => {
        if (resultAnim === 'correct') {
            setXpPop(true);
            const t = setTimeout(() => setXpPop(false), 1200);
            return () => clearTimeout(t);
        }
    }, [resultAnim, currentQuestionIndex]);

    if (!currentQuestion) {
        return (
            <div style={styles.container}>
                <div style={styles.resultCard}>
                    <h2>Harika! 🎉</h2>
                    <p>Bu seviyedeki tüm soruları bitirdin.</p>
                    <button onClick={resetQuiz} style={styles.primaryBtn}>Geri Dön</button>
                </div>
            </div>
        );
    }

    const shakeStyle = resultAnim === 'wrong' ? { animation: 'shake 0.4s ease' } : {};

    return (
        <div style={styles.scrollWrapper}>
            <style>{`
                @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-6px)} 80%{transform:translateX(6px)} }
                @keyframes xpPop { 0%{opacity:0;transform:translateY(0) scale(0.5)} 30%{opacity:1;transform:translateY(-20px) scale(1.2)} 80%{opacity:1;transform:translateY(-36px) scale(1)} 100%{opacity:0;transform:translateY(-50px) scale(0.9)} }
                @keyframes streakPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.18)} }
            `}</style>
            <div style={styles.container}>
                <div style={styles.topBar}>
                    <button onClick={resetQuiz} style={styles.smallBackBtn}>✕ Çık</button>
                    <div style={styles.progressBarBg}>
                        <div style={{ ...styles.progressBarFill, width: `${progress}%` }}></div>
                    </div>
                    {/* Streak + XP badges */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                        {streak >= 2 && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 3, background: 'rgba(240,99,32,0.18)', border: '1px solid #f06320', borderRadius: 20, padding: '3px 10px', animation: 'streakPulse 1s infinite' }}>
                                <FaFire color="#f06320" size={14} />
                                <span style={{ color: '#f06320', fontWeight: 700, fontSize: '0.85em' }}>{streak}</span>
                            </div>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 3, background: 'rgba(88,101,242,0.18)', border: '1px solid #5865f2', borderRadius: 20, padding: '3px 10px' }}>
                            <FaBolt color="#5865f2" size={12} />
                            <span style={{ color: '#5865f2', fontWeight: 700, fontSize: '0.85em' }}>{xpEarned} XP</span>
                        </div>
                        {timerMode && <TimerRing timeLeft={timeLeft} total={TIMER_SECONDS} />}
                    </div>
                </div>

                <div style={{ ...styles.quizBox, ...shakeStyle, position: 'relative' }}>
                    {/* XP Pop */}
                    {xpPop && (
                        <div style={{ position: 'absolute', top: 16, right: 24, animation: 'xpPop 1.1s ease forwards', pointerEvents: 'none', color: '#23a559', fontWeight: 800, fontSize: '1.2em', zIndex: 99 }}>
                            +{10 + (streak >= 2 ? 5 : 0)} XP
                        </div>
                    )}

                    {/* Question */}
                    <div style={styles.questionSection}>
                        <h2 style={styles.questionText}>
                            {currentQuestion.question.split('_____').map((part, i, arr) => (
                                <React.Fragment key={i}>
                                    {part}
                                    {i < arr.length - 1 && (
                                        <span style={{
                                            ...styles.blankSpace,
                                            borderColor: isAnswered ? (isCorrect ? '#23a559' : '#f23f42') : '#5865f2'
                                        }}>
                                            {isAnswered
                                                ? (currentQuestion.type === 'choice' ? selectedOption : inputText) || '___'
                                                : '_____'}
                                        </span>
                                    )}
                                </React.Fragment>
                            ))}
                        </h2>
                    </div>

                    {/* Interaction */}
                    <div style={styles.interactionArea}>
                        {currentQuestion.type === 'choice' && (
                            <div style={styles.optionsGrid}>
                                {currentQuestion.options.map((opt, idx) => {
                                    let btnStyle = styles.optionBtn;
                                    if (isAnswered) {
                                        if (opt === currentQuestion.answer) btnStyle = { ...btnStyle, ...styles.correctBtn };
                                        else if (opt === selectedOption) btnStyle = { ...btnStyle, ...styles.wrongBtn };
                                        else btnStyle = { ...btnStyle, opacity: 0.5 };
                                    } else if (selectedOption === opt) {
                                        btnStyle = { ...btnStyle, ...styles.selectedBtn };
                                    }
                                    return (
                                        <button key={idx} onClick={() => !isAnswered && setSelectedOption(opt)} style={btnStyle} disabled={isAnswered}>
                                            {opt}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                        {currentQuestion.type === 'input' && (
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Cevabı buraya yazın..."
                                style={{ ...styles.textInput, borderColor: isAnswered ? (isCorrect ? '#23a559' : '#f23f42') : '#5865f2' }}
                                disabled={isAnswered}
                            />
                        )}
                    </div>

                    {/* Footer */}
                    <div style={styles.footer}>
                        {!isAnswered ? (
                            <div style={styles.actionButtonGroup}>
                                <button onClick={handleMarkKnown} style={styles.knownBtn} title="Bunu biliyorum, bir daha sorma">
                                    <FaCheckDouble /> Biliyorum (Geç)
                                </button>
                                <button onClick={handleCheck} style={styles.checkBtn} disabled={currentQuestion.type === 'choice' ? !selectedOption : !inputText}>
                                    KONTROL ET
                                </button>
                            </div>
                        ) : (
                            <div style={{
                                ...styles.feedbackBox,
                                borderLeft: isCorrect ? '5px solid #23a559' : '5px solid #f23f42',
                                backgroundColor: isCorrect ? 'rgba(67, 181, 129, 0.1)' : 'rgba(240, 71, 71, 0.1)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                                    {isCorrect ? <FaCheckCircle size={28} color="#23a559" /> : <FaTimesCircle size={28} color="#f23f42" />}
                                    <div>
                                        <strong style={{ fontSize: '1.2em', color: isCorrect ? '#23a559' : '#f23f42', display: 'block' }}>
                                            {isCorrect ? '✨ Doğru Cevap!' : '❌ Yanlış Cevap'}
                                        </strong>
                                        {!isCorrect && (
                                            <span style={{ color: '#dbdee1', fontSize: '0.9em' }}>
                                                Doğrusu: <strong style={{ color: '#23a559' }}>{currentQuestion.answer}</strong>
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {currentQuestion.explanation && (
                                    <div style={styles.explanationContainer}>
                                        {currentQuestion.explanation.title && (
                                            <div style={styles.expTitle}>📖 {currentQuestion.explanation.title}</div>
                                        )}
                                        {currentQuestion.explanation.translation && (
                                            <div style={styles.expTranslation}><em>"{currentQuestion.explanation.translation}"</em></div>
                                        )}
                                        <div style={styles.separator}></div>
                                        {currentQuestion.explanation.rule && (
                                            <div style={styles.expSection}>
                                                <strong style={{ color: '#f0b232' }}>Kural:</strong> {currentQuestion.explanation.rule}
                                            </div>
                                        )}
                                        {currentQuestion.explanation.tips && (
                                            <div style={styles.expSection}>
                                                <strong style={{ color: '#00a8fc' }}>İpucu:</strong> {currentQuestion.explanation.tips}
                                            </div>
                                        )}
                                        {currentQuestion.explanation.examples && (
                                            <div style={{ ...styles.expSection, marginTop: '10px' }}>
                                                <strong style={{ color: '#dbdee1', display: 'block', marginBottom: 3 }}>Örnekler:</strong>
                                                {currentQuestion.explanation.examples.map((ex, i) => (
                                                    <div key={i} style={styles.exampleItem}>• {ex}</div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <button onClick={handleNext} style={isCorrect ? styles.nextBtnCorrect : styles.nextBtnWrong}>
                                        {currentQuestionIndex + 1 === totalQuestions ? 'BİTİR VE SONUÇLARI GÖR' : 'DEVAM ET →'}
                                    </button>
                                    <button onClick={handleMarkKnown} style={styles.feedbackKnownBtn}>
                                        <FaCheckDouble /> Bunu aslında biliyordum (Öğrenildi Say)
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizView;
