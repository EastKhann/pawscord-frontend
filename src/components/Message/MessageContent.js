// frontend/src/components/Message/MessageContent.js
// 📝 MESSAGE CONTENT - Text, Markdown, Code blocks

import React, { memo, lazy, Suspense } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaLock } from 'react-icons/fa';

// Lazy load heavy components
const CodeBlock = lazy(() => import('../CodeBlock'));
const Spoiler = lazy(() => import('../Spoiler'));

export const MessageContent = memo(({
    displayContent,
    isMessageEncrypted,
    snippetData
}) => {
    // Kod snippet'i varsa
    if (snippetData && snippetData.type !== 'game_xox') {
        return (
            <div style={styles.snippetContainer}>
                <div style={styles.snippetHeader}>
                    <span>💻 {snippetData.title || 'Kod Parçası'}</span>
                    <span style={styles.langBadge}>{snippetData.language}</span>
                </div>
                <Suspense fallback={<div style={styles.loadingCode}>Kod yükleniyor...</div>}>
                    <CodeBlock language={snippetData.language}>{snippetData.code}</CodeBlock>
                </Suspense>
            </div>
        );
    }

    // Normal metin içeriği
    if (!displayContent) return null;

    return (
        <div style={styles.messageContent}>
            {isMessageEncrypted && (
                <span style={{ color: '#43b581', marginRight: 5 }} title="Uçtan Uca Şifreli">
                    <FaLock />
                </span>
            )}
            <Suspense fallback={<div>{displayContent}</div>}>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            return !inline
                                ? <CodeBlock language={className?.replace('language-', '')} value={children} />
                                : <code className={className} style={styles.inlineCode} {...props}>{children}</code>;
                        },
                        p: ({ children }) => {
                            // Spoiler Kontrolü (||gizli||)
                            const kids = React.Children.toArray(children);
                            return (
                                <p style={{ margin: 0 }}>
                                    {kids.map((child, i) => {
                                        if (typeof child === 'string') {
                                            const parts = child.split(/(\|\|.*?\|\|)/g);
                                            return parts.map((part, j) =>
                                                (part.startsWith('||') && part.endsWith('||'))
                                                    ? <Spoiler key={`${i}-${j}`}>{part.slice(2, -2)}</Spoiler>
                                                    : part
                                            );
                                        }
                                        return child;
                                    })}
                                </p>
                            );
                        }
                    }}
                >
                    {displayContent}
                </ReactMarkdown>
            </Suspense>
        </div>
    );
});

const styles = {
    messageContent: {
        color: '#dbdee1',
        fontSize: '1rem',
        lineHeight: '1.4rem',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        fontWeight: '400'
    },
    inlineCode: {
        backgroundColor: '#2b2d31',
        padding: '2px 4px',
        borderRadius: '3px',
        fontFamily: "'Consolas', monospace",
        fontSize: '0.85em',
        border: '1px solid rgba(255,255,255,0.05)'
    },
    snippetContainer: {
        marginTop: '8px',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)'
    },
    snippetHeader: {
        padding: '8px 12px',
        backgroundColor: '#2b2d31',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
    },
    langBadge: {
        textTransform: 'uppercase',
        fontSize: '0.7em',
        fontWeight: 'bold',
        padding: '2px 4px',
        borderRadius: '4px',
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginLeft: '8px'
    },
    loadingCode: {
        padding: '12px',
        color: '#72767d',
        fontSize: '0.9em'
    }
};

MessageContent.displayName = 'MessageContent';
export default MessageContent;
