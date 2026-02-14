import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaCheckDouble } from 'react-icons/fa';
import styles from './grammarQuizStyles';

const QuizView = ({
    currentQuestion, currentQuestionIndex, totalQuestions, progress,
    selectedOption, setSelectedOption, inputText, setInputText,
    isAnswered, isCorrect,
    handleCheck, handleNext, handleMarkKnown, resetQuiz,
}) => {
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

    return (
        <div style={styles.scrollWrapper}>
            <div style={styles.container}>
                <div style={styles.topBar}>
                    <button onClick={resetQuiz} style={styles.smallBackBtn}>{'✕'} {'Çık'}</button>
                    <div style={styles.progressBarBg}>
                        <div style={{ ...styles.progressBarFill, width: `${progress}%` }}></div>
                    </div>
                </div>

                <div style={styles.quizBox}>
                    {/* Question */}
                    <div style={styles.questionSection}>
                        <h2 style={styles.questionText}>
                            {currentQuestion.question.split('_____').map((part, i, arr) => (
                                <React.Fragment key={i}>
                                    {part}
                                    {i < arr.length - 1 && (
                                        <span style={{
                                            ...styles.blankSpace,
                                            borderColor: isAnswered ? (isCorrect ? '#43b581' : '#f04747') : '#7289da'
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
                                style={{ ...styles.textInput, borderColor: isAnswered ? (isCorrect ? '#43b581' : '#f04747') : '#7289da' }}
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
                                borderLeft: isCorrect ? '5px solid #43b581' : '5px solid #f04747',
                                backgroundColor: isCorrect ? 'rgba(67, 181, 129, 0.1)' : 'rgba(240, 71, 71, 0.1)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                                    {isCorrect ? <FaCheckCircle size={28} color="#43b581" /> : <FaTimesCircle size={28} color="#f04747" />}
                                    <div>
                                        <strong style={{ fontSize: '1.2em', color: isCorrect ? '#43b581' : '#f04747', display: 'block' }}>
                                            {isCorrect ? "Doğru Cevap!" : "Yanlış Cevap"}
                                        </strong>
                                        {!isCorrect && (
                                            <span style={{ color: '#dbdee1', fontSize: '0.9em' }}>
                                                Doğrusu: <strong style={{ color: '#43b581' }}>{currentQuestion.answer}</strong>
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {currentQuestion.explanation && (
                                    <div style={styles.explanationContainer}>
                                        {currentQuestion.explanation.title && (
                                            <div style={styles.expTitle}>{'📖'} {currentQuestion.explanation.title}</div>
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
                                                <strong style={{ color: '#00a8fc' }}>{'İ'}pucu:</strong> {currentQuestion.explanation.tips}
                                            </div>
                                        )}
                                        {currentQuestion.explanation.examples && (
                                            <div style={{ ...styles.expSection, marginTop: '10px' }}>
                                                <strong style={{ color: '#dbdee1', display: 'block', marginBottom: 3 }}>{'Ö'}rnekler:</strong>
                                                {currentQuestion.explanation.examples.map((ex, i) => (
                                                    <div key={i} style={styles.exampleItem}>{'•'} {ex}</div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <button onClick={handleNext} style={isCorrect ? styles.nextBtnCorrect : styles.nextBtnWrong}>
                                        {currentQuestionIndex + 1 === totalQuestions ? 'BİTİR VE SONUÇLARI GÖR' : 'DEVAM ET'}
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
