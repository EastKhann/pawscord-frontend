// frontend/src/components/FileCodePreview.js
// 🔥 Discord-style file preview for code/text files
// Shows first 7 lines of content with syntax highlighting

import { useState, useEffect, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FaDownload, FaCopy, FaCheck, FaExpand, FaFileCode, FaFileAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// Extension → language mapping for syntax highlighting label
const EXT_LANG_MAP = {
    js: 'JavaScript',
    jsx: 'JavaScript',
    ts: 'TypeScript',
    tsx: 'TypeScript',
    py: 'Python',
    rb: 'Ruby',
    go: 'Go',
    rs: 'Rust',
    java: 'Java',
    c: 'C',
    cpp: 'C++',
    cs: 'C#',
    swift: 'Swift',
    kt: 'Kotlin',
    php: 'PHP',
    sh: 'Shell',
    bash: 'Shell',
    bat: 'Batch',
    cmd: 'Batch',
    ps1: 'PowerShell',
    psm1: 'PowerShell',
    html: 'HTML',
    htm: 'HTML',
    css: 'CSS',
    scss: 'SCSS',
    less: 'LESS',
    json: 'JSON',
    xml: 'XML',
    yaml: 'YAML',
    yml: 'YAML',
    toml: 'TOML',
    md: 'Markdown',
    txt: 'Text',
    log: 'Log',
    ini: 'INI',
    cfg: 'Config',
    env: 'Environment',
    sql: 'SQL',
    graphql: 'GraphQL',
    dockerfile: 'Dockerfile',
    makefile: 'Makefile',
    r: 'R',
    dart: 'Dart',
    lua: 'Lua',
    perl: 'Thul',
    pl: 'Thul',
    vue: 'Vue',
    svelte: 'Svelte',
};

// Extensions that should get code preview
const CODE_EXTENSIONS = new Set(Object.keys(EXT_LANG_MAP));

// Extension → accent color
const EXT_COLORS = {
    js: '#f7df1e',
    jsx: '#61dafb',
    ts: '#3178c6',
    tsx: '#3178c6',
    py: '#3572A5',
    rb: '#CC342D',
    go: '#00ADD8',
    rs: '#dea584',
    java: '#b07219',
    c: '#555555',
    cpp: '#f34b7d',
    cs: '#178600',
    swift: '#F05138',
    kt: '#A97BFF',
    php: '#4F5D95',
    sh: '#89e051',
    bash: '#89e051',
    bat: '#C1F12E',
    cmd: '#C1F12E',
    ps1: '#012456',
    html: '#e34c26',
    htm: '#e34c26',
    css: '#563d7c',
    scss: '#c6538c',
    json: '#292929',
    xml: '#0060ac',
    yaml: '#cb171e',
    yml: '#cb171e',
    md: '#083fa1',
    txt: '#b5bac1',
    sql: '#e38c00',
    log: '#999',
    env: '#ecd53f',
};

const MAX_PREVIEW_LINES = 7;
const MAX_LINE_LENGTH = 120;

export const isCodeFile = (fileName) => {
    if (!fileName) return false;
    const ext = fileName.split('.').pop()?.toLowerCase() || '';
    return CODE_EXTENSIONS.has(ext);
};

const FileCodePreview = ({ fileUrl, fileName, fileSize, onDownload }) => {
    const { t } = useTranslation();
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
    const loadingLineStyles = {
        primary: { ...styles.loadingLine, width: '70%' },
        secondary: { ...styles.loadingLine, width: '85%' },
        tertiary: { ...styles.loadingLine, width: '60%' },
    };

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
                    <span
                        style={{
                            ...styles.langBadge,
                            color: accentColor,
                            borderColor: `${accentColor}40`,
                        }}
                    >
                        {language}
                    </span>
                    {sizeStr && <span style={styles.fileSize}>{sizeStr}</span>}
                </div>
                <div style={styles.headerActions}>
                    <button
                        aria-label={t('filePreview.copy', 'Copy code')}
                        onClick={handleCopy}
                        style={styles.headerBtn}
                        title={copied ? 'Copied!' : 'Kodu Copy'}
                    >
                        {copied ? <FaCheck className="icon-success" /> : <FaCopy />}
                    </button>
                    {hasMore && (
                        <button
                            aria-label={expanded ? t('filePreview.collapse', 'Collapse') : t('filePreview.expand', 'Expand')}
                    style={styles.headerBtn}
                    title={expanded ? 'Daralt' : t('ui.allnu_goster')}
                        >
                    <FaExpand />
                </button>
                    )}
                <a
                    href={fileUrl}
                    download={fileName}
                    style={styles.headerBtn}
                    title={t('common.download', 'Download')}
                    onClick={(e) => e.stopPropagation()}
                >
                    <FaDownload />
                </a>
            </div>
        </div>

            {/* Code Content */ }
    <div style={styles.codeArea}>
        {loading ? (
            <div style={styles.loadingArea}>
                <div style={styles.loadingLine} />
                <div style={loadingLineStyles.primary} />
                <div style={loadingLineStyles.secondary} />
                <div style={loadingLineStyles.tertiary} />
            </div>
        ) : (
            <table style={styles.codeTable}>
                <tbody>
                    {displayLines.map((line, i) => (
                        <tr key={`item-${i}`} style={styles.codeLine}>
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

    {/* Footer - "X more lines" */ }
    {
        hasMore && !expanded && (
            <div
                style={styles.footer}
                role="button"
                tabIndex={0}
                onClick={() => setExpanded(true)}
                onKeyDown={(e) =>
                    (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                }
            >
                <span style={styles.footerText}>
                    {totalLines - MAX_PREVIEW_LINES} {t('filePreview.moreLines', 'more lines...')}
                </span>
            </div>
        )
    }
    {
        expanded && hasMore && (
            <div
                style={styles.footer}
                role="button"
                tabIndex={0}
                onClick={() => setExpanded(false)}
                onKeyDown={(e) =>
                    (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                }
            >
                <span style={styles.footerText}>Daralt</span>
            </div>
        )
    }
        </div >
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
        backgroundColor: '#111214',
        transition: 'border-color 0.2s',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 12px',
        backgroundColor: '#111214',
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
        color: '#949ba4',
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
        backgroundColor: '#0d0e10',
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
        color: '#dbdee1',
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
        backgroundColor: '#111214',
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

FileCodePreview.propTypes = {
    fileUrl: PropTypes.string,
    fileName: PropTypes.string,
    fileSize: PropTypes.number,
    onDownload: PropTypes.func,
};
export default memo(FileCodePreview);
