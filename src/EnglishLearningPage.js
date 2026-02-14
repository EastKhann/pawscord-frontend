import { Link } from 'react-router-dom';
import useEnglishLearning from './EnglishLearningPage/useEnglishLearning';
import { styles } from './EnglishLearningPage/englishLearningStyles';

function EnglishLearningPage() {
    const e = useEnglishLearning();

    if (e.isLoading) return <div style={styles.pageContainer}>Yükleniyor...</div>;

    if (e.error) {
        return (
            <div style={styles.pageContainer}>
                <h1 style={styles.errorText}>Hata: {e.error}</h1>
                <Link to="/" style={styles.backButton}>Sohbete Geri Dön</Link>
            </div>
        );
    }

    return (
        <div style={styles.pageContainer}>
            <Link to="/eng-learn" style={styles.backButton}>{'←'} Merkeze Dön</Link>

            <div style={styles.quizContainer}>
                <h1 style={styles.pageTitle}>{'İ'}ngilizce Kelime {'Öğren'}</h1>

                <div style={styles.levelAndProgressContainer}>
                    <div style={styles.controls}>
                        <label htmlFor="level-select" style={styles.label}>Seviye:</label>
                        <select id="level-select" value={e.currentLevel}
                            onChange={(ev) => e.setCurrentLevel(ev.target.value)} style={styles.select}>
                            {e.availableLevels.map(level => (
                                <option key={level} value={level}>{level.toUpperCase()} ({e.allData[level]?.length || 0} kelime)</option>
                            ))}
                        </select>
                    </div>
                    <div style={styles.progressStats}>
                        <span>Bildiğiniz: <strong>{e.levelStats.knownWords}</strong></span>
                        <span>Toplam: <strong>{e.levelStats.totalWords}</strong></span>
                    </div>
                </div>

                <div style={{ ...styles.progressBarBackground, marginBottom: '20px' }}>
                    <div style={{ ...styles.progressBarFill, width: `${e.levelStats.progress}%` }}>
                        {e.levelStats.progress > 15 && <span>{e.levelStats.progress}%</span>}
                    </div>
                    {e.levelStats.progress <= 15 && <span style={styles.progressTextOutside}>{e.levelStats.progress}%</span>}
                </div>

                <div>
                    <h4 style={styles.totalStatsHeader}>Genel Toplam {'İ'}lerleme</h4>
                    <div style={{ ...styles.progressStats, marginBottom: '8px' }}>
                        <span>Toplam Bildiğiniz: <strong>{e.totalStats.totalKnownWords}</strong></span>
                        <span>Toplam Kelime: <strong>{e.totalStats.totalWords}</strong></span>
                    </div>
                    <div style={styles.progressBarBackground}>
                        <div style={{ ...styles.progressBarFill, ...styles.totalProgressBarFill, width: `${e.totalStats.progress}%` }}>
                            {e.totalStats.progress > 15 && <span>{e.totalStats.progress}%</span>}
                        </div>
                        {e.totalStats.progress <= 15 && <span style={styles.progressTextOutside}>{e.totalStats.progress}%</span>}
                    </div>
                </div>

                <div style={styles.wordArea}>
                    {e.levelComplete ? (
                        <h2 style={{ ...styles.term, color: 'var(--text-positive)' }}>
                            Tebrikler! {'🎉'}<br />Bu seviyedeki tüm kelimeleri tamamladınız.
                        </h2>
                    ) : e.currentWord ? (
                        <>
                            <h2 style={styles.term}>{e.currentWord.term}</h2>
                            {e.showAnswer && <p style={styles.meanings}>{e.currentWord.meanings.join(' / ')}</p>}
                        </>
                    ) : (
                        <p>Bu seviyede kelime bulunamadı.</p>
                    )}
                </div>

                <div style={styles.buttonGroup}>
                    <button style={styles.actionButton} onClick={() => e.setShowAnswer(true)}
                        disabled={e.showAnswer || !e.currentWord || e.levelComplete}>
                        Cevabı Göster
                    </button>
                    <button style={{ ...styles.actionButton, ...styles.knownButton }}
                        onClick={e.handleMarkAsKnown} disabled={!e.currentWord || e.levelComplete}>
                        Biliyorum (Geç)
                    </button>
                    <button style={{ ...styles.actionButton, ...styles.primaryButton }}
                        onClick={e.getNewWord} disabled={e.levelComplete || e.availableWordsForLevel.length <= 1}>
                        Yeni Kelime
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EnglishLearningPage;
