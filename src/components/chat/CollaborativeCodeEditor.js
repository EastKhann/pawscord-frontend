import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaCode, FaPlay, FaSave, FaUsers, FaCopy, FaDownload } from 'react-icons/fa';
import useCodeEditor from '../CollaborativeCodeEditor/useCodeEditor';
import styles from '../CollaborativeCodeEditor/codeEditorStyles';
import { useTranslation } from 'react-i18next';

const S = {
    el2: { ...styles.actionButton, ...styles.runButton },
    el: { ...styles.actionButton, ...styles.saveButton },
};

const LANGUAGES = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
];

const CollaborativeCodeEditor = ({
    roomId,
    userId,
    username,
    apiBaseUrl,
    fetchWithAuth,
    websocket,
    onClose,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    const {
        code,
        language,
        output,
        collaborators,
        saving,
        running,
        editorRef,
        saveCode,
        runCode,
        copyCode,
        downloadCode,
        changeLanguage,
    } = useCodeEditor({ roomId, userId, username, apiBaseUrl, fetchWithAuth, websocket });

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <FaCode style={styles.headerIcon} />
                    <h2 style={styles.title}>Kod Editörü</h2>
                    <select
                        value={language}
                        onChange={(e) => changeLanguage(e.target.value)}
                        style={styles.languageSelect}
                    >
                        {LANGUAGES.map((l) => (
                            <option key={l.value} value={l.value}>
                                {l.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={styles.headerRight}>
                    <div style={styles.collaborators}>
                        <FaUsers className="mr-6" />
                        <span>{collaborators.length + 1}</span>
                    </div>
                    <button
                        aria-label="Kodu kopyala"
                        onClick={copyCode}
                        style={styles.actionButton}
                        title="Kopyala"
                    >
                        <FaCopy />
                    </button>
                    <button
                        aria-label="Kodu indir"
                        onClick={downloadCode}
                        style={styles.actionButton}
                        title="İndir"
                    >
                        <FaDownload />
                    </button>
                    <button
                        aria-label="Kodu kaydet"
                        onClick={saveCode}
                        disabled={saving}
                        style={S.el}
                        title="Kaydet"
                    >
                        <FaSave />
                    </button>
                    <button
                        aria-label="run Code"
                        onClick={runCode}
                        disabled={running}
                        style={S.el2}
                        title={t('common.run')}
                    >
                        <FaPlay />
                    </button>
                </div>
            </div>

            <div style={styles.editorContainer}>
                <div ref={editorRef} style={styles.editor} />
            </div>

            {output && (
                <div style={styles.outputPanel}>
                    <div style={styles.outputHeader}>
                        <span>Output</span>
                    </div>
                    <pre style={styles.outputContent}>{output}</pre>
                </div>
            )}
        </div>
    );
};

CollaborativeCodeEditor.propTypes = {
    roomId: PropTypes.string,
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    username: PropTypes.string,
    apiBaseUrl: PropTypes.string,
    fetchWithAuth: PropTypes.func,
    websocket: PropTypes.object,
    onClose: PropTypes.func,
};
export default CollaborativeCodeEditor;
