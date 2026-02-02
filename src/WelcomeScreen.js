// frontend/src/WelcomeScreen.js

import React, { useState, useCallback } from 'react';
import { FaBars, FaGamepad, FaUserFriends, FaCompass, FaMagic, FaUsers, FaDownload, FaCheck } from 'react-icons/fa';
import DownloadModal from './components/DownloadModal';
import { Capacitor } from '@capacitor/core';
import { getApiBase } from './utils/apiEndpoints';

const WelcomeScreen = ({
    isMobile,
    onOpenMenu,
    onOpenRightMenu,
    // App.js'den gelen veriler:
    updateAvailable,
    isDownloading,
    downloadProgress,
    updateStatusText,
    onStartUpdate,
    // 🔥 YENİ: Navigasyon Fonksiyonları
    onSwitchToFriends,
    onSwitchToAI,
    onSwitchToCinema
}) => {

    const [showDownload, setShowDownload] = useState(false);

    const isNativeApp = Capacitor.isNativePlatform();
    const isElectron = typeof window !== 'undefined' && typeof window.require === 'function';

    const shouldShowDownloadBtn = !isNativeApp && !isElectron;

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return "Günaydın!";
        if (hour >= 12 && hour < 18) return "Tünaydın!";
        if (hour >= 18 && hour < 22) return "İyi Akşamlar!";
        return "İyi Geceler!";
    };

    const API_BASE_URL = getApiBase();

    // Ortak Güncelleme Butonu Bileşeni
    const UpdateButtonComponent = () => {
        if (!updateAvailable) return null;

        if (isDownloading) {
            return (
                <div style={styles.headerProgressContainer} title={updateStatusText}>
                    <div style={{ ...styles.headerProgressBarFill, width: `${downloadProgress}%` }}></div>
                    <span style={styles.headerProgressText}>
                        {downloadProgress < 100 ? `%${downloadProgress}` : <FaCheck />}
                    </span>
                </div>
            );
        }

        return (
            <button
                onClick={onStartUpdate}
                style={styles.headerUpdateBtn}
                title="Yeni Güncelleme Mevcut! (Tıkla & Kur)"
            >
                <FaDownload size={14} />
                <span style={{ marginLeft: '5px', fontSize: '12px' }}>GÜNCELLE</span>
            </button>
        );
    };

    return (
        <div style={styles.container}>

            {showDownload && (
                <DownloadModal
                    onClose={() => setShowDownload(false)}
                    apiBaseUrl={API_BASE_URL}
                />
            )}

            {/* --- MOBİL HEADER --- */}
            {isMobile && (
                <div style={styles.mobileHeader}>
                    <button onClick={onOpenMenu} style={styles.menuButton} title="Menüyü Aç">
                        <FaBars size={22} />
                    </button>

                    <span style={styles.headerTitle}>Pawscord</span>

                    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                        <UpdateButtonComponent />

                        {shouldShowDownloadBtn && (
                            <button onClick={() => setShowDownload(true)} style={{ ...styles.menuButton, padding: '6px' }}>
                                <FaDownload size={16} />
                            </button>
                        )}

                        <button onClick={onOpenRightMenu} style={styles.menuButton}>
                            <FaUsers size={22} />
                        </button>
                    </div>
                </div>
            )}

            {/* --- MASAÜSTÜ İNDİRME BUTONLARI (SAĞ ÜST) --- */}
            {!isMobile && (
                <div style={styles.desktopTopRight}>
                    <UpdateButtonComponent />

                    {shouldShowDownloadBtn && (
                        <button
                            onClick={() => setShowDownload(true)}
                            style={styles.desktopDownloadBtn}
                        >
                            <FaDownload style={{ marginRight: '8px' }} /> İndir
                        </button>
                    )}
                </div>
            )}

            {/* --- İÇERİK --- */}
            <div style={{
                ...styles.scrollContent,
                // Reduce top padding so content sits higher on both mobile and desktop
                paddingTop: isMobile ? 'calc(60px + env(safe-area-inset-top))' : '20px'
            }}>

                <div style={styles.heroSection}>
                    <img
                        src="https://media.pawscord.com/assets/logo.png"
                        alt="Logo"
                        style={isMobile ? styles.logoMobile : styles.logo}
                        onError={(e) => { e.target.style.display = 'none' }}
                    />
                    <h1 style={isMobile ? styles.titleMobile : styles.title}>{getGreeting()}</h1>
                    <p style={styles.subtitle}>
                        Arkadaşlarınla sohbet etmeye, oyun oynamaya ve topluluklara katılmaya hazır mısın?
                    </p>
                </div>

                <div style={styles.cardsGrid}>

                    {/* 1. ARKADAŞLAR KARTI (Doğru çalışıyor) */}
                    <div style={styles.card} onClick={onSwitchToFriends}>
                        <div style={{ ...styles.iconBox, background: 'rgba(88, 101, 242, 0.15)', color: '#5865f2' }}>
                            <FaUserFriends size={isMobile ? 20 : 24} />
                        </div>
                        <h3 style={styles.cardTitle}>Arkadaşların</h3>
                        <p style={styles.cardDesc}>Arkadaş listene git ve sohbet etmeye başla.</p>
                    </div>

                    {/* 2. SUNUCULAR KARTI */}
                    <div style={styles.card} onClick={onOpenMenu}>
                        <div style={{ ...styles.iconBox, background: 'rgba(35, 165, 89, 0.15)', color: '#23a559' }}>
                            <FaCompass size={isMobile ? 20 : 24} />
                        </div>
                        <h3 style={styles.cardTitle}>Sunucular</h3>
                        <p style={styles.cardDesc}>Menüyü aç ve topluluklarına göz at.</p>
                    </div>

                    {/* 3. AKTİVİTELER KARTI (Düzeltme: onClick eklendi) */}
                    <div style={styles.card} onClick={onSwitchToCinema}> {/* 👈 ARTIK SİNEMAYI AÇACAK */}
                        <div style={{ ...styles.iconBox, background: 'rgba(240, 178, 50, 0.15)', color: '#f0b232' }}>
                            <FaGamepad size={isMobile ? 20 : 24} />
                        </div>
                        <h3 style={styles.cardTitle}>Aktiviteler</h3>
                        <p style={styles.cardDesc}>Birlikte video izle, müzik dinle veya oyun oyna.</p>
                    </div>

                    {/* 4. YAPAY ZEKA KARTI (Doğru çalışıyor) */}
                    <div style={styles.card} onClick={onSwitchToAI}>
                        <div style={{ ...styles.iconBox, background: 'rgba(235, 69, 158, 0.15)', color: '#eb459e' }}>
                            <FaMagic size={isMobile ? 20 : 24} />
                        </div>
                        <h3 style={styles.cardTitle}>Yapay Zeka</h3>
                        <p style={styles.cardDesc}>PawPaw AI ile sohbet ederek sorularına cevap bul.</p>
                    </div>

                </div>

                <div style={styles.footer}>
                    <p>© 2025 Pawscord</p>
                </div>

            </div>
        </div>
    );
};

