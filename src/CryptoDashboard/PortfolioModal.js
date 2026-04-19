import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FaTimes } from 'react-icons/fa';
import { formatPrice } from './helpers';
import styles from './styles';
import useModalA11y from '../hooks/useModalA11y';

// -- extracted inline style constants --
const _st1 = { fontSize: '32px', fontWeight: 'bold', color: '#23a559', margin: '0' };
const _st2 = { color: '#dbdee1', fontSize: '16px', fontWeight: '600', marginBottom: '12px' };
const _st3 = { color: '#949ba4', fontSize: '14px', textAlign: 'center', padding: '20px' };
const _st4 = { color: '#fff', fontSize: '14px', fontWeight: '700' };
const _st5 = { color: '#dbdee1', fontSize: '14px', fontWeight: '600' };

const PortfolioModal = ({ portfolio, onClose }) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { overlayProps, dialogProps } = useModalA11y({
        onClose,
        isOpen: !!portfolio,
        label: t('crypto.portfolio'),
    });
    if (!portfolio) return null;
    return (
        <div style={styles.modalOverlay} {...overlayProps}>
            <div style={styles.modalContent} {...dialogProps}>
                <div style={styles.modalHeader}>
                    <h2>💼 {t('crypto.portfolio')}</h2>
                    <button
                        onClick={onClose}
                        style={styles.closeBtn}
                        aria-label={t('common.close')}
                    >
                        <FaTimes />
                    </button>
                </div>
                <div style={styles.balanceCard}>
                    <span>{t('crypto.balance')}</span>
                    <h1 style={_st1}>${formatPrice(portfolio.balance)}</h1>
                </div>
                <h4 style={_st2}>{t('crypto.assets')}</h4>
                <div style={styles.holdingsList}>
                    {!portfolio.holdings || Object.keys(portfolio.holdings).length === 0 ? (
                        <p style={_st3}>{t('crypto.noAssets')}</p>
                    ) : (
                        Object.entries(portfolio.holdings).map(([symbol, qty]) => (
                            <div key={symbol} style={styles.holdingItem}>
                                <strong style={_st4}>{symbol.replace('USDT', '')}</strong>
                                <span style={_st5}>{formatPrice(qty)}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

PortfolioModal.propTypes = {
    portfolio: PropTypes.number,
    onClose: PropTypes.func,
};
export default PortfolioModal;
