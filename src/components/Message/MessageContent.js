// frontend/src/components/Message/MessageContent.js
// 📝 MESSAGE CONTENT - Text, Markdown, Code blocks

import React, { memo, lazy, Suspense, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaLock } from 'react-icons/fa';

const S = {
    txt: { color: '#23a559', marginRight: 5 },
};


// Lazy load heavy components
const CodeBlock = lazy(() => import('../chat/CodeBlock'));
const Spoiler = lazy(() => import('./'));

export const MessageContent = memo(({
    displayContent,
    isMessageEncrypted,
    snippetData
}) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // Kod snippet'i varsa
    if (snippetData && snippetData.type !== 'game_xox') {
        return (
            <div aria-label={t('message.content', 'Message content')} style={styles.snippetContainer}>
                <div style={styles.snippetHeader}>
                    <span>💻 {snippetData.title || 'Code Snippet'}</span>
                    <span style={styles.langBadge}>{snippetData.language}</span>
                </div>
                <Suspense fallback={<div style={styles.loadingCode}>{t('loading_code')}</div>}>
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
                <span style={S.txt}>title={t('end-to-end_encrypted')}>
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
                                <p className="m-0">
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
        backgroundColor: '#111214',
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
        backgroundColor: '#111214',
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
        color: '#949ba4',
        fontSize: '0.9em'
    }
};

MessageContent.displayName = 'MessageContent';
MessageContent.propTypes = {
    displayContent: PropTypes.object,
    isMessageEncrypted: PropTypes.bool,
    snippetData: PropTypes.array,
};
export default MessageContent;