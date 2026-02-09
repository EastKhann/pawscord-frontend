// frontend/src/components/FileCodePreview.js
// 🔥 Discord-style file preview for code/text files
// Shows first 7 lines of content with syntax highlighting

import React, { useState, useEffect, memo, useCallback } from 'react';
import { FaDownload, FaCopy, FaCheck, FaExpand, FaFileCode, FaFileAlt } from 'react-icons/fa';

// Extension → language mapping for syntax highlighting label
const EXT_LANG_MAP = {
    js: 'JavaScript', jsx: 'JavaScript', ts: 'TypeScript', tsx: 'TypeScript',
    py: 'Python', rb: 'Ruby', go: 'Go', rs: 'Rust', java: 'Java',
    c: 'C', cpp: 'C++', cs: 'C#', swift: 'Swift', kt: 'Kotlin',
    php: 'PHP', sh: 'Shell', bash: 'Shell', bat: 'Batch', cmd: 'Batch',
    ps1: 'PowerShell', psm1: 'PowerShell',
    html: 'HTML', htm: 'HTML', css: 'CSS', scss: 'SCSS', less: 'LESS',
    json: 'JSON', xml: 'XML', yaml: 'YAML', yml: 'YAML', toml: 'TOML',
    md: 'Markdown', txt: 'Text', log: 'Log', ini: 'INI', cfg: 'Config',
    env: 'Environment', sql: 'SQL', graphql: 'GraphQL',
    dockerfile: 'Dockerfile', makefile: 'Makefile',
    r: 'R', dart: 'Dart', lua: 'Lua', perl: 'Perl', pl: 'Perl',
    vue: 'Vue', svelte: 'Svelte',
};

// Extensions that should get code preview
const CODE_EXTENSIONS = new Set(Object.keys(EXT_LANG_MAP));

// Extension → accent color
const EXT_COLORS = {
    js: '#f7df1e', jsx: '#61dafb', ts: '#3178c6', tsx: '#3178c6',
    py: '#3572A5', rb: '#CC342D', go: '#00ADD8', rs: '#dea584',
    java: '#b07219', c: '#555555', cpp: '#f34b7d', cs: '#178600',
    swift: '#F05138', kt: '#A97BFF', php: '#4F5D95',
    sh: '#89e051', bash: '#89e051', bat: '#C1F12E', cmd: '#C1F12E',
    ps1: '#012456', html: '#e34c26', htm: '#e34c26', css: '#563d7c',
    scss: '#c6538c', json: '#292929', xml: '#0060ac', yaml: '#cb171e',
    yml: '#cb171e', md: '#083fa1', txt: '#b5bac1', sql: '#e38c00',
    log: '#999', env: '#ecd53f',
};

const MAX_PREVIEW_LINES = 7;
const MAX_LINE_LENGTH = 120;

export const isCodeFile = (fileName) => {
    if (!fileName) return false;
    const ext = fileName.split('.').pop()?.toLowerCase() || '';
    return CODE_EXTENSIONS.has(ext);
};

