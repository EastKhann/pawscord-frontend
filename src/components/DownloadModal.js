// frontend/src/components/DownloadModal.js

import { FaWindows, FaAndroid, FaApple, FaTimes, FaDownload, FaInfoCircle } from 'react-icons/fa';
import useModalA11y from '../hooks/useModalA11y';
import { Capacitor } from '@capacitor/core';

const DownloadModal = ({ onClose, apiBaseUrl }) => {
    const isNativeApp = Capacitor.isNativePlatform();
    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'İndirme' });

    const handleDownload = (platform) => {
        if (platform === 'windows') {
            // Windows EXE - Direkt R2 CDN'den indir
            window.location.href = 'https://media.pawscord.com/builds/Pawscord-Setup.exe';
        } else if (platform === 'android') {
            // Android APK - Direkt R2 CDN'den indir
            if (isNativeApp) {
                // Capacitor Browser plugin ile harici tarayıcıda aç
                window.open('https://media.pawscord.com/builds/Pawscord.apk', '_system');
            } else {
                // Web'de normal indirme
                window.location.href = 'https://media.pawscord.com/builds/Pawscord.apk';
            }
        }
    };

    return (
        <div style={styles.overlay} {...overlayProps}>
            {/* 👇 DÜZELTME YAPILAN KISIM: style={styles.modal} */}
            <div style={styles.modal} {...dialogProps}>

                <div style={styles.header}>
                    <h2 style={styles.title}>Pawscord'u İndir</h2>
                    <button onClick={onClose} style={styles.closeBtn}><FaTimes /></button>
                </div>

                <p style={styles.subtitle}>
                    Cihazına uygun sürümü seç ve topluluğa tam gaz katıl!
                </p>

                <div style={styles.grid}>
                    {/* 1. WINDOWS KARTI (EXE) */}
                    <div style={{ ...styles.card, borderBottom: '4px solid #00a8fc' }}>
                        <FaWindows size={40} color="#00a8fc" style={{ marginBottom: 15 }} />
                        <h3 style={styles.platformName}>Windows</h3>
                        <span style={styles.versionInfo}>Windows 10/11 (64-bit)</span>
                        <button onClick={() => handleDownload('windows')} style={{ ...styles.downloadBtn, backgroundColor: '#00a8fc' }}>
                            <FaDownload style={{ marginRight: 8 }} /> İndir (.exe)
                        </button>
                    </div>

                    {/* 2. ANDROID KARTI (APK) */}
                    <div style={{ ...styles.card, borderBottom: '4px solid #3ddc84' }}>
                        <FaAndroid size={40} color="#3ddc84" style={{ marginBottom: 15 }} />
                        <h3 style={styles.platformName}>Android</h3>
                        <span style={styles.versionInfo}>APK Dosyası</span>
                        <button onClick={() => handleDownload('android')} style={{ ...styles.downloadBtn, backgroundColor: '#3ddc84', color: '#000' }}>
                            <FaDownload style={{ marginRight: 8 }} /> İndir (.apk)
                        </button>
                    </div>

                    {/* 3. IOS KARTI (PASİF) */}
                    <div style={{ ...styles.card, borderBottom: '4px solid #999', opacity: 0.7 }}>
                        <FaApple size={40} color="#fff" style={{ marginBottom: 15 }} />
                        <h3 style={styles.platformName}>iOS</h3>
                        <span style={styles.versionInfo}>iPhone & iPad</span>
                        <button disabled style={styles.disabledBtn}>
                            <FaInfoCircle style={{ marginRight: 8 }} /> Henüz Erişilemez
                        </button>
                    </div>
                </div>

                <div style={styles.footer}>
                    Not: APK dosyasını yüklerken "Bilinmeyen Kaynaklar" izni vermeniz gerekebilir.
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(5px)',
        zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center',
        padding: '20px', boxSizing: 'border-box'
    },
    modal: {
        backgroundColor: '#0d0e10', width: '100%', maxWidth: '800px',
        borderRadius: '16px', padding: '30px', position: 'relative',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)', border: '1px solid #0e1222',
        display: 'flex', flexDirection: 'column', alignItems: 'center',

        // 🔥🔥🔥 DÜZELTME BURADA 🔥🔥🔥
        maxHeight: '90vh', // Ekranın %90'ından uzun olmasın
        overflowY: 'auto', // İçerik taşarsa kaydırma çubuğu çıksın
        WebkitOverflowScrolling: 'touch' // iOS için akıcı kaydırma
    },
    header: {
        width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px',
        flexShrink: 0 // Header kaybolmasın, sıkışmasın
    },
    title: { margin: 0, color: 'white', fontSize: '1.8em' },
    closeBtn: { background: 'none', border: 'none', color: '#b5bac1', fontSize: '1.5em', cursor: 'pointer' },
    subtitle: { color: '#b5bac1', textAlign: 'center', marginBottom: '30px', fontSize: '1.1em', flexShrink: 0 },

    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px', width: '100%',
        // Mobilde grid'in aşağıya taşmasını engellemek için esneklik verelim
        flexGrow: 1
    },
    card: {
        backgroundColor: '#111214', padding: '25px', borderRadius: '12px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)', transition: 'transform 0.2s'
    },
    platformName: { color: 'white', margin: '0 0 5px 0', fontSize: '1.4em' },
    versionInfo: { color: '#949ba4', fontSize: '0.85em', marginBottom: '20px' },

    downloadBtn: {
        width: '100%', padding: '10px', border: 'none', borderRadius: '6px',
        color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '1em',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'opacity 0.2s'
    },
    disabledBtn: {
        width: '100%', padding: '10px', border: '1px solid #4e5058', borderRadius: '6px',
        backgroundColor: 'transparent', color: '#949ba4', fontSize: '0.9em',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'not-allowed'
    },
    footer: { marginTop: '30px', color: '#5e6064', fontSize: '0.8em', textAlign: 'center', flexShrink: 0 }
};

export default DownloadModal;

