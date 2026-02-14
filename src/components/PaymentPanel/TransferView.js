// PaymentPanel/TransferView.js
import { FaCoins } from 'react-icons/fa';

const TransferView = ({ styles, balance, transferRecipient, setTransferRecipient,
    transferAmount, setTransferAmount, transferNote, setTransferNote, handleTransfer }) => (
    <div style={styles.transferView}>
        <h3 style={styles.sectionTitle}>Transfer Coins</h3>
        <div style={styles.form}>
            <div style={styles.formGroup}>
                <label style={styles.label}>Recipient Username</label>
                <input type="text" value={transferRecipient} onChange={e => setTransferRecipient(e.target.value)}
                    placeholder="@username" style={styles.input} />
            </div>
            <div style={styles.formGroup}>
                <label style={styles.label}>Amount</label>
                <input type="number" value={transferAmount} onChange={e => setTransferAmount(e.target.value)}
                    placeholder="0" min="1" max={balance} style={styles.input} />
                <div style={styles.hint}>Available: {balance} coins</div>
            </div>
            <div style={styles.formGroup}>
                <label style={styles.label}>Note (Optional)</label>
                <input type="text" value={transferNote} onChange={e => setTransferNote(e.target.value)}
                    placeholder="Add a message..." style={styles.input} />
            </div>
            <button onClick={handleTransfer} style={styles.transferBtn}><FaCoins /> Transfer Coins</button>
        </div>
    </div>
);

export default TransferView;