const FileCodePreview = ({ fileUrl, fileName, fileSize, onDownload }) => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [copied, setCopied] = useState(false);

    const ext = (fileName || '').split('.').pop()?.toLowerCase() || '';
    const language = EXT_LANG_MAP[ext] || ext.toUpperCase();
    const accentColor = EXT_COLORS[ext] || '#5865f2';

    useEffect(() => {
        if (!fileUrl) return;
        const fetchContent = async () => {
            setLoading(true);
            try {
                const res = await fetch(fileUrl);
                if (!res.ok) throw new Error('Failed');
                const text = await res.text();
                // Only show if it looks like text (not binary)
                if (text && !text.includes('\0')) {
                    setContent(text);
                } else {
                    setError(true);
                }
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, [fileUrl]);

    const handleCopy = useCallback(() => {
        if (content) {
            navigator.clipboard.writeText(content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, [content]);

    const lines = content ? content.split('\n') : [];
    const totalLines = lines.length;
    const displayLines = expanded ? lines : lines.slice(0, MAX_PREVIEW_LINES);
    const hasMore = totalLines > MAX_PREVIEW_LINES;
    const sizeStr = fileSize ? formatFileSize(fileSize) : '';

    if (error || (!loading && !content)) {
        // Fallback to regular file card
        return null;
    }

    return (
        <div style={styles.container}>
            {/* Header Bar */}
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <FaFileCode style={{ color: accentColor, fontSize: 16, flexShrink: 0 }} />
                    <span style={styles.fileName}>{fileName || 'file'}</span>
                    <span style={{ ...styles.langBadge, color: accentColor, borderColor: `${accentColor}40` }}>
                        {language}
                    </span>
                    {sizeStr && <span style={styles.fileSize}>{sizeStr}</span>}
                </div>
                <div style={styles.headerActions}>
                    <button
                        onClick={handleCopy}
                        style={styles.headerBtn}
                        title={copied ? 'Kopyalandı!' : 'Kodu Kopyala'}
                    >
                        {copied ? <FaCheck style={{ color: '#57F287' }} /> : <FaCopy />}
                    </button>
                    {hasMore && (
                        <button
                            onClick={() => setExpanded(!expanded)}
                            style={styles.headerBtn}
                            title={expanded ? 'Daralt' : 'Tümünü Göster'}
                        >
                            <FaExpand />
                        </button>
                    )}
                    <a
                        href={fileUrl}
                        download={fileName}
                        style={styles.headerBtn}
                        title="İndir"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <FaDownload />
                    </a>
                </div>
            </div>

            {/* Code Content */}
            <div style={styles.codeArea}>
                {loading ? (
                    <div style={styles.loadingArea}>
                        <div style={styles.loadingLine} />
                        <div style={{ ...styles.loadingLine, width: '70%' }} />
                        <div style={{ ...styles.loadingLine, width: '85%' }} />
                        <div style={{ ...styles.loadingLine, width: '60%' }} />
                    </div>
                ) : (
                    <table style={styles.codeTable}>
                        <tbody>
                            {displayLines.map((line, i) => (
                                <tr key={i} style={styles.codeLine}>
                                    <td style={styles.lineNumber}>{i + 1}</td>
                                    <td style={styles.lineContent}>
                                        {line.length > MAX_LINE_LENGTH && !expanded
                                            ? line.substring(0, MAX_LINE_LENGTH) + '…'
                                            : line || ' '}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Footer - "X more lines" */}
            {hasMore && !expanded && (
                <div
                    style={styles.footer}
                    onClick={() => setExpanded(true)}
                >
                    <span style={styles.footerText}>
                        {totalLines - MAX_PREVIEW_LINES} satır daha...
                    </span>
                </div>
            )}
            {expanded && hasMore && (
                <div
                    style={styles.footer}
                    onClick={() => setExpanded(false)}
                >
                    <span style={styles.footerText}>Daralt</span>
                </div>
            )}
        </div>
    );
};

function formatFileSize(bytes) {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const styles = {
    container: {
        marginTop: 8,
        maxWidth: 490,
        borderRadius: 8,
        overflow: 'hidden',
        border: '1px solid #2a2d33',
        backgroundColor: '#2b2d31',
        transition: 'border-color 0.2s',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 12px',
        backgroundColor: '#2b2d31',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        gap: 8,
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flex: 1,
        minWidth: 0,
    },
    fileName: {
        color: '#00a8fc',
        fontSize: 14,
        fontWeight: 500,
        cursor: 'pointer',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    langBadge: {
        fontSize: 10,
        fontWeight: 600,
        padding: '2px 6px',
        borderRadius: 4,
        border: '1px solid',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        flexShrink: 0,
    },
    fileSize: {
        fontSize: 11,
        color: '#72767d',
        flexShrink: 0,
    },
    headerActions: {
        display: 'flex',
        alignItems: 'center',
        gap: 2,
    },
    headerBtn: {
        width: 30,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        background: 'transparent',
        color: '#b5bac1',
        cursor: 'pointer',
        borderRadius: 4,
        fontSize: 13,
        transition: 'all 0.15s',
        textDecoration: 'none',
    },
    codeArea: {
        backgroundColor: '#1e1f22',
        maxHeight: 400,
        overflowY: 'auto',
        overflowX: 'auto',
    },
    codeTable: {
        borderCollapse: 'collapse',
        width: '100%',
        fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
        fontSize: 13,
        lineHeight: '20px',
    },
    codeLine: {
        height: 20,
    },
    lineNumber: {
        color: '#5c6370',
        textAlign: 'right',
        paddingRight: 12,
        paddingLeft: 12,
        userSelect: 'none',
        width: 1,
        whiteSpace: 'nowrap',
        verticalAlign: 'top',
        borderRight: '1px solid rgba(255,255,255,0.06)',
    },
    lineContent: {
        color: '#dcddde',
        paddingLeft: 12,
        paddingRight: 12,
        whiteSpace: 'pre',
        tabSize: 4,
    },
    loadingArea: {
        padding: '12px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
    },
    loadingLine: {
        height: 12,
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderRadius: 4,
        animation: 'pulse 1.5s ease-in-out infinite',
    },
    footer: {
        padding: '8px 12px',
        backgroundColor: '#2b2d31',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'background-color 0.15s',
    },
    footerText: {
        fontSize: 12,
        color: '#00a8fc',
        fontWeight: 500,
    },
};

export default memo(FileCodePreview);
