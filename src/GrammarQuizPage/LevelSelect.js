/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaClock, FaPlay } from 'react-icons/fa';
import { LEVELS, loadAllQuestions } from '../data/grammarQuestions';
import toast from '../utils/toast';
import styles from './grammarQuizStyles';

// -- dynamic style helpers (pass 2) --

// -- extracted inline style constants --

const _st1068 = styles.levelIcon;
const _st1069 = styles.levelCount;
const _st1070 = {
    fontSize: '0.78em',
    fontWeight: 700,
    padding: '6px 12px',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(88,101,242,0.14)',
    color: '#8b94ff',
    transition: 'all 0.12s',
};
const _st1071 = {
    fontSize: '0.78em',
    fontWeight: 700,
    padding: '6px 12px',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(240,178,50,0.12)',
    color: '#f0b232',
    transition: 'all 0.12s',
};

const injectCSS = (id, css) => {
    if (document.getElementById(id)) return;
    const s = document.createElement('style');
    s.id = id;
    s.textContent = css;
    document.head.appendChild(s);
};

const LS_CSS = `
@keyframes gq-cardGlow {
  0%,100% { box-shadow: 0 6px 28px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05); }
  50% { box-shadow: 0 6px 28px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 22px var(--glow-color, rgba(88,101,242,0.2)); }
}
@keyframes gq-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
.gq-level-card { transition: transform 0.2s ease, box-shadow 0.2s ease !important; }
.gq-level-card:hover { transform: translateY(-4px) !important; }
.gq-level-card:hover .gq-icon { animation: gq-float 2s ease-in-out infinite; }
.gq-level-card:active { transform: translateY(-1px) scale(0.98) !important; }
`;

const LevelSelect = ({ knownQuestions, startQuiz }) => {
    const { t } = useTranslation();
    const [allQuestions, setAllQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        injectCSS('gq-level-css', LS_CSS);
        setIsLoading(true);
        loadAllQuestions()
            .then((qs) => {
                setAllQuestions(qs);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err?.message || 'Failed to load questions');
                setIsLoading(false);
            });
    }, []);

    if (isLoading) return <div>{t('common.loading')}</div>;
    if (error) return <div role="alert">{error}</div>;

    const colA = LEVELS.filter((l) => l.id.startsWith('A'));
    const colB = LEVELS.filter((l) => l.id.startsWith('B'));
    const colC = LEVELS.filter((l) => l.id.startsWith('C'));

    const renderLevelCard = (lvl) => {
        const totalInDb = allQuestions.filter((q) => q.level === lvl.id).length;
        const knownInLevel = allQuestions.filter(
            (q) => q.level === lvl.id && knownQuestions.includes(q.id)
        ).length;
        const remaining = totalInDb - knownInLevel;
        const done = remaining === 0;

        return (
            <div
                key={lvl.id}
                className="gq-level-card"
                style={{
                    ...styles.levelCard,
                    borderTop: `4px solid ${lvl.color}`,
                    boxShadow: `0 6px 28px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05), 0 -2px 16px ${lvl.color}22`,
                    '--glow-color': `${lvl.color}35`,
                    opacity: done ? 0.55 : 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0,
                }}
            >
                <div className="gq-icon" style={_st1068}>
                    {lvl.icon}
                </div>
                <div style={styles.levelName}>{lvl.name}</div>
                <div style={_st1069}>
                    {done ? (
                        <span>✓ {t('education.completed')}</span>
                    ) : (
                        <>
                            <span style={{ color: lvl.color, fontWeight: 700 }}>
                                {knownInLevel}
                            </span>{' '}
                            / <span>{totalInDb}</span>
                        </>
                    )}
                </div>
                {/* Mini progress bar */}
                {!done && totalInDb > 0 && (
                    <div>
                        <div
                            style={{
                                height: '100%',
                                borderRadius: 4,
                                width: `${Math.round((knownInLevel / totalInDb) * 100)}%`,
                                background: `linear-gradient(90deg,${lvl.color}cc,${lvl.color})`,
                                transition: 'width 0.6s ease',
                            }}
                        />
                    </div>
                )}
                <div>
                    <button
                        aria-label={t('education.normal')}
                        onClick={() =>
                            done
                                ? toast.success(t('education.levelCompleted'))
                                : startQuiz(lvl.id, false)
                        }
                        style={_st1070}
                    >
                        <FaPlay size={10} /> {t('education.normal')}
                    </button>
                    <button
                        aria-label={t('education.timed')}
                        onClick={() =>
                            done
                                ? toast.success(t('education.levelCompleted'))
                                : startQuiz(lvl.id, true)
                        }
                        style={_st1071}
                    >
                        <FaClock size={10} /> {t('education.timed')}
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div style={styles.scrollWrapper}>
            <div style={styles.container}>
                <div style={styles.headerArea}>
                    <Link to="/eng-learn" style={styles.backLink}>
                        <FaArrowLeft /> {t('education.hub')}
                    </Link>
                    <h1 style={styles.mainTitle}>🧠 {t('education.selectLevel')}</h1>
                    <p style={styles.subTitle}>A1'den C2'ye kadar. Hangisine cesaret edeceksin?</p>
                </div>
                <div style={styles.columnsWrapper}>
                    <div style={styles.column}>{colA.map((lvl) => renderLevelCard(lvl))}</div>
                    <div style={styles.column}>{colB.map((lvl) => renderLevelCard(lvl))}</div>
                    <div style={styles.column}>{colC.map((lvl) => renderLevelCard(lvl))}</div>
                </div>
            </div>
        </div>
    );
};

LevelSelect.propTypes = {
    knownQuestions: PropTypes.array,
    startQuiz: PropTypes.object,
};
export default LevelSelect;
