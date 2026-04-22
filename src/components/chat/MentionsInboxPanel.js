import { getToken } from '../../utils/tokenStorage';
// frontend/src/components/MentionsInboxPanel.js
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FaInbox, FaTimes, FaHashtag, FaReply, FaThumbtack, FaSync } from 'react-icons/fa';
import { API_BASE_URL } from '../../utils/constants';

import { useTranslation } from 'react-i18next';

const S = {
    txt: { color: '#5865F2', fontSize: 18 },
};

const MentionsInboxPanel = ({ isOpen, onClose, onNavigateToMessage, currentUsername }) => {
    const { t } = useTranslation();
    const [mentions, setMentions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(false);
    const [total, setTotal] = useState(0);
    const [filterRoom, setFilterRoom] = useState('');

    const fetchMentions = useCallback(
        async (pageNum = 1, append = false) => {
            setLoading(true);
            try {
                const token = getToken();
                let url = `${API_BASE_URL}/api/mentions/inbox/?page=${pageNum}&page_size=25`;
                if (filterRoom) url += `&room_id=${filterRoom}`;

                const res = await fetch(url, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.ok) {
                    const data = await res.json();
                    setMentions((prev) => (append ? [...prev, ...data.results] : data.results));
                    setHasNext(data.has_next);
                    setTotal(data.total);
                    setPage(pageNum);
                }
            } catch (err) {
                // silently fail
            } finally {
                setLoading(false);
            }
        },
        [filterRoom]
    );

    useEffect(() => {
        if (isOpen) fetchMentions(1);
    }, [isOpen, fetchMentions]);

    const handleLoadMore = () => {
        if (hasNext) fetchMentions(page + 1, true);
    };

    const formatTime = (iso) => {
        const d = new Date(iso);
        const now = new Date();
        const diff = now - d;
        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
        if (diff < 604800000) return `${Math.floor(diff / 86400000)} days ago`;
        return d.toLocaleDateString('tr-TR');
    };

    const highlightMention = (content) => {
        if (!content || !currentUsername) return content;
        const regex = new RegExp(`(@${currentUsername})`, 'gi');
        const parts = content.split(regex);
        return parts.map((part, i) =>
            regex.test(part) ? (
                <span key={`item-${i}`} style={styles.mentionHighlight}>
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.panel}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaInbox style={S.txt} />
                        <h3 style={styles.title}>Bahsedilmeler</h3>
                        {total > 0 && <span style={styles.badge}>{total}</span>}
                    </div>
                    <div style={styles.headerRight}>
                        <button
                            aria-label={t('mentions.refresh', 'Refresh mentions')}
                            onClick={() => fetchMentions(1)}
                            style={styles.refreshBtn}
                            title="Yenile"
                        >
                            <FaSync
                                style={loading ? { animation: 'spin 1s linear infinite' } : {}}
                            />
                        </button>
                        <button aria-label={t('common.close', 'Close')} onClick={onClose} style={styles.closeBtn}>
                            <FaTimes />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div style={styles.content}>
                    {loading && mentions.length === 0 ? (
                        <div style={styles.emptyState}>
                            <div style={styles.spinner} />
                            <p>{t('common.loading')}</p>
                        </div>
                    ) : mentions.length === 0 ? (
                        <div style={styles.emptyState}>
                            <span className="fs-48">📭</span>
                            <p style={styles.emptyTitle}>Bahsedilme yok</p>
                            <p style={styles.emptySubtitle}>
                                {t('mentions.emptyHint', 'It will appear here when someone tags you')}
                            </p>
                        </div>
                    ) : (
                        <>
                            {mentions.map((msg) => (
                                <div
                                    key={msg.id}
                                    style={styles.mentionItem}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => onNavigateToMessage?.(msg)}
                                    onKeyDown={(e) =>
                                        (e.key === 'Enter' || e.key === ' ') &&
                                        e.currentTarget.click()
                                    }
                                >
                                    <div style={styles.mentionHeader}>
                                        <span style={styles.mentionUser}>{msg.username}</span>
                                        <span style={styles.mentionTime}>
                                            {formatTime(msg.timestamp)}
                                        </span>
                                    </div>
                                    <div style={styles.mentionContent}>
                                        {highlightMention(msg.content?.slice(0, 200))}
                                        {msg.content?.length > 200 && '...'}
                                    </div>
                                    <div style={styles.mentionFooter}>
                                        {msg.room_name && (
                                            <span style={styles.roomTag}>
                                                <FaHashtag className="icon-tiny" />
                                                {msg.room_name}
                                            </span>
                                        )}
                                        {msg.is_pinned && (
                                            <span style={styles.pinnedTag}>
                                                <FaThumbtack className="icon-tiny" /> Pinned
                                            </span>
                                        )}
                                        {msg.has_thread && (
                                            <span style={styles.threadTag}>
                                                <FaReply className="icon-tiny" /> Thread
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {hasNext && (
                                <button
                                    aria-label={t('mentions.loadMore', 'Load more mentions')}
                                    onClick={handleLoadMore}
                                    style={styles.loadMoreBtn}
                                    disabled={loading}
                                >
                                    {loading ? 'Yükleniyor...' : t('ui.daha_fazla_goster')}
                                </button>
                            )}
                        </>
                    )}
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
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '60px',
        zIndex: 1000,
    },
    panel: {
        width: '500px',
        maxWidth: '90vw',
        maxHeight: '80vh',
        backgroundColor: '#111214',
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 20px',
        borderBottom: '1px solid #0b0e1b',
        backgroundColor: '#0d0e10',
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    headerRight: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    title: {
        margin: 0,
        fontSize: '16px',
        fontWeight: 600,
        color: '#fff',
    },
    badge: {
        backgroundColor: '#f23f42',
        color: '#fff',
        fontSize: '11px',
        fontWeight: 700,
        padding: '2px 6px',
        borderRadius: '10px',
        minWidth: '18px',
        textAlign: 'center',
    },
    refreshBtn: {
        background: 'none',
        border: 'none',
        color: '#b5bac1',
        cursor: 'pointer',
        padding: '6px',
        borderRadius: '4px',
        fontSize: '14px',
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: '#b5bac1',
        cursor: 'pointer',
        padding: '6px',
        borderRadius: '4px',
        fontSize: '16px',
    },
    content: {
        flex: 1,
        overflowY: 'auto',
        padding: '8px',
    },
    emptyState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        color: '#949ba4',
    },
    emptyTitle: {
        fontSize: '16px',
        fontWeight: 600,
        color: '#dbdee1',
        margin: '12px 0 4px',
    },
    emptySubtitle: {
        fontSize: '13px',
        textAlign: 'center',
    },
    mentionItem: {
        padding: '12px 16px',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background 0.15s',
        marginBottom: '4px',
        borderLeft: '3px solid #5865F2',
        backgroundColor: 'rgba(88, 101, 242, 0.06)',
    },
    mentionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '6px',
    },
    mentionUser: {
        fontWeight: 600,
        color: '#fff',
        fontSize: '14px',
    },
    mentionTime: {
        color: '#949ba4',
        fontSize: '12px',
    },
    mentionContent: {
        color: '#dbdee1',
        fontSize: '14px',
        lineHeight: 1.5,
        wordBreak: 'break-word',
    },
    mentionHighlight: {
        backgroundColor: 'rgba(88, 101, 242, 0.3)',
        color: '#dee0fc',
        padding: '1px 3px',
        borderRadius: '3px',
        fontWeight: 600,
    },
    mentionFooter: {
        display: 'flex',
        gap: '8px',
        marginTop: '8px',
    },
    roomTag: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        backgroundColor: 'rgba(255,255,255,0.06)',
        color: '#b5bac1',
        padding: '2px 8px',
        borderRadius: '4px',
        fontSize: '12px',
    },
    pinnedTag: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        backgroundColor: 'rgba(250, 166, 26, 0.1)',
        color: '#f0b232',
        padding: '2px 8px',
        borderRadius: '4px',
        fontSize: '12px',
    },
    threadTag: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        backgroundColor: 'rgba(88, 101, 242, 0.1)',
        color: '#5865F2',
        padding: '2px 8px',
        borderRadius: '4px',
        fontSize: '12px',
    },
    loadMoreBtn: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#5865F2',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 500,
        marginTop: '8px',
    },
    spinner: {
        width: 32,
        height: 32,
        border: '3px solid #5865F2',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
        marginBottom: 12,
    },
};

MentionsInboxPanel.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    onNavigateToMessage: PropTypes.func,
    currentUsername: PropTypes.string,
};
export default React.memo(MentionsInboxPanel);
