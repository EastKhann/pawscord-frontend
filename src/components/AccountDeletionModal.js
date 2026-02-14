import { FaExclamationTriangle, FaTimes, FaTrash, FaLock, FaSpinner } from 'react-icons/fa';
import styles from './AccountDeletionModal/accountDeletionStyles';
import useAccountDeletion from './AccountDeletionModal/useAccountDeletion';

const DELETE_ITEMS = [
  '✗ Tüm mesajlarınız', '✗ Profil bilgileriniz ve avatarınız',
  '✗ Sunucu sahiplikleriniz (sunucular silinecek)', '✗ Arkadaş listeniz',
  '✗ Premium aboneliğiniz', '✗ XP, seviye ve rozetleriniz',
  '✗ Bağlı hesaplarınız (Spotify, Steam, vb.)'
];

const AccountDeletionModal = ({ isOpen, onClose, onConfirmDelete, username, fetchWithAuth, apiBaseUrl }) => {
  const { step, setStep, password, setPassword, confirmText, setConfirmText, isDeleting, error, CONFIRM_PHRASE, handleClose, handleProceedToConfirm, handleDelete, isDeleteDisabled } = useAccountDeletion({ onClose, onConfirmDelete, username, fetchWithAuth, apiBaseUrl });

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={handleClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <div style={styles.header}>
          <div style={styles.headerIcon}><FaExclamationTriangle size={24} color="#f04747" /></div>
          <h2 style={styles.title}>Hesabı Sil</h2>
          <button style={styles.closeButton} onClick={handleClose}><FaTimes size={18} /></button>
        </div>

        {step === 1 && (
          <div style={styles.content}>
            <div style={styles.warningBox}>
              <FaExclamationTriangle size={48} color="#f04747" />
              <h3 style={styles.warningTitle}>Bu işlem geri alınamaz!</h3>
              <p style={styles.warningText}>Hesabınızı sildiğinizde aşağıdakiler kalıcı olarak silinecektir:</p>
            </div>
            <ul style={styles.deleteList}>{DELETE_ITEMS.map((item, i) => <li key={i}>{item}</li>)}</ul>
            <div style={styles.infoBox}>
              <p><strong>Not:</strong> Üye olduğunuz sunuculardaki mesajlarınız görünür kalacak ancak kullanıcı adınız "Silinmiş Kullanıcı" olarak gösterilecektir.</p>
            </div>
            <div style={styles.buttonGroup}>
              <button style={styles.cancelButton} onClick={handleClose}>Vazgeç</button>
              <button style={styles.dangerButton} onClick={handleProceedToConfirm}>Devam Et</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={styles.content}>
            <div style={styles.confirmBox}>
              <FaLock size={32} color="#faa61a" />
              <h3 style={styles.confirmTitle}>Kimliğinizi Doğrulayın</h3>
              <p style={styles.confirmText}>Hesabınızı silmek için şifrenizi girin ve onay metnini yazın.</p>
            </div>
            {error && <div style={styles.errorBox}>{error}</div>}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Şifreniz</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Şifrenizi girin" style={styles.input} disabled={isDeleting} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Onaylamak için <code style={styles.code}>{CONFIRM_PHRASE}</code> yazın</label>
              <input type="text" value={confirmText} onChange={e => setConfirmText(e.target.value)} placeholder={CONFIRM_PHRASE} style={{ ...styles.input, borderColor: confirmText === CONFIRM_PHRASE ? '#43b581' : '#40444b' }} disabled={isDeleting} />
            </div>
            <div style={styles.buttonGroup}>
              <button style={styles.cancelButton} onClick={() => setStep(1)} disabled={isDeleting}>Geri</button>
              <button style={{ ...styles.deleteButton, opacity: isDeleteDisabled ? 0.5 : 1, cursor: isDeleteDisabled ? 'not-allowed' : 'pointer' }} onClick={handleDelete} disabled={isDeleteDisabled}>
                {isDeleting ? <><FaSpinner className="spin" style={{ marginRight: 8 }} />Siliniyor...</> : <><FaTrash style={{ marginRight: 8 }} />Hesabımı Kalıcı Olarak Sil</>}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountDeletionModal;
