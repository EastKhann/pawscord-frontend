// frontend/src/EnglishHub.js

import React from 'react';
import { Link } from 'react-router-dom';
// 👇 1. FaMicrophone İKONUNU EKLE
import { FaBookOpen, FaBrain, FaArrowLeft, FaChartLine, FaMicrophone, FaMicrophoneAlt } from 'react-icons/fa';
const EnglishHub = () => {
    return (
        <div style={styles.scrollableViewport}>
            <div style={styles.contentWrapper}>

                {/* Header */}
                <div style={styles.headerSection}>
                    <Link to="/" style={styles.backButton}>
                        <FaArrowLeft /> Sohbet'e Dön
                    </Link>
                    <h1 style={styles.title}>🎓 İngilizce Eğitim Merkezi</h1>
                    <p style={styles.subtitle}>Kendini geliştirmek için bir modül seç ve öğrenmeye başla.</p>
                </div>

                {/* Kartlar Grid */}
                <div style={styles.cardGrid}>

                    {/* Kelime Kartı */}
                    <Link to="/eng-learn/vocab" style={styles.cardLink}>
                        <div style={{...styles.card, borderBottom: '4px solid #23a559'}}>
                            <div style={styles.iconCircleGreen}>
                                <FaBookOpen size={40} color="#23a559" />
                            </div>
                            <h2 style={styles.cardTitle}>Kelime Hazinesi</h2>
                            <p style={styles.cardDesc}>A1'den B2'ye seviyelere ayrılmış kelime kartlarıyla pratik yap.</p>
                            <span style={styles.actionLink}>Çalışmaya Başla →</span>
                        </div>
                    </Link>

                    {/* Gramer Kartı */}
                    <Link to="/eng-learn/grammar" style={styles.cardLink}>
                        <div style={{...styles.card, borderBottom: '4px solid #5865f2'}}>
                            <div style={styles.iconCircleBlue}>
                                <FaBrain size={40} color="#5865f2" />
                            </div>
                            <h2 style={styles.cardTitle}>Grammar & Quiz</h2>
                            <p style={styles.cardDesc}>Dilbilgisi kurallarını testlerle pekiştir ve skorunu yükselt.</p>
                            <span style={{...styles.actionLink, color: '#5865f2'}}>Test Çöz →</span>
                        </div>
                    </Link>

                    {/* 👇👇👇 2. YENİ EKLENEN SESLİ PRATİK KARTI 👇👇👇 */}
                    <Link to="/eng-learn/voice" style={styles.cardLink}>
                        <div style={{...styles.card, borderBottom: '4px solid #eb459e'}}>
                            <div style={styles.iconCirclePink}>
                                <FaMicrophone size={40} color="#eb459e" />
                            </div>
                            <h2 style={styles.cardTitle}>Sesli Pratik (AI)</h2>
                            <p style={styles.cardDesc}>Mikrofonu kullan, yapay zeka ile karşılıklı İngilizce konuş.</p>
                            <span style={{...styles.actionLink, color: '#eb459e'}}>Konuşmaya Başla →</span>
                        </div>
                    </Link>
                    <Link to="/eng-learn/pronunciation" style={styles.cardLink}>
    <div style={{...styles.card, borderBottom: '4px solid #f0b232'}}>
        <div style={styles.iconCircleYellow}>
            <FaMicrophoneAlt size={40} color="#f0b232" />
        </div>
        <h2 style={styles.cardTitle}>Telaffuz Testi</h2>
        <p style={styles.cardDesc}>Zor kelimeleri doğru söyleyebiliyor musun? Kendini test et.</p>
        <span style={{...styles.actionLink, color: '#f0b232'}}>Test Yap →</span>
    </div>
</Link>


                    {/* İstatistik Kartı (Yakında) */}
                    <div style={{...styles.card, borderBottom: '4px solid #f0b232', opacity: 0.8, cursor: 'default'}}>
                        <div style={styles.iconCircleYellow}>
                            <FaChartLine size={40} color="#f0b232" />
                        </div>
                        <h2 style={styles.cardTitle}>İlerleme Durumu</h2>
                        <p style={styles.cardDesc}>Haftalık öğrenme istatistiklerin yakında burada olacak.</p>
                        <span style={{...styles.actionLink, color: '#f0b232'}}>Çok Yakında</span>
                    </div>

                </div>
            </div>
        </div>
    );
};

const styles = {
    // ... (Diğer stiller aynı kalacak) ...

    scrollableViewport: {
        left: 0, width: '100%', backgroundColor: '#313338',
        WebkitOverflowScrolling: 'touch', zIndex: 9999, display: 'block'
    },
    contentWrapper: {
        width: '100%', maxWidth: '1000px', margin: '0 auto',
        padding: 'max(20px, env(safe-area-inset-top)) 20px 60px 20px',
        boxSizing: 'border-box', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-start', minHeight: '100%'
    },
    headerSection: { textAlign: 'center', marginBottom: '30px', position: 'relative', width: '100%', maxWidth: '600px' },
    backButton: { display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#949ba4', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9em', padding: '12px 16px', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '8px', marginBottom: '20px', alignSelf: 'flex-start', zIndex: 20 },
    title: { fontSize: '1.8em', color: '#f2f3f5', marginBottom: '10px', marginTop: '0', fontWeight: '700' },
    subtitle: { color: '#b5bac1', fontSize: '1em', lineHeight: '1.4' },
    cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '25px', width: '100%' },
    cardLink: { textDecoration: 'none', display: 'block' },
    card: { backgroundColor: '#232428', borderRadius: '20px', padding: '30px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%', minHeight: '240px', boxShadow: '0 8px 20px rgba(0,0,0,0.2)', border: '1px solid #1e1f22', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' },

    iconCircleGreen: { width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(35, 165, 89, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' },
    iconCircleBlue: { width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(88, 101, 242, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' },
    iconCircleYellow: { width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(240, 178, 50, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' },

    // 👇 3. YENİ STİL: PEMBE İKON DAİRESİ
    iconCirclePink: {
        width: '60px', height: '60px', borderRadius: '50%',
        backgroundColor: 'rgba(235, 69, 158, 0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '15px'
    },

    cardTitle: { color: '#dbdee1', margin: '0 0 10px 0', fontSize: '1.3em', fontWeight: '600' },
    cardDesc: { color: '#949ba4', fontSize: '0.9em', lineHeight: '1.5', marginBottom: '20px', flexGrow: 1 },
    actionLink: { color: '#23a559', fontWeight: 'bold', fontSize: '0.95em', marginTop: 'auto', display: 'inline-block', padding: '5px 10px', borderRadius: '5px', backgroundColor: 'rgba(35, 165, 89, 0.1)' }
};

export default EnglishHub;

