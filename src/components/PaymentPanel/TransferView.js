/* eslint-disable jsx-a11y/label-has-associated-control */
// PaymentPanel/TransferView.js
import { FaCoins } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const TransferView = ({
    styles,
    balance,
    transferRecipient,
    setTransferRecipient,
    transferAmount,
    setTransferAmount,
    transferNote,
    setTransferNote,
    handleTransfer,
}) => {
    const { t } = useTranslation();
    return (
        <div style={styles.transferView}>
            <h3 style={styles.sectionTitle}>{t('transfer_coins')}</h3>
            <div style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>{t('recipient_username')}</label>
                    <input
                        type="text"
                        value={transferRecipient}
                        onChange={(e) => setTransferRecipient(e.target.value)}
                        placeholder={t('username')}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>{t('amount')}</label>
                    <input
                        type="number"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        placeholder="0"
                        min="1"
                        max={balance}
                        style={styles.input}
                    />
                    <div style={styles.hint}>Available: {balance} coins</div>
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>{t('note_optional')}</label>
                    <input
                        type="text"
                        value={transferNote}
                        onChange={(e) => setTransferNote(e.target.value)}
                        placeholder="Mesaj ekleyin..."
                        style={styles.input}
                    />
                </div>
                <button onClick={handleTransfer} style={styles.transferBtn}>
                    <FaCoins />
                    {t('transfer_coins')}
                </button>
            </div>
        </div>
    );
};

TransferView.propTypes = {
    styles: PropTypes.array,
    balance: PropTypes.object,
    transferRecipient: PropTypes.object,
    setTransferRecipient: PropTypes.func,
    transferAmount: PropTypes.number,
    setTransferAmount: PropTypes.func,
    transferNote: PropTypes.object,
    setTransferNote: PropTypes.func,
    handleTransfer: PropTypes.func,
};
export default TransferView;
