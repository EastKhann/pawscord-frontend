import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaCode, FaTimes, FaPaperPlane } from 'react-icons/fa';
import useModalA11y from '../../hooks/useModalA11y';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
    'javascript',
    'python',
    'html',
    'css',
    'java',
    'cpp',
    'csharp',
    'sql',
    'json',
    'typescript',
    'go',
    'rust',
    'php',
];

const CodeSnippetModal = ({ onClose, onSend }) => {
    const { t } = useTranslation();
    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Kod Share' });
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
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
                    <h3 className="flex-align-m0">
                        <FaCode color="#5865f2" /> Kod Share
                    </h3>
                    <button aria-label={t('common.close', 'Close')} onClick={onClose} style={styles.closeBtn}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.body}>
                    <div style={styles.row}>
                        <input
                            placeholder={t('codeSnippet.title', 'Title (Optional)')}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={styles.input}
                        />
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            style={styles.select}
                        >
                            {LANGUAGES.map((lang) => (
                                <option key={lang} value={lang}>
                                    {lang.toUpperCase()}
                                </option>
                            ))}
                        </select>
                    </div>

                    <textarea
                        placeholder={t('ui.kodunuzu_buraya_pastein')}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        style={styles.textarea}
                    />

                    <button
                        aria-label={t('codeSnippet.submit', 'Submit code snippet')}
                        onClick={handleSubmit}
                        style={styles.sendBtn}
                    >
                        <FaPaperPlane /> Send
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        zIndex: 2000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#111214',
        width: '90%',
        maxWidth: '600px',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #0b0e1b',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    },
    header: {
        padding: '15px 20px',
        borderBottom: '1px solid #16203a',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: '#b5bac1',
        cursor: 'pointer',
        fontSize: '1.2em',
    },
    body: { padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' },
    row: { display: 'flex', gap: '10px' },
    input: {
        flex: 1,
        padding: '10px',
        borderRadius: '6px',
        border: '1px solid #16203a',
        backgroundColor: '#1e2024',
        color: 'white',
        outline: 'none',
    },
    select: {
        padding: '10px',
        borderRadius: '6px',
        border: '1px solid #16203a',
        backgroundColor: '#1e2024',
        color: 'white',
        outline: 'none',
    },
    textarea: {
        minHeight: '200px',
        padding: '15px',
        borderRadius: '6px',
        border: '1px solid #16203a',
        backgroundColor: '#0d0e10',
        color: '#00ff00',
        fontFamily: 'monospace',
        resize: 'vertical',
        outline: 'none',
    },
    sendBtn: {
        padding: '12px',
        backgroundColor: '#5865f2',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
    },
};

CodeSnippetModal.propTypes = {
    onClose: PropTypes.func,
    onSend: PropTypes.func,
};
export default CodeSnippetModal;
