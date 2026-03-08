// frontend/src/components/ConnectionQualityIndicator.js
// 📶 WebRTC Bağlantı Kalitesi Göstergesi

import { FaWifi, FaExclamationTriangle, FaCheck, FaTimes } from 'react-icons/fa';

/**
 * Bağlantı kalitesi göstergesi
 * RTT (Round Trip Time) ve packet loss'a göre kalite hesaplar
 */
const ConnectionQualityIndicator = ({
    stats,
    username,
    compact = false,
    showDetails = false
}) => {
    if (!stats) return null;

    // Kalite hesaplama
    const getQuality = () => {
        const rtt = stats.rtt || 0;
        const packetLoss = stats.audio?.packetsLost || 0;
        const packetsReceived = stats.audio?.packetsReceived || 1;
        const lossPercent = (packetLoss / packetsReceived) * 100;

        if (rtt === 0 && lossPercent === 0) {
            return { level: 'unknown', label: 'Bilinmiyor', color: '#888', bars: 0 };
        }

        // RTT bazlı kalite
        // < 50ms = Mükemmel, 50-100ms = İyi, 100-200ms = Orta, > 200ms = Kötü
        if (rtt < 50 && lossPercent < 1) {
            return { level: 'excellent', label: 'Mükemmel', color: '#23a559', bars: 4 };
        } else if (rtt < 100 && lossPercent < 3) {
            return { level: 'good', label: 'İyi', color: '#5865f2', bars: 3 };
        } else if (rtt < 200 && lossPercent < 5) {
            return { level: 'fair', label: 'Orta', color: '#f0b232', bars: 2 };
        } else {
            return { level: 'poor', label: 'Zayıf', color: '#f23f42', bars: 1 };
        }
    };

    const quality = getQuality();

    // Compact mod - sadece barlar
    if (compact) {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '2px',
                    height: '14px'
                }}
                title={`${username}: ${quality.label} (${Math.round(stats.rtt || 0)}ms)`}
            >
                {[1, 2, 3, 4].map((bar) => (
                    <div
                        key={bar}
                        style={{
                            width: '3px',
                            height: `${bar * 3 + 2}px`,
                            backgroundColor: bar <= quality.bars ? quality.color : '#111214',
                            borderRadius: '1px',
                            transition: 'background-color 0.3s ease'
                        }}
                    />
                ))}
            </div>
        );
    }

    // Detaylı mod
    return (
        <div style={styles.container}>
            {/* Kalite barları */}
            <div style={styles.barsContainer}>
                {[1, 2, 3, 4].map((bar) => (
                    <div
                        key={bar}
                        style={{
                            ...styles.bar,
                            height: `${bar * 4 + 4}px`,
                            backgroundColor: bar <= quality.bars ? quality.color : '#111214'
                        }}
                    />
                ))}
            </div>

            {/* Kalite etiketi */}
            <span style={{ ...styles.label, color: quality.color }}>
                {quality.label}
            </span>

            {/* Detaylar */}
            {showDetails && (
                <div style={styles.details}>
                    <div style={styles.detailRow}>
                        <span style={styles.detailLabel}>Ping:</span>
                        <span style={styles.detailValue}>{Math.round(stats.rtt || 0)}ms</span>
                    </div>
                    <div style={styles.detailRow}>
                        <span style={styles.detailLabel}>Bağlantı:</span>
                        <span style={styles.detailValue}>{stats.connectionType || 'N/A'}</span>
                    </div>
                    {stats.audio && (
                        <>
                            <div style={styles.detailRow}>
                                <span style={styles.detailLabel}>Paket Kaybı:</span>
                                <span style={styles.detailValue}>
                                    {stats.audio.packetsLost || 0} / {stats.audio.packetsReceived || 0}
                                </span>
                            </div>
                            <div style={styles.detailRow}>
                                <span style={styles.detailLabel}>Jitter:</span>
                                <span style={styles.detailValue}>
                                    {((stats.audio.jitter || 0) * 1000).toFixed(1)}ms
                                </span>
                            </div>
                        </>
                    )}
                    {stats.video && (
                        <>
                            <div style={styles.detailRow}>
                                <span style={styles.detailLabel}>Video:</span>
                                <span style={styles.detailValue}>
                                    {stats.video.frameWidth}x{stats.video.frameHeight}
                                </span>
                            </div>
                            <div style={styles.detailRow}>
                                <span style={styles.detailLabel}>FPS:</span>
                                <span style={styles.detailValue}>
                                    {stats.video.framesDecoded ?
                                        `~${Math.round(stats.video.framesDecoded / 10)}/s` : 'N/A'}
                                </span>
                            </div>
                        </>
                    )}
                    <div style={styles.detailRow}>
                        <span style={styles.detailLabel}>ICE:</span>
                        <span style={{
                            ...styles.detailValue,
                            color: stats.iceConnectionState === 'connected' ? '#23a559' :
                                stats.iceConnectionState === 'checking' ? '#f0b232' : '#f23f42'
                        }}>
                            {stats.iceConnectionState || 'N/A'}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        padding: '8px',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: '8px',
        minWidth: '80px'
    },
    barsContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        gap: '3px',
        height: '20px'
    },
    bar: {
        width: '4px',
        borderRadius: '2px',
        transition: 'background-color 0.3s ease, height 0.3s ease'
    },
    label: {
        fontSize: '11px',
        fontWeight: '600',
        letterSpacing: '0.5px'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        marginTop: '8px',
        paddingTop: '8px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        width: '100%'
    },
    detailRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '10px'
    },
    detailLabel: {
        color: '#949ba4'
    },
    detailValue: {
        color: '#b5bac1',
        fontFamily: 'monospace'
    }
};

export default ConnectionQualityIndicator;
