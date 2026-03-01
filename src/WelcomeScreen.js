// frontend/src/WelcomeScreen.js

import React, { useState, useCallback } from 'react';
import { FaBars, FaGamepad, FaUserFriends, FaCompass, FaMagic, FaUsers, FaDownload, FaCheck, FaHashtag, FaAt } from 'react-icons/fa';
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
    onSwitchToCinema,
    // 🕐 Son Açılanlar
    recentItems = [],
    onNavigateToItem,
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
                    <button onClick={onOpenMenu} style={styles.menuButton} title="Menüyü Aç" aria-label="Open menu">
                        <FaBars size={22} />
                    </button>

                    <span style={styles.headerTitle}>Pawscord</span>

                    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                        <UpdateButtonComponent />

                        {shouldShowDownloadBtn && (
                            <button onClick={() => setShowDownload(true)} style={{ ...styles.menuButton, padding: '6px' }} aria-label="Download app">
                                <FaDownload size={16} />
                            </button>
                        )}

                        <button onClick={onOpenRightMenu} style={styles.menuButton} aria-label="Open members panel">
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

                {/* --- SON AÇILANLAR --- */}
                {recentItems.length > 0 && (
                    <div style={styles.recentSection}>
                        <p style={styles.recentTitle}>Son Açılanlar</p>
                        <div style={styles.recentList}>
                            {recentItems.map((item) => (
                                <button
                                    key={`${item.type}-${item.id}`}
                                    style={styles.recentItem}
                                    onClick={() => onNavigateToItem && onNavigateToItem(item)}
                                    title={item.label}
                                >
                                    <span style={styles.recentIcon}>
                                        {item.type === 'room' ? <FaHashtag size={13} /> : <FaAt size={13} />}
                                    </span>
                                    <span style={styles.recentLabel}>{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div style={styles.cardsGrid}>

                    {/* 1. ARKADAŞLAR KARTI (Doğru çalışıyor) */}
                    <div style={styles.card} className="welcome-card" role="button" tabIndex={0} onClick={onSwitchToFriends} onKeyDown={e => e.key === 'Enter' && onSwitchToFriends()} aria-label="Arkadaşların">
                        <div style={{ ...styles.iconBox, background: 'rgba(88, 101, 242, 0.15)', color: '#5865f2' }}>
                            <FaUserFriends size={isMobile ? 20 : 24} />
                        </div>
                        <h3 style={styles.cardTitle}>Arkadaşların</h3>
                        <p style={styles.cardDesc}>Arkadaş listene git ve sohbet etmeye başla.</p>
                    </div>

                    {/* 2. SUNUCULAR KARTI */}
                    <div style={styles.card} className="welcome-card" role="button" tabIndex={0} onClick={onOpenMenu} onKeyDown={e => e.key === 'Enter' && onOpenMenu()} aria-label="Sunucular">
                        <div style={{ ...styles.iconBox, background: 'rgba(35, 165, 89, 0.15)', color: '#23a559' }}>
                            <FaCompass size={isMobile ? 20 : 24} />
                        </div>
                        <h3 style={styles.cardTitle}>Sunucular</h3>
                        <p style={styles.cardDesc}>Menüyü aç ve topluluklarına göz at.</p>
                    </div>

                    {/* 3. AKTİVİTELER KARTI (Düzeltme: onClick eklendi) */}
                    <div style={styles.card} className="welcome-card" role="button" tabIndex={0} onClick={onSwitchToCinema} onKeyDown={e => e.key === 'Enter' && onSwitchToCinema()} aria-label="Aktiviteler">
                        <div style={{ ...styles.iconBox, background: 'rgba(240, 178, 50, 0.15)', color: '#f0b232' }}>
                            <FaGamepad size={isMobile ? 20 : 24} />
                        </div>
                        <h3 style={styles.cardTitle}>Aktiviteler</h3>
                        <p style={styles.cardDesc}>Birlikte video izle, müzik dinle veya oyun oyna.</p>
                    </div>

                    {/* 4. YAPAY ZEKA KARTI (Doğru çalışıyor) */}
                    <div style={styles.card} className="welcome-card" role="button" tabIndex={0} onClick={onSwitchToAI} onKeyDown={e => e.key === 'Enter' && onSwitchToAI()} aria-label="Yapay Zeka">
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
        color: '#dbdee1',
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
        padding: '0 12px',
        boxSizing: 'border-box',
        boxShadow: '0 1px 0 rgba(0,0,0,0.3)',
        zIndex: 50,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        paddingTop: 'env(safe-area-inset-top)',
        height: 'calc(52px + env(safe-area-inset-top))'
    },
    menuButton: {
        background: 'none',
        border: 'none',
        color: '#b5bac1',
        cursor: 'pointer',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px'
    },
    headerTitle: {
        fontWeight: '700',
        fontSize: '15px',
        letterSpacing: '0.2px',
        color: '#f2f3f5'
    },
    desktopTopRight: {
        position: 'absolute',
        top: '16px',
        right: '16px',
        zIndex: 60,
        display: 'flex',
        gap: '8px',
        alignItems: 'center'
    },
    headerUpdateBtn: {
        backgroundColor: '#f0b232',
        color: '#000',
        border: 'none',
        padding: '6px 12px',
        borderRadius: '16px',
        cursor: 'pointer',
        fontWeight: '700',
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        boxShadow: '0 2px 8px rgba(240, 178, 50, 0.4)'
    },
    headerProgressContainer: {
        width: '96px',
        height: '22px',
        backgroundColor: '#2b2d31',
        borderRadius: '11px',
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
        backgroundColor: 'rgba(240, 178, 50, 0.5)',
        transition: 'width 0.2s ease'
    },
    headerProgressText: {
        position: 'relative',
        zIndex: 2,
        fontSize: '11px',
        fontWeight: 'bold',
        color: '#fff'
    },
    desktopDownloadBtn: {
        backgroundColor: '#23a559',
        color: 'white',
        border: 'none',
        padding: '8px 18px',
        borderRadius: '16px',
        fontWeight: '600',
        fontSize: '13px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
        transition: 'background-color 0.15s ease'
    },
    scrollContent: { flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box', WebkitOverflowScrolling: 'touch' },
    heroSection: { textAlign: 'center', marginBottom: '28px', maxWidth: '520px', animation: 'fadeIn 0.6s ease-out', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' },
    logo: { width: '88px', height: '88px', marginBottom: '16px', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' },
    logoMobile: { width: '72px', height: '72px', marginBottom: '12px', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' },
    title: { fontSize: '2em', fontWeight: '800', color: '#f2f3f5', margin: 0, letterSpacing: '-0.5px' },
    titleMobile: { fontSize: '1.6em', fontWeight: '800', color: '#f2f3f5', margin: 0, letterSpacing: '-0.3px' },
    subtitle: { color: '#949ba4', fontSize: '0.9em', lineHeight: '1.5', marginTop: '8px', maxWidth: '360px' },
    cardsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', width: '100%', maxWidth: '480px', marginBottom: '20px' },
    recentSection: { width: '100%', maxWidth: '480px', marginBottom: '16px' },
    recentTitle: { fontSize: '0.7em', fontWeight: '700', color: '#949ba4', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 8px 2px' },
    recentList: { display: 'flex', flexWrap: 'wrap', gap: '6px' },
    recentItem: { display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#2b2d31', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', padding: '6px 10px', cursor: 'pointer', color: '#dbdee1', fontSize: '0.82em', fontWeight: '500', transition: 'background-color 0.12s ease', maxWidth: '180px' },
    recentIcon: { color: '#949ba4', flexShrink: 0 },
    recentLabel: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
    card: { backgroundColor: '#2b2d31', padding: '16px 14px', borderRadius: '8px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', minHeight: '130px', cursor: 'pointer', transition: 'background-color 0.15s ease, transform 0.1s ease, box-shadow 0.15s ease' },
    iconBox: { width: '42px', height: '42px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' },
    cardTitle: { margin: '0 0 4px 0', fontSize: '0.9em', color: '#dbdee1', fontWeight: '600' },
    cardDesc: { margin: 0, fontSize: '0.75em', color: '#949ba4', lineHeight: '1.4' },
    footer: { marginTop: 'auto', color: '#4e5058', fontSize: '0.72em', textAlign: 'center', paddingTop: '16px', letterSpacing: '0.3px' }
};

const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.85; } 100% { opacity: 1; } }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  .welcome-card:hover { background-color: #313338 !important; transform: translateY(-2px) !important; box-shadow: 0 6px 16px rgba(0,0,0,0.35) !important; }
  .welcome-card:active { transform: scale(0.98) !important; }
  button[title]:hover { background-color: #383a40 !important; }
`;
document.head.appendChild(styleSheet);

export default React.memo(WelcomeScreen);

