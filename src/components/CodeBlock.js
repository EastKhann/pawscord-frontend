// frontend/src/components/CodeBlock.js
// ⚡ OPTIMIZED: PrismLight kullanarak sadece gerekli dilleri yükler (~100KB vs 1.79MB)

import React, { useState, Suspense, lazy, memo } from 'react';
import { FaCopy, FaCheck, FaChevronDown, FaChevronUp, FaPlay, FaSpinner } from 'react-icons/fa';
import { API_BASE_URL } from '../utils/constants';

// ⚡ PrismLight - Sadece gerekli dilleri import eder (1.79MB → ~100KB)
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// 🔥 Sadece en çok kullanılan dilleri import et
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';
import csharp from 'react-syntax-highlighter/dist/esm/languages/prism/csharp';
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp';
import c from 'react-syntax-highlighter/dist/esm/languages/prism/c';
import go from 'react-syntax-highlighter/dist/esm/languages/prism/go';
import rust from 'react-syntax-highlighter/dist/esm/languages/prism/rust';
import php from 'react-syntax-highlighter/dist/esm/languages/prism/php';
import ruby from 'react-syntax-highlighter/dist/esm/languages/prism/ruby';
import swift from 'react-syntax-highlighter/dist/esm/languages/prism/swift';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup'; // HTML

// Dilleri kaydet
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('js', javascript);
SyntaxHighlighter.registerLanguage('jsx', javascript);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('ts', typescript);
SyntaxHighlighter.registerLanguage('tsx', typescript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('py', python);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('csharp', csharp);
SyntaxHighlighter.registerLanguage('cs', csharp);
SyntaxHighlighter.registerLanguage('cpp', cpp);
SyntaxHighlighter.registerLanguage('c', c);
SyntaxHighlighter.registerLanguage('go', go);
SyntaxHighlighter.registerLanguage('rust', rust);
SyntaxHighlighter.registerLanguage('rs', rust);
SyntaxHighlighter.registerLanguage('php', php);
SyntaxHighlighter.registerLanguage('ruby', ruby);
SyntaxHighlighter.registerLanguage('rb', ruby);
SyntaxHighlighter.registerLanguage('swift', swift);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('shell', bash);
SyntaxHighlighter.registerLanguage('sh', bash);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('yaml', yaml);
SyntaxHighlighter.registerLanguage('yml', yaml);
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('html', markup);
SyntaxHighlighter.registerLanguage('xml', markup);
SyntaxHighlighter.registerLanguage('markup', markup);

const CodeBlock = ({ language, value, children }) => {
    const [copied, setCopied] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    // --- YENİ STATE'LER ---
    const [isRunning, setIsRunning] = useState(false);
    const [output, setOutput] = useState(null);

    const rawContent = value || children || '';
    const content = String(rawContent).replace(/\n$/, '');
    const lineCount = content.split('\n').length;
    const shouldCollapse = lineCount > 15;

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // --- KODU ÇALIŞTIR ---
    const handleRun = async () => {
        setIsRunning(true);
        setOutput(null);

        // App.js'den token'ı almamız lazım veya localStorage'dan
        const token = localStorage.getItem('access_token');

        try {
            const res = await fetch(`${API_BASE_URL}/tools/run-code/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ language: language, code: content })
            });
            const data = await res.json();

            if (data.run) {
                setOutput(data.run.output || "Çıktı boş.");
            } else {
                setOutput("Hata: " + (data.message || "Bilinmeyen hata"));
            }
        } catch (e) {
            setOutput("Bağlantı hatası.");
        }
        setIsRunning(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <span style={styles.language}>{language || 'text'}</span>
                <div style={{ display: 'flex', gap: '10px' }}>
                    {/* ÇALIŞTIR BUTONU */}
                    <button onClick={handleRun} style={styles.runButton} disabled={isRunning}>
                        {isRunning ? <FaSpinner className="spin" /> : <FaPlay size={10} />}
                        {isRunning ? ' Çalışıyor...' : ' Run'}
                    </button>
                    <button onClick={handleCopy} style={styles.copyButton}>
                        {copied ? <FaCheck /> : <FaCopy />}
                    </button>
                </div>
            </div>

            <div style={{
                ...styles.codeWrapper,
                maxHeight: (!isExpanded && shouldCollapse) ? '300px' : 'none',
            }}>
                <SyntaxHighlighterWithStyle
                    language={language ? language.toLowerCase() : 'text'}
                    content={content}
                />
            </div>

            {/* ÇIKTI EKRANI (Varsa göster) */}
            {output && (
                <div style={styles.outputContainer}>
                    <div style={styles.outputHeader}>ÇIKTI (TERMINAL):</div>
                    <pre style={styles.outputBody}>{output}</pre>
                </div>
            )}

            {shouldCollapse && (
                <button onClick={() => setIsExpanded(!isExpanded)} style={styles.expandButton}>
                    {isExpanded ? <><FaChevronUp /> Daralt</> : <><FaChevronDown /> Genişlet</>}
                </button>
            )}
        </div>
    );
};

const styles = {
    container: { marginTop: '8px', marginBottom: '8px', borderRadius: '8px', border: '1px solid #202225', overflow: 'hidden', backgroundColor: '#1e1f22' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 10px', backgroundColor: '#202225', color: '#b9bbbe', fontSize: '0.8em', fontWeight: 'bold', fontFamily: 'monospace' },
    language: { textTransform: 'uppercase' },
    copyButton: { background: 'none', border: 'none', color: '#b9bbbe', cursor: 'pointer' },

    // Yeni Run Butonu Stili
    runButton: {
        backgroundColor: '#23a559', color: 'white', border: 'none', borderRadius: '4px',
        padding: '2px 10px', fontSize: '0.9em', fontWeight: 'bold', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: '5px'
    },

    codeWrapper: { overflow: 'hidden', transition: 'max-height 0.3s' },
    expandButton: { width: '100%', padding: '8px', backgroundColor: '#2f3136', border: 'none', borderTop: '1px solid #202225', color: '#dbdee1', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },

    // Output Stilleri
    outputContainer: { borderTop: '1px solid #40444b', backgroundColor: '#000' },
    outputHeader: { padding: '5px 10px', fontSize: '0.75em', color: '#99aab5', backgroundColor: '#111' },
    outputBody: { padding: '10px', color: '#0f0', fontFamily: 'monospace', margin: 0, whiteSpace: 'pre-wrap', fontSize: '0.9em' }
};

// ⚡ OPTIMIZED: Doğrudan PrismLight kullanır - lazy loading gereksiz
const SyntaxHighlighterWithStyle = memo(({ language, content }) => {
    return (
        <SyntaxHighlighter
            language={language || 'text'}
            style={vscDarkPlus}
            customStyle={{ margin: 0, padding: '15px', fontSize: '0.9em' }}
            wrapLongLines={true}
        >
            {content}
        </SyntaxHighlighter>
    );
});

SyntaxHighlighterWithStyle.displayName = 'SyntaxHighlighterWithStyle';

export default memo(CodeBlock);

