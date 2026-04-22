import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import { FaCheckCircle, FaTimesCircle, FaCheckDouble, FaBolt, FaFire } from 'react-icons/fa';

import styles from './grammarQuizStyles';

// -- dynamic style helpers (pass 2) --

// -- extracted inline style constants --

const _st1074 = styles.quizBox;

const _st1075 = styles.expSection;

// Circular timer ring

const TimerRing = ({ timeLeft, total }) => {
    const r = 24;

    const circ = 2 * Math.PI * r;

    const pct = timeLeft / total;

    const color = timeLeft <= 5 ? '#f23f42' : timeLeft <= 10 ? '#f0b232' : '#5865f2';

    return (
        <div>
            <svg width="58" height="58">
                <circle cx="29" cy="29" r={r} fill="none" stroke="#2e3035" strokeWidth="4" />

                <circle
                    cx="29"
                    cy="29"
                    r={r}
                    fill="none"
                    stroke={color}
                    strokeWidth="4"
                    strokeDasharray={circ}
                    strokeDashoffset={circ * (1 - pct)}
                    strokeLinecap="round"
                />
            </svg>

            <span
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',

                    transform: 'translate(-50%,-50%)',

                    color,
                    fontWeight: 700,
                    fontSize: '1em',
                }}
            >
                {timeLeft}
            </span>
        </div>
    );
};

