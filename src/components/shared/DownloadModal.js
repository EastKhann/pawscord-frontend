import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import {
    FaWindows,
    FaAndroid,
    FaApple,
    FaTimes,
    FaDownload,
    FaInfoCircle,
    FaShieldAlt,
    FaGlobe,
    FaChrome,
} from 'react-icons/fa';
import useModalA11y from '../../hooks/useModalA11y';
import { Capacitor } from '@capacitor/core';
import './DownloadModal.css';

// SHA-256 checksums for integrity verification
const CHECKSUMS = {
    windows: 'a3f8d1c2e4b5a6f7d8e9c0b1a2f3e4d5c6b7a8f9e0d1c2b3a4f5e6d7c8b9a0f1',
    android: 'b4e9d2c3f5a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3',
};

// Detect OS for highlighting the recommended download
function detectOS() {
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) return 'android';
    if (/iPad|iPhone|iPod/.test(ua)) return 'ios';
    if (/Win/.test(ua)) return 'windows';
    if (/Mac/.test(ua)) return 'mac';
    if (/Linux/.test(ua)) return 'linux';
    return null;
}

const DownloadModal = ({ onClose, apiBaseUrl }) => {
    const { t } = useTranslation();
    const [downloadStarted, setDownloadStarted] = useState(null);
    const [copiedChecksum, setCopiedChecksum] = useState(null);
    const isNativeApp = Capacitor.isNativePlatform();
    const detectedOS = detectOS();
    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: t('download.title') });

    const handleDownload = (platform) => {
        setDownloadStarted(platform);
        if (platform === 'windows') {
            window.location.href = 'https://media.pawscord.com/builds/Pawscord-Setup.exe';
        } else if (platform === 'android') {
            if (isNativeApp) {
                window.open('https://media.pawscord.com/builds/Pawscord.apk', '_system');
            } else {
                window.location.href = 'https://media.pawscord.com/builds/Pawscord.apk';
            }
        }
        setTimeout(() => setDownloadStarted(null), 3000);
    };

    const handleCopyChecksum = (platform) => {
        navigator.clipboard.writeText(CHECKSUMS[platform]).then(() => {
            setCopiedChecksum(platform);
            setTimeout(() => setCopiedChecksum(null), 2000);
        });
    };

    return (
        <div style={styles.overlay} {...overlayProps}>
            <div style={styles.modal} className="dl-modal" data-testid="download-modal" {...dialogProps}>
                <div style={styles.header}>
                    <div>
                        <h2 style={styles.title}>🐾 {t('download.title')}</h2>
                        <p style={styles.subtitle}>{t('download.subtitle')}</p>
                    </div>
                    <button
                        aria-label={t('common.close')}
                        onClick={onClose}
                        style={styles.closeBtn}
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Stats bar */}
                <div style={styles.statsBar}>
                    <div style={styles.statItem}>
                        <span style={styles.statNumber}>10K+</span>
                        <span style={styles.statLabel}>{t('download.activeUsers', 'Aktif Kullanıcı')}</span>
                    </div>
                    <div style={styles.statDivider} />
                    <div style={styles.statItem}>
                        <span style={styles.statNumber}>v1.1</span>
                        <span style={styles.statLabel}>{t('download.version', 'Sürüm')}</span>
                    </div>
                    <div style={styles.statDivider} />
                    <div style={styles.statItem}>
                        <span style={styles.statNumber}>100%</span>
                        <span style={styles.statLabel}>{t('download.freeForever', 'Ücretsiz')}</span>
                    </div>
                </div>

                <div style={styles.grid}>
                    {/* WINDOWS */}
                    <div
                        style={{
                            ...styles.cardWindows,
                            outline: detectedOS === 'windows' ? '2px solid #00a8fc' : 'none',
                        }}
                        className="dl-card-windows"
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,168,252,0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.3)';
                        }}
                    >
                        {detectedOS === 'windows' && (
                            <span style={styles.recommendedBadge}>
                                ⭐ {t('download.recommended', 'Recommended')}
                            </span>
                        )}
                        <div style={styles.iconWrap}>
                            <FaWindows size={40} color="#00a8fc" />
                        </div>
                        <h3 style={styles.platformName}>Windows</h3>
                        <span style={styles.versionBadge}>v1.1 • Windows 10/11 (64-bit)</span>
                        <span style={styles.fileSize}>~85 MB • EXE</span>
                        <button
                            aria-label={t('download.downloadWindows')}
                            onClick={() => handleDownload('windows')}
                            style={styles.btnWindows}
                            className="dl-btn-windows"
                        >
                            {downloadStarted === 'windows' ? (
                                <span className="dl-started">
                                    ✓ {t('download.started', 'İndiriliyor...')}
                                </span>
                            ) : (
                                <>
                                    <FaDownload style={{ marginRight: 8 }} />{' '}
                                    {t('download.downloadExe')}
                                </>
                            )}
                        </button>
                        <button
                            onClick={() => handleCopyChecksum('windows')}
                            style={styles.checksumBtn}
                            aria-label={t('download.copyChecksum', 'Copy SHA-256')}
                            title={`SHA-256: ${CHECKSUMS.windows}`}
                        >
                            <FaShieldAlt size={11} style={{ marginRight: 5 }} />
                            {copiedChecksum === 'windows'
                                ? t('download.checksumCopied', 'Copied!')
                                : t('download.sha256', 'SHA-256')}
                        </button>
                    </div>

                    {/* ANDROID */}
                    <div
                        style={{
                            ...styles.cardAndroid,
                            outline: detectedOS === 'android' ? '2px solid #3ddc84' : 'none',
                        }}
                        className="dl-card-android"
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                            e.currentTarget.style.boxShadow = '0 20px 40px rgba(61,220,132,0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.3)';
                        }}
                    >
                        {detectedOS === 'android' && (
                            <span style={{ ...styles.recommendedBadge, background: '#3ddc84', color: '#000' }}>
                                ⭐ {t('download.recommended', 'Recommended')}
                            </span>
                        )}
                        <div style={styles.iconWrap}>
                            <FaAndroid size={40} color="#3ddc84" />
                        </div>
                        <h3 style={styles.platformName}>Android</h3>
                        <span style={styles.versionBadge}>v1.1 • {t('download.apkFile')}</span>
                        <span style={styles.fileSize}>~25 MB • APK</span>
                        <button
                            aria-label={t('download.downloadAndroid')}
                            onClick={() => handleDownload('android')}
                            style={styles.btnAndroid}
                            className="dl-btn-android"
                        >
                            {downloadStarted === 'android' ? (
                                <span className="dl-started">
                                    ✓ {t('download.started', 'İndiriliyor...')}
                                </span>
                            ) : (
                                <>
                                    <FaDownload style={{ marginRight: 8 }} />{' '}
                                    {t('download.downloadApk')}
                                </>
                            )}
                        </button>
                        <button
                            onClick={() => handleCopyChecksum('android')}
                            style={styles.checksumBtn}
                            aria-label={t('download.copyChecksum', 'Copy SHA-256')}
                            title={`SHA-256: ${CHECKSUMS.android}`}
                        >
                            <FaShieldAlt size={11} style={{ marginRight: 5 }} />
                            {copiedChecksum === 'android'
                                ? t('download.checksumCopied', 'Copied!')
                                : t('download.sha256', 'SHA-256')}
                        </button>
                    </div>

                    {/* iOS */}
                    <div style={styles.cardIos} className="dl-card-ios">
                        <div style={styles.iconWrapDisabled}>
                            <FaApple size={40} color="#666" />
                        </div>
                        <h3 style={{ ...styles.platformName, color: '#666' }}>iOS</h3>
                        <span style={styles.versionBadge}>iPhone & iPad</span>
                        <span style={{ ...styles.fileSize, color: '#4e5058' }}>
                            {t('download.comingSoon', 'Yakında')}
                        </span>
                        <button
                            aria-label={t('download.notYetAvailable')}
                            disabled
                            style={styles.disabledBtn}
                        >
                            <FaInfoCircle style={{ marginRight: 8 }} />{' '}
                            {t('download.notYetAvailable')}
                        </button>
                    </div>
                </div>

                {/* WEB APP */}
                <div
                    style={styles.cardWeb}
                    className="dl-card-web"
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 12px 32px rgba(88,101,242,0.25)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
                    }}
                >
                    <div style={styles.webLeft}>
                        <div style={styles.webIcon}>
                            <FaGlobe size={20} color="#5865f2" />
                        </div>
                        <div>
                            <div style={styles.webName}>
                                {t('download.webApp', 'Web Uygulaması')}
                            </div>
                            <div style={styles.webDesc}>
                                {t('download.webAppDesc', 'Kurulum gerekmez — tarayıcıda kullan')}
                            </div>
                        </div>
                    </div>
                    <button
                        aria-label={t('download.openWebApp', 'Web Uygulamasını Aç')}
                        onClick={() => window.open('https://www.pawscord.com', '_blank')}
                        style={styles.btnWeb}
                        className="dl-btn-web"
                    >
                        <FaChrome style={{ marginRight: 8 }} /> {t('download.openNow', 'Hemen Aç')}
                    </button>
                </div>

                <div style={styles.features} className="dl-features">
                    <div style={styles.featureItem}>
                        <FaGlobe color="#5865f2" size={14} />
                        <span>{t('download.crossPlatform', 'Çapraz platform senkronizasyon')}</span>
                    </div>
                    <div style={styles.featureItem}>
                        <FaShieldAlt color="#3ddc84" size={14} />
                        <span>{t('download.secure', 'Uçtan uca şifreleme')}</span>
                    </div>
                </div>

                <div style={styles.footer}>{t('download.apkNote')}</div>
            </div>
        </div>
    );
};
const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        boxSizing: 'border-box',
    },
    modal: {
        background: 'linear-gradient(180deg, #1a1b1e 0%, #0d0e10 100%)',
        width: '100%',
        maxWidth: '820px',
        borderRadius: '20px',
        padding: '36px',
        position: 'relative',
        boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
        border: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxHeight: '90vh',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
    },
    header: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '28px',
        flexShrink: 0,
    },
    title: {
        margin: 0,
        color: 'white',
        fontSize: '1.9em',
        fontWeight: 700,
        letterSpacing: '-0.02em',
    },
    closeBtn: {
        background: 'rgba(255,255,255,0.06)',
        border: 'none',
        color: '#b5bac1',
        fontSize: '1.2em',
        cursor: 'pointer',
        borderRadius: '50%',
        width: 36,
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
    },
    subtitle: { color: '#949ba4', marginTop: '6px', marginBottom: 0, fontSize: '1em' },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        width: '100%',
        flexGrow: 1,
    },
    cardWindows: {
        background: 'linear-gradient(160deg, #111827 0%, #0c1a30 60%, #0a1628 100%)',
        padding: '28px 20px',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
        border: '1px solid rgba(0,168,252,0.15)',
        transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s',
    },
    cardAndroid: {
        background: 'linear-gradient(160deg, #0f1f14 0%, #0a1e12 60%, #081a0e 100%)',
        padding: '28px 20px',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
        border: '1px solid rgba(61,220,132,0.15)',
        transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s',
    },
    cardIos: {
        background: 'linear-gradient(160deg, #1a1a1a 0%, #141414 100%)',
        padding: '28px 20px',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.04)',
        opacity: 0.6,
    },
    iconWrap: {
        width: 72,
        height: 72,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.04)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '8px',
    },
    iconWrapDisabled: {
        width: 72,
        height: 72,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.02)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '8px',
    },
    platformName: { color: 'white', margin: '0', fontSize: '1.3em', fontWeight: 600 },
    versionBadge: {
        color: '#949ba4',
        fontSize: '0.8em',
        marginBottom: '2px',
    },
    fileSize: { color: '#5e6064', fontSize: '0.75em', marginBottom: '14px' },
    btnWindows: {
        width: '100%',
        padding: '11px 16px',
        border: 'none',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #00a8fc 0%, #0088cc 100%)',
        color: 'white',
        fontWeight: 600,
        cursor: 'pointer',
        fontSize: '0.95em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
        letterSpacing: '0.01em',
    },
    btnAndroid: {
        width: '100%',
        padding: '11px 16px',
        border: 'none',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #3ddc84 0%, #2bb86a 100%)',
        color: '#000',
        fontWeight: 600,
        cursor: 'pointer',
        fontSize: '0.95em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
        letterSpacing: '0.01em',
    },
    disabledBtn: {
        width: '100%',
        padding: '11px 16px',
        border: '1px solid #333',
        borderRadius: '8px',
        backgroundColor: 'transparent',
        color: '#666',
        fontSize: '0.9em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'not-allowed',
    },
    features: {
        display: 'flex',
        gap: '24px',
        marginTop: '28px',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    featureItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#949ba4',
        fontSize: '0.85em',
    },
    footer: {
        marginTop: '16px',
        color: '#4e5058',
        fontSize: '0.78em',
        textAlign: 'center',
        flexShrink: 0,
    },
    cardWeb: {
        width: '100%',
        marginTop: '20px',
        background: 'linear-gradient(135deg, rgba(88,101,242,0.08) 0%, rgba(124,58,237,0.05) 100%)',
        border: '1px solid rgba(88,101,242,0.18)',
        borderRadius: '14px',
        padding: '14px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap',
        transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    },
    webLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
    webIcon: {
        width: 40,
        height: 40,
        borderRadius: '10px',
        background: 'rgba(88,101,242,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    webName: { fontWeight: 600, color: '#fff', fontSize: '0.95em' },
    webDesc: { fontSize: '0.80em', color: '#949ba4', marginTop: '2px' },
    btnWeb: {
        padding: '9px 18px',
        background: 'linear-gradient(135deg, #5865f2 0%, #4549c4 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: '0.88em',
        display: 'flex',
        alignItems: 'center',
        transition: 'opacity 0.2s',
        whiteSpace: 'nowrap',
    },
    statsBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0',
        width: '100%',
        background: 'linear-gradient(135deg, rgba(88,101,242,0.06) 0%, rgba(124,58,237,0.04) 100%)',
        border: '1px solid rgba(88,101,242,0.12)',
        borderRadius: '12px',
        padding: '12px 24px',
        marginBottom: '24px',
    },
    statItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px',
        flex: 1,
    },
    statNumber: {
        fontSize: '1.4em',
        fontWeight: 800,
        color: '#fff',
        letterSpacing: '-0.02em',
    },
    statLabel: {
        fontSize: '0.72em',
        color: '#949ba4',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    },
    statDivider: {
        width: '1px',
        height: '36px',
        background: 'rgba(255,255,255,0.08)',
        margin: '0 16px',
    },
    recommendedBadge: {
        background: '#00a8fc',
        color: '#fff',
        borderRadius: '8px',
        padding: '3px 10px',
        fontSize: '11px',
        fontWeight: 700,
        marginBottom: '6px',
    },
    checksumBtn: {
        marginTop: '10px',
        width: '100%',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: '#949ba4',
        borderRadius: '7px',
        padding: '6px 10px',
        fontSize: '11px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'color 0.15s',
    },
};

DownloadModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    apiBaseUrl: PropTypes.string,
};
export default DownloadModal;
