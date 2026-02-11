// frontend/src/components/VoiceWaitingRoom.js
import { useState, useEffect } from 'react';
import { FaUsers, FaClock, FaPhoneSlash } from 'react-icons/fa';

const VoiceWaitingRoom = ({ channelName, maxUsers, currentUsers, position, onLeave }) => {
    const [waiting, setWaiting] = useState(true);
    const [timeWaited, setTimeWaited] = useState(0);

    useEffect(() => {
        if (position === 0) {
            setWaiting(false);
            // Auto-join when spot available
        }
    }, [position]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeWaited(prev => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <FaUsers style={styles.headerIcon} />
                    <h3 style={styles.title}>Bekleme Sırası</h3>
                </div>

                <div style={styles.content}>
                    <p style={styles.channelName}>#{channelName}</p>

                    <div style={styles.info}>
                        <div style={styles.infoItem}>
                            <span style={styles.infoLabel}>Kanal Kapasitesi:</span>
                            <span style={styles.infoValue}>{currentUsers}/{maxUsers}</span>
                        </div>

                        <div style={styles.infoItem}>
                            <span style={styles.infoLabel}>Sıradaki Pozisyon:</span>
                            <span style={styles.infoValue}>#{position + 1}</span>
                        </div>

                        <div style={styles.infoItem}>
                            <FaClock style={styles.clockIcon} />
                            <span style={styles.infoValue}>{formatTime(timeWaited)}</span>
                        </div>
                    </div>

                    {position === 0 ? (
                        <div style={styles.ready}>
                            <p style={styles.readyText}>✅ Sıra sende! Katılıyorsun...</p>
                        </div>
                    ) : (
                        <div style={styles.waiting}>
                            <div style={styles.loader}></div>
                            <p style={styles.waitingText}>
                                {position === 1 ? 'Bir kişi çıkınca katılabilirsin' :
                                    `${position} kişi önünde var`}
                            </p>
                        </div>
                    )}

                    <button onClick={onLeave} style={styles.leaveButton}>
                        <FaPhoneSlash /> Beklemeden Çık
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
    },
    modal: {
        backgroundColor: '#2b2d31',
        borderRadius: '8px',
        width: '400px',
        maxWidth: '90vw',
        overflow: 'hidden',
        boxShadow: '0 8px 16px rgba(0,0,0,0.4)'
    },
    header: {
        padding: '20px',
        backgroundColor: '#1e1f22',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    headerIcon: {
        color: '#5865f2',
        fontSize: '24px'
    },
    title: {
        color: '#fff',
        fontSize: '20px',
        margin: 0
    },
    content: {
        padding: '24px'
    },
    channelName: {
        color: '#5865f2',
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'center'
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginBottom: '24px',
        padding: '16px',
        backgroundColor: '#1e1f22',
        borderRadius: '6px'
    },
    infoItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#b9bbbe'
    },
    infoLabel: {
        fontSize: '14px'
    },
    infoValue: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#fff'
    },
    clockIcon: {
        color: '#72767d',
        marginRight: 'auto'
    },
    ready: {
        padding: '16px',
        backgroundColor: 'rgba(35, 165, 89, 0.1)',
        border: '1px solid #23a559',
        borderRadius: '6px',
        marginBottom: '16px'
    },
    readyText: {
        color: '#23a559',
        margin: 0,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    waiting: {
        padding: '16px',
        textAlign: 'center',
        marginBottom: '16px'
    },
    loader: {
        border: '3px solid #35373c',
        borderTop: '3px solid #5865f2',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 12px'
    },
    waitingText: {
        color: '#b9bbbe',
        margin: 0,
        fontSize: '14px'
    },
    leaveButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#da373c',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'background-color 0.2s'
    }
};

// Add spin animation
const styleSheet = document.styleSheets[0];
try {
    styleSheet.insertRule(`
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `, styleSheet.cssRules.length);
} catch (_) { /* CSS rule injection may fail in some browsers */ }

export default VoiceWaitingRoom;



