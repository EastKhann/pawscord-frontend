import { useState } from 'react';
import { FaLock, FaTimes } from 'react-icons/fa';
import useModalA11y from '../hooks/useModalA11y';

const EncryptionKeyModal = ({ onClose, onSetKey, existingKey }) => {
    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Şifreleme Anahtarı' });
    const [key, setKey] = useState(existingKey || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSetKey(key);
        onClose();
    };

    return (
        <div style={styles.overlay} {...overlayProps}>
            <div style={styles.modal} {...dialogProps}>
                <div style={styles.header}>
                    <h3>🔐 Güvenli Sohbet Anahtarı</h3>
                    <button onClick={onClose} style={styles.closeBtn}><FaTimes /></button>
                </div>
                <form onSubmit={handleSubmit} style={styles.body}>
                    <p style={{ color: '#b9bbbe', fontSize: '0.9em' }}>
                        Bu sohbet için ortak bir şifre belirleyin. Bu şifre sunucuya gönderilmez.
                        Sadece aynı şifreyi giren taraf mesajları okuyabilir.
                    </p>
                    <input
                        type="password"
                        value={key}
                        onChange={e => setKey(e.target.value)}
                        placeholder="Gizli Anahtar (Örn: 123456)"
                        style={styles.input}
                        autoFocus
                    />
                    <button type="submit" style={styles.saveBtn}>Kaydet</button>
                    {existingKey && (
                        <button type="button" onClick={() => { onSetKey(''); onClose(); }} style={styles.clearBtn}>
                            Şifrelemeyi Kapat
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center' },
    modal: { backgroundColor: '#36393f', width: '400px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' },
    header: { padding: '15px 20px', backgroundColor: '#2f3136', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' },
    closeBtn: { background: 'none', border: 'none', color: '#b9bbbe', cursor: 'pointer' },
    body: { padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' },
    input: { padding: '10px', borderRadius: '4px', border: '1px solid #202225', backgroundColor: '#202225', color: 'white', outline: 'none' },
    saveBtn: { padding: '10px', backgroundColor: '#3ba55c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
    clearBtn: { padding: '10px', backgroundColor: '#ed4245', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }
};

export default EncryptionKeyModal;

