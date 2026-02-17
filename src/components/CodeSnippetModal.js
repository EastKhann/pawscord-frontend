import { useState } from 'react';
import { FaCode, FaTimes, FaPaperPlane } from 'react-icons/fa';
import useModalA11y from '../hooks/useModalA11y';

const LANGUAGES = ['javascript', 'python', 'html', 'css', 'java', 'cpp', 'csharp', 'sql', 'json', 'typescript', 'go', 'rust', 'php'];

const CodeSnippetModal = ({ onClose, onSend }) => {
    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Kod Paylaş' });
    const [title, setTitle] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!code.trim()) return;
        onSend({ title, language, code });
    };

    return (
        <div style={styles.overlay} {...overlayProps}>
            <div style={styles.modal} {...dialogProps}>
                <div style={styles.header}>
                    <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaCode color="#5865f2" /> Kod Paylaş
                    </h3>
                    <button onClick={onClose} style={styles.closeBtn}><FaTimes /></button>
                </div>

                <div style={styles.body}>
                    <div style={styles.row}>
                        <input
                            placeholder="Başlık (Opsiyonel)"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            style={styles.input}
                        />
                        <select
                            value={language}
                            onChange={e => setLanguage(e.target.value)}
                            style={styles.select}
                        >
                            {LANGUAGES.map(lang => (
                                <option key={lang} value={lang}>{lang.toUpperCase()}</option>
                            ))}
                        </select>
                    </div>

                    <textarea
                        placeholder="Kodunuzu buraya yapıştırın..."
                        value={code}
                        onChange={e => setCode(e.target.value)}
                        style={styles.textarea}
                    />

                    <button onClick={handleSubmit} style={styles.sendBtn}>
                        <FaPaperPlane /> Gönder
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center' },
    modal: { backgroundColor: '#2b2d31', width: '90%', maxWidth: '600px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #1e1f22', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' },
    header: { padding: '15px 20px', borderBottom: '1px solid #1f2023', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' },
    closeBtn: { background: 'none', border: 'none', color: '#b9bbbe', cursor: 'pointer', fontSize: '1.2em' },
    body: { padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' },
    row: { display: 'flex', gap: '10px' },
    input: { flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #1f2023', backgroundColor: '#383a40', color: 'white', outline: 'none' },
    select: { padding: '10px', borderRadius: '6px', border: '1px solid #1f2023', backgroundColor: '#383a40', color: 'white', outline: 'none' },
    textarea: { minHeight: '200px', padding: '15px', borderRadius: '6px', border: '1px solid #1f2023', backgroundColor: '#1e1f22', color: '#00ff00', fontFamily: 'monospace', resize: 'vertical', outline: 'none' },
    sendBtn: { padding: '12px', backgroundColor: '#5865f2', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }
};

export default CodeSnippetModal;

