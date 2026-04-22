import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaTrophy, FaRedo, FaStar, FaRegStar, FaBolt, FaShareAlt } from 'react-icons/fa';
import styles from './grammarQuizStyles';

// Minimal canvas confetti — no external package needed
function launchConfetti(canvas) {
    const ctx = canvas.getContext('2d');
    const W = (canvas.width = window.innerWidth);
    const H = (canvas.height = window.innerHeight);
    const colors = ['#5865f2', '#f0b232', '#23a559', '#f23f42', '#00a8fc', '#eb459e'];
    const particles = Array.from({ length: 140 }, () => ({
        x: Math.random() * W,
        y: -10 - Math.random() * 100,
        w: 6 + Math.random() * 8,
        h: 4 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: -2 + Math.random() * 4,
        vy: 2 + Math.random() * 5,
        angle: Math.random() * Math.PI * 2,
        spin: (-0.1 + Math.random() * 0.2),
        opacity: 1,
    }));
    let running = true;
    let frame;
    function draw() {
        ctx.clearRect(0, 0, W, H);
        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            p.angle += p.spin;
            p.vy += 0.07;
            if (p.y > H) p.opacity -= 0.04;
            if (p.opacity <= 0) continue;
            ctx.save();
            ctx.globalAlpha = p.opacity;
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
        }
        if (running && particles.some((p) => p.opacity > 0)) {
            frame = requestAnimationFrame(draw);
        }
    }
    draw();
    return () => { running = false; cancelAnimationFrame(frame); };
}

// -- extracted inline style constants --
const _st1072 = styles.resultCard;
const _st1073 = styles.resultMessage;

const QuizResult = ({ score, totalQuestions, resetQuiz, isLoading = false, error = null }) => {
    const { t } = useTranslation();
    const canvasRef = useRef(null);
    const cleanupRef = useRef(null);

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
    const passed = successRate >= 60;

    useEffect(() => {
        if (!passed || !canvasRef.current) return;
        cleanupRef.current = launchConfetti(canvasRef.current);
        const timer = setTimeout(() => cleanupRef.current?.(), 4000);
        return () => { clearTimeout(timer); cleanupRef.current?.(); };
    }, [passed]);

    const handleShare = useCallback(async () => {
        const text = t('quiz.shareText', `I scored ${successRate}% on Pawscord Grammar Quiz! Can you beat me? 🎓`);
        if (navigator.share) {
            try {
                await navigator.share({ title: 'Pawscord Quiz', text, url: window.location.href });
            } catch {
                /* user cancelled or not supported */
            }
        } else {
            try {
                await navigator.clipboard.writeText(`${text} ${window.location.href}`);
            } catch {
                /* ignore */
            }
        }
    }, [successRate, t]);

    return (
        <div style={styles.scrollWrapper}>
            {passed && (
                <canvas
                    ref={canvasRef}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        pointerEvents: 'none',
                        zIndex: 9000,
                    }}
                    aria-hidden="true"
                />
            )}
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
                                    key={`item-${i}`}
                                    size={26}
                                    color="#f0b232"
                                    style={{
                                        animation: `starPop 0.4s ease ${i * 0.12}s both`,
                                        filter: 'drop-shadow(0 2px 8px rgba(240,178,50,0.6))',
                                    }}
                                />
                            ) : (
                                <FaRegStar key={`item-${i}`} size={26} color="#2e3035" />
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
                            aria-label={t('quiz.resetQuiz', 'Reset quiz')}
                            onClick={resetQuiz}
                            style={styles.primaryBtn}
                        >
                            <FaRedo /> {t('quiz.backToMenu', 'Menüye Dön')}
                        </button>
                        <button
                            onClick={handleShare}
                            style={{
                                ...styles.secondaryBtn,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                cursor: 'pointer',
                            }}
                            aria-label={t('quiz.share', 'Share result')}
                        >
                            <FaShareAlt /> {t('quiz.share', 'Share')}
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
