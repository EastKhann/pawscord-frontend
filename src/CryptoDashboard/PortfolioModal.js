import { FaTimes } from 'react-icons/fa';
import { formatPrice } from './helpers';
import styles from './styles';

const PortfolioModal = ({ portfolio, onClose }) => {
    if (!portfolio) return null;
    return (
        <div style={styles.modalOverlay} onClick={onClose}>
            <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div style={styles.modalHeader}>
                    <h2>💼 Cüzdanım</h2>
                    <button onClick={onClose} style={styles.closeBtn}><FaTimes /></button>
                </div>
                <div style={styles.balanceCard}>
                    <span>Toplam Bakiye (USDT)</span>
                    <h1 style={{ color: '#23a559', margin: '5px 0' }}>${formatPrice(portfolio.balance)}</h1>
                </div>
                <h4 style={{ borderBottom: '1px solid #444', paddingBottom: 5, marginBottom: 10 }}>Varlıklarım</h4>
                <div style={styles.holdingsList}>
                    {(!portfolio.holdings || Object.keys(portfolio.holdings).length === 0) ? (
                        <p style={{ color: '#999', textAlign: 'center' }}>Henüz coin almadınız.</p>
                    ) : (
                        Object.entries(portfolio.holdings).map(([symbol, qty]) => (
                            <div key={symbol} style={styles.holdingItem}>
                                <strong style={{ color: '#fff', fontSize: '1.1em' }}>{symbol.replace('USDT', '')}</strong>
                                <span style={{ color: '#f0b232' }}>{formatPrice(qty)} Adet</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default PortfolioModal;
