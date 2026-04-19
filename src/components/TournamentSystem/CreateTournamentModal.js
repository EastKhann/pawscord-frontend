import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import useModalA11y from '../../hooks/useModalA11y';
import { useTranslation } from 'react-i18next';

const S = {
    size: { ...styles.input, minHeight: '100px' },
};

const CreateTournamentModal = ({ onClose, onCreate }) => {
    const { t } = useTranslation();

    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Turnuva Create' });
    const [formData, setFormData] = useState({
        name: '',
        game: '',
        max_participants: 8,
        start_date: '',
        prize: '',
        rules: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(formData);
    };

    return (
        <div style={styles.modalOverlay} {...overlayProps}>
            <div style={styles.modal} {...dialogProps}>
                <h3 style={styles.modalTitle}>Yeni Turnuva Oluştur</h3>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        placeholder={t('turnuva_ad_ı')}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={styles.input}
                        required
                    />
                    <input
                        type="text"
                        placeholder={t('oyun')}
                        value={formData.game}
                        onChange={(e) => setFormData({ ...formData, game: e.target.value })}
                        style={styles.input}
                        required
                    />
                    <select
                        value={formData.max_participants}
                        onChange={(e) =>
                            setFormData({ ...formData, max_participants: parseInt(e.target.value) })
                        }
                        style={styles.input}
                    >
                        <option value={4}>4 Kişi</option>
                        <option value={8}>8 Kişi</option>
                        <option value={16}>16 Kişi</option>
                        <option value={32}>32 Kişi</option>
                    </select>
                    <input
                        type="datetime-local"
                        value={formData.start_date}
                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                        style={styles.input}
                        required
                    />
                    <input
                        type="text"
                        placeholder={'Reward (opsiyonel)'}
                        value={formData.prize}
                        onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
                        style={styles.input}
                    />
                    <textarea
                        placeholder={t('kurallar')}
                        value={formData.rules}
                        onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
                        style={S.size}
                    />
                    <div style={styles.modalButtons}>
                        <button type="button" onClick={onClose} style={styles.cancelButton}>
                            Cancel
                        </button>
                        <button type="submit" style={styles.submitButton}>
                            Oluştur
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

CreateTournamentModal.propTypes = {
    onClose: PropTypes.func,
    onCreate: PropTypes.func,
};
export default CreateTournamentModal;
