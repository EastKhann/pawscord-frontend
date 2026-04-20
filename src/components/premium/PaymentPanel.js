import PropTypes from 'prop-types';
import { FaTimes, FaCoins, FaCreditCard, FaHistory, FaWallet, FaCheckCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import styles from '../PaymentPanel/styles';
import usePayment from '../PaymentPanel/hooks/usePayment';
import BuyCoinsView from '../PaymentPanel/BuyCoinsView';
import TransferView from '../PaymentPanel/TransferView';

const BALANCE_ICON_STYLE = { fontSize: '48px', color: '#f0b232' };

const PaymentPanel = ({ fetchWithAuth, apiBaseUrl, onClose, username }) => {
    const { t } = useTranslation();
    const {
        activeTab,
        setActiveTab,
        balance,
        transactions,
        loading,
        amount,
        setAmount,
        paymentMethod,
        setPaymentMethod,
        transferRecipient,
        setTransferRecipient,
        transferAmount,
        setTransferAmount,
        transferNote,
        setTransferNote,
        handlePurchase,
        handleTransfer,
        successCoins,
    } = usePayment(fetchWithAuth, apiBaseUrl);

    return (
        <div
            style={styles.overlay}
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <style>{`
                @keyframes ppOverlayIn { from{opacity:0} to{opacity:1} }
                @keyframes ppModalIn { from{opacity:0;transform:scale(0.94) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }
            `}</style>
            <div
                style={styles.modal}
                role="button"
                tabIndex={0}
                onClick={(event) => event.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                {/* ── Success animation overlay ── */}
                {successCoins && (
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '8px',
                        background: 'rgba(10,20,10,0.92)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                        gap: '16px',
                        animation: 'paySuccessIn 0.4s cubic-bezier(0.22,1,0.36,1) both',
                    }}>
                        <style>{`
                            @keyframes paySuccessIn { from{opacity:0;transform:scale(0.85)} to{opacity:1;transform:scale(1)} }
                            @keyframes checkBounce { 0%{transform:scale(0)} 60%{transform:scale(1.25)} 100%{transform:scale(1)} }
                            @keyframes coinSpin { from{transform:rotateY(0deg)} to{transform:rotateY(720deg)} }
                        `}</style>
                        <FaCheckCircle size={72} color="#23a559" style={{ animation: 'checkBounce 0.5s ease 0.1s both' }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', animation: 'coinSpin 0.8s ease 0.3s both' }}>
                            <FaCoins size={32} color="#f0b232" />
                        </div>
                        <div style={{ fontSize: '28px', fontWeight: 800, color: '#23a559', letterSpacing: '-0.5px' }}>
                            +{successCoins.toLocaleString()} 💰
                        </div>
                        <div style={{ color: '#b5bac1', fontSize: '15px' }}>
                            {t('payment.transferSuccess', 'Transfer successful!')}
                        </div>
                    </div>
                )}
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaWallet className="text-f0b-24" />
                        <h2 className="m0-fs20">{t('payment.title', 'Ödeme Merkezi')}</h2>
                    </div>
                    <button aria-label="Close" onClick={onClose} style={styles.closeBtn}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.tabs}>
                    {[
                        {
                            key: 'balance',
                            icon: <FaCoins />,
                            label: t('payment.balance', 'Bakiye'),
                        },
                        {
                            key: 'buy',
                            icon: <FaCreditCard />,
                            label: t('payment.buyCoins', 'Coin Satın Al'),
                        },
                        {
                            key: 'transfer',
                            icon: <FaCoins />,
                            label: t('payment.transfer', 'Transfer'),
                        },
                        {
                            key: 'history',
                            icon: <FaHistory />,
                            label: t('payment.history', 'Geçmiş'),
                        },
                    ].map((tab) => {
                        const tabStyle = {
                            ...styles.tab,
                            ...(activeTab === tab.key ? styles.activeTab : {}),
                        };

                        return (
                            <button
                                aria-label="Switch tab"
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                style={tabStyle}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        );
                    })}
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>{t('common.loading')}</div>
                    ) : activeTab === 'balance' ? (
                        <div style={styles.balanceView}>
                            <div style={styles.balanceCard}>
                                <FaCoins style={BALANCE_ICON_STYLE} />
                                <div style={styles.balanceAmount}>{balance.toLocaleString()}</div>
                                <div style={styles.balanceLabel}>
                                    {t('payment.currentBalance', 'Mevcut Bakiye')}
                                </div>
                            </div>
                            <div style={styles.quickActions}>
                                <button
                                    aria-label="Buy Coins"
                                    onClick={() => setActiveTab('buy')}
                                    style={styles.actionBtn}
                                >
                                    <FaCreditCard /> {t('payment.buyCoins', 'Coin Satın Al')}
                                </button>
                                <button
                                    aria-label="Transfer Coins"
                                    onClick={() => setActiveTab('transfer')}
                                    style={styles.actionBtn}
                                >
                                    <FaCoins /> {t('payment.transferCoins', 'Coin Transfer Et')}
                                </button>
                            </div>
                        </div>
                    ) : activeTab === 'buy' ? (
                        <BuyCoinsView
                            styles={styles}
                            amount={amount}
                            setAmount={setAmount}
                            paymentMethod={paymentMethod}
                            setPaymentMethod={setPaymentMethod}
                            handlePurchase={handlePurchase}
                        />
                    ) : activeTab === 'transfer' ? (
                        <TransferView
                            styles={styles}
                            balance={balance}
                            transferRecipient={transferRecipient}
                            setTransferRecipient={setTransferRecipient}
                            transferAmount={transferAmount}
                            setTransferAmount={setTransferAmount}
                            transferNote={transferNote}
                            setTransferNote={setTransferNote}
                            handleTransfer={handleTransfer}
                        />
                    ) : (
                        <div style={styles.historyView}>
                            <h3 style={styles.sectionTitle}>İşlem Geçmişi</h3>
                            {transactions.length === 0 ? (
                                <div style={styles.empty}>Henüz işlem yok</div>
                            ) : (
                                <div style={styles.transactions}>
                                    {transactions.map((tx, idx) => {
                                        const coinIconStyle = {
                                            color:
                                                tx.type === 'transfer_sent' ? '#f23f42' : '#23a559',
                                        };
                                        const txAmountStyle = {
                                            ...styles.txAmount,
                                            color: tx.amount > 0 ? '#23a559' : '#f23f42',
                                        };

                                        return (
                                            <div key={`item-${idx}`} style={styles.transaction}>
                                                <div style={styles.txIcon}>
                                                    {tx.type === 'purchase' ? (
                                                        <FaCreditCard className="icon-primary" />
                                                    ) : (
                                                        <FaCoins style={coinIconStyle} />
                                                    )}
                                                </div>
                                                <div style={styles.txDetails}>
                                                    <div style={styles.txTitle}>
                                                        {tx.description}
                                                    </div>
                                                    <div style={styles.txDate}>
                                                        {new Date(tx.created_at).toLocaleString()}
                                                    </div>
                                                </div>
                                                <div style={txAmountStyle}>
                                                    {tx.amount > 0 ? '+' : ''}
                                                    {tx.amount}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

PaymentPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
    username: PropTypes.string,
};

export default PaymentPanel;
