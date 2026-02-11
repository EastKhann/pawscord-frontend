// frontend/src/components/SignalNotification.js

import { useEffect, useState } from 'react';
import { useGlobalWebSocket } from '../GlobalWebSocketContext'; // Context'i içe aktar
import { FaTimes, FaBitcoin, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SignalNotification = () => {
    const { globalData } = useGlobalWebSocket(); // Global veriyi dinle
    const [notification, setNotification] = useState(null);
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!globalData) return;

        // Sadece "Signal Bot"tan gelen mesajları yakala
        if (globalData.type === 'chat_message_handler' && globalData.username === '⚡ Signal Bot') {

            // Mesaj içeriğini analiz et (Coin adı, yön vb.)
            const lines = globalData.content.split('\n');
            const coinLine = lines.find(l => l.includes('🪙')) || "Bilinmiyor";
            const dirLine = lines.find(l => l.includes('📈')) || "";

            const newNotif = {
                title: 'YENİ KRİPTO SİNYALİ! 🚨',
                coin: coinLine.replace('🪙', '').replace(/\*/g, '').trim(),
                direction: dirLine.includes('LONG') ? 'YÜKSELİŞ (LONG)' : 'DÜŞÜŞ (SHORT)',
                isLong: dirLine.includes('LONG'),
                raw: globalData
            };

            setNotification(newNotif);
            setVisible(true);

            // 5 saniye sonra otomatik kapat
            const timer = setTimeout(() => {
                setVisible(false);
            }, 8000);

            return () => clearTimeout(timer);
        }
    }, [globalData]);

    if (!visible || !notification) return null;

    const handleClick = () => {
        setVisible(false);
        navigate('/'); // Tıklayınca ana sohbet ekranına git
    };

    return (
        <div style={styles.container} className="slide-in-notification">
            <div style={styles.iconBox}>
                <FaBitcoin size={24} color="#f0b232" />
            </div>

            <div style={styles.content} onClick={handleClick}>
                <h4 style={styles.title}>{notification.title}</h4>
                <div style={styles.details}>
                    <span style={styles.coinName}>{notification.coin}</span>
                    <span style={{
                        ...styles.directionBadge,
                        backgroundColor: notification.isLong ? 'rgba(35, 165, 89, 0.2)' : 'rgba(240, 71, 71, 0.2)',
                        color: notification.isLong ? '#23a559' : '#da373c'
                    }}>
                        {notification.direction}
                    </span>
                </div>
                <span style={styles.hint}>Detaylar için tıkla <FaArrowRight size={10} /></span>
            </div>

            <button onClick={(e) => { e.stopPropagation(); setVisible(false); }} style={styles.closeButton}>
                <FaTimes />
            </button>
        </div>
    );
};

const styles = {
    container: {
        position: 'fixed',
        top: '20px',
        right: '20px',
        width: '320px',
        backgroundColor: '#1e1f22',
        borderRadius: '8px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
        borderLeft: '5px solid #f0b232',
        display: 'flex',
        alignItems: 'center',
        padding: '15px',
        zIndex: 99999, // En üstte
        cursor: 'pointer',
        transition: 'transform 0.3s ease-out',
    },
    iconBox: {
        marginRight: '15px',
        display: 'flex',
        alignItems: 'center'
    },
    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        margin: 0,
        color: '#fff',
        fontSize: '0.95em',
        fontWeight: 'bold',
        marginBottom: '5px'
    },
    details: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '5px'
    },
    coinName: {
        color: '#dcddde',
        fontWeight: 'bold',
        fontSize: '1.1em'
    },
    directionBadge: {
        fontSize: '0.75em',
        padding: '2px 6px',
        borderRadius: '4px',
        fontWeight: 'bold'
    },
    hint: {
        fontSize: '0.7em',
        color: '#949ba4',
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#949ba4',
        cursor: 'pointer',
        padding: '5px',
        marginLeft: '10px',
        fontSize: '1em'
    }
};

// Animasyon için CSS ekle
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  .slide-in-notification {
    animation: slideInRight 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }
`;
document.head.appendChild(styleSheet);

export default SignalNotification;