const QuizView = ({
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    progress,

    selectedOption,
    setSelectedOption,
    inputText,
    setInputText,

    isAnswered,
    isCorrect,

    streak = 0,
    xpEarned = 0,
    timerMode = false,
    timeLeft = 20,
    TIMER_SECONDS = 20,

    resultAnim,

    handleCheck,
    handleNext,
    handleMarkKnown,
    resetQuiz,

    isLoading = false,
    error = null,
}) => {
    const [xpPop, setXpPop] = useState(null);

    const { t } = useTranslation();

    useEffect(() => {
        if (resultAnim === 'correct') {
            setXpPop(true);

            const timer = setTimeout(() => setXpPop(false), 1200);

            return () => clearTimeout(timer);
        }
    }, [resultAnim, currentQuestionIndex]);

    if (isLoading) return <div>{t('common.loading')}</div>;

    if (error) return <div role="alert">{error}</div>;

    if (!currentQuestion) {
        return (
            <div style={styles.container}>
                <div style={styles.resultCard}>
                    <h2>{t('education.levelCompleted')} 🎉</h2>

                    <button
                        onClick={resetQuiz}
                        style={styles.primaryBtn}
                        aria-label={t('common.back')}
                    >
                        {t('common.back')}
                    </button>
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
                    <button
                        aria-label={t('quiz.resetQuiz', 'Reset quiz')}
                        onClick={resetQuiz}
                        style={styles.smallBackBtn}
                    >
                        ✕ Çıkış
                    </button>

                    <div style={styles.progressBarBg}>
                        <div style={{ ...styles.progressBarFill, width: `${progress}%` }}></div>
                    </div>

                    {/* Streak + XP badges */}

                    <div>
                        {streak >= 2 && (
                            <div>
                                <FaFire color="#f06320" size={14} />

                                <span>{streak}</span>
                            </div>
                        )}

                        <div>
                            <FaBolt color="#5865f2" size={12} />

                            <span>{xpEarned} XP</span>
                        </div>

                        {timerMode && <TimerRing timeLeft={timeLeft} total={TIMER_SECONDS} />}
                    </div>
                </div>

                <div style={_st1074}>
                    {/* XP Pop */}

                    {xpPop && <div>+{10 + (streak >= 2 ? 5 : 0)} XP</div>}

                    {/* Question */}

                    <div style={styles.questionSection}>
                        <h2 style={styles.questionText}>
                            {currentQuestion.question.split('_____').map((part, i, arr) => (
                                <React.Fragment key={`item-${Math.random()}`}>
                                    {part}

                                    {i < arr.length - 1 && (
                                        <span
                                            style={{
                                                ...styles.blankSpace,

                                                borderColor: isAnswered
                                                    ? isCorrect
                                                        ? '#23a559'
                                                        : '#f23f42'
                                                    : '#5865f2',
                                            }}
                                        >
                                            {isAnswered
                                                ? (currentQuestion.type === 'choice'
                                                      ? selectedOption
                                                      : inputText) || '___'
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
                                        if (opt === currentQuestion.answer)
                                            btnStyle = { ...btnStyle, ...styles.correctBtn };
                                        else if (opt === selectedOption)
                                            btnStyle = { ...btnStyle, ...styles.wrongBtn };
                                        else btnStyle = { ...btnStyle, opacity: 0.5 };
                                    } else if (selectedOption === opt) {
                                        btnStyle = { ...btnStyle, ...styles.selectedBtn };
                                    }

                                    return (
                                        <button
                                            aria-label={opt}
                                            key={`item-${idx}`}
                                            onClick={() => !isAnswered && setSelectedOption(opt)}
                                            style={btnStyle}
                                            disabled={isAnswered}
                                        >
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
                                placeholder={t('quiz.answerPlaceholder', 'Write your answer here...')}
                                style={{
                                    ...styles.textInput,
                                    borderColor: isAnswered
                                        ? isCorrect
                                            ? '#23a559'
                                            : '#f23f42'
                                        : '#5865f2',
                                }}
                                disabled={isAnswered}
                                aria-label={t('quiz.textInput', 'Text Input')}
                            />
                        )}
                    </div>

                    {/* Footer */}

                    <div style={styles.footer}>
                        {!isAnswered ? (
                            <div style={styles.actionButtonGroup}>
                                <button
                                    aria-label={t('quiz.markAsKnown', 'Mark as known')}
                                    onClick={handleMarkKnown}
                                    style={styles.knownBtn}
                                    title="Bunu biliyorum, tekrar sorma"
                                >
                                    <FaCheckDouble /> Bunu Biliyorum (Geç)
                                </button>

                                <button
                                    aria-label={t('quiz.check', 'Check')}
                                    onClick={handleCheck}
                                    style={styles.checkBtn}
                                    disabled={
                                        currentQuestion.type === 'choice'
                                            ? !selectedOption
                                            : !inputText
                                    }
                                >
                                    KONTROL ET
                                </button>
                            </div>
                        ) : (
                            <div
                                style={{
                                    ...styles.feedbackBox,

                                    borderLeft: isCorrect
                                        ? '5px solid #23a559'
                                        : '5px solid #f23f42',

                                    backgroundColor: isCorrect
                                        ? 'rgba(67, 181, 129, 0.1)'
                                        : 'rgba(240, 71, 71, 0.1)',
                                }}
                            >
                                <div>
                                    {isCorrect ? (
                                        <FaCheckCircle size={28} color="#23a559" />
                                    ) : (
                                        <FaTimesCircle size={28} color="#f23f42" />
                                    )}

                                    <div>
                                        <strong
                                            style={{
                                                fontSize: '1.2em',
                                                color: isCorrect ? '#23a559' : '#f23f42',
                                                display: 'block',
                                            }}
                                        >
                                            {isCorrect ? '✨ Doğru Cevap!' : 'Yanlış Cevap'}
                                        </strong>

                                        {!isCorrect && (
                                            <span>
                                                Doğru cevap:{' '}
                                                <strong>{currentQuestion.answer}</strong>
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {currentQuestion.explanation && (
                                    <div style={styles.explanationContainer}>
                                        {currentQuestion.explanation.title && (
                                            <div style={styles.expTitle}>
                                                📖 {currentQuestion.explanation.title}
                                            </div>
                                        )}

                                        {currentQuestion.explanation.translation && (
                                            <div style={styles.expTranslation}>
                                                <em>"{currentQuestion.explanation.translation}"</em>
                                            </div>
                                        )}

                                        <div style={styles.separator}></div>

                                        {currentQuestion.explanation.rule && (
                                            <div style={styles.expSection}>
                                                <strong>Kural:</strong>{' '}
                                                {currentQuestion.explanation.rule}
                                            </div>
                                        )}

                                        {currentQuestion.explanation.tips && (
                                            <div style={styles.expSection}>
                                                <strong>Tip:</strong>{' '}
                                                {currentQuestion.explanation.tips}
                                            </div>
                                        )}

                                        {currentQuestion.explanation.examples && (
                                            <div style={_st1075}>
                                                <strong>Örnekler:</strong>

                                                {currentQuestion.explanation.examples.map(
                                                    (ex, i) => (
                                                        <div
                                                            key={`item-${i}`}
                                                            style={styles.exampleItem}
                                                        >
                                                            • {ex}
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div>
                                    <button
                                        aria-label={t('quiz.next', 'Next')}
                                        onClick={handleNext}
                                        style={
                                            isCorrect ? styles.nextBtnCorrect : styles.nextBtnWrong
                                        }
                                    >
                                        {currentQuestionIndex + 1 === totalQuestions
                                            ? 'BİTİR VE SONUÇLARI GÖR'
                                            : 'DEVAM ET →'}
                                    </button>

                                    <button
                                        aria-label={t('quiz.iKnewIt', 'I actually knew it')}
                                        onClick={handleMarkKnown}
                                        style={styles.feedbackKnownBtn}
                                    >
                                        <FaCheckDouble /> Aslında Biliyordum (Öğrenildi Olarak
                                        İşaretle)
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

QuizView.propTypes = {
    timeLeft: PropTypes.object,

    total: PropTypes.number,
};

export default QuizView;
