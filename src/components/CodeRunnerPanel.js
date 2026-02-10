import React, { useState, useEffect } from 'react';
import {
    FaCode, FaTimes, FaPlay, FaStop, FaCopy, FaTrash, FaDownload,
    FaHistory, FaSave, FaFolder, FaPlus, FaTerminal, FaClock,
    FaCheckCircle, FaExclamationTriangle, FaExpand, FaCompress,
    FaPython, FaJs, FaJava
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import './CodeRunnerPanel.css';

const CodeRunnerPanel = ({ serverId, channelId, onClose }) => {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('python');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [execTime, setExecTime] = useState(null);
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [savedSnippets, setSavedSnippets] = useState([]);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const token = localStorage.getItem('access_token');

    const languages = [
        { id: 'python', name: 'Python', icon: <FaPython />, template: '# Python Code\nprint("Hello, World!")' },
        { id: 'cpp', name: 'C++', icon: <FaCode />, template: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}' },
        { id: 'c', name: 'C', icon: <FaCode />, template: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}' },
        { id: 'ruby', name: 'Ruby', icon: <FaCode />, template: '# Ruby Code\nputs "Hello, World!"' },
        { id: 'go', name: 'Go', icon: <FaCode />, template: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}' },
        { id: 'rust', name: 'Rust', icon: <FaCode />, template: 'fn main() {\n    println!("Hello, World!");\n}' }
    ];

    useEffect(() => {
        fetchHistory();
        fetchSavedSnippets();
    }, []);

    useEffect(() => {
        const lang = languages.find(l => l.id === language);
        if (lang && !code) {
            setCode(lang.template);
        }
    }, [language]);

    const fetchHistory = async () => {
        try {
            const response = await fetch('/api/code-runner/history/', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setHistory(data.history || []);
            }
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };

    const fetchSavedSnippets = async () => {
        try {
            const response = await fetch('/api/code-runner/snippets/', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setSavedSnippets(data.snippets || []);
            }
        } catch (error) {
            console.error('Error fetching snippets:', error);
        }
    };

    const handleRunCode = async () => {
        if (!code.trim()) {
            toast.warning('Kod boş olamaz');
            return;
        }

        setIsRunning(true);
        setOutput('Çalıştırılıyor...');
        const startTime = Date.now();

        try {
            const response = await fetch('/api/code-runner/execute/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    code,
                    language,
                    channel_id: channelId
                })
            });

            const data = await response.json();
            const endTime = Date.now();
            setExecTime(endTime - startTime);

            if (response.ok) {
                setOutput(data.output || 'Çıktı yok');
                if (data.error) {
                    setOutput(`Hata:\n${data.error}`);
                }
            } else {
                setOutput(`Hata: ${data.message || 'Kod çalıştırılamadı'}`);
            }

            fetchHistory();
        } catch (error) {
            setOutput('Bağlantı hatası');
        }

        setIsRunning(false);
    };

    const handleStopExecution = async () => {
        try {
            await fetch('/api/code-runner/stop/', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setIsRunning(false);
            setOutput('Çalıştırma durduruldu');
        } catch (error) {
            toast.error('Durdurma başarısız');
        }
    };

    const handleSaveSnippet = async (name) => {
        try {
            const response = await fetch('/api/code-runner/snippets/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, code, language })
            });

            if (response.ok) {
                toast.success('Snippet kaydedildi');
                fetchSavedSnippets();
                setShowSaveModal(false);
            }
        } catch (error) {
            toast.error('Kaydetme başarısız');
        }
    };

    const handleLoadSnippet = (snippet) => {
        setCode(snippet.code);
        setLanguage(snippet.language);
        setShowHistory(false);
    };

    const handleDeleteSnippet = async (snippetId) => {
        try {
            await fetch(`/api/code-runner/snippets/${snippetId}/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            toast.success('Snippet silindi');
            fetchSavedSnippets();
        } catch (error) {
            toast.error('Silme başarısız');
        }
    };

    const handleCopyOutput = () => {
        navigator.clipboard.writeText(output);
        toast.success('Çıktı kopyalandı');
    };

    const handleClearAll = () => {
        setCode('');
        setOutput('');
        setExecTime(null);
    };

    const handleShareToChannel = async () => {
        if (!channelId) {
            toast.warning('Paylaşım için kanal gerekli');
            return;
        }

        try {
            const response = await fetch(`/api/channels/${channelId}/messages/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: `\`\`\`${language}\n${code}\n\`\`\`\n**Çıktı:**\n\`\`\`\n${output}\n\`\`\``
                })
            });

            if (response.ok) {
                toast.success('Kanala paylaşıldı');
            }
        } catch (error) {
            toast.error('Paylaşım başarısız');
        }
    };

    return (
        <div className={`code-runner-overlay ${isFullscreen ? 'fullscreen' : ''}`} onClick={(e) => e.target.className.includes('code-runner-overlay') && onClose()}>
            <div className="code-runner-panel">
                <div className="panel-header">
                    <h2><FaCode /> Kod Çalıştırıcı</h2>
                    <div className="header-actions">
                        <button className="fullscreen-btn" onClick={() => setIsFullscreen(!isFullscreen)}>
                            {isFullscreen ? <FaCompress /> : <FaExpand />}
                        </button>
                        <button className="close-btn" onClick={onClose}><FaTimes /></button>
                    </div>
                </div>

                <div className="toolbar">
                    <div className="language-selector">
                        {languages.map(lang => (
                            <button
                                key={lang.id}
                                className={`lang-btn ${language === lang.id ? 'active' : ''}`}
                                onClick={() => setLanguage(lang.id)}
                                title={lang.name}
                            >
                                {lang.icon}
                                <span>{lang.name}</span>
                            </button>
                        ))}
                    </div>
                    <div className="toolbar-actions">
                        <button className="action-btn" onClick={() => setShowHistory(!showHistory)}>
                            <FaHistory /> Geçmiş
                        </button>
                        <button className="action-btn" onClick={() => setShowSaveModal(true)}>
                            <FaSave /> Kaydet
                        </button>
                        <button className="action-btn clear" onClick={handleClearAll}>
                            <FaTrash /> Temizle
                        </button>
                    </div>
                </div>

                <div className="editor-container">
                    <div className="code-section">
                        <div className="section-header">
                            <span><FaCode /> Kod</span>
                            <span className="line-count">{code.split('\n').length} satır</span>
                        </div>
                        <textarea
                            className="code-editor"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Kodunuzu buraya yazın..."
                            spellCheck="false"
                        />
                    </div>

                    <div className="output-section">
                        <div className="section-header">
                            <span><FaTerminal /> Çıktı</span>
                            <div className="output-actions">
                                {execTime && (
                                    <span className="exec-time">
                                        <FaClock /> {execTime}ms
                                    </span>
                                )}
                                <button onClick={handleCopyOutput} title="Kopyala"><FaCopy /></button>
                            </div>
                        </div>
                        <pre className={`output-display ${output.includes('Hata') ? 'error' : ''}`}>
                            {output || 'Çıktı burada görünecek...'}
                        </pre>
                    </div>
                </div>

                <div className="run-bar">
                    {!isRunning ? (
                        <button className="run-btn" onClick={handleRunCode}>
                            <FaPlay /> Çalıştır
                        </button>
                    ) : (
                        <button className="stop-btn" onClick={handleStopExecution}>
                            <FaStop /> Durdur
                        </button>
                    )}
                    {channelId && (
                        <button className="share-btn" onClick={handleShareToChannel}>
                            <FaCode /> Kanala Paylaş
                        </button>
                    )}
                </div>

                {showHistory && (
                    <div className="history-sidebar">
                        <div className="sidebar-header">
                            <h3><FaHistory /> Geçmiş & Snippets</h3>
                            <button onClick={() => setShowHistory(false)}><FaTimes /></button>
                        </div>

                        <div className="sidebar-section">
                            <h4><FaFolder /> Kaydedilen Snippets</h4>
                            {savedSnippets.length === 0 ? (
                                <p className="empty-msg">Henüz snippet yok</p>
                            ) : (
                                <div className="snippets-list">
                                    {savedSnippets.map(snippet => (
                                        <div key={snippet.id} className="snippet-item">
                                            <div className="snippet-info" onClick={() => handleLoadSnippet(snippet)}>
                                                <span className="snippet-name">{snippet.name}</span>
                                                <span className="snippet-lang">{snippet.language}</span>
                                            </div>
                                            <button className="delete-snippet" onClick={() => handleDeleteSnippet(snippet.id)}>
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="sidebar-section">
                            <h4><FaClock /> Son Çalıştırmalar</h4>
                            {history.length === 0 ? (
                                <p className="empty-msg">Geçmiş yok</p>
                            ) : (
                                <div className="history-list">
                                    {history.slice(0, 10).map((item, index) => (
                                        <div key={index} className="history-item" onClick={() => handleLoadSnippet(item)}>
                                            <div className="history-info">
                                                <span className="history-lang">{item.language}</span>
                                                <span className={`history-status ${item.success ? 'success' : 'error'}`}>
                                                    {item.success ? <FaCheckCircle /> : <FaExclamationTriangle />}
                                                </span>
                                            </div>
                                            <code className="history-preview">{item.code?.substring(0, 50)}...</code>
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
                        onClose={() => setShowSaveModal(false)}
                        onSave={handleSaveSnippet}
                        language={language}
                    />
                )}
            </div>
        </div>
    );
};

const SaveSnippetModal = ({ onClose, onSave, language }) => {
    const [name, setName] = useState('');

    const handleSubmit = () => {
        if (!name.trim()) {
            toast.warning('Snippet adı gerekli');
            return;
        }
        onSave(name);
    };

    return (
        <div className="modal-overlay" onClick={(e) => e.target.className === 'modal-overlay' && onClose()}>
            <div className="save-modal">
                <h3><FaSave /> Snippet Kaydet</h3>

                <div className="form-group">
                    <label>Snippet Adı</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="örn: Fibonacci Hesaplama"
                    />
                </div>

                <div className="form-group">
                    <label>Dil</label>
                    <input type="text" value={language} disabled />
                </div>

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>İptal</button>
                    <button className="save-submit-btn" onClick={handleSubmit}>
                        <FaSave /> Kaydet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CodeRunnerPanel;
