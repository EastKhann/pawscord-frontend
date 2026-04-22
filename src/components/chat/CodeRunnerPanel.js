/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect, useCallback, memo } from 'react';
import { getToken } from '../../utils/tokenStorage';

import PropTypes from 'prop-types';

import {
    FaCode,
    FaTimes,
    FaPlay,
    FaStop,
    FaCopy,
    FaTrash,
    FaDownload,
    FaHistory,
    FaSave,
    FaFolder,
    FaPlus,
    FaTerminal,
    FaClock,
    FaCheckCircle,
    FaExclamationTriangle,
    FaExpand,
    FaCompress,
    FaPython,
    FaJs,
    FaJava,
} from 'react-icons/fa';

import { toast } from 'react-toastify';

import './CodeRunnerPanel.css';

import { useTranslation } from 'react-i18next';

import logger from '../../utils/logger';
import { API_BASE_URL } from '../../utils/apiEndpoints';

const CodeRunnerPanel = ({ serverId, channelId, onClose }) => {
    const { t } = useTranslation();

    const [code, setCode] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [language, setLanguage] = useState('python');

    const [output, setOutput] = useState('');

    const [isRunning, setIsRunning] = useState(false);

    const [execTime, setExecTime] = useState(null);

    const [history, setHistory] = useState([]);

    const [showHistory, setShowHistory] = useState(false);

    const [savedSnippets, setSavedSnippets] = useState([]);

    const [showSaveModal, setShowSaveModal] = useState(false);

    const [isFullscreen, setIsFullscreen] = useState(false);

    const token = getToken();

    const languages = [
        {
            id: 'python',
            name: 'Python',
            icon: <FaPython />,
            template: '# Python Code\nprint("Hello, World!")',
        },

        {
            id: 'cpp',
            name: 'C++',
            icon: <FaCode />,
            template:
                '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" <<endl;\n    return 0;\n}',
        },

        {
            id: 'c',
            name: 'C',
            icon: <FaCode />,
            template:
                '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
        },

        {
            id: 'ruby',
            name: 'Ruby',
            icon: <FaCode />,
            template: '# Ruby Code\nputs "Hello, World!"',
        },

        {
            id: 'go',
            name: 'Go',
            icon: <FaCode />,
            template:
                'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
        },

        {
            id: 'rust',
            name: 'Rust',
            icon: <FaCode />,
            template: 'fn main() {\n    println!("Hello, World!");\n}',
        },
    ];

    useEffect(() => {
        // TODO: Backend not yet implemented — API endpoints don't exist
        // fetchHistory();
        // fetchSavedSnippets();
    }, []);

    useEffect(() => {
        const lang = languages.find((l) => l.id === language);

        if (lang && !code) {
            setCode(lang.template);
        }
    }, [language]);

    const fetchHistory = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/code-runner/history/`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();

                setHistory(data.history || []);
            }
        } catch (error) {
            logger.error('Error fetching history:', error);
        }
    };

    const fetchSavedSnippets = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/code-runner/snippets/`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();

                setSavedSnippets(data.snippets || []);
            }
        } catch (error) {
            logger.error('Error fetching snippets:', error);
        }
    };

    const handleRunCode = async () => {
        if (!code.trim()) {
            toast.warning(t('ui.kod_bos_olamaz'));

            return;
        }

        setIsRunning(true);

        setOutput(t('common.running'));

        const startTime = Date.now();

        try {
            const response = await fetch(`${API_BASE_URL}/code-runner/execute/`, {
                method: 'POST',

                headers: {
                    Authorization: `Bearer ${token}`,

                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    code,

                    language,

                    channel_id: channelId,
                }),
            });

            const data = await response.json();

            const endTime = Date.now();

            setExecTime(endTime - startTime);

            if (response.ok) {
                setOutput(data.output || t('ui.exitti_yok'));

                if (data.error) {
                    setOutput(`Error:\n${data.error}`);
                }
            } else {
                setOutput(`Error: ${data.message || t('ui.kod_calistirilamadi')}`);
            }

            fetchHistory();
        } catch (error) {
            setOutput(t('common.connectionError', 'Bağlantı hatası'));
        }

        setIsRunning(false);
    };

    const handleStopExecution = async () => {
        try {
            await fetch(`${API_BASE_URL}/code-runner/stop/`, {
                method: 'POST',

                headers: { Authorization: `Bearer ${token}` },
            });

            setIsRunning(false);

            setOutput(t('ui.calistirma_durduruldu'));
        } catch (error) {
            toast.error(t('ui.stop_failed'));
        }
    };

    const handleSaveSnippet = async (name) => {
        try {
            const response = await fetch(`${API_BASE_URL}/code-runner/snippets/`, {
                method: 'POST',

                headers: {
                    Authorization: `Bearer ${token}`,

                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({ name, code, language }),
            });

            if (response.ok) {
                toast.success(t('codeRunner.snippetSaved'));

                fetchSavedSnippets();

                setShowSaveModal(false);
            }
        } catch (error) {
            toast.error(t('codeRunner.saveFailed'));
        }
    };

    const handleLoadSnippet = (snippet) => {
        setCode(snippet.code);

        setLanguage(snippet.language);

        setShowHistory(false);
    };

    const handleDeleteSnippet = async (snippetId) => {
        try {
            await fetch(`${API_BASE_URL}/code-runner/snippets/${snippetId}/`, {
                method: 'DELETE',

                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success(t('codeRunner.snippetDeleted'));

            fetchSavedSnippets();
        } catch (error) {
            toast.error(t('common.deleteFailed'));
        }
    };

    const handleCopyOutput = () => {
        navigator.clipboard.writeText(output);

        toast.success(t('ui.exitti_copied'));
    };

    const handleClearAll = () => {
        setCode('');

        setOutput('');

        setExecTime(null);
    };

    const handleShareToChannel = async () => {
        if (!channelId) {
            toast.warning(t('ui.share_channel_required'));

            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/channels/${channelId}/messages/`, {
                method: 'POST',

                headers: {
                    Authorization: `Bearer ${token}`,

                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    content: `\`\`\`${language}\n${code}\n\`\`\`\n**Output:**\n\`\`\`\n${output}\n\`\`\``,
                }),
            });

            if (response.ok) {
                toast.success(t('ui.kanala_paylasildi'));
            }
        } catch (error) {
            toast.error(t('ui.share_failed'));
        }
    };

    // useCallback handlers

    const handleOverlayClick = useCallback(
        (e) => {
            if (e.target.className.includes('code-runner-overlay')) onClose();
        },
        [onClose]
    );

    const handleToggleFullscreen = useCallback(() => setIsFullscreen((prev) => !prev), []);

    const handleToggleHistory = useCallback(() => setShowHistory((prev) => !prev), []);

    const handleShowSaveModal = useCallback(() => setShowSaveModal(true), []);

    const handleHideSaveModal = useCallback(() => setShowSaveModal(false), []);

    const handleCodeChange = useCallback((e) => setCode(e.target.value), []);

    const handleHideHistory = useCallback(() => setShowHistory(false), []);

    return (
        <div
            className={`code-runner-overlay ${isFullscreen ? 'fullscreen' : ''}`}
            role="button"
            tabIndex={0}
            onClick={handleOverlayClick}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div className="code-runner-panel">
                <div className="panel-header">
                    <h2>
                        <FaCode /> {t('codeRunner.title', 'Code Runner')}
                    </h2>

                    <div className="header-actions">
                        <button
                            aria-label={t('codeRunner.toggleFullscreen', 'Toggle fullscreen')}
                            className="fullscreen-btn"
                            onClick={handleToggleFullscreen}
                        >
                            {isFullscreen ? <FaCompress /> : <FaExpand />}
                        </button>

                        <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                            <FaTimes />
                        </button>
                    </div>
                </div>

                <div className="toolbar">
                    <div className="language-selector">
                        {languages.map((lang) => (
                            <button
                                aria-label={t('codeRunner.selectLang', 'Select {{lang}}', { lang: lang.name })}
                                onClick={() => setLanguage(lang.id)}
                                title={lang.name}
                            >
                                {lang.icon}

                                <span>{lang.name}</span>
                            </button>
                        ))}
                    </div>

                    <div className="toolbar-actions">
                        <button
                            aria-label={t('codeRunner.historyTitle', 'View history')}
                            className="action-btn"
                            onClick={handleToggleHistory}
                        >
                            <FaHistory /> {t('codeRunner.history', 'History')}
                        </button>

                        <button
                            aria-label={t('common.save', 'Save')}
                            className="action-btn"
                            onClick={handleShowSaveModal}
                        >
                            <FaSave /> Save
                        </button>

                        <button
                            aria-label={t('common.clear', 'Clear')}
                            className="action-btn clear"
                            onClick={handleClearAll}
                        >
                            <FaTrash /> Clear
                        </button>
                    </div>
                </div>

                <div className="editor-container">
                    <div className="code-section">
                        <div className="section-header">
                            <span>
                                <FaCode /> Kod
                            </span>

                            <span className="line-count">{code.split('\n').length} satır</span>
                        </div>

                        <textarea
                            className="code-editor"
                            value={code}
                            onChange={handleCodeChange}
                            placeholder={t('ui.type_your_code_here')}
                            spellCheck="false"
                            aria-label={t('ui.type_your_code_here_2')}
                        />
                    </div>

                    <div className="output-section">
                        <div className="section-header">
                            <span>
                                <FaTerminal /> {t('codeRunner.output', 'Output')}
                            </span>

                            <div className="output-actions">
                                {execTime && (
                                    <span className="exec-time">
                                        <FaClock /> {execTime}ms
                                    </span>
                                )}

                                <button
                                    aria-label={t('common.copyOutput', 'Copy output')}
                                    onClick={handleCopyOutput}
                                    title={t('common.copy', 'Copy')}
                                >
                                    <FaCopy />
                                </button>
                            </div>
                        </div>

                        <pre
                            className={`output-display ${output.includes('Error') ? 'error' : ''}`}
                        >
                            {output || t('ui.exitti_burada_gorunecek')}
                        </pre>
                    </div>
                </div>

                <div className="run-bar">
                    {!isRunning ? (
                        <button
                            aria-label={t('codeRunner.run', 'Run')}
                            className="run-btn"
                            onClick={handleRunCode}
                        >
                            <FaPlay /> {t('codeRunner.run', 'Run')}
                        </button>
                    ) : (
                        <button
                            aria-label={t('codeRunner.stop', 'Stop execution')}
                            className="stop-btn"
                            onClick={handleStopExecution}
                        >
                            <FaStop /> Stop
                        </button>
                    )}

                    {channelId && (
                        <button
                            aria-label={t('codeRunner.shareToChannel', 'Share to channel')}
                            className="share-btn"
                            onClick={handleShareToChannel}
                        >
                            <FaCode /> Channela Share
                        </button>
                    )}
                </div>

                {showHistory && (
                    <div className="history-sidebar">
                        <div className="sidebar-header">
                            <h3>
                                <FaHistory /> {t('codeRunner.historySnippets', 'History & Snippets')}
                            </h3>

                            <button aria-label={t('common.close', 'Close')} onClick={handleHideHistory}>
                                <FaTimes />
                            </button>
                        </div>

                        <div className="sidebar-section">
                            <h4>
                                <FaFolder /> Kaydedilen Snippets
                            </h4>

                            {savedSnippets.length === 0 ? (
                                <p className="empty-msg">{t('codeRunner.noSnippets', 'No code snippets yet')}</p>
                            ) : (
                                <div className="snippets-list">
                                    {savedSnippets.map((snippet) => (
                                        <div key={snippet.id} className="snippet-item">
                                            <div
                                                className="snippet-info"
                                                role="button"
                                                tabIndex={0}
                                                onClick={() => handleLoadSnippet(snippet)}
                                                onKeyDown={(e) =>
                                                    (e.key === 'Enter' || e.key === ' ') &&
                                                    e.currentTarget.click()
                                                }
                                            >
                                                <span className="snippet-name">{snippet.name}</span>

                                                <span className="snippet-lang">
                                                    {snippet.language}
                                                </span>
                                            </div>

                                            <button
                                                aria-label={t('common.delete')}
                                                className="delete-snippet"
                                                onClick={() => handleDeleteSnippet(snippet.id)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="sidebar-section">
                            <h4>
                                <FaClock /> {t('codeRunner.recentRuns', 'Recent Runs')}
                            </h4>

                            {history.length === 0 ? (
                                <p className="empty-msg">{t('codeRunner.noHistory', 'No history')}</p>
                            ) : (
                                <div className="history-list">
                                    {history.slice(0, 10).map((item, index) => (
                                        <div
                                            key={`item-${index}`}
                                            className="history-item"
                                            role="button"
                                            tabIndex={0}
                                            onClick={() => handleLoadSnippet(item)}
                                            onKeyDown={(e) =>
                                                (e.key === 'Enter' || e.key === ' ') &&
                                                e.currentTarget.click()
                                            }
                                        >
                                            <div className="history-info">
                                                <span className="history-lang">
                                                    {item.language}
                                                </span>

                                                <span
                                                    className={`history-status ${item.success ? 'success' : 'error'}`}
                                                >
                                                    {item.success ? (
                                                        <FaCheckCircle />
                                                    ) : (
                                                        <FaExclamationTriangle />
                                                    )}
                                                </span>
                                            </div>

                                            <code className="history-preview">
                                                {item.code?.substring(0, 50)}...
                                            </code>

                                            <span className="history-time">{item.exec_time}ms</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {showSaveModal && (
                    <SaveSnippetModal
                        onClose={handleHideSaveModal}
                        onSave={handleSaveSnippet}
                        language={language}
                    />
                )}
            </div>
        </div>
    );
};

const SaveSnippetModal = ({ onClose, onSave, language }) => {
    const { t } = useTranslation();

    const [name, setName] = useState('');

    const handleSubmit = () => {
        if (!name.trim()) {
            toast.warning(t('ui.snippet_adi_gerekli'));

            return;
        }

        onSave(name);
    };

    return (
        <div
            className="modal-overlay"
            role="button"
            tabIndex={0}
            onClick={(e) => e.target.className === 'modal-overlay' && onClose()}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="save-modal"
                role="dialog"
                aria-modal="true"
                aria-label={t('codeRunner.saveSnippet', 'Save code snippet')}
            >
                <h3>
                    <FaSave /> Snippet Kaydet
                </h3>

                <div className="form-group">
                    <label>{t('codeRunner.snippetName', 'Snippet Name')}</label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('ui.orn_fibonacci_hesaplama')}
                        aria-label={t('codeRunner.snippetName', 'Snippet Name')}
                    />
                </div>

                <div className="form-group">
                    <label>Dil</label>

                    <input type="text" value={language} disabled aria-label={t('codeRunner.language', 'Programming language')} />
                </div>

                <div className="modal-actions">
                    <button aria-label={t('common.close', 'Close')} className="cancel-btn" onClick={onClose}>
                        {t('common.cancel')}
                    </button>

                    <button
                        aria-label={t('common.save', 'Save')}
                        className="save-submit-btn"
                        onClick={handleSubmit}
                    >
                        <FaSave /> Save
                    </button>
                </div>
            </div>
        </div>
    );
};

CodeRunnerPanel.propTypes = {
    serverId: PropTypes.string,

    channelId: PropTypes.string,

    onClose: PropTypes.func,
};

SaveSnippetModal.propTypes = {
    onClose: PropTypes.func,

    onSave: PropTypes.func,

    language: PropTypes.string,
};

export default memo(CodeRunnerPanel);
