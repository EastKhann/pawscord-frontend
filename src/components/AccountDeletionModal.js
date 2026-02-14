import { FaExclamationTriangle, FaTimes, FaTrash, FaLock, FaSpinner } from 'react-icons/fa';
import styles from './AccountDeletionModal/accountDeletionStyles';
import useAccountDeletion from './AccountDeletionModal/useAccountDeletion';

const DELETE_ITEMS = [
  '\u2717 T\u00FCm mesajlar\u0131n\u0131z', '\u2717 Profil bilgileriniz ve avatar\u0131n\u0131z',
  '\u2717 Sunucu sahiplikleriniz (sunucular silinecek)', '\u2717 Arkada\u015F listeniz',
  '\u2717 Premium aboneli\u011Finiz', '\u2717 XP, seviye ve rozetleriniz',
  '\u2717 Ba\u011Fl\u0131 hesaplar\u0131n\u0131z (Spotify, Steam, vb.)'
];

const AccountDeletionModal = ({ isOpen, onClose, onConfirmDelete, username, fetchWithAuth, apiBaseUrl }) => {
  const { step, setStep, password, setPassword, confirmText, setConfirmText, isDeleting, error, CONFIRM_PHRASE, handleClose, handleProceedToConfirm, handleDelete, isDeleteDisabled } = useAccountDeletion({ onClose, onConfirmDelete, username, fetchWithAuth, apiBaseUrl });

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={handleClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <div style={styles.header}>
          <div style={styles.headerIcon}><FaExclamationTriangle size={24} color="#f04747" /></div>
          <h2 style={styles.title}>Hesab\u0131 Sil</h2>
          <button style={styles.closeButton} onClick={handleClose}><FaTimes size={18} /></button>
        </div>

        {step === 1 && (
          <div style={styles.content}>
            <div style={styles.warningBox}>
              <FaExclamationTriangle size={48} color="#f04747" />
              <h3 style={styles.warningTitle}>Bu i\u015Flem geri al\u0131namaz!</h3>
              <p style={styles.warningText}>Hesab\u0131n\u0131z\u0131 sildi\u011Finizde a\u015Fa\u011F\u0131dakiler kal\u0131c\u0131 olarak silinecektir:</p>
            </div>
            <ul style={styles.deleteList}>{DELETE_ITEMS.map((item, i) => <li key={i}>{item}</li>)}</ul>
            <div style={styles.infoBox}>
              <p><strong>Not:</strong> \u00DCye oldu\u011Funuz sunuculardaki mesajlar\u0131n\u0131z g\u00F6r\u00FCn\u00FCr kalacak ancak kullan\u0131c\u0131 ad\u0131n\u0131z "Silinmi\u015F Kullan\u0131c\u0131" olarak g\u00F6sterilecektir.</p>
            </div>
            <div style={styles.buttonGroup}>
              <button style={styles.cancelButton} onClick={handleClose}>Vazge\u00E7</button>
              <button style={styles.dangerButton} onClick={handleProceedToConfirm}>Devam Et</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={styles.content}>
            <div style={styles.confirmBox}>
              <FaLock size={32} color="#faa61a" />
              <h3 style={styles.confirmTitle}>Kimli\u011Finizi Do\u011Frulay\u0131n</h3>
              <p style={styles.confirmText}>Hesab\u0131n\u0131z\u0131 silmek i\u00E7in \u015Fifrenizi girin ve onay metnini yaz\u0131n.</p>
            </div>
            {error && <div style={styles.errorBox}>{error}</div>}
            <div style={styles.inputGroup}>
              <label style={styles.label}>\u015Eifreniz</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="\u015Eifrenizi girin" style={styles.input} disabled={isDeleting} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Onaylamak i\u00E7in <code style={styles.code}>{CONFIRM_PHRASE}</code> yaz\u0131n</label>
              <input type="text" value={confirmText} onChange={e => setConfirmText(e.target.value)} placeholder={CONFIRM_PHRASE} style={{ ...styles.input, borderColor: confirmText === CONFIRM_PHRASE ? '#43b581' : '#40444b' }} disabled={isDeleting} />
            </div>
            <div style={styles.buttonGroup}>
              <button style={styles.cancelButton} onClick={() => setStep(1)} disabled={isDeleting}>Geri</button>
              <button style={{ ...styles.deleteButton, opacity: isDeleteDisabled ? 0.5 : 1, cursor: isDeleteDisabled ? 'not-allowed' : 'pointer' }} onClick={handleDelete} disabled={isDeleteDisabled}>
                {isDeleting ? <><FaSpinner className="spin" style={{ marginRight: 8 }} />Siliniyor...</> : <><FaTrash style={{ marginRight: 8 }} />Hesab\u0131m\u0131 Kal\u0131c\u0131 Olarak Sil</>}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountDeletionModal;