const styles = {
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#313338',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
    },
    mobileHeader: {
        position: 'absolute',
        top: 0, left: 0, width: '100%',
        backgroundColor: '#2b2d31',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 15px',
        boxSizing: 'border-box',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        zIndex: 50,
        borderBottom: '1px solid #1f2023',
        paddingTop: 'env(safe-area-inset-top)',
        height: 'calc(55px + env(safe-area-inset-top))'
    },
    menuButton: {
        background: 'none',
        border: 'none',
        color: '#dbdee1',
        cursor: 'pointer',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: '1.1em',
        letterSpacing: '1px',
        color: '#fff'
    },
    desktopTopRight: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 60,
        display: 'flex',
        gap: '10px',
        alignItems: 'center'
    },
    headerUpdateBtn: {
        backgroundColor: '#f0b232',
        color: '#000',
        border: 'none',
        padding: '6px 12px',
        borderRadius: '20px',
        cursor: 'pointer',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        animation: 'pulse 2s infinite',
        boxShadow: '0 0 10px rgba(240, 178, 50, 0.4)'
    },
    headerProgressContainer: {
        width: '100px',
        height: '24px',
        backgroundColor: '#202225',
        borderRadius: '12px',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid #f0b232',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerProgressBarFill: {
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        backgroundColor: '#f0b232',
        transition: 'width 0.2s ease'
    },
    headerProgressText: {
        position: 'relative',
        zIndex: 2,
        fontSize: '11px',
        fontWeight: 'bold',
        color: '#fff',
        textShadow: '0 1px 2px black'
    },
    desktopDownloadBtn: {
        backgroundColor: '#23a559',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '20px',
        fontWeight: 'bold',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        transition: 'transform 0.2s'
    },
    scrollContent: { flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box', WebkitOverflowScrolling: 'touch' },
    heroSection: { textAlign: 'center', marginBottom: '30px', maxWidth: '600px', animation: 'fadeIn 0.8s ease-out', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' },
    logo: { width: '100px', height: '100px', marginBottom: '15px', filter: 'drop-shadow(0 0 15px rgba(88, 101, 242, 0.4))' },
    logoMobile: { width: '80px', height: '80px', marginBottom: '10px', filter: 'drop-shadow(0 0 15px rgba(88, 101, 242, 0.4))' },
    title: { fontSize: '2.2em', fontWeight: '800', marginBottom: '5px', background: 'linear-gradient(90deg, #5865f2, #9b59b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 },
    titleMobile: { fontSize: '1.8em', fontWeight: '800', marginBottom: '5px', background: 'linear-gradient(90deg, #5865f2, #9b59b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 },
    subtitle: { color: '#b5bac1', fontSize: '0.95em', lineHeight: '1.4', marginTop: '10px' },
    cardsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', width: '100%', maxWidth: '500px', marginBottom: '20px' },
    // 🔥 GÜNCELLEME: Card stiline cursor pointer eklendi
    card: { backgroundColor: '#2b2d31', padding: '15px', borderRadius: '16px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.15)', border: '1px solid #232428', minHeight: '140px', cursor: 'pointer', transition: 'transform 0.1s' },
    iconBox: { width: '45px', height: '45px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' },
    cardTitle: { margin: '0 0 5px 0', fontSize: '0.95em', color: '#dbdee1', fontWeight: '600' },
    cardDesc: { margin: 0, fontSize: '0.75em', color: '#949ba4', lineHeight: '1.3' },
    footer: { marginTop: 'auto', color: '#5e6064', fontSize: '0.75em', textAlign: 'center', paddingTop: '20px' }
};

const styleSheet = document.createElement("style");
styleSheet.innerText = `@keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.9; } 100% { transform: scale(1); opacity: 1; } } @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } .card:active { transform: scale(0.98); }`;
document.head.appendChild(styleSheet);

export default React.memo(WelcomeScreen);

