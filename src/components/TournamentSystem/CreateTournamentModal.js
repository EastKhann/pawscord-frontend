import { useState } from 'react';
import styles from './styles';
import useModalA11y from '../../hooks/useModalA11y';

const CreateTournamentModal = ({ onClose, onCreate }) => {
    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Turnuva Oluştur' });
    const [formData, setFormData] = useState({
        name: '',
        game: '',
        max_participants: 8,
        start_date: '',
        prize: '',
        rules: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(formData);
    };

    return (
        <div style={styles.modalOverlay} {...overlayProps}>
            <div style={styles.modal} {...dialogProps}>
                <h3 style={styles.modalTitle}>Yeni Turnuva Olu{'ş'}tur</h3>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Turnuva Ad{'ı'}"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={styles.input}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Oyun"
                        value={formData.game}
                        onChange={(e) => setFormData({ ...formData, game: e.target.value })}
                        style={styles.input}
                        required
                    />
                    <select
                        value={formData.max_participants}
                        onChange={(e) => setFormData({ ...formData, max_participants: parseInt(e.target.value) })}
                        style={styles.input}
                    >
                        <option value={4}>4 Ki{'ş'}i</option>
                        <option value={8}>8 Ki{'ş'}i</option>
                        <option value={16}>16 Ki{'ş'}i</option>
                        <option value={32}>32 Ki{'ş'}i</option>
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
                        placeholder={'Ödül (opsiyonel)'}
                        value={formData.prize}
                        onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
                        style={styles.input}
                    />
                    <textarea
                        placeholder="Kurallar"
                        value={formData.rules}
                        onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
                        style={{ ...styles.input, minHeight: '100px' }}
                    />
                    <div style={styles.modalButtons}>
                        <button type="button" onClick={onClose} style={styles.cancelButton}>
                            {'İ'}ptal
                        </button>
                        <button type="submit" style={styles.submitButton}>
                            Olu{'ş'}tur
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTournamentModal;
