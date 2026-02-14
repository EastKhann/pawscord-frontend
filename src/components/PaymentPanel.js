// frontend/src/components/PaymentPanel.js
import { FaTimes, FaCoins, FaCreditCard, FaHistory, FaWallet } from 'react-icons/fa';
import styles from './PaymentPanel/styles';
import usePayment from './PaymentPanel/hooks/usePayment';
import BuyCoinsView from './PaymentPanel/BuyCoinsView';
import TransferView from './PaymentPanel/TransferView';

const PaymentPanel = ({ fetchWithAuth, apiBaseUrl, onClose, username }) => {
    const {
        activeTab, setActiveTab, balance, transactions, loading,
        amount, setAmount, paymentMethod, setPaymentMethod,
        transferRecipient, setTransferRecipient,
        transferAmount, setTransferAmount,
        transferNote, setTransferNote,
        handlePurchase, handleTransfer
    } = usePayment(fetchWithAuth, apiBaseUrl);

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaWallet style={{ fontSize: '24px', color: '#faa61a' }} />
                        <h2 style={{ margin: 0, fontSize: '20px' }}>Payment Center</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeBtn}><FaTimes /></button>
                </div>

                <div style={styles.tabs}>
                    {[
                        { key: 'balance', icon: <FaCoins />, label: 'Balance' },
                        { key: 'buy', icon: <FaCreditCard />, label: 'Buy Coins' },
                        { key: 'transfer', icon: <FaCoins />, label: 'Transfer' },
                        { key: 'history', icon: <FaHistory />, label: 'History' }
                    ].map(t => (
                        <button key={t.key} onClick={() => setActiveTab(t.key)}
                            style={{ ...styles.tab, ...(activeTab === t.key && styles.activeTab) }}>
                            {t.icon} {t.label}
                        </button>
                    ))}
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Loading...</div>
                    ) : activeTab === 'balance' ? (
                        <div style={styles.balanceView}>
                            <div style={styles.balanceCard}>
                                <FaCoins style={{ fontSize: '48px', color: '#faa61a' }} />
                                <div style={styles.balanceAmount}>{balance.toLocaleString()}</div>
                                <div style={styles.balanceLabel}>Current Balance</div>
                            </div>
                            <div style={styles.quickActions}>
                                <button onClick={() => setActiveTab('buy')} style={styles.actionBtn}><FaCreditCard /> Buy Coins</button>
                                <button onClick={() => setActiveTab('transfer')} style={styles.actionBtn}><FaCoins /> Transfer Coins</button>
                            </div>
                        </div>
                    ) : activeTab === 'buy' ? (
                        <BuyCoinsView styles={styles} amount={amount} setAmount={setAmount}
                            paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}
                            handlePurchase={handlePurchase} />
                    ) : activeTab === 'transfer' ? (
                        <TransferView styles={styles} balance={balance}
                            transferRecipient={transferRecipient} setTransferRecipient={setTransferRecipient}
                            transferAmount={transferAmount} setTransferAmount={setTransferAmount}
                            transferNote={transferNote} setTransferNote={setTransferNote}
                            handleTransfer={handleTransfer} />
                    ) : (
                        <div style={styles.historyView}>
                            <h3 style={styles.sectionTitle}>Transaction History</h3>
                            {transactions.length === 0 ? (
                                <div style={styles.empty}>No transactions yet</div>
                            ) : (
                                <div style={styles.transactions}>
                                    {transactions.map((tx, idx) => (
                                        <div key={idx} style={styles.transaction}>
                                            <div style={styles.txIcon}>
                                                {tx.type === 'purchase' ? <FaCreditCard style={{ color: '#5865f2' }} />
                                                    : <FaCoins style={{ color: tx.type === 'transfer_sent' ? '#f04747' : '#43b581' }} />}
                                            </div>
                                            <div style={styles.txDetails}>
                                                <div style={styles.txTitle}>{tx.description}</div>
                                                <div style={styles.txDate}>{new Date(tx.created_at).toLocaleString()}</div>
                                            </div>
                                            <div style={{ ...styles.txAmount, color: tx.amount > 0 ? '#43b581' : '#f04747' }}>
                                                {tx.amount > 0 ? '+' : ''}{tx.amount}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentPanel;