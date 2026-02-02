// frontend/src/components/CollaborativeCodeEditor.js

/**
 * 💻 Collaborative Code Editor
 * Monaco Editor + WebSocket real-time collaboration
 */

import React, { useState, useEffect, useRef } from 'react';
import FaCode from 'react-icons/fa/FaCode';
import FaPlay from 'react-icons/fa/FaPlay';
import toast from '../utils/toast';
import FaSave from 'react-icons/fa/FaSave';
import FaUsers from 'react-icons/fa/FaUsers';
import FaCopy from 'react-icons/fa/FaCopy';
import FaDownload from 'react-icons/fa/FaDownload';

const CollaborativeCodeEditor = ({
    roomId,
    userId,
    username,
    apiBaseUrl,
    fetchWithAuth,
    websocket,
    onClose
}) => {
    const [code, setCode] = useState('// Start coding...\n');
    const [language, setLanguage] = useState('javascript');
    const [output, setOutput] = useState('');
    const [collaborators, setCollaborators] = useState([]);
    const [saving, setSaving] = useState(false);
    const [running, setRunning] = useState(false);

    const editorRef = useRef(null);
    const monacoRef = useRef(null);
    const cursorDecorations = useRef(new Map());

    useEffect(() => {
        loadMonacoEditor();
        setupWebSocketListeners();
        loadSavedCode();

        return () => {
            cleanup();
        };
    }, []);

    const loadMonacoEditor = async () => {
        try {
            // Dynamically import Monaco
            const monaco = await import('monaco-editor');
            monacoRef.current = monaco;

            // Create editor
            const editor = monaco.editor.create(editorRef.current, {
                value: code,
                language: language,
                theme: 'vs-dark',
                automaticLayout: true,
                fontSize: 14,
                minimap: { enabled: true },
                scrollBeyondLastLine: false,
                renderWhitespace: 'selection',
                cursorBlinking: 'smooth',
                smoothScrolling: true
            });

            // Listen to content changes
            editor.onDidChangeModelContent((e) => {
                const newCode = editor.getValue();
                setCode(newCode);
                broadcastCodeChange(newCode, e.changes);
            });

            // Listen to cursor position changes
            editor.onDidChangeCursorPosition((e) => {
                broadcastCursorPosition(e.position);
            });

            // Store editor reference
            window.monacoEditor = editor;

            console.log('✅ [CodeEditor] Monaco loaded');
        } catch (error) {
            console.error('❌ [CodeEditor] Failed to load Monaco:', error);
        }
    };

    const setupWebSocketListeners = () => {
        if (!websocket) return;

        websocket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);

            switch (data.type) {
                case 'code_update':
                    handleRemoteCodeUpdate(data);
                    break;
                case 'cursor_update':
                    handleRemoteCursorUpdate(data);
                    break;
                case 'collaborator_joined':
                    handleCollaboratorJoined(data);
                    break;
                case 'collaborator_left':
                    handleCollaboratorLeft(data);
                    break;
            }
        });
    };

    const broadcastCodeChange = (newCode, changes) => {
        if (!websocket || websocket.readyState !== WebSocket.OPEN) return;

        websocket.send(JSON.stringify({
            type: 'code_update',
            room_id: roomId,
            user_id: userId,
            username: username,
            code: newCode,
            changes: changes.map(c => ({
                range: c.range,
                text: c.text
            }))
        }));
    };

    const broadcastCursorPosition = (position) => {
        if (!websocket || websocket.readyState !== WebSocket.OPEN) return;

        websocket.send(JSON.stringify({
            type: 'cursor_update',
            room_id: roomId,
            user_id: userId,
            username: username,
            position: {
                lineNumber: position.lineNumber,
                column: position.column
            }
        }));
    };

    const handleRemoteCodeUpdate = (data) => {
        if (data.user_id === userId) return;

        const editor = window.monacoEditor;
        if (!editor) return;

        // Apply changes
        editor.setValue(data.code);
    };

    const handleRemoteCursorUpdate = (data) => {
        if (data.user_id === userId) return;

        const editor = window.monacoEditor;
        const monaco = monacoRef.current;
        if (!editor || !monaco) return;

        // Remove old cursor decoration
        const oldDecorations = cursorDecorations.current.get(data.user_id);
        if (oldDecorations) {
            editor.deltaDecorations(oldDecorations, []);
        }

        // Add new cursor decoration
        const newDecorations = editor.deltaDecorations([], [
            {
                range: new monaco.Range(
                    data.position.lineNumber,
                    data.position.column,
                    data.position.lineNumber,
                    data.position.column
                ),
                options: {
                    className: `remote-cursor remote-cursor-${data.user_id}`,
                    hoverMessage: { value: `**${data.username}**` }
                }
            }
        ]);

        cursorDecorations.current.set(data.user_id, newDecorations);
    };

    const handleCollaboratorJoined = (data) => {
        setCollaborators(prev => [...prev, {
            id: data.user_id,
            username: data.username,
            color: data.color || '#5865f2'
        }]);
    };

    const handleCollaboratorLeft = (data) => {
        setCollaborators(prev => prev.filter(c => c.id !== data.user_id));

        // Remove cursor decoration
        const decorations = cursorDecorations.current.get(data.user_id);
        if (decorations && window.monacoEditor) {
            window.monacoEditor.deltaDecorations(decorations, []);
        }
        cursorDecorations.current.delete(data.user_id);
    };

    const loadSavedCode = async () => {
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/code-editor/load/?room_id=${roomId}`
            );

            if (response.ok) {
                const data = await response.json();
                if (data.code) {
                    setCode(data.code);
                    setLanguage(data.language || 'javascript');

                    if (window.monacoEditor) {
                        window.monacoEditor.setValue(data.code);
                        window.monacoEditor.setLanguage(data.language || 'javascript');
                    }
                }
            }
        } catch (error) {
            console.error('Failed to load code:', error);
        }
    };

    const saveCode = async () => {
        setSaving(true);
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/code-editor/save/`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        room_id: roomId,
                        code: code,
                        language: language
                    })
                }
            );

            if (response.ok) {
                toast.success('✅ Kod kaydedildi!');
            }
        } catch (error) {
            console.error('Save error:', error);
            toast.error('❌ Kaydetme başarısız');
        } finally {
            setSaving(false);
        }
    };

    const runCode = async () => {
        setRunning(true);
        setOutput('Çalıştırılıyor...');

        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/code-editor/run/`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        code: code,
                        language: language
                    })
                }
            );

            if (response.ok) {
                const data = await response.json();
                setOutput(data.output || 'No output');
            } else {
                const error = await response.json();
                setOutput(`Error: ${error.error || 'Execution failed'}`);
            }
        } catch (error) {
            setOutput(`Error: ${error.message}`);
        } finally {
            setRunning(false);
        }
    };

    const copyCode = () => {
        navigator.clipboard.writeText(code);
        toast.success('✅ Kod kopyalandı!');
    };

    const downloadCode = () => {
        const extensions = {
            javascript: 'js',
            python: 'py',
            typescript: 'ts',
            html: 'html',
            css: 'css',
            java: 'java',
            cpp: 'cpp'
        };

        const ext = extensions[language] || 'txt';
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `code.${ext}`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const cleanup = () => {
        if (window.monacoEditor) {
            window.monacoEditor.dispose();
            delete window.monacoEditor;
        }
        // WebSocket cleanup
        if (websocket) {
            websocket.close();
        }
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <FaCode style={styles.headerIcon} />
                    <h2 style={styles.title}>Code Editor</h2>

                    <select
                        value={language}
                        onChange={(e) => {
                            setLanguage(e.target.value);
                            if (window.monacoEditor && monacoRef.current) {
                                monacoRef.current.editor.setModelLanguage(
                                    window.monacoEditor.getModel(),
                                    e.target.value
                                );
                            }
                        }}
                        style={styles.languageSelect}
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="typescript">TypeScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                    </select>
                </div>

                <div style={styles.headerRight}>
                    {/* Collaborators */}
                    <div style={styles.collaborators}>
                        <FaUsers style={{ marginRight: '6px' }} />
                        <span>{collaborators.length + 1}</span>
                    </div>

                    {/* Actions */}
                    <button onClick={copyCode} style={styles.actionButton} title="Kopyala">
                        <FaCopy />
                    </button>
                    <button onClick={downloadCode} style={styles.actionButton} title="İndir">
                        <FaDownload />
                    </button>
                    <button
                        onClick={saveCode}
                        disabled={saving}
                        style={{ ...styles.actionButton, ...styles.saveButton }}
                        title="Kaydet"
                    >
                        <FaSave />
                    </button>
                    <button
                        onClick={runCode}
                        disabled={running}
                        style={{ ...styles.actionButton, ...styles.runButton }}
                        title="Çalıştır"
                    >
                        <FaPlay />
                    </button>
                </div>
            </div>

            {/* Editor */}
            <div style={styles.editorContainer}>
                <div ref={editorRef} style={styles.editor} />
            </div>

            {/* Output Panel */}
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

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#1e1e1e'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        backgroundColor: '#2d2d30',
        borderBottom: '1px solid #3e3e42'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    headerIcon: {
        color: '#5865f2',
        fontSize: '20px'
    },
    title: {
        margin: 0,
        fontSize: '16px',
        fontWeight: '600',
        color: '#cccccc'
    },
    languageSelect: {
        backgroundColor: '#3c3c3c',
        border: '1px solid #3e3e42',
        borderRadius: '4px',
        color: '#cccccc',
        padding: '6px 12px',
        fontSize: '13px',
        cursor: 'pointer'
    },
    headerRight: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    collaborators: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#3c3c3c',
        padding: '6px 12px',
        borderRadius: '4px',
        fontSize: '13px',
        color: '#cccccc'
    },
    actionButton: {
        backgroundColor: '#3c3c3c',
        border: 'none',
        borderRadius: '4px',
        color: '#cccccc',
        padding: '8px 12px',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
    },
    saveButton: {
        backgroundColor: '#5865f2',
        color: '#fff'
    },
    runButton: {
        backgroundColor: '#3ba55d',
        color: '#fff'
    },
    editorContainer: {
        flex: 1,
        position: 'relative',
        overflow: 'hidden'
    },
    editor: {
        width: '100%',
        height: '100%'
    },
    outputPanel: {
        height: '200px',
        backgroundColor: '#1e1e1e',
        borderTop: '1px solid #3e3e42',
        display: 'flex',
        flexDirection: 'column'
    },
    outputHeader: {
        padding: '8px 16px',
        backgroundColor: '#2d2d30',
        borderBottom: '1px solid #3e3e42',
        fontSize: '13px',
        fontWeight: '600',
        color: '#cccccc'
    },
    outputContent: {
        flex: 1,
        margin: 0,
        padding: '12px 16px',
        color: '#d4d4d4',
        fontSize: '13px',
        fontFamily: 'Consolas, Monaco, "Courier New", monospace',
        overflowY: 'auto',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word'
    }
};

export default CollaborativeCodeEditor;


